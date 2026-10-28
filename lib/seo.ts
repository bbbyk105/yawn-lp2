import type { Metadata } from "next";
import type { BlogPost, Category } from "./types";
import { SHOP_URL, SITE_NAME, SITE_URL } from "./site";
import { getBlogPostPath } from "./utils";

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

// メインSEOキーワード（クライアント指定）
const MAIN_KEYWORDS = [
  "富士山",
  "ひのき",
  "アロマ",
  "ひのきフレグランス",
  "日本土産",
  "リラックス",
];

// 関連SEOキーワード（検索上位を狙う）
const RELATED_KEYWORDS = [
  "富士山 観光",
  "富士山 お土産",
  "富士山 グッズ",
  "ひのき 香り",
  "ひのき アロマ",
  "ひのき 効果",
  "ヒノキチオール",
  "アロマ 効果",
  "アロマ リラックス",
  "アロマ グッズ",
  "フレグランスペーパー",
  "フレグランス ペーパー",
  "日本土産 おすすめ",
  "日本土産 人気",
  "日本土産 2024",
  "リラックス グッズ",
  "リラックス アイテム",
  "リラックス 方法",
  "森林浴",
  "ポケットサイズ アロマ",
  "持ち運び アロマ",
  "深呼吸",
  "ウェルネス",
  "自然 香り",
  "和の香り",
  "日本製 アロマ",
  "YawnNap",
  "富士ヒノキ",
];

// ブログ記事からキーワードを抽出・生成
function extractKeywordsFromPost(post: BlogPost): string[] {
  const keywords = new Set<string>([...MAIN_KEYWORDS]);

  // タイトルと本文からキーワードを抽出
  const text = `${post.title} ${post.excerpt} ${
    post.content || ""
  }`.toLowerCase();

  // メインキーワードが含まれているかチェック
  MAIN_KEYWORDS.forEach((keyword) => {
    if (text.includes(keyword.toLowerCase())) {
      keywords.add(keyword);
    }
  });

  // カテゴリー名もキーワードに追加
  if (post.category?.name) {
    keywords.add(post.category.name);
  }

  // 関連キーワードを追加（タイトルや本文に関連性がある場合）
  RELATED_KEYWORDS.forEach((keyword) => {
    const parts = keyword.split(" ");
    if (parts.some((part) => text.includes(part.toLowerCase()))) {
      keywords.add(keyword);
    }
  });

  return Array.from(keywords).slice(0, 30); // 最大30個のキーワード
}

/** excerpt は改行入りで入稿されているため、description 用に1行へ整える */
function toDescription(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** @param path 正規URLのパス部分（resolveBlogPost が決めたもの） */
export function generateBlogMetadata(post: BlogPost, path: string): Metadata {
  const title = post.title;
  const description = toDescription(
    post.excerpt ||
      `${title}について。富士山麓のひのきの香りでリラックス。アロマフレグランスペーパーYawnNap。`,
  );
  const ogImage = post.thumbnail?.url || DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}/blog/${path}`;
  const keywords = extractKeywordsFromPost(post);

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: post.thumbnail?.width || 1200,
          height: post.thumbnail?.height || 630,
          alt: title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: keywords.slice(0, 10), // OpenGraphタグ用
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
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
  };
}

/** @param path 正規URLのパス部分（resolveBlogPost が決めたもの） */
export function generateBlogJsonLd(post: BlogPost, path: string) {
  const keywords = extractKeywordsFromPost(post);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: toDescription(
      post.excerpt ||
        `${post.title}について。富士山麓のひのきの香りでリラックス。`,
    ),
    image: post.thumbnail?.url || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${path}`,
    },
    keywords: keywords.join(", "),
    articleSection: post.category?.name || "ブログ",
    inLanguage: "ja-JP",
  };
}

/** トップページ用: ブランド（Organization）とサイト（WebSite） */
export function generateSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "ヨーンナップ",
      url: SITE_URL,
      sameAs: ["https://www.instagram.com/yawn.nap_", SHOP_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];
}

/**
 * パンくずの構造化データ（BreadcrumbList）
 * @param items 先頭から順に。path はサイト内のパス（トップは ""）
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** カテゴリページの説明文（microCMS のカテゴリに説明フィールドが無いための暫定） */
export function getCategoryDescription(category: Category): string {
  const name = category.name;
  return (
    `${name}に関する記事一覧です。富士山麓の富士ヒノキの香りや、ひのきアロマ、フレグランスペーパーYawnNapにまつわる` +
    `「${name}」の情報をまとめています。リラックス方法、日本土産、森林浴の効果、ウェルネスなど、` +
    `日々の深呼吸に役立つコンテンツをお届けします。`
  );
}

export function generateBlogListJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} ブログ`,
    description:
      "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山、ひのき、アロマ、リラックス、日本土産に関する情報をお届けします。",
    url: `${SITE_URL}/blog`,
    keywords: MAIN_KEYWORDS.join(", "),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt && toDescription(post.excerpt),
      image: post.thumbnail?.url,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/blog/${getBlogPostPath(post)}`,
      keywords: extractKeywordsFromPost(post).join(", "),
    })),
  };
}
