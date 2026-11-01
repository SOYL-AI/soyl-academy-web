// Exact coordinate geometry of straight lines for ICSE 10 Mathematics ch13 Equation of a Straight Line.
// All arithmetic is with exact fractions (fr.mjs). Every fact the chapter states is computed here and
// cross-checked by a second, independent route:
//   * a line is stored normalised as ax + by + c = 0 with integer a, b, c (no common factor; a > 0, or a = 0
//     and b > 0), so two lines are the same exactly when their triples are equal;
//   * the line through a point with a slope (point-slope form) must contain the point AND a second point one
//     step along the slope; the line through two points is built from the slope AND from the two-point
//     determinant form, and the two triples must agree and contain both points;
//   * parallel and perpendicular tests by coefficients (a1 b2 - a2 b1 = 0, a1 a2 + b1 b2 = 0) AND by slopes
//     (m1 = m2, m1 m2 = -1, with vertical/horizontal cases);
//   * the meeting point of two lines by Cramer's rule, then substituted into both equations;
//   * mid-points, section points (internal division) and centroids, checked by collinearity and squared
//     length ratios; perpendicular bisectors checked by equal distances from two of their points;
//   * typed TeX equations (options, keys, working lines) are parsed by work.mjs's exact parser and turned back
//     into a triple, after checking that they are linear in x and y.
import { Fr, F, gcd } from './fr.mjs';
import { parse, evalAst } from './work.mjs';

export { Fr, F };
export function must(cond, msg) { if (!cond) throw new Error(`line check failed: ${msg}`); }
const fr = (v) => Fr.of(v);
const z = (v) => (v === 0 ? 0 : v);

// ---------------------------------------------------------------- points and numbers
export const pt = (x, y) => Object.freeze([fr(x), fr(y)]);
export const same = (p, q) => p[0].eq(q[0]) && p[1].eq(q[1]);
export const xy = (p) => [p[0].num(), p[1].num()];
/** TeX of a number: 3, -3, \dfrac{3}{2}, -\dfrac{3}{2}. */
export function tx(v) {
  v = fr(v);
  if (v.d === 1) return String(v.n);
  return `${v.n < 0 ? '-' : ''}\\dfrac{${Math.abs(v.n)}}{${v.d}}`;
}
/** A number as a factor: negative values in brackets. */
export const pn = (v) => (fr(v).sign() < 0 ? `\\left(${tx(v)}\\right)` : tx(v));
export const ct = (p) => `(${tx(p[0])}, ${tx(p[1])})`;
/** Plain-text number for plot labels: −3, 3/2, 2.5. */
export function plain(v) {
  v = fr(v);
  const s = v.n < 0 ? '−' : '';
  if (v.d === 1) return `${s}${Math.abs(v.n)}`;
  if ([2, 4, 5, 10].includes(v.d)) return `${s}${Math.abs(v.num())}`;
  return `${s}${Math.abs(v.n)}/${v.d}`;
}
export const lab = (name, p) => `${name}(${plain(p[0])}, ${plain(p[1])})`;
export const d2 = (p, q) => q[0].sub(p[0]).pow(2).add(q[1].sub(p[1]).pow(2));

// ---------------------------------------------------------------- lines
function norm(a, b, c) {
  [a, b, c] = [a, b, c].map(fr);
  must(!(a.isZero() && b.isZero()), 'not a line (a = b = 0)');
  const L = [a.d, b.d, c.d].reduce((m, d) => (m * d) / gcd(m, d), 1);
  let A = (a.n * L) / a.d, B = (b.n * L) / b.d, C = (c.n * L) / c.d;
  const g = gcd(gcd(A, B), C);
  A /= g; B /= g; C /= g;
  if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
  return Object.freeze({ a: z(A), b: z(B), c: z(C) });
}
export const line = (a, b, c) => norm(a, b, c);
export const val = (L, p) => fr(L.a).mul(p[0]).add(fr(L.b).mul(p[1])).add(L.c);
export const on = (L, p) => val(L, p).isZero();
export const sameLine = (L, M) => L.a === M.a && L.b === M.b && L.c === M.c;
export const key = (L) => `${L.a},${L.b},${L.c}`;
/** Slope -a/b, or null for a vertical line. */
export const slopeOf = (L) => (L.b === 0 ? null : F(-L.a, L.b));
/** y-intercept -c/b (null for a vertical line), x-intercept -c/a (null for a horizontal line). */
export const yInt = (L) => (L.b === 0 ? null : F(-L.c, L.b));
export const xInt = (L) => (L.a === 0 ? null : F(-L.c, L.a));
/** y on the line at a given x (non-vertical lines). */
export const yAt = (L, x) => { must(L.b !== 0, 'yAt on a vertical line'); return fr(-L.c).sub(fr(L.a).mul(x)).div(L.b); };
export const xAt = (L, y) => { must(L.a !== 0, 'xAt on a horizontal line'); return fr(-L.c).sub(fr(L.b).mul(y)).div(L.a); };

/** Slope of PQ from the two-point formula, or null when x1 = x2. */
export function slope(p, q) {
  must(!same(p, q), 'slope of a point with itself');
  if (p[0].eq(q[0])) return null;
  return q[1].sub(p[1]).div(q[0].sub(p[0]));
}
/** Point-slope form y - y1 = m(x - x1) (m = null: the vertical line x = x1). */
export function through(p, m) {
  let L, q;
  if (m === null) { L = norm(1, 0, p[0].neg()); q = pt(p[0], p[1].add(1)); }
  else { m = fr(m); L = norm(m, -1, p[1].sub(m.mul(p[0]))); q = pt(p[0].add(1), p[1].add(m)); }
  must(on(L, p) && on(L, q), 'point-slope line contains its point and a second point along the slope');
  must(m === null ? slopeOf(L) === null : slopeOf(L).eq(m), 'slope kept by normalising');
  return L;
}
/** Line through two points: by slope and by the two-point determinant form; both must agree. */
export function join(p, q) {
  const L = through(p, slope(p, q));
  const D = norm(p[1].sub(q[1]), q[0].sub(p[0]), p[0].mul(q[1]).sub(q[0].mul(p[1])));
  must(sameLine(L, D) && on(L, p) && on(L, q), 'two-point line');
  return L;
}
/** The meeting point of two lines (null if parallel), substituted back into both. */
export function meet(L, M) {
  const det = L.a * M.b - M.a * L.b;
  if (det === 0) return null;
  const p = pt(F(L.b * M.c - M.b * L.c, det), F(M.a * L.c - L.a * M.c, det));
  must(on(L, p) && on(M, p), 'meeting point lies on both lines');
  return p;
}
const slopesEqual = (m1, m2) => (m1 === null || m2 === null ? m1 === m2 : m1.eq(m2));
/** Parallel and distinct: by coefficients and by slopes. */
export function isParallel(L, M) {
  const cross = L.a * M.b - M.a * L.b === 0;
  must(cross === slopesEqual(slopeOf(L), slopeOf(M)), 'parallel test: coefficients and slopes agree');
  return cross && !sameLine(L, M);
}
/** Perpendicular: by coefficients and by slopes (vertical with horizontal included). */
export function isPerp(L, M) {
  const dot = L.a * M.a + L.b * M.b === 0;
  const m1 = slopeOf(L), m2 = slopeOf(M);
  const bySlope = m1 === null ? m2 !== null && m2.isZero() : m2 === null ? m1.isZero() : m1.mul(m2).eq(-1);
  must(dot === bySlope, 'perpendicular test: coefficients and slopes agree');
  return dot;
}
export function parallelThrough(L, p) {
  const M = through(p, slopeOf(L));
  must(isParallel(L, M) || sameLine(L, M), 'parallel through a point');
  return M;
}
/** Slope of a perpendicular: -1/m (0 for a vertical line, vertical for a horizontal one). */
export function perpSlope(m) { return m === null ? F(0) : m.isZero() ? null : F(-1).div(m); }
export function perpThrough(L, p) {
  const M = through(p, perpSlope(slopeOf(L)));
  must(isPerp(L, M), 'perpendicular through a point');
  return M;
}
export const mid = (p, q) => pt(p[0].add(q[0]).div(2), p[1].add(q[1]).div(2));
/** The point dividing PQ internally in the ratio m : n (from P), checked by collinearity and lengths. */
export function section(p, q, m, n) {
  const s = m + n;
  const r = pt(fr(m).mul(q[0]).add(fr(n).mul(p[0])).div(s), fr(m).mul(q[1]).add(fr(n).mul(p[1])).div(s));
  must(on(join(p, q), r) && d2(p, r).mul(n * n).eq(d2(r, q).mul(m * m)), `section point ${m}:${n}`);
  return r;
}
export function centroid(a, b, c) {
  const g = pt(a[0].add(b[0]).add(c[0]).div(3), a[1].add(b[1]).add(c[1]).div(3));
  must(on(join(a, mid(b, c)), g) && on(join(b, mid(a, c)), g) && same(section(a, mid(b, c), 2, 1), g), 'centroid on two medians, 2 : 1');
  return g;
}
/** Two points on a line: p and p + (b, -a). */
const along = (L, p) => pt(p[0].add(L.b), p[1].sub(L.a));
export function perpBisector(p, q) {
  const M = perpThrough(join(p, q), mid(p, q));
  for (const X of [mid(p, q), along(M, mid(p, q))]) must(on(M, X) && d2(X, p).eq(d2(X, q)), 'perpendicular bisector: equal distances');
  return M;
}
/** Median from A (to the mid-point of BC) and altitude from A (perpendicular to BC). */
export const median = (A, B, C) => join(A, mid(B, C));
export const altitude = (A, B, C) => perpThrough(join(B, C), A);

// ---------------------------------------------------------------- TeX
/** "2x - 3y + 5 = 0". */
export function eqTex(L) {
  let s = '';
  for (const [k, v] of [[L.a, 'x'], [L.b, 'y'], [L.c, '']]) {
    if (k === 0) continue;
    const mag = Math.abs(k), body = v ? (mag === 1 ? v : `${mag}${v}`) : `${mag}`;
    s += s ? ` ${k < 0 ? '-' : '+'} ${body}` : `${k < 0 ? '-' : ''}${body}`;
  }
  return `${s} = 0`;
}
/** TeX of mx + c. */
export function mxc(m, c) {
  m = fr(m); c = fr(c);
  let s = '';
  if (!m.isZero()) s = m.eq(1) ? 'x' : m.eq(-1) ? '-x' : `${tx(m)}x`;
  if (!c.isZero()) s += s ? (c.sign() < 0 ? ` - ${tx(c.neg())}` : ` + ${tx(c)}`) : tx(c);
  return s || '0';
}
/** Slope-intercept form "y = 2x - 3", or "x = 4" for a vertical line. */
export function yTex(L) {
  const m = slopeOf(L);
  return m === null ? `x = ${tx(xInt(L))}` : `y = ${mxc(m, yInt(L))}`;
}
/** Expression for the plot renderer (a function of x). */
export function expr(L) {
  const m = slopeOf(L), c = yInt(L);
  must(m !== null, 'a vertical line is not a function of x');
  const f = (v) => (v.d === 1 ? `${v.n}` : `(${v.n}/${v.d})`);
  const mx = m.isZero() ? '' : `${f(m)}*x`;
  if (!mx) return f(c);
  return c.isZero() ? mx : c.sign() < 0 ? `${mx} - ${f(c.neg())}` : `${mx} + ${f(c)}`;
}

// ---------------------------------------------------------------- typed equations
/** A typed TeX equation in x and y (e.g. "y - 2 = 3(x + 1)", "3x - y + 5 = 0") as a normalised line. */
export function lineOfTex(tex) {
  const sides = tex.split('=');
  must(sides.length === 2, `one "=" in ${tex}`);
  const [Lt, Rt] = sides.map((s) => parse(s.trim()));
  const f = (x, y) => { const env = { x: fr(x), y: fr(y) }; return evalAst(Lt, env, {}).sub(evalAst(Rt, env, {})); };
  const c = f(0, 0), a = f(1, 0).sub(c), b = f(0, 1).sub(c);
  for (const [x, y] of [[3, -2], [-5, 7], [F(1, 3), 4], [2, F(-5, 2)], [11, 13]]) must(f(x, y).eq(a.mul(x).add(b.mul(y)).add(c)), `${tex} is linear in x and y`);
  return norm(a, b, c);
}
/**
 * Working lines for one line L: every piece (separated by \Rightarrow or ;) is an equation in x and y whose
 * graph is exactly L.
 */
export function lsteps(L, lines) {
  const check = (ln) => {
    const errs = [];
    for (const piece of ln.split(/\\Rightarrow|\\implies|;/).map((s) => s.trim()).filter(Boolean)) {
      try { const M = lineOfTex(piece); if (!sameLine(M, L)) errs.push(`"${piece}" is ${eqTex(M)}, not ${eqTex(L)}`); } catch (x) { errs.push(`"${piece}": ${x.message}`); }
    }
    return errs;
  };
  return {
    lines,
    md: lines.map((l) => `$${l}$`),
    verify(C, label = '') { for (const l of lines) { const e = check(l); C.assert(!e.length, `${label}line equation "${l}" ${e.length ? e.join('; ') : 'is the line'}`); } },
    must(msg = '') { for (const l of lines) { const e = check(l); if (e.length) throw new Error(`${msg}: ${e.join('; ')}`); } return this; },
  };
}
