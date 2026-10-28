import Link from "next/link";
import ScrollAnimate from "@/components/animations/ScrollAnimate";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import BlogCard from "@/components/ui/BlogCard";
import { getBlogPosts } from "@/lib/microcms";

/** トップのブログ欄。記事は自分で取りに行くので、page.tsx では <Suspense> で包む */
export default async function BlogSection() {
  const { posts } = await getBlogPosts({ limit: 6 });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className="relative min-h-screen py-20 md:py-28 bg-linear-to-b from-white via-zinc-50 to-white overflow-hidden"
      id="blog"
      aria-labelledby="blog-heading"
    >
      <div className="absolute inset-0 hinoki-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <ScrollAnimate
          from={{ opacity: 0, y: 60, duration: 1.2 }}
          start="top 80%"
          end="top 50%"
          className="mb-16 md:mb-20 text-center space-y-4"
        >
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            Forest Journal
          </p>
          <h2
            id="blog-heading"
            className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black"
          >
            BLOGS
          </h2>
          <p className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            富士山麓の自然、富士ヒノキの魅力、
            <br />
            日々のリラックス方法について綴ります。
          </p>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            // 左右交互に、少し傾いた状態から入ってくる
            const side = index % 2 === 0 ? -1 : 1;
            return (
              <ScrollAnimate
                key={post.id}
                from={{
                  opacity: 0,
                  x: side * 100,
                  y: 50,
                  rotation: side * 5,
                  duration: 1.2,
                }}
                start="top 85%"
                end="top 50%"
              >
                <BlogCard post={post} />
              </ScrollAnimate>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 font-en-accent text-xs tracking-[0.3em] text-hinoki-brown uppercase transition-all duration-300 hover:gap-4 hover:text-hinoki-gold"
          >
            View All Articles
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
