import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "onDarkPrimary"
  | "onDarkAccent"
  | "onDarkSecondary";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-crema hover:bg-lapacho",
  // accent = the conversion CTA: full `.cta-glow` treatment (lapacho gradient,
  // breathing colored shadow, sheen sweep). `bg-*` must not fight the gradient,
  // so the variant only adds text color + a slight hover lift in brightness.
  accent: "cta-glow text-white hover:brightness-[1.07]",
  secondary:
    "border border-hairline-strong text-text hover:border-lapacho hover:text-lapacho",
  onDarkPrimary: "bg-crema text-ink hover:bg-white",
  onDarkAccent: "cta-glow text-white hover:brightness-[1.07]",
  onDarkSecondary:
    "border border-crema/30 text-crema hover:border-lapacho hover:text-lapacho",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-sm",
  lg: "min-h-14 px-8 py-4 text-base",
};

/**
 * Shared class builder so the same control language can be applied to a
 * `CommunityJoinTrigger`, whose own element is a `<button>`.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Leading icon (16px). Every CTA is icon + text — Metropol rule. */
  icon?: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

function IconSlot({ icon }: { icon: ReactNode }) {
  return (
    <span aria-hidden="true" className="shrink-0 [&>svg]:size-4">
      {icon}
    </span>
  );
}

/** Renders as `<a>` when `href` is present, otherwise as `<button>`. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { variant, size, className, children, icon, ...rest } = props;
    return (
      <a className={buttonClass({ variant, size, className })} {...rest}>
        {icon ? <IconSlot icon={icon} /> : null}
        {children}
      </a>
    );
  }

  const { variant, size, className, children, icon, ...rest } = props;
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {icon ? <IconSlot icon={icon} /> : null}
      {children}
    </button>
  );
}
