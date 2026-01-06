import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function About() {
  const highlights = [
    "4年以上のWebアプリケーション開発経験",
    "React/Next.jsエキスパート",
    "アジャイル開発経験豊富",
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">自己紹介</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Web技術が好きなエンジニアです。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 leading-relaxed">
              Web技術が好きなエンジニアです。
              <br />
              新卒で建築会社に入社し施工管理を経験した後、2021年よりエンジニアとしてキャリアをスタート。
              <br />
              フロントエンドを主軸に、React / Next.js / TypeScript を用いた
              Webアプリケーション開発に4年間携わってきました。
              <br />
              直近ではバックエンドAPIの改修やAWS環境の運用・改善にも関わり、
              プロダクト全体を意識した開発を心がけています。
              <br />
              「なぜこの仕様なのか」「もっと良くできないか」を考えながら、
              能動的に改善に取り組むスタンスを大切にしています。
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              ユーザー体験を第一に考え、パフォーマンスとアクセシビリティを重視した
              開発を心がけています。
              <br />
              チーム開発では積極的にコミュニケーションを取り、
              知識の共有とコードレビューを通じてチーム全体のスキル向上に貢献しています。
            </p>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">経歴ハイライト</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">フロントエンドエンジニア</h4>
                  <p className="text-muted-foreground">
                    株式会社ぐるなび（2024年〜現在）
                  </p>
                  <p className="text-sm mt-2">
                    検索機能開発。フロントエンドを主軸に、
                    バックエンド・AWSまで担当領域を拡張。
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">フロントエンドエンジニア</h4>
                  <p className="text-muted-foreground">
                    貿易会社向け基幹システム新規開発（2024年）
                  </p>
                  <p className="text-sm mt-2">
                    大規模チームでの基幹システム開発に参画。
                    共通コンポーネント開発・不具合修正を担当。
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">フロントエンドエンジニア</h4>
                  <p className="text-muted-foreground">
                    医療系Webアプリ新規開発（2023年〜2024年）
                  </p>
                  <p className="text-sm mt-2">
                    Reactを用いた新規開発。
                    UI・コンポーネント開発をリードし、技術フォローも担当。
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">
                    フリーランスエンジニア（2021年〜2022年）
                  </h4>
                  <p className="text-sm mt-2">
                    WordPressを用いたWebサイトの新規構築・改修・保守を担当。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
