import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Projects() {
  const projects = [
    {
      title: "ポートフォリオサイト",
      description:
        "私のポートフォリオサイト。経歴や制作物、連絡先をまとめたシンプルなWebサイト。Blog機能も搭載。",
      image: "/images/portfolio.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://portfolio2026-sooty.vercel.app",
      githubUrl: "https://github.com/taiyo-lab/portfolio2026",
      featured: true,
    },
    {
      title: "タスク管理アプリ",
      description:
        "React、Node.js、PostgreSQLを使用したチーム向けタスク管理アプリ。リアルタイム更新、ドラッグ&ドロップ機能を実装。",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Socket.io",
        "Material-UI",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "ブログプラットフォーム",
      description:
        "Next.js、MDX、Vercelを使用した高速ブログプラットフォーム。SEO最適化、ダークモード対応、検索機能を実装。",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel", "Algolia"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "データ可視化ダッシュボード",
      description:
        "React、D3.js、Pythonを使用したリアルタイムデータ可視化ダッシュボード。複数のチャートタイプとフィルタリング機能。",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "モバイルアプリ（React Native）",
      description:
        "React Native、Expo、Firebaseを使用したクロスプラットフォームモバイルアプリ。プッシュ通知、位置情報機能を実装。",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      technologies: [
        "React Native",
        "Expo",
        "Firebase",
        "Redux",
        "styled-components",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "API開発・マイクロサービス",
      description:
        "Node.js、Express、Dockerを使用したRESTful APIとマイクロサービスアーキテクチャ。認証、ログ管理、監視機能を実装。",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      technologies: ["Node.js", "Express", "Docker", "JWT", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-10 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">趣味で作成したアプリ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            趣味で作成したアプリの一部をご紹介します
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
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
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} デモ`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
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
      </div>
    </section>
  );
}
