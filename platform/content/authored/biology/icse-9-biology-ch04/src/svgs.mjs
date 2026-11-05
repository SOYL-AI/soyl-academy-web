// SVG diagrams for ICSE 9 Biology ch04 Pollination and Fertilisation. All new drawings.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';

// ---------------------------------------------------------------- 1. insect-pollinated and wind-pollinated flowers (named)
export const INSECT_WIND = (() => {
  const p = [];
  // insect-pollinated flower, centre x = 175
  p.push(S.line(175, 305, 175, 215, { c: GREEN, w: 6, cap: 'round' }));
  p.push(S.path('M175 215 Q125 208 112 128 Q150 135 175 190 Z', { fill: YEL, fop: 0.55, w: 1.6 }));
  p.push(S.path('M175 215 Q225 208 238 128 Q200 135 175 190 Z', { fill: YEL, fop: 0.55, w: 1.6 }));
  p.push(S.line(175, 205, 175, 142, { c: GREEN, w: 3, cap: 'round' }), S.circle(175, 136, 8, { fill: RED, fop: 0.45, sw: 1.4 }));
  p.push(S.line(163, 205, 156, 172, { w: 1.2 }), S.ellipse(155, 166, 6, 9, { fill: YEL, fop: 0.8, sw: 1 }));
  p.push(S.line(187, 205, 194, 172, { w: 1.2 }), S.ellipse(195, 166, 6, 9, { fill: YEL, fop: 0.8, sw: 1 }));
  p.push(S.circle(168, 208, 3, { fill: BLUE, fop: 0.6, sw: 0 }), S.circle(182, 208, 3, { fill: BLUE, fop: 0.6, sw: 0 }));
  p.push(S.text(175, 22, 'Insect-pollinated flower', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.lines(6, 128, ['Bright, scented', 'petals'], { size: 11, dy: 13 }), S.lead(92, 138, 120, 146));
  p.push(S.lines(6, 214, ['Nectar at', 'the base'], { size: 11, dy: 13 }), S.lead(62, 214, 164, 208));
  p.push(lab(175, 62, 'Sticky stigma', { a: 'middle' }), S.lead(175, 68, 175, 127));
  p.push(S.lines(244, 164, ['Few anthers,', 'sticky pollen'], { size: 11, dy: 13 }), S.lead(242, 166, 203, 166));
  // wind-pollinated flower, centre x = 400
  p.push(S.line(400, 305, 400, 232, { c: GREEN, w: 5, cap: 'round' }));
  p.push(S.path('M400 232 Q384 240 380 224 Q392 222 400 228 Z', { fill: GREEN, fop: 0.4, w: 1 }), S.path('M400 232 Q416 240 420 224 Q408 222 400 228 Z', { fill: GREEN, fop: 0.4, w: 1 }));
  p.push(S.line(400, 228, 400, 98, { c: GREEN, w: 2.4 }));
  for (const y of [112, 126, 140, 154, 168]) p.push(S.line(400, y, 387, y - 9, { c: RED, w: 1.2 }), S.line(400, y, 413, y - 9, { c: RED, w: 1.2 }));
  p.push(S.line(397, 228, 362, 160, { w: 1.2 }), S.ellipse(359, 152, 8, 14, { fill: YEL, fop: 0.8, sw: 1 }));
  p.push(S.line(403, 228, 440, 160, { w: 1.2 }), S.ellipse(443, 152, 8, 14, { fill: YEL, fop: 0.8, sw: 1 }));
  p.push(S.text(400, 22, 'Wind-pollinated flower', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.lines(468, 100, ['Large, feathery', 'stigma'], { size: 11, dy: 13 }), S.lead(466, 104, 414, 108));
  p.push(S.lines(468, 150, ['Anthers hang', 'out on long', 'filaments'], { size: 11, dy: 13 }), S.lead(466, 154, 452, 154));
  p.push(S.lines(468, 232, ['No bright petals,', 'no nectar'], { size: 11, dy: 13 }), S.lead(466, 236, 410, 232));
  p.push(S.lines(468, 282, ['Light, dry pollen'], { size: 11 }), S.lead(466, 278, 446, 160));
  return svgDoc(570, 316, 'Two flowers compared. An insect-pollinated flower has large bright scented petals, nectar at the base, a sticky stigma and a few anthers inside with sticky pollen. A wind-pollinated flower has no bright petals or nectar, a large feathery stigma and anthers hanging out on long filaments', p.join(''));
})();

// ---------------------------------------------------------------- 2. pistil with pollen tube (named and lettered)
function carpel(lettered) {
  const p = [];
  // ovary wall and style
  p.push(S.ellipse(200, 250, 82, 86, { fill: GREEN, fop: 0.12, sw: 2.2 }));
  p.push(S.line(190, 62, 190, 170, { w: 2 }), S.line(210, 62, 210, 170, { w: 2 }));
  p.push(S.path('M182 46 Q200 22 218 46 Q200 60 182 46 Z', { fill: YEL, fop: 0.45, w: 1.6 }));
  // pollen grains on stigma
  p.push(S.circle(192, 36, 4, { fill: YEL, fop: 0.9, sw: 1 }), S.circle(208, 34, 4, { fill: YEL, fop: 0.9, sw: 1 }));
  // ovule with embryo sac and stalk
  p.push(S.line(200, 300, 200, 334, { w: 2 }));
  p.push(S.ellipse(200, 262, 30, 42, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.8 }));
  p.push(S.ellipse(200, 268, 13, 24, { fill: BLUE, fop: 0.22, sw: 1.2 }));
  p.push(S.line(194, 221, 206, 221, { c: 'var(--diagram-fill)', w: 3 }));
  // pollen tube
  p.push(S.path('M200 44 L198 100 L202 160 L199 200 L200 224', { c: BLUE, w: 3, cap: 'round' }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E', 'F'] : ['Stigma', 'Pollen tube', 'Style', 'Ovary wall', 'Ovule', 'Micropyle'];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  p.push(S.text(300, 42, L[0], o), S.lead(296, 38, 218, 42));
  p.push(S.text(140, 134, L[1], { a: 'end', ...o }), S.lead(146, 130, 197, 130));
  p.push(S.text(300, 114, L[2], o), S.lead(296, 110, 212, 112));
  p.push(S.text(300, 194, L[3], o), S.lead(296, 190, 264, 208));
  p.push(S.text(300, 270, L[4], o), S.lead(296, 266, 230, 264));
  p.push(S.text(108, 218, L[5], { a: 'end', ...o }), S.lead(114, 214, 194, 222));
  if (!lettered) {
    p.push(S.text(140, 32, 'Pollen grains', { a: 'end', size: 11 }), S.lead(146, 28, 188, 34));
    p.push(S.text(108, 296, 'Embryo sac', { a: 'end', size: 11 }), S.lead(114, 292, 190, 274));
  }
  const label = lettered
    ? 'A pistil in section after pollination, with parts lettered: A the sticky top, B the thread that grows down from a pollen grain, C the narrow neck, D the outer layer of the swollen base, E the small body inside the base, F the small opening at the top of that body'
    : 'A pistil in section after pollination: pollen grains on the stigma, a pollen tube growing down the style through the ovary to the micropyle of the ovule, which holds the embryo sac inside the ovary wall';
  return svgDoc(400, 350, label, p.join(''));
}
export const CARPEL = carpel(false);
export const CARPEL_LETTERED = carpel(true);

// ---------------------------------------------------------------- 3. embryo sac at fertilisation (named and lettered)
function embryoSac(lettered) {
  const p = [];
  p.push(S.ellipse(230, 172, 88, 142, { fill: 'var(--diagram-fill)', fop: 1, sw: 2.2 }));
  // synergids and egg
  p.push(S.ellipse(206, 68, 13, 17, { fill: GREEN, fop: 0.3, sw: 1.2 }), S.ellipse(250, 68, 13, 17, { fill: GREEN, fop: 0.3, sw: 1.2 }));
  p.push(S.ellipse(228, 112, 17, 21, { fill: GREEN, fop: 0.45, sw: 1.6 }), S.circle(228, 114, 6, { fill: 'currentColor', sw: 0 }));
  // polar nuclei
  p.push(S.circle(218, 184, 9, { fill: YEL, fop: 0.7, sw: 1.4 }), S.circle(242, 184, 9, { fill: YEL, fop: 0.7, sw: 1.4 }));
  // antipodal cells
  for (const [x, y] of [[196, 268], [230, 280], [264, 268]]) p.push(S.circle(x, y, 12, { fill: GREEN, fop: 0.25, sw: 1.2 }), S.circle(x, y, 3.5, { fill: 'currentColor', sw: 0 }));
  // pollen tube and male gametes
  p.push(S.path('M340 12 Q300 24 258 56', { c: BLUE, w: 4, cap: 'round' }));
  p.push(S.circle(280, 80, 6, { fill: RED, sw: 0 }), S.circle(298, 96, 6, { fill: RED, sw: 0 }));
  p.push(S.arrow(274, 86, 246, 106, { size: 6 }), S.arrow(296, 104, 250, 176, { size: 6, dash: '4 3' }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Synergids', 'Egg cell', 'Polar nuclei', 'Antipodal cells', 'Male gametes'];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  p.push(S.text(112, 66, L[0], { a: 'end', ...o }), S.lead(118, 63, 192, 66));
  p.push(S.text(112, 116, L[1], { a: 'end', ...o }), S.lead(118, 113, 210, 113));
  p.push(S.text(112, 190, L[2], { a: 'end', ...o }), S.lead(118, 187, 208, 185));
  p.push(S.text(112, 280, L[3], { a: 'end', ...o }), S.lead(118, 277, 182, 275));
  p.push(S.text(326, 104, L[4], o), S.lead(322, 100, 306, 98));
  if (!lettered) p.push(S.text(306, 62, 'Pollen tube', { size: 11 }), S.lead(318, 56, 308, 30));
  const label = lettered
    ? 'An embryo sac at fertilisation with parts lettered: A the two cells beside the egg at the pollen tube end, B the large cell below them, C the two nuclei in the middle, D the three cells at the far end, E the two small cells released from the pollen tube; one arrow goes to B and a dashed arrow goes to C'
    : 'An embryo sac at fertilisation: a pollen tube enters at the top and releases two male gametes; one moves to the egg cell and the other to the two polar nuclei; two synergids lie beside the egg and three antipodal cells lie at the far end';
  return svgDoc(420, 316, label, p.join(''));
}
export const EMBRYOSAC = embryoSac(false);
export const EMBRYOSAC_LETTERED = embryoSac(true);

// ---------------------------------------------------------------- 4. pollination by water (Vallisneria)
export const WATER = (() => {
  const p = [];
  p.push(S.rect(0, 100, 520, 180, { fill: BLUE, fop: 0.1, sw: 0 }));
  p.push(S.path('M0 100 Q30 94 60 100 T120 100 T180 100 T240 100 T300 100 T360 100 T420 100 T480 100 T540 100', { c: BLUE, w: 1.6 }));
  p.push(S.rect(0, 272, 520, 20, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 0 }));
  // female plant: leaves and a long coiled stalk to the surface
  for (const x of [150, 166, 184]) p.push(S.path(`M${x} 272 Q${x - 10} 240 ${x + 6} 206`, { c: GREEN, w: 3 }));
  p.push(S.path('M176 272 Q146 238 188 218 Q226 198 190 178 Q154 158 190 138 L190 106', { c: GREEN, w: 2.2 }));
  p.push(S.circle(190, 98, 8, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.6 }), S.circle(190, 98, 3, { fill: RED, fop: 0.5, sw: 0 }));
  // male plant: buds at the base, released flowers floating
  for (const x of [330, 346, 362]) p.push(S.path(`M${x} 272 Q${x + 8} 240 ${x - 4} 210`, { c: GREEN, w: 3 }));
  for (const [x, y] of [[334, 262], [352, 264], [366, 262]]) p.push(S.circle(x, y, 6, { fill: YEL, fop: 0.6, sw: 1.2 }));
  p.push(S.arrow(350, 250, 336, 114, { c: BLUE, dash: '4 3', size: 7 }));
  for (const x of [300, 262, 232]) p.push(S.circle(x, 94, 6, { fill: YEL, fop: 0.7, sw: 1.2 }));
  p.push(S.arrow(318, 82, 214, 82, { size: 7 }));
  p.push(S.lines(16, 26, ['Female flower is carried up by its', 'long, coiled stalk to the surface'], { size: 11, dy: 13 }), S.lead(120, 40, 184, 90));
  p.push(S.lines(330, 24, ['Male flowers break off and', 'float on the surface'], { size: 11, dy: 13 }), S.lead(400, 40, 306, 88));
  p.push(S.lines(376, 200, ['Male flowers form', 'under the water'], { size: 11, dy: 13 }), S.lead(374, 204, 368, 256));
  p.push(S.lines(8, 168, ['Coiled stalk'], { size: 11 }), S.lead(80, 166, 170, 160));
  p.push(S.text(260, 270, 'Mud', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(520, 296, 'Pollination by water in Vallisneria: the female flower is lifted to the water surface on a long coiled stalk; male flowers form under water, break off, rise and float on the surface until they touch the female flower', p.join(''));
})();
