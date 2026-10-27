/**
 * Results and self-evaluation (ARCHITECTURE §9, CONTEXT §5/§10; ADR-012).
 *
 *   GET  /v1/attempts/:id/result           only once the attempt is submitted / auto-submitted: score,
 *                                          section scores, topic mastery, time per question, accuracy by
 *                                          difficulty, every item with its answer, solution, marking
 *                                          scheme and rubric (revealed now, F-006), percentile once
 *                                          ≥ 50 first attempts are graded, live rank for ranked attempts
 *   POST /v1/attempts/:id/self-evaluation  marks for written items, within each step's / part's maximum
 *
 * S6-H01 (AC-11): a live-mock attempt is score-only (score, time, percentile, provisional rank) until
 * the event closes for everyone (live-review.ts): no keys, per-item status or correctness, no
 * section, topic or difficulty breakdown and no self-evaluation before then (`review.status` is
 * `after_event` with `opensAt`).
 *
 * Percentiles read `test_score_buckets` (two sums over ≤ 2 × total_marks + 1 rows) and use the
 * auto-graded score only; self-evaluated marks change the student's own total, never peer stats.
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import { attempts, evaluations, liveRegistrations, responses, testScoreBuckets, topics, type Database } from '@soyl/db';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { ApiProblem } from '../../errors';
import type { KeyReveal, PartResult, PracticeResponse } from '../grading';
import { finalizeCtx, ownAttempt, testHeader, type EngineContext } from './attempts';
import { deliverPaper } from './delivery';
import { gradeAttempt, isFinal } from './finalize';
import { LiveRanks, livePhase } from './live';
import { assertReviewOpen, reviewWindow } from './live-review';
import { loadKeys, loadStructure, testById, type TestStructure } from './load';
import { scoreBucket, type ItemOutcome } from './score';

const round1 = (x: number) => Math.round(x * 10) / 10;
const pct = (n: number, d: number) => (d > 0 ? Math.round((1000 * n) / d) / 10 : null);

/** Percentile of an auto score among graded first attempts of a test version (null below the threshold). */
export async function percentileFor(db: Database, testId: string, autoScore: number) {
  const mine = scoreBucket(autoScore);
  const [r] = await db
    .select({
      total: sql<number>`coalesce(sum(${testScoreBuckets.attempts}), 0)::int`,
      below: sql<number>`coalesce(sum(${testScoreBuckets.attempts}) FILTER (WHERE ${testScoreBuckets.bucket} < ${mine}), 0)::int`,
      equal: sql<number>`coalesce(sum(${testScoreBuckets.attempts}) FILTER (WHERE ${testScoreBuckets.bucket} = ${mine}), 0)::int`,
    })
    .from(testScoreBuckets)
    .where(eq(testScoreBuckets.testId, testId));
  const total = r?.total ?? 0;
  const value = total >= TEST_ENGINE.percentileMinAttempts ? Math.round((1000 * ((r?.below ?? 0) + 0.5 * (r?.equal ?? 0))) / total) / 10 : null;
  return { value, attempts: total, minAttempts: TEST_ENGINE.percentileMinAttempts };
}

function keyDto(k: KeyReveal) {
  return { answer: k.answer, solution_md: k.solution_md, marking_scheme: k.marking_scheme, ...(k.rubric ? { rubric: k.rubric } : {}) };
}

function itemStatus(o: ItemOutcome): 'correct' | 'partial' | 'wrong' | 'unanswered' | 'pending_self' | 'evaluated' {
  if (!o.answered) return 'unanswered';
  if (o.selfMax > 0 && o.selfMarks === null) return 'pending_self';
  if (o.selfMax > 0) return 'evaluated';
  if (o.autoMarks >= o.autoMax - 1e-9) return 'correct';
  return o.autoMarks > 0 ? 'partial' : 'wrong';
}

export async function attemptResult(ctx: EngineContext, userId: string, attemptId: string) {
  const a = await ownAttempt(ctx, userId, attemptId);
  if (!isFinal(a.status)) throw new ApiProblem('conflict', { detail: 'Results are available after you submit.' });
  const review = await reviewWindow(ctx.db, a, ctx.clock.now());
  const test = await testById(ctx.db, a.testId);
  const structure = await loadStructure(ctx.db, test!);
  const { outcomes, agg } = await gradeAttempt(ctx.db, structure, await loadKeys(ctx.db, structure), a.id);
  const saved = await ctx.db
    .select({ itemId: responses.testItemId, answer: responses.answer, timeSpentSec: responses.timeSpentSec, markedForReview: responses.markedForReview })
    .from(responses)
    .where(eq(responses.attemptId, a.id));
  const byItem = new Map(saved.map((r) => [r.itemId, r]));
  const paper = deliverPaper(structure, a.shuffleSeed);

  // Topic mastery: each counted item's marks count toward each of its topics.
  const topicAcc = new Map<string, { earned: number; max: number; items: number }>();
  for (const it of structure.items) {
    if (!agg.counted.has(it.itemId)) continue;
    const o = outcomes.get(it.itemId)!;
    for (const t of it.question.topicKeys) {
      const acc = topicAcc.get(t) ?? { earned: 0, max: 0, items: 0 };
      acc.earned += o.autoMarks + (o.selfMarks ?? 0);
      acc.max += it.marks;
      acc.items++;
      topicAcc.set(t, acc);
    }
  }
  const topicRows = topicAcc.size
    ? await ctx.db.select({ key: topics.key, title: topics.title }).from(topics).where(and(inArray(topics.key, [...topicAcc.keys()]), eq(topics.academicYear, test!.academicYear)))
    : [];
  const topicTitle = new Map(topicRows.map((t) => [t.key, t.title]));

  // Accuracy by difficulty: auto-graded (objective-only) items.
  const diff = new Map<number, { total: number; attempted: number; correct: number }>();
  for (const it of structure.items) {
    const o = outcomes.get(it.itemId)!;
    if (o.selfMax > 0) continue;
    const d = diff.get(it.question.difficulty) ?? { total: 0, attempted: 0, correct: 0 };
    d.total++;
    if (o.answered) d.attempted++;
    if (o.correct) d.correct++;
    diff.set(it.question.difficulty, d);
  }

  const percentile = await percentileFor(ctx.db, a.testId, agg.autoScore);
  let live = null;
  if (a.liveEventId) {
    const ev = review.event;
    if (ev) {
      if (livePhase(ev, ctx.clock.now()) === 'results_published') {
        const [reg] = await ctx.db
          .select({ rank: liveRegistrations.finalRank, percentile: liveRegistrations.percentile })
          .from(liveRegistrations)
          .where(and(eq(liveRegistrations.liveEventId, ev.id), eq(liveRegistrations.userId, userId)));
        const [n] = await ctx.db.select({ n: sql<number>`count(*)::int` }).from(liveRegistrations).where(and(eq(liveRegistrations.liveEventId, ev.id), sql`${liveRegistrations.finalRank} IS NOT NULL`));
        live = { eventId: ev.key, status: 'final' as const, rank: reg?.rank ?? null, total: n?.n ?? 0, percentile: reg?.percentile === null || reg?.percentile === undefined ? null : Number(reg.percentile) };
      } else {
        const r = await new LiveRanks(ctx.kv).rankOf(ev.id, userId);
        live = { eventId: ev.key, status: 'provisional' as const, rank: r?.rank ?? null, total: r?.total ?? 0, percentile: r && r.total > 1 ? Math.round((1000 * (r.total - r.rank)) / (r.total - 1)) / 10 : null };
      }
    }
  }

  const totalTime = saved.reduce((n, r) => n + r.timeSpentSec, 0);
  const header = {
    attempt: {
      id: a.id,
      status: a.status as 'submitted' | 'auto_submitted',
      startedAt: a.startedAt!.toISOString(),
      deadlineAt: a.deadlineAt!.toISOString(),
      submittedAt: a.submittedAt!.toISOString(),
      timeTakenSec: a.timeTakenSec ?? 0,
      tabSwitchCount: a.tabSwitchCount,
    },
    test: testHeader(test!, structure),
    score: {
      total: agg.score,
      max: agg.maxScore,
      auto: agg.autoScore,
      self: agg.selfScore,
      percentage: pct(agg.score, agg.maxScore),
      pendingSelfEvaluation: { items: agg.pendingSelfItems, marks: agg.pendingSelfMarks },
      answered: agg.answeredSlots,
      questions: agg.totalSlots,
    },
    time: { totalSec: totalTime, averagePerQuestionSec: structure.items.length ? Math.round(totalTime / structure.items.length) : 0 },
    percentile,
    live,
    review: { status: review.open ? ('open' as const) : ('after_event' as const), opensAt: review.opensAt?.toISOString() ?? null },
  };
  // S6-H01: score and rank only while the live event is still running for others.
  if (!review.open) return { ...header, sections: [], topics: [], byDifficulty: [], sectionsLayout: [], items: [] };
  return {
    ...header,
    sections: agg.sections,
    topics: [...topicAcc.entries()].map(([id, t]) => ({ id, title: topicTitle.get(id) ?? id, earned: round1(t.earned), max: round1(t.max), items: t.items, mastery: pct(t.earned, t.max) })),
    byDifficulty: [...diff.entries()].sort(([x], [y]) => x - y).map(([difficulty, d]) => ({ difficulty, total: d.total, attempted: d.attempted, correct: d.correct, accuracy: pct(d.correct, d.attempted) })),
    sectionsLayout: paper.sections.map((s) => ({ id: s.id, title: s.title, itemIds: s.itemIds, choiceGroups: s.choiceGroups })),
    items: paper.items.map((d) => {
      const o = outcomes.get(d.itemId)!;
      const r = byItem.get(d.itemId);
      return {
        itemId: d.itemId,
        sectionId: d.sectionId,
        number: d.number,
        marks: d.marks,
        choiceGroup: d.choiceGroup,
        counted: agg.counted.has(d.itemId),
        status: itemStatus(o),
        autoMarks: o.autoMarks,
        autoMax: o.autoMax,
        selfMarks: o.selfMarks,
        selfMax: o.selfMax,
        correct: o.correct,
        timeSpentSec: r?.timeSpentSec ?? 0,
        markedForReview: r?.markedForReview ?? false,
        response: (r?.answer ?? null) as PracticeResponse | null,
        question: d.question,
        key: o.grade ? keyDto(o.grade.key) : null,
        parts: (o.grade?.parts ?? []).map((p: PartResult) => ({ id: p.id, alternative: p.alternative, type: p.type, correct: p.correct, marksAwarded: p.marksAwarded, maxMarks: p.maxMarks, grading: p.grading, key: keyDto(p.key) })),
      };
    }),
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* Self-evaluation                                                                                 */
/* ---------------------------------------------------------------------------------------------- */

export interface SelfEvalEntry {
  itemId: string;
  /** Total marks for the item's written parts. */
  marks?: number;
  /** Non-case written items: marks per marking-scheme step, in order. */
  steps?: number[];
  /** Case/source items: marks per written part. */
  parts?: { id: string; marks: number }[];
}

const bad = (path: string, message: string) => new ApiProblem('validation_failed', { errors: [{ path, message }] });

function selfMarksFor(entry: SelfEvalEntry, i: number, o: ItemOutcome, structure: TestStructure, scheme: { marks: number }[]): { marks: number; feedback: unknown[] } {
  const item = structure.byItemId.get(entry.itemId)!;
  const f = item.question.marks > 0 ? item.marks / item.question.marks : 1;
  const given = [entry.marks !== undefined, entry.steps !== undefined, entry.parts !== undefined].filter(Boolean).length;
  if (given !== 1) throw bad(`body.items.${i}`, 'Send exactly one of marks, steps or parts.');
  if (entry.marks !== undefined) {
    if (entry.marks > o.selfMax + 1e-9) throw bad(`body.items.${i}.marks`, `At most ${o.selfMax} marks can be self-evaluated here.`);
    return { marks: entry.marks, feedback: [{ total: entry.marks }] };
  }
  if (entry.steps) {
    if (item.question.type === 'case-based' || item.question.type === 'source-based') throw bad(`body.items.${i}.steps`, 'Use parts for a case-based item.');
    if (entry.steps.length !== scheme.length) throw bad(`body.items.${i}.steps`, `This answer has ${scheme.length} marking steps.`);
    entry.steps.forEach((m, s) => {
      if (m > scheme[s]!.marks * f + 1e-9) throw bad(`body.items.${i}.steps.${s}`, `Step ${s + 1} is worth at most ${scheme[s]!.marks * f} marks.`);
    });
    const total = entry.steps.reduce((n, m) => n + m, 0);
    return { marks: Math.min(total, o.selfMax), feedback: entry.steps.map((m, s) => ({ step: s, awarded: m, max: scheme[s]!.marks * f })) };
  }
  const written = new Map((o.grade?.parts ?? []).filter((p) => p.grading === 'self').map((p) => [p.id, p.maxMarks * f]));
  const seen = new Set<string>();
  let total = 0;
  entry.parts!.forEach((p, k) => {
    const max = written.get(p.id);
    if (max === undefined) throw bad(`body.items.${i}.parts.${k}.id`, 'Not a written part of this answer.');
    if (seen.has(p.id)) throw bad(`body.items.${i}.parts.${k}.id`, 'Part given twice.');
    seen.add(p.id);
    if (p.marks > max + 1e-9) throw bad(`body.items.${i}.parts.${k}.marks`, `This part is worth at most ${max} marks.`);
    total += p.marks;
  });
  return { marks: Math.min(total, o.selfMax), feedback: entry.parts!.map((p) => ({ part: p.id, awarded: p.marks, max: written.get(p.id) })) };
}

export async function selfEvaluate(ctx: EngineContext, userId: string, attemptId: string, entries: SelfEvalEntry[]) {
  const a = await ownAttempt(ctx, userId, attemptId);
  if (!isFinal(a.status)) throw new ApiProblem('conflict', { detail: 'Self-evaluate after you submit.' });
  // S6-H01: marking against the scheme reveals it; a live attempt self-evaluates after the event.
  await assertReviewOpen(ctx.db, a, ctx.clock.now());
  const test = await testById(ctx.db, a.testId);
  const structure = await loadStructure(ctx.db, test!);
  const keys = await loadKeys(ctx.db, structure);
  const { outcomes, responseIds } = await gradeAttempt(ctx.db, structure, keys, a.id);
  const now = new Date(ctx.clock.now());
  const rows = entries.map((e, i) => {
    const o = outcomes.get(e.itemId);
    if (!o) throw bad(`body.items.${i}.itemId`, 'Not an item of this test.');
    if (!o.answered || o.selfMax <= 0 || !responseIds.has(e.itemId)) throw new ApiProblem('conflict', { detail: `Item ${i + 1} has no written answer to self-evaluate.` });
    const item = structure.byItemId.get(e.itemId)!;
    const scheme = ((keys.get(item.question.id)?.markingScheme ?? []) as { marks: number }[]).map((s) => ({ marks: Number(s.marks) }));
    const { marks, feedback } = selfMarksFor(e, i, o, structure, scheme);
    return { responseId: responseIds.get(e.itemId)!, mode: 'self', status: 'done', marks, maxMarks: o.selfMax, feedback, createdAt: now, updatedAt: now };
  });
  await ctx.db.transaction(async (tx) => {
    await tx
      .insert(evaluations)
      .values(rows)
      .onConflictDoUpdate({ target: [evaluations.responseId, evaluations.mode], set: { marks: sql`excluded.marks`, maxMarks: sql`excluded.max_marks`, feedback: sql`excluded.feedback`, status: 'done', updatedAt: now } });
    const { agg } = await gradeAttempt(tx, structure, keys, a.id);
    // The auto score (ranks, percentile) never changes here (AC-14).
    await tx.update(attempts).set({ score: agg.score, selfScore: agg.selfScore, sectionScores: agg.sections, updatedAt: now }).where(eq(attempts.id, a.id));
  });
  return attemptResult(ctx, userId, attemptId);
}

export { finalizeCtx };
