// SVG diagrams for ch12 Respiration in Plants (allow-listed elements, palette colours only). Schematics, not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { GLYC, LINK, TCA, CONV, atpFrom, perGlucoseTca } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BRN = 'var(--diagram-brown)';
const box = (x, y, w, h, lines, c, o = {}) =>
  S.rect(x, y, w, h, { rx: 5, fill: c, fop: o.fop ?? 0.16, sw: 1.3 }) +
  lines.map((t, i) => lab(x + w / 2, y + h / 2 + 4 - ((lines.length - 1) * 6.5) + i * 13, t, { a: 'middle', size: o.size ?? 10, w: i === 0 && o.bold ? 'bold' : undefined })).join('');

// 1. Glycolysis
const gx = 30, gw = 210;
const gstep = (y, text, c = BLUE) => box(gx, y, gw, 26, [text], c, { size: 10 });
const garrow = (y1, y2, note, c = RED) => S.arrow(gx + gw / 2, y1, gx + gw / 2, y2, { size: 6 }) + (note ? lab(gx + gw / 2 + 10, (y1 + y2) / 2 + 4, note, { size: 10, c }) : '');
export const GLYCOLYSIS = svgDoc(
  540,
  400,
  `Glycolysis in the cytoplasm. Glucose (6 carbons) is phosphorylated using ATP to glucose 6-phosphate, isomerised to fructose 6-phosphate, and phosphorylated again using a second ATP to fructose 1,6-bisphosphate, which splits into two 3-carbon sugar phosphates (PGAL). Each PGAL is oxidised, reducing NAD plus to NADH, to 1,3-bisphosphoglyceric acid; two later steps make ATP by substrate-level phosphorylation, ending in pyruvic acid. Per glucose: ${GLYC.atpIn} ATP used, ${GLYC.atpOut} ATP made, a net of ${GLYC.netAtp} ATP, ${GLYC.nadh} NADH and ${GLYC.pyruvate} pyruvic acid`,
  [
    gstep(8, 'Glucose (6C)'), garrow(34, 52, 'ATP → ADP: uses 1 ATP'), gstep(52, 'Glucose 6-phosphate'), garrow(78, 96, ''), gstep(96, 'Fructose 6-phosphate'),
    garrow(122, 140, 'ATP → ADP: uses 1 ATP'), gstep(140, 'Fructose 1,6-bisphosphate'), garrow(166, 184, 'splits into two 3C molecules', MUT),
    gstep(184, '2 × PGAL (3-phosphoglyceraldehyde, 3C)', GREEN), garrow(210, 228, '2 NAD⁺ → 2 NADH', BRN), gstep(228, '2 × 1,3-bisphosphoglyceric acid', GREEN),
    garrow(254, 272, '2 ADP → 2 ATP', RED), gstep(272, '2 × 3-phosphoglyceric acid', GREEN), garrow(298, 316, 'several steps', MUT), gstep(316, '2 × Phosphoenol pyruvate (PEP)', GREEN),
    garrow(342, 360, '2 ADP → 2 ATP', RED), gstep(360, '2 × Pyruvic acid (3C)', YEL),
    box(290, 150, 230, 130, ['Per glucose', `ATP used: ${GLYC.atpIn}`, `ATP made: ${GLYC.atpOut}`, `Net gain: ${GLYC.netAtp} ATP`, `${GLYC.nadh} NADH, ${GLYC.pyruvate} pyruvic acid`, 'Site: cytoplasm; no O₂ needed'], YEL, { bold: true, size: 11 }),
    lab(300, 132, 'Embden–Meyerhof–Parnas (EMP) pathway', { size: 10, c: MUT }),
  ].join(''),
);

// 2. Fates of pyruvic acid
export const FATES = svgDoc(
  540,
  270,
  'Fates of pyruvic acid. Without oxygen it undergoes fermentation: in yeast it is converted to ethanol and carbon dioxide by pyruvic acid decarboxylase and alcohol dehydrogenase, and in animal muscle cells it is reduced to lactic acid by lactate dehydrogenase, with NADH oxidised back to NAD plus. With oxygen it enters the mitochondria, where it is oxidised to acetyl CoA, then fully to carbon dioxide and water by the Krebs cycle and the electron transport system',
  [
    box(10, 100, 120, 56, ['Pyruvic acid', 'from glycolysis'], YEL, { bold: true }),
    S.arrow(130, 112, 200, 50, { size: 7 }), S.arrow(130, 128, 200, 128, { size: 7 }), S.arrow(130, 146, 200, 210, { size: 7 }),
    box(204, 22, 160, 52, ['Lactic acid', 'lactate dehydrogenase'], BLUE, { bold: true }), lab(372, 40, 'Muscle cells, no O₂', { size: 10 }), lab(372, 54, 'NADH → NAD⁺', { size: 10, c: BRN }),
    box(204, 102, 160, 52, ['Ethanol + CO₂', 'pyruvic acid decarboxylase,', 'alcohol dehydrogenase'], GREEN, { bold: true, size: 10 }), lab(372, 120, 'Yeast, no O₂', { size: 10 }), lab(372, 134, 'NADH → NAD⁺', { size: 10, c: BRN }),
    box(204, 184, 160, 52, ['Acetyl CoA → Krebs cycle', 'CO₂ + H₂O'], RED, { bold: true }), lab(372, 202, 'Mitochondria, O₂ present', { size: 10 }), lab(372, 216, 'much more ATP', { size: 10, c: RED }),
    lab(130, 256, 'Fermentation: anaerobic, in the cytoplasm', { size: 10, c: MUT }),
  ].join(''),
);

// 3. Krebs (TCA) cycle
const TN = [['Oxaloacetic acid (4C)'], ['Citric acid (6C)'], ['Isocitric acid (6C)'], ['α-Ketoglutaric acid (5C)'], ['Succinyl CoA (4C)'], ['Succinic acid (4C)'], ['Fumaric acid (4C)'], ['Malic acid (4C)']];
const tpos = (i) => [270 + 140 * Math.cos(((-90 + 45 * i) * Math.PI) / 180), 168 + 124 * Math.sin(((-90 + 45 * i) * Math.PI) / 180)];
export const KREBS = svgDoc(
  540,
  340,
  `The citric acid (Krebs) cycle in the mitochondrial matrix. Acetyl CoA (2 carbons) joins oxaloacetic acid (4 carbons) to form citric acid (6 carbons), then isocitric acid. Oxidative decarboxylation to alpha-ketoglutaric acid (5 carbons) and then succinyl CoA (4 carbons) each release CO2 and NADH. Succinyl CoA gives succinic acid with substrate-level phosphorylation of ATP (via GTP); succinic acid gives fumaric acid and FADH2; malic acid gives oxaloacetic acid and NADH, restarting the cycle. Per acetyl CoA: ${TCA.nadh} NADH, ${TCA.fadh2} FADH2, ${TCA.atp} ATP and ${TCA.co2} CO2`,
  [
    ...TN.map(([t], i) => {
      const [x, y] = tpos(i);
      return S.rect(x - 66, y - 11, 132, 22, { rx: 5, fill: i === 0 ? YEL : BLUE, fop: 0.18, sw: 1.2 }) + lab(x, y + 4, t, { a: 'middle', size: 10 });
    }),
    ...TN.map((_, i) => {
      const [x1, y1] = tpos(i);
      const [x2, y2] = tpos((i + 1) % 8);
      const dx = x2 - x1, dy = y2 - y1;
      return S.arrow(x1 + dx * 0.34, y1 + dy * 0.34, x1 + dx * 0.66, y1 + dy * 0.66, { size: 5, c: MUT });
    }),
    lab(440, 36, 'Acetyl CoA (2C)', { size: 10, w: 'bold', c: ACC }), S.arrow(440, 42, 340, 70, { c: ACC, w: 1.6, size: 6 }), lab(446, 50, 'CoA released', { size: 10, c: MUT }),
    lab(444, 208, 'CO₂ + NADH', { size: 10, c: BRN }),
    lab(372, 304, 'CO₂ + NADH', { size: 10, c: BRN }),
    lab(110, 302, 'ATP (via GTP)', { size: 10, c: RED }),
    lab(40, 226, 'FADH₂', { size: 10, c: BRN }),
    lab(120, 56, 'NADH', { size: 10, c: BRN }),
    lab(270, 160, 'Krebs cycle', { a: 'middle', size: 14, w: 'bold' }),
    lab(270, 178, 'in the mitochondrial matrix', { a: 'middle', size: 10, c: MUT }),
    lab(270, 196, `Per acetyl CoA: ${TCA.nadh} NADH, ${TCA.fadh2} FADH₂, ${TCA.atp} ATP, ${TCA.co2} CO₂`, { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Mitochondrion
export const MITO = svgDoc(
  560,
  290,
  'Section of a mitochondrion. A smooth outer membrane encloses an intermembrane space; the inner membrane is folded inwards into cristae, which carry the electron transport system and ATP synthase, and encloses the matrix, where the link reaction and the Krebs cycle take place. Glycolysis takes place outside, in the cytoplasm',
  [
    S.ellipse(190, 150, 175, 105, { fill: BLUE, fop: 0.07, sw: 2.6 }),
    S.ellipse(190, 150, 160, 90, { fill: YEL, fop: 0.08, sw: 1.6 }),
    ...[110, 160, 210, 260].map((x) => S.rect(x, 62, 20, 60, { rx: 10, fill: YEL, fop: 0.25, sw: 1.4 }) + S.rect(x + 25, 180, 20, 60, { rx: 10, fill: YEL, fop: 0.25, sw: 1.4 })),
    lab(30, 20, 'Glycolysis: cytoplasm (outside the mitochondrion)', { size: 10, c: MUT }),
    lab(392, 40, 'Outer membrane'), S.lead(390, 36, 310, 70),
    lab(392, 80, 'Intermembrane space'), S.lead(390, 76, 335, 112),
    lab(392, 120, 'Inner membrane: electron'), lab(392, 134, 'transport and ATP synthase'), S.lead(390, 116, 344, 150),
    lab(392, 176, 'Cristae (folds of'), lab(392, 190, 'the inner membrane)'), S.lead(390, 172, 296, 214),
    lab(392, 224, 'Matrix: link reaction and'), lab(392, 238, 'Krebs cycle'), S.lead(390, 220, 200, 150),
  ].join(''),
);

// 5. Electron transport system (named or lettered)
const etsSvg = (lettered) => {
  const L = (name, letter, x, y, o = {}) => (lettered ? lab(x, y, letter, { a: 'middle', size: 16, w: 'bold', ...o }) : '');
  const nm = (lines, x, y) => (lettered ? '' : lines.map((t, i) => lab(x, y + i * 13, t, { a: 'middle', size: 10, w: i === 0 ? 'bold' : undefined })).join(''));
  return svgDoc(
    540,
    290,
    lettered
      ? 'The inner mitochondrial membrane with the intermembrane space above and the matrix below, showing five components labelled A to E in scrambled order along the electron path: two protein complexes that pump protons and receive electrons, a small mobile carrier between complexes, the complex that passes electrons to oxygen, and ATP synthase with a knob on the matrix side'
      : 'The electron transport system in the inner mitochondrial membrane, intermembrane space above and matrix below. NADH gives electrons to complex I (NADH dehydrogenase) and FADH2 to complex II (succinate dehydrogenase); both pass them to ubiquinone, then to complex III (cytochrome bc1), cytochrome c and complex IV (cytochrome c oxidase), which passes them to oxygen to form water. Complexes I, III and IV pump protons into the intermembrane space, and the proton gradient drives ATP synthase (F0 and F1) to make ATP from ADP and phosphate',
    [
      S.rect(20, 118, 500, 34, { fill: GREEN, fop: 0.2, sw: 1.2 }),
      S.rect(40, 96, 56, 78, { rx: 8, fill: BLUE, fop: 0.3, sw: 1.5 }), S.rect(112, 110, 36, 50, { rx: 6, fill: BLUE, fop: 0.18, sw: 1.3 }),
      S.circle(170, 135, 9, { fill: YEL, fop: 0.5, sw: 1.3 }),
      S.rect(206, 100, 50, 74, { rx: 8, fill: BLUE, fop: 0.3, sw: 1.5 }),
      S.circle(292, 108, 9, { fill: YEL, fop: 0.5, sw: 1.3 }),
      S.rect(326, 100, 52, 74, { rx: 8, fill: BLUE, fop: 0.3, sw: 1.5 }),
      S.rect(430, 104, 40, 62, { rx: 6, fill: GREEN, fop: 0.3, sw: 1.5 }), S.circle(450, 186, 17, { fill: GREEN, fop: 0.45, sw: 1.5 }),
      S.arrow(84, 170, 84, 104, { c: RED, w: 1.5, size: 6 }), S.arrow(246, 170, 246, 108, { c: RED, w: 1.5, size: 6 }), S.arrow(368, 170, 368, 108, { c: RED, w: 1.5, size: 6 }),
      S.arrow(450, 64, 450, 102, { c: RED, w: 1.5, size: 6 }),
      S.arrow(96, 140, 158, 140, { c: BLUE, w: 1.5, dash: '4 3', size: 6 }), S.arrow(148, 148, 160, 143, { c: BLUE, w: 1.3, dash: '4 3', size: 5 }), S.arrow(180, 138, 204, 138, { c: BLUE, w: 1.5, dash: '4 3', size: 6 }),
      S.arrow(256, 124, 284, 112, { c: BLUE, w: 1.5, dash: '4 3', size: 6 }), S.arrow(300, 112, 324, 126, { c: BLUE, w: 1.5, dash: '4 3', size: 6 }),
      lab(24, 22, 'Intermembrane space (H⁺ build up here)', { size: 10, c: MUT }), lab(24, 280, 'Matrix', { size: 10, c: MUT }),
      lab(380, 56, 'H⁺ pumped out by complexes I, III and IV', { size: 10, c: RED, a: 'end' }),
      lab(458, 62, 'H⁺ flows back', { size: 10, c: RED }),
      L('', 'B', 60, 142), L('', 'D', 224, 142), L('', 'E', 292, 112, { size: 14 }), L('', 'A', 344, 142), L('', 'C', 450, 140),
      nm(['Complex I', 'NADH dehydrogenase'], 68, 74), nm(['Complex III', 'cytochrome bc1'], 231, 74), nm(['ATP synthase', 'F₀ channel, F₁ knob'], 450, 220),
      nm(['Cyt c'], 292, 90), nm(['Complex II', 'succinate dehydrogenase'], 130, 196), nm(['Complex IV', 'cytochrome c oxidase'], 352, 196), nm(['Ubiquinone'], 170, 168),
      ...(lettered ? [] : [lab(24, 224, 'NADH → NAD⁺ + H⁺', { size: 10, c: BRN }), lab(150, 246, 'FADH₂ → FAD', { size: 10, c: BRN }), lab(300, 240, '½ O₂ + 2 H⁺ → H₂O', { size: 10, c: BRN }), lab(500, 262, 'ADP + Pi → ATP', { size: 10, c: RED, a: 'end' })]),
    ].join(''),
  );
};
export const ETS = etsSvg(false);
/** Lettered: A complex IV, B complex I, C ATP synthase, D complex III, E cytochrome c. */
export const ETS_LETTERED = etsSvg(true);

// 6. ATP balance sheet (computed)
const SRC = [
  ['Glycolysis', GLYC.netAtp, atpFrom(GLYC.nadh, 0)],
  ['Link reaction', 0, atpFrom(LINK.nadh, 0)],
  ['Krebs cycle', perGlucoseTca('atp'), atpFrom(perGlucoseTca('nadh'), perGlucoseTca('fadh2'))],
];
const BX0 = 70, BY0 = 236, BS = 5.4;
export const ATP_BARS = svgDoc(
  520,
  300,
  `Bar chart of the ATP gained per glucose in complete aerobic respiration using the textbook convention of ${CONV.nadh} ATP per NADH and ${CONV.fadh2} per FADH2. Glycolysis gives ${SRC[0][1] + SRC[0][2]} ATP (${SRC[0][1]} by substrate-level phosphorylation), the link reaction ${SRC[1][2]}, and the Krebs cycle ${SRC[2][1] + SRC[2][2]} (${SRC[2][1]} by substrate-level phosphorylation); the total is ${SRC.reduce((s, [, a, b]) => s + a + b, 0)} ATP`,
  [
    S.arrow(BX0, BY0, BX0, 20, { size: 6 }), S.arrow(BX0 - 4, BY0, 500, BY0, { size: 6 }),
    ...[0, 10, 20, 30, 40].map((v) => S.line(BX0 - 5, BY0 - v * BS, BX0, BY0 - v * BS) + lab(BX0 - 9, BY0 - v * BS + 4, String(v), { a: 'end', size: 10 })),
    lab(BX0 + 4, 16, 'ATP per glucose', { size: 10 }),
    ...[...SRC, ['Total', SRC.reduce((s, r) => s + r[1], 0), SRC.reduce((s, r) => s + r[2], 0)]].map(([n, sub, ox], i) => {
      const x = BX0 + 24 + i * 98;
      return S.rect(x, BY0 - sub * BS, 60, sub * BS, { fill: BLUE, fop: 0.5, sw: 1 }) + S.rect(x, BY0 - (sub + ox) * BS, 60, ox * BS, { fill: GREEN, fop: 0.5, sw: 1 }) +
        lab(x + 30, BY0 - (sub + ox) * BS - 6, String(sub + ox), { a: 'middle', w: 'bold' }) + lab(x + 30, BY0 + 18, n, { a: 'middle', size: 10 });
    }),
    S.rect(110, 40, 12, 10, { fill: BLUE, fop: 0.5, sw: 1 }), lab(128, 49, 'Substrate-level phosphorylation', { size: 10 }),
    S.rect(110, 58, 12, 10, { fill: GREEN, fop: 0.5, sw: 1 }), lab(128, 67, 'Oxidative phosphorylation', { size: 10 }),
    lab(BX0 + 4, 276, `Convention: ${CONV.nadh} ATP per NADH, ${CONV.fadh2} ATP per FADH₂`, { size: 10, c: MUT }),
  ].join(''),
);

export const ALL = { GLYCOLYSIS, FATES, KREBS, MITO, ETS, ETS_LETTERED, ATP_BARS };
