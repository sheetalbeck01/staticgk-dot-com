// Domain entities — plain data shapes, no framework imports.
// These cross every layer; persistence details live in infrastructure.

export type ScopeKind = "chapter" | "topic" | "subtopic";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Quiz {
  ref: string;
  title: string;
  crumb: string;
  scopeKind: ScopeKind;
  topicRefForNext: string | null;
  questions: QuizQuestion[];
}

export interface AttemptInput {
  scopeKind: ScopeKind;
  scopeRef: string;
  total: number;
  correct: number;
}

export interface Attempt extends AttemptInput {
  id: string;
  userId: string;
  createdAt: Date;
}
