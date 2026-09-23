"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { findTopic } from "./data/syllabus";
import Link from "next/link";

const QUICK_SEARCHES = ["GK-001", "Ancient History", "Indian Polity", "GK-014"];

const STEPS = [
  {
    no: "01",
    title: "Read in your book",
    text: "Study any topic in Lucent's General Knowledge just like you normally do. No change to your reading habit.",
  },
  {
    no: "02",
    title: "Find it on StaticGK.com",
    text: "Search the topic name or enter its ref no. (e.g. GK-014) to jump straight to the quiz.",
  },
  {
    no: "03",
    title: "Practice & save progress",
    text: "Solve MCQs, note the ref no. in your book margin, and pick up right where you left off next time.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Logged-in users don't stay on the landing page
  useEffect(() => {
    if (!isPending && session) router.replace("/dashboard");
  }, [isPending, session, router]);

  function googleSignIn() {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  function goToQuiz(q: string) {
    const found = findTopic(q);
    if (found) {
      router.push(`/quiz/${found.topic.ref}`);
    } else {
      setMessage(
        `No topic found for “${q.trim()}” — try “GK-014” or browse the dashboard.`
      );
    }
  }

  function startQuiz(e?: React.FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) {
      setMessage("Enter a topic name or ref no. to start — try “GK-014”.");
      return;
    }
    goToQuiz(q);
  }

  if (!isPending && session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-sans text-slate-500">
        <p className="animate-pulse text-sm font-semibold">
          Taking you to your dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/90 backdrop-blur transition-colors">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="#"
            className="font-logo text-xl text-brand-500"
          >
            StaticGK.com
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <a
              href="#start"
              className="transition hover:text-slate-900"
            >
              Practice
            </a>
            <a
              href="#how"
              className="transition hover:text-slate-900"
            >
              How it works
            </a>
            <Link
              href="/dashboard"
              className="transition hover:text-slate-900"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#start"
              className="hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 sm:block"
            >
              Start Practicing
            </a>
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
              <button
                onClick={googleSignIn}
                type="button"
                className="flex touch-manipulation cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:px-5"
              >
                <span className="font-bold">G</span>
                <span className="hidden sm:inline">Sign in with Google</span>
                <span className="sm:hidden">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Section 1 — Hero + instant search */}
      <section id="start" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Lucent&apos;s General Knowledge • MCQ Practice
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              Read Lucent&apos;s.
              <br />
              Revise on{" "}
              <span className="font-logo font-normal text-brand-500">
                StaticGK.com
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Read a topic in your book, find it here, and test yourself with
              MCQs. Note the topic&apos;s{" "}
              <span className="font-semibold text-slate-900">
                ref no.
              </span>{" "}
              in your book — next time just enter it and start the quiz
              instantly.
            </p>

            {/* Search card */}
            <form
              onSubmit={startQuiz}
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-brand-100/60 transition-colors"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter topic name or ref no. — e.g. GK-014"
                  className="h-12 flex-1 rounded-xl bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none ring-brand-500 transition placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:ring-2"
                />
                <button
                  type="submit"
                  className="h-12 rounded-xl bg-brand-500 px-7 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-[0.98]"
                >
                  Start Quiz
                </button>
              </div>
              {message && (
                <p className="px-3 pb-1 pt-2 text-sm font-medium text-brand-500">
                  {message}
                </p>
              )}
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500">Try:</span>
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    goToQuiz(q);
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-500"
                >
                  {q}
                </button>
              ))}
            </div>

            {!session && !isPending && (
              <button
                onClick={googleSignIn}
                type="button"
                className="mt-4 flex w-full touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition hover:border-brand-500 hover:bg-brand-50 active:scale-[0.99]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  G
                </span>
                Continue with Google — save progress &amp; sync devices
              </button>
            )}
          </div>

          {/* Right — topic card visual */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-100/70 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
                    Ref No. GK-001
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    Indus Valley Civilization
                  </h3>
                  <p className="text-sm text-slate-500">
                    Lucent&apos;s GK • CH-01 Ancient History
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  40% done
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold">
                  Q12. Which Harappan site is known for its dockyard?
                </p>
                <div className="mt-3 space-y-2">
                  {["Lothal", "Mohenjo-daro", "Kalibangan"].map((opt, i) => (
                    <div
                      key={opt}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                        i === 0
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/5 rounded-full bg-brand-500" />
                </div>
                <span className="ml-3 text-xs font-semibold text-slate-500">
                  12 / 30
                </span>
              </div>

              <button
                onClick={() => router.push("/quiz/GK-001")}
                className="mt-5 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Continue with GK-001
              </button>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 shadow-lg sm:block">
              <p className="font-mono text-xs font-bold text-slate-900">
                ✎ Write “GK-001” in your book
              </p>
              <p className="text-xs text-slate-500">
                to jump back here anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works */}
      <section
        id="how"
        className="border-t border-slate-100 bg-slate-50/70 transition-colors"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Book in one hand, quiz in the other
            </h2>
            <p className="mt-3 text-slate-600">
              Three simple steps connect your Lucent&apos;s book to endless
              MCQ practice.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.no}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
              >
                <p className="font-mono text-sm font-bold text-brand-500">
                  {s.no}
                </p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-brand-500 px-8 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-white">
                Note the ref no. once. Revise forever.
              </h3>
              <p className="mt-1 text-sm text-brand-100">
                Every topic has a short code like GK-014 — scribble it in the
                margin and start the quiz in seconds.
              </p>
            </div>
            <a
              href="#start"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50"
            >
              Find your topic
            </a>
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
        </div>
      </section>
    </div>
  );
}
