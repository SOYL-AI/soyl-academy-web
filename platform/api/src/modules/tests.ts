/**
 * Tests, attempts, results, custom tests and live mocks (ARCHITECTURE §4.1 tests/live/evaluation,
 * §9; CONTEXT §5 — tests are free and need sign-in; ADR-012).
 *
 *   GET  /v1/test-series?board&class&subject      catalogue (+ your status when signed in)
 *   GET  /v1/tests/:id                            metadata only (never questions)
 *   POST /v1/tests/custom                         build a custom test from the practice bank
 *   POST /v1/tests/:id/attempts                   create or resume your active attempt
 *   GET  /v1/attempts/:id                         resume state (paper, saved responses, server time)
 *   PUT  /v1/attempts/:id/responses               batched autosave (sequence numbers, F-007 grace)
 *   POST /v1/attempts/:id/submit                  idempotent submit (optional final batch)
 *   GET  /v1/attempts/:id/result                  results with solutions (after submission)
 *   POST /v1/attempts/:id/self-evaluation         self-marks for written items
 *   POST /v1/attempts/:id/ai-evaluation           AI evaluation job (ai-gateway M4, src/ai)
 *   GET  /v1/me/attempts                          your attempts, newest first
 *   GET  /v1/live-events                          live mocks (+ your registration when signed in)
 *   GET  /v1/live-events/:id                      one event: timeline, registration, your status, rank availability
 *   POST /v1/live-events/:id/register             register (idempotent)
 *   GET  /v1/live-events/:id/leaderboard          consent-gated (D-014), first name + last initial (F-017)
 *
 * Test attempts are declared under the `test_attempts` consent feature but not gated (D-014; see
 * CONSENT.gatedFeatures). Attempt-keyed limits (`attempt.autosave`, `attempt.submit`) are checked in
 * the handlers because the policy hook knows only IP and user keys.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { and, desc, eq, lt } from 'drizzle-orm';
import { attempts, liveEvents, tests } from '@soyl/db';
import { BODY_LIMITS, type RateLimitBucketName } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { KvUnavailableError } from '../kv';
import { policies } from '../policy';
import { rateLimited } from '../rate-limit';
import { withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { cachedContent } from '../http/cache';
import { attemptState, ownAttempt, saveResponses, startOrResume, submitAttempt, type EngineContext } from '../domain/tests/attempts';
import { listTestSeries, testMetadata } from '../domain/tests/catalogue';
import { buildCustomTest } from '../domain/tests/custom';
import { listLiveEvents, liveEventDetail, liveLeaderboard, registerForLive } from '../domain/tests/live';
import { attemptResult, selfEvaluate } from '../domain/tests/results';
import {
  AttemptParams,
  AttemptStateResponse,
  CustomTestRequest,
  CustomTestResponse,
  LeaderboardQuery,
  LeaderboardResponse,
  LiveEventDetailSchema,
  LiveEventParams,
  LiveEventSchema,
  LiveEventsQuery,
  MyAttemptsResponse,
  ResultResponse,
  SaveResponsesRequest,
  SaveResponsesResponse,
  SelfEvaluationRequest,
  StartAttemptRequest,
  SubmitResponse,
  TestMetaResponse,
  TestParams,
  TestSeriesQuery,
  TestSeriesResponse,
} from './tests-schemas';
import { startAttemptEvaluation } from '../ai/routes';
import { AiEvaluationRequest, AiJobAccepted } from '../ai/schemas';

const member = (buckets: RateLimitBucketName[] = [], consent: 'test_attempts' | false = 'test_attempts') => policies.member({ rateLimit: { buckets }, consent });

export function registerTestRoutes(appIn: FastifyInstance, deps: AppDeps, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const ctx: EngineContext = { db: deps.db, kv: deps.kv, clock: deps.clock, year: deps.config.academicYear };

  /**
   * Attempt-keyed limits; a KV outage lets learning traffic through (API-16 fail-open for non-auth).
   * S6-L01: the bucket is keyed by caller + attempt, so someone who learns an attempt id (ids are not
   * secrets, F-026) spends their own bucket, never the owner's (and then gets the ownership 404).
   */
  async function attemptLimit(name: 'attempt.autosave' | 'attempt.submit', userId: string, attemptId: string) {
    let r;
    try {
      r = await services.limiter.bucket(name, `${userId}:${attemptId}`);
    } catch (err) {
      if (err instanceof KvUnavailableError) return;
      throw err;
    }
    if (!r.allowed) throw rateLimited(r);
  }

  app.get('/v1/test-series', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['tests'],
      summary: 'Test series of a subject: chapter, unit, term, full-mock and second-exam tests, and live mocks. Signed in: your status per test.',
      querystring: TestSeriesQuery,
      response: withProblems({ 200: TestSeriesResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const userId = request.auth?.user.id ?? null;
      const body = await listTestSeries(ctx, userId, { board: request.query.board, classLevel: request.query.class, subject: request.query.subject });
      return userId ? body : cachedContent(request, reply, body);
    },
  });

  app.get('/v1/tests/:id', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['tests'],
      summary: 'Test metadata: sections, duration, marks, instructions. Questions are only delivered inside an attempt.',
      params: TestParams,
      response: withProblems({ 200: TestMetaResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const userId = request.auth?.user.id ?? null;
      const body = await testMetadata(ctx, userId, request.params.id);
      return userId || body.custom || body.live ? body : cachedContent(request, reply, body);
    },
  });

  app.post('/v1/tests/custom', {
    config: { policy: member(['tests.custom.user'], false) },
    schema: {
      tags: ['tests'],
      summary: 'Build a custom test from the practice question bank (free). Then start it with POST /v1/tests/:id/attempts.',
      body: CustomTestRequest,
      response: withProblems({ 201: CustomTestResponse }),
    },
    handler: async (request, reply) => {
      const userId = request.auth!.user.id;
      const built = await buildCustomTest(ctx, userId, request.body);
      const meta = await testMetadata(ctx, userId, built.testId);
      return reply.status(201).send({ ...meta, skippedChapters: built.skippedChapters });
    },
  });

  app.post('/v1/tests/:id/attempts', {
    config: { policy: member(['attempt.start.user']) },
    schema: {
      tags: ['tests'],
      summary: 'Create or resume your single active attempt. Starting sets the server deadline and delivers the paper (no answers).',
      params: TestParams,
      body: StartAttemptRequest.nullish(),
      response: withProblems({ 200: AttemptStateResponse, 201: AttemptStateResponse }),
    },
    handler: async (request, reply) => {
      const r = await startOrResume(ctx, request.auth!.user.id, request.params.id, { start: request.body?.start ?? true });
      return reply.status(r.created ? 201 : 200).send(r.state);
    },
  });

  app.get('/v1/attempts/:id', {
    config: { policy: member(['attempt.read.user']) },
    schema: {
      tags: ['tests'],
      summary: 'Resume an attempt: the paper, your saved responses, server time and deadline.',
      params: AttemptParams,
      response: withProblems({ 200: AttemptStateResponse }),
    },
    handler: async (request) => {
      const a = await ownAttempt(ctx, request.auth!.user.id, request.params.id);
      return attemptState(ctx, a);
    },
  });

  app.put('/v1/attempts/:id/responses', {
    bodyLimit: BODY_LIMITS.attemptResponsesBytes,
    config: { policy: member() },
    schema: {
      tags: ['tests'],
      summary: 'Autosave a batch of item states. Idempotent per item: a state applies only if its seq is higher than the stored one.',
      params: AttemptParams,
      body: SaveResponsesRequest,
      response: withProblems({ 200: SaveResponsesResponse }),
    },
    handler: async (request) => {
      await attemptLimit('attempt.autosave', request.auth!.user.id, request.params.id);
      return saveResponses(ctx, request.auth!.user.id, request.params.id, request.body);
    },
  });

  app.post('/v1/attempts/:id/submit', {
    bodyLimit: BODY_LIMITS.attemptResponsesBytes,
    config: { policy: member() },
    schema: {
      tags: ['tests'],
      summary: 'Submit (idempotent). An optional final batch is saved first. Objective items are graded now; written items wait for self-evaluation.',
      params: AttemptParams,
      body: SaveResponsesRequest.nullish(),
      response: withProblems({ 200: SubmitResponse }),
    },
    handler: async (request) => {
      await attemptLimit('attempt.submit', request.auth!.user.id, request.params.id);
      const r = await submitAttempt(ctx, request.auth!.user.id, request.params.id, request.body ?? undefined);
      return {
        attemptId: r.attemptId,
        status: r.status,
        alreadySubmitted: r.alreadyFinal,
        submittedAt: r.submittedAt.toISOString(),
        score: r.score,
        maxScore: r.maxScore,
        autoScore: r.autoScore,
        pendingSelfEvaluation: r.pendingSelfEvaluation,
        xpAwarded: r.xpAwarded,
        badgesAwarded: r.badgesAwarded,
        streak: r.streak,
      };
    },
  });

  app.get('/v1/attempts/:id/result', {
    config: { policy: member(['attempt.read.user']) },
    schema: {
      tags: ['tests'],
      summary: 'Result of a submitted attempt: scores, analysis, every answer with its solution and marking scheme, percentile, live rank.',
      params: AttemptParams,
      response: withProblems({ 200: ResultResponse }),
    },
    handler: async (request) => attemptResult(ctx, request.auth!.user.id, request.params.id),
  });

  app.post('/v1/attempts/:id/self-evaluation', {
    config: { policy: member(['attempt.evaluate.user']) },
    schema: {
      tags: ['tests'],
      summary: 'Self-evaluate written answers against the marking scheme (free). Returns the updated result.',
      params: AttemptParams,
      body: SelfEvaluationRequest,
      response: withProblems({ 200: ResultResponse }),
    },
    handler: async (request) => selfEvaluate(ctx, request.auth!.user.id, request.params.id, request.body.items),
  });

  app.post('/v1/attempts/:id/ai-evaluation', {
    // AI gateway M4: limits fail closed when the KV store is down (F-027).
    config: { policy: policies.member({ rateLimit: { buckets: ['ai.user'], failClosed: true }, consent: 'ai' }) },
    schema: {
      tags: ['tests'],
      summary:
        'AI evaluation of written answers (credits: 6 per answer, at most 40 per paper; quote first with GET /v1/ai/quote/evaluate-paper?attemptId=). Body {itemIds?}: one id = evaluate-answer, none/several = evaluate-paper. 202 with a job id; marks never count for scores or ranks.',
      params: AttemptParams,
      body: AiEvaluationRequest.nullish(),
      response: withProblems({ 202: AiJobAccepted }),
    },
    handler: async (request, reply) => {
      const r = await startAttemptEvaluation(services, request.auth!.user.id, request.params.id, request.body, request.headers['idempotency-key']);
      return reply.status(202).send(r);
    },
  });

  app.get('/v1/me/attempts', {
    config: { policy: member(['attempt.read.user'], false) },
    schema: {
      tags: ['tests'],
      summary: 'Your attempts, newest first (cursor = the last id of the previous page).',
      querystring: z.strictObject({ cursor: z.uuid().optional(), limit: z.coerce.number().int().min(1).max(50).default(20) }),
      response: withProblems({ 200: MyAttemptsResponse }),
    },
    handler: async (request) => {
      const userId = request.auth!.user.id;
      const { cursor, limit } = request.query;
      const rows = await deps.db
        .select({ a: attempts, key: tests.key, title: tests.title, kind: tests.kind, eventKey: liveEvents.key })
        .from(attempts)
        .innerJoin(tests, eq(tests.id, attempts.testId))
        .leftJoin(liveEvents, eq(liveEvents.id, attempts.liveEventId))
        .where(and(eq(attempts.userId, userId), cursor ? lt(attempts.id, cursor) : undefined))
        .orderBy(desc(attempts.id))
        .limit(limit + 1);
      const page = rows.slice(0, limit);
      return {
        attempts: page.map((r) => ({
          id: r.a.id,
          testId: r.key,
          title: r.title,
          kind: r.kind,
          status: r.a.status as 'created' | 'in_progress' | 'submitted' | 'auto_submitted',
          liveEventId: r.eventKey ?? null,
          startedAt: r.a.startedAt?.toISOString() ?? null,
          deadlineAt: r.a.deadlineAt?.toISOString() ?? null,
          submittedAt: r.a.submittedAt?.toISOString() ?? null,
          score: r.a.score === null ? null : Number(r.a.score),
          maxScore: r.a.maxScore === null ? null : Number(r.a.maxScore),
        })),
        nextCursor: rows.length > limit ? page[page.length - 1]!.a.id : null,
      };
    },
  });

  app.get('/v1/live-events', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['live'],
      summary: 'All-India live mocks with their windows and phase. Signed in: your registration and attempt.',
      querystring: LiveEventsQuery,
      response: withProblems({ 200: z.object({ events: z.array(LiveEventSchema) }).meta({ id: 'LiveEvents' }) }),
    },
    handler: async (request) => listLiveEvents(deps.db, ctx.year, deps.clock.now(), request.auth?.user.id ?? null, { subjectKey: request.query.subject, board: request.query.board, classLevel: request.query.class }),
  });

  app.get('/v1/live-events/:id', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['live'],
      summary: 'One live mock: phase timeline, registration window, rank availability. Signed in: your registration, attempt and result.',
      params: LiveEventParams,
      response: withProblems({ 200: LiveEventDetailSchema }),
    },
    handler: async (request, reply) => {
      const userId = request.auth?.user.id ?? null;
      let consentGranted: boolean | null = null;
      if (userId) consentGranted = (await services.consent.getStatus(userId)) === 'granted';
      reply.header('cache-control', 'no-store');
      return liveEventDetail(deps.db, ctx.year, deps.clock.now(), userId, request.params.id, consentGranted);
    },
  });

  app.post('/v1/live-events/:id/register', {
    config: { policy: member(['live.register.user'], false) },
    schema: {
      tags: ['live'],
      summary: 'Register for a live mock (idempotent). Starting the test also registers you.',
      params: LiveEventParams,
      response: withProblems({ 200: LiveEventSchema }),
    },
    handler: async (request) => registerForLive(deps.db, ctx.year, deps.clock.now(), request.auth!.user.id, request.params.id),
  });

  app.get('/v1/live-events/:id/leaderboard', {
    config: { policy: policies.member({ rateLimit: { buckets: ['attempt.read.user'] }, consent: 'leaderboards' }) },
    schema: {
      tags: ['live'],
      summary: 'Live mock leaderboard: provisional during the event, final once ranks are published. Needs consent (D-014).',
      params: LiveEventParams,
      querystring: LeaderboardQuery,
      response: withProblems({ 200: LeaderboardResponse }),
    },
    handler: async (request) => liveLeaderboard(deps.db, deps.kv, ctx.year, deps.clock.now(), request.auth!.user.id, request.params.id, request.query.limit),
  });
}
