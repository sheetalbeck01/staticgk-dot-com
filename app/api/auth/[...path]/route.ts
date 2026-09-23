import { auth } from '@/lib/auth/server';

// Proxies Managed Better Auth APIs from our own origin
// (same-origin requests => first-party session cookies).
export const { GET, POST } = auth.handler();
