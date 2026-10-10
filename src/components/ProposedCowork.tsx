import { CalendarDays, Clock3, Coffee, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import { CommunityJoinTrigger } from "./CommunityConversation";
import { buttonClass } from "./ui/Button";

/** A clearly-labelled venue proposal, not a published or confirmed event. */
export function ProposedCowork() {
  return (
    <article className="surface-glow mt-10 overflow-hidden rounded-panel border border-hairline-soft">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
        <div className="relative min-h-72 overflow-hidden bg-ink">
          <Image
            src="/assets/campaigns/el-comercial-cowork/background-mastil-costanera.png"
            alt="Mástil de la Costanera de Formosa, sede visual de la propuesta de cowork"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-pill bg-ink/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-crema backdrop-blur">
            <span className="live-dot" aria-hidden="true" />
            Idea en conversación
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Próximamente
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Cowork para construir, compartir y mostrar lo que hacemos.
          </h3>
          <p className="mt-4 font-light leading-relaxed text-text-muted">
            Desde Formosa.dev estamos conversando una actividad continua: un espacio
            para trabajar en proyectos, compartir avances, conversar sobre agentes y
            encontrarnos alrededor de una merienda.
          </p>

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="surface-well rounded-card p-4">
              <dt className="flex items-center gap-2 font-semibold text-text">
                <CalendarDays aria-hidden="true" className="size-4 text-accent" />
                Frecuencia propuesta
              </dt>
              <dd className="mt-2 font-light text-text-muted">
                Segundo y último sábado de cada mes.
              </dd>
            </div>
            <div className="surface-well rounded-card p-4">
              <dt className="flex items-center gap-2 font-semibold text-text">
                <Clock3 aria-hidden="true" className="size-4 text-accent" />
                Horario propuesto
              </dt>
              <dd className="mt-2 font-light text-text-muted">16 a 20 h.</dd>
            </div>
          </dl>

          <ul className="mt-6 grid gap-2 text-sm font-light leading-relaxed text-text-muted">
            <li className="flex gap-2"><Coffee aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />Merienda y tiempo de cowork.</li>
            <li className="flex gap-2"><Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />Charlas cortas, demos y proyectos en proceso.</li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CommunityJoinTrigger className={buttonClass({ variant: "accent" })}>
              Quiero enterarme
            </CommunityJoinTrigger>
            <a
              href="https://www.elcomercial.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-control border border-hairline px-3 py-2 transition-colors hover:border-lapacho"
              aria-label="Visitar El Comercial"
            >
              <Image
                src="/assets/colaboradores/el-comercial.jpg"
                alt="El Comercial"
                width={200}
                height={49}
                className="h-6 w-auto object-contain"
              />
              <ExternalLink aria-hidden="true" className="size-4 text-text-muted" />
            </a>
          </div>
          <p className="mt-4 text-xs font-light leading-relaxed text-text-faint">
            Propuesta de sede en conversación con El Comercial. La fecha y la agenda
            se anunciarán solo cuando estén confirmadas.
          </p>
        </div>
      </div>
    </article>
  );
}
