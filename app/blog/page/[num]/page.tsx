import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getCategories } from "@/lib/microcms";
import { generateBlogListJsonLd } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";
import { BLOG_PER_PAGE } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

type Props = {
  params: Promise<{ num: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  const pageNum = parseInt(num, 10);
  if (Number.isNaN(pageNum) || pageNum < 2) return {};
  const { totalCount } = await getBlogPosts({ limit: 1, offset: 0 });
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) return {};
  const title = `ブログ（${pageNum}ページ目） | 富士山・ひのき・アロマ | YawnNap`;
  const url = `${SITE_URL}/blog/page/${pageNum}`;
  return {
    title,
    description:
      "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山観光、ひのきの香り、アロマ効果、リラックス方法、日本土産情報など。",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `ブログ（${pageNum}ページ目） | YawnNap`,
      url,
      siteName: "YawnNap",
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 60;

export default async function BlogPageNum({ params }: Props) {
  const { num } = await params;
  const pageNum = parseInt(num, 10);
  if (Number.isNaN(pageNum) || pageNum < 2) notFound();

  const offset = (pageNum - 1) * BLOG_PER_PAGE;
  const { posts, totalCount } = await getBlogPosts({
    limit: BLOG_PER_PAGE,
    offset,
  });
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) notFound();

  const categories = await getCategories();
  const jsonLd = generateBlogListJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <BlogList
          initialPosts={posts}
          totalCount={totalCount}
          categories={categories}
          currentPage={pageNum}
        />
      </main>
    </>
  );
}
