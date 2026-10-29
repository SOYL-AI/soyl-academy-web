// Hand-drawn SVG schematics for ch04 The d- and f-Block Elements (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Blocks of the periodic table.
const W = 16;
const X0 = 22;
const Y0 = 22;
function cell(col, row, fill, fop) {
  return S.rect(X0 + col * W, Y0 + row * W, W - 1, W - 1, { fill, sw: 0.5, c: 'var(--diagram-muted)', ...(fop !== undefined ? { fop } : {}) });
}
const cells = [];
for (let row = 0; row < 7; row++) {
  for (let col = 0; col < 18; col++) {
    const period = row + 1;
    let fill = null;
    let fop;
    if (period === 1) {
      if (col === 0) fill = 'var(--diagram-fill)';
      else if (col === 17) fill = 'var(--diagram-green)', (fop = 0.35);
    } else if (col <= 1) fill = 'var(--diagram-fill)';
    else if (col >= 12) fill = 'var(--diagram-green)', (fop = 0.35);
    else if (period >= 4) fill = 'var(--diagram-accent)', (fop = 0.45);
    if (fill) cells.push(cell(col, row, fill, fop));
  }
}
for (let i = 0; i < 14; i++) {
  cells.push(cell(3 + i, 8.3, 'var(--diagram-blue)', 0.35));
  cells.push(cell(3 + i, 9.3, 'var(--diagram-blue)', 0.35));
}
export const BLOCKS = svgDoc(
  340,
  230,
  'Outline of the periodic table divided into blocks: the s-block is the two columns on the left, the p-block the six columns on the right, the d-block the ten columns in the middle from period 4 to period 7 (groups 3 to 12), and the f-block the two separate rows at the bottom: the lanthanoids and the actinoids.',
  [
    ...cells,
    lab(X0 + W, 14, 's', { a: 'middle', w: 'bold' }),
    lab(X0 + 15 * W, 14, 'p', { a: 'middle', w: 'bold' }),
    lab(X0 + 7 * W, Y0 + 3 * W - 4, 'd-block: groups 3–12', { a: 'middle', w: 'bold', size: 10 }),
    lab(X0 + 7 * W + 4, Y0 + 8.3 * W - 4, 'f-block', { a: 'middle', w: 'bold', size: 10 }),
    lab(X0 + 3 * W - 4, Y0 + 8.3 * W + 11, 'lanthanoids', { a: 'end', size: 10 }),
    lab(X0 + 3 * W - 4, Y0 + 9.3 * W + 11, 'actinoids', { a: 'end', size: 10 }),
    lab(4, Y0 + 3 * W + 11, '4', { size: 10 }),
    lab(4, Y0 + 4 * W + 11, '5', { size: 10 }),
    lab(4, Y0 + 5 * W + 11, '6', { size: 10 }),
    lab(4, Y0 + 6 * W + 11, '7', { size: 10 }),
    lab(X0 + 9 * W, Y0 + 10.3 * W + 16, 'd-block: 3d, 4d, 5d and 6d series (periods 4–7)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Oxoanion structures.
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 12) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 4, label, { a: 'middle', size: 10 });
}
function bond(x1, y1, x2, y2, double = false) {
  if (!double) return S.line(x1, y1, x2, y2, { w: 1.5 });
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ox = (-dy / len) * 2.5;
  const oy = (dx / len) * 2.5;
  return S.line(x1 + ox, y1 + oy, x2 + ox, y2 + oy, { w: 1.5 }) + S.line(x1 - ox, y1 - oy, x2 - ox, y2 - oy, { w: 1.5 });
}
// tetrahedral centre with four oxygens; `doubles` = indices of double bonds (0 N, 1 E, 2 S, 3 W)
function tetra(cx, cy, centre, doubles, fill, skip = -1) {
  const pos = [[0, -36], [36, 0], [0, 36], [-36, 0]];
  const out = [];
  pos.forEach(([dx, dy], i) => {
    if (i === skip) return;
    const k = 12 / 36;
    out.push(bond(cx + dx * k, cy + dy * k, cx + dx * (1 - k), cy + dy * (1 - k), doubles.includes(i)));
    out.push(atom(cx + dx, cy + dy, doubles.includes(i) ? 'O' : 'O⁻'));
  });
  out.push(atom(cx, cy, centre, fill, 13));
  return out.join('');
}
export const CHROMATE = svgDoc(
  360,
  170,
  'Left: the chromate ion, a chromium atom joined to four oxygen atoms arranged tetrahedrally, two by double bonds and two as O minus; it is yellow. Right: the dichromate ion, two such tetrahedra sharing one bridging oxygen atom; it is orange. The Cr–O–Cr bond angle at the shared oxygen is about 126 degrees.',
  [
    tetra(70, 78, 'Cr', [0, 1], 'var(--diagram-yellow)'),
    lab(70, 150, 'Chromate ion (yellow)', { a: 'middle' }),
    tetra(195, 92, 'Cr', [0, 2], 'var(--diagram-fill)', 1),
    tetra(305, 92, 'Cr', [0, 2], 'var(--diagram-fill)', 3),
    bond(208, 86, 238, 64),
    bond(262, 64, 292, 86),
    atom(250, 58, 'O'),
    lab(250, 38, '126°', { a: 'middle', size: 10 }),
    lab(250, 150, 'Dichromate ion (orange)', { a: 'middle' }),
  ].join(''),
);
export const MANGANATE = svgDoc(
  340,
  170,
  'Left: the manganate ion, manganese joined tetrahedrally to four oxygen atoms, two by double bonds and two as O minus; it is green and paramagnetic because it has one unpaired electron. Right: the permanganate ion, manganese joined to three oxygens by double bonds and one O minus; it is purple and diamagnetic.',
  [
    tetra(85, 78, 'Mn', [0, 1], 'var(--diagram-green)'),
    lab(85, 146, 'Manganate (green)', { a: 'middle' }),
    lab(85, 160, 'one unpaired electron: paramagnetic', { a: 'middle', size: 10 }),
    tetra(255, 78, 'Mn', [0, 1, 3], 'var(--diagram-fill)'),
    lab(255, 146, 'Permanganate (purple)', { a: 'middle' }),
    lab(255, 160, 'no unpaired electron: diamagnetic', { a: 'middle', size: 10 }),
  ].join(''),
);
