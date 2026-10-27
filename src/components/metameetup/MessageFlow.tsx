"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Database,
  MessageCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Split,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FLOW_NODES, FLOW_OUTCOMES, PROVIDERS, type FlowNode } from "../../lib/metameetup";
import type { MeetupState } from "../../lib/metameetup-store";
import { buttonClass } from "../ui/Button";

const NODE_ICONS = {
  user: Smartphone,
  channel: MessageCircle,
  provider: Split,
  webhook: ShieldCheck,
  crm: Database,
  agent: Bot,
} as const;

const CANAL_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  demo: "Demo",
};

const TOTAL = FLOW_NODES.length; // outcomes render after the last node

type NodeState = "idle" | "active" | "done" | "blocked";

/**
 * The didactic heart of the page: simulates the real journey of a customer
 * message through channel → provider → signed webhook → CRM inbox → agent.
 * Personalizes with whatever the participant already filled in (their canal,
 * their provider, their example message). A "sin permisos" mode shows where
 * the flow stops when Meta hasn't approved the asset — and why the demo
 * route is still a valid outcome.
 */
export function MessageFlow({ state }: { state: MeetupState }) {
  const [phase, setPhase] = useState(-1); // -1 idle · 0..TOTAL-1 nodes · TOTAL = outcomes
  const [playing, setPlaying] = useState(false);
  const [blockedMode, setBlockedMode] = useState(false);
  const [selected, setSelected] = useState<FlowNode | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const canalLabel = CANAL_LABELS[state.caso.canal] ?? "WhatsApp / IG / FB";
  const providerLabel = state.canal.proveedor
    ? (PROVIDERS.find((p) => p.id === state.canal.proveedor)?.name ?? "Proveedor")
    : "Proveedor";
  const ejemplo = state.caso.mensajeEjemplo.trim();

  const stopAt = blockedMode ? 2 : TOTAL; // blocked: the provider can't relay

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setPhase((p) => {
        if (p >= stopAt) {
          setPlaying(false);
          return p;
        }
        return p + 1;
      });
    }, 1600);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, stopAt]);

  const restart = (autoplay: boolean) => {
    setSelected(null);
    setPhase(0);
    setPlaying(autoplay);
  };

  const nodeState = (i: number): NodeState => {
    if (phase < 0) return "idle";
    if (blockedMode && i === stopAt && phase >= stopAt) return "blocked";
    if (i < phase) return "done";
    if (i === phase) return "active";
    return "idle";
  };

  const current = phase >= 0 && phase < TOTAL ? FLOW_NODES[phase] : null;
  const finished = phase >= TOTAL;
  const blocked = blockedMode && phase >= stopAt;

  const nodeName = (node: FlowNode) =>
    node.id === "canal"
      ? `Canal · ${canalLabel}`
      : node.id === "proveedor"
        ? `Proveedor · ${providerLabel}`
        : node.name;

  return (
    <div className="surface-glow rounded-card border border-hairline-soft p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Simulador
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
            El viaje de un mensaje
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => restart(true)}
            className={buttonClass({ variant: "primary", size: "sm" })}
          >
            <Play aria-hidden="true" className="size-4" />
            Simular mensaje
          </button>
          <button
            type="button"
            onClick={() => setPhase((p) => Math.max(-1, Math.min(TOTAL, p - 1)))}
            disabled={phase <= -1}
            aria-label="Paso anterior del recorrido"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong text-text transition-colors duration-200 hover:border-lapacho hover:text-lapacho disabled:opacity-40 disabled:hover:border-hairline-strong disabled:hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setPhase((p) => Math.min(stopAt, p + 1));
            }}
            disabled={phase >= stopAt}
            aria-label="Siguiente paso del recorrido"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong text-text transition-colors duration-200 hover:border-lapacho hover:text-lapacho disabled:opacity-40 disabled:hover:border-hairline-strong disabled:hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setPhase(-1);
              setSelected(null);
            }}
            aria-label="Reiniciar simulación"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-text-muted transition-colors duration-200 hover:border-lapacho hover:text-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-text-muted">
        <input
          type="checkbox"
          checked={blockedMode}
          onChange={(e) => {
            setBlockedMode(e.target.checked);
            setPlaying(false);
            setPhase(-1);
            setSelected(null);
          }}
          className="h-5 w-5 rounded accent-[var(--color-lapacho)]"
        />
        Simular sin permisos de Meta (el recorrido se corta y la demo sigue valiendo)
      </label>

      {/* Vertical chain — readable on any viewport, animates node by node. */}
      <ol className="mt-5">
        {FLOW_NODES.map((node, i) => {
          const Icon = NODE_ICONS[node.icon];
          const ns = nodeState(i);
          const isSelected = selected?.id === node.id;
          return (
            <li key={node.id} className="mm-node" data-state={ns}>
              <div className="flex items-center gap-3">
                <span
                  className={`mm-node-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    ns === "idle"
                      ? "orb-idle text-text-muted"
                      : ns === "blocked"
                        ? "bg-bad-soft text-bad"
                        : "orb text-white"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(isSelected ? null : node)}
                  className="min-h-11 flex-1 rounded-control px-3 py-2 text-left transition-colors duration-200 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  aria-expanded={isSelected}
                >
                  <span className="block text-sm font-semibold text-text">
                    {nodeName(node)}
                  </span>
                  <span className="block text-xs font-light text-text-faint">
                    {ns === "done"
                      ? "Hecho"
                      : ns === "active"
                        ? "Pasando por acá…"
                        : ns === "blocked"
                          ? "Se frena acá"
                          : "Todavía no pasó"}
                  </span>
                </button>
              </div>
              {isSelected ? (
                <p className="fd-pop ml-14 mt-1 rounded-control bg-surface-soft px-4 py-3 text-sm font-light leading-relaxed text-text-muted">
                  {node.explain}
                </p>
              ) : null}
              {i < TOTAL - 1 ? (
                <div
                  aria-hidden="true"
                  className="mm-link"
                  data-on={i < phase}
                  data-active={i === phase - 1 || (i === 0 && phase === 0)}
                >
                  <span className="mm-link-fill" />
                  <span className="mm-packet" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* Narration / outcome panel */}
      <div aria-live="polite" className="mt-5">
        {phase === -1 ? (
          <p className="rounded-control border border-dashed border-hairline-strong px-4 py-3 text-sm font-light text-text-faint">
            Tocá “Simular mensaje” para recorrer el circuito completo, o usá las
            flechas para ir paso a paso. Cada estación se puede tocar para
            entender qué hace.
          </p>
        ) : blocked ? (
          <div className="fd-pop rounded-control border border-bad/40 bg-bad-soft px-4 py-4">
            <p className="text-sm font-semibold text-bad">
              El recorrido se frena en el proveedor
            </p>
            <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
              Sin activos elegibles ni aprobación de Meta, el mensaje real no
              llega al webhook. No es un fallo del repo: es un pendiente de
              permisos. Mientras tanto, la instancia demo del facilitador te deja
              ver todo lo demás funcionando — eso cuenta como avance.
            </p>
          </div>
        ) : finished ? (
          <div className="fd-pop grid gap-3 sm:grid-cols-2">
            {FLOW_OUTCOMES.map((outcome) => (
              <div
                key={outcome.id}
                className="rounded-control border border-ok/40 bg-ok-soft px-4 py-3"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-ok">
                  <span className="live-dot" aria-hidden="true" />
                  {outcome.name}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
                  {outcome.detail}
                </p>
              </div>
            ))}
          </div>
        ) : current ? (
          <div className="fd-pop rounded-control border border-hairline bg-surface px-4 py-4" key={current.id}>
            <p className="text-sm font-semibold text-text">
              {phase + 1} de {TOTAL} · {nodeName(current)}
            </p>
            <p className="mt-1 text-sm font-light leading-relaxed text-text-muted">
              {current.id === "cliente" && ejemplo
                ? `Una persona escribe: “${ejemplo}” — tu mensaje de ejemplo.`
                : current.narration}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
