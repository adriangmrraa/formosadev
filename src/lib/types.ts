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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Pillar {
  title: string;
  description: string;
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
