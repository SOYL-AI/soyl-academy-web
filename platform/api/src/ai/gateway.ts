/**
 * AI gateway for streamed actions (ARCHITECTURE §10; ADR-013). Every model call in the API goes
 * through here (or the job runner, which uses the same pieces).
 *
 *  prepare (problem+json on refusal, nothing charged)
 *    plan (EntitlementService) → plan allows the action → no live test in progress (AC-14)
 *    → spend breaker (paused → ai_paused; degraded → smaller tier or paused) → request context
 *    (chapter, slide, conversation, upload: all owned/visible) → concurrent-stream slot (KV, fails
 *    closed) → reserve credits (paywall 402) → ai_requests row
 *  run (SSE: meta, delta…, refusal | error, done)
 *    input moderation (fail closed) → retrieval → prompt (stable prefix) → stream; every chunk of
 *    output is moderated before it is sent → meter tokens and INR (ai_requests, spend breaker)
 *    → charge or refund (F-008: refund before output / moderation blocks / our errors; charge once
 *    output has been shown, even if the client disconnects or the model fails later)
 */
import { createHash, randomUUID } from 'node:crypto';
import { and, asc, count, desc, eq, isNotNull, sql } from 'drizzle-orm';
import { aiConversations, aiMessages, aiRequests, attempts, profiles, uploads, type Database } from '@soyl/db';
import { CallerAbortedError, ModelClient, ProviderUnavailableError, StreamInterruptedError, type UsageRecord } from '@soyl/ai-core';
import { MODELS, type ModelTier } from '@soyl/shared/config/models';
import { AI_GATEWAY } from '@soyl/shared/config/credits';
import { AI_MODERATION, AI_UPLOADS, quoteCredits, type AiActionConfig } from '@soyl/shared/config/ai-actions';
import type { PlanId } from '@soyl/shared/config/plans';
import { AI_MAX_CONCURRENT_STREAMS } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { KvUnavailableError, type KeyValueStore } from '../kv';
import { loadChapter, loadDeck, type ChapterRef } from '../domain/content';
import { InsufficientCreditsError, type CreditService } from './credits';
import { FIXTURE, type ChatFixtureInput } from './fixtures';
import { Moderator } from './moderation/moderator';
import { ModerationUnavailableError, type ModerationVerdict } from './moderation/types';
import { buildChatMessages, detectLanguage, tutorMode, type ContextChunk, type ReplyLanguage, type TutorMode } from './prompts';
import { searchContent } from './retrieval';
import type { AiRuntime } from './runtime';
import type { SpendBreaker } from './spend';
import { nextIstMidnight, secondsUntil } from './time';

export interface ActionBody {
  message?: string;
  attempt?: string;
  reveal?: boolean;
  conversationId?: string;
  chapterId?: string;
  slide?: { part?: number; slideId: string };
  uploadId?: string;
  subjectId?: string;
  attemptId?: string;
  itemIds?: string[];
}

export interface Caller {
  userId: string;
  idempotencyKey?: string | null;
}

export interface SseSink {
  event(name: 'meta' | 'delta' | 'refusal' | 'error' | 'done', data: Record<string, unknown>): void;
}

export interface GatewayDeps {
  db: Database;
  kv: KeyValueStore;
  clock: Clock;
  year: string;
  plansUrl: string;
  runtime: () => AiRuntime;
  credits: CreditService;
  breaker: SpendBreaker;
  log: () => { warn(o: object, m?: string): void; info(o: object, m?: string): void; error(o: object, m?: string): void };
}

const bad = (path: string, message: string) => new ApiProblem('validation_failed', { errors: [{ path, message }] });

/** Idempotency-Key → request id, scoped to the user so keys can never collide across students. */
export function requestIdFor(userId: string, key: string | null | undefined): string {
  if (!key) return randomUUID();
  return `idem_${createHash('sha256').update(`${userId}\n${key}`).digest('base64url').slice(0, 32)}`;
}

export function paywall(e: InsufficientCreditsError, now: Date, plansUrl: string): ApiProblem {
  const resetIn = secondsUntil(e.resetAt, now);
  return new ApiProblem('credits_exhausted', {
    detail: `This needs ${e.required} credit${e.required === 1 ? '' : 's'} and you have ${e.balance} left today. Credits reset at midnight (IST).`,
    fields: { balance: e.balance, required: e.required, resetAt: e.resetAt.toISOString(), resetInSeconds: resetIn, plan: e.plan, plansUrl },
  });
}

export interface Scope {
  board: string;
  classLevel: number;
  exam: string | null;
  chapter: ChapterRef | null;
  subjectKey: string | null;
  subjectName: string | null;
  subjectLanguage: string;
}

/** Shared pre-flight for streamed and job actions. */
export class Preflight {
  constructor(private readonly d: GatewayDeps) {}

  now(): Date {
    return new Date(this.d.clock.now());
  }

  async plan(userId: string): Promise<PlanId> {
    try {
      return await this.d.runtime().entitlements.planFor(userId, this.now());
    } catch {
      throw new ApiProblem('ai_unavailable', { detail: 'We could not check your plan right now.' });
    }
  }

  assertPlan(action: AiActionConfig, plan: PlanId): void {
    if (!action.plans.includes(plan))
      throw new ApiProblem('plan_required', { detail: `${action.label} is part of the Plus, Pro and Board Exam Pass plans.`, fields: { plan, plansUrl: this.d.plansUrl } });
  }

  /** AC-14: no AI while a live mock is in progress for this student. */
  async assertNoLiveTest(userId: string): Promise<void> {
    const [r] = await this.d.db
      .select({ n: count() })
      .from(attempts)
      .where(and(eq(attempts.userId, userId), eq(attempts.status, 'in_progress'), isNotNull(attempts.liveEventId), sql`${attempts.deadlineAt} > ${this.now().toISOString()}::timestamptz`));
    if ((r?.n ?? 0) > 0) throw new ApiProblem('ai_blocked_during_test');
  }

  /** Spend breaker → the tier to use (or ai_paused). */
  async tier(action: AiActionConfig, plan: PlanId): Promise<{ tier: ModelTier; degraded: boolean }> {
    const state = await this.d.breaker.state(plan === 'free', this.now());
    const pause = () => {
      const now = this.now();
      const s = secondsUntil(nextIstMidnight(now), now);
      return new ApiProblem('ai_paused', { retryAfterSeconds: s, headers: { 'retry-after': String(s) }, detail: 'AI help will be back by midnight (IST). Your credits are safe.' });
    };
    if (state.status === 'paused') throw pause();
    if (state.status === 'degraded') {
      if (!action.degradeTo) throw pause();
      return { tier: action.degradeTo, degraded: action.degradeTo !== action.tier };
    }
    return { tier: action.tier, degraded: false };
  }

  async scope(userId: string, chapterKey: string | undefined | null): Promise<Scope> {
    const [p] = await this.d.db.select({ board: profiles.board, classLevel: profiles.classLevel }).from(profiles).where(eq(profiles.userId, userId));
    let chapter: ChapterRef | null = null;
    if (chapterKey) chapter = await loadChapter(this.d.db, chapterKey, this.d.year);
    const board = chapter?.subject.board ?? p?.board ?? 'cbse';
    const classLevel = chapter?.subject.classLevel ?? p?.classLevel ?? 10;
    const exam = chapter?.subject.exam ?? (board === 'cbse' ? 'cbse' : classLevel <= 10 ? 'icse' : 'isc');
    return { board, classLevel, exam, chapter, subjectKey: chapter?.subject.key ?? null, subjectName: chapter?.subject.name ?? null, subjectLanguage: chapter?.subject.language ?? 'en' };
  }

  /** An upload of this user, of an allowed kind, processed and not expired. */
  async readyUpload(userId: string, uploadId: string, kinds: readonly string[]) {
    const [u] = await this.d.db.select().from(uploads).where(and(eq(uploads.id, uploadId), eq(uploads.userId, userId)));
    if (!u || !kinds.includes(u.kind)) throw new ApiProblem('not_found');
    if (u.status === 'rejected') throw new ApiProblem('upload_rejected', { detail: u.rejectReason ?? undefined });
    if (u.status !== 'ready' || !u.processedKey || u.expiresAt.getTime() <= this.d.clock.now()) throw new ApiProblem('upload_not_ready');
    // S6-M01 / ADR-020: a file type that is no longer accepted (a PDF processed before PDFs were turned
    // off) never reaches a model: its pages could not be counted reliably, nor its content checked.
    if (!(AI_UPLOADS.contentTypes as readonly string[]).includes(u.processedContentType ?? u.contentType))
      throw new ApiProblem('upload_rejected', { detail: 'This file type cannot be used. Upload a photo (JPEG, PNG or WebP) instead.' });
    return u;
  }

  async uploadDataUrl(u: { processedKey: string | null; processedContentType: string | null }): Promise<string> {
    let data: Buffer;
    try {
      data = await this.d.runtime().blob.get(AI_UPLOADS.containers.clean, u.processedKey!, AI_UPLOADS.maxBytes);
    } catch {
      throw new ApiProblem('ai_unavailable', { detail: 'We could not read your file right now.' });
    }
    return `data:${u.processedContentType};base64,${data.toString('base64')}`;
  }

  /** Reserve with the paywall problem on exhaustion and duplicate detection for Idempotency-Key retries. */
  async reserve(caller: Caller, action: AiActionConfig, plan: PlanId, credits: number, metadata: Record<string, unknown>) {
    const requestId = requestIdFor(caller.userId, caller.idempotencyKey);
    try {
      const r = await this.d.credits.reserve({ userId: caller.userId, requestId, action: action.id, credits, plan, ttlSeconds: action.reservationTtlSeconds, metadata });
      if (!r.created) throw new ApiProblem('duplicate_request', { detail: r.state === 'open' ? 'This request is still running.' : 'This request was already answered.' });
      return { requestId, balance: r.balance };
    } catch (e) {
      if (e instanceof InsufficientCreditsError) throw paywall(e, this.now(), this.d.plansUrl);
      throw e;
    }
  }
}

/** Per-user concurrent stream slots in KV (API-RL-2). Fails closed when KV is down (F-027). */
export class StreamSlots {
  constructor(
    private readonly kv: KeyValueStore,
    private readonly clock: Clock,
  ) {}

  async acquire(userId: string): Promise<string> {
    const ttl = AI_GATEWAY.streamSlotTtlSeconds * 1000;
    try {
      for (let i = 0; i < AI_MAX_CONCURRENT_STREAMS; i++) {
        const key = `ai:stream:${userId}:${i}`;
        if (await this.kv.setIfAbsent(key, '1', ttl, this.clock.now())) return key;
      }
    } catch (e) {
      if (e instanceof KvUnavailableError) throw new ApiProblem('ai_unavailable');
      throw e;
    }
    throw new ApiProblem('ai_busy', { retryAfterSeconds: 5, headers: { 'retry-after': '5' } });
  }

  async release(key: string): Promise<void> {
    await this.kv.del(key).catch(() => {});
  }
}

export interface PreparedStream {
  requestId: string;
  conversationId: string;
  run(sink: SseSink, signal: AbortSignal): Promise<StreamOutcome>;
}

export interface StreamOutcome {
  status: 'succeeded' | 'moderated' | 'refused' | 'failed' | 'cancelled';
  settled: 'charged' | 'refunded';
  outputStarted: boolean;
  text: string;
}

const sumUsage = (u: UsageRecord[]) =>
  u.reduce(
    (a, r) => ({
      input: a.input + r.usage.input_tokens,
      cached: a.cached + r.usage.cached_input_tokens,
      output: a.output + r.usage.output_tokens,
      cost: a.cost + r.cost_paise,
      simulated: a.simulated || r.simulated,
      model: r.model,
    }),
    { input: 0, cached: 0, output: 0, cost: 0, simulated: false, model: 'none' },
  );

const flags = (v: ModerationVerdict | null) => (v ? { blocked: v.blocked, reasons: v.reasons, severities: v.severities, provider: v.provider } : null);

export class AiGateway {
  readonly preflight: Preflight;
  readonly slots: StreamSlots;

  constructor(private readonly d: GatewayDeps) {
    this.preflight = new Preflight(d);
    this.slots = new StreamSlots(d.kv, d.clock);
  }

  /** Validates the body per action and returns the student's text. */
  private validate(action: AiActionConfig, body: ActionBody): string {
    const message = body.message?.trim() ?? '';
    if (message.length > action.maxInputChars) throw bad('body.message', `At most ${action.maxInputChars} characters.`);
    if ((body.attempt?.length ?? 0) > action.maxInputChars) throw bad('body.attempt', `At most ${action.maxInputChars} characters.`);
    if (action.template === 'explain-slide') {
      if (!body.chapterId || !body.slide) throw bad('body.slide', 'chapterId and slide are required.');
      return message || 'Please explain this slide in simpler words.';
    }
    if (action.uploadKinds.length) {
      if (!body.uploadId) throw bad('body.uploadId', 'Upload a photo of the question first.');
      return message || 'Please help me with this question.';
    }
    if (!message) throw bad('body.message', 'Type your question.');
    return message;
  }

  async prepare(caller: Caller, action: AiActionConfig, body: ActionBody): Promise<PreparedStream> {
    const { db } = this.d;
    const message = this.validate(action, body);
    const plan = await this.preflight.plan(caller.userId);
    this.preflight.assertPlan(action, plan);
    await this.preflight.assertNoLiveTest(caller.userId);
    const { tier, degraded } = await this.preflight.tier(action, plan);

    // Conversation (owned) and scope.
    let conversation: typeof aiConversations.$inferSelect | null = null;
    if (body.conversationId) {
      conversation = (await db.select().from(aiConversations).where(and(eq(aiConversations.id, body.conversationId), eq(aiConversations.userId, caller.userId))))[0] ?? null;
      if (!conversation) throw new ApiProblem('not_found');
    }
    let chapterKey = body.chapterId ?? null;
    if (!chapterKey && conversation?.chapterId) {
      const rows = await db.execute<{ key: string }>(sql`SELECT key FROM chapters WHERE id = ${conversation.chapterId}`);
      chapterKey = rows.rows[0]?.key ?? null;
    }
    const scope = await this.preflight.scope(caller.userId, chapterKey);

    // Slide (explain-slide) and image (photo doubt).
    const pinned: ContextChunk[] = [];
    if (action.template === 'explain-slide') {
      const deck = await loadDeck(db, scope.chapter!, this.d.year, body.slide!.part);
      const s = deck.slides.find((x) => x.id === body.slide!.slideId);
      if (!s) throw new ApiProblem('not_found');
      pinned.push({ title: `${deck.title} — ${s.heading}`, text: [s.body_md, ...s.bullets.map((b) => `- ${b}`), ...(s.columns ?? []), s.narration].filter(Boolean).join('\n') });
    }
    let imageUrl: string | null = null;
    if (action.uploadKinds.length) {
      const u = await this.preflight.readyUpload(caller.userId, body.uploadId!, action.uploadKinds);
      imageUrl = await this.preflight.uploadDataUrl(u);
    }

    const slot = await this.slots.acquire(caller.userId);
    let requestId: string;
    let balance: number;
    const credits = quoteCredits(action);
    try {
      ({ requestId, balance } = await this.preflight.reserve(caller, action, plan, credits, { tier, degraded }));
    } catch (e) {
      await this.slots.release(slot);
      throw e;
    }
    const now = this.preflight.now();
    if (!conversation) {
      conversation = (await db
        .insert(aiConversations)
        .values({ userId: caller.userId, kind: action.conversationKind, chapterId: scope.chapter?.id ?? null, title: message.slice(0, 60), lastMessageAt: now, createdAt: now, updatedAt: now })
        .returning())[0]!;
    }
    const conv = conversation!;
    await db.insert(aiRequests).values({
      userId: caller.userId,
      requestId,
      action: action.id,
      modelTier: tier,
      model: MODELS[tier].display_name,
      status: 'pending',
      conversationId: conv.id,
      creditsQuoted: credits,
      planId: plan,
      degraded,
      simulated: this.d.runtime().provider.simulated,
      createdAt: now,
      updatedAt: now,
    });

    return {
      requestId,
      conversationId: conv.id,
      run: (sink, signal) =>
        this.run({ caller, action, body, message, plan, tier, degraded, scope, conversationId: conv.id, pinned, imageUrl, requestId, credits, balance }, sink, signal).finally(() =>
          this.slots.release(slot),
        ),
    };
  }

  private async finish(
    p: { caller: Caller; requestId: string; credits: number; plan: PlanId; conversationId: string },
    r: {
      status: StreamOutcome['status'];
      settle: 'charge' | 'refund';
      reason: string;
      usages: UsageRecord[];
      extraCostPaise: number;
      started: number;
      firstShownAt: number | null;
      input: ModerationVerdict | null;
      output: ModerationVerdict | null;
      errorCode: string | null;
      messages: { role: 'user' | 'assistant'; content: string; flags?: object | null }[];
    },
  ): Promise<{ settled: 'charged' | 'refunded'; balance: number }> {
    const { db } = this.d;
    const u = sumUsage(r.usages);
    const cost = u.cost + r.extraCostPaise;
    const outcome = r.settle === 'charge' ? await this.d.credits.charge(p.caller.userId, p.requestId) : await this.d.credits.refund(p.caller.userId, p.requestId, r.reason);
    const settled = outcome === 'charged' || outcome === 'already_charged' ? 'charged' : 'refunded';
    const now = this.preflight.now();
    await db
      .update(aiRequests)
      .set({
        status: r.status,
        model: u.model === 'none' ? sql`${aiRequests.model}` : u.model,
        inputTokens: u.input,
        cachedInputTokens: u.cached,
        outputTokens: u.output,
        costInrPaise: Math.round(cost * 10_000) / 10_000,
        creditsCharged: settled === 'charged' ? p.credits : 0,
        latencyMs: now.getTime() - r.started,
        firstTokenMs: r.firstShownAt ? r.firstShownAt - r.started : null,
        moderationFlags: { input: flags(r.input), output: flags(r.output) },
        errorCode: r.errorCode,
        simulated: u.simulated,
        updatedAt: now,
      })
      .where(eq(aiRequests.requestId, p.requestId));
    if (cost > 0) await this.d.breaker.record(cost, p.plan === 'free', now);
    if (r.messages.length) {
      const [req] = await db.select({ id: aiRequests.id }).from(aiRequests).where(eq(aiRequests.requestId, p.requestId));
      // Strictly increasing timestamps within a conversation keep turns in order even when clocks tie.
      const [last] = await db.select({ at: aiMessages.createdAt }).from(aiMessages).where(eq(aiMessages.conversationId, p.conversationId)).orderBy(desc(aiMessages.createdAt)).limit(1);
      const base = Math.max(now.getTime(), (last?.at.getTime() ?? 0) + 1);
      await db.insert(aiMessages).values(
        r.messages.map((m, i) => ({
          conversationId: p.conversationId,
          role: m.role,
          content: m.content,
          aiRequestId: m.role === 'assistant' ? (req?.id ?? null) : null,
          moderationFlags: m.flags ?? {},
          createdAt: new Date(base + i),
          updatedAt: now,
        })),
      );
      await db.update(aiConversations).set({ lastMessageAt: now, updatedAt: now }).where(eq(aiConversations.id, p.conversationId));
    }
    const view = await this.d.credits.balance(p.caller.userId, p.plan);
    return { settled, balance: view.balance };
  }

  private async run(
    p: {
      caller: Caller;
      action: AiActionConfig;
      body: ActionBody;
      message: string;
      plan: PlanId;
      tier: ModelTier;
      degraded: boolean;
      scope: Scope;
      conversationId: string;
      pinned: ContextChunk[];
      imageUrl: string | null;
      requestId: string;
      credits: number;
      balance: number;
    },
    sink: SseSink,
    clientSignal: AbortSignal,
  ): Promise<StreamOutcome> {
    const { db } = this.d;
    const runtime = this.d.runtime();
    const moderator = new Moderator(runtime.moderation);
    const started = this.d.clock.now();
    const usages: UsageRecord[] = [];
    let extraCostPaise = 0;
    const history = (
      await db
        .select({ role: aiMessages.role, content: aiMessages.content })
        .from(aiMessages)
        .where(eq(aiMessages.conversationId, p.conversationId))
        .orderBy(desc(aiMessages.createdAt))
        .limit(AI_GATEWAY.historyMessages)
    ).reverse() as { role: 'user' | 'assistant'; content: string }[];
    const priorAssistantTurns = history.filter((h) => h.role === 'assistant').length;
    const language: ReplyLanguage = detectLanguage(p.message, p.scope.subjectLanguage);
    const mode: TutorMode = tutorMode({ template: p.action.template, message: p.message, attempt: p.body.attempt, reveal: p.body.reveal, priorAssistantTurns });
    sink.event('meta', { requestId: p.requestId, conversationId: p.conversationId, action: p.action.id, credits: p.credits, balance: p.balance, tier: p.tier, degraded: p.degraded, mode, language });

    const base = { caller: p.caller, requestId: p.requestId, credits: p.credits, plan: p.plan, conversationId: p.conversationId };
    const userText = p.body.attempt?.trim() ? `${p.message}\n\n(My attempt) ${p.body.attempt.trim()}` : p.message;

    // 1. Input moderation (fail closed).
    let input: ModerationVerdict;
    try {
      input = await moderator.checkInput(userText, p.action.moderation);
    } catch (e) {
      if (!(e instanceof ModerationUnavailableError)) throw e;
      const f = await this.finish(base, { status: 'failed', settle: 'refund', reason: 'moderation_unavailable', usages, extraCostPaise, started, firstShownAt: null, input: null, output: null, errorCode: 'moderation_unavailable', messages: [] });
      sink.event('error', { code: 'ai_unavailable', message: 'AI help is not available right now. Please try again shortly.', creditsRefunded: p.credits, balance: f.balance });
      sink.event('done', { status: 'failed', creditsCharged: 0, balance: f.balance });
      return { status: 'failed', settled: f.settled, outputStarted: false, text: '' };
    }
    if (input.blocked) {
      const refusal = Moderator.refusalFor(input);
      const status = refusal.kind === 'off_topic' ? 'refused' : 'moderated';
      if (input.selfHarm) this.d.log().warn({ alert: true, alertKind: 'self_harm_signal', userId: p.caller.userId, requestId: p.requestId }, 'self-harm signal in an AI request (review queue)');
      const f = await this.finish(base, {
        status,
        settle: 'refund',
        reason: `moderation_${refusal.kind}`,
        usages,
        extraCostPaise,
        started,
        firstShownAt: null,
        input,
        output: null,
        errorCode: null,
        messages: [
          { role: 'user', content: userText, flags: flags(input) },
          { role: 'assistant', content: refusal.message },
        ],
      });
      sink.event('refusal', { kind: refusal.kind, message: refusal.message, creditsRefunded: p.credits, balance: f.balance });
      sink.event('done', { status, creditsCharged: 0, balance: f.balance });
      return { status, settled: f.settled, outputStarted: false, text: '' };
    }

    // 2. Retrieval (our published content only) and the prompt.
    let context: ContextChunk[] = [...p.pinned];
    if (p.action.retrievalK > 0) {
      try {
        const r = await searchContent(
          db,
          { academicYear: this.d.year, exam: p.scope.exam, classLevel: p.scope.classLevel, subjectKey: p.scope.subjectKey, chapterId: p.scope.chapter?.id ?? null },
          `${p.scope.chapter?.title ?? ''} ${p.message}`,
          p.action.retrievalK,
          runtime.embedder,
        );
        extraCostPaise += r.embeddingCostPaise;
        context = [...context, ...r.chunks.map((c) => ({ title: c.title, text: c.text }))];
      } catch (e) {
        // Retrieval is best effort: the tutor still answers from general syllabus knowledge.
        this.d.log().warn({ err: (e as Error).message, requestId: p.requestId }, 'retrieval failed');
      }
    }
    const messages = buildChatMessages({
      template: p.action.template,
      scope: { board: p.scope.board, classLevel: p.scope.classLevel, subjectName: p.scope.subjectName, chapterTitle: p.scope.chapter?.title ?? null },
      context,
      history,
      message: p.message,
      attempt: p.body.attempt,
      mode,
      language,
      images: p.imageUrl ? [{ dataUrl: p.imageUrl, detail: 'high' }] : undefined,
    });

    // 3. Stream with chunked output moderation.
    const controller = new AbortController();
    const timeCap = AbortSignal.timeout(AI_GATEWAY.maxStreamSeconds * 1000);
    const signal = AbortSignal.any([controller.signal, clientSignal, timeCap]);
    const client = new ModelClient({ provider: runtime.provider, onUsage: (u) => void usages.push(u) });
    const chunkChars = p.action.moderation.outputChunkChars;
    let pending = '';
    let shown = '';
    let firstShownAt: number | null = null;
    let blocked: ModerationVerdict | null = null;
    let outputModerationFailed = false;
    let chain: Promise<void> = Promise.resolve();
    const emit = (chunk: string) => {
      chain = chain.then(async () => {
        if (blocked || outputModerationFailed || !chunk) return;
        try {
          const v = await moderator.checkOutput(chunk);
          if (v.blocked) {
            blocked = v;
            controller.abort();
            return;
          }
        } catch {
          outputModerationFailed = true;
          controller.abort();
          return;
        }
        if (clientSignal.aborted) return;
        shown += chunk;
        firstShownAt ??= this.d.clock.now();
        sink.event('delta', { text: chunk });
      });
    };
    const takeChunk = () => {
      // Cut at the last sentence/line end inside the window so moderation sees whole sentences.
      const window = pending.slice(0, chunkChars * 2);
      const cut = Math.max(window.lastIndexOf('. '), window.lastIndexOf('\n'), window.lastIndexOf('? '), window.lastIndexOf('! '), window.lastIndexOf('। '));
      const at = cut >= chunkChars / 2 ? cut + 1 : pending.length >= chunkChars * 2 ? chunkChars * 2 : -1;
      if (at < 0) return;
      emit(pending.slice(0, at));
      pending = pending.slice(at);
    };
    const fixture: ChatFixtureInput = { template: p.action.template, mode, language, contextTitles: context.map((c) => c.title), hasImage: !!p.imageUrl };
    let failure: unknown = null;
    try {
      await client.stream(
        {
          tier: p.tier,
          messages,
          maxOutputTokens: p.action.maxOutputTokens,
          reasoningEffort: p.action.reasoningEffort,
          meta: { purpose: p.action.id, item: p.requestId },
          mock: { fixture: FIXTURE.chat, input: fixture },
          signal,
        },
        (delta) => {
          pending += delta;
          if (pending.length >= chunkChars) takeChunk();
        },
      );
    } catch (e) {
      failure = e;
    }
    await chain;
    if (!failure && !blocked && !outputModerationFailed && pending) {
      emit(pending);
      pending = '';
      await chain;
    }

    const outputStarted = shown.length > 0;
    const answerMessages = (status: string) => [
      { role: 'user' as const, content: userText, flags: flags(input) },
      { role: 'assistant' as const, content: status === 'succeeded' ? shown : `${shown}\n\n_(answer interrupted)_` },
    ];

    if (blocked) {
      const f = await this.finish(base, { status: 'moderated', settle: 'refund', reason: 'output_blocked', usages, extraCostPaise, started, firstShownAt, input, output: blocked, errorCode: null, messages: [{ role: 'user', content: userText, flags: flags(input) }, { role: 'assistant', content: AI_MODERATION.outputBlockedMessage, flags: flags(blocked) }] });
      sink.event('refusal', { kind: 'output_blocked', message: AI_MODERATION.outputBlockedMessage, creditsRefunded: p.credits, balance: f.balance });
      sink.event('done', { status: 'moderated', creditsCharged: 0, balance: f.balance });
      return { status: 'moderated', settled: f.settled, outputStarted, text: shown };
    }
    if (outputModerationFailed) {
      // Our dependency failed: refund (F-008 "our errors"), never show unmoderated text.
      const f = await this.finish(base, { status: 'failed', settle: 'refund', reason: 'moderation_unavailable', usages, extraCostPaise, started, firstShownAt, input, output: null, errorCode: 'moderation_unavailable', messages: outputStarted ? answerMessages('failed') : [] });
      sink.event('error', { code: 'ai_unavailable', message: 'AI help is not available right now. Please try again shortly.', creditsRefunded: p.credits, balance: f.balance });
      sink.event('done', { status: 'failed', creditsCharged: 0, balance: f.balance });
      return { status: 'failed', settled: f.settled, outputStarted, text: shown };
    }
    if (failure) {
      if (failure instanceof StreamInterruptedError && failure.usage && !usages.includes(failure.usage)) usages.push(failure.usage);
      const cancelled = clientSignal.aborted || failure instanceof CallerAbortedError || (failure instanceof StreamInterruptedError && failure.cancelled && !timeCap.aborted);
      const status = cancelled ? 'cancelled' : 'failed';
      const errorCode = timeCap.aborted ? 'time_cap' : cancelled ? 'client_disconnected' : failure instanceof ProviderUnavailableError ? 'provider_unavailable' : 'provider_error';
      if (!(failure instanceof ProviderUnavailableError) && !cancelled) this.d.log().warn({ err: (failure as Error).message, requestId: p.requestId }, 'model call failed');
      // F-008: output already shown → charged (also on disconnect); nothing shown → refunded.
      const f = await this.finish(base, { status, settle: outputStarted ? 'charge' : 'refund', reason: errorCode, usages, extraCostPaise, started, firstShownAt, input, output: null, errorCode, messages: outputStarted ? answerMessages(status) : [] });
      if (!clientSignal.aborted) {
        sink.event('error', {
          code: outputStarted ? 'ai_interrupted' : failure instanceof ProviderUnavailableError ? 'ai_unavailable' : 'ai_failed',
          message: outputStarted ? 'The answer was cut short.' : 'AI help could not answer right now. Your credits were returned.',
          ...(outputStarted ? { creditsCharged: p.credits } : { creditsRefunded: p.credits }),
          balance: f.balance,
        });
        sink.event('done', { status, creditsCharged: f.settled === 'charged' ? p.credits : 0, balance: f.balance });
      }
      return { status, settled: f.settled, outputStarted, text: shown };
    }

    const f = await this.finish(base, { status: 'succeeded', settle: 'charge', reason: 'succeeded', usages, extraCostPaise, started, firstShownAt, input, output: null, errorCode: null, messages: answerMessages('succeeded') });
    sink.event('done', { status: 'succeeded', creditsCharged: f.settled === 'charged' ? p.credits : 0, balance: f.balance, sources: context.map((c) => c.title).slice(0, 5) });
    return { status: 'succeeded', settled: f.settled, outputStarted: true, text: shown };
  }

  /** Conversation messages (owner only), oldest first. */
  async conversation(userId: string, id: string) {
    const [c] = await this.d.db.select().from(aiConversations).where(and(eq(aiConversations.id, id), eq(aiConversations.userId, userId)));
    if (!c) throw new ApiProblem('not_found');
    const msgs = await this.d.db
      .select({ id: aiMessages.id, role: aiMessages.role, content: aiMessages.content, createdAt: aiMessages.createdAt })
      .from(aiMessages)
      .where(eq(aiMessages.conversationId, id))
      .orderBy(asc(aiMessages.createdAt), asc(aiMessages.id));
    return { conversation: c, messages: msgs };
  }
}
