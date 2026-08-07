import React from 'react';
import { BlogPost } from './BlogCard';
import { cn } from './utils';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogMetaProps {
  post: BlogPost;
  className?: string;
}

export function BlogMeta({ post, className }: BlogMetaProps) {
  return (
    <div className={cn('flex flex-wrap gap-4 text-muted-foreground', className)}>
      {post.author && (
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>{post.date}</span>
      </div>
      {post.readTime && (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      )}
    </div>
  );
}
