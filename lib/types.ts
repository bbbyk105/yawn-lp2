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
  category: {
    id: string;
    name: string;
    slug: string;
  };
  publishedAt: string;
  updatedAt: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
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
