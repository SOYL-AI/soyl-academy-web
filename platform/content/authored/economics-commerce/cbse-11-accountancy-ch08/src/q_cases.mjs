// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { trading, balanceSheet, journal } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { same, sum, inr, rs, mdTable, gpOf, OP } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Esha Foods: capital and revenue payments
{
  const price = 180000, carr = 4000, fit = 6000, serv = 2500;
  const cost = same(price + carr + fit, 190000, 'Esha Foods machine cost');
  QQ('cb_class', caseQ({
    t: 1, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Esha Foods and its new machine and answer the questions that follow.',
    passage: `**Esha Foods (imagined)**\n\nEsha Foods, an imagined food-processing firm in the imagined town of Devgaon, bought a mixing machine in April 2026 for ${rs(price)}. It paid ${rs(carr)} to a transporter to bring the machine to its factory and ${rs(fit)} to an engineer to fit it on the factory floor. In the same year it spent ${rs(serv)} on oil and on servicing of the machine.`,
    parts: [
      child('a', mcq({ t: 1, d: 2, c: 'understanding', stem: `The ${rs(carr)} paid to the transporter is`, opts: ['capital expenditure, because it is a cost of bringing the machine to its place of use', 'revenue expenditure, because carriage is a running cost', 'revenue expenditure, because it is paid to an outsider', 'deferred revenue expenditure, because the machine lasts many years'], sol: 'The cost of bringing a fixed asset to the place where it will be used is part of the cost of the asset. Carriage on goods bought for resale is a running cost, but carriage on a machine is not.' })),
      child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the amount at which the machine is to be entered in the books.', model: `${inr(price)} + ${inr(carr)} + ${inr(fit)} = **${rs(cost)}**.`, sol: 'Price plus carriage plus fitting.', scheme: [[`${rs(cost)}`, 1]] })),
      child('c', short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: `**Either** (i): State with a reason how the ${rs(serv)} spent on oil and servicing is treated.`, model: `It is **revenue expenditure**, charged to the Profit and Loss Account, because it only keeps the machine working and its benefit is used up within the year.`, sol: 'Maintenance gives a benefit within the year.', scheme: [['Revenue expenditure', 1], ['Reason: maintains the machine; benefit used within the year', 1]] }), [
        short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The accountant debits the carriage and the fitting charges, ${rs(carr + fit)} in all, to Repairs A/c. By how much is the profit of Esha Foods understated, and what is the effect on the machine?`, model: `The ${rs(carr + fit)} is capital, but it has been charged as an expense, so profit is understated by **${rs(carr + fit)}**. The machine appears at ${rs(price)} instead of ${rs(cost)}, so it is also understated by ${rs(carr + fit)}.`, sol: 'A capital item charged to expenses understates profit and the asset.', scheme: [[`Profit understated by ${rs(carr + fit)}`, 1], [`Machine understated by ${rs(carr + fit)}`, 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Mira Mobiles: Trading Account
{
  const g = { os: 48000, pur: 320000, pret: 12000, dexp: [9000, 21000], sale: 460000, sret: 10000, cs: 55000 };
  const gp = same(gpOf(g), 119000, 'Mira Mobiles gross profit');
  const tr = trading({
    dr: [['To Opening Stock', g.os], [`To Purchases (${rs(g.pur)}) less Returns (${rs(g.pret)})`, g.pur - g.pret], ['To Carriage Inwards', g.dexp[0]], ['To Wages', g.dexp[1]]],
    cr: [[`By Sales (${rs(g.sale)}) less Returns (${rs(g.sret)})`, g.sale - g.sret], ['By Closing Stock', g.cs]],
  });
  same(tr.gp, gp, 'Mira Mobiles trading account agrees');
  QQ('cb_trading', caseQ({
    t: 2, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Mira Mobiles and its year-end figures and answer the questions that follow.',
    passage: `**Mira Mobiles (imagined)**\n\nMira Mobiles, an imagined shop in the imagined town of Chandpur, has these figures for the year ended 31 March 2026: opening stock ${rs(g.os)}; purchases ${rs(g.pur)}; goods returned to suppliers ${rs(g.pret)}; carriage inwards ${rs(g.dexp[0])}; wages ${rs(g.dexp[1])}; sales ${rs(g.sale)}; goods returned by customers ${rs(g.sret)}. Goods unsold on 31 March 2026 are valued at ${rs(g.cs)}.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'In the Trading Account of Mira Mobiles the carriage inwards is shown', opts: ['on the debit side', 'on the credit side', 'in the Profit and Loss Account', 'in the Balance Sheet'], sol: 'Carriage inwards is a direct expense, debited in the Trading Account. It is not an income, so it is not credited, and it is not an indirect expense or an asset.' })),
      child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the gross profit of Mira Mobiles for the year.', model: `Credit side ${inr(g.sale - g.sret)} + ${inr(g.cs)} = ${inr(g.sale - g.sret + g.cs)}; debit side ${inr(g.os)} + ${inr(g.pur - g.pret)} + ${inr(g.dexp[0])} + ${inr(g.dexp[1])} = ${inr(g.os + g.pur - g.pret + sum(g.dexp))}. Gross profit = **${rs(gp)}**.`, sol: 'Credit side total less debit side items.', scheme: [[`${rs(gp)}`, 1]] })),
      child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Prepare the Trading Account of Mira Mobiles for the year ended 31 March 2026.', model: tr.md, sol: 'Debit side with net purchases, credit side with net sales and closing stock, and the gross profit.', scheme: [['Debit side items with net purchases', 1], ['Credit side with closing stock; gross profit as the balancing figure', 1]] }), [
        short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the closing stock of Mira Mobiles is credited in the Trading Account and also shown in its Balance Sheet.', model: 'Goods unsold at the end of the year have not been sold, so their cost must be taken out of the cost of the goods sold, which the credit entry in the Trading Account does. The same goods are still owned by the business, so they are an asset and appear in the Balance Sheet.', sol: 'It reduces the cost of goods sold and it is an asset.', scheme: [['Credited in the Trading Account so that cost of goods sold excludes unsold goods', 1], ['Shown as a current asset because the firm still owns the goods', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Nikhil Traders: Balance Sheet
{
  const capOpen = 200000, np = 60000, dr = 24000, loan = 80000, cred = 34000;
  const A = [['Plant', 140000], ['Furniture', 30000], ['Investments', 20000], ['Closing stock', 70000], ['Debtors', 60000], ['Cash', 30000]];
  const capNow = same(capOpen + np - dr, 236000, 'Nikhil Traders closing capital');
  const bs = balanceSheet({ liabilities: [['Capital', capNow], ['Bank Loan', loan], ['Creditors', cred]], assets: A });
  const liqRows = [...A].reverse().map(([n, x]) => [n, inr(x)]);
  QQ('cb_bs', caseQ({
    t: 2, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Nikhil Traders and its Balance Sheet items and answer the questions that follow.',
    passage: `**Nikhil Traders (imagined)**\n\nNikhil Traders, an imagined firm in the imagined town of Lalpur, began the year ended 31 March 2027 with capital of ${rs(capOpen)}. It earned a net profit of ${rs(np)} and its proprietor took drawings of ${rs(dr)}. On 31 March 2027 it owed ${rs(loan)} on a bank loan repayable after six years and ${rs(cred)} to creditors. Its assets were plant ${rs(A[0][1])}, furniture ${rs(A[1][1])}, investments ${rs(A[2][1])}, closing stock ${rs(A[3][1])}, debtors ${rs(A[4][1])} and cash ${rs(A[5][1])}.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'In the Balance Sheet of Nikhil Traders the bank loan is grouped under', opts: ['long-term liabilities', 'current liabilities', 'fixed assets', 'capital'], sol: 'A loan repayable after six years is a long-term liability. Current liabilities are due within a year, and fixed assets and capital are not borrowed amounts.' })),
      child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the capital of Nikhil Traders to be shown in the Balance Sheet.', model: `${inr(capOpen)} + ${inr(np)} − ${inr(dr)} = **${rs(capNow)}**.`, sol: 'Opening capital plus profit less drawings.', scheme: [[`${rs(capNow)}`, 1]] })),
      child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Show the assets side of the Balance Sheet of Nikhil Traders in the order of liquidity.', model: `${mdTable(['Assets', '₹'], [...liqRows, ['**Total**', `**${inr(bs.total)}**`]])}`, sol: 'Cash first, plant last.', scheme: [['Items in the order from cash to plant', 1], [`Total ${rs(bs.total)}`, 1]] }), [
        short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): State which asset of Nikhil Traders comes first and which comes last on the assets side if the Balance Sheet is drawn in the order of permanence, and why this differs from the order of liquidity.', model: 'In the order of permanence the plant comes first, because it is the most permanent asset, and cash comes last. The order of liquidity is the reverse: cash first, as it is the most easily available, and plant last.', sol: 'The two orders are reverse of each other.', scheme: [['Plant first and cash last in the order of permanence', 1], ['Reason: permanence versus ease of conversion into cash', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Omkar Paints: closing and opening entries
{
  const E = (k) => OP.E.find((x) => x.step === k);
  const sal = OP.iexp.map((l) => [l.name, l.amt]);
  QQ('cb_close', caseQ({
    t: 3, d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Omkar Paints and its year-end position and answer the questions that follow.',
    passage: `**Omkar Paints (imagined)**\n\nOmkar Paints, an imagined firm in the imagined town of Rampur, closed its books on 31 March 2027. Its Trading Account showed a gross profit of ${rs(OP.gp)}. Its Profit and Loss Account showed indirect expenses of salaries ${rs(sal[0][1])} and rent ${rs(sal[1][1])}, and interest received of ${rs(OP.inc[0].amt)}. Closing stock was ${rs(OP.closing)}. Its drawings were ${rs(OP.draw)}. Its assets were furniture ${rs(OP.fa[0].amt)}, closing stock, debtors ${rs(OP.ca[0].amt)} and cash at bank ${rs(OP.ca[1].amt)}, and its only liability was creditors of ${rs(OP.cl[0].amt)}.`,
    parts: [
      child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'The closing entry that transfers the salaries and rent of Omkar Paints debits', opts: ['Profit and Loss Account', 'Trading Account', 'Capital Account', 'Drawings Account'], sol: 'Indirect expenses are closed to the Profit and Loss Account, which is debited. The Trading Account takes the direct items, and the Capital Account and the Drawings Account are used for the profit and the drawings.' })),
      child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the net profit of Omkar Paints for the year.', model: `${inr(OP.gp)} + ${inr(OP.inc[0].amt)} − ${inr(sal[0][1])} − ${inr(sal[1][1])} = **${rs(OP.np)}**.`, sol: 'Gross profit plus the income less the indirect expenses.', scheme: [[`${rs(OP.np)}`, 1]] })),
      child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Pass the closing entries that transfer the indirect expenses and the interest received to the Profit and Loss Account.', model: journal([E(5), E(6)]).md, sol: 'Profit and Loss Account debited for the expenses; income credited to the Profit and Loss Account.', scheme: [['Entry for the indirect expenses', 1], ['Entry for the interest received', 1]] }), [
        short({ t: 3, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Pass the opening entry of Omkar Paints on 1 April 2027.', model: OP.opening.md, sol: 'Assets debited; capital and creditors credited.', scheme: [['Assets debited with correct amounts', 1], ['Capital and creditors credited; totals agree', 1]] }),
      ]),
    ],
  }));
}
