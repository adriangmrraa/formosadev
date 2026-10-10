import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  /** Icon rendered inside a soft square tile that leads the block. */
  icon?: ReactNode;
  /** Optional inline CTA rendered after the description. */
  action?: ReactNode;
  /** `inline` is the compact row used for disabled list options. */
  layout?: "block" | "inline";
  className?: string;
};

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="icon-orb flex h-10 w-10 shrink-0 items-center justify-center rounded-xl [&>svg]:size-5">
      {children}
    </span>
  );
}

/**
 * Honest empty state. Tinted tile with a leading icon square — elevation by
 * tint, no dashed outlines — so a section without real content still reads as
 * intentional.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  layout = "block",
  className = "",
}: EmptyStateProps) {
  if (layout === "inline") {
    return (
      <div
        aria-disabled="true"
        className={`flex min-h-11 items-center gap-4 rounded-control bg-surface-soft p-4 opacity-70 ${className}`}
      >
        {icon ? <IconTile>{icon}</IconTile> : null}
        <span className="text-left">
          <span className="block text-sm font-bold text-text">{title}</span>
          {description ? (
            <span className="mt-0.5 block text-xs text-text-muted">
              {description}
            </span>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`surface-glow flex items-start gap-4 rounded-card border border-hairline-soft p-6 sm:p-8 ${className}`}
    >
      {icon ? <IconTile>{icon}</IconTile> : null}
      <div>
        <p className="font-bold text-text">{title}</p>
        {description ? (
          <div className="mt-2 leading-relaxed text-text-muted">
            {description}
          </div>
        ) : null}
        {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </div>
  );
}
