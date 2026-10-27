// Hand-drawn SVG schematics for ch14 Periodic Classification of Elements (allow-listed elements, palette colours only).
// The periodic-table layouts are computed from (period, group) positions, not hand-placed.
import { svgDoc, S } from '../../cbse-10-science-ch06/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- shared element data (Z 1–20)
export const FIRST20 = [
  // [Z, symbol, name, period, group, shells, kind]
  [1, 'H', 'hydrogen', 1, 1, [1], 'non-metal'],
  [2, 'He', 'helium', 1, 18, [2], 'noble'],
  [3, 'Li', 'lithium', 2, 1, [2, 1], 'metal'],
  [4, 'Be', 'beryllium', 2, 2, [2, 2], 'metal'],
  [5, 'B', 'boron', 2, 13, [2, 3], 'metalloid'],
  [6, 'C', 'carbon', 2, 14, [2, 4], 'non-metal'],
  [7, 'N', 'nitrogen', 2, 15, [2, 5], 'non-metal'],
  [8, 'O', 'oxygen', 2, 16, [2, 6], 'non-metal'],
  [9, 'F', 'fluorine', 2, 17, [2, 7], 'non-metal'],
  [10, 'Ne', 'neon', 2, 18, [2, 8], 'noble'],
  [11, 'Na', 'sodium', 3, 1, [2, 8, 1], 'metal'],
  [12, 'Mg', 'magnesium', 3, 2, [2, 8, 2], 'metal'],
  [13, 'Al', 'aluminium', 3, 13, [2, 8, 3], 'metal'],
  [14, 'Si', 'silicon', 3, 14, [2, 8, 4], 'metalloid'],
  [15, 'P', 'phosphorus', 3, 15, [2, 8, 5], 'non-metal'],
  [16, 'S', 'sulfur', 3, 16, [2, 8, 6], 'non-metal'],
  [17, 'Cl', 'chlorine', 3, 17, [2, 8, 7], 'non-metal'],
  [18, 'Ar', 'argon', 3, 18, [2, 8, 8], 'noble'],
  [19, 'K', 'potassium', 4, 1, [2, 8, 8, 1], 'metal'],
  [20, 'Ca', 'calcium', 4, 2, [2, 8, 8, 2], 'metal'],
];
/** Electronic configuration of Z ≤ 20 by the 2, 8, 8 rule used in Class 10 (independent of the table above). */
export function shellsOf(z) {
  const caps = [2, 8, 8, 2];
  const out = [];
  let left = z;
  for (const c of caps) {
    if (left <= 0) break;
    out.push(Math.min(c, left));
    left -= Math.min(c, left);
  }
  return out;
}
/** Period and group of a main-group element (Z ≤ 20) from its configuration. */
export function positionOf(z) {
  const sh = shellsOf(z);
  const v = sh[sh.length - 1];
  const period = sh.length;
  const group = z === 2 ? 18 : v <= 2 ? v : v + 10;
  return { period, group, valence: v };
}
/** Valency = valence electrons (1–4) or 8 − valence electrons (5–8); noble gases 0. */
export function valencyOf(z) {
  const { valence, group } = positionOf(z);
  if (group === 18) return 0;
  return valence <= 4 ? valence : 8 - valence;
}

const KIND_FILL = { metal: 'var(--diagram-blue)', metalloid: 'var(--diagram-yellow)', 'non-metal': 'var(--diagram-green)', noble: 'var(--diagram-muted)' };

// 1. Layout of the whole modern periodic table (18 groups, 7 periods, two separate rows)
const METALLOIDS = new Set(['2,13', '3,14', '4,14', '4,15', '5,15', '5,16', '6,16']);
const NONMETALS = new Set(['1,1', '1,18', '2,14', '2,15', '2,16', '2,17', '2,18', '3,15', '3,16', '3,17', '3,18', '4,16', '4,17', '4,18', '5,17', '5,18', '6,18']);
const LITTLE_KNOWN = new Set(['6,17', '7,13', '7,14', '7,15', '7,16', '7,17', '7,18']);
const exists = (p, g) => (p === 1 ? g === 1 || g === 18 : p <= 3 ? g <= 2 || g >= 13 : true);
function layout() {
  const w = 20;
  const h = 19;
  const x0 = 34;
  const y0 = 40;
  const parts = [];
  for (let g = 1; g <= 18; g++) parts.push(S.text(x0 + (g - 1) * w + w / 2, y0 - 5, String(g), { a: 'middle', size: 10, w: 'bold' }));
  for (let p = 1; p <= 7; p++) {
    parts.push(S.text(x0 - 8, y0 + (p - 1) * h + 13, String(p), { a: 'end', size: 10, w: 'bold' }));
    for (let g = 1; g <= 18; g++) {
      if (!exists(p, g)) continue;
      const key = `${p},${g}`;
      const fill = METALLOIDS.has(key) ? 'var(--diagram-yellow)' : NONMETALS.has(key) ? 'var(--diagram-green)' : LITTLE_KNOWN.has(key) ? 'none' : 'var(--diagram-blue)';
      parts.push(S.rect(x0 + (g - 1) * w, y0 + (p - 1) * h, w, h, { fill, fop: fill === 'none' ? undefined : 0.35, sw: 0.8 }));
      if ((p === 6 || p === 7) && g === 3) parts.push(S.text(x0 + 2 * w + w / 2, y0 + (p - 1) * h + 14, p === 6 ? '*' : '**', { a: 'middle', size: 11, w: 'bold' }));
    }
  }
  // the two separate rows (lanthanoids, actinoids)
  const yf = y0 + 7 * h + 10;
  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < 14; i++) parts.push(S.rect(x0 + (3 + i) * w, yf + r * h, w, h, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 0.8 }));
    parts.push(S.text(x0 + 3 * w - 4, yf + r * h + 13, r === 0 ? '* Lanthanoids' : '** Actinoids', { a: 'end', size: 10 }));
  }
  // labels in the empty space above the transition elements
  parts.push(lab(x0 + 7 * w, y0 + 14, 'Groups 3–12:', { a: 'middle', w: 'bold' }));
  parts.push(lab(x0 + 7 * w, y0 + 28, 'transition elements', { a: 'middle' }));
  parts.push(S.arrow(x0 + 7 * w, y0 + 34, x0 + 7 * w, y0 + 3 * h + 2, { c: 'var(--diagram-accent)', w: 1.2, size: 6 }));
  parts.push(S.text(2, y0 - 5, 'Period', { size: 10, c: 'var(--diagram-muted)' }));
  parts.push(S.text(x0 + 9 * w, y0 - 20, 'Group', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }));
  // legend
  const ly = yf + 2 * h + 18;
  const key = (x, fill, text) => S.rect(x, ly - 9, 12, 12, { fill, fop: fill === 'none' ? undefined : 0.35, sw: 0.8 }) + lab(x + 16, ly + 1, text);
  parts.push(key(10, 'var(--diagram-blue)', 'Metals'), key(78, 'var(--diagram-yellow)', 'Metalloids'), key(166, 'var(--diagram-green)', 'Non-metals'));
  parts.push(key(256, 'none', 'Little known'));
  parts.push(lab(200, ly + 20, 'Metalloids lie along a zig-zag between metals and non-metals', { a: 'middle', c: 'var(--diagram-accent)' }));
  return svgDoc(
    400,
    ly + 28,
    'Outline of the modern periodic table: 18 vertical groups numbered 1 to 18 and 7 horizontal periods; groups 3 to 12 are transition elements; two separate rows below hold the lanthanoids and actinoids; metals fill the left and centre, non-metals the upper right, and metalloids lie on a zig-zag between them',
    parts.join(''),
  );
}
export const LAYOUT = layout();

// 2. The first twenty elements in the main groups
function first20() {
  const cw = 38;
  const ch = 40;
  const x0 = 34;
  const y0 = 34;
  const gap = 16;
  const col = (g) => (g <= 2 ? g - 1 : g - 11); // groups 1,2,13..18 → columns 0..7
  const xOf = (g) => x0 + col(g) * cw + (g >= 13 ? gap : 0);
  const parts = [];
  for (const g of [1, 2, 13, 14, 15, 16, 17, 18]) parts.push(S.text(xOf(g) + cw / 2, y0 - 8, String(g), { a: 'middle', size: 11, w: 'bold' }));
  parts.push(S.text(x0 + 2 * cw + gap / 2, y0 - 8, '…', { a: 'middle', size: 11 }));
  for (let p = 1; p <= 4; p++) parts.push(S.text(x0 - 10, y0 + (p - 1) * ch + 25, String(p), { a: 'end', size: 11, w: 'bold' }));
  for (const [z, sym, , p, g, , kind] of FIRST20) {
    const x = xOf(g);
    const y = y0 + (p - 1) * ch;
    parts.push(S.rect(x, y, cw, ch, { fill: KIND_FILL[kind], fop: 0.3, sw: 1 }));
    parts.push(S.text(x + 4, y + 12, String(z), { size: 10 }));
    parts.push(S.text(x + cw / 2, y + 31, sym, { a: 'middle', size: 15, w: 'bold' }));
  }
  parts.push(S.line(x0 + 2 * cw + gap / 2, y0 + 2 * ch - 6, x0 + 2 * cw + gap / 2, y0 + 4 * ch, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  parts.push(S.text(x0 + 2 * cw + gap / 2, y0 + 4 * ch + 13, '3–12 from period 4', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  const ly = y0 + 4 * ch + 34;
  const key = (x, kind, text) => S.rect(x, ly - 9, 12, 12, { fill: KIND_FILL[kind], fop: 0.3, sw: 1 }) + lab(x + 16, ly + 1, text);
  parts.push(key(6, 'metal', 'Metal'), key(70, 'metalloid', 'Metalloid'), key(158, 'non-metal', 'Non-metal'), key(248, 'noble', 'Noble gas'));
  parts.push(S.text(6, 14, 'Atomic number above, symbol below', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(
    360,
    ly + 10,
    'The first twenty elements in the modern periodic table: period 1 has hydrogen in group 1 and helium in group 18; periods 2 and 3 run from lithium to neon and from sodium to argon across groups 1, 2 and 13 to 18; potassium and calcium start period 4; groups 3 to 12 begin only in period 4',
    parts.join(''),
  );
}
export const TABLE20 = first20();

// 3. Trends across a period and down a group
export const TRENDS = svgDoc(
  340,
  250,
  'Trends in the periodic table: going across a period from left to right, atomic size and metallic character decrease while non-metallic character increases; going down a group, atomic size and metallic character increase and the number of shells increases',
  [
    S.rect(70, 70, 250, 150, { fill: 'var(--diagram-fill)', sw: 1 }),
    ...[1, 2, 3, 4].map((i) => S.line(70, 70 + i * 30, 320, 70 + i * 30, { c: 'var(--diagram-muted)', w: 0.6 })),
    ...[1, 2, 3, 4, 5, 6, 7].map((i) => S.line(70 + i * 31.25, 70, 70 + i * 31.25, 220, { c: 'var(--diagram-muted)', w: 0.6 })),
    S.arrow(76, 56, 316, 56, { c: 'var(--diagram-accent)', w: 2.5, size: 9 }),
    lab(196, 18, 'Across a period (left to right)', { a: 'middle', w: 'bold' }),
    lab(196, 32, 'atomic size decreases · metallic character decreases', { a: 'middle', size: 10 }),
    lab(196, 45, 'non-metallic character increases', { a: 'middle', size: 10 }),
    S.arrow(56, 76, 56, 216, { c: 'var(--diagram-blue)', w: 2.5, size: 9 }),
    lab(12, 92, 'Down', { w: 'bold' }),
    lab(12, 105, 'a group', { w: 'bold' }),
    lab(195, 160, 'Down a group:', { a: 'middle', w: 'bold', c: 'var(--diagram-blue)' }),
    lab(195, 175, 'one more shell each period', { a: 'middle', size: 10 }),
    lab(195, 189, 'atomic size increases', { a: 'middle', size: 10 }),
    lab(195, 203, 'metallic character increases', { a: 'middle', size: 10 }),
    lab(195, 100, 'Same shells, more protons:', { a: 'middle', w: 'bold', c: 'var(--diagram-accent)' }),
    lab(195, 115, 'outer electrons pulled closer', { a: 'middle', size: 10 }),
    lab(195, 242, 'Valence electrons: same down a group, 1 → 8 across a period', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Bohr-style shells for group 1: Li, Na, K
function atom(cx, cy, shells, radii, { nucleus, colour = 'var(--diagram-blue)' } = {}) {
  const parts = [S.circle(cx, cy, nucleus ? 11 : 7, { fill: 'var(--diagram-red)', fop: nucleus ? 0.3 : 0.5, sw: 1 })];
  if (nucleus) parts.push(S.text(cx, cy + 4, nucleus, { a: 'middle', size: 10, w: 'bold' }));
  shells.forEach((n, i) => {
    const rr = radii[i];
    parts.push(S.circle(cx, cy, rr, { c: 'var(--diagram-muted)', sw: 1 }));
    for (let k = 0; k < n; k++) {
      const a = -Math.PI / 2 + (2 * Math.PI * k) / n + (i % 2 ? Math.PI / n : 0);
      parts.push(S.circle(cx + rr * Math.cos(a), cy + rr * Math.sin(a), 2.6, { fill: colour, sw: 0 }));
    }
  });
  return parts.join('');
}
export const GROUP1 = svgDoc(
  340,
  178,
  'Atoms of lithium, sodium and potassium drawn with their electron shells: lithium has two shells, sodium three and potassium four, each with one electron in the outermost shell, so the atoms get bigger down group 1',
  [
    atom(48, 78, [2, 1], [13, 24]),
    atom(140, 78, [2, 8, 1], [13, 24, 35]),
    atom(268, 78, [2, 8, 8, 1], [13, 24, 35, 46]),
    lab(48, 138, 'Li: 2, 1', { a: 'middle', w: 'bold' }),
    lab(140, 138, 'Na: 2, 8, 1', { a: 'middle', w: 'bold' }),
    lab(268, 138, 'K: 2, 8, 8, 1', { a: 'middle', w: 'bold' }),
    lab(48, 153, '2 shells', { a: 'middle' }),
    lab(140, 153, '3 shells', { a: 'middle' }),
    lab(268, 153, '4 shells', { a: 'middle' }),
    lab(170, 172, 'One valence electron each; size grows down the group', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(6, 14, 'Not to scale', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. Same period: Na and Cl
export const NACL = svgDoc(
  330,
  182,
  'Sodium and chlorine atoms side by side: both have three shells, but chlorine has 17 protons against sodium’s 11, so its electrons are pulled in more strongly and the chlorine atom is smaller',
  [
    atom(82, 82, [2, 8, 1], [18, 30, 43], { nucleus: '+11' }),
    atom(242, 82, [2, 8, 7], [17, 25, 33], { nucleus: '+17', colour: 'var(--diagram-green)' }),
    lab(82, 140, 'Sodium, Na: 2, 8, 1', { a: 'middle', w: 'bold' }),
    lab(242, 140, 'Chlorine, Cl: 2, 8, 7', { a: 'middle', w: 'bold' }),
    lab(82, 155, '11 protons', { a: 'middle' }),
    lab(242, 155, '17 protons', { a: 'middle' }),
    lab(165, 176, 'Same number of shells; more protons pull them in', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(6, 14, 'Not to scale', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { LAYOUT, TABLE20, TRENDS, GROUP1, NACL };
