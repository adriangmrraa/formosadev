"use client";

import { RotateCcw } from "lucide-react";
import {
  PROVIDER_REASONS,
  PROVIDERS,
  TREE_QUESTIONS,
  type TreeAnswers,
} from "../../lib/metameetup";
import {
  resolveProviderPath,
  type MeetupState,
} from "../../lib/metameetup-store";

type Update = (mutate: (draft: MeetupState) => MeetupState) => void;

/**
 * Decision tree from the participant guide (§5): three short questions resolve
 * to YCloud / Zernio / Kapso / demo, then the provider card shows its webhook
 * and lab checklist. Answers persist so the path survives reloads.
 */
export function ProviderTree({
  state,
  update,
}: {
  state: MeetupState;
  update: Update;
}) {
  const arbol = state.canal.arbol;
  const resolved = resolveProviderPath(arbol);

  const setAnswer = (key: keyof TreeAnswers, value: string) =>
    update((s) => {
      // Re-clicking the same option deselects it (like PillSelect); only an
      // actual change clears the downstream answers and re-derives the provider.
      const prev = s.canal.arbol[key];
      const nextValue = (prev === value ? "" : value) as TreeAnswers[typeof key];
      const nextArbol: TreeAnswers = { ...s.canal.arbol, [key]: nextValue };
      if (key === "canalDeseado" && prev !== value) {
        nextArbol.tieneProveedor = "";
        nextArbol.activosMeta = "";
      }
      return {
        ...s,
        canal: {
          ...s.canal,
          arbol: nextArbol,
          proveedor: resolveProviderPath(nextArbol),
        },
      };
    });

  const reset = () =>
    update((s) => ({
      ...s,
      canal: {
        ...s.canal,
        proveedor: "",
        laboratorio: null,
        arbol: { canalDeseado: "", tieneProveedor: "", activosMeta: "" },
      },
    }));

  const q = TREE_QUESTIONS;
  const showProveedorQ = arbol.canalDeseado === "whatsapp";
  const showMetaQ = arbol.canalDeseado === "ig-fb";
  const provider = PROVIDERS.find((p) => p.id === resolved);

  return (
    <div className="surface-glow rounded-card border border-hairline-soft p-5 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Árbol de decisión
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
            ¿Qué ruta te toca?
          </h3>
        </div>
        {arbol.canalDeseado !== "" ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline px-4 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-lapacho hover:text-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Rehacer
          </button>
        ) : null}
      </div>

      <div className="mt-5 space-y-5">
        <TreeQuestion
          question={q.canalDeseado.question}
          options={q.canalDeseado.options}
          value={arbol.canalDeseado}
          onPick={(val) => setAnswer("canalDeseado", val)}
        />
        {showProveedorQ ? (
          <TreeQuestion
            question={q.tieneProveedor.question}
            options={q.tieneProveedor.options}
            value={arbol.tieneProveedor}
            onPick={(val) => setAnswer("tieneProveedor", val)}
          />
        ) : null}
        {showMetaQ ? (
          <TreeQuestion
            question={q.activosMeta.question}
            options={q.activosMeta.options}
            value={arbol.activosMeta}
            onPick={(val) => setAnswer("activosMeta", val)}
          />
        ) : null}
      </div>

      {provider ? (
        <div className="fd-pop mt-6 rounded-card border border-hairline bg-surface p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ok">
            Tu ruta
          </p>
          <p className="mt-1 text-lg font-bold tracking-tight">
            {provider.name}
            <span className="ml-2 text-sm font-medium text-text-faint">
              {provider.channels}
            </span>
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-text-muted">
            {PROVIDER_REASONS[provider.id]}
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-text-muted">
            {provider.when}
          </p>
          {provider.webhook ? (
            <code className="mt-3 block overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-xs text-crema">
              {provider.webhook}
            </code>
          ) : null}
          <ul className="mt-3 space-y-1.5">
            {provider.notes.map((note) => (
              <li key={note} className="flex gap-2 text-sm font-light text-text-muted">
                <span aria-hidden="true" className="font-black text-accent">
                  ·
                </span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function TreeQuestion({
  question,
  options,
  value,
  onPick,
}: {
  question: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onPick: (value: string) => void;
}) {
  return (
    <div className="fd-pop">
      <p className="text-sm font-semibold text-text">{question}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(option.value)}
              className={`min-h-11 rounded-pill border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] ${
                selected
                  ? "border-ink bg-ink text-crema"
                  : "border-hairline-strong text-text-muted hover:border-lapacho hover:text-lapacho"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
