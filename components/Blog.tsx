"use client";

import React, { useState, useEffect } from "react";
import { BlogList } from "./ui/BlogList";
import { BlogDetail } from "./ui/BlogDetail";
import { BlogPost } from "./ui/BlogCard";
import { SectionHeading } from "./ui/SectionHeading";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const normalized = data.map((p: any) => ({
          ...p,
          tags:
            typeof p.tags === "string" ? JSON.parse(p.tags) : (p.tags ?? []),
          links:
            typeof p.links === "string" ? JSON.parse(p.links) : (p.links ?? []),
        }));
        setPosts(normalized);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="blog" className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedPost ? (
          <>
            <SectionHeading
              title="ブログ"
              description="技術的な知見や開発経験、学んだことを共有しています"
            />
            <BlogList posts={posts} onPostClick={setSelectedPost} />
          </>
        ) : (
          <BlogDetail
            post={selectedPost}
            onBack={() => setSelectedPost(null)}
          />
        )}
        {loading && (
          <div className="text-center py-8 text-muted-foreground">
            読み込み中...
          </div>
        )}
      </div>
    </section>
  );
}
