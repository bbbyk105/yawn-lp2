import { Suspense } from "react";
import Header from "@/components/navigation/Header";
import ScrollProgress from "@/components/animations/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import ProductIntroSection from "@/components/sections/ProductIntroSection";
import BlogSection from "@/components/sections/BlogSection";
import ThreeProductsSection from "@/components/sections/ThreeProductsSection";
import HinokiStorySection from "@/components/sections/HinokiStorySection";
import HowToUseSection from "@/components/sections/HowToUseSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import HashScrollHandler from "@/components/utils/HashScrollHandler";
import { getBlogPosts } from "@/lib/microcms";

export const revalidate = 3600; // 1時間ごとに再検証

export default async function HomePage() {
  // getBlogPostsの返り値は { posts, totalCount } のオブジェクト
  const { posts: blogPosts } = await getBlogPosts({ limit: 6 });

  return (
    <>
      <HashScrollHandler />
      <ScrollProgress />
      <Header />

      <main className="relative bg-black">
        {/* 1. Hero - 3つのコピーが順番に表示 */}
        <HeroSection />

        {/* 2. Product Intro - 9枚の写真で没入体験 */}
        <ProductIntroSection />

        {/* 3. Blog - タイトル・サムネイル明確 */}
        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogSection posts={blogPosts} />
        </Suspense>

        {/* 4. 3 Products - 各商品3枚ずつ紹介 */}
        <ThreeProductsSection />

        {/* 5. Hinoki Story - ヒノキチオールの物語 */}
        <HinokiStorySection />

        {/* 6. How to Use - 使い方ステップ */}
        <HowToUseSection />

        {/* 7. Brand Story - ブランドの想い */}
        <BrandStorySection />

        {/* 8. CTA */}
        <CTASection />

        {/* 9. Footer */}
        <Footer />
      </main>
    </>
  );
}

function BlogSectionSkeleton() {
  return (
    <section className="min-h-screen bg-hinoki-light/5 flex items-center justify-center">
      <div className="text-hinoki-gold animate-pulse-slow">Loading...</div>
    </section>
  );
}
