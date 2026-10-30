// Accounting helpers for CBSE 12 Accountancy ch05 (Dissolution of a Partnership Firm).
// Every figure in the chapter is computed here and every statement is checked: journal entries
// balance, the Realisation Account, loan, capital and Bank/Cash accounts balance, the opening balance
// sheet totals, every asset of the firm is disposed of and every outside liability is settled, every
// partner's capital account closes at nil and the Bank (or Cash) Account closes at nil. Any mismatch
// throws, so the build stops. Tables are rendered FROM the computed values (Indian digit grouping), so
// no figure is typed twice. The generic helpers (numbers, words, fractions, journal, ledger, balance
// sheet) are the same as in ch04; dissolve() and realisation() are new for this chapter.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; throws on a non-integer amount (every figure must be whole rupees). */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(−) ${IN.format(-n)}` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => `₹${fig(n)}`;
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

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

// ---------------------------------------------------------------- fractions and ratios
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

export class Fr {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  add(o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); }
  eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
  /** Share of an amount; must be whole rupees. */
  of(amount) {
    const v = (amount * this.n) / this.d;
    check(Number.isInteger(v), `${this} of ${amount} is not whole rupees (${v})`);
    return v;
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => (n instanceof Fr ? n : new Fr(n, d));
export const sumFr = (xs) => xs.reduce((a, b) => a.add(b), F(0));

/** Shares from ratio parts: (['A','B'], [3,2]) -> { A: 3/5, B: 2/5 }. */
export function shares(names, parts) {
  check(names.length === parts.length, 'shares: names and parts differ');
  const s = sum(parts);
  const out = Object.fromEntries(names.map((p, i) => [p, F(parts[i], s)]));
  check(sumFr(Object.values(out)).eq(1), 'shares add to 1');
  return out;
}
/** "3:2:1" from shares. */
export function ratioOf(sh) {
  const fr = Object.values(sh);
  const L = fr.reduce((m, f) => (m / gcd(m, f.d)) * f.d, 1);
  const ints = fr.map((f) => (f.n * L) / f.d);
  const g = ints.reduce((m, x) => gcd(m, x), 0) || 1;
  return ints.map((x) => x / g).join(':');
}

/** Split an amount by shares; every part is whole rupees and the parts add back to the amount. */
export function split(amount, sh) {
  const out = Object.fromEntries(Object.entries(sh).map(([p, f]) => [p, f.of(amount)]));
  check(sum(Object.values(out)) === amount, `split of ${amount} does not add back`);
  return out;
}
/** x% of an amount, whole rupees only. */
export const pctOf = (p, amount) => F(p, 100).of(amount);

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const cell = (v) => (v === undefined || v === null || v === 0 ? '—' : fig(v));
const bold = (s) => `**${s}**`;

/**
 * Journal. entries: [{ date?, dr: [[account, amount]…], cr: [[account, amount]…], nar }].
 * Each entry must balance. Account names are written in full ("Asha's Capital A/c").
 */
export function journal(entries) {
  const dated = entries.some((e) => e.date);
  const rows = [];
  for (const e of entries) {
    const d = sum(e.dr.map(([, v]) => v));
    const c = sum(e.cr.map(([, v]) => v));
    check(d === c, `journal entry "${e.nar}" debits ${d} ≠ credits ${c}`);
    for (const [, v] of [...e.dr, ...e.cr]) check(v > 0, `journal amount ${v} in "${e.nar}"`);
    const pre = (first) => (dated ? [first ? e.date ?? '' : ''] : []);
    e.dr.forEach(([a, v], i) => rows.push([...pre(i === 0), `${a} Dr`, fig(v), '']));
    e.cr.forEach(([a, v]) => rows.push([...pre(false), `To ${a}`, '', fig(v)]));
    rows.push([...pre(false), `*(Being ${e.nar})*`, '', '']);
  }
  const headers = [...(dated ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  const n = dated ? [2, 3] : [1, 2];
  return { headers, rows, entries, md: md(headers, rows, n) };
}

/** Two-sided ledger account; "To" on the debit side and "By" on the credit side. Must balance. */
export function ledger(dr, cr) {
  const td = sum(dr.map((r) => r[1]));
  const tc = sum(cr.map((r) => r[1]));
  check(td === tc, `ledger account totals ${td} ≠ ${tc}`);
  for (const [l, v] of [...dr, ...cr]) check(v > 0, `ledger amount ${v} for ${l}`);
  const side = (r, pre) => (r ? [`${pre} ${r[0]}`, fig(r[1])] : ['', '']);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([...side(dr[i], 'To'), ...side(cr[i], 'By')]);
  rows.push([bold('Total'), bold(fig(td)), bold('Total'), bold(fig(tc))]);
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { headers, rows, total: td, md: md(headers, rows, [1, 3]) };
}

/** Balance sheet: liab / assets = [[label, amount]…]; the two sides must total the same. */
export function balanceSheet(liab, assets) {
  const tl = sum(liab.map(([, v]) => v));
  const ta = sum(assets.map(([, v]) => v));
  check(tl === ta, `balance sheet does not balance: liabilities ${tl}, assets ${ta}`);
  const n = Math.max(liab.length, assets.length);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const l = liab[i];
    const a = assets[i];
    rows.push([l ? l[0] : '', l ? fig(l[1]) : '', a ? a[0] : '', a ? fig(a[1]) : '']);
  }
  rows.push([bold('Total'), bold(fig(tl)), bold('Total'), bold(fig(ta))]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { total: tl, headers, rows, md: md(headers, rows, [1, 3]) };
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
  const drAll = [...dr, ...(Object.keys(pay).length ? [[bankAcc, pay]] : [])];
  const crAll = [...cr, ...(Object.keys(bring).length ? [[`${bankAcc} (cash brought in)`, bring]] : [])];
  for (const p of names) check(tot(drAll, p) === tot(crAll, p), `${p}'s capital account does not close at nil`);
  const n = Math.max(drAll.length, crAll.length);
  const rows = [];
  const side = (r, pre) => (r ? [`${pre} ${r[0]}`, ...names.map((p) => cell(r[1][p]))] : ['', ...names.map(() => '')]);
  for (let i = 0; i < n; i++) rows.push([...side(drAll[i], 'To'), ...side(crAll[i], 'By')]);
  rows.push([bold('Total'), ...names.map((p) => bold(fig(tot(drAll, p)))), bold('Total'), ...names.map((p) => bold(fig(tot(crAll, p))))]);
  const headers = ['Dr: Particulars', ...names, 'Cr: Particulars', ...names];
  const numCols = [...names.map((_, i) => i + 1), ...names.map((_, i) => names.length + 2 + i)];
  return { balance, pay, bring, headers, rows, md: md(headers, rows, numCols) };
}

// ---------------------------------------------------------------- realisation
/**
 * Realisation Account from its entries. dr / cr: [[label, amount]…] (labels without "To"/"By").
 * The balance is a profit (credit total exceeds debit total) or a loss, shared by `sh` and closed to
 * the partners' capital accounts. Returns the ledger plus result (+ profit / − loss) and the shares.
 */
export function realisation(dr, cr, sh) {
  const result = sum(cr.map(([, v]) => v)) - sum(dr.map(([, v]) => v));
  check(result !== 0, 'realisation shows neither profit nor loss: choose other figures');
  const part = split(Math.abs(result), sh);
  const rows = Object.entries(part).map(([p, v]) => [`${p}'s Capital A/c (${result > 0 ? 'profit' : 'loss'})`, v]);
  const t = ledger(result > 0 ? [...dr, ...rows] : dr, result < 0 ? [...cr, ...rows] : cr);
  const signed = Object.fromEntries(Object.entries(part).map(([p, v]) => [p, result > 0 ? v : -v]));
  return { result, part, signed, drTotal: sum(dr.map(([, v]) => v)), crTotal: sum(cr.map(([, v]) => v)), ...t };
}

/**
 * A complete dissolution, simulated from the balance sheet and the events.
 *   names, sh                         partners and profit-sharing shares
 *   bankName                          'Bank' or 'Cash'; bank = opening balance
 *   assets      [[asset, book]]       transferred to the debit of Realisation (gross)
 *   provisions  [[provision, amount, asset]]  credited to Realisation (shown as a deduction in the balance sheet)
 *   liabilities [[liability, amount]] outside liabilities, credited to Realisation
 *   loans       { partner: amount }   partners' loans: paid after outside liabilities, never via Realisation
 *   capitals    { partner: amount };  currents { partner: ± amount } (fixed capitals)
 *   reserves    [[account, amount, bsLabel?]]  credited to capitals in the profit-sharing ratio
 *   losses      [[account, amount, bsLabel?]]  fictitious assets / accumulated losses, debited to capitals
 *   sold        [[asset, cash, label?]]        Bank Dr, To Realisation (unrecorded assets start "unrecorded")
 *   takenOver   [[asset, partner, value]]      Partner's Capital Dr, To Realisation
 *   toCreditor  [[asset, liability, cash]]     a creditor accepts the asset (plus `cash`, if any): only the cash is entered
 *   worthless   [asset]                        realises nothing
 *   paid        [[item, cash, label?]]         Realisation Dr, To Bank (liabilities, unrecorded liabilities, expenses)
 *   assumed     [[item, partner, amount, kind]] Realisation Dr, To Partner's Capital (liability taken over, expenses paid by him, remuneration)
 *   charged     [[item, partner, cash]]        Partner's Capital Dr, To Bank (expenses the partner must bear but the firm pays)
 * Asserts: opening balance sheet totals; every recorded asset disposed of and every liability settled;
 * Realisation, loan, capital and Bank accounts balance; the Bank Account closes at nil.
 */
export function dissolve(s) {
  const { names, sh, bank = 0, bankName = 'Bank', assets = [], provisions = [], liabilities = [], loans = {}, capitals, currents = {}, reserves = [], losses = [] } = s;
  const { sold = [], takenOver = [], toCreditor = [], worthless = [], paid = [], assumed = [], charged = [] } = s;
  const B = `${bankName} A/c`;
  const cap = (p) => `${p}'s Capital A/c`;
  const assetNames = assets.map(([a]) => a);
  const liabNames = liabilities.map(([l]) => l);
  check(sumFr(Object.values(sh)).eq(1), 'profit-sharing shares add to 1');

  // Opening balance sheet.
  const provFor = Object.fromEntries(provisions.map(([l, v, a]) => [a, [l, v]]));
  const BS = balanceSheet(
    [
      ...liabilities,
      ...Object.entries(loans).map(([p, v]) => [`${p}'s Loan`, v]),
      ...reserves.map(([a, v, l]) => [l ?? a, v]),
      ...names.map((p) => [`Capital: ${p}`, capitals[p]]),
      ...names.filter((p) => (currents[p] ?? 0) > 0).map((p) => [`Current Account: ${p}`, currents[p]]),
    ],
    [
      ...assets.map(([a, v]) => (provFor[a] ? [`${a} ${fig(v)} less ${provFor[a][0]} ${fig(provFor[a][1])}`, v - provFor[a][1]] : [a, v])),
      ...losses.map(([a, v, l]) => [l ?? a, v]),
      ...names.filter((p) => (currents[p] ?? 0) < 0).map((p) => [`Current Account: ${p} (debit balance)`, -currents[p]]),
      ...(bank ? [[bankName, bank]] : []),
    ],
  );

  // Disposal and settlement tracking.
  const disposed = new Map();
  const dispose = (a) => {
    if (assetNames.includes(a)) disposed.set(a, (disposed.get(a) ?? 0) + 1);
    else check(/unrecorded/i.test(a), `unknown asset "${a}" (prefix unrecorded assets with "unrecorded")`);
  };
  const settled = new Set();
  const settle = (l) => liabNames.includes(l) && settled.add(l);

  // Realisation Account.
  const rDr = assets.map(([a, v]) => [`${a} A/c`, v]);
  const rCr = [...provisions.map(([l, v]) => [`${l} A/c`, v]), ...liabilities.map(([l, v]) => [`${l} A/c`, v])];
  for (const [a, cash, label] of sold) { dispose(a); rCr.push([label ?? `${B} (${a} ${/unrecorded/i.test(a) ? 'sold' : 'realised'})`, cash]); }
  for (const [a, p, v] of takenOver) { dispose(a); rCr.push([`${cap(p)} (${a} taken over)`, v]); }
  for (const [a, l, cash] of toCreditor) {
    dispose(a);
    check(liabNames.includes(l), `toCreditor: unknown liability ${l}`);
    settle(l);
    if (cash) rDr.push([`${B} (${l}: balance paid)`, cash]);
  }
  for (const a of worthless) dispose(a);
  for (const [item, cash, label] of paid) { settle(item); rDr.push([label ?? `${B} (${item} paid)`, cash]); }
  for (const [item, p, v, kind] of assumed) { settle(item); rDr.push([`${cap(p)} (${kind ?? item})`, v]); }
  for (const a of assetNames) check(disposed.has(a), `asset ${a} is never disposed of`);
  for (const l of liabNames) check(settled.has(l), `liability ${l} is never settled`);
  const RA = realisation(rDr, rCr, sh);

  // Partners' capital accounts.
  const by = (rows) => {
    const m = {};
    for (const [, p, v] of rows) m[p] = (m[p] ?? 0) + v;
    return m;
  };
  const group = (rows, labelOf) => {
    const out = new Map();
    for (const r of rows) {
      const l = labelOf(r);
      const m = out.get(l) ?? {};
      m[r[1]] = (m[r[1]] ?? 0) + r[2];
      out.set(l, m);
    }
    return [...out.entries()];
  };
  const curPos = Object.fromEntries(names.filter((p) => (currents[p] ?? 0) > 0).map((p) => [p, currents[p]]));
  const curNeg = Object.fromEntries(names.filter((p) => (currents[p] ?? 0) < 0).map((p) => [p, -currents[p]]));
  const capDr = [
    ...(Object.keys(curNeg).length ? [['Current A/c', curNeg]] : []),
    ...losses.map(([a, v]) => [`${a} A/c`, split(v, sh)]),
    ...(takenOver.length ? [['Realisation A/c (assets taken over)', by(takenOver)]] : []),
    ...(RA.result < 0 ? [['Realisation A/c (loss)', RA.part]] : []),
    ...group(charged, ([item]) => `${B} (${item})`),
  ];
  const capCr = [
    ['Balance b/d', capitals],
    ...(Object.keys(curPos).length ? [['Current A/c', curPos]] : []),
    ...reserves.map(([a, v]) => [`${a} A/c`, split(v, sh)]),
    ...(RA.result > 0 ? [['Realisation A/c (profit)', RA.part]] : []),
    ...group(assumed, ([item, , , kind]) => `Realisation A/c (${kind ?? item})`),
  ];
  const CA = settleCapitals(names, { dr: capDr, cr: capCr }, B);

  // Partners' loan accounts.
  const LOANS = Object.fromEntries(Object.entries(loans).map(([p, v]) => [p, ledger([[B, v]], [['Balance b/d', v]])]));

  // Bank (or Cash) Account: must close at nil.
  const soldTotal = sum(sold.map(([, v]) => v));
  const liabPaid = paid.filter(([i]) => liabNames.includes(i));
  const otherPaid = paid.filter(([i]) => !liabNames.includes(i));
  const creditorCash = sum(toCreditor.map(([, , c]) => c));
  const bDr = [
    ...(bank ? [['Balance b/d', bank]] : []),
    ...(soldTotal ? [['Realisation A/c (assets realised)', soldTotal]] : []),
    ...Object.entries(CA.bring).map(([p, v]) => [`${cap(p)} (cash brought in)`, v]),
  ];
  const liabCash = sum(liabPaid.map(([, v]) => v)) + creditorCash;
  const bCr = [
    ...(liabCash ? [['Realisation A/c (liabilities paid)', liabCash]] : []),
    ...otherPaid.map(([item, v]) => [`Realisation A/c (${item})`, v]),
    ...charged.map(([item, p, v]) => [`${cap(p)} (${item})`, v]),
    ...Object.entries(loans).map(([p, v]) => [`${p}'s Loan A/c`, v]),
    ...Object.entries(CA.pay).map(([p, v]) => [cap(p), v]),
  ];
  const BANK = ledger(bDr, bCr);

  // Journal of the whole dissolution, in the usual order.
  const E = [];
  const capRows = (m) => Object.entries(m).filter(([, v]) => v).map(([p, v]) => [cap(p), v]);
  E.push({ dr: [['Realisation A/c', sum(assets.map(([, v]) => v))]], cr: assets.map(([a, v]) => [`${a} A/c`, v]), nar: 'assets transferred to the Realisation Account' });
  if (provisions.length || liabilities.length) E.push({ dr: [...provisions.map(([l, v]) => [`${l} A/c`, v]), ...liabilities.map(([l, v]) => [`${l} A/c`, v])], cr: [['Realisation A/c', sum([...provisions, ...liabilities].map(([, v]) => v))]], nar: `${provisions.length ? 'provision and ' : ''}outside liabilities transferred to the Realisation Account` });
  if (soldTotal) E.push({ dr: [[B, soldTotal]], cr: [['Realisation A/c', soldTotal]], nar: 'assets realised' });
  for (const [p, v] of Object.entries(by(takenOver))) E.push({ dr: [[cap(p), v]], cr: [['Realisation A/c', v]], nar: `assets taken over by ${p}` });
  if (liabCash) E.push({ dr: [['Realisation A/c', liabCash]], cr: [[B, liabCash]], nar: 'outside liabilities paid' });
  for (const [item, v] of otherPaid) E.push({ dr: [['Realisation A/c', v]], cr: [[B, v]], nar: `${item} paid` });
  for (const [item, p, v, kind] of assumed) E.push({ dr: [['Realisation A/c', v]], cr: [[cap(p), v]], nar: `${kind ?? item} credited to ${p}` });
  for (const [item, p, v] of charged) E.push({ dr: [[cap(p), v]], cr: [[B, v]], nar: `${item} paid by the firm on behalf of ${p}` });
  if (Object.keys(curPos).length) E.push({ dr: Object.entries(curPos).map(([p, v]) => [`${p}'s Current A/c`, v]), cr: capRows(curPos), nar: 'credit balances of current accounts transferred to capital accounts' });
  if (Object.keys(curNeg).length) E.push({ dr: capRows(curNeg), cr: Object.entries(curNeg).map(([p, v]) => [`${p}'s Current A/c`, v]), nar: 'debit balances of current accounts transferred to capital accounts' });
  for (const [a, v] of reserves) E.push({ dr: [[`${a} A/c`, v]], cr: capRows(split(v, sh)), nar: `${a.toLowerCase().startsWith('profit') ? 'accumulated profit' : a.toLowerCase()} distributed in the profit-sharing ratio` });
  for (const [a, v] of losses) E.push({ dr: capRows(split(v, sh)), cr: [[`${a} A/c`, v]], nar: `${a.toLowerCase().startsWith('profit') ? 'accumulated loss' : a.toLowerCase()} written off in the profit-sharing ratio` });
  if (RA.result > 0) E.push({ dr: [['Realisation A/c', RA.result]], cr: capRows(RA.part), nar: 'profit on realisation shared' });
  else E.push({ dr: capRows(RA.part), cr: [['Realisation A/c', -RA.result]], nar: 'loss on realisation shared' });
  for (const [p, v] of Object.entries(loans)) E.push({ dr: [[`${p}'s Loan A/c`, v]], cr: [[B, v]], nar: `${p}'s loan repaid` });
  for (const [p, v] of Object.entries(CA.bring)) E.push({ dr: [[B, v]], cr: [[cap(p), v]], nar: `cash brought in by ${p} to make good the debit balance` });
  if (Object.keys(CA.pay).length) E.push({ dr: capRows(CA.pay), cr: [[B, sum(Object.values(CA.pay))]], nar: 'final payment to partners' });
  const J = journal(E);

  return { BS, RA, CA, LOANS, BANK, J, B, soldTotal, liabCash };
}
