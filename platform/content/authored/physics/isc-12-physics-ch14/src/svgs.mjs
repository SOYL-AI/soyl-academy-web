// ISC ch14 diagrams: the parts of a prism, the deviation geometry (normals meeting at N, r1 + r2 = A, δ = i + e − A),
// the symmetric path at minimum deviation, three rays through one prism (emerging, grazing emergence, total internal
// reflection at the second face), a thin prism, dispersion of white light, Newton's recombination with an inverted
// prism, a raindrop forming the primary rainbow, and the observer's view of the bow. Every ray is traced face by face
// with Snell's law in vector form (total internal reflection decided by the critical angle); the raindrop rays are
// traced through a circle with one internal reflection. The self-checks (SELF_CHECKS) confirm Snell's law at each face,
// r1 + r2 = A, δ = i + e − A from the traced directions, the symmetric path at minimum deviation, that violet is
// deviated more than red, and that every drawn point lies inside its drawing. The face-by-face tracer is adapted from
// the author's ISC ch13 code (copied, not imported).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const VIO = 'var(--diagram-blue)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit2 = (v) => {
  const L = Math.hypot(v[0], v[1]);
  return [v[0] / L, v[1] / L];
};
const angleBetween = (a, b) => deg(Math.acos(Math.max(-1, Math.min(1, dot(unit2(a), unit2(b))))));
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const add2 = (p, d, t) => [p[0] + t * d[0], p[1] + t * d[1]];
const neg = (v) => [-v[0], -v[1]];
/** Rotates v by a (radians); in screen coordinates (y down) a positive a turns clockwise. */
const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
const ang = (v) => Math.atan2(v[1], v[0]);

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
/** Every point inside the drawing (with a margin). */
const fits = (pts, W, H, m = 2) => pts.every(([x, y]) => x >= m && x <= W - m && y >= m && y <= H - m);

// ---------------------------------------------------------------- prism physics (degrees)
/** Ray through a prism of angle A and index n (relative to the surroundings) at incidence i: r1, r2, e, δ (null e if TIR at the second face). */
export function prismRay(A, n, i) {
  const r1 = deg(Math.asin(Math.sin(rad(i)) / n));
  const r2 = A - r1;
  const s = n * Math.sin(rad(r2));
  if (s > 1) return { r1, r2, e: null, d: null };
  const e = deg(Math.asin(s));
  return { r1, r2, e, d: i + e - A };
}
/** Minimum deviation of a prism: i = e, r = A/2. */
export function minDev(A, n) {
  const i = deg(Math.asin(n * Math.sin(rad(A / 2))));
  return { i, dm: 2 * i - A };
}
/** Refractive index from A and δm. */
export const nFromMin = (A, dm) => Math.sin(rad((A + dm) / 2)) / Math.sin(rad(A / 2));
/** Critical angle and the least angle of incidence for which light emerges (grazing emergence). */
export const critical = (n) => deg(Math.asin(1 / n));
export const iGrazing = (A, n) => deg(Math.asin(n * Math.sin(rad(A - critical(n)))));

/** Arc marking the angle between screen directions a1 and a2 (radians), radius rr, short way round. */
function angleArc(cx, cy, rr, a1, a2, o = {}) {
  const sweep = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) < Math.PI ? 1 : 0;
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, { w: 1, c: o.c ?? 'currentColor' });
}
/** The direction halfway between a1 and a2, the short way round. */
const midAng = (a1, a2) => {
  const d = ((((a2 - a1 + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
  return a1 + d / 2;
};
/** Arc plus a label placed on the bisector at radius rl. */
function arcLab(c, rr, a1, a2, text, { rl = rr + 10, col = 'currentColor', it = true, size = 11 } = {}) {
  const m = midAng(a1, a2);
  return angleArc(c[0], c[1], rr, a1, a2, { c: col }) + lab(c[0] + rl * Math.cos(m), c[1] + rl * Math.sin(m) + 4, text, { a: 'middle', c: col, it, size });
}
/** Ray polyline (screen points) with an arrowhead on each long segment. */
function rayPath(pts, { c = RAY, w = 1.7, heads = true } = {}) {
  let s = S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c, w, join: 'round' });
  if (heads) for (let k = 0; k + 1 < pts.length; k++) if (Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]) > 24) s += S.midHead(...pts[k], ...pts[k + 1], { c, size: 6 });
  return s;
}
/** Intersection of the lines p + t·d and q + s·e. */
function meet(p, d, q, e) {
  const den = d[0] * e[1] - d[1] * e[0];
  const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den;
  return add2(p, d, t);
}
function segHit(p, d, a, b) {
  const ex = b[0] - a[0];
  const ey = b[1] - a[1];
  const den = d[0] * ey - d[1] * ex;
  if (Math.abs(den) < 1e-12) return null;
  const wx = a[0] - p[0];
  const wy = a[1] - p[1];
  const t = (wx * ey - wy * ex) / den;
  const sp = (wx * d[1] - wy * d[0]) / den;
  if (sp < -1e-9 || sp > 1 + 1e-9) return null;
  return { t };
}
const reflect = (d, n) => {
  const k = 2 * dot(d, n);
  return [d[0] - k * n[0], d[1] - k * n[1]];
};
/**
 * Traces a ray from p0 along d0 into the polygon of index n (surroundings of index 1); returns the path, the events
 * at each face (incidence angle i, refraction angle r, kind in/out/TIR) and the final direction.
 */
export function trace(poly, n, p0, d0, tail = 50) {
  let p = p0;
  let d = unit2(d0);
  let inside = false;
  const pts = [p0];
  const ev = [];
  for (let step = 0; step < 10; step++) {
    let best = null;
    for (let e = 0; e < poly.length; e++) {
      const a = poly[e];
      const b = poly[(e + 1) % poly.length];
      const hit = segHit(p, d, a, b);
      if (hit && hit.t > 1e-6 && (!best || hit.t < best.t)) best = { ...hit, a, b, e };
    }
    if (!best) break;
    const q = [p[0] + best.t * d[0], p[1] + best.t * d[1]];
    pts.push(q);
    let nrm = unit2([-(best.b[1] - best.a[1]), best.b[0] - best.a[0]]);
    if (dot(nrm, d) > 0) nrm = [-nrm[0], -nrm[1]];
    const cosi = Math.min(1, -dot(nrm, d));
    const i = deg(Math.acos(cosi));
    const eta = inside ? n : 1 / n;
    const sinT = eta * Math.sqrt(Math.max(0, 1 - cosi * cosi));
    if (sinT > 1) {
      d = reflect(d, nrm);
      ev.push({ face: best.e, i, kind: 'TIR', at: q });
    } else {
      const cost = Math.sqrt(1 - sinT * sinT);
      d = unit2([eta * d[0] + (eta * cosi - cost) * nrm[0], eta * d[1] + (eta * cosi - cost) * nrm[1]]);
      ev.push({ face: best.e, i, r: deg(Math.asin(sinT)), kind: inside ? 'out' : 'in', at: q, nrm });
      inside = !inside;
      if (!inside) {
        pts.push([q[0] + tail * d[0], q[1] + tail * d[1]]);
        break;
      }
    }
    p = q;
  }
  return { pts, ev, d };
}
/** Prism with its refracting edge at `apex` pointing up (or down if flip), refracting angle A, faces of length `side`: [apex, right base vertex, left base vertex]. */
export function prismPoly(apex, side, A, flip = false) {
  const h = rad(A / 2);
  const s = flip ? -1 : 1;
  return [apex, [apex[0] + side * Math.sin(h), apex[1] + s * side * Math.cos(h)], [apex[0] - side * Math.sin(h), apex[1] + s * side * Math.cos(h)]];
}
/** Entry point a fraction t down the left face, and the incident direction at angle i to its normal (ray rising towards the face). */
function launch(poly, A, t, i, back) {
  const [apex, , L] = poly;
  const Q = [apex[0] + t * (L[0] - apex[0]), apex[1] + t * (L[1] - apex[1])];
  const nIn = [Math.cos(rad(A / 2)), Math.sin(rad(A / 2))];
  const dIn = rot(nIn, -rad(i));
  return { Q, nIn, dIn, p0: add2(Q, dIn, -back) };
}
const tri = (pts, o = {}) => S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z', { fill: FILL, w: 1.5, ...o });
/** Signed turn from direction a to direction b, degrees (positive = clockwise on screen, i.e. towards the base for an apex-up prism with light going right). */
const turn = (a, b) => deg(Math.atan2(a[0] * b[1] - a[1] * b[0], dot(a, b)));

// ================================================================ the parts of a prism
export const PARTS_DATA = { A: 60, n: 1.52, i: 40 };
export const PARTS = (() => {
  const { A, n, i } = PARTS_DATA;
  const W = 400;
  const H = 250;
  const poly = prismPoly([200, 34], 196, A);
  const [apex, R, L] = poly;
  const { dIn, p0 } = launch(poly, A, 0.46, i, 120);
  const t = trace(poly, n, p0, dIn, 120);
  let s = tri(poly);
  s += rayPath(t.pts);
  s += S.line(...t.pts[1], ...add2(t.pts[1], dIn, 150), { c: MUT, w: 1, dash: '4 3' });
  s += arcLab(apex, 26, ang([L[0] - apex[0], L[1] - apex[1]]), ang([R[0] - apex[0], R[1] - apex[1]]), 'A', { rl: 38, col: ACC });
  s += lab(apex[0] + 12, apex[1] - 10, 'refracting edge', { size: 10 }) + S.lead(apex[0] + 2, apex[1] - 2, apex[0] + 10, apex[1] - 8);
  s += lab((apex[0] + R[0]) / 2 + 14, (apex[1] + R[1]) / 2 - 18, 'refracting face', { size: 10 });
  s += lab((apex[0] + L[0]) / 2 - 14, (apex[1] + L[1]) / 2 - 18, 'refracting face', { size: 10, a: 'end' });
  s += lab(apex[0], R[1] + 16, 'base', { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, 'the triangle drawn is a principal section: a cut at right angles to the edge', { a: 'middle', size: 10 });
  const end = t.pts[t.pts.length - 1];
  s += lab(end[0] - 4, end[1] + 16, 'bent towards the base', { a: 'end', size: 10, c: RAY });
  const ev = t.ev;
  check(ev.length === 2 && ev[0].kind === 'in' && ev[1].kind === 'out' && Math.abs(ev[0].r + ev[1].i - A) < 1e-9 && turn(dIn, t.d) > 0, `parts: ray at ${i}° enters and leaves; r1 + r2 = ${(ev[0].r + ev[1].i).toFixed(3)}° = A; turned towards the base by ${turn(dIn, t.d).toFixed(2)}°`);
  check(fits([...poly, ...t.pts], W, H), 'parts: prism and ray inside the drawing');
  return svgDoc(W, H, 'Principal section of a glass prism: two refracting faces meet at the refracting edge at the refracting angle A, with the base opposite; a ray entering one face and leaving the other is bent towards the base at both faces', s);
})();

// ================================================================ deviation geometry (worked example 1: A = 60°, n = 1.52, i = 40°)
export const GEOM_DATA = { A: 60, n: 1.52, i: 40 };
export const GEOM = (() => {
  const { A, n, i } = GEOM_DATA;
  const W = 460;
  const H = 330;
  const poly = prismPoly([230, 24], 268, A);
  const [apex, R, L] = poly;
  const { Q, nIn, dIn, p0 } = launch(poly, A, 0.56, i, 100);
  const t = trace(poly, n, p0, dIn, 100);
  const X = t.pts[2]; // exit point
  const dQR = unit2([X[0] - Q[0], X[1] - Q[1]]);
  const nOutQ = neg(nIn);
  const nOutX = [Math.cos(rad(A / 2)), -Math.sin(rad(A / 2))];
  const N = meet(Q, nIn, X, neg(nOutX));
  const D = meet(Q, dIn, X, t.d);
  let s = tri(poly);
  // normals (outside dashed, inside to N), produced rays to D
  s += S.line(...add2(Q, nOutQ, 52), ...N, { c: MUT, w: 1, dash: '4 3' }) + S.line(...add2(X, nOutX, 52), ...N, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(...Q, ...add2(D, dIn, 26), { c: MUT, w: 1, dash: '2 3' }) + S.line(...X, ...D, { c: MUT, w: 1, dash: '2 3' });
  s += rayPath(t.pts);
  // angles
  s += arcLab(Q, 30, ang(neg(dIn)), ang(nOutQ), 'i', { rl: 40 });
  s += arcLab(Q, 40, ang(dQR), ang(nIn), 'r₁', { rl: 52 });
  s += arcLab(X, 40, ang(neg(dQR)), ang(neg(nOutX)), 'r₂', { rl: 52 });
  s += arcLab(X, 30, ang(t.d), ang(nOutX), 'e', { rl: 40 });
  s += arcLab(D, 22, ang(dIn), ang(t.d), 'δ', { rl: 32, col: ACC });
  s += arcLab(apex, 22, ang([L[0] - apex[0], L[1] - apex[1]]), ang([R[0] - apex[0], R[1] - apex[1]]), 'A', { rl: 34 });
  s += angleArc(N[0], N[1], 14, ang([Q[0] - N[0], Q[1] - N[1]]), ang([X[0] - N[0], X[1] - N[1]])) + lab(N[0], N[1] + 32, '∠QNR = 180° − A', { a: 'middle', size: 10 });
  for (const [p, nm, dx, dy] of [[Q, 'Q', -12, 4], [X, 'R', 10, 4], [N, 'N', 0, 18], [D, 'D', 0, -10]]) s += S.circle(...p, 2.4, { fill: 'currentColor', sw: 0 }) + lab(p[0] + dx, p[1] + dy, nm, { a: 'middle', w: 'bold' });
  s += lab(W / 2, H - 22, 'quadrilateral AQNR: ∠QNR = 180° − A, so r₁ + r₂ = A', { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, 'triangle QDR: δ = (i − r₁) + (e − r₂) = i + e − A', { a: 'middle', size: 10, w: 'bold' });
  const [e1, e2] = t.ev;
  const angN = angleBetween([Q[0] - N[0], Q[1] - N[1]], [X[0] - N[0], X[1] - N[1]]);
  const dev = angleBetween(dIn, t.d);
  check(Math.abs(Math.sin(rad(i)) - n * Math.sin(rad(e1.r))) < 1e-12 && Math.abs(n * Math.sin(rad(e2.i)) - Math.sin(rad(e2.r))) < 1e-12, `geometry: Snell's law at both faces (r1 = ${e1.r.toFixed(2)}°, r2 = ${e2.i.toFixed(2)}°, e = ${e2.r.toFixed(2)}°)`);
  check(Math.abs(angN - (180 - A)) < 1e-9 && Math.abs(e1.r + e2.i - A) < 1e-9, `geometry: the normals meet at N at ${angN.toFixed(3)}° = 180° − A, and r1 + r2 = A`);
  check(Math.abs(dev - (i + e2.r - A)) < 1e-9 && Math.abs(angleBetween(dIn, [X[0] - D[0], X[1] - D[1]]) - dev) < 1e-6, `geometry: deviation between the traced incident and emergent rays ${dev.toFixed(3)}° = i + e − A, marked at D`);
  check(Math.abs(e2.r - prismRay(A, n, i).e) < 1e-9, 'geometry: traced emergence angle equals the formula value used in worked example 1');
  check(fits([...poly, ...t.pts, N, D], W, H), 'geometry: prism, rays, N and D inside the drawing');
  return svgDoc(W, H, 'Ray through a 60 degree glass prism of refractive index 1.52 entering at Q at 40 degrees and leaving at R at about 60.6 degrees; the normals at Q and R meet at N, making 180 degrees minus A, so r one plus r two equals A; the incident ray produced and the emergent ray produced backwards meet at D, where the deviation is i plus e minus A, about 40.6 degrees', s);
})();

// ================================================================ minimum deviation (worked example 3: A = 60°, δm = 50°)
export const MIN_DATA = { A: 60, dm: 50 };
MIN_DATA.n = nFromMin(MIN_DATA.A, MIN_DATA.dm);
export const MINDEV = (() => {
  const { A, n } = MIN_DATA;
  const { i, dm } = minDev(A, n);
  const W = 420;
  const H = 290;
  const poly = prismPoly([210, 26], 220, A);
  const [apex, R, L] = poly;
  const { Q, nIn, dIn, p0 } = launch(poly, A, 0.5, i, 120);
  const t = trace(poly, n, p0, dIn, 120);
  const X = t.pts[2];
  const nOutX = [Math.cos(rad(A / 2)), -Math.sin(rad(A / 2))];
  const D = meet(Q, dIn, X, t.d);
  let s = tri(poly);
  s += S.line(...add2(Q, nIn, -48), ...add2(Q, nIn, 40), { c: MUT, w: 1, dash: '4 3' }) + S.line(...add2(X, nOutX, 48), ...add2(X, nOutX, -40), { c: MUT, w: 1, dash: '4 3' });
  s += S.line(...Q, ...add2(D, dIn, 30), { c: MUT, w: 1, dash: '2 3' }) + S.line(...X, ...D, { c: MUT, w: 1, dash: '2 3' });
  s += rayPath(t.pts);
  s += arcLab(Q, 30, ang(neg(dIn)), ang(neg(nIn)), 'i', { rl: 40 });
  s += arcLab(X, 30, ang(t.d), ang(nOutX), 'e = i', { rl: 46 });
  s += arcLab(Q, 34, 0, ang(nIn), 'r₁', { rl: 46 }) + arcLab(X, 34, Math.PI, ang(neg(nOutX)), 'r₂', { rl: 46 });
  s += arcLab(D, 20, ang(dIn), ang(t.d), 'δm', { rl: 34, col: ACC });
  s += arcLab(apex, 22, ang([L[0] - apex[0], L[1] - apex[1]]), ang([R[0] - apex[0], R[1] - apex[1]]), 'A', { rl: 34 });
  s += lab(W / 2, H - 36, 'inside ray parallel to the base: r₁ = r₂ = A/2, i = e', { a: 'middle', size: 10 });
  s += lab(W / 2, H - 22, `A = ${A}°, δm = ${dm.toFixed(0)}°: i = (A + δm)/2 = ${i.toFixed(0)}°`, { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, `n = sin 55° / sin 30° = ${n.toFixed(3)}`, { a: 'middle', size: 10, w: 'bold' });
  const [e1, e2] = t.ev;
  check(Math.abs(X[1] - Q[1]) < 1e-9 && Math.abs(e1.r - A / 2) < 1e-9 && Math.abs(e2.i - A / 2) < 1e-9, `minimum deviation: traced inside ray horizontal (parallel to the base), r1 = r2 = ${e1.r.toFixed(3)}° = A/2`);
  check(Math.abs(e2.r - i) < 1e-9 && Math.abs(angleBetween(dIn, t.d) - MIN_DATA.dm) < 1e-9, `minimum deviation: e = i = ${i.toFixed(3)}° and the traced deviation is ${angleBetween(dIn, t.d).toFixed(3)}° = δm`);
  // the traced deviation is the least: neighbouring incidences deviate more
  const dPlus = prismRay(A, n, i + 2).d;
  const dMinus = prismRay(A, n, i - 2).d;
  check(dPlus > dm && dMinus > dm && Math.abs(nFromMin(A, dm) - n) < 1e-12, `minimum deviation: i ± 2° give ${dMinus.toFixed(3)}° and ${dPlus.toFixed(3)}°, both larger than δm; n = sin((A + δm)/2)/sin(A/2)`);
  check(fits([...poly, ...t.pts, D], W, H), 'minimum deviation: prism, rays and D inside the drawing');
  return svgDoc(W, H, 'Ray through an equilateral prism at minimum deviation: it enters and leaves at 55 degrees, travels inside parallel to the base making 30 degrees, half the prism angle, with each normal, and is deviated by 50 degrees; the refractive index is sine 55 degrees over sine 30 degrees, about 1.64', s);
})();

// ================================================================ three rays through one prism (A = 60°, n = 1.52)
export const LIMITS_DATA = { A: 60, n: 1.52, rays: [50, null, 20] };
export const LIMITS = (() => {
  const { A, n } = LIMITS_DATA;
  const C = critical(n);
  const ig = iGrazing(A, n);
  const W = 480;
  const H = 250;
  const incid = [50, ig + 1e-4, 20];
  const titles = [`(a) i = 50°: emerges`, `(b) i = ${ig.toFixed(1)}°: grazes out`, '(c) i = 20°: no emergence'];
  const notes = [`e = ${prismRay(A, n, 50).e.toFixed(1)}°`, `r₂ = C = ${C.toFixed(1)}°`, `r₂ = ${prismRay(A, n, 20).r2.toFixed(1)}° > C: TIR`];
  let s = '';
  const all = [];
  const traces = incid.map((i, k) => {
    const cx = 80 + k * 160;
    const poly = prismPoly([cx, 40], 128, A);
    const { dIn, p0 } = launch(poly, A, 0.45, i, 50);
    const t = trace(poly, n, p0, dIn, [40, 50, 16][k]);
    s += tri(poly) + rayPath(t.pts);
    const ex = t.ev.find((e) => e.kind === 'out' || e.kind === 'TIR');
    if (ex) {
      const nrm = poly[1][0] > poly[0][0] ? [Math.cos(rad(A / 2)), -Math.sin(rad(A / 2))] : null;
      if (ex.face === 0 && nrm) s += S.line(...add2(ex.at, nrm, 26), ...add2(ex.at, nrm, -26), { c: MUT, w: 1, dash: '3 3' });
    }
    s += lab(cx, 186, titles[k], { a: 'middle', size: 10, w: 'bold' }) + lab(cx, 200, notes[k], { a: 'middle', size: 10 });
    all.push(...poly, ...t.pts);
    return t;
  });
  s += lab(W / 2, 20, `glass n = ${n}, A = ${A}°: critical angle C = ${C.toFixed(1)}°`, { a: 'middle', size: 11, w: 'bold' });
  s += lab(W / 2, 228, `light leaves the second face only if r₂ ≤ C, i.e. i ≥ ${ig.toFixed(1)}°`, { a: 'middle', size: 10 });
  s += lab(W / 2, 242, `no ray can emerge from a prism with A > 2C = ${(2 * C).toFixed(1)}°`, { a: 'middle', size: 10 });
  const kinds = (t) => t.ev.map((e) => e.kind).join(' ');
  const [ta, tb, tc] = traces;
  check(kinds(ta) === 'in out' && Math.abs(ta.ev[1].r - prismRay(A, n, 50).e) < 1e-9, `limits (a): i = 50° ${kinds(ta)}, e = ${ta.ev[1].r.toFixed(2)}°`);
  check(kinds(tb).startsWith('in out') && tb.ev[1].r > 88.5 && Math.abs(tb.ev[1].i - C) < 0.01, `limits (b): at i = ${ig.toFixed(2)}° the ray meets the second face at ${tb.ev[1].i.toFixed(3)}° ≈ C and leaves at ${tb.ev[1].r.toFixed(1)}° (grazing)`);
  check(tc.ev[1].kind === 'TIR' && Math.abs(tc.ev[1].i - prismRay(A, n, 20).r2) < 1e-9 && tc.ev[1].i > C, `limits (c): i = 20° meets the second face at ${tc.ev[1].i.toFixed(2)}° > C and is totally reflected (${kinds(tc)})`);
  check(Math.abs(n * Math.sin(rad(A - C)) - Math.sin(rad(ig))) < 1e-12 && 2 * C < 90 && A < 2 * C, `limits: sin i(grazing) = n sin(A − C); A = ${A}° < 2C = ${(2 * C).toFixed(1)}°`);
  check(fits(all, W, H), 'limits: three prisms and their rays inside the drawing');
  return svgDoc(W, H, 'Three rays through the same 60 degree glass prism of refractive index 1.52: at 50 degrees the ray emerges from the second face; at about 29.4 degrees it meets the second face at the critical angle of about 41.1 degrees and just grazes out along it; at 20 degrees it meets the second face beyond the critical angle and is totally reflected, so nothing emerges from that face', s);
})();

// ================================================================ thin prism (A = 8.0°, n = 1.523)
export const THIN_DATA = { A: 8, n: 1.523, rays: [0, 5, 10] };
export const THIN = (() => {
  const { A, n, rays } = THIN_DATA;
  const W = 420;
  const H = 250;
  const poly = prismPoly([140, 24], 196, A);
  const approx = (n - 1) * A;
  let s = tri(poly);
  const all = [...poly];
  const devs = [];
  rays.forEach((i, k) => {
    const { dIn, p0 } = launch(poly, A, 0.3 + 0.27 * k, i, 100);
    const t = trace(poly, n, p0, dIn, 160);
    const Q = t.pts[1];
    s += S.line(...Q, ...add2(Q, dIn, 165), { c: MUT, w: 1, dash: '4 3' });
    s += rayPath(t.pts, { c: [RAY, GRN, VIO][k] });
    const end = t.pts[t.pts.length - 1];
    const dv = angleBetween(dIn, t.d);
    devs.push(dv);
    s += lab(end[0] + 4, end[1] + 4, `i = ${i}°: δ = ${dv.toFixed(2)}°`, { size: 10, c: [RAY, GRN, VIO][k] });
    all.push(...t.pts, add2(Q, dIn, 165));
  });
  s += lab(poly[0][0] - 8, poly[0][1] + 8, `A = ${A}°`, { a: 'end', size: 10, w: 'bold' });
  s += lab(W / 2 + 40, H - 22, `(n − 1)A = ${(n - 1).toFixed(3)} × ${A}° = ${approx.toFixed(2)}°`, { a: 'middle', size: 10, w: 'bold' });
  s += lab(W / 2 + 40, H - 8, 'dashed: undeviated paths; δ hardly depends on i', { a: 'middle', size: 10 });
  check(devs.every((d) => Math.abs(d - approx) / approx < 0.02), `thin prism: traced deviations ${devs.map((d) => d.toFixed(3)).join(', ')}° all within 2% of (n − 1)A = ${approx.toFixed(3)}°`);
  check(fits(all, W - 104, H), 'thin prism: prism and rays inside the drawing (room left for the labels)');
  return svgDoc(W, H, 'A thin glass prism of angle 8 degrees and refractive index 1.523 with three rays meeting its first face at 0, 5 and 10 degrees: each is turned towards the base by about 4.2 degrees, very close to n minus 1 times A, so the deviation hardly depends on the angle of incidence', s);
})();

// ================================================================ dispersion by a 60° prism (dense flint: red 1.62, yellow 1.64, violet 1.66; i = 50°)
export const DISP_DATA = { A: 60, i: 50, colours: [['red', 1.62], ['yellow', 1.64], ['violet', 1.66]] };
export const DISP = (() => {
  const { A, i, colours } = DISP_DATA;
  const W = 460;
  const H = 260;
  const poly = prismPoly([160, 30], 190, A);
  const cols = { red: RAY, yellow: YEL, violet: VIO };
  let s = tri(poly);
  const all = [...poly];
  const out = colours.map(([nm, n]) => {
    const { dIn, p0 } = launch(poly, A, 0.45, i, 120);
    const t = trace(poly, n, p0, dIn, 170);
    return { nm, n, t, dIn, dev: angleBetween(dIn, t.d) };
  });
  s += rayPath(out[0].t.pts.slice(0, 2), { c: 'currentColor', w: 2.2 }) + lab(out[0].t.pts[0][0], out[0].t.pts[0][1] + 16, 'white light', { size: 10 });
  for (const o of [...out].reverse()) {
    s += rayPath(o.t.pts.slice(1), { c: cols[o.nm], w: 1.6 });
    const end = o.t.pts[o.t.pts.length - 1];
    const row = { red: 0, yellow: 1, violet: 2 }[o.nm];
    s += lab(W - 10, 60 + 15 * row, `${o.nm}: δ = ${o.dev.toFixed(1)}°`, { size: 10, a: 'end', c: cols[o.nm], w: 'bold' });
    s += lab(end[0] + 4, end[1] + [-2, 6, 14][row], o.nm, { size: 10, c: cols[o.nm] });
    all.push(...o.t.pts);
  }
  const spread = out[2].dev - out[0].dev;
  s += lab(W / 2, H - 22, `n(red) = 1.62, n(violet) = 1.66, i = ${i}°: violet deviated ${spread.toFixed(1)}° more`, { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, 'a larger refractive index means a larger deviation', { a: 'middle', size: 10, w: 'bold' });
  check(out.every((o) => Math.abs(o.dev - prismRay(A, o.n, i).d) < 1e-9) && out[0].dev < out[1].dev && out[1].dev < out[2].dev, `dispersion: traced deviations red ${out[0].dev.toFixed(2)}°, yellow ${out[1].dev.toFixed(2)}°, violet ${out[2].dev.toFixed(2)}° match i + e − A and increase with n`);
  check(fits(all, W, H), 'dispersion: prism and coloured rays inside the drawing');
  return svgDoc(W, H, 'White light enters a 60 degree flint glass prism at 50 degrees and splits into colours: red, with the smallest refractive index, is deviated least, about 48.6 degrees, yellow more, and violet most, about 53.2 degrees, so the colours fan out into a spectrum', s);
})();

// ================================================================ Newton: a second, inverted prism recombines the colours
export const NEWTON = (() => {
  const A = 60;
  const i = 50;
  const W = 460;
  const H = 230;
  const P1 = prismPoly([150, 36], 150, A);
  // second prism: refracting edge down, its left face parallel to the first prism's right face
  const P2 = prismPoly([262, 166], 150, A, true);
  let s = tri(P1) + tri(P2);
  const all = [...P1, ...P2];
  const res = [['red', 1.62, RAY], ['violet', 1.66, VIO]].map(([nm, n, c]) => {
    const { dIn, p0 } = launch(P1, A, 0.5, i, 100);
    const t1 = trace(P1, n, p0, dIn, 1);
    const exit1 = t1.pts[2];
    const t2 = trace(P2, n, exit1, t1.d, 110);
    s += rayPath([...t1.pts.slice(1, 3), ...t2.pts.slice(1)], { c, w: 1.5 });
    all.push(...t1.pts.slice(0, 3), ...t2.pts);
    return { nm, t1, t2, dIn, p0 };
  });
  s += rayPath([res[0].p0, res[0].t1.pts[1]], { c: 'currentColor', w: 2.2 }) + lab(res[0].p0[0], res[0].p0[1] + 16, 'white light', { size: 10 });
  const endR = res[0].t2.pts[res[0].t2.pts.length - 1];
  s += lab(endR[0] - 4, endR[1] - 10, 'colours parallel again', { a: 'end', size: 10, w: 'bold' });
  s += lab(W / 2, H - 22, 'the second prism, inverted, undoes the deviation of every colour', { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, 'red and violet leave parallel to the original beam (and to each other)', { a: 'middle', size: 10 });
  const dIn = res[0].dIn;
  check(res.every((r) => r.t1.ev.map((e) => e.kind).join(' ') === 'in out' && r.t2.ev.map((e) => e.kind).join(' ') === 'in out' && angleBetween(r.t2.d, dIn) < 1e-9), 'Newton: red and violet pass through both prisms and leave parallel to the incident white beam');
  check(angleBetween(res[0].t1.d, res[1].t1.d) > 1, `Newton: between the prisms red and violet are ${angleBetween(res[0].t1.d, res[1].t1.d).toFixed(2)}° apart`);
  check(fits(all, W, H), 'Newton: prisms and rays inside the drawing');
  return svgDoc(W, H, 'Newton’s experiment: white light dispersed by a glass prism falls on a second, identical prism turned upside down; the second prism bends every colour back by the same amount, so red and violet leave parallel to the original beam and recombine into white light', s);
})();

// ================================================================ raindrop: primary rainbow (one internal reflection)
export const WATER = { red: 1.331, violet: 1.343, mid: 1.337 };
/** Path of a horizontal ray (travelling right) entering a drop (centre c, radius R) at height b above the centre: entry, back reflection, exit, final direction; and the angle φ between the exit ray and the antisolar direction. */
export function dropRay(c, R, b, n, tail = 80) {
  const d0 = [1, 0];
  const P1 = [c[0] - Math.sqrt(R * R - b * b), c[1] - b];
  const n1 = unit2([P1[0] - c[0], P1[1] - c[1]]); // outward
  const cos1 = -dot(n1, d0);
  const sin2 = Math.sqrt(1 - cos1 * cos1) / n;
  const cos2 = Math.sqrt(1 - sin2 * sin2);
  const d1 = unit2([d0[0] / n + (cos1 / n - cos2) * n1[0], d0[1] / n + (cos1 / n - cos2) * n1[1]]);
  // chord to the back of the drop
  const chord = (P, d) => {
    const w = [P[0] - c[0], P[1] - c[1]];
    const t = -2 * dot(w, d);
    return add2(P, d, t);
  };
  const P2 = chord(P1, d1);
  const n2 = unit2([P2[0] - c[0], P2[1] - c[1]]);
  const d2 = reflect(d1, n2);
  const P3 = chord(P2, d2);
  const n3 = unit2([P3[0] - c[0], P3[1] - c[1]]);
  const cosi3 = dot(n3, d2);
  const sint = n * Math.sqrt(1 - cosi3 * cosi3);
  const cost = Math.sqrt(1 - sint * sint);
  const d3 = unit2([n * d2[0] + (cost - n * cosi3) * n3[0], n * d2[1] + (cost - n * cosi3) * n3[1]]);
  const phi = angleBetween(d3, [-1, 0]);
  const i = deg(Math.asin(b / R));
  return { P1, P2, P3, d1, d2, d3, end: add2(P3, d3, tail), phi, i, r: deg(Math.asin(sin2)), n1, n2, n3, cos2, sint };
}
/** The rainbow angle: the largest φ over all heights b (the rays bunch there). */
export function rainbowAngle(n) {
  let best = 0;
  let bBest = 0;
  for (let k = 1; k < 20000; k++) {
    const b = k / 20000;
    const i = Math.asin(b);
    const rr = Math.asin(b / n);
    const phi = deg(4 * rr - 2 * i);
    if (phi > best) {
      best = phi;
      bBest = b;
    }
  }
  return { phi: best, b: bBest };
}
/** Secondary bow (two internal reflections): the smallest angle 180° + 2i − 6r from the antisolar direction. */
export function secondaryAngle(n) {
  let best = 1e9;
  for (let k = 1; k < 20000; k++) {
    const b = k / 20000;
    const phi = 180 + deg(2 * Math.asin(b) - 6 * Math.asin(b / n));
    if (phi < best) best = phi;
  }
  return best;
}
export const BOW = { red: rainbowAngle(WATER.red), violet: rainbowAngle(WATER.violet), red2: secondaryAngle(WATER.red), violet2: secondaryAngle(WATER.violet) };
export const DROP = (() => {
  const W = 420;
  const H = 320;
  const c = [250, 112];
  const R = 92;
  const b = rainbowAngle(WATER.mid).b * R;
  let s = S.circle(...c, R, { fill: VIO, fop: 0.08, sw: 1.5 });
  const red = dropRay(c, R, b, WATER.red, 125);
  const vio = dropRay(c, R, b, WATER.violet, 125);
  s += rayPath([[16, red.P1[1]], red.P1], { c: 'currentColor', w: 2.2 }) + lab(18, red.P1[1] - 8, 'sunlight', { size: 10 });
  for (const [ray, col] of [[vio, VIO], [red, RAY]]) s += rayPath([ray.P1, ray.P2, ray.P3, ray.end], { c: col, w: 1.5 });
  // normals at entry, back and exit (red path)
  for (const [P, nr] of [[red.P1, red.n1], [red.P2, red.n2], [red.P3, red.n3]]) s += S.line(...add2(P, nr, 26), ...add2(P, nr, -30), { c: MUT, w: 1, dash: '3 3' });
  // reference: the antisolar direction through the exit point
  s += S.line(...red.P3, ...add2(red.P3, [-1, 0], 170), { c: MUT, w: 1, dash: '5 4' }) + lab(red.P3[0] - 170, red.P3[1] - 6, 'antisolar direction', { size: 10, c: MUT });
  s += arcLab(red.P3, 70, Math.PI, ang(red.d3), `${red.phi.toFixed(1)}°`, { rl: 84, col: RAY, it: false, size: 10 });
  s += arcLab(red.P3, 100, Math.PI, ang(vio.d3), `${vio.phi.toFixed(1)}°`, { rl: 116, col: VIO, it: false, size: 10 });
  s += lab(red.end[0] + 8, red.end[1] + 2, 'red', { size: 10, c: RAY }) + lab(vio.end[0] - 8, vio.end[1] + 2, 'violet', { a: 'end', size: 10, c: VIO });
  s += lab(red.P2[0] - 10, red.P2[1] + 20, 'internal reflection', { a: 'end', size: 10 });
  s += lab(c[0] + 30, c[1] - R - 8, 'refraction and dispersion', { size: 10 });
  s += lab(W / 2, H - 8, 'rays bunch at about 42° (red) and 40° (violet) from the antisolar direction', { a: 'middle', size: 10, w: 'bold' });
  // checks: Snell at entry and exit; reflection at the back; the drawn angles are the bunching (largest) angles to 0.1°
  const snellIn = Math.abs(Math.sin(rad(red.i)) - WATER.red * Math.sin(rad(red.r))) < 1e-12;
  const reflOK = Math.abs(dot(red.d1, red.n2) - dot(red.d2, red.n2) * -1) < 1e-12;
  const snellOut = Math.abs(red.sint - Math.sin(rad(red.i))) < 1e-9;
  check(snellIn && reflOK && snellOut, `raindrop: Snell's law at entry (i = ${red.i.toFixed(2)}°, r = ${red.r.toFixed(2)}°), equal angles at the back, and the ray leaves at i again`);
  check(Math.abs(red.phi - BOW.red.phi) < 0.1 && Math.abs(vio.phi - BOW.violet.phi) < 0.1 && red.phi > vio.phi, `raindrop: drawn red ${red.phi.toFixed(2)}° and violet ${vio.phi.toFixed(2)}° within 0.1° of the bunching angles ${BOW.red.phi.toFixed(2)}° and ${BOW.violet.phi.toFixed(2)}°; red larger`);
  check(Math.abs(red.phi - (4 * red.r - 2 * red.i)) < 1e-9, 'raindrop: traced exit angle equals 4r − 2i for one internal reflection');
  check(fits([red.P1, red.P2, red.P3, red.end, vio.end, [16, red.P1[1]], add2(red.P3, [-1, 0], 170)], W, H), 'raindrop: drop and rays inside the drawing');
  return svgDoc(W, H, 'Sunlight enters the upper part of a spherical raindrop, refracts and splits into colours, reflects once from the back of the drop and refracts out of the lower part; red leaves at about 42 degrees and violet at about 40 degrees to the direction pointing away from the sun', s);
})();

// ================================================================ the observer's view: red from higher drops, violet from lower
export const SKY_DATA = { sun: 15 };
export const SKY = (() => {
  const W = 440;
  const H = 290;
  const sun = SKY_DATA.sun;
  const ground = 236;
  const eye = [96, 206];
  const anti = [Math.cos(rad(sun)), Math.sin(rad(sun))]; // pointing away from the sun, below the horizon
  const toR = rot(anti, -rad(BOW.red.phi));
  const toV = rot(anti, -rad(BOW.violet.phi));
  const dR = add2(eye, toR, 272);
  const dV = add2(eye, toV, 222);
  let s = S.line(0, ground, W, ground, { c: MUT, w: 1.5 }) + lab(W - 8, ground + 16, 'ground', { a: 'end', size: 10, c: MUT });
  // observer
  s += S.circle(eye[0], eye[1] - 6, 6, { sw: 1.4 }) + S.line(eye[0], eye[1], eye[0], ground - 12, { w: 1.6 }) + S.line(eye[0], ground - 12, eye[0] - 7, ground, { w: 1.6 }) + S.line(eye[0], ground - 12, eye[0] + 7, ground, { w: 1.6 });
  s += lab(eye[0] - 10, ground + 16, 'observer', { size: 10 });
  // sunlight from behind (upper left), parallel rays
  for (const y0 of [40, 110]) s += S.arrow(6, y0, 6 + 70 * anti[0], y0 + 70 * anti[1], { c: YEL, w: 2 });
  s += lab(8, 28, `sunlight, ${sun}° above the horizon`, { size: 10 });
  for (const [P, col] of [[dR, RAY], [dV, VIO]]) {
    s += S.arrow(P[0] - 64 * anti[0], P[1] - 64 * anti[1], P[0] - 8 * anti[0], P[1] - 8 * anti[1], { c: YEL, w: 1.4, size: 6 });
    s += S.circle(...P, 7, { fill: VIO, fop: 0.15, sw: 1.2 });
    s += S.line(...P, ...eye, { c: col, w: 1.6 }) + S.midHead(...P, ...eye, { c: col, size: 6 });
  }
  s += lab(dR[0] + 12, dR[1] - 2, 'drop sending red', { size: 10, c: RAY }) + lab(dV[0] + 12, dV[1] + 10, 'drop sending violet', { size: 10, c: VIO });
  s += S.line(...eye, ...add2(eye, anti, 200), { c: MUT, w: 1, dash: '5 4' }) + lab(eye[0] + 204 * anti[0] + 4, eye[1] + 204 * anti[1] + 4, 'antisolar direction', { size: 10, c: MUT });
  s += arcLab(eye, 132, ang(anti), ang(toR), `${BOW.red.phi.toFixed(1)}°`, { rl: 146, col: RAY, it: false, size: 10 });
  s += arcLab(eye, 92, ang(anti), ang(toV), `${BOW.violet.phi.toFixed(1)}°`, { rl: 106, col: VIO, it: false, size: 10 });
  s += lab(W / 2, H - 6, 'red appears on the outside of the primary bow, violet on the inside', { a: 'middle', size: 10, w: 'bold' });
  const eR = -deg(ang(toR));
  check(Math.abs(angleBetween(anti, toR) - BOW.red.phi) < 1e-9 && Math.abs(angleBetween(anti, toV) - BOW.violet.phi) < 1e-9 && dR[1] < dV[1], `sky: red drop at ${BOW.red.phi.toFixed(2)}° and violet drop at ${BOW.violet.phi.toFixed(2)}° from the antisolar direction; red drop higher (elevation ${eR.toFixed(1)}° = ${BOW.red.phi.toFixed(1)}° − ${sun}°)`);
  check(Math.abs(eR - (BOW.red.phi - sun)) < 1e-9 && BOW.red.phi < 45, 'sky: elevation of the top of the bow = rainbow angle − sun elevation; no bow above the horizon once the sun is higher than about 42°');
  check(fits([dR, dV, eye, add2(eye, anti, 200), [6, 40], [6, 110]], W, H),'sky: drops, rays and observer inside the drawing');
  return svgDoc(W, H, 'An observer with the sun low behind them: sunlight enters raindrops ahead; drops on a line about 42 degrees from the antisolar direction send red light to the eye, and slightly lower drops at about 40 degrees send violet, so the bow is red on the outside and violet on the inside', s);
})();

export const ALL = { PARTS, GEOM, MINDEV, LIMITS, THIN, DISP, NEWTON, DROP, SKY };
