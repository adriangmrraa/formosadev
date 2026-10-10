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
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill font-semibold transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:hover:translate-y-0";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-crema hover:-translate-y-0.5 hover:bg-lapacho",
  accent: "bg-lapacho text-white hover:-translate-y-0.5 hover:bg-lapacho-deep",
  secondary:
    "border border-hairline-strong text-text hover:-translate-y-0.5 hover:border-lapacho hover:text-lapacho",
  onDarkPrimary: "bg-crema text-ink hover:-translate-y-0.5 hover:bg-white",
  onDarkAccent:
    "bg-lapacho text-white hover:-translate-y-0.5 hover:bg-lapacho-deep",
  onDarkSecondary:
    "border border-crema/30 text-crema hover:-translate-y-0.5 hover:border-lapacho hover:text-lapacho",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

/** Renders as `<a>` when `href` is present, otherwise as `<button>`. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...rest } = props;
    return (
      <a className={buttonClass({ variant, size, className })} {...rest}>
        {children}
      </a>
    );
  }

  const { variant, size, className, children, ...rest } = props;
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
