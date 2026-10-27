"use client";

import {
  AGENDA,
  CHECKPOINTS,
  MEETUP,
  SEMAFORO,
  TROUBLESHOOTING,
  type CheckpointId,
} from "../../lib/metameetup";
import type { MeetupState } from "../../lib/metameetup-store";
import { TextAreaField } from "./fields";
import { SemaphorePicker } from "./SemaphorePicker";

type Update = (mutate: (draft: MeetupState) => MeetupState) => void;

export function StepViernes({
  state,
  update,
}: {
  state: MeetupState;
  update: Update;
}) {
  const setMark = (id: CheckpointId, value: string) =>
    update((s) => ({
      ...s,
      viernes: {
        ...s.viernes,
        checkpoints: { ...s.viernes.checkpoints, [id]: value },
      },
    }));

  const setNota = (id: CheckpointId, value: string) =>
    update((s) => ({
      ...s,
      viernes: {
        ...s.viernes,
        notas: { ...s.viernes.notas, [id]: value },
      },
    }));

  return (
    <div className="space-y-10">
      <div className="surface-well rounded-card p-5">
        <p className="text-sm font-light leading-relaxed text-text-muted">
          <span className="font-semibold text-text">{MEETUP.dateLabel}, {MEETUP.timeLabel}.</span>{" "}
          {MEETUP.venueLabel}. Llevá notebook y cargador; si podés, mouse,
          adaptador USB-C/HDMI y un alargue. Marcá cada checkpoint con el
          semáforo: no pasa nada si un bloqueo queda en rojo — el facilitador te
          indica la ruta.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SEMAFORO.map((s) => (
            <li
              key={s.id}
              className="rounded-pill border border-hairline bg-surface px-3 py-1.5 text-xs text-text-muted"
              title={s.def}
            >
              <span className="font-semibold text-text">{s.label}:</span> {s.def}
            </li>
          ))}
        </ul>
      </div>

      {/* Agenda timeline */}
      <section>
        <h3 className="text-xl font-bold tracking-tight">Agenda</h3>
        <ol className="mt-5">
          {AGENDA.map((slot, i) => (
            <li key={slot.time} className="flex gap-4">
              <div className="flex w-12 shrink-0 flex-col items-center">
                <span
                  aria-hidden="true"
                  className={`mt-1 h-3 w-3 rounded-full border-2 ${
                    slot.checkpoint
                      ? "border-lapacho bg-lapacho"
                      : "border-hairline-strong bg-surface"
                  }`}
                />
                {i < AGENDA.length - 1 ? (
                  <span aria-hidden="true" className="w-px flex-1 bg-hairline" />
                ) : null}
              </div>
              <div className="pb-5">
                <p className="font-display text-sm font-black italic tabular-nums text-text">
                  {slot.time}
                </p>
                <p className="mt-0.5 text-sm font-light text-text-muted">
                  {slot.title}
                  {slot.checkpoint ? (
                    <span className="ml-2 rounded-pill bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                      checkpoint
                    </span>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Checkpoint cards */}
      <section className="space-y-5">
        <h3 className="text-xl font-bold tracking-tight">Los cuatro checkpoints</h3>
        {CHECKPOINTS.map((cp, index) => (
          <article
            key={cp.id}
            className="surface-glow rounded-card border border-hairline-soft p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="orb mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-black italic text-white">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-lg font-bold tracking-tight">{cp.title}</h4>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                    {cp.time}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm font-light leading-relaxed text-text-muted">
              {cp.goal}
            </p>

            <details className="mt-4 rounded-control border border-hairline bg-surface">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 py-2.5 text-sm font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                Pasos y resultado esperado
              </summary>
              <div className="grid gap-4 border-t border-hairline px-4 py-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                    Pasos
                  </p>
                  <ol className="mt-2 space-y-1.5">
                    {cp.steps.map((step, i) => (
                      <li key={step} className="flex gap-2 text-sm font-light text-text-muted">
                        <span className="shrink-0 font-display text-xs font-black italic text-accent">
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                    Resultado esperado
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {cp.result.map((r) => (
                      <li key={r} className="flex gap-2 text-sm font-light text-text-muted">
                        <span aria-hidden="true" className="font-black text-ok">·</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>

            <div className="mt-4 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
              <SemaphorePicker
                label={`Mi estado — ${cp.title}`}
                value={state.viernes.checkpoints[cp.id]}
                onChange={(val) => setMark(cp.id, val)}
              />
              <TextAreaField
                label="Nota o bloqueo"
                value={state.viernes.notas[cp.id]}
                onChange={(v) => setNota(cp.id, v)}
                placeholder="Qué quedó pendiente, quién me ayuda, qué falta…"
                rows={2}
              />
            </div>
          </article>
        ))}
      </section>

      {/* Troubleshooting — §14 de la guía: los bloqueos más comunes del día. */}
      <section>
        <h3 className="text-xl font-bold tracking-tight">Si algo se traba</h3>
        <p className="mt-1 text-sm font-light text-text-muted">
          Los bloqueos más frecuentes del taller y qué probar antes de levantar
          la mano.
        </p>
        <ul className="mt-4 space-y-2">
          {TROUBLESHOOTING.map((t) => (
            <li
              key={t.q}
              className="rounded-control border border-hairline-soft bg-surface"
            >
              <details>
                <summary className="flex min-h-11 cursor-pointer items-center px-4 py-2.5 text-sm font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                  {t.q}
                </summary>
                <p className="border-t border-hairline px-4 py-3 text-sm font-light leading-relaxed text-text-muted">
                  {t.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <TextAreaField
          label="Mi mayor aprendizaje del día"
          value={state.viernes.aprendizaje}
          onChange={(v) =>
            update((s) => ({ ...s, viernes: { ...s.viernes, aprendizaje: v } }))
          }
          placeholder="Lo que me llevo…"
        />
        <TextAreaField
          label="Mi siguiente paso técnico"
          value={state.viernes.siguientePaso}
          onChange={(v) =>
            update((s) => ({ ...s, viernes: { ...s.viernes, siguientePaso: v } }))
          }
          placeholder="Lo que hago después del evento…"
        />
      </section>
    </div>
  );
}
