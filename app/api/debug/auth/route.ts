import { NextResponse } from "next/server";

// TEMPORARY diagnostics for the production 500s. Reports booleans and
// hostnames only — never secret values. DELETE after diagnosis.
function hostOf(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/@([^/:?]+)/);
  return m ? m[1] : "unparseable";
}

function scrub(msg: string): string {
  return msg
    .replace(/:\/\/[^:]+:[^@]+@/g, "://***@")
    .slice(0, 300);
}

export async function GET() {
  const report: Record<string, unknown> = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseHost: hostOf(process.env.DATABASE_URL),
    hasBetterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    hasGoogleKeys: !!(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ),
  };

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    report.dbConnectable = true;
  } catch (e) {
    report.dbConnectable = false;
    report.dbError =
      e instanceof Error ? scrub(e.message) : scrub(String(e));
  }

  if (report.dbConnectable) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const [user, session, account, verification] = await Promise.all([
        prisma.user.count(),
        prisma.session.count(),
        prisma.account.count(),
        prisma.verification.count(),
      ]);
      report.authTables = { user, session, account, verification };
    } catch (e) {
      report.authTables = null;
      report.tablesError =
        e instanceof Error ? scrub(e.message) : scrub(String(e));
    }
  }

  try {
    const { auth } = await import("@/lib/auth");
    report.authInitOk = !!auth;
  } catch (e) {
    report.authInitOk = false;
    report.authError =
      e instanceof Error ? scrub(e.message) : scrub(String(e));
  }

  return NextResponse.json(report);
}
