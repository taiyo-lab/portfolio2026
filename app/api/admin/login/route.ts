import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD not configured" },
        { status: 500 },
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const isProd = process.env.NODE_ENV === "production";
    const cookie = `admin=1; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${isProd ? "; Secure" : ""}`;

    return NextResponse.json(
      { ok: true },
      { headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
