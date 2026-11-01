// Exact geometry for ICSE 10 Mathematics ch11 Reflection.
// Coordinates are integers or halves (asserted), so every sum, difference, product and shoelace term is exact
// in binary floating point. Every fact the chapter states is computed here and cross-checked:
//   * an image by the coordinate rule ((x, -y), (-x, y), (-x, -y), (2a - x, y), (x, 2b - y)) AND by the
//     geometric definition (the mirror is the perpendicular bisector of PP', or O is the midpoint of PP'),
//     and reflecting the image again must give back the point;
//   * invariant points by the rule (image = point) AND by "the point lies on the mirror";
//   * the mirror from a point and its image by the midpoint, confirmed by reflecting;
//   * areas by the shoelace formula AND by Pick's theorem (interior and boundary lattice points counted by
//     brute force on a doubled grid);
//   * lengths as exact square roots of integer squared distances (Math.hypot must agree);
//   * figure names from parallel sides (cross products), equal sides and right angles (dot products), on a
//     convex vertex order that is asserted.
// Fr (exact fractions) is copied from ch09's ap.mjs for the working-line checker (work.mjs).

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

export function must(cond, msg) { if (!cond) throw new Error(`reflection check failed: ${msg}`); }

// ---------------------------------------------------------------- points
/** A coordinate: an integer or a half, never -0. */
function c(v) {
  must(Number.isFinite(v) && Number.isInteger(v * 2) && Math.abs(v) < 1e6, `coordinate ${v} is not a whole number or a half`);
  return v === 0 ? 0 : v;
}
export const pt = (x, y) => Object.freeze([c(x), c(y)]);
export const same = (p, q) => p[0] === q[0] && p[1] === q[1];
export const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];

// ---------------------------------------------------------------- mirrors
/**
 * A mirror: a vertical line x = a, a horizontal line y = b, or the origin (a point reflection).
 * tex: how the mirror is written in text (Markdown with $…$); say: words for narration.
 */
export const vx = (a) => Object.freeze({ kind: 'v', a: c(a), tex: a === 0 ? 'the $y$-axis' : `the line $x = ${a}$`, eq: `x = ${a}`, say: a === 0 ? 'the y axis' : `the line x equals ${a}` });
export const hy = (b) => Object.freeze({ kind: 'h', b: c(b), tex: b === 0 ? 'the $x$-axis' : `the line $y = ${b}$`, eq: `y = ${b}`, say: b === 0 ? 'the x axis' : `the line y equals ${b}` });
export const X = hy(0); // the x-axis (y = 0)
export const Y = vx(0); // the y-axis (x = 0)
export const O = Object.freeze({ kind: 'o', tex: 'the origin', eq: 'O', say: 'the origin' });

/** Image by the coordinate rule only. */
function rule(m, [x, y]) {
  if (m.kind === 'v') return pt(2 * m.a - x, y);
  if (m.kind === 'h') return pt(x, 2 * m.b - y);
  return pt(-x, -y);
}
/** Is p on the mirror (for the origin: is p the origin)? */
export function onMirror(m, p) {
  if (m.kind === 'v') return p[0] === m.a;
  if (m.kind === 'h') return p[1] === m.b;
  return p[0] === 0 && p[1] === 0;
}
/** Signed distance of p from the mirror line (for the origin: the squared distance). */
const gap = (m, p) => (m.kind === 'v' ? p[0] - m.a : m.kind === 'h' ? p[1] - m.b : p[0] * p[0] + p[1] * p[1]);

/** Image of p in mirror m: the rule, checked against the geometric definition. */
export function img(m, p) {
  const q = rule(m, p);
  const M = mid(p, q);
  if (m.kind === 'o') must(M[0] === 0 && M[1] === 0 && gap(m, p) === gap(m, q), `origin is the midpoint of ${p} and ${q}`);
  else {
    // the mirror bisects PP' and PP' is perpendicular to it (P and P' share the other coordinate)
    must(onMirror(m, M), `midpoint of ${p}, ${q} on ${m.eq}`);
    must(m.kind === 'v' ? p[1] === q[1] : p[0] === q[0], `PP' perpendicular to ${m.eq}`);
    must(gap(m, p) === -gap(m, q), `equal distances from ${m.eq}`);
  }
  must(same(rule(m, q), p), 'reflecting twice gives the point back');
  must(same(q, p) === onMirror(m, p), 'invariant exactly when on the mirror');
  return q;
}
/** Successive images: path(p, m1, m2, …) = [p, p1, p2, …]. */
export function path(p, ...ms) {
  const out = [p];
  for (const m of ms) out.push(img(m, out[out.length - 1]));
  return out;
}
/** Images of every vertex of a figure. */
export const imgAll = (m, ps) => ps.map((p) => img(m, p));
/** Every mirror (vertical line, horizontal line, origin) that maps p to q. */
export function mirrorsOf(p, q) {
  must(!same(p, q), 'a point and a different image');
  const out = [];
  if (p[1] === q[1]) out.push(vx((p[0] + q[0]) / 2));
  if (p[0] === q[0]) out.push(hy((p[1] + q[1]) / 2));
  if (p[0] === -q[0] && p[1] === -q[1]) out.push(O);
  for (const m of out) must(same(img(m, p), q), `mirror ${m.eq} maps ${p} to ${q}`);
  return out;
}
/** The single mirror (among lines parallel to the axes and the origin) with the same effect as a sequence, or null. */
export function singleFor(...ms) {
  const tests = [[3, 5], [-7, 2], [4, -9], [0, 6], [-2.5, -1], [11, 0]].map(([x, y]) => pt(x, y));
  const cands = [O, ...[-6, -4, -3, -2, -1, 0, 1, 2, 3, 4, 6].flatMap((k) => [vx(k), hy(k)])];
  const hits = cands.filter((m) => tests.every((p) => same(img(m, p), path(p, ...ms).at(-1))));
  must(hits.length <= 1, 'at most one equivalent mirror');
  return hits[0] ?? null;
}

// ---------------------------------------------------------------- lengths, areas, figures
export const dist2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
/** Exact length, or throws if it is not a whole number or a half (use dist2 for surds). */
export function dist(p, q) {
  const s = dist2(p, q);
  const r = Math.round(Math.sqrt(s) * 2) / 2;
  must(r * r === s, `length ${p}–${q} is not exact (squared ${s})`);
  must(Math.abs(Math.hypot(p[0] - q[0], p[1] - q[1]) - r) < 1e-9, 'hypot agrees');
  return r;
}
/** Shoelace area (absolute). */
export function shoelace(ps) {
  let s = 0;
  for (let i = 0; i < ps.length; i++) { const [x1, y1] = ps[i], [x2, y2] = ps[(i + 1) % ps.length]; s += x1 * y2 - x2 * y1; }
  return Math.abs(s) / 2;
}
/** Area by Pick's theorem on the doubled grid: lattice points counted one by one. */
function pick(ps) {
  const q = ps.map(([x, y]) => [2 * x, 2 * y]);
  let B = 0;
  for (let i = 0; i < q.length; i++) { const [a, b] = [q[i], q[(i + 1) % q.length]]; B += gcd(b[0] - a[0], b[1] - a[1]); }
  const xs = q.map((p) => p[0]), ys = q.map((p) => p[1]);
  const onEdge = (x, y) => q.some((a, i) => { const b = q[(i + 1) % q.length]; return (b[0] - a[0]) * (y - a[1]) === (b[1] - a[1]) * (x - a[0]) && x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]) && y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]); });
  const inside = (x, y) => { let c0 = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c0 = !c0; } return c0; };
  let I = 0;
  for (let x = Math.min(...xs); x <= Math.max(...xs); x++) for (let y = Math.min(...ys); y <= Math.max(...ys); y++) if (!onEdge(x, y) && inside(x, y)) I++;
  return (I + B / 2 - 1) / 4;
}
/** Area of a simple polygon: shoelace, confirmed by Pick's theorem. */
export function area(ps) {
  const a = shoelace(ps);
  must(a > 0, 'non-degenerate figure');
  must(Math.abs(pick(ps) - a) < 1e-9, `Pick's theorem agrees with the shoelace area ${a}`);
  return a;
}
/** Perimeter (every side must be an exact length). */
export const perimeter = (ps) => ps.reduce((s, p, i) => s + dist(p, ps[(i + 1) % ps.length]), 0);
const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
export const collinear = (a, b, p) => cross(a, b, p) === 0;
function convex(ps) {
  const s = ps.map((p, i) => Math.sign(cross(p, ps[(i + 1) % ps.length], ps[(i + 2) % ps.length])));
  return s.every((v) => v !== 0) && s.every((v) => v === s[0]);
}
const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
const par = (u, v) => u[0] * v[1] - u[1] * v[0] === 0;
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
/** Name of a triangle or a convex quadrilateral (vertices in order). */
export function classify(ps) {
  if (ps.length === 3) {
    must(!collinear(...ps), 'a triangle needs non-collinear vertices');
    const s = [dist2(ps[0], ps[1]), dist2(ps[1], ps[2]), dist2(ps[2], ps[0])].sort((u, v) => u - v);
    const right = s[0] + s[1] === s[2];
    const iso = s[0] === s[1] || s[1] === s[2];
    if (s[0] === s[2]) return 'equilateral triangle';
    if (right && iso) return 'right-angled isosceles triangle';
    if (right) return 'right-angled triangle';
    return iso ? 'isosceles triangle' : 'scalene triangle';
  }
  must(ps.length === 4 && convex(ps), 'a convex quadrilateral with vertices in order');
  const e = ps.map((p, i) => vec(p, ps[(i + 1) % 4]));
  const L = e.map((v) => dot(v, v));
  const p02 = par(e[0], e[2]), p13 = par(e[1], e[3]);
  const allEq = L.every((v) => v === L[0]);
  const right = e.every((v, i) => dot(v, e[(i + 1) % 4]) === 0);
  if (p02 && p13) return right ? (allEq ? 'square' : 'rectangle') : allEq ? 'rhombus' : 'parallelogram';
  if (p02 || p13) {
    const legs = p02 ? [L[1], L[3]] : [L[0], L[2]];
    return legs[0] === legs[1] ? 'isosceles trapezium' : 'trapezium';
  }
  if ((L[0] === L[1] && L[2] === L[3]) || (L[1] === L[2] && L[3] === L[0])) return 'kite';
  return 'quadrilateral';
}

// ---------------------------------------------------------------- text
/** A number in TeX: -3, 1.5. */
export const n = (v) => String(c(v));
/** A coordinate pair in TeX (inside $…$): (3, -4). */
export const ct = (p) => `(${n(p[0])}, ${n(p[1])})`;
/** A named point in Markdown: $A(3, -4)$; name may carry primes (A', P_1). */
export const P = (name, p) => `$${name}${ct(p)}$`;
/** A plot label (plain text, Unicode minus): A′(3, −4). */
export const lab = (name, p) => `${name.replace(/'/g, '′').replace(/_(\d)/g, (m, d) => '₀₁₂₃₄₅₆₇₈₉'[d])}(${[p[0], p[1]].map((v) => (v < 0 ? `−${-v}` : `${v}`)).join(', ')})`;
