// t01: trial balance: meaning, objectives, advantages and limitations; the errors that leave the totals equal (named
// only: rectification is Chapter 14) and the errors that disturb them. Imagined firms; figures computed and asserted.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, check, sum, inr, rs, mdTable, post, errorCase, swap, bal, fromBalances } from './tb.mjs';
import { QQ, numQ, lst } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_obj_purpose', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Hosur Hardware, an imagined firm, prepares a trial balance at the end of every month. The main objective of doing so is to',
  opts: ['check the arithmetical accuracy of the posting and balancing of the ledger', 'find the profit earned during the month', 'find the market value of the assets', 'prove that no error has been committed in the books'],
  sol: 'The statement tests whether total debits and total credits agree. It does not compute profit (that is the work of the final accounts), it has nothing to do with market values, and agreement can never prove that no error exists.',
}));
QQ('m_agree_prove', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The trial balance of Nellore Pickles, an imagined firm, agrees at ₹8,40,000 on each side. Which one of these mistakes may still be present in its books?',
  opts: ['A credit purchase of goods was not entered in any book', 'A debit of ₹8,000 was posted to the ledger without its credit', 'A credit balance was written in the debit column of the trial balance', 'The balance of one account was carried down with a wrong amount'],
  sol: 'A transaction left out altogether leaves debits and credits equal, so the totals cannot show it. Each of the other three mistakes would make the two columns differ.',
}));
QQ('m_err_omit', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A credit sale of goods for ₹22,500 to Ghatal Traders was not recorded in any book of Shimla Woollens, an imagined firm. This is an error of',
  opts: ['omission', 'commission', 'principle', 'compensation'],
  sol: 'A transaction missing from the books altogether is an error of omission. Commission means a wrong account or amount, principle means a wrong class of account, and compensation needs two mistakes that cancel.',
}));
const GAP1 = 648500 - 639500;
same(GAP1, 9000, 'm_diff_side gap');
QQ('m_diff_side', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `The trial balance of Chirala Seeds, an imagined firm, shows a debit total of ${rs(648500)} and a credit total of ${rs(639500)}. Which single error explains the whole difference?`,
  opts: [`A credit entry of ${rs(GAP1)} was not posted to the ledger`, `A debit entry of ${rs(GAP1)} was not posted to the ledger`, `A sale of ${rs(GAP1)} was left out of every book`, `An expense of ${rs(GAP1 / 2)} was posted to the credit side instead of the debit side`],
  sol: `The debit side is higher by ${rs(GAP1)}, so a credit of that size is missing (or a debit is too much). A missing debit would lower the debit total, a complete omission changes neither total, and a wrong-side posting of ${rs(GAP1 / 2)} would leave the credit side higher.`,
}));
QQ('m_compens', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Compensating errors in the books of Raiganj Tea Stall, an imagined firm, are errors which',
  opts: ['affect two or more accounts and cancel each other in their effect on the trial balance totals', 'arise from a transaction left out of the books altogether', 'arise when an item of capital nature is treated as an item of revenue', 'arise when the right amount is entered in a wrong account of the same kind'],
  sol: 'Cancelling effects are the mark of compensating errors. The other options describe omission, principle and commission respectively.',
}));
QQ('m_principle', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Whitefield Printers, an imagined firm, paid ₹14,500 for a new cutting machine and debited the amount to Repairs A/c. This is an error of',
  opts: ['principle', 'omission', 'commission', 'compensation'],
  sol: 'A machine is a capital item but it was treated as a revenue expense, which breaks the principle of distinguishing capital from revenue. Nothing was omitted, the amount and sides are right, and no second error cancels it.',
}));
QQ('m_commission', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Jhansi Spices, an imagined firm, received a cheque of ₹9,800 from Mohan Beniwal and, by mistake, credited it to the account of Mohan Bhatnagar, another customer. The error is one of',
  opts: ['commission', 'principle', 'omission', 'compensation'],
  sol: 'The correct side and amount were used but the wrong personal account was chosen, which is an error of commission. The totals still agree, so the trial balance cannot show it.',
}));
QQ('m_adv', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of the following is an advantage of a trial balance for Tonk Tractors, an imagined firm?',
  opts: ['All the ledger balances are available in one statement for preparing the final accounts', 'It proves that all the accounts are free from errors', 'It discloses every error of omission and principle', 'It shows the profit of the firm without any further statement'],
  sol: 'The one-statement summary is the real advantage. It cannot prove freedom from error, it does not reveal omission or principle errors, and profit comes only from the final accounts.',
}));
QQ('m_statement', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the accounts of Sambalpur Sweets, an imagined firm, the trial balance is best described as',
  opts: ['a statement of ledger balances prepared on a date to test the equality of debits and credits', 'an account kept in the ledger with a folio for every balance', 'a book of original entry for balances brought forward', 'a final account prepared at the end of the year'],
  sol: 'It is a statement, and not an account. It has no folio, is not a book of original entry, and is prepared before the final accounts.',
}));
QQ('m_chk_totals', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The owner of Dumka Dyes, an imagined firm, is told that the trial balance of the firm agrees and asks whether the books are therefore correct. The best reply is that',
  opts: ['the posting is arithmetically accurate, but some kinds of error can still be present', 'every transaction has been recorded in the right account', 'no accounting principle has been broken in the books', 'the final accounts made from it will certainly be correct'],
  sol: 'Agreement is a test of equal debit and credit totals only. Completeness, correct accounts and correct principles are not tested, so the final accounts may still be affected.',
}));

// ================================================================ assertion-reason
QQ('ar_agree_prove', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The books of Kolhapur Looms, an imagined firm, may contain errors although its trial balance agrees.',
  r: 'Some errors leave the total of the debits equal to the total of the credits, and so the trial balance does not show them.',
  sol: 'Both statements are true, and the reason is the explanation: errors that keep the two totals equal pass through undetected.',
}));
QQ('ar_one_sided', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The trial balance of Nagapattinam Cashews, an imagined firm, shows a difference when a cash receipt is debited to Cash but not credited to the customer.',
  r: 'The trial balance is an account of the ledger in which every balance carries a folio.',
  sol: 'The assertion is true, since one side of the entry is missing. The reason is false: the trial balance is a statement and not an account, and it has no folio.',
}));
QQ('ar_drawings', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The drawings of the proprietor of Silvassa Stores, an imagined firm, appear on the debit side of its trial balance.',
  r: 'A trial balance may be prepared at the end of every month and not only at the end of the year.',
  sol: 'Both are true, but the timing of the statement has no bearing on the side of drawings, which is a debit balance because it represents withdrawals.',
}));
QQ('ar_compens', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Compensating errors in the books of Raipur Rice Mill, an imagined firm, cannot be detected by comparing the two totals of the trial balance.',
  r: 'The effects of such errors on the debit total and on the credit total are equal, and so they cancel.',
  sol: 'The totals stay equal because the effects cancel, which is why comparing them shows nothing. Both statements are true and the reason explains the assertion.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_chk_compens', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'In the books of Arni Silks, an imagined firm, Rent A/c is debited ₹5,000 too much and Commission Received A/c is credited ₹5,000 too much. The trial balance of the firm will still agree.',
  sol: 'Both totals rise by the same amount, so they remain equal; these are compensating errors.',
}));
QQ('tf_agree_proof', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'If the trial balance of Dehri Cements, an imagined firm, agrees, it proves that no error has been committed in its books.',
  sol: 'Agreement only shows equal totals; errors of omission, principle, commission and compensating errors are not disclosed.',
}));
QQ('tf_diff_error', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'If the two columns of the trial balance of Ongole Oil Mills, an imagined firm, differ, at least one mistake has been made in posting, balancing or listing the balances.',
  sol: 'Equal debits and credits are the rule of double entry, so unequal totals point to a slip somewhere between the entry and the statement.',
}));
QQ('fb_chk_gap', fb({
  t: 1, d: 2, c: 'application',
  stem: 'A cash receipt of ₹18,000 from a customer of Hassan Lock Works, an imagined firm, is debited to Cash but never credited to the customer. The ______ total of the trial balance exceeds the ______ total by ₹______.',
  acc: [['debit'], ['credit'], ['18000', '18,000']],
  sol: 'The debit is posted and the credit is missing, so the debit column is higher by the unposted credit of 18,000.',
}));
QQ('fb_def', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A trial balance is a ______ of ledger balances prepared on a given date to test the ______ accuracy of the books.',
  acc: [['statement', 'list'], ['arithmetical']],
  sol: 'It is a statement (or list) of balances, and what it tests is arithmetical accuracy.',
}));
QQ('fb_omit', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'When a transaction of Jorhat Jaggery, an imagined firm, is left out of the books completely, it is an error of ______ and the two totals of the trial balance remain ______.',
  acc: [['omission'], ['equal', 'unchanged', 'agreed', 'the same']],
  sol: 'This is an omission, and since both debit and credit are missing the totals stay equal.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Define a trial balance. Is it an account? Give a reason.',
  model: 'A trial balance is a list of the debit and credit balances of all the ledger accounts on a given date, drawn up to test whether the two totals agree.\n\nIt is not an account. It is a statement, it has no folio, and it forms no part of the double entry.',
  sol: 'One mark for the meaning and one mark for the answer with the reason.',
  scheme: [['Definition: list of ledger balances on a date, debit and credit columns', 1], ['Not an account: a statement outside the double entry', 1]],
}));
QQ('s2_objectives', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Mention two purposes for which Mayurbhanj Mats, an imagined firm, draws up a trial balance at the end of the accounting period.',
  model: '1. To test the arithmetical accuracy of the books: if debits and credits have been posted equally, the totals agree.\n\n2. To provide a summary of all the ledger balances from which the final accounts can be prepared.',
  sol: 'One mark for each objective. Other correct objectives (for example, locating errors) are accepted.',
  scheme: [['First objective, correctly stated', 1], ['Second objective, correctly stated', 1]],
}));
QQ('s2_advantages', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Give any two advantages of a trial balance.',
  model: '1. It gives a quick check on the accuracy of posting and balancing.\n\n2. It places all the balances in a single statement, so the trading and profit and loss accounts and the balance sheet can be prepared easily.',
  sol: 'One mark for each advantage.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
QQ('s2_name_errors', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Name two errors that the trial balance of Kurnool Cotton Mart, an imagined firm, cannot disclose, and give one example of each.',
  model: '1. Error of omission: a credit sale of ₹15,000 to a customer is not recorded in any book.\n\n2. Error of principle: ₹40,000 spent on a new weighing machine is debited to Purchases A/c.',
  sol: 'One mark for each error with a suitable example; commission and compensating errors are also acceptable.',
  scheme: [['First error named with an example', 1], ['Second error named with an example', 1]],
}));
QQ('s2_agree_limit', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'The trial balance of Balaghat Brassware, an imagined firm, agrees, but its accountant finds later that a cash purchase of furniture was debited to Purchases A/c. Why did the trial balance not show this, and what kind of error is it?',
  model: 'Both the debit (to Purchases) and the credit (to Cash) were of the right amount, so the totals stayed equal and the trial balance had nothing to show.\n\nIt is an error of principle, since a capital item was treated as a revenue item.',
  sol: 'One mark for the reason and one mark for the name of the error.',
  scheme: [['Totals stay equal because only the account chosen is wrong', 1], ['Error of principle', 1]],
}));
QQ('s2_diff_reveal', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'In the books of Karwar Crab Traders, an imagined firm, (i) a credit sale was never entered in any book, and (ii) a payment to a creditor was debited to Cash and also debited to the creditor. Which error will the trial balance reveal, and which will it not? Give a reason.',
  model: '(i) The omission of a credit sale is not revealed: its debit and its credit are both missing, so the totals remain equal.\n\n(ii) The payment posted as two debits is revealed: the debit total exceeds the credit total, because the credit to Cash is missing.',
  sol: 'One mark for the case that is hidden and one for the case that is revealed, each with its reason.',
  scheme: [['(i) not revealed, with reason', 1], ['(ii) revealed, with reason', 1]],
}));
QQ('s2_compens_example', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'What are compensating errors? Illustrate with an example from the books of Pilani Pencils, an imagined firm.',
  model: 'Compensating errors are two or more mistakes whose effects on the totals cancel, so the trial balance agrees.\n\nExample: the wages account is debited ₹3,000 too much, and the discount received account is credited ₹3,000 too much; the debit and credit totals rise equally.',
  sol: 'One mark for the meaning and one for a valid example.',
  scheme: [['Meaning: mistakes that cancel each other in the totals', 1], ['A suitable example with equal opposite effects', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_error_types', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Name three kinds of errors that do not affect the agreement of the trial balance, and give one example of each from the books of an imagined stationery shop.',
  model: '1. Omission: a credit purchase of ₹12,000 is not entered in any book.\n\n2. Principle: a new almirah costing ₹20,000 is debited to Repairs A/c.\n\n3. Commission: a cheque of ₹5,000 received from Kavita is credited to the account of Kamini.',
  sol: 'One mark for each error with a suitable example. Compensating errors may replace any one of the three.',
  scheme: [['Omission with an example', 1], ['Principle with an example', 1], ['Commission (or compensating errors) with an example', 1]],
}));
QQ('s3_agree_no_error', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'The proprietor of Roshni Printers, an imagined firm, is happy because its trial balance has agreed, and says "now my books must be correct". Comment on this in three points.',
  model: '1. Agreement shows only that the debit total equals the credit total, which means the posting is arithmetically accurate.\n\n2. Errors of omission, principle, commission and compensating errors leave the totals equal, so they may still be present.\n\n3. A balance may sit in the wrong account or a wrong principle may be followed, and the final accounts will then be wrong although the trial balance agreed.',
  sol: 'One mark for each point.',
  scheme: [['Agreement shows arithmetical accuracy only', 1], ['Hidden errors are named', 1], ['Final accounts may still be affected', 1]],
}));
QQ('s3_which_agree', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: 'Kanchi Weavers, an imagined firm, finds the following in its books: (i) a credit purchase of ₹17,500 was not entered anywhere; (ii) a receipt of ₹12,000 from a customer was debited to Cash but the customer was not credited; (iii) furniture bought for ₹30,000 was debited to Purchases A/c; (iv) the sales book total of ₹46,000 was credited to Sales A/c as ₹43,000; (v) a payment of ₹5,000 to Vimal was debited to the account of Vikas. (a) Which three errors would leave the trial balance in agreement? [2] (b) Name the kind of error in each of those three. [1]',
  model: '**(a)** Errors (i), (iii) and (v) leave the totals equal. Errors (ii) and (iv) make the totals differ: in (ii) the debit side is higher by ₹12,000 and in (iv) the debit side is higher by ₹3,000.\n\n**(b)** (i) is an error of omission, (iii) an error of principle and (v) an error of commission.',
  sol: 'Look for a missing or unequal side: a one-sided entry and a short credit disturb the totals.',
  scheme: [['Errors (i), (iii) and (v) identified', 1], ['Errors (ii) and (iv) shown to disturb the totals', 1], ['Omission, principle and commission named correctly', 1]],
}));
{
  const T = 580000;
  const dr = T - 6200 + 14000;
  const cr = T + 6200 - 14000;
  same(dr - cr, 15600, 's3_wrong_side difference');
  QQ('s3_wrong_side', short({
    t: 1, d: 4, c: 'application', marks: 3,
    stem: `The correct trial balance of Munger Motors, an imagined firm, has totals of ${rs(T)} on each side. A clerk wrote carriage inwards of ${rs(6200)} in the credit column and a bank overdraft of ${rs(14000)} in the debit column. Find the two totals as they stood after these slips and the difference between them.`,
    model: `Debit total = ${inr(T)} − ${inr(6200)} (carriage inwards, wrongly left out) + ${inr(14000)} (overdraft, wrongly added) = **${rs(dr)}**.\n\nCredit total = ${inr(T)} + ${inr(6200)} − ${inr(14000)} = **${rs(cr)}**.\n\nDifference = ${inr(dr)} − ${inr(cr)} = **${rs(dr - cr)}**, with the debit side higher.`,
    sol: 'Move each item from its right column to the wrong one and recompute both totals.',
    scheme: [['Debit total ₹5,87,800', 1], ['Credit total ₹5,72,200', 1], ['Difference ₹15,600 and the debit side higher', 1]],
  }));
}
{
  const DR = 418300;
  const CR = 409300;
  same(DR - CR, 9000, 's3_diff_find');
  QQ('s3_diff_find', short({
    t: 1, d: 4, c: 'analysis', marks: 3,
    stem: `The trial balance of Pali Pulses, an imagined firm, shows a debit total of ${rs(DR)} and a credit total of ${rs(CR)}. State three different mistakes, each by itself accounting for the whole difference.`,
    model: `The difference is ${rs(DR - CR)}, with the debit side higher.\n\n1. A credit entry of ${rs(9000)} was not posted to any account.\n\n2. An item of ${rs(4500)} was entered in the debit column instead of the credit column, so the difference is twice ${rs(4500)}.\n\n3. A credit balance of ${rs(9000)} was left out of the list of balances.`,
    sol: 'Match the size and side of the difference with a missing credit, an item on the wrong side and an omitted balance.',
    scheme: [['Missing credit posting of ₹9,000', 1], ['Item of ₹4,500 on the wrong side', 1], ['Credit balance of ₹9,000 omitted from the list', 1]],
  }));
}
QQ('s3_adv_lim', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'State two advantages and one limitation of a trial balance.',
  model: '**Advantages:** (1) It gives a quick check on the arithmetical accuracy of posting. (2) It collects all the ledger balances in a single statement for the final accounts.\n\n**Limitation:** Equal totals are not proof that the books are error free, because omission, principle, commission and compensating errors are not disclosed.',
  sol: 'One mark for each advantage and one for the limitation.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['A limitation, naming the errors not disclosed', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_theory', long({
  t: 1, d: 3, c: 'understanding', marks: 5,
  stem: 'Explain the trial balance under these heads: (a) meaning [1]; (b) three objectives [1]; (c) two advantages [1]; (d) two limitations, naming the errors it does not disclose [2].',
  model: '**(a) Meaning.** A trial balance is a statement of the debit and credit balances of all ledger accounts on a particular date.\n\n**(b) Objectives.** (1) To test arithmetical accuracy. (2) To provide a summary of the ledger. (3) To provide the base for the final accounts.\n\n**(c) Advantages.** (1) A quick check on posting. (2) A single statement makes the final accounts easier to prepare.\n\n**(d) Limitations.** (1) Agreement is not proof of accuracy. (2) It does not disclose errors of omission, principle, commission and compensating errors, and it tests only the ledger.',
  sol: 'One mark for each of (a), (b) and (c); two for (d).',
  scheme: [['(a) Meaning', 1], ['(b) Three objectives', 1], ['(c) Two advantages', 1], ['(d) Limitation: agreement is not proof', 1], ['(d) Errors not disclosed named', 1]],
}));
{
  // Yercaud Coffee Traders: five errors, each simulated against the correct books.
  const B = {
    cap: { dr: [['Cash', 250000]], cr: [['Capital', 250000]], note: 'capital' },
    pur: { dr: [['Purchases', 140000]], cr: [['Hosur Estates', 140000]], note: 'credit purchases' },
    sale: { dr: [['Mysore Cafe', 80000]], cr: [['Sales', 80000]], note: 'credit sales' },
    rec: { dr: [['Cash', 50000]], cr: [['Mysore Cafe', 50000]], note: 'receipt' },
    pay: { dr: [['Hosur Estates', 90000]], cr: [['Cash', 90000]], note: 'payment' },
    wages: { dr: [['Wages', 18000]], cr: [['Cash', 18000]], note: 'wages' },
    mach: { dr: [['Machinery', 60000]], cr: [['Cash', 60000]], note: 'machinery' },
    int: { dr: [['Cash', 6000]], cr: [['Interest received', 6000]], note: 'interest' },
    sale2: { dr: [['Mysore Cafe', 14000]], cr: [['Sales', 14000]], note: 'credit sale' },
  };
  const right = Object.values(B);
  const e1 = errorCase({ right, wrong: swap(B, { sale2: null }), agrees: true });
  const e2 = errorCase({ right, wrong: swap(B, { mach: { dr: [['Purchases', 60000]], cr: [['Cash', 60000]], note: 'x' } }), agrees: true });
  const e3 = errorCase({ right, wrong: swap(B, { pay: { dr: [['Mysore Cafe', 90000]], cr: [['Cash', 90000]], note: 'x' } }), agrees: true });
  const e4 = errorCase({ right, wrong: swap(B, { wages: { dr: [['Wages', 18000]], cr: [], note: 'x' } }), agrees: false });
  const e5 = errorCase({ right, wrong: swap(B, { int: { dr: [['Cash', 6000]], cr: [['Interest received', 9000]], note: 'x' } }), agrees: false });
  same(e4.gap, 18000, 'l5_errors e4 gap');
  same(e5.gap, -3000, 'l5_errors e5 gap');
  const tab = mdTable(['Error', 'Kind', 'Effect on the trial balance'], [
    ['(i) Credit sale of ₹14,000 not entered anywhere', 'Omission', 'Totals still agree: both the debit and the credit are missing'],
    ['(ii) Machinery of ₹60,000 debited to Purchases A/c', 'Principle', 'Totals still agree: the debit is of the right amount, in the wrong class of account'],
    ['(iii) Payment of ₹90,000 to Hosur Estates debited to Mysore Cafe', 'Commission', 'Totals still agree: the debit is of the right amount, in the wrong personal account'],
    ['(iv) Wages of ₹18,000 debited, but Cash not credited', 'One-sided posting', `Differs: debit side higher by ${rs(e4.gap)}`],
    ['(v) Interest received of ₹6,000 credited as ₹9,000', 'Wrong amount on one side', `Differs: credit side higher by ${rs(-e5.gap)}`],
  ]);
  QQ('l5_errors', long({
    t: 1, d: 4, c: 'analysis', marks: 5,
    stem: 'Yercaud Coffee Traders, an imagined firm, finds these errors in its books: (i) a credit sale of ₹14,000 to Mysore Cafe was not entered in any book; (ii) machinery bought for ₹60,000 in cash was debited to Purchases A/c; (iii) a payment of ₹90,000 to Hosur Estates was debited to the account of Mysore Cafe; (iv) wages of ₹18,000 were debited to Wages A/c but Cash was not credited; (v) interest received of ₹6,000 was credited to Interest Received A/c as ₹9,000, the debit to Cash being correct. For each error, name its kind and state its effect on the trial balance totals, with the difference where the totals disagree. [1 each]',
    model: `${tab}\n\nErrors (i) to (iii) cannot be seen in the trial balance, while (iv) and (v) disturb it.`,
    sol: 'Test each slip on the two totals: a missing pair or a wrong account keeps them equal; one side altered makes them differ by that alteration.',
    scheme: [['(i) Omission; totals agree', 1], ['(ii) Principle; totals agree', 1], ['(iii) Commission; totals agree', 1], ['(iv) One-sided posting; debit higher by ₹18,000', 1], ['(v) Credit too high; credit higher by ₹3,000', 1]],
  }));
  check(sum([e1, e2, e3].map((e) => e.gap)) === 0, 'agreeing cases');
  void bal;
}
void fromBalances;
void numQ;
void lst;
void post;
