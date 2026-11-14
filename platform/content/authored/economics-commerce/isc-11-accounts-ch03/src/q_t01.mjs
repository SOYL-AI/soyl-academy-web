// t01: the accounting equation (meaning, usefulness, effect of transactions, missing figures). Every firm and person is
// imagined; every derived amount is computed with acc.mjs through fig.mjs and asserted.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, sum, inr, rs, mdTable, equation } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_eq_cap', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: `Orai Cycle Works, an imagined firm, has total assets of ${rs(480000)} and outside liabilities of ${rs(130000)}. By the accounting equation its capital is`,
  opts: [rs(480000 - 130000), rs(480000 + 130000), rs(130000), rs(480000)],
  sol: `Capital is assets less liabilities, ${inr(480000)} − ${inr(130000)} = ${inr(350000)}. ${rs(610000)} adds the two figures, ${rs(130000)} is only the liabilities and ${rs(480000)} is the assets before the outside claims are deducted.`,
}));
QQ('m_eq_effect', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `On 6 June 2026 Haldwani Steel Racks, an imagined firm, bought furniture for ${rs(18000)} on credit from a supplier. The effect on its accounting equation is`,
  opts: [`assets rise by ${rs(18000)} and liabilities rise by ${rs(18000)}`, `one asset rises and another asset falls by ${rs(18000)}`, `assets rise by ${rs(18000)} and capital rises by ${rs(18000)}`, `assets fall by ${rs(18000)} and liabilities fall by ${rs(18000)}`],
  sol: 'Furniture is a new asset and the unpaid price is a new liability to the supplier. No cash moves, so no asset falls, and the owner\'s capital is untouched.',
}));
QQ('m_eq_profit', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Sirsa Lamp House, an imagined firm, sold goods costing ${rs(24000)} for ${rs(31000)} in cash. Compared with the position before the sale, its capital has`,
  opts: [`risen by ${rs(31000 - 24000)}`, `risen by ${rs(31000)}`, `risen by ${rs(24000)}`, 'not changed'],
  sol: `Cash rises by ${inr(31000)} while stock falls by ${inr(24000)}, so assets and capital rise by the profit, ${inr(31000)} − ${inr(24000)} = ${inr(7000)}. ${rs(31000)} is the sale price, ${rs(24000)} is the cost, and capital would stay unchanged only if the goods had been sold at cost.`,
}));
QQ('m_eq_drawings', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The proprietor of Karnal Dairy Counter, an imagined firm, took goods that cost ${rs(9500)} for use at home. In the accounting equation this makes`,
  opts: [`stock and capital both fall by ${rs(9500)}`, `stock and creditors both fall by ${rs(9500)}`, `stock falls and cash rises by ${rs(9500)}`, `capital and stock both rise by ${rs(9500)}`],
  sol: 'Goods taken for personal use are drawings: an asset leaves the business and the owner\'s claim shrinks by the same amount. No liability is involved and no cash is received.',
}));
QQ('m_eq_nochange', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Four transactions of an imagined firm are listed. Which one changes the total of its assets?',
  opts: [`Paying ${rs(14000)} to a creditor in cash`, `Collecting ${rs(14000)} in cash from a debtor`, `Buying machinery for ${rs(14000)} in cash`, `Depositing ${rs(14000)} of cash into the bank`],
  sol: 'Paying a creditor reduces cash, an asset, and creditors, a liability, so total assets fall. Collecting from a debtor, buying machinery for cash and depositing cash each exchange one asset for another and leave the total unchanged.',
}));

// ================================================================ assertion-reason
QQ('ar_eq', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'When Vapi Zip Works, an imagined firm, buys goods on credit, its total assets rise.',
  r: 'Creditors are a liability of the firm.',
  sol: 'The assets rise because stock, a new asset, is acquired, and the matching liability is created. R is a true statement but it does not explain why the total of assets increases.',
}));

// ================================================================ true-false, fill in the blanks
QQ('tf_eq', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `Ambala Tool Hire, an imagined firm, receives ${rs(40000)} of fresh capital from its owner in cash. This raises assets and liabilities by the same amount, ${rs(40000)}.`,
  sol: 'Fresh capital raises cash, an asset, and the owner\'s capital. Liabilities, the claims of outsiders, do not change.',
}));
QQ('fb_eq', fb({
  t: 1, d: 1, c: 'understanding',
  stem: `Ladakh Woollens, an imagined firm, has assets of ${rs(720000)} and outside liabilities of ${rs(295000)}. Its capital is equal to assets minus ___ and is ₹___.`,
  acc: [['liabilities', 'outside liabilities'], ['4,25,000', '425000']],
  sol: `Capital = assets − liabilities = ${inr(720000)} − ${inr(295000)} = ${inr(425000)}.`,
}));

// ================================================================ numerical
QQ('n_cap_check', numQ({
  t: 1, d: 2, c: 'understanding', value: 375000,
  stem: 'Ahilya Handicrafts, an imagined firm, has assets of ₹6,15,000 and outside liabilities of ₹2,40,000. Find its capital (in ₹).',
  sol: `Capital = assets − liabilities = ${inr(615000)} − ${inr(240000)} = ${rs(375000)}.`,
}));
{
  const open = 260000, close = 348000, drawn = 30000, fresh = 25000;
  const p = same(close - open + drawn - fresh, 93000, 'profit by capital');
  QQ('n_profit_fresh', numQ({
    t: 1, d: 3, c: 'application', value: p,
    stem: `The capital of Dhule Rope Company, an imagined firm, was ${rs(open)} at the start of the year and ${rs(close)} at the end. During the year the owner withdrew ${rs(drawn)} and brought in ${rs(fresh)} more. Find the profit for the year (in ₹).`,
    sol: `Profit = closing capital − opening capital + drawings − fresh capital = ${inr(close)} − ${inr(open)} + ${inr(drawn)} − ${inr(fresh)} = ${rs(p)}.`,
  }));
}
{
  const eq = equation({
    start: { assets: { Assets: 520000 }, liabilities: { Liabilities: 160000 }, capital: 360000 },
    steps: [
      { what: 'goods on credit', assets: { Assets: 40000 }, liabilities: { Liabilities: 40000 } },
      { what: 'creditors paid', assets: { Assets: -25000 }, liabilities: { Liabilities: -25000 } },
      { what: 'drawings', assets: { Assets: -15000 }, capital: -15000 },
    ],
  });
  same(eq.final.capital, 345000, 'capital after three transactions');
  same(eq.final.assets.Assets, 520000, 'assets after three transactions');
  QQ('n_cap_after', numQ({
    t: 1, d: 3, c: 'application', value: eq.final.capital,
    stem: `Roorkee Bolt Traders, an imagined firm, has assets of ${rs(520000)} and liabilities of ${rs(160000)}. It then buys goods worth ${rs(40000)} on credit, pays ${rs(25000)} to creditors and the owner withdraws ${rs(15000)} in cash. Find its capital at the end (in ₹).`,
    sol: `Assets at the end = ${inr(520000)} + ${inr(40000)} − ${inr(25000)} − ${inr(15000)} = ${inr(eq.final.assets.Assets)} and liabilities = ${inr(160000)} + ${inr(40000)} − ${inr(25000)} = ${inr(eq.final.liabilities.Liabilities)}, so capital = ${inr(eq.final.assets.Assets)} − ${inr(eq.final.liabilities.Liabilities)} = ${rs(eq.final.capital)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_eq_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Define the accounting equation and state one way in which the owner of a firm uses it.',
  model: 'The accounting equation expresses the dual aspect of every transaction: the resources owned by a firm, its **assets**, are always equal to the claims against them, which are the **liabilities** to outsiders and the owner\'s **capital**. It is written Assets = Liabilities + Capital.\n\nUse: the owner can find the capital, or a missing figure, from the two known ones, and can check that the position after each transaction is in balance.',
  sol: 'One mark for the statement of the equation with its meaning and one for a use.',
  scheme: [['Meaning: assets equal liabilities plus capital', 1], ['One use of the equation', 1]],
}));
QQ('s2_eq_profit', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Vizag Cotton Hub, an imagined firm, sold goods costing ${rs(16000)} for ${rs(21000)} in cash. Show the effect of this sale on its cash, stock and capital, and say why capital changes.`,
  model: `${mdTable(['Item', 'Change (₹)'], [['Cash (asset)', `+${inr(21000)}`], ['Stock (asset)', `−${inr(16000)}`], ['Capital', `+${inr(21000 - 16000)}`]])}\n\nAssets rise by ${inr(21000)} − ${inr(16000)} = ${inr(5000)}. Capital rises by the same ${rs(5000)} because the sale earned a profit, which belongs to the owner.`,
  sol: 'Show the three changes with amounts, then connect the rise in capital to the profit.',
  scheme: [['Cash up and stock down with amounts', 1], ['Capital up by the profit, with the reason', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const st = { assets: { Cash: 95000, Stock: 55000 }, liabilities: { Creditors: 30000 }, capital: 120000 };
  const eq = equation({
    start: st,
    steps: [
      { what: 'Position at the start' },
      { what: `(i) Goods bought on credit ${rs(22000)}`, assets: { Stock: 22000 }, liabilities: { Creditors: 22000 } },
      { what: `(ii) Goods costing ${rs(14000)} sold for ${rs(17500)} cash`, assets: { Cash: 17500, Stock: -14000 }, capital: 3500 },
      { what: `(iii) Cash withdrawn by the owner ${rs(6000)}`, assets: { Cash: -6000 }, capital: -6000 },
    ],
  });
  same(eq.final.capital, 117500, 'Sonbhadra capital');
  QQ('s3_eq_three', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: `Sonbhadra Pencil Works, an imagined firm, starts with cash ${rs(95000)}, stock ${rs(55000)}, creditors ${rs(30000)} and capital ${rs(120000)}. Show in an equation table the effect of (i) goods bought on credit for ${rs(22000)}; (ii) goods costing ${rs(14000)} sold for ${rs(17500)} in cash; (iii) cash withdrawn by the owner, ${rs(6000)}.`,
    model: `${eq.md}\n\nThe equation holds after every step; at the end capital is ${rs(eq.final.capital)}.`,
    sol: 'One mark for each of the three transactions, with both sides of the equation in balance.',
    scheme: [['(i) credit purchase: stock and creditors rise', 1], ['(ii) sale: cash up, stock down, capital up by the profit', 1], ['(iii) drawings: cash and capital fall', 1]],
  }));
}
QQ('s3_eq_uses', short({
  t: 1, d: 2, c: 'recall', marks: 3,
  stem: 'Give any two uses of the accounting equation in an imagined business, and one limitation of it.',
  model: '**Uses:**\n\n1. It shows the effect of every transaction, so the books can be kept in balance and errors in the dual effect are spotted.\n2. The owner can find the capital, the assets or the liabilities when the other two are known.\n\n**Limitation:** it records only transactions that can be stated in money, and it does not show the amount of profit, the sales, or the details of each asset and liability.',
  sol: 'Two uses at one mark each and a limitation for the third mark.',
  scheme: [['First use', 1], ['Second use', 1], ['One limitation', 1]],
}));
{
  const open = 400000, fresh = 30000, drawn = 40000, profit = 95000, liab = 145000;
  const close = same(open + fresh + profit - drawn, 485000, 'Rewa closing capital');
  const assets = same(close + liab, 630000, 'Rewa total assets');
  QQ('s3_eq_missing', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: `Rewa Seed Stores, an imagined firm, began the year with capital of ${rs(open)}. During the year the owner introduced ${rs(fresh)} more and withdrew ${rs(drawn)}, and the firm earned a profit of ${rs(profit)}. Its outside liabilities at the end of the year were ${rs(liab)}. Find (a) the closing capital and (b) the total assets at the end.`,
    model: `**(a)** Closing capital = ${inr(open)} + ${inr(fresh)} + ${inr(profit)} − ${inr(drawn)} = **${rs(close)}**.\n\n**(b)** Assets = liabilities + capital = ${inr(liab)} + ${inr(close)} = **${rs(assets)}**.`,
    sol: 'Add fresh capital and profit, subtract drawings, then use the equation for the assets.',
    scheme: [['Additions to and deduction from opening capital', 1], ['Closing capital', 1], ['Total assets by the equation', 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const eq = equation({
    start: { assets: { Cash: 0, Stock: 0, Debtors: 0, Van: 0 }, liabilities: { Creditors: 0 }, capital: 0 },
    steps: [
      { what: `Owner starts with cash ${rs(200000)} and a van ${rs(80000)}`, assets: { Cash: 200000, Van: 80000 }, capital: 280000 },
      { what: `(1) Goods ${rs(60000)} bought, ${rs(45000)} in cash and the rest on credit`, assets: { Stock: 60000, Cash: -45000 }, liabilities: { Creditors: 15000 } },
      { what: `(2) Goods costing ${rs(35000)} sold on credit for ${rs(44000)}`, assets: { Debtors: 44000, Stock: -35000 }, capital: 9000 },
      { what: `(3) Received from debtors ${rs(30000)}`, assets: { Cash: 30000, Debtors: -30000 } },
      { what: `(4) Paid creditors ${rs(10000)}`, assets: { Cash: -10000 }, liabilities: { Creditors: -10000 } },
      { what: `(5) Paid wages ${rs(7000)}`, assets: { Cash: -7000 }, capital: -7000 },
      { what: `(6) Owner took goods costing ${rs(5000)} for personal use`, assets: { Stock: -5000 }, capital: -5000 },
    ],
  });
  const F = eq.final;
  same(F.assets.Cash, 168000, 'Kullu cash');
  const ta = same(sum(Object.values(F.assets)), 282000, 'Kullu total assets');
  same(F.capital, 277000, 'Kullu capital');
  QQ('l5_eq_table', long({
    t: 1, d: 4, c: 'application', marks: 5,
    stem: `Kullu Apple Packers, an imagined firm, starts with cash ${rs(200000)} and a delivery van worth ${rs(80000)}, both as capital. Its transactions are: (1) goods worth ${rs(60000)} bought, ${rs(45000)} in cash and the rest on credit; (2) goods costing ${rs(35000)} sold on credit for ${rs(44000)}; (3) ${rs(30000)} received from debtors; (4) ${rs(10000)} paid to creditors; (5) wages of ${rs(7000)} paid; (6) the owner took goods costing ${rs(5000)} for personal use. (a) Show the effect of each transaction on the accounting equation in a table. (b) State the total assets and the capital at the end.`,
    model: `**(a)**\n\n${eq.md}\n\n**(b)** Total assets = ${inr(F.assets.Cash)} + ${inr(F.assets.Stock)} + ${inr(F.assets.Debtors)} + ${inr(F.assets.Van)} = **${rs(ta)}**; creditors ${rs(F.liabilities.Creditors)} and capital **${rs(F.capital)}** make the same ${rs(ta)}.`,
    sol: 'Start with the capital, then change only the affected columns after each transaction and test the balance.',
    scheme: [['Opening position with capital', 1], ['Transactions (1) and (2)', 1], ['Transactions (3) and (4)', 1], ['Transactions (5) and (6)', 1], ['(b) Total assets and capital agree', 1]],
  }));
}
{
  const rows = [
    ['(i) Machinery bought for cash', 'Machinery +50,000; cash −50,000', 'No change'],
    ['(ii) Loan taken from a bank', 'Cash +30,000; loan (liability) +30,000', 'Rises by 30,000'],
    ['(iii) Rent paid', 'Cash −12,000; capital −12,000', 'Falls by 12,000'],
    ['(iv) Collection from a debtor', 'Cash +9,000; debtors −9,000', 'No change'],
    ['(v) Goods costing 8,000 sold on credit for 11,000', 'Debtors +11,000; stock −8,000; capital +3,000', 'Rises by 3,000'],
  ];
  QQ('l5_eq_effects', long({
    t: 1, d: 3, c: 'application', marks: 5,
    stem: `For Jhunjhunu Printing Press, an imagined firm, state the items of the accounting equation that change, with the amounts, and whether the total of assets changes, for each of these: (i) machinery bought for ${rs(50000)} in cash; (ii) a loan of ${rs(30000)} taken from a bank in cash; (iii) rent of ${rs(12000)} paid; (iv) ${rs(9000)} collected from a debtor; (v) goods costing ${rs(8000)} sold on credit for ${rs(11000)}.`,
    model: mdTable(['Transaction', 'Items that change (₹)', 'Total of assets'], rows),
    sol: 'One mark for each transaction: the items, the amounts and the effect on total assets.',
    scheme: [['(i) with the effect on total assets', 1], ['(ii) with the effect on total assets', 1], ['(iii) with the effect on total assets', 1], ['(iv) with the effect on total assets', 1], ['(v) with the effect on total assets', 1]],
  }));
}
