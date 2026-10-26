/**
 * Content API on the real authored/exemplar releases: hub, deck, notes, flashcards; visibility
 * (published/reviewed only, §7.3), caching (ADR-010), and the DB-6 / F-006 / API-9 contract test:
 * no response from a content or practice GET endpoint carries an answer, solution, marking scheme or
 * rubric — checked by key name and by the key-side text itself.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { decks, notes, questionKeys, questions } from '@soyl/db';
import { shuffleForOrdering } from '../src/domain/content';
import { createHarness, type Harness } from './helpers';
import { seedRealContent, type ReleaseFile } from './content-fixture';

let h: Harness;
let releases: ReleaseFile[];

beforeAll(async () => {
  h = await createHarness();
  releases = await seedRealContent(h.t);
});
afterAll(async () => {
  await h?.close();
});

/** Keys that only exist on the answer side (DB-6, API-9). */
export const FORBIDDEN_KEYS = new Set([
  'answer',
  'answers',
  'solution',
  'solution_md',
  'solutionMd',
  'marking_scheme',
  'markingScheme',
  'rubric',
  'childKeys',
  'child_keys',
  'model_answer_md',
  'accepted',
  'option_ids',
  'correct',
  'explanation',
]);

export function forbiddenKeyPaths(value: unknown, path = '$'): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => forbiddenKeyPaths(v, `${path}[${i}]`));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => [...(FORBIDDEN_KEYS.has(k) ? [`${path}.${k}`] : []), ...forbiddenKeyPaths(v, `${path}.${k}`)]);
  return [];
}

/** Long key-side strings (worked solutions, model answers) of a chapter: none may appear in a GET body. */
async function keyTexts(unit: string): Promise<string[]> {
  const rows = await h.t.db.select({ k: questionKeys }).from(questionKeys).innerJoin(questions, eq(questions.id, questionKeys.questionId)).where(eq(questions.unit, unit));
  const out: string[] = [];
  for (const { k } of rows) {
    out.push(k.solutionMd);
    const a = k.answer as { model_answer_md?: string };
    if (a.model_answer_md) out.push(a.model_answer_md);
    for (const c of k.childKeys as { solution_md: string; alternatives?: { solution_md: string }[] }[]) {
      out.push(c.solution_md);
      for (const alt of c.alternatives ?? []) out.push(alt.solution_md);
    }
  }
  return out.filter((s) => s.length >= 60);
}

describe('chapter hub', () => {
  it('lists the chapter, subject and every available asset with counts', async () => {
    const res = await h.client().get('/v1/chapters/cbse-10-science-ch01');
    expect(res.statusCode).toBe(200);
    const hub = res.json();
    const sci = releases.find((r) => r.release.unit === 'cbse-10-science-ch01')!.release;
    expect(hub.chapter).toMatchObject({ id: 'cbse-10-science-ch01', number: 1 });
    expect(hub.chapter.topics.length).toBeGreaterThan(0);
    expect(hub.subject).toMatchObject({ id: 'cbse-10-science', board: 'cbse', exam: 'cbse', classLevel: 10 });
    expect(hub.assets.lesson.parts.map((p: { part: number; slideCount: number }) => [p.part, p.slideCount])).toEqual(sci.decks.map((d) => [d.part ?? 0, d.slides.length]));
    expect(hub.assets.lesson.parts[0].reviewStatus).toBe('beta');
    expect(hub.assets.notes).toMatchObject({ available: true, sections: sci.notes.sections.length });
    expect(hub.assets.flashcards).toMatchObject({ available: true, count: sci.flashcards.cards.length });
    expect(hub.assets.practice.count).toBe(sci.questions.length);
    expect(Object.values(hub.assets.practice.byType).reduce((a: number, b) => a + (b as number), 0)).toBe(sci.questions.length);
    expect(hub.assets.tests.count).toBe(2);
    expect(hub.assets.tests.items[0]).toMatchObject({ kind: 'chapter' });
  });

  it('a single-deck chapter reports part 0', async () => {
    const hub = (await h.client().get('/v1/chapters/cbse-10-hindi-a-ch10')).json();
    expect(hub.assets.lesson.parts.map((p: { part: number }) => p.part)).toEqual([0]);
    expect(hub.subject.script).toBe('Deva');
  });

  it('a catalog chapter without content says so; unknown or malformed ids are 404/400', async () => {
    const empty = await h.client().get('/v1/chapters/cbse-10-science-ch13');
    expect(empty.statusCode).toBe(200);
    expect(empty.json().assets).toMatchObject({ lesson: { available: false }, notes: { available: false }, practice: { available: false, count: 0 } });
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch99')).statusCode).toBe(404);
    expect((await h.client().get('/v1/chapters/not-a-chapter')).statusCode).toBe(400);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch13/notes')).statusCode).toBe(404);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch13/deck')).statusCode).toBe(404);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch13/flashcards')).statusCode).toBe(404);
  });
});

describe('deck, notes, flashcards', () => {
  it('serves each deck part with slides and check-slide question stems', async () => {
    const sci = releases.find((r) => r.release.unit === 'cbse-10-science-ch01')!.release;
    for (const d of sci.decks) {
      const res = await h.client().get(`/v1/chapters/cbse-10-science-ch01/deck?part=${d.part}`);
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.slides.map((s: { id: string }) => s.id)).toEqual(d.slides.map((s) => s.id));
      expect(body.goals).toEqual(d.goals);
      const checks = d.slides.map((s) => s.check_question_id).filter(Boolean);
      expect(body.checkQuestions.map((q: { id: string }) => q.id).sort()).toEqual([...new Set(checks)].sort());
      for (const q of body.checkQuestions) expect(q.stem_md.length).toBeGreaterThan(0);
    }
    const first = (await h.client().get('/v1/chapters/cbse-10-science-ch01/deck')).json();
    expect(first.part).toBe(1);
    expect(first.parts).toHaveLength(2);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch01/deck?part=7')).statusCode).toBe(404);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch01/deck?part=x')).statusCode).toBe(400);
    expect((await h.client().get('/v1/chapters/cbse-10-science-ch01/deck?part=1&extra=1')).statusCode).toBe(400);
  });

  it('serves notes and flashcards as authored', async () => {
    const sci = releases.find((r) => r.release.unit === 'cbse-10-science-ch01')!.release;
    const n = (await h.client().get('/v1/chapters/cbse-10-science-ch01/notes')).json();
    expect(n.title).toBe(sci.notes.title);
    expect(n.sections.map((s: { heading: string }) => s.heading)).toEqual(sci.notes.sections.map((s) => s.heading));
    expect(n.exam_tips_md).toBe(sci.notes.exam_tips_md);
    const f = (await h.client().get('/v1/chapters/cbse-10-science-ch01/flashcards')).json();
    expect(f.cards.map((c: { id: string; back_md: string }) => [c.id, c.back_md])).toEqual(sci.flashcards.cards.map((c) => [c.id, c.back_md]));
  });

  it('only published/reviewed current versions are visible (§7.3)', async () => {
    const [n] = await h.t.db.select().from(notes).where(eq(notes.unit, 'cbse-10-mathematics-ch02'));
    await h.t.db.update(notes).set({ status: 'draft' }).where(eq(notes.id, n!.id));
    expect((await h.client().get('/v1/chapters/cbse-10-mathematics-ch02/notes')).statusCode).toBe(404);
    expect((await h.client().get('/v1/chapters/cbse-10-mathematics-ch02')).json().assets.notes.available).toBe(false);
    await h.t.db.update(notes).set({ status: 'reviewed' }).where(eq(notes.id, n!.id));
    const reviewed = (await h.client().get('/v1/chapters/cbse-10-mathematics-ch02/notes')).json();
    expect(reviewed.reviewStatus).toBe('reviewed');
    await h.t.db.update(notes).set({ status: 'flagged' }).where(eq(notes.id, n!.id));
    expect((await h.client().get('/v1/chapters/cbse-10-mathematics-ch02/notes')).statusCode).toBe(404);
    await h.t.db.update(notes).set({ status: 'published' }).where(eq(notes.id, n!.id));

    const [d] = await h.t.db.select().from(decks).where(and(eq(decks.unit, 'cbse-10-mathematics-ch02'), eq(decks.part, 2)));
    await h.t.db.update(decks).set({ status: 'retired' }).where(eq(decks.id, d!.id));
    expect((await h.client().get('/v1/chapters/cbse-10-mathematics-ch02/deck?part=2')).statusCode).toBe(404);
    await h.t.db.update(decks).set({ status: 'published' }).where(eq(decks.id, d!.id));
  });
});

describe('caching (ADR-010)', () => {
  it('guests get a public, ETagged response and 304 on revalidation', async () => {
    for (const path of ['/v1/chapters/cbse-10-science-ch01', '/v1/chapters/cbse-10-science-ch01/deck?part=1', '/v1/chapters/cbse-10-science-ch01/notes', '/v1/chapters/cbse-10-science-ch01/flashcards']) {
      const c = h.client();
      const res = await c.get(path);
      expect(res.headers['cache-control'], path).toBe('public, max-age=120, s-maxage=600, stale-while-revalidate=3600');
      const etag = String(res.headers.etag);
      expect(etag).toMatch(/^"[A-Za-z0-9_-]{27}"$/);
      const again = await c.get(path, { headers: { 'if-none-match': etag } });
      expect(again.statusCode).toBe(304);
      expect(again.body).toBe('');
      expect((await c.get(path, { headers: { 'if-none-match': `W/${etag}, "other"` } })).statusCode).toBe(304);
      expect((await c.get(path, { headers: { 'if-none-match': '"stale"' } })).statusCode).toBe(200);
    }
  });

  it('signed-in readers get the same body with a private cache policy; never public', async () => {
    const guest = await h.client().get('/v1/chapters/cbse-10-science-ch01/notes');
    const c = h.client();
    await c.signInEmail('reader@example.com');
    const res = await c.get('/v1/chapters/cbse-10-science-ch01/notes');
    expect(res.body).toBe(guest.body);
    expect(res.headers.etag).toBe(guest.headers.etag);
    expect(res.headers['cache-control']).toBe('private, max-age=60, stale-while-revalidate=600');
  });

  it('a response that refreshes the session cookie is no-store', async () => {
    const c = h.client();
    await c.signInEmail('roller@example.com');
    h.clock.advance(25 * 3600_000); // past the member roll interval: this request re-issues the cookie
    const res = await c.get('/v1/chapters/cbse-10-science-ch01/flashcards');
    expect(res.headers['set-cookie']).toBeTruthy();
    expect(res.headers['cache-control']).toBe('no-store');
  });
});

describe('DB-6 / F-006 contract: no answers in content or practice GET responses', () => {
  it('scans every chapter: hub, every deck part, notes, flashcards and every practice page (guest and member)', async () => {
    const member = h.client();
    await member.signInEmail('scanner@example.com');
    let scanned = 0;
    for (const { release } of releases) {
      const unit = release.unit;
      const secrets = await keyTexts(unit);
      const bodies: string[] = [];
      bodies.push((await h.client().get(`/v1/chapters/${unit}`)).body);
      for (const d of release.decks) bodies.push((await h.client().get(`/v1/chapters/${unit}/deck?part=${d.part ?? 0}`)).body);
      bodies.push((await h.client().get(`/v1/chapters/${unit}/notes`)).body);
      bodies.push((await h.client().get(`/v1/chapters/${unit}/flashcards`)).body);
      for (const client of [h.client(), member]) {
        let cursor: string | null = null;
        let seen = 0;
        do {
          const res = await client.get(`/v1/chapters/${unit}/practice?limit=25${cursor ? `&cursor=${cursor}` : ''}`);
          expect(res.statusCode).toBe(200);
          bodies.push(res.body);
          const page = res.json();
          seen += page.items.length;
          cursor = page.nextCursor;
        } while (cursor);
        expect(seen, unit).toBe(release.questions.length);
      }
      for (const body of bodies) {
        expect(forbiddenKeyPaths(JSON.parse(body)), unit).toEqual([]);
        for (const s of secrets) expect(body.includes(s), `${unit}: key-side text leaked`).toBe(false);
        scanned++;
      }
    }
    expect(scanned).toBeGreaterThan(releases.length * 6);
  });

  it('internal-choice alternatives are served as stems only', async () => {
    const maths = releases.find((r) => r.release.questions.some((q) => q.children.some((c) => c.alternatives.length)))!.release;
    const withAlt = maths.questions.find((q) => q.children.some((c) => c.alternatives.length))!;
    let cursor: string | null = null;
    let found: { children: { alternatives: Record<string, unknown>[] }[] } | undefined;
    type Page = { items: { question: { id: string; children: { alternatives: Record<string, unknown>[] }[] } }[]; nextCursor: string | null };
    do {
      const page: Page = (await h.client().get(`/v1/chapters/${maths.unit}/practice?limit=25&type=case-based${cursor ? `&cursor=${cursor}` : ''}`)).json();
      found = page.items.map((i) => i.question).find((q) => q.id === withAlt.id) ?? found;
      cursor = page.nextCursor;
    } while (cursor);
    const alt = found!.children.flatMap((c) => c.alternatives)[0]!;
    expect(Object.keys(alt).sort()).toEqual(['assets', 'id', 'marks', 'match_right', 'objective', 'options', 'stem_md', 'type'].sort());
  });
});

describe('ordering items are never served in answer order', () => {
  it('shuffles deterministically and never returns the identity order', () => {
    const items = ['a', 'b', 'c', 'd'].map((id) => ({ id, text_md: id.toUpperCase() }));
    const once = shuffleForOrdering('q_x_0001', items);
    expect(shuffleForOrdering('q_x_0001', items)).toEqual(once);
    expect(once.map((o) => o.id)).not.toEqual(['a', 'b', 'c', 'd']);
    expect([...once].map((o) => o.id).sort()).toEqual(['a', 'b', 'c', 'd']);
    for (let i = 0; i < 200; i++) expect(shuffleForOrdering(`q_k_${i}`, items.slice(0, 2)).map((o) => o.id)).toEqual(['b', 'a']);
    expect(shuffleForOrdering('q', [items[0]!])).toEqual([items[0]]);
  });
});

describe('reads go through the active release (ADR-006): publish v2, then roll back to v1', () => {
  it('serves v2 while active and v1 again after rollback, including items v2 removed', async () => {
    const { activateRelease, ingestChapterRelease, contentReleases } = await import('@soyl/db');
    const unit = 'cbse-10-mathematics-ch03';
    const v1 = releases.find((r) => r.release.unit === unit)!.release;
    const pub = <T extends { status?: string }>(x: T): T => ({ ...x, status: 'published' });
    const [changed, removed, ...rest] = v1.questions;
    const v2 = {
      ...v1,
      version: 2,
      decks: v1.decks.map(pub),
      notes: { ...pub(v1.notes), version: 2, title: `${v1.notes.title} (revised)` },
      flashcards: pub(v1.flashcards),
      questions: [{ ...pub(changed!), version: 2, stem_md: `${changed!.stem_md} (revised)` }, ...rest.map(pub)],
    };
    const r2 = await ingestChapterRelease(h.t.db, v2);
    const notesTitle = async () => (await h.client().get(`/v1/chapters/${unit}/notes`)).json().title;
    const stems = async () => {
      const out = new Map<string, string>();
      let cursor: string | null = null;
      do {
        const p: { items: { question: { id: string; stem_md: string } }[]; nextCursor: string | null } = (await h.client().get(`/v1/chapters/${unit}/practice?limit=25${cursor ? `&cursor=${cursor}` : ''}`)).json();
        for (const i of p.items) out.set(i.question.id, i.question.stem_md);
        cursor = p.nextCursor;
      } while (cursor);
      return out;
    };
    expect(await notesTitle()).toBe(`${v1.notes.title} (revised)`);
    let s = await stems();
    expect(s.get(changed!.id)).toBe(`${changed!.stem_md} (revised)`);
    expect(s.has(removed!.id)).toBe(false);
    expect((await h.client().post('/v1/practice/answers', { questionId: removed!.id, response: { text: '' } })).statusCode).toBe(404);

    const [rel1] = await h.t.db.select().from(contentReleases).where(and(eq(contentReleases.unit, unit), eq(contentReleases.version, 1)));
    await activateRelease(h.t.db, rel1!.id);
    expect(await notesTitle()).toBe(v1.notes.title);
    s = await stems();
    expect(s.get(changed!.id)).toBe(changed!.stem_md);
    expect(s.has(removed!.id)).toBe(true);
    const graded = await h.client().post('/v1/practice/answers', { questionId: changed!.id, response: { text: '' } });
    expect([200, 400]).toContain(graded.statusCode);
    if (graded.statusCode === 200) expect(graded.json().version).toBe(1);

    await activateRelease(h.t.db, r2.releaseId);
    expect(await notesTitle()).toBe(`${v1.notes.title} (revised)`);
  });
});
