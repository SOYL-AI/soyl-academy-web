// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, mdTable, equation, journal, ledger, gst, sum } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Anand Paper Works: documents and vouchers
const AP = { sale: 48000, ret: 6000, cheque: 30000 };
AP.due = same(AP.sale - AP.ret - AP.cheque, 12000, 'Anand amount due');
QQ('cb_documents', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Anand Paper Works and its credit sale of July 2027 and answer the questions that follow.',
  passage: `**Anand Paper Works (imagined)**\n\nAnand Paper Works, an imagined wholesaler in the imagined town of Kasturpur, sold goods worth ${rs(AP.sale)} on credit to Bharat Print House on 8 July 2027 and sent a bill listing the goods, rates and amount due. Bharat Print House returned defective goods worth ${rs(AP.ret)}, which Anand Paper Works accepted. On 20 July Bharat Print House paid ${rs(AP.cheque)} by cheque, and Anand Paper Works deposited the cheque in its bank account the same day by filling in a bank form.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', stem: 'The bill sent by Anand Paper Works on 8 July is called a(n)', opts: ['invoice', 'cash memo', 'debit note', 'pay-in-slip'], sol: 'A bill for goods sold on credit is an invoice. A cash memo is for a cash sale, a debit note is sent when goods are returned by a buyer, and a pay-in-slip is a bank form.' })),
    child('b', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the form that Anand Paper Works filled in to deposit the cheque in its bank account.', model: '**Pay-in-slip**; its counterfoil is the proof of the deposit.', sol: 'The bank form for deposits.', scheme: [['Pay-in-slip', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the amount still due from Bharat Print House after the return and the cheque.', model: `Amount due = ${inr(AP.sale)} − ${inr(AP.ret)} − ${inr(AP.cheque)} = **${rs(AP.due)}**.`, sol: 'Sale less return less payment.', scheme: [['Deducting the return and the payment from the sale', 1], [`Amount due ${rs(AP.due)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the document the firm sends for the returned goods and say why the adjustment is supported by a journal voucher, not a cash voucher.', model: 'Anand Paper Works sends a **credit note**, because the account of Bharat Print House is credited with the returned goods. The adjustment is supported by a **journal (transfer) voucher** because no cash moves in a return; cash vouchers are for receipts and payments of cash.', sol: 'Credit note; journal voucher because no cash is involved.', scheme: [['Credit note named with reason', 1], ['Journal voucher because no cash moves', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Lalit Gift Gallery: accounting equation
const LG = { cap: 180000, buy: 50000, loan: 40000, cost: 20000, price: 27000, wages: 6000 };
LG.profit = same(LG.price - LG.cost, 7000, 'Lalit profit');
const LGq = equation({
  start: { assets: { Cash: LG.cap }, liabilities: {}, capital: LG.cap },
  steps: [
    { what: 'Goods bought on credit', assets: { Stock: LG.buy }, liabilities: { Creditors: LG.buy } },
    { what: 'Bank loan received', assets: { Cash: LG.loan }, liabilities: { 'Bank loan': LG.loan } },
    { what: 'Cash sale at a profit', assets: { Cash: LG.price, Stock: -LG.cost }, capital: LG.profit },
    { what: 'Wages paid', assets: { Cash: -LG.wages }, capital: -LG.wages },
  ],
});
const LGa = sum(Object.values(LGq.final.assets));
same(LGa, 271000, 'Lalit assets');
same(LGq.final.capital, 181000, 'Lalit capital');
same(sum(Object.values(LGq.final.liabilities)), 90000, 'Lalit liabilities');
QQ('cb_equation', caseQ({
  t: [2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Lalit Gift Gallery and its first month of business and answer the questions that follow.',
  passage: `**Lalit Gift Gallery (imagined)**\n\nLalit Gift Gallery, an imagined shop in the imagined town of Madhupur, began business in September 2027 with ${rs(LG.cap)} in cash as capital. It then bought goods worth ${rs(LG.buy)} on credit, received a bank loan of ${rs(LG.loan)} in cash, sold goods that had cost ${rs(LG.cost)} for ${rs(LG.price)} in cash, and paid wages of ${rs(LG.wages)} in cash.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'The effect of receiving the bank loan on the accounting equation is that', opts: ['an asset and a liability both increase', 'an asset and capital both increase', 'an asset decreases and a liability decreases', 'a liability increases and capital decreases'], sol: 'Cash, an asset, increases and the bank loan, a liability, increases by the same amount. Capital is not touched, and nothing decreases.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the profit made on the cash sale.', model: `Profit = ${inr(LG.price)} − ${inr(LG.cost)} = **${rs(LG.profit)}**.`, sol: 'Selling price less cost.', scheme: [[`${rs(LG.profit)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the total assets after all four transactions and show that they equal liabilities plus capital.', model: `${LGq.md}\n\nAssets = ${inr(LGq.final.assets.Cash)} + ${inr(LGq.final.assets.Stock)} = **${rs(LGa)}**; liabilities ${inr(sum(Object.values(LGq.final.liabilities)))} + capital ${inr(LGq.final.capital)} = ${rs(LGa)}.`, sol: 'Update every item after each transaction.', scheme: [[`Total assets ${rs(LGa)}`, 1], ['Equality with liabilities plus capital shown', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain why paying wages reduces capital even though no liability changes.', model: `Wages are an expense: they lower the profit earned, and profit belongs to the proprietor, so capital falls by ${rs(LG.wages)}. The cash paid lowers an asset by the same amount, so the equation stays balanced without any liability changing.`, sol: 'Expense reduces capital; cash falls equally.', scheme: [['Expense reduces profit and capital', 1], ['Asset falls by the same amount, equation balanced', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Lakshmi Handlooms: journal with GST
const LH = { buy: 25000, sell: 40000, rate: 18 };
LH.bg = gst(LH.buy, LH.rate);
LH.sg = gst(LH.sell, LH.rate);
LH.cash = same(LH.sell + LH.sg.tax, 47200, 'Lakshmi cash received');
LH.net = same(LH.sg.tax - LH.bg.tax, 2700, 'Lakshmi net tax');
const LHe = [
  { date: '4 Oct', dr: [['Purchases A/c', LH.buy], ['Input CGST A/c', LH.bg.cgst], ['Input SGST A/c', LH.bg.sgst]], cr: [['Naresh Textiles A/c', LH.buy + LH.bg.tax]], note: 'Being goods bought on credit, tax at an imagined 18%' },
  { date: '11 Oct', dr: [['Cash A/c', LH.cash]], cr: [['Sales A/c', LH.sell], ['Output CGST A/c', LH.sg.cgst], ['Output SGST A/c', LH.sg.sgst]], note: 'Being goods sold for cash, tax collected' },
];
const LHj = journal(LHe);
QQ('cb_gst_journal', caseQ({
  t: [3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Lakshmi Handlooms and its purchase and sale of October 2027 and answer the questions that follow.',
  passage: `**Lakshmi Handlooms (imagined)**\n\nLakshmi Handlooms, an imagined shop in the imagined town of Chandrapur, buys and sells within its own state. Goods and services tax is charged at an imagined rate of ${LH.rate}% and splits equally into CGST and SGST. On 4 October 2027 the shop bought goods worth ${rs(LH.buy)} on credit from Naresh Textiles. On 11 October it sold goods worth ${rs(LH.sell)} for cash.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'On the cash sale of 11 October, the accounts credited are', opts: ['Sales A/c, Output CGST A/c and Output SGST A/c', 'Sales A/c only', 'Input CGST A/c and Input SGST A/c', 'Cash A/c and Sales A/c'], sol: 'The sale, and the tax collected from the customer for the government, are credited; cash is debited. Input accounts belong to purchases, and Sales alone would leave out the tax.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Find the amount debited to Cash A/c on the sale.', model: `Tax = ${inr(LH.sell)} × ${LH.rate}/100 = ${rs(LH.sg.tax)}; cash received = ${inr(LH.sell)} + ${inr(LH.sg.tax)} = **${rs(LH.cash)}**.`, sol: 'Sale value plus tax.', scheme: [[`${rs(LH.cash)}`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Pass the journal entries for the two transactions.', model: `${LHj.md}`, sol: 'Input tax is debited on the purchase; output tax is credited on the sale.', scheme: [['Purchase entry', 1], ['Sale entry', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Find the net CGST and SGST together that the shop must pay for the month after setting off the input tax.', model: `Output tax = ${rs(LH.sg.tax)}; input tax = ${rs(LH.bg.tax)}. Net payable = ${inr(LH.sg.tax)} − ${inr(LH.bg.tax)} = **${rs(LH.net)}**, made of ${inr(LH.net / 2)} as CGST and ${inr(LH.net / 2)} as SGST.`, sol: 'Output tax less input tax.', scheme: [['Output and input tax found', 1], [`Net payable ${rs(LH.net)}`, 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Bhavna Boutique: ledger and balancing
const BB = { open: 35000, sales: 60000, debtor: 15000, supplier: 28000, wages: 9000, drawn: 5000 };
const BBl = ledger({
  name: 'Cash A/c',
  opening: { side: 'dr', amount: BB.open },
  dr: [['To Sales A/c', BB.sales], ['To Debtor A/c', BB.debtor]],
  cr: [['By Supplier A/c', BB.supplier], ['By Wages A/c', BB.wages], ['By Drawings A/c', BB.drawn]],
});
const BBd = BB.open + BB.sales + BB.debtor;
same(BBd, 110000, 'Bhavna debit total');
same(BBl.balance, 68000, 'Bhavna cash balance');
QQ('cb_ledger', caseQ({
  t: [4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Bhavna Boutique and its cash account for September 2027 and answer the questions that follow.',
  passage: `**Bhavna Boutique (imagined)**\n\nOn 1 September 2027 the Cash A/c of Bhavna Boutique, an imagined shop in the imagined town of Sundarpur, showed a debit balance of ${rs(BB.open)} brought down from August. In September the shop received ${rs(BB.sales)} from cash sales and ${rs(BB.debtor)} from a debtor, paid ${rs(BB.supplier)} to a supplier and ${rs(BB.wages)} as wages, and the proprietor withdrew ${rs(BB.drawn)} for personal use.`,
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'understanding', stem: 'The opening balance of ₹35,000 appears in the Cash A/c on 1 September as', opts: ['To Balance b/d on the debit side', 'By Balance b/d on the credit side', 'By Balance c/d on the credit side', 'To Balance c/d on the debit side'], sol: 'Cash is an asset with a debit balance, brought down on the debit side of the new period as To Balance b/d. A credit-side entry or a c/d entry would belong to the closing of a period.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Find the total of the debit side of the Cash A/c for September.', model: `${inr(BB.open)} + ${inr(BB.sales)} + ${inr(BB.debtor)} = **${rs(BBd)}**.`, sol: 'Add the opening balance and the receipts.', scheme: [[`${rs(BBd)}`, 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the balance to be carried down on 30 September and state on which side it is written.', model: `${BBl.md}\n\nCredit side before balancing = ${inr(BB.supplier)} + ${inr(BB.wages)} + ${inr(BB.drawn)} = ${inr(BB.supplier + BB.wages + BB.drawn)}. Balance c/d = ${inr(BBd)} − ${inr(BB.supplier + BB.wages + BB.drawn)} = **${rs(BBl.balance)}**, written on the credit side as By Balance c/d.`, sol: 'Larger side less smaller side, written on the smaller side.', scheme: [[`Balance ${rs(BBl.balance)}`, 1], ['Written on the credit side as By Balance c/d', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain what the closing debit balance of the Cash A/c tells about cash and how it is shown on 1 October.', model: `A debit balance of ${rs(BBl.balance)} shows that the shop has that amount of cash in hand, an asset. On 1 October it is brought down on the debit side as **To Balance b/d ${rs(BBl.balance)}**, opening the account for the new month.`, sol: 'Debit balance of an asset; brought down on the debit side.', scheme: [['Debit balance means cash in hand, an asset', 1], ['Brought down as To Balance b/d on the debit side', 1]] }),
    ]),
  ],
}));
void mdTable;
