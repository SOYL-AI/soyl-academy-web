/**
 * The content tables store the shared contract: the hand-authored CBSE 10 Science ch01 exemplar
 * release (platform/content-templates) round-trips through decks/notes/flashcard_sets/questions +
 * question_keys, and its chapter tests reference exact question versions.
 */
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { ChapterRelease } from '@soyl/shared/content/release';
import { TestDefinition } from '@soyl/shared/content/test';
import { createTestDb, type TestDb } from '../src/testing';
import { seedCatalog } from '../src/seed/catalog';
import { activateRelease, ingestChapterRelease, ingestTestDefinition } from '../src/content-ingest';
import { joinQuestion } from '../src/student-questions';
import { contentReleases, decks, flashcardSets, notes, questionKeys, questions, studentQuestions, testItems, tests } from '../schema/index';

const EXEMPLAR = path.join(import.meta.dirname, '..', '..', 'content-templates', 'exemplars', 'science', 'cbse-10-science-ch01');
const hasExemplar = fs.existsSync(path.join(EXEMPLAR, 'release.json'));

describe.skipIf(!hasExemplar)('ingesting the CBSE 10 Science ch01 exemplar', () => {
  let t: TestDb;
  const release = hasExemplar ? ChapterRelease.parse(JSON.parse(fs.readFileSync(path.join(EXEMPLAR, 'release.json'), 'utf8'))) : (null as never);
  const testDefs = hasExemplar
    ? (JSON.parse(fs.readFileSync(path.join(EXEMPLAR, 'tests.json'), 'utf8')) as { tests: unknown[] }).tests.map((x) => TestDefinition.parse(x))
    : [];

  beforeAll(async () => {
    t = await createTestDb();
    await seedCatalog(t.db);
  });
  afterAll(async () => {
    await t?.close();
  });

  it('stores every item and round-trips each question through questions + question_keys', async () => {
    const r = await ingestChapterRelease(t.db, release);
    expect(r.inserted).toEqual({ decks: release.decks.length, notes: 1, flashcardSets: 1, questions: release.questions.length });

    const deckRows = await t.db.select().from(decks).where(eq(decks.unit, release.unit));
    expect(deckRows.map((d) => d.body)).toEqual(release.decks);
    expect((await t.db.select().from(notes).where(eq(notes.unit, release.unit)))[0]!.body).toEqual(release.notes);
    expect((await t.db.select().from(flashcardSets).where(eq(flashcardSets.unit, release.unit)))[0]!.body).toEqual(release.flashcards);

    const rows = await t.db
      .select({ q: questions, k: questionKeys })
      .from(questions)
      .innerJoin(questionKeys, eq(questionKeys.questionId, questions.id))
      .where(eq(questions.unit, release.unit));
    expect(rows).toHaveLength(release.questions.length);
    const byKey = new Map(rows.map((r) => [r.q.key, r]));
    for (const q of release.questions) {
      const row = byKey.get(q.id)!;
      const { provenance: _p, ...expected } = q;
      expect(joinQuestion(row.q, row.k), q.id).toEqual(expected);
      expect(JSON.stringify(row.q.body)).not.toContain('"solution_md"');
    }

    const [rel] = await t.db.select().from(contentReleases).where(eq(contentReleases.id, r.releaseId));
    expect(rel).toMatchObject({ status: 'active', version: release.version, blobKey: `content/releases/${release.unit}/${release.version}.json` });
  });

  it('shows students nothing until the content is published', async () => {
    const visible = await t.db.select({ id: studentQuestions.id }).from(studentQuestions).where(eq(studentQuestions.unit, release.unit));
    expect(release.questions.every((q) => q.status === 'draft')).toBe(true);
    expect(visible).toHaveLength(0);
    await t.db.update(questions).set({ status: 'published' }).where(eq(questions.unit, release.unit));
    const after = await t.db.select({ id: studentQuestions.id }).from(studentQuestions).where(eq(studentQuestions.unit, release.unit));
    expect(after).toHaveLength(release.questions.length);
  });

  it('is idempotent and refuses a changed payload under the same version', async () => {
    const again = await ingestChapterRelease(t.db, release);
    expect(again.alreadyIngested).toBe(true);
    const changed = { ...release, notes: { ...release.notes, title: `${release.notes.title} (edited)` } };
    await expect(ingestChapterRelease(t.db, changed)).rejects.toThrow(/immutable/);
  });

  it('stores the chapter tests against exact question versions', async () => {
    expect(testDefs.length).toBe(2);
    for (const def of testDefs) {
      const r = await ingestTestDefinition(t.db, def, { academicYear: release.academic_year, status: 'published' });
      const expectedItems = def.sections.reduce((n, s) => n + s.items.length, 0);
      expect(r.items).toBe(expectedItems);
      const items = await t.db
        .select({ key: questions.key, version: questions.version, section: testItems.sectionId, group: testItems.choiceGroup })
        .from(testItems)
        .innerJoin(questions, eq(questions.id, testItems.questionId))
        .where(eq(testItems.testId, r.testId))
        .orderBy(testItems.position);
      expect(items.map((i) => [i.key, i.version, i.section, i.group])).toEqual(
        def.sections.flatMap((s) => s.items.map((it) => [it.question_id, it.question_version, s.id, it.choice_group])),
      );
      expect((await ingestTestDefinition(t.db, def, { academicYear: release.academic_year })).alreadyIngested).toBe(true);
    }
    expect(await t.db.select().from(tests)).toHaveLength(2);
  });

  it('keeps old versions for past tests when a question is edited, and supports rollback', async () => {
    const q0 = release.questions[0]!;
    const v2 = { ...release, version: release.version + 1, questions: [{ ...q0, version: 2, stem_md: `${q0.stem_md} (revised)` }, ...release.questions.slice(1)] };
    const r2 = await ingestChapterRelease(t.db, v2);
    expect(r2.inserted).toEqual({ decks: 0, notes: 0, flashcardSets: 0, questions: 1 });
    const versions = await t.db.select({ v: questions.version, cur: questions.isCurrent }).from(questions).where(eq(questions.key, q0.id)).orderBy(questions.version);
    expect(versions).toEqual([
      { v: 1, cur: false },
      { v: 2, cur: true },
    ]);
    const statuses = async () =>
      (await t.db.select({ v: contentReleases.version, s: contentReleases.status }).from(contentReleases).where(eq(contentReleases.unit, release.unit)).orderBy(contentReleases.version)).map((r) => r.s);
    expect(await statuses()).toEqual(['superseded', 'active']);
    const [first] = await t.db.select({ id: contentReleases.id }).from(contentReleases).where(and(eq(contentReleases.unit, release.unit), eq(contentReleases.version, release.version)));
    await activateRelease(t.db, first!.id);
    expect(await statuses()).toEqual(['active', 'rolled_back']);
    const active = await t.db.select({ n: sql<number>`count(*)::int` }).from(contentReleases).where(eq(contentReleases.status, 'active'));
    expect(active[0]!.n).toBe(1);
  });
});
