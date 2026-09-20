"use client";

import { useEffect, useState } from "react";

const QUICK_SEARCHES = ["GK-014", "Ancient History", "Indian Polity", "GK-102"];

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

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("staticgk-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  function toggle() {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("staticgk-theme", next ? "dark" : "light");
      return next;
    });
  }

  return { dark, toggle };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const { dark, toggle } = useDarkMode();

  function startQuiz(e?: React.FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) {
      setMessage("Enter a topic name or ref no. to start — try “GK-014”.");
      return;
    }
    setMessage(`Starting quiz for “${q}”… (quizzes coming soon)`);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-lg font-bold text-white">
              S
            </span>
            <span className="text-xl font-bold tracking-tight">
              Static<span className="text-orange-600 dark:text-orange-400">GK.com</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex dark:text-slate-300">
            <a
              href="#start"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Practice
            </a>
            <a
              href="#how"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              How it works
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg transition hover:border-orange-400 hover:bg-orange-50 dark:border-slate-700 dark:hover:border-orange-400 dark:hover:bg-slate-900"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <a
              href="#start"
              className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-400 dark:text-slate-950 dark:hover:bg-orange-300"
            >
              Start Practicing
            </a>
          </div>
        </div>
      </header>

      {/* Section 1 — Hero + instant search */}
      <section id="start" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600 dark:bg-orange-400" />
              Lucent&apos;s General Knowledge • MCQ Practice
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              Read Lucent&apos;s.
              <br />
              Practice on{" "}
              <span className="text-orange-600 dark:text-orange-400">
                StaticGK.com
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Read a topic in your book, find it here, and test yourself with
              MCQs. Note the topic&apos;s{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                ref no.
              </span>{" "}
              in your book — next time just enter it and start the quiz
              instantly.
            </p>

            {/* Search card */}
            <form
              onSubmit={startQuiz}
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-orange-100/60 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter topic name or ref no. — e.g. GK-014"
                  className="h-12 flex-1 rounded-xl bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none ring-orange-600 transition placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:ring-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800"
                />
                <button
                  type="submit"
                  className="h-12 rounded-xl bg-orange-600 px-7 text-sm font-bold text-white transition hover:bg-orange-700 active:scale-[0.98] dark:bg-orange-400 dark:text-slate-950 dark:hover:bg-orange-300"
                >
                  Start Quiz
                </button>
              </div>
              {message && (
                <p className="px-3 pb-1 pt-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                  {message}
                </p>
              )}
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">Try:</span>
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    setMessage(
                      `Starting quiz for “${q}”… (quizzes coming soon)`
                    );
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-orange-400 dark:hover:text-orange-400"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Right — topic card visual */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-orange-100/70 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    Ref No. GK-014
                  </p>
                  <h3 className="mt-1 text-xl font-bold">Ancient History</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Lucent&apos;s GK • Chapter 3
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  40% done
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm font-semibold">
                  Q12. Which Harappan site is known for its dockyard?
                </p>
                <div className="mt-3 space-y-2">
                  {["Lothal", "Mohenjo-daro", "Kalibangan"].map((opt, i) => (
                    <div
                      key={opt}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                        i === 0
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-300"
                          : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className="h-full w-2/5 rounded-full bg-orange-600 dark:bg-orange-400" />
                </div>
                <span className="ml-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  12 / 30
                </span>
              </div>

              <button
                onClick={() => setQuery("GK-014")}
                className="mt-5 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-400 dark:text-slate-950 dark:hover:bg-orange-300"
              >
                Continue with GK-014
              </button>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 shadow-lg sm:block dark:border-orange-400/30 dark:bg-slate-900">
              <p className="font-mono text-xs font-bold text-slate-900 dark:text-orange-400">
                ✎ Write “GK-014” in your book
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                to jump back here anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works */}
      <section
        id="how"
        className="border-t border-slate-100 bg-slate-50/70 transition-colors dark:border-slate-800 dark:bg-slate-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Book in one hand, quiz in the other
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Three simple steps connect your Lucent&apos;s book to endless
              MCQ practice.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.no}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-400/50"
              >
                <p className="font-mono text-sm font-bold text-orange-600 dark:text-orange-400">
                  {s.no}
                </p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-orange-600 px-8 py-8 text-center sm:flex-row sm:text-left dark:bg-orange-400">
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-950">
                Note the ref no. once. Revise forever.
              </h3>
              <p className="mt-1 text-sm text-orange-100 dark:text-slate-800">
                Every topic has a short code like GK-014 — scribble it in the
                margin and start the quiz in seconds.
              </p>
            </div>
            <a
              href="#start"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-50 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              Find your topic
            </a>
          </div>

          <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-400">
            <p className="font-bold text-slate-900 dark:text-white">
              Static<span className="text-orange-600 dark:text-orange-400">GK.com</span>
              <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">
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
