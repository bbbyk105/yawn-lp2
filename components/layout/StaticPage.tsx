import type { ReactNode } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

/** プライバシーポリシー・特商法・お問い合わせなど、見出しと本文だけのページ */
export default function StaticPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
            {title}
          </h1>
          <div className="prose prose-zinc max-w-none text-sm md:text-base leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
