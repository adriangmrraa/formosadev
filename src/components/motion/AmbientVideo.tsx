"use client";

import { useEffect, useRef } from "react";
import type { EventVideo } from "../../lib/types";

/**
 * Decorative ambient video: muted, looping, inline — plays only while on
 * screen and only when the user allows motion. Under prefers-reduced-motion
 * (or when autoplay is blocked) the poster frame stays up, so the element is
 * always a legible still. Decorative by contract: aria-hidden and no controls;
 * real playback lives in the gallery lightbox.
 */
export function AmbientVideo({
  sources,
  poster,
  className = "",
}: {
  sources: EventVideo["sources"];
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (mq.matches || !onScreen) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(video);

    const onMotionChange = () => sync();
    mq.addEventListener("change", onMotionChange);

    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    >
      {sources.map((source) => (
        <source
          key={source.src}
          src={source.src}
          type="video/mp4"
          media={source.media}
        />
      ))}
    </video>
  );
}
