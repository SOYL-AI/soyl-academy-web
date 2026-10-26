/**
 * Catalog URL slugs (ARCHITECTURE §3.1): /learn/{board}/{class}/{subject}/{chapter}
 *   board   cbse | cisce          class 7–12 (CISCE: ICSE up to 10, ISC for 11–12, from the class)
 *   subject id without the exam/class prefix: cbse-10-science → science, isc-12-hindi → hindi
 *   chapter ch01 (cbse-10-science-ch01)
 */
export const BOARDS = ['cbse', 'cisce'] as const;
export type BoardSlug = (typeof BOARDS)[number];
export const CLASS_LEVELS = [7, 8, 9, 10, 11, 12] as const;

export const BOARD_NAMES: Record<BoardSlug, string> = { cbse: 'CBSE', cisce: 'CISCE' };

export function examFor(board: BoardSlug, classLevel: number): 'cbse' | 'icse' | 'isc' {
  if (board === 'cbse') return 'cbse';
  return classLevel <= 10 ? 'icse' : 'isc';
}

export function examLabel(board: BoardSlug, classLevel: number): string {
  const exam = examFor(board, classLevel);
  return exam === 'cbse' ? 'CBSE' : exam === 'icse' ? 'ICSE' : 'ISC';
}

export function parseBoard(raw: string): BoardSlug | null {
  return (BOARDS as readonly string[]).includes(raw) ? (raw as BoardSlug) : null;
}

export function parseClass(raw: string): number | null {
  if (!/^(7|8|9|10|11|12)$/.test(raw)) return null;
  return Number(raw);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function subjectIdFor(board: BoardSlug, classLevel: number, slug: string): string | null {
  if (!SLUG_RE.test(slug) || slug.length > 80) return null;
  return `${examFor(board, classLevel)}-${classLevel}-${slug}`;
}

export function subjectSlug(subjectId: string): string {
  return subjectId.replace(/^(?:cbse|icse|isc)-(?:7|8|9|10|11|12)-/, '');
}

export function parseChapterSlug(raw: string): string | null {
  return /^ch\d{2}$/.test(raw) ? raw : null;
}

export function chapterSlug(chapterId: string): string {
  const m = /-(ch\d{2})$/.exec(chapterId);
  return m ? m[1]! : chapterId;
}

export function learnPath(board: BoardSlug, classLevel?: number, subjectId?: string, chapterId?: string): string {
  let p = `/learn/${board}`;
  if (classLevel !== undefined) p += `/${classLevel}`;
  if (subjectId) p += `/${subjectSlug(subjectId)}`;
  if (chapterId) p += `/${chapterSlug(chapterId)}`;
  return p;
}

/** Chapter views linked from the hub (the views themselves arrive in M2). */
export const CHAPTER_VIEWS = [
  { slug: 'lesson', title: 'Visual lesson', blurb: 'Short slides, one idea at a time, with narration.' },
  { slug: 'notes', title: 'Notes', blurb: 'Clear chapter notes for quick revision.' },
  { slug: 'flashcards', title: 'Flashcards', blurb: 'Quick recall of key terms and facts.' },
  { slug: 'practice', title: 'Practice', blurb: 'Board-style questions with instant checks.' },
] as const;
export type ChapterView = (typeof CHAPTER_VIEWS)[number]['slug'];

export function parseChapterView(raw: string): ChapterView | null {
  return CHAPTER_VIEWS.some((v) => v.slug === raw) ? (raw as ChapterView) : null;
}

/** BCP 47 tag for a subject's teaching language, for `lang` attributes (Devanagari font switch). */
export function langAttr(language: string | null | undefined): string | undefined {
  if (!language || language === 'en') return undefined;
  return /^[a-z]{2,3}$/.test(language) ? language : undefined;
}
