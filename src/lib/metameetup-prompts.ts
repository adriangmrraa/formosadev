// Prompt builders for the Meta Meetup companion.
// Pure functions: take the persisted state and produce copy-paste text for the
// participant's coding agent. Missing fields degrade to [PLACEHOLDER] tokens so
// a prompt is always usable, while `promptMissing` reports what to fill in.

import { MEETUP, type ProviderId } from "./metameetup";
import type { MeetupState } from "./metameetup-store";

/** Returns the trimmed value or a bracketed placeholder for an empty field. */
function v(value: string, placeholder: string): string {
  const t = value.trim();
  return t.length > 0 ? t : `[${placeholder}]`;
}

function vn(value: string | null | undefined, placeholder: string): string {
  return value && value.trim().length > 0 ? value.trim() : `[${placeholder}]`;
}

const OS_LABELS: Record<string, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  otro: "otro sistema",
};

const NIVEL_LABELS: Record<string, string> = {
  sin: "sin experiencia todavía",
  inicial: "inicial",
  basico: "básico",
  intermedio: "intermedio",
  avanzado: "avanzado",
};

const CANAL_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  demo: "demo sin canal real",
};

const PROVIDER_LABELS: Record<ProviderId, string> = {
  ycloud: "YCloud",
  zernio: "Zernio",
  kapso: "Kapso",
  demo: "ruta demo / sandbox",
};

export interface PromptRequirement {
  /** Step index the missing field lives on (for "ir al paso" links). */
  step: number;
  label: string;
  filled: (s: MeetupState) => boolean;
}

export interface PromptSpec {
  id: string;
  title: string;
  when: string;
  requires: PromptRequirement[];
  build: (s: MeetupState) => string;
}

export function promptMissing(spec: PromptSpec, state: MeetupState): PromptRequirement[] {
  return spec.requires.filter((r) => !r.filled(state));
}

/* ---------------------------------------------------------------------------
   Shared context blocks used by several prompts
--------------------------------------------------------------------------- */

function casoBlock(s: MeetupState): string {
  const c = s.caso;
  return [
    `Mi contexto: negocio ${v(c.negocio, "NEGOCIO")}, ofrece ${v(c.ofrece, "QUÉ OFRECE")}.`,
    `Quién escribe: ${v(c.quienEscribe, "CLIENTE TIPO")}.`,
    `Canal deseado: ${vn(CANAL_LABELS[c.canal], "CANAL")}.`,
    `Mensaje de entrada de ejemplo: "${v(c.mensajeEjemplo, "MENSAJE DE EJEMPLO")}".`,
    `Dato que le falta al negocio: ${v(c.datoFaltante, "DATO FALTANTE")}.`,
    `Respuesta o acción esperada: ${v(c.respuestaEsperada, "RESULTADO ESPERADO")}.`,
    `Debe intervenir un humano cuando: ${v(c.handoff, "CONDICIÓN DE HANDOFF")}.`,
    `Sé que funciona cuando: ${v(c.criterioExito, "CRITERIO DE ACEPTACIÓN")}.`,
    `La IA NO puede inventar ni prometer: ${v(c.noPrometer, "LÍMITES")}.`,
  ].join("\n");
}

function setupBlock(s: MeetupState): string {
  const su = s.setup;
  return [
    `Mi entorno: SO ${vn(OS_LABELS[su.os], "SO")}, nivel ${vn(NIVEL_LABELS[su.nivel], "NIVEL")}.`,
    `Versiones: git ${v(su.gitVersion, "GIT")}, node ${v(su.nodeVersion, "NODE")}, npm ${v(su.npmVersion, "NPM")}.`,
    `Agente de código: ${v(su.agente, "AGENTE")}.`,
  ].join("\n");
}

/* ---------------------------------------------------------------------------
   Prompt specs
--------------------------------------------------------------------------- */

export const PROMPTS: PromptSpec[] = [
  {
    id: "companion",
    title: "Acompañante técnico inicial",
    when: "Antes de la llamada previa: abre el recorrido y le da el contexto a tu agente.",
    requires: [
      { step: 2, label: "tu sistema operativo", filled: (s) => s.setup.os !== "" },
      { step: 2, label: "tu nivel", filled: (s) => s.setup.nivel !== "" },
      { step: 2, label: "tu agente de código", filled: (s) => s.setup.agente.trim() !== "" },
    ],
    build: (s) =>
      `Voy a participar del Meta Meetup de Formosa.dev del viernes 30/10/2026. Actuá como acompañante técnico y docente: explicame cada paso de acuerdo con mi nivel, pedime verificar el resultado y marcá qué hicimos y qué falta. El proyecto es ${MEETUP.repoUrl} y usaremos GitHub + Render + Neon; NO Vercel.

${setupBlock(s)}

Antes de sugerir cambios, leé los archivos REALES de mi fork si tenés acceso. No inventes qué existe en el repositorio, qué proveedores están listos ni qué credenciales tengo. Si algo depende de Meta, de pagos o de una cuenta externa, avisame y ofrecé una ruta de demo. No ejecutes comandos destructivos ni operaciones que generen cargos sin mi confirmación explícita. Nunca leas, muestres, copies, guardes o compartas mis contraseñas, archivos .env, tokens, AUTH_SECRET, credenciales de Neon, Render o proveedores de mensajería.

Primero preguntame solo qué información esencial falta. Después ayudame a completar la preparación, una cosa por vez. Cuando estemos en el workshop, seguí el orden de los checkpoints y no te adelantes a lo que se esté explicando.`,
  },
  {
    id: "caso",
    title: "Pensar mi caso a fondo",
    when: "Cuando completaste la ficha: tu agente revisa el caso, encuentra los ángulos débiles y propone qué automatizar primero.",
    requires: [
      { step: 1, label: "negocio", filled: (s) => s.caso.negocio.trim() !== "" },
      { step: 1, label: "quién escribe", filled: (s) => s.caso.quienEscribe.trim() !== "" },
      { step: 1, label: "respuesta esperada", filled: (s) => s.caso.respuestaEsperada.trim() !== "" },
      { step: 1, label: "límites de la IA", filled: (s) => s.caso.noPrometer.trim() !== "" },
    ],
    build: (s) =>
      `Actuá como consultor de procesos y docente técnico. Este es mi caso para el Meta Meetup:

${casoBlock(s)}

Sin escribir código todavía:
1) Revisá mi ficha: señalame qué está ambiguo, qué dato falta para que un agente responda bien, y qué podría inventar por error si no lo aclaro.
2) Listá hasta 5 procesos de atención o venta de este negocio que se podrían automatizar primero, ordenados de más simple a más complejo. Para cada uno: qué datos necesita, qué NO debería decidir solo, y qué señal observable mostraría que funciona.
3) Recomendame cuál conviene como primer cambio pequeño para el workshop y por qué.
4) Si algo del caso no se resuelve con configuración y necesita código, marcálo explícitamente.

No inventes capacidades del repositorio ni datos del negocio que no te di.`,
  },
  {
    id: "preflight",
    title: "Durante la llamada previa",
    when: "En la llamada de preparación: recorre el checklist sin adelantar pasos del viernes.",
    requires: [],
    build: (s) =>
      `Estamos en la llamada preparatoria del Meta Meetup. Quiero completar mi ficha de preparación, sin saltar pasos. Verificá conmigo Git, Node, npm, acceso a GitHub, Neon y Render — quiero usar la CLI de Render y GitHub CLI también. No abras interfaces ajenas ni solicites credenciales. Ayudame a distinguir de Meta: canal, permisos y proveedor, sin cambiar nada.

${setupBlock(s)}

Al terminar, devolveme una tabla: componente / listo o pendiente / cómo lo comprobamos / acción para el jueves. No avances a despliegue sin instrucción.`,
  },
  {
    id: "universal",
    title: "Adaptar mi fork (universal)",
    when: "Checkpoint del viernes 19:35: el prompt completo para trabajar sobre tu fork con tu agente.",
    requires: [
      { step: 1, label: "negocio", filled: (s) => s.caso.negocio.trim() !== "" },
      { step: 1, label: "quién escribe", filled: (s) => s.caso.quienEscribe.trim() !== "" },
      { step: 1, label: "criterio de éxito", filled: (s) => s.caso.criterioExito.trim() !== "" },
      { step: 4, label: "proveedor o demo", filled: (s) => s.canal.proveedor !== "" },
    ],
    build: (s) =>
      `Trabajás sobre MI fork de ${MEETUP.repoUrl} y la guía pública del Meta Meetup.

${casoBlock(s)}
Proveedor elegido: ${vn(s.canal.proveedor ? PROVIDER_LABELS[s.canal.proveedor as ProviderId] : "", "PROVEEDOR O DEMO")}.

PRIMERO: leé README.md, AGENTS.md si existe, docs/socialcrm/implementer-onboarding.md, docs/socialcrm/transform-repo.md y docs/socialcrm/ai-agent-implementation-guide.md. Inspeccioná solo los archivos relevantes. Enumerá qué existe y qué se hace sin código desde /admin/agent. No supongas funcionalidades que el repositorio no implementa.

SEGUNDO: proponé máximo tres cambios pequeños, indicando archivos, riesgos, alternativa por configuración y pruebas concretas. No edites hasta mi aprobación. Detectá qué parte sigue siendo gastronómica.

TERCERO (cuando apruebe): implementá solo el primer cambio mínimo, ejecutá npm run typecheck y pruebas pertinentes, mostrame el diff y una comprobación visual/manual. Si es seguro y está probado, prepará commit en mi fork.

LÍMITES: no leer ni exponer secrets, .env, AUTH_SECRET, tokens o DATABASE_URL; no tocar bases ni servicios productivos, auth, migraciones ni adaptadores de proveedores por cuenta propia; no inventar capacidades del repo ni precios del negocio. Si el cambio no entra en 45 minutos, prepará un plan de continuación.`,
  },
  {
    id: "mensajeria",
    title: "Checkpoint de mensajería",
    when: "En el bloque de canales (19:00): elige ruta según tu proveedor y habilitación real.",
    requires: [
      { step: 1, label: "tu canal", filled: (s) => s.caso.canal !== "" },
      { step: 4, label: "proveedor o demo", filled: (s) => s.canal.proveedor !== "" },
    ],
    build: (s) =>
      `Estoy en el checkpoint de mensajería del Meta Meetup. Mi canal objetivo es ${vn(CANAL_LABELS[s.caso.canal], "CANAL")} y mi ruta de proveedor es ${vn(s.canal.proveedor ? PROVIDER_LABELS[s.canal.proveedor as ProviderId] : "", "PROVEEDOR O DEMO")}.

Revisá el repositorio local antes de recomendar rutas (src/lib/messaging/ y /admin/channels). Describí el webhook esperado y el criterio de prueba, pero no me pidas ni registres claves. Nunca cambies la cuenta, el proveedor, los permisos o los webhooks de un sistema real sin que el titular lo apruebe. Si falla, ayudame a distinguir error de configuración, autorización, red, firma o cuenta.`,
  },
  {
    id: "closing",
    title: "Cierre: mi estado real",
    when: "Al terminar el workshop (o al día siguiente): un resumen honesto de qué quedó probado.",
    requires: [],
    build: (s) => {
      const marks = s.viernes.checkpoints;
      const mark = (k: keyof typeof marks) => marks[k] || "sin marcar";
      return `Terminamos el Meta Meetup. Con la información y comprobaciones REALES que vimos, preparame un cierre en cinco apartados: 1) qué aprendí, 2) qué quedó instalado y dónde (sin secretos), 3) qué funciona y cómo lo comprobamos, 4) qué está pendiente y por qué, 5) siguiente cambio pequeño recomendado con criterio de aceptación.

Mis marcas de checkpoint: fork ${mark("fork")}, Neon+Render ${mark("deploy")}, mensajería ${mark("mensajeria")}, mejora ${mark("mejora")}.
Mi aprendizaje principal: ${v(s.viernes.aprendizaje, "LO QUE MÁS APRENDÍ")}.
Mi siguiente paso: ${v(s.viernes.siguientePaso, "PRÓXIMO PASO")}.

Separá explícitamente "probado en mi cuenta", "probado en demo del facilitador", "planificado" y "no disponible". No inventes resultados ni credenciales.`;
    },
  },
];
