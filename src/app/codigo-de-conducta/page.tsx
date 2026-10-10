import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SectionHeading } from "../../components/ui/Section";
import { conduct } from "../../lib/content";

export const metadata: Metadata = {
  title: "Código de conducta",
  alternates: { canonical: "/codigo-de-conducta/" },
  description:
    "Normas de convivencia de la comunidad de Formosa.dev: qué se puede compartir, qué no, y cómo se modera.",
};

export default function CodigoDeConductaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <SectionHeading as="h1" accent="conducta">
          Código de conducta
        </SectionHeading>
        <p className="mt-5 text-lg font-light leading-relaxed text-text-muted">
          {conduct.purpose}
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold">Qué se puede compartir</h2>
          <ul className="mt-4 space-y-2 text-text-muted">
            {conduct.allowed.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="font-black text-accent">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Qué no se puede compartir</h2>
          <ul className="mt-4 space-y-2 text-text-muted">
            {conduct.prohibited.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="font-black text-accent">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Rol de los administradores</h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            {conduct.adminRole}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Consecuencias</h2>
          <p className="mt-2 text-sm text-text-muted">
            El sistema es gradual y predecible. El criterio del admin es soberano
            pero siempre explicado.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-hairline-strong">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Infracción
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Consecuencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {conduct.consequences.map((row) => (
                  <tr key={row.infraction} className="border-b border-hairline">
                    <td className="py-3 pr-4 text-text-muted">{row.infraction}</td>
                    <td className="py-3 font-medium">{row.consequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Formato sugerido para compartir</h2>
          <pre className="media-glow-dark mt-4 overflow-x-auto rounded-control bg-ink p-5 font-mono text-sm text-crema">
            {conduct.shareFormat}
          </pre>
          <p className="mt-4 text-sm text-text-muted">
            Etiquetas sugeridas:{" "}
            <span className="font-medium">{conduct.shareTags.join(" ")}</span>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
