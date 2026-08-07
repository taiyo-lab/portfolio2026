import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/adminAuth";
import { fetchPublishedPosts } from "../../../lib/notion";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
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

    return NextResponse.json({ ok: true, total: posts.length, created, updated });
  } catch (error) {
    console.error("POST /api/notion-sync failed:", error);
    return NextResponse.json(
      { error: "Notionからの同期に失敗しました。" },
      { status: 500 },
    );
  }
}
