"use client";

import { CoverFlow } from "@ashishgogula/coverflow";
import type {
  CoverFlowItem,
  RenderImageProps,
} from "@ashishgogula/coverflow";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { EventMedia } from "../lib/types";

const SWIPE_THRESHOLD = 48;

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-crema/90 text-ink ring-1 ring-ink/10">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="ml-1 h-6 w-6"
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
 * 3D cover-flow gallery (iOS-style) + accessible lightbox for a past event.
 * The interactive deck is delegated to `@ashishgogula/coverflow` (spring-driven
 * 3D transforms, keyboard + drag + wheel, honors prefers-reduced-motion); the
 * lightbox keeps the full-resolution media, alt captions and swipe/keyboard
 * navigation it already had.
 */
export function EventGallery({
  media,
  eventTitle,
}: {
  media: EventMedia[];
  eventTitle: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(media.length - 1);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const amplifyRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const item = index === null ? null : media[index];
  const count = media.length;

  const items = useMemo<CoverFlowItem[]>(
    () =>
      media.map((entry, i) => ({
        id: i,
        image: entry.kind === "video" ? entry.poster : entry.src,
        title: entry.kind === "video" ? entry.title : entry.alt,
      })),
    [media]
  );

  const videoSrcs = useMemo(() => {
    const set = new Set<string>();
    for (const entry of media) {
      if (entry.kind === "video") set.add(entry.poster);
    }
    return set;
  }, [media]);

  const renderImage = useCallback(
    (props: RenderImageProps) => {
      const image = (
        <Image
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
          className={props.className}
          sizes={props.sizes}
          priority={props.priority}
          loading={props.priority ? undefined : props.loading}
          draggable={false}
        />
      );
      return videoSrcs.has(props.src) ? (
        <>
          {image}
          <PlayBadge />
        </>
      ) : (
        image
      );
    },
    [videoSrcs]
  );

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

  // Return focus to the "Ampliar" control when the lightbox closes.
  const prevOpen = useRef(false);
  useEffect(() => {
    if (index === null && prevOpen.current) {
      amplifyRef.current?.focus();
    }
    prevOpen.current = index !== null;
  }, [index]);

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  // Keyboard path to open the lightbox from the focused deck (the cover-flow
  // region only handles the arrow keys itself). Skip the "Ampliar" button,
  // whose Enter/Space is handled natively.
  const onDeckKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      (event.target as HTMLElement).tagName !== "BUTTON"
    ) {
      event.preventDefault();
      open(activeIndex);
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
      <div
        className="cf-event h-[30rem] w-full sm:h-[33rem]"
        onKeyDown={onDeckKeyDown}
      >
        <CoverFlow
          items={items}
          itemWidth={300}
          itemHeight={400}
          initialIndex={media.length - 1}
          onItemClick={(_item, i) => open(i)}
          onIndexChange={setActiveIndex}
          renderImage={renderImage}
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          ref={amplifyRef}
          type="button"
          onClick={() => open(activeIndex)}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline-strong px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 hover:border-lapacho hover:text-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] motion-reduce:transition-none"
        >
          <Maximize2 aria-hidden="true" className="size-4" />
          Ampliar foto
        </button>
        <span className="text-xs font-light uppercase tracking-widest text-text-faint">
          {activeIndex + 1} / {count}
        </span>
      </div>

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
