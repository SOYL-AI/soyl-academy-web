// SVG diagrams for ICSE 9 Biology ch03 The Flower. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const dot = (x, y, r = 1.8, c = 'currentColor') => S.circle(x, y, r, { fill: c, sw: 0 });
/** Label with a muted leader. side 'l' text ends at (x, y); 'r' starts at (x, y); 'c' centred above target; 'b' centred below target. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size: o.size ?? 11, w: o.w }));
}
const head = (parts, x, y, t) => parts.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));

// ---------------------------------------------------------------- 1. a bisexual flower in long section (named and lettered)
function flower(lettered) {
  const p = [];
  const N = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Petal', 'Anther', 'Stigma', 'Ovary', 'Sepal'];
  const lab = (i, x, y, tx, ty, side) => label(p, N[i], x, y, tx, ty, side, lettered ? { size: 14, w: 'bold' } : {});
  p.push(S.rect(295, 256, 10, 64, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.5 }));
  // petals
  p.push(S.path('M286 234 C230 200 190 140 205 90 C240 100 275 160 292 226 Z', { fill: 'var(--diagram-red)', fop: 0.18, sw: 1.6 }));
  p.push(S.path('M314 234 C370 200 410 140 395 90 C360 100 325 160 308 226 Z', { fill: 'var(--diagram-red)', fop: 0.18, sw: 1.6 }));
  // sepals
  p.push(S.path('M284 246 C250 252 230 238 218 220 C250 222 272 232 290 238 Z', { fill: 'var(--diagram-green)', fop: 0.4, sw: 1.5 }));
  p.push(S.path('M316 246 C350 252 370 238 382 220 C350 222 328 232 310 238 Z', { fill: 'var(--diagram-green)', fop: 0.4, sw: 1.5 }));
  // stamens
  for (const sx of [-1, 1]) {
    p.push(S.line(300 + sx * 8, 238, 300 + sx * 34, 128, { w: 2.2, c: 'var(--diagram-brown)' }));
    p.push(S.ellipse(300 + sx * 35, 116, 8, 14, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.4 }));
  }
  // pistil
  p.push(S.line(300, 196, 300, 100, { w: 3.5, c: 'var(--diagram-green)' }));
  p.push(S.ellipse(300, 94, 13, 6, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1.4 }));
  p.push(S.ellipse(300, 216, 21, 26, { fill: 'var(--diagram-green)', fop: 0.25, sw: 1.8 }));
  for (const [x, y] of [[293, 208], [307, 208], [293, 223], [307, 223]]) p.push(S.circle(x, y, 4, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }));
  // thalamus
  p.push(S.ellipse(300, 250, 25, 9, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1.5 }));
  lab(0, 170, 130, 208, 118, 'l');
  lab(1, 170, 78, 262, 108, 'l');
  lab(4, 170, 240, 232, 230, 'l');
  lab(2, 420, 84, 312, 92, 'r');
  lab(3, 420, 196, 320, 212, 'r');
  if (!lettered) {
    label(p, 'Filament', 170, 175, 273, 165, 'l');
    label(p, 'Style', 420, 140, 303, 140, 'r');
    label(p, 'Ovule', 420, 240, 308, 224, 'r');
    label(p, 'Thalamus', 420, 270, 322, 254, 'r');
    label(p, 'Pedicel', 420, 308, 306, 296, 'r');
  }
  const name = lettered
    ? 'A bisexual flower cut lengthways, with parts lettered A to E: A, a large coloured leaf-like part at the side; B, the swollen tip of a thin stalk at the side; C, the top of the central tall structure; D, the swollen base of the central structure; E, a small green leaf-like part at the very bottom'
    : 'A bisexual flower in long section: a pedicel holds the thalamus; green sepals and coloured petals form the outer whorls; stamens, each with a filament and an anther, surround the central pistil made of stigma, style and ovary holding ovules';
  return svgDoc(640, 330, name, p.join(''));
}
export const FLOWER = flower(false);
export const FLOWER_LETTERED = flower(true);

// ---------------------------------------------------------------- 2. the four whorls seen from above
export const WHORLS = (() => {
  const p = [];
  const cx = 160, cy = 150;
  p.push(S.circle(cx, cy, 125, { fill: 'var(--diagram-green)', fop: 0.25, sw: 2 }));
  p.push(S.circle(cx, cy, 98, { fill: 'var(--diagram-red)', fop: 0.2, sw: 2 }));
  p.push(S.circle(cx, cy, 62, { fill: 'var(--diagram-yellow)', fop: 0.25, sw: 2 }));
  for (let i = 0; i < 10; i++) p.push(S.circle(cx + 46 * Math.cos((i * Math.PI) / 5), cy + 46 * Math.sin((i * Math.PI) / 5), 5, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 0.8 }));
  p.push(S.circle(cx, cy, 22, { fill: 'var(--diagram-green)', fop: 0.5, sw: 2 }));
  const rows = [['Calyx (sepals)', 'protects the bud', 54, 'M285 60 L220 60'], ['Corolla (petals)', 'attracts insects', 100, ''], ['Androecium (stamens)', 'male part', 146, ''], ['Gynoecium (pistil)', 'female part', 192, '']];
  rows.forEach(([a, b], i) => { p.push(S.text(330, 66 + i * 46, a, { size: 12, w: 'bold' }), S.text(330, 82 + i * 46, b, { size: 11, c: 'var(--diagram-muted)' })); });
  p.push(S.lead(326, 64, cx + 105, 70), S.lead(326, 110, cx + 80, 120), S.lead(326, 156, cx + 52, 160), S.lead(326, 202, cx + 14, 160));
  p.push(S.text(500, 100, 'Non-essential whorls', { size: 10, c: 'var(--diagram-muted)' }), S.text(500, 190, 'Essential whorls', { size: 10, c: 'var(--diagram-muted)' }));
  p.push(S.line(488, 52, 488, 112, { w: 1.2, c: 'var(--diagram-muted)' }), S.line(488, 144, 488, 206, { w: 1.2, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 300, 'The four whorls of a flower seen from above as concentric rings: the calyx outermost, then the corolla, then the androecium of stamens, and the gynoecium at the centre; calyx and corolla are the non-essential whorls and the androecium and gynoecium are the essential whorls', p.join(''));
})();

// ---------------------------------------------------------------- 3. a stamen and a pistil
export const STAMEN_PISTIL = (() => {
  const p = [];
  head(p, 130, 22, 'Stamen'); head(p, 440, 22, 'Pistil');
  // stamen
  p.push(S.line(130, 96, 130, 250, { w: 5, c: 'var(--diagram-brown)', cap: 'round' }));
  for (const sx of [-1, 1]) {
    p.push(S.ellipse(130 + sx * 18, 90, 16, 36, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.8 }));
    for (const [dx, dy] of [[0, -16], [0, 0], [0, 16], [-5, -6], [5, 8]]) p.push(dot(130 + sx * 18 + dx, 90 + dy, 2.2, 'var(--diagram-brown)'));
  }
  label(p, 'Anther (makes pollen grains)', 190, 40, 148, 66, 'r');
  label(p, 'Filament', 190, 190, 133, 190, 'r');
  // pistil
  p.push(S.ellipse(440, 52, 22, 9, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.8 }));
  p.push(S.line(440, 60, 440, 180, { w: 5, c: 'var(--diagram-green)' }));
  p.push(S.path('M410 230 C410 160 470 160 470 230 C470 262 410 262 410 230 Z', { fill: 'var(--diagram-green)', fop: 0.2, sw: 2 }));
  p.push(S.path('M426 240 C428 200 432 190 440 190', { w: 3, c: 'var(--diagram-brown)' }));
  for (const [x, y] of [[434, 232], [434, 216], [436, 202]]) p.push(S.circle(x + 4, y, 5, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1.2 }));
  label(p, 'Stigma (sticky)', 500, 40, 460, 50, 'r');
  label(p, 'Style', 500, 100, 446, 100, 'r');
  label(p, 'Ovary wall', 500, 195, 468, 205, 'r');
  label(p, 'Ovule', 360, 215, 436, 216, 'l');
  label(p, 'Placenta', 360, 250, 428, 240, 'l');
  p.push(S.text(130, 282, 'Male part of the flower', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }), S.text(440, 282, 'Female part of the flower', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 295, 'A stamen, with an anther of two lobes holding pollen grains on a stalk called the filament; and a pistil, with a sticky stigma at the top, a style, and an ovary cut open to show ovules attached to the placenta on its wall', p.join(''));
})();

// ---------------------------------------------------------------- 4. a single flower and an inflorescence
const bloom = (cx, cy, rr, col = 'var(--diagram-red)') => {
  let s = '';
  for (let i = 0; i < 5; i++) s += S.circle(cx + rr * Math.cos((i * 2 * Math.PI) / 5 - Math.PI / 2), cy + rr * Math.sin((i * 2 * Math.PI) / 5 - Math.PI / 2), rr * 0.75, { fill: col, fop: 0.25, sw: 1.2 });
  return s + S.circle(cx, cy, rr * 0.4, { fill: 'var(--diagram-yellow)', fop: 0.8, sw: 1 });
};
export const INFLORESCENCE = (() => {
  const p = [];
  head(p, 120, 22, 'A single flower'); head(p, 420, 22, 'An inflorescence');
  p.push(S.line(120, 100, 120, 230, { w: 3, c: 'var(--diagram-green)' }));
  p.push(bloom(120, 80, 22));
  p.push(S.line(330, 250, 330, 70, { w: 3.5, c: 'var(--diagram-green)' }));
  const flowers = [[420, 70, 1], [380, 100, 0], [440, 120, 1], [372, 150, 0], [450, 170, 1], [380, 200, 0]];
  flowers.forEach(([x, y]) => {
    const side = x > 330 ? 1 : -1;
    void side;
    p.push(S.line(330, y + 20, x - 12, y + 6, { w: 1.8, c: 'var(--diagram-green)' }));
    p.push(bloom(x, y, 12));
  });
  p.push(bloom(330, 58, 12));
  label(p, 'Flower', 70, 86, 98, 82, 'l');
  label(p, 'Flower stalk', 95, 170, 118, 166, 'l');
  label(p, 'Main stalk bearing the flowers', 330, 275, 330, 240, 'b');
  label(p, 'Individual flowers', 500, 112, 462, 120, 'r');
  p.push(S.text(120, 296, 'One flower on its own stalk', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }), S.text(480, 296, 'Many flowers on one flowering axis', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 305, 'A single flower borne alone on its stalk, beside an inflorescence: a group of many small flowers carried on one main flowering stalk', p.join(''));
})();
