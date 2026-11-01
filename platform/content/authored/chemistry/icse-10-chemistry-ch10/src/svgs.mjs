// Hand-drawn SVG schematics for ICSE 10 Chemistry ch10 Study of Compounds: Ammonia (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Laboratory preparation of ammonia: tilted flask, quicklime drying tower, collection by downward displacement of air.
export const NH3_PREP = svgDoc(
  560,
  320,
  'Schematic of the laboratory preparation of ammonia. A mixture of ammonium chloride and slaked lime is heated in a round-bottomed flask clamped in a slanting position with its mouth slightly lower than its base, so that the water formed cannot run back onto the hot glass. The gas passes through a tall drying tower packed with lumps of quicklime, entering at the bottom and leaving at the top. The dry ammonia is led up into an inverted gas jar, where it pushes the heavier air down and out: collection by downward displacement of air.',
  [
    // tilted flask (neck slopes down to the right)
    S.circle(105, 175, 46),
    S.path('M 146 160 L 196 184 M 140 176 L 190 200', { w: 1.5 }),
    S.path('M 192 180 L 202 186 L 196 204 L 186 198 Z', { fill: 'var(--diagram-muted)', fop: 0.4 }),
    S.path('M 64 196 Q 105 236 146 196 Z', { fill: 'var(--diagram-muted)', fop: 0.3, c: 'none', w: 0 }),
    // burner
    S.path('M 105 268 Q 97 256 105 244 Q 113 256 105 268', { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.3 }),
    S.rect(97, 268, 16, 26, { sw: 1.5 }),
    // delivery tube to bottom of drying tower
    S.path('M 199 194 L 240 194 L 240 236 L 262 236', { w: 1.5 }),
    // drying tower
    S.rect(262, 80, 56, 176, { sw: 1.8 }),
    ...[[275, 110], [298, 104], [285, 132], [304, 140], [272, 158], [295, 170], [280, 192], [303, 204], [274, 226], [296, 236]].map(([x, y]) => S.circle(x, y, 7, { fill: 'var(--diagram-muted)', fop: 0.35, sw: 1 })),
    // tube from top of tower to inverted jar
    S.path('M 290 80 L 290 40 L 380 40 L 380 300 L 425 300 L 425 90', { w: 1.5 }),
    // inverted gas jar (mouth at bottom)
    S.path('M 395 270 L 395 70 L 465 70 L 465 270', { w: 1.8 }),
    S.line(388, 70, 472, 70, { w: 2.5 }),
    S.arrow(445, 240, 445, 290, { c: 'var(--diagram-muted)', size: 6 }),
    lab(452, 300, 'air out', { size: 10, c: 'var(--diagram-muted)' }),
    S.arrow(425, 120, 425, 92, { c: 'var(--diagram-green)', size: 6 }),
    // labels
    S.lines(8, 92, ['ammonium', 'chloride +', 'slaked lime'], { size: 10, dy: 12 }),
    S.lead(78, 196, 50, 124),
    S.lines(122, 250, ['heat'], { size: 10, c: 'var(--diagram-red)' }),
    S.lines(132, 112, ['flask tilted,', 'mouth lower'], { size: 10, dy: 12, c: 'var(--diagram-muted)' }),
    S.lines(232, 276, ['drying tower:', 'quicklime (CaO)'], { size: 10, dy: 12 }),
    lab(300, 32, 'dry ammonia', { size: 10, c: 'var(--diagram-green)' }),
    S.lines(474, 150, ['inverted jar:', 'downward', 'displacement', 'of air'], { size: 10, dy: 12, c: 'var(--diagram-green)' }),
  ].join(''),
);

// 2. Fountain experiment with ammonia.
export const FOUNTAIN_NH3 = svgDoc(
  400,
  330,
  'Schematic of the fountain experiment with ammonia. A dry round-bottomed flask filled with dry ammonia is clamped upside down. A long glass tube with a jet at its upper end passes through the cork, and its lower end dips into a trough of water coloured with red litmus solution. When a little water enters, the ammonia dissolves, the pressure inside falls and the water rushes up as a fountain, which turns blue inside the flask.',
  [
    S.circle(200, 100, 70),
    S.path('M 186 168 L 186 200 M 214 168 L 214 200', { w: 1.5 }),
    S.rect(182, 198, 36, 14, { fill: 'var(--diagram-muted)', fop: 0.4 }),
    S.line(200, 70, 200, 300, { w: 1.5 }),
    ...[[-30, 60], [-14, 44], [0, 40], [14, 44], [30, 60]].map(([dx, dy]) => S.path(`M 200 70 Q ${200 + dx / 2} ${dy - 4} ${200 + dx} ${dy + 30}`, { c: 'var(--diagram-blue)', w: 1.5 })),
    S.path('M 90 250 L 90 312 L 310 312 L 310 250', { w: 1.8 }),
    S.rect(92, 268, 216, 42, { fill: 'var(--diagram-red)', fop: 0.15, c: 'none', sw: 0 }),
    S.line(92, 268, 308, 268, { c: 'var(--diagram-red)', w: 1 }),
    S.arrow(206, 290, 206, 240, { c: 'var(--diagram-red)', size: 6 }),
    S.lines(290, 70, ['flask of', 'dry ammonia'], { size: 10, dy: 12 }),
    S.lead(266, 90, 288, 72),
    S.lines(8, 60, ['blue fountain', '(red litmus', 'turns blue)'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    S.lead(172, 80, 84, 66),
    S.lines(8, 200, ['glass tube', 'with a jet'], { size: 10, dy: 12 }),
    S.lead(198, 230, 70, 206),
    S.lines(316, 280, ['water with', 'red litmus'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    lab(222, 246, 'water rises', { size: 10, c: 'var(--diagram-red)' }),
  ].join(''),
);
