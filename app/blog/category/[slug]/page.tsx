import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getBlogPosts, getCategories } from "@/lib/microcms";
import { BLOG_PER_PAGE } from "@/lib/constants";
import BlogCard from "@/components/ui/BlogCard";
import type { Category } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

type Props = {
  params: Promise<{ slug: string }>;
};

/** カテゴリslugに応じた説明文（microCMSに説明フィールドが無い場合の暫定） */
function getCategoryDescription(category: Category): string {
  const name = category.name;
  const base =
    `${name}に関する記事一覧です。富士山麓の富士ヒノキの香りや、ひのきアロマ、フレグランスペーパーYawnNapにまつわる` +
    `「${name}」にまつわる情報をまとめています。リラックス方法、日本土産、森林浴の効果、ウェルネスなど、` +
    `日々の深呼吸に役立つコンテンツをお届けします。`;
  return base;
}

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

// ビルド時に microCMS が未接続だと slug が渡らずエラーになるため、静的生成は行わずリクエスト時に生成
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { posts, totalCount } = await getBlogPosts({
    limit: BLOG_PER_PAGE,
    offset: 0,
    categoryId: category.id,
  });
  const categories = await getCategories();
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  const description = getCategoryDescription(category);

  // 人気・おすすめ記事（暫定: 同じカテゴリの先頭2件を「おすすめ」として表示）
  const featuredPosts = posts.length >= 2 ? posts.slice(0, 2) : [];
  const listPosts = featuredPosts.length > 0 ? posts.slice(2) : posts;

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* パンくず */}
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
                <span itemProp="name" className="text-zinc-900 font-medium">
                  {category.name}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
            {category.name}
          </h1>
          <p className="text-zinc-600 leading-relaxed max-w-2xl mb-12">
            {description}
          </p>

          {/* カテゴリ導線（URLを持つ） */}
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
                (pageNum) => {
                  const href =
                    pageNum === 1
                      ? `/blog/category/${slug}`
                      : `/blog/category/${slug}/page/${pageNum}`;
                  return (
                    <Link
                      key={pageNum}
                      href={href}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                    >
                      {pageNum}
                    </Link>
                  );
                },
              )}
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
