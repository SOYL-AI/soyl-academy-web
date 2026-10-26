import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pg from 'pg';
import { createDb } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { loadConfig } from '../src/config';
import { JOB_NAMES } from '../src/jobs';
import { memoryLogger } from '../src/logger';
import { appRoleGrants, installPgBossSchema, quoteIdent } from '../src/migrate';
import { bossOptions, startWorker } from '../src/worker';
import { ago, httpGet, makeSession, makeUser, makeVerification, waitForJob } from './helpers';

describe('startWorker (self-migrating, local/test)', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('starts pg-boss, registers jobs, serves probes, heartbeats, and stops gracefully', async () => {
    const config = loadConfig({ APP_ENV: 'test', WORKER_HEALTH_PORT: '0', WORKER_HEALTH_HOST: '127.0.0.1', WORKER_SHUTDOWN_TIMEOUT_MS: '2000' });
    const { db, pool } = createDb(t.url, { max: 2 });
    const log = memoryLogger();
    const worker = await startWorker({ config, databaseUrl: t.url, db, pool, log, heartbeatMs: 100, pollingIntervalSeconds: 0.5 });

    expect(worker.state.started).toBe(true);
    expect(worker.state.lastBossOkAt).toBeInstanceOf(Date);
    expect(worker.jobs.map((j) => j.name).sort()).toEqual(Object.values(JOB_NAMES).sort());
    expect(await httpGet(worker.port, '/healthz')).toEqual({ status: 200, body: '{"status":"ok"}' });
    expect(await httpGet(worker.port, '/readyz')).toEqual({ status: 200, body: '{"status":"ready"}' });

    // A sent job runs through the worker's own registration.
    const u = await makeUser(db);
    await makeSession(db, u, ago(1, new Date()));
    const id = await worker.boss.send(JOB_NAMES.sweepSessions, {});
    const job = await waitForJob(worker.boss, JOB_NAMES.sweepSessions, id!);
    expect(job.output).toEqual({ deleted: 1 });
    expect(worker.state.lastJobOkAt).toBeInstanceOf(Date);

    // Timer heartbeat.
    const deadline = Date.now() + 5000;
    while (!log.lines.some((l) => l.msg === 'heartbeat') && Date.now() < deadline) await new Promise((r) => setTimeout(r, 50));
    expect(log.lines.some((l) => l.msg === 'heartbeat')).toBe(true);

    await expect(worker.stop()).resolves.toBeUndefined();
    await expect(worker.stop()).resolves.toBeUndefined(); // idempotent
    expect(worker.state.started).toBe(false);
    expect(pool.ended).toBe(true);
    await expect(httpGet(worker.port, '/healthz')).rejects.toThrow();
    expect(await worker.heartbeat()).toBe(false); // pg-boss is closed now
    expect(log.lines.some((l) => l.msg === 'worker stopped')).toBe(true);
  });

  it('fails to start (and cleans up) when pg-boss is not installed and migrate is off', async () => {
    const empty = await createTestDb();
    try {
      const config = loadConfig({ APP_ENV: 'test', PGBOSS_MIGRATE: 'false', WORKER_HEALTH_PORT: '0', WORKER_HEALTH_HOST: '127.0.0.1' });
      const { db, pool } = createDb(empty.url, { max: 1 });
      await expect(startWorker({ config, databaseUrl: empty.url, db, pool, log: memoryLogger() })).rejects.toThrow(/not installed/);
      await pool.end();
    } finally {
      await empty.close();
    }
  });

  it('builds pg-boss options from config (no reindex without migrate)', () => {
    const local = bossOptions(loadConfig({ APP_ENV: 'test' }), 'postgres://x');
    expect(local).toMatchObject({ connectionString: 'postgres://x', schema: 'pgboss', migrate: true, supervise: true, schedule: true });
    expect(local).not.toHaveProperty('reindex');
    const prod = bossOptions(loadConfig({ APP_ENV: 'prod', DATABASE_URL: 'postgres://y' }), 'postgres://y');
    expect(prod).toMatchObject({ migrate: false, reindex: false });
  });
});

describe('migrate command + worker as the app role (DB-1)', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('quotes only safe identifiers and grants exactly DML/EXECUTE/USAGE', () => {
    expect(quoteIdent('pgboss')).toBe('"pgboss"');
    expect(() => quoteIdent('a"; drop')).toThrow(/unexpected identifier/);
    const grants = appRoleGrants('pgboss', 'soyl_app');
    expect(grants.join('\n')).not.toMatch(/\b(CREATE|TRUNCATE|ALL PRIVILEGES|OWNER)\b/);
    expect(grants).toContain('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "pgboss" TO "soyl_app"');
  });

  it('installs the schema as the migrator, then a worker running as soyl_app processes jobs without DDL', async () => {
    const log = memoryLogger();
    const first = await installPgBossSchema({ connectionString: t.url, schema: 'pgboss', appRole: 'soyl_app', log });
    expect(first.granted).toBe(true);
    expect(first.schemaVersion).toBeGreaterThan(0);
    expect(first.bamOutstanding).toBe(0);
    // Idempotent re-run (existing schema path).
    const second = await installPgBossSchema({ connectionString: t.url, schema: 'pgboss', log });
    expect(second.schemaVersion).toBe(first.schemaVersion);

    const asApp = { options: '-c role=soyl_app' };
    const { db, pool } = createDb(t.url, { max: 2, pool: asApp });
    expect((await pool.query('SELECT current_user AS u')).rows[0].u).toBe('soyl_app');
    // The app role cannot change the pg-boss schema.
    await expect(pool.query('CREATE TABLE pgboss.not_allowed (id int)')).rejects.toThrow(/permission denied/);

    const config = loadConfig({ APP_ENV: 'test', PGBOSS_MIGRATE: 'false', WORKER_HEALTH_PORT: '0', WORKER_HEALTH_HOST: '127.0.0.1' });
    const worker = await startWorker({ config, databaseUrl: t.url, db, pool, log, pollingIntervalSeconds: 0.5, bossOptions: asApp });
    try {
      const v = await makeVerification(db, ago(1, new Date()));
      expect(v).toBeTruthy();
      const id = await worker.boss.send(JOB_NAMES.sweepVerifications, {});
      const job = await waitForJob(worker.boss, JOB_NAMES.sweepVerifications, id!);
      expect(job.state).toBe('completed');
      expect(job.output).toEqual({ deleted: 1 });
      // account purge deletes users as soyl_app; cascades run with the owner's rights.
      await makeUser(db, { deletedAt: ago(60, new Date()), withSession: true, withProfile: true });
      const pid = await worker.boss.send(JOB_NAMES.accountPurge, {});
      expect((await waitForJob(worker.boss, JOB_NAMES.accountPurge, pid!)).output).toEqual({ deleted: 1 });
    } finally {
      await worker.stop();
    }
  });

  it('skips grants when the role does not exist, and installs into a pre-created schema', async () => {
    const admin = new pg.Client({ connectionString: t.url });
    await admin.connect();
    try {
      await admin.query('CREATE SCHEMA precreated');
    } finally {
      await admin.end();
    }
    const log = memoryLogger();
    const res = await installPgBossSchema({ connectionString: t.url, schema: 'precreated', appRole: 'no_such_role', log, bamWaitSeconds: 1 });
    expect(res.granted).toBe(false);
    expect(res.schemaVersion).toBeGreaterThan(0);
    expect(log.lines.some((l) => l.msg === 'app role does not exist; pg-boss grants skipped')).toBe(true);
  });
});
