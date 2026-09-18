"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type RevealTextProps = {
  text: string;
  /** Word (without punctuation) to underline with the organic marker. */
  highlight?: string;
  className?: string;
  /** Stagger between words in ms. */
  wordDelay?: number;
};

/**
 * Editorial H1/H2 entrance: word-by-word blur-to-focus with an optional
 * organic marker stroke that draws in after the words reveal.
 */
export function RevealText({ text, highlight, className = "", wordDelay = 55 }: RevealTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
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
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`${visible ? "is-visible" : ""} ${className}`}>
      {words.map((word, i) => {
        const normalized = word.replace(/[.,¿?¡!]/g, "");
        const isHighlight = highlight ? normalized === highlight : false;
        return (
          <Fragment key={`${word}-${i}`}>
            <span
              className={`reveal-word${isHighlight ? " highlight" : ""}`}
              style={{ transitionDelay: `${i * wordDelay}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
