"use client";

import {
  AGENTE_SUGGESTIONS,
  META_OPTIONS,
  MODELO_OPTIONS,
  NIVEL_OPTIONS,
  OS_OPTIONS,
  RENDER_PLAN_OPTIONS,
} from "../../lib/metameetup";
import {
  setupProgress,
  type MeetupState,
  type SetupState,
} from "../../lib/metameetup-store";
import { CheckItem, CommandChip, PillSelect, TextField } from "./fields";

type Update = (mutate: (draft: MeetupState) => MeetupState) => void;

export function StepEntorno({
  state,
  update,
}: {
  state: MeetupState;
  update: Update;
}) {
  const progress = setupProgress(state);
  const set = <K extends keyof SetupState>(key: K) => (value: SetupState[K]) =>
    update((s) => ({ ...s, setup: { ...s.setup, [key]: value } }));

  const pct = Math.round((progress.done / progress.total) * 100);

  return (
    <div className="space-y-8">
      <div className="surface-well rounded-card p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-text">
            Tu preparación: {progress.done} de {progress.total}
          </p>
          <p className="font-display text-lg font-black italic tabular-nums text-accent">
            {pct}%
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de preparación del entorno"
          className="mt-3 h-2 overflow-hidden rounded-pill bg-hairline-soft"
        >
          <div
            className="h-full rounded-pill bg-gradient-to-r from-lapacho to-lapacho-deep transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {progress.missing.length > 0 ? (
          <p className="mt-3 text-xs font-light leading-relaxed text-text-faint">
            Todavía falta: {progress.missing.join(" · ")}. Saber qué falta ya es
            avance — lo resolvemos en la llamada previa.
          </p>
        ) : (
          <p className="mt-3 text-xs font-semibold text-ok">
            Entorno completo: llegás al viernes listo para construir.
          </p>
        )}
      </div>

      <section>
        <h3 className="text-base font-bold">Vos y tu equipo</h3>
        <div className="mt-4 space-y-5">
          <PillSelect
            label="Sistema operativo"
            options={OS_OPTIONS}
            value={state.setup.os}
            onChange={set("os")}
          />
          <PillSelect
            label="Tu nivel técnico hoy"
            hint="No hay nivel incorrecto: define cuánta guía necesitás."
            options={NIVEL_OPTIONS}
            value={state.setup.nivel}
            onChange={set("nivel")}
          />
          <CheckItem
            label="Tengo notebook y cargador para llevar el viernes"
            hint="Recomendado también: mouse, adaptador USB-C/HDMI y un alargue."
            checked={state.setup.notebookPropia}
            onChange={set("notebookPropia")}
          />
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold">Terminal</h3>
        <p className="mt-1 text-sm font-light text-text-muted">
          Abrí la terminal de tu sistema (PowerShell, Terminal) y ejecutá cada
          comando. Pegá la salida de la versión — o dejalo vacío si todavía no
          funciona.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <TextField
              label="Git"
              value={state.setup.gitVersion}
              onChange={set("gitVersion")}
              placeholder="2.x.x"
            />
            <CommandChip command="git --version" />
          </div>
          <div>
            <TextField
              label="Node.js"
              hint="El repo usa Node 20 como referencia"
              value={state.setup.nodeVersion}
              onChange={set("nodeVersion")}
              placeholder="v20.x.x"
            />
            <CommandChip command="node --version" />
          </div>
          <div>
            <TextField
              label="npm"
              value={state.setup.npmVersion}
              onChange={set("npmVersion")}
              placeholder="10.x.x"
            />
            <CommandChip command="npm --version" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold">Tu agente de programación</h3>
        <p className="mt-1 text-sm font-light text-text-muted">
          Cualquiera que pueda leer una carpeta local y pedir permiso antes de
          editar sirve. No hace falta una marca ni una suscripción especial.
        </p>
        <div className="mt-4">
          <PillSelect
            label="¿Cuál usás o querés probar?"
            options={AGENTE_SUGGESTIONS.map((a) => ({ value: a, label: a }))}
            value={state.setup.agente}
            onChange={set("agente")}
          />
        </div>
        <div className="mt-4">
          <CheckItem
            label="Ya lo probé con una carpeta de ejemplo"
            hint="Prueba simple: pedile que liste archivos y explique cómo crear un README, con permiso antes de modificar."
            checked={state.setup.agenteProbado}
            onChange={set("agenteProbado")}
          />
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold">Cuentas</h3>
        <div className="mt-4 space-y-3">
          <CheckItem
            label="GitHub: sesión iniciada, puedo crear un fork"
            checked={state.setup.githubOk}
            onChange={set("githubOk")}
          />
          <CheckItem
            label="Neon: cuenta creada, acceso al dashboard"
            hint="Nunca compartas el DATABASE_URL — ni acá, ni en el grupo, ni con la IA."
            checked={state.setup.neonOk}
            onChange={set("neonOk")}
          />
        </div>
        <div className="mt-5 space-y-5">
          <PillSelect
            label="Render"
            hint="El Blueprint puede generar costos: la decisión de activar servicios es tuya."
            options={RENDER_PLAN_OPTIONS}
            value={state.setup.renderPlan}
            onChange={set("renderPlan")}
          />
          <PillSelect
            label="Proveedor de modelo de IA"
            hint="API compatible con OpenAI; puede requerir key o saldo propio."
            options={MODELO_OPTIONS}
            value={state.setup.modeloIa}
            onChange={set("modeloIa")}
          />
          <PillSelect
            label="Meta Business (solo si querés canales reales)"
            options={META_OPTIONS}
            value={state.setup.metaEstado}
            onChange={set("metaEstado")}
          />
        </div>
      </section>
    </div>
  );
}
