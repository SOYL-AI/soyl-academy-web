// SVG diagrams for ch08 Microbes in Human Welfare (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { STAGES, pctFall } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const box = (x, y, w, h, lines, fill) => S.rect(x, y, w, h, { rx: 6, fill, fop: 0.22, sw: 1.2 }) + lines.map((t, i) => S.text(x + w / 2, y + 16 + i * 13, t, { a: 'middle', size: 10 })).join('');

// 1. Sewage treatment plant (flow)
export const STP = svgDoc(
  460,
  250,
  'Sewage treatment: in primary treatment, floating debris is removed by filtration and grit and soil by sedimentation, leaving primary sludge and an effluent; in secondary treatment, the effluent is aerated so that aerobic microbes form flocs and consume organic matter, lowering the BOD; flocs settle as activated sludge, a small part of which is returned as inoculum while most goes to anaerobic sludge digesters, where bacteria produce biogas (methane, hydrogen sulphide and carbon dioxide); the treated effluent is released into rivers',
  [
    box(10, 20, 110, 44, ['Raw sewage'], 'var(--diagram-brown)'),
    box(10, 96, 110, 58, ['Primary treatment:', 'filtration and', 'sedimentation'], 'var(--diagram-yellow)'),
    box(160, 96, 120, 58, ['Secondary treatment:', 'aeration tank,', 'microbial flocs'], 'var(--diagram-green)'),
    box(320, 96, 130, 58, ['Settling tank:', 'flocs settle as', 'activated sludge'], 'var(--diagram-blue)'),
    box(320, 186, 130, 54, ['Anaerobic sludge', 'digester: biogas'], 'var(--diagram-red)'),
    box(320, 20, 130, 44, ['Treated effluent', 'to river'], 'var(--diagram-blue)'),
    box(10, 186, 110, 40, ['Primary sludge'], 'var(--diagram-brown)'),
    S.arrow(65, 64, 65, 94, { size: 6 }),
    S.arrow(120, 125, 158, 125, { size: 6 }),
    S.arrow(280, 125, 318, 125, { size: 6 }),
    S.arrow(385, 96, 385, 66, { size: 6 }),
    S.arrow(385, 154, 385, 184, { size: 6 }),
    S.arrow(65, 154, 65, 184, { size: 6 }),
    S.path('M340 154 C320 176 250 176 222 156', { w: 1.2, dash: '4 3' }),
    S.head(222, 156, -2.3, { size: 6 }),
    lab(212, 184, 'Part returned as inoculum', { size: 10 }),
  ].join(''),
);

// 2. BOD at each stage (computed bars)
const BX = 70;
export const BOD = svgDoc(
  440,
  220,
  `Bar chart of a model sewage: BOD ${STAGES.map(([s, v]) => `${v} mg per litre ${s.toLowerCase()}`).join(', ')}; secondary treatment removes most of the organic matter, a fall of about ${pctFall(STAGES[0][1], STAGES[2][1])} percent overall`,
  [
    S.line(BX, 180, 420, 180, { w: 1 }),
    S.line(BX, 20, BX, 180, { w: 1 }),
    ...[0, 100, 200, 300].map((v) => S.text(BX - 6, 184 - v * 0.45, String(v), { a: 'end', size: 10 }) + S.line(BX, 180 - v * 0.45, 420, 180 - v * 0.45, { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...STAGES.map(([name, v], i) => {
      const x = BX + 20 + i * 115;
      const words = name.split(' ');
      const l1 = words.slice(0, 2).join(' ');
      const l2 = words.slice(2).join(' ');
      return S.rect(x, 180 - v * 0.45, 70, v * 0.45, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1 }) + S.text(x + 35, 174 - v * 0.45, String(v), { a: 'middle', size: 10 }) + S.text(x + 35, 196, l1, { a: 'middle', size: 10 }) + S.text(x + 35, 209, l2, { a: 'middle', size: 10 });
    }),
    S.text(10, 16, 'BOD (mg of oxygen per litre)', { size: 10 }),
  ].join(''),
);

// 3. Biogas plant (schematic)
export const BIOGAS = svgDoc(
  440,
  250,
  'A biogas plant: a concrete tank 10 to 15 feet deep in the ground receives a slurry of cattle dung and water through an inlet; methanogenic bacteria digest it anaerobically; the gas collects under a floating cover, which rises as gas accumulates, and is piped out for cooking and lighting; spent slurry leaves through an outlet and is used as fertiliser',
  [
    S.line(0, 80, 440, 80, { c: 'var(--diagram-brown)', w: 1.5 }),
    S.rect(150, 80, 140, 150, { fill: 'var(--diagram-brown)', fop: 0.2, sw: 1.5 }),
    S.rect(158, 64, 124, 40, { fill: 'var(--diagram-muted)', fop: 0.3, sw: 1.5 }),
    S.line(220, 64, 220, 30, { w: 3 }), S.line(220, 30, 300, 30, { w: 3 }),
    S.path('M60 60 L100 60 L100 200 L150 200', { w: 3 }),
    S.path('M290 200 L340 200 L340 70 L390 70', { w: 3 }),
    ...[[190, 160], [230, 180], [210, 130], [250, 150]].map(([x, y]) => S.circle(x, y, 3, { fill: 'var(--diagram-green)', sw: 0 })),
    lab(4, 54, 'Inlet: dung + water'),
    lab(304, 22, 'Gas outlet'), lab(304, 35, '(cooking, lighting)'),
    lab(300, 100, 'Floating cover'),
    S.lead(298, 96, 282, 84),
    lab(166, 196, 'Slurry digested by', { size: 10 }),
    lab(166, 208, 'methanogens', { size: 10 }),
    lab(344, 62, 'Spent slurry outlet', { size: 10 }),
    lab(4, 96, 'Ground level', { size: 10, c: 'var(--diagram-brown)' }),
  ].join(''),
);

export const ALL = { STP, BOD, BIOGAS };
