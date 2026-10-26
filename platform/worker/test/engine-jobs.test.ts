/**
 * Test-engine jobs (ADR-012): attempts.auto-submit grades expired attempts (deadline + grace) with
 * the API's own finalisation code; live.finalize ranks a live mock after its window and publishes
 * the results. Handlers are called directly with a fixed `now`, as pg-boss would.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { attempts, boards, chapters, classes, liveEvents, liveRegistrations, questionKeys, questionRow, questions, responses, splitQuestion, subjects, testItems, tests } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { allJobs, autoSubmitAttempts, finalizeLive, JOB_NAMES } from '../src/jobs';
import { memoryLogger } from '../src/logger';
import { makeUser, NOW } from './helpers';

let t: TestDb;
const log = memoryLogger();
const MIN = 60_000;
let fixture: { testId: string; itemId: string; liveTestId: string; liveItemId: string };

beforeAll(async () => {
  t = await createTestDb();
  const [b] = await t.db.insert(boards).values({ code: 'cbse', name: 'CBSE' }).returning();
  const [c] = await t.db.insert(classes).values({ boardId: b!.id, level: 10, exam: 'cbse', name: 'Class 10' }).returning();
  const [s] = await t.db
    .insert(subjects)
    .values({ key: 'cbse-10-science', academicYear: '2026-27', boardId: b!.id, classId: c!.id, exam: 'cbse', classLevel: 10, code: '086', name: 'Science', language: 'en', script: 'Latn', tier: 'core', wave: 1, priority: 1, theoryOnly: false, hasBoardExam: true, sourceStatus: 'verified', source: 'test' })
    .returning();
  const [ch] = await t.db.insert(chapters).values({ subjectId: s!.id, key: 'cbse-10-science-ch01', academicYear: '2026-27', number: 1, title: 'Chemical reactions' }).returning();
  const q = {
    id: 'q_worker_0001',
    unit: 'cbse-10-science-ch01',
    type: 'mcq' as const,
    stem_md: 'Which gas turns lime water milky?',
    options: [
      { id: 'a', text_md: 'Oxygen' },
      { id: 'b', text_md: 'Carbon dioxide' },
      { id: 'c', text_md: 'Hydrogen' },
    ],
    match_right: [],
    answer: { option_ids: ['b'] },
    solution_md: 'Carbon dioxide forms calcium carbonate.',
    marking_scheme: [{ step: 'option', marks: 1 }],
    marks: 1,
    difficulty: 1,
    competency: 'recall' as const,
    bloom: 'remember' as const,
    topic_ids: ['cbse-10-science-ch01-t01'],
    expected_time_sec: 30,
    assets: [],
    language: 'en',
    children: [],
    status: 'published' as const,
    version: 1,
  };
  const [row] = await t.db.insert(questions).values(questionRow(q, { chapterId: ch!.id, academicYear: '2026-27' })).returning();
  await t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(q).key });
  const mk = async (key: string, kind: string) => {
    const def = { id: key, kind, paper_type: 'chapter-test-short', blueprint_id: null, title: key, subject_id: 'cbse-10-science', chapter_ids: ['cbse-10-science-ch01'], duration_min: 10, total_marks: 1, shuffle: false, sections: [{ id: 'A', title: 'A', instructions: '', items: [{ question_id: q.id, question_version: 1, marks: 1, choice_group: null }], choice_groups: [] }], seed: null, version: 1 };
    const [tt] = await t.db
      .insert(tests)
      .values({ key, academicYear: '2026-27', kind, paperType: 'chapter-test-short', subjectId: s!.id, chapterKeys: ['cbse-10-science-ch01'], title: key, durationMin: 10, totalMarks: 1, status: 'published', definition: def })
      .returning();
    const [it] = await t.db.insert(testItems).values({ testId: tt!.id, questionId: row!.id, sectionId: 'A', position: 1, marks: 1 }).returning();
    return { testId: tt!.id, itemId: it!.id };
  };
  const normal = await mk('t_worker_ch01_short', 'chapter');
  const live = await mk('t_worker_live_1', 'live');
  fixture = { testId: normal.testId, itemId: normal.itemId, liveTestId: live.testId, liveItemId: live.itemId };
});
afterAll(async () => {
  await t?.close();
});

async function inProgress(testId: string, startedAt: Date, liveEventId: string | null = null) {
  const userId = await makeUser(t.db);
  const [a] = await t.db
    .insert(attempts)
    .values({ userId, testId, liveEventId, status: 'in_progress', startedAt, deadlineAt: new Date(startedAt.getTime() + 10 * MIN), shuffleSeed: 'x' })
    .returning();
  return { userId, attempt: a! };
}

describe('attempts.auto-submit', () => {
  it('grades attempts past deadline + grace only, with what was saved; re-runs are no-ops', async () => {
    const late = await inProgress(fixture.testId, new Date(NOW.getTime() - 20 * MIN)); // deadline NOW − 10 min
    await t.db.insert(responses).values({ attemptId: late.attempt.id, testItemId: fixture.itemId, answer: { option_ids: ['b'] }, clientSeq: 1 });
    const inGrace = await inProgress(fixture.testId, new Date(NOW.getTime() - 11 * MIN)); // deadline NOW − 1 min
    const ctx = { db: t.db, now: NOW, log };
    expect(await autoSubmitAttempts(ctx)).toEqual({ submitted: 1, failed: 0 });
    const [a] = await t.db.select().from(attempts).where(eq(attempts.id, late.attempt.id));
    expect(a).toMatchObject({ status: 'auto_submitted', autoScore: 1, score: 1, maxScore: 1, countsForStats: true });
    expect(a!.submittedAt!.getTime()).toBe(late.attempt.deadlineAt!.getTime());
    const [b] = await t.db.select().from(attempts).where(eq(attempts.id, inGrace.attempt.id));
    expect(b!.status).toBe('in_progress');
    expect(await autoSubmitAttempts(ctx)).toEqual({ submitted: 0, failed: 0 });
    // After its grace the second one goes too.
    expect(await autoSubmitAttempts({ ...ctx, now: new Date(NOW.getTime() + TEST_ENGINE.graceSeconds.normal * 1000) })).toEqual({ submitted: 1, failed: 0 });
  });
});

describe('live.finalize', () => {
  it('auto-submits what is left after the window, ranks by auto score then time, publishes once', async () => {
    const startsAt = new Date(NOW.getTime() - 60 * MIN);
    const [ev] = await t.db
      .insert(liveEvents)
      .values({ key: 'live_worker_1', academicYear: '2026-27', testId: fixture.liveTestId, title: 'Live', registrationOpensAt: new Date(startsAt.getTime() - 86_400_000), startsAt, lateStartMinutes: 15, endsAt: new Date(startsAt.getTime() + 10 * MIN) })
      .returning();
    const first = await inProgress(fixture.liveTestId, startsAt, ev!.id);
    const second = await inProgress(fixture.liveTestId, new Date(startsAt.getTime() + 2 * MIN), ev!.id);
    const wrong = await inProgress(fixture.liveTestId, startsAt, ev!.id);
    for (const [a, opt] of [
      [first, 'b'],
      [second, 'b'],
      [wrong, 'a'],
    ] as const) {
      await t.db.insert(responses).values({ attemptId: a.attempt.id, testItemId: fixture.liveItemId, answer: { option_ids: [opt] }, clientSeq: 1 });
      await t.db.insert(liveRegistrations).values({ liveEventId: ev!.id, userId: a.userId });
    }
    const noShow = await makeUser(t.db);
    await t.db.insert(liveRegistrations).values({ liveEventId: ev!.id, userId: noShow });
    const r = await finalizeLive({ db: t.db, now: NOW, log });
    expect(r).toMatchObject({ events: 1, autoSubmitted: 3, ranked: 3 });
    const regs = await t.db.select().from(liveRegistrations).where(eq(liveRegistrations.liveEventId, ev!.id));
    const rank = (u: string) => regs.find((x) => x.userId === u)!;
    // Both right answers were auto-submitted at their own deadlines after the full 10 minutes: equal
    // marks and equal time, so they share rank 1 (competition ranking).
    expect(rank(first.userId).finalRank).toBe(1);
    expect(rank(second.userId).finalRank).toBe(1);
    expect(rank(wrong.userId).finalRank).toBe(3);
    expect(rank(noShow).finalRank).toBeNull();
    expect(Number(rank(wrong.userId).percentile)).toBe(0);
    const [after] = await t.db.select().from(liveEvents).where(eq(liveEvents.id, ev!.id));
    expect(after!.status).toBe('results_published');
    expect(await finalizeLive({ db: t.db, now: NOW, log })).toEqual({ events: 0, autoSubmitted: 0, ranked: 0 });
  });

  it('runs every 5 minutes; auto-submit every minute', () => {
    const jobs = allJobs();
    expect(jobs.find((j) => j.name === JOB_NAMES.liveFinalize)!.cron).toBe('*/5 * * * *');
    expect(jobs.find((j) => j.name === JOB_NAMES.attemptsAutoSubmit)!.cron).toBe('* * * * *');
  });
});
