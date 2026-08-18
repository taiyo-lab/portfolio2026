import { NextResponse } from "next/server";
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
