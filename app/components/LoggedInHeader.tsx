"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const LINKS = [
  { key: "dashboard", href: "/dashboard", label: "Dashboard" },
  { key: "lucent-english", href: "/lucent-english", label: "Lucent English" },
  { key: "lucent-hindi", href: "/lucent-hindi", label: "Lucent Hindi" },
  { key: "interactive-learning", href: "/interactive-learning", label: "Interactive Learning" },
  { key: "pyqs", href: "/pyqs", label: "Topicwise PYQs" },
  { key: "progress", href: "/progress", label: "Progress" },
];

/** Shared navbar for all logged-in pages. No links back to the landing page. */
export default function LoggedInHeader({
  active,
  action,
}: {
  active?: string;
  action?: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/90 backdrop-blur transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="font-logo text-xl text-brand-500"
        >
          StaticGK.com
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={
                active === l.key
                  ? "text-brand-500"
                  : "transition hover:text-slate-900"
              }
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {action}
          {session?.user ? (
            <Link
              href="/profile"
              title={`Profile — ${session.user.email ?? ""}`}
              className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-4 text-sm font-bold transition hover:border-brand-500"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  {(session.user.name ?? session.user.email ?? "U")[0].toUpperCase()}
                </span>
              )}
              <span className="hidden sm:inline">Profile</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
