"use client";

import React, { useState } from 'react';
import { BlogCard, BlogPost } from './BlogCard';
import { cn } from './utils';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

function monthKey(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

function monthLabel(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

export function BlogList({ posts, onPostClick }: BlogListProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const groups: { key: string; label: string; posts: BlogPost[] }[] = [];
  for (const post of sortedPosts) {
    const key = monthKey(post.date);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.key === key) {
      lastGroup.posts.push(post);
    } else {
      groups.push({ key, label: monthLabel(post.date), posts: [post] });
    }
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        まだ記事がありません。
      </div>
    );
  }

  const hasArchive = groups.length > 1;
  const visibleGroups = selectedMonth
    ? groups.filter((group) => group.key === selectedMonth)
    : groups;

  return (
    <div className={hasArchive ? 'grid lg:grid-cols-[1fr_260px] gap-10 items-start' : ''}>
      <div className="space-y-12">
        {visibleGroups.map((group) => (
          <div key={group.key} className="space-y-4">
            <h3 className="text-xl text-muted-foreground">{group.label}</h3>
            <div className={`grid md:grid-cols-2 ${hasArchive ? '' : 'lg:grid-cols-3'} gap-6`}>
              {group.posts.map((post) => (
                <BlogCard key={post.id} post={post} onClick={() => onPostClick(post)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasArchive && (
        <aside className="lg:sticky lg:top-24">
          <h4 className="text-lg">Archive</h4>
          <div className="w-8 h-0.5 bg-primary mt-2 mb-2" />
          <ul>
            <li className="border-b border-dashed border-border">
              <button
                type="button"
                onClick={() => setSelectedMonth(null)}
                className={cn(
                  'w-full text-left py-2.5 text-sm transition-colors',
                  selectedMonth === null
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                すべて表示 ({posts.length})
              </button>
            </li>
            {groups.map((group) => (
              <li key={group.key} className="border-b border-dashed border-border">
                <button
                  type="button"
                  onClick={() => setSelectedMonth(group.key)}
                  className={cn(
                    'w-full text-left py-2.5 text-sm transition-colors',
                    selectedMonth === group.key
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {group.label} ({group.posts.length})
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
