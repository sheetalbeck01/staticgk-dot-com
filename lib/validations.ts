import { z } from "zod";

export const attemptSchema = z.object({
  scopeKind: z.enum(["chapter", "topic", "subtopic"]),
  scopeRef: z.string().trim().min(1).max(20),
  total: z.number().int().min(1).max(200),
  correct: z.number().int().min(0).max(200),
});
