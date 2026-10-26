/**
 * Server entry point (D-022): `node dist/index.js`, listening on PORT (default 8080).
 *
 * Without DATABASE_URL (APP_ENV=local only) it starts an embedded PostgreSQL with a migrated, seeded
 * database; without REDIS_URL it uses the in-memory store; providers are mocks unless configured
 * (GEN-3: mocks refuse APP_ENV=prod). SIGTERM/SIGINT close the server, then the pools.
 */
import { createDb } from '@soyl/db';
import { buildApp } from './app';
import { systemClock } from './clock';
import { ConfigError, loadConfig } from './config';
import { createKv } from './kv';
import { createProviders } from './providers';

export async function main(env: Record<string, string | undefined> = process.env) {
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

  let devDb: { url: string; close(): Promise<void> } | null = null;
  let databaseUrl = config.databaseUrl;
  if (!databaseUrl) {
    const { startDevDatabase } = await import('./dev/dev-db');
    devDb = await startDevDatabase((m) => console.log(`[dev-db] ${m}`));
    databaseUrl = devDb.url;
  }

  const { db, close: closeDb } = createDb(databaseUrl);
  const kv = createKv(config);
  const providers = createProviders(config);
  const app = await buildApp({ config, db, kv, clock: systemClock, providers });

  let closing = false;
  const shutdown = async (signal: string) => {
    if (closing) return;
    closing = true;
    app.log.info({ signal }, 'shutting down');
    const timer = setTimeout(() => process.exit(1), 15_000);
    timer.unref();
    try {
      await app.close();
      await kv.close();
      await closeDb();
      await devDb?.close();
    } finally {
      process.exit(0);
    }
  };
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));

  try {
    await app.listen({ port: config.port, host: config.host });
  } catch (err) {
    // Do not leave the embedded dev database running when the port is taken.
    await app.close().catch(() => {});
    await kv.close().catch(() => {});
    await closeDb().catch(() => {});
    await devDb?.close().catch(() => {});
    throw err;
  }
  app.log.info(
    { appEnv: config.appEnv, platformEnabled: config.platformEnabled, kv: kv.kind, sms: providers.sms.name, email: providers.email.name, consent: providers.consent.name },
    'SOYL API ready',
  );
  return app;
}

const isEntry = process.argv[1] && /(?:^|[\\/])(index\.(?:ts|js)|dist[\\/]index\.js)$/.test(process.argv[1]);
if (isEntry) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
