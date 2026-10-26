/**
 * Script checks for language subjects taught in their own script (CONTEXT §4: "Hindi in
 * Devanagari"; other Indian languages likewise). Ported from the Hindi exemplar validator
 * (handoffs/2026-10-26-exemplar-hindi-m1.md) and made generic by script: the Brahmic blocks share
 * one layout (ISCII-derived), so the same offsets find vowel signs, virama, nukta and anusvara in
 * Devanagari, Bengali, Gurmukhi, Gujarati, Odia, Tamil, Telugu, Kannada and Malayalam.
 *
 * Used by the content gate (content-templates/exemplars.test.ts) and pipeline lint (stage 4).
 * Rules (code → severity):
 *   script.nfc            error    every string is Unicode NFC
 *   script.well-formed    error    no vowel sign without a base, two vowel signs in a row, virama +
 *                                  vowel sign, nukta after a non-consonant, doubled anusvara/
 *                                  candrabindu/virama, anusvara before a vowel sign, space before a
 *                                  danda, "।।" (use ॥)
 *   script.latin-run      error    a run of ≥ 3 Latin words in a student-facing field (maths, code,
 *                                  CBSE/NCERT/SOYL… and (A)/(R) allowed)
 *   script.no-script      error    a student-facing field with Latin letters and none of the script
 *   script.narration      error    narration has Latin letters, digits (ASCII or native) or symbols
 *   script.heading        error    a slide heading without the script
 *   script.majority       error    a stem / notes body / flashcard side with more Latin than script letters
 */

export interface ScriptInfo {
  code: string;
  name: string;
  /** First code point of the Unicode block. */
  base: number;
  /** Last code point of the block. */
  end: number;
  /** Brahmic layout (vowel signs at base+0x3E…), so the well-formedness rules apply. */
  brahmic: boolean;
}

const brahmic = (code: string, name: string, base: number): ScriptInfo => ({ code, name, base, end: base + 0x7f, brahmic: true });

/** ISO 15924 → block. Non-Brahmic scripts get the generic checks only (NFC, Latin runs, narration). */
export const SCRIPTS: Record<string, ScriptInfo> = {
  Deva: brahmic('Deva', 'Devanagari', 0x0900),
  Beng: brahmic('Beng', 'Bengali', 0x0980),
  Guru: brahmic('Guru', 'Gurmukhi', 0x0a00),
  Gujr: brahmic('Gujr', 'Gujarati', 0x0a80),
  Orya: brahmic('Orya', 'Odia', 0x0b00),
  Taml: brahmic('Taml', 'Tamil', 0x0b80),
  Telu: brahmic('Telu', 'Telugu', 0x0c00),
  Knda: brahmic('Knda', 'Kannada', 0x0c80),
  Mlym: brahmic('Mlym', 'Malayalam', 0x0d00),
  Arab: { code: 'Arab', name: 'Arabic (Urdu, Kashmiri)', base: 0x0600, end: 0x06ff, brahmic: false },
  Olck: { code: 'Olck', name: 'Ol Chiki (Santali)', base: 0x1c50, end: 0x1c7f, brahmic: false },
  Mtei: { code: 'Mtei', name: 'Meetei Mayek (Manipuri)', base: 0xabc0, end: 0xabff, brahmic: false },
  Tibt: { code: 'Tibt', name: 'Tibetan (Bhutia, Sherpa)', base: 0x0f00, end: 0x0fff, brahmic: false },
  Lepc: { code: 'Lepc', name: 'Lepcha', base: 0x1c00, end: 0x1c4f, brahmic: false },
};

/** Teaching language (ISO 639) → script, for content that does not carry a script itself. */
export const LANGUAGE_SCRIPTS: Record<string, string> = {
  hi: 'Deva', sa: 'Deva', mr: 'Deva', ne: 'Deva', kok: 'Deva', mai: 'Deva', doi: 'Deva', bho: 'Deva',
  bn: 'Beng', as: 'Beng', pa: 'Guru', gu: 'Gujr', or: 'Orya', ta: 'Taml', te: 'Telu', kn: 'Knda', ml: 'Mlym',
  ur: 'Arab', ks: 'Arab', sat: 'Olck', mni: 'Mtei', bo: 'Tibt', lep: 'Lepc',
};

/** The script whose checks apply to content in `language`, or null for Latin-script / unknown languages. */
export function scriptForLanguage(language: string, script?: string | null): ScriptInfo | null {
  const code = script && script !== 'Latn' ? script : LANGUAGE_SCRIPTS[language];
  return code ? (SCRIPTS[code] ?? null) : null;
}

export interface ScriptIssue {
  rule: string;
  severity: 'error' | 'warning';
  path: string;
  message: string;
}

const hex = (n: number) => `\\u{${n.toString(16)}}`;
const range = (s: ScriptInfo, a: number, b: number) => `${hex(s.base + a)}-${hex(s.base + b)}`;

interface ScriptPatterns {
  any: RegExp;
  letters: RegExp;
  wellFormed: [RegExp, string][];
  digits: RegExp;
}

const cache = new Map<string, ScriptPatterns>();

function patterns(s: ScriptInfo): ScriptPatterns {
  const hit = cache.get(s.code);
  if (hit) return hit;
  const block = `${hex(s.base)}-${hex(s.end)}`;
  const p: ScriptPatterns = {
    any: new RegExp(`[${block}]`, 'u'),
    letters: new RegExp(`[${block}]`, 'gu'),
    digits: s.brahmic ? new RegExp(`[0-9${range(s, 0x66, 0x6f)}]`, 'u') : /[0-9]/u,
    wellFormed: [],
  };
  if (s.brahmic) {
    const matra = `[${range(s, 0x3e, 0x4c)}${range(s, 0x62, 0x63)}]`;
    const consonant = `[${range(s, 0x15, 0x39)}${range(s, 0x58, 0x5f)}${range(s, 0x72, 0x7f)}]`;
    const nukta = hex(s.base + 0x3c);
    const virama = hex(s.base + 0x4d);
    const bindu = `[${range(s, 0x01, 0x02)}]`;
    p.wellFormed = [
      [new RegExp(`(^|[^${block}\\u200c\\u200d])${matra}`, 'u'), 'vowel sign without a base letter'],
      [new RegExp(`${matra}${matra}`, 'u'), 'two vowel signs in a row'],
      [new RegExp(`${virama}${matra}`, 'u'), 'virama followed by a vowel sign'],
      [new RegExp(`(^|(?!${consonant})[\\s\\S])${nukta}`, 'u'), 'nukta not after a consonant'],
      [new RegExp(`${bindu}{2}`, 'u'), 'double anusvara/candrabindu'],
      [new RegExp(`${virama}{2}`, 'u'), 'double virama'],
      [new RegExp(`${bindu}${matra}`, 'u'), 'anusvara/candrabindu before a vowel sign (wrong order)'],
      [/।।/u, 'double danda (use ॥)'],
      [/ [।॥]/u, 'space before a danda'],
    ];
  }
  cache.set(s.code, p);
  return p;
}

/** Removes maths ($…$, $$…$$), code spans and fenced code before script checks. */
export function stripNonProse(text: string): string {
  return text
    .replace(/(```|~~~)[\s\S]*?\1/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*\$/g, ' ');
}

/** Board names and the assertion-reason labels are allowed in Latin inside Indic text. */
const LATIN_ALLOWED = /\b(CBSE|CISCE|SOYL|NCERT|ICSE|ISC)\b|\((A|R)\)|\b(A|R)\b/g;
const LATIN_RUN = /[A-Za-z][A-Za-z'’-]*(?:\s+[A-Za-z][A-Za-z'’-]*){2,}/;
/** Characters TTS should not read: formulae, brackets, quotes, arrows. */
const NARRATION_SYMBOLS = /[→↔⇌=/*#|()[\]{}<>"“”'‘’…–—$\\^_+%°]/u;

/** Keys that are identifiers, enums or machine data, never shown as prose. */
const SKIP_KEY = /^(id|unit|language|status|type|layout|kind|competency|bloom|tag|topic_id|topic_ids|left_id|right_id|option_ids|from|to|direction|origin|template_version|model|generated_at|author|academic_year|created_at|check_question_id|key|map_id|format|passage_origin|expr|color|style|class|highlight|label_position|audio|order|blob_key|provenance|build|alt)$/;

export interface ScriptCheckOptions {
  /** Root path for messages (e.g. "decks[0]"). */
  root?: string;
}

/** Collects student-facing strings (path, value) from any content object. */
export function facingStrings(value: unknown, root = '$'): [string, string][] {
  const out: [string, string][] = [];
  const walk = (v: unknown, p: string, key: string | null, parent: Record<string, unknown> | null) => {
    if (key !== null && SKIP_KEY.test(key)) return;
    if (typeof v === 'string') {
      // Raw SVG markup is code, not prose.
      if (key === 'spec' && parent?.kind === 'svg') return;
      out.push([p, v]);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`, key, parent));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`, k, v as Record<string, unknown>);
  };
  walk(value, root, null, null);
  return out;
}

/** Every string (for NFC), including identifiers. */
function allStrings(value: unknown, root: string): [string, string][] {
  const out: [string, string][] = [];
  const walk = (v: unknown, p: string) => {
    if (typeof v === 'string') out.push([p, v]);
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`);
  };
  walk(value, root);
  return out;
}

const snippet = (s: string, at: number) => s.slice(Math.max(0, at - 10), at + 10);

/** Generic text checks for one content object (deck, notes, flashcards, a question, a release). */
export function checkScriptText(value: unknown, script: ScriptInfo, opts: ScriptCheckOptions = {}): ScriptIssue[] {
  const root = opts.root ?? '$';
  const issues: ScriptIssue[] = [];
  const add = (rule: string, path: string, message: string, severity: 'error' | 'warning' = 'error') => issues.push({ rule, severity, path, message });
  const p = patterns(script);

  for (const [path, s] of allStrings(value, root)) if (s !== s.normalize('NFC')) add('script.nfc', path, 'not Unicode NFC (normalise the text)');

  for (const [path, s] of facingStrings(value, root)) {
    for (const [re, message] of p.wellFormed) {
      const at = s.search(re);
      if (at >= 0) add('script.well-formed', path, `${message}: …${snippet(s, at)}…`);
    }
    const prose = stripNonProse(s).replace(LATIN_ALLOWED, ' ');
    const run = LATIN_RUN.exec(prose);
    if (run) add('script.latin-run', path, `Latin run "${run[0].slice(0, 60)}" (≥ 3 words) in ${script.name} content`);
    else if (!p.any.test(s) && /[A-Za-z]{3,}/.test(prose)) add('script.no-script', path, `no ${script.name} at all: "${s.slice(0, 40)}"`);
  }
  return issues;
}

/** Narration (read by a hi-IN / bn-IN… voice): script only, no Latin, digits or symbols. */
export function checkNarration(narration: string, script: ScriptInfo, path: string): ScriptIssue[] {
  const issues: ScriptIssue[] = [];
  const p = patterns(script);
  const latin = /[A-Za-z]+/.exec(narration);
  if (latin) issues.push({ rule: 'script.narration', severity: 'error', path, message: `narration has Latin letters ("${latin[0]}"); write it in ${script.name}` });
  const digit = p.digits.exec(narration);
  if (digit) issues.push({ rule: 'script.narration', severity: 'error', path, message: `narration has a digit ("${digit[0]}"); write numbers as words` });
  const sym = NARRATION_SYMBOLS.exec(narration);
  if (sym) issues.push({ rule: 'script.narration', severity: 'error', path, message: `narration has the symbol "${sym[0]}"; TTS reads it literally` });
  return issues;
}

/** Script letters vs Latin letters in prose (maths/code removed). */
export function letterCounts(text: string, script: ScriptInfo): { script: number; latin: number } {
  const prose = stripNonProse(text);
  return { script: (prose.match(patterns(script).letters) ?? []).length, latin: (prose.match(/[A-Za-z]/g) ?? []).length };
}

export function checkMajority(text: string, script: ScriptInfo, path: string): ScriptIssue[] {
  const c = letterCounts(text, script);
  return c.latin > c.script
    ? [{ rule: 'script.majority', severity: 'error', path, message: `more Latin (${c.latin}) than ${script.name} (${c.script}) letters` }]
    : [];
}

interface ReleaseLike {
  decks?: { slides: { id: string; heading: string; narration: string }[] }[];
  notes?: { sections: { body_md: string }[] };
  flashcards?: { cards: { front_md: string; back_md: string }[] };
  questions?: { stem_md: string }[];
}

/** All script rules over a release-shaped object (any of decks / notes / flashcards / questions). */
export function checkScriptRelease(release: ReleaseLike, script: ScriptInfo): ScriptIssue[] {
  const issues: ScriptIssue[] = [...checkScriptText(release, script)];
  const p = patterns(script);
  release.decks?.forEach((d, di) =>
    d.slides.forEach((s, si) => {
      const path = `$.decks[${di}].slides[${si}]`;
      issues.push(...checkNarration(s.narration, script, `${path}.narration`));
      if (!p.any.test(s.heading)) issues.push({ rule: 'script.heading', severity: 'error', path: `${path}.heading`, message: `slide ${s.id} heading has no ${script.name}` });
    }),
  );
  release.notes?.sections.forEach((s, i) => issues.push(...checkMajority(s.body_md, script, `$.notes.sections[${i}].body_md`)));
  release.flashcards?.cards.forEach((c, i) => {
    issues.push(...checkMajority(c.front_md, script, `$.flashcards.cards[${i}].front_md`));
    issues.push(...checkMajority(c.back_md, script, `$.flashcards.cards[${i}].back_md`));
  });
  release.questions?.forEach((q, i) => issues.push(...checkMajority(q.stem_md, script, `$.questions[${i}].stem_md`)));
  return issues;
}
