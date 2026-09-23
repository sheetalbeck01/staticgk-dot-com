import { auth } from '@/lib/auth/server';

// Next 16: proxy.ts replaces middleware.ts (same auth logic).
// Unauthenticated visitors are redirected to the sign-in page.
// Unauthenticated visitors go to the landing page,
// which has the Google sign-in button in the navbar.
export default auth.middleware({
  loginUrl: '/',
});

export const config = {
  matcher: ['/dashboard/:path*', '/quiz/:path*', '/profile', '/pyqs', '/progress'],
};
