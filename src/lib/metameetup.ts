// Content model for the Meta Meetup interactive companion (/metameetup).
// Copy: es-AR, registro neutro con voseo. Source docs:
// - "Guía del participante y de su agente de IA" (v1.0)
// - "Documento Maestro Operativo del Workshop" (v1.0, partes públicas)

export const MEETUP = {
  slug: "metameetup",
  name: "Meta Meetup",
  title: "Meta Meetup — Workshop de construcción asistida con IA",
  dateLabel: "Viernes 30 de octubre de 2026",
  timeLabel: "17:00 a 21:00",
  venueLabel: "Diario El Comercial — Hipólito Yrigoyen 58, Formosa Capital",
  lumaUrl: "https://luma.com/k5a27ahf",
  repoUrl: "https://github.com/Formosa-Dev/CRM-inteligente",
  repoDocsBase: "https://github.com/Formosa-Dev/CRM-inteligente/blob/main",
  guidePdfUrl: "/assets/meta-meetup/meta-meetup-2026-guia-participantes.pdf",
  idea:
    "Vamos a tomar una base de software open source que ya tiene CRM, bandeja de conversaciones, leads, catálogo y herramientas de IA. Vas a crear tu fork, aprender a desplegarla en Render + Neon y adaptarla al caso de una empresa o proyecto.",
  promise:
    "No tenés que construir todo desde cero ni llegar sabiendo programar. Tu objetivo se adapta a lo que ya sabés, a las herramientas que tengas y a qué te gustaría resolver.",
} as const;

export const LEARNINGS = [
  "Qué sucede desde que un cliente manda un mensaje hasta que el CRM registra la conversación y un agente responde o deriva a un humano.",
  "Cómo funciona un fork en GitHub y cómo abrir el código con tu asistente de programación.",
  "Cómo se conectan Render (donde corre la app), Neon (base PostgreSQL), el proveedor de IA y los proveedores de mensajería.",
  "Cómo aprovechar configuración que ya existe en el panel antes de escribir código.",
  "Cómo hacer un cambio pequeño, probarlo, explicarlo y mostrar el resultado.",
  "Qué permisos de Meta y de cada proveedor son necesarios para activar canales reales.",
] as const;

export const NO_PROMISES = [
  "Que todas las personas salgan con WhatsApp, Instagram y Facebook reales conectados: las aprobaciones dependen de cada cuenta.",
  "Que todos los recursos de Render sean gratis. El Blueprint propone servicios que pueden generar costos; para el workshop el plan a demanda es excelente para las primeras pruebas.",
  "Que la aplicación sirva para cualquier rubro sin adaptarla: nació de un comercio gastronómico y parte del catálogo, pedidos y prompts sigue en ese dominio.",
] as const;

/* ---------------------------------------------------------------------------
   Steps — the wizard timeline
--------------------------------------------------------------------------- */

export type StepId =
  | "inicio"
  | "caso"
  | "entorno"
  | "sistema"
  | "canal"
  | "viernes"
  | "prompts"
  | "estado";

export interface StepDef {
  id: StepId;
  short: string;
  title: string;
  purpose: string;
}

export const STEPS: StepDef[] = [
  {
    id: "inicio",
    short: "Inicio",
    title: "Empezá acá",
    purpose:
      "Qué es el Meta Meetup, qué vas a construir y cómo usar esta página con tu agente de IA.",
  },
  {
    id: "caso",
    short: "Tu caso",
    title: "El caso que vas a traer",
    purpose:
      "Una sola necesidad concreta. Lo que escribas acá alimenta los prompts del final.",
  },
  {
    id: "entorno",
    short: "Tu entorno",
    title: "Tu equipo y tus cuentas",
    purpose:
      "Checklist previo al taller: herramientas, cuentas y tu nivel. Saber qué te falta ya es avance.",
  },
  {
    id: "sistema",
    short: "El sistema",
    title: "Cómo viaja un mensaje",
    purpose:
      "El recorrido real de un mensaje de cliente hasta la respuesta: canal, proveedor, webhook, CRM y agente.",
  },
  {
    id: "canal",
    short: "Tu canal",
    title: "Canal y proveedor",
    purpose:
      "WhatsApp, Instagram, Facebook o demo. Un árbol de decisión para elegir tu ruta sin adivinar.",
  },
  {
    id: "viernes",
    short: "El viernes",
    title: "Agenda y checkpoints",
    purpose:
      "El mapa del viernes 30: qué pasa en cada bloque y cómo marcar tu avance con el semáforo.",
  },
  {
    id: "prompts",
    short: "Prompts",
    title: "Prompts para tu agente",
    purpose:
      "Textos listos para copiar y pegar. Se completan solos con lo que cargaste en los pasos anteriores.",
  },
  {
    id: "estado",
    short: "Tu estado",
    title: "Resumen y salida",
    purpose:
      "Tu tablero final: qué tenés listo, qué está pendiente y con qué seguir después del evento.",
  },
];

/* ---------------------------------------------------------------------------
   Paso 1 — Ficha del caso de uso
--------------------------------------------------------------------------- */

export interface CasoFieldDef {
  key:
    | "negocio"
    | "ofrece"
    | "quienEscribe"
    | "mensajeEjemplo"
    | "datoFaltante"
    | "respuestaEsperada"
    | "handoff"
    | "criterioExito"
    | "noPrometer";
  label: string;
  hint: string;
  placeholder: string;
  multiline?: boolean;
}

export const CASO_FIELDS: CasoFieldDef[] = [
  {
    key: "negocio",
    label: "Mi negocio o proyecto (puede ser ficticio)",
    hint: "No necesitás tener una empresa: un caso inventado también sirve.",
    placeholder: "Ej.: Distribuidora de cosméticos del barrio",
  },
  {
    key: "ofrece",
    label: "Qué vende u ofrece",
    hint: "Productos, servicios o ambos.",
    placeholder: "Ej.: Catálogo mayorista de perfumería y cuidado personal",
  },
  {
    key: "quienEscribe",
    label: "Quién escribe (describí al cliente)",
    hint: "El perfil de la persona que manda el primer mensaje.",
    placeholder: "Ej.: Revendedoras que preguntan precios por WhatsApp",
  },
  {
    key: "mensajeEjemplo",
    label: "Mensaje de entrada de ejemplo",
    hint: "Un mensaje realista, tal como lo escribiría tu cliente.",
    placeholder: "Ej.: Hola, ¿tienen lista de precios para revendedoras?",
  },
  {
    key: "datoFaltante",
    label: "Qué dato le falta al negocio para ayudar al cliente",
    hint: "La información que hoy se pierde o hay que buscar a mano.",
    placeholder: "Ej.: Saber si ya compró antes y qué categoría le interesa",
  },
  {
    key: "respuestaEsperada",
    label: "Qué respuesta o acción espero",
    hint: "Qué debería hacer el sistema con ese mensaje.",
    placeholder: "Ej.: Responder con el catálogo y registrar la consulta como lead",
  },
  {
    key: "handoff",
    label: "Cuándo debe intervenir un humano",
    hint: "El límite del agente: qué no decide solo.",
    placeholder: "Ej.: Cuando piden precio final o condiciones de pago",
  },
  {
    key: "criterioExito",
    label: "Cómo sabría que funciona",
    hint: "La señal observable de que el caso está resuelto.",
    placeholder: "Ej.: La consulta queda en la bandeja con etiqueta y respuesta correcta",
  },
  {
    key: "noPrometer",
    label: "Qué NO puede inventar o prometer la IA",
    hint: "Los límites explícitos: precios, stock, reservas, fechas.",
    placeholder: "Ej.: Stock exacto, precios finales, promociones no vigentes",
    multiline: true,
  },
];

export const CASO_CANAL_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "demo", label: "Demo (sin canal real)" },
] as const;

export const CASO_IDEAS = [
  {
    title: "Textil",
    detail:
      "Consulta por producto, talle, color o disponibilidad; derivación cuando no haya stock confirmado.",
  },
  {
    title: "Cosmética / distribuidora",
    detail:
      "Catálogo mayorista, precios desde datos oficiales, seguimiento de oportunidad.",
  },
  {
    title: "Fabricación / servicios a medida",
    detail:
      "Ingreso de solicitud de presupuesto con medidas y foto opcional; cotización real a cargo de una persona.",
  },
  {
    title: "Agencia / servicios de software",
    detail: "Captación de lead, pregunta de calificación y llamada posterior.",
  },
  {
    title: "Atención administrativa",
    detail: "Categoría de solicitud, resumen del problema y handoff.",
  },
  {
    title: "Portfolio",
    detail: "Demo pública con un cambio simple y bien documentado.",
  },
] as const;

/* ---------------------------------------------------------------------------
   Paso 2 — Checklist de entorno
--------------------------------------------------------------------------- */

export const NIVEL_OPTIONS = [
  { value: "sin", label: "Sin experiencia todavía" },
  { value: "inicial", label: "Inicial" },
  { value: "basico", label: "Básico" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
] as const;

export const OS_OPTIONS = [
  { value: "windows", label: "Windows" },
  { value: "macos", label: "macOS" },
  { value: "linux", label: "Linux" },
  { value: "otro", label: "Otro" },
] as const;

export const RENDER_PLAN_OPTIONS = [
  { value: "si", label: "Cuenta lista, puedo activar servicios" },
  { value: "sin-pagos", label: "Tengo cuenta pero sin recursos pagos" },
  { value: "demo", label: "Prefiero seguir la demo" },
] as const;

export const MODELO_OPTIONS = [
  { value: "si", label: "Tengo API key o saldo propio" },
  { value: "todavia-no", label: "Todavía no" },
  { value: "demo", label: "Uso la demo del facilitador" },
] as const;

export const META_OPTIONS = [
  { value: "tengo-permisos", label: "Tengo permisos / accesos" },
  { value: "pendientes", label: "Permisos pendientes" },
  { value: "no-aplica", label: "No aplica a mi caso" },
] as const;

export const AGENTE_SUGGESTIONS = [
  "Codex",
  "Claude Code",
  "Cursor",
  "OpenCode",
  "Devin",
  "ChatGPT (sin editor)",
  "Otro / todavía no elegí",
] as const;

/* ---------------------------------------------------------------------------
   Paso 3 — El sistema: simulador del viaje de un mensaje
--------------------------------------------------------------------------- */

export interface FlowNode {
  id: string;
  name: string;
  icon: "user" | "channel" | "provider" | "webhook" | "crm" | "agent";
  narration: string;
  explain: string;
}

export const FLOW_NODES: FlowNode[] = [
  {
    id: "cliente",
    name: "Cliente",
    icon: "user",
    narration: "Una persona escribe al negocio desde su app de mensajería.",
    explain:
      "Todo arranca con un mensaje real: una consulta, un pedido, una duda. En el workshop usamos mensajes ficticios de laboratorio, nunca datos privados de clientes.",
  },
  {
    id: "canal",
    name: "Canal",
    icon: "channel",
    narration: "El mensaje entra por el canal elegido.",
    explain:
      "WhatsApp, Instagram o Facebook. Cada canal tiene sus propias reglas: tipo de cuenta, permisos, ventanas de respuesta y plantillas. No todas las funciones están abiertas para todas las cuentas.",
  },
  {
    id: "proveedor",
    name: "Proveedor (BSP)",
    icon: "provider",
    narration: "El proveedor recibe el evento y lo reenvía de forma segura.",
    explain:
      "YCloud, Zernio o Kapso: servicios que conectan con WhatsApp Business Platform y otros canales. Se encargan del vínculo oficial con Meta y firman cada evento que envían a tu app.",
  },
  {
    id: "webhook",
    name: "Webhook firmado",
    icon: "webhook",
    narration: "El endpoint HTTPS valida la firma y acepta el evento.",
    explain:
      "Tu app expone una URL pública (por ejemplo /api/whatsapp/webhook). Solo acepta eventos cuya firma coincide con el secreto configurado: así se evita que cualquiera inyecte mensajes falsos.",
  },
  {
    id: "crm",
    name: "Bandeja + Neon",
    icon: "crm",
    narration: "La conversación se crea o actualiza y queda registrada.",
    explain:
      "El CRM guarda contacto, conversación y contexto en Neon (PostgreSQL). Desde /admin/conversations el equipo ve la bandeja completa y puede intervenir.",
  },
  {
    id: "agente",
    name: "Agente comercial",
    icon: "agent",
    narration: "El agente decide: responde con datos del negocio o deriva.",
    explain:
      "Usa la configuración del negocio (identidad, horarios, FAQ, límites) y herramientas internas. Si el caso supera sus reglas, hace handoff: pausa la respuesta automática y avisa a un humano.",
  },
];

export const FLOW_OUTCOMES = [
  {
    id: "respuesta",
    name: "Respuesta automática",
    detail:
      "El agente contesta con información real de la configuración: servicios, horarios, catálogo. El viaje completo se puede verificar en la bandeja.",
  },
  {
    id: "handoff",
    name: "Handoff a humano",
    detail:
      "Cuando la consulta pide precio final, stock confirmado o algo fuera de las reglas, el agente frena y un operador toma la conversación.",
  },
] as const;

export const TWO_AGENTS = {
  programacion: {
    name: "Agente de programación",
    role: "Te ayuda a vos a entender y modificar el código de tu fork.",
    points: [
      "Corre en tu computadora (Codex, Claude Code, Cursor, OpenCode…).",
      "Lee el repo, propone un plan, espera tu aprobación y edita archivos.",
      "Nunca debe ver tus claves ni tus .env.",
    ],
  },
  comercial: {
    name: "Agente comercial",
    role: "Responde a los clientes del negocio dentro del CRM.",
    points: [
      "Corre en el servidor (tu deploy de Render).",
      "Usa la configuración de /admin/agent: identidad, horarios, FAQ, límites.",
      "Deriva a un humano cuando la consulta supera sus reglas.",
    ],
  },
} as const;

export const NEON_LINKS = {
  title: "DIRECTA vs POOLED: las dos URLs de Neon",
  directa: {
    name: "Directa (sin “-pooler”)",
    detail:
      "Se usa una sola vez, para migrar el esquema con npm run db:migrate desde tu terminal. No va en Render ni se comparte.",
  },
  pooled: {
    name: "Pooled (host con “-pooler”)",
    detail:
      "Es la DATABASE_URL que la app usa en producción: el web service de Render la guarda como variable privada.",
  },
} as const;

export const GLOSSARY = [
  { term: "Fork", def: "Copia del repositorio de código bajo tu cuenta de GitHub." },
  { term: "Clone", def: "Descarga local de ese código en una carpeta de tu computadora." },
  { term: "Commit", def: "Registro versionado de cambios en tu repositorio." },
  { term: "Deploy", def: "Publicar la app para que esté disponible en un servidor." },
  { term: "Render", def: "Plataforma que ejecuta el sitio y los servicios del proyecto." },
  { term: "Neon", def: "Plataforma PostgreSQL que la aplicación usa como base de datos." },
  { term: "Env / secret", def: "Configuración privada (API key, URL con contraseña). Nunca se publica ni se comparte." },
  { term: "Webhook", def: "Endpoint que recibe eventos enviados por una plataforma externa." },
  { term: "BSP / proveedor", def: "Servicio que conecta con WhatsApp Business Platform u otros canales." },
  { term: "Lead", def: "Persona que consultó y podría convertirse en cliente." },
  { term: "Handoff", def: "Transferencia del agente automático a un operador humano." },
  { term: "Checkpoint", def: "Paso del taller con una prueba simple que indica si avanzaste." },
] as const;

/* ---------------------------------------------------------------------------
   Paso 4 — Canal y proveedor
--------------------------------------------------------------------------- */

export type ProviderId = "ycloud" | "zernio" | "kapso" | "demo";

export interface ProviderDef {
  id: ProviderId;
  name: string;
  channels: string;
  when: string;
  notes: string[];
  webhook?: string;
}

export const PROVIDERS: ProviderDef[] = [
  {
    id: "ycloud",
    name: "YCloud",
    channels: "WhatsApp",
    when: "Ruta ya usada en el proyecto original. Útil si ya lo tenés habilitado; el registro pide mail profesional/empresarial.",
    notes: [
      "Configurar API key, número del bot y webhook secret en el proveedor y en el CRM (privado).",
      "La firma del mensaje entrante debe validar contra el secreto configurado.",
      "Prueba: un mensaje desde un número autorizado aparece en la bandeja y se puede responder.",
    ],
    webhook: "https://TU-SERVICIO.onrender.com/api/whatsapp/webhook",
  },
  {
    id: "zernio",
    name: "Zernio",
    channels: "WhatsApp / Instagram / Facebook",
    when: "La opción más sencilla para el workshop: 2 conexiones gratis por cuenta y no exige mail empresarial. Recomendada si querés redes además de WhatsApp.",
    notes: [
      "Conectar el perfil/página o número elegible con los permisos que pida el proveedor.",
      "Vincular la cuenta en /admin/channels y validar que proveedor y canal sean correctos.",
      "La aprobación de Meta puede impedir la prueba real: eso no invalida el resto del workshop.",
    ],
    webhook: "https://TU-SERVICIO.onrender.com/api/webhooks/ingress/zernio",
  },
  {
    id: "kapso",
    name: "Kapso",
    channels: "WhatsApp",
    when: "Alternativa para WhatsApp con onboarding propio; requiere cuenta y número elegible. También da número de prueba.",
    notes: [
      "Vincular proveedor y cuenta en /admin/channels con variables privadas.",
      "Registrar el webhook específico del número con su secret.",
      "No conectar el mismo número a dos proveedores a la vez.",
    ],
    webhook: "https://TU-SERVICIO.onrender.com/api/webhooks/ingress/kapso",
  },
  {
    id: "demo",
    name: "Ruta demo / sandbox",
    channels: "Sin canal real",
    when: "Sin accesos, WABA, número de prueba ni aprobación todavía. Aprendés la arquitectura completa y dejás el bloqueo documentado.",
    notes: [
      "Zernio y Kapso ofrecen número de WhatsApp de prueba al registrarte.",
      "Seguís la instancia central del facilitador con mensajes ficticios.",
      "Es un resultado válido: salís sabiendo exactamente qué falta para conectar.",
    ],
  },
];

/** Árbol de decisión — preguntas en orden. Cada respuesta alimenta `resolveProviderPath`. */
export interface TreeAnswers {
  canalDeseado: "" | "whatsapp" | "ig-fb" | "ninguno";
  tieneProveedor: "" | "ycloud" | "kapso" | "ninguno";
  activosMeta: "" | "si" | "no" | "no-se";
}

export const TREE_QUESTIONS = {
  canalDeseado: {
    question: "¿Qué canal querés probar?",
    options: [
      { value: "whatsapp", label: "Solo WhatsApp" },
      { value: "ig-fb", label: "Instagram y/o Facebook" },
      { value: "ninguno", label: "Ninguno todavía / voy con demo" },
    ],
  },
  tieneProveedor: {
    question: "¿Ya tenés un proveedor habilitado?",
    options: [
      { value: "ycloud", label: "Sí, YCloud" },
      { value: "kapso", label: "Sí, Kapso" },
      { value: "ninguno", label: "Ninguno / no sé" },
    ],
  },
  activosMeta: {
    question: "¿Tenés activos Meta elegibles (página, cuenta profesional, permisos)?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
      { value: "no-se", label: "No estoy segura/o" },
    ],
  },
} as const;

export const PROVIDER_REASONS: Record<ProviderId, string> = {
  ycloud: "Ya tenés YCloud habilitado para WhatsApp: es la ruta más directa para tu caso.",
  kapso: "Ya tenés Kapso preparado para WhatsApp: usamos esa ruta de laboratorio.",
  zernio:
    "Es la opción más sencilla para el workshop: gratis para empezar, sin mail empresarial, y cubre WhatsApp, Instagram y Facebook según permisos.",
  demo: "Sin accesos ni aprobaciones todavía: la ruta demo te deja aprender toda la arquitectura con mensajes ficticios y el bloqueo bien documentado.",
};

/* ---------------------------------------------------------------------------
   Paso 5 — El viernes: agenda y checkpoints
--------------------------------------------------------------------------- */

export const AGENDA = [
  { time: "17:00–17:15", title: "Bienvenida, objetivos y mesas", checkpoint: false },
  { time: "17:15–17:35", title: "Arquitectura Meta: APIs, proveedores, webhooks, CRM y agente", checkpoint: false },
  { time: "17:35–17:50", title: "Demo de una conversación de punta a punta", checkpoint: false },
  { time: "17:50–18:15", title: "Fork y trabajo local con agente de programación", checkpoint: true },
  { time: "18:15–18:45", title: "Neon, migración, Render, health y acceso admin", checkpoint: true },
  { time: "18:45–19:00", title: "Pausa, merienda y mesa de soporte", checkpoint: false },
  { time: "19:00–19:35", title: "Proveedores de canales y pruebas autorizadas / ruta demo", checkpoint: true },
  { time: "19:35–20:20", title: "Adaptar el negocio y construir un cambio pequeño con IA", checkpoint: true },
  { time: "20:20–20:45", title: "Microdemos y aprendizajes", checkpoint: false },
  { time: "20:45–21:00", title: "Cierre, recursos y próximos pasos", checkpoint: false },
] as const;

export type CheckpointId = "fork" | "deploy" | "mensajeria" | "mejora";

export interface CheckpointDef {
  id: CheckpointId;
  time: string;
  title: string;
  goal: string;
  steps: string[];
  result: string[];
}

export const CHECKPOINTS: CheckpointDef[] = [
  {
    id: "fork",
    time: "17:50–18:15",
    title: "Fork, clon y reconocimiento",
    goal: "Tener TU copia del repositorio y que tu agente de IA entienda qué hay antes de sugerir cambios.",
    steps: [
      "Abrí github.com/Formosa-Dev/CRM-inteligente y creá tu fork.",
      "Cloná tu fork: git clone https://github.com/TU-USUARIO/CRM-inteligente.git",
      "Entrá a la carpeta y ejecutá npm ci.",
      "Abrí el proyecto en tu editor y pedile a tu agente que lea README.md y docs/socialcrm/ (sin tocar .env).",
    ],
    result: [
      "Mi fork aparece en mi cuenta de GitHub.",
      "git remote -v muestra la URL de MI fork.",
      "npm ci terminó sin errores.",
      "Mi IA explica dónde está el agente vendedor y dónde /admin/agent.",
    ],
  },
  {
    id: "deploy",
    time: "18:15–18:45",
    title: "Neon + Render",
    goal: "Base de datos de laboratorio migrada y app desplegada (o ruta demo documentada).",
    steps: [
      "Creá un proyecto Neon NUEVO (región cercana al deploy) y anotá las URLs DIRECTA y POOLED.",
      "Migrá el esquema con npm run db:migrate usando la DIRECTA en tu terminal privada.",
      "En Render: New → Blueprint → tu fork. Revisá render.yaml antes de aprobar (web + disco + 3 crons pueden generar costos).",
      "Variables: DATABASE_URL (pooled), AUTH_SECRET, AUTH_URL y NEXT_PUBLIC_APP_URL con tu URL real.",
      "Verificá https://TU-SERVICIO.onrender.com/api/health y creá el primer admin (/setup o db:seed).",
    ],
    result: [
      "Tengo una Neon de laboratorio y distingo DIRECTA de POOLED.",
      "La migración reportó éxito.",
      "Entiendo qué servicios y costos genera mi Blueprint.",
      "/api/health responde saludable y entré a /login.",
    ],
  },
  {
    id: "mensajeria",
    time: "19:00–19:35",
    title: "Canales de mensajería",
    goal: "Proveedor seleccionado, webhook de laboratorio validado si tu cuenta lo permite — o demo con bloqueo anotado.",
    steps: [
      "Confirmá titularidad o autorización del activo que vas a conectar.",
      "Configurá credenciales EN PRIVADO en el proveedor y la URL HTTPS del webhook.",
      "Vinculá la cuenta en /admin/channels con el canal y proveedor correctos.",
      "Enviá un mensaje de prueba y verificá recepción en /admin/conversations.",
      "Revisá respuesta saliente, firma de webhooks y derivación a humano.",
    ],
    result: [
      "Conozco el canal y proveedor que quiero explorar.",
      "Comprendo qué permisos me faltan (si faltan).",
      "Vi un mensaje entrar en la bandeja (propio o en demo).",
      "Tengo el bloqueo anotado si no se pudo conectar.",
    ],
  },
  {
    id: "mejora",
    time: "19:35–20:20",
    title: "Adaptar o construir una mejora",
    goal: "Un cambio visible y comprobable: configuración, UI, FAQ, copy o un filtro simple. No reescribir la app.",
    steps: [
      "Describí tu caso con la ficha del paso 1.",
      "Pedile a tu agente que lea el repo y docs/socialcrm/transform-repo.md.",
      "Preguntá: ¿esto ya se resuelve configurando /admin/agent o necesita código?",
      "Elegí el primer cambio mínimo del plan (máximo tres) y aprobá archivos y prueba.",
      "Ejecutá npm run typecheck, revisá git diff y commiteá en tu fork.",
    ],
    result: [
      "Escribí mi criterio de aceptación.",
      "Mi IA inspeccionó el repo antes de proponer.",
      "Aprobé un plan pequeño y se implementó un cambio mínimo.",
      "Puedo mostrar un antes/después o explicar qué falta.",
    ],
  },
];

export const SEMAFORO = [
  { id: "verde", label: "Verde", def: "Hecho y verificado." },
  { id: "amarillo", label: "Amarillo", def: "Parcial, o depende de un paso conocido." },
  { id: "rojo", label: "Rojo", def: "Bloqueado: necesito ayuda o ruta demo." },
  { id: "na", label: "No aplica", def: "Ese canal/recurso no es necesario para mi caso." },
] as const;

export const RUTAS = [
  {
    id: "A",
    name: "Builder autónomo",
    detail:
      "Intermedio/avanzado: instalación casi independiente, revisás logs, pruebas y una mejora funcional.",
  },
  {
    id: "B",
    name: "Builder guiado",
    detail:
      "Básico o inicial: misma secuencia con facilitador, checklist y agente de código.",
  },
  {
    id: "C",
    name: "Negocio / primera experiencia",
    detail:
      "En pareja o con la demo central: definís problema comercial, FAQ, contexto y reglas sin que la terminal sea una barrera.",
  },
  {
    id: "D",
    name: "Conexión de canal real",
    detail:
      "Subruta transversal: solo si tenés cuenta/proveedor compatible y autorización. Los demás usan laboratorio/sandbox.",
  },
] as const;

/* ---------------------------------------------------------------------------
   Paso 6/7 — Problemas frecuentes y recursos
--------------------------------------------------------------------------- */

export const TROUBLESHOOTING = [
  {
    q: "No puedo usar Git o Node",
    a: "Copiá solo el texto del error (sin passwords ni rutas personales) y pedile a tu IA que compruebe versión, PATH, instalación y permisos. Si no se resuelve en minutos, ruta guiada o demo.",
  },
  {
    q: "No puedo hacer fork o clonar",
    a: "Confirmá sesión de GitHub, nombre exacto del repo y acceso de red. Si ya hay un directorio igual, no lo sobreescribas.",
  },
  {
    q: "Neon no conecta / la migración falla",
    a: "Verificá que sea una base Neon nueva, que la variable sea la DIRECTA y que corriste npm run db:migrate desde el proyecto correcto. El servidor usa la POOLED. Nada de db:push ni SQL a mano.",
  },
  {
    q: "Render falla en health",
    a: "Revisá migración, nombre real del servicio, DATABASE_URL POOLED, logs y redeploy. La app puede intentar iniciar antes de que existan las tablas.",
  },
  {
    q: "No puedo crear el admin",
    a: "El código tiene dos caminos (/setup y db:seed) pero no son intercambiables sin prueba. El facilitador confirma cuál funciona en la revisión del workshop.",
  },
  {
    q: "No puedo pagar el deploy",
    a: "No tenés que pagar para aprender: mirá el deploy del facilitador, revisá la arquitectura y trabajá sobre tu fork con asistencia.",
  },
  {
    q: "El agente no responde o inventa",
    a: "Revisá modelo, API key, crédito y configuración de prompt. Si habla de gastronomía en una empresa textil, anotá de dónde sale esa instrucción y probá un cambio acotado.",
  },
  {
    q: "El mensaje no entra por el webhook",
    a: "Comprobá proveedor, canal, permiso, endpoint, HTTPS, firma y cuenta. No desactives la verificación por comodidad; si Meta no autorizó el activo, no es un fallo del repo.",
  },
] as const;

export const SAFETY_RULES = [
  "Nunca compartas contraseñas, códigos 2FA, tokens, API keys ni el DATABASE_URL — ni con la organización, ni en el chat, ni con tu IA.",
  "No migres tu número personal o comercial en vivo durante el meetup.",
  "Usá datos ficticios para demos: nunca mensajes privados ni cuentas de clientes reales.",
  "Una captura de “configuración OK” no prueba una conversación de punta a punta: distinguí configurar, desplegar y funcionar.",
] as const;

export const RESOURCES = [
  { label: "Evento en Luma", url: MEETUP.lumaUrl },
  { label: "Repositorio CRM-inteligente", url: MEETUP.repoUrl },
  { label: "Onboarding del implementador", url: `${MEETUP.repoDocsBase}/docs/socialcrm/implementer-onboarding.md` },
  { label: "Instalación Render + Neon", url: `${MEETUP.repoDocsBase}/docs/socialcrm/install-render-neon.md` },
  { label: "Guía para agentes de código", url: `${MEETUP.repoDocsBase}/docs/socialcrm/ai-agent-implementation-guide.md` },
  { label: "Mapa de adaptación por rubro", url: `${MEETUP.repoDocsBase}/docs/socialcrm/transform-repo.md` },
  { label: "Git", url: "https://git-scm.com/" },
  { label: "Node.js", url: "https://nodejs.org/" },
  { label: "Neon", url: "https://neon.tech/" },
  { label: "Render", url: "https://render.com/" },
] as const;
