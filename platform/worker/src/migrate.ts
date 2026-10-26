/**
 * `node dist/index.js migrate`: installs or upgrades the pg-boss schema, then grants the app role DML
 * on it (DB-1, ADR-003). Run by the pre-deploy migrations job as the migrator identity, after
 * `@soyl/db migrate up`. The running worker then starts pg-boss with `migrate: false`.
 *
 * pg-boss upgrades may queue background index builds ("BAM", CREATE INDEX CONCURRENTLY). Only an
 * instance started with `migrate: true` runs them, and they need the table owner, so this command
 * waits for them before exiting.
 */
import pg from 'pg';
import { PgBoss } from 'pg-boss';
import type { ConstructorOptions } from 'pg-boss';
import { errorFields, type Logger } from './logger';

export interface InstallOptions {
  connectionString: string;
  schema: string;
  /** Role that receives DML on the schema; skipped (with a notice) when the role does not exist. */
  appRole?: string;
  log: Logger;
  /** How long to wait for pending background migrations (default 600 s). */
  bamWaitSeconds?: number;
  /** Extra pg-boss constructor options (tests). */
  bossOptions?: Partial<ConstructorOptions>;
}

export interface InstallResult {
  schemaVersion: number | null;
  /** Whether grants were applied to the app role. */
  granted: boolean;
  /** Background migrations still pending or failed when the command returned. */
  bamOutstanding: number;
}

const IDENTIFIER = /^[a-z_][a-z0-9_]{0,62}$/;

export function quoteIdent(name: string): string {
  if (!IDENTIFIER.test(name)) throw new Error(`refusing unexpected identifier ${JSON.stringify(name)}`);
  return `"${name}"`;
}

/**
 * The statements that give `role` exactly what a pg-boss worker needs on `schema`: USAGE on the
 * schema, DML on its tables, EXECUTE on its functions (create_queue, job_now, ...). No CREATE, no
 * TRUNCATE, no ownership. Default privileges cover tables a later pg-boss release adds when the same
 * migrator creates them; the next `migrate` run re-applies the explicit grants anyway.
 */
export function appRoleGrants(schema: string, role: string): string[] {
  const s = quoteIdent(schema);
  const r = quoteIdent(role);
  return [
    `GRANT USAGE ON SCHEMA ${s} TO ${r}`,
    `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ${s} TO ${r}`,
    `GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ${s} TO ${r}`,
    `GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA ${s} TO ${r}`,
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${s} GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${r}`,
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${s} GRANT USAGE, SELECT ON SEQUENCES TO ${r}`,
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${s} GRANT EXECUTE ON FUNCTIONS TO ${r}`,
  ];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function installPgBossSchema(opts: InstallOptions): Promise<InstallResult> {
  const { connectionString, schema, log } = opts;
  quoteIdent(schema);
  const client = new pg.Client({ connectionString, application_name: 'soyl-worker-migrate' });
  await client.connect();
  try {
    // An existing (e.g. pre-created by the server admin) schema must not be re-created: CREATE SCHEMA
    // IF NOT EXISTS still needs CREATE on the database.
    const exists = ((await client.query('SELECT 1 FROM pg_namespace WHERE nspname = $1', [schema])).rowCount ?? 0) > 0;

    const boss = new PgBoss({
      connectionString,
      schema,
      migrate: true,
      createSchema: !exists,
      supervise: false,
      schedule: false,
      registerInstance: false,
      max: 2,
      application_name: 'soyl-worker-migrate',
      ...opts.bossOptions,
    });
    boss.on('error', (err) => log.error('pg-boss error', { err: errorFields(err) }));
    boss.on('warning', (w) => log.warn('pg-boss warning', { message: w.message }));

    let schemaVersion: number | null = null;
    let bamOutstanding = 0;
    await boss.start();
    try {
      const deadline = Date.now() + (opts.bamWaitSeconds ?? 600) * 1000;
      for (;;) {
        const status = await boss.getBamStatus();
        const pending = status.filter((s) => s.status === 'pending' || s.status === 'in_progress').reduce((n, s) => n + s.count, 0);
        const failed = status.filter((s) => s.status === 'failed').reduce((n, s) => n + s.count, 0);
        bamOutstanding = pending + failed;
        if (pending === 0 || Date.now() >= deadline) {
          if (pending) log.warn('pg-boss background migrations still pending; re-run migrate', { pending });
          if (failed) log.warn('pg-boss background migrations failed; see the bam table', { failed });
          break;
        }
        await sleep(2000);
      }
      schemaVersion = await boss.schemaVersion();
    } finally {
      await boss.stop({ graceful: true, timeout: 10_000 });
    }

    let granted = false;
    const role = opts.appRole ?? 'soyl_app';
    const roleExists = ((await client.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [role])).rowCount ?? 0) > 0;
    if (roleExists) {
      for (const stmt of appRoleGrants(schema, role)) await client.query(stmt);
      granted = true;
    } else {
      log.warn('app role does not exist; pg-boss grants skipped', { role });
    }
    log.info('pg-boss schema ready', { schema, schemaVersion, granted, role });
    return { schemaVersion, granted, bamOutstanding };
  } finally {
    await client.end();
  }
}
