// ch12 Kinetic Theory: constants, number-to-words for TTS-safe narration, and numerical helpers that are independent of the
// closed forms used in the items (so the re-solve checks are real checks).
export const R = 8.314; // J mol^-1 K^-1, stated in every item that uses it
export const KB = 1.38e-23; // J K^-1
export const NA = 6.02e23; // mol^-1
export const ATM = 1.013e5; // Pa, 1 atm
export const G = 9.8; // m s^-2
export const ZERO_C = 273; // T (K) = t (deg C) + 273
export const EV = 1.6e-19; // J

// ---------------------------------------------------------------- numbers in words (narration is read aloud: no digits)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function intWords(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : '');
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` and ${intWords(n % 100)}` : ''}`;
  if (n < 1e6) return `${intWords(Math.floor(n / 1000))} thousand${n % 1000 ? `${n % 1000 < 100 ? ' and ' : ' '}${intWords(n % 1000)}` : ''}`;
  if (n < 1e9) return `${intWords(Math.floor(n / 1e6))} million${n % 1e6 ? ` ${intWords(n % 1e6)}` : ''}`;
  throw new Error(`number too large for words: ${n}`);
}
/** 1250 -> "one thousand two hundred and fifty"; 4.9 -> "four point nine"; handles decimals digit by digit. */
export function w(x) {
  if (x < 0) return `minus ${w(-x)}`;
  const s = Number.isInteger(x) ? String(x) : String(Number(x.toPrecision(12)));
  if (/e/i.test(s)) throw new Error(`w(): exponent form ${s}`);
  const [i, f] = s.split('.');
  return intWords(Number(i)) + (f ? ` point ${[...f].map((d) => ONES[Number(d)]).join(' ')}` : '');
}
/** Number rounded to n significant figures, as words. */
export const ws = (x, n = 3) => w(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- gas physics (closed forms)
export const idealP = (n, T, V) => (n * R * T) / V; // Pa, with V in m^3
export const vrmsM = (T, M) => Math.sqrt((3 * R * T) / M); // M in kg/mol
export const vrmsM2 = (T, m) => Math.sqrt((3 * KB * T) / m); // m in kg per molecule
export const mfp = (n, d) => 1 / (Math.SQRT2 * Math.PI * d * d * n);

// ---------------------------------------------------------------- independent numerical routes
/** Seeded generator (LCG). */
export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}
/**
 * Pressure on one wall of a cube of side L by explicit bookkeeping over N molecules of speed v with directions spread
 * evenly over a sphere (Fibonacci points): each molecule hits the wall vx/(2L) times per second and delivers 2 m vx per
 * hit, so P = sum(m vx^2) / L^3.
 */
export function wallPressure(N, m, v, L) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const vx = v * Math.cos(th) * rad;
    sum += m * vx * vx;
  }
  return sum / L ** 3;
}
/** Root-mean-square and mean of a list. */
export const meanOf = (a) => a.reduce((s, x) => s + x, 0) / a.length;
export const rmsOf = (a) => Math.sqrt(meanOf(a.map((x) => x * x)));
/** Bisection root of f on [a, b]. */
export function root(f, a, b) {
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}
/** Fraction of molecular energy by modes: total translational + rotational + vibrational quadratic terms for n atoms (linear or not). */
export function modes(atoms, linear) {
  const trans = 3;
  const rot = atoms === 1 ? 0 : linear ? 2 : 3;
  const vib = 3 * atoms - trans - rot;
  return { trans, rot, vib, total: 3 * atoms };
}
/** Heat capacities in units of R from f quadratic terms. */
export const cvR = (f) => f / 2;
export const cpR = (f) => f / 2 + 1;
/** x to 3 significant figures (number), and a tolerance of rel x |x| to 2 significant figures. */
export const v3 = (x) => Number(x.toPrecision(3));
export const tl = (x, rel = 0.01) => Number((Math.abs(x) * rel).toPrecision(2));

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
/** Plain-text scientific notation (unicode superscripts) for marking schemes and table cells: 1.41 × 10⁻²⁹; 0.01 <= |x| < 10000 stays plain. */
export function sciu(x, n = 3) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e <= 3) return x.toPrecision(n).includes('e') ? String(Number(x.toPrecision(n))) : x.toPrecision(n);
  let m = Number((x / 10 ** e).toPrecision(n));
  let k = e;
  if (Math.abs(m) >= 10) {
    m /= 10;
    k += 1;
  }
  return `${m.toFixed(n - 1)} × 10${[...String(k)].map((c) => SUP[c]).join('')}`;
}
