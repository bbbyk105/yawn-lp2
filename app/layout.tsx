import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Inter,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const MAIN_SEO_KEYWORDS = [
  "富士山",
  "ひのき",
  "アロマ",
  "ひのきフレグランス",
  "日本土産",
  "リラックス",
  "富士ヒノキ",
  "フレグランスペーパー",
  "森林浴",
  "自然",
  "ウェルネス",
  "富士山 観光",
  "富士山 お土産",
  "ひのき 香り",
  "ひのき アロマ",
  "アロマ 効果",
  "アロマ リラックス",
  "日本土産 おすすめ",
  "日本土産 人気",
  "リラックス グッズ",
  "リラックス アイテム",
  "ヒノキチオール",
  "ポケットサイズ アロマ",
  "持ち運び アロマ",
  "深呼吸",
  "自然 香り",
  "和の香り",
  "日本製 アロマ",
  "YawnNap",
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "YawnNap - 富士ヒノキのフレグランスペーパー | ポケットサイズの森林浴 | 富士山・ひのき・アロマ",
  description:
    "ほんの少しの深呼吸で、今日が変わる。富士山麓の富士ヒノキの香りをポケットに入れて持ち歩ける、フレグランスペーパーYawnNap。富士山観光のお土産としても人気。ひのきのアロマでリラックス、日本土産として最適なアイテムです。",
  keywords: MAIN_SEO_KEYWORDS.join(", "),
  openGraph: {
    title: "YawnNap - ポケットサイズの森林浴 | 富士山・ひのき・アロマ",
    description:
      "ほんの少しの深呼吸で、今日が変わる。富士山麓の富士ヒノキの香りを持ち歩く。日本土産としても人気のフレグランスペーパー。",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "YawnNap - ポケットサイズの森林浴 | 富士山・ひのき・アロマ",
    description:
      "ほんの少しの深呼吸で、今日が変わる。富士山麓の富士ヒノキの香りでリラックス。",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`
        ${notoSansJP.variable} 
        ${notoSerifJP.variable} 
        ${inter.variable} 
        ${playfair.variable} 
        ${spaceGrotesk.variable}
      `}
      style={
        {
          "--font-noto-sans-jp": notoSansJP.style.fontFamily,
          "--font-noto-serif-jp": notoSerifJP.style.fontFamily,
          "--font-inter": inter.style.fontFamily,
          "--font-playfair": playfair.style.fontFamily,
          "--font-space-grotesk": spaceGrotesk.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
