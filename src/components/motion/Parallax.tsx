"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Writes a `--p` custom property (0 → 1) on itself while the element traverses
 * the viewport: 0 when its top enters at the bottom edge, 1 when its bottom
 * leaves at the top edge. Consumers map it to transform-only effects in CSS
 * (`.depth-shift`, `.depth-zoom`), so nothing here ever touches layout.
 *
 * Cheap by contract: a passive scroll listener throttled through rAF and a
 * single getBoundingClientRect per frame. Elements outside the viewport get
 * clamped to their nearest end state so re-entry never flashes a stale value.
 * Under prefers-reduced-motion the listener is never attached and --p stays
 * unset, leaving every consumer at its neutral (static) state.
 */
export function Parallax({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Clamp off-viewport elements to their nearest end state.
      const p =
        rect.bottom < 0
          ? 1
          : rect.top > vh
            ? 0
            : Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      if (Math.abs(p - last) > 0.002) {
        last = p;
        el.style.setProperty("--p", p.toFixed(3));
      }
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
