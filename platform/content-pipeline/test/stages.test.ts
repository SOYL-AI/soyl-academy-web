/** Stages 5–8 without a database: verify, originality, the blueprint engine and series planner, tts. */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { TestDefinition, type Blueprint, type Question } from '@soyl/shared/content/index';
import { generateCommand } from '../src/commands/generate';
import { lintCommand } from '../src/commands/lint';
import { verifyCommand } from '../src/commands/verify';
import { originalityCommand } from '../src/commands/originality';
import { ttsCommand } from '../src/commands/tts';
import { assembleCommand, assembleSubject, bankFromFiles } from '../src/commands/assemble';
import { assemblePaper, type BankItem } from '../src/assemble/engine';
import { blueprintFor, partition, planSubjectTests, variantOf, variantsFor } from '../src/assemble/series';
import { MOCK_FLAG } from '../src/mock-fixtures';
import { ReferenceIndex, nearDuplicates, words } from '../src/originality/ngrams';
import { deterministicChecks, lastNumericResult, runJavaScript } from '../src/verify/checks';
import { parseOgg } from '../src/tts/ogg-opus';
import { SCOPE, UNIT, testPipeline } from './helpers';

const unit = 'cbse-10-science-ch01';
const topic = `${unit}-t01`;
const q = (extra: Record<string, unknown>): Question =>
  ({
    id: 'q_x_001',
    unit,
    type: 'short',
    stem_md: 'Explain.',
    options: [],
    match_right: [],
    answer: { model_answer_md: 'Because.' },
    solution_md: 'Step 1.',
    marking_scheme: [{ step: 'Point', marks: 2 }],
    marks: 2,
    difficulty: 3,
    competency: 'application',
    bloom: 'apply',
    topic_ids: [topic],
    expected_time_sec: 120,
    assets: [],
    language: 'en',
    children: [],
    status: 'draft',
    version: 1,
    ...extra,
  }) as Question;
const checks = (x: Question) => deterministicChecks(x).map((f) => f.check);

describe('stage 5 deterministic checks', () => {
  const r = String.raw;
  it('re-solves numbers inside solutions and the final value of numericals', () => {
    expect(checks(q({ solution_md: r`$12 \times 2 = 26$` }))).toContain('numeric.arithmetic');
    const num = (solution: string, value: number) => q({ type: 'numerical', answer: { value, tolerance: 0, unit: null }, solution_md: solution });
    expect(checks(num(r`$v = 12 \times 2 = 24$ m/s`, 24))).toEqual([]);
    expect(checks(num(r`$v = 12 \times 2 = 24$ so the answer is 24`, 25))).toContain('numeric.final');
    expect(lastNumericResult(r`First $a = 3 + 4 = 7$, then $b = 7 \times 2 = 14$.`)).toBe(14);
  });
  it('checks equations, option texts, the solution letter, blanks and match pairs', () => {
    expect(checks(q({ solution_md: r`$\ce{H2 + O2 -> H2O}$` }))).toContain('chem.balance');
    expect(checks(q({ solution_md: r`The skeletal equation $\ce{H2 + O2 -> H2O}$ is balanced next.` }))).not.toContain('chem.balance');
    const options = ['a', 'b', 'c', 'd'].map((id) => ({ id, text_md: `choice ${id}` }));
    const mcq = (extra: Record<string, unknown>) => q({ type: 'mcq', marks: 1, marking_scheme: [{ step: 'x', marks: 1 }], options, answer: { option_ids: ['c'] }, ...extra });
    expect(checks(mcq({ solution_md: 'The correct answer is (b) because …' }))).toContain('objective.solution');
    expect(checks(mcq({ solution_md: 'The correct answer is (c) because …' }))).toEqual([]);
    expect(checks(mcq({ options: [...options.slice(0, 3), { id: 'd', text_md: 'choice a' }] }))).toContain('objective.options');
    // Case-distinct options are different answers (genotypes, chemical symbols).
    const genotypes = ['TT', 'Tt', 'tt', 'A mixture of TT and tt'].map((text_md, i) => ({ id: 'abcd'[i]!, text_md }));
    expect(checks(mcq({ options: genotypes, solution_md: 'The correct answer is (c) because …' }))).not.toContain('objective.options');
    expect(checks(q({ type: 'fill-blank', stem_md: 'The gas is ___.', answer: { blanks: [{ accepted: ['oxygen'] }] }, solution_md: 'It is hydrogen.' }))).toContain('objective.blanks');
    const match = q({ type: 'match', options: ['1', '2', '3'].map((id) => ({ id, text_md: id })), match_right: ['p', 'q', 'r'].map((id) => ({ id, text_md: id })), answer: { pairs: [{ left_id: '1', right_id: 'p' }, { left_id: '2', right_id: 'p' }] } });
    expect(checks(match)).toEqual(expect.arrayContaining(['objective.match']));
  });
  it('runs javascript code-output items in a sandbox and compares the output', () => {
    const code = (src: string, output: string) => q({ type: 'code-output', marks: 1, marking_scheme: [{ step: 'x', marks: 1 }], stem_md: `\`\`\`javascript\n${src}\n\`\`\``, answer: { output } });
    expect(checks(code('console.log(2 + 3)', '5'))).toEqual([]);
    expect(checks(code('console.log(2 + 3)', '6'))).toContain('code.output');
    expect(runJavaScript('console.log.constructor("return process")()').error).toMatch(/disallowed/);
    expect(runJavaScript('while (true) {}').error).toMatch(/timed out/);
    expect(runJavaScript('this.constructor.constructor("return process")()').error).toBeTruthy();
  });
  it('passes every hand-authored chapter and exemplar (verify --authored)', async () => {
    const { p } = testPipeline();
    const r = await verifyCommand(p, { board: 'cbse', class: 10 }, { authored: true });
    expect(r.reports.length).toBeGreaterThanOrEqual(4);
    expect(r.reports.flatMap((x) => x.flags.filter((f) => f.severity !== 'minor'))).toEqual([]);
    expect(r.exitCode).toBe(0);
  }, 120_000);
});

describe('stage 5 verify on generated content (mock provider)', () => {
  it('regenerates a flagged question, re-verifies it, and marks the rest auto_verified', async () => {
    const { p } = testPipeline();
    await generateCommand(p, SCOPE);
    await lintCommand(p, SCOPE);
    const file = path.join(p.paths.outDir, UNIT, 'questions.json');
    const bank = JSON.parse(fs.readFileSync(file, 'utf8'));
    const target = bank.questions.find((x: Question) => x.type === 'short');
    target.stem_md = `${MOCK_FLAG} ${target.stem_md}`;
    fs.writeFileSync(file, JSON.stringify(bank));
    const r = await verifyCommand(p, SCOPE);
    expect(r.exitCode).toBe(0);
    expect(r.reports[0]!.regenerated).toEqual([target.id]);
    const after = JSON.parse(fs.readFileSync(file, 'utf8')).questions as Question[];
    expect(after.every((x) => x.status === 'auto_verified')).toBe(true);
    expect(after.find((x) => x.id === target.id)!.stem_md).not.toContain(MOCK_FLAG);
    // Resume: a second run has nothing left to check.
    const again = await verifyCommand(p, SCOPE);
    expect(again.reports[0]!.flags).toEqual([]);
  }, 120_000);

  it('gives up after 2 regenerations and marks the item needs_review', async () => {
    const { p } = testPipeline();
    await generateCommand(p, SCOPE);
    await lintCommand(p, SCOPE);
    const file = path.join(p.paths.outDir, UNIT, 'questions.json');
    const bank = JSON.parse(fs.readFileSync(file, 'utf8'));
    const target = bank.questions.find((x: Question) => x.type === 'short');
    target.solution_md = String.raw`$2 + 2 = 5$`;
    fs.writeFileSync(file, JSON.stringify(bank));
    let calls = 0;
    const r = await verifyCommand(p, SCOPE, { regenerate: async (old) => (calls++, { ...old }) });
    expect(calls).toBe(2);
    expect(r.reports[0]!.needs_review).toEqual([target.id]);
    expect(r.exitCode).toBe(2);
    const stage = await p.store.getUnitStage(UNIT, 'verify');
    expect(stage!.items[`q:${target.id}`]!.status).toBe('needs_review');
  }, 120_000);
});

describe('stage 6 originality', () => {
  it('measures n-gram overlap with reference texts across scripts', () => {
    const idx = new ReferenceIndex(6);
    idx.add('book.txt', 'The quick brown fox jumps over the lazy dog near the river bank today.');
    const o = idx.overlap('In class we read that the quick brown fox jumps over the lazy dog near the river.');
    expect(o.longestRun).toBeGreaterThanOrEqual(11);
    expect(o.sources).toEqual(['book.txt']);
    expect(idx.overlap('An entirely original sentence about photosynthesis in leaves.').shared).toBe(0);
    expect(words('बालगोबिन भगत की दिनचर्या, $x^2$ और `code`')).toEqual(['बालगोबिन', 'भगत', 'की', 'दिनचर्या', 'और']);
  });
  it('finds near-duplicate questions through the inverted index', () => {
    const base = 'A student heats copper powder in a china dish and observes the surface turning black. Name the black substance formed.';
    const d = nearDuplicates(
      [
        { id: 'a', unit: 'u1', text: base },
        { id: 'b', unit: 'u2', text: `${base} Explain.` },
        { id: 'c', unit: 'u2', text: 'Describe how magnesium ribbon burns in air and what is left behind after the reaction completes.' },
      ],
      { n: 5, threshold: 0.7, minWords: 10 },
    );
    expect(d.map((x) => [x.a.id, x.b.id].sort().join())).toEqual(['a,b']);
  });
  it('flags reference overlap and is a no-op notice without reference texts', async () => {
    const { p, logs, dir } = testPipeline();
    const none = await originalityCommand(p, { board: 'cbse', class: 10, subject: 'science', chapter: 1 }, { authored: true });
    expect(none.referenceTexts).toBe(0);
    expect(logs.join('\n')).toMatch(/no reference texts/);
    const refDir = path.join(dir, 'reference');
    fs.mkdirSync(refDir, { recursive: true });
    const exemplar = JSON.parse(fs.readFileSync(path.join(p.paths.templatesDir, 'exemplars', 'science', UNIT, 'release.json'), 'utf8'));
    fs.writeFileSync(path.join(refDir, 'textbook.txt'), `Some unrelated text. ${exemplar.questions[5].stem_md} More unrelated text.`);
    const { p: p2 } = testPipeline({}, {});
    p2.paths.referenceDir = refDir;
    const r = await originalityCommand(p2, { board: 'cbse', class: 10, subject: 'science', chapter: 1 }, { authored: true });
    expect(r.flags.some((f) => f.check === 'reference.overlap' && f.ref === exemplar.questions[5].id)).toBe(true);
    expect(r.exitCode).toBe(1);
  }, 120_000);
});

describe('stage 7 blueprint engine', () => {
  const bp = (sections: Blueprint['sections'], total: number, extra: Partial<Blueprint> = {}): Blueprint => ({
    id: 'bp-test',
    board: 'cbse',
    exam: 'cbse',
    class: 10,
    subject_id: 'cbse-10-science',
    paper_type: 'chapter-test-short',
    academic_year: '2026-27',
    duration_min: 40,
    total_marks: total,
    mark_shares: {},
    scope: 'chapter',
    sections,
    source_status: 'unverified',
    source: 'test',
    ...extra,
  });
  const item = (type: BankItem['type'], marks: number, count: number, choice?: { attempt: number; of: number }) => ({ type, count, marks_each: marks, internal_choice: choice ?? null, competency: null, difficulty: null });
  const bank: BankItem[] = [
    ...Array.from({ length: 12 }, (_, i) => ({ id: `q_m${i}`, version: 1, unit, type: 'mcq' as const, marks: 1, difficulty: (i % 5) + 1, competency: 'recall' as const, topic_ids: [`${unit}-t0${(i % 3) + 1}`] })),
    ...Array.from({ length: 6 }, (_, i) => ({ id: `q_s${i}`, version: 2, unit, type: 'short' as const, marks: 3, difficulty: (i % 5) + 1, competency: 'application' as const, topic_ids: [`${unit}-t0${(i % 3) + 1}`] })),
    { id: 'q_n1', version: 1, unit, type: 'numerical', marks: 3, difficulty: 3, competency: 'application', topic_ids: [topic] },
  ];
  const spec = (b: Blueprint, seed = 's1', exclude?: Set<string>) => ({ id: 't_test_1', title: 'Test', blueprint: b, subjectId: 'cbse-10-science', chapters: [unit], seed, exclude });

  it('fills a blueprint exactly, with choice groups, question versions and a valid TestDefinition', () => {
    const b = bp([{ id: 'A', title: 'A', instructions: '', items: [item('mcq', 1, 4)] }, { id: 'B', title: 'B', instructions: '', items: [item('short', 3, 4, { attempt: 1, of: 2 })] }], 10);
    const r = assemblePaper(spec(b), bank);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(TestDefinition.parse(r.test).total_marks).toBe(10);
    expect(r.test.sections[1]!.choice_groups).toEqual([{ id: 'B-c1', attempt: 1 }, { id: 'B-c2', attempt: 1 }]);
    expect(r.test.sections[1]!.items.filter((i) => i.question_id.startsWith('q_s')).every((i) => i.question_version === 2)).toBe(true);
    const ds = r.test.sections[0]!.items.map((i) => bank.find((x) => x.id === i.question_id)!.difficulty);
    expect([...ds].sort()).toEqual(ds); // easier first inside a section
  });
  it('is deterministic by seed and never repeats within a series (exclusion set)', () => {
    const b = bp([{ id: 'A', title: 'A', instructions: '', items: [item('mcq', 1, 5)] }], 5);
    const a1 = assemblePaper(spec(b, 'x'), bank);
    const a2 = assemblePaper(spec(b, 'x'), bank);
    expect(JSON.stringify(a1)).toBe(JSON.stringify(a2));
    if (!a1.ok) throw new Error('expected a paper');
    const second = assemblePaper(spec(b, 'y', new Set(a1.used)), bank);
    if (!second.ok) throw new Error('expected a second paper');
    expect(second.used.some((id) => a1.used.includes(id))).toBe(false);
    const third = assemblePaper(spec(b, 'z', new Set([...a1.used, ...second.used])), bank);
    expect(third.ok).toBe(false);
    if (!third.ok) expect(third.requests[0]).toMatchObject({ type: 'mcq', marks: 1, missing: 3 });
  });
  it('lets a short slot take a numerical of the same marks, and emits generation requests for what is missing', () => {
    const b = bp([{ id: 'B', title: 'B', instructions: '', items: [item('short', 3, 7), item('long', 5, 2)] }], 31);
    const r = assemblePaper(spec(b), bank);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.requests).toEqual([expect.objectContaining({ section: 'B', type: 'long', marks: 5, missing: 2, chapters: [unit] })]);
  });
  it('refuses a multi-chapter paper when chapters in scope have no questions', () => {
    const b = bp([{ id: 'A', title: 'A', instructions: '', items: [item('mcq', 1, 2)] }], 2, { paper_type: 'board', scope: 'syllabus' });
    const r = assemblePaper({ ...spec(b), chapters: [unit, 'cbse-10-science-ch09'] }, bank);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.requests[0]).toMatchObject({ type: '*', chapters: ['cbse-10-science-ch09'] });
  });
  it('plans the CBSE 10 series: chapter tests, 3 unit tests, 6 mocks per variant and the May track', () => {
    const { p } = testPipeline();
    const maths = p.catalog.subjectsById.get('cbse-10-mathematics')!;
    expect(variantsFor(p.catalog, maths).map((v) => v.key)).toEqual(['', 'basic']);
    expect(variantOf(blueprintFor(p.catalog, maths, 'board', 'basic')!).name).toBe('Basic');
    expect(blueprintFor(p.catalog, maths, 'chapter-test-short')!.subject_id).toBeNull(); // class default
    const plan = planSubjectTests(p.catalog, maths, { series: true, academicYear: '2026-27' });
    const ids = plan.papers.map((x) => x.spec.id);
    expect(ids.filter((id) => /_mock_\d$/.test(id) && !id.includes('basic'))).toHaveLength(6);
    expect(ids.filter((id) => /_basic_mock_\d$/.test(id))).toHaveLength(6);
    expect(ids.filter((id) => /_may_\d$/.test(id)).length).toBeGreaterThanOrEqual(2);
    expect(ids.filter((id) => /_unit_\d$/.test(id))).toHaveLength(3);
    expect(ids.filter((id) => /_ch\d{2}_(short|long)$/.test(id))).toHaveLength(2 * p.catalog.syllabi.get(maths.id)!.chapters.length);
    const syl = p.catalog.syllabi.get(maths.id)!;
    expect(partition(syl, syl.chapters.map((c) => c.id), 3).flat()).toEqual(syl.chapters.map((c) => c.id));
  });
  it('plans term papers for a Class 9 subject', () => {
    const { p } = testPipeline();
    const s = p.catalog.subjects.find((x) => x.id === 'cbse-9-science' && p.catalog.syllabi.has(x.id)) ?? p.catalog.subjects.find((x) => x.class === 9 && p.catalog.syllabi.has(x.id))!;
    const plan = planSubjectTests(p.catalog, s, { series: true, academicYear: '2026-27' });
    expect(plan.papers.filter((x) => ['half-yearly', 'annual', 'term'].includes(x.spec.blueprint.paper_type)).length).toBeGreaterThanOrEqual(2);
  });
  it('assembles chapter tests for authored chapters from files and records generation requests', async () => {
    const { p } = testPipeline();
    const science = p.catalog.subjectsById.get('cbse-10-science')!;
    const bankFiles = bankFromFiles(p, science);
    expect(bankFiles.items.length).toBeGreaterThan(70);
    const plan = planSubjectTests(p.catalog, science, { series: false, academicYear: '2026-27', chapters: [1] });
    const a = assembleSubject(plan, { ...bankFiles, chapterTests: new Map() });
    expect(a.tests.map((t) => t.test.paper_type)).toEqual(['chapter-test-short', 'chapter-test-long']);
    const [short, long] = a.tests.map((t) => new Set(t.test.sections.flatMap((s) => s.items.map((i) => i.question_id))));
    expect([...short!].some((id) => long!.has(id))).toBe(false); // disjoint
    // With an empty bank every paper of the series becomes a generation request (never a silent gap).
    const seriesPlan = planSubjectTests(p.catalog, science, { series: true, academicYear: '2026-27' });
    const starved = assembleSubject(seriesPlan, { ...bankFiles, items: [], chapterTests: new Map() });
    expect(starved.requests.some((x) => x.paper_id === 't_cbse10sci_mock_1')).toBe(true);
    // From real files, every mock paper is either assembled or requested, however much content exists today.
    const r = await assembleCommand(p, { board: 'cbse', class: 10, subject: 'science' }, { source: 'files', series: true });
    const res = r.results[0]!;
    const assembled = new Set(res.tests.map((t) => t.test.id));
    const requested = new Set(res.requests.map((x) => x.paper_id));
    expect(assembled.has('t_cbse10sci_mock_1') || requested.has('t_cbse10sci_mock_1')).toBe(true);
    const file = path.join(p.paths.outDir, 'assemble', 'cbse-10-science', 'generation-requests.json');
    expect(JSON.parse(fs.readFileSync(file, 'utf8')).requests.length).toBe(res.requests.length);
    if (res.requests.length) {
      const stages = await p.store.listUnitStages({ stage: 'assemble' });
      expect(stages.flatMap((s) => Object.values(s.items)).some((i) => i.status === 'pending' && i.key.startsWith('request:'))).toBe(true);
    }
  }, 120_000);
});

describe('stage 8 tts (mock speech, local blob store)', () => {
  it('fills slide.audio with valid Ogg Opus in the blob store and skips unchanged slides', async () => {
    const { p } = testPipeline();
    await generateCommand(p, SCOPE);
    const first = await ttsCommand(p, SCOPE);
    expect(first.units[0]!.synthesized).toBeGreaterThan(10);
    const deck = JSON.parse(fs.readFileSync(path.join(p.paths.outDir, UNIT, 'deck.p1.json'), 'utf8'));
    const audio = deck.slides[0].audio;
    expect(audio.key).toMatch(/^audio\/cbse-10-science-ch01\/deck\.p1\/s01-[0-9a-f]{12}\.ogg$/);
    const bytes = await p.blob.get(audio.key);
    expect(parseOgg(bytes!).pages.length).toBeGreaterThan(2);
    const again = await ttsCommand(p, SCOPE);
    expect(again.units[0]!.synthesized).toBe(0);
  }, 120_000);
});
