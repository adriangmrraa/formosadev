import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ChannelCardProps = {
  href: string;
  name: string;
  note?: string;
  /** Channel glyph rendered inside the leading soft square. */
  icon?: ReactNode;
};

/**
 * Outbound channel tile — Metropol's ClassicTripActions language: icon inside
 * a soft square, bold label, muted note, arrow affordance. One shared card so
 * every channel reads as one grid.
 */
export function ChannelCard({ href, name, note, icon }: ChannelCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full min-h-[92px] w-full items-center gap-3 rounded-card border border-hairline-soft bg-surface p-4 text-left transition duration-200 ease-out hover:bg-canvas-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
    >
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-text [&>svg]:size-5">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-text">{name}</span>
        {note ? (
          <span className="mt-0.5 block truncate text-xs font-medium text-text-muted">
            {note}
          </span>
        ) : null}
      </span>
      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
    </a>
  );
}
