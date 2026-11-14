// t02: preparing a trial balance by the balance method (sides decided from the nature of each balance, opening stock and
// closing stock, a missing capital as the balancing figure, ledgers and then the trial balance from transactions).
// Imagined firms; every trial balance is generated and asserted by tb.mjs.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, check, sum, inr, rs, mdTable, journal, post, trialBalance, fromBalances, withCapital } from './tb.mjs';
import { QQ, numQ, lst } from './qq.mjs';

const sideCol = (r, s) => r.rows.filter((x) => x.side === s);
/** "Debit: …; Credit: …" lines for a model answer. */
const sidesMd = (r) => `Debit column: ${sideCol(r, 'dr').map((x) => x.name).join(', ')}.\n\nCredit column: ${sideCol(r, 'cr').map((x) => x.name).join(', ')}.`;

// ================================================================ multiple choice
QQ('m_side_prov', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the trial balance of Tiruvarur Tubes, an imagined firm, the provision for doubtful debts of ₹6,000 is shown on',
  opts: ['the credit side, as an amount set aside against possible bad debts', 'the debit side, as an expense of the year', 'the debit side, as an asset', 'neither side, because it is not a ledger balance'],
  sol: 'A provision is a credit balance. It is not an asset, and it is a ledger balance, so it is listed; the expense that created it belongs to the profit and loss account.',
}));
{
  const r = withCapital([['Cash', 40000, 'asset'], ['Debtors', 680000, 'debtor'], ['Creditors', 395000, 'creditor']]);
  same(r.capital, 325000, 'm_cap_missing');
  QQ('m_cap_missing', mcq({
    t: 2, d: 3, c: 'application',
    stem: `The debit balances of Tumkur Tools, an imagined firm, other than capital total ${rs(720000)} and its credit balances other than capital total ${rs(395000)}. If the trial balance is to agree, its capital must be`,
    opts: [rs(325000), rs(1115000), rs(395000), rs(720000)],
    sol: `Capital = ${inr(720000)} − ${inr(395000)} = ${rs(325000)}. The figure ${rs(1115000)} is the two totals added, ${rs(395000)} is the credit total alone, and ${rs(720000)} is the debit total alone.`,
  }));
}
QQ('m_side_return', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Sultanpur Seeds, an imagined firm, has sales return of ₹6,000 and purchases return of ₹4,500. In its trial balance they are shown respectively on the',
  opts: ['debit side and credit side', 'credit side and debit side', 'debit side and debit side', 'credit side and credit side'],
  sol: 'Sales return reduces sales and is a debit balance. Purchases return reduces purchases and is a credit balance.',
}));
QQ('m_side_open', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The ledger balances of Vapi Vinyls, an imagined firm, include opening stock of ₹58,000, and closing stock of ₹64,000 is given as additional information. The trial balance should show',
  opts: ['opening stock on the debit side and no entry for closing stock', 'opening stock on the debit side and closing stock on the credit side', 'closing stock on the debit side and no entry for opening stock', 'opening stock on the credit side and closing stock on the debit side'],
  sol: 'Opening stock is a ledger balance and is a debit. Closing stock is found at the year end and is not a balance of the books at that stage, so it is left out and carried to the final accounts.',
}));
QQ('m_overdraft', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Mancherial Motors, an imagined firm, has overdrawn its bank account by ₹35,000. In its trial balance the overdraft is shown on',
  opts: ['the credit side, as a liability to the bank', 'the debit side, like cash at bank', 'the debit side, as an expense', 'neither side, because it is a temporary balance'],
  sol: 'The firm owes this amount to the bank, so it is a credit balance. Cash at bank is a debit balance only when the firm has money in the bank, and an overdraft is not an expense.',
}));
{
  const amt = 7450;
  QQ('m_wrong_side', mcq({
    t: 2, d: 4, c: 'application',
    stem: `The correct trial balance of Sirsa Sewing Works, an imagined firm, has equal totals. A clerk wrote a debit balance of ${rs(amt)} in the credit column by mistake. After this slip, the totals differ by`,
    opts: [`${rs(2 * amt)}, the credit side being higher`, `${rs(amt)}, the credit side being higher`, `${rs(2 * amt)}, the debit side being higher`, `${rs(amt / 2)}, the credit side being higher`],
    sol: `The debit column is short by ${inr(amt)} and the credit column is over by the same sum, so the gap is twice ${inr(amt)}, on the credit side. Half of that or the item alone understate the gap, and the debit side is lower, not higher.`,
  }));
}
QQ('m_side_drawings', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'During the year the proprietor of Ujjain Umbrellas, an imagined firm, took cash of ₹20,000 and goods costing ₹7,500 for personal use, and both were entered in Drawings A/c. The balance of ₹27,500 is shown in the trial balance on',
  opts: ['the debit side, because it is a withdrawal that reduces the capital', 'the credit side, because it is a claim of the proprietor', 'the debit side, because it is an income', 'the credit side, because goods were taken out'],
  sol: 'Drawings is a debit balance. It is neither an income nor an addition to the capital, and goods leaving the business do not change its side.',
}));
QQ('m_closing_stock_tb', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A trial balance of Nawada Nets, an imagined firm, is prepared before the final accounts. Which of the following will not appear in it?',
  opts: ['Closing stock of ₹52,000 given as additional information', 'Opening stock of ₹46,000', 'Carriage inwards of ₹3,200', 'Discount received of ₹2,100'],
  sol: 'Closing stock is ascertained at the end of the year and goes to the trading account and balance sheet. The other three are ordinary ledger balances.',
}));
{
  const r = fromBalances([
    ['Cash', 12000, 'asset'], ['Debtors', 68000, 'debtor'], ['Opening stock', 40000, 'openingStock'], ['Purchases', 300000, 'purchases'], ['Sales return', 10000, 'returnsIn'], ['Wages', 25000, 'expense'],
    ['Machinery', 200000, 'asset'], ['Sales', 420000, 'sales'], ['Purchases return', 15000, 'returnsOut'], ['Creditors', 50000, 'creditor'], ['Capital', 170000, 'capital'], ['Closing stock', 56000, 'closingStock'],
  ]);
  same(r.dr, 655000, 'm_tb_total');
  QQ('m_tb_total', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Pathankot Pumps, an imagined firm, has these balances: ${lst([['Cash', 12000], ['Debtors', 68000], ['Opening stock', 40000], ['Purchases', 300000], ['Sales return', 10000], ['Wages', 25000], ['Machinery', 200000], ['Sales', 420000], ['Purchases return', 15000], ['Creditors', 50000], ['Capital', 170000]])}. Closing stock is ₹56,000. The total of each column of its trial balance is`,
    opts: [rs(r.dr), rs(r.dr + 56000), rs(2 * r.dr), rs(r.dr - 10000)],
    sol: `Debit column = ${inr(12000)} + ${inr(68000)} + ${inr(40000)} + ${inr(300000)} + ${inr(10000)} + ${inr(25000)} + ${inr(200000)} = ${rs(r.dr)}. The figure ${rs(r.dr + 56000)} wrongly adds the closing stock, ${rs(2 * r.dr)} adds the two columns together, and ${rs(r.dr - 10000)} puts the sales return on the credit side.`,
  }));
}
QQ('m_chk_stock', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A list of balances of Jabalpur Jewels, an imagined firm, includes opening stock of ₹44,000. In its trial balance this item is shown on the',
  opts: ['debit side', 'credit side', 'either side, as the accountant chooses', 'neither side'],
  sol: 'Opening stock is the stock with which the year began, an asset brought forward, so it is a debit balance.',
}));
QQ('m_chk_cd', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the ledger of Nanded Nuts, an imagined firm, a supplier\'s account is closed with the words "To Balance c/d" on the debit side. In the trial balance this balance is shown in the',
  opts: ['credit column, because the account has a credit balance', 'debit column, because c/d is written on the debit side', 'debit column, because suppliers are assets', 'it is left out, as the account is closed'],
  sol: 'The balance is written on the smaller side to make the two sides equal. A balancing figure on the debit side therefore means the credit side was larger, and the trial balance follows the nature of the balance.',
}));

// ================================================================ assertion-reason
QQ('ar_closing_stock', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-false',
  a: 'Closing stock given as additional information is entered on the credit side of the trial balance of Karur Kettles, an imagined firm.',
  r: 'Closing stock is a liability of the firm at the end of the year.',
  sol: 'Closing stock is not entered in the trial balance at all, and it is an asset, not a liability. Both statements are false.',
}));
QQ('ar_wrong_col', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'If the bank overdraft of Gadag Granites, an imagined firm, is written in the debit column of its trial balance, the totals will not agree.',
  r: 'A bank overdraft is an asset of the firm, like cash at bank.',
  sol: 'The overdraft belongs in the credit column, so placing it on the debit side upsets the totals and the assertion is true. The reason is false because an overdraft is a liability.',
}));

// ================================================================ true-false
QQ('tf_closing', tf({
  t: 2, d: 2, c: 'recall', ans: false,
  stem: 'Closing stock given in the adjustments of Tirur Timbers, an imagined firm, is entered on the debit side of its trial balance.',
  sol: 'It is not entered in the trial balance at all; it goes to the trading account and the balance sheet.',
}));
QQ('tf_opening', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'Opening stock of ₹38,500 in the books of Harda Hardware, an imagined firm, is shown on the debit side of its trial balance.',
  sol: 'Opening stock is a debit balance brought forward from the earlier year.',
}));
QQ('fb_sides', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'In a trial balance, sales return is written on the ______ side, purchases return on the ______ side and drawings on the ______ side.',
  acc: [['debit'], ['credit'], ['debit']],
  sol: 'Returns inward and drawings are debit balances; returns outward is a credit balance.',
}));
QQ('fb_cap', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'A missing capital is found as the difference between the ______ balances and the other ______ balances, and it is entered on the ______ side of the trial balance.',
  acc: [['debit'], ['credit'], ['credit']],
  sol: 'Debit balances less the other credit balances give the capital, which is a credit.',
}));

// ================================================================ numerical
QQ('n_chk_capital', numQ({
  t: 2, d: 2, c: 'application', value: 222000,
  stem: 'The debit balances of Medinipur Mats, an imagined firm, total ₹5,64,000, and its credit balances other than capital total ₹3,42,000. For the trial balance to agree, its capital (in ₹) must be',
  sol: `Capital = ${inr(564000)} − ${inr(342000)} = ${rs(222000)}.`,
}));
{
  const r = fromBalances([['Cash', 18000, 'asset'], ['Debtors', 74000, 'debtor'], ['Furniture', 36000, 'asset'], ['Plant', 150000, 'asset'], ['Purchases', 210000, 'purchases'], ['Wages', 22000, 'expense'], ['Rent', 15000, 'expense'], ['Sales', 290000, 'sales'], ['Creditors', 61000, 'creditor'], ['Capital', 174000, 'capital']]);
  same(r.dr, 525000, 'n_tb_total');
  QQ('n_tb_total', numQ({
    t: 2, d: 2, c: 'application', value: r.dr,
    stem: `Sirohi Dairy, an imagined firm, has these balances without sides: ${lst([['Cash', 18000], ['Debtors', 74000], ['Furniture', 36000], ['Plant', 150000], ['Purchases', 210000], ['Wages', 22000], ['Rent', 15000], ['Sales', 290000], ['Creditors', 61000], ['Capital', 174000]])}. The total of the debit column of its trial balance (in ₹) is`,
    sol: `Debit column = ${inr(18000)} + ${inr(74000)} + ${inr(36000)} + ${inr(150000)} + ${inr(210000)} + ${inr(22000)} + ${inr(15000)} = ${rs(r.dr)}.`,
  }));
}
{
  const r = withCapital([['Cash', 9000, 'asset'], ['Bank', 52000, 'asset'], ['Debtors', 88000, 'debtor'], ['Opening stock', 41000, 'openingStock'], ['Furniture', 27000, 'asset'], ['Purchases', 240000, 'purchases'], ['Salaries', 36000, 'expense'], ['Drawings', 15000, 'drawings'], ['Sales', 310000, 'sales'], ['Creditors', 64000, 'creditor'], ['Bank loan', 80000, 'liability'], ['Commission received', 6000, 'income']]);
  same(r.capital, 48000, 'n_cap');
  QQ('n_cap', numQ({
    t: 2, d: 3, c: 'application', value: r.capital,
    stem: `The trial balance of Tenali Trading, an imagined firm, agrees after the capital is found. The other balances are: ${lst([['Cash', 9000], ['Bank', 52000], ['Debtors', 88000], ['Opening stock', 41000], ['Furniture', 27000], ['Purchases', 240000], ['Salaries', 36000], ['Drawings', 15000], ['Sales', 310000], ['Creditors', 64000], ['Bank loan', 80000], ['Commission received', 6000]])}. The capital (in ₹) is`,
    sol: `Debit balances = ${inr(r.drOther)}; credit balances other than capital = ${inr(r.crOther)}; capital = ${inr(r.drOther)} − ${inr(r.crOther)} = ${rs(r.capital)}.`,
  }));
}
{
  const amt = 3850;
  QQ('n_gap', numQ({
    t: 2, d: 3, c: 'application', value: 2 * amt,
    stem: `The trial balance of Chittoor Steel Racks, an imagined firm, was drawn up correctly except that discount received of ₹${inr(amt)} was written in the debit column. The difference between the two totals (in ₹) is`,
    sol: `The debit total rises by ${inr(amt)} and the credit total falls by the same sum, so difference = ${inr(amt)} × 2 = ${rs(2 * amt)}.`,
  }));
}
{
  const r = fromBalances([
    ['Opening stock', 62000, 'openingStock'], ['Purchases', 480000, 'purchases'], ['Sales return', 14000, 'returnsIn'], ['Carriage inwards', 8000, 'expense'], ['Salaries', 66000, 'expense'], ['Bad debts', 5000, 'loss'],
    ['Debtors', 125000, 'debtor'], ['Furniture', 48000, 'asset'], ['Machinery', 100000, 'asset'], ['Drawings', 30000, 'drawings'], ['Cash', 17000, 'asset'],
    ['Sales', 710000, 'sales'], ['Purchases return', 12000, 'returnsOut'], ['Creditors', 88000, 'creditor'], ['Provision for doubtful debts', 6000, 'provision'], ['Capital', 139000, 'capital'], ['Closing stock', 70000, 'closingStock'],
  ]);
  same(r.dr, 955000, 'n_dr_stock');
  QQ('n_dr_stock', numQ({
    t: 2, d: 4, c: 'application', value: r.dr,
    stem: `Gulbarga Garments, an imagined firm, lists these balances without sides: ${lst([['Opening stock', 62000], ['Purchases', 480000], ['Sales return', 14000], ['Carriage inwards', 8000], ['Salaries', 66000], ['Bad debts', 5000], ['Debtors', 125000], ['Furniture', 48000], ['Machinery', 100000], ['Drawings', 30000], ['Cash', 17000], ['Sales', 710000], ['Purchases return', 12000], ['Creditors', 88000], ['Provision for doubtful debts', 6000], ['Capital', 139000]])}. Closing stock is ₹70,000. The total of the debit column of the trial balance (in ₹) is`,
    sol: `Debit column = ${inr(62000)} + ${inr(480000)} + ${inr(14000)} + ${inr(8000)} + ${inr(66000)} + ${inr(5000)} + ${inr(125000)} + ${inr(48000)} + ${inr(100000)} + ${inr(30000)} + ${inr(17000)} = ${rs(r.dr)}; the closing stock is left out.`,
  }));
}
{
  const r = fromBalances([['Debtors', 96000, 'debtor'], ['Opening stock', 45000, 'openingStock'], ['Purchases', 360000, 'purchases'], ['Rent', 24000, 'expense'], ['Furniture', 30000, 'asset'], ['Drawings', 18000, 'drawings'], ['Sales return', 9000, 'returnsIn'], ['Sales', 490000, 'sales'], ['Creditors', 54000, 'creditor'], ['Discount received', 8000, 'income'], ['Capital', 30000, 'capital']]);
  same(r.cr, 582000, 'n_cr_total');
  QQ('n_cr_total', numQ({
    t: 2, d: 3, c: 'application', value: r.cr,
    stem: `Karimnagar Kites, an imagined firm, has these ledger balances: ${lst([['Debtors', 96000], ['Opening stock', 45000], ['Purchases', 360000], ['Rent', 24000], ['Furniture', 30000], ['Drawings', 18000], ['Sales return', 9000], ['Sales', 490000], ['Creditors', 54000], ['Discount received', 8000], ['Capital', 30000]])}. The total of the credit column of its trial balance (in ₹) is`,
    sol: `Credit column = ${inr(490000)} + ${inr(54000)} + ${inr(8000)} + ${inr(30000)} = ${rs(r.cr)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_classify', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'State, for the trial balance of Bhimavaram Bangles, an imagined firm, the side on which each of these balances appears: (i) purchases return; (ii) carriage inwards; (iii) discount received; (iv) bills receivable.',
  model: '(i) Purchases return: credit.\n\n(ii) Carriage inwards: debit.\n\n(iii) Discount received: credit.\n\n(iv) Bills receivable: debit.',
  sol: 'One mark for each pair of correct sides.',
  scheme: [['(i) and (ii) correct', 1], ['(iii) and (iv) correct', 1]],
}));
QQ('s2_closing_stock', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Why is the closing stock of Ajmer Spices, an imagined firm, given as additional information, not entered in its trial balance? Where does it appear?',
  model: 'Closing stock is found by a physical count at the end of the year, so it is not the balance of any ledger account when the trial balance is drawn up.\n\nIt is shown on the credit side of the trading account and as an asset in the balance sheet.',
  sol: 'One mark for the reason and one mark for the two places.',
  scheme: [['Reason: it is found at the year end and is not a ledger balance', 1], ['Credit side of the trading account and the balance sheet', 1]],
}));
QQ('s2_balance_method', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain how a trial balance is prepared by the balance method.',
  model: 'Every ledger account is balanced, and only its closing balance is taken to the trial balance.\n\nEach debit balance is written in the debit column and each credit balance in the credit column, and the two columns are totalled; the totals should agree.',
  sol: 'One mark for using the closing balance of each account and one for the placing and totalling.',
  scheme: [['Closing balance of each account is taken', 1], ['Debit balances in one column, credit in the other, and the totals compared', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const items = [['Cash in hand', 6500, 'asset'], ['Cash at bank', 41000, 'asset'], ['Debtors', 58000, 'debtor'], ['Furniture', 24000, 'asset'], ['Plant', 90000, 'asset'], ['Purchases', 195000, 'purchases'], ['Sales return', 4000, 'returnsIn'], ['Wages', 17000, 'expense'],
    ['Sales', 286000, 'sales'], ['Creditors', 43000, 'creditor'], ['Purchases return', 5000, 'returnsOut'], ['Capital', 101500, 'capital']];
  const r = fromBalances(items);
  same(r.dr, 435500, 's3_tb_small');
  QQ('s3_tb_small', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `From the following balances of Nagercoil Nets, an imagined firm, prepare the trial balance as on 31 March 2028: ${lst(items.map(([n, a]) => [n, a]))}.`,
    model: `**Trial balance of Nagercoil Nets as on 31 March 2028**\n\n${r.tb.md}`,
    sol: 'Decide each side from the nature of the account, then add each column.',
    scheme: [['All debit balances in the debit column', 1], ['All credit balances in the credit column', 1], [`Both columns totalled at ${rs(r.dr)} with the heading and date`, 1]],
  }));
}
{
  const items = [['Cash', 11500, 'asset'], ['Bank', 64000, 'asset'], ['Debtors', 92000, 'debtor'], ['Opening stock', 38000, 'openingStock'], ['Purchases', 270000, 'purchases'], ['Salaries', 30000, 'expense'], ['Sales', 345000, 'sales'], ['Creditors', 58500, 'creditor']];
  const r = withCapital(items);
  same(r.capital, 102000, 's3_missing_cap');
  QQ('s3_missing_cap', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `The balances of Dhubri Dairy, an imagined firm, on 31 March 2028 are ${lst(items.map(([n, a]) => [n, a]))}. The capital is not given. Find it and prepare the trial balance.`,
    model: `Debit balances = ${rs(r.drOther)}; credit balances other than capital = ${rs(r.crOther)}.\n\nCapital = ${inr(r.drOther)} − ${inr(r.crOther)} = **${rs(r.capital)}**.\n\n${r.tb.md}`,
    sol: 'The capital is the figure that makes the two columns equal.',
    scheme: [['Debit balances and other credit balances correctly totalled', 1], [`Capital ${rs(r.capital)} found as the difference`, 1], ['Trial balance with both columns equal', 1]],
  }));
}
{
  const items = [['Opening stock', 38000, 'openingStock'], ['Sales return', 7500, 'returnsIn'], ['Provision for doubtful debts', 4000, 'provision'], ['Drawings', 21000, 'drawings'], ['Bank overdraft', 17500, 'liability'], ['Discount received', 3000, 'income']];
  const drs = items.filter(([, , k]) => ['openingStock', 'returnsIn', 'drawings'].includes(k));
  const crs = items.filter(([, , k]) => ['provision', 'liability', 'income'].includes(k));
  const D = sum(drs.map((x) => x[1]));
  const C = sum(crs.map((x) => x[1]));
  same(D, 66500, 's3_classify_six debit');
  same(C, 24500, 's3_classify_six credit');
  QQ('s3_classify_six', short({
    t: 2, d: 2, c: 'understanding', marks: 3,
    stem: `Six balances of Cuttack Candles, an imagined firm, are: ${lst(items.map(([n, a]) => [n, a]))}. State the side of the trial balance on which each appears, and give the total of the balances on each side.`,
    model: `Debit side: opening stock ${rs(38000)}, sales return ${rs(7500)} and drawings ${rs(21000)}; total = ${inr(38000)} + ${inr(7500)} + ${inr(21000)} = ${rs(D)}.\n\nCredit side: provision for doubtful debts ${rs(4000)}, bank overdraft ${rs(17500)} and discount received ${rs(3000)}; total = ${inr(4000)} + ${inr(17500)} + ${inr(3000)} = ${rs(C)}.`,
    sol: 'Sort the six balances by their nature, then add each group.',
    scheme: [['Three debit balances identified', 1], ['Three credit balances identified', 1], [`Totals ${rs(D)} and ${rs(C)}`, 1]],
  }));
}
{
  const accts = [
    ['Cash', 380000, 295000], ['Ravi Rao', 120000, 95000], ['Purchases', 312000, 12000], ['Furniture', 150000, 0], ['Rent', 20000, 0],
    ['Capital', 0, 200000], ['Sai Mills', 70000, 140000], ['Sales', 0, 310000],
  ];
  const lines = accts.map(([n, d, c]) => [n, d - c > 0 ? d - c : 0, c - d > 0 ? c - d : 0]);
  const tb = trialBalance(lines);
  same(tb.dr, 580000, 's3_ledger_to_tb');
  const tabIn = mdTable(['Account', 'Debit side total (₹)', 'Credit side total (₹)'], accts.map(([n, d, c]) => [n, d ? inr(d) : '', c ? inr(c) : '']));
  QQ('s3_ledger_to_tb', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Eight ledger accounts of Cuddapah Cloth Mart, an imagined firm, show these totals before balancing (debit side, credit side): ${accts.map(([n, d, c]) => `${n} ${d ? rs(d) : 'nil'}, ${c ? rs(c) : 'nil'}`).join('; ')}. Find each balance and prepare the trial balance.`,
    model: `Balances: ${accts.map(([n, d, c]) => `${n} ${rs(Math.abs(d - c))} ${d > c ? 'debit' : 'credit'}`).join('; ')}.\n\n${tb.md}`,
    sol: 'Subtract the smaller side from the larger, and the larger side tells the column.',
    scheme: [['Balance of each account worked out', 1], ['Each balance in the column of its larger side', 1], [`Totals agree at ${rs(tb.dr)}`, 1]],
  }));
  void tabIn;
}
QQ('s3_stock', short({
  t: 2, d: 3, c: 'understanding', marks: 3,
  stem: 'The books of Nashik Nuts, an imagined firm, show opening stock of ₹36,000 and the stock at the end of the year is valued at ₹41,000. How will each be treated if a trial balance is prepared before the final accounts? State when closing stock does come into a trial balance.',
  model: 'The opening stock of ₹36,000 is a ledger balance and is a debit balance, so it is entered in the debit column.\n\nThe closing stock of ₹41,000 is not entered, because it is found only at the year end and is carried to the trading account and the balance sheet.\n\nIt appears in the trial balance only if it has already been adjusted in the books, for example by a closing entry, and the question says so.',
  sol: 'One mark each for the opening stock, the closing stock, and the exception.',
  scheme: [['Opening stock: debit column', 1], ['Closing stock given outside the books: not entered', 1], ['Exception: entered only when already recorded in the books', 1]],
}));

// ================================================================ long answer, 5 marks
{
  const items = [
    ['Opening stock', 52000, 'openingStock'], ['Purchases', 390000, 'purchases'], ['Sales return', 11000, 'returnsIn'], ['Carriage inwards', 7500, 'expense'], ['Wages', 28000, 'expense'], ['Advertisement', 14000, 'expense'],
    ['Debtors', 96000, 'debtor'], ['Bills receivable', 18000, 'asset'], ['Furniture', 40000, 'asset'], ['Plant', 200000, 'asset'], ['Drawings', 24000, 'drawings'], ['Cash at bank', 33000, 'asset'],
    ['Sales', 625000, 'sales'], ['Purchases return', 9000, 'returnsOut'], ['Creditors', 72000, 'creditor'], ['Provision for doubtful debts', 5000, 'provision'], ['Interest received', 6500, 'income'], ['Capital', 196000, 'capital'],
    ['Closing stock', 61000, 'closingStock'],
  ];
  const r = fromBalances(items);
  same(r.dr, 913500, 'l5_tb_sides');
  QQ('l5_tb_sides', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `The following balances were taken from the ledger of Mahbubnagar Matting, an imagined firm, on 31 March 2028: ${lst(items.filter(([, , k]) => k !== 'closingStock').map(([n, a]) => [n, a]))}. Closing stock was valued at ${rs(61000)}. Prepare the trial balance, deciding the side of each balance.`,
    model: `**Trial balance of Mahbubnagar Matting as on 31 March 2028**\n\n${r.tb.md}\n\nThe closing stock of ${rs(61000)} is not entered; it is carried to the trading account and the balance sheet.`,
    sol: 'Decide each side from the nature of the account, leave out the closing stock, add both columns.',
    scheme: [['Assets, expenses, purchases, sales return, opening stock and drawings on the debit side', 2], ['Capital, sales, purchases return, creditors, provision and interest on the credit side', 1], ['Closing stock left out', 1], [`Heading, date and equal totals of ${rs(r.dr)}`, 1]],
  }));
}
{
  const PWL = [
    { date: '1 Apr', dr: [['Cash', 150000], ['Machinery', 50000]], cr: [['Capital', 200000]], note: 'Business started with cash and machinery' },
    { date: '3 Apr', dr: [['Purchases', 80000]], cr: [['Anand Tools', 80000]], note: 'Goods bought on credit' },
    { date: '6 Apr', dr: [['Cash', 45000]], cr: [['Sales', 45000]], note: 'Goods sold for cash' },
    { date: '10 Apr', dr: [['Boman and Co.', 60000]], cr: [['Sales', 60000]], note: 'Goods sold on credit' },
    { date: '14 Apr', dr: [['Anand Tools', 50000]], cr: [['Cash', 50000]], note: 'Cash paid' },
    { date: '17 Apr', dr: [['Cash', 35000]], cr: [['Boman and Co.', 35000]], note: 'Cash received' },
    { date: '20 Apr', dr: [['Wages', 9000]], cr: [['Cash', 9000]], note: 'Wages paid' },
    { date: '25 Apr', dr: [['Sales return', 5000]], cr: [['Boman and Co.', 5000]], note: 'Goods returned by the customer' },
    { date: '28 Apr', dr: [['Drawings', 7000]], cr: [['Cash', 7000]], note: 'Cash taken by the proprietor' },
  ];
  journal(PWL);
  const L = post(PWL);
  same(L['Cash'].balance, 164000, 'l5_ledgers cash');
  same(L['Boman and Co.'].balance, 20000, 'l5_ledgers Boman');
  same(L['Anand Tools'].balance, -30000, 'l5_ledgers Anand');
  const TB = trialBalance(Object.values(L).filter((l) => l.balance).map((l) => [l.name, l.balance > 0 ? l.balance : 0, l.balance < 0 ? -l.balance : 0]));
  same(TB.dr, 335000, 'l5_ledgers trial balance');
  QQ('l5_ledgers', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: 'Vellore Vessels, an imagined firm, had these transactions in April 2028: 1 Apr started business with cash ₹1,50,000 and machinery ₹50,000; 3 Apr bought goods on credit from Anand Tools ₹80,000; 6 Apr sold goods for cash ₹45,000; 10 Apr sold goods on credit to Boman and Co. ₹60,000; 14 Apr paid Anand Tools ₹50,000; 17 Apr received ₹35,000 from Boman and Co.; 20 Apr paid wages ₹9,000; 25 Apr Boman and Co. returned goods of ₹5,000; 28 Apr the proprietor took ₹7,000 in cash for personal use. (a) Write up and balance the Cash A/c [1]. (b) Write up and balance the account of Boman and Co. [1]. (c) Prepare the trial balance as on 30 April 2028 [3].',
    model: `**(a) Cash A/c**\n\n${L['Cash'].md}\n\n**(b) Boman and Co.**\n\n${L['Boman and Co.'].md}\n\n**(c) Trial balance as on 30 April 2028**\n\n${TB.md}`,
    sol: 'Post each entry to its two accounts, balance every account, then list the closing balances on their sides.',
    scheme: [['Cash A/c posted, with ₹1,64,000 carried down', 1], ['Account of Boman and Co. with ₹20,000 carried down', 1], ['Balances of the other accounts correctly found', 1], ['Each balance on the correct side', 1], [`Totals agree at ${rs(TB.dr)}`, 1]],
  }));
}
{
  const items = [['Cash', 14000, 'asset'], ['Bank', 72000, 'asset'], ['Debtors', 148000, 'debtor'], ['Opening stock', 66000, 'openingStock'], ['Furniture', 52000, 'asset'], ['Building', 360000, 'asset'], ['Purchases', 410000, 'purchases'], ['Sales return', 8000, 'returnsIn'],
    ['Wages', 31000, 'expense'], ['Salaries', 54000, 'expense'], ['Rent paid', 12000, 'expense'], ['Drawings', 28000, 'drawings'], ['Sales', 620000, 'sales'], ['Purchases return', 11000, 'returnsOut'], ['Creditors', 95000, 'creditor'], ['Bank loan', 120000, 'liability'], ['Discount received', 9000, 'income']];
  const r = withCapital(items);
  same(r.capital, 400000, 'l5_capital');
  QQ('l5_capital', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `The ledger balances of Tirunelveli Tiles, an imagined firm, on 31 March 2028 are: ${lst(items.map(([n, a]) => [n, a]))}. The capital account is not available. Find the capital and prepare the trial balance.`,
    model: `Debit balances = ${rs(r.drOther)}; credit balances other than capital = ${rs(r.crOther)}.\n\nCapital = ${inr(r.drOther)} − ${inr(r.crOther)} = **${rs(r.capital)}**.\n\n${r.tb.md}`,
    sol: 'Total the debit balances and the other credit balances, take the difference as capital, then list everything.',
    scheme: [[`Debit balances totalled at ${rs(r.drOther)}`, 1], [`Other credit balances totalled at ${rs(r.crOther)}`, 1], [`Capital ${rs(r.capital)} found as the balancing figure`, 1], ['Every balance on the correct side of the trial balance', 1], ['Heading, date and equal totals', 1]],
  }));
}
{
  const accts = [
    ['Cash', 520000, 435000], ['Anil Arora', 210000, 160000], ['Bina Basu', 90000, 40000], ['Purchases', 462000, 12000], ['Wages', 36000, 0], ['Rent', 24000, 0], ['Plant', 200000, 0], ['Sales return', 12000, 0],
    ['Capital', 0, 300000], ['Chandan Chemicals', 130000, 250000], ['Sales', 0, 480000], ['Commission received', 0, 7000],
  ];
  const lines = accts.map(([n, d, c]) => [n, d - c > 0 ? d - c : 0, c - d > 0 ? c - d : 0]);
  const tb = trialBalance(lines);
  same(tb.dr, 907000, 'l5_tb_from_ledgers');
  QQ('l5_tb_from_ledgers', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `On 31 March 2028 the ledger accounts of Sholapur Supplies, an imagined firm, show these totals of the debit side and the credit side before balancing: ${accts.map(([n, d, c]) => `${n} ${d ? rs(d) : 'nil'} and ${c ? rs(c) : 'nil'}`).join('; ')}. Find the balance of each account and prepare the trial balance.`,
    model: `Balances: ${accts.map(([n, d, c]) => `${n} ${rs(Math.abs(d - c))} ${d > c ? 'debit' : 'credit'}`).join('; ')}.\n\n${tb.md}`,
    sol: 'Work out the balance of every account first; the larger side decides the column.',
    scheme: [['Balances of the cash and personal accounts correctly found', 1], ['Balance of Purchases after the return, and the other balances', 1], ['Debit balances in the debit column', 1], ['Credit balances in the credit column', 1], [`Totals agree at ${rs(tb.dr)}`, 1]],
  }));
}
{
  const items = [
    ['Opening stock', 44000, 'openingStock'], ['Purchases', 285000, 'purchases'], ['Purchases return', 6000, 'returnsOut'], ['Sales', 410000, 'sales'], ['Sales return', 9000, 'returnsIn'], ['Carriage inwards', 5000, 'expense'],
    ['Bad debts', 4000, 'loss'], ['Provision for doubtful debts', 7000, 'provision'], ['Debtors', 82000, 'debtor'], ['Creditors', 59000, 'creditor'], ['Bills payable', 20000, 'liability'], ['Bank overdraft', 16000, 'liability'],
    ['Land', 150000, 'asset'], ['Furniture', 38000, 'asset'], ['Salaries', 45000, 'expense'], ['Drawings', 22000, 'drawings'], ['Cash', 11000, 'asset'], ['Discount allowed', 3000, 'expense'],
  ];
  const r = withCapital(items);
  same(r.capital, 180000, 'l5_mixed');
  QQ('l5_mixed', long({
    t: 2, d: 5, c: 'application', marks: 5,
    stem: `Barpeta Baskets, an imagined firm, has these ledger balances without sides on 31 March 2028: ${lst(items.map(([n, a]) => [n, a]))}. The capital account balance is not given, and closing stock of ${rs(51000)} is stated as additional information. Find the capital and prepare the trial balance.`,
    model: `Debit balances = ${rs(r.drOther)}; credit balances other than capital = ${rs(r.crOther)}.\n\nCapital = ${inr(r.drOther)} − ${inr(r.crOther)} = **${rs(r.capital)}**.\n\n${r.tb.md}\n\nThe closing stock of ${rs(51000)} is not entered.`,
    sol: 'Sort every balance by nature, find the capital as the balancing figure, and keep the closing stock out.',
    scheme: [['Debit balances correctly identified and totalled', 1], ['Credit balances (overdraft, provision, bills payable included) totalled', 1], [`Capital ${rs(r.capital)} as the balancing figure`, 1], ['Closing stock left out of the trial balance', 1], ['Complete statement with heading, date and equal totals', 1]],
  }));
}
void check;
void sidesMd;
