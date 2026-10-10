"use client";

import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { communityTelegramUrl, communityWhatsAppUrl } from "../lib/content";
import { TelegramIcon, WhatsAppIcon } from "./ui/brand-icons";
import { EmptyState } from "./ui/EmptyState";
import { Eyebrow } from "./ui/Section";

type CommunityJoinTriggerProps = {
  children: ReactNode;
  className: string;
};

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
        className="flex min-h-11 items-center gap-4 rounded-card bg-surface-soft p-4 transition duration-200 hover:bg-canvas-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-lapacho [&>svg]:size-5">
          {icon}
        </span>
        <span className="text-left">
          <span className="block text-sm font-bold text-text">{name}</span>
          <span className="mt-0.5 block text-xs font-medium text-text-muted">{description}</span>
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-soft bg-surface/70 text-text-muted transition duration-200 hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <X aria-hidden="true" className="size-5" />
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
