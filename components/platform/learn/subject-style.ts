/**
 * A subject's tile on course cards (ADR-023): a short glyph and a hue, derived from its id and language, so
 * every subject gets a stable, recognisable look without images (WEB-1: nothing from third parties).
 */
export type SubjectHue = 'blue' | 'red' | 'yellow' | 'green' | 'violet' | 'teal';

const RULES: Array<[RegExp, string, SubjectHue]> = [
  [/math/, 'π', 'blue'],
  [/physics/, 'Ph', 'violet'],
  [/chemistry/, 'Ch', 'teal'],
  [/biology/, 'Bi', 'green'],
  [/science/, 'Sc', 'green'],
  [/social|history|civics|geography|political|economics|commerce|accountancy|business/, 'SS', 'yellow'],
  [/english/, 'En', 'red'],
  [/hindi/, 'हि', 'red'],
  [/sanskrit/, 'सं', 'yellow'],
  [/computer|informatics|information|artificial|coding/, '</>', 'violet'],
];

export function subjectStyle(subjectId: string, name: string, language?: string | null): { glyph: string; hue: SubjectHue } {
  const key = `${subjectId} ${name}`.toLowerCase();
  for (const [re, glyph, hue] of RULES) if (re.test(key)) return { glyph, hue };
  if (language === 'hi') return { glyph: 'हि', hue: 'red' };
  const letters = name.replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean);
  const glyph = letters.length > 1 ? `${letters[0]![0]}${letters[1]![0]}` : (letters[0] ?? '?').slice(0, 2);
  const hues: SubjectHue[] = ['blue', 'red', 'yellow', 'green', 'violet', 'teal'];
  let h = 0;
  for (const ch of subjectId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { glyph: glyph.charAt(0).toUpperCase() + glyph.slice(1).toLowerCase(), hue: hues[h % hues.length]! };
}
