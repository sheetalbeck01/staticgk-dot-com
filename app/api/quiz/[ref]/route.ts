import { NextResponse } from "next/server";
import { quizService } from "@/lib/container";
import {
  findNode as findStaticNode,
  nextTopic as nextStaticTopic,
} from "@/app/data/syllabus";
import { findNodeHi } from "@/app/data/syllabus-hi";
import { QUESTION_BANK } from "@/app/data/questions";
import type { Quiz } from "@/domain/entities";

export const runtime = "nodejs";

// GET /api/quiz/GK-014 — quiz payload from the database.
// Falls back to the static bank when the DB is empty/unreachable,
// so the UI keeps working before migration + seed.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const key = decodeURIComponent(ref).trim();
  if (!key) return NextResponse.json({ error: "Missing ref" }, { status: 400 });

  try {
    const quiz = await quizService.getQuiz(key);
    if (quiz && quiz.questions.length > 0) {
      const nextRef = quiz.topicRefForNext
        ? await quizService.nextTopicRef(quiz.topicRefForNext)
        : null;
      return NextResponse.json({ ...quiz, nextRef, source: "db" as const });
    }
    if (quiz) {
      // Known ref, bank not seeded yet
      return NextResponse.json(
        { error: `Questions for ${quiz.ref} are being added`, ref: quiz.ref },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Quiz DB lookup failed, trying static fallback:", err);
  }

  const fallback = staticQuiz(key);
  if (!fallback) {
    // Known Hindi ref without a question bank yet → coming-soon card
    const hi = findNodeHi(key);
    if (hi) {
      return NextResponse.json(
        {
          error: `Questions for ${key.toUpperCase()} are being added`,
          ref: key.toUpperCase(),
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: `No quiz found for "${key}"` },
      { status: 404 }
    );
  }
  return NextResponse.json({ ...fallback, source: "static" as const });
}

function staticQuiz(key: string) {
  const node = findStaticNode(key);
  if (!node) return null;

  if (node.kind === "chapter") {
    const questions = node.chapter.topics.flatMap(
      (t) => QUESTION_BANK[t.ref] ?? []
    );
    if (questions.length === 0) return null;
    const quiz: Quiz = {
      ref: node.chapter.ref,
      title: node.chapter.title,
      crumb: `${node.chapter.ref} • Chapter Quiz`,
      scopeKind: "chapter",
      topicRefForNext: null,
      questions,
    };
    return { ...quiz, nextRef: null as string | null };
  }

  const questions = QUESTION_BANK[node.topic.ref] ?? [];
  if (questions.length === 0) return null;
  const quiz: Quiz = {
    ref: node.kind === "topic" ? node.topic.ref : key.toUpperCase(),
    title: node.kind === "topic" ? node.topic.title : node.subtopic.title,
    crumb:
      node.kind === "topic"
        ? `${node.chapter.ref} • ${node.chapter.title}`
        : `${node.topic.ref} • ${node.topic.title}`,
    scopeKind: node.kind,
    topicRefForNext: node.topic.ref,
    questions,
  };
  return {
    ...quiz,
    nextRef: nextStaticTopic(node.topic.ref)?.topic.ref ?? null,
  };
}
