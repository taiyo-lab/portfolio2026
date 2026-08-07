import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { BlogPost } from './BlogCard';
import { Button } from './button';
import { Badge } from './badge';
import { BlogMeta } from './BlogMeta';
import { categoryLabels } from './blogCategory';
import { ArrowLeft, FolderOpen, Link } from 'lucide-react';

const markdownComponents = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-xl font-bold mt-8 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-lg font-semibold mt-6 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="text-foreground leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  em: (props: React.ComponentProps<'em'>) => <em className="italic" {...props} />,
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-primary underline hover:no-underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-border pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  img: (props: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-4 w-full" {...props} />
  ),
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

          <BlogMeta post={post} />
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
        <div className="max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
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
