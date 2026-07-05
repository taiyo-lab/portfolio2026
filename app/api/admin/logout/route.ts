import { NextResponse } from "next/server";

export async function POST() {
  const cookie = `admin=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;
  return NextResponse.json({ ok: true }, { headers: { "Set-Cookie": cookie } });
}
