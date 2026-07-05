import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
    const mapped = posts.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt ?? "",
      content: p.content,
      author: p.author ?? "",
      date: p.date.toISOString().split("T")[0],
      readTime: p.readTime ?? "",
      category: p.category,
      tags: p.tags ? JSON.parse(p.tags) : [],
      imageUrl: p.imageUrl ?? "",
      links: p.links ? JSON.parse(p.links) : [],
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  // require admin cookie
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader.includes("admin=1")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
    return NextResponse.json(
      { error: "Failed to create post." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader.includes("admin=1")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
    return NextResponse.json(
      { error: "Failed to update post." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  if (!cookieHeader.includes("admin=1")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id } = body;
    if (!id)
      return NextResponse.json({ error: "Missing id." }, { status: 400 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500 },
    );
  }
}
