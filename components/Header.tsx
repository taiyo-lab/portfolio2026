"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "./ui/utils";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              Masahiro.dev
            </Link>
          </motion.div>

          <div className="flex items-center gap-1">
            <Link
              href="/#hero"
              className="inline-flex h-9 items-center px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted/50"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-9 items-center px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted/50"
            >
              Blog
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
