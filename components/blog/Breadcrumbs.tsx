import { Fragment } from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  /** サイト内のパス（トップは ""）。構造化データの generateBreadcrumbJsonLd にも同じ配列を渡せる */
  path: string;
}

/** パンくず。最後の項目は今いるページなのでリンクにしない */
export default function Breadcrumbs({
  items,
  className,
  currentClassName = "text-zinc-900 font-medium",
}: {
  items: BreadcrumbItem[];
  className?: string;
  /** 今いるページ（最後の項目）の文字のスタイル */
  currentClassName?: string;
}) {
  return (
    <nav className={className} aria-label="パンくずリスト">
      <ol
        className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <li className="text-zinc-300">/</li>}
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index < items.length - 1 ? (
                <Link
                  href={item.path || "/"}
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span itemProp="name" className={currentClassName}>
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
