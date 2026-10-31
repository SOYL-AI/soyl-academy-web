// Accounting helpers for ISC 12 Accounts ch02 (Goodwill: Nature and Valuation).
// Every figure in the chapter is computed here from its givens and asserted: normalised profits, simple
// and weighted averages, capital employed (worked from the assets side AND from the capital side, which
// must agree), normal and super profit, capitalised values, and goodwill by every method. Balance sheets
// must total on both sides. The tables shown to students (deck visuals and model answers) are built from
// these results, so no amount is ever typed twice. Any mismatch throws and stops the build.

export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const r2 = (x) => Math.round(x * 100) / 100;

export function check(cond, what) {
  if (!cond) throw new Error(`accounting check failed: ${what}`);
}
/** Asserts a computed value equals the value the author worked out by hand, and returns it. */
export function same(actual, expected, what) {
  check(Math.abs(actual - expected) < 0.005, `${what}: computed ${actual}, expected ${expected}`);
  return actual;
}
/** Asserts a whole number of rupees (the chapter's figures are chosen so every result is exact). */
export function whole(x, what) {
  check(Math.abs(r2(x) - Math.round(x)) < 1e-9, `${what} is not a whole number of rupees: ${x}`);
  return Math.round(x);
}

// ---------------------------------------------------------------- formatting
/** Indian digit grouping: 120000 → "1,20,000"; a loss shows as "(30,000)". */
export const inr = (n) => (n < 0 ? `(${Math.abs(n).toLocaleString('en-IN')})` : n.toLocaleString('en-IN'));
/** Rupee amount: 120000 → "₹1,20,000"; a loss → "₹(30,000)". */
export const rs = (n) => (n < 0 ? `₹(${Math.abs(n).toLocaleString('en-IN')})` : `₹${n.toLocaleString('en-IN')}`);
/** Percentage: 12.5 → "12.5%". */
export const pc = (r) => `${r}%`;
/** Years' purchase: 2.5 → "2.5". */
export const yp = (y) => String(y);
const b = (s) => `**${s}**`;

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const upto99 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : ''));
const upto999 = (n) => [Math.floor(n / 100) ? `${ONES[Math.floor(n / 100)]} hundred` : '', n % 100 ? upto99(n % 100) : ''].filter(Boolean).join(' ');
/** Number in Indian words for narration (TTS reads words, never digits or the rupee sign). */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words() needs a whole number, got ${n}`);
  if (n === 0) return 'zero';
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor((n % 1e7) / 1e5);
  const th = Math.floor((n % 1e5) / 1e3);
  const rest = n % 1000;
  return [crore ? `${words(crore)} crore` : '', lakh ? `${upto99(lakh)} lakh` : '', th ? `${upto99(th)} thousand` : '', rest ? upto999(rest) : ''].filter(Boolean).join(' ');
}
export const rupees = (n) => `rupees ${words(n)}`;
/** A rate or a years' purchase in words, allowing one half: 12.5 → "twelve and a half". */
export function numWords(x) {
  const w = Math.floor(x);
  const f = x - w;
  check(f === 0 || f === 0.5, `numWords() handles whole numbers and halves only, got ${x}`);
  return f ? `${words(w)} and a half` : words(w);
}
for (const [n, w] of [[120000, 'one lakh twenty thousand'], [950000, 'nine lakh fifty thousand'], [21, 'twenty one'], [1000, 'one thousand']]) same(words(n) === w ? 1 : 0, 1, `words(${n}) = "${words(n)}"`);
same(numWords(12.5) === 'twelve and a half' ? 1 : 0, 1, 'numWords(12.5)');

/** GitHub-style Markdown table (cells must not contain "|"). */
export function mdTable(headers, rows) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}: ${r.join(' / ')}`);
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}

// ---------------------------------------------------------------- normalising past profits
/**
 * Adjusts reported profits to normal (maintainable) profits.
 * adj: [{ y: year index, label, amount }]: + adds to that year's profit, − deducts from it.
 * Returns the normal profits and a table: year, reported profit, adjustments, normal profit.
 */
export function normalise({ years, profits, adj = [] }) {
  check(years.length === profits.length, 'normalise: one profit per year');
  for (const a of adj) check(a.y >= 0 && a.y < years.length && Number.isInteger(a.amount) && a.amount !== 0, `normalise: bad adjustment ${a.label}`);
  const normal = profits.map((p, i) => p + sum(adj.filter((a) => a.y === i).map((a) => a.amount)));
  const sign = (a) => (a.amount > 0 ? `+ ${inr(a.amount)}` : `− ${inr(-a.amount)}`);
  const rows = years.map((y, i) => {
    const mine = adj.filter((a) => a.y === i);
    return [y, inr(profits[i]), mine.length ? mine.map((a) => `${sign(a)} (${a.label})`).join('; ') : '—', inr(normal[i])];
  });
  rows.push([b('Total'), b(inr(sum(profits))), '', b(inr(sum(normal)))]);
  const headers = ['Year', 'Profit as reported (₹)', 'Adjustment (₹)', 'Normal profit (₹)'];
  same(sum(normal), sum(profits) + sum(adj.map((a) => a.amount)), 'normalise: totals reconcile');
  return { normal, total: sum(normal), headers, rows, md: mdTable(headers, rows) };
}

/**
 * Closing stock wrongly valued at the end of year i. Overvaluation overstates year i's profit and, as the
 * next year's opening stock, understates year i+1's; undervaluation does the opposite.
 */
export function stockError({ y, amount, kind, last }) {
  check(kind === 'over' || kind === 'under', 'stockError kind');
  const s = kind === 'over' ? -1 : 1;
  const out = [{ y, label: `closing stock ${kind}valued`, amount: s * amount }];
  if (y + 1 <= last) out.push({ y: y + 1, label: `opening stock ${kind}valued`, amount: -s * amount });
  return out;
}

/**
 * Capital expenditure wrongly charged to revenue at the start of year y: add back the cost in year y and
 * charge straight-line depreciation at rate% for every year from y to the last year.
 */
export function capexWronglyCharged({ y, cost, rate, last }) {
  const dep = whole((cost * rate) / 100, 'depreciation on capital expenditure');
  const out = [{ y, label: 'capital expenditure added back', amount: cost }];
  for (let i = y; i <= last; i++) out.push({ y: i, label: `depreciation at ${rate}%`, amount: -dep });
  return { adj: out, dep };
}

// ---------------------------------------------------------------- averages
export const average = (xs) => sum(xs) / xs.length;
/** Weighted average of [[profit, weight]]. */
export function weightedAverage(pairs) {
  const products = pairs.map(([p, w]) => p * w);
  const weights = sum(pairs.map(([, w]) => w));
  return { products, weights, total: sum(products), value: sum(products) / weights };
}
/** Table of the weighted-average working. */
export function weightedTable(years, profits, weights) {
  const w = weightedAverage(profits.map((p, i) => [p, weights[i]]));
  const rows = years.map((y, i) => [y, inr(profits[i]), String(weights[i]), inr(w.products[i])]);
  rows.push([b('Total'), '', b(String(w.weights)), b(inr(w.total))]);
  const headers = ['Year', 'Normal profit (₹)', 'Weight', 'Product (₹)'];
  return { ...w, headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- capital employed
/**
 * Capital employed (net assets) for valuing goodwill, worked both ways from one balance sheet.
 * assets: [[label, amount, flag?]] with flag 'goodwill' | 'nti' (non-trade investment) | 'fictitious'
 * for the items left out; liabilities: [[label, amount, kind]] with kind 'capital' | 'reserve' (reserves and
 * credit balance of profit) | 'outside'. Asset side: assets used in the business − outside liabilities.
 * Capital side: capitals + reserves − goodwill − non-trade investments − fictitious assets. They must agree.
 */
export function capitalEmployed({ assets, liabilities }) {
  for (const [, , f] of assets) check([undefined, 'goodwill', 'nti', 'fictitious'].includes(f), `asset flag ${f}`);
  for (const [, , k] of liabilities) check(['capital', 'reserve', 'outside'].includes(k), `liability kind ${k}`);
  const totalAssets = sum(assets.map(([, a]) => a));
  const totalLiab = sum(liabilities.map(([, a]) => a));
  same(totalAssets, totalLiab, 'balance sheet totals agree');
  const excluded = assets.filter(([, , f]) => f);
  const used = assets.filter(([, , f]) => !f);
  const outside = liabilities.filter(([, , k]) => k === 'outside');
  const own = liabilities.filter(([, , k]) => k !== 'outside');
  const usedTotal = sum(used.map(([, a]) => a));
  const outsideTotal = sum(outside.map(([, a]) => a));
  const ownTotal = sum(own.map(([, a]) => a));
  const excludedTotal = sum(excluded.map(([, a]) => a));
  const ce = usedTotal - outsideTotal;
  same(ce, ownTotal - excludedTotal, 'capital employed: asset side equals capital side');
  check(ce > 0, 'capital employed is positive');
  return { ce, totalAssets, used, usedTotal, outside, outsideTotal, own, ownTotal, excluded, excludedTotal };
}

/** Horizontal balance sheet (ISC format): Liabilities on the left, Assets on the right; totals must agree. */
export function balanceSheet({ liabilities, assets }) {
  const L = liabilities.map(([l, a]) => [l, a]);
  const A = assets.map(([l, a]) => [l, a]);
  const tl = sum(L.map(([, a]) => a));
  const ta = sum(A.map(([, a]) => a));
  same(tl, ta, 'balance sheet sides agree');
  const rows = [];
  for (let i = 0; i < Math.max(L.length, A.length); i++) rows.push([L[i]?.[0] ?? '', L[i] ? inr(L[i][1]) : '', A[i]?.[0] ?? '', A[i] ? inr(A[i][1]) : '']);
  rows.push([b('Total'), b(inr(tl)), b('Total'), b(inr(ta))]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { headers, rows, md: mdTable(headers, rows), total: tl };
}

// ---------------------------------------------------------------- goodwill
export const normalProfit = (capitalEmployed, nrr) => whole((capitalEmployed * nrr) / 100, 'normal profit');
export const capitalise = (profit, nrr) => whole((profit * 100) / nrr, 'capitalised value');
/**
 * Goodwill by every method from one set of figures. The two capitalisation methods must agree.
 * A super profit of zero or less means the firm has no goodwill.
 */
export function goodwillAll({ avg, capitalEmployed, nrr, years, cap = true }) {
  const normal = normalProfit(capitalEmployed, nrr);
  const superProfit = avg - normal;
  // Items that use only the super profit method may have figures that do not capitalise to whole rupees.
  if (!cap) return { normal, superProfit, bySuper: years ? whole(superProfit * years, 'super profit goodwill') : null };
  const capValue = capitalise(avg, nrr);
  const byCapAvg = capValue - capitalEmployed;
  const byCapSuper = superProfit === 0 ? 0 : whole((superProfit * 100) / nrr, 'capitalised super profit');
  same(byCapAvg, byCapSuper, 'capitalisation of average profit equals capitalisation of super profit');
  return {
    normal,
    superProfit,
    capValue,
    byCapAvg,
    byCapSuper,
    bySuper: years ? whole(superProfit * years, 'super profit goodwill') : null,
    byAverage: years ? whole(avg * years, 'average profit goodwill') : null,
  };
}
