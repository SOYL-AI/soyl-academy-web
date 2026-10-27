/**
 * `/learn/<board>/<class>/<subject>/chNN/lesson?part=N` → internal `/learn/…/chNN/lesson/N` (ADR-017), so
 * every deck part is its own prerendered ISR page while the public URL keeps the `?part=` form
 * (backend-api M2 point 3). Anything that does not look exactly like that is left alone (the page then
 * shows the first part, or a 404 for an unknown part).
 */
const LESSON_PATH_RE = /^\/learn\/(?:cbse|cisce)\/(?:7|8|9|10|11|12)\/[a-z0-9]+(?:-[a-z0-9]+)*\/ch\d{2}\/lesson$/;

export function lessonPartRewrite(pathname: string, search: URLSearchParams): string | null {
  if (!LESSON_PATH_RE.test(pathname)) return null;
  const parts = search.getAll('part');
  if (parts.length !== 1 || !/^\d{1,2}$/.test(parts[0]!)) return null;
  return `${pathname}/${Number(parts[0])}`;
}
