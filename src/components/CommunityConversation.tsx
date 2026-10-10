"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { communityTelegramUrl, communityWhatsAppUrl } from "../lib/content";
import { EmptyState } from "./ui/EmptyState";
import { Eyebrow } from "./ui/Section";

type CommunityJoinTriggerProps = {
  children: ReactNode;
  className: string;
};

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 2.26 17.73L1 23l5.4-1.21A11.8 11.8 0 1 0 20.5 3.5Zm-8.28 17.1a9.54 9.54 0 0 1-4.85-1.33l-.35-.2-3.2.72.75-3.1-.23-.37a9.55 9.55 0 1 1 7.88 4.28Zm5.24-7.15c-.29-.14-1.7-.84-1.96-.94-.26-.09-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.34.22-.63.08a7.82 7.82 0 0 1-2.3-1.42 8.63 8.63 0 0 1-1.6-2c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .14.19 2.02 3.08 4.9 4.32.68.3 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M21.4 3.3 2.9 10.4c-1.26.5-1.25 1.2-.23 1.5l4.75 1.48 1.84 5.65c.23.64.12.9.79.9.51 0 .74-.23 1.03-.5l2.26-2.2 4.7 3.47c.87.48 1.5.23 1.72-.8l3.15-14.85c.32-1.26-.48-1.83-1.51-1.36ZM8.16 13.05l10.7-6.75c.54-.33 1.03-.15.63.2l-8.94 8.08-.35 3.73-1.7-5.26-.34-.1Z" />
    </svg>
  );
}

function ChannelOption({
  name,
  description,
  href,
  icon,
}: {
  name: string;
  description: string;
  href: string | null;
  icon: ReactNode;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-4 rounded-card border border-hairline bg-canvas p-4 transition duration-200 hover:border-lapacho hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-control bg-canvas-soft text-lapacho">
          {icon}
        </span>
        <span className="text-left">
          <span className="block font-semibold text-text">{name}</span>
          <span className="mt-1 block text-sm text-text-muted">{description}</span>
        </span>
      </a>
    );
  }

  return (
    <EmptyState
      layout="inline"
      icon={icon}
      title={name}
      description={description}
    />
  );
}

function ConversationOptions() {
  return (
    <div className="space-y-3">
      <ChannelOption name="WhatsApp" description="Unite al grupo de la comunidad." href={communityWhatsAppUrl} icon={<WhatsAppIcon />} />
      <ChannelOption name="Telegram" description="Unite al grupo de la comunidad." href={communityTelegramUrl} icon={<TelegramIcon />} />
    </div>
  );
}

export function CommunityJoinTrigger({ children, className }: CommunityJoinTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>
      {isOpen && typeof document !== "undefined"
        ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/25 p-5 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)]"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-dialog-title"
            className="relative w-full max-w-md rounded-dialog border border-white/70 bg-canvas/95 p-6 shadow-[0_24px_80px_rgba(13,17,23,0.35)] backdrop-blur-2xl sm:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lapacho/15 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-lavanda/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <Eyebrow size="xs">Formosa.dev</Eyebrow>
                  <h2 id="community-dialog-title" className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">Sumate a la conversación</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-hairline bg-surface/70 text-xl leading-none text-text-muted transition duration-200 hover:border-lapacho/40 hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  ×
                </button>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">Elegí el canal que prefieras para ser parte de la comunidad.</p>
              <div className="mt-7"><ConversationOptions /></div>
            </div>
          </section>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
