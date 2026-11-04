// SVG diagrams for ICSE 9 Biology ch14 Aids to Health and Health Organisations. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';
import { DAYS, LEVEL, BOOSTER_DAY } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. antibody level after a first dose and a booster (graph)
function vacc() {
  const p = [];
  const x0 = 70;
  const y0 = 260;
  const xs = 8.6; // pixels a day
  const ys = 2.6; // pixels a unit
  const X = (d) => x0 + d * xs;
  const Y = (v) => y0 - v * ys;
  p.push(S.line(x0, 40, x0, y0, { w: 1.6 }), S.line(x0, y0, X(52), y0, { w: 1.6 }));
  for (const t of [0, 20, 40, 60, 80]) {
    p.push(S.line(x0 - 4, Y(t), x0, Y(t), { w: 1.2 }), S.text(x0 - 8, Y(t) + 4, String(t), { a: 'end', size: 11 }));
    if (t) p.push(S.line(x0, Y(t), X(52), Y(t), { c: MUTED, w: 0.6, dash: '2 4' }));
  }
  for (const d of DAYS) p.push(S.line(X(d), y0, X(d), y0 + 4, { w: 1.2 }), S.text(X(d), y0 + 18, String(d), { a: 'middle', size: 11 }));
  p.push(S.path(DAYS.map((d, i) => `${i ? 'L' : 'M'}${X(d)} ${Y(LEVEL[i])}`).join(' '), { c: BLUE, w: 2.6, join: 'round' }));
  DAYS.forEach((d, i) => p.push(S.circle(X(d), Y(LEVEL[i]), 3.4, { c: BLUE, fill: BLUE, fop: 1, sw: 1 })));
  // dose markers
  p.push(S.line(X(0), 44, X(0), y0, { c: RED, w: 1.4, dash: '5 3' }), S.line(X(BOOSTER_DAY), 44, X(BOOSTER_DAY), y0, { c: RED, w: 1.4, dash: '5 3' }));
  p.push(S.text(X(0) + 6, 52, 'First dose', { size: 12, w: 'bold' }), S.text(X(BOOSTER_DAY) - 6, 52, 'Booster dose', { a: 'end', size: 12, w: 'bold' }));
  p.push(S.text(X(DAYS[5]) + 8, Y(LEVEL[5]) + 2, String(LEVEL[5]), { size: 12, w: 'bold' }), S.text(X(DAYS[2]), Y(LEVEL[2]) - 8, String(LEVEL[2]), { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.text(X(26), y0 + 40, 'Days after the first dose', { a: 'middle', size: 12 }), S.text(x0, 28, 'Antibody level (arbitrary units)', { size: 12 }));
  const name = `A line graph of antibody level against days: after the first dose on day zero the level rises slowly to ${LEVEL[2]} by day fourteen and falls to ${LEVEL[4]} by day twenty-eight; after the booster on day twenty-eight it rises sharply to ${LEVEL[5]} by day thirty-five and stays high`;
  return svgDoc(600, 320, name, p.join(''));
}
export const VACC = vacc();

// ---------------------------------------------------------------- 2. first-line defences of the body (named, and lettered A-E)
function defence(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // torso and arms
  p.push(S.path('M232 176 C260 164 340 164 368 176 L384 392 L216 392 Z', { c: 'currentColor', w: 1.8, fill: FILL, fop: 1 }));
  p.push(S.path('M232 180 C200 220 190 290 196 340', { c: 'currentColor', w: 1.8 }), S.path('M368 180 C400 220 410 290 404 340', { c: 'currentColor', w: 1.8 }));
  // neck and head
  p.push(S.line(284, 138, 284, 170, { w: 1.8 }), S.line(316, 138, 316, 170, { w: 1.8 }));
  p.push(S.circle(300, 90, 50, { c: 'currentColor', w: 1.8, fill: FILL, fop: 1 }));
  // eyes with a tear
  p.push(S.ellipse(282, 82, 9, 5, { c: 'currentColor', w: 1.4 }), S.ellipse(318, 82, 9, 5, { c: 'currentColor', w: 1.4 }));
  p.push(S.path('M280 92 q-4 8 0 12 q4 -4 0 -12 Z', { c: BLUE, fill: BLUE, fop: 0.6, w: 1 }));
  // nose with hairs and mucus
  p.push(S.path('M300 88 L294 108 L306 108', { c: 'currentColor', w: 1.4 }));
  for (const dx of [-3, 0, 3]) p.push(S.line(300 + dx, 108, 300 + dx, 104, { c: BROWN, w: 1 }));
  p.push(S.circle(300, 111, 2.4, { c: YEL, fill: YEL, fop: 0.9, sw: 0.8 }));
  // mouth with saliva
  p.push(S.path('M284 126 Q300 138 316 126', { c: 'currentColor', w: 1.6 }), S.circle(300, 131, 2.2, { c: BLUE, fill: BLUE, fop: 0.6, sw: 0.8 }));
  // windpipe with mucus
  p.push(S.line(300, 140, 300, 236, { c: MUTED, w: 6 }), S.line(300, 160, 300, 232, { c: YEL, w: 2, op: 0.9 }));
  // stomach with acid
  p.push(S.path('M312 262 C330 244 366 252 362 286 C358 312 322 316 312 296 C306 284 306 272 312 262 Z', { c: BROWN, w: 1.6, fill: YEL, fop: 0.4 }));
  for (const [x, y] of [[328, 270], [344, 276], [336, 292], [350, 292]]) p.push(S.circle(x, y, 2.2, { c: RED, fill: RED, fop: 0.8, sw: 0.6 }));
  if (!lettered) {
    p.push(S.text(150, 66, 'Tears from the eye', { a: 'end', ...o }), S.lead(154, 64, 276, 98));
    p.push(S.text(150, 112, 'Hairs and mucus in the nose', { a: 'end', ...o }), S.lead(154, 110, 296, 108));
    p.push(S.text(458, 126, 'Saliva in the mouth', o), S.lead(454, 124, 306, 130));
    p.push(S.text(458, 196, 'Mucus in the windpipe', o), S.lead(454, 194, 304, 190));
    p.push(S.text(458, 292, 'Acid in the stomach', o), S.lead(454, 290, 364, 288));
    p.push(S.text(150, 300, 'Skin', { a: 'end', ...o }), S.lead(154, 298, 222, 300));
  } else {
    p.push(S.text(150, 66, 'A', { a: 'end', ...o }), S.lead(154, 62, 276, 98));
    p.push(S.text(150, 114, 'B', { a: 'end', ...o }), S.lead(154, 110, 296, 108));
    p.push(S.text(458, 198, 'C', o), S.lead(454, 194, 304, 190));
    p.push(S.text(458, 294, 'D', o), S.lead(454, 290, 364, 288));
    p.push(S.text(150, 302, 'E', { a: 'end', ...o }), S.lead(154, 298, 222, 300));
  }
  const name = lettered
    ? 'Outline of a head and body with five defences lettered: A a drop on the eye, B the nose with hairs and mucus, C the windpipe lined with mucus, D the stomach containing acid, E the outer covering of the whole body'
    : 'Outline of a head and body showing the first-line defences: tears from the eye, hairs and mucus in the nose, saliva in the mouth, mucus and cilia in the windpipe, acid in the stomach and the skin';
  return svgDoc(640, 410, name, p.join(''));
}
export const DEFENCE = defence(false);
export const DEFENCE_LETTERED = defence(true);

// ---------------------------------------------------------------- 3. lining of the windpipe (named, and lettered A-E)
function lining(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // cells
  for (let i = 0; i < 6; i++) {
    const x = 90 + i * 64;
    p.push(S.rect(x, 190, 60, 72, { c: 'currentColor', w: 1.5, fill: FILL, fop: 1 }));
    p.push(S.circle(x + 30, 232, 9, { c: BROWN, fill: BROWN, fop: 0.45, sw: 1.2 }));
    for (let k = 0; k < 4; k++) p.push(S.line(x + 9 + k * 14, 190, x + 12 + k * 14, 160, { c: GREEN, w: 1.8, cap: 'round' }));
  }
  p.push(S.rect(90, 262, 384, 26, { c: YEL, fill: YEL, fop: 0.2, sw: 1.4 }));
  // mucus layer with trapped particles
  p.push(S.path('M90 150 C160 134 230 160 300 144 C370 130 430 156 474 142 L474 118 C430 130 370 104 300 120 C230 136 160 110 90 126 Z', { c: YEL, w: 1.4, fill: YEL, fop: 0.5 }));
  for (const [x, y] of [[150, 136], [230, 142], [330, 134], [420, 140]]) p.push(S.circle(x, y, 4.4, { c: RED, fill: RED, fop: 0.85, sw: 0.8 }));
  for (const [x, y] of [[190, 128], [370, 122]]) p.push(S.circle(x, y, 3, { c: BROWN, fill: BROWN, fop: 0.8, sw: 0.8 }));
  // direction of sweeping
  p.push(S.arrow(120, 96, 440, 96, { c: BLUE, w: 2.2, size: 9 }));
  if (!lettered) {
    p.push(S.text(280, 82, 'Mucus is swept up towards the throat', { a: 'middle', size: 12, ...{} }));
    p.push(S.text(500, 140, 'Mucus with trapped germs', { size: 11 }), S.lead(496, 138, 440, 138));
    p.push(S.text(500, 176, 'Cilia', o), S.lead(496, 174, 392, 176));
    p.push(S.text(500, 228, 'Lining cell', o), S.lead(496, 226, 462, 226));
    p.push(S.text(500, 278, 'Tissue below', o), S.lead(496, 276, 474, 276));
  } else {
    p.push(S.text(280, 80, 'E', { a: 'middle', ...o }));
    p.push(S.text(520, 140, 'A', o), S.lead(516, 136, 440, 138));
    p.push(S.text(520, 114, 'B', o), S.lead(516, 110, 420, 136));
    p.push(S.text(520, 180, 'C', o), S.lead(516, 176, 392, 176));
    p.push(S.text(520, 230, 'D', o), S.lead(516, 226, 462, 226));
  }
  const name = lettered
    ? 'A section of the lining of the windpipe: a layer of mucus, A, with a germ trapped in it, B, above hair-like cilia, C, on lining cells, D, with an arrow, E, showing the direction in which the mucus is swept'
    : 'A section of the lining of the windpipe: lining cells with hair-like cilia are covered by a layer of mucus that holds trapped dust and germs, and the cilia sweep the mucus up towards the throat';
  return svgDoc(660, 310, name, p.join(''));
}
export const LINING = lining(false);
export const LINING_LETTERED = lining(true);
