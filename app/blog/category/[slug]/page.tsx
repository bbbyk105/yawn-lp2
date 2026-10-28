import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getBlogPosts, getCategories } from "@/lib/microcms";
import { BLOG_PER_PAGE } from "@/lib/constants";
import { generateBreadcrumbJsonLd, getCategoryDescription } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getListPagePath } from "@/lib/utils";
import BlogCard from "@/components/ui/BlogCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import CategoryNav from "@/components/blog/CategoryNav";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "カテゴリ | YawnNap" };
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: "カテゴリが見つかりません | YawnNap" };
  }
  const title = `${category.name} | ブログ | YawnNap`;
  const description = `${category.name}の記事一覧。富士山・ひのき・アロマ・リラックスに関する情報をYawnNapブログでお届けしています。`;
  const url = `${SITE_URL}/blog/category/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} | ブログ | YawnNap`,
      description,
      url,
      type: "website",
      siteName: "YawnNap",
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 60;

// ビルド時には作らず（microCMS に繋がらない環境でもビルドできる）、初めて開かれたときに生成して60秒キャッシュする（ISR）。
// 以前は force-dynamic で、アクセスのたびに microCMS へ問い合わせてページを作っていた
export async function generateStaticParams() {
  return [];
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogPosts({ limit: BLOG_PER_PAGE, offset: 0, categoryId: category.id }),
    getCategories(),
  ]);
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  const basePath = `/blog/category/${slug}`;

  // 人気・おすすめ記事（暫定: 同じカテゴリの先頭2件を「おすすめ」として表示）
  const featuredPosts = posts.length >= 2 ? posts.slice(0, 2) : [];
  const listPosts = featuredPosts.length > 0 ? posts.slice(2) : posts;

  // 画面のパンくずと構造化データを同じ配列から作る（食い違わないように）
  const breadcrumbs = [
    { name: "ホーム", path: "" },
    { name: "ブログ", path: "/blog" },
    { name: category.name, path: basePath },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      {/* <main> は app/blog/layout.tsx 側で出力している */}
      <div className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
            {category.name}
          </h1>
          <p className="text-zinc-600 leading-relaxed max-w-2xl mb-12">
            {getCategoryDescription(category)}
          </p>

          {/* カテゴリ導線（URLを持つ） */}
          <CategoryNav
            categories={categories}
            activeId={category.id}
            showAll
            className="mb-12 flex flex-wrap gap-3"
          />

          {/* おすすめ記事（暫定） */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-zinc-900 mb-6">
                おすすめの記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* 記事一覧（おすすめ2件を除く） */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-6">
              記事一覧（{totalCount}件）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav
              className="mt-12 flex justify-center gap-2"
              aria-label="ページネーション"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={getListPagePath(basePath, pageNum)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                  >
                    {pageNum}
                  </Link>
                ),
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
