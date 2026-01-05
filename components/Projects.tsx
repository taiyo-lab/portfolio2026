import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: 'Eコマースプラットフォーム',
      description: 'Next.js、Stripe、Supabaseを使用したフルスタックEコマースアプリケーション。商品管理、決済処理、在庫管理機能を実装。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Supabase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'タスク管理アプリ',
      description: 'React、Node.js、PostgreSQLを使用したチーム向けタスク管理アプリ。リアルタイム更新、ドラッグ&ドロップ機能を実装。',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Material-UI'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'ブログプラットフォーム',
      description: 'Next.js、MDX、Vercelを使用した高速ブログプラットフォーム。SEO最適化、ダークモード対応、検索機能を実装。',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel', 'Algolia'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'データ可視化ダッシュボード',
      description: 'React、D3.js、Pythonを使用したリアルタイムデータ可視化ダッシュボード。複数のチャートタイプとフィルタリング機能。',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'モバイルアプリ（React Native）',
      description: 'React Native、Expo、Firebaseを使用したクロスプラットフォームモバイルアプリ。プッシュ通知、位置情報機能を実装。',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'styled-components'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'API開発・マイクロサービス',
      description: 'Node.js、Express、Dockerを使用したRESTful APIとマイクロサービスアーキテクチャ。認証、ログ管理、監視機能を実装。',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      technologies: ['Node.js', 'Express', 'Docker', 'JWT', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">プロジェクト</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            これまでに手がけた主要なプロジェクトの一部をご紹介します
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8">注目プロジェクト</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl mb-8">その他のプロジェクト</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      デモ
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      コード
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}