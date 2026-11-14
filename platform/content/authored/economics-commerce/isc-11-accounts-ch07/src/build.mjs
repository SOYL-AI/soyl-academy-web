// Build ISC 11 Accounts ch07 Trial Balance. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import {
  same, check, inr, rs, words, rupees, ledger, journal, balanceTable, bal, diffRows,
  KS, PD_TB, PD_OMIT, PD_PRINC, PD_COMM, PD_COMP, PD_ONE, PD_AMT, PD_TWICE, PD_CR2, WH, RK, PW, PW_L, PW_TB,
} from './fig.mjs';

setUnit('isc-11-accounts-ch07', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tb = (t, alt, caption) => table(t.headers, t.rows, alt, caption);

// ================================================================ visuals: deck 1
const vFlow1 = flow('LR', ['Transactions in the books of original entry', 'Posting to the ledger', 'Balancing each account', 'Trial balance', 'Final accounts'], 'Route map of Part 1: transactions are recorded, posted to the ledger and balanced, the balances are listed in the trial balance, and the trial balance leads to the final accounts', 'Where the trial balance stands');
const vMeaning = table(['Feature', 'What it means'], [
  ['A statement, not an account', 'It has no folio and is not a part of the double entry'],
  ['Made on a date', 'Usually the last day of the year; some firms prepare it every month'],
  ['Lists balances', 'Closing balances of all ledger accounts, with debit balances in one column and credit balances in the other'],
  ['Totals', 'The two columns are added, and they should come to the same figure'],
], 'Table of four features of a trial balance: it is a statement and not an account, it is made on a date, it lists ledger balances in a debit and a credit column, and its two totals should agree');
const vObj = table(['Objective', 'How the trial balance serves it'], [
  ['Test arithmetical accuracy', 'If every transaction has equal debit and credit, the two columns agree'],
  ['One summary of the ledger', 'All the balances are seen together on a single page'],
  ['Base of the final accounts', 'The trading and profit and loss accounts and the balance sheet are drawn from it'],
  ['Help in locating mistakes', 'A difference in the totals warns that something is wrong before the final accounts are made'],
], 'Table of four objectives of a trial balance: checking arithmetical accuracy, giving one summary of the ledger, providing the base for the final accounts and helping to locate mistakes');
const vSides = table(['Balances on the debit side', 'Balances on the credit side'], [
  ['Assets: cash, bank, debtors, furniture, machinery', 'Capital'],
  ['Expenses and losses', 'Liabilities: creditors, loans, bank overdraft'],
  ['Purchases', 'Incomes and gains'],
  ['Sales return (returns inward)', 'Sales'],
  ['Opening stock', 'Purchases return (returns outward)'],
  ['Drawings', 'Provisions'],
], 'Table of the kinds of balance that stand on the debit side of a trial balance and on the credit side: assets, expenses, purchases, sales return, opening stock and drawings on the debit side; capital, liabilities, incomes, sales, purchases return and provisions on the credit side', 'Which side does each balance take');
const vKs = tb(KS.tb, `Trial balance of Kasaragod Spice Traders, an imagined firm, on 31 March 2028: thirteen balances, with each of the two columns totalling ${words(KS.dr)} rupees`, 'Trial balance of Kasaragod Spice Traders on 31 March 2028');
const vAdv = table(['Advantage', 'Why it helps'], [
  ['Quick check on posting', 'Equal totals show that debits and credits have been matched'],
  ['Single summary', 'Every ledger balance can be read from one statement'],
  ['Final accounts are easier', 'The figures are picked from one list, in a ready order'],
  ['Saves time in finding mistakes', 'A difference tells the accountant to search before going further'],
], 'Table of four advantages of a trial balance: a quick check on posting, a single summary, easier final accounts and saving time in finding mistakes');
const vProve = table(['Agreement of the totals shows', 'It does not show'], [
  ['Debits and credits in the ledger are equal in total', 'That every transaction has been recorded'],
  ['The arithmetic of the posting and balancing is probably right', 'That every entry is in the right account'],
  ['The books are ready for the final accounts', 'That the accounting principles have been followed'],
  ['', 'That errors on the two sides have not cancelled'],
], 'Table of what agreement of the trial balance shows (equal debits and credits and arithmetical accuracy) and what it does not show (completeness, correct accounts, correct principles and the absence of cancelling errors)');
const vErrTypes = table(['Error', 'What happens', 'Example'], [
  ['Error of omission', 'A transaction is left out of the books altogether, so both its debit and credit are missing', `Credit sale of ${rs(22000)} to Tamil Stores is never entered`],
  ['Error of principle', 'An entry is made in the wrong class of account, against an accounting principle', `Computer bought for ${rs(36000)} is debited to Purchases A/c`],
  ['Error of commission', 'The right principle is followed but the wrong account is used, or the amount is wrong on both sides', `Payment of ${rs(15000)} to Ellora Foods is debited to Sundar Nuts Co.`],
  ['Compensating errors', 'Two or more mistakes whose effects on the totals cancel each other', `Rent debited ${rs(9000)} too much and commission credited ${rs(9000)} too much`],
], 'Table of four errors that do not disturb the trial balance: omission, principle, commission and compensating errors, each with its meaning and an example from Padmini Dry Fruits, an imagined firm');
const vFour = table(['Error in the books', 'Debit total (₹)', 'Credit total (₹)', 'Trial balance'], [
  ['No error', inr(PD_TB.dr), inr(PD_TB.cr), 'Agrees'],
  ['Omission of a credit sale', inr(PD_OMIT.bad.dr), inr(PD_OMIT.bad.cr), 'Agrees'],
  ['Computer debited to Purchases', inr(PD_PRINC.bad.dr), inr(PD_PRINC.bad.cr), 'Agrees'],
  ['Payment debited to the wrong creditor', inr(PD_COMM.bad.dr), inr(PD_COMM.bad.cr), 'Agrees'],
  ['Rent and commission wrong by equal amounts', inr(PD_COMP.bad.dr), inr(PD_COMP.bad.cr), 'Agrees'],
], 'Table for Padmini Dry Fruits: the correct trial balance totals five lakh fifty thousand rupees and four kinds of error leave the two totals equal, although several account balances are wrong', 'Four errors, and the totals still agree');
const vPrincDiff = table(['Account', 'Correct balance', 'Balance in the books'], diffRows(PD_PRINC), 'Table of the two accounts affected by the computer wrongly debited to Purchases: Computer shows nothing instead of thirty-six thousand rupees, and Purchases is thirty-six thousand rupees too high');
const vCompDiff = table(['Account', 'Correct balance', 'Balance in the books'], diffRows(PD_COMP), 'Table of the two accounts affected by the compensating errors: Rent is nine thousand rupees too high on the debit side and Commission received is nine thousand rupees too high on the credit side');
const vDisturb = table(['Error', 'Debit total (₹)', 'Credit total (₹)', 'Higher side', 'Difference (₹)'], [
  ['Credit to a customer left out', PD_ONE],
  ['Debit and credit amounts unequal', PD_AMT],
  ['Payment debited to two accounts', PD_TWICE],
  ['Credit posted twice', PD_CR2],
].map(([t, c]) => [t, inr(c.bad.dr), inr(c.bad.cr), c.gap > 0 ? 'Debit' : 'Credit', inr(Math.abs(c.gap))]), 'Table of four posting errors of Padmini Dry Fruits that make the trial balance disagree, with the debit total, credit total, the side that is higher and the difference', 'Errors that make the totals differ');
const vOneSided = table(['Account', 'Correct balance', 'Balance in the books'], diffRows(PD_ONE), 'Table of the account affected when the receipt of sixty thousand rupees is debited to Cash but not credited to Tamil Stores: Tamil Stores shows a debit balance sixty thousand rupees too high');
const vLimits = table(['Limitation', 'Why it matters'], [
  ['Equal totals are not proof', 'Errors that do not disturb the totals stay hidden'],
  ['Some errors are never shown', 'Omission, principle, commission and compensating errors pass through'],
  ['Wrong accounts, right totals', 'A balance may sit in the wrong account without any difference'],
  ['Depends on correct posting and balancing', 'It checks the ledger, not the quality of the original records'],
], 'Table of four limitations of a trial balance: equal totals are not proof of accuracy, some errors are never shown, wrong accounts can carry right totals, and it checks only the ledger');
const vSummary1 = table(['Topic', 'Remember'], [
  ['Meaning', 'A statement of ledger balances on a date, debit column and credit column'],
  ['Objectives', 'Arithmetical accuracy, a summary of the ledger, the base for final accounts'],
  ['Advantages', 'Quick check, single summary, easier final accounts'],
  ['Errors not shown', 'Omission, principle, commission, compensating'],
  ['Errors shown', 'One-sided posting, unequal amounts, wrong side, wrong totals'],
  ['Limitation', 'Agreement is not proof that the books are free from errors'],
], 'Summary table of Part 1: meaning, objectives, advantages, the errors a trial balance does not show, the errors it shows and its main limitation');

// ================================================================ visuals: deck 2
const vSteps = flow('LR', ['List every ledger account', 'Read the balance carried down', 'Decide the side from the nature of the account', 'Write it in the debit or credit column', 'Total both columns and compare'], 'Route map of Part 2: list the ledger accounts, read each balance carried down, decide its side from its nature, write it in the debit or credit column, and total and compare the two columns', 'The balance method in five steps');
const vRoute2 = flow('LR', ['Ledger balances', 'Decide the sides', 'Find a missing capital', 'Build from transactions'], 'Route map of Part 2: start from ledger balances, decide the side of each, find a missing capital and build a trial balance from transactions', 'Part 2 at a glance');
const vKinds = table(['Kind of account', 'Side', 'Examples'], [
  ['Assets', 'Debit', 'Cash, bank, debtors, furniture, land, bills receivable'],
  ['Expenses and losses', 'Debit', 'Wages, rent, salaries, discount allowed, bad debts'],
  ['Trading items on the debit side', 'Debit', 'Purchases, sales return, carriage inwards, opening stock'],
  ['Drawings', 'Debit', 'Cash or goods taken by the owner'],
  ['Capital and liabilities', 'Credit', 'Capital, creditors, bills payable, loans, bank overdraft'],
  ['Incomes and gains', 'Credit', 'Commission received, discount received, interest received'],
  ['Trading items on the credit side', 'Credit', 'Sales, purchases return'],
  ['Provisions and reserves', 'Credit', 'Provision for doubtful debts'],
], 'Table of eight kinds of ledger account with the side each takes in the trial balance and examples: assets, expenses, trading items on either side, drawings, capital and liabilities, incomes, and provisions', 'Side of each kind of account');
const vConfuse = table(['Item', 'Side', 'Reason'], [
  ['Opening stock', 'Debit', 'A balance of the last year brought forward in the books'],
  ['Closing stock', 'Not entered', 'Found at the year end; it goes to the trading account and the balance sheet'],
  ['Sales return', 'Debit', 'Goods come back, so it reduces the sales'],
  ['Purchases return', 'Credit', 'Goods go back, so it reduces the purchases'],
  ['Drawings', 'Debit', 'It reduces the owner\'s capital but is kept in its own account'],
  ['Bank overdraft', 'Credit', 'The firm owes the bank'],
  ['Provision for doubtful debts', 'Credit', 'An amount set aside against possible bad debts, not an asset'],
  ['Discount allowed and received', 'Debit and credit', 'An expense and an income'],
], 'Table of eight items that students often place wrongly: opening stock on the debit side, closing stock not entered, sales return on the debit side, purchases return on the credit side, drawings on the debit side, bank overdraft on the credit side, provision on the credit side, and discounts', 'Items that cause confusion');
const vWhSide = table(WH.sideTable.headers, WH.sideTable.rows, `Twenty-one balances of Wardha Hosiery, an imagined firm, on 31 March 2028, each with its nature and its side: twenty go to the trial balance and the closing stock of ${words(74000)} rupees is given outside the books and is not entered`, 'Wardha Hosiery: deciding the side of each balance');
const vWhTb = tb(WH.tb, `Trial balance of Wardha Hosiery on 31 March 2028 with each column totalling ${words(WH.dr)} rupees, without the closing stock`, 'Trial balance of Wardha Hosiery');
const cdD = ledger({ name: 'Debtor', dr: [['To Sales', 62000]], cr: [['By Cash', 40000]] });
const cdC = ledger({ name: 'Creditor', dr: [['To Cash', 30000]], cr: [['By Purchases', 75000]] });
same(cdD.balance, 22000, 'debtor balance');
same(cdC.balance, -45000, 'creditor balance');
const vCd = table(['Account', 'Debit total before balancing (₹)', 'Credit total before balancing (₹)', 'Balance written', 'Nature of the balance', 'Column in the trial balance'], [
  ['Debtor', inr(62000), inr(40000), 'By Balance c/d on the credit side', `Debit balance of ${rs(22000)}`, 'Debit'],
  ['Creditor', inr(30000), inr(75000), 'To Balance c/d on the debit side', `Credit balance of ${rs(45000)}`, 'Credit'],
], 'Table of two ledger accounts: a debtor whose debit side is larger, so the balance carried down is written on the credit side and is a debit balance, and a creditor whose credit side is larger, so the balance carried down is on the debit side and is a credit balance', 'The side of the c/d is the opposite of the nature of the balance');
const vCap = table(['Step', 'Working'], [
  ['1. Add all debit balances other than capital', 'Total of the debit column without capital'],
  ['2. Add all credit balances other than capital', 'Total of the credit column without capital'],
  ['3. Capital is the balancing figure', 'Debits minus credits of the other balances'],
  ['4. Enter the capital on the credit side', 'Both columns now agree'],
], 'Table of four steps to find a missing capital: add the debit balances, add the credit balances other than capital, take the difference as capital, and enter it on the credit side');
const vRk = table(['Item', 'Working (₹)'], [
  ['Total of debit balances', inr(RK.drOther)],
  ['Total of credit balances other than capital', inr(RK.crOther)],
  ['**Capital (balancing figure)**', `**${inr(RK.capital)}**`],
], `Working for the capital of Rohtak Sports Mart, an imagined firm: debit balances of ${words(RK.drOther)} rupees less other credit balances of ${words(RK.crOther)} rupees leave ${words(RK.capital)} rupees as capital`, 'Missing capital of Rohtak Sports Mart');
const vRkTb = tb(RK.tb, `Trial balance of Rohtak Sports Mart with the capital of ${words(RK.capital)} rupees found as the balancing figure, each column totalling ${words(RK.dr)} rupees`, 'Trial balance after finding the capital');
const vFlow2 = flow('LR', ['Analyse each transaction', 'Pass the journal entries', 'Post to the ledger accounts', 'Balance every account', 'Prepare the trial balance'], 'Route map of the third example: analyse each transaction, pass the journal entries, post them to the ledger accounts, balance every account and prepare the trial balance', 'From transactions to a trial balance');
const vPwTx = table(['Date', 'Transaction', 'Debit', 'Credit', 'Amount (₹)'], PW.map((e) => [e.date, e.note, e.dr.map(([a]) => a).join(' and '), e.cr.map(([a]) => a).join(' and '), inr(e.dr.reduce((s, [, x]) => s + x, 0))]), 'Ten transactions of Palampur Woollens, an imagined firm, in January 2028, each with the accounts debited and credited and the amount', 'Transactions of Palampur Woollens, January 2028');
const vPwCash = table(PW_L['Cash'].headers, PW_L['Cash'].rows, `Cash account of Palampur Woollens for January 2028: receipts on the debit side, payments on the credit side, and a balance of ${words(PW_L['Cash'].balance)} rupees carried down`, 'Cash account of Palampur Woollens');
const vPwBal = tb(balanceTable(PW), 'Table of the ten ledger accounts of Palampur Woollens after posting, each with its debit total, credit total, balance and the side of the balance', 'Balances of all the ledger accounts');
const vPwTb = tb(PW_TB, `Trial balance of Palampur Woollens on 31 January 2028: ten balances, with each column totalling ${words(PW_TB.dr)} rupees`, 'Trial balance of Palampur Woollens');
const vFind = table(['Clue', 'What it points to', 'Example'], [
  ['Difference equals one balance', 'That balance may have been left out of the list', `A debtor of ${rs(22000)} missing leaves the credit side higher by ${rs(22000)}`],
  ['Difference is exactly twice a balance', 'That balance may be on the wrong side', `Carriage inwards of ${rs(9000)} entered as a credit makes the difference ${rs(18000)}`],
  ['Difference is a multiple of 9', 'Two digits may have been transposed', `${rs(4500)} written as ${rs(5400)} gives a difference of ${rs(900)}`],
  ['Difference is a round figure', 'An error in adding or balancing an account', 'Re-add the columns and re-balance the ledgers'],
], 'Table of four clues when the trial balance does not agree: a difference equal to one balance suggests an omitted balance, twice a balance suggests the wrong side, a multiple of nine suggests transposed digits, and a round difference suggests an adding or balancing error', 'If the totals do not agree');
same(54 * 100 - 45 * 100, 900, 'transposition difference');
const vSummary2 = table(['Topic', 'Remember'], [
  ['Balance method', 'Each ledger balance is entered once, in the column of its nature'],
  ['Debit column', 'Assets, expenses, losses, purchases, sales return, opening stock, drawings'],
  ['Credit column', 'Capital, liabilities, incomes, sales, purchases return, provisions'],
  ['Stock', 'Opening stock on the debit side; closing stock is not in the trial balance'],
  ['Missing capital', 'Debit balances less the other credit balances'],
  ['From transactions', 'Journal, ledger, balances, then the trial balance'],
], 'Summary table of Part 2: the balance method, the debit column, the credit column, the treatment of stock, finding a missing capital and preparing a trial balance from transactions');

// ================================================================ decks
const deck1 = deck({
  part: 1,
  title: 'Trial Balance — Part 1: Meaning, Objectives, Advantages and Limitations',
  goals: [
    'State the meaning of a trial balance and its objectives and advantages',
    'Explain why equal totals do not prove that the accounts are free from errors, and name the errors that leave the totals equal',
    'Distinguish the errors that disturb the trial balance from those that do not',
  ],
  slides: [
    sl('title', 'The trial balance: a check before the final accounts', {
      b: 'Part 1: what a **trial balance** is, what it is meant to do, and why agreeing totals do **not** prove the books are error free.',
      v: vFlow1,
      n: 'Welcome. Once all transactions are posted and every ledger account is balanced, the accountant lists the balances in one statement called the trial balance. In this part we see what it is, what it checks, and why equal totals are comforting but never a proof.',
    }),
    sl('concept', 'Meaning of a trial balance', {
      bl: ['A **trial balance** is a **statement** of the balances of all ledger accounts on a given date.', 'Debit balances go in one column and credit balances in the other.', 'If the posting is arithmetically accurate, **the two totals agree**.'],
      v: vMeaning,
      n: 'A trial balance is a statement, not an account. It lists the closing balance of every ledger account on a date, with debit balances in one column and credit balances in the other. Because every transaction has equal debits and credits, the two totals should be equal.',
    }),
    sl('concept', 'Objectives of a trial balance', {
      b: 'The main objective is to test **arithmetical accuracy**; it also gives a **summary of the ledger** and the **base for the final accounts**.',
      v: vObj,
      n: 'A trial balance has four uses. It tests the arithmetical accuracy of the books. It gives one summary of all the ledger balances. It is the base from which the final accounts are drawn. And a difference in the totals warns the accountant to look for mistakes before going further.',
    }),
    sl('concept', 'Which side does each balance take?', {
      b: 'Assets, expenses, losses, purchases, sales return, opening stock and drawings stand on the **debit** side. Capital, liabilities, incomes, sales, purchases return and provisions stand on the **credit** side.',
      v: vSides,
      n: 'Before listing balances, remember the sides. Assets, expenses, losses, purchases, sales return, opening stock and drawings are debit balances. Capital, liabilities, incomes, sales, purchases return and provisions are credit balances. This one table settles most questions.',
    }),
    sl('example', 'Worked example 1: a trial balance from ledger balances', {
      b: `**Kasaragod Spice Traders**, an imagined firm, has the ledger balances shown below on 31 March 2028. Prepare the trial balance.`,
      bl: [`Debit balances total ${rs(KS.dr)}.`, `Credit balances (sales, creditors, capital) also total ${rs(KS.cr)}, so the totals agree.`],
      v: vKs,
      n: `Each ledger balance is entered once, on the side of its nature. Cash, bank, debtors, furniture, machinery, purchases, wages, rent, salaries and drawings go to the debit column. Sales, creditors and capital go to the credit column. Each column adds up to ${rupees(KS.dr)}, so the trial balance agrees.`,
    }),
    sl('check', 'Quick check: what agreement shows', {
      b: 'Decide what equal totals really prove.',
      chk: 'm_chk_totals',
      n: 'A trial balance agrees. What can the accountant say with certainty? Read the options carefully, and remember that agreement checks only the equality of debit and credit totals.',
    }),
    sl('concept', 'Advantages of a trial balance', {
      bl: ['It gives a **quick check** on the posting of the ledger.', 'It puts all balances in **one summary**.', 'It makes the **final accounts easier** to prepare.'],
      v: vAdv,
      n: 'The trial balance is useful in four ways. It checks the posting quickly. It gathers every ledger balance in one place. It makes the final accounts easier, because the figures are ready. And it saves time, since a difference tells the accountant to look for a mistake right away.',
    }),
    sl('concept', 'What agreement of the totals does and does not show', {
      b: 'Equal totals mean that **debits equal credits in the ledger**. They do **not** mean that every transaction was recorded, or that it was entered in the right account.',
      v: vProve,
      n: 'Equal totals show that the debit and credit balances are equal. They do not show that every transaction was recorded, that each entry sits in the right account, that the right principle was followed, or that two mistakes have not cancelled each other. So agreement is a good sign, not a proof.',
    }),
    sl('concept', 'Errors that the trial balance does not reveal', {
      bl: ['**Omission:** a transaction is left out of the books.', '**Principle:** the wrong class of account is used.', '**Commission:** the wrong account, or a wrong amount on both sides.', '**Compensating:** two mistakes cancel each other.'],
      v: vErrTypes,
      n: 'Four kinds of error leave the totals equal. In an error of omission the transaction is not recorded at all. In an error of principle the entry goes to the wrong class of account. In an error of commission the wrong account is used, with the right amount on both sides. Compensating errors cancel each other. Here we only name them. Rectifying them comes later.',
    }),
    sl('example', 'Worked example 2: four errors, equal totals', {
      b: `**Padmini Dry Fruits**, an imagined firm, has correct books with trial balance totals of ${rs(PD_TB.dr)}. Four different errors are made, one at a time. Find the effect on the trial balance.`,
      bl: ['Omission: Tamil Stores and Sales are both ₹22,000 short.', 'Principle: Purchases ₹36,000 too high; Computer missing.', 'Commission: Sundar Nuts Co. is debited instead of Ellora Foods.', 'Compensating: Rent and Commission received each ₹9,000 too high.'],
      v: vFour,
      n: `In the correct books the trial balance totals ${rupees(PD_TB.dr)}. When a credit sale is omitted, both totals fall together. When the computer is debited to purchases, the totals do not change at all. A payment debited to the wrong creditor changes no total. Rent and commission each wrong by the same amount cancel. The trial balance agrees every time.`,
    }),
    sl('concept', 'An error of principle: the totals do not notice', {
      b: 'The computer was bought for cash, so Computer A/c should be debited. It was debited to **Purchases A/c**. Debit and credit are still equal, but two balances are wrong.',
      v: vPrincDiff,
      n: 'In an error of principle, the debit is placed in a wrong class of account, such as a capital item treated as an expense. The credit to cash is correct. The debit total is the same as before. Yet purchases is too high and the computer account shows nothing. The trial balance cannot see this.',
    }),
    sl('check', 'Quick check: compensating errors', {
      b: 'True or false?',
      chk: 'tf_chk_compens',
      n: 'Read the statement about compensating errors. Think about what must happen to the two totals for such errors to stay hidden.',
    }),
    sl('concept', 'Compensating errors', {
      b: 'Two or more mistakes, usually on **opposite sides**, whose effects on the totals cancel. Each account is wrong, yet the trial balance agrees.',
      v: vCompDiff,
      n: 'Compensating errors are mistakes that cancel each other. Here rent is debited nine thousand rupees too much, and commission received is credited nine thousand rupees too much. The debit total and the credit total both rise by the same amount, so the trial balance still agrees. The mistakes are independent and happen to be of equal size.',
    }),
    sl('concept', 'Errors that do disturb the trial balance', {
      bl: ['An amount posted on **one side only**.', 'Different amounts posted on the **debit and credit** sides.', 'An amount posted twice on the same side, or to the **wrong side**.', 'An error in **adding** an account or the trial balance.'],
      v: vDisturb,
      n: 'These errors upset the equality of debit and credit. One side may be left out, the amounts on the two sides may differ, an amount may be posted twice on the same side, or a column may be added wrongly. The difference between the totals tells us the size of the error, and the higher side tells us where to look.',
    }),
    sl('example', 'Worked example 3: finding the difference', {
      b: `Take the books of Padmini Dry Fruits again. The receipt of ${rs(60000)} from Tamil Stores is debited to Cash but **never credited** to Tamil Stores. Find the effect on the trial balance.`,
      bl: [`Debit total ${rs(PD_ONE.bad.dr)}; credit total ${rs(PD_ONE.bad.cr)}.`, `The debit side is higher by ${rs(PD_ONE.gap)}, the amount of the missing credit.`],
      v: vOneSided,
      n: `The cash receipt is debited but the credit to Tamil Stores is left out. The debit total becomes ${rupees(PD_ONE.bad.dr)} and the credit total ${rupees(PD_ONE.bad.cr)}. The debit side is higher by ${rupees(PD_ONE.gap)}, exactly the amount of the missing credit. The disagreement warns the accountant that an error exists.`,
    }),
    sl('check', 'Quick check: the size of the gap', {
      b: 'Complete the sentence.',
      chk: 'fb_chk_gap',
      n: 'A one-sided posting leaves the two totals different. Think about which total is larger and by how much, and then fill in the blanks.',
    }),
    sl('concept', 'Limitations of a trial balance', {
      bl: ['Equal totals are **not proof** of accuracy.', 'Errors of **omission, principle, commission and compensation** stay hidden.', 'It checks only the **ledger**, not the original records.'],
      v: vLimits,
      n: 'The trial balance has real limits. Equal totals are not a proof. Four kinds of error go through unnoticed. A balance may sit in the wrong account without any difference. And the trial balance checks the ledger only, not the quality of the original records. The final accounts made from it can therefore still be wrong.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A trial balance is a statement of ledger balances on a date. It tests arithmetical accuracy, summarises the ledger and prepares the way for the final accounts. Omission, principle, commission and compensating errors do not disturb it. One-sided posting and unequal amounts do. Agreement is never a proof.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define the trial balance as a **statement of balances**, not an account.',
        'When asked why agreement is not proof, **name the errors** that leave totals equal and give a one-line example of each.',
        'Do not call omission, principle, commission and compensating errors errors that the trial balance shows; they are the ones it **does not show**.',
        'Mention both **advantages and limitations** when the question has two parts.',
      ],
      n: 'In the examination, define the trial balance as a statement and not an account. When asked why agreement is not proof, name the errors that leave the totals equal and give a short example of each. Keep advantages and limitations separate in your answer. Remember that rectification of errors is a separate chapter.',
    }),
  ],
});

const deck2 = deck({
  part: 2,
  title: 'Trial Balance — Part 2: Preparing the Trial Balance by the Balance Method',
  goals: [
    'Decide the side of each balance from the nature of the account, including opening stock, closing stock and returns',
    'Find a missing capital as the balancing figure',
    'Prepare ledger accounts from a short set of transactions and then the trial balance',
  ],
  slides: [
    sl('title', 'Preparing a trial balance by the balance method', {
      b: 'Part 2: reading ledger balances, placing each on the **correct side**, finding a **missing capital** and building the trial balance from **transactions**.',
      v: vRoute2,
      n: 'Welcome to part two. Here we prepare trial balances. We use the balance method, in which every ledger account contributes one balance, on one side. We decide the side from the nature of the account, find a missing capital, and start from transactions.',
    }),
    sl('concept', 'The balance method', {
      bl: ['Take the **closing balance** of every ledger account, the balance carried down.', 'Enter a **debit balance** in the debit column and a **credit balance** in the credit column.', 'Each account appears **once**; then add both columns.'],
      v: vSteps,
      n: 'In the balance method each account appears once, with only its closing balance. A debit balance goes to the debit column and a credit balance to the credit column. Then both columns are added and compared. The method is quick, and the final accounts are drawn from the same balances.',
    }),
    sl('concept', 'Side of each kind of account', {
      b: 'When a list of balances is given **without sides**, decide each side from the **nature** of the account.',
      v: vKinds,
      n: 'When balances are given without sides, ask what kind of account each one is. Assets, expenses, losses, purchases, sales return, opening stock and drawings are debit balances. Capital, liabilities, incomes, sales, purchases return and provisions are credit balances.',
    }),
    sl('concept', 'Items that cause confusion', {
      b: 'Opening stock is a **debit** balance. **Closing stock** is found at the year end and is **not in the trial balance** unless it is already entered in the books.',
      v: vConfuse,
      n: 'Some items cause trouble. Opening stock is a debit balance. Closing stock is found at the year end and goes to the trading account and the balance sheet, not the trial balance. Sales return is a debit and purchases return is a credit. Drawings are debit. Bank overdraft and provisions are credit.',
    }),
    sl('example', 'Worked example 1: deciding the side of each balance', {
      b: `**Wardha Hosiery**, an imagined firm, lists these balances on 31 March 2028 without sides. Closing stock of ${rs(74000)} is given as additional information. Classify each balance and prepare the trial balance.`,
      bl: ['Twenty balances go to the trial balance; the **closing stock is left out**.', `The debit and credit totals are each ${rs(WH.dr)}.`],
      v: vWhSide,
      n: 'The first step is to decide the nature of each balance. Opening stock, purchases, sales return, carriage inwards, wages, salaries, bad debts, discount allowed, debtors, plant, drawings and cash are debit balances. The rest, including provision for doubtful debts, bank overdraft and bills payable, are credit balances. Closing stock is given outside the books, so it is not entered.',
    }),
    sl('example', 'Worked example 1 continued: the trial balance', {
      b: 'Entering each balance on its side gives the statement below.',
      v: vWhTb,
      n: `With every balance placed, the trial balance of Wardha Hosiery is ready. Both columns total ${rupees(WH.dr)}. The closing stock does not appear. If it had been entered, the totals would no longer agree, because it would have no matching balance.`,
    }),
    sl('check', 'Quick check: opening stock', {
      b: 'Choose the side of the opening stock.',
      chk: 'm_chk_stock',
      n: 'A list of balances includes opening stock. Decide whether it goes in the debit column or the credit column, and remember that it is the stock with which the year began.',
    }),
    sl('concept', 'Reading the side from a ledger account', {
      b: 'The balance carried down is written on the **lighter** side. A balance c/d on the **credit** side is a **debit balance**; a balance c/d on the **debit** side is a **credit balance**.',
      v: vCd,
      n: 'In a ledger account the balance carried down is written on the side that is smaller before balancing. So a balance carried down on the credit side means the debit side was larger, and the account has a debit balance. A balance carried down on the debit side means a credit balance. The trial balance takes the nature, not the side of the carried down line.',
    }),
    sl('concept', 'A missing capital', {
      b: 'If every balance except capital is given and the trial balance must agree, **capital is the balancing figure**: debit balances minus the other credit balances.',
      v: vCap,
      n: 'Sometimes the capital is not given. The totals must still agree, so capital is the balancing figure. Add the debit balances. Add the credit balances other than capital. The difference is the capital, and it goes to the credit side.',
    }),
    sl('example', 'Worked example 2: finding the capital', {
      b: `**Rohtak Sports Mart**, an imagined firm, gives these balances on 31 March 2028 without the capital. Find the capital and prepare the trial balance.`,
      bl: [`Debit balances ${rs(RK.drOther)}; other credit balances ${rs(RK.crOther)}.`, `Capital = ${rs(RK.drOther)} − ${rs(RK.crOther)} = ${rs(RK.capital)}.`],
      v: vRk,
      n: `The debit balances total ${rupees(RK.drOther)}. The credit balances other than capital total ${rupees(RK.crOther)}. The difference of ${rupees(RK.capital)} is the capital and goes to the credit side. Now both columns total ${rupees(RK.dr)}.`,
    }),
    sl('example', 'Worked example 2 continued: the trial balance', {
      b: 'Now the trial balance with the capital entered on the credit side.',
      v: vRkTb,
      n: `With the capital of ${rupees(RK.capital)} entered, both columns agree at ${rupees(RK.dr)}. Note that the agreement is forced by the method. It does not check the figures given, which is why a missing capital is found only when the other balances are trusted.`,
    }),
    sl('check', 'Quick check: missing capital', {
      b: 'Find the balancing figure.',
      chk: 'n_chk_capital',
      n: 'A list gives the debit balances and the credit balances other than capital. Add each group, take the difference, and say what the capital must be for the trial balance to agree.',
    }),
    sl('concept', 'From transactions to a trial balance', {
      bl: ['Pass a **journal entry** for every transaction.', 'Post to the ledger accounts, then **balance each one**.', 'List the balances and total the two columns.'],
      v: vFlow2,
      n: 'When transactions are given, work in order. Analyse each transaction and pass a journal entry. Post the entries to the ledger accounts. Balance every account. List the balances in a trial balance. The totals of the debit and credit sides of all the ledger accounts are also equal, which gives a second check.',
    }),
    sl('example', 'Worked example 3: transactions of Palampur Woollens', {
      b: '**Palampur Woollens**, an imagined firm, has ten transactions in January 2028. Analyse them, post them and prepare the trial balance as on 31 January 2028.',
      v: vPwTx,
      n: 'First analyse each transaction. The business starts with cash and furniture, which is capital. Purchases and sales are made for cash and on credit. Rent, salaries and a withdrawal by the proprietor are paid in cash. Money is received from one customer and paid to one supplier.',
    }),
    sl('example', 'Worked example 3 continued: the ledger', {
      b: `Post each entry. The **Cash account** has ${rs(290000)} on the debit side and ${rs(147000)} on the credit side, so the balance carried down is ${rs(143000)}.`,
      v: vPwCash,
      n: `Each entry is posted to two accounts. The cash account receives the capital, the cash sale and the collection from the customer on the debit side. It pays for purchases, rent, the supplier, salaries and drawings on the credit side. Debits exceed credits, so ${rupees(143000)} is carried down as a debit balance.`,
    }),
    sl('example', 'Worked example 3 continued: balances and trial balance', {
      b: 'The other nine accounts are balanced in the same way. Their totals and balances are below; the trial balance follows.',
      v: vPwBal,
      n: 'After posting, the debit and credit totals of every ledger account are known. The balance is the difference. Cash, furniture, purchases, debtor, rent, salaries and drawings have debit balances. Capital, the supplier and sales have credit balances.',
    }),
    sl('example', 'Worked example 3 concluded: the trial balance', {
      b: `Each balance is written once on its side. The totals agree at ${rs(PW_TB.dr)}.`,
      v: vPwTb,
      n: `The trial balance of Palampur Woollens has ten lines. The debit column and the credit column both come to ${rupees(PW_TB.dr)}. As all entries were correct and complete, the trial balance agrees, and the accountant may go on to the final accounts.`,
    }),
    sl('check', 'Quick check: balance carried down', {
      b: 'Read the account.',
      chk: 'm_chk_cd',
      n: 'A ledger account is closed with the balance carried down on the debit side. Decide which column of the trial balance should show it.',
    }),
    sl('concept', 'If the totals do not agree', {
      b: 'Use the **difference** as a clue before searching every entry.',
      v: vFind,
      n: 'If the totals differ, look at the difference. If it equals one balance, that balance may have been left out. If it is twice a balance, the balance may be on the wrong side. If it divides by nine, digits may have been transposed. A round figure suggests an adding or balancing error.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. In the balance method each ledger balance is entered once, on the side of its nature. Opening stock is a debit balance, closing stock is not in the trial balance, and a missing capital is the balancing figure. From transactions, prepare the journal, post, balance and list.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **Debit** and **Credit** columns with a heading and the date; add both columns and show equal totals.',
        'Decide each side from the **nature** of the account, not from the order in the question.',
        'Leave out **closing stock** unless the question says it is already in the books.',
        'Show the working for a **missing capital**; step marks are given for the debits, the credits and the difference.',
        'Check the **side of a balance c/d**: it is opposite to the nature of the balance.',
      ],
      n: 'In the examination, write debit and credit columns with a proper heading and the date. Decide each side from the nature of the account. Leave out closing stock unless the question says it is in the books. Show the working for a missing capital. Remember that a balance carried down on one side is a balance of the opposite nature.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Trial Balance — Notes',
  sections: [
    {
      h: '1. Meaning and place of the trial balance',
      t: 1,
      b: 'After transactions are journalised, posted to the ledger and every account is balanced, the accountant lists the balances in a **trial balance**.\n\n- It is a **statement**, not an account, and has no folio.\n- It is made **on a date**, usually the last day of the year.\n- Debit balances are in one column and credit balances in the other; if the posting is accurate the totals **agree**.\n\nThe trial balance comes between the ledger and the final accounts.',
      terms: [
        ['Trial balance', 'A statement of the balances of all ledger accounts on a date, in a debit column and a credit column.'],
        ['Balance method', 'Preparing the trial balance from the closing balance of each account, entered once on its own side.'],
      ],
      v: vFlow1,
      vs: [vMeaning],
    },
    {
      h: '2. Objectives and advantages',
      t: 1,
      b: '**Objectives:** to test the **arithmetical accuracy** of the books, to give a **summary of the ledger**, and to give the **base for the final accounts**.\n\n**Advantages:** a quick check on posting; all balances in one place; easier final accounts; time saved in finding mistakes because a difference warns that something is wrong.',
      terms: [
        ['Arithmetical accuracy', 'The state in which equal debits and credits have been posted, so the two totals are equal.'],
      ],
      v: vObj,
      vs: [vAdv],
    },
    {
      h: '3. What agreement shows, and the errors it hides',
      t: 1,
      b: 'Agreement of the totals shows that **debits equal credits**. It does not show that the accounts are free from error. Four kinds of error leave the totals equal:\n\n1. **Omission:** the transaction is not recorded at all.\n2. **Principle:** an entry breaks an accounting principle, for example a capital item treated as an expense.\n3. **Commission:** the wrong account is used, or the amount is wrong on both sides.\n4. **Compensating errors:** two or more errors cancel each other.\n\nRectification of these errors is a separate chapter; here they are only named and recognised.',
      terms: [
        ['Error of omission', 'A transaction is left out of the books completely.'],
        ['Error of principle', 'An entry is made in the wrong class of account, such as a capital item debited as an expense.'],
        ['Error of commission', 'The right principle is followed but the wrong account is used, or the amount is wrong on both sides.'],
        ['Compensating errors', 'Mistakes whose effects on the two totals cancel each other.'],
      ],
      v: vErrTypes,
      vs: [vProve, vFour],
    },
    {
      h: '4. Errors that disturb the trial balance, and limitations',
      t: 1,
      b: 'Some mistakes make the totals **differ**:\n\n- an amount posted on **one side only**;\n- **different amounts** on the debit and credit sides;\n- an amount posted **twice** on the same side, or to the **wrong side**;\n- wrong **addition** or balancing.\n\n**Limitations:** agreement is not proof of accuracy; four kinds of error stay hidden; a balance can sit in the wrong account unnoticed; the trial balance tests only the ledger, not the original records.',
      terms: [
        ['One-sided posting', 'A debit or a credit entered without its matching entry, which makes the totals differ.'],
      ],
      v: vDisturb,
      vs: [vLimits],
    },
    {
      h: '5. The balance method: the side of each balance',
      t: 2,
      b: 'Take the closing balance of each ledger account and place it on the side of its **nature**:\n\n- **Debit:** assets, expenses, losses, purchases, sales return, opening stock, drawings.\n- **Credit:** capital, liabilities (including bank overdraft), incomes, sales, purchases return, provisions.\n\nEach account appears **once**. Add both columns and show that the totals are equal.',
      terms: [
        ['Debit balance', 'A balance on the debit side of an account: the debit total is larger than the credit total.'],
        ['Credit balance', 'A balance on the credit side of an account.'],
      ],
      v: vKinds,
      vs: [vKs],
    },
    {
      h: '6. Opening stock, closing stock and other items that cause trouble',
      t: 2,
      b: '**Opening stock** is a debit balance. **Closing stock** is found at the year end and is shown in the trading account and the balance sheet; if it is given as additional information it is **not** entered in the trial balance. Sales return is a **debit**, purchases return a **credit**, drawings a **debit**, bank overdraft and provisions are **credits**.\n\nA balance carried down on the credit side of a ledger account is a **debit balance**, and the reverse, so read the nature, not the side of the c/d line.',
      terms: [
        ['Opening stock', 'The stock at the beginning of the year, a debit balance in the trial balance.'],
        ['Closing stock', 'The stock at the end of the year, normally not in the trial balance.'],
      ],
      v: vConfuse,
      vs: [vCd, vWhSide, vWhTb],
    },
    {
      h: '7. A missing capital, and a trial balance from transactions',
      t: 2,
      b: 'If the capital is not given, **capital = total of debit balances − total of credit balances other than capital**, and it is entered on the credit side.\n\nFrom transactions: pass a journal entry for each, post it to the ledger accounts, balance every account, list the balances and total the two columns. The totals of all debits and credits posted in the ledger are also equal, which gives a second check.',
      terms: [
        ['Balancing figure', 'The amount needed to make the two sides equal; here the capital.'],
      ],
      v: vCap,
      vs: [vRk, vRkTb, vPwTx, vPwCash, vPwBal, vPwTb],
    },
    {
      h: '8. If the totals do not agree',
      t: 2,
      b: 'First re-add the columns and re-check the balance of each account. Then use the **difference**: one balance left out equals the difference; a balance on the wrong side makes it **twice** that balance; transposed digits give a **multiple of nine**; a round figure suggests an adding mistake.\n\nA difference is a warning to search. Equal totals are not proof of accuracy.',
      terms: [
        ['Transposition', 'Writing two digits of an amount in the wrong order, such as 54 for 45.'],
      ],
      v: vFind,
      vs: [vSummary1, vSummary2],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts, Section A)**\n- 1 mark: the side of a balance, or which error leaves the totals equal.\n- 2 marks: the meaning of a trial balance, two objectives or advantages, or the side of four balances.\n- 3 marks: a trial balance from about eight balances, three errors that do not affect the totals each with an example, or a missing capital.\n- 5 marks: a full trial balance with sides to be decided, stock to be left out and capital to be found, or ledgers and a trial balance from transactions. Step marks go to each balance on the right side, the capital, the totals and the heading.\n\n**Common mistakes**\n- Calling the trial balance an account, or saying that agreement proves the books are correct.\n- Entering closing stock given as additional information.\n- Placing sales return on the credit side, drawings on the credit side, or a bank overdraft on the debit side.\n- Treating a balance carried down on the credit side as a credit balance.\n- Writing the trial balance without a date or without showing both totals.\n- Leaving the working for a missing capital.',
});

// ================================================================ flashcards
const F = cards([
  ['**Trial balance**', 'A statement of the balances of all ledger accounts on a date, with debit balances in one column and credit balances in the other.', 'definition', 1],
  ['Is a trial balance an account?', 'No. It is a statement, with no folio, and it is not part of the double entry.', 'concept', 1],
  ['Main objective of a trial balance', 'To test arithmetical accuracy: equal debit and credit totals.', 'fact', 1],
  ['Other objectives of a trial balance', 'A summary of the ledger, and the base for preparing the final accounts.', 'fact', 1],
  ['Two advantages of a trial balance', 'A quick check on posting, and all balances in one place for the final accounts.', 'fact', 1],
  ['If the totals agree, what is proved?', 'Only that debits equal credits in the ledger. The accounts may still contain errors.', 'concept', 1],
  ['**Error of omission**', 'A transaction is left out of the books altogether. The totals stay equal.', 'definition', 1],
  ['**Error of principle**', 'An entry in the wrong class of account, for example a capital item debited as an expense. The totals stay equal.', 'definition', 1],
  ['**Error of commission**', 'The right principle but the wrong account, or the wrong amount on both sides. The totals stay equal.', 'definition', 1],
  ['**Compensating errors**', 'Errors whose effects on the two totals cancel each other, so the totals agree.', 'definition', 1],
  ['Errors the trial balance does not reveal', 'Omission, principle, commission and compensating errors.', 'exam-tip', 1],
  ['Errors the trial balance reveals', 'One-sided posting, different amounts on the two sides, wrong side, and wrong addition.', 'fact', 1],
  ['What does a difference in the totals show?', 'That one or more errors exist; the amount and the higher side are clues to find them.', 'concept', 1],
  ['Limitations of a trial balance', 'Agreement is not proof; some errors stay hidden; wrong accounts may carry right totals; it tests only the ledger.', 'concept', 1],
  ['Which balances go to the debit side?', 'Assets, expenses, losses, purchases, sales return, opening stock, drawings.', 'fact', 2],
  ['Which balances go to the credit side?', 'Capital, liabilities, incomes, sales, purchases return, provisions.', 'fact', 2],
  ['**Balance method**', 'Entering the closing balance of each ledger account once, on the side of its nature.', 'definition', 2],
  ['Side of opening stock', 'Debit.', 'exam-tip', 2],
  ['Closing stock given as additional information', 'Not entered in the trial balance; it goes to the trading account and balance sheet.', 'exam-tip', 2],
  ['Side of sales return and purchases return', 'Sales return is a debit; purchases return is a credit.', 'exam-tip', 2],
  ['Side of drawings', 'Debit.', 'exam-tip', 2],
  ['Side of a bank overdraft', 'Credit: the firm owes the bank.', 'exam-tip', 2],
  ['Side of provision for doubtful debts', 'Credit.', 'exam-tip', 2],
  ['A balance c/d is written on the credit side. Which column?', 'Debit column: the account has a debit balance.', 'concept', 2],
  ['Missing capital', 'Total of debit balances − total of credit balances other than capital; entered on the credit side.', 'concept', 2],
  ['Steps from transactions to a trial balance', 'Journal entries, posting, balancing, listing the balances, totalling.', 'concept', 2],
  ['An item is placed on the wrong side. What is the difference?', 'Twice the amount of that item.', 'exam-tip', 2],
  ['An item is left out of the list. What is the difference?', 'The amount of that item; the other side is higher by that amount.', 'exam-tip', 2],
  ['A difference divisible by 9 suggests', 'Transposition of digits in an amount.', 'fact', 2],
  ['What must a trial balance show?', 'Heading, date, both columns, and equal totals.', 'exam-tip', 2],
]);
check(F.cards.length >= 28 && F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Trial Balance',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_obj_purpose', 'm_err_omit', 'm_side_prov', 'm_cap_missing', 'ar_agree_prove'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_meaning', { attempt: 1, keys: ['s2_classify', 's2_diff_reveal'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show the trial balance in proper form.', items: ['s3_tb_small', { attempt: 1, keys: ['s3_error_types', 's3_missing_cap'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the trial balance in proper form.', items: ['l5_tb_sides'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Trial Balance',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_agree_prove', 'm_compens', 'm_principle', 'm_diff_side', 'm_adv', 'm_side_return', 'm_side_open', 'm_overdraft', 'm_wrong_side', 'm_statement', 'ar_one_sided', 'ar_drawings'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_objectives', 's2_closing_stock', { attempt: 1, keys: ['s2_advantages', 's2_compens_example'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show working and the trial balance in proper form.', items: ['s3_classify_six', 's3_ledger_to_tb', 's3_agree_no_error', { attempt: 1, keys: ['s3_which_agree', 's3_wrong_side'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare ledgers and statements in proper form.', items: ['l5_ledgers', { attempt: 1, keys: ['l5_capital', 'l5_errors'] }] },
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
    syllabus: 'topics t01-t02 of isc-11-accounts-ch07 (meaning, objectives, advantages and limitations of the trial balance, with the omission, principle, commission and compensating errors that keep the totals equal named only; preparing a trial balance by the balance method with the side of each balance decided, a missing capital found as the balancing figure, and ledgers and a trial balance prepared from a short set of transactions); there are no removed topics; rectification of errors (Chapter 14) and GST transactions are not covered',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms and figures differ from the CBSE 11 Accountancy trial balance chapter and from the ISC 11 Accounts chapters 3 to 6',
    data: 'every trial balance generated by acc.mjs trialBalance/trialFromLedgers through tb.mjs fromBalances/withCapital with the totals asserted equal; error cases simulated by posting the right and the erroneous entries to ledgers and asserting equal or unequal totals and the difference; ledgers and balances of the transactions case generated by post() and asserted',
    facts: 'ISC Accountancy (858) Class XI Unit 3 Journal, Ledger and Trial Balance: trial balance, its objectives, advantages and limitations, preparation by the balance method; GST transactions are not examined',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
