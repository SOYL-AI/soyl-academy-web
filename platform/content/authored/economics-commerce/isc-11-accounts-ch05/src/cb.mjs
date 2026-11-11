// Cash book engine for ISC 11 Accounts ch05: the simple (single column) and triple column (discount, cash, bank) cash
// books, posting of a cash book to ledger accounts, and the end-of-day settlement that keeps a definite cash balance.
// Every figure is computed and asserted: cash is never a credit balance (checked after every transaction), the cash and
// bank columns total the same on both sides after balancing, a bank overdraft is a credit balance carried down on the
// debit side, the discount columns are totalled and not balanced, contra entries appear on both sides, and the postings
// to the ledger satisfy double entry. Self-checks run on import. Imagined figures only; no GST (syllabus note).
import { sum, check, same, inr, mdTable, ledger } from './acc.mjs';

const bold = (s) => `**${s}**`;
const cell = (n) => (n ? inr(n) : '');

// ---------------------------------------------------------------- transaction constructors
/** Receipt: a debit line (To ...). o = { cash, bank, disc } with disc = discount allowed. */
export const R = (date, who, o = {}) => ({ k: 'R', date, who, cash: o.cash ?? 0, bank: o.bank ?? 0, disc: o.disc ?? 0 });
/** Payment: a credit line (By ...). o = { cash, bank, disc } with disc = discount received. */
export const P = (date, who, o = {}) => ({ k: 'P', date, who, cash: o.cash ?? 0, bank: o.bank ?? 0, disc: o.disc ?? 0 });
/** Contra: cash (or a cheque) deposited into the bank: cash column credit, bank column debit. */
export const DEP = (date, amt) => ({ k: 'DEP', date, amt });
/** Contra: cash withdrawn from the bank for office use: bank column credit, cash column debit. */
export const WD = (date, amt) => ({ k: 'WD', date, amt });

const acctName = (who) => (/A\/c$/.test(who) ? who : `${who} A/c`);

/**
 * Cash book. kind: 'simple' (cash only) or 'triple' (discount, cash, bank). open = { cash, bank } with a negative bank
 * meaning an opening overdraft. items are R, P, DEP, WD in date order. lf (optional object account -> folio) adds an L.F.
 * column (contra entries show C). next = date of the balances brought down; omit it for no b/d rows.
 * Returns { headers, rows, md, cash, bank, discAllowed, discReceived, dr, cr, totalCash, totalBank, lines, minCash }.
 */
export function cashBook({ kind = 'triple', open = { cash: 0, bank: 0 }, items, openDate = '', closeDate = '', next = '', lf = null }) {
  const triple = kind === 'triple';
  check(open.cash >= 0, 'opening cash cannot be a credit balance');
  if (!triple) {
    check(open.bank === 0, 'a simple cash book has no bank column');
    for (const it of items) check(!(it.k === 'DEP' || it.k === 'WD' || it.bank || it.disc), 'a simple cash book has no bank or discount column');
  }
  const D = [];
  const C = [];
  const line = (date, who, o) => ({ date, who, disc: o.disc ?? 0, cash: o.cash ?? 0, bank: o.bank ?? 0, contra: !!o.contra, raw: o.raw });
  let runCash = open.cash;
  let runBank = open.bank;
  let minCash = open.cash;
  const first = line(openDate, 'To Balance b/d', { cash: open.cash, bank: Math.max(open.bank, 0) });
  if (first.cash || first.bank) D.push(first);
  if (open.bank < 0) C.push(line(openDate, 'By Balance b/d', { bank: -open.bank }));
  const tx = { dr: [], cr: [] };
  for (const it of items) {
    if (it.k === 'R') {
      check(it.cash + it.bank + it.disc > 0, `receipt from ${it.who} has no amount`);
      const l = line(it.date, `To ${it.who}`, { ...it, raw: it.who });
      D.push(l); tx.dr.push(l);
      runCash += it.cash; runBank += it.bank;
    } else if (it.k === 'P') {
      check(it.cash + it.bank + it.disc > 0, `payment to ${it.who} has no amount`);
      const l = line(it.date, `By ${it.who}`, { ...it, raw: it.who });
      C.push(l); tx.cr.push(l);
      runCash -= it.cash; runBank -= it.bank;
    } else if (it.k === 'DEP') {
      const a = line(it.date, 'To Cash A/c', { bank: it.amt, contra: true });
      const b = line(it.date, 'By Bank A/c', { cash: it.amt, contra: true });
      D.push(a); C.push(b); tx.dr.push(a); tx.cr.push(b);
      runCash -= it.amt; runBank += it.amt;
    } else if (it.k === 'WD') {
      const a = line(it.date, 'To Bank A/c', { cash: it.amt, contra: true });
      const b = line(it.date, 'By Cash A/c', { bank: it.amt, contra: true });
      D.push(a); C.push(b); tx.dr.push(a); tx.cr.push(b);
      runCash += it.amt; runBank -= it.amt;
    } else throw new Error(`unknown cash book item ${it.k}`);
    check(runCash >= 0, `cash would be a credit balance (${runCash}) after ${it.date} ${it.who ?? it.k}: cash can never be negative`);
    minCash = Math.min(minCash, runCash);
  }
  const col = (xs, f) => sum(xs.map(f));
  const cash = col(D, (x) => x.cash) - col(C, (x) => x.cash);
  const bank = col(D, (x) => x.bank) - col(C, (x) => x.bank);
  same(cash, runCash, 'cash balance by the running total');
  same(bank, runBank, 'bank balance by the running total');
  check(cash >= 0, `cash balance is credit (${cash}); cash can never be negative`);
  const discAllowed = col(D, (x) => x.disc);
  const discReceived = col(C, (x) => x.disc);
  // balance carried down: cash on the credit side; the bank on the credit side when favourable, on the debit side when overdrawn
  const dCd = bank < 0 ? line(closeDate, 'To Balance c/d', { bank: -bank }) : null;
  const cCd = line(closeDate, 'By Balance c/d', { cash, bank: bank > 0 ? bank : 0 });
  if (dCd) D.push(dCd);
  if (cCd.cash || cCd.bank) C.push(cCd);
  const tCashD = col(D, (x) => x.cash), tCashC = col(C, (x) => x.cash);
  const tBankD = col(D, (x) => x.bank), tBankC = col(C, (x) => x.bank);
  same(tCashD, tCashC, 'cash column totals agree');
  same(tBankD, tBankC, 'bank column totals agree');
  // contra entries: equal amounts on both sides
  same(col(tx.dr.filter((x) => x.contra), (x) => x.cash + x.bank), col(tx.cr.filter((x) => x.contra), (x) => x.cash + x.bank), 'contra amounts agree on both sides');
  // double entry of the transaction lines: debits to cash book columns plus the paid accounts equal credits plus the received accounts
  const dbt = col(tx.dr, (x) => x.cash + x.bank + x.disc) + col(tx.cr.filter((x) => !x.contra), (x) => x.cash + x.bank + x.disc);
  const crd = col(tx.cr, (x) => x.cash + x.bank + x.disc) + col(tx.dr.filter((x) => !x.contra), (x) => x.cash + x.bank + x.disc);
  same(dbt, crd, 'postings from the cash book satisfy double entry');
  // independent arithmetic
  const of = (k, f) => sum(items.filter((i) => i.k === k).map(f));
  same(cash, open.cash + of('R', (i) => i.cash) - of('P', (i) => i.cash) + of('WD', (i) => i.amt) - of('DEP', (i) => i.amt), 'cash balance by independent sum');
  same(bank, open.bank + of('R', (i) => i.bank) - of('P', (i) => i.bank) + of('DEP', (i) => i.amt) - of('WD', (i) => i.amt), 'bank balance by independent sum');
  same(discAllowed, of('R', (i) => i.disc), 'discount allowed by independent sum');
  same(discReceived, of('P', (i) => i.disc), 'discount received by independent sum');

  const useLf = !!lf;
  const lfOf = (x) => (x.contra ? 'C' : x.raw && lf[acctName(x.raw)] !== undefined ? String(lf[acctName(x.raw)]) : '');
  const side = (x) => (x ? [x.date, x.who, ...(useLf ? [lfOf(x)] : []), ...(triple ? [cell(x.disc), cell(x.cash), cell(x.bank)] : [cell(x.cash)])] : Array(2 + (useLf ? 1 : 0) + (triple ? 3 : 1)).fill(''));
  const n = Math.max(D.length, C.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([...side(D[i]), ...side(C[i])]);
  const totalCells = (dd, cc, bb) => ['', '', ...(useLf ? [''] : []), ...(triple ? [dd ? bold(inr(dd)) : '', bold(inr(cc)), bold(inr(bb))] : [bold(inr(cc))])];
  rows.push([...totalCells(discAllowed, tCashD, tBankD), ...totalCells(discReceived, tCashC, tBankC)]);
  if (next) {
    const bd = [];
    if (cash || bank > 0) bd.push(line(next, 'To Balance b/d', { cash, bank: Math.max(bank, 0) }));
    const bdc = bank < 0 ? line(next, 'By Balance b/d', { bank: -bank }) : null;
    const nn = Math.max(bd.length, bdc ? 1 : 0);
    for (let i = 0; i < nn; i++) rows.push([...side(bd[i]), ...side(i === 0 ? bdc : null)]);
  }
  const w = useLf ? ['Date', 'Particulars', 'L.F.'] : ['Date', 'Particulars'];
  const amt = triple ? ['Discount (₹)', 'Cash (₹)', 'Bank (₹)'] : ['Amount (₹)'];
  const headers = [...w.map((h) => (h === 'Particulars' ? 'Dr: Particulars' : h)), ...amt, ...w.map((h) => (h === 'Particulars' ? 'Cr: Particulars' : h)), ...amt];
  return {
    headers, rows, md: mdTable(headers, rows), cash, bank, discAllowed, discReceived,
    dr: { cash: tCashD, bank: tBankD }, cr: { cash: tCashC, bank: tBankC },
    totalCash: tCashD, totalBank: tBankD, lines: tx, minCash, items, open,
  };
}

// ---------------------------------------------------------------- posting to the ledger
/**
 * The ledger account of `who` written up from the cash book: each receipt from `who` is credited ("By Cash A/c",
 * "By Bank A/c", "By Discount Allowed A/c") and each payment to `who` is debited ("To Cash A/c" ... "To Discount
 * Received A/c"). opening = { side, amount }; before = entries from other books [{ side: 'dr'|'cr', text, amount }].
 */
export function ledgerFromBook(cb, who, { opening, before = [], after = [] } = {}) {
  const dr = [];
  const cr = [];
  for (const b of before) (b.side === 'dr' ? dr : cr).push([b.text, b.amount]);
  for (const it of cb.items) {
    if (it.who !== who) continue;
    if (it.k === 'R') {
      if (it.cash) cr.push([`${it.date} By Cash A/c`, it.cash]);
      if (it.bank) cr.push([`${it.date} By Bank A/c`, it.bank]);
      if (it.disc) cr.push([`${it.date} By Discount Allowed A/c`, it.disc]);
    } else if (it.k === 'P') {
      if (it.cash) dr.push([`${it.date} To Cash A/c`, it.cash]);
      if (it.bank) dr.push([`${it.date} To Bank A/c`, it.bank]);
      if (it.disc) dr.push([`${it.date} To Discount Received A/c`, it.disc]);
    }
  }
  for (const b of after) (b.side === 'dr' ? dr : cr).push([b.text, b.amount]);
  return ledger({ name: acctName(who), opening, dr, cr });
}

/** The two discount accounts, posted from the totals of the discount columns (nominal accounts: totalled, not balanced). */
export function discountPosting(cb) {
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  const rows = [
    ['**Discount Allowed A/c**', '', '', ''],
    [`To Sundries as per Cash Book`, inr(cb.discAllowed), '', ''],
    ['**Discount Received A/c**', '', '', ''],
    ['', '', 'By Sundries as per Cash Book', inr(cb.discReceived)],
  ];
  return { headers, rows, md: mdTable(headers, rows), allowed: cb.discAllowed, received: cb.discReceived };
}

// ---------------------------------------------------------------- a definite cash balance
/**
 * Contra entry that brings the cash column to `target` at the end of `date`: the excess is deposited into the bank, the
 * shortfall is withdrawn (the bank may then show an overdraft). Returns { item, cashBefore, cashAfter, bankAfter }.
 */
export function settle(open, items, target, date) {
  const cb = cashBook({ open, items });
  const cashBefore = cb.cash;
  let item = null;
  if (cashBefore > target) item = DEP(date, cashBefore - target);
  else if (cashBefore < target) item = WD(date, target - cashBefore);
  const after = cashBook({ open, items: item ? [...items, item] : items });
  same(after.cash, target, 'cash after the contra entry equals the definite balance');
  return { item, cashBefore, cashAfter: after.cash, bankBefore: cb.bank, bankAfter: after.bank };
}

/**
 * Several days with a definite cash balance at the close of each day. days = [{ date, items }]; the contra entry that
 * restores `target` is appended to each day. Returns { items, steps } where steps[i] = settle() result of day i.
 */
export function keepBalance(open, target, days) {
  let all = [];
  const steps = [];
  for (const d of days) {
    const s = settle(open, [...all, ...d.items], target, d.date);
    all = [...all, ...d.items, ...(s.item ? [s.item] : [])];
    steps.push({ ...s, date: d.date });
  }
  return { items: all, steps };
}

// ---------------------------------------------------------------- self-checks (run on import)
{
  const cb = cashBook({
    open: { cash: 1000, bank: -2000 },
    items: [R('1', 'Sales A/c', { cash: 5000 }), R('2', 'Debtor', { bank: 7000, disc: 100 }), DEP('3', 2000), P('4', 'Rent A/c', { bank: 1500 }), WD('5', 1000), P('6', 'Wages A/c', { cash: 3000 }), P('7', 'Creditor', { bank: 900, disc: 50 })],
  });
  same(cb.cash, 1000 + 5000 - 2000 + 1000 - 3000, 'self-check cash');
  same(cb.bank, -2000 + 7000 + 2000 - 1500 - 1000 - 900, 'self-check bank');
  same(cb.discAllowed, 100, 'self-check discount allowed');
  same(cb.discReceived, 50, 'self-check discount received');
  let threw = false;
  try { cashBook({ open: { cash: 0, bank: 0 }, items: [P('1', 'X A/c', { cash: 10 })] }); } catch { threw = true; }
  check(threw, 'a cash book must reject a credit cash balance');
  threw = false;
  try { cashBook({ open: { cash: 100, bank: 0 }, items: [P('1', 'X A/c', { cash: 150 }), R('2', 'Y A/c', { cash: 500 })] }); } catch { threw = true; }
  check(threw, 'cash must not dip below zero even if the closing balance is positive');
  const s = settle({ cash: 500, bank: 0 }, [R('1', 'Sales A/c', { cash: 2000 })], 1000, '1');
  same(s.item.amt, 1500, 'self-check deposit of the excess');
  const t = settle({ cash: 500, bank: 100 }, [P('1', 'Rent A/c', { cash: 400 })], 1000, '1');
  same(t.item.amt, 900, 'self-check withdrawal of the shortfall');
  same(t.bankAfter, -800, 'self-check overdraft after the withdrawal');
}
