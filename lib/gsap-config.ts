/* eslint-disable @typescript-eslint/no-explicit-any */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// GSAPプラグイン登録
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// デフォルト設定
export const gsapConfig = {
  // スクロールトリガーのデフォルト設定
  scrollTrigger: {
    defaults: {
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
  },

  // アニメーションのデフォルト設定
  animation: {
    duration: 1,
    ease: "power3.out",
  },
};

// パララックス効果のヘルパー関数
export const createParallax = (
  element: HTMLElement | null,
  config: {
    trigger?: HTMLElement | null;
    start?: string;
    end?: string;
    speed?: number;
  } = {}
) => {
  if (!element) return null;

  const {
    trigger = element,
    start = "top bottom",
    end = "bottom top",
    speed = 0.5,
  } = config;

  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
};

// フェードインアニメーションのヘルパー関数
export const createFadeIn = (
  element: HTMLElement | null,
  config: {
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) => {
  if (!element) return null;

  const { direction = "up", delay = 0, duration = 1, stagger = 0 } = config;

  const directionValues = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  return gsap.from(element, {
    opacity: 0,
    ...directionValues[direction],
    duration,
    delay,
    stagger,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
  });
};

// スムーススクロールのヘルパー関数
export const smoothScrollTo = (
  target: string | HTMLElement,
  offset: number = 0
) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: target,
      offsetY: offset,
    },
    ease: "power3.inOut",
  });
};

// スタガーアニメーションのヘルパー関数
export const createStaggerAnimation = (
  elements: HTMLElement[],
  config: {
    stagger?: number;
    duration?: number;
    delay?: number;
  } = {}
) => {
  if (!elements || elements.length === 0) return null;

  const { stagger = 0.15, duration = 0.8, delay = 0 } = config;

  return gsap.from(elements, {
    opacity: 0,
    y: 80,
    stagger,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements[0],
      start: "top 70%",
      end: "top 40%",
      scrub: 1,
    },
  });
};

// 3Dカードエフェクトのヘルパー関数
export const create3DCardEffect = (
  card: HTMLElement | null,
  config: {
    intensity?: number;
  } = {}
) => {
  if (!card) return null;

  const { intensity = 10 } = config;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((centerX - x) / centerX) * intensity;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    card.removeEventListener("mousemove", handleMouseMove);
    card.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// レスポンシブヘルパー
export const createResponsiveAnimation = (
  element: HTMLElement | null,
   
  mobileConfig: any,
  desktopConfig: any
) => {
  if (!element) return null;

  const mm = gsap.matchMedia();

  mm.add("(max-width: 768px)", () => {
    return gsap.from(element, mobileConfig);
  });

  mm.add("(min-width: 769px)", () => {
    return gsap.from(element, desktopConfig);
  });

  return mm;
};
