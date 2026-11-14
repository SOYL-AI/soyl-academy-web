// Build ISC 11 Accounts ch08 Bank Reconciliation Statement. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { words, rupees } from './acc.mjs';
import { check, same, inr, rs, mdTable, I, L, statement, CAUSES, ruleGrid, ruleTable, rule, TAR, KES, HEM, RAV, GUL, SUN, LOT, MIR, SAF, LOTR, MIRR, SAFR } from './fig.mjs';

setUnit('isc-11-accounts-ch08', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tbl = (st, alt, caption) => table(st.headers, st.rows, alt, caption);

// ================================================================ computed figures (never typed twice)
same(TAR.pb, 56910, 'Vasudha pass book balance');
same(KES.cb, -17950, 'Jasmeet cash book overdraft');
same(HEM.cb, 53230, 'Hemant cash book balance');
same(RAV.pb, -12100, 'Ravine pass book overdraft');
same(GUL.am.newBal, 39035, 'Ketan amended cash book');
same(GUL.pb, 42935, 'Ketan pass book');
same(SUN.am.newBal, -18600, 'Brightline amended cash book overdraft');
same(LOT.cbClose, 26600, 'Lotus cash book');
same(LOT.pbClose, 29030, 'Lotus pass book');
same(MIR.cbClose, -24200, 'Mirage cash book overdraft');
same(MIR.pbClose, -21550, 'Mirage pass book overdraft');
// the opening reconciliation of Lotus Bindery (1 March): the books differ by the two February items
const LOT_OPEN = statement({ from: 'cash book', bal: LOT.cbOpen, items: LOT.openItems, expected: LOT.pbOpen });
same(LOT_OPEN.result, 27500, 'Lotus opening statement');
const cleared = LOT.tx.filter((t) => t.clears !== undefined);
check(cleared.length === 2, 'both February items of Lotus Bindery clear in March');

const gapWord = (k) => (CAUSES[k].where === 'cash book' ? (-CAUSES[k].effect > 0 ? 'higher' : 'lower') : CAUSES[k].effect > 0 ? 'higher' : 'lower');
const sfx = (l) => l.replace(/, not yet in the cash book$/, '').replace(/, debited by the bank$/, '');

// ================================================================ visuals: deck 1
const vRoute1 = flow('LR', ['Cash book (bank column)', 'Compare with the pass book', 'Find every difference', 'Prepare the statement', 'Check it against the other balance'], 'Route map of Part 1: the firm compares its cash book with the pass book, finds every difference, prepares the statement and checks that it reaches the balance of the other book', 'Part 1 at a glance');
const vTwo = table(
  ['Basis', 'Cash book (bank column)', 'Pass book'],
  [
    ['Kept by', 'The firm', 'The bank'],
    ['Shows', 'The firm\'s dealings with the bank, written by the firm', 'The firm\'s account as the bank records it'],
    ['Favourable balance', 'Debit balance', 'Credit balance'],
    ['Overdraft', 'Credit balance', 'Debit balance'],
    ['Entries are made when', 'The firm deposits or issues a cheque', 'The bank credits, pays or acts on its own'],
  ],
  'Table comparing the cash book bank column and the pass book on who keeps each, what each shows, which side is a favourable balance, which side is an overdraft and when entries are made',
  'Two records of one account',
);
const vMirror = table(
  ['Transaction', 'Cash book (firm)', 'Pass book (bank)'],
  [
    ['A cheque is deposited and collected', 'Debit (receipt)', 'Credit'],
    ['A cheque issued by the firm is paid', 'Credit (payment)', 'Debit'],
    ['Bank charges', 'Credit, once the firm writes them', 'Debit'],
    ['Interest credited by the bank', 'Debit, once the firm writes it', 'Credit'],
    ['Favourable balance', 'Debit', 'Credit'],
  ],
  'Table of the mirror image: a receipt is a debit in the cash book and a credit in the pass book, a payment is a credit in the cash book and a debit in the pass book, and a favourable balance is a debit balance in the cash book and a credit balance in the pass book',
  'The pass book is the mirror image of the cash book',
);
const vNeed = table(
  ['Purpose', 'How the statement helps'],
  [
    ['Find errors', 'An entry made twice, left out or on the wrong side shows up as a difference'],
    ['Find unrecorded bank items', 'Charges, interest and direct payments are brought to the firm\'s notice'],
    ['Know the true bank balance', 'The balance the firm can really draw on is made clear'],
    ['Check on delay and fraud', 'A cheque that stays unpresented for long is noticed'],
    ['Support the accounts', 'The auditor and the lender can see that the balances are explained'],
  ],
  'Table of five purposes of a bank reconciliation statement: finding errors, finding unrecorded bank items, knowing the true bank balance, checking on delay and fraud, and supporting the accounts',
);
const vTiming = table(
  ['Timing difference', 'Recorded first in', 'Pass book balance compared with cash book balance'],
  ['issued', 'deposited'].map((k) => [sfx(CAUSES[k].label), CAUSES[k].where, gapWord(k).replace(/^./, (c) => c.toUpperCase())]),
  'Table of the two timing differences: cheques issued but not yet presented, which make the pass book balance higher, and cheques deposited but not yet credited, which make it lower; both are recorded first in the cash book',
  'Timing differences correct themselves',
);
const vBank = table(
  ['Item known first from the pass book', 'Pass book balance compared with cash book balance', 'Entry needed in the cash book'],
  Object.entries(CAUSES).filter(([, c]) => c.where === 'pass book').map(([k, c]) => [sfx(c.label), gapWord(k).replace(/^./, (x) => x.toUpperCase()), c.effect > 0 ? 'Debit (receipt)' : 'Credit (payment)']),
  'Table of items first recorded by the bank: bank charges, interest on overdraft, interest credited, direct deposits, payments on standing instruction, amounts collected and cheques returned unpaid, with the effect on the pass book and the entry the cash book must make',
  'Bank items need an entry in the cash book',
);
const vErrors = table(
  ['Error', 'Which balance is wrong', 'Who corrects it'],
  [
    ['A receipt entered twice in the cash book', 'Cash book too high', 'The firm'],
    ['A payment left out of the cash book', 'Cash book too high', 'The firm'],
    ['A cheque entered on the wrong side of the cash book', 'Cash book out by twice the amount', 'The firm'],
    ['The bank credits another customer\'s deposit to the firm', 'Pass book too high', 'The bank'],
    ['The bank debits a cheque twice', 'Pass book too low', 'The bank'],
  ],
  'Table of five errors: a receipt entered twice, a payment left out and a cheque on the wrong side are errors of the cash book corrected by the firm, while the bank crediting another customer or debiting a cheque twice are errors of the pass book corrected by the bank',
  'Errors can lie in either book',
);
const CLS = [
  ['A cheque deposited on the last day, credited next month', 'Timing difference', 'Cash book', 'No'],
  ['Interest credited by the bank on the last day', 'Bank item', 'Pass book', 'Yes'],
  ['A receipt entered twice in the cash book', 'Error', 'Cash book', 'Yes, to correct it'],
  ['A cheque issued, paid by the bank next month', 'Timing difference', 'Cash book', 'No'],
  ['Bank charges debited on the last day', 'Bank item', 'Pass book', 'Yes'],
  ['A customer\'s cheque returned unpaid', 'Bank item', 'Pass book', 'Yes'],
];
const vClassify = table(['Item found by Meera Spinners, an imagined firm', 'Kind', 'Recorded first in', 'Entry needed in the cash book?'], CLS, 'Table sorting six items found by Meera Spinners into timing differences, bank items and an error, with the book that records each first and whether the cash book needs an entry', 'Sorting the differences');
const vEffect = table(
  ['Cause', 'Pass book balance is'],
  Object.entries(CAUSES).map(([k, c]) => [sfx(c.label), gapWord(k).replace(/^./, (x) => x.toUpperCase()) + ' than the cash book']),
  'Table of the effect of each cause of difference on the pass book balance compared with the cash book balance, generated from the nine causes',
  'Which book is higher because of each cause',
);
const vRuleCB = (() => { const r = ruleTable('cash book'); return table(r.headers, r.rows, 'Table of the nine causes of difference with the book that records each first and whether the item is added or deducted when the statement starts from a favourable cash book balance', 'Starting from the cash book'); })();
const vRulePB = (() => { const r = ruleTable('pass book'); return table(r.headers, r.rows, 'Table of the nine causes of difference with the book that records each first and whether the item is added or deducted when the statement starts from a favourable pass book balance: every treatment is the reverse of the cash book start', 'Starting from the pass book'); })();
const vSteps = flow('LR', ['Write the balance of the book you start from', 'Add the items that raise it', 'Deduct the items that lower it', 'Reach the balance of the other book', 'Check it against that book'], 'Five steps of a reconciliation statement: write the starting balance, add the items that raise it, deduct the items that lower it, reach the other balance and check it against that book', 'Five steps');
const vVAS = tbl(TAR.fromCB, `Bank reconciliation statement of Vasudha Pottery Works, an imagined firm, as on 31 March 2028, starting from the cash book balance of ${words(48600)} rupees with six items and reaching the pass book balance of ${words(TAR.pb)} rupees`, 'Vasudha Pottery Works, 31 March 2028');
const vJAS = tbl(KES.fromPB, `Statement of Jasmeet Dye House, an imagined firm, as on 30 June 2028, starting from an overdraft of ${words(26400)} rupees as per the pass book and reaching an overdraft of ${words(-KES.cb)} rupees as per the cash book`, 'Jasmeet Dye House: from an overdraft as per the pass book');
const vGrid = (() => { const r = ruleGrid(); return table(r.headers, r.rows, 'Table of the nine causes of difference with Add or Less for each of the four starting points: a favourable or an overdraft balance of the cash book, and a favourable or an overdraft balance of the pass book', 'All four starting points'); })();
const vRAV = tbl(RAV.fromCB, `Statement of Ravine Textiles, an imagined firm, as on 31 October 2027, starting from an overdraft of ${words(12300)} rupees as per the cash book and reaching an overdraft of ${words(-RAV.pb)} rupees as per the pass book`, 'Ravine Textiles: from an overdraft as per the cash book');
const vHEM = table(HEM.twoPB.headers, HEM.twoPB.rows, `Two-column statement of Hemant Sports Goods, an imagined firm, as on 31 January 2028, starting from the pass book balance of ${words(63850)} rupees in the plus column and reaching the cash book balance of ${words(HEM.cb)} rupees`, 'Hemant Sports Goods: plus and minus columns');
const vSlips1 = table(
  ['Slip', 'Why it is wrong', 'Correct practice'],
  [
    ['Adding a cheque deposited but not credited, starting from the cash book', 'It is already in the cash book, so the pass book is lower', 'Deduct it'],
    ['Using the cash book rules when starting from the pass book', 'Starting from the other book reverses every treatment', 'Reverse each item'],
    ['Deducting an item that deepens an overdraft, as in the favourable layout', 'From an overdraft, an item that would lower a favourable balance makes the overdraft larger', 'Add it to the overdraft'],
    ['Leaving out the heading or the date', 'The statement is prepared as on a date', 'Write: Bank reconciliation statement as on the date'],
    ['Stopping without checking', 'The result must equal the other book\'s balance', 'Compare it with the other book'],
  ],
  'Table of five common slips in a reconciliation statement and the correct practice',
);
const vSum1 = table(
  ['Topic', 'Remember'],
  [
    ['Need', 'Two records of one account differ; the statement explains the difference'],
    ['Causes', 'Timing differences, bank items and errors'],
    ['From the cash book', 'Add cheques issued not presented; deduct deposits not credited'],
    ['From the pass book', 'Reverse every treatment'],
    ['Overdraft', 'An item that lowers a favourable balance is added to the overdraft'],
    ['Two-column form', 'Plus raises the balance, minus lowers it; total and subtract'],
  ],
  'Summary table of Part 1: need, causes, starting from the cash book, starting from the pass book, overdraft and the two-column form',
);

// ================================================================ visuals: deck 2
const vRoute2 = flow('LR', ['Read the closing balances', 'Match the entries', 'List the unmatched ones', 'Prepare the statement', 'Check it against the other balance'], 'Route map of Part 2: read the two closing balances, match the entries, list the unmatched ones, prepare the statement and check it, then correct the cash book first when needed', 'Part 2 at a glance');
const vCBx = table(LOTR.cbx.headers, LOTR.cbx.rows, `Cash book bank column of Lotus Bindery, an imagined firm, for March 2028: opening balance of ${words(24800)} rupees, receipts and payments, closing balance of ${words(LOT.cbClose)} rupees carried down`, 'Lotus Bindery: cash book extract, March 2028');
const vPBx = table(LOTR.pbx.headers, LOTR.pbx.rows, `Pass book of Lotus Bindery for March 2028 with withdrawals, deposits and a running credit balance, opening at ${words(27500)} rupees and closing at ${words(LOT.pbClose)} rupees`, 'Lotus Bindery: pass book extract, March 2028');
const vMatch = table(LOTR.match.headers, LOTR.match.rows, 'Table matching every transaction of Lotus Bindery in the two extracts: entries in both books, entries of the previous month now in the pass book, entries in the cash book only and entries in the pass book only', 'Matching the entries');
const vLOT = tbl(LOTR.fromCB, `Statement of Lotus Bindery as on 31 March 2028 from the cash book balance of ${words(LOT.cbClose)} rupees to the pass book balance of ${words(LOT.pbClose)} rupees, with three items added and three deducted`, 'Lotus Bindery: statement as on 31 March 2028');
const vLOTopen = tbl(LOT_OPEN, `Opening statement of Lotus Bindery as on 1 March 2028: cash book balance of ${words(24800)} rupees, one cheque issued in February not yet presented and added, one deposit of February not yet credited and deducted, reaching the pass book balance of ${words(27500)} rupees`, 'The items of the previous month');
const vSAF = tbl(SAFR.fromCB, `Statement of Saffron Linens, an imagined firm, as on 31 July 2028 from the cash book balance of ${words(SAF.cbClose)} rupees to the pass book balance of ${words(SAF.pbClose)} rupees, listing cheque 6120 of June again with the new items`, 'Saffron Linens: a cheque of the earlier month still open');
const vMIRm = table(MIRR.match.headers, MIRR.match.rows, 'Table matching every transaction of Mirage Auto Parts in the two extracts, where both books show overdrafts', 'Mirage Auto Parts: matching');
const vMIR = tbl(MIRR.fromPB, `Statement of Mirage Auto Parts, an imagined firm, as on 30 June 2028, starting from an overdraft of ${words(-MIR.pbClose)} rupees as per the pass book and reaching an overdraft of ${words(-MIR.cbClose)} rupees as per the cash book`, 'Mirage Auto Parts: from an overdraft as per the pass book');
const vAmendWhy = table(
  ['Item', 'Known first from', 'Entry in the cash book first?', 'Still in the statement?'],
  [
    ...Object.values(CAUSES).map((c) => [sfx(c.short), c.where === 'pass book' ? 'Pass book' : 'Cash book', c.where === 'pass book' ? 'Yes' : 'No, already entered', c.where === 'pass book' ? 'No' : 'Yes']),
    ['An error in the cash book', 'Comparison of the two books', 'Yes, corrected', 'No'],
    ['An error made by the bank', 'Comparison of the two books', 'No, the bank corrects it', 'Yes'],
  ],
  'Table showing which items are entered in the amended cash book first and which stay in the statement: bank items and errors of the cash book are entered; cheques issued and deposited stay; an error of the bank stays',
  'What goes where',
);
const vAmendSide = table(
  ['Item entered in the amended cash book', 'Side of the bank column', 'Because'],
  [
    ...Object.values(CAUSES).filter((c) => c.where === 'pass book').map((c) => [sfx(c.label), c.effect > 0 ? 'Debit (To)' : 'Credit (By)', c.effect > 0 ? 'It raises the bank balance' : 'It lowers the bank balance']),
    ['Error: a payment recorded for too little', 'Credit (By)', 'The balance was too high'],
    ['Error: a receipt recorded for too little', 'Debit (To)', 'The balance was too low'],
  ],
  'Table of the side of the bank column on which each item is entered in the amended cash book: items that raise the bank balance on the debit side and items that lower it on the credit side',
);
const vGULam = table(GUL.am.headers, GUL.am.rows, `Amended cash book (bank column) of Ketan Printers, an imagined firm, at 31 December 2027: opening balance of ${words(37200)} rupees, two receipts on the debit side, three payments and a correction on the credit side, and a balance carried down of ${words(GUL.am.newBal)} rupees`, 'Ketan Printers: amended cash book');
const vGULst = tbl(GUL.amStmt, `Statement of Ketan Printers from the amended cash book balance of ${words(GUL.am.newBal)} rupees, adding the cheques issued but not presented and deducting the cheques deposited but not credited, reaching the pass book balance of ${words(GUL.pb)} rupees`, 'Ketan Printers: statement after amending the cash book');
const vSUNam = table(SUN.am.headers, SUN.am.rows, `Amended cash book (bank column) of Brightline Hardware, an imagined firm, at 31 May 2028: an opening overdraft of ${words(-SUN.cb)} rupees on the credit side, a dividend collected on the debit side, interest and charges on the debit side to deepen the overdraft, and a closing overdraft of ${words(-SUN.am.newBal)} rupees`, 'Brightline Hardware: amended cash book with an overdraft');
const vSUNst = tbl(SUN.amStmt, `Statement of Brightline Hardware from the amended overdraft of ${words(-SUN.am.newBal)} rupees to the pass book overdraft of ${words(-SUN.pb)} rupees`, 'Brightline Hardware: statement after amending the cash book');
const vSlips2 = table(
  ['Slip', 'Why it is wrong', 'Correct practice'],
  [
    ['Entering a cheque issued but not presented in the amended cash book', 'It is already in the cash book', 'Leave it in the statement'],
    ['Entering interest on the credit side', 'Interest credited is a receipt', 'Debit side of the bank column'],
    ['Forgetting a dishonoured cheque', 'The cash book still shows the receipt', 'Credit the bank column'],
    ['Matching entries by date alone', 'Dates in the two books usually differ', 'Match by amount and nature'],
    ['Listing a cheque of the previous month that has cleared', 'The pass book now agrees', 'Leave it out of the new statement'],
  ],
  'Table of five common slips with extracts and amended cash books and the correct practice',
);
const vSum2 = table(
  ['Topic', 'Remember'],
  [
    ['Extracts', 'Read both closing balances, then match entries by amount and nature'],
    ['Unmatched entries', 'In one book only: these make the statement'],
    ['Previous period', 'An item that clears this month drops out; one still open stays in'],
    ['Amended cash book', 'Enter bank items and errors of the cash book first'],
    ['After amending', 'Only timing differences and bank errors stay in the statement'],
    ['Check', 'The result must equal the other book\'s balance exactly'],
  ],
  'Summary table of Part 2: extracts, unmatched entries, previous period, the amended cash book, what remains in the statement and the final check',
);

// ================================================================ decks
const deck1 = deck({
  part: 1,
  title: 'Bank Reconciliation Statement — Part 1: Causes of Difference and Preparing the Statement',
  goals: [
    'Explain why the cash book and the pass book show different balances, and name the timing differences, bank items and errors',
    'Prepare a reconciliation statement from a favourable balance or an overdraft in either book',
    'Use the plus and minus (two-column) form as an alternative',
  ],
  slides: [
    sl('title', 'The bank reconciliation statement', {
      b: 'Part 1 — **why the two books differ**, the **causes**, and how to **prepare the statement** from a favourable balance or an overdraft.',
      v: vRoute1,
      n: 'Welcome to bank reconciliation. A firm with a bank account keeps a cash book, and the bank sends a pass book. At any date their balances usually differ. In this part we find out why, sort the causes of difference, and prepare the statement that explains it, from either book and for a favourable balance or an overdraft.',
    }),
    sl('concept', 'Two records of one account', {
      b: 'The **cash book** is the firm\'s own record of its bank account; the **pass book** is the bank\'s record of the same account.',
      v: vTwo,
      n: 'The same bank account is written down twice. The firm writes it in the bank column of its cash book. The bank writes it in the pass book, also called the bank statement. A favourable balance is a debit balance in the cash book but a credit balance in the pass book, because the bank looks at the account from its own side.',
    }),
    sl('concept', 'The pass book is the mirror image', {
      b: 'What is a **debit** in the cash book is a **credit** in the pass book, and the other way round.',
      v: vMirror,
      n: 'When the firm deposits a cheque, it debits the bank column. The bank credits the firm. When the firm pays by cheque, it credits the bank column, and the bank debits the firm. Bank charges and interest follow the same mirror pattern. So if every entry were made on the same day in both books, the two balances would always agree.',
    }),
    sl('concept', 'Why prepare the statement', {
      b: 'A **bank reconciliation statement** shows how the balance of the cash book and the balance of the pass book are related on a given date.',
      v: vNeed,
      n: 'The statement has five uses. It finds errors, because an entry made twice or left out shows as a difference. It brings unrecorded bank items to notice. It tells the firm its true bank balance. It shows delays and possible fraud. And it supports the accounts for the auditor and the lender.',
    }),
    sl('check', 'Quick check: the purpose', {
      b: 'Recall what the statement does for the firm.',
      chk: 'm_chk_need',
      n: 'Think about what the statement lists and what it leaves unchanged. Does it alter the books, or does it explain the difference between them?',
    }),
    sl('concept', 'Timing differences', {
      b: 'A **timing difference** arises because both books record the same transaction, but on different dates. It corrects itself, so the cash book needs no entry.',
      v: vTiming,
      n: 'Two timing differences are common. A cheque issued by the firm is entered at once in the cash book, but the bank pays it only when the supplier presents it. And a cheque deposited by the firm is entered at once, but the bank credits it only after collection. At the month end such cheques sit in one book alone.',
    }),
    sl('concept', 'Items known first from the pass book', {
      b: 'The bank also acts **on its own** or on standing instructions. The firm learns of these items only from the pass book, so the cash book **needs an entry** for each.',
      v: vBank,
      n: 'The bank charges for its services, charges interest on an overdraft, credits interest on a balance, collects dividends or rent, pays instalments on standing instruction, receives direct deposits, and returns unpaid cheques. All of these appear first in the pass book. The firm must enter them in its cash book when it learns of them.',
    }),
    sl('concept', 'Errors in either book', {
      b: 'A wrong entry in either book also makes the balances differ. An error stays until it is **corrected**, by the firm if it is in the cash book and by the bank if it is in the pass book.',
      v: vErrors,
      n: 'Errors can lie in either book. The firm may enter a receipt twice, leave out a payment, or write a cheque on the wrong side. A cheque on the wrong side makes the balance wrong by twice the amount. The bank may also make a mistake, and then the bank must correct it. A reconciliation brings such errors to light.',
    }),
    sl('check', 'Quick check: a cheque not yet paid', {
      b: 'Decide which kind of difference this is.',
      chk: 'm_chk_causes',
      n: 'The firm has already recorded the payment. Ask whether the bank has paid it yet, and which of the listed causes fits that situation.',
    }),
    sl('example', 'Worked example 1: sorting the differences', {
      b: '**Meera Spinners**, an imagined firm, lists six differences at the month end. Sort each into a timing difference, a bank item or an error, and say which book records it first.',
      bl: ['Timing differences need no cash book entry.', 'Bank items and errors of the cash book **do** need one.'],
      v: vClassify,
      n: 'Meera Spinners lists six items. A cheque deposited on the last day and credited next month is a timing difference, in the cash book first. Interest credited, bank charges and a cheque returned unpaid are bank items, in the pass book first. A receipt entered twice is an error of the cash book. A cheque issued and paid next month is a timing difference.',
    }),
    sl('concept', 'Effect of each cause on the two balances', {
      b: 'To reconcile, ask of every item: does it make the pass book balance **higher** or **lower** than the cash book balance?',
      v: vEffect,
      n: 'This table gives the effect of each cause on the pass book compared with the cash book. A cheque issued but not presented makes the pass book higher, because the bank has not paid it. A deposit not credited makes the pass book lower. Charges, a payment by the bank and a returned cheque make it lower. Interest, direct deposits and collections make it higher.',
    }),
    sl('concept', 'Starting from the cash book', {
      b: 'To reach the pass book balance, **add** the items that make the pass book higher and **deduct** those that make it lower.',
      v: vRuleCB,
      n: 'When the statement starts from the cash book, each item is applied as it stands. Items that make the pass book higher are added, such as cheques issued but not presented, interest and direct deposits. Items that make it lower are deducted, such as deposits not credited, charges and returned cheques. The result is the pass book balance.',
    }),
    sl('example', 'Worked example 2: from the cash book', {
      b: `**Vasudha Pottery Works**, an imagined firm, has ${rs(48600)} in its cash book on 31 March 2028. Six differences are found. The result is the pass book balance of ${rs(TAR.pb)}.`,
      bl: ['Cheques issued but not presented and the bank\'s credits are **added**.', 'Deposits not credited, charges and the returned cheque are **deducted**.'],
      v: vVAS,
      n: `Vasudha Pottery Works has ${rupees(48600)} in the cash book. Cheques issued, interest and a direct deposit are added. Deposits not credited, bank charges and a cheque returned unpaid are deducted. The statement ends at ${rupees(TAR.pb)}, which agrees with the pass book. Always finish by comparing with the other book.`,
    }),
    sl('concept', 'Starting from the pass book', {
      b: 'Starting from the pass book **reverses every treatment**, because the items now move the balance the other way.',
      v: vRulePB,
      n: 'When the statement starts from the pass book, each treatment is reversed. A cheque issued but not presented is deducted, because the pass book is higher than the cash book by that amount. A deposit not credited is added. Charges and returned cheques are added back, and interest and direct deposits are deducted. The result is the cash book balance.',
    }),
    sl('example', 'Worked example 3: an overdraft as per the pass book', {
      b: `**Jasmeet Dye House**, an imagined firm, has an overdraft of ${rs(26400)} as per its pass book on 30 June 2028. Four items are found. The overdraft as per the cash book is ${rs(-KES.cb)}.`,
      bl: ['Items that **deepen** the overdraft are added.', 'Items that **reduce** it are deducted.'],
      v: vJAS,
      n: `Jasmeet Dye House starts from an overdraft of ${rupees(26400)} in the pass book. Cheques issued but not presented are added, because they make the overdraft in the cash book the deeper one. Deposits not credited, interest on overdraft and the standing instruction payment are deducted. The statement shows an overdraft of ${rupees(-KES.cb)} in the cash book.`,
    }),
    sl('check', 'Quick check: the first step', {
      b: 'Apply the rule for the cash book start.',
      chk: 'm_chk_start',
      n: 'Remember the rule for a statement that starts from the cash book. Ask whether the bank has paid the cheque, and whether the pass book is therefore higher or lower than the cash book.',
    }),
    sl('concept', 'All four starting points', {
      b: 'The firm can start from the **cash book or the pass book**, with a **favourable balance or an overdraft**. The one grid covers all four.',
      v: vGrid,
      n: 'This grid shows the treatment of every cause for all four starting points. When you start from an overdraft, the add and less groups swap, because an item that would lower a favourable balance now deepens the overdraft and is added. You can derive any cell from the cash book rule, so there is no need to memorise the whole grid.',
    }),
    sl('example', 'Worked example 4: an overdraft as per the cash book', {
      b: `**Ravine Textiles**, an imagined firm, has an overdraft of ${rs(12300)} as per its cash book on 31 October 2027. Five items are found. The overdraft as per the pass book is ${rs(-RAV.pb)}.`,
      bl: ['The deposit not credited and the bank\'s debits **deepen** the overdraft: add.', 'Cheques issued but not presented and the direct deposit **reduce** it: deduct.'],
      v: vRAV,
      n: `Ravine Textiles has an overdraft of ${rupees(12300)} in the cash book. A deposit not yet credited, bank charges and interest on overdraft deepen the bank overdraft, so they are added. Cheques issued but not presented and a direct deposit reduce it, so they are deducted. The pass book shows an overdraft of ${rupees(-RAV.pb)}.`,
    }),
    sl('example', 'Worked example 5: the two-column form', {
      b: `The **two-column form** writes each item in a **plus** or a **minus** column. **Hemant Sports Goods**, an imagined firm, starts from its pass book of ${rs(63850)} and reaches the cash book balance of ${rs(HEM.cb)}.`,
      bl: ['Plus: items that raise the balance. Minus: items that lower it.', 'Balance = plus total less minus total.'],
      v: vHEM,
      n: `Hemant Sports Goods starts from ${rupees(63850)} in the pass book. Every item is placed in the plus column if it raises the balance and in the minus column if it lowers it. The two columns are totalled and the minus total is taken from the plus total. The result is ${rupees(HEM.cb)}, the balance in the cash book.`,
    }),
    sl('diagram', 'Slips to avoid', {
      v: vSlips1,
      n: 'Five slips cost marks. Do not add a deposit that is not credited when starting from the cash book. Do not use the cash book rules when starting from the pass book. Do not forget that an item which lowers a favourable balance is added to an overdraft. Write the heading with the date. And always check the final figure against the other book.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Two records of one bank account differ because of timing differences, bank items and errors. Starting from the cash book, add what makes the pass book higher and deduct what makes it lower. Starting from the pass book, reverse everything. From an overdraft, items that deepen it are added. The two column form uses plus and minus columns.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **heading** and the **date**, then the starting balance.',
        'Decide first whether the balance given is **favourable or an overdraft**, and whether it is from the cash book or the pass book.',
        'Group the items into **Add** and **Less** and give a **subtotal** for each.',
        'End with the balance of the **other book** and check it.',
        'GST is not examined: bank items here carry no tax working.',
      ],
      n: 'Examiners give marks for the heading, the starting balance, each group of items with its total, and the final balance. Common slips are applying the wrong rule when the starting book changes, forgetting the overdraft layout, and not checking the result against the other book.',
    }),
  ],
});

const deck2 = deck({
  part: 2,
  title: 'Bank Reconciliation Statement — Part 2: Extracts and the Amended Cash Book',
  goals: [
    'Match the entries of a cash book extract and a pass book extract, and identify the unmatched items, including items of the previous period',
    'Prepare the statement from the extracts, including a case where both books show overdrafts',
    'Prepare an amended cash book for items not yet recorded, and then the statement from its balance',
  ],
  slides: [
    sl('title', 'Extracts and the amended cash book', {
      b: 'Part 2 — **matching two extracts**, items of the **previous period**, and the **amended cash book** followed by the statement.',
      v: vRoute2,
      n: 'In an examination the two books often come as extracts, and the balances must be found and matched before the statement can be written. In this part we match two extracts, deal with cheques left over from the previous month, handle overdrafts, and then amend the cash book first and reconcile its corrected balance.',
    }),
    sl('concept', 'The cash book extract', {
      b: 'The firm\'s own record. Read the **closing balance** from it. Lotus Bindery, an imagined firm, is used throughout this part.',
      v: vCBx,
      n: `This is the bank column of the cash book of Lotus Bindery for March. It opens at ${rupees(24800)} and closes at ${rupees(LOT.cbClose)}. Receipts are on the debit side and payments on the credit side. Notice the dates, because the same transaction may have a different date in the pass book.`,
    }),
    sl('concept', 'The pass book extract', {
      b: 'The bank\'s record. It opens at the balance of the previous month and shows a **running balance**. A credit balance is a favourable one.',
      v: vPBx,
      n: `This is the pass book of Lotus Bindery for March. It opens at ${rupees(27500)}, which is different from the cash book opening because of items of February. It closes at ${rupees(LOT.pbClose)}. Withdrawals reduce the credit balance and deposits increase it.`,
    }),
    sl('concept', 'Matching the entries', {
      b: 'Tick each cash book entry against the pass book by **amount and nature**, not by date. Whatever is **left unticked** is a reconciling item.',
      v: vMatch,
      n: 'Match entry with entry by amount and nature. A cheque received on the second of the month and credited on the third is matched, although the dates differ. Two cheques of the previous month appear in the pass book only, because the firm entered them last month. The unticked entries are the items of the statement.',
    }),
    sl('check', 'Quick check: an entry on one side only', {
      b: 'Decide what an unmatched payment in the cash book means.',
      chk: 'm_chk_match',
      n: 'A payment is on the credit side of the cash book. If the pass book shows no matching withdrawal, ask whether the bank has paid it yet.',
    }),
    sl('example', 'Worked example 1: the statement from the extracts', {
      b: `The statement of **Lotus Bindery** as on 31 March 2028 starts from the cash book balance of ${rs(LOT.cbClose)} and reaches the pass book balance of ${rs(LOT.pbClose)}.`,
      bl: ['Three unmatched items raise the balance and three lower it.', 'The result agrees with the closing balance of the pass book extract.'],
      v: vLOT,
      n: `Lotus Bindery starts from ${rupees(LOT.cbClose)} in the cash book. A cheque issued and not presented, a direct deposit and interest are added. A cheque deposited and not credited, an insurance premium paid by the bank and bank charges are deducted. The balance is ${rupees(LOT.pbClose)}, which agrees with the pass book extract.`,
    }),
    sl('concept', 'Items of the previous period', {
      b: 'At the start of the month the books differed by the **items of the earlier statement**. Those that clear during the month drop out; those still open stay in.',
      v: vLOTopen,
      n: `On the first of March the cash book showed ${rupees(24800)} and the pass book ${rupees(27500)}. The difference was a cheque issued in February and not yet presented, less a cheque deposited in February and not yet credited. Both were cleared in March, as the matching table showed, so neither is in the March statement.`,
    }),
    sl('example', 'Worked example 2: a cheque of the earlier month still open', {
      b: `**Saffron Linens**, an imagined firm, had cheque 6120 for ${rs(2300)} issued in June and not presented. It has still not been presented on 31 July 2028, so it is **listed again** with the new items. The cash book shows ${rs(SAF.cbClose)}; the pass book shows ${rs(SAF.pbClose)}.`,
      bl: ['The cheque of the earlier month is still a reconciling item.', 'A new cheque and the bank charges complete the list.'],
      v: vSAF,
      n: `Saffron Linens has ${rupees(SAF.cbClose)} in the cash book. A cheque issued in June has still not been presented, so it stays in the statement. A new cheque issued in July is also added, and bank charges are deducted. The statement ends at ${rupees(SAF.pbClose)}, the pass book balance. A cheque that has not cleared is never dropped.`,
    }),
    sl('concept', 'Both books overdrawn', {
      b: 'Mirage Auto Parts, an imagined firm, has overdrafts in **both** books. Match as before.',
      v: vMIRm,
      n: 'Mirage Auto Parts shows an overdraft in both books. The matching is done in the same way. One cheque of the previous month cleared in June. Two items are in the cash book only, and three are in the pass book only. Because both balances are overdrafts, take care with the layout when you write the statement.',
    }),
    sl('example', 'Worked example 3: starting from the pass book overdraft', {
      b: `The statement of **Mirage Auto Parts** as on 30 June 2028 starts from the pass book overdraft of ${rs(-MIR.pbClose)} and reaches the cash book overdraft of ${rs(-MIR.cbClose)}.`,
      bl: ['The direct deposit and the cheque issued but not presented make the cash book overdraft the deeper one: they are **added**.', 'The deposit not credited, the interest and the charges are **deducted**.'],
      v: vMIR,
      n: `Mirage Auto Parts starts from an overdraft of ${rupees(-MIR.pbClose)} in the pass book. The direct deposit and the cheque issued and not presented are added, because they make the overdraft in the cash book deeper. The deposit not credited, the interest and the bank charges are deducted. The result is an overdraft of ${rupees(-MIR.cbClose)} in the cash book.`,
    }),
    sl('concept', 'Why amend the cash book first', {
      b: 'Items the **bank has already acted on** and the firm has not yet written must be **entered in the cash book**. Then only the true timing differences remain.',
      v: vAmendWhy,
      n: 'Some questions ask first for an amended cash book. The firm enters the items that it did not know of, which are the bank items and its own errors. Cheques issued and cheques deposited are already in the cash book, so they stay in the statement. An error made by the bank is not entered by the firm.',
    }),
    sl('concept', 'Which side of the cash book', {
      b: 'An item that **raises** the bank balance is a **debit**; one that **lowers** it is a **credit**.',
      v: vAmendSide,
      n: 'In the amended cash book, interest credited, a direct deposit and an amount collected by the bank are receipts, so they go on the debit side. Bank charges, interest on overdraft, a standing instruction payment and a cheque returned unpaid are payments, so they go on the credit side. A correction goes on whichever side restores the balance.',
    }),
    sl('check', 'Quick check: what is entered', {
      b: 'Choose the pair that needs an entry in the cash book.',
      chk: 'm_chk_amended',
      n: 'Ask of each item whether the firm already knows of it. The items the firm already wrote in the cash book are not entered again.',
    }),
    sl('example', 'Worked example 4: the amended cash book', {
      b: `**Ketan Printers**, an imagined firm, has ${rs(37200)} in its cash book on 31 December 2027. The pass book shows interest, charges, a direct deposit, a returned cheque and a standing instruction, and one error of the cash book. The amended balance is ${rs(GUL.am.newBal)}.`,
      bl: ['Receipts on the debit side; payments and the correction on the credit side.', 'Cheques issued and deposited **stay out** of the amended cash book.'],
      v: vGULam,
      n: `Ketan Printers starts from ${rupees(37200)}. Interest credited and a direct deposit are debited. Bank charges, a cheque returned unpaid, a standing instruction payment and the correction of an understated payment are credited. The amended cash book balance is ${rupees(GUL.am.newBal)}. The cheques issued and deposited are left out.`,
    }),
    sl('concept', 'The statement after amending', {
      b: `From the amended balance of ${rs(GUL.am.newBal)}, only the **timing differences** remain: cheques issued but not presented are added and cheques deposited but not credited are deducted.`,
      v: vGULst,
      n: `Ketan Printers now reconciles the amended balance of ${rupees(GUL.am.newBal)}. Cheques issued and not presented are added. Cheques deposited and not credited are deducted. The statement ends at ${rupees(GUL.pb)}, the pass book balance. The earlier items are not repeated, because they have been entered in the amended cash book.`,
    }),
    sl('example', 'Worked example 5: an amended cash book with an overdraft', {
      b: `**Brightline Hardware**, an imagined firm, has an overdraft of ${rs(-SUN.cb)} in its cash book on 31 May 2028. The pass book shows interest on overdraft, charges and a dividend collected, none yet entered. The amended overdraft is ${rs(-SUN.am.newBal)}.`,
      bl: ['The opening overdraft is on the **credit** side.', 'The dividend is a debit; interest and charges are credits that deepen the overdraft.'],
      v: vSUNam,
      n: `Brightline Hardware starts with an overdraft of ${rupees(-SUN.cb)}, which is a credit balance. The dividend collected is a debit and lessens it. Interest on overdraft and bank charges are credits and deepen it. After these entries the overdraft is ${rupees(-SUN.am.newBal)}, carried down on the debit side, since the account has a credit balance.`,
    }),
    sl('concept', 'The statement after amending: an overdraft', {
      b: `From the amended overdraft of ${rs(-SUN.am.newBal)}, the cheque issued but not presented **reduces** the bank's overdraft, so it is deducted; the deposit not credited **deepens** it, so it is added.`,
      v: vSUNst,
      n: `Brightline Hardware now starts from an amended overdraft of ${rupees(-SUN.am.newBal)}. The cheque issued and not presented is deducted from it, and the cheque deposited and not credited is added. The statement ends at an overdraft of ${rupees(-SUN.pb)}, which is the pass book overdraft.`,
    }),
    sl('check', 'Quick check: a cheque issued', {
      b: 'Is a cheque issued but not presented entered in the amended cash book?',
      chk: 'tf_chk_amend',
      n: 'Ask whether the firm already recorded the cheque when it issued it, and where such an item appears after the cash book has been amended.',
    }),
    sl('diagram', 'Slips to avoid', {
      v: vSlips2,
      n: 'Five slips cost marks. Do not enter a cheque issued but not presented in the amended cash book. Do not put interest on the wrong side. Do not forget a returned cheque. Do not match entries by date alone. And do not list a cheque of the previous month that has already cleared.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. With extracts, read both balances and match by amount and nature. Unmatched entries make the statement, together with earlier items that are still open. When the question asks for an amended cash book, enter the bank items and errors first. Then only timing differences and bank errors are left in the statement.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'With extracts, **tick the matched pairs** first and list what is left.',
        'Check each **item of the previous period** against the pass book.',
        'In an amended cash book, **bank items and errors** go in; cheques issued and deposited do not.',
        'After amending, start from the **amended balance**.',
        'Finish by agreeing with the **other book\'s** balance.',
      ],
      n: 'Marks go for matching, the opening balance, the amended entries on the correct sides, the amended balance, the items of the statement and the final figure. Common slips are matching by date, repeating an item already entered, and putting a bank item on the wrong side of the cash book.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Bank Reconciliation Statement — Notes',
  sections: [
    {
      h: '1. Need for a reconciliation statement',
      t: 1,
      b: 'A firm with a current account keeps a **cash book** with a bank column; the bank sends a **pass book** (bank statement), its own record of the firm\'s account. On any date the two balances usually differ. A **bank reconciliation statement** is prepared as on a date to show how the two balances are related.\n\nA favourable balance is a **debit** balance in the cash book and a **credit** balance in the pass book; an **overdraft** is the reverse. The pass book is the mirror image of the cash book.\n\n**Uses:** it finds errors, shows unrecorded bank items, gives the true bank balance, exposes delay and fraud, and supports the accounts. It does not change either book.',
      terms: [
        ['Pass book', 'The bank\'s record of the firm\'s account; a credit balance means the bank owes the firm.'],
        ['Bank reconciliation statement', 'A statement prepared as on a date to explain the difference between the cash book balance and the pass book balance.'],
        ['Overdraft', 'A debit balance in the pass book and a credit balance in the cash book: the firm has drawn more than it deposited.'],
      ],
      v: vTwo,
      vs: [vMirror, vNeed],
    },
    {
      h: '2. Causes of difference: timing differences',
      t: 1,
      b: 'A **timing difference** arises when both books record the same transaction on different dates. It corrects itself, so **no cash book entry** is needed; the item is only listed in the statement.\n- **Cheques issued but not yet presented for payment:** the cash book has lowered its balance; the bank has not. Pass book is **higher**.\n- **Cheques deposited but not yet credited:** the cash book has raised its balance; the bank has not. Pass book is **lower**.',
      terms: [
        ['Timing difference', 'A transaction recorded by both books on different dates; it clears by itself.'],
        ['Cheque issued but not presented', 'A cheque the firm has credited in its cash book that the payee has not yet banked or the bank has not yet paid.'],
      ],
      v: vTiming,
      vs: [vEffect],
    },
    {
      h: '3. Causes of difference: bank items and errors',
      t: 1,
      b: 'The bank acts on its own or on instruction, and the firm learns of it only from the pass book: **bank charges**, **interest on overdraft**, **interest credited**, **direct deposits** by customers, **payments on standing instruction**, **dividend or rent collected** and **cheques returned unpaid** (dishonoured). The cash book needs an entry for each.\n\n**Errors** in either book also cause a difference: in the cash book (an entry made twice, left out, on the wrong side or in a wrong amount), corrected by the firm; in the pass book, corrected by the bank. An error on the wrong side makes the balance out by **twice** the amount.',
      terms: [
        ['Dishonoured cheque', 'A deposited cheque returned unpaid; the bank debits the firm, and the cash book must credit the bank column.'],
        ['Standing instruction', 'A fixed order to the bank to pay a regular amount, such as an instalment or a premium.'],
      ],
      v: vBank,
      vs: [vErrors, vClassify],
    },
    {
      h: '4. Preparing the statement from either book',
      t: 2,
      b: 'Write the heading **Bank reconciliation statement as on (date)** and start from one book.\n- **From the cash book:** each item is applied by its effect on the pass book: **add** the items that make the pass book higher (cheques issued but not presented, interest, direct deposits, collections) and **deduct** those that make it lower (deposits not credited, charges, payments by the bank, dishonoured cheques). The result is the pass book balance.\n- **From the pass book:** every treatment is **reversed**. The result is the cash book balance.\n\nAlways check the result against the balance of the other book.',
      terms: [
        ['Add', 'An item that must be added to the balance of the book you start from to reach the other balance.'],
        ['Less', 'An item that must be deducted from the balance of the book you start from.'],
      ],
      v: vRuleCB,
      vs: [vRulePB, vSteps, vVAS],
    },
    {
      h: '5. Overdrafts and the two-column form',
      t: 2,
      b: '**Overdraft:** when the starting balance is an overdraft, an item that would lower a favourable balance **deepens** the overdraft and is **added**; an item that would raise a favourable balance **reduces** the overdraft and is **deducted**. The result may again be an overdraft.\n\n**Two-column (plus and minus) form:** write the starting balance (a favourable balance in the plus column, an overdraft in the minus column), then every item in the plus column if it raises the favourable balance and in the minus column if it lowers it; total both columns. The pass book or cash book balance is the **plus total less the minus total**. If the minus total is larger, the balance is an overdraft.',
      terms: [
        ['Two-column form', 'A reconciliation with a plus column and a minus column, giving the other balance as plus total less minus total.'],
      ],
      v: vGrid,
      vs: [vJAS, vRAV, vHEM],
    },
    {
      h: '6. Preparing the statement from extracts',
      t: 3,
      b: 'When the books are given as extracts:\n1. Read the **closing balance** of each book (cash book bank column and pass book).\n2. **Match** entries by amount and nature, not by date; matched pairs need nothing.\n3. List the entries found **in one book only**.\n4. Include any item of the **previous period** that is still open at the month end; an item that cleared this month falls out.\n5. Prepare the statement and check that it reaches the other balance.\n\nAn entry only in the pass book is usually a bank item and needs a cash book entry (unless the bank made an error). An entry only in the cash book is usually a timing difference (unless the firm made an error).',
      terms: [
        ['Matching', 'Pairing entries of the two books by amount and nature to find those that appear in one book only.'],
        ['Items of the previous period', 'Cheques of the earlier statement that clear, or stay open, in the current month.'],
      ],
      v: vCBx,
      vs: [vPBx, vMatch, vLOTopen, vLOT, vMIR],
    },
    {
      h: '7. Amended cash book and the statement',
      t: 4,
      b: 'An **amended (adjusted) cash book** brings the bank column up to date with the items the firm has not yet entered: bank charges, interest, direct deposits and payments, collections, dishonoured cheques and **corrections** of its own errors. A receipt or an item that raises the balance is a **debit**; a payment or an item that lowers it is a **credit**. An overdraft opens on the credit side.\n\nCheques issued but not presented and cheques deposited but not credited are **already** in the cash book and are **not** entered again. The statement then starts from the **amended balance** and contains only these timing differences (and any bank error).',
      terms: [
        ['Amended cash book', 'The bank column of the cash book brought up to date for bank items and errors before the statement is prepared.'],
      ],
      v: vAmendWhy,
      vs: [vAmendSide, vGULam, vGULst, vSUNam, vSUNst],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts)**\n- 1 mark: one correct option, or the add or deduct treatment of a single item.\n- 2 marks: causes of difference with reasons, or a short statement with two or three items, or a simple amended cash book of two entries.\n- 3 marks: a statement of four to six items from a given balance, or a short amended cash book with the statement.\n- 5 marks: a full statement from a cash book or pass book balance with six or seven items, a statement from extracts with items of the previous period, or an amended cash book followed by the statement. Marks go for the heading and date, the starting balance, each group with its subtotal, the amended cash book entries and balance, and the final balance.\n\n**Common mistakes:** adding a deposit not credited when starting from the cash book; using the wrong rule after changing the starting book; forgetting the overdraft layout; entering cheques issued but not presented in the amended cash book; matching entries by date; listing an item of the previous period that has already cleared; not checking the result against the other book.\n\nGST transactions are not examined.',
});

// ================================================================ flashcards
const F = cards([
  ['**Pass book**', 'The bank\'s record of the firm\'s account; a credit balance means the bank owes the firm.', 'definition', 1],
  ['**Bank reconciliation statement**', 'A statement prepared as on a date that explains the difference between the cash book balance and the pass book balance.', 'definition', 1],
  ['Why do the cash book and the pass book differ?', 'Timing differences, items the bank records first, and errors in either book.', 'concept', 1],
  ['A favourable balance: cash book and pass book', 'A **debit** balance in the cash book; a **credit** balance in the pass book.', 'fact', 1],
  ['An overdraft: cash book and pass book', 'A **credit** balance in the cash book; a **debit** balance in the pass book.', 'fact', 1],
  ['Does the statement change the books?', '**No.** It only explains the difference; the cash book is amended separately.', 'concept', 1],
  ['**Timing difference**', 'A transaction recorded by both books on different dates; it clears by itself.', 'definition', 1],
  ['Cheque issued but not yet presented', 'Cash book already lowered; the pass book is **higher** until the bank pays it.', 'concept', 1],
  ['Cheque deposited but not yet credited', 'Cash book already raised; the pass book is **lower** until the bank credits it.', 'concept', 1],
  ['Name four items first recorded by the bank', 'Bank charges, interest, direct deposits, payments on standing instruction (also collections and returned cheques).', 'fact', 1],
  ['**Dishonoured cheque**', 'A deposited cheque returned unpaid; the bank debits the firm and the cash book credits the bank column.', 'definition', 1],
  ['An entry on the wrong side of the cash book', 'The balance is wrong by **twice** the amount.', 'exam-tip', 1],
  ['Starting from the cash book: cheques issued but not presented', '**Add**, because the pass book is higher.', 'exam-tip', 2],
  ['Starting from the cash book: cheques deposited but not credited', '**Deduct**, because the pass book is lower.', 'exam-tip', 2],
  ['Starting from the cash book: charges, payment by the bank, dishonour', '**Deduct** each (the bank has taken the money).', 'exam-tip', 2],
  ['Starting from the cash book: interest, direct deposit, collection', '**Add** each (the bank has credited the firm).', 'exam-tip', 2],
  ['Starting from the pass book', '**Reverse** every treatment.', 'exam-tip', 2],
  ['Starting from an overdraft: which items are added?', 'Items that **deepen** the overdraft: those that would lower a favourable balance.', 'exam-tip', 2],
  ['Starting from an overdraft: which items are deducted?', 'Items that **reduce** the overdraft: those that would raise a favourable balance.', 'exam-tip', 2],
  ['**Two-column form**', 'A statement with plus and minus columns; the other balance is plus total less minus total.', 'definition', 2],
  ['Two-column form: where does an overdraft start go?', 'In the **minus** column; a larger minus total gives an overdraft.', 'exam-tip', 2],
  ['What must you do at the end of the statement?', 'Compare the result with the **other book\'s balance**.', 'exam-tip', 2],
  ['Matching extracts: what is the basis?', '**Amount and nature**, not date.', 'exam-tip', 3],
  ['An entry in the pass book only', 'Usually a bank item: the cash book needs an entry (unless it is an error by the bank).', 'concept', 3],
  ['An entry in the cash book only', 'A timing difference: no cash book entry; it is listed in the statement.', 'concept', 3],
  ['A cheque of the previous period clears this month', '**Drops out** of the new statement.', 'exam-tip', 3],
  ['A cheque of the previous period is still unpresented', 'Still **listed** with the new items.', 'exam-tip', 3],
  ['**Amended cash book**', 'The bank column brought up to date for bank items and errors before the statement.', 'definition', 4],
  ['Items entered in the amended cash book', 'Bank charges, interest, direct deposits and payments, collections, dishonoured cheques and errors of the cash book.', 'fact', 4],
  ['Items not entered in the amended cash book', 'Cheques issued but not presented and cheques deposited but not credited.', 'exam-tip', 4],
  ['Interest credited by the bank: side in the amended cash book', '**Debit** side of the bank column.', 'exam-tip', 4],
  ['Dishonoured cheque: side in the amended cash book', '**Credit** side of the bank column.', 'exam-tip', 4],
  ['Where does the statement start after amending?', 'From the **amended balance**; only timing differences (and bank errors) remain.', 'concept', 4],
]);
check(F.cards.length >= 28 && F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Bank Reconciliation Statement',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_timing_which', 'm_cb_from_pb', 'm_unmatched_pb', 'm_amend_newbal', 'ar_od_layout'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_need', { attempt: 1, keys: ['s2_match_steps', 's2_amend_why'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show the statement in proper form.', items: ['s3_cb_start', { attempt: 1, keys: ['s3_ext_small', 's3_amend_only'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the statement in proper form.', items: ['l5_cb_start'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Bank Reconciliation Statement',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_pass_credit', 'm_first_in_pb', 'm_dishonour_who', 'm_cb_od_deposit', 'm_pb_start_charges', 'm_two_col', 'm_prev_period', 'm_pick_items', 'm_dishonour_side', 'm_remaining', 'ar_bankitem', 'ar_amend'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_timing_error', 's2_rules', { attempt: 1, keys: ['s2_prev_item', 's2_amend_entries'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show the statement in proper form.', items: ['s3_classify', 's3_pb_start', 's3_od_pb', { attempt: 1, keys: ['s3_ext_prev', 's3_amend_error'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare the statement in proper form.', items: ['l5_pb_od', { attempt: 1, keys: ['l5_ext_fav', 'l5_amend_od'] }] },
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
// 4. No more than two consecutive slides without a visual; deck sizes.
for (const d of [deck1, deck2]) {
  let run = 0;
  for (const s of d.slides) {
    run = s.visual ? 0 : run + 1;
    check(run <= 2, `deck ${d.part}: more than two slides in a row without a visual at ${s.id}`);
  }
  check(d.slides.length >= 18 && d.slides.length <= 22, `deck ${d.part} has ${d.slides.length} slides`);
}

build({
  dir: DIR,
  decks: [deck1, deck2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 of isc-11-accounts-ch08 (need for reconciliation and causes of difference: timing differences, bank items and errors; a statement from a favourable balance or an overdraft of either book, by the add and less method and the two-column form; a statement from extracts of both books with matching and items of the previous period; an amended cash book followed by a statement); no GST transactions; no removed topics',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms, figures and dates differ from the CBSE 11 Accountancy bank reconciliation chapter and from the ISC 12 chapters',
    data: 'every statement generated by recon.mjs: starting from one book and applying the items reaches the other book balance exactly in both directions, overdraft starts use the reversed layout, the two-column form reaches the same figure, extracts are built from transactions with both closing balances found independently and the items of the previous period cleared or kept open, amended cash books are posted with a ledger and the statement from the amended balance reaches the pass book balance',
    facts: 'ISC Accountancy (858) Class XI Unit 4: Bank Reconciliation Statement; GST transactions are not examined',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
