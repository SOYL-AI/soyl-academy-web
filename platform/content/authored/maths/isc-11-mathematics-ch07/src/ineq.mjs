// Exact arithmetic for CBSE 11 Mathematics ch05 (Linear Inequalities). BigInt fractions, linear inequalities in one variable
// solved by the textbook method, intervals with exact end points, brute-force agreement checks on a fine rational grid,
// and half-planes / systems in two variables with exact corner points and lattice-point enumeration.
import { iv } from './iv.mjs';

export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ------------------------------------------------------------------ fractions
const babs = (a) => (a < 0n ? -a : a);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
export const fr = (n, d = 1n) => {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('zero denominator');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
};
/** Coerce an integer, an [n, d] pair or a fraction to a fraction. */
export const F = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : Array.isArray(x) ? fr(x[0], x[1]) : Number.isInteger(x) ? fr(x) : (() => { throw new Error(`not an exact number: ${x}`); })());
export const add = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a, b) => fr(a.n * b.n, a.d * b.d);
export const div = (a, b) => fr(a.n * b.d, a.d * b.n);
export const neg = (a) => fr(-a.n, a.d);
export const cmp = (a, b) => { const l = a.n * b.d, r = b.n * a.d; return l < r ? -1 : l > r ? 1 : 0; };
export const eq = (a, b) => cmp(a, b) === 0;
export const isInt = (a) => a.d === 1n;
export const num = (a) => Number(a.n) / Number(a.d);
export const sgn = (a) => (a.n > 0n ? 1 : a.n < 0n ? -1 : 0);
export const frTex = (a) => (a.d === 1n ? String(a.n) : `${a.n < 0n ? '-' : ''}\\dfrac{${babs(a.n)}}{${a.d}}`);
export const floorF = (a) => { let q = a.n / a.d; if (a.n % a.d !== 0n && a.n < 0n) q -= 1n; return Number(q); };
export const ceilF = (a) => -floorF(neg(a));

// ------------------------------------------------------------------ relations
export const holds = (rel, u, v) => { const c = cmp(u, v); return rel === '<' ? c < 0 : rel === '<=' ? c <= 0 : rel === '>' ? c > 0 : c >= 0; };
export const flipRel = (rel) => ({ '<': '>', '<=': '>=', '>': '<', '>=': '<=' })[rel];
export const relTex = (rel) => ({ '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' })[rel];
export const strict = (rel) => rel === '<' || rel === '>';

// ------------------------------------------------------------------ one variable
/** a x + b with exact coefficients. */
export const lin = (a, b = 0) => ({ a: F(a), b: F(b) });
export const evalLin = (L, x) => add(mul(L.a, x), L.b);
/** The inequality L rel R as a predicate on exact x. */
export const ineq1 = (L, rel, R) => (x) => holds(rel, evalLin(L, x), evalLin(R, x));

/** Intervals with exact end points. lo/hi are fractions or null (unbounded). */
export const ivF = (lo, hi, loIn = true, hiIn = true) => ({ lo, hi, loIn: lo === null ? false : loIn, hiIn: hi === null ? false : hiIn });
export const inF = (I, x) => (I.lo === null || (I.loIn ? cmp(x, I.lo) >= 0 : cmp(x, I.lo) > 0)) && (I.hi === null || (I.hiIn ? cmp(x, I.hi) <= 0 : cmp(x, I.hi) < 0));
export const inAnyF = (Is, x) => Is.some((I) => inF(I, x));
export const emptyIv = (I) => I.lo !== null && I.hi !== null && (cmp(I.lo, I.hi) > 0 || (cmp(I.lo, I.hi) === 0 && !(I.loIn && I.hiIn)));
export const andIv = (I, J) => {
  let lo = I.lo, loIn = I.loIn;
  if (J.lo !== null && (lo === null || cmp(J.lo, lo) > 0 || (cmp(J.lo, lo) === 0 && !J.loIn))) { lo = J.lo; loIn = J.loIn; }
  let hi = I.hi, hiIn = I.hiIn;
  if (J.hi !== null && (hi === null || cmp(J.hi, hi) < 0 || (cmp(J.hi, hi) === 0 && !J.hiIn))) { hi = J.hi; hiIn = J.hiIn; }
  return ivF(lo, hi, loIn, hiIn);
};
export const ivTex = (I) => (emptyIv(I) ? '\\varnothing' : `${I.lo === null ? '(-\\infty' : `${I.loIn ? '[' : '('}${frTex(I.lo)}`}, ${I.hi === null ? '\\infty)' : `${frTex(I.hi)}${I.hiIn ? ']' : ')'}`}`);
export const ivsTex = (Is) => (Is.length ? Is.map(ivTex).join(' \\cup ') : '\\varnothing');
/** Condition on x written with inequality signs, e.g. "x < 4" or "-3 < x \le 1". */
export const condTex = (I) => {
  if (I.lo === null && I.hi === null) return 'x \\in \\mathbb{R}';
  if (I.lo === null) return `x ${I.hiIn ? '\\le' : '<'} ${frTex(I.hi)}`;
  if (I.hi === null) return `x ${I.loIn ? '\\ge' : '>'} ${frTex(I.lo)}`;
  return `${frTex(I.lo)} ${I.loIn ? '\\le' : '<'} x ${I.hiIn ? '\\le' : '<'} ${frTex(I.hi)}`;
};
/** Numeric interval for the number-line drawing code. */
export const draw = (I) => iv(I.lo === null ? null : num(I.lo), I.hi === null ? null : num(I.hi), I.loIn, I.hiIn);

/**
 * Solve L rel R by the textbook method: collect x on the left, divide by the coefficient (reverse the sign if it is negative).
 * Returns { A, B, kind: 'ray' | 'all' | 'none', rel2, x0, iv, flipped } where the reduced form is A x rel B and x rel2 x0.
 */
export function solve1(L, rel, R) {
  const A = sub(L.a, R.a), B = sub(R.b, L.b);
  if (A.n === 0n) return { A, B, kind: holds(rel, fr(0), B) ? 'all' : 'none', iv: holds(rel, fr(0), B) ? ivF(null, null) : ivF(fr(1), fr(0), false, false) };
  const x0 = div(B, A);
  const flipped = A.n < 0n;
  const rel2 = flipped ? flipRel(rel) : rel;
  const I = rel2 === '<' ? ivF(null, x0, false, false) : rel2 === '<=' ? ivF(null, x0, false, true) : rel2 === '>' ? ivF(x0, null, false, false) : ivF(x0, null, true, false);
  return { A, B, kind: 'ray', rel2, x0, iv: I, flipped };
}

/**
 * Brute-force check: pred(x) equals membership in the interval list for every x = k/D with |x| <= R, and just beside every
 * finite end point; each end point's own membership equals its included/excluded flag.
 */
export function agree(pred, Is, { R = 24, D = 840 } = {}) {
  let n = 0;
  const test = (x, why) => { const p = pred(x), q = inAnyF(Is, x); if (p !== q) throw new Error(`interval ${ivsTex(Is)} disagrees with the inequality at x = ${frTex(x)} (${why}): inequality ${p}, interval ${q}`); n++; };
  for (let k = -R * D; k <= R * D; k++) test(fr(k, D), 'grid');
  const eps = fr(1, 100000);
  for (const I of Is) for (const [e, inc] of [[I.lo, I.loIn], [I.hi, I.hiIn]]) {
    if (e === null) continue;
    if (pred(e) !== inc) throw new Error(`end point ${frTex(e)} is ${inc ? 'included' : 'excluded'} in the interval but the inequality says ${pred(e)}`);
    test(add(e, eps), 'beside end point'); test(sub(e, eps), 'beside end point');
  }
  return n;
}
/** Integers k in [a, b] with pred(k). */
export const intsWhere = (pred, a = -60, b = 60) => range(a, b).filter((k) => pred(fr(k)));

// ------------------------------------------------------------------ two variables
/** a x + b y rel c. */
export const half = (a, b, rel, c) => ({ a: F(a), b: F(b), rel, c: F(c) });
export const val2 = (h, x, y) => add(mul(h.a, x), mul(h.b, y));
export const holds2 = (h, x, y) => holds(h.rel, val2(h, x, y), h.c);
/** The same boundary with a non-strict sign: used when comparing a region with its closed polygon. */
export const closedH = (h) => ({ ...h, rel: h.rel === '<' || h.rel === '<=' ? '<=' : '>=' });
export const onLine = (h, x, y) => eq(val2(h, x, y), h.c);
/** Intersection of the boundary lines of two half-planes, or null if parallel. */
export function meet(h, k) {
  const det = sub(mul(h.a, k.b), mul(k.a, h.b));
  if (det.n === 0n) return null;
  return [div(sub(mul(h.c, k.b), mul(k.c, h.b)), det), div(sub(mul(h.a, k.c), mul(k.a, h.c)), det)];
}
/** Corner points of a bounded region (closed form), counter-clockwise. */
export function corners(hs) {
  const ps = [];
  for (let i = 0; i < hs.length; i++) for (let j = i + 1; j < hs.length; j++) {
    const p = meet(hs[i], hs[j]);
    if (!p) continue;
    if (hs.every((h) => holds2(closedH(h), p[0], p[1])) && !ps.some((q) => eq(q[0], p[0]) && eq(q[1], p[1]))) ps.push(p);
  }
  if (!ps.length) return ps;
  const cx = ps.reduce((s, p) => s + num(p[0]), 0) / ps.length, cy = ps.reduce((s, p) => s + num(p[1]), 0) / ps.length;
  return ps.sort((p, q) => Math.atan2(num(p[1]) - cy, num(p[0]) - cx) - Math.atan2(num(q[1]) - cy, num(q[0]) - cx));
}
const cross = (o, p, q) => sub(mul(sub(p[0], o[0]), sub(q[1], o[1])), mul(sub(p[1], o[1]), sub(q[0], o[0])));
/** Point in the closed convex polygon with counter-clockwise vertices ps. */
export const inHull = (ps, x, y) => ps.length >= 3 && ps.every((p, i) => cross(p, ps[(i + 1) % ps.length], [x, y]).n >= 0n);
/**
 * Grid check for a bounded region: every point k/q in the bounding box (plus a margin) satisfies all closed constraints
 * exactly when it lies in the polygon of the corner points. Returns the number of points tested.
 */
export function regionAgrees(hs, q = 4, margin = 3) {
  const ps = corners(hs);
  if (ps.length < 3) throw new Error('region has fewer than three corners');
  const xs = ps.map((p) => num(p[0])), ys = ps.map((p) => num(p[1]));
  const x0 = Math.floor(Math.min(...xs)) - margin, x1 = Math.ceil(Math.max(...xs)) + margin, y0 = Math.floor(Math.min(...ys)) - margin, y1 = Math.ceil(Math.max(...ys)) + margin;
  let n = 0;
  for (let i = x0 * q; i <= x1 * q; i++) for (let j = y0 * q; j <= y1 * q; j++) {
    const x = fr(i, q), y = fr(j, q);
    const a = hs.every((h) => holds2(closedH(h), x, y)), b = inHull(ps, x, y);
    if (a !== b) throw new Error(`grid point (${frTex(x)}, ${frTex(y)}): constraints ${a}, polygon ${b}`);
    n++;
  }
  return n;
}
/** Lattice points (x, y) in the box that satisfy every (original, possibly strict) constraint. */
export function lattice(hs, x0 = -30, x1 = 30, y0 = -30, y1 = 30) {
  const out = [];
  for (const x of range(x0, x1)) for (const y of range(y0, y1)) if (hs.every((h) => holds2(h, fr(x), fr(y)))) out.push([x, y]);
  return out;
}
export const ptTex = (p) => `(${frTex(p[0])}, ${frTex(p[1])})`;
