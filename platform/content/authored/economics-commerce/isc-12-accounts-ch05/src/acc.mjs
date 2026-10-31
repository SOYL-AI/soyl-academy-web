// Accounting helpers for isc-12-accounts-ch05 (Dissolution of a Partnership Firm).
// The generic helpers (rupees, fractions, journal, To/By ledger accounts, horizontal balance sheet,
// number words) follow isc-12-accounts-ch03; dissolve() and section48() are written for this chapter
// on the ISC 2027 rules: a fund or reserve related to an asset or liability goes to the Realisation
// Account with it; a bank overdraft is closed through the Bank/Cash Account, a bank loan through the
// Realisation Account; a silent tangible asset or investment realises its book value, a silent
// intangible asset, accrued income or prepaid expense realises nothing, a silent liability is paid in
// full; a loan from a partner is repaid through the Bank/Cash Account even if his capital is in debit;
// a loan to a partner is debited to his capital account; current accounts are closed to capitals.
// Every figure is computed from the givens and checked: entries balance, the Realisation, loan, capital
// and Bank/Cash accounts balance, the opening (memorandum) balance sheet totals, every asset is disposed
// of and every outside liability settled, every capital account and the Bank/Cash Account close at nil.
// Any mismatch throws, so the build stops. Tables are built from the computed values, never typed.

export function fail(msg) {
  throw new Error(`acc: ${msg}`);
}
export function check(ok, what) {
  if (!ok) fail(what);
}

/** Indian digit grouping (1,20,000); whole rupees only. */
export const inr = (n) => {
  check(Number.isInteger(n), `not a whole number of rupees: ${n}`);
  return n.toLocaleString('en-IN');
};
export const rs = (n) => `₹${inr(n)}`;
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- fractions and ratios
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

export class F {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  add(o) { return new F(this.n * o.d + o.n * this.d, this.d * o.d); }
  eq(o) { return this.n === o.n && this.d === o.d; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
  /** Whole-rupee share of an amount; throws if it does not divide exactly. */
  of(amount) {
    check((amount * this.n) % this.d === 0, `${this} of ${amount} is not a whole number`);
    return (amount * this.n) / this.d;
  }
}
export const fr = (n, d = 1) => new F(n, d);
export const ratioStr = (ints) => ints.join(' : ');
/** x per cent of an amount, whole rupees only. */
export const pct = (p, amount) => fr(p, 100).of(amount);

/** Splits an amount in a ratio of whole numbers; every part must be whole and the parts must add up. */
export function splitRatio(amount, names, ints) {
  const t = sum(ints);
  const out = {};
  names.forEach((n, i) => {
    check((amount * ints[i]) % t === 0, `${amount} in ratio ${ints.join(':')} is not whole for ${n}`);
    out[n] = (amount * ints[i]) / t;
  });
  check(sum(Object.values(out)) === amount, `split of ${amount} does not add up`);
  return out;
}

// ---------------------------------------------------------------- tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function mdTable(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const line = (cells) => `| ${cells.join(' | ')} |`;
  const sep = headers.map((_, i) => (num.includes(i) ? '--:' : '---'));
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const amt = (x) => (x === undefined || x === null || x === 0 ? '' : inr(x));
const roman = (i) => ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'][i - 1];
const to = (l) => (l ? `To ${l}` : '');
const by = (l) => (l ? `By ${l}` : '');

/**
 * Journal: entries = [{ dr: [[account, amount]], cr: [[account, amount]], nar }]. Zero lines are
 * dropped; every entry must balance. Returns { headers, rows, md, entries }.
 */
export function journal(entries) {
  const rows = [];
  const clean = entries.map((e, i) => {
    const dr = e.dr.filter(([, x]) => x !== 0);
    const cr = e.cr.filter(([, x]) => x !== 0);
    const d = sum(dr.map(([, x]) => x));
    const c = sum(cr.map(([, x]) => x));
    check(d === c && d > 0, `journal entry ${i + 1} does not balance (${d} vs ${c}): ${e.nar}`);
    for (const [, x] of [...dr, ...cr]) check(x > 0, `journal entry ${i + 1}: negative amount`);
    dr.forEach(([a, x], k) => rows.push([`${k === 0 && entries.length > 1 ? `(${roman(i + 1)}) ` : ''}${a} Dr.`, inr(x), '']));
    cr.forEach(([a, x]) => rows.push([`To ${a}`, '', inr(x)]));
    rows.push([`*(Being ${e.nar})*`, '', '']);
    return { dr, cr, total: d, nar: e.nar };
  });
  const headers = ['Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, entries: clean, md: mdTable(headers, rows, [1, 2]) };
}

/** Two-sided ledger account (To / By); the two sides must total the same. */
export function tAccount(dr, cr) {
  dr = dr.filter(([, x]) => x !== 0);
  cr = cr.filter(([, x]) => x !== 0);
  for (const [l, x] of [...dr, ...cr]) check(x > 0, `ledger line ${l} is ${x}`);
  const td = sum(dr.map(([, x]) => x));
  const tc = sum(cr.map(([, x]) => x));
  check(td === tc, `account does not balance (${td} vs ${tc})`);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([to(dr[i]?.[0]), amt(dr[i]?.[1]), by(cr[i]?.[0]), amt(cr[i]?.[1])]);
  rows.push(['**Total**', `**${inr(td)}**`, '**Total**', `**${inr(tc)}**`]);
  const headers = ['Dr. Particulars', '₹', 'Cr. Particulars', '₹'];
  return { headers, rows, total: td, md: mdTable(headers, rows, [1, 3]) };
}

/** Balance sheet in horizontal form: liabilities and assets = [[label, amount]]; the totals must agree. */
export function balanceSheet(liabs, assets) {
  liabs = liabs.filter(([, x]) => x !== 0);
  assets = assets.filter(([, x]) => x !== 0);
  for (const [l, x] of [...liabs, ...assets]) check(x > 0, `balance sheet line ${l} is ${x}`);
  const tl = sum(liabs.map(([, x]) => x));
  const ta = sum(assets.map(([, x]) => x));
  check(tl === ta, `balance sheet does not balance (${tl} vs ${ta})`);
  const n = Math.max(liabs.length, assets.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([liabs[i]?.[0] ?? '', amt(liabs[i]?.[1]), assets[i]?.[0] ?? '', amt(assets[i]?.[1])]);
  rows.push(['**Total**', `**${inr(tl)}**`, '**Total**', `**${inr(ta)}**`]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { total: tl, headers, rows, md: mdTable(headers, rows, [1, 3]) };
}

/**
 * Columnar capital accounts closed at nil through the Bank (or Cash) Account.
 * dr / cr: [[label, { partner: amount }]…]. A credit balance is paid out (debit side "Bank A/c");
 * a debit balance is made good by the partner bringing in cash (credit side "Bank A/c (cash brought in)").
 */
export function settleCapitals(names, { dr = [], cr = [] }, bankAcc = 'Bank A/c') {
  const tot = (rows, p) => sum(rows.map(([, m]) => m[p] ?? 0));
  const balance = Object.fromEntries(names.map((p) => [p, tot(cr, p) - tot(dr, p)]));
  const pay = Object.fromEntries(names.filter((p) => balance[p] > 0).map((p) => [p, balance[p]]));
  const bring = Object.fromEntries(names.filter((p) => balance[p] < 0).map((p) => [p, -balance[p]]));
  const drAll = [...dr, ...(Object.keys(pay).length ? [[bankAcc, pay]] : [])].filter(([, m]) => names.some((p) => m[p]));
  const crAll = [...cr, ...(Object.keys(bring).length ? [[`${bankAcc} (cash brought in)`, bring]] : [])].filter(([, m]) => names.some((p) => m[p]));
  for (const p of names) check(tot(drAll, p) === tot(crAll, p), `${p}'s capital account does not close at nil`);
  for (const [l, m] of [...drAll, ...crAll]) for (const p of names) check((m[p] ?? 0) >= 0, `capital line ${l} for ${p} is negative`);
  const n = Math.max(drAll.length, crAll.length);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const a = drAll[i];
    const b = crAll[i];
    rows.push([to(a?.[0]), ...names.map((p) => amt(a?.[1][p])), by(b?.[0]), ...names.map((p) => amt(b?.[1][p]))]);
  }
  rows.push(['**Total**', ...names.map((p) => `**${inr(tot(drAll, p))}**`), '**Total**', ...names.map((p) => `**${inr(tot(crAll, p))}**`)]);
  const headers = ['Dr. Particulars', ...names.map((p) => `${p} (₹)`), 'Cr. Particulars', ...names.map((p) => `${p} (₹)`)];
  const numCols = [...names.map((_, i) => i + 1), ...names.map((_, i) => names.length + 2 + i)];
  return { balance, pay, bring, headers, rows, md: mdTable(headers, rows, numCols) };
}

// ---------------------------------------------------------------- Section 48
/**
 * Settlement under Section 48 of the Indian Partnership Act, 1932, once every asset is realised.
 * cash = what the firm holds; outside = debts to third parties; loans = { partner: advance };
 * capitals = { partner: amount }; ratio = profit-sharing ratio (whole numbers, partner order).
 * The shortfall (loss) is borne in the profit-sharing ratio; the cash is then applied to outside debts,
 * partners' loans and capitals, in that order. Every payment must be covered and the cash used exactly.
 */
export function section48({ cash, outside, loans = {}, capitals, ratio }) {
  const names = Object.keys(capitals);
  const loanTotal = sum(Object.values(loans));
  const claims = outside + loanTotal + sum(Object.values(capitals));
  const loss = claims - cash;
  check(loss > 0, 'section48 example should show a loss');
  check(cash >= outside + loanTotal, 'cash must cover outside debts and loans');
  const part = splitRatio(loss, names, ratio);
  const capPay = Object.fromEntries(names.map((p) => [p, capitals[p] - part[p]]));
  for (const p of names) check(capPay[p] > 0, `${p}'s capital is wiped out (choose other figures)`);
  check(outside + loanTotal + sum(Object.values(capPay)) === cash, 'section48 payments do not use the cash exactly');
  return { names, claims, loss, part, capPay, loanTotal, cash, outside, loans, capitals };
}

// ---------------------------------------------------------------- dissolution
/**
 * Realisation Account from its entries. rDr / rCr: [[label, amount]…] (labels without To / By).
 * The balance is a profit (credit total exceeds debit total) or a loss, shared in the ratio and closed
 * to the partners' capital accounts. Returns the ledger plus result (+ profit / − loss) and the shares.
 */
export function realisation(rDr, rCr, names, ratio) {
  const drTotal = sum(rDr.map(([, v]) => v));
  const crTotal = sum(rCr.map(([, v]) => v));
  const result = crTotal - drTotal;
  check(result !== 0, 'realisation shows neither profit nor loss: choose other figures');
  const part = splitRatio(Math.abs(result), names, ratio);
  const resRows = names.map((p) => [`${p}'s Capital A/c (${result > 0 ? 'profit' : 'loss'})`, part[p]]);
  return { result, part, drTotal, crTotal, ...tAccount(result > 0 ? [...rDr, ...resRows] : rDr, result < 0 ? [...rCr, ...resRows] : rCr) };
}

/**
 * A complete dissolution, simulated from the (memorandum) balance sheet and the events.
 *   names, ratio                       partners and profit-sharing ratio (whole numbers)
 *   bankName                           'Bank' or 'Cash'; bank = opening debit balance; overdraft = bank overdraft
 *   assets      [[asset, book]]        transferred to the debit of Realisation (gross)
 *   provisions  [[label, amount, asset]]  deducted from the asset in the balance sheet; credited to Realisation
 *   funds       [[label, amount]]      fund or reserve related to an asset or liability (ISC note): credited to Realisation
 *   liabilities [[liability, amount]]  outside liabilities incl. a bank loan: credited to Realisation
 *   loans       { partner: amount }    loans from partners: repaid through the Bank/Cash Account
 *   loansTo     { partner: amount }    loans to partners (asset): debited to the partner's capital
 *   capitals    { partner: amount };   currents { partner: ± amount } (fixed capitals: closed to capitals)
 *   reserves    [[account, amount, bsLabel?]]  general reserve, profit and loss credit: credited to capitals
 *   losses      [[account, amount, bsLabel?]]  profit and loss debit, deferred revenue expenditure: debited to capitals
 *   sold        [[asset, cash, label?]]        Bank Dr, To Realisation (unrecorded assets start "unrecorded")
 *   atBook      [asset]                        silent tangible asset or investment: realised at book value
 *   takenOver   [[asset, partner, value]]      Partner's Capital Dr, To Realisation
 *   toCreditor  [[asset, liability, cash]]     a creditor accepts the asset (plus `cash`): only the cash is entered
 *   worthless   [asset]                        realises nothing (silent intangibles, prepaid expenses)
 *   paid        [[item, cash, label?]]         Realisation Dr, To Bank (liabilities, unrecorded liabilities, expenses)
 *   paidInFull  [liability]                    silent liability: paid at book value
 *   assumed     [[item, partner, amount, kind]] Realisation Dr, To Partner's Capital
 *   charged     [[item, partner, cash]]        Partner's Capital Dr, To Bank (expense he must bear, paid by the firm)
 */
export function dissolve(s) {
  const { names, ratio, bank = 0, overdraft = 0, bankName = 'Bank', assets = [], provisions = [], funds = [], liabilities = [], loans = {}, loansTo = {}, capitals, currents = {}, reserves = [], losses = [] } = s;
  const { sold: sold0 = [], atBook = [], takenOver = [], toCreditor = [], worthless = [], paid: paid0 = [], paidInFull = [], assumed = [], charged = [] } = s;
  check(!(bank && overdraft), 'give a bank balance or an overdraft, not both');
  const B = `${bankName} A/c`;
  const cap = (p) => `${p}'s Capital A/c`;
  const book = Object.fromEntries(assets.map(([a, v]) => [a, v]));
  const liab = Object.fromEntries(liabilities.map(([l, v]) => [l, v]));
  const sold = [...sold0, ...atBook.map((a) => { check(a in book, `atBook: unknown asset ${a}`); return [a, book[a], `${B} (${a} realised at book value)`]; })];
  const paid = [...paid0, ...paidInFull.map((l) => { check(l in liab, `paidInFull: unknown liability ${l}`); return [l, liab[l]]; })];
  check(names.length === ratio.length, 'names and ratio differ');

  // Opening (memorandum) balance sheet.
  const provFor = Object.fromEntries(provisions.map(([l, v, a]) => [a, [l, v]]));
  for (const [, , a] of provisions) check(a in book, `provision against unknown asset ${a}`);
  const BS = balanceSheet(
    [
      ...liabilities,
      ...(overdraft ? [['Bank Overdraft', overdraft]] : []),
      ...Object.entries(loans).map(([p, v]) => [`${p}'s Loan`, v]),
      ...funds,
      ...reserves.map(([a, v, l]) => [l ?? a, v]),
      ...names.map((p) => [`Capital: ${p}`, capitals[p]]),
      ...names.filter((p) => (currents[p] ?? 0) > 0).map((p) => [`Current Account: ${p}`, currents[p]]),
    ],
    [
      ...assets.map(([a, v]) => (provFor[a] ? [`${a} ${inr(v)} less ${provFor[a][0]} ${inr(provFor[a][1])}`, v - provFor[a][1]] : [a, v])),
      ...Object.entries(loansTo).map(([p, v]) => [`Loan to ${p}`, v]),
      ...(bank ? [[bankName === 'Bank' ? 'Bank' : 'Cash in Hand', bank]] : []),
      ...names.filter((p) => (currents[p] ?? 0) < 0).map((p) => [`Current Account: ${p} (debit balance)`, -currents[p]]),
      ...losses.map(([a, v, l]) => [l ?? a, v]),
    ],
  );

  // Disposal and settlement tracking.
  const disposed = new Map();
  const dispose = (a) => {
    if (a in book) {
      check(!disposed.has(a), `asset ${a} disposed of twice`);
      disposed.set(a, true);
    } else check(/unrecorded/i.test(a), `unknown asset "${a}" (prefix unrecorded assets with "unrecorded")`);
  };
  const settled = new Set();
  const settle = (l) => {
    if (l in liab) {
      check(!settled.has(l), `liability ${l} settled twice`);
      settled.add(l);
    }
  };

  // Realisation Account.
  const rDr = assets.map(([a, v]) => [`${a} A/c`, v]);
  const rCr = [...provisions.map(([l, v]) => [`${l} A/c`, v]), ...funds.map(([l, v]) => [`${l} A/c`, v]), ...liabilities.map(([l, v]) => [`${l} A/c`, v])];
  for (const [a, cash, label] of sold) { dispose(a); rCr.push([label ?? `${B} (${a.replace(/^unrecorded /i, '')} ${/unrecorded/i.test(a) ? 'sold' : 'realised'})`, cash]); }
  for (const [a, p, v] of takenOver) { dispose(a); rCr.push([`${cap(p)} (${a.replace(/^unrecorded /i, '')} taken over)`, v]); }
  for (const [a, l, cash] of toCreditor) {
    dispose(a);
    check(l in liab, `toCreditor: unknown liability ${l}`);
    settle(l);
    if (cash) rDr.push([`${B} (${l} paid in cash)`, cash]);
  }
  for (const a of worthless) dispose(a);
  for (const [item, cash, label] of paid) { settle(item); rDr.push([label ?? `${B} (${item.replace(/^unrecorded /i, '')} paid)`, cash]); }
  for (const [item, p, v, kind] of assumed) { settle(item); rDr.push([`${cap(p)} (${kind ?? item})`, v]); }
  for (const [a] of assets) check(disposed.has(a), `asset ${a} is never disposed of`);
  for (const [l] of liabilities) check(settled.has(l), `liability ${l} is never settled`);
  const RA = realisation(rDr, rCr, names, ratio);
  const { result, part } = RA;

  // Partners' capital accounts.
  const byP = (rows, pi, vi) => {
    const m = {};
    for (const r of rows) m[r[pi]] = (m[r[pi]] ?? 0) + r[vi];
    return m;
  };
  const group = (rows, labelOf, pi, vi) => {
    const out = new Map();
    for (const r of rows) {
      const l = labelOf(r);
      const m = out.get(l) ?? {};
      m[r[pi]] = (m[r[pi]] ?? 0) + r[vi];
      out.set(l, m);
    }
    return [...out.entries()];
  };
  const curPos = Object.fromEntries(names.filter((p) => (currents[p] ?? 0) > 0).map((p) => [p, currents[p]]));
  const curNeg = Object.fromEntries(names.filter((p) => (currents[p] ?? 0) < 0).map((p) => [p, -currents[p]]));
  const capDr = [
    ...(Object.keys(curNeg).length ? [['Current A/c (debit balance)', curNeg]] : []),
    ...Object.entries(loansTo).map(([p, v]) => [`Loan to ${p} A/c`, { [p]: v }]),
    ...losses.map(([a, v]) => [`${a} A/c`, splitRatio(v, names, ratio)]),
    ...(takenOver.length ? [['Realisation A/c (assets taken over)', byP(takenOver, 1, 2)]] : []),
    ...(result < 0 ? [['Realisation A/c (loss)', part]] : []),
    ...group(charged, ([item]) => `${B} (${item})`, 1, 2),
  ];
  const capCr = [
    ['Balance b/d', capitals],
    ...(Object.keys(curPos).length ? [['Current A/c', curPos]] : []),
    ...reserves.map(([a, v]) => [`${a} A/c`, splitRatio(v, names, ratio)]),
    ...(result > 0 ? [['Realisation A/c (profit)', part]] : []),
    ...group(assumed, ([item, , , kind]) => `Realisation A/c (${kind ?? item})`, 1, 2),
  ];
  const CA = settleCapitals(names, { dr: capDr, cr: capCr }, B);

  // Partners' loan accounts.
  const LOANS = Object.fromEntries(Object.entries(loans).map(([p, v]) => [p, tAccount([[B, v]], [['Balance b/d', v]])]));

  // Bank (or Cash) Account: must close at nil.
  const soldTotal = sum(sold.map(([, v]) => v));
  const liabPaid = paid.filter(([i]) => i in liab);
  const otherPaid = paid.filter(([i]) => !(i in liab));
  const creditorCash = sum(toCreditor.map(([, , c]) => c));
  const liabCash = sum(liabPaid.map(([, v]) => v)) + creditorCash;
  const bDr = [
    ...(bank ? [['Balance b/d', bank]] : []),
    ...(soldTotal ? [['Realisation A/c (assets realised)', soldTotal]] : []),
    ...Object.entries(CA.bring).map(([p, v]) => [`${cap(p)} (cash brought in)`, v]),
  ];
  const bCr = [
    ...(overdraft ? [['Balance b/d (bank overdraft)', overdraft]] : []),
    ...(liabCash ? [['Realisation A/c (liabilities paid)', liabCash]] : []),
    ...otherPaid.map(([item, v]) => [`Realisation A/c (${item.replace(/^unrecorded /i, '')} paid)`, v]),
    ...charged.map(([item, p, v]) => [`${cap(p)} (${item})`, v]),
    ...Object.entries(loans).map(([p, v]) => [`${p}'s Loan A/c`, v]),
    ...Object.entries(CA.pay).map(([p, v]) => [cap(p), v]),
  ];
  const BANK = tAccount(bDr, bCr);

  // Journal of the whole dissolution, in the usual order.
  const E = [];
  const capRows = (m) => Object.entries(m).filter(([, v]) => v).map(([p, v]) => [cap(p), v]);
  const crSide = [...provisions, ...funds, ...liabilities];
  E.push({ dr: [['Realisation A/c', sum(assets.map(([, v]) => v))]], cr: assets.map(([a, v]) => [`${a} A/c`, v]), nar: 'assets transferred to the Realisation Account' });
  if (crSide.length) E.push({ dr: crSide.map(([l, v]) => [`${l} A/c`, v]), cr: [['Realisation A/c', sum(crSide.map(([, v]) => v))]], nar: `${provisions.length || funds.length ? 'related provisions and funds and ' : ''}outside liabilities transferred to the Realisation Account` });
  if (soldTotal) E.push({ dr: [[B, soldTotal]], cr: [['Realisation A/c', soldTotal]], nar: 'assets realised' });
  for (const [p, v] of Object.entries(byP(takenOver, 1, 2))) E.push({ dr: [[cap(p), v]], cr: [['Realisation A/c', v]], nar: `assets taken over by ${p}` });
  if (liabCash) E.push({ dr: [['Realisation A/c', liabCash]], cr: [[B, liabCash]], nar: 'outside liabilities paid' });
  for (const [item, v] of otherPaid) E.push({ dr: [['Realisation A/c', v]], cr: [[B, v]], nar: `${item.replace(/^unrecorded /i, '')} paid` });
  for (const [item, p, v, kind] of assumed) E.push({ dr: [['Realisation A/c', v]], cr: [[cap(p), v]], nar: `${kind ?? item} credited to ${p}` });
  for (const [item, p, v] of charged) E.push({ dr: [[cap(p), v]], cr: [[B, v]], nar: `${item} paid by the firm on behalf of ${p}` });
  if (Object.keys(curPos).length) E.push({ dr: Object.entries(curPos).map(([p, v]) => [`${p}'s Current A/c`, v]), cr: capRows(curPos), nar: 'credit balances of current accounts transferred to capital accounts' });
  if (Object.keys(curNeg).length) E.push({ dr: capRows(curNeg), cr: Object.entries(curNeg).map(([p, v]) => [`${p}'s Current A/c`, v]), nar: 'debit balances of current accounts transferred to capital accounts' });
  for (const [a, v] of reserves) E.push({ dr: [[`${a} A/c`, v]], cr: capRows(splitRatio(v, names, ratio)), nar: `${a.toLowerCase()} distributed in the profit-sharing ratio` });
  for (const [a, v] of losses) E.push({ dr: capRows(splitRatio(v, names, ratio)), cr: [[`${a} A/c`, v]], nar: `${a.toLowerCase()} written off in the profit-sharing ratio` });
  for (const [p, v] of Object.entries(loansTo)) E.push({ dr: [[cap(p), v]], cr: [[`Loan to ${p} A/c`, v]], nar: `loan to ${p} transferred to his capital account` });
  if (result > 0) E.push({ dr: [['Realisation A/c', result]], cr: capRows(part), nar: 'profit on realisation shared' });
  else E.push({ dr: capRows(part), cr: [['Realisation A/c', -result]], nar: 'loss on realisation shared' });
  for (const [p, v] of Object.entries(loans)) E.push({ dr: [[`${p}'s Loan A/c`, v]], cr: [[B, v]], nar: `${p}'s loan repaid` });
  for (const [p, v] of Object.entries(CA.bring)) E.push({ dr: [[B, v]], cr: [[cap(p), v]], nar: `cash brought in by ${p} to make good the debit balance` });
  if (Object.keys(CA.pay).length) E.push({ dr: capRows(CA.pay), cr: [[B, sum(Object.values(CA.pay))]], nar: 'final payment to partners' });
  const J = journal(E);

  return { BS, RA, CA, LOANS, BANK, J, B, soldTotal, liabCash, sold, paid };
}

// ---------------------------------------------------------------- words for narration
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
/** Indian number words: 120000 → "one lakh twenty thousand". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words: ${n}`);
  if (n === 0) return 'zero';
  const out = [];
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor(n / 1e5) % 100;
  const th = Math.floor(n / 1000) % 100;
  const h = Math.floor(n / 100) % 10;
  const r = n % 100;
  if (crore) out.push(`${words(crore)} crore`);
  if (lakh) out.push(`${two(lakh)} lakh`);
  if (th) out.push(`${two(th)} thousand`);
  if (h) out.push(`${ONES[h]} hundred`);
  if (r) out.push(two(r));
  return out.join(' ');
}
/** "rupees one lakh twenty thousand" */
export const rw = (n) => `rupees ${words(n)}`;
/** Ratio words: [3, 2, 1] → "three to two to one". */
export const ratioWords = (ints) => ints.map((x) => words(x)).join(' to ');
