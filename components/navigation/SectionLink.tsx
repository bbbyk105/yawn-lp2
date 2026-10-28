"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToId } from "@/lib/scroll";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** トップページ内のセクションID */
  sectionId: string;
};

/**
 * トップページのセクションへのリンク。
 * クローラーが辿れるよう <a href="/#id"> を出しつつ、トップページ上ではスムーススクロールする。
 * 他ページからは /#id へ遷移し、HashScrollHandler がスクロールする。
 */
export default function SectionLink({
  sectionId,
  onClick,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (pathname !== "/") return;
    if (scrollToId(sectionId)) e.preventDefault();
  };

  return <Link href={`/#${sectionId}`} onClick={handleClick} {...props} />;
}
