// SVG diagrams for ISC 11 Biology ch01 The Living World. Taxa and similarity values come from calc.mjs.
import { svgDoc, S } from './lib.mjs';
import { ORG, MAT, NAMES4, sim, between, binomial } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. The taxonomic hierarchy as a funnel, with man and mango placed in it
const rankBoxes = (x0, y0, step, h, widths, f) => widths.map((w, i) => f(x0 - w / 2, y0 + i * step, w, h, i)).join('');
const WIDTHS = [210, 190, 170, 150, 130, 110, 90];
export const HIER = svgDoc(
  470,
  290,
  'The taxonomic hierarchy drawn as a funnel with seven categories: kingdom, phylum or division, class, order, family, genus and species. The classification of man runs from Animalia, Chordata, Mammalia, Primata, Hominidae and Homo to sapiens; that of mango runs from Plantae, Angiospermae, Dicotyledonae, Sapindales and Anacardiaceae to Mangifera indica. Higher categories hold more organisms with fewer shared characters',
  [
    lab(115, 12, 'Category', { a: 'middle', w: 'bold' }),
    lab(285, 12, 'Man', { a: 'middle', w: 'bold' }),
    lab(395, 12, 'Mango', { a: 'middle', w: 'bold' }),
    rankBoxes(120, 20, 30, 26, WIDTHS, (x, y, w, h, i) =>
      S.rect(x, y, w, h, { rx: 4, fill: i === 6 ? 'var(--diagram-green)' : 'var(--diagram-blue)', fop: i === 6 ? 0.35 : 0.1 + i * 0.04, sw: 1.2 }) +
      lab(120, y + 17, ['Kingdom', 'Phylum (Division)', 'Class', 'Order', 'Family', 'Genus', 'Species'][i], { a: 'middle', w: i === 6 ? 'bold' : undefined }),
    ),
    ...ORG.man.taxa.map((t, i) => lab(285, 20 + i * 30 + 17, t, { a: 'middle', it: i >= 5 })),
    ...ORG.mango.taxa.map((t, i) => lab(395, 20 + i * 30 + 17, t, { a: 'middle', it: i >= 5 })),
    S.arrow(450, 220, 450, 30, { c: 'var(--diagram-muted)', w: 1.2 }),
    lab(235, 242, 'Up the ladder: more organisms, fewer shared characters', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(235, 256, 'Down the ladder: fewer organisms, more shared characters', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(285, 278, `Man: ${binomial('man')}`, { a: 'middle', size: 10, it: true }),
    lab(395, 278, `Mango: ${binomial('mango')}`, { a: 'middle', size: 10, it: true }),
  ].join(''),
);

// 2. Lettered version for the housefly: ranks are hidden, five are marked A to E
const FLY = ORG.housefly.taxa;
const WIDTHS_L = [210, 198, 186, 174, 162, 150, 140];
export const HIER_L = svgDoc(
  330,
  276,
  'Classification of the housefly Musca domestica drawn as a funnel. The kingdom Animalia and the species domestica are named; the five categories between them are marked with the letters A to E and show the taxa Arthropoda, Insecta, Diptera, Muscidae and Musca, without saying which category each one is',
  [
    lab(165, 12, 'Housefly: Musca domestica', { a: 'middle', w: 'bold' }),
    rankBoxes(165, 20, 32, 28, WIDTHS_L, (x, y, w, h, i) => {
      const letter = 'ABCDE'[i - 1];
      const fillv = i === 0 || i === 6 ? 'var(--diagram-green)' : 'var(--diagram-blue)';
      return (
        S.rect(x, y, w, h, { rx: 4, fill: fillv, fop: i === 0 || i === 6 ? 0.3 : 0.12 + i * 0.04, sw: 1.2 }) +
        (letter ? lab(x + 12, y + 18, letter, { w: 'bold', size: 13 }) + lab(165 + 6, y + 18, FLY[i], { a: 'middle' }) : lab(165, y + 18, i === 0 ? `Kingdom: ${FLY[0]}` : `Species: ${FLY[6]}`, { a: 'middle' }))
      );
    }),
    lab(165, 266, 'Letters mark categories; their names are not given', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Dendrogram from the similarity table
const X0 = 110;
const W = 270;
const xs = (s) => X0 + (1 - s) * W;
const ys = { mango: 40, neem: 80, wheat: 130, maize: 170 };
const s1 = sim('mango', 'neem');
const s2 = sim('wheat', 'maize');
const a1 = (ys.mango + ys.neem) / 2;
const a2 = (ys.wheat + ys.maize) / 2;
export const DENDRO = svgDoc(
  420,
  250,
  `Dendrogram from a numerical taxonomy table of ten characters: mango and neem join at a similarity of ${s1}, wheat and maize join at ${s2}, and the two pairs join each other only at an average similarity of ${between}`,
  [
    ...Object.keys(ys).map((k) => lab(X0 - 8, ys[k] + 4, NAMES4[k], { a: 'end' })),
    S.line(X0, ys.mango, xs(s1), ys.mango, { w: 1.6 }), S.line(X0, ys.neem, xs(s1), ys.neem, { w: 1.6 }), S.line(xs(s1), ys.mango, xs(s1), ys.neem, { w: 1.6 }),
    S.line(X0, ys.wheat, xs(s2), ys.wheat, { w: 1.6 }), S.line(X0, ys.maize, xs(s2), ys.maize, { w: 1.6 }), S.line(xs(s2), ys.wheat, xs(s2), ys.maize, { w: 1.6 }),
    S.line(xs(s1), a1, xs(between), a1, { w: 1.6 }), S.line(xs(s2), a2, xs(between), a2, { w: 1.6 }), S.line(xs(between), a1, xs(between), a2, { w: 1.6 }),
    lab(xs(s1) + 4, a1 - 6, `${s1}`, { size: 10, c: 'var(--diagram-accent)' }),
    lab(xs(s2) + 4, a2 - 6, `${s2}`, { size: 10, c: 'var(--diagram-accent)' }),
    lab(xs(between) + 6, (a1 + a2) / 2 + 4, `${between}`, { size: 10, c: 'var(--diagram-accent)' }),
    S.line(X0, 205, X0 + W, 205, { c: 'var(--diagram-muted)', w: 1 }),
    ...[1, 0.8, 0.6, 0.4, 0.2, 0].map((v) => S.line(xs(v), 205, xs(v), 210, { c: 'var(--diagram-muted)', w: 1 }) + lab(xs(v), 223, String(v), { a: 'middle', size: 10, c: 'var(--diagram-muted)' })),
    lab(X0 + W / 2, 243, 'Similarity (matching characters out of ten)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Parts of a scientific name
export const NAMEFIG = svgDoc(
  400,
  210,
  'Parts of the scientific name Mangifera indica Linn.: the first word Mangifera is the genus and begins with a capital letter; the second word indica is the species epithet and begins with a small letter; Linn. is the abbreviated name of the author who first described the species, written in roman type. In print the genus and epithet are in italics; in handwriting each is underlined separately',
  [
    S.text(32, 52, 'Mangifera', { size: 24, it: true }),
    S.text(160, 52, 'indica', { size: 24, it: true }),
    S.text(250, 52, 'Linn.', { size: 24 }),
    S.line(32, 60, 140, 60, { w: 1.4, c: 'var(--diagram-accent)' }),
    S.line(160, 60, 232, 60, { w: 1.4, c: 'var(--diagram-accent)' }),
    S.line(86, 66, 86, 96, { c: 'var(--diagram-muted)', w: 1 }),
    S.line(196, 66, 196, 96, { c: 'var(--diagram-muted)', w: 1 }),
    S.line(278, 62, 278, 96, { c: 'var(--diagram-muted)', w: 1 }),
    lab(86, 112, 'Genus', { a: 'middle', w: 'bold' }),
    lab(86, 126, 'First word', { a: 'middle', size: 10 }),
    lab(86, 139, 'Capital first letter', { a: 'middle', size: 10 }),
    lab(196, 112, 'Species epithet', { a: 'middle', w: 'bold' }),
    lab(196, 126, 'Second word', { a: 'middle', size: 10 }),
    lab(196, 139, 'Small first letter', { a: 'middle', size: 10 }),
    lab(310, 112, 'Author', { a: 'middle', w: 'bold' }),
    lab(310, 126, 'Roman type', { a: 'middle', size: 10 }),
    lab(310, 139, 'First describer', { a: 'middle', size: 10 }),
    lab(200, 170, 'Printed: italics. Handwritten: underline each word separately.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(200, 186, 'The orange lines show the separate underlines.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. A phylogenetic tree of the same four plants
const tip = (x, y, t) => lab(x, y + 4, t, { size: 11 });
export const PHYLO = svgDoc(
  420,
  220,
  'A phylogenetic tree of four flowering plants: a common ancestor of flowering plants splits into a dicot lineage, with two cotyledons, leading to mango and neem, and a monocot lineage, with one cotyledon, leading to wheat and maize. A phylogenetic system groups organisms by common ancestry shown by fossils, anatomy, embryology and molecular evidence',
  [
    S.line(20, 110, 150, 110, { w: 2 }),
    S.line(150, 60, 150, 160, { w: 2 }),
    S.line(150, 60, 240, 60, { w: 2 }), S.line(150, 160, 240, 160, { w: 2 }),
    S.line(240, 35, 240, 85, { w: 2 }), S.line(240, 35, 320, 35, { w: 2 }), S.line(240, 85, 320, 85, { w: 2 }),
    S.line(240, 135, 240, 185, { w: 2 }), S.line(240, 135, 320, 135, { w: 2 }), S.line(240, 185, 320, 185, { w: 2 }),
    tip(326, 35, 'Mango'), tip(326, 85, 'Neem'), tip(326, 135, 'Wheat'), tip(326, 185, 'Maize'),
    S.circle(20, 110, 4, { fill: 'currentColor' }),
    lab(14, 130, 'Common ancestor', { size: 10 }),
    lab(14, 143, 'of flowering plants', { size: 10 }),
    lab(195, 52, 'Dicots', { a: 'middle', w: 'bold', c: 'var(--diagram-blue)' }),
    lab(195, 76, 'two cotyledons', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(195, 152, 'Monocots', { a: 'middle', w: 'bold', c: 'var(--diagram-green)' }),
    lab(195, 176, 'one cotyledon', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(210, 212, 'Branching shows descent, not just resemblance', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

void MAT;
export const ALL = { HIER, HIER_L, DENDRO, NAMEFIG, PHYLO };
