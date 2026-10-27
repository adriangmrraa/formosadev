"use client";

import { Download, ExternalLink, RotateCcw } from "lucide-react";
import { useState } from "react";
import { MEETUP, RESOURCES, SAFETY_RULES } from "../../lib/metameetup";
import {
  resumen,
  setupProgress,
  casoProgress,
  canalProgress,
  viernesProgress,
  type Completion,
  type MeetupState,
} from "../../lib/metameetup-store";
import { Button } from "../ui/Button";
import { StatusChip } from "./fields";

const STEP_FOR: Record<string, number> = {
  "Caso de uso": 1,
  "Entorno y cuentas": 2,
  "Canal y proveedor": 4,
  "Checkpoints del viernes": 5,
};

const DETAIL_KEY: Record<string, "caso" | "entorno" | "canal" | "viernes"> = {
  "Caso de uso": "caso",
  "Entorno y cuentas": "entorno",
  "Canal y proveedor": "canal",
  "Checkpoints del viernes": "viernes",
};

const MISSING_HINT: Record<Completion, string> = {
  done: "",
  partial: "empezado, queda por completar",
  empty: "todavía sin empezar",
};

export function StepEstado({
  state,
  goTo,
  reset,
}: {
  state: MeetupState;
  goTo: (step: number) => void;
  reset: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const items = resumen(state);
  const pending = items.filter((i) => i.status !== "done");

  const detail = {
    caso: casoProgress(state),
    entorno: setupProgress(state),
    canal: canalProgress(state),
    viernes: viernesProgress(state),
  };

  return (
    <div className="space-y-10">
      <div className="surface-glow rounded-card border border-hairline-soft p-5 md:p-6">
        <h3 className="text-xl font-bold tracking-tight">Tu tablero</h3>
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => {
            const d = detail[DETAIL_KEY[item.label]];
            const missing = d && "missing" in d ? d.missing : [];
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => goTo(STEP_FOR[item.label] ?? 0)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 rounded-control border border-hairline bg-surface px-4 py-2.5 text-left transition-colors duration-200 hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <span>
                    <span className="block text-sm font-semibold text-text">
                      {item.label}
                    </span>
                    {missing.length > 0 ? (
                      <span className="mt-0.5 block text-xs font-light text-text-faint">
                        Falta: {missing.slice(0, 3).join(" · ")}
                        {missing.length > 3 ? ` · +${missing.length - 3}` : ""}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-text-faint">
                    {MISSING_HINT[item.status]}
                    <StatusChip status={item.status} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {pending.length > 0 ? (
          <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
            Lo que queda abierto no es un problema: es tu plan. Tocá cada fila
            para volver al paso y completarlo cuando puedas — todo queda
            guardado acá.
          </p>
        ) : (
          <p className="mt-4 text-sm font-semibold text-ok">
            Todo marcado como listo. Nos vemos el viernes 30.
          </p>
        )}
      </div>

      <section>
        <h3 className="text-xl font-bold tracking-tight">Reglas que no se negocian</h3>
        <ul className="mt-4 space-y-2.5">
          {SAFETY_RULES.map((rule) => (
            <li key={rule} className="flex gap-2 text-sm font-light leading-relaxed text-text-muted">
              <span aria-hidden="true" className="font-black text-bad">·</span>
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold tracking-tight">Para tener a mano</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            href={MEETUP.guidePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            icon={<Download />}
          >
            Descargar guía del participante (PDF)
          </Button>
          <Button
            href={MEETUP.lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            icon={<ExternalLink />}
          >
            Evento en Luma
          </Button>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between gap-2 rounded-control border border-hairline-soft bg-surface px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-lapacho hover:text-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {r.label}
                <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-card border border-dashed border-hairline-strong p-5">
        <h3 className="text-base font-bold">¿Empezar de cero?</h3>
        <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
          Borra todo lo que completaste en esta página. No afecta tus cuentas ni
          tu fork — solo el estado guardado en este navegador.
        </p>
        {confirming ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                setConfirming(false);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-bad px-5 text-sm font-semibold text-white transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Sí, borrar todo
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="inline-flex min-h-11 items-center rounded-pill border border-hairline-strong px-5 text-sm font-semibold text-text transition-colors duration-200 hover:border-lapacho hover:text-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline-strong px-5 text-sm font-semibold text-text-muted transition-colors duration-200 hover:border-bad hover:text-bad focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Reiniciar mi progreso
          </button>
        )}
      </section>

      <p className="text-center font-display text-lg font-black italic text-text">
        Aprender. Conectar. Construir.
      </p>
    </div>
  );
}
