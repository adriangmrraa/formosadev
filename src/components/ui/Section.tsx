import type { ElementType, ReactNode } from "react";

export type SectionTone = "plain" | "soft" | "surface" | "dark" | "strip";

const toneClasses: Record<SectionTone, string> = {
  plain: "",
  soft: "bg-surface-soft",
  surface: "bg-surface",
  dark: "bg-ink text-crema",
  strip: "border-y border-hairline bg-surface-soft",
};

const widthClasses = {
  wide: "max-w-6xl",
  narrow: "max-w-3xl",
  cta: "max-w-4xl",
} as const;

const spacingClasses = {
  default: "py-14 md:py-20",
  hero: "py-16 md:py-24",
  compact: "py-8",
} as const;

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  width?: keyof typeof widthClasses;
  spacing?: keyof typeof spacingClasses;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
};

/** Section shell: full-bleed tone + centered container. */
export function Section({
  id,
  tone = "plain",
  width = "wide",
  spacing = "default",
  ariaLabel,
  className = "",
  children,
}: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={toneClasses[tone]}>
      <div
        className={`mx-auto ${widthClasses[width]} px-5 ${spacingClasses[spacing]} ${className}`}
      >
        {children}
      </div>
    </section>
  );
}

type EyebrowProps = {
  as?: ElementType;
  size?: "sm" | "xs";
  tone?: "accent" | "onDark" | "muted";
  className?: string;
  children: ReactNode;
};

/** Small uppercase label that introduces a section or block. */
export function Eyebrow({
  as: Tag = "p",
  size = "sm",
  tone = "accent",
  className = "",
  children,
}: EyebrowProps) {
  const sizeClass =
    size === "xs"
      ? "text-xs font-bold uppercase tracking-[0.14em]"
      : "text-sm font-semibold uppercase tracking-[0.14em]";
  const toneClass =
    tone === "onDark"
      ? "text-crema/60"
      : tone === "muted"
        ? "text-text-muted"
        : "text-accent";

  return (
    <Tag className={`${sizeClass} ${toneClass} ${className}`}>{children}</Tag>
  );
}

type SectionHeadingProps = {
  as?: ElementType;
  size?: "md" | "lg";
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Section title with the documented display scale. Inherits text color. */
export function SectionHeading({
  as: Tag = "h2",
  size = "md",
  id,
  className = "",
  children,
}: SectionHeadingProps) {
  const sizeClass =
    size === "lg"
      ? "text-3xl font-extrabold tracking-tight md:text-5xl"
      : "text-3xl font-extrabold tracking-tight md:text-4xl";

  return (
    <Tag id={id} className={`${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
}
