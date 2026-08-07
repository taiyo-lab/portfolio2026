"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogCard, BlogPost } from "./ui/BlogCard";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/button";

export function RecentBlogPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data)) return;
        const normalized = data.map((p: any) => ({
          ...p,
          tags:
            typeof p.tags === "string" ? JSON.parse(p.tags) : (p.tags ?? []),
          links:
            typeof p.links === "string" ? JSON.parse(p.links) : (p.links ?? []),
        }));
        setPosts(normalized.slice(0, 3));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog-preview" className="py-10 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="最近投稿したブログ" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => router.push("/blog")}
            />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <a href="/blog">すべて見る</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
