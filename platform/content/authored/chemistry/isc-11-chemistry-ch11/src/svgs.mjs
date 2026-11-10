// ISC 11 Chemistry ch11 Thermochemistry: hand-drawn SVGs (allow-listed elements, palette colours only; geometry and data computed in JS
// from data.mjs and self-checked).
import { svgDoc, S } from './lib.mjs';
import { DF, DC, FUELS, NEUT, WATER, NOX, SUB, BE, ETHENE, near, f1, sg } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const BR = 'var(--diagram-brown)';

// ---------------------------------------------------------------- 1. Energy levels linking formation and combustion of methane
export const LEVELS_CH4 = (() => {
  const k = 0.29; // px per kJ
  const y0 = 34;
  const Y_ = (e) => y0 - e * k;
  const e0 = 0;
  const e1 = DF.CH4;
  const e2 = DF.CO2 + 2 * DF.H2Ol;
  chk(near(e1 + DC.CH4, e2, 0.0005), `levels CH₄: ΔfH(CH₄) ${e1} + ΔcH ${DC.CH4} = ΔfH(CO₂) + 2ΔfH(H₂O) = ${e2.toFixed(1)}`);
  chk(Y_(e1) - Y_(e0) > 18, 'levels CH₄: formation step is tall enough for its label');
  const out = [];
  for (const [e, t] of [[e0, 'C(graphite) + 2H₂(g) + 2O₂(g)   0'], [e1, `CH₄(g) + 2O₂(g)   ${sg(e1)}`], [e2, `CO₂(g) + 2H₂O(l)   ${sg(e2)}`]]) {
    out.push(S.line(30, Y_(e), 272, Y_(e), { w: 2.2 }), lab(280, Y_(e) + 4, t, { w: 'bold' }));
  }
  out.push(S.arrow(52, Y_(e0), 52, Y_(e2), { c: G, w: 2 }));
  out.push(lab(62, (Y_(e0) + Y_(e2)) / 2 - 8, 'ΔH = ΔfH(CO₂) + 2ΔfH(H₂O)', { c: G, w: 'bold' }), lab(62, (Y_(e0) + Y_(e2)) / 2 + 8, `= ${sg(DF.CO2)} + 2(${sg(DF.H2Ol)}) = ${sg(e2)}`, { c: G }));
  out.push(S.arrow(150, Y_(e0), 150, Y_(e1), { c: B, w: 2 }));
  out.push(lab(158, (Y_(e0) + Y_(e1)) / 2 + 4, `ΔfH(CH₄) = ${sg(e1)}`, { c: B, w: 'bold' }));
  out.push(S.arrow(242, Y_(e1), 242, Y_(e2), { c: R, w: 2 }));
  out.push(lab(250, (Y_(e1) + Y_(e2)) / 2 - 6, 'ΔcH(CH₄)', { c: R, w: 'bold' }), lab(250, (Y_(e1) + Y_(e2)) / 2 + 10, `= ${sg(DC.CH4)}`, { c: R, w: 'bold' }));
  out.push(small(30, 336, 'Energies in kJ per mole of CH₄, measured from the elements in their standard states (0). Heights drawn to scale.', { c: M }));
  return svgDoc(540, 346, `Energy-level diagram for methane. The elements graphite, hydrogen and oxygen are at 0, methane with oxygen is 74.8 kilojoules lower, and carbon dioxide with liquid water is 965.1 kilojoules below the elements. The enthalpy of formation of methane is minus 74.8, its enthalpy of combustion is minus 890.3, and the direct route from the elements to the products is minus 965.1, the sum of the two.`, out.join(''));
})();

// ---------------------------------------------------------------- 2. Coffee-cup calorimeter
export const CALORIMETER = (() => {
  const out = [];
  const cx = 150;
  const top = 80;
  const bot = 214;
  const wTop = 120;
  const wBot = 92;
  const surface = 118;
  const sideAt = (y) => wBot + ((wTop - wBot) * (bot - y)) / (bot - top); // half width
  // solution
  out.push(S.path(`M${cx - sideAt(surface)} ${surface} L${cx + sideAt(surface)} ${surface} L${cx + wBot} ${bot} L${cx - wBot} ${bot} Z`, { fill: B, fop: 0.25, c: 'none', w: 0 }));
  // cup (polystyrene, thick walls drawn as double outline) and lid
  out.push(S.path(`M${cx - wTop} ${top} L${cx - wBot} ${bot} L${cx + wBot} ${bot} L${cx + wTop} ${top}`, { c: BR, w: 4 }));
  out.push(S.path(`M${cx - wTop - 8} ${top - 2} L${cx - wBot - 4} ${bot + 6} L${cx + wBot + 4} ${bot + 6} L${cx + wTop + 8} ${top - 2}`, { c: M, w: 1.5 }));
  out.push(S.rect(cx - wTop - 10, top - 14, 2 * wTop + 20, 12, { fill: Y, fop: 0.5, c: BR, sw: 1.5 }));
  // thermometer
  const tx_ = cx - 44;
  out.push(S.rect(tx_ - 4, top - 58, 8, 130, { c: R, sw: 1.5 }), S.circle(tx_, 188, 7, { fill: R, fop: 0.8, c: R, sw: 1.5 }), S.rect(tx_ - 2, 150, 4, 38, { fill: R, fop: 0.8, c: R, sw: 0.5 }));
  chk(188 + 7 < bot && 188 - 7 > surface, 'calorimeter: thermometer bulb sits in the solution, clear of the surface and the base');
  // stirrer
  const sx = cx + 44;
  out.push(S.line(sx, top - 50, sx, 176, { w: 2 }), S.rect(sx - 18, 176, 36, 5, { fill: M, fop: 0.5, c: M, sw: 1 }), S.rect(sx - 6, top - 58, 12, 10, { fill: M, fop: 0.4, c: M, sw: 1 }));
  chk(176 > surface && 176 + 5 < bot, 'calorimeter: stirrer blade is under the surface');
  // labels
  out.push(lab(300, 40, 'thermometer', { w: 'bold' }), S.lead(298, 38, tx_ + 6, 30));
  out.push(lab(300, 64, 'stirrer', { w: 'bold' }), S.lead(298, 62, sx + 8, 62));
  out.push(lab(300, 100, 'lid (insulating)', { w: 'bold' }), S.lead(298, 98, cx + wTop + 12, top - 8));
  out.push(lab(300, 150, 'solution of known mass m', { w: 'bold' }), small(300, 164, 'specific heat c = 4.18 J g⁻¹ K⁻¹', { c: M }), S.lead(298, 148, cx + 56, 150));
  out.push(lab(300, 206, 'polystyrene cup (little heat lost)', { w: 'bold' }), S.lead(298, 204, cx + wBot + 8, 206));
  out.push(lab(300, 238, 'q = m c ΔT, then ΔH = −q / n', { c: R, w: 'bold' }));
  return svgDoc(540, 250, 'A simple solution calorimeter: an insulating polystyrene cup with a lid holding a thermometer and a stirrer, containing a solution of known mass. The temperature rise is used in the equation q equals m c delta T, and the enthalpy change per mole is minus q divided by the number of moles.', out.join(''));
})();

// ---------------------------------------------------------------- bar-chart helper (horizontal)
function hbars(w, rows, { x0, maxLen, maxVal, fmt, rowH = 30, top = 18, colour }) {
  const out = [];
  rows.forEach((r, i) => {
    const y = top + i * rowH;
    const len = (r.v / maxVal) * maxLen;
    out.push(lab(x0 - 8, y + 15, r.label, { a: 'end' }));
    out.push(S.rect(x0, y + 3, len, 18, { fill: colour(r), fop: 0.55, c: colour(r), sw: 1.2 }));
    out.push(lab(x0 + len + 6, y + 16, fmt(r), { w: 'bold' }));
  });
  out.push(S.line(x0, top - 4, x0, top + rows.length * rowH - 4, { w: 1.2 }));
  return out.join('');
}

// ---------------------------------------------------------------- 3. Heats of neutralisation
export const NEUT_BARS = (() => {
  const rows = [
    { label: 'HCl + NaOH', v: -NEUT.strong, strong: true },
    { label: 'HNO₃ + KOH', v: -NEUT.strong, strong: true },
    { label: 'H₂SO₄ + NaOH (per mol H₂O)', v: -NEUT.strong, strong: true },
    { label: 'CH₃COOH + NaOH', v: -NEUT.ethanoic, strong: false },
    { label: 'HCN + NaOH', v: -NEUT.hcn, strong: false },
  ];
  chk(rows.slice(0, 3).every((r) => r.v === 57.1) && rows[3].v < rows[0].v && rows[4].v < rows[3].v, 'neutralisation bars: strong–strong equal (57.1); weak acids lower');
  const body = hbars(540, rows, { x0: 196, maxLen: 270, maxVal: 57.1, rowH: 30, top: 18, colour: (r) => (r.strong ? G : R), fmt: (r) => `${r.v.toFixed(1)}` });
  const out = [body, lab(196, 190, 'Heat released per mole of water formed / kJ mol⁻¹', { w: 'bold' }), small(196, 206, 'green: strong acid + strong base (H⁺ + OH⁻ → H₂O)', { c: M }), small(196, 220, 'red: a weak acid also spends energy on ionising', { c: M })];
  return svgDoc(540, 230, 'Bar chart of heat of neutralisation per mole of water. Hydrochloric acid with sodium hydroxide, nitric acid with potassium hydroxide, and sulfuric acid with sodium hydroxide per mole of water all release 57.1 kilojoules. Ethanoic acid with sodium hydroxide releases 55.2 and hydrogen cyanide with sodium hydroxide only 12.1.', out.join(''));
})();

// ---------------------------------------------------------------- 4. Calorific values
export const FUEL_BARS = (() => {
  const rows = [...FUELS].sort((a, b) => b.cv - a.cv).map((x) => ({ label: `${x.name} (${x.f})`, v: x.cv }));
  chk(rows.every((r, i) => i === 0 || rows[i - 1].v >= r.v), 'fuel bars sorted by calorific value');
  chk(near(FUELS.find((x) => x.id === 'H2').cv, 142.9, 0.001) && near(FUELS.find((x) => x.id === 'C3H8').cv, 50.5, 0.002), 'fuel bars: hydrogen 142.9 and propane 50.5 kJ g⁻¹ from −ΔcH / M');
  const body = hbars(540, rows, { x0: 176, maxLen: 300, maxVal: 142.9, rowH: 27, top: 14, colour: (r) => (r.v > 100 ? G : r.v > 40 ? B : BR), fmt: (r) => `${r.v.toFixed(1)}` });
  const out = [body, lab(176, 218, 'Calorific value = −ΔcH / M, in kJ g⁻¹', { w: 'bold' }), small(176, 234, 'ΔcH from enthalpies of formation (glucose: −2803 kJ mol⁻¹, given)', { c: M })];
  return svgDoc(540, 244, 'Bar chart of calorific values in kilojoules per gram: hydrogen 142.9, methane 55.6, ethyne 50.0, propane 50.5, graphite 32.8, ethanol 29.7 and glucose 15.6, sorted from highest to lowest. Hydrogen gives the most heat per gram.', out.join(''));
})();

// ---------------------------------------------------------------- 5. Heating curve of water (1 mol, from −10 °C to 120 °C)
export const HEATING_CURVE = (() => {
  const dt1 = 10;
  const q1 = (WATER.cpIce * dt1) / 1000;
  const q2 = q1 + WATER.fus;
  const q3 = q2 + (WATER.cpWater * 100) / 1000;
  const q4 = q3 + WATER.vap;
  const q5 = q4 + (WATER.cpSteam * 20) / 1000;
  const pts = [[0, -10], [q1, 0], [q2, 0], [q3, 100], [q4, 100], [q5, 120]];
  const ox = 70;
  const oy = 220;
  const sx = 400 / q5;
  const sy = 1.35;
  const X = (q) => ox + q * sx;
  const Yt = (t) => oy - (t + 20) * sy;
  chk(near(q3 - q1 - WATER.fus, 7.53, 0.001) && near(q4 - q3, 40.7, 0.0001), 'heating curve: 7.53 kJ to warm water 0 to 100 °C and 40.7 kJ to boil');
  chk(near(WATER.fus + 7.53 + WATER.vap, 54.24, 0.0005), 'heating curve: 1 mol ice at 0 °C to steam at 100 °C needs 54.24 kJ');
  const out = [S.arrow(ox, oy, 500, oy, { size: 7 }), S.arrow(ox, oy, ox, 14, { size: 7 })];
  out.push(S.path('M' + pts.map(([q, t]) => `${X(q).toFixed(1)} ${Yt(t).toFixed(1)}`).join(' L'), { c: R, w: 3, join: 'round' }));
  for (const t of [0, 100]) out.push(S.line(ox - 4, Yt(t), ox, Yt(t)), lab(ox - 8, Yt(t) + 4, String(t), { a: 'end', size: 10 }), S.line(ox, Yt(t), X(q5), Yt(t), { c: M, w: 0.8, dash: '3 4' }));
  out.push(S.line(ox - 4, Yt(-10), ox, Yt(-10)), lab(ox - 8, Yt(-10) + 4, '−10', { a: 'end', size: 10 }));
  out.push(S.line(ox - 4, Yt(120), ox, Yt(120)), lab(ox - 8, Yt(120) + 4, '120', { a: 'end', size: 10 }));
  out.push(lab(10, 110, 'T / °C', { size: 11 }));
  [[0, '0'], [q2, q2.toFixed(1)], [q3, q3.toFixed(1)], [q4, q4.toFixed(1)]].forEach(([q, t]) => out.push(S.line(X(q), oy, X(q), oy + 5), small(X(q), oy + 17, t, { a: 'middle' })));
  out.push(lab(X(q4 / 2 + 6), oy + 36, 'Heat supplied / kJ per mole', { a: 'middle' }));
  out.push(lab(ox + 2, Yt(0) - 10, 'ice', { w: 'bold' }));
  out.push(lab(X(q1) + 2, Yt(0) + 16, `melting +${WATER.fus}`, { w: 'bold', c: B }));
  out.push(lab(X((q2 + q3) / 2) + 14, Yt(50) + 30, 'water', { a: 'middle', w: 'bold' }));
  out.push(lab(X((q3 + q4) / 2), Yt(100) - 12, `boiling +${WATER.vap}`, { a: 'middle', w: 'bold', c: B }));
  out.push(lab(X(q5) - 12, Yt(120) + 16, 'steam', { a: 'end', w: 'bold' }));
  out.push(small(ox + 8, 276, 'Flat parts: heat goes into the phase change at constant temperature (enthalpy of fusion, vaporisation).', { c: M }));
  return svgDoc(540, 286, 'Heating curve of one mole of water from minus 10 degrees Celsius to 120 degrees Celsius. Temperature rises as ice absorbs 0.38 kilojoules, stays at 0 while 6.01 kilojoules melt the ice, rises as liquid water absorbs 7.53 kilojoules up to 100 degrees, stays at 100 while 40.7 kilojoules vaporise the water, then rises as steam absorbs 0.67 kilojoules.', out.join(''));
})();

// ---------------------------------------------------------------- 6. Hess cycle for the atomisation of ethene
export const ATOM_CYCLE = (() => {
  const dSub = 2 * SUB.C;
  const dDiss = 2 * BE['H–H'];
  const direct = dSub + dDiss;
  const fH = DF.C2H4;
  const atom = direct - fH;
  chk(near(atom, ETHENE.atomisation, 1e-9) && near(atom, 2253.1, 1e-4), `atomisation cycle: ΔatomH(C₂H₄) = ${direct.toFixed(1)} − (${fH}) = ${atom.toFixed(1)}`);
  chk(Math.abs(ETHENE.fromBonds - atom) < 20, `atomisation cycle: 4 C–H + C=C bond enthalpies (${ETHENE.fromBonds}) agree within 20 kJ with the cycle value`);
  const out = [];
  const nodes = { a: [110, 56, '2C(graphite) + 2H₂(g)'], b: [430, 56, '2C(g) + 4H(g)'], c: [270, 216, 'C₂H₄(g)'] };
  const box = (k) => {
    const [x, y, t] = nodes[k];
    const w = k === 'a' ? 168 : k === 'b' ? 120 : 84;
    out.push(S.rect(x - w / 2, y - 16, w, 32, { rx: 6, fill: 'var(--diagram-fill)', fop: 0.6, c: 'currentColor', sw: 1.5 }), lab(x, y + 4, t, { a: 'middle', w: 'bold', size: 12 }));
    return w / 2;
  };
  const wa = box('a');
  const wb = box('b');
  const wc = box('c');
  out.push(S.arrow(110 + wa + 4, 56, 430 - wb - 4, 56, { c: G, w: 2.2 }));
  out.push(lab(270, 34, `2ΔsubH(C) + 2ΔdissH(H₂) = ${direct.toFixed(1)} kJ`, { a: 'middle', c: G, w: 'bold' }), small(270, 82, `(2 × ${SUB.C} + 2 × ${BE['H–H']}, all endothermic)`, { a: 'middle', c: M }));
  out.push(S.arrow(150, 76, 252, 198, { c: B, w: 2.2 }), lab(30, 150, `ΔfH(C₂H₄) = ${sg(fH)} kJ`, { c: B, w: 'bold' }));
  out.push(S.arrow(288, 198, 410, 76, { c: R, w: 2.2 }), lab(380, 150, 'ΔatomH(C₂H₄)', { c: R, w: 'bold' }), lab(380, 166, `= ${direct.toFixed(1)} − (${sg(fH)})`, { c: R }), lab(380, 182, `= ${atom.toFixed(1)} kJ`, { c: R, w: 'bold' }));
  out.push(small(30, 252, 'Hess’s law: elements → atoms directly = elements → C₂H₄ → atoms, so ΔatomH = (direct) − ΔfH.', { c: M }));
  return svgDoc(540, 262, 'Hess cycle for ethene. Along the top, graphite and hydrogen gas change directly to gaseous atoms, with an enthalpy change of 2305.4 kilojoules. Down the left, the same elements form ethene with an enthalpy of formation of plus 52.3. Up the right, ethene is atomised. The atomisation enthalpy of ethene is therefore 2305.4 minus 52.3, which is 2253.1 kilojoules.', out.join(''));
})();

// ---------------------------------------------------------------- 7. Hess energy levels: N2 + 2 O2 to 2 NO2
export const HESS_NOX = (() => {
  const k = 0.55;
  const y0 = 150;
  const Yn = (e) => y0 - e * k;
  const eA = 0;
  const eB = NOX.step1;
  const eC = NOX.total;
  chk(near(eB + NOX.step2, eC, 1e-9) && near(eC, 66.4, 1e-4), `Hess NOx: ${NOX.step1} + (${NOX.step2}) = ${eC.toFixed(1)} kJ for N₂ + 2O₂ → 2NO₂`);
  chk(near(NOX.fNO2, DF.NO2, 0.001), `Hess NOx: ΔfH(NO₂) = ${NOX.fNO2} equals the tabulated ${DF.NO2}`);
  const out = [];
  [[eA, 'N₂(g) + 2O₂(g)', '0'], [eB, '2NO(g) + O₂(g)', sg(eB)], [eC, '2NO₂(g)', sg(eC)]].forEach(([e, t, v]) => {
    out.push(S.line(40, Yn(e), 250, Yn(e), { w: 2.2 }), lab(258, Yn(e) + 4, `${t}   ${v}`, { w: 'bold' }));
  });
  out.push(S.arrow(70, Yn(eA), 70, Yn(eC), { c: G, w: 2.2 }), lab(78, (Yn(eA) + Yn(eC)) / 2 + 2, `ΔH₃ = ${sg(eC)}`, { c: G, w: 'bold' }), small(78, (Yn(eA) + Yn(eC)) / 2 + 14, '(direct route)', { c: G }));
  out.push(S.arrow(190, Yn(eA), 190, Yn(eB), { c: R, w: 2.2 }), lab(182, (Yn(eA) + Yn(eB)) / 2 + 4, `ΔH₁ = ${sg(eB)}`, { a: 'end', c: R, w: 'bold' }));
  out.push(S.arrow(236, Yn(eB), 236, Yn(eC), { c: B, w: 2.2 }), lab(244, (Yn(eB) + Yn(eC)) / 2 + 4, `ΔH₂ = ${sg(NOX.step2)}`, { c: B, w: 'bold' }));
  out.push(small(40, 188, 'Whichever route is taken, ΔH₃ = ΔH₁ + ΔH₂. Heights to scale (kJ per mole of N₂).', { c: M }));
  return svgDoc(540, 198, 'Energy-level diagram for nitrogen and oxygen. Nitrogen with two oxygen is at zero, two nitric oxide with one oxygen is at plus 180.6 kilojoules, and two nitrogen dioxide is at plus 66.4. Going in two steps, plus 180.6 then minus 114.2, gives the same total as the direct route, plus 66.4 kilojoules.', out.join(''));
})();
