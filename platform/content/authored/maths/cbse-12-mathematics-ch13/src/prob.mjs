// Exact probability helpers for CBSE 12 Mathematics ch13 (subject-producer): rational arithmetic,
// brute-force sample spaces (dice, coins, cards, bags), and tree / Venn / partition figures.
import { geom } from '../../cbse-12-mathematics-ch01/src/lib.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const g = (a, b) => (b === 0 ? Math.abs(a) : g(b, a % b));

/** Exact fraction n/d (integers only). */
export class Fr {
  constructor(n, d = 1) {
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const k = g(n, d) || 1;
    this.n = n / k;
    this.d = d / k;
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); return new Fr(this.n * o.d, this.d * o.n); }
  comp() { return new Fr(this.d - this.n, this.d); }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  get v() { return this.n / this.d; }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
  /** \dfrac{n}{d} (or the integer). */
  tex() { return this.d === 1 ? `${this.n}` : `\\dfrac{${this.n}}{${this.d}}`; }
}
/** fr(3, 8), fr('3/8'), fr(0.25) (decimals with up to 6 places), or an Fr. */
export function fr(n, d = 1) {
  if (n instanceof Fr) return n;
  if (typeof n === 'string') { const [a, b] = n.split('/').map(Number); return new Fr(a, b ?? 1); }
  if (!Number.isInteger(n)) { const s = 1e6; return new Fr(Math.round(n * s), s * d); }
  return new Fr(n, d);
}
export const sum = (...xs) => xs.reduce((a, b) => fr(a).add(b), new Fr(0));
export const prod = (...xs) => xs.reduce((a, b) => fr(a).mul(b), new Fr(1));

// ---------------------------------------------------------------- sample spaces (equally likely outcomes)
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const cart = (...lists) => lists.reduce((acc, l) => acc.flatMap((x) => l.map((y) => [...x, y])), [[]]);
export const dice2 = cart(range(1, 6), range(1, 6));
export const die = range(1, 6).map((x) => [x]);
export const coins = (n) => cart(...Array.from({ length: n }, () => ['H', 'T']));
/** 52 cards: { rank 1..13 (1 ace, 11 J, 12 Q, 13 K), suit S H D C }. */
export const cards = cart(range(1, 13), ['S', 'H', 'D', 'C']).map(([rank, suit]) => ({ rank, suit, red: suit === 'H' || suit === 'D' }));
/** Ordered draws of k items without replacement from a list (every ordered k-tuple of distinct positions). */
export function draws(items, k) {
  const out = [];
  const rec = (used, cur) => {
    if (cur.length === k) { out.push(cur.slice()); return; }
    items.forEach((it, i) => { if (!used.has(i)) { used.add(i); cur.push(it); rec(used, cur); cur.pop(); used.delete(i); } });
  };
  rec(new Set(), []);
  return out;
}
/** Unordered pairs (combinations of 2) of distinct positions. */
export function pairs(items) {
  const out = [];
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) out.push([items[i], items[j]]);
  return out;
}
export const bag = (spec) => Object.entries(spec).flatMap(([c, n]) => Array.from({ length: n }, () => c));
export const P = (space, A) => new Fr(space.filter(A).length, space.length);
export const cond = (space, A, B) => new Fr(space.filter((w) => A(w) && B(w)).length, space.filter(B).length);

// ---------------------------------------------------------------- figures
/**
 * Two-stage tree. first: [[nodeLabel, branchLabel], …]; second: one array per first node of
 * [[leafLabel, branchLabel], …]; leafNotes (optional): text placed after each leaf (path products).
 */
export function tree({ root = 'Start', first, second = [], alt, caption, width = 9 }) {
  const leaves = second.length ? second.reduce((s, l) => s + l.length, 0) : first.length;
  const H = Math.max(3, leaves * 0.9 + 0.8);
  const points = { R: { at: [0.5, H / 2], label: root, label_position: 'w' } };
  const segments = [];
  let leafIdx = 0;
  const yLeaf = (i) => H - 0.5 - (i * (H - 1)) / Math.max(1, leaves - 1);
  const x1 = second.length ? 3.4 : 5.5, x2 = 6.9;
  first.forEach(([lab, br], i) => {
    const kids = second[i] ?? [];
    let y;
    if (kids.length) {
      const ys = kids.map((_, k) => yLeaf(leafIdx + k));
      y = (ys[0] + ys[ys.length - 1]) / 2;
      kids.forEach(([klab, kbr], k) => {
        const id = `L${i}_${k}`;
        points[id] = { at: [x2, round(ys[k])], label: klab, label_position: 'e' };
        segments.push({ from: `N${i}`, to: id, label: kbr });
      });
      leafIdx += kids.length;
    } else {
      y = second.length ? yLeaf(leafIdx++) : H - 0.5 - (i * (H - 1)) / Math.max(1, first.length - 1);
    }
    points[`N${i}`] = { at: [x1, round(y)], label: lab, label_position: kids.length ? 'n' : 'e' };
    segments.push({ from: 'R', to: `N${i}`, label: br });
  });
  return geom({ width, height: round(H), points, segments, not_to_scale: true }, alt, caption);
}
const round = (v) => Math.round(v * 1000) / 1000;

/** Two overlapping circles in a rectangle (sample space S). */
export function venn({ a = 'A', b = 'B', s = 'S', alt, caption }) {
  return geom({
    width: 8, height: 5,
    points: {
      S1: { at: [0.3, 0.3], label: false }, S2: { at: [7.7, 0.3], label: false }, S3: { at: [7.7, 4.7], label: false }, S4: { at: [0.3, 4.7], label: false },
      SL: { at: [0.7, 4.3], label: s },
      O1: { at: [3.1, 2.4], label: false }, O2: { at: [4.9, 2.4], label: false },
      LA: { at: [1.9, 4.1], label: a }, LB: { at: [6.1, 4.1], label: b },
      M: { at: [4, 2.4], label: false },
    },
    polygons: [{ vertices: ['S1', 'S2', 'S3', 'S4'] }],
    circles: [{ center: 'O1', radius: 1.6 }, { center: 'O2', radius: 1.6 }],
    not_to_scale: true,
  }, alt, caption);
}

/** Sample space split into n vertical strips E1..En, with an event A drawn as a circle across them. */
export function partition({ labels, alt, caption, event = 'A' }) {
  const n = labels.length;
  const W = 8, H = 4.6;
  const points = {};
  const polygons = [];
  for (let i = 0; i < n; i++) {
    const x0 = round(0.3 + (i * (W - 0.6)) / n), x1 = round(0.3 + ((i + 1) * (W - 0.6)) / n);
    points[`B${i}a`] = { at: [x0, 0.3], label: false };
    points[`B${i}b`] = { at: [x1, 0.3], label: false };
    points[`B${i}c`] = { at: [x1, H - 0.3], label: false };
    points[`B${i}d`] = { at: [x0, H - 0.3], label: false };
    points[`T${i}`] = { at: [round((x0 + x1) / 2), H - 0.7], label: labels[i] };
    polygons.push({ vertices: [`B${i}a`, `B${i}b`, `B${i}c`, `B${i}d`] });
  }
  points.C = { at: [W / 2, 2], label: false };
  points.CL = { at: [W / 2, 2.9], label: event };
  return geom({ width: W, height: H, points, polygons, circles: [{ center: 'C', radius: 1.6 }], not_to_scale: true }, alt, caption);
}
