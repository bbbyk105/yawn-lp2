import { Metadata } from "next";
import { getBlogPosts, getCategories } from "@/lib/microcms";
import { generateBlogListJsonLd } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";

const BLOG_KEYWORDS = [
  "富士山",
  "ひのき",
  "アロマ",
  "ひのきフレグランス",
  "日本土産",
  "リラックス",
  "富士山 観光",
  "富士山 お土産",
  "ひのき 香り",
  "ひのき アロマ",
  "アロマ 効果",
  "アロマ リラックス",
  "フレグランスペーパー",
  "日本土産 おすすめ",
  "日本土産 人気",
  "リラックス グッズ",
  "森林浴",
  "ヒノキチオール",
  "ポケットサイズ アロマ",
  "ウェルネス",
  "自然 香り",
  "和の香り",
  "日本製 アロマ",
  "YawnNap",
  "富士ヒノキ",
];

export const metadata: Metadata = {
  title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Fuji Hinoki",
  description:
    "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山観光、ひのきの香り、アロマ効果、リラックス方法、日本土産情報など、月間1000ビュー以上の高品質なコンテンツをお届けします。",
  keywords: BLOG_KEYWORDS.join(", "),
  openGraph: {
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Fuji Hinoki",
    description:
      "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山観光、ひのきの香り、アロマ効果、リラックス方法、日本土産情報をお届けします。",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    type: "website",
    siteName: "Fuji Hinoki",
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Fuji Hinoki",
    description:
      "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。",
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
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
};

export const revalidate = 60; // ISR: 60秒ごとに再検証

export default async function BlogPage() {
  const { posts, totalCount } = await getBlogPosts({ limit: 12 });
  const categories = await getCategories();

  // JSON-LD構造化データ
  const jsonLd = generateBlogListJsonLd(posts);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <BlogList
          initialPosts={posts}
          totalCount={totalCount}
          categories={categories}
        />
      </main>
    </>
  );
}
