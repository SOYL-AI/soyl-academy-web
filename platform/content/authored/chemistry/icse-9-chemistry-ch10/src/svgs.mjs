// SVG diagrams for ICSE 9 Chemistry ch10: the laboratory preparation of hydrogen (named and lettered), steam over a heated
// metal (named and lettered) and the position of hydrogen in the periodic table. All new drawings.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { CONFIG } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED, a: 'middle' });

/** Trough of water with an inverted gas jar on a beehive shelf; the delivery tube rises into the jar. Returns fragments. */
function trough(jx, { left, right, rim, wsurf, bottom, jtop, mouth, gasLevel }) {
  const p = [];
  p.push(S.rect(left + 1, wsurf, right - left - 2, bottom - wsurf, { fill: BLUE, c: BLUE, fop: 0.15, sw: 0 }));
  p.push(S.path(`M${left} ${rim} L${left} ${bottom} L${right} ${bottom} L${right} ${rim}`, { w: 2 }));
  // water that still fills the jar below the gas
  p.push(S.rect(jx - 26, gasLevel, 52, mouth - gasLevel, { fill: BLUE, c: BLUE, fop: 0.15, sw: 0 }));
  p.push(S.path(`M${jx - 27} ${jtop} L${jx - 27} ${mouth} M${jx + 27} ${jtop} L${jx + 27} ${mouth} M${jx - 27} ${jtop} L${jx + 27} ${jtop}`, { w: 2 }));
  p.push(S.line(jx - 26, gasLevel, jx + 26, gasLevel, { c: MUTED, w: 1, dash: '3 3' }));
  // beehive shelf under the mouth
  p.push(S.rect(jx - 40, mouth + 6, 80, 6, { fill: MUTED, fop: 0.5, sw: 1.2 }));
  return p;
}

// ---------------------------------------------------------------- 1. laboratory preparation of hydrogen
function labPrep(lettered) {
  const p = [];
  // acid in the flask
  p.push(S.path('M131 215 L209 215 L232 262 Q237 288 212 290 L128 290 Q103 288 108 262 Z', { fill: BLUE, c: BLUE, fop: 0.15, w: 0 }));
  // flask
  p.push(S.path('M158 120 L158 160 L108 262 Q103 288 128 290 L212 290 Q237 288 232 262 L182 160 L182 120', { w: 2 }));
  p.push(S.rect(152, 108, 36, 14, { fill: MUTED, fop: 0.45, sw: 1.5 }));
  // thistle funnel: cone, then a stem whose lower end dips well below the acid surface
  p.push(S.path('M138 14 L190 14 L168 44 L160 44 Z', { w: 2 }));
  p.push(S.line(160, 44, 160, 270, { w: 2 }), S.line(168, 44, 168, 270, { w: 2 }));
  // delivery tube to the trough
  p.push(S.path('M177 126 L177 98 L330 98 L330 296 L372 296 L372 238', { w: 3 }));
  // zinc granules and bubbles
  for (const [x, y] of [[132, 281], [146, 283], [186, 283], [200, 281], [214, 280], [172, 284]]) p.push(S.circle(x, y, 4.5, { fill: MUTED, fop: 0.6, sw: 1.4 }));
  for (const [x, y] of [[140, 262], [190, 258], [205, 266], [150, 244], [196, 236], [138, 228]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  // trough, gas jar and bubbles
  p.push(...trough(372, { left: 300, right: 444, rim: 236, wsurf: 252, bottom: 318, jtop: 150, mouth: 270, gasLevel: 198 }));
  for (const [x, y] of [[372, 226], [376, 212]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  if (lettered) {
    p.push(L(112, 24, 'A'), S.lead(124, 22, 140, 22));
    p.push(L(204, 244, 'B'), S.lead(196, 240, 172, 236));
    p.push(L(118, 304, 'C'), S.lead(126, 300, 134, 284));
    p.push(L(250, 86, 'D'), S.lead(252, 90, 252, 97));
    p.push(L(436, 176, 'E'), S.lead(426, 174, 400, 174));
    return svgDoc(520, 340, 'Apparatus for preparing hydrogen from zinc and dilute acid, with five parts lettered A to E', p.join(''));
  }
  p.push(lab(4, 18, 'Thistle funnel', {}), S.lead(80, 15, 140, 20));
  p.push(lab(4, 240, 'Dilute acid', {}), S.lead(70, 236, 130, 236));
  p.push(lab(4, 306, 'Zinc granules', {}), S.lead(78, 302, 134, 286));
  p.push(lab(228, 86, 'Delivery tube', { a: 'middle' }));
  p.push(lab(410, 172, 'Hydrogen', {}), S.lead(408, 168, 400, 168));
  p.push(lab(452, 268, 'Beehive', {}), lab(452, 281, 'shelf', {}), S.lead(450, 276, 413, 279));
  p.push(lab(372, 336, 'Water in the trough', { a: 'middle' }));
  return svgDoc(520, 346, 'Laboratory preparation of hydrogen. Zinc granules lie in dilute acid in a flask closed with a stopper. A thistle funnel, whose lower end dips below the acid, is used to add acid. A delivery tube carries the gas into a trough of water, where hydrogen is collected in a jar full of water standing upside down over a beehive shelf', p.join(''));
}
export const LAB_H2 = labPrep(false);
export const LAB_H2_LETTERED = labPrep(true);

// ---------------------------------------------------------------- 2. steam over a heated metal
function steamSet(lettered) {
  const p = [];
  // boiling water flask
  p.push(S.path('M92 110 L92 150 L56 220 Q52 238 72 240 L128 240 Q148 238 144 220 L108 150 L108 110', { w: 2 }));
  p.push(S.path('M72 186 L128 186 L144 220 Q148 238 128 240 L72 240 Q52 238 56 220 Z', { fill: BLUE, c: BLUE, fop: 0.15, w: 0 }));
  p.push(S.rect(88, 100, 24, 12, { fill: MUTED, fop: 0.45, sw: 1.5 }));
  for (const [x, y] of [[82, 220], [100, 212], [116, 222], [92, 200], [108, 196]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  // burner under the flask
  p.push(S.path('M100 262 Q88 250 100 234 Q112 250 100 262', { c: YEL, fill: YEL, fop: 0.5, w: 1.4 }), S.rect(92, 262, 16, 34, { fill: FILL, sw: 1.5 }));
  // steam tube from the flask to the combustion tube
  p.push(S.path('M100 104 L100 82 L172 82 L172 118 L190 118', { w: 3 }));
  p.push(S.arrow(120, 74, 156, 74, { c: MUTED, w: 1.2, dash: '3 3', size: 6 }));
  // hard-glass tube with the metal
  p.push(S.rect(190, 102, 150, 32, { fill: FILL, sw: 2 }), S.rect(184, 108, 8, 20, { fill: MUTED, fop: 0.5, sw: 1.4 }), S.rect(338, 108, 8, 20, { fill: MUTED, fop: 0.5, sw: 1.4 }));
  p.push(S.rect(238, 108, 56, 20, { fill: MUTED, fop: 0.55, sw: 1.4 }));
  // burner under the metal
  p.push(S.path('M266 172 Q252 152 266 140 Q280 152 266 172', { c: YEL, fill: YEL, fop: 0.55, w: 1.4 }), S.rect(258, 172, 16, 36, { fill: FILL, sw: 1.5 }));
  // delivery to the trough
  p.push(S.path('M346 118 L372 118 L372 272 L430 272 L430 244', { w: 3 }));
  p.push(...trough(430, { left: 356, right: 508, rim: 224, wsurf: 236, bottom: 296, jtop: 150, mouth: 252, gasLevel: 196 }));
  for (const [x, y] of [[430, 232], [434, 218]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  if (lettered) {
    p.push(L(34, 200, 'A'), S.lead(46, 200, 76, 206));
    p.push(L(134, 66, 'B'), S.lead(136, 70, 140, 80));
    p.push(L(266, 90, 'C'), S.lead(266, 94, 266, 106));
    p.push(L(310, 190, 'D'), S.lead(304, 184, 280, 190));
    p.push(L(500, 176, 'E'), S.lead(490, 174, 458, 174));
    return svgDoc(540, 310, 'Apparatus in which steam is passed over a heated metal, with five parts lettered A to E', p.join(''));
  }
  p.push(lab(4, 194, 'Boiling', {}), lab(4, 207, 'water', {}), S.lead(40, 202, 76, 206));
  p.push(lab(124, 62, 'Steam', {}));
  p.push(lab(230, 92, 'Heated metal', { a: 'start' }), S.lead(264, 96, 266, 106));
  p.push(lab(290, 196, 'Burner', {}), S.lead(286, 192, 278, 192));
  p.push(lab(478, 178, 'Hydrogen', {}), S.lead(476, 174, 458, 174));
  p.push(lab(400, 306, 'Water in the trough', { a: 'start' }));
  return svgDoc(540, 316, 'Steam from boiling water passes over a heated metal in a hard-glass tube. The gas that leaves is hydrogen, collected over water in a jar full of water standing upside down in a trough', p.join(''));
}
export const STEAM_SET = steamSet(false);
export const STEAM_SET_LETTERED = steamSet(true);

// ---------------------------------------------------------------- 3. periodic table outline: where hydrogen sits
export const POSITION = (() => {
  const p = [];
  const x0 = 56;
  const y0 = 38;
  const cw = 28;
  const ch = 28;
  const rows = [
    { period: 1, cells: { 1: 'H', 18: 'He' } },
    { period: 2, cells: { 1: 'Li', 2: 'Be', 13: 'B', 14: 'C', 15: 'N', 16: 'O', 17: 'F', 18: 'Ne' } },
    { period: 3, cells: { 1: 'Na', 2: 'Mg', 13: 'Al', 14: 'Si', 15: 'P', 16: 'S', 17: 'Cl', 18: 'Ar' } },
  ];
  // coloured columns: alkali metals (group 1 below hydrogen) and halogens (group 17)
  p.push(S.rect(x0, y0 + ch, cw, 2 * ch, { fill: BLUE, c: BLUE, fop: 0.18, sw: 0 }));
  p.push(S.rect(x0 + 16 * cw, y0, cw, 3 * ch, { fill: RED, c: RED, fop: 0.14, sw: 0 }));
  for (let g = 1; g <= 18; g++) p.push(S.text(x0 + (g - 1) * cw + cw / 2, y0 - 8, String(g), { a: 'middle', size: 10, c: MUTED }));
  p.push(S.text(x0 - 6, y0 - 22, 'Group', { a: 'end', size: 10, c: MUTED }));
  rows.forEach((row, i) => {
    const y = y0 + i * ch;
    p.push(S.text(x0 - 6, y + 19, `Period ${row.period}`, { a: 'end', size: 10, c: MUTED }));
    for (let g = 1; g <= 18; g++) {
      const sym = row.cells[g];
      const x = x0 + (g - 1) * cw;
      if (sym) {
        const hy = sym === 'H';
        p.push(S.rect(x, y, cw, ch, { fill: hy ? YEL : 'none', c: hy ? YEL : 'currentColor', fop: hy ? 0.55 : undefined, sw: hy ? 2.4 : 1 }));
        p.push(S.text(x + cw / 2, y + 19, sym, { a: 'middle', size: 12, w: hy ? 'bold' : undefined }));
      } else if (g >= 3 && g <= 12 && row.period > 1) p.push(S.rect(x, y, cw, ch, { c: MUTED, sw: 0.5 }));
    }
  });
  const yb = y0 + 3 * ch;
  p.push(S.arrow(x0 + 14, yb + 22, x0 + 14, yb + 4, { c: BLUE, w: 1.2, size: 6 }), S.text(x0 + 22, yb + 24, 'Alkali metals (group 1)', { size: 11, c: BLUE }));
  p.push(S.arrow(x0 + 16.5 * cw, yb + 22, x0 + 16.5 * cw, yb + 4, { c: RED, w: 1.2, size: 6 }), S.text(x0 + 16.5 * cw - 10, yb + 24, 'Halogens (group 17)', { a: 'end', size: 11, c: RED }));
  p.push(S.lines(x0, yb + 54, ['Hydrogen (one electron in its only shell) is placed at the top of group 1,', 'but it also resembles group 17 because it is one electron short of a full shell.'], { size: 11, dy: 15 }));
  return svgDoc(580, 200, `Outline of the first three periods of the periodic table. Hydrogen, with one electron (configuration ${CONFIG.H.join(',')}), is highlighted at the top of group 1, above lithium and sodium, with helium at the far right. Group 17 holds fluorine and chlorine`, p.join(''));
})();
