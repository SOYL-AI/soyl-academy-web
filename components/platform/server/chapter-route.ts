/**
 * Shared loader for the chapter routes (/learn/[board]/[class]/[subject]/[chapter] and its views): parses
 * the URL, fetches the public hub (ISR, deduplicated per request) and checks the hub belongs to that board
 * and class. Returns null for anything that should be a 404.
 */
import type { ChapterHub } from '@/platform/shared/api-client';
import { BOARD_NAMES, examFor, langAttr, learnPath, parseBoard, parseChapterSlug, parseClass, subjectIdFor, type BoardSlug } from '../lib/catalog';
import type { Crumb } from '../shell/PageHeader';
import { getHub } from './content';

export interface ChapterParams {
  board: string;
  class: string;
  subject: string;
  chapter: string;
}

export interface ChapterRoute {
  board: BoardSlug;
  classLevel: number;
  chapterId: string;
  hub: ChapterHub;
  /** /learn/cbse/10/science/ch01 */
  base: string;
  /** BCP 47 tag of the subject's language (undefined for English). */
  lang: string | undefined;
  crumbs: Crumb[];
}

export async function loadChapterRoute(params: Promise<ChapterParams> | ChapterParams): Promise<ChapterRoute | null> {
  const p = await params;
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  const ch = parseChapterSlug(p.chapter);
  if (!board || !classLevel || !ch) return null;
  const subjectId = subjectIdFor(board, classLevel, p.subject);
  if (!subjectId) return null;
  const chapterId = `${subjectId}-${ch}`;
  const hub = await getHub(chapterId);
  if (!hub || hub.subject.classLevel !== classLevel || hub.subject.exam !== examFor(board, classLevel) || hub.subject.id !== subjectId) return null;
  const base = learnPath(board, classLevel, subjectId, chapterId);
  return {
    board,
    classLevel,
    chapterId,
    hub,
    base,
    lang: langAttr(hub.subject.language),
    crumbs: [
      { name: 'Learn', path: '/learn' },
      { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
      { name: hub.subject.name, path: learnPath(board, classLevel, subjectId) },
      { name: `Chapter ${hub.chapter.number}`, path: base },
    ],
  };
}

export { defaultPart, lessonHref, parsePart } from '../lib/lesson-links';
