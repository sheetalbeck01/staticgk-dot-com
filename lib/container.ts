import { prisma } from "./prisma";
import { PrismaCatalogRepository } from "@/infrastructure/repositories/PrismaCatalogRepository";
import { PrismaAttemptRepository } from "@/infrastructure/repositories/PrismaAttemptRepository";
import { QuizService } from "@/application/services/QuizService";

// Composition root: the ONLY place that wires implementations together.
// Routes/services import from here and stay decoupled from Prisma.
// (Auth is handled by Better Auth directly via the Prisma adapter.)
const catalog = new PrismaCatalogRepository(prisma);
const attempts = new PrismaAttemptRepository(prisma);

export const quizService = new QuizService(catalog, attempts);
