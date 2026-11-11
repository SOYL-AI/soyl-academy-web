import { describe, expect, it } from 'vitest';
import { DOOR_QUESTIONS } from '@/content/door-questions.generated';
import { TASTE } from '@/content/taste.generated';

const BOARDS = ['cbse', 'cisce'] as const;
const CLASSES = [7, 8, 9, 10, 11, 12];
const examFor = (board: string, c: number) => (board === 'cbse' ? 'cbse' : c <= 10 ? 'icse' : 'isc');

describe('the taste snapshot (scripts/build-taste.mjs)', () => {
  it('has an entry for every board and class', () => {
    for (const b of BOARDS) for (const c of CLASSES) expect(TASTE[`${b}-${c}`], `${b}-${c}`).toBeDefined();
  });

  it('takes material from its own exam, and says when it borrows a class', () => {
    for (const e of Object.values(TASTE)) {
      expect(e.exam).toBe(examFor(e.board, e.fromClass));
      expect(e.chapterId.startsWith(`${e.exam}-${e.fromClass}-`)).toBe(true);
      expect(e.subjectId).toBe(`${e.exam}-${e.fromClass}-${e.subjectSlug}`);
      if (e.fromClass !== e.classLevel) expect([7, 8, 9, 10, 11, 12]).toContain(e.fromClass);
    }
  });

  it('is plain text: three slides, a flashcard and an open question, with no maths markup', () => {
    for (const [key, e] of Object.entries(TASTE)) {
      expect(e.slides, key).toHaveLength(3);
      const text = [
        ...e.slides.flatMap((s) => [s.heading, s.body, ...s.bullets]),
        e.flashcard.front,
        e.flashcard.back,
        e.doubt,
      ].join(' ');
      expect(text, key).not.toMatch(/[$\\<>|]/);
      expect(e.slides.every((s) => s.heading && (s.body || s.bullets.length)), key).toBe(true);
      expect(e.doubt.trim().endsWith('?'), key).toBe(true);
    }
  });
});

describe('the door questions (content/door-questions.generated.ts)', () => {
  it('has one for every board and class, from the same subject and class as the taste', () => {
    for (const b of BOARDS)
      for (const c of CLASSES) {
        const q = DOOR_QUESTIONS[`${b}-${c}`];
        const t = TASTE[`${b}-${c}`]!;
        expect(q, `${b}-${c}`).toBeDefined();
        expect(q!.fromClass).toBe(t.fromClass);
        expect(q!.chapterId.startsWith(`${t.subjectId}-ch`), `${b}-${c}`).toBe(true);
      }
  });

  it('is a fair objective question: four distinct plain-text options, exactly one right, an explanation without the letter', () => {
    for (const [key, q] of Object.entries(DOOR_QUESTIONS)) {
      expect(q.options, key).toHaveLength(4);
      expect(new Set(q.options.map((o) => o.text)).size, key).toBe(4);
      expect(q.options.filter((o) => o.id === q.answer), key).toHaveLength(1);
      const text = [q.stem, q.explanation, ...q.options.map((o) => o.text)].join(' ');
      expect(text, key).not.toMatch(/[$\<>|*]/);
      expect(q.explanation, key).not.toMatch(/\((?:[a-d])\)|\boption\s+\(?[a-d]\)?/i);
      expect(q.stem.length, key).toBeLessThanOrEqual(130);
    }
  });
});

describe('the syllabus count', () => {
  it('never claims more chapters than the syllabus has, and adds up', () => {
    for (const [key, e] of Object.entries(TASTE)) {
      for (const s of e.count.subjects) if (s.syllabus !== null) expect(s.written, `${key} ${s.name}`).toBeLessThanOrEqual(s.syllabus);
      expect(e.count.chapters, key).toBe(e.count.subjects.reduce((n, s) => n + s.written, 0));
    }
  });

  it('counts the chosen class, not the borrowed one', () => {
    for (const e of Object.values(TASTE)) if (e.fromClass !== e.classLevel) expect(e.count.chapters).toBe(0);
  });
});
