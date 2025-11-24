"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInTextProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function FadeInText({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: FadeInTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const directionValues = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
    };

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        ...directionValues[direction],
        duration: 1,
        delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
