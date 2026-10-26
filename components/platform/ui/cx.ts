/** Joins class names, skipping falsy values. Platform UI uses CSS Modules, not Tailwind (ADR-009). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
