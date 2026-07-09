import { NextResponse } from "next/server";

function isAdminRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .includes("admin=1");
}

export function requireAdmin(request: Request): NextResponse | null {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
