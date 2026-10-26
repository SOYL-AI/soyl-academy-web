/** Stage-4 lint rules for contract v2: new question types, word limits, passage origin, underline, scripts, literature review. */
import { describe, expect, it } from 'vitest';
import { lintBundle, type Finding, type LintContext } from '../src/lint/index';
import { checkLiterature } from '../src/lint/text';

const unit = 'cbse-10-science-ch01';
const topic = `${unit}-t01`;
const ctx: LintContext = { unit, family: 'science', classLevel: 10, language: 'en', literature: false, topicIds: null, requirePipelineProvenance: false };
const q = (extra: Record<string, unknown>) => ({
  id: 'q_x_001',
  unit,
  type: 'short',
  stem_md: 'Explain the reaction.',
  answer: { model_answer_md: 'Because the reactants combine to form a single product.' },
  solution_md: 'Step 1: identify reactants. Step 2: state the product.',
  marking_scheme: [{ step: 'Point', marks: 2 }],
  marks: 2,
  difficulty: 3,
  competency: 'application',
  bloom: 'apply',
  topic_ids: [topic],
  expected_time_sec: 120,
  ...extra,
});
const lint = (questions: unknown[], c: Partial<LintContext> = {}): Finding[] => lintBundle({ decks: [], questions }, { ...ctx, ...c }).findings;
const rules = (f: Finding[], severity?: 'error' | 'warning') => f.filter((x) => !severity || x.severity === severity).map((x) => x.rule);

describe('v2 question types in lint', () => {
  it('passes a clean writing task and warns when the model answer misses the word limit', () => {
    const writing = q({
      type: 'writing',
      marks: 3,
      format: 'notice',
      word_limit: { min: 8, max: 12 },
      rubric: [{ criterion: 'Format', marks: 1 }, { criterion: 'Content', marks: 2, descriptor_md: 'Date, venue and time' }],
      marking_scheme: [{ step: 'Format', marks: 1 }, { step: 'Content', marks: 2 }],
      answer: { model_answer_md: 'NOTICE: The science fair is on Friday in the school hall.' },
    });
    expect(rules(lint([writing]))).not.toContain('answer.word-limit');
    const long = { ...writing, answer: { model_answer_md: 'word '.repeat(40) } };
    expect(rules(lint([long]), 'warning')).toContain('answer.word-limit');
    expect(rules(lint([{ ...writing, word_limit: { min: 10, max: 5000 } }]), 'error')).toContain('writing.word-limit');
  });

  it('applies word limits to short answers too', () => {
    expect(rules(lint([q({ word_limit: { min: 30, max: 40 } })]), 'warning')).toContain('answer.word-limit');
  });

  it('does not read code as maths or HTML in code-output stems', () => {
    const code = q({
      type: 'code-output',
      marks: 1,
      marking_scheme: [{ step: 'Output', marks: 1 }],
      stem_md: 'What is printed?\n\n```python\nprice = "$5"\nprint("<b>" + price + "</b>")\n```',
      answer: { output: '<b>$5</b>' },
    });
    const f = lint([code]);
    expect(rules(f)).not.toContain('math.katex');
    expect(rules(f)).not.toContain('banned.html');
    const withInput = { ...code, stem_md: '```python\nx = input()\nprint(x)\n```' };
    expect(rules(lint([withInput]), 'warning')).toContain('code.input');
  });

  it('warns when ordering items are already in order', () => {
    const items = ['p', 'q', 'r'].map((id) => ({ id, text_md: `item ${id}` }));
    const base = q({ type: 'ordering', marks: 1, marking_scheme: [{ step: 'Order', marks: 1 }], options: items });
    expect(rules(lint([{ ...base, answer: { order: ['p', 'q', 'r'] } }]), 'warning')).toContain('ordering.shuffled');
    expect(rules(lint([{ ...base, answer: { order: ['r', 'p', 'q'] } }]))).not.toContain('ordering.shuffled');
  });

  it('checks map items: map id and one mark per place', () => {
    const map = q({ type: 'map', marks: 2, marking_scheme: [{ step: 'A', marks: 1 }, { step: 'B', marks: 1 }], answer: { places: [{ id: 'A', name: 'Chennai' }] } });
    expect(rules(lint([map]), 'warning')).toEqual(expect.arrayContaining(['map.id', 'map.marks']));
  });

  it('refuses licensed excerpts and asks literature passages for their origin', () => {
    const child = (id: string) => q({ id, marks: 1, marking_scheme: [{ step: 'x', marks: 1 }] });
    const src = q({ type: 'source-based', marks: 2, passage_md: 'A SOYL paragraph.', children: [child('a'), child('b')], answer: { model_answer_md: 'See parts.' } });
    expect(rules(lint([{ ...src, passage_origin: 'licensed-excerpt' }]), 'error')).toContain('passage.licensed');
    expect(rules(lint([src], { literature: true }), 'warning')).toContain('passage.origin');
    expect(rules(lint([{ ...src, passage_origin: 'soyl-commentary' }], { literature: true }))).not.toContain('passage.origin');
  });

  it('checks the underline marker', () => {
    expect(rules(lint([q({ stem_md: 'Identify the ++underlined++ word.' })]))).not.toContain('markdown.underline');
    expect(rules(lint([q({ stem_md: 'Identify the ++underlined word.' })]), 'error')).toContain('markdown.underline');
    expect(rules(lint([q({ stem_md: 'C++ is a language.' })]))).not.toContain('markdown.underline');
  });
});

describe('literature review flag', () => {
  it('lists quoted spans of 8–25 words as warnings', () => {
    const r = checkLiterature('The narrator says “one two three four five six seven eight nine” here.');
    expect(r.map((i) => [i.rule, i.severity])).toEqual([['literature.quote-review', 'warning']]);
    expect(checkLiterature('He said “only a short quote”.')).toEqual([]);
  });
});

describe('script rules for Hindi (and other Indic languages)', () => {
  const hiQ = (extra: Record<string, unknown>) =>
    q({ stem_md: 'वाक्य का भेद लिखिए।', solution_md: 'यह सरल वाक्य है।', answer: { model_answer_md: 'सरल वाक्य' }, marking_scheme: [{ step: 'सही भेद', marks: 2 }], ...extra });
  const hi = { language: 'hi', family: 'hindi-language' as const };
  it('passes clean Devanagari', () => {
    expect(rules(lint([hiQ({})], hi)).filter((r) => r.startsWith('script') || r.startsWith('language'))).toEqual([]);
  });
  it('flags Latin runs, malformed text and non-standard spelling', () => {
    expect(rules(lint([hiQ({ stem_md: 'वाक्य this is English का भेद लिखिए।' })], hi))).toContain('script.latin-run');
    expect(rules(lint([hiQ({ solution_md: 'ा गलत है।' })], hi))).toContain('script.well-formed');
    expect(rules(lint([hiQ({ solution_md: 'वे घर गये।' })], hi), 'warning')).toContain('language.spelling');
    expect(rules(lint([hiQ({ stem_md: 'Write the type of the sentence: राम' })], hi))).toContain('script.majority');
  });
  it('applies to other scripts by language', () => {
    const ta = q({ stem_md: 'This stem is in English only.' });
    expect(rules(lint([ta], { language: 'ta' }))).toContain('language.script');
  });
});

describe('maths producer feedback (M2)', () => {
  const r = String.raw;
  it('flags command names that lost their backslash without a brace, and control characters in maths', () => {
    expect(rules(lint([q({ solution_md: r`So $x Rightarrow y$.` })]), 'error')).toContain('latex.backslash');
    expect(rules(lint([q({ solution_md: r`Then $a ne b$ and $3 times 4$.` })]), 'error')).toContain('latex.backslash');
    expect(rules(lint([q({ solution_md: 'Then $a \ne b$.' })]), 'error')).toContain('latex.backslash'); // "\n" + "e" inside inline maths
    expect(rules(lint([q({ solution_md: r`$x \Rightarrow y$, $a \ne b$, $3 \times 4 = 12$, $\text{times table}$, $F_{net}$` })]))).not.toContain('latex.backslash');
  });
  it('lets deliberately false statements opt out of the arithmetic rule', () => {
    expect(rules(lint([q({ solution_md: r`Step 1: $2 + 3 = 6$.` })]), 'error')).toContain('math.arithmetic');
    expect(rules(lint([q({ solution_md: r`Riya wrote $2 + 3 = 6$, which is wrong; the sum is $5$.` })]))).not.toContain('math.arithmetic');
    expect(rules(lint([q({ solution_md: r`Note that $2 + 3 \ne 6$.` })]))).not.toContain('math.arithmetic');
  });
  it('warns when MCQ keys are skewed to one letter', () => {
    const opts = ['a', 'b', 'c', 'd'].map((id) => ({ id, text_md: `option ${id}` }));
    const mcq = (i: number, key: string) => q({ id: `q_x_${100 + i}`, type: 'mcq', marks: 1, marking_scheme: [{ step: 'c', marks: 1 }], options: opts, answer: { option_ids: [key] } });
    const skewed = Array.from({ length: 10 }, (_, i) => mcq(i, i < 7 ? 'b' : 'a'));
    expect(rules(lint(skewed), 'warning')).toContain('balance.answer-keys');
    const spread = Array.from({ length: 12 }, (_, i) => mcq(i, 'abcd'[i % 4]!));
    expect(rules(lint(spread), 'warning')).not.toContain('balance.answer-keys');
  });
  it('checks marked plot points and zeros, and accepts vlines/hlines', async () => {
    const { checkVisual } = await import('../src/lint/visual');
    const plot = (spec: Record<string, unknown>) =>
      checkVisual({ kind: 'plot', spec: { x: { min: -5, max: 5 }, y: { min: -10, max: 10 }, functions: [{ expr: 'x^2 - 4' }], points: [], series: [], grid: true, ...spec } as never, alt: 'a parabola plot' }).issues.map((i) => `${i.rule}: ${i.message}`);
    expect(plot({ points: [{ at: [-2, 0] }, { at: [2, 0] }, { at: [0, -4] }] })).toEqual([]);
    expect(plot({ points: [{ at: [1, 1] }] }).join()).toMatch(/not on any plotted curve/);
    expect(plot({ points: [{ at: [1, 1], on_curve: false }] })).toEqual([]);
    expect(plot({ points: [{ at: [2, 0] }] }).join()).toMatch(/zero at x ≈ -2/);
    expect(plot({ vlines: [{ x: 3, label: '$x = 3$', dashed: true }], points: [{ at: [3, 7] }] }).join()).not.toMatch(/not on any/);
    expect(plot({ vlines: [{ x: 9 }] }).join()).toMatch(/outside the x range/);
    expect(plot({ functions: [{ expr: '(x-1)^2' }], points: [{ at: [1, 0] }] })).toEqual([]);
  });
});
