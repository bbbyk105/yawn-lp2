"use client";

import {
  createContext,
  use,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useOnScroll } from "@/hooks/useOnScroll";

const MobileMenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} | null>(null);

function useMobileMenu() {
  const value = use(MobileMenuContext);
  if (!value) throw new Error("HeaderShell の中で使ってください");
  return value;
}

/** 固定ヘッダーの外枠。50px スクロールしたら背景を濃くし、モバイルメニューの開閉を持つ */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useOnScroll(() => setIsScrolled(window.scrollY > 50));

  return (
    <MobileMenuContext value={{ isOpen, setIsOpen }}>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm"
            : "bg-white/80 backdrop-blur-md",
        )}
      >
        {children}
      </header>
    </MobileMenuContext>
  );
}

export function MobileMenuButton() {
  const { isOpen, setIsOpen } = useMobileMenu();

  return (
    <button
      type="button"
      className="md:hidden relative w-6 h-6 flex flex-col justify-center gap-1.5"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
          isOpen && "rotate-45 translate-y-2",
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
          isOpen && "opacity-0",
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-full bg-zinc-800 transition-all duration-300",
          isOpen && "-rotate-45 -translate-y-2",
        )}
      />
    </button>
  );
}

/** 開いているときだけ中身を出す。中のリンクを押したら閉じる */
export function MobileMenuPanel({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useMobileMenu();

  if (!isOpen) return null;

  const closeOnLinkClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a")) setIsOpen(false);
  };

  return (
    // リンクのクリック（Enter キーでの選択も click になる）が伝わってきたら閉じる
    <div
      className="md:hidden mt-6 py-6 border-t border-zinc-200"
      onClick={closeOnLinkClick}
    >
      {children}
    </div>
  );
}
