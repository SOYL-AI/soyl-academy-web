// ICSE 10 Physics ch04 diagrams (allow-listed elements, palette colours only). Every ray is traced with the vector form of
// Snell's law (glass n = 1.5, water n = 4/3) and each figure pushes SELF_CHECKS lines (read by build.mjs): Snell's law holds at
// every drawn refraction, the emergent ray of the slab is parallel to the incident ray with the drawn lateral displacement equal
// to t sin(i - r) / cos r, the apparent depth is close to real depth / n, the prism obeys r1 + r2 = A and deviation = i + e - A,
// and the totally reflecting prisms meet their faces at 45 degrees, above the critical angle.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const D = Math.PI / 180;
const deg = (a) => a / D;

// ---------------------------------------------------------------- vector optics
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit = (a) => mul(a, 1 / Math.hypot(a[0], a[1]));
const ang = (a) => Math.atan2(a[1], a[0]);
/** Refracts unit direction d at a surface whose unit normal nrm points back into the incident medium; null for total internal reflection. */
function refract(d, nrm, n1, n2) {
  const cosi = -dot(nrm, d);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return unit(add(mul(d, eta), mul(nrm, eta * cosi - Math.sqrt(k))));
}
const reflect = (d, nrm) => sub(d, mul(nrm, 2 * dot(d, nrm)));
/** Angle (degrees) between a ray direction and a normal line. */
const angTo = (d, nrm) => deg(Math.acos(Math.min(1, Math.abs(dot(d, nrm)))));
/** Intersection of lines p + s d and q + t e. */
function meet(p, d, q, e) {
  const den = d[0] * e[1] - d[1] * e[0];
  const s = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den;
  return add(p, mul(d, s));
}
/** Arc of radius rr round (cx, cy) from screen angle a1 to a2 (radians, a1 < a2). */
const arc = (c, rr, a1, a2, col = ACC) => S.path(`M${(c[0] + rr * Math.cos(a1)).toFixed(1)} ${(c[1] + rr * Math.sin(a1)).toFixed(1)} A ${rr} ${rr} 0 0 1 ${(c[0] + rr * Math.cos(a2)).toFixed(1)} ${(c[1] + rr * Math.sin(a2)).toFixed(1)}`, { c: col, w: 1.2 });
const ray = (p, q, o = {}) => S.line(p[0], p[1], q[0], q[1], { c: o.c ?? RED, w: o.w ?? 2, dash: o.dash }) + (o.head === false ? '' : S.midHead(p[0], p[1], q[0], q[1], { c: o.c ?? RED }));
const near = (a, b, tol) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- refraction at a surface with partial reflection
export const REFRACT = (() => {
  const O = [190, 115];
  const n = 1.5;
  const i = 40;
  const L = 110;
  const d = [Math.sin(i * D), Math.cos(i * D)];
  const t = refract(d, [0, -1], 1, n);
  const rf = reflect(d, [0, -1]);
  const P = sub(O, mul(d, L));
  let s = S.rect(20, O[1], 340, 95, { fill: FILL, fop: 0.6, c: 'none' }) + S.line(20, O[1], 360, O[1], { w: 1.5 });
  s += S.line(O[0], 15, O[0], 215, { c: MUT, w: 1, dash: '5 4' }) + lab(O[0] + 5, 26, 'normal', { size: 10, c: MUT });
  s += ray(P, O) + ray(O, add(O, mul(t, L))) + ray(O, add(O, mul(rf, L * 0.8)), { c: MUT, w: 1, dash: '4 3' });
  s += arc(O, 34, ang(mul(d, -1)), -Math.PI / 2) + lab(O[0] - 22, O[1] - 40, 'i', { size: 13, it: true, c: ACC });
  s += arc(O, 34, ang(t), Math.PI / 2) + lab(O[0] + 8, O[1] + 46, 'r', { size: 13, it: true, c: ACC });
  s += lab(28, 40, 'air (rarer)', { size: 11 }) + lab(28, 200, 'glass (denser)', { size: 11 });
  s += lab(P[0] - 6, P[1] - 6, 'incident ray', { size: 10, a: 'middle' });
  s += lab(262, 50, 'weak reflected ray', { size: 10, c: MUT });
  s += lab(250, 200, 'refracted ray', { size: 10 });
  s += lab(230, 140, 'bends towards the normal', { size: 10, c: ACC });
  const r = angTo(t, [0, 1]);
  check(near(Math.sin(i * D) / Math.sin(r * D), n, 1e-9) && near(angTo(rf, [0, -1]), i, 1e-9), `refraction: drawn i = ${i} and r = ${r.toFixed(2)} degrees give sin i / sin r = 1.5, and the weak reflected ray leaves at ${i} degrees`);
  return svgDoc(380, 225, `A ray of light in air strikes a flat glass surface at an angle of incidence of ${i} degrees. Part of the light is reflected weakly at the same angle, and most of it is refracted into the glass, bending towards the normal to an angle of refraction of about ${Math.round(r)} degrees.`, s);
})();

// ---------------------------------------------------------------- rectangular glass block: lateral displacement
export const SLAB = (() => {
  const top = 70;
  const tPx = 100;
  const n = 1.5;
  const i = 50;
  const A = [150, top];
  const d = [Math.sin(i * D), Math.cos(i * D)];
  const t1 = refract(d, [0, -1], 1, n);
  const B = add(A, mul(t1, tPx / t1[1]));
  const t2 = refract(t1, [0, -1], n, 1);
  const foot = add(A, mul(d, dot(sub(B, A), d)));
  let s = S.rect(70, top, 270, tPx, { fill: FILL, fop: 0.6, sw: 1.2 }) + lab(265, top + 18, 'glass block', { size: 10 });
  s += S.line(A[0], top - 55, A[0], top + 40, { c: MUT, w: 1, dash: '5 4' }) + S.line(B[0], B[1] - 40, B[0], B[1] + 55, { c: MUT, w: 1, dash: '5 4' });
  s += ray(sub(A, mul(d, 80)), A) + ray(A, B) + ray(B, add(B, mul(t2, 80)));
  s += S.line(A[0], A[1], A[0] + d[0] * 175, A[1] + d[1] * 175, { c: MUT, w: 1, dash: '4 3' }) + lab(A[0] + d[0] * 175 + 4, A[1] + d[1] * 175 + 4, 'incident ray produced', { size: 10, c: MUT });
  s += S.line(B[0], B[1], foot[0], foot[1], { c: ACC, w: 2 }) + lab((B[0] + foot[0]) / 2 + 8, (B[1] + foot[1]) / 2 + 4, 'd', { size: 13, w: 'bold', c: ACC });
  s += arc(A, 26, ang(mul(d, -1)), -Math.PI / 2) + lab(A[0] - 18, A[1] - 30, 'i', { size: 13, it: true, c: ACC });
  s += arc(A, 30, ang(t1), Math.PI / 2) + lab(A[0] + 6, A[1] + 42, 'r', { size: 13, it: true, c: ACC });
  s += arc(B, 26, ang(t2), Math.PI / 2) + lab(B[0] + 4, B[1] + 38, 'e', { size: 13, it: true, c: ACC });
  s += lab(20, 245, 'e = i: the emergent ray is parallel to the incident ray, shifted sideways by d', { size: 10 });
  const r = angTo(t1, [0, 1]);
  const e = angTo(t2, [0, 1]);
  const dDrawn = Math.hypot(B[0] - foot[0], B[1] - foot[1]);
  const dFormula = (tPx * Math.sin((i - r) * D)) / Math.cos(r * D);
  check(near(e, i, 1e-9) && near(dDrawn, dFormula, 1e-6) && near(Math.sin(i * D) / Math.sin(r * D), n, 1e-9), `glass block: i = ${i}, r = ${r.toFixed(2)}, e = ${e.toFixed(2)} degrees (emergent parallel to incident); drawn lateral displacement ${dDrawn.toFixed(2)} px equals t sin(i - r) / cos r = ${dFormula.toFixed(2)} px`);
  return svgDoc(420, 255, `A ray passes through a rectangular glass block. It strikes the top face at an angle of incidence of ${i} degrees, bends towards the normal inside the glass to about ${Math.round(r)} degrees, and leaves the bottom face at ${i} degrees again. The emergent ray is parallel to the incident ray but shifted sideways; the perpendicular distance d between the emergent ray and the incident ray produced is the lateral displacement.`, s);
})();

// ---------------------------------------------------------------- thick plane mirror: multiple images
export const THICK = (() => {
  const front = 100;
  const tPx = 50;
  const n = 1.5;
  const i = 40;
  const O = [70, 40];
  const d = [Math.sin(i * D), Math.cos(i * D)];
  const A = add(O, mul(d, (front - O[1]) / d[1]));
  const t1 = refract(d, [0, -1], 1, n);
  const out = [];
  let p = A;
  const pts = [];
  // bounce inside: down to the silvered back, up to the front, emerge (and partly reflect again)
  let s = S.rect(30, front, 360, tPx, { fill: FILL, fop: 0.6, sw: 1.2 });
  s += S.line(30, front + tPx, 390, front + tPx, { w: 3 });
  for (let x = 36; x < 390; x += 12) s += S.line(x, front + tPx + 2, x - 6, front + tPx + 10, { w: 1, c: MUT });
  s += lab(300, front + tPx + 24, 'silvered back', { size: 10 });
  s += S.circle(O[0], O[1], 4, { fill: BLUE, c: BLUE }) + lab(O[0] - 8, O[1] - 8, 'O', { size: 12, w: 'bold', a: 'end' });
  s += ray(O, A);
  const rf0 = reflect(d, [0, -1]);
  out.push([A, rf0, 1]);
  for (let k = 0; k < 2; k++) {
    const down = [t1[0], t1[1]];
    const B = add(p, mul(down, tPx / down[1]));
    const up = [down[0], -down[1]];
    const C = add(B, mul(up, tPx / down[1]));
    s += ray(p, B, { w: k === 0 ? 1.8 : 1.2 }) + ray(B, C, { w: k === 0 ? 1.8 : 1.2 });
    pts.push(B, C);
    const em = refract(up, [0, 1], n, 1);
    out.push([C, em, k === 0 ? 2.4 : 1]);
    p = C;
  }
  const names = ['I1 (faint)', 'I2 (brightest)', 'I3 (fainter)'];
  const imgs = [];
  out.forEach(([P, em, w], k) => {
    s += ray(P, add(P, mul(em, 95)), { w, c: k === 1 ? RED : 'var(--diagram-red)' });
    const back = mul(em, -1);
    const I = add(P, mul(back, (P[0] - O[0]) / -back[0]));
    imgs.push(I);
    s += S.line(P[0], P[1], I[0], I[1], { c: MUT, w: 1, dash: '3 3' }) + S.circle(I[0], I[1], 3, { fill: MUT, c: MUT }) + lab(I[0] - 8, I[1] + 4, names[k], { size: 10, a: 'end' });
  });
  s += S.line(O[0], O[1], O[0], imgs[2][1], { c: MUT, w: 1, dash: '1 4' });
  s += lab(250, 30, 'parallel rays to the eye', { size: 10 });
  const angs = out.map(([, em]) => angTo(em, [0, -1]));
  const gap = out[2][0][0] - out[1][0][0];
  const r = angTo(t1, [0, 1]);
  check(angs.every((a) => near(a, i, 1e-9)) && near(gap, 2 * tPx * Math.tan(r * D), 1e-9) && near(out[1][0][0] - out[0][0][0], gap, 1e-9), `thick mirror: all three rays leave the front face at ${i} degrees (parallel), spaced ${gap.toFixed(2)} px = 2 t tan r along the surface; image depths ${imgs.map((I) => (I[1] - front).toFixed(0)).join(', ')} px below the front face`);
  return svgDoc(420, 300, 'A thick glass plane mirror silvered at the back, with a point object O in front of it. A ray from O is partly reflected at the front glass surface, giving a faint image. Most of the light enters the glass, is reflected by the silvered back and comes out, giving the brightest image. Light partly reflected again inside the glass gives fainter images further back. The rays reaching the eye are parallel.', s);
})();

// ---------------------------------------------------------------- real and apparent depth
export const DEPTH = (() => {
  const surf = 90;
  const h = 150;
  const n = 4 / 3;
  const r = 12;
  const O = [190, surf + h];
  const e = Math.asin(n * Math.sin(r * D)) / D;
  let s = S.rect(30, surf, 320, h + 25, { fill: BLUE, fop: 0.12, c: 'none' }) + S.line(30, surf, 350, surf, { w: 1.5, c: BLUE });
  s += lab(300, surf + 18, 'water', { size: 11, c: BLUE }) + lab(40, surf - 10, 'air', { size: 11 });
  const hits = [];
  for (const side of [-1, 1]) {
    const P = [O[0] + side * h * Math.tan(r * D), surf];
    const em = [side * Math.sin(e * D), -Math.cos(e * D)];
    hits.push([P, em]);
    s += ray(O, P) + ray(P, add(P, mul(em, 62)));
    s += S.line(P[0], P[1] - 34, P[0], P[1] + 30, { c: MUT, w: 1, dash: '4 3' });
  }
  const I = meet(hits[0][0], hits[0][1], hits[1][0], hits[1][1]);
  for (const [P] of hits) s += S.line(P[0], P[1], I[0], I[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.circle(O[0], O[1], 5, { fill: 'var(--diagram-yellow)', c: 'var(--diagram-brown)' }) + lab(O[0] + 10, O[1] + 4, 'O: coin (real position)', { size: 10 });
  s += S.circle(I[0], I[1], 4, { fill: MUT, c: MUT }) + lab(I[0] + 10, I[1] + 4, 'I: image (apparent position)', { size: 10 });
  s += S.line(60, surf, 60, O[1], { c: ACC, w: 1 }) + S.line(55, O[1], 65, O[1], { c: ACC, w: 1 }) + lab(54, (surf + O[1]) / 2, 'real depth', { size: 10, a: 'end', c: ACC });
  s += S.line(95, surf, 95, I[1], { c: GREEN, w: 1 }) + S.line(90, I[1], 100, I[1], { c: GREEN, w: 1 }) + lab(100, I[1] + 16, 'apparent depth', { size: 10, c: GREEN });
  s += lab(190, 16, 'eye looking down from above', { size: 10, a: 'middle' });
  s += lab(255, 70, 'bends away from the normal', { size: 10, c: ACC });
  const app = I[1] - surf;
  check(near(I[0], O[0], 1e-9) && near(app / (h / n), 1, 0.03) && near(Math.sin(e * D) / Math.sin(r * D), n, 1e-9), `real and apparent depth: rays at ${r} degrees in water leave at ${e.toFixed(2)} degrees; produced back they meet ${app.toFixed(1)} px below the surface, within 3 percent of real depth / n = ${(h / n).toFixed(1)} px, vertically above O`);
  return svgDoc(380, 280, 'A coin O lies at the bottom of water. Two rays from it reach the surface and bend away from the normal as they pass into air. Produced backwards, the emergent rays meet at I, above O. The eye sees the coin at I, so the apparent depth is less than the real depth.', s);
})();

// ---------------------------------------------------------------- refraction through a triangular prism
export const PRISM_DATA = (() => {
  const n = 1.5;
  const A = 60;
  const i = 48;
  const P = [200, 30];
  const side = 210;
  const Q = [P[0] - side / 2, P[1] + side * Math.sin(A * D)];
  const R = [P[0] + side / 2, Q[1]];
  const M = add(P, mul(sub(Q, P), 0.45));
  const inL = [Math.cos(30 * D), Math.sin(30 * D)]; // inward normal of the left face
  const d = [Math.cos((30 - i) * D), Math.sin((30 - i) * D)];
  const t1 = refract(d, mul(inL, -1), 1, n);
  const H = meet(M, t1, P, unit(sub(R, P)));
  const inR = [-Math.cos(30 * D), Math.sin(30 * D)]; // inward normal of the right face
  const t2 = refract(t1, inR, n, 1);
  const r1 = angTo(t1, inL);
  const r2 = angTo(t1, inR);
  const e = angTo(t2, inR);
  const dev = deg(Math.acos(dot(d, t2)));
  return { n, A, i, P, Q, R, M, H, d, t1, t2, r1, r2, e, dev, inL, inR };
})();
export const PRISM = (() => {
  const { n, A, i, P, Q, R, M, H, d, t1, t2, r1, r2, e, dev, inL, inR } = PRISM_DATA;
  let s = S.path(`M${P[0]} ${P[1]} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)} L${R[0].toFixed(1)} ${R[1].toFixed(1)} Z`, { fill: FILL, fop: 0.6, w: 1.5 });
  s += S.line(M[0] - inL[0] * 45, M[1] - inL[1] * 45, M[0] + inL[0] * 35, M[1] + inL[1] * 35, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(H[0] - inR[0] * 45, H[1] - inR[1] * 45, H[0] + inR[0] * 35, H[1] + inR[1] * 35, { c: MUT, w: 1, dash: '4 3' });
  s += ray(sub(M, mul(d, 110)), M) + ray(M, H) + ray(H, add(H, mul(t2, 110)));
  const X = meet(M, d, H, t2);
  s += S.line(M[0], M[1], X[0] + d[0] * 40, X[1] + d[1] * 40, { c: MUT, w: 1, dash: '4 3' }) + S.line(H[0], H[1], X[0], X[1], { c: MUT, w: 1, dash: '4 3' });
  s += arc(X, 30, ang(d), ang(t2)) + lab(X[0] + 34, X[1] + 12, 'δ', { size: 13, c: ACC, it: true });
  s += lab(P[0], P[1] + 32, 'A', { size: 12, a: 'middle', w: 'bold' }) + arc(P, 18, (60 * Math.PI) / 180, (120 * Math.PI) / 180);
  const bi = unit(add(mul(inL, -1), mul(d, -1)));
  const be = unit(add(mul(inR, -1), t2));
  s += arc(M, 24, ang(mul(d, -1)), ang(mul(inL, -1))) + arc(H, 24, ang(mul(inR, -1)), ang(t2));
  s += lab(M[0] + bi[0] * 38 - 4, M[1] + bi[1] * 38 + 4, 'i', { size: 13, it: true, c: ACC }) + lab(M[0] + 18, M[1] + 8, 'r₁', { size: 12, it: true, c: ACC });
  s += lab(H[0] - 30, H[1] + 10, 'r₂', { size: 12, it: true, c: ACC }) + lab(H[0] + be[0] * 38, H[1] + be[1] * 38 + 4, 'e', { size: 13, it: true, c: ACC });
  s += lab(200, Q[1] + 18, 'base', { size: 10, a: 'middle', c: MUT });
  s += lab(10, 252, `A = ${A}°, n = ${n}: i = ${i}°, e = ${e.toFixed(1)}°, deviation δ = ${dev.toFixed(1)}° (bent towards the base)`, { size: 10 });
  check(near(r1 + r2, A, 1e-6) && near(dev, i + e - A, 1e-6) && near(Math.sin(i * D) / Math.sin(r1 * D), n, 1e-9) && near(Math.sin(e * D) / Math.sin(r2 * D), n, 1e-9), `prism: r1 = ${r1.toFixed(2)}, r2 = ${r2.toFixed(2)} (sum ${A}), e = ${e.toFixed(2)}, deviation ${dev.toFixed(2)} = i + e - A; Snell holds at both faces`);
  return svgDoc(420, 262, `A ray passes through an equilateral glass prism of angle ${A} degrees. It enters the left face at an angle of incidence of ${i} degrees, bends towards the normal, crosses the prism almost parallel to the base, and bends away from the normal as it leaves the right face at about ${Math.round(e)} degrees. The emergent ray is turned towards the base; the angle of deviation between the incident ray produced and the emergent ray is about ${Math.round(dev)} degrees.`, s);
})();

// ---------------------------------------------------------------- critical angle and total internal reflection
export const TIR = (() => {
  const n = 1.5;
  const C = Math.asin(1 / n) / D;
  const surf = 80;
  const S0 = [120, 205];
  const depth = S0[1] - surf;
  let s = S.rect(20, surf, 400, 140, { fill: FILL, fop: 0.6, c: 'none' }) + S.line(20, surf, 420, surf, { w: 1.5 });
  s += lab(28, 30, 'air (rarer)', { size: 11 }) + lab(240, 214, 'glass, n = 1.5 (denser)', { size: 11 });
  s += S.circle(S0[0], S0[1], 4, { fill: BLUE, c: BLUE }) + lab(S0[0] - 8, S0[1] + 4, 'S', { size: 12, a: 'end', w: 'bold' });
  const res = [];
  const cases = [{ a: 25, tag: '1' }, { a: C, tag: '2' }, { a: 62, tag: '3' }];
  for (const cs of cases) {
    const d = [Math.sin(cs.a * D), -Math.cos(cs.a * D)];
    const P = add(S0, mul(d, depth / Math.cos(cs.a * D)));
    s += ray(S0, P, { w: 1.6 });
    s += S.line(P[0], P[1] - 40, P[0], P[1] + 30, { c: MUT, w: 1, dash: '4 3' });
    const t = refract(d, [0, 1], n, 1);
    const rf = reflect(d, [0, 1]);
    res.push({ cs, P, t, rf });
    if (t && cs.tag === '1') s += ray(P, add(P, mul(t, 70)), { w: 1.6 }) + ray(P, add(P, mul(rf, 50)), { c: MUT, w: 1, dash: '4 3' });
    else if (cs.tag === '2') s += ray(P, add(P, [80, 0]), { w: 1.6 });
    else s += ray(P, add(P, mul(rf, 70)), { w: 2.2 });
  }
  s += lab(res[0].P[0] + 30, 26, '1: i < C, refracted out', { size: 10 });
  s += lab(res[1].P[0] + 6, surf - 8, '2: i = C, r = 90°', { size: 10 });
  s += lab(425, 46, '3: i > C, totally reflected', { size: 10, a: 'end' });
  s += lab(240, 236, `critical angle C = ${C.toFixed(1)}° (sin C = 1 / 1.5)`, { size: 10, c: ACC });
  const e1 = angTo(res[0].t, [0, 1]);
  const grazing = Math.sin(C * D) * n;
  check(near(Math.sin(e1 * D) / Math.sin(25 * D), n, 1e-9) && near(grazing, 1, 1e-12) && res[2].t === null && 62 > C, `TIR: ray at 25 degrees leaves at ${e1.toFixed(2)} degrees; at C = ${C.toFixed(2)} degrees n sin C = 1 (grazing); at 62 degrees no refracted ray exists (total internal reflection)`);
  return svgDoc(430, 245, `Three rays from a point S inside glass of refractive index 1.5 meet the glass to air surface. Ray 1, at a small angle, refracts out into air bending away from the normal, with a weak reflection. Ray 2 meets the surface at the critical angle, about ${Math.round(C)} degrees, and the refracted ray grazes along the surface. Ray 3, at a larger angle, is totally reflected back into the glass.`, s);
})();

// ---------------------------------------------------------------- totally reflecting prisms (90 and 180 degrees)
export const TIR_PRISMS = (() => {
  const n = 1.5;
  const C = Math.asin(1 / n) / D;
  let s = '';
  // (a) right angle at (40, 180), hypotenuse from (40, 40) to (180, 180)
  s += S.path('M40 40 L40 180 L180 180 Z', { fill: FILL, fop: 0.6 });
  const hypA = unit([1, 1]);
  const nA = unit([1, -1]);
  const a0 = [0, 140];
  const a1 = [140, 140];
  const da = reflect([1, 0], nA);
  const a2 = add(a1, mul(da, 60));
  s += ray(a0, a1) + ray(a1, a2);
  s += lab(110, 216, '(a) turned through 90°', { size: 11, a: 'middle' });
  s += lab(146, 130, '45°', { size: 10, c: ACC });
  // (b) hypotenuse on top from (230, 60) to (390, 60), right angle at (310, 140)
  s += S.path('M230 60 L390 60 L310 140 Z', { fill: FILL, fop: 0.6 });
  const b0 = [260, 10];
  const b1 = [260, 90];
  const n1 = unit([1, -1]);
  const db1 = reflect([0, 1], n1);
  const b2 = [360, 90];
  const n2 = unit([1, 1]);
  const db2 = reflect(db1, n2);
  const b3 = [360, 10];
  s += ray(b0, b1) + ray(b1, b2) + ray(b2, b3);
  s += lab(310, 165, '(b) turned through 180°', { size: 11, a: 'middle' });
  s += lab(310, 40, 'hypotenuse face', { size: 10, a: 'middle', c: MUT });
  s += lab(20, 236, `Glass n = 1.5: angle of incidence 45° > critical angle ${C.toFixed(1)}°, so each reflection is total`, { size: 10 });
  const incA = angTo([1, 0], nA);
  const incB1 = angTo([0, 1], n1);
  const incB2 = angTo(db1, n2);
  check(near(incA, 45, 1e-9) && near(incB1, 45, 1e-9) && near(incB2, 45, 1e-9) && 45 > C && near(dot(da, [1, 0]), 0, 1e-12) && near(dot(db2, [0, 1]), -1, 1e-12) && near(dot(hypA, nA), 0, 1e-12) && db1[0] > 0.999, `TIR prisms: every face is met at 45 degrees (> C = ${C.toFixed(2)}); prism (a) turns the ray through 90 degrees, prism (b) reverses it (180 degrees)`);
  return svgDoc(430, 246, 'Two right-angled isosceles glass prisms used as total reflectors. In prism (a) light enters one short face normally, meets the hypotenuse face at 45 degrees, is totally reflected and leaves the other short face, turned through 90 degrees. In prism (b) light enters the hypotenuse face normally, is totally reflected at each short face in turn and comes back out of the hypotenuse face, turned through 180 degrees.', s);
})();
