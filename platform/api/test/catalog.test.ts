/** Catalog endpoints: guests allowed, shapes, 404/400, ETag + Cache-Control, fail-open on KV outage (API-16). */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { MemoryKv } from '../src/kv';
import { CATALOG_CACHE_CONTROL } from '../src/modules/catalog';
import { createHarness, seedMiniCatalog, type Harness } from './helpers';

let h: Harness;

beforeAll(async () => {
  h = await createHarness();
  await seedMiniCatalog(h.t);
});
afterAll(async () => {
  await h?.close();
});

describe('catalog', () => {
  it('lists boards with classes (guest, cacheable)', async () => {
    const res = await h.client().get('/v1/catalog/boards');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe(CATALOG_CACHE_CONTROL);
    expect(res.headers.etag).toBeTruthy();
    expect(res.json()).toEqual({
      academicYear: '2026-27',
      boards: [
        { code: 'cbse', name: 'CBSE', classes: [{ level: 10, exam: 'cbse', name: 'Class 10' }] },
        { code: 'cisce', name: 'CISCE', classes: [{ level: 10, exam: 'icse', name: 'Class 10 (ICSE)' }] },
      ],
    });
  });

  it('answers If-None-Match with 304', async () => {
    const first = await h.client().get('/v1/catalog/boards');
    const second = await h.client().get('/v1/catalog/boards', { headers: { 'if-none-match': String(first.headers.etag) } });
    expect(second.statusCode).toBe(304);
    expect(second.body).toBe('');
    expect(second.headers['cache-control']).toBe(CATALOG_CACHE_CONTROL);
  });

  it('lists subjects for a board and class', async () => {
    const res = await h.client().get('/v1/catalog/cbse/10/subjects');
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.subjects.map((s: { id: string }) => s.id)).toEqual(['cbse-10-science', 'cbse-10-hindi-a']);
    expect(body.subjects[1]).toMatchObject({ language: 'hi', script: 'Deva', tier: 'language', variants: [{ code: '002', name: 'Hindi Course A' }] });
    expect((await h.client().get('/v1/catalog/cisce/10/subjects')).json().subjects).toEqual([]);
  });

  it('validates params', async () => {
    expect((await h.client().get('/v1/catalog/ib/10/subjects')).statusCode).toBe(400);
    expect((await h.client().get('/v1/catalog/cbse/6/subjects')).statusCode).toBe(400);
    expect((await h.client().get('/v1/catalog/subjects/not-a-subject/chapters')).statusCode).toBe(400);
  });

  it('lists chapters with topics in order; unknown subject is 404', async () => {
    const res = await h.client().get('/v1/catalog/subjects/cbse-10-science/chapters');
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.subject.id).toBe('cbse-10-science');
    expect(body.chapters.map((c: { id: string }) => c.id)).toEqual(['cbse-10-science-ch01', 'cbse-10-science-ch02']);
    expect(body.chapters[0].topics.map((t: { id: string }) => t.id)).toEqual(['cbse-10-science-ch01-t01', 'cbse-10-science-ch01-t02']);
    expect((await h.client().get('/v1/catalog/subjects/cbse-10-geography/chapters')).statusCode).toBe(404);
  });

  it('personal requests are not stored by caches (API-4)', async () => {
    const c = h.client();
    await c.signInEmail('catalog-reader@example.com');
    const res = await c.get('/v1/catalog/boards');
    expect(res.headers['cache-control']).toBe('no-store');
  });

  it('keeps serving learning reads when the KV store is down (API-16), while auth fails closed', async () => {
    if (!(h.kv instanceof MemoryKv)) return; // fault injection uses the memory store
    h.kv.failing = true;
    try {
      expect((await h.client().get('/v1/catalog/boards')).statusCode).toBe(200);
      const auth = await h.client().post('/v1/auth/email/send-otp', { email: 'kv-down@example.com' });
      expect(auth.statusCode).toBe(503);
      expect(auth.json().code).toBe('service_unavailable');
      expect((await h.client().get('/readyz', { edge: null })).statusCode).toBe(503);
    } finally {
      h.kv.failing = false;
    }
  });
});
