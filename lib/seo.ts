import type { Metadata } from "next";
import type { BlogPost } from "./types";

const SITE_NAME = "Fuji Hinoki";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function generateBlogMetadata(post: BlogPost): Metadata {
  const title = post.title;
  const description = post.excerpt;
  const ogImage = post.thumbnail?.url || DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
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
  };
}

export function generateBlogJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail?.url || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.category?.name,
  };
}

export function generateBlogListJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} ブログ`,
    description: "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります",
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.thumbnail?.url,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };
}
