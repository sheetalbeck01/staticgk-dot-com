import { prisma } from "../lib/prisma";
import { SYLLABUS } from "../app/data/syllabus";
import { QUESTION_BANK } from "../app/data/questions";

// Seeds the Lucent's GK catalog + static question bank.
// Run: npm run db:seed  (idempotent — safe to re-run)

async function main() {
  let chapterSort = 0;
  for (const ch of SYLLABUS) {
    chapterSort += 1;
    const chapter = await prisma.chapter.upsert({
      where: { ref: ch.ref },
      update: { title: ch.title, sort: chapterSort },
      create: { ref: ch.ref, title: ch.title, sort: chapterSort },
    });

    let topicSort = 0;
    for (const t of ch.topics) {
      topicSort += 1;
      const topic = await prisma.topic.upsert({
        where: { ref: t.ref },
        update: {
          title: t.title,
          questions: t.questions,
          sort: topicSort,
          chapterId: chapter.id,
        },
        create: {
          ref: t.ref,
          title: t.title,
          questions: t.questions,
          sort: topicSort,
          chapterId: chapter.id,
        },
      });

      let subSort = 0;
      for (const s of t.subtopics) {
        subSort += 1;
        await prisma.subtopic.upsert({
          where: { ref: s.ref },
          update: {
            title: s.title,
            questions: s.questions,
            sort: subSort,
            topicId: topic.id,
          },
          create: {
            ref: s.ref,
            title: s.title,
            questions: s.questions,
            sort: subSort,
            topicId: topic.id,
          },
        });
      }

      // Re-seed questions so static edits stay in sync
      await prisma.question.deleteMany({ where: { topicId: topic.id } });
      const bank = QUESTION_BANK[t.ref] ?? [];
      for (let i = 0; i < bank.length; i++) {
        const qb = bank[i];
        await prisma.question.create({
          data: {
            topicId: topic.id,
            text: qb.q,
            options: qb.options,
            answer: qb.answer,
            explanation: qb.explanation,
            sort: i,
          },
        });
      }
    }
  }
  const counts = {
    chapters: await prisma.chapter.count(),
    topics: await prisma.topic.count(),
    subtopics: await prisma.subtopic.count(),
    questions: await prisma.question.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
