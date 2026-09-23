import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

// Singleton: one client across hot-reloads and invocations.
// Neon's HTTP driver opens no sockets — constructing it is side-effect
// free, so importing this at build time is safe even before DATABASE_URL
// points at your Neon project.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function connectionString(): string {
  return (
    process.env.DATABASE_URL ??
    "postgresql://user:password@ep-example.neon.tech/staticgk?sslmode=require"
  );
}

function createClient(): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaNeonHttp(connectionString(), {}),
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
