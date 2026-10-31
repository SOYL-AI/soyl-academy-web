// Accounting engine for ISC 12 Accounts ch01 (Fundamentals of Partnership).
// Every figure in the chapter is computed here from its givens and asserted: journal entries balance,
// ledger accounts close, shares of profit add up to the profit divided, interest by the product method
// agrees with the average-period method, a guarantee never changes the firm's total profit, and the net
// effects of a past adjustment total zero. The tables shown to students (deck visuals and model answers)
// are built from these results, so no amount is ever typed twice. Any mismatch throws and stops the build.

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
/** Asserts a whole number of rupees (figures are chosen so every result is exact). */
export function whole(x, what) {
  check(Math.abs(r2(x) - Math.round(x)) < 1e-9, `${what} is not a whole number of rupees: ${x}`);
  return Math.round(x);
}

// ---------------------------------------------------------------- formatting
/** Indian digit grouping: 120000 → "1,20,000". */
export const inr = (n) => (n < 0 ? `−${Math.abs(n).toLocaleString('en-IN')}` : n.toLocaleString('en-IN'));
/** Rupee amount: 120000 → "₹1,20,000". */
export const rs = (n) => (n < 0 ? `−₹${Math.abs(n).toLocaleString('en-IN')}` : `₹${n.toLocaleString('en-IN')}`);
const b = (s) => `**${s}**`;
/** Months as students write them: 6.5 → "6½". */
export const mo = (m) => (Number.isInteger(m) ? String(m) : Number.isInteger(m - 0.5) ? `${Math.floor(m)}½` : String(m));

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
for (const [n, w] of [[120000, 'one lakh twenty thousand'], [254400, 'two lakh fifty four thousand four hundred'], [21, 'twenty one'], [1000, 'one thousand']]) check(words(n) === w, `words(${n}) = "${words(n)}"`);

/** GitHub-style Markdown table (cells must not contain "|"). */
export function mdTable(headers, rows) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}: ${r.join(' / ')}`);
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}
const cell = (v) => (v === undefined || v === null || v === 0 ? '—' : inr(v));

// ---------------------------------------------------------------- arithmetic of the chapter
/** Divides an amount in a ratio {name: parts}; every share must be whole and the shares must add up. */
export function divide(total, ratio, what = 'division') {
  const parts = sum(Object.values(ratio));
  const out = {};
  for (const [k, v] of Object.entries(ratio)) out[k] = whole((total * v) / parts, `${what}: share of ${k}`);
  same(sum(Object.values(out)), total, `${what}: shares add up`);
  return out;
}
/** Simple interest for a number of months, in whole rupees. */
export const interest = (principal, ratePct, months = 12) => whole((principal * ratePct * months) / 1200, `interest on ${principal} at ${ratePct}% for ${months} months`);

/** Average period (months) of n equal drawings spread evenly over a 12-month year. */
export function avgMonths(n, when) {
  const gap = 12 / n;
  return when === 'begin' ? (12 + gap) / 2 : when === 'end' ? (12 - gap) / 2 : 6;
}
for (const [n, when, m] of [[12, 'begin', 6.5], [12, 'mid', 6], [12, 'end', 5.5], [4, 'begin', 7.5], [4, 'mid', 6], [4, 'end', 4.5], [2, 'begin', 9], [2, 'end', 3]]) same(avgMonths(n, when), m, `average period ${n} ${when}`);

/** Interest on equal drawings made n times a year at the beginning, middle or end of each period. */
export function iodEqual({ amount, n, when, rate }) {
  const total = amount * n;
  const months = avgMonths(n, when);
  return { total, months, interest: whole((total * rate * months) / 1200, 'interest on drawings') };
}
/** Product method: items = [[amount, months to the year end]]. */
export function iodProduct(rate, items) {
  const products = items.map(([a, m]) => a * m);
  const total = sum(products);
  return { products, total, interest: whole((total * rate) / 1200, 'interest on drawings (product method)') };
}
/**
 * Equal drawings at a regular monthly interval for part of a year. `first` and `last` are the months
 * each of the first and last drawings stays out until the year end. Average period = (first + last) ÷ 2.
 * The result is cross-checked against the product method on the same drawings.
 */
export function iodSpan({ amount, count, first, last, rate }) {
  check((first - last) % (count - 1 || 1) === 0, 'drawings are evenly spaced');
  const step = count > 1 ? (first - last) / (count - 1) : 0;
  const items = [...Array(count).keys()].map((i) => [amount, first - i * step]);
  const months = (first + last) / 2;
  const total = amount * count;
  const viaAverage = whole((total * rate * months) / 1200, 'interest by average period');
  const viaProduct = iodProduct(rate, items);
  same(viaAverage, viaProduct.interest, 'average-period method agrees with the product method');
  return { total, months, interest: viaAverage, items, product: viaProduct };
}

/** Commission at pct of profit after charging that commission: profit × pct ÷ (100 + pct). */
export const commissionAfter = (profit, pct) => whole((profit * pct) / (100 + pct), 'commission after charging');
export const commissionBefore = (profit, pct) => whole((profit * pct) / 100, 'commission before charging');
// Self-check: commission after charging is exactly pct% of what is left.
same(commissionAfter(462000, 10), (462000 - commissionAfter(462000, 10)) / 10, 'commission after charging identity');

// ---------------------------------------------------------------- journal entries
/** entries: [{ dr: [[account, amount]], cr: [[account, amount]], note }]. Each entry must balance. */
export function journal(entries) {
  const rows = [];
  for (const e of entries) {
    const d = sum(e.dr.map(([, a]) => a));
    const c = sum(e.cr.map(([, a]) => a));
    same(d, c, `journal entry "${e.note}" debits equal credits`);
    check(d > 0, `journal entry "${e.note}" is empty`);
    for (const [acc, a] of e.dr) rows.push([`${acc} Dr.`, inr(a), '']);
    for (const [acc, a] of e.cr) rows.push([`To ${acc}`, '', inr(a)]);
    rows.push([`*(${e.note})*`, '', '']);
  }
  const headers = ['Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- ledger accounts
/**
 * A two-sided account. dr/cr = [[particulars, amount]] with the "To …"/"By …" wording supplied.
 * With balance: true the difference is carried down as "Balance c/d"; with balance: false the two
 * sides must already agree.
 */
export function tAccount({ dr, cr, balance = true }) {
  const D = dr.filter(([, a]) => a);
  const C = cr.filter(([, a]) => a);
  const diff = sum(C.map(([, a]) => a)) - sum(D.map(([, a]) => a));
  if (balance) {
    if (diff > 0) D.push(['To Balance c/d', diff]);
    else if (diff < 0) C.push(['By Balance c/d', -diff]);
  } else same(diff, 0, `account sides agree (${D.map(([p]) => p).join(', ')})`);
  const total = sum(D.map(([, a]) => a));
  same(total, sum(C.map(([, a]) => a)), 'account totals');
  const n = Math.max(D.length, C.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([D[i]?.[0] ?? '', D[i] ? inr(D[i][1]) : '', C[i]?.[0] ?? '', C[i] ? inr(C[i][1]) : '']);
  rows.push(['', b(inr(total)), '', b(inr(total))]);
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { headers, rows, md: mdTable(headers, rows), total, balance: diff };
}

/**
 * Columnar capital or current accounts of several partners. dr/cr = [[particulars, {name: amount}]].
 * A credit balance is carried down on the debit side and a debit balance on the credit side.
 */
export function partnerAccounts({ names, dr, cr }) {
  const D = dr.map(([p, v]) => [p, { ...v }]);
  const C = cr.map(([p, v]) => [p, { ...v }]);
  const tot = (side, n) => sum(side.map(([, v]) => v[n] ?? 0));
  const balances = {};
  const cd = {};
  const dd = {};
  for (const n of names) {
    balances[n] = tot(C, n) - tot(D, n);
    if (balances[n] > 0) cd[n] = balances[n];
    if (balances[n] < 0) dd[n] = -balances[n];
  }
  if (Object.keys(cd).length) D.push(['To Balance c/d', cd]);
  if (Object.keys(dd).length) C.push(['By Balance c/d', dd]);
  const totals = {};
  for (const n of names) {
    totals[n] = tot(D, n);
    same(totals[n], tot(C, n), `${n}'s account totals`);
  }
  const rows = [];
  for (let i = 0; i < Math.max(D.length, C.length); i++) {
    const l = D[i];
    const r = C[i];
    rows.push([l?.[0] ?? '', ...names.map((n) => (l ? cell(l[1][n]) : '')), r?.[0] ?? '', ...names.map((n) => (r ? cell(r[1][n]) : ''))]);
  }
  rows.push(['', ...names.map((n) => b(inr(totals[n]))), '', ...names.map((n) => b(inr(totals[n])))]);
  const headers = ['Dr: Particulars', ...names.map((n) => `${n} (₹)`), 'Cr: Particulars', ...names.map((n) => `${n} (₹)`)];
  return { headers, rows, md: mdTable(headers, rows), balances, totals };
}

/**
 * Profit and Loss Adjustment Account (ISC style): the profit before charges is credited, each charge
 * against profit (interest on a partner's loan, rent to a partner, a manager's commission) is debited,
 * and the net profit is transferred to the Profit and Loss Appropriation Account. Both sides agree.
 */
export function plAdjust({ before, beforeLabel = 'By Profit and Loss A/c (profit before the charges below)', charges }) {
  const net = before - sum(charges.map(([, a]) => a));
  check(net > 0, `net profit after charges is not positive (${net})`);
  const t = tAccount({ dr: [...charges, ['To P&L Appropriation A/c (net profit transferred)', net]], cr: [[beforeLabel, before]], balance: false });
  return { net, ...t };
}

/**
 * Profit and Loss Appropriation Account. Credits: net profit, interest on drawings (and extraCr);
 * debits: interest on capital, salaries, commissions, reserve (and extraDr); the rest is divided in
 * `ratio` (unless `shares` is given, e.g. after a guarantee, which must still exhaust the profit).
 */
export function appropriation({ names, ratio, profit, profitLabel = 'By Profit and Loss A/c (net profit)', iod = {}, ioc = {}, salary = {}, commission = {}, reserve = 0, extraCr = [], extraDr = [], shares, shareLabel = (n) => `To ${n}'s Capital A/c (share of profit)` }) {
  const cr = [[profitLabel, profit], ...names.filter((n) => iod[n]).map((n) => [`By Interest on Drawings: ${n}`, iod[n]]), ...extraCr];
  const dr = [
    ...names.filter((n) => ioc[n]).map((n) => [`To Interest on Capital: ${n}`, ioc[n]]),
    ...extraDr,
    ...names.filter((n) => salary[n]).map((n) => [`To Salary: ${n}`, salary[n]]),
    ...names.filter((n) => commission[n]).map((n) => [`To Commission: ${n}`, commission[n]]),
    ...(reserve ? [['To General Reserve', reserve]] : []),
  ];
  const divisible = sum(cr.map(([, a]) => a)) - sum(dr.map(([, a]) => a));
  check(divisible >= 0, `divisible profit is negative (${divisible})`);
  const sh = shares ?? divide(divisible, ratio, 'divisible profit');
  same(sum(Object.values(sh)), divisible, 'shares exhaust the divisible profit');
  const t = tAccount({ dr: [...dr, ...names.map((n) => [shareLabel(n), sh[n]])], cr, balance: false });
  return { divisible, shares: sh, ...t };
}

// ---------------------------------------------------------------- guarantee of profit
/**
 * Guarantee of a minimum profit to one partner. `amount` is divided in `ratio`; if the guaranteed
 * partner's share is below `min`, the deficiency is borne by `bearers` {name: parts}. Returns the
 * normal shares, the deficiency, each bearer's part and the final shares; the total never changes.
 */
export function guarantee({ amount, ratio, guaranteed, min, bearers }) {
  const normal = divide(amount, ratio, 'normal shares');
  const deficiency = Math.max(0, min - normal[guaranteed]);
  const borne = deficiency ? divide(deficiency, bearers, 'deficiency') : Object.fromEntries(Object.keys(bearers).map((k) => [k, 0]));
  const final = { ...normal };
  for (const [k, v] of Object.entries(borne)) final[k] -= v;
  final[guaranteed] += deficiency;
  same(sum(Object.values(final)), amount, 'a guarantee keeps the total profit unchanged');
  check(final[guaranteed] >= min, 'guaranteed partner receives at least the minimum');
  return { normal, deficiency, borne, final };
}

// ---------------------------------------------------------------- past adjustments
/**
 * lines: [[label, {name: signed amount}]]: + means "should have been credited", − "should have been
 * debited" (or a credit to be taken back). The net effect per partner must sum to zero; the adjustment
 * entry debits the losers and credits the gainers. acct: 'Capital' | 'Current'.
 */
export function pastAdjustment({ names, lines, acct = 'Capital', note = 'Being past adjustment made' }) {
  const net = {};
  for (const n of names) net[n] = sum(lines.map(([, v]) => v[n] ?? 0));
  same(sum(Object.values(net)), 0, 'past adjustment: net effect is zero');
  const show = (v) => (!v ? '—' : v > 0 ? `Cr ${inr(v)}` : `Dr ${inr(-v)}`);
  const rows = lines.map(([label, v]) => [label, ...names.map((n) => show(v[n])), show(sum(names.map((n) => v[n] ?? 0)))]);
  rows.push([b('Net effect'), ...names.map((n) => b(show(net[n]))), b('nil')]);
  const headers = ['Particulars', ...names.map((n) => `${n} (₹)`), 'Firm (₹)'];
  const entry = journal([
    {
      dr: names.filter((n) => net[n] < 0).map((n) => [`${n}'s ${acct} A/c`, -net[n]]),
      cr: names.filter((n) => net[n] > 0).map((n) => [`${n}'s ${acct} A/c`, net[n]]),
      note,
    },
  ]);
  return { net, headers, rows, md: mdTable(headers, rows), entry };
}
/** Negates every amount of a {name: amount} map (a credit to be taken back, a debit to be reversed). */
export const neg = (v) => Object.fromEntries(Object.entries(v).map(([k, x]) => [k, -x]));
