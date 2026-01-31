import { Metadata } from "next";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "お問い合わせ | YawnNap",
  description:
    "YawnNap（ヨーンナップ）へのお問い合わせはこちらから。商品・取材・その他のご質問を承ります。",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "お問い合わせ | YawnNap",
    url: `${SITE_URL}/contact`,
    type: "website",
    siteName: "YawnNap",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
            お問い合わせ
          </h1>
          <div className="prose prose-zinc max-w-none text-sm md:text-base leading-relaxed space-y-6">
            <p>
              YawnNapに関するお問い合わせは、下記の方法にてお願いいたします。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">
              メールでのお問い合わせ
            </h2>
            <p>
              お手数ですが、公式SNS（Instagram：
              <a
                href="https://www.instagram.com/yawn.nap_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hinoki-gold hover:underline"
              >
                @yawn.nap_
              </a>
              ）のDM、またはオンラインショップ（
              <a
                href="https://yawnnap.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hinoki-gold hover:underline"
              >
                yawnnap.shop
              </a>
              ）のお問い合わせフォームよりご連絡ください。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">対応時間</h2>
            <p>
              いただいたお問い合わせには、2〜3営業日以内を目安にご返信いたします。お急ぎの場合は、ショップまたはSNSにてお知らせください。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
