// ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law: hand-drawn SVGs (allow-listed elements, palette colours only;
// geometry and data computed in JS from data.mjs and self-checked). Sign convention: delta U = q + w, work done ON the system is positive.
import { svgDoc, S, near } from './lib.mjs';
import { R, RL, LATM, CMP, PATHS, CYC, MONO, PCL, wRev, dHfromU } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const RD = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const BR = 'var(--diagram-brown)';
const FILL = 'var(--diagram-fill)';
const f0 = (x) => Math.round(x).toString();
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);

/** Plot frame: returns scale functions. ox, oy = top-left of the plot area; W, H its size. */
function frame(out, ox, oy, W, H, xmax, ymax, xTicks, yTicks, xl, yl) {
  const X = (v) => ox + (v / xmax) * W;
  const Yp = (v) => oy + H - (v / ymax) * H;
  out.push(S.arrow(ox, oy + H, ox + W + 12, oy + H, { w: 1.5, size: 7 }), S.arrow(ox, oy + H, ox, oy - 12, { w: 1.5, size: 7 }));
  xTicks.forEach((t) => out.push(S.line(X(t), oy + H, X(t), oy + H + 4), small(X(t), oy + H + 16, String(t), { a: 'middle' })));
  yTicks.forEach((t) => out.push(S.line(ox - 4, Yp(t), ox, Yp(t)), small(ox - 7, Yp(t) + 4, String(t), { a: 'end' })));
  out.push(lab(ox + W / 2, oy + H + 33, xl, { a: 'middle' }), lab(ox - 36, oy - 18, yl, { a: 'start' }));
  return { X, Y: Yp };
}

// ================================================================ 1. open, closed and isolated systems
const SYS = [
  { name: 'Open system', ex: 'tea in an uncovered cup', matter: true, energy: true },
  { name: 'Closed system', ex: 'sealed bottle of cola', matter: false, energy: true },
  { name: 'Isolated system', ex: 'tea in a stoppered vacuum flask', matter: false, energy: false },
];
export const SYSTEMS_3 = (() => {
  const out = [];
  const cx = [95, 285, 475];
  const cy = 112;
  // open: beaker with steam
  out.push(S.path(`M ${cx[0] - 34} ${cy - 40} L ${cx[0] - 34} ${cy + 40} L ${cx[0] + 34} ${cy + 40} L ${cx[0] + 34} ${cy - 40}`, { w: 2.5 }));
  out.push(S.rect(cx[0] - 32, cy - 6, 64, 45, { c: B, fill: B, fop: 0.25, sw: 0.5 }));
  [-16, 0, 16].forEach((dx) => out.push(S.path(`M ${cx[0] + dx} ${cy - 46} q 6 -9 0 -18 q -6 -9 0 -18`, { c: G, w: 1.6 })));
  out.push(S.arrow(cx[0] + 38, cy - 70, cx[0] + 60, cy - 90, { c: G, w: 1.8 }), small(cx[0] + 62, cy - 94, 'matter out', { c: G, w: 'bold' }));
  out.push(S.arrow(cx[0] - 70, cy + 66, cx[0] - 40, cy + 46, { c: RD, w: 1.8 }), small(cx[0] - 66, cy + 80, 'heat in or out', { c: RD, w: 'bold' }));
  // closed: stoppered flask
  out.push(S.path(`M ${cx[1] - 14} ${cy - 54} L ${cx[1] - 14} ${cy - 24} L ${cx[1] - 40} ${cy + 36} Q ${cx[1] - 44} ${cy + 46} ${cx[1] - 32} ${cy + 46} L ${cx[1] + 32} ${cy + 46} Q ${cx[1] + 44} ${cy + 46} ${cx[1] + 40} ${cy + 36} L ${cx[1] + 14} ${cy - 24} L ${cx[1] + 14} ${cy - 54}`, { w: 2.5 }));
  out.push(S.rect(cx[1] - 17, cy - 66, 34, 14, { c: BR, fill: BR, fop: 0.5, sw: 1 }));
  out.push(S.path(`M ${cx[1] - 36} ${cy + 20} L ${cx[1] + 36} ${cy + 20} L ${cx[1] + 40} ${cy + 36} Q ${cx[1] + 44} ${cy + 44} ${cx[1] + 32} ${cy + 44} L ${cx[1] - 32} ${cy + 44} Q ${cx[1] - 44} ${cy + 44} ${cx[1] - 40} ${cy + 36} Z`, { c: B, fill: B, fop: 0.25, w: 0.5 }));
  out.push(S.arrow(cx[1] - 78, cy + 66, cx[1] - 44, cy + 46, { c: RD, w: 1.8 }), small(cx[1] - 100, cy + 80, 'heat in or out', { c: RD, w: 'bold' }));
  out.push(small(cx[1] + 30, cy - 62, 'no matter', { c: M }), small(cx[1] + 30, cy - 50, 'crosses', { c: M }));
  // isolated: vacuum flask (double wall)
  out.push(S.rect(cx[2] - 40, cy - 40, 80, 88, { w: 3, rx: 10 }), S.rect(cx[2] - 30, cy - 30, 60, 70, { c: M, w: 1.2, rx: 7, dash: '4 3' }));
  out.push(S.rect(cx[2] - 32, cy, 64, 40, { c: B, fill: B, fop: 0.25, sw: 0.5, rx: 4 }), S.rect(cx[2] - 22, cy - 50, 44, 11, { c: BR, fill: BR, fop: 0.5, sw: 1 }));
  out.push(small(cx[2], cy + 66, 'no heat, no matter', { a: 'middle', c: M, w: 'bold' }), small(cx[2] - 46, cy - 24, 'vacuum gap', { a: 'end', c: M }));
  // captions
  SYS.forEach((s, i) => {
    out.push(lab(cx[i], 20, s.name, { a: 'middle', w: 'bold', size: 12 }), small(cx[i], 214, s.ex, { a: 'middle' }), small(cx[i], 230, `matter: ${s.matter ? 'yes' : 'no'}   energy: ${s.energy ? 'yes' : 'no'}`, { a: 'middle', c: M }));
  });
  chk(SYS[0].matter && SYS[0].energy, 'open system exchanges both matter and energy');
  chk(!SYS[1].matter && SYS[1].energy, 'closed system exchanges energy but not matter');
  chk(!SYS[2].matter && !SYS[2].energy, 'isolated system exchanges neither matter nor energy');
  return svgDoc(570, 248, 'Three kinds of thermodynamic system. An open system, tea in an uncovered cup, exchanges both matter and energy. A closed system, a sealed bottle, exchanges energy as heat but no matter. An isolated system, a stoppered vacuum flask, exchanges neither matter nor energy.', out.join(''));
})();

// ================================================================ 2. intensive and extensive: halve a sample
const HALF = { mass: 200, vol: 200, T: 300, rho: 1.0 };
export const SPLIT_PROPS = (() => {
  const out = [];
  const beaker = (x, y, w, h, fillFrac, label, sub, sub2) => {
    out.push(S.path(`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`, { w: 2.5 }));
    out.push(S.rect(x + 1.5, y + h * (1 - fillFrac), w - 3, h * fillFrac - 1, { c: B, fill: B, fop: 0.25, sw: 0.5 }));
    out.push(lab(x + w / 2, y + h + 18, label, { a: 'middle', w: 'bold' }), small(x + w / 2, y + h + 32, sub, { a: 'middle', c: M }));
    if (sub2) out.push(small(x + w / 2, y + h + 45, sub2, { a: 'middle', c: M }));
  };
  beaker(30, 40, 96, 100, 0.8, 'whole sample', `${HALF.mass} g, ${HALF.vol} mL`, `${HALF.T} K`);
  out.push(S.arrow(140, 100, 190, 100, { w: 2 }), small(165, 92, 'halve', { a: 'middle' }));
  beaker(200, 60, 70, 80, 0.8, 'half A', `${HALF.mass / 2} g, ${HALF.vol / 2} mL`, `${HALF.T} K`);
  beaker(295, 60, 70, 80, 0.8, 'half B', `${HALF.mass / 2} g, ${HALF.vol / 2} mL`, `${HALF.T} K`);
  const rows = [
    ['mass', `${HALF.mass} g`, `${HALF.mass / 2} g`, 'extensive'],
    ['volume', `${HALF.vol} mL`, `${HALF.vol / 2} mL`, 'extensive'],
    ['temperature', `${HALF.T} K`, `${HALF.T} K`, 'intensive'],
    ['density', `${f1(HALF.mass / HALF.vol)} g/mL`, `${f1(HALF.mass / HALF.vol)} g/mL`, 'intensive'],
  ];
  out.push(lab(395, 36, 'property', { w: 'bold' }), lab(470, 36, 'whole', { w: 'bold' }), lab(515, 36, 'half', { w: 'bold' }));
  rows.forEach((r, i) => {
    const y = 60 + i * 30;
    out.push(lab(395, y, r[0]), lab(470, y, r[1].replace(' g/mL', '')), lab(515, y, r[2].replace(' g/mL', '')));
    out.push(small(395, y + 13, r[3], { c: r[3] === 'extensive' ? RD : B, w: 'bold' }));
  });
  out.push(small(395, 186, 'Extensive: halves with the sample.', { c: RD }), small(395, 200, 'Intensive: unchanged by size.', { c: B }));
  chk(HALF.mass / 2 + HALF.mass / 2 === HALF.mass && HALF.vol / 2 * 2 === HALF.vol, 'extensive properties (mass, volume) of the two halves add to the whole');
  chk(near(HALF.mass / HALF.vol, (HALF.mass / 2) / (HALF.vol / 2), 1e-12), 'density (a ratio of two extensive properties) is unchanged on halving');
  return svgDoc(570, 232, 'A 200 gram sample of water at 300 kelvin is divided into two halves. Mass and volume, which are extensive, halve to 100 grams and 100 millilitres. Temperature and density, which are intensive, stay at 300 kelvin and 1.0 gram per millilitre.', out.join(''));
})();

// ================================================================ 3. path against state function
export const PATHS_PV = (() => {
  const out = [];
  const ox = 60;
  const oy = 28;
  const W = 300;
  const H = 190;
  const { A, B: Bp, wI, wII } = PATHS;
  const { X, Y: Yp } = frame(out, ox, oy, W, H, 8, 5, [0, 2, 4, 6, 8], [0, 1, 2, 3, 4, 5], 'V (L)', 'p (atm)');
  // shaded areas under the work-doing steps
  out.push(S.rect(X(A.V), Yp(Bp.p), X(Bp.V) - X(A.V), Yp(0) - Yp(Bp.p), { c: 'none', fill: B, fop: 0.2, sw: 0 }));
  out.push(S.rect(X(A.V), Yp(A.p), X(Bp.V) - X(A.V), Yp(Bp.p) - Yp(A.p), { c: 'none', fill: RD, fop: 0.18, sw: 0 }));
  out.push(S.path(`M ${X(A.V)} ${Yp(A.p)} L ${X(A.V)} ${Yp(Bp.p)} L ${X(Bp.V)} ${Yp(Bp.p)}`, { c: B, w: 2.6 }));
  out.push(S.path(`M ${X(A.V)} ${Yp(A.p)} L ${X(Bp.V)} ${Yp(A.p)} L ${X(Bp.V)} ${Yp(Bp.p)}`, { c: RD, w: 2.6 }));
  out.push(S.circle(X(A.V), Yp(A.p), 4.5, { fill: 'currentColor' }), S.circle(X(Bp.V), Yp(Bp.p), 4.5, { fill: 'currentColor' }));
  out.push(lab(X(A.V) - 8, Yp(A.p) - 8, 'A', { a: 'end', w: 'bold' }), lab(X(Bp.V) + 8, Yp(Bp.p) + 4, 'B', { w: 'bold' }));
  out.push(small(X(3) - 4, Yp(1) - 6, 'path I', { c: B, w: 'bold' }), small(X(4) - 4, Yp(4) - 6, 'path II', { c: RD, w: 'bold' }));
  // text
  const tx = 400;
  out.push(lab(tx, 44, 'Same start A and end B', { w: 'bold' }), small(tx, 60, `A: ${A.p} atm, ${A.V} L`, {}), small(tx, 74, `B: ${Bp.p} atm, ${Bp.V} L`, {}));
  out.push(lab(tx, 104, 'Path I (blue)', { w: 'bold', c: B }), small(tx, 119, `w = ${f1(wI)} L atm = ${f0(wI * LATM)} J`, {}));
  out.push(lab(tx, 144, 'Path II (red)', { w: 'bold', c: RD }), small(tx, 159, `w = ${f1(wII)} L atm = ${f0(wII * LATM)} J`, {}));
  out.push(small(tx, 186, 'Work differs: a path function.', { c: M }), small(tx, 200, 'ΔU is the same: a state function.', { c: M }));
  chk(near(wI, -4, 1e-9) && near(wII, -16, 1e-9), `work on the two paths: ${f1(wI)} L atm and ${f1(wII)} L atm (areas of the shaded rectangles)`);
  chk(wI !== wII, 'work differs between the paths although the end states are the same');
  return svgDoc(570, 262, `A gas goes from state A at 4.0 atm and 2.0 L to state B at 1.0 atm and 6.0 L by two routes on a pressure volume graph. Path I cools at constant volume then expands at 1.0 atm, doing 4.0 L atm of work. Path II expands at 4.0 atm then cools at constant volume, doing 16.0 L atm of work. The work differs but the change in internal energy is the same.`, out.join(''));
})();

// ================================================================ 4. processes on a p-V graph
export const PROCESSES_PV = (() => {
  const out = [];
  const ox = 60;
  const oy = 28;
  const W = 300;
  const H = 200;
  const gamma = 1.4;
  const p0 = 4.0;
  const V0 = 2.0;
  const k = p0 * V0; // isotherm constant
  const { X, Y: Yp } = frame(out, ox, oy, W, H, 6, 5, [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5], 'V (L)', 'p (atm)');
  const curve = (f, v1, v2, col, dash) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const v = v1 + ((v2 - v1) * i) / 40;
      pts.push(`${i ? 'L' : 'M'} ${X(v).toFixed(1)} ${Yp(f(v)).toFixed(1)}`);
    }
    return S.path(pts.join(' '), { c: col, w: 2.6, dash });
  };
  const iso = (v) => k / v;
  const adi = (v) => p0 * (V0 / v) ** gamma;
  out.push(curve(iso, 2, 5, B), curve(adi, 2, 5, RD));
  out.push(S.line(X(2), Yp(4), X(5), Yp(4), { c: G, w: 2.6 }), S.line(X(2), Yp(4), X(2), Yp(1.2), { c: BR, w: 2.6 }));
  out.push(S.circle(X(2), Yp(4), 4.5, { fill: 'currentColor' }), lab(X(2) - 8, Yp(4) - 8, 'start', { a: 'end', w: 'bold' }));
  out.push(small(X(5) + 6, Yp(4) + 4, 'isobaric', { c: G, w: 'bold' }), small(X(5) + 6, Yp(iso(5)) + 2, 'isothermal', { c: B, w: 'bold' }), small(X(5) + 6, Yp(adi(5)) + 14, 'adiabatic', { c: RD, w: 'bold' }), small(X(2) + 6, Yp(1.2) - 2, 'isochoric', { c: BR, w: 'bold' }));
  const tx = 400;
  out.push(lab(tx, 44, 'One start, four paths', { w: 'bold' }));
  [['isothermal', 'T constant: pV = constant', B], ['isobaric', 'p constant', G], ['isochoric', 'V constant: no p-V work', BR], ['adiabatic', 'q = 0: steeper fall', RD]].forEach(([n, t, c], i) => {
    out.push(S.line(tx, 68 + i * 36, tx + 22, 68 + i * 36, { c, w: 2.6 }), lab(tx + 28, 72 + i * 36, n, { c, w: 'bold' }), small(tx + 28, 86 + i * 36, t, { c: M }));
  });
  chk(near(iso(2), 4, 1e-12) && near(adi(2), 4, 1e-12), 'isotherm and adiabat both start at 4.0 atm, 2.0 L');
  chk([2.5, 3, 4, 5].every((v) => adi(v) < iso(v)), 'for expansion the adiabat lies below the isotherm (a gas cools and so its pressure falls faster)');
  return svgDoc(570, 270, 'Four processes starting from the same state of a gas, shown on a pressure volume graph. The isothermal curve is a hyperbola with p times V constant. The isobaric process is a horizontal line. The isochoric process is a vertical line. The adiabatic curve falls more steeply than the isotherm.', out.join(''));
})();

// ================================================================ 5. cyclic process
export const CYCLE_PV = (() => {
  const out = [];
  const ox = 60;
  const oy = 30;
  const W = 280;
  const H = 190;
  const { X, Y: Yp } = frame(out, ox, oy, W, H, 7, 5, [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5], 'V (L)', 'p (atm)');
  const P = CYC.pts;
  out.push(S.rect(X(2), Yp(4), X(5) - X(2), Yp(2) - Yp(4), { c: 'none', fill: B, fop: 0.22, sw: 0 }));
  out.push(S.path(`M ${X(2)} ${Yp(4)} L ${X(5)} ${Yp(4)} L ${X(5)} ${Yp(2)} L ${X(2)} ${Yp(2)} Z`, { c: B, w: 2.6, join: 'round' }));
  // direction arrows (clockwise: A to B to C to D)
  out.push(S.midHead(X(2), Yp(4), X(5), Yp(4), { c: B, size: 9 }), S.midHead(X(5), Yp(4), X(5), Yp(2), { c: B, size: 9 }), S.midHead(X(5), Yp(2), X(2), Yp(2), { c: B, size: 9 }), S.midHead(X(2), Yp(2), X(2), Yp(4), { c: B, size: 9 }));
  Object.entries(P).forEach(([n, pt]) => {
    out.push(S.circle(X(pt.V), Yp(pt.p), 4.5, { fill: 'currentColor' }));
  });
  out.push(lab(X(2) - 8, Yp(4) - 8, 'A', { a: 'end', w: 'bold' }), lab(X(5) + 8, Yp(4) - 8, 'B', { w: 'bold' }), lab(X(5) + 8, Yp(2) + 14, 'C', { w: 'bold' }), lab(X(2) - 8, Yp(2) + 14, 'D', { a: 'end', w: 'bold' }));
  out.push(small(X(3.5), Yp(3) + 4, 'enclosed area', { a: 'middle', c: B, w: 'bold' }), small(X(3.5), Yp(3) + 18, `${f1(-CYC.net)} L atm`, { a: 'middle', c: B }));
  const tx = 390;
  out.push(lab(tx, 44, 'One complete cycle', { w: 'bold' }));
  out.push(small(tx, 62, `A to B: expands at 4.0 atm`, {}), small(tx, 76, `w = ${f1(CYC.wAB)} L atm`, { c: M }));
  out.push(small(tx, 98, `C to D: compressed at 2.0 atm`, {}), small(tx, 112, `w = +${f1(CYC.wCD)} L atm`, { c: M }));
  out.push(small(tx, 134, 'B to C and D to A: V constant,', {}), small(tx, 148, 'w = 0', { c: M }));
  out.push(lab(tx, 174, `net w = ${f1(CYC.net)} L atm`, { w: 'bold' }), small(tx, 190, `= ${f0(CYC.netJ)} J (by the gas)`, {}));
  out.push(small(tx, 208, 'Back at A: ΔU = 0, so q = −w', { c: M }));
  const area = (P.B.V - P.A.V) * (P.A.p - P.D.p);
  chk(near(-CYC.net, area, 1e-12), `net work of the cycle equals the enclosed area: ${f1(area)} L atm`);
  chk(near(CYC.netJ, CYC.net * LATM, 1e-12) && CYC.net < 0, 'clockwise cycle: the gas does net work (w negative on the system)');
  return svgDoc(570, 268, 'A rectangular cyclic process on a pressure volume graph, going clockwise from A at 4.0 atm and 2.0 L to B, C, D and back to A. The gas expands at 4.0 atm and is compressed at 2.0 atm, so the enclosed area of 6.0 L atm, about 608 joules, is the net work done by the gas. The change in internal energy over the cycle is zero.', out.join(''));
})();

// ================================================================ 6. sign convention
export const SIGN_CONV = (() => {
  const out = [];
  const bx = 235;
  const by = 104;
  out.push(S.rect(bx, by, 100, 80, { w: 3, fill: FILL, rx: 6 }), lab(bx + 50, by + 36, 'SYSTEM', { a: 'middle', w: 'bold', size: 12 }), small(bx + 50, by + 54, 'internal energy U', { a: 'middle' }));
  // heat in (q > 0)
  out.push(S.arrow(60, by + 22, bx - 6, by + 22, { c: RD, w: 3, size: 10 }), lab(60, by + 10, 'heat absorbed', { c: RD, w: 'bold' }), small(60, by + 44, 'q positive', { c: RD }));
  // heat out (q < 0)
  out.push(S.arrow(bx + 30, by + 86, bx + 30, by + 134, { c: RD, w: 3, size: 10 }), lab(bx + 44, by + 120, 'heat released', { c: RD, w: 'bold' }), small(bx + 44, by + 134, 'q negative', { c: RD }));
  // work on (w > 0)
  out.push(S.arrow(bx + 70, by - 52, bx + 70, by - 6, { c: B, w: 3, size: 10 }), lab(bx + 84, by - 32, 'work done on system', { c: B, w: 'bold' }), small(bx + 84, by - 18, 'w positive (compression)', { c: B }));
  // work by (w < 0)
  out.push(S.arrow(bx + 106, by + 56, bx + 190, by + 56, { c: B, w: 3, size: 10 }), lab(bx + 150, by + 44, 'work by', { c: B, w: 'bold', a: 'middle' }), small(bx + 150, by + 74, 'w negative', { c: B, a: 'middle' }), small(bx + 150, by + 88, '(expansion)', { c: B, a: 'middle' }));
  out.push(lab(285, 24, 'ΔU = q + w', { a: 'middle', w: 'bold', size: 16 }), small(285, 42, 'Positive: energy flows INTO the system. Negative: energy flows OUT of the system.', { a: 'middle', c: M }));
  // ΔU outcomes
  const ex = [[+100, -30], [-50, -20], [+200, +50]];
  const exTxt = ex.map(([q, w]) => `q = ${q > 0 ? '+' : '−'}${Math.abs(q)} J, w = ${w > 0 ? '+' : '−'}${Math.abs(w)} J: ΔU = ${q + w > 0 ? '+' : '−'}${Math.abs(q + w)} J`);
  out.push(lab(18, 246, 'Examples', { w: 'bold' }));
  exTxt.forEach((t, i) => out.push(small(18, 262 + i * 14, t, { c: M })));
  chk(ex.map(([q, w]) => q + w).join() === '70,-70,250', 'sign examples: ΔU = +70, −70, +250 J');
  return svgDoc(570, 312, 'Sign convention for the first law, delta U equals q plus w. Heat absorbed by the system makes q positive and heat released makes q negative. Work done on the system, such as compression, makes w positive; work done by the system, such as expansion, makes w negative.', out.join(''));
})();

// ================================================================ 7. work: one step, two steps, reversible
export const PV_WORK = (() => {
  const out = [];
  const ox = 56;
  const oy = 26;
  const W = 330;
  const H = 216;
  const { V1, Vm, V2, p1, p2, pm, nRT } = CMP;
  const { X, Y: Yp } = frame(out, ox, oy, W, H, 14, 9, [0, 2, 4, 6, 8, 10, 12, 14], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'V (L)', 'p (atm)');
  // reversible area (under the isotherm)
  const n = 60;
  const top = [];
  for (let i = 0; i <= n; i++) {
    const v = V1 + ((V2 - V1) * i) / n;
    top.push(`${i ? 'L' : 'M'} ${X(v).toFixed(1)} ${Yp(nRT / v).toFixed(1)}`);
  }
  out.push(S.path(`${top.join(' ')} L ${X(V2).toFixed(1)} ${Yp(0).toFixed(1)} L ${X(V1).toFixed(1)} ${Yp(0).toFixed(1)} Z`, { c: 'none', fill: RD, fop: 0.2, w: 0 }));
  // two-step rectangles
  out.push(S.rect(X(V1), Yp(pm), X(Vm) - X(V1), Yp(p2) - Yp(pm), { c: G, fill: G, fop: 0.35, sw: 1 }));
  // one step rectangle
  out.push(S.rect(X(V1), Yp(p2), X(V2) - X(V1), Yp(0) - Yp(p2), { c: B, fill: B, fop: 0.3, sw: 1.5 }), S.line(X(Vm), Yp(p2), X(Vm), Yp(0), { c: B, w: 1, dash: '3 3' }));
  out.push(S.path(top.join(' '), { c: RD, w: 2.8 }));
  [[V1, p1, 'A'], [V2, p2, 'B']].forEach(([v, p, l]) => out.push(S.circle(X(v), Yp(p), 4.5, { fill: 'currentColor' })));
  out.push(lab(X(V1) - 8, Yp(p1) - 6, 'A', { a: 'end', w: 'bold' }), lab(X(V2) + 8, Yp(p2) - 6, 'B', { w: 'bold' }));
  out.push(small(X(V1) + 4, Yp(1) - 6, 'one step at 2.0 atm', { c: B, w: 'bold' }));
  out.push(small(X(7.2), Yp(6.2), 'reversible isotherm', { c: RD, w: 'bold' }));
  const tx = 410;
  out.push(lab(tx, 44, '1.00 mol, 300 K', { w: 'bold' }), small(tx, 58, 'from 8.0 atm to 2.0 atm', {}));
  const items = [['One step: blue', CMP.w1, B], ['Two steps: blue + green', CMP.w2, G], ['Reversible: all three', CMP.wr, RD]];
  items.forEach(([t, w, c], i) => {
    out.push(S.rect(tx, 80 + i * 40, 14, 14, { c, fill: c, fop: 0.3, sw: 1.5 }), small(tx + 22, 91 + i * 40, t, { c, w: 'bold' }), small(tx + 22, 105 + i * 40, `w = ${f0(w)} J`, {}));
  });
  out.push(small(tx, 214, 'More steps: more work, nearer', { c: M }), small(tx, 228, 'the reversible limit.', { c: M }));
  // numerical check of the areas (L atm)
  let integral = 0;
  const N = 20000;
  for (let i = 0; i < N; i++) integral += (nRT / (V1 + ((V2 - V1) * (i + 0.5)) / N)) * ((V2 - V1) / N);
  chk(near(integral * LATM, -CMP.wr, 0.002), `area under the isotherm (numerical integral ${f0(integral * LATM)} J) matches 2.303 nRT log(V2/V1) = ${f0(-CMP.wr)} J`);
  chk(-CMP.w1 < -CMP.w2 && -CMP.w2 < -CMP.wr, `work obtained rises with the number of steps: ${f0(-CMP.w1)} < ${f0(-CMP.w2)} < ${f0(-CMP.wr)} J`);
  chk(near(CMP.V2 / CMP.V1, p1 / p2, 1e-12), 'V2/V1 equals p1/p2 for the isothermal change (ratio 4)');
  return svgDoc(570, 280, `Pressure volume graph for 1.00 mol of an ideal gas expanding isothermally at 300 K from 8.0 atm to 2.0 atm. In one step against 2.0 atm the work obtained is ${f0(-CMP.w1)} joules; in two steps it is ${f0(-CMP.w2)} joules; reversibly it is ${f0(-CMP.wr)} joules, the area under the isotherm.`, out.join(''));
})();

// ================================================================ 8. Cp and Cv
export const CP_CV = (() => {
  const out = [];
  const ox = 72;
  const oy = 28;
  const W = 290;
  const H = 200;
  const dTmax = 100;
  const qmax = 2200;
  const { X, Y: Yp } = frame(out, ox, oy, W, H, dTmax, qmax, [0, 20, 40, 60, 80, 100], [0, 500, 1000, 1500, 2000], 'ΔT (K)', 'heat q (J)');
  const qv = MONO.Cv * dTmax;
  const qp = MONO.Cp * dTmax;
  out.push(S.line(X(0), Yp(0), X(dTmax), Yp(qp), { c: RD, w: 2.8 }), S.line(X(0), Yp(0), X(dTmax), Yp(qv), { c: B, w: 2.8 }));
  out.push(S.line(X(dTmax), Yp(qv), X(dTmax), Yp(qp), { c: G, w: 4 }), S.line(X(dTmax) + 6, Yp(qv), X(dTmax) + 6, Yp(qv), {}));
  out.push(small(X(dTmax) - 8, Yp(qp) - 8, `q at constant p: ${f0(qp)} J`, { a: 'end', c: RD, w: 'bold' }), small(X(dTmax) - 8, Yp(qv) + 90, `q at constant V: ${f0(qv)} J`, { a: 'end', c: B, w: 'bold' }), S.lead(X(dTmax) - 4, Yp(qv) + 6, X(dTmax) - 30, Yp(qv) + 78));
  out.push(small(X(dTmax) + 10, (Yp(qv) + Yp(qp)) / 2 + 4, `gap = RΔT`, { c: G, w: 'bold' }), small(X(dTmax) + 10, (Yp(qv) + Yp(qp)) / 2 + 18, `= ${f0(qp - qv)} J`, { c: G }));
  
  const tx = 430;
  out.push(lab(tx, 50, '1 mol, monatomic gas', { w: 'bold' }), small(tx, 66, `Cv = 3R/2 = ${f1(MONO.Cv)}`, {}), small(tx, 80, `Cp = 5R/2 = ${f1(MONO.Cp)}`, {}), small(tx, 94, 'both in J K⁻¹ mol⁻¹', { c: M }));
  out.push(lab(tx, 112, 'Extra heat at constant p', { w: 'bold' }), small(tx, 128, 'does the expansion work:', {}), small(tx, 142, 'p ΔV = R ΔT for 1 mol.', {}));
  out.push(lab(tx, 174, `Cp − Cv = ${(MONO.Cp - MONO.Cv).toFixed(3)}`, { w: 'bold' }), small(tx, 190, '= R, in J K⁻¹ mol⁻¹', {}));
  chk(near(MONO.Cp - MONO.Cv, R, 1e-12), `Cp − Cv = ${f2(MONO.Cp - MONO.Cv)} = R`);
  chk(near(qp - qv, R * dTmax, 1e-12), `at ΔT = 100 K the extra heat at constant pressure is RΔT = ${f1(R * dTmax)} J`);
  return svgDoc(570, 276, 'Heat needed to warm one mole of a monatomic ideal gas against the temperature rise. At constant volume the slope is Cv, 12.5 joules per kelvin; at constant pressure the slope is Cp, 20.8 joules per kelvin. After a rise of 100 kelvin the difference is R times 100, 831 joules, the work of expansion.', out.join(''));
})();

// ================================================================ 9. constant volume against constant pressure; delta H and delta U
export const VESSELS = (() => {
  const out = [];
  const dn = PCL.dn;
  const dUkJ = PCL.dUkJ;
  const pv = (dn * R * PCL.T) / 1000;
  const dH = dHfromU(dUkJ, dn, PCL.T);
  // rigid vessel
  out.push(S.rect(40, 48, 100, 96, { w: 5, fill: FILL, rx: 4 }), lab(90, 92, 'rigid steel', { a: 'middle', w: 'bold' }), small(90, 108, 'vessel', { a: 'middle' }), small(90, 124, 'V fixed', { a: 'middle', c: M }));
  out.push(S.arrow(20, 170, 52, 148, { c: RD, w: 2.2 }), small(20, 190, 'q', { c: RD, w: 'bold' }), small(34, 190, 'heat', { c: RD }));
  out.push(lab(90, 28, 'Constant volume', { a: 'middle', w: 'bold' }), small(90, 212, 'w = 0, so qV = ΔU', { a: 'middle', w: 'bold' }));
  // piston cylinder
  out.push(S.path('M 230 48 L 230 144 L 330 144 L 330 48', { w: 3 }), S.rect(232, 76, 96, 10, { c: BR, fill: BR, fop: 0.5, sw: 1.5 }), S.line(280, 56, 280, 76, { c: BR, w: 2 }));
  out.push(S.rect(232, 86, 96, 56, { c: 'none', fill: Y, fop: 0.2, sw: 0 }), lab(280, 120, 'gas', { a: 'middle', w: 'bold' }));
  out.push(S.arrow(218, 82, 218, 56, { c: B, w: 2.2 }), small(212, 62, 'piston rises', { a: 'end', c: B }), small(212, 76, 'p ΔV work', { a: 'end', c: B }));
  out.push(S.arrow(210, 170, 242, 148, { c: RD, w: 2.2 }), small(210, 190, 'q', { c: RD, w: 'bold' }), small(224, 190, 'heat', { c: RD }));
  out.push(lab(280, 28, 'Constant pressure', { a: 'middle', w: 'bold' }), small(280, 212, 'qp = ΔU + p ΔV = ΔH', { a: 'middle', w: 'bold' }));
  // bar: delta H = delta U + dn R T
  const bx = 410;
  const scale = 140 / dH;
  out.push(lab(bx, 40, 'PCl₅ → PCl₃ + Cl₂', { w: 'bold' }), small(bx, 55, `gases, ${PCL.T} K, Δn(g) = +${dn}`, { c: M }));
  out.push(S.rect(bx, 70, dUkJ * scale, 24, { c: B, fill: B, fop: 0.3 }), small(bx + 6, 86, `ΔU = ${f1(dUkJ)} kJ`, { w: 'bold' }));
  out.push(S.rect(bx + dUkJ * scale, 70, pv * scale, 24, { c: G, fill: G, fop: 0.4 }));
  out.push(small(bx + 20, 110, `+ Δn(g)RT = ${f1(pv)} kJ`, { c: G, w: 'bold' }), S.lead(bx + dUkJ * scale + 3, 96, bx + 60, 102));
  out.push(S.rect(bx, 138, dH * scale, 24, { c: RD, fill: RD, fop: 0.3 }), small(bx + 6, 154, `ΔH = ${f1(dH)} kJ`, { w: 'bold' }));
  out.push(small(bx, 190, 'Gas made: system does expansion', { c: M }), small(bx, 204, 'work, so ΔH is larger than ΔU.', { c: M }));
  chk(near(dH, dUkJ + pv, 1e-12), `ΔH = ΔU + Δn(g)RT = ${f1(dUkJ)} + ${f2(pv)} = ${f1(dH)} kJ`);
  chk(near(pv, 4.157, 0.001), 'RT at 500 K is 4.157 kJ per mole of gas formed');
  return svgDoc(570, 230, 'Heat measured at constant volume gives the change in internal energy because no p V work is done; heat measured at constant pressure gives the enthalpy change, which includes the work of expansion. For the decomposition of phosphorus pentachloride at 500 kelvin, delta U is 80.0 kilojoules and delta n of gas is plus one, so delta H is 84.2 kilojoules.', out.join(''));
})();
