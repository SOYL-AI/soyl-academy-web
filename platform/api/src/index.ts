/**
 * Server entry point (D-022): `node dist/index.js`, listening on PORT (default 8080).
 *
 * Without DATABASE_URL (APP_ENV=local only) it starts an embedded PostgreSQL with a migrated, seeded
 * database; without REDIS_URL it uses the in-memory store; providers are mocks unless configured
 * (GEN-3: mocks refuse APP_ENV=prod). SIGTERM/SIGINT close the server, then the pools.
 */
import { createDb, pgPasswordFromEnv } from '@soyl/db';
import { buildApp } from './app';
import { systemClock } from './clock';
import { ConfigError, loadConfig } from './config';
import { createKv } from './kv';
import { createProviders } from './providers';
import { loadAiConfig } from './ai/config';
import { createAiRuntime } from './ai/runtime';

export interface MainHooks {
  /** Local dev only: runs after the embedded database is migrated and seeded, before the server starts (scripts/dev.ts publishes content here). */
  afterDevDatabase?: (databaseUrl: string) => Promise<void>;
}

export async function main(env: Record<string, string | undefined> = process.env, hooks: MainHooks = {}) {
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
    await hooks.afterDevDatabase?.(databaseUrl);
  }

  // INFRA-2 / INFRA-3: DATABASE_AUTH=entra and REDIS_AUTH=entra use managed-identity tokens.
  const { db, close: closeDb } = createDb(databaseUrl, { max: config.databasePoolMax, password: pgPasswordFromEnv({ DATABASE_AUTH: config.databaseAuth }) });
  const kv = createKv(config, { onRefreshError: (err) => console.error(`redis token refresh failed: ${(err as Error).message}`) });
  const providers = createProviders(config, { db });
  // AI gateway (ADR-013): mock/local stand-ins locally; Azure services by config; 'disabled' fails closed.
  const aiConfig = loadAiConfig(config, env);
  const aiRuntime = await createAiRuntime(config, aiConfig, { env });
  const app = await buildApp({ config, db, kv, clock: systemClock, providers, ai: { config: aiConfig, runtime: aiRuntime } });

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
    { appEnv: config.appEnv, platformEnabled: config.platformEnabled, kv: kv.kind, authMethods: config.authMethods, databaseAuth: config.databaseAuth, redisAuth: config.redis.auth, sms: providers.sms.name, email: providers.email.name, consent: providers.consent.name, ai: aiConfig.provider, contentSafety: aiConfig.contentSafety.provider, blob: aiConfig.blob.provider },
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
