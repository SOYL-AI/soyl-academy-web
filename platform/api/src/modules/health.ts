/**
 * Health (ARCHITECTURE §4.1). Outside /v1, so no edge secret (API-2) and served with the platform
 * flag off (GEN-4). Bodies carry no internal detail: no versions, hostnames or error text.
 *   GET /healthz  liveness: the process is up
 *   GET /readyz   readiness: database and key-value store answer
 */
import { sql } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { EVERYONE, type RoutePolicy } from '../policy';
import type { AppDeps } from '../services';

const healthPolicy = (): RoutePolicy => ({ roles: EVERYONE, csrf: true, rateLimit: false, consent: false });
const Status = z.object({ status: z.enum(['ok', 'ready', 'not_ready']) });

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let t: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([p, new Promise<T>((_, reject) => (t = setTimeout(() => reject(new Error('timeout')), ms)))]);
  } finally {
    clearTimeout(t);
  }
}

export function registerHealthRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/healthz', {
    config: { policy: healthPolicy() },
    schema: { tags: ['health'], summary: 'Liveness', response: { 200: Status } },
    handler: async () => ({ status: 'ok' as const }),
  });

  app.get('/readyz', {
    config: { policy: healthPolicy() },
    schema: { tags: ['health'], summary: 'Readiness: database and key-value store', response: { 200: Status, 503: Status } },
    handler: async (request, reply) => {
      try {
        await withTimeout(deps.db.execute(sql`select 1`), 2000);
        await withTimeout(deps.kv.ping(), 2000);
        return { status: 'ready' as const };
      } catch (err) {
        request.log.warn({ err }, 'readiness check failed');
        return reply.status(503).send({ status: 'not_ready' as const });
      }
    },
  });
}
