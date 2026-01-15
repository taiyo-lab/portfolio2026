import React from 'react';
import { BlogPost } from './BlogCard';
import { Button } from './button';
import { Badge } from './badge';
import { Calendar, Clock, User, ArrowLeft, FolderOpen, Link } from 'lucide-react';

// カテゴリー表示用のラベル
const categoryLabels = {
  tech: '技術',
  personal: 'プライベート',
  lifestyle: 'ライフスタイル',
  hobby: '趣味',
};

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogDetail({ post, onBack }: BlogDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        一覧に戻る
      </Button>

      <article className="space-y-8">
        {/* ヘッダー */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">{categoryLabels[post.category]}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl">{post.title}</h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* アイキャッチ画像 */}
        {post.imageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 記事本文 */}
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-foreground mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {post.links && post.links.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="h-4 w-4" />
              <span>参考リンク</span>
            </div>
            <ul className="space-y-2">
              {post.links.map((link, index) => (
                <li key={`${link.url}-${index}`}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
