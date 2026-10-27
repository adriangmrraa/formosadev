"use client";

import {
  CASO_CANAL_OPTIONS,
  CASO_FIELDS,
  CASO_IDEAS,
  type CasoFieldDef,
} from "../../lib/metameetup";
import type { CasoState, MeetupState } from "../../lib/metameetup-store";
import { PillSelect, TextAreaField, TextField } from "./fields";

type Update = (mutate: (draft: MeetupState) => MeetupState) => void;

/** One-line live summary of the case — updates as the ficha fills in. */
function CasoSummary({ caso }: { caso: CasoState }) {
  const parts: string[] = [];
  if (caso.negocio.trim()) parts.push(caso.negocio.trim());
  if (caso.ofrece.trim()) parts.push(`que ofrece ${caso.ofrece.trim()}`);
  if (caso.canal) {
    const label = CASO_CANAL_OPTIONS.find((o) => o.value === caso.canal)?.label;
    parts.push(`por ${label}`);
  }
  if (caso.criterioExito.trim()) parts.push(`y funciona cuando ${caso.criterioExito.trim()}`);
  return (
    <p className="text-sm font-light leading-relaxed text-text-muted">
      <span className="font-semibold text-text">Tu caso en una línea: </span>
      {parts.length > 0
        ? parts.join(", ") + "."
        : "Empezá a completar la ficha y acá aparece el resumen."}
    </p>
  );
}

export function StepCaso({
  state,
  update,
}: {
  state: MeetupState;
  update: Update;
}) {
  const set = (key: keyof CasoState) => (value: string) =>
    update((s) => ({ ...s, caso: { ...s.caso, [key]: value } }));

  return (
    <div className="space-y-8">
      <p className="max-w-2xl font-light leading-relaxed text-text-muted">
        Elegí UNA primera necesidad. No necesitás tener una empresa: podés usar
        datos inventados. Esta ficha es la que tu agente de IA va a usar para
        adaptar el CRM — completarla bien es la mitad del trabajo.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {CASO_FIELDS.slice(0, 4).map((f) => (
          <Field key={f.key} def={f} state={state} set={set} />
        ))}
        <div className="md:col-span-2">
          <PillSelect
            label="Canal deseado"
            hint="Si todavía no sabés o no tenés accesos, elegí demo."
            options={CASO_CANAL_OPTIONS}
            value={state.caso.canal}
            onChange={set("canal")}
          />
        </div>
        {CASO_FIELDS.slice(4).map((f) => (
          <Field key={f.key} def={f} state={state} set={set} />
        ))}
      </div>

      <div className="surface-well rounded-card p-5">
        <CasoSummary caso={state.caso} />
      </div>

      <div>
        <h3 className="text-base font-bold">Ideas para elegir un caso</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CASO_IDEAS.map((idea) => (
            <li
              key={idea.title}
              className="rounded-card border border-hairline-soft bg-surface px-4 py-3"
            >
              <p className="text-sm font-semibold text-text">{idea.title}</p>
              <p className="mt-1 text-xs font-light leading-relaxed text-text-muted">
                {idea.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs font-light leading-relaxed text-text-faint">
          Importante: estas funciones son objetivos de demostración. El CRM trae
          muchas piezas útiles, pero algunas adaptaciones requieren código,
          configuración y validación adicional.
        </p>
      </div>
    </div>
  );
}

function Field({
  def,
  state,
  set,
}: {
  def: CasoFieldDef;
  state: MeetupState;
  set: (key: keyof CasoState) => (value: string) => void;
}) {
  const value = state.caso[def.key];
  if (def.multiline) {
    return (
      <div className="md:col-span-2">
        <TextAreaField
          label={def.label}
          hint={def.hint}
          value={value}
          onChange={set(def.key)}
          placeholder={def.placeholder}
        />
      </div>
    );
  }
  return (
    <TextField
      label={def.label}
      hint={def.hint}
      value={value}
      onChange={set(def.key)}
      placeholder={def.placeholder}
    />
  );
}
