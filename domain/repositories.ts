// Repository contracts (ports). Application services depend ONLY on these.
// Infrastructure provides the Prisma implementations. This is the DIP seam
// that keeps the core testable and lets the database change without touching
// business logic.

import type {
  Attempt,
  AttemptInput,
  QuizQuestion,
} from "./entities";

export interface ICatalogRepository {
  /** Resolve CH-01 / GK-014 / GK-014.1 to its chapter + topic context. */
  resolveRef(ref: string): Promise<{
    scopeKind: "chapter" | "topic" | "subtopic";
    chapterRef: string;
    chapterTitle: string;
    topicRef: string | null;
    topicTitle: string | null;
    subtopicTitle: string | null;
  } | null>;
  /** Ordered question bank for the given topic refs. */
  questionsForTopics(topicRefs: string[]): Promise<QuizQuestion[]>;
  /** Topic refs of a chapter, in order. */
  chapterTopicRefs(chapterRef: string): Promise<string[]>;
  /** Next topic ref after the given one, syllabus order. */
  nextTopicRef(topicRef: string): Promise<string | null>;
}

export interface IAttemptRepository {
  record(userId: string, input: AttemptInput): Promise<Attempt>;
}
