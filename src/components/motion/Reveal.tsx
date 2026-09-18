"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms before the transition starts. */
  delay?: number;
  /** Uses the scale-in variant (editorial photos). */
  scale?: boolean;
};

/**
 * Scroll-triggered reveal (fade + translateY, optional scale) with
 * progressive enhancement: without JS or under prefers-reduced-motion the
 * content is rendered visible (see globals.css `.js` gating).
 */
export function Reveal({ children, className = "", delay = 0, scale = false }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`reveal${scale ? " reveal-scale" : ""} ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
