// Exact coordinate geometry of straight lines for CBSE 11 Mathematics ch09 Straight Lines.
// Built on fr.mjs (exact fractions, a copy of the ICSE 10 ch13 module) and adapted from that chapter's line.mjs. Every fact the
// chapter states is computed here and cross-checked by a second, independent route:
//   * a line is stored normalised as ax + by + c = 0 with integer a, b, c (no common factor; a > 0, or a = 0 and b > 0);
//   * point-slope line: must contain the point AND a second point one step along the slope; two-point line: slope route AND the
//     determinant form must agree and both points must lie on it; the intercept form x/p + y/q = 1 is rebuilt from the
//     intercepts and compared with the general form;
//   * the angle between two lines: tan(theta) = |(m1 - m2)/(1 + m1 m2)| (exact fraction) AND by atan2 of the cross and dot
//     products of the direction vectors; inclinations by atan2 of the direction vector;
//   * the distance of a point from a line |a x0 + b y0 + c| / sqrt(a^2 + b^2) as an exact surd, AND by finding the foot of the
//     perpendicular exactly (it lies on the line, and its squared distance from the point is the same exact fraction);
//   * the distance between parallel lines by the c-formula AND as the distance of an exact point of one line from the other;
//   * the normal form x cos(w) + y sin(w) = p: cos and sin as exact surds with cos^2 + sin^2 = 1 and p > 0, a point of the
//     line satisfies it, and the angle w is checked with atan2.
import { Fr, F, gcd } from './fr.mjs';

export { Fr, F, gcd };
export function must(cond, msg) { if (!cond) throw new Error(`line check failed: ${msg}`); }
const fr = (v) => Fr.of(v);
const z = (v) => (v === 0 ? 0 : v);
export const isqrt = (n) => { const s = Math.round(Math.sqrt(n)); return s * s === n ? s : null; };
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

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
/** TeX with decimals where exact and short (7.5), else the fraction. */
export function dx(v) {
  v = fr(v);
  if (v.d === 1) return String(v.n);
  if ([2, 4, 5, 10, 20, 25].includes(v.d)) return String(v.num());
  return tx(v);
}
export const ct = (p) => `(${tx(p[0])}, ${tx(p[1])})`;
/** Plain-text number for plot labels. */
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
export const slopeOf = (L) => (L.b === 0 ? null : F(-L.a, L.b));
export const yInt = (L) => (L.b === 0 ? null : F(-L.c, L.b));
export const xInt = (L) => (L.a === 0 ? null : F(-L.c, L.a));
export const yAt = (L, x) => { must(L.b !== 0, 'yAt on a vertical line'); return fr(-L.c).sub(fr(L.a).mul(x)).div(L.b); };
export const xAt = (L, y) => { must(L.a !== 0, 'xAt on a horizontal line'); return fr(-L.c).sub(fr(L.b).mul(y)).div(L.a); };

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
/** The line with the given intercepts x/p + y/q = 1 (p, q nonzero): rebuilt and compared with the two-point line. */
export function byIntercepts(p, q) {
  p = fr(p); q = fr(q);
  must(!p.isZero() && !q.isZero(), 'intercept form needs nonzero intercepts');
  const L = norm(q, p, p.mul(q).neg());
  must(sameLine(L, join(pt(p, 0), pt(0, q))) && xInt(L).eq(p) && yInt(L).eq(q), 'intercept form agrees with the two-point line');
  return L;
}
export function meet(L, M) {
  const det = L.a * M.b - M.a * L.b;
  if (det === 0) return null;
  const p = pt(F(L.b * M.c - M.b * L.c, det), F(M.a * L.c - L.a * M.c, det));
  must(on(L, p) && on(M, p), 'meeting point lies on both lines');
  return p;
}
const slopesEqual = (m1, m2) => (m1 === null || m2 === null ? m1 === m2 : m1.eq(m2));
export function isParallel(L, M) {
  const cross = L.a * M.b - M.a * L.b === 0;
  must(cross === slopesEqual(slopeOf(L), slopeOf(M)), 'parallel test: coefficients and slopes agree');
  return cross && !sameLine(L, M);
}
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
export function perpSlope(m) { return m === null ? F(0) : m.isZero() ? null : F(-1).div(m); }
export function perpThrough(L, p) {
  const M = through(p, perpSlope(slopeOf(L)));
  must(isPerp(L, M), 'perpendicular through a point');
  return M;
}
export const mid = (p, q) => pt(p[0].add(q[0]).div(2), p[1].add(q[1]).div(2));
const along = (L, p) => pt(p[0].add(L.b), p[1].sub(L.a));
export function perpBisector(p, q) {
  const M = perpThrough(join(p, q), mid(p, q));
  for (const X of [mid(p, q), along(M, mid(p, q))]) must(on(M, X) && d2(X, p).eq(d2(X, q)), 'perpendicular bisector: equal distances');
  return M;
}
/** A rational point of a line (non-vertical: x = 0 or x = 1; vertical: y = 0). */
export const anyPoint = (L) => (L.b !== 0 ? pt(0, yAt(L, 0)) : pt(xAt(L, 0), 0));

// ---------------------------------------------------------------- angles
/** Inclination in degrees in [0, 180) from the direction vector (b, -a), by atan2. */
export function inclination(L) {
  let t = (Math.atan2(-L.a, L.b) * 180) / Math.PI;
  if (t < 0) t += 180;
  if (t >= 180 - 1e-9) t = 0;
  return Math.round(t * 1e9) / 1e9;
}
/** Inclination from a slope (null = 90). */
export const inclOfSlope = (m) => (m === null ? 90 : Math.round((((Math.atan(m.num()) * 180) / Math.PI + 180) % 180) * 1e9) / 1e9);
/**
 * The angle between two lines. tan of the acute angle = |(m1 - m2)/(1 + m1 m2)| as an exact fraction (null when the lines are
 * perpendicular: tan is not defined). It is checked against |cross| / |dot| of the direction vectors and against atan2.
 * Returns { tan (Fr|null), acute (degrees), obtuse (degrees), parallel }.
 */
export function angleBetween(L, M) {
  const cross = Math.abs(L.a * M.b - M.a * L.b), dot = Math.abs(L.a * M.a + L.b * M.b);
  const m1 = slopeOf(L), m2 = slopeOf(M);
  let tan = null;
  if (m1 !== null && m2 !== null) {
    const den = fr(1).add(m1.mul(m2));
    if (!den.isZero()) tan = m1.sub(m2).div(den).abs();
  }
  if (dot !== 0) must(tan !== null || (m1 === null) !== (m2 === null) || m1 === null, 'tangent from slopes');
  if (m1 !== null && m2 !== null && dot !== 0) must(tan.eq(F(cross, dot)), 'tan from slopes equals cross/dot');
  if (dot === 0) must(tan === null, 'perpendicular: 1 + m1 m2 = 0');
  const acute = Math.round(((Math.atan2(cross, dot) * 180) / Math.PI) * 1e9) / 1e9;
  if (m1 !== null && m2 !== null && tan !== null) must(Math.abs((Math.atan(tan.num()) * 180) / Math.PI - acute) < 1e-9, 'atan(tan) equals atan2');
  // with a vertical line: tan = |1/m| of the other
  if ((m1 === null) !== (m2 === null)) { const mm = m1 === null ? m2 : m1; if (!mm.isZero()) tan = F(1).div(mm).abs(); else tan = null; }
  return { tan, acute, obtuse: Math.round((180 - acute) * 1e9) / 1e9, parallel: cross === 0 };
}

// ---------------------------------------------------------------- distances (exact surds)
/** Largest square factor: n = s^2 t. */
export function sqFactor(n) {
  let s = 1, t = n;
  for (let k = 2; k * k <= t; k++) while (t % (k * k) === 0) { t /= k * k; s *= k; }
  return [s, t];
}
/** TeX of n / sqrt(r2) in simplest form (n may be negative; n and r2 integers). */
export function surdOver(n, r2) {
  const sign = n < 0 ? '-' : '';
  n = Math.abs(n);
  if (n === 0) return '0';
  const [s, t] = sqFactor(r2);
  if (t === 1) { const f = fr(F(n, s)); return `${sign}${tx(f)}`; }
  // n / (s sqrt(t)) = n sqrt(t) / (s t)
  const den = s * t, g = gcd(n, den), nn = n / g, dd = den / g;
  const top = nn === 1 ? `\\sqrt{${t}}` : `${nn}\\sqrt{${t}}`;
  return dd === 1 ? `${sign}${top}` : `${sign}\\dfrac{${top}}{${dd}}`;
}
/** Plain (spoken/plot) form of n / sqrt(r2). */
export const surdNum = (n, r2) => n / Math.sqrt(r2);
/**
 * Distance of the point from the line: |a x0 + b y0 + c| / sqrt(a^2 + b^2). Returns { num (|value|), r2, sq (exact squared
 * distance), tex, value (number), rational (Fr or null) }. Cross-checked with the exact foot of the perpendicular.
 */
export function dist(L, p) {
  const v = val(L, p), r2 = L.a * L.a + L.b * L.b;
  must(Number.isInteger(v.n) && v.d === 1 || v.d !== 1, 'value');
  // squared distance exactly: v^2 / r2
  const sq = v.mul(v).div(r2);
  // foot of the perpendicular: p - (v / r2)(a, b)
  const t = v.div(r2), foot = pt(p[0].sub(t.mul(L.a)), p[1].sub(t.mul(L.b)));
  must(on(L, foot), 'the foot of the perpendicular lies on the line');
  must(d2(p, foot).eq(sq), 'squared distance to the foot equals v^2 / (a^2 + b^2)');
  if (!v.isZero()) must(isPerp(L, join(p, foot)), 'the segment from the point to the foot is perpendicular to the line');
  const num = v.abs();
  const rational = isqrt(r2) !== null ? num.div(isqrt(r2)) : null;
  // tex of |v| / sqrt(r2) with v possibly fractional: scale to an integer numerator
  let tex;
  if (rational !== null) tex = tx(rational);
  else if (num.d === 1) tex = surdOver(num.n, r2);
  else tex = `\\dfrac{${tx(num)}}{\\sqrt{${r2}}}`;
  return { num, r2, sq, tex, value: num.num() / Math.sqrt(r2), rational, foot, signed: v };
}
/** Distance between two parallel lines: |c1 - c2| / sqrt(a^2 + b^2) after matching coefficients; checked from a point of one. */
export function distParallel(L, M) {
  must(isParallel(L, M), 'distParallel needs distinct parallel lines');
  // bring M to the same (a, b) as L (the normalised triples may differ by a sign or a common factor already removed)
  const k = L.a !== 0 ? fr(L.a).div(M.a) : fr(L.b).div(M.b);
  const c2 = fr(M.c).mul(k), c1 = fr(L.c);
  const diff = c1.sub(c2).abs(), r2 = L.a * L.a + L.b * L.b;
  const d = dist(M, anyPoint(L));
  must(d.sq.eq(diff.mul(diff).div(r2)), 'parallel distance by c-formula equals distance from a point of L');
  const rational = isqrt(r2) !== null ? diff.div(isqrt(r2)) : null;
  const tex = rational !== null ? tx(rational) : diff.d === 1 ? surdOver(diff.n, r2) : `\\dfrac{${tx(diff)}}{\\sqrt{${r2}}}`;
  return { diff, r2, tex, value: diff.num() / Math.sqrt(r2), rational, sq: d.sq, c1, c2, kdiff: diff };
}

// ---------------------------------------------------------------- normal form
/**
 * Normal form x cos w + y sin w = p (p > 0, w in [0, 360)): cos w = a/sqrt(a^2 + b^2) etc. with the signs chosen so p > 0.
 * Returns cosn, sinn (integer numerators over sqrt(r2)), pn (integer numerator over sqrt(r2)), r2, omega (degrees), tex pieces.
 */
export function normalForm(L) {
  const r2 = L.a * L.a + L.b * L.b;
  const sg = L.c > 0 ? -1 : 1; // want p = -c*sg/sqrt(r2) >= 0 ... with sg = 1 when c <= 0
  const cn = sg * L.a, sn = sg * L.b, pnum = sg * -L.c;
  must(pnum >= 0 && cn * cn + sn * sn === r2, 'normal form: cos^2 + sin^2 = 1 and p >= 0');
  let omega = (Math.atan2(sn, cn) * 180) / Math.PI;
  if (omega < 0) omega += 360;
  omega = Math.round(omega * 1e9) / 1e9;
  // any point of the line satisfies x cos w + y sin w = p
  const P0 = anyPoint(L);
  const lhs = P0[0].mul(cn).add(P0[1].mul(sn));
  must(lhs.eq(pnum), 'a point of the line satisfies the normal form (numerators over sqrt(a^2 + b^2))');
  const cosx = Math.cos((omega * Math.PI) / 180), sinx = Math.sin((omega * Math.PI) / 180);
  must(Math.abs(cosx - cn / Math.sqrt(r2)) < 1e-9 && Math.abs(sinx - sn / Math.sqrt(r2)) < 1e-9, 'omega from atan2');
  return { cn, sn, pnum, r2, omega, cos: surdOver(cn, r2), sin: surdOver(sn, r2), p: surdOver(pnum, r2), pv: pnum / Math.sqrt(r2) };
}

// ---------------------------------------------------------------- TeX
export function eqTex(L) {
  let s = '';
  for (const [k, v] of [[L.a, 'x'], [L.b, 'y'], [L.c, '']]) {
    if (k === 0) continue;
    const mag = Math.abs(k), body = v ? (mag === 1 ? v : `${mag}${v}`) : `${mag}`;
    s += s ? ` ${k < 0 ? '-' : '+'} ${body}` : `${k < 0 ? '-' : ''}${body}`;
  }
  return `${s} = 0`;
}
export function mxc(m, c) {
  m = fr(m); c = fr(c);
  let s = '';
  if (!m.isZero()) s = m.eq(1) ? 'x' : m.eq(-1) ? '-x' : `${tx(m)}x`;
  if (!c.isZero()) s += s ? (c.sign() < 0 ? ` - ${tx(c.neg())}` : ` + ${tx(c)}`) : tx(c);
  return s || '0';
}
export function yTex(L) {
  const m = slopeOf(L);
  return m === null ? `x = ${tx(xInt(L))}` : `y = ${mxc(m, yInt(L))}`;
}
/** Intercept form x/p + y/q = 1 as TeX. */
export function interceptTex(L) {
  const p = xInt(L), q = yInt(L);
  must(p && q && !p.isZero() && !q.isZero(), 'intercept form needs a line off the origin that meets both axes');
  const part = (v, s) => (v.d === 1 ? `\\dfrac{${s}}{${v.n}}` : `\\dfrac{${s}}{${tx(v)}}`);
  return `${part(p, 'x')} + ${part(q, 'y')} = 1`;
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
