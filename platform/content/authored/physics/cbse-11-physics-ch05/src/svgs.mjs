// ch05 diagrams, all drawn from numbers with self-checks: a rope force at an angle (components), the sign of work,
// the area under an F–x graph, energy bars along a roller-coaster track, a spring at three extensions, one-dimensional
// elastic and perfectly inelastic collisions, and an equal-mass elastic collision in two dimensions.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, dot, elastic, ke, R6 } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const t1 = (n) => (Math.round(n * 10) / 10).toFixed(1);

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- TOW: a rope force at an angle (2 px per N, 8 px per m)
export const TOW_DATA = { F: 50, c: 0.8, s: 0.6, d: 15, pxN: 2, pxM: 8 };
export const TOW = (() => {
  const { F, c, s, d, pxN, pxM } = TOW_DATA;
  const th = Math.atan2(s, c);
  const Fc = R6(F * c);
  const Fs = R6(F * s);
  const w = 420;
  const h = 215;
  const gy = 148;
  const bx = 150; // bow of the boat (point where the rope is tied)
  const by = 126;
  const tipx = bx + F * pxN * Math.cos(th);
  const tipy = by - F * pxN * Math.sin(th);
  let o = S.line(20, gy, 400, gy, { c: MUT, w: 1.2 });
  // boat hull
  o += S.path(`M48 ${by - 14} L${bx} ${by - 14} L${bx - 14} ${gy - 2} L62 ${gy - 2} Z`, { fill: FILL, w: 1.6 });
  o += S.rect(76, by - 34, 36, 20, { fill: FILL, w: 1.2 }) + S.text(100, gy - 26, 'boat', { a: 'middle', size: 10 });
  // components, then the rope force
  o += S.line(bx, by, bx + F * c * pxN, by, { c: GRN, w: 1.6, dash: '4 3' }) + S.line(bx + F * c * pxN, by, tipx, tipy, { c: GRN, w: 1.6, dash: '4 3' });
  o += S.arrow(bx, by, tipx, tipy, { c: BLUE, w: 2.4, size: 8 });
  o += S.path(`M${f1(bx + 26)} ${by} A26 26 0 0 0 ${f1(bx + 26 * c)} ${f1(by - 26 * s)}`, { c: MUT, w: 1 });
  o += S.text(bx + 30, by - 6, 'θ = 37°', { size: 10 });
  o += S.text(tipx + 6, tipy + 4, 'F = 50 N', { size: 11, c: BLUE, w: 'bold' });
  o += S.text(bx + (F * c * pxN) / 2, by + 15, `F cos θ = ${Fc} N`, { a: 'middle', size: 10, c: GRN });
  o += S.text(tipx + 6, (by + tipy) / 2 + 10, `F sin θ = ${Fs} N`, { size: 10, c: GRN });
  // displacement
  o += S.arrow(56, gy + 26, 56 + d * pxM, gy + 26, { c: RED, w: 2, size: 7 }) + S.text(56 + (d * pxM) / 2, gy + 42, `displacement d = ${d} m (8 px per m)`, { a: 'middle', size: 10, c: RED });
  o += S.text(w - 6, 24, `W = (F cos θ) d = ${Fc} × ${d} = ${R6(Fc * d)} J`, { a: 'end', size: 11, w: 'bold' });
  o += S.text(w - 6, 40, 'F sin θ is at 90° to d: no work', { a: 'end', size: 10 });
  const dxp = tipx - bx;
  const dyp = by - tipy;
  const ok = near(Math.hypot(dxp, dyp) / pxN, F, 1e-9) && near(dxp / pxN, F * c, 1e-9) && near(dyp / pxN, F * s, 1e-9) && near(dot([dxp / pxN, dyp / pxN], [1, 0]) * d, F * c * d, 1e-9);
  check(ok && R6(Fc * d) === 600, `tow: rope arrow ${F} N at θ = ${(th * 180 / Math.PI).toFixed(2)}° has components ${Fc} N and ${Fs} N drawn to 2 px per N; W = F·d = ${R6(Fc * d)} J`);
  return svgDoc(w, h, 'A boat on a canal is hauled along the bank by a rope pulling with 50 newtons at 37 degrees above the direction of motion; the part of the force along the motion is 40 newtons, the part across it is 30 newtons, and the work over a displacement of 15 metres is 600 joules', o);
})();

// ---------------------------------------------------------------- SIGNS: work is positive, zero or negative with the angle
export const SIGNS_DATA = { F: 10, d: 5, angles: [40, 90, 150] };
export const SIGNS = (() => {
  const { F, d, angles } = SIGNS_DATA;
  const w = 420;
  const h = 200;
  let o = '';
  let ok = true;
  const note = [];
  angles.forEach((deg, i) => {
    const x0 = 20 + i * 134;
    const gy = 100;
    const th = (deg * Math.PI) / 180;
    const bx = x0 + 22;
    o += S.rect(bx, gy - 26, 40, 26, { fill: FILL }) + S.line(x0, gy, x0 + 124, gy, { c: MUT, w: 1.2 });
    o += S.arrow(bx + 20, gy + 16, bx + 20 + d * 10, gy + 16, { c: RED, w: 1.8, size: 6 }) + S.text(bx + 20 + d * 5, gy + 30, 'd', { a: 'middle', size: 10, c: RED });
    const len = 46;
    const sx = bx + 20;
    const sy = gy - 13;
    const ex = sx + len * Math.cos(th);
    const ey = sy - len * Math.sin(th);
    o += S.arrow(sx, sy, ex, ey, { c: BLUE, w: 2.2, size: 7 }) + S.text(ex + (ex >= sx ? 4 : -4), ey - 2, 'F', { a: ex >= sx ? 'start' : 'end', size: 11, c: BLUE, w: 'bold' });
    const cosv = R6(Math.cos(th));
    const W = R6(F * d * Math.cos(th));
    o += S.text(x0 + 62, 20, `θ = ${deg}°`, { a: 'middle', size: 11, w: 'bold' });
    o += S.text(x0 + 62, 150, `cos θ = ${cosv < 0 ? '−' : ''}${Math.abs(cosv).toFixed(2)}`, { a: 'middle', size: 10 });
    o += S.text(x0 + 62, 166, `W = ${W < 0 ? '−' : W > 0 ? '+' : ''}${Math.abs(W).toFixed(1)} J`, { a: 'middle', size: 11, w: 'bold', c: W > 0 ? GRN : W < 0 ? RED : 'currentColor' });
    o += S.text(x0 + 62, 184, deg < 90 ? 'positive work' : deg === 90 ? 'zero work' : 'negative work', { a: 'middle', size: 10 });
    const along = ex - sx; // component of F on the direction of d (screen x)
    const sign = deg < 90 ? along > 0 : deg === 90 ? Math.abs(along) < 1e-6 : along < 0;
    if (!sign || (Math.sign(W) !== Math.sign(along) && Math.abs(along) > 1e-6)) ok = false;
    note.push(`${deg}° → ${W} J`);
  });
  check(ok, `signs: F = ${F} N, d = ${d} m at 40°, 90°, 150° gives ${note.join(', ')}; the drawn force has a positive, zero and negative component along d`);
  return svgDoc(w, h, 'Three cases of a force of 10 newtons acting on a block that moves 5 metres to the right: at 40 degrees to the motion the work is positive 38.3 joules, at 90 degrees it is zero, and at 150 degrees it is negative 43.3 joules', o);
})();

// ---------------------------------------------------------------- FXAREA: a handcart pushed with a force that is constant and then falls to zero
export const FX_DATA = { F0: 20, x1: 3, x2: 7, sx: 40, sy: 6 };
export const FXAREA = (() => {
  const { F0, x1, x2, sx, sy } = FX_DATA;
  const w = 420;
  const h = 235;
  const ox = 50;
  const oy = 190;
  const P = (x, F) => [ox + sx * x, oy - sy * F];
  let o = S.arrow(ox, oy, ox + sx * x2 + 40, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - sy * F0 - 28, { w: 1.5 });
  o += S.text(ox + sx * x2 + 40, oy + 14, 'x (m)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - sy * F0 - 30, 'F (N)', { size: 10 });
  const [ax, ay] = P(0, F0);
  const [bx] = P(x1, F0);
  const [cx] = P(x2, 0);
  o += S.rect(ax, ay, bx - ax, oy - ay, { c: BLUE, fill: BLUE, fop: 0.22, sw: 1 });
  o += S.path(`M${f1(bx)} ${f1(ay)} L${f1(cx)} ${f1(oy)} L${f1(bx)} ${f1(oy)} Z`, { c: GRN, fill: GRN, fop: 0.22, w: 1 });
  o += S.path(`M${f1(ax)} ${f1(ay)} L${f1(bx)} ${f1(ay)} L${f1(cx)} ${f1(oy)}`, { c: RED, w: 2.6 });
  for (let x = 0; x <= x2; x++) o += S.line(ox + sx * x, oy - 3, ox + sx * x, oy + 3) + S.text(ox + sx * x, oy + 16, String(x), { a: 'middle', size: 10 });
  for (const F of [10, 20]) o += S.line(ox - 3, oy - sy * F, ox + 3, oy - sy * F) + S.text(ox - 7, oy - sy * F + 4, String(F), { a: 'end', size: 10 });
  const A1 = F0 * x1;
  const A2 = 0.5 * (x2 - x1) * F0;
  o += S.text((ax + bx) / 2, oy - (oy - ay) / 2 + 4, `${F0} × ${x1} = ${A1} J`, { a: 'middle', size: 11, c: BLUE, w: 'bold' });
  o += S.text(bx + 18, oy - 28, `½ × ${x2 - x1} × ${F0} = ${A2} J`, { size: 11, c: GRN, w: 'bold' });
  o += S.text(w - 6, 30, `W = area = ${A1} + ${A2} = ${A1 + A2} J`, { a: 'end', size: 12, w: 'bold' });
  o += S.text(w - 6, 47, 'scale: 1 m = 40 px, 10 N = 60 px', { a: 'end', size: 10 });
  const pxArea = (bx - ax) * (oy - ay) + 0.5 * (cx - bx) * (oy - ay);
  const phys = pxArea / (sx * sy);
  check(near(phys, A1 + A2, 1e-9) && A1 + A2 === 100, `fx-area: drawn rectangle + triangle = ${phys.toFixed(2)} J = ${A1} + ${A2}; the force falls to zero at x = ${x2} m`);
  return svgDoc(w, h, 'A force against distance graph for a handcart: a steady 20 newtons for the first 3 metres, then a straight fall to zero at 7 metres; the area under it is a rectangle of 60 joules plus a triangle of 40 joules, so the work done is 100 joules', o);
})();

// ---------------------------------------------------------------- BARS: energy along a roller-coaster track (mass 300 kg, start from rest at 20 m)
export const BARS_DATA = { m: 300, hA: 20, hB: 5, hC: 0, pxPerKJ: 1.0 };
export const BARS = (() => {
  const { m, hA, hB, pxPerKJ } = BARS_DATA;
  const w = 420;
  const h = 250;
  const base = 112; // screen y of h = 0
  const pxM = 3.5;
  const track = (x) => (x <= 300 ? 10 * (1 + Math.cos((Math.PI * (x - 40)) / 260)) : 12 * ((1 - Math.cos((Math.PI * (x - 300)) / 100)) / 2));
  const xAt = (hh) => 40 + (260 / Math.PI) * Math.acos(hh / 10 - 1);
  const pts = [];
  for (let x = 40; x <= 400; x += 5) pts.push(`${x === 40 ? 'M' : 'L'}${x} ${f1(base - pxM * track(x))}`);
  let o = S.path(pts.join(' '), { w: 2.4 }) + S.line(20, base, 410, base, { c: MUT, w: 1, dash: '3 3' });
  o += S.text(412, base + 15, 'h = 0 level', { a: 'end', size: 10, c: MUT });
  const stops = [
    { name: 'A', x: 40, h: hA },
    { name: 'B', x: xAt(hB), h: hB },
    { name: 'C', x: 300, h: 0 },
  ];
  const E = m * g * hA; // J
  let ok = true;
  const log = [];
  stops.forEach((p, i) => {
    const U = m * g * p.h;
    const v = Math.sqrt(2 * g * (hA - p.h));
    const K = 0.5 * m * v * v;
    const cy = base - pxM * track(p.x);
    o += S.circle(p.x, cy - 6, 6, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.text(p.x + (i === 0 ? -2 : 0), cy - 18, p.name, { a: 'middle', size: 11, w: 'bold' });
    const bx = 62 + i * 120;
    const by = 232;
    const Uh = (U / 1000) * pxPerKJ;
    const Kh = (K / 1000) * pxPerKJ;
    o += S.rect(bx, by - Uh, 26, Uh, { c: BLUE, fill: BLUE, fop: 0.35, sw: 1 }) + S.rect(bx + 26, by - Kh, 26, Kh, { c: RED, fill: RED, fop: 0.35, sw: 1 });
    o += S.line(bx - 6, by - (E / 1000) * pxPerKJ, bx + 58, by - (E / 1000) * pxPerKJ, { c: MUT, w: 1, dash: '3 3' });
    o += S.text(bx + 26, by + 12, `h = ${p.h} m, v = ${t1(v)} m/s`, { a: 'middle', size: 10 });
    o += S.text(bx + 13, by - Uh - 3, t1(U / 1000), { a: 'middle', size: 10, c: BLUE });
    o += S.text(bx + 39, by - Kh - 3, t1(K / 1000), { a: 'middle', size: 10, c: RED });
    if (!near(U + K, E, 1e-9) || !near(track(p.x), p.h, 1e-6)) ok = false;
    log.push(`${p.name}: U ${t1(U / 1000)} + K ${t1(K / 1000)} kJ`);
  });
  o += S.rect(240, 8, 10, 10, { c: BLUE, fill: BLUE, fop: 0.35, sw: 1 }) + S.text(254, 17, 'U = m g h (kJ)', { size: 10 });
  o += S.rect(240, 24, 10, 10, { c: RED, fill: RED, fop: 0.35, sw: 1 }) + S.text(254, 33, 'K = ½ m v² (kJ)', { size: 10 });
  o += S.text(240, 50, 'dashed line: total 58.8 kJ', { size: 10 });
  check(ok && near(E / 1000, 58.8, 1e-9), `bars: car of ${m} kg released from rest at A (${hA} m): U + K = ${(E / 1000).toFixed(1)} kJ at A, B (${hB} m) and C (0 m): ${log.join('; ')}; points drawn on the track curve`);
  return svgDoc(w, h, 'A 300 kilogram roller-coaster car starts from rest at a height of 20 metres; bar charts at three points on the track show potential energy turning into kinetic energy while the total stays 58.8 kilojoules: 58.8 potential at the top, 14.7 potential plus 44.1 kinetic at 5 metres, and 58.8 kinetic at the bottom', o);
})();

// ---------------------------------------------------------------- SPRING: a block on a spring at x = 0, compressed and stretched (400 px per m)
export const SPRING_DATA = { k: 800, x: 0.15, L0: 0.3, pxM: 400, pxN: 0.3 };
export const SPRING = (() => {
  const { k, x, L0, pxM, pxN } = SPRING_DATA;
  const w = 420;
  const h = 250;
  const wall = 30;
  const bw = 34;
  const coil = (xa, xb, y, n = 9) => {
    let d = `M${f1(xa)} ${y}`;
    const seg = (xb - xa - 12) / n;
    d += ` L${f1(xa + 6)} ${y}`;
    for (let i = 0; i < n; i++) d += ` L${f1(xa + 6 + seg * (i + 0.25))} ${y - 8} L${f1(xa + 6 + seg * (i + 0.75))} ${y + 8}`;
    d += ` L${f1(xb - 6)} ${y} L${f1(xb)} ${y}`;
    return S.path(d, { w: 1.6 });
  };
  const rows = [
    { name: 'relaxed: x = 0', xx: 0, y: 40 },
    { name: `compressed: x = −${x} m`, xx: -x, y: 112 },
    { name: `stretched: x = +${x} m`, xx: x, y: 184 },
  ];
  const natX = wall + L0 * pxM; // block face at natural length: 0.30 m = 120 px from the wall
  let o = '';
  let ok = true;
  const U0 = 0.5 * k * x * x;
  const facePx = [];
  for (const rw of rows) {
    const face = natX + rw.xx * pxM;
    facePx.push(face);
    o += S.line(wall, rw.y + bw / 2 + 2, 400, rw.y + bw / 2 + 2, { c: MUT, w: 1 }) + S.rect(wall - 8, rw.y - 12, 8, bw + 14, { fill: FILL });
    o += coil(wall, face, rw.y + bw / 2 - 6);
    o += S.rect(face, rw.y - 2, bw, bw - 4, { fill: FILL, w: 1.6 });
    o += S.line(natX, rw.y - 12, natX, rw.y + bw + 6, { c: MUT, w: 1, dash: '3 3' });
    const Fs = -k * rw.xx; // spring force on the block, N
    if (Fs !== 0) o += S.arrow(face + bw / 2, rw.y - 8, face + bw / 2 + Fs * pxN, rw.y - 8, { c: RED, w: 2, size: 6 });
    o += S.text(256, rw.y - 4, rw.name, { size: 11, w: 'bold' });
    o += S.text(256, rw.y + 12, Fs === 0 ? 'F = 0, U = 0' : `F = ${Fs > 0 ? '+' : '−'}${Math.abs(Fs)} N, U = ½kx² = ${(0.5 * k * rw.xx * rw.xx).toFixed(1)} J`, { size: 10 });
    if (rw.xx !== 0 && (Math.sign(Fs) === Math.sign(rw.xx) || !near(0.5 * k * rw.xx * rw.xx, U0, 1e-9))) ok = false;
  }
  o += S.text(w - 6, h - 6, `k = ${k} N/m; 400 px per m from the dashed line; red arrow: spring force`, { a: 'end', size: 10 });
  const dc = natX - facePx[1];
  const ds = facePx[2] - natX;
  check(ok && near(dc / pxM, x, 1e-9) && near(ds, dc, 1e-9) && near(U0, 9, 1e-9), `spring: compression and stretch both drawn ${(dc / pxM).toFixed(2)} m from the dashed line; force opposes the displacement (±${k * x} N); U = ½kx² = ${U0.toFixed(1)} J in both`);
  return svgDoc(w, h, 'A block on a frictionless table fixed to a wall by a spring of stiffness 800 newtons per metre: at natural length the force and energy are zero; compressed by 0.15 metres the spring pushes with 120 newtons and stores 9 joules; stretched by 0.15 metres it pulls with 120 newtons and stores the same 9 joules', o);
})();

// ---------------------------------------------------------------- COLL_EL: two one-dimensional elastic collisions (20 px per m/s)
export const COLLEL_DATA = { cases: [{ m1: 2, u1: 3, m2: 2, u2: 0 }, { m1: 3, u1: 4, m2: 1, u2: 0 }], px: 20 };
export const COLLEL = (() => {
  const { cases, px } = COLLEL_DATA;
  const w = 420;
  const h = 300;
  let o = '';
  let ok = true;
  const log = [];
  cases.forEach((cs, ci) => {
    const y0 = 14 + ci * 148;
    const [v1, v2] = elastic(cs.m1, cs.u1, cs.m2, cs.u2);
    const rowsDef = [
      { lab: 'before', a: cs.u1, b: cs.u2, y: y0 + 34 },
      { lab: 'after', a: v1, b: v2, y: y0 + 98 },
    ];
    o += S.text(10, y0 + 6, `Case ${'AB'[ci]}: ${cs.m1} kg at ${cs.u1} m/s hits ${cs.m2} kg at rest`, { size: 11, w: 'bold' });
    const bw1 = 14 + 8 * cs.m1;
    const bw2 = 14 + 8 * cs.m2;
    for (const r of rowsDef) {
      const xa = 80;
      const xb = 215;
      o += S.line(14, r.y + 28, 406, r.y + 28, { c: MUT, w: 1 });
      o += S.rect(xa, r.y, bw1, 28, { fill: BLUE, c: BLUE, fop: 0.25 }) + S.text(xa + bw1 / 2, r.y + 18, `${cs.m1}`, { a: 'middle', size: 11 });
      o += S.rect(xb, r.y, bw2, 28, { fill: RED, c: RED, fop: 0.25 }) + S.text(xb + bw2 / 2, r.y + 18, `${cs.m2}`, { a: 'middle', size: 11 });
      if (Math.abs(r.a) > 1e-9) o += S.arrow(xa + bw1, r.y - 8, xa + bw1 + r.a * px, r.y - 8, { c: BLUE, w: 2, size: 6 });
      if (Math.abs(r.b) > 1e-9) o += S.arrow(xb + bw2, r.y - 8, xb + bw2 + r.b * px, r.y - 8, { c: RED, w: 2, size: 6 });
      const P = cs.m1 * r.a + cs.m2 * r.b;
      const K = ke(cs.m1, r.a) + ke(cs.m2, r.b);
      o += S.text(14, r.y + 16, r.lab, { size: 10, c: MUT });
      o += S.text(w - 8, r.y + 10, `v = ${R6(r.a)}, ${R6(r.b)} m/s`, { a: 'end', size: 10 });
      o += S.text(w - 8, r.y + 24, `p = ${R6(P)} kg m/s, K = ${R6(K)} J`, { a: 'end', size: 10, w: 'bold' });
    }
    const p0 = cs.m1 * cs.u1 + cs.m2 * cs.u2;
    const p1 = cs.m1 * v1 + cs.m2 * v2;
    const k0 = ke(cs.m1, cs.u1) + ke(cs.m2, cs.u2);
    const k1 = ke(cs.m1, v1) + ke(cs.m2, v2);
    if (!near(p0, p1, 1e-9) || !near(k0, k1, 1e-9)) ok = false;
    if (cs.m1 === cs.m2 && !(near(v1, cs.u2, 1e-9) && near(v2, cs.u1, 1e-9))) ok = false;
    log.push(`${'AB'[ci]}: p ${R6(p0)} → ${R6(p1)}, K ${R6(k0)} → ${R6(k1)}, v′ = ${R6(v1)}, ${R6(v2)}`);
  });
  check(ok, `coll-el: momentum and kinetic energy are both conserved in both cases (${log.join('; ')}); equal masses exchange velocities`);
  return svgDoc(w, h, 'Two elastic collisions on a straight track: in case A a 2 kilogram trolley at 3 metres per second hits an equal trolley at rest and stops while the other moves off at 3 metres per second; in case B a 3 kilogram trolley at 4 metres per second hits a 1 kilogram trolley at rest and the two move at 2 and 6 metres per second; momentum and kinetic energy are the same before and after', o);
})();

// ---------------------------------------------------------------- COLL_IN: a perfectly inelastic collision between two goods wagons
export const COLLIN_DATA = { m1: 30000, u1: 2.0, m2: 20000, u2: 0, px: 36 };
export const COLLIN = (() => {
  const { m1, u1, m2, u2, px } = COLLIN_DATA;
  const w = 420;
  const h = 235;
  const V = (m1 * u1 + m2 * u2) / (m1 + m2);
  const K0 = ke(m1, u1) + ke(m2, u2);
  const K1 = ke(m1 + m2, V);
  const lost = K0 - K1;
  let o = '';
  const draw = (y, lab, parts, arrows) => {
    o += S.line(14, y + 36, 406, y + 36, { c: MUT, w: 1.2 }) + S.text(14, y + 10, lab, { size: 10, c: MUT });
    for (const [x, ww, col, txt] of parts) o += S.rect(x, y + 6, ww, 30, { c: col, fill: col, fop: 0.25 }) + S.text(x + ww / 2, y + 26, txt, { a: 'middle', size: 11 });
    for (const [x, v, col] of arrows) o += S.arrow(x, y - 4, x + v * px, y - 4, { c: col, w: 2, size: 6 });
  };
  draw(30, 'before', [[110, 90, BLUE, '30 t'], [260, 60, RED, '20 t']], [[200, u1, BLUE]]);
  draw(104, 'after (coupled)', [[110, 90, BLUE, '30 t'], [200, 60, RED, '20 t']], [[260, V, GRN]]);
  o += S.text(14, 168, `before: p = ${m1} × ${u1} = ${R6(m1 * u1)} kg m/s,  K = ${R6(K0 / 1000)} kJ`, { size: 11 });
  o += S.text(14, 186, `after:  p = ${m1 + m2} × ${V} = ${R6((m1 + m2) * V)} kg m/s,  K = ${R6(K1 / 1000)} kJ`, { size: 11 });
  o += S.text(14, 208, `momentum is conserved; kinetic energy lost = ${R6(lost / 1000)} kJ (${R6((100 * lost) / K0)} % of the initial K)`, { size: 11, w: 'bold', c: RED });
  check(near(m1 * u1 + m2 * u2, (m1 + m2) * V, 1e-9) && near(V, 1.2, 1e-9) && near(lost, 24000, 1e-9), `coll-in: coupled wagons move at ${V} m/s; momentum ${m1 * u1} kg m/s before and after; kinetic energy ${R6(K0 / 1000)} → ${R6(K1 / 1000)} kJ, lost ${R6(lost / 1000)} kJ`);
  return svgDoc(w, h, 'A 30 tonne goods wagon at 2 metres per second couples with a 20 tonne wagon at rest and the two move together at 1.2 metres per second; the momentum of 60 000 kilogram metres per second is unchanged but the kinetic energy falls from 60 kilojoules to 36 kilojoules', o);
})();

// ---------------------------------------------------------------- COLL2D: equal masses, elastic, target at rest, glancing
export const COLL2D_DATA = { m: 0.17, v: 4.0, deg: 30, px: 28 };
export const COLL2D = (() => {
  const { m, v, deg, px } = COLL2D_DATA;
  const w = 420;
  const h = 240;
  const th = (deg * Math.PI) / 180;
  const v1 = v * Math.cos(th);
  const v2 = v * Math.sin(th);
  const cx = 185;
  const cy = 120;
  let o = S.arrow(cx - v * px - 40, cy, cx - 12, cy, { c: BLUE, w: 2.4, size: 7 }) + S.text(cx - v * px - 40, cy - 12, `before: ${v} m/s`, { size: 10, c: BLUE });
  o += S.circle(cx, cy, 12, { fill: BLUE, c: BLUE, fop: 0.3 }) + S.circle(cx + 22, cy + 6, 12, { fill: RED, c: RED, fop: 0.3, dash: '3 2' });
  const a1 = [v1 * Math.cos(th), -v1 * Math.sin(th)]; // ball 1 goes up on screen
  const a2 = [v2 * Math.sin(th), v2 * Math.cos(th)]; // ball 2 goes down on screen, at 90° to ball 1
  o += S.arrow(cx + 14, cy - 6, cx + 14 + a1[0] * px, cy - 6 + a1[1] * px, { c: BLUE, w: 2.4, size: 7 });
  o += S.arrow(cx + 24, cy + 18, cx + 24 + a2[0] * px, cy + 18 + a2[1] * px, { c: RED, w: 2.4, size: 7 });
  o += S.text(cx + 14 + a1[0] * px + 6, cy - 6 + a1[1] * px - 2, `${v1.toFixed(2)} m/s at ${deg}°`, { size: 10, c: BLUE });
  o += S.text(cx + 24 + a2[0] * px + 6, cy + 18 + a2[1] * px + 12, `${v2.toFixed(2)} m/s at ${90 - deg}°`, { size: 10, c: RED });
  o += S.text(w - 6, 20, 'two equal balls, elastic, second ball at rest', { a: 'end', size: 10 });
  o += S.text(w - 6, 36, 'the paths after the collision are at 90°', { a: 'end', size: 11, w: 'bold' });
  o += S.text(14, h - 22, `x-momentum: ${m * v} kg m/s = ${m} × ${v1.toFixed(2)} cos ${deg}° + ${m} × ${v2.toFixed(2)} cos ${90 - deg}°`, { size: 10 });
  o += S.text(14, h - 6, `K: ½ × ${m} × ${v}² = ${(0.5 * m * v * v).toFixed(2)} J = ½ × ${m} × ${v1.toFixed(2)}² + ½ × ${m} × ${v2.toFixed(2)}²`, { size: 10 });
  const px0 = m * v;
  const pxAfter = m * (v1 * Math.cos(th) + v2 * Math.sin(th));
  const pyAfter = m * (-v1 * Math.sin(th) + v2 * Math.cos(th));
  const K0 = 0.5 * m * v * v;
  const K1 = 0.5 * m * (v1 * v1 + v2 * v2);
  check(near(px0, pxAfter, 1e-9) && Math.abs(pyAfter) < 1e-9 && near(K0, K1, 1e-9) && Math.abs(dot(a1, a2)) < 1e-9, `coll-2d: components of momentum conserved (${px0.toFixed(3)} along x, ${pyAfter.toExponential(1)} across); K ${K0.toFixed(3)} J before and after; drawn velocity vectors at ${deg}° and ${90 - deg}° have zero dot product`);
  return svgDoc(w, h, 'A glancing elastic collision between two equal balls, the second at rest: the first arrives at 4 metres per second and leaves at 3.46 metres per second at 30 degrees to its original line, while the second leaves at 2.00 metres per second at 60 degrees on the other side, so the two paths are at right angles', o);
})();

export const ALL = { TOW, SIGNS, FXAREA, BARS, SPRING, COLLEL, COLLIN, COLL2D };
