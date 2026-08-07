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

const STATUS_PROPERTY_NAMES = ["Status", "ステータス", "状態"];
const TITLE_ALIASES = ["Title", "Name", "タイトル", "名前"];
const EXCERPT_ALIASES = ["Excerpt", "抜粋", "概要"];
const AUTHOR_ALIASES = ["Author", "著者"];
const DATE_ALIASES = ["Date", "日付", "公開日"];
const CATEGORY_ALIASES = ["Category", "カテゴリ", "カテゴリー"];
const TAGS_ALIASES = ["Tags", "タグ"];
const IMAGE_ALIASES = ["ImageUrl", "Image", "画像", "Cover"];
const LINKS_ALIASES = ["Links", "参考リンク", "リンク"];

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
    case "rich_text":
      return richTextToPlain(property.rich_text);
    case "select":
      return property.select?.name ?? "";
    case "status":
      return property.status?.name ?? "";
    case "multi_select":
      return property.multi_select.map((o) => o.name).join(", ");
    case "url":
      return property.url ?? "";
    case "people":
      return property.people
        .map((p) => ("name" in p ? p.name ?? "" : ""))
        .filter(Boolean)
        .join(", ");
    default:
      return "";
  }
}

function extractDate(
  property: PageObjectResponse["properties"][string] | undefined,
): Date {
  if (property?.type === "date" && property.date?.start) {
    return new Date(property.date.start);
  }
  return new Date();
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

function extractLinks(
  property: PageObjectResponse["properties"][string] | undefined,
): { label: string; url: string }[] {
  const text = extractText(property);
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, url] = line.split("|").map((part) => part.trim());
      return url ? { label, url } : { label: line, url: line };
    });
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

async function buildStatusFilter(
  notion: Client,
  dataSourceId: string,
): Promise<Record<string, unknown> | undefined> {
  const statusPropertyName = process.env.NOTION_STATUS_PROPERTY || "Status";
  const statusValue = process.env.NOTION_STATUS_VALUE || "Published";

  const dataSource = await notion.dataSources.retrieve({
    data_source_id: dataSourceId,
  });
  const propertyNames = process.env.NOTION_STATUS_PROPERTY
    ? [statusPropertyName]
    : STATUS_PROPERTY_NAMES;

  for (const name of propertyNames) {
    const matchKey = Object.keys(dataSource.properties).find(
      (key) => key.toLowerCase() === name.toLowerCase(),
    );
    if (!matchKey) continue;
    const property = dataSource.properties[matchKey];
    if (property.type === "status") {
      return { property: matchKey, status: { equals: statusValue } };
    }
    if (property.type === "select") {
      return { property: matchKey, select: { equals: statusValue } };
    }
  }
  return undefined;
}

async function extractPost(
  notion: Client,
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
    excerpt: extractText(findProperty(properties, EXCERPT_ALIASES)),
    content: markdown.parent ?? "",
    author: extractText(findProperty(properties, AUTHOR_ALIASES)),
    date: extractDate(findProperty(properties, DATE_ALIASES)),
    category: normalizeCategory(
      extractText(findProperty(properties, CATEGORY_ALIASES)),
    ),
    tags: extractTags(findProperty(properties, TAGS_ALIASES)),
    imageUrl: extractImageUrl(findProperty(properties, IMAGE_ALIASES), page),
    links: extractLinks(findProperty(properties, LINKS_ALIASES)),
  };
}

export async function fetchPublishedPosts(): Promise<NotionSyncedPost[]> {
  const notion = getClient();
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const dataSourceId = await findDataSourceId(notion);
  const filter = await buildStatusFilter(notion, dataSourceId);

  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      filter: filter as never,
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
    posts.push(await extractPost(notion, n2m, page));
  }
  return posts;
}
