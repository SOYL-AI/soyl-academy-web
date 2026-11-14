// Accounting helpers for CBSE 11 Accountancy (D-025/D-026). The core (assertions, Indian formatting, number words,
// journal entries, two-sided accounts) is taken from CBSE 12 Accountancy ch01's acc.mjs; the Class 11 helpers
// (accounting equation, ledger balancing, trial balance, cash book columns, bank reconciliation, depreciation,
// trading and profit and loss account, balance sheet) are added here. Every figure a chapter states is computed
// with these functions and asserted: entries balance, accounts close, the trial balance agrees, the BRS reaches the
// other book's balance, the balance sheet balances. The self-checks at the bottom run on import.
// Import as `../../cbse-11-accountancy-ch01/src/acc.mjs` (ch01: `./acc.mjs`). Amounts are whole rupees.

export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const r2 = (x) => Math.round(x * 100) / 100;

export function check(cond, what) {
  if (!cond) throw new Error(`accounting check failed: ${what}`);
}
/** Asserts a computed value equals the value the author expects, and returns it. */
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

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const upto99 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : ''));
const upto999 = (n) => [Math.floor(n / 100) ? `${ONES[Math.floor(n / 100)]} hundred` : '', n % 100 ? upto99(n % 100) : ''].filter(Boolean).join(' ');
/** Number in Indian words for narration (narration reads words, never digits or the rupee sign). */
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

/** GitHub-style Markdown table (cells must not contain "|"). */
export function mdTable(headers, rows) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}: ${r.join(' / ')}`);
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}

// ---------------------------------------------------------------- accounting equation
/**
 * Accounting equation over a list of transactions. start = { assets: {name: amt}, liabilities: {}, capital }.
 * Each step: { what, assets: {name: ±amt}, liabilities: {name: ±amt}, capital: ±amt }. After every step
 * Assets = Liabilities + Capital is asserted. Returns { rows, headers, md, final } with a column per item.
 */
export function equation({ start = { assets: {}, liabilities: {}, capital: 0 }, steps }) {
  const A = { ...start.assets };
  const L = { ...start.liabilities };
  let C = start.capital ?? 0;
  const aNames = new Set(Object.keys(A));
  const lNames = new Set(Object.keys(L));
  for (const s of steps) {
    for (const k of Object.keys(s.assets ?? {})) aNames.add(k);
    for (const k of Object.keys(s.liabilities ?? {})) lNames.add(k);
  }
  const an = [...aNames];
  const ln = [...lNames];
  const rows = [];
  for (const s of steps) {
    for (const [k, v] of Object.entries(s.assets ?? {})) A[k] = (A[k] ?? 0) + v;
    for (const [k, v] of Object.entries(s.liabilities ?? {})) L[k] = (L[k] ?? 0) + v;
    C += s.capital ?? 0;
    const ta = sum(an.map((k) => A[k] ?? 0));
    const tl = sum(ln.map((k) => L[k] ?? 0));
    same(ta, tl + C, `accounting equation after "${s.what}"`);
    for (const k of an) check((A[k] ?? 0) >= 0, `asset ${k} negative after "${s.what}"`);
    rows.push([s.what, ...an.map((k) => inr(A[k] ?? 0)), ...ln.map((k) => inr(L[k] ?? 0)), inr(C)]);
  }
  const headers = ['Transaction', ...an.map((k) => `${k} (₹)`), ...ln.map((k) => `${k} (₹)`), 'Capital (₹)'];
  return { headers, rows, md: mdTable(headers, rows), final: { assets: { ...A }, liabilities: { ...L }, capital: C } };
}

// ---------------------------------------------------------------- journal
/**
 * entries: [{ date?, dr: [[account, amount]], cr: [[account, amount]], note }]. Each entry must balance.
 * Narration (note) is printed in brackets under the entry. Returns { headers, rows, md, total }.
 */
export function journal(entries, { dates = entries.some((e) => e.date) } = {}) {
  const rows = [];
  let total = 0;
  for (const e of entries) {
    const d = sum(e.dr.map(([, a]) => a));
    const c = sum(e.cr.map(([, a]) => a));
    same(d, c, `journal entry "${e.note}" debits equal credits`);
    total += d;
    e.dr.forEach(([acc, a], i) => rows.push([...(dates ? [i ? '' : e.date ?? ''] : []), `${acc} Dr.`, inr(a), '']));
    for (const [acc, a] of e.cr) rows.push([...(dates ? [''] : []), `To ${acc}`, '', inr(a)]);
    rows.push([...(dates ? [''] : []), `*(${e.note})*`, '', '']);
  }
  rows.push([...(dates ? [''] : []), b('Total'), b(inr(total)), b(inr(total))]);
  const headers = [...(dates ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, md: mdTable(headers, rows), total };
}

// ---------------------------------------------------------------- ledger
/**
 * A two-sided ledger account. dr/cr = [[particulars, amount]] ("To …" / "By …" wording supplied), optionally
 * with an opening balance { side: 'dr' | 'cr', amount } shown as "To/By Balance b/d". The difference is carried
 * down as "Balance c/d". Returns { headers, rows, md, total, balance } where balance > 0 is a debit balance.
 */
export function ledger({ name, opening, dr = [], cr = [] }) {
  const D = [...(opening?.side === 'dr' ? [['To Balance b/d', opening.amount]] : []), ...dr.filter(([, a]) => a)];
  const C = [...(opening?.side === 'cr' ? [['By Balance b/d', opening.amount]] : []), ...cr.filter(([, a]) => a)];
  const balance = sum(D.map(([, a]) => a)) - sum(C.map(([, a]) => a));
  if (balance > 0) C.push(['By Balance c/d', balance]);
  else if (balance < 0) D.push(['To Balance c/d', -balance]);
  const total = sum(D.map(([, a]) => a));
  same(total, sum(C.map(([, a]) => a)), `${name ?? 'account'} totals agree`);
  const n = Math.max(D.length, C.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([D[i]?.[0] ?? '', D[i] ? inr(D[i][1]) : '', C[i]?.[0] ?? '', C[i] ? inr(C[i][1]) : '']);
  rows.push(['', b(inr(total)), '', b(inr(total))]);
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { name, headers, rows, md: mdTable(headers, rows), total, balance };
}
/**
 * Posts journal entries to ledger accounts. entries as for journal(); returns { [account]: ledger(...) }, each
 * debit posted as "To <credit account>" and each credit as "By <debit account>" (or "Sundries" when several).
 */
export function post(entries, openings = {}) {
  const acc = {};
  const get = (k) => (acc[k] ??= { dr: [], cr: [] });
  for (const e of entries) {
    const crName = e.cr.length === 1 ? e.cr[0][0] : 'Sundries';
    const drName = e.dr.length === 1 ? e.dr[0][0] : 'Sundries';
    for (const [a, amt] of e.dr) get(a).dr.push([`To ${crName}`, amt]);
    for (const [a, amt] of e.cr) get(a).cr.push([`By ${drName}`, amt]);
  }
  for (const k of Object.keys(openings)) get(k);
  const out = {};
  for (const [k, v] of Object.entries(acc)) out[k] = ledger({ name: k, opening: openings[k], ...v });
  return out;
}

// ---------------------------------------------------------------- trial balance
/**
 * rows: [[account, debit, credit]] (one of the two is 0). Asserts the totals agree (unless `expectMismatch`, for
 * items that show an error). Returns { headers, rows, md, dr, cr }.
 */
export function trialBalance(lines, { expectMismatch = false } = {}) {
  const dr = sum(lines.map(([, d]) => d || 0));
  const cr = sum(lines.map(([, , c]) => c || 0));
  if (!expectMismatch) same(dr, cr, 'trial balance totals agree');
  else check(dr !== cr, 'trial balance was expected not to agree');
  const rows = lines.map(([a, d, c]) => [a, d ? inr(d) : '', c ? inr(c) : '']);
  rows.push([b('Total'), b(inr(dr)), b(inr(cr))]);
  const headers = ['Name of account', 'Debit (₹)', 'Credit (₹)'];
  return { headers, rows, md: mdTable(headers, rows), dr, cr };
}
/** Trial balance from ledger(...) results: debit balances on the debit side, credit balances on the credit side. */
export const trialFromLedgers = (ledgers, opts) => trialBalance(Object.values(ledgers).filter((l) => l.balance).map((l) => [l.name, l.balance > 0 ? l.balance : 0, l.balance < 0 ? -l.balance : 0]), opts);

// ---------------------------------------------------------------- bank reconciliation
/**
 * Bank reconciliation statement. from = { book: 'cash book' | 'pass book', balance, side: 'dr' | 'cr' } as the
 * balance is shown in that book (a cash book debit balance or a pass book credit balance is favourable). items =
 * [[label, ±amount]] where + is "add" and − is "less" in the statement. expected = the other book's balance as a
 * signed favourable amount (negative = overdraft). Returns { rows, md, result }.
 */
export function brs({ from, items, expected }) {
  const fav = from.book === 'cash book' ? from.side === 'dr' : from.side === 'cr';
  const start = fav ? from.balance : -from.balance;
  const add = items.filter(([, a]) => a > 0);
  const less = items.filter(([, a]) => a < 0);
  const result = start + sum(items.map(([, a]) => a));
  if (expected !== undefined) same(result, expected, 'bank reconciliation reaches the other book');
  const other = from.book === 'cash book' ? 'pass book' : 'cash book';
  const rows = [[`Balance as per ${from.book}${fav ? '' : ' (overdraft)'}`, '', inr(from.balance)]];
  if (add.length) {
    rows.push([b('Add:'), '', '']);
    for (const [l, a] of add) rows.push([l, inr(a), '']);
    rows.push(['', '', inr(sum(add.map(([, a]) => a)))]);
  }
  if (less.length) {
    rows.push([b('Less:'), '', '']);
    for (const [l, a] of less) rows.push([l, inr(-a), '']);
    rows.push(['', '', `(${inr(-sum(less.map(([, a]) => a)))})`]);
  }
  rows.push([b(`Balance as per ${other}${result < 0 ? ' (overdraft)' : ''}`), '', b(inr(Math.abs(result)))]);
  const headers = ['Particulars', '₹', '₹'];
  return { headers, rows, md: mdTable(headers, rows), result };
}

// ---------------------------------------------------------------- depreciation
/** Straight line method: (cost − scrap) / life, and the rate as a per cent of cost. */
export function slm({ cost, scrap = 0, life }) {
  const annual = whole((cost - scrap) / life, 'annual straight line depreciation');
  return { annual, ratePct: r2((annual * 100) / cost) };
}
/**
 * Depreciation schedule for one asset over years. method 'slm' (rate on original cost) or 'wdv' (rate on the
 * opening book value). months[i] = months used in year i (default 12; first year may be part). Every charge must be
 * a whole rupee. Returns [{ year, opening, dep, closing }].
 */
export function schedule({ cost, ratePct, method, years, months = [] }) {
  const out = [];
  let bv = cost;
  for (let i = 0; i < years; i++) {
    const m = months[i] ?? 12;
    const base = method === 'slm' ? cost : bv;
    const dep = whole((base * ratePct * m) / 1200, `${method} depreciation year ${i + 1}`);
    out.push({ year: i + 1, opening: bv, dep, closing: bv - dep });
    bv -= dep;
    check(bv >= 0, 'book value negative');
  }
  return out;
}
/** Profit (+) or loss (−) on sale: sale value − book value on the date of sale. */
export const onSale = (bookValue, saleValue) => saleValue - bookValue;

// ---------------------------------------------------------------- financial statements (sole proprietor, horizontal)
/**
 * Trading Account. dr items: [[label, amt]] (opening stock, net purchases, direct expenses); cr items (net sales,
 * closing stock). Returns gross profit (+) or gross loss (−) and the two-sided table.
 */
export function trading({ dr, cr }) {
  const gp = sum(cr.map(([, a]) => a)) - sum(dr.map(([, a]) => a));
  const D = [...dr, ...(gp > 0 ? [['To Gross Profit c/d', gp]] : [])];
  const C = [...cr, ...(gp < 0 ? [['By Gross Loss c/d', -gp]] : [])];
  return { gp, ...twoSided(D, C, 'Trading Account') };
}
/** Profit and Loss Account: dr = expenses and losses (and gross loss), cr = gross profit and incomes. */
export function profitLoss({ dr, cr }) {
  const np = sum(cr.map(([, a]) => a)) - sum(dr.map(([, a]) => a));
  const D = [...dr, ...(np > 0 ? [['To Net Profit (transferred to Capital A/c)', np]] : [])];
  const C = [...cr, ...(np < 0 ? [['By Net Loss (transferred to Capital A/c)', -np]] : [])];
  return { np, ...twoSided(D, C, 'Profit and Loss Account') };
}
/** Balance Sheet (horizontal): liabilities and assets, each [[label, amt]]; the two totals must agree. */
export function balanceSheet({ liabilities, assets }) {
  const tl = sum(liabilities.map(([, a]) => a));
  const ta = sum(assets.map(([, a]) => a));
  same(tl, ta, 'balance sheet balances');
  const n = Math.max(liabilities.length, assets.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([liabilities[i]?.[0] ?? '', liabilities[i] ? inr(liabilities[i][1]) : '', assets[i]?.[0] ?? '', assets[i] ? inr(assets[i][1]) : '']);
  rows.push([b('Total'), b(inr(tl)), b('Total'), b(inr(ta))]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { headers, rows, md: mdTable(headers, rows), total: tl };
}
function twoSided(D, C, what) {
  const td = sum(D.map(([, a]) => a));
  same(td, sum(C.map(([, a]) => a)), `${what} totals agree`);
  const n = Math.max(D.length, C.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([D[i]?.[0] ?? '', D[i] ? inr(D[i][1]) : '', C[i]?.[0] ?? '', C[i] ? inr(C[i][1]) : '']);
  rows.push(['', b(inr(td)), '', b(inr(td))]);
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { headers, rows, md: mdTable(headers, rows), total: td };
}

/** GST on an amount at an imagined rate stated in the problem; intra-state splits equally into CGST and SGST. */
export function gst(amount, ratePct, { interState = false } = {}) {
  const tax = whole((amount * ratePct) / 100, 'GST');
  if (interState) return { tax, igst: tax, cgst: 0, sgst: 0 };
  const half = whole(tax / 2, 'half of GST');
  return { tax, igst: 0, cgst: half, sgst: half };
}

// ---------------------------------------------------------------- self-checks (run on import)
{
  for (const [n, w] of [[120000, 'one lakh twenty thousand'], [5947500, 'fifty nine lakh forty seven thousand five hundred'], [21, 'twenty one'], [1000, 'one thousand']]) check(words(n) === w, `words(${n}) = "${words(n)}"`);
  // Accounting equation: start with capital 50,000 cash; buy goods 20,000 on credit; pay creditor 5,000.
  const eq = equation({
    start: { assets: { Cash: 50000 }, liabilities: {}, capital: 50000 },
    steps: [
      { what: 'Bought goods on credit', assets: { Stock: 20000 }, liabilities: { Creditors: 20000 } },
      { what: 'Paid a creditor', assets: { Cash: -5000 }, liabilities: { Creditors: -5000 } },
      { what: 'Sold goods costing 8,000 for 10,000 cash', assets: { Cash: 10000, Stock: -8000 }, capital: 2000 },
    ],
  });
  same(eq.final.capital, 52000, 'equation capital');
  same(eq.final.assets.Cash, 55000, 'equation cash');
  // Journal, posting and trial balance.
  const E = [
    { dr: [['Cash A/c', 80000]], cr: [['Capital A/c', 80000]], note: 'Being business started with cash' },
    { dr: [['Purchases A/c', 30000]], cr: [['Cash A/c', 30000]], note: 'Being goods bought for cash' },
    { dr: [['Cash A/c', 25000]], cr: [['Sales A/c', 25000]], note: 'Being goods sold for cash' },
  ];
  same(journal(E).total, 135000, 'journal total');
  const L = post(E);
  same(L['Cash A/c'].balance, 75000, 'cash balance');
  const tb = trialFromLedgers(L);
  same(tb.dr, 105000, 'trial balance total');
  // BRS: cash book Dr 12,000; cheques issued not presented 3,000 (add); cheques deposited not credited 2,000
  // (less); bank charges 200 not in cash book (less) → pass book 12,800.
  same(brs({ from: { book: 'cash book', balance: 12000, side: 'dr' }, items: [['Cheques issued but not presented', 3000], ['Cheques deposited but not credited', -2000], ['Bank charges', -200]], expected: 12800 }).result, 12800, 'brs');
  // Overdraft: pass book Dr 5,000 (unfavourable); interest on overdraft 300 not in cash book (add) → cash book overdraft 4,700.
  same(brs({ from: { book: 'pass book', balance: 5000, side: 'dr' }, items: [['Interest on overdraft not recorded in cash book', 300]], expected: -4700 }).result, -4700, 'brs overdraft');
  // Depreciation: SLM cost 1,10,000, scrap 10,000, life 5 → 20,000; WDV 10% on 1,00,000 → 10,000, 9,000, 8,100.
  same(slm({ cost: 110000, scrap: 10000, life: 5 }).annual, 20000, 'slm');
  const w = schedule({ cost: 100000, ratePct: 10, method: 'wdv', years: 3 });
  same(w[2].dep, 8100, 'wdv year 3');
  same(w[2].closing, 72900, 'wdv closing');
  same(schedule({ cost: 120000, ratePct: 10, method: 'slm', years: 2, months: [6] })[0].dep, 6000, 'slm part year');
  same(onSale(72900, 70000), -2900, 'loss on sale');
  // Final accounts: GP 40,000; NP 25,000; balance sheet balances.
  const t = trading({ dr: [['To Opening Stock', 20000], ['To Purchases', 100000], ['To Wages', 10000]], cr: [['By Sales', 150000], ['By Closing Stock', 20000]] });
  same(t.gp, 40000, 'gross profit');
  const p = profitLoss({ dr: [['To Salaries', 12000], ['To Rent', 3000]], cr: [['By Gross Profit b/d', t.gp]] });
  same(p.np, 25000, 'net profit');
  balanceSheet({ liabilities: [['Capital 1,00,000 + Net Profit 25,000', 125000], ['Creditors', 15000]], assets: [['Machinery', 80000], ['Closing Stock', 20000], ['Cash', 40000]] });
  same(gst(10000, 12).cgst, 600, 'gst split');
}
