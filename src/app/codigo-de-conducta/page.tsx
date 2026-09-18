import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { conduct } from "../../lib/content";

export const metadata: Metadata = {
  title: "Código de conducta",
  description:
    "Normas de convivencia de la comunidad de Formosa.dev: qué se puede compartir, qué no, y cómo se modera.",
};

export default function CodigoDeConductaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Código de conducta
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          {conduct.purpose}
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold">Qué se puede compartir</h2>
          <ul className="mt-4 space-y-2 text-ink-soft">
            {conduct.allowed.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Qué no se puede compartir</h2>
          <ul className="mt-4 space-y-2 text-ink-soft">
            {conduct.prohibited.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Rol de los administradores</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {conduct.adminRole}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Consecuencias</h2>
          <p className="mt-2 text-sm text-ink-soft">
            El sistema es gradual y predecible. El criterio del admin es soberano
            pero siempre explicado.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15">
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
                  <tr key={row.infraction} className="border-b border-ink/10">
                    <td className="py-3 pr-4 text-ink-soft">{row.infraction}</td>
                    <td className="py-3 font-medium">{row.consequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Formato sugerido para compartir</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-5 font-mono text-sm text-crema">
            {conduct.shareFormat}
          </pre>
          <p className="mt-4 text-sm text-ink-soft">
            Etiquetas sugeridas:{" "}
            <span className="font-medium">{conduct.shareTags.join(" ")}</span>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
