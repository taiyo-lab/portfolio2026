import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      title: 'シニアフロントエンドエンジニア',
      company: '株式会社テック',
      period: '2022年4月 - 現在',
      location: '東京都',
      description: [
        '大規模SaaSアプリケーションのフロントエンド開発をリード',
        'React/Next.jsを使用したコンポーネント設計・実装',
        'TypeScriptによる型安全な開発の推進',
        'パフォーマンス最適化とアクセシビリティ改善',
        'ジュニアエンジニアのメンタリングとコードレビュー',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Jest'],
    },
    {
      title: 'フルスタックエンジニア',
      company: '株式会社スタートアップ',
      period: '2020年6月 - 2022年3月',
      location: '東京都',
      description: [
        '0→1のプロダクト開発を担当、技術選定から運用まで',
        'React、Node.js、PostgreSQLを使用したWebアプリケーション開発',
        'AWSを使用したインフラ構築・運用',
        'CI/CDパイプラインの構築と自動化',
        'スクラム開発の実践とチーム内の協力促進',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions'],
    },
    {
      title: 'ジュニアエンジニア',
      company: '有限会社ウェブソリューション',
      period: '2019年4月 - 2020年5月',
      location: '大阪府',
      description: [
        '企業サイトやECサイトの開発・保守',
        'WordPress、PHPを使用したサイト構築',
        'フロントエンドのコーディング（HTML、CSS、JavaScript）',
        '顧客との要件定義・仕様書作成',
        'サーバー保守・ドメイン管理',
      ],
      technologies: ['WordPress', 'PHP', 'jQuery', 'HTML/CSS', 'MySQL'],
    },
  ];

  const education = [
    {
      degree: 'コンピューターサイエンス学士',
      school: '東京工業大学',
      period: '2015年4月 - 2019年3月',
      description: 'アルゴリズム、データ構造、ソフトウェア工学を専攻',
    },
  ];

  const certifications = [
    'AWS認定ソリューションアーキテクト - アソシエイト',
    'React Developer Certificate',
    'TypeScript Professional Certification',
    'Google Analytics Individual Qualification',
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">経歴・学歴</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            これまでの職歴と継続的な学習の軌跡
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl mb-8">職歴</h3>
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span>{experience.title}</span>
                      <Badge variant="outline">{experience.company}</Badge>
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {experience.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {experience.description.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl mb-6">学歴</h3>
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="text-muted-foreground">
                      <p>{edu.school}</p>
                      <p className="text-sm">{edu.period}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl mb-6">資格・認定</h3>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}