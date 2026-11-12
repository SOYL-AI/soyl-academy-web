// Hand-drawn SVG schematics for ISC 11 ch02 Mole Concept, Concentration and Stoichiometry. Geometry and data computed here.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const NA = 6.022e23;

// 1. Mole hub: 0.50 mol of carbon dioxide (M = 44.0 g/mol) in all its guises.
const n = 0.5;
const M = 44.0;
const mass = n * M;
const parts = n * NA;
const vSTP = n * 22.4;
const Vsoln = 0.25;
const conc = n / Vsoln;
chk(near(mass, 22.0, 1e-9) && near(vSTP, 11.2, 1e-9), 'mole hub: 0.50 mol CO2 is 22.0 g and 11.2 L at STP');
chk(near(parts, 3.011e23, 0.001) && near(conc, 2.0, 1e-9), 'mole hub: 0.50 mol is 3.01e23 molecules and 2.0 mol/L in 0.25 L');
function node(cx, cy, w, h, l1, l2, fill) {
  return S.rect(cx - w / 2, cy - h / 2, w, h, { fill, fop: 0.3, rx: 8 }) + lab(cx, cy - 2, l1, { a: 'middle', w: 'bold' }) + lab(cx, cy + 12, l2, { a: 'middle', size: 10 });
}
function two(x1, y1, x2, y2, a, b, horiz) {
  const o = 7;
  if (horiz)
    return S.arrow(x1, y1 - o, x2, y2 - o, { size: 6, c: 'var(--diagram-accent)' }) + S.arrow(x2, y2 + o, x1, y1 + o, { size: 6, c: 'var(--diagram-blue)' }) + lab((x1 + x2) / 2, y1 - o - 5, a, { a: 'middle', size: 10, c: 'var(--diagram-accent)' }) + lab((x1 + x2) / 2, y1 + o + 14, b, { a: 'middle', size: 10, c: 'var(--diagram-blue)' });
  return S.arrow(x1 - o, y1, x2 - o, y2, { size: 6, c: 'var(--diagram-accent)' }) + S.arrow(x2 + o, y2, x1 + o, y1, { size: 6, c: 'var(--diagram-blue)' }) + lab(x1 - o - 5, (y1 + y2) / 2 + 4, a, { a: 'end', size: 10, c: 'var(--diagram-accent)' }) + lab(x1 + o + 5, (y1 + y2) / 2 + 4, b, { a: 'start', size: 10, c: 'var(--diagram-blue)' });
}
export const MOLE_HUB = svgDoc(
  560,
  260,
  'Hub diagram with amount of substance in moles at the centre. Mass in grams is reached by multiplying moles by molar mass. Number of particles is reached by multiplying by the Avogadro constant. Volume of a gas at standard temperature and pressure is moles times 22.4 litres. Volume of solution is moles divided by molarity. Worked example for 0.50 mole of carbon dioxide: 22.0 grams, 3.01 times ten to the 23 molecules, 11.2 litres at STP, and a 2.0 molar solution when dissolved to 0.25 litre.',
  [
    node(280, 130, 120, 46, 'n (mol)', 'amount of substance', 'var(--diagram-yellow)'),
    node(76, 130, 120, 46, 'Mass m (g)', `${mass.toFixed(1)} g of CO₂`, 'var(--diagram-green)'),
    node(484, 130, 120, 46, 'Particles N', `${(parts / 1e23).toFixed(2)} × 10²³ molecules`, 'var(--diagram-red)'),
    node(280, 34, 150, 44, 'Gas volume V', `${vSTP.toFixed(1)} L at STP`, 'var(--diagram-blue)'),
    node(280, 226, 170, 44, 'Solution', `${conc.toFixed(1)} mol/L in ${Vsoln} L`, 'var(--diagram-brown)'),
    two(136, 130, 220, 130, '× M', '÷ M', true),
    two(340, 130, 424, 130, '× N_A', '÷ N_A', true),
    two(280, 56, 280, 107, '÷ 22.4 L', '× 22.4 L', false),
    two(280, 153, 280, 204, '÷ c', '× c', false),
  ].join(''),
);

// 2. Equivalent weights: E = M / n-factor for six substances (bars on a common scale).
const SUBS = [
  { name: 'HCl', M: 36.5, nf: 1, c: 'var(--diagram-red)' },
  { name: 'H₂SO₄', M: 98.0, nf: 2, c: 'var(--diagram-red)' },
  { name: 'H₃PO₄ (to Na₃PO₄)', M: 98.0, nf: 3, c: 'var(--diagram-red)' },
  { name: 'NaOH', M: 40.0, nf: 1, c: 'var(--diagram-blue)' },
  { name: 'Ca(OH)₂', M: 74.0, nf: 2, c: 'var(--diagram-blue)' },
  { name: 'KMnO₄ (acidic)', M: 158.0, nf: 5, c: 'var(--diagram-green)' },
];
const E = SUBS.map((s) => s.M / s.nf);
chk(near(E[1], 49.0, 1e-9) && near(E[2], 32.67, 0.001) && near(E[4], 37.0, 1e-9) && near(E[5], 31.6, 1e-9), 'equivalent bars: E(H2SO4) 49.0, E(H3PO4) 32.7, E(Ca(OH)2) 37.0, E(KMnO4 acidic) 31.6');
chk(SUBS.every((s, i) => E[i] <= s.M), 'equivalent bars: E never exceeds M');
const bx = 170;
const bw = 270;
const scaleE = bw / 158;
function bars() {
  let out = '';
  SUBS.forEach((s, i) => {
    const y = 20 + i * 38;
    out += lab(bx - 8, y + 16, s.name, { a: 'end' });
    out += S.rect(bx, y, s.M * scaleE, 11, { fill: 'var(--diagram-muted)', fop: 0.35, c: 'var(--diagram-muted)', sw: 1 });
    out += S.rect(bx, y + 14, E[i] * scaleE, 11, { fill: s.c, fop: 0.55, c: s.c, sw: 1 });
    out += lab(bx + 8 + Math.max(s.M, E[i]) * scaleE, y + 10, `M = ${s.M.toFixed(1)}`, { size: 10 });
    out += lab(bx + 8 + E[i] * scaleE, y + 24, `E = ${E[i].toFixed(1)} (n = ${s.nf})`, { size: 10, w: 'bold' });
  });
  out += lab(bx, 252, 'grey bar: molar mass M; coloured bar: equivalent weight E = M / n-factor', { size: 10 });
  return out;
}
export const EQ_BARS = svgDoc(
  600,
  262,
  'Bar chart comparing molar mass with equivalent weight for six substances. Hydrochloric acid 36.5 and 36.5. Sulfuric acid 98.0 and 49.0. Phosphoric acid neutralised completely 98.0 and 32.7. Sodium hydroxide 40.0 and 40.0. Calcium hydroxide 74.0 and 37.0. Potassium permanganate in acidic medium 158.0 and 31.6. Equivalent weight equals molar mass divided by the n-factor.',
  bars(),
);

// 3. Denominators of concentration terms for 18.0 g glucose (M = 180) in 250 g water.
const gl = 18.0 / 180;
const water = 250;
const nw = water / 18;
const molal = gl / (water / 1000);
const xs = gl / (gl + nw);
const wp = (18.0 / (18.0 + water)) * 100;
chk(near(molal, 0.4, 1e-9), 'concentration terms: 0.100 mol in 0.250 kg is 0.400 mol/kg');
chk(near(xs, 0.00715, 0.005), 'concentration terms: mole fraction of glucose 0.00715');
chk(near(wp, 6.72, 0.002), 'concentration terms: mass percent 6.72');
const rows = [
  ['Molarity', 'mol of solute', 'litres of solution', 'var(--diagram-yellow)'],
  ['Molality', 'mol of solute', 'kg of solvent', 'var(--diagram-blue)'],
  ['Mole fraction', 'mol of one component', 'total mol of all components', 'var(--diagram-green)'],
  ['Normality', 'gram equivalents of solute', 'litres of solution', 'var(--diagram-yellow)'],
  ['Mass percent (w/w)', 'g of solute × 100', 'g of solution', 'var(--diagram-brown)'],
];
function conc2() {
  let out = '';
  // beaker with solvent level and solute dots
  out += S.path('M24 34 L24 190 L136 190 L136 34', { w: 2 });
  out += S.rect(25, 86, 110, 103, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'none', sw: 0 });
  [[44, 140], [70, 160], [96, 150], [60, 120], [110, 130], [88, 175], [42, 172], [118, 168]].forEach(([x, y]) => (out += S.circle(x, y, 4, { fill: 'var(--diagram-green)', fop: 0.8, c: 'var(--diagram-green)', sw: 1 })));
  out += lab(80, 28, 'solution', { a: 'middle', w: 'bold' });
  out += lab(80, 208, 'solute + solvent', { a: 'middle', size: 10 });
  out += lab(80, 224, `${(18.0).toFixed(1)} g glucose + ${water} g water`, { a: 'middle', size: 10 });
  rows.forEach(([name, top, bottom, col], i) => {
    const y = 34 + i * 44;
    out += lab(170, y + 4, name, { w: 'bold' });
    out += lab(300, y - 4, top, { size: 10 });
    out += S.line(298, y, 470, y, { w: 1.2 });
    out += S.rect(298, y + 4, 172, 16, { fill: col, fop: 0.35, c: col, sw: 1 });
    out += lab(300, y + 16, bottom, { size: 10 });
  });
  out += lab(170, 252, `Glucose example: molality ${molal.toFixed(3)} mol/kg, mole fraction ${xs.toFixed(5)}, mass percent ${wp.toFixed(2)}`, { size: 10 });
  return out;
}
export const CONC_DENOM = svgDoc(
  600,
  262,
  'Beaker holding 18.0 grams of glucose dissolved in 250 grams of water, with a table of five concentration terms and the quantity each divides by. Molarity divides moles of solute by litres of solution. Molality divides moles of solute by kilograms of solvent. Mole fraction divides moles of one component by total moles. Normality divides gram equivalents by litres of solution. Mass percent divides grams of solute by grams of solution. For the glucose solution the molality is 0.400, the mole fraction is 0.00715 and the mass percent is 6.72.',
  conc2(),
);

// 4. Titration: N1 V1 = N2 V2 (20.0 mL of 0.120 N acid neutralises 24.0 mL of base).
const N1 = 0.12;
const V1 = 20.0;
const V2 = 24.0;
const N2 = (N1 * V1) / V2;
chk(near(N2, 0.1, 1e-9) && near(N1 * V1, N2 * V2, 1e-9), 'titration: 0.120 x 20.0 = 0.100 x 24.0 = 2.40 milli-equivalents');
export const TITRATION = svgDoc(
  560,
  250,
  'Titration set-up. A burette holds 20.0 millilitres of acid of normality 0.120 above a conical flask containing 24.0 millilitres of base of unknown normality. At the end point the gram equivalents of acid and base are equal, so N1 V1 equals N2 V2. The product 0.120 times 20.0 is 2.40 milli-equivalents, so the base normality is 2.40 divided by 24.0, which is 0.100.',
  [
    S.rect(86, 18, 20, 120, { fill: 'var(--diagram-yellow)', fop: 0.3 }),
    S.line(96, 138, 96, 156, { w: 3 }),
    S.line(80, 138, 112, 138, { w: 2 }),
    lab(124, 40, 'Burette: acid', { w: 'bold' }),
    lab(124, 56, `N₁ = ${N1.toFixed(3)} N`, { size: 11 }),
    lab(124, 72, `V₁ = ${V1.toFixed(1)} mL`, { size: 11 }),
    S.path('M70 176 L122 176 L150 232 L42 232 Z', { fill: 'var(--diagram-blue)', fop: 0.3, c: 'currentColor' }),
    lab(176, 200, 'Flask: base', { w: 'bold' }),
    lab(176, 216, `V₂ = ${V2.toFixed(1)} mL, N₂ = ?`, { size: 11 }),
    S.rect(330, 60, 214, 112, { fill: 'var(--diagram-fill)', fop: 0.5, rx: 8, c: 'var(--diagram-muted)', sw: 1 }),
    lab(437, 84, 'At the end point', { a: 'middle', w: 'bold' }),
    lab(437, 106, 'gram equivalents of acid', { a: 'middle', size: 11 }),
    lab(437, 120, '= gram equivalents of base', { a: 'middle', size: 11 }),
    lab(437, 142, 'N₁V₁ = N₂V₂', { a: 'middle', w: 'bold', size: 13 }),
    lab(437, 162, `${N1.toFixed(3)} × ${V1.toFixed(1)} = N₂ × ${V2.toFixed(1)}  →  N₂ = ${N2.toFixed(3)} N`, { a: 'middle', size: 10 }),
  ].join(''),
);

// 5. Limiting reagent: 2 Al + 3 Cl2 -> 2 AlCl3 with 0.40 mol Al and 0.30 mol Cl2.
const before = { Al: 0.4, Cl2: 0.3, AlCl3: 0 };
const ext = Math.min(before.Al / 2, before.Cl2 / 3);
const after = { Al: before.Al - 2 * ext, Cl2: before.Cl2 - 3 * ext, AlCl3: 2 * ext };
chk(near(ext, 0.1, 1e-9) && near(after.Al, 0.2, 1e-9) && near(after.Cl2, 0, 1e-9) && near(after.AlCl3, 0.2, 1e-9), 'limiting reagent: 0.40 mol Al + 0.30 mol Cl2 leaves 0.20 mol Al and gives 0.20 mol AlCl3');
const baseY = 160;
const unit = 260;
function grp(x0, vals, title) {
  const cols = { Al: 'var(--diagram-blue)', Cl2: 'var(--diagram-green)', AlCl3: 'var(--diagram-red)' };
  let out = lab(x0 + 80, 30, title, { a: 'middle', w: 'bold' });
  Object.entries(vals).forEach(([k, v], i) => {
    const x = x0 + 8 + i * 52;
    const h = v * unit;
    out += S.rect(x, baseY - h, 38, Math.max(h, 0.01), { fill: cols[k], fop: 0.45, c: cols[k], sw: 1.5 });
    out += lab(x + 19, baseY + 15, k === 'Cl2' ? 'Cl₂' : k === 'AlCl3' ? 'AlCl₃' : k, { a: 'middle' });
    out += lab(x + 19, baseY - h - 5, v.toFixed(2), { a: 'middle', size: 10 });
  });
  return out;
}
export const LIM_BARS = svgDoc(
  560,
  205,
  'Bar chart of amounts in moles for 2 aluminium plus 3 chlorine giving 2 aluminium chloride. Before the reaction: aluminium 0.40, chlorine 0.30, aluminium chloride 0. After the reaction: aluminium 0.20 left over, chlorine 0 because it is the limiting reagent, and aluminium chloride 0.20.',
  [
    S.line(14, baseY, 540, baseY, { w: 1.5 }),
    grp(18, before, 'Before'),
    S.arrow(190, 100, 236, 100, { size: 7 }),
    lab(213, 90, 'react', { a: 'middle', size: 10 }),
    grp(256, after, 'After'),
    lab(424, 80, 'Cl₂ is used up:', { size: 11, w: 'bold' }),
    lab(424, 96, 'limiting reagent', { size: 11 }),
    lab(424, 120, 'Al left: 0.20 mol', { size: 11 }),
    lab(424, 136, 'AlCl₃ formed: 0.20 mol', { size: 11 }),
    lab(280, 196, '2 Al + 3 Cl₂ → 2 AlCl₃; amounts in mol', { a: 'middle', size: 10 }),
  ].join(''),
);
