"use client";

import React, { useState } from 'react';
import { BlogCard, BlogPost } from './BlogCard';
import { Input } from './input';
import { Badge } from './badge';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Search } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

// カテゴリー表示用のラベル
const categoryLabels = {
  tech: '技術',
  personal: 'プライベート',
  lifestyle: 'ライフスタイル',
  hobby: '趣味',
};

export function BlogList({ posts, onPostClick }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // カテゴリーでフィルタリングされた記事
  const categoryFilteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  // すべてのタグを取得（現在のカテゴリーの記事から）
  const allTags = Array.from(
    new Set(categoryFilteredPosts.flatMap((post) => post.tags))
  );

  // 検索とフィルタリング
  const filteredPosts = categoryFilteredPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
  });

  // カテゴリー変更時にタグをリセット
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
  };

  return (
    <div className="space-y-8">
      {/* カテゴリータブ */}
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="tech">技術</TabsTrigger>
          <TabsTrigger value="personal">プライベート</TabsTrigger>
          <TabsTrigger value="lifestyle">ライフスタイル</TabsTrigger>
          <TabsTrigger value="hobby">趣味</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 検索とタグフィルター */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="記事を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(value as 'newest' | 'oldest')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">新しい順</SelectItem>
                <SelectItem value="oldest">古い順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              すべてのタグ
            </Badge>
            {allTags.map((tag, index) => (
              <Badge
                key={index}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 記事一覧 */}
      {sortedPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} onClick={() => onPostClick(post)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          検索条件に一致する記事が見つかりませんでした。
        </div>
      )}
    </div>
  );
}
