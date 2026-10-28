import Link from "next/link";
import { getListPagePath } from "@/lib/utils";

const LINK =
  "px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors";

/** 「前へ 2 / 5 次へ」のページ送り。1ページしか無ければ出さない */
export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  className = "flex items-center gap-2",
}: {
  /** 一覧の1ページ目のパス（例: /blog, /blog/category/hinoki） */
  basePath: string;
  currentPage: number;
  totalPages: number;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className={className} aria-label="ページネーション">
      {currentPage > 1 && (
        <Link href={getListPagePath(basePath, currentPage - 1)} className={LINK}>
          前へ
        </Link>
      )}
      <span className="px-3 text-sm text-zinc-600">
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={getListPagePath(basePath, currentPage + 1)} className={LINK}>
          次へ
        </Link>
      )}
    </nav>
  );
}
