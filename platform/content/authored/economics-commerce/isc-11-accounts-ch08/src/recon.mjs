// Bank reconciliation engine for ISC 11 Accounts ch08. It builds on acc.mjs (brs, ledger) and never edits it.
// Model: every difference between the two books is an item with a `gap`, the amount by which it makes the pass
// book's favourable balance exceed the cash book's favourable balance, so  pass book = cash book + sum of gaps.
// Starting from the cash book a statement applies each gap as it stands; starting from the pass book it applies
// the opposite. Every statement is asserted against the other book's balance through acc.mjs brs().
// A balance is a SIGNED favourable balance: a positive number is a debit balance of the cash book (bank column) or
// a credit balance of the pass book; a negative number is an overdraft in either book.
// acc.mjs brs() prints an overdraft start with the same Add and Less groups as a favourable start; statement()
// asserts through brs() but prints the overdraft layout (items that deepen the overdraft are added).
import { same, check, sum, inr, rs, mdTable, brs, ledger } from './acc.mjs';

export { same, check, sum, inr, rs, mdTable, brs, ledger };
const b = (s) => `**${s}**`;

/**
 * Causes of difference. `where` = the book that has recorded the item while the other has not; `effect` = +1 or -1,
 * the effect of the item on the favourable balance of the book that records it.
 */
export const CAUSES = {
  issued: { label: 'Cheques issued but not yet presented for payment', short: 'Cheques issued, not yet presented', where: 'cash book', effect: -1, kind: 'timing' },
  deposited: { label: 'Cheques deposited but not yet credited by the bank', short: 'Cheques deposited, not yet credited', where: 'cash book', effect: +1, kind: 'timing' },
  charges: { label: 'Bank charges debited by the bank, not yet in the cash book', short: 'Bank charges', where: 'pass book', effect: -1, kind: 'bank item' },
  odint: { label: 'Interest on overdraft debited by the bank, not yet in the cash book', short: 'Interest on overdraft', where: 'pass book', effect: -1, kind: 'bank item' },
  intallowed: { label: 'Interest credited by the bank, not yet in the cash book', short: 'Interest credited by the bank', where: 'pass book', effect: +1, kind: 'bank item' },
  directdep: { label: 'Direct deposit by a customer into the bank, not yet in the cash book', short: 'Direct deposit by a customer', where: 'pass book', effect: +1, kind: 'bank item' },
  directpay: { label: 'Payment made by the bank on standing instruction, not yet in the cash book', short: 'Payment by the bank on standing instruction', where: 'pass book', effect: -1, kind: 'bank item' },
  collected: { label: 'Dividend or rent collected by the bank, not yet in the cash book', short: 'Amount collected by the bank', where: 'pass book', effect: +1, kind: 'bank item' },
  dishonour: { label: 'Cheque deposited and returned unpaid, debited by the bank, not yet in the cash book', short: 'Cheque dishonoured', where: 'pass book', effect: -1, kind: 'bank item' },
};

/** An item from a named cause. gap: pass book minus cash book. `fix` = the cash book itself needs an entry. */
export function I(key, amount, label) {
  const c = CAUSES[key];
  check(c, `unknown cause ${key}`);
  check(Number.isInteger(amount) && amount > 0, 'item amount must be a positive whole number');
  const gap = c.where === 'cash book' ? -c.effect * amount : c.effect * amount;
  return { key, label: label ?? c.label, short: c.short, gap, fix: c.where === 'pass book', amount };
}
/** An error in the cash book that left its favourable balance too high (true) or too low (false) by `amount`. */
export function errCB(label, amount, tooHigh, short) {
  return { key: 'cberror', label, short: short ?? label, gap: tooHigh ? -amount : amount, fix: true, amount };
}
/** An error by the bank that left the pass book's favourable balance too high (true) or too low (false) by `amount`. */
export function errBank(label, amount, tooHigh) {
  return { key: 'bankerror', label, short: label, gap: tooHigh ? amount : -amount, fix: false, amount };
}
/** The same item with another wording for the statement. */
export const L = (item, label, short) => ({ ...item, label, short: short ?? item.short });

const sideOf = (book, signedBal) => (book === 'cash book' ? (signedBal >= 0 ? 'dr' : 'cr') : signedBal >= 0 ? 'cr' : 'dr');
const total = (xs) => sum(xs.map((a) => Math.abs(a.signed ?? a.gap)));

/**
 * Statement. from = 'cash book' | 'pass book'; bal = signed favourable balance of that book (negative = overdraft);
 * items = I()/errCB()/errBank() results; expected = signed favourable balance of the other book.
 * Returns { headers, rows, md, result (signed), adjust, adds, lesses, startLabel, endLabel, endAbs, endIsOd, plus, minus }.
 */
export function statement({ from, bal, items, expected, asOf }) {
  const s = from === 'cash book' ? 1 : -1;
  const adjust = items.map((it) => ({ ...it, signed: it.gap * s }));
  const other = from === 'cash book' ? 'pass book' : 'cash book';
  const r = brs({ from: { book: from, balance: Math.abs(bal), side: sideOf(from, bal) }, items: adjust.map((a) => [a.label, a.signed]), expected });
  const result = r.result;
  same(result, bal + sum(adjust.map((a) => a.signed)), 'statement result');
  const od = bal < 0;
  // Starting from an overdraft, an item that lowers the favourable balance deepens the overdraft, so it is added.
  const adds = adjust.filter((a) => (od ? a.signed < 0 : a.signed > 0));
  const lesses = adjust.filter((a) => (od ? a.signed > 0 : a.signed < 0));
  const startLabel = `${od ? 'Overdraft' : 'Balance'} as per ${from}${asOf ? '' : ''}`;
  const endIsOd = result < 0;
  const endLabel = `${endIsOd ? 'Overdraft' : 'Balance'} as per ${other}`;
  const rows = [[startLabel, '', inr(Math.abs(bal))]];
  if (adds.length) {
    rows.push([b('Add:'), '', '']);
    for (const a of adds) rows.push([a.label, inr(Math.abs(a.signed)), '']);
    rows.push(['', '', inr(total(adds))]);
  }
  if (lesses.length) {
    rows.push([b('Less:'), '', '']);
    for (const a of lesses) rows.push([a.label, inr(Math.abs(a.signed)), '']);
    rows.push(['', '', `(${inr(total(lesses))})`]);
  }
  const calc = Math.abs(bal) + total(adds) - total(lesses);
  // the arithmetic of the displayed statement must reach the displayed end figure
  same(od ? -calc : calc, result, 'displayed statement arithmetic');
  rows.push([b(endLabel), '', b(inr(Math.abs(result)))]);
  const headers = ['Particulars', '₹', '₹'];
  return { headers, rows, md: mdTable(headers, rows), result, adjust, adds, lesses, startLabel, endLabel, endAbs: Math.abs(result), endIsOd, from, other, bal };
}

/**
 * The same statement in two-column form (plus and minus columns). The opening balance goes in the plus column when
 * it is favourable and in the minus column when it is an overdraft; each item goes where it moves the favourable
 * balance (plus = raises it). The result is the plus total less the minus total.
 */
export function twoColumn(st) {
  const plus = [];
  const minus = [];
  const rows = [];
  const open = st.bal;
  (open >= 0 ? plus : minus).push(Math.abs(open));
  rows.push([st.startLabel, open >= 0 ? inr(open) : '', open < 0 ? inr(-open) : '']);
  for (const a of st.adjust) {
    (a.signed > 0 ? plus : minus).push(Math.abs(a.signed));
    rows.push([a.label, a.signed > 0 ? inr(a.signed) : '', a.signed < 0 ? inr(-a.signed) : '']);
  }
  const tp = sum(plus);
  const tm = sum(minus);
  rows.push([b('Total'), b(inr(tp)), b(inr(tm))]);
  same(tp - tm, st.result, 'two-column statement reaches the other book');
  const net = tp - tm;
  rows.push([b(`${st.endIsOd ? 'Overdraft' : 'Balance'} as per ${st.other} (plus total less minus total)`), net >= 0 ? b(inr(net)) : '', net < 0 ? b(inr(-net)) : '']);
  const headers = ['Particulars', 'Plus (₹)', 'Minus (₹)'];
  return { headers, rows, md: mdTable(headers, rows), plus: tp, minus: tm, result: tp - tm };
}

/**
 * The cash book (bank column) brought up to date: bal = signed favourable balance; each item that needs a cash
 * book entry (fix) is posted, positive gap on the debit side ("To"), negative on the credit side ("By").
 * Returns the ledger result (balance > 0 is a debit balance) plus `rest` = the items still shown in the statement.
 */
export function amended({ bal, items, name = 'Cash Book (Bank column)', cdLabel }) {
  const fixes = items.filter((i) => i.fix);
  const rest = items.filter((i) => !i.fix);
  const L2 = ledger({
    name,
    opening: { side: bal >= 0 ? 'dr' : 'cr', amount: Math.abs(bal) },
    dr: fixes.filter((i) => i.gap > 0).map((i) => [`To ${i.short ?? i.label}`, i.gap]),
    cr: fixes.filter((i) => i.gap < 0).map((i) => [`By ${i.short ?? i.label}`, -i.gap]),
  });
  const newBal = bal + sum(fixes.map((i) => i.gap));
  same(L2.balance, newBal, 'amended cash book balance');
  const rows = cdLabel ? L2.rows.map((r) => r.map((c) => (c === 'By Balance c/d' || c === 'To Balance c/d' ? c.replace('Balance c/d', cdLabel) : c))) : L2.rows;
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { ...L2, rows, md: mdTable(headers, rows), rest, fixes, newBal };
}

// ---------------------------------------------------------------- two books built from the same transactions
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dkey = (d) => {
  const m = /^(\d{1,2}) (\w{3})/.exec(d);
  check(m, `bad date ${d}`);
  return MONTHS.indexOf(m[2]) * 100 + +m[1];
};
const bal2 = (n) => (n >= 0 ? `${inr(n)} Cr` : `${inr(-n)} Dr`);

/**
 * tx = [{ item?, cbText, cbDate, cb, pbText, pbDate, pb, clears? }]; cb / pb = the signed effect of the transaction
 * on that book's favourable balance (0 when the book has not recorded it in the period). `item` is the cause
 * (I(), errCB(), errBank()) for a transaction recorded differently; `clears` = index of an openItems entry that this
 * transaction settles (the previous period's item reaching the other book).
 * Returns both closing balances, found independently, the items still open at the end, and the extracts.
 */
export function twoBooks({ cbOpen, pbOpen, openItems = [], tx, openDate, closeDate }) {
  same(pbOpen - cbOpen, sum(openItems.map((i) => i.gap)), 'opening difference equals the previous items');
  const cbClose = cbOpen + sum(tx.map((t) => t.cb ?? 0));
  const pbClose = pbOpen + sum(tx.map((t) => t.pb ?? 0));
  const cleared = new Set();
  const fresh = [];
  for (const t of tx) {
    const cb = t.cb ?? 0;
    const pb = t.pb ?? 0;
    if (t.clears !== undefined) {
      check(cb === 0 && openItems[t.clears], 'a clearing transaction is in the pass book only');
      same(pb, -openItems[t.clears].gap, 'a clearing transaction closes the opening gap');
      cleared.add(t.clears);
    } else if (cb !== pb) {
      check(t.item, `unmatched transaction needs a cause: ${t.pbText ?? t.cbText}`);
      same(pb - cb, t.item.gap, `gap of ${t.item.label}`);
      fresh.push(t.item);
    }
  }
  const stillOpen = openItems.filter((_, i) => !cleared.has(i));
  const items = [...stillOpen, ...fresh];
  same(cbClose + sum(items.map((i) => i.gap)), pbClose, 'closing: pass book = cash book + open gaps');
  return { cbOpen, pbOpen, cbClose, pbClose, items, tx, openItems, cleared, openDate, closeDate, stillOpen, fresh };
}

/** Cash book (bank column) extract: two-sided, opening balance, entries, balance c/d, equal totals. */
export function cbExtract(bk, { title = 'Cash Book (Bank column)' } = {}) {
  const D = [];
  const C = [];
  if (bk.cbOpen >= 0) D.push([bk.openDate, 'To Balance b/d', bk.cbOpen]);
  else C.push([bk.openDate, 'By Balance b/d', -bk.cbOpen]);
  for (const t of bk.tx) {
    if (!t.cb) continue;
    (t.cb > 0 ? D : C).push([t.cbDate, t.cbText, Math.abs(t.cb)]);
  }
  const byDate = (x, y) => (x[1].includes('Balance b/d') ? -1 : y[1].includes('Balance b/d') ? 1 : dkey(x[0]) - dkey(y[0]));
  D.sort(byDate);
  C.sort(byDate);
  const dr = sum(D.map((r) => r[2]));
  const cr = sum(C.map((r) => r[2]));
  const bal = dr - cr;
  same(bal, bk.cbClose, 'cash book extract balance');
  if (bal >= 0) C.push([bk.closeDate, 'By Balance c/d', bal]);
  else D.push([bk.closeDate, 'To Balance c/d', -bal]);
  const tot = sum(D.map((r) => r[2]));
  same(tot, sum(C.map((r) => r[2])), 'cash book extract totals');
  const n = Math.max(D.length, C.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([D[i]?.[0] ?? '', D[i]?.[1] ?? '', D[i] ? inr(D[i][2]) : '', C[i]?.[0] ?? '', C[i]?.[1] ?? '', C[i] ? inr(C[i][2]) : '']);
  rows.push(['', '', b(inr(tot)), '', '', b(inr(tot))]);
  const headers = ['Date', 'Dr: Particulars', '₹', 'Date', 'Cr: Particulars', '₹'];
  return { title, headers, rows, md: mdTable(headers, rows), balance: bal };
}

/** Pass book extract: date order, withdrawals, deposits, running balance (Cr favourable, Dr overdraft). */
export function pbExtract(bk) {
  const lines = bk.tx.filter((t) => t.pb).map((t, i) => ({ d: t.pbDate, text: t.pbText, pb: t.pb, i }));
  lines.sort((x, y) => dkey(x.d) - dkey(y.d) || x.i - y.i);
  let run = bk.pbOpen;
  const rows = [[bk.openDate, 'Balance brought forward', '', '', bal2(run)]];
  for (const l of lines) {
    run += l.pb;
    rows.push([l.d, l.text, l.pb < 0 ? inr(-l.pb) : '', l.pb > 0 ? inr(l.pb) : '', bal2(run)]);
  }
  same(run, bk.pbClose, 'pass book extract balance');
  const headers = ['Date', 'Particulars', 'Withdrawals (₹)', 'Deposits (₹)', 'Balance (₹)'];
  return { headers, rows, md: mdTable(headers, rows), balance: run };
}

/** Which entries match, and which do not: one row per transaction plus the items brought forward. */
export function matching(bk) {
  const rows = [];
  for (const t of bk.tx) {
    const cb = t.cb ?? 0;
    const pb = t.pb ?? 0;
    const amt = inr(Math.abs(cb || pb));
    let status;
    if (t.clears !== undefined) status = 'Entered in the cash book last period: now in the pass book';
    else if (cb === pb) status = 'Matched: in both books';
    else if (cb && !pb) status = 'In the cash book only';
    else if (pb && !cb) status = 'In the pass book only';
    else status = 'In both books for different amounts';
    rows.push([t.cbText ?? t.pbText, amt, status]);
  }
  const headers = ['Entry', 'Amount (₹)', 'Result of matching'];
  return { headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- rule tables, generated from the cause list
const trim = (l) => l.replace(/, not yet in the cash book$/, '').replace(/, debited by the bank$/, '');
/** The add/less rule table for one starting book, favourable balance. */
export function ruleTable(from) {
  const s = from === 'cash book' ? 1 : -1;
  const headers = ['Cause of difference', 'Recorded first in', `Starting from the ${from}`];
  const rows = Object.values(CAUSES).map((c) => {
    const gap = c.where === 'cash book' ? -c.effect : c.effect;
    return [trim(c.label), c.where, gap * s > 0 ? 'Add' : 'Less'];
  });
  return { headers, rows, md: mdTable(headers, rows) };
}
/** One table with all four starting points. */
export function ruleGrid() {
  const headers = ['Cause of difference', 'Cash book, favourable', 'Cash book, overdraft', 'Pass book, favourable', 'Pass book, overdraft'];
  const rows = Object.values(CAUSES).map((c) => {
    const gap = c.where === 'cash book' ? -c.effect : c.effect;
    const w = (s, od) => ((od ? -gap * s : gap * s) > 0 ? 'Add' : 'Less');
    return [trim(c.label), w(1, false), w(1, true), w(-1, false), w(-1, true)];
  });
  return { headers, rows, md: mdTable(headers, rows) };
}
/** Add or Less for one cause from one starting point (used in solutions so no rule is typed twice). */
export function rule(key, from, overdraft = false) {
  const c = CAUSES[key];
  const gap = c.where === 'cash book' ? -c.effect : c.effect;
  const s = from === 'cash book' ? 1 : -1;
  return (overdraft ? -gap * s : gap * s) > 0 ? 'Add' : 'Less';
}

// ---------------------------------------------------------------- self-checks (run on import)
{
  // Favourable cash book 9,000: cheque issued 1,800 not presented (add), deposit 1,200 not credited (less),
  // charges 90 (less), interest 210 (add) -> pass book 9,120.
  const items = [I('issued', 1800), I('deposited', 1200), I('charges', 90), I('intallowed', 210)];
  same(statement({ from: 'cash book', bal: 9000, items, expected: 9720 }).result, 9720, 'self-check cash book start');
  same(statement({ from: 'pass book', bal: 9720, items, expected: 9000 }).result, 9000, 'self-check pass book start');
  const t = twoColumn(statement({ from: 'cash book', bal: 9000, items, expected: 9720 }));
  same(t.plus, 9000 + 1800 + 210, 'two-column plus');
  same(t.minus, 1200 + 90, 'two-column minus');
  // Overdraft per pass book 4,000; cheque issued 1,500 not presented; deposit 900 not credited -> cash book overdraft 4,600.
  const od = statement({ from: 'pass book', bal: -4000, items: [I('issued', 1500), I('deposited', 900)], expected: -4600 });
  same(od.endAbs, 4600, 'self-check overdraft start');
  check(od.endIsOd && od.adds.length === 1 && od.lesses.length === 1, 'overdraft add/less groups');
  same(od.adds[0].signed, -1500, 'the unpresented cheque deepens the overdraft, so it is added');
  // Amended cash book: 9,000 + 210 - 90 = 9,120; the statement then starts from 9,120 and reaches 9,720.
  const am = amended({ bal: 9000, items });
  same(am.newBal, 9120, 'self-check amended balance');
  same(statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: 9720 }).result, 9720, 'self-check after amended');
  // Two books from transactions, with one previous-period cheque clearing and one still open.
  const prior = [I('issued', 700, 'Cheque no. 14 issued last month'), I('issued', 400, 'Cheque no. 15 issued last month')];
  const bk = twoBooks({
    cbOpen: 5000, pbOpen: 6100, openItems: prior, openDate: '1 Mar', closeDate: '31 Mar',
    tx: [
      { cbText: 'To Customer', cbDate: '3 Mar', cb: 1000, pbText: 'By Clearing', pbDate: '4 Mar', pb: 1000 },
      { pbText: 'To Cheque no. 14', pbDate: '9 Mar', pb: -700, clears: 0 },
      { cbText: 'By Rent', cbDate: '12 Mar', cb: -500, item: I('issued', 500), pbText: '', pbDate: '', pb: 0 },
      { pbText: 'By Interest', pbDate: '31 Mar', pb: 60, item: I('intallowed', 60) },
    ],
  });
  same(bk.cbClose, 5500, 'twoBooks cb');
  same(bk.pbClose, 6460, 'twoBooks pb');
  same(bk.items.length, 3, 'twoBooks items still open');
  cbExtract(bk);
  pbExtract(bk);
}
