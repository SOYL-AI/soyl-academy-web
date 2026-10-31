// SVG diagrams for ISC 12 Biology ch15. BT, INSULIN_SVG and RNAI are copied from cbse-12-biology-ch10/src/svgs.mjs (same
// author); MICROPROP (plantlet counts computed) and SOMATIC (protoplast fusion) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { INSULIN, plantlets } from './calc.mjs';

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


// ---------------------------------------------------------------- new for ISC ch15
// 4. Micropropagation: shoots multiply at each subculture (computed)
export const RATE = 5;
export const ROUNDS = 4;
const counts = Array.from({ length: ROUNDS + 1 }, (_, k) => plantlets(1, RATE, k));
export const MICROPROP = svgDoc(
  460,
  240,
  `Micropropagation: an explant from a healthy plant is grown on a sterile nutrient medium with plant hormones; it forms shoots, and each shoot is subcultured to give ${RATE} new shoots. After ${ROUNDS} rounds, one explant gives ${counts[ROUNDS]} genetically identical plantlets (somaclones), which are rooted and hardened before planting out`,
  [
    S.text(10, 18, 'Explant → shoots → subculture → rooting → hardening', { size: 11, w: 'bold' }),
    S.line(60, 200, 440, 200, { w: 1 }), S.line(60, 200, 60, 40, { w: 1 }),
    ...counts.map((n, k) => {
      const x = 80 + k * 72, h = Math.max(2, Math.log10(n + 1) * 52);
      return S.rect(x, 200 - h, 44, h, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1 }) + S.text(x + 22, 194 - h, String(n), { a: 'middle', size: 10, w: 'bold' }) + S.text(x + 22, 214, k === 0 ? 'Explant' : `Round ${k}`, { a: 'middle', size: 10 });
    }),
    S.text(250, 234, `Each shoot gives ${RATE} new shoots per subculture (bar height on a log scale)`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.text(66, 36, 'Plantlets', { size: 10 }),
  ].join(''),
);

// 5. Somatic hybridisation: protoplast fusion
const cellBox = (x, y, label, c) => S.rect(x, y, 70, 50, { rx: 10, fill: c, fop: 0.2, sw: 1.5 }) + S.circle(x + 35, y + 25, 9, { fill: c, fop: 0.5, sw: 1 }) + S.text(x + 35, y + 66, label, { a: 'middle', size: 10 });
const proto = (x, y, c) => S.circle(x, y, 22, { fill: c, fop: 0.2, sw: 1.5 }) + S.circle(x, y, 8, { fill: c, fop: 0.5, sw: 1 });
export const SOMATIC = svgDoc(
  460,
  250,
  'Somatic hybridisation: cells of two different plants, such as tomato and potato, have their cell walls digested by cellulase and pectinase to give naked protoplasts; the protoplasts are fused, often with polyethylene glycol, and the hybrid protoplast is grown into a somatic hybrid plant such as the pomato',
  [
    cellBox(20, 30, 'Tomato cell', 'var(--diagram-red)'),
    cellBox(20, 140, 'Potato cell', 'var(--diagram-brown)'),
    S.arrow(95, 55, 145, 75, { w: 1.5 }), S.arrow(95, 165, 145, 145, { w: 1.5 }),
    S.text(120, 112, 'Cellulase +', { a: 'middle', size: 10 }), S.text(120, 124, 'pectinase', { a: 'middle', size: 10 }),
    proto(175, 75, 'var(--diagram-red)'), proto(175, 145, 'var(--diagram-brown)'),
    S.text(175, 40, 'Protoplasts', { a: 'middle', size: 10, w: 'bold' }),
    S.arrow(200, 90, 250, 108, { w: 1.5 }), S.arrow(200, 130, 250, 112, { w: 1.5 }),
    S.text(258, 168, 'Fusion (PEG)', { a: 'middle', size: 10 }),
    S.ellipse(290, 110, 34, 26, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.5 }),
    S.circle(282, 110, 8, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }), S.circle(298, 110, 8, { fill: 'var(--diagram-brown)', fop: 0.5, sw: 1 }),
    S.text(290, 150, 'Hybrid protoplast', { a: 'middle', size: 10 }),
    S.arrow(326, 110, 366, 110, { w: 1.5 }),
    S.path('M400 190 L400 110 M400 140 C385 128 378 120 376 110 M400 125 C415 115 422 108 424 98', { w: 2, c: 'var(--diagram-green)' }),
    S.circle(376, 106, 6, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }),
    S.ellipse(400, 200, 16, 9, { fill: 'var(--diagram-brown)', fop: 0.5, sw: 1 }),
    S.text(400, 228, 'Somatic hybrid', { a: 'middle', size: 10, w: 'bold' }), S.text(400, 242, '(pomato)', { a: 'middle', size: 10 }),
  ].join(''),
);

export const ALL = { BT, INSULIN_SVG, RNAI, MICROPROP, SOMATIC };
