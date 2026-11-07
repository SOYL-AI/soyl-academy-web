// Small shared helpers for ISC 11 Mathematics ch04: formatting, numeric shortcuts, rational angle data.
import { Fr, fr, near, rad } from './trig.mjs';

export const r = String.raw;
export const D = (s) => `$${s}$`;
export const S = Math.sin, C = Math.cos, T = Math.tan;
export const PI = Math.PI;
export const f4 = (v) => { const t = (Math.round(v * 1e4) / 1e4).toFixed(4); return t === '-0.0000' ? '0.0000' : t; };
export const f3 = (v) => { const t = (Math.round(v * 1e3) / 1e3).toFixed(3); return t === '-0.000' ? '0.000' : t; };
export const deg = (d) => `${d}^\\circ`;
export const sqrt = Math.sqrt;
/** Rational values as tex. */
export const q = (n, d = 1) => fr(n, d).tex();
/** Angle with sine s/c... : acute angle from a Pythagorean triple (a, b, c): sin = a/c, cos = b/c. */
export const triple = (a, b, c) => { if (a * a + b * b !== c * c) throw new Error(`not a triple ${a} ${b} ${c}`); return { s: fr(a, c), c: fr(b, c), t: fr(a, b), ang: Math.atan2(a, b) }; };
/** Angle (radians) in a quadrant from signed sine and cosine fractions. */
export const angOf = (s, c) => { const a = Math.atan2(s.v, c.v); return a < 0 ? a + 2 * PI : a; };
export const isSq = (n) => Number.isInteger(Math.sqrt(n));
export { Fr, fr, near, rad };
/** Raw template for notes: a literal \n that is not the start of a LaTeX command (\ne, \nu, \neq) becomes a newline. */
export const rn = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
