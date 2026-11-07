// Bank reconciliation helpers for CBSE 11 Accountancy ch05. They extend the shared acc.mjs (brs, ledger) and never
// edit it. Model: every difference between the two books is an item with a `gap`, the amount by which it makes
// the pass book's favourable balance exceed the cash book's favourable balance (so pass book = cash book + sum of
// gaps). Starting from the cash book the statement applies each gap as it stands; starting from the pass book it
// applies the opposite. Every statement is asserted against the other book's balance through acc.mjs brs().
// acc.mjs brs() prints an overdraft start with the same Add and Less groups as a favourable start, which reads
// wrongly in the usual textbook layout; statement() therefore asserts through brs() but prints its own rows.
import { same, check, sum, inr, rs, mdTable, brs, ledger } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

export { same, check, sum, inr, rs, mdTable, brs, ledger };
const b = (s) => `**${s}**`;

/**
 * Causes of difference. `where` = the book that has recorded the item while the other has not. `effect` = +1 or -1,
 * the effect of the item on the favourable balance of the book that records it.
 */
export const CAUSES = {
  issued: { label: 'Cheques issued but not yet presented for payment', short: 'Cheques issued, not yet presented', where: 'cash book', effect: -1, kind: 'timing' },
  deposited: { label: 'Cheques deposited but not yet collected (credited by the bank)', short: 'Cheques deposited, not yet collected', where: 'cash book', effect: +1, kind: 'timing' },
  charges: { label: 'Bank charges debited by the bank, not yet in the cash book', short: 'Bank charges', where: 'pass book', effect: -1, kind: 'bank item' },
  odint: { label: 'Interest on overdraft debited by the bank, not yet in the cash book', short: 'Interest on overdraft', where: 'pass book', effect: -1, kind: 'bank item' },
  intallowed: { label: 'Interest allowed by the bank, not yet in the cash book', short: 'Interest allowed by the bank', where: 'pass book', effect: +1, kind: 'bank item' },
  directdep: { label: 'Direct deposit by a customer into the bank, not yet in the cash book', short: 'Direct deposit by a customer', where: 'pass book', effect: +1, kind: 'bank item' },
  directpay: { label: 'Direct payment by the bank on standing instruction, not yet in the cash book', short: 'Payment by the bank on standing instruction', where: 'pass book', effect: -1, kind: 'bank item' },
  collected: { label: 'Dividend or interest collected by the bank, not yet in the cash book', short: 'Dividend collected by the bank', where: 'pass book', effect: +1, kind: 'bank item' },
  dishonour: { label: 'Cheque deposited and dishonoured, debited by the bank, not yet in the cash book', short: 'Cheque dishonoured', where: 'pass book', effect: -1, kind: 'bank item' },
};

/** An item from a named cause. gap: pass book minus cash book. `fix` = the cash book itself needs an entry. */
export function I(key, amount, label) {
  const c = CAUSES[key];
  check(c, `unknown cause ${key}`);
  check(amount > 0, 'item amount must be positive');
  const gap = c.where === 'cash book' ? -c.effect * amount : c.effect * amount;
  return { key, label: label ?? c.label, short: c.short, gap, fix: c.where === 'pass book', amount };
}
/** An error in the cash book that left its favourable balance too high (true) or too low (false) by `amount`: the cash book is corrected. */
export function errCB(label, amount, tooHigh) {
  return { key: 'cberror', label, gap: tooHigh ? -amount : amount, fix: true, amount };
}
/** An error by the bank that left the pass book's favourable balance too high (true) or too low (false) by `amount`. */
export function errBank(label, amount, tooHigh) {
  return { key: 'bankerror', label, gap: tooHigh ? amount : -amount, fix: false, amount };
}

const sideOf = (book, signedBal) => (book === 'cash book' ? (signedBal >= 0 ? 'dr' : 'cr') : signedBal >= 0 ? 'cr' : 'dr');

/**
 * Statement. from = 'cash book' | 'pass book'; bal = signed favourable balance of that book (negative = overdraft);
 * items = I()/errCB()/errBank() results; expected = signed favourable balance of the other book.
 * Returns { headers, rows, md, result (signed), adjust, adds, lesses, startLabel, endLabel, endAbs, endIsOd }.
 */
export function statement({ from, bal, items, expected }) {
  const s = from === 'cash book' ? 1 : -1;
  const adjust = items.map((it) => ({ ...it, signed: it.gap * s }));
  const other = from === 'cash book' ? 'pass book' : 'cash book';
  const r = brs({
    from: { book: from, balance: Math.abs(bal), side: sideOf(from, bal) },
    items: adjust.map((a) => [a.label, a.signed]),
    expected,
  });
  const result = r.result;
  same(result, bal + sum(adjust.map((a) => a.signed)), 'statement result');
  const od = bal < 0;
  // Starting from an overdraft, an item that lowers the favourable balance raises the overdraft, so it is added.
  const adds = adjust.filter((a) => (od ? a.signed < 0 : a.signed > 0));
  const lesses = adjust.filter((a) => (od ? a.signed > 0 : a.signed < 0));
  const startLabel = `${od ? 'Overdraft' : 'Balance'} as per ${from}`;
  const endIsOd = result < 0;
  const endLabel = `${endIsOd ? 'Overdraft' : 'Balance'} as per ${other}`;
  const tot = (xs) => sum(xs.map((a) => Math.abs(a.signed)));
  const rows = [[startLabel, '', inr(Math.abs(bal))]];
  if (adds.length) {
    rows.push([b('Add:'), '', '']);
    for (const a of adds) rows.push([a.label, inr(Math.abs(a.signed)), '']);
    rows.push(['', '', inr(tot(adds))]);
  }
  if (lesses.length) {
    rows.push([b('Less:'), '', '']);
    for (const a of lesses) rows.push([a.label, inr(Math.abs(a.signed)), '']);
    rows.push(['', '', `(${inr(tot(lesses))})`]);
  }
  const calc = Math.abs(bal) + tot(adds) - tot(lesses);
  // the arithmetic of the displayed statement must reach the displayed end figure
  same(od ? -calc : calc, result, 'displayed statement arithmetic');
  rows.push([b(endLabel), '', b(inr(Math.abs(result)))]);
  const headers = ['Particulars', '₹', '₹'];
  return { headers, rows, md: mdTable(headers, rows), result, adjust, adds, lesses, startLabel, endLabel, endAbs: Math.abs(result), endIsOd };
}

/** Sum of the amounts of one group of statement items. */
export const total = (items) => sum(items.map((a) => Math.abs(a.signed ?? a.gap)));

/**
 * The cash book (bank column) brought up to date: bal = signed favourable balance; each item that needs a cash
 * book entry (fix) is posted, positive gap on the debit side ("To"), negative on the credit side ("By").
 * Returns the ledger result (balance > 0 is a debit balance) plus `rest` = items still shown in the statement.
 */
export function amended({ bal, items, name = 'Cash Book (Bank column)' }) {
  const fixes = items.filter((i) => i.fix);
  const rest = items.filter((i) => !i.fix);
  const L = ledger({
    name,
    opening: { side: bal >= 0 ? 'dr' : 'cr', amount: Math.abs(bal) },
    dr: fixes.filter((i) => i.gap > 0).map((i) => [`To ${i.short ?? i.label}`, i.gap]),
    cr: fixes.filter((i) => i.gap < 0).map((i) => [`By ${i.short ?? i.label}`, -i.gap]),
  });
  same(L.balance, bal + sum(fixes.map((i) => i.gap)), 'amended cash book balance');
  return { ...L, rest, fixes, newBal: L.balance };
}
/** The same item with a shorter wording for the amended cash book. */
export const S = (item, short) => ({ ...item, short });

/**
 * Two books built from the same transactions: tx = [{ label, cb, pb, fix? }], cb / pb = the signed effect of the
 * transaction on that book's favourable balance (0 when the book has not recorded it). Both books start from
 * `open`. Returns both balances, found independently, and the items of the difference (gap = pb - cb).
 */
export function twoBooks({ open, tx }) {
  const cb = open + sum(tx.map((t) => t.cb ?? 0));
  const pb = open + sum(tx.map((t) => t.pb ?? 0));
  const items = tx
    .filter((t) => (t.cb ?? 0) !== (t.pb ?? 0))
    .map((t) => ({ key: t.key, label: t.label, short: t.short, gap: (t.pb ?? 0) - (t.cb ?? 0), fix: t.fix ?? (t.cb ?? 0) === 0, amount: Math.abs((t.pb ?? 0) - (t.cb ?? 0)) }));
  same(cb + sum(items.map((i) => i.gap)), pb, 'two books: pass book = cash book + gaps');
  return { cb, pb, items };
}

const trim = (l) => l.replace(/, not yet in the cash book$/, '').replace(/, debited by the bank$/, '');
/** The add/less rule table for one starting book, favourable balance, computed from the cause list. */
export function ruleTable(from) {
  const s = from === 'cash book' ? 1 : -1;
  const headers = ['Cause of difference', 'Recorded first in', `Starting from the ${from}`];
  const rows = Object.values(CAUSES).map((c) => {
    const gap = c.where === 'cash book' ? -c.effect : c.effect;
    return [trim(c.label), c.where, gap * s > 0 ? 'Add' : 'Less'];
  });
  return { headers, rows, md: mdTable(headers, rows) };
}
/** One table with all four starting points: cash book or pass book, favourable or overdraft. */
export function ruleGrid() {
  const headers = ['Cause of difference', 'Cash book, favourable', 'Cash book, overdraft', 'Pass book, favourable', 'Pass book, overdraft'];
  const rows = Object.values(CAUSES).map((c) => {
    const gap = c.where === 'cash book' ? -c.effect : c.effect;
    const w = (s, od) => ((od ? -gap * s : gap * s) > 0 ? 'Add' : 'Less');
    return [trim(c.label), w(1, false), w(1, true), w(-1, false), w(-1, true)];
  });
  return { headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- self-checks (run on import)
{
  // Favourable cash book 10,000: cheque issued 2,000 not presented (add), deposit 1,500 not collected (less),
  // charges 100 (less), interest allowed 250 (add) -> pass book 10,650.
  const items = [I('issued', 2000), I('deposited', 1500), I('charges', 100), I('intallowed', 250)];
  same(statement({ from: 'cash book', bal: 10000, items, expected: 10650 }).result, 10650, 'self-check cash book start');
  // The same items from the pass book 10,650 give the cash book 10,000.
  same(statement({ from: 'pass book', bal: 10650, items, expected: 10000 }).result, 10000, 'self-check pass book start');
  // Overdraft per pass book 5,000; cheque issued 2,000 not presented; deposit 1,500 not collected -> cash book overdraft 5,500.
  const od = statement({ from: 'pass book', bal: -5000, items: [I('issued', 2000), I('deposited', 1500)], expected: -5500 });
  same(od.endAbs, 5500, 'self-check overdraft start');
  check(od.endIsOd && od.adds.length === 1 && od.lesses.length === 1, 'overdraft add/less groups');
  // Amended cash book: 10,000 + 250 - 100 = 10,150; the statement then starts from 10,150 and reaches 10,650.
  const am = amended({ bal: 10000, items });
  same(am.newBal, 10150, 'self-check amended balance');
  same(statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: 10650 }).result, 10650, 'self-check after amended');
  const t = twoBooks({ open: 5000, tx: [{ label: 'a', cb: 1000, pb: 1000 }, { label: 'b', cb: -300, pb: 0 }, { label: 'c', cb: 0, pb: 50 }] });
  same(t.cb, 5700, 'twoBooks cb');
  same(t.pb, 6050, 'twoBooks pb');
}
