/**
 * Links built from ids (pure; no React), shared by the /learn home and the student dashboard.
 */
import { learnPath, type BoardSlug } from '../lib/catalog';

/** /learn/cbse/10/science/ch01 from cbse-10-science-ch01 (CISCE ids start with icse/isc). */
export function chapterHref(chapterId: string): string | null {
  const m = /^(cbse|icse|isc)-(\d{1,2})-(.+)-(ch\d{2})$/.exec(chapterId);
  if (!m) return null;
  const board: BoardSlug = m[1] === 'cbse' ? 'cbse' : 'cisce';
  return learnPath(board, Number(m[2]), `${m[1]}-${m[2]}-${m[3]}`, chapterId);
}
