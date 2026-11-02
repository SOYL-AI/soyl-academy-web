// SVG diagrams for ch09 Biomolecules (allow-listed elements, palette colours only). Schematics, not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { velocity, bell, DNA } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const T = (x, y, s, o = {}) => S.text(x, y, s, { size: 13, a: 'middle', ...o });

// 1. Amino acids: general structure and three examples
const aa = (cx, cy, R, { big = false, rc = 'var(--diagram-blue)' } = {}) => {
  const k = big ? 1.25 : 1;
  const sz = big ? 15 : 13;
  return [
    T(cx, cy + 5, 'C', { size: sz, w: 'bold' }),
    S.line(cx, cy - 9 * k, cx, cy - 22 * k), T(cx, cy - 27 * k, R, { size: sz, c: rc }),
    S.line(cx, cy + 9 * k, cx, cy + 22 * k), T(cx, cy + 36 * k, 'H', { size: sz }),
    S.line(cx - 9 * k, cy, cx - 24 * k, cy), T(cx - 40 * k, cy + 5, 'H₂N', { size: sz }),
    S.line(cx + 9 * k, cy, cx + 24 * k, cy), T(cx + 44 * k, cy + 5, 'COOH', { size: sz }),
  ].join('');
};
export const AMINO = svgDoc(
  480,
  240,
  'Amino acids are substituted methanes. The alpha carbon carries a hydrogen atom, an amino group, a carboxyl group and a variable R group. In glycine the R group is a hydrogen atom, in alanine a methyl group (CH3) and in serine a hydroxymethyl group (CH2OH)',
  [
    lab(110, 20, 'General structure', { a: 'middle', w: 'bold' }),
    aa(110, 110, 'R', { big: true }),
    lab(110, 186, 'α-carbon with four groups:', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(110, 200, 'H, amino, carboxyl and R', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.line(222, 30, 222, 210, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    lab(350, 20, 'R group decides the amino acid', { a: 'middle', w: 'bold' }),
    aa(300, 76, 'H'), lab(420, 80, 'Glycine', { w: 'bold' }),
    aa(300, 166, 'CH₃'), lab(420, 170, 'Alanine', { w: 'bold' }),
    lab(250, 230, 'Serine: R = CH₂OH (hydroxymethyl)', { w: 'bold', size: 10 }),
  ].join(''),
);

// 2. Peptide bond formation
export const PEPTIDE = svgDoc(
  480,
  220,
  'Formation of a peptide bond: the carboxyl group of one amino acid reacts with the amino group of the next; the OH from the carboxyl group and an H from the amino group leave as a molecule of water (dehydration), and the carbon of the first amino acid becomes bonded to the nitrogen of the second, forming a dipeptide with the peptide bond –CO–NH–',
  [
    T(26, 52, 'H₂N'), S.line(42, 47, 56, 47), T(66, 52, 'CH', {}), S.line(66, 36, 66, 26), T(66, 22, 'R₁', { c: 'var(--diagram-blue)' }), S.line(78, 47, 92, 47),
    T(100, 52, 'C'), S.line(98, 36, 98, 26), S.line(103, 36, 103, 26), T(100, 22, 'O'), S.line(108, 47, 120, 47),
    S.rect(120, 34, 34, 24, { rx: 10, c: 'var(--diagram-red)', sw: 1.4, dash: '3 2' }), T(137, 52, 'OH', { c: 'var(--diagram-red)' }),
    T(176, 52, '+', { size: 16 }),
    S.rect(194, 34, 20, 24, { rx: 8, c: 'var(--diagram-red)', sw: 1.4, dash: '3 2' }), T(204, 52, 'H', { c: 'var(--diagram-red)' }), S.line(214, 47, 226, 47),
    T(234, 52, 'N'), S.line(234, 58, 234, 68), T(234, 82, 'H'), S.line(242, 47, 256, 47),
    T(266, 52, 'CH'), S.line(266, 36, 266, 26), T(266, 22, 'R₂', { c: 'var(--diagram-blue)' }), S.line(278, 47, 292, 47), T(318, 52, 'COOH'),
    S.arrow(176, 96, 176, 126, { w: 1.6 }), lab(186, 116, 'water removed (dehydration)', { size: 10, c: 'var(--diagram-red)' }),
    T(26, 172, 'H₂N'), S.line(42, 167, 56, 167), T(66, 172, 'CH'), S.line(66, 156, 66, 146), T(66, 142, 'R₁', { c: 'var(--diagram-blue)' }), S.line(78, 167, 92, 167),
    T(100, 172, 'C'), S.line(98, 156, 98, 146), S.line(103, 156, 103, 146), T(100, 142, 'O'),
    S.line(108, 167, 126, 167, { w: 3, c: 'var(--diagram-accent)' }),
    T(134, 172, 'N'), S.line(134, 178, 134, 188), T(134, 202, 'H'), S.line(142, 167, 156, 167),
    T(166, 172, 'CH'), S.line(166, 156, 166, 146), T(166, 142, 'R₂', { c: 'var(--diagram-blue)' }), S.line(178, 167, 192, 167), T(218, 172, 'COOH'),
    T(270, 172, '+', { size: 16 }), T(310, 172, 'H₂O', { c: 'var(--diagram-red)' }),
    lab(360, 150, 'Peptide bond:', { c: 'var(--diagram-accent)', w: 'bold' }), lab(360, 164, 'C of one amino acid', { size: 10 }), lab(360, 177, 'joined to N of the next', { size: 10 }), lab(100, 200, 'peptide bond', { a: 'end', size: 10, c: 'var(--diagram-accent)' }), S.lead(102, 194, 116, 170),
    lab(360, 40, 'Carboxyl group of', { size: 10 }), lab(360, 53, 'amino acid 1 meets amino', { size: 10 }), lab(360, 66, 'group of amino acid 2', { size: 10 }),
  ].join(''),
);

// 3. Lipids: fatty acid, glycerol, triglyceride, phospholipid
const zig = (x, y, n, step = 9, amp = 5) => `M${x} ${y} ${Array.from({ length: n }, (_, i) => `L${x + (i + 1) * step} ${y + (i % 2 ? 0 : amp)}`).join(' ')}`;
export const LIPIDS = svgDoc(
  480,
  250,
  'Lipids. A fatty acid has a carboxyl group attached to a hydrocarbon chain: palmitic acid has 16 carbon atoms including the carboxyl carbon. Glycerol is trihydroxy propane. In a triglyceride, three fatty acids are esterified with glycerol. In a phospholipid such as lecithin, two fatty acids and a phosphorylated organic compound are attached to glycerol, giving a polar head and two non-polar tails',
  [
    lab(10, 22, 'Fatty acid (palmitic acid)', { w: 'bold' }),
    T(28, 58, 'CH₃', { size: 12 }), S.path(zig(44, 50, 14), { w: 1.6 }), T(196, 58, 'COOH', { size: 12, c: 'var(--diagram-red)' }),
    lab(10, 84, '16 carbons, counting the carboxyl carbon; saturated (no C=C)', { size: 10, c: 'var(--diagram-muted)' }),
    lab(330, 22, 'Glycerol', { w: 'bold', a: 'middle' }),
    ...['CH₂OH', 'CHOH', 'CH₂OH'].map((s, i) => T(330, 48 + i * 22, s, { size: 12 })),
    S.line(330, 52, 330, 58), S.line(330, 74, 330, 80),
    lab(330, 120, 'trihydroxy propane', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(10, 140, 'Triglyceride (fat or oil)', { w: 'bold' }),
    S.rect(14, 150, 22, 80, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1.2 }),
    T(25, 244, 'glycerol', { size: 10, c: 'var(--diagram-muted)' }),
    ...[162, 190, 218].map((y) => S.path(zig(36, y - 2, 13), { w: 1.4 })),
    lab(160, 194, 'three fatty acid', { size: 10, c: 'var(--diagram-muted)' }), lab(160, 207, 'chains (esters)', { size: 10, c: 'var(--diagram-muted)' }),
    lab(300, 140, 'Phospholipid (lecithin)', { w: 'bold' }),
    S.circle(330, 176, 16, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }), T(330, 180, 'P', { size: 12 }),
    S.rect(346, 166, 18, 54, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1.2 }),
    S.path(zig(364, 174, 10), { w: 1.4 }), S.path(zig(364, 206, 10), { w: 1.4 }),
    lab(306, 238, 'polar head', { size: 10, c: 'var(--diagram-red)' }), lab(400, 238, 'non-polar tails', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Polysaccharide chain (glycogen-like) and a nucleotide
const hex = (cx, cy, r = 13, fill = 'var(--diagram-green)') => S.path(`M${Array.from({ length: 6 }, (_, i) => `${(cx + r * Math.cos((Math.PI / 3) * i + Math.PI / 6)).toFixed(1)} ${(cy + r * Math.sin((Math.PI / 3) * i + Math.PI / 6)).toFixed(1)}`).join(' L')} Z`, { fill, fop: 0.3, w: 1.2 });
const MAIN = [0, 1, 2, 3, 4, 5, 6].map((i) => [30 + i * 34, 120]);
const BRANCH = [[132, 86], [150, 56], [176, 34]];
export const POLY_NUC = svgDoc(
  480,
  230,
  'Left: part of a glycogen molecule, a branched chain of glucose units joined by glycosidic bonds, with the reducing end on the right and the non-reducing end on the left. Right: a nucleotide, made of a nitrogenous base joined to the 1′ carbon of a pentose sugar and a phosphate group joined to its 5′ carbon; base plus sugar alone is a nucleoside',
  [
    lab(130, 20, 'Glycogen (branched)', { a: 'middle', w: 'bold' }),
    ...MAIN.slice(0, -1).map(([x, y], i) => S.line(x + 13, y, MAIN[i + 1][0] - 13, y, { w: 2, c: 'var(--diagram-accent)' })),
    S.line(126, 108, 130, 98, { w: 2, c: 'var(--diagram-accent)' }), S.line(140, 76, 146, 68, { w: 2, c: 'var(--diagram-accent)' }), S.line(160, 48, 166, 42, { w: 2, c: 'var(--diagram-accent)' }),
    ...MAIN.map(([x, y]) => hex(x, y)), ...BRANCH.map(([x, y]) => hex(x, y)),
    lab(30, 160, 'Non-reducing', { size: 10, a: 'middle' }), lab(30, 172, 'end', { size: 10, a: 'middle' }),
    lab(234, 160, 'Reducing', { size: 10, a: 'middle' }), lab(234, 172, 'end', { size: 10, a: 'middle' }),
    lab(130, 200, 'Each hexagon: one glucose unit', { size: 10, a: 'middle', c: 'var(--diagram-green)' }),
    lab(130, 214, 'Accent links: glycosidic bonds', { size: 10, a: 'middle', c: 'var(--diagram-accent)' }),
    S.line(278, 30, 278, 210, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    lab(380, 20, 'Nucleotide', { a: 'middle', w: 'bold' }),
    S.path('M380 130 L404 112 L396 84 L364 84 L356 112 Z', { fill: 'var(--diagram-yellow)', fop: 0.4, w: 1.4 }),
    T(380, 108, 'Sugar', { size: 10 }),
    S.line(404, 112, 420, 124), S.rect(420, 116, 52, 24, { rx: 4, fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.2 }), T(446, 132, 'Base', { size: 11 }),
    S.line(356, 112, 340, 104), S.circle(326, 98, 14, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }), T(326, 102, 'P', { size: 12 }),
    lab(412, 104, '1′', { size: 10 }), lab(346, 122, '5′', { size: 10 }),
    lab(380, 170, 'Nucleoside = base + sugar', { a: 'middle', size: 10 }),
    lab(380, 186, 'Nucleotide = nucleoside + phosphate', { a: 'middle', size: 10 }),
    lab(380, 206, 'Sugar: ribose (RNA) or deoxyribose (DNA)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. Levels of protein structure
const beads = (x, y, n) => Array.from({ length: n }, (_, i) => S.circle(x + i * 11, y + (i % 2 ? 4 : -4), 5, { fill: ['var(--diagram-blue)', 'var(--diagram-green)', 'var(--diagram-yellow)', 'var(--diagram-red)'][i % 4], fop: 0.5, sw: 0.8 })).join('');
const helix = (x, y, n) => `M${x} ${y} ${Array.from({ length: n }, (_, i) => `C${x + i * 14 + 4} ${y - 18} ${x + i * 14 + 12} ${y - 18} ${x + i * 14 + 10} ${y} S${x + i * 14 + 6} ${y + 18} ${x + (i + 1) * 14} ${y}`).join(' ')}`;
export const PROTEIN_LEVELS = svgDoc(
  480,
  210,
  'Four levels of protein structure. Primary: the sequence of amino acids in a chain, from the N-terminal amino acid to the C-terminal amino acid. Secondary: parts of the chain folded into a right-handed helix. Tertiary: the long chain folded upon itself like a hollow woollen ball, giving a three-dimensional shape. Quaternary: several folded polypeptides assembled together, as in adult human haemoglobin with two alpha and two beta subunits',
  [
    lab(60, 22, 'Primary', { a: 'middle', w: 'bold' }),
    beads(14, 90, 9), lab(10, 120, 'N', { w: 'bold' }), lab(102, 120, 'C', { w: 'bold' }),
    lab(60, 150, 'Sequence of', { a: 'middle', size: 10 }), lab(60, 163, 'amino acids', { a: 'middle', size: 10 }),
    lab(180, 22, 'Secondary', { a: 'middle', w: 'bold' }),
    S.path(helix(130, 90, 7), { w: 2, c: 'var(--diagram-blue)' }),
    lab(180, 150, 'Right-handed', { a: 'middle', size: 10 }), lab(180, 163, 'helix', { a: 'middle', size: 10 }),
    lab(300, 22, 'Tertiary', { a: 'middle', w: 'bold' }),
    S.path('M262 70 C250 40 300 38 304 60 C308 82 260 80 270 104 C280 128 330 120 328 96 C326 70 350 60 344 96 C338 130 290 140 276 124', { w: 2, c: 'var(--diagram-blue)' }),
    lab(300, 150, 'Chain folded', { a: 'middle', size: 10 }), lab(300, 163, 'into a 3-D ball', { a: 'middle', size: 10 }),
    lab(420, 22, 'Quaternary', { a: 'middle', w: 'bold' }),
    S.circle(402, 70, 20, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.2 }), S.circle(442, 70, 20, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.2 }),
    S.circle(402, 110, 20, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.2 }), S.circle(442, 110, 20, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.2 }),
    T(402, 75, 'α', { size: 13 }), T(442, 75, 'β', { size: 13 }), T(402, 115, 'β', { size: 13 }), T(442, 115, 'α', { size: 13 }),
    lab(422, 150, 'Subunits together:', { a: 'middle', size: 10 }), lab(422, 163, 'haemoglobin 2α + 2β', { a: 'middle', size: 10 }),
    S.arrow(110, 192, 150, 192, { c: 'var(--diagram-muted)', w: 1, size: 6 }), S.arrow(230, 192, 270, 192, { c: 'var(--diagram-muted)', w: 1, size: 6 }), S.arrow(350, 192, 390, 192, { c: 'var(--diagram-muted)', w: 1, size: 6 }),
  ].join(''),
);

// 6. DNA double helix as an untwisted ladder
const PAIRS = [['A', 'T'], ['G', 'C'], ['T', 'A'], ['C', 'G'], ['A', 'T'], ['G', 'C']];
export const DNA_LADDER = svgDoc(
  460,
  270,
  `Part of a DNA double helix drawn as an untwisted ladder: two sugar–phosphate backbones run in opposite directions (antiparallel, 5′ to 3′ and 3′ to 5′); bases pair across the middle, adenine with thymine by two hydrogen bonds and guanine with cytosine by three. In the B form, one full turn holds ${DNA.bpPerTurn} base pairs and is ${DNA.pitchNm} nm long`,
  [
    S.rect(60, 30, 24, 210, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.2 }),
    S.rect(236, 30, 24, 210, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.2 }),
    ...PAIRS.map(([l, rr], i) => {
      const y = 52 + i * 34;
      const nH = l === 'A' || l === 'T' ? 2 : 3;
      return S.rect(84, y - 10, 58, 20, { fill: l === 'A' || l === 'G' ? 'var(--diagram-blue)' : 'var(--diagram-green)', fop: 0.35, sw: 1 }) + T(113, y + 5, l, { size: 12 }) +
        S.rect(178, y - 10, 58, 20, { fill: rr === 'A' || rr === 'G' ? 'var(--diagram-blue)' : 'var(--diagram-green)', fop: 0.35, sw: 1 }) + T(207, y + 5, rr, { size: 12 }) +
        Array.from({ length: nH }, (_, k) => S.line(144, y - (nH - 1) * 3 + k * 6, 176, y - (nH - 1) * 3 + k * 6, { w: 1, dash: '3 2', c: 'var(--diagram-red)' })).join('');
    }),
    lab(72, 22, '5′', { a: 'middle', w: 'bold' }), lab(72, 258, '3′', { a: 'middle', w: 'bold' }),
    lab(248, 22, '3′', { a: 'middle', w: 'bold' }), lab(248, 258, '5′', { a: 'middle', w: 'bold' }),
    S.arrow(40, 40, 40, 230, { c: 'var(--diagram-muted)', w: 1.2, size: 6 }), S.arrow(280, 230, 280, 40, { c: 'var(--diagram-muted)', w: 1.2, size: 6 }),
    lab(296, 40, 'Sugar–phosphate', { size: 10 }), lab(296, 53, 'backbone', { size: 10 }), S.lead(294, 50, 262, 60),
    lab(296, 100, 'A = T: two', { size: 10, c: 'var(--diagram-red)' }), lab(296, 113, 'hydrogen bonds', { size: 10, c: 'var(--diagram-red)' }),
    lab(296, 140, 'G ≡ C: three', { size: 10, c: 'var(--diagram-red)' }), lab(296, 153, 'hydrogen bonds', { size: 10, c: 'var(--diagram-red)' }),
    lab(296, 186, 'Purines (blue): A, G', { size: 10, c: 'var(--diagram-blue)' }), lab(296, 200, 'Pyrimidines (green): C, T', { size: 10, c: 'var(--diagram-green)' }),
    lab(296, 228, `One turn: ${DNA.bpPerTurn} base pairs,`, { size: 10 }), lab(296, 241, `${DNA.pitchNm} nm (B-DNA)`, { size: 10 }),
    lab(160, 264, 'Strands run in opposite directions', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 7. Steps of enzyme action (induced fit)
const enzyme = (x, y, tight = false) => S.path(tight ? `M${x} ${y} L${x} ${y + 60} L${x + 80} ${y + 60} L${x + 80} ${y} L${x + 54} ${y} L${x + 50} ${y + 18} L${x + 30} ${y + 18} L${x + 26} ${y} Z` : `M${x} ${y} L${x} ${y + 60} L${x + 80} ${y + 60} L${x + 80} ${y} L${x + 58} ${y} L${x + 52} ${y + 22} L${x + 28} ${y + 22} L${x + 22} ${y} Z`, { fill: 'var(--diagram-blue)', fop: 0.3, w: 1.5 });
const sub = (x, y, split = false) => (split ? S.path(`M${x} ${y} L${x + 10} ${y} L${x + 10} ${y + 18} L${x} ${y + 18} Z`, { fill: 'var(--diagram-red)', fop: 0.5, w: 1.2 }) + S.path(`M${x + 14} ${y} L${x + 24} ${y} L${x + 24} ${y + 18} L${x + 14} ${y + 18} Z`, { fill: 'var(--diagram-red)', fop: 0.5, w: 1.2 }) : S.path(`M${x} ${y} L${x + 24} ${y} L${x + 24} ${y + 18} L${x} ${y + 18} Z`, { fill: 'var(--diagram-red)', fop: 0.5, w: 1.2 }));
export const ENZYME_STEPS = svgDoc(
  480,
  200,
  'Steps of enzyme action: (1) the substrate binds to the active site of the enzyme; (2) binding induces the enzyme to change shape so that it fits more tightly around the substrate (induced fit), forming the enzyme–substrate complex; (3) the active site breaks chemical bonds of the substrate, forming the enzyme–product complex; (4) the enzyme releases the products and is free to bind another substrate molecule',
  [
    enzyme(14, 86), sub(42, 40), S.arrow(54, 62, 54, 84, { w: 1.2, size: 6 }),
    enzyme(130, 86, true), sub(158, 86),
    enzyme(246, 86, true), sub(273, 86, true),
    enzyme(362, 86), sub(372, 40, true), S.path('M396 40 L406 40 L406 58 L396 58 Z', { fill: 'var(--diagram-red)', fop: 0.5, w: 1.2 }),
    S.arrow(100, 116, 126, 116, { w: 1.4, size: 6 }), S.arrow(216, 116, 242, 116, { w: 1.4, size: 6 }), S.arrow(332, 116, 358, 116, { w: 1.4, size: 6 }),
    ...[['1. Substrate binds', 'active site'], ['2. Induced fit:', 'enzyme–substrate'], ['3. Bonds broken:', 'enzyme–product'], ['4. Products', 'released']].map(([a, b], i) => lab(54 + i * 116, 172, a, { a: 'middle', size: 10, w: 'bold' }) + lab(54 + i * 116, 186, b, { a: 'middle', size: 10 })),
    lab(84, 34, 'Substrate', { size: 10, c: 'var(--diagram-red)' }),
    lab(4, 20, 'Enzyme (blue) with a pocket, the active site', { size: 10, c: 'var(--diagram-blue)' }),
    lab(420, 34, 'Products', { size: 10, c: 'var(--diagram-red)' }),
  ].join(''),
);

// 8. Activation energy diagram
const curve = (peak) => `M40 150 C90 150 110 ${peak} 150 ${peak} C190 ${peak} 220 196 280 196 L330 196`;
export const ENERGY = svgDoc(
  460,
  260,
  'Energy diagram of a reaction in which the product has lower potential energy than the substrate. To become product, the substrate must pass through a high-energy transition state; the energy needed to reach it from the substrate is the activation energy. With an enzyme (dashed curve) the transition state is much lower, so the activation energy barrier is smaller and the reaction is faster; the energies of substrate and product are unchanged',
  [
    S.arrow(30, 236, 30, 20, { size: 6 }), S.arrow(26, 232, 340, 232, { size: 6 }),
    lab(36, 18, 'Potential energy', { size: 10 }), lab(336, 250, 'Progress of reaction', { size: 10, a: 'end' }),
    S.path(curve(40), { w: 2.4, c: 'var(--diagram-red)' }),
    S.path(curve(100), { w: 2.4, c: 'var(--diagram-blue)', dash: '6 4' }),
    S.line(40, 150, 140, 150, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.arrow(124, 150, 124, 44, { c: 'var(--diagram-red)', w: 1.2, size: 6 }), S.arrow(124, 44, 124, 150, { c: 'var(--diagram-red)', w: 1.2, size: 6 }),
    S.arrow(170, 150, 170, 104, { c: 'var(--diagram-blue)', w: 1.2, size: 6 }), S.arrow(170, 104, 170, 150, { c: 'var(--diagram-blue)', w: 1.2, size: 6 }),
    lab(40, 172, 'Substrate (S)', { size: 10 }), lab(286, 188, 'Product (P)', { size: 10 }),
    lab(152, 32, 'Transition state', { size: 10 }),
    lab(350, 60, 'Activation energy', { size: 10, c: 'var(--diagram-red)' }), lab(350, 73, 'without enzyme', { size: 10, c: 'var(--diagram-red)' }), S.lead(348, 66, 128, 90),
    lab(350, 120, 'Activation energy', { size: 10, c: 'var(--diagram-blue)' }), lab(350, 133, 'with enzyme (dashed)', { size: 10, c: 'var(--diagram-blue)' }), S.lead(348, 126, 174, 128),
    lab(350, 180, 'S above P: no heat', { size: 10, c: 'var(--diagram-muted)' }), lab(350, 193, 'needs to be supplied', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 9. Factors affecting enzyme activity (shapes computed)
const plotPath = (x0, y0, w, h, f, n = 40) => `M${Array.from({ length: n + 1 }, (_, i) => `${(x0 + (w * i) / n).toFixed(1)} ${(y0 - h * f(i / n)).toFixed(1)}`).join(' L')}`;
const axes = (x0, y0, w, h, xl) => S.arrow(x0, y0, x0, y0 - h - 12, { size: 5, w: 1.2 }) + S.arrow(x0, y0, x0 + w + 10, y0, { size: 5, w: 1.2 }) + lab(x0 + w / 2, y0 + 16, xl, { a: 'middle', size: 10 });
export const FACTORS = svgDoc(
  480,
  210,
  'Three graphs of enzyme activity. Against temperature, activity rises to a maximum at the optimum temperature and then falls steeply as the enzyme is denatured. Against pH, activity is highest at the optimum pH and lower on either side. Against substrate concentration, velocity rises at first and then levels off at the maximum velocity Vmax when all enzyme molecules are occupied',
  [
    axes(20, 160, 130, 120, 'Temperature'), S.path(plotPath(20, 160, 130, 120, (t) => (t < 0.62 ? 0.95 * bell(t, 0.62, 0.38) : 0.95 * bell(t, 0.62, 0.14))), { w: 2.2, c: 'var(--diagram-red)' }),
    lab(101, 30, 'optimum', { a: 'middle', size: 10 }), S.line(101, 36, 101, 46, { c: 'var(--diagram-muted)', w: 1, dash: '2 2' }),
    axes(180, 160, 130, 120, 'pH'), S.path(plotPath(180, 160, 130, 120, (t) => 0.95 * bell(t, 0.5, 0.24)), { w: 2.2, c: 'var(--diagram-green)' }),
    lab(245, 30, 'optimum pH', { a: 'middle', size: 10 }),
    axes(340, 160, 130, 120, 'Substrate concentration'), S.path(plotPath(340, 160, 130, 120, (t) => 0.95 * velocity(t * 8, 1, 1) / velocity(8, 1, 1)), { w: 2.2, c: 'var(--diagram-blue)' }),
    S.line(340, 46, 470, 46, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }), lab(466, 40, 'Vmax', { a: 'end', size: 10 }),
    lab(4, 14, 'Rate of reaction (enzyme activity) on each vertical axis', { size: 10, c: 'var(--diagram-muted)' }),
    lab(85, 198, 'heat denatures', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(405, 198, 'enzyme saturated', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

export const ALL = { AMINO, PEPTIDE, LIPIDS, POLY_NUC, PROTEIN_LEVELS, DNA_LADDER, ENZYME_STEPS, ENERGY, FACTORS };
