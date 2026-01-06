import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Toaster } from '../components/ui/sonner';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'エンジニア向けポートフォリオ',
  description: '小林大洋のポートフォリオサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
