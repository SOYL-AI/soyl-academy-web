// SVG diagrams for ICSE 10 Biology ch16 Pollution. All new, schematic drawings; chart values come from calc.mjs.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { DDT, NOISE, NOISE_LIMIT } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const cloud = (x, y, s = 1) => [[-22, 4, 18], [0, -6, 22], [24, 2, 18], [8, 10, 18]].map(([dx, dy, r]) => S.circle(x + dx * s, y + dy * s, r * s, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 })).join('');

// ---------------------------------------------------------------- 1. the greenhouse effect
export const GREENHOUSE = (() => {
  const p = [];
  p.push(S.rect(0, 92, 540, 52, { fill: 'var(--diagram-blue)', fop: 0.13, sw: 0 }));
  for (let i = 0; i < 26; i++) p.push(S.circle(14 + i * 20 + (i % 2) * 6, 104 + (i % 3) * 14, 2.6, { fill: 'var(--diagram-blue)', sw: 0 }));
  p.push(lab(150, 70, 'Greenhouse gases: carbon dioxide, methane,', { c: 'var(--diagram-blue)' }), lab(150, 84, 'nitrous oxide, CFCs, water vapour', { c: 'var(--diagram-blue)' }));
  p.push(S.circle(56, 46, 26, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1.2 }), lab(36, 88, 'Sun'));
  p.push(S.path('M0 262 Q140 248 270 258 T540 256 L540 300 L0 300 Z', { fill: 'var(--diagram-green)', fop: 0.25, w: 1.4 }));
  p.push(S.arrow(84, 62, 170, 254, { c: 'var(--diagram-yellow)', w: 2.4, size: 9 }), S.arrow(96, 54, 230, 254, { c: 'var(--diagram-yellow)', w: 2.4, size: 9 }));
  p.push(lab(120, 196, 'Sunlight', { a: 'end' }), lab(120, 209, 'passes through', { a: 'end' }));
  p.push(S.arrow(320, 252, 360, 134, { c: 'var(--diagram-red)', w: 2.2, size: 8 }), S.arrow(360, 134, 400, 250, { c: 'var(--diagram-red)', w: 2.2, size: 8, dash: '6 4' }));
  p.push(S.arrow(500, 252, 530, 20, { c: 'var(--diagram-red)', w: 2.2, size: 8 }));
  p.push(lab(238, 228, 'Earth gives off'), lab(238, 241, 'heat (infrared)'), lab(408, 196, 'Much is trapped'), lab(408, 209, 'and sent back'), lab(510, 34, 'Some escapes', { a: 'end' }), lab(510, 47, 'to space', { a: 'end' }));
  p.push(S.text(270, 288, 'More greenhouse gases trap more heat: global warming', { a: 'middle', size: 12, w: 'bold' }));
  return svgDoc(540, 300, 'The greenhouse effect. Sunlight passes through a layer of greenhouse gases (carbon dioxide, methane, nitrous oxide, CFCs and water vapour) and warms the Earth. The Earth gives off heat as infrared rays; much of this heat is trapped by the gases and sent back to the surface, while some escapes to space. More greenhouse gases trap more heat, causing global warming', p.join(''));
})();

// ---------------------------------------------------------------- 2. ozone layer and its depletion
export const OZONE = (() => {
  const p = [];
  p.push(S.rect(0, 96, 540, 34, { fill: 'var(--diagram-blue)', fop: 0.28, sw: 0 }));
  p.push(S.rect(300, 96, 90, 34, { fill: 'var(--diagram-fill)', fop: 1, sw: 1, dash: '4 3', c: 'var(--diagram-blue)' }));
  p.push(lab(10, 117, 'Ozone layer in the stratosphere (absorbs UV)', { c: 'var(--diagram-blue)' }), lab(398, 117, 'Thinned ozone ("hole")', { c: 'var(--diagram-blue)' }));
  p.push(S.line(0, 200, 540, 200, { c: 'var(--diagram-muted)', w: 1, dash: '2 4' }), lab(10, 196, 'Troposphere below', { size: 10, c: 'var(--diagram-muted)' }));
  for (const x of [120, 210]) p.push(S.arrow(x, 14, x, 94, { c: 'var(--diagram-accent)', w: 2.2, size: 8 }), S.text(x + 6, 40, 'UV', { size: 10, c: 'var(--diagram-accent)' }));
  p.push(S.arrow(345, 14, 345, 262, { c: 'var(--diagram-accent)', w: 2.2, size: 8 }), S.text(351, 40, 'UV', { size: 10, c: 'var(--diagram-accent)' }));
  p.push(S.path('M0 270 L540 270', { w: 1.4 }), S.rect(0, 270, 540, 18, { fill: 'var(--diagram-green)', fop: 0.25, sw: 0 }));
  // fridge and spray can releasing CFCs
  p.push(S.rect(40, 214, 34, 56, { rx: 3, fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.line(40, 236, 74, 236, { w: 1 }), S.rect(84, 244, 12, 26, { rx: 2, fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }));
  p.push(S.path('M74 216 C120 196 236 190 272 140', { c: 'var(--diagram-red)', w: 1.8, dash: '5 4' }), S.head(275, 135, -0.95, { c: 'var(--diagram-red)', size: 8 }));
  p.push(lab(108, 224, 'CFCs from old refrigerators,', { c: 'var(--diagram-red)' }), lab(108, 237, 'air conditioners and sprays', { c: 'var(--diagram-red)' }), lab(108, 250, 'rise and destroy ozone', { c: 'var(--diagram-red)' }));
  p.push(lab(360, 236, 'More UV-B reaches the ground:'), lab(360, 249, 'skin cancer, cataract,'), lab(360, 262, 'harm to crops and plankton'));
  return svgDoc(540, 290, 'The ozone layer in the stratosphere absorbs most ultraviolet rays from the Sun. CFCs released from old refrigerators, air conditioners and spray cans rise to the stratosphere and destroy ozone, thinning the layer. Where it is thin, more UV-B rays reach the ground, causing skin cancer and cataract and harming crops and plankton', p.join(''));
})();

// ---------------------------------------------------------------- 3. acid rain
export const ACIDRAIN = (() => {
  const p = [];
  // factory and car
  p.push(S.rect(20, 200, 90, 62, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }), S.rect(78, 150, 16, 50, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }));
  p.push(S.circle(90, 136, 10, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 0 }), S.circle(104, 120, 13, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 0 }), S.circle(122, 104, 15, { fill: 'var(--diagram-muted)', fop: 0.3, sw: 0 }));
  p.push(S.rect(140, 240, 54, 18, { rx: 5, fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }), S.circle(152, 260, 6, { fill: 'currentColor', sw: 0 }), S.circle(182, 260, 6, { fill: 'currentColor', sw: 0 }), S.circle(132, 252, 6, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 0 }));
  p.push(S.arrow(130, 96, 220, 66, { size: 8 }), S.arrow(150, 232, 230, 92, { size: 8 }));
  p.push(lab(186, 196, 'Sulphur dioxide,'), lab(186, 209, 'nitrogen oxides'));
  p.push(cloud(280, 56, 1.2), cloud(350, 60, 1));
  p.push(lab(236, 14, 'Gases dissolve in rain water: sulphuric and nitric acids'));
  for (let i = 0; i < 12; i++) {
    const x = 270 + i * 22;
    p.push(S.line(x, 90 + (i % 3) * 10, x - 6, 112 + (i % 3) * 10, { c: 'var(--diagram-blue)', w: 1.6 }));
  }
  // effects
  p.push(S.line(300, 262, 300, 200, { c: 'var(--diagram-brown)', w: 4 }), S.path('M300 210 L284 186 M300 200 L318 178 M300 222 L314 206', { c: 'var(--diagram-brown)', w: 2 }));
  p.push(S.path('M350 262 Q405 230 460 262 Z', { fill: 'var(--diagram-blue)', fop: 0.35, w: 1.2 }), S.ellipse(400, 252, 9, 4, { fill: 'currentColor', sw: 0 }), S.path('M409 252 l7 -5 l0 10 Z', { fill: 'currentColor', w: 0 }));
  p.push(S.rect(470, 200, 60, 62, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.path('M466 200 Q500 168 534 200', { fill: 'var(--diagram-fill)', fop: 1, w: 1.3 }), S.line(486, 230, 486, 262, { w: 1 }), S.line(514, 230, 514, 262, { w: 1 }));
  p.push(S.line(0, 262, 560, 262, { w: 1.4 }));
  p.push(S.text(300, 280, 'Trees damaged', { a: 'middle', size: 11 }), S.text(405, 280, 'Lake: fish die', { a: 'middle', size: 11 }), S.text(505, 280, 'Marble corroded', { a: 'middle', size: 11 }));
  return svgDoc(560, 290, 'Acid rain. A factory chimney and a car release sulphur dioxide and nitrogen oxides, which rise and dissolve in rain water in the clouds to form sulphuric and nitric acids. The acid rain damages trees, makes lakes acidic so that fish die, and corrodes marble buildings', p.join(''));
})();

// ---------------------------------------------------------------- 4. DDT along a food chain (imagined values)
export const DDT_CHAIN = (() => {
  const p = [];
  DDT.forEach((d, i) => {
    const x = 16 + i * 108, h = 40 + i * 30, y = 200 - h;
    p.push(S.rect(x, y, 86, h, { rx: 6, fill: 'var(--diagram-green)', fop: 0.12 + i * 0.05, sw: 1.2 }));
    const dots = [1, 3, 8, 16, 30][i];
    for (let k = 0; k < dots; k++) p.push(S.circle(x + 10 + ((k * 17) % 66), y + 10 + ((k * 7) % Math.max(10, h - 20)), 2.4, { fill: 'var(--diagram-red)', sw: 0 }));
    p.push(S.text(x + 43, 220, d.level, { a: 'middle', size: 11, w: 'bold' }), S.text(x + 43, 236, `${d.ppm} ppm`, { a: 'middle', size: 11 }));
    if (i < DDT.length - 1) p.push(S.arrow(x + 88, 186, x + 106, 186, { size: 6 }));
  });
  p.push(lab(16, 24, 'Red dots: DDT. Its concentration rises at each step of the food chain (imagined values).', { size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(560, 248, `DDT along a lake food chain, imagined values: ${DDT.map((d) => `${d.level} ${d.ppm} parts per million`).join(', ')}. The concentration of DDT increases at each step`, p.join(''));
})();

// ---------------------------------------------------------------- 5. sources of pollution in a town (named and lettered)
function town(lettered) {
  const p = [];
  p.push(S.rect(0, 186, 680, 26, { fill: 'var(--diagram-muted)', fop: 0.25, sw: 0 }));
  p.push(S.path('M0 264 Q170 254 340 264 T680 262 L680 316 L0 316 Z', { fill: 'var(--diagram-blue)', fop: 0.25, w: 1.2 }));
  // A: car with exhaust
  p.push(S.rect(70, 182, 60, 18, { rx: 5, fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }), S.circle(84, 202, 6, { fill: 'currentColor', sw: 0 }), S.circle(118, 202, 6, { fill: 'currentColor', sw: 0 }));
  p.push(S.circle(58, 192, 6, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 0 }), S.circle(46, 186, 8, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 0 }));
  // B: power plant with hot-water outlet
  p.push(S.rect(180, 110, 80, 70, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.4 }), S.path('M196 110 L200 60 L224 60 L228 110', { fill: 'var(--diagram-fill)', fop: 1, w: 1.4 }));
  p.push(S.path('M240 180 L240 270', { c: 'var(--diagram-red)', w: 4 }), S.path('M240 276 q8 -6 16 0 t16 0 t16 0', { c: 'var(--diagram-red)', w: 1.6 }));
  // C: houses with a sewage pipe
  p.push(S.rect(340, 128, 40, 40, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.path('M336 128 L360 108 L384 128', { w: 1.3 }), S.rect(390, 134, 34, 34, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.path('M386 134 L407 116 L428 134', { w: 1.3 }));
  p.push(S.path('M380 170 L380 268', { c: 'var(--diagram-brown)', w: 5 }), S.ellipse(380, 282, 16, 6, { fill: 'var(--diagram-brown)', fop: 0.5, sw: 0 }));
  // D: burning garbage heap
  p.push(S.path('M500 182 L530 140 L566 182 Z', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.3 }));
  p.push(S.path('M522 150 Q526 132 532 144 Q538 126 542 150', { fill: 'var(--diagram-red)', fop: 0.6, w: 1 }));
  p.push(S.circle(540, 112, 9, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 0 }), S.circle(552, 94, 12, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 0 }));
  // E: farm field with run-off and algae in the river
  for (let i = 0; i < 5; i++) p.push(S.line(504 + i * 20, 222, 516 + i * 20, 252, { c: 'var(--diagram-green)', w: 3 }));
  p.push(S.arrow(530, 254, 528, 276, { c: 'var(--diagram-green)', size: 6 }), S.arrow(570, 254, 568, 276, { c: 'var(--diagram-green)', size: 6 }));
  for (const [x, y] of [[500, 290], [530, 296], [560, 288], [590, 298], [470, 300]]) p.push(S.ellipse(x, y, 9, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 0 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Vehicle exhaust', 'Hot water from a power plant', 'Untreated sewage', 'Burning garbage', 'Fertiliser run-off from fields'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  p.push(S.lead(52, 182, 40, 150), lab(lettered ? 34 : 6, 144, L[0], o));
  p.push(S.lead(236, 236, 190, 236), lab(186, 240, L[1], { a: 'end', ...o }));
  p.push(S.lead(384, 236, 400, 236), lab(404, 240, L[2], o));
  p.push(S.lead(560, 160, 590, 150), lettered ? lab(594, 154, L[3], o) : S.lines(594, 148, ['Burning', 'garbage'], { size: 11 }));
  p.push(S.lead(596, 238, 608, 238), lettered ? lab(612, 243, L[4], o) : S.lines(612, 226, ['Fertiliser', 'run-off', 'from fields'], { size: 11 }));
  p.push(lab(8, 310, 'River', { c: 'var(--diagram-blue)' }));
  const label = lettered
    ? 'A town beside a river with five sources of pollution lettered: A, a car with smoke from its exhaust on the road; B, a power plant with a red pipe pouring water into the river, with wavy lines in the water; C, houses with a brown pipe draining into the river; D, a heap of rubbish with flames and smoke; E, a farm field with arrows draining into the river, where green patches float'
    : 'A town beside a river with five sources of pollution: exhaust smoke from a car, hot water poured into the river by a power plant, untreated sewage draining from houses, a burning garbage heap, and fertiliser run-off from fields causing green algae to grow in the river';
  return svgDoc(680, 318, label, p.join(''));
}
export const TOWN = town(false);
export const TOWN_LETTERED = town(true);

// ---------------------------------------------------------------- 6. noise levels (imagined readings)
export const NOISE_FIG = (() => {
  const p = [];
  const x = (db) => 150 + db * 2.6;
  for (let db = 0; db <= 140; db += 20) p.push(S.line(x(db), 18, x(db), 196, { c: 'var(--diagram-muted)', w: 0.5 }), S.text(x(db), 212, String(db), { a: 'middle', size: 10 }));
  NOISE.forEach((n, i) => {
    const y = 26 + i * 34;
    p.push(S.rect(x(0), y, x(n.db) - x(0), 22, { fill: n.db > NOISE_LIMIT ? 'var(--diagram-red)' : 'var(--diagram-green)', fop: 0.35, sw: 1.1 }));
    p.push(S.text(144, y + 15, n.place, { a: 'end', size: 11 }), S.text(x(n.db) + 5, y + 15, String(n.db), { size: 10 }));
  });
  p.push(S.line(x(NOISE_LIMIT), 14, x(NOISE_LIMIT), 196, { c: 'var(--diagram-red)', w: 1.6, dash: '5 4' }), lab(x(NOISE_LIMIT) + 4, 12, `about ${NOISE_LIMIT} dB: harmful with long exposure`, { size: 10, c: 'var(--diagram-red)' }));
  p.push(S.line(x(0), 18, x(0), 196, { w: 1.2 }), S.text(x(70), 232, 'Sound level (decibels, dB)', { a: 'middle', size: 11 }));
  return svgDoc(540, 240, `Bar chart of imagined sound levels in decibels: ${NOISE.map((n) => `${n.place} ${n.db}`).join(', ')}. A dashed line at about ${NOISE_LIMIT} decibels marks the level above which long exposure harms hearing`, p.join(''));
})();
