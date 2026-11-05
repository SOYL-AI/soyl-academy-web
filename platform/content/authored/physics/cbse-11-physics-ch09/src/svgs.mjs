// ch09 diagrams, all drawn from computed numbers with self-checks: pressure against depth, a mercury barometer, a hydraulic lift,
// continuity in a hose, Torricelli efflux, a Venturi meter, an aerofoil, viscous layers, forces on a falling sphere, a soap film,
// angle of contact, excess pressure in a drop and a bubble, and capillary rise and depression.
import { svgDoc, S, near, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, RHO, RHO_HG, PATM, S_W, capHeight } from './phys.mjs';
import { DEPTH, BARO, e3, e4, e5, e6, s1, s2, s4, s5, s6 } from './data.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const kpa = (p) => dec(p / 1000, 4);
/** Vertical double-headed dimension line at x from y1 to y2. */
const dimV = (x, y1, y2, c) => S.line(x, y1, x, y2, { c, w: 1.4 }) + S.head(x, y1, -Math.PI / 2, { size: 6, c }) + S.head(x, y2, Math.PI / 2, { size: 6, c });
/** Horizontal double-headed dimension line at y from x1 to x2. */
const dimH = (y, x1, x2, c) => S.line(x1, y, x2, y, { c, w: 1.4 }) + S.head(x1, y, Math.PI, { size: 6, c }) + S.head(x2, y, 0, { size: 6, c });

// ---------------------------------------------------------------- DEPTH: absolute pressure at 0, 10 and 20 m in water (0.5 px per kPa, 8 px per metre)
export const DEPTH_FIG = (() => {
  const { depths, P } = DEPTH;
  const w = 420;
  const h = 238;
  const ys = 34;
  const ppm = 8;
  const kp = 0.5;
  let s = S.rect(20, ys, 110, 170, { c: BLUE, fill: BLUE, fop: 0.18 }) + S.line(16, ys, 134, ys, { w: 2.2 });
  s += S.text(20, ys - 12, 'open to the air: P₀ = 1.013 × 10⁵ Pa', { size: 10, w: 'bold' });
  const gw = [];
  depths.forEach((d, i) => {
    const yc = ys + ppm * d;
    const atm = (kp * PATM) / 1000;
    const gau = (kp * RHO * g * d) / 1000;
    gw.push(gau);
    s += S.line(130, yc, 178, yc, { c: MUT, w: 1, dash: '3 3' });
    s += S.rect(180, yc - 8, atm, 16, { c: MUT, fill: MUT, fop: 0.45 });
    if (gau > 0) s += S.rect(180 + atm, yc - 8, gau, 16, { c: ACC, fill: ACC, fop: 0.55 });
    s += S.text(180 + atm + gau + 6, yc + 4, `${kpa(P[i])} kPa`, { size: 11, w: 'bold' });
    s += S.text(26, d === 0 ? yc + 14 : yc - 4, `depth ${d} m`, { size: 10 });
  });
  s += S.rect(180, 224, 10, 9, { c: MUT, fill: MUT, fop: 0.45 }) + S.text(194, 232, 'atmosphere P₀', { size: 10 });
  s += S.rect(290, 224, 10, 9, { c: ACC, fill: ACC, fop: 0.55 }) + S.text(304, 232, 'water ρ g h', { size: 10 });
  s += S.text(75, 218, 'water: 1000 kg m⁻³', { a: 'middle', size: 10, c: MUT });
  const ok = near(gw[2] / gw[1], 2, 1e-9) && near(P[1] - P[0], RHO * g * 10, 1e-9) && near(P[2] - P[0], RHO * g * 20, 1e-9) && gw[0] === 0;
  check(ok, `depth: gauge part of each bar grows in proportion to depth (0, ${gw[1].toFixed(0)}, ${gw[2].toFixed(0)} px); absolute pressures ${P.map(kpa).join(', ')} kPa = P₀ + ρ g h`);
  return svgDoc(w, h, 'Bar chart of the absolute pressure in water at the surface and at depths of 10 and 20 metres: 101.3, 199.3 and 297.3 kilopascals, each bar an atmospheric part plus a part rho g h that grows in proportion to depth', s);
})();

// ---------------------------------------------------------------- BARO: mercury barometer (0.22 px per mm)
export const BARO_FIG = (() => {
  const hmm = BARO.h * 1000;
  const kpx = 0.22;
  const hp = kpx * hmm;
  const w = 420;
  const h = 250;
  const yL = 205; // mercury level in the trough
  const top = yL - hp;
  let s = S.rect(30, yL, 150, 34, { c: 'currentColor', fill: MUT, fop: 0.35 });
  s += S.rect(95, top, 20, hp + 12, { c: 'none', fill: MUT, fop: 0.35, sw: 0 });
  s += S.line(95, 30, 95, 218, { w: 2 }) + S.line(115, 30, 115, 218, { w: 2 }) + S.line(95, 30, 115, 30, { w: 2 });
  s += S.text(122, 40, 'vacuum', { size: 10, c: MUT });
  s += S.line(95, yL, 196, yL, { c: MUT, w: 1, dash: '4 3' }) + S.text(198, yL + 4, 'level A', { size: 10 });
  for (const x of [45, 150]) s += S.arrow(x, yL - 26, x, yL - 3, { c: BLUE, w: 1.6, size: 6 });
  s += S.text(48, yL - 32, 'P₀', { a: 'middle', size: 11, w: 'bold', c: BLUE });
  s += dimV(80, top, yL, GRN);
  s += S.text(74, (yL + top) / 2 - 2, 'h =', { a: 'end', size: 11, w: 'bold', c: GRN }) + S.text(74, (yL + top) / 2 + 12, `${dec(hmm, 3)} mm`, { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.lines(212, 72, ['Pressure at level A inside the tube', 'equals the pressure outside, P₀.', '', 'P₀ = ρ g h', `   = ${RHO_HG} × 9.8 × ${dec(BARO.h, 3)}`, `   = ${dec(RHO_HG * g * BARO.h, 4)} Pa`], { size: 11, dy: 16 });
  s += S.text(w - 4, h - 4, 'mercury, ρ = 13 600 kg m⁻³; scale 0.22 px per mm', { a: 'end', size: 10 });
  check(near(hp, kpx * 760.054, 1e-4) && near(RHO_HG * g * BARO.h, PATM, 1e-9) && near(BARO.hw, 10.3367, 1e-4), `barometer: column ${hmm.toFixed(1)} mm drawn at ${kpx} px per mm (${hp.toFixed(1)} px); ρ g h = ${(RHO_HG * g * BARO.h).toFixed(0)} Pa = P₀; a water column would be ${BARO.hw.toFixed(2)} m`);
  return svgDoc(w, h, 'A mercury barometer: a closed tube, full of mercury, upside down in a trough; the mercury column stands 760 millimetres above the level in the trough, with vacuum above it, so atmospheric pressure equals rho g h, 1.013 times 10 to the 5 pascal', s);
})();

// ---------------------------------------------------------------- LIFT: hydraulic lift (4 px per cm of radius)
export const LIFT_FIG = (() => {
  const px = 4;
  const w1 = 2 * e3.r1 * 100 * px; // 24
  const w2 = 2 * e3.r2 * 100 * px; // 96
  const w = 420;
  const h = 252;
  let s = '';
  s += S.rect(40, 94, w1, 76, { c: 'none', fill: BLUE, fop: 0.2, sw: 0 }) + S.rect(40, 150, 206, 20, { c: 'none', fill: BLUE, fop: 0.2, sw: 0 }) + S.rect(150, 112, w2, 58, { c: 'none', fill: BLUE, fop: 0.2, sw: 0 });
  s += S.path(`M40 80 V170 H${40 + 206} V100`, { w: 2 }) + S.path(`M${40 + w1} 80 V150 H150 V100`, { w: 2 });
  s += S.rect(40, 88, w1, 6, { fill: 'currentColor' }) + S.line(52, 88, 52, 52, { w: 2 }) + S.arrow(52, 30, 52, 76, { c: RED, w: 2.4 });
  s += S.text(60, 44, 'F₁ (small push)', { size: 11, w: 'bold', c: RED });
  s += S.rect(150, 106, w2, 6, { fill: 'currentColor' });
  s += S.rect(172, 76, 52, 22, { c: BLUE, fill: BLUE, fop: 0.25, rx: 3 }) + S.circle(184, 100, 4, { fill: 'currentColor' }) + S.circle(212, 100, 4, { fill: 'currentColor' });
  s += S.text(198, 70, 'car 1500 kg', { a: 'middle', size: 11 });
  s += S.arrow(250, 126, 250, 84, { c: GRN, w: 2.4 }) + S.text(258, 100, 'F₂ = W = 14 700 N', { size: 10, c: GRN, w: 'bold' });
  s += S.text(52, 190, 'A₁: r = 3.0 cm', { a: 'middle', size: 10 }) + S.text(198, 190, 'A₂: r = 12 cm', { a: 'middle', size: 10 });
  s += S.lines(20, 212, [`Same pressure on both pistons: F₁/A₁ = F₂/A₂,  A₂/A₁ = (12/3)² = ${e3.ratio}`, `F₁ = ${dec(e3.W, 3)} ÷ ${e3.ratio} ≈ ${dec(e3.F1, 3)} N; small piston moves ${e3.d1} m, car rises ${e3.d2} m`, `Work in = ${dec(e3.F1, 3)} × ${e3.d1} = ${dec(e3.work, 4)} J = ${dec(e3.W, 3)} × ${e3.d2} = work out`], { size: 10, dy: 15 });
  check(near(w2 / w1, e3.r2 / e3.r1, 1e-9) && near((w2 / w1) ** 2, e3.ratio, 1e-9) && near(e3.F1 / (Math.PI * e3.r1 ** 2), e3.W / (Math.PI * e3.r2 ** 2), 1e-9) && near(e3.F1 * e3.d1, e3.W * e3.d2, 1e-9), `lift: piston widths 24 and 96 px (radius 3 and 12 cm), area ratio ${e3.ratio}; equal pressure ${(e3.p / 1000).toFixed(0)} kPa on both; work in = work out = ${e3.work} J`);
  return svgDoc(w, h, 'A hydraulic lift: a narrow piston of radius 3 centimetres and a wide piston of radius 12 centimetres joined by a liquid-filled channel; a small force F1 on the narrow piston supports the 14 700 newton weight of a car on the wide piston because the pressure is the same and the areas are in the ratio 1 to 16', s);
})();

// ---------------------------------------------------------------- PIPE: continuity (hose to nozzle, radii 3.0 and 1.5 cm, drawn at 10 px per cm)
export const PIPE_FIG = (() => {
  const w = 420;
  const h = 200;
  const cy = 112;
  const R1 = e4.r1 * 1000; // 30 px (10 px per cm)
  const R2 = e4.r2 * 1000; // 15 px
  const xa = 20;
  const xb = 130;
  const xc = 190;
  const xd = 340;
  let s = S.path(`M${xa} ${cy - R1} H${xb} L${xc} ${cy - R2} H${xd}`, { w: 2.4 }) + S.path(`M${xa} ${cy + R1} H${xb} L${xc} ${cy + R2} H${xd}`, { w: 2.4 });
  const offs = [-24, -12, 0, 12, 24];
  offs.forEach((o) => {
    const y1 = cy + o * (R2 / R1);
    s += S.path(`M${xa} ${cy + o} H${xb} L${xc} ${f1(y1)} H${xd - 8}`, { c: BLUE, w: 1.2 }) + S.head(xd - 2, y1, 0, { size: 6, c: BLUE });
  });
  const gapWide = offs[1] - offs[0];
  const gapNarrow = (offs[1] - offs[0]) * (R2 / R1);
  s += S.line(70, cy - R1, 70, cy + R1, { c: MUT, w: 1, dash: '3 3' }) + S.text(70, cy + R1 + 14, 'A₁', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(270, cy - R2, 270, cy + R2, { c: MUT, w: 1, dash: '3 3' }) + S.text(270, cy + R2 + 14, 'A₂', { a: 'middle', size: 11, w: 'bold' });
  const k = 10; // px per m/s
  s += S.arrow(40, 52, 40 + k * e4.v1, 52, { c: GRN, w: 2.4 }) + S.text(40, 42, `v₁ = ${dec(e4.v1, 2)} m s⁻¹`, { size: 11, w: 'bold', c: GRN });
  s += S.arrow(200, 52, 200 + k * e4.v2, 52, { c: GRN, w: 2.4 }) + S.text(200, 42, `v₂ = ${dec(e4.v2, 2)} m s⁻¹`, { size: 11, w: 'bold', c: GRN });
  s += S.text(w / 2, 170, `A₁v₁ = A₂v₂ = ${dec(e4.Q * 1000, 3)} × 10⁻³ m³ s⁻¹ (${dec(e4.Q * 1000, 3)} L s⁻¹)`, { a: 'middle', size: 11, w: 'bold' });
  s += S.text(w / 2, 186, 'r₁ = 3.0 cm, r₂ = 1.5 cm: area ratio 4, so the speed is 4 times larger', { a: 'middle', size: 10 });
  check(near((R1 / R2) ** 2, e4.ratio, 1e-9) && near(Math.PI * e4.r1 ** 2 * e4.v1, Math.PI * e4.r2 ** 2 * e4.v2, 1e-9) && near((k * e4.v2) / (k * e4.v1), e4.ratio, 1e-9) && near(gapWide / gapNarrow, R1 / R2, 1e-9), `pipe: drawn radii 30 and 15 px give area ratio ${e4.ratio}; A₁v₁ = A₂v₂ = ${(e4.Q * 1000).toFixed(3)} L/s; speed arrows 1:${e4.ratio}; streamline spacing halves in the narrow part`);
  return svgDoc(w, h, 'A hose narrowing into a nozzle with five streamlines: the radius falls from 3.0 to 1.5 centimetres, so the streamlines crowd together and the water speed rises from 2.0 to 8.0 metres per second, keeping the flow rate A v constant at 5.65 litres per second', s);
})();

// ---------------------------------------------------------------- TANK: Torricelli efflux (60 px per m)
export const TANK_FIG = (() => {
  const k = 60;
  const w = 420;
  const h = 252;
  const ys = 28;
  const yg = ys + k * e5.H;
  const yh = ys + k * e5.h;
  const xw = 180;
  let s = S.rect(xw - 100, ys, 100, k * e5.H, { c: 'none', fill: BLUE, fop: 0.2, sw: 0 }) + S.path(`M${xw - 100} ${ys - 6} V${yg} H${xw} V${ys - 6}`, { w: 2.2 }) + S.line(20, yg, 400, yg, { w: 1.6 });
  s += S.line(xw - 100, ys, xw, ys, { c: BLUE, w: 2 }) + S.text(xw - 50, ys - 10, 'open to the air', { a: 'middle', size: 10, c: MUT });
  let d = '';
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const t = (e5.t * i) / n;
    d += `${i ? ' L' : 'M'}${f1(xw + k * e5.v * t)} ${f1(yh + k * 0.5 * g * t * t)}`;
  }
  s += S.path(d, { c: BLUE, w: 2.4 }) + S.circle(xw, yh, 3, { c: RED, fill: RED });
  const xr = xw + k * e5.R;
  s += dimV(xw - 116, ys, yh, GRN) + S.text(xw - 122, (ys + yh) / 2 + 4, `h = ${dec(e5.h, 2)} m`, { a: 'end', size: 10, c: GRN });
  s += dimV(xw - 116, yh, yg, RED) + S.text(xw - 122, (yh + yg) / 2 + 4, `${dec(e5.fall, 2)} m`, { a: 'end', size: 10, c: RED });
  s += dimH(yg + 14, xw, xr, BLUE) + S.text((xw + xr) / 2, yg + 28, `range R = ${dec(e5.R, 3)} m`, { a: 'middle', size: 10, c: BLUE, w: 'bold' });
  s += S.lines(20, yg + 52, [`v = √(2 g h) = ${dec(e5.v, 3)} m s⁻¹;  fall time t = √(2 × ${dec(e5.fall, 2)} / g) = ${dec(e5.t, 3)} s`, `R = v t = ${dec(e5.R, 3)} m = 2√(h (H − h)), with water depth H = ${dec(e5.H, 2)} m`], { size: 10, dy: 15 });
  const endY = yh + k * 0.5 * g * e5.t * e5.t;
  check(near(endY, yg, 1e-6) && near(e5.R, 2 * Math.sqrt(e5.h * (e5.H - e5.h)), 1e-9) && near(0.5 * e5.v * e5.v, g * e5.h, 1e-9), `tank: jet leaves at depth ${e5.h} m with v² = 2 g h and lands on the ground line (end y ${endY.toFixed(1)} = ${yg} px) at range ${e5.R.toFixed(3)} m = 2√(h(H−h))`);
  return svgDoc(w, h, 'An open tank of water 2.0 metres deep with a small hole 0.50 metres below the surface: the jet leaves horizontally at 3.13 metres per second and lands 1.73 metres from the tank after falling 1.5 metres', s);
})();

// ---------------------------------------------------------------- VENTURI: horizontal pipe, wide and throat, two open tubes (80 px per m of liquid column)
export const VENTURI_FIG = (() => {
  const k = 80;
  const w = 420;
  const h = 306;
  const cy = 246;
  const h1 = 2.0; // m, gauge head at the wide part
  const P1g = RHO * g * h1;
  const P2g = P1g - e6.dP;
  const h2 = P2g / (RHO * g);
  const y1 = cy - k * h1;
  const y2 = cy - k * h2;
  let s = S.path(`M20 ${cy - 32} H120 L160 ${cy - 16} H240 L280 ${cy - 32} H380`, { w: 2.4 }) + S.path(`M20 ${cy + 32} H120 L160 ${cy + 16} H240 L280 ${cy + 32} H380`, { w: 2.4 });
  s += S.rect(64, y1, 12, cy - 32 - y1, { c: 'none', fill: BLUE, fop: 0.35, sw: 0 }) + S.rect(194, y2, 12, cy - 16 - y2, { c: 'none', fill: BLUE, fop: 0.35, sw: 0 });
  for (const [x, yb] of [[70, cy - 32], [200, cy - 16]]) s += S.line(x - 6, yb, x - 6, 58, { w: 1.5 }) + S.line(x + 6, yb, x + 6, 58, { w: 1.5 });
  s += S.line(70, y1, 330, y1, { c: MUT, w: 1, dash: '4 3' }) + S.line(200, y2, 330, y2, { c: MUT, w: 1, dash: '4 3' });
  s += dimV(326, y1, y2, RED);
  s += S.text(332, (y1 + y2) / 2 + 4, `Δh = ${dec(e6.dh, 3)} m`, { size: 11, w: 'bold', c: RED });
  s += S.arrow(26, cy, 62, cy, { c: GRN, w: 2 }) + S.text(26, cy + 50, `v₁ = ${dec(e6.v1, 2)} m s⁻¹`, { size: 10, c: GRN, w: 'bold' });
  s += S.arrow(176, cy, 232, cy, { c: GRN, w: 2 }) + S.text(190, cy + 50, `v₂ = ${dec(e6.v2, 2)} m s⁻¹`, { size: 10, c: GRN, w: 'bold' });
  s += S.text(70, 46, 'wide part', { a: 'middle', size: 10 }) + S.text(200, 46, 'throat', { a: 'middle', size: 10 });
  s += S.lines(236, 16, ['d₁ = 8.0 cm, d₂ = 4.0 cm', `P₁ − P₂ = ρ g Δh = ${dec(e6.dP, 4)} Pa`, '= ½ ρ (v₂² − v₁²)'], { size: 10, dy: 14 });
  check(near(k * (h1 - h2), k * e6.dh, 1e-9) && near(RHO * g * e6.dh, e6.dP, 1e-9) && near(0.5 * RHO * (e6.v2 ** 2 - e6.v1 ** 2), e6.dP, 1e-9) && near(e6.A1 * e6.v1, e6.A2 * e6.v2, 1e-9) && y2 > y1, `venturi: liquid in the throat tube stands ${(k * e6.dh).toFixed(1)} px lower (Δh = ${e6.dh.toFixed(4)} m); ρ g Δh = ${e6.dP} Pa = ½ρ(v₂² − v₁²) with v₁ = ${e6.v1}, v₂ = ${e6.v2} m/s; A₁v₁ = A₂v₂`);
  return svgDoc(w, h, 'A Venturi meter: water flows through a horizontal pipe with a narrow throat; two open vertical tubes show that the liquid stands lower over the throat, where the speed is 4.0 metres per second, than over the wide part, where it is 1.0 metre per second; the difference in height is 0.765 metres', s);
})();

// ---------------------------------------------------------------- AERO: dynamic lift on an aerofoil (schematic)
export const AERO_FIG = (() => {
  const w = 420;
  const h = 236;
  const yu = (x) => 118 - 30 * Math.sin((Math.PI * (x - 90)) / 240);
  const yl = (x) => 118 + 8 * Math.sin((Math.PI * (x - 90)) / 240);
  let up = 'M90 118';
  for (let x = 100; x <= 330; x += 10) up += ` L${x} ${f1(yu(x))}`;
  let lo = '';
  for (let x = 330; x >= 90; x -= 10) lo += ` L${x} ${f1(yl(x))}`;
  let s = S.path(up + lo + ' Z', { w: 1.8, fill: FILL });
  const D = [14, 34, 56];
  const A = [30, 20, 10];
  const B = [8, 5, 2];
  const mid = 210;
  const bump = (x) => Math.sin(Math.PI * Math.min(1, Math.max(0, (x - 90) / 240)));
  const upMid = [];
  const loMid = [];
  D.forEach((d, i) => {
    let p = '';
    let q = '';
    for (let x = 20; x <= 400; x += 10) {
      p += `${x === 20 ? 'M' : ' L'}${x} ${f1(118 - d - A[i] * bump(x))}`;
      q += `${x === 20 ? 'M' : ' L'}${x} ${f1(118 + d + 2 + B[i] * bump(x))}`;
    }
    s += S.path(p, { c: BLUE, w: 1.2 }) + S.head(400, 118 - d, 0, { size: 6, c: BLUE });
    s += S.path(q, { c: BLUE, w: 1.2 }) + S.head(400, 118 + d + 2, 0, { size: 6, c: BLUE });
    upMid.push(118 - d - A[i] * bump(mid));
    loMid.push(118 + d + 2 + B[i] * bump(mid));
  });
  s += S.arrow(210, 100, 210, 54, { c: GRN, w: 2.6 }) + S.text(218, 62, 'dynamic lift', { size: 11, w: 'bold', c: GRN });
  s += S.text(w / 2, 14, 'streamlines crowd above the wing: faster air, lower pressure', { a: 'middle', size: 10 });
  s += S.text(w / 2, 226, 'below the wing: slower air, higher pressure; net force upward', { a: 'middle', size: 10 });
  const gapU = [yu(mid) - upMid[0], upMid[0] - upMid[1], upMid[1] - upMid[2]];
  const gapL = [loMid[0] - yl(mid), loMid[1] - loMid[0], loMid[2] - loMid[1]];
  check(gapU.every((x, i) => x > 0 && x < gapL[i]), `aerofoil: at mid-chord the streamline gaps above the wing (${gapU.map((x) => x.toFixed(0)).join(', ')} px) are smaller than those below (${gapL.map((x) => x.toFixed(0)).join(', ')} px), so the air above is faster`);
  return svgDoc(w, h, 'An aerofoil with streamlines: the lines crowd together above the wing, where the air moves faster and the pressure is lower, and stay wider apart below it, where the air is slower and the pressure higher, giving an upward dynamic lift', s);
})();

// ---------------------------------------------------------------- SHEAR: viscous layers between two plates
export const SHEAR_FIG = (() => {
  const w = 420;
  const h = 220;
  const yb = 168;
  const yt = 50;
  const gap = yb - yt;
  const k = 280; // px per m/s
  const x0 = 84;
  let s = S.rect(30, yb, 330, 10, { c: 'currentColor', fill: MUT, fop: 0.5 }) + S.text(34, yb + 24, 'fixed plate (v = 0)', { size: 10 });
  s += S.rect(x0 + k * s1.v - 54, yt - 10, 150, 10, { c: 'currentColor', fill: FILL }) + S.text(x0 + k * s1.v - 50, yt - 18, `moving plate, area A = ${dec(s1.A, 2)} m²`, { size: 10 });
  s += S.arrow(x0 + k * s1.v + 98, yt - 5, x0 + k * s1.v + 142, yt - 5, { c: RED, w: 2.4 }) + S.text(x0 + k * s1.v + 146, yt - 1, 'F', { size: 12, w: 'bold', c: RED });
  const fr = [0, 0.25, 0.5, 0.75, 1];
  const L = [];
  for (const f of fr) {
    const y = yb - f * gap;
    s += S.line(x0, y, x0 + 150, y, { c: MUT, w: 0.6, dash: '2 4' });
    if (f > 0) s += S.arrow(x0, y, x0 + k * s1.v * f, y, { c: BLUE, w: 1.6, size: 6 });
    L.push(k * s1.v * f);
  }
  s += S.line(x0, yb, x0 + k * s1.v, yt, { c: GRN, w: 1.6, dash: '5 3' });
  s += S.text(x0 + k * s1.v + 6, yt + 16, `v = ${dec(s1.v, 2)} m s⁻¹`, { size: 10, c: GRN });
  s += S.line(x0 - 14, yb, x0 - 14, yt, { c: MUT, w: 1 }) + S.text(x0 - 20, (yb + yt) / 2 + 4, `d = ${dec(s1.d * 1000, 2)} mm`, { a: 'end', size: 10 });
  s += S.lines(x0 + 156, 108, ['speed grows linearly with', 'distance from the fixed plate', `F = η A v / d`, `  = ${dec(s1.eta, 2)} × ${dec(s1.A, 2)} × ${dec(s1.v, 2)} / ${s1.d}`, `  = ${dec(s1.F, 2)} N`], { size: 10, dy: 14 });
  check(L.every((l, i) => near(l, L[4] * fr[i], 1e-9)) && near(s1.F, s1.eta * s1.A * (s1.v / s1.d), 1e-9), `shear: layer-speed arrows ${L.map((l) => l.toFixed(0)).join(', ')} px grow linearly with height (velocity gradient v/d = ${s1.v / s1.d} s⁻¹); F = η A v/d = ${s1.F} N`);
  return svgDoc(w, h, 'A liquid film between a fixed plate and a plate moving at 0.50 metres per second: arrows show the layer speed growing in proportion to the distance from the fixed plate, and the force needed to move the upper plate is 8.0 newtons', s);
})();

// ---------------------------------------------------------------- STOKES: forces on a sphere at terminal velocity
export const STOKES_FIG = (() => {
  const w = 420;
  const h = 268;
  const cx = 130;
  const cy = 122;
  const kF = 100 / s2.W; // px per N
  const Lw = kF * s2.W;
  const Lb = kF * s2.B;
  const Ld = kF * s2.D;
  let s = S.circle(cx, cy, 22, { c: 'currentColor', fill: MUT, fop: 0.5, sw: 2 });
  s += S.arrow(cx, cy + 22, cx, cy + 22 + Lw, { c: RED, w: 2.6 }) + S.text(cx + 8, cy + 22 + Lw - 4, 'W = m g', { size: 11, w: 'bold', c: RED });
  s += S.arrow(cx - 12, cy - 20, cx - 12, cy - 20 - Lb, { c: GRN, w: 2.6 }) + S.text(cx - 18, cy - 20 - Lb - 4, 'B (upthrust)', { a: 'end', size: 11, w: 'bold', c: GRN });
  s += S.arrow(cx + 12, cy - 20, cx + 12, cy - 20 - Ld, { c: BLUE, w: 2.6 }) + S.text(cx + 18, cy - 20 - Ld + 4, 'D = 6π η r v', { size: 11, w: 'bold', c: BLUE });
  s += S.arrow(24, cy - 40, 24, cy + 30, { c: ACC, w: 1.6 }) + S.text(32, cy + 26, 'v_t', { size: 11, w: 'bold', c: ACC });
  s += S.lines(220, 70, ['At terminal speed the net force', 'is zero:  W = B + D', '', `r = ${dec(s2.r * 1000, 2)} mm, steel ${s2.rs} kg m⁻³`, `oil ${s2.sg} kg m⁻³, η = ${dec(s2.eta, 2)} Pa s`, '', 'v_t = 2 r² (ρ − σ) g / (9 η)', `    = ${dec(s2.vt * 100, 3)} cm s⁻¹`, '', `W = ${dec(s2.W * 1e4, 3)} × 10⁻⁴ N`, `B = ${dec(s2.B * 1e5, 3)} × 10⁻⁵ N`, `D = ${dec(s2.D * 1e4, 3)} × 10⁻⁴ N`], { size: 10, dy: 15 });
  s += S.text(w - 4, h - 4, 'arrow lengths drawn to one scale (100 px = W)', { a: 'end', size: 10 });
  check(near(Lb + Ld, Lw, 1e-9) && near(s2.D, s2.W - s2.B, 1e-9) && near(s2.D, 6 * Math.PI * s2.eta * s2.r * s2.vt, 1e-9), `stokes: drawn B (${Lb.toFixed(1)} px) + D (${Ld.toFixed(1)} px) = W (${Lw.toFixed(1)} px); D = 6πηrv_t = ${s2.D.toExponential(3)} N; v_t = ${(s2.vt * 100).toFixed(2)} cm/s`);
  return svgDoc(w, h, 'A steel ball falling at terminal speed in oil: the weight acts downward, balanced by the upthrust and the Stokes drag acting upward, drawn to one scale so that upthrust plus drag equals weight', s);
})();

// ---------------------------------------------------------------- FILM: soap film on a wire frame (10 px per cm)
export const FILM_FIG = (() => {
  const w = 420;
  const h = 196;
  const k = 10;
  const l = s4.l * 100 * k; // 80 px
  const d = s4.d * 100 * k; // 50 px
  const x0 = 40;
  const x1 = x0 + 80;
  const yt = 50;
  let s = S.rect(x0, yt, 80, l, { c: 'none', fill: BLUE, fop: 0.3, sw: 0 }) + S.rect(x1, yt, d, l, { c: 'none', fill: BLUE, fop: 0.12, sw: 0 });
  s += S.path(`M${x0 + 150} ${yt} H${x0} V${yt + l} H${x0 + 150}`, { w: 2.6 }) + S.line(x1, yt, x1, yt + l, { w: 3.2, c: ACC });
  s += S.line(x1 + d, yt, x1 + d, yt + l, { c: ACC, w: 1.6, dash: '4 3' });
  s += S.arrow(x1 + 4, yt + l / 2, x1 + 38, yt + l / 2, { c: RED, w: 2.4 }) + S.text(x1 + 4, yt + l / 2 - 8, 'F', { size: 12, w: 'bold', c: RED });
  s += dimH(yt + l + 16, x1, x1 + d, GRN) + S.text(x1 + d / 2, yt + l + 31, `d = ${dec(s4.d * 100, 2)} cm`, { a: 'middle', size: 10, c: GRN });
  s += S.line(x0 - 12, yt, x0 - 12, yt + l, { c: MUT, w: 1 }) + S.text(x0 + 6, yt + l / 2 + 4, `l = ${dec(s4.l * 100, 2)} cm`, { size: 10 });
  s += S.text(x0 + 40, yt - 10, 'soap film', { a: 'middle', size: 10, c: BLUE }) + S.text(x1, yt - 10, 'sliding wire', { size: 10, c: ACC });
  s += S.lines(206, 70, [`S = ${dec(s4.S, 2)} N m⁻¹ (soap solution)`, 'The film has two surfaces:', `F = 2 S l = ${dec(s4.F * 1000, 3)} × 10⁻³ N`, `ΔA = 2 l d = ${dec(s4.dA * 1000, 3)} × 10⁻³ m²`, `W = F d = ${dec(s4.W * 1e4, 3)} × 10⁻⁴ J`, `  = S ΔA`], { size: 10, dy: 16 });
  const faceM2 = (l * d) / (k * k) / 1e4; // m², one face, from the drawn pixels
  check(near(2 * faceM2, s4.dA, 1e-9) && near(s4.W, s4.S * s4.dA, 1e-9) && near(s4.W, s4.F * s4.d, 1e-9), `film: drawn extension ${l}×${d} px = one face of ${faceM2.toFixed(4)} m², two faces give ΔA = ${s4.dA} m²; W = F d = S ΔA = ${s4.W} J`);
  return svgDoc(w, h, 'A soap film on a U-shaped wire frame with a sliding wire 8.0 centimetres long pulled 5.0 centimetres out: the film has two surfaces, so the force is 2 S l, equal to 4.8 times 10 to the minus 3 newton, and the work done equals S times the increase in area', s);
})();

// ---------------------------------------------------------------- CONTACT: angle of contact for a wetting and a non-wetting liquid
export const CONTACT_FIG = (() => {
  const w = 420;
  const h = 206;
  const yp = 132;
  let s = '';
  const ok = [];
  const panel = (cx, R, th, cap1, cap2, col) => {
    const t = (th * Math.PI) / 180;
    const a = R * Math.sin(t);
    const xl = cx - a;
    const xr = cx + a;
    s += S.path(`M${f1(xl)} ${yp} A${f1(R)} ${f1(R)} 0 ${th > 90 ? 1 : 0} 1 ${f1(xr)} ${yp} Z`, { c: col, fill: col, fop: 0.3, w: 2 });
    s += S.rect(cx - 95, yp, 190, 12, { c: 'currentColor', fill: MUT, fop: 0.4 }) + S.text(cx + 94, yp + 25, 'glass', { a: 'end', size: 10 });
    const len = 46;
    s += S.line(xl - 0.6 * len * Math.cos(t), yp + 0.6 * len * Math.sin(t), xl + len * Math.cos(t), yp - len * Math.sin(t), { c: RED, w: 1.6 });
    s += S.path(`M${f1(xl + 26)} ${yp} A26 26 0 0 0 ${f1(xl + 26 * Math.cos(t))} ${f1(yp - 26 * Math.sin(t))}`, { c: GRN, w: 1.6 });
    s += S.text(xl + 34 * Math.cos(t / 2) + 4, yp - 34 * Math.sin(t / 2) + 4, `θ = ${th}°`, { size: 11, w: 'bold', c: GRN });
    s += S.text(cx, 172, cap1, { a: 'middle', size: 10, w: 'bold' }) + S.text(cx, 187, cap2, { a: 'middle', size: 10 });
    // angle between the plate and the tangent to the drawn circle at the contact point (from the circle geometry, y up)
    const hc = -R * Math.cos(t); // centre height above the plate
    const rx = -a; // centre -> left contact point: (−a, −hc)
    const ry = -hc;
    const tang = Math.atan2(-rx, ry); // tangent direction (perpendicular to the radius), pointing up and to the right
    ok.push(near((tang * 180) / Math.PI, th, 1e-9));
  };
  panel(105, 140, 30, 'liquid that wets the surface', 'θ acute (below 90°); drawn 30°', BLUE);
  panel(315, 42, s6.th, 'liquid that does not wet it', `θ obtuse (above 90°); mercury on glass ${s6.th}°`, ACC);
  check(ok.every(Boolean), `contact: tangent angles of the two drawn drops are 30° and ${s6.th}° (acute for the wetting liquid, obtuse for the non-wetting one)`);
  return svgDoc(w, h, 'Two drops on a glass plate with the angle of contact marked between the glass and the tangent to the liquid surface: an acute angle of 30 degrees for a liquid that wets the glass and an obtuse angle of 140 degrees for mercury, which does not wet it', s);
})();

// ---------------------------------------------------------------- BUBBLE: excess pressure in a drop (one surface) and a soap bubble (two surfaces)
export const BUBBLE_FIG = (() => {
  const w = 420;
  const h = 232;
  let s = '';
  const half = (cx, cy, R, rim, label) => {
    s += S.circle(cx, cy, R, { c: BLUE, fill: BLUE, fop: 0.1, sw: 2 });
    if (rim === 2) s += S.circle(cx, cy, R - 4, { c: BLUE, sw: 1.4 });
    s += S.line(cx - R - 8, cy, cx + R + 8, cy, { c: MUT, w: 1, dash: '4 3' });
    s += S.arrow(cx, cy + 16, cx, cy - 22, { c: RED, w: 2.4 }) + S.text(cx + 6, cy - 4, 'ΔP × πR²', { size: 10, c: RED, w: 'bold' });
    for (const x of [cx - R, cx + R]) {
      s += S.arrow(x, cy - 3, x, cy + 22, { c: GRN, w: 2.2 });
      if (rim === 2) s += S.arrow(x + (x < cx ? 5 : -5), cy - 3, x + (x < cx ? 5 : -5), cy + 22, { c: GRN, w: 2.2 });
    }
    s += S.lines(cx, cy + R + 22, label, { a: 'middle', size: 10, dy: 14 });
  };
  half(105, 70, 44, 1, ['drop (one surface):', 'ΔP πR² = S × 2πR', `ΔP = 2S/R = 2 × ${S_W} / ${s5.Rd} = ${s5.dPd} Pa`, '(water drop, R = 0.50 mm)']);
  half(315, 70, 44, 2, ['soap bubble (two surfaces):', 'ΔP πR² = 2 × S × 2πR', `ΔP = 4S/R = 4 × ${s5.S} / ${s5.Rb} = ${s5.dPb} Pa`, '(R = 1.5 cm, S = 0.030 N m⁻¹)']);
  const bal = (S1, R, n) => (n * S1 * 2 * Math.PI * R) / (Math.PI * R * R);
  check(near(bal(S_W, s5.Rd, 1), s5.dPd, 1e-9) && near(bal(s5.S, s5.Rb, 2), s5.dPb, 1e-9) && s5.dPd === 288 && s5.dPb === 8, `bubble: force balance on the cut hemisphere gives ΔP = ${s5.dPd} Pa (drop, 2S/R) and ${s5.dPb} Pa (soap bubble, 4S/R)`);
  return svgDoc(w, h, 'Force balance on one half of a liquid drop and one half of a soap bubble: the excess pressure acting on the cut circle balances the surface tension along the rim, once for a drop and twice for a soap bubble with two surfaces, giving 2S over R and 4S over R', s);
})();

// ---------------------------------------------------------------- CAP: capillary rise of water and depression of mercury (30 px per cm)
export const CAP_FIG = (() => {
  const w = 420;
  const h = 248;
  const k = 30; // px per cm
  const yl = 160;
  const hw = s6.h * 100 * k; // rise, px
  const hm = -s6.hHg * 100 * k; // depression, px
  let s = S.rect(30, yl, 110, 52, { c: 'none', fill: BLUE, fop: 0.22, sw: 0 }) + S.path(`M30 ${yl - 4} V212 H140 V${yl - 4}`, { w: 2 }) + S.line(30, yl, 140, yl, { c: BLUE, w: 1.6 });
  s += S.rect(74, yl - hw, 12, hw + 36, { c: 'none', fill: BLUE, fop: 0.35, sw: 0 }) + S.line(74, 38, 74, yl + 36, { w: 1.6 }) + S.line(86, 38, 86, yl + 36, { w: 1.6 });
  s += S.path(`M74 ${f1(yl - hw - 4)} Q80 ${f1(yl - hw + 3)} 86 ${f1(yl - hw - 4)}`, { c: BLUE, w: 1.8 });
  s += S.line(86, yl - hw, 160, yl - hw, { c: MUT, w: 1, dash: '3 3' }) + S.line(140, yl, 160, yl, { c: MUT, w: 1, dash: '3 3' });
  s += dimV(156, yl - hw, yl, GRN);
  s += S.text(162, yl - hw / 2 + 4, `h = ${dec(s6.h * 100, 3)} cm`, { size: 11, w: 'bold', c: GRN });
  s += S.text(80, 28, 'water, r = 0.50 mm', { a: 'middle', size: 10 }) + S.text(85, 232, 'θ ≈ 0°: rises', { a: 'middle', size: 10, w: 'bold' });
  s += S.rect(250, yl, 110, 52, { c: 'none', fill: MUT, fop: 0.45, sw: 0 }) + S.path(`M250 ${yl - 4} V212 H360 V${yl - 4}`, { w: 2 }) + S.line(250, yl, 360, yl, { c: 'currentColor', w: 1.6 });
  s += S.rect(293, yl + hm, 24, 38 - hm, { c: 'none', fill: MUT, fop: 0.45, sw: 0 }) + S.line(293, 38, 293, yl + 38, { w: 1.6 }) + S.line(317, 38, 317, yl + 38, { w: 1.6 });
  s += S.path(`M293 ${f1(yl + hm + 6)} Q305 ${f1(yl + hm - 6)} 317 ${f1(yl + hm + 6)}`, { w: 1.8 });
  s += S.line(317, yl + hm, 345, yl + hm, { c: MUT, w: 1, dash: '3 3' }) + S.text(348, yl + hm + 4, `fall ${dec(-s6.hHg * 1000, 3)} mm`, { size: 10, w: 'bold', c: RED });
  s += S.text(305, 28, 'mercury, r = 1.0 mm', { a: 'middle', size: 10 }) + S.text(305, 232, `θ = ${s6.th}°: falls`, { a: 'middle', size: 10, w: 'bold' });
  s += S.text(w - 4, h - 4, 'rise and fall drawn at 30 px per cm; tube widths exaggerated', { a: 'end', size: 10 });
  const hF = capHeight(S_W, 0, RHO, s6.r);
  const hM = capHeight(s6.Sh, s6.th, RHO_HG, s6.rh);
  check(near(hF, s6.h, 1e-6) && near(hM, s6.hHg, 1e-6) && hM < 0 && near(hw, k * 100 * hF, 1e-6), `capillary: force balance (2πrS cosθ = ρ g π r² h, solved numerically) gives rise ${(hF * 100).toFixed(3)} cm for water and ${(hM * 1000).toFixed(3)} mm (a fall) for mercury; drawn at 30 px per cm`);
  return svgDoc(w, h, 'Two thin tubes dipped in liquids: water, which wets the glass, rises 2.94 centimetres in a tube of radius 0.50 millimetres with a concave meniscus, while mercury, which does not wet the glass, is pushed 5.35 millimetres below the outside level in a tube of radius 1.0 millimetre with a convex meniscus', s);
})();

export const ALL = { DEPTH_FIG, BARO_FIG, LIFT_FIG, PIPE_FIG, TANK_FIG, VENTURI_FIG, AERO_FIG, SHEAR_FIG, STOKES_FIG, FILM_FIG, CONTACT_FIG, BUBBLE_FIG, CAP_FIG };
