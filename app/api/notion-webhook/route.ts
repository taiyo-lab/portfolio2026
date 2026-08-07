import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { syncNotionPosts } from "../../../lib/notionSync";

const SYNC_TRIGGER_PREFIXES = ["page.", "data_source."];

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;

  const expected =
    "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signatureHeader);

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Notionはサブスクリプション作成時、署名なしでverification_tokenを一度だけ送ってくる。
  // このトークンをログから取得し、Notion側の管理画面に貼り付けて検証を完了させる。
  if (typeof body.verification_token === "string") {
    console.log("Notion webhook verification_token:", body.verification_token);
    return NextResponse.json({ ok: true });
  }

  const signature = request.headers.get("x-notion-signature");
  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const eventType = typeof body.type === "string" ? body.type : "";
  const shouldSync = SYNC_TRIGGER_PREFIXES.some((prefix) =>
    eventType.startsWith(prefix),
  );

  if (!shouldSync) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const result = await syncNotionPosts();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("POST /api/notion-webhook sync failed:", error);
    return NextResponse.json(
      { error: "Notionからの同期に失敗しました。" },
      { status: 500 },
    );
  }
}
