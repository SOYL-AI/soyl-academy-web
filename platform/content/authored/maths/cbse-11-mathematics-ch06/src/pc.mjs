// Counting helpers for CBSE 11 Mathematics ch06 Permutations and Combinations.
// Two independent routes to every count: exact BigInt formulas (factorials, nPr, nCr, Pascal rows) and brute-force
// enumeration (every arrangement or selection is generated and counted under the stated constraint).
import { geom, table } from './lib.mjs';

export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;

// ------------------------------------------------------------------ formulas (BigInt)
export const F = (n) => { let x = 1n; for (let i = 2n; i <= BigInt(n); i++) x *= i; return x; };
export const P = (n, k) => (k < 0 || k > n ? 0n : F(n) / F(n - k));
export const Cm = (n, k) => (k < 0 || k > n ? 0n : F(n) / (F(k) * F(n - k)));
/** Row n of Pascal's triangle by repeated addition (independent of the factorial formula). */
export const pascalRow = (n) => { let row = [1n]; for (let i = 0; i < n; i++) { const nx = [1n]; for (let j = 1; j < row.length; j++) nx.push(row[j - 1] + row[j]); nx.push(1n); row = nx; } return row; };
/** Multinomial n! / (a! b! ...) as a BigInt (exact division is asserted). */
export const multi = (n, ...rep) => { const den = rep.reduce((p, a) => p * F(a), 1n); if (F(n) % den !== 0n) throw new Error('multinomial not exact'); return F(n) / den; };

// ------------------------------------------------------------------ enumeration
/** All ordered selections of k different items (k-permutations). */
export function* kPerms(items, k, used = [], cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = 0; i < items.length; i++) { if (used[i]) continue; used[i] = true; cur.push(items[i]); yield* kPerms(items, k, used, cur); cur.pop(); used[i] = false; }
}
/** All unordered selections of k different items (subsets of size k), in index order. */
export function* kCombs(items, k, start = 0, cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = start; i < items.length; i++) { cur.push(items[i]); yield* kCombs(items, k, i + 1, cur); cur.pop(); }
}
/** All sequences of length k with repetition allowed. */
export function* kSeqs(items, k, cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (const x of items) { cur.push(x); yield* kSeqs(items, k, cur); cur.pop(); }
}
/** Cartesian product of lists. */
export function* prod(...lists) {
  if (!lists.length) { yield []; return; }
  const [h, ...t] = lists;
  for (const x of h) for (const rest of prod(...t)) yield [x, ...rest];
}
/** Distinct arrangements of a multiset of letters (string), generated directly from the letter counts. */
export function* distinctArr(str) {
  const counts = new Map(); for (const ch of str) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  const keys = [...counts.keys()].sort(); const n = str.length; const cur = [];
  function* go() {
    if (cur.length === n) { yield cur.join(''); return; }
    for (const k of keys) { if (!counts.get(k)) continue; counts.set(k, counts.get(k) - 1); cur.push(k); yield* go(); cur.pop(); counts.set(k, counts.get(k) + 1); }
  }
  yield* go();
}
/** Count the items of a generator that satisfy pred. */
export const count = (gen, pred = () => true) => { let c = 0; for (const x of gen) if (pred(x)) c++; return c; };
export const list = (gen) => [...gen];
/** Distinct arrangements as a Set via all index permutations (a second, different route for short words). */
export const arrBySet = (str) => new Set(list(kPerms([...str], str.length)).map((a) => a.join('')));

// ------------------------------------------------------------------ geometry helpers (points in the plane)
export const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
export const collinear = (a, b, c) => Math.abs(cross(a, b, c)) < 1e-9;
/** Distinct lines through at least two of the points: group pairs by the set of points they contain. */
export function distinctLines(pts) {
  const seen = new Set();
  for (const [i, j] of kCombs(range(0, pts.length - 1), 2)) {
    const on = range(0, pts.length - 1).filter((k) => collinear(pts[i], pts[j], pts[k]));
    seen.add(on.join(','));
  }
  return seen.size;
}
export const triangles = (pts) => count(kCombs(range(0, pts.length - 1), 3), ([i, j, k]) => !collinear(pts[i], pts[j], pts[k]));

// ------------------------------------------------------------------ figures
const rd = (v) => Math.round(v * 1000) / 1000;
/** Two-stage tree diagram: root label, branches [[label, [leaf labels]]]. Returns a geometry visual; leaf count is returned too. */
export function treeFig(root, branches, alt, caption) {
  const leaves = branches.flatMap(([, ls]) => ls.map((l) => [l]));
  const nLeaf = leaves.length;
  const gap = 1.0, H = (nLeaf - 1) * gap + 1.2, W = 8.4;
  const points = { R: { at: [0.7, rd(H / 2)], label: root, label_position: 'w' } };
  const segments = [];
  let li = 0;
  branches.forEach(([lab, ls], bi) => {
    const ys = ls.map((_, k) => rd(H - 0.6 - (li + k) * gap));
    li += ls.length;
    const by = rd(ys.reduce((a, b) => a + b, 0) / ys.length);
    points[`B${bi}`] = { at: [3.4, by], label: lab, label_position: 'n' };
    segments.push({ from: 'R', to: `B${bi}` });
    ls.forEach((ll, k) => { points[`L${bi}_${k}`] = { at: [6.0, ys[k]], label: ll, label_position: 'e' }; segments.push({ from: `B${bi}`, to: `L${bi}_${k}` }); });
  });
  return { visual: geom({ width: W + 1.6, height: rd(H), points, segments, not_to_scale: true }, alt, caption), leaves: nLeaf };
}
/** Regular polygon with all chords: sides solid, diagonals dashed. Returns the visual and the counted sides / diagonals. */
export function polyChords(n, labels, alt, caption) {
  const cx = 3.5, cy = 3.5, R = 2.8;
  const pt = (k) => [rd(cx + R * Math.cos(Math.PI / 2 - (2 * Math.PI * k) / n)), rd(cy + R * Math.sin(Math.PI / 2 - (2 * Math.PI * k) / n))];
  const pos = ['n', 'ne', 'se', 's', 'sw', 'nw'];
  const points = {};
  labels.forEach((l, k) => { points[l] = { at: pt(k), label: `$${l}$`, label_position: n === 6 ? pos[k] : 'n' }; });
  const segments = []; let sides = 0, diags = 0;
  for (const [i, j] of kCombs(range(0, n - 1), 2)) {
    const side = j - i === 1 || (i === 0 && j === n - 1);
    segments.push({ from: labels[i], to: labels[j], ...(side ? {} : { dashed: true }) });
    if (side) sides++; else diags++;
  }
  return { visual: geom({ width: 7, height: 7, points, segments, not_to_scale: true }, alt, caption), sides, diags, chords: sides + diags };
}
export { table };
/** LaTeX for the symbols nPr and nCr (superscript prefix style used in CBSE books). */
export const nPt = (n, k) => `^{${n}}P_{${k}}`;
export const nCt = (n, k) => `^{${n}}C_{${k}}`;
/** Greedy deterministic choice of k extra points from candidates so that no three of (base + chosen extras) are collinear except triples inside base. */
export function genericExtras(base, k, candidates) {
  const chosen = [];
  const bad = (p) => {
    const all = [...base, ...chosen];
    for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
      if (!collinear(all[i], all[j], p)) continue;
      const inBase = base.includes(all[i]) && base.includes(all[j]);
      if (!inBase) return true;
      // p collinear with two base points: allowed only if p is itself a base point (it never is)
      return true;
    }
    return false;
  };
  for (const c of candidates) { if (chosen.length === k) break; if (!bad(c)) chosen.push(c); }
  if (chosen.length !== k) throw new Error('not enough generic points');
  return chosen;
}
