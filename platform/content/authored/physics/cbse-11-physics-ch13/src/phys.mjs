// ch13 Oscillations: constants, number-to-words for TTS-safe narration, closed forms and independent numerical routes
// (a Runge-Kutta integrator for the equations of motion) so that the re-solve checks are real checks.
export const G = 9.8; // m s^-2, stated in every item that uses it
export const PI = Math.PI;

// ---------------------------------------------------------------- numbers in words (narration is read aloud: no digits)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function intWords(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : '');
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` and ${intWords(n % 100)}` : ''}`;
  if (n < 1e6) return `${intWords(Math.floor(n / 1000))} thousand${n % 1000 ? `${n % 1000 < 100 ? ' and ' : ' '}${intWords(n % 1000)}` : ''}`;
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
export const omegaOfT = (T) => (2 * PI) / T;
export const omegaOfF = (f) => 2 * PI * f;
export const springT = (m, k) => 2 * PI * Math.sqrt(m / k);
export const pendT = (L, g = G) => 2 * PI * Math.sqrt(L / g);
export const vAt = (A, om, x) => om * Math.sqrt(A * A - x * x);

// ---------------------------------------------------------------- independent numerical routes
/** Classical fourth-order Runge-Kutta step for y' = f(t, y), y an array. */
function rk4(f, t, y, h) {
  const add = (a, b, s) => a.map((v, i) => v + s * b[i]);
  const k1 = f(t, y);
  const k2 = f(t + h / 2, add(y, k1, h / 2));
  const k3 = f(t + h / 2, add(y, k2, h / 2));
  const k4 = f(t + h, add(y, k3, h));
  return y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}
/** Integrates m x'' = -k x from (x0, v0); returns [x, v] at time t. */
export function springAt(m, k, x0, v0, t, h = 1e-4) {
  let y = [x0, v0];
  let tt = 0;
  const f = (_t, s) => [s[1], -(k / m) * s[0]];
  while (tt + h <= t + 1e-12) {
    y = rk4(f, tt, y, h);
    tt += h;
  }
  if (t - tt > 1e-12) y = rk4(f, tt, y, t - tt);
  return y;
}
/** Period of a body released from rest at x = A on a spring, found as four times the first zero crossing. */
export function springPeriodSim(m, k, A, h = 1e-4) {
  let y = [A, 0];
  let t = 0;
  const f = (_t, s) => [s[1], -(k / m) * s[0]];
  for (;;) {
    const yn = rk4(f, t, y, h);
    if (yn[0] <= 0) {
      const frac = y[0] / (y[0] - yn[0]);
      return 4 * (t + frac * h);
    }
    y = yn;
    t += h;
  }
}
/** Period of a pendulum released from rest at angle th0 (rad) from the full equation theta'' = -(g/L) sin(theta). */
export function pendulumPeriodSim(L, g, th0, h = 1e-4) {
  let y = [th0, 0];
  let t = 0;
  const f = (_t, s) => [s[1], -(g / L) * Math.sin(s[0])];
  for (;;) {
    const yn = rk4(f, t, y, h);
    if (yn[0] <= 0) {
      const frac = y[0] / (y[0] - yn[0]);
      return 4 * (t + frac * h);
    }
    y = yn;
    t += h;
  }
}
/** Mean of a list. */
export const meanOf = (a) => a.reduce((s, x) => s + x, 0) / a.length;
/** Kinetic and potential energy of a spring oscillator (m, k, amplitude A) at displacement x. */
export const energies = (k, A, x) => ({ pe: 0.5 * k * x * x, ke: 0.5 * k * (A * A - x * x), total: 0.5 * k * A * A });
/** x to 3 significant figures (number), and a tolerance of rel x |x| to 2 significant figures. */
export const v3 = (x) => Number(x.toPrecision(3));
export const tl = (x, rel = 0.01) => Number((Math.abs(x) * rel).toPrecision(2));
/** Rounds to 6 decimals to keep float noise out of printed numbers. */
export const R6 = (x) => Math.round(x * 1e6) / 1e6;

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
/** Plain-text scientific notation (unicode superscripts) for marking schemes and table cells; 0.01 <= |x| < 10000 stays plain. */
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
