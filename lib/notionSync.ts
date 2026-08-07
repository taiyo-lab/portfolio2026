import { prisma } from "./prisma";
import { fetchPublishedPosts } from "./notion";

export interface SyncResult {
  total: number;
  created: number;
  updated: number;
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

  return { total: posts.length, created, updated };
}
