"use client";

import React from "react";
import { Button } from "./ui/button";
import { Github, BookOpen, Download } from "lucide-react";
import { SaunaIkitaiIcon } from "./ui/SaunaIkitaiIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

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
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-lg opacity-50" />
              <ImageWithFallback
                src="/images/my-image.jpeg"
                alt="プロフィール写真"
                className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-background"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            Hi! I'm Masahiro!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I love web technologies! 🚀
            <br />
            <span className="text-foreground/80">
              Building valuable products with passion.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <div className="flex gap-4">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a
                  href="https://github.com/taiyo-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/blog">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Blog
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a
                  href="https://sauna-ikitai.com/saunners/164336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  <SaunaIkitaiIcon className="w-5 h-5 mr-2" />
                  <span>サウナイキタイ</span>
                </a>
              </Button>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
              >
                View Projects
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full">
                <a
                  href="/images/resume.pdf"
                  download
                >
                  <Download className="w-5 h-5 mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
