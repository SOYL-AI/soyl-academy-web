// SVG diagrams for ch01 The Living World (allow-listed elements, palette colours only).
// The hierarchy, domain tree, lineage tree and name anatomy are drawn from the data in calc.mjs.
import { svgDoc, S } from './lib.mjs';
import { RANKS, LIN, at, rankName, sharedRank } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

// 1. The taxonomic hierarchy as a funnel, with the human example
const HX = 200; // centre of the funnel
const rowTop = (i) => 24 + i * 36;
const half = (i) => 150 - i * 17;
const rowPath = (i) => `M${HX - half(i)} ${rowTop(i)} L${HX + half(i)} ${rowTop(i)} L${HX + half(i + 1)} ${rowTop(i) + 34} L${HX - half(i + 1)} ${rowTop(i) + 34} Z`;
const TOP_DOWN = [...RANKS].reverse(); // Kingdom first
const SHADE = ['var(--diagram-green)', 'var(--diagram-green)', 'var(--diagram-blue)', 'var(--diagram-blue)', 'var(--diagram-accent)', 'var(--diagram-accent)', 'var(--diagram-red)'];
const hierRows = (name, shown) =>
  TOP_DOWN.map((rk, i) => {
    const text = shown(rk, i);
    return [
      S.path(rowPath(i), { fill: SHADE[i], fop: 0.16, c: SHADE[i], w: 1.4 }),
      lab(HX, rowTop(i) + 21, text.left, { a: 'middle', w: 'bold', size: 12 }),
      S.lead(HX + (half(i) + half(i + 1)) / 2 + 6, rowTop(i) + 17, 372, rowTop(i) + 17),
      lab(378, rowTop(i) + 21, text.right, { it: text.italic, size: 12 }),
    ].join('');
  }).join('');
const HUMAN = 'Homo sapiens';
export const HIER = svgDoc(
  560,
  330,
  `The taxonomic hierarchy drawn as a funnel with seven categories from kingdom at the top to species at the bottom, with the classification of the human as the example: kingdom Animalia, phylum Chordata, class Mammalia, order Primata, family Hominidae, genus Homo, species sapiens. Going up, each category includes more organisms that share fewer characters; going down, each includes fewer organisms that share more characters`,
  [
    hierRows(HUMAN, (rk) => ({
      left: rankName(rk, 'Animalia'),
      right: rk === 'Species' ? 'sapiens' : at(HUMAN, rk),
      italic: rk === 'Species' || rk === 'Genus',
    })),
    S.arrow(30, 30, 30, 262, { c: 'var(--diagram-muted)', w: 1.5, size: 7 }),
    lab(28, 288, 'Going down: fewer organisms,', { size: 10, c: 'var(--diagram-muted)' }),
    lab(28, 302, 'more characters in common', { size: 10, c: 'var(--diagram-muted)' }),
    lab(378, 14, 'Human (Homo sapiens)', { w: 'bold' }),
  ].join(''),
);

// 1b. Lettered version: the tiger, with five ranks replaced by letters A to E
const TIGER = 'Panthera tigris';
const LETTER = { Phylum: 'A', Class: 'B', Order: 'C', Family: 'D', Genus: 'E' };
export const HIER_Q = svgDoc(
  560,
  330,
  `Funnel of seven categories used to classify the tiger. From the top: Kingdom (Animalia), five categories marked A to E (A Chordata, B Mammalia, C Carnivora, D Felidae, E Panthera) and Species (tigris) at the bottom. The domestic cat, Felis catus, belongs to the same kingdom, phylum, class, order and family as the tiger but to a different genus`,
  [
    hierRows(TIGER, (rk) => ({
      left: LETTER[rk] ?? rk,
      right: rk === 'Species' ? 'tigris' : at(TIGER, rk),
      italic: rk === 'Species' || rk === 'Genus',
    })),
    lab(378, 14, 'Tiger (Panthera tigris)', { w: 'bold' }),
    lab(28, 288, 'Rank names for A to E are hidden;', { size: 10, c: 'var(--diagram-muted)' }),
    lab(28, 302, 'the group names are shown', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
// the letter that marks the family (used by questions)
export const FAMILY_LETTER = LETTER.Family;
if (sharedRank('Panthera tigris', 'Felis catus') !== 'Family' || LETTER[sharedRank('Panthera tigris', 'Felis catus')] !== 'D') throw new Error('svgs: lettered figure out of step with calc');

// 2. The three domains
const box = (x, y, w, h, text, c, o = {}) => S.rect(x, y, w, h, { rx: 6, c, fill: c, fop: 0.14, sw: 1.5 }) + lab(x + w / 2, y + h / 2 + 4, text, { a: 'middle', w: 'bold', size: 12, ...o });
export const DOMAINS_SVG = svgDoc(
  700,
  250,
  'Tree of the three domains of life: Bacteria and Archaea are prokaryotic (no nucleus, no membrane-bound organelles) and Eukarya has a true nucleus and membrane-bound organelles. Bacteria have peptidoglycan in their cell walls; Archaea lack it and many live in extreme habitats such as very salty, hot or oxygen-free places. Eukarya includes four kingdoms: Protista, Fungi, Plantae and Animalia. All three arise from a common ancestor',
  [
    box(250, 8, 200, 28, 'Common ancestor of all life', 'var(--diagram-muted)', { size: 11 }),
    S.line(350, 36, 90, 76, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.line(350, 36, 270, 76, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.line(350, 36, 530, 76, { c: 'var(--diagram-muted)', w: 1.5 }),
    box(20, 76, 140, 32, 'Bacteria', 'var(--diagram-green)'),
    box(200, 76, 140, 32, 'Archaea', 'var(--diagram-blue)'),
    box(380, 76, 300, 32, 'Eukarya', 'var(--diagram-red)'),
    S.lines(90, 128, ['Prokaryotic', 'Peptidoglycan in cell wall', 'Common in soil, water, bodies'], { a: 'middle', size: 10.5, dy: 14 }),
    S.lines(270, 128, ['Prokaryotic', 'No peptidoglycan in wall', 'Salty, hot, oxygen-free habitats'], { a: 'middle', size: 10.5, dy: 14 }),
    ...[['Protista', 420], ['Fungi', 495], ['Plantae', 570], ['Animalia', 645]].map(([n, x], i) => S.line(530, 108, x, 126, { c: 'var(--diagram-muted)', w: 1 }) + box(x - 35, 126, 70, 26, n, ['var(--diagram-accent)', 'var(--diagram-brown)', 'var(--diagram-green)', 'var(--diagram-blue)'][i], { size: 11 })),
    S.lines(530, 178, ['True nucleus and membrane-bound organelles', 'Four kingdoms'], { a: 'middle', size: 10.5, dy: 14 }),
    lab(350, 236, 'Domains proposed by Carl Woese in 1990 from ribosomal RNA differences', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Nested lineage tree of the Carnivora (who shares which category)
const NODE = (x, y) => S.circle(x, y, 4, { fill: 'currentColor', sw: 0 });
const link = (x1, y1, x2, y2) => S.path(`M${x1} ${y1} L${f1((x1 + x2) / 2)} ${y1} L${f1((x1 + x2) / 2)} ${y2} L${x2} ${y2}`, { c: 'var(--diagram-muted)', w: 1.5 });
export const LINEAGE = svgDoc(
  600,
  260,
  'Lineage tree of four carnivores. Order Carnivora branches into family Felidae and family Canidae. Felidae contains genus Panthera, with the species tiger Panthera tigris and lion Panthera leo, and genus Felis, with the domestic cat Felis catus. Canidae contains genus Canis with the dog Canis familiaris. The tiger and the lion share every category down to genus; the tiger and the cat share only down to family; the tiger and the dog share only down to order',
  [
    lab(20, 16, 'Order', { w: 'bold', c: 'var(--diagram-muted)' }),
    lab(150, 16, 'Family', { w: 'bold', c: 'var(--diagram-muted)' }),
    lab(280, 16, 'Genus', { w: 'bold', c: 'var(--diagram-muted)' }),
    lab(420, 16, 'Species', { w: 'bold', c: 'var(--diagram-muted)' }),
    link(24, 130, 154, 90),
    link(24, 130, 154, 200),
    link(154, 90, 284, 62),
    link(154, 90, 284, 124),
    link(154, 200, 284, 200),
    link(284, 62, 424, 44),
    link(284, 62, 424, 82),
    link(284, 124, 424, 124),
    link(284, 200, 424, 200),
    ...[[24, 130], [154, 90], [154, 200], [284, 62], [284, 124], [284, 200], [424, 44], [424, 82], [424, 124], [424, 200]].map(([x, y]) => NODE(x, y)),
    lab(20, 150, 'Carnivora'),
    lab(150, 110, 'Felidae'),
    lab(150, 220, 'Canidae'),
    lab(280, 82, 'Panthera', { it: true }),
    lab(280, 144, 'Felis', { it: true }),
    lab(280, 220, 'Canis', { it: true }),
    lab(434, 48, 'Panthera tigris (tiger)', { it: true }),
    lab(434, 86, 'Panthera leo (lion)', { it: true }),
    lab(434, 128, 'Felis catus (domestic cat)', { it: true }),
    lab(434, 204, 'Canis familiaris (dog)', { it: true }),
    S.ellipse(304, 72, 40, 25, { c: 'var(--diagram-accent)', dash: '4 3', sw: 1.2 }),
    lab(300, 248, 'Dashed ring: the tiger and the lion share the genus', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 4. Anatomy of a scientific name
export const BINOM = svgDoc(
  520,
  250,
  'Anatomy of a scientific name, Mangifera indica Linn. The first word, Mangifera, is the genus and starts with a capital letter; the second word, indica, is the species epithet and is written entirely in small letters; Linn. is the abbreviated name of the author, Linnaeus, written in ordinary type after the species. In print the two names are in italics; in handwriting each word is underlined separately',
  [
    lab(20, 20, 'Printed form', { w: 'bold', c: 'var(--diagram-muted)' }),
    S.text(24, 66, 'Mangifera', { size: 30, it: true, c: 'var(--diagram-green)' }),
    S.text(184, 66, 'indica', { size: 30, it: true, c: 'var(--diagram-blue)' }),
    S.text(300, 66, 'Linn.', { size: 30, c: 'var(--diagram-accent)' }),
    S.line(24, 78, 164, 78, { c: 'var(--diagram-green)', w: 2 }),
    S.line(184, 78, 284, 78, { c: 'var(--diagram-blue)', w: 2 }),
    S.line(300, 78, 376, 78, { c: 'var(--diagram-accent)', w: 2 }),
    S.lines(24, 96, ['Genus: first word,', 'capital first letter'], { size: 11, c: 'var(--diagram-green)', dy: 13 }),
    S.lines(184, 96, ['Species epithet:', 'all small letters'], { size: 11, c: 'var(--diagram-blue)', dy: 13 }),
    S.lines(300, 96, ['Author (abbreviated),', 'ordinary type'], { size: 11, c: 'var(--diagram-accent)', dy: 13 }),
    S.line(20, 140, 500, 140, { c: 'var(--diagram-muted)', w: 1, dash: '4 4' }),
    lab(20, 164, 'Handwritten form', { w: 'bold', c: 'var(--diagram-muted)' }),
    S.text(24, 206, 'Mangifera', { size: 28, c: 'var(--diagram-green)' }),
    S.text(184, 206, 'indica', { size: 28, c: 'var(--diagram-blue)' }),
    S.line(24, 214, 160, 214, { c: 'var(--diagram-green)', w: 2 }),
    S.line(184, 214, 262, 214, { c: 'var(--diagram-blue)', w: 2 }),
    lab(290, 200, 'Each word is underlined', { size: 11 }),
    lab(290, 214, 'separately', { size: 11 }),
  ].join(''),
);

export const ALL = { HIER, HIER_Q, DOMAINS_SVG, LINEAGE, BINOM };
void LIN;
