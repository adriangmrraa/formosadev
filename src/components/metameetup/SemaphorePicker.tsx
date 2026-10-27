"use client";

import { SEMAFORO } from "../../lib/metameetup";
import type { Semaforo } from "../../lib/metameetup-store";

const TONES: Record<Semaforo, string> = {
  verde: "border-ok/50 bg-ok-soft text-ok",
  amarillo: "border-warn/50 bg-warn-soft text-warn",
  rojo: "border-bad/50 bg-bad-soft text-bad",
  na: "border-hairline-strong bg-surface-soft text-text-muted",
};

const DOTS: Record<Semaforo, string> = {
  verde: "bg-ok",
  amarillo: "bg-sol",
  rojo: "bg-bad",
  na: "bg-text-faint",
};

/** Traffic-light self-check used on each Friday checkpoint (guide §13). */
export function SemaphorePicker({
  value,
  onChange,
  label,
}: {
  value: "" | Semaforo;
  onChange: (value: "" | Semaforo) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {SEMAFORO.map((s) => {
          const selected = value === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={selected}
              title={s.def}
              onClick={() => onChange(selected ? "" : (s.id as Semaforo))}
              className={`inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] ${
                selected ? TONES[s.id as Semaforo] : "border-hairline text-text-muted hover:border-hairline-strong"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full ${DOTS[s.id as Semaforo]}`}
              />
              {s.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
