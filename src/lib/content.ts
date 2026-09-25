import type {
  Channel,
  Collaborator,
  ConductRuleSet,
  FaqItem,
  InstitutionalCopy,
  Pillar,
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
export const contactWhatsAppUrl = "https://wa.me/5491162793009";

export const joinNote =
  "Unite al grupo de WhatsApp para ser parte de la comunidad.";

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
      "Siguiendo a @formosa.dev en Instagram y a la comunidad en LinkedIn. Ahí se anuncian los eventos con la debida anticipación.",
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
    url: "https://instagram.com/formosa.dev",
    state: "confirmed",
    note: "@formosa.dev",
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
