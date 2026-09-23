import { createNeonAuth } from '@neondatabase/auth/next/server';

// Server-side auth for route handlers, server actions/components and proxy.
// Proxies API traffic to Managed Better Auth; sessions are cached in a
// signed cookie so edge checks don't hit the database.
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
