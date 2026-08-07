"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogList } from "./ui/BlogList";
import { BlogDetail } from "./ui/BlogDetail";
import { BlogPost } from "./ui/BlogCard";
import { SectionHeading } from "./ui/SectionHeading";

interface BlogProps {
  posts: BlogPost[];
  initialPostId?: string;
}

export function Blog({ posts, initialPostId }: BlogProps) {
  const router = useRouter();
  const initialPost = initialPostId
    ? (posts.find((p) => p.id === initialPostId) ?? null)
    : null;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(
    initialPost,
  );

  const selectPost = (post: BlogPost) => {
    setSelectedPost(post);
    router.push(`/blog?post=${post.id}`, { scroll: false });
  };

  const back = () => {
    setSelectedPost(null);
    router.push("/blog", { scroll: false });
  };

  return (
    <section id="blog" className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedPost ? (
          <>
            <SectionHeading title="Blog" />
            <BlogList posts={posts} onPostClick={selectPost} />
          </>
        ) : (
          <BlogDetail post={selectedPost} onBack={back} />
        )}
      </div>
    </section>
  );
}
