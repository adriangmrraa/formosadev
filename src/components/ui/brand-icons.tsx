/**
 * Local brand glyphs. lucide-react dropped brand icons, so channels that need
 * a real logo (Instagram, X, LinkedIn, GitHub, YouTube, WhatsApp, Telegram)
 * use these feather-style strokes / official filled paths instead. Everything
 * renders `currentColor` and inherits size from `className`.
 */

type IconProps = { className?: string };

function StrokeIcon({
  className = "h-5 w-5",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </StrokeIcon>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </StrokeIcon>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </StrokeIcon>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <StrokeIcon className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </StrokeIcon>
  );
}

export function XIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.5 3.5A11.8 11.8 0 0 0 2.26 17.73L1 23l5.4-1.21A11.8 11.8 0 1 0 20.5 3.5Zm-8.28 17.1a9.54 9.54 0 0 1-4.85-1.33l-.35-.2-3.2.72.75-3.1-.23-.37a9.55 9.55 0 1 1 7.88 4.28Zm5.24-7.15c-.29-.14-1.7-.84-1.96-.94-.26-.09-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.34.22-.63.08a7.82 7.82 0 0 1-2.3-1.42 8.63 8.63 0 0 1-1.6-2c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .14.19 2.02 3.08 4.9 4.32.68.3 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.4 3.3 2.9 10.4c-1.26.5-1.25 1.2-.23 1.5l4.75 1.48 1.84 5.65c.23.64.12.9.79.9.51 0 .74-.23 1.03-.5l2.26-2.2 4.7 3.47c.87.48 1.5.23 1.72-.8l3.15-14.85c.32-1.26-.48-1.83-1.51-1.36ZM8.16 13.05l10.7-6.75c.54-.33 1.03-.15.63.2l-8.94 8.08-.35 3.73-1.7-5.26-.34-.1Z" />
    </svg>
  );
}
