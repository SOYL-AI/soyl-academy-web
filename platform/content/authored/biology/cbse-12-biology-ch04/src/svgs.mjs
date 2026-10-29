// SVG diagrams for ch04 Principles of Inheritance and Variation. Punnett squares are generated from the
// independent engine in calc.mjs, so every cell and ratio shown is computed, not typed.
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { gametes, cross, phenoRatio, ratio, phenotype } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sortGt = (a, b) => (a < b ? -1 : a > b ? 1 : 0); // ASCII: dominant (upper case) alleles first
const join2 = (x, y) => Array.from(x).map((c, i) => (c <= y[i] ? c + y[i] : y[i] + c)).join('');

/** Generic Punnett square: rows = gametes of parent 1, cols = gametes of parent 2. */
function punnett({ p1, p2, cell = 46, x0 = 70, y0 = 56, fillFor, title, label, note, w, h }) {
  const rows = gametes(p1).map(([g]) => g).sort(sortGt);
  const cols = gametes(p2).map(([g]) => g).sort(sortGt);
  const parts = [S.text(x0 + (cols.length * cell) / 2, 18, title, { a: 'middle', size: 12, w: 'bold' })];
  parts.push(S.text(x0 + (cols.length * cell) / 2, 38, `Gametes of parent 2 (${p2})`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  cols.forEach((g, j) => parts.push(S.text(x0 + j * cell + cell / 2, y0 - 6, g, { a: 'middle', size: 12, w: 'bold' })));
  rows.forEach((g, i) => parts.push(S.text(x0 - 8, y0 + i * cell + cell / 2 + 4, g, { a: 'end', size: 12, w: 'bold' })));
  parts.push(S.text(12, y0 + (rows.length * cell) / 2, `${p1}`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  rows.forEach((r, i) =>
    cols.forEach((c, j) => {
      const gt = join2(r, c);
      const [fill, fop] = fillFor(gt);
      parts.push(S.rect(x0 + j * cell, y0 + i * cell, cell, cell, { fill, fop, sw: 1 }));
      parts.push(S.text(x0 + j * cell + cell / 2, y0 + i * cell + cell / 2 + 4, gt, { a: 'middle', size: cell > 40 ? 12 : 10 }));
    }),
  );
  if (note) parts.push(...note);
  return svgDoc(w, h, label, parts.join(''));
}

// 1. Monohybrid F1 × F1 (Tt × Tt)
const mono = phenoRatio('Tt', 'Tt');
const monoR = ratio(mono, ['D', 'r']);
const monoG = ratio(cross('Tt', 'Tt'), ['TT', 'Tt', 'tt']);
export const MONO = punnett({
  p1: 'Tt',
  p2: 'Tt',
  cell: 56,
  x0: 80,
  title: 'F1 × F1: Tt × Tt',
  fillFor: (gt) => (phenotype(gt) === 'D' ? ['var(--diagram-green)', 0.35] : ['var(--diagram-yellow)', 0.35]),
  label: `Punnett square for a cross between two tall pea plants, each Tt: gametes T and t from each; offspring TT, Tt, Tt and tt; phenotypic ratio tall to dwarf ${monoR.join(' to ')}, genotypic ratio TT to Tt to tt ${monoG.join(' to ')}`,
  note: [
    S.rect(220, 70, 14, 12, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1 }),
    lab(240, 80, 'Tall'),
    S.rect(220, 92, 14, 12, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }),
    lab(240, 102, 'Dwarf'),
    lab(220, 136, `Phenotypes  ${monoR.join(' : ')}`),
    lab(220, 154, `Genotypes  ${monoG.join(' : ')}`),
    lab(220, 172, '(TT : Tt : tt)'),
  ],
  w: 360,
  h: 190,
});

// 2. Dihybrid F1 × F1 (RrYy × RrYy)
const di = phenoRatio('RrYy', 'RrYy');
const diR = ratio(di, ['DD', 'Dr', 'rD', 'rr']);
const diFill = { DD: ['var(--diagram-yellow)', 0.45], Dr: ['var(--diagram-green)', 0.35], rD: ['var(--diagram-brown)', 0.25], rr: ['var(--diagram-blue)', 0.25] };
export const DI = punnett({
  p1: 'RrYy',
  p2: 'RrYy',
  cell: 44,
  x0: 80,
  title: 'F1 × F1: RrYy × RrYy',
  fillFor: (gt) => diFill[phenotype(gt)],
  label: `Punnett square of sixteen boxes for a dihybrid cross RrYy by RrYy (R round, r wrinkled, Y yellow, y green): the four gamete types RY, Ry, rY and ry from each parent combine to give round yellow, round green, wrinkled yellow and wrinkled green seeds in the ratio ${diR.join(' to ')}`,
  note: [
    ...[['DD', 'Round yellow'], ['Dr', 'Round green'], ['rD', 'Wrinkled yellow'], ['rr', 'Wrinkled green']].map(([k, t], i) => S.rect(270, 70 + i * 22, 14, 12, { fill: diFill[k][0], fop: diFill[k][1], sw: 1 }) + lab(290, 80 + i * 22, `${t}  ${diR[i]}`)),
    lab(270, 180, `Ratio ${diR.join(' : ')}`, { w: 'bold' }),
  ],
  w: 420,
  h: 240,
});

// 3. Incomplete dominance: snapdragon Rr × Rr
const snap = ratio(phenoRatio('Rr', 'Rr', [0]), ['AA', 'Aa', 'aa']);
const snapFill = { AA: ['var(--diagram-red)', 0.6], Aa: ['var(--diagram-red)', 0.22], aa: ['var(--diagram-fill)', 1] };
export const SNAP = punnett({
  p1: 'Rr',
  p2: 'Rr',
  cell: 56,
  x0: 80,
  title: 'Snapdragon F1 × F1: Rr × Rr',
  fillFor: (gt) => snapFill[phenotype(gt, [0])],
  label: `Punnett square for two pink-flowered snapdragon plants, Rr by Rr, showing incomplete dominance: RR red, Rr pink, rr white, in the ratio ${snap.join(' to ')}; here the phenotypic and genotypic ratios are the same`,
  note: [
    ...[['AA', 'Red (RR)'], ['Aa', 'Pink (Rr)'], ['aa', 'White (rr)']].map(([k, t], i) => S.rect(220, 70 + i * 22, 14, 12, { fill: snapFill[k][0], fop: snapFill[k][1], sw: 1 }) + lab(240, 80 + i * 22, t)),
    lab(220, 150, `Ratio ${snap.join(' : ')}`, { w: 'bold' }),
    lab(220, 168, '(phenotype = genotype)'),
  ],
  w: 360,
  h: 190,
});

// 4. Sex determination in humans (XX × XY)
export const SEXDET = svgDoc(
  380,
  200,
  'Sex determination in humans: the mother (XX) makes eggs that all carry X; the father (XY) makes two kinds of sperm, X and Y, in equal numbers; X sperm with an egg gives a girl (XX) and Y sperm with an egg gives a boy (XY), so each child has an even chance of either sex',
  [
    S.text(190, 18, 'Mother 44 + XX  ×  Father 44 + XY', { a: 'middle', size: 12, w: 'bold' }),
    S.text(150, 46, 'Sperm: X', { a: 'middle', size: 11 }),
    S.text(250, 46, 'Sperm: Y', { a: 'middle', size: 11 }),
    S.text(70, 84, 'Egg: X', { a: 'end', size: 11 }),
    S.text(70, 140, 'Egg: X', { a: 'end', size: 11 }),
    ...[0, 1].flatMap((i) => [0, 1].map((j) => {
      const girl = j === 0;
      return S.rect(100 + j * 100, 56 + i * 56, 100, 56, { fill: girl ? 'var(--diagram-red)' : 'var(--diagram-blue)', fop: 0.2, sw: 1 }) + S.text(150 + j * 100, 82 + i * 56, girl ? '44 + XX' : '44 + XY', { a: 'middle', size: 12 }) + S.text(150 + j * 100, 98 + i * 56, girl ? 'girl' : 'boy', { a: 'middle', size: 11 });
    })),
    S.text(190, 190, 'Girls : boys = 1 : 1 — the sperm decides', { a: 'middle', size: 11, w: 'bold' }),
  ].join(''),
);

// 5. Linkage and crossing over
const chrom = (x, y, w, fill) => S.rect(x, y, w, 16, { rx: 8, fill, fop: 0.3, sw: 1.2 });
export const LINKAGE = svgDoc(
  440,
  220,
  'Linkage and crossing over: two homologous chromosomes carry genes A, B and C; A and B lie close together and are rarely separated, while C lies far from A, so a crossover between them happens often and gives recombinant chromosomes',
  [
    S.text(110, 18, 'Before crossing over', { a: 'middle', size: 12, w: 'bold' }),
    chrom(20, 40, 180, 'var(--diagram-blue)'),
    chrom(20, 90, 180, 'var(--diagram-red)'),
    ...[[40, 'A', 'a'], [62, 'B', 'b'], [170, 'C', 'c']].map(([x, u, l]) => S.line(x, 40, x, 56, { w: 2 }) + S.line(x, 90, x, 106, { w: 2 }) + S.text(x, 36, u, { a: 'middle', size: 12, w: 'bold' }) + S.text(x, 122, l, { a: 'middle', size: 12, w: 'bold' })),
    S.path('M110 56 C120 72 130 72 140 90 M110 90 C120 74 130 74 140 56', { w: 1.5, c: 'var(--diagram-accent)' }),
    lab(20, 146, 'Crossover between B and C', { c: 'var(--diagram-accent)' }),
    S.text(330, 18, 'After: recombinants', { a: 'middle', size: 12, w: 'bold' }),
    S.rect(240, 40, 70, 16, { rx: 8, fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.2 }),
    S.rect(310, 40, 110, 16, { rx: 8, fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }),
    S.rect(240, 90, 70, 16, { rx: 8, fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }),
    S.rect(310, 90, 110, 16, { rx: 8, fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.2 }),
    ...[[260, 'A', 'a'], [282, 'B', 'b'], [390, 'c', 'C']].map(([x, u, l]) => S.line(x, 40, x, 56, { w: 2 }) + S.line(x, 90, x, 106, { w: 2 }) + S.text(x, 36, u, { a: 'middle', size: 12, w: 'bold' }) + S.text(x, 122, l, { a: 'middle', size: 12, w: 'bold' })),
    lab(240, 150, 'A and B stay together (tightly linked)'),
    lab(240, 168, 'B and C are recombined (loosely linked)'),
    lab(20, 196, 'The farther apart two genes are, the more often a crossover falls between them,'),
    lab(20, 212, 'so recombination frequency can be used to map the distances between genes.'),
  ].join(''),
);

// 6. Pedigree symbols and an X-linked recessive pedigree
const male = (x, y, o = {}) => S.rect(x - 10, y - 10, 20, 20, { fill: o.aff ? 'currentColor' : 'var(--diagram-fill)', sw: 1.4 });
const female = (x, y, o = {}) => S.circle(x, y, 10, { fill: o.aff ? 'currentColor' : 'var(--diagram-fill)', sw: 1.4 }) + (o.car ? S.circle(x, y, 3.5, { fill: 'currentColor', sw: 0 }) : '');
export const PEDIGREE = svgDoc(
  460,
  250,
  'Pedigree symbols and an example: squares are males, circles are females, filled shapes are affected individuals, a circle with a central dot is a carrier female, a horizontal line joins parents and a vertical line leads to their children. In the example, an unaffected father and a carrier mother have an affected son, an unaffected son, a carrier daughter and an unaffected daughter; the affected son and an unaffected woman have a carrier daughter and an unaffected son, showing an X-linked recessive trait passed from carrier mothers to sons',
  [
    S.text(70, 16, 'Symbols', { a: 'middle', size: 12, w: 'bold' }),
    male(20, 40), lab(36, 44, 'Male'),
    female(20, 70), lab(36, 74, 'Female'),
    male(20, 100, { aff: true }), lab(36, 104, 'Affected male'),
    female(20, 130, { aff: true }), lab(36, 134, 'Affected female'),
    female(20, 160, { car: true }), lab(36, 164, 'Carrier female'),
    S.line(10, 190, 50, 190, { w: 1.4 }), lab(56, 194, 'Mating'),
    S.line(10, 214, 50, 214, { w: 1.4 }), S.line(10, 220, 50, 220, { w: 1.4 }), lab(56, 220, 'Consanguineous mating'),
    S.text(320, 16, 'Example: X-linked recessive trait', { a: 'middle', size: 12, w: 'bold' }),
    lab(440, 44, 'I'), lab(440, 114, 'II'), lab(440, 204, 'III'),
    male(250, 40), female(310, 40, { car: true }), S.line(260, 40, 300, 40, { w: 1.4 }), S.line(280, 40, 280, 76, { w: 1.4 }),
    S.line(220, 76, 400, 76, { w: 1.4 }),
    ...[[220, 'm', true], [280, 'm', false], [340, 'f', 'car'], [400, 'f', false]].map(([x, s, a]) => S.line(x, 76, x, 100, { w: 1.4 }) + (s === 'm' ? male(x, 110, { aff: a === true }) : female(x, 110, { car: a === 'car' }))),
    female(160, 110), S.line(170, 110, 210, 110, { w: 1.4 }), S.line(190, 110, 190, 160, { w: 1.4 }),
    S.line(160, 160, 230, 160, { w: 1.4 }),
    S.line(160, 160, 160, 190, { w: 1.4 }), female(160, 200, { car: true }),
    S.line(230, 160, 230, 190, { w: 1.4 }), male(230, 200),
    lab(120, 234, 'The affected son (II) got the allele from his carrier mother;', { size: 10 }),
    lab(120, 247, 'all his daughters are carriers and none of his sons is affected.', { size: 10 }),
  ].join(''),
);

export const ALL = { MONO, DI, SNAP, SEXDET, LINKAGE, PEDIGREE };
