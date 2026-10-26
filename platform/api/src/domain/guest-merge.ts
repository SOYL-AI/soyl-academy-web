/**
 * POST /v1/me/merge-guest (ARCHITECTURE §3.2, API-RL-2 "once per account", AC-23).
 *
 * - Once per account: `profiles.guest_merged_at` is set in the same transaction (row locked), so a
 *   replay or a parallel second call returns `alreadyMerged: true` and changes nothing.
 * - Only ids that exist are kept: chapters in the current academic year, practice questions that are
 *   current, student-visible and in the practice pool. Unknown ids are counted, not stored.
 * - Completion state is stored as `xp_events` (idempotent per user/kind/source): completed lessons
 *   (`lesson_completed`, source `guest:chapter`) and correctly answered practice questions
 *   (`practice`, source `guest:question`). AC-23: small XP per item and a hard total cap.
 * - Positions of unfinished lessons have no table yet (schema request in the handoff); they are counted
 *   in `ignored.positionsNotStored` so the web keeps them locally until that lands.
 */
import { and, eq, inArray } from 'drizzle-orm';
import { chapters, istDay, profiles, questions, xpEvents, type Database } from '@soyl/db';
import { GUEST_MERGE } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import type { GuestProgress, MergeGuestResponse } from '../contract/guest';

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
        ignored: { unknownChapters: 0, unknownQuestions: 0, positionsNotStored: 0 },
        profileUpdated: false,
      };
    }

    const now = new Date(clock.now());
    const day = istDay(now);

    const chapterKeys = [...new Set([...payload.lessons.map((l) => l.chapter), ...payload.practice.map((p) => p.chapter)])];
    const knownChapters = new Set(
      chapterKeys.length
        ? (await tx.select({ key: chapters.key }).from(chapters).where(and(inArray(chapters.key, chapterKeys), eq(chapters.academicYear, academicYear)))).map((r) => r.key)
        : [],
    );

    const correctKeys = [...new Set(payload.practice.filter((p) => p.correct && knownChapters.has(p.chapter)).map((p) => p.question))];
    const knownQuestions = new Set(
      correctKeys.length
        ? (
            await tx
              .select({ key: questions.key })
              .from(questions)
              .where(
                and(
                  inArray(questions.key, correctKeys),
                  eq(questions.isCurrent, true),
                  eq(questions.pool, 'practice'),
                  inArray(questions.status, ['published', 'reviewed']),
                ),
              )
          ).map((r) => r.key)
        : [],
    );

    let xpLeft: number = GUEST_MERGE.maxTotalXp;
    const rows: (typeof xpEvents.$inferInsert)[] = [];
    const completed = [...new Set(payload.lessons.filter((l) => l.completed && knownChapters.has(l.chapter)).map((l) => l.chapter))];
    for (const chapter of completed) {
      const amount = Math.min(GUEST_MERGE.xpPerLessonCompleted, xpLeft);
      if (amount <= 0) break;
      xpLeft -= amount;
      rows.push({ userId, kind: 'lesson_completed', amount, sourceType: 'guest:chapter', sourceId: chapter, istDay: day, createdAt: now, updatedAt: now });
    }
    const correct = correctKeys.filter((k) => knownQuestions.has(k));
    for (const question of correct) {
      const amount = Math.min(GUEST_MERGE.xpPerPracticeCorrect, xpLeft);
      if (amount <= 0) break;
      xpLeft -= amount;
      rows.push({ userId, kind: 'practice', amount, sourceType: 'guest:question', sourceId: question, istDay: day, createdAt: now, updatedAt: now });
    }
    let inserted: { amount: number; kind: string }[] = [];
    if (rows.length)
      inserted = await tx.insert(xpEvents).values(rows).onConflictDoNothing().returning({ amount: xpEvents.amount, kind: xpEvents.kind });

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

    const uniqueQuestionsAll = new Set(payload.practice.filter((p) => p.correct).map((p) => p.question));
    return {
      merged: true,
      alreadyMerged: false,
      mergedAt: now.toISOString(),
      lessonsCompleted: inserted.filter((r) => r.kind === 'lesson_completed').length,
      practiceCorrect: inserted.filter((r) => r.kind === 'practice').length,
      xpAwarded: inserted.reduce((s, r) => s + r.amount, 0),
      ignored: {
        unknownChapters: chapterKeys.filter((k) => !knownChapters.has(k)).length,
        unknownQuestions: [...uniqueQuestionsAll].filter((k) => !knownQuestions.has(k)).length,
        positionsNotStored: payload.lessons.filter((l) => !l.completed).length,
      },
      profileUpdated,
    };
  });
}

