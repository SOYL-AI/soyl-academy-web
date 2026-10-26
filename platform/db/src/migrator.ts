/**
 * Migration runner (DB-8, ADR-004). drizzle-kit generates the up SQL from the schema; every
 * migration also has a hand-written `<name>.down.sql`. This runner applies them in order, one
 * transaction per migration, records them in `soyl_schema_migrations` (with a hash of the up file so
 * edits to applied migrations are detected), and holds an advisory lock so two runners cannot race
 * (pre-deploy job vs a developer). After every `up` run it calls `soyl_apply_conventions()` so grants
 * (DB-1) and updated_at triggers cover every table.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

export const MIGRATIONS_TABLE = 'soyl_schema_migrations';
const LOCK_KEY = 0x50_59_4c_01; // "SOYL" + 1
const FILE_RE = /^(\d{4})_([a-z0-9_]+)\.sql$/;

export function defaultMigrationsDir(): string {
  return process.env.SOYL_MIGRATIONS_DIR ?? fileURLToPath(new URL('../migrations', import.meta.url));
}

export interface Migration {
  /** 0-based position; equals the 4-digit prefix. */
  index: number;
  /** File name without .sql, e.g. 0001_schema. */
  name: string;
  up: string;
  down: string;
  /** sha256 of the up SQL with line endings normalised (Windows checkouts may use CRLF). */
  hash: string;
}

const normalise = (sql: string) => sql.replace(/\r\n/g, '\n');

export function loadMigrations(dir: string = defaultMigrationsDir()): Migration[] {
  const files = fs
    .readdirSync(dir)
    .filter((f) => FILE_RE.test(f))
    .sort();
  return files.map((file, position) => {
    const [, num, slug] = FILE_RE.exec(file)!;
    const index = Number(num);
    if (index !== position) throw new Error(`Migration ${file} is out of sequence (expected ${String(position).padStart(4, '0')}_...)`);
    const name = `${num}_${slug}`;
    const downPath = path.join(dir, `${name}.down.sql`);
    if (!fs.existsSync(downPath)) throw new Error(`Migration ${file} has no down file ${name}.down.sql (DB-8: every migration is reversible)`);
    const up = normalise(fs.readFileSync(path.join(dir, file), 'utf8'));
    const down = normalise(fs.readFileSync(downPath, 'utf8'));
    return { index, name, up, down, hash: createHash('sha256').update(up).digest('hex') };
  });
}

/** One hash over every migration (up and down): names test-database templates. */
export function migrationsFingerprint(migrations: Migration[] = loadMigrations()): string {
  const h = createHash('sha256');
  for (const m of migrations) h.update(m.name).update(m.up).update(m.down);
  return h.digest('hex');
}

export interface AppliedMigration {
  index: number;
  name: string;
  hash: string;
  appliedAt: Date;
}

export interface MigrationStatus {
  applied: AppliedMigration[];
  pending: Migration[];
  /** Applied migrations whose file changed since (or that no longer exist). */
  drift: string[];
}

type Log = (message: string) => void;
export interface MigrateOptions {
  dir?: string;
  /** Leave exactly this many migrations applied (up: apply until; down: roll back until). */
  to?: number;
  log?: Log;
}

async function ensureTable(client: pg.ClientBase) {
  const exists = await client.query(`SELECT to_regclass('public.${MIGRATIONS_TABLE}') IS NOT NULL AS ok`);
  if (exists.rows[0]?.ok) return;
  await client.query(`CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
    index integer PRIMARY KEY,
    name text NOT NULL UNIQUE,
    hash text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
}

async function readApplied(client: pg.ClientBase): Promise<AppliedMigration[]> {
  const res = await client.query<{ index: number; name: string; hash: string; applied_at: Date }>(
    `SELECT index, name, hash, applied_at FROM ${MIGRATIONS_TABLE} ORDER BY index`,
  );
  return res.rows.map((r) => ({ index: r.index, name: r.name, hash: r.hash, appliedAt: r.applied_at }));
}

export async function migrationStatus(client: pg.ClientBase, opts: { dir?: string } = {}): Promise<MigrationStatus> {
  const migrations = loadMigrations(opts.dir);
  await ensureTable(client);
  const applied = await readApplied(client);
  const byName = new Map(migrations.map((m) => [m.name, m]));
  const drift = applied.filter((a) => byName.get(a.name)?.hash !== a.hash).map((a) => a.name);
  const appliedNames = new Set(applied.map((a) => a.name));
  return { applied, pending: migrations.filter((m) => !appliedNames.has(m.name)), drift };
}

async function withLock<T>(client: pg.ClientBase, fn: () => Promise<T>): Promise<T> {
  await client.query('SELECT pg_advisory_lock($1)', [LOCK_KEY]);
  try {
    return await fn();
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]);
  }
}

function attachNotices(client: pg.ClientBase, log: Log) {
  const onNotice = (msg: { message?: string }) => log(`NOTICE: ${msg.message ?? ''}`);
  client.on('notice', onNotice);
  return () => client.off('notice', onNotice);
}

/** Applies pending migrations (all, or until `to` are applied). Returns the names applied. */
export async function migrateUp(client: pg.ClientBase, opts: MigrateOptions = {}): Promise<string[]> {
  const log = opts.log ?? (() => {});
  const migrations = loadMigrations(opts.dir);
  const target = opts.to ?? migrations.length;
  if (target < 0 || target > migrations.length) throw new Error(`--to ${target} is outside 0..${migrations.length}`);
  const detach = attachNotices(client, log);
  try {
    return await withLock(client, async () => {
      await ensureTable(client);
      const applied = await readApplied(client);
      const done: string[] = [];
      for (const m of migrations.slice(0, target)) {
        const prev = applied.find((a) => a.index === m.index);
        if (prev) {
          if (prev.name !== m.name) throw new Error(`Applied migration ${prev.index} is ${prev.name}, file is ${m.name}`);
          if (prev.hash !== m.hash) log(`WARNING: ${m.name} changed after it was applied (hash mismatch)`);
          continue;
        }
        await client.query('BEGIN');
        try {
          await client.query(m.up);
          await client.query(`INSERT INTO ${MIGRATIONS_TABLE} (index, name, hash) VALUES ($1, $2, $3)`, [m.index, m.name, m.hash]);
          await client.query('COMMIT');
        } catch (err) {
          await client.query('ROLLBACK');
          throw new Error(`Migration ${m.name} failed: ${(err as Error).message}`, { cause: err });
        }
        log(`applied ${m.name}`);
        done.push(m.name);
      }
      const fn = await client.query(`SELECT to_regprocedure('soyl_apply_conventions()') IS NOT NULL AS ok`);
      if (fn.rows[0]?.ok) await client.query('SELECT soyl_apply_conventions()');
      return done;
    });
  } finally {
    detach();
  }
}

/** Rolls back applied migrations, newest first, until `to` remain (default: roll back one). */
export async function migrateDown(client: pg.ClientBase, opts: MigrateOptions = {}): Promise<string[]> {
  const log = opts.log ?? (() => {});
  const migrations = loadMigrations(opts.dir);
  const detach = attachNotices(client, log);
  try {
    return await withLock(client, async () => {
      await ensureTable(client);
      const applied = await readApplied(client);
      const target = opts.to ?? Math.max(0, applied.length - 1);
      if (target < 0) throw new Error('--to must be >= 0');
      const done: string[] = [];
      for (const a of [...applied].reverse()) {
        if (a.index < target) break;
        const m = migrations.find((x) => x.name === a.name);
        if (!m) throw new Error(`Applied migration ${a.name} has no file; cannot roll it back`);
        await client.query('BEGIN');
        try {
          await client.query(m.down);
          await client.query(`DELETE FROM ${MIGRATIONS_TABLE} WHERE index = $1`, [a.index]);
          await client.query('COMMIT');
        } catch (err) {
          await client.query('ROLLBACK');
          throw new Error(`Rollback of ${m.name} failed: ${(err as Error).message}`, { cause: err });
        }
        log(`rolled back ${m.name}`);
        done.push(m.name);
      }
      return done;
    });
  } finally {
    detach();
  }
}

/** Convenience: connect, migrate up, disconnect. */
export async function migrateDatabase(url: string, opts: MigrateOptions = {}): Promise<string[]> {
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    return await migrateUp(client, opts);
  } finally {
    await client.end();
  }
}
