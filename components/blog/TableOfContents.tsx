"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { ChevronDown, List } from "lucide-react";
import type { TocItem } from "@/lib/blog-content";
import { scrollToId } from "@/lib/scroll";
import { useActiveHeading } from "@/hooks/useActiveHeading";

/** 見出しへ飛ぶときに固定ヘッダーで隠れないよう空ける高さ（px） */
const HEADING_SCROLL_OFFSET = 100;

const ActiveHeadingContext = createContext("");

/**
 * 今読んでいる見出しをスクロールに合わせて1か所で求め、中の MobileToc・DesktopToc に配る
 * （それぞれで求めると、スクロールのたびに見出しの位置を2回ずつ測ることになる）
 */
export function TocProvider({
  items,
  children,
}: {
  items: TocItem[];
  children: ReactNode;
}) {
  const activeId = useActiveHeading(items.map((item) => item.id));
  return <ActiveHeadingContext value={activeId}>{children}</ActiveHeadingContext>;
}

function TocList({
  items,
  activeId,
  onSelect,
  className,
  level3ClassName,
}: {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  /** h3（1段下げる見出し）に足すスタイル */
  level3ClassName: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`block w-full text-left py-2 px-3 rounded transition-all ${
              item.level === 3 ? level3ClassName : ""
            } ${
              activeId === item.id
                ? "text-zinc-900 font-medium border-l-2 border-zinc-900"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** スマホ・タブレット用: 記事の上に固定される、開閉できる目次 */
export function MobileToc({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = use(ActiveHeadingContext);

  const select = (id: string) => {
    if (scrollToId(id, HEADING_SCROLL_OFFSET)) setIsOpen(false);
  };

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-zinc-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full py-3 flex items-center justify-between text-sm font-medium text-zinc-900"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4" />
            目次
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <nav className="py-4 border-t border-zinc-100">
            <TocList
              items={items}
              activeId={activeId}
              onSelect={select}
              className="space-y-1 text-sm"
              level3ClassName="pl-6"
            />
          </nav>
        )}
      </div>
    </div>
  );
}

/** PC用: 本文の横に固定されるサイドバーの目次 */
export function DesktopToc({ items }: { items: TocItem[] }) {
  const activeId = use(ActiveHeadingContext);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24">
        <p className="text-sm font-bold text-zinc-900 mb-4 px-3">目次</p>
        <nav>
          <TocList
            items={items}
            activeId={activeId}
            onSelect={(id) => scrollToId(id, HEADING_SCROLL_OFFSET)}
            className="space-y-1 text-sm"
            level3ClassName="pl-6 text-xs"
          />
        </nav>
      </div>
    </aside>
  );
}
