import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GuestProgress as GuestProgressContract, GUEST_STORAGE_KEY as CONTRACT_KEY } from '@/platform/api/src/contract/guest';
import {
  afterMerge,
  chapterSummary,
  clearGuestProgress,
  GUEST_LIMITS,
  GUEST_STORAGE_KEY,
  hasMergeableProgress,
  readGuestProgress,
  recordGuestLessonPosition,
  recordGuestPracticeAnswer,
  rememberGuestBoardClass,
  sanitizeGuestProgress,
  writeGuestProgress,
} from '../lib/guest-storage';

const T = '2026-10-26T10:00:00.000Z';

beforeEach(() => {
  window.localStorage.clear();
});

describe('guest storage contract (soyl_guest_v1, WEB-5)', () => {
  it('uses the API contract key', () => {
    expect(GUEST_STORAGE_KEY).toBe(CONTRACT_KEY);
  });

  it('every value it produces passes the API zod contract', () => {
    recordGuestPracticeAnswer('cbse-10-science-ch01', 'q_cbse10sci_ch01_001', true, new Date(T));
    recordGuestLessonPosition('cbse-10-science-ch02', 4, false, new Date(T));
    rememberGuestBoardClass('cbse', 10);
    const p = readGuestProgress();
    expect(GuestProgressContract.safeParse(p).success).toBe(true);
    expect(GuestProgressContract.safeParse(JSON.parse(window.localStorage.getItem(GUEST_STORAGE_KEY)!)).success).toBe(true);
  });

  it('drops unknown keys, personal data and invalid entries', () => {
    const dirty = {
      v: 1,
      name: 'Asha',
      phone: '+919876543210',
      board: 'icse',
      classLevel: 13,
      lessons: [
        { chapter: 'cbse-10-science-ch01', slide: 2, completed: false, updatedAt: T, note: 'free text' },
        { chapter: 'evil', slide: 1, completed: false, updatedAt: T },
        { chapter: 'cbse-10-science-ch02', slide: -1, completed: false, updatedAt: T },
        { chapter: 'cbse-10-science-ch03', slide: 1, completed: 'yes', updatedAt: T },
      ],
      practice: [
        { chapter: 'cbse-10-science-ch01', question: 'q_ok', correct: true, answeredAt: T },
        { chapter: 'cbse-10-science-ch01', question: '<script>', correct: true, answeredAt: T },
        { chapter: 'cbse-10-science-ch01', question: 'q_x', correct: true, answeredAt: 'yesterday' },
      ],
    };
    const clean = sanitizeGuestProgress(dirty)!;
    expect(clean).toEqual({
      v: 1,
      lessons: [{ chapter: 'cbse-10-science-ch01', slide: 2, completed: false, updatedAt: T }],
      practice: [{ chapter: 'cbse-10-science-ch01', question: 'q_ok', correct: true, answeredAt: T }],
    });
    expect(GuestProgressContract.safeParse(clean).success).toBe(true);
  });

  it('rejects other versions and non-objects', () => {
    expect(sanitizeGuestProgress({ v: 2, lessons: [], practice: [] })).toBeNull();
    expect(sanitizeGuestProgress('x')).toBeNull();
    expect(sanitizeGuestProgress(null)).toBeNull();
  });

  it('keeps the newest entry per chapter / question and enforces the limits', () => {
    const many = {
      v: 1,
      lessons: [
        { chapter: 'cbse-10-science-ch01', slide: 1, completed: false, updatedAt: '2026-10-26T09:00:00.000Z' },
        { chapter: 'cbse-10-science-ch01', slide: 9, completed: true, updatedAt: '2026-10-26T11:00:00.000Z' },
      ],
      practice: Array.from({ length: GUEST_LIMITS.maxPracticeAnswers + 10 }, (_, i) => ({
        chapter: 'cbse-10-science-ch01',
        question: `q_${i}`,
        correct: true,
        answeredAt: new Date(Date.UTC(2026, 9, 1) + i * 1000).toISOString(),
      })),
    };
    const clean = sanitizeGuestProgress(many)!;
    expect(clean.lessons).toEqual([{ chapter: 'cbse-10-science-ch01', slide: 9, completed: true, updatedAt: '2026-10-26T11:00:00.000Z' }]);
    expect(clean.practice).toHaveLength(GUEST_LIMITS.maxPracticeAnswers);
    expect(clean.practice[0]!.question).toBe('q_10');
  });
});

describe('storage failures never throw', () => {
  it('reads corrupt JSON as empty', () => {
    window.localStorage.setItem(GUEST_STORAGE_KEY, '{nope');
    expect(readGuestProgress()).toEqual({ v: 1, lessons: [], practice: [] });
  });

  it('survives a throwing localStorage (private mode / quota)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(readGuestProgress()).toEqual({ v: 1, lessons: [], practice: [] });
    expect(recordGuestPracticeAnswer('cbse-10-science-ch01', 'q_a', true)).toBe(false);
    expect(() => clearGuestProgress()).not.toThrow();
    expect(() => rememberGuestBoardClass('cbse', 9)).not.toThrow();
  });
});

describe('merge helpers', () => {
  const p = {
    v: 1 as const,
    board: 'cbse' as const,
    classLevel: 10,
    lessons: [
      { chapter: 'cbse-10-science-ch01', slide: 10, completed: true, updatedAt: T },
      { chapter: 'cbse-10-science-ch02', slide: 3, completed: false, updatedAt: T },
    ],
    practice: [{ chapter: 'cbse-10-science-ch01', question: 'q_a', correct: false, answeredAt: T }],
  };

  it('only completed lessons or practice are worth a merge', () => {
    expect(hasMergeableProgress(p)).toBe(true);
    expect(hasMergeableProgress({ v: 1, lessons: [p.lessons[1]!], practice: [] })).toBe(false);
    expect(hasMergeableProgress({ v: 1, lessons: [], practice: [] })).toBe(false);
  });

  it('after a merge keeps only incomplete lesson positions', () => {
    expect(afterMerge(p)).toEqual({ v: 1, lessons: [p.lessons[1]], practice: [] });
    writeGuestProgress(afterMerge(p));
    expect(hasMergeableProgress(readGuestProgress())).toBe(false);
  });

  it('writing an empty object removes the key', () => {
    writeGuestProgress(p);
    expect(window.localStorage.getItem(GUEST_STORAGE_KEY)).not.toBeNull();
    writeGuestProgress({ v: 1, lessons: [], practice: [] });
    expect(window.localStorage.getItem(GUEST_STORAGE_KEY)).toBeNull();
  });

  it('a lesson stays completed once completed', () => {
    recordGuestLessonPosition('cbse-10-science-ch01', 20, true, new Date(T));
    recordGuestLessonPosition('cbse-10-science-ch01', 2, false, new Date(T));
    expect(readGuestProgress().lessons).toEqual([{ chapter: 'cbse-10-science-ch01', slide: 2, completed: true, updatedAt: T }]);
  });

  it('summarises a chapter', () => {
    expect(chapterSummary(p, 'cbse-10-science-ch01')).toEqual({ lessonSlide: 10, lessonCompleted: true, practiceAnswered: 1, practiceCorrect: 0 });
    expect(chapterSummary(p, 'cbse-10-science-ch09')).toEqual({ lessonSlide: null, lessonCompleted: false, practiceAnswered: 0, practiceCorrect: 0 });
  });
});
