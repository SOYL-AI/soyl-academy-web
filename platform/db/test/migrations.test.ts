/**
 * DB-8 / AGENTS §6 "DB: migration up/down on fresh and seeded DB".
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createTestDb, type TestDb } from '../src/testing';
import { MIGRATIONS_TABLE, loadMigrations, migrateDown, migrateUp, migrationStatus } from '../src/migrator';
import { createDb } from '../src/client';
import { seedCatalog } from '../src/seed/catalog';
import { seedTestUsers } from '../src/seed/test-users';
import { creditLedger, webhookEvents } from '../schema/index';
import { istDay } from '../src/ids';
import { insertQuestion, makeChapter, makeTest, makeUser, sampleQuestion } from './helpers';

async function snapshot(c: pg.ClientBase) {
  const q = async (sql: string) => (await c.query(sql)).rows.map((r) => Object.values(r).join('|')).sort();
  return {
    tables: await q(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name <> '${MIGRATIONS_TABLE}'`),
    columns: await q(`SELECT table_name, column_name, data_type, is_nullable, coalesce(column_default, ''), coalesce(generation_expression, '') FROM information_schema.columns WHERE table_schema = 'public' AND table_name <> '${MIGRATIONS_TABLE}'`),
    indexes: await q(`SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename <> '${MIGRATIONS_TABLE}'`),
    constraints: await q(`SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE connamespace = 'public'::regnamespace`),
    // Extension-owned functions (pgvector in CI) stay installed across down/up; only ours count.
    functions: await q(`SELECT p.proname FROM pg_proc p WHERE p.pronamespace = 'public'::regnamespace
      AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_proc'::regclass AND d.objid = p.oid AND d.deptype = 'e')`),
    triggers: await q(`SELECT tgname, tgrelid::regclass::text FROM pg_trigger WHERE NOT tgisinternal`),
    views: await q(`SELECT viewname FROM pg_views WHERE schemaname = 'public'`),
    grants: await q(`SELECT table_name, privilege_type FROM information_schema.role_table_grants WHERE grantee = 'soyl_app'`),
  };
}

const log = () => {};

describe('migrations', () => {
  let fresh: TestDb;
  let client: pg.Client;
  beforeAll(async () => {
    fresh = await createTestDb({ migrate: false });
    client = new pg.Client({ connectionString: fresh.url });
    await client.connect();
  });
  afterAll(async () => {
    await client?.end();
    await fresh?.close();
  });

  it('every migration has a down file and runs in sequence', () => {
    const ms = loadMigrations();
    expect(ms.length).toBeGreaterThanOrEqual(3);
    ms.forEach((m, i) => {
      expect(m.index).toBe(i);
      expect(m.down.trim().length).toBeGreaterThan(0);
    });
  });

  it('up → down to 0 → up on a fresh database leaves an identical schema', async () => {
    const applied = await migrateUp(client, { log });
    expect(applied).toEqual(loadMigrations().map((m) => m.name));
    const first = await snapshot(client);
    expect(first.tables.length).toBeGreaterThanOrEqual(60);
    expect(first.views).toEqual(['content_budget', 'student_questions']);

    const rolledBack = await migrateDown(client, { to: 0, log });
    expect(rolledBack).toEqual(loadMigrations().map((m) => m.name).reverse());
    const empty = await snapshot(client);
    expect(empty.tables).toEqual([]);
    expect(empty.functions).toEqual([]);
    expect(empty.triggers).toEqual([]);
    expect(empty.views).toEqual([]);

    await migrateUp(client, { log });
    expect(await snapshot(client)).toEqual(first);
    const status = await migrationStatus(client);
    expect(status.pending).toEqual([]);
    expect(status.drift).toEqual([]);
  });

  it('steps down one migration at a time and up to a target', async () => {
    const total = loadMigrations().length;
    expect(await migrateDown(client, { log })).toHaveLength(1);
    expect((await migrationStatus(client)).applied).toHaveLength(total - 1);
    await migrateDown(client, { to: 1, log });
    expect((await migrationStatus(client)).applied.map((a) => a.index)).toEqual([0]);
    await migrateUp(client, { to: 2, log });
    expect((await migrationStatus(client)).applied).toHaveLength(2);
    await migrateUp(client, { log });
    expect((await migrationStatus(client)).pending).toEqual([]);
    expect(await migrateUp(client, { log })).toEqual([]); // idempotent
  });

  it('reports a migration file changed after it was applied', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'soyl-mig-'));
    try {
      for (const f of fs.readdirSync(path.join(import.meta.dirname, '..', 'migrations')))
        if (f.endsWith('.sql')) fs.copyFileSync(path.join(import.meta.dirname, '..', 'migrations', f), path.join(dir, f));
      fs.appendFileSync(path.join(dir, '0002_policies.sql'), '\n-- edited\n');
      const status = await migrationStatus(client, { dir });
      expect(status.drift).toEqual(['0002_policies']);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('migrations on a seeded database', () => {
  let t: TestDb;
  beforeAll(async () => {
    t = await createTestDb();
  });
  afterAll(async () => {
    await t?.close();
  });

  it('rolls all the way down and back up with catalog, users, content, attempts and ledger rows present', async () => {
    await seedCatalog(t.db);
    await seedTestUsers(t.db);
    const { subject, chapter } = await makeChapter(t.db);
    const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
    await makeTest(t.db, subject.id, chapter.key, [q.id]);
    const u = await makeUser(t.db);
    await t.db.insert(creditLedger).values({ userId: u.id, kind: 'grant', amount: 25, action: 'daily_grant', istDay: istDay() });
    await t.db.insert(webhookEvents).values({ eventId: 'evt_seeded', eventType: 'order.paid', payload: {} });

    const c = new pg.Client({ connectionString: t.url });
    await c.connect();
    try {
      const before = await snapshot(c);
      await migrateDown(c, { to: 0, log });
      expect((await snapshot(c)).tables).toEqual([]);
      await migrateUp(c, { log });
      expect(await snapshot(c)).toEqual(before);
    } finally {
      await c.end();
    }

    // and the re-created database is usable: seeding again works
    const { db, close } = createDb(t.url, { max: 2 });
    try {
      const report = await seedCatalog(db);
      expect(report.subjects).toBeGreaterThanOrEqual(448);
    } finally {
      await close();
    }
  });
});
