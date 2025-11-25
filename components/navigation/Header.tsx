"use client";

import { useEffect, useState } from "react";
import { cn, smoothScrollTo } from "@/lib/utils";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm"
          : "bg-white/80 backdrop-blur-md"
      )}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="font-en-display text-2xl md:text-3xl text-hinoki-gold hover:opacity-80 transition-all duration-300"
          >
            YawnNap
          </Link>

          {/* デスクトップメニュー */}
          <ul className="hidden md:flex items-center gap-8">
            {[
              { id: "products", label: "Products" },
              { id: "brand-story", label: "Story" },
              { id: "hinoki-story", label: "Hinoki" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className="font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href="https://yawnnap.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-linear-to-r from-hinoki-gold to-amber-500 text-white font-en-accent text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-hinoki-gold/30 hover:scale-105"
              >
                Shop
              </a>
            </li>
          </ul>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden relative w-6 h-6 flex flex-col justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"
            }
          >
            <span
              className={cn(
                "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-zinc-200">
            <ul className="space-y-4">
              {[
                { id: "products", label: "Products" },
                { id: "brand-story", label: "Story" },
                { id: "hinoki-story", label: "Hinoki" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      smoothScrollTo(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li className="pt-4">
                <a
                  href="https://yawnnap.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-linear-to-r from-hinoki-gold to-amber-500 text-white font-en-accent text-xs tracking-wider uppercase rounded-full hover:shadow-lg hover:shadow-hinoki-gold/30 transition-all duration-300"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
