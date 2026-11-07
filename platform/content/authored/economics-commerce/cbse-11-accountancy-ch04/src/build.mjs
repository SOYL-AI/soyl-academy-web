// Build CBSE 11 Accountancy ch04 Recording of Transactions II: Special Purpose Books. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { rupees } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch04', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { same, check, sum, inr, rs, journal, CB, CBW, OD, OD_AMT, PC, PB, SB, PR, SR, GT, OPEN, OPEN_J, JP, RATE } = await import('./figures.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ figures (SVG)
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  lines.forEach((t, i) => s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size: o.size ?? 13, bold: o.bold && i === 0 }));
};

const vTree = (() => {
  const s = new Svg(700, 290);
  box(s, 350, 28, 300, 34, 'Special purpose books', { size: 15, bold: true, fill: 'accent' });
  const kids = [
    [['Cash', 'book'], ['Cash and bank', 'receipts and', 'payments']],
    [['Petty cash', 'book'], ['Small payments', 'on the imprest', 'system']],
    [['Purchases', 'book'], ['Credit', 'purchases', 'of goods']],
    [['Sales', 'book'], ['Credit sales', 'of goods']],
    [['Purchases', 'return book'], ['Goods returned', 'to suppliers', 'debit note']],
    [['Sales', 'return book'], ['Goods returned', 'by customers', 'credit note']],
    [['Journal', 'proper'], ['Entries fitting', 'no other book']],
  ];
  kids.forEach(([head, desc], i) => {
    const x = 55 + i * 98;
    s.line(350, 45, x, 92, { sw: 1.4, color: 'muted' });
    box(s, x, 118, 92, 50, head, { size: 12, bold: true, fill: 'accent', gap: 16 });
    s.line(x, 143, x, 175, { sw: 1.2, color: 'muted' });
    box(s, x, 218, 92, 70, desc, { size: 11, gap: 16 });
  });
  return s.visual('Tree of special purpose books: cash book for cash and bank receipts and payments; petty cash book for small payments on the imprest system; purchases book for credit purchases of goods; sales book for credit sales of goods; purchases return book for goods returned to suppliers with a debit note; sales return book for goods returned by customers with a credit note; journal proper for entries that fit no other book', 'One book for each kind of transaction.');
})();

const vFormat = (() => {
  const s = new Svg(700, 300);
  s.text(350, 18, 'Format of a two-column cash book', { size: 14, bold: true });
  const cols = [['Date', 50], ['Particulars', 110], ['L.F.', 40], ['Cash', 50], ['Bank', 50]];
  const rowsL = [['Jun 1', 'To Balance b/d', '', '20,000', '60,000'], ['Jun 7', 'To Cash A/c (C)', '', '', '10,000'], ['Jun 12', 'To Bank A/c (C)', '', '6,000', '']];
  const rowsR = [['Jun 5', 'By Rent A/c', '', '', '8,000'], ['Jun 7', 'By Bank A/c (C)', '', '10,000', ''], ['Jun 30', 'By Balance c/d', '', '', '']];
  const drawSide = (x0, title, rows) => {
    s.rect(x0, 36, 300, 26, { fill: 'accent', color: 'accent', sw: 1.2, rx: 4 });
    s.text(x0 + 150, 49, title, { size: 13, bold: true });
    let x = x0;
    cols.forEach(([h, w]) => {
      s.rect(x, 66, w, 26, { fill: 'fill', color: 'accent', sw: 1.2, rx: 0 });
      s.text(x + w / 2, 79, h, { size: 12, bold: true });
      x += w;
    });
    rows.forEach((r, ri) => {
      let xx = x0;
      cols.forEach(([, w], ci) => {
        s.rect(xx, 92 + ri * 30, w, 30, { fill: 'none', color: 'muted', sw: 1, rx: 0 });
        if (r[ci]) s.text(xx + w / 2, 107 + ri * 30, r[ci], { size: 10 });
        xx += w;
      });
    });
    let xx = x0;
    cols.forEach(([, w], ci) => {
      s.rect(xx, 182, w, 30, { fill: 'fill', color: 'accent', sw: 1.2, rx: 0 });
      if (ci === 1) s.text(xx + w / 2, 197, 'Total', { size: 12, bold: true });
      xx += w;
    });
  };
  drawSide(20, 'Dr: Receipts', rowsL);
  drawSide(380, 'Cr: Payments', rowsR);
  s.text(350, 240, 'Cash column: balance is always debit or nil.', { size: 12 });
  s.text(350, 262, 'Bank column: debit balance, or credit balance (overdraft).', { size: 12 });
  s.text(350, 284, 'Contra entries (C) appear on both sides.', { size: 12 });
  return s.visual('Format of a two-column cash book: debit side for receipts and credit side for payments, each with columns date, particulars, ledger folio, cash and bank, and a totals row; sample lines show a balance brought down, a contra deposit and a contra withdrawal marked C, rent paid by cheque and a balance carried down', 'Receipts on the left, payments on the right, two money columns on each side.');
})();

const vContra = (() => {
  const s = new Svg(680, 250);
  box(s, 110, 125, 150, 140, ['Cash', 'column'], { size: 16, bold: true, fill: 'accent', gap: 22 });
  box(s, 570, 125, 150, 140, ['Bank', 'column'], { size: 16, bold: true, fill: 'accent', gap: 22 });
  s.arrow(190, 90, 490, 90, { sw: 2 });
  s.text(340, 38, 'Cash deposited into the bank', { size: 13, bold: true });
  s.text(340, 58, 'Cash column credit, bank column debit (C)', { size: 12 });
  s.arrow(490, 165, 190, 165, { sw: 2 });
  s.text(340, 192, 'Cash withdrawn for office use', { size: 13, bold: true });
  s.text(340, 212, 'Cash column debit, bank column credit (C)', { size: 12 });
  return s.visual('Contra entry flow: cash deposited into the bank is a credit in the cash column and a debit in the bank column, marked C; cash withdrawn from the bank for office use is a debit in the cash column and a credit in the bank column, marked C', 'Money moves between the two columns; each move is written twice, once on each side.');
})();

const vCycle = (() => {
  const s = new Svg(680, 290);
  box(s, 140, 65, 230, 60, ['Head cashier gives', 'the imprest'], { size: 14, bold: true, gap: 20 });
  box(s, 540, 65, 230, 60, ['Petty cashier pays', 'against vouchers'], { size: 14, bold: true, gap: 20 });
  box(s, 540, 225, 230, 60, ['Payments totalled,', 'balance found'], { size: 14, bold: true, gap: 20 });
  box(s, 140, 225, 230, 60, ['Head cashier reimburses', 'the amount spent'], { size: 14, bold: true, gap: 20 });
  s.arrow(255, 65, 425, 65, { sw: 2 });
  s.arrow(540, 95, 540, 195, { sw: 2 });
  s.arrow(425, 225, 255, 225, { sw: 2 });
  s.arrow(140, 195, 140, 95, { sw: 2 });
  s.text(340, 135, 'Fixed float', { size: 15, bold: true });
  s.text(340, 157, 'restored every period', { size: 13 });
  return s.visual('Petty cash imprest cycle: the head cashier gives the imprest, the petty cashier pays small expenses against vouchers, payments are totalled and the balance found, and the head cashier reimburses the amount spent, which restores the fixed float', 'The same fixed amount starts every period.');
})();

const vSource = (() => {
  const s = new Svg(730, 330);
  const rows = [
    ['Cash memo, cheque, pay-in slip', 'Cash book'],
    ['Petty cash voucher', 'Petty cash book'],
    ['Purchase invoice (credit)', 'Purchases book'],
    ['Sales invoice (credit)', 'Sales book'],
    ['Debit note', 'Purchases return book'],
    ['Credit note', 'Sales return book'],
    ['Memo, asset bill, other note', 'Journal proper'],
  ];
  rows.forEach(([d, b], i) => {
    const y = 38 + i * 42;
    box(s, 130, y, 230, 32, d, { size: 12, fill: 'none', color: 'muted' });
    s.arrow(245, y, 285, y, { sw: 1.6 });
    box(s, 400, y, 220, 32, b, { size: 12, bold: true });
    s.arrow(510, y, 595, 191, { sw: 1.2 });
  });
  box(s, 650, 191, 110, 270, ['Ledger', 'accounts'], { size: 14, bold: true, fill: 'accent', gap: 22 });
  s.text(130, 12, 'Source document', { size: 12, bold: true });
  s.text(400, 12, 'Book of original entry', { size: 12, bold: true });
  return s.visual('Flow from source document to book: cash memo, cheque or pay-in slip to the cash book; petty cash voucher to the petty cash book; credit purchase invoice to the purchases book; credit sales invoice to the sales book; debit note to the purchases return book; credit note to the sales return book; other memos to the journal proper; all books are then posted to the ledger accounts', 'Each document has one home, and every book is posted to the ledger.');
})();

// ================================================================ tables for slides
const T = (headers, rows, alt) => table(headers, rows, alt);
const vWhy = T(['Advantage', 'What it means'], [
  ['Division of work', 'Different clerks keep different books at the same time'],
  ['Specialisation', 'Each clerk becomes skilled in one kind of entry'],
  ['Saving of time', 'Like transactions are together and totals are posted once'],
  ['Easy reference', 'A transaction of one kind is found in one book'],
], 'Table of four advantages of special purpose books: division of work, specialisation, saving of time and easy reference');
const vKinds = T(['Cash book', 'Cash column', 'Cash and bank columns', 'Petty cash book'], [
  ['Records', 'Cash receipts and payments', 'Cash and bank receipts and payments', 'Small payments on the imprest system'],
  ['Balance', 'Debit or nil', 'Cash: debit or nil. Bank: debit or credit (overdraft)', 'Debit: the balance of the imprest not yet spent'],
], 'Table of the simple cash book, the cash book with a bank column and the petty cash book: what each records and what kind of balance it can show');
const vBankItems = T(['Transaction', 'Side', 'Column'], [
  ['Cheque received and deposited the same day', 'Debit', 'Bank'],
  ['Payment by cheque', 'Credit', 'Bank'],
  ['Bank charges', 'Credit', 'Bank'],
  ['Interest credited by the bank', 'Debit', 'Bank'],
  ['Overdraft at the end of the period', 'Credit balance carried down on the debit side', 'Bank'],
], 'Table of bank column items: cheque deposited is a debit, payment by cheque a credit, bank charges a credit, interest credited a debit, and an overdraft is a credit balance');
const vCB = T(CB.headers, CB.rows, `Two-column cash book of Anvi Traders for June: opening cash ${inr(20000)} and bank ${inr(60000)}; closing cash ${inr(CB.cash)} and bank ${inr(CB.bank)} rupees; contra entries of ${inr(10000)} and ${inr(6000)} marked C`);
const vCBW = T(CBW.headers, CBW.rows, `Balancing table for Anvi Traders: cash column debits ${inr(CB.dr.cash)}, credits ${inr(CB.cr.cash)}, balance ${inr(CB.cash)}; bank column debits ${inr(CB.dr.bank)}, credits ${inr(CB.cr.bank)}, balance ${inr(CB.bank)} rupees`);
const vOD = T(OD.headers, OD.rows, `Two-column cash book of Mehta Hardware for July with an opening bank overdraft of ${inr(12000)} rupees and a closing overdraft of ${inr(OD_AMT)} rupees carried down on the debit side; closing cash ${inr(OD.cash)} rupees`);
const vPCfmt = T(['Column', 'What it holds'], [
  ['Receipts', 'The imprest received and any balance brought down'],
  ['Date and particulars', 'When and what the payment was for, with the voucher'],
  ['Total payments', 'Every payment of the period'],
  ['Postage, stationery, conveyance, cartage, sundries', 'The same payment again, under its head'],
  ['Totals', 'The analysis columns add up to the total payments column'],
], 'Table of the columns of an analytical petty cash book and what each holds');
const vPC = T(PC.headers, PC.rows, `Analytical petty cash book of Naman Printers: imprest ${inr(2000)} rupees; payments ${inr(PC.spent)} rupees, of which postage ${inr(PC.byHead.postage)}, stationery ${inr(PC.byHead.stationery)}, conveyance ${inr(PC.byHead.conveyance)}, cartage ${inr(PC.byHead.cartage)}, sundries ${inr(PC.byHead.sundries)}; balance ${inr(PC.closing)} rupees and reimbursement ${inr(PC.reimburse)} rupees`);
const vSum1 = T(['Topic', 'Key points'], [
  ['Special purpose books', 'Division of work, specialisation, saving of time, easy reference'],
  ['Cash book', 'Journal and ledger together; receipts on the debit side, payments on the credit side; cash balance never credit'],
  ['Bank column', 'Contra entries marked C; cheques; bank charges; overdraft is a credit balance'],
  ['Petty cash book', 'Imprest system; analysis columns; reimbursement restores the imprest'],
], 'Summary table of special purpose books, the cash book, the bank column and the petty cash book');
const vTips1 = T(['Do', 'Why'], [
  ['Write contra entries on both sides and mark them C', 'A contra entry written once leaves the columns out of balance'],
  ['Total and balance each column separately', 'Cash and bank are balanced independently'],
  ['Check that the cash balance is a debit', 'A credit cash balance signals an error'],
  ['Check analysis columns against the total column', 'It catches a missed or misplaced voucher'],
], 'Exam tips table for the cash book and the petty cash book');

const vPbFmt = T(['Column', 'What goes in'], [
  ['Date', 'Date of the invoice'],
  ['Invoice number', 'Number of the supplier invoice'],
  ['Name of supplier', 'The supplier who is credited'],
  ['L.F.', 'Ledger folio of the supplier account after posting'],
  ['Amount', 'Net amount after trade discount (and tax columns when tax is charged)'],
], 'Table of the format of the purchases book: date, invoice number, name of supplier, ledger folio and amount');
const vTd = flow('LR', ['List price', 'Less trade discount', 'Net amount recorded', 'Add tax at the stated rate', 'Invoice total'], 'Flow from list price to invoice total: list price, less trade discount, net amount recorded in the book, add tax at the rate stated in the problem, invoice total', 'Only the net amount goes in the goods column.');
const vPBw = T(PB.workHeaders, PB.work, `Working for the purchases book of Anvi Traders: list prices ${inr(PB.totals.list)} rupees, trade discount ${inr(PB.totals.td)}, net ${inr(PB.totals.net)}, tax ${inr(PB.totals.tax)} at an imagined 12 per cent, invoice total ${inr(PB.totals.total)} rupees`);
const vPB = T(PB.headers, PB.rows, `Purchases book of Anvi Traders for July: net ${inr(PB.totals.net)}, CGST ${inr(PB.totals.cgst)}, SGST ${inr(PB.totals.sgst)}, IGST ${inr(PB.totals.igst)}, total ${inr(PB.totals.total)} rupees`);
const jPB = journal([{ dr: PB.posting.dr, cr: PB.posting.cr, note: 'Being the total of the purchases book posted' }]);
const jSB = journal([{ dr: SB.posting.dr, cr: SB.posting.cr, note: 'Being the total of the sales book posted' }]);
same(jPB.total, PB.totals.total, 'purchases book posting total');
same(jSB.total, SB.totals.total, 'sales book posting total');
const vPost = T(jPB.headers, jPB.rows, `Posting summary of the purchases book: debit Purchases ${inr(PB.totals.net)}, Input CGST ${inr(PB.totals.cgst)}, Input SGST ${inr(PB.totals.sgst)}, Input IGST ${inr(PB.totals.igst)}; credit the suppliers ${inr(PB.totals.total)} rupees in all`);
const vSB = T(SB.headers, SB.rows, `Sales book of Anvi Traders for July: net ${inr(SB.totals.net)}, CGST ${inr(SB.totals.cgst)}, SGST ${inr(SB.totals.sgst)}, IGST ${inr(SB.totals.igst)}, total ${inr(SB.totals.total)} rupees`);
const vPostSB = T(jSB.headers, jSB.rows, `Posting summary of the sales book: debit the customers ${inr(SB.totals.total)} rupees; credit Sales ${inr(SB.totals.net)}, Output CGST ${inr(SB.totals.cgst)}, Output SGST ${inr(SB.totals.sgst)}, Output IGST ${inr(SB.totals.igst)}`);
const vRet = T(['Point', 'Debit note', 'Credit note'], [
  ['Issued by', 'The buyer, who returns goods', 'The seller, who takes goods back'],
  ['Sent to', 'The supplier', 'The customer'],
  ['Says that', 'The supplier is debited', 'The customer is credited'],
  ['First recorded in', 'Purchases return book', 'Sales return book'],
], 'Table comparing a debit note and a credit note: who issues each, to whom, what it says and the book in which it is recorded');
const vReturns = T(['Book', 'Note', 'Party', 'Net (₹)', 'CGST (₹)', 'SGST (₹)', 'Total (₹)'], [
  ['Purchases return', PR.entries[0].no, PR.entries[0].party, inr(PR.totals.net), inr(PR.totals.cgst), inr(PR.totals.sgst), inr(PR.totals.total)],
  ['Sales return', SR.entries[0].no, SR.entries[0].party, inr(SR.totals.net), inr(SR.totals.cgst), inr(SR.totals.sgst), inr(SR.totals.total)],
], `Returns books of Anvi Traders: debit note to Kishore Suppliers for ${inr(PR.totals.net)} plus tax, total ${inr(PR.totals.total)} rupees; credit note from Lalit Agencies for ${inr(SR.totals.net)} plus tax, total ${inr(SR.totals.total)} rupees`);
const vGT = T(['Tax', 'Output after returns (₹)', 'Input after returns (₹)', 'Payable (₹)'], GT.rows, `Tax position of Anvi Traders for July after returns: CGST payable ${inr(GT.cgstPay)}, SGST payable ${inr(GT.sgstPay)}, IGST payable ${inr(GT.igstPay)} rupees`);
const vJPwhat = T(['Kind of entry', 'Example (imagined firm)', 'Entry'], [
  ['Opening entry', 'Balances brought forward on 1 April', 'Assets Dr, to liabilities and Capital'],
  ['Credit purchase of an asset', 'Furniture bought on credit', 'Furniture Dr, to the supplier'],
  ['Adjustment', 'Rent due for the month', 'Rent Dr, to Outstanding Rent'],
  ['Rectification', 'Furniture wrongly debited to Purchases', 'Furniture Dr, to Purchases'],
  ['Transfer', 'Drawings closed into capital', 'Capital Dr, to Drawings'],
  ['Goods for personal use', 'Owner takes goods', 'Drawings Dr, to Purchases'],
  ['Goods given away', 'Charity or free samples', 'Charity or Advertisement Dr, to Purchases'],
  ['Goods lost by fire', 'Stock destroyed', 'Loss by Fire Dr, to Purchases'],
], 'Table of journal proper entries: opening entry, credit purchase of an asset, adjustment, rectification, transfer, goods for personal use, goods given away and goods lost by fire, each with an example and the entry');
const vJP = T(JP.headers, JP.rows, `Journal proper of Kavya Stores for April: furniture bought on credit for ${inr(50400)} rupees including tax, drawings ${inr(6000)}, charity ${inr(3500)}, free samples ${inr(2000)} and loss by fire ${inr(18000)}`);
const vOpen = T(OPEN_J.headers, OPEN_J.rows, `Opening entry of Kavya Stores: assets of ${inr(OPEN.totalA)} rupees debited; creditors ${inr(35000)}, bank loan ${inr(50000)} and capital ${inr(OPEN.capital)} credited`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Purchases and sales books', 'Credit transactions in goods only, at the net amount after trade discount; tax columns at the stated rate'],
  ['Returns books', 'Debit note to the supplier, credit note to the customer; tax is reversed at the same rate'],
  ['Posting', 'Totals of each book are posted to the ledger; debits equal credits'],
  ['Journal proper', 'Everything else: opening, rectification, adjustment, transfer, drawings, charity and loss'],
], 'Summary table of the purchases, sales and returns books, posting and the journal proper');
const vTips2 = T(['Do', 'Why'], [
  ['Deduct trade discount before entering the amount', 'Only the net amount is recorded'],
  ['Compute tax on the net amount at the rate given', 'Tax is not charged on the discount'],
  ['Use IGST for another state, CGST and SGST for the same state', 'The two cases never mix on one invoice'],
  ['Credit Purchases when goods leave without a sale', 'Drawings, charity and fire loss all use this rule'],
], 'Exam tips table for the purchases, sales and returns books and the journal proper');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Special Purpose Books — Part 1: Cash Book and Petty Cash Book',
  goals: [
    'State why special purpose books are used and which book records which transaction',
    'Prepare a cash book with a bank column, including contra entries, cheques, bank charges and an overdraft',
    'Prepare an analytical petty cash book on the imprest system and restore the imprest',
  ],
  slides: [
    sl('title', 'Special purpose books: the cash book and the petty cash book', {
      b: 'Part 1: why a business keeps **special purpose books**, the **cash book** with a bank column, and the **petty cash book**.',
      v: vTree,
      n: 'Welcome to the chapter on special purpose books. A business with hundreds of transactions cannot record them all in a single journal. So it keeps separate books for cash, small payments, purchases, sales and returns, and a journal proper for everything else. In this part we study the cash book with a bank column and the petty cash book, using imagined firms.',
    }),
    sl('concept', 'Why special purpose books', {
      b: 'Each book collects **one kind** of transaction.',
      v: vWhy,
      n: 'Special purpose books save effort in four ways. Division of work lets different clerks keep different books. Specialisation makes each clerk skilled in one kind of entry. Time is saved because like transactions are together and their totals can be posted at once. And a transaction is easy to find when it is needed. All of this is hard with one journal.',
    }),
    sl('diagram', 'From source document to book', {
      v: vSource,
      n: 'Every book starts from a source document. Cash memos, cheques and pay in slips go to the cash book. Petty cash vouchers go to the petty cash book. Purchase invoices go to the purchases book and sales invoices to the sales book. Debit notes and credit notes go to the return books. Anything else goes to the journal proper. Totals from these books are then posted to the ledger.',
    }),
    sl('concept', 'The cash book', {
      b: 'The cash book is a book of **original entry** and also the **cash account** of the ledger. Receipts go on the debit side; payments on the credit side.',
      v: vKinds,
      n: 'The cash book is both a book of original entry and a ledger account. Receipts go on the debit side and payments on the credit side. A simple cash book has one column for cash, and its balance is always a debit balance or nil. A cash book with a bank column has two money columns, cash and bank. Small payments are kept in a separate petty cash book.',
    }),
    sl('diagram', 'Format of the two-column cash book', {
      v: vFormat,
      n: 'Here is the format of a two column cash book. The debit side holds receipts and the credit side holds payments. Each side has date, particulars, ledger folio and two money columns, one for cash and one for bank. Both sides are totalled and balanced column by column. The balance is carried down, and brought down again at the start of the next period.',
    }),
    sl('concept', 'Contra entries', {
      b: 'A **contra entry** affects both the cash and bank columns, so it appears on **both sides** and is marked **C**.',
      v: vContra,
      n: 'A contra entry is a transaction between cash and bank, so both columns are affected and the entry appears on both sides of the same book. When cash is deposited into the bank, the cash column is credited and the bank column is debited. When cash is withdrawn from the bank for office use, the cash column is debited and the bank column is credited. Each line is marked with the letter C.',
    }),
    sl('check', 'Quick check: spot the contra entry', {
      b: 'One of four transactions is a contra entry.',
      chk: 'm_contra_which',
      n: 'Read the four transactions. Which one moves money between the cash column and the bank column, so that it appears on both sides of the cash book? Eliminate the ones that touch only one column.',
    }),
    sl('concept', 'Cheques, bank charges and overdraft', {
      v: vBankItems,
      n: 'Here are the other bank column items. A cheque received from a customer and deposited is a debit in the bank column. A payment by cheque is a credit in the bank column. Bank charges are a credit, and interest credited by the bank is a debit. If the bank column ends with a credit balance, the account is overdrawn. The cash column can never show a credit balance.',
    }),
    sl('example', 'Worked example 1: Anvi Traders, June', {
      b: '**Anvi Traders**, an imagined firm: opening cash ₹20,000, bank ₹60,000. Eleven transactions in June, including two contra entries.',
      bl: [`Deposit of cash into the bank: **${rs(10000)}** (C).`, `Withdrawal from the bank for office use: **${rs(6000)}** (C).`, 'Receipts on the debit side, payments on the credit side.'],
      v: vCB,
      n: `Anvi Traders started June with ${rupees(20000)} in cash and ${rupees(60000)} at the bank. It had eleven transactions, including two contra entries, a deposit of ${rupees(10000)} and a withdrawal of ${rupees(6000)}. Receipts go on the debit side and payments on the credit side, in the cash column or the bank column as the transaction requires.`,
    }),
    sl('example', 'Worked example 2: balancing the columns', {
      b: 'Total each column on both sides; the **difference** is the balance carried down.',
      bl: [`Cash: ${inr(CB.dr.cash)} − ${inr(CB.cr.cash)} = **${rs(CB.cash)}** (debit).`, `Bank: ${inr(CB.dr.bank)} − ${inr(CB.cr.bank)} = **${rs(CB.bank)}** (debit).`],
      v: vCBW,
      n: `To balance the cash column, add each side. Receipts, with the opening balance, total ${rupees(CB.dr.cash)}, and payments total ${rupees(CB.cr.cash)}. The difference, ${rupees(CB.cash)}, is carried down on the credit side. In the bank column the debits are ${rupees(CB.dr.bank)} and the credits ${rupees(CB.cr.bank)}, so the balance is ${rupees(CB.bank)}.`,
    }),
    sl('check', 'Quick check: closing cash', {
      b: 'Find the closing cash of a small shop in August.',
      chk: 'n_cb_cash',
      n: 'Work with the cash column only. Start with the opening cash, add the cash receipts, add any cash withdrawn from the bank, and then subtract the cash payments and the cash deposited into the bank. Cheques belong to the bank column.',
    }),
    sl('example', 'Worked example 3: a bank overdraft', {
      b: '**Mehta Hardware**, an imagined shop, starts July with cash ₹5,000 and a bank **overdraft** of ₹12,000 (a credit balance).',
      bl: ['The opening overdraft is on the **credit** side of the bank column.', 'If credits exceed debits, the overdraft is carried down on the **debit** side.'],
      v: vOD,
      n: `Mehta Hardware began July with ${rupees(5000)} in cash and an overdraft of ${rupees(12000)}, which is a credit balance in the bank column. By the end of the month the credits in the bank column exceed the debits, so the overdraft has grown to ${rupees(OD_AMT)}. It is carried down on the debit side. The cash balance is ${rupees(OD.cash)}.`,
    }),
    sl('check', 'Quick check: which balance?', {
      b: 'Fill in the blanks about the two balances.',
      chk: 'fb_cb',
      n: 'Recall which kind of balance each column can show. Cash can never be negative. But the bank column can show the opposite kind of balance, when the bank lends the firm money.',
    }),
    sl('diagram', 'Petty cash and the imprest system', {
      b: 'The head cashier gives a **fixed sum**; the amount spent is **reimbursed**.',
      v: vCycle,
      n: 'Petty cash covers small payments such as stamps, fares and tea. Under the imprest system the head cashier gives the petty cashier a fixed amount. The petty cashier pays small expenses against vouchers. At the end of the period the payments are totalled and the balance found. The head cashier then reimburses exactly the amount spent, so the fixed amount is restored.',
    }),
    sl('concept', 'The analytical petty cash book', {
      v: vPCfmt,
      n: 'An analytical petty cash book has a receipts column on the left, then the date, the particulars, a total payments column, and analysis columns. The usual heads are postage, stationery, conveyance, cartage and sundries. Each payment is entered in the total column and again under its head. The analysis columns together must add up to the total payments column.',
    }),
    sl('example', 'Worked example 4: Naman Printers, one week', {
      b: '**Naman Printers**, an imagined press, imprest ₹2,000; ten vouchers from 8 to 13 June.',
      bl: [`Spent: **${rs(PC.spent)}**; balance c/d: **${rs(PC.closing)}**.`, `Reimbursed on 15 June: **${rs(PC.reimburse)}**, so the float is again ${rs(2000)}.`],
      v: vPC,
      n: `Naman Printers, an imagined press, has an imprest of ${rupees(2000)}. In the week it spent ${rupees(PC.byHead.postage)} on postage, ${rupees(PC.byHead.stationery)} on stationery, ${rupees(PC.byHead.conveyance)} on conveyance, ${rupees(PC.byHead.cartage)} on cartage and ${rupees(PC.byHead.sundries)} on sundries, ${rupees(PC.spent)} in all. The balance is ${rupees(PC.closing)}. The head cashier reimburses ${rupees(PC.reimburse)}.`,
    }),
    sl('check', 'Quick check: the imprest cycle', {
      b: 'Put the steps of one imprest cycle in order.',
      chk: 'ord_imprest',
      n: 'Think about who acts first, who pays the small expenses, and when the balance is found. The reimbursement comes only after the payments have been totalled.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['Special purpose books give division of work, specialisation, saving of time and easy reference.', 'The cash book is both journal and ledger; cash is never a credit balance.', 'Contra entries are written on both sides and marked C; an overdraft is a credit balance in the bank column.', 'Petty cash on the imprest system: reimburse the amount spent.'],
      v: vSum1,
      n: 'To sum up. Special purpose books divide the work and save time. The cash book is both a journal and a ledger, and its cash column never shows a credit balance. A cash book with a bank column uses contra entries, written on both sides, and shows an overdraft as a credit balance in the bank column. In petty cash on the imprest system, the amount spent is reimbursed, and the float is restored.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write each contra entry on both sides and mark it C.', 'Balance the cash and bank columns separately; a credit cash balance means an error.', 'In petty cash, make the analysis columns agree with the total column.'],
      v: vTips1,
      n: 'In the examination, write each contra entry on both sides and mark it with the letter C. Balance the cash column and the bank column separately. If the cash column shows a credit balance, look for a mistake. In a petty cash book, check that the analysis columns add up to the total payments column, and show the reimbursement that restores the imprest.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Special Purpose Books — Part 2: Purchases, Sales, Returns and Journal Proper',
  goals: [
    'Record credit purchases and sales of goods at the net amount after trade discount, with tax at an imagined rate',
    'Record returns through debit notes and credit notes and post the totals of each book',
    'Pass journal proper entries for opening, rectification, adjustment, drawings, charity, free samples and loss by fire',
  ],
  slides: [
    sl('title', 'Purchases, sales and returns books; the journal proper', {
      b: 'Part 2: the books for **credit purchases and sales of goods**, their **returns**, and the **journal proper**.',
      v: vPbFmt,
      n: 'In this part we study the books for credit purchases and credit sales of goods, and for goods returned. We see how trade discount and goods and services tax appear in them at an imagined rate. We then study the journal proper, where all the entries that fit no special book are made. All firms and figures are imagined.',
    }),
    sl('concept', 'The purchases book', {
      b: 'Only **credit purchases of goods**, at the **net amount** after trade discount.',
      v: vPbFmt,
      n: 'The purchases book records only credit purchases of goods that the firm deals in. Its format has the date, the invoice number, the name of the supplier, the ledger folio and the amount. Cash purchases go to the cash book, and assets bought on credit go to the journal proper. The ledger folio is filled in after the supplier account has been posted.',
    }),
    sl('concept', 'Trade discount and the net amount', {
      b: 'Trade discount is deducted on the invoice, so the books show **only the net amount**. Tax is computed on that net amount.',
      v: vTd,
      n: 'Trade discount is a reduction in the list price, allowed by the seller at the time of sale. It is deducted on the invoice, so the books record only the net amount. Goods and services tax, at the rate stated in the problem, is computed on that net amount and added to find the invoice total. Discount for early payment is a different thing, called cash discount.',
    }),
    sl('example', 'Worked example 1: from list price to invoice total', {
      b: `**Anvi Traders**, July. Tax at an **imagined rate of ${RATE}%**. Four invoices; the last is from another state.`,
      bl: ['Trade discount: list price × rate.', 'Tax: net amount × 12 / 100; split equally into CGST and SGST for the same state, or IGST for another state.'],
      v: vPBw,
      n: `Anvi Traders received four invoices in July. The list prices total ${rupees(PB.totals.list)}. After trade discount of ${rupees(PB.totals.td)}, the net amount is ${rupees(PB.totals.net)}. Tax at an imagined rate of twelve per cent is ${rupees(PB.totals.tax)}, so the invoices total ${rupees(PB.totals.total)}. The last invoice is from another state, so its tax is all integrated tax.`,
    }),
    sl('example', 'Worked example 2: the purchases book', {
      b: 'Only the **net** amounts go in the goods column; tax goes in its own columns.',
      bl: [`Net: **${rs(PB.totals.net)}**; CGST **${rs(PB.totals.cgst)}**; SGST **${rs(PB.totals.sgst)}**; IGST **${rs(PB.totals.igst)}**.`],
      v: vPB,
      n: `The purchases book of Anvi Traders shows each invoice with its net amount and its tax columns. The net amounts total ${rupees(PB.totals.net)}. Central tax is ${rupees(PB.totals.cgst)}, state tax is the same, and integrated tax is ${rupees(PB.totals.igst)}. The invoice total is ${rupees(PB.totals.total)}, which is what the firm owes its suppliers.`,
    }),
    sl('check', 'Quick check: net amount', {
      b: 'Find the net amount to be entered for an invoice.',
      chk: 'n_pb_net',
      n: 'Start from the list price. Work out the trade discount at the given per cent and subtract it. The tax does not change the net amount, because tax has its own columns.',
    }),
    sl('concept', 'Posting the purchases book', {
      b: 'As of 2024, tax paid on purchases is debited to **Input** tax accounts; the rate in each problem is imagined.',
      v: vPost,
      n: `At the end of the month the totals of the purchases book are posted. Purchases account is debited with the net total of ${rupees(PB.totals.net)}. The input tax accounts are debited with the tax. Each supplier is credited with the invoice totals. The debits and the credits both come to ${rupees(PB.totals.total)}. This dated note is as of two thousand twenty four.`,
    }),
    sl('concept', 'The sales book', {
      b: 'Credit **sales of goods** only, at the net amount after trade discount. Tax collected goes to **Output** tax accounts.',
      v: vSB,
      n: `The sales book is the mirror of the purchases book. It records credit sales of goods in which the firm deals, at the net amount after trade discount, with tax columns. Anvi Traders had four sales in July. The net amounts total ${rupees(SB.totals.net)}, central tax is ${rupees(SB.totals.cgst)}, integrated tax is ${rupees(SB.totals.igst)}, and the customers owe ${rupees(SB.totals.total)}.`,
    }),
    sl('example', 'Worked example 3: posting the sales book', {
      b: 'Customers are **debited**; Sales and the Output tax accounts are **credited**.',
      v: vPostSB,
      n: `To post the sales book, each customer is debited with the invoice total. Sales account is credited with the net total of ${rupees(SB.totals.net)}. The output tax accounts are credited with the tax collected. The debits and credits both total ${rupees(SB.totals.total)}. A credit sale of an old asset would not come here but to the journal proper.`,
    }),
    sl('check', 'Quick check: document and book', {
      b: 'Match each source document with its book.',
      chk: 'mt_docs',
      n: 'Think about who issues each document and what has happened to the goods. A bill for goods bought, a bill for goods sold, and the two notes for goods sent back or received back each have their own book.',
    }),
    sl('concept', 'Returns: debit notes and credit notes', {
      v: vRet,
      n: 'When goods are returned, the buyer sends the supplier a debit note, which says the supplier is debited. The return is recorded in the purchases return book. When a seller takes goods back, he sends the customer a credit note, which says the customer is credited. The return is recorded in the sales return book. Tax on the returned goods is reversed at the same rate.',
    }),
    sl('example', 'Worked example 4: the two returns books', {
      b: 'Anvi Traders: goods returned to **Kishore Suppliers** (debit note) and by **Lalit Agencies** (credit note).',
      bl: [`Purchases return: net ${rs(PR.totals.net)} + tax ${rs(PR.totals.tax)} = **${rs(PR.totals.total)}**.`, `Sales return: net ${rs(SR.totals.net)} + tax ${rs(SR.totals.tax)} = **${rs(SR.totals.total)}**.`],
      v: vReturns,
      n: `Anvi Traders returned goods to Kishore Suppliers. The net value was ${rupees(PR.totals.net)}, and with tax the debit note is ${rupees(PR.totals.total)}. Lalit Agencies returned goods to Anvi Traders, with net value ${rupees(SR.totals.net)}, and the credit note is ${rupees(SR.totals.total)}. The tax in each note is split equally between central and state tax.`,
    }),
    sl('check', 'Quick check: debit note', {
      b: 'Decide who issues the note and where it is recorded.',
      chk: 'm_dn',
      n: 'A firm returns defective goods to its supplier and sends a note. Decide whether that note is a debit note or a credit note, and then decide in which return book it is recorded.',
    }),
    sl('example', 'Worked example 5: tax payable after returns', {
      b: 'Output tax on sales, less output tax on sales returns, **less** input tax on purchases net of returns.',
      v: vGT,
      n: `After returns, Anvi Traders has central tax on sales of ${rupees(GT.outCgst)} and central input tax of ${rupees(GT.inCgst)}. So central tax payable is ${rupees(GT.cgstPay)}, and state tax payable is the same. Integrated tax on sales is ${rupees(GT.outIgst)} against input of ${rupees(GT.inIgst)}, so ${rupees(GT.igstPay)} is payable. All rates are imagined.`,
    }),
    sl('check', 'Quick check: the debit note amount', {
      b: 'Find the total value of a debit note, including tax.',
      chk: 'n_pr_total',
      n: 'First find the net value of the goods returned, using the trade discount. Then add tax at the rate given. The total is the amount of the debit note.',
    }),
    sl('concept', 'The journal proper', {
      b: 'The book of original entry for everything that fits **no special book**.',
      v: vJPwhat,
      n: 'The journal proper is for entries that fit no special purpose book. These include the opening entry, the credit purchase or sale of an asset, adjustment entries, rectification entries and transfer entries. It also holds the entries for goods taken by the owner, goods given as charity or free samples, and goods lost by fire. In each of the last three, Purchases account is credited at cost.',
    }),
    sl('example', 'Worked example 6: journal proper entries', {
      b: '**Kavya Stores**, an imagined shop, April. Furniture on credit, with tax at an imagined 12%, then four entries that credit Purchases.',
      v: vJP,
      n: `Kavya Stores bought furniture on credit for ${rupees(45000)} plus tax of ${rupees(5400)}, so the supplier is credited with ${rupees(50400)}. The owner took goods of ${rupees(6000)}, which is drawings. Goods of ${rupees(3500)} went as charity, ${rupees(2000)} as free samples, and ${rupees(18000)} were lost by fire. In each of these four, Purchases account is credited.`,
    }),
    sl('example', 'Worked example 7: the opening entry', {
      b: 'Assets are **debited**; liabilities and **Capital** are credited, with Capital as the balancing figure.',
      bl: [`Capital = ${inr(OPEN.totalA)} − ${inr(OPEN.totalL)} = **${rs(OPEN.capital)}**.`],
      v: vOpen,
      n: `At the start of the year, Kavya Stores has assets of ${rupees(OPEN.totalA)} and owes ${rupees(OPEN.totalL)} to outsiders. The opening entry debits each asset and credits each liability. Capital is the balancing figure, which is ${rupees(OPEN.capital)}. The two sides of the entry are equal, so the books begin with the accounting equation in balance.`,
    }),
    sl('check', 'Quick check: asset or goods?', {
      b: 'Decide which book records a credit sale of an old machine.',
      chk: 'ar_sale_asset',
      n: 'Think about what the sales book is meant to record. Is an old machine goods in which the firm deals, or an asset? Then decide whether the reason given explains the assertion.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Purchases and sales books: credit transactions in goods, at the net amount.', 'Debit note to the supplier, credit note to the customer; tax is reversed at the same rate.', 'Totals are posted to the ledger.', 'Journal proper: opening, adjustment, rectification, transfer, drawings, charity, free samples, loss by fire.'],
      v: vSum2,
      n: 'To sum up. The purchases and sales books record credit transactions in goods at the net amount after trade discount, with tax columns at the rate given. Returns go to the return books through debit notes and credit notes. Each book is totalled and posted to the ledger. All other entries go to the journal proper, and goods that leave the business without a sale are credited to Purchases.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Deduct trade discount first; compute tax on the net amount.', 'Same state: CGST and SGST in equal parts; another state: IGST.', 'Goods taken, given away or lost: credit Purchases at cost.', 'Always add a narration in brackets.'],
      v: vTips2,
      n: 'In the examination, deduct the trade discount first and compute tax on the net amount at the rate given in the problem. Use central and state tax for the same state and integrated tax for another state. Whenever goods leave the business without a sale, credit Purchases at cost. And always write a short narration in brackets under each journal entry.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Recording of Transactions II: Special Purpose Books — Notes',
  sections: [
    {
      h: '1. Special purpose books',
      t: 1,
      b: 'When transactions are many, recording all of them in one journal is slow and crowded. Books are therefore divided by kind of transaction. The advantages are **division of work**, **specialisation**, **saving of time** and **easy reference**.\n\nThe books are the cash book, the petty cash book, the purchases book, the sales book, the purchases return book and the sales return book. Entries that fit none of them go to the **journal proper**. Each book is totalled and posted to the ledger.',
      terms: [
        ['Special purpose book', 'A book of original entry kept for one kind of transaction, such as cash or credit purchases.'],
        ['Source document', 'The paper that proves a transaction, such as an invoice, a cash memo, a cheque, a voucher or a note.'],
      ],
      v: vTree,
      vs: [vSource],
    },
    {
      h: '2. The cash book: simple and with a bank column',
      t: 1,
      b: 'The **cash book** is a book of original entry and also the cash account of the ledger. **Receipts** go on the debit side and **payments** on the credit side.\n\nA **simple cash book** has one amount column for cash. Its balance is a debit balance or nil, since a firm cannot pay out more cash than it holds. A **two-column cash book** has a cash column and a bank column on each side. Each column is totalled and balanced separately: the difference is written as Balance c/d on the smaller side and brought down as Balance b/d on the other.',
      terms: [
        ['Cash book', 'A book in which cash and bank receipts and payments are entered; it is also the cash account.'],
        ['Simple cash book', 'A cash book with one amount column, for cash only.'],
        ['Two-column cash book', 'A cash book with a cash column and a bank column on each side.'],
      ],
      v: vFormat,
      vs: [vCB],
    },
    {
      h: '3. Contra entries, cheques, bank charges and overdraft',
      t: 1,
      b: 'A **contra entry** is a transaction between the cash column and the bank column. It is written once on each side of the cash book and marked **C**. Cash deposited into the bank: credit in the cash column, debit in the bank column. Cash withdrawn from the bank for office use: debit in the cash column, credit in the bank column.\n\nA cheque received and deposited is a debit in the bank column. A payment by cheque and **bank charges** are credits in the bank column; interest credited by the bank is a debit. A **bank overdraft** is a credit balance in the bank column: it is carried down on the debit side and brought down on the credit side.',
      terms: [
        ['Contra entry', 'An entry affecting both the cash and the bank column, shown on both sides of the cash book and marked C.'],
        ['Bank overdraft', 'The amount by which the firm has paid out more than its bank balance, shown as a credit balance in the bank column.'],
        ['Bank charges', 'The fees charged by the bank, recorded as a payment in the bank column.'],
      ],
      v: vContra,
      vs: [vOD],
    },
    {
      h: '4. Petty cash book and the imprest system',
      t: 1,
      b: 'Small expenses such as stamps, fares and tea are paid by a **petty cashier**. Under the **imprest system** the head cashier gives a fixed sum, the **imprest**, and at the end of the period reimburses exactly the amount spent, so the fixed sum is restored.\n\nAn **analytical petty cash book** has a receipts column, a total payments column and analysis columns for postage, stationery, conveyance, cartage and sundries. The analysis columns add up to the total column. The balance is carried down, and the reimbursement added: balance plus reimbursement equals the imprest.',
      terms: [
        ['Imprest', 'The fixed sum advanced to the petty cashier; the amount spent is reimbursed so that it is restored.'],
        ['Petty cash book', 'A book in which small payments are recorded by the petty cashier.'],
        ['Analytical petty cash book', 'A petty cash book with columns that classify each payment under heads.'],
      ],
      v: vCycle,
      vs: [vPC],
    },
    {
      h: '5. Purchases and sales books: trade discount and tax',
      t: 2,
      b: 'The **purchases book** records credit purchases of goods; the **sales book** records credit sales of goods. Format: date, invoice number, name of supplier or customer, L.F., amount. Only the **net amount** after trade discount is entered; trade discount is not recorded separately. Cash purchases and sales go to the cash book; assets bought or sold on credit go to the journal proper.\n\n**As of 2024.** With goods and services tax, tax columns are added: CGST and SGST in equal parts for a supply within a state, IGST for a supply between states. Tax is computed on the net amount at the rate stated in the problem (all rates in this chapter are imagined). Tax on purchases is debited to Input CGST, SGST or IGST accounts; tax on sales is credited to Output accounts.\n\n**Posting:** purchases book: Purchases and Input tax accounts debited, suppliers credited. Sales book: customers debited, Sales and Output tax accounts credited.',
      terms: [
        ['Trade discount', 'A reduction in the list price given by the seller at the time of sale; it is deducted on the invoice and not recorded in the books.'],
        ['Purchases book', 'The book of credit purchases of goods.'],
        ['Sales book', 'The book of credit sales of goods.'],
        ['Ledger folio (L.F.)', 'The ledger page on which an entry has been posted.'],
      ],
      v: vTd,
      vs: [vPB, vSB],
    },
    {
      h: '6. Returns books and the journal proper',
      t: 2,
      b: 'Goods returned to a supplier are recorded in the **purchases return book** (return outwards) from a **debit note** issued by the buyer. Goods returned by a customer are recorded in the **sales return book** (return inwards) from a **credit note** issued by the seller. Tax on the returned goods is reversed at the same rate.\n\nThe **journal proper** holds entries that fit no special book: the **opening entry** (assets debited; liabilities and capital credited), **credit purchase or sale of an asset**, **adjustment**, **rectification** and **transfer** entries, and entries for goods taken by the owner (**Drawings Dr, Purchases Cr**), given as charity or free samples (**Charity or Advertisement Dr, Purchases Cr**) or lost by fire (**Loss by Fire Dr, Purchases Cr**). Each entry has a narration in brackets.',
      terms: [
        ['Debit note', 'A note sent by a buyer to a supplier when goods are returned, saying that the supplier has been debited.'],
        ['Credit note', 'A note sent by a seller to a customer when goods are taken back, saying that the customer has been credited.'],
        ['Journal proper', 'The book of original entry for transactions that fit no special purpose book.'],
        ['Rectification entry', 'An entry that corrects an error found in the books.'],
      ],
      v: vRet,
      vs: [vReturns, vGT, vJPwhat],
    },
  ],
  tips: '- Contra entries: write on **both** sides and mark **C**.\n- Balance the cash and bank columns **separately**; cash is never a credit balance; an overdraft is a credit balance in the bank column.\n- Petty cash: the analysis columns must add up to the total payments column; reimbursement = amount spent; balance + reimbursement = imprest.\n- Purchases and sales books: net of trade discount; tax on the net amount; IGST for another state, CGST and SGST for the same state; use only the rate given.\n- Journal proper: goods taken, given away or lost are **credited to Purchases** at cost; add a narration to every entry.',
});

// ================================================================ flashcards
const F = cards([
  ['Why are **special purpose books** kept?', 'They give division of work, specialisation, saving of time and easy reference.', 'concept', 1],
  ['**Source document**', 'The paper that proves a transaction: invoice, cash memo, cheque, voucher or note.', 'definition', 1],
  ['**Cash book**', 'A book of original entry that is also the cash account: receipts on the debit side, payments on the credit side.', 'definition', 1],
  ['Balance of a simple cash book', 'A debit balance or nil; never a credit balance.', 'fact', 1],
  ['**Two-column cash book**', 'A cash book with a cash column and a bank column on each side.', 'definition', 1],
  ['**Contra entry**', 'A transaction between the cash and bank columns, written on both sides and marked C.', 'definition', 1],
  ['Cash deposited into the bank: entry', 'Credit in the cash column; debit in the bank column (C).', 'fact', 1],
  ['Cash withdrawn from the bank for office use: entry', 'Debit in the cash column; credit in the bank column (C).', 'fact', 1],
  ['Cheque received and deposited', 'A debit in the bank column.', 'fact', 1],
  ['**Bank charges**: entry', 'A credit in the bank column.', 'fact', 1],
  ['**Bank overdraft** in the cash book', 'A credit balance in the bank column; carried down on the debit side.', 'definition', 1],
  ['Why can cash never be a credit balance?', 'A firm cannot pay out more cash than it holds; a credit cash balance signals an error.', 'concept', 1],
  ['**Petty cash book**', 'A book in which small payments are recorded by the petty cashier.', 'definition', 1],
  ['**Imprest** system', 'A fixed sum is advanced to the petty cashier and the amount spent is reimbursed, restoring the fixed sum.', 'definition', 1],
  ['Reimbursement under the imprest system', 'Equal to the total payments of the period.', 'fact', 1],
  ['**Analytical petty cash book**', 'A petty cash book with analysis columns, such as postage, stationery, conveyance, cartage and sundries.', 'definition', 1],
  ['Check on the analysis columns', 'The analysis columns add up to the total payments column.', 'exam-tip', 1],
  ['**Purchases book**', 'The book of credit purchases of goods, entered at the net amount after trade discount.', 'definition', 2],
  ['**Sales book**', 'The book of credit sales of goods, entered at the net amount after trade discount.', 'definition', 2],
  ['**Trade discount**', 'A reduction in list price allowed by the seller on the invoice; not recorded separately in the books.', 'definition', 2],
  ['Format of the purchases book', 'Date, invoice number, name of supplier, L.F., amount.', 'fact', 2],
  ['**L.F.**', 'Ledger folio: the ledger page on which the amount has been posted.', 'definition', 2],
  ['Tax columns, same state (as of 2024)', 'CGST and SGST in equal parts, on the net amount at the rate stated in the problem.', 'fact', 2],
  ['Tax column, another state (as of 2024)', 'IGST, on the net amount at the rate stated in the problem.', 'fact', 2],
  ['**Debit note**', 'Sent by the buyer to the supplier on returning goods; recorded in the purchases return book.', 'definition', 2],
  ['**Credit note**', 'Sent by the seller to the customer on taking goods back; recorded in the sales return book.', 'definition', 2],
  ['**Journal proper**', 'The book of original entry for transactions that fit no special purpose book.', 'definition', 2],
  ['Goods taken by the owner', 'Drawings A/c Dr; Purchases A/c Cr (at cost).', 'fact', 2],
  ['Goods given as charity or free samples', 'Charity A/c or Advertisement A/c Dr; Purchases A/c Cr.', 'fact', 2],
  ['Goods lost by fire', 'Loss by Fire A/c Dr; Purchases A/c Cr (any insurance claim debited separately).', 'fact', 2],
  ['**Opening entry**', 'Assets debited; liabilities and Capital credited, Capital being the balancing figure.', 'definition', 2],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Special Purpose Books',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_contra_def', 'm_petty_reimb', 'm_pb_cash', 'ar_cash_nocredit'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_contra', 's2_pb_only', 's3_petty_analysis'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_cb2', 'l5_petty'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_radha'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Special Purpose Books',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_why_books', 'm_cb_side', 'm_od', 'm_bank_charges', 'm_td_nature', 'm_cn', 'm_jp_which', 'm_fire', 'ar_pb_discount', 'ar_cb_both'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_why_books', 's2_od', { attempt: 1, keys: ['s2_dn_cn', 's2_td'] }, 's3_simple_cb', { attempt: 1, keys: ['s3_sb_gst', 's3_rect'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_cb_od', { attempt: 1, keys: ['l5_returns', 'l5_journal'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_wazir', 'cb_jayant'] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, and no deck-check item in either.
const checksUsed = new Set(['m_contra_which', 'n_cb_cash', 'fb_cb', 'ord_imprest', 'n_pb_net', 'mt_docs', 'm_dn', 'n_pr_total', 'ar_sale_asset']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void same; void sum;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-accountancy-ch04 (cash book simple and with bank column, petty cash book; purchases, sales and returns books, journal proper)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed by src/books.mjs and the shared acc.mjs and asserted: cash and bank columns balance, cash never credit, contra entries on both sides, petty cash imprest restored, trade books net of discount with CGST, SGST and IGST by gst(), posting summaries balance; tables in decks and model answers are generated from the computed values',
    facts: 'cash book, contra entries, overdraft as a credit bank balance, imprest system, analytical petty cash book, purchases/sales/returns books with debit and credit notes, journal proper entries as in standard textbooks; GST columns and Input/Output tax accounts stated as of 2024 at imagined rates only',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
