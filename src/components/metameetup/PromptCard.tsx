"use client";

import { Check, Copy, PenLine } from "lucide-react";
import { useRef, useState } from "react";
import { promptMissing, type PromptSpec } from "../../lib/metameetup-prompts";
import type { MeetupState } from "../../lib/metameetup-store";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * A copy-paste prompt generated from the participant's own answers. Fields
 * that are still empty degrade to [PLACEHOLDER] tokens inside the text and are
 * listed as chips that deep-link back to the step that collects them.
 */
export function PromptCard({
  spec,
  state,
  onGoTo,
}: {
  spec: PromptSpec;
  state: MeetupState;
  onGoTo: (step: number) => void;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const missing = promptMissing(spec, state);
  const text = spec.build(state);

  const copy = async () => {
    if (!(await copyText(text))) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="surface-glow flex flex-col rounded-card border border-hairline-soft p-5">
      <h3 className="text-lg font-bold tracking-tight">{spec.title}</h3>
      <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
        {spec.when}
      </p>

      {missing.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-text-faint">
            <PenLine aria-hidden="true" className="size-3.5" />
            Queda como placeholder:
          </span>
          {missing.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => onGoTo(m.step)}
              className="min-h-8 rounded-pill border border-warn/40 bg-warn-soft px-2.5 text-xs font-medium text-warn transition-colors duration-200 hover:border-warn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {m.label} →
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ok">
          <Check aria-hidden="true" className="size-4" />
          Completo con tus datos
        </p>
      )}

      <pre className="media-glow mt-4 max-h-64 flex-1 overflow-auto whitespace-pre-wrap rounded-control bg-ink p-4 font-mono text-xs leading-relaxed text-crema">
        {text}
      </pre>

      <button
        type="button"
        onClick={copy}
        className={`mt-4 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-pill px-5 text-sm font-semibold transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] ${
          copied
            ? "bg-ok text-white"
            : "bg-ink text-crema hover:bg-lapacho"
        }`}
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {copied ? "Copiado" : "Copiar prompt"}
      </button>
    </article>
  );
}
