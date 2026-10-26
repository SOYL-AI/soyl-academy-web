/**
 * Schema-wide rules: ARCHITECTURE §6 conventions, indexes on every foreign key, the DB-5 personal-data
 * inventory, and agreement between the Drizzle definitions and the migrated database.
 */
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { is, sql } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';
import { createTestDb, type TestDb } from '../src/testing';
import * as schema from '../schema/index';
import { EMBEDDING_DIMENSIONS } from '../schema/index';

const APPEND_ONLY = ['credit_ledger', 'audit_log', 'webhook_events', 'content_budget_ledger', 'analytics_events'];
const YEAR_SCOPED = ['subjects', 'syllabus_versions', 'chapters', 'topics', 'learning_outcomes', 'decks', 'notes', 'flashcard_sets', 'questions', 'content_releases', 'content_chunks', 'blueprints', 'test_series', 'tests', 'live_events'];

let t: TestDb;
const rows = async <T,>(q: ReturnType<typeof sql>) => (await t.db.execute(q)).rows as T[];

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

const drizzleTables: PgTable[] = (Object.values(schema) as unknown[]).filter((v): v is PgTable => is(v, PgTable));

describe('schema conventions', () => {
  it('defines the ARCHITECTURE §6 groups (60 tables) + learning progress (3, migration 0005)', () => {
    expect(drizzleTables.length).toBe(63);
  });

  it('matches the migrated database table by table, column by column', async () => {
    const cols = await rows<{ table_name: string; column_name: string }>(
      sql`SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'`,
    );
    const hasVector = (await rows(sql`SELECT 1 FROM pg_extension WHERE extname = 'vector'`)).length > 0;
    for (const table of drizzleTables) {
      const cfg = getTableConfig(table);
      const dbCols = cols.filter((c) => c.table_name === cfg.name).map((c) => c.column_name).sort();
      const expected = cfg.columns.map((c) => c.name).filter((n) => hasVector || !(cfg.name === 'content_chunks' && n === 'embedding'));
      expect(dbCols, cfg.name).toEqual(expected.sort());
    }
  });

  it('gives every table a uuid id, created_at and (unless append-only) updated_at, all timestamptz', async () => {
    const cols = await rows<{ table_name: string; column_name: string; data_type: string; is_nullable: string }>(sql`
      SELECT c.table_name, c.column_name, c.data_type, c.is_nullable
      FROM information_schema.columns c JOIN information_schema.tables t USING (table_schema, table_name)
      WHERE c.table_schema = 'public' AND t.table_type = 'BASE TABLE' AND c.table_name <> 'soyl_schema_migrations'`);
    const tables = [...new Set(cols.map((c) => c.table_name))];
    expect(tables.length).toBe(63);
    for (const tbl of tables) {
      const col = (n: string) => cols.find((c) => c.table_name === tbl && c.column_name === n);
      expect(col('id')?.data_type, `${tbl}.id`).toBe(tbl === 'pipeline_runs' ? 'text' : 'uuid');
      expect(col('created_at')?.data_type, `${tbl}.created_at`).toBe('timestamp with time zone');
      if (APPEND_ONLY.includes(tbl)) expect(col('updated_at'), `${tbl} is append-only`).toBeUndefined();
      else expect(col('updated_at')?.data_type, `${tbl}.updated_at`).toBe('timestamp with time zone');
    }
    // GEN-6: no timestamp without time zone anywhere
    expect(cols.filter((c) => c.data_type === 'timestamp without time zone')).toEqual([]);
  });

  it('carries academic_year on catalog, content and assessment tables', async () => {
    const cols = await rows<{ table_name: string }>(
      sql`SELECT table_name FROM information_schema.columns WHERE table_schema = 'public' AND column_name = 'academic_year'`,
    );
    const have = new Set(cols.map((c) => c.table_name));
    for (const tbl of YEAR_SCOPED) expect(have.has(tbl), tbl).toBe(true);
  });

  it('indexes every foreign key column (leading index column)', async () => {
    const missing = await rows<{ tbl: string; col: string }>(sql`
      SELECT c.conrelid::regclass::text AS tbl, a.attname AS col
      FROM pg_constraint c
      JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = c.conkey[1]
      WHERE c.contype = 'f' AND c.connamespace = 'public'::regnamespace
        AND NOT EXISTS (SELECT 1 FROM pg_index i WHERE i.indrelid = c.conrelid AND i.indkey[0] = c.conkey[1])
      ORDER BY 1, 2`);
    expect(missing).toEqual([]);
  });

  it('has the ARCHITECTURE §6 hot-lookup indexes', async () => {
    const idx = await rows<{ indexdef: string }>(sql`SELECT indexdef FROM pg_indexes WHERE schemaname = 'public'`);
    const defs = idx.map((i) => i.indexdef);
    expect(defs.some((d) => d.includes('ON public.questions') && d.includes('(chapter_id, status, difficulty)'))).toBe(true);
    expect(defs.some((d) => d.includes('ON public.attempts') && d.includes('(user_id, created_at)'))).toBe(true);
    expect(defs.some((d) => d.includes('ON public.credit_ledger') && d.includes('(user_id, created_at)'))).toBe(true);
  });

  it('puts the updated_at trigger on every table that has updated_at', async () => {
    const missing = await rows<{ table_name: string }>(sql`
      SELECT c.table_name FROM information_schema.columns c
      JOIN information_schema.tables t USING (table_schema, table_name)
      WHERE c.table_schema = 'public' AND c.column_name = 'updated_at' AND t.table_type = 'BASE TABLE'
        AND NOT EXISTS (SELECT 1 FROM pg_trigger g WHERE g.tgrelid = ('public.' || c.table_name)::regclass AND g.tgname = 'soyl_set_updated_at')`);
    expect(missing).toEqual([]);
  });

  it('creates the pgvector column with EMBEDDING_DIMENSIONS where pgvector exists', async (ctx) => {
    const available = (await rows(sql`SELECT 1 FROM pg_available_extensions WHERE name = 'vector'`)).length > 0;
    if (!available) {
      ctx.skip(); // embedded Postgres has no pgvector; CI's Postgres does (ADR-004)
      return;
    }
    const [r] = await rows<{ t: string }>(sql`SELECT format_type(atttypid, atttypmod) AS t FROM pg_attribute WHERE attrelid = 'content_chunks'::regclass AND attname = 'embedding'`);
    expect(r?.t).toBe(`vector(${EMBEDDING_DIMENSIONS})`);
    const idx = await rows(sql`SELECT 1 FROM pg_indexes WHERE indexname = 'content_chunks_embedding_hnsw_idx'`);
    expect(idx).toHaveLength(1);
  });
});

describe('DB-5 personal-data inventory', () => {
  const PII_SEGMENTS = new Set(['email', 'phone', 'name', 'ip', 'address', 'dob', 'birth', 'token', 'tokens', 'password']);
  const inventory = fs.readFileSync(path.join(import.meta.dirname, '..', 'PII.md'), 'utf8');
  const listed = new Set([...inventory.matchAll(/`([a-z0-9_]+)\.([a-z0-9_*]+)`/g)].map((m) => `${m[1]}.${m[2]}`));

  it('lists every column whose name looks like personal data', () => {
    const missing: string[] = [];
    for (const table of drizzleTables) {
      const cfg = getTableConfig(table);
      for (const col of cfg.columns) {
        const segments = col.name.split('_');
        if (!segments.some((s) => PII_SEGMENTS.has(s)) && col.name !== 'user_agent') continue;
        if (!listed.has(`${cfg.name}.${col.name}`) && !listed.has(`${cfg.name}.*`)) missing.push(`${cfg.name}.${col.name}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('only lists columns that exist', () => {
    const all = new Set(drizzleTables.flatMap((tb) => {
      const cfg = getTableConfig(tb);
      return [`${cfg.name}.*`, ...cfg.columns.map((c) => `${cfg.name}.${c.name}`)];
    }));
    expect([...listed].filter((c) => !all.has(c))).toEqual([]);
  });
});
