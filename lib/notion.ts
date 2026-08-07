import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

export interface NotionSyncedPost {
  notionId: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  tags: string[];
  imageUrl: string;
  links: { label: string; url: string }[];
}

const TITLE_ALIASES = ["Title", "Name", "タイトル", "名前"];
const DATE_ALIASES = ["Date", "日付", "公開日"];
const CATEGORY_ALIASES = ["Category", "カテゴリ", "カテゴリー"];
const TAGS_ALIASES = ["Tags", "タグ"];
const IMAGE_ALIASES = ["ImageUrl", "Image", "画像", "Cover"];

const CATEGORY_MAP: Record<string, string> = {
  tech: "tech",
  technology: "tech",
  技術: "tech",
  personal: "personal",
  プライベート: "personal",
  lifestyle: "lifestyle",
  ライフスタイル: "lifestyle",
  hobby: "hobby",
  趣味: "hobby",
};

function getClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("NOTION_API_KEY is not set");
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not set");
  return databaseId;
}

function findProperty(
  properties: PageObjectResponse["properties"],
  names: string[],
): PageObjectResponse["properties"][string] | undefined {
  const lowerNames = names.map((n) => n.toLowerCase());
  for (const key of Object.keys(properties)) {
    if (lowerNames.includes(key.toLowerCase())) return properties[key];
  }
  return undefined;
}

function richTextToPlain(richText: RichTextItemResponse[] = []): string {
  return richText.map((t) => t.plain_text).join("");
}

function normalizeCategory(value: string | undefined): string {
  if (!value) return "tech";
  return CATEGORY_MAP[value.trim()] ?? CATEGORY_MAP[value.trim().toLowerCase()] ?? "tech";
}

function extractText(
  property: PageObjectResponse["properties"][string] | undefined,
): string {
  if (!property) return "";
  switch (property.type) {
    case "title":
      return richTextToPlain(property.title);
    case "select":
      return property.select?.name ?? "";
    case "multi_select":
      return property.multi_select.map((o) => o.name).join(", ");
    default:
      return "";
  }
}

function extractDate(
  property: PageObjectResponse["properties"][string] | undefined,
  page: PageObjectResponse,
): Date {
  if (property?.type === "date" && property.date?.start) {
    return new Date(property.date.start);
  }
  if (property?.type === "created_time") {
    return new Date(property.created_time);
  }
  return new Date(page.created_time);
}

function extractTags(
  property: PageObjectResponse["properties"][string] | undefined,
): string[] {
  if (property?.type === "multi_select") {
    return property.multi_select.map((o) => o.name);
  }
  return [];
}

function extractImageUrl(
  property: PageObjectResponse["properties"][string] | undefined,
  page: PageObjectResponse,
): string {
  if (property?.type === "url" && property.url) return property.url;
  if (property?.type === "files" && property.files.length > 0) {
    const file = property.files[0];
    if (file.type === "external") return file.external.url;
    if (file.type === "file") return file.file.url;
  }
  if (page.cover) {
    if (page.cover.type === "external") return page.cover.external.url;
    if (page.cover.type === "file") return page.cover.file.url;
  }
  return "";
}

async function findDataSourceId(notion: Client): Promise<string> {
  const database = await notion.databases.retrieve({
    database_id: getDatabaseId(),
  });
  if (!("data_sources" in database)) {
    throw new Error("Notion database response is missing data_sources");
  }
  const dataSource = database.data_sources[0];
  if (!dataSource) throw new Error("Notion database has no data sources");
  return dataSource.id;
}

async function extractPost(
  n2m: NotionToMarkdown,
  page: PageObjectResponse,
): Promise<NotionSyncedPost> {
  const properties = page.properties;
  const titleProperty =
    Object.values(properties).find((p) => p.type === "title") ??
    findProperty(properties, TITLE_ALIASES);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdBlocks);

  return {
    notionId: page.id,
    title: extractText(titleProperty) || "無題",
    excerpt: "",
    content: markdown.parent ?? "",
    author: "",
    date: extractDate(findProperty(properties, DATE_ALIASES), page),
    category: normalizeCategory(
      extractText(findProperty(properties, CATEGORY_ALIASES)),
    ),
    tags: extractTags(findProperty(properties, TAGS_ALIASES)),
    imageUrl: extractImageUrl(findProperty(properties, IMAGE_ALIASES), page),
    links: [],
  };
}

export async function fetchPublishedPosts(): Promise<NotionSyncedPost[]> {
  const notion = getClient();
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const dataSourceId = await findDataSourceId(notion);

  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
    });
    for (const result of response.results) {
      if (result.object === "page" && "properties" in result) {
        pages.push(result as PageObjectResponse);
      }
    }
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  const posts: NotionSyncedPost[] = [];
  for (const page of pages) {
    posts.push(await extractPost(n2m, page));
  }
  return posts;
}
