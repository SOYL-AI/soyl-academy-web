// Hand-drawn SVG schematics for ICSE 10 Chemistry ch06 Stoichiometry (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// A horizontal 100% bar made of coloured segments [label, percent, colour].
const BAR_W = 480;
function bar(y, segs) {
  let x = 20;
  return segs
    .map(([name, pc, colour]) => {
      const w = (BAR_W * pc) / 100;
      const out =
        S.rect(x, y, w, 40, { fill: colour, fop: 0.3, sw: 1.2 }) +
        (w >= 60 ? S.text(x + w / 2, y + 17, name, { a: 'middle', size: 12, w: 'bold' }) + S.text(x + w / 2, y + 32, `${pc}%`, { a: 'middle', size: 11 }) : S.text(x + w / 2, y + 25, name, { a: 'middle', size: 11, w: 'bold' }) + S.text(x + w / 2, y + 56, `${pc}%`, { a: 'middle', size: 10 }));
      x += w;
      return out;
    })
    .join('');
}

// 1. Percentage composition bars for two nitrogen fertilisers.
export const PERCENT_BARS = svgDoc(
  520,
  250,
  'Two horizontal bars, each standing for 100 percent of the mass of a fertiliser. Urea, CO(NH2)2, molar mass 60: nitrogen 46.67 percent, oxygen 26.67 percent, carbon 20 percent and hydrogen 6.67 percent. Ammonium nitrate, NH4NO3, molar mass 80: nitrogen 35 percent, oxygen 60 percent and hydrogen 5 percent. Urea has the larger share of nitrogen.',
  [
    lab(20, 28, 'Urea, CO(NH₂)₂ — M = 60', { size: 12, w: 'bold' }),
    bar(36, [['N', 46.67, 'var(--diagram-blue)'], ['O', 26.67, 'var(--diagram-red)'], ['C', 20, 'var(--diagram-muted)'], ['H', 6.67, 'var(--diagram-green)']]),
    lab(20, 132, 'Ammonium nitrate, NH₄NO₃ — M = 80', { size: 12, w: 'bold' }),
    bar(140, [['N', 35, 'var(--diagram-blue)'], ['O', 60, 'var(--diagram-red)'], ['H', 5, 'var(--diagram-green)']]),
    lab(20, 236, '% of an element = (mass of the element in 1 mol ÷ molar mass) × 100', { size: 11, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. The stoichiometry bridge: given quantity of A -> moles of A -> (mole ratio) -> moles of B -> wanted quantity of B.
const box = (x, w, l1, l2, colour) => S.rect(x, 60, w, 56, { rx: 6, fill: colour, fop: 0.16, sw: 1.5 }) + S.text(x + w / 2, 84, l1, { a: 'middle', size: 12, w: 'bold' }) + S.text(x + w / 2, 102, l2, { a: 'middle', size: 11 });
export const STOICH_BRIDGE = svgDoc(
  560,
  230,
  'The three-step bridge for calculations from equations. Step 1: change the given mass of substance A into moles by dividing by its molar mass, or change a gas volume at STP into moles by dividing by 22.4. Step 2: use the mole ratio from the balanced equation to get the moles of substance B. Step 3: change the moles of B into a mass by multiplying by its molar mass, or into a gas volume at STP by multiplying by 22.4. Example below: carbon burning to carbon dioxide, 3 g of carbon is 0.25 mol, giving 0.25 mol of carbon dioxide, which is 11 g or 5.6 cubic decimetres at STP.',
  [
    box(8, 112, 'Given', 'mass or volume of A', 'var(--diagram-blue)'),
    box(150, 100, 'Moles', 'of A', 'var(--diagram-accent)'),
    box(300, 100, 'Moles', 'of B', 'var(--diagram-accent)'),
    box(440, 112, 'Wanted', 'mass or volume of B', 'var(--diagram-green)'),
    S.arrow(122, 88, 148, 88, { size: 6 }),
    S.arrow(252, 88, 298, 88, { c: 'var(--diagram-red)', size: 6 }),
    S.arrow(402, 88, 438, 88, { size: 6 }),
    S.lines(64, 26, ['Step 1', '÷ M(A) or ÷ 22.4'], { a: 'middle', size: 10, dy: 13 }),
    S.lines(276, 26, ['Step 2', '× mole ratio B : A'], { a: 'middle', size: 10, dy: 13, c: 'var(--diagram-red)' }),
    S.lines(490, 26, ['Step 3', '× M(B) or × 22.4'], { a: 'middle', size: 10, dy: 13 }),
    lab(276, 136, 'from the balanced equation', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.line(20, 156, 540, 156, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(20, 178, 'Example: C + O₂ → CO₂ (C = 12, O = 16)', { size: 11, w: 'bold' }),
    lab(20, 198, '3 g of C  →  3 ÷ 12 = 0.25 mol C  →  0.25 mol CO₂ (ratio 1 : 1)', { size: 11 }),
    lab(20, 216, '→  0.25 × 44 = 11 g of CO₂,  or  0.25 × 22.4 = 5.6 dm³ at STP', { size: 11 }),
  ].join(''),
);
