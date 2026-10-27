"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AutoMarqueeProps = {
  children: ReactNode;
  /** Seconds per loop. Higher is slower. */
  duration?: number;
};

/**
 * Gentle auto-scrolling marquee that only runs while the section is actually
 * visible in the viewport. Pauses on hover/focus (so links stay usable) and
 * fully disables under prefers-reduced-motion (see globals.css), where the
 * viewport falls back to manual horizontal scroll.
 */
export function AutoMarquee({ children, duration = 36 }: AutoMarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Always start paused so the SSR HTML and the first client render match;
  // the observer flips it on mount. Without JS the track stays paused and
  // the viewport still scrolls manually.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting));
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="colaboradores-viewport"
      data-running={inView}
    >
      <div
        className="colaboradores-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
      </div>
    </div>
  );
}
