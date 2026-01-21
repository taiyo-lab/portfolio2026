"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isHeartBursting, setIsHeartBursting] = useState(false);
  const heartBurstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const socialLinks = [
    { icon: Github, url: "https://github.com/taiyo-lab", label: "GitHub" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
  ];

  useEffect(() => {
    if (!isHeartBursting) return;
    if (heartBurstTimerRef.current) clearTimeout(heartBurstTimerRef.current);
    heartBurstTimerRef.current = setTimeout(() => {
      setIsHeartBursting(false);
    }, 520);
    return () => {
      if (heartBurstTimerRef.current) clearTimeout(heartBurstTimerRef.current);
    };
  }, [isHeartBursting]);

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
              <p>koba.syyukied@gmail.com</p>
              <p>080-6949-1169</p>
              <p>神奈川県茅ヶ崎市</p>
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
            <button
              type="button"
              aria-label="Send some love"
              onClick={() => {
                setIsHeartPressed((prev) => !prev);
                setIsHeartBursting(true);
              }}
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {isHeartBursting && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400/30 animate-ping" />
              )}
              <Heart
                className={`relative w-4 h-4 text-red-500 transition-transform duration-300 ${
                  isHeartPressed
                    ? "scale-125 fill-red-500"
                    : "scale-100 fill-transparent"
                }`}
              />
            </button>
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
