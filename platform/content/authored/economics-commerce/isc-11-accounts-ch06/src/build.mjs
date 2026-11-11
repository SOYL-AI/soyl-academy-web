// Build ISC 11 Accounts ch06 Petty Cash Book and Other Special Purpose Books. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { words, rupees } from './acc.mjs';
import {
  same, check, inr, rs, journal, E,
  PC1, PC2, KC_PB, KC_PRB, KC_VIN, KC_VIN1, KC_PUR1, KC_NET_PURCHASES, HF_PB, SH_SB, SH_SRB, SH_JOR1, SH_NET_SALES, KS_SB, SF, SF_RAVI, SF_PUR, TP_OPEN, TP_JP,
} from './fig.mjs';

setUnit('isc-11-accounts-ch06', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tb = (t, alt, caption) => table(t.headers, t.rows, alt, caption);

// ================================================================ visuals: shared
const vRoute1 = flow('LR', ['Small expenses', 'Petty cash book', 'Purchases book', 'Sales book', 'Posting to the ledger'], 'Route map of Part 1: petty expenses go to the petty cash book, credit purchases to the purchases book and credit sales to the sales book, and the totals are posted to the ledger', 'Part 1 at a glance');
const vBooks = table(
  ['Book', 'What it records', 'Source document', 'Total goes to'],
  [
    ['Petty cash book', 'Small cash payments of the office', 'Petty vouchers', 'Debit of each expense account'],
    ['Purchases book', 'Credit purchases of goods for resale', 'Invoice received', 'Debit of Purchases A/c'],
    ['Sales book', 'Credit sales of goods', 'Copy of invoice sent', 'Credit of Sales A/c'],
    ['Purchases return book', 'Goods sent back to suppliers', 'Debit note', 'Credit of Purchases Return A/c'],
    ['Sales return book', 'Goods taken back from customers', 'Credit note', 'Debit of Sales Return A/c'],
    ['Journal proper', 'Every entry that fits no other book', 'Memorandum or voucher', 'Each entry posted on its own'],
  ],
  'Table of the special books: petty cash book, purchases book, sales book, the two returns books and the journal proper, each with what it records, its source document and where its total is posted',
  'Special books at a glance',
);
const vCycle = flow('LR', ['Head cashier gives the imprest', 'Petty cashier pays against vouchers', 'The book is totalled and balanced', 'Head cashier reimburses what was spent', 'The float is the imprest again'], 'Cycle of the imprest system: the head cashier gives the fixed imprest, the petty cashier pays against vouchers, the book is totalled and balanced, the amount spent is reimbursed and the float is back to the imprest', 'One cycle of the imprest system');
const vFormat1 = table(PC1.headers, PC1.rows.slice(0, 5),
  'First lines of an analytical petty cash book of Tanjore Brass Emporium, an imagined firm: the receipts column, date, particulars, voucher number, a total column and an analysis column each for postage, stationery, conveyance, refreshments and sundries',
  'Format of the analytical petty cash book (first lines only)');
const vPc1 = tb(PC1, `Analytical petty cash book of Tanjore Brass Emporium for the week of 3 to 8 January 2028: eight vouchers analysed under five heads, total payments of ${words(PC1.spent)} rupees, a balance carried down of ${words(PC1.closing)} rupees and a reimbursement of ${words(PC1.reimburse)} rupees`, 'Tanjore Brass Emporium: imprest ₹2,000');
const vRestore = table(['Step', 'Amount (₹)', 'How it is found'], [
  ['Imprest', inr(PC1.imprest), 'Fixed by the firm'],
  ['Balance in hand at the start', inr(PC1.open), 'Brought down from the last period'],
  ['Cash received at the start', inr(PC1.received), 'Imprest − balance in hand'],
  ['Total payments', inr(PC1.spent), 'Total of the analysis columns'],
  ['Balance carried down', inr(PC1.closing), 'Imprest − total payments'],
  ['Reimbursement', inr(PC1.reimburse), 'Equal to the total payments'],
  ['Float after reimbursement', inr(PC1.closing + PC1.reimburse), 'Balance + reimbursement = imprest'],
], 'Table of the imprest of Tanjore Brass Emporium restored: balance in hand plus the reimbursement equals the imprest', 'Why the float comes back to the imprest');
same(PC1.closing + PC1.reimburse, PC1.imprest, 'float restored');
const vPc2 = tb(PC2, `Analytical petty cash book of Bargarh Handloom House for February 2028 with an imprest of ${words(PC2.imprest)} rupees: eight vouchers, one of them split over printing and postage, total payments of ${words(PC2.spent)} rupees and a balance of ${words(PC2.closing)} rupees carried down`, 'Bargarh Handloom House: imprest ₹5,000');
const vPcPost = table(PC1.postHeaders, PC1.postRows, `Posting of the petty cash book of Tanjore Brass Emporium: each expense account is debited with its column total and cash is credited with the reimbursement of ${words(PC1.reimburse)} rupees, so the debits and credits both come to ${words(PC1.spent)} rupees`, 'Posting the column totals');
const vPbWhich = table(['Transaction', 'In the purchases book?', 'Where it is recorded'], [
  ['Goods bought on credit for resale', 'Yes', 'Purchases book'],
  ['Goods bought for cash', 'No', 'Cash book'],
  ['Machinery or furniture bought on credit', 'No', 'Journal proper'],
  ['Goods returned to a supplier', 'No', 'Purchases return book'],
], 'Table sorting four transactions: only credit purchases of goods for resale go to the purchases book; cash purchases go to the cash book, assets bought on credit go to the journal proper and returns go to the purchases return book');
const vKcPb = tb(KC_PB, `Purchases book of Karaikudi Cycle Mart for March 2028: five credit purchases of ${words(KC_PB.totals.net)} rupees in all, each entered at the amount after trade discount`, 'Simple purchases book');
const vKcWork = table(KC_PB.workHeaders, KC_PB.work, `Working for the purchases book of Karaikudi Cycle Mart: list price, trade discount and net amount of each invoice, with a total list price of ${words(KC_PB.totals.list)} rupees, trade discount of ${words(KC_PB.totals.td)} rupees and net purchases of ${words(KC_PB.totals.net)} rupees`, 'Only the net column goes to the book');
const vColFormat = table(HF_PB.headers, HF_PB.rows.slice(0, 2), 'First lines of a columnar purchases book of Haldia Fabric House, an imagined firm: date, invoice number, supplier, folio, a column each for cotton, silk and woollen goods and a total column', 'Format of the columnar purchases book (first lines only)');
const vHfPb = tb(HF_PB, `Columnar purchases book of Haldia Fabric House for April 2028: four invoices, with cotton ${words(HF_PB.totals.byCol[0])} rupees, silk ${words(HF_PB.totals.byCol[1])} rupees and woollen goods ${words(HF_PB.totals.byCol[2])} rupees, a total of ${words(HF_PB.totals.net)} rupees`, 'Columnar purchases book after trade discount');
const vPbSb = table(['Basis', 'Purchases book', 'Sales book'], [
  ['Records', 'Credit purchases of goods', 'Credit sales of goods'],
  ['Source document', 'Invoice received from the supplier', 'Copy of the invoice sent to the customer'],
  ['Party column', 'Name of supplier', 'Name of customer'],
  ['Individual invoices posted to', 'Credit of the supplier', 'Debit of the customer'],
  ['Total posted to', 'Debit of Purchases A/c', 'Credit of Sales A/c'],
  ['Trade discount', 'Deducted; net amount entered', 'Deducted; net amount entered'],
], 'Table comparing the purchases book and the sales book on what they record, source document, party column, posting of invoices and of the total, and trade discount');
const vShSb = tb(SH_SB, `Sales book of Shillong Hardware Works for May 2028: five credit sales to three customers, totalling ${words(SH_SB.totals.net)} rupees after trade discount`, 'Sales book of an imagined firm');
const vJor1 = table(SH_JOR1.headers, SH_JOR1.rows, `Account of Jorhat Builders in the ledger of Shillong Hardware Works after the sales book is posted: the opening balance of ${words(15000)} rupees and two invoices on the debit side, each with the folio SB 1`, 'Posted, not yet balanced');
const vSummary1 = table(['Topic', 'Remember'], [
  ['Imprest system', 'Fixed float; the amount spent is reimbursed; the float is restored'],
  ['Analytical petty cash book', 'Total column and a column for each head; the column totals equal the total payments'],
  ['Posting petty cash', 'Each head account debited with its column total; cash credited with the reimbursement'],
  ['Purchases and sales books', 'Credit transactions in goods only; trade discount deducted; net amount entered'],
  ['Columnar form', 'A column for each class of goods; the column totals add up to the book total'],
  ['Posting', 'Each invoice to the party account; the book total to Purchases A/c or Sales A/c'],
], 'Summary table of Part 1: the imprest system, the analytical petty cash book, posting of petty cash, purchases and sales books, the columnar form and posting');

// ================================================================ visuals: deck 2
const vRoute2 = flow('LR', ['Goods returned', 'Debit note or credit note', 'Returns book', 'Journal proper for the rest', 'Posting to the ledger'], 'Route map of Part 2: returns are recorded in the returns books from debit and credit notes, other entries go to the journal proper, and everything is posted to the ledger', 'Part 2 at a glance');
const vDnCn = table(['Basis', 'Debit note', 'Credit note'], [
  ['Issued by', 'The buyer', 'The seller'],
  ['Issued to', 'The supplier', 'The customer'],
  ['When', 'Goods are sent back to the supplier', 'Goods are taken back from the customer'],
  ['Tells the receiver', 'His account is debited in the books of the buyer', 'His account is credited in the books of the seller'],
  ['Recorded in', 'Purchases return book of the buyer', 'Sales return book of the seller'],
], 'Table distinguishing a debit note from a credit note on who issues it, to whom, when, what it tells the receiver and the book in which it is recorded');
const dn1 = KC_PRB.entries[0];
const vNote = table(['Item on the debit note', 'Detail'], [
  ['Debit note number and date', `1, ${dn1.date} 2028`],
  ['Issued by', 'Karaikudi Cycle Mart (buyer), an imagined firm'],
  ['Issued to', dn1.party],
  ['Goods returned and reason', 'Cycles, defective frames (as noted on the goods)'],
  ['List price of goods returned', rs(dn1.list)],
  ['Less trade discount at 10%', rs(dn1.tdAmt)],
  ['Amount of the debit note', rs(dn1.net)],
], `Specimen of a debit note issued by Karaikudi Cycle Mart to Vinayak Cycle Co. for goods returned with a list price of ${words(dn1.list)} rupees, a trade discount of ${words(dn1.tdAmt)} rupees and a debit note amount of ${words(dn1.net)} rupees`, 'What a debit note shows');
const vPrb = tb(KC_PRB, `Purchases return book of Karaikudi Cycle Mart for March 2028: three debit notes to two suppliers totalling ${words(KC_PRB.totals.net)} rupees after trade discount`, 'Purchases return book');
const vSrb = tb(SH_SRB, `Sales return book of Shillong Hardware Works for May 2028: three credit notes to two customers totalling ${words(SH_SRB.totals.net)} rupees after trade discount`, 'Sales return book');
const vVin = table(KC_VIN.headers, KC_VIN.rows, `Account of Vinayak Cycle Co. in the ledger of Karaikudi Cycle Mart: the opening balance and two purchases on the credit side, two returns on the debit side and a credit balance of ${words(-KC_VIN.balance)} rupees carried down`, 'Returns reduce what is owed to the supplier');
same(-KC_VIN.balance, 82950, 'closing creditor');
const vNet = table(['', 'Karaikudi Cycle Mart: purchases (₹)', 'Shillong Hardware Works: sales (₹)'], [
  ['Total of the day book', inr(KC_PB.totals.net), inr(SH_SB.totals.net)],
  ['Less: returns book total', inr(KC_PRB.totals.net), inr(SH_SRB.totals.net)],
  ['**Net**', `**${inr(KC_NET_PURCHASES)}**`, `**${inr(SH_NET_SALES)}**`],
], `Net purchases of ${words(KC_NET_PURCHASES)} rupees for Karaikudi Cycle Mart after deducting purchases returns, and net sales of ${words(SH_NET_SALES)} rupees for Shillong Hardware Works after deducting sales returns`, 'Returns are deducted from the totals');
const vJpWhat = table(['Transaction', 'Entry in the journal proper'], [
  ['Credit purchase of an asset', 'Asset A/c Dr to the supplier'],
  ['Credit sale of an asset', 'The buyer Dr to Asset A/c'],
  ['Bad debts written off', 'Bad Debts A/c Dr to the debtor'],
  ['Goods taken by the proprietor', 'Drawings A/c Dr to Purchases A/c'],
  ['Goods lost by fire or theft', 'Loss A/c Dr to Purchases A/c'],
  ['Opening and closing entries', 'Passed once, at the start or end of the year'],
  ['Rectification of an error', 'The corrected account is debited or credited'],
], 'Table of transactions recorded in the journal proper with the entry for each: assets on credit, bad debts, goods withdrawn, goods lost, opening and closing entries and rectification');
const vSf = table(SF.headers, SF.rows, 'Transactions of Silchar Furnishings, an imagined firm, in January 2028, each with the book of first entry: credit purchases and sales, the two returns books, the cash book for cash transactions and the journal proper for the rest', 'Which book? A mixed month');
const jEx3 = journal([TP_JP.asset, TP_JP.sold, TP_JP.bad]);
const vJp3 = table(jEx3.headers, jEx3.rows, 'Three journal proper entries of Tezpur Paper Mart, an imagined firm: machinery bought on credit, old furniture sold on credit at book value, and a debtor\'s balance written off as bad', 'Assets on credit and bad debts');
const jDraw = journal([TP_JP.draw, TP_JP.fire, TP_JP.sample]);
const vJpDraw = table(jDraw.headers, jDraw.rows, 'Three journal proper entries of Tezpur Paper Mart: goods taken by the proprietor debited to Drawings, goods destroyed by fire debited to Loss by Fire and goods given as free samples debited to Advertisement, each credited to Purchases', 'Goods leave the stock without a sale');
const jOpen = journal([TP_OPEN]);
const vOpen = table(jOpen.headers, jOpen.rows, `Opening entry of Tezpur Paper Mart dated 1 April 2028: assets debited, the creditor and the loan credited, and capital of ${words(265000)} rupees as the balancing figure`, 'Capital is the balancing figure');
const jClose = journal([TP_JP.close, TP_JP.close2, TP_JP.rect]);
const vClose = table(jClose.headers, jClose.rows, 'Closing entries transferring Purchases and Sales to the Trading Account, and a rectifying entry moving furniture wrongly debited to Purchases to the Furniture Account', 'Closing and rectification entries');
const sfBooks = SF.books;
const vSfTotals = table(['Book', 'Entries', 'Total (₹)', 'Posted to'], [
  ['Purchases book', String(sfBooks.purchases.entries.length), inr(sfBooks.purchases.totals.net), 'Purchases A/c debit; Ravi Timbers credit'],
  ['Sales book', String(sfBooks.sales.entries.length), inr(sfBooks.sales.totals.net), 'Meena Interiors and Tarun Decor debit; Sales A/c credit'],
  ['Purchases return book', String(sfBooks.purchaseReturns.entries.length), inr(sfBooks.purchaseReturns.totals.net), 'Ravi Timbers debit; Purchases Return A/c credit'],
  ['Sales return book', String(sfBooks.salesReturns.entries.length), inr(sfBooks.salesReturns.totals.net), 'Sales Return A/c debit; Meena Interiors credit'],
  ['Journal proper', String(SF.jp.length), inr(SF.jp.reduce((s, e) => s + e.dr.reduce((a, [, x]) => a + x, 0), 0)), 'Each entry on its own'],
  ['Cash book', String(SF.cash.length), 'Chapter 5', 'Not part of this chapter'],
], 'Table of the books of Silchar Furnishings for January 2028 with the number of entries, the total of each and where it is posted: purchases book, sales book, the two returns books, the journal proper and the cash book', 'One month, six books');
const vRavi = table(SF_RAVI.headers, SF_RAVI.rows, `Account of Ravi Timbers in the ledger of Silchar Furnishings: two credit purchases on the credit side, one return and the sale of old furniture on the debit side, and a credit balance of ${words(-SF_RAVI.balance)} rupees`, 'Entries from three different books meet in one account');
same(-SF_RAVI.balance, 68500, 'Ravi Timbers balance');
const vPostRule = table(['Book', 'Each entry is posted to', 'The total is posted to', 'Folio'], [
  ['Purchases book', 'Credit of the supplier', 'Debit of Purchases A/c', 'PB'],
  ['Sales book', 'Debit of the customer', 'Credit of Sales A/c', 'SB'],
  ['Purchases return book', 'Debit of the supplier', 'Credit of Purchases Return A/c', 'PRB'],
  ['Sales return book', 'Credit of the customer', 'Debit of Sales Return A/c', 'SRB'],
  ['Journal proper', 'Each account of the entry', 'No total is posted', 'J'],
], 'Table of posting from each special book: where each entry and the book total are posted, and the folio abbreviation written in the ledger');
const vSummary2 = table(['Topic', 'Remember'], [
  ['Debit note', 'Issued by the buyer when goods are sent back; recorded in the purchases return book'],
  ['Credit note', 'Issued by the seller when goods are taken back; recorded in the sales return book'],
  ['Returns books', 'Net value after trade discount; total debits or credits the returns account'],
  ['Journal proper', 'Assets on credit, bad debts, drawings of goods, losses, opening, closing and rectifying entries'],
  ['Posting', 'Each entry to the party account; the totals of the day books to the goods accounts'],
  ['Folios', 'PB, SB, PRB, SRB and J, with the page number, name the book from which an item was posted'],
], 'Summary table of Part 2: debit note, credit note, returns books, journal proper, posting and folios');

// ================================================================ decks
const deck1 = deck({
  part: 1,
  title: 'Special Purpose Books — Part 1: Petty Cash Book, Purchases Book and Sales Book',
  goals: [
    'Prepare an analytical petty cash book on the imprest system, balance it, find the reimbursement and post the column totals',
    'Record credit purchases and credit sales of goods in simple and columnar day books, deducting trade discount',
    'Separate transactions that belong in the purchases and sales books from those that go to the cash book or the journal proper, and post the books to the ledger',
  ],
  slides: [
    sl('title', 'Special books: petty cash, purchases and sales', {
      b: 'Part 1: the **petty cash book** on the imprest system, and the **purchases book** and **sales book** in simple and columnar form.',
      v: vRoute1,
      n: 'Welcome. Every business has small daily payments and a great many credit purchases and credit sales. Writing each one in the journal would be slow and repetitive, so accountants keep special books. In this part we meet the petty cash book, the purchases book and the sales book, using imagined firms.',
    }),
    sl('concept', 'Why a business keeps special books', {
      bl: ['A **special book** records only one kind of transaction.', 'It is totalled, and the **totals** are posted to the ledger, so posting is far lighter.', 'Several clerks can write different books at the same time.'],
      v: vBooks,
      n: 'A special book is a subsidiary book that records one kind of transaction. The petty cash book takes small payments. The purchases book takes credit purchases of goods, and the sales book credit sales. Two more books take returns, and the journal proper takes whatever fits nowhere else. Each book is totalled, and the totals are posted to the ledger.',
    }),
    sl('concept', 'Petty cash and the imprest system', {
      bl: ['**Petty cash** is the small cash kept for postage, fares, tea and similar payments.', 'Under the **imprest system** the petty cashier gets a **fixed sum**, the imprest.', 'At the end of the period he is given **exactly what he spent**, which restores the sum.'],
      v: vCycle,
      n: 'Petty cash is the small cash kept for postage, fares, tea and other minor payments. Under the imprest system the head cashier gives the petty cashier a fixed sum. He pays out against vouchers. At the end of the period the head cashier repays exactly what was spent, so the petty cashier starts again with the same fixed sum.',
    }),
    sl('concept', 'The analytical petty cash book', {
      b: 'Each payment is written in the **Total** column and again in the **analysis column** of its head. A voucher for two heads is split between two columns. The **receipts** column holds the balance in hand and the cash received.',
      v: vFormat1,
      n: 'The analytical petty cash book has a receipts column on the left and a total column for payments. Beside the total are analysis columns, one for each head of expense, such as postage, stationery and conveyance. Every payment appears in the total column and again in its own head. A voucher that covers two heads is split between two columns.',
    }),
    sl('example', 'Worked example 1: a week of petty cash', {
      b: `**Tanjore Brass Emporium**, an imagined firm, keeps an imprest of ${rs(PC1.imprest)}. On 3 January 2028, ${rs(PC1.open)} is in hand, so the head cashier gives ${rs(PC1.received)}. Eight vouchers are paid in the week. Prepare the book.`,
      bl: [`Total payments ${rs(PC1.spent)}; balance carried down ${rs(PC1.closing)}.`, `Reimbursement on 9 January: ${rs(PC1.reimburse)}.`],
      v: vPc1,
      n: `The week begins with ${rupees(PC1.open)} in hand and ${rupees(PC1.received)} received, which makes the imprest of ${rupees(PC1.imprest)}. Eight vouchers are written in the total column and in their heads. Payments come to ${rupees(PC1.spent)}, so ${rupees(PC1.closing)} is carried down. The head cashier then repays ${rupees(PC1.reimburse)}.`,
    }),
    sl('check', 'Quick check: balance in hand', {
      b: 'Subtract what was spent from the imprest.',
      chk: 'm_chk_imprest',
      n: 'Start from the fixed imprest and take away the amount spent during the month. What remains is the balance in the hands of the petty cashier.',
    }),
    sl('concept', 'Balancing the book and the reimbursement', {
      bl: ['Total the **Total** column and every analysis column; the heads must add up to the total.', 'Balance carried down = **imprest − total payments**.', 'Reimbursement = **total payments**, so balance plus reimbursement equals the imprest.'],
      v: vRestore,
      n: `After the last voucher the book is totalled. The analysis columns must add up to the total payments. The balance carried down is the imprest less the payments. The head cashier reimburses exactly the payments. In our case ${rupees(PC1.closing)} plus ${rupees(PC1.reimburse)} equals ${rupees(PC1.imprest)}, the imprest. The cycle can start again.`,
    }),
    sl('example', 'Worked example 2: a month with split vouchers', {
      b: `**Bargarh Handloom House**, an imagined firm, has an imprest of ${rs(PC2.imprest)} and ${rs(PC2.open)} in hand on 1 February 2028. Voucher 15 is for printing ${rs(480)} and postage ${rs(120)}. Prepare the book for the month.`,
      bl: [`Cash received ${rs(PC2.received)}; payments ${rs(PC2.spent)}.`, `Balance carried down ${rs(PC2.closing)}; reimbursement on 1 March ${rs(PC2.reimburse)}.`],
      v: vPc2,
      n: `The petty cashier has ${rupees(PC2.open)}, and the head cashier gives ${rupees(PC2.received)} to make the imprest of ${rupees(PC2.imprest)}. Eight vouchers are entered, and voucher fifteen is split between printing and postage. Payments total ${rupees(PC2.spent)}. The balance carried down is ${rupees(PC2.closing)}, and the reimbursement is ${rupees(PC2.reimburse)}.`,
    }),
    sl('concept', 'Posting the petty cash book', {
      bl: ['Each **column total** is debited to its expense account.', 'The **reimbursement** is entered by the head cashier on the payment side of the cash book.', 'The debits and the credit are equal: the **total payments**.'],
      v: vPcPost,
      n: `At the end of the period each analysis column total is debited to its own expense account. The head cashier enters the reimbursement of ${rupees(PC1.reimburse)} on the payment side of the cash book. The debits to the five expense accounts equal that single credit, so the double entry is complete without posting each voucher.`,
    }),
    sl('concept', 'The purchases book: what goes in it', {
      b: 'The **purchases book** records only **credit purchases of goods** in which the firm deals. Cash purchases, assets and returns belong elsewhere.',
      v: vPbWhich,
      n: 'The purchases book records one thing only: goods bought on credit for resale. A cash purchase goes to the cash book. Machinery or furniture bought on credit is an asset and goes to the journal proper. Goods sent back to a supplier go to the purchases return book. The entry is made from the invoice received.',
    }),
    sl('concept', 'Format of the purchases book and trade discount', {
      bl: ['Columns: date, invoice number, name of supplier, **L.F.**, amount.', '**Trade discount** is deducted from the list price on the invoice; only the **net amount** is entered.', 'No separate account is kept for trade discount.'],
      v: vKcPb,
      n: 'The purchases book has columns for the date, the invoice number, the name of the supplier, the ledger folio and the amount. The amount is the net figure. Trade discount is allowed on the invoice itself, so it never gets an account. Only the price after the discount is a transaction, and that is what the book shows.',
    }),
    sl('example', 'Worked example 3: from invoices to the purchases book', {
      b: `**Karaikudi Cycle Mart**, an imagined firm, received five invoices in March 2028. Find the net amount of each and total the book.`,
      bl: [`Trade discount on the list price of ${rs(KC_PB.totals.list)} is ${rs(KC_PB.totals.td)}.`, `Net purchases of ${rs(KC_PB.totals.net)} are debited to Purchases A/c.`],
      v: vKcWork,
      n: `Work out each invoice first. Take the list price, deduct the trade discount, and what remains is the net amount. The invoices total ${rupees(KC_PB.totals.list)} at list price. The discount is ${rupees(KC_PB.totals.td)}. The purchases book total is therefore ${rupees(KC_PB.totals.net)}, the figure debited to Purchases.`,
    }),
    sl('check', 'Quick check: the net amount', {
      b: 'Deduct trade discount from the list price.',
      chk: 'n_chk_net',
      n: 'Find the discount as a percentage of the list price and take it away. The result is the amount that the purchases book shows.',
    }),
    sl('concept', 'The columnar purchases book', {
      b: 'A trader who buys several kinds of goods keeps a **column for each class** and a **total** column. Each invoice is split among the columns, so the month\'s purchases of each class are known at once.',
      v: vColFormat,
      n: 'A trader who buys different kinds of goods can keep a column for each class, followed by a total column. Each invoice is split among the columns after trade discount. At the end of the month the column totals show purchases of each class, and they add up to the grand total, which gives a built in check.',
    }),
    sl('example', 'Worked example 4: a columnar purchases book', {
      b: '**Haldia Fabric House**, an imagined firm, buys cotton, silk and woollen goods. Four invoices in April 2028 carry different trade discounts. Enter them with a column for each kind of goods.',
      bl: [`Column totals: cotton ${rs(HF_PB.totals.byCol[0])}, silk ${rs(HF_PB.totals.byCol[1])}, woollen ${rs(HF_PB.totals.byCol[2])}.`, `They add up to the total ${rs(HF_PB.totals.net)}.`],
      v: vHfPb,
      n: `Each invoice is split into its three classes after the trade discount, and the invoice total is shown on the right. The cotton column totals ${rupees(HF_PB.totals.byCol[0])}, the silk column ${rupees(HF_PB.totals.byCol[1])} and the woollen column ${rupees(HF_PB.totals.byCol[2])}. Together they make ${rupees(HF_PB.totals.net)}, which agrees with the total column.`,
    }),
    sl('concept', 'The sales book and how it mirrors the purchases book', {
      b: 'The **sales book** is written from the **copy of the invoice** sent to the customer. It has the same layout, with the name of the customer, and is also kept in a columnar form.',
      v: vPbSb,
      n: 'The sales book is the mirror image of the purchases book. It records credit sales of goods, written from the firm\'s own copy of the invoice. Cash sales go to the cash book, and the sale of an old asset goes to the journal proper. Trade discount is deducted in the same way, and a columnar form is possible for different classes of goods.',
    }),
    sl('example', 'Worked example 5: a sales book', {
      b: '**Shillong Hardware Works**, an imagined firm, made five credit sales in May 2028, each with its own trade discount. Prepare the sales book.',
      bl: [`List price ${rs(SH_SB.totals.list)} less trade discount ${rs(SH_SB.totals.td)} gives net sales of ${rs(SH_SB.totals.net)}.`],
      v: vShSb,
      n: `The five invoices are entered at net amounts. At list price they come to ${rupees(SH_SB.totals.list)}, from which trade discount of ${rupees(SH_SB.totals.td)} is deducted. The sales book total is ${rupees(SH_SB.totals.net)}. This total will be credited to the Sales account, while each invoice is debited to the account of its customer.`,
    }),
    sl('concept', 'Posting the day books to the ledger', {
      bl: ['Each **invoice** is posted to the **debit of the customer** with the folio **SB 1**, naming Sales A/c.', `The **book total** ${rs(SH_SB.totals.net)} is posted once to the **credit of Sales A/c**.`, 'In the purchases book everything is reversed: supplier credited, Purchases A/c debited.'],
      v: vJor1,
      n: 'Posting has two parts. Each invoice goes to the account of the customer, on the debit side, with the particulars To Sales and the folio of the sales book. At the month end the book total goes once to the credit of the Sales account. For the purchases book the sides are reversed: suppliers are credited and the Purchases account is debited.',
    }),
    sl('check', 'Quick check: columns and totals', {
      b: 'What must the column totals add up to?',
      chk: 'tf_chk_columnar',
      n: 'Think about how every invoice is shown twice in a columnar book, once in its goods column and once in the total column.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Under the imprest system the petty cashier holds a fixed sum, and the amount spent is reimbursed. The analytical book analyses payments by head, and the column totals are posted to the expense accounts. The purchases and sales books record credit transactions in goods only, at net amounts, and are posted by invoice and by total.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **receipts on the left**, with the opening balance and the cash received, and make both sides total the **imprest** or the same figure.',
        'Check that the **analysis columns add up to the Total column** before balancing.',
        'Enter **net amounts** in the purchases and sales books; show the list price and discount only in your working.',
        'Leave out **cash transactions and assets**: say where they are recorded if the question asks.',
      ],
      n: 'In the examination, write the receipts on the left with the opening balance and the cash received. Check that the analysis columns add up to the total column before you balance. In the purchases and sales books enter only net amounts, and keep list prices for your working. Leave out cash transactions and assets, and say where they belong.',
    }),
  ],
});

const deck2 = deck({
  part: 2,
  title: 'Special Purpose Books — Part 2: Returns Books, Journal Proper and Posting',
  goals: [
    'State who issues a debit note and a credit note and when, and record returns in the purchases return book and the sales return book',
    'Identify the entries recorded in the journal proper and pass opening, closing, rectifying, bad debt, drawings and credit-asset entries',
    'Post the special books and the journal proper to the ledger and check that every account agrees with the book totals',
  ],
  slides: [
    sl('title', 'Returns books, journal proper and posting', {
      b: 'Part 2: the **purchases return** and **sales return** books with **debit and credit notes**, the **journal proper**, and **posting** from the special books to the ledger.',
      v: vRoute2,
      n: 'Welcome to the second part. Goods are sometimes sent back, and the firm needs books and documents for that. Some transactions fit no special book at all, and those go to the journal proper. We close by posting everything to the ledger. All firms and figures here are imagined.',
    }),
    sl('concept', 'Debit note and credit note', {
      b: 'When goods are returned, a note tells the other party which of his accounts has changed.',
      v: vDnCn,
      n: 'A debit note is issued by the buyer to the supplier when goods are sent back. It tells the supplier that his account is debited in the buyer\'s books. A credit note is issued by the seller to the customer when goods are taken back, and it tells the customer that his account is credited. Each firm then records the return in its own book.',
    }),
    sl('concept', 'What a debit note contains', {
      b: 'The note names the **goods returned**, the **quantity and rate** and the **reason**. When goods bought at a trade discount are returned, the discount is allowed again, and the **net value** is the amount of the note.',
      v: vNote,
      n: `A debit note gives its number and date, the name of the supplier, the goods returned with quantity, rate and reason, and the amount. If the goods were bought at a trade discount, the same discount is deducted again. Here the list price of ${rupees(dn1.list)} less ${rupees(dn1.tdAmt)} gives a note of ${rupees(dn1.net)}.`,
    }),
    sl('example', 'Worked example 1: the purchases return book', {
      b: '**Karaikudi Cycle Mart**, an imagined firm, returned defective goods to two suppliers in March 2028, with a debit note each time. Enter the notes in the purchases return book.',
      bl: [`Net value of the three notes: ${rs(KC_PRB.totals.net)}.`, 'The total is posted to the **credit of Purchases Return A/c**; each note to the **debit of the supplier**.'],
      v: vPrb,
      n: `The three debit notes are entered at net value, after the same trade discount that was allowed on the purchase. They total ${rupees(KC_PRB.totals.net)}. The suppliers are debited, because the firm owes them less. The total is credited once to the Purchases Return account at the month end.`,
    }),
    sl('check', 'Quick check: the returning document', {
      b: 'Who prepares the note when goods are sent back?',
      chk: 'm_chk_note',
      n: 'Think about who is returning the goods and which of his documents informs the supplier.',
    }),
    sl('example', 'Worked example 2: the sales return book', {
      b: '**Shillong Hardware Works**, an imagined firm, took back goods from two customers in May 2028 and issued a credit note each time. Prepare the sales return book.',
      bl: [`Net value of the three credit notes: ${rs(SH_SRB.totals.net)}.`, 'The total is posted to the **debit of Sales Return A/c**; each note to the **credit of the customer**.'],
      v: vSrb,
      n: `The three credit notes are entered at net value. They total ${rupees(SH_SRB.totals.net)}. Each customer's account is credited, because he now owes less. At the month end the total is debited once to the Sales Return account. Sales return is the opposite of sales, and purchases return is the opposite of purchases.`,
    }),
    sl('concept', 'What returns do to a ledger account', {
      bl: ['A return **reduces** the balance of the party account.', 'A supplier\'s account is **debited** by a return; a customer\'s account is **credited**.', 'Each posting carries the folio of the return book, such as **PRB 1**.'],
      v: vVin,
      n: `Look at the account of a supplier. It opens with a credit balance, and credit purchases are added on the credit side. Each return is a debit and so reduces what is owed. After the two purchases and two returns the balance carried down is ${rupees(-KC_VIN.balance)}, a credit balance, still payable to the supplier.`,
    }),
    sl('example', 'Worked example 3: net purchases and net sales', {
      b: 'Returns are not a separate profit or loss; they **reduce** the purchases or sales of the period. The two day-book totals and the two returns totals give the net figures for the final accounts.',
      v: vNet,
      n: `For the cycle firm, purchases of ${rupees(KC_PB.totals.net)} less returns of ${rupees(KC_PRB.totals.net)} leave net purchases of ${rupees(KC_NET_PURCHASES)}. For the hardware firm, sales of ${rupees(SH_SB.totals.net)} less returns of ${rupees(SH_SRB.totals.net)} leave net sales of ${rupees(SH_NET_SALES)}. These net figures go to the Trading Account later.`,
    }),
    sl('concept', 'The journal proper', {
      b: 'The **journal proper** records every transaction for which **no special book exists**. It is a book of original entry like the others, with narration under each entry.',
      v: vJpWhat,
      n: 'The journal proper takes what the other books leave out. A credit purchase or sale of an asset, a bad debt written off, goods taken by the proprietor, a loss of goods, the opening entry, the closing entries and rectifying entries all belong here. Each entry has a date, the debit and credit lines, and a narration.',
    }),
    sl('concept', 'Which book? Sorting a month of transactions', {
      b: 'Ask three questions: Is it **cash**? Is it a **credit purchase or sale of goods**? Is it a **return**? If none applies, use the **journal proper**.',
      v: vSf,
      n: 'To sort a transaction, ask three questions. Is cash involved? Then it is a matter for the cash book. Is it goods bought or sold on credit? Then use the purchases or sales book. Is it goods returned? Then use a returns book. If none of these fits, the transaction goes to the journal proper. The table shows a month sorted this way.',
    }),
    sl('check', 'Quick check: which book?', {
      b: 'An asset is sold on credit.',
      chk: 'm_chk_book',
      n: 'Decide whether the thing sold is goods in which the firm deals, and whether any cash changes hands.',
    }),
    sl('example', 'Worked example 4: assets on credit and a bad debt', {
      b: '**Tezpur Paper Mart**, an imagined firm, buys machinery on credit, sells old furniture on credit at book value and writes off a debtor who is insolvent. Pass the journal proper entries.',
      v: vJp3,
      n: 'Machinery bought on credit is debited to the machinery account and credited to the supplier. Furniture sold on credit at its book value debits the buyer and credits the furniture account. A bad debt debits the bad debts account, which is an expense, and credits the debtor, whose balance is removed. Each entry balances and carries its narration.',
    }),
    sl('concept', 'Goods withdrawn, lost or given away', {
      bl: ['Goods taken by the proprietor: **Drawings A/c Dr**.', 'Goods destroyed by fire: **Loss by Fire A/c Dr**.', 'Free samples: **Advertisement A/c Dr**.', 'In every case **Purchases A/c is credited** at cost.'],
      v: vJpDraw,
      n: 'Sometimes goods leave the stock without a sale. If the proprietor takes them, debit drawings. If fire destroys them, debit the loss. If they are given as free samples, debit advertisement. In every case credit purchases at cost, because the goods are no longer available for sale. Nothing is entered in the sales book, since no sale has taken place.',
    }),
    sl('concept', 'The opening entry', {
      b: 'When new books begin, an **opening entry** debits every asset and credits every liability. **Capital** is the balancing figure: assets less liabilities.',
      v: vOpen,
      n: `At the start of new books, an opening entry brings in the old balances. Every asset is debited. The creditor and the loan are credited. The difference is the capital of the proprietor. Here the assets are ${rupees(375000)} and the liabilities ${rupees(110000)}, so capital is ${rupees(265000)}.`,
    }),
    sl('concept', 'Closing and rectifying entries', {
      b: 'At the year end a **closing entry** transfers a nominal account to the Trading Account. A **rectifying entry** corrects an error: here furniture was wrongly debited to Purchases.',
      v: vClose,
      n: 'Closing entries clear the nominal accounts at the year end. Purchases has a debit balance, so it is credited and the Trading account is debited. Sales is debited and Trading credited. A rectifying entry corrects an error found later. Furniture wrongly debited to Purchases is moved by debiting furniture and crediting purchases.',
    }),
    sl('check', 'Quick check: the sale of an asset', {
      b: 'Complete the entry for a credit sale of a fixed asset.',
      chk: 'fb_chk_jp',
      n: 'Think about the book used for an asset sold on credit, and which account of the entry is the buyer.',
    }),
    sl('example', 'Worked example 5: a mixed month and its books', {
      b: '**Silchar Furnishings**, an imagined firm, had twelve transactions in January 2028. The books show how each was recorded and where each total is posted.',
      v: vSfTotals,
      n: `The twelve transactions go to six books. The purchases book totals ${rupees(sfBooks.purchases.totals.net)} and the sales book ${rupees(sfBooks.sales.totals.net)}. The returns books take ${rupees(sfBooks.purchaseReturns.totals.net)} and ${rupees(sfBooks.salesReturns.totals.net)}. The journal proper holds four entries, and the two cash transactions are left for the cash book.`,
    }),
    sl('example', 'Worked example 5 (contd): one account, three books', {
      b: `The account of **Ravi Timbers**, a supplier, takes entries from the purchases book, the purchases return book and the journal proper. It closes with a credit balance of ${rs(-SF_RAVI.balance)}.`,
      v: vRavi,
      n: `Ravi Timbers is a supplier and also the buyer of old furniture. The two credit purchases are on the credit side. The return goes on the debit side from the purchases return book. The furniture sold on credit is debited from the journal proper. The balance carried down is ${rupees(-SF_RAVI.balance)}, still payable.`,
    }),
    sl('concept', 'Posting from every special book', {
      b: 'Learn the pattern once: the **personal account** gets each entry and the **goods account** gets the book total. The journal proper is posted entry by entry. The folio shows the source.',
      v: vPostRule,
      n: 'This table is the whole of posting. From the purchases book, each invoice credits a supplier and the total debits purchases. From the sales book, each invoice debits a customer and the total credits sales. The returns books do the opposite. The journal proper is posted entry by entry, since it has no total. The folio records the source.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A debit note is issued by the buyer, and a credit note by the seller. Returns are entered at net value in the returns books and reduce the party accounts. The journal proper takes entries that fit no other book. Each special book is posted by invoice and by total. Folios name the book from which each item is posted.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '**Debit note: buyer; credit note: seller.** Say who issues it and when.',
        'Enter returns at **net value**, with the same discount as the original invoice.',
        'In the journal proper write the **narration**, and check that debits equal credits.',
        'When asked for a ledger account, show the **folio** and balance with c/d and b/d.',
      ],
      n: 'In the examination, say who issues a debit note and who issues a credit note. Enter returns at net value, with the same discount as the original invoice. In the journal proper, write a narration and check that debits equal credits. For ledger accounts, show the folio and balance with the balance carried down and brought down.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Petty Cash Book and Other Special Purpose Books — Notes',
  sections: [
    {
      h: '1. Special purpose books',
      t: [1, 2, 3, 4],
      b: 'A trader who recorded every transaction in a single journal would repeat the same entries again and again. Transactions of one kind are therefore grouped in a **special purpose (subsidiary) book**, which is totalled periodically so that only the totals need be posted.\n\n- **Petty cash book:** small cash payments.\n- **Purchases book** and **sales book:** credit purchases and credit sales of goods.\n- **Purchases return book** and **sales return book:** goods sent back to suppliers and taken back from customers.\n- **Journal proper:** every transaction for which no special book exists.\n\nThe cash book is the subject of Chapter 5. Transactions involving GST are not examined in Class XI Accounts.',
      terms: [
        ['Special book', 'A subsidiary book in which transactions of one kind are recorded; its total is posted to the ledger.'],
        ['Journal proper', 'The book of original entry for transactions that fit no special book.'],
      ],
      v: vBooks,
    },
    {
      h: '2. Petty cash and the imprest system',
      t: 1,
      b: '**Petty cash** pays for small items such as postage, fares, stationery and refreshments. The **petty cashier** keeps it and writes the **petty cash book**; the **head cashier** supplies the cash.\n\nUnder the **imprest system**:\n\n1. The head cashier gives the petty cashier a **fixed sum, the imprest**, at the start of the period.\n2. The petty cashier pays against **vouchers** and records each.\n3. At the end of the period the book is totalled and balanced.\n4. The head cashier **reimburses exactly the amount spent**, so the petty cashier again holds the imprest.\n\nThe control is simple: the imprest is the limit, and each reimbursement is backed by vouchers.',
      terms: [
        ['Imprest', 'The fixed sum given to the petty cashier at the start of a period.'],
        ['Reimbursement', 'The sum the head cashier pays at the end of the period, equal to the payments made.'],
        ['Voucher', 'A written proof of a petty payment, with its own number.'],
      ],
      v: vCycle,
      vs: [vRestore],
    },
    {
      h: '3. The analytical petty cash book: format, balancing and posting',
      t: 1,
      b: '**Format.** The left side is the **receipts** column (balance in hand and cash received). To the right are date, particulars, **voucher number**, a **Total** column of payments and an **analysis column** for each head, such as postage, stationery, conveyance, refreshments and sundries.\n\nEach payment is written in the Total column and again in its head; a voucher of two heads is split. **Balancing:** total the Total column and every analysis column (the heads must add up to the total payments); write the balance carried down on the payment side so both sides equal the imprest; bring it down below with the reimbursement.\n\n**Posting:** debit each expense account with its column total; credit Cash with the reimbursement. Debits and credit are equal.',
      terms: [
        ['Analytical petty cash book', 'A petty cash book with a Total column and a column for each head of expense.'],
        ['Balance carried down', 'Imprest − total payments; the money still with the petty cashier.'],
      ],
      v: vPc1,
      vs: [vFormat1, vPc2, vPcPost],
    },
    {
      h: '4. Purchases book and sales book: simple and columnar',
      t: 2,
      b: 'The **purchases book** records **credit purchases of goods** only, from the invoice received; the **sales book** records **credit sales of goods** only, from the copy of the invoice sent. Cash transactions go to the cash book; assets bought or sold on credit go to the journal proper; returns go to the returns books.\n\n**Trade discount** is deducted from the list price on the invoice, so only the **net amount** is entered: net = list price − trade discount. It is not entered in any account. **Cash discount** depends on prompt payment and is recorded in the cash book, not here.\n\n**Columnar form:** a column for each class of goods and a total column; the column totals must add up to the book total, and each can be posted to its own goods account (for example Cotton Purchases A/c).',
      terms: [
        ['Invoice', 'The document of a credit sale or purchase showing goods, quantity, rate, trade discount and amount.'],
        ['Trade discount', 'A deduction from list price, shown on the invoice and not recorded in the books.'],
        ['Columnar book', 'A day book with a column for each class of goods and a total column.'],
      ],
      v: vKcWork,
      vs: [vKcPb, vPbWhich, vHfPb, vPbSb, vShSb],
    },
    {
      h: '5. Returns books, debit notes and credit notes',
      t: 3,
      b: 'When the **buyer** returns goods he sends the supplier a **debit note**; the supplier\'s account is debited in the buyer\'s books. When the **seller** takes goods back he sends the customer a **credit note**; the customer\'s account is credited in the seller\'s books.\n\n- **Purchases return book** (buyer): entered from debit notes at net value; **total credited to Purchases Return A/c**, each note debited to the supplier.\n- **Sales return book** (seller): entered from credit notes at net value; **total debited to Sales Return A/c**, each note credited to the customer.\n\nGoods returned for an immediate cash refund are cash transactions.',
      terms: [
        ['Debit note', 'Issued by the buyer to the supplier when goods are sent back.'],
        ['Credit note', 'Issued by the seller to the customer when goods are taken back.'],
        ['Net purchases', 'Purchases less purchases returns (and net sales is sales less sales returns).'],
      ],
      v: vDnCn,
      vs: [vNote, vPrb, vSrb, vVin, vNet],
    },
    {
      h: '6. The journal proper',
      t: 4,
      b: 'The journal proper records transactions that no special book can take. The common entries are:\n\n- **Credit purchase of an asset:** Asset A/c Dr to the supplier.\n- **Credit sale of an asset:** the buyer Dr to the Asset A/c.\n- **Bad debts:** Bad Debts A/c Dr to the debtor.\n- **Goods withdrawn by the proprietor:** Drawings A/c Dr to Purchases A/c (at cost).\n- **Goods lost by fire or theft, or given as free samples:** Loss (or Advertisement) A/c Dr to Purchases A/c; an insurance claim admitted is debited separately.\n- **Opening entry:** assets Dr, liabilities and capital Cr; capital = assets − liabilities.\n- **Closing (transfer) entries:** for example Trading A/c Dr to Purchases A/c.\n- **Rectifying entries:** the wrong account is credited and the right one debited.\n\nEvery entry carries a narration.',
      terms: [
        ['Drawings', 'Goods or money taken by the proprietor for personal use.'],
        ['Bad debt', 'An amount due from a debtor that cannot be recovered.'],
        ['Opening entry', 'The entry that brings the old balances into new books.'],
        ['Rectifying entry', 'An entry that corrects an error made earlier.'],
      ],
      v: vJpWhat,
      vs: [vJp3, vJpDraw, vOpen, vClose],
    },
    {
      h: '7. Posting from the special books to the ledger',
      t: [2, 3, 4],
      b: 'Posting follows one pattern:\n\n- The **personal account** gets **each** invoice or note (the debit or credit of the party).\n- The **goods account** gets the **book total** (or each column total) once, with the particulars "Sundries as per the book".\n- The **journal proper** has no total: each entry is posted to every account it names.\n\nThe folio in the ledger names the source and page: **PB** purchases book, **SB** sales book, **PRB** purchases return book, **SRB** sales return book, **J** journal proper. A check at the end: the total posted to the personal accounts equals the total posted to the goods accounts equals the book total.',
      terms: [
        ['Folio', 'A reference to the book and page from which an item was posted.'],
        ['Sundries', 'The word written when several accounts stand on the other side.'],
      ],
      v: vPostRule,
      vs: [vJor1, vVin, vRavi, vSfTotals],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts, Section A)**\n- 1 mark: one correct option, the issuer of a debit or credit note, or the book of first entry.\n- 2 marks: the meaning of the imprest system, a distinction between a debit and a credit note, or two journal proper entries with narration.\n- 3 marks: a purchases, sales or returns book from invoices, a supplier\'s or customer\'s account posted and balanced, or three journal proper entries.\n- 5 marks: an analytical petty cash book with the reimbursement, a columnar day book with its posting, or a mixed list of transactions sorted into books with the journal proper entries.\n\n**Step marks** usually go for each correct net amount, each column or book total, each account posted on its correct side, the balance carried down, and the narration.\n\n**Common mistakes**\n- Entering list price instead of the net amount after trade discount.\n- Putting a cash purchase, or the credit purchase of furniture, in the purchases book.\n- Letting the analysis columns of the petty cash book disagree with the Total column.\n- Reimbursing the imprest instead of the amount spent.\n- Mixing up the debit note (buyer) and the credit note (seller), or posting the returns to the wrong side.\n- Forgetting to credit Purchases when goods are withdrawn by the proprietor or lost.',
});

// ================================================================ flashcards
const F = cards([
  ['**Special purpose book**', 'A subsidiary book in which transactions of one kind are recorded; its total is posted to the ledger.', 'definition', 1],
  ['Why are special books kept?', 'They save time and posting work, allow division of labour and make checking easier.', 'concept', 1],
  ['**Petty cash**', 'Small cash kept by the petty cashier for minor payments such as postage, fares and refreshments.', 'definition', 1],
  ['**Imprest system**', 'The petty cashier gets a fixed sum; at the period end the amount spent is reimbursed, restoring the sum.', 'definition', 1],
  ['**Imprest**', 'The fixed sum given to the petty cashier at the start of a period.', 'definition', 1],
  ['**Analytical petty cash book**', 'A petty cash book with a Total column and an analysis column for each head of expense.', 'definition', 1],
  ['How is a voucher for two heads entered?', 'Full amount in the Total column; split between the two analysis columns.', 'fact', 1],
  ['Cash received by the petty cashier at the start', 'Imprest − balance already in hand.', 'exam-tip', 1],
  ['Balance carried down in the petty cash book', 'Imprest − total payments.', 'exam-tip', 1],
  ['Amount reimbursed at the period end', 'Equal to the total payments.', 'exam-tip', 1],
  ['Posting of the petty cash book', 'Each expense account debited with its column total; Cash credited with the reimbursement.', 'concept', 1],
  ['**Purchases book**', 'Subsidiary book of credit purchases of goods, written from the invoices received.', 'definition', 2],
  ['**Sales book**', 'Subsidiary book of credit sales of goods, written from copies of invoices sent.', 'definition', 2],
  ['Which purchases are left out of the purchases book?', 'Cash purchases (cash book) and purchases of assets on credit (journal proper).', 'fact', 2],
  ['**Trade discount**', 'Deduction from the list price shown on the invoice; not recorded in any account.', 'definition', 2],
  ['Amount entered in the purchases or sales book', 'List price − trade discount (the net amount).', 'exam-tip', 2],
  ['Is cash discount entered in the purchases book?', 'No. It depends on prompt payment and is recorded in the cash book.', 'concept', 2],
  ['**Columnar day book**', 'A day book with a column for each class of goods and a total column.', 'definition', 2],
  ['Check on a columnar book', 'The column totals add up to the total column.', 'exam-tip', 2],
  ['Posting of the purchases book', 'Each invoice to the credit of the supplier; the total to the debit of Purchases A/c.', 'concept', 2],
  ['Posting of the sales book', 'Each invoice to the debit of the customer; the total to the credit of Sales A/c.', 'concept', 2],
  ['**Debit note**', 'Issued by the buyer to the supplier when goods are returned.', 'definition', 3],
  ['**Credit note**', 'Issued by the seller to the customer when goods are taken back.', 'definition', 3],
  ['Purchases return book: posting', 'Each note debits the supplier; the total credits Purchases Return A/c.', 'concept', 3],
  ['Sales return book: posting', 'Each note credits the customer; the total debits Sales Return A/c.', 'concept', 3],
  ['At what value is a return entered?', 'Net value of the goods, after the same trade discount as the invoice.', 'exam-tip', 3],
  ['Net purchases and net sales', 'Purchases − purchases returns; sales − sales returns.', 'concept', 3],
  ['Entries recorded in the **journal proper**', 'Assets bought or sold on credit, bad debts, drawings of goods, losses, opening, closing and rectifying entries.', 'fact', 4],
  ['Entry for goods taken by the proprietor', 'Drawings A/c Dr to Purchases A/c (at cost).', 'exam-tip', 4],
  ['Entry for a bad debt written off', 'Bad Debts A/c Dr to the debtor\'s account.', 'exam-tip', 4],
  ['Entry for the credit purchase of an asset', 'Asset A/c Dr to the supplier\'s account (journal proper).', 'exam-tip', 4],
  ['Capital in the opening entry', 'Assets − liabilities; credited as the balancing figure.', 'concept', 4],
]);
check(F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Petty Cash Book and Other Special Purpose Books',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_pc_reimburse', 'm_pb_net', 'm_dn_who', 'm_jp_drawings', 'ar_pb_machinery'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s2_pc_imprest_why', { attempt: 1, keys: ['s2_dn_cn_distinguish', 's2_jp_meaning'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show books, accounts and entries in proper form.', items: ['s3_pb_simple', { attempt: 1, keys: ['s3_prb_book', 's3_jp_three_entries'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the book in proper form.', items: ['l5_pc_book'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Petty Cash Book and Other Special Purpose Books',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_pc_compound', 'm_pc_posting', 'm_td_book', 'm_cash_discount', 'm_columnar_use', 'm_cn_who', 'm_ret_net', 'm_jp_bad', 'm_rect_entry', 'm_post_folio', 'ar_imprest', 'ar_return_false'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_pc_analytical', 's2_pb_excluded', { attempt: 1, keys: ['s2_return_effect', 's2_jp_drawings_samples'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show books, accounts and entries in proper form.', items: ['s3_pc_posting', 's3_sb_columnar', 's3_srb_book', { attempt: 1, keys: ['s3_return_account', 's3_open_close'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare books, accounts and entries in proper form.', items: ['l5_sb_ledger', { attempt: 1, keys: ['l5_returns_both', 'l5_route_mixed'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [deck1, deck2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
for (const d of nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 })) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks.
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([deck1, deck2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === 6, `deck check count ${deckChecks.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [deck1, deck2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 of isc-11-accounts-ch06 (analytical petty cash book and the imprest system with reimbursement, balancing and posting of column totals; purchases and sales day books, simple and columnar, credit transactions in goods only with trade discount deducted; purchases return and sales return books with debit and credit notes; journal proper entries and posting from the special books to the ledger); the removed topic (GST in the returns books) and all GST transactions are not used; the cash book is Chapter 5',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms and figures differ from the CBSE 11 Accountancy special purpose books chapter and from the ISC 11 Accounts chapters 3 and 4',
    data: 'every book generated by books.mjs pettyCash()/dayBook()/Ledger from the transaction lists; analysis columns, column totals, trade discount, imprest restoration, postings to personal and goods accounts and every journal entry asserted; every ledger closes with c/d and b/d',
    facts: 'ISC Accountancy (858) Class XI Unit 3 Journal, Ledger and Trial Balance: petty cash book, purchases and sales books, returns books, journal proper; GST transactions are not examined',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
