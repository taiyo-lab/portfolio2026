import React from 'react';
import { Separator } from './ui/separator';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, url: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl mb-4">田中太郎</h3>
            <p className="text-muted-foreground mb-4">
              React、TypeScript、Node.jsを専門とするフルスタックエンジニア。
              ユーザー体験を重視したWebアプリケーション開発を行っています。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">クイックリンク</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-foreground transition-colors"
                >
                  自己紹介
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-foreground transition-colors"
                >
                  スキル
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-foreground transition-colors"
                >
                  プロジェクト
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-foreground transition-colors"
                >
                  経歴
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-foreground transition-colors"
                >
                  お問い合わせ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">連絡先</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>tanaka@example.com</p>
              <p>+81 90-1234-5678</p>
              <p>東京都渋谷区</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} 田中太郎. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-muted-foreground text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ↑ トップに戻る
          </button>
        </div>
      </div>
    </footer>
  );
}