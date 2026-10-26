/**
 * Queued AI work (ADR-013): AI evaluation (one answer or a full paper), "papers like my school's"
 * (blueprint from an uploaded sample paper) and upload processing.
 *
 * A job is an `ai_jobs` row. The API starts it immediately in-process (low latency); the worker's
 * `ai.jobs` sweep runs anything still queued or abandoned (expired lock), so a crash never loses work.
 * Claiming is one conditional UPDATE, so two runners never run the same job. Credits are reserved
 * when the job is created; the job charges for what it delivered and refunds the rest. A job whose
 * reservation was already refunded by the sweeper does not call the model.
 */
import { createHash, randomUUID } from 'node:crypto';
import { and, asc, eq, lt, or, sql } from 'drizzle-orm';
import { z } from 'zod/v4';
import { aiJobs, aiRequests, chapters, subjects, uploads, type Database } from '@soyl/db';
import { ModelClient, type UsageRecord } from '@soyl/ai-core';
import { MODELS } from '@soyl/shared/config/models';
import { AI_ACTIONS, AI_UPLOADS, quoteCredits, type AiActionConfig } from '@soyl/shared/config/ai-actions';
import { QUESTION_TYPES, type QuestionType } from '@soyl/shared/content/question';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import type { PlanId } from '@soyl/shared/config/plans';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import type { KeyValueStore } from '../kv';
import { buildCustomTest } from '../domain/tests/custom';
import { resolveSubject } from '../domain/tests/catalogue';
import { BlobTooLargeError } from './blob';
import type { CreditService } from './credits';
import { evaluateItem, evaluationUnits, saveItemEvaluation } from './evaluation';
import { FIXTURE, type BlueprintFixtureInput } from './fixtures';
import type { Caller, Preflight } from './gateway';
import { EXTENSION, UploadRejectedError, validateAndClean } from './media';
import { Moderator } from './moderation/moderator';
import { CONTENT_SAFETY_IMAGE_MAX_BYTES } from './moderation/providers';
import { systemRules } from './prompts';
import type { AiRuntime } from './runtime';
import type { SpendBreaker } from './spend';

export interface JobDeps {
  db: Database;
  kv: KeyValueStore;
  clock: Clock;
  year: string;
  runtime: () => AiRuntime;
  credits: CreditService;
  breaker: SpendBreaker;
  preflight: Preflight;
  log: () => { warn(o: object, m?: string): void; info(o: object, m?: string): void; error(o: object, m?: string): void };
}

/** A job's lock: a runner that dies is replaced after this long. */
export const JOB_LOCK_SECONDS = 10 * 60;
export const JOB_MAX_ATTEMPTS = 3;

type JobRow = typeof aiJobs.$inferSelect;

/* Blueprint of a sample paper: structure only, bounded (AC-13). No question text anywhere. */
const BLUEPRINT_TYPES = ['mcq', 'assertion-reason', 'true-false', 'fill-blank', 'match', 'numerical', 'short', 'long', 'case-based', 'source-based', 'map', 'writing'] as const;
export const BlueprintOutput = z.object({
  duration_min: z.number().int().min(10).max(240),
  total_marks: z.number().int().min(5).max(120),
  sections: z
    .array(
      z.object({
        id: z.string().regex(/^[A-Z]$/),
        question_type: z.enum(BLUEPRINT_TYPES),
        count: z.number().int().min(1).max(40),
        marks_each: z.number().min(0.5).max(10),
        internal_choice: z.number().int().min(0).max(10),
      }),
    )
    .min(1)
    .max(8),
  chapter_ids: z.array(z.string().max(100)).max(40),
  notes: z.string().max(200).optional(),
});
export type BlueprintOutput = z.infer<typeof BlueprintOutput>;

export class AiJobRunner {
  private readonly inflight = new Set<Promise<unknown>>();

  constructor(private readonly d: JobDeps) {}

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  /** Starts a job in the background of this process (the worker sweep is the safety net). */
  kick(jobId: string): void {
    const p = this.runJob(jobId)
      .catch((e: unknown) => this.d.log().error({ err: (e as Error).message, jobId }, 'ai job failed to run'))
      .finally(() => this.inflight.delete(p));
    this.inflight.add(p);
  }

  /** Tests: wait until every kicked job finished. */
  async drain(): Promise<void> {
    while (this.inflight.size) await Promise.all([...this.inflight]);
  }

  private async createJob(
    caller: Caller,
    action: AiActionConfig | null,
    kind: JobRow['kind'],
    payload: Record<string, unknown>,
    request: { requestId: string; credits: number; plan: PlanId; tier: string; degraded: boolean } | null,
  ): Promise<JobRow> {
    const now = this.now();
    if (request && action) {
      await this.d.db.insert(aiRequests).values({
        userId: caller.userId,
        requestId: request.requestId,
        action: action.id,
        modelTier: request.tier,
        model: MODELS[request.tier as keyof typeof MODELS].display_name,
        status: 'pending',
        creditsQuoted: request.credits,
        planId: request.plan,
        degraded: request.degraded,
        simulated: this.d.runtime().provider.simulated,
        createdAt: now,
        updatedAt: now,
      });
    }
    const [job] = await this.d.db
      .insert(aiJobs)
      .values({ kind, userId: caller.userId, requestId: request?.requestId ?? null, action: action?.id ?? null, status: 'queued', payload, runAfter: now, createdAt: now, updatedAt: now })
      .returning();
    return job!;
  }

  /* ---------------------------------------------------------------------------------------------- */
  /* Starting jobs                                                                                   */
  /* ---------------------------------------------------------------------------------------------- */

  async startEvaluation(caller: Caller, action: AiActionConfig, attemptId: string, itemIds?: string[]) {
    const pf = this.d.preflight;
    const plan = await pf.plan(caller.userId);
    pf.assertPlan(action, plan);
    const ctx = { db: this.d.db, kv: this.d.kv, clock: this.d.clock, year: this.d.year };
    const { units, skipped } = await evaluationUnits(ctx, caller.userId, attemptId, itemIds);
    if (action.id === 'evaluate-answer' && (itemIds?.length ?? 0) !== 1)
      throw new ApiProblem('validation_failed', { errors: [{ path: 'body.itemIds', message: 'Choose exactly one answer, or use evaluate-paper.' }] });
    if (!units.size) throw new ApiProblem('conflict', { detail: 'There are no new written answers to evaluate in this attempt.' });
    const { tier, degraded } = await pf.tier(action, plan);
    const credits = quoteCredits(action, units.size);
    const { requestId, balance } = await pf.reserve(caller, action, plan, credits, { attemptId, answers: units.size });
    const job = await this.createJob(caller, action, 'evaluation', { attemptId, itemIds: [...units.keys()], credits, tier, degraded, plan }, { requestId, credits, plan, tier, degraded });
    this.kick(job.id);
    return { jobId: job.id, status: job.status as 'queued', action: action.id, credits, balance, answers: units.size, skipped };
  }

  async startPaperFromUpload(caller: Caller, action: AiActionConfig, uploadId: string, subjectId: string) {
    const pf = this.d.preflight;
    const plan = await pf.plan(caller.userId);
    pf.assertPlan(action, plan);
    const subject = await resolveSubject(this.d.db, this.d.year, { subject: subjectId });
    await pf.readyUpload(caller.userId, uploadId, action.uploadKinds);
    const { tier, degraded } = await pf.tier(action, plan);
    const credits = quoteCredits(action);
    const { requestId, balance } = await pf.reserve(caller, action, plan, credits, { uploadId });
    const job = await this.createJob(caller, action, 'paper_from_upload', { uploadId, subjectKey: subject.key, credits, tier, degraded, plan }, { requestId, credits, plan, tier, degraded });
    this.kick(job.id);
    return { jobId: job.id, status: job.status as 'queued', action: action.id, credits, balance };
  }

  async startUploadProcessing(userId: string, uploadId: string): Promise<JobRow> {
    const job = await this.createJob({ userId }, null, 'upload_process', { uploadId }, null);
    this.kick(job.id);
    return job;
  }

  /* ---------------------------------------------------------------------------------------------- */
  /* Running                                                                                         */
  /* ---------------------------------------------------------------------------------------------- */

  /** Claims and runs one job (no-op if another runner holds it or it is finished). */
  async runJob(jobId: string): Promise<JobRow | null> {
    const now = this.now();
    const lockUntil = new Date(now.getTime() + JOB_LOCK_SECONDS * 1000);
    const [job] = await this.d.db
      .update(aiJobs)
      .set({ status: 'running', attempts: sql`${aiJobs.attempts} + 1`, lockedUntil: lockUntil, updatedAt: now })
      .where(and(eq(aiJobs.id, jobId), or(eq(aiJobs.status, 'queued'), and(eq(aiJobs.status, 'running'), lt(aiJobs.lockedUntil, now)))))
      .returning();
    if (!job) return null;
    if (job.attempts > JOB_MAX_ATTEMPTS) return this.fail(job, 'too_many_attempts', true);
    try {
      if (job.kind === 'upload_process') return await this.runUpload(job);
      if (job.kind === 'evaluation') return await this.runEvaluation(job);
      return await this.runPaper(job);
    } catch (e) {
      this.d.log().error({ err: (e as Error).message, jobId: job.id, kind: job.kind }, 'ai job error');
      // Leave it for a retry while attempts remain (the lock expires); refund on the last one.
      if (job.attempts >= JOB_MAX_ATTEMPTS) return this.fail(job, 'job_error', true);
      await this.d.db.update(aiJobs).set({ status: 'queued', lockedUntil: null, runAfter: new Date(this.d.clock.now() + 60_000), errorCode: 'retrying', updatedAt: this.now() }).where(eq(aiJobs.id, job.id));
      return null;
    }
  }

  /** Worker sweep: queued jobs that are due, and running jobs whose lock expired. */
  async runDue(limit = 20): Promise<{ ran: number }> {
    const now = this.now();
    const rows = await this.d.db
      .select({ id: aiJobs.id })
      .from(aiJobs)
      .where(or(and(eq(aiJobs.status, 'queued'), sql`${aiJobs.runAfter} <= ${now.toISOString()}::timestamptz`), and(eq(aiJobs.status, 'running'), lt(aiJobs.lockedUntil, now))))
      .orderBy(asc(aiJobs.runAfter))
      .limit(limit);
    let ran = 0;
    for (const r of rows) if (await this.runJob(r.id)) ran++;
    return { ran };
  }

  private async done(job: JobRow, result: Record<string, unknown>): Promise<JobRow> {
    const now = this.now();
    const [row] = await this.d.db.update(aiJobs).set({ status: 'succeeded', result, errorCode: null, lockedUntil: null, finishedAt: now, updatedAt: now }).where(eq(aiJobs.id, job.id)).returning();
    return row!;
  }

  private async fail(job: JobRow, code: string, refund: boolean, result: Record<string, unknown> | null = null): Promise<JobRow> {
    if (refund && job.requestId) {
      await this.d.credits.refund(job.userId, job.requestId, code).catch(() => {});
      await this.d.db.update(aiRequests).set({ status: 'failed', errorCode: code, creditsCharged: 0, updatedAt: this.now() }).where(eq(aiRequests.requestId, job.requestId));
    }
    if (job.kind === 'upload_process') {
      // Out of retries (e.g. moderation unavailable for too long): the upload is refused, never used unchecked.
      const { uploadId } = job.payload as { uploadId: string };
      await this.d.db
        .update(uploads)
        .set({ status: 'rejected', rejectReason: 'processing_failed', updatedAt: this.now() })
        .where(and(eq(uploads.id, uploadId), sql`${uploads.status} NOT IN ('ready', 'rejected', 'expired', 'deleted')`));
    }
    const now = this.now();
    const [row] = await this.d.db.update(aiJobs).set({ status: 'failed', errorCode: code, result, lockedUntil: null, finishedAt: now, updatedAt: now }).where(eq(aiJobs.id, job.id)).returning();
    return row!;
  }

  /** Meters the job's model calls into ai_requests and the spend breaker. */
  private async meter(job: JobRow, usages: UsageRecord[], status: string, creditsCharged: number, started: number, errorCode: string | null = null) {
    const cost = usages.reduce((n, u) => n + u.cost_paise, 0);
    const now = this.now();
    await this.d.db
      .update(aiRequests)
      .set({
        status,
        model: usages.at(-1)?.model ?? sql`${aiRequests.model}`,
        inputTokens: usages.reduce((n, u) => n + u.usage.input_tokens, 0),
        cachedInputTokens: usages.reduce((n, u) => n + u.usage.cached_input_tokens, 0),
        outputTokens: usages.reduce((n, u) => n + u.usage.output_tokens, 0),
        costInrPaise: Math.round(cost * 10_000) / 10_000,
        creditsCharged,
        latencyMs: now.getTime() - started,
        simulated: usages.some((u) => u.simulated),
        errorCode,
        updatedAt: now,
      })
      .where(eq(aiRequests.requestId, job.requestId!));
    if (cost > 0) await this.d.breaker.record(cost, (job.payload as { plan?: string }).plan === 'free', now);
  }

  private async reservationOpen(job: JobRow): Promise<boolean> {
    return (await this.d.credits.reservationState(job.requestId!)) === 'open';
  }

  private async runEvaluation(job: JobRow): Promise<JobRow> {
    const p = job.payload as { attemptId: string; itemIds: string[]; credits: number; tier: 'small' | 'mid' | 'verify' };
    if (!(await this.reservationOpen(job))) return this.fail(job, 'reservation_closed', false);
    const action = AI_ACTIONS[job.action as 'evaluate-answer' | 'evaluate-paper'];
    const started = this.d.clock.now();
    const ctx = { db: this.d.db, kv: this.d.kv, clock: this.d.clock, year: this.d.year };
    const { units, responseIds, test } = await evaluationUnits(ctx, job.userId, p.attemptId, p.itemIds);
    const runtime = this.d.runtime();
    const moderator = new Moderator(runtime.moderation);
    const usages: UsageRecord[] = [];
    const client = new ModelClient({ provider: runtime.provider, onUsage: (u) => void usages.push(u) });
    const evaluated: string[] = [];
    const notEvaluated: { itemId: string; reason: string }[] = [];
    const [req] = await this.d.db.select({ id: aiRequests.id }).from(aiRequests).where(eq(aiRequests.requestId, job.requestId!));
    for (const [itemId, list] of units) {
      try {
        const e = await evaluateItem(client, moderator, action, p.tier, { subjectName: test.subject.name, classLevel: test.subject.classLevel, board: test.subject.board }, list, usages);
        if (!e) {
          notEvaluated.push({ itemId, reason: 'unsafe_content' });
          continue;
        }
        await saveItemEvaluation(this.d.db, responseIds.get(itemId)!, e, req?.id ?? null, this.now());
        evaluated.push(itemId);
      } catch (err) {
        notEvaluated.push({ itemId, reason: 'evaluation_failed' });
        this.d.log().warn({ err: (err as Error).message, jobId: job.id }, 'AI evaluation of an answer failed');
      }
    }
    const perAnswer = action.pricing.kind === 'per_answer' ? action.pricing.creditsPerAnswer : p.credits;
    const used = Math.min(p.credits, evaluated.length * perAnswer);
    const outcome = used > 0 ? await this.d.credits.charge(job.userId, job.requestId!, { usedCredits: used }) : await this.d.credits.refund(job.userId, job.requestId!, 'nothing_evaluated');
    const charged = outcome === 'charged' || outcome === 'already_charged' ? used : 0;
    await this.meter(job, usages, evaluated.length ? 'succeeded' : 'failed', charged, started, evaluated.length ? null : 'nothing_evaluated');
    const result = { attemptId: p.attemptId, evaluated, notEvaluated, creditsCharged: charged, creditsRefunded: p.credits - charged, countsForRanks: false };
    return evaluated.length ? this.done(job, result) : this.fail(job, 'nothing_evaluated', false, result);
  }

  private async runPaper(job: JobRow): Promise<JobRow> {
    const p = job.payload as { uploadId: string; subjectKey: string; credits: number; tier: 'small' | 'mid' | 'verify' };
    if (!(await this.reservationOpen(job))) return this.fail(job, 'reservation_closed', false);
    const action = AI_ACTIONS['paper-from-upload'];
    const started = this.d.clock.now();
    const [u] = await this.d.db.select().from(uploads).where(and(eq(uploads.id, p.uploadId), eq(uploads.userId, job.userId)));
    if (!u || u.status !== 'ready' || !u.processedKey) return this.fail(job, 'upload_not_ready', true);
    const dataUrl = await this.d.preflight.uploadDataUrl(u);
    const chapterRows = await this.d.db
      .select({ key: chapters.key, title: chapters.title })
      .from(chapters)
      .innerJoin(subjects, eq(subjects.id, chapters.subjectId))
      .where(and(eq(subjects.key, p.subjectKey), eq(chapters.academicYear, this.d.year)))
      .orderBy(asc(chapters.number));
    const runtime = this.d.runtime();
    const usages: UsageRecord[] = [];
    const client = new ModelClient({ provider: runtime.provider, onUsage: (x) => void usages.push(x) });
    const instructions = [
      `Subject: ${p.subjectKey}. Allowed question types: ${BLUEPRINT_TYPES.join(', ')}.`,
      'Allowed chapter ids (id — title):',
      ...chapterRows.map((c) => `${c.key} — ${c.title}`),
      'The sample paper is attached. Return its blueprint.',
    ].join('\n');
    const isPdf = u.processedContentType === 'application/pdf';
    let bp: BlueprintOutput;
    try {
      const r = await client.structured({
        tier: p.tier,
        messages: [
          { role: 'system', content: systemRules('paper-blueprint') },
          { role: 'user', content: instructions, ...(isPdf ? { files: [{ dataUrl, filename: 'sample-paper.pdf' }] } : { images: [{ dataUrl, detail: 'high' as const }] }) },
        ],
        schema: BlueprintOutput,
        schemaName: 'paper_blueprint',
        maxOutputTokens: action.maxOutputTokens,
        reasoningEffort: action.reasoningEffort,
        meta: { purpose: action.id, item: job.id },
        mock: { fixture: FIXTURE.blueprint, input: { chapterIds: chapterRows.map((c) => c.key), pages: u.pages ?? 1 } satisfies BlueprintFixtureInput },
      });
      bp = r.data;
    } catch (e) {
      await this.meter(job, usages, 'failed', 0, started, 'blueprint_failed');
      this.d.log().warn({ err: (e as Error).message, jobId: job.id }, 'blueprint extraction failed');
      return this.fail(job, 'blueprint_failed', true);
    }
    // Chapters must exist in our catalog for this subject (AC-13); unknown ids are dropped.
    const known = new Set(chapterRows.map((c) => c.key));
    let chapterIds = [...new Set(bp.chapter_ids.filter((c) => known.has(c)))];
    if (!chapterIds.length) chapterIds = chapterRows.map((c) => c.key);
    const types = [...new Set(bp.sections.map((s) => s.question_type))].filter((t) => (QUESTION_TYPES as readonly string[]).includes(t)) as QuestionType[];
    const questionCount = Math.max(TEST_ENGINE.custom.minQuestions, Math.min(TEST_ENGINE.custom.maxQuestions, bp.sections.reduce((n, s) => n + s.count, 0)));
    const durationMin = Math.max(TEST_ENGINE.custom.minDurationMin, Math.min(TEST_ENGINE.custom.maxDurationMin, bp.duration_min));
    const ctx = { db: this.d.db, kv: this.d.kv, clock: this.d.clock, year: this.d.year };
    const title = 'Practice paper like your school’s';
    let built: { testId: string; skippedChapters: string[] } | null = null;
    // Papers are drawn from OUR bank by blueprint; the school's questions are never stored or reused.
    for (const attempt of [
      { types, questionCount },
      { types: undefined, questionCount },
      { types: undefined, questionCount: Math.max(TEST_ENGINE.custom.minQuestions, Math.floor(questionCount / 2)) },
    ]) {
      try {
        built = await buildCustomTest(ctx, job.userId, { subjectId: p.subjectKey, chapterIds: chapterIds.slice(0, TEST_ENGINE.custom.maxChapters), types: attempt.types?.length ? attempt.types : undefined, questionCount: attempt.questionCount, durationMin, title });
        break;
      } catch (e) {
        if (!(e instanceof ApiProblem && e.code === 'bank_too_small')) throw e;
      }
    }
    if (!built) {
      await this.meter(job, usages, 'failed', 0, started, 'bank_too_small');
      return this.fail(job, 'bank_too_small', true);
    }
    const outcome = await this.d.credits.charge(job.userId, job.requestId!);
    const charged = outcome === 'charged' || outcome === 'already_charged' ? p.credits : 0;
    await this.meter(job, usages, 'succeeded', charged, started);
    const blueprint = { durationMin: bp.duration_min, totalMarks: bp.total_marks, sections: bp.sections.map((s) => ({ id: s.id, questionType: s.question_type, count: s.count, marksEach: s.marks_each, internalChoice: s.internal_choice })), chapterIds };
    return this.done(job, { blueprint, testId: built.testId, skippedChapters: built.skippedChapters, creditsCharged: charged });
  }

  private async runUpload(job: JobRow): Promise<JobRow> {
    const { uploadId } = job.payload as { uploadId: string };
    const [u] = await this.d.db.select().from(uploads).where(and(eq(uploads.id, uploadId), eq(uploads.userId, job.userId)));
    if (!u) return this.fail(job, 'upload_missing', false);
    if (u.status === 'ready' || u.status === 'rejected') return this.done(job, { uploadId, status: u.status });
    const blob = this.d.runtime().blob;
    const now = this.now();
    await this.d.db.update(uploads).set({ status: 'scanning', updatedAt: now }).where(eq(uploads.id, u.id));
    const reject = async (reason: string) => {
      await blob.delete(AI_UPLOADS.containers.quarantine, u.blobKey).catch(() => {});
      await this.d.db.update(uploads).set({ status: 'rejected', rejectReason: reason, updatedAt: this.now() }).where(eq(uploads.id, u.id));
      return this.done(job, { uploadId, status: 'rejected', reason });
    };
    let data: Buffer;
    try {
      data = await blob.get(AI_UPLOADS.containers.quarantine, u.blobKey, AI_UPLOADS.maxBytes);
    } catch (e) {
      if (e instanceof BlobTooLargeError) return reject('too_large');
      throw e;
    }
    let cleaned;
    try {
      cleaned = validateAndClean(data, u.contentType);
    } catch (e) {
      if (e instanceof UploadRejectedError) return reject(e.reason);
      throw e;
    }
    if (cleaned.type !== 'application/pdf') {
      // Image moderation before any model sees it (AC-15). A Content Safety outage throws: the job is
      // retried and the upload stays unusable (fail closed, F-027).
      const moderation = this.d.runtime().moderation;
      if (!moderation.isStandIn && cleaned.bytes > CONTENT_SAFETY_IMAGE_MAX_BYTES) return reject('image_too_large_to_check');
      const verdict = await new Moderator(moderation).checkImage(cleaned.data);
      if (verdict.blocked) {
        this.d.log().warn({ alert: verdict.selfHarm, alertKind: verdict.selfHarm ? 'self_harm_signal' : undefined, userId: u.userId, uploadId: u.id, reasons: verdict.reasons }, 'upload refused by image moderation');
        return reject('unsafe_content');
      }
    }
    const processedKey = `${u.userId}/${u.id}.${EXTENSION[cleaned.type]}`;
    await blob.put(AI_UPLOADS.containers.clean, processedKey, cleaned.data, cleaned.type);
    await blob.delete(AI_UPLOADS.containers.quarantine, u.blobKey).catch(() => {});
    await this.d.db
      .update(uploads)
      .set({ status: 'ready', bytes: cleaned.bytes, pages: cleaned.pages, sha256: createHash('sha256').update(cleaned.data).digest('hex'), processedKey, processedContentType: cleaned.type, rejectReason: null, updatedAt: this.now() })
      .where(eq(uploads.id, u.id));
    return this.done(job, { uploadId, status: 'ready' });
  }

  /** GET /v1/ai/jobs/:id (owner only). */
  async jobView(userId: string, jobId: string) {
    const [j] = await this.d.db.select().from(aiJobs).where(and(eq(aiJobs.id, jobId), eq(aiJobs.userId, userId)));
    if (!j || j.kind === 'upload_process') throw new ApiProblem('not_found');
    return {
      id: j.id,
      kind: j.kind as 'evaluation' | 'paper_from_upload',
      action: j.action,
      status: j.status as 'queued' | 'running' | 'succeeded' | 'failed',
      result: (j.result ?? null) as Record<string, unknown> | null,
      error: j.status === 'failed' ? j.errorCode : null,
      createdAt: j.createdAt.toISOString(),
      finishedAt: j.finishedAt?.toISOString() ?? null,
    };
  }

  /** Latest evaluation job of an attempt (for GET /v1/attempts/:id/ai-evaluation). */
  async latestEvaluationJob(userId: string, attemptId: string) {
    const rows = await this.d.db
      .select({ id: aiJobs.id, status: aiJobs.status, createdAt: aiJobs.createdAt })
      .from(aiJobs)
      .where(and(eq(aiJobs.userId, userId), eq(aiJobs.kind, 'evaluation'), sql`${aiJobs.payload}->>'attemptId' = ${attemptId}`))
      .orderBy(sql`${aiJobs.createdAt} DESC`)
      .limit(1);
    return rows[0] ? { id: rows[0].id, status: rows[0].status } : null;
  }
}

/** Upload ids → unique quarantine keys. */
export function quarantineKey(userId: string): string {
  return `${userId}/${randomUUID()}`;
}

