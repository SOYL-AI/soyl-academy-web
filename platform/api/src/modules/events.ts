/**
 * POST /v1/events — product-interest counters from the web (D-045, D-014).
 *
 * - Guests and members; the session is not needed and nothing about the caller is stored.
 * - Allowlist only (@soyl/shared/config/analytics, `client: true` events and their dimension values):
 *   one unknown name or dimension refuses the whole request with 400 and writes nothing.
 * - At most 10 events and 1 KB per request; strict per-IP rate limit (`events.ip`). The IP is only a
 *   rate-limit key (HMAC'd in the KV store, AC-26) and is never written to the database.
 * - The web sends these only after the visitor accepted analytics in the cookie bar, and debounces
 *   repeats (components/platform/lib/interest.ts); the counters are aggregate, so a repeat only adds 1.
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { BODY_LIMITS } from '@soyl/shared/config/security';
import { EVERYONE } from '../policy';
import { withProblems } from '../schemas';
import type { Services } from '../services';
import { ApiProblem } from '../errors';
import { EventsAccepted, EventsBody } from './admin-schemas';

export function registerEventRoutes(appIn: FastifyInstance, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.post('/v1/events', {
    bodyLimit: BODY_LIMITS.eventsBytes,
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['events.ip'] }, consent: false } },
    schema: {
      tags: ['analytics'],
      summary: 'Count allowlisted product-interest events (aggregate counters; no user, session or IP stored). Sent only after analytics consent.',
      body: EventsBody,
      response: withProblems({ 202: EventsAccepted }),
    },
    handler: async (request, reply) => {
      const n = await services.counters.add(request.body.events, { client: true });
      if (n === null) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.events', message: 'Unknown event or dimension.' }] });
      return reply.status(202).send({ accepted: request.body.events.length });
    },
  });
}
