import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

interface Skill {
  name: string;
  years?: string;
  experience: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export function SkillsPattern1() {
  const skillCategories: SkillCategory[] = [
    {
      title: "フロントエンド開発",
      description: "主要な開発領域",
      skills: [
        {
          name: "React / Next.js",
          years: "実務約4年",
          experience:
            "医療系Webアプリや検索サービスの開発でフロントエンドを担当。新規画面実装、UI・コンポーネント開発、既存機能の改善・保守を経験。直近はSEO改善を含む機能追加にも対応。",
        },
        {
          name: "TypeScript",
          years: "実務約3年",
          experience:
            "React / Next.js 開発で継続利用。型定義を意識した実装と既存コードの保守・改善を担当。",
        },
        {
          name: "CSS / SCSS",
          experience:
            "デザインカンプを基にしたコーディングを経験。WordPress案件やWebアプリで画面レイアウト調整やUI実装を担当。",
        },
        {
          name: "jQuery / Redux",
          experience:
            "既存プロジェクトの画面改修や状態管理の実装を担当。保守・改善フェーズでの利用経験あり。",
        },
      ],
    },
    {
      title: "バックエンド開発",
      description: "API連携・改修経験",
      skills: [
        {
          name: "API連携・バックエンド改修",
          experience:
            "医療系Webアプリおよび検索サービスでAPI連携を担当。バックエンドAPIの項目追加やバッチ処理の改修にも対応。",
        },
        {
          name: "GraphQL",
          experience:
            "GraphQL APIと連携するフロントエンド開発を経験。クエリを用いたデータ取得・画面反映を担当。",
        },
      ],
    },
    {
      title: "使用言語",
      description: "バックエンドでの改修経験",
      skills: [
        {
          name: "C#",
          experience:
            "既存コードを理解した上での改修や、仕様に沿った機能追加を担当。",
        },
        {
          name: "Python",
          experience:
            "既存コードを理解した上での改修や、仕様に沿った機能追加を担当。",
        },
      ],
    },
    {
      title: "データベース",
      description: "設計理解・利用経験",
      skills: [
        {
          name: "MySQL",
          experience:
            "Webアプリ開発で利用。既存データ構造を理解した上での実装・改修を担当。DB専任ではないが、API改修に伴う構造理解を前提とした開発を経験。",
        },
      ],
    },
    {
      title: "インフラ・DevOps",
      description: "運用・改善経験",
      skills: [
        {
          name: "AWS / ECS",
          experience:
            "検索サービス開発でAWS環境を担当。ECS稼働時間を業務時間のみに制御する自動化を実施し、コストと運用を改善。",
        },
        {
          name: "監視・運用改善",
          experience:
            "放置されていたNewRelicの監視設定を再構築。運用課題の洗い出しと改善まで対応。",
        },
        {
          name: "開発効率化",
          experience:
            "Copilotを活用した自動化環境を構築し、保守開発の効率向上に貢献。",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-10 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">スキル・技術スタック</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            実務経験に基づく技術スキルと専門領域
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{skill.name}</span>
                            {skill.years && (
                              <span className="text-xs text-muted-foreground">
                                ({skill.years})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {skill.experience}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return <SkillsPattern1 />;
}
