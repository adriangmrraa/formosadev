import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Ticket } from "lucide-react";
import { LEARNINGS, MEETUP, NO_PROMISES } from "../../lib/metameetup";
import { Button } from "../ui/Button";

export function StepInicio({ onStart }: { onStart?: () => void }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex min-h-9 items-center gap-2 rounded-pill border border-hairline px-3.5 text-sm font-medium text-text-muted">
          <CalendarDays aria-hidden="true" className="size-4 text-accent" />
          {MEETUP.dateLabel} · {MEETUP.timeLabel}
        </span>
        <span className="inline-flex min-h-9 items-center gap-2 rounded-pill border border-hairline px-3.5 text-sm font-medium text-text-muted">
          <MapPin aria-hidden="true" className="size-4 text-accent" />
          {MEETUP.venueLabel}
        </span>
        <span className="inline-flex min-h-9 items-center gap-2 rounded-pill border border-hairline px-3.5 text-sm font-medium text-text-muted">
          <span className="live-dot" aria-hidden="true" />
          Workshop presencial · cupo limitado
        </span>
      </div>

      <p className="max-w-2xl text-lg font-light leading-relaxed text-text-muted">
        {MEETUP.idea}
      </p>
      <p className="max-w-2xl font-light leading-relaxed text-text-muted">
        {MEETUP.promise}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface-glow rounded-card border border-hairline-soft p-5">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <span className="icon-orb flex h-8 w-8 items-center justify-center rounded-xl">
              <ShieldCheck aria-hidden="true" className="size-4" />
            </span>
            Qué sí vas a aprender
          </h3>
          <ul className="mt-4 space-y-2.5">
            {LEARNINGS.map((item) => (
              <li key={item} className="flex gap-2 text-sm font-light leading-relaxed text-text-muted">
                <span aria-hidden="true" className="font-black text-accent">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-dashed border-hairline-strong p-5">
          <h3 className="text-base font-bold text-text">Qué no prometemos</h3>
          <ul className="mt-4 space-y-2.5">
            {NO_PROMISES.map((item) => (
              <li key={item} className="flex gap-2 text-sm font-light leading-relaxed text-text-muted">
                <span aria-hidden="true" className="font-black text-text-faint">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface-well rounded-card p-5">
        <h3 className="text-base font-bold">Cómo funciona esta página</h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-text-muted">
          Es tu laboratorio del workshop: 8 pasos que se recorren adelante y
          atrás. Lo que completes queda guardado en tu navegador (nadie más lo
          ve), y al final se convierte en prompts listos para pegarle a tu
          agente de IA. Podés hacerlo en tu casa, en la llamada previa y en vivo
          el viernes.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {onStart ? (
          <Button variant="accent" onClick={onStart} icon={<ArrowRight />}>
            Empezar mi recorrido
          </Button>
        ) : null}
        <Button
          href={MEETUP.lumaUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          icon={<Ticket />}
        >
          Reservar lugar en Luma
        </Button>
        <Button
          href={MEETUP.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          icon={<CalendarDays />}
        >
          Ver el repositorio base
        </Button>
      </div>
    </div>
  );
}
