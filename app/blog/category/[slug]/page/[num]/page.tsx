import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getBlogPosts, getCategories } from "@/lib/microcms";
import { BLOG_PER_PAGE } from "@/lib/constants";
import { generateBreadcrumbJsonLd, getCategoryDescription } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getListPagePath, parsePageNumber } from "@/lib/utils";
import BlogCard from "@/components/ui/BlogCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import CategoryNav from "@/components/blog/CategoryNav";
import Pagination from "@/components/blog/Pagination";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ slug: string; num: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, num } = await params;
  const pageNum = parsePageNumber(num);
  if (!pageNum) return {};
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "カテゴリが見つかりません | YawnNap" };
  const { totalCount } = await getBlogPosts({
    limit: 1,
    offset: 0,
    categoryId: category.id,
  });
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) return {};
  const title = `${category.name}（${pageNum}ページ目） | ブログ | YawnNap`;
  const url = `${SITE_URL}/blog/category/${slug}/page/${pageNum}`;
  return {
    title,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} | ブログ | YawnNap`,
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

export default async function CategoryPageNum({ params }: Props) {
  const { slug, num } = await params;
  const pageNum = parsePageNumber(num);
  if (!pageNum) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const offset = (pageNum - 1) * BLOG_PER_PAGE;
  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogPosts({ limit: BLOG_PER_PAGE, offset, categoryId: category.id }),
    getCategories(),
  ]);
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) notFound();

  const basePath = `/blog/category/${slug}`;
  // 画面のパンくずと構造化データを同じ配列から作る（食い違わないように）
  const breadcrumbs = [
    { name: "ホーム", path: "" },
    { name: "ブログ", path: "/blog" },
    { name: category.name, path: basePath },
    { name: `${pageNum}ページ目`, path: getListPagePath(basePath, pageNum) },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      {/* <main> は app/blog/layout.tsx 側で出力している */}
      <div className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
            {category.name}（{pageNum}ページ目）
          </h1>
          <p className="text-zinc-600 leading-relaxed max-w-2xl mb-12">
            {getCategoryDescription(category)}
          </p>

          <CategoryNav
            categories={categories}
            activeId={category.id}
            showAll
            className="mb-12 flex flex-wrap gap-3"
          />

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-6">
              記事一覧（{totalCount}件）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* ページネーション */}
          <Pagination
            basePath={basePath}
            currentPage={pageNum}
            totalPages={totalPages}
            className="mt-12 flex justify-center items-center gap-2"
          />
        </div>
      </div>
    </>
  );
}
