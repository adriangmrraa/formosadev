"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { EventMedia } from "../lib/types";
import { Reveal } from "./motion/Reveal";

const SWIPE_THRESHOLD = 48;

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-crema/90 text-ink ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="ml-1 h-7 w-7"
          fill="currentColor"
        >
          <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11-6.86a1.03 1.03 0 0 0 0-1.76l-11-6.86A1.03 1.03 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </span>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

/**
 * Masonry gallery (CSS columns) + accessible lightbox for a past event.
 * The grid only renders the video poster; the real <video> mounts inside the
 * lightbox, so no mp4 is downloaded until the visitor asks for it.
 */
export function EventGallery({
  media,
  eventTitle,
}: {
  media: EventMedia[];
  eventTitle: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const item = index === null ? null : media[index];
  const count = media.length;

  const open = useCallback((i: number) => setIndex(i), []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) =>
        current === null ? current : (current + delta + count) % count
      );
    },
    [count]
  );

  // Mount/unmount the native <dialog> and lock page scroll while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (index === null && dialog.open) {
      document.documentElement.style.overflow = "";
      return;
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [index]);

  // Restore focus to the thumbnail that opened the lightbox.
  const prevIndex = useRef<number | null>(null);
  useEffect(() => {
    if (index === null && prevIndex.current !== null) {
      itemRefs.current[prevIndex.current]?.focus();
    }
    prevIndex.current = index;
  }, [index]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    touchStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      step(delta < 0 ? 1 : -1);
    }
  };

  const navButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-pill border border-crema/25 bg-ink/60 text-crema backdrop-blur transition duration-200 hover:border-crema/60 hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none";

  return (
    <>
      <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4">
        {media.map((entry, i) => (
          <li key={i} className="mb-3 break-inside-avoid sm:mb-4">
            <Reveal scale delay={Math.min(i, 6) * 60}>
              <button
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={
                  entry.kind === "video"
                    ? `Reproducir: ${entry.title}`
                    : `Ampliar: ${entry.alt}`
                }
                aria-haspopup="dialog"
                className="group relative block w-full cursor-pointer overflow-hidden rounded-card border border-hairline bg-ink/5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {entry.kind === "image" ? (
                  <Image
                    src={entry.src}
                    alt={entry.alt}
                    width={entry.width}
                    height={entry.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1152px) 33vw, 370px"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <>
                    <Image
                      src={entry.poster}
                      alt=""
                      width={entry.width}
                      height={entry.height}
                      sizes="(max-width: 640px) 50vw, (max-width: 1152px) 33vw, 370px"
                      className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <PlayBadge />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-crema backdrop-blur">
                      <span className="live-dot" aria-hidden="true" />
                      Recap
                    </span>
                  </>
                )}
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`Galería de medios: ${eventTitle}`}
        className="inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
      >
        {item ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar galería"
              className={`${navButtonClass} absolute right-4 top-4 z-10`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Anterior"
              className={`${navButtonClass} absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6`}
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Siguiente"
              className={`${navButtonClass} absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6`}
            >
              <ArrowIcon direction="next" />
            </button>

            <figure className="flex max-h-full w-full flex-col items-center">
              {item.kind === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="max-h-[76vh] w-auto max-w-full rounded-xl object-contain"
                  priority={false}
                />
              ) : (
                <video
                  key={item.poster}
                  controls
                  autoPlay
                  playsInline
                  poster={item.poster}
                  className="max-h-[76vh] w-auto max-w-full rounded-xl bg-black"
                >
                  {item.sources.map((source) => (
                    <source
                      key={source.src}
                      src={source.src}
                      type="video/mp4"
                      media={source.media}
                    />
                  ))}
                </video>
              )}
              <figcaption className="mt-4 max-w-xl text-center text-sm leading-relaxed text-crema/85">
                {item.kind === "image" ? item.alt : item.title}
                <span className="mt-1 block text-xs uppercase tracking-widest text-crema/50">
                  {index !== null ? index + 1 : 0} / {count}
                </span>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
