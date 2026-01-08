"use client";

import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, BookOpen, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <ImageWithFallback
              src="/images/my-image.jpeg"
              alt="プロフィール写真"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 pb-1 leading-[1.2] bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Hi! Im Masahiro!
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I love web technologies!🚀🚀🚀
            <br />I want to build valuable products while enjoying the process🧖
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <Button asChild variant="outline" size="sm">
              <a
                href="https://github.com/taiyo-lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/blog">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog
              </a>
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => scrollToSection("projects")}>
              プロジェクトを見る
            </Button>
            <Button asChild variant="outline">
              <a
                href="/images/%E5%B1%A5%E6%AD%B4%E6%9B%B8+%20%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8.pdf"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                履歴書をダウンロード
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
