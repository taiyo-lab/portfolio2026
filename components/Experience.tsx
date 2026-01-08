import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "フロントエンドエンジニア / バックエンド・クラウド",
      company: "株式会社ぐるなび",
      period: "2024年8月 - 現在",
      location: "東京都",
      description: [
        "レストラン検索機能の新規機能追加・SEO改善を担当",
        "バックエンドAPI項目追加、バッチ処理改修、クラウド移行対応",
        "AI自動化機能の検証・実装で業務効率化に貢献",
        "NewRelic監視設定の再構築とECS稼働時間の最適化を主導",
        "フロント内のメンター役として技術支援",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Jotai",
        "GraphQL",
        "Storybook",
        "AWS",
        "C#",
        "Python",
      ],
    },
    {
      title: "フロントエンドエンジニア",
      company: "貿易会社向け基幹システム新規開発",
      period: "2024年2月 - 2024年7月",
      location: "東京都",
      description: [
        "基幹システムの新規開発に参画",
        "新規コンポーネントの開発と既存バグ修正を担当",
        "大規模チームでの開発ルール遵守と品質維持に貢献",
      ],
      technologies: ["React", "Redux", "TypeScript"],
    },
    {
      title: "フロントエンドエンジニア",
      company: "医療系アプリ新規開発",
      period: "2023年1月 - 2024年1月",
      location: "東京都",
      description: [
        "処方履歴を確認できる医療系アプリの新規開発に参画",
        "新規画面実装、API連携、テスト作成・実行を担当",
        "UI/コンポーネント開発をリードし複数画面を納品",
        "後半参画メンバーの技術フォローを実施",
      ],
      technologies: ["React", "Redux", "TypeScript"],
    },
    {
      title: "フロントエンドエンジニア",
      company: "Webサイト制作・保守",
      period: "2021年10月 - 2022年12月",
      location: "東京都",
      description: [
        "新規Webサイトのコーディングと改修を担当",
        "WordPressのPHPコーディングや記事投稿業務",
        "デザインカンプをHTML/CSSで実装し保守対応",
      ],
      technologies: [
        "WordPress",
        "PHP",
        "JavaScript",
        "jQuery",
        "HTML",
        "SCSS",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">経歴</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            これまでの職歴
          </p>
        </div>

        {/* Work Experience */}
        <div>
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
      </div>
    </section>
  );
}
