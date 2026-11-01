// GST arithmetic for ICSE 10 Mathematics ch01, in exact integer paise (no floating rupees anywhere).
// Every money value is an integer number of paise; every rate is a percentage with at most two
// decimals (stored as hundredths of a percent). Any percentage that does not come out to a whole
// number of paise throws, so no hidden rounding can creep into a worked answer. Each helper is also
// cross-checked against an independent floating-point formula.

/** Rupees (number with at most 2 decimals) → integer paise. */
export function rs(rupees) {
  const p = Math.round(rupees * 100);
  if (Math.abs(p - rupees * 100) > 1e-6) throw new Error(`rs(${rupees}): more than 2 decimals`);
  return p;
}
/** Paise → rupees as a number (for the re-solve checker, which compares numbers in text). */
export const rup = (p) => p / 100;
const hund = (rate) => {
  const h = Math.round(rate * 100);
  if (Math.abs(h - rate * 100) > 1e-9) throw new Error(`rate ${rate}% has more than 2 decimals`);
  return h;
};
/** rate % of p paise, exact. */
export function pctOf(p, rate) {
  if (!Number.isInteger(p)) throw new Error(`pctOf: ${p} is not whole paise`);
  const num = p * hund(rate);
  if (num % 10000 !== 0) throw new Error(`${rate}% of ${p} paise is not a whole number of paise`);
  const v = num / 10000;
  if (Math.abs(v - (p * rate) / 100) > 1e-6) throw new Error('pctOf cross-check');
  return v;
}
/** Half of a tax amount (CGST = SGST), exact. */
export function half(p) {
  if (p % 2 !== 0) throw new Error(`half of ${p} paise is not whole`);
  return p / 2;
}

// ---------------------------------------------------------------- formatting
function groupIN(intStr) {
  if (intStr.length <= 3) return intStr;
  const last = intStr.slice(-3);
  let rest = intStr.slice(0, -3);
  const parts = [];
  while (rest.length > 2) { parts.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest) parts.unshift(rest);
  return [...parts, last].join(',');
}
function split(p) {
  const neg = p < 0;
  const a = Math.abs(p);
  const i = Math.floor(a / 100), f = a % 100;
  return { neg, i: String(i), f: f ? `.${String(f).padStart(2, '0')}` : '' };
}
/** Indian-grouped rupees for text: 124500 → "1,245", 425050 → "4,250.50". */
export function inr(p) {
  const { neg, i, f } = split(p);
  return `${neg ? '−' : ''}${groupIN(i)}${f}`;
}
/** Plain rupees for KaTeX arithmetic (checked by the lint): 425050 → "4250.50", 76800 → "768". */
export function nm(p) {
  const { neg, i, f } = split(p);
  return `${neg ? '-' : ''}${i}${f}`;
}
/** String.raw that still turns "\n" (not followed by a lowercase letter, so \ne and \neq survive) into a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
/** "₹4,250.50" for text. */
export const R = (p) => `₹${inr(p)}`;
/** Indian-grouped rupees for KaTeX: "4{,}250.50". */
export function tm(p) {
  const { neg, i, f } = split(p);
  return `${neg ? '-' : ''}${groupIN(i).replace(/,/g, '{,}')}${f}`;
}
/** A rate for KaTeX: 18 → "18\%", 2.5 → "2.5\%". */
export const pc = (rate) => `${rate}\\%`;

// ---------------------------------------------------------------- sales
/**
 * One taxable sale at price p (paise, before tax) and GST rate `rate` %.
 * Intra-state: CGST = SGST = half the GST. Inter-state: IGST = the whole GST.
 */
export function sale(p, rate, { inter = false } = {}) {
  const gst = pctOf(p, rate);
  const cgst = inter ? 0 : half(gst);
  const sgst = inter ? 0 : half(gst);
  const igst = inter ? gst : 0;
  if (cgst + sgst + igst !== gst) throw new Error('sale: split does not add up');
  if (!inter && pctOf(p, rate / 2) !== cgst) throw new Error('sale: CGST is not half the rate on the price');
  return { price: p, rate, gst, cgst, sgst, igst, amount: p + gst, inter };
}
/** Price after a discount of d % on p, exact. */
export function disc(p, d) {
  const off = pctOf(p, d);
  return { list: p, d, off, sp: p - off };
}
/** List price p, discount d %, then GST at rate on the reduced price. */
export function bill(list, d, rate, opts = {}) {
  const dd = disc(list, d);
  const s = sale(dd.sp, rate, opts);
  return { ...dd, ...s, list };
}
/** Several lines of one invoice: [[price, rate], ...] (intra-state unless inter). */
export function invoice(lines, opts = {}) {
  const rows = lines.map(([p, rate]) => sale(p, rate, opts));
  const sum = (k) => rows.reduce((s, x) => s + x[k], 0);
  const t = { rows, price: sum('price'), gst: sum('gst'), cgst: sum('cgst'), sgst: sum('sgst'), igst: sum('igst'), amount: sum('amount') };
  if (t.price + t.gst !== t.amount) throw new Error('invoice total');
  return t;
}

// ---------------------------------------------------------------- the supply chain and input tax credit
/**
 * A chain of sales of one article at one rate. `prices[k]` is the price (before tax) at which stage k
 * sells; `inter[k]` marks an inter-state sale. Stage k's input tax is stage k-1's output tax.
 * Net GST payable by stage k = output tax - input tax. The build asserts that the payables add up to
 * the tax on the final sale (the tax the consumer bears) and, for intra-state links bought and sold
 * within the state, that CGST payable = SGST payable.
 */
export function chain(prices, rate, inter = []) {
  const stages = [];
  let prevOut = null;
  prices.forEach((p, k) => {
    const out = sale(p, rate, { inter: !!inter[k] });
    const input = prevOut ?? { gst: 0, cgst: 0, sgst: 0, igst: 0 };
    const pay = out.gst - input.gst;
    const st = { k, price: p, out, input, pay };
    if (!out.inter && !input.igst) {
      // intra-state output against intra-state input: CGST and SGST are settled separately
      st.cgstPay = out.cgst - input.cgst;
      st.sgstPay = out.sgst - input.sgst;
      if (st.cgstPay !== st.sgstPay || st.cgstPay + st.sgstPay !== pay) throw new Error('chain: CGST payable must equal SGST payable');
    }
    if (out.inter) {
      // inter-state output: IGST payable after setting off all input tax (CGST + SGST or IGST)
      st.igstPay = out.igst - input.gst;
    }
    stages.push(st);
    prevOut = out;
  });
  const total = stages.reduce((s, x) => s + x.pay, 0);
  const last = stages[stages.length - 1].out;
  if (total !== last.gst) throw new Error('chain: total tax to the government must equal the tax on the final sale');
  return { stages, total, consumerTax: last.gst, consumerPays: last.amount };
}

// ---------------------------------------------------------------- reverse problems
/** Price before GST from an amount that includes GST at rate %, exact. */
export function baseFrom(amount, rate) {
  const num = amount * 10000;
  const den = 10000 + hund(rate);
  if (num % den !== 0) throw new Error(`baseFrom(${amount}, ${rate}) not exact`);
  const b = num / den;
  if (b + pctOf(b, rate) !== amount) throw new Error('baseFrom check');
  return b;
}
/** Price on which a tax of t paise at rate % was charged, exact. */
export function priceFromTax(t, rate) {
  const num = t * 10000;
  if (num % hund(rate) !== 0) throw new Error(`priceFromTax(${t}, ${rate}) not exact`);
  const p = num / hund(rate);
  if (pctOf(p, rate) !== t) throw new Error('priceFromTax check');
  return p;
}
/** GST rate % when a price p becomes amount a after tax (exact to 2 decimals). */
export function rateFrom(p, a) {
  const h = ((a - p) * 10000) / p;
  if (!Number.isInteger(h)) throw new Error(`rateFrom(${p}, ${a}) not exact`);
  const rate = h / 100;
  if (p + pctOf(p, rate) !== a) throw new Error('rateFrom check');
  return rate;
}
/** Discount % that takes a list price l to a selling price s. */
export function discFrom(l, s) {
  const h = ((l - s) * 10000) / l;
  if (!Number.isInteger(h)) throw new Error(`discFrom(${l}, ${s}) not exact`);
  const d = h / 100;
  if (disc(l, d).sp !== s) throw new Error('discFrom check');
  return d;
}
/** List price from a selling price s after a discount of d %. */
export function listFrom(s, d) {
  const num = s * 10000;
  const den = 10000 - hund(d);
  if (num % den !== 0) throw new Error(`listFrom(${s}, ${d}) not exact`);
  const l = num / den;
  if (disc(l, d).sp !== s) throw new Error('listFrom check');
  return l;
}
/** Profit (or loss, negative) percent on cost c when selling at s, exact to 2 decimals. */
export function profitPct(c, s) {
  const h = ((s - c) * 10000) / c;
  if (!Number.isInteger(h)) throw new Error(`profitPct(${c}, ${s}) not exact`);
  return h / 100;
}
/** Selling price after a profit of g % on cost c (negative g for a loss). */
export const withProfit = (c, g) => c + (g >= 0 ? pctOf(c, g) : -pctOf(c, -g));

// ---------------------------------------------------------------- self-test
{
  const must = (c, m) => { if (!c) throw new Error(`fin self-test: ${m}`); };
  must(inr(12450000) === '1,24,500' && inr(425050) === '4,250.50' && inr(76800) === '768' && tm(1245000) === '12{,}450', 'grouping');
  const s = sale(rs(6400), 12);
  must(s.gst === rs(768) && s.cgst === rs(384) && s.amount === rs(7168), 'sale');
  const c = chain([rs(3000), rs(3600), rs(4200)], 18);
  must(c.stages.map((x) => x.pay).join() === [54000, 10800, 10800].join() && c.total === rs(756), 'chain');
  must(baseFrom(rs(11092), 18) === rs(9400) && rateFrom(rs(2300), rs(2576)) === 12 && listFrom(rs(4200), 16) === rs(5000), 'reverse');
  let threw = false;
  try { pctOf(rs(10.01), 18); } catch { threw = true; }
  must(threw, 'inexact percent must throw');
}
