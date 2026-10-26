// Sample spaces for ch14 Probability, enumerated outcome by outcome. Every probability in the chapter is
// re-solved by counting favourable outcomes in these spaces (never from the written answer).
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const die = range(1, 6);
export const dice2 = die.flatMap((a) => die.map((b) => [a, b]));
export const coins = (n) => (n === 0 ? [[]] : coins(n - 1).flatMap((s) => [[...s, 'H'], [...s, 'T']]));
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = [['spades', 'black'], ['clubs', 'black'], ['hearts', 'red'], ['diamonds', 'red']];
export const deck = SUITS.flatMap(([suit, colour]) => RANKS.map((rank) => ({ rank, suit, colour, face: ['J', 'Q', 'K'].includes(rank) })));
export const bag = (spec) => Object.entries(spec).flatMap(([colour, k]) => Array.from({ length: k }, () => colour));
export const isPrime = (n) => { if (n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
export const isSquare = (n) => Number.isInteger(Math.sqrt(n));
export const isCube = (n) => Number.isInteger(Math.round(Math.cbrt(n))) && Math.round(Math.cbrt(n)) ** 3 === n;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
/** [favourable, total] reduced, plus the raw counts. */
export function P(space, pred) {
  const fav = space.filter(pred).length, n = space.length, g = gcd(fav, n) || 1;
  return { fav, n, num: fav / g, den: n / g, v: fav / n };
}
/** LaTeX of a reduced probability: 0, 1 or \dfrac{a}{b}. */
export const tex = (p) => (p.num === 0 ? '0' : p.den === 1 ? String(p.num) : p.num < 10 && p.den < 10 ? `\\dfrac${p.num}${p.den}` : `\\dfrac{${p.num}}{${p.den}}`);
export const texRaw = (p) => `\\dfrac{${p.fav}}{${p.n}}`;
