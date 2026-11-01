// Exact shares-and-dividends arithmetic for icse-10-mathematics-ch03 (independent of the authored text).
// Every quantity is an exact BigInt rational; a money figure must be a whole number of paise, a number of shares
// must be a positive whole number (fractional shares and brokerage are outside the ICSE 2027 syllabus), and every
// derived figure is cross-checked by a second route before it is returned.
//
// ICSE relations: dividend per share = FV x r/100;  income = number of shares x FV x r/100;
// number of shares = investment / MV;  return % = income / investment x 100 = r x FV / MV;
// sale proceeds = number of shares x selling price.

const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
/** Normalised rational { n, d } with d > 0. */
export function rat(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('fin: division by zero');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
/** A JS number with at most four decimals, as an exact rational. */
export function exact(x) {
  if (typeof x === 'object') return x;
  const k = Math.round(x * 10000);
  if (Math.abs(k - x * 10000) > 1e-6) throw new Error(`fin: ${x} has more than four decimals`);
  return rat(BigInt(k), 10000n);
}
export const add = (a, b) => { a = exact(a); b = exact(b); return rat(a.n * b.d + b.n * a.d, a.d * b.d); };
export const sub = (a, b) => { a = exact(a); b = exact(b); return rat(a.n * b.d - b.n * a.d, a.d * b.d); };
export const mul = (a, b) => { a = exact(a); b = exact(b); return rat(a.n * b.n, a.d * b.d); };
export const div = (a, b) => { a = exact(a); b = exact(b); return rat(a.n * b.d, a.d * b.n); };
export const eq = (a, b) => { a = exact(a); b = exact(b); return a.n === b.n && a.d === b.d; };
export const cmp = (a, b) => { const s = sub(a, b).n; return s > 0n ? 1 : s < 0n ? -1 : 0; };
export const num = (a) => Number(exact(a).n) / Number(exact(a).d);
export const isInt = (a) => exact(a).d === 1n;
/** True when the rational has a terminating decimal of at most four places. */
export const terminates = (a) => 10000n % exact(a).d === 0n;
const H = rat(100n);

/** A money value: must be a whole number of paise. */
export function money(a, what = 'amount') {
  a = exact(a);
  if (100n % a.d !== 0n) throw new Error(`fin: ${what} ${a.n}/${a.d} is not a whole number of paise`);
  return num(a);
}
/** A count of shares: must be a positive whole number. */
export function whole(a, what = 'number of shares') {
  a = exact(a);
  if (a.d !== 1n || a.n <= 0n) throw new Error(`fin: ${what} ${a.n}/${a.d} is not a positive whole number`);
  return Number(a.n);
}
/** A percentage that must terminate (four decimals at most); returns a JS number. */
export function pct(a, what = 'percentage') {
  if (!terminates(a)) throw new Error(`fin: ${what} ${exact(a).n}/${exact(a).d} does not terminate`);
  return num(a);
}

// ---------------------------------------------------------------- terms (t01)
/** Market value from the face value and a premium or discount (in rupees or per cent of the face value). */
export function marketValue(FV, { premium, discount, premiumPct, discountPct } = {}) {
  const given = [premium, discount, premiumPct, discountPct].filter((x) => x !== undefined);
  if (given.length > 1) throw new Error('fin: give one of premium, discount, premiumPct, discountPct');
  let m = exact(FV);
  if (premium !== undefined) m = add(FV, premium);
  if (discount !== undefined) m = sub(FV, discount);
  if (premiumPct !== undefined) m = mul(FV, div(add(100, premiumPct), H));
  if (discountPct !== undefined) m = mul(FV, div(sub(100, discountPct), H));
  if (cmp(m, 0) <= 0) throw new Error('fin: market value not positive');
  // cross-check: the quote recovered from the market value is the one given
  const q = quote(FV, money(m, 'market value'));
  if (premium !== undefined && !(q.status === 'premium' && q.amount === num(premium))) throw new Error('fin: premium cross-check');
  if (discount !== undefined && !(q.status === 'discount' && q.amount === num(discount))) throw new Error('fin: discount cross-check');
  if (premiumPct !== undefined && !(q.status === 'premium' && eq(q.pctQ, premiumPct))) throw new Error('fin: premium % cross-check');
  if (discountPct !== undefined && !(q.status === 'discount' && eq(q.pctQ, discountPct))) throw new Error('fin: discount % cross-check');
  return money(m, 'market value');
}
/** Par, premium or discount; the amount per share and the per cent of the face value. */
export function quote(FV, MV) {
  const c = cmp(MV, FV);
  const amountQ = c >= 0 ? sub(MV, FV) : sub(FV, MV);
  const pctQ = mul(div(amountQ, FV), H);
  return { status: c === 0 ? 'par' : c > 0 ? 'premium' : 'discount', amount: money(amountQ), pctQ, pct: num(pctQ) };
}

// ---------------------------------------------------------------- dividend, shares and income (t02)
/** Dividend on one share: FV x r / 100 (always on the face value). */
export const dps = (FV, rate) => money(mul(FV, div(rate, H)), 'dividend per share');
/** Number of shares bought: investment / MV, which must be a positive whole number. */
export function sharesFor(investment, MV) {
  const n = whole(div(investment, MV));
  if (!eq(mul(n, MV), investment)) throw new Error('fin: sharesFor forward check');
  return n;
}
/** Annual income from n shares: n x FV x r / 100, cross-checked as n x (dividend per share). */
export function income(n, FV, rate) {
  whole(n);
  const a = mul(mul(n, FV), div(rate, H));
  const b = mul(n, dps(FV, rate));
  if (!eq(a, b)) throw new Error('fin: income cross-check');
  return money(a, 'income');
}
/** Number of shares needed for a target income (forward-checked). */
export function sharesForIncome(target, FV, rate) {
  const n = whole(div(target, mul(FV, div(rate, H))));
  if (income(n, FV, rate) !== num(target)) throw new Error('fin: sharesForIncome forward check');
  return n;
}

// ---------------------------------------------------------------- return (t03)
/** Rate of return as an exact rational: r x FV / MV x ... (per cent). */
export const returnQ = (FV, rate, MV) => div(mul(rate, FV), MV);
/** Rate of return % (must terminate). */
export const returnPct = (FV, rate, MV) => pct(returnQ(FV, rate, MV), 'return');
/** Market value at which a share gives a stated return (forward-checked). */
export function mvForReturn(FV, rate, ret) {
  const m = money(div(mul(rate, FV), ret), 'market value');
  if (!eq(returnQ(FV, rate, m), ret)) throw new Error('fin: mvForReturn forward check');
  return m;
}
/** Rate of dividend that gives a stated return at a market value (forward-checked). */
export function rateForReturn(FV, MV, ret) {
  const r = pct(div(mul(ret, MV), FV), 'rate of dividend');
  if (!eq(returnQ(FV, r, MV), ret)) throw new Error('fin: rateForReturn forward check');
  return r;
}

/**
 * A purchase. Give the investment or the number of shares. Returns every figure, each found by two routes:
 * shares = investment / MV and investment = shares x MV; income = n x FV x r/100 = n x dividend per share;
 * return = income / investment x 100 = r x FV / MV.
 */
export function invest({ investment, n, FV, MV, rate }) {
  if ((investment === undefined) === (n === undefined)) throw new Error('fin: give investment or n');
  const shares = n !== undefined ? whole(n) : sharesFor(investment, MV);
  const inv = money(mul(shares, MV), 'investment');
  if (investment !== undefined && inv !== num(investment)) throw new Error('fin: investment cross-check');
  const inc = income(shares, FV, rate);
  const retQ = mul(div(inc, inv), H);
  if (!eq(retQ, returnQ(FV, rate, MV))) throw new Error('fin: return cross-check');
  return { n: shares, investment: inv, FV: num(FV), MV: num(MV), rate: num(rate), dps: dps(FV, rate), income: inc, retQ, ret: terminates(retQ) ? num(retQ) : null, quote: quote(FV, MV) };
}

// ---------------------------------------------------------------- selling and reinvesting (t04)
/** Sale proceeds: n x selling price. */
export const proceeds = (n, price) => money(mul(whole(n), price), 'sale proceeds');
/**
 * Sell n shares (face value FV1, dividend rate1) at sellAt and reinvest all the proceeds in shares (FV2, MV2, rate2).
 * boughtAt (optional) gives the gain or loss on the sale. The new number of shares must be whole.
 */
export function sellReinvest({ n, FV1, rate1, sellAt, FV2, MV2, rate2, boughtAt }) {
  const before = income(n, FV1, rate1);
  const p = proceeds(n, sellAt);
  const after = invest({ investment: p, FV: FV2, MV: MV2, rate: rate2 });
  const change = money(sub(after.income, before), 'change in income');
  // cross-check the change via returns: new income = proceeds x return2 / 100
  if (!eq(mul(p, div(returnQ(FV2, rate2, MV2), H)), after.income)) throw new Error('fin: reinvest cross-check');
  const gain = boughtAt === undefined ? null : money(mul(n, sub(sellAt, boughtAt)), 'gain');
  if (gain !== null && money(sub(p, mul(n, boughtAt))) !== gain) throw new Error('fin: gain cross-check');
  return { before, proceeds: p, n2: after.n, after: after.income, change, gain, cost: boughtAt === undefined ? null : money(mul(n, boughtAt)), buy: after };
}

/**
 * Split a total investment between share A and share B so that the total income is a target:
 * x ret_A/100 + (total - x) ret_B/100 = target. Both parts must buy whole numbers of shares.
 */
export function split(total, A, B, target) {
  const rA = div(returnQ(A.FV, A.rate, A.MV), H);
  const rB = div(returnQ(B.FV, B.rate, B.MV), H);
  const x = div(sub(target, mul(total, rB)), sub(rA, rB));
  const xa = money(x, 'part in A');
  const xb = money(sub(total, x), 'part in B');
  const a = invest({ investment: xa, ...A });
  const b = invest({ investment: xb, ...B });
  if (money(add(a.income, b.income)) !== num(target)) throw new Error('fin: split forward check');
  return { xa, xb, a, b };
}

// ---------------------------------------------------------------- formatting
/** Indian digit grouping, e.g. 1234567.5 -> "12,34,567.50" (paise kept when present). */
export function inr(x, { tex = false } = {}) {
  const neg = x < 0;
  const p = Math.round(Math.abs(x) * 100);
  const w = String(Math.floor(p / 100));
  const frac = p % 100 ? `.${String(p % 100).padStart(2, '0')}` : '';
  let head = w.slice(0, -3);
  const tail = w.slice(-3);
  const groups = [];
  while (head.length > 2) { groups.unshift(head.slice(-2)); head = head.slice(0, -2); }
  if (head) groups.unshift(head);
  return `${neg ? '-' : ''}${[...groups, tail].join(tex ? '{,}' : ',')}${frac}`;
}
/** A rational percentage for use inside $...$: a decimal if it terminates, else a mixed number with \tfrac. */
export function pctTex(a) {
  a = exact(a);
  if (terminates(a)) return String(num(a));
  const w = a.n / a.d;
  const rem = a.n - w * a.d;
  return `${w}\\tfrac{${rem}}{${a.d}}`;
}
