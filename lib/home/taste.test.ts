import { describe, expect, it } from 'vitest';
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
