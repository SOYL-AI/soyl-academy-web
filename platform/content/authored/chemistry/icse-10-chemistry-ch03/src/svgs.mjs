// Hand-drawn SVG schematics for ICSE 10 Chemistry ch03 (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. The pH scale as a number line with acidic, neutral and alkaline regions.
export const PH_SCALE = svgDoc(
  460,
  170,
  'A pH scale from 0 to 14 drawn as a bar. The left part, from 0 to just below 7, is shaded as acidic, with strongly acidic values near 0 to 2 and weakly acidic values near 4 to 6. The point 7 is marked neutral. The right part, above 7 up to 14, is shaded as alkaline, weakly alkaline near 8 to 10 and strongly alkaline near 12 to 14. Arrows show that hydronium ion concentration increases towards the left and hydroxide ion concentration increases towards the right. Example labels: dilute hydrochloric acid about 1, vinegar about 3, pure water 7, baking soda solution about 8, sodium hydroxide solution about 13.',
  [
    S.rect(30, 60, 180, 26, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1 }),
    S.rect(210, 60, 40, 26, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }),
    S.rect(250, 60, 180, 26, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1 }),
    ...Array.from({ length: 15 }, (_, i) => lab(30 + i * 28.57, 102, String(i), { a: 'middle', size: 10 })),
    lab(120, 78, 'acidic', { a: 'middle', size: 12, w: 'bold' }),
    lab(230, 78, '7', { a: 'middle', size: 12, w: 'bold' }),
    lab(340, 78, 'alkaline', { a: 'middle', size: 12, w: 'bold' }),
    lab(230, 52, 'neutral', { a: 'middle', size: 10 }),
    S.arrow(200, 30, 40, 30, { c: 'var(--diagram-red)' }), lab(120, 24, 'more H₃O⁺', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.arrow(260, 30, 420, 30, { c: 'var(--diagram-blue)' }), lab(340, 24, 'more OH⁻', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(59, 125, 'dil. HCl ≈ 1', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(116, 142, 'vinegar ≈ 3', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(230, 125, 'pure water 7', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(290, 142, 'NaHCO₃(aq) ≈ 8', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(400, 125, 'NaOH(aq) ≈ 13', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
