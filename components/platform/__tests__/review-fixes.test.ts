/**
 * Lead review 2026-10-28 (live site): /tests lists only subjects that really have tests first, with true badges;
 * school-only chapters form one final group instead of repeating their units; /plans price parts.
 */
import { describe, expect, it, vi } from 'vitest';
import type { CatalogSubject } from '@/platform/shared/api-client';

vi.mock('next/navigation', () => ({ usePathname: () => '/tests', useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));

import { seriesBadge, seriesSummary, splitBySeries } from '../tests/TestsHome';
import { SCHOOL_ONLY_UNIT, unitsOf } from '../learn/CourseSidebar';
import { priceParts } from '../plans/PlansClient';

const subject = (id: string): CatalogSubject => ({ id, name: id, code: null, exam: 'cbse', classLevel: 10, language: 'en', script: 'Latn', tier: 'core', wave: 1, hasBoardExam: true, theoryOnly: false, variants: [] });
const group = (kind: 'chapter' | 'unit' | 'term' | 'full' | 'second_exam' | 'live', n: number) => ({ id: kind, kind, title: kind, tests: Array.from({ length: n }, (_, i) => ({ id: `${kind}-${i}` })) });

describe('/tests: subjects with tests first, true badges', () => {
  it('summary and badge say only what is there', () => {
    const full = seriesSummary({ series: [group('chapter', 12), group('unit', 3), group('full', 2)] } as never);
    expect(full).toEqual({ total: 17, chapterTests: 12, fullPapers: 2 });
    expect(seriesBadge(full)).toBe('Full series');
    expect(seriesBadge(seriesSummary({ series: [group('chapter', 1)] } as never))).toBe('1 chapter test');
    expect(seriesBadge(seriesSummary({ series: [group('chapter', 6), group('live', 0)] } as never))).toBe('6 chapter tests');
    expect(seriesBadge(seriesSummary({ series: [group('unit', 2)] } as never))).toBe('2 tests');
    expect(seriesBadge(seriesSummary({ series: [group('chapter', 0)] } as never))).toBeNull();
    expect(seriesBadge(undefined)).toBeNull();
  });

  it('split: ready subjects in catalog order, the rest after; unknown → everything, no split', () => {
    const subjects = ['maths', 'science', 'sanskrit', 'tibetan', 'retail'].map(subject);
    const sums = new Map([
      ['science', { total: 10, chapterTests: 10, fullPapers: 0 }],
      ['maths', { total: 3, chapterTests: 3, fullPapers: 0 }],
      ['sanskrit', { total: 0, chapterTests: 0, fullPapers: 0 }],
    ]);
    const { ready, rest } = splitBySeries(subjects, sums);
    expect(ready!.map((x) => x.id)).toEqual(['maths', 'science']);
    expect(rest.map((x) => x.id)).toEqual(['sanskrit', 'tibetan', 'retail']);
    expect(splitBySeries(subjects, null)).toEqual({ ready: null, rest: subjects });
    expect(splitBySeries(subjects, new Map()).ready).toBeNull();
  });
});

describe('subject page and sidebar: school-only chapters', () => {
  const ch = (number: number, unit: string | null, boardAssessed = true) => ({ number, unit, boardAssessed });

  it('one final "School assessment only" group; units are not repeated', () => {
    const chapters = [ch(1, 'Unit I'), ch(2, 'Unit I'), ch(3, 'Unit II'), ch(13, 'Unit V'), ch(14, 'Unit I', false), ch(15, 'Unit II', false)];
    const groups = unitsOf(chapters);
    expect(groups.map((g) => [g.unit, g.chapters.map((c) => c.number)])).toEqual([
      ['Unit I', [1, 2]],
      ['Unit II', [3]],
      ['Unit V', [13]],
      [SCHOOL_ONLY_UNIT, [14, 15]],
    ]);
    expect(SCHOOL_ONLY_UNIT).toBe('School assessment only (not in board exam)');
  });

  it('board order and units unchanged without school-only chapters, or when none is in the board exam', () => {
    const all = [ch(1, 'A'), ch(2, 'B'), ch(3, 'A')];
    expect(unitsOf(all).map((g) => g.unit)).toEqual(['A', 'B', 'A']);
    const none = [ch(1, 'A', false), ch(2, 'B', false)];
    expect(unitsOf(none).map((g) => g.unit)).toEqual(['A', 'B']);
    expect(unitsOf([{ number: 1, unit: null }]).map((g) => g.unit)).toEqual([null]);
  });
});

describe('/plans: price parts', () => {
  it('amount with tabular figures, suffix apart; the Free plan shows ₹0', () => {
    expect(priceParts('₹499 one-time')).toEqual({ amount: '₹499', suffix: ' one-time' });
    expect(priceParts('₹1,499/year')).toEqual({ amount: '₹1,499', suffix: '/year' });
    expect(priceParts('₹199/month')).toEqual({ amount: '₹199', suffix: '/month' });
    expect(priceParts(null)).toEqual({ amount: '₹0', suffix: '' });
    expect(priceParts('Custom')).toEqual({ amount: 'Custom', suffix: '' });
  });
});
