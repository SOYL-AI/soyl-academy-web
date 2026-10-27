/**
 * Weekly leagues (ARCHITECTURE §12, CONTEXT §11; backend-api M5). Domain: src/domain/leagues/leagues.ts.
 *
 *   GET /v1/leagues/current?scope=class     your league this week: tier, division, standings, zones
 *
 * Member route, consent-gated (`leaderboards`, D-014: 403 consent_required until consent is granted;
 * production's CONSENT_PROVIDER=unavailable keeps it closed for everyone). Standings show rank, week
 * XP and first name + last initial only (F-017, AC-18). The first visit of a week may place the
 * student in a league (idempotent), so the route has its own per-user limit. School and city leagues
 * are opt-in (school/city fields are consent-gated) and answer 501 not_implemented for now.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { LEAGUES } from '@soyl/shared/config/gamification';
import { ApiProblem } from '../errors';
import { policies } from '../policy';
import { BoardSchema, withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { currentLeague } from '../domain/leagues/leagues';

const LeagueTierSchema = z
  .object({ level: z.number().int().min(1), key: z.string(), name: z.string(), icon: z.string() })
  .meta({ id: 'LeagueTier', description: 'level 1 = the lowest tier; names and icons from LEAGUE_TIERS (shared/config/gamification.ts).' });
const LeagueZoneSchema = z
  .enum(['promotion', 'safe', 'relegation'])
  .meta({ id: 'LeagueZone', description: 'Where the place would finish if the week ended now. Promotion needs at least minXpToPromote XP.' });

export const LeagueCurrentResponse = z
  .object({
    status: z
      .enum(['active', 'class_required', 'students_only'])
      .describe('active = placed in a league; class_required = set board and class first (PATCH /v1/me); students_only = parent/staff accounts do not play.'),
    scope: z.enum(['class', 'school', 'city']),
    serverNow: z.iso.datetime(),
    week: z.object({
      /** IST Monday / Sunday (YYYY-MM-DD). */
      start: z.string(),
      end: z.string(),
      startsAt: z.iso.datetime(),
      /** The league closes at this instant (next Monday 00:00 IST). */
      endsAt: z.iso.datetime(),
    }),
    cohort: z.object({ key: z.string(), board: BoardSchema, classLevel: z.number().int() }).nullable(),
    league: z
      .object({
        id: z.uuid(),
        tier: LeagueTierSchema,
        division: z.number().int(),
        size: z.number().int(),
        capacity: z.number().int(),
        promotionPlaces: z.number().int(),
        relegationPlaces: z.number().int(),
        minXpToPromote: z.number().int(),
        isTopTier: z.boolean(),
        isBottomTier: z.boolean(),
      })
      .nullable(),
    standings: z.array(
      z.object({
        rank: z.number().int(),
        /** First name + last initial (F-017); null when that student's consent is not granted (show "Student"). */
        name: z.string().nullable(),
        xp: z.number().int(),
        zone: LeagueZoneSchema,
        isMe: z.boolean(),
      }),
    ),
    me: z.object({ rank: z.number().int(), xp: z.number().int(), zone: LeagueZoneSchema }).nullable(),
    lastWeek: z
      .object({
        weekStart: z.string(),
        tier: LeagueTierSchema,
        finalRank: z.number().int().nullable(),
        xp: z.number().int(),
        outcome: z.enum(['promoted', 'stayed', 'relegated']).nullable(),
      })
      .nullable(),
  })
  .meta({ id: 'LeagueCurrent', description: 'Your weekly league (IST week). XP is what each student earned this week. Consent-gated (D-014).' });

export function registerLeagueRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/leagues/current', {
    config: { policy: policies.member({ rateLimit: { buckets: ['leagues.read.user'] }, consent: 'leaderboards' }) },
    schema: {
      tags: ['gamification'],
      summary: 'Your weekly league: tier, division standings (first name + last initial), promotion and relegation zones. Needs consent (D-014).',
      querystring: z.strictObject({ scope: z.enum(['class', 'school', 'city']).default('class') }),
      response: withProblems({ 200: LeagueCurrentResponse }),
    },
    handler: async (request, reply) => {
      const { scope } = request.query;
      if (!LEAGUES.liveScopes.includes(scope)) throw new ApiProblem('not_implemented', { detail: 'School and city leagues are not available yet.' });
      reply.header('cache-control', 'no-store');
      return currentLeague(deps.db, deps.clock.now(), request.auth!.user.id, scope);
    },
  });
}
