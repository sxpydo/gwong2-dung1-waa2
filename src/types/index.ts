export interface Phrase {
  id: string;
  c: string; // Cantonese characters
  j: string; // Jyutping, e.g. "ngo5 hou2"
  e: string; // English
  n?: string; // optional usage note
  cat?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  desc?: string;
  type?: 'grammar';
  phrases: Phrase[];
}

export interface PatternOption {
  c: string;
  j: string;
  e: string;
}

export interface Pattern {
  tag: string;
  template_c: string; // uses "___" as the blank marker, may repeat
  template_j: string;
  template_e: string;
  options: PatternOption[];
}

export interface GrammarStructureRow {
  pattern: string;
  c: string;
  j: string;
  e: string;
  breakdown: string;
}

export interface GrammarTenseRow {
  label: string;
  marker: string;
  c: string;
  j: string;
  e: string;
}

export interface GrammarMarker {
  badge: string;
  jyut: string;
  title: string;
  desc: string;
}

export interface GrammarTimeRow {
  past: string;
  pastJ: string;
  pastE: string;
  present: string;
  presentJ: string;
  presentE: string;
  future: string;
  futureJ: string;
  futureE: string;
}

export interface GrammarContent {
  structures: GrammarStructureRow[];
  tenseTable: GrammarTenseRow[];
  markers: GrammarMarker[];
  experience: GrammarStructureRow[];
  timeGrid: GrammarTimeRow[];
  phrases: Phrase[];
}

// ---- Spaced repetition (SM-2) ----
export interface ReviewState {
  phraseId: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  dueAt: string; // ISO date
  lastReviewedAt: string | null;
  correctCount: number;
  seenCount: number;
  starred: boolean;
}

export type DrillMode = 'all' | 'starred' | 'due';
export type DrillGrade = 'again' | 'good';
