/**
 * Practice (ARCHITECTURE §4.1, CONTEXT §5): paged question stems per chapter, server-side checking,
 * stored answers for signed-in students, nothing stored for guests (their progress stays on the device).
 *
 * F-006 / DB-6: list responses come from the `student_questions` view (published/reviewed, embargo)
 * restricted to the `practice` pool. Keys are read from `question_keys` only inside `submitAnswer`,
 * after the student has answered, and only for practice-pool questions.
 */
import { and, asc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { chapters, practiceAnswers, questionKeys, studentQuestions, type Database } from '@soyl/db';
import type { ChildKey } from '@soyl/db/student-questions';
import { XP_AWARDS } from '@soyl/shared/config/gamification';
import type { QuestionType } from '@soyl/shared/content/question';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { practicePool, studentQuestion, studentQuestionSelect, type ChapterRef, type StudentQuestion } from './content';
import { awardXp, evaluateBadges, recordActivity, refreshTotals, type StreakView } from './gamification';
import { gradeQuestion, ResponseMismatchError, type PracticeResponse, type QuestionGrade, type StoredBodyPart } from './grading';

/* ---------------------------------------------------------------------------------------------- */
/* List                                                                                            */
/* ---------------------------------------------------------------------------------------------- */

export interface PracticeListQuery {
  cursor?: string;
  types?: QuestionType[];
  difficulties?: number[];
  limit: number;
}

interface Cursor {
  /** 0 = not yet answered by this user, 1 = answered (guests: always 0). */
  a: 0 | 1;
  k: string;
}

export const encodeCursor = (c: Cursor) => Buffer.from(JSON.stringify(c)).toString('base64url');
export function decodeCursor(raw: string | undefined): Cursor | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as Cursor;
    if ((c.a === 0 || c.a === 1) && typeof c.k === 'string' && /^q_[a-z0-9_-]{1,116}$/.test(c.k)) return c;
  } catch {
    /* fall through */
  }
  throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.cursor', message: 'Invalid cursor.' }] });
}

export interface PracticeItem {
  question: StudentQuestion;
  /** Signed-in only: whether you have answered it before, and whether your latest checked answer was right. */
  answered: boolean | null;
  lastCorrect: boolean | null;
}

/**
 * Questions not yet answered by the user come first (then the ones answered before), each group in
 * authored (key) order; guests get authored order.
 */
export async function listPractice(db: Database, chapter: ChapterRef, year: string, userId: string | null, q: PracticeListQuery) {
  const conds: SQL[] = [practicePool(chapter.id, year)];
  if (q.types?.length) conds.push(inArray(studentQuestions.type, q.types));
  if (q.difficulties?.length) conds.push(inArray(studentQuestions.difficulty, q.difficulties));
  const where = and(...conds)!;
  const cursor = decodeCursor(q.cursor);

  const answeredExpr = userId
    ? sql<number>`(CASE WHEN EXISTS (SELECT 1 FROM ${practiceAnswers} pa WHERE pa.user_id = ${userId} AND pa.question_key = ${studentQuestions.key}) THEN 1 ELSE 0 END)`
    : sql<number>`0`;
  const after = !cursor ? undefined : userId ? sql`(${answeredExpr}, ${studentQuestions.key}) > (${cursor.a}, ${cursor.k})` : sql`${studentQuestions.key} > ${cursor.k}`;

  const [rows, [count]] = await Promise.all([
    db
      .select({ ...studentQuestionSelect, answered: answeredExpr })
      .from(studentQuestions)
      .where(after ? and(where, after) : where)
      .orderBy(...(userId ? [answeredExpr, asc(studentQuestions.key)] : [asc(studentQuestions.key)]))
      .limit(q.limit + 1),
    db.select({ n: sql<number>`count(*)::int` }).from(studentQuestions).where(where),
  ]);
  const page = rows.slice(0, q.limit);
  const last = new Map<string, boolean | null>();
  if (userId && page.length) {
    const latest = await db
      .selectDistinctOn([practiceAnswers.questionKey], { key: practiceAnswers.questionKey, correct: practiceAnswers.correct })
      .from(practiceAnswers)
      .where(and(eq(practiceAnswers.userId, userId), inArray(practiceAnswers.questionKey, page.map((r) => r.key))))
      .orderBy(practiceAnswers.questionKey, sql`${practiceAnswers.answeredAt} DESC`);
    for (const r of latest) last.set(r.key, r.correct);
  }
  const lastRow = page[page.length - 1];
  return {
    chapterId: chapter.key,
    total: count?.n ?? 0,
    items: page.map(
      (r): PracticeItem => ({
        question: studentQuestion(r),
        answered: userId ? Number(r.answered) === 1 : null,
        lastCorrect: userId ? (last.get(r.key) ?? null) : null,
      }),
    ),
    nextCursor: rows.length > q.limit && lastRow ? encodeCursor({ a: Number(lastRow.answered) === 1 ? 1 : 0, k: lastRow.key }) : null,
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* Answer                                                                                          */
/* ---------------------------------------------------------------------------------------------- */

export interface SubmitAnswerInput {
  questionId: string;
  version?: number;
  response: PracticeResponse;
}

export interface SubmitAnswerResult extends QuestionGrade {
  questionId: string;
  version: number;
  type: QuestionType;
  stored: boolean;
  answerId: string | null;
  xpAwarded: number;
  badgesAwarded: string[];
  streak: StreakView | null;
}

/** The practice-pool question (exact version when given, else current) with its key. Never test/live items. */
async function questionForAnswer(db: Database, year: string, questionKey: string, version: number | undefined) {
  const [row] = await db
    .select({ ...studentQuestionSelect, chapterId: studentQuestions.chapterId, isCurrent: studentQuestions.isCurrent })
    .from(studentQuestions)
    .where(
      and(
        eq(studentQuestions.key, questionKey),
        eq(studentQuestions.academicYear, year),
        eq(studentQuestions.pool, 'practice'),
        version === undefined ? eq(studentQuestions.isCurrent, true) : eq(studentQuestions.version, version),
      ),
    );
  if (!row) throw new ApiProblem('not_found');
  const [key] = await db.select().from(questionKeys).where(eq(questionKeys.questionId, row.id));
  if (!key) throw new Error(`question ${row.key}@${row.version} has no key row`);
  return { row, key };
}

export async function submitAnswer(db: Database, clock: Clock, year: string, userId: string | null, input: SubmitAnswerInput): Promise<SubmitAnswerResult> {
  const { row, key } = await questionForAnswer(db, year, input.questionId, input.version);
  const body = row.body as { children?: StoredBodyPart[] };
  let grade: QuestionGrade;
  try {
    grade = gradeQuestion(
      {
        type: row.type as QuestionType,
        marks: Number(row.marks),
        children: body.children ?? [],
        key: {
          answer: key.answer as never,
          solutionMd: key.solutionMd,
          markingScheme: key.markingScheme as never,
          childKeys: (key.childKeys ?? []) as ChildKey[],
          rubric: (key.rubric ?? null) as never,
        },
      },
      input.response,
    );
  } catch (err) {
    if (err instanceof ResponseMismatchError) throw new ApiProblem('validation_failed', { errors: [{ path: err.path, message: err.message }] });
    throw err;
  }

  const base = { questionId: row.key, version: row.version, type: row.type as QuestionType, ...grade };
  if (!userId) return { ...base, stored: false, answerId: null, xpAwarded: 0, badgesAwarded: [], streak: null };

  const now = new Date(clock.now());
  return db.transaction(async (tx) => {
    const [saved] = await tx
      .insert(practiceAnswers)
      .values({
        userId,
        questionId: row.id,
        questionKey: row.key,
        questionVersion: row.version,
        chapterId: row.chapterId,
        // Internal storage shape: the validated response plus the auto-graded part of the marks.
        response: { given: input.response, auto_marks: grade.marksAwarded ?? 0, self_max: grade.selfMaxMarks },
        correct: grade.correct,
        marksAwarded: grade.selfAssessmentPending ? null : grade.marksAwarded,
        maxMarks: grade.maxMarks,
        grading: grade.selfAssessmentPending ? 'none' : 'auto',
        answeredAt: now,
        source: 'app',
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: practiceAnswers.id });
    let xpAwarded = 0;
    if (grade.correct === true) {
      // First correct answer per question; a guest-merged correct answer already earned its (smaller) XP.
      const [merged] = await tx
        .select({ id: practiceAnswers.id })
        .from(practiceAnswers)
        .where(and(eq(practiceAnswers.userId, userId), eq(practiceAnswers.questionKey, row.key), eq(practiceAnswers.source, 'guest_merge'), eq(practiceAnswers.correct, true)));
      if (!merged) xpAwarded = await awardXp(tx, userId, now, [{ kind: 'practice', amount: XP_AWARDS.practiceFirstCorrect, sourceType: 'question', sourceId: row.key }]);
    }
    const streak = await recordActivity(tx, userId, now);
    if (xpAwarded) await refreshTotals(tx, userId);
    const badgesAwarded = await evaluateBadges(db, tx, userId, now);
    return { ...base, stored: true, answerId: saved!.id, xpAwarded, badgesAwarded, streak };
  });
}

/** PATCH /v1/practice/answers/:id — the student's own mark for the written parts (API-7: own answers only). */
export async function selfAssess(db: Database, clock: Clock, userId: string, answerId: string, marks: number) {
  const [a] = await db
    .select()
    .from(practiceAnswers)
    .where(and(eq(practiceAnswers.id, answerId), eq(practiceAnswers.userId, userId), eq(practiceAnswers.source, 'app')));
  if (!a) throw new ApiProblem('not_found');
  const stored = (a.response ?? {}) as { auto_marks?: number; self_max?: number };
  const selfMax = Number(stored.self_max ?? 0);
  if (selfMax <= 0) throw new ApiProblem('conflict', { detail: 'This answer was marked automatically.' });
  if (marks > selfMax) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.marks', message: `At most ${selfMax} marks can be self-assessed here.` }] });
  const total = Number(stored.auto_marks ?? 0) + marks;
  const [updated] = await db
    .update(practiceAnswers)
    .set({ marksAwarded: total, grading: 'self', updatedAt: new Date(clock.now()) })
    .where(and(eq(practiceAnswers.id, answerId), eq(practiceAnswers.userId, userId)))
    .returning();
  return { answerId: updated!.id, marksAwarded: Number(updated!.marksAwarded), maxMarks: Number(updated!.maxMarks), grading: 'self' as const };
}

/** Chapter key for a chapter id (used by progress reads). */
export async function chapterKeyById(db: Database, id: string): Promise<string | null> {
  const [c] = await db.select({ key: chapters.key }).from(chapters).where(eq(chapters.id, id));
  return c?.key ?? null;
}
