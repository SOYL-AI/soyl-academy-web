// Geometry and exact-arithmetic helpers for ICSE 10 Mathematics ch14 Similarity.
// Every figure is built from real side lengths / angles (centimetres): triangles are placed by the law of cosines
// or sines, the figure is scaled by k drawing units per cm, and the builder ASSERTS (floating point, 1e-9) that
// drawn triangles really are similar (equal angles, proportional sides), that D, E on AB, AC divide them in the
// stated ratio and DE is parallel to BC, that numeric segment labels equal the true lengths, and that every
// angle label measures what it says. Fractions in worked values use fr.mjs (exact).
import { geom } from './lib.mjs';
import { F } from './fr.mjs';

export const must = (c, m) => { if (!c) throw new Error(m); };
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const near = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
export const angDeg = (V, A, B) => {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
};
const rad = (d) => (d * Math.PI) / 180;
export const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
export const cross = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
export const fmtN = (v) => String(+Number(v).toFixed(6));
const r4 = (v) => Math.round(v * 1e4) / 1e4;

/** Triangle with BC horizontal: B = (0, 0), C = (a, 0), A above. Sides a = BC, b = CA, c = AB. */
export function triSides(a, b, c) {
  must(a + b > c && b + c > a && a + c > b, `triangle ${a}, ${b}, ${c} violates the triangle inequality`);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  return { B: [0, 0], C: [a, 0], A: [c * cosB, c * Math.sqrt(1 - cosB * cosB)] };
}
/** Triangle by its angles at A, B, C (degrees, summing to 180) and the base BC = a. */
export function triAngles(angA, angB, angC, a = 5) {
  must(Math.abs(angA + angB + angC - 180) < 1e-9, 'angles sum to 180');
  const c = (a * Math.sin(rad(angC))) / Math.sin(rad(angA));
  return { B: [0, 0], C: [a, 0], A: [c * Math.cos(rad(angB)), c * Math.sin(rad(angB))] };
}
export const sidesOf = (T) => [dist(T.B, T.C), dist(T.C, T.A), dist(T.A, T.B)];
export const anglesOf = (T) => [angDeg(T.A, T.B, T.C), angDeg(T.B, T.C, T.A), angDeg(T.C, T.A, T.B)];
/** Move a triangle (or any named point set) by (dx, dy); scale about the origin by s. */
export const shift = (T, dx, dy) => Object.fromEntries(Object.entries(T).map(([n, p]) => [n, [p[0] + dx, p[1] + dy]]));
export const scaleBy = (T, s) => Object.fromEntries(Object.entries(T).map(([n, p]) => [n, [p[0] * s, p[1] * s]]));
/** Rename the vertices of a triangle: map {A: 'P', ...}. */
export const rename = (T, m) => Object.fromEntries(Object.entries(T).map(([n, p]) => [m[n] ?? n, p]));

/** Two triangles are similar with ratio r = (corresponding side of T2) / (side of T1), checked on sides and angles. */
export function assertSimilar(T1, T2, r, what) {
  const s1 = sidesOf(T1), s2 = sidesOf(T2);
  s1.forEach((s, i) => must(near(s2[i], s * r, 1e-9), `${what}: side ${i} ratio ${s2[i] / s} is not ${r}`));
  const a1 = anglesOf(T1), a2 = anglesOf(T2);
  a1.forEach((a, i) => must(Math.abs(a - a2[i]) < 1e-6, `${what}: angle ${i} differs`));
}

/**
 * Draw named points (real cm coordinates) at k drawing units per cm.
 *   segs:   [from, to, label?, { dashed, ticks, arrows }?]; a numeric label must equal the true length (cm) and is
 *           then checked by the lint against `scale`; other labels (letters, TeX) are free text
 *   angles: [at, from, to, label?, { right, arcs }?]; a degree label must measure what it says
 *   polys:  [[names], highlight?]
 *   pos:    label positions { A: 'n' }; names starting with "_" are drawn without a label
 */
export function draw({ pts, k = 1, margin = 0.8, segs = [], angles = [], polys = [], pos = {}, names = {}, scaleUnit = null, notToScale = false }, alt, caption) {
  const xs = Object.values(pts).map((p) => p[0]), ys = Object.values(pts).map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const points = {};
  for (const [n, p] of Object.entries(pts)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false; else if (names[n]) o.label = names[n];
    if (pos[n]) o.label_position = pos[n];
    points[n] = o;
  }
  const width = r4(Math.max(...xs.map((x) => (x - x0) * k)) + 2 * margin), height = r4(Math.max(...ys.map((y) => (y - y0) * k)) + 2 * margin);
  const segments = segs.map(([from, t, label, o = {}]) => {
    must(pts[from] && pts[t], `segment ${from}${t}: unknown point`);
    if (label !== undefined && /^\d+(\.\d+)?$/.test(label)) must(near(dist(pts[from], pts[t]), Number(label), 1e-9), `segment ${from}${t} labelled ${label} is really ${dist(pts[from], pts[t])}`);
    return { from, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}), ...(o.arrows ? { arrows: o.arrows } : {}) };
  });
  const angs = angles.map(([at, from, t, label, o = {}]) => {
    const m = angDeg(pts[at], pts[from], pts[t]);
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${from}${at}${t} labelled ${label} is really ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${from}${at}${t} is not right`);
    return { at, from, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  const polygons = polys.map(([vertices, highlight]) => ({ vertices, ...(highlight ? { highlight } : {}) }));
  const spec = { width, height, points, segments, angles: angs, polygons };
  if (scaleUnit) spec.scale = { unit: scaleUnit, per_unit: k };
  if (notToScale) spec.not_to_scale = true;
  return geom(spec, alt, caption);
}

/** Two similar triangles side by side, T2 = r x T1 (r an Fr), drawn at the same scale k. Returns the points too. */
export function twoTri({ s1, r, n1 = ['A', 'B', 'C'], n2 = ['P', 'Q', 'R'], k = 0.5, gap = 2, lab1 = [], lab2 = [], angles = [], pos = {}, tickEq = null }, alt, caption) {
  const T1 = triSides(...s1), T2 = triSides(...s1.map((s) => s * r.num()));
  assertSimilar(T1, T2, r.num(), 'twoTri');
  const nm1 = { A: n1[0], B: n1[1], C: n1[2] }, nm2 = { A: n2[0], B: n2[1], C: n2[2] };
  const W1 = Math.max(...Object.values(T1).map((p) => p[0])) - Math.min(...Object.values(T1).map((p) => p[0]));
  const L = rename(T1, nm1), R = rename(shift(T2, W1 + gap, 0), nm2);
  const segs = [];
  [[nm1, lab1], [nm2, lab2]].forEach(([nm, lab]) => [[nm.B, nm.C, lab[0]], [nm.C, nm.A, lab[1]], [nm.A, nm.B, lab[2]]].forEach(([f, t, l], i) => segs.push([f, t, l, tickEq ? { ticks: tickEq[i] } : {}])));
  const pts = { ...L, ...R };
  const segsF = segs.filter((g) => g[2] !== undefined || g[3].ticks);
  return { fig: draw({ pts, k, segs: segsF, angles, polys: [[n1, 'shade'], [n2, 'outline']], pos, scaleUnit: [...lab1, ...lab2].some((l) => l !== undefined && /^\d/.test(l)) ? 'cm' : null }, alt, caption), pts, T1, T2 };
}

/** Triangle ABC (BC horizontal) with D on AB, E on AC, AD : DB = AE : EC = m : n, so DE is parallel to BC. */
export function bptTri({ s, m, n, k = 0.5, lab = {}, names = {}, pos = {}, extra = [], angles = [], extraPts = {}, polys = [] }, alt, caption) {
  const T = triSides(...s);
  const t = m / (m + n);
  const D = lerp(T.A, T.B, t), E = lerp(T.A, T.C, t);
  must(near(cross(T.B, T.C, D) , cross(T.B, T.C, E), 1e-9), 'D and E are at the same height: DE is parallel to BC');
  must(near(dist(T.A, D) / dist(D, T.B), m / n, 1e-9) && near(dist(T.A, E) / dist(E, T.C), m / n, 1e-9), 'AD:DB = AE:EC = m:n');
  must(near(dist(D, E) / dist(T.B, T.C), m / (m + n), 1e-9), 'DE / BC = m / (m+n)');
  const pts = { ...T, D, E, ...extraPts };
  const segs = [['B', 'C', lab.BC], ['A', 'D', lab.AD], ['D', 'B', lab.DB], ['A', 'E', lab.AE], ['E', 'C', lab.EC], ['D', 'E', lab.DE], ...extra];
  const labelled = Object.values(lab).some((l) => /^\d/.test(l ?? ''));
  return { fig: draw({ pts, k, segs, angles, polys: [[['A', 'B', 'C']], ...polys], pos: { A: 'n', B: 'sw', C: 'se', D: 'w', E: 'e', ...pos }, names, scaleUnit: labelled ? 'cm' : null }, alt, caption), pts, T, D, E };
}

/** Trapezium ABCD with AB parallel to DC (AB = ab at the bottom, DC = dc on top, height h, DC shifted by off); diagonals meet at O. */
export function trapezium({ ab, dc, h = 4, off = 1.5, k = 0.5, lab = {}, names = {}, pos = {}, angles = [], segs: more = [] }, alt, caption) {
  const A = [0, 0], B = [ab, 0], D = [off, h], C = [off + dc, h];
  const O = lerp(A, C, ab / (ab + dc));
  must(near(cross(B, D, O), 0, 1e-9) && near(dist(A, O) / dist(O, C), ab / dc, 1e-9) && near(dist(B, O) / dist(O, D), ab / dc, 1e-9), 'diagonals meet at O dividing both in AB : DC');
  must(near(cross(A, B, D), cross(A, B, C), 1e-9) || near(D[1], C[1]), 'DC parallel to AB');
  const pts = { A, B, C, D, O };
  const segs = [['A', 'B', lab.AB], ['D', 'C', lab.DC], ['A', 'C', lab.AC, { dashed: true }], ['B', 'D', lab.BD, { dashed: true }], ...['AO', 'OC', 'BO', 'OD'].filter((n) => lab[n] !== undefined).map((n) => [n[0], n[1], lab[n]]), ...more];
  const labelled = Object.values(lab).some((l) => /^\d/.test(l ?? ''));
  return { fig: draw({ pts, k, segs, angles, polys: [[['A', 'B', 'C', 'D']]], pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n', ...pos }, names, scaleUnit: labelled ? 'cm' : null }, alt, caption), pts, O };
}

/** A pole and a tower on level ground in the same sunlight: heights h1, h2, shadows s1, s2 (all in real units), drawn to scale k. */
export function shadows({ h1, s1, h2, s2, gap = 2, k = 0.5, unit = 'm', lab = {} }, alt, caption) {
  must(near(h1 / s1, h2 / s2, 1e-9), 'same sun angle: h1/s1 = h2/s2');
  const pts = { B1: [0, 0], T1: [0, h1], S1: [s1, 0], B2: [s1 + gap, 0], T2: [s1 + gap, h2], S2: [s1 + gap + s2, 0] };
  const segs = [['B1', 'T1', lab.h1], ['B1', 'S1', lab.s1], ['T1', 'S1', undefined, { arrows: 1 }], ['B2', 'T2', lab.h2], ['B2', 'S2', lab.s2], ['T2', 'S2', undefined, { arrows: 1 }]];
  must(near(angDeg(pts.S1, pts.B1, pts.T1), angDeg(pts.S2, pts.B2, pts.T2), 1e-9), 'equal sun angles');
  const labelled = Object.values(lab).some((l) => /^\d/.test(l ?? ''));
  return { fig: draw({ pts, k, segs, angles: [['B1', 'S1', 'T1', undefined, { right: true }], ['B2', 'S2', 'T2', undefined, { right: true }]], polys: [[['B1', 'S1', 'T1']], [['B2', 'S2', 'T2']]], pos: { B1: 'sw', T1: 'n', S1: 's', B2: 'sw', T2: 'n', S2: 's' }, names: { B1: 'A', T1: 'B', S1: 'C', B2: 'P', T2: 'Q', S2: 'R' }, scaleUnit: labelled ? unit : null }, alt, caption), pts };
}

/** Right-angled triangle ABC (right angle at B) with the altitude BD to the hypotenuse AC. Legs ab = AB (vertical), bc = BC (horizontal). */
export function rightAlt({ ab, bc, k = 0.5, lab = {}, names = {} }, alt, caption) {
  const B = [0, 0], C = [bc, 0], A = [0, ab], ac = Math.hypot(ab, bc);
  const D = lerp(A, C, (ab * ab) / (ac * ac));
  must(Math.abs(angDeg(D, B, A) - 90) < 1e-9 && Math.abs(angDeg(D, B, C) - 90) < 1e-9, 'BD is perpendicular to AC');
  must(near(dist(B, D), (ab * bc) / ac, 1e-9) && near(dist(A, D), (ab * ab) / ac, 1e-9) && near(dist(D, C), (bc * bc) / ac, 1e-9) && near(cross(A, C, D), 0, 1e-9), 'altitude foot lengths');
  const pts = { A, B, C, D };
  const segs = [['A', 'B', lab.AB], ['B', 'C', lab.BC], ['A', 'C', lab.AC], ['B', 'D', lab.BD, { dashed: true }], ['A', 'D', lab.AD], ['D', 'C', lab.DC]];
  const labelled = Object.values(lab).some((l) => /^\d/.test(l ?? ''));
  return { fig: draw({ pts, k, segs, angles: [['B', 'A', 'C', undefined, { right: true }], ['D', 'B', 'A', undefined, { right: true }]], pos: { A: 'n', B: 'sw', C: 'se', D: 'ne' }, names, scaleUnit: labelled ? 'cm' : null }, alt, caption), pts };
}
