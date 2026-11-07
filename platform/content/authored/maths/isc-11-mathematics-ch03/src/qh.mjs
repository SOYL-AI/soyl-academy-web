// Small helpers shared by the ISC 11 Mathematics ch03 build and question files.
import { fr, tx, val, piT, toPi, gridRad, fin, near } from './trig.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const PI = Math.PI;
/** wrap LaTeX in inline-maths dollars */
export const M = (t) => `$${t}$`;
/** rational p/q as inline maths, sign pulled out */
export const fM = (p, q = 1) => M(fr(p, q).tex());
/** exact element as inline maths */
export const xM = (x) => M(tx(x));
/** (p/q) pi as inline maths */
export const piM = (p, q = 1) => M(piT(p, q));
/** reduced [p, q] with angle d degrees = (p/q) pi */
export const piOf = (d) => toPi(d);
export const sgn = (x) => (x > 0 ? 1 : x < 0 ? -1 : 0);
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const sin = Math.sin, cos = Math.cos, tan = Math.tan;
export const cot = (x) => cos(x) / sin(x);
export const sec = (x) => 1 / cos(x);
export const csc = (x) => 1 / sin(x);
/** grid points (radians) where the expression is finite, with sin/cos not within 1e-6 of zero when asked */
export const safe = (f, xs = gridRad) => xs.filter((x) => fin(f(x)) && Math.abs(sin(x)) > 1e-6 && Math.abs(cos(x)) > 1e-6);
/** multiples k*pi/12 over [-8, 8] in k: exact "is a multiple of pi" tests use integer k */
export const ks12 = range(-96, 96);
export const kx = (k) => (k * PI) / 12;
export { near, val };
