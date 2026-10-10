import type {
  Channel,
  Collaborator,
  ConductRuleSet,
  FaqItem,
  InstitutionalCopy,
  PastEvent,
  Pillar,
  UpcomingEvent,
} from "./types";

// Single source of truth for institutional copy. Head metadata, footer, FAQ and
// any institutional statement MUST read from here — never duplicate the legal
// status string across components.

export const institutional: InstitutionalCopy = {
  name: "Formosa.dev",
  domain: "formosa.dev",
  email: "hola@formosa.dev",
  descriptor: "Comunidad tecnológica de Formosa",
  ideaMadre: "Gente de acá construyendo también el futuro.",
  sintesis: "Aprender. Conectar. Construir.",
  inclusion: "No tenés que ser developer para entrar.",
  valueProposition:
    "Conectamos personas, conocimiento y proyectos para que más talento pueda aprender, construir y acceder a oportunidades desde Formosa.",
  heroSubcopy:
    "Formosa.dev es la comunidad tecnológica de Formosa. Un punto de encuentro para aprender, conocer gente, construir proyectos reales y abrir oportunidades desde acá.",
  statusFormula:
    "Formosa.dev es una comunidad tecnológica e iniciativa sin fines de lucro de Formosa, en proceso de institucionalización hacia una futura Fundación Formosa.dev.",
  joinUrl: "https://chat.whatsapp.com/L3PqNeGLdut7QBGPVifdnC",
  joinUrlLabel: "Unite a la comunidad de WhatsApp",
};

export const communityWhatsAppUrl = institutional.joinUrl;
export const communityTelegramUrl = "https://t.me/+SVRF2loStn_ovjiS";
export const xProfileUrl = "https://x.com/formosadev";
export const contactWhatsAppUrl = "https://wa.me/5491162793009";

export const joinNote =
  "Unite al grupo de WhatsApp para ser parte de la comunidad.";

// Confirmed upcoming event. Every detail here is verified on its public Luma
// registration page (title, venue, note). Leave `upcomingEvent` undefined when
// there is no confirmed event so the section falls back to an honest empty
// state instead of showing stale data.
export const upcomingEvent: UpcomingEvent | undefined = undefined;

// Past events with their media recap, newest first — the section renders a
// switcher strip when there is more than one. Photos/videos live in
// public/assets/eventos/<slug>/ as web-optimized files (webp, h264 mp4); to
// add an event, drop its assets there and prepend an entry to this array.
export const pastEvents: PastEvent[] = [
  {
    id: "road-to-colosseum-formosa-2026",
    descriptor: "Road to Colosseum · Superteam Argentina",
    title: "Superteam Argentina Hackathon | Road to Colosseum X Formosa",
    date: "Sábado 3 de octubre de 2026",
    location: "Pepe Club — 9 de Julio 629, Formosa Capital",
    description:
      "La primera jornada presencial co-organizada por Formosa.dev: equipos trabajando en sus proyectos para el track argentino de Colosseum, la hackathon global de Solana.",
    url: "https://luma.com/usz4536h",
    venue: {
      name: "Pepe Club",
      address: "9 de Julio 629, Formosa Capital",
      logoSrc: "/assets/colaboradores/pepe-guapo.webp",
      logoAlt: "Logo de Pepe Club",
      url: "https://pepe-club.com/",
    },
    media: [
      {
        kind: "video",
        poster: "/assets/eventos/road-to-colosseum/colosseum-recap-poster.webp",
        title: "Video recap de la jornada",
        sources: [
          {
            src: "/assets/eventos/road-to-colosseum/colosseum-recap-720.mp4",
            media: "(max-width: 640px)",
          },
          { src: "/assets/eventos/road-to-colosseum/colosseum-recap-1080.mp4" },
        ],
        width: 1080,
        height: 1920,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-05.webp",
        alt: "Organizadores junto al banner de Superteam Argentina en Pepe Club",
        width: 960,
        height: 1280,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-02.webp",
        alt: "Participantes trabajando en sus laptops durante la jornada",
        width: 828,
        height: 796,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-01.webp",
        alt: "Pantalla de la hackathon global de Superteam Argentina y Colosseum junto a stickers de Formosa.dev",
        width: 1280,
        height: 732,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-07.webp",
        alt: "Equipos desarrollando sus proyectos durante la hackathon",
        width: 960,
        height: 1280,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-08.webp",
        alt: "Participante trabajando junto al banner de Superteam Argentina",
        width: 960,
        height: 1280,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-06.webp",
        alt: "Estación de trabajo con la pantalla del evento mostrando 'A construir'",
        width: 960,
        height: 1280,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-03.webp",
        alt: "Momento de la comida durante la jornada",
        width: 828,
        height: 1145,
      },
      {
        kind: "image",
        src: "/assets/eventos/road-to-colosseum/colosseum-04.webp",
        alt: "Pizzas y empanadas para los equipos participantes",
        width: 828,
        height: 660,
      },
    ],
  },
];

export const pillars: Pillar[] = [
  {
    title: "Contenido técnico",
    description:
      "Conocimiento compartido: artículos, tutoriales, dudas y recursos útiles.",
  },
  {
    title: "Eventos presenciales",
    description:
      "Meetups, charlas y jornadas para encontrarse cara a cara en Formosa.",
  },
  {
    title: "Oportunidades laborales",
    description:
      "Búsquedas y proyectos para quienes quieren dar el siguiente paso.",
  },
  {
    title: "Mentoría y crecimiento",
    description:
      "Acompañamiento entre pares para crecer profesionalmente.",
  },
  {
    title: "Proyectos colaborativos",
    description:
      "Construcción en equipo y open source, de Formosa para afuera.",
  },
  {
    title: "Conexión con el ecosistema",
    description:
      "Puentes con comunidades y empresas del resto del país.",
  },
  {
    title: "Cultura y pertenencia",
    description:
      "Un espacio propio, con la identidad y la energía de acá.",
  },
];

// FAQ minimal set, distilled from the public FAQ. Founder/spokesperson
// attribution is intentionally omitted until the coverage audit resolves
// conflicting sources.
export const faq: FaqItem[] = [
  {
    question: "¿Tengo que saber programar para sumarme?",
    answer:
      "No. La comunidad está abierta a cualquier persona interesada en tecnología, desde quienes dan sus primeros pasos hasta perfiles con años de experiencia. Los únicos requisitos son interés genuino y respeto por las normas de convivencia.",
  },
  {
    question: "¿Cuesta participar?",
    answer:
      "No, es completamente gratis. No hay membresías pagas ni costos ocultos. Los eventos presenciales también son gratuitos, con registro previo por una cuestión de capacidad.",
  },
  {
    question: "¿Dónde se hacen los encuentros?",
    answer:
      "En Formosa Capital. Los lugares van a variar: espacios de coworking, aulas de universidades, salones de empresas y espacios públicos con buena conectividad. El lugar se informa en la publicación de cada evento.",
  },
  {
    question: "¿Cómo me entero del próximo evento?",
    answer:
      "Siguiendo a @formosa.dev.ar en Instagram y a la comunidad en LinkedIn. Ahí se anuncian los eventos con la debida anticipación.",
  },
  {
    question: "¿Puedo proponer una charla, un proyecto o un evento?",
    answer:
      "Sí. Se pueden proponer charlas técnicas, lightning talks, workshops y demos, además de proyectos para mostrar. El equipo organizador acompaña con fechas, duración y formato.",
  },
  {
    question: "¿Cómo puedo ser Centinela?",
    answer:
      "La red de Centinelas, referentes locales en otras localidades de la provincia, está en construcción. Cuando esté lista va a haber una forma concreta de postularte. Mientras tanto, podés sumarte a la comunidad y contarnos de dónde sos.",
  },
  {
    question: "¿Mi empresa o mi local puede colaborar?",
    answer:
      "Sí. Las empresas pueden sponsorear eventos o la comunidad, y los locales (cafés, bares, universidades, coworks) pueden ser sede de encuentros. La lógica es colaboración, no un pedido de favor.",
  },
  {
    question: "¿Formosa.dev es una empresa?",
    answer:
      "No. Es una comunidad tecnológica y una iniciativa sin fines de lucro, sostenida por voluntarios y aliados institucionales.",
  },
  {
    question: "¿Cuál es el estado de la futura Fundación Formosa.dev?",
    answer:
      "Formosa.dev es una comunidad tecnológica e iniciativa sin fines de lucro de Formosa, en proceso de institucionalización hacia una futura Fundación Formosa.dev. Todavía no tiene personería jurídica otorgada.",
  },
];

// Operational conduct rules (the WhatsApp group's own scale). The two source
// scales conflict; this one is published because it is the operational one.
export const conduct: ConductRuleSet = {
  purpose:
    "El grupo de WhatsApp es el canal principal de Formosa.dev: el lugar donde vive el intercambio diario, donde los miembros se ayudan, comparten conocimiento y construyen redes. El objetivo es simple: aprender, compartir y crecer juntos.",
  allowed: [
    "Contenido técnico: artículos, tutoriales, papers, documentación.",
    "Oportunidades laborales: búsquedas, freelance, proyectos.",
    "Proyectos personales: mostrar lo que se está construyendo y pedir feedback.",
    "Consultas técnicas: stack, arquitectura, debugging, herramientas.",
    "Eventos tech: meetups, hackathons, conferencias.",
    "Recursos: cursos, becas y scholarships.",
    "Networking: presentaciones, búsqueda de co-founders y partners.",
  ],
  prohibited: [
    "Spam, cadenas y mensajes masivos no solicitados.",
    "Política partidaria, religión y contenido discriminatorio.",
    "Contenido ofensivo, acoso o bullying de cualquier tipo.",
    "Venta de productos o servicios sin consultar antes con un admin.",
    "Contenido ilegal o que promueva actividades ilegales.",
    "Fake news o desinformación.",
    "Promoción de cripto o NFTs sin validación previa.",
    "Contenido para adultos.",
  ],
  adminRole:
    "Los administradores mantienen el espacio saludable: no son policías, son facilitadores. Dan la bienvenida a nuevos miembros, moderan cuando hace falta, organizan contenido y resuelven conflictos. Cualquier problema se trata por privado con un admin.",
  consequences: [
    { infraction: "Primera falta leve (off-topic, spam leve)", consequence: "Advertencia privada del admin" },
    { infraction: "Segunda falta leve", consequence: "Silencio de 7 días en el grupo" },
    { infraction: "Tercera falta leve", consequence: "Silencio de 30 días" },
    { infraction: "Falta grave (discriminación, acoso, ilegal)", consequence: "Expulsión inmediata sin advertencia" },
    { infraction: "Reincidencia post-expulsión", consequence: "Bloqueo permanente" },
  ],
  shareFormat: `[TEMA] Título descriptivo

Cuerpo: 2-3 líneas con lo esencial.

Link: (opcional)`,
  shareTags: [
    "[CONSULTA]",
    "[OPORTUNIDAD]",
    "[PROYECTO]",
    "[RECURSO]",
    "[EVENTO]",
    "[DEBATE]",
    "[OFFTOPIC]",
  ],
};

// Channels: only verified, owned destinations ship as links. The rest are
// declared but rendered without a link until ownership is confirmed.
export const channels: Channel[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/formosa.dev.ar?stkn=MXZmMmM1OW1oOTd4Mg==",
    state: "confirmed",
    note: "@formosa.dev.ar",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: communityTelegramUrl,
    state: "confirmed",
    note: "Comunidad oficial",
  },
  {
    id: "x",
    name: "X",
    url: xProfileUrl,
    state: "confirmed",
    note: "@formosadev",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    state: "forthcoming",
    note: "Canal declarado, en confirmación.",
  },
  {
    id: "github",
    name: "GitHub",
    state: "forthcoming",
    note: "Canal declarado, en confirmación.",
  },
  {
    id: "youtube",
    name: "YouTube",
    state: "forthcoming",
    note: "Próximamente, en preparación.",
  },
];

// Collaborators: companies, institutions and organizations that support the
// community. To add one, drop its logo in public/assets/colaboradores/ and
// append an entry here (alphabetical order by name). The section renders on a
// clean white background, so prefer dark artwork variants for the logos.
export const collaborators: Collaborator[] = [
  {
    id: "ah-sports",
    name: "AH Sports",
    logoSrc: "/assets/colaboradores/ah-sports.webp",
    logoAlt: "Logo de AH Sports",
    url: "https://www.instagram.com/ahsportsindumentaria/",
    large: true,
  },
  {
    id: "crecimiento",
    name: "Crecimiento",
    logoSrc: "/assets/colaboradores/crecimiento.webp",
    logoAlt: "Logo de Crecimiento",
    url: "https://crecimiento.build/",
  },
  {
    id: "debatech",
    name: "Debatech",
    logoSrc: "/assets/colaboradores/debatech.jpg",
    logoAlt: "Logo de Debatech",
    large: true,
  },
  {
    id: "el-comercial",
    name: "El Comercial",
    logoSrc: "/assets/colaboradores/el-comercial.jpg",
    logoAlt: "Logo de El Comercial",
    url: "https://www.elcomercial.com.ar/",
  },
  {
    id: "fusalabs",
    name: "FusaLabs",
    logoSrc: "/assets/colaboradores/fusalabs.svg",
    logoAlt: "Logo de FusaLabs",
    url: "https://www.fusalabs.com/",
    large: true,
  },
  {
    id: "jujuy-dev",
    name: "Jujuy Dev",
    logoSrc: "/assets/colaboradores/jujuy-dev.webp",
    logoAlt: "Logo de Jujuy Dev",
    url: "https://jujuy.dev.ar/",
    large: true,
  },
  {
    id: "mar-del-plata-dev",
    name: "Mar del Plata Dev",
    logoSrc: "/assets/colaboradores/mar-del-plata-dev.webp",
    logoAlt: "Logo de Mar del Plata Dev",
    url: "https://mardelplata.dev.ar/",
    large: true,
  },
  {
    id: "pepe-guapo",
    name: "Pepe Guapo",
    logoSrc: "/assets/colaboradores/pepe-guapo.webp",
    logoAlt: "Logo de Pepe Guapo",
    url: "https://pepe-club.com/",
    large: true,
  },
  {
    id: "salta-dev",
    name: "SaltaDev",
    logoSrc: "/assets/colaboradores/salta-dev.webp",
    logoAlt: "Logo de SaltaDev",
    url: "https://salta.dev/",
    large: true,
  },
];

// Territorial imagery, sourced from the approved raw territorial set.
export const territorialImages = {
  hero: {
    src: "/assets/hero-formosa-collage.webp",
    alt: "Collage de paisajes, espacios urbanos y encuentros de Formosa",
    width: 1600,
    height: 900,
  },
  banado: {
    src: "/assets/banado.webp",
    alt: "Bañado La Estrella, humedal formoseño con aves y vegetación",
    width: 805,
    height: 601,
  },
  cruzDelNorte: {
    src: "/assets/cruz-del-norte.webp",
    alt: "Cielo nocturno de Formosa con la constelación de la Cruz del Norte",
    width: 1280,
    height: 853,
  },
};
