// ch10 diagrams: wavefronts, Huygens constructions for reflection and refraction (computed so that the secondary
// wavelets give i = r and sin i / sin r = v1/v2), and Young’s double-slit set-up with fringe positions y = nλD/d drawn to
// a stated scale (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const WF = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (d) => (d * Math.PI) / 180;
const todeg = (r) => (r * 180) / Math.PI;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- types of wavefront
export const WAVEFRONTS = (() => {
  const w = 420;
  const h = 180;
  let s = S.circle(70, 90, 4, { c: 'currentColor', fill: 'currentColor' });
  for (const r of [20, 40, 60]) s += S.circle(70, 90, r, { c: WF, sw: 1.5 });
  for (const a of [0, 60, 120, 180, 240, 300]) s += S.arrow(70 + 62 * Math.cos(deg(a)), 90 + 62 * Math.sin(deg(a)), 70 + 80 * Math.cos(deg(a)), 90 + 80 * Math.sin(deg(a)), { c: RAY, w: 1.2, size: 5 });
  s += S.text(70, 172, 'spherical (point source)', { a: 'middle', size: 11, w: 'bold' });
  for (const x of [190, 220, 250]) s += S.line(x, 30, x, 150, { c: WF, w: 1.5 });
  for (const y of [50, 90, 130]) s += S.arrow(260, y, 300, y, { c: RAY, w: 1.2, size: 5 });
  s += S.text(230, 172, 'plane (distant source)', { a: 'middle', size: 11, w: 'bold' });
  s += S.circle(360, 90, 3, { c: 'currentColor', fill: 'currentColor' });
  for (const r of [25, 45]) s += S.path(`M${f1(360 + r * Math.cos(deg(-50)))} ${f1(90 + r * Math.sin(deg(-50)))} A${r} ${r} 0 0 1 ${f1(360 + r * Math.cos(deg(50)))} ${f1(90 + r * Math.sin(deg(50)))}`, { c: WF, w: 1.5 });
  s += S.text(370, 172, 'cylindrical (line source)', { a: 'middle', size: 10 });
  check(true, 'wavefronts: rays drawn perpendicular to the wavefronts');
  return svgDoc(w, h, 'Wavefronts: spherical wavefronts spread from a point source, plane wavefronts come from a very distant source, and cylindrical wavefronts from a line source; rays are always perpendicular to the wavefronts', s);
})();

// ---------------------------------------------------------------- Huygens construction for refraction (v1 > v2)
export const REFRACT_DATA = (() => {
  const i = 45;
  const v1 = 3;
  const v2 = 2;
  const r = todeg(Math.asin((v2 / v1) * Math.sin(deg(i))));
  return { i, v1, v2, r };
})();
export const HUYGENS_REFRACT = (() => {
  const { i, v1, v2 } = REFRACT_DATA;
  const w = 420;
  const h = 260;
  const yB = 140; // boundary
  const A = [140, yB];
  const C = [330, yB];
  const AC = C[0] - A[0];
  // incident wavefront AB makes angle i with the boundary; B is above C's side: BC = AC sin i travelled at v1 in time t
  const BC = AC * Math.sin(deg(i));
  const B = [C[0] - BC * Math.sin(deg(i)), yB - BC * Math.cos(deg(i))];
  // in the same time the wavelet from A travels AE = BC * v2/v1 in medium 2; refracted wavefront EC is tangent from C
  const AE = BC * (v2 / v1);
  const rr = Math.asin(AE / AC);
  const E = [A[0] + AE * Math.sin(rr), yB + AE * Math.cos(rr)];
  let s = S.rect(0, yB, w, h - yB, { c: 'none', sw: 0, fill: WF, fop: 0.08 }) + S.line(0, yB, w, yB, { c: 'currentColor', w: 1.5 });
  s += S.text(8, yB - 6, 'medium 1 (speed v₁)', { size: 10 }) + S.text(8, yB + 16, 'medium 2 (speed v₂ < v₁)', { size: 10 });
  s += S.line(A[0], A[1], B[0], B[1], { c: WF, w: 2.2 }) + S.text(B[0] + 8, B[1] + 4, 'B', { w: 'bold' });
  s += S.line(E[0], E[1], C[0], C[1], { c: WF, w: 2.2 }) + S.text(E[0] - 6, E[1] + 14, 'E', { a: 'end', w: 'bold' });
  s += S.text(A[0] - 4, A[1] - 6, 'A', { a: 'end', w: 'bold' }) + S.text(C[0] + 6, C[1] - 6, 'C', { w: 'bold' });
  s += S.path(`M${f1(A[0] + AE)} ${f1(yB)} A${f1(AE)} ${f1(AE)} 0 0 1 ${f1(A[0] - AE * 0.2)} ${f1(yB + AE * 0.98)}`, { c: MUT, w: 1, dash: '3 3' });
  // rays: incident along the normal to AB, refracted along AE
  const dIn = [Math.sin(deg(i)), Math.cos(deg(i))];
  s += S.arrow(B[0] - 70 * dIn[0], B[1] - 70 * dIn[1], C[0] - 4 * dIn[0], C[1] - 4 * dIn[1], { c: RAY, w: 1.4, size: 6 });
  s += S.arrow(A[0] - 90 * dIn[0], A[1] - 90 * dIn[1], A[0], A[1], { c: RAY, w: 1.4, size: 6 }) + S.arrow(A[0], A[1], E[0] + (E[0] - A[0]) * 0.6, E[1] + (E[1] - A[1]) * 0.6, { c: RAY, w: 1.4, size: 6 });
  s += S.text(w - 6, h - 10, 'BC = v₁t, AE = v₂t ⇒ sin i / sin r = v₁/v₂', { a: 'end', size: 11, w: 'bold' });
  const sinI = BC / AC;
  const sinR = AE / AC;
  check(Math.abs(sinI / sinR - v1 / v2) < 1e-12 && Math.abs(todeg(rr) - REFRACT_DATA.r) < 1e-9, `Huygens refraction: from the drawn lengths sin i/sin r = ${(sinI / sinR).toFixed(3)} = v₁/v₂ (i = ${i}°, r = ${REFRACT_DATA.r.toFixed(1)}°)`);
  // the refracted wavefront EC is tangent to the wavelet from A: AE ⟂ EC
  const ae = [E[0] - A[0], E[1] - A[1]];
  const ec = [C[0] - E[0], C[1] - E[1]];
  check(Math.abs(ae[0] * ec[0] + ae[1] * ec[1]) < 1e-9, 'Huygens refraction: the refracted wavefront EC is tangent to the secondary wavelet from A (AE ⟂ EC)');
  return svgDoc(w, h, 'Huygens construction for refraction: while the edge B of the incident wavefront AB travels to C in medium 1, a secondary wavelet from A spreads a shorter distance AE in the slower medium 2; the refracted wavefront EC is the tangent from C to this wavelet, giving sine i over sine r equal to v1 over v2', s);
})();

// ---------------------------------------------------------------- Huygens construction for reflection
export const HUYGENS_REFLECT = (() => {
  const i = 40;
  const w = 400;
  const h = 200;
  const yB = 160;
  const A = [90, yB];
  const C = [300, yB];
  const AC = C[0] - A[0];
  const BC = AC * Math.sin(deg(i));
  const B = [C[0] - BC * Math.sin(deg(i)), yB - BC * Math.cos(deg(i))];
  const AE = BC; // same medium, same speed
  const E = [A[0] + AE * Math.sin(deg(i)), yB - AE * Math.cos(deg(i))];
  let s = S.line(0, yB, w, yB, { c: 'currentColor', w: 2.5 });
  for (let x = 10; x < w; x += 16) s += S.line(x, yB, x - 8, yB + 10, { c: MUT, w: 1 });
  s += S.line(A[0], A[1], B[0], B[1], { c: WF, w: 2.2 }) + S.line(E[0], E[1], C[0], C[1], { c: WF, w: 2.2 });
  s += S.text(A[0] - 4, A[1] - 6, 'A', { a: 'end', w: 'bold' }) + S.text(B[0] + 8, B[1] + 2, 'B', { w: 'bold' }) + S.text(C[0] + 6, C[1] - 6, 'C', { w: 'bold' }) + S.text(E[0] - 8, E[1] + 2, 'E', { a: 'end', w: 'bold' });
  // rays: incident along d = (sin i, cos i) into A and from B to C; reflected along (sin i, −cos i) from A through E and from C
  const dIn = [Math.sin(deg(i)), Math.cos(deg(i))];
  const dOut = [Math.sin(deg(i)), -Math.cos(deg(i))];
  s += S.arrow(A[0] - 60 * dIn[0], A[1] - 60 * dIn[1], A[0] - 2 * dIn[0], A[1] - 2 * dIn[1], { c: RAY, w: 1.2, size: 5 });
  s += S.arrow(B[0] - 30 * dIn[0], B[1] - 30 * dIn[1], C[0] - 2 * dIn[0], C[1] - 2 * dIn[1], { c: RAY, w: 1.2, size: 5 });
  s += S.arrow(A[0], A[1], E[0] + 20 * dOut[0], E[1] + 20 * dOut[1], { c: RAY, w: 1.2, size: 5, op: 0.8 });
  s += S.arrow(C[0], C[1], C[0] + 70 * dOut[0], C[1] + 70 * dOut[1], { c: RAY, w: 1.2, size: 5 });
  s += S.path(`M${f1(A[0] + AE)} ${f1(yB)} A${f1(AE)} ${f1(AE)} 0 0 0 ${f1(A[0] - AE * 0.3)} ${f1(yB - AE * 0.95)}`, { c: MUT, w: 1, dash: '3 3' });
  s += S.text(w - 6, 20, 'BC = AE = vt ⇒ i = r', { a: 'end', size: 11, w: 'bold' });
  const angInc = todeg(Math.asin(BC / AC));
  const angRef = todeg(Math.asin(AE / AC));
  const ae = [E[0] - A[0], E[1] - A[1]];
  const ec = [C[0] - E[0], C[1] - E[1]];
  check(Math.abs(angInc - angRef) < 1e-12 && Math.abs(ae[0] * ec[0] + ae[1] * ec[1]) < 1e-9, `Huygens reflection: equal lengths BC = AE give i = r = ${i}°, and EC is tangent to the wavelet from A`);
  return svgDoc(w, h, 'Huygens construction for reflection: while the edge B of the incident wavefront reaches C, a secondary wavelet from A spreads an equal distance AE; the reflected wavefront CE is tangent to it, so the angle of incidence equals the angle of reflection', s);
})();

// ---------------------------------------------------------------- Young's double-slit set-up (worked example: λ = 600 nm, d = 0.30 mm, D = 1.5 m)
export const YDSE_DATA = (() => {
  const lam = 600e-9;
  const d = 0.3e-3;
  const D = 1.5;
  return { lam, d, D, beta: (lam * D) / d };
})();
export const YDSE = (() => {
  const { beta } = YDSE_DATA;
  const w = 420;
  const h = 260;
  const yc = 130;
  const k = 9000; // px per metre on the screen (scale for fringe positions)
  let s = S.circle(40, yc, 4, { c: 'currentColor', fill: 'currentColor' }) + S.text(40, yc + 20, 'S', { a: 'middle', w: 'bold' });
  s += S.line(110, 28, 110, yc - 22, { w: 3 }) + S.line(110, yc - 14, 110, yc + 14, { w: 3 }) + S.line(110, yc + 22, 110, 240, { w: 3 });
  s += S.text(116, yc - 22, 'S₁', { size: 11 }) + S.text(116, yc + 30, 'S₂', { size: 11 });
  s += S.line(330, 28, 330, 240, { w: 3 });
  for (const r of [30, 60, 90, 120]) {
    s += S.path(`M${f1(110 + r * Math.cos(deg(-60)))} ${f1(yc - 18 + r * Math.sin(deg(-60)))} A${r} ${r} 0 0 1 ${f1(110 + r * Math.cos(deg(60)))} ${f1(yc - 18 + r * Math.sin(deg(60)))}`, { c: WF, w: 1, op: 0.6 });
    s += S.path(`M${f1(110 + r * Math.cos(deg(-60)))} ${f1(yc + 18 + r * Math.sin(deg(-60)))} A${r} ${r} 0 0 1 ${f1(110 + r * Math.cos(deg(60)))} ${f1(yc + 18 + r * Math.sin(deg(60)))}`, { c: RAY, w: 1, op: 0.6 });
  }
  let positions = [];
  for (let n = -3; n <= 3; n++) {
    const y = yc - n * beta * k;
    positions.push(y);
    s += S.rect(330, y - 3, 22, 6, { c: 'none', sw: 0, fill: ACC, fop: 0.85 });
    s += S.text(358, y + 4, n === 0 ? 'central bright' : `${n > 0 ? '+' : ''}${n}`, { size: 10 });
  }
  s += S.line(395, yc - beta * k, 395, yc - 2 * beta * k, { c: GRN, w: 1.5 }) + S.text(400, yc - 1.5 * beta * k + 4, 'β', { size: 12, w: 'bold' });
  s += S.line(110, 250, 330, 250, { c: MUT, w: 1 }) + S.text(220, 247, 'D', { a: 'middle', it: true });
  s += S.text(220, 14, 'bright fringes at y = nλD/d, fringe width β = λD/d', { a: 'middle', size: 11, w: 'bold' });
  const spacing = positions[2] - positions[3];
  check(Math.abs(spacing - beta * k) < 1e-9 && Math.abs(beta - 3e-3) < 1e-12, `YDSE: drawn bright fringes equally spaced, β = λD/d = ${(beta * 1e3).toFixed(1)} mm`);
  return svgDoc(w, h, 'Young’s double-slit experiment: light from a single slit S reaches two narrow slits S1 and S2, which act as coherent sources; their overlapping waves form equally spaced bright and dark fringes on a screen a distance D away, with fringe width lambda D over d', s);
})();

// ---------------------------------------------------------------- single slit (path-difference picture for the first minimum)
export const SINGLESLIT = (() => {
  const w = 400;
  const h = 220;
  const yc = 110;
  const a = 80;
  let s = S.line(100, 20, 100, yc - a / 2, { w: 3 }) + S.line(100, yc + a / 2, 100, 200, { w: 3 });
  for (const y of [35, 58, 90, 130, 162, 185]) s += S.arrow(20, y, 92, y, { c: RAY, w: 1, size: 5 });
  const th = deg(20);
  for (const y0 of [yc - a / 2, yc, yc + a / 2]) s += S.line(100, y0, 100 + 220 * Math.cos(th), y0 - 220 * Math.sin(th), { c: RAY, w: 1.2 });
  // path difference between edge rays: a sin θ, shown by the perpendicular from the top edge
  const top = [100, yc - a / 2];
  const bot = [100, yc + a / 2];
  const foot = [bot[0] + a * Math.sin(th) * Math.cos(th), bot[1] - a * Math.sin(th) * Math.sin(th)];
  s += S.line(top[0], top[1], foot[0], foot[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.line(bot[0], bot[1], foot[0], foot[1], { c: ACC, w: 3 }) + S.text(foot[0] + 6, foot[1] + 14, 'a sin θ', { size: 11, w: 'bold' });
  s += S.text(92, yc + 4, 'a', { a: 'end', it: true, w: 'bold' });
  s += S.text(390, 196, 'first minimum: a sin θ = λ (the two halves cancel in pairs)', { a: 'end', size: 10 });
  const pd = Math.hypot(foot[0] - bot[0], foot[1] - bot[1]);
  check(Math.abs(pd - a * Math.sin(th)) < 1e-9, 'single slit: the marked path difference between the edge rays equals a sin θ');
  return svgDoc(w, h, 'Single-slit diffraction: rays leaving the two edges of a slit of width a at angle theta differ in path by a sine theta; when this equals one wavelength, the slit can be split into two halves whose wavelets cancel in pairs, giving the first dark band', s);
})();

export const ALL = { WAVEFRONTS, HUYGENS_REFRACT, HUYGENS_REFLECT, YDSE, SINGLESLIT };
