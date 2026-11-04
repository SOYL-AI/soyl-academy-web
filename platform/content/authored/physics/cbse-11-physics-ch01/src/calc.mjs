// ch01 Units and Measurements — calculation helpers shared by the diagrams, decks and questions:
// significant-figure counting and rounding (the rationalised NCERT rules), a small dimension algebra
// with an exponent solver, error propagation, and the data sets used on slides and in items.
import { sci, dec } from './lib.mjs';

// ---------------------------------------------------------------- significant figures
/** Counts significant figures in a written number ("0.00620", "5.0040", "1.20e-3", "2000"). Trailing zeros without a decimal point do not count (NCERT convention). */
export function sfCount(str) {
  const [m] = String(str).toLowerCase().split('e');
  const body = m.replace(/^[+-]/, '');
  const hasPoint = body.includes('.');
  let digits = body.replace('.', '').replace(/^0+/, '');
  if (!hasPoint) digits = digits.replace(/0+$/, '');
  return digits.length;
}
function decompose(x) {
  const [m, e] = Math.abs(x).toExponential(14).split('e');
  return { digits: m.replace('.', '').replace(/0+$/, '') || '0', exp: Number(e) };
}
/** Rounds x to n significant figures: above 5 round up, below 5 keep, exactly 5 (nothing after it) round to the even preceding digit; 5 followed by more non-zero digits rounds up. */
export function roundSf(x, n) {
  if (x === 0) return 0;
  const { digits, exp } = decompose(x);
  if (digits.length <= n) return Math.sign(x) * Number(`${digits[0]}.${digits.slice(1) || '0'}e${exp}`);
  const d = digits[n];
  const rest = digits.slice(n + 1);
  const prevOdd = Number(digits[n - 1]) % 2 === 1;
  const up = d > '5' || (d === '5' && (/[1-9]/.test(rest) || prevOdd));
  let kept = digits.slice(0, n);
  let e = exp;
  if (up) {
    kept = (BigInt(kept) + 1n).toString();
    if (kept.length > n) {
      kept = kept.slice(0, n);
      e += 1;
    }
  }
  return Math.sign(x) * Number(`${kept[0]}.${kept.slice(1) || '0'}e${e}`);
}
/** LaTeX text of x rounded to n significant figures (plain for 0.01 ≤ |x| < 10 000, else m × 10^k). */
export const sf = (x, n) => sci(roundSf(x, n), n);
/** Plain decimal string of x rounded to n significant figures (only for values that print without an exponent). */
export const sfPlain = (x, n) => dec(roundSf(x, n), n);
/** Decimal places of a written number. */
export const places = (str) => (String(str).split('.')[1] ?? '').length;

// ---------------------------------------------------------------- dimensions [M L T A K]
export const AX = ['M', 'L', 'T', 'A', 'K'];
export const D = (M = 0, L = 0, T = 0, A = 0, K = 0) => [M, L, T, A, K];
export const dmul = (...ds) => ds.reduce((a, b) => a.map((v, i) => v + b[i]), D());
export const ddiv = (a, b) => a.map((v, i) => v - b[i]);
export const dpow = (a, p) => a.map((v) => v * p);
export const deq = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);
const expTex = (v) => {
  if (Number.isInteger(v)) return v === 1 ? '' : `^{${v}}`;
  const twice = Math.round(v * 2);
  return `^{${twice < 0 ? '-' : ''}\\frac{${Math.abs(twice)}}{2}}`;
};
/** LaTeX of a dimensional formula in the style [M L^2 T^-2] (only the non-zero exponents; the dimensionless formula is [M^0 L^0 T^0]). */
export function dimTex(d) {
  const parts = AX.map((a, i) => (d[i] ? `\\mathrm{${a}}${expTex(d[i])}` : '')).filter(Boolean);
  return `[${parts.length ? parts.join('\\,') : '\\mathrm{M}^{0}\\mathrm{L}^{0}\\mathrm{T}^{0}'}]`;
}
export const M = D(1);
export const L = D(0, 1);
export const T = D(0, 0, 1);
export const A = D(0, 0, 0, 1);
export const Kel = D(0, 0, 0, 0, 1);
export const Q = {
  area: dpow(L, 2),
  volume: dpow(L, 3),
  velocity: ddiv(L, T),
  accel: ddiv(L, dpow(T, 2)),
  force: dmul(M, ddiv(L, dpow(T, 2))),
  momentum: dmul(M, ddiv(L, T)),
  energy: dmul(M, dpow(L, 2), dpow(T, -2)),
  power: dmul(M, dpow(L, 2), dpow(T, -3)),
  pressure: dmul(M, dpow(L, -1), dpow(T, -2)),
  density: dmul(M, dpow(L, -3)),
  frequency: dpow(T, -1),
  surfTension: dmul(M, dpow(T, -2)),
  viscosity: dmul(M, dpow(L, -1), dpow(T, -1)),
  G: dmul(dpow(M, -1), dpow(L, 3), dpow(T, -2)),
  planck: dmul(M, dpow(L, 2), dpow(T, -1)),
  charge: dmul(A, T),
  specHeat: dmul(dpow(L, 2), dpow(T, -2), dpow(Kel, -1)),
  boltz: dmul(M, dpow(L, 2), dpow(T, -2), dpow(Kel, -1)),
  springK: dmul(M, dpow(T, -2)),
  linDensity: dmul(M, dpow(L, -1)),
  angVel: dpow(T, -1),
  angMom: dmul(M, dpow(L, 2), dpow(T, -1)),
  none: D(),
};
/** All exponent tuples (halves, −3…3) with product of factors^exp = target. */
export function solveExponents(target, factors) {
  const steps = [];
  for (let v = -6; v <= 6; v++) steps.push(v / 2);
  const out = [];
  const rec = (i, acc, cur) => {
    if (i === factors.length) {
      if (deq(cur, target)) out.push([...acc]);
      return;
    }
    for (const p of steps) rec(i + 1, [...acc, p], cur.map((v, k) => v + p * factors[i][k]));
  };
  rec(0, [], D());
  return out;
}
/** The unique exponent tuple, or throws. */
export function derive(target, factors) {
  const sols = solveExponents(target, factors);
  if (sols.length !== 1) throw new Error(`derive: ${sols.length} solutions`);
  return sols[0];
}

// ---------------------------------------------------------------- errors
export const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
export const meanAbsErr = (xs) => {
  const m = mean(xs);
  return mean(xs.map((x) => Math.abs(m - x)));
};

// ---------------------------------------------------------------- shared data
export const C_LIGHT = 2.998e8; // m s^-1 (used for the light-year example)
export const YEAR = 3.156e7; // s (365.25 days)
export const AU = 1.496e11; // m
export const PARSEC = 3.08e16; // m
export const LY = C_LIGHT * YEAR; // m
/** Five stopwatch readings of a marble rolling down a ramp (s). */
export const RAMP = [2.46, 2.52, 2.49, 2.55, 2.48];
/** Reading of a rod against a millimetre scale (cm). */
export const ROD = 4.63;

// ---------------------------------------------------------------- plain-text formatting (for marking schemes, diagram labels)
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
/** Unicode superscript of an integer: sup(-3) = ⁻³. */
export const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');
/** Plain text of x to n significant figures: 12.3 or 4.01 × 10⁻³ (plain for 0.01 ≤ |x| < 10 000). */
export function pt(x, n = 3) {
  if (x === 0) return '0';
  const v = roundSf(x, n);
  const e = Math.floor(Math.log10(Math.abs(v)));
  if (e >= -2 && e <= 3) return dec(v, n);
  const m = Number((v / 10 ** e).toPrecision(n));
  return `${m.toFixed(n - 1)} × 10${sup(e)}`;
}
/** Plain text of a dimensional formula: M L² T⁻² (dimensionless: 1). */
export function dimTxt(d) {
  const parts = AX.map((a, i) => (d[i] ? a + (d[i] === 1 ? '' : sup(d[i])) : '')).filter(Boolean);
  return parts.length ? parts.join(' ') : '1';
}

/** Answer value of a numerical to n significant figures with a relative tolerance (default 1 %). */
export const NV = (x, n, rel = 0.01) => {
  const value = roundSf(x, n);
  return { value, tol: Math.abs(value) * rel };
};
/** x rounded to `dp` decimal places (round half to even on the decimal string is not needed here: ties are avoided in the data). */
export const roundDp = (x, dp) => Number(x.toFixed(dp));
