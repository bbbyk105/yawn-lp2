"use client";

import { createElement, type HTMLAttributes } from "react";
import { useGsap } from "@/hooks/useGsap";

interface ScrollAnimateProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "p";
  /** この状態から元の見た目へ動く（gsap.from）。to と両方あれば gsap.fromTo */
  from?: gsap.TweenVars;
  /** 元の見た目からこの状態へ動く（gsap.to。パララックスなど） */
  to?: gsap.TweenVars;
  /** 自分ではなく中の要素を動かすときのセレクタ（例: "p, h2"） */
  targets?: string;
  /** ScrollTrigger の trigger にする祖先のセレクタ（例: "section"）。省略時は自分 */
  trigger?: string;
  start: string;
  end: string;
  scrub?: boolean | number;
}

/**
 * スクロールに合わせて動く要素。Server Component の中に置き、中身は Server Component のまま渡せる。
 * 値はサーバーから渡すので、関数（function-based values）は使えない。
 */
export default function ScrollAnimate({
  as = "div",
  from,
  to,
  targets,
  trigger,
  start,
  end,
  scrub = 1,
  ...props
}: ScrollAnimateProps) {
  const ref = useGsap<HTMLElement>((element, gsap) => {
    const animated = targets ? element.querySelectorAll(targets) : element;
    const scrollTrigger: ScrollTrigger.Vars = {
      trigger: (trigger && element.closest(trigger)) || element,
      start,
      end,
      scrub,
    };

    if (from && to) gsap.fromTo(animated, from, { ...to, scrollTrigger });
    else if (from) gsap.from(animated, { ...from, scrollTrigger });
    else if (to) gsap.to(animated, { ...to, scrollTrigger });
  });

  return createElement(as, { ref, ...props });
}
