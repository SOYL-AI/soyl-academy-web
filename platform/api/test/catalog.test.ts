/** Catalog endpoints: guests allowed, shapes, 404/400, ETag + Cache-Control, fail-open on KV outage (API-16). */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { chapters, subjects, topics } from '@soyl/db';
import { MemoryKv } from '../src/kv';
import { schoolAssessmentKind, topicAssessment } from '../src/domain/assessment';
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

describe('formative-only chapters and topics (board_assessed, M5)', () => {
  it('derives the kind of school assessment from the curriculum wording', () => {
    expect(schoolAssessmentKind(true, 'The Age of Industrialisation (periodic assessment only)')).toBeNull();
    expect(schoolAssessmentKind(false, 'The Age of Industrialisation (periodic assessment only)')).toBe('periodic');
    expect(schoolAssessmentKind(false, 'Transport, communication and trade (interdisciplinary project only)')).toBe('project');
    expect(schoolAssessmentKind(false, 'Suggestions for Project Work (non-evaluative)')).toBe('project');
    expect(schoolAssessmentKind(false, 'Practical: Portfolio', 'Practical')).toBe('practical');
    expect(schoolAssessmentKind(false, 'Evolution (formative assessment only)', null)).toBe('internal');
    expect(schoolAssessmentKind(false, 'Seminar', 'Seminar (internal assessment)')).toBe('internal');
    // Topic flags are effective: a school-only chapter makes every topic school-only, with the chapter's wording.
    const chapter = { boardAssessed: false, title: 'Practical: Performance', unit: 'Practical' };
    expect(topicAssessment(chapter, { boardAssessed: true, title: 'Rendition' })).toEqual({ boardAssessed: false, schoolAssessment: 'practical' });
    expect(topicAssessment({ boardAssessed: true, title: 'Magnetic effects', unit: null }, { boardAssessed: false, title: 'Electric motor (formative assessment only)' })).toEqual({ boardAssessed: false, schoolAssessment: 'internal' });
    expect(topicAssessment({ boardAssessed: true, title: 'Magnetic effects', unit: null }, { boardAssessed: true, title: 'Fuses' })).toEqual({ boardAssessed: true, schoolAssessment: null });
  });

  it('catalog chapters and the chapter hub label school-only chapters and topics', async () => {
    const [hindi] = await h.t.db.select().from(subjects).where(eq(subjects.key, 'cbse-10-hindi-a'));
    const year = '2026-27';
    const [periodic] = await h.t.db
      .insert(chapters)
      .values({ subjectId: hindi!.id, key: 'cbse-10-hindi-a-ch01', academicYear: year, number: 1, title: 'Chapter one (periodic assessment only)', syllabusUnit: 'Part A', boardAssessed: false })
      .returning();
    const [mixed] = await h.t.db.insert(chapters).values({ subjectId: hindi!.id, key: 'cbse-10-hindi-a-ch02', academicYear: year, number: 2, title: 'Chapter two' }).returning();
    await h.t.db.insert(topics).values([
      { chapterId: periodic!.id, key: 'cbse-10-hindi-a-ch01-t01', academicYear: year, position: 1, title: 'Reading' },
      { chapterId: mixed!.id, key: 'cbse-10-hindi-a-ch02-t01', academicYear: year, position: 1, title: 'Grammar' },
      { chapterId: mixed!.id, key: 'cbse-10-hindi-a-ch02-t02', academicYear: year, position: 2, title: 'Letter writing project (project work only)', boardAssessed: false },
    ]);

    const cat = (await h.client().get('/v1/catalog/subjects/cbse-10-hindi-a/chapters')).json();
    expect(cat.chapters).toEqual([
      expect.objectContaining({ id: 'cbse-10-hindi-a-ch01', boardAssessed: false, schoolAssessment: 'periodic', topics: [{ id: 'cbse-10-hindi-a-ch01-t01', title: 'Reading', titleEn: null, boardAssessed: false, schoolAssessment: 'periodic' }] }),
      expect.objectContaining({
        id: 'cbse-10-hindi-a-ch02',
        boardAssessed: true,
        schoolAssessment: null,
        topics: [
          { id: 'cbse-10-hindi-a-ch02-t01', title: 'Grammar', titleEn: null, boardAssessed: true, schoolAssessment: null },
          { id: 'cbse-10-hindi-a-ch02-t02', title: 'Letter writing project (project work only)', titleEn: null, boardAssessed: false, schoolAssessment: 'project' },
        ],
      }),
    ]);

    const hub1 = (await h.client().get('/v1/chapters/cbse-10-hindi-a-ch01')).json();
    expect(hub1.chapter).toMatchObject({ boardAssessed: false, schoolAssessment: 'periodic', topics: [{ id: 'cbse-10-hindi-a-ch01-t01', boardAssessed: false, schoolAssessment: 'periodic' }] });
    const hub2 = (await h.client().get('/v1/chapters/cbse-10-hindi-a-ch02')).json();
    expect(hub2.chapter).toMatchObject({ boardAssessed: true, schoolAssessment: null });
    expect(hub2.chapter.topics.map((t: { boardAssessed: boolean; schoolAssessment: string | null }) => [t.boardAssessed, t.schoolAssessment])).toEqual([
      [true, null],
      [false, 'project'],
    ]);
    await h.t.db.delete(chapters).where(and(eq(chapters.subjectId, hindi!.id)));
  });
});
});
