/**
 * Retrieval with pgvector (ADR-014). Runs where the `vector` extension exists (CI's Postgres image,
 * Azure); the embedded Postgres used locally has no pgvector, so there the suite only checks that the
 * full-text fallback is chosen. Embeddings come from the deterministic MockEmbedder.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { MockEmbedder } from '@soyl/ai-core';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { hasVectorColumn, indexChapter, searchContent } from '../src/ai/retrieval';
import { seedRealContent } from './content-fixture';

let t: TestDb;
const SCI = 'cbse-10-science-ch02';
const YEAR = '2026-27';
const embedder = new MockEmbedder(undefined, { env: { APP_ENV: 'test' } });

beforeAll(async () => {
  t = await createTestDb();
  await seedRealContent(t, (u) => u === SCI);
});
afterAll(async () => {
  await t?.close();
});

describe('vector retrieval', () => {
  it('embeds chunks and searches by cosine similarity where pgvector exists; FTS otherwise', async () => {
    const vector = await hasVectorColumn(t.db);
    const r = await indexChapter(t.db, SCI, YEAR, embedder);
    expect(r.inserted).toBeGreaterThan(0);
    const s = await searchContent(t.db, { academicYear: YEAR, subjectKey: 'cbse-10-science' }, 'What colour does litmus turn in acid?', 5, embedder);
    expect(s.chunks.length).toBeGreaterThan(0);
    if (!vector) {
      expect(r.embedded).toBe(0);
      expect(s.method).toBe('fts');
      return;
    }
    expect(r.embedded).toBe(r.inserted);
    const [m] = (await t.db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM content_chunks WHERE embedding IS NOT NULL AND embedding_model = 'mock-embedding'`)).rows;
    expect(m!.n).toBe(r.inserted);
    expect(['vector', 'hybrid']).toContain(s.method);
    expect(s.chunks[0]!.via).toBe('vector');
    expect(s.embeddingCostPaise).toBeGreaterThan(0);
  });
});
