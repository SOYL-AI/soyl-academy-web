// SVG diagrams for ICSE 9 Biology ch08 Economic Importance of Bacteria and Fungi. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SPOIL, DOUGH } from './calc.mjs';

/** Label with a muted leader. side 'l' text ends at (x, y); 'r' starts at (x, y); 'c' centred above target; 'b' centred below target. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size: o.size ?? 11, w: o.w }));
}
const head = (parts, x, y, t) => parts.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));
const box = (parts, x, y, w, h, t, { fill = 'var(--diagram-fill)', size = 11.5, bold = false } = {}) => {
  parts.push(S.rect(x, y, w, h, { fill, fop: fill === 'var(--diagram-fill)' ? 1 : 0.25, sw: 1.4, rx: 6 }));
  parts.push(S.text(x + w / 2, y + h / 2 + 4, t, { a: 'middle', size, w: bold ? 'bold' : undefined }));
};

// ---------------------------------------------------------------- 1. the nitrogen cycle (named and lettered)
function ncycle(lettered) {
  const p = [];
  const ar = (x1, y1, x2, y2, c = 'var(--diagram-green)') => p.push(S.arrow(x1, y1, x2, y2, { c, w: 2.2, size: 9 }));
  box(p, 240, 10, 160, 32, 'Nitrogen gas in air', { fill: 'var(--diagram-blue)', bold: true });
  box(p, 20, 150, 150, 34, 'Ammonia in soil', { fill: 'var(--diagram-yellow)' });
  box(p, 470, 150, 150, 34, 'Nitrates in soil', { fill: 'var(--diagram-yellow)' });
  box(p, 470, 262, 150, 34, 'Plants, then animals', { fill: 'var(--diagram-green)' });
  box(p, 20, 262, 150, 34, 'Dead remains, wastes', { fill: 'var(--diagram-brown)' });
  ar(240, 32, 100, 150);
  ar(170, 167, 470, 167);
  ar(545, 150, 400, 40, 'var(--diagram-red)');
  ar(545, 184, 545, 262);
  ar(470, 279, 170, 279, 'var(--diagram-muted)');
  ar(95, 262, 95, 184);
  const L = (t, x, y, a = 'middle') => p.push(S.text(x, y, t, { a, size: 15, w: 'bold' }));
  const sm = (t, x, y, a = 'middle', c = 'var(--diagram-muted)') => p.push(S.text(x, y, t, { a, size: 11, c }));
  if (lettered) {
    L('A', 160, 84, 'end');
    L('C', 320, 156);
    L('D', 492, 92, 'start');
    L('E', 560, 228, 'start');
    L('B', 110, 228, 'start');
    sm('Death and wastes', 320, 296);
  } else {
    p.push(S.text(166, 76, 'Nitrogen fixation', { a: 'end', size: 11, w: 'bold' }));
    sm('Rhizobium, Azotobacter', 166, 90, 'end');
    p.push(S.text(320, 156, 'Nitrification', { a: 'middle', size: 11, w: 'bold' }));
    sm('Nitrosomonas, then Nitrobacter', 320, 184);
    p.push(S.text(492, 80, 'Denitrification', { a: 'start', size: 11, w: 'bold' }));
    sm('Pseudomonas', 492, 94, 'start');
    sm('Absorbed by roots', 556, 228, 'start');
    p.push(S.text(106, 226, 'Decay (ammonification)', { a: 'start', size: 11, w: 'bold' }));
    sm('by decay bacteria', 106, 240, 'start');
    sm('Death and wastes', 320, 296);
  }
  const name = lettered
    ? 'The nitrogen cycle with five processes lettered A to E: A, from nitrogen gas in the air to ammonia in the soil; B, from dead remains and wastes to ammonia; C, from ammonia to nitrates; D, from nitrates back to nitrogen gas in the air; E, from nitrates into plants and then animals'
    : 'The nitrogen cycle: nitrogen-fixing bacteria change nitrogen gas into ammonia compounds in the soil; nitrifying bacteria change ammonia to nitrates; plants absorb nitrates and animals eat plants; dead remains are decayed to ammonia; denitrifying bacteria return nitrogen gas to the air';
  return svgDoc(640, 310, name, p.join(''));
}
export const NCYCLE = ncycle(false);
export const NCYCLE_LETTERED = ncycle(true);

// ---------------------------------------------------------------- 2. root nodules of a pulse plant
export const ROOT = (() => {
  const p = [];
  p.push(S.line(70, 100, 440, 100, { c: 'var(--diagram-muted)', w: 1.2, dash: '6 4' }));
  p.push(S.text(70, 94, 'Soil level', { size: 11, c: 'var(--diagram-muted)' }));
  p.push(S.line(260, 100, 260, 40, { c: 'var(--diagram-green)', w: 3.5 }));
  p.push(S.path('M260 70 C230 60 214 40 220 28 C240 32 256 50 260 70 Z', { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.5 }));
  p.push(S.path('M260 56 C290 46 306 28 300 16 C280 20 264 38 260 56 Z', { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.5 }));
  p.push(S.line(260, 100, 260, 230, { c: 'var(--diagram-brown)', w: 3.5 }));
  const lat = [[260, 130, 170, 160], [260, 130, 350, 158], [260, 168, 190, 205], [260, 168, 336, 200], [260, 200, 230, 246]];
  lat.forEach(([x1, y1, x2, y2]) => p.push(S.line(x1, y1, x2, y2, { c: 'var(--diagram-brown)', w: 2 })));
  const nod = [[196, 150], [182, 156], [330, 150], [344, 156], [212, 190], [316, 188], [236, 232]];
  nod.forEach(([x, y]) => p.push(S.circle(x, y, 7, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1.5 })));
  label(p, 'Leaf', 160, 36, 220, 36, 'l');
  label(p, 'Stem', 200, 80, 255, 80, 'l');
  label(p, 'Main root', 150, 130, 255, 140, 'l');
  label(p, 'Lateral root', 90, 216, 192, 206, 'l');
  label(p, 'Root nodules', 420, 130, 346, 154, 'r');
  p.push(S.circle(540, 190, 52, { fill: 'var(--diagram-yellow)', fop: 0.18, sw: 1.8 }));
  for (const [x, y, rot] of [[520, 175, 0], [550, 165, 1], [535, 195, 0], [560, 200, 1], [515, 210, 1], [545, 220, 0]]) {
    p.push(rot ? S.ellipse(x, y, 5, 9, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1.2 }) : S.ellipse(x, y, 9, 5, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1.2 }));
  }
  p.push(S.line(346, 154, 490, 172, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  p.push(S.text(540, 262, 'Rhizobium bacteria', { a: 'middle', size: 11 }), S.text(540, 276, 'inside a nodule', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 290, 'The root system of a pulse plant with small swellings called root nodules on the lateral roots, and one nodule enlarged to show Rhizobium bacteria inside it', p.join(''));
})();

// ---------------------------------------------------------------- 3. a budding yeast cell and rising dough
export const YEAST_DOUGH = (() => {
  const p = [];
  head(p, 150, 20, 'Yeast cell budding');
  head(p, 460, 20, 'Dough before and after');
  p.push(S.ellipse(130, 140, 54, 46, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 2.2 }));
  p.push(S.circle(116, 148, 16, { fill: 'var(--diagram-fill)', sw: 1.4 }));
  p.push(S.circle(148, 122, 9, { fill: 'var(--diagram-brown)', fop: 0.6, sw: 1.2 }));
  p.push(S.ellipse(196, 100, 24, 20, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 2 }));
  p.push(S.circle(200, 98, 6, { fill: 'var(--diagram-brown)', fop: 0.6, sw: 1 }));
  label(p, 'Cell wall', 76, 74, 90, 112, 'l');
  label(p, 'Vacuole', 76, 204, 108, 158, 'l');
  label(p, 'Nucleus', 250, 160, 156, 124, 'r');
  label(p, 'Bud', 262, 76, 216, 92, 'r');
  p.push(S.text(150, 264, 'One cell becomes two by budding', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  // bowls
  const bowl = (x, h, bubbles) => {
    p.push(S.path(`M${x} 140 L${x + 8} 250 L${x + 92} 250 L${x + 100} 140`, { sw: 2 }));
    p.push(S.rect(x + 5, 248 - h, 90, h, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.6, rx: 8 }));
    for (const [bx, by] of bubbles) p.push(S.circle(x + bx, 248 - h + by, 4, { sw: 1, c: 'var(--diagram-muted)' }));
  };
  const hB = Math.round((DOUGH.before / DOUGH.after) * 100);
  bowl(380, hB, []);
  bowl(500, 100, [[20, 24], [50, 40], [72, 22], [34, 62], [64, 70], [80, 50]]);
  p.push(S.text(430, 270, `${DOUGH.before} mL`, { a: 'middle', size: 11 }), S.text(550, 270, `${DOUGH.after} mL`, { a: 'middle', size: 11 }));
  p.push(S.arrow(484, 210, 502, 210, { size: 8 }));
  p.push(S.text(430, 120, 'Before', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }), S.text(550, 70, 'After: gas bubbles', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 282, `A yeast cell with a cell wall, a nucleus and a vacuole forming a small bud, and two bowls of dough: before, ${DOUGH.before} millilitres, and after rising with gas bubbles, ${DOUGH.after} millilitres`, p.join(''));
})();

// ---------------------------------------------------------------- 4. an edible mushroom
export const MUSHROOM = (() => {
  const p = [];
  p.push(S.line(70, 210, 570, 210, { c: 'var(--diagram-muted)', w: 1.2, dash: '6 4' }));
  p.push(S.text(70, 204, 'Soil level', { size: 11, c: 'var(--diagram-muted)' }));
  p.push(S.rect(300, 120, 40, 90, { fill: 'var(--diagram-fill)', sw: 1.8, rx: 6 }));
  p.push(S.path('M210 128 C210 50 430 50 430 128 Z', { fill: 'var(--diagram-brown)', fop: 0.3, sw: 2 }));
  for (let x = 224; x <= 416; x += 16) p.push(S.line(x, 128, 318 + (x - 320) * 0.35, 142, { c: 'var(--diagram-muted)', w: 1.1 }));
  p.push(S.path('M210 128 L430 128 L418 142 L222 142 Z', { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.4 }));
  const hy = [[320, 210, 250, 250], [320, 210, 390, 252], [320, 210, 320, 262], [250, 250, 200, 256], [250, 250, 232, 276], [390, 252, 450, 260], [390, 252, 410, 278], [320, 262, 300, 282]];
  hy.forEach(([x1, y1, x2, y2]) => p.push(S.line(x1, y1, x2, y2, { c: 'var(--diagram-brown)', w: 1.6 })));
  label(p, 'Cap', 500, 70, 400, 84, 'r');
  label(p, 'Gills (make spores)', 500, 140, 410, 136, 'r');
  label(p, 'Stalk', 500, 180, 342, 176, 'r');
  label(p, 'Mycelium', 500, 262, 394, 254, 'r');
  p.push(S.text(150, 150, 'Fungus: no chlorophyll', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }), S.text(150, 166, 'takes food from compost', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 296, 'An edible mushroom with a cap, gills under the cap, a stalk above the soil, and a network of thread-like hyphae called the mycelium below the soil', p.join(''));
})();

// ---------------------------------------------------------------- 5. bacteria in cooked rice (bar chart from calc.mjs)
export const SPOIL_CHART = (() => {
  const p = [];
  const x0 = 90;
  const base = 250;
  const top = 50;
  const max = SPOIL.series[SPOIL.series.length - 1];
  p.push(S.line(x0, top - 10, x0, base, { w: 1.5 }), S.line(x0, base, 610, base, { w: 1.5 }));
  SPOIL.series.forEach((v, i) => {
    const h = ((base - top) * v) / max;
    const x = x0 + 22 + i * 70;
    p.push(S.rect(x, base - h, 40, h, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.5 }));
    p.push(S.text(x + 20, base - h - 5, String(v), { a: 'middle', size: 11 }));
    p.push(S.text(x + 20, base + 16, String(i * SPOIL.every), { a: 'middle', size: 11 }));
  });
  p.push(S.text(350, 282, 'Time (minutes)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.text(36, 150, 'Number of', { a: 'middle', size: 12, w: 'bold' }), S.text(36, 164, 'bacteria', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.text(350, 22, 'Cooked rice kept in a warm kitchen', { a: 'middle', size: 12, w: 'bold' }));
  return svgDoc(640, 296, `A bar chart of the number of bacteria in cooked rice kept in a warm kitchen: ${SPOIL.series.join(', ')} at every half hour from zero to one hundred and eighty minutes, doubling every thirty minutes`, p.join(''));
})();
