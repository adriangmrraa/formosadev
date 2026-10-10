import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CommunityJoinTrigger } from "../../components/CommunityConversation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "../../components/ui/brand-icons";
import { buttonClass } from "../../components/ui/Button";
import { ChannelCard } from "../../components/ui/ChannelCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { SectionHeading } from "../../components/ui/Section";
import { channels, institutional } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto/" },
  description:
    "Canales de contacto de Formosa.dev, la comunidad tecnológica de Formosa.",
};

const channelIcons: Record<string, ReactNode> = {
  instagram: <InstagramIcon className="size-5" />,
  telegram: <TelegramIcon className="size-5" />,
  x: <XIcon className="size-5" />,
  linkedin: <LinkedInIcon className="size-5" />,
  github: <GitHubIcon className="size-5" />,
  youtube: <YouTubeIcon className="size-5" />,
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <SectionHeading as="h1">Contacto</SectionHeading>
        <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-text-muted">
          Para sumarte a la comunidad, unite directamente al grupo de WhatsApp.
        </p>
        <CommunityJoinTrigger className={buttonClass({ variant: "accent", className: "mt-6" })}>
          <WhatsAppIcon className="size-4" />
          Unirme a la comunidad
        </CommunityJoinTrigger>

        <div className="mt-10 space-y-3">
          {channels.map((channel) =>
            channel.url ? (
              <ChannelCard
                key={channel.id}
                href={channel.url}
                name={channel.name}
                note={channel.note}
                icon={channelIcons[channel.id]}
              />
            ) : (
              <EmptyState
                key={channel.id}
                layout="inline"
                icon={channelIcons[channel.id]}
                title={channel.name}
                description={channel.note}
              />
            )
          )}
        </div>

        <a
          href={`mailto:${institutional.email}`}
          className="surface-glow group mt-8 flex min-h-11 items-center gap-4 rounded-card border border-hairline-soft px-5 py-4 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
        >
          <span className="icon-orb flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Mail aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-xs font-medium text-text-muted">Correo de contacto</span>
            <span className="block text-sm font-bold">{institutional.email}</span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </a>

        <p className="mt-10 text-sm font-light leading-relaxed text-text-faint">
          {institutional.statusFormula}
        </p>
      </main>
      <Footer />
    </>
  );
}
