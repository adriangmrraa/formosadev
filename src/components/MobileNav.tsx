"use client";

import {
  Calendar,
  Handshake,
  Menu,
  ScrollText,
  Share2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Icon references cannot cross the server/client boundary, so items carry a
// serializable key resolved here.
const itemIcons = {
  calendar: Calendar,
  share2: Share2,
  handshake: Handshake,
  scrollText: ScrollText,
} satisfies Record<string, LucideIcon>;

export type MobileNavIcon = keyof typeof itemIcons;

type NavItem = {
  label: string;
  href: string;
  icon?: MobileNavIcon;
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
        className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-hairline text-text transition-colors duration-200 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </summary>

      <div className="nav-sheet surface-glow absolute right-0 top-full z-50 mt-2 mr-[env(safe-area-inset-right)] w-64 max-w-[calc(100vw-2.5rem)] rounded-nav border border-hairline-soft p-1.5">
        <ul className="flex flex-col">
          {items.map((item) => {
            const Icon = item.icon ? itemIcons[item.icon] : null;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center gap-3 rounded-control px-4 py-3 text-sm font-medium text-text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-text"
                >
                  {Icon ? (
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
