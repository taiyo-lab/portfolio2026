import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Inter } from "next/font/google";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";
import "../styles/globals.css";
import { ThemeProvider } from "../components/theme-provider";

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen-kaku",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Masahiro.dev",
  description: "小林大洋のポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${zenKakuGothic.className} ${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
