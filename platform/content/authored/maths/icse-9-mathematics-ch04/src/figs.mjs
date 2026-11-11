// Figures for ICSE 9 Mathematics ch04, drawn as 'geometry' visuals (not to scale: the pieces stand for algebraic lengths).
// Every cell of an area model is computed as the product of its column and row terms, and the cells must add up to the
// product of the two bracket sums, which is multiplied out exactly by fact.mjs.
import { geom } from './lib.mjs';
import { P, MP, texOf } from './fact.mjs';

const r2 = (v) => Math.round(v * 1e3) / 1e3;
const lab = (t) => `$${t}$`;
const widthOf = (t) => (/[a-zA-Z]/.test(t) ? 2.3 : r2(0.9 + 0.13 * t.replace(/\D/g, '').length));

/**
 * Area model of (cols sum) x (rows sum): `cols` and `rows` are lists of TeX terms ('x', '5', '-3y'); rows run from top to bottom.
 * Returns { fig, cells, total } where cells[row][col] is the TeX of each product and total the expanded polynomial.
 */
export function areaModel({ cols, rows, alt, caption }) {
  const X0 = 1.3, Y0 = 0.8;
  const xs = [X0]; cols.forEach((c) => xs.push(r2(xs.at(-1) + widthOf(c))));
  const hs = rows.map((t) => widthOf(t) * (/[a-zA-Z]/.test(t) ? 0.7 : 0.9));
  const H = hs.reduce((s, h) => s + h, 0);
  const ys = [r2(Y0 + H)]; hs.forEach((h) => ys.push(r2(ys.at(-1) - h))); // ys[0] top edge ... ys[n] bottom edge (= Y0)
  const pts = {};
  const segs = [];
  const prod = rows.map((rt) => cols.map((ct) => P(rt).mul(P(ct))));
  const total = prod.flat().reduce((s, p) => s.add(p), MP.num(0));
  const want = P(cols.map((c) => `(${c})`).join('+')).mul(P(rows.map((c) => `(${c})`).join('+')));
  if (!total.eq(want)) throw new Error('areaModel: cells do not add up to the product of the sums');
  pts.TL = { at: [xs[0], ys[0]], label: false }; pts.TR = { at: [xs.at(-1), ys[0]], label: false };
  pts.BL = { at: [xs[0], ys.at(-1)], label: false }; pts.BR = { at: [xs.at(-1), ys.at(-1)], label: false };
  for (let i = 1; i < cols.length; i++) { pts[`T${i}`] = { at: [xs[i], ys[0]], label: false }; pts[`B${i}`] = { at: [xs[i], ys.at(-1)], label: false }; segs.push({ from: `T${i}`, to: `B${i}` }); }
  for (let j = 1; j < rows.length; j++) { pts[`L${j}`] = { at: [xs[0], ys[j]], label: false }; pts[`R${j}`] = { at: [xs.at(-1), ys[j]], label: false }; segs.push({ from: `L${j}`, to: `R${j}` }); }
  cols.forEach((c, i) => { pts[`C${i}`] = { at: [r2((xs[i] + xs[i + 1]) / 2), ys.at(-1)], label: lab(c), label_position: 's' }; });
  rows.forEach((c, j) => { pts[`W${j}`] = { at: [xs[0], r2((ys[j] + ys[j + 1]) / 2)], label: lab(c), label_position: 'w' }; });
  const cells = prod.map((row) => row.map((p) => texOf(p)));
  prod.forEach((row, j) => row.forEach((p, i) => { pts[`K${j}${i}`] = { at: [r2((xs[i] + xs[i + 1]) / 2), r2((ys[j] + ys[j + 1]) / 2)], label: lab(texOf(p)), label_position: 'n' }; }));
  const width = r2(xs.at(-1) + 0.7), height = r2(ys[0] + 0.5);
  const fig = geom({ width, height, points: pts, segments: segs, polygons: [{ vertices: ['TL', 'TR', 'BR', 'BL'] }], not_to_scale: true }, alt, caption);
  return { fig, cells, total };
}

/** A square of side a with a corner square of side b cut away, beside the rectangle (a - b) by (a + b) that the pieces make. */
export function squareDiffFig(alt, caption) {
  const a = 4.2, b = 1.7, x0 = 0.8, y0 = 0.6, gap = 1.0;
  const pts = {
    L1: [x0, y0], L2: [x0 + a, y0], L3: [x0 + a, y0 + a - b], L4: [x0 + a - b, y0 + a - b], L5: [x0 + a - b, y0 + a], L6: [x0, y0 + a],
  };
  const rx = x0 + a + gap;
  const rw = a + b, rh = a - b;
  const P2 = { R1: [rx, y0], R2: [rx + rw, y0], R3: [rx + rw, y0 + rh], R4: [rx, y0 + rh] };
  const points = {};
  for (const [k, v] of Object.entries({ ...pts, ...P2 })) points[k] = { at: v.map(r2), label: false };
  const segments = [
    { from: 'L1', to: 'L2', label: lab('a') }, { from: 'L2', to: 'L3', label: lab('a - b') }, { from: 'L3', to: 'L4', label: lab('b') },
    { from: 'L4', to: 'L5', label: lab('b') }, { from: 'L5', to: 'L6', label: lab('a - b') }, { from: 'L6', to: 'L1', label: lab('a') },
    { from: 'R1', to: 'R2', label: lab('a + b') }, { from: 'R2', to: 'R3', label: lab('a - b') }, { from: 'R3', to: 'R4' }, { from: 'R4', to: 'R1' },
  ];
  return geom({ width: r2(rx + rw + 0.8), height: r2(y0 + a + 0.8), points, segments, polygons: [{ vertices: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'], highlight: 'shade' }, { vertices: ['R1', 'R2', 'R3', 'R4'], highlight: 'outline' }], not_to_scale: true }, alt, caption);
}
