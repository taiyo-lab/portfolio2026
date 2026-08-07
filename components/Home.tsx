import React from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { FavoriteSaunas } from './FavoriteSaunas';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { RecentBlogPosts } from './RecentBlogPosts';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { SideNav } from './ui/SideNav';

export function Home() {
  return (
    <main>
      <SideNav />
      <Hero />
      <About />
      <FavoriteSaunas />
      <Skills />
      <Projects />
      <Experience />
      <RecentBlogPosts />
      <Contact />
    </main>
  );
}
