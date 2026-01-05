"use client";

import React, { useState } from 'react';
import { BlogList } from './ui/BlogList';
import { BlogDetail } from './ui/BlogDetail';
import { BlogPost } from './ui/BlogCard';

// サンプルブログデータ
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'React 19の新機能について徹底解説',
    excerpt: 'React 19で追加された新しい機能とパフォーマンス改善について詳しく解説します。Server Componentsやuse APIなど、注目の機能を網羅的に紹介します。',
    content: 'React 19がリリースされ、多くの新機能が追加されました。この記事では、特に注目すべき新機能について詳しく解説していきます。\n\nまず、Server Componentsについてです。Server Componentsを使用することで、サーバーサイドでのレンダリングが可能になり、パフォーマンスが大幅に向上します。クライアントに送信されるJavaScriptのサイズを削減でき、初期ロード時間の短縮につながります。\n\n次に、新しいuse APIについて説明します。use APIは、非同期データの読み込みをより直感的に行うことができる新しいフックです。SuspenseやError Boundaryと組み合わせることで、より宣言的なコードを書くことができます。\n\nまた、パフォーマンスの改善も大きなトピックです。レンダリングの最適化により、大規模なアプリケーションでもスムーズな動作が期待できます。',
    author: '小林大洋',
    date: '2025-01-02',
    readTime: '5分',
    category: 'tech',
    tags: ['React', 'JavaScript', 'フロントエンド'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    title: 'TypeScriptでの型安全なAPI設計パターン',
    excerpt: 'TypeScriptを活用した型安全なAPI設計について、実践的なパターンとベストプラクティスを紹介します。',
    content: 'TypeScriptを使用したAPI設計では、型安全性を最大限に活用することが重要です。この記事では、実践的なパターンとベストプラクティスを紹介します。\n\nまず、APIレスポンスの型定義についてです。レスポンスの型を明確に定義することで、コンパイル時にエラーを検出でき、バグの早期発見につながります。Zodなどのバリデーションライブラリと組み合わせることで、ランタイムでも型安全性を保証できます。\n\nジェネリック型を活用することで、再利用可能で柔軟なAPI設計が可能になります。特に、APIクライアントの実装では、ジェネリック型を使用することで様々なエンドポイントに対応できる汎用的な実装が可能です。\n\n型ガードとユーザー定義の型ガードを使用することで、より安全なコードを書くことができます。これにより、実行時の型チェックも含めた完全な型安全性を実現できます。',
    author: '小林大洋',
    date: '2024-12-28',
    readTime: '7分',
    category: 'tech',
    tags: ['TypeScript', 'API', 'バックエンド'],
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    title: 'Next.js App Routerでのパフォーマンス最適化',
    excerpt: 'Next.js 14のApp Routerを使用したアプリケーションのパフォーマンス最適化テクニックを解説します。',
    content: 'Next.js 14のApp Routerは、パフォーマンス最適化のための多くの機能を提供しています。この記事では、実践的な最適化テクニックを紹介します。\n\nServer ComponentsとClient Componentsを適切に使い分けることが重要です。データフェッチングが必要な部分はServer Componentsで実装し、インタラクティブな部分のみをClient Componentsにすることで、クライアントに送信されるJavaScriptのサイズを最小限に抑えることができます。\n\nStreaming SSRを活用することで、ページの一部を先に表示し、残りの部分を後から読み込むことができます。これにより、ユーザーはページの一部を早く見ることができ、体感的なパフォーマンスが向上します。\n\n画像の最適化も重要なポイントです。Next.jsのImage Componentを使用することで、自動的に最適なフォーマットとサイズで画像が配信されます。また、lazy loadingにより、必要なタイミングで画像が読み込まれるため、初期ロード時間を短縮できます。',
    author: '小林大洋',
    date: '2024-12-25',
    readTime: '6分',
    category: 'tech',
    tags: ['Next.js', 'パフォーマンス', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
  },
  {
    id: '4',
    title: '北アルプス登山で見た絶景と学んだこと',
    excerpt: '夏の北アルプスを縦走してきました。3日間の山行で体験した大自然の美しさと、登山を通じて得た気づきについて書きます。',
    content: '今年の夏、念願だった北アルプスの縦走に挑戦してきました。上高地から入山し、涸沢、穂高岳を経て、3日間かけて山を歩きました。\n\n初日は上高地から涸沢までの道のり。森林限界を超えると、目の前に広がる圧倒的な景色に息を飲みました。テントを張った夜、満天の星空を見上げながら、日常の喧騒から離れた贅沢な時間を過ごしました。\n\n2日目の穂高岳アタックは本当に大変でした。急峻な岩場を登り続け、体力的にも精神的にも限界を感じましたが、山頂に立った瞬間の達成感は言葉にできないほどでした。360度のパノラマビューは、すべての苦労を忘れさせてくれました。\n\n山を歩きながら、「一歩一歩確実に進むこと」の大切さを実感しました。これは仕事や人生にも通じる教訓だと思います。次は秋の紅葉シーズンに訪れたいと考えています。',
    author: '小林大洋',
    date: '2024-08-15',
    readTime: '4分',
    category: 'hobby',
    tags: ['登山', 'アウトドア', '北アルプス', '旅行'],
    imageUrl: 'https://images.unsplash.com/photo-1669986480140-2c90b8edb443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Njc2MTE0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'リモートワークで見つけた新しい朝のルーティン',
    excerpt: 'フルリモートワークになって1年。試行錯誤の末に辿り着いた、生産性を高める朝の習慣について紹介します。',
    content: 'リモートワークになってから、朝の時間の使い方が大きく変わりました。通勤時間がなくなったことで、朝の2時間をどう使うかが生産性を大きく左右することに気づきました。\n\n私の朝は6時に起きることから始まります。まずは15分間の軽いストレッチで体を目覚めさせます。その後、コーヒーを淹れながら、今日のタスクを頭の中で整理します。このコーヒータイムが、1日の中で最も大切な時間になっています。\n\n7時からは読書の時間。技術書や小説など、その日の気分で選びます。知識をインプットする時間を朝に持つことで、頭がクリアな状態で学習できます。8時には軽い朝食を取り、8時半から仕事を開始します。\n\nこのルーティンを続けることで、以前よりも心身ともに健康になり、仕事のパフォーマンスも向上しました。朝の時間を大切にすることの重要性を、身をもって実感しています。',
    author: '小林大洋',
    date: '2024-11-20',
    readTime: '4分',
    category: 'lifestyle',
    tags: ['リモートワーク', '朝活', '習慣', '生産性'],
    imageUrl: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtb3JuaW5nfGVufDF8fHx8MTc2NzYwMzMwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: '最近読んで面白かった技術書3選',
    excerpt: '今年読んだ技術書の中から、特に印象に残った3冊を紹介します。エンジニアとしての成長に役立った本たちです。',
    content: '読書の秋ということで、今年読んだ技術書の中から特におすすめの3冊を紹介します。\n\n1冊目は「リーダブルコード」です。今さらと思われるかもしれませんが、定期的に読み返すたびに新しい発見があります。コードレビューで指摘する際の根拠としても参照できる、エンジニアの必読書だと改めて感じました。\n\n2冊目は「達人プログラマー」の新版。20年前の初版から大幅にアップデートされており、現代の開発手法にも通じる普遍的な原則が書かれています。特に「壊れた窓理論」の章は、チーム開発での品質管理について考えさせられました。\n\n3冊目は「システム設計の面接試験」。大規模システムの設計について学べる実践的な内容で、スケーラビリティやパフォーマンスについての理解が深まりました。面接対策だけでなく、日々の設計業務にも活かせる知識が詰まっています。\n\n来年も良書との出会いを楽しみにしています。',
    author: '小林大洋',
    date: '2024-10-05',
    readTime: '5分',
    category: 'personal',
    tags: ['読書', '技術書', '学習', '成長'],
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmd8ZW58MXx8fHwxNzY3NTU3Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'マラソン完走への道：初心者が3ヶ月でフルマラソンに挑戦',
    excerpt: '運動不足だった私が、3ヶ月の練習を経てフルマラソンを完走するまでの記録。挫折と達成の物語です。',
    content: '今年の春、友人に誘われて軽い気持ちでエントリーしたフルマラソン。しかし、当時の私は5km走るのもやっとという状態でした。\n\n最初の1ヶ月は本当に辛かったです。週3回、まずは3kmから始めました。息が上がり、足が痛くなり、何度も諦めそうになりました。でも、少しずつ距離を伸ばしていくうちに、走ることが楽しくなってきました。\n\n2ヶ月目には10kmを走れるようになり、体の変化も実感できるようになりました。体重が減り、体力がつき、朝の目覚めも良くなりました。走ることが生活の一部になっていきました。\n\n本番のレースは想像以上に過酷でした。30km地点で足が動かなくなり、歩きながらでもゴールしようと決意しました。そして5時間かかりましたが、なんとか完走することができました。\n\nゴールした瞬間の達成感は、今でも忘れられません。小さな目標でも、継続することで大きな成果につながることを学びました。次は4時間半を目標に、トレーニングを続けています。',
    author: '小林大洋',
    date: '2024-09-10',
    readTime: '5分',
    category: 'hobby',
    tags: ['マラソン', '運動', '健康', 'チャレンジ'],
    imageUrl: 'https://images.unsplash.com/photo-1758520706103-41d01f815640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZml0bmVzc3xlbnwxfHx8fDE3Njc1NzAwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: '週末の料理実験：初めてのパン作りに挑戦',
    excerpt: '在宅時間が増えたことをきっかけに始めた料理。今回は念願のパン作りに初挑戦しました。',
    content: '週末を使って、以前から興味があったパン作りに挑戦してみました。プログラミングと同じで、レシピという「コード」に従って実行すれば成功するはず…と思っていたのですが、そう簡単ではありませんでした。\n\n材料は至ってシンプル。強力粉、イースト、塩、砂糖、水だけ。しかし、こねる時間、発酵の温度、焼き時間など、様々な変数が絡み合います。まるで複雑なアルゴリズムを最適化するような作業でした。\n\n1回目は完全に失敗。発酵が不十分で、石のように硬いパンができあがりました。2回目は発酵させすぎて、逆にベタベタに。3回目でようやく、それらしい形のパンを焼くことができました。\n\nパン作りを通じて、「試行錯誤の大切さ」を改めて実感しました。失敗から学び、少しずつ改善していく。これはエンジニアリングにも通じる考え方です。次回はクロワッサンに挑戦したいと思います。',
    author: '小林大洋',
    date: '2024-07-28',
    readTime: '4分',
    category: 'lifestyle',
    tags: ['料理', 'パン作り', '週末', 'DIY'],
    imageUrl: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwZm9vZHxlbnwxfHx8fDE3Njc1MjA5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    title: '写真を始めて見えてきた、新しい世界の切り取り方',
    excerpt: 'カメラを手にして半年。写真を通じて見える世界が変わりました。技術と感性の両面から楽しむ趣味について。',
    content: '今年の初めに一眼レフカメラを購入してから、約半年が経ちました。最初は「良い写真を撮りたい」という単純な動機でしたが、今では写真が私の生活に欠かせないものになっています。\n\nカメラを持ち歩くようになってから、日常の何気ない風景に美しさを見出すようになりました。朝の光、雨上がりの街並み、カフェの窓から差し込む陽射し。以前は気づかなかった小さな瞬間に、シャッターを切る喜びを感じています。\n\n技術的な面でも学ぶことが多く、露出、シャッタースピード、ISO感度など、様々なパラメータを調整して理想の1枚を追求する過程は、プログラミングのデバッグ作業に似ています。試行錯誤しながら最適解を見つけていく感覚が楽しいです。\n\n最近は週末に街を歩きながらのスナップ撮影にハマっています。被写体を探しながら歩くことで、運動にもなり、新しい場所の発見にもつながります。来月は紅葉を撮りに京都へ行く予定です。',
    author: '小林大洋',
    date: '2024-06-15',
    readTime: '4分',
    category: 'hobby',
    tags: ['写真', 'カメラ', '趣味', 'クリエイティブ'],
    imageUrl: 'https://images.unsplash.com/photo-1622319977720-9949ac28adc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYXxlbnwxfHx8fDE3Njc1NTI1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    title: 'ミニマリストを目指して：物を減らして気づいたこと',
    excerpt: '断捨離を始めて3ヶ月。物を減らすことで得られた、心の余裕と生活の質の向上について書きます。',
    content: '今年の春から、ミニマリスト的な生活を意識するようになりました。きっかけは、引っ越しの際に大量の不用品を処分したことです。「こんなに使っていないものを持っていたのか」という驚きから、生活を見直すことにしました。\n\n最初は洋服から始めました。「1年間着ていない服は処分する」というルールを設け、クローゼットの半分以上を手放しました。結果、毎朝の服選びが楽になり、時間の節約にもつながりました。\n\n次に本や雑貨の整理。思い出の品は別として、「今の自分に必要か」という基準で判断しました。物理的な本は電子書籍に移行し、本棚のスペースが大幅に空きました。部屋がすっきりして、掃除も楽になりました。\n\n物を減らすことで、本当に大切なものが見えてきました。また、新しく物を買う際も、「本当に必要か」を慎重に考えるようになり、無駄な買い物が減りました。シンプルな生活は、心にも余裕をもたらしてくれます。',
    author: '小林大洋',
    date: '2024-05-20',
    readTime: '4分',
    category: 'lifestyle',
    tags: ['ミニマリスト', '断捨離', 'ライフハック', '整理整頓'],
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop',
  },
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedPost ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">ブログ</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                技術的な知見や開発経験、学んだことを共有しています
              </p>
            </div>
            <BlogList posts={samplePosts} onPostClick={setSelectedPost} />
          </>
        ) : (
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        )}
      </div>
    </section>
  );
}
