"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function signOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-10 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
        <p className="mt-2 text-slate-600">
          Your StaticGK.com account.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          {isPending ? (
            <p className="animate-pulse text-sm font-semibold text-slate-500">
              Loading profile…
            </p>
          ) : !session?.user ? (
            <div>
              <p className="font-bold">You are signed out</p>
              <p className="mt-1 text-sm text-slate-500">
                Sign in with Google from the landing page to see your profile.
              </p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div>
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-brand-100"
                />
              ) : (
                <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-500 text-3xl font-bold text-white">
                  {(session.user.name ?? session.user.email ?? "U")[0].toUpperCase()}
                </span>
              )}
              <h2 className="mt-4 text-xl font-bold">
                {session.user.name ?? "GK Aspirant"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{session.user.email}</p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-500"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p className="font-bold text-slate-900">
            <span className="font-logo font-normal">Static<span className="text-brand-500">GK.com</span></span>
            <span className="ml-2 font-normal text-slate-500">
              Practice Lucent&apos;s GK, one quiz at a time.
            </span>
          </p>
          <p>© 2026 StaticGK.com</p>
        </footer>
      </main>
    </div>
  );
}
