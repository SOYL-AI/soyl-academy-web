// Independent brute-force helpers for CBSE 11 Mathematics ch02 (Cartesian products, relations from A to B, functions).
// Sets are arrays; a relation from A to B is an array of [a, b] pairs.
import { geom, plot } from './lib.mjs';

const same = (u, v) => String(u) === String(v);
export const has = (R, a, b) => R.some(([x, y]) => same(x, a) && same(y, b));
export const prod = (A, B) => A.flatMap((a) => B.map((b) => [a, b]));
export const relFrom = (A, B, pred) => prod(A, B).filter(([a, b]) => pred(a, b));
export const uniq = (xs) => xs.filter((x, i) => xs.findIndex((y) => same(x, y)) === i);
export const domOf = (R) => uniq(R.map(([a]) => a));
export const rngOf = (R) => uniq(R.map(([, b]) => b));
/** R is a function from A: every element of A has exactly one pair. */
export const isFunctionFrom = (A, R) => A.every((a) => R.filter(([x]) => same(x, a)).length === 1) && R.every(([x]) => A.some((a) => same(a, x)));
/** Same set of elements, ignoring order. */
export const sameSet = (X, Y) => X.length === Y.length && X.every((x) => Y.some((y) => same(x, y)));
export const subsetOf = (X, Y) => X.every((x) => Y.some((y) => same(x, y)));
/** All relations from A to B (2^(pq) of them) as arrays of pairs. Only for pq <= 20. */
export function allRelations(A, B) {
  const P = prod(A, B);
  if (P.length > 20) throw new Error('too many pairs to list');
  const out = [];
  for (let m = 0; m < 2 ** P.length; m++) out.push(P.filter((_, i) => (m >> i) & 1));
  return out;
}
/** All functions from a list A to the list B (each = array of pairs). */
export function allFunctions(A, B) {
  let out = [[]];
  for (const a of A) out = out.flatMap((f) => B.map((b) => [...f, [a, b]]));
  return out;
}
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
/** Sample points from lo to hi inclusive. */
export const grid = (lo, hi, n = 4000) => Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n);
/** Values of g at those x where g is a finite real number. */
export const okX = (g, xs) => xs.filter((x) => Number.isFinite(g(x)));
export const fl = Math.floor;
export const sgn = (x) => (x > 0 ? 1 : x < 0 ? -1 : 0);

/** plot() whose 'free' points are also flagged on_curve:false for the pipeline lint. */
export function plotF(spec, alt, caption) {
  const v = plot(spec, alt, caption);
  (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; });
  return v;
}

/** Arrow diagram: domain elements in a box on the left, codomain elements in a box on the right, one arrow per pair. */
export function arrowDiagram(dom, cod, pairs, { A = 'A', B = 'B', alt, caption }) {
  const n = Math.max(dom.length, cod.length);
  const H = n + 1.6;
  const points = {};
  const col = (xs, x0, tag) => xs.forEach((v, i) => {
    const top = H - 1.3, bottom = 0.9;
    const y = xs.length === 1 ? (top + bottom) / 2 : top - (i * (top - bottom)) / (xs.length - 1);
    points[`${tag}${i}`] = { at: [x0, Math.round(y * 1000) / 1000], label: String(v), label_position: tag === 'd' ? 'w' : 'e' };
  });
  col(dom, 1.6, 'd');
  col(cod, 5.4, 'c');
  const box = (x0, x1, tag, name) => {
    points[`${tag}1`] = { at: [x0, 0.3], label: false };
    points[`${tag}2`] = { at: [x1, 0.3], label: false };
    points[`${tag}3`] = { at: [x1, H - 0.7], label: false };
    points[`${tag}4`] = { at: [x0, H - 0.7], label: false };
    points[`${tag}N`] = { at: [(x0 + x1) / 2, H - 0.3], label: name };
    return { vertices: [`${tag}1`, `${tag}2`, `${tag}3`, `${tag}4`] };
  };
  const polygons = [box(0.4, 2.2, 'P', A), box(4.8, 6.6, 'Q', B)];
  const segments = pairs.map(([x, y]) => {
    const i = dom.findIndex((v) => same(v, x));
    const j = cod.findIndex((v) => same(v, y));
    if (i < 0 || j < 0) throw new Error(`arrowDiagram: ${x} -> ${y} not in sets`);
    return { from: `d${i}`, to: `c${j}`, arrows: 1 };
  });
  return geom({ width: 7, height: Math.round(H * 1000) / 1000, points, segments, polygons, not_to_scale: true }, alt, caption);
}
