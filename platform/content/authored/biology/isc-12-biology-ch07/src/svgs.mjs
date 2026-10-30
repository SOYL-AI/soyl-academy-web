// SVG diagrams for ISC 12 Biology ch07 (molecular basis of inheritance), copied from cbse-12-biology-ch05/src/svgs.mjs (same author);
// base pairing, band positions and gel lanes are computed from calc.mjs. Drawings added for ISC are at the end.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { complement, meselson } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BASE_FILL = { A: 'var(--diagram-green)', T: 'var(--diagram-red)', G: 'var(--diagram-blue)', C: 'var(--diagram-yellow)' };

// 1. Double-stranded DNA as an untwisted ladder (computed complementary strand)
const TOP = 'ATGCGTAC';
const BOT = complement(TOP);
export const LADDER = svgDoc(
  460,
  230,
  `A short stretch of double-stranded DNA drawn as an untwisted ladder: the upper strand ${TOP.split('').join(' ')} runs 5 prime to 3 prime from left to right; the lower strand ${BOT.split('').join(' ')} runs 3 prime to 5 prime; A pairs with T by two hydrogen bonds and G pairs with C by three; sugar–phosphate backbones form the rails`,
  [
    S.line(60, 50, 420, 50, { w: 4, c: 'var(--diagram-muted)' }),
    S.line(60, 170, 420, 170, { w: 4, c: 'var(--diagram-muted)' }),
    S.text(40, 54, "5′", { a: 'end', size: 12, w: 'bold' }), S.text(440, 54, "3′", { size: 12, w: 'bold' }),
    S.text(40, 174, "3′", { a: 'end', size: 12, w: 'bold' }), S.text(440, 174, "5′", { size: 12, w: 'bold' }),
    ...Array.from(TOP).map((b, i) => {
      const x = 80 + i * 45;
      const c = BOT[i];
      const bonds = b === 'G' || b === 'C' ? 3 : 2;
      return S.rect(x - 14, 54, 28, 46, { fill: BASE_FILL[b], fop: 0.35, sw: 1 }) + S.text(x, 82, b, { a: 'middle', size: 13, w: 'bold' })
        + S.rect(x - 14, 120, 28, 46, { fill: BASE_FILL[c], fop: 0.35, sw: 1 }) + S.text(x, 148, c, { a: 'middle', size: 13, w: 'bold' })
        + Array.from({ length: bonds }, (_, k) => S.line(x - 8 + k * 8, 102, x - 8 + k * 8, 118, { w: 1.2, dash: '2 2' })).join('');
    }),
    lab(60, 26, 'Sugar–phosphate backbone'),
    S.lead(150, 30, 170, 48),
    lab(60, 200, 'Purines (A, G) always pair with pyrimidines (T, C): A = T has 2 hydrogen bonds,'),
    lab(60, 216, 'G ≡ C has 3; the strands are antiparallel. Spacing 0.34 nm per base pair.'),
  ].join(''),
);

// 2. Nucleosome and beads-on-string
export const NUCLEOSOME = svgDoc(
  460,
  200,
  'A nucleosome: about 200 base pairs of DNA wrapped around a core of eight histone molecules (the histone octamer), with linker DNA and histone H1 between nucleosomes; repeated nucleosomes look like beads on a string',
  [
    ...[80, 210, 340].map((x) => S.ellipse(x, 90, 38, 30, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.2 }) + S.path(`M${x - 44} 76 C${x - 20} 50 ${x + 20} 50 ${x + 44} 76 M${x - 44} 104 C${x - 20} 130 ${x + 20} 130 ${x + 44} 104 M${x - 44} 76 C${x - 52} 88 ${x - 52} 92 ${x - 44} 104`, { w: 2.5, c: 'var(--diagram-blue)' })),
    S.path('M10 90 L36 90 M124 104 C150 110 160 76 166 76 M254 104 C280 110 290 76 296 76 M384 104 L450 104', { w: 2.5, c: 'var(--diagram-blue)' }),
    S.circle(145, 98, 6, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }),
    S.circle(275, 98, 6, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }),
    lab(40, 160, 'Histone octamer (core of 8 histones)'),
    S.lead(80, 150, 80, 112),
    lab(170, 30, 'DNA wrapped around the core', { c: 'var(--diagram-blue)' }),
    S.lead(220, 34, 212, 58),
    lab(250, 160, 'H1 histone on linker DNA', { c: 'var(--diagram-red)' }),
    S.lead(280, 150, 276, 106),
    lab(40, 190, 'One nucleosome ≈ 200 bp of DNA; nucleosomes repeat like beads on a string.', { size: 10 }),
  ].join(''),
);

// 3. Meselson–Stahl bands (computed)
const GENS = [0, 1, 2];
const BANDY = { heavy: 150, hybrid: 120, light: 90 };
export const MESELSON = svgDoc(
  460,
  220,
  `Meselson and Stahl's results in caesium chloride density gradients: at generation 0 (grown in heavy nitrogen) one heavy band; after one generation in normal nitrogen one hybrid band; after two generations a hybrid band and a light band of equal size (${meselson(2).hybrid * 100} percent each)`,
  [
    ...GENS.map((g, i) => {
      const x = 60 + i * 105;
      const f = meselson(g);
      const bands = ['heavy', 'hybrid', 'light'].filter((k) => f[k] > 0).map((k) => S.rect(x - 22, BANDY[k] - 3, 44, 4 + 8 * f[k], { fill: 'currentColor', sw: 0 }));
      return S.rect(x - 26, 40, 52, 140, { rx: 10, fill: 'var(--diagram-fill)', sw: 1.5 }) + bands.join('') + S.text(x, 30, `Generation ${g}`, { a: 'middle', size: 11, w: 'bold' }) + S.text(x, 200, g === 0 ? 'in ¹⁵N' : `${g} in ¹⁴N`, { a: 'middle', size: 10 });
    }),
    lab(332, 94, 'Light (¹⁴N/¹⁴N)'),
    lab(332, 124, 'Hybrid (¹⁵N/¹⁴N)'),
    lab(332, 154, 'Heavy (¹⁵N/¹⁵N)'),
    ...[90, 120, 150].map((y) => S.line(296, y, 328, y, { w: 0.6, c: 'var(--diagram-muted)', dash: '3 3' })),
  ].join(''),
);

// 4. Replication fork
export const FORK = svgDoc(
  460,
  230,
  'A replication fork: the parent double helix unwinds; on the leading strand DNA polymerase adds nucleotides continuously towards the fork in the 5 prime to 3 prime direction; on the lagging strand short Okazaki fragments are made away from the fork and later joined by DNA ligase',
  [
    S.path('M20 110 L150 110', { w: 6, c: 'var(--diagram-muted)' }),
    S.path('M150 106 C190 90 240 60 440 50', { w: 2.5, c: 'var(--diagram-blue)' }),
    S.path('M150 114 C190 130 240 160 440 170', { w: 2.5, c: 'var(--diagram-red)' }),
    S.path('M440 64 L210 74', { w: 2.5, c: 'var(--diagram-green)' }),
    S.head(204, 74.5, Math.PI, { c: 'var(--diagram-green)' }),
    ...[[360, 152, 420, 156], [280, 145, 340, 150], [212, 136, 262, 143]].map(([x1, y1, x2, y2]) => S.line(x1, y1, x2, y2, { w: 2.5, c: 'var(--diagram-accent)' }) + S.head(x2, y2, Math.atan2(y2 - y1, x2 - x1) + Math.PI, { c: 'var(--diagram-accent)', size: 6 })),
    ...[[350, 151], [272, 144]].map(([x, y]) => S.circle(x, y, 4, { fill: 'var(--diagram-brown)', sw: 0 })),
    lab(20, 96, 'Parent DNA'),
    S.text(150, 92, 'Fork', { a: 'middle', size: 11, w: 'bold' }),
    lab(250, 30, 'Leading strand: continuous', { c: 'var(--diagram-green)' }),
    lab(240, 200, 'Lagging strand: Okazaki fragments', { c: 'var(--diagram-accent)' }),
    lab(40, 180, 'DNA ligase joins fragments', { c: 'var(--diagram-brown)' }),
    S.lead(150, 176, 268, 146),
    lab(20, 220, 'New strands always grow 5′ → 3′ (arrowheads).', { size: 10 }),
  ].join(''),
);

// 5. Transcription unit
export const TRUNIT = svgDoc(
  460,
  180,
  'A transcription unit: a promoter upstream, the structural gene, and a terminator downstream; the template strand runs 3 prime to 5 prime and the coding strand 5 prime to 3 prime; RNA is made 5 prime to 3 prime with the same sequence as the coding strand except that U replaces T',
  [
    S.line(40, 60, 420, 60, { w: 3 }),
    S.line(40, 90, 420, 90, { w: 3, c: 'var(--diagram-blue)' }),
    S.rect(60, 50, 70, 50, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }),
    S.rect(130, 50, 200, 50, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1 }),
    S.rect(330, 50, 70, 50, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1 }),
    S.text(95, 44, 'Promoter', { a: 'middle', size: 11, w: 'bold' }),
    S.text(230, 44, 'Structural gene', { a: 'middle', size: 11, w: 'bold' }),
    S.text(365, 44, 'Terminator', { a: 'middle', size: 11, w: 'bold' }),
    S.text(30, 64, "5′", { a: 'end', size: 11 }), S.text(430, 64, "3′", { size: 11 }),
    S.text(30, 94, "3′", { a: 'end', size: 11, c: 'var(--diagram-blue)' }), S.text(430, 94, "5′", { size: 11, c: 'var(--diagram-blue)' }),
    lab(40, 20, 'Coding strand (5′ → 3′)'),
    lab(40, 116, 'Template strand (3′ → 5′)', { c: 'var(--diagram-blue)' }),
    S.arrow(140, 140, 320, 140, { w: 2.5, c: 'var(--diagram-accent)' }),
    lab(140, 160, 'RNA made 5′ → 3′, copying the template', { c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 6. lac operon off and on
const genes = (y) => [['i', 20, 50, 'var(--diagram-muted)'], ['p', 100, 30, 'var(--diagram-yellow)'], ['o', 130, 30, 'var(--diagram-red)'], ['z', 160, 80, 'var(--diagram-green)'], ['y', 240, 80, 'var(--diagram-green)'], ['a', 320, 80, 'var(--diagram-green)']]
  .map(([g, x, w, c]) => S.rect(x, y, w, 24, { fill: c, fop: 0.3, sw: 1 }) + S.text(x + w / 2, y + 16, g, { a: 'middle', size: 12, w: 'bold', it: true })).join('') + S.line(10, y + 12, 410, y + 12, { w: 1 });
export const LAC = svgDoc(
  440,
  250,
  'The lac operon. Top, no lactose: the regulatory gene i makes a repressor that binds the operator, so RNA polymerase cannot transcribe the structural genes z, y and a. Bottom, lactose present: the inducer binds the repressor, which can no longer bind the operator, so the genes are transcribed and beta-galactosidase, permease and transacetylase are made',
  [
    S.text(10, 18, 'No lactose: operon switched off', { size: 12, w: 'bold' }),
    genes(40),
    S.path('M128 34 C132 22 152 22 156 34 Z', { fill: 'var(--diagram-red)', fop: 0.7, w: 1 }),
    lab(170, 30, 'Repressor bound to operator: no transcription', { size: 10 }),
    S.text(10, 112, 'Lactose present: operon switched on', { size: 12, w: 'bold' }),
    genes(134),
    S.path('M60 190 C64 178 84 178 88 190 Z', { fill: 'var(--diagram-red)', fop: 0.7, w: 1 }),
    S.circle(74, 182, 4, { fill: 'var(--diagram-blue)', sw: 0 }),
    lab(96, 194, 'Inducer bound: repressor inactive', { size: 10 }),
    S.ellipse(118, 128, 16, 9, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }),
    lab(96, 122, 'RNA polymerase', { a: 'end', size: 10 }),
    S.arrow(160, 166, 400, 166, { w: 2, c: 'var(--diagram-accent)' }),
    lab(170, 182, 'z, y and a transcribed: enzymes made', { size: 10, c: 'var(--diagram-accent)' }),
    lab(10, 236, 'i: regulatory gene; p: promoter; o: operator; z, y, a: structural genes.', { size: 10 }),
  ].join(''),
);

// 7. DNA fingerprint gel (computed: child's bands come half from each parent)
const MOTHER = [40, 75, 120, 160];
const FATHER = [55, 95, 130, 170];
const OTHER = [48, 88, 140, 178];
const CHILD = [MOTHER[0], FATHER[1], MOTHER[2], FATHER[3]];
export const LANES = { MOTHER, FATHER, OTHER, CHILD };
export const GEL = svgDoc(
  420,
  240,
  'A DNA fingerprint gel with four lanes: mother, child, man P and man Q. Every band in the child matches a band in either the mother or man P, while the child’s non-maternal bands are absent from man Q, so man P is the biological father',
  [
    ...[['Mother', MOTHER], ['Child', CHILD], ['Man P', FATHER], ['Man Q', OTHER]].map(([name, bands], i) => {
      const x = 70 + i * 90;
      return S.rect(x - 28, 30, 56, 170, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, 22, name, { a: 'middle', size: 11, w: 'bold' }) + bands.map((y) => S.rect(x - 22, 30 + y * 0.95, 44, 6, { fill: 'currentColor', sw: 0 })).join('');
    }),
    S.text(210, 220, 'Bands = VNTR fragments of different sizes, revealed by a labelled probe', { a: 'middle', size: 10 }),
    S.text(210, 234, 'Larger fragments near the top (start); smaller ones travel further', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch07
const mouse = (x, y, dead) =>
  S.ellipse(x, y, 26, 14, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.circle(x + 26, y - 6, 9, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.path(`M${x - 26} ${y} C${x - 40} ${y - 4} ${x - 44} ${y + 8} ${x - 54} ${y + 4}`, { w: 1.2 }) +
  (dead ? S.path(`M${x + 22} ${y - 10} l8 8 M${x + 30} ${y - 10} l-8 8`, { w: 1.4, c: 'var(--diagram-red)' }) : S.circle(x + 29, y - 8, 1.6, { fill: 'currentColor', sw: 0 }));
const panel = (x, title, sub, dead, result) =>
  S.rect(x, 30, 105, 170, { rx: 6, fill: dead ? 'var(--diagram-red)' : 'var(--diagram-green)', fop: 0.1, sw: 1 }) +
  S.text(x + 52, 50, title, { a: 'middle', size: 10, w: 'bold' }) + S.text(x + 52, 64, sub, { a: 'middle', size: 10 }) +
  mouse(x + 56, 120, dead) + S.text(x + 52, 170, dead ? 'Mouse dies' : 'Mouse lives', { a: 'middle', size: 10, w: 'bold', c: dead ? 'var(--diagram-red)' : 'var(--diagram-green)' }) +
  S.text(x + 52, 188, result, { a: 'middle', size: 10 });
export const GRIFFITH = svgDoc(
  460,
  230,
  'Griffith’s experiment with Streptococcus pneumoniae in mice: live smooth (S, capsulated) bacteria kill the mouse; live rough (R) bacteria do not; heat-killed S bacteria do not; but heat-killed S mixed with live R kill the mouse, and live S bacteria are recovered from it, showing that R bacteria were transformed by some material from the dead S bacteria',
  [
    panel(5, 'Live S', '(capsule)', true, 'virulent'),
    panel(120, 'Live R', '(no capsule)', false, 'non-virulent'),
    panel(235, 'Heat-killed S', '', false, 'S killed'),
    panel(350, 'Heat-killed S', '+ live R', true, 'live S recovered'),
    S.text(230, 222, 'R cells were transformed by the “transforming principle” from dead S cells', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

const phage = (x, y, c) => S.path(`M${x} ${y - 14} l10 6 l0 12 l-10 6 l-10 -6 l0 -12 Z`, { fill: c, fop: 0.5, w: 1 }) + S.line(x, y + 4, x, y + 18, { w: 1.5 }) + S.path(`M${x} ${y + 18} l-8 8 M${x} ${y + 18} l8 8`, { w: 1 });
export const HERSHEY = svgDoc(
  460,
  250,
  'Hershey and Chase experiment: bacteriophages with radioactive phosphorus (32P) in their DNA infect bacteria, and after blending and centrifuging the radioactivity is found in the bacterial pellet; phages with radioactive sulphur (35S) in their protein coats infect bacteria, and the radioactivity stays in the supernatant with the empty coats. So DNA, not protein, enters the bacteria and is the genetic material',
  [
    S.text(115, 18, 'Phage DNA labelled with ³²P', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-red)' }),
    S.text(345, 18, 'Phage protein labelled with ³⁵S', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-blue)' }),
    phage(70, 50, 'var(--diagram-red)'), phage(300, 50, 'var(--diagram-blue)'),
    S.ellipse(115, 100, 56, 16, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1 }), S.text(115, 104, 'Bacterium: radioactive', { a: 'middle', size: 10 }),
    S.ellipse(345, 100, 56, 16, { fill: 'var(--diagram-fill)', sw: 1 }), S.text(345, 104, 'Bacterium: not radioactive', { a: 'middle', size: 10 }),
    S.text(230, 140, 'Infection → blending → centrifugation', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.rect(90, 150, 50, 80, { rx: 6, fill: 'var(--diagram-fill)', sw: 1.2 }), S.rect(92, 212, 46, 16, { fill: 'var(--diagram-red)', fop: 0.6, sw: 0 }),
    S.rect(320, 150, 50, 80, { rx: 6, fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }), S.rect(322, 212, 46, 16, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 0 }),
    S.text(150, 222, 'Radioactive pellet', { size: 10, c: 'var(--diagram-red)' }),
    S.text(150, 170, 'Pellet = bacteria', { size: 10 }),
    S.text(250, 170, 'Radioactive', { size: 10, c: 'var(--diagram-blue)' }), S.text(250, 184, 'supernatant', { size: 10, c: 'var(--diagram-blue)' }),
    S.text(378, 214, 'Pellet not', { size: 10 }), S.text(378, 228, 'radioactive', { size: 10 }),
  ].join(''),
);

export const ALL = { LADDER, NUCLEOSOME, MESELSON, FORK, GRIFFITH, HERSHEY };
