// State + persistence for the Meta Meetup companion.
// Everything here is pure and DOM-free so it can be unit-tested with a fake
// storage; the only consumer that passes real localStorage is the client hook
// in src/components/metameetup/useMeetupState.ts.

import {
  CASO_FIELDS,
  PROVIDERS,
  STEPS,
  type CheckpointId,
  type ProviderId,
  type StepId,
  type TreeAnswers,
} from "./metameetup";

export const STORAGE_KEY = "formosadev:metameetup:v1";
export const STATE_VERSION = 1;

export type CanalId = "whatsapp" | "instagram" | "facebook" | "demo";
export type Semaforo = "verde" | "amarillo" | "rojo" | "na";
export type RutaId = "A" | "B" | "C" | "D";

export interface CasoState {
  negocio: string;
  ofrece: string;
  quienEscribe: string;
  canal: "" | CanalId;
  mensajeEjemplo: string;
  datoFaltante: string;
  respuestaEsperada: string;
  handoff: string;
  criterioExito: string;
  noPrometer: string;
}

export interface SetupState {
  os: string;
  nivel: string;
  notebookPropia: boolean;
  gitVersion: string;
  nodeVersion: string;
  npmVersion: string;
  agente: string;
  agenteProbado: boolean;
  githubOk: boolean;
  neonOk: boolean;
  renderPlan: "" | "si" | "sin-pagos" | "demo";
  modeloIa: "" | "si" | "todavia-no" | "demo";
  metaEstado: "" | "tengo-permisos" | "pendientes" | "no-aplica";
}

export interface CanalState {
  proveedor: "" | ProviderId;
  laboratorio: boolean | null;
  arbol: TreeAnswers;
  notas: string;
}

export interface ViernesState {
  checkpoints: Record<CheckpointId, "" | Semaforo>;
  notas: Record<CheckpointId, string>;
  aprendizaje: string;
  siguientePaso: string;
}

export interface MeetupState {
  v: number;
  step: number;
  visited: number[];
  caso: CasoState;
  setup: SetupState;
  canal: CanalState;
  viernes: ViernesState;
}

export function defaultState(): MeetupState {
  return {
    v: STATE_VERSION,
    step: 0,
    visited: [0],
    caso: {
      negocio: "",
      ofrece: "",
      quienEscribe: "",
      canal: "",
      mensajeEjemplo: "",
      datoFaltante: "",
      respuestaEsperada: "",
      handoff: "",
      criterioExito: "",
      noPrometer: "",
    },
    setup: {
      os: "",
      nivel: "",
      notebookPropia: false,
      gitVersion: "",
      nodeVersion: "",
      npmVersion: "",
      agente: "",
      agenteProbado: false,
      githubOk: false,
      neonOk: false,
      renderPlan: "",
      modeloIa: "",
      metaEstado: "",
    },
    canal: {
      proveedor: "",
      laboratorio: null,
      arbol: { canalDeseado: "", tieneProveedor: "", activosMeta: "" },
      notas: "",
    },
    viernes: {
      checkpoints: { fork: "", deploy: "", mensajeria: "", mejora: "" },
      notas: { fork: "", deploy: "", mensajeria: "", mejora: "" },
      aprendizaje: "",
      siguientePaso: "",
    },
  };
}

/* ---------------------------------------------------------------------------
   Persistence
--------------------------------------------------------------------------- */

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Merge a stored snapshot onto defaults: known keys keep their stored value. */
function merge<T extends object>(defaults: T, stored: unknown): T {
  if (!isRecord(stored)) return { ...defaults };
  const base = defaults as AnyRecord;
  const out = { ...defaults } as AnyRecord;
  for (const key of Object.keys(base)) {
    const dv = base[key];
    const sv = stored[key];
    if (isRecord(dv)) {
      out[key] = merge(dv, sv);
    } else if (Array.isArray(dv)) {
      out[key] = Array.isArray(sv) ? sv : dv;
    } else if (sv !== undefined && (typeof dv === typeof sv || dv === null)) {
      out[key] = sv;
    }
  }
  return out as T;
}

export function loadState(storage?: StorageLike): MeetupState {
  if (!storage) return defaultState();
  let raw: string | null = null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return defaultState();
  }
  if (!raw) return defaultState();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.v !== STATE_VERSION) return defaultState();
    const merged = merge(defaultState(), parsed);
    // A stored step outside the range would break "Paso X de N" and strand
    // prev(); visited entries that aren't valid indices are dropped.
    merged.step = Math.max(
      0,
      Math.min(STEPS.length - 1, Math.floor(merged.step))
    );
    merged.visited = merged.visited.filter(
      (n) => Number.isInteger(n) && n >= 0 && n < STEPS.length
    );
    if (!merged.visited.includes(merged.step)) merged.visited.push(merged.step);
    return merged;
  } catch {
    return defaultState();
  }
}

export function saveState(state: MeetupState, storage?: StorageLike): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearState(storage?: StorageLike): void {
  try {
    storage?.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

/* ---------------------------------------------------------------------------
   Derived state — progress, completion, recommendations
--------------------------------------------------------------------------- */

export type Completion = "empty" | "partial" | "done";

export function ratio(done: number, total: number): number {
  return total === 0 ? 0 : done / total;
}

export function completionOf(done: number, total: number): Completion {
  if (done === 0) return "empty";
  return done === total ? "done" : "partial";
}

const filled = (value: unknown) =>
  typeof value === "string" ? value.trim().length > 0 : value != null && value !== "";

/** Paso "caso": 9 text fields + canal select. */
export function casoProgress(state: MeetupState) {
  const keys = CASO_FIELDS.map((f) => f.key);
  const missing = CASO_FIELDS.filter((f) => !filled(state.caso[f.key])).map(
    (f) => f.label
  );
  const done = keys.length - missing.length + (filled(state.caso.canal) ? 1 : 0);
  const total = keys.length + 1;
  return { done, total, missing, status: completionOf(done, total) };
}

export interface SetupItem {
  key: string;
  label: string;
  done: boolean;
  detail?: string;
}

/** Paso "entorno": every checkable item with its current state. */
export function setupItems(state: MeetupState): SetupItem[] {
  const s = state.setup;
  return [
    { key: "os", label: "Sistema operativo", done: filled(s.os), detail: s.os || undefined },
    { key: "nivel", label: "Nivel técnico declarado", done: filled(s.nivel) },
    { key: "notebook", label: "Notebook + cargador para el viernes", done: s.notebookPropia },
    { key: "git", label: "Git instalado (git --version)", done: filled(s.gitVersion), detail: s.gitVersion || undefined },
    { key: "node", label: "Node.js compatible — el repo usa Node 20", done: filled(s.nodeVersion), detail: s.nodeVersion || undefined },
    { key: "npm", label: "npm funcionando (npm --version)", done: filled(s.npmVersion), detail: s.npmVersion || undefined },
    { key: "agente", label: "Agente de programación elegido y probado", done: filled(s.agente) && s.agenteProbado, detail: s.agente || undefined },
    { key: "github", label: "GitHub: sesión iniciada, puedo hacer fork", done: s.githubOk },
    { key: "neon", label: "Neon: cuenta creada (sin compartir DATABASE_URL)", done: s.neonOk },
    { key: "render", label: "Render: cuenta y decisión sobre costos", done: filled(s.renderPlan) },
    { key: "modelo", label: "Modelo de IA: API key / saldo / demo", done: filled(s.modeloIa) },
    { key: "meta", label: "Meta Business: permisos relevados", done: filled(s.metaEstado) },
  ];
}

export function setupProgress(state: MeetupState) {
  const items = setupItems(state);
  const done = items.filter((i) => i.done).length;
  return {
    items,
    done,
    total: items.length,
    missing: items.filter((i) => !i.done).map((i) => i.label),
    status: completionOf(done, items.length),
  };
}

/** Paso "canal": resolved when a provider (or the demo route) is chosen. */
export function canalProgress(state: MeetupState) {
  const total = 2; // provider + laboratorio answer
  let done = filled(state.canal.proveedor) ? 1 : 0;
  if (state.canal.proveedor === "demo" || state.canal.laboratorio !== null) done += 1;
  return { done, total, status: completionOf(done, total) };
}

/** Paso "viernes": the four checkpoint semaphores. */
export function viernesProgress(state: MeetupState) {
  const marks = Object.values(state.viernes.checkpoints).filter((v) => v !== "");
  const done = marks.length;
  return { done, total: 4, status: completionOf(done, 4) };
}

export function stepStatus(state: MeetupState, id: StepId): Completion {
  switch (id) {
    case "caso":
      return casoProgress(state).status;
    case "entorno":
      return setupProgress(state).status;
    case "canal":
      return canalProgress(state).status;
    case "viernes":
      return viernesProgress(state).status;
    default:
      // Narrative steps count as "done" once visited — the store caller
      // combines this with `visited` for display.
      return state.visited.includes(stepIndex(id)) ? "done" : "empty";
  }
}

const STEP_ORDER: StepId[] = [
  "inicio",
  "caso",
  "entorno",
  "sistema",
  "canal",
  "viernes",
  "prompts",
  "estado",
];

export function stepIndex(id: StepId): number {
  return STEP_ORDER.indexOf(id);
}

/* ---------------------------------------------------------------------------
   Recommendations — ruta + proveedor
--------------------------------------------------------------------------- */

/** Ruta A/B/C from the declared level; D is a cross-cutting flag. */
export function suggestRuta(state: MeetupState): RutaId | "" {
  const nivel = state.setup.nivel;
  if (nivel === "avanzado" || nivel === "intermedio") return "A";
  if (nivel === "basico" || nivel === "inicial") return "B";
  if (nivel === "sin") return "C";
  return "";
}

/** Whether the canal-real subroute (D) applies: provider + lab + permissions. */
export function hasRutaD(state: MeetupState): boolean {
  return (
    state.canal.proveedor !== "" &&
    state.canal.proveedor !== "demo" &&
    state.canal.laboratorio === true &&
    state.setup.metaEstado === "tengo-permisos"
  );
}

/** Provider decision tree — mirrors the guide's decision table. */
export function resolveProviderPath(a: TreeAnswers): ProviderId | "" {
  if (a.canalDeseado === "ninguno") return "demo";
  if (a.canalDeseado === "whatsapp") {
    if (a.tieneProveedor === "ycloud") return "ycloud";
    if (a.tieneProveedor === "kapso") return "kapso";
    if (a.tieneProveedor === "ninguno") return "zernio";
    return "";
  }
  if (a.canalDeseado === "ig-fb") {
    if (a.activosMeta === "si") return "zernio";
    if (a.activosMeta === "no" || a.activosMeta === "no-se") return "demo";
    return "";
  }
  return "";
}

export function providerDef(id: ProviderId | "") {
  return PROVIDERS.find((p) => p.id === id);
}

/* ---------------------------------------------------------------------------
   Global summary for the "estado" step
--------------------------------------------------------------------------- */

export interface ResumenItem {
  label: string;
  status: Completion;
}

export function resumen(state: MeetupState): ResumenItem[] {
  return [
    { label: "Caso de uso", status: casoProgress(state).status },
    { label: "Entorno y cuentas", status: setupProgress(state).status },
    { label: "Canal y proveedor", status: canalProgress(state).status },
    { label: "Checkpoints del viernes", status: viernesProgress(state).status },
  ];
}
