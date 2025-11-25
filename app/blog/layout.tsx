import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ | YawnNap - 富士ヒノキと森のある暮らし",
  description:
    "YawnNapのブログ。富士ヒノキの魅力、森林浴の効果、香りのある暮らしのヒント、商品の使い方など、森とともに過ごす日々の情報をお届けします。",
  keywords: [
    "富士ヒノキ",
    "ブログ",
    "森林浴",
    "アロマ",
    "ライフスタイル",
    "ウェルネス",
    "香り",
    "自然",
  ],
  openGraph: {
    title: "ブログ | YawnNap",
    description:
      "富士ヒノキの魅力、森林浴の効果、香りのある暮らしのヒントをお届け。",
    images: ["/images/blog-og-image.jpg"],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | YawnNap",
    description: "富士ヒノキと森のある暮らし",
    images: ["/images/blog-twitter-image.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50">{children}</main>
      <Footer />
    </>
  );
}
