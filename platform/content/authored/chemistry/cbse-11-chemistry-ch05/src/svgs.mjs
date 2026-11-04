// ch05 Chemical Thermodynamics — SVGs with computed geometry: p–V work areas, enthalpy level diagram, Hess cycle, ΔG against T.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// Shared data (textbook-standard values, kJ mol⁻¹ at 298 K)
export const HESS = { toCO2: -393.5, toCO: -110.5 };
HESS.coToCO2 = Math.round((HESS.toCO2 - HESS.toCO) * 10) / 10; // −283.0
export const CACO3 = { dH: 178.3, dS: 160.5 }; // ΔH° kJ mol⁻¹ (from ΔfH°), ΔS° J K⁻¹ mol⁻¹
CACO3.Teq = (CACO3.dH * 1000) / CACO3.dS; // K

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

// 1. p–V work: irreversible (one step, rectangle) against reversible (area under the isotherm).
const PV = (() => {
  const nRT = 24.94; // L bar: 1 mol at 300 K (R = 0.08314 L bar K⁻¹ mol⁻¹)
  const V1 = 5;
  const V2 = 20;
  const p2 = nRT / V2;
  const ox = 52;
  const oy = 200;
  const sx = 13; // px per L
  const sy = 28; // px per bar
  const X = (v) => ox + v * sx;
  const Y = (p) => oy - p * sy;
  const pts = [];
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const v = V1 + ((V2 - V1) * i) / N;
    pts.push([v, nRT / v]);
  }
  let area = 0;
  for (let i = 0; i < N; i++) area += ((pts[i][1] + pts[i + 1][1]) / 2) * (pts[i + 1][0] - pts[i][0]);
  const exact = nRT * Math.log(V2 / V1);
  chk(Math.abs(area - exact) / exact < 1e-3, `PV: trapezoid area ${area.toFixed(2)} L bar equals nRT ln(V2/V1) = ${exact.toFixed(2)} L bar`);
  const rect = p2 * (V2 - V1);
  chk(rect < exact, `PV: irreversible work ${rect.toFixed(2)} L bar is less than reversible ${exact.toFixed(2)} L bar`);
  const curve = 'M' + pts.map(([v, p]) => `${X(v).toFixed(1)} ${Y(p).toFixed(1)}`).join(' L');
  const under = `${curve} L${X(V2).toFixed(1)} ${Y(0)} L${X(V1).toFixed(1)} ${Y(0)} Z`;
  return svgDoc(
    380,
    250,
    'Pressure against volume for one mole of an ideal gas at 300 K expanding from 5 L to 20 L. The whole area under the isotherm is the work done in a reversible expansion. The smaller shaded rectangle, with height equal to the final pressure of about 1.25 bar, is the work done in a one-step irreversible expansion against that constant external pressure. Reversible work is larger.',
    [
      S.path(under, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'none', w: 0 }),
      S.rect(X(V1), Y(p2), (V2 - V1) * sx, p2 * sy, { fill: 'var(--diagram-green)', fop: 0.5, c: 'var(--diagram-green)', sw: 1.5 }),
      S.path(curve, { c: 'var(--diagram-blue)', w: 2.5 }),
      S.arrow(ox, oy, 360, oy, { size: 7 }),
      S.arrow(ox, oy, ox, 22, { size: 7 }),
      S.line(X(V1), oy, X(V1), oy + 5),
      S.line(X(V2), oy, X(V2), oy + 5),
      lab(X(V1), oy + 18, '5', { a: 'middle' }),
      lab(X(V2), oy + 18, '20', { a: 'middle' }),
      lab(X(12.5), oy + 34, 'Volume V / L', { a: 'middle' }),
      lab(14, 112, 'p / bar', { size: 11 }),
      S.line(ox - 4, Y(p2), ox, Y(p2)),
      lab(ox - 8, Y(p2) + 4, '1.25', { a: 'end', size: 10 }),
      S.line(ox - 4, Y(4.99), ox, Y(4.99)),
      lab(ox - 8, Y(4.99) + 4, '5.0', { a: 'end', size: 10 }),
      lab(X(7.5), Y(3.3), 'reversible: whole area', { size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
      lab(X(7.5), Y(3.3) + 14, 'under the isotherm', { size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
      lab(X(9.5), Y(p2 / 2) + 4, 'irreversible: rectangle', { size: 11, c: 'var(--diagram-green)', w: 'bold' }),
      S.lead(X(13), Y(3.0) + 6, X(13), Y(2.0)),
      lab(X(11), 36, 'pV = constant (isothermal)', { size: 10 }),
    ].join(''),
  );
})();
export { PV };

// 2. Enthalpy level diagram: exothermic and endothermic.
export const LEVELS = svgDoc(
  380,
  230,
  'Two enthalpy level diagrams. Left, an exothermic change: the products sit at a lower enthalpy than the reactants and delta H is negative, so heat is released to the surroundings. Right, an endothermic change: the products sit at a higher enthalpy than the reactants and delta H is positive, so heat is absorbed.',
  [
    S.line(20, 205, 360, 205, { c: 'var(--diagram-muted)', w: 1 }),
    S.arrow(24, 205, 24, 20, { size: 6 }),
    lab(30, 28, 'Enthalpy, H', { size: 11 }),
    // exothermic
    S.line(50, 70, 130, 70, { c: 'var(--diagram-red)', w: 3 }),
    lab(90, 60, 'Reactants', { a: 'middle', size: 11 }),
    S.line(50, 160, 130, 160, { c: 'var(--diagram-blue)', w: 3 }),
    lab(90, 180, 'Products', { a: 'middle', size: 11 }),
    S.arrow(150, 72, 150, 158, { c: 'var(--diagram-accent)', w: 2 }),
    lab(160, 112, 'ΔH < 0', { size: 12, w: 'bold', c: 'var(--diagram-accent)' }),
    lab(160, 127, 'heat released', { size: 10 }),
    lab(90, 222, 'Exothermic', { a: 'middle', size: 11, w: 'bold' }),
    // endothermic
    S.line(230, 150, 310, 150, { c: 'var(--diagram-blue)', w: 3 }),
    lab(270, 170, 'Reactants', { a: 'middle', size: 11 }),
    S.line(230, 60, 310, 60, { c: 'var(--diagram-red)', w: 3 }),
    lab(270, 50, 'Products', { a: 'middle', size: 11 }),
    S.arrow(330, 148, 330, 62, { c: 'var(--diagram-accent)', w: 2 }),
    lab(337, 100, 'ΔH > 0', { size: 12, w: 'bold', c: 'var(--diagram-accent)' }),
    lab(337, 115, 'heat', { size: 10 }),
    lab(337, 128, 'absorbed', { size: 10 }),
    lab(270, 222, 'Endothermic', { a: 'middle', size: 11, w: 'bold' }),
  ].join(''),
);

// 3. Hess cycle: graphite to carbon dioxide directly or through carbon monoxide.
{
  chk(Math.abs(HESS.toCO + HESS.coToCO2 - HESS.toCO2) < 1e-9, `Hess: ${HESS.toCO} + ${HESS.coToCO2} = ${HESS.toCO2}`);
}
const box = (x, y, w, h, l1, l2) => [S.rect(x, y, w, h, { rx: 6, fill: 'var(--diagram-fill)', c: 'var(--diagram-muted)', sw: 1.5 }), lab(x + w / 2, y + 20, l1, { a: 'middle', size: 12, w: 'bold' }), l2 ? lab(x + w / 2, y + 36, l2, { a: 'middle', size: 10 }) : ''].join('');
export const HESS_SVG = svgDoc(
  380,
  240,
  `Hess cycle for the formation of carbon dioxide from graphite and oxygen. The direct path has an enthalpy change of ${HESS.toCO2} kilojoules per mole. The indirect path goes first to carbon monoxide with ${HESS.toCO}, then to carbon dioxide with ${HESS.coToCO2}. Both paths give the same total.`,
  [
    box(20, 20, 130, 46, 'C(s) + O₂(g)', 'graphite and oxygen'),
    box(230, 170, 130, 46, 'CO₂(g)', 'carbon dioxide'),
    box(20, 170, 130, 46, 'CO(g) + ½O₂(g)', 'carbon monoxide'),
    S.arrow(150, 43, 292, 168, { c: 'var(--diagram-blue)', w: 2.5, size: 8 }),
    lab(232, 96, `ΔH₁ = ${HESS.toCO2}`, { size: 11, w: 'bold', c: 'var(--diagram-blue)' }),
    lab(232, 110, 'direct', { size: 10 }),
    S.arrow(85, 68, 85, 168, { c: 'var(--diagram-red)', w: 2.5, size: 8 }),
    lab(94, 118, `ΔH₂ = ${HESS.toCO}`, { size: 11, w: 'bold', c: 'var(--diagram-red)' }),
    S.arrow(152, 193, 228, 193, { c: 'var(--diagram-green)', w: 2.5, size: 8 }),
    lab(190, 186, `ΔH₃ = ${HESS.coToCO2}`, { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-green)' }),
    lab(190, 236, 'ΔH₁ = ΔH₂ + ΔH₃   (kJ mol⁻¹)', { a: 'middle', size: 11 }),
  ].join(''),
);

// 4. ΔG = ΔH − TΔS against T for CaCO3 → CaO + CO2.
export const GT = (() => {
  const { dH, dS } = CACO3;
  const dG = (T) => dH - (T * dS) / 1000;
  const ox = 56;
  const oy = 200;
  const Tmin = 300;
  const Tmax = 1500;
  const sx = 300 / (Tmax - Tmin);
  const gMin = -80;
  const gMax = 140;
  const sy = 170 / (gMax - gMin);
  const X = (T) => ox + (T - Tmin) * sx;
  const Y = (g) => 20 + (gMax - g) * sy;
  const Teq = CACO3.Teq;
  chk(Math.abs(dG(Teq)) < 1e-9, `GT: ΔG = 0 at T = ${Teq.toFixed(0)} K`);
  chk(Teq > 1100 && Teq < 1120, `GT: crossing temperature ${Teq.toFixed(1)} K from ${dH} kJ and ${dS} J K⁻¹`);
  chk(dG(298) > 0 && dG(1500) < 0, 'GT: ΔG positive at 298 K, negative at 1500 K');
  const ticks = [400, 600, 800, 1000, 1200, 1400];
  return svgDoc(
    380,
    250,
    `Gibbs energy change against temperature for the decomposition of calcium carbonate. The line starts at about +130 kilojoules per mole near 300 kelvin and falls with a slope of minus delta S, crossing zero at about ${Math.round(Teq)} kelvin. Below that temperature the decomposition is not spontaneous; above it, it is spontaneous.`,
    [
      S.line(ox, Y(0), 360, Y(0), { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }),
      S.arrow(ox, oy + 8, ox, 14, { size: 6 }),
      S.arrow(ox, oy + 8, 365, oy + 8, { size: 6 }),
      ...ticks.map((T) => S.line(X(T), oy + 8, X(T), oy + 13) + lab(X(T), oy + 26, String(T), { a: 'middle', size: 10 })),
      lab(X(900), oy + 42, 'Temperature T / K', { a: 'middle' }),
      lab(8, 20, 'ΔG / kJ mol⁻¹', { size: 11 }),
      S.line(ox - 4, Y(100), ox, Y(100)),
      lab(ox - 7, Y(100) + 4, '100', { a: 'end', size: 10 }),
      S.line(ox - 4, Y(0), ox, Y(0)),
      lab(ox - 7, Y(0) + 4, '0', { a: 'end', size: 10 }),
      S.line(ox - 4, Y(-50), ox, Y(-50)),
      lab(ox - 7, Y(-50) + 4, '−50', { a: 'end', size: 10 }),
      S.line(X(Tmin), Y(dG(Tmin)), X(Tmax), Y(dG(Tmax)), { c: 'var(--diagram-blue)', w: 3 }),
      S.circle(X(Teq), Y(0), 5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
      S.lead(X(Teq), Y(0) - 6, X(Teq) - 30, Y(0) - 38),
      lab(X(Teq) - 36, Y(0) - 42, `ΔG = 0 at ${Math.round(Teq)} K`, { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-red)' }),
      lab(X(480), Y(110), 'ΔG > 0: not spontaneous', { size: 11 }),
      lab(X(1180), Y(-60), 'ΔG < 0: spontaneous', { size: 11 }),
      lab(X(680), Y(60), 'slope = −ΔS', { size: 10, c: 'var(--diagram-blue)' }),
    ].join(''),
  );
})();
