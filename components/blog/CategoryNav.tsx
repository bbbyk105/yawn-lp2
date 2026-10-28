import Link from "next/link";
import type { Category } from "@/lib/types";

const PILL = "px-4 py-2 rounded-full text-sm transition-colors";
const PILL_INACTIVE = "bg-zinc-100 text-zinc-600 hover:bg-zinc-200";

/** カテゴリページへの導線。slug 未設定のカテゴリはページが無いので出さない */
export default function CategoryNav({
  categories,
  activeId,
  showAll = false,
  className,
}: {
  categories: Category[];
  /** 今いるカテゴリ（強調する） */
  activeId?: string;
  /** 先頭に「すべて」（/blog）を出す */
  showAll?: boolean;
  className?: string;
}) {
  const linkable = categories.filter((c) => c.slug);
  if (linkable.length === 0) return null;

  return (
    <nav className={className} aria-label="カテゴリ">
      {showAll && (
        <Link href="/blog" className={`${PILL} ${PILL_INACTIVE}`}>
          すべて
        </Link>
      )}
      {linkable.map((c) => (
        <Link
          key={c.id}
          href={`/blog/category/${c.slug}`}
          className={`${PILL} ${
            c.id === activeId ? "bg-hinoki-brown text-white" : PILL_INACTIVE
          }`}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
