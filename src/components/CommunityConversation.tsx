"use client";

import { useEffect, useState, type ReactNode } from "react";
import { communityTelegramUrl, communityWhatsAppUrl } from "../lib/content";

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

function DiscordIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M19.54 4.3A16.8 16.8 0 0 0 15.4 3l-.5 1.02a15.6 15.6 0 0 0-5.8 0L8.6 3A16.6 16.6 0 0 0 4.45 4.3C1.83 8.2 1.12 12 1.48 15.74A16.7 16.7 0 0 0 6.55 18.3l1.22-1.66a9.8 9.8 0 0 1-1.92-.92l.46-.36c3.7 1.7 7.7 1.7 11.35 0l.46.36c-.62.37-1.26.68-1.92.92l1.22 1.66a16.6 16.6 0 0 0 5.08-2.56c.43-4.34-.74-8.1-2.96-11.44ZM8.85 13.42c-1.12 0-2.03-1.02-2.03-2.27s.9-2.27 2.03-2.27c1.13 0 2.05 1.03 2.03 2.27 0 1.25-.9 2.27-2.03 2.27Zm6.3 0c-1.12 0-2.03-1.02-2.03-2.27s.9-2.27 2.03-2.27c1.13 0 2.05 1.03 2.03 2.27 0 1.25-.9 2.27-2.03 2.27Z" />
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
  const content = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-crema-soft text-lapacho">{icon}</span>
      <span className="text-left">
        <span className="block font-semibold text-ink">{name}</span>
        <span className="mt-1 block text-sm text-ink-soft">{description}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-crema p-4 transition hover:border-lapacho hover:bg-white">
      {content}
    </a>
  ) : (
    <div aria-disabled="true" className="flex items-center gap-4 rounded-2xl border border-dashed border-ink/20 bg-crema-soft p-4 opacity-70">
      {content}
    </div>
  );
}

function ConversationOptions() {
  return (
    <div className="space-y-3">
      <ChannelOption name="WhatsApp" description="Unite al grupo de la comunidad." href={communityWhatsAppUrl} icon={<WhatsAppIcon />} />
      <ChannelOption name="Telegram" description="Disponible próximamente." href={communityTelegramUrl} icon={<TelegramIcon />} />
    </div>
  );
}

export function CommunityJoinTrigger({ children, className }: CommunityJoinTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/65 p-5" role="presentation" onMouseDown={() => setIsOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="community-dialog-title" className="w-full max-w-md rounded-3xl bg-crema p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-lapacho">Formosa.dev</p>
                <h2 id="community-dialog-title" className="mt-2 text-2xl font-extrabold tracking-tight">Sumate a la conversación</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar" className="rounded-full p-2 text-ink-soft transition hover:bg-crema-soft hover:text-ink">×</button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">Elegí el canal que prefieras para ser parte de la comunidad.</p>
            <div className="mt-6"><ConversationOptions /></div>
          </section>
        </div>
      ) : null}
    </>
  );
}

export function ConversationSection() {
  return (
    <section id="conversacion" className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-lapacho">Comunidad</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Sumate a la conversación</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">Elegí dónde querés participar. Podés encontrarnos en los canales oficiales de Formosa.dev.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <ChannelOption name="WhatsApp" description="Comunidad oficial" href={communityWhatsAppUrl} icon={<WhatsAppIcon />} />
          <ChannelOption name="Telegram" description="Próximamente" href={communityTelegramUrl} icon={<TelegramIcon />} />
          <ChannelOption name="Discord" description="Canal en preparación" href={null} icon={<DiscordIcon />} />
        </div>
      </div>
    </section>
  );
}
