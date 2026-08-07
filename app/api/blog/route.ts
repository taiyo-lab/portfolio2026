import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/adminAuth";
import { getPosts } from "../../../lib/posts";

export async function GET() {
  try {
    const mapped = await getPosts();
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("GET /api/blog failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const body = await request.json();
    const { title, content, category, date } = body;
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const created = await prisma.post.create({
      data: {
        title,
        excerpt: body.excerpt ?? "",
        content,
        author: body.author ?? "",
        date: date ? new Date(date) : new Date(),
        readTime: body.readTime ?? "",
        category,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        imageUrl: body.imageUrl ?? "",
        links: body.links ? JSON.stringify(body.links) : null,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error("POST /api/blog failed:", error);
    return NextResponse.json(
      { error: "Failed to create post." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const body = await request.json();
    const { id } = body;
    if (!id)
      return NextResponse.json({ error: "Missing id." }, { status: 400 });

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        date: body.date ? new Date(body.date) : undefined,
        readTime: body.readTime,
        category: body.category,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        imageUrl: body.imageUrl,
        links: body.links ? JSON.stringify(body.links) : undefined,
      },
    });

    return NextResponse.json({ ok: true, id: updated.id });
  } catch (error) {
    console.error("PUT /api/blog failed:", error);
    return NextResponse.json(
      { error: "Failed to update post." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const body = await request.json();
    const { id } = body;
    if (!id)
      return NextResponse.json({ error: "Missing id." }, { status: 400 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/blog failed:", error);
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500 },
    );
  }
}
