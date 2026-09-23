'use client';

import { createAuthClient } from '@neondatabase/auth/next';

// Client-side auth: session hook + sign in/out/up against Managed Better Auth.
// API calls proxy through our /api/auth/* route (same origin, first-party cookies).
export const authClient = createAuthClient();

export const { useSession } = authClient;
