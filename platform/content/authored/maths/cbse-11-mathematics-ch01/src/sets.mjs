// Independent brute-force helpers for CBSE 11 Mathematics ch01 (Sets).
// Sets are JS Sets of primitives; every table, Venn region and interval in the chapter is computed from them.
import { geom, round3 } from './lib.mjs';

export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const cmp = (x, y) => (typeof x === 'number' && typeof y === 'number' ? x - y : String(x) < String(y) ? -1 : String(x) > String(y) ? 1 : 0);
export const S = (xs) => new Set(xs);
export const arr = (A) => [...A].sort(cmp);
export const un = (A, B) => new Set([...A, ...B]);
export const it = (A, B) => new Set([...A].filter((x) => B.has(x)));
export const df = (A, B) => new Set([...A].filter((x) => !B.has(x)));
export const cp = (U, A) => df(U, A);
export const subset = (A, B) => [...A].every((x) => B.has(x));
export const same = (A, B) => A.size === B.size && subset(A, B);
export const filt = (U, pred) => new Set([...U].filter(pred));
export const sum = (A) => [...A].reduce((s, x) => s + x, 0);
/** Plain text of a set, e.g. "1, 2, 3". */
export const body = (A, fmt = String) => arr(A).map(fmt).join(', ');
/** LaTeX roster form. */
export const tex = (A, fmt = String) => (A.size ? `\\{${body(A, fmt)}\\}` : '\\varnothing');
/** Dollar-wrapped roster. */
export const $t = (A, fmt = String) => `$${tex(A, fmt)}$`;
/** Canonical string key of a set (for comparing sets of sets and option texts). */
export const key = (A) => JSON.stringify(arr(A));
/** All subsets of A, as arrays, by size then lexicographic. */
export function subsets(A) {
  const xs = arr(A);
  const out = [];
  for (let m = 0; m < 2 ** xs.length; m++) out.push(xs.filter((_, i) => (m >> i) & 1));
  return out.sort((p, q) => p.length - q.length || (p.join() < q.join() ? -1 : 1));
}
/** All subsets of A as Sets. */
export const powerset = (A) => subsets(A).map((a) => new Set(a));
export const texSub = (a, fmt = String) => (a.length ? `\\{${a.map(fmt).join(', ')}\\}` : '\\varnothing');
export const ordinal = (n) => n;

// ---------------------------------------------------------------- intervals, checked by sampling on a 1/16 grid
export const GRID = Array.from({ length: 24 * 16 * 2 + 1 }, (_, i) => -24 + i / 16); // -24 .. 24
/** Interval {lo, hi, loIn, hiIn}; lo/hi null = unbounded. */
export const iv = (lo, hi, loIn = true, hiIn = true) => ({ lo, hi, loIn: lo === null ? false : loIn, hiIn: hi === null ? false : hiIn });
export const inIv = (I, x) => (I.lo === null || (I.loIn ? x >= I.lo : x > I.lo)) && (I.hi === null || (I.hiIn ? x <= I.hi : x < I.hi));
export const inAny = (Is, x) => Is.some((I) => inIv(I, x));
/** True when predicate `pred` agrees with the union of intervals on the whole grid (including every end point). */
export function agrees(pred, Is) {
  return GRID.every((x) => pred(x) === inAny(Is, x));
}
/** Checks that a claimed interval list matches a predicate AND that each finite end point behaves as drawn. */
export function checkIntervals(pred, Is) {
  if (!agrees(pred, Is)) return false;
  for (const I of Is) for (const [e, inc, side] of [[I.lo, I.loIn, -1], [I.hi, I.hiIn, 1]]) {
    if (e === null) continue;
    if (pred(e) !== inc) return false; // the end point itself
    // just outside the end point (by a sixteenth) the interval must not contain it unless another interval does
  }
  return true;
}
const t1 = (v) => (v < 0 ? `-${-v}` : String(v));
/** Interval in LaTeX, e.g. "[-2, 5)". */
export const ivTex = (I) => `${I.lo === null ? '(-\\infty' : `${I.loIn ? '[' : '('}${I.lo}`}, ${I.hi === null ? '\\infty)' : `${I.hi}${I.hiIn ? ']' : ')'}`}`;
export const ivsTex = (Is) => (Is.length ? Is.map(ivTex).join(' \\cup ') : '\\varnothing');
/** Integers in an interval list. */
export const intsIn = (Is, a = -30, b = 30) => range(a, b).filter((x) => inAny(Is, x));
void t1; void round3;

// ---------------------------------------------------------------- Venn diagrams (geometry visual)
/**
 * Generic Venn diagram. circles: [{ name, cx, cy, r, set }]; universe U (Set). Each region (membership mask over the
 * circles) gets one label, placed at the centroid of grid samples that lie in exactly that region; the label is the
 * element list ('elems') or the count ('count'). The build asserts every label point lies in its own region and that the
 * labelled counts add up to n(U). Returns { visual, regions } where regions maps mask string ("10", "11", ...) to arrays.
 */
export function venn({ circles, U, width = 9, height = 6, mode = 'count', fmt = String, alt, caption, noName = false, outsideAt = null, labelCircle = true }) {
  const points = {};
  const circ = circles.map((c) => ({ ...c }));
  const maskAt = (x, y) => circ.map((c) => ((x - c.cx) ** 2 + (y - c.cy) ** 2 < c.r ** 2 ? '1' : '0')).join('');
  const members = (mask) => arr(U).filter((x) => circ.every((c, i) => c.set.has(x) === (mask[i] === '1')));
  const regions = {};
  for (let m = 0; m < 2 ** circ.length; m++) {
    const mask = [...m.toString(2).padStart(circ.length, '0')].join('');
    regions[mask] = members(mask);
  }
  // every element of U falls in exactly one region
  const total = Object.values(regions).reduce((s, v) => s + v.length, 0);
  if (total !== U.size) throw new Error(`venn: regions hold ${total}, U has ${U.size}`);
  for (const c of circ) if (!subset(c.set, U)) throw new Error(`venn: ${c.name} is not inside U`);
  const rect = { x0: 0.3, y0: 0.3, x1: width - 0.3, y1: height - 0.3 };
  const corners = ['U1', 'U2', 'U3', 'U4'];
  points.U1 = { at: [rect.x0, rect.y0], label: false };
  points.U2 = { at: [rect.x1, rect.y0], label: false };
  points.U3 = { at: [rect.x1, rect.y1], label: false };
  points.U4 = { at: [rect.x0, rect.y1], label: false };
  points.UN = { at: [rect.x0 + 0.45, rect.y1 - 0.4], label: 'U', label_position: 'e' };
  const centres = [];
  circ.forEach((c, i) => {
    points[`C${i}`] = { at: [c.cx, c.cy], label: false };
    centres.push({ center: `C${i}`, radius: c.r, label: noName ? undefined : undefined });
    if (labelCircle) {
      // the set name sits just outside the circle on its outer side
      const ang = c.nameAngle ?? (circ.length === 1 ? 135 : circ.length === 2 ? (i === 0 ? 150 : 30) : [150, 30, 270][i]);
      const nx = c.cx + (c.r + 0.35) * Math.cos((ang * Math.PI) / 180), ny = c.cy + (c.r + 0.35) * Math.sin((ang * Math.PI) / 180);
      points[`N${i}`] = { at: [round3(nx), round3(ny)], label: c.name, label_position: nx < c.cx ? 'w' : 'e' };
    }
  });
  // label points at region centroids (sampled)
  const placed = {};
  for (const [mask, els] of Object.entries(regions)) {
    if (!els.length) continue;
    let best0 = null, bestScore = -1, n = 0;
    const isOutside = /^0+$/.test(mask);
    for (let x = rect.x0 + 0.1; x < rect.x1; x += 0.05) for (let y = rect.y0 + 0.1; y < rect.y1; y += 0.05) {
      if (maskAt(x, y) !== mask) continue;
      n++;
      const score = Math.min(...circ.map((c) => Math.abs(Math.hypot(x - c.cx, y - c.cy) - c.r)));
      if (score > bestScore) { bestScore = score; best0 = [x, y]; }
    }
    if (!n) throw new Error();
    let at = [round3(best0[0]), round3(best0[1])];
    if (isOutside) {
      // bottom-right area outside every circle
      let best = null;
      for (let x = rect.x1 - 0.7; x > rect.x0 + 1.4; x -= 0.1) { if (maskAt(x, rect.y0 + 0.55) === mask) { best = [round3(x), round3(rect.y0 + 0.55)]; break; } }
      if (outsideAt) best = outsideAt;
      if (best) at = best;
    }
    if (maskAt(at[0], at[1]) !== mask) throw new Error(`venn: label for region ${mask} falls in region ${maskAt(at[0], at[1])}`);
    const label = mode === 'count' ? String(els.length) : els.map(fmt).join(', ');
    points[`R${mask}`] = { at, label };
    placed[mask] = at;
  }
  const polygons = [{ vertices: corners }];
  const visual = geom({ width, height, points, circles: centres, polygons, not_to_scale: true }, alt, caption);
  return { visual, regions, placed };
}

/** Standard two-circle layout (A left, B right). */
export function venn2(A, B, U, opts) {
  return venn({ circles: [{ name: opts.names?.[0] ?? 'A', cx: 3.4, cy: 3, r: 1.9, set: A }, { name: opts.names?.[1] ?? 'B', cx: 5.6, cy: 3, r: 1.9, set: B }], U, ...opts });
}
/** Standard three-circle layout. */
export function venn3(A, B, C, U, opts) {
  const [a, b, c] = opts.names ?? ['A', 'B', 'C'];
  return venn({ circles: [{ name: a, cx: 3.55, cy: 4.0, r: 1.75, set: A }, { name: b, cx: 5.45, cy: 4.0, r: 1.75, set: B }, { name: c, cx: 4.5, cy: 2.5, r: 1.75, set: C }], U, width: 9, height: 6.4, ...opts });
}
/** Nested layout for B inside A (subset picture). Both sets must satisfy B subset A. */
export function vennNested(Outer, Inner, U, opts) {
  return venn({ circles: [{ name: opts.names?.[0] ?? 'A', cx: 4.5, cy: 3, r: 2.3, set: Outer, nameAngle: 135 }, { name: opts.names?.[1] ?? 'B', cx: 4.1, cy: 3, r: 1.1, set: Inner, nameAngle: 160 }], U, ...opts });
}

/**
 * Builds explicit sets from region counts, e.g. { a: 12, ab: 4, abc: 2, none: 5 } (letters = which sets contain the elements).
 * Elements are consecutive integers from 1. Returns { A, B, C, U }.
 */
export function fromRegions(counts) {
  const A = new Set(), B = new Set(), C = new Set(), U = new Set();
  let id = 1;
  for (const [reg, n] of Object.entries(counts)) {
    for (let k = 0; k < n; k++, id++) {
      U.add(id);
      if (reg.includes('a')) A.add(id);
      if (reg.includes('b')) B.add(id);
      if (reg.includes('c')) C.add(id);
    }
  }
  return { A, B, C, U };
}
/** All subsets of {1..n} as Sets (for brute-force law checks). */
export const allSubsets = (n) => powerset(new Set(range(1, n)));
