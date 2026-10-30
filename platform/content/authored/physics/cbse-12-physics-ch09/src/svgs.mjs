// ch09 diagrams. Mirror and lens ray diagrams come from optics.mjs (computed from the mirror/lens formula). The other
// figures are computed with Snell's law (total internal reflection, optical fibre, prism) or with the lens formula
// (microscope, telescope), and checked in SELF_CHECKS (read by build.mjs).
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { mirrorDiagram, lensDiagram, lensImage } from './optics.mjs';

const RAY = 'var(--diagram-red)';
const IMG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (d) => (d * Math.PI) / 180;
const todeg = (r) => (r * 180) / Math.PI;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- mirrors and lenses (worked-example geometry, scaled)
export const M_CONCAVE = mirrorDiagram({ type: 'concave', u: -100, f: 60, label: 'Concave mirror with the object between C and F: the reflected rays meet beyond C, giving a real, inverted, enlarged image' });
export const M_CONVEX = mirrorDiagram({ type: 'convex', u: -90, f: 60, label: 'Convex mirror: reflected rays diverge as if from a point behind the mirror, giving a virtual, erect, diminished image' });
export const L_CONVEX = lensDiagram({ type: 'convex', u: -90, f: 60, label: 'Convex lens with the object between F and 2F: the refracted rays meet beyond 2F on the other side, giving a real, inverted, enlarged image' });
export const L_CONCAVE = lensDiagram({ type: 'concave', u: -90, f: 60, label: 'Concave lens: the refracted rays diverge as if from a point on the object side, giving a virtual, erect, diminished image' });
check(lensImage(-90, 60).v > 0 && lensImage(-90, -60).v < 0, 'lens diagrams: convex image real (v > 0), concave image virtual (v < 0) for u = −90, |f| = 60');

// ---------------------------------------------------------------- total internal reflection from a point in water
export const TIR = (() => {
  const n = 1.33;
  const C = Math.asin(1 / n);
  const w = 420;
  const h = 230;
  const surf = 90;
  const O = [210, 200];
  let s = S.rect(0, surf, w, h - surf, { c: 'none', sw: 0, fill: NEGFILL(), fop: 0.15 });
  s += S.line(0, surf, w, surf, { c: MUT, w: 1.5 }) + S.text(8, surf - 8, 'air (n = 1)', { size: 10 }) + S.text(8, surf + 16, 'water (n = 1.33)', { size: 10 });
  s += S.circle(O[0], O[1], 4, { c: 'currentColor', fill: 'currentColor' }) + S.text(O[0] + 8, O[1] + 4, 'O', { w: 'bold' });
  const angles = [20, todeg(C), 62];
  const depth = O[1] - surf;
  let okAll = true;
  angles.forEach((a, k) => {
    for (const sgn of [-1, 1]) {
      const x = O[0] + sgn * depth * Math.tan(deg(a));
      s += S.line(O[0], O[1], x, surf, { c: RAY, w: 1.5 }) + S.midHead(O[0], O[1], x, surf, { c: RAY, size: 6 });
      if (k === 0) {
        const r = Math.asin(n * Math.sin(deg(a)));
        s += S.arrow(x, surf, x + sgn * 70 * Math.sin(r), surf - 70 * Math.cos(r), { c: RAY, w: 1.5, size: 6 });
        okAll = okAll && Math.abs(Math.sin(r) - n * Math.sin(deg(a))) < 1e-9;
      } else if (k === 1) {
        s += S.arrow(x, surf, x + sgn * 70, surf, { c: ACC, w: 1.8, size: 6 });
      } else {
        s += S.arrow(x, surf, x + sgn * 50 * Math.sin(deg(a)), surf + 50 * Math.cos(deg(a)), { c: IMG, w: 1.5, size: 6 });
      }
    }
  });
  s += S.line(O[0], surf - 60, O[0], h, { c: MUT, w: 1, dash: '4 3' });
  s += S.text(w - 6, 18, `critical angle C = ${todeg(C).toFixed(1)}° (sin C = 1/n)`, { a: 'end', size: 11, w: 'bold' });
  s += S.text(w - 6, 36, 'i < C: refracts out · i = C: grazes · i > C: totally reflected', { a: 'end', size: 10 });
  check(okAll && Math.abs(Math.sin(C) * n - 1) < 1e-12, `TIR: refracted ray obeys Snell’s law; critical angle for water ${todeg(C).toFixed(1)}°`);
  return svgDoc(w, h, 'Rays from a point under water meeting the surface at increasing angles: below the critical angle of about 48.8 degrees they refract out, bending away from the normal; at the critical angle the refracted ray grazes the surface; beyond it the light is totally reflected back into the water', s);
})();
function NEGFILL() {
  return 'var(--diagram-blue)';
}

// ---------------------------------------------------------------- optical fibre
export const FIBRE = (() => {
  const n1 = 1.5;
  const n2 = 1.4;
  const Cc = Math.asin(n2 / n1);
  const w = 420;
  const h = 160;
  const top = 50;
  const bot = 110;
  let s = S.rect(10, 30, 400, 100, { c: MUT, sw: 1, fill: FILL, fop: 0.5 }) + S.rect(10, top, 400, bot - top, { c: ACC, sw: 1.2, fill: GRN, fop: 0.12 });
  s += S.text(14, 26, `cladding n₂ = ${n2}`, { size: 10 }) + S.text(14, top + 14, `core n₁ = ${n1}`, { size: 10 });
  const inc = deg(72); // angle of incidence at the core wall
  const dx = (bot - top) * Math.tan(inc);
  let x = 30;
  let y = bot;
  let d = `M${f1(x)} ${f1(y)}`;
  let goingUp = true;
  while (x + dx < 400) {
    x += dx;
    y = goingUp ? top : bot;
    d += ` L${f1(x)} ${f1(y)}`;
    goingUp = !goingUp;
  }
  s += S.path(d, { c: RAY, w: 1.6 });
  s += S.text(210, 150, `each reflection at ${todeg(inc).toFixed(0)}° > critical angle ${todeg(Cc).toFixed(1)}°`, { a: 'middle', size: 10 });
  check(inc > Cc, `fibre: angle of incidence at the core–cladding boundary (${todeg(inc).toFixed(0)}°) exceeds the critical angle (${todeg(Cc).toFixed(1)}°), so every reflection is total`);
  return svgDoc(w, h, 'An optical fibre: light travels along the glass core by repeated total internal reflection at the boundary with the cladding of lower refractive index, because it always meets the boundary at more than the critical angle', s);
})();

// ---------------------------------------------------------------- prism at minimum deviation (A = 60°, n = 1.5)
export const PRISM_DATA = (() => {
  const A = 60;
  const n = 1.5;
  const r = A / 2;
  const i = todeg(Math.asin(n * Math.sin(deg(r))));
  return { A, n, r, i, dmin: 2 * i - A };
})();
export const PRISM = (() => {
  const { A, n, i, dmin } = PRISM_DATA;
  const w = 400;
  const h = 260;
  const apex = [200, 30];
  const side = 220;
  const L = [apex[0] - side * Math.sin(deg(A / 2)), apex[1] + side * Math.cos(deg(A / 2))];
  const R = [apex[0] + side * Math.sin(deg(A / 2)), apex[1] + side * Math.cos(deg(A / 2))];
  let s = S.path(`M${f1(apex[0])} ${f1(apex[1])} L${f1(L[0])} ${f1(L[1])} L${f1(R[0])} ${f1(R[1])} Z`, { c: ACC, w: 1.6, fill: FILL, fop: 0.5 });
  // entry point at 45% down the left face; at minimum deviation the ray inside is parallel to the base
  const t = 0.45;
  const P = [apex[0] + (L[0] - apex[0]) * t, apex[1] + (L[1] - apex[1]) * t];
  const Q = [apex[0] + (R[0] - apex[0]) * t, P[1]];
  // outward normal of the left face (pointing up-left)
  const nL = [-Math.cos(deg(A / 2)), -Math.sin(deg(A / 2))];
  const nR = [Math.cos(deg(A / 2)), -Math.sin(deg(A / 2))];
  // incident ray direction: angle i to the inward normal (−nL), rotated so the ray comes from the lower left
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const dIn = rot([-nL[0], -nL[1]], -deg(i)); // screen coords: positive rotation is clockwise on screen; the incident direction lies beyond the inside ray from the normal
  const start = [P[0] - 110 * dIn[0], P[1] - 110 * dIn[1]];
  const dOut = rot([nR[0], nR[1]], deg(i));
  const end = [Q[0] + 110 * dOut[0], Q[1] + 110 * dOut[1]];
  s += S.line(start[0], start[1], P[0], P[1], { c: RAY, w: 1.8 }) + S.midHead(start[0], start[1], P[0], P[1], { c: RAY });
  s += S.line(P[0], P[1], Q[0], Q[1], { c: RAY, w: 1.8 }) + S.midHead(P[0], P[1], Q[0], Q[1], { c: RAY });
  s += S.line(Q[0], Q[1], end[0], end[1], { c: RAY, w: 1.8 }) + S.midHead(Q[0], Q[1], end[0], end[1], { c: RAY });
  s += S.line(P[0] + 40 * nL[0], P[1] + 40 * nL[1], P[0] - 40 * nL[0], P[1] - 40 * nL[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.line(Q[0] + 40 * nR[0], Q[1] + 40 * nR[1], Q[0] - 40 * nR[0], Q[1] - 40 * nR[1], { c: MUT, w: 1, dash: '4 3' });
  s += S.text(apex[0], apex[1] + 30, 'A', { a: 'middle', w: 'bold' });
  s += S.text(20, 240, `A = ${A}°, n = ${n}: at minimum deviation i = e = ${i.toFixed(1)}°, r = ${A / 2}°, δmin = ${dmin.toFixed(1)}°`, { size: 10 });
  // checks: the inside ray is horizontal; Snell at the left face; deviation equals the angle between in and out directions
  const insideAng = Math.acos((-nL[0] * 1 + -nL[1] * 0));
  const devDrawn = todeg(Math.acos(dIn[0] * dOut[0] + dIn[1] * dOut[1]));
  check(Math.abs(todeg(insideAng) - A / 2) < 1e-9 && Math.abs(Math.sin(deg(i)) - n * Math.sin(deg(A / 2))) < 1e-12, `prism: inside ray parallel to the base makes r = ${A / 2}° with the normal and Snell gives i = ${i.toFixed(1)}°`);
  check(Math.abs(devDrawn - dmin) < 1e-6, `prism: drawn deviation ${devDrawn.toFixed(2)}° equals δmin = 2i − A = ${dmin.toFixed(2)}°`);
  return svgDoc(w, h, 'A ray passing symmetrically through a 60 degree glass prism at minimum deviation: inside the prism it travels parallel to the base, the angles of incidence and emergence are equal, and the total deviation is about 37.2 degrees', s);
})();

/** Deviation δ(i) for the same prism (for the δ–i graph). */
export function deviation(iDeg, A = 60, n = 1.5) {
  const r1 = Math.asin(Math.sin(deg(iDeg)) / n);
  const r2 = deg(A) - r1;
  const se = n * Math.sin(r2);
  if (se > 1) return null;
  return iDeg + todeg(Math.asin(se)) - A;
}

// ---------------------------------------------------------------- compound microscope (computed, schematic scale)
export const MICRO = (() => {
  const fo = 30;
  const fe = 60;
  const u = -45;
  const h = 8;
  const vo = lensImage(u, fo).v; // 120
  const mo = vo / u;
  const xo = 125; // objective position on screen
  const I1 = [xo + vo, -mo * h * -1];
  const xe = xo + vo + 45; // eyepiece 45 px beyond the intermediate image (inside fe)
  const ue = -(xe - (xo + vo));
  const { v: ve, m: me } = lensImage(ue, fe);
  const hi1 = mo * h;
  const hi2 = me * hi1;
  const w = 440;
  const h0 = 90;
  const T = (x, y) => [x, h0 - y];
  let s = S.line(0, h0, w, h0, { c: MUT, w: 1, dash: '5 4' });
  const lens = (x, half, lab) => S.ellipse(...T(x, 0), 6, half, { c: ACC, sw: 1.6, fill: FILL, fop: 0.4 }) + S.text(T(x, 0)[0], T(x, half)[1] - 6, lab, { a: 'middle', size: 10 });
  s += lens(xo, 30, 'objective') + lens(xe, 60, 'eyepiece');
  const obj = (x, y, c, dash) => S.line(...T(x, 0), ...T(x, y), { c, w: 2, dash }) + S.head(...T(x, y), y > 0 ? -Math.PI / 2 : Math.PI / 2, { c, size: 7 });
  s += obj(xo + u, h, 'currentColor') + obj(xo + vo, hi1, IMG) + obj(xe + ve, hi2, IMG, '4 3');
  // ray 1: parallel from object tip → objective → through F' → intermediate image tip → eyepiece → appears from final image tip
  const tip = [xo + u, h];
  const Ptop = [xo, h];
  const I1tip = [xo + vo, hi1];
  const dir = [I1tip[0] - Ptop[0], I1tip[1] - Ptop[1]];
  const tE = (xe - Ptop[0]) / dir[0];
  const Pe = [xe, Ptop[1] + tE * dir[1]];
  const Ffinal = [xe + ve, hi2];
  const out = [Pe[0] - Ffinal[0], Pe[1] - Ffinal[1]];
  const k = 120 / Math.hypot(...out);
  s += S.line(...T(...tip), ...T(...Ptop), { c: RAY, w: 1.4 }) + S.line(...T(...Ptop), ...T(...Pe), { c: RAY, w: 1.4 }) + S.line(...T(...Pe), ...T(Pe[0] + out[0] * k, Pe[1] + out[1] * k), { c: RAY, w: 1.4 });
  s += S.line(...T(...Pe), ...T(...Ffinal), { c: RAY, w: 1, dash: '3 3' });
  // ray 2: object tip through objective centre
  const dir2 = [xo - tip[0], 0 - tip[1]];
  const t2 = (xe - xo) / dir2[0];
  const Pe2 = [xe, t2 * dir2[1]];
  const out2 = [Pe2[0] - Ffinal[0], Pe2[1] - Ffinal[1]];
  const k2 = 120 / Math.hypot(...out2);
  s += S.line(...T(...tip), ...T(...Pe2), { c: RAY, w: 1.4 }) + S.line(...T(...Pe2), ...T(Pe2[0] + out2[0] * k2, Pe2[1] + out2[1] * k2), { c: RAY, w: 1.4 }) + S.line(...T(...Pe2), ...T(...Ffinal), { c: RAY, w: 1, dash: '3 3' });
  s += S.text(T(xo + u, 0)[0], h0 + 16, 'object', { a: 'middle', size: 10 }) + S.text(T(xo + vo, 0)[0] + 4, h0 + 30, 'first image', { a: 'middle', size: 10 }) + S.text(T(xe + ve, 0)[0], h0 - hi2 + 12, 'final image (virtual)', { a: 'middle', size: 10 });
  // checks: ray through the objective centre passes through the intermediate image tip; the intermediate image lies inside fe
  const yAtI1 = tip[1] + ((xo + vo - tip[0]) / dir2[0]) * dir2[1];
  check(Math.abs(yAtI1 - hi1) < 1e-9 && -ue < fe && ve < 0, 'microscope: both rays meet at the computed first image, which lies inside the eyepiece focal length, so the final image is virtual and magnified');
  void I1;
  return svgDoc(w, 230, 'Compound microscope: the objective forms a real, inverted, enlarged image of a small object; this image lies just inside the focal length of the eyepiece, which acts as a magnifier and forms a large virtual final image', s);
})();

// ---------------------------------------------------------------- astronomical telescope in normal adjustment
export const TELESCOPE = (() => {
  const fo = 200;
  const fe = 50;
  const w = 440;
  const h0 = 110;
  const xo = 80;
  const xe = xo + fo + fe;
  const a = deg(6);
  const T = (x, y) => [x, h0 - y];
  let s = S.line(0, h0, w, h0, { c: MUT, w: 1, dash: '5 4' });
  s += S.ellipse(...T(xo, 0), 6, 50, { c: ACC, sw: 1.6, fill: FILL, fop: 0.4 }) + S.ellipse(...T(xe, 0), 5, 30, { c: ACC, sw: 1.6, fill: FILL, fop: 0.4 });
  s += S.text(xo, h0 - 58, 'objective (fo)', { a: 'middle', size: 10 }) + S.text(xe, h0 - 38, 'eyepiece (fe)', { a: 'middle', size: 10 });
  const yI = -fo * Math.tan(a); // image of a star above the axis forms below the axis in the focal plane
  const If = [xo + fo, yI];
  for (const y0 of [30, 0, -30]) {
    const start = [xo - 70, y0 + 70 * Math.tan(a)];
    s += S.line(...T(...start), ...T(xo, y0), { c: RAY, w: 1.3 }) + S.line(...T(xo, y0), ...T(...If), { c: RAY, w: 1.3 });
    // after the image the ray continues to the eyepiece, then leaves parallel to the line from If through the eyepiece centre
    const d = [If[0] - xo, If[1] - y0];
    const t = (xe - If[0]) / d[0];
    const Pe = [xe, If[1] + t * d[1]];
    const outDir = [xe - If[0], 0 - If[1]];
    const k = 80 / Math.hypot(...outDir);
    s += S.line(...T(...If), ...T(...Pe), { c: RAY, w: 1.3 }) + S.line(...T(...Pe), ...T(Pe[0] + outDir[0] * k, Pe[1] + outDir[1] * k), { c: RAY, w: 1.3 });
  }
  s += S.line(...T(...If), ...T(If[0], 0), { c: IMG, w: 2 }) + S.text(T(...If)[0] + 4, T(...If)[1] + 14, 'image at the common focus', { size: 10 });
  const beta = Math.atan(-yI / fe);
  check(Math.abs(Math.tan(beta) / Math.tan(a) - fo / fe) < 1e-9, `telescope: angular magnification tan β / tan α = fo/fe = ${fo / fe}`);
  s += S.text(220, 226, `normal adjustment: tube length fo + fe, m = fo/fe = ${fo / fe}`, { a: 'middle', size: 10 });
  return svgDoc(w, 236, 'Astronomical telescope in normal adjustment: parallel rays from a distant star are focused by the objective to an image at its focal point, which is also the focus of the eyepiece; the eyepiece sends the rays out parallel again at a larger angle, so the star appears magnified by fo over fe', s);
})();

// ---------------------------------------------------------------- refraction at a spherical surface (worked example: u = −30, R = +10, n = 1.5 → v = +90)
export const SPHERE_DATA = (() => {
  const n1 = 1;
  const n2 = 1.5;
  const u = -30;
  const R = 10;
  const v = n2 / ((n2 - n1) / R + n1 / u);
  return { n1, n2, u, R, v };
})();
export const SPHERICAL = (() => {
  const { u, R, v } = SPHERE_DATA;
  const k = 3; // px per cm
  const w = 440;
  const h0 = 110;
  const xP = 130;
  const T = (x, y) => [xP + x * k, h0 - y * k];
  let s = S.line(0, h0, w, h0, { c: MUT, w: 1, dash: '5 4' });
  // surface: arc of radius R centred at C (x = R)
  const C = R;
  const arc = (yy) => C - Math.sqrt(R * R - yy * yy);
  let d = '';
  for (let yy = -8; yy <= 8.0001; yy += 0.5) d += `${d ? ' L' : 'M'}${f1(T(arc(yy), yy)[0])} ${f1(T(arc(yy), yy)[1])}`;
  s += S.path(d, { c: ACC, w: 2 });
  s += S.rect(T(arc(8), 8)[0], T(0, 8)[1], w - T(arc(8), 8)[0], 16 * k, { c: 'none', sw: 0, fill: IMG, fop: 0.08 });
  s += S.text(T(-8, 0)[0], h0 - 34, 'air, n₁ = 1', { size: 10 }) + S.text(T(40, 0)[0], h0 - 34, 'glass, n₂ = 1.5', { size: 10 });
  const pt = (x, lab) => S.circle(...T(x, 0), 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(T(x, 0)[0], h0 + 16, lab, { a: 'middle', size: 10 });
  s += pt(u, 'O (u = −30 cm)') + pt(C, 'C') + pt(v, 'I (v = +90 cm)');
  // a ray from O to the surface at height y = 5 cm, then to I
  const yy = 2.5;
  const N = [arc(yy), yy];
  s += S.line(...T(u, 0), ...T(...N), { c: RAY, w: 1.6 }) + S.midHead(...T(u, 0), ...T(...N), { c: RAY });
  s += S.line(...T(...N), ...T(v, 0), { c: RAY, w: 1.6 }) + S.midHead(...T(...N), ...T(v, 0), { c: RAY });
  s += S.line(...T(C, 0), ...T(N[0] - (C - N[0]) * 0.8, N[1] + (N[1] - 0) * 0.8 * -1 + 0), { c: MUT, w: 1, dash: '3 3' });
  // check Snell's law at the hit point (paraxial ray: the exact check is within a few per cent at this height)
  const nrm = [(N[0] - C) / R, N[1] / R];
  const din = [N[0] - u, N[1]];
  const dout = [v - N[0], -N[1]];
  const sinA = (a, b) => Math.abs(a[0] * b[1] - a[1] * b[0]) / Math.hypot(...a) / Math.hypot(...b);
  const ratio = (1 * sinA(din, nrm)) / (1.5 * sinA(dout, nrm));
  check(Math.abs(ratio - 1) < 0.03, `spherical surface: the drawn ray obeys Snell’s law within ${(Math.abs(ratio - 1) * 100).toFixed(1)}% (paraxial approximation) and meets the axis at v = ${Math.round(v)} cm`);
  return svgDoc(w, 150, 'Refraction at a convex spherical glass surface: a ray from a point object O 30 centimetres in front of a surface of radius 10 centimetres bends towards the normal through the centre C and meets the axis at the image I, 90 centimetres inside the glass', s);
})();

export const ALL = { M_CONCAVE, M_CONVEX, L_CONVEX, L_CONCAVE, TIR, FIBRE, PRISM, MICRO, TELESCOPE, SPHERICAL };
