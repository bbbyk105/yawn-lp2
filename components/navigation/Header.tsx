"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <button
            onClick={() => scrollToSection("hero")}
            className="font-en-display text-2xl md:text-3xl gradient-gold transition-all duration-300 hover:scale-105"
          >
            YawnNap
          </button>

          {/* デスクトップメニュー */}
          <ul className="hidden md:flex items-center gap-8">
            {["blog", "story", "gallery", "process"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className="font-en-accent text-sm tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-300"
                >
                  {section}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://yawnnap.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-linear-to-r from-hinoki-gold to-amber-500 text-black font-en-accent text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,169,98,0.6)]"
              >
                Shop
              </a>
            </li>
          </ul>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden relative w-6 h-6 flex flex-col justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            <span
              className={cn(
                "block h-0.5 w-full bg-white transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-white transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-white transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-zinc-800">
            <ul className="space-y-4">
              {["blog", "story", "gallery", "process"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left font-en-accent text-sm tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {section}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="https://yawnnap.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-linear-to-r from-hinoki-gold to-amber-500 text-black font-en-accent text-xs tracking-wider uppercase rounded-full"
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
