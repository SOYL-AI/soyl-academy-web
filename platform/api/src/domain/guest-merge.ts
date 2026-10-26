/**
 * POST /v1/me/merge-guest (ARCHITECTURE §3.2, API-RL-2 "once per account", AC-23).
 *
 * - Once per account: `profiles.guest_merged_at` is set in the same transaction (row locked), so a
 *   replay or a parallel second call returns `alreadyMerged: true` and changes nothing.
 * - Only ids that exist are kept: chapters in the current academic year, practice questions that are
 *   in the chapter's active release (ADR-006; current rows when it has none), student-visible and in
 *   the practice pool (of the chapter they were posted with), deck parts that are published. Unknown ids are counted, not stored.
 * - M2: lesson positions go to `lesson_progress` (source guest_merge). If the account already has a
 *   position for that chapter part, the further slide and the earlier completion win. Practice
 *   answers go to `practice_answers` (source guest_merge, response null): the latest guest answer per
 *   question, at most one per user and question (unique index), so the merge is idempotent even
 *   without the once-per-account flag.
 * - XP (AC-23): completed lessons (`lesson_completed`, source `guest:chapter`) and correctly answered
 *   practice questions (`practice`, source `guest:question`), small amounts with a hard total cap.
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import { chapters, decks, istDay, lessonProgress, practiceAnswers, profiles, questions, xpEvents, type Database } from '@soyl/db';
import { GUEST_MERGE } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import type { GuestProgress, MergeGuestResponse } from '../contract/guest';
import { activeReleases, releaseMembers, STUDENT_VISIBLE } from './content';
import { refreshTotals } from './gamification';

export async function mergeGuestProgress(
  db: Database,
  clock: Clock,
  userId: string,
  academicYear: string,
  payload: GuestProgress,
): Promise<MergeGuestResponse> {
  return db.transaction(async (tx) => {
    await tx.insert(profiles).values({ userId }).onConflictDoNothing();
    const [profile] = await tx.select().from(profiles).where(eq(profiles.userId, userId)).for('update');
    if (profile!.guestMergedAt) {
      return {
        merged: false,
        alreadyMerged: true,
        mergedAt: profile!.guestMergedAt.toISOString(),
        lessonsCompleted: 0,
        practiceCorrect: 0,
        xpAwarded: 0,
        lessonsStored: 0,
        practiceStored: 0,
        ignored: { unknownChapters: 0, unknownQuestions: 0, positionsNotStored: 0 },
        profileUpdated: false,
      };
    }

    const now = new Date(clock.now());
    const day = istDay(now);
    const notFuture = (iso: string) => new Date(Math.min(new Date(iso).getTime(), now.getTime()));

    const chapterKeys = [...new Set([...payload.lessons.map((l) => l.chapter), ...payload.practice.map((p) => p.chapter)])];
    const chapterRows = chapterKeys.length
      ? await tx.select({ id: chapters.id, key: chapters.key }).from(chapters).where(and(inArray(chapters.key, chapterKeys), eq(chapters.academicYear, academicYear)))
      : [];
    const chapterId = new Map(chapterRows.map((r) => [r.key, r.id]));

    // Which version rows count: the chapter's active release (ADR-006), else the current rows.
    const active = await activeReleases(tx as unknown as Database, [...chapterId.values()], academicYear);
    const inScope = (members: Set<string>, row: { id: string; chapterId: string; isCurrent: boolean }) => (active.has(row.chapterId) ? members.has(row.id) : row.isCurrent);

    // Practice questions: in scope, visible, practice pool, in the chapter the answer was posted with.
    const questionKeys = [...new Set(payload.practice.filter((p) => chapterId.has(p.chapter)).map((p) => p.question))];
    const questionRows = questionKeys.length
      ? await tx
          .select({ id: questions.id, key: questions.key, version: questions.version, chapterId: questions.chapterId, marks: questions.marks, isCurrent: questions.isCurrent })
          .from(questions)
          .where(and(inArray(questions.key, questionKeys), eq(questions.pool, 'practice'), inArray(questions.status, [...STUDENT_VISIBLE])))
      : [];
    const questionMembers = await releaseMembers(tx as unknown as Database, [...active.values()], 'question');
    const questionByKey = new Map(questionRows.filter((q) => inScope(questionMembers, q)).map((q) => [q.key, q]));
    const knownAnswer = (p: GuestProgress['practice'][number]) => {
      const q = questionByKey.get(p.question);
      return q && q.chapterId === chapterId.get(p.chapter) ? q : null;
    };

    // ---- lesson positions → lesson_progress -----------------------------------------------------
    const knownChapterIds = [...new Set(payload.lessons.map((l) => chapterId.get(l.chapter)).filter((x): x is string => !!x))];
    const deckRows = knownChapterIds.length
      ? await tx
          .select({ id: decks.id, chapterId: decks.chapterId, isCurrent: decks.isCurrent, part: sql<number>`coalesce(${decks.part}, 0)::int`, slideCount: decks.slideCount })
          .from(decks)
          .where(and(inArray(decks.chapterId, knownChapterIds), inArray(decks.status, [...STUDENT_VISIBLE]), eq(decks.academicYear, academicYear)))
      : [];
    const deckMembers = await releaseMembers(tx as unknown as Database, [...active.values()], 'deck');
    const partsOf = new Map<string, { part: number; slideCount: number }[]>();
    for (const d of deckRows.filter((r) => inScope(deckMembers, r))) partsOf.set(d.chapterId, [...(partsOf.get(d.chapterId) ?? []), { part: d.part, slideCount: d.slideCount }].sort((a, b) => a.part - b.part));

    const positions = new Map<string, typeof lessonProgress.$inferInsert>();
    for (const l of payload.lessons) {
      const cid = chapterId.get(l.chapter);
      const parts = cid ? partsOf.get(cid) : undefined;
      if (!cid || !parts?.length) continue;
      const deck = l.part === undefined ? parts[0] : parts.find((p) => p.part === l.part);
      if (!deck) continue;
      const slide = Math.min(l.slide, Math.max(0, deck.slideCount - 1));
      const key = `${cid}:${deck.part}`;
      const prev = positions.get(key);
      const completedAt = l.completed ? notFuture(l.updatedAt) : null;
      positions.set(key, {
        userId,
        chapterId: cid,
        unit: l.chapter,
        part: deck.part,
        slidePosition: Math.max(slide, prev?.slidePosition ?? 0),
        mode: l.mode ?? prev?.mode ?? 'read',
        completedAt: prev?.completedAt && completedAt ? new Date(Math.min(prev.completedAt.getTime(), completedAt.getTime())) : (prev?.completedAt ?? completedAt),
        source: 'guest_merge',
        createdAt: now,
        updatedAt: now,
      });
    }
    let lessonsStored = 0;
    if (positions.size) {
      const stored = await tx
        .insert(lessonProgress)
        .values([...positions.values()])
        .onConflictDoUpdate({
          target: [lessonProgress.userId, lessonProgress.chapterId, lessonProgress.part],
          set: {
            slidePosition: sql`greatest(${lessonProgress.slidePosition}, excluded.slide_position)`,
            completedAt: sql`least(${lessonProgress.completedAt}, excluded.completed_at)`,
            updatedAt: now,
          },
        })
        .returning({ id: lessonProgress.id });
      lessonsStored = stored.length;
    }

    // ---- practice answers → practice_answers (latest guest answer per question) -----------------
    const latest = new Map<string, GuestProgress['practice'][number]>();
    for (const p of payload.practice) {
      if (!knownAnswer(p)) continue;
      const prev = latest.get(p.question);
      if (!prev || p.answeredAt >= prev.answeredAt) latest.set(p.question, p);
    }
    let practiceStored = 0;
    if (latest.size) {
      const stored = await tx
        .insert(practiceAnswers)
        .values(
          [...latest.values()].map((p) => {
            const q = knownAnswer(p)!;
            return {
              userId,
              questionId: q.id,
              questionKey: q.key,
              questionVersion: q.version,
              chapterId: q.chapterId,
              response: null,
              correct: p.correct,
              marksAwarded: p.correct ? Number(q.marks) : 0,
              maxMarks: Number(q.marks),
              grading: 'auto' as const,
              answeredAt: notFuture(p.answeredAt),
              source: 'guest_merge' as const,
              createdAt: now,
              updatedAt: now,
            };
          }),
        )
        .onConflictDoNothing()
        .returning({ id: practiceAnswers.id });
      practiceStored = stored.length;
    }

    // ---- XP (AC-23, capped) -----------------------------------------------------------------------
    let xpLeft: number = GUEST_MERGE.maxTotalXp;
    const rows: (typeof xpEvents.$inferInsert)[] = [];
    const completed = [...new Set(payload.lessons.filter((l) => l.completed && chapterId.has(l.chapter)).map((l) => l.chapter))];
    for (const chapter of completed) {
      const amount = Math.min(GUEST_MERGE.xpPerLessonCompleted, xpLeft);
      if (amount <= 0) break;
      xpLeft -= amount;
      rows.push({ userId, kind: 'lesson_completed', amount, sourceType: 'guest:chapter', sourceId: chapter, istDay: day, createdAt: now, updatedAt: now });
    }
    const correct = [...new Set(payload.practice.filter((p) => p.correct && knownAnswer(p)).map((p) => p.question))];
    for (const question of correct) {
      const amount = Math.min(GUEST_MERGE.xpPerPracticeCorrect, xpLeft);
      if (amount <= 0) break;
      xpLeft -= amount;
      rows.push({ userId, kind: 'practice', amount, sourceType: 'guest:question', sourceId: question, istDay: day, createdAt: now, updatedAt: now });
    }
    let inserted: { amount: number; kind: string }[] = [];
    if (rows.length) inserted = await tx.insert(xpEvents).values(rows).onConflictDoNothing().returning({ amount: xpEvents.amount, kind: xpEvents.kind });
    if (inserted.length) await refreshTotals(tx, userId);

    let profileUpdated = false;
    const set: Partial<typeof profiles.$inferInsert> = { guestMergedAt: now };
    if (!profile!.board && payload.board) {
      set.board = payload.board;
      profileUpdated = true;
    }
    if (!profile!.classLevel && payload.classLevel) {
      set.classLevel = payload.classLevel;
      profileUpdated = true;
    }
    await tx.update(profiles).set(set).where(eq(profiles.userId, userId));

    const allQuestionKeys = new Set(payload.practice.map((p) => p.question));
    const knownKeys = new Set(payload.practice.filter((p) => knownAnswer(p)).map((p) => p.question));
    return {
      merged: true,
      alreadyMerged: false,
      mergedAt: now.toISOString(),
      lessonsCompleted: inserted.filter((r) => r.kind === 'lesson_completed').length,
      practiceCorrect: inserted.filter((r) => r.kind === 'practice').length,
      xpAwarded: inserted.reduce((s, r) => s + r.amount, 0),
      lessonsStored,
      practiceStored,
      ignored: {
        unknownChapters: chapterKeys.filter((k) => !chapterId.has(k)).length,
        unknownQuestions: [...allQuestionKeys].filter((k) => !knownKeys.has(k)).length,
        positionsNotStored: 0,
      },
      profileUpdated,
    };
  });
}
