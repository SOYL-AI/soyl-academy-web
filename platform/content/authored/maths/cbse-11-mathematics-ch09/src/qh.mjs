// Small helpers shared by the question files of CBSE 11 Mathematics ch09 Straight Lines.
import { F, pt, tx, eqTex, line } from './ln.mjs';

/** Raw template (one backslash for TeX); the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const P = (x, y) => pt(x, y);
/** Line key for comparing lines typed independently. */
export const K = (L) => `${L.a},${L.b},${L.c}`;
/** TeX in dollars. */
export const d$ = (s) => `$${s}$`;
/** Option text of a line equation. */
export const T = (L) => `$${eqTex(L)}$`;
/** Option text of a number (fraction in TeX). */
export const N$ = (v) => `$${tx(v)}$`;
export const deg = (rad) => (rad * 180) / Math.PI;
export const rad = (d) => (d * Math.PI) / 180;
export const eqn = (a, b, c) => line(a, b, c);
export { F };
