/**
 * POST /v1/content-reports — "Report a mistake" (CONTEXT §4). Guests and members; rate-limited per IP
 * and per user (reports.ip, reports.user); 8 KB body; the comment is sanitised (domain/reports.ts).
 *
 * `contentType: ai_answer` (AC-15, M5) reports an AI answer: members only (401 for guests), the
 * caller's own conversation (404 otherwise), `conversationId` + one of `messageId` / `requestId`.
 * 201 creates the report; 200 returns the open report already filed for that answer.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { REPORT_CATEGORIES } from '@soyl/db';
import { BODY_LIMITS, CONTENT_REPORTS } from '@soyl/shared/config/security';
import { ChapterId } from '@soyl/shared/content/ids';
import { EVERYONE } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { loadChapter } from '../domain/content';
import { AI_REPORT_REASONS, createAiAnswerReport, createReport, REPORT_CONTENT_TYPES } from '../domain/reports';
import { ApiProblem } from '../errors';

const ReportBody = z
  .strictObject({
    /** Required for deck, notes, flashcard_set and question; not used for ai_answer. */
    chapterId: ChapterId.optional(),
    contentType: z.enum(REPORT_CONTENT_TYPES),
    /** deck: which part (default: the first). */
    part: z.number().int().min(0).max(20).optional(),
    /** question: the question id (q_…). */
    questionId: z.string().max(120).regex(/^q_[a-z0-9_-]+$/).optional(),
    /** Where inside the item: slide id (s07), card id (f12), notes section index, child part id. */
    itemRef: z.string().min(1).max(64).regex(/^[A-Za-z0-9_.:-]+$/).optional(),
    /** ai_answer: the conversation (GET /v1/ai/conversations, or the SSE `meta` event). */
    conversationId: z.uuid().optional(),
    /** ai_answer: the assistant message id (GET /v1/ai/conversations/:id) … */
    messageId: z.uuid().optional(),
    /** … or the stream's requestId (SSE `meta` event). Exactly one of messageId / requestId. */
    requestId: z.string().min(8).max(64).regex(/^[A-Za-z0-9_-]+$/).optional(),
    /** ai_answer accepts wrong_answer, wrong_content, inappropriate, rendering, other. */
    reason: z.enum(REPORT_CATEGORIES),
    /** Optional free text, at most 1000 characters (plain text). */
    comment: z.string().max(CONTENT_REPORTS.maxCommentChars * 2).optional(),
  })
  .meta({ id: 'ContentReportRequest' });

const ReportResponse = z.object({ id: z.uuid(), status: z.literal('open'), createdAt: z.iso.datetime() }).meta({ id: 'ContentReportReceipt' });

export function registerReportRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config, clock } = deps;

  app.post('/v1/content-reports', {
    bodyLimit: BODY_LIMITS.contentReportBytes,
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['reports.ip', 'reports.user'] }, consent: false } },
    schema: { tags: ['reports'], summary: 'Report a mistake in a lesson, notes, flashcard or question, or a bad AI answer (contentType ai_answer, members only)', body: ReportBody, response: withProblems({ 200: ReportResponse, 201: ReportResponse }) },
    handler: async (request, reply) => {
      const { contentType, ...body } = request.body;
      const invalid = (path: string, message: string) => new ApiProblem('validation_failed', { errors: [{ path: `body.${path}`, message }] });
      if (contentType === 'ai_answer') {
        if (!request.auth) throw new ApiProblem('unauthenticated');
        if (!body.conversationId) throw invalid('conversationId', 'Required when reporting an AI answer.');
        const reason = body.reason as (typeof AI_REPORT_REASONS)[number];
        if (!AI_REPORT_REASONS.includes(reason)) throw invalid('reason', `For an AI answer use one of: ${AI_REPORT_REASONS.join(', ')}.`);
        for (const k of ['part', 'questionId', 'itemRef'] as const) if (body[k] !== undefined) throw invalid(k, 'Not used for an AI answer.');
        const r = await createAiAnswerReport(db, clock, request.log, request.auth.user.id, {
          conversationId: body.conversationId,
          messageId: body.messageId,
          requestId: body.requestId,
          reason,
          comment: body.comment,
        });
        return reply.status(r.created ? 201 : 200).send(r.receipt);
      }
      if (!body.chapterId) throw invalid('chapterId', 'Required when reporting lesson content.');
      for (const k of ['conversationId', 'messageId', 'requestId'] as const) if (body[k] !== undefined) throw invalid(k, 'Only used for an AI answer.');
      const chapter = await loadChapter(db, body.chapterId, config.academicYear);
      const receipt = await createReport(db, clock, config.academicYear, request.auth?.user.id ?? null, chapter, { ...body, contentType });
      return reply.status(201).send(receipt);
    },
  });
}
