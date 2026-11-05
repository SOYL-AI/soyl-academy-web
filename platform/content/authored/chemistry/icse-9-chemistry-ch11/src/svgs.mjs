// SVG diagrams for ICSE 9 Chemistry ch11: an electron passing from a sodium atom to a chlorine atom (named and lettered), and a
// magnesium ribbon in copper(II) sulphate solution with the two half-changes (named and lettered). All new drawings.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { CONFIG } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED, a: 'middle' });

const dot = (cx, cy, rr, ang, c = 'currentColor') => S.circle(cx + rr * Math.cos((ang * Math.PI) / 180), cy + rr * Math.sin((ang * Math.PI) / 180), 3.6, { fill: c, c, sw: 1 });

/** An atom drawn with nucleus and three shells; `outer` gives the angles (degrees) of the electrons in the third shell. */
function atom(cx, cy, z, outer, hot = null) {
  const p = [];
  for (const r of [34, 56, 78]) p.push(S.circle(cx, cy, r, { c: MUTED, sw: 1.2 }));
  p.push(S.circle(cx, cy, 17, { fill: FILL, sw: 1.8 }), S.text(cx, cy + 4, `${z}+`, { a: 'middle', size: 11, w: 'bold' }));
  for (const a of [45, 225]) p.push(dot(cx, cy, 34, a));
  for (let k = 0; k < 8; k++) p.push(dot(cx, cy, 56, 22.5 + 45 * k));
  for (const a of outer) p.push(dot(cx, cy, 78, a, a === hot ? RED : 'currentColor'));
  return p;
}

// ---------------------------------------------------------------- 1. an electron passes from sodium to chlorine
function transfer(lettered) {
  const p = [];
  const [nx, cx, cy] = [110, 450, 100];
  const [na, nz] = [CONFIG.Na.join(', '), CONFIG.Cl.join(', ')];
  p.push(...atom(nx, cy, 11, [0], 0));
  const clAngles = [0, 45, 90, 135, 225, 270, 315]; // seven electrons; the gap faces the sodium atom at 180 degrees
  p.push(...atom(cx, cy, 17, clAngles));
  p.push(S.circle(cx - 78, cy, 6, { c: RED, sw: 1.6, dash: '3 2' }));
  p.push(S.arrow(204, cy, 358, cy, { c: RED, w: 2, size: 8 }));
  if (lettered) {
    p.push(L(214, 68, 'A'), S.lead(210, 74, 191, 95));
    p.push(L(nx, 206, 'B'), S.lead(nx, 192, nx, 184));
    p.push(L(cx, 206, 'C'), S.lead(cx, 192, cx, 184));
    p.push(L(352, 62, 'D'), S.lead(358, 68, 370, 92));
    p.push(L(279, 134, 'E'), S.lead(279, 128, 279, 106));
    p.push(lab(14, 236, `Atoms drawn with their shells; sodium has ${na} electrons and chlorine ${nz} electrons.`, {}));
    return svgDoc(560, 250, 'An electron moves from the outer shell of a sodium atom to the outer shell of a chlorine atom, with five parts lettered A to E', p.join(''));
  }
  p.push(lab(279, 82, 'Electron transferred', { a: 'middle', c: RED, w: 'bold' }));
  p.push(lab(nx, 204, `Sodium atom (${na})`, { a: 'middle' }), lab(cx, 204, `Chlorine atom (${nz})`, { a: 'middle' }));
  p.push(lab(nx, 226, 'Na → Na⁺ + e⁻  (oxidation)', { a: 'middle', w: 'bold' }), lab(cx, 226, 'Cl + e⁻ → Cl⁻  (reduction)', { a: 'middle', w: 'bold' }));
  p.push(lab(279, 128, 'one electron', { a: 'middle', c: MUTED }), lab(279, 142, 'moves across', { a: 'middle', c: MUTED }));
  return svgDoc(560, 240, `A sodium atom with electrons in shells of 2, 8 and 1 passes its outer electron to a chlorine atom with shells of 2, 8 and 7, which has a space for one more electron. Sodium is oxidised and chlorine is reduced`, p.join(''));
}
export const TRANSFER = transfer(false);
export const TRANSFER_LETTERED = transfer(true);

// ---------------------------------------------------------------- 2. magnesium ribbon in copper(II) sulphate solution
function strip(lettered) {
  const p = [];
  p.push(S.rect(121, 100, 278, 129, { fill: BLUE, c: BLUE, fop: 0.22, sw: 0 }));
  p.push(S.path('M120 70 L120 220 Q120 230 130 230 L390 230 Q400 230 400 220 L400 70', { w: 2 }));
  p.push(S.rect(246, 50, 18, 150, { fill: MUTED, fop: 0.5, sw: 1.5 }));
  // copper deposit on the ribbon
  for (const [x, y] of [[243, 126], [267, 134], [243, 152], [267, 160], [243, 180], [267, 186]]) p.push(S.ellipse(x, y, 5, 8, { fill: BROWN, c: BROWN, fop: 0.8, sw: 1 }));
  // magnesium ions entering the solution, copper ions approaching
  for (const [x, y] of [[170, 140], [190, 182]]) p.push(S.circle(x, y, 17, { c: MUTED, sw: 1.3 }), S.text(x, y + 4, 'Mg²⁺', { a: 'middle', size: 10 }));
  for (const [x, y] of [[336, 128], [350, 176], [316, 200]]) p.push(S.circle(x, y, 17, { c: BLUE, sw: 1.3 }), S.text(x, y + 4, 'Cu²⁺', { a: 'middle', size: 10 }));
  p.push(S.arrow(238, 140, 192, 140, { c: MUTED, w: 1.4, size: 7, dash: '4 3' }), S.arrow(316, 130, 272, 130, { c: BLUE, w: 1.4, size: 7, dash: '4 3' }));
  if (lettered) {
    p.push(L(296, 62, 'A'), S.lead(288, 62, 268, 66));
    p.push(L(292, 106, 'B'), S.lead(284, 108, 272, 128));
    p.push(L(358, 100, 'C'), S.lead(352, 106, 340, 118));
    p.push(L(150, 112, 'D'), S.lead(156, 118, 166, 126));
    p.push(L(374, 216, 'E'), S.lead(368, 210, 360, 204));
    return svgDoc(520, 262, 'A magnesium ribbon in blue copper(II) sulphate solution, with five parts lettered A to E', p.join(''));
  }
  p.push(lab(12, 24, 'Mg → Mg²⁺ + 2e⁻  (oxidation)', { w: 'bold' }), lab(300, 24, 'Cu²⁺ + 2e⁻ → Cu  (reduction)', { w: 'bold' }));
  p.push(lab(280, 62, 'Magnesium ribbon', {}));
  p.push(lab(408, 90, 'Reddish-brown', {}), lab(408, 103, 'copper', {}), S.lead(406, 96, 272, 128));
  p.push(lab(260, 252, 'Blue copper(II) sulphate solution', { a: 'middle' }));
  return svgDoc(520, 262, 'A magnesium ribbon stands in blue copper(II) sulphate solution. Magnesium atoms change into magnesium ions and leave the ribbon, while copper ions gain electrons and form a reddish-brown deposit of copper on the ribbon', p.join(''));
}
export const STRIP = strip(false);
export const STRIP_LETTERED = strip(true);
