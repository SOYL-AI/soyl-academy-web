// ISC 11 ch08 diagrams, all drawn from numbers with self-checks: a force at an angle to the displacement (work = F S cos θ), a variable
// force and the area under its F–S graph, the spring force graph (area = ½kx²), a spring stretched and compressed, a falling stone with
// energy bars, a swinging pendulum, a roller-coaster track with speeds from energy, and a block-spring oscillator with energy bars.
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, trapz, piecewise } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const d1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const d2 = (n) => (Math.round(n * 100) / 100).toFixed(2);
const d3 = (n) => (Math.round(n * 1000) / 1000).toFixed(3);
const d0 = (n) => String(Math.round(n));

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const pd = (pts) => `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];

// ---------------------------------------------------------------- TOW: a luggage trolley pulled by a strap at an angle (1.5 px per N, 20 px per m)
export const TOW_DATA = { F: 90, th: 35, S: 12, pxN: 1.5, pxM: 20 };
TOW_DATA.Fx = TOW_DATA.F * Math.cos(rad(TOW_DATA.th));
TOW_DATA.Fy = TOW_DATA.F * Math.sin(rad(TOW_DATA.th));
TOW_DATA.W = TOW_DATA.Fx * TOW_DATA.S;
export const TOW = (() => {
  const { F, th, S: dist, pxN, pxM, Fx, Fy, W } = TOW_DATA;
  const w = 430;
  const h = 215;
  const gy = 152;
  const H = [140, 112]; // handle, where the strap is tied
  const t = rad(th);
  const tip = [H[0] + F * pxN * Math.cos(t), H[1] - F * pxN * Math.sin(t)];
  let o = S.line(20, gy, 410, gy, { c: MUT, w: 1.4 });
  o += S.rect(50, 104, 90, 40, { fill: FILL, fop: 0.6, w: 1.6 });
  o += S.text(95, 128, 'trolley', { a: 'middle', size: 11 });
  o += S.circle(68, 146, 6, { fill: FILL }) + S.circle(122, 146, 6, { fill: FILL });
  o += S.line(H[0] + F * pxN * Math.cos(t), H[1], tip[0], tip[1], { c: GRN, w: 1.6, dash: '4 3' });
  o += S.line(H[0], H[1], H[0] + F * pxN * Math.cos(t), H[1], { c: GRN, w: 1.6, dash: '4 3' });
  o += S.arrow(H[0], H[1], tip[0], tip[1], { c: BLUE, w: 2.4, size: 8 });
  o += S.path(`M${f1(H[0] + 30)} ${H[1]} A30 30 0 0 0 ${f1(H[0] + 30 * Math.cos(t))} ${f1(H[1] - 30 * Math.sin(t))}`, { c: MUT, w: 1 });
  o += S.text(H[0] + 36, H[1] - 4, `θ = ${th}°`, { size: 10 });
  o += S.text(tip[0] + 6, tip[1] + 4, `F = ${F} N`, { size: 11, c: BLUE, w: 'bold' });
  o += S.text(H[0] + (Fx * pxN) / 2, H[1] + 16, `F cos θ = ${d1(Fx)} N`, { a: 'middle', size: 10, c: GRN });
  o += S.text(tip[0] + 6, (H[1] + tip[1]) / 2 + 4, `F sin θ = ${d1(Fy)} N`, { size: 10, c: GRN });
  o += S.arrow(50, gy + 24, 50 + dist * pxM, gy + 24, { c: RED, w: 2, size: 7 });
  o += S.text(50 + (dist * pxM) / 2, gy + 40, `displacement S = ${dist} m (${pxM} px per m)`, { a: 'middle', size: 10, c: RED });
  o += S.text(w - 6, 18, `W = F S cos θ = ${d1(Fx)} × ${dist} = ${d1(W)} J`, { a: 'end', size: 12, w: 'bold' });
  o += S.text(w - 6, 208, 'F sin θ is perpendicular to S: it does no work', { a: 'end', size: 10 });
  const fv = [(tip[0] - H[0]) / pxN, (H[1] - tip[1]) / pxN]; // force in N (x right, y up)
  const sv = [dist, 0];
  check(near(Math.hypot(fv[0], fv[1]), F, 1e-9) && near(fv[0], Fx, 1e-9) && near(fv[1], Fy, 1e-9) && near(dot(fv, sv), W, 1e-9) && near(Math.atan2(fv[1], fv[0]), t, 1e-9), `tow: the strap arrow of ${F} N is drawn ${th}° above the displacement at ${pxN} px per N; its components are ${d1(Fx)} N and ${d1(Fy)} N; the dot product F·S = ${d1(dot(fv, sv))} J equals F S cos θ = ${d1(W)} J`);
  return svgDoc(w, h, `A luggage trolley pulled along a platform by a strap with a force of 90 newtons at 35 degrees above the direction of motion; the component along the motion is 73.7 newtons, the component across it is 51.6 newtons, the displacement is 12 metres and the work done is 884.7 joules`, o);
})();

// ---------------------------------------------------------------- FXAREA: a variable force and the area under its graph
export const FX_DATA = { pts: [[0, 0], [2, 30], [6, 30], [9, 10]], sx: 36, sy: 4.8 };
FX_DATA.areas = [30, 120, 60];
FX_DATA.W = FX_DATA.areas.reduce((a, b) => a + b, 0);
export const FXAREA = (() => {
  const { pts, sx, sy, areas, W } = FX_DATA;
  const w = 430;
  const h = 250;
  const ox = 52;
  const oy = 206;
  const P = ([x, F]) => [ox + sx * x, oy - sy * F];
  const [p0, p1, p2, p3] = pts.map(P);
  const base = (p) => [p[0], oy];
  let o = S.arrow(ox, oy, ox + sx * 9 + 36, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - sy * 30 - 26, { w: 1.5 });
  o += S.text(ox + sx * 9 + 36, oy + 28, 'S (m)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - sy * 30 - 26, 'F (N)', { size: 10 });
  o += S.path(`${pd([p0, p1, base(p1)])} Z`, { c: BLUE, fill: BLUE, fop: 0.25, w: 1 });
  o += S.path(`${pd([base(p1), p1, p2, base(p2)])} Z`, { c: GRN, fill: GRN, fop: 0.25, w: 1 });
  o += S.path(`${pd([base(p2), p2, p3, base(p3)])} Z`, { c: ACC, fill: ACC, fop: 0.25, w: 1 });
  o += S.path(pd([p0, p1, p2, p3]), { c: RED, w: 2.6 });
  for (let x = 0; x <= 9; x++) o += S.line(ox + sx * x, oy - 3, ox + sx * x, oy + 3) + S.text(ox + sx * x, oy + 16, String(x), { a: 'middle', size: 10 });
  for (const F of [10, 20, 30]) o += S.line(ox - 3, oy - sy * F, ox + 3, oy - sy * F) + S.text(ox - 7, oy - sy * F + 4, String(F), { a: 'end', size: 10 });
  for (const x of [2, 6, 9]) o += S.line(ox + sx * x, oy, ox + sx * x, oy - sy * piecewise(pts)(x), { c: MUT, w: 1, dash: '3 3' });
  o += S.text(ox + sx * 1.35, oy - 14, `${areas[0]} J`, { a: 'middle', size: 11, c: BLUE, w: 'bold' });
  o += S.text(ox + sx * 4, oy - sy * 15 + 4, `${areas[1]} J`, { a: 'middle', size: 12, c: GRN, w: 'bold' });
  o += S.text(ox + sx * 7.5, oy - sy * 7 + 4, `${areas[2]} J`, { a: 'middle', size: 11, c: ACC, w: 'bold' });
  o += S.text(w - 6, 20, `W = area = ${areas.join(' + ')} = ${W} J`, { a: 'end', size: 12, w: 'bold' });
  o += S.text(w - 6, 36, `scale: 1 m = ${sx} px, 10 N = ${d0(10 * sy)} px`, { a: 'end', size: 10 });
  const poly = (q) => {
    let a = 0;
    for (let i = 0; i < q.length; i++) {
      const [x0, y0] = q[i];
      const [x1, y1] = q[(i + 1) % q.length];
      a += x0 * y1 - x1 * y0;
    }
    return Math.abs(a) / 2 / (sx * sy);
  };
  const A1 = poly([p0, p1, base(p1)]);
  const A2 = poly([base(p1), p1, p2, base(p2)]);
  const A3 = poly([base(p2), p2, p3, base(p3)]);
  const num = trapz(piecewise(pts), 0, 9, 90000);
  check(near(A1, areas[0], 1e-9) && near(A2, areas[1], 1e-9) && near(A3, areas[2], 1e-9) && near(num, W, 1e-6), `fx-area: drawn triangle ${d1(A1)} J, rectangle ${d1(A2)} J and trapezium ${d1(A3)} J (pixel areas at ${sx} px per m and ${sy} px per N) add to ${d1(A1 + A2 + A3)} J; numerical integration of the force gives ${d1(num)} J`);
  return svgDoc(w, h, 'A force against displacement graph for a loaded handcart: the force rises steadily from zero to 30 newtons over the first 2 metres, stays at 30 newtons until 6 metres, then falls steadily to 10 newtons at 9 metres; the area under the graph is a triangle of 30 joules, a rectangle of 120 joules and a trapezium of 60 joules, so the work done is 210 joules', o);
})();

// ---------------------------------------------------------------- SPRING_AREA: F = kx and the area ½ k x²
export const SPA_DATA = { k: 500, x: 0.12, sx: 2400, sy: 2.6 };
SPA_DATA.F = SPA_DATA.k * SPA_DATA.x;
SPA_DATA.U = 0.5 * SPA_DATA.k * SPA_DATA.x ** 2;
export const SPRING_AREA = (() => {
  const { k, x, sx, sy, F, U } = SPA_DATA;
  const w = 430;
  const h = 236;
  const ox = 66;
  const oy = 196;
  const tip = [ox + sx * x, oy - sy * F];
  let o = S.arrow(ox, oy, ox + sx * 0.14 + 10, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - sy * 70 - 4, { w: 1.5 });
  o += S.text(ox + sx * 0.14 + 10, oy + 28, 'extension x (m)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - sy * 70, 'force F (N)', { size: 10 });
  o += S.path(`${pd([[ox, oy], tip, [tip[0], oy]])} Z`, { c: BLUE, fill: BLUE, fop: 0.22, w: 1 });
  const xs = 0.03; // strip kept left of the area label so the two never overlap
  const dx = 0.01;
  const strip = [[ox + sx * xs, oy], [ox + sx * xs, oy - sy * k * xs], [ox + sx * (xs + dx), oy - sy * k * (xs + dx)], [ox + sx * (xs + dx), oy]];
  o += S.path(`${pd(strip)} Z`, { c: ACC, fill: ACC, fop: 0.5, w: 1 });
  o += S.line(ox, oy, tip[0], tip[1], { c: RED, w: 2.6 });
  o += S.lead(ox + sx * (xs + 0.6 * dx), oy - 12, ox + sx * (xs + 0.6 * dx) + 20, oy - 38);
  o += S.text(ox + sx * (xs + 0.6 * dx) + 22, oy - 40, 'strip: F dx', { size: 10, c: ACC, w: 'bold' });
  for (const xv of [0.04, 0.08, 0.12]) o += S.line(ox + sx * xv, oy - 3, ox + sx * xv, oy + 3) + S.text(ox + sx * xv, oy + 16, d2(xv), { a: 'middle', size: 10 });
  for (const Fv of [20, 40, 60]) o += S.line(ox - 3, oy - sy * Fv, ox + 3, oy - sy * Fv) + S.text(ox - 7, oy - sy * Fv + 4, String(Fv), { a: 'end', size: 10 });
  o += S.line(ox, tip[1], tip[0], tip[1], { c: MUT, w: 1, dash: '3 3' });
  o += S.text(tip[0] + 6, tip[1] + 18, `(${x} m, ${F} N)`, { size: 10 });
  o += S.text(ox + sx * 0.116, oy - sy * 8 + 4, `area = ½ × ${x} × ${F} = ${d1(U)} J`, { a: 'end', size: 11, c: BLUE, w: 'bold' });
  o += S.text(w - 6, 18, `slope of the line = k = ${k} N m⁻¹`, { a: 'end', size: 11, w: 'bold' });
  o += S.text(w - 6, 34, 'work = area = ½ k x² = stored energy', { a: 'end', size: 10 });
  const area = (0.5 * (tip[0] - ox) * (oy - tip[1])) / (sx * sy);
  const slope = (oy - tip[1]) / sy / ((tip[0] - ox) / sx);
  const stripA = ((((oy - strip[1][1]) + (oy - strip[2][1])) / 2) * (strip[2][0] - strip[1][0])) / (sx * sy);
  check(near(area, U, 1e-9) && near(slope, k, 1e-9) && near(stripA, k * (xs + dx / 2) * dx, 1e-9), `spring-area: triangle area ${d3(area)} J = ½ k x² = ${d1(U)} J; slope ${d0(slope)} N m⁻¹; the strip at x = ${xs} m has area ${d3(stripA)} J = F dx`);
  return svgDoc(w, h, 'A graph of the spring force against extension for a spring of stiffness 500 newtons per metre: a straight line through the origin reaching 60 newtons at an extension of 0.12 metres; the shaded triangle under it has an area of 3.6 joules, which is the work done and the energy stored; a thin strip shows a small force times a small extension', o);
})();

// ---------------------------------------------------------------- SPRING: relaxed, compressed and stretched (k = 500 N/m, x = 0.12 m)
export const SPR_DATA = { k: 500, x: 0.12, L0: 0.3, pxM: 300, pxN: 1 };
export const SPRING = (() => {
  const { k, x, L0, pxM, pxN } = SPR_DATA;
  const w = 430;
  const h = 244;
  const wall = 30;
  const bw = 40;
  const coil = (xa, xb, y, n = 8) => {
    let d = `M${f1(xa)} ${y} L${f1(xa + 6)} ${y}`;
    const seg = (xb - xa - 12) / n;
    for (let i = 0; i < n; i++) d += ` L${f1(xa + 6 + seg * (i + 0.25))} ${y - 8} L${f1(xa + 6 + seg * (i + 0.75))} ${y + 8}`;
    return S.path(`${d} L${f1(xb - 6)} ${y} L${f1(xb)} ${y}`, { w: 1.6 });
  };
  const rows = [
    { name: 'relaxed: x = 0', xx: 0, y: 36 },
    { name: `compressed: x = −${x} m`, xx: -x, y: 106 },
    { name: `stretched: x = +${x} m`, xx: x, y: 176 },
  ];
  const natX = wall + L0 * pxM;
  const U0 = 0.5 * k * x * x;
  let o = '';
  let ok = true;
  const faces = [];
  for (const rw of rows) {
    const face = natX + rw.xx * pxM;
    faces.push(face);
    o += S.line(wall, rw.y + 32, 400, rw.y + 32, { c: MUT, w: 1 }) + S.rect(wall - 8, rw.y - 12, 8, 46, { fill: FILL });
    o += coil(wall, face, rw.y + 10);
    o += S.rect(face, rw.y - 2, bw, 30, { fill: FILL, w: 1.6 });
    o += S.line(natX, rw.y - 14, natX, rw.y + 38, { c: MUT, w: 1, dash: '3 3' });
    const Fs = -k * rw.xx;
    if (Fs !== 0) o += S.arrow(face + bw / 2, rw.y - 8, face + bw / 2 + Fs * pxN, rw.y - 8, { c: RED, w: 2, size: 6 });
    o += S.text(256, rw.y + 2, rw.name, { size: 11, w: 'bold' });
    o += S.text(256, rw.y + 18, Fs === 0 ? 'F = 0, U = 0' : `F = ${Fs > 0 ? '+' : '−'}${Math.abs(Fs)} N, U = ½kx² = ${d1(0.5 * k * rw.xx ** 2)} J`, { size: 10 });
    if (rw.xx !== 0 && (Math.sign(Fs) === Math.sign(rw.xx) || !near(0.5 * k * rw.xx ** 2, U0, 1e-9))) ok = false;
  }
  o += S.text(w - 6, h - 18, `k = ${k} N m⁻¹; ${pxM} px per m measured from the dashed line`, { a: 'end', size: 10 }) + S.text(w - 6, h - 4, 'red arrow: force of the spring (1 px per N)', { a: 'end', size: 10 });
  const dc = natX - faces[1];
  const ds = faces[2] - natX;
  check(ok && near(dc / pxM, x, 1e-9) && near(ds, dc, 1e-9) && near(U0, 3.6, 1e-9), `spring: compression and stretch both drawn ${d2(dc / pxM)} m from the dashed line; the force of ${k * x} N opposes the displacement in both; U = ½kx² = ${d1(U0)} J in both`);
  return svgDoc(w, h, 'A block on a smooth table joined to a wall by a spring of stiffness 500 newtons per metre. Relaxed, the force and energy are zero. Compressed by 0.12 metres the spring pushes the block with 60 newtons and stores 3.6 joules. Stretched by 0.12 metres it pulls with 60 newtons and stores the same 3.6 joules', o);
})();

// ---------------------------------------------------------------- FALL: a 2 kg stone dropped from 40 m; energy bars at five heights
export const FALL_DATA = { m: 2, H: 40, hs: [40, 30, 20, 10, 0], pxJ: 0.38 };
FALL_DATA.E = FALL_DATA.m * g * FALL_DATA.H;
export const FALL = (() => {
  const { m, H, hs, pxJ, E } = FALL_DATA;
  const w = 430;
  const h = 262;
  const x0 = 112;
  const yTop = 44;
  const yBot = 228;
  const Y = (hh) => yTop + ((H - hh) / H) * (yBot - yTop);
  let o = S.line(30, yTop - 14, 30, yBot + 8, { c: MUT, w: 1, dash: '3 3' }) + S.line(10, yBot + 16, 36, yBot + 16, { w: 2 });
  o += S.text(w - 6, 12, 'PE = mgh (blue)    KE = ½mv² (red)', { a: 'end', size: 11, w: 'bold' });
  let ok = true;
  const rows = [];
  hs.forEach((hh) => {
    const y = Y(hh);
    const pe = m * g * hh;
    const ke = E - pe;
    const v = Math.sqrt(2 * g * (H - hh));
    o += S.circle(30, y, 7, { c: BLUE, fill: BLUE, fop: 0.3 });
    o += S.text(42, y - 1, `h = ${hh} m`, { size: 10 });
    o += S.text(42, y + 11, `v = ${d1(v)} m s⁻¹`, { size: 10 });
    const lp = pe * pxJ;
    const lk = ke * pxJ;
    if (lp > 0) o += S.rect(x0, y - 9, lp, 18, { c: BLUE, fill: BLUE, fop: 0.35, sw: 1 });
    if (lk > 0) o += S.rect(x0 + lp, y - 9, lk, 18, { c: RED, fill: RED, fop: 0.35, sw: 1 });
    if (lp >= 44) o += S.text(x0 + lp / 2, y + 4, `${d0(pe)} J`, { a: 'middle', size: 10 });
    if (lk >= 44) o += S.text(x0 + lp + lk / 2, y + 4, `${d0(ke)} J`, { a: 'middle', size: 10 });
    rows.push({ hh, lp, lk, v, y });
    if (!near(lp + lk, E * pxJ, 1e-9)) ok = false;
  });
  o += S.line(x0 + E * pxJ, yTop - 12, x0 + E * pxJ, yBot + 12, { c: MUT, w: 1, dash: '3 3' });
  o += S.text(x0 + E * pxJ, yTop - 17, `total ${d0(E)} J at every height`, { a: 'end', size: 10, c: MUT });
  o += S.text(w - 6, h - 6, `m = ${m} kg, g = 9.8 m s⁻²; bar scale ${pxJ} px per joule; stone released from rest at the top`, { a: 'end', size: 10 });
  const okV = rows.every((q) => near(q.v * q.v, 2 * g * (H - q.hh), 1e-9)) && rows.every((q, i) => i === 0 || near(q.y - rows[0].y, ((H - q.hh) / H) * (yBot - yTop), 1e-9));
  check(ok && okV && near(rows[0].lk, 0, 1e-9) && near(rows[4].lp, 0, 1e-9), `fall: at all five heights the PE bar plus the KE bar is ${d1(E * pxJ)} px (${d0(E)} J); the PE bar is empty at the ground and the KE bar empty at the top; v² = 2g(drop) at every row; stone positions proportional to height`);
  return svgDoc(w, h, 'A 2 kilogram stone released from rest at the top of a 40 metre fall, shown at heights of 40, 30, 20, 10 and 0 metres. At each height a bar shows the potential energy in blue and the kinetic energy in red. The potential energy shrinks and the kinetic energy grows while the bar stays the same total length of 784 joules, and the speed reaches 28 metres per second at the ground', o);
})();

// ---------------------------------------------------------------- PEND: 1.5 m pendulum, bob 0.4 kg, released from 50 degrees
export const PEND_DATA = { L: 1.5, th0: 50, m: 0.4, pxL: 160 };
PEND_DATA.h = PEND_DATA.L * (1 - Math.cos(rad(PEND_DATA.th0)));
PEND_DATA.E = PEND_DATA.m * g * PEND_DATA.h;
PEND_DATA.v = Math.sqrt(2 * g * PEND_DATA.h);
export const PEND = (() => {
  const { L, th0, m, pxL, h: hh, E, v } = PEND_DATA;
  const w = 430;
  const ht = 250;
  const pv = [215, 24];
  const t = rad(th0);
  const A = [pv[0] - pxL * Math.sin(t), pv[1] + pxL * Math.cos(t)];
  const B = [pv[0], pv[1] + pxL];
  const C = [pv[0] + pxL * Math.sin(t), pv[1] + pxL * Math.cos(t)];
  let o = S.line(pv[0] - 30, pv[1] - 4, pv[0] + 30, pv[1] - 4, { w: 3 });
  o += S.path(`M${f1(A[0])} ${f1(A[1])} A${pxL} ${pxL} 0 0 0 ${f1(C[0])} ${f1(C[1])}`, { c: MUT, w: 1, dash: '4 3' });
  o += S.line(pv[0], pv[1], pv[0], B[1] + 12, { c: MUT, w: 1, dash: '3 3' });
  for (const P of [A, B, C]) o += S.line(pv[0], pv[1], P[0], P[1], { w: 1.4 }) + S.circle(P[0], P[1], 9, { c: BLUE, fill: BLUE, fop: 0.35, sw: 1.6 });
  o += S.path(`M${f1(pv[0])} ${f1(pv[1] + 40)} A40 40 0 0 1 ${f1(pv[0] - 40 * Math.sin(t))} ${f1(pv[1] + 40 * Math.cos(t))}`, { c: 'currentColor', w: 1 });
  o += S.text(pv[0] - 36, pv[1] + 72, `θ = ${th0}°`, { a: 'middle', size: 10 });
  o += S.line(40, B[1], 390, B[1], { c: MUT, w: 1, dash: '5 3' });
  o += S.text(40, B[1] + 12, 'reference level (lowest point)', { size: 10, c: MUT });
  o += S.arrow(70, B[1], 70, A[1], { c: GRN, w: 1.6, size: 6 }) + S.arrow(70, A[1], 70, B[1], { c: GRN, w: 1.6, size: 6 });
  o += S.line(70, A[1], A[0] - 9, A[1], { c: GRN, w: 1, dash: '3 3' });
  o += S.text(14, A[1] - 12, `h = ${d3(hh)} m`, { size: 10, c: GRN, w: 'bold' });
  o += S.text(A[0], A[1] - 14, 'A', { a: 'middle', size: 12, w: 'bold' }) + S.text(C[0], C[1] - 14, 'C', { a: 'middle', size: 12, w: 'bold' }) + S.text(B[0] + 16, B[1] - 14, 'B', { size: 12, w: 'bold' });
  o += S.lines(10, 18, ['A and C (turning points):', 'PE = ' + d2(E) + ' J, KE = 0'], { size: 10, dy: 12 });
  o += S.lines(B[0], B[1] + 34, ['At B: PE = 0', `KE = ${d2(E)} J`, `v = ${d2(v)} m s⁻¹`], { a: 'middle', size: 10, dy: 12 });
  o += S.text(w - 6, 18, `L = ${L} m, m = ${m} kg`, { a: 'end', size: 11, w: 'bold' });
  const dA = Math.hypot(A[0] - pv[0], A[1] - pv[1]);
  const dB = Math.hypot(B[0] - pv[0], B[1] - pv[1]);
  const dC = Math.hypot(C[0] - pv[0], C[1] - pv[1]);
  const hPx = (B[1] - A[1]) / (pxL / L);
  check(near(dA, pxL, 1e-9) && near(dB, pxL, 1e-9) && near(dC, pxL, 1e-9) && near(hPx, hh, 1e-9) && near(A[1], C[1], 1e-9) && near(m * g * hh, 0.5 * m * v * v, 1e-9), `pendulum: all three bob positions are ${pxL} px (${L} m) from the pivot; the drawn height ${d3(hPx)} m = L(1 − cos ${th0}°); A and C are at the same height; mgh = ${d2(E)} J = ½mv² with v = ${d2(v)} m s⁻¹`);
  return svgDoc(w, ht, 'A simple pendulum of length 1.5 metres with a 0.4 kilogram bob, released from rest at 50 degrees. At each end of the swing the bob is 0.536 metres above its lowest point and has 2.10 joules of potential energy and no kinetic energy. At the lowest point it has no potential energy, 2.10 joules of kinetic energy and a speed of 3.24 metres per second', o);
})();

// ---------------------------------------------------------------- COASTER: track from control points; speeds from energy
export const COAST_DATA = { pts: [[22, 30, 'A'], [130, 5, 'B'], [250, 18, 'C'], [380, 2, 'D']], pxM: 5, base: 218 };
COAST_DATA.H = COAST_DATA.pts[0][1];
COAST_DATA.speeds = COAST_DATA.pts.map(([, hh]) => Math.sqrt(2 * g * (COAST_DATA.H - hh)));
export const COASTER = (() => {
  const { pts, pxM, base, H, speeds } = COAST_DATA;
  const w = 430;
  const h = 250;
  const hAt = (x) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, h0] = pts[i];
      const [x1, h1] = pts[i + 1];
      if (x >= x0 && x <= x1) return h0 + ((h1 - h0) * (1 - Math.cos((Math.PI * (x - x0)) / (x1 - x0)))) / 2;
    }
    return NaN;
  };
  const Y = (hh) => base - hh * pxM;
  const trk = [];
  for (let x = pts[0][0]; x <= pts.at(-1)[0]; x += 4) trk.push([x, Y(hAt(x))]);
  trk.push([pts.at(-1)[0], Y(pts.at(-1)[1])]);
  let o = S.line(10, base, 420, base, { c: MUT, w: 1.2 });
  o += S.path(pd(trk), { c: ACC, w: 3 });
  o += S.line(14, Y(H), 420, Y(H), { c: MUT, w: 1, dash: '5 3' });
  o += S.text(420, Y(H) - 5, 'level of A: the car never rises above it', { a: 'end', size: 10, c: MUT });
  const lab = {
    A: [pts[0][0] + 12, Y(H) + 18, 'start', 'v = 0'],
    B: [pts[1][0], Y(pts[1][1]) - 40, '', ''],
    C: [pts[2][0], Y(pts[2][1]) - 40, '', ''],
    D: [pts[3][0], Y(pts[3][1]) - 40, '', ''],
  };
  let ok = true;
  pts.forEach(([x, hh, name], i) => {
    const y = Y(hh);
    if (Math.abs(hAt(x) - hh) > 1e-9) ok = false;
    o += S.circle(x, y, 5, { c: RED, fill: RED });
    const v = speeds[i];
    if (name === 'A') {
      o += S.text(x + 10, y - 22 + 0, `A: h = ${hh} m`, { size: 10, w: 'bold' }) + S.text(x + 10, y - 10, 'v = 0 (from rest)', { size: 10 });
    } else {
      const ty = name === 'B' ? y - 62 : y - 38;
      o += S.lines(x, ty, [`${name}: h = ${hh} m`, `v = ${d1(v)} m s⁻¹`], { a: 'middle', size: 10, dy: 12, w: 'bold' });
      o += S.lead(x, ty + 16, x, y - 7);
    }
  });
  o += S.text(w - 6, h - 6, `scale ${pxM} px per m of height; friction and air drag ignored; v = √(2g × drop below A)`, { a: 'end', size: 10 });
  const hx = (x) => (base - Y(hAt(x))) / pxM;
  const sp = pts.map(([x]) => Math.sqrt(2 * g * (H - hx(x))));
  const okS = sp.every((s, i) => near(s, speeds[i], 1e-9)) && pts.slice(1).every(([, hh]) => hh < H);
  check(ok && okS && near(trk[0][1], Y(H), 1e-9), `coaster: the markers A, B, C, D lie on the drawn track at heights ${pts.map((p) => p[1]).join(', ')} m; every other marker is below A, so the car can reach all of them; speeds ${speeds.map((s) => d1(s)).join(', ')} m s⁻¹ from v² = 2g(drop)`);
  return svgDoc(w, h, 'A roller-coaster track with a car released from rest at A, 30 metres above the ground. The track dips to B at 5 metres, rises to a crest C at 18 metres and falls to D at 2 metres. Using energy conservation the speeds are 22.1 metres per second at B, 15.3 at C and 23.4 at D; the car can never rise above the level of A', o);
})();

// ---------------------------------------------------------------- OSC: block on a spring, m = 0.4 kg, k = 250 N/m, A = 0.08 m
export const OSC_DATA = { m: 0.4, k: 250, A: 0.08, xs: [-0.08, -0.04, 0, 0.08], pxM: 700, pxJ: 160 };
OSC_DATA.E = 0.5 * OSC_DATA.k * OSC_DATA.A ** 2;
OSC_DATA.vmax = Math.sqrt((2 * OSC_DATA.E) / OSC_DATA.m);
export const OSC = (() => {
  const { m, k, A, xs, pxM, pxJ, E, vmax } = OSC_DATA;
  const w = 430;
  const h = 292;
  const wall = 24;
  const natX = wall + 96;
  const bw = 30;
  const coil = (xa, xb, y, n = 7) => {
    let d = `M${f1(xa)} ${y} L${f1(xa + 5)} ${y}`;
    const seg = (xb - xa - 10) / n;
    for (let i = 0; i < n; i++) d += ` L${f1(xa + 5 + seg * (i + 0.25))} ${y - 7} L${f1(xa + 5 + seg * (i + 0.75))} ${y + 7}`;
    return S.path(`${d} L${f1(xb - 5)} ${y} L${f1(xb)} ${y}`, { w: 1.5 });
  };
  let o = '';
  let ok = true;
  xs.forEach((xx, i) => {
    const yc = 40 + i * 62;
    const face = natX + xx * pxM;
    const U = 0.5 * k * xx * xx;
    const K = E - U;
    const v = Math.sqrt((2 * K) / m);
    o += S.line(wall, yc + 24, 226, yc + 24, { c: MUT, w: 1 }) + S.rect(wall - 7, yc - 10, 7, 38, { fill: FILL });
    o += coil(wall, face, yc + 8) + S.rect(face, yc - 6, bw, 28, { fill: FILL, w: 1.6 });
    o += S.line(natX, yc - 14, natX, yc + 30, { c: MUT, w: 1, dash: '3 3' });
    o += S.text(238, yc - 14, `x = ${xx < 0 ? '−' : xx > 0 ? '+' : ''}${Math.abs(xx).toFixed(2)} m`, { size: 11, w: 'bold' });
    const lu = U * pxJ;
    const lk = K * pxJ;
    if (lu > 0) o += S.rect(238, yc - 6, lu, 14, { c: BLUE, fill: BLUE, fop: 0.35, sw: 1 });
    if (lk > 0) o += S.rect(238 + lu, yc - 6, lk, 14, { c: RED, fill: RED, fop: 0.35, sw: 1 });
    o += S.text(238, yc + 22, `U = ${d3(U)} J, K = ${d3(K)} J`, { size: 10 });
    o += S.text(238, yc + 34, `v = ${d2(v)} m s⁻¹`, { size: 10, c: MUT });
    if (!near((lu + lk) / pxJ, E, 1e-9) || K < -1e-12) ok = false;
  });
  o += S.text(w - 6, h - 20, `blue bar: U = ½kx²; red bar: K = ½mv²; ${pxJ} px per J`, { a: 'end', size: 10 }) + S.text(w - 6, h - 6, `dashed line: x = 0; m = ${m} kg, k = ${k} N m⁻¹`, { a: 'end', size: 10 });
  const faceMin = natX + xs[0] * pxM;
  const faceMax = natX + xs[3] * pxM;
  check(ok && near((natX - faceMin) / pxM, A, 1e-9) && near((faceMax - natX) / pxM, A, 1e-9) && near(E, 0.8, 1e-9) && near(vmax, 2, 1e-9), `oscillator: the block is drawn ${d2((natX - faceMin) / pxM)} m either side of the dashed line (amplitude ${A} m); in all four rows the U bar plus the K bar is ${d1(E * pxJ)} px (E = ${d2(E)} J); the speed at x = 0 is ${d2(vmax)} m s⁻¹`);
  return svgDoc(w, h, 'A 0.4 kilogram block on a spring of stiffness 250 newtons per metre oscillating with amplitude 0.08 metres, shown at four positions. At either extreme the energy is all potential, 0.8 joules. At the centre it is all kinetic, 0.8 joules, with a speed of 2 metres per second. At 0.04 metres from the centre it is 0.2 joules potential and 0.6 joules kinetic. The total stays 0.8 joules', o);
})();

export const ALL = { TOW, FXAREA, SPRING_AREA, SPRING, FALL, PEND, COASTER, OSC };
