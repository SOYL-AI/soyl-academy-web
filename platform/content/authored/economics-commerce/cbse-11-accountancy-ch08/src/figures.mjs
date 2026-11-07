// Computed, asserted figures for CBSE 11 Accountancy ch08 Financial Statements I. Every firm is imagined.
// One trial balance per problem; the Trading Account, the Profit and Loss Account, the Balance Sheet (in both orders),
// the closing entries and the opening entry are all generated from it with the shared acc.mjs, and every trial balance
// item is used exactly once.
import { sum, check, same, whole, inr, rs, words, rupees, mdTable, journal, trialBalance, trading, profitLoss, balanceSheet } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
export { sum, check, same, whole, inr, rs, words, rupees, mdTable };

const DEBIT = ['os', 'pur', 'sret', 'dexp', 'iexp', 'draw', 'fa', 'inv', 'ca'];
const CREDIT = ['sale', 'pret', 'inc', 'cap', 'ltl', 'cl'];
const isDr = (r) => DEBIT.includes(r);
/** Title case for account names in statements and journals ("Opening stock" becomes "Opening Stock"). */
export const T = (s) => s.split(' ').map((w, i) => (i > 0 && ['and', 'of', 'in', 'on', 'to', 'at'].includes(w) ? w : w[0].toUpperCase() + w.slice(1))).join(' ');
export const acct = (n) => `${T(n)} A/c`;
const DEST = { os: 'Trading A/c, debit', pur: 'Trading A/c, debit (less returns)', pret: 'Trading A/c, debit (deducted from purchases)', sret: 'Trading A/c, credit (deducted from sales)', sale: 'Trading A/c, credit', dexp: 'Trading A/c, debit', iexp: 'Profit and Loss A/c, debit', inc: 'Profit and Loss A/c, credit', draw: 'Balance Sheet, deducted from capital', cap: 'Balance Sheet, liabilities side', ltl: 'Balance Sheet, long-term liabilities', cl: 'Balance Sheet, current liabilities', fa: 'Balance Sheet, fixed assets', inv: 'Balance Sheet, investments', ca: 'Balance Sheet, current assets' };

/**
 * lines: [name, amount | null, role, kind?]. role: os pur sret dexp iexp draw fa inv ca (debit side) and sale pret inc cap ltl cl (credit side).
 * The capital may be left null: it is the balancing figure of the trial balance. closing = closing stock (given outside the trial balance).
 */
export function finals({ firm, date, nextDate, lines, closing, closingName = 'Closing stock' }) {
  const L = lines.map(([name, amt, role, kind]) => ({ name, amt, role, kind }));
  const names = new Set(L.map((l) => l.name));
  check(names.size === L.length, `${firm}: duplicate account name`);
  for (const l of L) check([...DEBIT, ...CREDIT].includes(l.role), `${firm}: bad role ${l.role} for ${l.name}`);
  const cap = L.filter((l) => l.role === 'cap');
  check(cap.length === 1, `${firm}: one capital line needed`);
  const netDr = sum(L.filter((l) => l.role !== 'cap').map((l) => (isDr(l.role) ? l.amt : -l.amt)));
  if (cap[0].amt == null) cap[0].amt = netDr;
  else same(cap[0].amt, netDr, `${firm}: capital is the balancing figure`);
  check(cap[0].amt > 0, `${firm}: capital positive`);
  const tb = trialBalance(L.map((l) => [l.name, isDr(l.role) ? l.amt : 0, isDr(l.role) ? 0 : l.amt]));

  const used = new Map();
  const take = (role) => { const xs = L.filter((l) => l.role === role); xs.forEach((l) => used.set(l.name, (used.get(l.name) ?? 0) + 1)); return xs; };
  const one = (role) => { const xs = take(role); check(xs.length <= 1, `${firm}: more than one ${role}`); return xs[0]?.amt ?? 0; };
  const os = one('os'), pur = one('pur'), pret = one('pret'), sale = one('sale'), sret = one('sret'), draw = one('draw'), capOpen = one('cap');
  const dexp = take('dexp'), iexp = take('iexp'), inc = take('inc'), fa = take('fa'), inv = take('inv'), ca = take('ca'), ltl = take('ltl'), cl = take('cl');
  check(L.every((l) => used.get(l.name) === 1), `${firm}: every trial balance item must be used exactly once`);
  check(sum([...used.values()]) === L.length, `${firm}: use count`);

  const netPur = pur - pret;
  const netSale = sale - sret;
  const trD = [os ? ['To Opening Stock', os] : null, [pret ? `To Purchases (${rs(pur)}) less Returns (${rs(pret)})` : 'To Purchases', netPur], ...dexp.map((l) => [`To ${T(l.name)}`, l.amt])].filter(Boolean);
  const trC = [[sret ? `By Sales (${rs(sale)}) less Returns (${rs(sret)})` : 'By Sales', netSale], [`By ${T(closingName)}`, closing]];
  const tr = trading({ dr: trD, cr: trC });
  const gp = tr.gp;
  const plD = [...(gp < 0 ? [['To Gross Loss b/d', -gp]] : []), ...iexp.map((l) => [`To ${T(l.name)}`, l.amt])];
  const plC = [...(gp > 0 ? [['By Gross Profit b/d', gp]] : []), ...inc.map((l) => [`By ${T(l.name)}`, l.amt])];
  const pl = profitLoss({ dr: plD, cr: plC });
  const np = pl.np;
  const direct = sum(dexp.map((l) => l.amt));
  const indirect = sum(iexp.map((l) => l.amt));
  const incomes = sum(inc.map((l) => l.amt));
  same(gp, netSale + closing - os - netPur - direct, `${firm}: gross profit by formula`);
  same(np, gp + incomes - indirect, `${firm}: net profit by formula`);
  const operating = gp - sum(iexp.filter((l) => l.kind !== 'fin').map((l) => l.amt));

  const capClosing = capOpen + np - draw;
  const capLabel = `Capital (${rs(capOpen)}) ${np >= 0 ? '+ Net Profit' : '− Net Loss'} (${rs(Math.abs(np))}) − Drawings (${rs(draw)})`;
  const capLine = [capLabel, capClosing];
  const clName = T(closingName);
  const assetsPerm = [...fa.map((l) => [T(l.name), l.amt]), ...inv.map((l) => [T(l.name), l.amt]), [clName, closing], ...ca.map((l) => [T(l.name), l.amt])];
  const liabPerm = [capLine, ...ltl.map((l) => [T(l.name), l.amt]), ...cl.map((l) => [T(l.name), l.amt])];
  const liabLiq = [...cl.map((l) => [T(l.name), l.amt]), ...ltl.map((l) => [T(l.name), l.amt]), capLine];
  const bsLiq = balanceSheet({ liabilities: liabLiq, assets: [...assetsPerm].reverse() });
  // Permanence order with group headings (grouping and marshalling).
  const grp = (heads) => heads.filter(([, xs]) => xs.length).flatMap(([h, xs]) => [[`**${h}**`, null], ...xs.map(([n, a]) => [n, a])]);
  const lg = grp([['Capital', [capLine]], ['Long-term liabilities', ltl.map((l) => [T(l.name), l.amt])], ['Current liabilities', cl.map((l) => [T(l.name), l.amt])]]);
  const ag = grp([['Fixed assets', fa.map((l) => [T(l.name), l.amt])], ['Investments', inv.map((l) => [T(l.name), l.amt])], ['Current assets', [[clName, closing], ...ca.map((l) => [T(l.name), l.amt])]]]);
  const bsPerm = balanceSheet({ liabilities: liabPerm, assets: assetsPerm });
  const n = Math.max(lg.length, ag.length);
  const gRows = [];
  for (let i = 0; i < n; i++) gRows.push([lg[i]?.[0] ?? '', lg[i]?.[1] != null ? inr(lg[i][1]) : '', ag[i]?.[0] ?? '', ag[i]?.[1] != null ? inr(ag[i][1]) : '']);
  gRows.push(['**Total**', `**${inr(bsPerm.total)}**`, '**Total**', `**${inr(bsPerm.total)}**`]);
  const bsGrouped = { headers: ['Liabilities', '₹', 'Assets', '₹'], rows: gRows, md: mdTable(['Liabilities', '₹', 'Assets', '₹'], gRows), total: bsPerm.total };

  // Closing entries, all generated from the trial balance (one entry per step; an empty step is skipped).
  const A = (x) => acct(x);
  const dr1 = [['Opening stock', os], ['Purchases', pur], ...L.filter((l) => l.role === 'sret').map((l) => [l.name, l.amt]), ...dexp.map((l) => [l.name, l.amt])].filter(([, a]) => a);
  const nameOf = (role) => L.find((l) => l.role === role)?.name;
  const dr1names = [['Opening stock', os, nameOf('os')], ['Purchases', pur, nameOf('pur')], ['Sales returns', sret, nameOf('sret')]];
  void dr1names;
  const dr1real = [[nameOf('os'), os], [nameOf('pur'), pur], [nameOf('sret'), sret], ...dexp.map((l) => [l.name, l.amt])].filter(([, a]) => a);
  void dr1;
  const E = [];
  const put = (step, dr, cr, note) => { if (dr.length && sum(dr.map(([, a]) => a))) E.push({ step, date, dr, cr, note }); };
  put(1, [['Trading A/c', sum(dr1real.map(([, a]) => a))]], dr1real.map(([x, a]) => [A(x), a]), 'Being opening stock, purchases, sales returns and direct expenses transferred to the Trading Account');
  put(2, [[A(nameOf('sale')), sale], ...(pret ? [[A(nameOf('pret')), pret]] : [])], [['Trading A/c', sale + pret]], pret ? 'Being sales and purchases returns transferred to the Trading Account' : 'Being sales transferred to the Trading Account');
  put(3, [[`${T(closingName)} A/c`, closing]], [['Trading A/c', closing]], 'Being closing stock brought into the books and credited to the Trading Account');
  if (gp >= 0) put(4, [['Trading A/c', gp]], [['Profit and Loss A/c', gp]], 'Being gross profit transferred to the Profit and Loss Account');
  else put(4, [['Profit and Loss A/c', -gp]], [['Trading A/c', -gp]], 'Being gross loss transferred to the Profit and Loss Account');
  put(5, [['Profit and Loss A/c', indirect]], iexp.map((l) => [A(l.name), l.amt]), 'Being indirect expenses and losses transferred to the Profit and Loss Account');
  put(6, inc.map((l) => [A(l.name), l.amt]), [['Profit and Loss A/c', incomes]], 'Being incomes transferred to the Profit and Loss Account');
  const cname = 'Capital A/c';
  if (np >= 0) put(7, [['Profit and Loss A/c', np]], [[cname, np]], 'Being net profit transferred to the Capital Account');
  else put(7, [[cname, -np]], [['Profit and Loss A/c', -np]], 'Being net loss transferred to the Capital Account');
  put(8, [[cname, draw]], [[A(nameOf('draw')), draw]], 'Being drawings transferred to the Capital Account');
  const closingJournal = journal(E);
  // Every nominal account must now be closed and every real account must carry its balance-sheet figure.
  const bal = new Map();
  for (const l of L) bal.set(A(l.name), isDr(l.role) ? l.amt : -l.amt);
  for (const e of E) {
    for (const [a, x] of e.dr) bal.set(a, (bal.get(a) ?? 0) + x);
    for (const [a, x] of e.cr) bal.set(a, (bal.get(a) ?? 0) - x);
  }
  for (const l of L.filter((x) => ['os', 'pur', 'sret', 'dexp', 'iexp', 'sale', 'pret', 'inc', 'draw'].includes(x.role))) same(bal.get(A(l.name)), 0, `${firm}: ${l.name} closed`);
  same(bal.get('Trading A/c') ?? 0, 0, `${firm}: Trading A/c closed`);
  same(bal.get('Profit and Loss A/c') ?? 0, 0, `${firm}: Profit and Loss A/c closed`);
  same(-bal.get(cname), capClosing, `${firm}: capital after closing entries`);
  same(bal.get(`${T(closingName)} A/c`), closing, `${firm}: closing stock account`);

  // Opening entry on the first day of the next year, from the balance sheet.
  const assetsOpen = assetsPerm.map(([x, a]) => [x === clName ? 'Stock A/c' : `${x} A/c`, a]);
  const liabOpen = [...ltl, ...cl].map((l) => [A(l.name), l.amt]);
  const opening = journal([{ date: nextDate, dr: assetsOpen, cr: [[cname, capClosing], ...liabOpen], note: `Being balances brought forward from the Balance Sheet on ${date}` }]);
  same(opening.total, bsPerm.total, `${firm}: opening entry total`);

  const where = L.map((l) => [T(l.name), inr(l.amt), isDr(l.role) ? 'Debit' : 'Credit', DEST[l.role]]);
  return { firm, date, nextDate, L, tb, tr, pl, gp, np, os, pur, pret, sale, sret, netPur, netSale, direct, indirect, incomes, operating, draw, capOpen, capClosing, capLabel, closing, bsPerm, bsLiq, bsGrouped, E, closingJournal, opening, where, total: bsPerm.total, dexp, iexp, inc, fa, inv, ca, ltl, cl, nameOf };
}

// ---------------------------------------------------------------- the imagined firms
/** Main example: a profit, with returns, direct and indirect expenses, a long-term loan and an investment (20 items). */
export const FT = finals({
  firm: 'Farhan Textiles', date: '31 March 2026', nextDate: '1 April 2026', closing: 120000,
  lines: [
    ['Opening stock', 90000, 'os'], ['Purchases', 620000, 'pur'], ['Sales returns', 14000, 'sret'], ['Carriage inwards', 12000, 'dexp'], ['Wages', 48000, 'dexp'],
    ['Salaries', 96000, 'iexp', 'op'], ['Rent', 36000, 'iexp', 'op'], ['Advertising', 18000, 'iexp', 'op'], ['Drawings', 60000, 'draw'],
    ['Machinery', 180000, 'fa'], ['Furniture', 60000, 'fa'], ['Investments', 50000, 'inv'], ['Debtors', 110000, 'ca'], ['Cash at bank', 70000, 'ca'],
    ['Sales', 940000, 'sale'], ['Purchases returns', 18000, 'pret'], ['Commission received', 12000, 'inc'], ['Creditors', 85000, 'cl'], ['Bank loan', 150000, 'ltl'], ['Capital', null, 'cap'],
  ],
});
/** A bakery whose gross profit turns into a net loss (20 items). */
export const GB = finals({
  firm: 'Gauri Bakery', date: '31 March 2025', nextDate: '1 April 2025', closing: 70000,
  lines: [
    ['Opening stock', 60000, 'os'], ['Purchases', 340000, 'pur'], ['Sales returns', 10000, 'sret'], ['Freight inwards', 15000, 'dexp'], ['Power and fuel', 21000, 'dexp'], ['Wages', 30000, 'dexp'],
    ['Salaries', 72000, 'iexp', 'op'], ['Rent', 48000, 'iexp', 'op'], ['Interest on loan', 18000, 'iexp', 'fin'], ['Drawings', 36000, 'draw'],
    ['Ovens and machinery', 160000, 'fa'], ['Furniture', 40000, 'fa'], ['Debtors', 55000, 'ca'], ['Cash in hand', 12000, 'ca'],
    ['Sales', 510000, 'sale'], ['Purchases returns', 8000, 'pret'], ['Commission received', 5000, 'inc'], ['Creditors', 48000, 'cl'], ['Bank loan', 120000, 'ltl'], ['Capital', null, 'cap'],
  ],
});
/** A gross loss and a net loss (17 items). */
export const IG = finals({
  firm: 'Ila Garments', date: '31 March 2026', nextDate: '1 April 2026', closing: 60000,
  lines: [
    ['Opening stock', 120000, 'os'], ['Purchases', 280000, 'pur'], ['Carriage inwards', 10000, 'dexp'], ['Wages', 20000, 'dexp'], ['Salaries', 36000, 'iexp', 'op'], ['Rent', 24000, 'iexp', 'op'], ['Drawings', 30000, 'draw'],
    ['Machinery', 90000, 'fa'], ['Furniture', 50000, 'fa'], ['Debtors', 40000, 'ca'], ['Cash in hand', 20000, 'ca'],
    ['Sales', 350000, 'sale'], ['Purchases returns', 5000, 'pret'], ['Rent received', 12000, 'inc'], ['Creditors', 35000, 'cl'], ['Bank loan', 60000, 'ltl'], ['Capital', null, 'cap'],
  ],
});
/** A profit with customs duty, insurance, carriage outwards and interest (20 items). */
export const JE = finals({
  firm: 'Jatin Electricals', date: '31 March 2026', nextDate: '1 April 2026', closing: 95000,
  lines: [
    ['Opening stock', 80000, 'os'], ['Purchases', 450000, 'pur'], ['Wages', 36000, 'dexp'], ['Carriage inwards', 9000, 'dexp'], ['Customs duty', 14000, 'dexp'],
    ['Salaries', 60000, 'iexp', 'op'], ['Insurance', 8000, 'iexp', 'op'], ['Carriage outwards', 11000, 'iexp', 'op'], ['Interest on loan', 10000, 'iexp', 'fin'], ['Drawings', 45000, 'draw'],
    ['Land and building', 300000, 'fa'], ['Plant', 120000, 'fa'], ['Debtors', 90000, 'ca'], ['Cash at bank', 55000, 'ca'], ['Cash in hand', 8000, 'ca'],
    ['Sales', 710000, 'sale'], ['Discount received', 7000, 'inc'], ['Creditors', 65000, 'cl'], ['Bank loan', 100000, 'ltl'], ['Capital', null, 'cap'],
  ],
});
/** A smaller firm for closing entries with a purchases return and a sales return (16 items). */
export const OP = finals({
  firm: 'Omkar Paints', date: '31 March 2027', nextDate: '1 April 2027', closing: 52000,
  lines: [
    ['Opening stock', 44000, 'os'], ['Purchases', 260000, 'pur'], ['Sales returns', 6000, 'sret'], ['Wages', 28000, 'dexp'], ['Carriage inwards', 7000, 'dexp'],
    ['Salaries', 54000, 'iexp', 'op'], ['Rent', 24000, 'iexp', 'op'], ['Drawings', 30000, 'draw'], ['Furniture', 40000, 'fa'], ['Debtors', 48000, 'ca'], ['Cash at bank', 38000, 'ca'],
    ['Sales', 430000, 'sale'], ['Purchases returns', 4000, 'pret'], ['Interest received', 3000, 'inc'], ['Creditors', 42000, 'cl'], ['Capital', null, 'cap'],
  ],
});
for (const f of [FT, GB, IG, JE, OP]) check(f.L.length >= 15 && f.L.length <= 20, `${f.firm}: ${f.L.length} trial balance items`);
check(FT.gp > 0 && FT.np > 0 && GB.gp > 0 && GB.np < 0 && IG.gp < 0 && IG.np < 0 && JE.np > 0 && OP.np > 0, 'scenario signs');

// ---------------------------------------------------------------- small helpers for items
/** Gross profit (+) or loss (−) from the figures of a Trading Account. */
export const gpOf = ({ os = 0, pur, pret = 0, dexp = [], sale, sret = 0, cs }) => sale - sret + cs - os - (pur - pret) - sum(dexp);
/** Net profit from gross profit, other incomes and indirect expenses. */
export const npOf = ({ gp, inc = [], iexp = [] }) => gp + sum(inc) - sum(iexp);
export const list = (pairs) => pairs.map(([a, x]) => `${a} ${rs(x)}`).join(', ');
/** Table of a classification, with computed totals. cls: 'cap' | 'rev' | 'def'. */
export const CLS = { cap: 'Capital expenditure', rev: 'Revenue expenditure', def: 'Deferred revenue expenditure' };
export function classify(items) {
  const rows = items.map(([text, amt, cls, why]) => [text, rs(amt), CLS[cls], why]);
  const cap = sum(items.filter(([, , c]) => c === 'cap').map(([, a]) => a));
  const rev = sum(items.filter(([, , c]) => c === 'rev').map(([, a]) => a));
  const def = sum(items.filter(([, , c]) => c === 'def').map(([, a]) => a));
  same(cap + rev + def, sum(items.map(([, a]) => a)), 'classification covers every item');
  const headers = ['Item', 'Amount', 'Class', 'Reason'];
  return { headers, rows, md: mdTable(headers, rows), cap, rev, def };
}
