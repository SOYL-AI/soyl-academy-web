// SVG diagrams for ICSE 9 Chemistry ch02: relative atomic masses as bars, percentage composition bars, and the
// laboratory set-up for heating a hydrate (named and lettered). All new drawings.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { AM, P, W, round } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';

// ---------------------------------------------------------------- 1. relative atomic masses as bars
export const RAM_BARS = (() => {
  const p = [];
  const rows = [['H', 'Hydrogen'], ['C', 'Carbon-12'], ['O', 'Oxygen'], ['Mg', 'Magnesium'], ['S', 'Sulphur'], ['Cl', 'Chlorine'], ['Fe', 'Iron']];
  const k = 6; // px per unit of relative atomic mass
  p.push(S.rect(110, 14, k, 12, { fill: RED, c: RED, sw: 0 }), lab(124, 24, '= 1 unit, one-twelfth of a carbon-12 atom', { c: MUTED, size: 11 }));
  rows.forEach(([sym, name], i) => {
    const y = 46 + i * 30;
    const v = AM[sym];
    p.push(lab(100, y + 13, name, { a: 'end' }));
    p.push(S.rect(110, y, v * k, 20, { fill: sym === 'C' ? RED : BLUE, c: sym === 'C' ? RED : BLUE, fop: 0.35, sw: 1.4 }));
    p.push(lab(116 + v * k, y + 14, String(v), { w: 'bold' }));
  });
  p.push(S.line(110 + 12 * k, 40, 110 + 12 * k, 256, { c: RED, w: 1, dash: '4 3' }));
  p.push(lab(110 + 12 * k + 4, 262, 'carbon-12 atom: 12 units', { c: RED, size: 10 }));
  return svgDoc(480, 272, 'Bar chart of relative atomic masses: hydrogen 1, carbon 12, oxygen 16, magnesium 24, sulphur 32, chlorine 35.5 and iron 56, each measured in units of one-twelfth of a carbon-12 atom', p.join(''));
})();

// ---------------------------------------------------------------- 2. percentage composition bars
const seg = (x, y, w, h, colour, text) => S.rect(x, y, w, h, { fill: colour, c: colour, fop: 0.35, sw: 1.4 }) + S.text(x + w / 2, y + h / 2 + 4, text, { a: 'middle', size: 11, w: 'bold' });
export const COMPOSITION = (() => {
  const p = [];
  const W100 = 400;
  const x0 = 70;
  const u = W100 / 100;
  // MgSO4
  p.push(lab(x0, 24, 'Magnesium sulphate, MgSO₄ (RMM 120)', { w: 'bold' }));
  let x = x0;
  for (const [el, v, c] of [['Mg', P.MgSO4.Mg, BLUE], ['S', P.MgSO4.S, YEL], ['O', P.MgSO4.O, RED]]) {
    p.push(seg(x, 34, v * u, 34, c, `${el} ${v}%`));
    x += v * u;
  }
  // FeSO4.7H2O
  const dry = round(100 - W.Fe, 1);
  p.push(lab(x0, 100, 'Iron(II) sulphate crystals, FeSO₄·7H₂O (RMM 278)', { w: 'bold' }));
  p.push(seg(x0, 110, dry * u, 34, GREEN, `FeSO₄ ${dry}%`), seg(x0 + dry * u, 110, W.Fe * u, 34, BLUE, `7H₂O ${W.Fe}%`));
  p.push(lab(x0, 176, 'Each bar is 100 percent of the mass of the compound.', { c: MUTED, size: 11 }));
  return svgDoc(500, 190, `Two bars showing percentage composition by mass. Magnesium sulphate is magnesium ${P.MgSO4.Mg} percent, sulphur ${P.MgSO4.S} percent and oxygen ${P.MgSO4.O} percent. Iron(II) sulphate crystals are ${dry} percent anhydrous salt and ${W.Fe} percent water of crystallisation`, p.join(''));
})();

// ---------------------------------------------------------------- 3. heating a hydrate (named and lettered)
const rot = (cx, cy, deg, [x, y]) => {
  const a = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
};
function heat(lettered) {
  const p = [];
  const cx = 230;
  const cy = 140;
  const deg = -12; // closed end higher than the mouth
  const R = (x, y) => rot(cx, cy, deg, [x, y]);
  // tube outline: mouth at x=110, closed round end at x=330 (half-height 22)
  const pts = [R(110, 118), R(308, 118)];
  for (let t = -90; t <= 90; t += 30) pts.push(R(308 + 22 * Math.cos((t * Math.PI) / 180), 140 + 22 * Math.sin((t * Math.PI) / 180)));
  pts.push(R(110, 162));
  p.push(S.path(`M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}`, { w: 2, fill: 'var(--diagram-fill)', fop: 0.5 }));
  // crystals at the closed end
  const cr = [[282, 150], [296, 152], [288, 140], [302, 142], [270, 153], [292, 131]];
  for (const [x, y] of cr) {
    const [a, b] = R(x, y);
    p.push(S.rect(a - 4, b - 4, 8, 8, { fill: BLUE, c: BLUE, fop: 0.45, sw: 1.2 }));
  }
  // droplets on the cooler walls
  for (const [x, y] of [[170, 124], [196, 123], [150, 156], [185, 157], [218, 125]]) {
    const [a, b] = R(x, y);
    p.push(S.circle(a, b, 2.8, { fill: BLUE, c: BLUE, fop: 0.7, sw: 0 }));
  }
  // clamp around the tube
  const [c1x, c1y] = R(200, 112);
  const [c2x, c2y] = R(200, 168);
  p.push(S.line(c1x, c1y, c2x, c2y, { w: 3, c: MUTED }), S.line(c1x, c1y, c1x, c1y - 40, { w: 3, c: MUTED }), S.line(c1x, c1y - 40, 232, 20, { w: 3, c: MUTED }));
  // flame under the closed end
  const [fx, fy] = R(292, 170);
  p.push(S.path(`M${fx - 14} ${fy + 52} Q${fx - 18} ${fy + 22} ${fx} ${fy + 2} Q${fx + 18} ${fy + 22} ${fx + 14} ${fy + 52} Z`, { fill: RED, c: RED, fop: 0.4, w: 1.4 }));
  p.push(S.rect(fx - 14, fy + 52, 28, 22, { fill: MUTED, c: MUTED, fop: 0.5, sw: 1.4 }));
  if (lettered) {
    const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });
    p.push(L(352, 100, 'A'), S.lead(348, 98, 312, 125));
    p.push(L(60, 90, 'B'), S.lead(76, 94, 138, 124));
    p.push(L(110, 196, 'C'), S.lead(124, 190, 180, 160));
    p.push(L(356, 214, 'D'), S.lead(352, 210, 312, 205));
    p.push(L(240, 14, 'E'), S.lead(236, 18, 220, 24));
    return svgDoc(420, 240, 'A laboratory set-up for heating hydrated crystals in a test tube with five parts lettered A to E', p.join(''));
  }
  p.push(lab(352, 100, 'Hydrated crystals', {}), S.lead(350, 104, 312, 125));
  p.push(lab(10, 90, 'Hard glass test tube', {}), S.lead(60, 96, 138, 124));
  p.push(lab(56, 198, 'Drops of water on the cool wall', {}), S.lead(120, 192, 180, 160));
  p.push(lab(356, 214, 'Flame', {}), S.lead(352, 210, 312, 205));
  p.push(lab(240, 14, 'Clamp', {}), S.lead(236, 18, 220, 24));
  return svgDoc(480, 240, 'A laboratory set-up for heating hydrated crystals in a test tube. The tube is clamped with its mouth lower than its closed end, hydrated crystals lie at the closed end over a burner flame and drops of water collect on the cooler wall near the mouth', p.join(''));
}
export const HEAT = heat(false);
export const HEAT_LETTERED = heat(true);
