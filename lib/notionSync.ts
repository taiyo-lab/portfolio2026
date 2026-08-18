import { prisma } from "./prisma";
import { fetchPublishedPosts } from "./notion";

export interface SyncResult {
  total: number;
  created: number;
  updated: number;
  deleted: number;
}

export async function syncNotionPosts(): Promise<SyncResult> {
  const posts = await fetchPublishedPosts();
  let created = 0;
  let updated = 0;

  for (const post of posts) {
    const existing = await prisma.post.findUnique({
      where: { notionId: post.notionId },
    });

    const data = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      tags: JSON.stringify(post.tags),
      imageUrl: post.imageUrl,
      links: JSON.stringify(post.links),
    };

    await prisma.post.upsert({
      where: { notionId: post.notionId },
      update: data,
      create: { notionId: post.notionId, ...data },
    });

    if (existing) updated++;
    else created++;
  }

  // NotionのDBを完全な正とするため、今回取得できなかった記事(Notion側で削除・
  // 手動作成分含む)はサイト側からも削除する。ただし空データでの全削除事故を
  // 避けるため、1件も取得できなかった場合は削除をスキップする。
  let deleted = 0;
  if (posts.length > 0) {
    const notionIds = posts.map((p) => p.notionId);
    const result = await prisma.post.deleteMany({
      where: { OR: [{ notionId: null }, { notionId: { notIn: notionIds } }] },
    });
    deleted = result.count;
  }

  return { total: posts.length, created, updated, deleted };
}
