// Exact coordinate geometry for ICSE 10 Mathematics ch12 Section and Mid-Point Formulae.
// Every coordinate is an exact fraction (Fr, copied from ch11's refl.mjs), so no rounding enters any answer.
// Every fact the chapter states is computed here and cross-checked by an independent route:
//   * a division point by the section formula AND as A + t(B - A) with t = m/(m + n); then P must be
//     collinear with A and B, lie between them, and satisfy n^2 AP^2 = m^2 PB^2 (the distance ratio);
//   * a ratio from a known point by one coordinate (k : 1), checked with the other coordinate and by
//     recomputing the point from the ratio;
//   * the ratio in which an axis or a line ax + by = c cuts a segment: k = -(a x1 + b y1 - c)/(a x2 + b y2 - c),
//     the point recomputed and checked on the line, and the two ends checked on opposite sides;
//   * a mid-point by the formula AND as the 1 : 1 division point; an end point from the mid-point checked
//     by taking the mid-point again;
//   * a centroid by the average of the vertices AND as the 2 : 1 point of each of the three medians;
//   * a missing vertex from the centroid, a fourth parallelogram vertex (diagonals bisect each other AND
//     AB = DC as vectors) and the vertices from the mid-points of the sides, each checked forwards.

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

export class Fr {
  constructor(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g === 0 ? 0 : n / g;
    this.d = this.n === 0 ? 1 : d / g;
    Object.freeze(this);
  }
  static of(v) {
    if (v instanceof Fr) return v;
    if (Number.isInteger(v)) return new Fr(v);
    if (Array.isArray(v)) return new Fr(v[0], v[1]);
    if (typeof v === 'number' && Number.isFinite(v)) {
      const s = String(v);
      if (/e/i.test(s)) throw new Error(`not an exact value: ${v}`);
      const [i, f = ''] = s.split('.');
      return new Fr(Number(i + f), 10 ** f.length);
    }
    throw new Error(`not an exact value: ${v}`);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); if (o.n === 0) throw new Error('division by zero'); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  pow(k) { if (!Number.isInteger(k) || k < 0) throw new Error(`bad power ${k}`); let r = new Fr(1); for (let i = 0; i < k; i++) r = r.mul(this); return r; }
  isZero() { return this.n === 0; }
  isInt() { return this.d === 1; }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  lt(o) { o = Fr.of(o); return this.n * o.d < o.n * this.d; }
  sign() { return Math.sign(this.n); }
  num() { return this.n / this.d; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => new Fr(n, d);

export function must(cond, msg) { if (!cond) throw new Error(`section-formula check failed: ${msg}`); }

// ---------------------------------------------------------------- points
const R = (v) => Fr.of(v);
/** A point with exact coordinates; a coordinate may be an integer, a terminating decimal or [n, d]. */
export const pt = (x, y) => Object.freeze([R(x), R(y)]);
export const same = (p, q) => p[0].eq(q[0]) && p[1].eq(q[1]);
/** p equals the typed pair [x, y] (entries may be [n, d] for fractions). */
export const is = (p, xy) => same(p, pt(xy[0], xy[1]));
const vsub = (p, q) => pt(p[0].sub(q[0]), p[1].sub(q[1]));
export const dist2 = (p, q) => p[0].sub(q[0]).pow(2).add(p[1].sub(q[1]).pow(2));
/** Exact length; throws if it is not rational. */
export function dist(p, q) {
  const s = dist2(p, q);
  const r = (v) => { const t = Math.round(Math.sqrt(v)); return t * t === v ? t : null; };
  const a = r(s.n), b = r(s.d);
  must(a !== null && b !== null, `length ${p}–${q} is not exact (squared ${s})`);
  const L = F(a, b);
  must(Math.abs(Math.hypot(p[0].num() - q[0].num(), p[1].num() - q[1].num()) - L.num()) < 1e-9, 'hypot agrees');
  return L;
}
const cross = (o, a, b) => a[0].sub(o[0]).mul(b[1].sub(o[1])).sub(a[1].sub(o[1]).mul(b[0].sub(o[0])));
export const collinear = (a, b, p) => cross(a, b, p).isZero();
const within = (u, v, w) => !w.lt(u.lt(v) ? u : v) && !(u.lt(v) ? v : u).lt(w);
/** p lies on the closed segment ab. */
export const between = (a, b, p) => collinear(a, b, p) && within(a[0], b[0], p[0]) && within(a[1], b[1], p[1]);

// ---------------------------------------------------------------- section formula
/** The point P dividing AB internally with AP : PB = m : n (m, n > 0). */
export function section(A, B, m, n) {
  m = R(m); n = R(n);
  must(m.sign() > 0 && n.sign() > 0, 'internal division needs a positive ratio');
  const s = m.add(n);
  const P = pt(m.mul(B[0]).add(n.mul(A[0])).div(s), m.mul(B[1]).add(n.mul(A[1])).div(s));
  const t = m.div(s);
  must(same(P, pt(A[0].add(t.mul(B[0].sub(A[0]))), A[1].add(t.mul(B[1].sub(A[1]))))), 'formula agrees with A + t(B - A)');
  must(between(A, B, P), 'P lies on the segment AB');
  must(dist2(A, P).mul(n.mul(n)).eq(dist2(P, B).mul(m.mul(m))), 'AP : PB = m : n by distances');
  return P;
}
/** [m, n] in lowest whole numbers from k = m/n. */
const ratio = (k) => { must(k.sign() > 0, `ratio ${k} is not positive: the division is not internal`); return [k.n, k.d]; };
/** AP : PB for a point P of the segment AB, found from the x-coordinate (or y if AB is vertical), checked by the other. */
export function ratioOf(A, B, P) {
  const c = A[0].eq(B[0]) ? 1 : 0;
  const r = ratio(P[c].sub(A[c]).div(B[c].sub(P[c])));
  must(same(section(A, B, r[0], r[1]), P), 'P recomputed from the ratio (other coordinate agrees)');
  return r;
}
/** The point of AB whose coordinate c (0 = x, 1 = y) has a given value: { r: [m, n], P }. */
export function cutAt(A, B, c, value) {
  const v = R(value);
  const r = ratio(v.sub(A[c]).div(B[c].sub(v)));
  const P = section(A, B, r[0], r[1]);
  must(P[c].eq(v), 'the point has the given coordinate');
  return { r, P };
}
/** Where an axis cuts AB: 'x' is the x-axis (y = 0), 'y' the y-axis (x = 0). */
export const axisCut = (A, B, axis) => cutAt(A, B, axis === 'x' ? 1 : 0, 0);
/** Where the line ax + by = c cuts AB: { r: [m, n], P }. */
export function lineCut(A, B, [a, b, c]) {
  const val = (p) => R(a).mul(p[0]).add(R(b).mul(p[1])).sub(c);
  must(val(A).sign() * val(B).sign() < 0, 'A and B on opposite sides of the line');
  const r = ratio(val(A).neg().div(val(B)));
  const P = section(A, B, r[0], r[1]);
  must(val(P).isZero(), 'the division point lies on the line');
  return { r, P };
}

// ---------------------------------------------------------------- mid-point, centroid
export function mid(A, B) {
  const M = section(A, B, 1, 1);
  must(same(M, pt(A[0].add(B[0]).div(2), A[1].add(B[1]).div(2))), 'mid-point formula agrees with the 1 : 1 section point');
  must(dist2(A, M).eq(dist2(M, B)), 'AM = MB');
  return M;
}
/** B from A and the mid-point M of AB. */
export function otherEnd(A, M) {
  const B = pt(M[0].mul(2).sub(A[0]), M[1].mul(2).sub(A[1]));
  must(same(mid(A, B), M), 'M is the mid-point of AB');
  return B;
}
export function centroid(A, B, C) {
  must(!collinear(A, B, C), 'a triangle needs non-collinear vertices');
  const G = pt(A[0].add(B[0]).add(C[0]).div(3), A[1].add(B[1]).add(C[1]).div(3));
  for (const [V, X, Y] of [[A, B, C], [B, C, A], [C, A, B]]) must(same(section(V, mid(X, Y), 2, 1), G), 'G is the 2 : 1 point of every median');
  return G;
}
/** C from A, B and the centroid G. */
export function thirdVertex(A, B, G) {
  const C = pt(G[0].mul(3).sub(A[0]).sub(B[0]), G[1].mul(3).sub(A[1]).sub(B[1]));
  must(same(centroid(A, B, C), G), 'centroid of A, B, C is G');
  return C;
}
/** D of the parallelogram ABCD (vertices in order). */
export function fourthVertex(A, B, C) {
  must(!collinear(A, B, C), 'three vertices of a parallelogram are not collinear');
  const D = pt(A[0].add(C[0]).sub(B[0]), A[1].add(C[1]).sub(B[1]));
  must(same(mid(A, C), mid(B, D)), 'the diagonals bisect each other');
  must(same(vsub(B, A), vsub(C, D)) && same(vsub(D, A), vsub(C, B)), 'opposite sides equal and parallel');
  return D;
}
/** Vertices [A, B, C] of the triangle whose sides BC, CA, AB have mid-points D, E, F. */
export function fromMidpoints(D, E, F) {
  const A = pt(E[0].add(F[0]).sub(D[0]), E[1].add(F[1]).sub(D[1]));
  const B = pt(F[0].add(D[0]).sub(E[0]), F[1].add(D[1]).sub(E[1]));
  const C = pt(D[0].add(E[0]).sub(F[0]), D[1].add(E[1]).sub(F[1]));
  must(same(mid(B, C), D) && same(mid(C, A), E) && same(mid(A, B), F), 'mid-points of the sides recomputed');
  must(same(centroid(A, B, C), centroid(D, E, F)), 'the two triangles share their centroid');
  return [A, B, C];
}

// ---------------------------------------------------------------- text
/** A number in TeX: 3, -2, \dfrac{7}{3}, -\dfrac{7}{3}. */
export function fx(v) {
  v = R(v);
  if (v.isInt()) return String(v.n);
  return `${v.n < 0 ? '-' : ''}\\dfrac{${Math.abs(v.n)}}{${v.d}}`;
}
/** A number as a TeX factor: 3, (-2), \left(-\dfrac{7}{3}\right). */
export const pn = (v) => (R(v).sign() < 0 ? (R(v).isInt() ? `(${fx(v)})` : `\\left(${fx(v)}\\right)`) : fx(v));
/** A coordinate pair in TeX (inside $…$). */
export const ct = (p) => (p.every((v) => v.isInt()) ? `(${fx(p[0])}, ${fx(p[1])})` : `\\left(${fx(p[0])}, ${fx(p[1])}\\right)`);
/** A named point in Markdown: $A(3, -4)$. */
export const P = (name, p) => `$${name}${ct(p)}$`;
/** A ratio in TeX: 2 : 3. */
export const rt = (r) => `${r[0]} : ${r[1]}`;
/** Plain-text number for plot labels (Unicode minus, a/b for fractions). */
const plain = (v) => { v = R(v); const s = v.isInt() ? String(Math.abs(v.n)) : `${Math.abs(v.n)}/${v.d}`; return v.sign() < 0 ? `−${s}` : s; };
/** A plot label: A(3, −4), G(7/3, 2). */
export const lab = (name, p) => `${name.replace(/'/g, '′').replace(/_(\d)/g, (m, d) => '₀₁₂₃₄₅₆₇₈₉'[d])}(${plain(p[0])}, ${plain(p[1])})`;
/** Plot coordinates. */
export const xy = (p) => [p[0].num(), p[1].num()];

// ---------------------------------------------------------------- working lines (checked by work.mjs)
/** Value line \dfrac{N}{S} = v, skipping a step that says nothing new. */
function tail(N, S) {
  const v = N.div(S);
  if (S.eq(1)) return '';
  const frac = `\\dfrac{${fx(N)}}{${fx(S)}}`;
  return v.n === N.n && v.d === S.n && !v.isInt() ? ` = ${frac}` : ` = ${frac} = ${fx(v)}`;
}
/** One coordinate of the section formula: \dfrac{m \times x_2 + n \times x_1}{m + n} = \dfrac{N}{S} = v. */
export function secLine(A, B, m, n, c) {
  m = R(m); n = R(n);
  const N = m.mul(B[c]).add(n.mul(A[c])), S = m.add(n);
  return `\\dfrac{${fx(m)} \\times ${pn(B[c])} + ${fx(n)} \\times ${pn(A[c])}}{${fx(m)} + ${fx(n)}}${tail(N, S)}`;
}
/** One coordinate of the mid-point: \dfrac{x_1 + x_2}{2} = \dfrac{N}{2} = v. */
export function midLine(A, B, c) {
  const N = A[c].add(B[c]);
  return `\\dfrac{${fx(A[c])} + ${pn(B[c])}}{2}${tail(N, R(2))}`;
}
/** One coordinate of the centroid: \dfrac{x_1 + x_2 + x_3}{3} = \dfrac{N}{3} = v. */
export function centLine(A, B, C, c) {
  const N = A[c].add(B[c]).add(C[c]);
  return `\\dfrac{${fx(A[c])} + ${pn(B[c])} + ${pn(C[c])}}{3}${tail(N, R(3))}`;
}
/** One coordinate of B from A and the mid-point M: 2 \times m - a = b. */
export const endLine = (A, M, c) => `2 \\times ${pn(M[c])} - ${pn(A[c])} = ${fx(M[c].mul(2).sub(A[c]))}`;
/** One coordinate of C from A, B and the centroid G: 3 \times g - a - b = c. */
export const thirdLine = (A, B, G, c) => `3 \\times ${pn(G[c])} - ${pn(A[c])} - ${pn(B[c])} = ${fx(G[c].mul(3).sub(A[c]).sub(B[c]))}`;
/** One coordinate of D = A + C - B. */
export const fourthLine = (A, B, C, c) => `${fx(A[c])} + ${pn(C[c])} - ${pn(B[c])} = ${fx(A[c].add(C[c]).sub(B[c]))}`;
