import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function About() {
  const highlights = [
    '5年以上のWebアプリケーション開発経験',
    'React/Next.jsエキスパート',
    'AWS認定ソリューションアーキテクト',
    'アジャイル開発経験豊富',
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">自己紹介</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            技術への情熱と継続的な学習を大切にするエンジニアです
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 leading-relaxed">
              大学でコンピューターサイエンスを学んだ後、Web開発の世界に飛び込みました。
              フロントエンドからバックエンドまで幅広く経験し、特にReactとNode.jsを使った
              モダンなWebアプリケーション開発を得意としています。
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              ユーザー体験を第一に考え、パフォーマンスとアクセシビリティを重視した
              開発を心がけています。また、チーム開発では積極的にコミュニケーションを取り、
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
                  <h4 className="text-lg">シニアフロントエンドエンジニア</h4>
                  <p className="text-muted-foreground">株式会社テック （2022年〜現在）</p>
                  <p className="text-sm mt-2">
                    大規模SaaSアプリケーションのフロントエンド開発をリード
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">フルスタックエンジニア</h4>
                  <p className="text-muted-foreground">株式会社スタートアップ （2020年〜2022年）</p>
                  <p className="text-sm mt-2">
                    0→1のプロダクト開発を担当、技術選定から運用まで
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-lg">ジュニアエンジニア</h4>
                  <p className="text-muted-foreground">有限会社ウェブソリューション （2019年〜2020年）</p>
                  <p className="text-sm mt-2">
                    企業サイトやECサイトの開発・保守
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