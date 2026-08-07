import React from 'react';
import { BlogCard, BlogPost } from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

function monthLabel(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

export function BlogList({ posts, onPostClick }: BlogListProps) {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const groups: { label: string; posts: BlogPost[] }[] = [];
  for (const post of sortedPosts) {
    const label = monthLabel(post.date);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.label === label) {
      lastGroup.posts.push(post);
    } else {
      groups.push({ label, posts: [post] });
    }
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        まだ記事がありません。
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.label} className="space-y-4">
          <h3 className="text-xl text-muted-foreground">{group.label}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.posts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
