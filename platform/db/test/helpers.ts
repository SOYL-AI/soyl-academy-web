import type pg from 'pg';
import { expect } from 'vitest';
import type { Question } from '@soyl/shared/content/question';
import type { TestDb } from '../src/testing';
import type { Database } from '../src/client';
import { uuidv7 } from '../src/ids';
import { questionRow, splitQuestion } from '../src/student-questions';
import { boards, chapters, classes, questionKeys, questions, subjects, testItems, tests, users } from '../schema/index';

/** Runs `fn` on one connection as the `soyl_app` role inside a transaction that is rolled back. */
export async function asApp<T>(t: TestDb, fn: (c: pg.PoolClient) => Promise<T>): Promise<T> {
  const c = await t.pool.connect();
  try {
    await c.query('BEGIN');
    await c.query('SET LOCAL ROLE soyl_app');
    return await fn(c);
  } finally {
    await c.query('ROLLBACK').catch(() => {});
    c.release();
  }
}

/** Expects a SQL statement to fail with a Postgres error whose code or message matches. */
export async function expectPgError(run: () => Promise<unknown>, match: { code?: string; message?: RegExp; constraint?: string }) {
  let err: (Error & { code?: string; constraint?: string }) | null = null;
  try {
    await run();
  } catch (e) {
    err = e as Error & { code?: string; constraint?: string };
  }
  expect(err, 'expected the statement to fail').not.toBeNull();
  // drizzle wraps driver errors; the pg error is the cause
  const pgErr = ((err as { cause?: unknown }).cause ?? err) as Error & { code?: string; constraint?: string };
  if (match.code) expect(pgErr.code).toBe(match.code);
  if (match.message) expect(pgErr.message).toMatch(match.message);
  if (match.constraint) expect(pgErr.constraint).toBe(match.constraint);
}

export const UNIQUE = '23505';
export const CHECK = '23514';
export const DENIED = '42501';

let n = 0;
export async function makeUser(db: Database, over: Partial<typeof users.$inferInsert> = {}) {
  n++;
  const [u] = await db
    .insert(users)
    .values({ name: `User ${n}`, email: `user${n}-${uuidv7().slice(-6)}@example.com`, ...over })
    .returning();
  return u!;
}

/** A minimal board → class → subject → chapter chain (without running the catalog seed). */
export async function makeChapter(db: Database) {
  const [b] = await db
    .insert(boards)
    .values({ code: 'cbse', name: 'CBSE' })
    .onConflictDoUpdate({ target: boards.code, set: { name: 'CBSE' } })
    .returning();
  const [c] = await db
    .insert(classes)
    .values({ boardId: b!.id, level: 10, exam: 'cbse', name: 'Class 10' })
    .onConflictDoUpdate({ target: [classes.boardId, classes.level], set: { name: 'Class 10' } })
    .returning();
  const suffix = uuidv7().slice(-4).replace(/[^a-z0-9]/g, 'x');
  const [s] = await db
    .insert(subjects)
    .values({
      key: `cbse-10-test${suffix}`,
      academicYear: '2026-27',
      boardId: b!.id,
      classId: c!.id,
      exam: 'cbse',
      classLevel: 10,
      code: null,
      name: 'Test subject',
      language: 'en',
      script: 'Latn',
      tier: 'core',
      wave: 1,
      priority: 1,
      theoryOnly: false,
      hasBoardExam: true,
      sourceStatus: 'verified',
      source: 'test',
    })
    .returning();
  const [ch] = await db
    .insert(chapters)
    .values({ subjectId: s!.id, key: `${s!.key}-ch01`, academicYear: '2026-27', number: 1, title: 'Test chapter' })
    .returning();
  return { board: b!, klass: c!, subject: s!, chapter: ch! };
}

export function sampleQuestion(unit: string, over: Partial<Question> = {}): Question {
  return {
    id: `q_test_${uuidv7().slice(-8).replace(/-/g, '')}`,
    unit,
    type: 'mcq',
    stem_md: 'Which gas do plants take in for photosynthesis?',
    options: [
      { id: 'a', text_md: 'Oxygen' },
      { id: 'b', text_md: 'Nitrogen' },
      { id: 'c', text_md: 'Carbon dioxide' },
    ],
    match_right: [],
    answer: { option_ids: ['c'] },
    solution_md: 'Plants take in carbon dioxide and release oxygen.',
    marking_scheme: [{ step: 'Correct option', marks: 1 }],
    marks: 1,
    difficulty: 1,
    competency: 'recall',
    bloom: 'remember',
    topic_ids: [`${unit}-t01`],
    expected_time_sec: 30,
    assets: [],
    language: 'en',
    children: [],
    status: 'published',
    version: 1,
    ...over,
  };
}

export async function insertQuestion(
  db: Database,
  chapter: { id: string; key: string },
  q: Question,
  opts: { pool?: 'practice' | 'test' | 'live_reserved'; embargoUntil?: Date | null } = {},
) {
  const [row] = await db
    .insert(questions)
    .values(questionRow(q, { chapterId: chapter.id, academicYear: '2026-27', ...opts }))
    .returning();
  const { key } = splitQuestion(q);
  await db.insert(questionKeys).values({ questionId: row!.id, ...key });
  return row!;
}

export async function makeTest(db: Database, subjectId: string, chapterKey: string, questionIds: string[]) {
  const [t] = await db
    .insert(tests)
    .values({
      key: `t_test_${uuidv7().slice(-8).replace(/-/g, '')}`,
      academicYear: '2026-27',
      kind: 'chapter',
      paperType: 'chapter-test-short',
      subjectId,
      chapterKeys: [chapterKey],
      title: 'Chapter test',
      durationMin: 30,
      totalMarks: questionIds.length,
      definition: {},
    })
    .returning();
  const items = [];
  for (const [i, qid] of questionIds.entries()) {
    const [it] = await db.insert(testItems).values({ testId: t!.id, questionId: qid, sectionId: 'A', position: i + 1, marks: 1 }).returning();
    items.push(it!);
  }
  return { test: t!, items };
}
