// t02: purchases, sales and returns books (trade discount, GST at an imagined rate stated in each problem) and the
// journal proper. Every firm and person is imagined; every derived amount is computed with books.mjs and asserted.
import { mcq, ar, match, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, inr, rs, mdTable, journal, gst, tradeBook, T } from './figures.mjs';
import { QQ, numQ, S2, L5 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_pb_what', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The purchases book of an imagined trading firm records',
  opts: ['credit purchases of goods in which the firm deals', 'all purchases of goods and assets, for cash or on credit', 'only cash purchases of goods', 'credit purchases of furniture and machinery'],
  sol: 'The purchases (journal) book is for credit purchases of goods meant for resale. A cash purchase belongs in the cash book, and an asset bought on credit belongs in the journal proper.',
}));
QQ('m_pb_cash', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Which of these transactions of Zoya Electronics, an imagined shop, is entered in its purchases book?`,
  opts: [`Goods bought on credit from Sharma Traders for ${rs(24000)}`, `Goods bought for cash for ${rs(24000)}`, `A computer for the office bought on credit for ${rs(24000)}`, `Goods worth ${rs(4000)} returned to Sharma Traders`],
  sol: 'Only a credit purchase of goods belongs in the purchases book. The cash purchase goes to the cash book, the computer to the journal proper, and the return to the purchases return book.',
}));
{
  const b = tradeBook({ kind: 'purchases', entries: [T('Jul 4', 'P-7', 'Supplier', 24000, 10)] });
  same(b.totals.net, 21600, 'm_td_pb');
  QQ('m_td_pb', mcq({
    t: 2, d: 2, c: 'application',
    stem: `Hira Cycles, an imagined shop, receives an invoice for goods bought on credit with a list price of ${rs(24000)} and a trade discount of 10%. The amount entered in its purchases book is`,
    opts: [rs(b.totals.net), rs(24000), rs(b.totals.td), rs(24000 + b.totals.td)],
    sol: `Only the net amount is recorded: ${inr(24000)} − ${inr(b.totals.td)} = ${rs(b.totals.net)}. ${rs(24000)} ignores the discount, ${rs(b.totals.td)} is the discount itself, and ${rs(24000 + b.totals.td)} wrongly adds it.`,
  }));
}
QQ('m_td_nature', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Trade discount, as it appears on an invoice, is',
  opts: ['a reduction in the list price given by the seller, so it is not recorded separately in the books', 'a discount for early payment, recorded in the books as an expense', 'a gain of the buyer shown in the profit and loss account', 'a discount recorded in a separate column of the cash book'],
  sol: 'Trade discount is deducted on the invoice itself, and only the net amount is entered. Discount for early payment is cash discount, which is recorded in the books.',
}));
QQ('m_sb_which', mcq({
  t: 2, d: 2, c: 'application',
  stem: `On 9 July 2026 Gaurav Sports, an imagined firm, sold its old computer on credit to a neighbour for ${rs(16000)}. The sale is recorded in the`,
  opts: ['journal proper', 'sales book', 'cash book', 'purchases return book'],
  sol: 'The computer is an asset, not goods in which the firm deals, so the credit sale does not go to the sales book. It is not a cash transaction and not a return, so it is recorded in the journal proper.',
}));
QQ('m_dn', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Jolly Garments, an imagined firm, returns defective goods to its supplier and sends a note saying that the supplier is being debited. This note is a',
  opts: ['debit note, recorded in the purchases return book', 'credit note, recorded in the purchases return book', 'debit note, recorded in the sales return book', 'credit note, recorded in the sales return book'],
  sol: 'The buyer who returns goods debits the supplier and informs him by a debit note; the return is recorded in the purchases return book. A credit note is issued by a seller to a customer who returns goods.',
}));
QQ('m_cn', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A seller who takes back goods from a customer informs the customer that his account has been credited. The document used is',
  opts: ['a credit note, recorded in the sales return book', 'a debit note, recorded in the sales return book', 'a credit note, recorded in the purchases return book', 'an invoice, recorded in the sales book'],
  sol: 'The seller credits the customer on a credit note, and the entry goes to the sales return book. A debit note is raised by a buyer, and an invoice is the bill for a sale, not a return.',
}));
QQ('m_igst_col', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Surya Traders, an imagined firm, buys goods on credit from a supplier in another state. In its purchases book with tax columns the tax on this invoice is shown in the',
  opts: ['IGST column', 'CGST column only', 'SGST column only', 'CGST and SGST columns in equal parts'],
  sol: 'A supply from another state carries integrated tax only. Central and state tax in equal parts apply to a supply within one state (as of 2024).',
}));
QQ('m_jp_which', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The owner of an imagined shop takes goods costing ${rs(6500)} home for personal use. The journal proper entry is`,
  opts: ['Drawings A/c Dr, To Purchases A/c', 'Purchases A/c Dr, To Drawings A/c', 'Drawings A/c Dr, To Sales A/c', 'Capital A/c Dr, To Cash A/c'],
  sol: 'Goods taken by the owner are drawings, so Drawings is debited and the goods account (Purchases) is credited at cost. The reverse entry would increase purchases, and sales is not involved since nothing is sold.',
}));
QQ('m_fire', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Goods costing ${rs(18000)} of an imagined shop are destroyed by fire and there is no insurance claim. The journal proper entry is`,
  opts: ['Loss by Fire A/c Dr, To Purchases A/c', 'Purchases A/c Dr, To Loss by Fire A/c', 'Loss by Fire A/c Dr, To Cash A/c', 'Stock A/c Dr, To Loss by Fire A/c'],
  sol: 'The loss is debited and the goods account is credited because the goods have left the business without being sold. No cash is paid, and the stock would not be debited for a loss.',
}));
QQ('m_rect', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A trader paid ${rs(12000)} for a typewriter for the office and debited it to Purchases A/c by mistake. The rectifying entry is`,
  opts: ['Office Equipment A/c Dr, To Purchases A/c', 'Purchases A/c Dr, To Office Equipment A/c', 'Office Equipment A/c Dr, To Cash A/c', 'No entry, because the trial balance still agrees'],
  sol: 'The typewriter is an asset, so it should be debited to Office Equipment and the wrong debit to Purchases removed by a credit. Debiting Purchases again repeats the error, and crediting cash again would count the payment twice. The trial balance agrees but the accounts are still wrong.',
}));
QQ('m_lf', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the purchases book the L.F. column is used to show',
  opts: ['the page of the ledger on which the amount has been posted', 'the list price of the goods', 'the date of the invoice', 'the rate of trade discount'],
  sol: 'L.F. means ledger folio: it records the ledger page of the supplier account after posting, so that the entry can be traced. List price, date and the discount rate are shown elsewhere.',
}));

// ================================================================ assertion-reason, match
QQ('ar_pb_discount', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The purchases book records goods at the amount left after trade discount.',
  r: 'Trade discount is allowed by a seller to a buyer for paying the invoice before the due date.',
  sol: 'A is true: only the net amount is recorded. R is false: a discount for early payment is cash discount; trade discount is a reduction in list price given at the time of sale, for example for bulk buying.',
}));
QQ('ar_sale_asset', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A credit sale of an old machine is not entered in the sales book.',
  r: 'The sales book records only credit sales of goods in which the firm deals.',
  sol: 'Both are true and R is the reason for A. The machine is an asset, not goods meant for sale in the ordinary course, so its sale goes to the journal proper.',
}));
QQ('mt_docs', match({
  t: 2, d: 1, c: 'recall',
  stem: 'Match each source document in column A with the book in which it is first recorded in column B.',
  pairs: [
    ['Invoice received for goods bought on credit', 'Purchases book'],
    ['Invoice issued for goods sold on credit', 'Sales book'],
    ['Debit note issued to a supplier', 'Purchases return book'],
    ['Credit note issued to a customer', 'Sales return book'],
  ],
  sol: 'Each source document goes to the book for that kind of transaction: purchase invoices to the purchases book, sale invoices to the sales book, debit notes to the purchases return book and credit notes to the sales return book.',
}));

// ================================================================ numerical
{
  const b = tradeBook({ kind: 'purchases', rate: 12, entries: [T('Jun 6', 'P-31', 'Gita Garments', 36000, 15)] });
  same(b.totals.net, 30600, 'n_pb_net');
  QQ('n_pb_net', numQ({
    t: 2, d: 3, c: 'application', value: b.totals.net, unit: '₹',
    stem: `Gita Garments, an imagined supplier, sent Ojas Fashions, an imagined firm, an invoice on 6 June 2026 for goods with a list price of ${rs(36000)}, a trade discount of 15%, and goods and services tax at an imagined rate of 12% on the discounted price. Find the net amount of goods entered in the goods column of the purchases book of Ojas Fashions (in ₹).`,
    sol: `Trade discount = ${inr(36000)} × 15/100 = ${inr(b.totals.td)}; net amount = ${inr(36000)} − ${inr(b.totals.td)} = ${rs(b.totals.net)}. The tax of ${inr(b.totals.tax)} goes to the input tax columns and the invoice total is ${inr(b.totals.total)}.`,
  }));
}
{
  const b = tradeBook({
    kind: 'sales', rate: 12,
    entries: [T('Sep 4', 'S-14', 'Anand Paints', 50000, 10), T('Sep 13', 'S-15', 'Bina Colours', 30000, 5), T('Sep 22', 'S-16', 'Chetan Hardware', 20000, 0)],
  });
  same(b.totals.cgst, 5610, 'n_sb_cgst');
  QQ('n_sb_cgst', numQ({
    t: 2, d: 3, c: 'application', value: b.totals.cgst, unit: '₹',
    stem: `Ujjwal Paints, an imagined firm, made three credit sales within its own state in September 2026: to Anand Paints, list price ${rs(50000)}, trade discount 10%; to Bina Colours, list price ${rs(30000)}, trade discount 5%; to Chetan Hardware, list price ${rs(20000)}, no trade discount. Goods and services tax is charged at an imagined rate of 12% on the price after trade discount. Find the total of the CGST column of its sales book (in ₹).`,
    sol: `Net amounts: ${inr(b.entries[0].net)}, ${inr(b.entries[1].net)} and ${inr(b.entries[2].net)}. Tax at 12% is ${inr(b.entries[0].tax)}, ${inr(b.entries[1].tax)} and ${inr(b.entries[2].tax)}; CGST is half of each, ${inr(b.entries[0].cgst)} + ${inr(b.entries[1].cgst)} + ${inr(b.entries[2].cgst)} = ${rs(b.totals.cgst)}.`,
  }));
}
{
  const b = tradeBook({ kind: 'purchaseReturns', rate: 18, entries: [T('Dec 8', 'DN-9', 'Rana Hardware', 25000, 20)] });
  same(b.totals.total, 23600, 'n_pr_total');
  QQ('n_pr_total', numQ({
    t: 2, d: 3, c: 'application', value: b.totals.total, unit: '₹',
    stem: `Pushpa Stores, an imagined firm, buys from Rana Hardware, an imagined supplier in the same state, at a trade discount of 20% with goods and services tax at an imagined rate of 18% on the discounted price. On 8 December 2026 it returns goods of list price ${rs(25000)} and issues a debit note. Find the total amount of the debit note, tax included (in ₹).`,
    sol: `Net value of the goods = ${inr(25000)} − ${inr(b.totals.td)} = ${inr(b.totals.net)}. Tax reversed at 18% = ${inr(b.totals.tax)} (CGST ${inr(b.totals.cgst)} and SGST ${inr(b.totals.sgst)}). Debit note = ${inr(b.totals.net)} + ${inr(b.totals.tax)} = ${rs(b.totals.total)}.`,
  }));
}
{
  const pur = gst(80000, 12), pr = gst(10000, 12), sal = gst(150000, 12), sr = gst(20000, 12);
  const input = pur.tax - pr.tax, output = sal.tax - sr.tax;
  same(input, 8400, 'n_gst_pay input');
  same(output, 15600, 'n_gst_pay output');
  same(output - input, 7200, 'n_gst_pay');
  QQ('n_gst_pay', numQ({
    t: 2, d: 4, c: 'application', value: output - input, unit: '₹',
    stem: `In October 2026 Madan Tools, an imagined firm, had credit purchases of ${rs(80000)}, goods returned to suppliers of ${rs(10000)}, credit sales of ${rs(150000)} and goods returned by customers of ${rs(20000)}, all amounts net of trade discount and all within its own state. Goods and services tax is charged at an imagined rate of 12%. Find the total tax (CGST and SGST together) payable for the month after input tax credit (in ₹).`,
    sol: `Input tax = (${inr(80000)} − ${inr(10000)}) × 12% = ${inr(input)}. Output tax = (${inr(150000)} − ${inr(20000)}) × 12% = ${inr(output)}. Payable = ${inr(output)} − ${inr(input)} = ${rs(output - input)}.`,
  }));
}
{
  const assets = [14000, 52000, 36000, 28000], liabs = [24000, 40000];
  const cap = sum(assets) - sum(liabs);
  same(cap, 66000, 'n_open_cap');
  QQ('n_open_cap', numQ({
    t: 2, d: 2, c: 'application', value: cap, unit: '₹',
    stem: `On 1 April 2027 Sana Bookstore, an imagined shop, had cash ${rs(14000)}, stock ${rs(52000)}, furniture ${rs(36000)} and debtors ${rs(28000)}; it owed creditors ${rs(24000)} and a bank loan of ${rs(40000)}. In the opening entry in the journal proper, the credit to Capital A/c is (in ₹):`,
    sol: `Assets = ${inr(14000)} + ${inr(52000)} + ${inr(36000)} + ${inr(28000)} = ${inr(sum(assets))}. Liabilities = ${inr(24000)} + ${inr(40000)} = ${inr(sum(liabs))}. Capital = ${inr(sum(assets))} − ${inr(sum(liabs))} = ${rs(cap)}, the balancing figure that makes the entry agree.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_pb_only', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Gaurav Furnishers, an imagined firm, buys a machine on credit for ${rs(60000)} from Alpha Engineers. Why is this not entered in the purchases book, and where is it recorded?`,
  model: 'The purchases book is only for **credit purchases of goods** in which the firm deals. A machine is an asset for use in the business, not goods for resale. It is recorded in the **journal proper**: Machinery A/c Dr, To Alpha Engineers.',
  sol: 'Asset, not goods; journal proper.',
  scheme: [['Reason: purchases book is for goods only; the machine is an asset', 1], ['Journal proper named, with the entry', 1]],
}));
QQ('s2_dn_cn', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a debit note and a credit note.',
  model: "A **debit note** is sent by a buyer to a supplier on returning goods, saying the supplier's account is debited; source of the purchases return book. A **credit note** is sent by a seller to a customer who returns goods, saying the customer's account is credited; source of the sales return book.",
  sol: 'Issuer, meaning and book.',
  scheme: [['Debit note: issuer, purpose, purchases return book', 1], ['Credit note: issuer, purpose, sales return book', 1]],
}));
{
  const b = tradeBook({ kind: 'purchases', entries: [T('Jul 9', 'P-2', 'Supplier', 50000, 20)] });
  same(b.totals.net, 40000, 's2_td net');
  QQ('s2_td', short({
    t: 2, d: 2, c: 'application', marks: 2,
    stem: `Tulsi Traders, an imagined firm, buys goods on credit with a list price of ${rs(50000)} and a trade discount of 20%. What amount is entered in its purchases book, and how is the trade discount treated in the books?`,
    model: `Trade discount = ${inr(50000)} × 20/100 = ${inr(b.totals.td)}. The purchases book records the net amount **${rs(b.totals.net)}**. The trade discount is not recorded separately in the books; it is deducted on the invoice, so there is no discount account.`,
    sol: 'Net amount, and the discount is not recorded.',
    scheme: [[`Net amount ${rs(b.totals.net)}`, 1], ['Trade discount is not recorded as a separate item in the books', 1]],
  }));
}
QQ('s2_jp', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the journal proper? Name two kinds of entries made in it.',
  model: 'The **journal proper** is the book of original entry for transactions that do not fit any special purpose book. Examples: the opening entry, rectification entries, adjustment entries, transfer entries, and the purchase or sale of an asset on credit.',
  sol: 'Residual journal and two examples.',
  scheme: [['Meaning: for entries that fit no special book', 1], ['Two kinds of entries', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const b = tradeBook({
    kind: 'purchases',
    entries: [T('Jul 5', '12', 'Hari Wholesale', 15000, 10), T('Jul 14', '13', 'Madhu Traders', 24000, 25), T('Jul 23', '14', 'Hari Wholesale', 8000, 0)],
  });
  same(b.totals.net, 39500, 's3_pb_simple');
  QQ('s3_pb_simple', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Prepare the purchases book of Karan Kirana, an imagined shop, from its July 2026 invoices for goods bought on credit: Jul 5, invoice 12, Hari Wholesale, list price ${rs(15000)}, trade discount 10%; Jul 14, invoice 13, Madhu Traders, list price ${rs(24000)}, trade discount 25%; Jul 23, invoice 14, Hari Wholesale, list price ${rs(8000)}, no discount. (Ignore tax.)`,
    model: `${b.md}\n\nWorking: ${inr(15000)} − ${inr(b.entries[0].tdAmt)} = ${inr(b.entries[0].net)}; ${inr(24000)} − ${inr(b.entries[1].tdAmt)} = ${inr(b.entries[1].net)}; ${inr(8000)}. The net total of **${rs(b.totals.net)}** is posted by debiting Purchases A/c, and each invoice is credited to the supplier.`,
    sol: 'Net amounts after trade discount in the proper format, with the total.',
    scheme: [['Format: date, invoice number, supplier, L.F., amount', 1], ['Each net amount after trade discount', 1], [`Total ${rs(b.totals.net)}`, 1]],
  }));
}
{
  const b = tradeBook({
    kind: 'sales', rate: 18,
    entries: [T('Nov 6', '21', 'Omkar Textiles', 40000, 10), T('Nov 15', '22', 'Pooja Sarees', 20000, 0), T('Nov 26', '23', 'Quick Fashions', 30000, 10, true)],
  });
  same(b.totals.net, 83000, 's3_sb_gst net');
  same(b.totals.cgst, 5040, 's3_sb_gst CGST');
  same(b.totals.igst, 4860, 's3_sb_gst IGST');
  QQ('s3_sb_gst', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Neelam Fabrics, an imagined firm in one state, made these credit sales in November 2026, with goods and services tax at an imagined rate of 18% on the price after trade discount: Nov 6, invoice 21, Omkar Textiles (same state), list price ${rs(40000)}, trade discount 10%; Nov 15, invoice 22, Pooja Sarees (same state), list price ${rs(20000)}, no discount; Nov 26, invoice 23, Quick Fashions (another state), list price ${rs(30000)}, trade discount 10%. Record them in the sales book with tax columns.`,
    model: `${b.md}`,
    sol: 'Net amounts, CGST and SGST for the same state, IGST for the other state, with totals.',
    scheme: [['Net amounts after trade discount', 1], ['CGST and SGST on the two same-state sales; IGST on the third', 1], [`Column totals (net ${rs(b.totals.net)}, invoice total ${rs(b.totals.total)})`, 1]],
  }));
}
{
  const J = journal([
    { dr: [['Drawings A/c', 4500]], cr: [['Purchases A/c', 4500]], note: 'Being goods taken by the owner for personal use' },
    { dr: [['Charity A/c', 2000]], cr: [['Purchases A/c', 2000]], note: 'Being goods given as charity' },
    { dr: [['Insurance Claim A/c', 5000], ['Loss by Fire A/c', 2000]], cr: [['Purchases A/c', 7000]], note: `Being goods destroyed by fire; claim of ${rs(5000)} admitted by the insurance company` },
  ]);
  same(J.total, 4500 + 2000 + 7000, 's3_journal3');
  QQ('s3_journal3', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Pass journal proper entries, with narrations, in the books of Shyam Stores, an imagined firm: (a) the owner took goods costing ${rs(4500)} for personal use; (b) goods costing ${rs(2000)} were given away as charity; (c) goods costing ${rs(7000)} were destroyed by fire and the insurance company admitted a claim of ${rs(5000)}.`,
    model: `${J.md}`,
    sol: 'Each entry debits the right account and credits Purchases at cost.',
    scheme: [['(a) Drawings A/c Dr, To Purchases A/c', 1], ['(b) Charity A/c Dr, To Purchases A/c', 1], [`(c) claim ${rs(5000)} and loss ${rs(2000)} debited, Purchases credited ${rs(7000)}`, 1]],
  }));
}
QQ('s3_rect', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Narula Tools, an imagined firm, paid ${rs(8000)} in cash on 3 March 2027 for a computer but debited the amount to Purchases A/c. State the effect of the error on the purchases figure and on the asset, and give the rectifying entry.`,
  model: `The goods account (Purchases) is overstated by ${rs(8000)} and the computer, an asset, is not shown, so the assets are understated by ${rs(8000)}. Rectifying entry:\n\n${mdTable(['Particulars', 'Dr (₹)', 'Cr (₹)'], [['Computer A/c Dr.', inr(8000), ''], ['To Purchases A/c', '', inr(8000)], ['*(Being the purchase of a computer wrongly debited to Purchases A/c, now corrected)*', '', '']])}`,
  sol: 'Effect on both accounts, then the entry that moves the amount.',
  scheme: [['Purchases overstated by the amount', 1], ['Asset understated by the amount', 1], ['Rectifying entry with narration', 1]],
}));

// ================================================================ long answer, 5 marks
{
  const P_ = tradeBook({
    kind: 'purchases', rate: 18,
    entries: [T('Oct 4', '41', 'Arjun Agencies', 40000, 10), T('Oct 11', '42', 'Bharat Distributors', 25000, 20), T('Oct 20', '43', 'Chennai Components', 50000, 10, true)],
  });
  const S_ = tradeBook({
    kind: 'sales', rate: 18,
    entries: [T('Oct 7', '1', 'Deepak Mart', 30000, 10), T('Oct 16', '2', 'Esha Stores', 20000, 0), T('Oct 25', '3', 'Faisal Traders', 40000, 5, true)],
  });
  same(P_.totals.net, 101000, 'l5_pb_sb purchases net');
  same(P_.totals.total, 119180, 'l5_pb_sb purchases total');
  same(S_.totals.net, 85000, 'l5_pb_sb sales net');
  same(S_.totals.total, 100300, 'l5_pb_sb sales total');
  QQ('l5_pb_sb', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `Charu Electronics, an imagined firm, buys and sells on credit with goods and services tax at an imagined rate of 18% on the price after trade discount. October 2026 credit purchases: Oct 4, invoice 41, Arjun Agencies (same state), list price ${rs(40000)}, trade discount 10%; Oct 11, invoice 42, Bharat Distributors (same state), list price ${rs(25000)}, trade discount 20%; Oct 20, invoice 43, Chennai Components (another state), list price ${rs(50000)}, trade discount 10%. Credit sales: Oct 7, invoice 1, Deepak Mart (same state), list price ${rs(30000)}, trade discount 10%; Oct 16, invoice 2, Esha Stores (same state), list price ${rs(20000)}, no discount; Oct 25, invoice 3, Faisal Traders (another state), list price ${rs(40000)}, trade discount 5%. Prepare the purchases book and the sales book.`,
    model: `**Purchases book**\n\n${P_.md}\n\n**Sales book**\n\n${S_.md}`,
    sol: 'Net amounts, then CGST and SGST or IGST, with totals, in each book.',
    scheme: [['Purchases book: net amounts after trade discount', 1], [`Purchases book: tax columns and totals (net ${rs(P_.totals.net)}, total ${rs(P_.totals.total)})`, 1], ['Sales book: net amounts after trade discount', 1], [`Sales book: tax columns and totals (net ${rs(S_.totals.net)}, total ${rs(S_.totals.total)})`, 1], ['Correct books, formats and use of IGST for the other-state invoices', 1]],
  }));
}
{
  const PRb = tradeBook({ kind: 'purchaseReturns', rate: 12, entries: [T('Nov 9', 'DN-5', 'Eagle Tubes', 15000, 10), T('Nov 21', 'DN-6', 'Falcon Tyres', 10000, 20)] });
  const SRb = tradeBook({ kind: 'salesReturns', rate: 12, entries: [T('Nov 13', 'CN-7', 'Gopi Cycles', 20000, 10), T('Nov 27', 'CN-8', 'Hari Bikes', 12000, 0, true)] });
  same(PRb.totals.net, 21500, 'l5_returns purchases return net');
  same(PRb.totals.total, 24080, 'l5_returns purchases return total');
  same(SRb.totals.net, 30000, 'l5_returns sales return net');
  same(SRb.totals.total, 33600, 'l5_returns sales return total');
  const J1 = journal([{ dr: PRb.posting.dr, cr: PRb.posting.cr, note: 'Being the total of the purchases return book posted' }]);
  const J2 = journal([{ dr: SRb.posting.dr, cr: SRb.posting.cr, note: 'Being the total of the sales return book posted' }]);
  QQ('l5_returns', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `Dinesh Cycle Mart, an imagined firm, returned and received back goods in November 2026, with goods and services tax at an imagined rate of 12% on the price after trade discount. Returns to suppliers (debit notes): Nov 9, DN-5, Eagle Tubes (same state), list price ${rs(15000)}, trade discount 10%; Nov 21, DN-6, Falcon Tyres (same state), list price ${rs(10000)}, trade discount 20%. Returns by customers (credit notes): Nov 13, CN-7, Gopi Cycles (same state), list price ${rs(20000)}, trade discount 10%; Nov 27, CN-8, Hari Bikes (another state), list price ${rs(12000)}, no discount. Prepare the purchases return book and the sales return book, and pass the entries that post their totals.`,
    model: `**Purchases return book**\n\n${PRb.md}\n\n**Sales return book**\n\n${SRb.md}\n\n**Posting entries**\n\n${J1.md}\n\n${J2.md}`,
    sol: 'Net value of returned goods, tax reversed at the same rate, books totalled, then the summary entries.',
    scheme: [['Purchases return book: net amounts and tax columns', 1], [`Purchases return book totals (net ${rs(PRb.totals.net)}, total ${rs(PRb.totals.total)})`, 1], ['Sales return book: net amounts, CGST and SGST for the same state and IGST for the other', 1], [`Sales return book totals (net ${rs(SRb.totals.net)}, total ${rs(SRb.totals.total)})`, 1], ['Summary entries with debits equal to credits', 1]],
  }));
}
{
  const assets = [['Cash A/c', 12000], ['Stock A/c', 40000], ['Furniture A/c', 25000], ['Debtors A/c', 18000]];
  const liabs = [['Creditors A/c', 15000]];
  const cap = sum(assets.map(([, a]) => a)) - sum(liabs.map(([, a]) => a));
  same(cap, 80000, 'l5_journal capital');
  const cg = gst(30000, 12);
  const J = journal([
    { date: 'Apr 1', dr: assets, cr: [...liabs, ['Capital A/c', cap]], note: 'Being the opening balances brought forward' },
    { date: 'Apr 5', dr: [['Computer A/c', 30000], ['Input CGST A/c', cg.cgst], ['Input SGST A/c', cg.sgst]], cr: [['Mega Systems', 30000 + cg.tax]], note: 'Being a computer bought on credit; tax at an imagined 12%' },
    { date: 'Apr 12', dr: [['Drawings A/c', 4200]], cr: [['Purchases A/c', 4200]], note: 'Being goods taken by the owner for personal use' },
    { date: 'Apr 20', dr: [['Advertisement A/c', 1800]], cr: [['Purchases A/c', 1800]], note: 'Being goods distributed as free samples' },
    { date: 'Apr 24', dr: [['Insurance Claim A/c', 6000], ['Loss by Fire A/c', 3500]], cr: [['Purchases A/c', 9500]], note: `Being goods destroyed by fire; claim of ${rs(6000)} admitted` },
    { date: 'Apr 28', dr: [['Computer A/c', 5000]], cr: [['Wages A/c', 5000]], note: 'Being wages for installing the computer, wrongly debited to Wages A/c, now capitalised' },
  ]);
  same(J.total, 95000 + 33600 + 4200 + 1800 + 9500 + 5000, 'l5_journal total');
  QQ('l5_journal', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `Pass journal proper entries, with narrations, for April 2027 in the books of Lata Stationers, an imagined shop. (1) Apr 1: cash ${rs(12000)}, stock ${rs(40000)}, furniture ${rs(25000)} and debtors ${rs(18000)}; creditors ${rs(15000)}. Pass the opening entry. (2) Apr 5: bought a computer on credit from Mega Systems for ${rs(30000)}, plus goods and services tax at an imagined rate of 12% (same state). (3) Apr 12: the owner took goods costing ${rs(4200)} for personal use. (4) Apr 20: goods costing ${rs(1800)} were distributed as free samples. (5) Apr 24: goods costing ${rs(9500)} were destroyed by fire; the insurance company admitted a claim of ${rs(6000)}. (6) Apr 28: wages of ${rs(5000)} paid for installing the computer were debited to Wages A/c by mistake; rectify.`,
    model: `${J.md}\n\nCapital in the opening entry = ${inr(sum(assets.map(([, a]) => a)))} − ${inr(15000)} = ${rs(cap)}.`,
    sol: 'Six entries; the opening entry balances through Capital.',
    scheme: [[`Opening entry with Capital ${rs(cap)}`, 1], [`Computer on credit with CGST and SGST (creditor ${rs(30000 + cg.tax)})`, 1], ['Drawings and free samples entries', 1], [`Fire: claim ${rs(6000)}, loss ${rs(3500)}`, 1], ['Rectification entry', 1]],
  }));
}
QQ('l5_theory', long({
  t: [1, 2], d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Name the special purpose books that a trading firm keeps, state what each records, and explain why such books are kept.',
  model: [
    '**Why kept:** one journal for everything would be slow and crowded; separate books give division of work, specialisation, saving of time and easy reference.',
    '**The books:** (1) cash book: cash and bank receipts and payments, and it also serves as the cash account; (2) petty cash book: small payments on the imprest system; (3) purchases book: credit purchases of goods; (4) sales book: credit sales of goods; (5) purchases return book: goods returned to suppliers, from debit notes; (6) sales return book: goods returned by customers, from credit notes.',
    'Entries that fit none of these are recorded in the **journal proper**.',
  ].join('\n\n'),
  sol: 'Reason, six books with their contents, and the journal proper.',
  scheme: [['Reasons for special purpose books', 1], ['Cash book and petty cash book with contents', 1], ['Purchases book and sales book with contents', 1], ['Purchases return and sales return books with the notes used', 1], ['Journal proper for the remaining entries', 1]],
}));
void sum; void match;
