import { SYLLABUS } from "@/app/data/syllabus";

export type ReviewItem = {
  ref: string;
  title: string;
  chapter: string;
  /** days overdue; 0 = due today */
  daysOverdue: number;
};

// Demo schedule until the spaced-repetition system lands.
// Negative offset = overdue by N days, 0 = due today.
// TODO(SRS): replace with SM-2 scheduling backed by QuizAttempt history.
const DEMO_SCHEDULE: Record<string, number> = {
  "GK-001": -3,
  "GK-023": -1,
  "GK-002": 0,
  "GK-015": 0,
  "GK-032": 0,
  "GK-036": 0,
};

export function getRevisionQueue(): { today: ReviewItem[]; overdue: ReviewItem[] } {
  const today: ReviewItem[] = [];
  const overdue: ReviewItem[] = [];

  for (const chapter of SYLLABUS) {
    for (const topic of chapter.topics) {
      const offset = DEMO_SCHEDULE[topic.ref];
      if (offset === undefined) continue;
      const item: ReviewItem = {
        ref: topic.ref,
        title: topic.title,
        chapter: chapter.title,
        daysOverdue: Math.max(0, -offset),
      };
      if (offset < 0) overdue.push(item);
      else today.push(item);
    }
  }

  overdue.sort((a, b) => b.daysOverdue - a.daysOverdue);
  return { today, overdue };
}
