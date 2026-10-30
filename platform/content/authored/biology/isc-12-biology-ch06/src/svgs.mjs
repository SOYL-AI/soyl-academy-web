// SVG diagrams for ISC 12 Biology ch06 Sex Determination, Mutation and Genetic Disorders. The Punnett helper, the human
// sex-determination square and the X-linked pedigree are copied from isc-12-biology-ch05 (same author); the rest is new.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
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


// ---------------------------------------------------------------- new for ISC ch05: autosomal pedigrees with numbered individuals
const num2 = (x, y, t) => S.text(x, y, t, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
const gen = (y, t) => S.text(14, y + 4, t, { size: 12, w: 'bold' });
export const PED_AD = svgDoc(
  460,
  250,
  'A three-generation pedigree. Generation I: an affected man (I-1) and an unaffected woman (I-2). Generation II: four children — an affected son (II-1), an unaffected daughter (II-2), an unaffected son (II-3) and an affected daughter (II-4). The affected daughter II-4 marries an unaffected man (II-5); their children in generation III are an affected son (III-1) and an unaffected daughter (III-2). Every affected person has an affected parent, and both sexes are affected',
  [
    gen(40, 'I'), gen(120, 'II'), gen(210, 'III'),
    male(180, 40, { aff: true }), num2(180, 64, '1'), female(260, 40), num2(260, 64, '2'),
    S.line(190, 40, 250, 40, { w: 1.4 }), S.line(220, 40, 220, 86, { w: 1.4 }), S.line(100, 86, 340, 86, { w: 1.4 }),
    ...[[100, 'm', true, '1'], [180, 'f', false, '2'], [260, 'm', false, '3'], [340, 'f', true, '4']].map(([x, s, a, k]) => S.line(x, 86, x, 110, { w: 1.4 }) + (s === 'm' ? male(x, 120, { aff: a }) : female(x, 120, { aff: a })) + num2(x, 144, k)),
    male(410, 120), num2(410, 144, '5'), S.line(350, 120, 400, 120, { w: 1.4 }),
    S.line(375, 120, 375, 176, { w: 1.4 }), S.line(340, 176, 410, 176, { w: 1.4 }),
    S.line(340, 176, 340, 200, { w: 1.4 }), male(340, 210, { aff: true }), num2(340, 234, '1'),
    S.line(410, 176, 410, 200, { w: 1.4 }), female(410, 210), num2(410, 234, '2'),
    S.text(20, 246, 'Filled = affected; squares male, circles female', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
export const PED_AR = svgDoc(
  460,
  220,
  'A two-generation pedigree. Generation I: an unaffected man (I-1) and an unaffected woman (I-2) who are first cousins, shown by a double line. Generation II: an unaffected son (II-1), an affected daughter (II-2), an unaffected daughter (II-3) and an affected son (II-4). Affected children are born to unaffected parents, and both sexes are affected',
  [
    gen(50, 'I'), gen(150, 'II'),
    male(180, 50), num2(180, 74, '1'), female(260, 50), num2(260, 74, '2'),
    S.line(190, 47, 250, 47, { w: 1.4 }), S.line(190, 53, 250, 53, { w: 1.4 }),
    S.line(220, 53, 220, 106, { w: 1.4 }), S.line(100, 106, 340, 106, { w: 1.4 }),
    ...[[100, 'm', false, '1'], [180, 'f', true, '2'], [260, 'f', false, '3'], [340, 'm', true, '4']].map(([x, s, a, k]) => S.line(x, 106, x, 140, { w: 1.4 }) + (s === 'm' ? male(x, 150, { aff: a }) : female(x, 150, { aff: a })) + num2(x, 174, k)),
    S.text(20, 206, 'Double line = consanguineous (related) parents; filled = affected', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch06
import { xlinked } from './calc.mjs';

// Four systems of sex determination
const box = (x, y, w, h, title, lines, fill) =>
  S.rect(x, y, w, h, { rx: 6, fill, fop: 0.18, sw: 1.2 }) + S.text(x + w / 2, y + 18, title, { a: 'middle', size: 11, w: 'bold' }) + lines.map((t, i) => S.text(x + w / 2, y + 36 + i * 15, t, { a: 'middle', size: 10 })).join('');
export const SEXSYS = svgDoc(
  460,
  250,
  'Four systems of sex determination: humans (XX female, XY male; male heterogametic), birds (ZW female, ZZ male; female heterogametic), grasshopper (XX female, XO male with one X fewer), honey bee (haplodiploidy: females develop from fertilised eggs and are diploid, males develop from unfertilised eggs and are haploid)',
  [
    box(10, 10, 215, 110, 'Humans: XX–XY', ['Female 44 + XX (homogametic)', 'Male 44 + XY (heterogametic)', 'The sperm decides the sex'], 'var(--diagram-blue)'),
    box(235, 10, 215, 110, 'Birds: ZW–ZZ', ['Female ZW (heterogametic)', 'Male ZZ (homogametic)', 'The egg decides the sex'], 'var(--diagram-green)'),
    box(10, 130, 215, 110, 'Grasshopper: XX–XO', ['Female XX', 'Male XO (one X, no Y)', 'Male has one chromosome fewer'], 'var(--diagram-yellow)'),
    box(235, 130, 215, 110, 'Honey bee: haplodiploidy', ['Fertilised egg (2n) → female', 'Unfertilised egg (n) → male', 'Males make sperm by mitosis'], 'var(--diagram-red)'),
  ].join(''),
);

// Carrier mother × normal father for an X-linked recessive allele (cells and outcome computed)
const XL = xlinked('XXh', 'XY');
const cellX = (x, y, gt, kind) => S.rect(x, y, 90, 50, { fill: kind === 'aff' ? 'var(--diagram-red)' : kind === 'car' ? 'var(--diagram-yellow)' : 'var(--diagram-fill)', fop: kind === 'normal' ? 1 : 0.3, sw: 1 }) + S.text(x + 45, y + 22, gt, { a: 'middle', size: 12, w: 'bold' }) + S.text(x + 45, y + 40, kind === 'aff' ? 'affected son' : kind === 'car' ? 'carrier daughter' : gt.includes('Y') ? 'normal son' : 'normal daughter', { a: 'middle', size: 10 });
export const XCROSS = svgDoc(
  440,
  220,
  `Punnett square for an X-linked recessive trait such as haemophilia: carrier mother (X Xh) × normal father (X Y). Daughters: half normal (X X) and half carriers (X Xh); sons: half normal (X Y) and half affected (Xh Y). Probabilities: normal daughter ${XL.normalDaughter}, carrier daughter ${XL.carrierDaughter}, normal son ${XL.normalSon}, affected son ${XL.affectedSon}`,
  [
    S.text(190, 18, 'Carrier mother X Xʰ × normal father X Y', { a: 'middle', size: 12, w: 'bold' }),
    S.text(145, 44, 'Sperm X', { a: 'middle', size: 11 }), S.text(235, 44, 'Sperm Y', { a: 'middle', size: 11 }),
    S.text(92, 82, 'Egg X', { a: 'end', size: 11 }), S.text(92, 132, 'Egg Xʰ', { a: 'end', size: 11 }),
    cellX(100, 55, 'X X', 'normal'), cellX(190, 55, 'X Y', 'normal'),
    cellX(100, 105, 'X Xʰ', 'car'), cellX(190, 105, 'Xʰ Y', 'aff'),
    S.text(300, 80, `Each daughter: ${XL.carrierDaughter * 2 * 100}% carrier`, { size: 10 }),
    S.text(300, 130, `Each son: ${XL.affectedSon * 2 * 100}% affected`, { size: 10 }),
    S.text(220, 190, 'Sons get their X from the mother; fathers pass X only to daughters', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// Sickle-cell mutation at codon 6 of the beta-globin gene
const codon = (x, y, t, hi) => S.rect(x, y, 54, 26, { fill: hi ? 'var(--diagram-red)' : 'var(--diagram-fill)', fop: hi ? 0.3 : 1, sw: 1 }) + S.text(x + 27, y + 18, t, { a: 'middle', size: 12, w: 'bold' });
export const SICKLE = svgDoc(
  460,
  220,
  'Sickle-cell anaemia: a single base substitution in the sixth codon of the beta-globin gene changes the mRNA codon GAG to GUG, so glutamic acid is replaced by valine in the beta chain; the mutant haemoglobin (HbS) polymerises under low oxygen and the red blood cells become sickle-shaped',
  [
    S.text(10, 20, 'Codon 6 of the beta-globin gene', { size: 12, w: 'bold' }),
    S.text(10, 52, 'Normal (HbA)', { size: 11 }), S.text(10, 112, 'Sickle (HbS)', { size: 11 }),
    S.text(130, 40, 'DNA (template)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), S.text(230, 40, 'mRNA', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }), S.text(340, 40, 'Amino acid', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    codon(103, 46, 'CTC', false), codon(203, 46, 'GAG', false), S.text(340, 64, 'Glutamic acid', { a: 'middle', size: 11 }),
    codon(103, 96, 'CAC', true), codon(203, 96, 'GUG', true), S.text(340, 114, 'Valine', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-red)' }),
    S.arrow(160, 59, 200, 59, { size: 5 }), S.arrow(260, 59, 296, 59, { size: 5 }), S.arrow(160, 109, 200, 109, { size: 5 }), S.arrow(260, 109, 296, 109, { size: 5 }),
    S.ellipse(90, 180, 34, 20, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }), S.ellipse(90, 180, 14, 7, { fill: 'var(--diagram-fill)', sw: 0.8 }),
    S.path('M250 172 C270 150 330 150 350 172 C334 166 266 166 250 172 Z', { fill: 'var(--diagram-red)', fop: 0.4, w: 1.2 }),
    S.text(90, 212, 'Normal red cell (biconcave)', { a: 'middle', size: 10 }), S.text(300, 196, 'Sickle-shaped cell (low oxygen)', { a: 'middle', size: 10 }),
  ].join(''),
);

// Point mutations: substitution (transition, transversion) and frameshift
const seq = (x, y, s, hiAt = -1, hiColour = 'var(--diagram-red)') => Array.from(s).map((ch, i) => S.rect(x + i * 22, y, 22, 22, { fill: i === hiAt ? hiColour : 'var(--diagram-fill)', fop: i === hiAt ? 0.35 : 1, sw: 0.8 }) + S.text(x + i * 22 + 11, y + 15, ch, { a: 'middle', size: 11, w: 'bold' })).join('');
export const POINTMUT = svgDoc(
  460,
  250,
  'Gene (point) mutations on a short DNA strand, original sequence ATGCATAGC: a transition replaces a purine by another purine or a pyrimidine by another pyrimidine (A to G); a transversion replaces a purine by a pyrimidine or the reverse (A to T); a frameshift adds or deletes a base, so every codon after it is read differently',
  [
    S.text(10, 20, 'Original', { size: 11, w: 'bold' }), seq(120, 6, 'ATGCATAGC'),
    S.text(10, 70, 'Transition (A → G)', { size: 11 }), seq(120, 56, 'GTGCATAGC', 0),
    S.text(10, 120, 'Transversion (A → T)', { size: 11 }), seq(120, 106, 'TTGCATAGC', 0),
    S.text(10, 170, 'Frameshift: insertion', { size: 11 }), seq(120, 156, 'ATGACATAGC', 3, 'var(--diagram-green)'),
    S.text(10, 220, 'Frameshift: deletion', { size: 11 }), seq(120, 206, 'ATGATAGC'),
    S.text(350, 112, 'Purines: A, G', { size: 10, c: 'var(--diagram-muted)' }), S.text(350, 126, 'Pyrimidines: C, T', { size: 10, c: 'var(--diagram-muted)' }),
    S.text(350, 176, 'Reading frame', { size: 10, c: 'var(--diagram-muted)' }), S.text(350, 190, 'shifted after the', { size: 10, c: 'var(--diagram-muted)' }), S.text(350, 204, 'change', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { SEXDET, PEDIGREE, SEXSYS, XCROSS, SICKLE, POINTMUT };
