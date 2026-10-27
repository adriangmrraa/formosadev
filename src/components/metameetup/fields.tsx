"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

/* Shared form primitives for the Meta Meetup journey. All controls keep the
   site contract: tokens only, rounded-control, hairline borders, focus ring,
   min-h-11 touch targets. */

export function FieldShell({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text">{label}</span>
      {hint ? (
        <span className="mt-0.5 block text-xs font-light text-text-faint">{hint}</span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-control border border-hairline bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint transition-colors duration-200 hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "text" | "search";
}) {
  return (
    <FieldShell label={label} hint={hint}>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} min-h-11`}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <FieldShell label={label} hint={hint}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${inputClass} resize-y leading-relaxed`}
      />
    </FieldShell>
  );
}

export function PillSelect<T extends string>({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-text">{label}</legend>
      {hint ? <p className="mt-0.5 text-xs font-light text-text-faint">{hint}</p> : null}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange((selected ? "" : option.value) as T)}
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
    </fieldset>
  );
}

export function CheckItem({
  label,
  hint,
  checked,
  onChange,
  children,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
}) {
  return (
    <div className="surface-well flex items-start gap-3 rounded-control px-4 py-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.95] ${
          checked ? "border-ok bg-ok text-white" : "border-hairline-strong bg-surface"
        }`}
      >
        {checked ? <Check aria-hidden="true" className="size-4" /> : null}
      </button>
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className="block min-h-6 w-full rounded text-left text-sm font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {label}
        </button>
        {hint ? <p className="mt-0.5 text-xs font-light text-text-faint">{hint}</p> : null}
        {children}
      </div>
    </div>
  );
}

export function CommandChip({ command }: { command: string }) {
  return (
    <code className="mt-2 inline-block rounded-lg bg-ink px-2.5 py-1 font-mono text-xs text-crema">
      {command}
    </code>
  );
}

export function StatusChip({ status }: { status: "empty" | "partial" | "done" }) {
  const map = {
    empty: { label: "Pendiente", cls: "border-hairline text-text-faint" },
    partial: { label: "En curso", cls: "border-warn/40 bg-warn-soft text-warn" },
    done: { label: "Listo", cls: "border-ok/40 bg-ok-soft text-ok" },
  } as const;
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-semibold ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
