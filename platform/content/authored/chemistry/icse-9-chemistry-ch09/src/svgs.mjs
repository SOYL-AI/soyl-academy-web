// SVG diagrams for ICSE 9 Chemistry ch09 The Periodic Table: Dobereiner triads, Newlands' octaves, the modern table with its
// blocks (named and lettered A to E), and the melting points of the alkali metals. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { TRIADS, mean, GRID, SYM, place, MP } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });

// ---------------------------------------------------------------- 1. Dobereiner triads
export const TRIAD = (() => {
  const p = [];
  const draw = (key, y) => {
    const t = TRIADS[key];
    t.forEach(([sym, name, m], i) => {
      const x = 20 + i * 130;
      p.push(S.rect(x, y, 112, 54, { fill: i === 1 ? BLUE : FILL, c: i === 1 ? BLUE : 'currentColor', fop: i === 1 ? 0.18 : 1, sw: 1.5, rx: 4 }));
      p.push(lab(x + 56, y + 20, `${name[0].toUpperCase()}${name.slice(1)} (${sym})`, { a: 'middle', w: 'bold' }), lab(x + 56, y + 40, `atomic mass ${m}`, { a: 'middle' }));
    });
    p.push(lab(20, y + 74, `Mean of the first and the third: (${TRIADS[key][0][2]} + ${TRIADS[key][2][2]}) ÷ 2 = ${mean(key)}`, { c: RED, w: 'bold' }), lab(20, y + 90, `Middle element: ${TRIADS[key][1][2]}`, { c: MUTED }));
  };
  draw('LiNaK', 12);
  draw('ClBrI', 124);
  return svgDoc(420, 236, "Two of Dobereiner's triads. In each, the atomic mass of the middle element is close to the mean of the atomic masses of the first and the third. Lithium, sodium and potassium have masses 7, 23 and 39, and chlorine, bromine and iodine have 35.5, 80 and 127", p.join(''));
})();

// ---------------------------------------------------------------- 2. Newlands' octaves
export const NEWLANDS = (() => {
  const p = [];
  const x0 = 70;
  const y0 = 40;
  const w = 46;
  const h = 30;
  p.push(lab(14, 22, 'Elements in the order of increasing atomic mass; the eighth element repeats the first.', { size: 10, c: MUTED }));
  GRID.forEach((row, ri) => {
    row.forEach((s, ci) => {
      const hi = ci === 0 ? BLUE : ci === 6 ? RED : null;
      p.push(S.rect(x0 + ci * w, y0 + ri * h, w - 4, h - 4, { fill: hi ?? FILL, c: hi ?? 'currentColor', fop: hi ? 0.2 : 1, sw: 1.3, rx: 3 }));
      p.push(lab(x0 + ci * w + (w - 4) / 2, y0 + ri * h + 19, s, { a: 'middle', size: 12, w: 'bold' }));
    });
    p.push(lab(14, y0 + ri * h + 19, `Row ${ri + 1}`, { size: 10, c: MUTED }));
  });
  p.push(lab(14, y0 + 3 * h + 22, 'Blue column: Li, Na, K are alike.   Red column: F, Cl are alike.', { size: 10, c: MUTED }));
  p.push(lab(14, y0 + 3 * h + 38, 'Hydrogen (before lithium) is left out of the grid.', { size: 10, c: MUTED }));
  return svgDoc(400, 178, "Newlands' arrangement of the first seventeen elements after hydrogen in rows of seven. Lithium, sodium and potassium fall in the first column and fluorine and chlorine in the last column", p.join(''));
})();

// ---------------------------------------------------------------- 3. the modern periodic table (outline with the first 20 elements)
function table(lettered) {
  const p = [];
  const x0 = 34;
  const y0 = 28;
  const cw = 26;
  const ch = 24;
  const gx = (g) => x0 + (g - 1) * cw;
  const py = (n) => y0 + (n - 1) * ch;
  const bySlot = new Map(Object.entries(SYM).map(([s, z]) => [`${place(z).period}-${place(z).group}`, s]));
  const colour = (g, per) => {
    if (g === 1 && !(per === 1)) return [BLUE, 0.2];
    if (g === 1) return [BLUE, 0.2];
    if (g === 2) return [GREEN, 0.2];
    if (g >= 3 && g <= 12) return [YEL, 0.22];
    if (g === 17) return [RED, 0.2];
    if (g === 18) return [MUTED, 0.3];
    return [FILL, 1];
  };
  const present = (per, g) => {
    if (per === 1) return g === 1 || g === 18;
    if (per <= 3) return g <= 2 || g >= 13;
    return true;
  };
  for (let g = 1; g <= 18; g++) p.push(lab(gx(g) + (cw - 2) / 2, 20, String(g), { a: 'middle', size: 10, c: MUTED }));
  for (let per = 1; per <= 7; per++) {
    p.push(lab(14, py(per) + 16, String(per), { a: 'middle', size: 10, c: MUTED }));
    for (let g = 1; g <= 18; g++) {
      if (!present(per, g)) continue;
      const [c, o] = colour(g, per);
      p.push(S.rect(gx(g), py(per), cw - 2, ch - 2, { fill: c, c: c === FILL ? 'currentColor' : c, fop: o, sw: 1 }));
      const s = bySlot.get(`${per}-${g}`);
      if (s) p.push(lab(gx(g) + (cw - 2) / 2, py(per) + 15, s, { a: 'middle', size: 10, w: 'bold' }));
    }
  }
  // marks for the two f-block rows in group 3, and the rows themselves
  p.push(lab(gx(3) + 11, py(6) + 15, '*', { a: 'middle', size: 12 }), lab(gx(3) + 11, py(7) + 15, '**', { a: 'middle', size: 11 }));
  const fy = py(7) + ch + 14;
  for (let k = 0; k < 14; k++) {
    p.push(S.rect(gx(3) + k * cw, fy, cw - 2, ch - 2, { fill: BROWN, c: BROWN, fop: 0.22, sw: 1 }), S.rect(gx(3) + k * cw, fy + ch, cw - 2, ch - 2, { fill: BROWN, c: BROWN, fop: 0.22, sw: 1 }));
  }
  p.push(lab(gx(3) - 6, fy + 16, '*', { a: 'end', size: 12 }), lab(gx(3) - 6, fy + ch + 16, '**', { a: 'end', size: 11 }));
  if (!lettered) p.push(lab(gx(3) + 14 * cw + 4, fy + 15, '58 to 71', { size: 10 }), lab(gx(3) + 14 * cw + 4, fy + ch + 15, '90 to 103', { size: 10 }));
  if (lettered) {
    const bottom = fy + 2 * ch + 20;
    p.push(L(gx(1) + 4, bottom, 'A'), S.lead(gx(1) + 10, bottom - 16, gx(1) + 10, py(7) + ch - 2));
    p.push(L(gx(17) + 2, bottom, 'B'), S.lead(gx(17) + 10, bottom - 16, gx(17) + 10, py(7) + ch - 2));
    p.push(L(gx(18) + 4, bottom, 'C'), S.lead(gx(18) + 10, bottom - 16, gx(18) + 10, py(7) + ch - 2));
    p.push(L(gx(8) + 4, py(1) + 40, 'D'), S.lead(gx(8) + 10, py(1) + 46, gx(8) + 10, py(4) + 2));
    p.push(L(gx(1) + 28, fy + 38, 'E'), S.lead(gx(1) + 40, fy + 28, gx(3) - 2, fy + 18));
    return svgDoc(520, bottom + 12, 'Outline of the modern periodic table with five regions lettered A to E: a column on the left, two columns on the right, a block of ten columns in the middle and two rows set apart below the table', p.join(''));
  }
  p.push(lab(14, fy + 2 * ch + 16, 'Group 1 (blue), group 2 (green), transition elements (yellow), group 17 (red),', { size: 10, c: MUTED }));
  p.push(lab(14, fy + 2 * ch + 30, 'group 18 (grey), inner transition elements (brown).', { size: 10, c: MUTED }));
  return svgDoc(520, fy + 2 * ch + 38, 'The modern periodic table in outline: 18 groups across and 7 periods down, with the first 20 elements named by symbol, the transition elements in groups 3 to 12, and the two rows of inner transition elements set below', p.join(''));
}
export const TABLE = table(false);
export const TABLE_LETTERED = table(true);

// ---------------------------------------------------------------- 4. melting points of the alkali metals
export const ALKALI = (() => {
  const p = [];
  const x0 = 110;
  MP.forEach(([name, t], i) => {
    const y = 20 + i * 30;
    p.push(lab(14, y + 14, name, { size: 11 }));
    p.push(S.rect(x0, y, t * 1.4, 20, { fill: BLUE, c: BLUE, fop: 0.25, sw: 1.3 }), lab(x0 + t * 1.4 + 6, y + 14, `${t} °C`, { size: 11, w: 'bold' }));
  });
  p.push(S.arrow(x0, 176, x0 + 250, 176, { c: RED, w: 1.8 }), lab(x0 + 2, 194, 'Down group 1, the melting point falls', { size: 11, c: RED }));
  return svgDoc(420, 204, 'Bar chart of the approximate melting points of the alkali metals: lithium 181, sodium 98, potassium 63, rubidium 39 and caesium 28 degrees Celsius, falling down group 1', p.join(''));
})();
