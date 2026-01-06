"use client";

import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="プロフィール写真"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Masahiro Kobayashi
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hi! Im Masahiro Kobayashi.
            <br />
            I love web technologies!🚀🚀🚀
            <br />I want to build valuable products while enjoying the process🧖
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              メール
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => scrollToSection("projects")}>
              プロジェクトを見る
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              履歴書をダウンロード
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
