import type { PrismaClient } from "@prisma/client";
import type { ICatalogRepository } from "@/domain/repositories";
import type { QuizQuestion } from "@/domain/entities";

export class PrismaCatalogRepository implements ICatalogRepository {
  constructor(private db: PrismaClient) {}

  async resolveRef(ref: string) {
    const key = ref.trim().toUpperCase();
    const chapter = await this.db.chapter.findUnique({
      where: { ref: key },
      include: { topics: { orderBy: { sort: "asc" } } },
    });
    if (chapter) {
      return {
        scopeKind: "chapter" as const,
        chapterRef: chapter.ref,
        chapterTitle: chapter.title,
        topicRef: null,
        topicTitle: null,
        subtopicTitle: null,
      };
    }
    const topic = await this.db.topic.findUnique({
      where: { ref: key },
      include: { chapter: true },
    });
    if (topic) {
      return {
        scopeKind: "topic" as const,
        chapterRef: topic.chapter.ref,
        chapterTitle: topic.chapter.title,
        topicRef: topic.ref,
        topicTitle: topic.title,
        subtopicTitle: null,
      };
    }
    const sub = await this.db.subtopic.findUnique({
      where: { ref: key },
      include: { topic: { include: { chapter: true } } },
    });
    if (sub) {
      return {
        scopeKind: "subtopic" as const,
        chapterRef: sub.topic.chapter.ref,
        chapterTitle: sub.topic.chapter.title,
        topicRef: sub.topic.ref,
        topicTitle: sub.topic.title,
        subtopicTitle: sub.title,
      };
    }
    return null;
  }

  async questionsForTopics(topicRefs: string[]): Promise<QuizQuestion[]> {
    if (topicRefs.length === 0) return [];
    const rows = await this.db.question.findMany({
      where: { topic: { ref: { in: topicRefs } } },
      include: { topic: true },
      orderBy: [{ topic: { sort: "asc" } }, { sort: "asc" }],
    });
    const order = new Map(topicRefs.map((r, i) => [r.toUpperCase(), i]));
    return rows
      .sort((a, b) => {
        const ta = order.get(a.topic.ref.toUpperCase()) ?? 0;
        const tb = order.get(b.topic.ref.toUpperCase()) ?? 0;
        return ta - tb || a.sort - b.sort;
      })
      .map((q) => ({
        q: q.text,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      }));
  }

  async chapterTopicRefs(chapterRef: string): Promise<string[]> {
    const topics = await this.db.topic.findMany({
      where: { chapter: { ref: chapterRef.trim().toUpperCase() } },
      orderBy: { sort: "asc" },
      select: { ref: true },
    });
    return topics.map((t) => t.ref);
  }

  async nextTopicRef(topicRef: string): Promise<string | null> {
    const key = topicRef.trim().toUpperCase();
    const current = await this.db.topic.findUnique({
      where: { ref: key },
      select: { chapterId: true, sort: true },
    });
    if (!current) return null;
    const nextInChapter = await this.db.topic.findFirst({
      where: { chapterId: current.chapterId, sort: { gt: current.sort } },
      orderBy: { sort: "asc" },
      select: { ref: true },
    });
    if (nextInChapter) return nextInChapter.ref;
    const nextChapter = await this.db.chapter.findFirst({
      where: {
        topics: { some: { chapterId: current.chapterId } },
        sort: {
          gt: (await this.db.chapter.findUnique({
            where: { id: current.chapterId },
            select: { sort: true },
          }))!.sort,
        },
      },
      orderBy: { sort: "asc" },
      include: { topics: { orderBy: { sort: "asc" }, take: 1 } },
    });
    return nextChapter?.topics[0]?.ref ?? null;
  }
}
