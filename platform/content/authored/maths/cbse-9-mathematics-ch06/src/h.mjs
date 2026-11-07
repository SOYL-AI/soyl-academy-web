// Helpers for CBSE 9 Mathematics ch06 Coordinate Geometry: ordered pairs, quadrants, distances along the axes, midpoints,
// and MCQ builders whose options are typed independently and compared with a re-solved target.
import { Q, mk } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(6)));
export const T$ = (v) => `$${fx(v)}$`;
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const pr = (x, y) => `(${fx(x)}, ${fx(y)})`;
export const prT = (x, y) => `$${pr(x, y)}$`;

/** Where does (x, y) lie? Quadrants are numbered anticlockwise from the top right. */
export function where(x, y) {
  if (x === 0 && y === 0) return 'origin';
  if (y === 0) return 'x-axis';
  if (x === 0) return 'y-axis';
  return x > 0 ? (y > 0 ? 'first quadrant' : 'fourth quadrant') : y > 0 ? 'second quadrant' : 'third quadrant';
}
/** Midpoint of [x1, y1] and [x2, y2]. */
export const mid = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
/** Distance along a line parallel to an axis (the two points share a coordinate). */
export function along([x1, y1], [x2, y2]) {
  if (y1 === y2) return Math.abs(x2 - x1);
  if (x1 === x2) return Math.abs(y2 - y1);
  throw new Error('points are not on a line parallel to an axis');
}

/** Four-option MCQ with plain values (key typed first). */
export function MC(key, o, target, pre) {
  const vals = [o.ans, ...o.wr];
  must(new Set(vals.map((v) => JSON.stringify(v))).size === 4, `${key}: options distinct`);
  Q(key, mk.mcq({ stem: o.stem, opts: o.opts ?? vals.map(T$), key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (Cx) => { if (pre) pre(Cx); Cx.which(vals, target); });
}
/** Options are ordered pairs. */
export function MPair(key, o, target, pre) {
  const vals = [o.ans, ...o.wr];
  MC(key, { ...o, opts: vals.map(([x, y]) => prT(x, y)) }, target, pre);
}
/** Options are values; exactly one satisfies test(value), and it is the key. */
export function MT(key, o, test, pre) {
  const vals = [o.ans, ...o.wr];
  must(new Set(vals.map((v) => JSON.stringify(v))).size === 4, `${key}: options distinct`);
  Q(key, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (Cx) => { if (pre) pre(Cx); Cx.which(vals.map((v) => (test(v) ? 1 : 0)), 1); });
}
