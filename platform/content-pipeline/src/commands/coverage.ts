/**
 * `coverage`: board × class × subject × asset-type counts against the targets in CONTEXT §4/§10
 * and content-targets.ts. This report is a launch gate (ARCHITECTURE §8.2, AGENTS §7).
 *
 * Source (`--source db|files`; default: db, falling back to files when no database is reachable):
 *   db     published content in Postgres: the unit's active release and its current published decks,
 *          notes, flashcards (20–40 cards) and practice questions (≥ 60 / 40); published chapter tests
 *          (short + long) and test-series papers (unit tests, full mocks, May track, term papers).
 *          Releases built from mock output (build.checks.mock) never count.
 *   files  hand-authored chapters + exemplars, and lint-clean pipeline output in out/ (mock never
 *          counts); tests from tests.json and out/assemble/.
 * A chapter counts for an asset only when it meets its target.
 */
import fs from 'node:fs';
import path from 'node:path';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { contentReleases, decks as decksTable, flashcardSets, notes as notesTable, questions as questionsTable, subjects as subjectsTable, tests as testsTable } from '@soyl/db/schema';
import { CONTENT_TARGETS, TEST_SERIES_TARGETS } from '@soyl/shared/config/content-targets';
import { TestDefinition, type PaperType, type Subject } from '@soyl/shared/content/index';
import { redactUrl } from '@soyl/db';
import { subjectsInScope, type Scope } from '../catalog';
import { readJsonIf, table, writeJson } from '../io';
import { unitOutDir } from '../paths';
import type { Pipeline } from '../pipeline';
import { loadAuthoredUnits } from '../sources';

export const ASSETS = ['deck', 'notes', 'flashcards', 'practice', 'chapter_tests'] as const;
type Asset = (typeof ASSETS)[number];

export interface SubjectCoverage {
  subject: string;
  board: string;
  exam: string;
  class: number;
  name: string;
  tier: string;
  wave: number;
  syllabus: boolean;
  chapters: number;
  /** Chapters whose content is mock placeholder output (never counted). */
  mock_units: number;
  /** Chapters meeting each asset target (chapter_tests counts tests, target 2 per chapter). */
  have: Record<Asset, number>;
  target: Record<Asset, number>;
  series: { have: Record<string, number>; target: Record<string, number> };
  complete: boolean;
}

export interface CoverageReport {
  generated_at: string;
  source: string;
  scope: Scope;
  subjects: SubjectCoverage[];
  totals: { subjects: number; with_syllabus: number; chapters: number; mock_units: number; have: Record<Asset, number>; target: Record<Asset, number>; complete_subjects: number };
  gate: 'PASS' | 'FAIL';
}

export function seriesTargets(s: Subject): Record<string, number> {
  if ((TEST_SERIES_TARGETS.boardClasses.classes as readonly number[]).includes(s.class)) {
    const t: Record<string, number> = { unit_tests: TEST_SERIES_TARGETS.boardClasses.unitTests };
    if (s.has_board_exam) {
      t.full_mocks = TEST_SERIES_TARGETS.boardClasses.fullMocksMin;
      t.live_mocks = TEST_SERIES_TARGETS.boardClasses.liveMocks;
      if (s.board === 'cbse' && s.class === 10) t.second_exam_track = 1;
    }
    return t;
  }
  return { unit_tests: TEST_SERIES_TARGETS.otherClasses.unitTestsMin, term_papers: TEST_SERIES_TARGETS.otherClasses.termPapersMin };
}

/** Which series bucket a paper type counts toward. */
function seriesBucket(paper: PaperType, kind: string): string | null {
  if (kind === 'live') return 'live_mocks';
  switch (paper) {
    case 'unit-test':
      return 'unit_tests';
    case 'board':
      return 'full_mocks';
    case 'board-second-exam':
      return 'second_exam_track';
    case 'half-yearly':
    case 'term':
    case 'annual':
      return 'term_papers';
    default:
      return null;
  }
}

interface UnitFacts {
  deck: boolean;
  notes: boolean;
  cards: number;
  practice: number;
  mock: boolean;
}

export interface CoverageFacts {
  units: Map<string, UnitFacts>;
  /** subject → unit → chapter-test paper types */
  chapterTests: Map<string, Map<string, Set<string>>>;
  /** subject → series bucket → count */
  series: Map<string, Map<string, number>>;
  source: string;
}

function emptyFacts(source: string): CoverageFacts {
  return { units: new Map(), chapterTests: new Map(), series: new Map(), source };
}

function addTest(f: CoverageFacts, subject: string, t: { paper_type: string; kind: string; chapter_ids: readonly string[] }) {
  if (t.paper_type === 'chapter-test-short' || t.paper_type === 'chapter-test-long') {
    const m = f.chapterTests.get(subject) ?? new Map<string, Set<string>>();
    for (const u of t.chapter_ids) m.set(u, new Set([...(m.get(u) ?? []), t.paper_type]));
    f.chapterTests.set(subject, m);
    return;
  }
  const bucket = seriesBucket(t.paper_type as PaperType, t.kind);
  if (!bucket) return;
  const m = f.series.get(subject) ?? new Map<string, number>();
  m.set(bucket, (m.get(bucket) ?? 0) + 1);
  f.series.set(subject, m);
}

export async function factsFromDb(p: Pipeline, subjects: Subject[]): Promise<CoverageFacts> {
  const { db, url } = await p.dbAccess.get();
  const f = emptyFacts(`published content in Postgres (${redactUrl(url)})`);
  const visible = ['published', 'reviewed'];
  const releases = await db.select({ unit: contentReleases.unit, checks: contentReleases.checks }).from(contentReleases).where(eq(contentReleases.status, 'active'));
  const deckUnits = new Set((await db.select({ unit: decksTable.unit }).from(decksTable).where(and(eq(decksTable.isCurrent, true), inArray(decksTable.status, visible)))).map((r) => r.unit));
  const noteUnits = new Set((await db.select({ unit: notesTable.unit }).from(notesTable).where(and(eq(notesTable.isCurrent, true), inArray(notesTable.status, visible)))).map((r) => r.unit));
  const cards = new Map((await db.select({ unit: flashcardSets.unit, n: flashcardSets.cardCount }).from(flashcardSets).where(and(eq(flashcardSets.isCurrent, true), inArray(flashcardSets.status, visible)))).map((r) => [r.unit, r.n]));
  const practice = new Map(
    (
      await db
        .select({ unit: questionsTable.unit, n: sql<number>`count(*)::int` })
        .from(questionsTable)
        .where(and(eq(questionsTable.isCurrent, true), inArray(questionsTable.status, visible), eq(questionsTable.pool, 'practice')))
        .groupBy(questionsTable.unit)
    ).map((r) => [r.unit, Number(r.n)]),
  );
  for (const r of releases)
    f.units.set(r.unit, { deck: deckUnits.has(r.unit), notes: noteUnits.has(r.unit), cards: cards.get(r.unit) ?? 0, practice: practice.get(r.unit) ?? 0, mock: !!(r.checks as Record<string, string>).mock });
  const keys = subjects.map((s) => s.id);
  if (keys.length) {
    const rows = await db
      .select({ subject: subjectsTable.key, paperType: testsTable.paperType, kind: testsTable.kind, chapterKeys: testsTable.chapterKeys })
      .from(testsTable)
      .innerJoin(subjectsTable, eq(testsTable.subjectId, subjectsTable.id))
      .where(and(eq(testsTable.status, 'published'), inArray(subjectsTable.key, keys)));
    for (const t of rows) if (!t.chapterKeys.some((u) => f.units.get(u)?.mock)) addTest(f, t.subject, { paper_type: t.paperType, kind: t.kind, chapter_ids: t.chapterKeys });
  }
  return f;
}

export function factsFromFiles(p: Pipeline): CoverageFacts {
  const f = emptyFacts(`files: hand-authored chapters + exemplars, lint-clean pipeline output and assembled tests in ${p.paths.outDir}`);
  for (const u of loadAuthoredUnits(p)) {
    if (u.problems.length) continue;
    f.units.set(u.unit, { deck: u.decks.length > 0, notes: !!u.notes, cards: u.flashcards?.cards.length ?? 0, practice: u.questions.length, mock: u.mock });
    if (!u.mock) for (const t of u.tests) addTest(f, t.subject_id, t);
  }
  const out = p.paths.outDir;
  for (const dir of fs.existsSync(out) ? fs.readdirSync(out).filter((d) => /-ch\d{2}$/.test(d)) : []) {
    if (f.units.has(dir)) continue;
    const ud = unitOutDir(out, dir);
    const prov = (file: string) => readJsonIf<{ provenance?: { model?: string } }>(path.join(ud, file))?.provenance?.model;
    const mock = prov('notes.json') === 'mock' || prov('flashcards.json') === 'mock' || prov('outline.json') === 'mock';
    const lint = readJsonIf<{ errors: number }>(path.join(ud, 'lint.json'));
    const ok = !!lint && lint.errors === 0;
    f.units.set(dir, {
      deck: ok && fs.readdirSync(ud).some((x) => /^deck\.p\d+\.json$/.test(x)),
      notes: ok && fs.existsSync(path.join(ud, 'notes.json')),
      cards: ok ? (readJsonIf<{ cards: unknown[] }>(path.join(ud, 'flashcards.json'))?.cards.length ?? 0) : 0,
      practice: ok ? (readJsonIf<{ questions: unknown[] }>(path.join(ud, 'questions.json'))?.questions.length ?? 0) : 0,
      mock,
    });
  }
  const assembled = path.join(out, 'assemble');
  for (const subject of fs.existsSync(assembled) ? fs.readdirSync(assembled) : []) {
    const tdir = path.join(assembled, subject, 'tests');
    for (const file of fs.existsSync(tdir) ? fs.readdirSync(tdir) : []) {
      const r = TestDefinition.safeParse(readJsonIf(path.join(tdir, file)));
      if (r.success && !r.data.chapter_ids.some((u) => f.units.get(u)?.mock)) addTest(f, subject, r.data);
    }
  }
  return f;
}

export function coverageFromFacts(p: Pipeline, scope: Scope, facts: CoverageFacts): CoverageReport {
  const subjects: SubjectCoverage[] = subjectsInScope(p.catalog, scope).map((s) => {
    const syl = p.catalog.syllabi.get(s.id);
    const chapters = syl?.chapters.length ?? 0;
    const have: Record<Asset, number> = { deck: 0, notes: 0, flashcards: 0, practice: 0, chapter_tests: 0 };
    let mock_units = 0;
    const tests = facts.chapterTests.get(s.id);
    for (const ch of syl?.chapters ?? []) {
      const u = facts.units.get(ch.id);
      if (!u) continue;
      if (u.mock) {
        mock_units++;
        continue;
      }
      if (u.deck) have.deck++;
      if (u.notes) have.notes++;
      if (u.cards >= CONTENT_TARGETS.flashcardsMin && u.cards <= CONTENT_TARGETS.flashcardsMax) have.flashcards++;
      if (u.practice >= (CONTENT_TARGETS.practiceQuestionsMin[s.class] ?? 40)) have.practice++;
      have.chapter_tests += Math.min(CONTENT_TARGETS.chapterTests, tests?.get(ch.id)?.size ?? 0);
    }
    const target: Record<Asset, number> = { deck: chapters, notes: chapters, flashcards: chapters, practice: chapters, chapter_tests: chapters * CONTENT_TARGETS.chapterTests };
    const st = seriesTargets(s);
    const got = facts.series.get(s.id);
    const series = { have: Object.fromEntries(Object.keys(st).map((k) => [k, got?.get(k) ?? 0])), target: st };
    const complete = !!syl && chapters > 0 && ASSETS.every((a) => have[a] >= target[a]) && Object.keys(st).every((k) => series.have[k]! >= st[k]!);
    return { subject: s.id, board: s.board, exam: s.exam, class: s.class, name: s.name, tier: s.tier, wave: s.wave, syllabus: !!syl, chapters, mock_units, have, target, series, complete };
  });
  const sum = (fn: (s: SubjectCoverage) => number) => subjects.reduce((n, s) => n + fn(s), 0);
  const totals = {
    subjects: subjects.length,
    with_syllabus: subjects.filter((s) => s.syllabus).length,
    chapters: sum((s) => s.chapters),
    have: Object.fromEntries(ASSETS.map((a) => [a, sum((s) => s.have[a])])) as Record<Asset, number>,
    target: Object.fromEntries(ASSETS.map((a) => [a, sum((s) => s.target[a])])) as Record<Asset, number>,
    complete_subjects: subjects.filter((s) => s.complete).length,
    mock_units: sum((s) => s.mock_units),
  };
  return { generated_at: new Date().toISOString(), source: facts.source, scope, subjects, totals, gate: subjects.length > 0 && subjects.every((s) => s.complete) ? 'PASS' : 'FAIL' };
}

/** File-based report (no database). */
export function coverageReport(p: Pipeline, scope: Scope): CoverageReport {
  return coverageFromFacts(p, scope, factsFromFiles(p));
}

const frac = (have: number, target: number) => `${have}/${target}`;
const seriesText = (s: SubjectCoverage) => Object.keys(s.series.target).map((k) => `${k} ${s.series.have[k]}/${s.series.target[k]}`).join(', ');
const hasContent = (s: SubjectCoverage) => ASSETS.some((a) => s.have[a] > 0) || Object.values(s.series.have).some((n) => n > 0) || s.mock_units > 0;

export function coverageMarkdown(r: CoverageReport): string {
  const withContent = r.subjects.filter(hasContent);
  const row = (s: SubjectCoverage) =>
    `| ${s.subject} | ${s.wave} | ${s.syllabus ? s.chapters : '**no syllabus**'} | ${frac(s.have.deck, s.target.deck)} | ${frac(s.have.notes, s.target.notes)} | ${frac(s.have.flashcards, s.target.flashcards)} | ${frac(s.have.practice, s.target.practice)} | ${frac(s.have.chapter_tests, s.target.chapter_tests)} | ${seriesText(s)} | ${s.complete ? 'yes' : 'no'} |`;
  const header = ['| Subject | Wave | Chapters | Deck | Notes | Flashcards | Practice | Chapter tests | Test series | Complete |', '|---|---|---|---|---|---|---|---|---|---|'];
  const lines = [
    '# Content coverage',
    '',
    `Generated ${r.generated_at}. Source: ${r.source}. Gate: **${r.gate}** (${r.totals.complete_subjects}/${r.totals.subjects} subjects complete).`,
    '',
    'A subject is complete when every chapter has a published deck, notes, 20–40 flashcards, the practice minimum and 2 chapter tests, and the subject has its test series (CONTEXT §4, §10). Mock placeholder content never counts.',
    '',
    `Totals: ${r.totals.chapters} chapters; ${ASSETS.map((a) => `${a} ${frac(r.totals.have[a], r.totals.target[a])}`).join(', ')}; ${r.totals.mock_units} mock unit(s) not counted.`,
    '',
    `## Subjects with content (${withContent.length})`,
    '',
    ...header,
    ...withContent.map(row),
    '',
    `## All subjects (${r.subjects.length})`,
    '',
    ...header,
    ...r.subjects.map(row),
  ];
  return `${lines.join('\n')}\n`;
}

export async function coverageCommand(p: Pipeline, scope: Scope, opts: { out?: string; gate?: boolean; detail?: boolean; source?: 'db' | 'files' } = {}): Promise<{ report: CoverageReport; files: string[]; exitCode: number }> {
  let facts: CoverageFacts;
  if (opts.source === 'files') facts = factsFromFiles(p);
  else {
    try {
      facts = await factsFromDb(p, subjectsInScope(p.catalog, scope));
    } catch (e) {
      if (opts.source === 'db') throw e;
      p.log(`coverage: no database (${(e as Error).message.split('\n')[0]}); counting files instead`);
      facts = factsFromFiles(p);
    }
  }
  const r = coverageFromFacts(p, scope, facts);
  const detail = opts.detail ?? !!(scope.subject || scope.class !== undefined);
  const subjectRow = (s: SubjectCoverage) => [s.subject, s.wave, s.syllabus ? s.chapters : 'no syllabus', frac(s.have.deck, s.target.deck), frac(s.have.notes, s.target.notes), frac(s.have.flashcards, s.target.flashcards), frac(s.have.practice, s.target.practice), frac(s.have.chapter_tests, s.target.chapter_tests), seriesText(s), s.complete ? 'yes' : 'no'];
  const subjectHead = ['subject', 'wave', 'chapters', 'deck', 'notes', 'flashcards', 'practice', 'ch.tests', 'series', 'complete'];
  const subjectAlign: ('l' | 'r')[] = ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'l', 'l'];
  if (detail) p.log(table(subjectHead, r.subjects.map(subjectRow), subjectAlign));
  else {
    const groups = new Map<string, SubjectCoverage[]>();
    for (const s of r.subjects) groups.set(`${s.board}|${s.exam}|${s.class}`, [...(groups.get(`${s.board}|${s.exam}|${s.class}`) ?? []), s]);
    const rows = [...groups.entries()]
      .sort(([a], [b]) => a.split('|')[0]!.localeCompare(b.split('|')[0]!) || Number(a.split('|')[2]) - Number(b.split('|')[2]) || a.localeCompare(b))
      .map(([key, list]) => {
        const sum = (fn: (s: SubjectCoverage) => number) => list.reduce((n, s) => n + fn(s), 0);
        return [...key.split('|'), list.length, list.filter((s) => s.syllabus).length, sum((s) => s.chapters), ...ASSETS.map((a) => frac(sum((s) => s.have[a]), sum((s) => s.target[a]))), list.filter((s) => s.complete).length];
      });
    p.log(table(['board', 'exam', 'class', 'subjects', 'syllabi', 'chapters', 'deck', 'notes', 'flashcards', 'practice', 'ch.tests', 'complete'], rows, ['l', 'l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']));
    const withContent = r.subjects.filter(hasContent);
    if (withContent.length) {
      p.log('subjects with content:');
      p.log(table(subjectHead, withContent.map(subjectRow), subjectAlign));
    }
  }
  const t = r.totals;
  p.log(`source: ${r.source}`);
  p.log(`total: ${t.subjects} subjects (${t.with_syllabus} with syllabus), ${t.chapters} chapters; ${ASSETS.map((a) => `${a} ${frac(t.have[a], t.target[a])}`).join(', ')}`);
  if (t.mock_units) p.log(`${t.mock_units} unit(s) hold mock placeholder content and are not counted`);
  p.log(`coverage gate: ${r.gate} (${t.complete_subjects}/${t.subjects} subjects complete)`);
  const base = opts.out ?? path.join(p.paths.outDir, 'coverage', 'coverage');
  const files = [`${base}.json`, `${base}.md`];
  writeJson(files[0]!, r);
  fs.writeFileSync(files[1]!, coverageMarkdown(r));
  p.log(`wrote ${files.join(' and ')}`);
  return { report: r, files, exitCode: opts.gate && r.gate !== 'PASS' ? 1 : 0 };
}
