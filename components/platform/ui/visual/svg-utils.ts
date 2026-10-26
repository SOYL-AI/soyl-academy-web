/** Small, deterministic helpers shared by the SVG visual renderers. */
import { createElement, type ReactNode } from 'react';

/** "Nice" tick values covering [min, max] with about `target` steps. */
export function niceTicks(min: number, max: number, target = 5): number[] {
  if (!(Number.isFinite(min) && Number.isFinite(max)) || max <= min) return [];
  const raw = (max - min) / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const start = Math.ceil(min / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 1e-9 && ticks.length < 50; v += step) ticks.push(roundTo(v, step));
  return ticks;
}

function roundTo(v: number, step: number): number {
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  const r = Number(v.toFixed(Math.min(decimals, 10)));
  return Object.is(r, -0) ? 0 : r;
}

/** Compact number label: 2, 0.5, −3, 1.25 (uses a real minus sign). */
export function fmt(n: number): string {
  const s = Number.isInteger(n) ? String(n) : String(Number(n.toFixed(3)));
  return s.replace('-', '−');
}

/** Deterministic short id from content (no useId: these render in Server Components too). */
export function hashId(prefix: string, value: unknown): string {
  const text = typeof value === 'string' ? value : JSON.stringify(value) ?? '';
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${prefix}${(h >>> 0).toString(36)}`;
}

/** Greedy word wrap by character count (good enough for diagram labels, incl. Devanagari). */
export function wrapText(text: string, maxChars: number, maxLines = 4): string[] {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars || !line) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/.{0,1}$/u, '…');
    return kept;
  }
  return lines;
}

export const round = (n: number) => Math.round(n * 100) / 100;

/** Common <text> styling: a paper-coloured halo keeps labels readable over lines in both themes. */
export const LABEL_PROPS = {
  fill: 'currentColor',
  stroke: 'var(--diagram-paper)',
  strokeWidth: 4,
  strokeLinejoin: 'round' as const,
  paintOrder: 'stroke',
  fontSize: 13,
};

/* ------------------------------------------------------------------------------------------------
 * Label formatting. SVG <text> cannot hold KaTeX, so diagram labels get a tiny formatter:
 *   x_1, P_{12}  → subscript;  x^2, 10^{-3} → superscript;  A' → A′ (ASCII prime after a letter);
 *   $…$ segments: a TeX subset (\frac a b → a/b, \sqrt → √, Greek letters, \times, \pm, \le, ^\circ → °,
 *   \text{…}, \ce{H2O} → H₂O); "-" becomes a real minus sign inside $…$. Unknown commands keep their name
 *   (\sin → sin). Everything is returned as React text nodes / <tspan> elements, never HTML strings.
 * ---------------------------------------------------------------------------------------------- */

export interface LabelRun {
  text: string;
  script?: 'sub' | 'sup';
}

// Sentinels for escaped characters (\_ \^ \{ \} \$) so the later passes treat them literally.
const ESC: Record<string, string> = { _: '', '^': '', '{': '', '}': '', $: '' };
const UNESC: Record<string, string> = Object.fromEntries(Object.entries(ESC).map(([k, v]) => [v, k]));
const unescapeLabel = (s: string) => s.replace(/[-]/g, (c) => UNESC[c] ?? c);

const TEX_SYMBOLS: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', epsilon: 'ε', varepsilon: 'ε', theta: 'θ', lambda: 'λ',
  mu: 'μ', pi: 'π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ', tau: 'τ', phi: 'φ', varphi: 'φ', omega: 'ω', Omega: 'Ω', ell: 'ℓ',
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠',
  approx: '≈', infty: '∞', circ: '°', degree: '°', angle: '∠', triangle: '△', parallel: '∥', perp: '⊥', cong: '≅',
  sim: '∼', to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', prime: '′', percent: '%', dots: '…',
  ldots: '…', cdots: '⋯', quad: ' ', qquad: '  ', ',': ' ', ';': ' ', ':': ' ', ' ': ' ', '!': '', '\\': ' ',
  '%': '%', '&': '&', '#': '#',
};
const TEXT_COMMANDS = new Set(['text', 'textrm', 'textit', 'textbf', 'mathrm', 'mathit', 'mathbf', 'mathsf', 'operatorname', 'boldsymbol', 'overline', 'vec', 'hat', 'bar']);
const DROP_COMMANDS = new Set(['left', 'right', 'displaystyle', 'textstyle', 'big', 'Big', 'bigl', 'bigr', 'limits']);

/** Index of the brace closing the one at `open`, or -1. */
function closeBrace(s: string, open: number): number {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}' && --depth === 0) return i;
  }
  return -1;
}

/** One TeX argument at `i`: a {group}, a \command or a single character. */
function readArg(s: string, i: number): [string, number] {
  while (s[i] === ' ') i++;
  if (i >= s.length) return ['', i];
  if (s[i] === '{') {
    const end = closeBrace(s, i);
    return end < 0 ? [s.slice(i + 1), s.length] : [s.slice(i + 1, end), end + 1];
  }
  if (s[i] === '\\') {
    let j = i + 1;
    while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
    const end = Math.max(j, i + 2);
    return [s.slice(i, end), end];
  }
  const ch = String.fromCodePoint(s.codePointAt(i)!);
  return [ch, i + ch.length];
}

/** Parenthesise a fraction/root argument unless it is a single "atom" (2, x, √2, x², π). */
const group = (s: string) => (/^[\p{L}\p{N}.′√_^{}]+$/u.test(s.trim()) ? s.trim() : `(${s.trim()})`);

/** Chemistry in \ce{…}: digits after an element or bracket become subscripts; arrows become glyphs. */
const chem = (s: string) => s.replace(/<=>/g, '⇌').replace(/->/g, '→').replace(/([A-Za-z)\]])(\d+)/g, '$1_{$2}');

/** The TeX subset used inside $…$. Output keeps _ ^ { } for the script pass. */
function texLite(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; ) {
    if (s[i] !== '\\') {
      out += s[i++];
      continue;
    }
    let j = i + 1;
    if (/[A-Za-z]/.test(s[j] ?? '')) while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
    else j++;
    const name = s.slice(i + 1, j);
    i = j;
    if (name === 'frac' || name === 'tfrac' || name === 'dfrac') {
      const [a, i2] = readArg(s, i);
      const [b, i3] = readArg(s, i2);
      i = i3;
      out += `${group(texLite(a))}/${group(texLite(b))}`;
    } else if (name === 'sqrt') {
      const [a, i2] = readArg(s, i);
      i = i2;
      out += `√${group(texLite(a))}`;
    } else if (name === 'ce' || name === 'pu') {
      const [a, i2] = readArg(s, i);
      i = i2;
      out += chem(a);
    } else if (TEXT_COMMANDS.has(name)) {
      const [a, i2] = readArg(s, i);
      i = i2;
      out += texLite(a);
    } else if (DROP_COMMANDS.has(name)) {
      // \left( → (
    } else if (Object.hasOwn(TEX_SYMBOLS, name)) {
      out += TEX_SYMBOLS[name];
      // TeX drops the space after a letter-like symbol (\angle ABC → ∠ABC, \pi r → πr); operators keep it.
      if (/^[A-Za-z]+$/.test(name) && /^[\p{L}∠△∞°′]$/u.test(TEX_SYMBOLS[name])) while (s[i] === ' ') i++;
    } else {
      out += name; // \sin, \log, \max …: keep the name
    }
  }
  return out;
}

/** ASCII ' after a letter/digit is a prime (A' → A′, f'(x)), but not an apostrophe inside a word (Snell's). */
function primes(s: string, maths: boolean): string {
  return s.replace(/'/g, (_m, off: number, str: string) => {
    if (maths) return '′';
    const prev = str[off - 1] ?? '';
    const next = str[off + 1] ?? '';
    if (/[\p{Lu}\p{N}'′)}\]]/u.test(prev)) return '′';
    if (/\p{Ll}/u.test(prev) && !/\p{L}/u.test(next)) return '′';
    return "'";
  });
}

/** Splits text into base / subscript / superscript runs (no nesting: x^{a_1} → sup "a1"). */
function scriptRuns(s: string, maths: boolean): LabelRun[] {
  const runs: LabelRun[] = [];
  let buf = '';
  const flush = () => {
    if (buf) runs.push({ text: maths ? buf.replace(/[{}]/g, '') : buf });
    buf = '';
  };
  for (let i = 0; i < s.length; ) {
    const ch = s[i];
    const next = s[i + 1];
    if ((ch === '_' || ch === '^') && next !== undefined && !/\s/.test(next)) {
      let arg: string;
      let j: number;
      if (next === '{') {
        const end = closeBrace(s, i + 1);
        arg = end < 0 ? s.slice(i + 2) : s.slice(i + 2, end);
        j = end < 0 ? s.length : end + 1;
      } else {
        arg = String.fromCodePoint(s.codePointAt(i + 1)!);
        j = i + 1 + arg.length;
      }
      flush();
      const text = arg.replace(/[_^{}]/g, '');
      if (text) runs.push({ text, script: ch === '_' ? 'sub' : 'sup' });
      i = j;
    } else {
      buf += ch;
      i++;
    }
  }
  flush();
  return runs;
}

/** Parses a diagram label into base / sub / sup runs. Exported for tests and HTML legends. */
export function labelRuns(label: string): LabelRun[] {
  const escaped = label.replace(/\\([_^{}$])/g, (_m, c: string) => ESC[c]);
  const parts = escaped.split('$');
  // An unpaired $ is literal.
  if (parts.length % 2 === 0) {
    const tail = parts.pop()!;
    parts[parts.length - 1] += `${tail}`;
  }
  const runs: LabelRun[] = [];
  parts.forEach((part, i) => {
    const maths = i % 2 === 1;
    let text = part;
    if (maths) {
      text = text.replace(/\^\s*\{?\s*\\circ\s*\}?/g, '°');
      text = texLite(text).replace(/-/g, '−');
    } else if (/\\(ce|pu)\{/.test(text)) {
      text = texLite(text);
    }
    for (const run of scriptRuns(primes(text, maths), maths)) {
      const t = unescapeLabel(run.text);
      const last = runs[runs.length - 1];
      if (last && last.script === run.script) last.text += t;
      else runs.push(run.script ? { text: t, script: run.script } : { text: t });
    }
  });
  return runs.filter((r) => r.text);
}

const SHIFT = { sub: 0.3, sup: -0.42 } as const;

/**
 * Children for an SVG <text>: a plain string when there is nothing to format, else strings and
 * <tspan>s. Sub/superscripts shift with `dy` (works in every browser; Firefox ignores `baseline-shift`)
 * at 75 % size, and the next run shifts back. `data-script="sub|sup"` marks them.
 */
export function svgLabel(label: string, fontSize: number = LABEL_PROPS.fontSize): ReactNode {
  const runs = labelRuns(label);
  if (runs.length === 0) return label;
  if (runs.length === 1 && !runs[0].script) return runs[0].text;
  let offset = 0;
  return runs.map((run, i) => {
    const target = run.script ? SHIFT[run.script] * fontSize : 0;
    const dy = round(target - offset);
    offset = target;
    if (!run.script && dy === 0) return run.text;
    return createElement('tspan', { key: i, dy: dy || undefined, fontSize: run.script ? '75%' : undefined, 'data-script': run.script }, run.text);
  });
}

/** The same runs as HTML (<sub>/<sup>), for legends outside the SVG. */
export function htmlLabel(label: string): ReactNode {
  const runs = labelRuns(label);
  if (runs.length === 0) return label;
  if (runs.length === 1 && !runs[0].script) return runs[0].text;
  return runs.map((run, i) => (run.script ? createElement(run.script, { key: i }, run.text) : run.text));
}

/** Clipping box for lines and rays (screen coordinates). */
export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/**
 * Liang–Barsky: the parameter range [t0, t1] of p + t·d inside `box`, intersected with the given
 * range (−∞..∞ for a line, 0..∞ for a ray). Null when nothing is visible.
 */
export function clipParam(p: { x: number; y: number }, d: { x: number; y: number }, box: Box, t0 = -Infinity, t1 = Infinity): [number, number] | null {
  const edges: [number, number][] = [
    [-d.x, p.x - box.x0],
    [d.x, box.x1 - p.x],
    [-d.y, p.y - box.y0],
    [d.y, box.y1 - p.y],
  ];
  for (const [q, r] of edges) {
    if (Math.abs(q) < 1e-12) {
      if (r < 0) return null;
      continue;
    }
    const t = r / q;
    if (q < 0) {
      if (t > t1) return null;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return null;
      if (t < t1) t1 = t;
    }
  }
  return Number.isFinite(t0) && Number.isFinite(t1) && t0 <= t1 ? [t0, t1] : null;
}
