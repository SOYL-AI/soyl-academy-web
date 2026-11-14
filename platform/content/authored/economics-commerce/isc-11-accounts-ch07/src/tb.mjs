// Chapter helper for ISC 11 Accounts ch07 (Trial Balance): classifies a list of balances by the nature of each account,
// finds a missing capital, and simulates errors in posting to show which ones leave the trial balance agreeing and which
// ones disturb it. Everything is built on acc.mjs (post, trialBalance, trialFromLedgers) and every result is asserted.
import { sum, check, same, inr, rs, mdTable, journal, post, ledger, trialBalance, trialFromLedgers, words, rupees } from './acc.mjs';
export { sum, check, same, inr, rs, mdTable, journal, post, ledger, trialBalance, trialFromLedgers, words, rupees };

// ---------------------------------------------------------------- the side of each kind of account
const K = {
  asset: ['dr', 'Asset'],
  debtor: ['dr', 'Debtor (an asset)'],
  openingStock: ['dr', 'Opening stock (carried from last year)'],
  purchases: ['dr', 'Purchases of goods'],
  returnsIn: ['dr', 'Sales return (returns inward)'],
  expense: ['dr', 'Expense'],
  loss: ['dr', 'Loss'],
  drawings: ['dr', 'Drawings by the owner'],
  capital: ['cr', 'Capital (claim of the owner)'],
  liability: ['cr', 'Liability'],
  creditor: ['cr', 'Creditor (a liability)'],
  income: ['cr', 'Income or gain'],
  sales: ['cr', 'Sales of goods'],
  returnsOut: ['cr', 'Purchases return (returns outward)'],
  provision: ['cr', 'Provision'],
  closingStock: [null, 'Closing stock (given outside the books)'],
};
export const KINDS = Object.keys(K);
export const sideOf = (kind) => {
  check(K[kind], `unknown kind ${kind}`);
  return K[kind][0];
};
const SIDE_WORD = { dr: 'Debit', cr: 'Credit' };

/**
 * items: [[account, amount, kind]]. Accounts whose kind has a side go to the trial balance (asserted to agree);
 * closing stock has no side and is returned in `outside`. Returns { rows, outside, tb, sideTable, drItems, crItems }.
 */
export function fromBalances(items) {
  const rows = items.map(([name, amt, kind]) => {
    check(Number.isInteger(amt) && amt > 0, `balance of ${name} must be a positive whole number`);
    check(K[kind], `unknown kind ${kind} for ${name}`);
    return { name, amt, kind, side: K[kind][0], nature: K[kind][1] };
  });
  const inTb = rows.filter((r) => r.side);
  const outside = rows.filter((r) => !r.side);
  const tb = trialBalance(inTb.map((r) => [r.name, r.side === 'dr' ? r.amt : 0, r.side === 'cr' ? r.amt : 0]));
  const sideTable = {
    headers: ['Account', 'Nature', 'Balance (₹)', 'Side in the trial balance'],
    rows: rows.map((r) => [r.name, r.nature, inr(r.amt), r.side ? SIDE_WORD[r.side] : 'Not entered']),
  };
  return { rows, outside, tb, sideTable, dr: tb.dr, cr: tb.cr, drItems: inTb.filter((r) => r.side === 'dr'), crItems: inTb.filter((r) => r.side === 'cr') };
}

/** Items without capital: the capital is the balancing figure (debits − credits of the others). */
export function withCapital(items, capName = 'Capital') {
  check(!items.some(([, , k]) => k === 'capital'), 'capital is already in the list');
  const side = (s) => sum(items.filter(([, , k]) => sideOf(k) === s).map(([, a]) => a));
  const drOther = side('dr');
  const crOther = side('cr');
  const capital = drOther - crOther;
  check(capital > 0, 'the missing capital is not positive');
  const all = [...items, [capName, capital, 'capital']];
  const r = fromBalances(all);
  same(r.dr, drOther, 'debit total is the debits of the others');
  same(r.cr, crOther + capital, 'credit total includes the capital');
  return { ...r, capital, drOther, crOther };
}

// ---------------------------------------------------------------- ledgers from journal entries
const balMap = (L) => Object.fromEntries(Object.values(L).map((l) => [l.name, l.balance]));
/** Raw debit and credit totals per account from entries (before balancing). */
export function accountTotals(entries) {
  const m = new Map();
  const get = (a) => m.get(a) ?? m.set(a, { dr: 0, cr: 0 }).get(a);
  for (const e of entries) {
    for (const [a, x] of e.dr) get(a).dr += x;
    for (const [a, x] of e.cr) get(a).cr += x;
  }
  return [...m.entries()].map(([name, t]) => ({ name, ...t, balance: t.dr - t.cr }));
}
/** Table of every account: debit total, credit total, balance and its side. */
export function balanceTable(entries) {
  const rows = accountTotals(entries).map((a) => [a.name, inr(a.dr), a.cr ? inr(a.cr) : '', inr(Math.abs(a.balance)), a.balance > 0 ? 'Debit' : a.balance < 0 ? 'Credit' : 'Nil']);
  return { headers: ['Ledger account', 'Debit total (₹)', 'Credit total (₹)', 'Balance (₹)', 'Side of the balance'], rows };
}

/**
 * Error case: the correct entries and an erroneous version of them (entries may be one-sided or unequal). Posts both,
 * builds both trial balances, and asserts that the totals agree (agrees: true) or disagree (agrees: false) in the
 * erroneous books while at least one account balance is wrong. Returns the figures and a table of wrong balances.
 */
export function errorCase({ right, wrong, agrees }) {
  const R = post(right);
  const W = post(wrong);
  const good = trialFromLedgers(R);
  const bad = trialFromLedgers(W, { expectMismatch: !agrees });
  const gb = balMap(R);
  const wb = balMap(W);
  const names = [...new Set([...Object.keys(gb), ...Object.keys(wb)])];
  const diff = names.filter((n) => (gb[n] ?? 0) !== (wb[n] ?? 0)).map((n) => ({ name: n, right: gb[n] ?? 0, wrong: wb[n] ?? 0 }));
  check(diff.length > 0, 'the error changes no balance');
  const gap = bad.dr - bad.cr;
  if (agrees) same(gap, 0, 'agreeing case has equal totals');
  return { good, bad, diff, gap, R, W };
}
/** A balance as shown in words and figures: "₹36,000 debit". */
export const bal = (x) => (x === 0 ? 'nil' : x > 0 ? `${rs(x)} debit` : `${rs(-x)} credit`);
/** Replaces entries of a base list by key (an entry, or null to drop it). */
export function swap(map, changes) {
  const out = [];
  for (const [k, e] of Object.entries(map)) {
    if (k in changes) {
      if (changes[k]) out.push(changes[k]);
    } else out.push(e);
  }
  return out;
}
export const diffRows = (c) => c.diff.map((d) => [d.name, bal(d.right), bal(d.wrong)]);

// ---------------------------------------------------------------- self-checks
{
  const a = fromBalances([['Cash', 5000, 'asset'], ['Sales', 9000, 'sales'], ['Purchases', 4000, 'purchases'], ['Closing stock', 3000, 'closingStock']]);
  same(a.dr, 9000, 'self-check fromBalances');
  same(a.outside.length, 1, 'closing stock is outside the trial balance');
  const c = withCapital([['Cash', 5000, 'asset'], ['Creditors', 2000, 'creditor']]);
  same(c.capital, 3000, 'self-check missing capital');
  const base = { a: { dr: [['Cash', 100]], cr: [['Capital', 100]], note: 'x' }, b: { dr: [['Rent', 10]], cr: [['Cash', 10]], note: 'y' } };
  const e = errorCase({ right: Object.values(base), wrong: swap(base, { b: { dr: [['Rent', 10]], cr: [], note: 'z' } }), agrees: false });
  same(e.gap, 10, 'self-check one-sided error');
}
