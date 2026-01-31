import { MetadataRoute } from "next";
import { getAllBlogSlugs, getCategories } from "@/lib/microcms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

/** サイトマップの最大URL数（Google推奨は50,000。分割する場合はこの値以下に） */
const SITEMAP_URL_LIMIT = 50000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // カテゴリ一覧（1ページ目のみ）
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryPages = categories.map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  // ブログ記事（全件）
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllBlogSlugs();
    blogPages = slugs
      .slice(0, SITEMAP_URL_LIMIT - staticPages.length - categoryPages.length)
      .map((slug) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
  }

  return [...staticPages, ...categoryPages, ...blogPages];
}
