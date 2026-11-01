// ISC ch17 diagrams: the three kinds of wavefront; Huygens' construction of a new wavefront (spherical and plane); Huygens'
// proofs of the laws of reflection and refraction (rarer to denser, drawn for worked example 1, and denser to rarer, where
// the wavelet can outgrow AC); superposition of two waves in phase and in antiphase; the geometry of Young's double slit
// (path difference S₂N = d sin θ); the computed fringe strips of the double-slit and single-slit worked examples; the
// single-slit path-difference picture (halves cancelling in pairs); and the angular and linear width of the central maximum.
// Every construction is computed (wavelets of radius vt, exact tangents, intensities from the stated formulas), and the
// self-checks (SELF_CHECKS) confirm the geometric claims: tangency of the envelopes, i = r, sin i / sin r = v₁/v₂, the drawn
// resultant equal to the sum of the two waves, S₂N = d sin θ, fringe and minimum positions on the strips.
// The wavefront, Huygens reflection/refraction and single-slit figures are adapted from the author's CBSE 12 Physics ch10
// code (copied, not imported) with new angles, speeds and labels.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const WF = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ================================================================ physics
export const C_LIGHT = 3e8;
/** Resultant intensity of two coherent beams of intensities I1, I2 with phase difference phi (stated result, ISC). */
export const twoBeam = (I1, I2, phi) => I1 + I2 + 2 * Math.sqrt(I1 * I2) * Math.cos(phi);
/** (sin b / b)², the single-slit intensity factor. */
export const sinc2 = (b) => (Math.abs(b) < 1e-12 ? 1 : (Math.sin(b) / b) ** 2);
/** Relative single-slit intensity at angle with sine sinT for slit width a, wavelength lam. */
export const singleSlit = (a, lam, sinT) => sinc2((Math.PI * a * sinT) / lam);
/** Relative double-slit intensity (narrow, equal slits) at angle with sine sinT. */
export const doubleSlit = (d, lam, sinT) => Math.cos((Math.PI * d * sinT) / lam) ** 2;
/** Fringe width λD/(n d) in a medium of index n. */
export const fringeWidth = (lam, D, d, n = 1) => (lam * D) / (n * d);
/** Snell's law from Huygens' construction: sin r = (v2/v1) sin i; returns r in degrees (NaN when no refracted wave). */
export const refrAngle = (iDeg, v1, v2) => deg(Math.asin((v2 / v1) * Math.sin(rad(iDeg))));

// ================================================================ drawing helpers
function angleArc(cx, cy, rr, a1, a2, o = {}) {
  const sweep = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) < Math.PI ? 1 : 0;
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, { w: 1, c: o.c ?? 'currentColor' });
}
/** Circular arc about (cx, cy) from screen angle a1 to a2 (radians, increasing), as a path string. */
const arcD = (cx, cy, rr, a1, a2) => {
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return `M${f1(p1[0])} ${f1(p1[1])} A${f1(rr)} ${f1(rr)} 0 ${a2 - a1 > Math.PI ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])}`;
};
const poly = (pts) => 'M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');
const dot2 = (a, b) => a[0] * b[0] + a[1] * b[1];

// ================================================================ t01 the three kinds of wavefront
export const WAVEFRONTS = (() => {
  const W = 440;
  const H = 212;
  let s = '';
  let worst = 0;
  // point source: spherical
  const P = [74, 96];
  s += S.circle(P[0], P[1], 3.5, { fill: 'currentColor', sw: 0 });
  for (const rr of [18, 36, 54]) s += S.circle(P[0], P[1], rr, { c: WF, sw: 1.5 });
  for (let k = 0; k < 8; k++) {
    const a = ((k + 0.5) * Math.PI) / 4;
    const u = [Math.cos(a), Math.sin(a)];
    s += S.arrow(P[0] + 56 * u[0], P[1] + 56 * u[1], P[0] + 72 * u[0], P[1] + 72 * u[1], { c: RAY, w: 1.2, size: 5 });
    worst = Math.max(worst, Math.abs(dot2(u, [-u[1], u[0]])));
  }
  s += lab(P[0], 184, 'point source', { a: 'middle', w: 'bold' }) + lab(P[0], 199, 'spherical: I ∝ 1/r²', { a: 'middle', size: 10 });
  // line source: cylindrical (source along the page, cylinders drawn in perspective)
  const X = 222;
  s += S.line(X, 30, X, 156, { w: 3 });
  for (const rr of [20, 40]) {
    s += S.line(X - rr, 36, X - rr, 150, { c: WF, w: 1.5 }) + S.line(X + rr, 36, X + rr, 150, { c: WF, w: 1.5 });
    s += S.ellipse(X, 36, rr, rr * 0.28, { c: WF, sw: 1.2 }) + S.ellipse(X, 150, rr, rr * 0.28, { c: WF, sw: 1.2, dash: '3 3' });
  }
  for (const y of [62, 93, 124]) {
    s += S.arrow(X + 44, y, X + 62, y, { c: RAY, w: 1.2, size: 5 }) + S.arrow(X - 44, y, X - 62, y, { c: RAY, w: 1.2, size: 5 });
    worst = Math.max(worst, Math.abs(dot2([1, 0], [0, 1])));
  }
  s += lab(X, 184, 'line source', { a: 'middle', w: 'bold' }) + lab(X, 199, 'cylindrical: I ∝ 1/r', { a: 'middle', size: 10 });
  // distant source: plane
  for (const x of [318, 344, 370]) s += S.line(x, 36, x, 150, { c: WF, w: 1.5 });
  for (const y of [62, 93, 124]) s += S.arrow(300, y, 414, y, { c: RAY, w: 1.2, size: 5 });
  s += lab(358, 184, 'distant source', { a: 'middle', w: 'bold' }) + lab(358, 199, 'plane: I constant', { a: 'middle', size: 10 });
  check(worst < 1e-12, 'wavefronts: every drawn ray is perpendicular to the wavefront it crosses (radial for the point source, normal to the cylinder axis for the line source, normal to the planes)');
  return svgDoc(W, H, 'Three kinds of wavefront: spheres centred on a point source, whose intensity falls as one over r squared; coaxial cylinders round a line source, intensity falling as one over r; and parallel planes from a very distant source, intensity constant; in each case the rays are perpendicular to the wavefronts', s);
})();

// ================================================================ t01 Huygens' construction of a new wavefront
export const HUYNEW_DATA = { R0: 92, vt: 30, angles: [-32, -16, 0, 16, 32], planeYs: [54, 82, 110, 138, 166] };
export const HUYGENS_NEW = (() => {
  const { R0, vt, angles, planeYs } = HUYNEW_DATA;
  const W = 440;
  const H = 234;
  const S0 = [30, 104];
  let s = S.circle(S0[0], S0[1], 3.5, { fill: 'currentColor', sw: 0 }) + lab(S0[0], S0[1] + 18, 'S', { a: 'middle', w: 'bold' });
  s += S.path(arcD(S0[0], S0[1], R0, rad(-44), rad(44)), { c: WF, w: 2 });
  s += S.path(arcD(S0[0], S0[1], R0 + vt, rad(-40), rad(40)), { c: ACC, w: 2.4 });
  let worstSph = 0;
  for (const a of angles) {
    const c = [S0[0] + R0 * Math.cos(rad(a)), S0[1] + R0 * Math.sin(rad(a))];
    s += S.circle(c[0], c[1], 2.4, { fill: WF, sw: 0 });
    s += S.path(arcD(c[0], c[1], vt, rad(a - 85), rad(a + 85)), { c: MUT, w: 1, dash: '3 3' });
    // the new wavefront touches this wavelet: least distance from the wavelet centre to the new arc equals vt
    let dmin = Infinity;
    for (let t = -40; t <= 40; t += 0.05) dmin = Math.min(dmin, Math.hypot(S0[0] + (R0 + vt) * Math.cos(rad(t)) - c[0], S0[1] + (R0 + vt) * Math.sin(rad(t)) - c[1]));
    worstSph = Math.max(worstSph, Math.abs(dmin - vt));
  }
  const pOld = [S0[0] + R0 * Math.cos(rad(8)), S0[1] + R0 * Math.sin(rad(8))];
  s += lab(pOld[0] - 6, pOld[1] + 6, 'old', { a: 'end', size: 10, c: WF });
  const pNew = [S0[0] + (R0 + vt) * Math.cos(rad(8)), S0[1] + (R0 + vt) * Math.sin(rad(8))];
  s += lab(pNew[0] + 5, pNew[1] + 6, 'new', { size: 10, c: ACC, w: 'bold' });
  // plane wavefront
  const x0 = 262;
  s += S.line(x0, 38, x0, 182, { c: WF, w: 2 }) + S.line(x0 + vt, 38, x0 + vt, 182, { c: ACC, w: 2.4 });
  let worstPl = 0;
  for (const y of planeYs) {
    s += S.circle(x0, y, 2.4, { fill: WF, sw: 0 }) + S.path(arcD(x0, y, vt, rad(-85), rad(85)), { c: MUT, w: 1, dash: '3 3' });
    worstPl = Math.max(worstPl, Math.abs(x0 + vt - x0 - vt) + Math.abs(Math.hypot(vt, 0) - vt));
  }
  s += lab(x0, 18, 'old', { a: 'middle', size: 10, c: WF }) + lab(x0 + vt, 18, 'new', { a: 'middle', size: 10, c: ACC, w: 'bold' });
  s += S.arrow(x0 + vt + 8, 124, x0 + vt + 48, 124, { c: RAY, w: 1.4, size: 6 });
  s += lab(x0 + vt + 14, 62, 'wavelets of', { size: 10 }) + lab(x0 + vt + 14, 76, 'radius vt', { size: 10 });
  s += lab(10, 212, 'Each point of a wavefront sends out secondary wavelets at the wave speed v;', { size: 10 });
  s += lab(10, 227, 'after a time t the new wavefront is their forward envelope (common tangent).', { size: 10 });
  check(worstSph < 0.01 && worstPl < 1e-12, `Huygens construction: the new spherical wavefront (radius R + vt) touches each drawn wavelet (worst gap ${worstSph.toFixed(4)} px), and the new plane wavefront is the common tangent a distance vt ahead`);
  return svgDoc(W, H, 'Huygens construction: from a spherical wavefront spreading from a point source S, and from a plane wavefront, secondary wavelets of radius v t are drawn from several points; the new wavefront after time t is the surface touching all the wavelets on the forward side, a larger sphere in the first case and a parallel plane in the second', s);
})();

// ================================================================ t02 Huygens' proof of the law of reflection
export const REFLECT_DATA = { i: 35 };
export const HUYGENS_REFLECT = (() => {
  const { i } = REFLECT_DATA;
  const W = 420;
  const H = 210;
  const yB = 164;
  const A = [90, yB];
  const C = [300, yB];
  const AC = C[0] - A[0];
  const dIn = [Math.sin(rad(i)), Math.cos(rad(i))];
  const dOut = [Math.sin(rad(i)), -Math.cos(rad(i))];
  const BC = AC * Math.sin(rad(i)); // the far edge B travels BC = vt to C
  const B = [C[0] - BC * dIn[0], C[1] - BC * dIn[1]];
  const AE = BC; // same medium: the wavelet from A has radius vt
  const E = [A[0] + AE * dOut[0], A[1] + AE * dOut[1]];
  let s = S.line(0, yB, W, yB, { w: 2.5 });
  for (let x = 10; x < W; x += 16) s += S.line(x, yB, x - 8, yB + 10, { c: MUT, w: 1 });
  s += S.line(A[0], A[1], B[0], B[1], { c: WF, w: 2.2 }) + S.line(E[0], E[1], C[0], C[1], { c: WF, w: 2.2 });
  s += lab(A[0], A[1] + 26, 'A', { a: 'middle', w: 'bold' }) + lab(B[0] + 7, B[1] + 2, 'B', { w: 'bold' }) + lab(C[0], C[1] + 26, 'C', { a: 'middle', w: 'bold' }) + lab(E[0] - 12, E[1] - 2, 'E', { a: 'end', w: 'bold' });
  s += S.arrow(A[0] - 60 * dIn[0], A[1] - 60 * dIn[1], A[0] - 2 * dIn[0], A[1] - 2 * dIn[1], { c: RAY, w: 1.2, size: 5 });
  s += S.arrow(B[0] - 34 * dIn[0], B[1] - 34 * dIn[1], C[0] - 2 * dIn[0], C[1] - 2 * dIn[1], { c: RAY, w: 1.2, size: 5 });
  s += S.arrow(A[0], A[1], E[0] + 18 * dOut[0], E[1] + 18 * dOut[1], { c: RAY, w: 1.2, size: 5 });
  s += S.arrow(C[0], C[1], C[0] + 70 * dOut[0], C[1] + 70 * dOut[1], { c: RAY, w: 1.2, size: 5 });
  // wavelet from A (radius AE), drawn from the surface round past E
  s += S.path(arcD(A[0], A[1], AE, rad(-150), rad(0)), { c: MUT, w: 1, dash: '3 3' });
  // angles of the wavefronts with the surface
  const aAB = Math.atan2(B[1] - A[1], B[0] - A[0]);
  const aCE = Math.atan2(E[1] - C[1], E[0] - C[0]);
  s += angleArc(A[0], A[1], 28, aAB, 0) + lab(A[0] + 34 * Math.cos(aAB / 2) + 2, A[1] + 34 * Math.sin(aAB / 2) + 4, 'i', { it: true });
  s += angleArc(C[0], C[1], 28, aCE, Math.PI) + lab(C[0] + 36 * Math.cos((aCE - Math.PI) / 2) - 4, C[1] + 36 * Math.sin((aCE - Math.PI) / 2) + 4, 'r', { it: true });
  s += lab(W - 6, 20, 'BC = AE = vt; right angles at B and E', { a: 'end', size: 10 });
  s += lab(W - 6, 35, 'triangles ABC and CEA congruent ⇒ i = r', { a: 'end', size: 10, w: 'bold' });
  // checks
  const angBAC = deg(Math.acos(dot2([B[0] - A[0], B[1] - A[1]], [1, 0]) / Math.hypot(B[0] - A[0], B[1] - A[1])));
  const angECA = deg(Math.acos(dot2([E[0] - C[0], E[1] - C[1]], [-1, 0]) / Math.hypot(E[0] - C[0], E[1] - C[1])));
  const rightB = dot2([A[0] - B[0], A[1] - B[1]], [C[0] - B[0], C[1] - B[1]]);
  const rightE = dot2([A[0] - E[0], A[1] - E[1]], [C[0] - E[0], C[1] - E[1]]);
  check(Math.abs(angBAC - i) < 1e-9 && Math.abs(angECA - i) < 1e-9 && Math.abs(rightB) < 1e-9 && Math.abs(rightE) < 1e-9, `Huygens reflection: with BC = AE the drawn wavefronts make ${angBAC.toFixed(1)}° and ${angECA.toFixed(1)}° with the mirror, right angles at B and E (EC tangent to the wavelet from A)`);
  return svgDoc(W, H, 'Huygens proof of the law of reflection: a plane wavefront AB meets a mirror at A; while its far edge B travels to C, the secondary wavelet from A spreads an equal distance AE; the reflected wavefront CE is the tangent from C to that wavelet, so the right-angled triangles ABC and CEA are congruent and the angle of reflection equals the angle of incidence', s);
})();

// ================================================================ t02 Huygens' proof of the law of refraction (general)
function huygensRefract({ i, v1, v2, W, H, yB, Ax, AC, top, bottom, shadeTop, note, label }) {
  const A = [Ax, yB];
  const C = [Ax + AC, yB];
  const dIn = [Math.sin(rad(i)), Math.cos(rad(i))];
  const BC = AC * Math.sin(rad(i));
  const B = [C[0] - BC * dIn[0], C[1] - BC * dIn[1]];
  const AE = BC * (v2 / v1);
  const r = Math.asin(AE / AC);
  const dR = [Math.sin(r), Math.cos(r)];
  const E = [A[0] + AE * dR[0], A[1] + AE * dR[1]];
  let s = shadeTop ? S.rect(0, 0, W, yB, { c: 'none', sw: 0, fill: WF, fop: 0.1 }) : S.rect(0, yB, W, H - yB, { c: 'none', sw: 0, fill: WF, fop: 0.08 });
  s += S.line(0, yB, W, yB, { w: 1.5 });
  s += lab(8, 20, top, { size: 10 }) + lab(8, yB + 17, bottom, { size: 10 });
  s += S.line(A[0], A[1], B[0], B[1], { c: WF, w: 2.2 }) + S.line(E[0], E[1], C[0], C[1], { c: WF, w: 2.2 });
  s += lab(A[0], A[1] - 10, 'A', { a: 'middle', w: 'bold' }) + lab(B[0] + 7, B[1] + 2, 'B', { w: 'bold' }) + lab(C[0] + 6, C[1] - 6, 'C', { w: 'bold' }) + lab(E[0] - 7, E[1] + 12, 'E', { a: 'end', w: 'bold' });
  s += S.path(arcD(A[0], A[1], AE, rad(0), rad(150)), { c: MUT, w: 1, dash: '3 3' });
  s += S.arrow(A[0] - 64 * dIn[0], A[1] - 64 * dIn[1], A[0] - 2 * dIn[0], A[1] - 2 * dIn[1], { c: RAY, w: 1.3, size: 6 });
  s += S.arrow(B[0] - 34 * dIn[0], B[1] - 34 * dIn[1], C[0] - 2 * dIn[0], C[1] - 2 * dIn[1], { c: RAY, w: 1.3, size: 6 });
  s += S.arrow(A[0], A[1], E[0] + 0.12 * AE * dR[0], E[1] + 0.12 * AE * dR[1], { c: RAY, w: 1.3, size: 6 });
  s += S.arrow(C[0], C[1], C[0] + 46 * dR[0], C[1] + 46 * dR[1], { c: RAY, w: 1.3, size: 6 });
  const aAB = Math.atan2(B[1] - A[1], B[0] - A[0]);
  const aCE = Math.atan2(E[1] - C[1], E[0] - C[0]);
  s += angleArc(A[0], A[1], 26, aAB, 0) + lab(A[0] + 33 * Math.cos(aAB / 2) + 2, A[1] + 33 * Math.sin(aAB / 2) + 4, 'i', { it: true });
  const mid = (aCE + Math.PI) / 2;
  s += angleArc(C[0], C[1], 26, Math.PI, aCE) + lab(C[0] + 34 * Math.cos(mid) - 4, C[1] + 34 * Math.sin(mid) + 4, 'r', { it: true });
  s += lab(W - 6, H - 22, 'BC = v₁t, AE = v₂t ⇒ sin i / sin r = v₁/v₂', { a: 'end', size: 10, w: 'bold' });
  if (note) s += lab(W - 6, H - 8, note, { a: 'end', size: 10 });
  const sinI = BC / AC;
  const sinR = AE / AC;
  const ae = [E[0] - A[0], E[1] - A[1]];
  const ec = [C[0] - E[0], C[1] - E[1]];
  const angECA = deg(Math.acos(dot2(ec.map((x) => -x), [-1, 0]) / Math.hypot(...ec)));
  return { svg: svgDoc(W, H, label, s), sinI, sinR, r: deg(r), tangent: Math.abs(dot2(ae, ec)), angECA, AE, AC };
}

// worked example 1: air into a liquid in which light travels at 0.8 c (n = 1.25), i = 50°
export const REFRACT_DATA = { i: 50, v1: 5, v2: 4 };
export const HUYGENS_REFRACT = (() => {
  const { i, v1, v2 } = REFRACT_DATA;
  const g = huygensRefract({
    i, v1, v2, W: 420, H: 290, yB: 140, Ax: 140, AC: 190,
    top: 'air (speed v₁)', bottom: 'liquid (speed v₂ = 0.8 v₁)', shadeTop: false,
    note: 'drawn for worked example 1: i = 50°, r = 37.8°',
    label: 'Huygens proof of the law of refraction: a plane wavefront AB in air meets the surface of a liquid in which light is slower; while the edge B travels B C at speed v1, the secondary wavelet from A spreads only A E at the smaller speed v2; the refracted wavefront E C is the tangent from C to that wavelet, so the light bends towards the normal and sine i over sine r equals v1 over v2',
  });
  check(Math.abs(g.sinI / g.sinR - v1 / v2) < 1e-12 && Math.abs(g.r - refrAngle(i, v1, v2)) < 1e-9 && g.tangent < 1e-9, `Huygens refraction (air → liquid): from the drawn lengths sin i / sin r = ${(g.sinI / g.sinR).toFixed(3)} = v₁/v₂; r = ${g.r.toFixed(1)}°; EC tangent to the wavelet from A`);
  check(Math.abs(g.angECA - g.r) < 1e-9, `Huygens refraction (air → liquid): the refracted wavefront EC makes r = ${g.angECA.toFixed(1)}° with the surface`);
  return g.svg;
})();

// glass (n = 1.5) into air, i = 35°: the wavelet in air is 1.5 times BC
export const OUTWARD_DATA = { i: 35, v1: 2, v2: 3 };
export const HUYGENS_OUT = (() => {
  const { i, v1, v2 } = OUTWARD_DATA;
  const g = huygensRefract({
    i, v1, v2, W: 420, H: 290, yB: 112, Ax: 130, AC: 170,
    top: 'glass, n = 1.5 (speed v₁)', bottom: 'air (speed v₂ = 1.5 v₁)', shadeTop: true,
    note: 'if 1.5 sin i > 1, AE > AC: no tangent from C, no refracted wave',
    label: 'Huygens construction for light passing from glass into air at 35 degrees: the secondary wavelet from A in air is one and a half times as long as B C, so the refracted wavefront E C turns the other way and the ray bends away from the normal, at about 59 degrees; for angles of incidence above about 42 degrees the wavelet would be larger than A C and no refracted wavefront could be drawn',
  });
  check(Math.abs(g.sinI / g.sinR - v1 / v2) < 1e-12 && g.r > i && g.tangent < 1e-9, `Huygens refraction (glass → air): sin i / sin r = ${(g.sinI / g.sinR).toFixed(3)} = v₁/v₂, r = ${g.r.toFixed(1)}° > i`);
  const crit = deg(Math.asin(v1 / v2));
  check(1.5 * Math.sin(rad(45)) > 1 && Math.abs(crit - 41.81) < 0.01, `Huygens refraction (glass → air): AE exceeds AC once i > ${crit.toFixed(1)}° (e.g. at 45° the wavelet radius is ${(1.5 * Math.sin(rad(45))).toFixed(3)} AC)`);
  return g.svg;
})();

// ================================================================ t03 superposition: in phase and in antiphase
export const SUP_DATA = { a1: 1, a2: 0.7 };
export const SUPERPOSE = (() => {
  const { a1, a2 } = SUP_DATA;
  const W = 420;
  const H = 238;
  const x0 = 40;
  const lamPx = 180;
  const k = 22; // px per unit amplitude
  let s = '';
  let worstSum = 0;
  const amps = [];
  [[66, 0, '(a) path difference 0 (phase difference 0): amplitudes add, a₁ + a₂'], [176, 0.5, '(b) path difference λ/2 (phase difference π): a₁ − a₂']].forEach(([ay, frac, title]) => {
    s += S.line(x0 - 6, ay, x0 + 2 * lamPx + 6, ay, { c: MUT, w: 1, dash: '4 3' });
    s += lab(8, ay - 50, title, { size: 10, w: 'bold' });
    const w1 = [];
    const w2 = [];
    const sum = [];
    let peak = 0;
    for (let px = 0; px <= 2 * lamPx; px += 5) {
      const ph = (2 * Math.PI * px) / lamPx;
      const y1 = a1 * Math.sin(ph);
      const y2 = a2 * Math.sin(ph - 2 * Math.PI * frac);
      const yt = y1 + y2;
      w1.push([x0 + px, ay - k * y1]);
      w2.push([x0 + px, ay - k * y2]);
      sum.push([x0 + px, ay - k * yt]);
      worstSum = Math.max(worstSum, Math.abs(ay - k * yt - (ay - k * y1 + ay - k * y2 - ay)));
      peak = Math.max(peak, Math.abs(yt));
    }
    amps.push(peak);
    s += S.path(poly(w1), { c: WF, w: 1.3 }) + S.path(poly(w2), { c: GRN, w: 1.3, dash: '5 3' }) + S.path(poly(sum), { c: RAY, w: 2.4 });
  });
  s += S.line(x0, 222 - 12, x0 + lamPx, 222 - 12, { c: MUT, w: 1 }) + lab(x0 + lamPx / 2, 222 - 15, 'λ', { a: 'middle', it: true, size: 10 });
  s += lab(8, 230, 'blue: wave from S₁ (a₁) · green, dashed: wave from S₂ (a₂) · red: resultant', { size: 10 });
  check(worstSum < 1e-9 && Math.abs(amps[0] - (a1 + a2)) < 1e-3 && Math.abs(amps[1] - Math.abs(a1 - a2)) < 1e-3, `superposition: drawn resultant equals the sum of the two waves at every sample; peak ${amps[0].toFixed(3)} = a₁ + a₂ in phase, ${amps[1].toFixed(3)} = a₁ − a₂ in antiphase`);
  return svgDoc(W, H, 'Superposition of two waves of amplitudes a1 and a2: when they arrive in phase, with zero path difference, the resultant has amplitude a1 plus a2; when the path difference is half a wavelength they are in antiphase and the resultant has the much smaller amplitude a1 minus a2, which is zero only if the amplitudes are equal', s);
})();

// ================================================================ t04 Young's double slit: geometry of the path difference
export const YDSE_DATA = { lam: 560e-9, d: 0.35e-3, D: 1.25 };
export const YDSE = (() => {
  const W = 440;
  const H = 252;
  const yc = 128;
  const xs = 92;
  const xScr = 400;
  const dPx = 64;
  const yP = 92;
  const S1 = [xs, yc - dPx / 2];
  const S2 = [xs, yc + dPx / 2];
  const M = [xs, yc];
  const P = [xScr, yc - yP];
  let s = S.circle(26, yc, 3.5, { fill: 'currentColor', sw: 0 }) + lab(26, yc + 18, 'S', { a: 'middle', w: 'bold' });
  for (const y of [S1[1], S2[1]]) s += S.line(26, yc, xs, y, { c: MUT, w: 1, dash: '3 3' });
  s += S.line(xs, 26, xs, S1[1] - 5, { w: 3 }) + S.line(xs, S1[1] + 5, xs, S2[1] - 5, { w: 3 }) + S.line(xs, S2[1] + 5, xs, 220, { w: 3 });
  s += lab(xs - 6, S1[1] + 4, 'S₁', { a: 'end', w: 'bold' }) + lab(xs - 6, S2[1] + 4, 'S₂', { a: 'end', w: 'bold' });
  s += S.line(xScr, 26, xScr, 220, { w: 3 }) + lab(xScr + 6, 22, 'screen', { size: 10, a: 'end' });
  s += S.line(xs, yc, xScr, yc, { c: MUT, w: 1, dash: '5 4' });
  s += S.line(S1[0], S1[1], P[0], P[1], { c: RAY, w: 1.5 }) + S.line(S2[0], S2[1], P[0], P[1], { c: RAY, w: 1.5 });
  s += S.line(M[0], M[1], P[0], P[1], { c: MUT, w: 1, dash: '4 3' });
  // N: foot of the perpendicular from S1 onto S2P
  const L2 = Math.hypot(P[0] - S2[0], P[1] - S2[1]);
  const u = [(P[0] - S2[0]) / L2, (P[1] - S2[1]) / L2];
  const s2n = dot2([S1[0] - S2[0], S1[1] - S2[1]], u);
  const N = [S2[0] + s2n * u[0], S2[1] + s2n * u[1]];
  s += S.line(S1[0], S1[1], N[0], N[1], { c: MUT, w: 1, dash: '2 2' }) + S.line(S2[0], S2[1], N[0], N[1], { c: ACC, w: 3.2 });
  s += lab(N[0] + 4, N[1] + 14, 'N', { w: 'bold', size: 10 });
  const thP = Math.atan2(P[1] - M[1], P[0] - M[0]);
  s += angleArc(M[0], M[1], 64, thP, 0) + lab(M[0] + 72 * Math.cos(thP / 2), M[1] + 72 * Math.sin(thP / 2) + 4, 'θ', { it: true });
  for (const [p, nm, dx] of [[P, 'P', 8], [[xScr, yc], 'O', 8]]) s += S.circle(p[0], p[1], 2.6, { fill: 'currentColor', sw: 0 }) + lab(p[0] + dx, p[1] + 4, nm, { w: 'bold' });
  s += S.line(xScr + 22, yc, xScr + 22, P[1], { c: GRN, w: 1.2 }) + lab(xScr + 26, (yc + P[1]) / 2 + 4, 'y', { it: true, c: GRN });
  s += S.line(xs - 30, S1[1], xs - 30, S2[1], { c: GRN, w: 1.2 }) + lab(xs - 34, yc + 4, 'd', { a: 'end', it: true, c: GRN });
  s += S.line(xs, 232, xScr, 232, { c: MUT, w: 1 }) + lab((xs + xScr) / 2, 228, 'D', { a: 'middle', it: true });
  s += lab(W / 2 + 10, 246, 'path difference S₂P − S₁P ≈ S₂N = d sin θ ≈ yd/D (not to scale: d ≪ D)', { a: 'middle', size: 10 });
  // checks: S2N = d sin θ₂ exactly (θ₂: angle of S2P with the axis); for the worked example, exact path difference vs yd/D
  const sinT2 = (S2[1] - P[1]) / L2;
  const ex = YDSE_DATA;
  const beta = (ex.lam * ex.D) / ex.d;
  const y4 = 4 * beta;
  const exact = Math.hypot(ex.D, y4 + ex.d / 2) - Math.hypot(ex.D, y4 - ex.d / 2);
  check(Math.abs(s2n - dPx * sinT2) < 1e-9, `YDSE figure: the marked S₂N (${s2n.toFixed(2)} px) equals d sin θ for the ray S₂P`);
  check(Math.abs(exact - (y4 * ex.d) / ex.D) / exact < 1e-4 && Math.abs(exact / ex.lam - 4) < 1e-3, `YDSE: for λ = 560 nm, d = 0.35 mm, D = 1.25 m the exact path difference at y = 4β = ${(y4 * 1e3).toFixed(1)} mm is ${(exact / ex.lam).toFixed(5)} λ (yd/D gives 4λ)`);
  return svgDoc(W, H, 'Geometry of Young’s double slit: light from a single slit S reaches two narrow slits S1 and S2 a distance d apart; rays from them meet at a point P a height y above the centre O of a screen a distance D away; the perpendicular from S1 onto S2 P cuts off S2 N, which is the path difference, equal to d sine theta and approximately y d over D', s);
})();

// ================================================================ t04/t06 computed fringe strips for the worked examples
export const STRIPS_DATA = { ds: { lam: 560e-9, d: 0.35e-3, D: 1.25 }, ss: { lam: 630e-9, a: 0.18e-3, D: 1.6 }, half: 14, step: 0.2 };
export const PATTERNS = (() => {
  const { ds, ss, half, step } = STRIPS_DATA;
  const W = 440;
  const H = 214;
  const x0 = 24;
  const k = 14; // px per mm
  const X = (ymm) => x0 + (ymm + half) * k;
  const Ids = (ymm) => doubleSlit(ds.d, ds.lam, ymm / 1e3 / ds.D);
  const Iss = (ymm) => singleSlit(ss.a, ss.lam, ymm / 1e3 / ss.D);
  let s = '';
  const strip = (top, I, title) => {
    let t = lab(x0, top - 8, title, { size: 10, w: 'bold' });
    t += S.rect(x0, top, 2 * half * k, 36, { c: 'none', sw: 0, fill: FILL });
    const n = Math.round((2 * half) / step);
    for (let j = 0; j <= n; j++) {
      const y = Number((-half + j * step).toFixed(1));
      const v = I(y);
      if (v > 0.002) t += S.rect(X(y) - (step * k) / 2, top, step * k + 0.3, 36, { c: 'none', sw: 0, fill: ACC, fop: Number(Math.sqrt(v).toFixed(2)) });
    }
    t += S.rect(x0, top, 2 * half * k, 36, { sw: 1 });
    for (let y = -12; y <= 12; y += 2) t += S.line(X(y), top + 36, X(y), top + 41, { w: 1 });
    for (let y = -12; y <= 12; y += 4) t += lab(X(y), top + 53, String(y).replace('-', '−'), { a: 'middle', size: 10 });
    t += lab(X(half), top + 53, 'mm', { a: 'end', size: 10 });
    return t;
  };
  const betaMm = fringeWidth(ds.lam, ds.D, ds.d) * 1e3;
  const y1Mm = ((ss.lam * ss.D) / ss.a) * 1e3;
  s += strip(30, Ids, `double slit: λ = 560 nm, d = 0.35 mm, D = 1.25 m → β = ${betaMm.toFixed(1)} mm`);
  s += strip(122, Iss, `single slit: λ = 630 nm, a = 0.18 mm, D = 1.6 m → central band ${(2 * y1Mm).toFixed(1)} mm`);
  s += lab(W / 2, 206, 'orange shading shows the light, drawn ∝ √I so that the faint side bands show', { a: 'middle', size: 10, c: MUT });
  // checks
  let okDs = true;
  for (let n = -6; n <= 6; n++) {
    if (Math.abs(Ids(n * betaMm) - 1) > 1e-12) okDs = false;
    if (Math.abs(n + 0.5) * betaMm <= half && Ids((n + 0.5) * betaMm) > 1e-12) okDs = false;
  }
  const zeros = [-2, -1, 1, 2].map((m) => Iss(m * y1Mm));
  check(okDs && Math.abs(betaMm - 2) < 1e-9, `fringe strip: double-slit brightness 1 at y = nβ and 0 at (n + ½)β, β = ${betaMm.toFixed(2)} mm`);
  check(zeros.every((z) => z < 1e-12) && Iss(0) === 1 && Math.abs(y1Mm - 5.6) < 1e-9 && Math.abs(2 * y1Mm - 2 * (2 * y1Mm - y1Mm)) < 1e-9, `fringe strip: single-slit zeros at ±${y1Mm.toFixed(1)} and ±${(2 * y1Mm).toFixed(1)} mm; central band ${(2 * y1Mm).toFixed(1)} mm, twice the ${y1Mm.toFixed(1)} mm side bands`);
  return svgDoc(W, H, 'Two computed patterns on a screen drawn to the same millimetre scale: the double-slit pattern of worked example 4 is a row of equally bright, equally spaced fringes 2.0 millimetres apart; the single-slit pattern of worked example 6 has a broad central band 11.2 millimetres wide with much fainter side bands half as wide', s);
})();

// ================================================================ t06 single slit: path differences across the slit
export const SLIT_DATA = { a: 90, th: 22 };
export const SLIT = (() => {
  const { a, th } = SLIT_DATA;
  const W = 420;
  const H = 236;
  const xs = 100;
  const yc = 118;
  const T = [xs, yc - a / 2];
  const B = [xs, yc + a / 2];
  const M = [xs, yc];
  let s = S.line(xs, 18, xs, T[1], { w: 3 }) + S.line(xs, B[1], xs, 206, { w: 3 });
  for (const x of [20, 38, 56]) s += S.line(x, T[1] - 4, x, B[1] + 4, { c: WF, w: 1.4 });
  for (const y of [T[1] + 12, yc, B[1] - 12]) s += S.arrow(8, y, 72, y, { c: RAY, w: 1, size: 5 });
  const dir = [Math.cos(rad(th)), -Math.sin(rad(th))];
  const P1 = [xs, T[1] + 22];
  const P2 = [xs, T[1] + 22 + a / 2];
  for (const [p, c, w] of [[T, RAY, 1.3], [M, RAY, 1.3], [B, RAY, 1.3], [P1, GRN, 1.1], [P2, GRN, 1.1]]) s += S.line(p[0], p[1], p[0] + 180 * dir[0], p[1] + 180 * dir[1], { c, w });
  const foot = (q) => {
    // foot of the perpendicular from T onto the ray from q
    const t = dot2([T[0] - q[0], T[1] - q[1]], dir);
    return [q[0] + t * dir[0], q[1] + t * dir[1]];
  };
  const FB = foot(B);
  const FM = foot(M);
  s += S.line(T[0], T[1], FB[0], FB[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.line(B[0], B[1], FB[0], FB[1], { c: ACC, w: 3.4 }) + S.line(M[0], M[1], FM[0], FM[1], { c: GRN, w: 3.4 });
  s += lab(FB[0] + 8, FB[1] + 16, 'a sin θ = λ', { size: 11, w: 'bold' }) + lab(FM[0] + 14, FM[1] + 8, 'λ/2', { size: 10, w: 'bold', c: GRN });
  s += S.line(xs - 14, T[1], xs - 14, B[1], { c: GRN, w: 1.2 }) + lab(xs - 18, yc + 26, 'a', { a: 'end', it: true, w: 'bold', c: GRN });
  s += lab(xs - 6, T[1] - 4, 'top', { a: 'end', size: 10 }) + lab(xs - 6, B[1] + 12, 'bottom', { a: 'end', size: 10 });
  s += lab(W - 6, 206, 'first minimum: a sin θ = λ; each wavelet in the top half', { a: 'end', size: 10 });
  s += lab(W - 6, 220, 'meets its partner a/2 below half a wavelength behind (green pair)', { a: 'end', size: 10 });
  // checks: marked lengths
  const pBN = Math.hypot(FB[0] - B[0], FB[1] - B[1]);
  const pMN = Math.hypot(FM[0] - M[0], FM[1] - M[1]);
  const pPair = dot2([P1[0] - P2[0], P1[1] - P2[1]], dir);
  check(Math.abs(pBN - a * Math.sin(rad(th))) < 1e-9 && Math.abs(pMN - (a / 2) * Math.sin(rad(th))) < 1e-9 && Math.abs(pPair - pMN) < 1e-9, `single-slit figure: marked path differences a sin θ (${pBN.toFixed(1)} px) and (a/2) sin θ (${pMN.toFixed(1)} px); the green pair a/2 apart differ by the same (a/2) sin θ`);
  return svgDoc(W, H, 'Single-slit diffraction: a plane wavefront fills a slit of width a; rays leaving the top, middle and bottom of the slit at angle theta differ in path, the bottom one by a sine theta; when this equals one wavelength, a wavelet from any point in the top half and one from the point a over 2 below it differ by half a wavelength and cancel, so the direction is dark', s);
})();

// ================================================================ t07 angular and linear width of the central maximum
export const CENTRAL_DATA = { th1: 12, Dpx: 270 };
export const CENTRAL = (() => {
  const { th1, Dpx } = CENTRAL_DATA;
  const W = 440;
  const H = 236;
  const xs = 60;
  const yc = 108;
  const xScr = xs + Dpx;
  const y1 = Dpx * Math.tan(rad(th1));
  const aOverLam = 1 / Math.sin(rad(th1));
  let s = S.line(xs, 16, xs, yc - 7, { w: 3 }) + S.line(xs, yc + 7, xs, 196, { w: 3 }) + lab(xs + 6, yc - 12, 'a', { it: true, w: 'bold' });
  for (const y of [yc - 30, yc, yc + 30]) s += S.arrow(10, y, xs - 10, y, { c: RAY, w: 1, size: 5 });
  s += S.line(xs, yc, xScr, yc, { c: MUT, w: 1, dash: '5 4' });
  s += S.line(xs, yc, xScr, yc - y1, { c: RAY, w: 1.2, dash: '5 3' }) + S.line(xs, yc, xScr, yc + y1, { c: RAY, w: 1.2, dash: '5 3' });
  s += angleArc(xs, yc, 70, -rad(th1), rad(th1)) + lab(xs + 84, yc + 4, '2θ₁', { size: 11, it: true });
  s += S.line(xScr, 16, xScr, 196, { w: 2.5 });
  // computed intensity profile drawn sideways against the screen
  const prof = [];
  let worstZero = 0;
  for (let py = -96; py <= 96; py += 1) {
    const sinT = py / Math.hypot(py, Dpx);
    prof.push([xScr + 72 * sinc2(Math.PI * aOverLam * sinT), yc + py]);
  }
  for (const sg of [-1, 1]) worstZero = Math.max(worstZero, sinc2(Math.PI * aOverLam * ((sg * y1) / Math.hypot(y1, Dpx))));
  s += S.path(poly(prof), { c: ACC, w: 1.8 });
  s += S.line(xScr + 84, yc - y1, xScr + 84, yc + y1, { c: GRN, w: 1.2 }) + S.line(xScr + 78, yc - y1, xScr + 90, yc - y1, { c: GRN, w: 1.2 }) + S.line(xScr + 78, yc + y1, xScr + 90, yc + y1, { c: GRN, w: 1.2 });
  s += lab(xScr + 94, yc + 4, 'W', { it: true, w: 'bold', c: GRN });
  s += lab(xScr - 6, yc - y1 - 4, 'first minimum', { a: 'end', size: 10 }) + lab(xScr - 6, yc + y1 + 13, 'first minimum', { a: 'end', size: 10 });
  s += S.line(xs, 206, xScr, 206, { c: MUT, w: 1 }) + lab((xs + xScr) / 2, 202, 'D', { a: 'middle', it: true });
  s += lab(10, 228, 'sin θ₁ = λ/a; angular width 2θ₁ ≈ 2λ/a; linear width W ≈ 2λD/a (angles exaggerated)', { size: 10 });
  check(worstZero < 1e-12 && sinc2(0) === 1, `central maximum figure: the computed profile is zero where the drawn lines at ±θ₁ = ${th1}° meet the screen (y = ±${y1.toFixed(1)} px) and greatest on the axis`);
  return svgDoc(W, H, 'Width of the central maximum: light diffracted by a slit of width a reaches a screen a distance D away; the first minima lie at angles plus and minus theta one, where sine theta one equals lambda over a, so the central maximum spans an angle of two lambda over a and a width W of about two lambda D over a on the screen; the computed intensity profile is drawn against the screen', s);
})();

export const ALL = { WAVEFRONTS, HUYGENS_NEW, HUYGENS_REFLECT, HUYGENS_REFRACT, HUYGENS_OUT, SUPERPOSE, YDSE, PATTERNS, SLIT, CENTRAL };
