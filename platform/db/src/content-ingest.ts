/**
 * Reference ingestion of content releases and test definitions (ARCHITECTURE §7.3–7.4, §8 stage 9).
 * The pipeline's publish stage and admin tools can call these instead of writing rows by hand, so the
 * DB-6 split and the versioning rules are applied in one place.
 *
 * - A release (`unit@version`) is immutable: ingesting the same release twice is a no-op; a different
 *   payload under an existing version is rejected.
 * - Items whose (unit, part, version) or (question key, version) already exist are left untouched (the
 *   release re-uses them); new versions become `is_current` and the previous version is un-flagged.
 * - Test definitions reference exact question version rows (D-023).
 */
import { createHash } from 'node:crypto';
import { and, eq, isNull, ne, sql } from 'drizzle-orm';
import type { ChapterRelease } from '@soyl/shared/content/release';
import { releaseBlobKey } from '@soyl/shared/content/release';
import type { TestDefinition } from '@soyl/shared/content/test';
import type { Question } from '@soyl/shared/content/question';
import type { Database } from './client';
import { questionRow, splitQuestion } from './student-questions';
import {
  chapters,
  contentReleases,
  decks,
  flashcardSets,
  notes,
  questionKeys,
  questions,
  subjects,
  testItems,
  tests,
  type QuestionPool,
} from '../schema/index';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];

export const sha256Json = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex');

export interface IngestReleaseOptions {
  /** Blob key of the release JSON (default content/releases/{unit}/{version}.json). */
  blobKey?: string;
  /** sha256 of the release blob (default: of the JSON payload). */
  sha256?: string;
  /** Make this the unit's active release (rollback = activate an older one). Default true. */
  activate?: boolean;
  /** Pool per question (DB-6/F-006). Default 'practice'. */
  poolFor?: (q: Question) => QuestionPool;
  /** Embargo for live_reserved items. */
  embargoFor?: (q: Question) => Date | null;
}

export interface IngestReleaseResult {
  releaseId: string;
  alreadyIngested: boolean;
  inserted: { decks: number; notes: number; flashcardSets: number; questions: number };
}

function provenance(p: { origin: string; template_version: string | null; model: string | null } | undefined) {
  return { origin: p?.origin ?? 'pipeline', templateVersion: p?.template_version ?? null, model: p?.model ?? null };
}

export async function ingestChapterRelease(db: Database, release: ChapterRelease, opts: IngestReleaseOptions = {}): Promise<IngestReleaseResult> {
  const year = release.academic_year;
  const sha = opts.sha256 ?? sha256Json(release);
  return db.transaction(async (tx) => {
    const [chapter] = await tx
      .select({ id: chapters.id })
      .from(chapters)
      .where(and(eq(chapters.key, release.unit), eq(chapters.academicYear, year)));
    if (!chapter) throw new Error(`chapter ${release.unit} (${year}) is not in the catalog; run seed catalog first`);

    const [existing] = await tx
      .select()
      .from(contentReleases)
      .where(and(eq(contentReleases.unit, release.unit), eq(contentReleases.academicYear, year), eq(contentReleases.version, release.version)));
    if (existing) {
      if (existing.sha256 !== sha) throw new Error(`release ${release.unit}@${release.version} already exists with different content (releases are immutable)`);
      return { releaseId: existing.id, alreadyIngested: true, inserted: { decks: 0, notes: 0, flashcardSets: 0, questions: 0 } };
    }

    const [rel] = await tx
      .insert(contentReleases)
      .values({
        unit: release.unit,
        chapterId: chapter.id,
        academicYear: year,
        version: release.version,
        blobKey: opts.blobKey ?? releaseBlobKey(release.unit, release.version),
        sha256: sha,
        buildRunId: release.build.run_id,
        checks: release.build.checks,
      })
      .returning({ id: contentReleases.id });
    const releaseId = rel!.id;
    const base = { unit: release.unit, chapterId: chapter.id, academicYear: year, releaseId };
    const inserted = { decks: 0, notes: 0, flashcardSets: 0, questions: 0 };

    for (const d of release.decks) {
      const partCond = d.part === null ? isNull(decks.part) : eq(decks.part, d.part);
      const scope = and(eq(decks.unit, release.unit), eq(decks.academicYear, year), partCond);
      if ((await tx.select({ id: decks.id }).from(decks).where(and(scope, eq(decks.version, d.version)))).length) continue;
      await tx.update(decks).set({ isCurrent: false }).where(and(scope, eq(decks.isCurrent, true)));
      await tx.insert(decks).values({
        ...base,
        ...provenance(d.provenance),
        version: d.version,
        status: d.status,
        language: d.language,
        part: d.part,
        title: d.title,
        slideCount: d.slides.length,
        body: d,
        contentHash: sha256Json(d),
      });
      inserted.decks++;
    }

    const n = release.notes;
    const notesScope = and(eq(notes.unit, release.unit), eq(notes.academicYear, year));
    if (!(await tx.select({ id: notes.id }).from(notes).where(and(notesScope, eq(notes.version, n.version)))).length) {
      await tx.update(notes).set({ isCurrent: false }).where(and(notesScope, eq(notes.isCurrent, true)));
      await tx.insert(notes).values({ ...base, ...provenance(n.provenance), version: n.version, status: n.status, language: n.language, title: n.title, body: n, contentHash: sha256Json(n) });
      inserted.notes++;
    }

    const f = release.flashcards;
    const fcScope = and(eq(flashcardSets.unit, release.unit), eq(flashcardSets.academicYear, year));
    if (!(await tx.select({ id: flashcardSets.id }).from(flashcardSets).where(and(fcScope, eq(flashcardSets.version, f.version)))).length) {
      await tx.update(flashcardSets).set({ isCurrent: false }).where(and(fcScope, eq(flashcardSets.isCurrent, true)));
      await tx.insert(flashcardSets).values({ ...base, ...provenance(f.provenance), version: f.version, status: f.status, language: f.language, cardCount: f.cards.length, body: f, contentHash: sha256Json(f) });
      inserted.flashcardSets++;
    }

    for (const q of release.questions) {
      if ((await tx.select({ id: questions.id }).from(questions).where(and(eq(questions.key, q.id), eq(questions.version, q.version)))).length) continue;
      await tx.update(questions).set({ isCurrent: false }).where(and(eq(questions.key, q.id), eq(questions.isCurrent, true)));
      const [row] = await tx
        .insert(questions)
        .values({
          ...questionRow(q, { chapterId: chapter.id, academicYear: year, pool: opts.poolFor?.(q), embargoUntil: opts.embargoFor?.(q) ?? null }),
          releaseId,
          contentHash: sha256Json(q),
        })
        .returning({ id: questions.id });
      await tx.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(q).key });
      inserted.questions++;
    }

    if (opts.activate ?? true) await activateRelease(tx, releaseId);
    return { releaseId, alreadyIngested: false, inserted };
  });
}

/** Makes a release the unit's active one (also the rollback path). */
export async function activateRelease(tx: Tx | Database, releaseId: string): Promise<void> {
  const [rel] = await tx.select().from(contentReleases).where(eq(contentReleases.id, releaseId));
  if (!rel) throw new Error(`release ${releaseId} not found`);
  await tx
    .update(contentReleases)
    .set({ status: sql`CASE WHEN ${contentReleases.version} > ${rel.version} THEN 'rolled_back' ELSE 'superseded' END` })
    .where(and(eq(contentReleases.unit, rel.unit), eq(contentReleases.academicYear, rel.academicYear), eq(contentReleases.status, 'active'), ne(contentReleases.id, releaseId)));
  await tx.update(contentReleases).set({ status: 'active', activatedAt: new Date() }).where(eq(contentReleases.id, releaseId));
}

export interface IngestTestOptions {
  academicYear: string;
  status?: 'draft' | 'published' | 'retired';
  seriesId?: string | null;
  seriesPosition?: number | null;
  blueprintId?: string | null;
}

/** Stores a TestDefinition and its items. Idempotent per (test id, version). */
export async function ingestTestDefinition(db: Database, def: TestDefinition, opts: IngestTestOptions): Promise<{ testId: string; alreadyIngested: boolean; items: number }> {
  return db.transaction(async (tx) => {
    const [existing] = await tx.select({ id: tests.id }).from(tests).where(and(eq(tests.key, def.id), eq(tests.version, def.version)));
    if (existing) return { testId: existing.id, alreadyIngested: true, items: 0 };
    const [subject] = await tx
      .select({ id: subjects.id })
      .from(subjects)
      .where(and(eq(subjects.key, def.subject_id), eq(subjects.academicYear, opts.academicYear)));
    if (!subject) throw new Error(`subject ${def.subject_id} (${opts.academicYear}) is not in the catalog`);

    const [t] = await tx
      .insert(tests)
      .values({
        key: def.id,
        version: def.version,
        academicYear: opts.academicYear,
        kind: def.kind,
        paperType: def.paper_type,
        blueprintId: opts.blueprintId ?? null,
        seriesId: opts.seriesId ?? null,
        seriesPosition: opts.seriesPosition ?? null,
        subjectId: subject.id,
        chapterKeys: def.chapter_ids,
        title: def.title,
        durationMin: def.duration_min,
        totalMarks: def.total_marks,
        shuffle: def.shuffle,
        seed: def.seed,
        status: opts.status ?? 'draft',
        definition: def,
      })
      .returning({ id: tests.id });

    let position = 0;
    for (const section of def.sections)
      for (const item of section.items) {
        const [q] = await tx
          .select({ id: questions.id })
          .from(questions)
          .where(and(eq(questions.key, item.question_id), eq(questions.version, item.question_version)));
        if (!q) throw new Error(`test ${def.id}: question ${item.question_id} v${item.question_version} is not ingested`);
        await tx.insert(testItems).values({
          testId: t!.id,
          questionId: q.id,
          sectionId: section.id,
          position: ++position,
          marks: item.marks,
          choiceGroup: item.choice_group,
        });
      }
    return { testId: t!.id, alreadyIngested: false, items: position };
  });
}
