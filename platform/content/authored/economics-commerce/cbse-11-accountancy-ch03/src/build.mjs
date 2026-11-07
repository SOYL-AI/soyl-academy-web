// Build CBSE 11 Accountancy ch03 Recording of Transactions I. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch03', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const F = await import('./figures.mjs');
const { same, check, sum, inr, rs, rupees, KV, KV_E, KV_J, KV_L, KV_TB, KV_Q, KVF, FOLIO, RO, RO_Q, ROF, RO_ASSETS, VCH_ROWS, jrnl, RATE } = F;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (headers, rows, alt) => table(headers, rows, alt);

// ================================================================ figures (SVG)
/** Box with centred text lines; throws if a line is too wide for the box (text width about 0.56 of the font size per character). */
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  const size = o.size ?? 13;
  lines.forEach((t, i) => {
    check(t.length * size * 0.56 <= w - 8, `svg label too wide for its box: "${t}"`);
    s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size, bold: o.bold && i === 0 });
  });
};

const vFlow = (() => {
  const s = new Svg(760, 250);
  const xs = [95, 285, 475, 665];
  const items = [
    ['Source document', ['cash memo, invoice,', 'receipt, cheque']],
    ['Voucher', ['date, number, amount,', 'accounts, narration']],
    ['Journal', ['entry in date order,', 'with narration']],
    ['Ledger', ['entries grouped', 'account by account']],
  ];
  items.forEach(([head, sub], i) => {
    box(s, xs[i], 80, 160, 100, [head, ...sub], { bold: true, size: 12, gap: 20 });
    if (i < 3) s.arrow(xs[i] + 80, 80, xs[i + 1] - 80, 80, { sw: 1.8 });
  });
  const caps = ['Proves the transaction', 'Supports the entry', 'Book of original entry', 'Book of final entry'];
  caps.forEach((t, i) => s.text(xs[i], 160, t, { size: 13 }));
  box(s, 380, 215, 560, 34, 'Every entry follows this path before it reaches the ledger', { size: 13, fill: 'none', color: 'muted' });
  return s.visual('Flow from source documents to voucher to journal to ledger: the source document, such as a cash memo, invoice, receipt or cheque, proves the transaction; the voucher with date, number, accounts, amount and narration supports the entry; the journal is the book of original entry in date order; the ledger is the book of final entry grouped account by account', 'Four stages, one path for every transaction.');
})();

const vRules = (() => {
  const s = new Svg(680, 350);
  const cols = [[130, 210], [370, 200], [575, 170]];
  ['Type of account', 'When it increases', 'When it decreases'].forEach((h, i) => box(s, cols[i][0], 30, cols[i][1], 34, h, { fill: 'accent', bold: true, size: 14 }));
  const rows = [
    ['Assets', 'Debit', 'Credit'],
    ['Expenses and losses', 'Debit', 'Credit'],
    ['Drawings', 'Debit', 'Credit'],
    ['Liabilities', 'Credit', 'Debit'],
    ['Capital', 'Credit', 'Debit'],
    ['Revenues and gains', 'Credit', 'Debit'],
  ];
  rows.forEach((r, k) => {
    const y = 78 + k * 44;
    r.forEach((t, i) => box(s, cols[i][0], y, cols[i][1], 36, t, { size: 14, fill: i === 0 ? 'none' : 'fill', color: i === 0 ? 'muted' : 'accent', bold: i > 0 }));
  });
  s.line(40, 78 + 2.5 * 44 + 4, 640, 78 + 2.5 * 44 + 4, { sw: 1.2, color: 'muted', dash: true });
  box(s, 340, 332, 420, 28, 'Assets = Liabilities + Capital', { size: 14, fill: 'none', color: 'muted', bold: true });
  return s.visual('Rules of debit and credit chart: an increase in assets, expenses and losses, and drawings is debited and a decrease is credited; an increase in liabilities, capital, and revenues and gains is credited and a decrease is debited', 'Debit the first three, credit the last three, when they increase.');
})();

const vEqBal = (() => {
  const s = new Svg(700, 320);
  s.text(350, 24, 'Assets = Liabilities + Capital', { size: 18, bold: true });
  s.text(350, 48, `Rohan Electricals after seven transactions, in ${'₹'}`, { size: 13 });
  s.polygon([[350, 130], [315, 270], [385, 270]], { fill: 'fill', color: 'accent', sw: 1.5 });
  s.line(350, 270, 350, 270, { sw: 1 });
  s.line(90, 130, 610, 130, { sw: 3 });
  s.line(90, 130, 90, 168, { sw: 1.5, color: 'muted' });
  s.line(610, 130, 610, 168, { sw: 1.5, color: 'muted' });
  box(s, 150, 215, 200, 90, ['Assets', inr(RO_ASSETS), `Cash ${inr(ROF.assets.Cash)}`, `Stock ${inr(ROF.assets.Stock)}`], { bold: true, size: 13, gap: 20 });
  box(s, 550, 192, 200, 40, `Liabilities ${inr(sum(Object.values(ROF.liabilities)))}`, { size: 13 });
  box(s, 550, 240, 200, 40, `Capital ${inr(ROF.capital)}`, { size: 13 });
  s.text(350, 112, '=', { size: 22, bold: true });
  s.text(350, 296, 'Both pans carry the same total', { size: 13 });
  return s.visual(`Balance diagram of the accounting equation: the left pan holds assets of ${inr(RO_ASSETS)} rupees (cash ${inr(ROF.assets.Cash)} and stock ${inr(ROF.assets.Stock)}); the right pan holds liabilities of ${inr(sum(Object.values(ROF.liabilities)))} rupees and capital of ${inr(ROF.capital)} rupees; both pans carry the same total`, 'The two sides always balance.');
})();

const vT = (() => {
  const Lm = F.ledger({
    name: 'Cash A/c',
    dr: [['To Capital A/c', KV.cash0], ['To Sundries', KV.s1Total]],
    cr: [['By Rent A/c', KV.rent], ['By Mehta Paper Mart A/c', KV.paidMehta]],
  });
  same(Lm.balance, 156800, 'T-format balance');
  const s = new Svg(700, 340);
  s.text(350, 20, 'Cash Account (first four cash entries of Kavya Stores)', { size: 14, bold: true });
  s.rect(20, 36, 660, 258, { rx: 4, color: 'accent', sw: 1.8 });
  s.line(350, 36, 350, 294, { sw: 1.5, color: 'accent' });
  s.line(20, 62, 680, 62, { sw: 1.2, color: 'muted' });
  s.line(20, 236, 680, 236, { sw: 1.2, color: 'muted' });
  s.text(30, 49, 'Dr', { size: 14, bold: true, anchor: 'start' });
  s.text(340, 49, 'Debit side', { size: 12, anchor: 'end' });
  s.text(360, 49, 'Cr', { size: 14, bold: true, anchor: 'start' });
  s.text(670, 49, 'Credit side', { size: 12, anchor: 'end' });
  [[0, 'Date', 'Particulars', 'J.F.', '₹'], [330, 'Date', 'Particulars', 'J.F.', '₹']].forEach(([dx, a, b, c, d]) => {
    s.text(dx + 30, 80, a, { size: 12, anchor: 'start', muted: true });
    s.text(dx + 85, 80, b, { size: 12, anchor: 'start', muted: true });
    s.text(dx + 250, 80, c, { size: 12, anchor: 'start', muted: true });
    s.text(dx + 335, 80, d, { size: 12, anchor: 'end', muted: true });
  });
  const L = [['1 Apr', 'To Capital A/c', '1', KV.cash0], ['8 Apr', 'To Sundries', '1', KV.s1Total]];
  const R = [['5 Apr', 'By Rent A/c', '1', KV.rent], ['12 Apr', 'By Mehta Paper Mart A/c', '1', KV.paidMehta], ['30 Apr', 'By Balance c/d', '', Lm.balance]];
  L.forEach(([a, b, c, d], i) => {
    const y = 108 + i * 28;
    s.text(30, y, a, { size: 12, anchor: 'start' });
    s.text(85, y, b, { size: 12, anchor: 'start' });
    s.text(280, y, c, { size: 12, anchor: 'start' });
    s.text(340, y, inr(d), { size: 12, anchor: 'end' });
  });
  R.forEach(([a, b, c, d], i) => {
    const y = 108 + i * 28;
    s.text(360, y, a, { size: 12, anchor: 'start' });
    s.text(415, y, b, { size: 12, anchor: 'start' });
    s.text(610, y, c, { size: 12, anchor: 'start' });
    s.text(670, y, inr(d), { size: 12, anchor: 'end' });
  });
  s.text(340, 262, inr(Lm.total), { size: 13, anchor: 'end', bold: true });
  s.text(670, 262, inr(Lm.total), { size: 13, anchor: 'end', bold: true });
  s.text(350, 318, 'To on the debit side, By on the credit side; the smaller side carries the balance down', { size: 12 });
  return s.visual(`Ledger T-format diagram of a cash account: the debit side on the left has date, particulars beginning with To, journal folio and amount, with entries To Capital ${inr(KV.cash0)} and To Sundries ${inr(KV.s1Total)}; the credit side on the right has entries beginning with By: Rent ${inr(KV.rent)}, Mehta Paper Mart ${inr(KV.paidMehta)} and Balance c/d ${inr(Lm.balance)}; both sides total ${inr(Lm.total)} rupees`, 'The two sides of a ledger account.');
})();

// ================================================================ tables for slides
const vDocs1 = T(['Document', 'Prepared by, and when', 'What it shows'], [
  ['Cash memo', 'The seller, on a cash sale', 'Date, goods, quantity, price and the amount paid'],
  ['Invoice (bill)', 'The seller, on a credit sale', 'Goods, quantity, rate, tax, terms and the amount due'],
  ['Receipt', 'The person who receives money', 'The amount received, the date and the payer'],
], 'Table of source documents: cash memo, invoice and receipt, with who prepares each and what each shows');
const vDocs2 = T(['Document', 'Prepared by, and when', 'What it shows'], [
  ['Pay-in-slip', 'The depositor, at the bank', 'Cash or cheques deposited and the account to be credited'],
  ['Cheque', 'The account holder (drawer)', 'A written order to the bank to pay a sum to a named person'],
  ['Debit note', 'The buyer who returns goods', 'The amount debited to the seller\'s account'],
  ['Credit note', 'The seller who accepts the return', 'The amount credited to the buyer\'s account'],
], 'Table of source documents: pay-in-slip, cheque, debit note and credit note');
const vTxn = T(['Term', 'Meaning'], [
  ['Business transaction', 'An exchange of money or money\'s worth between the business and an outsider, measurable in money'],
  ['Cash transaction', 'Payment is made at the time of the exchange'],
  ['Credit transaction', 'Payment is to be made later, so a debtor or a creditor arises'],
  ['Not yet a transaction', 'A plan, an enquiry or a promise: nothing has been exchanged'],
], 'Table of business transaction, cash transaction and credit transaction, and what is not yet a transaction');
const vVoucherKinds = T(['Kind of voucher', 'Prepared for', 'Imagined example'], [
  ['Debit voucher', 'Cash paid', 'Rent paid in cash'],
  ['Credit voucher', 'Cash received', 'Cash received from a debtor'],
  ['Journal (transfer) voucher', 'Transactions in which no cash moves', 'Goods bought on credit; goods returned'],
], 'Table of voucher kinds: debit voucher for cash paid, credit voucher for cash received, journal or transfer voucher for transactions without cash');
const vVch = T(['Item', 'Details'], VCH_ROWS, `Imagined debit voucher number 14 of Kavya Stores dated 5 April 2027: rent A/c debited ${inr(KV.rent)} rupees, cash A/c credited ${inr(KV.rent)} rupees, narration, source document and signatures`);
const vWhich = T(['Transaction of Kavya Stores', 'Voucher'], [
  [`Rent of ${rs(KV.rent)} paid in cash`, 'Debit voucher'],
  [`Cash of ${rs(KV.recd)} received from Sunita Gupta`, 'Credit voucher'],
  [`Goods of ${rs(KV.purch)} bought on credit from Mehta Paper Mart`, 'Journal voucher'],
  [`Goods of ${rs(KV.creditSale)} sold on credit to Sunita Gupta`, 'Journal voucher'],
  [`Cash of ${rs(KV.drawn)} taken by the proprietor`, 'Debit voucher'],
], 'Table matching five imagined transactions of Kavya Stores to debit, credit or journal vouchers');
const vEffects = T(['Transaction', 'Assets', 'Liabilities', 'Capital'], [
  ['Capital introduced in cash', 'Up', 'No change', 'Up'],
  ['Goods bought on credit', 'Up', 'Up', 'No change'],
  ['Cash sale at a profit', 'Up', 'No change', 'Up by the profit'],
  ['Expense paid', 'Down', 'No change', 'Down'],
  ['Drawings', 'Down', 'No change', 'Down'],
  ['Loan repaid', 'Down', 'Down', 'No change'],
  ['Furniture bought for cash', 'One up, one down', 'No change', 'No change'],
], 'Table of the effect of seven kinds of transaction on assets, liabilities and capital');
const vRoEq = T(RO_Q.headers, RO_Q.rows, `Accounting equation table of Rohan Electricals after seven transactions: cash ${inr(ROF.assets.Cash)}, stock ${inr(ROF.assets.Stock)}, creditors ${inr(ROF.liabilities.Creditors)}, bank loan ${inr(ROF.liabilities['Bank loan'])} and capital ${inr(ROF.capital)} rupees; assets ${inr(RO_ASSETS)} equal liabilities plus capital`);
const vCapital = T(['Item', 'Effect on capital'], [
  ['Capital introduced', 'Increases it'],
  ['Revenues and gains (profit)', 'Increase it'],
  ['Expenses and losses', 'Decrease it'],
  ['Drawings', 'Decrease it'],
  ['Closing capital', 'Opening capital + capital introduced + profit − drawings'],
], 'Table of what increases and what decreases capital, and the formula for closing capital');
const NF = { assets: 350000, liab: 90000, intro: 20000, profit: 54000, drawn: 18000 };
NF.open = same(NF.assets - NF.liab, 260000, 'Naveen opening capital');
NF.close = same(NF.open + NF.intro + NF.profit - NF.drawn, 316000, 'Naveen closing capital');
const vNF = T(['Particulars', '₹'], [
  ['Assets at the start', inr(NF.assets)],
  ['Less: outside liabilities', inr(NF.liab)],
  ['**Opening capital**', `**${inr(NF.open)}**`],
  ['Add: capital introduced', inr(NF.intro)],
  ['Add: profit for the year', inr(NF.profit)],
  ['Less: drawings', inr(NF.drawn)],
  ['**Closing capital**', `**${inr(NF.close)}**`],
], `Table for Naveen Footwear: assets ${inr(NF.assets)} less liabilities ${inr(NF.liab)} give opening capital ${inr(NF.open)}; adding ${inr(NF.intro)} and profit ${inr(NF.profit)} and deducting drawings ${inr(NF.drawn)} gives closing capital ${inr(NF.close)} rupees`);
const vSum1 = T(['Topic', 'Key points'], [
  ['Transactions', 'Exchange with an outsider, measurable in money; cash or credit'],
  ['Source documents', 'Cash memo, invoice, receipt, pay-in-slip, cheque, debit note, credit note'],
  ['Vouchers', 'Debit, credit and journal (transfer) vouchers prepared from source documents'],
  ['Accounting equation', 'Assets = Liabilities + Capital after every transaction'],
], 'Summary table of transactions, source documents, vouchers and the accounting equation');
const vTips1 = T(['Do', 'Why'], [
  ['Name the source document for each transaction', 'It shows what proves the entry'],
  ['Write the whole equation after each transaction', 'Both sides are checked at every step'],
  ['Show the profit on a sale, not just the price', 'Only the profit changes capital'],
  ['Treat expenses and drawings as falls in capital', 'They reduce assets and capital together'],
], 'Exam tips table for source documents, vouchers and the accounting equation');

const vProcess = flow('LR', ['Transaction takes place', 'Journal entry with narration', 'Posting to ledger accounts', 'Balancing of accounts'], 'Flow: transaction, journal entry with narration, posting to ledger accounts, balancing of accounts', 'From event to balanced account.');
const vUse = T(['Transaction', 'Debit', 'Credit'], [
  ['Furniture bought for cash', 'Furniture A/c (asset increases)', 'Cash A/c (asset decreases)'],
  ['Rent paid', 'Rent A/c (expense increases)', 'Cash A/c (asset decreases)'],
  ['Goods sold on credit to a customer', 'Debtor A/c (asset increases)', 'Sales A/c (revenue increases)'],
  ['Cash received from the debtor', 'Cash A/c (asset increases)', 'Debtor A/c (asset decreases)'],
  ['Cash withdrawn by the proprietor', 'Drawings A/c (capital decreases)', 'Cash A/c (asset decreases)'],
], 'Table applying the rules to five transactions: the account debited and the account credited for each');
const vTrad = T(['Type of account', 'Examples', 'Rule'], [
  ['Personal', 'Debtors, creditors, capital, drawings', 'Debit the receiver; credit the giver'],
  ['Real', 'Cash, stock, furniture, machinery', 'Debit what comes in; credit what goes out'],
  ['Nominal', 'Rent, salaries, sales, commission received', 'Debit expenses and losses; credit incomes and gains'],
], 'Table of the traditional approach: personal, real and nominal accounts with examples and rules');
const vFormat = T(F.jrnl([KV_E[2]], FOLIO).headers, F.jrnl([KV_E[2]], FOLIO).rows.slice(0, 3), `Journal format with an imagined entry of Kavya Stores: date 5 April, Rent A/c debited ${inr(KV.rent)} rupees, To Cash A/c credited, ledger folios shown, narration in brackets`);
const vKinds = T(['Kind of entry', 'Meaning', 'Imagined example'], [
  ['Simple entry', 'One account debited and one credited', 'Rent paid in cash'],
  ['Compound entry', 'More than one debit, more than one credit, or both', 'Purchase of goods with tax added'],
  ['Opening entry', 'Records the balances of assets and liabilities at the start; capital is the difference', 'Cash and furniture debited; capital credited'],
], 'Table of simple entries, compound entries and the opening entry with meanings and examples');
const j12 = F.jrnl(KV_E.slice(0, 2), FOLIO);
const j35 = F.jrnl(KV_E.slice(2, 5), FOLIO);
const j610 = F.jrnl(KV_E.slice(5), FOLIO);
const vJ12 = T(j12.headers, j12.rows, `Journal of Kavya Stores: opening entry of 1 April with cash ${inr(KV.cash0)} and furniture ${inr(KV.furn)} against capital ${inr(KV.cap)}, and the purchase of 3 April of ${inr(KV.purch)} with input CGST and SGST of ${inr(KV.pg.cgst)} each, credited to Mehta Paper Mart ${inr(KV.purchTotal)} rupees`);
const vJ35 = T(j35.headers, j35.rows, `Journal of Kavya Stores: rent ${inr(KV.rent)}, cash sale with total ${inr(KV.s1Total)} and credit sale with total ${inr(KV.s2Total)} rupees, each with output CGST and SGST`);
const vJ610 = T(j610.headers, j610.rows, `Journal of Kavya Stores: payment of ${inr(KV.paidMehta)}, receipt of ${inr(KV.recd)}, drawings ${inr(KV.drawn)}, salary ${inr(KV.sal)} and commission ${inr(KV.comm)} rupees; the journal totals ${inr(KV_J.total)} rupees on each side`);
const vSteps = T(['Step', 'What to do'], [
  ['1', 'Take each entry from the journal in turn'],
  ['2', 'Open (or find) the ledger account of the account debited; write the date, To and the other account, the journal folio and the amount on its debit side'],
  ['3', 'Do the same on the credit side of the account credited, using By'],
  ['4', 'Write the ledger page number in the L.F. column of the journal'],
], 'Table of the steps of posting from the journal to the ledger and the use of the folio columns');
const cashL = KV_L['Cash A/c'];
const vCash = T(cashL.headers, cashL.rows, `Cash account of Kavya Stores for April: debit side total ${inr(cashL.total)} rupees; credit side shows rent, payment to the supplier, drawings and salary, and Balance c/d of ${inr(cashL.balance)} rupees`);
const vBal = T(['Term', 'Meaning'], [
  ['Balance c/d', 'The difference, written on the smaller side at the end of the period, so that both sides are equal'],
  ['Balance b/d', 'The same amount written on the opposite side on the first day of the next period'],
  ['Debit balance', 'Debit side is larger: assets, expenses, losses, drawings; a debtor\'s account'],
  ['Credit balance', 'Credit side is larger: liabilities, capital, revenue; a creditor\'s account'],
], 'Table on balancing: balance carried down, balance brought down, debit balance and credit balance');
const vJL = T(['Basis', 'Journal', 'Ledger'], [
  ['Nature', 'Book of original entry', 'Book of final entry'],
  ['Order', 'Transactions in date order', 'Entries grouped account by account'],
  ['Prepared', 'First, from vouchers', 'After the journal, by posting'],
  ['Folio column', 'L.F.: the ledger page', 'J.F.: the journal page'],
], 'Table comparing the journal and the ledger on nature, order, preparation and folio columns');
same(KV_TB.rows.length - 1, 15, 'number of ledger accounts listed in the Kavya balances');
const vTb = T(KV_TB.headers, KV_TB.rows, `Balances of the fifteen ledger accounts of Kavya Stores: debit balances and credit balances each total ${inr(KV_TB.dr)} rupees`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Rules', 'Debit increases in assets, expenses and drawings; credit increases in liabilities, capital and revenue'],
  ['Journal', 'Date, particulars, L.F., debit, credit; narration; simple, compound and opening entries'],
  ['GST entries', 'Input CGST and SGST debited on purchases; output CGST and SGST credited on sales'],
  ['Ledger', 'To on the debit side, By on the credit side; posting, folios, balance c/d and b/d'],
], 'Summary table of rules, journal, tax entries and ledger');
const vTips2 = T(['Do', 'Why'], [
  ['Write the debit account first and the credit account with To', 'It is the standard format'],
  ['Write a narration for every entry', 'It explains the entry and earns a mark'],
  ['Show tax separately and use the rate given', 'Input and output tax sit in separate accounts'],
  ['Total both sides before balancing, and write the balance on the smaller side', 'Totals then agree'],
], 'Exam tips table for the journal and the ledger');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Recording of Transactions I — Part 1: Documents, Vouchers and the Accounting Equation',
  goals: [
    'State what a business transaction is and identify the source document for each kind of transaction',
    'Explain accounting vouchers, their types and contents, and prepare a voucher from a source document',
    'Show the effect of transactions on the accounting equation and find capital after profit and drawings',
  ],
  slides: [
    sl('title', 'Recording of transactions: from document to ledger', {
      b: 'Part 1: **business transactions**, **source documents**, **vouchers** and the **accounting equation**.',
      v: vFlow,
      n: 'Every entry in the books begins with a real event, a sale, a payment or a purchase. In this part we see how such an event is proved by a source document, supported by a voucher, and then shown in the accounting equation, where assets always equal liabilities plus capital. We work with imagined firms, Kavya Stores and Rohan Electricals.',
    }),
    sl('concept', 'Business transactions', {
      v: vTxn,
      n: 'A business transaction is an exchange of money or money\'s worth between the business and an outsider, and it must be measurable in money. If payment is made at once, it is a cash transaction. If payment is to be made later, it is a credit transaction, and a debtor or a creditor arises. A plan, an enquiry or a promise is not yet a transaction.',
    }),
    sl('concept', 'Source documents: memo, invoice, receipt', {
      v: vDocs1,
      n: 'Source documents are the first written proof of a transaction. A cash memo is made by the seller for a cash sale and shows the goods and the amount paid. An invoice, also called a bill, is made for a credit sale and shows the goods, rate, tax and the amount still due. A receipt is given by the person who receives money, and shows the amount, the date and the payer.',
    }),
    sl('concept', 'Source documents: bank and return documents', {
      v: vDocs2,
      n: 'A pay-in-slip is the bank form filled in when cash or cheques are deposited, and its counterfoil is the depositor\'s proof. A cheque is a written order to the bank to pay a sum to a named person. When a buyer returns goods, the buyer sends a debit note, and the seller replies with a credit note that credits the buyer\'s account.',
    }),
    sl('check', 'Quick check: which document?', {
      b: 'A walk-in customer buys a kurta and pays cash at the counter.',
      chk: 'm_doc_id',
      n: 'Think about who prepares the document and for what kind of sale. A walk-in customer pays at once, so ask which source document the seller hands over for a cash sale.',
    }),
    sl('concept', 'Accounting vouchers', {
      b: 'A **voucher** is a written document, prepared from source documents, that supports an entry. It carries the **date**, **number**, accounts **debited and credited**, **amount**, **narration** and **signatures**.',
      v: vVoucherKinds,
      n: 'A voucher is a written document, prepared from source documents, that supports an entry in the books. A debit voucher supports a cash payment, and a credit voucher supports a cash receipt. A journal voucher, also called a transfer voucher, supports a transaction in which no cash moves, such as a credit purchase or goods returned. Every voucher carries a date, a number, the accounts debited and credited, the amount, a narration and signatures.',
    }),
    sl('example', 'Worked example 1: a debit voucher', {
      b: `**Kavya Stores**, an imagined stationery shop, paid rent of **${rs(KV.rent)}** in cash on 5 April 2027.`,
      bl: ['Cash is paid, so a debit voucher is made.', 'Rent A/c is debited; Cash A/c is credited.', 'The landlord\'s receipt is the source document attached.'],
      v: vVch,
      n: `Here is a debit voucher of Kavya Stores, an imagined stationery shop. On the fifth of April it paid rent of ${rupees(KV.rent)} in cash. Rent is debited, cash is credited, and the landlord's receipt is attached as the source document. The voucher carries a number, the date, the two accounts, the amount, a narration, and the signatures of the person who prepared it, the person who checked it and the person who authorised it.`,
    }),
    sl('concept', 'Which voucher?', {
      v: vWhich,
      n: 'Sort each transaction by whether cash moves. Rent paid in cash and cash taken by the proprietor need debit vouchers. Cash received from a debtor needs a credit voucher. Goods bought or sold on credit involve no cash at the time, so they are supported by journal vouchers prepared from the invoice.',
    }),
    sl('check', 'Quick check: journal voucher', {
      b: 'True or false: a journal voucher is prepared when cash is paid.',
      chk: 'tf_voucher',
      n: 'Decide whether a journal voucher is used when cash is paid. Recall which vouchers are for cash payments and which are for transactions in which no cash moves.',
    }),
    sl('concept', 'The accounting equation', {
      b: '**Assets = Liabilities + Capital**. Assets are what the business owns, liabilities what it owes to outsiders, capital what it owes to the proprietor.',
      v: vEqBal,
      n: 'The accounting equation says that assets equal liabilities plus capital. Assets are what the business owns, liabilities are what it owes to outsiders, and capital is the proprietor\'s claim. Think of a balance: whatever happens on one pan, an equal change happens on the other, or on the same pan, so the balance never tilts. This follows from the dual aspect of every transaction.',
    }),
    sl('concept', 'Effect of transactions on the equation', {
      v: vEffects,
      n: 'Look at the table. Capital introduced raises an asset and capital. A credit purchase raises an asset and a liability. A cash sale at a profit raises an asset and capital by the profit. An expense or drawings lowers an asset and capital. Repaying a loan lowers an asset and a liability. Buying furniture for cash only swaps one asset for another.',
    }),
    sl('example', 'Worked example 2: seven transactions of Rohan Electricals', {
      b: `**Rohan Electricals**, an imagined shop, brings in ${rs(RO.cap)} as capital. The equation is checked after each transaction.`,
      bl: [`Goods costing ${rs(RO.saleCost)} sold for ${rs(RO.salePrice)}: capital rises by the profit of ${rs(RO.profit)}.`, 'The expense and the drawings reduce cash and capital.', 'Repaying part of the loan reduces cash and the loan.'],
      v: vRoEq,
      n: `Rohan Electricals, an imagined shop, brings in ${rupees(RO.cap)} as capital, buys goods for ${rupees(RO.buy)} on credit, and takes a bank loan of ${rupees(RO.loan)}. It sells goods costing ${rupees(RO.saleCost)} for ${rupees(RO.salePrice)} in cash, a profit of ${rupees(RO.profit)}. It pays an expense, takes drawings and repays part of the loan. At the end, assets are ${rupees(RO_ASSETS)}, equal to liabilities plus capital.`,
    }),
    sl('check', 'Quick check: closing capital', {
      b: 'Find the closing capital from the opening capital, profit and drawings.',
      chk: 'n_equation_cap',
      n: 'Start from the opening capital. Add the profit, subtract the drawings, and be careful to use each figure in the right direction.',
    }),
    sl('concept', 'How capital changes', {
      v: vCapital,
      n: 'Capital changes in four ways. Capital introduced and profit increase it. Losses and drawings decrease it. Profit is revenue less expenses, so revenues act like additions to capital and expenses like deductions. Closing capital equals opening capital plus capital introduced plus profit, less drawings.',
    }),
    sl('example', 'Worked example 3: finding capital', {
      b: `**Naveen Footwear**, an imagined firm, starts the year with assets of ${rs(NF.assets)} and outside liabilities of ${rs(NF.liab)}.`,
      bl: [`Opening capital = assets − liabilities = ${rs(NF.open)}.`, `Closing capital = ${inr(NF.open)} + ${inr(NF.intro)} + ${inr(NF.profit)} − ${inr(NF.drawn)} = ${rs(NF.close)}.`],
      v: vNF,
      n: `Naveen Footwear, an imagined firm, starts the year with assets of ${rupees(NF.assets)} and outside liabilities of ${rupees(NF.liab)}, so opening capital is ${rupees(NF.open)}. During the year the proprietor brings in ${rupees(NF.intro)}, the firm earns a profit of ${rupees(NF.profit)}, and drawings are ${rupees(NF.drawn)}. Closing capital is ${rupees(NF.close)}.`,
    }),
    sl('check', 'Quick check: effect on the equation', {
      b: 'Furniture is bought and paid for by cheque.',
      chk: 'm_eq_effect',
      n: 'Work out which two items change, and in which direction, when furniture is bought for cash and paid by cheque.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'A **business transaction** is an exchange with an outsider, measurable in money.',
        'Source documents prove it; **vouchers** support the entry.',
        '**Assets = Liabilities + Capital** holds after every transaction.',
      ],
      v: vSum1,
      n: 'To sum up. A business transaction is an exchange with an outsider measured in money. Source documents prove it, and vouchers support the entry. The accounting equation, assets equal liabilities plus capital, holds after every transaction. Expenses and drawings reduce capital, and revenues increase it.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the source document and the voucher for each transaction.', 'Write the whole equation after every transaction.', 'Show the profit on a sale, not only its price.'],
      v: vTips1,
      n: 'In the examination, name the source document for each transaction and the voucher it supports. For the equation, write the whole equation after every transaction and check that both sides agree. Show the profit on a sale, not only the sale price. Remember that drawings and expenses reduce capital, but repaying a loan does not.',
    }),
  ],
});

const cashTot = KV_L['Cash A/c'].total;
const cashBal = KV_L['Cash A/c'].balance;
const part2 = deck({
  part: 2,
  title: 'Recording of Transactions I — Part 2: Debit and Credit, Journal and Ledger',
  goals: [
    'State the rules of debit and credit and apply them, including entries with GST',
    'Journalise transactions with narrations, including compound and opening entries',
    'Post entries to the ledger, balance the accounts and explain the journal-ledger relationship',
  ],
  slides: [
    sl('title', 'Debit and credit, the journal and the ledger', {
      b: 'Part 2: the **rules**, the **journal**, **posting** and **balancing**.',
      v: vProcess,
      n: 'In this part we turn transactions into entries. First the rules of debit and credit decide which account is debited and which is credited. Then the entry is written in the journal, with a narration. Finally it is posted to the ledger, where every account is balanced. We follow ten transactions of Kavya Stores, an imagined stationery shop, through April, with tax at an imagined rate.',
    }),
    sl('concept', 'Rules of debit and credit', {
      b: 'By the **accounting equation approach**: debit the increase in assets, expenses and losses, and drawings; credit the increase in liabilities, capital and revenues.',
      v: vRules,
      n: 'The rules follow the accounting equation. An increase in an asset, an expense or a loss, or drawings, is debited, and a decrease is credited. An increase in a liability, in capital, or in revenue, is credited, and a decrease is debited. Debit is always the left side and credit the right side. At least two accounts are affected in every entry, one debited and one credited by equal amounts.',
    }),
    sl('concept', 'The rules in use', {
      v: vUse,
      n: 'Apply the rules to five transactions. Furniture bought for cash: furniture is an asset that increases, so it is debited, and cash falls, so it is credited. Rent paid: the expense is debited and cash credited. Goods sold on credit: the debtor, an asset, is debited and sales, a revenue, credited. Cash received from the debtor: cash is debited and the debtor credited. Drawings are debited and cash credited.',
    }),
    sl('concept', 'The traditional approach', {
      v: vTrad,
      n: 'Some books teach another approach. Accounts are grouped as personal, real and nominal. For a personal account, debit the receiver and credit the giver. For a real account, debit what comes in and credit what goes out. For a nominal account, debit expenses and losses and credit incomes and gains. Both approaches lead to the same entries.',
    }),
    sl('check', 'Quick check: drawings', {
      b: 'The proprietor withdraws cash for household use. Which account is debited?',
      chk: 'm_rule_drawings',
      n: 'Drawings reduce capital. Recall whether a decrease in capital is debited or credited, and which account shows the fall in the asset.',
    }),
    sl('concept', 'The journal: format and narration', {
      b: 'The journal is the **book of original entry**. Each entry has a **date**, **particulars**, **L.F.**, **debit** and **credit** amounts, and a **narration** in brackets.',
      v: vFormat,
      n: 'The journal is the book of original entry. Each entry shows the date, the particulars, the ledger folio, and the debit and credit amounts. The account debited is written first, followed by the word debit. The account credited is written on the next line, with the word to. A narration in brackets explains the entry. The ledger folio is filled in only after posting.',
    }),
    sl('concept', 'Journalising: five steps', {
      v: flow('LR', ['Identify the accounts from the source document', 'Classify each account', 'Apply the rules: debit and credit', 'Write date, accounts and amounts', 'Narration and equal totals'], 'Flow of five steps of journalising: identify accounts, classify them, apply the rules, write date accounts and amounts, add narration and check equal totals', 'Five steps for every entry.'),
      n: 'Five steps give a correct entry. Identify the accounts affected, using the source document. Classify each as an asset, liability, capital, expense or revenue. Apply the rules to decide the debit and the credit. Write the date, the debit account, the credit account and the amounts. Finally write the narration and check that the debit total equals the credit total.',
    }),
    sl('concept', 'Simple, compound and opening entries', {
      v: vKinds,
      n: 'A simple entry has one debit and one credit. A compound entry has more than one debit, or more than one credit, or both; the purchase with tax is an example. The opening entry records the balances of assets and liabilities at the start of a new year or business. Assets are debited, liabilities and capital are credited, and capital is the difference.',
    }),
    sl('example', 'Worked example 1: opening entry and a purchase with tax', {
      b: `**Kavya Stores**, an imagined stationery shop, April 2027. Tax is charged at an imagined **${RATE}%**, split equally into CGST and SGST.`,
      bl: [`Opening entry: Cash ${inr(KV.cash0)} and Furniture ${inr(KV.furn)} Dr.; Capital ${inr(KV.cap)} Cr.`, `Purchase: tax = ${inr(KV.purch)} × ${RATE}/100 = ${inr(KV.pg.tax)}; Mehta Paper Mart is credited with ${inr(KV.purchTotal)}.`],
      v: vJ12,
      n: `Kavya Stores starts on the first of April with cash of ${rupees(KV.cash0)} and furniture of ${rupees(KV.furn)}. This is a compound opening entry: cash and furniture are debited and capital is credited with ${rupees(KV.cap)}. On the third of April it buys goods of ${rupees(KV.purch)} on credit, and tax of ${rupees(KV.pg.tax)} is added. Purchases and the two input tax accounts are debited, and the supplier is credited with ${rupees(KV.purchTotal)}.`,
    }),
    sl('example', 'Worked example 2: rent, a cash sale and a credit sale', {
      b: 'Tax on sales is collected for the government, so **output** CGST and SGST are credited.',
      bl: [`Cash sale: tax ${inr(KV.s1g.tax)}; Cash is debited with ${inr(KV.s1Total)}.`, `Credit sale: tax ${inr(KV.s2g.tax)}; Sunita Gupta is debited with ${inr(KV.s2Total)}.`],
      v: vJ35,
      n: `On the fifth, rent of ${rupees(KV.rent)} is paid. On the eighth, goods of ${rupees(KV.cashSale)} are sold for cash, with tax of ${rupees(KV.s1g.tax)}, so cash is debited with ${rupees(KV.s1Total)}. On the tenth, goods of ${rupees(KV.creditSale)} are sold on credit to Sunita Gupta, and she is debited with ${rupees(KV.s2Total)}. Sales and the two output tax accounts are credited.`,
    }),
    sl('check', 'Quick check: order of the steps', {
      b: 'Arrange the steps of recording a transaction in the journal.',
      chk: 'ord_journal_steps',
      n: 'Put the four steps in their natural order. Which comes first, deciding the sides or identifying the accounts, and when is the narration written?',
    }),
    sl('example', 'Worked example 3: transactions 6 to 10', {
      b: 'Five simple entries complete the month. Both columns of the journal total **' + rs(KV_J.total) + '**.',
      v: vJ610,
      n: `The next five transactions are simple. The firm pays ${rupees(KV.paidMehta)} to its supplier, receives ${rupees(KV.recd)} from Sunita Gupta, and the proprietor takes ${rupees(KV.drawn)} as drawings. It pays salary of ${rupees(KV.sal)} and receives commission of ${rupees(KV.comm)}. Altogether the debit column of the journal totals ${rupees(KV_J.total)}, equal to the credit column.`,
    }),
    sl('concept', 'The ledger: the book of accounts', {
      b: 'Each account has a **debit side** (**To**) and a **credit side** (**By**), with columns for date, particulars, **J.F.** and amount.',
      v: vT,
      n: 'The ledger is the book of accounts. Each account has its own page with two sides. The left side is the debit side, and each particular begins with the word to. The right side is the credit side, and each particular begins with the word by. Each side has columns for the date, the particulars, the journal folio and the amount. Here is part of a cash account.',
    }),
    sl('concept', 'Posting and folios', {
      v: vSteps,
      n: 'Posting means copying each journal entry into the ledger. For each debit, write it on the debit side of that account, naming the other account with the word to. For each credit, write it on the credit side with the word by. Write the journal page in the journal folio column of the ledger, and the ledger page in the ledger folio column of the journal.',
    }),
    sl('example', 'Worked example 4: the cash account', {
      b: `All cash entries of Kavya Stores are posted to **Cash A/c**. Debit total ${rs(cashTot)}; balance **${rs(cashBal)}**, a debit balance.`,
      v: vCash,
      n: `Here is the cash account of Kavya Stores. The debit side has capital of ${rupees(KV.cash0)}, the cash sale of ${rupees(KV.s1Total)}, ${rupees(KV.recd)} from Sunita Gupta and commission of ${rupees(KV.comm)}. The credit side has rent, the payment to the supplier, drawings and salary. The debit total is ${rupees(cashTot)}. The balance carried down is ${rupees(cashBal)}, a debit balance, brought down on the first of May.`,
    }),
    sl('concept', 'Balancing: carried down and brought down', {
      v: vBal,
      n: 'To balance an account, total both sides and find the difference. Write it on the smaller side as balance carried down, so that both sides are equal. On the first day of the next period, write the same amount on the opposite side as balance brought down. Assets and expenses show debit balances. Liabilities, capital and revenue show credit balances. A debtor shows a debit balance, and a creditor a credit balance.',
    }),
    sl('check', 'Quick check: balancing', {
      b: 'Find the closing balance of a cash account.',
      chk: 'n_cash_bal',
      n: 'Total the debit side and the credit side separately, then subtract the smaller from the larger. Decide which side is larger to know whether the balance is a debit or a credit.',
    }),
    sl('concept', 'Journal and ledger compared', {
      v: vJL,
      n: 'The journal records transactions in date order and is the book of original entry. The ledger groups the same entries account by account and is the book of final entry. The journal is written first, and the ledger is prepared from it by posting. The journal shows both accounts of each entry together, while a ledger account shows the many entries of one account together.',
    }),
    sl('example', 'Worked example 5: do the balances agree?', {
      b: `After posting, list every balance. The debit balances and the credit balances each total **${rs(KV_TB.dr)}**.`,
      v: vTb,
      n: `After posting, every account is balanced and the balances can be listed. The debit balances are cash, furniture, purchases, input taxes, rent, the debtor, drawings and salaries. The credit balances are capital, the supplier, sales, output taxes and commission. Both lists total ${rupees(KV_TB.dr)}, which shows that the posting is arithmetically correct.`,
    }),
    sl('check', 'Quick check: c/d and b/d', {
      b: 'Fill in the two short names used when an account is balanced.',
      chk: 'fb_ledger',
      n: 'Recall the two short names used when an account is balanced, one on the smaller side at the close of the period and one on the opposite side at the start of the next.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Debit assets, expenses and drawings when they increase; credit liabilities, capital and revenue.', 'The journal records each transaction with its narration in date order.', 'Posting carries entries to the ledger; accounts are balanced with c/d and b/d.'],
      v: vSum2,
      n: 'To sum up. Debit assets, expenses and drawings when they increase, and credit liabilities, capital and revenue. The journal records each transaction with its narration in date order. Posting carries the entries to the ledger, with folios as references. Balancing gives balance carried down and balance brought down, and every balance is a debit or a credit.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Date, debit account first, credit account with To, amounts and narration.', 'Show tax separately, at the rate given.', 'Total both sides, balance on the smaller side, bring it down.'],
      v: vTips2,
      n: 'In the examination, write the date, the debit account first, the credit account with to, the amounts, and a narration for every entry. Show the tax separately and use the rate given. When balancing, total both sides, write the balance on the smaller side as carried down, and bring it down on the opposite side. Check that both sides total the same.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Recording of Transactions I — Notes',
  sections: [
    {
      h: '1. Business transactions and source documents',
      t: 1,
      b: 'A **business transaction** is an exchange of money or money\'s worth between the business and an outsider that can be measured in money. A **cash transaction** is settled at once; a **credit transaction** is settled later and creates a debtor or a creditor. A plan, an enquiry or a promise is not a transaction.\n\n**Source documents** are the first written proof of a transaction: the **cash memo** (cash sale), the **invoice** or bill (credit sale), the **receipt** (money received), the **pay-in-slip** (deposit in a bank), the **cheque** (order to pay), the **debit note** (sent by a buyer returning goods) and the **credit note** (sent by a seller accepting the return).',
      terms: [
        ['Business transaction', 'An exchange of money or money\'s worth between the business and an outsider, measurable in money.'],
        ['Source document', 'The first written evidence of a transaction, from which the entry is prepared.'],
        ['Invoice', 'A document made out by the seller for goods sold on credit, showing goods, rate, tax and the amount due.'],
        ['Debit note', 'A document sent by a buyer to a seller, stating the amount debited to the seller\'s account, for example for goods returned.'],
        ['Credit note', 'A document sent by a seller to a buyer, stating the amount credited to the buyer\'s account for goods accepted back.'],
      ],
      v: vFlow,
      vs: [vDocs1, vDocs2],
    },
    {
      h: '2. Accounting vouchers',
      t: 1,
      b: 'An **accounting voucher** is a written document, prepared from the source documents, that supports an entry in the books. It carries the **date**, **number**, the accounts **debited and credited**, the **amount**, a **narration** and **signatures** of those who prepare, check and authorise it.\n\nA **debit voucher** supports a cash payment, a **credit voucher** a cash receipt, and a **journal (transfer) voucher** a transaction in which no cash moves, such as a credit purchase, a return or an adjustment.',
      terms: [
        ['Voucher', 'A written document, prepared from source documents, that supports an entry in the books of account.'],
        ['Debit voucher', 'A voucher prepared for a cash payment.'],
        ['Credit voucher', 'A voucher prepared for a cash receipt.'],
        ['Journal voucher', 'A voucher, also called a transfer voucher, prepared for a transaction in which no cash moves.'],
      ],
      v: vVch,
      vs: [vVoucherKinds, vWhich],
    },
    {
      h: '3. The accounting equation',
      t: 2,
      b: '**Assets = Liabilities + Capital.** Assets are the resources the business owns; liabilities are its obligations to outsiders; capital is the proprietor\'s claim. Because every transaction has two sides of equal value, the equation holds after every transaction.\n\n**Capital** rises with capital introduced and profit (revenues less expenses) and falls with losses and **drawings**: closing capital = opening capital + capital introduced + profit − drawings. A cash sale at a profit raises capital by the profit; an expense or drawings lower an asset and capital; a loan repaid lowers an asset and a liability.',
      terms: [
        ['Accounting equation', 'Assets = Liabilities + Capital; it holds after every transaction.'],
        ['Asset', 'A resource owned by the business, from which future benefit is expected.'],
        ['Liability', 'An amount the business owes to an outsider.'],
        ['Capital', 'The amount the proprietor has invested in the business and which the business owes to the proprietor: assets less outside liabilities.'],
        ['Drawings', 'Cash or goods taken out of the business by the proprietor for personal use; they reduce capital.'],
      ],
      v: vEqBal,
      vs: [vEffects, vRoEq],
    },
    {
      h: '4. Rules of debit and credit',
      t: 3,
      b: 'By the **accounting equation approach**: an increase in **assets**, **expenses and losses**, and **drawings** is **debited**, and a decrease is credited. An increase in **liabilities**, **capital**, and **revenues and gains** is **credited**, and a decrease is debited. The debit is the left side of an account and the credit the right side.\n\nSome books use the **traditional approach**: personal accounts (debit the receiver, credit the giver), real accounts (debit what comes in, credit what goes out) and nominal accounts (debit expenses and losses, credit incomes and gains). Both approaches give the same entries.',
      terms: [
        ['Debit', 'The left side of an account: increases in assets, expenses and drawings; decreases in liabilities and capital.'],
        ['Credit', 'The right side of an account: increases in liabilities, capital and revenues; decreases in assets.'],
        ['Revenue', 'The amount earned from the sale of goods or services and other income, which increases capital.'],
        ['Expense', 'A cost incurred in earning revenue, which reduces capital.'],
      ],
      v: vRules,
      vs: [vUse, vTrad],
    },
    {
      h: '5. The journal and journal entries',
      t: 3,
      b: 'The **journal** is the book of original entry: transactions are recorded in date order. Each entry has the **date**, the **particulars** (the debit account first, then the credit account with **To**), the **ledger folio (L.F.)**, the **debit** and **credit** amounts and a **narration** in brackets (usually beginning with Being).\n\nA **simple entry** has one debit and one credit; a **compound entry** has more than one debit or credit; the **opening entry** records the assets (debited) and liabilities (credited) at the start, with capital as the difference.\n\n**Journalising steps:** identify the accounts, classify them, apply the rules, write the entry, add the narration and check the totals.\n\n**GST entries (as of 2024, rate imagined in the problem):** on a purchase, Input CGST and Input SGST accounts are debited with the tax, beside Purchases, and the supplier is credited with the invoice total. On a sale, Output CGST and Output SGST accounts are credited, beside Sales, and cash or the debtor is debited with the invoice total.',
      terms: [
        ['Journal', 'The book of original entry in which transactions are first recorded in date order.'],
        ['Narration', 'A brief explanation of a journal entry, written in brackets below it.'],
        ['Compound entry', 'A journal entry with more than one debit, more than one credit, or both.'],
        ['Opening entry', 'The journal entry that records the assets, liabilities and capital at the start of a business or year.'],
        ['Ledger folio (L.F.)', 'The page number of the ledger account, written in the journal against the account.'],
      ],
      v: vJ12,
      vs: [vJ35, vFormat],
    },
    {
      h: '6. The ledger, posting and balancing',
      t: 4,
      b: 'The **ledger** is the book that holds all the accounts. Each account has a **debit side** (particulars begin with **To**) and a **credit side** (particulars begin with **By**). **Posting** is the transfer of the entries from the journal to the ledger accounts; the journal folio (J.F.) goes in the ledger and the ledger folio (L.F.) in the journal.\n\nTo **balance** an account, total both sides, write the difference on the smaller side as **Balance c/d** (carried down) and bring it down on the opposite side on the next day as **Balance b/d**. A **debit balance** (assets, expenses, drawings, debtors) means the debit side is larger; a **credit balance** (liabilities, capital, revenue, creditors) means the credit side is larger.\n\nThe journal is the book of original entry and the ledger the book of final entry.',
      terms: [
        ['Ledger', 'The principal book of accounts, in which the entries of the journal are classified account by account.'],
        ['Posting', 'The transfer of the entries from the journal to the proper ledger accounts.'],
        ['Balance c/d', 'The balance of an account carried down at the end of a period, written on the smaller side.'],
        ['Balance b/d', 'The same balance brought down on the opposite side at the start of the next period.'],
        ['Debit balance', 'A balance that arises when the debit side of an account is larger than the credit side.'],
        ['Credit balance', 'A balance that arises when the credit side of an account is larger than the debit side.'],
      ],
      v: vT,
      vs: [vCash, vBal, vJL],
    },
  ],
  tips: '- Name the source document and the voucher for each transaction.\n- Equation: write all of Assets, Liabilities and Capital after each transaction; profit on a sale changes capital, not the sale price.\n- Debit the receiver of value, credit the giver: use the six rules, not guesswork.\n- Journal: date, debit account first, credit account with To, amounts, narration, equal totals.\n- GST entries: input tax debited on purchases, output tax credited on sales; use only the rate given.\n- Ledger: To on the debit side, By on the credit side; total both sides; balance on the smaller side as c/d and b/d on the opposite side.',
});

// ================================================================ flashcards
const FC = cards([
  ['**Business transaction**', 'An exchange of money or money\'s worth between the business and an outsider, measurable in money.', 'definition', 1],
  ['Cash transaction and credit transaction', 'Cash: payment is made at once. Credit: payment is to be made later.', 'concept', 1],
  ['**Source document**', 'The first written proof of a transaction, from which the entry is prepared.', 'definition', 1],
  ['**Cash memo**', 'Made by the seller for a cash sale; handed to the buyer.', 'definition', 1],
  ['**Invoice** (bill)', 'Made by the seller for goods sold on credit; shows goods, rate, tax and the amount due.', 'definition', 1],
  ['**Receipt**', 'Proof that money was received; shows the amount, date and payer.', 'definition', 1],
  ['**Pay-in-slip**', 'The bank form filled in to deposit cash or cheques; its counterfoil is the depositor\'s proof.', 'definition', 1],
  ['**Cheque**', 'A written order to a bank to pay a sum to a named person.', 'definition', 1],
  ['**Debit note**', 'Sent by a buyer who returns goods; shows the amount debited to the seller\'s account.', 'definition', 1],
  ['**Credit note**', 'Sent by a seller who accepts returned goods; shows the amount credited to the buyer\'s account.', 'definition', 1],
  ['**Voucher**', 'A written document, prepared from source documents, supporting an entry in the books.', 'definition', 1],
  ['Contents of a voucher', 'Date, number, accounts debited and credited, amount, narration and signatures.', 'fact', 1],
  ['Debit voucher and credit voucher', 'Debit voucher: cash paid. Credit voucher: cash received.', 'concept', 1],
  ['Journal (transfer) voucher', 'Prepared for a transaction in which no cash moves, such as a credit purchase or a return.', 'concept', 1],
  ['**Accounting equation**', 'Assets = Liabilities + Capital; it holds after every transaction.', 'definition', 2],
  ['Capital introduced in cash', 'Assets up, capital up.', 'fact', 2],
  ['Goods bought on credit', 'Assets (stock) up, liabilities (creditors) up.', 'fact', 2],
  ['Cash sale at a profit', 'Assets up by the profit; capital up by the profit.', 'fact', 2],
  ['Payment of an expense', 'Assets down, capital down.', 'fact', 2],
  ['**Drawings**', 'Cash or goods taken by the proprietor for personal use; assets and capital fall.', 'definition', 2],
  ['Repayment of a loan', 'Assets down, liabilities down; capital unchanged.', 'fact', 2],
  ['Closing capital', 'Opening capital + capital introduced + profit − drawings.', 'formula', 2],
  ['Debit rule (equation approach)', 'Debit increases in assets, expenses and losses, and drawings; debit decreases in liabilities and capital.', 'concept', 3],
  ['Credit rule (equation approach)', 'Credit increases in liabilities, capital, and revenues and gains; credit decreases in assets.', 'concept', 3],
  ['Traditional rules', 'Personal: debit the receiver, credit the giver. Real: debit what comes in, credit what goes out. Nominal: debit expenses and losses, credit incomes and gains.', 'concept', 3],
  ['**Journal**', 'The book of original entry: transactions recorded in date order.', 'definition', 3],
  ['**Narration**', 'A brief explanation of an entry, written in brackets below it, usually beginning with Being.', 'definition', 3],
  ['**Compound entry** and **opening entry**', 'Compound: more than one debit or credit. Opening: records assets (Dr.), liabilities and capital (Cr.) at the start.', 'definition', 3],
  ['GST accounts in a purchase entry (as of 2024)', 'Input CGST and Input SGST are debited, beside Purchases; the supplier is credited with the total.', 'fact', 3],
  ['GST accounts in a sale entry (as of 2024)', 'Output CGST and Output SGST are credited, beside Sales; cash or the debtor is debited with the total.', 'fact', 3],
  ['**Ledger** and **posting**', 'Ledger: the book of accounts. Posting: transferring journal entries to the ledger accounts.', 'definition', 4],
  ['Ledger format', 'Debit side with To, credit side with By; columns for date, particulars, J.F. and amount.', 'fact', 4],
  ['Balance c/d and balance b/d', 'c/d: the balance carried down on the smaller side. b/d: the same balance brought down on the opposite side.', 'concept', 4],
  ['Debit balance and credit balance', 'Debit: assets, expenses, drawings, debtors. Credit: liabilities, capital, revenues, creditors.', 'concept', 4],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Recording of Transactions I',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_voucher_cash', 'm_eq_cap', 'm_balance_cd', 'ar_eq'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_voucher', 's2_rules', 's3_journal4'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_docs', 'l5_ledger'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_gst_journal'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Recording of Transactions I',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_txn', 'm_invoice', 'm_debitnote', 'm_eq_loan', 'm_rule_income', 'm_compound', 'm_traditional', 'm_credit_bal', 'ar_voucher', 'ar_compound'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_memo_invoice', 's2_entry_error', { attempt: 1, keys: ['s2_notes', 's2_eq_effect'] }, 's3_eq3', { attempt: 1, keys: ['s3_compound', 's3_ledger4'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_journal10', { attempt: 1, keys: ['l5_equation8', 'l5_rules'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_documents', 'cb_ledger'] },
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
const checksUsed = new Set(['m_doc_id', 'tf_voucher', 'n_equation_cap', 'm_eq_effect', 'm_rule_drawings', 'ord_journal_steps', 'n_cash_bal', 'fb_ledger']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void same; void jrnl; void KVF; void KV_Q;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of cbse-11-accountancy-ch03 (business transactions, source documents and vouchers; accounting equation; rules of debit and credit and the journal; ledger and posting)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed with the shared acc.mjs and asserted: the accounting equation balances after every transaction (equation), every journal entry balances (journal, jrnl), ledger balances and totals agree (ledger, post, postD), the balances of all ledger accounts of Kavya Stores agree (trialFromLedgers), and the equation cash agrees with the ledger cash; GST by gst() with an imagined rate; tables in decks and model answers are generated from the computed objects',
    facts: 'source documents and voucher kinds (debit voucher for cash paid, credit voucher for cash received, journal or transfer voucher for non-cash); accounting equation; debit and credit rules by the equation approach and, in one slide, the traditional approach; journal format with L.F., narration, simple, compound and opening entries; GST input and output CGST and SGST accounts (as of 2024, imagined rate stated in each problem); ledger format with To and By, posting with folios, Balance c/d and b/d',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
