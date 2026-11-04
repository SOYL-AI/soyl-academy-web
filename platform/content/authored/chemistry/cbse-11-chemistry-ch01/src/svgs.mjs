// Hand-drawn SVG schematics for ch01 Some Basic Concepts of Chemistry (allow-listed elements, palette colours only).
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. The mole map: mass, particles, gas volume and solution concentration all pass through amount of substance.
const NA = 6.022e23;
const exM = 44.0;
const exN = 0.5;
const exMass = exN * exM;
const exParticles = exN * NA;
chk(near(exMass, 22.0), 'mole map: 0.50 mol of a compound of molar mass 44.0 g/mol is 22 g');
chk(near(exParticles, 3.011e23, 0.001), 'mole map: 0.50 mol is 3.0 x 10^23 particles');
function node(cx, cy, w, h, l1, l2, fill) {
  return S.rect(cx - w / 2, cy - h / 2, w, h, { fill, fop: 0.3, rx: 8, sw: 1.5 }) + lab(cx, cy - (l2 ? 2 : -4), l1, { a: 'middle', w: 'bold' }) + (l2 ? lab(cx, cy + 12, l2, { a: 'middle', size: 10 }) : '');
}
function pair(x1, y1, x2, y2, up, down, horizontal = true) {
  // two opposite arrows, offset sideways by 7 px, with labels
  const off = 7;
  if (horizontal) {
    return (
      S.arrow(x1, y1 - off, x2, y2 - off, { size: 6, c: 'var(--diagram-accent)' }) +
      S.arrow(x2, y2 + off, x1, y1 + off, { size: 6, c: 'var(--diagram-blue)' }) +
      lab((x1 + x2) / 2, y1 - off - 5, up, { a: 'middle', size: 10, c: 'var(--diagram-accent)' }) +
      lab((x1 + x2) / 2, y1 + off + 14, down, { a: 'middle', size: 10, c: 'var(--diagram-blue)' })
    );
  }
  return (
    S.arrow(x1 - off, y1, x2 - off, y2, { size: 6, c: 'var(--diagram-accent)' }) +
    S.arrow(x2 + off, y2, x1 + off, y1, { size: 6, c: 'var(--diagram-blue)' }) +
    lab(x1 - off - 5, (y1 + y2) / 2 + 4, up, { a: 'end', size: 10, c: 'var(--diagram-accent)' }) +
    lab(x1 + off + 5, (y1 + y2) / 2 + 4, down, { a: 'start', size: 10, c: 'var(--diagram-blue)' })
  );
}
export const MOLE_MAP = svgDoc(
  440,
  250,
  'The mole map. Amount of substance in moles sits in the centre. Mass in grams is reached by multiplying by the molar mass, and moles by dividing mass by the molar mass. Number of particles is reached by multiplying moles by the Avogadro constant, and moles by dividing the number by it. Volume of a gas at standard conditions is moles times 22.4 litres per mole, and the amount of solute in a solution is molarity times volume in litres. A worked example shows 0.50 mol of a compound of molar mass 44.0 grams per mole is 22 grams and about 3.0 times ten to the 23 particles.',
  [
    node(220, 120, 110, 44, 'Amount n', 'in mol', 'var(--diagram-yellow)'),
    node(62, 120, 104, 44, 'Mass m', 'in g', 'var(--diagram-green)'),
    node(378, 120, 116, 44, 'Particles N', 'atoms, molecules, ions', 'var(--diagram-red)'),
    node(220, 32, 150, 40, 'Gas volume V', 'at 273.15 K, 1 atm', 'var(--diagram-blue)'),
    node(220, 208, 150, 40, 'Solution', 'n = c × V (litres)', 'var(--diagram-brown)'),
    pair(116, 120, 163, 120, '÷ M', '× M'),
    pair(277, 120, 318, 120, '× N_A', '÷ N_A'),
    pair(220, 54, 220, 97, '÷ 22.4', '× 22.4', false),
    pair(220, 143, 220, 186, '÷ V', '× V', false),
    lab(220, 244, `Example: 0.50 mol × 44.0 g/mol = ${exMass.toFixed(0)} g; 0.50 mol × 6.022 × 10²³ = 3.0 × 10²³ particles`, { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Limiting reagent: before and after bars for 2 Mg + O2 -> 2 MgO (6.0 mol Mg, 2.0 mol O2).
const before = { Mg: 6.0, O2: 2.0, MgO: 0 };
const extent = Math.min(before.Mg / 2, before.O2 / 1);
const after = { Mg: before.Mg - 2 * extent, O2: before.O2 - extent, MgO: 2 * extent };
chk(near(after.Mg, 2.0) && near(after.O2, 0) && near(after.MgO, 4.0), 'limiting reagent: 6.0 mol Mg + 2.0 mol O2 leaves 2.0 mol Mg and gives 4.0 mol MgO');
const base = 170;
const unit = 18;
function bars(x0, vals, title) {
  const cols = { Mg: 'var(--diagram-blue)', O2: 'var(--diagram-red)', MgO: 'var(--diagram-green)' };
  let out = lab(x0 + 70, 28, title, { a: 'middle', w: 'bold' });
  Object.entries(vals).forEach(([k, v], i) => {
    const x = x0 + 14 + i * 50;
    const h = v * unit;
    out += S.rect(x, base - h, 34, Math.max(h, 0.01), { fill: cols[k], fop: 0.45, c: cols[k], sw: 1.5 });
    out += lab(x + 17, base + 15, k === 'O2' ? 'O₂' : k, { a: 'middle' });
    out += lab(x + 17, base - h - 5, v.toFixed(1), { a: 'middle', size: 10 });
  });
  return out;
}
export const LIMITING = svgDoc(
  490,
  205,
  'Bar chart of amounts in moles for the reaction of 2 magnesium with 1 oxygen to give 2 magnesium oxide. Before the reaction: magnesium 6.0, oxygen 2.0, magnesium oxide 0. After the reaction: magnesium 2.0 left over, oxygen 0 because it is the limiting reagent and is used up, and magnesium oxide 4.0.',
  [
    S.line(20, base, 470, base, { w: 1.5 }),
    bars(24, before, 'Before'),
    S.arrow(190, 100, 228, 100, { size: 7 }),
    lab(209, 88, 'react', { a: 'middle', size: 10 }),
    bars(240, after, 'After'),
    lab(398, 120, 'O₂ is used up:', { size: 10 }),
    lab(398, 134, 'limiting reagent', { size: 10 }),
    lab(398, 152, 'Mg left: 2.0 mol', { size: 10 }),
    lab(245, 199, '2 Mg + O₂ → 2 MgO; amounts in mol', { a: 'middle', size: 10 }),
  ].join(''),
);
