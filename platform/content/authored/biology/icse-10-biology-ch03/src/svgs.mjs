// SVG diagrams for ICSE 10 Biology ch03 Absorption by Roots and the Ascent of Sap. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const W = 'var(--diagram-blue)';

// ---------------------------------------------------------------- 1. a single root hair (named and lettered)
function rootHair(lettered) {
  const parts = [];
  // soil particles
  for (const [x, y, rr] of [[300, 40, 16], [352, 74, 20], [420, 50, 14], [400, 86, 16], [500, 66, 15], [330, 120, 12], [440, 172, 16]]) parts.push(S.circle(x, y, rr, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1 }));
  // the cell: body at left, long hair extending right
  parts.push(S.path('M60 160 L60 230 Q60 250 80 250 L200 250 Q220 250 220 230 L220 190 Q220 176 236 170 L470 104 Q492 98 494 112 Q496 126 476 132 L246 196 Q232 200 232 214 L232 160 Z', { fill: 'var(--diagram-fill)', fop: 1, w: 2.4 }));
  parts.push(S.path('M66 166 L66 228 Q66 244 82 244 L198 244 Q214 244 214 228 L214 192 Q214 182 230 176 L466 110 Q484 106 486 114 Q488 122 472 126 L242 190 Q226 194 226 210 L226 166 Z', { c: 'var(--diagram-green)', w: 1.2 }));
  parts.push(S.ellipse(150, 205, 26, 18, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }));
  parts.push(S.circle(150, 205, 5, { fill: 'currentColor', sw: 0 }));
  parts.push(S.path('M90 225 Q120 236 200 228 L200 186 Q150 176 110 182 Q86 188 90 225 Z', { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  parts.push(S.path('M244 186 L440 132', { c: W, w: 4, cap: 'round' }));
  // water films
  for (const [x, y] of [[330, 136], [384, 112]]) parts.push(S.arrow(x, y, x - 8, y + 22, { c: W, size: 6 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E', 'F'] : ['Cell wall', 'Cell membrane', 'Nucleus', 'Cytoplasm', 'Vacuole (cell sap)', 'Soil particle'];
  const tag = (i, x, y, tx, ty, a = 'start') => parts.push(S.lead(x, y, tx + (a === 'end' ? 4 : -4), ty - 4), S.text(tx, ty, L[i], { a, size: lettered ? 14 : 11, w: lettered ? 'bold' : undefined }));
  if (lettered) { tag(0, 60, 180, 30, 150, 'end'); tag(1, 66, 214, 30, 280, 'end'); } else { tag(0, 60, 180, 10, 146); tag(1, 66, 214, 10, 282); }
  tag(2, 150, 205, 140, 290);
  if (lettered) tag(3, 96, 236, 60, 300, 'end'); else tag(3, 96, 236, 10, 302);
  tag(4, 320, 158, 300, 230);
  tag(5, 352, 74, 250, 30, 'end');
  parts.push(lab(300, 252, lettered ? '' : 'Water enters along the hair', { size: 10, c: 'var(--diagram-muted)' }));
  const label = lettered
    ? 'A single root hair cell among soil particles, with parts lettered: A the outer boundary layer, B the thin layer just inside it, C the round body in the cell, D the living material lining the cell, E the large central space extending into the hair, F a soil particle'
    : 'A single root hair cell among soil particles: a long tubular outgrowth of an epidermal cell with a thin cell wall, cell membrane, nucleus, cytoplasm and a large vacuole of cell sap extending into the hair; water from the films around the soil particles enters the hair';
  return svgDoc(520, 310, label, parts.join(''));
}
export const ROOTHAIR = rootHair(false);
export const ROOTHAIR_LETTERED = rootHair(true);

// ---------------------------------------------------------------- 2. thistle funnel osmosis experiment
export const THISTLE = (() => {
  const parts = [];
  // beaker of water
  parts.push(S.path('M60 120 L60 270 Q60 280 70 280 L250 280 Q260 280 260 270 L260 120', { w: 2 }));
  parts.push(S.rect(62, 160, 196, 118, { fill: W, fop: 0.15, sw: 0 }));
  parts.push(S.line(62, 160, 258, 160, { c: W, w: 1.2 }));
  // thistle funnel: bulb with membrane, long stem
  parts.push(S.path('M110 230 Q110 190 160 190 Q210 190 210 230 Z', { fill: 'var(--diagram-yellow)', fop: 0.35, w: 1.6 }));
  parts.push(S.line(108, 230, 212, 230, { c: 'var(--diagram-brown)', w: 3 }));
  parts.push(S.rect(156, 30, 8, 162, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }));
  parts.push(S.rect(157, 90, 6, 100, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 0 }));
  parts.push(S.line(150, 130, 170, 130, { w: 1.2, dash: '3 2' }), S.line(150, 90, 170, 90, { w: 1.2 }));
  parts.push(S.arrow(140, 128, 140, 94, { size: 6 }));
  // labels
  parts.push(lab(176, 94, 'Level after some hours'), lab(176, 134, 'Starting level'));
  parts.push(lab(270, 210, 'Sugar solution'), S.lead(266, 206, 200, 214));
  parts.push(lab(270, 240, 'Parchment membrane'), S.lead(266, 236, 212, 230));
  parts.push(lab(270, 270, 'Water in beaker'), S.lead(266, 266, 240, 260));
  parts.push(lab(176, 40, 'Thistle funnel'), S.lead(172, 36, 164, 50));
  for (const x of [130, 160, 190]) parts.push(S.arrow(x, 254, x, 236, { c: W, size: 6 }));
  parts.push(lab(20, 300, 'Water moves from the beaker into the funnel through the membrane (osmosis).', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(420, 312, 'Thistle funnel experiment: the wide mouth of a thistle funnel is closed with a parchment membrane, filled with sugar solution and dipped in a beaker of water. Water passes through the membrane into the sugar solution, so the level in the funnel stem rises above the starting mark after some hours', parts.join(''));
})();

// ---------------------------------------------------------------- 3. potato osmoscope
export const OSMOSCOPE = (() => {
  const parts = [];
  parts.push(S.path('M60 100 L60 250 Q60 260 70 260 L290 260 Q300 260 300 250 L300 100', { w: 2 }));
  parts.push(S.rect(62, 150, 236, 108, { fill: W, fop: 0.15, sw: 0 }), S.line(62, 150, 298, 150, { c: W, w: 1.2 }));
  // two potato cups
  const cup = (x, sugar, title) => {
    parts.push(S.path(`M${x - 40} 90 L${x - 34} 214 Q${x} 236 ${x + 34} 214 L${x + 40} 90 Z`, { fill: 'var(--diagram-yellow)', fop: 0.3, w: 1.6 }));
    parts.push(S.path(`M${x - 24} 100 L${x - 20} 196 Q${x} 210 ${x + 20} 196 L${x + 24} 100 Z`, { fill: sugar ? 'var(--diagram-fill)' : 'var(--diagram-fill)', fop: 1, w: 1 }));
    if (sugar) parts.push(S.rect(x - 22, 118, 44, 80, { fill: W, fop: 0.2, sw: 0 }), S.line(x - 22, 118, x + 22, 118, { c: W, w: 1.4 }), S.line(x - 22, 160, x + 22, 160, { w: 1, dash: '3 2' }));
    else parts.push(S.line(x - 18, 160, x + 18, 160, { w: 1, dash: '3 2' }));
    parts.push(S.text(x, 76, title, { a: 'middle', size: 11, w: 'bold' }));
  };
  cup(120, true, 'A: sugar inside');
  cup(240, false, 'B: control (empty)');
  parts.push(lab(320, 130, 'Liquid rises in A:'), lab(320, 146, 'water enters the cup'), lab(320, 162, 'from the beaker'));
  parts.push(lab(320, 196, 'No change in B'));
  parts.push(lab(20, 290, 'Dashed line: first mark. Potato cells act as the selectively permeable membrane.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(470, 300, 'Potato osmoscope: two hollowed potato cups stand in a beaker of water. Cup A holds strong sugar solution and cup B is empty as a control. After some hours the liquid in A rises above the first mark because water enters through the potato tissue by osmosis; B stays dry', parts.join(''));
})();

// ---------------------------------------------------------------- 4. turgid, flaccid and plasmolysed cells
export const PLASMO = (() => {
  const parts = [];
  const cell = (x, title, sub, kind) => {
    parts.push(S.rect(x, 40, 120, 90, { rx: 6, sw: 2.2 }));
    if (kind === 'turgid') parts.push(S.rect(x + 3, 43, 114, 84, { rx: 5, fill: 'var(--diagram-green)', fop: 0.25, sw: 1 }), S.rect(x + 12, 52, 96, 66, { rx: 10, fill: W, fop: 0.25, sw: 0.8 }));
    if (kind === 'flaccid') parts.push(S.path(`M${x + 4} 46 Q${x + 60} 60 ${x + 116} 46 L${x + 116} 124 Q${x + 60} 112 ${x + 4} 124 Z`, { fill: 'var(--diagram-green)', fop: 0.25, w: 1 }), S.ellipse(x + 60, 85, 34, 18, { fill: W, fop: 0.25, sw: 0.8 }));
    if (kind === 'plasmo') parts.push(S.ellipse(x + 60, 85, 34, 26, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }), S.ellipse(x + 60, 85, 16, 10, { fill: W, fop: 0.25, sw: 0.8 }));
    parts.push(S.text(x + 60, 152, title, { a: 'middle', size: 12, w: 'bold' }), S.text(x + 60, 168, sub, { a: 'middle', size: 10 }));
  };
  cell(20, 'Turgid', 'in water (hypotonic)', 'turgid');
  cell(170, 'Flaccid', 'in isotonic solution', 'flaccid');
  cell(320, 'Plasmolysed', 'in strong salt (hypertonic)', 'plasmo');
  parts.push(lab(330, 200, 'Cytoplasm has shrunk away', { size: 10 }), lab(330, 214, 'from the cell wall', { size: 10 }));
  parts.push(lab(20, 200, 'Cytoplasm pressed against the wall', { size: 10 }), lab(20, 214, '(turgor pressure)', { size: 10 }));
  parts.push(S.arrow(140, 85, 168, 85, { size: 6 }), S.arrow(290, 85, 318, 85, { size: 6 }));
  return svgDoc(460, 228, 'Three plant cells. Turgid, in water: the vacuole is full and the cytoplasm presses against the wall. Flaccid, in an isotonic solution: the cell is limp with no pressure on the wall. Plasmolysed, in strong salt solution: the cytoplasm has shrunk away from the cell wall towards the centre', parts.join(''));
})();

// ---------------------------------------------------------------- 5. path of water across the root
export const PATH = (() => {
  const parts = [];
  const zones = [['Root hair', 'var(--diagram-fill)', 70], ['Cortex', 'var(--diagram-green)', 100], ['Endodermis', 'var(--diagram-yellow)', 72], ['Pericycle', 'var(--diagram-fill)', 64], ['Xylem', W, 70]];
  let x = 30;
  zones.forEach(([t, c, w]) => {
    parts.push(S.rect(x, 60, w, 80, { fill: c, fop: c === 'var(--diagram-fill)' ? 1 : 0.25, sw: 1.2 }));
    parts.push(S.text(x + w / 2, 160, t, { a: 'middle', size: 11, w: 'bold' }));
    x += w;
  });
  parts.push(S.arrow(20, 100, 412, 100, { c: W, w: 2.4, size: 9 }));
  parts.push(S.text(20, 40, 'Soil water', { size: 11, c: W }));
  parts.push(S.arrow(440, 130, 440, 60, { c: W, w: 2, size: 8 }), S.text(410, 50, 'up the stem', { size: 10 }));
  parts.push(lab(20, 196, 'Water moves cell to cell by osmosis, each cell inwards having a slightly stronger sap,', { size: 10, c: 'var(--diagram-muted)' }), lab(20, 210, 'until it reaches the xylem vessels.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(500, 222, 'Path of water across a root, shown as bands from outside to inside: root hair, cortex, endodermis, pericycle and xylem. Soil water passes inwards through these layers into the xylem and then up the stem', parts.join(''));
})();

// ---------------------------------------------------------------- 6. potassium permanganate diffusion
export const KMNO4 = (() => {
  const parts = [];
  const beaker = (x, t, spread) => {
    parts.push(S.path(`M${x} 40 L${x} 150 Q${x} 160 ${x + 10} 160 L${x + 110} 160 Q${x + 120} 160 ${x + 120} 150 L${x + 120} 40`, { w: 2 }));
    parts.push(S.rect(x + 2, 60, 116, 98, { fill: W, fop: 0.1, sw: 0 }));
    if (spread === 0) parts.push(S.circle(x + 60, 152, 5, { fill: 'var(--diagram-red)', sw: 0 }));
    else if (spread === 1) parts.push(S.ellipse(x + 60, 140, 34, 18, { fill: 'var(--diagram-red)', fop: 0.4, sw: 0 }), S.circle(x + 60, 152, 4, { fill: 'var(--diagram-red)', sw: 0 }));
    else parts.push(S.rect(x + 2, 60, 116, 98, { fill: 'var(--diagram-red)', fop: 0.3, sw: 0 }));
    parts.push(S.text(x + 60, 182, t, { a: 'middle', size: 11, w: 'bold' }));
  };
  beaker(20, 'At the start', 0);
  beaker(170, 'After 30 minutes', 1);
  beaker(320, 'Next day', 2);
  parts.push(lab(20, 210, 'A crystal of potassium permanganate colours all the water without stirring: diffusion.', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(460, 222, 'Diffusion of potassium permanganate: a purple crystal at the bottom of a beaker of still water; after thirty minutes a coloured patch spreads around it; by the next day the whole water is evenly coloured', parts.join(''));
})();

// ---------------------------------------------------------------- 7. conduction through xylem (coloured water)
export const XYLEM = (() => {
  const parts = [];
  parts.push(S.path('M60 60 L60 230 Q60 240 70 240 L150 240 Q160 240 160 230 L160 60', { w: 2 }));
  parts.push(S.rect(62, 150, 96, 88, { fill: 'var(--diagram-red)', fop: 0.3, sw: 0 }));
  parts.push(S.line(110, 30, 110, 236, { c: 'var(--diagram-green)', w: 8, cap: 'round' }));
  parts.push(S.line(110, 40, 110, 230, { c: 'var(--diagram-red)', w: 2 }));
  parts.push(S.path('M110 60 Q80 40 70 20', { c: 'var(--diagram-green)', w: 3 }), S.path('M110 80 Q140 60 156 44', { c: 'var(--diagram-green)', w: 3 }));
  parts.push(lab(20, 260, 'Shoot of a balsam plant standing in red-coloured water'));
  // cross-section
  parts.push(S.circle(330, 140, 70, { fill: 'var(--diagram-green)', fop: 0.15, sw: 1.6 }));
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4;
    const cx = 330 + 44 * Math.cos(a), cy = 140 + 44 * Math.sin(a);
    parts.push(S.ellipse(cx, cy, 10, 14, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
    parts.push(S.circle(cx - 3 * Math.cos(a), cy - 3 * Math.sin(a), 5, { fill: 'var(--diagram-red)', fop: 0.6, sw: 0 }));
  }
  parts.push(S.text(330, 236, 'Cross-section of the stem', { a: 'middle', size: 11, w: 'bold' }));
  parts.push(lab(410, 120, 'Only the xylem'), lab(410, 134, '(inner part of each'), lab(410, 148, 'bundle) is red'));
  parts.push(S.lead(404, 132, 372, 140));
  return svgDoc(520, 272, 'Experiment to show conduction of water through xylem: a balsam shoot stands in red-coloured water; after a few hours red streaks are seen in the stem. A cross-section shows a ring of vascular bundles in which only the xylem, the inner part of each bundle, is stained red', parts.join(''));
})();
