import { createClient } from "microcms-js-sdk";
import type { BlogPost, Category } from "./types";

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error("NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error("NEXT_PUBLIC_MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// ブログ記事一覧取得
export const getBlogPosts = async (limit: number = 6) => {
  try {
    const data = await client.get<{ contents: BlogPost[] }>({
      endpoint: "blogs",
      queries: {
        limit,
        orders: "-publishedAt",
      },
    });
    return data.contents;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

// 単一ブログ記事取得
export const getBlogPost = async (slug: string) => {
  try {
    const data = await client.get<BlogPost>({
      endpoint: "blogs",
      contentId: slug,
    });
    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

// カテゴリー一覧取得
export const getCategories = async () => {
  try {
    const data = await client.get<{ contents: Category[] }>({
      endpoint: "categories",
    });
    return data.contents;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
