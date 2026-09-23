import type { PrismaClient } from "@prisma/client";
import type { IAttemptRepository } from "@/domain/repositories";
import type { Attempt, AttemptInput } from "@/domain/entities";

export class PrismaAttemptRepository implements IAttemptRepository {
  constructor(private db: PrismaClient) {}

  async record(userId: string, input: AttemptInput): Promise<Attempt> {
    const row = await this.db.quizAttempt.create({
      data: {
        userId,
        scopeKind: input.scopeKind,
        scopeRef: input.scopeRef.trim().toUpperCase(),
        total: input.total,
        correct: Math.min(input.correct, input.total),
      },
    });
    return {
      id: row.id,
      userId: row.userId,
      scopeKind: input.scopeKind,
      scopeRef: row.scopeRef,
      total: row.total,
      correct: row.correct,
      createdAt: row.createdAt,
    };
  }
}
