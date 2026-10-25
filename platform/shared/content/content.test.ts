import { describe, expect, it } from 'vitest';
import {
  Blueprint,
  ChapterRelease,
  Deck,
  FlashcardSet,
  Notes,
  Question,
  SubjectsFile,
  SyllabusFile,
  chapterId,
  examFor,
  parseChapterId,
} from './index';

const unit = 'cbse-10-science-ch01';
const topic = 'cbse-10-science-ch01-t01';

const base = {
  unit,
  stem_md: 'Which of these is a decomposition reaction?',
  solution_md: 'Step 1: one reactant breaks into two products.',
  marks: 1,
  marking_scheme: [{ step: 'Correct option', marks: 1 }],
  difficulty: 2,
  competency: 'understanding',
  bloom: 'understand',
  topic_ids: [topic],
  expected_time_sec: 60,
} as const;

const mcq = {
  ...base,
  id: 'q_ch01_001',
  type: 'mcq',
  options: [
    { id: 'a', text_md: '$2H_2 + O_2 \\rightarrow 2H_2O$' },
    { id: 'b', text_md: '$CaCO_3 \\rightarrow CaO + CO_2$' },
    { id: 'c', text_md: '$Zn + CuSO_4 \\rightarrow ZnSO_4 + Cu$' },
    { id: 'd', text_md: '$NaOH + HCl \\rightarrow NaCl + H_2O$' },
  ],
  answer: { option_ids: ['b'] },
} as const;

describe('ids', () => {
  it('parses and builds chapter ids', () => {
    expect(parseChapterId('icse-10-physics-ch03')).toEqual({ subjectId: 'icse-10-physics', number: 3 });
    expect(chapterId('isc-12-hindi', 7)).toBe('isc-12-hindi-ch07');
    expect(examFor('cisce', 10)).toBe('icse');
    expect(examFor('cisce', 11)).toBe('isc');
    expect(examFor('cbse', 12)).toBe('cbse');
    expect(() => parseChapterId('cbse-13-science-ch01')).toThrow();
  });
});

describe('Question', () => {
  it('accepts a valid MCQ', () => {
    expect(Question.parse(mcq).status).toBe('draft');
  });

  it('rejects an answer that is not an option', () => {
    expect(Question.safeParse({ ...mcq, answer: { option_ids: ['z'] } }).success).toBe(false);
  });

  it('rejects a marking scheme that does not add up', () => {
    expect(Question.safeParse({ ...mcq, marks: 2 }).success).toBe(false);
  });

  it('checks fill-blank blanks against the stem', () => {
    const q = { ...base, id: 'q_fb', type: 'fill-blank', stem_md: 'Rusting is ___ and ___.', answer: { blanks: [{ accepted: ['oxidation'] }] } };
    expect(Question.safeParse(q).success).toBe(false);
    expect(Question.safeParse({ ...q, answer: { blanks: [{ accepted: ['slow'] }, { accepted: ['oxidation'] }] } }).success).toBe(true);
  });

  it('validates case-based children and their mark total', () => {
    const child = (id: string, marks: number) => ({
      ...base,
      id,
      type: 'short',
      stem_md: 'Explain.',
      answer: { model_answer_md: 'Because...' },
      marks,
      marking_scheme: [{ step: 'Reason', marks }],
    });
    const caseQ = {
      ...base,
      id: 'q_case_1',
      type: 'case-based',
      passage_md: 'A student heats lead nitrate in a test tube...',
      answer: { model_answer_md: 'See parts.' },
      marks: 4,
      marking_scheme: [{ step: 'Parts', marks: 4 }],
      children: [child('a', 1), child('b', 1), child('c', 2)],
    };
    expect(Question.safeParse(caseQ).success).toBe(true);
    expect(Question.safeParse({ ...caseQ, children: [child('a', 1), child('b', 1)] }).success).toBe(false);
  });
});

const slide = (id: string, layout: string, extra: Record<string, unknown> = {}) => ({
  id,
  layout,
  heading: 'Heading',
  narration: 'A short spoken line.',
  ...extra,
});

describe('Deck', () => {
  it('enforces narration length and layout requirements', () => {
    const deck = { unit, title: 'Chemical Reactions', goals: ['Balance equations'], slides: [slide('s01', 'title')] };
    expect(Deck.safeParse(deck).success).toBe(true);
    expect(Deck.safeParse({ ...deck, slides: [slide('s01', 'concept', { narration: 'word '.repeat(91) })] }).success).toBe(false);
    expect(Deck.safeParse({ ...deck, slides: [slide('s01', 'diagram')] }).success).toBe(false);
    expect(Deck.safeParse({ ...deck, slides: [slide('s01', 'title'), slide('s01', 'summary')] }).success).toBe(false);
  });
});

describe('ChapterRelease', () => {
  const notes = { unit, title: 'Notes', sections: [{ heading: 'Intro', body_md: 'Text' }] };
  const flashcards = { unit, cards: [{ id: 'f01', front_md: 'Q', back_md: 'A', tag: 'definition' }] };
  const release = {
    unit,
    version: 1,
    academic_year: '2026-27',
    created_at: '2026-10-25T00:00:00Z',
    decks: [{ unit, title: 'T', goals: ['g'], slides: [slide('s01', 'check', { check_question_id: 'q_ch01_001' })] }],
    notes,
    flashcards,
    questions: [mcq],
  };

  it('accepts a consistent bundle', () => {
    expect(Notes.parse(notes).sections).toHaveLength(1);
    expect(FlashcardSet.parse(flashcards).cards).toHaveLength(1);
    expect(ChapterRelease.safeParse(release).success).toBe(true);
  });

  it('rejects dangling check questions and foreign units', () => {
    expect(ChapterRelease.safeParse({ ...release, questions: [] }).success).toBe(false);
    expect(ChapterRelease.safeParse({ ...release, notes: { ...notes, unit: 'cbse-10-science-ch02' } }).success).toBe(false);
  });
});

describe('catalog files', () => {
  const subject = {
    id: 'cbse-10-science',
    board: 'cbse',
    exam: 'cbse',
    class: 10,
    code: '086',
    name: 'Science',
    language: 'en',
    script: 'Latn',
    tier: 'core',
    wave: 1,
    priority: 1,
    theory_only: false,
    has_board_exam: true,
    source_status: 'verified',
    source: 'cbse-secondary-curriculum-2026-27',
    notes: null,
  };

  it('validates subjects and waves', () => {
    expect(SubjectsFile.safeParse({ academic_year: '2026-27', subjects: [subject] }).success).toBe(true);
    expect(SubjectsFile.safeParse({ academic_year: '2026-27', subjects: [{ ...subject, wave: 2 }] }).success).toBe(false);
    expect(SubjectsFile.safeParse({ academic_year: '2026-27', subjects: [subject, subject] }).success).toBe(false);
  });

  it('validates syllabus id nesting', () => {
    const syllabus = {
      subject_id: 'cbse-10-science',
      academic_year: '2026-27',
      source_status: 'verified',
      chapters: [{ id: unit, number: 1, title: 'Chemical Reactions and Equations', topics: [{ id: topic, title: 'Balancing' }] }],
    };
    expect(SyllabusFile.safeParse(syllabus).success).toBe(true);
    const wrong = { ...syllabus, chapters: [{ ...syllabus.chapters[0], topics: [{ id: 'cbse-10-science-ch02-t01', title: 'x' }] }] };
    expect(SyllabusFile.safeParse(wrong).success).toBe(false);
  });
});

describe('Blueprint', () => {
  it('checks attempted marks including internal choice', () => {
    const bp = {
      id: 'cbse-10-default-chapter-test-short',
      board: 'cbse',
      exam: 'cbse',
      class: 10,
      subject_id: null,
      paper_type: 'chapter-test-short',
      academic_year: '2026-27',
      duration_min: 30,
      total_marks: 20,
      scope: 'chapter',
      source_status: 'unverified',
      source: 'lead-default',
      sections: [
        { id: 'A', title: 'Objective', items: [{ type: 'mcq', count: 10, marks_each: 1 }] },
        { id: 'B', title: 'Short answer', items: [{ type: 'short', count: 6, marks_each: 2, internal_choice: { attempt: 5, of: 6 } }] },
      ],
    };
    expect(Blueprint.safeParse(bp).success).toBe(true);
    expect(Blueprint.safeParse({ ...bp, total_marks: 22 }).success).toBe(false);
  });
});
