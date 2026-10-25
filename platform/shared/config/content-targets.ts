/**
 * Per-chapter content targets (ARCHITECTURE §8.3, CONTEXT §8, §10). Defaults; tune here, not in code.
 */
export const CONTENT_TARGETS = {
  deckSlidesMin: 12,
  deckSlidesMax: 25,
  /** A diagram or visual at least every N slides where the subject allows. */
  visualEverySlides: 3,
  workedExamplesMin: 2,
  checkQuestionsMin: 3,
  checkQuestionsMax: 5,
  narrationMaxWords: 90,
  flashcardsMin: 20,
  flashcardsMax: 40,
  /** Practice questions per chapter by class. */
  practiceQuestionsMin: { 7: 40, 8: 40, 9: 40, 10: 60, 11: 40, 12: 60 } as Record<number, number>,
  chapterTests: 2,
} as const;

/** Test series targets per subject (CONTEXT §10). */
export const TEST_SERIES_TARGETS = {
  boardClasses: {
    classes: [10, 12],
    chapterTestsPerChapter: 2,
    unitTests: 3,
    fullMocksMin: 6,
    liveMocks: 2,
    /** CBSE Class 10 only: May second-exam track. */
    cbse10SecondExamTrack: true,
  },
  otherClasses: {
    classes: [7, 8, 9, 11],
    chapterTestsPerChapter: 2,
    unitTestsMin: 1,
    termPapersMin: 2,
  },
} as const;
