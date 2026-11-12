// Exact compound-interest arithmetic for icse-9-mathematics-ch02 (independent of the authored text).
// Every amount is an exact rational number of rupees (BigInt numerator and denominator); rates are exact decimals
// (7.5 is 15/2). Nothing is rounded: a figure that is not a whole number of paise (or, for populations and counts,
// not a whole number) is reported, and the authoring check fails unless the item states and asserts a rounding rule.
//
//   A = P (1 + r/100)^n          CI = A - P          compounded m times a year: rate r/m, periods n m
//   SI = P r t / 100             depreciation: V = V0 (1 - r/100)^n

const babs = (a) => (a < 0n ? -a : a);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
/** Exact rational {n, d} with d > 0, in lowest terms. */
export function F(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('money: zero denominator');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
/** An exact rational from a decimal number or string such as 7.5, '12.25', 8000. */
export function dec(x) {
  const s = typeof x === 'string' ? x : String(x);
  if (!/^-?\d+(\.\d+)?$/.test(s)) throw new Error(`money: ${s} is not a plain decimal`);
  const [i, f = ''] = s.split('.');
  return F(BigInt(i + f), 10n ** BigInt(f.length));
}
const asF = (x) => (typeof x === 'object' ? x : dec(x));
export const add = (a, b) => { a = asF(a); b = asF(b); return F(a.n * b.d + b.n * a.d, a.d * b.d); };
export const sub = (a, b) => { a = asF(a); b = asF(b); return F(a.n * b.d - b.n * a.d, a.d * b.d); };
export const mul = (a, b) => { a = asF(a); b = asF(b); return F(a.n * b.n, a.d * b.d); };
export const div = (a, b) => { a = asF(a); b = asF(b); return F(a.n * b.d, a.d * b.n); };
export const pow = (a, k) => { a = asF(a); let out = F(1n); for (let i = 0; i < k; i++) out = mul(out, a); return out; };
export const eq = (a, b) => { a = asF(a); b = asF(b); return a.n === b.n && a.d === b.d; };
export const isInt = (a) => asF(a).d === 1n;
export const isPaise = (a) => mul(a, 100).d === 1n;

/** A rupee figure as a JS number; throws unless it is a whole number of paise. */
export function rupees(a) {
  a = asF(a);
  const p = mul(a, 100);
  if (p.d !== 1n) throw new Error(`money: ${a.n}/${a.d} is not a whole number of paise`);
  return Number(p.n) / 100;
}
/** A count (population, bacteria, machines) as a JS number; throws unless whole. */
export function whole(a) {
  a = asF(a);
  if (a.d !== 1n) throw new Error(`money: ${a.n}/${a.d} is not a whole number`);
  return Number(a.n);
}
/** Exact decimal string of a rational that terminates (for factors such as 1.157625); throws otherwise. */
export function decimal(a) {
  a = asF(a);
  let t = a.d, twos = 0, fives = 0;
  while (t % 2n === 0n) { t /= 2n; twos++; }
  while (t % 5n === 0n) { t /= 5n; fives++; }
  if (t !== 1n) throw new Error('money: not a terminating decimal');
  const places = Math.max(twos, fives);
  const scaled = (a.n * 10n ** BigInt(places)) / a.d;
  const neg = scaled < 0n;
  const s = String(babs(scaled)).padStart(places + 1, '0');
  const out = places ? `${s.slice(0, -places)}.${s.slice(-places)}`.replace(/0+$/, '').replace(/\.$/, '') : s;
  return (neg ? '-' : '') + out;
}

// ---------------------------------------------------------------- compound and simple interest
/** Growth factor per compounding period: 1 + r/(100 m). */
export const factor = (r, m = 1) => add(1, div(dec(r), 100 * m));
/** Amount A = P (1 + r/(100 m))^(n m); n in years (n m must be a whole number of periods). */
export function amount(P, r, n, m = 1) {
  const k = n * m;
  if (!Number.isInteger(k)) throw new Error(`money: ${n} years at m = ${m} is not a whole number of periods`);
  return mul(dec(P), pow(factor(r, m), k));
}
export const ciOf = (P, r, n, m = 1) => sub(amount(P, r, n, m), dec(P));
export const siOf = (P, r, t) => div(mul(mul(dec(P), dec(r)), dec(t)), 100);
/** Successive rates (one per year) r1, r2, ...: A = P (1 + r1/100)(1 + r2/100)... */
export function amountRates(P, rates) {
  let a = dec(P);
  for (const x of rates) a = mul(a, factor(x));
  return a;
}
/** Year-by-year rows { year, opening, interest, closing } (numbers in rupees, each asserted a whole number of paise). */
export function yearly(P, rates, m = 1) {
  const rows = [];
  let open = dec(P);
  rates.forEach((x, i) => {
    const close = mul(open, factor(x, m));
    rows.push({ year: i + 1, opening: rupees(open), interest: rupees(sub(close, open)), closing: rupees(close) });
    open = close;
  });
  return rows;
}
/** Principal that grows to A: P = A / (1 + r/(100 m))^(n m). */
export const principalOf = (A, r, n, m = 1) => div(dec(A), pow(factor(r, m), n * m));
/** Rate (per cent per annum, in steps of 0.25) for which P grows to A in n years; exactly one candidate must fit. */
export function rateOf(P, A, n, m = 1, { lo = 0.25, hi = 60, step = 0.25 } = {}) {
  const hits = [];
  for (let x = lo; x <= hi + 1e-9; x += step) {
    const rr = Math.round(x * 100) / 100;
    if (eq(amount(P, rr, n, m), dec(A))) hits.push(rr);
  }
  if (hits.length !== 1) throw new Error(`money: rate search found ${hits.length} candidates for P=${P}, A=${A}, n=${n}`);
  return hits[0];
}
/** Time (whole periods; years = k/m) for which P grows to A; exactly one must fit. */
export function timeOf(P, A, r, m = 1, maxYears = 12) {
  const hits = [];
  for (let k = 1; k <= maxYears * m; k++) {
    if (eq(amount(P, r, k / m, m), dec(A))) hits.push(k / m);
  }
  if (hits.length !== 1) throw new Error(`money: time search found ${hits.length} candidates for P=${P}, A=${A}, r=${r}`);
  return hits[0];
}
/** CI - SI for the same P, r, n (years); also asserts the closed forms for n = 2 and n = 3. */
export function diffCISI(P, r, n) {
  const d = sub(ciOf(P, r, n), siOf(P, r, n));
  const R = div(dec(r), 100);
  if (n === 2 && !eq(d, mul(dec(P), mul(R, R)))) throw new Error('money: 2-year difference formula mismatch');
  if (n === 3 && !eq(d, mul(mul(dec(P), mul(R, R)), add(3, R)))) throw new Error('money: 3-year difference formula mismatch');
  return d;
}
/** Depreciated value V = V0 (1 - r/100)^n (a constant rate). */
export const depreciated = (V0, r, n) => mul(dec(V0), pow(sub(1, div(dec(r), 100)), n));
/** Value after successive yearly changes in per cent (positive grows, negative falls). */
export function afterChanges(V0, changes) {
  let v = dec(V0);
  for (const c of changes) v = mul(v, add(1, div(dec(c), 100)));
  return v;
}

// ---------------------------------------------------------------- display
const group = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/** 12345.5 -> "12,345.50"; 12345 -> "12,345" (two decimals only when there are paise). */
export function inr(x) {
  const p = Math.round(Math.abs(x) * 100);
  if (Math.abs(Math.abs(x) * 100 - p) > 1e-6) throw new Error(`money: ${x} is not a whole number of paise`);
  const w = Math.trunc(p / 100), q = p % 100;
  return `${x < 0 ? '-' : ''}${group(String(w))}${q ? `.${String(q).padStart(2, '0')}` : ''}`;
}
/** A rupee amount in prose: ₹12,345.50 */
export const rs = (x) => `₹${inr(x)}`;
/** A number for use inside $...$: plain digits (no grouping), two decimals only when there are paise. */
export function tm(x) {
  const p = Math.round(Math.abs(x) * 100);
  if (Math.abs(Math.abs(x) * 100 - p) > 1e-6) throw new Error(`money: ${x} is not a whole number of paise`);
  const w = Math.trunc(p / 100), q = p % 100;
  return `${x < 0 ? '-' : ''}${w}${q ? `.${String(q).padStart(2, '0')}` : ''}`;
}

/** Rate of depreciation (per cent per annum, steps of 0.25) taking V0 to V in n years; exactly one candidate must fit. */
export function depRateOf(V0, V, n, { lo = 0.25, hi = 60, step = 0.25 } = {}) {
  const hits = [];
  for (let x = lo; x <= hi + 1e-9; x += step) {
    const rr = Math.round(x * 100) / 100;
    if (eq(depreciated(V0, rr, n), dec(V))) hits.push(rr);
  }
  if (hits.length !== 1) throw new Error(`money: depreciation-rate search found ${hits.length} candidates`);
  return hits[0];
}
