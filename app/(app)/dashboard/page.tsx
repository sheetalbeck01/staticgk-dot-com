"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { SYLLABUS } from "../../data/syllabus";
import { SYLLABUS_HI } from "../../data/syllabus-hi";
import { getRevisionQueue } from "@/lib/revision";

export default function Dashboard() {
  const { data: session } = useSession();

  const firstName =
    session?.user?.name?.trim().split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "there";

  const revision = useMemo(() => getRevisionQueue(), []);

  const chapterCount = SYLLABUS.length;
  const topicCount = SYLLABUS.reduce((n, ch) => n + ch.topics.length, 0);
  const chapterCountHi = SYLLABUS_HI.length;
  const topicCountHi = SYLLABUS_HI.reduce((n, ch) => n + ch.topics.length, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        {/* Title */}
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Hi, {firstName} 👋
        </h1>
        <p className="mt-2 text-slate-600">
          Revision is the key to success, and we help you revise StaticGK
          for Govt Exams.
        </p>

        {/* Today's Revision */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">Today&apos;s Revision</h2>
          <p className="mt-1 text-sm text-slate-500">
            Spaced repetition picks what to revise — full system coming soon.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-extrabold">{revision.today.length}</p>
              <p className="text-sm text-slate-500">Due today</p>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4">
              <p className="text-2xl font-extrabold text-red-600">
                {revision.overdue.length}
              </p>
              <p className="text-sm text-slate-500">Overdue</p>
            </div>
          </div>
        </div>

        {/* Syllabus entries */}
        <div className="mt-8 space-y-4">
          <Link
            href="/lucent-english"
            className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900 px-6 py-6 transition hover:bg-slate-800 sm:px-8"
          >
            <span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-300">
                Lucent English
              </span>
              <span className="mt-1 block text-xl font-bold text-white">
                Syllabus, topics &amp; quizzes
              </span>
              <span className="mt-1 block text-sm text-slate-300">
                {chapterCount} chapters • {topicCount} topics • search by ref no.
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white">
              Open →
            </span>
          </Link>
          <Link
            href="/lucent-hindi"
            className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 transition hover:border-brand-300 hover:shadow-lg sm:px-8"
          >
            <span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-500">
                Lucent Hindi
              </span>
              <span className="mt-1 block text-xl font-bold text-slate-900">
                पाठ्यक्रम, विषय और क्विज़
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                {chapterCountHi} अध्याय • {topicCountHi} विषय • ref से खोजें
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white">
              खोलें →
            </span>
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
