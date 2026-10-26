/**
 * Worker configuration: read from the environment once at startup and validated with zod. The worker
 * refuses to start on invalid config (same rules as @soyl/api's config where they overlap).
 *
 * PGBOSS_MIGRATE (DB-1): the app role `soyl_app` has DML only, so outside local/test the pg-boss schema
 * is installed and upgraded by the pre-deploy migrations job (`node dist/index.js migrate`, run as the
 * migrator identity), and the running worker starts pg-boss with `migrate: false`. ADR-003.
 */
import { z } from 'zod/v4';
import { CONSENT } from '@soyl/shared/config/security';

export const APP_ENVS = ['local', 'test', 'dev', 'stg', 'prod'] as const;
export type AppEnv = (typeof APP_ENVS)[number];

export const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

/** A PostgreSQL identifier we are willing to interpolate into GRANT statements (lower-case, bare). */
const PG_IDENTIFIER = /^[a-z_][a-z0-9_]{0,62}$/;

const optionalBool = z
  .enum(['true', 'false', '1', '0'])
  .optional()
  .transform((v) => (v === undefined ? undefined : v === 'true' || v === '1'));

const EnvSchema = z.object({
  APP_ENV: z.enum(APP_ENVS).default('local'),
  DATABASE_URL: z.string().optional(),
  /** INFRA-2: `entra` = DATABASE_URL has no password; each connection uses a managed-identity token. */
  DATABASE_AUTH: z.enum(['password', 'entra']).default('password'),
  WORKER_HEALTH_PORT: z.coerce.number().int().min(0).max(65535).default(8081),
  WORKER_HEALTH_HOST: z.string().default('0.0.0.0'),
  PGBOSS_SCHEMA: z.string().regex(PG_IDENTIFIER, 'must be a lower-case PostgreSQL identifier').default('pgboss'),
  PGBOSS_MIGRATE: optionalBool,
  /** Role that receives DML on the pg-boss schema when `migrate` runs (DB-1). */
  PGBOSS_APP_ROLE: z.string().regex(PG_IDENTIFIER, 'must be a lower-case PostgreSQL identifier').default('soyl_app'),
  LOG_LEVEL: z.enum(LOG_LEVELS).default('info'),
  /** AUTH-15: accounts that never reach consent `granted` are deleted after this many days. */
  UNCONSENTED_ACCOUNT_TTL_DAYS: z.coerce.number().int().min(1).max(3650).default(CONSENT.unconsentedAccountTtlDays),
  /** Graceful shutdown budget for in-flight jobs (ACA sends SIGTERM, then SIGKILL after 30 s by default). */
  /**
   * AUTH-15 purge of never-consented student accounts. `auto` (default) = on, except with
   * CONSENT_PROVIDER=unavailable (no consent system yet, OA-08): nobody can ever reach `granted`, so the
   * purge would delete every student 30 days after sign-up. `on`/`off` force it.
   */
  UNCONSENTED_PURGE: z.enum(['on', 'off', 'auto']).default('auto'),
  CONSENT_PROVIDER: z.string().optional(),
  WORKER_SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().min(1000).max(120_000).default(20_000),
});

export interface WorkerConfig {
  appEnv: AppEnv;
  /** local or test: the embedded dev database and pg-boss self-migration are allowed. */
  isLocal: boolean;
  databaseUrl: string | undefined;
  databaseAuth: 'password' | 'entra';
  healthPort: number;
  healthHost: string;
  logLevel: LogLevel;
  pgboss: {
    schema: string;
    /** Whether the running worker installs/upgrades the pg-boss schema itself. */
    migrate: boolean;
    appRole: string;
  };
  unconsentedAccountTtlDays: number;
  /** Whether the AUTH-15 purge job is registered (see UNCONSENTED_PURGE). */
  unconsentedPurge: boolean;
  shutdownTimeoutMs: number;
}

export class ConfigError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Invalid configuration:\n  - ${problems.join('\n  - ')}`);
    this.name = 'ConfigError';
  }
}

export function loadConfig(env: Record<string, string | undefined> = process.env): WorkerConfig {
  // Empty strings (e.g. `PGBOSS_MIGRATE=` in a compose file) mean "unset".
  const cleaned = Object.fromEntries(Object.entries(env).filter(([, v]) => v !== undefined && v !== ''));
  const parsed = EnvSchema.safeParse(cleaned);
  if (!parsed.success) {
    throw new ConfigError(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`));
  }
  const e = parsed.data;
  const problems: string[] = [];
  const isLocal = e.APP_ENV === 'local' || e.APP_ENV === 'test';

  if (!e.DATABASE_URL && !isLocal) problems.push(`DATABASE_URL is required when APP_ENV=${e.APP_ENV}`);

  const migrate = e.PGBOSS_MIGRATE ?? isLocal;
  // DB-1: the app role cannot run DDL in stg/prod; a self-migrating worker would fail at start-up or,
  // worse, mean the worker had been given DDL rights. The migrations job installs the schema there.
  if (migrate && (e.APP_ENV === 'stg' || e.APP_ENV === 'prod'))
    problems.push(`PGBOSS_MIGRATE must be false when APP_ENV=${e.APP_ENV} (DB-1: the migrations job installs the pg-boss schema)`);

  if (problems.length) throw new ConfigError(problems);

  return {
    appEnv: e.APP_ENV,
    isLocal,
    databaseUrl: e.DATABASE_URL,
    databaseAuth: e.DATABASE_AUTH,
    healthPort: e.WORKER_HEALTH_PORT,
    healthHost: e.WORKER_HEALTH_HOST,
    logLevel: e.LOG_LEVEL,
    pgboss: { schema: e.PGBOSS_SCHEMA, migrate, appRole: e.PGBOSS_APP_ROLE },
    unconsentedAccountTtlDays: e.UNCONSENTED_ACCOUNT_TTL_DAYS,
    unconsentedPurge: e.UNCONSENTED_PURGE === 'on' || (e.UNCONSENTED_PURGE === 'auto' && e.CONSENT_PROVIDER !== 'unavailable'),
    shutdownTimeoutMs: e.WORKER_SHUTDOWN_TIMEOUT_MS,
  };
}
