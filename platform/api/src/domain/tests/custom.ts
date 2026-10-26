/**
 * Custom test builder (CONTEXT §5, §10: free for signed-in students; ADR-012).
 *
 *   POST /v1/tests/custom  { subjectId, chapterIds, types?, difficulty?, questionCount, durationMin?, title? }
 *
 * The paper is assembled by the content pipeline's own blueprint engine (`assemblePaper`, stage 7),
 * not a copy of it: the request becomes a one-off blueprint (a section per question type, slots per
 * marks value, counts proportional to what the bank holds) and the engine fills it with its usual
 * rules — exact marks, chapter spread, topic coverage, difficulty ramp — from a deterministic seed.
 *
 * Bank: published/reviewed **practice-pool** questions of the chosen chapters in their active release
 * (ADR-006/010). `test` and `live_reserved` items are never candidates (F-006, AC-11).
 */
import { createHash, randomUUID } from 'node:crypto';
import { and, between, count, eq, inArray, or, type SQL } from 'drizzle-orm';
import { chapters, questions, testItems, tests, type Database } from '@soyl/db';
import { assemblePaper, type BankItem } from '@soyl/content-pipeline/assemble/engine';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import type { Blueprint } from '@soyl/shared/content/blueprint';
import type { QuestionType } from '@soyl/shared/content/question';
import { TestDefinition } from '@soyl/shared/content/test';
import { ApiProblem } from '../../errors';
import { activeReleases, inScope, STUDENT_VISIBLE } from '../content';
import type { EngineContext } from './attempts';
import { resolveSubject } from './catalogue';

export interface CustomTestRequest {
  subjectId: string;
  chapterIds: string[];
  types?: QuestionType[];
  difficulty?: { min: number; max: number };
  questionCount: number;
  durationMin?: number;
  title?: string;
}

const TYPE_TITLES: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  'multi-select': 'Multiple correct answers',
  'assertion-reason': 'Assertion and reason',
  'true-false': 'True or false',
  'fill-blank': 'Fill in the blanks',
  match: 'Match the following',
  ordering: 'Put in order',
  'code-output': 'Predict the output',
  numerical: 'Numerical problems',
  short: 'Short answer',
  long: 'Long answer',
  'case-based': 'Case-based questions',
  'source-based': 'Source-based questions',
  writing: 'Writing',
  map: 'Map work',
};
/** Paper order: objective first, then written, then passages. */
const TYPE_ORDER: QuestionType[] = ['mcq', 'multi-select', 'assertion-reason', 'true-false', 'fill-blank', 'match', 'ordering', 'code-output', 'numerical', 'short', 'long', 'writing', 'map', 'case-based', 'source-based'];

interface Candidate extends BankItem {
  rowId: string;
  expectedTimeSec: number;
}

async function bankFor(db: Database, year: string, subjectId: string, chapterKeys: string[], req: CustomTestRequest): Promise<{ bank: Candidate[]; chapterIds: Map<string, string> }> {
  const rows = await db
    .select({ id: chapters.id, key: chapters.key })
    .from(chapters)
    .where(and(eq(chapters.subjectId, subjectId), eq(chapters.academicYear, year), inArray(chapters.key, chapterKeys)));
  if (rows.length !== new Set(chapterKeys).size) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.chapterIds', message: 'Every chapter must belong to the subject.' }] });
  const releases = await activeReleases(db, rows.map((r) => r.id), year);
  const perChapter: SQL[] = rows.map((r) => and(eq(questions.chapterId, r.id), inScope(questions, 'question', releases.get(r.id) ?? null))!);
  const conds: SQL[] = [
    or(...perChapter)!,
    eq(questions.academicYear, year),
    eq(questions.pool, 'practice'),
    inArray(questions.status, [...STUDENT_VISIBLE]),
  ];
  if (req.types?.length) conds.push(inArray(questions.type, req.types));
  if (req.difficulty) conds.push(between(questions.difficulty, req.difficulty.min, req.difficulty.max));
  const qs = await db
    .select({ id: questions.id, key: questions.key, version: questions.version, unit: questions.unit, type: questions.type, marks: questions.marks, difficulty: questions.difficulty, competency: questions.competency, topicKeys: questions.topicKeys, expectedTimeSec: questions.expectedTimeSec })
    .from(questions)
    .where(and(...conds));
  return {
    bank: qs.map((q) => ({ rowId: q.id, id: q.key, version: q.version, unit: q.unit, type: q.type as QuestionType, marks: Number(q.marks), difficulty: q.difficulty, competency: q.competency as BankItem['competency'], topic_ids: q.topicKeys, expectedTimeSec: q.expectedTimeSec })),
    chapterIds: new Map(rows.map((r) => [r.key, r.id])),
  };
}

/** Largest-remainder allocation of `n` slots across groups by their sizes (each ≤ its size). */
export function allocate(sizes: number[], n: number): number[] {
  const total = sizes.reduce((a, b) => a + b, 0);
  if (n > total) throw new Error('not enough items');
  const raw = sizes.map((s) => (s * n) / total);
  const out = raw.map((r, i) => Math.min(sizes[i]!, Math.floor(r)));
  let left = n - out.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => ({ i, rem: r - Math.floor(r) })).sort((a, b) => b.rem - a.rem || a.i - b.i);
  while (left > 0) {
    let moved = false;
    for (const { i } of order) {
      if (left === 0) break;
      if (out[i]! < sizes[i]!) {
        out[i]!++;
        left--;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

const slotType = (t: QuestionType, marks: number, present: Set<string>): QuestionType =>
  // The engine's short/long slots also take numericals (SLOT_COMPATIBLE): pool them so counts stay exact.
  t === 'numerical' && present.has(`short|${marks}`) ? 'short' : t === 'numerical' && present.has(`long|${marks}`) ? 'long' : t;

export async function buildCustomTest(ctx: EngineContext, userId: string, req: CustomTestRequest) {
  const { db, year } = ctx;
  const subject = await resolveSubject(db, year, { subject: req.subjectId });
  const chapterKeys = [...new Set(req.chapterIds)];
  const { bank } = await bankFor(db, year, subject.id, chapterKeys, req);
  if (bank.length < req.questionCount)
    throw new ApiProblem('bank_too_small', { detail: `Only ${bank.length} question(s) match these choices; ask for ${Math.max(0, bank.length)} or fewer, or widen the chapters, types or difficulty.` });

  // Chapters with no matching questions are left out (the engine requires every scope chapter to have some).
  const usable = chapterKeys.filter((c) => bank.some((q) => q.unit === c));
  const present = new Set(bank.filter((q) => q.type !== 'numerical').map((q) => `${q.type}|${q.marks}`));
  const groups = new Map<string, { type: QuestionType; marks: number; size: number; time: number }>();
  for (const q of bank) {
    const t = slotType(q.type, q.marks, present);
    const k = `${t}|${q.marks}`;
    const g = groups.get(k) ?? { type: t, marks: q.marks, size: 0, time: 0 };
    g.size++;
    g.time += q.expectedTimeSec;
    groups.set(k, g);
  }
  const list = [...groups.values()].sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || a.marks - b.marks);
  const counts = allocate(list.map((g) => g.size), req.questionCount);
  const chosen = list.map((g, i) => ({ ...g, count: counts[i]! })).filter((g) => g.count > 0);

  const sections: Blueprint['sections'] = [];
  for (const type of TYPE_ORDER) {
    const items = chosen.filter((g) => g.type === type);
    if (!items.length) continue;
    sections.push({
      id: String.fromCharCode(65 + sections.length),
      title: TYPE_TITLES[type],
      instructions: '',
      items: items.map((g) => ({ type: g.type, count: g.count, marks_each: g.marks, internal_choice: null, competency: null, difficulty: null })),
    });
  }
  const totalMarks = chosen.reduce((n, g) => n + g.count * g.marks, 0);
  const expectedSec = chosen.reduce((n, g) => n + (g.time / g.size) * g.count, 0);
  const durationMin =
    req.durationMin ?? Math.min(TEST_ENGINE.custom.maxDurationMin, Math.max(TEST_ENGINE.custom.minDurationMin, Math.ceil((expectedSec * TEST_ENGINE.custom.durationFactor) / 60 / 5) * 5));
  const [{ n: built } = { n: 0 }] = await db.select({ n: count() }).from(tests).where(eq(tests.createdByUserId, userId));
  const fingerprint = createHash('sha256').update(JSON.stringify({ ...req, chapterIds: chapterKeys })).digest('hex').slice(0, 16);
  const seed = `custom:${userId}:${fingerprint}:${built}`;
  const id = `t_custom_${randomUUID().replace(/-/g, '')}`;
  const blueprint: Blueprint = {
    id: `custom-${fingerprint}`,
    board: subject.board as Blueprint['board'],
    exam: subject.exam as Blueprint['exam'],
    class: subject.classLevel as Blueprint['class'],
    subject_id: subject.key,
    paper_type: 'unit-test',
    academic_year: year,
    duration_min: durationMin,
    total_marks: totalMarks,
    mark_shares: {},
    scope: usable,
    sections,
    source_status: 'unverified',
    source: 'custom test builder',
  };
  const title = req.title?.trim() || `Custom test — ${subject.name} (${usable.length} chapter${usable.length === 1 ? '' : 's'})`;
  const r = assemblePaper({ id, title, blueprint, subjectId: subject.key, chapters: usable, seed }, bank);
  if (!r.ok) throw new ApiProblem('bank_too_small', { detail: 'These choices cannot be filled from the question bank; try more chapters or fewer questions.' });
  const def = TestDefinition.parse({ ...r.test, kind: 'custom', shuffle: false });

  const rowIds = new Map(bank.map((q) => [`${q.id}@${q.version}`, q.rowId]));
  const now = new Date(ctx.clock.now());
  await db.transaction(async (tx) => {
    const [t] = await tx
      .insert(tests)
      .values({
        key: def.id,
        version: 1,
        academicYear: year,
        kind: 'custom',
        paperType: def.paper_type,
        subjectId: subject.id,
        chapterKeys: def.chapter_ids,
        title: def.title,
        durationMin: def.duration_min,
        totalMarks: def.total_marks,
        shuffle: false,
        seed,
        status: 'published',
        definition: def,
        createdByUserId: userId,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: tests.id });
    let position = 0;
    const items = def.sections.flatMap((s) => s.items.map((it) => ({ testId: t!.id, questionId: rowIds.get(`${it.question_id}@${it.question_version}`)!, sectionId: s.id, position: ++position, marks: it.marks, choiceGroup: it.choice_group, createdAt: now, updatedAt: now })));
    await tx.insert(testItems).values(items);
  });
  return { testId: def.id, skippedChapters: chapterKeys.filter((c) => !usable.includes(c)) };
}
