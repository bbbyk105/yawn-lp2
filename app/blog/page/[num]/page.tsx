import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getCategories } from "@/lib/microcms";
import { generateBlogListJsonLd } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";
import JsonLd from "@/components/seo/JsonLd";
import { BLOG_PER_PAGE } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { parsePageNumber } from "@/lib/utils";

type Props = {
  params: Promise<{ num: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  const pageNum = parsePageNumber(num);
  if (!pageNum) return {};
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

// ビルド時には作らず、初めて開かれたときに生成して60秒キャッシュする（ISR）。
// これが無いとアクセスのたびに microCMS へ問い合わせてページを作っていた
export async function generateStaticParams() {
  return [];
}

export default async function BlogPageNum({ params }: Props) {
  const { num } = await params;
  const pageNum = parsePageNumber(num);
  if (!pageNum) notFound();

  const offset = (pageNum - 1) * BLOG_PER_PAGE;
  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogPosts({ limit: BLOG_PER_PAGE, offset }),
    getCategories(),
  ]);
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) notFound();

  return (
    <>
      <JsonLd data={generateBlogListJsonLd(posts)} />
      {/* <main> は app/blog/layout.tsx 側で出力している */}
      <div className="min-h-screen bg-white">
        <BlogList
          initialPosts={posts}
          totalCount={totalCount}
          categories={categories}
          currentPage={pageNum}
        />
      </div>
    </>
  );
}
