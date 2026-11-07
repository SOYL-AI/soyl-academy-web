// Build CBSE 11 Accountancy ch05 Bank Reconciliation Statement. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { rupees } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch05', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { same, check, sum, inr, rs, mdTable, CAUSES, I, statement, amended, total, W1, W2, RULE_CB, RULE_PB, GRID } = await import('./figures.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ figures (SVG)
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  lines.forEach((t, i) => s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size: o.size ?? 13, bold: o.bold && i === 0 }));
};

const vTwoBooks = (() => {
  const s = new Svg(720, 270);
  box(s, 130, 135, 230, 150, ['Cash book', 'kept by the firm', 'Deposit: debit', 'Payment: credit', 'Favourable balance: debit', 'Overdraft: credit'], { size: 12, bold: true, gap: 22 });
  box(s, 590, 135, 230, 150, ['Pass book', 'kept by the bank', 'Deposit: credit', 'Withdrawal: debit', 'Favourable balance: credit', 'Overdraft: debit'], { size: 12, bold: true, gap: 22 });
  box(s, 360, 135, 130, 70, ['One bank', 'account'], { size: 14, bold: true, fill: 'accent', gap: 22 });
  s.arrow(295, 135, 245, 135, { sw: 1.6 });
  s.arrow(425, 135, 475, 135, { sw: 1.6 });
  s.text(360, 40, 'Same transactions, opposite sides', { size: 14, bold: true });
  s.text(360, 235, 'Each book mirrors the other', { size: 13 });
  return s.visual('Two books, one account: the cash book kept by the firm shows a deposit as a debit, a payment as a credit, a favourable balance as a debit and an overdraft as a credit; the pass book kept by the bank shows a deposit as a credit, a withdrawal as a debit, a favourable balance as a credit and an overdraft as a debit; both describe the same bank account', 'Both books describe one account, written from opposite sides.');
})();

const vCauses = (() => {
  const s = new Svg(780, 340);
  box(s, 390, 28, 300, 34, 'Differences between the two books', { size: 14, bold: true, fill: 'accent' });
  box(s, 190, 105, 200, 34, 'Timing differences', { size: 14, bold: true, fill: 'accent' });
  box(s, 600, 105, 130, 34, 'Errors', { size: 14, bold: true, fill: 'accent' });
  s.line(390, 45, 190, 88, { sw: 1.4, color: 'muted' });
  s.line(390, 45, 600, 88, { sw: 1.4, color: 'muted' });
  const leaves = [
    [95, 170, ['Recorded by', 'the firm first', 'Cheques issued,', 'not yet presented', 'Cheques deposited,', 'not yet collected'], 150],
    [285, 190, ['Recorded by', 'the bank first', 'Bank charges, interest', 'Direct deposits', 'Standing instructions', 'Dishonoured cheques'], 150],
    [505, 160, ['Error in', 'the cash book', 'Wrong amount', 'Wrong addition', 'Item left out'], 130],
    [690, 150, ['Error by', 'the bank', 'Wrong credit', 'Wrong debit'], 110],
  ];
  leaves.forEach(([x, w, lines, hh], i) => {
    s.line(i < 2 ? 190 : 600, 122, x, 235 - hh / 2, { sw: 1.2, color: 'muted' });
    box(s, x, 235, w, hh, lines, { size: 12, bold: true, gap: 20 });
  });
  return s.visual('Chart of the causes of difference between the cash book and the pass book: timing differences are either recorded by the firm first (cheques issued not yet presented, cheques deposited not yet collected) or recorded by the bank first (bank charges and interest, direct deposits, standing instructions, dishonoured cheques); errors are either in the cash book (wrong amount, wrong addition, item left out) or by the bank (wrong credit, wrong debit)', 'Timing differences correct themselves; errors must be corrected.');
})();

const vDecision = (() => {
  const s = new Svg(720, 300);
  box(s, 360, 40, 420, 50, ['Does the item make the other book', 'show a higher favourable balance?'], { size: 14, bold: true, fill: 'accent', gap: 20 });
  s.arrow(250, 66, 180, 140, { sw: 1.6 });
  s.arrow(470, 66, 540, 140, { sw: 1.6 });
  s.text(190, 98, 'Yes: higher', { size: 13, bold: true });
  s.text(535, 98, 'No: lower', { size: 13, bold: true });
  box(s, 180, 205, 300, 110, ['Starting from a', 'favourable balance: ADD', 'Starting from an', 'overdraft: DEDUCT'], { size: 13, gap: 22 });
  box(s, 540, 205, 300, 110, ['Starting from a', 'favourable balance: DEDUCT', 'Starting from an', 'overdraft: ADD'], { size: 13, gap: 22 });
  return s.visual('Add or deduct decision flow: ask whether the item makes the other book show a higher favourable balance; if yes, add it when starting from a favourable balance and deduct it when starting from an overdraft; if no, deduct it when starting from a favourable balance and add it when starting from an overdraft', 'One question decides every item.');
})();

const vAmendFlow = (() => {
  const s = new Svg(780, 200);
  const xs = [75, 235, 395, 555, 705];
  const labels = [['Cash book', 'balance'], ['Enter items the', 'bank recorded', 'first'], ['Amended', 'cash book', 'balance'], ['Add or deduct', 'unpresented and', 'uncollected', 'cheques'], ['Pass book', 'balance']];
  labels.forEach((l, i) => box(s, xs[i], 100, i === 4 ? 120 : 130, 96, l, { size: 12, bold: i !== 3 && i !== 1, gap: 19, fill: i === 2 ? 'accent' : 'fill' }));
  for (let i = 0; i < 4; i++) s.arrow(xs[i] + (i === 0 ? 65 : 65), 100, xs[i + 1] - (i === 3 ? 60 : 65), 100, { sw: 1.8 });
  s.text(390, 28, 'Amend first, then reconcile what is left', { size: 14, bold: true });
  s.text(390, 175, 'After amending, only timing differences of cheques remain', { size: 13 });
  return s.visual('Flow from the cash book balance through entering the items the bank recorded first, giving the amended cash book balance, then adding or deducting the unpresented and uncollected cheques to reach the pass book balance', 'Update the cash book first; only cheque timing differences are left.');
})();

// ================================================================ tables for slides
const T = (headers, rows, alt) => table(headers, rows, alt);
const hl = (x) => (x > 0 ? 'Higher' : 'Lower');
const entry = (c) => (c.where === 'cash book' ? 'None: already in the cash book' : c.effect > 0 ? 'Debit the bank column' : 'Credit the bank column');
const gapOf = (c) => (c.where === 'cash book' ? -c.effect : c.effect);
const causeRows = (keys) => keys.map((k) => [CAUSES[k].label.replace(/, not yet in the cash book$/, '').replace(/, debited by the bank$/, ''), CAUSES[k].where, hl(gapOf(CAUSES[k])), entry(CAUSES[k])]);
const CH = ['Cause', 'Recorded first in', 'Pass book compared with cash book', 'Entry needed in the cash book'];

const vBooks = T(['', 'Cash book', 'Pass book'], [
  ['Kept by', 'The firm', 'The bank'],
  ['Deposit', 'Debit (bank column)', 'Credit'],
  ['Payment or withdrawal', 'Credit (bank column)', 'Debit'],
  ['Favourable balance', 'Debit balance', 'Credit balance'],
  ['Overdraft', 'Credit balance', 'Debit balance'],
], 'Table comparing the cash book and the pass book: who keeps each, how a deposit, a payment, a favourable balance and an overdraft appear in each');
const vNeed = T(['Need', 'What the statement gives'], [
  ['Find the reasons for the difference', 'Every item that separates the two balances is listed'],
  ['Detect errors and frauds', 'A difference that cannot be explained points to a mistake or misuse'],
  ['Update the cash book', 'Items the bank has recorded first show what to enter'],
  ['Check the bank\'s work', 'A wrong debit or credit by the bank is found'],
], 'Table of four needs of a bank reconciliation statement: finding reasons, detecting errors and frauds, updating the cash book and checking the bank');
const vNotAcc = T(['Point', 'Reconciliation statement', 'Bank account in the ledger'], [
  ['What it is', 'A statement prepared on a date', 'An account with debit and credit sides'],
  ['Part of double entry', 'No', 'Yes'],
  ['Purpose', 'Explain the difference between two balances', 'Record transactions with the bank'],
], 'Table comparing a bank reconciliation statement and a bank account: what each is, whether it is part of double entry and its purpose');
const vFirm = T(CH, causeRows(['issued', 'deposited']), 'Table of causes recorded by the firm first: cheques issued but not yet presented, and cheques deposited but not yet collected, with the effect on the pass book and the entry needed in the cash book');
const vBank = T(CH, causeRows(['charges', 'odint', 'intallowed', 'directdep', 'directpay', 'collected']), 'Table of causes recorded by the bank first: charges, interest on overdraft, interest allowed, direct deposit, payment on standing instruction and collection, with the effect on the pass book and the entry needed in the cash book');
const vDish = T(['Step', 'Cash book', 'Pass book'], [
  ['Cheque received and deposited', 'Debit the bank column', 'Not yet recorded'],
  ['Bank collects the cheque', 'No change', 'Credit the account'],
  ['Cheque is returned unpaid', 'Not yet known', 'Debit the account'],
  ['Firm learns of it', 'Credit the bank column; debit the customer', 'No change'],
], 'Table of the steps of a dishonoured cheque in the cash book and the pass book');
const vErr = T(['Error', 'Made by', 'Effect', 'Put right by'], [
  ['Receipt entered too low or a debit side added short', 'The firm', 'Cash book too low', 'Correcting the cash book'],
  ['Payment entered too low or a credit side added short', 'The firm', 'Cash book too high', 'Correcting the cash book'],
  ['Deposit credited to the wrong customer', 'The bank', 'Pass book too low', 'The bank correcting its record'],
  ['Cheque of another customer debited', 'The bank', 'Pass book too low', 'The bank correcting its record'],
], 'Table of errors in the cash book and by the bank, who made each, the effect on the balance and who puts it right');
const cls = (key, text) => [text, CAUSES[key].where, CAUSES[key].where === 'cash book' ? 'Timing difference' : 'Timing difference (bank item)', entry(CAUSES[key])];
const vClass = T(['Item on 30 April 2027', 'Recorded first in', 'Kind', 'Entry needed in the cash book'], [
  cls('issued', `Cheque of ${rs(4800)} issued on 28 April, not presented`),
  cls('deposited', `Cheque of ${rs(6200)} deposited on 30 April, not collected`),
  cls('charges', `Charges of ${rs(210)} debited by the bank`),
  cls('intallowed', `Interest of ${rs(330)} allowed by the bank`),
  cls('directdep', `Direct deposit of ${rs(3000)} by a customer`),
  cls('directpay', `Rent of ${rs(1500)} paid by the bank on standing instruction`),
  cls('collected', `Dividend of ${rs(900)} collected by the bank`),
  cls('dishonour', `Cheque of ${rs(2400)} deposited and returned unpaid`),
], 'Table classifying eight items of Neel Traders on 30 April 2027 by the book that recorded each first, its kind and the entry needed in the cash book');
const vW1tx = T(W1.tx.headers, W1.tx.rows, `Transactions of Neel Traders in March 2027 with the effect each book has recorded: the cash book balance is ${inr(W1.cb)} and the pass book balance is ${inr(W1.pb)} rupees`);
const vW1gap = T(W1.gapTable.headers, W1.gapTable.rows, `Table of the six causes that make the pass book balance ${inr(W1.pb)} differ from the cash book balance ${inr(W1.cb)}: the net difference is ${inr(W1.gap)} rupees`);
const vSplit = T(['Part of the difference', 'Amount (₹)'], [
  ['Timing differences of cheques (cheques issued less cheques deposited)', inr(W1.timingNet)],
  ['Items the bank recorded first (net)', `−${inr(-W1.bankNet)}`],
  ['**Pass book balance less cash book balance**', `**${inr(W1.gap)}**`],
], `Table splitting the difference of ${inr(W1.gap)} rupees into the cheque timing differences of ${inr(W1.timingNet)} and the net bank items of minus ${inr(-W1.bankNet)}`);
const vSum1 = T(['Topic', 'Key points'], [
  ['Two books', 'Cash book (firm) and pass book (bank) are mirror images; a favourable balance is a debit in one and a credit in the other'],
  ['Statement', 'Prepared on a date to explain the difference; not an account'],
  ['Need', 'Reasons, errors and frauds, updating the cash book, checking the bank'],
  ['Causes', 'Timing differences (firm first, bank first) and errors (cash book, bank)'],
], 'Summary table of the two books, the reconciliation statement, its need and the causes of difference');
const vTips1 = T(['Do', 'Why'], [
  ['Say which book recorded the item first', 'It decides whether a cash book entry is needed'],
  ['Keep timing differences and errors apart', 'Errors must be corrected; timing differences correct themselves'],
  ['Remember the mirror: deposit is debit in the cash book, credit in the pass book', 'It stops sign mistakes'],
  ['Name the side of the bank column for each bank item', 'Marks are given for the entry'],
], 'Exam tips table for the causes of difference');

const vRuleCB = T(RULE_CB.headers, RULE_CB.rows, 'Table of what to do with each cause, starting from a favourable cash book balance: cheques issued not presented, interest allowed, direct deposit and dividend collected are added; cheques deposited not collected, charges, interest on overdraft, standing instruction payments and dishonoured cheques are deducted');
const vRulePB = T(RULE_PB.headers, RULE_PB.rows, 'Table of what to do with each cause, starting from a favourable pass book balance: every treatment is the opposite of the one starting from the cash book');
const vGrid = T(GRID.headers, GRID.rows, 'Table of add or deduct for each cause from the four starting points: cash book favourable, cash book overdraft, pass book favourable and pass book overdraft');
const vSteps = flow('LR', ['Note the starting balance', 'List the differences', 'Decide add or deduct', 'Work out the result', 'Check with the other book'], 'Flow of the steps in preparing a statement: note the starting balance, list the differences, decide add or deduct, work out the result and check it against the other book', 'Five steps, in this order.');
const vW1cb = T(W1.fromCB.headers, W1.fromCB.rows, `Bank reconciliation statement of Neel Traders as on 31 March 2027 starting from the cash book balance of ${inr(W1.cb)}: additions ${inr(total(W1.fromCB.adds))}, deductions ${inr(total(W1.fromCB.lesses))}, balance as per pass book ${inr(W1.pb)} rupees`);
const vW1pb = T(W1.fromPB.headers, W1.fromPB.rows, `The same statement starting from the pass book balance of ${inr(W1.pb)}: additions ${inr(total(W1.fromPB.adds))}, deductions ${inr(total(W1.fromPB.lesses))}, balance as per cash book ${inr(W1.cb)} rupees`);
const vW2tx = T(W2.tx.headers, W2.tx.rows, `Transactions of Neel Traders in June 2027 with an opening overdraft of ${inr(12000)}: the cash book shows an overdraft of ${inr(-W2.cb)} and the pass book an overdraft of ${inr(-W2.pb)} rupees`);
const vW2 = T(W2.fromPB.headers, W2.fromPB.rows, `Statement of Neel Traders as on 30 June 2027 starting from the pass book overdraft of ${inr(-W2.pb)}: additions ${inr(total(W2.fromPB.adds))}, deductions ${inr(total(W2.fromPB.lesses))}, overdraft as per cash book ${inr(-W2.cb)} rupees`);
const vAm = T(W1.am.headers, W1.am.rows, `Amended cash book of Neel Traders, bank column, as on 31 March 2027: opening balance ${inr(W1.cb)}, interest ${inr(640)} and dividend ${inr(2500)} on the debit side, charges ${inr(380)} and insurance premium ${inr(4200)} on the credit side, balance ${inr(W1.am.newBal)} rupees`);
const vAfter = T(W1.afterAm.headers, W1.afterAm.rows, `Statement of Neel Traders as on 31 March 2027 starting from the amended cash book balance of ${inr(W1.am.newBal)}: unpresented cheques ${inr(W1.issued)} added, uncollected cheques ${inr(W1.deposited)} deducted, balance as per pass book ${inr(W1.pb)} rupees`);
const vErrBRS = T(['Error', 'Where it is corrected', 'In the statement?'], [
  ['Cash book error (wrong amount, short addition, item left out)', 'In the cash book, by a correcting entry', 'Not after the cash book is corrected'],
  ['Bank error (wrong debit or credit)', 'In the bank\'s own record, on notice from the firm', 'Yes, until the bank corrects it'],
  ['Timing difference of a cheque', 'Corrects itself when the other book records it', 'Yes'],
  ['Bank item not yet in the cash book', 'In the amended cash book', 'Not after amending'],
], 'Table of where each kind of error or difference is corrected and whether it stays in the statement');
const vWhich = T(['Method', 'Starting point', 'Items in the statement', 'Result'], [
  ['Without amending', 'Cash book or pass book balance', 'All causes of difference', 'Balance of the other book'],
  ['With an amended cash book', 'Amended cash book balance', 'Only cheque timing differences and bank errors', 'Pass book balance'],
], 'Table comparing a statement without an amended cash book and one prepared from the amended cash book');
const vSum2 = T(['Topic', 'Key points'], [
  ['Rule', 'Does the item make the other book higher? Favourable start: add if yes, deduct if no. Overdraft start: reversed'],
  ['Either book', 'Starting from the pass book reverses every treatment and reaches the cash book balance'],
  ['Overdraft', 'A negative result is reported as an overdraft'],
  ['Amended cash book', 'Enter the bank\'s items first; then only cheque timing differences remain'],
], 'Summary table of the add or deduct rule, either starting book, overdrafts and the amended cash book');
const vTips2 = T(['Do', 'Why'], [
  ['Write the heading with the firm and the date', 'It is part of the answer'],
  ['Name the starting balance and say whether favourable or overdraft', 'The add or deduct rule depends on it'],
  ['Check the result against the other book', 'It proves the statement'],
  ['Show an overdraft result as an overdraft', 'A negative balance is not a favourable one'],
], 'Exam tips table for preparing a statement');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Bank Reconciliation Statement, Part 1: Two Books and the Causes of Difference',
  goals: [
    'Explain how the cash book and the pass book record the same bank account from opposite sides',
    'State the meaning and the need of a bank reconciliation statement',
    'Identify the causes of difference between the two books and separate timing differences from errors',
  ],
  slides: [
    sl('title', 'Two books, one bank account', {
      b: 'Part 1: why the **cash book** and the **pass book** differ, and what a **bank reconciliation statement** is for.',
      v: vTwoBooks,
      n: 'Welcome to the chapter on the bank reconciliation statement. A firm keeps a cash book, and its bank keeps a pass book. Both describe the same account, yet on the same day they seldom show the same balance. In this part we see why the books differ, why that matters, and which causes are timing differences and which are errors.',
    }),
    sl('concept', 'Pass book and cash book', {
      b: 'The **pass book** (bank statement) is the bank\'s copy of the customer\'s account. The bank column of the **cash book** is the firm\'s copy.',
      v: vBooks,
      n: 'The pass book, also called the bank statement, is the bank\'s own copy of the customer\'s account. The cash book is the firm\'s record, and its bank column describes the same account. The bank and the firm stand on opposite sides, so each transaction is entered on opposite sides. A deposit is a debit in the cash book and a credit in the pass book.',
    }),
    sl('concept', 'Favourable balance and overdraft', {
      b: 'A **favourable balance** is money at the bank: a debit in the cash book, a credit in the pass book. An **overdraft** is the reverse.',
      v: vBooks,
      n: 'Money at the bank is a favourable balance. In the cash book it is a debit balance, and in the pass book it is a credit balance. An overdraft is the reverse, because the firm has drawn more than it deposited. In the cash book an overdraft is a credit balance, and in the pass book it is a debit balance. Keep this mirror in mind through the whole chapter.',
    }),
    sl('check', 'Quick check: reading the balances', {
      b: 'A favourable balance in the two books.',
      chk: 'm_dr_cr',
      n: 'Think of the firm and the bank as opposite parties. Which side does a favourable balance take in the firm cash book, and which side does the bank give it in the pass book? Choose the option that treats the two books as mirror images.',
    }),
    sl('concept', 'The bank reconciliation statement', {
      b: 'A **bank reconciliation statement** is prepared on a given date to explain the difference between the balance of the cash book and that of the pass book. It is **not an account**.',
      v: vNotAcc,
      n: 'A bank reconciliation statement is prepared on a chosen date to show why the cash book balance and the pass book balance differ, and to bring them into agreement. It is a statement and not an account. It has no debit and credit sides, it is not part of double entry, and nothing is posted from it to the ledger.',
    }),
    sl('concept', 'Why prepare the statement', {
      v: vNeed,
      n: 'There are four reasons to prepare the statement. It finds the reasons for the difference between the two balances. It helps to detect errors and frauds, because a difference that cannot be explained points to a mistake or misuse. It shows which entries must be made to bring the cash book up to date. And it checks the work of the bank.',
    }),
    sl('diagram', 'Causes of difference at a glance', {
      v: vCauses,
      n: 'The differences fall into two groups. Timing differences arise when one book records a transaction later than the other. Some are recorded by the firm first, such as cheques issued or deposited. Others are recorded by the bank first, such as charges and interest. Errors are mistakes, either in the cash book or by the bank. Timing differences correct themselves, but errors must be corrected.',
    }),
    sl('concept', 'Recorded by the firm first', {
      b: 'The firm enters a cheque on the day it issues or deposits it; the bank does so only on **presentation** or **collection**.',
      v: vFirm,
      n: 'Two causes are recorded by the firm first. When the firm issues a cheque it credits the bank column at once, but the bank pays only when the supplier presents the cheque, so the pass book is higher until then. When the firm deposits a cheque it debits the bank column at once, but the bank credits it after collection, so the pass book is lower. No entry is needed in the cash book.',
    }),
    sl('check', 'Quick check: timing or error', {
      b: 'Which item is a timing difference?',
      chk: 'm_timing_which',
      n: 'A timing difference is a transaction that both books will record, one of them a little later. A mistake in an amount or in an addition is an error. Read the four items and pick the one that will correct itself when the bank records it.',
    }),
    sl('concept', 'Recorded by the bank first', {
      b: 'The bank enters charges, interest, collections and payments when they happen; the firm learns of them from the pass book.',
      v: vBank,
      n: 'Other causes are recorded by the bank first. Interest allowed, a direct deposit by a customer and a dividend collected by the bank all increase the pass book. Bank charges, interest on overdraft and a payment under a standing instruction decrease it. The firm must enter each of these in its cash book, a receipt on the debit side and a payment on the credit side of the bank column.',
    }),
    sl('concept', 'A dishonoured cheque', {
      b: 'A cheque deposited and returned unpaid is first counted by the firm and then reversed by the bank.',
      v: vDish,
      n: 'A cheque that the firm has deposited may be returned unpaid. The firm has already debited the bank column, and the bank, after the return, debits the account. Until the firm learns of it, the pass book is lower than the cash book. When the firm learns of it, it credits the bank column and debits the customer, so that the debt of the customer is revived.',
    }),
    sl('example', 'Worked example 1: classify the items', {
      b: '**Neel Traders**, an imagined hardware wholesaler, finds eight differences with **Sagar Bank**, an imagined bank, on 30 April 2027.',
      bl: ['Items recorded by the firm first need **no** cash book entry.', 'Items recorded by the bank first need an entry on the stated side.'],
      v: vClass,
      n: 'Neel Traders, an imagined firm, finds eight differences on thirtieth April. The two cheques were recorded by the firm first, so no cash book entry is needed. The other six were recorded by the bank first. Interest, the direct deposit and the dividend are receipts, so they are debits in the bank column. Charges, the rent and the returned cheque are payments, so they are credits.',
    }),
    sl('example', 'Worked example 2: why the balances differ', {
      b: `Neel Traders and Sagar Bank, March 2027: the cash book shows **${rs(W1.cb)}** and the pass book **${rs(W1.pb)}**.`,
      bl: [`Pass book − cash book = **${rs(W1.gap)}**.`, 'Each of the six causes moves the pass book relative to the cash book.'],
      v: vW1gap,
      n: `Neel Traders had eleven transactions in March. Its cash book shows ${rupees(W1.cb)}, and the pass book of Sagar Bank shows ${rupees(W1.pb)}. The pass book is higher by ${rupees(W1.gap)}. The six causes explain every rupee of this gap: cheques issued raise the pass book, cheques deposited lower it, and each bank item raises or lowers it by its own amount.`,
    }),
    sl('example', 'Worked example 3: timing against bank items', {
      b: `Of the ${rs(W1.gap)} difference, the cheques account for **${rs(W1.timingNet)}** and the bank items for **−${rs(-W1.bankNet)}**.`,
      v: vSplit,
      n: `The difference of ${rupees(W1.gap)} can be split in two parts. The two kinds of cheque together make the pass book higher by ${rupees(W1.timingNet)}. The items that the bank recorded first make it lower by ${rupees(-W1.bankNet)}. The first part needs no cash book entry. The second part tells the firm which entries it must still make.`,
    }),
    sl('check', 'Quick check: the size of the difference', {
      b: 'Three differences, one number.',
      chk: 'n_gap',
      n: 'Find by how much the pass book is higher than the cash book. Cheques issued but not presented make the pass book higher, cheques deposited but not collected make it lower, and the bank charges make it lower. Combine the three effects with their signs.',
    }),
    sl('concept', 'Errors in either book', {
      v: vErr,
      n: 'Errors are different from timing differences. The firm may enter a receipt too low or add a side short, which makes the cash book wrong. The bank may credit a deposit to the wrong customer or debit a cheque of another customer, which makes the pass book wrong. The firm corrects its own book. A bank error stays in the statement until the bank puts it right.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Terms and meanings.',
      chk: 'mt_terms',
      n: 'Match each term with its meaning. The pass book belongs to the bank and the cash book to the firm. An overdraft is the reverse of a favourable balance, and the reconciliation statement explains the gap between the two balances on a date.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['The cash book and the pass book are mirror images of one account.', 'The statement is prepared on a date to explain the difference; it is not an account.', 'Timing differences: recorded by the firm first, or by the bank first. Errors: in the cash book or by the bank.'],
      v: vSum1,
      n: 'To sum up. The cash book and the pass book are mirror images of one account. The reconciliation statement explains the difference between their balances on a date, and it is not an account. Differences are timing differences, recorded first by the firm or by the bank, or errors, made in the cash book or by the bank. In the next part we prepare the statement.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say which book recorded the item first.', 'Keep timing differences and errors separate.', 'Name the side of the bank column for each bank item.'],
      v: vTips1,
      n: 'In the examination, say which book recorded each item first, because that decides whether a cash book entry is needed. Keep timing differences and errors apart. Remember that a deposit is a debit in the cash book and a credit in the pass book. And for every item recorded by the bank first, name the side of the bank column on which the firm should enter it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Bank Reconciliation Statement, Part 2: Preparing the Statement',
  goals: [
    'Prepare a bank reconciliation statement starting from either the cash book or the pass book',
    'Handle a favourable balance and an overdraft, and report a negative result as an overdraft',
    'Prepare an amended cash book and then the statement from its balance',
  ],
  slides: [
    sl('title', 'Preparing the statement', {
      b: 'Part 2: from either book, with a favourable balance or an **overdraft**, and with an **amended cash book**.',
      v: vDecision,
      n: 'In this part we prepare the statement. We start from either book, with a favourable balance or an overdraft. We also bring the cash book up to date first, and then reconcile what is left. One simple question decides whether every item is added or deducted, and we will use it in all the examples.',
    }),
    sl('concept', 'Five steps', {
      b: 'Prepare the statement in the **same order** every time.',
      v: vSteps,
      n: 'Prepare the statement in the same order every time. Note the balance of the book you start from, and say whether it is favourable or an overdraft. List every difference between the two books. Decide for each item whether to add or deduct. Work out the result. And check it against the balance actually shown by the other book.',
    }),
    sl('diagram', 'One question decides add or deduct', {
      v: vDecision,
      n: 'Here is the rule. Ask whether the item makes the other book show a higher favourable balance. If it does, add it when you start from a favourable balance, and deduct it when you start from an overdraft. If it makes the other book lower, do the opposite. The same question works for every cause and from either book.',
    }),
    sl('concept', 'Starting from the cash book', {
      b: 'Favourable cash book balance: items that make the pass book **higher** are **added**.',
      v: vRuleCB,
      n: 'Starting from a favourable cash book balance, add the cheques issued but not presented, the interest allowed, the direct deposits and the dividends collected. Deduct the cheques deposited but not collected, the bank charges, the interest on overdraft, the payments on standing instruction and the dishonoured cheques. The result is the pass book balance.',
    }),
    sl('check', 'Quick check: add or deduct', {
      b: 'From a favourable cash book balance.',
      chk: 'm_cb_issued',
      n: 'The cash book has already deducted the cheques that were issued, and the bank has not. So the cash book is the lower balance. To reach the pass book from the cash book, should the cheques be added or deducted? Pick the option that gives the right reason.',
    }),
    sl('concept', 'Starting from the pass book', {
      b: 'Starting from the pass book reverses **every** treatment.',
      v: vRulePB,
      n: 'Starting from a favourable pass book balance every treatment is reversed. Deduct the cheques issued but not presented, the interest, the direct deposits and the dividends. Add the cheques deposited but not collected, the bank charges, the payments on standing instruction and the dishonoured cheques. The result is the cash book balance.',
    }),
    sl('concept', 'All four starting points', {
      b: 'Starting from an **overdraft** reverses the treatment again.',
      v: vGrid,
      n: 'This table gives all four starting points. An overdraft reverses the treatment of a favourable balance. If the cash book shows an overdraft, an item that lowers the other book is added and one that raises it is deducted. The same is true of an overdraft in the pass book. Learn the question rather than the table, and the table follows.',
    }),
    sl('example', 'Worked example 1: from the cash book', {
      b: `**Neel Traders**, 31 March 2027: cash book **${rs(W1.cb)}** (favourable). The transactions of the month are listed.`,
      v: vW1tx,
      n: `Neel Traders, an imagined firm, shows ${rupees(W1.cb)} in its cash book on thirty first March. The table lists the transactions of the month and what each book has recorded. Some are in both books. The cheques of the last days of the month are in the cash book only, and the bank items are in the pass book only. We now prepare the statement from the cash book.`,
    }),
    sl('example', 'Worked example 2: the statement', {
      b: `Start with **${rs(W1.cb)}**; add ${rs(total(W1.fromCB.adds))}; deduct ${rs(total(W1.fromCB.lesses))}; reach **${rs(W1.pb)}**, the pass book balance.`,
      v: vW1cb,
      n: `Start with the cash book balance of ${rupees(W1.cb)}. Add the cheques issued, the interest and the dividend, which total ${rupees(total(W1.fromCB.adds))}. Deduct the cheques deposited, the bank charges and the insurance premium, which total ${rupees(total(W1.fromCB.lesses))}. The result is ${rupees(W1.pb)}, which agrees with the pass book. The statement is proved.`,
    }),
    sl('check', 'Quick check: a statement from the cash book', {
      b: 'Find the pass book balance.',
      chk: 'n_brs_cb',
      n: 'Start from the favourable cash book balance. Add the cheques issued but not presented and the interest allowed. Deduct the cheques deposited but not collected and the bank charges. The figure you reach should be the balance shown by the pass book.',
    }),
    sl('example', 'Worked example 3: the same books from the pass book', {
      b: `Start with the pass book balance **${rs(W1.pb)}**; every treatment is reversed; reach the cash book balance **${rs(W1.cb)}**.`,
      v: vW1pb,
      n: `Now start from the pass book balance of ${rupees(W1.pb)}. Every treatment is reversed. Add the cheques deposited, the bank charges and the insurance premium, which total ${rupees(total(W1.fromPB.adds))}. Deduct the cheques issued, the interest and the dividend, which total ${rupees(total(W1.fromPB.lesses))}. The result is ${rupees(W1.cb)}, the cash book balance. Both statements prove the same books.`,
    }),
    sl('concept', 'A pass book overdraft', {
      b: `Neel Traders, June 2027: pass book **overdraft ${rs(-W2.pb)}**; cash book overdraft ${rs(-W2.cb)}.`,
      v: vW2tx,
      n: `In June, Neel Traders opened with an overdraft of ${rupees(12000)}. At the end of the month the pass book shows an overdraft of ${rupees(-W2.pb)}, and the cash book shows one of ${rupees(-W2.cb)}. The table shows what each book has recorded. Starting from an overdraft, an item that makes the other book show a larger overdraft is added, and one that makes it smaller is deducted.`,
    }),
    sl('example', 'Worked example 4: from the overdraft', {
      b: `Start with the overdraft **${rs(-W2.pb)}** as per the pass book; add ${rs(total(W2.fromPB.adds))}; deduct ${rs(total(W2.fromPB.lesses))}; reach the cash book overdraft **${rs(-W2.cb)}**.`,
      v: vW2,
      n: `Start with the pass book overdraft of ${rupees(-W2.pb)}. The cheque issued and the direct deposit make the cash book overdraft larger, so they are added, ${rupees(total(W2.fromPB.adds))} in all. The uncollected cheque, the bank charges and the interest on overdraft make it smaller, so they are deducted, ${rupees(total(W2.fromPB.lesses))} in all. The cash book overdraft is ${rupees(-W2.cb)}.`,
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'The five steps of a statement.',
      chk: 'ord_steps',
      n: 'Arrange the five steps. You begin with the starting balance, find the differences, decide the sign of each item, work out the result and finally check it against the other book. Think about which step cannot happen before another.',
    }),
    sl('diagram', 'The amended cash book', {
      v: vAmendFlow,
      n: 'Sometimes the cash book is brought up to date first. The items that the bank recorded first, such as charges, interest, direct deposits and payments on standing instruction, are entered in the cash book. This gives the amended cash book balance. Only the cheques that were issued or deposited and not yet cleared then remain, and the statement starts from the amended balance.',
    }),
    sl('example', 'Worked example 5: the amended cash book', {
      b: `Neel Traders, 31 March 2027: from **${rs(W1.cb)}** to the amended balance **${rs(W1.am.newBal)}**.`,
      v: vAm,
      n: `For Neel Traders we start with the cash book balance of ${rupees(W1.cb)}. Interest and the dividend go on the debit side. The charges and the insurance premium go on the credit side. The amended balance is ${rupees(W1.am.newBal)}, a debit balance. Only the cheques issued and the cheques deposited are left to be explained in the statement.`,
    }),
    sl('example', 'Worked example 6: the statement after amending', {
      b: `From **${rs(W1.am.newBal)}**: add ${rs(W1.issued)} (cheques issued); deduct ${rs(W1.deposited)} (cheques deposited); reach **${rs(W1.pb)}**.`,
      v: vAfter,
      n: `Start with the amended cash book balance of ${rupees(W1.am.newBal)}. Add the cheques issued but not presented, ${rupees(W1.issued)}. Deduct the cheques deposited but not collected, ${rupees(W1.deposited)}. The result is ${rupees(W1.pb)}, the pass book balance, as before. Amending first leaves a shorter statement, and the cash book is now correct.`,
    }),
    sl('concept', 'Errors in the statement', {
      v: vErrBRS,
      n: 'Errors and differences are corrected in different places. A cash book error is corrected in the cash book, and then it does not appear in the statement. A bank error stays in the statement until the bank corrects it, because the firm cannot change the bank record. A timing difference corrects itself, and a bank item is entered in the amended cash book.',
    }),
    sl('check', 'Quick check: interest allowed', {
      b: 'Interest allowed by the bank.',
      chk: 'ar_interest_allowed',
      n: 'Read the assertion and the reason. Interest allowed by the bank is a receipt for the firm. On which side of the bank column of the cash book is a receipt entered, and does it raise or lower a favourable balance? Decide whether each statement is true and whether the reason explains the assertion.',
    }),
    sl('concept', 'With or without amending', {
      v: vWhich,
      n: 'Both methods give the same proof. Without amending, the statement lists every cause and ends at the balance of the other book. With an amended cash book, the statement lists only the cheque timing differences and any bank error, and it starts from the amended balance. Read the question: if it asks for an amended cash book, prepare it first.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Ask: does the item make the other book higher? Favourable start: add if yes. Overdraft start: reversed.', 'Starting from the other book reverses every treatment.', 'An amended cash book leaves only cheque timing differences.'],
      v: vSum2,
      n: 'To sum up. One question decides whether an item is added or deducted. Starting from the other book reverses every treatment, and an overdraft start reverses it again. A negative result is reported as an overdraft. An amended cash book takes in the items the bank recorded first, so that only cheque timing differences and bank errors remain in the statement.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write the heading with the firm and the date.', 'Name the starting balance and whether it is favourable or an overdraft.', 'Show an overdraft result as an overdraft.'],
      v: vTips2,
      n: 'In the examination, write the heading with the name of the firm and the date. Name the starting balance, and say whether it is favourable or an overdraft. Check the result against the other book. If the result is negative, show it as an overdraft. If you are asked for an amended cash book, show it as a ledger account first.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Bank Reconciliation Statement — Notes',
  sections: [
    {
      h: '1. Two books, one bank account',
      t: 1,
      b: 'A firm that banks with a bank has two records of one account. The **cash book** (bank column) is kept by the firm; the **pass book** (bank statement) is the bank\'s copy of the customer\'s account. Because the firm and the bank are opposite parties, a transaction appears on opposite sides: a **deposit** is a **debit** in the cash book and a **credit** in the pass book; a payment or withdrawal is a credit in the cash book and a debit in the pass book.\n\nA **favourable balance** (money at the bank) is a debit balance in the cash book and a credit balance in the pass book. An **overdraft** is a credit balance in the cash book and a debit balance in the pass book.',
      terms: [
        ['Pass book (bank statement)', 'The bank\'s copy of a customer\'s account, showing deposits, withdrawals and the balance.'],
        ['Favourable balance', 'Money held at the bank: a debit balance in the cash book and a credit balance in the pass book.'],
        ['Overdraft', 'The amount by which the firm has drawn more than it deposited: a credit balance in the cash book and a debit balance in the pass book.'],
      ],
      v: vTwoBooks,
      vs: [vBooks],
    },
    {
      h: '2. Bank reconciliation statement: meaning and need',
      t: 1,
      b: 'A **bank reconciliation statement** is a statement prepared on a given date to reconcile the balance of the cash book with that of the pass book. It is **not an account**: it has no debit and credit sides and nothing is posted from it.\n\nIts **needs** are to find the reasons for the difference, to detect errors and frauds, to show the entries needed to update the cash book, and to check the work of the bank.',
      terms: [
        ['Bank reconciliation statement', 'A statement prepared on a date to explain the difference between the cash book balance and the pass book balance and bring them into agreement.'],
        ['Reconciling items', 'The differences listed in the statement, each of which is added or deducted.'],
      ],
      v: vNotAcc,
      vs: [vNeed],
    },
    {
      h: '3. Causes of difference: timing differences and errors',
      t: 1,
      b: 'A **timing difference** arises when one book records a transaction in one period and the other book in a later one; it corrects itself. Two groups: (a) **recorded by the firm first**: cheques issued but not yet presented for payment; cheques deposited but not yet collected (credited); (b) **recorded by the bank first**: bank charges and interest on overdraft; interest allowed; direct deposits by customers; direct payments by the bank on standing instruction; dividends or interest collected by the bank; cheques deposited and dishonoured. Group (b) needs an entry in the cash book: receipts on the debit side and payments on the credit side of the bank column.\n\n**Errors** are mistakes in the cash book (a wrong amount, a wrong addition, an item left out) or by the bank (a wrong credit or debit). They do not correct themselves.',
      terms: [
        ['Timing difference', 'A difference caused by one book recording a transaction later than the other; it disappears when the other book records it.'],
        ['Cheque issued but not presented', 'A cheque recorded by the firm when issued, but not yet paid by the bank.'],
        ['Cheque deposited but not collected', 'A cheque recorded by the firm when deposited, but not yet credited by the bank.'],
        ['Standing instruction', 'An order to the bank to make a regular payment, such as an insurance premium, from the account.'],
        ['Dishonoured cheque', 'A deposited cheque that the bank returns unpaid; the bank debits the account and the firm credits the bank column and debits the customer.'],
      ],
      v: vCauses,
      vs: [vFirm, vBank],
    },
    {
      h: '4. Preparing the statement: the rule',
      t: 2,
      b: 'Steps: note the starting balance (favourable or overdraft); list every difference; decide to **add or deduct** each; work out the result; check it against the other book.\n\nOne question decides the sign: **does the item make the other book show a higher favourable balance?** From a favourable balance: add if yes, deduct if no. From an overdraft the treatment is reversed. Starting from the pass book reverses every treatment used from the cash book. A negative result is reported as an **overdraft**.',
      terms: [
        ['Add (favourable start)', 'An item that makes the other book higher is added to a favourable starting balance.'],
        ['Overdraft start', 'With an overdraft as the starting balance, an item that makes the other book show a larger overdraft is added and one that makes it smaller is deducted.'],
      ],
      v: vDecision,
      vs: [vRuleCB, vRulePB, vGrid],
    },
    {
      h: '5. Worked statements: from either book, favourable or overdraft',
      t: 2,
      b: `Neel Traders (an imagined firm), 31 March 2027: cash book ${rs(W1.cb)}, pass book ${rs(W1.pb)}. From the cash book: add ${rs(total(W1.fromCB.adds))}, deduct ${rs(total(W1.fromCB.lesses))}, reach ${rs(W1.pb)}. From the pass book: add ${rs(total(W1.fromPB.adds))}, deduct ${rs(total(W1.fromPB.lesses))}, reach ${rs(W1.cb)}.\n\nWith an overdraft (June 2027): pass book overdraft ${rs(-W2.pb)}; add ${rs(total(W2.fromPB.adds))}, deduct ${rs(total(W2.fromPB.lesses))}; cash book overdraft ${rs(-W2.cb)}.`,
      terms: [
        ['Balance as per cash book', 'The favourable balance (or overdraft) shown by the bank column of the cash book on the date.'],
        ['Balance as per pass book', 'The balance shown by the bank statement on the date.'],
      ],
      v: vW1cb,
      vs: [vW1pb, vW2],
    },
    {
      h: '6. Amended cash book and the statement that follows',
      t: 2,
      b: `An **amended (adjusted) cash book** brings the cash book up to date for items the bank has recorded and the firm has not: interest allowed, dividends collected and direct deposits on the debit side; charges, interest on overdraft, payments on standing instruction and dishonoured cheques on the credit side. For Neel Traders: ${rs(W1.cb)} becomes ${rs(W1.am.newBal)}.\n\nThe statement then starts from the amended balance and shows only the **cheque timing differences** (and any bank error): add ${rs(W1.issued)}, deduct ${rs(W1.deposited)}, reach ${rs(W1.pb)}. A cash book error is corrected in the cash book; a bank error stays in the statement until the bank corrects it.`,
      terms: [
        ['Amended cash book', 'The bank column of the cash book after entering the items recorded first by the bank, so that it is up to date.'],
      ],
      v: vAmendFlow,
      vs: [vAm, vAfter, vErrBRS],
    },
  ],
  tips: '- Say which book recorded the item **first**: it decides whether a cash book entry is needed.\n- Keep **timing differences** and **errors** apart.\n- Ask: does the item make the other book **higher**? Favourable start: add if yes; overdraft start: reversed.\n- Starting from the pass book reverses every treatment.\n- Write the heading (firm and date), name the starting balance, and check the result against the other book.\n- A negative result is an **overdraft**. If asked for an amended cash book, show it as a ledger account before the statement.',
});

// ================================================================ flashcards
const F = cards([
  ['**Pass book** (bank statement)', 'The bank\'s copy of a customer\'s account.', 'definition', 1],
  ['**Cash book** (bank column) and the pass book', 'Two records of one account, written from opposite sides.', 'concept', 1],
  ['A deposit in the two books', 'Debit in the cash book; credit in the pass book.', 'fact', 1],
  ['A withdrawal or payment in the two books', 'Credit in the cash book; debit in the pass book.', 'fact', 1],
  ['**Favourable balance**', 'Money at the bank: a debit balance in the cash book, a credit balance in the pass book.', 'definition', 1],
  ['**Overdraft**', 'A credit balance in the cash book and a debit balance in the pass book.', 'definition', 1],
  ['**Bank reconciliation statement**', 'A statement prepared on a date to explain the difference between the cash book balance and the pass book balance.', 'definition', 1],
  ['Is a reconciliation statement an account?', 'No. It is a statement; it has no debit and credit sides and nothing is posted from it.', 'concept', 1],
  ['Needs of a reconciliation statement', 'Find the reasons for the difference; detect errors and frauds; update the cash book; check the bank.', 'fact', 1],
  ['**Timing difference**', 'A difference because one book records a transaction later than the other; it corrects itself.', 'definition', 1],
  ['Two groups of timing differences', 'Recorded by the firm first; recorded by the bank first.', 'concept', 1],
  ['Cheque issued but not yet presented', 'In the cash book only; pass book higher; no cash book entry needed.', 'fact', 1],
  ['Cheque deposited but not yet collected', 'In the cash book only; pass book lower; no cash book entry needed.', 'fact', 1],
  ['Bank charges not in the cash book', 'Pass book lower; credit the bank column.', 'fact', 1],
  ['Interest allowed by the bank, not in the cash book', 'Pass book higher; debit the bank column.', 'fact', 1],
  ['Interest on overdraft debited by the bank', 'Pass book lower; credit the bank column.', 'fact', 1],
  ['Direct deposit by a customer', 'Pass book higher; debit the bank column.', 'fact', 1],
  ['Payment by the bank on **standing instruction**', 'Pass book lower; credit the bank column.', 'fact', 1],
  ['Dividend or interest collected by the bank', 'Pass book higher; debit the bank column.', 'fact', 1],
  ['**Dishonoured cheque**', 'Returned unpaid and debited by the bank; the firm credits the bank column and debits the customer.', 'definition', 1],
  ['Errors that cause a difference', 'Mistakes in the cash book (wrong amount, wrong addition, item left out) or by the bank (wrong credit or debit).', 'concept', 1],
  ['Steps of preparing the statement', 'Note the starting balance; list the differences; decide add or deduct; work out the result; check it.', 'concept', 2],
  ['The question that decides add or deduct', 'Does the item make the other book show a higher favourable balance?', 'exam-tip', 2],
  ['Favourable cash book start: cheques issued not presented', 'Add.', 'fact', 2],
  ['Favourable cash book start: cheques deposited not collected', 'Deduct.', 'fact', 2],
  ['Starting from the pass book instead of the cash book', 'Every treatment is reversed; the result is the cash book balance.', 'concept', 2],
  ['Starting from an overdraft', 'The add or deduct treatment of a favourable balance is reversed.', 'concept', 2],
  ['A negative result in the statement', 'It is an overdraft, not a favourable balance.', 'exam-tip', 2],
  ['**Amended cash book**', 'The cash book brought up to date for items the bank recorded first, so that only cheque timing differences remain.', 'definition', 2],
  ['After amending the cash book, what remains in the statement?', 'Cheques issued but not presented and cheques deposited but not collected, and any bank error.', 'fact', 2],
  ['Where is a bank error corrected?', 'By the bank. Until then it stays in the statement; the firm makes no cash book entry.', 'fact', 2],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Bank Reconciliation Statement',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_brs_def', 'm_deposit_side', 'm_issued_effect', 'ar_not_account'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_need', 's2_issued_why', 's3_classify'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_brs_cb', 'l5_causes'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_may'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Bank Reconciliation Statement',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pb_def', 'm_od_books', 'm_need', 'm_deposited_effect', 'm_dishonour_effect', 'm_standing', 'm_amended', 'm_od_issued', 'ar_timing_noentry', 'ar_bank_first'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_not_account', 's2_od_books', { attempt: 1, keys: ['s2_timing_error', 's2_amend_why'] }, 's3_amend_entries', { attempt: 1, keys: ['s3_errors', 's3_od_small'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_amend', { attempt: 1, keys: ['l5_brs_pbod', 'l5_need'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_aug', 'cb_oct'] },
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
const checksUsed = new Set(['m_dr_cr', 'm_timing_which', 'n_gap', 'mt_terms', 'm_cb_issued', 'n_brs_cb', 'ord_steps', 'ar_interest_allowed']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void same; void sum; void mdTable; void I; void statement; void amended;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-accountancy-ch05 (need for bank reconciliation and causes of difference; preparation of the statement with and without an amended cash book)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed by src/recon.mjs and the shared acc.mjs brs() and ledger() and asserted: each statement reaches the other book balance, the two worked books are built from the same transactions and their balances found independently, the amended cash book is a balanced ledger, add and deduct rules are computed from the cause list; tables in decks and model answers are generated from the computed values',
    facts: 'pass book and cash book as mirror images, favourable balance and overdraft, causes of difference (timing differences and errors), add or deduct rules from either book and either balance type, amended cash book; as in standard school textbooks',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
