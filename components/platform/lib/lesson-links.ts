/**
 * Lesson part links (pure; server and client). Parts come from the hub (`assets.lesson.parts[].part`):
 * 1-based, or 0 for a chapter that is a single deck (backend-api M2 point 3).
 *
 * URLs: /learn/…/chNN/lesson opens the first part; other parts are /learn/…/chNN/lesson?part=N. The proxy
 * rewrites `?part=N` to the prerendered /lesson/N route (ADR-017), so every part is ISR.
 */
export interface PartLike {
  part: number;
}

/** The deck part to open when none is asked for: the first listed part (0 for a single-deck chapter). */
export function defaultPart(parts: readonly PartLike[]): number | undefined {
  return parts[0]?.part;
}

/** A raw part value → a part the hub lists, else null. */
export function parsePart(raw: string | string[] | undefined, parts: readonly PartLike[]): number | null {
  if (typeof raw !== 'string' || !/^\d{1,2}$/.test(raw)) return null;
  const n = Number(raw);
  return parts.some((x) => x.part === n) ? n : null;
}

/** Link to a lesson part: the plain /lesson URL for the first part, `?part=` for the others. */
export function lessonHref(base: string, parts: readonly PartLike[], part: number | undefined): string {
  return part === undefined || part === defaultPart(parts) ? `${base}/lesson` : `${base}/lesson?part=${part}`;
}
