/**
 * Drizzle client over node-postgres (`pg`, the same driver pg-boss uses).
 *
 *   import { createDb } from '@soyl/db';
 *   const { db, pool, close } = createDb();          // reads DATABASE_URL
 *   const rows = await db.select().from(schema.subjects);
 *
 * Authentication (INFRA-2):
 * - local / CI: the password in DATABASE_URL (or PGPASSWORD), as before.
 * - Azure: DATABASE_AUTH=entra and a DATABASE_URL WITHOUT a password whose user is the managed
 *   identity's Postgres role (e.g. id-soyl-api-prod). Every NEW connection gets a fresh Entra token
 *   for https://ossrdbms-aad.database.windows.net as its password (node-postgres `password` as an
 *   async function). Tokens are cached by the provider until 5 min before expiry; connections that
 *   are already open stay valid after their token expires (Postgres checks it only at login), and the
 *   pool recycles connections every 30 min so no connection outlives a token by much.
 */
import pg from 'pg';
import { parseIntoClientConfig } from 'pg-connection-string';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AZURE_RESOURCES, defaultTokenProvider, type TokenProvider } from '@soyl/shared/azure/identity';
import * as schema from '../schema/index';

export type Schema = typeof schema;
export type Database = NodePgDatabase<Schema> & { $client: pg.Pool };

export interface DbHandle {
  db: Database;
  pool: pg.Pool;
  close(): Promise<void>;
}

/** A password, or a function returning one per new connection (Entra tokens). */
export type PgPassword = string | (() => Promise<string>);

export interface CreateDbOptions {
  /** Pool size (default 10). */
  max?: number;
  /** Extra pg.Pool options (ssl, idleTimeoutMillis, ...). */
  pool?: pg.PoolConfig;
  /**
   * Password override. Default: an Entra token function when DATABASE_AUTH=entra (pgPasswordFromEnv),
   * otherwise whatever DATABASE_URL / PGPASSWORD carry.
   */
  password?: PgPassword;
}

export const DATABASE_AUTH_MODES = ['password', 'entra'] as const;
export type DatabaseAuthMode = (typeof DATABASE_AUTH_MODES)[number];

/** Pool connections are recycled after this long when Entra auth is on. */
export const ENTRA_MAX_LIFETIME_SECONDS = 30 * 60;

export function databaseAuthMode(env: Record<string, string | undefined> = process.env): DatabaseAuthMode {
  const v = (env.DATABASE_AUTH ?? 'password').trim().toLowerCase() || 'password';
  if (!(DATABASE_AUTH_MODES as readonly string[]).includes(v)) throw new Error(`DATABASE_AUTH must be one of ${DATABASE_AUTH_MODES.join(', ')} (got "${v}")`);
  return v as DatabaseAuthMode;
}

/** Async password function returning an Entra token for Azure Database for PostgreSQL. */
export function entraPassword(provider: TokenProvider = defaultTokenProvider()): () => Promise<string> {
  return async () => (await provider.getToken(AZURE_RESOURCES.postgres)).token;
}

/** The password function for DATABASE_AUTH=entra, or undefined for password auth. */
export function pgPasswordFromEnv(env: Record<string, string | undefined> = process.env, provider?: TokenProvider): (() => Promise<string>) | undefined {
  return databaseAuthMode(env) === 'entra' ? entraPassword(provider) : undefined;
}

/**
 * pg client/pool config for a connection string. With a password FUNCTION the URL is parsed into
 * fields: pg lets a parsed connectionString override `password` (with "" when the URL has none), which
 * would silently drop the function.
 */
export function pgConnectionConfig(url: string, password?: PgPassword): pg.ClientConfig {
  if (password === undefined) return { connectionString: url };
  const parsed = parseIntoClientConfig(url);
  if (typeof password === 'function' && parsed.password)
    throw new Error('DATABASE_URL must not contain a password when DATABASE_AUTH=entra');
  const { password: _ignored, connectionString: _cs, ...rest } = parsed as pg.ClientConfig;
  return { ...rest, password };
}

/** A Drizzle client from a connection string (default `DATABASE_URL`) or an existing pool. */
export function createDb(source: string | pg.Pool | undefined = process.env.DATABASE_URL, opts: CreateDbOptions = {}): DbHandle {
  if (!source) throw new Error('DATABASE_URL is not set');
  let pool: pg.Pool;
  if (typeof source === 'string') {
    const password = opts.password ?? pgPasswordFromEnv();
    const entra = typeof password === 'function';
    pool = new pg.Pool({
      ...pgConnectionConfig(source, password),
      max: opts.max ?? 10,
      ...(entra ? { maxLifetimeSeconds: ENTRA_MAX_LIFETIME_SECONDS } : {}),
      ...opts.pool,
    });
  } else pool = source;
  const db = drizzle({ client: pool, schema }) as Database;
  return { db, pool, close: () => pool.end() };
}

/** Masks the password in a connection string for logs. */
export function redactUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.password) u.password = '***';
    return u.toString();
  } catch {
    return '<unparseable connection string>';
  }
}
