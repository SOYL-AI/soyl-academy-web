// SVG diagrams for ICSE 9 Chemistry ch03: electrolysis of acidified water (named and lettered), the activity series,
// and three test tubes with precipitates (named and lettered). All new drawings.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { SERIES, NAME } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. electrolysis of acidified water
function electrolysis(lettered) {
  const p = [];
  // water in the beaker and in the tubes
  p.push(S.rect(101, 112, 258, 146, { fill: BLUE, c: BLUE, fop: 0.15, sw: 0 }));
  p.push(S.rect(151, 122, 48, 94, { fill: BLUE, c: BLUE, fop: 0.15, sw: 0 }), S.rect(261, 82, 48, 134, { fill: BLUE, c: BLUE, fop: 0.15, sw: 0 }));
  // beaker
  p.push(S.path('M100 92 L100 250 Q100 258 108 258 L352 258 Q360 258 360 250 L360 92', { w: 2 }));
  // collecting tubes (closed at the top, open at the bottom)
  p.push(S.path('M150 42 L150 216 M200 42 L200 216 M150 42 L200 42', { w: 2 }), S.path('M260 42 L260 216 M310 42 L310 216 M260 42 L310 42', { w: 2 }));
  // gas level marks and the gas
  p.push(S.line(151, 122, 199, 122, { c: MUTED, w: 1, dash: '3 3' }), S.line(261, 82, 309, 82, { c: MUTED, w: 1, dash: '3 3' }));
  // electrodes and wires
  p.push(S.line(175, 190, 175, 286, { w: 3 }), S.line(285, 190, 285, 286, { w: 3 }));
  p.push(S.line(175, 286, 206, 286, { w: 2 }), S.line(285, 286, 254, 286, { w: 2 }));
  p.push(S.rect(206, 274, 48, 24, { fill: FILL, sw: 1.8 }), S.text(215, 291, '−', { size: 15, w: 'bold' }), S.text(238, 291, '+', { size: 15, w: 'bold' }));
  // bubbles
  for (const [x, y] of [[170, 205], [180, 188], [172, 168], [178, 150], [168, 136]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  for (const [x, y] of [[281, 205], [290, 190], [283, 170], [288, 150], [280, 130]]) p.push(S.circle(x, y, 2.6, { c: BLUE, sw: 1 }));
  if (lettered) {
    const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });
    p.push(L(110, 66, 'A'), S.lead(126, 62, 152, 70));
    p.push(L(344, 56, 'B'), S.lead(342, 54, 312, 60));
    p.push(L(366, 190, 'C'), S.lead(364, 186, 330, 200));
    p.push(L(116, 238, 'D'), S.lead(132, 232, 172, 226));
    p.push(L(228, 318, 'E'), S.lead(230, 304, 230, 300));
    return svgDoc(420, 330, 'Apparatus for the electrolysis of acidified water with five parts lettered A to E', p.join(''));
  }
  p.push(lab(14, 62, 'Hydrogen', {}), lab(14, 76, '(2 volumes)', {}), S.lead(76, 66, 150, 76));
  p.push(lab(326, 52, 'Oxygen', {}), lab(326, 66, '(1 volume)', {}), S.lead(324, 58, 312, 60));
  p.push(lab(366, 188, 'Acidified', {}), lab(366, 202, 'water', {}), S.lead(364, 194, 330, 206));
  p.push(lab(4, 232, 'Cathode (−)', {}), S.lead(66, 228, 172, 226));
  p.push(lab(300, 240, 'Anode (+)', {}), S.lead(298, 236, 288, 228));
  p.push(lab(214, 318, 'Battery', { a: 'middle' }), S.lead(230, 304, 230, 300));
  return svgDoc(420, 330, 'Apparatus for the electrolysis of acidified water. Two tubes full of water stand upside down over two electrodes in a beaker. The tube over the cathode collects hydrogen, twice the volume of the oxygen collected in the tube over the anode. The electrodes are joined to a battery', p.join(''));
}
export const ELECTROLYSIS = electrolysis(false);
export const ELECTROLYSIS_LETTERED = electrolysis(true);

// ---------------------------------------------------------------- 2. the activity series
export const ACTIVITY = (() => {
  const p = [];
  SERIES.forEach((m, i) => {
    const y = 18 + i * 23;
    const label = m === 'H' ? 'Hydrogen (H)' : `${NAME[m][0].toUpperCase()}${NAME[m].slice(1)} (${m})`;
    p.push(S.rect(50, y, 120, 20, { fill: m === 'H' ? FILL : BLUE, c: m === 'H' ? MUTED : BLUE, fop: m === 'H' ? 1 : 0.18, sw: 1.3, dash: m === 'H' ? '4 3' : undefined }));
    p.push(lab(110, y + 14, label, { a: 'middle' }));
  });
  p.push(S.arrow(210, 36, 210, 296, { c: RED, w: 2, size: 8 }));
  p.push(lab(224, 40, 'Most reactive', { c: RED, w: 'bold' }), lab(224, 296, 'Least reactive', { c: RED, w: 'bold' }));
  p.push(S.lines(224, 130, ['A metal displaces', 'any metal below it', 'from its salt solution.'], { size: 11, dy: 14 }));
  return svgDoc(400, 320, 'The activity series from most to least reactive: potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, hydrogen as a reference, copper, mercury, silver, gold. An arrow shows that reactivity decreases down the list', p.join(''));
})();

// ---------------------------------------------------------------- 3. three precipitates
function tubes(lettered) {
  const p = [];
  const defs = [
    { x: 90, colour: FILL, stroke: 'currentColor', l1: 'Sodium sulphate', l2: '+ barium chloride', l3: 'White precipitate' },
    { x: 260, colour: FILL, stroke: 'currentColor', l1: 'Silver nitrate', l2: '+ sodium chloride', l3: 'White curdy precipitate' },
    { x: 430, colour: YEL, stroke: YEL, l1: 'Lead nitrate', l2: '+ potassium iodide', l3: 'Yellow precipitate' },
  ];
  defs.forEach((d, i) => {
    const x = d.x;
    p.push(S.path(`M${x - 22} 30 L${x - 22} 150 Q${x - 22} 176 ${x} 176 Q${x + 22} 176 ${x + 22} 150 L${x + 22} 30`, { w: 2 }));
    p.push(S.path(`M${x - 21} 70 L${x - 21} 150 Q${x - 21} 175 ${x} 175 Q${x + 21} 175 ${x + 21} 150 L${x + 21} 70 Z`, { fill: BLUE, c: BLUE, fop: 0.12, w: 0 }));
    p.push(S.ellipse(x, 160, 17, 10, { fill: d.colour, c: d.stroke, fop: d.colour === FILL ? 1 : 0.7, sw: 1.5 }));
    for (const [dx, dy] of [[-8, 138], [6, 132], [-2, 120], [10, 146], [-12, 150]]) p.push(S.circle(x + dx, dy, 2.2, { fill: d.colour, c: d.stroke, fop: d.colour === FILL ? 1 : 0.7, sw: 1 }));
    if (lettered) p.push(S.text(x, 208, 'ABC'[i], { a: 'middle', size: 16, w: 'bold', c: RED }));
    else p.push(lab(x, 198, d.l1, { a: 'middle' }), lab(x, 212, d.l2, { a: 'middle' }), lab(x, 228, d.l3, { a: 'middle', w: 'bold' }));
  });
  return svgDoc(520, lettered ? 222 : 240, lettered ? 'Three test tubes A, B and C, each holding a precipitate formed on mixing two solutions. The precipitates in A and B are white and the precipitate in C is yellow' : 'Three test tubes with precipitates. Sodium sulphate with barium chloride gives a white precipitate, silver nitrate with sodium chloride gives a white curdy precipitate and lead nitrate with potassium iodide gives a yellow precipitate', p.join(''));
}
export const PPT = tubes(false);
export const PPT_LETTERED = tubes(true);
