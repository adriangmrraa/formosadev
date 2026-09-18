"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
};

/**
 * Mobile navigation disclosure. The native <details>/<summary> pair is the
 * base: it toggles and exposes expanded/collapsed semantics without
 * JavaScript, so the menu keeps working if the client bundle never runs.
 * This client layer only adds the behaviours the native element lacks:
 * Escape with focus return, close on link activation, close on route/hash
 * change, and close on an outside pointer press.
 */
export function MobileNav({ items }: MobileNavProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const close = () => details.removeAttribute("open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !details.open) return;
      close();
      details.querySelector<HTMLElement>("summary")?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) close();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("a")) close();
    };

    const onHashChange = () => close();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("hashchange", onHashChange);
    details.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("hashchange", onHashChange);
      details.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={detailsRef} className="relative md:hidden">
      <summary
        aria-label="Menú"
        className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-lapacho hover:text-lapacho [&::-webkit-details-marker]:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>

      <div className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-ink/10 bg-crema p-2 shadow-lg">
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-crema-soft hover:text-lapacho"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
