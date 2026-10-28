"use client";

import type { ButtonHTMLAttributes } from "react";
import { scrollToId } from "@/lib/scroll";

type ScrollToButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type"
> & {
  /** スクロール先の要素の id */
  targetId: string;
};

/** 押すと同じページ内の要素までスムーズにスクロールするボタン */
export default function ScrollToButton({
  targetId,
  ...props
}: ScrollToButtonProps) {
  return (
    <button type="button" onClick={() => scrollToId(targetId)} {...props} />
  );
}
