import { prisma } from "./prisma";
import { BlogPost } from "../components/ui/BlogCard";

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content,
    author: p.author ?? "",
    date: p.date.toISOString().split("T")[0],
    readTime: p.readTime ?? "",
    category: p.category as BlogPost["category"],
    tags: p.tags ? JSON.parse(p.tags) : [],
    imageUrl: p.imageUrl ?? "",
    links: p.links ? JSON.parse(p.links) : [],
  }));
}
