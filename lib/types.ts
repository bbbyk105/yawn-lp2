// microCMS Blog型定義
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category?: Category;
  publishedAt: string;
  updatedAt: string;
  /** microCMS で未入力の記事があるため optional（その場合は id をURLに使う） */
  slug?: string;
}

/** 一覧カード表示に必要なフィールドだけ（本文をクライアントへ送らないため） */
export type BlogCardPost = Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "thumbnail" | "category" | "publishedAt"
>;

export interface Category {
  id: string;
  name: string;
  /** microCMS のカテゴリAPIに slug フィールドが無い場合は undefined。カテゴリページへのリンクは slug がある時だけ出す */
  slug?: string;
}

// ギャラリー画像型定義
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "product" | "fuji" | "waterfall" | "hinoki";
  caption?: string;
}

// プロセスステップ型定義
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

// アニメーション設定型
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// SEO Meta型
export interface SEOMeta {
  title: string;
  description: string;
  ogImage: string;
  keywords: string[];
}
