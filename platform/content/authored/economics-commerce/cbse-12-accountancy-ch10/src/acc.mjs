// Ratio engine for CBSE 12 Accountancy ch10 (Accounting Ratios).
// One set of definitions (stated in notes section 2) drives every figure in the chapter:
//   quick assets      = current assets − inventories − prepaid expenses
//   debt              = long-term borrowings + long-term provisions (= non-current liabilities)
//   equity            = shareholders' funds (share capital + reserves and surplus)
//   total assets      = non-current assets + current assets
//   capital employed  = shareholders' funds + non-current liabilities, asserted equal to
//                       non-current assets + working capital on every position
//   cost of revenue from operations = opening inventory + purchases + direct expenses − closing inventory
//   operating cost    = cost of revenue from operations + operating expenses
//   profit before interest and tax = operating profit + non-operating income − non-operating expenses
// Rounding rule: every ratio is worked to two decimal places, rounded half up, and written without
// trailing zeros (2.50 -> 2.5); a rounded result is written with "≈" in workings.
// position() and results() compute every total from the givens and throw on any mismatch (balance sheet
// totals, both forms of capital employed, gross profit − operating expenses = operating profit, profit
// chain). effect() compares two ratios as exact fractions, so "increase / decrease / no change" keys are
// computed, never typed. Tables are rendered FROM the computed values (Indian digit grouping).

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; a negative amount -> "(6,000)". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** A whole-rupee percentage of an amount. */
export function pctOf(rate, amount) {
  const v = (amount * rate) / 100;
  check(Number.isInteger(v), `${rate}% of ${amount} is not whole rupees`);
  return v;
}
/** Simple average of an opening and a closing figure; must be whole rupees. */
export function avg(a, b) {
  const v = (a + b) / 2;
  check(Number.isInteger(v), `average of ${a} and ${b} is not whole rupees`);
  return v;
}

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
const three = (n) => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return h ? `${ONES[h]} hundred${r ? ` ${two(r)}` : ''}` : two(r);
};
/** Indian-system words for narration: 146600 -> "one lakh forty-six thousand six hundred". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words(${n})`);
  if (n === 0) return 'zero';
  const parts = [];
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor(n / 1e5) % 100;
  const thou = Math.floor(n / 1e3) % 100;
  const rest = n % 1000;
  if (crore) parts.push(`${words(crore)} crore`);
  if (lakh) parts.push(`${two(lakh)} lakh`);
  if (thou) parts.push(`${two(thou)} thousand`);
  if (rest) parts.push(three(rest));
  return parts.join(' ');
}
/** "rupees one lakh twenty thousand" for narration. */
export const rupees = (n) => `rupees ${words(n)}`;

// ---------------------------------------------------------------- rounding and ratio values
/** 2.5 -> "2.5", 2 -> "2", 0.43 -> "0.43" (two decimal places, trailing zeros dropped). */
export const dec = (v) => v.toFixed(2).replace(/\.?0+$/, '');
/** Spoken decimal for narration: 2.5 -> "two point five", 19.05 -> "nineteen point zero five". */
export function spoken(v) {
  const [i, f] = dec(v).split('.');
  return f ? `${words(Number(i))} point ${[...f].map((d) => ONES[Number(d)]).join(' ')}` : words(Number(i));
}

/**
 * A ratio value n ÷ d (× 100 for a percentage), rounded half up to two decimal places.
 * kind: 'ratio' ("2.5 : 1"), 'times' ("8 times") or 'pct' ("25%").
 */
function value(kind, n, d) {
  check(Number.isInteger(n) && Number.isInteger(d) && d > 0 && n >= 0, `ratio ${n} / ${d}`);
  const scale = kind === 'pct' ? 100 : 1;
  const num = n * scale * 100;
  check(Number.isSafeInteger(num * 10), `ratio ${n} / ${d} too large`);
  const v = Math.round(num / d) / 100;
  const exact = num % d === 0;
  const s = kind === 'ratio' ? `${dec(v)} : 1` : kind === 'times' ? `${dec(v)} times` : `${dec(v)}%`;
  const said = kind === 'ratio' ? `${spoken(v)} to one` : kind === 'times' ? `${spoken(v)} times` : `${spoken(v)} per cent`;
  return { kind, n, d, v, exact, s, eq: exact ? '=' : '≈', said };
}
export const ratio = (n, d) => value('ratio', n, d);
export const times = (n, d) => value('times', n, d);
export const pct = (n, d) => value('pct', n, d);
/** Working line: "8,00,000 ÷ 4,00,000 = 2 : 1" or "2,45,000 ÷ 40,00,000 × 100 ≈ 6.13%". */
export const show = (r) => `${fig(r.n)} ÷ ${fig(r.d)}${r.kind === 'pct' ? ' × 100' : ''} ${r.eq} ${r.s}`;
/** Pins a computed ratio to its hand-checked value (two decimal places). */
export function pin(r, v, what) {
  check(Math.abs(r.v - v) < 1e-9, `${what}: computed ${r.v}, expected ${v}`);
  return r;
}

/** Effect of a change on a ratio, compared as exact fractions: 'increase', 'decrease' or 'no change'. */
export function effect(before, after) {
  const l = before.n * after.d;
  const r = after.n * before.d;
  check(Number.isSafeInteger(l) && Number.isSafeInteger(r), 'effect comparison too large');
  return r > l ? 'increase' : r < l ? 'decrease' : 'no change';
}
export const EFFECT_WORD = { increase: 'Increases', decrease: 'Decreases', 'no change': 'No change' };
/**
 * Effects of separate transactions on one ratio. base = [numerator, denominator]; txns =
 * [[label, change in numerator, change in denominator, expected effect]]. Each new ratio is computed
 * from the changed figures and its effect asserted against the expected one.
 */
export function effects(kind, [n, d], txns) {
  const before = value(kind, n, d);
  const rows = txns.map(([label, dn, dd, expect]) => {
    const after = value(kind, n + dn, d + dd);
    const e = effect(before, after);
    check(e === expect, `effect of "${label}": computed ${e}, expected ${expect}`);
    return { label, n: n + dn, d: d + dd, dn, dd, after, e };
  });
  return { before, rows };
}
/** Signed change for a table cell: +50,000 / −50,000 / no change. */
export const delta = (v) => (v > 0 ? `+${fig(v)}` : v < 0 ? `−${fig(-v)}` : 'No change');

/** The formulas used throughout the chapter (notes section 2 states them once). */
export const F = {
  current: 'Current assets ÷ Current liabilities',
  quick: 'Quick assets ÷ Current liabilities',
  de: "Debt ÷ Equity (shareholders' funds)",
  tad: 'Total assets ÷ Debt',
  prop: "Shareholders' funds ÷ Total assets",
  icr: 'Profit before interest and tax ÷ Interest on long-term debt',
  itr: 'Cost of revenue from operations ÷ Average inventory',
  trt: 'Credit revenue from operations ÷ Average trade receivables',
  tpt: 'Net credit purchases ÷ Average trade payables',
  fat: 'Revenue from operations ÷ Net fixed assets',
  nat: 'Revenue from operations ÷ Capital employed',
  wct: 'Revenue from operations ÷ Working capital',
  gp: 'Gross profit ÷ Revenue from operations × 100',
  or: '(Cost of revenue from operations + Operating expenses) ÷ Revenue from operations × 100',
  opr: 'Operating profit ÷ Revenue from operations × 100',
  npr: 'Net profit ÷ Revenue from operations × 100',
  roi: 'Profit before interest and tax ÷ Capital employed × 100',
};
/** A ratio working table: rows [[name, formula, ratio value]]. */
export const ratioTable = (rows) => md(['Ratio', 'Formula', 'Working', 'Result'], rows.map(([name, f, r]) => [name, f, show(r), bold(r.s)]));

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;

// ---------------------------------------------------------------- financial position
/** Sub-heads used by position(); labels may be overridden per company (e.g. ltb: '10% Debentures'). */
export const POS = {
  sc: 'Share capital',
  rs: 'Reserves and surplus',
  ltb: 'Long-term borrowings',
  ltp: 'Long-term provisions',
  stb: 'Short-term borrowings',
  tp: 'Trade payables',
  ocl: 'Other current liabilities',
  stp: 'Short-term provisions',
  ppe: 'Property, plant and equipment (net)',
  intang: 'Intangible assets',
  nci: 'Non-current investments',
  ltla: 'Long-term loans and advances',
  ci: 'Current investments',
  inv: 'Inventories',
  tr: 'Trade receivables',
  cce: 'Cash and cash equivalents',
  stla: 'Short-term loans and advances',
  prepaid: 'Prepaid expenses',
  oca: 'Other current assets',
};
const GROUPS = [
  ['el', "Shareholders' funds", ['sc', 'rs'], 'sf'],
  ['el', 'Non-current liabilities', ['ltb', 'ltp'], 'ncl'],
  ['el', 'Current liabilities', ['stb', 'tp', 'ocl', 'stp'], 'cl'],
  ['as', 'Non-current assets', ['ppe', 'intang', 'nci', 'ltla'], 'nca'],
  ['as', 'Current assets', ['ci', 'inv', 'tr', 'cce', 'stla', 'prepaid', 'oca'], 'ca'],
];

/**
 * A balance sheet in sub-head totals. Asserts: equity and liabilities = assets; capital employed
 * (shareholders' funds + non-current liabilities) = non-current assets + working capital.
 */
export function position(o) {
  const g = (k) => o[k] ?? 0;
  for (const k of Object.keys(POS)) check(Number.isInteger(g(k)) && (g(k) >= 0 || k === 'rs'), `position ${k} = ${g(k)}`);
  for (const k of Object.keys(o)) check(k in POS || k === 'lab', `unknown position key ${k}`);
  const p = { lab: o.lab ?? {} };
  for (const k of Object.keys(POS)) p[k] = g(k);
  for (const [, , keys, tot] of GROUPS) p[tot] = sum(keys.map(g));
  p.el = p.sf + p.ncl + p.cl;
  p.total = p.nca + p.ca;
  check(p.el === p.total, `balance sheet does not balance: equity and liabilities ${p.el}, assets ${p.total}`);
  p.fixed = p.ppe + p.intang;
  p.quick = p.ca - p.inv - p.prepaid;
  p.wc = p.ca - p.cl;
  p.debt = p.ncl;
  p.ce = p.sf + p.ncl;
  check(p.ce === p.nca + p.wc, `capital employed: ${p.ce} (funds) vs ${p.nca + p.wc} (non-current assets + working capital)`);
  return p;
}
/** Condensed balance sheet rows (sub-head totals only, zero lines left out). */
export function positionRows(p, { date } = {}) {
  const rows = [];
  for (const part of ['el', 'as']) {
    rows.push([bold(part === 'el' ? 'I. Equity and Liabilities' : 'II. Assets'), '']);
    for (const [pt, head, keys, tot] of GROUPS) {
      if (pt !== part || !p[tot]) continue;
      rows.push([bold(head), '']);
      for (const k of keys) if (p[k]) rows.push([`  ${p.lab[k] ?? POS[k]}`, fig(p[k])]);
    }
    rows.push([bold('Total'), bold(fig(p.total))]);
  }
  return { headers: ['Particulars', `${date ?? '31 March 2026'} (₹)`], rows, md: md(['Particulars', `${date ?? '31 March 2026'} (₹)`], rows, [1]) };
}
/** Liquidity and solvency ratios of a position. */
export function posRatios(p) {
  return {
    current: ratio(p.ca, p.cl),
    quick: ratio(p.quick, p.cl),
    de: ratio(p.debt, p.sf),
    tad: ratio(p.total, p.debt),
    prop: ratio(p.sf, p.total),
  };
}

// ---------------------------------------------------------------- trading and operating results
/** Cost of revenue from operations and gross profit; average inventory. */
export function trading({ rev, open, purchases, direct = 0, close }) {
  for (const v of [rev, open, purchases, direct, close]) check(Number.isInteger(v) && v >= 0, 'trading figure');
  const cost = open + purchases + direct - close;
  const gp = rev - cost;
  check(cost > 0 && gp + cost === rev, 'trading: cost and gross profit');
  return { rev, open, purchases, direct, close, cost, gp, avgInv: avg(open, close) };
}

/**
 * Operating and net results. opex, oi (non-operating income) and nonop (non-operating expenses) are
 * [[label, amount]] lists; interest is the finance cost on long-term debt; taxRate a whole percentage.
 */
export function results({ rev, cost, opex = [], oi = [], nonop = [], interest = 0, taxRate = null }) {
  const gp = rev - cost;
  const opexT = sum(opex.map((x) => x[1]));
  const opCost = cost + opexT;
  const opProfit = rev - opCost;
  check(opProfit === gp - opexT, 'operating profit = gross profit − operating expenses');
  const oiT = sum(oi.map((x) => x[1]));
  const nonopT = sum(nonop.map((x) => x[1]));
  const pbit = opProfit + oiT - nonopT;
  const pbt = pbit - interest;
  check(pbt > 0, 'profit before tax positive');
  const tax = taxRate === null ? 0 : pctOf(taxRate, pbt);
  const pat = pbt - tax;
  check(pat + tax + interest + nonopT === opProfit + oiT, 'profit chain re-adds');
  return { rev, cost, gp, opex, opexT, opCost, opProfit, oi, oiT, nonop, nonopT, pbit, interest, pbt, taxRate, tax, pat };
}
/** Statement rows from revenue to profit after tax, for tables in workings and decks. */
export function resultRows(r) {
  const rows = [
    ['Revenue from operations', fig(r.rev)],
    ['Less: Cost of revenue from operations', fig(-r.cost)],
    [bold('Gross profit'), bold(fig(r.gp))],
    ...r.opex.map(([l, v]) => [`Less: ${l}`, fig(-v)]),
    [bold('Operating profit'), bold(fig(r.opProfit))],
    ...r.oi.map(([l, v]) => [`Add: ${l}`, fig(v)]),
    ...r.nonop.map(([l, v]) => [`Less: ${l}`, fig(-v)]),
    [bold('Profit before interest and tax'), bold(fig(r.pbit))],
  ];
  if (r.interest) rows.push(['Less: Interest on long-term debt', fig(-r.interest)]);
  rows.push([bold('Profit before tax'), bold(fig(r.pbt))]);
  if (r.taxRate !== null) {
    rows.push([`Less: Tax at ${r.taxRate}%`, fig(-r.tax)]);
    rows.push([bold('Profit after tax'), bold(fig(r.pat))]);
  }
  return { headers: ['Particulars', '₹'], rows, md: md(['Particulars', '₹'], rows, [1]) };
}
