/**
 * Typed job registry (ADR-003). A job is a queue name, an optional UTC cron schedule, pg-boss queue
 * options (retries, expiry, retention) and a handler. Handlers take `{ db, now, log, signal }` and the
 * job's data, so tests call them directly with a fixed `now`.
 *
 * Rules for every handler (ADR-003 "Idempotency"):
 * - Safe to re-run: pg-boss delivers at least once (retries, expiry, a crash mid-job). Write handlers
 *   as "make the database satisfy X", never "do X once".
 * - Bounded work per statement (batches), so a run never holds long locks on hot tables.
 * - Log counts, never personal data (DB-8).
 */
import type { PgBoss, Queue, UpdateQueueOptions } from 'pg-boss';
import type { Database } from '@soyl/db';
import type { Logger } from './logger';

export interface JobContext {
  db: Database;
  /** The instant the run is evaluated at (UTC). Tests pass a fixed value. */
  now: Date;
  log: Logger;
  /** Aborted when pg-boss gives up on the job (expiry) or the worker stops without grace. */
  signal?: AbortSignal;
}

/**
 * Queue options for a job. `partition` is excluded on purpose: a partitioned queue makes pg-boss run
 * CREATE TABLE at `createQueue()`, which the app role cannot do (DB-1).
 */
export type JobQueueOptions = Omit<Queue, 'name' | 'partition'>;

export interface JobDefinition<D = unknown, R = unknown> {
  /** Queue name: `<area>.<action>`, lower case. */
  name: string;
  description: string;
  /** 5-field cron expression evaluated in UTC (GEN-6). Omit for on-demand jobs. */
  cron?: string;
  options: JobQueueOptions;
  handler(ctx: JobContext, data: D): Promise<R>;
}

/** Identity helper that keeps the handler's data/result types. */
export function defineJob<D, R>(def: JobDefinition<D, R>): JobDefinition<D, R> {
  return def;
}

/** The subset of PgBoss the registry uses (tests may pass a fake). */
export type BossLike = Pick<PgBoss, 'getQueue' | 'createQueue' | 'updateQueue' | 'work' | 'schedule' | 'unschedule'>;

export interface RegisterDeps {
  db: Database;
  log: Logger;
  /** Clock for `ctx.now` (default: wall clock). */
  now?: () => Date;
  /** How often each queue is polled when idle (default 10 s; these are maintenance jobs). */
  pollingIntervalSeconds?: number;
  /** Called after every successful job (health bookkeeping). */
  onJobSuccess?: (name: string) => void;
}

export interface RegisteredJob {
  name: string;
  cron: string | null;
  workerId: string;
}

/** Options that `updateQueue` accepts (policy and partition are fixed at creation). */
function updatableOptions(options: JobQueueOptions): UpdateQueueOptions {
  const { policy: _policy, ...rest } = options;
  return rest;
}

export function assertValidJobs(jobs: readonly JobDefinition[]): void {
  const seen = new Set<string>();
  for (const job of jobs) {
    if (!/^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)+$/.test(job.name)) throw new Error(`invalid job name "${job.name}" (use <area>.<action>)`);
    if (seen.has(job.name)) throw new Error(`duplicate job name "${job.name}"`);
    seen.add(job.name);
    if (job.cron !== undefined && job.cron.trim().split(/\s+/).length !== 5)
      throw new Error(`job "${job.name}": cron must have 5 fields (minute hour day month weekday, UTC)`);
  }
}

/**
 * Creates (or updates) every queue, starts one worker per queue and (un)schedules the crons.
 * Idempotent: safe on every start of every replica (pg-boss upserts schedules by name).
 */
export async function registerJobs(boss: BossLike, jobs: readonly JobDefinition[], deps: RegisterDeps): Promise<RegisteredJob[]> {
  assertValidJobs(jobs);
  const now = deps.now ?? (() => new Date());
  const registered: RegisteredJob[] = [];

  for (const def of jobs) {
    const existing = await boss.getQueue(def.name);
    if (!existing) {
      await boss.createQueue(def.name, def.options);
    } else {
      if (def.options.policy && existing.policy !== def.options.policy)
        deps.log.warn('queue policy differs from the registry and cannot be changed in place', {
          queue: def.name,
          current: existing.policy,
          wanted: def.options.policy,
        });
      const update = updatableOptions(def.options);
      if (Object.keys(update).length) await boss.updateQueue(def.name, update);
    }

    const workerId = await boss.work<unknown, unknown>(
      def.name,
      { batchSize: 1, pollingIntervalSeconds: deps.pollingIntervalSeconds ?? 10 },
      async (batch) => {
        const results: unknown[] = [];
        for (const job of batch) {
          const log = deps.log.child({ job: def.name, jobId: job.id });
          const started = Date.now();
          try {
            const result = await def.handler({ db: deps.db, now: now(), log, signal: job.signal }, job.data);
            log.info('job completed', { ms: Date.now() - started, result, retryCount: job.retryCount });
            deps.onJobSuccess?.(def.name);
            results.push(result);
          } catch (err) {
            log.error('job failed', { ms: Date.now() - started, err, retryCount: job.retryCount });
            throw err;
          }
        }
        // pg-boss stores the resolved value as the job's output (batchSize is 1).
        return results[0];
      },
    );

    if (def.cron) {
      await boss.schedule(def.name, def.cron, null, { tz: 'UTC' });
    } else {
      // A cron removed from the registry must stop firing.
      await boss.unschedule(def.name);
    }
    registered.push({ name: def.name, cron: def.cron ?? null, workerId });
  }
  deps.log.info('jobs registered', { jobs: registered.map((j) => ({ name: j.name, cron: j.cron })) });
  return registered;
}
