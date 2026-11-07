// Helpers for CBSE 9 Mathematics ch04 Exploring Algebraic Identities: polynomial arithmetic on coefficient arrays,
// numeric identity checks, TeX printing of polynomials and factors, and area/volume figures built from computed rectangles.
import { geom, round3 } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(6)));
export const T$ = (v) => `$${fx(v)}$`;
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

// ---- polynomials in one variable: coefficient arrays, highest power first
export const pmul = (p, q) => { const o = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { o[i + j] += a * b; })); return o; };
export const padd = (p, q) => { const n = Math.max(p.length, q.length); const P = [...Array(n - p.length).fill(0), ...p], Q = [...Array(n - q.length).fill(0), ...q]; return P.map((v, i) => v + Q[i]); };
export const pscale = (p, k) => p.map((v) => v * k);
export const peval = (p, x) => p.reduce((s, c) => s * x + c, 0);
export const peq = (p, q) => padd(p, pscale(q, -1)).every((v) => v === 0);
export const pprod = (...fs) => fs.reduce(pmul);
/** TeX of a polynomial, e.g. [9, 30, 25] -> 9x^2 + 30x + 25. */
export function px(c, v = 'x') {
  const n = c.length - 1;
  let out = '';
  c.forEach((co, i) => {
    const p = n - i;
    if (co === 0) return;
    const a = Math.abs(co);
    let term = a === 1 && p > 0 ? '' : String(a);
    if (p > 0) term += v + (p > 1 ? `^${p}` : '');
    out += out === '' ? (co < 0 ? '-' : '') + term : ` ${co < 0 ? '-' : '+'} ${term}`;
  });
  return out || '0';
}
export const pxT = (c, v = 'x') => `$${px(c, v)}$`;
/** TeX of a product of linear factors given as [a, b] meaning ax + b; a repeated factor is written as a square. */
export function lf(fs, v = 'x') {
  const out = [];
  for (let i = 0; i < fs.length; i++) {
    const t = `(${px(fs[i], v)})`;
    let k = 1;
    while (i + k < fs.length && px(fs[i + k], v) === px(fs[i], v)) k++;
    out.push(k > 1 ? `${t}^${k}` : t);
    i += k - 1;
  }
  return out.join('');
}
export const lfT = (fs, v = 'x') => `$${lf(fs, v)}$`;

/** Checks f(...) == g(...) over a fixed set of integer points (one, two or three variables). */
export function numEq(f, g, pts) {
  return pts.every((p) => close(f(...p), g(...p), 1e-7));
}
export const PTS1 = [[-7], [-3], [-1], [0], [1], [2], [4], [9], [13]];
export const PTS2 = [[1, 2], [3, -4], [-5, 2], [7, 7], [0, 5], [-2, -9], [6, 1], [11, -3]];
export const PTS3 = [[1, 2, 3], [2, -3, 5], [-4, 0, 7], [5, 5, -2], [3, -6, 9], [-1, -1, -1], [8, 3, -11], [0, 2, 7]];

// ---- figures from computed rectangles
/**
 * Rectangles [x0, y0, x1, y1, label, highlight] drawn to scale (origin at the lower left, y up) inside a canvas with a
 * margin for the side labels. sides: [x, y, text] label-only points outside the figure.
 */
export function rectFig({ rects, sides = [], margin = 1.2 }, alt, caption) {
  const pts = {}, polygons = [];
  const key = (x, y) => `${round3(x)}_${round3(y)}`;
  const names = new Map();
  const nm = (x, y) => { const k = key(x, y); if (!names.has(k)) { names.set(k, `P${names.size}`); pts[names.get(k)] = { at: [round3(x + margin), round3(y + margin)], label: false }; } return names.get(k); };
  rects.forEach(([x0, y0, x1, y1, label, hl], i) => {
    polygons.push({ vertices: [nm(x0, y0), nm(x1, y0), nm(x1, y1), nm(x0, y1)], fill: true, highlight: hl ?? (i % 2 ? 'shade' : 'accent') });
    pts[`C${i}`] = { at: [round3((x0 + x1) / 2 + margin), round3((y0 + y1) / 2 + margin)], label };
  });
  sides.forEach(([x, y, text], i) => { pts[`S${i}`] = { at: [round3(x + margin), round3(y + margin)], label: text }; });
  const xs = rects.flatMap((q) => [q[0], q[2]]), ys = rects.flatMap((q) => [q[1], q[3]]);
  const W = Math.max(...xs, ...sides.map((s) => s[0])) + 2 * margin, H = Math.max(...ys, ...sides.map((s) => s[1])) + 2 * margin;
  return geom({ width: round3(W), height: round3(H), points: pts, polygons, not_to_scale: true }, alt, caption);
}
export const area = ([x0, y0, x1, y1]) => (x1 - x0) * (y1 - y0);
