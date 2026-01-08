"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, Github } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'お問い合わせ');
    const body = encodeURIComponent(
      `お名前: ${formData.name}\nメール: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:koba.syyukied@gmail.com?subject=${subject}&body=${body}`;
    toast.success('メールアプリを開きました。内容をご確認ください。');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'メール',
      value: 'koba.syyukied@gmail.com',
      link: 'mailto:koba.syyukied@gmail.com',
    },
    {
      icon: Phone,
      label: '電話',
      value: '080-6949-1169',
      link: 'tel:08069491169',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/taiyo-lab',
      color: 'hover:text-gray-900',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">お問い合わせ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            プロジェクトのご相談やお仕事のご依頼など、お気軽にご連絡ください
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>メッセージを送信</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">お名前 *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="小林大洋"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">メールアドレス *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="yamada@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">件名 *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="プロジェクトについて"
                  />
                </div>
                <div>
                  <Label htmlFor="message">メッセージ *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="プロジェクトの詳細やご相談内容をお聞かせください..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  メッセージを送信
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>連絡先情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <contact.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      {contact.link ? (
                        <a
                          href={contact.link}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ソーシャルメディア</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 rounded-lg bg-muted hover:bg-accent transition-colors ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>現在の状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>新しいプロジェクトを受付中</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    現在、新しいプロジェクトやお仕事のご相談を受け付けております。
                    フリーランスとしての案件や、正社員としての転職も検討中です。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
