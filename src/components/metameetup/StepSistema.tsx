"use client";

import { Code2, Database, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { GLOSSARY, NEON_LINKS, TWO_AGENTS } from "../../lib/metameetup";
import type { MeetupState } from "../../lib/metameetup-store";
import { MessageFlow } from "./MessageFlow";

export function StepSistema({ state }: { state: MeetupState }) {
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <MessageFlow state={state} />

      {/* Two agents — the guide's most common confusion, side by side. */}
      <section>
        <h3 className="text-xl font-bold tracking-tight">Dos agentes, no los confundas</h3>
        <p className="mt-1 max-w-2xl text-sm font-light leading-relaxed text-text-muted">
          En el workshop conviven dos “agentes” distintos. Mezclarlos es el error
          más común.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <AgentCard
            icon={<Code2 aria-hidden="true" className="size-4" />}
            name={TWO_AGENTS.programacion.name}
            role={TWO_AGENTS.programacion.role}
            points={TWO_AGENTS.programacion.points}
          />
          <AgentCard
            icon={<MessagesSquare aria-hidden="true" className="size-4" />}
            name={TWO_AGENTS.comercial.name}
            role={TWO_AGENTS.comercial.role}
            points={TWO_AGENTS.comercial.points}
          />
        </div>
      </section>

      {/* Neon direct vs pooled — the other classic stumbling block. */}
      <section className="surface-well rounded-card p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <span className="icon-orb flex h-8 w-8 items-center justify-center rounded-xl">
            <Database aria-hidden="true" className="size-4" />
          </span>
          {NEON_LINKS.title}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-control border border-hairline bg-surface p-4">
            <p className="text-sm font-semibold text-text">{NEON_LINKS.directa.name}</p>
            <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
              {NEON_LINKS.directa.detail}
            </p>
            <code className="mt-3 inline-block rounded-lg bg-ink px-2.5 py-1 font-mono text-xs text-crema">
              npm run db:migrate
            </code>
          </div>
          <div className="rounded-control border border-hairline bg-surface p-4">
            <p className="text-sm font-semibold text-text">{NEON_LINKS.pooled.name}</p>
            <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
              {NEON_LINKS.pooled.detail}
            </p>
            <code className="mt-3 inline-block rounded-lg bg-ink px-2.5 py-1 font-mono text-xs text-crema">
              DATABASE_URL en Render
            </code>
          </div>
        </div>
      </section>

      {/* Glossary — tap a term to read it. */}
      <section>
        <h3 className="text-xl font-bold tracking-tight">Glosario mínimo</h3>
        <p className="mt-1 text-sm font-light text-text-muted">
          Para no perderte durante la presentación. Tocá cada término.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {GLOSSARY.map((g) => {
            const open = openTerm === g.term;
            return (
              <button
                key={g.term}
                type="button"
                aria-pressed={open}
                onClick={() => setOpenTerm(open ? null : g.term)}
                className={`min-h-11 rounded-pill border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] ${
                  open
                    ? "border-ink bg-ink text-crema"
                    : "border-hairline-strong text-text-muted hover:border-lapacho hover:text-lapacho"
                }`}
              >
                {g.term}
              </button>
            );
          })}
        </div>
        {openTerm ? (
          <p className="fd-pop mt-3 max-w-2xl rounded-control border border-hairline bg-surface px-4 py-3 text-sm font-light leading-relaxed text-text-muted">
            <span className="font-semibold text-text">{openTerm}: </span>
            {GLOSSARY.find((g) => g.term === openTerm)?.def}
          </p>
        ) : null}
      </section>
    </div>
  );
}

function AgentCard({
  icon,
  name,
  role,
  points,
}: {
  icon: React.ReactNode;
  name: string;
  role: string;
  points: readonly string[];
}) {
  return (
    <div className="surface-glow rounded-card border border-hairline-soft p-5">
      <h4 className="flex items-center gap-2 text-base font-bold">
        <span className="icon-orb flex h-8 w-8 items-center justify-center rounded-xl">
          {icon}
        </span>
        {name}
      </h4>
      <p className="mt-2 text-sm font-light leading-relaxed text-text-muted">{role}</p>
      <ul className="mt-3 space-y-1.5">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-sm font-light text-text-muted">
            <span aria-hidden="true" className="font-black text-accent">·</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
