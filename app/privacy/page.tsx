import { Metadata } from "next";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "プライバシーポリシー | YawnNap",
  description:
    "YawnNap（ヨーンナップ）のプライバシーポリシーです。お客様の個人情報の取り扱いについて定めています。",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "プライバシーポリシー | YawnNap",
    url: `${SITE_URL}/privacy`,
    type: "website",
    siteName: "YawnNap",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-zinc-900 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
            プライバシーポリシー
          </h1>
          <div className="prose prose-zinc max-w-none text-sm md:text-base leading-relaxed space-y-6">
            <p>
              YawnNap（以下「当サイト」）は、お客様の個人情報の保護を重要な責務と認識し、以下の方針に基づいて適切な取り扱いと保護に努めます。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">
              1. 個人情報の収集について
            </h2>
            <p>
              当サイトでは、お問い合わせやご購入の際に、氏名・メールアドレス・住所などの個人情報をご提供いただく場合があります。これらはサービスの提供およびお問い合わせへの対応のためにのみ使用します。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">
              2. 個人情報の利用目的
            </h2>
            <p>
              収集した個人情報は、ご本人の同意なく、申し上げた利用目的の範囲を超えて使用することはありません。
            </p>
            <h2 className="text-lg font-semibold mt-8 mb-4">3. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、当サイトのお問い合わせページよりご連絡ください。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
