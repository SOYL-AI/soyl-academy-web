/**
 * Frozen test series (ADR-019): the assembled unit tests, full mocks and May-track papers of a subject,
 * committed to git as `content/authored/series/<subject id>.json` and published by
 * `publish --authored` (the production release step) with question versions remapped to the
 * published ones. Freezing makes the release deterministic and idempotent: adding or editing
 * questions never reshuffles a published mock; only an explicit `assemble --series --freeze`
 * (a reviewed commit) changes the papers.
 *
 * A frozen file holds question ids and blueprint layout only; versions in it are informational.
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod/v4';
import { SubjectId, TestDefinition } from '@soyl/shared/content/index';
import type { PipelinePaths } from '../paths';

export const FrozenSeriesEntry = z.object({
  series: z.object({
    key: z.string().regex(/^ts_[a-z0-9_]+$/),
    title: z.string().min(1),
    track: z.enum(['main', 'second_exam']),
    position: z.number().int().positive(),
  }),
  test: TestDefinition,
});
export type FrozenSeriesEntry = z.infer<typeof FrozenSeriesEntry>;

export const FrozenSeriesFile = z
  .object({
    subject_id: SubjectId,
    academic_year: z.string(),
    /** How the file was made (command), for reviewers. */
    assembled_by: z.string(),
    tests: z.array(FrozenSeriesEntry).min(1),
  })
  .superRefine((f, ctx) => {
    const ids = new Set<string>();
    f.tests.forEach((t, i) => {
      if (ids.has(t.test.id)) ctx.addIssue({ code: 'custom', path: ['tests', i], message: `duplicate test ${t.test.id}` });
      ids.add(t.test.id);
      if (t.test.subject_id !== f.subject_id) ctx.addIssue({ code: 'custom', path: ['tests', i], message: `${t.test.id} belongs to ${t.test.subject_id}` });
      if (t.test.kind === 'chapter') ctx.addIssue({ code: 'custom', path: ['tests', i], message: `${t.test.id}: chapter tests ship with their chapter (tests.json), not in a series file` });
    });
  });
export type FrozenSeriesFile = z.infer<typeof FrozenSeriesFile>;

/** content/authored/series/ — beside the chapter families; loaders skip it (no release.json). */
export function seriesDir(paths: Pick<PipelinePaths, 'authoredDir'>): string {
  return path.join(paths.authoredDir, 'series');
}

export function seriesFile(paths: Pick<PipelinePaths, 'authoredDir'>, subjectId: string): string {
  return path.join(seriesDir(paths), `${subjectId}.json`);
}

/** The frozen series of a subject, or null. Throws when the file exists but is invalid (never ignored silently). */
export function loadFrozenSeries(paths: Pick<PipelinePaths, 'authoredDir'>, subjectId: string): FrozenSeriesFile | null {
  const file = seriesFile(paths, subjectId);
  if (!fs.existsSync(file)) return null;
  const parsed = FrozenSeriesFile.safeParse(JSON.parse(fs.readFileSync(file, 'utf8')));
  if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues.slice(0, 3).map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  if (parsed.data.subject_id !== subjectId) throw new Error(`${file}: subject_id ${parsed.data.subject_id} ≠ ${subjectId}`);
  return parsed.data;
}

/** Every frozen series file (subject ids), sorted. */
export function frozenSubjects(paths: Pick<PipelinePaths, 'authoredDir'>): string[] {
  const dir = seriesDir(paths);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.slice(0, -5))
    .sort();
}

export function writeFrozenSeries(paths: Pick<PipelinePaths, 'authoredDir'>, file: FrozenSeriesFile): string {
  const out = seriesFile(paths, file.subject_id);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(FrozenSeriesFile.parse(file), null, 2)}\n`);
  return out;
}

/**
 * The test with every item's question_version set from `versions` (published versions).
 * Returns the ids that have no version (missing from the bank) instead when any is missing.
 */
export function remapVersions(test: TestDefinition, versions: ReadonlyMap<string, number>): { ok: true; test: TestDefinition } | { ok: false; missing: string[] } {
  const missing = test.sections.flatMap((s) => s.items.filter((i) => !versions.has(i.question_id)).map((i) => i.question_id));
  if (missing.length) return { ok: false, missing };
  return { ok: true, test: { ...test, sections: test.sections.map((s) => ({ ...s, items: s.items.map((i) => ({ ...i, question_version: versions.get(i.question_id)! })) })) } };
}

/** Question ids of a test. */
export function questionIds(test: TestDefinition): string[] {
  return test.sections.flatMap((s) => s.items.map((i) => i.question_id));
}
