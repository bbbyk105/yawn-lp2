"use client";

import { smoothScrollTo } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-50 border-t border-zinc-200">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-hinoki-gold to-transparent" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* ブランド情報 */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-en-display text-3xl md:text-4xl text-hinoki-gold tracking-tight">
              YawnNap
            </h3>
            <p className="font-ja-display text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
              ＿持ち歩ける深呼吸＿
              <br />
              富士山麓の富士ヒノキの香りを
              <br />
              ポケットに入れて持ち歩く
              <br />
              フレグランスペーパー
            </p>
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/yawn.nap_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:text-hinoki-gold hover:border-hinoki-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* リンク: Product */}
          <div className="space-y-4">
            <h4 className="font-ja-display text-base md:text-lg tracking-wide text-black">
              Product
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-600">
              <li>
                <a
                  href="https://yawnnap.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hinoki-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  商品一覧
                  <svg
                    className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("products")}
                  className="hover:text-hinoki-gold transition-colors duration-300"
                >
                  3つのラインナップ
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("how-to-use")}
                  className="hover:text-hinoki-gold transition-colors duration-300"
                >
                  使い方
                </button>
              </li>
            </ul>
          </div>

          {/* リンク: About */}
          <div className="space-y-4">
            <h4 className="font-ja-display text-base md:text-lg tracking-wide text-black">
              About
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-600">
              <li>
                <button
                  onClick={() => smoothScrollTo("brand-story")}
                  className="hover:text-hinoki-gold transition-colors duration-300"
                >
                  ブランドストーリー
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("hinoki-story")}
                  className="hover:text-hinoki-gold transition-colors duration-300"
                >
                  富士ヒノキについて
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("blog")}
                  className="hover:text-hinoki-gold transition-colors duration-300"
                >
                  ブログ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ディバイダー */}
        <div className="h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent mb-8" />

        {/* コピーライト */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} YawnNap. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="hover:text-hinoki-gold transition-colors duration-300"
            >
              プライバシーポリシー
            </a>
            <a
              href="/terms"
              className="hover:text-hinoki-gold transition-colors duration-300"
            >
              特定商取引法
            </a>
            <a
              href="/contact"
              className="hover:text-hinoki-gold transition-colors duration-300"
            >
              お問い合わせ
            </a>
          </div>
        </div>

        {/* 最下部メッセージ */}
        <div className="mt-8 text-center">
          <p className="font-ja-display text-[10px] md:text-xs text-zinc-400 tracking-wider">
            森でちょっと一息しませんか？
          </p>
        </div>
      </div>
    </footer>
  );
}
