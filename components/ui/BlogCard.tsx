import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { BlogMeta } from './BlogMeta';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'tech' | 'personal' | 'lifestyle' | 'hobby';
  tags: string[];
  imageUrl?: string;
  links?: { label: string; url: string }[];
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
      {post.imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        <BlogMeta post={post} className="text-sm" />
      </CardContent>
    </Card>
  );
}
