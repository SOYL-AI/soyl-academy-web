/**
 * Database access for the pipeline: the PostgresStateStore (`--state pg`) and the publish /
 * assemble / coverage / rollback stages, which read and write content tables through @soyl/db.
 *
 * Target: DATABASE_URL. When it is unset, the persistent local embedded server of @soyl/db
 * (platform/db/.data/dev, port 54320, database soyl_dev — the one `npm run db -w @soyl/db` uses) is
 * started on first use and stopped when the command ends, so `npm run db … migrate up` followed by
 * `npm run content … publish` works with no setup.
 */
import type pg from 'pg';
import { createDb, redactUrl, type Database } from '@soyl/db';
import type { EmbeddedServer } from '@soyl/db/embedded';
import { PostgresStateStore } from './state-pg';
import { FileStateStore, type StateStore } from './state';

export interface DbConnection {
  db: Database;
  pool: pg.Pool;
  url: string;
}

export class DbAccess {
  private opening: Promise<DbConnection> | null = null;
  private server: EmbeddedServer | null = null;
  private closeDb: (() => Promise<void>) | null = null;

  constructor(
    private readonly env: Record<string, string | undefined> = process.env,
    private readonly log: (line: string) => void = (l) => console.log(l),
    private readonly existing: DbConnection | null = null,
  ) {}

  /** A connection over an existing pool (tests). Not closed by close(). */
  static fromPool(db: Database, pool: pg.Pool, url = 'test'): DbAccess {
    return new DbAccess({}, () => undefined, { db, pool, url });
  }

  async get(): Promise<DbConnection> {
    if (this.existing) return this.existing;
    this.opening ??= this.open();
    return this.opening;
  }

  private async open(): Promise<DbConnection> {
    let url = this.env.DATABASE_URL;
    if (!url) {
      if (this.env.CONTENT_DB === 'off') throw new Error('no database: DATABASE_URL is unset and CONTENT_DB=off');
      const { startDevServer } = await import('@soyl/db/embedded');
      this.server = await startDevServer();
      url = this.server.url;
      this.log(`DATABASE_URL not set: using the local embedded server (${redactUrl(url)})`);
    }
    const { db, pool, close } = createDb(url, { max: 6 });
    this.closeDb = close;
    await assertPipelineSchema(pool);
    return { db, pool, url };
  }

  async close(): Promise<void> {
    if (this.closeDb) await this.closeDb();
    this.closeDb = null;
    if (this.server) await this.server.stop();
    this.server = null;
    this.opening = null;
  }
}

/** Fails early with the fix when the database has not been migrated (0004 adds the pipeline columns). */
export async function assertPipelineSchema(pool: pg.Pool): Promise<void> {
  const { rows } = await pool.query(
    `SELECT to_regclass('public.content_releases') AS releases,
            EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pipeline_runs' AND column_name = 'reserved_paise') AS v4`,
  );
  if (!rows[0]?.releases || !rows[0]?.v4)
    throw new Error('the database is not migrated for the content pipeline: run "npm run db -w @soyl/db -- migrate up" (and "seed catalog") first');
}

export type StateKind = 'pg' | 'file';

/** `--state pg|file`; default pg when DATABASE_URL is set, else file (offline). */
export function stateKind(flag: string | undefined, env: Record<string, string | undefined>): StateKind {
  if (flag === undefined) return env.DATABASE_URL ? 'pg' : 'file';
  if (flag !== 'pg' && flag !== 'file') throw new Error('--state must be pg or file');
  return flag;
}

export async function openStateStore(kind: StateKind, stateDir: string, dbAccess: DbAccess): Promise<StateStore> {
  if (kind === 'file') return new FileStateStore(stateDir);
  const { pool } = await dbAccess.get();
  return new PostgresStateStore(pool);
}
