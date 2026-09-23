import type {
  IAttemptRepository,
  ICatalogRepository,
} from "@/domain/repositories";
import type { AttemptInput, Quiz } from "@/domain/entities";

/** Quiz use-cases. Depends only on repository ports. */
export class QuizService {
  constructor(
    private catalog: ICatalogRepository,
    private attempts: IAttemptRepository
  ) {}

  /** Build a quiz for any ref (CH-01, GK-014, GK-014.1). Null if unknown. */
  async getQuiz(ref: string): Promise<Quiz | null> {
    const node = await this.catalog.resolveRef(ref);
    if (!node) return null;

    if (node.scopeKind === "chapter") {
      const topicRefs = await this.catalog.chapterTopicRefs(node.chapterRef);
      return {
        ref: node.chapterRef,
        title: node.chapterTitle,
        crumb: `${node.chapterRef} • Chapter Quiz`,
        scopeKind: "chapter",
        topicRefForNext: null,
        questions: await this.catalog.questionsForTopics(topicRefs),
      };
    }

    const topicRef = node.topicRef!;
    const questions = await this.catalog.questionsForTopics([topicRef]);
    return {
      ref: node.scopeKind === "topic" ? topicRef : ref.trim().toUpperCase(),
      title: node.scopeKind === "topic" ? node.topicTitle! : node.subtopicTitle!,
      crumb:
        node.scopeKind === "topic"
          ? `${node.chapterRef} • ${node.chapterTitle}`
          : `${topicRef} • ${node.topicTitle}`,
      scopeKind: node.scopeKind,
      topicRefForNext: topicRef,
      questions,
    };
  }

  async nextTopicRef(topicRef: string): Promise<string | null> {
    return this.catalog.nextTopicRef(topicRef);
  }

  async recordAttempt(userId: string, input: AttemptInput) {
    return this.attempts.record(userId, input);
  }
}
