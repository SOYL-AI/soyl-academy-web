// SVG diagrams for ICSE 9 Chemistry ch06 Hard and Soft Water; Making Water Potable: the soap test on four samples, and the
// water-treatment flow (named and lettered).
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const RED = 'var(--diagram-red)';

// ---------------------------------------------------------------- 1. soap test on four samples
export const SOAP = (() => {
  const p = [];
  const tube = (x, froth, scum, title, sub, col) => {
    p.push(S.path(`M${x} 50 L${x} 140 A22 22 0 0 0 ${x + 44} 140 L${x + 44} 50`, { w: 2 }));
    p.push(S.path(`M${x + 1} 80 L${x + 1} 140 A21 21 0 0 0 ${x + 43} 140 L${x + 43} 80 Z`, { fill: BLUE, fop: 0.18, sw: 0 }));
    p.push(S.line(x, 80, x + 44, 80, { c: BLUE, w: 1.2 }));
    if (froth) for (const [dx, dy, rr] of [[8, 70, 6], [20, 66, 7], [32, 70, 6], [14, 58, 5], [28, 57, 5], [22, 48, 4]]) p.push(S.circle(x + dx, dy, rr, { fill: FILL, sw: 1.2 }));
    if (scum) for (const [dx, dy] of [[10, 100], [22, 112], [33, 96], [16, 128], [30, 126], [24, 140], [12, 114], [34, 112]]) p.push(S.circle(x + dx, dy, 2.6, { fill: YEL, fop: 0.85, sw: 0.8 }));
    p.push(S.text(x + 22, 20, title, { a: 'middle', size: 12, w: 'bold', c: col }));
    p.push(S.lines(x + 22, 194, sub, { a: 'middle', size: 11, dy: 13 }));
  };
  tube(36, true, false, 'Soft water', ['Plenty of lather', 'with soap'], GREEN);
  tube(176, false, true, 'Hard water', ['Scum and little', 'lather with soap'], RED);
  tube(316, true, false, 'Temporary hard', ['After boiling:', 'lather forms'], GREEN);
  tube(456, false, true, 'Permanent hard', ['After boiling:', 'scum, no lather'], RED);
  p.push(S.text(300, 244, 'Soap solution added and shaken with equal volumes of each sample', { a: 'middle', size: 11, c: MUTED }));
  return svgDoc(580, 252, 'Four test tubes shaken with soap solution. Soft water gives plenty of lather. Hard water gives scum and little lather. Temporary hard water after boiling gives lather. Permanent hard water after boiling still gives scum and no lather.', p.join(''));
})();

// ---------------------------------------------------------------- 2. water treatment flow
function treat(lettered) {
  const p = [];
  const names = lettered
    ? ['A', 'B', 'C', 'D', 'E']
    : [['Screening'], ['Alum tank', '(coagulation)'], ['Sand and', 'gravel filter'], ['Chlorination'], ['Storage tank']];
  const x0 = 44;
  const bw = 104;
  const gap = 26;
  const boxY = 40;
  for (let i = 0; i < 5; i++) {
    const x = x0 + i * (bw + gap);
    p.push(S.rect(x, boxY, bw, 150, { fill: FILL, sw: 1.6, rx: 5 }));
    if (lettered) p.push(S.text(x + bw / 2, boxY + 36, names[i], { a: 'middle', size: 20, w: 'bold' }));
    else p.push(S.lines(x + bw / 2, boxY + 24, names[i], { a: 'middle', size: 12, w: 'bold', dy: 14 }));
    const cx = x + bw / 2;
    const py = boxY + 70;
    if (i === 0) {
      for (let k = 0; k < 6; k++) p.push(S.line(x + 20 + k * 13, py, x + 20 + k * 13, py + 60, { w: 2 }));
      p.push(S.circle(x + 10, py + 20, 3, { fill: BROWN, fop: 0.7, sw: 0 }), S.circle(x + 12, py + 44, 4, { fill: BROWN, fop: 0.7, sw: 0 }));
    } else if (i === 1) {
      p.push(S.path(`M${x + 14} ${py} L${x + 14} ${py + 60} L${x + 90} ${py + 60} L${x + 90} ${py}`, { w: 2 }), S.rect(x + 15, py + 12, 74, 47, { fill: BLUE, fop: 0.25, sw: 0 }));
      for (const [dx, dy] of [[30, 36], [48, 44], [64, 40], [40, 52], [72, 50], [56, 30]]) p.push(S.circle(x + dx, py + dy, 3.4, { fill: BROWN, fop: 0.75, sw: 0.8 }));
    } else if (i === 2) {
      p.push(S.rect(x + 14, py, 76, 18, { fill: YEL, fop: 0.5, sw: 1.2 }), S.rect(x + 14, py + 18, 76, 20, { fill: BROWN, fop: 0.4, sw: 1.2 }), S.rect(x + 14, py + 38, 76, 22, { fill: MUTED, fop: 0.3, sw: 1.2 }));
      p.push(S.arrow(cx, py - 8, cx, py + 6, { w: 1.2, size: 5 }));
    } else if (i === 3) {
      p.push(S.path(`M${x + 14} ${py} L${x + 14} ${py + 60} L${x + 90} ${py + 60} L${x + 90} ${py}`, { w: 2 }), S.rect(x + 15, py + 12, 74, 47, { fill: BLUE, fop: 0.25, sw: 0 }));
      p.push(S.arrow(cx, py - 10, cx, py + 20, { c: GREEN, w: 2 }), ...(lettered ? [] : [S.text(cx, py - 14, 'chlorine', { a: 'middle', size: 10, c: GREEN, w: 'bold' })]));
    } else {
      p.push(S.rect(x + 14, py, 76, 60, { fill: BLUE, fop: 0.25, sw: 1.8 }), S.line(x + 90, py + 50, x + 100, py + 50, { w: 2.4 }));
    }
    if (i < 4) p.push(S.arrow(x + bw, boxY + 75, x + bw + gap, boxY + 75, { w: 1.6 }));
  }
  p.push(S.arrow(8, boxY + 75, x0, boxY + 75, { w: 1.6 }), S.text(4, boxY + 62, 'Source', { size: 10 }));
  const xe = x0 + 4 * (bw + gap) + bw;
  p.push(S.arrow(xe, boxY + 75, xe + 26, boxY + 75, { w: 1.6 }), S.text(xe + 2, boxY + 62, 'To homes', { size: 10 }));
  if (!lettered) p.push(S.text(360, 216, 'Where the water has excess fluoride, a defluoridation unit is added before storage', { a: 'middle', size: 11, c: MUTED }));
  const alt = lettered
    ? 'Water treatment flow of five stages in order from left to right, lettered A to E. A is a screen of upright bars. B is a tank in which flakes settle. C is a bed of sand over gravel. D is a tank dosed with chlorine. E is a storage tank with a tap.'
    : 'Water treatment flow from left to right. Raw water passes through a screen, then an alum tank where flakes form and settle, then a sand and gravel filter, then a chlorination tank, then a storage tank from which water goes to homes. A note says a defluoridation unit is added before storage where the water has excess fluoride.';
  return svgDoc(720, 232, alt, p.join(''));
}
export const TREAT = treat(false);
export const TREAT_LETTERED = treat(true);
