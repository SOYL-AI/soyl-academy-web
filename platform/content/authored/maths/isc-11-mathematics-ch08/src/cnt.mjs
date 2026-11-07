// Counting helpers for ISC 11 Mathematics ch08 Permutations and Combinations.
// Every count has two independent routes: exact BigInt formulas (factorials, nPr, nCr, multinomials, Pascal rows built by
// addition) and brute-force enumeration (every arrangement or selection is generated and tested against the stated condition).
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ------------------------------------------------------------------ formulas (BigInt)
export const F = (n) => { let x = 1n; for (let i = 2n; i <= BigInt(n); i++) x *= i; return x; };
export const P = (n, k) => (k < 0 || k > n ? 0n : F(n) / F(n - k));
export const Cm = (n, k) => (k < 0 || k > n ? 0n : F(n) / (F(k) * F(n - k)));
/** Row n of Pascal's triangle by repeated addition (independent of the factorial formula). */
export const pascalRow = (n) => { let row = [1n]; for (let i = 0; i < n; i++) { const nx = [1n]; for (let j = 1; j < row.length; j++) nx.push(row[j - 1] + row[j]); nx.push(1n); row = nx; } return row; };
/** Multinomial n! / (a! b! ...), exact division asserted. */
export const multi = (n, ...rep) => { const den = rep.reduce((p, a) => p * F(a), 1n); if (F(n) % den !== 0n) throw new Error('multinomial not exact'); return F(n) / den; };
/** Plain decimal string of a BigInt or number. */
export const S = (v) => String(v);
export const N = (v) => Number(v);

// ------------------------------------------------------------------ enumeration
export function* kPerms(items, k, used = [], cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = 0; i < items.length; i++) { if (used[i]) continue; used[i] = true; cur.push(items[i]); yield* kPerms(items, k, used, cur); cur.pop(); used[i] = false; }
}
export function* kCombs(items, k, start = 0, cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = start; i < items.length; i++) { cur.push(items[i]); yield* kCombs(items, k, i + 1, cur); cur.pop(); }
}
export function* kSeqs(items, k, cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (const x of items) { cur.push(x); yield* kSeqs(items, k, cur); cur.pop(); }
}
/** Distinct arrangements of a multiset of letters, generated straight from the letter counts. */
export function* distinctArr(str) {
  const counts = new Map(); for (const ch of str) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  const keys = [...counts.keys()].sort(); const n = str.length; const cur = [];
  function* go() {
    if (cur.length === n) { yield cur.join(''); return; }
    for (const k of keys) { if (!counts.get(k)) continue; counts.set(k, counts.get(k) - 1); cur.push(k); yield* go(); cur.pop(); counts.set(k, counts.get(k) + 1); }
  }
  yield* go();
}
export const count = (gen, pred = () => true) => { let c = 0; for (const x of gen) if (pred(x)) c++; return c; };
export const list = (gen) => [...gen];
/** Distinct arrangements through all index permutations collected in a Set (a second, different route for short words). */
export const arrBySet = (str) => new Set(list(kPerms([...str], str.length)).map((a) => a.join(''))).size;
/** Positions (indices) of items in an arrangement. */
export const adjacent = (arr, a, b) => { const i = arr.indexOf(a), j = arr.indexOf(b); return Math.abs(i - j) === 1; };

// ------------------------------------------------------------------ circular arrangements by brute force
/** Rotation class of a seating: rotate so the smallest label comes first. */
const rotCanon = (a) => { const i = a.indexOf(Math.min(...a)); return a.slice(i).concat(a.slice(0, i)); };
/** Number of seatings of the labels 0..n-1 round a table up to rotation (clockwise and anticlockwise are different). */
export function circularClasses(n, pred = () => true) {
  const seen = new Set();
  for (const a of kPerms(range(0, n - 1), n)) { if (!pred(a)) continue; seen.add(rotCanon(a).join(',')); }
  return seen.size;
}
/** Same, but a seating and its mirror image count once (necklace, garland, key ring). */
export function circularFlip(n, pred = () => true) {
  const seen = new Set();
  for (const a of kPerms(range(0, n - 1), n)) {
    if (!pred(a)) continue;
    const c1 = rotCanon(a).join(','), c2 = rotCanon(a.slice().reverse()).join(',');
    seen.add(c1 < c2 ? c1 : c2);
  }
  return seen.size;
}
/** Neighbours in a circle of n seats (positions wrap round). */
export const circAdj = (arr, a, b) => { const n = arr.length, i = arr.indexOf(a), j = arr.indexOf(b); return (i - j + n) % n === 1 || (j - i + n) % n === 1; };

// ------------------------------------------------------------------ prefix symbols
export const nPt = (n, k) => `^{${n}}P_{${k}}`;
export const nCt = (n, k) => `^{${n}}C_{${k}}`;

// ------------------------------------------------------------------ point sets for geometry questions
export const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
export const collinear = (a, b, c) => Math.abs(cross(a, b, c)) < 1e-9;
export const triangles = (pts) => count(kCombs(range(0, pts.length - 1), 3), ([i, j, k]) => !collinear(pts[i], pts[j], pts[k]));
export function distinctLines(pts) {
  const seen = new Set();
  for (const [i, j] of kCombs(range(0, pts.length - 1), 2)) seen.add(range(0, pts.length - 1).filter((k) => collinear(pts[i], pts[j], pts[k])).join(','));
  return seen.size;
}
/** Vertices of a regular n-gon (floating point); chords counted as sides or diagonals by index distance. */
export const polyDiagonals = (n) => count(kCombs(range(0, n - 1), 2), ([i, j]) => !(j - i === 1 || (i === 0 && j === n - 1)));
