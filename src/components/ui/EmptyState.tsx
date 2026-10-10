import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  /** `inline` is the compact row used for disabled list options. */
  layout?: "block" | "inline";
  className?: string;
};

/**
 * Honest empty state. Uses the hairline + tint elevation with a dashed border
 * so a section without real content still reads as intentional.
 */
export function EmptyState({
  title,
  description,
  icon,
  layout = "block",
  className = "",
}: EmptyStateProps) {
  if (layout === "inline") {
    return (
      <div
        aria-disabled="true"
        className={`flex min-h-11 items-center gap-4 rounded-card border border-dashed border-hairline-strong bg-canvas-soft p-4 opacity-70 ${className}`}
      >
        {icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-control bg-canvas text-lapacho">
            {icon}
          </span>
        ) : null}
        <span className="text-left">
          <span className="block font-semibold text-text">{title}</span>
          {description ? (
            <span className="mt-1 block text-sm text-text-muted">
              {description}
            </span>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-card border border-dashed border-hairline-strong bg-canvas-soft p-8 text-text-muted ${className}`}
    >
      <p className="font-semibold text-text">{title}</p>
      {description ? (
        <div className="mt-2 leading-relaxed">{description}</div>
      ) : null}
    </div>
  );
}
