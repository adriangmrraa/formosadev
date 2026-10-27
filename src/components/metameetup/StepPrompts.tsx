"use client";

import { PROMPTS } from "../../lib/metameetup-prompts";
import type { MeetupState } from "../../lib/metameetup-store";
import { PromptCard } from "./PromptCard";

export function StepPrompts({
  state,
  goTo,
}: {
  state: MeetupState;
  goTo: (step: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="surface-well rounded-card p-5">
        <p className="text-sm font-light leading-relaxed text-text-muted">
          Estos textos se generaron con lo que completaste en los pasos
          anteriores. Lo que falte aparece como{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-text">
            [ETIQUETA]
          </code>{" "}
          dentro del prompt — podés copiarlo igual y completarlo a mano, o tocar
          la etiqueta para volver al paso que lo pide. Pegalos en tu agente de
          programación (Codex, Claude Code, Cursor…) o en cualquier asistente.
        </p>
        <p className="mt-2 text-xs font-light leading-relaxed text-text-faint">
          Nunca incluyas contraseñas, .env, tokens ni DATABASE_URL dentro de un
          prompt. Estos textos están diseñados para no necesitarlos.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {PROMPTS.map((spec) => (
          <PromptCard key={spec.id} spec={spec} state={state} onGoTo={goTo} />
        ))}
      </div>
    </div>
  );
}
