/**
 * Worker entry point (D-022): `node dist/index.js` runs the worker; `node dist/index.js migrate`
 * installs/upgrades the pg-boss schema and grants the app role (pre-deploy migrations job, DB-1).
 *
 * Without DATABASE_URL (APP_ENV=local/test only) it starts an embedded PostgreSQL with a migrated
 * database. SIGTERM/SIGINT stop pg-boss gracefully (running jobs get WORKER_SHUTDOWN_TIMEOUT_MS),
 * then close the probe server and the pools.
 */
import { createDb } from '@soyl/db';
import { ConfigError, loadConfig } from './config';
import { createLogger, errorFields } from './logger';
import { installPgBossSchema } from './migrate';
import { startWorker } from './worker';

export async function main(argv: string[] = process.argv.slice(2), env: Record<string, string | undefined> = process.env) {
  let config;
  try {
    config = loadConfig(env);
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(err.message);
      process.exit(1);
    }
    throw err;
  }
  const log = createLogger(config.logLevel);
  const command = argv[0] ?? 'start';

  if (command === 'migrate') {
    if (!config.databaseUrl) {
      log.error('DATABASE_URL is required for migrate');
      process.exit(1);
    }
    const result = await installPgBossSchema({
      connectionString: config.databaseUrl,
      schema: config.pgboss.schema,
      appRole: config.pgboss.appRole,
      log,
    });
    process.exit(result.bamOutstanding > 0 ? 3 : 0);
  }
  if (command !== 'start') {
    console.error('usage: node dist/index.js [start|migrate]');
    process.exit(2);
  }

  let devDb: { url: string; close(): Promise<void> } | null = null;
  let databaseUrl = config.databaseUrl;
  if (!databaseUrl) {
    const { startDevDatabase } = await import('./dev-db');
    devDb = await startDevDatabase((m) => log.info(`[dev-db] ${m}`));
    databaseUrl = devDb.url;
  }

  const { db, pool } = createDb(databaseUrl, { max: 5, pool: { application_name: 'soyl-worker-app' } });
  const worker = await startWorker({ config, databaseUrl, db, pool, log });

  let closing = false;
  const shutdown = async (signal: string) => {
    if (closing) return;
    closing = true;
    log.info('shutting down', { signal });
    const timer = setTimeout(() => process.exit(1), config.shutdownTimeoutMs + 5000);
    timer.unref();
    try {
      await worker.stop();
      await devDb?.close();
    } catch (err) {
      log.error('shutdown failed', { err: errorFields(err) });
    } finally {
      process.exit(0);
    }
  };
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
  return worker;
}

const isEntry = process.argv[1] && /(?:^|[\\/])(index\.(?:ts|js)|dist[\\/]index\.js)$/.test(process.argv[1]);
if (isEntry) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
