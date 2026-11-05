// SVG diagrams for ICSE 9 Biology ch13 Diseases and their Transmission. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';
import { WEEKLY } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

/** A simple standing person: head at (x, y). */
function person(x, y, { sick = false } = {}) {
  const p = [];
  p.push(S.circle(x, y, 14, { c: 'currentColor', fill: FILL, fop: 1, sw: 1.6 }));
  p.push(S.line(x, y + 14, x, y + 70, { w: 2.4 }));
  p.push(S.line(x - 24, y + 36, x + 24, y + 36, { w: 2.4 }));
  p.push(S.line(x, y + 70, x - 16, y + 108, { w: 2.4 }), S.line(x, y + 70, x + 16, y + 108, { w: 2.4 }));
  if (sick) for (const [dx, dy] of [[-6, 30], [6, 44], [-4, 56], [8, 24]]) p.push(S.circle(x + dx, y + dy, 2.6, { c: RED, fill: RED, fop: 0.9, sw: 0.6 }));
  return p.join('');
}
/** A mosquito (or fly) seen from the side, centred at (x, y), facing left. */
function insect(x, y, { mosq = true } = {}) {
  const p = [];
  p.push(S.ellipse(x, y, 26, 7, { c: 'currentColor', fill: MUTED, fop: 0.5, sw: 1.4 }));
  p.push(S.circle(x - 30, y, 6, { c: 'currentColor', fill: MUTED, fop: 0.5, sw: 1.4 }));
  if (mosq) p.push(S.line(x - 36, y + 1, x - 52, y + 6, { w: 1.6 }));
  p.push(S.path(`M${x - 6} ${y - 6} C${x - 4} ${y - 26} ${x + 14} ${y - 28} ${x + 18} ${y - 8}`, { c: BLUE, w: 1.4, fill: BLUE, fop: 0.18 }));
  for (const dx of [-12, 0, 12]) p.push(S.line(x + dx, y + 6, x + dx + (dx < 0 ? -8 : 8), y + 24, { w: 1.3 }));
  return p.join('');
}

// ---------------------------------------------------------------- 1. how a mosquito passes a disease from person to person (named, and lettered A-E)
function malaria(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  p.push(person(80, 70, { sick: true }), person(560, 70));
  p.push(insect(320, 100));
  // stagnant water pool with larvae
  p.push(S.ellipse(320, 288, 110, 22, { c: BLUE, fill: BLUE, fop: 0.3, sw: 1.5 }));
  for (const [dx, dy] of [[-50, -2], [-10, 4], [30, -4], [60, 4]]) p.push(S.path(`M${320 + dx} ${288 + dy} q4 -6 8 0 q4 6 8 0`, { c: 'currentColor', w: 1.3 }));
  // arrows: blood to mosquito, mosquito to the new person, eggs into water
  p.push(S.arrow(110, 130, 250, 108, { c: RED, w: 2 }));
  p.push(S.arrow(364, 106, 524, 130, { c: RED, w: 2 }));
  p.push(S.arrow(320, 132, 320, 262, { c: MUTED, w: 1.6, dash: '4 3' }));
  if (!lettered) {
    p.push(S.text(80, 200, 'Infected person', { a: 'middle', ...o }), S.text(560, 200, 'Healthy person', { a: 'middle', ...o }));
    p.push(S.text(320, 36, 'Female Anopheles mosquito', { a: 'middle', ...o }), S.lead(320, 40, 320, 78));
    p.push(S.lines(184, 52, ['Mosquito sucks blood', 'carrying the parasites'], { a: 'middle', ...o, dy: 13 }));
    p.push(S.lines(456, 52, ['Next bite passes the', 'parasites to a new person'], { a: 'middle', ...o, dy: 13 }));
    p.push(S.lines(344, 196, ['Lays eggs in', 'stagnant water'], { a: 'start', ...o, dy: 13 }));
    p.push(S.text(320, 326, 'Stagnant water: eggs and larvae', { a: 'middle', ...o }));
  } else {
    p.push(S.text(80, 200, 'A', { a: 'middle', ...o }));
    p.push(S.text(320, 40, 'B', { a: 'middle', ...o }), S.lead(320, 46, 320, 78));
    p.push(S.text(560, 200, 'D', { a: 'middle', ...o }));
    p.push(S.text(320, 330, 'C', { a: 'middle', ...o }), S.lead(320, 316, 320, 304));
    p.push(S.text(444, 94, 'E', { a: 'middle', ...o }), S.lead(444, 100, 444, 118));
  }
  const name = lettered
    ? 'A person with red spots, A, is bitten by a mosquito, B, which then bites a healthy person, D, along arrow E; the mosquito also lays eggs in a pool of stagnant water, C'
    : 'An infected person is bitten by a female Anopheles mosquito, which sucks blood carrying the parasites; its next bite passes the parasites to a healthy person; the mosquito lays eggs in stagnant water where eggs and larvae develop';
  return svgDoc(640, lettered ? 340 : 340, name, p.join(''));
}
export const MALARIA = malaria(false);
export const MALARIA_LETTERED = malaria(true);

// ---------------------------------------------------------------- 2. a housefly carrying germs from waste to food (named, and lettered A-E)
function fly(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // open waste pile
  p.push(S.path('M30 250 C40 214 70 200 100 214 C120 204 150 220 160 250 Z', { c: BROWN, fill: BROWN, fop: 0.35, w: 1.6 }));
  for (const [x, y] of [[62, 238], [90, 232], [120, 240], [140, 244]]) p.push(S.circle(x, y, 3, { c: BROWN, fill: BROWN, fop: 0.8, sw: 0.8 }));
  // fly
  p.push(insect(300, 120, { mosq: false }));
  // germs on the fly legs and body
  for (const [x, y] of [[272, 140], [292, 148], [312, 148], [330, 140]]) p.push(S.circle(x, y, 3, { c: RED, fill: RED, fop: 0.85, sw: 0.6 }));
  // uncovered food on a plate
  p.push(S.ellipse(330, 262, 66, 12, { c: 'currentColor', fill: FILL, fop: 1, sw: 1.6 }));
  p.push(S.path('M290 258 C296 232 326 226 350 240 C366 232 376 248 372 258 Z', { c: YEL, fill: YEL, fop: 0.5, w: 1.4 }));
  // person who eats
  p.push(person(560, 80));
  p.push(S.arrow(150, 214, 262, 138, { c: MUTED, w: 1.8, dash: '4 3' }));
  p.push(S.arrow(318, 150, 326, 224, { c: RED, w: 2 }));
  p.push(S.arrow(380, 250, 528, 190, { c: RED, w: 2 }));
  if (!lettered) {
    p.push(S.text(96, 282, 'Open waste', { a: 'middle', ...o }));
    p.push(S.text(300, 52, 'Housefly', { a: 'middle', ...o }), S.lead(300, 58, 300, 94));
    p.push(S.text(396, 160, 'Germs on its legs and body', { a: 'start', ...o }), S.lead(392, 156, 332, 144));
    p.push(S.text(330, 296, 'Uncovered food', { a: 'middle', ...o }));
    p.push(S.text(560, 218, 'Person who eats the food', { a: 'middle', ...o }));
    p.push(S.text(196, 160, 'Fly feeds on waste', { a: 'middle', ...o }));
  } else {
    p.push(S.text(96, 286, 'A', { a: 'middle', ...o }));
    p.push(S.text(300, 52, 'B', { a: 'middle', ...o }), S.lead(300, 60, 300, 94));
    p.push(S.text(330, 300, 'C', { a: 'middle', ...o }));
    p.push(S.text(560, 222, 'D', { a: 'middle', ...o }));
    p.push(S.text(392, 170, 'E', { a: 'start', ...o }), S.lead(390, 164, 332, 144));
  }
  const name = lettered
    ? 'A pile of open waste, A, with a fly, B, that carries red germs on its body and legs, E, to uncovered food on a plate, C, which is then eaten by a person, D'
    : 'A housefly feeds on open waste, picks up germs on its legs and body, and carries them to uncovered food, which is then eaten by a person';
  return svgDoc(640, 310, name, p.join(''));
}
export const FLY = fly(false);
export const FLY_LETTERED = fly(true);

// ---------------------------------------------------------------- 3. new cases each week in an outbreak (bar chart)
function epi() {
  const p = [];
  const x0 = 70;
  const y0 = 250;
  const sc = 3; // pixels per case
  const bw = 46;
  const gap = 24;
  p.push(S.line(x0, 40, x0, y0, { w: 1.6 }), S.line(x0, y0, x0 + WEEKLY.length * (bw + gap) + 10, y0, { w: 1.6 }));
  for (const t of [0, 20, 40, 60]) {
    p.push(S.line(x0 - 4, y0 - t * sc, x0, y0 - t * sc, { w: 1.2 }), S.text(x0 - 8, y0 - t * sc + 4, String(t), { a: 'end', size: 11 }));
    if (t) p.push(S.line(x0, y0 - t * sc, x0 + WEEKLY.length * (bw + gap) + 10, y0 - t * sc, { c: MUTED, w: 0.6, dash: '2 4' }));
  }
  WEEKLY.forEach((v, i) => {
    const x = x0 + 16 + i * (bw + gap);
    p.push(S.rect(x, y0 - v * sc, bw, v * sc, { c: BLUE, fill: BLUE, fop: 0.4, sw: 1.4 }));
    p.push(S.text(x + bw / 2, y0 - v * sc - 6, String(v), { a: 'middle', size: 11, w: 'bold' }));
    p.push(S.text(x + bw / 2, y0 + 16, String(i + 1), { a: 'middle', size: 11 }));
  });
  p.push(S.text(x0 + (WEEKLY.length * (bw + gap)) / 2, y0 + 36, 'Week of the outbreak', { a: 'middle', size: 12 }));
  p.push(S.text(x0, 28, 'New cases in the week', { size: 12 }));
  const name = `A bar chart of new cases in each of six weeks of an outbreak: ${WEEKLY.join(', ')}`;
  return svgDoc(600, 300, name, p.join(''));
}
export const EPI = epi();
