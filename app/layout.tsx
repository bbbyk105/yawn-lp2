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

export const metadata: Metadata = {
  title: "YawnNap - 富士ヒノキのフレグランスペーパー | ポケットサイズの森林浴",
  description:
    "ほんの少しの森で、今日が変わる。富士山麓の富士ヒノキの香りをポケットに入れて持ち歩ける、フレグランスペーパーYawnNap。持ち歩ける深呼吸で、忙しい毎日にひと呼吸分の森を。",
  keywords: [
    "富士ヒノキ",
    "フレグランスペーパー",
    "森林浴",
    "アロマ",
    "富士山",
    "自然",
    "リラックス",
    "ウェルネス",
  ],
  openGraph: {
    title: "YawnNap - ポケットサイズの森林浴",
    description:
      "ほんの少しの森で、今日が変わる。富士山麓の富士ヒノキの香りを持ち歩く。",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "YawnNap - ポケットサイズの森林浴",
    description: "ほんの少しの森で、今日が変わる。",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
