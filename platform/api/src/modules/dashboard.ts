/**
 * GET /v1/me/dashboard (backend-api, 2026-10-28): the student's progress dashboard in one call.
 * Member-only, scoped to the caller (API-7), never cached; computed on read from stored progress.
 * Contract: ./dashboard-schemas.ts. Guests get 401 (their progress stays on the device).
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { ApiProblem } from '../errors';
import { DashboardResponse } from './dashboard-schemas';

export function registerDashboardRoutes(appIn: FastifyInstance, _services: Services, _deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/me/dashboard', {
    config: { policy: policies.member({ rateLimit: { buckets: ['dashboard.read.user'] } }) },
    schema: {
      tags: ['progress'],
      summary: 'Your progress dashboard: totals, solved by difficulty, mastery levels, test history, focus areas, recent activity, next badge and weekly goal (IST days, Monday weeks)',
      response: withProblems({ 200: DashboardResponse }),
    },
    handler: async () => {
      throw new ApiProblem('not_implemented');
    },
  });
}
