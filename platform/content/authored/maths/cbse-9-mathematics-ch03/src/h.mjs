// Helpers for CBSE 9 Mathematics ch03 Sequences and Progressions: independent sequence arithmetic, simulations
// (recursion, Tower of Hanoi, Koch and Sierpinski constructions) and builders for plots and geometry figures.
import { plot, geom, round3 } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(6)));
/** Number in dollars (TeX). */
export const T$ = (v) => `$${fx(v)}$`;
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

// ---- sequences, computed by iteration so a closed form can be checked against them
export const ap = (a, d, n) => a + (n - 1) * d;
export const gp = (a, q, n) => a * q ** (n - 1);
export const seq = (n, f) => range(1, n).map(f);
/** First n terms of a_1 = a1, a_{k+1} = step(a_k, k), by iteration. */
export function iterate(a1, step, n) {
  const out = [a1];
  for (let k = 1; k < n; k++) out.push(step(out[k - 1], k));
  return out;
}
/** First n terms of a_{k+2} = a_{k+1} + a_k starting a1, a2. */
export function fibLike(a1, a2, n) {
  const out = [a1, a2];
  while (out.length < n) out.push(out[out.length - 1] + out[out.length - 2]);
  return out.slice(0, n);
}
export const isAP = (xs) => xs.every((x, i) => i < 2 || close(x - xs[i - 1], xs[1] - xs[0]));
export const isGP = (xs) => xs[0] !== 0 && xs.every((x, i) => i < 2 || close(x * xs[i - 2], xs[i - 1] * xs[i - 1]) && xs[i - 1] !== 0);
export const tri = (n) => iterate(1, (a, k) => a + k + 1, n)[n - 1]; // by recursion
export const sq = (n) => iterate(1, (a, k) => a + 2 * k + 1, n)[n - 1]; // by recursion

/** Tower of Hanoi solved by the recursive plan; returns the list of moves [disc, from, to]. */
export function hanoi(n, from = 'A', to = 'C', via = 'B', out = []) {
  if (n === 0) return out;
  hanoi(n - 1, from, via, to, out);
  out.push([n, from, to]);
  hanoi(n - 1, via, to, from, out);
  return out;
}
/** Plays the moves on three pegs and checks every rule; returns the final pegs. */
export function playHanoi(n, moves) {
  const peg = { A: range(1, n).reverse(), B: [], C: [] };
  for (const [d, a, b] of moves) {
    must(peg[a][peg[a].length - 1] === d, `disc ${d} is on top of ${a}`);
    must(!peg[b].length || peg[b][peg[b].length - 1] > d, `disc ${d} is not placed on a smaller disc`);
    peg[a].pop();
    peg[b].push(d);
  }
  return peg;
}

// ---- plots of (n, a_n)
function yRange(vals, lo0 = null) {
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = Math.max(1, Math.ceil((hi - lo) * 0.15));
  return [lo0 ?? Math.floor(lo - pad), Math.ceil(hi + pad)];
}
/** Points (n, a_n) of an AP on the line through them. label: the term numbers to label. */
export function apPlot({ a, d, n, label = [1, n], yl = 'a_n', y }, alt, caption) {
  const vals = seq(n, (k) => ap(a, d, k));
  const expr = `${fx(a)}+(${fx(d)})*(x-1)`;
  const pts = vals.map((v, i) => (label.includes(i + 1) ? [i + 1, v, `(${i + 1}, ${fx(v)})`] : [i + 1, v]));
  return plot({ x: [0, n + 1], y: y ?? yRange(vals), xl: 'n', yl, fns: [{ expr, domain: [1, n] }], pts }, alt, caption);
}
/** Points (n, a_n) of a GP (positive ratio) on the smooth curve through them. */
export function gpPlot({ a, q, qx = null, n, label = [1, n], yl = 'a_n', y }, alt, caption) {
  const vals = seq(n, (k) => gp(a, q, k));
  const expr = `${fx(a)}*(${qx ?? fx(q)})^(x-1)`;
  const pts = vals.map((v, i) => (label.includes(i + 1) ? [i + 1, v, `(${i + 1}, ${fx(v)})`] : [i + 1, v]));
  return plot({ x: [0, n + 1], y: y ?? [0, Math.ceil(Math.max(...vals) * 1.12)], xl: 'n', yl, fns: [{ expr, domain: [1, n] }], pts }, alt, caption);
}

// ---- geometry figures
const dot = (x, y) => ({ at: [round3(x), round3(y)], label: false });
/** First k triangular numbers drawn as dot triangles side by side. */
export function triangleDots(k, alt, caption) {
  const gap = 0.8, w = k * gap, pts = {};
  let x0 = 0.5, total = 0;
  const counts = [];
  for (let g = 1; g <= k; g++) {
    let c = 0;
    for (let row = 1; row <= g; row++) for (let j = 0; j < row; j++) { pts[`T${g}_${row}_${j}`] = dot(x0 + (g * gap) / 2 + (j - (row - 1) / 2) * gap, 0.5 + (k - row) * 0.8); c++; }
    counts.push(c);
    x0 += g * gap + 0.9;
    total = x0;
  }
  must(counts.every((c, i) => c === tri(i + 1)), 'dot counts are the triangular numbers');
  return { fig: geom({ width: round3(total - 0.4 + 0.1), height: round3(0.5 + (k - 1) * 0.8 + 0.5), points: pts, not_to_scale: true }, alt, caption), counts, w };
}
/** m by m dot grid with the L-shaped layers joined. */
export function squareDots(m, alt, caption) {
  const gap = 0.9, pts = {}, segs = [];
  const name = (i, j) => `S${i}_${j}`;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= m; j++) pts[name(i, j)] = dot(0.5 + (i - 1) * gap, 0.5 + (j - 1) * gap);
  const layers = [];
  for (let k = 1; k <= m; k++) {
    let c = 0;
    for (let i = 1; i <= k; i++) { c++; if (i > 1) segs.push({ from: name(i - 1, k), to: name(i, k) }); }
    for (let j = k - 1; j >= 1; j--) { c++; segs.push({ from: name(k, j + 1), to: name(k, j) }); }
    layers.push(c);
  }
  must(layers.every((c, i) => c === 2 * (i + 1) - 1) && layers.reduce((s, c) => s + c, 0) === m * m, 'L-shaped layers hold 2k-1 dots and total m squared');
  return { fig: geom({ width: round3(1 + (m - 1) * gap), height: round3(1 + (m - 1) * gap), points: pts, segments: segs, not_to_scale: true }, alt, caption), layers };
}
/** n triangles in a row made of matchsticks (zigzag plus chords): 2n + 1 sticks. */
export function stickTriangles(n, alt, caption) {
  const h = Math.sqrt(3), pts = {}, segs = [];
  for (let i = 0; i <= n + 1; i++) pts[`M${i}`] = dot(0.4 + i, 0.4 + (i % 2) * h);
  for (let i = 0; i <= n; i++) segs.push({ from: `M${i}`, to: `M${i + 1}` });
  for (let i = 0; i < n; i++) segs.push({ from: `M${i}`, to: `M${i + 2}` });
  must(segs.length === 2 * n + 1, '2n + 1 sticks');
  return { fig: geom({ width: round3(n + 1.8), height: round3(h + 0.8), points: pts, segments: segs }, alt, caption), sticks: segs.length };
}
/** Sierpinski triangle after `level` stages, with every remaining triangle filled. */
export function sierpinski(level, side = 8, alt, caption) {
  const A = [0.5, 0.5], B = [0.5 + side, 0.5], C = [0.5 + side / 2, 0.5 + (side * Math.sqrt(3)) / 2];
  const tris = [];
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  (function rec(p, q, s, l) {
    if (l === 0) return tris.push([p, q, s]);
    const pq = mid(p, q), qs = mid(q, s), sp = mid(s, p);
    rec(p, pq, sp, l - 1); rec(pq, q, qs, l - 1); rec(sp, qs, s, l - 1);
  })(A, B, C, level);
  const names = new Map(), pts = {};
  const nm = (p) => { const k = `${p[0].toFixed(3)}_${p[1].toFixed(3)}`; if (!names.has(k)) { names.set(k, `V${names.size}`); pts[names.get(k)] = dot(p[0], p[1]); } return names.get(k); };
  const polygons = tris.map((t) => ({ vertices: t.map(nm), fill: true, highlight: 'shade' }));
  must(tris.length === 3 ** level, 'Sierpinski count is 3^level');
  return { fig: geom({ width: round3(side + 1), height: round3((side * Math.sqrt(3)) / 2 + 1), points: pts, polygons, not_to_scale: true }, alt, caption), count: tris.length, smallSide: side / 2 ** level };
}
/** Koch snowflake after `stage` stages from an equilateral triangle of the given side. */
export function koch(stage, side = 6, alt, caption) {
  let pts = [[0, 0], [side, 0], [side / 2, (side * Math.sqrt(3)) / 2]];
  const c = Math.cos(-Math.PI / 3), s = Math.sin(-Math.PI / 3);
  for (let t = 1; t <= stage; t++) {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const P = pts[i], Q = pts[(i + 1) % pts.length], d = [(Q[0] - P[0]) / 3, (Q[1] - P[1]) / 3];
      const M1 = [P[0] + d[0], P[1] + d[1]], M2 = [P[0] + 2 * d[0], P[1] + 2 * d[1]];
      out.push(P, M1, [M1[0] + d[0] * c - d[1] * s, M1[1] + d[0] * s + d[1] * c], M2);
    }
    pts = out;
  }
  must(pts.length === 3 * 4 ** stage, 'sides 3 * 4^stage');
  const len = (i) => Math.hypot(pts[(i + 1) % pts.length][0] - pts[i][0], pts[(i + 1) % pts.length][1] - pts[i][1]);
  must(pts.every((_, i) => close(len(i), side / 3 ** stage, 1e-9)), 'all sides are side / 3^stage');
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs) - 0.5, y0 = Math.min(...ys) - 0.5;
  const named = {}, verts = [];
  pts.forEach((p, i) => { named[`K${i}`] = dot(p[0] - x0, p[1] - y0); verts.push(`K${i}`); });
  const fig = geom({ width: round3(Math.max(...xs) - x0 + 0.5), height: round3(Math.max(...ys) - y0 + 0.5), points: named, polygons: [{ vertices: verts, fill: true, highlight: 'shade' }], not_to_scale: true }, alt, caption);
  return { fig, sides: pts.length, sideLen: side / 3 ** stage, perimeter: (pts.length * side) / 3 ** stage };
}
/** Three pegs with n discs on peg A (largest at the bottom), drawn as filled rectangles. */
export function hanoiFigure(n, alt, caption) {
  const pts = {}, polygons = [], cx = [2.5, 7.5, 12.5];
  const rect = (id, x0, y0, x1, y1, highlight) => {
    pts[`${id}a`] = dot(x0, y0); pts[`${id}b`] = dot(x1, y0); pts[`${id}c`] = dot(x1, y1); pts[`${id}d`] = dot(x0, y1);
    polygons.push({ vertices: ['a', 'b', 'c', 'd'].map((k) => `${id}${k}`), fill: true, highlight });
  };
  const names = ['A', 'B', 'C'];
  cx.forEach((x, i) => {
    rect(`B${i}`, x - 2, 0.2, x + 2, 0.5, 'outline');
    rect(`P${i}`, x - 0.12, 0.5, x + 0.12, 4.6, 'outline');
    pts[`L${i}`] = { at: [x, 5.1], label: `Peg ${names[i]}` };
  });
  const widths = range(1, n).map((k) => 1.2 + (k - 1) * 1.0);
  range(1, n).reverse().forEach((k, level) => rect(`D${k}`, cx[0] - widths[k - 1] / 2, 0.5 + level * 0.7, cx[0] + widths[k - 1] / 2, 0.5 + (level + 1) * 0.7, k % 2 ? 'accent' : 'shade'));
  return geom({ width: 15, height: 5.8, points: pts, polygons, not_to_scale: true }, alt, caption);
}
