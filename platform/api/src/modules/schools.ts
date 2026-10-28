/**
 * GET /v1/schools?q=&city= (backend-api, 2026-10-28): school search for the profile picker.
 * D-014: consent-gated (`profile_school_city`): 403 consent_required unless consent is granted.
 * Saving a school goes through PATCH /v1/me `school` (modules/me.ts). Contract: ./schools-schemas.ts.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { searchSchools } from '../domain/schools';
import { SchoolSearchQuery, SchoolSearchResponse } from './schools-schemas';

export function registerSchoolRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/schools', {
    config: { policy: policies.member({ rateLimit: { buckets: ['schools.search.user'] }, consent: 'profile_school_city' }) },
    schema: {
      tags: ['me'],
      summary: 'Find your school by name (prefix of any word) and optional city; at most 20. Consent must be granted (D-014).',
      querystring: SchoolSearchQuery,
      response: withProblems({ 200: SchoolSearchResponse }),
    },
    handler: async (request) => ({ schools: await searchSchools(deps.db, request.auth!.user.id, request.query.q, request.query.city) }),
  });
}
