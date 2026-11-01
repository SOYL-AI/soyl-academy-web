// Hand-drawn SVG schematics for ICSE 10 Chemistry ch05 Mole Concept (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// A labelled "1 volume" box.
const volBox = (x, y, gas, colour) =>
  S.rect(x, y, 46, 46, { fill: colour, fop: 0.18, sw: 1.4 }) + S.text(x + 23, y + 20, '1 vol', { a: 'middle', size: 10 }) + S.text(x + 23, y + 36, gas, { a: 'middle', size: 12, w: 'bold' });
const plus = (x, y) => S.text(x, y, '+', { a: 'middle', size: 16, w: 'bold' });

// 1. Combining volumes: nitrogen + hydrogen -> ammonia (1 : 3 : 2) and hydrogen + chlorine -> hydrogen chloride (1 : 1 : 2).
export const COMBINING_VOLUMES = svgDoc(
  520,
  250,
  'Two rows of equal-sized boxes, each box standing for one volume of gas at the same temperature and pressure. Top row: one volume of nitrogen plus three volumes of hydrogen give two volumes of ammonia, a ratio of 1 to 3 to 2. Bottom row: one volume of hydrogen plus one volume of chlorine give two volumes of hydrogen chloride, a ratio of 1 to 1 to 2. The volumes follow the coefficients of the balanced equations.',
  [
    lab(260, 18, 'Each box = 1 volume of gas (same temperature and pressure)', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }),
    // row 1
    volBox(14, 40, 'N₂', 'var(--diagram-blue)'),
    plus(78, 70),
    volBox(92, 40, 'H₂', 'var(--diagram-green)'),
    volBox(142, 40, 'H₂', 'var(--diagram-green)'),
    volBox(192, 40, 'H₂', 'var(--diagram-green)'),
    S.arrow(252, 63, 318, 63, { c: 'var(--diagram-red)' }),
    volBox(330, 40, 'NH₃', 'var(--diagram-accent)'),
    volBox(380, 40, 'NH₃', 'var(--diagram-accent)'),
    lab(450, 60, '1 : 3 : 2', { size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    lab(450, 76, '4 vol → 2 vol', { size: 10, c: 'var(--diagram-muted)' }),
    // row 2
    volBox(14, 150, 'H₂', 'var(--diagram-green)'),
    plus(78, 180),
    volBox(92, 150, 'Cl₂', 'var(--diagram-blue)'),
    S.arrow(252, 173, 318, 173, { c: 'var(--diagram-red)' }),
    volBox(330, 150, 'HCl', 'var(--diagram-accent)'),
    volBox(380, 150, 'HCl', 'var(--diagram-accent)'),
    lab(450, 170, '1 : 1 : 2', { size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    lab(450, 186, '2 vol → 2 vol', { size: 10, c: 'var(--diagram-muted)' }),
    lab(260, 236, 'Volume ratio = ratio of coefficients in the balanced equation', { a: 'middle', size: 11 }),
  ].join(''),
);

// 2. Avogadro's law: three equal jars of hydrogen, oxygen and carbon dioxide with the same number of molecules.
const SPOTS = [[30, 34], [88, 30], [58, 70], [24, 108], [96, 96], [64, 128]];
const h2 = (x, y) => S.circle(x - 4, y, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }) + S.circle(x + 4, y, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 });
const o2 = (x, y) => S.circle(x - 6, y, 6.5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }) + S.circle(x + 6, y, 6.5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 });
const co2 = (x, y) =>
  S.circle(x - 11, y, 6.5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }) + S.circle(x, y, 6, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 1 }) + S.circle(x + 11, y, 6.5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 });
const jar = (x, name, draw, mass) =>
  S.rect(x, 40, 124, 150, { rx: 6, sw: 1.8 }) +
  SPOTS.map(([dx, dy]) => draw(x + dx, 40 + dy)).join('') +
  S.text(x + 62, 30, name, { a: 'middle', size: 12, w: 'bold' }) +
  S.text(x + 62, 208, '6 molecules', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }) +
  S.text(x + 62, 224, mass, { a: 'middle', size: 10 });
export const EQUAL_VOLUMES = svgDoc(
  480,
  262,
  'Three identical jars of the same volume, at the same temperature and pressure, filled with hydrogen, oxygen and carbon dioxide. Each jar is drawn with the same number of molecules, six: small two-atom hydrogen molecules, larger two-atom oxygen molecules and three-atom carbon dioxide molecules. Equal volumes hold equal numbers of molecules, but the masses differ: one cubic decimetre at STP weighs about 0.09 g for hydrogen, 1.43 g for oxygen and 1.96 g for carbon dioxide.',
  [
    jar(18, 'hydrogen', h2, '1 dm³ ≈ 0.09 g'),
    jar(178, 'oxygen', o2, '1 dm³ ≈ 1.43 g'),
    jar(338, 'carbon dioxide', co2, '1 dm³ ≈ 1.96 g'),
    lab(240, 252, 'Same volume, temperature and pressure → same number of molecules', { a: 'middle', size: 11, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 3. The mole map: moles at the centre, linked to mass, number of particles and gas volume at STP.
export const MOLE_MAP = svgDoc(
  540,
  290,
  'A mole map. In the centre is an oval labelled moles. To the left is a box labelled mass in grams: divide a mass by the molar mass to get moles, and multiply moles by the molar mass to get mass. To the right is a box labelled number of particles: multiply moles by Avogadro’s number, 6.022 × 10^23, to get particles, and divide particles by it to get moles. Below is a box labelled volume of gas at STP in cubic decimetres: multiply moles by 22.4 to get volume, and divide the volume by 22.4 to get moles.',
  [
    S.ellipse(270, 120, 72, 32, { fill: 'var(--diagram-accent)', fop: 0.2, sw: 2 }),
    S.text(270, 118, 'MOLES', { a: 'middle', size: 14, w: 'bold' }),
    S.text(270, 134, '(n)', { a: 'middle', size: 11 }),
    // mass box
    S.rect(14, 96, 124, 48, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 1.5 }),
    S.text(76, 117, 'Mass', { a: 'middle', size: 12, w: 'bold' }),
    S.text(76, 133, '(g)', { a: 'middle', size: 11 }),
    S.arrow(140, 110, 196, 110, { c: 'var(--diagram-blue)', size: 6 }),
    S.arrow(196, 132, 140, 132, { c: 'var(--diagram-blue)', size: 6 }),
    lab(168, 102, '÷ M', { a: 'middle', size: 11, c: 'var(--diagram-blue)' }),
    lab(168, 150, '× M', { a: 'middle', size: 11, c: 'var(--diagram-blue)' }),
    // particles box
    S.rect(392, 96, 136, 48, { fill: 'var(--diagram-green)', fop: 0.15, sw: 1.5 }),
    S.text(460, 117, 'Number of', { a: 'middle', size: 12, w: 'bold' }),
    S.text(460, 133, 'particles', { a: 'middle', size: 12, w: 'bold' }),
    S.arrow(344, 110, 390, 110, { c: 'var(--diagram-green)', size: 6 }),
    S.arrow(390, 132, 344, 132, { c: 'var(--diagram-green)', size: 6 }),
    lab(367, 80, '× 6.022 × 10²³', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(367, 162, '÷ 6.022 × 10²³', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    // volume box
    S.rect(186, 214, 168, 54, { fill: 'var(--diagram-red)', fop: 0.12, sw: 1.5 }),
    S.text(270, 236, 'Volume of gas', { a: 'middle', size: 12, w: 'bold' }),
    S.text(270, 254, 'at STP (dm³)', { a: 'middle', size: 11 }),
    S.arrow(252, 154, 252, 212, { c: 'var(--diagram-red)', size: 6 }),
    S.arrow(288, 212, 288, 154, { c: 'var(--diagram-red)', size: 6 }),
    lab(244, 188, '× 22.4', { a: 'end', size: 11, c: 'var(--diagram-red)' }),
    lab(296, 188, '÷ 22.4', { size: 11, c: 'var(--diagram-red)' }),
    lab(14, 24, 'M = gram molecular (or atomic) mass', { size: 10, c: 'var(--diagram-muted)' }),
    lab(14, 38, 'STP = 273 K and 1 atm; molar volume applies to gases only', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
