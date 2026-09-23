import { defineConfig } from "prisma/config";

// Falls back to a placeholder so `prisma generate` and `next build`
// work before you add your real Postgres link to .env.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://user:password@ep-example.neon.tech/staticgk?sslmode=require",
  },
});
