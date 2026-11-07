// Objective items for ch08: multiple choice, assertion-reason, true-false, fill-blank, match, ordering.
// Every firm and person is imagined; every derived amount is computed and asserted.
import { mcq, ar, tf, fb, match, ord } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, gpOf, FT, IG } from './figures.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice: t01 (capital and revenue items)
QQ('m_cap_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Kamal Weavers, an imagined firm, buys a loom that will serve the business for many years. The amount spent on acquiring an asset of this kind, whose benefit lasts for more than one accounting year, is called',
  opts: ['capital expenditure', 'revenue expenditure', 'deferred revenue expenditure', 'a revenue receipt'],
  sol: 'Spending that acquires or improves a fixed asset and gives a benefit beyond one accounting year is capital expenditure. Revenue expenditure is used up within the year, deferred revenue expenditure is a revenue item whose benefit stretches over several years, and a revenue receipt is money coming in.',
}));
QQ('m_classify_chk', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Lalit Printers, an imagined press in the imagined town of Ranipur, paid ${rs(9000)} to fit a newly bought printing machine in the workshop so that it could start work. This payment is`,
  opts: ['capital expenditure, because it is part of the cost of bringing the machine into use', 'revenue expenditure, because it is a payment for a service', 'revenue expenditure, because it is paid only once', 'deferred revenue expenditure, because the machine will last for years'],
  sol: 'Fitting charges are part of the cost of getting a fixed asset ready for use, so they are added to the cost of the machine and treated as capital expenditure. Being a payment for a service or being paid only once does not decide the class, and the cost of an asset is not a deferred revenue item.',
}));
QQ('m_repair_rev', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Rekha Tailors, an imagined shop, paid ${rs(3500)} during the year to repair its sewing machine so that it could keep running at its usual speed. In the books this is`,
  opts: ['revenue expenditure, charged to the Profit and Loss Account', 'capital expenditure, added to the cost of the machine', 'a capital loss, shown in the Balance Sheet', 'deferred revenue expenditure, spread over later years'],
  sol: 'A repair that only maintains the machine in its existing condition gives a benefit within the year, so it is revenue expenditure and is charged to the Profit and Loss Account. Adding it to the machine would overstate the asset, and nothing in the payment improves the machine or spreads its benefit over later years.',
}));
QQ('m_overhaul', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Sunita Mills, an imagined firm, spent ${rs(60000)} on replacing the motor of its old spinning machine with a better one, which raises the machine\'s output by a third and lengthens its working life by four years. The expenditure is`,
  opts: ['capital expenditure, because it improves a fixed asset', 'revenue expenditure, because a motor is a small part of the machine', 'revenue expenditure, because it is a repair', 'a deferred revenue expenditure, because it covers four years'],
  sol: 'Spending that increases the capacity or the life of a fixed asset is capital expenditure, whatever the size of the part replaced. It is not a repair that merely maintains the machine, and a deferred revenue item is an expense such as heavy advertising, not an improvement to an asset.',
}));
QQ('m_cap_receipt', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Tarun Fabrics, an imagined firm, sold an old delivery van that it no longer needed and received ${rs(85000)} in cash. This amount is`,
  opts: ['a capital receipt', 'a revenue receipt', 'revenue expenditure', 'drawings of the proprietor'],
  sol: 'The van is a fixed asset, so money from selling it is a capital receipt. Revenue receipts arise from the normal sale of goods and services and from incomes such as commission, and the proprietor taking money out is a different matter, drawings.',
}));
QQ('m_deferred', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Vimal Footwear, an imagined firm, spent ${rs(120000)} on a heavy advertising campaign to launch a new range, and expects the benefit to last for about three years. Such an expense is best described as`,
  opts: ['deferred revenue expenditure', 'capital expenditure', 'an ordinary revenue receipt', 'a drawing by the proprietor'],
  sol: 'A revenue expense whose benefit is expected to last beyond the year in which it is incurred is deferred revenue expenditure, and the part not yet written off is carried forward. It does not create a fixed asset, so it is not capital expenditure.',
}));
QQ('m_wrong_cap', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Anita Looms, an imagined firm, paid ${rs(9000)} as fitting charges on a new machine and debited the amount to Wages A/c. As a result, for the year,`,
  opts: ['profit is understated and the machine is shown at too low a value', 'profit is overstated and the machine is shown at too low a value', 'profit is understated and the machine is shown at too high a value', 'profit and the machine are both correctly stated'],
  sol: 'The fitting charges are capital and belong in the cost of the machine. Charging them to wages makes the expenses too high, so profit is too low, and leaves the machine without the fitting charges, so the asset is too low.',
}));
QQ('m_wrong_rev', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Bharat Cycles, an imagined shop, spent ${rs(5000)} on repainting the walls of its showroom and debited the amount to Building A/c. The effect is that`,
  opts: ['profit is overstated and the building is shown at too high a value', 'profit is understated and the building is shown at too high a value', 'profit is overstated and the building is shown at too low a value', 'profit is understated and the building is shown at too low a value'],
  sol: 'Repainting maintains the building and is a revenue expense. Debiting it to the building leaves the expenses too low, so profit is too high, and makes the building appear worth more than it is.',
}));

// ================================================================ multiple choice: t02 (statements)
QQ('m_stake', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'A bank is deciding whether to lend money to Tarun Plastics, an imagined firm. From the financial statements of the firm it is mainly interested in',
  opts: ['the firm\'s ability to pay interest and repay the loan', 'the amount of drawings the proprietor has taken', 'the opening stock of the firm', 'the rate at which the firm pays its workers'],
  sol: 'A lender wants to judge whether the business can pay interest and repay the principal, which the Balance Sheet and the profit shown by the statements indicate. The other items matter to the proprietor or to the staff rather than to the bank.',
}));
QQ('m_tr_credit', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'For a trader, the credit side of the Trading Account at the end of the year contains',
  opts: ['net sales and closing stock', 'opening stock and purchases', 'direct expenses and gross loss', 'indirect expenses and net profit'],
  sol: 'Sales less returns and closing stock are credited, and opening stock, purchases and direct expenses are debited. Indirect expenses and the net profit belong to the Profit and Loss Account, and gross loss appears on the credit side only when the debit side is larger.',
}));
QQ('m_direct_chk', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Nitin Hardware, an imagined shop, paid ${rs(12000)} to bring the goods it bought to its godown. This carriage on purchases is`,
  opts: ['a direct expense, shown on the debit side of the Trading Account', 'an indirect expense, shown on the debit side of the Profit and Loss Account', 'a capital expenditure, shown in the Balance Sheet', 'an income, shown on the credit side of the Profit and Loss Account'],
  sol: 'Carriage on purchases is part of the cost of getting the goods ready for sale, so it is a direct expense in the Trading Account. Indirect expenses are the office, selling and financial costs, and carriage on goods bought does not create an asset or earn income.',
}));
QQ('m_indirect', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Charu Sports, an imagined firm, pays the carriage on goods it sends to its customers. At the end of the year this carriage outwards is',
  opts: ['debited to the Profit and Loss Account as a selling and distribution expense', 'debited to the Trading Account as a direct expense', 'credited to the Profit and Loss Account as an income', 'shown as an asset in the Balance Sheet'],
  sol: 'Carriage on goods sent out is a selling and distribution cost, an indirect expense, and goes to the Profit and Loss Account. It is not part of the cost of acquiring or making the goods, so it is not a Trading Account item.',
}));
{
  const g = { os: 30000, pur: 210000, pret: 10000, dexp: [15000, 5000], sale: 320000, sret: 20000, cs: 40000 };
  const gp = same(gpOf(g), 90000, 'm_gp_calc gross profit');
  const noReturns = gpOf({ ...g, pret: 0, sret: 0 });
  const noStock = gpOf({ ...g, cs: 0 });
  const wrongDirect = g.sale - g.sret + g.cs - g.os - (g.pur - g.pret) + sum(g.dexp);
  QQ('m_gp_calc', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Pooja Stores, an imagined shop, shows these figures for the year ended 31 March 2026: opening stock ${rs(g.os)}, purchases ${rs(g.pur)}, purchases returns ${rs(g.pret)}, wages ${rs(g.dexp[0])}, carriage inwards ${rs(g.dexp[1])}, sales ${rs(g.sale)}, sales returns ${rs(g.sret)} and closing stock ${rs(g.cs)}. Its gross profit is`,
    opts: [rs(gp), rs(noReturns), rs(noStock), rs(wrongDirect)],
    sol: `Net sales ${inr(g.sale - g.sret)} plus closing stock ${inr(g.cs)} less opening stock ${inr(g.os)}, net purchases ${inr(g.pur - g.pret)} and direct expenses ${inr(sum(g.dexp))} gives ${rs(gp)}. ${rs(noReturns)} ignores the two returns, ${rs(noStock)} leaves out the closing stock, and ${rs(wrongDirect)} adds the direct expenses instead of deducting them.`,
  }));
}
QQ('m_np_where', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Kavita Provisions, an imagined store, has a gross profit for the year. In its Profit and Loss Account the gross profit is shown',
  opts: ['on the credit side, as the first item', 'on the debit side, as the first item', 'on the debit side, as a deduction from indirect expenses', 'in the Balance Sheet, on the assets side'],
  sol: 'Gross profit is brought down from the Trading Account and credited to the Profit and Loss Account, where it is the starting income against which the indirect expenses are set. It is not an asset, and a debit would be correct only for a gross loss.',
}));
QQ('m_gross_loss', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The Trading Account of Ila Garments, an imagined firm, for the year ended 31 March 2026 shows that the credit side total before the balancing figure is lower than the debit side total, a gap of ${rs(-IG.gp)}. In its Profit and Loss Account this amount appears`,
  opts: ['as gross loss on the debit side', 'as gross profit on the credit side', 'as gross loss on the credit side', 'as net loss on the credit side'],
  sol: 'A gross loss is an expense that has to be met out of the other incomes, so it is brought down to the debit side of the Profit and Loss Account. A credit entry would show it as a profit, and the net loss is found only after all the other items have been entered.',
}));
{
  const cap = 250000, np = 70000, dr = 40000;
  const close = same(cap + np - dr, 280000, 'm_bs_capital');
  QQ('m_bs_capital', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Rahul Cycles, an imagined firm, began the year with capital of ${rs(cap)}, earned a net profit of ${rs(np)} and had drawings of ${rs(dr)}. In its Balance Sheet at the end of the year, the capital is shown as`,
    opts: [rs(close), rs(cap + np), rs(cap + np + dr), rs(cap - np + dr)],
    sol: `Closing capital is opening capital plus net profit less drawings, ${inr(cap)} + ${inr(np)} − ${inr(dr)} = ${rs(close)}. ${rs(cap + np)} forgets the drawings, ${rs(cap + np + dr)} adds them instead of deducting them, and ${rs(cap - np + dr)} reverses both adjustments.`,
  }));
}
QQ('m_perm', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Aman Traders, an imagined firm, shows its Balance Sheet in the order of permanence. The first item on the assets side is then',
  opts: ['land and building', 'cash in hand', 'debtors', 'closing stock'],
  sol: 'In the order of permanence the most permanent asset comes first, so fixed assets such as land and building lead and cash comes last. Cash in hand is the first item only in the order of liquidity, and debtors and stock are current assets that follow the fixed assets.',
}));
QQ('m_liq', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Deepak Electronics, an imagined shop, arranges its Balance Sheet in the order of liquidity. On the assets side the items then run from',
  opts: ['the most easily turned into cash to the least easily turned into cash', 'the least easily turned into cash to the most easily turned into cash', 'the largest amount to the smallest amount', 'the oldest asset to the newest asset'],
  sol: 'The order of liquidity puts cash first and ends with the fixed assets that are hardest to turn into cash. The reverse describes the order of permanence, and neither order depends on the size or age of the item.',
}));
QQ('m_marsh', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Zeenat Garments, an imagined firm, arranges the headings of its Balance Sheet, such as fixed assets, investments and current assets, in a fixed sequence in either the order of liquidity or the order of permanence. This arrangement is called',
  opts: ['marshalling', 'grouping', 'balancing', 'posting'],
  sol: 'Marshalling is the arrangement of the groups of assets and liabilities in a definite order. Grouping is putting like items under one head, balancing is finding the difference of two sides of an account, and posting is copying journal entries into the ledger.',
}));
QQ('m_group', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Kunal Traders, an imagined firm, shows in its trial balance Debtors ${rs(45000)}, Furniture ${rs(30000)}, Bank Loan ${rs(100000)} repayable after five years and Creditors ${rs(25000)}. Which item is grouped under current liabilities in its Balance Sheet?`,
  opts: ['Creditors', 'Bank Loan', 'Debtors', 'Furniture'],
  sol: 'Creditors are amounts due within the normal operating cycle, so they are a current liability. The bank loan repayable after five years is a long-term liability, and debtors and furniture are assets, current and fixed respectively.',
}));

// ================================================================ multiple choice: t03 (entries)
QQ('m_close_trade', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'At the end of the year Dinesh Stores, an imagined shop, passes a closing entry to transfer its opening stock and purchases so that the gross profit can be found. The account debited is',
  opts: ['Trading Account', 'Profit and Loss Account', 'Capital Account', 'Drawings Account'],
  sol: 'Opening stock and purchases are credited in their own accounts to close them, and the amount is debited to the Trading Account, where the gross profit is found. The Profit and Loss Account takes the indirect items, and capital and drawings come last.',
}));
QQ('m_close_np', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Mohan Mobiles, an imagined shop, finds a net profit of ${rs(84000)} for the year. The closing entry that transfers it is`,
  opts: [`Profit and Loss A/c Dr. ${rs(84000)} To Capital A/c`, `Capital A/c Dr. ${rs(84000)} To Profit and Loss A/c`, `Profit and Loss A/c Dr. ${rs(84000)} To Drawings A/c`, `Trading A/c Dr. ${rs(84000)} To Capital A/c`],
  sol: 'The profit is closed out of the Profit and Loss Account by debiting it, and credited to the proprietor\'s Capital Account because profit increases capital. The reverse entry would be for a loss, and neither drawings nor the Trading Account is involved in this transfer.',
}));
QQ('m_close_draw', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Padma Books, an imagined shop, has Drawings A/c showing a debit balance of ${rs(36000)} on 31 March 2026. The closing entry for drawings is`,
  opts: [`Capital A/c Dr. ${rs(36000)} To Drawings A/c`, `Drawings A/c Dr. ${rs(36000)} To Capital A/c`, `Profit and Loss A/c Dr. ${rs(36000)} To Drawings A/c`, `Drawings A/c Dr. ${rs(36000)} To Profit and Loss A/c`],
  sol: 'Drawings reduce the capital of the proprietor, so the Capital Account is debited and the Drawings Account, which carries a debit balance, is credited to close it. Drawings are not an expense of the business, so the Profit and Loss Account is not involved.',
}));
QQ('m_open_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The Balance Sheet of Sonal Stores, an imagined firm, on 31 March 2026 shows capital ${rs(210000)}, creditors ${rs(40000)}, machinery ${rs(150000)} and stock, debtors and cash together ${rs(100000)}. The opening entry on 1 April 2026`,
  opts: ['debits the assets and credits the creditors and the Capital Account', 'debits the creditors and the Capital Account and credits the assets', 'debits the Capital Account and credits all other accounts', 'debits the Balance Sheet and credits the Trading Account'],
  sol: 'The opening entry re-opens the books by debiting every asset and crediting every liability and the capital, so that each account carries its balance forward. The other options reverse this or bring in accounts that are not part of the Balance Sheet.',
}));
QQ('m_stock_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Sagar Garments, an imagined firm, has closing stock of ${rs(64000)} on 31 March 2026 that is not in its trial balance. The closing entry that brings it into the books is`,
  opts: [`Closing Stock A/c Dr. ${rs(64000)} To Trading A/c`, `Trading A/c Dr. ${rs(64000)} To Closing Stock A/c`, `Closing Stock A/c Dr. ${rs(64000)} To Profit and Loss A/c`, `Capital A/c Dr. ${rs(64000)} To Closing Stock A/c`],
  sol: 'Closing stock is an asset and is also a credit in the Trading Account, so the Closing Stock Account is debited and the Trading Account is credited. The reverse entry would reduce the profit, and the Profit and Loss Account and the Capital Account take no part in this step.',
}));

// ================================================================ assertion-reason
QQ('ar_cap_rev', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'Carriage paid on a new machine bought by Hema Tools, an imagined firm, is capital expenditure.',
  r: 'Carriage on a new machine is a cost of bringing the asset to the place where it will be used over several years.',
  sol: 'Both statements are true, and the reason explains the assertion: the cost of getting a fixed asset to its place of use is part of the asset\'s cost, so it is capital expenditure.',
}));
QQ('ar_closing_stock', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'In the final accounts of Ravi Traders, an imagined firm, closing stock appears on the credit side of the Trading Account and also on the assets side of the Balance Sheet.',
  r: 'Goods unsold at the end of the year are a stock of the business and are treated as an asset.',
  sol: 'Both are true. Stock is credited in the Trading Account to reduce the cost of goods sold, and the same unsold goods are an asset that carries forward, which is why they also appear in the Balance Sheet.',
}));
QQ('ar_drawings', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Drawings of the proprietor of Iqbal Optics, an imagined shop, are shown on the debit side of the Profit and Loss Account.',
  r: 'Drawings are withdrawals by the proprietor for personal use and reduce the capital.',
  sol: 'The assertion is false: drawings are not an expense of the business, so they are not shown in the Profit and Loss Account but are deducted from capital in the Balance Sheet. The reason is true but gives the correct treatment, not support for the assertion.',
}));
QQ('ar_order', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'When Jaya Stores, an imagined shop, draws its Balance Sheet in the order of liquidity, cash is the first asset shown.',
  r: 'The order of liquidity lists assets in the order in which they were bought during the year.',
  sol: 'The assertion is true, since cash is the most liquid asset. The reason is false: the order of liquidity depends on how quickly an asset can be turned into cash, not on when it was bought.',
}));
QQ('ar_returns', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'In the Trading Account of Lata Fashions, an imagined firm, sales returns are deducted from sales.',
  r: 'Sales returns are goods sent back by customers.',
  sol: 'Both statements are true. Sales returns are indeed goods sent back by customers, but that definition does not explain the treatment: they are deducted so that the Trading Account shows the net sales actually earned.',
}));

// ================================================================ true-false
QQ('tf_sale_old', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: `Money of ${rs(40000)} received by Umesh Dairy, an imagined firm, from selling an old refrigerator that it no longer uses is a capital receipt.`,
  sol: 'The refrigerator is a fixed asset, and the proceeds of selling a fixed asset are a capital receipt, not a revenue receipt.',
}));
QQ('tf_open_dr', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'In the opening entry of Vikas Garage, an imagined firm, on the first day of the new year, the capital and the liabilities are debited and the assets are credited.',
  sol: 'The opposite is true: the assets are debited, and the capital and the liabilities are credited, as they were in the Balance Sheet.',
}));

// ================================================================ fill in the blanks
QQ('fb_open_chk', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'The opening entry of Wasim Traders, an imagined firm, debits all the ______ and credits all the ______ and the ______ Account.',
  acc: [['assets'], ['liabilities'], ['capital']],
  sol: 'The opening entry brings forward the balance sheet items: assets are debited, and liabilities and capital are credited.',
}));
QQ('fb_close_capital', fb({
  t: 2, d: 2, c: 'application',
  stem: 'In the Balance Sheet of Yamini Dyers, an imagined firm, closing capital equals opening capital plus ______ minus ______.',
  acc: [['net profit', 'profit'], ['drawings']],
  sol: 'Net profit adds to the proprietor\'s capital, and drawings reduce it, so closing capital is opening capital plus net profit minus drawings.',
}));
QQ('fb_direct', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Wages, carriage inwards and customs duty on goods imported by Zubin Imports, an imagined firm, are ______ expenses and are debited to the ______ Account.',
  acc: [['direct'], ['trading']],
  sol: 'These costs are incurred in getting the goods ready for sale, so they are direct expenses debited to the trading account.',
}));

// ================================================================ match
QQ('match_where', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each item of Ajay Auto Parts, an imagined firm, in Column A with the statement in which it is shown in Column B.',
  pairs: [['Closing stock (also an asset)', 'Credit side of the Trading Account'], ['Rent paid for the office', 'Debit side of the Profit and Loss Account'], ['Commission received', 'Credit side of the Profit and Loss Account'], ['Creditors', 'Liabilities side of the Balance Sheet']],
  sol: 'Closing stock is credited in the Trading Account, office rent is an indirect expense debited in the Profit and Loss Account, commission received is an income credited there, and creditors are a current liability in the Balance Sheet.',
}));
QQ('match_class', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each payment made by Bina Bakers, an imagined bakery, in Column A with its class in Column B.',
  pairs: [['Cost of a new oven', 'Capital expenditure'], ['Servicing of the oven during the year', 'Revenue expenditure'], ['Money received from selling bread', 'Revenue receipt'], ['Loan received from a bank', 'Capital receipt']],
  sol: 'The oven is a fixed asset, so its cost is capital expenditure, while servicing only maintains it. Money from the sale of bread is a revenue receipt, and a loan received is a capital receipt.',
}));

// ================================================================ ordering
{
  const items = ['Transfer opening stock, purchases, returns and direct expenses to the Trading Account', 'Bring the closing stock into the Trading Account', 'Transfer the gross profit to the Profit and Loss Account', 'Transfer indirect expenses and incomes to the Profit and Loss Account', 'Transfer the net profit to the Capital Account', 'Transfer the drawings to the Capital Account'];
  QQ('ord_close_chk', ord({
    t: 3, d: 2, c: 'understanding', marks: 2,
    stem: 'Arrange in the correct order the closing entries that Bhavna Boutique, an imagined firm, passes at the end of the year.',
    items,
    sol: 'The Trading Account is completed first (debit items, then sales and returns, then closing stock), its balance goes to the Profit and Loss Account, which is closed with the indirect items, and the profit and the drawings are finally adjusted in the Capital Account.',
  }));
}
{
  const order = [['Cash at bank', 70000], ['Debtors', 110000], ['Closing stock', 120000], ['Investments', 50000], ['Furniture', 60000], ['Machinery', 180000]];
  order.forEach(([n, x], i) => check(FT.bsLiq.rows[i][2].toLowerCase() === n.toLowerCase() && FT.bsLiq.rows[i][3] === inr(x), `ord_liq asset ${i + 1}: ${n}`));
  QQ('ord_liq', ord({
    t: 2, d: 3, c: 'application', marks: 2,
    stem: 'Arrange these assets of Farhan Textiles, an imagined firm, as they appear on the assets side of its Balance Sheet drawn up in the order of liquidity, from the most liquid to the least liquid.',
    items: order.map(([n, x]) => `${n} (${rs(x)})`),
    sol: 'Cash at bank is the most liquid, followed by debtors, which will pay in cash soon, and closing stock, which must first be sold. Investments can be sold more readily than furniture and machinery, which are fixed assets kept for use and come last.',
  }));
}
