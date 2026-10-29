// SVG diagrams for ch10 Biotechnology and its Applications (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { INSULIN } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const box = (x, y, w, h, lines, fill) => S.rect(x, y, w, h, { rx: 6, fill, fop: 0.22, sw: 1.2 }) + lines.map((t, i) => S.text(x + w / 2, y + 17 + i * 13, t, { a: 'middle', size: 10 })).join('');

// 1. How Bt toxin kills an insect
export const BT = svgDoc(
  460,
  220,
  'How Bt toxin acts: Bacillus thuringiensis makes an inactive protoxin as crystals; the bacterium is not harmed. When an insect larva eats the crystals, the alkaline pH of its gut solubilises them and converts the protoxin into the active toxin, which binds to the surface of the midgut epithelial cells and creates pores; the cells swell and burst, and the insect dies',
  [
    box(10, 20, 130, 58, ['Bt makes inactive', 'protoxin crystals', '(bacterium unharmed)'], 'var(--diagram-yellow)'),
    box(165, 20, 130, 58, ['Insect larva eats', 'crystals on the', 'Bt plant'], 'var(--diagram-green)'),
    box(320, 20, 130, 58, ['Alkaline pH in gut', 'solubilises crystals:', 'active toxin forms'], 'var(--diagram-blue)'),
    box(320, 130, 130, 58, ['Toxin binds midgut', 'epithelial cells and', 'creates pores'], 'var(--diagram-red)'),
    box(165, 130, 130, 58, ['Cells swell and', 'burst (lysis)'], 'var(--diagram-red)'),
    box(10, 130, 130, 58, ['Insect dies'], 'var(--diagram-muted)'),
    S.arrow(140, 49, 163, 49, { size: 6 }), S.arrow(295, 49, 318, 49, { size: 6 }),
    S.arrow(385, 78, 385, 128, { size: 6 }), S.arrow(320, 159, 297, 159, { size: 6 }), S.arrow(165, 159, 142, 159, { size: 6 }),
    S.text(230, 212, 'cry genes code for the toxins, e.g. cryIAc and cryIIAb (cotton bollworms), cryIAb (corn borer)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Insulin: proinsulin and mature insulin
const chain = (x, y, n, w, c) => Array.from({ length: n }, (_, i) => S.circle(x + i * w, y, w / 2 - 0.5, { fill: c, fop: 0.35, sw: 0.6 })).join('');
const W = 10;
export const INSULIN_SVG = svgDoc(
  460,
  230,
  `Insulin: in the body it is made as proinsulin, a single chain with an extra C peptide; the C peptide is removed to give mature insulin, two chains A (${INSULIN.A} amino acids) and B (${INSULIN.B} amino acids) linked by disulphide bridges. In recombinant production the two chains are made separately in E. coli and then joined by creating disulphide bonds`,
  [
    S.text(10, 18, 'Proinsulin', { size: 12, w: 'bold' }),
    chain(30, 44, INSULIN.B, W, 'var(--diagram-blue)'),
    S.path(`M${30 + (INSULIN.B - 1) * W} 44 C410 56 410 92 ${30 + (INSULIN.B - 1) * W} 100`, { w: 6, c: 'var(--diagram-yellow)', cap: 'round' }),
    chain(30 + (INSULIN.B - INSULIN.A) * W, 100, INSULIN.A, W, 'var(--diagram-green)'),
    lab(332, 76, 'C peptide', { size: 10 }),
    ...[[6, 6], [19, 18]].map(([a, b]) => S.line(30 + (INSULIN.B - INSULIN.A + a) * W, 94, 30 + b * W, 50, { w: 1.5, c: 'var(--diagram-red)', dash: '3 2' })),
    S.text(10, 140, 'Mature insulin (C peptide removed)', { size: 12, w: 'bold' }),
    lab(4, 166, 'B', { w: 'bold', c: 'var(--diagram-blue)' }), chain(30, 162, INSULIN.B, W, 'var(--diagram-blue)'),
    lab(4, 206, 'A', { w: 'bold', c: 'var(--diagram-green)' }), chain(30, 202, INSULIN.A, W, 'var(--diagram-green)'),
    ...[[6, 6], [19, 18]].map(([a, b]) => S.line(30 + a * W, 196, 30 + b * W, 168, { w: 1.5, c: 'var(--diagram-red)' })),
    lab(250, 186, 'Disulphide bridges (A7–B7, A20–B19)', { size: 10, c: 'var(--diagram-red)' }),
    lab(456, 222, `A: ${INSULIN.A}, B: ${INSULIN.B} amino acids`, { size: 10, a: 'end' }),
  ].join(''),
);

// 3. RNA interference to protect tobacco from a nematode
export const RNAI = svgDoc(
  460,
  210,
  'RNA interference to protect tobacco plants from the nematode Meloidogyne incognita: nematode-specific genes introduced into the plant with an Agrobacterium vector produce both sense and antisense RNA; these pair to form double-stranded RNA, which triggers RNA interference that silences the matching messenger RNA of the nematode, so the parasite cannot survive in the transgenic roots',
  [
    box(10, 20, 135, 58, ['Nematode-specific', 'genes put into tobacco', '(Agrobacterium vector)'], 'var(--diagram-green)'),
    box(165, 20, 135, 58, ['Plant makes sense', 'and antisense RNA'], 'var(--diagram-blue)'),
    box(320, 20, 130, 58, ['They pair:', 'double-stranded RNA'], 'var(--diagram-yellow)'),
    box(320, 120, 130, 58, ['RNAi silences the', 'nematode’s matching', 'mRNA'], 'var(--diagram-red)'),
    box(165, 120, 135, 58, ['Specific protein not', 'made: nematode', 'cannot survive'], 'var(--diagram-muted)'),
    box(10, 120, 135, 58, ['Roots protected;', 'better yield'], 'var(--diagram-green)'),
    S.arrow(145, 49, 163, 49, { size: 6 }), S.arrow(300, 49, 318, 49, { size: 6 }),
    S.arrow(385, 78, 385, 118, { size: 6 }), S.arrow(320, 149, 302, 149, { size: 6 }), S.arrow(165, 149, 147, 149, { size: 6 }),
    S.path('M190 100 L270 100', { w: 3, c: 'var(--diagram-blue)' }), S.path('M190 108 L270 108', { w: 3, c: 'var(--diagram-red)' }),
    lab(276, 104, 'dsRNA', { size: 10 }),
  ].join(''),
);

export const ALL = { BT, INSULIN_SVG, RNAI };
