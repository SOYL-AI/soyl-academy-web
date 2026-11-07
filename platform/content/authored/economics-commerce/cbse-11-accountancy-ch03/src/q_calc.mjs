// Numerical, short-answer and long-answer items for ch03. Every derived amount is computed with acc.mjs and asserted.
import { short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, equation, journal, ledger, post, gst } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';


// ================================================================ numericals (t02, t03, t04)
const TF = { open: 250000, profit: 40000, drawn: 15000 };
TF.close = same(TF.open + TF.profit - TF.drawn, 275000, 'n_equation_cap');
QQ('n_equation_cap', numQ({
  t: 2, d: 2, c: 'application', value: TF.close, unit: '₹',
  stem: `Tanuja Fabrics, an imagined firm, began April 2027 with capital of ${rs(TF.open)}. During the month it earned a profit of ${rs(TF.profit)} and the proprietor withdrew ${rs(TF.drawn)} for household use. Find the capital at the end of April (in ₹).`,
  sol: `Closing capital = opening capital + profit − drawings = ${inr(TF.open)} + ${inr(TF.profit)} − ${inr(TF.drawn)} = ${rs(TF.close)}.`,
}));
const DV = equation({
  start: { assets: { Cash: 200000 }, liabilities: {}, capital: 200000 },
  steps: [
    { what: 'Goods bought on credit', assets: { Stock: 50000 }, liabilities: { Creditors: 50000 } },
    { what: 'Bank loan received', assets: { Cash: 40000 }, liabilities: { 'Bank loan': 40000 } },
    { what: 'Creditor paid', assets: { Cash: -10000 }, liabilities: { Creditors: -10000 } },
  ],
});
const DV_A = sum(Object.values(DV.final.assets));
same(DV_A, 280000, 'n_eq_assets');
QQ('n_eq_assets', numQ({
  t: 2, d: 3, c: 'application', value: DV_A, unit: '₹',
  stem: 'Dev Sports, an imagined shop, starts with ₹2,00,000 in cash as capital. It then buys goods worth ₹50,000 on credit, receives a bank loan of ₹40,000 in cash and pays ₹10,000 in cash to a creditor. Find the total assets after these three transactions (in ₹).',
  sol: `${DV.md}\n\nTotal assets = cash ${inr(DV.final.assets.Cash)} + stock ${inr(DV.final.assets.Stock)} = ${rs(DV_A)}. As a check, liabilities ${inr(sum(Object.values(DV.final.liabilities)))} + capital ${inr(DV.final.capital)} = ${rs(DV_A)}.`,
}));
const GH = { cost: 18000, price: 23500 };
GH.gain = same(GH.price - GH.cost, 5500, 'n_profit_equation');
QQ('n_profit_equation', numQ({
  t: 2, d: 2, c: 'application', value: GH.gain, unit: '₹',
  stem: `Girish Sports Hub, an imagined shop, sells goods that cost it ${rs(GH.cost)} for ${rs(GH.price)} in cash. By how much does the sale increase the capital of the proprietor (in ₹)?`,
  sol: `Cash rises by ${rs(GH.price)} and stock falls by ${rs(GH.cost)}, so assets rise by ${inr(GH.price)} − ${inr(GH.cost)} = ${rs(GH.gain)}. Liabilities do not change, so capital increases by ${rs(GH.gain)}, the profit on the sale.`,
}));
const KP = { cash: 38000, bank: 92000, stock: 110000, debtors: 40000, creditors: 52000, loan: 60000 };
KP.assets = KP.cash + KP.bank + KP.stock + KP.debtors;
KP.liab = KP.creditors + KP.loan;
KP.cap = same(KP.assets - KP.liab, 168000, 'n_opening_cap');
QQ('n_opening_cap', numQ({
  t: 3, d: 2, c: 'application', value: KP.cap, unit: '₹',
  stem: `Kunal Pharmacy, an imagined firm, begins a new year with cash ${rs(KP.cash)}, bank balance ${rs(KP.bank)}, stock ${rs(KP.stock)} and debtors ${rs(KP.debtors)}. It owes ${rs(KP.creditors)} to creditors and ${rs(KP.loan)} on a bank loan. Find the amount credited to Capital A/c in the opening entry (in ₹).`,
  sol: `Total assets = ${inr(KP.cash)} + ${inr(KP.bank)} + ${inr(KP.stock)} + ${inr(KP.debtors)} = ${rs(KP.assets)}. Outside liabilities = ${inr(KP.creditors)} + ${inr(KP.loan)} = ${rs(KP.liab)}. Capital = ${inr(KP.assets)} − ${inr(KP.liab)} = ${rs(KP.cap)}.`,
}));
const MB = { goods: 35000, rate: 12 };
MB.g = gst(MB.goods, MB.rate);
MB.total = same(MB.goods + MB.g.tax, 39200, 'n_gst_total');
QQ('n_gst_total', numQ({
  t: 3, d: 2, c: 'application', value: MB.total, unit: '₹',
  stem: `Meena Books, an imagined shop, buys goods worth ${rs(MB.goods)} on credit from a publisher in its own state. Goods and services tax at an imagined rate of ${MB.rate}% is charged in addition. Find the amount credited to the publisher's account (in ₹).`,
  sol: `Tax = ${inr(MB.goods)} × ${MB.rate}/100 = ${rs(MB.g.tax)} (CGST ${inr(MB.g.cgst)} and SGST ${inr(MB.g.sgst)}). The publisher is credited with the invoice total = ${inr(MB.goods)} + ${inr(MB.g.tax)} = ${rs(MB.total)}.`,
}));
const ZB = { goods: 48000, rate: 5 };
ZB.g = gst(ZB.goods, ZB.rate);
same(ZB.g.cgst, 1200, 'n_gst_input');
QQ('n_gst_input', numQ({
  t: 3, d: 3, c: 'application', value: ZB.g.cgst, unit: '₹',
  stem: `Zoya Provisions, an imagined store, buys goods worth ${rs(ZB.goods)} on credit from a supplier in its own state. Goods and services tax at an imagined rate of ${ZB.rate}% is charged and splits equally into CGST and SGST. Find the amount debited to Input CGST A/c (in ₹).`,
  sol: `Total tax = ${inr(ZB.goods)} × ${ZB.rate}/100 = ${rs(ZB.g.tax)}. Because the supply is within the state, it splits equally: Input CGST = ${inr(ZB.g.tax)} ÷ 2 = ${rs(ZB.g.cgst)}, and Input SGST is also ${rs(ZB.g.sgst)}.`,
}));
const JT = [
  { date: '2 May', dr: [['Cash A/c', 120000]], cr: [['Capital A/c', 120000]], note: 'Being cash brought in by the proprietor' },
  { date: '5 May', dr: [['Furniture A/c', 35000]], cr: [['Cash A/c', 35000]], note: 'Being furniture bought for cash' },
];
const JTg = gst(28000, 12);
JT.push({ date: '9 May', dr: [['Ramesh Kumar A/c', 28000 + JTg.tax]], cr: [['Sales A/c', 28000], ['Output CGST A/c', JTg.cgst], ['Output SGST A/c', JTg.sgst]], note: 'Being goods sold on credit to Ramesh Kumar, tax charged' });
const JTj = journal(JT);
same(JTj.total, 186360, 'n_journal_total');
QQ('n_journal_total', numQ({
  t: 3, d: 4, c: 'application', value: JTj.total, unit: '₹',
  stem: `Chetan Enterprises, an imagined firm, records three transactions in May 2027: (i) on 2 May the proprietor brings ${rs(120000)} in cash; (ii) on 5 May furniture of ${rs(35000)} is bought for cash; (iii) on 9 May goods of ${rs(28000)} are sold on credit to Ramesh Kumar, with goods and services tax at an imagined rate of 12% added and split equally into CGST and SGST. Find the total of the debit column of the journal for these three entries (in ₹).`,
  sol: `${JTj.md}\n\nEntry (iii): tax = ${inr(28000)} × 12/100 = ${rs(JTg.tax)}, so Ramesh Kumar A/c is debited with ${inr(28000)} + ${inr(JTg.tax)} = ${rs(28000 + JTg.tax)}. Total of the debit column = ${inr(120000)} + ${inr(35000)} + ${inr(28000 + JTg.tax)} = ${rs(JTj.total)}.`,
}));
const CB = ledger({ name: 'Cash A/c', dr: [['To Capital A/c', 90000], ['To Sales A/c', 25000], ['To Debtor A/c', 12000]], cr: [['By Purchases A/c', 30000], ['By Wages A/c', 18000]] });
same(CB.balance, 79000, 'n_cash_bal');
QQ('n_cash_bal', numQ({
  t: 4, d: 2, c: 'application', value: CB.balance, unit: '₹',
  stem: 'The Cash A/c of Zubin Traders, an imagined firm, shows on the debit side: capital introduced ₹90,000, cash sales ₹25,000 and cash received from a debtor ₹12,000; and on the credit side: cash purchases ₹30,000 and wages ₹18,000. Find the closing balance of the account (in ₹).',
  sol: `${CB.md}\n\nDebit total = ${inr(90000 + 25000 + 12000)}; credit total = ${inr(30000 + 18000)}. The difference ${rs(CB.balance)} is a debit balance, carried down as By Balance c/d.`,
}));
const DB = ledger({ name: 'Ashok Menon A/c', dr: [['To Sales A/c', 56000]], cr: [['By Sales Returns A/c', 6000], ['By Cash A/c', 30000]] });
same(DB.balance, 20000, 'n_debtor_bal');
QQ('n_debtor_bal', numQ({
  t: 4, d: 2, c: 'application', value: DB.balance, unit: '₹',
  stem: 'Imagined Lotus Hardware sold goods worth ₹56,000 on credit to Ashok Menon. He returned goods worth ₹6,000 and paid ₹30,000 in cash. Find the balance in his account in the books of Lotus Hardware (in ₹).',
  sol: `${DB.md}\n\nDebit side ${inr(56000)}; credit side ${inr(6000)} + ${inr(30000)} = ${inr(36000)}. The balance ${rs(DB.balance)} is a debit balance: Ashok Menon still owes this amount.`,
}));
const CR = ledger({ name: 'Gulab Traders A/c', opening: { side: 'cr', amount: 24000 }, dr: [['To Cash A/c', 30000], ['To Purchases Returns A/c', 9000]], cr: [['By Purchases A/c', 40000]] });
same(CR.balance, -25000, 'n_credit_bal');
QQ('n_credit_bal', numQ({
  t: 4, d: 3, c: 'application', value: -CR.balance, unit: '₹',
  stem: 'On 1 June 2027 the account of Gulab Traders, an imagined supplier, in the books of Mohit Stores showed a credit balance of ₹24,000. During June, Mohit Stores bought goods worth ₹40,000 on credit, returned goods worth ₹9,000 and paid ₹30,000 in cash. Find the credit balance carried down on 30 June (in ₹).',
  sol: `${CR.md}\n\nCredit side ${inr(24000)} + ${inr(40000)} = ${inr(64000)}; debit side ${inr(30000)} + ${inr(9000)} = ${inr(39000)}. The credit balance of ${rs(-CR.balance)} is what Mohit Stores still owes.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_txn', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State what is meant by a business transaction and name its two kinds.',
  model: 'A **business transaction** is an exchange of money or money\'s worth between the business and an outsider, which can be measured in money. Its two kinds are **cash transactions**, settled at once, and **credit transactions**, settled later.',
  sol: 'Meaning with the two features, then the two kinds.',
  scheme: [['Exchange with an outsider, measurable in money', 1], ['Cash and credit transactions', 1]],
}));
QQ('s2_memo_invoice', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a cash memo and an invoice on any two points.',
  model: '1. **Use:** a cash memo is made for a cash sale; an invoice is made for goods sold on credit.\n2. **Payment:** a cash memo shows that the price has been paid at once; an invoice shows an amount still due, often with tax and terms of payment.',
  sol: 'Any two points of difference.',
  scheme: [['First point with both documents', 1], ['Second point with both documents', 1]],
}));
QQ('s2_voucher', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is an accounting voucher? State any two items of information that it contains.',
  model: 'An **accounting voucher** is a written paper made out from the source documents to back up an entry in the books. Typical contents are the date, voucher number, accounts debited and credited, amount, narration and signatures.',
  sol: 'Meaning and any two contents.',
  scheme: [['Written document supporting an entry', 1], ['Any two contents', 1]],
}));
QQ('s2_notes', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Venkat Traders, an imagined firm, returns goods worth ₹3,000 to its supplier, who accepts them. State which document the firm sends and which document the supplier issues in reply.',
  model: 'Venkat Traders sends a **debit note** to the supplier, informing the supplier that his account is debited with ₹3,000. The supplier replies with a **credit note**, confirming that the account of Venkat Traders is credited with the same amount for the returned goods.',
  sol: 'Debit note by the buyer; credit note by the seller.',
  scheme: [['Debit note sent by the buyer', 1], ['Credit note issued by the seller', 1]],
}));
const E12 = equation({
  start: { assets: { Cash: 100000 }, liabilities: {}, capital: 100000 },
  steps: [
    { what: 'Goods bought on credit ₹12,000', assets: { Stock: 12000 }, liabilities: { Creditors: 12000 } },
    { what: 'Creditor paid ₹5,000', assets: { Cash: -5000 }, liabilities: { Creditors: -5000 } },
  ],
});
QQ('s2_eq_effect', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Show the effect on the accounting equation of an imagined firm of (i) buying goods worth ₹12,000 on credit and (ii) paying ₹5,000 to the creditor in cash.',
  model: `(i) Stock, an asset, increases by ₹12,000 and creditors, a liability, increase by ₹12,000. (ii) Cash, an asset, decreases by ₹5,000 and creditors decrease by ₹5,000. Capital is unchanged in both, so the equation stays balanced: after the two, assets are ${rs(sum(Object.values(E12.final.assets)))} and liabilities plus capital are ${rs(sum(Object.values(E12.final.liabilities)) + E12.final.capital)} on a starting capital of ${rs(100000)}.`,
  sol: 'Two-sided effect for each transaction.',
  scheme: [['Effect of the credit purchase', 1], ['Effect of the payment', 1]],
}));
QQ('s2_rules', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the rules of debit and credit for assets and for liabilities by the accounting equation approach.',
  model: 'An **increase in an asset** is debited and a **decrease in an asset** is credited. An **increase in a liability** is credited and a **decrease in a liability** is debited. Capital follows the liabilities, since it is the owner\'s claim in the equation.',
  sol: 'Assets one way, liabilities the opposite way.',
  scheme: [['Assets: increase debit, decrease credit', 1], ['Liabilities: increase credit, decrease debit', 1]],
}));
QQ('s2_narration', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is narration? Write the narration for goods worth ₹6,400 sold for cash to a customer by an imagined shop.',
  model: '**Narration** is a brief explanation of the entry, written in brackets below it, so that the reason for the entry is clear later. Here: *(Being goods sold for cash).*',
  sol: 'Meaning, then the narration for the sale.',
  scheme: [['Meaning of narration', 1], ['Narration: Being goods sold for cash', 1]],
}));
QQ('s2_balance', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain a debit balance and a credit balance of a ledger account, giving one imagined example of each.',
  model: 'A **debit balance** arises when the debit side of an account is larger; for example, cash in hand, an asset. A **credit balance** arises when the credit side is larger; for example, the account of a supplier whom the firm still owes, a liability.',
  sol: 'Meaning with one example each.',
  scheme: [['Debit balance with example', 1], ['Credit balance with example', 1]],
}));
QQ('s2_posting', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is posting? State the use of the ledger folio.',
  model: '**Posting** is the transfer of the entries from the journal to the proper ledger accounts. The **ledger folio** is the page number of the account written in the journal beside the account, so that the posting can be traced and checked quickly.',
  sol: 'Meaning of posting and use of the folio.',
  scheme: [['Posting: journal to ledger', 1], ['Folio: reference for tracing', 1]],
}));
const PE = [
  { dr: [['Purchases A/c', 32000]], cr: [['Sahil Appliances A/c', 32000]], note: 'Being a refrigerator bought on credit' },
  { dr: [['Office Equipment A/c', 32000]], cr: [['Sahil Appliances A/c', 32000]], note: 'Being a refrigerator for the staff room bought on credit' },
];
same(journal(PE.slice(0, 1)).total, journal(PE.slice(1)).total, 's2_entry_error totals');
QQ('s2_entry_error', short({
  t: 3, d: 4, c: 'analysis', marks: 2,
  stem: 'Pawan Electricals, an imagined shop, bought a refrigerator for its staff room for ₹32,000 on credit from Sahil Appliances and passed this entry: Purchases A/c Dr. ₹32,000, To Sahil Appliances A/c ₹32,000. Find the error and give the correct entry.',
  model: `The refrigerator is meant for use in the business, not for resale, so it is an asset and not a purchase of goods. Debiting Purchases A/c wrongly adds it to the cost of goods and understates the assets.\n\n${journal(PE.slice(1)).md}`,
  sol: 'Asset wrongly treated as purchases; correct entry debits an asset account.',
  scheme: [['Error: an asset treated as purchases of goods', 1], ['Correct entry debiting Office Equipment A/c', 1]],
}));

// ================================================================ short answer, 3 marks
const GS = [
  { date: '1 May', dr: [['Cash A/c', 80000]], cr: [['Capital A/c', 80000]], note: 'Being business started with cash' },
  { date: '4 May', dr: [['Furniture A/c', 18000]], cr: [['Cash A/c', 18000]], note: 'Being furniture bought for cash' },
  { date: '9 May', dr: [['Purchases A/c', 25000]], cr: [['Dinesh Dairy A/c', 25000]], note: 'Being goods bought on credit from Dinesh Dairy' },
  { date: '13 May', dr: [['Wages A/c', 3500]], cr: [['Cash A/c', 3500]], note: 'Being wages paid in cash' },
];
const GSj = journal(GS);
same(GSj.total, 126500, 's3_journal4 total');
QQ('s3_journal4', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Journalise the following transactions of Ganga Sweets, an imagined shop, with narrations. 1 May: started business with cash of ₹80,000. 4 May: bought furniture for ₹18,000, paying cash. 9 May: bought goods worth ₹25,000 on credit from Dinesh Dairy. 13 May: paid wages of ₹3,500 in cash.',
  model: `${GSj.md}`,
  sol: 'Debit the account that gains or the expense, credit the account that gives or the income.',
  scheme: [['Entries of 1 and 4 May', 1], ['Entry of 9 May', 1], ['Entry of 13 May and narrations', 1]],
}));
const E3 = equation({
  start: { assets: { Cash: 100000 }, liabilities: {}, capital: 100000 },
  steps: [
    { what: '(i) Goods bought on credit ₹30,000', assets: { Stock: 30000 }, liabilities: { Creditors: 30000 } },
    { what: '(ii) Goods costing ₹12,000 sold for ₹15,000 cash', assets: { Cash: 15000, Stock: -12000 }, capital: 3000 },
    { what: '(iii) Salary paid ₹4,000', assets: { Cash: -4000 }, capital: -4000 },
  ],
});
same(E3.final.capital, 99000, 's3_eq3 capital');
same(sum(Object.values(E3.final.assets)), 129000, 's3_eq3 assets');
QQ('s3_eq3', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Isha Cycles, an imagined firm, starts with cash of ₹1,00,000 as capital. Show the accounting equation after each of these transactions: (i) goods bought on credit for ₹30,000; (ii) goods costing ₹12,000 sold for ₹15,000 in cash; (iii) salary of ₹4,000 paid in cash.',
  model: `${E3.md}\n\nAfter (iii): assets ${rs(sum(Object.values(E3.final.assets)))} = creditors ${rs(E3.final.liabilities.Creditors)} + capital ${rs(E3.final.capital)}.`,
  sol: 'Each transaction changes two items by equal amounts.',
  scheme: [['Transaction (i)', 1], ['Transaction (ii) with profit in capital', 1], ['Transaction (iii)', 1]],
}));
const LS = { buy: 40000, sell: 55000, rate: 12 };
LS.bg = gst(LS.buy, LS.rate);
LS.sg = gst(LS.sell, LS.rate);
const LSe = [
  { date: '6 Jun', dr: [['Purchases A/c', LS.buy], ['Input CGST A/c', LS.bg.cgst], ['Input SGST A/c', LS.bg.sgst]], cr: [['Lalit Suppliers A/c', LS.buy + LS.bg.tax]], note: 'Being goods bought on credit from Lalit Suppliers, tax at an imagined 12%' },
  { date: '18 Jun', dr: [['Mehra Brothers A/c', LS.sell + LS.sg.tax]], cr: [['Sales A/c', LS.sell], ['Output CGST A/c', LS.sg.cgst], ['Output SGST A/c', LS.sg.sgst]], note: 'Being goods sold on credit to Mehra Brothers, tax charged' },
];
const LSj = journal(LSe);
same(LS.bg.cgst, 2400, 's3_gst input CGST');
same(LS.sg.cgst, 3300, 's3_gst output CGST');
same(LSj.total, 44800 + 61600, 's3_gst total');
QQ('s3_gst_entry', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Journalise these transactions of an imagined firm in its own state. Goods and services tax is charged at an imagined rate of 12%, split equally into CGST and SGST. (i) 6 June: bought goods worth ₹40,000 on credit from Lalit Suppliers. (ii) 18 June: sold goods worth ₹55,000 on credit to Mehra Brothers.',
  model: `${LSj.md}\n\nInput tax is debited on the purchase because it is credit that will be set off; output tax is credited on the sale because it is owed to the government.`,
  sol: 'Tax on a purchase is debited to input accounts; tax on a sale is credited to output accounts.',
  scheme: [['Purchase entry with input CGST and input SGST', 1], ['Sale entry with output CGST and output SGST', 1], ['Correct totals and narrations', 1]],
}));
const QB = [
  { date: '2 Jul', dr: [['Cash A/c', 70000]], cr: [['Capital A/c', 70000]], note: 'Being cash introduced' },
  { date: '8 Jul', dr: [['Cash A/c', 22000]], cr: [['Sales A/c', 22000]], note: 'Being goods sold for cash' },
  { date: '15 Jul', dr: [['Rent A/c', 6000]], cr: [['Cash A/c', 6000]], note: 'Being rent paid' },
  { date: '21 Jul', dr: [['Basant Paper Co. A/c', 15000]], cr: [['Cash A/c', 15000]], note: 'Being cash paid to Basant Paper Co.' },
];
const QBp = post(QB);
same(QBp['Cash A/c'].balance, 71000, 's3_ledger4 cash balance');
QQ('s3_ledger4', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'The journal of Qureshi Books, an imagined shop, contains these entries for July 2027: cash introduced ₹70,000; goods sold for cash ₹22,000; rent paid ₹6,000; cash paid to Basant Paper Co. ₹15,000. Post the entries to the Cash A/c and balance it.',
  model: `${QBp['Cash A/c'].md}\n\nDebit total ${inr(70000 + 22000)}, credit total ${inr(6000 + 15000)} before balancing; the debit balance ${rs(QBp['Cash A/c'].balance)} is carried down and brought down on 1 August.`,
  sol: 'Debits on the left with To, credits on the right with By, then the balance.',
  scheme: [['Debit side entries', 1], ['Credit side entries', 1], [`Balance c/d ${rs(QBp['Cash A/c'].balance)} and totals`, 1]],
}));
QQ('s3_jl_diff', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between the journal and the ledger on three points.',
  model: '1. **Nature:** the journal is the book of original entry; the ledger is the book of final entry.\n2. **Order:** the journal records transactions in date order; the ledger groups them account by account.\n3. **Process:** entries are first made in the journal; the ledger is prepared by posting from the journal.',
  sol: 'Any three points of difference.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
const HV = { sal: 9000, rent: 6000, elec: 2500 };
HV.total = HV.sal + HV.rent + HV.elec;
const HVe = [{ date: '30 Apr', dr: [['Salaries A/c', HV.sal], ['Rent A/c', HV.rent], ['Electricity A/c', HV.elec]], cr: [['Cash A/c', HV.total]], note: 'Being salaries, rent and electricity paid in cash' }];
same(journal(HVe).total, 17500, 's3_compound total');
QQ('s3_compound', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'On 30 April 2027, Hira Stores, an imagined shop, paid salaries of ₹9,000, rent of ₹6,000 and electricity charges of ₹2,500 together in cash. Pass a single compound journal entry with narration and state one advantage of a compound entry.',
  model: `${journal(HVe).md}\n\nAdvantage: several accounts are recorded in one entry, saving time and space, and the debit and credit totals still agree at ${rs(HV.total)}.`,
  sol: 'Three expense accounts debited, cash credited with the total.',
  scheme: [['Three debits correctly', 1], ['Credit to Cash A/c for the total, with narration', 1], ['Advantage of a compound entry', 1]],
}));
const VP = { amount: 4500 };
QQ('s3_voucher', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `On 12 May 2027, Ila Printing, an imagined firm, paid ${rs(VP.amount)} in cash to Mr Jain for stationery used in its office, and holds his receipt. Prepare the voucher, stating its type, date, accounts and narration.`,
  model: `${mdTable(['Item', 'Details'], [['Voucher type', 'Debit voucher (cash payment)'], ['Date', '12 May 2027'], ['Account debited', `Stationery A/c: ${rs(VP.amount)}`], ['Account credited', `Cash A/c: ${rs(VP.amount)}`], ['Narration', 'Stationery bought for office use from Mr Jain, his receipt attached'], ['Signatures', 'Prepared, checked and authorised']])}`,
  sol: 'Cash was paid, so a debit voucher is made, debiting the expense and crediting cash.',
  scheme: [['Voucher type, number space and date', 1], ['Accounts debited and credited with the amount', 1], ['Narration and signatures', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_docs', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the following source documents of an imagined business, stating what each shows: cash memo, invoice, receipt, pay-in-slip, cheque, debit note and credit note.',
  model: '1. **Cash memo:** made for a cash sale; shows goods, quantity, price and the amount paid.\n2. **Invoice:** sent by the seller for a credit sale; shows goods, rate, tax and the amount due.\n3. **Receipt:** proof that money was received; shows the amount, date and payer.\n4. **Pay-in-slip:** bank form for deposits; shows the amount and the account paid into.\n5. **Cheque:** written order to a bank to pay a sum to a named payee.\n6. **Debit note:** sent by a buyer returning goods; shows the amount debited to the seller.\n7. **Credit note:** sent by a seller; shows the amount credited to the buyer.',
  sol: 'Each document, with what it shows, in a numbered list.',
  scheme: [['Cash memo and invoice', 1], ['Receipt and pay-in-slip', 1], ['Cheque', 1], ['Debit note', 1], ['Credit note', 1]],
}));
const LJ = [
  { date: '1 Jun', dr: [['Cash A/c', 100000]], cr: [['Capital A/c', 100000]], note: 'Being business started with cash' },
  { date: '3 Jun', dr: [['Purchases A/c', 40000]], cr: [['Alok Traders A/c', 40000]], note: 'Being goods bought on credit from Alok Traders' },
  { date: '6 Jun', dr: [['Cash A/c', 30000]], cr: [['Sales A/c', 30000]], note: 'Being goods sold for cash' },
  { date: '10 Jun', dr: [['Alok Traders A/c', 25000]], cr: [['Cash A/c', 25000]], note: 'Being cash paid to Alok Traders' },
  { date: '14 Jun', dr: [['Bina Gupta A/c', 20000]], cr: [['Sales A/c', 20000]], note: 'Being goods sold on credit to Bina Gupta' },
  { date: '18 Jun', dr: [['Cash A/c', 12000]], cr: [['Bina Gupta A/c', 12000]], note: 'Being cash received from Bina Gupta' },
  { date: '22 Jun', dr: [['Salaries A/c', 8000]], cr: [['Cash A/c', 8000]], note: 'Being salaries paid' },
  { date: '27 Jun', dr: [['Drawings A/c', 4000]], cr: [['Cash A/c', 4000]], note: 'Being cash withdrawn by the proprietor' },
];
const LJp = post(LJ);
same(LJp['Cash A/c'].balance, 105000, 'l5_ledger cash');
same(LJp['Alok Traders A/c'].balance, -15000, 'l5_ledger Alok');
same(LJp['Bina Gupta A/c'].balance, 8000, 'l5_ledger Bina');
QQ('l5_ledger', long({
  t: 4, d: 3, c: 'application', marks: 5,
  stem: 'Tilak Bookstore, an imagined shop, recorded these entries in its journal in June 2027. (1 Jun) Cash A/c Dr. ₹1,00,000, To Capital A/c. (3 Jun) Purchases A/c Dr. ₹40,000, To Alok Traders A/c. (6 Jun) Cash A/c Dr. ₹30,000, To Sales A/c. (10 Jun) Alok Traders A/c Dr. ₹25,000, To Cash A/c. (14 Jun) Bina Gupta A/c Dr. ₹20,000, To Sales A/c. (18 Jun) Cash A/c Dr. ₹12,000, To Bina Gupta A/c. (22 Jun) Salaries A/c Dr. ₹8,000, To Cash A/c. (27 Jun) Drawings A/c Dr. ₹4,000, To Cash A/c. Post the entries to the accounts of Cash, Alok Traders and Bina Gupta, and balance them.',
  model: `**Cash A/c**\n\n${LJp['Cash A/c'].md}\n\n**Alok Traders A/c**\n\n${LJp['Alok Traders A/c'].md}\n\n**Bina Gupta A/c**\n\n${LJp['Bina Gupta A/c'].md}\n\nCash has a debit balance of ${rs(LJp['Cash A/c'].balance)} (an asset); Alok Traders a credit balance of ${rs(-LJp['Alok Traders A/c'].balance)} (owed by the firm); Bina Gupta a debit balance of ${rs(LJp['Bina Gupta A/c'].balance)} (owed to the firm). Each balance is brought down on 1 July.`,
  sol: 'Post each debit with To and each credit with By, total both sides and carry the difference down.',
  scheme: [['Cash A/c: debit side', 1], ['Cash A/c: credit side and balance c/d', 1], ['Alok Traders A/c with credit balance', 1], ['Bina Gupta A/c with debit balance', 1], ['Totals agree and balances brought down', 1]],
}));
const TJ = [
  { date: '1 Jun', dr: [['Cash A/c', 150000], ['Furniture A/c', 30000]], cr: [['Capital A/c', 180000]], note: 'Being business started with cash and furniture' },
  { date: '2 Jun', dr: [['Purchases A/c', 40000]], cr: [['Cash A/c', 40000]], note: 'Being goods bought for cash' },
  { date: '4 Jun', dr: [['Purchases A/c', 55000]], cr: [['Parth Wholesalers A/c', 55000]], note: 'Being goods bought on credit from Parth Wholesalers' },
  { date: '7 Jun', dr: [['Cash A/c', 36000]], cr: [['Sales A/c', 36000]], note: 'Being goods sold for cash' },
  { date: '9 Jun', dr: [['Rina Dutta A/c', 28000]], cr: [['Sales A/c', 28000]], note: 'Being goods sold on credit to Rina Dutta' },
  { date: '12 Jun', dr: [['Rent A/c', 9000]], cr: [['Cash A/c', 9000]], note: 'Being rent paid' },
  { date: '15 Jun', dr: [['Parth Wholesalers A/c', 30000]], cr: [['Cash A/c', 30000]], note: 'Being part payment made to Parth Wholesalers' },
  { date: '20 Jun', dr: [['Cash A/c', 18000]], cr: [['Rina Dutta A/c', 18000]], note: 'Being cash received from Rina Dutta' },
  { date: '25 Jun', dr: [['Salaries A/c', 14000]], cr: [['Cash A/c', 14000]], note: 'Being salaries paid' },
  { date: '29 Jun', dr: [['Drawings A/c', 6000]], cr: [['Cash A/c', 6000]], note: 'Being cash withdrawn by the proprietor for personal use' },
];
const TJj = journal(TJ);
same(TJj.total, 180000 + 40000 + 55000 + 36000 + 28000 + 9000 + 30000 + 18000 + 14000 + 6000, 'l5_journal10 total');
QQ('l5_journal10', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'Journalise the following transactions of Tulsi Garments, an imagined shop, for June 2027, with narrations. 1 Jun: started business with cash ₹1,50,000 and furniture ₹30,000. 2 Jun: bought goods for cash ₹40,000. 4 Jun: bought goods on credit from Parth Wholesalers ₹55,000. 7 Jun: sold goods for cash ₹36,000. 9 Jun: sold goods on credit to Rina Dutta ₹28,000. 12 Jun: paid rent ₹9,000. 15 Jun: paid ₹30,000 to Parth Wholesalers. 20 Jun: received ₹18,000 from Rina Dutta. 25 Jun: paid salaries ₹14,000. 29 Jun: the proprietor withdrew ₹6,000 in cash for personal use.',
  model: `${TJj.md}\n\nThe debit and credit totals agree at ${rs(TJj.total)}.`,
  sol: 'Each transaction gives one entry; the opening transaction is a compound entry with two debits.',
  scheme: [['Entries of 1 and 2 June', 1], ['Entries of 4 and 7 June', 1], ['Entries of 9 and 12 June', 1], ['Entries of 15 and 20 June', 1], ['Entries of 25 and 29 June, narrations and totals', 1]],
}));
const JM = equation({
  steps: [
    { what: '1 Capital introduced', assets: { Cash: 200000 }, capital: 200000 },
    { what: '2 Furniture bought for cash', assets: { Cash: -40000, Furniture: 40000 } },
    { what: '3 Medicines bought on credit', assets: { Stock: 60000 }, liabilities: { Creditors: 60000 } },
    { what: '4 Medicines sold for cash at a profit', assets: { Cash: 31000, Stock: -25000 }, capital: 6000 },
    { what: '5 Rent paid', assets: { Cash: -5000 }, capital: -5000 },
    { what: '6 Bank loan received', assets: { Cash: 30000 }, liabilities: { 'Bank loan': 30000 } },
    { what: '7 Creditor paid', assets: { Cash: -20000 }, liabilities: { Creditors: -20000 } },
    { what: '8 Drawings', assets: { Cash: -6000 }, capital: -6000 },
  ],
});
same(JM.final.assets.Cash, 190000, 'l5_equation8 cash');
same(JM.final.capital, 195000, 'l5_equation8 capital');
same(sum(Object.values(JM.final.assets)), 265000, 'l5_equation8 assets');
QQ('l5_equation8', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Jaya Medical Store, an imagined shop, had these transactions in May 2027. Show their effect on the accounting equation after each transaction. (1) The proprietor brought ₹2,00,000 in cash. (2) Furniture of ₹40,000 was bought for cash. (3) Medicines worth ₹60,000 were bought on credit. (4) Medicines costing ₹25,000 were sold for ₹31,000 in cash. (5) Rent of ₹5,000 was paid. (6) A bank loan of ₹30,000 was received in cash. (7) ₹20,000 was paid to a creditor. (8) The proprietor withdrew ₹6,000 in cash.',
  model: `${JM.md}\n\nAt the end, assets of ${rs(sum(Object.values(JM.final.assets)))} equal creditors ${rs(JM.final.liabilities.Creditors)} plus bank loan ${rs(JM.final.liabilities['Bank loan'])} plus capital ${rs(JM.final.capital)}.`,
  sol: 'Each line changes two items by equal amounts; profit and expenses change capital.',
  scheme: [['Transactions 1 and 2', 1], ['Transactions 3 and 4 with profit of ₹6,000 in capital', 1], ['Transactions 5 and 6', 1], ['Transactions 7 and 8', 1], ['Equation balanced at every step and final totals', 1]],
}));
QQ('l5_rules', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the rules of debit and credit by the accounting equation approach for assets, liabilities, capital, drawings, expenses and revenues, and name the traditional approach in one line.',
  model: '1. **Assets:** an increase is debited and a decrease credited.\n2. **Liabilities and capital:** an increase is credited and a decrease debited.\n3. **Drawings:** these reduce capital, so an increase is debited.\n4. **Expenses and losses:** they reduce capital, so an increase is debited.\n5. **Revenues and gains:** they increase capital, so an increase is credited.\n\nThe traditional approach instead classifies accounts as personal, real and nominal, each with its own rule.',
  sol: 'Rules for the six kinds of account, each with its reason.',
  scheme: [['Assets', 1], ['Liabilities and capital', 1], ['Drawings', 1], ['Expenses and revenues', 1], ['Traditional approach named', 1]],
}));
const GE = { buy: 80000, cashSale: 100000, creditSale: 50000, rate: 12 };
GE.bg = gst(GE.buy, GE.rate);
GE.s1 = gst(GE.cashSale, GE.rate);
GE.s2 = gst(GE.creditSale, GE.rate);
const GEe = [
  { date: '5 Aug', dr: [['Purchases A/c', GE.buy], ['Input CGST A/c', GE.bg.cgst], ['Input SGST A/c', GE.bg.sgst]], cr: [['Hemant and Company A/c', GE.buy + GE.bg.tax]], note: 'Being goods bought on credit, tax at an imagined 12%' },
  { date: '12 Aug', dr: [['Cash A/c', GE.cashSale + GE.s1.tax]], cr: [['Sales A/c', GE.cashSale], ['Output CGST A/c', GE.s1.cgst], ['Output SGST A/c', GE.s1.sgst]], note: 'Being goods sold for cash, tax collected' },
  { date: '20 Aug', dr: [['Imran Brothers A/c', GE.creditSale + GE.s2.tax]], cr: [['Sales A/c', GE.creditSale], ['Output CGST A/c', GE.s2.cgst], ['Output SGST A/c', GE.s2.sgst]], note: 'Being goods sold on credit to Imran Brothers, tax charged' },
];
const GEj = journal(GEe);
const GEp = post(GEe);
const GEnetC = -GEp['Output CGST A/c'].balance - GEp['Input CGST A/c'].balance;
const GEnetS = -GEp['Output SGST A/c'].balance - GEp['Input SGST A/c'].balance;
same(GEnetC, 4200, 'l5_gst net CGST');
same(GEnetS, 4200, 'l5_gst net SGST');
check(GEnetC + GEnetS === 8400, 'l5_gst net tax');
QQ('l5_gst', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Gopal Electricals, an imagined firm in Indore, deals within Madhya Pradesh. Goods and services tax is charged at an imagined rate of ${GE.rate}% on every supply and splits equally into CGST and SGST. In August 2027: (5 Aug) it bought goods worth ${rs(GE.buy)} on credit from Hemant and Company; (12 Aug) it sold goods worth ${rs(GE.cashSale)} for cash; (20 Aug) it sold goods worth ${rs(GE.creditSale)} on credit to Imran Brothers. Journalise the transactions and find the net CGST and SGST payable for the month.`,
  model: `${GEj.md}\n\nOutput CGST = ${inr(GE.s1.cgst)} + ${inr(GE.s2.cgst)} = ${rs(-GEp['Output CGST A/c'].balance)}; input CGST = ${rs(GEp['Input CGST A/c'].balance)}. Net CGST payable = ${inr(-GEp['Output CGST A/c'].balance)} − ${inr(GEp['Input CGST A/c'].balance)} = **${rs(GEnetC)}**. SGST works out the same: **${rs(GEnetS)}**, so ${rs(GEnetC + GEnetS)} is payable in all.`,
  sol: 'Input tax is debited on the purchase; output tax is credited on each sale; set off like against like.',
  scheme: [['Purchase entry with input taxes', 1], ['Cash sale entry with output taxes', 1], ['Credit sale entry with output taxes', 1], [`Net CGST payable ${rs(GEnetC)}`, 1], [`Net SGST payable ${rs(GEnetS)}`, 1]],
}));

// ================================================================ error analysis, 3 marks
const WE = [
  { dr: [['Furniture A/c', 20000]], cr: [['Ojas Furnishers A/c', 20000]], note: 'Being furniture bought on credit from Ojas Furnishers' },
  { dr: [['Sandeep Agencies A/c', 10000]], cr: [['Cash A/c', 10000]], note: 'Being cash paid to Sandeep Agencies' },
  { dr: [['Salaries A/c', 8000]], cr: [['Cash A/c', 8000]], note: 'Being salary paid to the clerk' },
];
const WEj = journal(WE);
same(WEj.total, 38000, 's3_entry_errors total');
QQ('s3_entry_errors', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: 'The accountant of Sunita Agencies, an imagined firm, passed three entries in August 2027. (i) Furniture bought on credit from Ojas Furnishers for ₹20,000: Purchases A/c Dr. ₹20,000, To Ojas Furnishers A/c. (ii) Cash of ₹10,000 paid to Sandeep Agencies, a creditor: Cash A/c Dr. ₹10,000, To Sandeep Agencies A/c. (iii) Salary of ₹8,000 paid in cash to the clerk: Drawings A/c Dr. ₹8,000, To Cash A/c. Find the error in each entry and write the correct entry.',
  model: `1. **Entry (i):** the furniture is an asset kept for use, not goods bought for resale, so Purchases A/c is the wrong debit.\n2. **Entry (ii):** the debit and credit are reversed; cash is paid out, so the creditor is debited and cash is credited.\n3. **Entry (iii):** salary is an expense of the business, not a withdrawal by the proprietor, so Drawings A/c is the wrong debit.\n\nCorrect entries:\n\n${WEj.md}`,
  sol: 'An asset treated as purchases; the sides reversed; an expense treated as drawings.',
  scheme: [['Error and correct entry for (i)', 1], ['Error and correct entry for (ii)', 1], ['Error and correct entry for (iii)', 1]],
}));
