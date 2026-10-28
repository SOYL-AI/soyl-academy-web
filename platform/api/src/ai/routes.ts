/**
 * AI gateway routes (ARCHITECTURE §4.1 ai/credits/evaluation; ADR-013).
 *
 *   GET  /v1/credits                         balance, plan, reset time (lazy daily grant)
 *   GET  /v1/credits/ledger                  history, newest first
 *   GET  /v1/me/credits/guide                what each action costs, plans, how many are left today, bonuses (D-044)
 *   GET  /v1/me/credits/history?days=14      per-IST-day granted / bonus / spent / refunded (D-044)
 *   GET  /v1/ai/quote/:action                cost before the action (CONTEXT §6)
 *   POST /v1/ai/:action                      stream actions → SSE; job actions → 202 + job id
 *   GET  /v1/ai/jobs/:id                     job status/result
 *   POST /v1/ai/uploads                      write-only SAS for one quarantine blob
 *   POST /v1/ai/uploads/:id/complete         start processing
 *   GET  /v1/ai/uploads/:id                  status
 *   GET  /v1/ai/conversations                your conversations
 *   POST /v1/ai/conversations                start one (optional; actions create one when absent)
 *   GET  /v1/ai/conversations/:id            messages (30 days)
 *   GET  /v1/attempts/:id/ai-evaluation      AI marks of a submitted attempt (never ranked)
 *   (POST /v1/attempts/:id/ai-evaluation lives in modules/tests.ts and calls startAttemptEvaluation)
 *
 * Policies: AI routes need a member session; actions, uploads and evaluation need consent `ai`
 * (`uploads` for uploads, plus `ai` checked in the handler; D-014, D-031). AI limits fail closed when
 * the KV store is down (F-027). Credits and quotes need no consent: the balance and prices are shown
 * to every member, and nothing is spent.
 */
import { PassThrough } from 'node:stream';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { and, desc, eq, lt } from 'drizzle-orm';
import { aiConversations, chapters } from '@soyl/db';
import { AI_ACTION_IDS, AI_ACTIONS, actionAllowedOnPlan, quoteCredits, type AiActionId } from '@soyl/shared/config/ai-actions';
import { getPlan } from '@soyl/shared/config/plans';
import { AI_GATEWAY } from '@soyl/shared/config/credits';
import { BODY_LIMITS } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { policies, type RoutePolicy } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { loadChapter } from '../domain/content';
import { attemptAiEvaluations, evaluationUnits } from './evaluation';
import type { ActionBody, Caller } from './gateway';
import {
  AiActionParam,
  AiActionRequest,
  AiEvaluationView,
  AiJobAccepted,
  AiJobView,
  AiStreamResponse,
  ConversationCreateRequest,
  ConversationDetail,
  ConversationList,
  CreditGuideResponse,
  CreditHistoryQuery,
  CreditHistoryResponse,
  CreditsResponse,
  IdParam,
  LedgerQuery,
  LedgerResponse,
  QuoteQuery,
  QuoteResponse,
  UploadCreated,
  UploadCreateRequest,
  UploadView,
} from './schemas';
import { nextIstMidnight, secondsUntil } from './time';
import { bonusLabel } from './bonuses';
import { creditGuide } from './guide';

const LEDGER_LABELS: Record<string, string> = {
  daily_grant: 'Daily credits',
  plan_topup: 'Plan upgrade top-up',
  admin_adjustment: 'Adjustment',
  day_end: 'Unused credits expired',
};

const IDEMPOTENCY_KEY = /^[A-Za-z0-9_.:-]{8,128}$/;

/** Member route with AI limits that fail closed (F-027). */
const aiPolicy = (consent: RoutePolicy['consent'], buckets: ('ai.user' | 'uploads.user.hour' | 'uploads.user.day')[] = ['ai.user']): RoutePolicy =>
  policies.member({ rateLimit: { buckets, failClosed: true }, consent });

function idempotencyKey(raw: unknown): string | null {
  if (raw === undefined) return null;
  if (typeof raw !== 'string' || !IDEMPOTENCY_KEY.test(raw)) throw new ApiProblem('validation_failed', { errors: [{ path: 'headers.idempotency-key', message: '8–128 characters: letters, digits, _ . : -' }] });
  return raw;
}

/** POST /v1/attempts/:id/ai-evaluation (registered by modules/tests.ts). */
export async function startAttemptEvaluation(services: Services, userId: string, attemptId: string, body: { itemIds?: string[] } | null | undefined, rawKey: unknown) {
  const action = AI_ACTIONS[body?.itemIds?.length === 1 ? 'evaluate-answer' : 'evaluate-paper'];
  return services.ai.jobs.startEvaluation({ userId, idempotencyKey: idempotencyKey(rawKey) }, action, attemptId, body?.itemIds);
}

export function registerAiRoutes(appIn: FastifyInstance, deps: AppDeps, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const ai = services.ai;
  ai.attachLogger(app.log);
  const plansUrl = `${deps.config.publicBaseUrl}${AI_GATEWAY.plansPath}`;
  const engine = { db: deps.db, kv: deps.kv, clock: deps.clock, year: deps.config.academicYear };

  app.get('/v1/credits', {
    config: { policy: policies.member() },
    schema: { tags: ['credits'], summary: 'Today’s AI credits: balance, plan, reset time (00:00 IST) and prices.', response: withProblems({ 200: CreditsResponse }) },
    handler: async (request) => {
      const b = await ai.credits.balance(request.auth!.user.id);
      return {
        ...b,
        resetAt: b.resetAt.toISOString(),
        plansUrl,
        prices: AI_ACTION_IDS.map((id) => {
          const a = AI_ACTIONS[id];
          return {
            action: id,
            label: a.label,
            credits: a.pricing.kind === 'flat' ? a.pricing.credits : a.pricing.creditsPerAnswer,
            perAnswer: a.pricing.kind === 'per_answer',
            maxCredits: a.pricing.kind === 'flat' ? a.pricing.credits : a.pricing.maxCredits,
            allowedForPlan: actionAllowedOnPlan(a, getPlan(b.plan)),
          };
        }),
      };
    },
  });

  // D-044: rate-limited like the other /v1/me reads (aggregate queries).
  const creditsRead = () => policies.member({ rateLimit: { buckets: ['credits.read.user'] } });

  app.get('/v1/me/credits/guide', {
    config: { policy: creditsRead() },
    schema: {
      tags: ['credits'],
      summary: '“What can I do with my credits?”: each AI action with its price, the plans that offer it and how many you can still do today, plus the learning bonuses (consent granted only).',
      response: withProblems({ 200: CreditGuideResponse }),
    },
    handler: async (request) => creditGuide({ db: deps.db, clock: deps.clock, credits: ai.credits, plansUrl }, request.auth!.user.id),
  });

  app.get('/v1/me/credits/history', {
    config: { policy: creditsRead() },
    schema: {
      tags: ['credits'],
      summary: 'Your credits per IST day for the last `days` days (default 14): granted, bonus, spent, refunded, left.',
      querystring: CreditHistoryQuery,
      response: withProblems({ 200: CreditHistoryResponse }),
    },
    handler: async (request) => ({ timezone: 'Asia/Kolkata' as const, ...(await ai.credits.history(request.auth!.user.id, request.query.days)) }),
  });

  app.get('/v1/credits/ledger', {
    config: { policy: policies.member() },
    schema: { tags: ['credits'], summary: 'Credit history, newest first (cursor = last id of the previous page).', querystring: LedgerQuery, response: withProblems({ 200: LedgerResponse }) },
    handler: async (request) => {
      const r = await ai.credits.ledger(request.auth!.user.id, request.query);
      return {
        entries: r.entries.map((e) => ({
          id: e.id,
          kind: e.kind as 'grant' | 'reserve' | 'charge' | 'refund' | 'expire' | 'bonus_goal' | 'bonus_streak',
          amount: e.amount,
          action: e.action,
          label: bonusLabel(e.kind) ?? LEDGER_LABELS[e.action] ?? AI_ACTIONS[e.action as AiActionId]?.label ?? e.action,
          day: e.istDay,
          createdAt: e.createdAt.toISOString(),
        })),
        nextCursor: r.nextCursor,
      };
    },
  });

  app.get('/v1/ai/quote/:action', {
    config: { policy: policies.member() },
    schema: { tags: ['ai'], summary: 'What an AI action will cost, before the student confirms. Evaluate-paper: pass attemptId to price the actual answers.', params: AiActionParam, querystring: QuoteQuery, response: withProblems({ 200: QuoteResponse }) },
    handler: async (request) => {
      const userId = request.auth!.user.id;
      const action = AI_ACTIONS[request.params.action];
      let answers: number | null = request.query.answers ?? null;
      if (action.pricing.kind === 'per_answer' && request.query.attemptId) answers = Math.max(1, (await evaluationUnits(engine, userId, request.query.attemptId)).units.size);
      if (action.id === 'evaluate-answer') answers = 1;
      const credits = quoteCredits(action, answers ?? 1);
      const b = await ai.credits.balance(userId);
      const breaker = await ai.breaker.state(b.plan === 'free');
      const status = breaker.status === 'normal' ? 'available' : breaker.status === 'paused' || !action.degradeTo ? 'paused' : 'degraded';
      const now = new Date(deps.clock.now());
      return {
        action: action.id,
        label: action.label,
        credits,
        perAnswer: action.pricing.kind === 'per_answer',
        answers: action.pricing.kind === 'per_answer' ? (answers ?? 1) : null,
        maxCredits: action.pricing.kind === 'flat' ? action.pricing.credits : action.pricing.maxCredits,
        tier: status === 'degraded' && action.degradeTo ? action.degradeTo : action.tier,
        mode: action.mode,
        requiresUpload: action.uploadKinds.length > 0,
        plan: b.plan,
        allowedForPlan: actionAllowedOnPlan(action, getPlan(b.plan)),
        balance: b.balance,
        affordable: b.balance >= credits,
        status: status as 'available' | 'degraded' | 'paused',
        resetAt: nextIstMidnight(now).toISOString(),
        resetInSeconds: secondsUntil(nextIstMidnight(now), now),
        plansUrl,
      };
    },
  });

  app.post('/v1/ai/:action', {
    bodyLimit: BODY_LIMITS.aiActionBytes,
    config: { policy: aiPolicy('ai') },
    schema: {
      tags: ['ai'],
      summary:
        'Run an AI action. Stream actions (quick-doubt, explain-slide, hard-doubt, photo-doubt) answer with Server-Sent Events; job actions (evaluate-answer, evaluate-paper, paper-from-upload) answer 202 with a job id. Optional Idempotency-Key header (retries never charge twice).',
      params: AiActionParam,
      body: AiActionRequest,
      response: withProblems({ 200: AiStreamResponse, 202: AiJobAccepted }),
    },
    handler: async (request, reply) => {
      const caller: Caller = { userId: request.auth!.user.id, idempotencyKey: idempotencyKey(request.headers[AI_GATEWAY.idempotencyHeader]) };
      const action = AI_ACTIONS[request.params.action];
      const body = request.body as ActionBody;
      if (action.mode === 'job') {
        if (action.id === 'paper-from-upload') {
          if (!body.uploadId || !body.subjectId) throw new ApiProblem('validation_failed', { errors: [{ path: 'body', message: 'uploadId and subjectId are required.' }] });
          return reply.status(202).send(await ai.jobs.startPaperFromUpload(caller, action, body.uploadId, body.subjectId));
        }
        if (!body.attemptId) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.attemptId', message: 'Required.' }] });
        return reply.status(202).send(await ai.jobs.startEvaluation(caller, action, body.attemptId, body.itemIds));
      }
      const prepared = await ai.gateway.prepare(caller, action, body);
      const stream = new PassThrough();
      const disconnect = new AbortController();
      reply.raw.on('close', () => {
        if (!reply.raw.writableFinished) disconnect.abort();
      });
      const sink = {
        event(name: string, data: Record<string, unknown>) {
          if (!stream.writableEnded) stream.write(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);
        },
      };
      void prepared
        .run(sink, disconnect.signal)
        .catch((err: unknown) => {
          request.log.error({ err, requestId: prepared.requestId }, 'AI stream failed');
          sink.event('error', { code: 'internal', message: 'Something went wrong on our side.' });
        })
        .finally(() => stream.end());
      reply.header('content-type', 'text/event-stream; charset=utf-8');
      reply.header('cache-control', 'no-store');
      reply.header('x-accel-buffering', 'no');
      return reply.send(stream as never);
    },
  });

  app.get('/v1/ai/jobs/:id', {
    config: { policy: policies.member() },
    schema: { tags: ['ai'], summary: 'Status and result of an AI job (yours only).', params: IdParam, response: withProblems({ 200: AiJobView }) },
    handler: async (request) => ai.jobs.jobView(request.auth!.user.id, request.params.id),
  });

  app.post('/v1/ai/uploads', {
    config: { policy: aiPolicy('uploads', ['uploads.user.hour', 'uploads.user.day']) },
    schema: {
      tags: ['ai'],
      summary: 'Get a short-lived, write-only upload URL for one photo (JPEG/PNG/WebP) or sample paper (also PDF), ≤ 10 MB. Uploads are deleted after 30 days.',
      body: UploadCreateRequest,
      response: withProblems({ 201: UploadCreated }),
    },
    handler: async (request, reply) => {
      await services.consent.assertAllowed(request.auth!.user.id, 'ai');
      return reply.status(201).send(await ai.uploads.create(request.auth!.user.id, request.body));
    },
  });

  app.post('/v1/ai/uploads/:id/complete', {
    config: { policy: aiPolicy('uploads', []) },
    schema: { tags: ['ai'], summary: 'Tell the server the file is uploaded; it is checked and cleaned (metadata removed) before use.', params: IdParam, response: withProblems({ 202: UploadView }) },
    handler: async (request, reply) => reply.status(202).send(await ai.uploads.complete(request.auth!.user.id, request.params.id)),
  });

  app.get('/v1/ai/uploads/:id', {
    config: { policy: policies.member() },
    schema: { tags: ['ai'], summary: 'Upload status.', params: IdParam, response: withProblems({ 200: UploadView }) },
    handler: async (request) => ai.uploads.get(request.auth!.user.id, request.params.id),
  });

  const chapterKeyOf = async (id: string | null) => {
    if (!id) return null;
    const [c] = await deps.db.select({ key: chapters.key }).from(chapters).where(eq(chapters.id, id));
    return c?.key ?? null;
  };
  const summary = async (c: typeof aiConversations.$inferSelect) => ({
    id: c.id,
    kind: c.kind as 'tutor',
    chapterId: await chapterKeyOf(c.chapterId),
    title: c.title,
    lastMessageAt: c.lastMessageAt?.toISOString() ?? null,
    createdAt: c.createdAt.toISOString(),
  });

  app.get('/v1/ai/conversations', {
    config: { policy: policies.member() },
    schema: { tags: ['ai'], summary: 'Your AI conversations, newest first.', querystring: LedgerQuery, response: withProblems({ 200: ConversationList }) },
    handler: async (request) => {
      const { cursor, limit } = request.query;
      const rows = await deps.db
        .select()
        .from(aiConversations)
        .where(and(eq(aiConversations.userId, request.auth!.user.id), cursor ? lt(aiConversations.id, cursor) : undefined))
        .orderBy(desc(aiConversations.id))
        .limit(limit + 1);
      const page = rows.slice(0, limit);
      return { conversations: await Promise.all(page.map(summary)), nextCursor: rows.length > limit ? page[page.length - 1]!.id : null };
    },
  });

  app.post('/v1/ai/conversations', {
    config: { policy: aiPolicy('ai') },
    schema: { tags: ['ai'], summary: 'Start a conversation (optional: an action without conversationId starts one).', body: ConversationCreateRequest, response: withProblems({ 201: z.object({ conversation: ConversationDetail.shape.conversation }) }) },
    handler: async (request, reply) => {
      const chapter = request.body.chapterId ? await loadChapter(deps.db, request.body.chapterId, deps.config.academicYear) : null;
      const now = new Date(deps.clock.now());
      const [c] = await deps.db
        .insert(aiConversations)
        .values({ userId: request.auth!.user.id, kind: request.body.kind, chapterId: chapter?.id ?? null, title: request.body.title ?? null, createdAt: now, updatedAt: now })
        .returning();
      return reply.status(201).send({ conversation: await summary(c!) });
    },
  });

  app.get('/v1/ai/conversations/:id', {
    config: { policy: policies.member() },
    schema: { tags: ['ai'], summary: 'A conversation’s messages (kept 30 days).', params: IdParam, response: withProblems({ 200: ConversationDetail }) },
    handler: async (request) => {
      const r = await ai.gateway.conversation(request.auth!.user.id, request.params.id);
      return {
        conversation: await summary(r.conversation),
        messages: r.messages.map((m) => ({ id: m.id, role: m.role as 'user' | 'assistant', content: m.content, createdAt: m.createdAt.toISOString() })),
      };
    },
  });

  app.get('/v1/attempts/:id/ai-evaluation', {
    config: { policy: policies.member() },
    schema: { tags: ['tests'], summary: 'AI marks of your submitted attempt, per item, with step marks and confidence. Never used for scores, percentiles or ranks.', params: IdParam, response: withProblems({ 200: AiEvaluationView }) },
    handler: async (request) => {
      const userId = request.auth!.user.id;
      const view = await attemptAiEvaluations(engine, userId, request.params.id);
      return { ...view, job: await ai.jobs.latestEvaluationJob(userId, request.params.id) };
    },
  });

}
