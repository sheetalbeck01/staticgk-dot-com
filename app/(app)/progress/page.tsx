import Link from "next/link";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
          Coming soon
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your Progress
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Quiz scores, accuracy trends, streaks and chapter-wise completion —
          everything you attempt is already being saved to your account.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Quizzes taken", value: "—" },
            { label: "Accuracy", value: "—" },
            { label: "Day streak", value: "—" },
            { label: "Syllabus done", value: "—" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-4xl">📊</p>
          <p className="mt-3 font-bold">Progress dashboard is on the way</p>
          <p className="mt-1 text-sm text-slate-500">
            Every finished quiz is recorded — charts unlock in the next update.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Keep Practicing
          </Link>
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
