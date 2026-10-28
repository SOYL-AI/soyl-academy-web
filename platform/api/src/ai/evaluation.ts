/**
 * AI evaluation of written answers (ARCHITECTURE §10 "Evaluation", AC-14, F-028; ADR-013).
 *
 * Units: every answered written item of a submitted attempt (short, long, writing, map, and the
 * written parts of case/source items) that has no finished AI evaluation yet. One unit = one marking
 * scheme; an item may have several units (case parts) but is priced as one answer.
 *
 * Per unit: input moderation of the answer (harm → not sent; Prompt Shields document attack → still
 * marked, but the result is flagged and confidence capped so the student is told to check with a
 * teacher) → structured model call (zod schema) → **clamp** every step to [0, step max] in 0.5 steps
 * and the item to its maximum, whatever the model says → output moderation of the feedback text.
 *
 * Results are `evaluations` rows with mode 'ai'. They never change `attempts.score/auto_score`,
 * percentiles, live ranks or leaderboards: the test engine only reads mode 'auto' and 'self' (F-028).
 */
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod/v4';
import { evaluations, responses, type Database } from '@soyl/db';
import { StructuredOutputError, type ModelClient, type UsageRecord } from '@soyl/ai-core';
import type { ModelTier } from '@soyl/shared/config/models';
import type { AiActionConfig } from '@soyl/shared/config/ai-actions';
import { ApiProblem } from '../errors';
import { ownAttempt, type EngineContext } from '../domain/tests/attempts';
import { gradeAttempt, isFinal } from '../domain/tests/finalize';
import { assertReviewOpen } from '../domain/tests/live-review';
import { loadKeys, loadStructure, testById } from '../domain/tests/load';
import { FIXTURE, type EvaluateFixtureInput } from './fixtures';
import type { Moderator } from './moderation/moderator';
import { buildEvaluationMessages } from './prompts';

/** Below this confidence the UI shows "AI-graded — check with your teacher". */
export const LOW_CONFIDENCE_BELOW = 0.6;
export const LOW_CONFIDENCE_LABEL = 'AI-graded — check with your teacher';
/** Confidence cap when the answer looked like an instruction to the marker (AC-14). */
export const INJECTION_CONFIDENCE_CAP = 0.3;

export const EvaluationOutput = z.object({
  steps: z
    .array(z.object({ index: z.number().int().min(0).max(50), awarded: z.number(), reason: z.string().max(600) }))
    .max(50),
  overall_feedback: z.string().max(1200),
  confidence: z.number().min(0).max(1),
});
export type EvaluationOutput = z.infer<typeof EvaluationOutput>;

export interface EvalUnit {
  itemId: string;
  partId: string | null;
  questionMd: string;
  modelAnswerMd: string;
  steps: { index: number; step: string; max: number }[];
  maxMarks: number;
  answerText: string;
}

export interface StepMark {
  part: string | null;
  index: number;
  step: string;
  awarded: number;
  max: number;
  reason: string;
}

const half = (x: number) => Math.floor(x * 2 + 1e-9) / 2;

/**
 * The only marks that can be stored: per step clamped to [0, max] (0.5 steps), unknown step indices
 * ignored, duplicates take the first, missing steps get 0; the total never exceeds the unit maximum.
 */
export function clampMarks(unit: EvalUnit, out: EvaluationOutput): { steps: StepMark[]; total: number } {
  const seen = new Set<number>();
  const byIndex = new Map<number, { awarded: number; reason: string }>();
  for (const s of out.steps) {
    if (seen.has(s.index)) continue;
    seen.add(s.index);
    byIndex.set(s.index, { awarded: s.awarded, reason: s.reason });
  }
  const steps = unit.steps.map((st) => {
    const got = byIndex.get(st.index);
    const raw = got && Number.isFinite(got.awarded) ? got.awarded : 0;
    return { part: unit.partId, index: st.index, step: st.step, awarded: Math.max(0, Math.min(st.max, half(raw))), max: st.max, reason: (got?.reason ?? 'Not assessed.').slice(0, 600) };
  });
  const total = Math.min(unit.maxMarks, half(steps.reduce((n, s) => n + s.awarded, 0)));
  return { steps, total };
}

type StoredBodyPart = { id: string; stem_md?: string; alternatives?: { id: string; stem_md?: string }[] };

function textOf(response: unknown): string {
  if (response && typeof response === 'object' && 'text' in response) return String((response as { text?: unknown }).text ?? '');
  return '';
}

/** Written units of a submitted attempt, grouped by item (only items without a finished AI evaluation). */
export async function evaluationUnits(ctx: EngineContext, userId: string, attemptId: string, itemIds?: string[]) {
  const a = await ownAttempt(ctx, userId, attemptId);
  if (!isFinal(a.status)) throw new ApiProblem('conflict', { detail: 'Submit the test first, then ask for AI evaluation.' });
  // S6-H01: the feedback is built from the model answer and marking scheme; live attempts wait for the event to close.
  await assertReviewOpen(ctx.db, a, ctx.clock.now());
  const test = await testById(ctx.db, a.testId);
  const structure = await loadStructure(ctx.db, test!);
  const keys = await loadKeys(ctx.db, structure);
  const { outcomes, responseIds } = await gradeAttempt(ctx.db, structure, keys, a.id);
  const done = responseIds.size
    ? await ctx.db
        .select({ responseId: evaluations.responseId })
        .from(evaluations)
        .where(and(inArray(evaluations.responseId, [...responseIds.values()]), eq(evaluations.mode, 'ai'), eq(evaluations.status, 'done')))
    : [];
  const doneSet = new Set(done.map((d) => d.responseId));
  const answers = new Map<string, unknown>();
  if (responseIds.size) {
    const rows = await ctx.db.select({ itemId: responses.testItemId, answer: responses.answer }).from(responses).where(eq(responses.attemptId, a.id));
    for (const r of rows) answers.set(r.itemId, r.answer);
  }
  const wanted = itemIds?.length ? new Set(itemIds) : null;
  if (wanted) for (const id of wanted) if (!structure.byItemId.has(id)) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.itemIds', message: 'Not an item of this test.' }] });
  const units = new Map<string, EvalUnit[]>();
  const skipped: { itemId: string; reason: 'not_written' | 'unanswered' | 'already_evaluated' }[] = [];
  for (const item of structure.items) {
    if (wanted && !wanted.has(item.itemId)) continue;
    const o = outcomes.get(item.itemId)!;
    const responseId = responseIds.get(item.itemId);
    if (o.selfMax <= 0 || !o.grade) {
      if (wanted) skipped.push({ itemId: item.itemId, reason: 'not_written' });
      continue;
    }
    if (!o.answered || !responseId) {
      if (wanted) skipped.push({ itemId: item.itemId, reason: 'unanswered' });
      continue;
    }
    if (doneSet.has(responseId)) {
      skipped.push({ itemId: item.itemId, reason: 'already_evaluated' });
      continue;
    }
    const q = item.question;
    const f = q.marks > 0 ? item.marks / q.marks : 1;
    const body = (q.body ?? {}) as { stem_md?: string; passage_md?: string; children?: StoredBodyPart[] };
    const answer = answers.get(item.itemId);
    const list: EvalUnit[] = [];
    if (q.type !== 'case-based' && q.type !== 'source-based') {
      const key = o.grade.key;
      const text = textOf(answer);
      if (text.trim())
        list.push({
          itemId: item.itemId,
          partId: null,
          questionMd: body.stem_md ?? '',
          modelAnswerMd: String((key.answer as { model_answer_md?: string }).model_answer_md ?? key.solution_md ?? ''),
          steps: (key.marking_scheme ?? []).map((s, i) => ({ index: i, step: s.step, max: half(Number(s.marks) * f) })),
          maxMarks: o.selfMax,
          answerText: text,
        });
    } else {
      const parts = ((answer as { parts?: { id: string; response?: unknown }[] } | null)?.parts ?? []) as { id: string; response?: unknown }[];
      for (const part of o.grade.parts.filter((x) => x.grading === 'self')) {
        const text = textOf(parts.find((x) => x.id === part.id)?.response);
        if (!text.trim()) continue;
        const child = (body.children ?? []).find((c) => c.id === part.id);
        const stem = part.alternative ? (child?.alternatives ?? []).find((alt) => alt.id === part.alternative)?.stem_md : child?.stem_md;
        list.push({
          itemId: item.itemId,
          partId: part.id,
          questionMd: [body.passage_md, stem].filter(Boolean).join('\n\n'),
          modelAnswerMd: String((part.key.answer as { model_answer_md?: string }).model_answer_md ?? part.key.solution_md ?? ''),
          steps: (part.key.marking_scheme ?? []).map((s, i) => ({ index: i, step: s.step, max: half(Number(s.marks) * f) })),
          maxMarks: half(part.maxMarks * f),
          answerText: text,
        });
      }
    }
    if (!list.length) {
      skipped.push({ itemId: item.itemId, reason: 'unanswered' });
      continue;
    }
    // A scheme without steps is marked as one holistic step.
    for (const u of list) if (!u.steps.length) u.steps = [{ index: 0, step: 'Overall answer', max: u.maxMarks }];
    units.set(item.itemId, list);
  }
  return { attempt: a, test: test!, structure, units, responseIds, skipped };
}

export interface ItemEvaluation {
  itemId: string;
  marks: number;
  maxMarks: number;
  confidence: number;
  lowConfidence: boolean;
  injectionSuspected: boolean;
  steps: StepMark[];
  feedback: string;
}

/** Evaluates one item's units. Returns null when the answer may not be sent to a model (harmful content). */
export async function evaluateItem(
  client: ModelClient,
  moderator: Moderator,
  action: AiActionConfig,
  tier: ModelTier,
  paper: { subjectName: string; classLevel: number; board: string },
  units: EvalUnit[],
  usages: UsageRecord[],
): Promise<ItemEvaluation | null> {
  const steps: StepMark[] = [];
  const feedback: string[] = [];
  let confidence = 1;
  let injection = false;
  let total = 0;
  let max = 0;
  for (const u of units) {
    const verdict = await moderator.checkInput(u.answerText, action.moderation, { documents: [u.answerText] });
    const harmful = verdict.reasons.some((r) => r !== 'document_attack' && r !== 'jailbreak' && r !== 'off_topic');
    if (harmful) return null;
    if (verdict.reasons.includes('document_attack') || verdict.reasons.includes('jailbreak')) injection = true;
    const fixture: EvaluateFixtureInput = { steps: u.steps.map((s) => ({ index: s.index, max: s.max })), answerWords: (u.answerText.match(/\S+/g) ?? []).length };
    let out: EvaluationOutput;
    try {
      const r = await client.structured({
        tier,
        messages: buildEvaluationMessages({ ...paper, questionMd: u.questionMd, modelAnswerMd: u.modelAnswerMd, steps: u.steps, maxMarks: u.maxMarks, answerText: u.answerText }),
        schema: EvaluationOutput,
        schemaName: 'answer_evaluation',
        maxOutputTokens: action.maxOutputTokens,
        reasoningEffort: action.reasoningEffort,
        meta: { purpose: action.id, item: u.itemId },
        mock: { fixture: FIXTURE.evaluate, input: fixture },
      });
      out = r.data;
    } catch (e) {
      if (e instanceof StructuredOutputError) usages.push(...e.calls);
      throw e;
    }
    const clamped = clampMarks(u, out);
    const reasons = clamped.steps.map((s) => s.reason).join('\n');
    const check = await moderator.checkOutput(`${reasons}\n${out.overall_feedback}`);
    const safe = check.blocked ? clamped.steps.map((s) => ({ ...s, reason: 'See the marking scheme for this step.' })) : clamped.steps;
    steps.push(...safe);
    feedback.push(check.blocked ? 'Compare your answer with the model answer and marking scheme.' : out.overall_feedback);
    confidence = Math.min(confidence, out.confidence);
    total += clamped.total;
    max += u.maxMarks;
  }
  if (injection) confidence = Math.min(confidence, INJECTION_CONFIDENCE_CAP);
  return {
    itemId: units[0]!.itemId,
    marks: Math.min(max, half(total)),
    maxMarks: max,
    confidence: Math.round(confidence * 100) / 100,
    lowConfidence: confidence < LOW_CONFIDENCE_BELOW,
    injectionSuspected: injection,
    steps,
    feedback: feedback.join('\n\n').slice(0, 2400),
  };
}

/** Stores (or replaces) the AI evaluation of a response. */
export async function saveItemEvaluation(db: Database, responseId: string, e: ItemEvaluation, aiRequestId: string | null, now: Date): Promise<void> {
  const row = {
    responseId,
    mode: 'ai',
    status: 'done',
    marks: e.marks,
    maxMarks: e.maxMarks,
    feedback: { steps: e.steps, feedback: e.feedback, injectionSuspected: e.injectionSuspected, label: e.lowConfidence ? LOW_CONFIDENCE_LABEL : 'AI-graded' },
    confidence: e.confidence,
    aiRequestId,
    createdAt: now,
    updatedAt: now,
  };
  await db
    .insert(evaluations)
    .values(row)
    .onConflictDoUpdate({ target: [evaluations.responseId, evaluations.mode], set: { status: 'done', marks: row.marks, maxMarks: row.maxMarks, feedback: row.feedback, confidence: row.confidence, aiRequestId, updatedAt: now } });
}

/** GET view: the AI evaluations of an attempt's items (owner only). */
export async function attemptAiEvaluations(ctx: EngineContext, userId: string, attemptId: string) {
  const a = await ownAttempt(ctx, userId, attemptId);
  await assertReviewOpen(ctx.db, a, ctx.clock.now()); // S6-H01: step names and feedback come from the marking scheme
  const test = await testById(ctx.db, a.testId);
  const structure = await loadStructure(ctx.db, test!);
  const rows = await ctx.db
    .select({ itemId: responses.testItemId, marks: evaluations.marks, maxMarks: evaluations.maxMarks, confidence: evaluations.confidence, feedback: evaluations.feedback, updatedAt: evaluations.updatedAt })
    .from(evaluations)
    .innerJoin(responses, eq(responses.id, evaluations.responseId))
    .where(and(eq(responses.attemptId, a.id), eq(evaluations.mode, 'ai'), eq(evaluations.status, 'done')));
  const items = rows
    .filter((r) => structure.byItemId.has(r.itemId))
    .map((r) => {
      const fb = (r.feedback ?? {}) as { steps?: StepMark[]; feedback?: string; injectionSuspected?: boolean; label?: string };
      const confidence = r.confidence === null ? 0 : Number(r.confidence);
      return {
        itemId: r.itemId,
        marks: Number(r.marks ?? 0),
        maxMarks: Number(r.maxMarks),
        confidence,
        lowConfidence: confidence < LOW_CONFIDENCE_BELOW,
        label: confidence < LOW_CONFIDENCE_BELOW ? LOW_CONFIDENCE_LABEL : 'AI-graded',
        steps: (fb.steps ?? []).map((s) => ({ part: s.part, index: s.index, step: s.step, awarded: s.awarded, max: s.max, reason: s.reason })),
        feedback: fb.feedback ?? '',
        evaluatedAt: r.updatedAt.toISOString(),
      };
    });
  return { attemptId: a.id, items, totalMarks: Math.round(items.reduce((n, i) => n + i.marks, 0) * 10) / 10, maxMarks: Math.round(items.reduce((n, i) => n + i.maxMarks, 0) * 10) / 10, countsForRanks: false as const };
}
