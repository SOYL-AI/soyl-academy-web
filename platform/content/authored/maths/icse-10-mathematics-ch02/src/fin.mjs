// Exact recurring-deposit arithmetic for icse-10-mathematics-ch02 (independent of the authored text).
// Money is held in integer paise and the rate in hundredths of a per cent, so every interest figure is
// computed exactly with BigInt; a figure that is not a whole number of paise is reported as inexact
// (and the authoring check fails unless the item rounds it on purpose).
//
// ICSE formula: I = P x n(n + 1)/(2 x 12) x r/100,  MV = P x n + I.
// Cross-check: I is also (sum of the monthly balances P, 2P, ..., nP) x 1/12 x r/100, and that sum equals the
// sum of "instalment x months it earns" (P x n + P x (n - 1) + ... + P x 1). Both sums are formed term by term.

const paise = (rupees) => {
  const p = Math.round(rupees * 100);
  if (Math.abs(p - rupees * 100) > 1e-6) throw new Error(`fin: ${rupees} is not a whole number of paise`);
  return BigInt(p);
};
const hund = (rate) => {
  const h = Math.round(rate * 100);
  if (Math.abs(h - rate * 100) > 1e-6) throw new Error(`fin: rate ${rate} has more than two decimals`);
  return BigInt(h);
};
const toRupees = (p) => Number(p) / 100;

/** Monthly balances P, 2P, …, nP and the months each instalment earns (n, n − 1, …, 1). */
export function schedule(P, n) {
  return Array.from({ length: n }, (_, i) => ({ month: i + 1, balance: P * (i + 1), earns: n - i }));
}

/** Sum of monthly balances, formed term by term, asserted against P n(n+1)/2 and Σ instalment × months. */
export function qualifyingSum(P, n) {
  const pp = paise(P);
  let byBalances = 0n;
  let byInstalments = 0n;
  for (let k = 1; k <= n; k++) {
    byBalances += pp * BigInt(k);
    byInstalments += pp * BigInt(n - k + 1);
  }
  const byFormula = (pp * BigInt(n) * BigInt(n + 1)) / 2n;
  if (byBalances !== byFormula || byInstalments !== byFormula || (pp * BigInt(n) * BigInt(n + 1)) % 2n !== 0n) throw new Error(`fin: qualifying sum mismatch for P=${P}, n=${n}`);
  return toRupees(byFormula);
}

/** Interest as an exact rational: returns { I, exact } with I rounded to paise when inexact. */
export function interestExact(P, n, r) {
  const num = paise(P) * BigInt(n) * BigInt(n + 1) * hund(r); // paise × hundredths
  const den = 2n * 12n * 100n * 100n; // 2 × 12, × 100 for r %, × 100 for hundredths
  const exact = num % den === 0n;
  // round half up to the nearest paisa
  const q = (num * 2n + den) / (2n * den);
  // cross-check by the qualifying sum: S × r / 1200
  const S = paise(qualifyingSum(P, n));
  const num2 = S * hund(r);
  const den2 = 1200n * 100n;
  if (num2 * den !== num * den2) throw new Error(`fin: interest cross-check failed for P=${P}, n=${n}, r=${r}`);
  return { I: toRupees(exact ? num / den : q), exact };
}

/** Full RD: deposit, qualifying sum, interest (must be exact unless allowRound), maturity value. */
export function rd(P, n, r, { allowRound = false } = {}) {
  if (!Number.isInteger(n) || n < 1) throw new Error(`fin: months ${n}`);
  const { I, exact } = interestExact(P, n, r);
  if (!exact && !allowRound) throw new Error(`fin: interest for P=${P}, n=${n}, r=${r} is not a whole number of paise`);
  const deposit = toRupees(paise(P) * BigInt(n));
  const MV = toRupees(paise(deposit) + paise(I));
  return { P, n, r, S: qualifyingSum(P, n), deposit, I, MV, exact };
}

/** n(n + 1)/2 */
export const tri = (n) => (n * (n + 1)) / 2;

// ---------------------------------------------------------------- inverse problems (each re-checked forwards)

/** Monthly instalment from the maturity value: MV = P (n + n(n+1) r / 2400). */
export function instalmentFromMV(MV, n, r) {
  // P = 2400 MV / (2400 n + n(n+1) r), exact in paise
  const num = paise(MV) * 2400n * 100n; // × 100 for r in hundredths
  const den = 2400n * 100n * BigInt(n) + BigInt(n) * BigInt(n + 1) * hund(r);
  if (num % den !== 0n) return { P: Number(num) / Number(den) / 100, exact: false };
  const P = toRupees(num / den);
  if (rd(P, n, r).MV !== MV) throw new Error('fin: instalmentFromMV forward check');
  return { P, exact: true };
}
/** Monthly instalment from the interest: I = P n(n+1) r / 2400. */
export function instalmentFromI(I, n, r) {
  const num = paise(I) * 2400n * 100n;
  const den = BigInt(n) * BigInt(n + 1) * hund(r);
  if (num % den !== 0n) return { P: Number(num) / Number(den) / 100, exact: false };
  const P = toRupees(num / den);
  if (rd(P, n, r).I !== I) throw new Error('fin: instalmentFromI forward check');
  return { P, exact: true };
}
/** Rate % p.a. from the interest: r = 2400 I / (P n(n+1)). Returns a number (may be non-terminating → exact false). */
export function rateFromI(P, n, I) {
  const num = paise(I) * 2400n * 100n; // in hundredths of a per cent
  const den = paise(P) * BigInt(n) * BigInt(n + 1);
  if (num % den !== 0n) return { r: Number(num) / Number(den) / 100, exact: false };
  const r = Number(num / den) / 100;
  if (rd(P, n, r).I !== I) throw new Error('fin: rateFromI forward check');
  return { r, exact: true };
}
export const rateFromMV = (P, n, MV) => rateFromI(P, n, toRupees(paise(MV) - paise(P) * BigInt(n)));

/**
 * Number of months from the maturity value: r n² + (2400 + r) n − 2400 MV / P = 0, i.e. after dividing by the
 * common factor, a n² + b n + c = 0. Returns the reduced integer coefficients, both roots, and the valid n
 * (asserting exactly one positive integer root and a perfect-square discriminant).
 */
export function monthsFromMV(P, r, MV) {
  // multiply through by 100 so r is in hundredths: rh n² + (240000 + rh) n − 240000 MV / P = 0
  const rh = hund(r);
  const cNum = paise(MV) * 240000n;
  const pp = paise(P);
  if (cNum % pp !== 0n) throw new Error('fin: monthsFromMV constant not an integer');
  return solveMonths(rh, 240000n + rh, -(cNum / pp), (n) => rd(P, n, r).MV === MV);
}
/** Number of months from the interest: n(n + 1) = 2400 I / (P r). */
export function monthsFromI(P, r, I) {
  const num = paise(I) * 2400n * 100n;
  const den = paise(P) * hund(r);
  if (num % den !== 0n) throw new Error('fin: monthsFromI: n(n+1) not an integer');
  return solveMonths(1n, 1n, -(num / den), (n) => rd(P, n, r).I === I);
}
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const isqrt = (v) => { if (v < 0n) return -1n; let x = BigInt(Math.floor(Math.sqrt(Number(v)))); while (x * x > v) x--; while ((x + 1n) * (x + 1n) <= v) x++; return x; };
function solveMonths(a, b, c, forward) {
  const g = bgcd(bgcd(a, b), c);
  [a, b, c] = [a / g, b / g, c / g];
  const D = b * b - 4n * a * c;
  const s = isqrt(D);
  if (s * s !== D) throw new Error(`fin: discriminant ${D} is not a perfect square`);
  const roots = [(-b + s), (-b - s)].map((t) => Number(t) / Number(2n * a)).sort((u, v) => u - v);
  const valid = roots.filter((x) => x > 0 && Number.isInteger(x));
  if (valid.length !== 1 || !(roots[0] < 0)) throw new Error(`fin: roots ${roots} do not give one positive integer`);
  if (!forward(valid[0])) throw new Error('fin: months forward check');
  return { a: Number(a), b: Number(b), c: Number(c), D: Number(D), roots, n: valid[0] };
}

// ---------------------------------------------------------------- formatting
/** Indian digit grouping, e.g. 1234567.5 → "12,34,567.50" (paise kept when present). */
export function inr(x, { tex = false } = {}) {
  const neg = x < 0;
  const p = Math.round(Math.abs(x) * 100);
  const whole = String(Math.floor(p / 100));
  const frac = p % 100 ? `.${String(p % 100).padStart(2, '0')}` : '';
  let head = whole.slice(0, -3);
  const tail = whole.slice(-3);
  const groups = [];
  while (head.length > 2) { groups.unshift(head.slice(-2)); head = head.slice(0, -2); }
  if (head) groups.unshift(head);
  const sep = tex ? '{,}' : ',';
  const body = [...groups, tail].join(sep);
  return `${neg ? '-' : ''}${body}${frac}`;
}
/** Amount for use inside $…$ (no ₹ sign: put ₹ before the opening $). */
export const tx = (x) => inr(x, { tex: true });
