import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, url: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl mb-4">小林大洋</h3>
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
                <Link
                  href="/#about"
                  className="hover:text-foreground transition-colors"
                >
                  自己紹介
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="hover:text-foreground transition-colors"
                >
                  スキル
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-foreground transition-colors"
                >
                  プロジェクト
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="hover:text-foreground transition-colors"
                >
                  経歴
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  ブログ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-foreground transition-colors"
                >
                  お問い合わせ
                </Link>
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
            © {currentYear} 小林大洋. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-muted-foreground text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/#hero"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ↑ トップに戻る
          </Link>
        </div>
      </div>
    </footer>
  );
}
