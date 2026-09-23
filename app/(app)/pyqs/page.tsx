import Link from "next/link";

export default function PyqsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
          Coming soon
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Topicwise PYQs
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Previous year questions from SSC, UPSC, Railways and State exams —
          mapped to the same Lucent&apos;s GK topics and ref numbers, so you
          can practice PYQs right after each topic quiz.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { exam: "SSC CGL / CHSL / MTS", note: "Topic-tagged GK questions" },
            { exam: "UPSC & State PSC", note: "Prelims static GK questions" },
            { exam: "Railways & Banking", note: "NTPC, Group D, IBPS GK sets" },
          ].map((c) => (
            <div
              key={c.exam}
              className="rounded-3xl border border-slate-200 bg-white p-6"
            >
              <p className="font-mono text-xs font-bold text-brand-500">
                SOON
              </p>
              <h3 className="mt-2 text-lg font-bold">{c.exam}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-4xl">📝</p>
          <p className="mt-3 font-bold">PYQ sets are being prepared</p>
          <p className="mt-1 text-sm text-slate-500">
            Meanwhile, keep practicing topic quizzes on the dashboard.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Go to Dashboard
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
