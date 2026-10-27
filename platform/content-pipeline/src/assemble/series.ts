/**
 * Test series planning (CONTEXT §10, TEST_SERIES_TARGETS in shared/config/content-targets.ts):
 *
 *   every class   chapter tests for every chapter: short + long (disjoint)
 *   10 and 12     3 unit / half-syllabus tests (unit-test blueprint), ≥ 6 full-length mocks in board
 *                 pattern per paper variant (board blueprint; no repeats across the series), and for
 *                 CBSE Class 10 a second-exam (May) track (board-second-exam blueprint, 2 papers).
 *                 The 2 scheduled All-India live mocks are events (M3 test engine), not assembled here.
 *   7, 8, 9, 11   unit tests (one per syllabus unit, else per 3 chapters), half-yearly + annual
 *                 papers, and term 1 / term 2 when a term blueprint exists (≥ 2 term papers).
 * The blueprint for each paper type is the subject's own (matching variant), else the board/class
 * default. Board and term papers cover board-assessed chapters only.
 */
import { TEST_SERIES_TARGETS } from '@soyl/shared/config/content-targets';
import type { Blueprint, PaperType, Subject, SyllabusFile } from '@soyl/shared/content/index';
import type { Catalog } from '../catalog';
import { questionIdPrefix } from '../ids';
import type { PaperSpec, UnitTarget } from './engine';

export interface PlannedPaper {
  spec: PaperSpec;
  /** Series key (no repeats inside a series); chapter tests use one key per chapter (short/long disjoint). */
  series: string;
  /** Null for chapter tests (not part of a named series). */
  seriesTitle: string | null;
  track: 'main' | 'second_exam';
  position: number;
}

export interface SeriesPlan {
  subject: Subject;
  papers: PlannedPaper[];
  notes: string[];
}

export interface PaperVariant {
  /** Variant key used in test ids ('' = the default paper). */
  key: string;
  name: string | null;
  code: string | null;
}

/**
 * The variant a blueprint belongs to: its `variant` field (contract v2), else the id suffix after the
 * paper type (cbse-10-mathematics-board-basic → "basic"), else the default paper.
 * A `variant` whose code is the subject's own code (Maths Standard 041 on cbse-10-mathematics, code
 * 041) is the subject's default paper: key '' (test ids, series keys and callers asking for the
 * default paper are unchanged); its name still goes into titles. Pass the subject to apply this.
 */
export function variantOf(bp: Blueprint, subject?: Pick<Subject, 'code'>): PaperVariant {
  if (bp.variant) {
    const isDefault = subject?.code != null && bp.variant.code === subject.code;
    return { key: isDefault ? '' : slug(bp.variant.name).replace(/-/g, ''), name: bp.variant.name, code: bp.variant.code };
  }
  const suffix = bp.subject_id ? bp.id.slice(`${bp.subject_id}-${bp.paper_type}`.length).replace(/^-/, '') : '';
  return suffix && bp.id.startsWith(`${bp.subject_id}-${bp.paper_type}`) ? { key: suffix.replace(/-/g, ''), name: suffix.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()), code: null } : { key: '', name: null, code: null };
}

/** The blueprint for one paper type and variant: the subject's own, else the board/class default (default variant only). */
export function blueprintFor(catalog: Catalog, subject: Subject, paper: PaperType, variantKey = ''): Blueprint | null {
  const own = catalog.blueprints.filter((b) => b.subject_id === subject.id && b.paper_type === paper);
  const match = own.find((b) => variantOf(b, subject).key === variantKey);
  if (match) return match;
  if (variantKey) return null;
  return catalog.blueprints.find((b) => b.subject_id === null && b.board === subject.board && b.class === subject.class && b.exam === subject.exam && b.paper_type === paper) ?? null;
}

/** Paper variants with their own board blueprint (Maths Standard / Basic …); [default] when none. */
export function variantsFor(catalog: Catalog, subject: Subject): PaperVariant[] {
  const own = catalog.blueprints.filter((b) => b.subject_id === subject.id && b.paper_type === 'board').map((b) => variantOf(b, subject));
  const unique = new Map(own.map((v) => [v.key, v]));
  return unique.size ? [...unique.values()].sort((a, b) => a.key.localeCompare(b.key)) : [{ key: '', name: null, code: null }];
}

/** t_<exam><class><abbrev> from the subject's first chapter id (cbse-10-science → t_cbse10sci). */
export function testIdBase(subjectId: string): string {
  return questionIdPrefix(`${subjectId}-ch01`).replace(/^q_/, 't_').replace(/_ch01$/, '');
}

/**
 * Board-paper unit weightage from the syllabus (`units[].marks`): one target per unit with marks, over
 * its board-assessed chapters. Null unless the unit marks add up to the paper's total and every
 * board-assessed chapter belongs to such a unit (otherwise the weightage is not defined for the paper).
 */
export function unitTargetsFor(syllabus: SyllabusFile, boardAssessed: readonly string[], totalMarks: number): UnitTarget[] | null {
  const targets = syllabus.units
    .filter((u) => u.marks != null && u.marks > 0)
    .map((u) => ({ unit: u.name, marks: u.marks!, chapters: syllabus.chapters.filter((c) => c.unit === u.name && boardAssessed.includes(c.id)).map((c) => c.id) }));
  if (!targets.length || Math.abs(targets.reduce((n, t) => n + t.marks, 0) - totalMarks) > 1e-9) return null;
  if (targets.some((t) => !t.chapters.length)) return null;
  if (boardAssessed.some((c) => !targets.some((t) => t.chapters.includes(c)))) return null;
  return targets;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Splits chapters into `n` contiguous groups, following syllabus units where they give n or more groups. */
export function partition(syllabus: SyllabusFile, chapters: string[], n: number): string[][] {
  if (chapters.length <= n) return chapters.map((c) => [c]);
  const byUnit = new Map<string, string[]>();
  for (const ch of syllabus.chapters) if (chapters.includes(ch.id)) byUnit.set(ch.unit ?? '', [...(byUnit.get(ch.unit ?? '') ?? []), ch.id]);
  const units = [...byUnit.values()];
  if (units.length === n && byUnit.size > 1) return units;
  const out: string[][] = [];
  const size = chapters.length / n;
  for (let i = 0; i < n; i++) out.push(chapters.slice(Math.round(i * size), Math.round((i + 1) * size)));
  return out.filter((g) => g.length);
}

export function planSubjectTests(
  catalog: Catalog,
  subject: Subject,
  opts: { series: boolean; academicYear: string; chapters?: number[]; existingChapterTests?: ReadonlyMap<string, ReadonlySet<string>> },
): SeriesPlan {
  const syllabus = catalog.syllabi.get(subject.id);
  const notes: string[] = [];
  const papers: PlannedPaper[] = [];
  if (!syllabus) return { subject, papers, notes: [`${subject.id}: no syllabus file; nothing to assemble`] };
  const base = testIdBase(subject.id);
  const name = subject.name;
  const seed = (id: string) => `${id}@${opts.academicYear}`;
  // Project / formative-only topics: their questions stay practice and never enter series papers.
  const practiceOnly = new Set(syllabus.chapters.flatMap((c) => c.topics.filter((t) => t.board_assessed === false).map((t) => t.id)));
  const add =(paper: PaperType, id: string, title: string, chapters: string[], series: string, seriesTitle: string | null, position: number, variant = '', track: 'main' | 'second_exam' = 'main', weighted = false) => {
    const bp = blueprintFor(catalog, subject, paper, variant);
    if (!bp) {
      notes.push(`${id}: no ${paper} blueprint${variant ? ` for variant ${variant}` : ''} for ${subject.id} or its class default`);
      return;
    }
    const unitTargets = weighted ? unitTargetsFor(syllabus, chapters, bp.total_marks) : null;
    if (weighted && !unitTargets) notes.push(`${id}: syllabus unit marks do not add up to ${bp.total_marks} over its chapters; no unit weightage applied`);
    papers.push({ spec: { id, title, blueprint: bp, subjectId: subject.id, chapters, seed: seed(id), ...(unitTargets ? { unitTargets } : {}), ...(series.startsWith('chapter:') || !practiceOnly.size ? {} : { practiceOnlyTopics: practiceOnly }) }, series, seriesTitle, track, position });
  };

  // Chapter tests (short + long, disjoint) for every chapter in scope.
  const chapterScope = syllabus.chapters.filter((c) => !opts.chapters || opts.chapters.includes(c.number));
  for (const ch of chapterScope) {
    const n = String(ch.number).padStart(2, '0');
    for (const [paper, label] of [
      ['chapter-test-short', 'short'],
      ['chapter-test-long', 'long'],
    ] as const) {
      if (opts.existingChapterTests?.get(ch.id)?.has(paper)) {
        notes.push(`${ch.id}: already has a published ${paper} (authored tests.json); not re-assembled`);
        continue;
      }
      add(paper, `${base}_ch${n}_${label}`, `${name} — Chapter ${ch.number}: ${ch.title} (${label} test)`, [ch.id], `chapter:${ch.id}`, null, label === 'short' ? 1 : 2);
    }
  }
  if (!opts.series) return { subject, papers, notes };

  const boardAssessed = syllabus.chapters.filter((c) => c.board_assessed !== false).map((c) => c.id);
  const boardClass = (TEST_SERIES_TARGETS.boardClasses.classes as readonly number[]).includes(subject.class);
  if (boardClass) {
    const units = partition(syllabus, boardAssessed, TEST_SERIES_TARGETS.boardClasses.unitTests);
    units.forEach((chs, i) => add('unit-test', `${base}_unit_${i + 1}`, `${name} — Unit test ${i + 1} (half-syllabus)`, chs, 'unit-tests', `${name} unit tests`, i + 1));
    if (subject.has_board_exam) {
      for (const v of variantsFor(catalog, subject)) {
        const vs = v.key ? `_${v.key}` : '';
        const vName = v.name ? ` ${v.name}` : '';
        for (let i = 1; i <= TEST_SERIES_TARGETS.boardClasses.fullMocksMin; i++)
          add('board', `${base}${vs}_mock_${i}`, `${name}${vName} — Full mock ${i} (board pattern)`, boardAssessed, `mocks${vs}`, `${name}${vName} full mocks`, i, v.key, 'main', true);
        if (subject.board === 'cbse' && subject.class === 10 && blueprintFor(catalog, subject, 'board-second-exam', v.key))
          for (let i = 1; i <= 2; i++)
            add('board-second-exam', `${base}${vs}_may_${i}`, `${name}${vName} — May second exam, paper ${i}`, boardAssessed, `may${vs}`, `${name}${vName} second-exam (May) track`, i, v.key, 'second_exam', true);
      }
      notes.push(`${subject.id}: the ${TEST_SERIES_TARGETS.boardClasses.liveMocks} All-India live mocks are scheduled events (M3 test engine), not assembled here`);
    } else notes.push(`${subject.id}: no board exam; no full mocks`);
  } else {
    const groups = syllabus.units.length > 1 ? partition(syllabus, boardAssessed, syllabus.units.length) : partition(syllabus, boardAssessed, Math.max(1, Math.ceil(boardAssessed.length / 3)));
    groups.forEach((chs, i) => add('unit-test', `${base}_unit_${i + 1}`, `${name} — Unit test ${i + 1}`, chs, 'unit-tests', `${name} unit tests`, i + 1));
    const half = Math.ceil(boardAssessed.length / 2);
    add('half-yearly', `${base}_halfyearly`, `${name} — Half-yearly paper`, boardAssessed.slice(0, half), 'term-papers', `${name} term papers`, 1);
    add('annual', `${base}_annual`, `${name} — Annual paper`, boardAssessed, 'term-papers', `${name} term papers`, 2);
    if (blueprintFor(catalog, subject, 'term')) {
      add('term', `${base}_term_1`, `${name} — Term 1 paper`, boardAssessed.slice(0, half), 'term-papers', `${name} term papers`, 3);
      add('term', `${base}_term_2`, `${name} — Term 2 paper`, boardAssessed.slice(half), 'term-papers', `${name} term papers`, 4);
    }
  }
  return { subject, papers, notes };
}
