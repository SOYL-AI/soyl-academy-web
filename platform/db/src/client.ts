/**
 * Drizzle client over node-postgres (`pg`, the same driver pg-boss uses).
 *
 *   import { createDb } from '@soyl/db';
 *   const { db, pool, close } = createDb();          // reads DATABASE_URL
 *   const rows = await db.select().from(schema.subjects);
 */
import pg from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema/index';

export type Schema = typeof schema;
export type Database = NodePgDatabase<Schema> & { $client: pg.Pool };

export interface DbHandle {
  db: Database;
  pool: pg.Pool;
  close(): Promise<void>;
}

export interface CreateDbOptions {
  /** Pool size (default 10). */
  max?: number;
  /** Extra pg.Pool options (ssl, idleTimeoutMillis, ...). */
  pool?: pg.PoolConfig;
}

/** A Drizzle client from a connection string (default `DATABASE_URL`) or an existing pool. */
export function createDb(source: string | pg.Pool | undefined = process.env.DATABASE_URL, opts: CreateDbOptions = {}): DbHandle {
  if (!source) throw new Error('DATABASE_URL is not set');
  const pool =
    typeof source === 'string' ? new pg.Pool({ connectionString: source, max: opts.max ?? 10, ...opts.pool }) : source;
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
