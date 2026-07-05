"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "./ui/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full flex items-center"
              >
                <Link
                  href={`/#${item.id}`}
                  className="inline-flex h-full items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted/50"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="flex items-center gap-2 h-full"
            >
              <Link
                href="/blog"
                className="inline-flex h-full items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted/50"
              >
                Blog
              </Link>
              <ModeToggle />
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-2 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-border/50">
                  <Link
                    href="/blog"
                    className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
