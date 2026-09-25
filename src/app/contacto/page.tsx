import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { channels, communityWhatsAppUrl, institutional } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Canales de contacto de Formosa.dev, la comunidad tecnológica de Formosa.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Contacto
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          Para sumarte a la comunidad, unite directamente al grupo de WhatsApp.
        </p>
        <a
          href={communityWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-crema transition-colors hover:bg-lapacho"
        >
          Unirme a la comunidad
        </a>

        <div className="mt-10 space-y-3">
          {channels.map((channel) =>
            channel.url ? (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-crema px-5 py-4 transition-colors hover:border-lapacho"
              >
                <span className="font-semibold">{channel.name}</span>
                <span className="text-sm text-ink-soft">{channel.note}</span>
              </a>
            ) : (
              <div
                key={channel.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-crema-soft px-5 py-4"
              >
                <span className="font-semibold text-ink-soft">
                  {channel.name}
                </span>
                <span className="text-sm text-ink/50">{channel.note}</span>
              </div>
            )
          )}
        </div>

        <a
          href={`mailto:${institutional.email}`}
          className="mt-8 block rounded-xl border border-ink/10 bg-crema px-5 py-4 transition-colors hover:border-lapacho"
        >
          <span className="block text-sm text-ink-soft">Correo de contacto</span>
          <span className="block font-semibold">{institutional.email}</span>
        </a>

        <p className="mt-10 text-sm leading-relaxed text-ink/50">
          {institutional.statusFormula}
        </p>
      </main>
      <Footer />
    </>
  );
}
