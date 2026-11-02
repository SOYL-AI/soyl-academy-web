// SVG diagrams for ch11 Photosynthesis in Higher Plants (allow-listed elements, palette colours only). Schematics, not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { rate, SPOTS, SOLVENT_FRONT, rf, TURN, CALVIN, C4 } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BRN = 'var(--diagram-brown)';
const box = (x, y, w, h, lines, c, o = {}) =>
  S.rect(x, y, w, h, { rx: 6, fill: c, fop: o.fop ?? 0.16, sw: 1.4 }) +
  lines.map((t, i) => lab(x + w / 2, y + h / 2 + 4 - ((lines.length - 1) * 6.5) + i * 13, t, { a: 'middle', size: o.size ?? 10, w: i === 0 && o.bold ? 'bold' : undefined })).join('');

// 1. Chloroplast
const granum = (cx, top, n) => Array.from({ length: n }, (_, i) => S.rect(cx - 23, top + i * 10, 46, 8, { rx: 4, fill: GREEN, fop: 0.45, sw: 1 })).join('');
export const CHLOROPLAST = svgDoc(
  560,
  280,
  'Section of a chloroplast. A double membrane, the outer and inner membranes, encloses the stroma. Inside the stroma are grana, stacks of flattened sacs called thylakoids, joined to each other by stroma lamellae. The light reaction takes place on the thylakoid membranes of the grana and lamellae; the Calvin cycle takes place in the stroma',
  [
    S.ellipse(190, 150, 175, 110, { fill: GREEN, fop: 0.07, sw: 2.6 }),
    S.ellipse(190, 150, 166, 101, { sw: 1.2 }),
    S.line(142, 112, 192, 102, { c: GREEN, w: 2.4 }), S.line(222, 128, 256, 142, { c: GREEN, w: 2.4 }), S.line(130, 140, 154, 150, { c: GREEN, w: 2.4 }), S.line(182, 174, 243, 168, { c: GREEN, w: 2.4 }),
    granum(120, 92, 5), granum(215, 70, 6), granum(160, 150, 5), granum(265, 140, 5),
    lab(386, 34, 'Outer membrane'), S.lead(384, 30, 303, 66),
    lab(386, 74, 'Inner membrane'), S.lead(384, 70, 347, 114),
    lab(386, 114, 'Granum: stack of thylakoids;'), lab(386, 128, 'light reaction'), S.lead(384, 110, 239, 94),
    lab(386, 168, 'Thylakoid membrane and lumen'), S.lead(384, 164, 289, 158),
    lab(386, 208, 'Stroma lamella'), S.lead(384, 204, 215, 171),
    lab(386, 248, 'Stroma: Calvin cycle'), S.lead(384, 244, 300, 196),
  ].join(''),
);

// 2. The thylakoid membrane: electron transport and chemiosmosis (named, or lettered A to E)
const thylakoidSvg = (lettered) => {
  const L = (name, letter, x, y, o = {}) => (lettered ? lab(x, y, letter, { a: 'middle', size: 16, w: 'bold', ...o }) : lab(x, y, name, { a: 'middle', size: 10, w: 'bold', ...o }));
  const complexes = [
    S.rect(50, 100, 60, 76, { rx: 8, fill: BLUE, fop: 0.3, sw: 1.5 }),
    S.rect(180, 104, 44, 68, { rx: 8, fill: YEL, fop: 0.3, sw: 1.5 }),
    S.rect(290, 100, 60, 76, { rx: 8, fill: BLUE, fop: 0.3, sw: 1.5 }),
    S.circle(380, 172, 17, { fill: RED, fop: 0.3, sw: 1.5 }),
    S.rect(432, 110, 40, 62, { rx: 6, fill: GREEN, fop: 0.3, sw: 1.5 }),
    S.circle(452, 188, 17, { fill: GREEN, fop: 0.45, sw: 1.5 }),
  ];
  const names = lettered
    ? [L('', 'D', 80, 144), L('', 'C', 202, 144), L('', 'B', 320, 144), L('', 'E', 380, 178), L('', 'A', 452, 146)]
    : [L('Photosystem II', '', 80, 194), L('Cytochrome b₆f', '', 202, 194), L('Photosystem I', '', 320, 194), L('NADP reductase', '', 346, 212), L('ATP synthase', '', 452, 222)];
  return svgDoc(
    540,
    272,
    lettered
      ? 'The thylakoid membrane with five protein complexes labelled A to E in scrambled order, lumen above and stroma below. Light strikes two complexes; one splits water and releases protons into the lumen; one pumps protons into the lumen as electrons pass; one reduces NADP plus to NADPH on the stroma side; and one lets protons flow out to the stroma to make ATP'
      : 'The thylakoid membrane, lumen above and stroma below. Light excites photosystem II, which splits water, releasing oxygen, protons and electrons. Electrons pass through plastoquinone, the cytochrome b6f complex, plastocyanin and photosystem I, which is excited by light again, then through ferredoxin to NADP reductase, which makes NADPH on the stroma side. The cytochrome complex pumps protons into the lumen, and the proton gradient drives ATP synthase, which makes ATP in the stroma',
    [
      S.rect(20, 126, 500, 30, { fill: GREEN, fop: 0.2, sw: 1.2 }),
      ...complexes,
      ...names,
      lab(24, 22, 'Thylakoid lumen (H⁺ build up here)', { size: 10, c: MUT }), lab(24, 262, 'Stroma', { size: 10, c: MUT }),
      S.arrow(64, 36, 64, 98, { c: ACC, w: 2.4 }), lab(72, 40, 'Light', { size: 10, c: ACC }),
      S.arrow(304, 36, 304, 98, { c: ACC, w: 2.4 }), lab(312, 40, 'Light', { size: 10, c: ACC }),
      ...(lettered ? [] : [lab(118, 74, '2 H₂O → 4 H⁺ + O₂', { size: 10 })]),
      S.arrow(110, 150, 178, 150, { c: BLUE, w: 1.6, dash: '4 3', size: 6 }), S.arrow(224, 150, 288, 150, { c: BLUE, w: 1.6, dash: '4 3', size: 6 }), S.arrow(350, 158, 366, 166, { c: BLUE, w: 1.6, dash: '4 3', size: 6 }),
      lab(144, 144, 'e⁻', { a: 'middle', size: 10, c: BLUE }), lab(256, 144, 'e⁻', { a: 'middle', size: 10, c: BLUE }),
      S.arrow(150, 204, 150, 110, { c: RED, w: 1.6, size: 6 }), lab(116, 222, 'H⁺ pumped', { a: 'middle', size: 10, c: RED }), lab(116, 235, 'into lumen', { a: 'middle', size: 10, c: RED }),
      S.arrow(452, 70, 452, 108, { c: RED, w: 1.6, size: 6 }), lab(458, 66, 'H⁺ flows out', { size: 10, c: RED }),
      ...(lettered ? [] : [lab(346, 226, 'NADP⁺ → NADPH', { a: 'middle', size: 10 }), lab(452, 238, 'ADP + Pi → ATP', { a: 'middle', size: 10 }), lab(452, 251, 'in the stroma', { a: 'middle', size: 10 })]),
    ].join(''),
  );
};
export const THYLAKOID = thylakoidSvg(false);
/** Lettered: A ATP synthase, B photosystem I, C cytochrome b6f, D photosystem II, E NADP reductase. */
export const THYLAKOID_LETTERED = thylakoidSvg(true);

// 3. The Z scheme
const zp = (x, y, c = BLUE) => S.circle(x, y, 4, { fill: c, sw: 0 });
export const ZSCHEME = svgDoc(
  540,
  300,
  'The Z scheme: electron flow in non-cyclic photophosphorylation drawn against energy level. In photosystem II, light raises an electron from the reaction centre P680 to a high level; it runs downhill through pheophytin, plastoquinone, the cytochrome b6f complex and plastocyanin to photosystem I. There light raises it again from P700; it runs downhill through ferredoxin to NADP reductase, giving NADPH. Water splitting at photosystem II replaces the lost electrons and releases oxygen, and the downhill step through the cytochrome complex is coupled to ATP synthesis',
  [
    S.arrow(40, 280, 40, 18, { size: 6 }), lab(48, 22, 'Higher energy', { size: 10, c: MUT }), lab(48, 276, 'Lower energy', { size: 10, c: MUT }),
    S.arrow(100, 224, 100, 78, { c: ACC, w: 3, size: 8 }), lab(108, 150, 'Light', { size: 11, c: ACC }),
    S.arrow(342, 188, 342, 52, { c: ACC, w: 3, size: 8 }), lab(350, 120, 'Light', { size: 11, c: ACC }),
    S.path('M100 78 L152 90 L206 128 L262 160 L318 184 L342 188', { c: BLUE, w: 2 }),
    S.path('M342 52 L396 60 L434 90 L476 140', { c: BLUE, w: 2 }),
    zp(100, 224), zp(100, 78), zp(152, 90), zp(206, 128), zp(262, 160), zp(318, 184), zp(342, 188), zp(342, 52), zp(396, 60), zp(434, 90), zp(476, 140),
    lab(120, 246, 'P680 (photosystem II)', { size: 10, w: 'bold' }),
    lab(94, 72, 'P680*', { size: 10, a: 'end' }),
    lab(158, 72, 'Pheophytin', { size: 10, a: 'start', c: MUT }),
    lab(212, 122, 'Plastoquinone', { size: 10 }),
    lab(256, 178, 'Cytochrome b₆f', { size: 10, a: 'end' }),
    lab(318, 204, 'Plastocyanin', { size: 10, a: 'middle', c: MUT }),
    lab(352, 222, 'P700 (photosystem I)', { size: 10, w: 'bold' }),
    lab(336, 48, 'P700*', { size: 10, a: 'end' }),
    lab(404, 54, 'Ferredoxin', { size: 10, c: MUT }),
    lab(482, 156, 'NADP reductase', { size: 10, a: 'end' }), lab(484, 172, 'NADP⁺ → NADPH', { size: 10, w: 'bold', a: 'end' }),
    S.path('M262 160 L262 254 L300 254 L300 258', { c: RED, w: 1.2, dash: '3 3' }), lab(300, 268, 'Proton gradient builds;', { size: 10, a: 'middle', c: RED }), lab(300, 281, 'ATP made at ATP synthase', { size: 10, a: 'middle', c: RED }),
    S.arrow(112, 274, 102, 232, { c: GREEN, w: 1.4, size: 6 }), lab(120, 292, 'H₂O → ½ O₂ + 2 H⁺ + 2 e⁻', { size: 10, c: GREEN }),
  ].join(''),
);

// 4. Calvin cycle (three turns)
const t = TURN;
export const CALVIN_SVG = svgDoc(
  540,
  310,
  `The Calvin cycle, shown for three turns. Carboxylation: ${t.rubp} RuBP (5 carbons each) combine with ${t.co2} CO2 (catalysed by RuBisCO) to give ${t.pga} molecules of 3-phosphoglycerate (3 carbons each). Reduction: ${t.pga} ATP and ${t.pga} NADPH reduce them to ${t.g3p} molecules of glyceraldehyde 3-phosphate (G3P). Regeneration: ${t.regenerated} of the G3P and ${CALVIN.regenAtp * t.co2} ATP regenerate the ${t.rubp} RuBP; ${t.exported} G3P leaves as the net gain. Totals for three turns: ${t.atp} ATP and ${t.nadph} NADPH`,
  [
    box(150, 22, 240, 56, ['1. Carboxylation (in the stroma)', `${t.rubp} RuBP (5C) + ${t.co2} CO₂`, `RuBisCO → ${t.pga} PGA (3C)`], BLUE, { bold: true }),
    box(330, 196, 200, 64, ['2. Reduction', `${t.pga} PGA + ${t.pga} ATP + ${t.pga} NADPH`, `→ ${t.g3p} G3P (3C)`], GREEN, { bold: true }),
    box(10, 196, 200, 64, ['3. Regeneration', `${t.regenerated} G3P + ${CALVIN.regenAtp * t.co2} ATP`, `→ ${t.rubp} RuBP (5C)`], YEL, { bold: true }),
    S.arrow(388, 56, 432, 192, { c: BLUE, w: 2, size: 8 }),
    S.arrow(326, 240, 214, 240, { c: GREEN, w: 2, size: 8 }),
    S.arrow(108, 192, 154, 62, { c: BRN, w: 2, size: 8 }),
    S.arrow(470, 262, 470, 290, { c: ACC, w: 2, size: 7 }), lab(478, 280, `${t.exported} G3P out`, { size: 10, c: ACC }), lab(478, 293, '(net gain)', { size: 10, c: ACC }),
    S.arrow(272, 8, 272, 20, { size: 5 }), lab(278, 14, `${t.co2} CO₂ in`, { size: 10 }),
    lab(270, 140, 'Calvin cycle', { a: 'middle', size: 15, w: 'bold' }),
    lab(270, 158, `Three turns: ${t.atp} ATP and ${t.nadph} NADPH`, { a: 'middle', size: 11 }),
    lab(270, 174, `Per CO₂: ${CALVIN.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH`, { a: 'middle', size: 11 }),
    lab(270, 296, 'Carbon check: 15 + 3 = 18 carbons in; 6 × 3 = 18 carbons out', { a: 'middle', size: 10, c: MUT }),
  ].join(''),
);

// 5. C4 pathway across mesophyll and bundle sheath cells
export const C4_SVG = svgDoc(
  560,
  330,
  `The C4 pathway across two cell types. In a mesophyll cell, PEP (3 carbons) combines with CO2 (catalysed by PEP carboxylase) to form oxaloacetate (4 carbons), which becomes malate. Malate moves through a thick wall into a bundle sheath cell, where it releases CO2 and forms pyruvate (3 carbons). The CO2 enters the Calvin cycle (RuBisCO) in the bundle sheath cell to make sugar. Pyruvate returns to the mesophyll cell and is turned back into PEP using ${C4.extraAtp} ATP`,
  [
    S.rect(20, 40, 250, 270, { rx: 14, fill: GREEN, fop: 0.1, sw: 1.8 }), lab(30, 32, 'Mesophyll cell', { w: 'bold' }),
    S.rect(290, 40, 250, 270, { rx: 14, fill: YEL, fop: 0.1, sw: 1.8 }), S.line(280, 36, 280, 314, { c: BRN, w: 5 }), lab(300, 32, 'Bundle sheath cell', { w: 'bold' }),
    lab(280, 328, 'Thick wall', { a: 'middle', size: 10, c: BRN }),
    box(36, 90, 84, 34, ['PEP', '(3C)'], BLUE, { bold: true }), box(150, 90, 84, 34, ['Oxaloacetate', '(4C)'], BLUE, { bold: true }),
    S.arrow(120, 107, 148, 107, { size: 6 }), S.arrow(130, 52, 130, 100, { c: ACC, w: 1.6, size: 6 }), lab(136, 62, 'CO₂ from air', { size: 10, c: ACC }),
    lab(176, 144, 'PEP carboxylase', { size: 10, a: 'middle', c: MUT }),
    S.arrow(192, 126, 192, 178, { size: 6 }),
    box(150, 180, 84, 34, ['Malate', '(4C)'], BLUE, { bold: true }),
    S.arrow(236, 197, 304, 197, { size: 7 }),
    box(306, 180, 84, 34, ['Malate', '(4C)'], BLUE, { bold: true }),
    S.arrow(348, 216, 348, 250, { size: 6 }),
    box(306, 252, 100, 34, ['Pyruvate (3C)', '+ CO₂ released'], BLUE, { bold: true }),
    S.arrow(396, 250, 424, 226, { c: ACC, w: 1.6, size: 6 }),
    box(420, 150, 108, 76, ['Calvin cycle', 'in bundle sheath', 'RuBisCO'], GREEN, { bold: true }),
    S.arrow(474, 228, 474, 296, { c: GREEN, w: 1.8, size: 7 }), lab(480, 300, 'Sugar', { size: 10, c: GREEN, w: 'bold' }),
    S.arrow(304, 270, 126, 270, { c: BRN, w: 1.8, size: 7 }),
    box(36, 253, 90, 34, ['Pyruvate', '(3C)'], BLUE, { bold: true }),
    S.arrow(74, 250, 74, 128, { c: BRN, w: 1.6, size: 6 }), lab(80, 188, `${C4.extraAtp} ATP`, { size: 10, c: BRN }), lab(80, 201, 'to make PEP', { size: 10, c: BRN }),
  ].join(''),
);

// 6. Blackman: rate against light for three conditions (computed with rate())
const GX0 = 60, GY0 = 232, GXS = 8, GYS = 4;
const curve = (C, T) => {
  const pts = [];
  for (let L = 0; L <= 40; L += 0.5) pts.push(`${pts.length ? 'L' : 'M'}${(GX0 + L * GXS).toFixed(1)} ${(GY0 - rate(L, C, T) * GYS).toFixed(1)}`);
  return pts.join(' ');
};
export const BLACKMAN = svgDoc(
  500,
  290,
  'Graph of rate of photosynthesis against light intensity (percent of full sunlight) for three conditions, in arbitrary units. At low light every curve rises together, so light is limiting. Each curve then levels off at a height set by the next limiting factor: carbon dioxide at 300 microlitres per litre gives the lowest plateau, 450 gives a higher plateau, and 450 at a hot 45 degrees Celsius is held down by temperature. This illustrates Blackman’s law of limiting factors',
  [
    S.arrow(GX0, GY0, GX0, 22, { size: 6 }), S.arrow(GX0 - 4, GY0, 460, GY0, { size: 6 }),
    ...[0, 10, 20, 30, 40].map((L) => S.line(GX0 + L * GXS, GY0, GX0 + L * GXS, GY0 + 5) + lab(GX0 + L * GXS, GY0 + 18, String(L), { a: 'middle', size: 10 })),
    ...[0, 10, 20, 30, 40].map((v) => S.line(GX0 - 5, GY0 - v * GYS, GX0, GY0 - v * GYS) + lab(GX0 - 9, GY0 - v * GYS + 4, String(v), { a: 'end', size: 10 })),
    lab(GX0 + 150, GY0 + 36, 'Light intensity (percent of full sunlight)', { a: 'middle', size: 10 }),
    lab(GX0 + 4, 16, 'Rate of photosynthesis (arbitrary units)', { size: 10 }),
    S.path(curve(450, 25), { c: BLUE, w: 2.6 }), S.path(curve(300, 25), { c: GREEN, w: 2.6 }), S.path(curve(450, 45), { c: RED, w: 2.6 }),
    S.line(GX0 + 10 * GXS, 40, GX0 + 10 * GXS, GY0, { c: MUT, w: 0.8, dash: '3 3' }),
    lab(GX0 + 10 * GXS + 4, 84, 'about 10 percent:', { size: 10, c: MUT }), lab(GX0 + 10 * GXS + 4, 97, 'light saturates', { size: 10, c: MUT }),
    lab(GX0 + 60, 180, 'Light limiting', { size: 10, c: MUT }),
    lab(GX0 + 36 * GXS - 4, GY0 - 45 * GYS - 6, 'CO₂ 450, 25 °C', { a: 'end', size: 10, c: BLUE, w: 'bold' }),
    lab(GX0 + 36 * GXS - 4, GY0 - 30 * GYS - 6, 'CO₂ 300, 25 °C', { a: 'end', size: 10, c: GREEN, w: 'bold' }),
    lab(GX0 + 36 * GXS - 4, GY0 - 10 * GYS - 6, 'CO₂ 450, 45 °C', { a: 'end', size: 10, c: RED, w: 'bold' }),
  ].join(''),
);

// 7. Absorption spectra (schematic, from Gaussian peaks)
const AX0 = 60, AY0 = 224, AXS = 1.4, AYS = 170;
const g = (lam, mu, h, s) => h * Math.exp(-((lam - mu) ** 2) / (2 * s * s));
const spec = (peaks) => (lam) => peaks.reduce((a, [mu, h, s]) => a + g(lam, mu, h, s), 0.03);
const CHLA = spec([[430, 0.95, 16], [662, 0.8, 14]]);
const CHLB = spec([[453, 0.8, 17], [642, 0.5, 13]]);
const CAR = spec([[450, 0.6, 20], [480, 0.6, 18]]);
const spath = (f, scale = 1) => {
  const pts = [];
  for (let lam = 400; lam <= 700; lam += 3) pts.push(`${pts.length ? 'L' : 'M'}${(AX0 + (lam - 400) * AXS).toFixed(1)} ${(AY0 - Math.min(f(lam) * scale, 1.05) * AYS).toFixed(1)}`);
  return pts.join(' ');
};
export const SPECTRUM = svgDoc(
  500,
  290,
  'Schematic absorption spectra of the leaf pigments against wavelength from 400 to 700 nanometres. Chlorophyll a absorbs most in the violet-blue and the red; chlorophyll b has peaks at slightly different wavelengths; carotenoids absorb in the blue region. All absorb little in the green. The dashed action spectrum of photosynthesis, the rate at each wavelength, follows the absorption of the pigments together',
  [
    S.arrow(AX0, AY0, AX0, 20, { size: 6 }), S.arrow(AX0 - 4, AY0, 490, AY0, { size: 6 }),
    ...[400, 450, 500, 550, 600, 650, 700].map((w) => S.line(AX0 + (w - 400) * AXS, AY0, AX0 + (w - 400) * AXS, AY0 + 5) + lab(AX0 + (w - 400) * AXS, AY0 + 18, String(w), { a: 'middle', size: 10 })),
    lab(AX0 + 210, AY0 + 36, 'Wavelength (nanometres)', { a: 'middle', size: 10 }),
    lab(AX0 + 6, 16, 'Absorption (or rate of photosynthesis)', { size: 10 }),
    S.path(spath(CHLA), { c: GREEN, w: 2.6 }), S.path(spath(CHLB), { c: BLUE, w: 2.6 }), S.path(spath(CAR), { c: BRN, w: 2.6 }),
    S.path(spath((l) => CHLA(l) * 0.55 + CHLB(l) * 0.3 + CAR(l) * 0.25, 1), { c: ACC, w: 1.6, dash: '5 3' }),
    lab(AX0 + 4, 44, 'Chlorophyll a', { c: GREEN, w: 'bold', size: 10 }), S.lead(AX0 + 64, 48, AX0 + 36, 90),
    lab(AX0 + 332, 120, 'Chlorophyll b', { c: BLUE, w: 'bold', size: 10, a: 'end' }),
    lab(AX0 + 150, 112, 'Carotenoids', { c: BRN, w: 'bold', size: 10 }), S.lead(AX0 + 148, 108, AX0 + 114, 88),
    lab(AX0 + 232, 100, 'Action spectrum (dashed)', { c: ACC, size: 10 }),
    lab(AX0 + 250, 206, 'little absorbed in green', { size: 10, c: MUT, a: 'middle' }),
  ].join(''),
);

// 8. Paper chromatography of leaf pigments (named, or lettered)
const CY0 = 252, CYS = 17.5;
const chromSvg = (lettered) => {
  const order = lettered ? ['C', 'A', 'D', 'B'] : SPOTS.map(([n]) => n);
  return svgDoc(
    480,
    300,
    lettered
      ? 'A paper chromatogram of leaf pigments with four bands labelled A to D from a green leaf extract. The origin is at zero centimetres and the solvent front at twelve centimetres, with a ruler marked in centimetres beside the strip. Band C is highest, then A, then D, and B is lowest'
      : 'A paper chromatogram of leaf pigments, with the origin at zero and the solvent front at twelve centimetres, and a ruler in centimetres beside the strip. From the top: carotenoids (yellow to yellow-orange), xanthophylls (yellow), chlorophyll a (bright or blue green) and chlorophyll b (yellow green); chlorophyll b travelled the least',
    [
      S.rect(80, 34, 110, 236, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.4 }),
      S.line(80, CY0, 190, CY0, { c: MUT, w: 1, dash: '4 3' }), lab(196, CY0 + 4, 'Origin', { size: 10, c: MUT }),
      S.line(80, CY0 - SOLVENT_FRONT * CYS, 190, CY0 - SOLVENT_FRONT * CYS, { c: BLUE, w: 1.2, dash: '4 3' }), lab(196, CY0 - SOLVENT_FRONT * CYS - 6, 'Solvent front (12 cm)', { size: 10, c: BLUE }),
      ...Array.from({ length: 13 }, (_, i) => S.line(66, CY0 - i * CYS, 78, CY0 - i * CYS, { w: 1 }) + (i % 2 === 0 ? lab(62, CY0 - i * CYS + 4, String(i), { a: 'end', size: 10 }) : '')),
      lab(40, 24, 'cm', { size: 10 }),
      ...SPOTS.map(([n, d, c], i) => {
        const y = CY0 - d * CYS;
        const col = i < 2 ? YEL : GREEN;
        return S.ellipse(135, y, 42, 6, { fill: col, fop: i === 3 ? 0.35 : 0.7, c: col, sw: 1 }) + S.lead(180, y, 250, y) + lab(256, y + 4, lettered ? order[i] : `${n} (${c}), Rf ${rf(d)}`, { size: lettered ? 15 : 10, w: lettered ? 'bold' : undefined });
      }),
    ].join(''),
  );
};
export const CHROMATOGRAM = chromSvg(false);
/** Lettered, top to bottom: C carotenoids, A xanthophylls, D chlorophyll a, B chlorophyll b. */
export const CHROMATOGRAM_LETTERED = chromSvg(true);

export const ALL = { CHLOROPLAST, THYLAKOID, THYLAKOID_LETTERED, ZSCHEME, CALVIN_SVG, C4_SVG, BLACKMAN, SPECTRUM, CHROMATOGRAM, CHROMATOGRAM_LETTERED };
