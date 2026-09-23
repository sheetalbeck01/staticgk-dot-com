import { createNeonAuth } from '@neondatabase/auth/next/server';

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl || !cookieSecret) {
  throw new Error(
    "[StaticGK] Auth is misconfigured: set NEON_AUTH_BASE_URL and " +
      "NEON_AUTH_COOKIE_SECRET environment variables (see .env.example) " +
      "and redeploy."
  );
}

// Server-side auth for route handlers, server actions/components and proxy.
// Proxies API traffic to Managed Better Auth; sessions are cached in a
// signed cookie so edge checks don't hit the database.
export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
  },
});
