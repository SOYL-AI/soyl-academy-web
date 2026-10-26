/**
 * Mock fixtures: what the deterministic MockProvider returns for each pipeline asset, so the whole
 * pipeline runs offline. Output is schema-valid and lint-clean but is VISIBLY PLACEHOLDER text
 * ("[MOCK] …"); items carry provenance model "mock" and the lint stage warns on them, and
 * publish (M2) refuses them. Never present this as real content.
 */
import { hashString, type MockFixture, type Rng } from '@soyl/ai-core';
import type { OutlinePart, Visual } from '@soyl/shared/content/index';
import type { Family } from '../config/families';
import { skeletonOutline, type QuestionSlot } from './planning';
import type { SyllabusChapter } from '@soyl/shared/content/index';

export interface TopicRef {
  id: string;
  title: string;
}

export interface OutlineInput {
  chapter: SyllabusChapter;
  family: Family;
}
export interface DeckInput {
  unit: string;
  part: number | null;
  outlinePart: OutlinePart;
  topics: TopicRef[];
  family: Family;
  language: string;
}
export interface NotesInput {
  unit: string;
  chapterTitle: string;
  topics: TopicRef[];
  family: Family;
  language: string;
}
export interface FlashcardsInput {
  unit: string;
  topics: TopicRef[];
  count: number;
  language: string;
}
export interface QuestionsInput {
  unit: string;
  slots: QuestionSlot[];
  topics: TopicRef[];
  language: string;
}

const STEM_FAMILIES = new Set<Family>(['maths', 'physics', 'chemistry', 'biology', 'science']);

function words(language: string) {
  const hi = language === 'hi';
  return {
    mock: hi ? '[MOCK] प्लेसहोल्डर' : '[MOCK]',
    body: (t: string) =>
      hi ? `[MOCK] यह ${t} के लिए प्लेसहोल्डर पाठ है। यह असली सामग्री नहीं है।` : `[MOCK] Placeholder text about ${t}, written by the mock provider. Not real content.`,
    narration: (t: string) =>
      hi
        ? `[MOCK] यह ${t} के लिए प्लेसहोल्डर वर्णन है। असली पाठ बाद में तैयार होगा।`
        : `[MOCK] This is placeholder narration for ${t}. The real lesson will explain it in plain spoken language.`,
  };
}

const SVG_SAMPLE = (label: string, id: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="${label.replace(/[<>&"]/g, '')}">` +
  `<title>Placeholder diagram</title>` +
  `<defs><marker id="${id}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>` +
  `<rect x="10" y="30" width="80" height="50" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>` +
  `<line x1="90" y1="55" x2="150" y2="55" stroke="currentColor" stroke-width="2" marker-end="url(#${id}-arrow)"/>` +
  `<circle cx="190" cy="55" r="30" class="diagram-fill" stroke="var(--diagram-accent)" stroke-width="2"/>` +
  `<text x="50" y="60" font-size="12" text-anchor="middle" fill="currentColor">MOCK</text>` +
  `</svg>`;

export function mockVisual(kind: string, label: string): Visual {
  const alt = `Placeholder ${kind} diagram for ${label} (mock provider)`;
  switch (kind) {
    case 'svg':
      return { kind: 'svg', spec: SVG_SAMPLE(label, `m${hashString(label + alt).toString(36)}`), alt };
    case 'plot':
      return {
        kind: 'plot',
        spec: {
          x: { min: -4, max: 4, label: 'x' },
          y: { min: -2, max: 10, label: 'y' },
          functions: [{ expr: 'x^2 - 2x + 1', label: 'y = (x - 1)^2' }, { expr: '2sin(x) + 3' }],
          points: [{ at: [1, 0], label: 'vertex' }],
          series: [],
          grid: true,
        },
        alt,
      };
    case 'geometry':
      return {
        kind: 'geometry',
        spec: {
          width: 10,
          height: 8,
          points: { A: [1, 1], B: [8, 1], C: [1, 6] },
          segments: [
            { from: 'A', to: 'B', label: '7' },
            { from: 'A', to: 'C', label: '5' },
            { from: 'B', to: 'C' },
          ],
          lines: [],
          rays: [],
          circles: [],
          angles: [{ at: 'A', from: 'B', to: 'C', right: true }],
          polygons: [{ vertices: ['A', 'B', 'C'], fill: true }],
        },
        alt,
      };
    case 'chem':
      return { kind: 'chem', spec: { equation: '2H2 + O2 -> 2H2O' }, alt };
    case 'table':
      return { kind: 'table', spec: { headers: ['Item', 'Placeholder'], rows: [['[MOCK] A', '1'], ['[MOCK] B', '2']] }, alt };
    case 'flow':
    default:
      return {
        kind: 'flow',
        spec: {
          direction: 'LR',
          nodes: [
            { id: 'a', label: '[MOCK] Start' },
            { id: 'b', label: '[MOCK] Step' },
            { id: 'c', label: '[MOCK] Result' },
          ],
          edges: [
            { from: 'a', to: 'b' },
            { from: 'b', to: 'c' },
          ],
        },
        alt,
      };
  }
}

function mathFor(family: Family): { inline: string; display: string } {
  if (family === 'chemistry' || family === 'science') return { inline: '$\\ce{2H2 + O2 -> 2H2O}$', display: '\\ce{CaCO3 ->[\\Delta] CaO + CO2}' };
  if (STEM_FAMILIES.has(family)) return { inline: '$a^2 + b^2 = c^2$', display: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' };
  return { inline: '', display: '' };
}

const marking = (marks: number) => {
  if (marks <= 1) return [{ step: 'Correct answer', marks }];
  const steps = [];
  let left = marks;
  let n = 1;
  while (left > 1) {
    steps.push({ step: `[MOCK] Step ${n++}`, marks: 1 });
    left -= 1;
  }
  steps.push({ step: `[MOCK] Step ${n}`, marks: left });
  return steps;
};

const BLOOM: Record<string, string> = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };

export function mockQuestion(slot: QuestionSlot, index: number, topics: TopicRef[], rng: Rng, language = 'en'): Record<string, unknown> {
  const w = words(language);
  const topic = topics.find((t) => t.id === slot.topic_id) ?? topics[0]!;
  const base = {
    id: `mock_${index}`,
    type: slot.type,
    stem_md: `${w.mock} Question ${index + 1} on ${topic.title}.`,
    solution_md: `${w.mock} Step 1: placeholder reasoning. Step 2: placeholder conclusion.`,
    marking_scheme: marking(slot.marks),
    marks: slot.marks,
    difficulty: slot.difficulty,
    competency: slot.competency,
    bloom: BLOOM[slot.competency] ?? 'understand',
    topic_ids: [topic.id],
    expected_time_sec: Math.max(45, Math.round(slot.marks * 90)),
  };
  const four = ['a', 'b', 'c', 'd'].map((id) => ({ id, text_md: `${w.mock} option ${id.toUpperCase()}` }));
  const correct = rng.pick(['a', 'b', 'c', 'd']);
  switch (slot.type) {
    case 'mcq':
      return { ...base, options: four, answer: { option_ids: [correct] } };
    case 'multi-select':
      return { ...base, options: four, answer: { option_ids: ['a', 'c'] } };
    case 'assertion-reason':
      return {
        ...base,
        stem_md: `${w.mock} Assertion (A): placeholder statement. Reason (R): placeholder reason.`,
        options: [
          { id: 'a', text_md: 'Both A and R are true, and R is the correct explanation of A.' },
          { id: 'b', text_md: 'Both A and R are true, but R is not the correct explanation of A.' },
          { id: 'c', text_md: 'A is true, but R is false.' },
          { id: 'd', text_md: 'A is false, but R is true.' },
        ],
        answer: { option_ids: [correct] },
      };
    case 'true-false':
      return { ...base, options: [{ id: 't', text_md: 'True' }, { id: 'f', text_md: 'False' }], answer: { option_ids: [rng.pick(['t', 'f'])] } };
    case 'numerical':
      return {
        ...base,
        stem_md: `${w.mock} A placeholder quantity doubles from 12 units. What is the new value?`,
        solution_md: `${w.mock} Step 1: double the value, $12 \\times 2 = 24$. Step 2: the new value is 24 units.`,
        answer: { value: 24, tolerance: 0, unit: 'units' },
      };
    case 'fill-blank':
      return { ...base, stem_md: `${w.mock} The placeholder term is ___.`, answer: { blanks: [{ accepted: ['placeholder'] }] } };
    case 'match':
      return {
        ...base,
        options: ['1', '2', '3'].map((id) => ({ id, text_md: `${w.mock} item ${id}` })),
        match_right: ['p', 'q', 'r'].map((id) => ({ id, text_md: `${w.mock} match ${id}` })),
        answer: { pairs: [{ left_id: '1', right_id: 'q' }, { left_id: '2', right_id: 'r' }, { left_id: '3', right_id: 'p' }] },
      };
    case 'short':
    case 'long':
      return { ...base, answer: { model_answer_md: `${w.mock} Model answer with the key points expected for ${slot.marks} marks.` } };
    case 'writing': {
      const content = Math.max(0.5, slot.marks - 1);
      return {
        ...base,
        stem_md: `${w.mock} Write a notice about a placeholder school event on ${topic.title}.`,
        format: 'notice',
        word_limit: { min: 8, max: 20 },
        rubric: [{ criterion: 'Format', marks: slot.marks - content }, { criterion: 'Content and expression', marks: content }],
        marking_scheme: [{ step: 'Format', marks: slot.marks - content }, { step: 'Content and expression', marks: content }],
        answer: { model_answer_md: `${w.mock} NOTICE. A placeholder event is announced here for all students of the school.` },
      };
    }
    case 'map':
      return {
        ...base,
        stem_md: `${w.mock} On the outline map, locate and label the placeholder places A and B.`,
        map_id: 'india-political',
        marks: 2,
        marking_scheme: marking(2),
        answer: { places: [{ id: 'A', name: 'Placeholder city' }, { id: 'B', name: 'Placeholder river' }] },
      };
    case 'code-output':
      return { ...base, stem_md: `${w.mock} What is the output?\n\n\`\`\`python\nprint(6 * 7)\n\`\`\``, answer: { output: '42' } };
    case 'ordering':
      return {
        ...base,
        options: ['p', 'q', 'r'].map((id) => ({ id, text_md: `${w.mock} step ${id}` })),
        answer: { order: ['q', 'r', 'p'] },
      };
    case 'case-based':
    case 'source-based': {
      const childMarks = slot.marks >= 4 ? [1, 1, slot.marks - 2] : [slot.marks / 2, slot.marks / 2];
      const children = childMarks.map((m, i) =>
        i === 0
          ? { ...mockQuestion({ ...slot, type: 'mcq', marks: m }, index * 10 + i, topics, rng, language), id: String.fromCharCode(97 + i) }
          : { ...mockQuestion({ ...slot, type: 'short', marks: m }, index * 10 + i, topics, rng, language), id: String.fromCharCode(97 + i) },
      );
      return {
        ...base,
        passage_md: `${w.mock} Placeholder ${slot.type === 'case-based' ? 'case' : 'source'} passage about ${topic.title}. A real passage is an original everyday situation, never copied text.`,
        answer: { model_answer_md: `${w.mock} See the answers to each part.` },
        children: children.map((c) => {
          const { unit: _u, ...rest } = c as Record<string, unknown>;
          return rest;
        }),
      };
    }
  }
}

export const mockOutline: MockFixture = ({ input }) => {
  const { chapter, family } = input as OutlineInput;
  const outline = skeletonOutline(chapter, family);
  return {
    goals: outline.goals.map((g) => `[MOCK] ${g}`.slice(0, 200)),
    parts: outline.parts.map((p) => ({ ...p, slides: p.slides.map((s) => ({ ...s, heading: `[MOCK] ${s.heading}`.slice(0, 120) })) })),
  };
};

export const mockDeck: MockFixture = ({ input, rng }) => {
  const { unit, part, outlinePart, topics, family, language } = input as DeckInput;
  const w = words(language);
  const math = mathFor(family);
  const title = (id: string | undefined) => topics.find((t) => t.id === id)?.title ?? outlinePart.title;
  const checkIds: string[] = [];
  const slides = outlinePart.slides.map((s, i) => {
    const t = title(s.topic_ids[0]);
    const slide: Record<string, unknown> = {
      id: `s${String(i + 1).padStart(2, '0')}`,
      layout: s.layout,
      heading: s.heading.startsWith('[MOCK]') ? s.heading : `[MOCK] ${s.heading}`.slice(0, 120),
      body_md: w.body(t) + (s.layout === 'example' && math.inline ? ` Worked step: ${math.inline}.` : ''),
      bullets: s.layout === 'summary' || s.layout === 'exam-tips' ? [`${w.mock} point one`, `${w.mock} point two`] : [],
      visual: s.visual ? mockVisual(s.visual, t) : null,
      math: s.layout === 'example' && math.display ? [math.display] : [],
      narration: w.narration(t),
      check_question_id: null,
    };
    if (s.layout === 'two-column') slide.columns = [`${w.mock} left`, `${w.mock} right`];
    if (s.layout === 'check') {
      const id = `chk_${checkIds.length + 1}`;
      checkIds.push(id);
      slide.check_question_id = id;
    }
    return slide;
  });
  const checkTopics = outlinePart.slides.filter((s) => s.layout === 'check').map((s) => s.topic_ids[0] ?? topics[0]!.id);
  const check_questions = checkIds.map((id, i) => ({
    ...mockQuestion({ type: 'mcq', marks: 1, difficulty: 2, competency: 'understanding', topic_id: checkTopics[i]! }, i, topics, rng, language),
    id,
    unit,
  }));
  return {
    deck: {
      unit,
      part,
      title: `[MOCK] ${outlinePart.title}`,
      language,
      goals: [`${w.mock} goal for ${outlinePart.title}`.slice(0, 200)],
      slides,
    },
    check_questions,
  };
};

export const mockNotes: MockFixture = ({ input }) => {
  const { unit, chapterTitle, topics, family, language } = input as NotesInput;
  const w = words(language);
  const math = mathFor(family);
  return {
    unit,
    title: `[MOCK] Notes: ${chapterTitle}`,
    language,
    sections: topics.map((t, i) => ({
      heading: `${w.mock} ${t.title}`,
      body_md: w.body(t.title) + (math.inline ? ` Key relation: ${math.inline}.` : ''),
      key_terms: [{ term: `${w.mock} term ${i + 1}`, definition_md: w.body(t.title) }],
      formulas: math.display && i === 0 ? [{ latex: math.display, label: 'placeholder formula' }] : [],
      visual: i === 0 ? mockVisual('table', t.title) : null,
      topic_ids: [t.id],
    })),
    exam_tips_md: `${w.mock} Placeholder exam tips: common mistakes and how marks are awarded.`,
  };
};

const TAGS = ['definition', 'formula', 'fact', 'concept', 'diagram', 'example', 'exam-tip'] as const;

export const mockFlashcards: MockFixture = ({ input }) => {
  const { unit, topics, count, language } = input as FlashcardsInput;
  const w = words(language);
  return {
    unit,
    language,
    cards: Array.from({ length: count }, (_, i) => {
      const t = topics[i % topics.length]!;
      return {
        id: `f${String(i + 1).padStart(2, '0')}`,
        front_md: `${w.mock} Card ${i + 1}: ${t.title}?`,
        back_md: `${w.mock} Placeholder answer ${i + 1}.`,
        tag: TAGS[i % TAGS.length],
        topic_id: t.id,
      };
    }),
  };
};

export const mockQuestions: MockFixture = ({ input, rng }) => {
  const { unit, slots, topics, language } = input as QuestionsInput;
  return { questions: slots.map((slot, i) => ({ ...mockQuestion(slot, i, topics, rng, language), unit })) };
};

/** Marker a test can put in a stem to make the mock verifier report a critical answer-key problem. */
export const MOCK_FLAG = '[MOCK-FLAG]';

/**
 * Mock independent solver (stage 5): agrees with everything except stems carrying MOCK_FLAG, so the
 * flag → regenerate → re-verify loop runs offline. It is not a real check; the deterministic checks are.
 */
export const mockVerify: MockFixture = ({ input }) => {
  const { questions } = input as { questions: { id: string; stem_md: string }[] };
  const items = questions
    .filter((q) => q.stem_md.includes(MOCK_FLAG))
    .map((q) => ({ ref: q.id, severity: 'critical', category: 'answer-key', evidence: '[MOCK] the independent solve disagrees with the key', fix: '[MOCK] regenerate' }));
  return { verdict: items.length ? 'regenerate' : 'pass', items, summary: { critical: items.length, major: 0, minor: 0 } };
};

export const MOCK_FIXTURES: Record<string, MockFixture> = {
  outline: mockOutline,
  deck: mockDeck,
  notes: mockNotes,
  flashcards: mockFlashcards,
  questions: mockQuestions,
  'case-passages': mockQuestions,
  verify: mockVerify,
};
