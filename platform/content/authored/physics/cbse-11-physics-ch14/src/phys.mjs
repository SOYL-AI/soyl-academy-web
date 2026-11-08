// ch14 Waves: constants, number-to-words for TTS-safe narration, closed forms, and numerical routes that are independent of the closed
// forms used in the items (so the re-solve checks are real checks).
export const PI = Math.PI;
export const V_AIR = 340; // m s^-1, speed of sound in air at room temperature unless a stem says otherwise
export const R = 8.314; // J mol^-1 K^-1
export const GAMMA_AIR = 1.4;
export const M_AIR = 0.029; // kg mol^-1
export const ATM = 1.013e5; // Pa
export const ZERO_C = 273; // T (K) = t (deg C) + 273

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

// ---------------------------------------------------------------- closed forms
export const stringV = (T, mu) => Math.sqrt(T / mu); // m s^-1
export const rodV = (Y, rho) => Math.sqrt(Y / rho);
export const newtonV = (P, rho) => Math.sqrt(P / rho);
export const laplaceV = (gamma, P, rho) => Math.sqrt((gamma * P) / rho);
export const gasVT = (gamma, T, M) => Math.sqrt((gamma * R * T) / M);
export const stringF = (n, L, v) => (n * v) / (2 * L); // fixed-fixed string or open pipe
export const closedF = (n, L, v) => ((2 * n - 1) * v) / (4 * L); // n = 1, 2, 3 -> 1st, 3rd, 5th harmonic

// ---------------------------------------------------------------- independent numerical routes
/** Seeded generator (LCG). */
export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}
/** Bisection root of f on [a, b] (f(a) and f(b) of opposite sign). */
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
/** All roots of g(k) on (0, kMax] found by scanning for sign changes and bisecting. */
export function roots(g, kMax, steps = 20000) {
  const out = [];
  let prev = g(1e-9);
  let kp = 1e-9;
  for (let i = 1; i <= steps; i++) {
    const k = (kMax * i) / steps;
    const cur = g(k);
    if (prev === 0) out.push(kp);
    else if (prev * cur < 0) out.push(root(g, kp, k));
    prev = cur;
    kp = k;
  }
  return out;
}
/**
 * Resonant frequencies of a column of length L and wave speed v found from the boundary condition on the displacement amplitude
 * s(x) = cos(k x) measured from the open end x = 0: the other end at x = L is an antinode (open: s'(L) = 0, i.e. sin(kL) = 0) or a
 * node (closed: s(L) = 0, i.e. cos(kL) = 0). Returns the first `count` frequencies in Hz. Independent of the closed forms n v / 2L.
 */
export function columnModes(kind, L, v, count) {
  const g = kind === 'open' ? (k) => Math.sin(k * L) : (k) => Math.cos(k * L);
  const kMax = ((2 * count + 2) * PI) / (kind === 'open' ? L : 2 * L);
  return roots(g, kMax).slice(0, count).map((k) => (k * v) / (2 * PI));
}
/** Resonances of a string fixed at x = 0 and x = L: displacement y(x) = sin(kx) with y(L) = 0, as frequencies in Hz. */
export function stringModes(L, v, count) {
  return roots((k) => Math.sin(k * L), ((count + 1) * PI) / L).slice(0, count).map((k) => (k * v) / (2 * PI));
}
/**
 * Loud swells counted from a sampled signal: the sum of two unit sinusoids is sampled every 1/rate s over  s, the peaks of |sum| are
 * listed, and a swell is a local maximum of those peak heights that reaches 90% of the largest (neighbouring detections within half a beat
 * period are merged). Swells within a quarter of a beat period of either end are not counted, so a whole number of beats gives
 * (beat frequency x dur) - 1 interior swells. Independent of the formula f1 - f2.
 */
export function interiorSwells(f1, f2, dur, rate = 20000) {
  const fb = Math.abs(f1 - f2);
  const n = Math.round(dur * rate);
  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / rate;
    a[i] = Math.abs(Math.sin(2 * PI * f1 * t) + Math.sin(2 * PI * f2 * t));
  }
  const pk = [];
  for (let i = 1; i < n - 1; i++) if (a[i] > a[i - 1] && a[i] >= a[i + 1]) pk.push([i / rate, a[i]]);
  const top = Math.max(...pk.map((p) => p[1]));
  const found = [];
  for (let i = 1; i < pk.length - 1; i++) {
    const [t, h] = pk[i];
    if (t < 0.25 / fb || t > dur - 0.25 / fb) continue;
    if (h >= 0.9 * top && h >= pk[i - 1][1] && h > pk[i + 1][1] && (!found.length || t - found.at(-1) > 0.5 / fb)) found.push(t);
  }
  return found.length;
}
/** Maximum of |f| over a fine sample of [a, b]. */
export function maxAbs(f, a, b, n = 20000) {
  let m = 0;
  for (let i = 0; i <= n; i++) m = Math.max(m, Math.abs(f(a + ((b - a) * i) / n)));
  return m;
}
/** Central difference derivative. */
export const ddx = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
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
