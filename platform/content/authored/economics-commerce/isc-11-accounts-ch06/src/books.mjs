// Special purpose books for ISC 11 Accounts ch06: the analytical petty cash book on the imprest system, the purchases,
// sales, purchases return and sales return books (simple and columnar, trade discount deducted, no GST), the ledger
// accounts those books are posted to, and the journal proper. Modelled on the structure of the CBSE 11 Accountancy ch04
// helper; the figures, firms and wording are this chapter's own. Everything is asserted: analysis columns add up to the
// total payments, the imprest is restored by the reimbursement, a book total equals the sum of its invoices and equals
// the sum posted to the personal accounts and to the goods accounts, every journal entry balances, every ledger closes.
// Self-checks run on import.
import { sum, check, same, whole, inr, mdTable, journal } from './acc.mjs';

export { sum, check, same, whole, inr, mdTable, journal };
export const rs = (n) => (n < 0 ? `−₹${Math.abs(n).toLocaleString('en-IN')}` : `₹${n.toLocaleString('en-IN')}`);
const bold = (s) => `**${s}**`;
const cell = (n) => (n ? inr(n) : '');

// ================================================================ analytical petty cash book (imprest system)
/** Petty voucher: date, voucher number, what it was for, and the amount under each head it belongs to. */
export const V = (date, no, what, heads) => ({ date, no, what, heads });

/**
 * Analytical petty cash book on the imprest system. imprest = the fixed float; open = balance in hand at the start of
 * the period (the head cashier gives imprest - open). heads = the analysis columns, in order.
 * Asserts: head totals add up to the total payments; receipts (opening balance + cash received) equal payments plus the
 * closing balance; the reimbursement (= payments) restores the float to the imprest.
 */
export function pettyCash({ imprest, open = 0, heads, vouchers, startDate = '', closeDate = '', nextDate = '' }) {
  check(open >= 0 && open <= imprest, 'opening petty cash outside 0..imprest');
  const received = imprest - open;
  const lines = vouchers.map((v) => {
    for (const k of Object.keys(v.heads)) check(heads.includes(k), `voucher "${v.what}" uses unknown head ${k}`);
    const total = sum(Object.values(v.heads));
    check(total > 0, `voucher "${v.what}" has no amount`);
    return { ...v, total };
  });
  const byHead = Object.fromEntries(heads.map((h) => [h, sum(lines.map((l) => l.heads[h] ?? 0))]));
  const spent = sum(lines.map((l) => l.total));
  same(sum(Object.values(byHead)), spent, 'analysis columns add up to the total payments');
  const closing = imprest - spent;
  check(closing >= 0, 'petty cash overspent: payments exceed the imprest');
  same(open + received, spent + closing, 'petty cash receipts equal payments plus balance');
  const reimburse = spent;
  same(closing + reimburse, imprest, 'reimbursement restores the imprest');
  const blank = heads.map(() => '');
  const rows = [];
  if (open) rows.push([inr(open), startDate, 'To Balance b/d', '', '', ...blank]);
  rows.push([inr(received), startDate, 'To Cash A/c (imprest received)', '', '', ...blank]);
  for (const l of lines) rows.push(['', l.date, `By ${l.what}`, l.no, inr(l.total), ...heads.map((h) => cell(l.heads[h] ?? 0))]);
  rows.push(['', '', bold('Total payments'), '', bold(inr(spent)), ...heads.map((h) => bold(inr(byHead[h])))]);
  rows.push(['', closeDate, 'By Balance c/d', '', inr(closing), ...blank]);
  rows.push([bold(inr(imprest)), '', '', '', bold(inr(imprest)), ...blank]);
  rows.push([inr(closing), nextDate, 'To Balance b/d', '', '', ...blank]);
  rows.push([inr(reimburse), nextDate, 'To Cash A/c (reimbursement)', '', '', ...blank]);
  const headers = ['Receipts (₹)', 'Date', 'Particulars', 'Voucher no.', 'Total (₹)', ...heads.map((h) => `${h} (₹)`)];
  // posting of the column totals: each head account debited, cash credited with the reimbursement
  const posting = { dr: heads.filter((h) => byHead[h]).map((h) => [`${h} A/c`, byHead[h]]), cr: [['Cash A/c (reimbursement of petty cash)', reimburse]] };
  same(sum(posting.dr.map(([, a]) => a)), sum(posting.cr.map(([, a]) => a)), 'petty cash posting summary balances');
  const postHeaders = ['Account', 'Posted from', 'Dr (₹)', 'Cr (₹)'];
  const postRows = [...posting.dr.map(([a, x]) => [`${a}`, 'Total of the analysis column', inr(x), '']), ['Cash A/c', 'Reimbursement paid to the petty cashier', '', inr(reimburse)], [bold('Total'), '', bold(inr(spent)), bold(inr(spent))]];
  return { headers, rows, md: mdTable(headers, rows), spent, closing, reimburse, byHead, received, imprest, open, lines, heads, posting, postHeaders, postRows, postMd: mdTable(postHeaders, postRows) };
}

// ================================================================ purchases, sales and returns books
export const KINDS = {
  purchases: { code: 'PB', book: 'Purchases Book', no: 'Invoice no.', who: 'Name of supplier', goods: 'Purchases', paper: 'invoice received' },
  sales: { code: 'SB', book: 'Sales Book', no: 'Invoice no.', who: 'Name of customer', goods: 'Sales', paper: 'invoice sent' },
  purchaseReturns: { code: 'PRB', book: 'Purchases Return Book', no: 'Debit note no.', who: 'Name of supplier', goods: 'Purchases Return', paper: 'debit note sent' },
  salesReturns: { code: 'SRB', book: 'Sales Return Book', no: 'Credit note no.', who: 'Name of customer', goods: 'Sales Return', paper: 'credit note sent' },
};
/** Entry of a day book. goods = list price (a number) in the simple format, or { column: list price } in the columnar format. */
export const T = (date, no, party, goods, td = 0) => ({ date, no, party, goods, td });

/**
 * Day book for goods. Only the NET amount (list price less trade discount) is recorded. columns = null gives the simple
 * format; an array of column names gives the columnar format with a column per class of goods and a total column.
 * Returns the book (headers, rows), the working of list price and trade discount, the totals, the personal-account
 * summary (party totals) and the posting summary (dr, cr), asserted to agree.
 */
export function dayBook({ kind, entries, columns = null, page = 1 }) {
  const K = KINDS[kind];
  check(K, `unknown kind ${kind}`);
  const cols = columns ?? ['Goods'];
  const goodsAcc = (c) => (columns ? `${c} ${K.goods} A/c` : `${K.goods} A/c`);
  const es = entries.map((e) => {
    const lists = cols.map((c) => (columns ? e.goods[c] ?? 0 : e.goods));
    if (columns) for (const k of Object.keys(e.goods)) check(columns.includes(k), `unknown column ${k}`);
    const tds = lists.map((l) => whole((l * e.td) / 100, `trade discount of ${e.party}`));
    const nets = lists.map((l, i) => l - tds[i]);
    return { ...e, lists, tds, nets, list: sum(lists), tdAmt: sum(tds), net: sum(nets) };
  });
  const byCol = cols.map((_, i) => sum(es.map((e) => e.nets[i])));
  const totals = { list: sum(es.map((e) => e.list)), td: sum(es.map((e) => e.tdAmt)), net: sum(es.map((e) => e.net)), byCol };
  same(totals.list - totals.td, totals.net, `${kind}: list price less trade discount equals net`);
  same(sum(byCol), totals.net, `${kind}: column totals add up to the book total`);
  const folio = `${K.code} ${page}`;
  const headers = ['Date', K.no, K.who, 'L.F.', ...(columns ? [...columns.map((c) => `${c} (₹)`), 'Total (₹)'] : ['Amount (₹)'])];
  const rows = es.map((e) => [e.date, e.no, e.party, '', ...(columns ? [...e.nets.map(cell), inr(e.net)] : [inr(e.net)])]);
  rows.push(['', '', bold('Total'), '', ...(columns ? [...byCol.map((x) => bold(inr(x))), bold(inr(totals.net))] : [bold(inr(totals.net))])]);
  const workHeaders = [K.no, K.who, 'List price (₹)', 'Trade discount (₹)', 'Net amount (₹)'];
  const work = es.map((e) => [e.no, e.party, inr(e.list), cell(e.tdAmt), inr(e.net)]);
  work.push([bold('Total'), '', bold(inr(totals.list)), bold(inr(totals.td)), bold(inr(totals.net))]);
  const parties = [...new Set(es.map((e) => e.party))].map((p) => [p, sum(es.filter((e) => e.party === p).map((e) => e.net))]);
  const goodsLines = columns ? columns.map((c, i) => [goodsAcc(c), byCol[i]]).filter(([, a]) => a) : [[goodsAcc('Goods'), totals.net]];
  const partyLines = parties.map(([p, a]) => [`${p} A/c`, a]);
  const debitGoods = kind === 'purchases' || kind === 'salesReturns';
  const posting = debitGoods ? { dr: goodsLines, cr: partyLines } : { dr: partyLines, cr: goodsLines };
  same(sum(posting.dr.map(([, a]) => a)), sum(posting.cr.map(([, a]) => a)), `${kind} posting summary balances`);
  same(sum(parties.map(([, a]) => a)), totals.net, `${kind}: party totals agree with the book total`);
  return { kind, K, folio, columns, headers, rows, md: mdTable(headers, rows), workHeaders, work, workMd: mdTable(workHeaders, work), entries: es, totals, parties, goodsLines, posting, goodsAcc };
}

/** Posting summary of a day book as a table: which accounts are debited and credited with the book totals. */
export function postMd(bk) {
  const t = sum(bk.posting.dr.map(([, a]) => a));
  const rows = [...bk.posting.dr.map(([a, x]) => [a, inr(x), '']), ...bk.posting.cr.map(([a, x]) => [a, '', inr(x)]), [bold('Total'), bold(inr(t)), bold(inr(t))]];
  return mdTable(['Account', 'Dr (₹)', 'Cr (₹)'], rows);
}

// ================================================================ ledger accounts with dates and folios
/**
 * A two-sided account with dates and a folio column. dr/cr lines = [date, particulars, amount, folio?]. opening =
 * { side, amount, date? } is shown as Balance b/d. balanced:false shows the posted lines only (used for nominal accounts
 * such as Purchases A/c, which are closed by transfer, not balanced). Asserts the totals agree after balancing.
 */
export function acct({ name, opening, dr = [], cr = [], close = '', next = '', balanced = true }) {
  const D = [...(opening?.side === 'dr' ? [[opening.date ?? '', 'To Balance b/d', opening.amount, '']] : []), ...dr];
  const C = [...(opening?.side === 'cr' ? [[opening.date ?? '', 'By Balance b/d', opening.amount, '']] : []), ...cr];
  const dTot = sum(D.map((l) => l[2]));
  const cTot = sum(C.map((l) => l[2]));
  const balance = dTot - cTot;
  const rows = [];
  const line = (a, b) => [a?.[0] ?? '', a?.[1] ?? '', a?.[3] ?? '', a ? inr(a[2]) : '', b?.[0] ?? '', b?.[1] ?? '', b?.[3] ?? '', b ? inr(b[2]) : ''];
  const headers = ['Date', 'Particulars', 'J.F.', '₹', 'Date', 'Particulars', 'J.F.', '₹'];
  if (!balanced) {
    const n = Math.max(D.length, C.length);
    for (let i = 0; i < n; i++) rows.push(line(D[i], C[i]));
    rows.push(['', bold('Total of posted items'), '', bold(inr(dTot)), '', bold('Total of posted items'), '', bold(inr(cTot))]);
    return { name, headers, rows, md: mdTable(headers, rows), balance, dr: dTot, cr: cTot, total: Math.max(dTot, cTot) };
  }
  if (balance > 0) C.push([close, 'By Balance c/d', balance, '']);
  else if (balance < 0) D.push([close, 'To Balance c/d', -balance, '']);
  const total = sum(D.map((l) => l[2]));
  same(total, sum(C.map((l) => l[2])), `${name} totals agree`);
  const n = Math.max(D.length, C.length);
  for (let i = 0; i < n; i++) rows.push(line(D[i], C[i]));
  rows.push(['', '', '', bold(inr(total)), '', '', '', bold(inr(total))]);
  if (balance > 0) rows.push([next, 'To Balance b/d', '', inr(balance), '', '', '', '']);
  else if (balance < 0) rows.push(['', '', '', '', next, 'By Balance b/d', '', inr(-balance)]);
  return { name, headers, rows, md: mdTable(headers, rows), balance, dr: dTot, cr: cTot, total };
}

/** A set of ledger accounts built from lines posted out of the subsidiary books. */
export class Ledger {
  constructor() { this.m = new Map(); this.posted = []; }
  get(name) { if (!this.m.has(name)) this.m.set(name, { dr: [], cr: [], opening: null }); return this.m.get(name); }
  open(name, side, amount, date = '') { this.get(name).opening = { side, amount, date }; return this; }
  dr(name, date, part, amount, folio = '') { this.get(name).dr.push([date, part, amount, folio]); return this; }
  cr(name, date, part, amount, folio = '') { this.get(name).cr.push([date, part, amount, folio]); return this; }
  /**
   * Posts a day book: every invoice or note to its personal account, and the column totals to the goods accounts on
   * postDate. Asserts that what went to the personal accounts equals what went to the goods accounts equals the book total.
   */
  fromBook(bk, postDate) {
    const { K, folio } = bk;
    let personal = 0;
    let goods = 0;
    const personalIsDebit = bk.kind === 'sales' || bk.kind === 'purchaseReturns';
    const other = K.goods + ' A/c';
    for (const e of bk.entries) {
      const name = `${e.party} A/c`;
      personal += e.net;
      if (personalIsDebit) this.dr(name, e.date, `To ${other}`, e.net, folio);
      else this.cr(name, e.date, `By ${other}`, e.net, folio);
    }
    for (const [name, amt] of bk.goodsLines) {
      goods += amt;
      if (personalIsDebit) this.cr(name, postDate, `By Sundries as per ${K.book}`, amt, folio);
      else this.dr(name, postDate, `To Sundries as per ${K.book}`, amt, folio);
    }
    same(personal, bk.totals.net, `${bk.kind}: postings to personal accounts equal the book total`);
    same(goods, bk.totals.net, `${bk.kind}: postings to goods accounts equal the book total`);
    this.posted.push({ kind: bk.kind, personal, goods });
    return this;
  }
  /** Posts journal proper entries: each debit as "To <other account>", each credit as "By <other account>" (Sundries when several). */
  fromJournal(entries, folio = 'J 1') {
    let d = 0;
    let c = 0;
    for (const e of entries) {
      const crName = e.cr.length === 1 ? e.cr[0][0] : 'Sundries';
      const drName = e.dr.length === 1 ? e.dr[0][0] : 'Sundries';
      for (const [a, amt] of e.dr) { this.dr(a, e.date, `To ${crName}`, amt, folio); d += amt; }
      for (const [a, amt] of e.cr) { this.cr(a, e.date, `By ${drName}`, amt, folio); c += amt; }
    }
    same(d, c, 'journal proper postings: debits equal credits');
    return this;
  }
  /** The account as a two-sided table. Nominal accounts: pass { balanced: false }. */
  show(name, o = {}) {
    const a = this.get(name);
    return acct({ name, opening: a.opening, dr: a.dr, cr: a.cr, ...o });
  }
  balance(name) { return this.show(name, { balanced: false }).balance; }
}

// ================================================================ routing a list of transactions to the right book
const BOOK_OF = { purchase: 'Purchases Book', sale: 'Sales Book', preturn: 'Purchases Return Book', sreturn: 'Sales Return Book', cash: 'Cash Book', jp: 'Journal Proper' };
/**
 * txs = [{ kind: 'purchase'|'sale'|'preturn'|'sreturn'|'cash'|'jp', date, text, ... }]. purchase/sale/preturn/sreturn
 * carry party, no, goods (list price) and td; jp carries an entry { dr, cr, note }; cash is only classified (the cash
 * book is another chapter). Returns the four day books, the journal proper entries and a classification table. Every
 * transaction is asserted to be recorded in exactly one book.
 */
export function route(txs, { columns = {} } = {}) {
  const pick = (k) => txs.filter((t) => t.kind === k).map((t) => T(t.date, t.no, t.party, t.goods, t.td ?? 0));
  const books = {};
  for (const [k, kind] of [['purchase', 'purchases'], ['sale', 'sales'], ['preturn', 'purchaseReturns'], ['sreturn', 'salesReturns']]) {
    const es = pick(k);
    if (es.length) books[kind] = dayBook({ kind, entries: es, columns: columns[kind] ?? null });
  }
  const jp = txs.filter((t) => t.kind === 'jp').map((t) => ({ date: t.date, dr: t.dr, cr: t.cr, note: t.note }));
  const cash = txs.filter((t) => t.kind === 'cash');
  const counted = Object.values(books).reduce((s, b) => s + b.entries.length, 0) + jp.length + cash.length;
  same(counted, txs.length, 'every transaction is recorded in exactly one book');
  const headers = ['Date', 'Transaction', 'Book of first entry'];
  const rows = txs.map((t) => [t.date, t.text, BOOK_OF[t.kind]]);
  return { books, jp, cash, headers, rows, md: mdTable(headers, rows) };
}
export const bookOf = (kind) => BOOK_OF[kind];

/** Journal proper entry shorthand. */
export const E = (date, dr, cr, note) => ({ date, dr, cr, note });

// ================================================================ self-checks (run on import)
{
  const pc = pettyCash({ imprest: 1000, open: 100, heads: ['Postage', 'Fares'], vouchers: [V('1', '1', 'Stamps', { Postage: 100 }), V('2', '2', 'Fare', { Fares: 150 })] });
  same(pc.spent, 250, 'self-check petty spent');
  same(pc.closing, 750, 'self-check petty closing');
  same(pc.received, 900, 'self-check petty received');
  let threw = false;
  try { pettyCash({ imprest: 100, heads: ['A'], vouchers: [V('1', '1', 'x', { A: 150 })] }); } catch { threw = true; }
  check(threw, 'petty cash must reject overspending');
  const pb = dayBook({ kind: 'purchases', entries: [T('1', '1', 'A', 10000, 10), T('2', '2', 'B', 5000)] });
  same(pb.totals.net, 14000, 'self-check purchases net');
  same(pb.totals.td, 1000, 'self-check trade discount');
  const cb = dayBook({ kind: 'sales', columns: ['X', 'Y'], entries: [T('1', '1', 'A', { X: 4000, Y: 2000 }, 10), T('2', '2', 'B', { Y: 1000 })] });
  same(cb.totals.byCol[0], 3600, 'self-check column X');
  same(cb.totals.byCol[1], 2800, 'self-check column Y');
  const L = new Ledger().open('A A/c', 'dr', 500, '1').fromBook(cb, '31');
  same(L.show('A A/c', { close: '31' }).balance, 6500 - 6500 + 500 + 5400, 'self-check personal balance');
  same(L.show('X Sales A/c', { balanced: false }).balance, -3600, 'self-check goods account');
  const r = route([{ kind: 'purchase', date: '1', no: '1', party: 'P', goods: 1000, td: 0, text: 't' }, { kind: 'cash', date: '2', text: 'c' }]);
  same(Object.keys(r.books).length, 1, 'self-check route');
  same(journal([E('1', [['Drawings A/c', 100]], [['Purchases A/c', 100]], 'x')]).total, 100, 'self-check journal');
}
