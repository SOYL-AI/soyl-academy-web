/**
 * Subjects of a board and class that have learning content, in the browser (ADR-023). Same source as the
 * server's getContentSubjectIds: the public daily-challenge list (one entry per subject with practice). One
 * request per board/class per page load (promise cache); failures resolve to [] and are retried next time.
 */
import type { BoardSlug } from '../lib/catalog';
import { api } from '../lib/api-browser';

export interface ContentSubject {
  subjectId: string;
  name: string;
}

const cache = new Map<string, Promise<ContentSubject[]>>();

export function fetchContentSubjects(board: BoardSlug, classLevel: number): Promise<ContentSubject[]> {
  const key = `${board}-${classLevel}`;
  let p = cache.get(key);
  if (!p) {
    p = api
      .get('/v1/coins/daily-challenge', { query: { board, class: classLevel } })
      .then((d) => {
        const seen = new Set<string>();
        return d.challenges.filter((c) => !seen.has(c.subjectId) && seen.add(c.subjectId)).map((c) => ({ subjectId: c.subjectId, name: c.subjectName }));
      })
      .catch(() => {
        cache.delete(key);
        return [];
      });
    cache.set(key, p);
  }
  return p;
}
