/**
 * Test-database harness for every platform package (`@soyl/db/testing`).
 *
 *   import { createTestDb } from '@soyl/db/testing';
 *   const t = await createTestDb();          // fresh, fully migrated database
 *   await t.db.insert(schema.users).values({ ... });
 *   await t.close();                         // drops the database
 *
 * Server: TEST_DATABASE_URL, else the embedded server started by the vitest global setup
 * (`@soyl/db/testing/global-setup`, sets SOYL_TEST_SERVER_URL), else DATABASE_URL, else one embedded
 * server started lazily for this process (stopped at exit). CI sets TEST_DATABASE_URL to its
 * Postgres + pgvector service.
 *
 * Speed: migrations run once per server into a template database named after the migrations'
 * fingerprint; each createTestDb() is then a `CREATE DATABASE ... TEMPLATE` (≈100 ms).
 */
import pg from 'pg';
import { createDb, type Database } from './client';
import { loadMigrations, migrateDatabase, migrationsFingerprint } from './migrator';
import { startTestServer, type EmbeddedServer } from './embedded';

export interface TestDb {
  /** Connection string of the new database. */
  url: string;
  name: string;
  db: Database;
  pool: pg.Pool;
  /** Closes the pool and drops the database. */
  close(): Promise<void>;
}

export interface CreateTestDbOptions {
  /** Run migrations (default true). false gives an empty database, e.g. for migration tests. */
  migrate?: boolean;
  /** Pool size (default 5). */
  max?: number;
}

let lazyServer: Promise<EmbeddedServer> | null = null;
let counter = 0;

function refuseProduction(source: string) {
  const env = (process.env.APP_ENV ?? '').toLowerCase();
  if (process.env.NODE_ENV === 'production' || env === 'prod' || env === 'production')
    throw new Error(`createTestDb refuses to create databases on ${source} with NODE_ENV/APP_ENV set to production`);
}

/** Admin connection string of the server tests run against. */
export async function testServerUrl(): Promise<string> {
  if (process.env.TEST_DATABASE_URL) return process.env.TEST_DATABASE_URL;
  if (process.env.SOYL_TEST_SERVER_URL) return process.env.SOYL_TEST_SERVER_URL;
  if (process.env.DATABASE_URL) {
    refuseProduction('DATABASE_URL');
    return process.env.DATABASE_URL;
  }
  lazyServer ??= startTestServer();
  return (await lazyServer).url;
}

/** Stops the lazily started embedded server, if any (the global setup stops its own). */
export async function stopTestServer(): Promise<void> {
  if (!lazyServer) return;
  const s = await lazyServer;
  lazyServer = null;
  await s.stop();
}

export function withDatabase(url: string, name: string): string {
  const u = new URL(url);
  u.pathname = `/${name}`;
  return u.toString();
}

async function admin<T>(serverUrl: string, fn: (c: pg.Client) => Promise<T>): Promise<T> {
  const c = new pg.Client({ connectionString: serverUrl });
  await c.connect();
  try {
    return await fn(c);
  } finally {
    await c.end();
  }
}

const templatePromises = new Map<string, Promise<string>>();

/** Creates (once per server and migrations fingerprint) a fully migrated template database. */
async function ensureTemplate(serverUrl: string): Promise<string> {
  const name = `soyl_tpl_${migrationsFingerprint(loadMigrations()).slice(0, 16)}`;
  const key = `${serverUrl}|${name}`;
  let p = templatePromises.get(key);
  if (!p) {
    p = admin(serverUrl, async (c) => {
      // Serialise template builds across processes sharing the server.
      await c.query(`SELECT pg_advisory_lock(hashtext('soyl_test_template'))`);
      try {
        const exists = await c.query('SELECT 1 FROM pg_database WHERE datname = $1', [name]);
        if (exists.rowCount) return name;
        const building = `${name}_build`;
        await c.query(`DROP DATABASE IF EXISTS ${building} WITH (FORCE)`);
        await c.query(`CREATE DATABASE ${building}`);
        await migrateDatabase(withDatabase(serverUrl, building));
        await c.query(`ALTER DATABASE ${building} RENAME TO ${name}`);
        return name;
      } finally {
        await c.query(`SELECT pg_advisory_unlock(hashtext('soyl_test_template'))`);
      }
    });
    templatePromises.set(key, p);
    p.catch(() => templatePromises.delete(key));
  }
  return p;
}

async function createDatabase(c: pg.Client, name: string, template: string | null) {
  for (let attempt = 0; ; attempt++) {
    try {
      await c.query(template ? `CREATE DATABASE ${name} TEMPLATE ${template}` : `CREATE DATABASE ${name}`);
      return;
    } catch (err) {
      // "source database is being accessed by other users": a concurrent copy; retry briefly.
      if ((err as { code?: string }).code === '55006' && attempt < 20) {
        await new Promise((r) => setTimeout(r, 100 + Math.random() * 200));
        continue;
      }
      throw err;
    }
  }
}

/** A fresh database (migrated unless `migrate: false`) on the test server. */
export async function createTestDb(opts: CreateTestDbOptions = {}): Promise<TestDb> {
  const serverUrl = await testServerUrl();
  const template = opts.migrate === false ? null : await ensureTemplate(serverUrl);
  const name = `soyl_test_${process.pid}_${++counter}_${Math.random().toString(36).slice(2, 8)}`;
  await admin(serverUrl, (c) => createDatabase(c, name, template));
  const url = withDatabase(serverUrl, name);
  const { db, pool } = createDb(url, { max: opts.max ?? 5 });
  let closed = false;
  return {
    url,
    name,
    db,
    pool,
    close: async () => {
      if (closed) return;
      closed = true;
      await pool.end();
      await admin(serverUrl, (c) => c.query(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`));
    },
  };
}
