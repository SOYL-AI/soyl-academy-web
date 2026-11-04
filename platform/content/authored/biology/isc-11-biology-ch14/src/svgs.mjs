// SVG diagrams for ISC 11 Biology ch14 Respiration in Plants. Counts come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { GLY, KREBS1, KREBS2, LINK2, TOTAL, Y } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const box = (cx, cy, w, h, t, c = 'var(--diagram-fill)', o = {}) => S.rect(cx - w / 2, cy - h / 2, w, h, { rx: 4, fill: c, fop: o.fop ?? 0.5, sw: 1.2 }) + S.text(cx, cy + 4, t, { a: 'middle', size: o.size ?? 11 });
const box2 = (cx, cy, w, h, l1, l2, c = 'var(--diagram-fill)', fop = 0.5) => S.rect(cx - w / 2, cy - h / 2, w, h, { rx: 4, fill: c, fop, sw: 1.2 }) + S.text(cx, cy - 2, l1, { a: 'middle', size: 11, w: 'bold' }) + S.text(cx, cy + 12, l2, { a: 'middle', size: 10 });

// ---------------------------------------------------------------- 1. Mitochondrion (labelled and lettered)
const f1 = (n) => Math.round(n * 10) / 10;
const yTop = (x) => 125 - 73 * Math.sqrt(1 - ((x - 165) / 133) ** 2);
const yBot = (x) => 125 + 73 * Math.sqrt(1 - ((x - 165) / 133) ** 2);
function mito(letters) {
  const label = (y, name, letter, tx, ty) => (letters ? tag(350, y - 4, letter) + S.lead(341, y - 4, tx, ty) : lab(338, y, name) + S.lead(336, y - 4, tx, ty));
  // each crista is an infolding: the inner membrane itself runs inward and back, so both ends of the fold are part of the membrane
  const fold = (x, yb, yEnd) => {
    const s = yEnd > yb ? 1 : -1;
    return S.path(`M${x - 6} ${f1(yb - s * 2)} L${x - 6} ${f1(yEnd - s * 5)} Q${x - 6} ${f1(yEnd)} ${x} ${f1(yEnd)} Q${x + 6} ${f1(yEnd)} ${x + 6} ${f1(yEnd - s * 5)} L${x + 6} ${f1(yb - s * 2)}`, { fill: 'var(--diagram-accent)', fop: 0.2, w: 1.5 });
  };
  const topFolds = [90, 130, 170, 210, 250].map((x) => fold(x, yTop(x), 150));
  const botFolds = [110, 150, 190, 230].map((x) => fold(x, yBot(x), 100));
  return [
    S.ellipse(165, 125, 145, 85, { fill: 'var(--diagram-yellow)', fop: 0.12, sw: 2.5 }),
    S.ellipse(165, 125, 133, 73, { fill: 'var(--diagram-green)', fop: 0.1, sw: 1.5 }),
    ...topFolds, ...botFolds,
    label(36, 'Outer membrane', 'A', 289, 82),
    label(70, 'Inner membrane', 'B', 259, 74),
    label(104, 'Cristae', 'C', 211, 130),
    label(138, 'Matrix', 'D', 268, 128),
    label(172, 'Intermembrane space', 'E', 285, 164),
  ].join('');
}
export const MITO = svgDoc(
  460,
  240,
  'Mitochondrion in section: a smooth outer membrane and an inner membrane folded into finger-like cristae; the narrow intermembrane space lies between the two membranes and the matrix fills the space inside the inner membrane. The Krebs cycle enzymes are in the matrix and the electron transport system is on the inner membrane and cristae',
  mito(false),
);
export const MITO_Q = svgDoc(
  460,
  240,
  'An unlabelled mitochondrion with five parts marked A to E: A the smooth outer boundary, B the inner membrane, C the folds of the inner membrane, D the fluid-filled space inside the inner membrane, and E the narrow space between the two membranes',
  mito(true),
);

// ---------------------------------------------------------------- 2. Glycolysis flowchart
export const GLYCO = svgDoc(
  460,
  270,
  `Glycolysis as a flowchart in the cytoplasm: one glucose (six carbon) uses ${GLY.used} ATP to become two three-carbon sugar phosphates; these are converted to ${GLY.pyruvate} pyruvate (three carbon) with the formation of ${GLY.gross} ATP and ${GLY.nadh} NADH. The net gain is ${GLY.net} ATP, ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate for each glucose`,
  [
    lab(230, 18, 'Glycolysis (EMP pathway), in the cytoplasm', { a: 'middle', w: 'bold' }),
    box(160, 46, 130, 28, 'Glucose (6 C)', 'var(--diagram-yellow)', { fop: 0.3 }),
    S.arrow(160, 62, 160, 94, { w: 2 }), sm(172, 82, `uses ${GLY.used} ATP`, { c: 'var(--diagram-red)' }),
    box(160, 112, 230, 28, '2 three-carbon sugar phosphates', 'var(--diagram-fill)'),
    S.arrow(160, 128, 160, 168, { w: 2 }), sm(172, 148, `gives ${GLY.gross} ATP and ${GLY.nadh} NADH`, { c: 'var(--diagram-green)' }),
    box(160, 186, 130, 28, `${GLY.pyruvate} Pyruvate (3 C)`, 'var(--diagram-blue)', { fop: 0.25 }),
    lab(160, 226, `Net gain per glucose: ${GLY.net} ATP, ${GLY.nadh} NADH`, { a: 'middle', w: 'bold' }),
    sm(160, 244, 'Occurs with or without oxygen', { a: 'middle', c: 'var(--diagram-muted)' }),
    S.arrow(230, 196, 330, 196, { w: 1.5 }),
    box(390, 196, 110, 28, 'Mitochondrion (O₂)', 'var(--diagram-green)', { fop: 0.2, size: 10 }),
    S.arrow(230, 180, 330, 150, { w: 1.5, dash: '4 3' }),
    box(390, 148, 110, 28, 'Fermentation (no O₂)', 'var(--diagram-red)', { fop: 0.15, size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 3. Link reaction and Krebs cycle
export const KREBS = svgDoc(
  460,
  300,
  `Link reaction and Krebs cycle as a flowchart. Each pyruvate (three carbon) loses one carbon dioxide and gives one NADH in the link reaction to form acetyl CoA (two carbon). Acetyl CoA joins oxaloacetic acid (four carbon) to form citric acid (six carbon). Round the cycle, two carbon dioxide are released, and ${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH2 and ${KREBS1.atp} ATP are formed for each acetyl CoA, and oxaloacetic acid is regenerated`,
  [
    box(70, 40, 100, 28, 'Pyruvate (3 C)', 'var(--diagram-blue)', { fop: 0.25 }),
    S.arrow(70, 56, 70, 96, { w: 2 }), sm(78, 70, 'Link reaction:', { w: 'bold' }), sm(78, 82, 'CO₂ + NADH', { c: 'var(--diagram-red)' }),
    box(70, 112, 100, 28, 'Acetyl CoA (2 C)', 'var(--diagram-yellow)', { fop: 0.3, size: 10 }),
    S.arrow(120, 112, 262, 86, { w: 1.5 }),
    box(318, 70, 110, 28, 'Citric acid (6 C)', 'var(--diagram-fill)'),
    box(410, 150, 80, 28, '5 C acid', 'var(--diagram-fill)'),
    box(318, 232, 110, 28, '4 C acids', 'var(--diagram-fill)'),
    box(220, 150, 80, 28, 'OAA (4 C)', 'var(--diagram-fill)'),
    S.arrow(372, 84, 396, 134, { w: 1.5 }), sm(452, 100, 'CO₂ + NADH', { c: 'var(--diagram-red)', a: 'end' }),
    S.arrow(406, 166, 360, 218, { w: 1.5 }), sm(452, 206, 'CO₂ + NADH', { c: 'var(--diagram-red)', a: 'end' }),
    S.arrow(266, 220, 226, 166, { w: 1.5 }), sm(96, 204, `ATP, FADH₂, NADH`, { c: 'var(--diagram-green)' }),
    S.arrow(214, 134, 268, 84, { w: 1.5 }),
    lab(318, 150, 'Krebs cycle', { a: 'middle', w: 'bold' }), sm(318, 164, '(mitochondrial matrix)', { a: 'middle', c: 'var(--diagram-muted)' }),
    sm(10, 262, `Per acetyl CoA: ${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH₂, ${KREBS1.atp} ATP, ${KREBS1.co2} CO₂.`),
    sm(10, 278, `Per glucose (two turns): ${KREBS2.nadh} NADH, ${KREBS2.fadh2} FADH₂, ${KREBS2.atp} ATP, ${KREBS2.co2} CO₂; the link reaction adds ${LINK2.nadh} NADH and ${LINK2.co2} CO₂.`),
  ].join(''),
);

// ---------------------------------------------------------------- 4. Electron transport system on the inner membrane
const cx = { I: 62, II: 128, III: 208, IV: 288, ATP: 378 };
const cplx = (x, n) => S.rect(x - 22, 106, 44, 48, { rx: 6, fill: 'var(--diagram-accent)', fop: 0.3, sw: 1.3 }) + S.text(x, 134, n, { a: 'middle', size: 12, w: 'bold' });
export const ETS = svgDoc(
  460,
  270,
  'Electron transport system and ATP synthase in the inner mitochondrial membrane. NADH gives electrons to complex I and FADH2 to complex II; electrons pass through ubiquinone to complex III, cytochrome c and complex IV, where oxygen is the final acceptor and forms water. Protons are pumped from the matrix into the intermembrane space at complexes I, III and IV; their flow back through the F0 channel of ATP synthase drives the F1 knob in the matrix to make ATP',
  [
    S.rect(10, 34, 440, 84, { fill: 'var(--diagram-blue)', fop: 0.1, sw: 0 }),
    S.rect(10, 142, 440, 108, { fill: 'var(--diagram-green)', fop: 0.1, sw: 0 }),
    S.rect(10, 118, 440, 24, { fill: 'var(--diagram-brown)', fop: 0.22, sw: 0 }),
    S.line(10, 118, 450, 118), S.line(10, 142, 450, 142),
    lab(16, 50, 'Intermembrane space: many H⁺ (protons)', { c: 'var(--diagram-blue)' }),
    lab(150, 246, 'Matrix: fewer H⁺ (protons)', { c: 'var(--diagram-green)' }),
    cplx(cx.I, 'I'), cplx(cx.II, 'II'), cplx(cx.III, 'III'), cplx(cx.IV, 'IV'),
    S.ellipse(95, 88, 17, 10, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }), sm(95, 92, 'UQ', { a: 'middle' }),
    S.ellipse(250, 88, 21, 10, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }), sm(250, 92, 'Cyt c', { a: 'middle' }),
    S.arrow(62, 104, 82, 94, { w: 1.5, size: 5 }),
    S.arrow(128, 104, 108, 94, { w: 1.5, size: 5 }),
    S.arrow(112, 88, 196, 104, { w: 1.5, size: 5 }),
    S.arrow(220, 104, 234, 94, { w: 1.5, size: 5 }),
    S.arrow(266, 92, 286, 104, { w: 1.5, size: 5 }),
    // electron donors and acceptor
    S.arrow(cx.I, 204, cx.I, 156, { w: 1.8, size: 6 }), lab(cx.I, 220, 'NADH', { a: 'middle' }), sm(cx.I, 232, '→ NAD⁺', { a: 'middle' }),
    S.arrow(cx.II, 204, cx.II, 156, { w: 1.8, size: 6 }), lab(cx.II, 220, 'FADH₂', { a: 'middle' }), sm(cx.II, 232, '→ FAD', { a: 'middle' }),
    S.arrow(cx.IV, 204, cx.IV, 156, { w: 1.8, size: 6 }), lab(cx.IV, 220, 'O₂ → H₂O', { a: 'middle', w: 'bold' }),
    // proton pumps
    S.arrow(cx.I - 14, 104, cx.I - 14, 70, { c: 'var(--diagram-red)', w: 2.2, size: 6 }),
    S.arrow(cx.III + 14, 104, cx.III + 14, 70, { c: 'var(--diagram-red)', w: 2.2, size: 6 }),
    S.arrow(cx.IV + 14, 104, cx.IV + 14, 70, { c: 'var(--diagram-red)', w: 2.2, size: 6 }),
    sm(150, 62, 'H⁺ pumped out', { c: 'var(--diagram-red)', a: 'middle' }),
    // ATP synthase
    S.rect(cx.ATP - 16, 108, 32, 36, { rx: 4, fill: 'var(--diagram-accent)', fop: 0.3, sw: 1.3 }), sm(cx.ATP, 130, 'F₀', { a: 'middle' }),
    S.circle(cx.ATP, 166, 18, { fill: 'var(--diagram-accent)', fop: 0.3, sw: 1.3 }), sm(cx.ATP, 170, 'F₁', { a: 'middle' }),
    S.arrow(cx.ATP, 76, cx.ATP, 106, { c: 'var(--diagram-red)', w: 2.2, size: 6 }), sm(cx.ATP, 66, 'H⁺ flows back', { a: 'middle', c: 'var(--diagram-red)' }),
    sm(cx.ATP, 196, 'ADP + Pi → ATP', { a: 'middle', w: 'bold' }), sm(cx.ATP, 208, 'ATP synthase', { a: 'middle' }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. Amphibolic pathway
export const AMPHI = svgDoc(
  460,
  260,
  'Respiration as an amphibolic pathway: carbohydrates (as glucose), fats (fatty acids and glycerol) and proteins (amino acids) are broken down into pyruvate, acetyl CoA or Krebs cycle intermediates, which is the catabolic side; the same intermediates are drawn off to build fatty acids, amino acids and other compounds, which is the anabolic side',
  [
    box2(230, 130, 130, 60, 'Acetyl CoA', 'and Krebs cycle', 'var(--diagram-yellow)', 0.3),
    box(66, 36, 112, 34, 'Carbohydrates', 'var(--diagram-fill)'), box(66, 130, 112, 34, 'Fats', 'var(--diagram-fill)'), box(66, 224, 112, 34, 'Proteins', 'var(--diagram-fill)'),
    S.arrow(122, 46, 168, 112, { w: 1.8 }), sm(152, 66, 'glucose, pyruvate', { size: 10 }),
    S.arrow(122, 130, 164, 130, { w: 1.8 }), sm(66, 106, 'fatty acids and glycerol', { size: 10, a: 'middle' }),
    S.arrow(122, 214, 168, 152, { w: 1.8 }), sm(82, 186, 'amino acids', { size: 10 }),
    box(394, 36, 112, 34, 'Fatty acids, lipids', 'var(--diagram-green)', { fop: 0.2, size: 10 }), box(394, 130, 112, 34, 'Amino acids', 'var(--diagram-green)', { fop: 0.2 }), box(394, 224, 112, 34, 'Pigments, nucleotides', 'var(--diagram-green)', { fop: 0.2, size: 10 }),
    S.arrow(294, 112, 338, 48, { w: 1.8, c: 'var(--diagram-green)' }),
    S.arrow(294, 130, 338, 130, { w: 1.8, c: 'var(--diagram-green)' }),
    S.arrow(294, 152, 338, 214, { w: 1.8, c: 'var(--diagram-green)' }),
    lab(66, 14, 'Catabolic (breakdown)', { a: 'middle', c: 'var(--diagram-red)', w: 'bold' }),
    lab(394, 14, 'Anabolic (building)', { a: 'middle', c: 'var(--diagram-green)', w: 'bold' }),
    lab(230, 14, 'Amphibolic', { a: 'middle', w: 'bold' }),
  ].join(''),
);

// ---------------------------------------------------------------- 6. Fates of pyruvate
export const FERM = svgDoc(
  460,
  270,
  `Fates of pyruvate. Glucose is broken down by glycolysis in the cytoplasm to pyruvate, with a net ${GLY.net} ATP. Without oxygen, pyruvate is converted by alcoholic fermentation (yeast, waterlogged roots) to ethanol and carbon dioxide, or by lactic acid fermentation (muscle, lactic acid bacteria) to lactic acid, with no further ATP. With oxygen, pyruvate enters the mitochondrion and is oxidised to carbon dioxide and water, giving ${Y.total} ATP in all for each glucose`,
  [
    box(230, 24, 120, 28, 'Glucose', 'var(--diagram-yellow)', { fop: 0.3 }),
    S.arrow(230, 38, 230, 62, { w: 2 }),
    box2(230, 84, 210, 38, 'Glycolysis (cytoplasm)', `net ${GLY.net} ATP, ${GLY.nadh} NADH`, 'var(--diagram-fill)'),
    S.arrow(230, 104, 230, 126, { w: 2 }),
    box(230, 140, 130, 28, '2 Pyruvate', 'var(--diagram-blue)', { fop: 0.25 }),
    S.arrow(170, 150, 84, 190, { w: 1.8, c: 'var(--diagram-red)' }), S.arrow(230, 156, 230, 190, { w: 1.8, c: 'var(--diagram-red)' }), S.arrow(290, 150, 376, 190, { w: 1.8, c: 'var(--diagram-green)' }),
    sm(98, 166, 'no O₂', { c: 'var(--diagram-red)' }), sm(236, 176, 'no O₂', { c: 'var(--diagram-red)' }), sm(344, 166, 'with O₂', { c: 'var(--diagram-green)' }),
    box2(80, 224, 140, 56, 'Alcoholic', '2 ethanol + 2 CO₂', 'var(--diagram-red)', 0.12),
    box2(230, 224, 130, 56, 'Lactic acid', '2 lactic acid', 'var(--diagram-red)', 0.12),
    box2(380, 224, 150, 56, 'Aerobic (mitochondrion)', `CO₂ + H₂O; ${Y.total} ATP in all`, 'var(--diagram-green)', 0.15),
  ].join(''),
);

export const ALL = { MITO, MITO_Q, GLYCO, KREBS, ETS, AMPHI, FERM };
void TOTAL;
