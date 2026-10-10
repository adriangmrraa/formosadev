// Content model types. Values marked unavailable are represented explicitly so
// the UI can render an honest state instead of an empty string.

export type EvidenceState = "confirmed" | "forthcoming" | "unavailable";

export interface Channel {
  id: string;
  name: string;
  /** Real, verified, owned URL. Absent when ownership is unverified. */
  url?: string;
  state: EvidenceState;
  note?: string;
}

/**
 * A confirmed upcoming event. Every field must be verifiable on the public
 * registration page it links to — never invent dates, speakers or capacity.
 */
export interface UpcomingEvent {
  id: string;
  /** Short eyebrow: program or organizing body. */
  descriptor: string;
  /** Real event title as published on the registration page. */
  title: string;
  /** Short factual description, sourced from the registration page. */
  description: string;
  /** Venue and city, as published. */
  location: string;
  /** Small print shown next to the registration action. */
  note: string;
  /** Canonical public registration page. */
  url: string;
  /** Embeddable registration URL, used as the iframe source. */
  embedUrl: string;
}

/** A photo from a past event, served from public/assets. */
export interface EventImage {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A video recap from a past event. Sources are declared once and selected by the browser via media queries (mobile gets the smaller file). */
export interface EventVideo {
  kind: "video";
  /** Frame shown in the gallery and before playback starts. */
  poster: string;
  /** Accessible description of the video content. */
  title: string;
  sources: { src: string; media?: string }[];
  width: number;
  height: number;
}

export type EventMedia = EventImage | EventVideo;

/**
 * The venue that hosted a past event: name, address, logo and its public
 * site. Rendered as a compact location line (never a nested card).
 */
export interface EventVenue {
  name: string;
  address: string;
  logoSrc: string;
  logoAlt: string;
  url: string;
}

/** A finished event with verified data and its media recap. */
export interface PastEvent {
  id: string;
  /** Short eyebrow: program or co-organizing body. */
  descriptor: string;
  title: string;
  /** Human-readable date, e.g. "Sábado 3 de octubre de 2026". */
  date: string;
  location: string;
  description: string;
  /** Canonical public page of the event, when it exists. */
  url?: string;
  /** Structured venue info; when present it renders as a location line. */
  venue?: EventVenue;
  media: EventMedia[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface Collaborator {
  id: string;
  name: string;
  /** Public path to the logo file, e.g. "/assets/colaboradores/org.png". */
  logoSrc: string;
  /** Accessible name for the logo image. */
  logoAlt: string;
  /** Optional external URL (the organization's website). */
  url?: string;
  /** Render the logo 50% larger (for compact artwork next to wide wordmarks). */
  large?: boolean;
}

export interface ConductRuleSet {
  purpose: string;
  allowed: string[];
  prohibited: string[];
  adminRole: string;
  consequences: { infraction: string; consequence: string }[];
  shareFormat: string;
  shareTags: string[];
}

export interface InstitutionalCopy {
  name: string;
  domain: string;
  email: string;
  descriptor: string;
  ideaMadre: string;
  sintesis: string;
  inclusion: string;
  valueProposition: string;
  heroSubcopy: string;
  statusFormula: string;
  /** The one canonical destination for joining the community today. */
  joinUrl: string;
  joinUrlLabel: string;
}
