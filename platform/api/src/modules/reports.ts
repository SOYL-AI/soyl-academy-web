/**
 * POST /v1/content-reports — "Report a mistake" (CONTEXT §4). Guests and members; rate-limited per IP
 * and per user (reports.ip, reports.user); 8 KB body; the comment is sanitised (domain/reports.ts).
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
import { createReport, REPORT_CONTENT_TYPES } from '../domain/reports';

const ReportBody = z
  .strictObject({
    chapterId: ChapterId,
    contentType: z.enum(REPORT_CONTENT_TYPES),
    /** deck: which part (default: the first). */
    part: z.number().int().min(0).max(20).optional(),
    /** question: the question id (q_…). */
    questionId: z.string().max(120).regex(/^q_[a-z0-9_-]+$/).optional(),
    /** Where inside the item: slide id (s07), card id (f12), notes section index, child part id. */
    itemRef: z.string().min(1).max(64).regex(/^[A-Za-z0-9_.:-]+$/).optional(),
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
    schema: { tags: ['reports'], summary: 'Report a mistake in a lesson, notes, flashcard or question', body: ReportBody, response: withProblems({ 201: ReportResponse }) },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.body.chapterId, config.academicYear);
      const receipt = await createReport(db, clock, config.academicYear, request.auth?.user.id ?? null, chapter, request.body);
      return reply.status(201).send(receipt);
    },
  });
}
