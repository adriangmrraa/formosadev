"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { STEPS } from "../../lib/metameetup";
import { stepStatus, type Completion } from "../../lib/metameetup-store";
import { Eyebrow } from "../ui/Section";
import { StatusChip } from "./fields";
import { StepCanal } from "./StepCanal";
import { StepCaso } from "./StepCaso";
import { StepEntorno } from "./StepEntorno";
import { StepEstado } from "./StepEstado";
import { StepInicio } from "./StepInicio";
import { StepPrompts } from "./StepPrompts";
import { StepSistema } from "./StepSistema";
import { StepViernes } from "./StepViernes";
import { useMeetupState } from "./useMeetupState";

const DOT: Record<Completion, string> = {
  done: "bg-ok",
  partial: "bg-warn",
  empty: "bg-hairline-strong",
};

/**
 * The guided journey shell: a timeline of 8 steps the participant walks
 * forward and back. State persists in localStorage; prompts at the end are
 * generated from whatever was filled in along the way.
 */
export function MetameetupApp() {
  const { state, hydrated, persisted, update, goTo, next, prev, reset } =
    useMeetupState();
  const step = STEPS[state.step] ?? STEPS[0];
  const last = STEPS.length - 1;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Swipe between steps: right = forward, left = back. Horizontal intent only —
  // vertical scroll wins — and gestures born inside horizontally scrollable
  // regions (prompt code blocks) belong to that scroll, not to navigation.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current =
      e.touches.length === 1
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    let el = e.target as HTMLElement | null;
    while (el && el !== e.currentTarget) {
      const ox = getComputedStyle(el).overflowX;
      if (
        (ox === "auto" || ox === "scroll") &&
        el.scrollWidth > el.clientWidth
      )
        return;
      el = el.parentElement;
    }
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) >= 56 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      if (dx > 0) next();
      else prev();
    }
  };

  // Arrow-key navigation; never steal keys while the user is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      )
        return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Keep the active panel in view when changing steps.
  useEffect(() => {
    document.getElementById("mm-panel")?.scrollIntoView({ block: "start" });
  }, [state.step]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 md:pt-14">
      <header>
        <Eyebrow>Meta Meetup · Guía interactiva</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Construí tu CRM con agentes de IA,{" "}
          <span className="font-display font-black italic">paso a paso</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
          Viernes 30 de octubre, 17 a 21 h, en Diario El Comercial. Esta página
          es tu laboratorio: recorrela antes, durante y después del evento.
          Todo lo que completes queda guardado en tu navegador.
        </p>
        <p
          aria-live="polite"
          className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-text-faint"
        >
          <span className="live-dot" aria-hidden="true" />
          {hydrated
            ? persisted
              ? "Guardado en tu navegador"
              : "No se pudo guardar en este navegador"
            : "Cargando tu progreso…"}
        </p>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        {/* Step rail — vertical on desktop, horizontal strip on mobile. */}
        <nav aria-label="Pasos del recorrido" className="mb-6 lg:mb-0">
          <ol className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {STEPS.map((s, i) => {
              const status = stepStatus(state, s.id);
              const current = i === state.step;
              return (
                <li key={s.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={current ? "step" : undefined}
                    className={`mm-rail-item flex min-h-11 w-full items-center gap-3 rounded-control px-3 py-2 text-left lg:rounded-r-none lg:border-r-2 ${
                      current
                        ? "bg-surface-soft lg:border-lapacho"
                        : "hover:bg-surface-soft lg:border-transparent"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-black italic ${
                        current
                          ? "orb text-white"
                          : status === "done"
                            ? "bg-ok-soft text-ok"
                            : "orb-idle text-text-muted"
                      }`}
                    >
                      {status === "done" && !current ? (
                        <Check aria-hidden="true" className="size-4" />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-semibold ${
                          current ? "text-text" : "text-text-muted"
                        }`}
                      >
                        {s.short}
                      </span>
                      <span className="hidden items-center gap-1.5 text-xs text-text-faint lg:flex">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`}
                        />
                        {status === "done"
                          ? "listo"
                          : status === "partial"
                            ? "en curso"
                            : "pendiente"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Current step panel — remounts on change so the entrance replays. */}
        <div
          id="mm-panel"
          className="min-w-0 scroll-mt-24"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {hydrated ? (
            <div key={step.id} className="mm-step">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-base font-light leading-relaxed text-text-muted">
                    {step.purpose}
                  </p>
                </div>
                <StatusChip status={stepStatus(state, step.id)} />
              </div>
              <div className="mt-8">
                <StepBody
                  id={step.id}
                  state={state}
                  update={update}
                  goTo={goTo}
                  next={next}
                  reset={reset}
                />
              </div>
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="h-64 animate-pulse rounded-card border border-hairline-soft bg-surface-soft"
            />
          )}
        </div>
      </div>

      {/* Bottom action bar — always reachable, safe-area aware. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline-soft bg-canvas/90 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <button
            type="button"
            onClick={prev}
            disabled={state.step === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline-strong px-4 text-sm font-semibold text-text transition-colors duration-200 hover:border-lapacho hover:text-lapacho disabled:opacity-40 disabled:hover:border-hairline-strong disabled:hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Atrás
          </button>
          <p className="min-w-0 truncate text-center text-xs font-medium text-text-faint sm:text-sm">
            Paso {state.step + 1} de {STEPS.length} · {step.short}
          </p>
          {state.step === last ? (
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-ink px-4 text-sm font-semibold text-crema transition-colors duration-200 hover:bg-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              Volver al sitio
            </Link>
          ) : (
            <button
              type="button"
              onClick={next}
              className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm font-semibold text-white transition duration-200 ease-out hover:brightness-[1.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              Siguiente
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepBody({
  id,
  state,
  update,
  goTo,
  next,
  reset,
}: {
  id: string;
  state: ReturnType<typeof useMeetupState>["state"];
  update: ReturnType<typeof useMeetupState>["update"];
  goTo: (step: number) => void;
  next: () => void;
  reset: () => void;
}) {
  switch (id) {
    case "inicio":
      return <StepInicio onStart={next} />;
    case "caso":
      return <StepCaso state={state} update={update} />;
    case "entorno":
      return <StepEntorno state={state} update={update} />;
    case "sistema":
      return <StepSistema state={state} />;
    case "canal":
      return <StepCanal state={state} update={update} />;
    case "viernes":
      return <StepViernes state={state} update={update} />;
    case "prompts":
      return <StepPrompts state={state} goTo={goTo} />;
    case "estado":
      return <StepEstado state={state} goTo={goTo} reset={reset} />;
    default:
      return null;
  }
}
