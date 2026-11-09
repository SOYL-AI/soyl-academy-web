// Exact arithmetic and figures for CBSE 11 Mathematics ch11 Introduction to Three-dimensional Geometry.
// Coordinates are integers (or exact rationals from gp.mjs, an unchanged copy of the ICSE 10 ch10 module).
// Every distance is kept as a squared integer and written as a simplified surd; octants, feet, images, section points
// and triangle types are computed here and cross-checked a second way (floating point, or by a defining property).
import { Q as Rat, q } from './gp.mjs';
import { geom } from './lib.mjs';

export { Rat, q };
/** Raw template; "\n" (not followed by a letter) becomes a newline, so \neq and \ne survive. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const must = (cond, msg) => { if (!cond) throw new Error(`space check failed: ${msg}`); };
export const near = (u, v, tol = 1e-9) => Math.abs(u - v) <= tol * Math.max(1, Math.abs(u), Math.abs(v));
export const tx = (v) => Rat.of(v).tex();
/** "(2, -1, 3)" for integers or rationals */
export const pt = (p) => `(${p.map(tx).join(', ')})`;
/** "A(2, -1, 3)" */
export const PT = (name, p) => `${name}${pt(p)}`;
export const N = (x) => Rat.of(x).num();

// ---------------------------------------------------------------- squared distances and surds
export const dsq = (A, B) => A.reduce((s, a, i) => s + (B[i] - a) ** 2, 0);
export function surd(n) { // n = k^2 m, m square-free
  must(Number.isInteger(n) && n >= 0, `surd of ${n}`);
  let k = 1, m = n;
  for (let p = 2; p * p <= m; p++) while (m % (p * p) === 0) { m /= p * p; k *= p; }
  return { k, m };
}
/** TeX of the square root of an integer in simplest form: 13, \sqrt{7}, 5\sqrt{2}. */
export function sqTex(n) {
  const { k, m } = surd(n);
  must(near(k * Math.sqrt(m), Math.sqrt(n)), `surd of ${n}`);
  if (m === 1) return String(k);
  return k === 1 ? `\\sqrt{${m}}` : `${k}\\sqrt{${m}}`;
}
export const sqVal = (n) => Math.sqrt(n);
/** Distance AB as TeX, checked against Math.hypot of the differences. */
export function dTex(A, B) {
  must(near(Math.hypot(...A.map((a, i) => B[i] - a)), sqVal(dsq(A, B))), 'hypot vs squared distance');
  return sqTex(dsq(A, B));
}
export const dNum = (A, B) => Math.hypot(...A.map((a, i) => B[i] - a));
/** The three differences (x_2 - x_1)^2 + ... with numbers, as TeX (negative numbers in brackets) */
const brk = (v) => (v < 0 ? `(${v})` : `${v}`);
export const diffSq = (A, B) => A.map((a, i) => `(${B[i]} - ${brk(a)})^2`).join(" + ");
/** The differences evaluated: "16 + 16 + 4" */
export const sqTerms = (A, B) => A.map((a, i) => (B[i] - a) ** 2).join(' + ');
export const vminus = (A, B) => A.map((a, i) => B[i] - a);

// ---------------------------------------------------------------- octants, planes, axes
const OCT = { '+++': 1, '-++': 2, '--+': 3, '+-+': 4, '++-': 5, '-+-': 6, '---': 7, '+--': 8 };
export const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const sg = (v) => Rat.of(v).sign();
/** Octant number 1..8, or 0 when a coordinate is zero. */
export function octant(p) {
  if (p.some((v) => sg(v) === 0)) return 0;
  const n = OCT[p.map((v) => (sg(v) > 0 ? '+' : '-')).join('')];
  // second route: count sign pattern against the stated rule (octant 1..4 have z > 0; 5..8 have z < 0; within each, the xy quadrant)
  const quad = sg(p[0]) > 0 ? (sg(p[1]) > 0 ? 1 : 4) : sg(p[1]) > 0 ? 2 : 3;
  must(n === quad + (sg(p[2]) > 0 ? 0 : 4), `octant of ${p}`);
  return n;
}
export const octName = (p) => `octant ${ROMAN[octant(p)]}`;
/** Where does the point lie: 'origin', 'x-axis', ..., 'xy-plane', ..., or the octant. */
export function where(p) {
  const z = p.map((v) => sg(v) === 0);
  const nz = z.filter(Boolean).length;
  if (nz === 3) return 'origin';
  if (nz === 2) return ['x-axis', 'y-axis', 'z-axis'][z.indexOf(false)];
  if (nz === 1) return ['yz-plane', 'zx-plane', 'xy-plane'][z.indexOf(true)];
  return `octant ${ROMAN[octant(p)]}`;
}
const AX = { x: 0, y: 1, z: 2 };
const PL = { xy: 2, yz: 0, zx: 1 }; // the coordinate that is zero in the plane
/** Foot of the perpendicular on a coordinate plane; checked by perpendicularity (P - F is along the plane's normal). */
export function footPlane(p, plane) {
  const f = p.map((v, i) => (i === PL[plane] ? 0 : v));
  const d = p.map((v, i) => v - f[i]);
  must(d.every((v, i) => (i === PL[plane] ? true : Rat.of(v).isZero())), 'foot on a plane is perpendicular');
  return f;
}
/** Foot of the perpendicular on a coordinate axis; checked by minimising the distance over a grid. */
export function footAxis(p, axis) {
  const f = p.map((v, i) => (i === AX[axis] ? v : 0));
  const best = Math.min(...Array.from({ length: 401 }, (_, k) => { const t = N(p[AX[axis]]) - 10 + k * 0.05; return Math.hypot(...p.map((v, i) => N(v) - (i === AX[axis] ? t : 0))); }));
  must(near(best, Math.hypot(...p.map((v, i) => N(v) - N(f[i]))), 1e-9), 'foot on an axis minimises the distance');
  return f;
}
export const distPlane = (p, plane) => Rat.of(p[PL[plane]]).abs();
/** Squared distance from a coordinate axis: the other two coordinates squared and added. */
export const dsqAxis = (p, axis) => p.reduce((s, v, i) => (i === AX[axis] ? s : s + v * v), 0);
export const reflectPlane = (p, plane) => p.map((v, i) => (i === PL[plane] ? -v : v));
export const reflectAxis = (p, axis) => p.map((v, i) => (i === AX[axis] ? v : -v));
export const reflectOrigin = (p) => p.map((v) => -v);

// ---------------------------------------------------------------- section formula (internal), centroid, collinearity, triangles
/** Point dividing AB internally in the ratio m : n (AP : PB), as exact rationals; checked by the distance ratio. */
export function sect(A, B, m, n) {
  const P = A.map((a, i) => Rat.of(m).mul(B[i]).add(Rat.of(n).mul(a)).div(Rat.of(m).add(n)));
  const apSq = A.reduce((s, a, i) => s.add(P[i].sub(a).pow(2)), Rat.of(0));
  const pbSq = B.reduce((s, b, i) => s.add(Rat.of(b).sub(P[i]).pow(2)), Rat.of(0));
  must(apSq.mul(Rat.of(n).pow(2)).eq(pbSq.mul(Rat.of(m).pow(2))), `AP:PB = ${m}:${n} (squared distances)`);
  must(P.every((c, i) => c.sub(A[i]).mul(Rat.of(m).add(n)).eq(Rat.of(m).mul(Rat.of(B[i]).sub(A[i])))), 'AP = m/(m+n) AB');
  return P;
}
export const mid = (A, B) => sect(A, B, 1, 1);
export function centroid(...V) {
  const c = V[0].map((_, i) => V.reduce((s, v) => s.add(v[i]), Rat.of(0)).div(V.length));
  const D = mid(V[1], V[2]); // medians: G divides V0-D in 2 : 1
  const G2 = sect(V[0], D, 2, 1);
  must(c.every((v, i) => v.eq(G2[i])), 'centroid divides the median 2 : 1');
  return c;
}
/** Ratio in which a coordinate plane (coord index k) cuts AB: -a_k : b_k, reduced; null when parallel or not between. */
export function planeRatio(A, B, k) {
  must(A[k] !== 0 || B[k] !== 0, 'segment inside the plane');
  const m = -A[k], n = B[k];
  return { m, n, valid: (m > 0 && n > 0) || (m < 0 && n < 0) };
}
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export function ratioTex(m, n) { const g = gcd(Math.abs(m), Math.abs(n)); return `${Math.abs(m) / g} : ${Math.abs(n) / g}`; }
/** Collinear: cross product of AB and AC is zero. */
export const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
export const collinear = (A, B, C) => cross(vminus(A, B), vminus(A, C)).every((v) => v === 0);
/** (sqrt a + sqrt b = sqrt c) by exact integer algebra: c - a - b >= 0 and 4ab = (c - a - b)^2. */
export const sumOfRoots = (a, b, c) => { const t = c - a - b; return t >= 0 && 4 * a * b === t * t; };
/** The three squared sides sorted, and a name of the triangle type from them. */
export function triangleKind(A, B, C) {
  const s = [dsq(A, B), dsq(B, C), dsq(C, A)];
  const t = [...s].sort((u, v) => u - v);
  const right = t[0] + t[1] === t[2];
  const iso = t[0] === t[1] || t[1] === t[2];
  const equi = t[0] === t[2];
  const num = (() => { const [a, b, c] = [A, B, C].map((v) => v.map(Number)); const u = vminus(a, b), w = vminus(a, c); return cross(u, w).some((x) => x !== 0); })();
  must(num, 'triangle is not degenerate');
  return { sides: s, sorted: t, right, iso, equi, kind: equi ? 'equilateral' : right && iso ? 'isosceles right-angled' : right ? 'right-angled' : iso ? 'isosceles' : 'scalene' };
}

// ---------------------------------------------------------------- oblique 3-D sketch as a geometry figure
/**
 * pts: { id: { p: [x, y, z], label?: string | false, pos?: compass } }; axes: length of each drawn axis
 * (x comes towards the viewer, drawn down-left). Projection: (x, y, z) -> (y - 0.55x, z - 0.42x), scaled by k.
 * Not to scale (oblique sketch), as the caption says.
 */
export function fig3d({ pts, segments = [], axes = [4, 4, 4], k = 1, alt, caption }) {
  const P = (p) => [k * (N(p[1]) - 0.55 * N(p[0])), k * (N(p[2]) - 0.42 * N(p[0]))];
  const all = { O: { p: [0, 0, 0], label: 'O', pos: 'sw' }, X: { p: [axes[0], 0, 0], label: 'x', pos: 'sw' }, Y: { p: [0, axes[1], 0], label: 'y', pos: 'e' }, Z: { p: [0, 0, axes[2]], label: 'z', pos: 'n' }, ...pts };
  const xy = Object.fromEntries(Object.entries(all).map(([id, o]) => [id, P(o.p)]));
  const xs = Object.values(xy).map((q2) => q2[0]), ys = Object.values(xy).map((q2) => q2[1]);
  const m = 0.8, dx = m - Math.min(...xs), dy = m - Math.min(...ys);
  const rd = (v) => Math.round(v * 1000) / 1000;
  const points = Object.fromEntries(Object.entries(all).map(([id, o]) => {
    const q2 = { at: [rd(xy[id][0] + dx), rd(xy[id][1] + dy)] };
    if (o.label !== undefined) q2.label = o.label;
    if (o.pos) q2.label_position = o.pos;
    return [id, q2];
  }));
  for (const s of segments) must(points[s.from] && points[s.to], `segment ${s.from}-${s.to} refers to a known point`);
  return geom({
    width: rd(Math.max(...xs) + dx + m), height: rd(Math.max(...ys) + dy + m), points,
    segments: [{ from: 'O', to: 'X', dashed: true }, { from: 'O', to: 'Y', dashed: true }, { from: 'O', to: 'Z', dashed: true }, ...segments],
    not_to_scale: true,
  }, alt, caption);
}
