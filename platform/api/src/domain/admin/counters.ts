/**
 * Product-interest counters (D-045, D-014; migration 0015 `analytics_counters`).
 *
 * One row per (IST day, event, dimension) with a count, incremented in place by an upsert. The row has
 * no user id, IP, session id, device id or user agent: it is impossible to tell who did what. Events
 * and dimension values come from the allowlist in @soyl/shared/config/analytics:
 *
 * - server-observed events (sign-up, paywall, checkout, AI paused) are counted here by the API where
 *   they happen (`observe`): best effort, a failure is logged and never breaks the request;
 * - client events arrive through POST /v1/events (modules/events.ts), `client: true` names only.
 */
import { sql } from 'drizzle-orm';
import type { FastifyBaseLogger } from 'fastify';
import { istDay, type Database } from '@soyl/db';
import { allowedCounter, type AnalyticsEventName } from '@soyl/shared/config/analytics';
import type { Clock } from '../../clock';

export interface CounterHit {
  name: string;
  dimension?: string | null;
}

export class InterestCounters {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
  ) {}

  /**
   * Validates every hit against the allowlist (client: only `client: true` events) and adds them.
   * Returns the number of rows touched, or null (nothing written) when any hit is not allowed.
   */
  async add(hits: readonly CounterHit[], opts: { client: boolean }): Promise<number | null> {
    const tally = new Map<string, { event: string; dimension: string; n: number }>();
    for (const h of hits) {
      const dim = allowedCounter(h.name, h.dimension, opts);
      if (dim === null) return null;
      const key = `${h.name}\u0000${dim}`;
      const cur = tally.get(key);
      if (cur) cur.n += 1;
      else tally.set(key, { event: h.name, dimension: dim, n: 1 });
    }
    if (!tally.size) return 0;
    const day = istDay(new Date(this.clock.now()));
    const values = [...tally.values()].sort((a, b) => (a.event + a.dimension < b.event + b.dimension ? -1 : 1));
    await this.db.execute(sql`
      INSERT INTO analytics_counters (ist_day, event, dimension, count)
      VALUES ${sql.join(
        values.map((v) => sql`(${day}::date, ${v.event}, ${v.dimension}, ${v.n})`),
        sql`, `,
      )}
      ON CONFLICT (ist_day, event, dimension) DO UPDATE SET count = analytics_counters.count + EXCLUDED.count, updated_at = now()`);
    return values.length;
  }

  /** Server-observed event: counted best effort (never throws; an unknown pair is a bug and is logged). */
  async observe(name: AnalyticsEventName, dimension: string | null, log?: Pick<FastifyBaseLogger, 'warn'>): Promise<void> {
    try {
      const n = await this.add([{ name, dimension }], { client: false });
      if (n === null) log?.warn({ event: name, dimension }, 'analytics counter not in the allowlist');
    } catch (err) {
      log?.warn({ err, event: name }, 'analytics counter not recorded');
    }
  }
}
