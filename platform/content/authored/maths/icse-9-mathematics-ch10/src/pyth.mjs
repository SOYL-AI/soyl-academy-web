// Geometry helper for ICSE 9 Mathematics ch10 (Pythagoras Theorem). Figures are built from integer coordinates; every length, right
// angle, area and Pythagorean relation is asserted from the coordinates, surd lengths exactly (by squared integers), decimals by
// rounding that refuses boundary cases. fig() throws if a numeric label, tick, arrow, right-angle mark or degree label disagrees.
import { geom } from './lib.mjs';

export const must = (c, m) => { if (!c) throw new Error(`geometry self-check failed: ${m}`); };
export const near = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
export const sub = (P, Q) => [P[0] - Q[0], P[1] - Q[1]];
export const add = (P, Q) => [P[0] + Q[0], P[1] + Q[1]];
export const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
export const lerp = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
export const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
export const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
export const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
export const r6 = (v) => Math.round(v * 1e6) / 1e6;
export const rad = (d) => (d * Math.PI) / 180;
export const polar = (V, len, deg) => [V[0] + len * Math.cos(rad(deg)), V[1] + len * Math.sin(rad(deg))];
export const angDeg = (V, A, B) => {
  const a = sub(A, V), b = sub(B, V);
  return (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
};
/** AB parallel to CD (non-degenerate segments). */
export const parallel = (A, B, C, D) => dist(A, B) > 1e-9 && dist(C, D) > 1e-9 && Math.abs(cross(sub(B, A), sub(D, C))) < 1e-9 * dist(A, B) * dist(C, D);
export const collinear = (A, B, C) => Math.abs(cross(sub(B, A), sub(C, A))) < 1e-9 * Math.max(1, dist(A, B) * dist(A, C));
export const sameLine = (A, B, C, D) => collinear(A, B, C) && collinear(A, B, D);
export const isMid = (M, A, B) => near(M[0], (A[0] + B[0]) / 2) && near(M[1], (A[1] + B[1]) / 2);
export const meet = (A, B, C, D) => {
  const u = sub(B, A), v = sub(D, C);
  const den = cross(u, v);
  must(Math.abs(den) > 1e-12, 'lines are parallel, no meeting point');
  const t = cross(sub(C, A), v) / den;
  return [A[0] + t * u[0], A[1] + t * u[1]];
};
export const perimeter = (...P) => P.reduce((s, p, i) => s + dist(p, P[(i + 1) % P.length]), 0);
export const parallelogram = (A, B, C, D) => parallel(A, B, D, C) && parallel(A, D, B, C);
export const nondegenerate = (A, B, C) => Math.abs(cross(sub(B, A), sub(C, A))) > 1e-9;

// ---------------------------------------------------------------- figures
const COMPASS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
const compass = (deg) => COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
const r4 = (v) => Math.round(v * 1e4) / 1e4;
/**
 * Figure from coordinates in cm.
 *   pts:    { A: [x, y], _h: [x, y] (hidden label) }
 *   segs:   [from, to, label?, { dashed, ticks, arrows }?]   numeric labels ("7.5 cm") must equal the real length
 *   lines:  [[P, Q], dashed?]  infinite lines through two points
 *   angles: [at, from, to, label?, { arcs, right }?]          numeric degree labels and right marks are measured
 *   polys:  [[names], highlight?]
 *   pos:    compass overrides for labels; names: replacement labels
 * Equal tick counts must mean equal lengths; equal arrow counts must mean parallel segments (checked here).
 */
export function fig({ pts, segs = [], lines = [], angles = [], polys = [], pos = {}, names = {}, k = 0.62, margin = 0.95, unit = 'cm' }, alt, caption) {
  const W = pts;
  const P = (n) => { must(W[n], `unknown point ${n}`); return W[n]; };
  const all = Object.values(W);
  const x0 = Math.min(...all.map((p) => p[0])), y0 = Math.min(...all.map((p) => p[1]));
  const x1 = Math.max(...all.map((p) => p[0])), y1 = Math.max(...all.map((p) => p[1]));
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const vis = Object.entries(W).filter(([n]) => !n.startsWith('_')).map(([, p]) => p);
  const cx = vis.reduce((s, p) => s + p[0], 0) / vis.length, cy = vis.reduce((s, p) => s + p[1], 0) / vis.length;
  const points = {};
  for (const [n, p] of Object.entries(W)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false;
    else {
      if (names[n]) o.label = names[n];
      o.label_position = pos[n] ?? compass((Math.atan2(p[1] - cy, p[0] - cx) * 180) / Math.PI);
    }
    points[n] = o;
  }
  const width = r4((x1 - x0) * k + 2 * margin), height = r4((y1 - y0) * k + 2 * margin);
  let numeric = false;
  const ticks = {}, arrows = {};
  const segments = segs.map(([f, t, label, o = {}]) => {
    P(f); P(t);
    if (label !== undefined && /^\d+(\.\d+)?(\s*(mm|cm|m|km))?$/.test(label.trim())) {
      numeric = true;
      must(near(dist(W[f], W[t]), Number(label.trim().split(/\s/)[0]), 1e-6), `segment ${f}${t} is labelled ${label} but is ${dist(W[f], W[t])} long`);
    }
    if (o.ticks) (ticks[o.ticks] ??= []).push([f, t]);
    if (o.arrows) (arrows[o.arrows] ??= []).push([f, t]);
    return { from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}), ...(o.arrows ? { arrows: o.arrows } : {}) };
  });
  for (const [c, list] of Object.entries(ticks)) for (const [f, t] of list) must(near(dist(W[f], W[t]), dist(W[list[0][0]], W[list[0][1]]), 1e-6), `tick group ${c}: ${f}${t} differs from ${list[0].join('')}`);
  for (const [c, list] of Object.entries(arrows)) for (const [f, t] of list) must(parallel(W[f], W[t], W[list[0][0]], W[list[0][1]]), `arrow group ${c}: ${f}${t} is not parallel to ${list[0].join('')}`);
  const lns = lines.map(([[a, b], dashed]) => { P(a); P(b); return { through: [a, b], ...(dashed ? { dashed: true } : {}) }; });
  const arcGroups = {};
  const angs = angles.map(([at, f, t, label, o = {}]) => {
    const m = angDeg(P(at), P(f), P(t));
    if (o.arcs) (arcGroups[o.arcs] ??= []).push([m, `${f}${at}${t}`]);
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${f}${at}${t} labelled ${label} but measures ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${f}${at}${t} is not a right angle`);
    return { at, from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  for (const [c, list] of Object.entries(arcGroups)) for (const [m, nm] of list) must(near(m, list[0][0], 1e-6), `arc group ${c}: angle ${nm} (${m}) differs from ${list[0][1]} (${list[0][0]})`);
  const polygons = polys.map(([vertices, highlight]) => { vertices.forEach(P); return { vertices, ...(highlight ? { highlight } : {}) }; });
  const spec = { width, height, points, segments, lines: lns, angles: angs, polygons };
  if (numeric) spec.scale = { unit, per_unit: k };
  return geom(spec, alt, caption);
}

export const area = (...P) => Math.abs(P.reduce((s, p, i) => s + cross(p, P[(i + 1) % P.length]), 0)) / 2;

// ---------------------------------------------------------------- exact arithmetic on integer (or scaled-integer) data
/** Squared distance in units of 1/u, as an integer; throws if the true value is not an integer to within 1e-6 (so no rounding hides an error). */
export const E = (P, Q, u = 1) => { const s = ((P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2) * u * u; const n = Math.round(s); must(Math.abs(s - n) < 1e-6, `squared length ${s} is not an integer in units of 1/${u}`); return n; };
/** x (a real number given with at most log10(u) decimals) as an integer count of 1/u units. */
export const scaled = (x, u = 1) => { const n = Math.round(x * u); must(Math.abs(x * u - n) < 1e-9, `${x} is not a multiple of 1/${u}`); return n; };
/** Integer square root or null. */
export const isqrt = (n) => { const s = Math.round(Math.sqrt(n)); return s * s === n ? s : null; };
/** sqrt(n) = k sqrt(m) with m square-free; n a positive integer. tex is exact, val is the float. */
export function surd(n) {
  must(Number.isInteger(n) && n > 0, `surd needs a positive integer, got ${n}`);
  let k = 1, m = n;
  for (let p = 2; p * p <= m; p++) while (m % (p * p) === 0) { m /= p * p; k *= p; }
  must(k * k * m === n, 'surd split');
  return { n, k, m, exact: m === 1, val: Math.sqrt(n), tex: m === 1 ? `${k}` : k === 1 ? String.raw`\sqrt{${m}}` : String.raw`${k}\sqrt{${m}}` };
}
/** Length PQ (real units, scale u) as an exact surd in real units. */
export const len = (P, Q, u = 1) => { const s = surd(E(P, Q, u)); return { ...s, val: s.val / u }; };
/** Round v to dp places; refuses a value within 1e-4 (in units of the last place) of a rounding boundary, so a floating error can never flip the digit. */
export function rnd(v, dp) {
  const s = v * 10 ** dp;
  must(Math.abs(s - Math.floor(s) - 0.5) > 1e-4, `${v} is too close to a rounding boundary at ${dp} places`);
  return Math.round(s) / 10 ** dp;
}
export const sqrtTo = (n, dp) => rnd(Math.sqrt(n), dp);
/** The angle at B in triangle ABC is a right angle (dot product zero). */
export const rightAt = (A, B, C) => Math.abs(dot(sub(A, B), sub(C, B))) < 1e-9 * Math.max(1, dist(A, B) * dist(C, B));
export const f4 = (v) => Math.round(v * 1e4) / 1e4;
/** Real-number label for a length: a plain number when it is rational to 1e-9, else exact surd TeX. */
export const lab = (P, Q, unit = 'cm', u = 1) => { const l = len(P, Q, u); return l.exact ? `${+l.val.toFixed(6)} ${unit}` : `$${l.tex}$ ${unit}`; };

// ---------------------------------------------------------------- the theorem and its converse as checked computations
/** Pythagoras theorem on triangle ABC with the right angle at B (scale u): AB squared plus BC squared equals AC squared, as integers. */
export function pythag(A, B, C, u = 1) {
  must(rightAt(A, B, C), 'right angle at B');
  const ab2 = E(A, B, u), bc2 = E(B, C, u), ac2 = E(A, C, u);
  must(ab2 + bc2 === ac2, `AB squared plus BC squared equals AC squared (${ab2} + ${bc2} vs ${ac2})`);
  return { ab2, bc2, ac2, ab: len(A, B, u), bc: len(B, C, u), ac: len(A, C, u) };
}
const sqs = (xs, u) => xs.map((x) => scaled(x, u)).sort((p, q) => p - q);
/** 'right' | 'acute' | 'obtuse' for a triangle with sides x, y, z (real numbers with at most log10(u) decimals); exact integer test on the squares. */
export function classify(x, y, z, u = 1) {
  const [p, q, r] = sqs([x, y, z], u);
  must(p + q > r, `${x}, ${y}, ${z} do not form a triangle`);
  const s = p * p + q * q, t = r * r;
  return s === t ? 'right' : s > t ? 'acute' : 'obtuse';
}
/** Converse by construction: legs x and y at a right angle have hypotenuse exactly z, so the triangle with sides x, y, z is that right triangle (SSS). */
export function converseProof(x, y, z, u = 1) {
  must(classify(x, y, z, u) === 'right', 'the sides do not satisfy the converse');
  const B = [0, 0], C = [x, 0], A = [0, y];
  must(E(A, C, u) === scaled(z, u) ** 2 && rightAt(A, B, C), 'built right triangle has hypotenuse z');
  return { A, B, C };
}
/** Triangle with sides AB, BC, CA (B at the origin); asserted. */
export function triFromSides(ab, bc, ca) {
  const x = (ab * ab + bc * bc - ca * ca) / (2 * bc);
  const h2 = ab * ab - x * x;
  must(h2 > 1e-9, `no triangle with sides ${ab}, ${bc}, ${ca}`);
  const A = [x, Math.sqrt(h2)], B = [0, 0], C = [bc, 0];
  must(near(dist(A, B), ab, 1e-9) && near(dist(B, C), bc, 1e-9) && near(dist(C, A), ca, 1e-9), 'triangle sides');
  return { A, B, C };
}
/** The area proof: legs a (horizontal) and b (vertical). Square of side a + b, four congruent right triangles, tilted inner square of side c. */
export function areaProof(a, b) {
  must(a !== b, 'use unequal legs');
  const s = a + b;
  const Q = [[0, 0], [s, 0], [s, s], [0, s]]; // outer square
  const P = [[a, 0], [s, a], [b, s], [0, b]]; // one point on each side
  const tris = Q.map((q, i) => [q, P[i], P[(i + 3) % 4]]); // corner triangles
  for (const [q, p1, p2] of tris) {
    must(rightAt(p1, q, p2), 'corner triangle is right-angled at the corner of the big square');
    must([E(q, p1), E(q, p2)].sort((m, n) => m - n).join() === [a * a, b * b].sort((m, n) => m - n).join(), 'its legs are a and b');
  }
  const c2 = a * a + b * b;
  must(P.map((p, i) => E(p, P[(i + 1) % 4])).every((x) => x === c2), 'the four sides of the inner quadrilateral are equal (hypotenuses of congruent triangles)');
  must(P.every((p, i) => rightAt(P[(i + 3) % 4], p, P[(i + 1) % 4])), 'each angle of the inner quadrilateral is a right angle');
  const x = angDeg(P[0], Q[0], P[3]), y = angDeg(P[0], P[1], Q[1]);
  must(near(x + y, 90) && near(angDeg(P[0], P[3], P[1]), 180 - x - y), 'the straight angle at P0 is x + inner + y, with x + y = 90');
  const big = s * s, tri = (a * b) / 2;
  must(area(...Q) === big && area(...P) === c2 && big === 4 * tri + c2, 'area of the big square = four triangles + inner square');
  must(big === a * a + 2 * a * b + b * b && 4 * tri === 2 * a * b, '(a + b)^2 = a^2 + 2ab + b^2 and 4 (ab / 2) = 2ab, so c^2 = a^2 + b^2');
  return { Q, P, tris, c2, big, tri, x, y };
}
/** Isosceles triangle, equal sides `side`, base `base` (scale u): the altitude AM bisects the base, and h^2 = side^2 - (base / 2)^2 (exact, in 1/u^2 units times 4). */
export function iso(base, side, u = 1) {
  const four = 4 * scaled(side, u) ** 2 - scaled(base, u) ** 2; // 4 h^2 in 1/u^2 units
  must(four > 0, 'isosceles triangle exists');
  const h = Math.sqrt(four) / (2 * u);
  const B = [0, 0], C = [base, 0], A = [base / 2, h], M = [base / 2, 0];
  must(E(A, B, u) === scaled(side, u) ** 2 && E(A, C, u) === scaled(side, u) ** 2, 'AB = AC');
  must(rightAt(A, M, B) && rightAt(A, M, C) && near(dist(M, B), dist(M, C)), 'AM is perpendicular to BC and bisects it');
  must(4 * E(A, M, u) === four, '4 h^2 matches the coordinates');
  return { A, B, C, M, h, four, h2: four / (4 * u * u) };
}
/** Equilateral triangle of side s: h^2 = 3 s^2 / 4 (checked as 4 h^2 = 3 s^2 in integers). */
export function equi(s) {
  const B = [0, 0], C = [s, 0], A = [s / 2, (s * Math.sqrt(3)) / 2], M = [s / 2, 0];
  must(near(dist(A, B), s) && near(dist(A, C), s) && rightAt(A, M, B), 'equilateral, altitude perpendicular');
  must(Math.round(4 * dist(A, M) ** 2) === 3 * s * s && near(4 * dist(A, M) ** 2, 3 * s * s), '4 h^2 = 3 s^2');
  return { A, B, C, M, h2: (3 * s * s) / 4, h: Math.sqrt((3 * s * s) / 4) };
}
/** Quadrilateral ABCD with diagonals meeting at O at right angles: A (-p, 0), C (q, 0), B (0, -r), D (0, s). AB^2 + CD^2 = AD^2 + BC^2. */
export function perpQuad(p, q, r, s) {
  const A = [-p, 0], C = [q, 0], B = [0, -r], D = [0, s], O = [0, 0];
  must(rightAt(A, O, B) && rightAt(B, O, C) && rightAt(C, O, D) && rightAt(D, O, A), 'diagonals meet at right angles');
  const ab = E(A, B), bc = E(B, C), cd = E(C, D), da = E(D, A);
  must(ab === p * p + r * r && bc === q * q + r * r && cd === q * q + s * s && da === p * p + s * s, 'each side is the hypotenuse of a right triangle at O');
  must(ab + cd === da + bc && ab + cd === p * p + q * q + r * r + s * s, 'AB^2 + CD^2 = AD^2 + BC^2');
  return { A, B, C, D, O, ab, bc, cd, da, sum: ab + cd, area: ((p + q) * (r + s)) / 2 };
}
/** Rhombus with half-diagonals p (along x) and q (along y). */
export function rhombus(p, q) {
  const A = [-p, 0], B = [0, -q], C = [p, 0], D = [0, q], O = [0, 0];
  const side2 = E(A, B);
  must([E(B, C), E(C, D), E(D, A)].every((x) => x === side2) && side2 === p * p + q * q, 'four equal sides, each the hypotenuse of a right triangle with legs p and q');
  must(rightAt(A, O, B) && near(dist(O, A), dist(O, C)) && near(dist(O, B), dist(O, D)), 'diagonals bisect each other at right angles');
  return { A, B, C, D, O, side2, side: surd(side2), area: 2 * p * q };
}
/** Rectangle l by b with its diagonal. */
export function rectDiag(l, b) {
  const A = [0, 0], B = [l, 0], C = [l, b], D = [0, b];
  must(rightAt(A, B, C) && rightAt(B, C, D) && E(A, C) === l * l + b * b && E(B, D) === E(A, C), 'diagonals are equal and each is sqrt(l^2 + b^2)');
  return { A, B, C, D, d2: l * l + b * b, d: surd(l * l + b * b), area: l * b };
}
/** Ladder of length L (scale u): foot F at distance d from the wall base W, top T at height h up the wall. */
export function ladder(d, h, L, u = 1) {
  const W = [0, 0], F = [d, 0], T = [0, h];
  must(rightAt(F, W, T), 'wall is vertical, ground horizontal');
  must(E(F, W, u) + E(W, T, u) === E(F, T, u) && E(F, T, u) === scaled(L, u) ** 2, 'd^2 + h^2 = L^2');
  return { W, F, T };
}
/** Pythagorean triple from m > n: (m^2 - n^2, 2mn, m^2 + n^2). */
export const genTriple = (m, n) => { must(m > n && n > 0, 'm > n > 0'); const t = [m * m - n * n, 2 * m * n, m * m + n * n]; must(t[0] ** 2 + t[1] ** 2 === t[2] ** 2, 'generated triple'); return t; };
export const isTriple = (a, b, c) => a * a + b * b === c * c;
/** The second area proof: legs a < b, hypotenuse c (integer). Outer square of side c; four right triangles on its sides (legs a and b, right angle inside); the inner square has side b - a. Floats, asserted with near(). */
export function areaProofB(a, b) {
  must(a < b, 'a < b');
  const c = Math.sqrt(a * a + b * b);
  must(Number.isInteger(Math.round(c)) && near(c, Math.round(c)), 'hypotenuse is an integer here');
  const al = Math.acos(a / c);
  const V = [[0, 0]];
  const dirs = [];
  for (let i = 0; i < 4; i++) {
    const th = (i * Math.PI) / 2; // side directions 0, 90, 180, 270 degrees
    dirs.push([Math.cos(th), Math.sin(th)]);
  }
  for (let i = 0; i < 3; i++) V.push([V[i][0] + c * dirs[i][0], V[i][1] + c * dirs[i][1]]);
  const R = V.map((v, i) => { const u = dirs[i]; const q = [u[0] * Math.cos(al) - u[1] * Math.sin(al), u[0] * Math.sin(al) + u[1] * Math.cos(al)]; return [v[0] + a * q[0], v[1] + a * q[1]]; });
  for (let i = 0; i < 4; i++) {
    const V1 = V[(i + 1) % 4];
    must(rightAt(V[i], R[i], V1), 'right angle at the inner vertex');
    must(near(dist(V[i], R[i]), a, 1e-9) && near(dist(R[i], V1), b, 1e-9), 'legs a and b');
    must(near(dist(R[i], R[(i + 1) % 4]), b - a, 1e-9), 'inner side is b - a');
    must(rightAt(R[(i + 3) % 4], R[i], R[(i + 1) % 4]), 'inner angle is a right angle');
  }
  const big = c * c, tri = (a * b) / 2, inner = (b - a) ** 2;
  must(near(big, 4 * tri + inner) && near(big, a * a + b * b), 'c^2 = 4 (ab/2) + (b - a)^2 = a^2 + b^2');
  return { c: Math.round(c), c2: Math.round(big), tri, inner, side: b - a, V, R };
}
