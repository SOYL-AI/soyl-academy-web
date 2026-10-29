// Independent brute-force helpers for CBSE 12 Mathematics ch01 (relations and functions).
// Relations are arrays of [a, b] pairs on a finite set; functions are arrays of images in domain order.
import { geom } from './lib.mjs';

const key = (a, b) => `${a}\u0001${b}`;
export const has = (R, a, b) => R.some(([x, y]) => x === a && y === b);
export const relFrom = (A, pred, B = A) => A.flatMap((a) => B.filter((b) => pred(a, b)).map((b) => [a, b]));
export const reflexive = (A, R) => A.every((a) => has(R, a, a));
export const symmetric = (R) => R.every(([a, b]) => has(R, b, a));
export function transitive(R) {
  const S = new Set(R.map(([a, b]) => key(a, b)));
  return R.every(([a, b]) => R.every(([c, d]) => c !== b || S.has(key(a, d))));
}
export const equivalence = (A, R) => reflexive(A, R) && symmetric(R) && transitive(R);
/** Property signature as a string: e.g. "RST", "R-T", "-S-". */
export const props = (A, R) => `${reflexive(A, R) ? 'R' : '-'}${symmetric(R) ? 'S' : '-'}${transitive(R) ? 'T' : '-'}`;
/** Equivalence classes of an equivalence relation, each sorted, in order of first element. */
export function classes(A, R) {
  const out = [];
  for (const a of A) if (!out.some((c) => c.includes(a))) out.push(A.filter((b) => has(R, a, b)));
  return out;
}
/** Smallest equivalence relation on A containing R (reflexive-symmetric-transitive closure). */
export function eqClosure(A, R) {
  let S = [...R, ...A.map((a) => [a, a]), ...R.map(([a, b]) => [b, a])];
  const uniq = (T) => T.filter(([a, b], i) => T.findIndex(([c, d]) => c === a && d === b) === i);
  S = uniq(S);
  for (;;) {
    const add = [];
    for (const [a, b] of S) for (const [c, d] of S) if (b === c && !has(S, a, d) && !has(add, a, d)) add.push([a, d]);
    if (!add.length) return S;
    S = [...S, ...add];
  }
}
/** All relations on A (2^(n^2) of them), as arrays of pairs. */
export function allRelations(A) {
  const P = A.flatMap((a) => A.map((b) => [a, b]));
  const out = [];
  for (let m = 0; m < 2 ** P.length; m++) out.push(P.filter((_, i) => (m >> i) & 1));
  return out;
}
/** All functions from a set of size m to the list B (each function = array of images). */
export function allFunctions(m, B) {
  let out = [[]];
  for (let i = 0; i < m; i++) out = out.flatMap((f) => B.map((b) => [...f, b]));
  return out;
}
export const injective = (images) => new Set(images.map(String)).size === images.length;
export const surjective = (images, B) => B.every((b) => images.some((y) => String(y) === String(b)));
export const countInj = (m, B) => allFunctions(m, B).filter(injective).length;
export const countSurj = (m, B) => allFunctions(m, B).filter((f) => surjective(f, B)).length;
/** Sampling test for a real function: returns a pair x1 != x2 with equal images, or null. */
export function collision(fn, xs = Array.from({ length: 801 }, (_, i) => -20 + i * 0.05)) {
  const seen = new Map();
  for (const x of xs) {
    const y = Math.round(fn(x) * 1e9) / 1e9;
    if (seen.has(y) && Math.abs(seen.get(y) - x) > 1e-9) return [seen.get(y), x];
    seen.set(y, x);
  }
  return null;
}

/**
 * Arrow diagram: domain elements in a box on the left, codomain elements in a box on the right,
 * one arrow (segment with a chevron pointing to the image) for each pair [x, y].
 */
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
    const i = dom.findIndex((v) => String(v) === String(x));
    const j = cod.findIndex((v) => String(v) === String(y));
    if (i < 0 || j < 0) throw new Error(`arrowDiagram: ${x} -> ${y} not in sets`);
    return { from: `d${i}`, to: `c${j}`, arrows: 1 };
  });
  return geom({ width: 7, height: Math.round(H * 1000) / 1000, points, segments, polygons, not_to_scale: true }, alt, caption);
}
