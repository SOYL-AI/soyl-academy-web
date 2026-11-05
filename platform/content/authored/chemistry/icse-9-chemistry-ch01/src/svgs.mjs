// SVG diagrams for ICSE 9 Chemistry ch01: electron shells and valency, and the criss-cross rule. All new drawings.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { CONFIG, VAL } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const R = [14, 26, 38, 50];

/** One atom: nucleus label in the middle, shells as circles, electrons as dots (outer shell in red). */
function atom(cx, cy, cfg, label) {
  const p = [];
  cfg.forEach((n, i) => {
    p.push(S.circle(cx, cy, R[i], { c: MUTED, sw: 1.2 }));
    const off = -Math.PI / 2 + (i % 2 ? Math.PI / n : 0);
    for (let k = 0; k < n; k++) {
      const a = off + (2 * Math.PI * k) / n;
      const outer = i === cfg.length - 1;
      p.push(S.circle(cx + R[i] * Math.cos(a), cy + R[i] * Math.sin(a), 2.6, { fill: outer ? RED : BLUE, c: outer ? RED : BLUE, sw: 0 }));
    }
  });
  p.push(S.text(cx, cy + 4, label, { a: 'middle', size: 11, w: 'bold' }));
  return p.join('');
}

// ---------------------------------------------------------------- 1. electron shells and valency (named)
const NAMED = [['Na', 'Na'], ['Mg', 'Mg'], ['N', 'N'], ['Cl', 'Cl']];
export const SHELLS = (() => {
  const p = [];
  NAMED.forEach(([sym, lbl], i) => {
    const cx = 70 + i * 130;
    p.push(atom(cx, 80, CONFIG[sym], lbl));
    p.push(lab(cx, 156, `Electrons: ${CONFIG[sym].join(', ')}`, { a: 'middle' }));
    p.push(lab(cx, 172, `Outer shell: ${CONFIG[sym][CONFIG[sym].length - 1]}`, { a: 'middle' }));
    p.push(lab(cx, 190, `Valency ${VAL[sym]}`, { a: 'middle', w: 'bold' }));
  });
  p.push(lab(8, 212, 'Red dots: electrons in the outer shell. Blue dots: inner shells.', { c: MUTED, size: 10 }));
  return svgDoc(540, 222, 'Electron shells of sodium with arrangement two, eight, one and valency one; magnesium two, eight, two and valency two; nitrogen two, five and valency three; chlorine two, eight, seven and valency one. Outer-shell electrons are drawn in red', p.join(''));
})();

// ---------------------------------------------------------------- 2. lettered shells: unknown atoms A to D
const UNKNOWN = [['A', [2, 8, 3]], ['B', [2, 6]], ['C', [2, 8, 1]], ['D', [2, 4]]];
export const SHELLS_LETTERED = (() => {
  const p = [];
  UNKNOWN.forEach(([ltr, cfg], i) => {
    const cx = 70 + i * 130;
    p.push(atom(cx, 70, cfg, ltr));
    p.push(lab(cx, 140, `Shells: ${cfg.join(', ')}`, { a: 'middle' }));
  });
  p.push(lab(8, 170, 'A, B, C and D are not the symbols of the elements. Red dots: outer-shell electrons.', { c: MUTED, size: 10 }));
  return svgDoc(540, 180, 'Four atoms A, B, C and D drawn with electron shells. A has shells of two, eight and three electrons. B has two and six. C has two, eight and one. D has two and four', p.join(''));
})();

// ---------------------------------------------------------------- 3. criss-cross rule (named, two examples)
export const CRISS = (() => {
  const p = [];
  // example 1: Al (3) and SO4 (2) -> Al2(SO4)3
  p.push(S.text(120, 44, 'Al', { a: 'middle', size: 20, w: 'bold' }), S.text(238, 44, 'SO₄', { a: 'middle', size: 20, w: 'bold' }));
  p.push(S.text(120, 76, '3', { a: 'middle', size: 15, c: RED, w: 'bold' }), S.text(238, 76, '2', { a: 'middle', size: 15, c: RED, w: 'bold' }));
  p.push(S.arrow(124, 84, 218, 126, { c: RED, w: 1.4, size: 6 }), S.arrow(234, 84, 140, 126, { c: RED, w: 1.4, size: 6 }));
  p.push(S.text(180, 156, 'Al₂(SO₄)₃', { a: 'middle', size: 20, w: 'bold' }));
  p.push(lab(180, 184, 'valencies 3 and 2 cross over', { a: 'middle', c: MUTED }));
  // example 2: Mg (2) and Cl (1) -> MgCl2
  p.push(S.text(395, 44, 'Mg', { a: 'middle', size: 20, w: 'bold' }), S.text(455, 44, 'Cl', { a: 'middle', size: 20, w: 'bold' }));
  p.push(S.text(395, 76, '2', { a: 'middle', size: 15, c: RED, w: 'bold' }), S.text(455, 76, '1', { a: 'middle', size: 15, c: RED, w: 'bold' }));
  p.push(S.arrow(399, 84, 440, 126, { c: RED, w: 1.4, size: 6 }), S.arrow(451, 84, 410, 126, { c: RED, w: 1.4, size: 6, dash: '4 3' }));
  p.push(S.text(425, 156, 'MgCl₂', { a: 'middle', size: 20, w: 'bold' }));
  p.push(lab(425, 184, 'a subscript 1 is not written', { a: 'middle', c: MUTED }));
  p.push(S.line(300, 20, 300, 192, { c: MUTED, w: 1, dash: '3 4' }));
  return svgDoc(540, 200, 'The criss-cross rule. Aluminium has valency three and sulphate has valency two; the numbers cross over to give the formula aluminium sulphate, Al two (SO four) three. Magnesium has valency two and chlorine valency one, giving MgCl two, and the subscript one is not written', p.join(''));
})();

// ---------------------------------------------------------------- 4. lettered criss-cross
export const CRISS_LETTERED = (() => {
  const p = [];
  const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });
  p.push(S.text(150, 54, 'Ca', { a: 'middle', size: 20, w: 'bold' }), S.text(260, 54, 'PO₄', { a: 'middle', size: 20, w: 'bold' }));
  p.push(S.text(150, 90, '2', { a: 'middle', size: 15, w: 'bold' }), S.text(260, 90, '3', { a: 'middle', size: 15, w: 'bold' }));
  p.push(S.arrow(155, 98, 238, 140, { w: 1.4, size: 6 }), S.arrow(256, 98, 168, 140, { w: 1.4, size: 6 }));
  p.push(S.text(210, 172, 'Ca₃(PO₄)₂', { a: 'middle', size: 20, w: 'bold' }));
  p.push(L(60, 58, 'A'), S.lead(76, 54, 128, 50));
  p.push(L(60, 94, 'B'), S.lead(76, 90, 138, 88));
  p.push(L(330, 108, 'C'), S.lead(326, 106, 205, 112));
  p.push(L(330, 62, 'D'), S.lead(326, 58, 292, 54));
  p.push(L(330, 176, 'E'), S.lead(326, 172, 275, 172));
  return svgDoc(400, 196, 'The criss-cross method drawn for calcium and phosphate with five parts lettered A to E', p.join(''));
})();
