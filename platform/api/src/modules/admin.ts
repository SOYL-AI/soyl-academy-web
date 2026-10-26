/**
 * Staff routes (ARCHITECTURE §4.1 admin). Every route: reviewer/admin role + TOTP-verified session
 * (AUTH-11, policy `mfa: true`). M2 has the report queue read; triage/edit/republish land with the
 * admin milestone.
 *
 *   GET /v1/admin/reports?status=open&cursor=&limit=     "Report a mistake" queue, newest first
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { STAFF_ROLES } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { listReports, REPORT_CONTENT_TYPES } from '../domain/reports';

const ReportsResponse = z
  .object({
    reports: z.array(
      z.object({
        id: z.uuid(),
        unit: z.string(),
        contentType: z.enum(REPORT_CONTENT_TYPES),
        contentId: z.uuid(),
        itemRef: z.string().nullable(),
        reason: z.string(),
        /** Plain text from the reporter: render as text, never as HTML/Markdown (WEB-7). */
        comment: z.string().nullable(),
        status: z.string(),
        reporter: z.enum(['member', 'guest']),
        createdAt: z.iso.datetime(),
      }),
    ),
    nextCursor: z.string().nullable(),
  })
  .meta({ id: 'AdminContentReports' });

export function registerAdminRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/admin/reports', {
    config: { policy: { roles: STAFF_ROLES, csrf: true, rateLimit: { buckets: [] }, consent: false, mfa: true } },
    schema: {
      tags: ['admin'],
      summary: 'Content reports queue (staff, two-step verified session)',
      querystring: z.strictObject({
        status: z.enum(['open', 'triaged', 'fixed', 'rejected', 'duplicate']).default('open'),
        cursor: z.string().max(200).optional(),
        limit: z.coerce.number().int().min(1).max(100).default(50),
      }),
      response: withProblems({ 200: ReportsResponse }),
    },
    handler: async (request) => listReports(deps.db, request.query),
  });
}
