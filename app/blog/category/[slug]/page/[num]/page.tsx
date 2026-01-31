import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getBlogPosts, getCategories } from "@/lib/microcms";
import { BLOG_PER_PAGE } from "@/lib/constants";
import BlogCard from "@/components/ui/BlogCard";
import type { Category } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

type Props = {
  params: Promise<{ slug: string; num: string }>;
};

function getCategoryDescription(category: Category): string {
  const name = category.name;
  return (
    `${name}に関する記事一覧です。富士山麓の富士ヒノキの香りや、ひのきアロマ、フレグランスペーパーYawnNapにまつわる` +
    `「${name}」にまつわる情報をまとめています。リラックス方法、日本土産、森林浴の効果、ウェルネスなど、` +
    `日々の深呼吸に役立つコンテンツをお届けします。`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, num } = await params;
  const pageNum = parseInt(num, 10);
  if (Number.isNaN(pageNum) || pageNum < 2) return {};
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "カテゴリが見つかりません | YawnNap" };
  const { totalCount } = await getBlogPosts({
    limit: 1,
    offset: 0,
    categoryId: category.id,
  });
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
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

export default async function CategoryPageNum({ params }: Props) {
  const { slug, num } = await params;
  const pageNum = parseInt(num, 10);
  if (Number.isNaN(pageNum) || pageNum < 2) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const offset = (pageNum - 1) * BLOG_PER_PAGE;
  const { posts, totalCount } = await getBlogPosts({
    limit: BLOG_PER_PAGE,
    offset,
    categoryId: category.id,
  });
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  if (pageNum > totalPages) notFound();

  const categories = await getCategories();
  const description = getCategoryDescription(category);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "ブログ",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE_URL}/blog/category/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${pageNum}ページ目`,
        item: `${SITE_URL}/blog/category/${slug}/page/${pageNum}`,
      },
    ],
  };

  const prevUrl =
    pageNum === 2
      ? `/blog/category/${slug}`
      : `/blog/category/${slug}/page/${pageNum - 1}`;
  const nextUrl =
    pageNum < totalPages ? `/blog/category/${slug}/page/${pageNum + 1}` : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol
              className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/"
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">ホーム</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-zinc-300">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/blog"
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">ブログ</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-zinc-300">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href={`/blog/category/${slug}`}
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">{category.name}</span>
                </Link>
                <meta itemProp="position" content="3" />
              </li>
              <li className="text-zinc-300">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name" className="text-zinc-900 font-medium">
                  {pageNum}ページ目
                </span>
                <meta itemProp="position" content="4" />
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
            {category.name}（{pageNum}ページ目）
          </h1>
          <p className="text-zinc-600 leading-relaxed max-w-2xl mb-12">
            {description}
          </p>

          {categories.length > 0 && (
            <nav className="mb-12 flex flex-wrap gap-3" aria-label="カテゴリ">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
              >
                すべて
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/blog/category/${c.slug}`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    c.id === category.id
                      ? "bg-hinoki-brown text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          )}

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
          <nav
            className="mt-12 flex justify-center items-center gap-4"
            aria-label="ページネーション"
          >
            {pageNum > 1 && (
              <Link
                href={prevUrl}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
              >
                前へ
              </Link>
            )}
            <span className="text-sm text-zinc-600">
              {pageNum} / {totalPages}
            </span>
            {nextUrl && (
              <Link
                href={nextUrl}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
              >
                次へ
              </Link>
            )}
          </nav>
        </div>
      </main>
    </>
  );
}
