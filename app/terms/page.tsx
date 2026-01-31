import { Metadata } from "next";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | YawnNap",
  description:
    "YawnNap（ヨーンナップ）の特定商取引法に基づく表記です。販売業者、支払方法、返品・交換について記載しています。",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "特定商取引法に基づく表記 | YawnNap",
    url: `${SITE_URL}/terms`,
    type: "website",
    siteName: "YawnNap",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
            特定商取引法に基づく表記
          </h1>
          <div className="prose prose-zinc max-w-none text-sm md:text-base leading-relaxed space-y-6">
            <p>
              当サイトで掲載している商品・サービスに関する取引は、特定商取引法に基づき、以下のとおり表記いたします。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">販売業者</h2>
            <p>YawnNap（ヨーンナップ）</p>
            <h2 className="text-lg font-semibold mt-8 mb-4">
              支払方法・支払時期
            </h2>
            <p>
              商品ご購入の際は、各販売ページおよびショップに記載の方法に従います。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">
              返品・交換について
            </h2>
            <p>
              返品・交換の条件は、商品性質上および各販売元の規定に準じます。詳細はお買い求め先のショップまたはお問い合わせにてご確認ください。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">お問い合わせ</h2>
            <p>
              特定商取引法に基づく表記に関するお問い合わせは、当サイトのお問い合わせページよりご連絡ください。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
