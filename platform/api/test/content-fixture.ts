/**
 * Real content for API tests: the authored chapters (platform/content/authored) and the exemplars
 * (platform/content-templates/exemplars), ingested with @soyl/db ingestChapterRelease as the publish
 * stage does (every item `published`), plus their chapter tests. The catalog is seeded from a reduced
 * copy (CBSE subjects + the syllabi of the subjects that have content) to keep each test file fast.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { seedCatalog, ingestChapterRelease, ingestTestDefinition } from '@soyl/db';
import type { TestDb } from '@soyl/db/testing';
import { ChapterRelease } from '@soyl/shared/content/release';
import { TestDefinition } from '@soyl/shared/content/test';

const PLATFORM = path.resolve(import.meta.dirname, '..', '..');

export interface ReleaseFile {
  dir: string;
  release: ChapterRelease;
  tests: TestDefinition[];
}

export function realReleases(filter?: (unit: string) => boolean): ReleaseFile[] {
  const out: ReleaseFile[] = [];
  for (const root of [path.join(PLATFORM, 'content', 'authored'), path.join(PLATFORM, 'content-templates', 'exemplars')]) {
    if (!fs.existsSync(root)) continue;
    for (const family of fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()))
      for (const unit of fs.readdirSync(path.join(root, family.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
        const dir = path.join(root, family.name, unit.name);
        if (!fs.existsSync(path.join(dir, 'release.json'))) continue;
        if (filter && !filter(unit.name)) continue;
        const release = ChapterRelease.parse(JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8')));
        const testsFile = path.join(dir, 'tests.json');
        const tests = fs.existsSync(testsFile) ? (JSON.parse(fs.readFileSync(testsFile, 'utf8')) as { tests: unknown[] }).tests.map((x) => TestDefinition.parse(x)) : [];
        out.push({ dir, release, tests });
      }
  }
  return out.sort((a, b) => a.release.unit.localeCompare(b.release.unit));
}

/** A catalog directory with every CBSE subject but only the syllabi of `subjectDirs` (e.g. 10/science). */
function reducedCatalog(subjectDirs: string[]): string {
  const src = path.join(PLATFORM, 'catalog', 'cbse');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'soyl-catalog-'));
  fs.mkdirSync(path.join(dir, 'cbse'), { recursive: true });
  fs.copyFileSync(path.join(src, 'subjects.yaml'), path.join(dir, 'cbse', 'subjects.yaml'));
  for (const s of subjectDirs) {
    fs.mkdirSync(path.join(dir, 'cbse', s), { recursive: true });
    fs.copyFileSync(path.join(src, s, 'syllabus.yaml'), path.join(dir, 'cbse', s, 'syllabus.yaml'));
  }
  return dir;
}

const published = <T extends { status?: string }>(x: T): T => ({ ...x, status: 'published' });

/** Seeds the reduced catalog and publishes the real releases (all of them unless filtered). */
export async function seedRealContent(t: TestDb, filter?: (unit: string) => boolean) {
  const releases = realReleases(filter);
  const subjectDirs = [...new Set(releases.map((r) => /^cbse-(\d+)-(.+)-ch\d+$/.exec(r.release.unit)!).map((m) => `${m[1]}/${m[2]}`))];
  const dir = reducedCatalog(subjectDirs);
  try {
    const report = await seedCatalog(t.db, { dir });
    if (report.errors.length) throw new Error(`catalog seed: ${report.errors.join('; ')}`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  for (const r of releases) {
    const rel = {
      ...r.release,
      decks: r.release.decks.map(published),
      notes: published(r.release.notes),
      flashcards: published(r.release.flashcards),
      questions: r.release.questions.map(published),
    };
    await ingestChapterRelease(t.db, rel);
    const subject = /^(.*)-ch\d+$/.exec(r.release.unit)![1]!;
    for (const def of r.tests) if (def.subject_id === subject) await ingestTestDefinition(t.db, def, { academicYear: r.release.academic_year, status: 'published' });
  }
  return releases;
}
