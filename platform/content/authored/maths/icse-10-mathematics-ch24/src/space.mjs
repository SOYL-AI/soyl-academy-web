// Exact probability helpers for ICSE 10 Mathematics ch24 Probability (single events, classical definition).
// Every probability in a key, a slide, a note or a table is the ratio of two counts obtained by enumerating a
// sample space in code; nothing is ever a rounded float. Spaces: one die, one or more coin tosses (listed
// outcomes only), a pack of 52 cards, bags of coloured balls, numbered tickets, letters of a word.

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export class Fr {
  constructor(n, d = 1) {
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const k = gcd(n, d) || 1;
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
  /** Terminating decimal string, or throws. */
  dec() {
    let d = this.d;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    if (d !== 1) throw new Error(`non-terminating ${this}`);
    return String(+this.v.toFixed(9));
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
  /** \dfrac{n}{d} (or the integer). */
  tex() { return this.d === 1 ? `${this.n}` : `\\dfrac{${this.n}}{${this.d}}`; }
  /** Inline maths: $\dfrac{n}{d}$. */
  m() { return `$${this.tex()}$`; }
}
export function fr(n, d = 1) {
  if (n instanceof Fr) return n;
  if (typeof n === 'string') {
    if (n.includes('/')) { const [a, b] = n.split('/').map(Number); return new Fr(a, b); }
    if (n.includes('.')) { const k = n.split('.')[1].length; return new Fr(Math.round(Number(n) * 10 ** k), 10 ** k); }
    return new Fr(Number(n), d);
  }
  if (!Number.isInteger(n)) throw new Error('pass decimals as strings');
  return new Fr(n, d);
}
export const sum = (xs) => xs.reduce((a, b) => a.add(b), new Fr(0));

// ---------------------------------------------------------------- sample spaces
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/** Probability of an event A (a predicate) on a sample space of equally likely outcomes. */
export const P = (space, A) => new Fr(space.filter(A).length, space.length);
export const count = (space, A) => space.filter(A).length;
export const die = range(1, 6);
export const coin = ['H', 'T'];
/** All ordered outcomes of n coin tosses, as strings such as 'HT'. */
export const coins = (n) => (n === 0 ? [''] : coins(n - 1).flatMap((s) => coin.map((c) => s + c)));
export const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
/** The 52 playing cards: rank 1..13 (1 ace, 11 jack, 12 queen, 13 king), suit index 0..3 (spades, hearts, diamonds, clubs). */
export const cards = range(1, 13).flatMap((rank) => SUITS.map((suit, si) => ({ rank, suit, red: si === 1 || si === 2, face: rank >= 11 })));
/** A bag as a list of colours, from { red: 3, blue: 4 }. */
export const bag = (spec) => Object.entries(spec).flatMap(([c, n]) => Array.from({ length: n }, () => c));
export const letters = (w) => [...w];
export const isVowel = (c) => 'AEIOU'.includes(c);
export const isPrime = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
export const isSquare = (n) => Number.isInteger(Math.sqrt(n));
export const isCube = (n) => Number.isInteger(Math.round(Math.cbrt(n))) && Math.round(Math.cbrt(n)) ** 3 === n;
export const months = [['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30], ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31]];

/** Options for an MCQ from fractions: texts as inline maths and the exact values for the re-solve. */
export const fopts = (xs) => { const fs = xs.map((x) => (Array.isArray(x) ? fr(x[0], x[1]) : fr(x))); return { opts: fs.map((f) => f.m()), vals: fs.map((f) => f.v) }; };
