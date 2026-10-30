// Hand-drawn SVG schematics for ch10 Biomolecules (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Open-chain (Fischer) structure of D-glucose.
const ROWS = [['CHO', null, null], ['C', 'H', 'OH'], ['C', 'HO', 'H'], ['C', 'H', 'OH'], ['C', 'H', 'OH'], ['CH₂OH', null, null]];
export const GLUCOSE = svgDoc(
  340,
  250,
  'Open-chain structure of D-glucose drawn as a vertical chain of six carbon atoms. Carbon 1 at the top is an aldehyde group, CHO. Carbons 2, 4 and 5 carry OH on the right and H on the left; carbon 3 carries OH on the left and H on the right. Carbon 6 at the bottom is CH2OH. The OH on carbon 5, on the right, marks it as the D form.',
  [
    ...ROWS.flatMap(([c, left, right], i) => {
      const y = 30 + i * 36;
      const out = [S.text(150, y + 4, c, { a: 'middle', size: 12, w: 'bold' })];
      if (i < ROWS.length - 1) out.push(S.line(150, y + 10, 150, y + 26, { w: 1.5 }));
      if (left) {
        out.push(S.line(140, y, 112, y, { w: 1.5 }));
        out.push(S.text(105, y + 4, left, { a: 'end', size: 11, c: left === 'HO' ? 'var(--diagram-red)' : 'currentColor' }));
      }
      if (right) {
        out.push(S.line(160, y, 188, y, { w: 1.5 }));
        out.push(S.text(195, y + 4, right, { size: 11, c: right === 'OH' ? 'var(--diagram-red)' : 'currentColor' }));
      }
      out.push(S.text(30, y + 4, `C${i + 1}`, { size: 10, c: 'var(--diagram-muted)' }));
      return out;
    }),
    S.rect(186, 158, 34, 20, { c: 'var(--diagram-accent)', sw: 1.5, dash: '3 2' }),
    lab(228, 172, 'D (OH right at C5)', { size: 10, c: 'var(--diagram-accent)' }),
    lab(150, 242, 'D-Glucose, C₆H₁₂O₆ (aldohexose)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Peptide bond formation.
export const PEPTIDE = svgDoc(
  360,
  150,
  'Two amino acids joining to form a dipeptide. The carboxyl group of the first amino acid and the amino group of the second lose a molecule of water, and a peptide (amide) bond, –CO–NH–, links them.',
  [
    lab(10, 50, 'H₂N–CH(R)–CO', { size: 12, w: 'bold' }),
    S.rect(108, 36, 24, 20, { c: 'var(--diagram-red)', sw: 1.5, dash: '3 2' }),
    lab(112, 50, 'OH', { size: 12, c: 'var(--diagram-red)' }),
    lab(140, 50, '+', { size: 12 }),
    S.rect(152, 36, 20, 20, { c: 'var(--diagram-red)', sw: 1.5, dash: '3 2' }),
    lab(156, 50, 'H', { size: 12, c: 'var(--diagram-red)' }),
    lab(172, 50, 'NH–CH(R′)–COOH', { size: 12, w: 'bold' }),
    S.arrow(160, 66, 160, 92, { size: 6 }),
    lab(170, 84, '− H₂O', { size: 10 }),
    lab(30, 118, 'H₂N–CH(R)–', { size: 12, w: 'bold' }),
    S.rect(118, 102, 70, 22, { fill: 'var(--diagram-accent)', fop: 0.2, c: 'var(--diagram-accent)', sw: 1.5 }),
    lab(124, 118, 'CO–NH', { size: 12, w: 'bold', c: 'var(--diagram-accent)' }),
    lab(190, 118, '–CH(R′)–COOH', { size: 12, w: 'bold' }),
    lab(153, 142, 'peptide bond', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 3. DNA double helix as a ladder with base pairs.
export const DNA = svgDoc(
  340,
  230,
  'A short section of DNA drawn as a twisted ladder. Two sugar–phosphate backbones run in opposite directions. The rungs are base pairs held by hydrogen bonds: adenine pairs with thymine by two hydrogen bonds, and guanine pairs with cytosine by three hydrogen bonds.',
  [
    S.path('M60 20 C70 70 50 120 60 170 C66 200 60 215 60 222', { w: 3, c: 'var(--diagram-blue)' }),
    S.path('M200 20 C190 70 210 120 200 170 C194 200 200 215 200 222', { w: 3, c: 'var(--diagram-green)' }),
    ...[[40, 'A', 'T', 2], [80, 'G', 'C', 3], [120, 'T', 'A', 2], [160, 'C', 'G', 3], [200, 'A', 'T', 2]].map(([y, b1, b2, n]) => [
      S.line(64, y, 120, y, { w: 2 }),
      S.line(140, y, 196, y, { w: 2 }),
      S.text(108, y - 5, b1, { a: 'middle', size: 10, w: 'bold' }),
      S.text(152, y - 5, b2, { a: 'middle', size: 10, w: 'bold' }),
      ...Array.from({ length: n }, (_, k) => S.line(124 + k * 5, y - 4, 124 + k * 5, y + 4, { w: 1.2, c: 'var(--diagram-accent)' })),
    ].join('')),
    lab(250, 40, 'A=T: 2 H-bonds', { size: 10 }),
    lab(250, 56, 'G≡C: 3 H-bonds', { size: 10 }),
    lab(250, 90, 'sugar–phosphate', { size: 10 }),
    lab(250, 104, 'backbones run', { size: 10 }),
    lab(250, 118, 'in opposite', { size: 10 }),
    lab(250, 132, 'directions', { size: 10 }),
  ].join(''),
);
