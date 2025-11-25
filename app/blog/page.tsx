import { Metadata } from "next";
import { getBlogPosts, getCategories } from "@/lib/microcms";
import { generateBlogListJsonLd } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "ブログ | Fuji Hinoki",
  description: "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります",
  openGraph: {
    title: "ブログ | Fuji Hinoki",
    description: "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | Fuji Hinoki",
    description: "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります",
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
