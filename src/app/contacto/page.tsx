import type { Metadata } from "next";
import { CommunityJoinTrigger } from "../../components/CommunityConversation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { buttonClass } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/Section";
import { channels, institutional } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto/" },
  description:
    "Canales de contacto de Formosa.dev, la comunidad tecnológica de Formosa.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <SectionHeading as="h1">Contacto</SectionHeading>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted">
          Para sumarte a la comunidad, unite directamente al grupo de WhatsApp.
        </p>
        <CommunityJoinTrigger className={buttonClass({ variant: "primary", className: "mt-6" })}>
          Unirme a la comunidad
        </CommunityJoinTrigger>

        <div className="mt-10 space-y-3">
          {channels.map((channel) =>
            channel.url ? (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between gap-3 rounded-control border border-hairline bg-canvas px-5 py-4 transition-colors duration-200 hover:border-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span className="font-semibold">{channel.name}</span>
                <span className="text-sm text-text-muted">{channel.note}</span>
              </a>
            ) : (
              <div
                key={channel.id}
                className="flex min-h-11 items-center justify-between gap-3 rounded-control border border-hairline bg-canvas-soft px-5 py-4"
              >
                <span className="font-semibold text-text-muted">
                  {channel.name}
                </span>
                <span className="text-sm text-text/50">{channel.note}</span>
              </div>
            )
          )}
        </div>

        <a
          href={`mailto:${institutional.email}`}
          className="mt-8 block min-h-11 rounded-control border border-hairline bg-canvas px-5 py-4 transition-colors duration-200 hover:border-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <span className="block text-sm text-text-muted">Correo de contacto</span>
          <span className="block font-semibold">{institutional.email}</span>
        </a>

        <p className="mt-10 text-sm leading-relaxed text-text/50">
          {institutional.statusFormula}
        </p>
      </main>
      <Footer />
    </>
  );
}
