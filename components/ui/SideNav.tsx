"use client";

import React, { useEffect, useState } from "react";
import { cn } from "./utils";

interface SideNavSection {
  id: string;
  label: string;
}

const sections: SideNavSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "blog-preview", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="ページ内ナビゲーション"
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          aria-label={section.label}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-end py-1"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
            {section.label}
          </span>
          <span
            className={cn(
              "block rounded-full transition-all",
              activeId === section.id
                ? "w-3 h-3 bg-primary"
                : "w-2 h-2 bg-muted-foreground/40 group-hover:bg-muted-foreground/70",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
