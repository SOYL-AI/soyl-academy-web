/**
 * Staff routes (ARCHITECTURE §4.1 admin). Every route: a staff role + TOTP-verified session (AUTH-11,
 * policy `mfa: true`).
 *
 *   GET  /v1/admin/me                          staff role, capabilities and the sections it may open
 *   GET  /v1/admin/reports?status=&cursor=     "Report a mistake" queue, newest first (reviewer/admin)
 *
 * Super-admin only (D-045: role admin + the `superadmin` capability, policy.capability):
 *
 *   GET  /v1/admin/analytics/{overview,growth,engagement,retention,ai,revenue,interest,content}?from=&to=
 *        IST days, at most 180, default the last 30; aggregates only (domain/admin/analytics.ts)
 *   GET  /v1/admin/users?limit=&cursor=        recent sign-ups, masked (no names)
 *   POST /v1/admin/users/search {email}        exact email lookup (audited)
 *   POST /v1/admin/users/:id/reveal            full email (audited)
 *   GET  /v1/admin/users/:id/summary           counts only (audited)
 *
 * Responses are personal to the caller, so the global onSend hook marks them `no-store` (API-4).
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { istDay } from '@soyl/db';
import { policies, STAFF_ROLES } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { listReports, REPORT_CONTENT_TYPES } from '../domain/reports';
import * as analytics from '../domain/admin/analytics';
import { recentUsers, revealEmail, searchByEmail, userSummary, type AuditActor } from '../domain/admin/users';
import {
  AdminMe,
  AdminUserParams,
  AdminUserReveal,
  AdminUserSearchBody,
  AdminUserSearchResult,
  AdminUsersPage,
  AdminUsersQuery,
  AdminUserSummary,
  AnalyticsAi,
  AnalyticsContent,
  AnalyticsEngagement,
  AnalyticsGrowth,
  AnalyticsInterest,
  AnalyticsOverview,
  AnalyticsRetention,
  AnalyticsRevenue,
  RangeQuery,
} from './admin-schemas';

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

const EmptyBody = z.strictObject({}).nullish();

export function registerAdminRoutes(appIn: FastifyInstance, deps: AppDeps, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, clock, config } = deps;
  const today = () => istDay(new Date(clock.now()));
  const range = (q: { from?: string; to?: string }) => analytics.resolveRange(q, today(), new Date(clock.now()));
  const actor = (request: FastifyRequest): AuditActor => ({ userId: request.auth!.user.id, role: request.auth!.user.role, requestId: String(request.id) });

  app.get('/v1/admin/me', {
    config: { policy: { roles: STAFF_ROLES, csrf: true, rateLimit: { buckets: [] }, consent: false, mfa: true } },
    schema: { tags: ['admin'], summary: 'Staff role, capabilities and the admin sections this account may open', response: withProblems({ 200: AdminMe }) },
    handler: async (request) => {
      const user = request.auth!.user;
      const capabilities = user.role === 'admin' ? await services.staff.capabilities(user.id) : [];
      const superadmin = capabilities.includes('superadmin');
      return {
        userId: user.id,
        role: user.role as 'reviewer' | 'admin',
        capabilities,
        sections: [...(superadmin ? (['analytics', 'users'] as const) : []), 'reports' as const],
      };
    },
  });

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

  // ---- analytics (superadmin) -------------------------------------------------------------------
  const analyticsRoute = <R extends z.ZodType>(path: string, summary: string, response: R, run: (r: analytics.Range) => Promise<z.input<R>>) =>
    // Registered on the untyped instance: the domain result is checked against `response` at compile time
    // by the signature of `run`, and at run time by the zod serializer (API-9), as on every route.
    appIn.get(`/v1/admin/analytics/${path}`, {
      config: { policy: policies.superadmin('admin.analytics.user') },
      schema: { tags: ['admin'], summary: `${summary} (superadmin, two-step verified session; IST days, at most 180)`, querystring: RangeQuery, response: withProblems({ 200: response }) },
      handler: async (request) => run(range(request.query as z.infer<typeof RangeQuery>)),
    });

  analyticsRoute('overview', 'KPI tiles with the previous period, sign-ups and daily active students', AnalyticsOverview, (r) => analytics.overview(db, r));
  analyticsRoute('growth', 'Sign-ups by method and week, total students, consent funnel, boards/classes, schools, guest merges', AnalyticsGrowth, (r) => analytics.growth(db, r));
  analyticsRoute('engagement', 'DAU/WAU/MAU, stickiness, learning activity, top chapters and subjects, streaks', AnalyticsEngagement, (r) => analytics.engagement(db, r, today()));
  analyticsRoute('retention', 'D1/D7/D30 retention by sign-up week', AnalyticsRetention, (r) => analytics.retention(db, r, today()));
  analyticsRoute('ai', 'AI actions, credits granted/spent/refunded, spend vs the daily cap, breaker, paywall, moderation', AnalyticsAi, (r) =>
    analytics.ai(db, r, services.ai.config.dailySpendCapPaise),
  );
  analyticsRoute('revenue', 'Plans views, checkout funnel, subscriptions, MRR, revenue, refunds, Board Exam Pass, coins', AnalyticsRevenue, (r) =>
    analytics.revenue(db, r, config.billing.enabled),
  );
  analyticsRoute('interest', 'Product-interest counters (aggregate, no user link)', AnalyticsInterest, (r) => analytics.interest(db, r));
  analyticsRoute('content', 'Published chapters per subject and open "report a mistake" items by age', AnalyticsContent, (r) =>
    analytics.content(db, r, config.academicYear, new Date(clock.now())),
  );

  // ---- users (superadmin, audited) ----------------------------------------------------------------
  app.get('/v1/admin/users', {
    config: { policy: policies.superadmin('admin.users.user') },
    schema: { tags: ['admin'], summary: 'Recent sign-ups, newest first: masked email/phone, method, board/class, consent (no names)', querystring: AdminUsersQuery, response: withProblems({ 200: AdminUsersPage }) },
    handler: async (request) => recentUsers(db, request.query),
  });

  app.post('/v1/admin/users/search', {
    config: { policy: policies.superadmin('admin.users.user') },
    schema: { tags: ['admin'], summary: 'Find an account by its exact email (support). Audited; the result stays masked.', body: AdminUserSearchBody, response: withProblems({ 200: AdminUserSearchResult }) },
    handler: async (request) => searchByEmail(db, actor(request), request.body.email),
  });

  app.post('/v1/admin/users/:id/reveal', {
    config: { policy: policies.superadmin('admin.users.user') },
    schema: { tags: ['admin'], summary: "Reveal an account's full email (audited)", params: AdminUserParams, body: EmptyBody, response: withProblems({ 200: AdminUserReveal }) },
    handler: async (request) => revealEmail(db, actor(request), request.params.id),
  });

  app.get('/v1/admin/users/:id/summary', {
    config: { policy: policies.superadmin('admin.users.user') },
    schema: { tags: ['admin'], summary: "An account's activity, AI, coins and plan as counts only (audited; never chats or uploads)", params: AdminUserParams, response: withProblems({ 200: AdminUserSummary }) },
    handler: async (request) => userSummary(db, actor(request), request.params.id, today()),
  });
}
