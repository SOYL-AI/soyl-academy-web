/**
 * Frozen test series (ADR-019, CONTEXT §10): every committed series file under
 * content/authored/series/ is complete for its subject's plan, matches its blueprints exactly
 * (sections, item types, marks, internal-choice groups, section/item chapter scopes), carries the
 * syllabus unit weightage exactly on board papers, never repeats a question inside a series, uses
 * only published-bank, board-assessed questions, and never puts two near-duplicate questions in one
 * paper. Plus engine rules behind it (discipline sections, unit weightage, practice-only topics,
 * order-independent determinism, frozen papers reused instead of re-assembled).
 */
import { describe, expect, it } from 'vitest';
import type { Blueprint, Question, TestDefinition } from '@soyl/shared/content/index';
import { assembleSubject, bankFromFiles, toFrozenSeries, type Bank } from '../src/commands/assemble';
import { SLOT_COMPATIBLE, assemblePaper, attemptedMarksBy, type BankItem } from '../src/assemble/engine';
import { planSubjectTests, unitTargetsFor } from '../src/assemble/series';
import { FrozenSeriesFile, frozenSubjects, loadFrozenSeries, questionIds, remapVersions } from '../src/assemble/frozen';
import { loadAuthoredUnits } from '../src/sources';
import { shingles, words } from '../src/originality/ngrams';
import { testPipeline } from './helpers';

const { p } = testPipeline();
const subjects = frozenSubjects(p.paths);
const units = loadAuthoredUnits(p);
const questionById = new Map<string, Question>(units.flatMap((u) => u.questions.map((q) => [q.id, q] as const)));

/** Pairs flagged as near-duplicates by `originality --authored` before 2026-10-27 and rewritten: never in one paper. */
const FORMER_DUPLICATE_PAIRS: [string, string][] = [
  ['q_cbse10math_ch01_054', 'q_cbse10math_ch01_047'],
  ['q_cbse10math_ch01_056', 'q_cbse10math_ch01_049'],
  ['q_cbse10math_ch01_010', 'q_cbse10math_ch01_057'],
  ['q_cbse10math_ch02_016', 'q_cbse10math_ch02_012'],
  ['q_cbse10math_ch02_017', 'q_cbse10math_ch02_011'],
  ['q_cbse10math_ch02_037', 'q_cbse10math_ch02_036'],
  ['q_cbse10math_ch02_040', 'q_cbse10math_ch02_036'],
  ['q_cbse10math_ch02_047', 'q_cbse10math_ch02_044'],
  ['q_cbse10math_ch02_053', 'q_cbse10math_ch02_044'],
  ['q_cbse10math_ch02_053', 'q_cbse10math_ch02_047'],
  ['q_cbse10math_ch02_055', 'q_cbse10math_ch02_048'],
  ['q_cbse10math_ch10_010', 'q_cbse10math_ch10_033'],
  ['q_cbse10math_ch11_003', 'q_cbse10math_ch11_031'],
  ['q_cbse10sst_ch18_041', 'q_cbse10sst_ch15_062'],
];
/** Word 5-gram Jaccard similarity of two stems (maths stripped), as the originality stage measures it. */
function similarity(a: Question, b: Question): number {
  const sa = new Set(shingles(words(`${a.passage_md ?? ''}\n${a.stem_md}`), 5));
  const sb = new Set(shingles(words(`${b.passage_md ?? ''}\n${b.stem_md}`), 5));
  if (!sa.size || !sb.size) return 0;
  let inter = 0;
  sa.forEach((g) => sb.has(g) && inter++);
  return inter / (sa.size + sb.size - inter);
}

/** Every way a test departs from its blueprint (empty = exact). */
export function blueprintProblems(test: TestDefinition, bp: Blueprint, find: (id: string) => Pick<Question, 'type' | 'marks' | 'unit'> | undefined): string[] {
  const out: string[] = [];
  if (test.blueprint_id !== bp.id) out.push(`blueprint_id ${test.blueprint_id} ≠ ${bp.id}`);
  if (test.paper_type !== bp.paper_type || test.total_marks !== bp.total_marks || test.duration_min !== bp.duration_min) out.push('paper type / marks / duration differ');
  if (test.sections.length !== bp.sections.length) return [...out, `${test.sections.length} sections, blueprint has ${bp.sections.length}`];
  bp.sections.forEach((bs, si) => {
    const ts = test.sections[si]!;
    if (ts.id !== bs.id || ts.title !== bs.title) out.push(`section ${si}: ${ts.id} ≠ ${bs.id}`);
    let k = 0;
    const take = (n: number) => ts.items.slice(k, (k += n));
    for (const it of bs.items) {
      const scope = it.chapters ?? bs.chapters ?? test.chapter_ids;
      const accept = SLOT_COMPATIBLE[it.type] ?? [it.type];
      const check = (qid: string) => {
        const q = find(qid);
        if (!q) return out.push(`§${bs.id}: ${qid} is not in the bank`);
        if (!accept.includes(q.type) || q.marks !== it.marks_each) out.push(`§${bs.id}: ${qid} is ${q.type}/${q.marks}, slot ${it.type}/${it.marks_each}`);
        if (!scope.includes(q.unit)) out.push(`§${bs.id}: ${qid} (${q.unit}) is outside the section scope`);
      };
      if (it.internal_choice) {
        for (let g = 0; g < it.count / it.internal_choice.of; g++) {
          const members = take(it.internal_choice.of);
          const group = members[0]?.choice_group;
          if (members.length !== it.internal_choice.of || !group || members.some((m) => m.choice_group !== group)) out.push(`§${bs.id}: internal-choice group ${g + 1} of ${it.type}/${it.marks_each} is not ${it.internal_choice.of} alternatives`);
          else if (ts.choice_groups.find((c) => c.id === group)?.attempt !== it.internal_choice.attempt) out.push(`§${bs.id}: group ${group} attempt differs`);
          members.forEach((m) => check(m.question_id));
        }
      } else {
        const items = take(it.count);
        if (items.length !== it.count || items.some((m) => m.choice_group)) out.push(`§${bs.id}: ${it.count} × ${it.type}/${it.marks_each} without choice expected`);
        items.forEach((m) => check(m.question_id));
      }
    }
    if (k !== ts.items.length) out.push(`§${bs.id}: ${ts.items.length - k} extra item(s)`);
  });
  return out;
}

describe('frozen test series (content/authored/series)', () => {
  it('exist for CBSE 10 Science and Mathematics', () => {
    expect(subjects).toEqual(expect.arrayContaining(['cbse-10-mathematics', 'cbse-10-science']));
  });

  for (const subjectId of subjects) {
    describe(subjectId, () => {
      const file = loadFrozenSeries(p.paths, subjectId)!;
      const subject = p.catalog.subjectsById.get(subjectId)!;
      const syllabus = p.catalog.syllabi.get(subjectId)!;
      const plan = planSubjectTests(p.catalog, subject, { series: true, academicYear: syllabus.academic_year });
      const seriesPapers = plan.papers.filter((x) => x.seriesTitle);
      const practiceOnly = new Set(syllabus.chapters.flatMap((c) => c.topics.filter((t) => t.board_assessed === false).map((t) => t.id)));
      const unitOfChapter = new Map(syllabus.chapters.map((c) => [c.id, c.unit ?? '']));

      it('is a valid series file for the current academic year', () => {
        expect(FrozenSeriesFile.safeParse(file).success).toBe(true);
        expect(file.academic_year).toBe(syllabus.academic_year);
      });

      it('holds every planned series paper (3 unit tests, ≥ 6 mocks per variant, the May track) and nothing else', () => {
        expect(file.tests.map((t) => t.test.id).sort()).toEqual(seriesPapers.map((x) => x.spec.id).sort());
        expect(file.tests.filter((t) => t.test.paper_type === 'unit-test')).toHaveLength(3);
        const mocks = file.tests.filter((t) => t.test.paper_type === 'board');
        const variants = new Set(mocks.map((t) => t.series.key));
        for (const v of variants) expect(mocks.filter((t) => t.series.key === v).length).toBeGreaterThanOrEqual(6);
        if (subject.board === 'cbse' && subject.class === 10) expect(file.tests.filter((t) => t.series.track === 'second_exam').length).toBe(2 * variants.size);
      });

      it('every paper matches its blueprint exactly (sections, types, marks, choice groups, chapter scopes)', () => {
        const problems = file.tests.flatMap(({ test }) => {
          const bp = p.catalog.blueprints.find((b) => b.id === test.blueprint_id);
          if (!bp) return [`${test.id}: blueprint ${test.blueprint_id} not in the catalog`];
          return blueprintProblems(test, bp, (id) => questionById.get(id)).map((x) => `${test.id} ${x}`);
        });
        expect(problems).toEqual([]);
      });

      it('series metadata matches the plan (keys, titles, tracks, positions)', () => {
        for (const { test, series } of file.tests) {
          const planned = seriesPapers.find((x) => x.spec.id === test.id)!;
          expect(series).toMatchObject({ title: planned.seriesTitle, track: planned.track, position: planned.position });
          expect(test.chapter_ids).toEqual(planned.spec.chapters);
        }
      });

      it('uses only board-assessed, non-practice-only questions from the chapters in scope', () => {
        const bad = file.tests.flatMap(({ test }) =>
          questionIds(test).filter((id) => {
            const q = questionById.get(id)!;
            return !test.chapter_ids.includes(q.unit) || (q.topic_ids.length > 0 && q.topic_ids.every((t) => practiceOnly.has(t)));
          }),
        );
        expect(bad).toEqual([]);
      });

      it('board and May papers carry the syllabus unit marks exactly', () => {
        for (const { test } of file.tests.filter((t) => t.test.paper_type === 'board' || t.test.paper_type === 'board-second-exam')) {
          const targets = unitTargetsFor(syllabus, test.chapter_ids, test.total_marks);
          expect(targets, `${test.id}: syllabus units define the weightage`).not.toBeNull();
          const got = attemptedMarksBy(test, (id) => unitOfChapter.get(questionById.get(id)!.unit)!);
          expect(Object.fromEntries([...got].sort()), test.id).toEqual(Object.fromEntries(targets!.map((t) => [t.unit, t.marks]).sort()));
          // Both alternatives of an internal choice come from the same unit, so the weightage holds whichever is attempted.
          for (const s of test.sections)
            for (const g of s.choice_groups) expect(new Set(s.items.filter((i) => i.choice_group === g.id).map((i) => unitOfChapter.get(questionById.get(i.question_id)!.unit))).size, `${test.id} ${g.id}`).toBe(1);
        }
      });

      it('never repeats a question inside a series (mock overlap 0 %)', () => {
        const bySeries = new Map<string, string[]>();
        for (const { test, series } of file.tests) bySeries.set(series.key, [...(bySeries.get(series.key) ?? []), ...questionIds(test)]);
        for (const [key, ids] of bySeries) expect(new Set(ids).size, key).toBe(ids.length);
      });

      it('never puts two near-duplicate questions (or a former duplicate pair) in one paper', () => {
        const problems: string[] = [];
        for (const { test } of file.tests) {
          const ids = questionIds(test);
          const set = new Set(ids);
          for (const [a, b] of FORMER_DUPLICATE_PAIRS) if (set.has(a) && set.has(b)) problems.push(`${test.id}: ${a} + ${b}`);
          for (let i = 0; i < ids.length; i++)
            for (let j = i + 1; j < ids.length; j++) {
              const s = similarity(questionById.get(ids[i]!)!, questionById.get(ids[j]!)!);
              if (s >= 0.5) problems.push(`${test.id}: ${ids[i]} ~ ${ids[j]} (${Math.round(s * 100)}%)`);
            }
        }
        expect(problems).toEqual([]);
      });

      it('re-planning with the frozen file reuses every frozen paper unchanged (release idempotency)', () => {
        const bank = bankFromFiles(p, subject);
        const a = assembleSubject(plan, bank, file);
        const frozenIds = new Set(file.tests.map((t) => t.test.id));
        expect(a.requests.filter((r) => frozenIds.has(r.paper_id))).toEqual([]);
        for (const { test } of file.tests) expect(a.tests.find((x) => x.test.id === test.id)!.test.sections.map((s) => s.items.map((i) => i.question_id))).toEqual(test.sections.map((s) => s.items.map((i) => i.question_id)));
      });
    });
  }
});

describe('blueprint engine: discipline sections, unit weightage, practice-only topics, determinism', () => {
  const sci = p.catalog.subjectsById.get('cbse-10-science')!;
  const syl = p.catalog.syllabi.get(sci.id)!;
  const bank = bankFromFiles(p, sci);
  const plan = planSubjectTests(p.catalog, sci, { series: true, academicYear: syl.academic_year });

  it('assembles the same papers whatever order the bank is read in', () => {
    const papers = plan.papers.filter((x) => x.spec.id.endsWith('_mock_1') || x.spec.id.endsWith('_unit_2'));
    const a = assembleSubject({ ...plan, papers }, bank);
    const b = assembleSubject({ ...plan, papers }, { ...bank, items: [...bank.items].reverse() });
    expect(a.tests.length).toBe(2);
    expect(b.tests.map((t) => t.test)).toEqual(a.tests.map((t) => t.test));
  });

  it('fills discipline sections from their own chapters and hits the unit marks exactly', () => {
    const mock = plan.papers.find((x) => x.spec.id === 't_cbse10sci_mock_1')!;
    expect(mock.spec.unitTargets?.map((t) => t.marks)).toEqual([25, 25, 12, 13, 5]);
    const r = assemblePaper(mock.spec, bank.items);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const unit = new Map(bank.items.map((q) => [q.id, q.unit]));
    expect(blueprintProblems(r.test, mock.spec.blueprint, (id) => bank.items.find((q) => q.id === id))).toEqual([]);
    const biology = new Set(r.test.sections[0]!.items.map((i) => unit.get(i.question_id)!));
    expect([...biology].every((c) => /-ch(05|06|07|08|13)$/.test(c))).toBe(true);
  });

  it('meets unit weightage exactly or reports a generation request, never an off-weight paper', () => {
    const [c1, c2] = ['cbse-10-science-ch01', 'cbse-10-science-ch02'];
    const item = (type: 'mcq' | 'short', marks: number, count: number, choice: { attempt: number; of: number } | null = null) => ({ type, count, marks_each: marks, internal_choice: choice, competency: null, difficulty: null });
    const bp = { id: 'x-board', board: 'cbse', exam: 'cbse', class: 10, subject_id: 'cbse-10-science', paper_type: 'board', academic_year: '2026-27', duration_min: 30, total_marks: 6, mark_shares: {}, scope: 'syllabus', source_status: 'unverified', source: 'test', sections: [{ id: 'A', title: 'A', instructions: '', items: [item('mcq', 1, 2), item('short', 2, 4, { attempt: 1, of: 2 })] }] } as unknown as Blueprint;
    const q = (unit: string, type: 'mcq' | 'short', marks: number, n: number): BankItem[] => Array.from({ length: n }, (_, i) => ({ id: `q_x_${unit.slice(-4)}_${type}${i}`, version: 1, unit, type, marks, difficulty: 3, competency: 'understanding', topic_ids: [] }));
    const spec = { id: 't_x_mock_1', title: 'x', blueprint: bp, subjectId: 'cbse-10-science', chapters: [c1, c2], seed: 's', unitTargets: [{ unit: 'U1', chapters: [c1], marks: 3 }, { unit: 'U2', chapters: [c2], marks: 3 }] };
    // Unit 2 has only 2-mark questions: 3 marks are unreachable.
    const impossible = assemblePaper(spec, [...q(c1, 'mcq', 1, 3), ...q(c1, 'short', 2, 4), ...q(c2, 'short', 2, 4)]);
    expect(impossible.ok).toBe(false);
    if (!impossible.ok) expect(impossible.requests[0]!.reason).toMatch(/unit weightage/);
    // With 1-mark questions in unit 2 as well, both units get exactly 3 marks, choice pairs from one unit.
    const ok = assemblePaper(spec, [...q(c1, 'mcq', 1, 3), ...q(c1, 'short', 2, 4), ...q(c2, 'mcq', 1, 3), ...q(c2, 'short', 2, 4)]);
    expect(ok.ok).toBe(true);
    if (!ok.ok) return;
    const marks = attemptedMarksBy(ok.test, (id) => (id.includes('ch01') ? 'U1' : 'U2'));
    expect(Object.fromEntries(marks)).toEqual({ U1: 3, U2: 3 });
    for (const g of ok.test.sections[0]!.choice_groups) expect(new Set(ok.test.sections[0]!.items.filter((i) => i.choice_group === g.id).map((i) => i.question_id.slice(0, 9))).size).toBe(1);
  });

  it('keeps questions tagged only with board_assessed:false topics out of series papers', () => {
    const topic = 'cbse-10-science-ch01-t01';
    const items: BankItem[] = bank.items.map((q) => (q.unit.endsWith('-ch01') ? { ...q, topic_ids: [topic] } : q));
    const unitPaper = plan.papers.find((x) => x.spec.id === 't_cbse10sci_unit_1')!;
    const r = assemblePaper({ ...unitPaper.spec, practiceOnlyTopics: new Set([topic]) }, items);
    if (r.ok) expect(questionIds(r.test).some((id) => id.includes('_ch01_'))).toBe(false);
    else expect(r.requests.length).toBeGreaterThan(0);
  });

  it('frozen papers are reused (not re-assembled) and a missing question becomes a generation request', () => {
    const papers = plan.papers.filter((x) => x.seriesTitle && /_(mock_[12])$/.test(x.spec.id));
    const built = assembleSubject({ ...plan, papers }, bank);
    const frozen = toFrozenSeries(built, syl.academic_year, 'test');
    expect(frozen.tests).toHaveLength(2);
    // A bank in another order and with new questions still gives the frozen papers.
    const extra: BankItem[] = [...bank.items].reverse().concat([{ ...bank.items[0]!, id: 'q_cbse10sci_ch01_999' }]);
    const again = assembleSubject({ ...plan, papers }, { ...bank, items: extra } as Bank, frozen);
    expect(again.tests.map((t) => t.test.sections)).toEqual(built.tests.map((t) => t.test.sections));
    // A referenced question that is no longer published: the paper is a request, never silently rebuilt.
    const gone = questionIds(frozen.tests[0]!.test)[0]!;
    const missing = assembleSubject({ ...plan, papers }, { ...bank, items: bank.items.filter((q) => q.id !== gone) }, frozen);
    expect(missing.tests.map((t) => t.test.id)).toEqual([frozen.tests[1]!.test.id]);
    expect(missing.requests[0]).toMatchObject({ paper_id: frozen.tests[0]!.test.id, missing: 1 });
    expect(remapVersions(frozen.tests[0]!.test, new Map()).ok).toBe(false);
  });
});
