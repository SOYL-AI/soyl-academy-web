// ch11 diagrams, all drawn from numbers with self-checks: the zeroth law, work as the area under three paths on a P-V
// diagram, an isotherm against an adiabat, the four basic processes, a rectangular cycle, and an engine beside a refrigerator.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { GAMMA_MONO, areaUnder, loopWork, sample, isotherm, adiabat } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const poly = (pts, o = {}) => S.path(`M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}${o.close ? ' Z' : ''}`, o);

// ---------------------------------------------------------------- ZERO: two blocks, one thermometer
export const ZERO_DATA = { reading: 45.0, A: { x: 112, w: 78 }, C: { x: 190, w: 40 }, B: { x: 230, w: 78 } };
export const ZERO = (() => {
  const { reading, A, C, B } = ZERO_DATA;
  const w = 420;
  const h = 215;
  const top = 56;
  const bot = 136;
  let s = S.rect(A.x, top + 20, A.w, bot - top - 20, { c: ACC, fill: ACC, fop: 0.3 }) + S.text(A.x + A.w / 2, top + 66, 'A', { a: 'middle', size: 16, w: 'bold' });
  s += S.rect(B.x, top + 20, B.w, bot - top - 20, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(B.x + B.w / 2, top + 66, 'B', { a: 'middle', size: 16, w: 'bold' });
  s += S.rect(C.x, top - 6, C.w, bot - top + 6, { c: 'currentColor', fill: FILL, rx: 6 });
  s += S.line(C.x + C.w / 2, top + 4, C.x + C.w / 2, bot - 16, { c: RED, w: 4 }) + S.circle(C.x + C.w / 2, bot - 12, 7, { c: RED, fill: RED });
  s += S.text(C.x + C.w / 2, top - 14, 'thermometer C', { a: 'middle', size: 10, w: 'bold' });
  s += S.text(A.x + A.w / 2, top + 14, 'copper block', { a: 'middle', size: 10 }) + S.text(B.x + B.w / 2, top + 14, 'aluminium block', { a: 'middle', size: 10 });
  s += S.text(A.x + A.w / 2, bot + 18, `A with C: ${reading.toFixed(1)} °C`, { a: 'middle', size: 10, c: ACC }) + S.text(B.x + B.w / 2, bot + 18, `B with C: ${reading.toFixed(1)} °C`, { a: 'middle', size: 10, c: BLUE });
  s += S.arrow(A.x + A.w / 2, bot + 38, B.x + B.w / 2, bot + 38, { c: GRN, w: 1.5, size: 6, dash: '4 3' }) + S.arrow(B.x + B.w / 2, bot + 38, A.x + A.w / 2, bot + 38, { c: GRN, w: 1.5, size: 6, dash: '4 3' });
  s += S.text(w / 2, bot + 56, 'So A and B are also in thermal equilibrium: no net heat flows between them.', { a: 'middle', size: 10, c: GRN });
  s += S.text(w / 2, 14, 'Zeroth law: equal to a third body means equal to each other', { a: 'middle', size: 11, w: 'bold' });
  check(A.x + A.w === C.x && C.x + C.w === B.x && reading === 45, `zeroth: both blocks drawn touching the thermometer (edges at x = ${C.x} and ${C.x + C.w}); both readings ${reading.toFixed(1)} °C, so TA = TB`);
  return svgDoc(w, h, 'A copper block A and an aluminium block B each touching a thermometer C: both readings are 45 degrees Celsius, so by the zeroth law A and B are in thermal equilibrium with each other', s);
})();

// ---------------------------------------------------------------- shared P-V panel helpers
const pvAxes = (ox, oy, vmax, pmax, sx, sy, { ticksV = [], ticksP = [] } = {}) => {
  let s = S.arrow(ox, oy, ox + vmax * sx + 8, oy, { w: 1.3, size: 6 }) + S.arrow(ox, oy, ox, oy - pmax * sy - 8, { w: 1.3, size: 6 });
  s += S.text(ox + vmax * sx + 8, oy - 8, 'V (L)', { a: 'end', size: 10 }) + S.text(ox + 4, oy - pmax * sy - 6, 'P (kPa)', { size: 10 });
  for (const v of ticksV) s += S.line(ox + v * sx, oy, ox + v * sx, oy + 4, { w: 1 }) + S.text(ox + v * sx, oy + 14, String(v), { a: 'middle', size: 10 });
  for (const p of ticksP) s += S.line(ox - 4, oy - p * sy, ox, oy - p * sy, { w: 1 }) + S.text(ox - 6, oy - p * sy + 4, String(p), { a: 'end', size: 10 });
  return s;
};

// ---------------------------------------------------------------- PVPATHS: work depends on the path (900, 600, 750 J)
export const PVPATHS_DATA = { A: [2, 300], B: [5, 200], sx: 17, sy: 0.3 };
export const PVPATHS = (() => {
  const { A, B, sx, sy } = PVPATHS_DATA;
  const w = 420;
  const h = 250;
  const oy = 188;
  const paths = [
    { name: 'path a', how: 'expand, then cool', pts: [A, [B[0], A[1]], B], W: A[1] * (B[0] - A[0]) },
    { name: 'path b', how: 'cool, then expand', pts: [A, [A[0], B[1]], B], W: B[1] * (B[0] - A[0]) },
    { name: 'path c', how: 'straight line', pts: [A, B], W: ((A[1] + B[1]) / 2) * (B[0] - A[0]) },
  ];
  let s = '';
  const got = [];
  paths.forEach((p, i) => {
    const ox = 30 + i * 135;
    const px = ([v, pr]) => [ox + v * sx, oy - pr * sy];
    s += pvAxes(ox, oy, 6, 350, sx, sy, { ticksV: [2, 5] });
    // shaded region under the path (down to the V axis), clockwise polygon in pixels
    const base = [px([A[0], 0]), ...p.pts.map(px), px([B[0], 0])];
    s += poly(base, { close: true, c: 'none', fill: BLUE, fop: 0.28, w: 0 });
    s += poly(p.pts.map(px), { c: RED, w: 2.2, join: 'round' });
    const [ax, ay] = px(A);
    const [bx, by] = px(B);
    s += S.circle(ax, ay, 3.5, { c: 'currentColor', fill: 'currentColor' }) + S.circle(bx, by, 3.5, { c: 'currentColor', fill: 'currentColor' });
    s += S.text(ax - 6, ay - 5, 'A', { a: 'end', size: 11, w: 'bold' }) + S.text(bx + 5, by - 6, 'B', { size: 11, w: 'bold' });
    s += S.text(ox + 56, oy + 30, `${p.name}: W = ${p.W} J`, { a: 'middle', size: 11, w: 'bold' });
    s += S.text(ox + 56, oy + 43, p.how, { a: 'middle', size: 10, c: MUT });
    // area of the shaded polygon in physical units (kPa x L = J) from the pixel polygon
    let sh = 0;
    for (let k = 0; k < base.length; k++) {
      const [x1, y1] = base[k];
      const [x2, y2] = base[(k + 1) % base.length];
      sh += x1 * y2 - x2 * y1;
    }
    got.push(Math.abs(sh / 2) / (sx * sy));
  });
  s += S.text(w / 2, 14, 'Same start A, same end B, three paths: W = area under each', { a: 'middle', size: 10.5, w: 'bold' });
  check(paths.every((p, i) => near(got[i], p.W, 1e-6)) && paths[0].W === 900 && paths[1].W === 600 && paths[2].W === 750, `pv-paths: shaded pixel areas ${got.map((x) => x.toFixed(1)).join(', ')} J equal P ΔV, P ΔV and the trapezoid (${paths.map((p) => p.W).join(', ')} J); the areas differ with the same end states`);
  return svgDoc(w, h, 'Three P-V diagrams with the same start A at 2 litres and 300 kilopascals and the same end B at 5 litres and 200 kilopascals: the shaded area under path a is 900 joules, under path b 600 joules and under the straight path c 750 joules', s, { size: 10 });
})();

// ---------------------------------------------------------------- ISOAD: isotherm against adiabat from the same state
export const ISOAD_DATA = { P1: 400, V1: 2, V2: 4, gamma: GAMMA_MONO, sx: 68, sy: 0.42 };
export const ISOAD = (() => {
  const { P1, V1, V2, gamma, sx, sy } = ISOAD_DATA;
  const w = 420;
  const h = 288;
  const ox = 46;
  const oy = 215;
  const iso = isotherm(P1 * V1);
  const adi = adiabat(P1, V1, gamma);
  const px = ([v, p]) => [ox + v * sx, oy - p * sy];
  let s = pvAxes(ox, oy, 5, 450, sx, sy, { ticksV: [1, 2, 3, 4, 5], ticksP: [100, 200, 300, 400] });
  const cIso = sample(iso, V1, V2, 80);
  const cAdi = sample(adi, V1, V2, 80);
  const shade = (c) => [px([V1, 0]), ...c.map(px), px([V2, 0])];
  s += poly(shade(cIso), { close: true, c: 'none', fill: BLUE, fop: 0.2, w: 0 }) + poly(shade(cAdi), { close: true, c: 'none', fill: RED, fop: 0.3, w: 0 });
  s += poly(sample(iso, V1, 4.6, 80).map(px), { c: BLUE, w: 2.2 }) + poly(sample(adi, V1, 4.6, 80).map(px), { c: RED, w: 2.2 });
  s += S.line(...px([V2, 0]), ...px([V2, iso(V2)]), { c: MUT, w: 1, dash: '3 3' });
  const [ax, ay] = px([V1, P1]);
  s += S.circle(ax, ay, 3.5, { c: 'currentColor', fill: 'currentColor' }) + S.text(ax - 6, ay - 4, 'A', { a: 'end', size: 11, w: 'bold' });
  const Wiso = P1 * V1 * Math.log(V2 / V1);
  const p2 = adi(V2);
  const Wadi = (P1 * V1 - p2 * V2) / (gamma - 1);
  s += S.text(ox + 4.65 * sx, oy - iso(4.6) * sy - 8, 'isotherm', { a: 'end', size: 10, c: BLUE, w: 'bold' });
  s += S.text(ox + 4.65 * sx, oy - adi(4.6) * sy + 16, 'adiabat', { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(ox, 247, `isotherm (T constant): W = P₁V₁ ln 2 = ${Wiso.toFixed(1)} J`, { size: 10.5, c: BLUE, w: 'bold' });
  s += S.text(ox, 262, `adiabat (Q = 0): W = (P₁V₁ − P₂V₂)/(γ − 1) = ${Wadi.toFixed(1)} J`, { size: 10.5, c: RED, w: 'bold' });
  s += S.text(ox, 277, `P₁ = ${P1} kPa, V₁ = ${V1} L, V₂ = ${V2} L, γ = 5/3`, { size: 10.5 });
  // checks: drawn areas against the analytic works, slope ratio at A equals gamma, adiabat ends lower
  const aIso = areaUnder(cIso);
  const aAdi = areaUnder(cAdi);
  const h1 = 1e-6;
  const sl = (f) => (f(V1 + h1) - f(V1 - h1)) / (2 * h1);
  const okA = near(aIso, Wiso, 3e-4) && near(aAdi, Wadi, 3e-4);
  const okSlope = near(sl(adi) / sl(iso), gamma, 1e-6) && adi(V2) < iso(V2) && Wiso > Wadi;
  check(okA && okSlope, `iso-ad: areas under the drawn curves ${aIso.toFixed(1)} J and ${aAdi.toFixed(1)} J match nRT ln 2 = ${Wiso.toFixed(1)} J and (P1V1 − P2V2)/(γ − 1) = ${Wadi.toFixed(1)} J; at A the adiabat is ${(sl(adi) / sl(iso)).toFixed(3)} times as steep as the isotherm (γ = ${gamma.toFixed(3)}); it ends lower (${adi(V2).toFixed(1)} against ${iso(V2).toFixed(1)} kPa)`);
  return svgDoc(w, h, 'A P-V diagram: an isotherm and an adiabat both start at A (2 litres, 400 kilopascals) and run to 4 litres. The adiabat is steeper and ends lower, at about 126 kilopascals against 200, so the area under it, 444 joules, is smaller than under the isotherm, 554.5 joules', s);
})();

// ---------------------------------------------------------------- FOUR: isobaric, isochoric, isothermal, adiabatic from one start state
export const FOUR_DATA = { A: [2, 300], V2: 5, gamma: GAMMA_MONO, sx: 25, sy: 0.24, pvEnd: 120 };
export const FOUR = (() => {
  const { A, V2, gamma, sx, sy, pvEnd } = FOUR_DATA;
  const w = 420;
  const h = 342;
  const iso = isotherm(A[0] * A[1]);
  const adi = adiabat(A[1], A[0], gamma);
  const defs = [
    { title: 'isobaric: P constant', line2: 'W = P(V₂ − V₁)', pts: [A, [V2, A[1]]], shade: true },
    { title: 'isochoric: V constant', line2: 'W = 0', pts: [A, [A[0], pvEnd]], shade: false },
    { title: 'isothermal: T constant', line2: 'ΔU = 0 (ideal gas); Q = W', pts: sample(iso, A[0], V2, 50), shade: true },
    { title: 'adiabatic: Q = 0', line2: 'ΔU = −W; steeper than isotherm', pts: sample(adi, A[0], V2, 50), shade: true },
  ];
  let s = '';
  const res = [];
  defs.forEach((d, i) => {
    const ox = 30 + (i % 2) * 205;
    const oy = 112 + Math.floor(i / 2) * 170;
    const px = ([v, p]) => [ox + v * sx, oy - p * sy];
    s += pvAxes(ox, oy, 6, 400, sx, sy);
    if (i === 3) s += poly(sample(iso, A[0], V2, 50).map(px), { c: MUT, w: 1.2, dash: '4 3' }) + S.text(...px([V2, iso(V2)]).map((x, k) => (k ? x - 4 : x + 4)), 'isotherm', { size: 10, c: MUT });
    if (d.shade) s += poly([px([A[0], 0]), ...d.pts.map(px), px([d.pts[d.pts.length - 1][0], 0])], { close: true, c: 'none', fill: BLUE, fop: 0.22, w: 0 });
    s += poly(d.pts.map(px), { c: RED, w: 2.2 });
    const [ex, ey] = px(d.pts[d.pts.length - 1]);
    const [px1, py1] = px(d.pts[d.pts.length - 2]);
    s += S.head(ex, ey, Math.atan2(ey - py1, ex - px1), { size: 8, c: RED });
    const [ax, ay] = px(A);
    s += S.circle(ax, ay, 3.2, { c: 'currentColor', fill: 'currentColor' }) + S.text(ax - 5, ay - 5, 'A', { a: 'end', size: 10, w: 'bold' });
    s += S.text(ox, oy + 28, d.title, { size: 10.5, w: 'bold' }) + S.text(ox, oy + 41, d.line2, { size: 10, c: MUT });
    res.push(d.pts);
  });
  const [pa, pb, pc, pd] = res;
  const constP = pa.every((p) => p[1] === A[1]);
  const constV = pb.every((p) => p[0] === A[0]);
  const constT = pc.every((p) => near(p[0] * p[1], A[0] * A[1], 1e-12));
  const constAd = pd.every((p) => near(p[1] * p[0] ** gamma, A[1] * A[0] ** gamma, 1e-12));
  const endAdi = pd[pd.length - 1][1];
  const endIso = pc[pc.length - 1][1];
  const Wp = areaUnder(pa);
  const Wt = areaUnder(pc);
  const Wa = areaUnder(pd);
  const okW = near(Wp, A[1] * (V2 - A[0]), 1e-9) && near(Wt, A[0] * A[1] * Math.log(V2 / A[0]), 3e-4) && near(Wa, (A[0] * A[1] - endAdi * V2) / (gamma - 1), 3e-4);
  check(constP && constV && constT && constAd && endAdi < endIso && okW && pvEnd === (A[0] * A[1]) / 5, `four: isobaric P = ${A[1]} kPa on every point; isochoric V = ${A[0]} L; isothermal PV = ${A[0] * A[1]} J and adiabatic P V^γ constant; adiabat ends at ${endAdi.toFixed(1)} kPa below the isotherm's ${endIso.toFixed(1)} kPa; areas ${Wp.toFixed(1)}, ${Wt.toFixed(1)} and ${Wa.toFixed(1)} J match PΔV, nRT ln(V₂/V₁), (P₁V₁ − P₂V₂)/(γ − 1)`);
  return svgDoc(w, h, 'Four P-V diagrams from the same start A at 2 litres and 300 kilopascals: an isobaric expansion along a horizontal line, an isochoric pressure drop along a vertical line, an isothermal expansion along a hyperbola and an adiabatic expansion along a steeper curve that ends lower than the isotherm', s, { size: 10 });
})();

// ---------------------------------------------------------------- CYCLE: a rectangular cycle, net work = enclosed area
export const CYCLE_DATA = { A: [2, 100], B: [2, 300], C: [6, 300], D: [6, 100], sx: 40, sy: 0.55 };
export const CYCLE = (() => {
  const { A, B, C, D, sx, sy } = CYCLE_DATA;
  const w = 420;
  const h = 250;
  const ox = 56;
  const oy = 212;
  const px = ([v, p]) => [ox + v * sx, oy - p * sy];
  let s = pvAxes(ox, oy, 8, 350, sx, sy, { ticksV: [2, 4, 6, 8], ticksP: [100, 200, 300] });
  const loop = [A, B, C, D];
  s += poly(loop.map(px), { close: true, c: 'none', fill: BLUE, fop: 0.22, w: 0 });
  const seg = (p, q, c) => S.line(...px(p), ...px(q), { c, w: 2.4 });
  s += seg(A, B, RED) + seg(B, C, RED) + seg(C, D, GRN) + seg(D, A, GRN);
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  for (const [p, q, c] of [[A, B, RED], [B, C, RED], [C, D, GRN], [D, A, GRN]]) {
    const [mx, my] = px(mid(p, q));
    const [x1, y1] = px(p);
    const [x2, y2] = px(q);
    s += S.head(mx + (x2 - x1) * 0.02, my + (y2 - y1) * 0.02, Math.atan2(y2 - y1, x2 - x1), { size: 8, c });
  }
  for (const [n, p, dx, dy] of [['A', A, -8, 14], ['B', B, -8, -5], ['C', C, 8, -5], ['D', D, 8, 14]]) s += S.circle(...px(p), 3.2, { c: 'currentColor', fill: 'currentColor' }) + S.text(px(p)[0] + dx, px(p)[1] + dy, n, { a: dx < 0 ? 'end' : 'start', size: 11, w: 'bold' });
  const W = (B[1] - A[1]) * (C[0] - B[0]);
  s += S.lines(ox + 4 * sx, oy - 200 * sy - 16, ['net work = area', `200 kPa × 4 L = ${W} J`], { a: 'middle', size: 10.5, w: 'bold', dy: 14 });
  s += S.lines(px(mid(A, B))[0] - 10, px(mid(A, B))[1] - 2, ['AB: heated', 'at constant V'], { a: 'end', size: 10, c: RED, dy: 12 });
  s += S.text(px(mid(B, C))[0], px(mid(B, C))[1] - 8, 'BC: expands at constant P', { a: 'middle', size: 10, c: RED });
  s += S.lines(px(mid(C, D))[0] + 10, px(mid(C, D))[1] - 2, ['CD: cooled', 'at constant V'], { size: 10, c: GRN, dy: 12 });
  s += S.text(px(mid(D, A))[0], px(mid(D, A))[1] + 20, 'DA: compressed at constant P', { a: 'middle', size: 10, c: GRN });
  const pxPts = loop.map(px);
  let sh = 0;
  for (let k = 0; k < 4; k++) sh += pxPts[k][0] * pxPts[(k + 1) % 4][1] - pxPts[(k + 1) % 4][0] * pxPts[k][1];
  const phys = Math.abs(sh / 2) / (sx * sy);
  check(near(phys, W, 1e-9) && loopWork(loop) === W && W === 800,`cycle: pixel area of the loop ${phys.toFixed(2)} J = (ΔP)(ΔV) = ${W} J; the vertices A→B→C→D run clockwise on the P–V axes, so the work done by the gas is positive (+${loopWork(loop)} J)`);
  return svgDoc(w, h, 'A rectangular cycle on a P-V diagram run clockwise: A at 2 litres and 100 kilopascals up to B at 300 kilopascals at constant volume, across to C at 6 litres at constant pressure, down to D at constant volume and back to A at constant pressure; the enclosed area is the net work, 800 joules', s, { size: 10 });
})();

// ---------------------------------------------------------------- ENGINE and FRIDGE: energy flows drawn with widths proportional to the energy
export const ENG_DATA = { engine: { Q1: 5.0, Q2: 3.8, W: 1.2, k: 9 }, fridge: { Q2: 1.8, W: 0.45, Q1: 2.25, k: 20 } };
export const ENGFRIDGE = (() => {
  const { engine: E, fridge: F } = ENG_DATA;
  const w = 420;
  const h = 262;
  const vbar = (cx, y1, y2, wp, c) => {
    const dir = Math.sign(y2 - y1);
    const hd = 12;
    return S.rect(cx - wp / 2, Math.min(y1, y2 - dir * hd), wp, Math.abs(y2 - y1) - hd, { c, fill: c, fop: 0.5 }) + S.path(`M${f1(cx - wp / 2 - 5)} ${f1(y2 - dir * hd)} L${f1(cx + wp / 2 + 5)} ${f1(y2 - dir * hd)} L${f1(cx)} ${f1(y2)} Z`, { c, fill: c, w: 1 });
  };
  const hbar = (x1, x2, cy, wp, c) => S.rect(Math.min(x1, x2 - 12), cy - wp / 2, Math.abs(x2 - x1) - 12, wp, { c, fill: c, fop: 0.5 }) + S.path(`M${f1(x2 - 12)} ${f1(cy - wp / 2 - 5)} L${f1(x2 - 12)} ${f1(cy + wp / 2 + 5)} L${f1(x2)} ${f1(cy)} Z`, { c, fill: c, w: 1 });
  let s = '';
  // engine panel (left): hot reservoir at the top, heat Q1 in, work W out to the right, Q2 rejected downward
  const cx1 = 100;
  s += S.rect(20, 22, 160, 26, { c: RED, fill: RED, fop: 0.18 }) + S.text(cx1, 39, 'hot reservoir', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(20, 218, 160, 26, { c: BLUE, fill: BLUE, fop: 0.18 }) + S.text(cx1, 235, 'cold reservoir', { a: 'middle', size: 11, w: 'bold' });
  s += vbar(cx1, 48, 100, E.Q1 * E.k, RED) + vbar(cx1, 150, 218, E.Q2 * E.k, BLUE) + hbar(cx1 + 34, 196, 125, E.W * E.k, GRN);
  s += S.circle(cx1, 125, 28, { c: 'currentColor', fill: FILL, sw: 1.5 }) + S.text(cx1, 129, 'engine', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(cx1 + E.Q1 * E.k / 2 + 10, 78, `Q₁ = ${E.Q1.toFixed(1)} kJ`, { size: 10, c: RED, w: 'bold' }) + S.text(cx1 + E.Q2 * E.k / 2 + 10, 190, `Q₂ = ${E.Q2.toFixed(1)} kJ`, { size: 10, c: BLUE, w: 'bold' }) + S.text(186, 112, `W = ${E.W.toFixed(1)} kJ`, { a: 'end', size: 10, c: GRN, w: 'bold' });
  s += S.text(cx1, 12, `heat engine: η = W/Q₁ = ${(E.W / E.Q1) * 100}%`, { a: 'middle', size: 10.5, w: 'bold' });
  // refrigerator panel (right): cold reservoir at the bottom, heat Q2 taken in, work W in from the left, Q1 given out at the top
  const cx2 = 320;
  s += S.rect(240, 22, 160, 26, { c: RED, fill: RED, fop: 0.18 }) + S.text(cx2, 39, 'hot surroundings', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(240, 218, 160, 26, { c: BLUE, fill: BLUE, fop: 0.18 }) + S.text(cx2, 235, 'cold space (inside)', { a: 'middle', size: 11, w: 'bold' });
  s += vbar(cx2, 100, 48, F.Q1 * F.k, RED) + vbar(cx2, 218, 150, F.Q2 * F.k, BLUE) + hbar(232, cx2 - 34, 125, F.W * F.k, GRN);
  s += S.circle(cx2, 125, 28, { c: 'currentColor', fill: FILL, sw: 1.5 }) + S.text(cx2, 129, 'fridge', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(cx2 + F.Q1 * F.k / 2 + 10, 78, `Q₁ = ${F.Q1} MJ`, { size: 10, c: RED, w: 'bold' }) + S.text(cx2 + F.Q2 * F.k / 2 + 10, 190, `Q₂ = ${F.Q2} MJ`, { size: 10, c: BLUE, w: 'bold' }) + S.text(236, 112, `W = ${F.W} MJ`, { size: 10, c: GRN, w: 'bold' });
  s += S.text(cx2, 12, `refrigerator: COP = Q₂/W = ${F.Q2 / F.W}`, { a: 'middle', size: 10.5, w: 'bold' });
  const okE = near(E.Q1 * E.k, E.Q2 * E.k + E.W * E.k, 1e-12) && near(E.W / E.Q1, 0.24, 1e-12);
  const okF = near(F.Q1 * F.k, F.Q2 * F.k + F.W * F.k, 1e-12) && near(F.Q2 / F.W, 4, 1e-12);
  check(okE && okF, `engine/fridge: bar widths ${(E.Q1 * E.k).toFixed(1)}, ${(E.Q2 * E.k).toFixed(1)}, ${(E.W * E.k).toFixed(1)} px = ${E.Q1}, ${E.Q2}, ${E.W} kJ at ${E.k} px per kJ (Q₁ = Q₂ + W, η = ${(E.W / E.Q1) * 100}%); refrigerator ${F.Q1 * F.k}, ${F.Q2 * F.k}, ${F.W * F.k} px at ${F.k} px per MJ (Q₁ = Q₂ + W, COP = ${F.Q2 / F.W})`);
  return svgDoc(w, h, 'Energy flow in a heat engine and in a refrigerator, with arrow widths proportional to the energy: the engine takes 5.0 kilojoules from the hot reservoir, delivers 1.2 kilojoules of work and rejects 3.8 kilojoules to the cold reservoir, so its efficiency is 24 percent; the refrigerator takes 1.8 megajoules from the cold space with 0.45 megajoules of work and releases 2.25 megajoules to the surroundings, so its coefficient of performance is 4', s, { size: 10 });
})();

export const ALL = { ZERO, PVPATHS, ISOAD, FOUR, CYCLE, ENGFRIDGE };
