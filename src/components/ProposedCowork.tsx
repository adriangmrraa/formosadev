import { CalendarDays, Clock3, Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CommunityJoinTrigger } from "./CommunityConversation";
import { buttonClass } from "./ui/Button";

/** A clearly-labelled venue proposal, not a published or confirmed event. */
export function ProposedCowork() {
  return (
    <article className="mt-10 overflow-hidden bg-surface">
      <div className="relative min-h-[56svh] overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src="/assets/campaigns/el-comercial-cowork/background-mastil-costanera.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: "clamp(0, calc(1.35 - var(--p, 0.2) * 2.3), 1)" } as CSSProperties}
          />
          <Image
            src="/assets/campaigns/el-comercial-cowork/background-ferroviario.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: "clamp(0, calc(var(--p, 0.2) * 3 - 0.45), 1)" } as CSSProperties}
          />
          <Image
            src="/assets/campaigns/el-comercial-cowork/background-plaza-san-martin.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: "clamp(0, calc(var(--p, 0.2) * 3 - 1.55), 1)" } as CSSProperties}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-8 text-crema">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-crema/80">
            <span className="live-dot" aria-hidden="true" />
            Idea en conversación
          </p>
          <p className="mt-3 max-w-xl text-xl font-semibold leading-tight sm:text-3xl">
            Un espacio posible para construir y compartir desde Formosa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <div className="max-w-3xl">
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

          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-text-muted">
            <span className="inline-flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-4 text-accent" />Segundo y último sábado.</span>
            <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4 text-accent" />16 a 20 h.</span>
          </p>

          <ul className="mt-6 grid gap-2 text-sm font-light leading-relaxed text-text-muted">
            <li className="flex gap-2"><Coffee aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />Merienda y tiempo de cowork.</li>
            <li className="flex gap-2"><Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />Charlas cortas, demos y proyectos en proceso.</li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CommunityJoinTrigger className={buttonClass({ variant: "accent" })}>
              Quiero enterarme
            </CommunityJoinTrigger>
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
