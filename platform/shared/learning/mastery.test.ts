import { describe, expect, it } from 'vitest';
import { MASTERY } from '../config/learning';
import { EMPTY_EVIDENCE, chapterMastery, difficultiesIn, difficultyBand, masteryComponents, masteryScore, normalizeEvidence, subjectMastery, type ChapterEvidence } from './mastery';

const ev = (over: Partial<ChapterEvidence> = {}): ChapterEvidence => ({
  ...EMPTY_EVIDENCE,
  lessonParts: 2,
  practiceTotal: 40,
  chapterTestAvailable: true,
  ...over,
});

/** A student who did everything well. */
const strong = (over: Partial<ChapterEvidence> = {}) =>
  ev({ lessonPartsStarted: 2, lessonPartsCompleted: 2, practiceAttempted: 36, practiceSolved: 34, firstTryChecked: 30, firstTryCorrect: 27, chapterTestPct: 90, ...over });

describe('chapterMastery', () => {
  it('no data at all → not_started with score 0, hints point at what exists', () => {
    const m = chapterMastery(ev());
    expect(m).toMatchObject({ level: 'not_started', score: 0, firstTryAccuracy: null, nextLevel: 'attempted' });
    expect(m.hints).toEqual(['finish_lesson', 'practice_more', 'take_chapter_test']);
    // A chapter with nothing published has no hints and stays not_started.
    expect(chapterMastery(EMPTY_EVIDENCE)).toMatchObject({ level: 'not_started', score: 0, hints: [] });
  });

  it('opening a lesson is enough for attempted', () => {
    const m = chapterMastery(ev({ lessonPartsStarted: 1 }));
    expect(m.level).toBe('attempted');
    expect(m.nextLevel).toBe('familiar');
    expect(m.hints).toContain('finish_lesson');
  });

  it('one lucky answer does not make a chapter familiar (accuracy is shrunk while answers are few)', () => {
    const m = chapterMastery(ev({ practiceAttempted: 1, practiceSolved: 1, firstTryChecked: 1, firstTryCorrect: 1 }));
    expect(m.firstTryAccuracy).toBe(1);
    expect(m.components.accuracy).toBeCloseTo(1 / MASTERY.accuracyFullConfidenceAt, 3);
    expect(m.level).toBe('attempted');
  });

  it('climbs familiar → proficient → mastered as evidence grows', () => {
    const familiar = chapterMastery(ev({ lessonPartsStarted: 2, lessonPartsCompleted: 2, practiceAttempted: 10, practiceSolved: 8, firstTryChecked: 10, firstTryCorrect: 7 }));
    expect(familiar.level).toBe('familiar');
    const proficient = chapterMastery(ev({ lessonPartsStarted: 2, lessonPartsCompleted: 2, practiceAttempted: 25, practiceSolved: 22, firstTryChecked: 20, firstTryCorrect: 16, chapterTestPct: 70 }));
    expect(proficient.level).toBe('proficient');
    expect(proficient.hints).toEqual(['practice_more', 'improve_chapter_test']);
    const mastered = chapterMastery(strong());
    expect(mastered).toMatchObject({ level: 'mastered', nextLevel: null, hints: [] });
    expect(mastered.score).toBeGreaterThanOrEqual(MASTERY.levels.mastered.minScore);
  });

  it('mastered needs the chapter test when one exists, and not when none does', () => {
    const noTestTaken = chapterMastery(strong({ chapterTestPct: null }));
    expect(noTestTaken.level).not.toBe('mastered');
    expect(noTestTaken.hints).toContain('take_chapter_test');
    const lowTest = chapterMastery(strong({ chapterTestPct: 60 }));
    expect(lowTest.level).not.toBe('mastered');
    expect(lowTest.hints).toContain('improve_chapter_test');
    const noTestExists = chapterMastery(strong({ chapterTestAvailable: false, chapterTestPct: null }));
    expect(noTestExists.components.test).toBeNull();
    expect(noTestExists.level).toBe('mastered');
  });

  it('high score with poor first-try accuracy stays below proficient and says why', () => {
    const m = chapterMastery(strong({ firstTryChecked: 30, firstTryCorrect: 15, chapterTestPct: 100 }));
    expect(m.level).toBe('familiar');
    expect(m.hints).toContain('improve_accuracy');
  });

  it('a lesson-only chapter (no practice, no test) is mastered by finishing the lesson', () => {
    const m = chapterMastery({ ...EMPTY_EVIDENCE, lessonParts: 1, lessonPartsStarted: 1, lessonPartsCompleted: 1 });
    expect(m.components).toEqual({ lesson: 1, coverage: null, accuracy: null, test: null });
    expect(m).toMatchObject({ level: 'mastered', score: 100 });
  });

  it('minAttempted is capped at a small pool', () => {
    const m = chapterMastery({ ...EMPTY_EVIDENCE, practiceTotal: 6, practiceAttempted: 6, practiceSolved: 6, firstTryChecked: 6, firstTryCorrect: 6 });
    // accuracy shrunk (6/10) but coverage full; no lesson/test → weights 0.25 + 0.3
    expect(m.score).toBe(Math.round((100 * (0.25 * 1 + 0.3 * 0.6)) / 0.55));
    expect(m.level).toBe('proficient');
  });

  it('guest-merged evidence is just evidence: a merged chapter test-less history maps the same way', () => {
    // Guest merge keeps one (the latest) answer per question; the formula sees counts only.
    const merged = ev({ chapterTestAvailable: false, practiceAttempted: 12, practiceSolved: 12, firstTryChecked: 12, firstTryCorrect: 12 });
    expect(chapterMastery(merged)).toEqual(chapterMastery({ ...merged }));
    expect(chapterMastery(merged).level).toBe('familiar');
  });

  it('clamps inconsistent evidence (retired content, negative or NaN input)', () => {
    const n = normalizeEvidence(ev({ practiceTotal: 5, practiceAttempted: 3, practiceSolved: 9, firstTryChecked: 2, firstTryCorrect: 7, chapterTestPct: 140, lessonPartsCompleted: Number.NaN }));
    expect(n).toMatchObject({ practiceSolved: 3, firstTryCorrect: 2, chapterTestPct: 100, lessonPartsCompleted: 0 });
    const m = chapterMastery(ev({ practiceTotal: 2, practiceAttempted: 5, practiceSolved: 5, lessonParts: 1, lessonPartsCompleted: 3 }));
    expect(m.components.coverage).toBe(1);
    expect(m.components.lesson).toBe(1);
    expect(m.score).toBeLessThanOrEqual(100);
    // A graded chapter test proves the test exists.
    expect(normalizeEvidence(ev({ chapterTestAvailable: false, chapterTestPct: 50 })).chapterTestAvailable).toBe(true);
  });

  it('score is the weighted mean of present components and is deterministic', () => {
    const c = masteryComponents(normalizeEvidence(strong()));
    const w = MASTERY.weights;
    expect(masteryScore(c)).toBe(Math.round(100 * (w.lesson * c.lesson! + w.coverage * c.coverage! + w.accuracy * c.accuracy! + w.test * c.test!)));
    expect(masteryScore({ lesson: null, coverage: null, accuracy: null, test: null })).toBe(0);
    expect(chapterMastery(strong())).toEqual(chapterMastery(strong()));
  });

  it('config levels are ordered', () => {
    const l = MASTERY.levels;
    expect(l.familiar.minScore).toBeLessThan(l.proficient.minScore);
    expect(l.proficient.minScore).toBeLessThan(l.mastered.minScore);
    const sum = Object.values(MASTERY.weights).reduce((s, x) => s + x, 0);
    expect(sum).toBeCloseTo(1, 6);
  });
});

describe('subjectMastery', () => {
  it('averages over every chapter (untouched count 0) and counts levels', () => {
    const chapters = [chapterMastery(strong()), chapterMastery(ev({ lessonPartsStarted: 1 })), chapterMastery(ev()), chapterMastery(ev())];
    const s = subjectMastery(chapters);
    expect(s.chapterCount).toBe(4);
    expect(s.levels).toEqual({ not_started: 2, attempted: 1, familiar: 0, proficient: 0, mastered: 1 });
    expect(s.score).toBe(Math.round(chapters.reduce((a, c) => a + c.score, 0) / 4));
    expect(subjectMastery([])).toMatchObject({ score: 0, chapterCount: 0 });
  });
});

describe('difficulty bands', () => {
  it('maps 1–5 to easy/medium/hard and clamps odd values', () => {
    expect([1, 2, 3, 4, 5].map(difficultyBand)).toEqual(['easy', 'easy', 'medium', 'hard', 'hard']);
    expect(difficultyBand(0)).toBe('easy');
    expect(difficultyBand(9)).toBe('hard');
    expect(difficultyBand(Number.NaN)).toBe('medium');
    expect([...difficultiesIn('easy'), ...difficultiesIn('medium'), ...difficultiesIn('hard')].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
