/**
 * Test catalogue (ARCHITECTURE §4.1 tests, CONTEXT §10; ADR-012).
 *
 *   GET /v1/test-series?board&class&subject   everything a subject offers: chapter tests, unit tests,
 *                                              term papers, full mocks (per paper variant), the CBSE 10
 *                                              second-exam track and the live mocks; signed in: the
 *                                              caller's status per test (attempts, best score, active attempt)
 *   GET /v1/tests/:id                          one test's metadata — sections, durations, marks,
 *                                              instructions — never its questions (AC-11)
 *
 * Only the latest published version of each test key is listed; custom tests never appear here.
 */
import { and, asc, desc, eq, inArray, isNull, ne, sql } from 'drizzle-orm';
import { attempts, boards, chapters, liveEvents, subjects, testItems, testSeries, tests, type Database } from '@soyl/db';
import { ApiProblem } from '../../errors';
import { accessibleTest, type EngineContext } from './attempts';
import { outlineSections } from './delivery';
import { eventDto, liveEventForTest } from './live';
import { loadStructure, type TestRow } from './load';

export type SeriesKind = 'chapter' | 'unit' | 'term' | 'full' | 'second_exam' | 'live';

export interface MyTestStatus {
  attempts: number;
  bestScore: number | null;
  lastScore: number | null;
  maxScore: number | null;
  activeAttemptId: string | null;
  lastAttemptId: string | null;
}

/** Resolves `subject` (a key such as cbse-10-science, or its last part such as science) for a board and class. */
export async function resolveSubject(db: Database, year: string, q: { board?: 'cbse' | 'cisce'; classLevel?: number; subject: string }) {
  const rows = await db
    .select({ id: subjects.id, key: subjects.key, name: subjects.name, exam: subjects.exam, classLevel: subjects.classLevel, board: boards.code })
    .from(subjects)
    .innerJoin(boards, eq(boards.id, subjects.boardId))
    .where(and(eq(subjects.academicYear, year), q.subject.includes('-') && /^[a-z]+-\d+-/.test(q.subject) ? eq(subjects.key, q.subject) : sql`${subjects.key} LIKE ${`%-${q.subject.replace(/[%_]/g, '')}`}`));
  const match = rows.filter((r) => (!q.board || r.board === q.board) && (!q.classLevel || r.classLevel === q.classLevel) && (r.key === q.subject || r.key.endsWith(`-${q.classLevel ?? r.classLevel}-${q.subject}`)));
  if (match.length !== 1) throw new ApiProblem('not_found');
  return match[0]!;
}

function seriesKindOf(t: { kind: string; track: string | null }): SeriesKind {
  if (t.track === 'second_exam') return 'second_exam';
  if (t.kind === 'chapter' || t.kind === 'unit' || t.kind === 'term' || t.kind === 'live') return t.kind;
  return 'full';
}

const KIND_ORDER: SeriesKind[] = ['chapter', 'unit', 'term', 'full', 'second_exam', 'live'];
const KIND_TITLE: Record<SeriesKind, string> = {
  chapter: 'Chapter tests',
  unit: 'Unit tests',
  term: 'Term papers',
  full: 'Full-length mocks',
  second_exam: 'Second exam (May) track',
  live: 'All-India live mocks',
};

export async function myStatusByKey(db: Database, userId: string, testIds: string[]): Promise<Map<string, MyTestStatus>> {
  const out = new Map<string, MyTestStatus>();
  if (!testIds.length) return out;
  const rows = await db
    .select({ key: tests.key, id: attempts.id, status: attempts.status, score: attempts.score, maxScore: attempts.maxScore, createdAt: attempts.createdAt })
    .from(attempts)
    .innerJoin(tests, eq(tests.id, attempts.testId))
    .where(and(eq(attempts.userId, userId), inArray(tests.key, db.select({ key: tests.key }).from(tests).where(inArray(tests.id, testIds)))))
    .orderBy(asc(attempts.createdAt));
  for (const r of rows) {
    const s = out.get(r.key) ?? { attempts: 0, bestScore: null, lastScore: null, maxScore: null, activeAttemptId: null, lastAttemptId: null };
    if (r.status === 'created' || r.status === 'in_progress') s.activeAttemptId = r.id;
    else {
      s.attempts++;
      const score = r.score === null ? null : Number(r.score);
      s.lastScore = score;
      s.lastAttemptId = r.id;
      s.maxScore = r.maxScore === null ? null : Number(r.maxScore);
      if (score !== null && (s.bestScore === null || score > s.bestScore)) s.bestScore = score;
    }
    out.set(r.key, s);
  }
  return out;
}

export async function listTestSeries(ctx: EngineContext, userId: string | null, q: { board?: 'cbse' | 'cisce'; classLevel?: number; subject: string }) {
  const subject = await resolveSubject(ctx.db, ctx.year, q);
  const rows = await ctx.db
    .selectDistinctOn([tests.key], {
      id: tests.id,
      key: tests.key,
      version: tests.version,
      kind: tests.kind,
      paperType: tests.paperType,
      title: tests.title,
      durationMin: tests.durationMin,
      totalMarks: tests.totalMarks,
      chapterKeys: tests.chapterKeys,
      seriesPosition: tests.seriesPosition,
      seriesKey: testSeries.key,
      seriesTitle: testSeries.title,
      track: testSeries.track,
      questionCount: sql<number>`(SELECT count(*)::int FROM ${testItems} WHERE ${testItems.testId} = ${tests.id})`,
    })
    .from(tests)
    .leftJoin(testSeries, eq(testSeries.id, tests.seriesId))
    .where(and(eq(tests.subjectId, subject.id), eq(tests.academicYear, ctx.year), eq(tests.status, 'published'), isNull(tests.createdByUserId), ne(tests.kind, 'custom')))
    .orderBy(tests.key, desc(tests.version));
  const chapterRows = await ctx.db.select({ key: chapters.key, number: chapters.number, title: chapters.title }).from(chapters).where(eq(chapters.subjectId, subject.id));
  const chapterNo = new Map(chapterRows.map((c) => [c.key, c]));
  const mine = userId ? await myStatusByKey(ctx.db, userId, rows.map((r) => r.id)) : null;

  const groups = new Map<string, { id: string; kind: SeriesKind; title: string; tests: ReturnType<typeof summary>[] }>();
  function summary(r: (typeof rows)[number]) {
    const first = chapterNo.get(r.chapterKeys[0] ?? '');
    return {
      id: r.key,
      version: r.version,
      title: r.title,
      kind: r.kind,
      paperType: r.paperType,
      durationMin: r.durationMin,
      totalMarks: Number(r.totalMarks),
      questionCount: r.questionCount,
      chapterIds: [...r.chapterKeys],
      chapter: r.kind === 'chapter' && first ? { id: r.chapterKeys[0]!, number: first.number, title: first.title } : null,
      position: r.seriesPosition,
      me: mine ? (mine.get(r.key) ?? { attempts: 0, bestScore: null, lastScore: null, maxScore: null, activeAttemptId: null, lastAttemptId: null }) : null,
    };
  }
  for (const r of rows.filter((x) => x.kind !== 'live')) {
    const kind = seriesKindOf(r);
    const id = kind === 'chapter' ? 'chapter-tests' : (r.seriesKey ?? `${kind}-tests`);
    const g = groups.get(id) ?? { id, kind, title: kind === 'chapter' ? KIND_TITLE.chapter : (r.seriesTitle ?? KIND_TITLE[kind]), tests: [] };
    g.tests.push(summary(r));
    groups.set(id, g);
  }
  for (const g of groups.values())
    g.tests.sort((a, b) =>
      g.kind === 'chapter'
        ? (a.chapter?.number ?? 0) - (b.chapter?.number ?? 0) || a.paperType.localeCompare(b.paperType) * -1
        : (a.position ?? 0) - (b.position ?? 0) || a.id.localeCompare(b.id),
    );

  // Live mocks of this subject.
  const now = ctx.clock.now();
  const live = rows.filter((x) => x.kind === 'live');
  const events = live.length ? await ctx.db.select().from(liveEvents).where(inArray(liveEvents.testId, live.map((l) => l.id))).orderBy(asc(liveEvents.startsAt)) : [];
  const liveTests = new Map(live.map((l) => [l.id, l]));
  const series = [...groups.values()].sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || a.title.localeCompare(b.title));
  return {
    subject: { id: subject.key, name: subject.name, board: subject.board, classLevel: subject.classLevel },
    series,
    liveEvents: events.map((ev) => {
      const t = liveTests.get(ev.testId)!;
      return eventDto(ev, { key: t.key, durationMin: t.durationMin, totalMarks: Number(t.totalMarks), subjectKey: subject.key, subjectName: subject.name }, now, null);
    }),
  };
}

export const GENERAL_INSTRUCTIONS = [
  'The timer runs on the server: the time shown is a guide, and the test is submitted automatically at the deadline.',
  'Your answers are saved as you go. If you lose your connection, keep answering; they are sent when you are back online.',
  'Where a section says "attempt any", answer as many as you like: the best ones count.',
  'Written answers are marked by you against the marking scheme after you submit.',
];

export async function testMetadata(ctx: EngineContext, userId: string | null, key: string) {
  const test: TestRow = await accessibleTest(ctx, key, userId);
  const structure = await loadStructure(ctx.db, test);
  const ev = test.kind === 'live' ? await liveEventForTest(ctx.db, test.id) : null;
  const mine = userId ? (await myStatusByKey(ctx.db, userId, [test.id])).get(test.key) ?? { attempts: 0, bestScore: null, lastScore: null, maxScore: null, activeAttemptId: null, lastAttemptId: null } : null;
  const objective = structure.items.filter((i) => ['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match', 'ordering', 'code-output'].includes(i.question.type)).length;
  return {
    id: test.key,
    version: test.version,
    title: test.title,
    kind: test.kind,
    paperType: test.paperType,
    subject: { id: test.subject.key, name: test.subject.name, board: test.subject.board, classLevel: test.subject.classLevel },
    chapterIds: [...test.chapterKeys],
    durationMin: test.durationMin,
    totalMarks: test.totalMarks,
    questionCount: structure.items.length,
    autoGradedCount: objective,
    custom: !!test.createdByUserId,
    shuffle: test.shuffle,
    instructions: GENERAL_INSTRUCTIONS,
    sections: outlineSections(structure),
    live: ev ? eventDto(ev, { key: test.key, durationMin: test.durationMin, totalMarks: test.totalMarks, subjectKey: test.subject.key, subjectName: test.subject.name }, ctx.clock.now(), null) : null,
    me: mine,
  };
}
