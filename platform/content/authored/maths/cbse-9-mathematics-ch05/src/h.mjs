// Helpers for CBSE 9 Mathematics ch05 Linear Equations in Two Variables: TeX printing of ax + by + c = 0, solution tests,
// and a four-option MCQ builder whose options are typed independently and compared with a re-solved target.
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

/** TeX of a x + b y + c = 0 with integer coefficients (a coefficient of 1 or -1 is written without the 1). */
export function lin(a, b, c, vx = 'x', vy = 'y') {
  const term = (co, v, first) => {
    if (co === 0) return '';
    const m = Math.abs(co) === 1 ? '' : String(Math.abs(co));
    return (first ? (co < 0 ? '-' : '') : co < 0 ? ' - ' : ' + ') + m + v;
  };
  let s = term(a, vx, true) + term(b, vy, !a);
  if (c !== 0) s += (s ? (c < 0 ? ' - ' : ' + ') : c < 0 ? '-' : '') + Math.abs(c);
  return `${s || '0'} = 0`;
}
export const linT = (a, b, c) => `$${lin(a, b, c)}$`;
/** Does (x, y) satisfy a x + b y + c = 0? */
export const sat = (a, b, c, x, y) => a * x + b * y + c === 0;
/** Ordered pair as TeX. */
export const pr = (x, y) => `(${fx(x)}, ${fx(y)})`;
export const prT = (x, y) => `$${pr(x, y)}$`;
export const isLinear2 = (terms) => terms.every(([, px, py]) => px + py <= 1) && terms.some(([co, px, py]) => co !== 0 && px + py === 1);

/** Four-option MCQ with plain values (key typed first). */
export function MC(key, o, target, pre) {
  const vals = [o.ans, ...o.wr];
  must(new Set(vals.map((v) => JSON.stringify(v))).size === 4, `${key}: options distinct`);
  Q(key, mk.mcq({ stem: o.stem, opts: o.opts ?? vals.map(T$), key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (Cx) => { if (pre) pre(Cx); Cx.which(vals, target); });
}
/** Options are values (or pairs); exactly one satisfies test(value), and it is the key. */
export function MT(key, o, test, pre) {
  const vals = [o.ans, ...o.wr];
  must(new Set(vals.map((v) => JSON.stringify(v))).size === 4, `${key}: options distinct`);
  Q(key, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (Cx) => { if (pre) pre(Cx); Cx.which(vals.map((v) => (test(v) ? 1 : 0)), 1); });
}
/** Options are ordered pairs. */
export function MPair(key, o, target, pre) {
  const vals = [o.ans, ...o.wr];
  MC(key, { ...o, ans: o.ans, wr: o.wr, opts: vals.map(([x, y]) => prT(x, y)) }, target, pre);
}
