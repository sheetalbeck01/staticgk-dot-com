"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GC_TIME, STALE_TIME } from "../../../query-provider";
import Link from "next/link";

type ApiQuestion = {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
};

type QuizPayload = {
  ref: string;
  title: string;
  crumb: string;
  scopeKind: "chapter" | "topic" | "subtopic";
  questions: ApiQuestion[];
  nextRef: string | null;
};

type Status = "loading" | "ready" | "empty" | "missing" | "error";

type QuizResult =
  | { kind: "ready"; quiz: QuizPayload }
  | { kind: "empty"; ref: string; title: string }
  | { kind: "missing" };

async function fetchQuiz(ref: string): Promise<QuizResult> {
  const res = await fetch(`/api/quiz/${encodeURIComponent(ref)}`);
  if (res.status === 404) {
    const body = await res.json().catch(() => ({}));
    if (body?.ref) {
      return { kind: "empty", ref: body.ref, title: body.error ?? "" };
    }
    return { kind: "missing" };
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as QuizPayload;
  if (!data.questions || data.questions.length === 0) {
    return { kind: "empty", ref: data.ref, title: data.title };
  }
  return { kind: "ready", quiz: data };
}

export default function QuizPage() {
  const params = useParams();
  const raw = params.ref;
  const ref = decodeURIComponent(Array.isArray(raw) ? raw[0] ?? "" : raw ?? "");
  const queryClient = useQueryClient();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  // Cached: revisits within 5 min reuse data, no new request.
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quiz", ref],
    queryFn: () => fetchQuiz(ref),
    enabled: ref.length > 0,
  });

  // Fresh attempt state per quiz
  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
  }, [ref]);

  const status: Status = isLoading
    ? "loading"
    : isError
      ? "error"
      : !data
        ? "loading"
        : data.kind === "ready"
          ? "ready"
          : data.kind;
  const quiz: QuizPayload | null =
    data?.kind === "ready"
      ? data.quiz
      : data?.kind === "empty"
        ? {
            ref: data.ref,
            title: data.title,
            crumb: "",
            scopeKind: "topic",
            questions: [],
            nextRef: null,
          }
        : null;

  const questions = quiz?.questions ?? [];
  const finished = status === "ready" && answers.length >= questions.length;
  const score = questions.filter((qq, i) => answers[i] === qq.answer).length;
  const pct = questions.length === 0 ? 0 : Math.round((score / questions.length) * 100);

  // Persist finished attempts (best-effort; works once signed in)
  // + warm the cache for the next topic so "Next" opens instantly.
  useEffect(() => {
    if (!finished || !quiz) return;
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scopeKind: quiz.scopeKind,
        scopeRef: quiz.ref,
        total: questions.length,
        correct: score,
      }),
    }).catch(() => {});
    if (quiz.nextRef) {
      queryClient.prefetchQuery({
        queryKey: ["quiz", quiz.nextRef],
        queryFn: () => fetchQuiz(quiz.nextRef as string),
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
  }

  function goNext() {
    if (selected === null) return;
    setAnswers((a) => [...a, selected]);
    setSelected(null);
    setIndex((v) => v + 1);
  }

  function retry() {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
  }

  const current = questions[index];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors">
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6">
        {status === "loading" && (
          <div className="rounded-3xl border border-slate-200 p-12 text-center">
            <p className="text-4xl animate-pulse">📝</p>
            <p className="mt-3 font-bold">Loading quiz {ref.toUpperCase()}…</p>
          </div>
        )}

        {(status === "missing" || status === "error") && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-4xl">{status === "missing" ? "🔍" : "⚠️"}</p>
            <p className="mt-3 text-xl font-bold">
              {status === "missing"
                ? `No quiz found for “${ref}”`
                : "Could not load the quiz"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {status === "missing"
                ? "Check the ref no. in your book, or pick a topic from the dashboard."
                : "Check your connection and try again."}
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Back to Dashboard
            </Link>
          </div>
        )}

        {status === "empty" && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <p className="inline-block rounded-lg bg-brand-100 px-3 py-1 font-mono text-sm font-bold text-brand-800">
              {quiz?.ref ?? ref.toUpperCase()}
            </p>
            <p className="mt-3 text-xl font-bold">
              {quiz?.title || "Questions coming soon"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Questions for this topic are being added. Try GK-001, GK-014,
              GK-015, GK-023 or GK-032 for now.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Back to Dashboard
            </Link>
          </div>
        )}

        {status === "ready" && quiz && finished && (
          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center transition-colors">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-500">
                {quiz.ref} • {quiz.title}
              </p>
              <p className="mt-3 text-6xl font-extrabold">{pct}%</p>
              <p className="mt-2 text-slate-600">
                {score} of {questions.length} correct —{" "}
                {pct >= 80
                  ? "Excellent! Note the ref in your book. 🎉"
                  : pct >= 50
                    ? "Good progress — revise and retry. 💪"
                    : "Read the topic again, then retry. 📖"}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  onClick={retry}
                  className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
                >
                  Retry Quiz
                </button>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-500"
                >
                  Dashboard
                </Link>
                {quiz.nextRef && (
                  <Link
                    href={`/quiz/${quiz.nextRef}`}
                    className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-500"
                  >
                    Next: {quiz.nextRef} →
                  </Link>
                )}
              </div>
            </div>

            {/* Review */}
            <h2 className="mt-8 text-lg font-bold">Review answers</h2>
            <div className="mt-3 space-y-3">
              {questions.map((qq, i) => {
                const ok = answers[i] === qq.answer;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 p-4 transition-colors"
                  >
                    <p className="text-sm font-bold">
                      Q{i + 1}. {qq.q}
                    </p>
                    <p
                      className={`mt-2 text-sm font-medium ${ok ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {ok ? "✓" : "✕"} Your answer:{" "}
                      {qq.options[answers[i]] ?? "—"}
                    </p>
                    {!ok && (
                      <p className="mt-1 text-sm font-medium text-emerald-600">
                        ✓ Correct: {qq.options[qq.answer]}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      {qq.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {status === "ready" && quiz && !finished && current && (
          <div>
            {/* Quiz head */}
            <p className="text-sm font-medium text-slate-500">
              <Link href="/dashboard" className="hover:text-brand-500">
                Dashboard
              </Link>{" "}
              / {quiz.crumb}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-brand-100 px-2.5 py-1 font-mono text-xs font-bold text-brand-800">
                {quiz.ref}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {quiz.title}
              </h1>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${(index / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Q{index + 1} / {questions.length}
              </span>
            </div>

            {/* Question card */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 transition-colors sm:p-8">
              <p className="text-lg font-bold leading-relaxed">{current.q}</p>
              <div className="mt-5 space-y-2.5">
                {current.options.map((opt, i) => {
                  const locked = selected !== null;
                  const isAnswer = i === current.answer;
                  const isPicked = i === selected;
                  let cls =
                    "border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:bg-brand-50";
                  if (locked && isAnswer)
                    cls =
                      "border-emerald-500 bg-emerald-50 text-emerald-800";
                  else if (locked && isPicked)
                    cls =
                      "border-red-400 bg-red-50 text-red-700";
                  else if (locked) cls += " opacity-60";
                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      disabled={locked}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${locked ? "cursor-default" : "active:scale-[0.99]"} ${cls}`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold opacity-70">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {locked && isAnswer && <span className="ml-auto">✓</span>}
                      {locked && isPicked && !isAnswer && (
                        <span className="ml-auto">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm transition-colors">
                  <p className="font-bold">
                    {selected === current.answer ? "✓ Correct!" : "✕ Not quite."}
                  </p>
                  <p className="mt-1 text-slate-600">
                    {current.explanation}
                  </p>
                  <button
                    onClick={goNext}
                    className="mt-3 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    {index + 1 === questions.length
                      ? "See Results →"
                      : "Next Question →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
