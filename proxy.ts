import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Edge-safe guard: checks session-cookie presence only (no DB imports).
// API routes re-verify the session server-side.
function guard(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const guarded =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/quiz") ||
    pathname === "/profile" ||
    pathname === "/pyqs" ||
    pathname === "/progress";
  if (!guarded) return NextResponse.next();

  if (getSessionCookie(req)) return NextResponse.next();

  return NextResponse.redirect(new URL("/", req.nextUrl.origin));
}

// Next 16 proxy convention (default export) + legacy middleware export.
export default guard;
export const middleware = guard;

export const config = {
  matcher: ["/dashboard/:path*", "/quiz/:path*", "/profile", "/pyqs", "/progress"],
};
