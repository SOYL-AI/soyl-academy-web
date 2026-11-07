// Shared computed figures for CBSE 11 Accountancy ch05 (bank reconciliation statement). Every amount a slide, note or item
// states for the worked cases comes from here, computed with recon.mjs and acc.mjs and asserted. Imagined firm and bank only.
import { same, check, sum, inr, rs, mdTable, ledger, CAUSES, I, errCB, errBank, S, statement, amended, twoBooks, total, ruleTable, ruleGrid } from './recon.mjs';

export { same, check, sum, inr, rs, mdTable, ledger, CAUSES, I, errCB, errBank, S, statement, amended, twoBooks, total, ruleTable, ruleGrid };

const ORDER = ['issued', 'deposited', 'charges', 'odint', 'intallowed', 'directdep', 'directpay', 'collected', 'dishonour'];
/** Groups the items of twoBooks() by cause, in textbook order: one statement line per cause. */
export function grouped(tb) {
  const out = [];
  for (const k of ORDER) {
    const xs = tb.items.filter((i) => i.key === k);
    if (!xs.length) continue;
    const it = I(k, sum(xs.map((x) => x.amount)));
    same(it.gap, sum(xs.map((x) => x.gap)), `grouped gap of ${k}`);
    out.push(it);
  }
  const rest = tb.items.filter((i) => !ORDER.includes(i.key));
  check(rest.length === 0, 'ungrouped items');
  return out;
}

const sgn = (x) => (x === 0 ? '' : x > 0 ? `+${inr(x)}` : `−${inr(-x)}`);
/** Table of the transactions with the effect each book has recorded. */
export function txTable(tx) {
  const headers = ['Date', 'Transaction', 'In the cash book (₹)', 'In the pass book (₹)'];
  const rows = tx.map((t) => [t.date, t.label, sgn(t.cb ?? 0), sgn(t.pb ?? 0)]);
  return { headers, rows, md: mdTable(headers, rows) };
}

// ---------------------------------------------------------------- Neel Traders, March 2027 (favourable balances)
export const W1_TX = [
  { date: 'Mar 5', label: 'Cheque from Rohan Bhat deposited', cb: 30000, pb: 30000 },
  { date: 'Mar 8', label: 'Cheque issued to Kamal Suppliers', cb: -25000, pb: -25000 },
  { date: 'Mar 12', label: 'Cheque from Pooja Stores deposited', cb: 18000, pb: 18000 },
  { date: 'Mar 15', label: 'Rent paid by cheque', cb: -9000, pb: -9000 },
  { date: 'Mar 18', label: 'Insurance premium paid by Sagar Bank on standing instruction', cb: 0, pb: -4200, key: 'directpay', short: 'Insurance premium paid by the bank' },
  { date: 'Mar 20', label: 'Interest allowed by Sagar Bank', cb: 0, pb: 640, key: 'intallowed', short: 'Interest allowed by the bank' },
  { date: 'Mar 25', label: 'Dividend collected by Sagar Bank', cb: 0, pb: 2500, key: 'collected', short: 'Dividend collected by the bank' },
  { date: 'Mar 28', label: 'Cheque from Dev Agencies deposited, credited on Apr 2', cb: 14000, pb: 0, key: 'deposited' },
  { date: 'Mar 29', label: 'Cheque issued to Mohan and Sons, presented on Apr 3', cb: -11000, pb: 0, key: 'issued' },
  { date: 'Mar 30', label: 'Cheque issued to Rawat Transport, not yet presented', cb: -6500, pb: 0, key: 'issued' },
  { date: 'Mar 31', label: 'Bank charges debited by Sagar Bank', cb: 0, pb: -380, key: 'charges', short: 'Bank charges' },
];
export const W1B = twoBooks({ open: 52000, tx: W1_TX });
export const W1 = { cb: same(W1B.cb, 62500, 'W1 cash book balance'), pb: same(W1B.pb, 64560, 'W1 pass book balance') };
W1.items = grouped(W1B);
W1.issued = same(sum(W1_TX.filter((t) => t.key === 'issued').map((t) => -t.cb)), 17500, 'W1 cheques issued not presented');
W1.deposited = same(sum(W1_TX.filter((t) => t.key === 'deposited').map((t) => t.cb)), 14000, 'W1 cheques deposited not collected');
W1.fromCB = statement({ from: 'cash book', bal: W1.cb, items: W1.items, expected: W1.pb });
W1.fromPB = statement({ from: 'pass book', bal: W1.pb, items: W1.items, expected: W1.cb });
W1.gap = same(W1.pb - W1.cb, 2060, 'W1 difference between the two balances');
W1.am = amended({ bal: W1.cb, items: W1.items });
same(W1.am.newBal, 61060, 'W1 amended cash book balance');
W1.afterAm = statement({ from: 'cash book', bal: W1.am.newBal, items: W1.am.rest, expected: W1.pb });
W1.tx = txTable(W1_TX);
// the part of the difference that is timing, and the part that needs a cash book entry
W1.timingNet = same(sum(W1.items.filter((i) => !i.fix).map((i) => i.gap)), 3500, 'W1 net of timing differences');
W1.bankNet = same(sum(W1.items.filter((i) => i.fix).map((i) => i.gap)), -1440, 'W1 net of bank items');
same(W1.timingNet + W1.bankNet, W1.gap, 'W1 timing and bank items make the whole difference');
// table: how each cause moves the difference
W1.gapTable = (() => {
  const headers = ['Cause', 'Effect on pass book compared with cash book (₹)'];
  const rows = W1.items.map((i) => [i.label.replace(/, not yet in the cash book$/, ''), sgn(i.gap)]);
  rows.push(['**Pass book balance less cash book balance**', `**${sgn(W1.gap)}**`]);
  return { headers, rows, md: mdTable(headers, rows) };
})();

// ---------------------------------------------------------------- Neel Traders, June 2027 (overdraft)
export const W2_TX = [
  { date: 'Jun 4', label: 'Cheque from Imran Khan deposited', cb: 20000, pb: 20000 },
  { date: 'Jun 9', label: 'Cheque issued to Lata Wholesalers', cb: -28000, pb: -28000 },
  { date: 'Jun 18', label: 'Interest on overdraft debited by Sagar Bank', cb: 0, pb: -700, key: 'odint' },
  { date: 'Jun 22', label: 'Direct deposit by Hari Om Traders into the bank', cb: 0, pb: 6000, key: 'directdep' },
  { date: 'Jun 28', label: 'Cheque issued to Ganesh Packaging, not yet presented', cb: -9200, pb: 0, key: 'issued' },
  { date: 'Jun 29', label: 'Cheque from Sheela Stores deposited, credited on Jul 2', cb: 5000, pb: 0, key: 'deposited' },
  { date: 'Jun 30', label: 'Bank charges debited by Sagar Bank', cb: 0, pb: -250, key: 'charges' },
];
export const W2B = twoBooks({ open: -12000, tx: W2_TX });
export const W2 = { cb: same(W2B.cb, -24200, 'W2 cash book balance (overdraft)'), pb: same(W2B.pb, -14950, 'W2 pass book balance (overdraft)') };
W2.items = grouped(W2B);
W2.fromPB = statement({ from: 'pass book', bal: W2.pb, items: W2.items, expected: W2.cb });
W2.fromCB = statement({ from: 'cash book', bal: W2.cb, items: W2.items, expected: W2.pb });
same(W2.fromPB.endAbs, 24200, 'W2 cash book overdraft');
same(W2.fromCB.endAbs, 14950, 'W2 pass book overdraft');
W2.tx = txTable(W2_TX);
W2.am = amended({ bal: W2.cb, items: W2.items });
same(W2.am.newBal, -19150, 'W2 amended cash book balance');
W2.afterAm = statement({ from: 'cash book', bal: W2.am.newBal, items: W2.am.rest, expected: W2.pb });

// ---------------------------------------------------------------- the rule tables
export const RULE_CB = ruleTable('cash book');
export const RULE_PB = ruleTable('pass book');
export const GRID = ruleGrid();
