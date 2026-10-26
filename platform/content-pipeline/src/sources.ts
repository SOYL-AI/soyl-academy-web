/**
 * Where stages 5–9 read content from:
 *   - pipeline output   out/<unit>/{deck.p<N>,notes,flashcards,questions}.json (generate → lint → verify …)
 *   - hand-authored     platform/content/authored/<family>/<unit>/{release,tests}.json (D-026)
 *   - exemplars         platform/content-templates/exemplars/<family>/<unit>/{release,tests}.json
 * Authored chapters win over an exemplar of the same unit.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ChapterRelease, Deck, FlashcardSet, Notes, QuestionBank, TestDefinition, type Question } from '@soyl/shared/content/index';
import { contentDirs, exemplarDirs } from './commands/lint';
import { readJsonIf, writeJson } from './io';
import { unitOutDir } from './paths';
import type { Pipeline } from './pipeline';

export type ContentOrigin = 'pipeline' | 'authored' | 'exemplar';

export interface ContentUnit {
  unit: string;
  origin: ContentOrigin;
  family: string;
  dir: string;
  decks: { key: string; deck: Deck }[];
  notes: Notes | null;
  flashcards: FlashcardSet | null;
  questions: Question[];
  /** Chapter tests shipped with authored/exemplar chapters (tests.json). */
  tests: TestDefinition[];
  /** Any item made by the mock provider (placeholder text). */
  mock: boolean;
  /** Parse problems (the unit is unusable when non-empty). */
  problems: string[];
}

const isMockProv = (p: { model?: string | null } | undefined) => p?.model === 'mock';

/** Hand-authored chapters and exemplars (authored wins on a duplicate unit). */
export function loadAuthoredUnits(p: Pipeline): ContentUnit[] {
  const byUnit = new Map<string, ContentUnit>();
  const load = (refs: { family: string; dir: string; unit: string }[], origin: ContentOrigin) => {
    for (const ref of refs) {
      const problems: string[] = [];
      const raw = readJsonIf(path.join(ref.dir, 'release.json'));
      const parsed = ChapterRelease.safeParse(raw);
      if (!parsed.success) problems.push(...parsed.error.issues.slice(0, 5).map((i) => `release.json ${i.path.join('.')}: ${i.message}`));
      const testsRaw = readJsonIf<{ tests?: unknown[] }>(path.join(ref.dir, 'tests.json'));
      const tests: TestDefinition[] = [];
      for (const t of testsRaw?.tests ?? []) {
        const r = TestDefinition.safeParse(t);
        if (r.success) tests.push(r.data);
        else problems.push(`tests.json: ${r.error.issues[0]?.message}`);
      }
      const r = parsed.success ? parsed.data : null;
      byUnit.set(ref.unit, {
        unit: ref.unit,
        origin,
        family: ref.family,
        dir: ref.dir,
        decks: (r?.decks ?? []).map((d, i) => ({ key: `deck.p${d.part ?? i + 1}`, deck: d })),
        notes: r?.notes ?? null,
        flashcards: r?.flashcards ?? null,
        questions: r?.questions ?? [],
        tests,
        mock: !!r && (r.decks.some((d) => isMockProv(d.provenance)) || r.questions.some((q) => isMockProv(q.provenance))),
        problems,
      });
    }
  };
  load(exemplarDirs(p.paths.templatesDir), 'exemplar');
  load(contentDirs(p.paths.authoredDir), 'authored');
  return [...byUnit.values()].sort((a, b) => a.unit.localeCompare(b.unit));
}

/** A generated unit from out/<unit>/, or null when generate has not assembled it. */
export function loadOutUnit(p: Pipeline, unit: string): ContentUnit | null {
  const dir = unitOutDir(p.paths.outDir, unit);
  if (!fs.existsSync(path.join(dir, 'questions.json'))) return null;
  const problems: string[] = [];
  const parse = <T>(file: string, schema: { safeParse(v: unknown): { success: true; data: T } | { success: false; error: { issues: { message: string }[] } } }): T | null => {
    const raw = readJsonIf(path.join(dir, file));
    if (raw === undefined) {
      problems.push(`${file} missing`);
      return null;
    }
    const r = schema.safeParse(raw);
    if (!r.success) {
      problems.push(`${file}: ${r.error.issues[0]?.message}`);
      return null;
    }
    return r.data;
  };
  const deckFiles = fs
    .readdirSync(dir)
    .filter((f) => /^deck\.p\d+\.json$/.test(f))
    .sort((a, b) => Number(/\d+/.exec(a)![0]) - Number(/\d+/.exec(b)![0]));
  const decks = deckFiles.flatMap((f) => {
    const d = parse(f, Deck);
    return d ? [{ key: f.replace(/\.json$/, ''), deck: d }] : [];
  });
  const notes = parse('notes.json', Notes);
  const flashcards = parse('flashcards.json', FlashcardSet);
  const bank = parse('questions.json', QuestionBank);
  const tests = (readJsonIf<{ tests?: unknown[] }>(path.join(dir, 'tests.json'))?.tests ?? []).flatMap((t) => {
    const r = TestDefinition.safeParse(t);
    return r.success ? [r.data] : [];
  });
  const questions = bank?.questions ?? [];
  const mock =
    decks.some((d) => isMockProv(d.deck.provenance)) || isMockProv(notes?.provenance) || isMockProv(flashcards?.provenance) || questions.some((q) => isMockProv(q.provenance));
  return { unit, origin: 'pipeline', family: '', dir, decks, notes, flashcards, questions, tests, mock, problems };
}

/** Units under out/ that generate has assembled. */
export function outUnits(p: Pipeline): string[] {
  if (!fs.existsSync(p.paths.outDir)) return [];
  return fs
    .readdirSync(p.paths.outDir)
    .filter((d) => /-ch\d{2}$/.test(d) && fs.existsSync(path.join(p.paths.outDir, d, 'questions.json')))
    .sort();
}

export function writeOutQuestions(p: Pipeline, unit: string, questions: Question[]): void {
  writeJson(path.join(unitOutDir(p.paths.outDir, unit), 'questions.json'), { unit, questions });
}

export function writeOutDeck(p: Pipeline, unit: string, key: string, deck: Deck): void {
  writeJson(path.join(unitOutDir(p.paths.outDir, unit), `${key}.json`), deck);
}
