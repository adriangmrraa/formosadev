"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import type { PastEvent } from "../lib/types";
import { EventGallery } from "./EventGallery";

/** Thumbnail used in the event switcher: the first media item (or its poster). */
function coverOf(event: PastEvent) {
  const first = event.media[0];
  if (!first) return null;
  return first.kind === "video"
    ? { src: first.poster, alt: first.title }
    : { src: first.src, alt: first.alt };
}

/**
 * Past events showcase. With a single event it renders just its detail; with
 * several it adds a horizontally scrollable switcher strip (arrow keys work)
 * so visitors can move between recaps. Newest event should come first in the
 * `events` array.
 */
export function PastEvents({ events }: { events: PastEvent[] }) {
  const [activeId, setActiveId] = useState(events[0]?.id);
  const active =
    events.find((event) => event.id === activeId) ?? events[0];

  if (!active) return null;

  const onSwitcherKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const currentIndex = events.findIndex((e) => e.id === active.id);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = events[(currentIndex + delta + events.length) % events.length];
    setActiveId(next.id);
  };

  return (
    <div>
      {events.length > 1 ? (
        <div
          role="group"
          aria-label="Elegir evento anterior"
          onKeyDown={onSwitcherKeyDown}
          className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:gap-4"
        >
          {events.map((event) => {
            const cover = coverOf(event);
            const isActive = event.id === active.id;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setActiveId(event.id)}
                aria-pressed={isActive}
                className={`group flex w-60 shrink-0 flex-col overflow-hidden rounded-2xl border bg-white text-left transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lapacho motion-reduce:transition-none sm:w-72 ${
                  isActive
                    ? "border-lapacho ring-2 ring-lapacho/40"
                    : "border-ink/10 hover:border-ink/25"
                }`}
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    alt=""
                    width={640}
                    height={360}
                    className="aspect-video w-full object-cover"
                  />
                ) : null}
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-lapacho">
                    {event.descriptor}
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-ink">
                    {event.title}
                  </span>
                  <span className="mt-auto pt-2 text-xs text-ink-soft">
                    {event.date}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <article key={active.id} className="event-panel mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-lapacho">
          {active.descriptor}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
          {active.title}
        </h3>
        <p className="mt-3 text-sm font-medium text-ink-soft">
          {active.date} · {active.location}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
          {active.description}
        </p>
        {active.url ? (
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-lapacho underline-offset-4 hover:underline"
          >
            Ver la publicación del evento ↗
          </a>
        ) : null}
        <div className="mt-8">
          <EventGallery media={active.media} eventTitle={active.title} />
        </div>
      </article>
    </div>
  );
}
