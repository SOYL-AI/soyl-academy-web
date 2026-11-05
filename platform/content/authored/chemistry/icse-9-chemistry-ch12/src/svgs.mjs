// SVG diagrams for ICSE 9 Chemistry ch12 Study of Gas Laws: gas molecules in a cylinder (three situations), the gas-law
// apparatus (named and lettered A to E) and the Celsius and kelvin scales side by side.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const GREEN = 'var(--diagram-green)';

// ---------------------------------------------------------------- 1. molecules in a cylinder
export const MOTION = (() => {
  const p = [];
  const panel = (x0, pY, mols, len, sub, flame) => {
    const cx0 = x0 + 35;
    const cw = 100;
    p.push(S.path(`M${cx0} 50 L${cx0} 200 L${cx0 + cw} 200 L${cx0 + cw} 50`, { w: 2 }));
    p.push(S.rect(cx0 + 1, pY, cw - 2, 8, { fill: FILL, sw: 1.5 }));
    p.push(S.line(cx0 + 50, pY, cx0 + 50, 30, { w: 2 }), S.line(cx0 + 30, 30, cx0 + 70, 30, { w: 3 }));
    for (const [mx, my, ang] of mols) {
      const x = cx0 + mx;
      const y = my;
      p.push(S.circle(x, y, 4.5, { fill: BLUE, fop: 0.55, sw: 1 }));
      p.push(S.arrow(x, y, x + len * Math.cos(ang), y + len * Math.sin(ang), { w: 1.2, size: 4.5, c: MUTED }));
    }
    p.push(S.lines(x0 + 85, 248, sub, { a: 'middle', size: 11, dy: 14 }));
    if (flame) {
      p.push(S.path(`M${cx0 + 30} 232 Q${cx0 + 38} 220 ${cx0 + 50} 206 Q${cx0 + 62} 220 ${cx0 + 70} 232 Z`, { fill: YEL, fop: 0.8, c: RED, w: 1.5 }));
    }
  };
  // same six molecules in a tall gas space, then in half the space, then faster in a larger space
  panel(10, 80, [[18, 108, 0.6], [62, 104, 2.4], [40, 140, -0.9], [78, 150, 3.4], [22, 180, 5.2], [64, 184, 4.2]], 11, ['Gas at constant temperature,', 'volume V'], false);
  panel(205, 140, [[18, 160, 0.6], [62, 158, 2.4], [40, 170, -0.9], [78, 175, 3.4], [22, 190, 5.2], [64, 190, 4.2]], 11, ['Piston pushed in, volume V/2:', 'more hits on each wall area'], false);
  panel(400, 58, [[18, 84, 0.6], [62, 80, 2.4], [40, 130, -0.9], [78, 150, 3.4], [22, 178, 5.2], [64, 184, 4.2]], 21, ['Gas heated, piston free to rise:', 'faster molecules push it up'], true);
  return svgDoc(600, 272, 'Three cylinders each fitted with a piston and holding six gas molecules drawn as dots with arrows. In the first the gas has volume V. In the second the piston is pushed in so the volume is half and the same molecules are crowded together, hitting each part of the wall more often. In the third the gas is heated by a flame, the arrows are longer because the molecules move faster, and the piston is pushed up so the volume is larger.', p.join(''));
})();

// ---------------------------------------------------------------- 2. apparatus: gas trapped under a piston in a water bath
function apparatus(lettered) {
  const p = [];
  // water bath
  p.push(S.rect(140, 90, 190, 160, { fill: BLUE, fop: 0.14, sw: 2 }));
  p.push(S.line(140, 90, 330, 90, { c: BLUE, w: 1.2, dash: '5 3' }));
  // cylinder
  p.push(S.path('M190 40 L190 222 L280 222 L280 40', { w: 2.4 }));
  // piston, rod and weights
  p.push(S.rect(191, 130, 88, 9, { fill: FILL, sw: 1.8 }));
  p.push(S.line(235, 130, 235, 24, { w: 2.4 }));
  p.push(S.rect(208, 8, 54, 18, { fill: MUTED, fop: 0.5, sw: 1.6 }));
  // trapped gas molecules
  for (const [x, y] of [[205, 152], [228, 168], [252, 150], [268, 176], [214, 196], [244, 200], [262, 210], [226, 146]]) p.push(S.circle(x, y, 4.5, { fill: BLUE, fop: 0.55, sw: 1 }));
  // thermometer in the bath
  p.push(S.rect(305, 62, 7, 92, { fill: FILL, sw: 1.4 }));
  p.push(S.rect(307.2, 108, 2.6, 46, { fill: RED, sw: 0 }));
  p.push(S.circle(308.5, 160, 7, { fill: RED, fop: 0.85, sw: 1.4 }));
  // tube from the cylinder to the pressure gauge
  p.push(S.path('M280 180 L420 180 L420 156', { w: 2.4 }));
  p.push(S.circle(420, 130, 28, { fill: FILL, sw: 2 }));
  p.push(S.line(420, 130, 436, 116, { w: 2 }), S.circle(420, 130, 3, { fill: 'currentColor', sw: 0 }));
  for (const a of [-2.4, -1.9, -1.4, -0.9, -0.4]) p.push(S.line(420 + 22 * Math.cos(a), 130 + 22 * Math.sin(a), 420 + 26 * Math.cos(a), 130 + 26 * Math.sin(a), { w: 1.2 }));
  // labels
  const L = (txt, x, y, o = {}) => (lettered ? S.text(x, y, txt[0], { size: 20, w: 'bold', a: o.a ?? 'start', c: 'currentColor' }) : S.lines(x, y, txt[1], { size: 11, dy: 13, a: o.a ?? 'start' }));
  p.push(L(['A', ['Piston', 'with load']], lettered ? 44 : 8, lettered ? 140 : 128));
  p.push(S.lead(lettered ? 62 : 62, 134, 192, 134));
  p.push(L(['B', ['Trapped gas']], lettered ? 44 : 8, lettered ? 190 : 186));
  p.push(S.lead(lettered ? 62 : 70, 182, 222, 182));
  p.push(L(['C', ['Thermometer']], lettered ? 356 : 346, 56));
  p.push(S.lead(lettered ? 360 : 358, 60, 313, 90));
  p.push(L(['D', ['Pressure', 'gauge']], lettered ? 470 : 456, lettered ? 176 : 172));
  p.push(S.lead(lettered ? 480 : 466, lettered ? 160 : 150, 448, 138));
  p.push(L(['E', ['Water bath']], lettered ? 44 : 8, lettered ? 240 : 238));
  p.push(S.lead(lettered ? 62 : 66, 234, 142, 234));
  if (!lettered) p.push(S.text(235, 268, 'Water bath keeps the temperature constant while the load is changed', { a: 'middle', size: 10, c: MUTED }));
  const alt = lettered
    ? 'Apparatus for a gas-law experiment with five parts lettered A to E. A is a piston carrying a load on a rod at the top of an upright cylinder. B is the gas trapped below the piston. C is a thermometer standing in the water around the cylinder. D is a pressure gauge joined to the cylinder by a tube. E is the water bath in which the cylinder stands.'
    : 'Apparatus for a gas-law experiment: gas is trapped under a piston carrying a load in an upright cylinder standing in a water bath. A thermometer in the bath shows the temperature, and a tube joins the cylinder to a pressure gauge.';
  return svgDoc(560, 278, alt, p.join(''));
}
export const APPARATUS = apparatus(false);
export const APPARATUS_LETTERED = apparatus(true);

// ---------------------------------------------------------------- 3. Celsius and kelvin scales
export const SCALES = (() => {
  const p = [];
  const x = (c) => 40 + (c + K.ZERO) * 1.4;
  const yC = 74;
  const yK = 132;
  p.push(S.line(x(-273), yC, x(127), yC, { w: 2.2 }), S.line(x(-273), yK, x(127), yK, { w: 2.2 }));
  const marks = [
    [-273, 'Absolute zero', 'start'],
    [0, 'Ice melts', 'middle'],
    [100, 'Water boils', 'middle'],
  ];
  for (const [c, ev, anchor] of marks) {
    const xx = x(c);
    p.push(S.line(xx, yC - 8, xx, yC + 8, { w: 2 }), S.line(xx, yK - 8, xx, yK + 8, { w: 2 }), S.line(xx, yC + 8, xx, yK - 8, { c: MUTED, w: 1, dash: '4 3' }));
    p.push(S.text(xx, 28, ev, { a: anchor, size: 12, w: 'bold' }));
    p.push(S.text(xx, 56, `${c < 0 ? '−' : ''}${Math.abs(c)} °C`, { a: anchor, size: 12, c: BROWN, w: 'bold' }));
    p.push(S.text(xx, 156, `${K.toK(c)} K`, { a: anchor, size: 12, c: BLUE, w: 'bold' }));
  }
  // room temperature as an unlabelled-value tick pair
  p.push(S.line(x(27), yC - 5, x(27), yC + 5, { w: 1.5 }), S.line(x(27), yK - 5, x(27), yK + 5, { w: 1.5 }));
  p.push(S.text(x(27) + 12, 105, `27 °C = ${K.toK(27)} K`, { size: 11, c: MUTED }));
  p.push(S.text(x(-273) + 14, 104, 'Celsius scale', { size: 11, c: BROWN }), S.text(x(-273) + 14, 120, 'Kelvin scale', { size: 11, c: BLUE }));
  p.push(S.text(320, 186, 'K = °C + 273', { a: 'middle', size: 13, w: 'bold' }));
  return svgDoc(640, 196, 'Two scales drawn one above the other. The Celsius scale marks absolute zero at minus 273 degrees, melting ice at 0 degrees and boiling water at 100 degrees. Dashed lines join each mark to the kelvin scale below, which reads 0 kelvin, 273 kelvin and 373 kelvin. A note says the kelvin value is the Celsius value plus 273.', p.join(''));
})();
