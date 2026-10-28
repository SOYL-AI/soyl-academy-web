/**
 * Learning insights (backend-api, 2026-10-28). Member-only, scoped to the caller (API-7), never
 * cached, computed on read from stored progress (no new tables).
 *
 *   GET /v1/me/activity?days=N        per-IST-day activity for a heatmap, streaks, active days
 *   GET /v1/me/mastery?subjectId=     Khan-style chapter levels and subject aggregates
 *   GET /v1/me/card                   the private player card (rating, tier, attributes)
 *
 * Guests get 401: the web computes mastery for guests from device progress with the same pure
 * function (@soyl/shared/learning/mastery).
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { activitySummary } from '../domain/insights/activity';
import { masterySummary } from '../domain/insights/mastery';
import { playerCardFor } from '../domain/insights/card';
import { ActivityQuery, ActivityResponse, MasteryQuery, MasteryResponse, PlayerCardResponse } from './insights-schemas';

export function registerInsightsRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config, clock } = deps;
  const year = config.academicYear;
  const read = () => policies.member({ rateLimit: { buckets: ['insights.read.user'] } });

  app.get('/v1/me/activity', {
    config: { policy: read() },
    schema: {
      tags: ['progress'],
      summary: 'Your daily learning activity (IST days) for a heatmap, with streaks and active days',
      querystring: ActivityQuery,
      response: withProblems({ 200: ActivityResponse }),
    },
    handler: async (request) => activitySummary(db, clock, request.auth!.user.id, request.query.days),
  });

  app.get('/v1/me/mastery', {
    config: { policy: read() },
    schema: {
      tags: ['progress'],
      summary: 'Your mastery level per chapter (not started → mastered) and per subject',
      querystring: MasteryQuery,
      response: withProblems({ 200: MasteryResponse }),
    },
    handler: async (request) => masterySummary(db, year, request.auth!.user.id, request.query.subjectId ?? null),
  });

  app.get('/v1/me/card', {
    config: { policy: read() },
    schema: { tags: ['progress'], summary: 'Your private player card: overall rating, tier and attributes (deterministic, explained)', response: withProblems({ 200: PlayerCardResponse }) },
    handler: async (request) => playerCardFor(db, clock, year, request.auth!.user.id),
  });
}
