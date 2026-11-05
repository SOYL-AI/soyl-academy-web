// ch10 diagrams, all drawn from numbers with self-checks: the three temperature scales side by side, rods of three metals
// expanding, a bimetallic strip, a frozen pond, steady conduction along a rod and through two slabs, and a vacuum flask.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { ALPHA, DENSITY, seriesTwo, interp } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BRN = 'var(--diagram-brown)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- SCALES: Celsius, Fahrenheit and Kelvin side by side
export const toF = (c) => (9 / 5) * c + 32;
export const toK = (c) => c + 273.15;
export const SCALES = (() => {
  const w = 420;
  const h = 276;
  const yBot = 232;
  const yTop = 44;
  const xs = [96, 218, 340];
  const Y = (frac) => yBot - frac * (yBot - yTop);
  let s = '';
  const heads = ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'];
  xs.forEach((x, i) => {
    s += S.line(x, yTop - 6, x, yBot + 6, { w: 2 }) + S.text(x, 22, heads[i], { a: 'middle', size: 11, w: 'bold' });
  });
  let ok = true;
  for (let c = 0; c <= 100; c += 20) {
    // each scale reads its own number; the height is found from that scale's own formula, not from c
    const fC = c / 100;
    const fF = (toF(c) - 32) / 180;
    const fK = (toK(c) - 273.15) / 100;
    if (!(near(fC, fF, 1e-9) && near(fC, fK, 1e-9)) && c !== 0) ok = false;
    if (c === 0 && !(Math.abs(fF) < 1e-9 && Math.abs(fK) < 1e-9)) ok = false;
    const y = Y(fC);
    const labels = [String(c), String(Math.round(toF(c))), toK(c).toFixed(2)];
    xs.forEach((x, i) => {
      s += S.line(x - 5, y, x + 5, y, { w: 1.5 }) + S.text(x + 9, y + 4, labels[i], { size: 10 });
    });
    s += S.line(xs[0] + 6, y, xs[2] - 6, y, { c: MUT, w: 0.5, dash: '2 4' });
  }
  // body temperature marker
  const yb = Y(37 / 100);
  s += S.line(xs[0] - 12, yb, xs[2] + 12, yb, { c: RED, w: 1.6, dash: '5 3' });
  s += S.text(xs[0] - 16, yb + 4, '37 °C', { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(xs[1] - 6, yb - 6, `${toF(37).toFixed(1)} °F`, { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(xs[2] - 6, yb - 6, `${toK(37).toFixed(2)} K`, { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(xs[0] - 16, Y(1) + 4, 'steam point', { a: 'end', size: 10, c: BLUE });
  s += S.text(xs[0] - 16, Y(0) + 4, 'ice point', { a: 'end', size: 10, c: BLUE });
  s += S.text(w / 2, h - 6, '100 °C = 180 °F = 100 K between the ice point and the steam point', { a: 'middle', size: 10 });
  check(ok && near(toF(37), 98.6, 1e-9) && near(toK(37), 310.15, 1e-9), `scales: each tick sits at one height on all three scales (0 to 100 °C = 32 to 212 °F = 273.15 to 373.15 K); 37 °C = ${toF(37).toFixed(1)} °F = ${toK(37).toFixed(2)} K`);
  return svgDoc(w, h, 'Three vertical thermometer scales side by side: Celsius from 0 to 100, Fahrenheit from 32 to 212 and Kelvin from 273.15 to 373.15 line up at the ice point and the steam point, and a dashed line at body temperature reads 37 degrees Celsius, 98.6 degrees Fahrenheit and 310.15 kelvin', s);
})();

// ---------------------------------------------------------------- EXPAN: equal rods of three metals, same temperature rise
export const EXPAN_DATA = { L: 1.0, dT: 100, exag: 100, Lpx: 180, x0: 96, mats: [['steel', ALPHA.steel], ['copper', ALPHA.copper], ['aluminium', ALPHA.aluminium]] };
export const EXPAN = (() => {
  const { L, dT, exag, Lpx, x0, mats } = EXPAN_DATA;
  const w = 420;
  const h = 232;
  let s = '';
  const exts = [];
  mats.forEach(([name, a], i) => {
    const y = 40 + i * 58;
    const dL = a * L * dT; // m
    const ext = Lpx * (dL / L) * exag; // drawn extension in px (exaggerated)
    exts.push(ext);
    s += S.text(x0 - 8, y + 16, name, { a: 'end', size: 11, w: 'bold' });
    s += S.rect(x0, y, Lpx, 22, { c: BLUE, fill: BLUE, fop: 0.18 });
    s += S.rect(x0 + Lpx, y, ext, 22, { c: RED, fill: RED, fop: 0.4 });
    s += S.line(x0 + Lpx, y - 5, x0 + Lpx, y + 27, { c: MUT, w: 1, dash: '3 2' });
    s += S.text(x0 + Lpx + ext + 8, y + 12, `ΔL = ${(dL * 1000).toFixed(1)} mm`, { size: 11, w: 'bold' });
    s += S.text(x0 + Lpx + ext + 8, y + 26, `α = ${(a * 1e5).toFixed(1)} × 10⁻⁵ K⁻¹`, { size: 10, c: MUT });
  });
  s += S.lines(w / 2, h - 26, [`Rods 1.000 m long, each heated by ${dT} K. Dashed line: original end.`, `Extensions are drawn ${exag} times too large to be visible.`], { a: 'middle', size: 10, dy: 13 });
  const ok = near(exts[1] / exts[0], ALPHA.copper / ALPHA.steel, 1e-9) && near(exts[2] / exts[0], ALPHA.aluminium / ALPHA.steel, 1e-9) && near(exts[0], Lpx * ALPHA.steel * dT * exag, 1e-9);
  check(ok && near(ALPHA.steel * L * dT * 1000, 1.2, 1e-9), `expansion: drawn extensions ${exts.map((e) => e.toFixed(1)).join(', ')} px are in the ratio of the α values (1.2 : 1.7 : 2.3); ΔL = 1.2, 1.7, 2.3 mm for 1.000 m and 100 K`);
  return svgDoc(w, h, 'Three rods of steel, copper and aluminium, each 1 metre long and heated by 100 kelvin: they lengthen by 1.2, 1.7 and 2.3 millimetres, drawn here 100 times too large, so aluminium, with the largest coefficient of linear expansion, lengthens most', s);
})();

// ---------------------------------------------------------------- BIMETAL: brass-and-steel strip, straight and heated
export const BIMETAL_DATA = { Lpx: 130, t: 10, R: 110 };
export const BIMETAL = (() => {
  const { Lpx, t, R } = BIMETAL_DATA;
  const w = 420;
  const h = 236;
  let s = '';
  // left: straight strip at room temperature (brass on top)
  const x0 = 24;
  const y0 = 80;
  s += S.rect(x0, y0, Lpx, t, { c: BRN, fill: YEL, fop: 0.55 }) + S.rect(x0, y0 + t, Lpx, t, { c: MUT, fill: FILL, fop: 0.9 });
  s += S.text(x0 + 6, y0 - 8, 'cold: straight', { size: 11, w: 'bold' });
  s += S.text(x0 + Lpx / 2, y0 + 2 * t + 16, 'brass (top)  |  steel (bottom)', { a: 'middle', size: 10 });
  s += S.rect(x0 - 8, y0 - 12, 8, 2 * t + 24, { c: 'currentColor', fill: MUT, fop: 0.6 });
  // right: the heated strip curls, brass on the outside (longer arc)
  const theta = Lpx / R; // interface keeps its length
  const xc = 262;
  const yc = 170;
  const P = (r, phi) => [xc + r * Math.sin(phi), yc - r * Math.cos(phi)];
  const layer = (r1, r2, c, fillc, fop) => {
    const [ax, ay] = P(r1, 0);
    const [bx, by] = P(r1, theta);
    const [cx, cy] = P(r2, theta);
    const [dx, dy] = P(r2, 0);
    const sweepOut = 1;
    const sweepIn = 0;
    return S.path(`M${f1(ax)} ${f1(ay)} A${r1} ${r1} 0 0 ${sweepOut} ${f1(bx)} ${f1(by)} L${f1(cx)} ${f1(cy)} A${r2} ${r2} 0 0 ${sweepIn} ${f1(dx)} ${f1(dy)} Z`, { c, fill: fillc, fop, w: 1.5 });
  };
  s += layer(R + t, R, BRN, YEL, 0.55) + layer(R, R - t, MUT, FILL, 0.9);
  s += S.rect(xc - 8, yc - R - t - 12, 8, 2 * t + 24, { c: 'currentColor', fill: MUT, fop: 0.6 });
  s += S.text(xc - 70, 24, 'hot: curls, brass on the outside', { size: 11, w: 'bold' });
  s += S.rect(x0, 150, 14, 10, { c: BRN, fill: YEL, fop: 0.55 }) + S.text(x0 + 20, 159, 'brass: larger α, longer outer arc', { size: 10 });
  s += S.rect(x0, 170, 14, 10, { c: MUT, fill: FILL, fop: 0.9 }) + S.text(x0 + 20, 179, 'steel: smaller α, shorter inner arc', { size: 10 });
  s += S.text(w / 2, h - 6, 'α(brass) = 1.9 × 10⁻⁵ K⁻¹ is larger than α(steel) = 1.2 × 10⁻⁵ K⁻¹. Bending is exaggerated.', { a: 'middle', size: 10 });
  const arcOuter = theta * (R + t);
  const arcMid = theta * R;
  const arcInner = theta * (R - t);
  check(near(arcMid, Lpx, 1e-9) && arcOuter > arcMid && arcMid > arcInner && near(arcOuter / arcInner, (R + t) / (R - t), 1e-9) && ALPHA.brass > ALPHA.steel, `bimetal: interface keeps its length ${Lpx} px, outer (brass) arc ${arcOuter.toFixed(1)} px > inner (steel) arc ${arcInner.toFixed(1)} px; brass α ${ALPHA.brass} > steel α ${ALPHA.steel}`);
  return svgDoc(w, h, 'A bimetallic strip of brass bonded to steel: straight when cold, and when heated it curls with the brass on the outside of the curve, because brass expands more than steel for the same temperature rise', s);
})();

// ---------------------------------------------------------------- POND: layers of a frozen pond with densities from the table
export const POND_LAYERS = [0, 1, 2, 3, 4];
export const POND = (() => {
  const w = 420;
  const h = 262;
  let s = '';
  const x0 = 120;
  const wid = 170;
  s += S.text(x0 + wid / 2, 18, 'air at −10 °C', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(x0, 26, wid, 26, { c: BLUE, fill: FILL, fop: 0.95 }) + S.text(x0 + wid / 2, 43, 'ice, 0 °C', { a: 'middle', size: 11, w: 'bold' });
  const rho = POND_LAYERS.map((tc) => DENSITY.find(([x]) => x === tc)[1]);
  const lo = rho[0];
  const hi = rho[rho.length - 1];
  POND_LAYERS.forEach((tc, i) => {
    const y = 52 + i * 34;
    const op = 0.12 + (0.5 * (rho[i] - lo)) / (hi - lo);
    s += S.rect(x0, y, wid, 34, { c: BLUE, fill: BLUE, fop: op });
    s += S.text(x0 - 8, y + 21, `${tc} °C`, { a: 'end', size: 11, w: 'bold' });
    s += S.text(x0 + wid + 8, y + 21, `${rho[i].toFixed(2)} kg m⁻³`, { size: 10 });
  });
  s += S.rect(x0 - 6, 222, wid + 12, 14, { c: BRN, fill: BRN, fop: 0.35 }) + S.text(x0 + wid / 2, 233, 'bed of the pond', { a: 'middle', size: 10 });
  s += S.arrow(x0 - 70, 62, x0 - 70, 206, { c: GRN, w: 1.5, size: 6 }) + S.text(x0 - 74, 134, 'depth', { a: 'end', size: 10, c: GRN });
  s += S.text(w - 4, 248, 'Densest water (4 °C) sinks to the bottom; shading shows density.', { a: 'end', size: 10 });
  const inc = rho.every((x, i) => i === 0 || x > rho[i - 1]);
  const tab = DENSITY.every(([, d], i) => i === 0 || (i <= 4 ? d > DENSITY[i - 1][1] : d <= DENSITY[i - 1][1]));
  const maxT = DENSITY.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  check(inc && tab && maxT === 4, `pond: layer densities ${rho.join(', ')} kg m⁻³ rise with depth from 0 °C to 4 °C and match the table; the table peaks at ${maxT} °C and falls again above it`);
  return svgDoc(w, h, 'Cross-section of a frozen pond: ice at 0 degrees Celsius on top, then water layers at 0, 1, 2, 3 and 4 degrees Celsius with increasing density, the densest water at 4 degrees Celsius resting on the bed of the pond', s);
})();

// ---------------------------------------------------------------- ROD: steady conduction along a lagged copper rod
export const ROD_DATA = { Th: 100, Tc: 28, L: 0.8, A: 4.0e-4, K: 385, pxPerM: 300, x0: 70 };
export const ROD = (() => {
  const { Th, Tc, L, pxPerM, x0 } = ROD_DATA;
  const w = 420;
  const h = 250;
  const xe = x0 + L * pxPerM;
  let s = '';
  s += S.rect(x0 - 38, 56, 38, 36, { c: RED, fill: RED, fop: 0.28 }) + S.text(x0 - 19, 108, `${Th} °C`, { a: 'middle', size: 11, c: RED, w: 'bold' });
  s += S.rect(xe, 56, 38, 36, { c: BLUE, fill: BLUE, fop: 0.28 }) + S.text(xe + 19, 108, `${Tc} °C`, { a: 'middle', size: 11, c: BLUE, w: 'bold' });
  s += S.rect(x0, 62, xe - x0, 24, { c: BRN, fill: YEL, fop: 0.4 }) + S.rect(x0, 56, xe - x0, 36, { c: MUT, dash: '4 3', sw: 1 });
  s += S.text((x0 + xe) / 2, 48, 'rod (copper), lagged on its sides', { a: 'middle', size: 10 });
  s += S.arrow(x0 + 30, 80, xe - 30, 80, { c: RED, w: 2, size: 7 }) + S.text((x0 + xe) / 2, 73, 'H', { a: 'middle', size: 11, w: 'bold', c: RED });
  s += S.line(x0, 96, x0, 122, { c: MUT, w: 1 }) + S.line(xe, 96, xe, 122, { c: MUT, w: 1 });
  s += S.arrow(x0, 120, xe, 120, { c: GRN, w: 1.2, size: 5 }) + S.arrow(xe, 120, x0, 120, { c: GRN, w: 1.2, size: 5 });
  s += S.text((x0 + xe) / 2, 134, `L = ${L.toFixed(2)} m`, { a: 'middle', size: 10, c: GRN });
  // temperature profile
  const yT = (T) => 220 - ((T - 20) / 90) * 62;
  s += S.arrow(x0 - 10, 226, xe + 24, 226, { w: 1.2, size: 5 }) + S.arrow(x0, 230, x0, 142, { w: 1.2, size: 5 });
  s += S.text(xe + 24, 242, 'distance x', { a: 'end', size: 10 }) + S.text(x0 + 6, 148, 'T (°C)', { size: 10 });
  s += S.line(x0, yT(Th), xe, yT(Tc), { c: RED, w: 2.4 });
  s += S.line(x0, yT(Th), x0 - 4, yT(Th), { w: 1 }) + S.text(x0 - 7, yT(Th) + 4, String(Th), { a: 'end', size: 10 });
  s += S.line(xe, yT(Tc), xe + 4, yT(Tc), { w: 1 }) + S.text(xe + 7, yT(Tc) + 4, String(Tc), { size: 10 });
  const Tm = (Th + Tc) / 2;
  const xm = (x0 + xe) / 2;
  s += S.circle(xm, yT(Tm), 3, { c: RED, fill: RED }) + S.text(xm + 8, yT(Tm) - 6, `middle: ${Tm} °C`, { size: 10 });
  const grad = (Th - Tc) / L;
  s += S.text(xe - 6, 164, `gradient ${(Th - Tc).toFixed(0)} / ${L.toFixed(2)} = ${grad.toFixed(0)} K m⁻¹`, { a: 'end', size: 10, c: RED });
  // checks: straight line; mid temperature; drawn slope per metre equals the gradient
  const slopePxPerM = (yT(Tc) - yT(Th)) / L; // px of height per metre
  const kPerPx = 90 / 62; // K per px of height (from yT)
  const okSlope = near(slopePxPerM * kPerPx, grad, 1e-9);
  check(okSlope && near(Tm, 64, 1e-9) && near(grad, 90, 1e-9), `rod: profile is a straight line (middle ${Tm} °C), drawn gradient ${grad.toFixed(0)} K m⁻¹ = (${Th} − ${Tc})/${L}`);
  return svgDoc(w, h, 'A lagged copper rod 0.80 metres long with one end at 100 degrees Celsius and the other at 28 degrees Celsius: in steady state the temperature falls along a straight line, 90 kelvin per metre, and the same heat current H flows along the whole rod', s);
})();

// ---------------------------------------------------------------- SLAB: two slabs in series, temperature profile
export const SLAB_DATA = { Th: 35, Tc: 5, brick: { K: 0.6, L: 0.1 }, ins: { K: 0.04, L: 0.04 }, A: 12, pxPerCm: 10, x0: 130 };
export const SLAB = (() => {
  const { Th, Tc, brick, ins, A, pxPerCm, x0 } = SLAB_DATA;
  const w = 420;
  const h = 262;
  const sol = seriesTwo(brick, ins, A, Th, Tc);
  const Ti = sol.Ti;
  const x1 = x0 + brick.L * 100 * pxPerCm;
  const x2 = x1 + ins.L * 100 * pxPerCm;
  let s = '';
  s += S.rect(x0, 48, x1 - x0, 66, { c: BRN, fill: BRN, fop: 0.3 }) + S.rect(x1, 48, x2 - x1, 66, { c: MUT, fill: YEL, fop: 0.35 });
  s += S.text((x0 + x1) / 2, 42, 'brick', { a: 'middle', size: 11, w: 'bold' }) + S.text((x0 + x1) / 2, 92, `K = ${brick.K}`, { a: 'middle', size: 10 }) + S.text((x0 + x1) / 2, 105, `${brick.L * 100} cm`, { a: 'middle', size: 10 });
  s += S.text((x1 + x2) / 2 + 14, 42, 'insulation', { a: 'middle', size: 11, w: 'bold' }) + S.text((x1 + x2) / 2, 92, `K = ${ins.K}`, { a: 'middle', size: 10 }) + S.text((x1 + x2) / 2, 105, `${ins.L * 100} cm`, { a: 'middle', size: 10 });
  s += S.text(x0 - 8, 70, `outside ${Th} °C`, { a: 'end', size: 11, c: RED, w: 'bold' }) + S.text(x2 + 8, 70, `inside ${Tc} °C`, { size: 11, c: BLUE, w: 'bold' });
  s += S.arrow(x0 - 30, 100, x0 - 4, 100, { c: RED, w: 2, size: 6 }) + S.arrow(x2 + 4, 100, x2 + 30, 100, { c: RED, w: 2, size: 6 });
  s += S.text(x0 - 30, 116, 'H', { size: 11, w: 'bold', c: RED }) + S.text(x2 + 30, 116, 'H', { a: 'end', size: 11, w: 'bold', c: RED });
  s += S.text(w / 2, 20, 'Same heat current H through both slabs in steady state', { a: 'middle', size: 11 });
  // profile
  const yT = (T) => 236 - (T / 40) * 100;
  s += S.arrow(x0 - 14, 236, x2 + 30, 236, { w: 1.2, size: 5 }) + S.arrow(x0 - 6, 240, x0 - 6, 128, { w: 1.2, size: 5 });
  s += S.text(x0 - 10, 134, 'T (°C)', { a: 'end', size: 10 });
  for (const T of [5, 20, 35]) s += S.line(x0 - 9, yT(T), x0 - 3, yT(T), { w: 1 }) + S.text(x0 - 12, yT(T) + 4, String(T), { a: 'end', size: 10 });
  s += S.path(`M${f1(x0)} ${f1(yT(Th))} L${f1(x1)} ${f1(yT(Ti))} L${f1(x2)} ${f1(yT(Tc))}`, { c: RED, w: 2.4 });
  s += S.line(x1, 120, x1, 238, { c: MUT, w: 1, dash: '3 3' });
  s += S.circle(x1, yT(Ti), 3, { c: RED, fill: RED }) + S.text(x1 - 8, yT(Ti) - 8, `${Ti.toFixed(1)} °C`, { a: 'end', size: 10, w: 'bold' });
  s += S.text(w - 4, 254, `slab drops: ${(Th - Ti).toFixed(1)} K and ${(Ti - Tc).toFixed(1)} K`, { a: 'end', size: 10 });
  // checks: interface from the closed form; drops proportional to L/K; heat current equal in both slabs
  const R1 = brick.L / brick.K;
  const R2 = ins.L / ins.K;
  const closed = Th - ((Th - Tc) * R1) / (R1 + R2);
  const H1 = (brick.K * A * (Th - Ti)) / brick.L;
  const H2 = (ins.K * A * (Ti - Tc)) / ins.L;
  check(near(Ti, closed, 1e-9) && near(H1, H2, 1e-9) && near((Th - Ti) / (Ti - Tc), R1 / R2, 1e-9), `slabs: interface ${Ti.toFixed(2)} °C (closed form ${closed.toFixed(2)}); drops ${(Th - Ti).toFixed(2)} and ${(Ti - Tc).toFixed(2)} K are in the ratio of L/K (${(R1 / R2).toFixed(4)}); H = ${H1.toFixed(1)} W through both for A = ${A} m²`);
  return svgDoc(w, h, 'Two slabs in series, a 10 centimetre brick wall at 35 degrees Celsius outside and a 4 centimetre layer of insulation at 5 degrees Celsius inside: the temperature falls along a broken straight line, only 4.3 kelvin across the brick but 25.7 kelvin across the insulation, with the interface at 30.7 degrees Celsius', s);
})();

// ---------------------------------------------------------------- FLASK: a vacuum flask in section
export const FLASK = (() => {
  const w = 420;
  const h = 252;
  let s = '';
  const cx = 236;
  const casing = { x: 172, y: 54, w: 128, h: 172 };
  const outerG = { x: 182, y: 62, w: 108, h: 160 };
  const innerG = { x: 198, y: 70, w: 76, h: 146 };
  s += S.rect(casing.x, casing.y, casing.w, casing.h, { c: 'currentColor', sw: 2.2, rx: 8 });
  s += S.rect(outerG.x, outerG.y, outerG.w, outerG.h, { c: MUT, sw: 1.5, fill: FILL, fop: 0.5 });
  s += S.rect(innerG.x, innerG.y, innerG.w, innerG.h, { c: MUT, sw: 1.5, fill: 'none' });
  s += S.rect(innerG.x + 1, innerG.y + 28, innerG.w - 2, innerG.h - 29, { c: 'none', fill: RED, fop: 0.22, sw: 0 });
  s += S.line(innerG.x - 2.5, innerG.y + 4, innerG.x - 2.5, innerG.y + innerG.h, { c: ACC, w: 2 }) + S.line(innerG.x + innerG.w + 2.5, innerG.y + 4, innerG.x + innerG.w + 2.5, innerG.y + innerG.h, { c: ACC, w: 2 });
  s += S.line(outerG.x + 2.5, outerG.y + 4, outerG.x + 2.5, outerG.y + outerG.h - 6, { c: ACC, w: 2 }) + S.line(outerG.x + outerG.w - 2.5, outerG.y + 4, outerG.x + outerG.w - 2.5, outerG.y + outerG.h - 6, { c: ACC, w: 2 });
  s += S.rect(cx - 22, 36, 44, 30, { c: BRN, fill: YEL, fop: 0.5, rx: 3 });
  s += S.rect(cx - 30, 218, 60, 10, { c: BRN, fill: YEL, fop: 0.5, rx: 2 });
  s += S.text(cx, 150, 'hot tea', { a: 'middle', size: 11, c: RED, w: 'bold' });
  // labels left and right with leader lines
  s += S.lead(casing.x, 90, 124, 90) + S.text(120, 94, 'outer casing', { a: 'end', size: 10 });
  s += S.lead(outerG.x + 6, 130, 124, 130) + S.lines(120, 134, ['vacuum gap:', 'no conduction,', 'no convection'], { a: 'end', size: 10 });
  s += S.lead(outerG.x + 2.5, 190, 124, 190) + S.lines(120, 194, ['silvered surfaces', 'reflect radiation'], { a: 'end', size: 10 });
  s += S.lead(cx + 22, 50, 336, 50) + S.text(340, 54, 'cork stopper:', { size: 10 }) + S.text(340, 67, 'poor conductor', { size: 10 });
  s += S.lead(cx + 30, 222, 336, 222) + S.text(340, 226, 'cork support', { size: 10 });
  s += S.text(w / 2, 20, 'Vacuum flask: all three modes of heat loss are cut down', { a: 'middle', size: 11, w: 'bold' });
  const gap = innerG.x - (outerG.x + outerG.w * 0);
  const ok = casing.x < outerG.x && outerG.x < innerG.x && innerG.x + innerG.w < outerG.x + outerG.w && outerG.x + outerG.w < casing.x + casing.w && gap > 0 && innerG.y + innerG.h < outerG.y + outerG.h;
  const stopperOk = cx - 22 > innerG.x && cx + 22 < innerG.x + innerG.w + 8 + 0 && 36 + 30 > casing.y;
  check(ok && stopperOk, 'flask: casing, outer glass wall and inner glass wall are nested in order with a vacuum gap of 16 px between the walls; the stopper sits over the mouth of the inner vessel');
  return svgDoc(w, h, 'A vacuum flask in section: an outer casing, a double-walled glass vessel with a vacuum between the walls and silvered inner surfaces, a cork stopper at the top and a cork support at the bottom, with hot tea inside', s);
})();

export const ALL = { SCALES, EXPAN, BIMETAL, POND, ROD, SLAB, FLASK };
void interp;
