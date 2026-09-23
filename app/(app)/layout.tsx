"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoggedInHeader from "../components/LoggedInHeader";

function activeFor(pathname: string): string {
  if (pathname.startsWith("/quiz")) return "quiz";
  if (pathname.startsWith("/lucent-english")) return "lucent-english";
  if (pathname.startsWith("/lucent-hindi")) return "lucent-hindi";
  if (pathname.startsWith("/interactive-learning")) return "interactive-learning";
  if (pathname.startsWith("/pyqs")) return "pyqs";
  if (pathname.startsWith("/progress")) return "progress";
  if (pathname.startsWith("/profile")) return "profile";
  return "dashboard";
}

// Logged-in area shell: the navbar mounts once and persists across
// client-side navigation, so it never remounts/flashes between pages.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/dashboard";
  const isQuiz = pathname.startsWith("/quiz");

  return (
    <>
      <LoggedInHeader
        active={activeFor(pathname)}
        action={
          isQuiz ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              ✕ Quit
            </Link>
          ) : undefined
        }
      />
      {children}
    </>
  );
}
