/**
 * A subject's tile on course cards (ADR-023): a hue and, since 2026-10-29, an original drawing (`art`, see
 * components/platform/ui/art/subject-art.ts) derived from its id and language, so every subject gets a stable,
 * recognisable look without images (WEB-1: nothing from third parties). `glyph` (a short text mark) stays for
 * places that print text.
 */
import type { SubjectArtKind } from '@/components/platform/ui/art/subject-art';

export type SubjectHue = 'blue' | 'red' | 'yellow' | 'green' | 'violet' | 'teal';

/** Order matters: "Social Science", "Political Science" and "Computer Science" must match before plain science. */
const RULES: Array<[RegExp, string, SubjectHue, SubjectArtKind]> = [
  [/math/, 'π', 'blue', 'maths'],
  [/physics/, 'Ph', 'violet', 'physics'],
  [/chemistry/, 'Ch', 'teal', 'chemistry'],
  [/biology/, 'Bi', 'green', 'biology'],
  [/history/, 'SS', 'yellow', 'history'],
  [/geography/, 'SS', 'yellow', 'geography'],
  [/civics|political/, 'SS', 'yellow', 'civics'],
  [/economics|commerce|accountancy|business/, 'SS', 'yellow', 'economics'],
  [/social/, 'SS', 'yellow', 'social'],
  [/computer|informatics|information|artificial|coding/, '</>', 'violet', 'computer'],
  [/science/, 'Sc', 'green', 'science'],
  [/english/, 'En', 'red', 'english'],
  [/hindi/, 'हि', 'red', 'hindi'],
  [/sanskrit/, 'सं', 'yellow', 'sanskrit'],
];

export function subjectStyle(subjectId: string, name: string, language?: string | null): { glyph: string; hue: SubjectHue; art: SubjectArtKind } {
  const key = `${subjectId} ${name}`.toLowerCase();
  for (const [re, glyph, hue, art] of RULES) if (re.test(key)) return { glyph, hue, art };
  if (language === 'hi') return { glyph: 'हि', hue: 'red', art: 'hindi' };
  const letters = name.replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean);
  const glyph = letters.length > 1 ? `${letters[0]![0]}${letters[1]![0]}` : (letters[0] ?? '?').slice(0, 2);
  const hues: SubjectHue[] = ['blue', 'red', 'yellow', 'green', 'violet', 'teal'];
  let h = 0;
  for (const ch of subjectId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { glyph: glyph.charAt(0).toUpperCase() + glyph.slice(1).toLowerCase(), hue: hues[h % hues.length]!, art: 'generic' };
}
