// LaTeX working lines for compound-interest problems, generated from the exact arithmetic in money.mjs.
// Keys and final values are typed as literals in questions.mjs and build.mjs; the checks compare those literals with
// money.mjs and with the numbers inside these generated lines.
import { amount, amountRates, ciOf, siOf, factor, pow, decimal, rupees, whole, tm, yearly, depreciated, afterChanges, mul, dec, sub, add, div } from './money.mjs';

const r = String.raw;
/** "(1 + r/100)" as LaTeX for the per-period rate x (a number in per cent). */
const fac = (x) => r`\left(1 + \dfrac{${x}}{100}\right)`;

/** A = P (1 + r/100)^n = P x factor^n = value; with m = 2 the rate is halved and the periods doubled (shown as per-period rate and count). */
export function Aline(P, rate, n, m = 1) {
  const x = rate / m, k = n * m;
  const A = rupees(amount(P, rate, n, m));
  return r`A = ${tm(P)} \times ${fac(x)}^{${k}} = ${tm(P)} \times ${decimal(pow(factor(rate, m), k))} = ${tm(A)}`;
}
/** CI = A - P = value. */
export function CIline(P, rate, n, m = 1) {
  const A = rupees(amount(P, rate, n, m));
  return r`\text{CI} = A - P = ${tm(A)} - ${tm(P)} = ${tm(rupees(ciOf(P, rate, n, m)))}`;
}
/** Successive rates: A = P (1 + r1/100)(1 + r2/100)... = value. */
export function Rline(P, rates) {
  const A = rupees(amountRates(P, rates));
  const prod = rates.reduce((a, x) => mul(a, factor(x)), dec(1));
  return r`A = ${tm(P)} \times ${rates.map(fac).join(' \\times ')} = ${tm(P)} \times ${decimal(prod)} = ${tm(A)}`;
}
/** SI = P r t / 100 = value. */
export function SIline(P, rate, t) {
  return r`\text{SI} = \dfrac{${tm(P)} \times ${rate} \times ${t}}{100} = ${tm(rupees(siOf(P, rate, t)))}`;
}
/** Year-by-year table rows as markdown (for model answers): | Year | Principal | Interest | Amount |. */
export function yearTable(P, rates) {
  const rows = yearly(P, rates);
  return ['| Year | Principal at start (₹) | Interest (₹) | Amount at end (₹) |', '|---|---|---|---|', ...rows.map((x) => `| ${x.year} | ${tm(x.opening)} | ${tm(x.interest)} | ${tm(x.closing)} |`)].join('\n');
}
/** Depreciation line: V = V0 (1 - r/100)^n = value. */
export function Dline(V0, rate, n) {
  const V = rupees(depreciated(V0, rate, n));
  return r`V = ${tm(V0)} \times \left(1 - \dfrac{${rate}}{100}\right)^{${n}} = ${tm(V0)} \times ${decimal(pow(sub(1, div(dec(rate), 100)), n))} = ${tm(V)}`;
}
/** Growth line for a count: N = N0 (1 + r/100)^n = value. */
export function Gline(N0, rate, n) {
  const N = whole(amount(N0, rate, n));
  return r`N = ${tm(N0)} \times ${fac(rate)}^{${n}} = ${tm(N0)} \times ${decimal(pow(factor(rate), n))} = ${tm(N)}`;
}
export { tm };
export const J = (lines) => lines.join('\n\n');
