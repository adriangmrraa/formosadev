import Link from "next/link";
import { channels, institutional } from "../lib/content";

export function Footer() {
  const liveChannels = channels.filter((c) => c.url);

  return (
    <footer className="bg-ink text-crema">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold tracking-tight">
              formosa<span className="text-lapacho">.dev</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-crema/70">
              {institutional.descriptor}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-crema/50">
              Secciones
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#que-es" className="text-crema/80 transition-colors hover:text-lapacho">
                  Qué es
                </Link>
              </li>
              <li>
                <Link href="/#evento" className="text-crema/80 transition-colors hover:text-lapacho">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/#proyectos" className="text-crema/80 transition-colors hover:text-lapacho">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/#recursos" className="text-crema/80 transition-colors hover:text-lapacho">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/#aliados" className="text-crema/80 transition-colors hover:text-lapacho">
                  Aliados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-crema/50">
              Comunidad
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/codigo-de-conducta" className="text-crema/80 transition-colors hover:text-lapacho">
                  Código de conducta
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-crema/80 transition-colors hover:text-lapacho">
                  Contacto
                </Link>
              </li>
              {liveChannels.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-crema/80 transition-colors hover:text-lapacho"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-crema/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-crema/60">
            {institutional.statusFormula}
          </p>
          <p className="mt-4 text-xs text-crema/40">
            © 2026 {institutional.name} — Formosa, Argentina.
          </p>
        </div>
      </div>
    </footer>
  );
}
