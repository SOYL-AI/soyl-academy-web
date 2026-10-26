/**
 * Worker runtime: pg-boss + the job registry + the probe server, with graceful shutdown.
 *
 *   const worker = await startWorker({ config, databaseUrl, db, pool, log });
 *   ...
 *   await worker.stop();   // stops taking jobs, waits for running ones (bounded), closes everything
 */
import { PgBoss } from 'pg-boss';
import type { ConstructorOptions } from 'pg-boss';
import type pg from 'pg';
import { pgConnectionConfig, type Database, type PgPassword } from '@soyl/db';
import type { WorkerConfig } from './config';
import { checkDatabase, createHealthServer } from './health';
import { allJobs } from './jobs';
import { errorFields, type Logger } from './logger';
import { registerJobs, type JobDefinition, type RegisteredJob } from './registry';

export const HEARTBEAT_MS = 60_000;

export interface WorkerDeps {
  config: WorkerConfig;
  /** Connection string for pg-boss's own small pool. */
  databaseUrl: string;
  /** DATABASE_AUTH=entra: token function used for pg-boss's pool too. */
  databasePassword?: PgPassword;
  /** App pool for job handlers and /readyz. `stop()` ends it. */
  db: Database;
  pool: pg.Pool;
  log: Logger;
  /** Default: every job in ./jobs. */
  jobs?: JobDefinition[];
  now?: () => Date;
  heartbeatMs?: number;
  pollingIntervalSeconds?: number;
  /** Extra pg-boss constructor options (tests, e.g. `options: '-c role=soyl_app'`). */
  bossOptions?: Partial<ConstructorOptions>;
}

export interface WorkerState {
  started: boolean;
  stopping: boolean;
  /** Last successful round trip through pg-boss (start, heartbeat). */
  lastBossOkAt: Date | null;
  /** Last successfully completed job. */
  lastJobOkAt: Date | null;
}

export interface RunningWorker {
  boss: PgBoss;
  /** Port the probe server listens on. */
  port: number;
  state: WorkerState;
  jobs: RegisteredJob[];
  /** Records a heartbeat now (also runs on the timer). */
  heartbeat(): Promise<boolean>;
  stop(): Promise<void>;
}

export function bossOptions(config: WorkerConfig, databaseUrl: string, password?: PgPassword): ConstructorOptions {
  return {
    // A password function needs the URL parsed into fields (pg would override it from the URL).
    ...(password === undefined ? { connectionString: databaseUrl } : (pgConnectionConfig(databaseUrl, password) as Partial<ConstructorOptions>)),
    schema: config.pgboss.schema,
    migrate: config.pgboss.migrate,
    // Supervision (expiry, retention, archiving) and cron evaluation are DML on the pg-boss schema.
    supervise: true,
    schedule: true,
    // Index rebuilds need the table owner (the migrator); the app role would only be warned at.
    ...(config.pgboss.migrate ? {} : { reindex: false }),
    max: 4,
    application_name: 'soyl-worker',
    instanceName: 'soyl-worker',
  };
}

export async function startWorker(deps: WorkerDeps): Promise<RunningWorker> {
  const { config, log } = deps;
  const now = deps.now ?? (() => new Date());
  const state: WorkerState = { started: false, stopping: false, lastBossOkAt: null, lastJobOkAt: null };

  const boss = new PgBoss({ ...bossOptions(config, deps.databaseUrl, deps.databasePassword), ...deps.bossOptions });
  boss.on('error', (err) => log.error('pg-boss error', { err: errorFields(err) }));
  boss.on('warning', (w) => log.warn('pg-boss warning', { message: w.message }));

  const health = createHealthServer({
    isLive: () => state.started,
    isReady: () => checkDatabase(deps.pool),
    log,
  });

  let heartbeatTimer: NodeJS.Timeout | undefined;
  const heartbeat = async (): Promise<boolean> => {
    try {
      await boss.getDb().executeSql('SELECT 1');
      state.lastBossOkAt = new Date();
      log.info('heartbeat', { lastJobOkAt: state.lastJobOkAt });
      return true;
    } catch (err) {
      log.warn('heartbeat failed', { err: errorFields(err) });
      return false;
    }
  };

  let port: number;
  let jobs: RegisteredJob[];
  try {
    await boss.start({ attempts: 3 });
    state.lastBossOkAt = new Date();
    jobs = await registerJobs(boss, deps.jobs ?? allJobs({ unconsentedAccountTtlDays: config.unconsentedAccountTtlDays, unconsentedPurge: config.unconsentedPurge }), {
      db: deps.db,
      log,
      now,
      pollingIntervalSeconds: deps.pollingIntervalSeconds,
      onJobSuccess: () => {
        state.lastJobOkAt = new Date();
        state.lastBossOkAt = state.lastJobOkAt;
      },
    });
    state.started = true;
    port = await health.listen(config.healthPort, config.healthHost);
  } catch (err) {
    state.started = false;
    await boss.stop({ graceful: false }).catch(() => {});
    await health.close();
    throw err;
  }

  heartbeatTimer = setInterval(() => void heartbeat(), deps.heartbeatMs ?? HEARTBEAT_MS);
  heartbeatTimer.unref();
  if (!config.unconsentedPurge) log.warn('AUTH-15 unconsented-account purge is OFF (CONSENT_PROVIDER=unavailable or UNCONSENTED_PURGE=off)');
  log.info('worker started', { appEnv: config.appEnv, schema: config.pgboss.schema, migrate: config.pgboss.migrate, healthPort: port });

  let stopping: Promise<void> | null = null;
  const stop = () => {
    stopping ??= (async () => {
      state.stopping = true;
      clearInterval(heartbeatTimer);
      log.info('worker stopping');
      try {
        await boss.stop({ graceful: true, timeout: config.shutdownTimeoutMs });
      } catch (err) {
        log.error('pg-boss stop failed', { err: errorFields(err) });
      }
      state.started = false;
      await health.close();
      if (!deps.pool.ended) await deps.pool.end();
      log.info('worker stopped');
    })();
    return stopping;
  };

  return { boss, port, state, jobs, heartbeat, stop };
}
