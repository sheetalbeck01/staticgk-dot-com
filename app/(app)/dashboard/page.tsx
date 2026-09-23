"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "@/lib/auth/client";

import { SYLLABUS, type Chapter, type Topic } from "../../data/syllabus";
import { getRevisionQueue } from "@/lib/revision";
import Link from "next/link";

// Demo progress until the database lands: ref -> answered questions
const INITIAL_DONE: Record<string, number> = {
  "GK-001": 30,
  "GK-002": 12,
  "GK-015": 15,
  "GK-023": 25,
  "GK-032": 18,
  "GK-036": 20,
};

function statusOf(done: number, total: number) {
  if (done >= total) return "done";
  if (done > 0) return "progress";
  return "todo";
}

const STATUS_STYLE: Record<string, string> = {
  done: "bg-emerald-100 text-emerald-800",
  progress:
    "bg-brand-100 text-brand-800",
  todo: "bg-slate-100 text-slate-600",
};

const STATUS_LABEL: Record<string, string> = {
  done: "● Done",
  progress: "◐ In progress",
  todo: "○ Not started",
};

function ChapterRow({
  ch,
  d,
  t,
  selected,
  onSelect,
}: {
  ch: Chapter;
  d: number;
  t: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const cpct = t === 0 ? 0 : Math.round((d / t) * 100);
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${
        selected ? "bg-brand-50 ring-1 ring-brand-300" : "hover:bg-slate-50"
      }`}
    >
      <span
        className={`rounded-lg px-2 py-1 font-mono text-xs font-bold text-white ${
          selected ? "bg-brand-500" : "bg-slate-900"
        }`}
      >
        {ch.ref}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-bold">{ch.title}</span>
        <span className="mt-1 block h-1 overflow-hidden rounded-full bg-slate-100">
          <span
            className="block h-full rounded-full bg-brand-500"
            style={{ width: `${cpct}%` }}
          />
        </span>
      </span>
      <span className="shrink-0 text-xs font-bold text-slate-400">
        {d}/{t}
      </span>
    </button>
  );
}

function TopicCard({
  topic,
  answered,
  onCycle,
}: {
  topic: Topic;
  answered: number;
  onCycle: () => void;
}) {
  const st = statusOf(answered, topic.questions);
  const tpct = Math.round((answered / topic.questions) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-brand-100 px-2.5 py-1 font-mono text-xs font-bold text-brand-800">
          {topic.ref}
        </span>
        <h3 className="flex-1 font-bold">{topic.title}</h3>
        <button
          onClick={onCycle}
          title="Click to change status (demo until database)"
          className={`rounded-full px-3 py-1 text-xs font-bold transition active:scale-95 ${STATUS_STYLE[st]}`}
        >
          {STATUS_LABEL[st]}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${tpct}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-500">
          {answered}/{topic.questions}
        </span>
      </div>

      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {topic.subtopics.map((s) => (
          <Link
            key={s.ref}
            href={`/quiz/${s.ref}`}
            title={`Start quiz for ${s.ref}`}
            className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm transition-colors hover:bg-brand-50 hover:ring-1 hover:ring-brand-300"
          >
            <span className="font-mono text-xs font-bold text-brand-500">
              {s.ref}
            </span>
            <span className="flex-1 text-slate-700">{s.title}</span>
            <span className="text-xs text-slate-400">{s.questions}Q →</span>
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs text-slate-400">
          ✎ Note “{topic.ref}” in your book
        </p>
        <Link
          href={`/quiz/${topic.ref}`}
          className="rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-600"
        >
          Start Quiz →
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [selectedRef, setSelectedRef] = useState<string>("CH-01");
  const [sheetOpen, setSheetOpen] = useState(false);
  const topicsTopRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState<Record<string, number>>(INITIAL_DONE);
  const { data: session } = useSession();

  const firstName =
    session?.user?.name?.trim().split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "there";

  function cycleStatus(ref: string, total: number) {
    setDone((prev) => {
      const current = prev[ref] ?? 0;
      const s = statusOf(current, total);
      const next =
        s === "todo" ? Math.floor(total / 2) : s === "progress" ? total : 0;
      return { ...prev, [ref]: next };
    });
  }

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const filtered = useMemo(() => {
    if (!searching) return SYLLABUS;
    return SYLLABUS.map((ch) => ({
      ...ch,
      topics: ch.topics
        .map((t) => {
          const topicHit =
            t.title.toLowerCase().includes(q) ||
            t.ref.toLowerCase().includes(q);
          const chapterHit = ch.title.toLowerCase().includes(q);
          const subs = t.subtopics.filter(
            (s) =>
              topicHit ||
              chapterHit ||
              s.title.toLowerCase().includes(q) ||
              s.ref.toLowerCase().includes(q)
          );
          return { ...t, subtopics: subs, _hit: topicHit || subs.length > 0 };
        })
        .filter((t) => t._hit),
    })).filter((ch) => ch.topics.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, searching]);

  const matchCount = useMemo(
    () => filtered.reduce((n, ch) => n + ch.topics.length, 0),
    [filtered]
  );

  const revision = useMemo(() => getRevisionQueue(), []);

  function chapterDone(ch: Chapter) {
    let d = 0;
    let t = 0;
    for (const topic of ch.topics) {
      t += topic.questions;
      d += Math.min(done[topic.ref] ?? 0, topic.questions);
    }
    return { d, t };
  }

  function selectChapter(ref: string) {
    setSelectedRef(ref);
    setQuery("");
    setSheetOpen(false);
    requestAnimationFrame(() => {
      topicsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Lock body scroll while the mobile chapter sheet is open
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const selectedChapter =
    SYLLABUS.find((c) => c.ref === selectedRef) ?? SYLLABUS[0];
  const selProgress = chapterDone(selectedChapter);
  const selPct =
    selProgress.t === 0
      ? 0
      : Math.round((selProgress.d / selProgress.t) * 100);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors">
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 lg:pb-20">
        {/* Title */}
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Hi, {firstName} 👋
        </h1>
        <p className="mt-2 text-slate-600">
          Lucent&apos;s General Knowledge • Static GK syllabus with ref numbers.
          Note a ref no. in your book to jump back here anytime.
        </p>

        {/* Find Ref search */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-brand-100/60 transition-colors">
          <div className="flex items-center gap-2">
            <span className="pl-3 text-lg">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Ref — enter ref no. or topic, e.g. GK-014 or Polity"
              className="h-12 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
            />
            {searching && (
              <button
                onClick={() => setQuery("")}
                className="mr-1 rounded-full px-3 py-1 text-sm font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            )}
            <span className="mr-1 hidden rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white sm:block">
              Find Ref
            </span>
          </div>
        </div>
        {searching && (
          <p className="mt-3 text-sm font-medium text-slate-600">
            {matchCount === 0 ? (
              <>
                No topics found for “{query.trim()}” — try a ref no. like
                GK-014.
              </>
            ) : (
              <>
                {matchCount} topic{matchCount === 1 ? "" : "s"} found for “
                {query.trim()}”
              </>
            )}
          </p>
        )}

        {/* Today's Revision */}
        {!searching && (
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
        )}

        {/* Syllabus */}
        {!searching && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">Syllabus</h2>
          </div>
        )}

        {/* Syllabus content: topics + chapters sidebar */}
        <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          {/* Topics */}
          <div ref={topicsTopRef} className="scroll-mt-20 space-y-4">
            {searching ? (
              filtered.map((ch) => (
                <div key={ch.ref}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {ch.ref} • {ch.title}
                  </p>
                  <div className="space-y-3">
                    {ch.topics.map((topic) => (
                      <TopicCard
                        key={topic.ref}
                        topic={topic}
                        answered={Math.min(done[topic.ref] ?? 0, topic.questions)}
                        onCycle={() => cycleStatus(topic.ref, topic.questions)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-brand-100 px-2.5 py-1 font-mono text-xs font-bold text-brand-800">
                      {selectedChapter.ref}
                    </span>
                    <span className="text-sm text-slate-500">
                      {selectedChapter.topics.length} topics •{" "}
                      {selProgress.t} questions
                    </span>
                  </div>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {selectedChapter.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-slate-600">
                    {selectedChapter.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="h-2 min-w-24 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${selPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {selProgress.d} / {selProgress.t} answered
                    </span>
                    <Link
                      href={`/quiz/${selectedChapter.ref}`}
                      title={`Start ${selectedChapter.ref} chapter quiz`}
                      className="rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-600"
                    >
                      Quiz →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3">
                  {selectedChapter.topics.map((topic) => (
                    <TopicCard
                      key={topic.ref}
                      topic={topic}
                      answered={Math.min(done[topic.ref] ?? 0, topic.questions)}
                      onCycle={() => cycleStatus(topic.ref, topic.questions)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Chapters sidebar (desktop) */}
          <aside className="hidden lg:sticky lg:top-20 lg:block">
            <div className="rounded-3xl border border-slate-200 bg-white p-3">
              <p className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                Chapters
              </p>
              <div className="max-h-[calc(100vh-10rem)] space-y-1 overflow-y-auto">
                {SYLLABUS.map((ch) => {
                  const { d, t } = chapterDone(ch);
                  return (
                    <ChapterRow
                      key={ch.ref}
                      ch={ch}
                      d={d}
                      t={t}
                      selected={ch.ref === selectedRef && !searching}
                      onSelect={() => selectChapter(ch.ref)}
                    />
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Chapters bottom bar + sheet (mobile) */}
        <div className="lg:hidden">
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
            <button
              onClick={() => setSheetOpen(true)}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-lg"
            >
              <span className="rounded-lg bg-brand-500 px-2 py-1 font-mono text-xs font-bold text-white">
                {selectedChapter.ref}
              </span>
              <span className="flex-1 truncate text-sm font-bold">
                {selectedChapter.title}
              </span>
              <span className="text-slate-400">▴</span>
            </button>
          </div>

          {sheetOpen && (
            <div className="fixed inset-0 z-30">
              <div
                className="absolute inset-0 bg-slate-950/40"
                onClick={() => setSheetOpen(false)}
              />
              <div className="animate-sheet-up absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="mx-auto h-1 w-10 rounded-full bg-slate-200" />
                <div className="mt-2 flex items-center justify-between px-1">
                  <p className="text-sm font-extrabold">Choose chapter</p>
                  <button
                    onClick={() => setSheetOpen(false)}
                    aria-label="Close chapters"
                    className="rounded-full px-3 py-1 text-lg font-bold text-slate-400 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {SYLLABUS.map((ch) => {
                    const { d, t } = chapterDone(ch);
                    return (
                      <ChapterRow
                        key={ch.ref}
                        ch={ch}
                        d={d}
                        t={t}
                        selected={ch.ref === selectedRef && !searching}
                        onSelect={() => selectChapter(ch.ref)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {searching && matchCount === 0 && (
          <div className="mt-4 rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-4xl">📖</p>
            <p className="mt-3 font-bold">Nothing in the syllabus matches</p>
            <p className="mt-1 text-sm text-slate-500">
              Check the ref no. in your book, or browse the chapters.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Show full syllabus
            </button>
          </div>
        )}

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
