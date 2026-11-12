/**
 * Class hub helpers (pure; server and tests). Design language v3 (ADR-032): every subject is listed by tier, the
 * ones with lessons first, so a subject that has content is never folded away under "coming soon".
 */

/** More subjects than this in a tier: plain cards (a calmer, denser grid; DESIGN-LANGUAGE §10 "Class hub"). */
export const PLAIN_OVER = 8;

/** Subjects with lessons first, keeping the catalog order otherwise; unknown (`null`): the catalog order. */
export function readyFirst<T extends { id: string }>(subjects: readonly T[], ready: ReadonlySet<string> | null): T[] {
  if (!ready) return [...subjects];
  return [...subjects.filter((x) => ready.has(x.id)), ...subjects.filter((x) => !ready.has(x.id))];
}

/** The meta line of a subject card: "14 chapters · Code 086" or "Lessons coming soon · Code 241 · Theory only". */
export function subjectMeta(s: { code?: string | null; theoryOnly?: boolean | null }, chapters: number, hasLessons: boolean | null): string | undefined {
  const parts = [
    hasLessons === false ? 'Lessons coming soon' : chapters > 0 ? `${chapters} ${chapters === 1 ? 'chapter' : 'chapters'}` : null,
    s.code ? `Code ${s.code}` : null,
    s.theoryOnly ? 'Theory only' : null,
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : undefined;
}
