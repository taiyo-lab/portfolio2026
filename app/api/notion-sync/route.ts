import { NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/adminAuth";
import { syncNotionPosts } from "../../../lib/notionSync";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const result = await syncNotionPosts();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("POST /api/notion-sync failed:", error);
    return NextResponse.json(
      { error: "Notionからの同期に失敗しました。" },
      { status: 500 },
    );
  }
}
