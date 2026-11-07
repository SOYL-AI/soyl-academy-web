// Chapter helpers for CBSE 11 Accountancy ch06 (Trial Balance and Rectification of Errors). Extends the shared acc.mjs:
// an account registry (so every balance sits on its natural side), an error model (what should have been posted
// against what was posted), the effect of each error on the trial balance and on net profit, rectification before the
// trial balance (explanatory entry or journal entry) and after it (suspense account), and the corrected trial balance.
// Every result is asserted: the correct balances agree, the books disagree by exactly the sum of the one-sided errors,
// the suspense account closes, the corrected balances equal the correct ones, and the stated profit effect equals the
// computed effect. Imagined firms only.
import { same, check, sum, inr, rs, words, rupees, mdTable, journal, ledger, trialBalance } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

export { same, check, sum, inr, rs, words, rupees, mdTable, journal, ledger, trialBalance };

// ---------------------------------------------------------------- account registry
const NATURAL = { asset: 'dr', stock: 'dr', exp: 'dr', drawings: 'dr', debtor: 'dr', liab: 'cr', capital: 'cr', rev: 'cr', creditor: 'cr', prov: 'cr' };
const CLS = new Map();
/** Registers account names (without "A/c") under a class: asset, stock, exp, drawings, debtor, liab, capital, rev, creditor, prov. */
export function reg(klass, ...names) {
  check(NATURAL[klass], `unknown class ${klass}`);
  for (const n of names) {
    check(!CLS.has(n) || CLS.get(n) === klass, `account ${n} registered twice with different classes`);
    CLS.set(n, klass);
  }
}
reg('asset', 'Cash', 'Cash in hand', 'Cash at bank', 'Bank', 'Furniture', 'Plant and machinery', 'Machinery', 'Computer', 'Building', 'Vehicle', 'Land', 'Bills receivable', 'Prepaid insurance', 'Loan to Sachin');
reg('stock', 'Opening stock');
reg('exp', 'Purchases', 'Wages', 'Salaries', 'Rent', 'Repairs', 'Carriage inwards', 'Carriage outwards', 'Insurance', 'Advertisement', 'Telephone', 'Sales returns', 'Discount allowed', 'Postage', 'Electricity', 'Bad debts', 'Interest paid', 'Freight', 'Printing', 'Travelling');
reg('drawings', 'Drawings');
reg('debtor', 'Debtors', 'Kiran Rao', 'Sonal Dutt', 'Anand Pillai', 'Rohit Sen', 'Devika Nair', 'Farhan Ali', 'Gita Menon', 'Harish Goyal', 'Imran Shaikh', 'Jaya Bhatt', 'Kamal Arora', 'Lata Iyer', 'Manoj Pandey', 'Nisha Verma');
reg('liab', 'Bank loan', 'Outstanding wages', 'Bank overdraft', 'Loan from Rekha');
reg('capital', 'Capital');
reg('rev', 'Sales', 'Commission received', 'Discount received', 'Interest received', 'Rent received', 'Purchases returns');
reg('creditor', 'Creditors', 'Mehta Cloth House', 'Bose Fabrics', 'Joshi Leather', 'Verma Traders', 'Pillai Paper', 'Quadri Suppliers', 'Rao Hardware', 'Saha Textiles', 'Tandon Mills', 'Uday Agencies', 'Vohra Stores');
reg('prov', 'Provision for doubtful debts');

const cls = (a) => {
  const k = CLS.get(a);
  check(k, `account "${a}" is not registered (reg())`);
  return k;
};
const sgn = (s) => (s === 'dr' ? 1 : s === 'cr' ? -1 : check(false, `bad side ${s}`));
const isPL = (a) => ['exp', 'rev'].includes(cls(a));
/** Journal name of an account. */
const SMALL = new Set(['and', 'of', 'for', 'at', 'in', 'to', 'the']);
export const ac = (a) => `${a.split(' ').map((w, i) => (i > 0 && SMALL.has(w) ? w : w[0].toUpperCase() + w.slice(1))).join(' ')} A/c`;
const SUSP = 'Suspense A/c';

// ---------------------------------------------------------------- correct trial balance
/**
 * balances: [[account, amount]] on each account's natural side. Returns { signed: [[account, ±amount]], tb } where
 * signed is debit-positive, and tb is the agreed trial balance (asserted).
 */
export function correct(balances) {
  const signed = balances.map(([a, x]) => [a, (NATURAL[cls(a)] === 'dr' ? 1 : -1) * x]);
  const tb = trialFromSigned(signed);
  return { signed, tb };
}
/** Trial balance from signed balances (debit positive); zero balances are left out. */
export function trialFromSigned(signed, opts) {
  return trialBalance(signed.filter(([, x]) => x).map(([a, x]) => [a, x > 0 ? x : 0, x < 0 ? -x : 0]), opts);
}

// ---------------------------------------------------------------- errors
/**
 * error = { text, type, sub?, should: [[account, 'dr'|'cr', amount]], did: [...], tb: 'one' | 'two', profit: ±n, note }.
 * should = what ought to have been posted, did = what was posted. delta = did − should, per account, debit positive.
 * profit = the effect of the error on net profit as recorded (+ overstated, − understated), stated by the author and
 * asserted against the computed value (the negative of the change in the nominal accounts).
 */
export function analyse(errors) {
  return errors.map((e, i) => {
    const sh = sum((e.should ?? []).map(([, s, x]) => sgn(s) * x));
    same(sh, 0, `error ${i + 1} "should" balances`);
    const d = new Map();
    for (const [a, s, x] of e.should ?? []) d.set(a, (d.get(a) ?? 0) - sgn(s) * x);
    for (const [a, s, x] of e.did ?? []) d.set(a, (d.get(a) ?? 0) + sgn(s) * x);
    const delta = [...d.entries()].filter(([, x]) => x);
    for (const [a] of delta) check(cls(a) !== 'stock', `error ${i + 1} touches stock: not modelled`);
    const net = sum(delta.map(([, x]) => x));
    const profit = -sum(delta.filter(([a]) => isPL(a)).map(([, x]) => x));
    check(delta.length > 0, `error ${i + 1} changes nothing`);
    check(e.tb === (net === 0 ? 'two' : 'one'), `error ${i + 1} (${e.type}): stated ${e.tb}-sided but computed net ${net}`);
    same(profit, e.profit, `error ${i + 1} profit effect`);
    if (e.type === 'omission' && e.sub === 'complete') check((e.did ?? []).length === 0, `error ${i + 1}: a complete omission posts nothing`);
    if (e.type === 'omission' && e.sub === 'partial') check(net !== 0, `error ${i + 1}: a partial omission is one-sided`);
    if (e.type === 'principle') check(net === 0, `error ${i + 1}: an error of principle is two-sided`);
    if (e.type === 'compensating') check(net === 0 && delta.length >= 2 && delta.some(([, x]) => x > 0) && delta.some(([, x]) => x < 0), `error ${i + 1}: compensating errors cancel`);
    return { ...e, delta, net, effect: profit };
  });
}
export const sumNet = (A) => sum(A.map((e) => e.net));
export const sumProfit = (A) => sum(A.map((e) => e.effect));
/** Rows describing each error: text, type, effect on the trial balance, effect on profit. */
export function errorTable(A) {
  const word = (x) => (x > 0 ? 'Overstated' : x < 0 ? 'Understated' : 'No effect');
  const headers = ['No.', 'Error', 'Type', 'Trial balance', 'Net profit'];
  const rows = A.map((e, i) => [String(i + 1), e.text, e.label ?? e.type, e.net ? 'Disagrees' : 'Agrees', e.effect ? `${word(e.effect)} by ${inr(Math.abs(e.effect))}` : 'No effect']);
  return { headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- rectification
/**
 * Rectification entries. mode 'after': one journal entry per error; one-sided errors carry the Suspense A/c. mode 'before':
 * two-sided errors get a journal entry; one-sided errors get an explanatory correction in each affected account.
 * Returns { entries, journal, fixes, fixTable, susp (after only: opening side and amount, ledger) }.
 */
export function rectify(A, { mode, dates = [] }) {
  const entries = [];
  const fixes = [];
  A.forEach((e, i) => {
    const dr = [];
    const cr = [];
    for (const [a, d] of e.delta) (d > 0 ? cr : dr).push([ac(a), Math.abs(d)]);
    if (mode === 'after' && e.net !== 0) (e.net > 0 ? dr : cr).push([SUSP, Math.abs(e.net)]);
    if (mode === 'before' && e.net !== 0) {
      for (const [a, d] of e.delta) fixes.push({ n: i + 1, account: a, side: d > 0 ? 'credit' : 'debit', amount: Math.abs(d), note: e.note });
    } else entries.push({ ...(dates[i] ? { date: dates[i] } : {}), dr, cr, note: e.note, n: i + 1 });
  });
  const out = { entries, fixes };
  out.journal = entries.length ? journal(entries) : null;
  const fh = ['No.', 'Account', 'Write the correction on', 'Amount (₹)'];
  const fr = fixes.map((f) => [String(f.n), ac(f.account), `${f.side} side`, inr(f.amount)]);
  out.fixTable = { headers: fh, rows: fr, md: fr.length ? mdTable(fh, fr) : '' };
  if (mode === 'after') {
    const S = sumNet(A);
    const dr = [];
    const cr = [];
    if (S < 0) dr.push(['To Difference in trial balance', -S]);
    if (S > 0) cr.push(['By Difference in trial balance', S]);
    A.forEach((e, i) => {
      if (e.net === 0) return;
      const other = [...e.delta].map(([a]) => ac(a)).join(' and ');
      if (e.net > 0) dr.push([`To ${other} (error ${i + 1})`, e.net]);
      else cr.push([`By ${other} (error ${i + 1})`, -e.net]);
    });
    const L = ledger({ name: SUSP, dr, cr });
    same(L.balance, 0, 'suspense account closes after all rectifications');
    out.susp = { side: S < 0 ? 'debit' : S > 0 ? 'credit' : 'none', amount: Math.abs(S), ledger: L, dr, cr };
  }
  return out;
}

/**
 * Whole scenario: correct balances, books with the errors (disagreeing by the sum of the one-sided errors; with the
 * suspense account the books agree), and the corrected trial balance (equal to the correct one).
 */
export function scenario({ balances, errors, mode }) {
  const { signed, tb: ok } = correct(balances);
  const A = analyse(errors);
  const books = new Map(signed.map(([a, x]) => [a, x]));
  for (const e of A) for (const [a, d] of e.delta) books.set(a, (books.get(a) ?? 0) + d);
  const bs = [...books.entries()];
  const S = sumNet(A);
  const wrong = trialFromSigned(bs, { expectMismatch: S !== 0 });
  same(wrong.dr - wrong.cr, S, 'books disagree by the sum of the one-sided errors');
  let withSusp = null;
  if (mode === 'after' && S !== 0) {
    withSusp = trialFromSigned([...bs, [SUSP, -S]]);
    same(withSusp.dr, withSusp.cr, 'books agree with the suspense account');
  }
  const R = rectify(A, { mode });
  // apply every correction and compare with the correct balances
  const fixed = new Map(books);
  for (const e of A) for (const [a, d] of e.delta) fixed.set(a, fixed.get(a) - d);
  for (const [a, x] of signed) same(fixed.get(a), x, `corrected balance of ${a}`);
  const corrected = trialFromSigned([...fixed.entries()]);
  same(corrected.dr, ok.dr, 'corrected trial balance total equals the correct total');
  return { signed, ok, A, books: bs, booksTb: wrong, withSusp, R, corrected, net: S, profit: sumProfit(A), balance: (a) => fixed.get(a), booksBalance: (a) => books.get(a) };
}

/** Statement of corrected net profit. reported = net profit as per the books. */
export function profitStatement(A, reported) {
  const rows = [['Net profit as per books', inr(reported)]];
  let p = reported;
  A.forEach((e, i) => {
    if (!e.effect) return;
    p -= e.effect;
    rows.push([`${e.effect < 0 ? 'Add' : 'Less'}: error ${i + 1} (${e.short ?? e.type})`, `${e.effect < 0 ? '' : '−'}${inr(Math.abs(e.effect))}`]);
  });
  same(p, reported - sumProfit(A), 'corrected profit');
  rows.push(['**Corrected net profit**', `**${inr(p)}**`]);
  const headers = ['Particulars', '₹'];
  return { headers, rows, md: mdTable(headers, rows), corrected: p };
}

// ---------------------------------------------------------------- totals and balances (the three methods)
/** From posted entries: per account total debits, total credits and the balance; both totals and both balances agree. */
export function totalsAndBalances(entries) {
  const m = new Map();
  for (const e of entries) {
    for (const [a, x] of e.dr) m.set(a, [(m.get(a)?.[0] ?? 0) + x, m.get(a)?.[1] ?? 0]);
    for (const [a, x] of e.cr) m.set(a, [m.get(a)?.[0] ?? 0, (m.get(a)?.[1] ?? 0) + x]);
  }
  const lines = [...m.entries()].map(([a, [d, c]]) => ({ a, d, c, bal: d - c }));
  const td = sum(lines.map((l) => l.d));
  const tc = sum(lines.map((l) => l.c));
  same(td, tc, 'totals method agrees');
  const bd = sum(lines.filter((l) => l.bal > 0).map((l) => l.bal));
  const bc = sum(lines.filter((l) => l.bal < 0).map((l) => -l.bal));
  same(bd, bc, 'balances method agrees');
  const headers = ['Account', 'Total debit (₹)', 'Total credit (₹)', 'Debit balance (₹)', 'Credit balance (₹)'];
  const rows = lines.map((l) => [l.a, inr(l.d), inr(l.c), l.bal > 0 ? inr(l.bal) : '', l.bal < 0 ? inr(-l.bal) : '']);
  rows.push(['**Total**', `**${inr(td)}**`, `**${inr(tc)}**`, `**${inr(bd)}**`, `**${inr(bc)}**`]);
  return { lines, td, tc, bd, bc, headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- self-check (runs on import)
{
  const bal = [['Cash', 20000], ['Machinery', 90000], ['Purchases', 50000], ['Rent', 10000], ['Capital', 100000], ['Sales', 60000], ['Mehta Cloth House', 10000]];
  const E = [
    { text: 'rent', type: 'commission', should: [['Cash', 'cr', 1000], ['Rent', 'dr', 1000]], did: [['Cash', 'cr', 1000], ['Rent', 'dr', 1900]], tb: 'one', profit: -900, note: 'n1' },
    { text: 'machine', type: 'principle', should: [['Machinery', 'dr', 5000], ['Cash', 'cr', 5000]], did: [['Purchases', 'dr', 5000], ['Cash', 'cr', 5000]], tb: 'two', profit: -5000, note: 'n2' },
  ];
  // the balances only check the shape: debits 170,000 equal capital + sales + creditor 170,000
  const s = scenario({ balances: bal, errors: E, mode: 'after' });
  same(s.net, 900, 'selftest net');
  same(s.R.susp.ledger.balance, 0, 'selftest suspense');
  same(s.profit, -5900, 'selftest profit');
  same(profitStatement(s.A, 50000).corrected, 55900, 'selftest corrected profit');
}
