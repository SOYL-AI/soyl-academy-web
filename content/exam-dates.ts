/**
 * Board exam start dates for the homepage exam clock (plan §3.2, screen 4).
 *
 * OFFICIAL DATE SHEETS ONLY. A date goes in here only after it has been read from the board's own published
 * date sheet, with that document's URL. Never an estimate, a news report or last year's pattern: when a board
 * has not published, there is no entry, and the clock shows `BOARD_EXAMS_MONTH_LINE` with no number.
 *
 * Status on 2026-11-10:
 * - CBSE: cbse.gov.in lists "Date Sheet for Class X and Class XII Board Examinations, 2027"
 *   (documents/Datesheet_ClassX _XII_2027_Main_06112026.pdf). Not read yet, so no entry. When it is read,
 *   add one entry per class with the first paper's date.
 * - CISCE (ICSE, ISC): the 2027 timetable was not published on cisce.org.
 */
export type BoardExam = 'cbse' | 'icse' | 'isc';

export interface FirstPaper {
  exam: BoardExam;
  classLevel: 10 | 12;
  /** The first paper's date, `YYYY-MM-DD`, in IST. */
  date: string;
  /** URL of the official date sheet the date was read from. */
  source: string;
  /** When it was read, `YYYY-MM-DD`. */
  checked: string;
}

export const FIRST_PAPERS: readonly FirstPaper[] = [];

/** Shown instead of a count while a board has not published its date sheet. */
export const BOARD_EXAMS_MONTH_LINE = 'Board exams begin in February.';

export function firstPaperFor(exam: BoardExam, classLevel: number): FirstPaper | null {
  return FIRST_PAPERS.find((p) => p.exam === exam && p.classLevel === classLevel) ?? null;
}
