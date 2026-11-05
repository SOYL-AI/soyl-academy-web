// SVG diagrams for ICSE 9 Chemistry ch04 Water as a Universal Solvent: solubility curves (illustrative data from calc.mjs),
// the crystal test for saturation, and the Tyndall effect in a solution, a colloid and a suspension.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { TEMPS, KNO3, NACL, CASO4 } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';

// ---------------------------------------------------------------- 1. solubility curves (named and lettered)
function curves(lettered) {
  const p = [];
  const X = (t) => 60 + t * 3;
  const Y = (g) => 280 - g * 0.96;
  // left graph: potassium nitrate and sodium chloride
  p.push(S.line(60, 280, 60, 36, { w: 1.5 }), S.line(60, 280, 372, 280, { w: 1.5 }));
  for (let t = 0; t <= 100; t += 20) p.push(S.line(X(t), 280, X(t), 285, { w: 1 }), lab(X(t), 298, String(t), { a: 'middle', size: 10 }));
  for (let g = 0; g <= 250; g += 50) {
    p.push(S.line(55, Y(g), 60, Y(g), { w: 1 }), lab(50, Y(g) + 4, String(g), { a: 'end', size: 10 }));
    if (g > 0) p.push(S.line(60, Y(g), 360, Y(g), { c: MUTED, w: 0.5, dash: '2 4' }));
  }
  p.push(lab(215, 318, 'Temperature (degrees Celsius)', { a: 'middle' }));
  p.push(S.text(14, 160, 'Solubility (g per 100 g water)', { a: 'middle', size: 11 }).replace('<text ', '<text transform="rotate(-90 14 160)" '));
  p.push(S.path('M' + TEMPS.map((t, i) => `${X(t)} ${Y(KNO3[i]).toFixed(1)}`).join(' L'), { c: RED, w: 2.4, join: 'round' }));
  p.push(S.path('M' + TEMPS.map((t, i) => `${X(t)} ${Y(NACL[i]).toFixed(1)}`).join(' L'), { c: BLUE, w: 2.4, join: 'round' }));
  if (lettered) {
    p.push(S.text(300, 70, 'A', { size: 15, w: 'bold', c: RED }), S.lead(300, 76, 296, 115));
    p.push(S.text(300, 228, 'B', { size: 15, w: 'bold', c: BLUE }), S.lead(300, 233, 300, 243));
    // point D on the potassium nitrate curve at 60 degrees with guides
    p.push(S.line(X(60), Y(110), 60, Y(110), { c: MUTED, w: 1, dash: '4 3' }), S.line(X(60), Y(110), X(60), 280, { c: MUTED, w: 1, dash: '4 3' }));
    p.push(S.circle(X(60), Y(110), 4, { fill: 'currentColor', sw: 0 }), S.text(X(60) - 12, Y(110) - 8, 'D', { a: 'end', size: 15, w: 'bold' }));
    // point E on the sodium chloride curve at 20 degrees
    p.push(S.circle(X(20), Y(36), 4, { fill: 'currentColor', sw: 0 }), S.text(X(20), Y(36) - 10, 'E', { a: 'middle', size: 15, w: 'bold' }));
  } else {
    p.push(S.lines(78, 62, ['Potassium', 'nitrate'], { size: 12, w: 'bold', c: RED, dy: 14 }), S.lead(130, 66, 290, 128));
    p.push(lab(214, 232, 'Sodium chloride', { a: 'middle', size: 12, c: BLUE, w: 'bold' }));
  }
  // right graph: calcium sulphate on its own scale
  const x2 = (t) => 440 + t * 1.2;
  const y2 = (g) => 280 - g * 800;
  p.push(S.line(440, 280, 440, 36, { w: 1.5 }), S.line(440, 280, 570, 280, { w: 1.5 }));
  for (let t = 0; t <= 100; t += 50) p.push(S.line(x2(t), 280, x2(t), 285, { w: 1 }), lab(x2(t), 298, String(t), { a: 'middle', size: 10 }));
  for (const g of [0, 0.1, 0.2, 0.3]) {
    p.push(S.line(435, y2(g), 440, y2(g), { w: 1 }), lab(432, y2(g) + 4, String(g), { a: 'end', size: 10 }));
  }
  p.push(lab(505, 318, 'Temperature (degrees C)', { a: 'middle' }));
  p.push(S.path('M' + TEMPS.map((t, i) => `${x2(t)} ${y2(CASO4[i]).toFixed(1)}`).join(' L'), { c: GREEN, w: 2.4, join: 'round' }));
  if (lettered) p.push(S.text(520, 100, 'C', { size: 15, w: 'bold', c: GREEN }), S.lead(520, 106, 512, y2(CASO4[8]) - 6));
  else p.push(S.lines(470, 52, ['Calcium sulphate', '(own scale)'], { size: 12, w: 'bold', c: GREEN, dy: 14 }), S.lead(495, 70, 503, y2(0.23) - 6));
  p.push(S.text(505, 22, 'Slightly soluble: scale 0 to 0.3', { a: 'middle', size: 11 }));
  const alt = lettered
    ? 'Solubility graph with temperature across and grams per hundred grams of water up. Curve A, in red, rises steeply from the lower left to the upper right. Curve B, in blue, is almost flat just above 36 grams. Curve C, in green, in a smaller graph on its own scale, rises slightly then falls. Point D marks a point on curve A at 60 degrees Celsius with dotted guide lines to both axes. Point E marks a point on curve B at 20 degrees Celsius.'
    : 'Illustrative solubility curves in grams per hundred grams of water from 0 to 100 degrees Celsius. Potassium nitrate rises steeply from 13 to 246. Sodium chloride is almost flat near 36 to 39. Calcium sulphate, in a smaller graph on its own scale from 0 to 0.3, is very small, rising slightly to about 0.26 near 40 degrees and then falling.';
  return svgDoc(600, 330, alt, p.join(''));
}
export const SOLUBILITY = curves(false);
export const SOLUBILITY_LETTERED = curves(true);

// ---------------------------------------------------------------- 2. testing a solution with a crystal (three beakers)
export const SATTEST = (() => {
  const p = [];
  const beaker = (cx, title, sub) => {
    p.push(S.path(`M${cx - 50} 70 L${cx - 50} 190 L${cx + 50} 190 L${cx + 50} 70`, { w: 2 }));
    p.push(S.rect(cx - 49, 100, 98, 89, { fill: BLUE, fop: 0.12, sw: 0 }));
    p.push(S.line(cx - 50, 100, cx + 50, 100, { c: BLUE, w: 1.2 }));
    p.push(S.text(cx, 22, title, { a: 'middle', size: 13, w: 'bold' }), S.text(cx, 38, sub, { a: 'middle', size: 11 }));
  };
  // beaker 1 unsaturated: crystal dissolves
  beaker(85, 'Solution 1', 'one crystal added');
  p.push(S.rect(78, 52, 10, 10, { fill: YEL, fop: 0.7, sw: 1 }), S.arrow(83, 64, 83, 96, { w: 1.2 }));
  p.push(S.lines(85, 216, ['The crystal', 'dissolves'], { a: 'middle', dy: 14, size: 12 }), S.text(85, 258, 'Unsaturated', { a: 'middle', size: 13, w: 'bold', c: GREEN }));
  // beaker 2 saturated: crystal stays
  beaker(250, 'Solution 2', 'one crystal added');
  p.push(S.rect(243, 52, 10, 10, { fill: YEL, fop: 0.7, sw: 1 }), S.arrow(248, 64, 248, 96, { w: 1.2 }));
  p.push(S.rect(244, 178, 10, 10, { fill: YEL, fop: 0.7, sw: 1 }));
  p.push(S.lines(250, 216, ['The crystal stays', 'and does not change'], { a: 'middle', dy: 14, size: 12 }), S.text(250, 258, 'Saturated', { a: 'middle', size: 13, w: 'bold', c: BLUE }));
  // beaker 3 supersaturated: crystals form quickly
  beaker(415, 'Solution 3', 'one crystal added');
  p.push(S.rect(408, 52, 10, 10, { fill: YEL, fop: 0.7, sw: 1 }), S.arrow(413, 64, 413, 96, { w: 1.2 }));
  for (const [x, y] of [[385, 176], [398, 168], [412, 178], [426, 170], [440, 177], [392, 150], [420, 152], [436, 144], [405, 128]]) p.push(S.rect(x, y, 9, 9, { fill: YEL, fop: 0.7, sw: 1 }));
  p.push(S.lines(415, 216, ['Extra solid forms', 'all at once'], { a: 'middle', dy: 14, size: 12 }), S.text(415, 258, 'Supersaturated', { a: 'middle', size: 13, w: 'bold', c: RED }));
  return svgDoc(500, 276, 'Three beakers of the same salt solution at the same temperature, each tested with one crystal of the salt. In solution 1 the crystal dissolves, so it is unsaturated. In solution 2 the crystal stays unchanged at the bottom, so it is saturated. In solution 3 many crystals form at once around the added crystal, so it is supersaturated.', p.join(''));
})();

// ---------------------------------------------------------------- 3. solution, colloid and suspension in a beam of light
function beams(lettered) {
  const p = [];
  const names = lettered ? ['P', 'Q', 'R'] : ['Solution', 'Colloid', 'Suspension'];
  const nm = lettered ? { size: 15, w: 'bold' } : { size: 13, w: 'bold' };
  const jar = (cx, i) => {
    p.push(S.path(`M${cx - 45} 60 L${cx - 45} 200 L${cx + 45} 200 L${cx + 45} 60`, { w: 2 }));
    p.push(S.rect(cx - 44, 80, 88, 119, { fill: BLUE, fop: i === 2 ? 0.05 : 0.1, sw: 0 }));
    p.push(S.text(cx, 40, names[i], { a: 'middle', ...nm }));
  };
  // torch beams from the left
  for (let i = 0; i < 3; i++) {
    const cx = 80 + i * 170;
    jar(cx, i);
    p.push(S.rect(cx - 70, 118, 20, 22, { fill: YEL, fop: 0.5, sw: 1.2 }));
    p.push(S.line(cx - 50, 129, cx + 70, 129, { c: YEL, w: i === 0 ? 1.5 : 7, dash: i === 0 ? '5 4' : undefined }));
  }
  // solution: no visible beam inside
  p.push(lab(80, 222, 'Beam not visible', { a: 'middle' }));
  // colloid: beam visible, scattered dots
  for (const [x, y] of [[225, 105], [245, 150], [262, 118], [235, 175], [270, 160]]) p.push(S.circle(x, y, 1.8, { fill: MUTED, sw: 0 }));
  p.push(lab(250, 222, 'Beam visible', { a: 'middle' }));
  // suspension: large particles and sediment
  for (const [x, y] of [[395, 100], [412, 135], [430, 110], [445, 150], [402, 160], [428, 175]]) p.push(S.circle(x, y, 4, { fill: YEL, fop: 0.7, sw: 1 }));
  p.push(S.rect(377, 186, 86, 13, { fill: YEL, fop: 0.6, sw: 0 }), lab(420, 222, 'Cloudy, settles', { a: 'middle' }));
  p.push(lab(250, 248, lettered ? 'Particles: P smallest, R largest' : 'Particle size increases from left to right', { a: 'middle', size: 12 }));
  const alt = lettered
    ? 'Three jars lettered P, Q and R, each lit from the side by a torch beam. In P the beam cannot be seen through the liquid. In Q the beam shows as a bright path through the liquid. In R the liquid is cloudy with large particles and a layer settled at the bottom.'
    : 'Three jars lit from the side by a torch. In the solution the beam is not visible. In the colloid the beam shows as a bright path because small particles scatter the light. In the suspension the liquid is cloudy, large particles scatter light and a layer settles at the bottom.';
  return svgDoc(500, 262, alt, p.join(''));
}
export const TYNDALL = beams(false);
export const TYNDALL_LETTERED = beams(true);
