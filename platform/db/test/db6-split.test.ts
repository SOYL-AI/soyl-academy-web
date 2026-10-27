/**
 * DB-6 / F-006 regression (backend-api M2 finding): answers, solutions, marking schemes and rubrics
 * must never be stored in `questions.body` — including inside case/source children's internal-choice
 * `alternatives` — and split → join must give back the original question exactly.
 *
 * Ingests every real release (platform/content/authored + platform/content-templates/exemplars).
 */
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, inArray } from 'drizzle-orm';
import { ChapterRelease } from '@soyl/shared/content/release';
import { Question } from '@soyl/shared/content/question';
import { createTestDb, type TestDb } from '../src/testing';
import { seedCatalog } from '../src/seed/catalog';
import { canonicalJson, ingestChapterRelease } from '../src/content-ingest';
import { findKeySideFields, joinQuestion, splitQuestion } from '../src/student-questions';
import { questionKeys, questions, studentQuestions } from '../schema/index';

const PLATFORM = path.join(import.meta.dirname, '..', '..');

function releaseFiles(): string[] {
  const out: string[] = [];
  for (const root of [path.join(PLATFORM, 'content', 'authored'), path.join(PLATFORM, 'content-templates', 'exemplars')]) {
    if (!fs.existsSync(root)) continue;
    for (const family of fs.readdirSync(root))
      for (const unit of fs.existsSync(path.join(root, family)) && fs.statSync(path.join(root, family)).isDirectory() ? fs.readdirSync(path.join(root, family)) : []) {
        const f = path.join(root, family, unit, 'release.json');
        if (fs.existsSync(f)) out.push(f);
      }
  }
  return out.sort();
}

const files = releaseFiles();
const releases = files.map((f) => ChapterRelease.parse(JSON.parse(fs.readFileSync(f, 'utf8'))));
const withoutProvenance = (q: Question) => {
  const { provenance: _p, ...rest } = q;
  return rest;
};

/** A case-based question whose child has an internal-choice alternative (the shape that leaked). */
const caseWithAlternative = Question.parse({
  id: 'q_unit_split_0001',
  unit: 'cbse-10-science-ch01',
  type: 'case-based',
  stem_md: 'Read the case and answer.',
  passage_md: 'A passage written by SOYL.',
  passage_origin: 'soyl-original',
  answer: { model_answer_md: 'See parts.' },
  solution_md: 'Parts below.',
  marking_scheme: [{ step: 'parts', marks: 3 }],
  marks: 3,
  difficulty: 3,
  competency: 'application',
  bloom: 'apply',
  topic_ids: ['cbse-10-science-ch01-t01'],
  expected_time_sec: 300,
  children: [
    {
      id: 'a',
      type: 'mcq',
      stem_md: 'Pick one.',
      options: [
        { id: 'p', text_md: 'P' },
        { id: 'q', text_md: 'Q' },
        { id: 'r', text_md: 'R' },
      ],
      answer: { option_ids: ['q'] },
      solution_md: 'Q because.',
      marking_scheme: [{ step: 'choice', marks: 1 }],
      marks: 1,
      difficulty: 2,
      competency: 'recall',
      bloom: 'remember',
      topic_ids: ['cbse-10-science-ch01-t01'],
      expected_time_sec: 30,
    },
    {
      id: 'b',
      type: 'short',
      stem_md: 'Explain.',
      answer: { model_answer_md: 'Because of X.' },
      solution_md: 'X.',
      marking_scheme: [{ step: 'reason', marks: 2 }],
      marks: 2,
      difficulty: 3,
      competency: 'understanding',
      bloom: 'understand',
      topic_ids: ['cbse-10-science-ch01-t01'],
      expected_time_sec: 120,
      alternatives: [
        {
          id: 'b-alt',
          type: 'numerical',
          stem_md: 'Compute.',
          answer: { value: 4.2, tolerance: 0.1, unit: 'g' },
          solution_md: 'Secret worked solution.',
          marking_scheme: [{ step: 'formula', marks: 1 }, { step: 'value', marks: 1 }],
          marks: 2,
          difficulty: 3,
          competency: 'application',
          bloom: 'apply',
          topic_ids: ['cbse-10-science-ch01-t01'],
          expected_time_sec: 120,
        },
      ],
    },
  ],
  status: 'published',
});

describe('splitQuestion / joinQuestion (unit)', () => {
  it('strips key fields from children and their alternatives, and keeps them in childKeys', () => {
    const { body, key } = splitQuestion(caseWithAlternative);
    expect(findKeySideFields(body)).toEqual([]);
    expect(JSON.stringify(body)).not.toContain('Secret worked solution');
    expect(body.children[1]!.alternatives[0]).toMatchObject({ id: 'b-alt', stem_md: 'Compute.' });
    expect(key.childKeys[1]!.alternatives![0]).toEqual({
      id: 'b-alt',
      answer: { value: 4.2, tolerance: 0.1, unit: 'g' },
      solution_md: 'Secret worked solution.',
      marking_scheme: [{ step: 'formula', marks: 1 }, { step: 'value', marks: 1 }],
    });
    expect(key.childKeys[0]!.alternatives).toBeUndefined();
  });

  it('findKeySideFields reports every nested key-side field', () => {
    expect(findKeySideFields({ a: [{ answer: 1 }, { b: { rubric: [] } }], solution_md: 'x' }).sort()).toEqual(['$.a[0].answer', '$.a[1].b.rubric', '$.solution_md']);
  });
});

describe.skipIf(!releases.length)('every authored and exemplar release (DB-6 deep scan + round trip)', () => {
  let t: TestDb;

  beforeAll(async () => {
    t = await createTestDb();
    await seedCatalog(t.db);
    for (const r of releases) await ingestChapterRelease(t.db, r);
    // Ingesting every authored release grows with the content (99 chapters ≈ 2.5 min on a loaded machine), so the
    // budget scales with the number of releases instead of using the package's fixed 180 s hook timeout.
  }, Math.max(180_000, releases.length * 4_000));
  afterAll(async () => {
    await t?.close();
  });

  it(`covers the real releases (${files.length} files), including ones with internal-choice alternatives`, () => {
    expect(releases.length).toBeGreaterThanOrEqual(8);
    const alternatives = releases.flatMap((r) => r.questions.flatMap((q) => q.children.flatMap((c) => c.alternatives)));
    expect(alternatives.length).toBeGreaterThan(0);
  });

  it('no key-side field anywhere in questions.body', async () => {
    const rows = await t.db.select({ key: questions.key, body: questions.body }).from(questions);
    expect(rows.length).toBe(releases.reduce((n, r) => n + r.questions.length, 0));
    const leaks = rows.flatMap((r) => findKeySideFields(r.body).map((p) => `${r.key} ${p}`));
    expect(leaks).toEqual([]);
  });

  it('no key-side field anywhere in the student_questions view (published rows)', async () => {
    await t.db.update(questions).set({ status: 'published' });
    const rows = await t.db.select().from(studentQuestions);
    expect(rows.length).toBeGreaterThan(0);
    const leaks = rows.flatMap((r) => findKeySideFields(r).map((p) => `${r.key} ${p}`));
    expect(leaks).toEqual([]);
    await t.db.update(questions).set({ status: 'draft' });
  });

  it('split → join round-trips every question exactly (provenance lives in row columns)', async () => {
    const rows = await t.db.select({ q: questions, k: questionKeys }).from(questions).innerJoin(questionKeys, eq(questionKeys.questionId, questions.id));
    const byKey = new Map(rows.map((r) => [`${r.q.key}@${r.q.version}`, r]));
    let checked = 0;
    for (const release of releases)
      for (const q of release.questions) {
        const row = byKey.get(`${q.id}@${q.version}`)!;
        const joined = joinQuestion(row.q, row.k);
        expect(joined, q.id).toStrictEqual(withoutProvenance(q));
        expect(canonicalJson(joined), q.id).toBe(canonicalJson(withoutProvenance(q)));
        expect(row.q.origin).toBe(q.provenance?.origin ?? 'pipeline');
        checked++;
      }
    expect(checked).toBe(rows.length);
  });

  it('re-ingesting a release repairs rows stored with the old split (keys inside body alternatives)', async () => {
    const release = releases.find((r) => r.questions.some((q) => q.children.some((c) => c.alternatives.length)))!;
    const target = release.questions.find((q) => q.children.some((c) => c.alternatives.length))!;
    const [row] = await t.db.select({ id: questions.id }).from(questions).where(eq(questions.key, target.id));
    // What the pre-fix splitQuestion stored: alternatives with their keys in the body, no alternative keys.
    const legacyBody = {
      ...splitQuestion(target).body,
      children: target.children.map(({ answer: _a, solution_md: _s, marking_scheme: _m, rubric: _r, ...rest }) => rest),
    };
    const legacyChildKeys = target.children.map((c) => ({ id: c.id, answer: c.answer, solution_md: c.solution_md, marking_scheme: c.marking_scheme }));
    await t.db.update(questions).set({ body: legacyBody }).where(eq(questions.id, row!.id));
    await t.db.update(questionKeys).set({ childKeys: legacyChildKeys }).where(eq(questionKeys.questionId, row!.id));
    expect(findKeySideFields((await t.db.select({ body: questions.body }).from(questions).where(eq(questions.id, row!.id)))[0]!.body).length).toBeGreaterThan(0);

    const again = await ingestChapterRelease(t.db, release);
    expect(again.alreadyIngested).toBe(true);
    expect(again.repaired.questions).toBe(1);

    const [fixed] = await t.db.select({ q: questions, k: questionKeys }).from(questions).innerJoin(questionKeys, eq(questionKeys.questionId, questions.id)).where(eq(questions.id, row!.id));
    expect(findKeySideFields(fixed!.q.body)).toEqual([]);
    expect(joinQuestion(fixed!.q, fixed!.k)).toStrictEqual(withoutProvenance(target));

    // A second re-ingest finds nothing to repair (jsonb key order does not count as a difference).
    expect((await ingestChapterRelease(t.db, release)).repaired.questions).toBe(0);
    const keys = release.questions.map((q) => q.id);
    expect((await t.db.select({ id: questions.id }).from(questions).where(inArray(questions.key, keys))).length).toBe(keys.length);
  });
});

describe.skipIf(!releases.length)('release membership (content_release_items, migration 0006)', () => {
  it('records exactly the item rows of each release, also on re-ingest, and keeps them per release for rollback', async () => {
    const { contentReleaseItems, contentReleases } = await import('../schema/index');
    const t = await createTestDb();
    try {
      await seedCatalog(t.db);
      const r = releases[0]!;
      const a = await ingestChapterRelease(t.db, r);
      const expected = r.decks.length + 2 + r.questions.length;
      const count = async (releaseId: string) => (await t.db.select().from(contentReleaseItems).where(eq(contentReleaseItems.releaseId, releaseId))).length;
      expect(await count(a.releaseId)).toBe(expected);
      await t.db.delete(contentReleaseItems).where(eq(contentReleaseItems.releaseId, a.releaseId));
      await ingestChapterRelease(t.db, r);
      expect(await count(a.releaseId)).toBe(expected);
      // v2 drops one question: v1 keeps its membership, v2 has one fewer.
      const v2 = { ...r, version: 2, questions: r.questions.slice(1) };
      const b = await ingestChapterRelease(t.db, v2);
      expect(await count(b.releaseId)).toBe(expected - 1);
      expect(await count(a.releaseId)).toBe(expected);
      const [rel] = await t.db.select().from(contentReleases).where(eq(contentReleases.id, b.releaseId));
      expect(rel!.status).toBe('active');
    } finally {
      await t.close();
    }
  });
});
