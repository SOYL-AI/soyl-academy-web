// Hand-drawn schematics for ICSE 10 Chemistry ch15 (allow-listed elements, palette colours only): displayed formulae of
// ethanol and ethanoic acid, the atoms rearranged in esterification, the laboratory test for an ester, glacial acetic acid.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = (x, y, s, o) => S.text(x, y, s, { size: 10, c: 'var(--diagram-muted)', ...o });
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';

/** Molecule: atoms [[x, y, label, colour?]…], bonds [[i, j, order]…], offset (ox, oy). */
function mol(ox, oy, atoms, bonds, { size = 13 } = {}) {
  const hw = (t) => (t ? Math.max(5, t.length * size * 0.32) : 0);
  const hh = size * 0.5;
  const out = [];
  for (const [i, j, ord = 1] of bonds) {
    const [x1, y1, l1] = atoms[i];
    const [x2, y2, l2] = atoms[j];
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    const cut = (t) => (t ? Math.min(hw(t) / Math.max(Math.abs(ux), 1e-6), hh / Math.max(Math.abs(uy), 1e-6)) + 3 : 0);
    const c1 = cut(l1);
    const c2 = cut(l2);
    const ax = ox + x1 + ux * c1;
    const ay = oy + y1 + uy * c1;
    const bx = ox + x2 - ux * c2;
    const by = oy + y2 - uy * c2;
    const offs = ord === 1 ? [0] : ord === 2 ? [-2.2, 2.2] : [-3.6, 0, 3.6];
    for (const o of offs) out.push(S.line(ax - uy * o, ay + ux * o, bx - uy * o, by + ux * o, { w: 1.3 }));
  }
  for (const [x, y, t, c] of atoms) if (t) out.push(S.text(ox + x, oy + y + size * 0.36, t, { a: 'middle', size, c, w: t === 'C' ? 'bold' : undefined }));
  return out.join('');
}
const box = (x, y, w, h, c = RED) => S.rect(x, y, w, h, { sw: 1.2, dash: '4 3', c, rx: 6 });

// 1. Ethanol: displayed formula with the hydroxyl group marked.
export const ETHANOL = svgDoc(
  420,
  150,
  'Displayed formula of ethanol. Two carbon atoms are joined by a single bond. The first carbon carries three hydrogen atoms; the second carries two hydrogen atoms and is bonded to an oxygen atom, which is bonded to a hydrogen atom. The oxygen and its hydrogen, the hydroxyl group, are marked with a dashed box.',
  [
    mol(70, 70, [[0, 0, 'C'], [44, 0, 'C'], [92, 0, 'O', RED], [130, 0, 'H', RED], [0, -32, 'H'], [0, 32, 'H'], [-36, 0, 'H'], [44, -32, 'H'], [44, 32, 'H']], [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]]),
    box(146, 52, 70, 36),
    lab(181, 108, 'hydroxyl group –OH', { a: 'middle', c: RED }),
    lab(290, 60, 'ethanol, C₂H₅OH', { w: 'bold' }),
    muted(290, 78, 'CH₃–CH₂–OH'),
    muted(290, 96, 'molecular mass 46'),
    muted(70, 140, 'an alkyl group (ethyl) joined to –OH'),
  ].join(''),
);

// 2. Ethanoic acid: displayed formula with the carboxyl group marked.
export const ACID = svgDoc(
  420,
  160,
  'Displayed formula of ethanoic acid. A methyl group, a carbon carrying three hydrogen atoms, is joined to a second carbon atom. The second carbon is joined by a double bond to one oxygen atom and by a single bond to another oxygen atom, which carries a hydrogen atom. The second carbon with its two oxygen atoms and the hydrogen, the carboxyl group, is marked with a dashed box.',
  [
    mol(70, 86, [[0, 0, 'C'], [46, 0, 'C'], [46, -38, 'O', RED], [92, 0, 'O', RED], [128, 0, 'H', RED], [0, -32, 'H'], [0, 32, 'H'], [-36, 0, 'H']], [[0, 1], [1, 2, 2], [1, 3], [3, 4], [0, 5], [0, 6], [0, 7]]),
    box(100, 30, 112, 76),
    lab(156, 124, 'carboxyl group –COOH', { a: 'middle', c: RED }),
    lab(290, 66, 'ethanoic acid, CH₃COOH', { w: 'bold' }),
    muted(290, 84, '(acetic acid)'),
    muted(290, 102, 'molecular mass 60'),
    muted(70, 152, 'C=O and C–OH on the same carbon'),
  ].join(''),
);

// 3. Esterification: which atoms leave as water.
export const ESTER_SCHEME = svgDoc(
  360,
  200,
  'Esterification of ethanoic acid with ethanol. Top row: ethanoic acid, CH3 joined to a carbon that has a double-bonded oxygen and an OH group, plus ethanol written H, O, C2H5. The OH of the acid and the H of the alcohol, shown in a dashed box, leave together as water. Bottom row: the product ethyl ethanoate, CH3 joined to a carbon with a double-bonded oxygen and an oxygen linked to C2H5, plus a molecule of water. The reaction needs a few drops of concentrated sulphuric acid and is reversible.',
  [
    mol(30, 50, [[0, 0, 'CH₃'], [50, 0, 'C'], [50, -30, 'O'], [100, 0, 'OH', RED]], [[0, 1], [1, 2, 2], [1, 3]]),
    lab(158, 54, '+', { a: 'middle', size: 14 }),
    mol(200, 50, [[0, 0, 'H', RED], [36, 0, 'O'], [88, 0, 'C₂H₅']], [[0, 1], [1, 2]]),
    box(114, 36, 98, 28),
    muted(163, 80, 'these leave as H₂O', { a: 'middle', c: RED }),
    S.arrow(230, 94, 230, 126),
    muted(242, 106, 'conc. H₂SO₄, warm'),
    muted(242, 119, 'reversible (⇌)'),
    mol(40, 160, [[0, 0, 'CH₃'], [50, 0, 'C'], [50, -30, 'O'], [96, 0, 'O'], [146, 0, 'C₂H₅']], [[0, 1], [1, 2, 2], [1, 3], [3, 4]]),
    lab(240, 164, '+', { a: 'middle', size: 14 }),
    lab(280, 164, 'H₂O', { a: 'middle', size: 13, c: RED }),
    lab(110, 192, 'ethyl ethanoate (fruity smell)', { a: 'middle', w: 'bold', size: 10 }),
    lab(280, 192, 'water', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Laboratory test for an ester.
const tubeIn = (x, top, bottom, liquidTop, fill) =>
  S.path(`M${x} ${top} V${bottom} A12 12 0 0 0 ${x + 24} ${bottom} V${top}`, { w: 1.5 }) +
  S.path(`M${x + 1} ${liquidTop} V${bottom} A11 11 0 0 0 ${x + 23} ${bottom} V${liquidTop} Z`, { sw: 0, fill, fop: 0.35, c: fill });
export const ESTER_TEST = svgDoc(
  460,
  240,
  'Testing for an ester. Left: a test tube containing ethanol, ethanoic acid and a few drops of concentrated sulphuric acid stands in a beaker of hot water, which acts as a water bath, for a few minutes. Right: the contents are poured into a beaker of cold water or sodium carbonate solution. An oily layer of ester floats on top and a sweet, fruity smell is noticed.',
  [
    S.path('M40 110 V210 H160 V110', { w: 1.6 }),
    S.rect(41, 140, 118, 69, { sw: 0, fill: BLUE, fop: 0.15, c: BLUE }),
    muted(100, 228, 'hot water bath', { a: 'middle' }),
    tubeIn(88, 60, 190, 150, 'var(--diagram-accent)'),
    S.lines(170, 60, ['ethanol', '+ ethanoic acid', '+ few drops of', 'conc. H₂SO₄'], { size: 10, dy: 13 }),
    S.lead(112, 160, 168, 100),
    S.arrow(240, 140, 290, 140),
    muted(265, 130, 'pour', { a: 'middle' }),
    S.path('M310 110 V210 H430 V110', { w: 1.6 }),
    S.rect(311, 150, 118, 59, { sw: 0, fill: BLUE, fop: 0.15, c: BLUE }),
    S.rect(311, 140, 118, 10, { sw: 0, fill: 'var(--diagram-accent)', fop: 0.5, c: 'var(--diagram-accent)' }),
    lab(370, 98, 'oily ester layer', { a: 'middle', size: 10 }),
    S.lead(370, 102, 370, 140),
    lab(370, 228, 'fruity smell', { a: 'middle', w: 'bold' }),
    muted(370, 178, 'cold water or', { a: 'middle' }),
    muted(370, 191, 'Na₂CO₃ solution', { a: 'middle' }),
  ].join(''),
);

// 5. Glacial acetic acid: liquid above 17 °C, ice-like solid below.
const bottle = (x) => S.path(`M${x + 22} 40 V62 L${x} 84 V200 H${x + 80} V84 L${x + 58} 62 V40 Z`, { w: 1.6 });
export const GLACIAL = svgDoc(
  420,
  250,
  'Two bottles of pure ethanoic acid. Left, at a room temperature above seventeen degrees Celsius, the acid is a clear colourless liquid. Right, on a cold day below seventeen degrees Celsius, the acid has frozen into colourless ice-like crystals, which is why pure ethanoic acid is called glacial acetic acid.',
  [
    bottle(60),
    S.rect(61, 110, 78, 89, { sw: 0, fill: BLUE, fop: 0.12, c: BLUE }),
    lab(100, 26, 'above 17 °C', { a: 'middle', w: 'bold' }),
    lab(100, 222, 'clear liquid', { a: 'middle' }),
    bottle(260),
    ...[[272, 120], [298, 112], [322, 124], [284, 148], [310, 142], [276, 176], [300, 170], [324, 160], [318, 184]].map(([x, y]) =>
      S.path(`M${x} ${y} l8 -8 l8 8 l-8 8 Z`, { w: 1.1, c: BLUE, fill: BLUE, fop: 0.2 })),
    lab(300, 26, 'below 17 °C', { a: 'middle', w: 'bold' }),
    lab(300, 222, 'ice-like crystals', { a: 'middle' }),
    muted(210, 244, 'pure (100 per cent) ethanoic acid freezes at about 17 °C: "glacial"', { a: 'middle' }),
  ].join(''),
);
