/** Contract v2 (M2): new question types, word limits, passage origin, blueprint variant, underline, grading, scripts. */
import { describe, expect, it } from 'vitest';
import {
  Blueprint,
  OBJECTIVE_TYPES,
  Question,
  SCRIPTS,
  checkNarration,
  checkScriptRelease,
  checkScriptText,
  codeBlocks,
  codeOutputMatches,
  isObjective,
  normaliseCodeOutput,
  orderingMatches,
  orderingPositionsCorrect,
  scriptForLanguage,
  underlineSpans,
  unmatchedUnderline,
} from './index';

const unit = 'cbse-10-english-language-and-literature-ch01';
const topic = `${unit}-t01`;
const base = (extra: Record<string, unknown>) => ({
  id: 'q_x_001',
  unit,
  type: 'short',
  stem_md: 'Explain.',
  answer: { model_answer_md: 'Because…' },
  solution_md: 'Step 1 …',
  marking_scheme: [{ step: 'Point', marks: 2 }],
  marks: 2,
  difficulty: 3,
  competency: 'application',
  bloom: 'apply',
  topic_ids: [topic],
  expected_time_sec: 120,
  ...extra,
});
const ok = (q: unknown) => {
  const r = Question.safeParse(q);
  return r.success ? [] : r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
};

const writing = base({
  type: 'writing',
  marks: 5,
  stem_md: 'Write a notice for your school notice board about a book fair.',
  format: 'notice',
  word_limit: { min: 50, max: 60 },
  rubric: [
    { criterion: 'Format', marks: 1 },
    { criterion: 'Content', marks: 2 },
    { criterion: 'Expression', marks: 2, descriptor_md: 'Accurate, fluent, appropriate tone.' },
  ],
  marking_scheme: [{ step: 'Format', marks: 1 }, { step: 'Content', marks: 2 }, { step: 'Expression', marks: 2 }],
});

describe('writing', () => {
  it('accepts a writing task with format, word limit and rubric', () => expect(ok(writing)).toEqual([]));
  it('requires format, word_limit and rubric, and a rubric that sums to the marks', () => {
    const { format: _f, word_limit: _w, rubric: _r, ...bare } = writing as Record<string, unknown>;
    expect(ok(bare).join(' ')).toMatch(/format.*word_limit.*rubric/s);
    expect(ok({ ...writing, rubric: [{ criterion: 'All', marks: 4 }] }).join()).toMatch(/rubric totals 4/);
    expect(ok({ ...writing, word_limit: { min: 80, max: 60 } }).join()).toMatch(/must not exceed/);
    expect(ok({ ...writing, format: 'sonnet' }).length).toBeGreaterThan(0);
  });
  it('is not objective', () => expect(isObjective('writing')).toBe(false));
});

describe('word_limit and v2 fields on other types', () => {
  it('is optional on short and long, refused on mcq', () => {
    expect(ok(base({ word_limit: { min: 30, max: 40 } }))).toEqual([]);
    const mcq = base({ type: 'mcq', marks: 1, marking_scheme: [{ step: 'c', marks: 1 }], options: ['a', 'b', 'c'].map((id) => ({ id, text_md: id })), answer: { option_ids: ['a'] } });
    expect(ok(mcq)).toEqual([]);
    expect(ok({ ...mcq, word_limit: { min: 1, max: 2 } }).join()).toMatch(/word_limit is only/);
    expect(ok({ ...mcq, format: 'essay' }).join()).toMatch(/format is only/);
    expect(ok({ ...mcq, map_id: 'india-political' }).join()).toMatch(/map_id is only/);
  });
});

describe('passage_origin', () => {
  const child = (id: string) => ({ ...base({}), id, marks: 1, marking_scheme: [{ step: 'x', marks: 1 }] });
  const caseQ = base({ type: 'case-based', marks: 2, marking_scheme: [{ step: 'parts', marks: 2 }], passage_md: 'SOYL passage.', children: [child('a'), child('b')] });
  it('is allowed on case/source items and refused elsewhere', () => {
    for (const o of ['soyl-original', 'soyl-commentary', 'licensed-excerpt']) expect(ok({ ...caseQ, passage_origin: o })).toEqual([]);
    expect(ok({ ...caseQ, passage_origin: 'textbook' }).length).toBeGreaterThan(0);
    expect(ok(base({ passage_origin: 'soyl-original' })).join()).toMatch(/passage_origin is only/);
  });
});

describe('map', () => {
  const map = base({
    type: 'map',
    marks: 2,
    stem_md: 'On the outline map of India, locate and label: (A) a major iron-ore port on the west coast; (B) the Tehri dam.',
    map_id: 'india-political',
    answer: { places: [{ id: 'A', name: 'Mormugao', kind: 'port' }, { id: 'B', name: 'Tehri Dam', accepted: ['Tehri'], kind: 'dam' }] },
    marking_scheme: [{ step: 'A located and named', marks: 1 }, { step: 'B located and named', marks: 1 }],
  });
  it('accepts places and a map id; is self/AI evaluated', () => {
    expect(ok(map)).toEqual([]);
    expect(isObjective('map')).toBe(false);
  });
  it('rejects duplicate places, a bad map id or a non-place answer', () => {
    expect(ok({ ...map, answer: { places: [{ id: 'A', name: 'x' }, { id: 'A', name: 'y' }] } }).join()).toMatch(/duplicate place/);
    expect(ok({ ...map, map_id: 'India Map' }).length).toBeGreaterThan(0);
    expect(ok({ ...map, answer: { model_answer_md: 'x' } }).join()).toMatch(/places/);
  });
});

describe('code-output', () => {
  const code = base({
    type: 'code-output',
    marks: 1,
    stem_md: 'What is the output?\n\n```python\nfor i in range(3):\n    print(i, end=" ")\n```',
    answer: { output: '0 1 2 ' },
    marking_scheme: [{ step: 'Exact output', marks: 1 }],
  });
  it('accepts a fenced stem and an exact output; is objective', () => {
    expect(ok(code)).toEqual([]);
    expect(OBJECTIVE_TYPES).toContain('code-output');
    expect(codeBlocks(code.stem_md as string)).toEqual([{ language: 'python', code: 'for i in range(3):\n    print(i, end=" ")' }]);
  });
  it('needs a fenced block in an allowed language', () => {
    expect(ok({ ...code, stem_md: 'print(1)' }).join()).toMatch(/fenced code block/);
    expect(ok({ ...code, stem_md: '```cobol\nDISPLAY 1\n```' }).join()).toMatch(/language "cobol"/);
    expect(ok({ ...code, stem_md: '```\nprint(1)\n```' }).join()).toMatch(/\(none\)/);
  });
  it('grades with whitespace normalisation', () => {
    expect(normaliseCodeOutput('\r\n0 1 2 \r\n\r\n')).toBe('0 1 2');
    expect(codeOutputMatches('0 1 2 ', '0 1 2')).toBe(true);
    expect(codeOutputMatches('a\nb', 'a\r\nb  \n')).toBe(true);
    expect(codeOutputMatches('0 1 2', '0  1 2')).toBe(false);
  });
});

describe('ordering', () => {
  const items = ['p', 'q', 'r', 's'].map((id) => ({ id, text_md: `event ${id}` }));
  const ord = base({ type: 'ordering', marks: 1, options: items, answer: { order: ['r', 'p', 's', 'q'] }, marking_scheme: [{ step: 'Correct sequence', marks: 1 }] });
  it('accepts a permutation of the items; is objective', () => {
    expect(ok(ord)).toEqual([]);
    expect(isObjective('ordering')).toBe(true);
  });
  it('rejects missing, repeated or unknown items and fewer than 3 items', () => {
    expect(ok({ ...ord, answer: { order: ['r', 'p', 's'] } }).join()).toMatch(/every option id/);
    expect(ok({ ...ord, answer: { order: ['r', 'p', 's', 's'] } }).join()).toMatch(/repeats/);
    expect(ok({ ...ord, answer: { order: ['r', 'p', 's', 'x'] } }).join()).toMatch(/every option id/);
    expect(ok({ ...ord, options: items.slice(0, 2), answer: { order: ['p', 'q'] } }).join()).toMatch(/at least 3/);
  });
  it('grades all-or-nothing, with a position count for feedback', () => {
    expect(orderingMatches(['r', 'p', 's', 'q'], ['r', 'p', 's', 'q'])).toBe(true);
    expect(orderingMatches(['r', 'p', 's', 'q'], ['r', 's', 'p', 'q'])).toBe(false);
    expect(orderingPositionsCorrect(['r', 'p', 's', 'q'], ['r', 's', 'p', 'q'])).toBe(2);
  });
});

describe('blueprint variant', () => {
  const bp = {
    id: 'cbse-10-mathematics-board-basic',
    board: 'cbse',
    exam: 'cbse',
    class: 10,
    subject_id: 'cbse-10-mathematics',
    paper_type: 'board',
    academic_year: '2026-27',
    duration_min: 180,
    total_marks: 4,
    scope: 'syllabus',
    sections: [{ id: 'A', title: 'A', items: [{ type: 'mcq', count: 4, marks_each: 1 }] }],
    source_status: 'verified',
    source: 'x',
  };
  it('is optional and carries code + name', () => {
    expect(Blueprint.parse(bp).variant).toBeUndefined();
    expect(Blueprint.parse({ ...bp, variant: { code: '241', name: 'Mathematics Basic' } }).variant).toEqual({ code: '241', name: 'Mathematics Basic' });
    expect(Blueprint.safeParse({ ...bp, variant: { code: '241' } }).success).toBe(false);
  });
  it('accepts the new types in blueprint items', () => {
    expect(Blueprint.safeParse({ ...bp, sections: [{ id: 'A', title: 'A', items: [{ type: 'writing', count: 1, marks_each: 4 }] }] }).success).toBe(true);
  });
});

describe('underline marker ++text++', () => {
  it('finds spans and leaves C++ alone', () => {
    expect(underlineSpans('Identify the ++underlined++ word and ++दौड़ता है++.')).toEqual(['underlined', 'दौड़ता है']);
    expect(underlineSpans('C++ and C++ are languages')).toEqual([]);
    expect(unmatchedUnderline('C++ and C++ are languages')).toEqual([]);
    expect(unmatchedUnderline('the ++word is not closed')).toEqual(['++word']);
    expect(underlineSpans('++ spaced ++')).toEqual([]);
  });
});

describe('script checks (generic by script)', () => {
  const deva = SCRIPTS.Deva!;
  it('maps languages to scripts', () => {
    expect(scriptForLanguage('hi')?.code).toBe('Deva');
    expect(scriptForLanguage('ta')?.code).toBe('Taml');
    expect(scriptForLanguage('en')).toBeNull();
    expect(scriptForLanguage('xx', 'Beng')?.code).toBe('Beng');
  });
  it('flags NFC, malformed Devanagari, Latin runs and Latin-only fields', () => {
    const rules = (v: unknown) => checkScriptText(v, deva).map((i) => i.rule);
    expect(rules({ body_md: 'राम घर जाता है।' })).toEqual([]);
    expect(rules({ body_md: 'ऩ' })).toContain('script.nfc'); // न + nukta decomposed; NFC is ऩ
    expect(rules({ body_md: 'ा गलत' })).toContain('script.well-formed');
    expect(rules({ body_md: 'काे' })).toContain('script.well-formed');
    expect(rules({ body_md: 'राम घर जाता है ।' })).toContain('script.well-formed');
    expect(rules({ body_md: 'यह this is English वाक्य है' })).toContain('script.latin-run');
    expect(rules({ body_md: 'Simple' })).toContain('script.no-script');
    expect(rules({ body_md: 'CBSE बोर्ड (A) और (R) दोनों सही हैं; $a = b + c$' })).toEqual([]);
    expect(rules({ id: 'not prose at all', body_md: 'ठीक' })).toEqual([]);
  });
  it('works for other Brahmic scripts', () => {
    const taml = SCRIPTS.Taml!;
    expect(checkScriptText({ body_md: 'நான் பள்ளிக்குச் செல்கிறேன்' }, taml)).toEqual([]);
    expect(checkScriptText({ body_md: 'ி தவறு' }, taml).map((i) => i.rule)).toContain('script.well-formed');
    const beng = SCRIPTS.Beng!;
    expect(checkScriptText({ body_md: 'আমি বাড়ি যাই' }, beng)).toEqual([]);
  });
  it('keeps narration to the script only', () => {
    expect(checkNarration('बच्चो, आज हम वाक्य के भेद सीखेंगे।', deva, 'n')).toEqual([]);
    expect(checkNarration('आज BPT सीखेंगे', deva, 'n')[0]?.rule).toBe('script.narration');
    expect(checkNarration('आज 2 बातें', deva, 'n')[0]?.message).toMatch(/digit/);
    expect(checkNarration('आज २ बातें', deva, 'n')[0]?.message).toMatch(/digit/);
    expect(checkNarration('क → ख', deva, 'n')[0]?.message).toMatch(/symbol/);
  });
  it('checks headings and majority over a release', () => {
    const issues = checkScriptRelease(
      {
        decks: [{ slides: [{ id: 's01', heading: 'Introduction', narration: 'नमस्ते' }] }],
        notes: { sections: [{ body_md: 'Mostly English text with एक शब्द' }] },
        questions: [{ stem_md: 'सही उत्तर चुनिए' }],
      },
      deva,
    ).map((i) => i.rule);
    expect(issues).toContain('script.heading');
    expect(issues).toContain('script.majority');
  });
});
