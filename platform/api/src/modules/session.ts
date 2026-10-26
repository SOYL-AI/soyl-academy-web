/** GET /v1/session — who am I (guest or member), consent state and session expiry. Never cached. */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { EVERYONE } from '../policy';
import { SessionResponse, withProblems } from '../schemas';
import type { Services } from '../services';
import { sessionUser } from '../domain/profile';

export function registerSessionRoutes(appIn: FastifyInstance, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  app.get('/v1/session', {
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: [] }, consent: false } },
    schema: { tags: ['session'], summary: 'Current session (guest when not signed in)', response: withProblems({ 200: SessionResponse }) },
    handler: async (request, reply) => {
      reply.header('cache-control', 'no-store');
      const auth = request.auth;
      if (!auth) return { authenticated: false, user: null, consent: null, session: null };
      return {
        authenticated: true,
        user: await sessionUser(app.deps.db, auth.user),
        consent: await services.consent.getStatus(auth.user.id),
        session: { id: auth.session.id, expiresAt: auth.session.expiresAt.toISOString(), fresh: services.sessions.isFresh(auth.session) },
      };
    },
  });
}
