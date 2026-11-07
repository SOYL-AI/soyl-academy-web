// Objective items for ch06: multiple choice, assertion-reason, true-false, fill-blank, match, ordering.
// Every firm and person is imagined; every derived amount is computed and asserted.
import { mcq, ar, tf, fb, match, ord } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, analyse, rectify, ledger, reg, KB } from './figures.mjs';
import { QQ } from './qq.mjs';

reg('rev', 'Interest received');
/** One journal entry as a line: "Suspense A/c Dr. ₹3,000 To Purchases A/c". */
const line = (e) => `${e.dr.map(([a, x]) => `${a} Dr. ${rs(x)}`).join('; ')} To ${e.cr.map(([a]) => a).join(' and ')}`;
const entryOf = (err, mode = 'after') => rectify(analyse([err]), { mode }).entries[0];
const sd = (side, x) => (side === 'dr' ? x : -x);

// ================================================================ multiple choice: t01 (trial balance)
QQ('m_tb_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Rina Optics, an imagined shop in the imagined town of Ranipur, lists the balances of all its ledger accounts in two columns on 31 March 2028 to test the arithmetical accuracy of its posting. This list is called a',
  opts: ['trial balance', 'balance sheet', 'profit and loss account', 'bank reconciliation statement'],
  sol: 'A statement of the debit and credit balances of the ledger accounts on a date, drawn up to check arithmetical accuracy, is a trial balance. A balance sheet shows assets and liabilities, a profit and loss account shows income and expenses, and a bank reconciliation statement compares the cash book with the pass book.',
}));
QQ('m_tb_object', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Anwar Cycles, an imagined dealer, prepares a trial balance every year. Which of the following is NOT an objective of preparing it?',
  opts: ['To prove that the ledger accounts contain no errors of any kind', 'To check the arithmetical accuracy of the ledger accounts', 'To bring the balances of all ledger accounts together in one statement', 'To supply the figures from which the financial statements are prepared'],
  sol: 'An agreed trial balance cannot prove that no error exists, because some errors leave both columns equal, so this is not an objective. The other three are genuine objectives: checking accuracy, summarising the balances and supplying figures for the final accounts.',
}));
QQ('m_side_chk', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: `Kabir Traders, an imagined firm, has a Drawings A/c with a balance of ${rs(KB.signed.find(([a]) => a === 'Drawings')[1])} on 31 March 2028. In its trial balance this balance is shown on the`,
  opts: ['debit side', 'credit side', 'credit side, since drawings reduce capital', 'either side, as the proprietor chooses'],
  sol: 'Drawings are withdrawals by the proprietor and carry a debit balance, so they go in the debit column. The fact that drawings reduce capital does not move them to the credit column, and the side is fixed by the nature of the balance, not by choice.',
}));
QQ('m_side_prov', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Pooja Medicals, an imagined chemist, has a Provision for Doubtful Debts A/c with a balance of ₹4,000 and a Debtors A/c with a balance of ₹52,000. In the trial balance these two balances are placed in the',
  opts: ['credit column and the debit column respectively', 'debit column and the credit column respectively', 'debit column both', 'credit column both'],
  sol: 'A provision is a credit balance like a liability, while debtors are an asset with a debit balance. So the provision goes in the credit column and debtors in the debit column.',
}));
QQ('m_side_class', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Noor Bakery, an imagined bakery in the imagined town of Chandpur, lists these balances for its trial balance: Wages ₹9,000, Machinery ₹60,000, Drawings ₹7,000 and Interest Received ₹1,800. Which one is placed in the credit column?',
  opts: ['Interest Received', 'Wages', 'Machinery', 'Drawings'],
  sol: 'Interest received is an income, and incomes have credit balances. Wages are an expense, machinery an asset and drawings a withdrawal, and all three have debit balances.',
}));
QQ('m_tb_method', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Dhruv Hardware, an imagined shop, lists only the closing balance of each ledger account, putting debit balances in one column and credit balances in the other. The method used is the',
  opts: ['balances method', 'totals method', 'totals and balances method', 'journal method'],
  sol: 'Listing only the closing balances is the balances method. The totals method lists the total of each side of every account, and the totals and balances method shows both. There is no journal method of preparing a trial balance.',
}));
const D1 = { dr: 452000, cr: 447500 };
D1.diff = same(D1.dr - D1.cr, 4500, 'm_tb_diff difference');
QQ('m_tb_diff', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The debit column of the trial balance of Esha Stationers, an imagined shop, totals ${rs(D1.dr)} and the credit column totals ${rs(D1.cr)}. To make the totals agree for the time being, the accountant opens a Suspense A/c and shows it in the`,
  opts: [`credit column with ${rs(D1.diff)}`, `debit column with ${rs(D1.diff)}`, `credit column with ${rs(D1.diff / 2)}`, `debit column with ${rs(D1.diff / 2)}`],
  sol: `The debit column is larger by ${rs(D1.diff)}, so the credit column needs ${rs(D1.diff)} more. The Suspense A/c is therefore shown with a credit balance of ${rs(D1.diff)}. Showing it on the debit side would widen the gap, and half the difference has no basis.`,
}));
QQ('m_tb_limit', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'The trial balance of Meera Jewellers, an imagined firm, agrees. Which of these errors could still be present in its books?',
  opts: ['A credit sale of ₹12,000 left out of every book', 'The sales book overcast by ₹500', 'A payment of ₹1,800 debited to a creditor but not credited to the cash book', 'Purchases debited with ₹7,000 but the supplier credited with ₹700'],
  sol: 'An entry omitted from every book leaves debit and credit equal, so the trial balance still agrees. The other three each put an unequal amount on the two sides and would make the columns differ.',
}));
QQ('m_tb_use', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'After Zoya Mills, an imagined firm, balances its ledger accounts and prepares a trial balance, the trial balance supplies the figures needed for preparing the',
  opts: ['financial statements', 'source documents', 'vouchers', 'journal entries of the next year'],
  sol: 'The trial balance summarises the balances from which the trading and profit and loss account and the balance sheet are drawn up. Source documents and vouchers exist before the books are written, and journal entries come from transactions, not from the trial balance.',
}));

// ================================================================ multiple choice: t02 (errors and rectification)
QQ('m_err_commission', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Prakash Traders, an imagined firm, received ₹2,000 from its debtor Rohit Sen but credited the amount to the account of another debtor, Devika Nair. This is an error of',
  opts: ['commission', 'omission', 'principle', 'compensation'],
  sol: 'Posting to a wrong account is an error of commission. Nothing is left out, so it is not an omission, no capital or revenue treatment is misjudged, so it is not an error of principle, and no second error cancels it.',
}));
QQ('m_err_omission', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Sheetal Fabrics, an imagined firm, bought goods worth ₹5,000 on credit from Verma Traders and forgot to enter the purchase in any book. This is an error of',
  opts: ['complete omission', 'commission', 'principle', 'compensation'],
  sol: 'A transaction left out of the books altogether is an error of complete omission. Commission means a wrong posting, principle means a wrong capital or revenue treatment, and compensating errors cancel each other.',
}));
QQ('m_err_principle', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Tanvi Electronics, an imagined shop, bought an almirah for office use for ₹12,000 and debited the amount to Purchases A/c. This is an error of',
  opts: ['principle', 'commission', 'omission', 'compensation'],
  sol: 'An almirah is a capital item that should be debited to a furniture account; debiting it to Purchases treats it as a revenue item, which is an error of principle. The amount and the accounts are posted, so it is neither an omission nor a commission.',
}));
QQ('m_err_comp', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of these is a compensating error in the books of Umesh Traders, an imagined firm?',
  opts: ['Purchases A/c overcast by ₹1,500 and Sales A/c overcast by ₹1,500', 'Purchases A/c overcast by ₹1,500 only', 'A sale of ₹1,500 left out of every book', 'Furniture bought for ₹1,500 debited to Purchases A/c'],
  sol: 'Overcasting Purchases adds ₹1,500 to the debit side and overcasting Sales adds ₹1,500 to the credit side, so the two cancel. The second error stands alone, the third is a complete omission and the fourth is an error of principle.',
}));
QQ('m_class_chk', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Wages of ₹6,000 paid for installing a new machine of Zoya Mills, an imagined firm, were debited to Wages A/c. This is',
  opts: ['an error of principle, as a capital expense was treated as a revenue expense', 'an error of commission, as a wrong amount was posted', 'an error of complete omission, as no entry was made', 'a compensating error, as another error cancels it'],
  sol: 'Installation cost is part of the cost of the machine, a capital item, so debiting it to Wages treats it as a revenue expense. The right amount and the right side were used, nothing was left out and no second error offsets it.',
}));
QQ('m_two_sided', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of the following errors in the books of Vikram Cycles, an imagined firm, will NOT be disclosed by the trial balance?',
  opts: ['Goods of ₹3,000 sold on credit to Imran Shaikh were entered in the sales book but posted neither to Sales A/c nor to his account', 'Cash of ₹2,500 received was debited to the cash book as ₹2,500 and credited to the debtor as ₹2,050', 'The purchases book was overcast by ₹800', 'A payment of ₹1,800 to a creditor was debited to his account but not credited to the cash book'],
  sol: 'When both the debit and the credit posting are left out, the columns stay equal, so the trial balance agrees. In the other three, one side carries a different amount from the other, and the columns would differ.',
}));
const D2 = { dr: 618400, cr: 624000 };
D2.diff = same(D2.cr - D2.dr, 5600, 'm_susp_side difference');
QQ('m_susp_side', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The trial balance of Ganesh Stores, an imagined firm, shows a debit total of ${rs(D2.dr)} and a credit total of ${rs(D2.cr)}. The difference is carried to a Suspense A/c, which is shown on the`,
  opts: [`debit side with ${rs(D2.diff)}`, `credit side with ${rs(D2.diff)}`, `debit side with ${rs(D2.diff / 2)}`, 'neither side, because no account is opened until the errors are found'],
  sol: `The credit column is larger by ${rs(D2.diff)}, so the debit column needs ${rs(D2.diff)} more: the Suspense A/c carries a debit balance of ${rs(D2.diff)}. A credit entry would widen the gap, half the difference has no basis, and the account is opened precisely so that the trial balance agrees while the search goes on.`,
}));
QQ('m_susp_close', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'After every error of an imagined firm has been found and rectified, its Suspense A/c will show',
  opts: ['no balance, because the account closes', 'a debit balance equal to the original difference', 'a credit balance equal to the original difference', 'a balance equal to half the original difference'],
  sol: 'The suspense account was opened for the net effect of the one-sided errors, and rectifying each of them brings it back to nil. A balance left over means some error has not been found.',
}));
const ENT_PUR = entryOf({ text: 'x', type: 'commission', should: [['Purchases', 'dr', 40000], ['Pillai Paper', 'cr', 40000]], did: [['Purchases', 'dr', 43000], ['Pillai Paper', 'cr', 40000]], tb: 'one', profit: -3000, note: 'x' });
check(line(ENT_PUR) === 'Suspense A/c Dr. ₹3,000 To Purchases A/c', 'm_rect_entry entry');
QQ('m_rect_entry', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After its trial balance was prepared and the difference was placed in a Suspense A/c, Mala Gifts, an imagined shop, found that the purchases book had been overcast by ₹3,000 while the creditors were posted correctly. The rectifying entry is',
  opts: [line(ENT_PUR), 'Purchases A/c Dr. ₹3,000 To Suspense A/c', 'Suspense A/c Dr. ₹3,000 To Pillai Paper A/c', 'Pillai Paper A/c Dr. ₹3,000 To Purchases A/c'],
  sol: 'The Purchases A/c carries ₹3,000 too much on its debit side, so it is credited to remove the excess. Only one side was wrong, so the other side of the entry is the Suspense A/c: it was credited with the difference when the trial balance was made to agree, and it is debited now to clear that credit. Debiting Purchases would repeat the error, and the creditors were posted correctly.',
}));
const ENT_WAGES = entryOf({ text: 'x', type: 'principle', should: [['Wages', 'dr', 9500], ['Cash', 'cr', 9500]], did: [['Salaries', 'dr', 9500], ['Cash', 'cr', 9500]], tb: 'two', profit: 0, note: 'x' });
check(line(ENT_WAGES) === 'Wages A/c Dr. ₹9,500 To Salaries A/c', 'm_rect_two entry');
QQ('m_rect_two', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Nikhil Garments, an imagined firm, paid wages of ₹9,500 in cash and debited the amount to Salaries A/c. The rectifying entry is',
  opts: [line(ENT_WAGES), 'Salaries A/c Dr. ₹9,500 To Wages A/c', 'Wages A/c Dr. ₹9,500 To Cash A/c', 'Suspense A/c Dr. ₹9,500 To Salaries A/c'],
  sol: 'Wages should have been debited and Salaries were debited instead, so Wages is debited and Salaries is credited to cancel the wrong debit. The reverse entry would double the error, cash was credited correctly, and no suspense account is needed because the trial balance was not affected.',
}));
const PN = analyse([{ text: 'x', type: 'commission', should: [['Insurance', 'dr', 4000], ['Cash', 'cr', 4000]], did: [['Rent', 'dr', 4000], ['Cash', 'cr', 4000]], tb: 'two', profit: 0, note: 'x' }]);
same(PN[0].effect, 0, 'm_profit_none');
QQ('m_profit_none', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Hemant Dairy, an imagined firm, paid an insurance premium of ₹4,000 in cash and debited it to Rent A/c. The effect of this error on net profit is',
  opts: ['no effect, as both are expenses of the same amount', 'profit overstated by ₹4,000', 'profit understated by ₹4,000', 'profit overstated by ₹8,000'],
  sol: 'Insurance is understated and rent is overstated by the same ₹4,000, and both are charged against profit, so total expenses and net profit are unchanged. The profit would change only if the wrong account were a capital item.',
}));
const PU = analyse([{ text: 'x', type: 'principle', should: [['Vehicle', 'dr', 60000], ['Cash at bank', 'cr', 60000]], did: [['Repairs', 'dr', 60000], ['Cash at bank', 'cr', 60000]], tb: 'two', profit: -60000, note: 'x' }]);
QQ('m_profit_under', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Jyoti Stores, an imagined firm, bought a delivery van for ₹60,000 by cheque and debited the amount to Repairs A/c. The effect on net profit is that it is',
  opts: [`understated by ${rs(-PU[0].effect)}`, `overstated by ${rs(-PU[0].effect)}`, 'not affected', `understated by ${rs(-2 * PU[0].effect)}`],
  sol: 'The van is a capital item, but its cost was charged to Repairs, an expense, so expenses are too high by ₹60,000 and the profit is too low by the same amount. Overstatement would need the opposite mistake, and the amount is not doubled.',
}));
const PO = analyse([{ text: 'x', type: 'principle', should: [['Repairs', 'dr', 7500], ['Cash', 'cr', 7500]], did: [['Machinery', 'dr', 7500], ['Cash', 'cr', 7500]], tb: 'two', profit: 7500, note: 'x' }]);
QQ('m_profit_over', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Repairs of ₹7,500 on an old machine of Kunal Press, an imagined firm, were paid in cash and debited to Machinery A/c. The effect on net profit is that it is',
  opts: [`overstated by ${rs(PO[0].effect)}`, `understated by ${rs(PO[0].effect)}`, 'not affected', 'not affected, because the trial balance still agrees'],
  sol: 'Repairs are a revenue expense, and by debiting the machine the expense is left out of the profit and loss account, so profit is too high by ₹7,500. Agreement of the trial balance says nothing about profit.',
}));
const CF = [['Sales', 'cr', 3200], ['Sales', 'cr', -3200], ['Wages', 'dr', 3200], ['Discount allowed', 'dr', 3200]];
const cfNet = CF.map(([, s, x]) => sd('dr', 3200) + sd(s, x));
check(cfNet[0] === 0 && cfNet.slice(1).every((n) => n !== 0), 'm_comp_find: only the first option cancels the overcast purchases');
QQ('m_comp_find', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'An audit of Pranav Traders, an imagined firm, finds that its trial balance agrees although Purchases A/c is overcast by ₹3,200. Which second error, with this one, explains why the trial balance still agrees?',
  opts: ['Sales A/c overcast by ₹3,200', 'Sales A/c undercast by ₹3,200', 'Wages A/c overcast by ₹3,200', 'Discount Allowed A/c overcast by ₹3,200'],
  sol: 'Overcast Purchases adds ₹3,200 to the debit side, so another error must add ₹3,200 to the credit side or remove it from the debit side. Overcast Sales adds ₹3,200 to the credit side and cancels it. An undercast Sales account, and overcast Wages or Discount Allowed, would each widen the gap to ₹6,400.',
}));
const SL = ledger({ name: 'Suspense A/c', opening: { side: 'cr', amount: 5000 }, dr: [['To Rent A/c (error 1)', 3200]] });
same(SL.balance, -1800, 'm_susp_left balance');
QQ('m_susp_left', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'The trial balance of Rekha Mills, an imagined firm, had been agreed by opening a Suspense A/c with a credit balance of ₹5,000. When the first error was rectified, Suspense A/c was debited ₹3,200, leaving a credit balance of ₹1,800. This balance shows that',
  opts: ['other one-sided errors, with a net effect of ₹1,800 on the debit side, are still to be found', 'all errors have been found, and ₹1,800 is profit', 'the trial balance disagrees by ₹1,800', 'the first error was rectified wrongly'],
  sol: 'A credit balance in the suspense account means the debit side of the books is still ₹1,800 too high, and the account closes only when errors with that net effect have been found. The trial balance still agrees because the suspense balance is part of it, and nothing suggests the first rectification was wrong.',
}));

// ================================================================ assertion-reason
QQ('ar_tb_agree', ar({
  t: [1, 2], d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'If the trial balance of Dilip Optics, an imagined firm, agrees, its books are free from errors.',
  r: 'Errors of principle and compensating errors do not disturb the agreement of the trial balance.',
  sol: 'The assertion is false because some errors do not change either column. The reason is true, but it shows why the assertion fails rather than supporting it.',
}));
QQ('ar_susp', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A suspense account is opened only when a trial balance has already been prepared and does not agree.',
  r: 'Errors found before the trial balance is prepared are corrected directly in the accounts or by journal entries, so no difference arises.',
  sol: 'Both are true. A difference exists only after a trial balance has been drawn up, and errors corrected earlier leave nothing to carry to a suspense account, which explains the assertion.',
}));
QQ('ar_omission', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A credit sale left out of every book of Hari Traders, an imagined firm, does not stop its trial balance from agreeing.',
  r: 'When a transaction is left out completely, the debit and the credit are both missing, so the columns stay equal.',
  sol: 'Both are true. Both aspects are missing, so debits still equal credits, and this is exactly why the assertion holds.',
}));
QQ('ar_principle', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Debiting Purchases A/c with the cost of a machine bought for cash is an error of principle.',
  r: 'This error makes the debit column of the trial balance exceed the credit column.',
  sol: 'The assertion is true because a capital item is treated as a revenue item. The reason is false: the same amount is debited and credited, so the trial balance still agrees.',
}));
QQ('ar_profit', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Crediting commission received of ₹5,400 to Rent A/c does not change the net profit of Isha Studio, an imagined firm.',
  r: 'Commission received is an income and rent is an expense.',
  sol: 'Both are true, but the reason does not explain the assertion. Profit is unchanged because the income is understated and the expense is understated by equal amounts, and they cancel. The nature of the two accounts alone would not guarantee that.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_agree_chk', tf({
  t: [1, 2], d: 2, c: 'understanding', ans: false,
  stem: 'True or false: if the trial balance of an imagined firm agrees, the ledger accounts are certainly free from errors.',
  sol: 'An agreed trial balance shows only that debits equal credits in total; errors of omission, principle, wrong accounts and compensating errors can all remain.',
}));
QQ('tf_susp_perm', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false: after every error has been rectified, a suspense account remains in the books as a permanent account with its balance.',
  sol: 'The suspense account is temporary. It is closed when the errors are rectified, and a balance left would mean errors still lie undiscovered.',
}));
QQ('tf_two_journal', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false: a two-sided error found before the trial balance is prepared is rectified by a journal entry.',
  sol: 'A two-sided error affects two accounts, and the correction is made through a journal entry that debits and credits the accounts concerned.',
}));
QQ('fb_susp', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'When a trial balance does not agree, the difference is placed in a ___ account; when all errors are rectified its balance becomes ___.',
  acc: [['suspense', 'Suspense'], ['nil', 'zero', 'nil (zero)']],
  sol: 'The difference goes to the suspense account, and each rectification reduces it until the balance is nil.',
}));
QQ('fb_methods', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The three methods of preparing a trial balance are the ___ method, the totals method and the ___ method.',
  acc: [['balances', 'balance'], ['totals and balances', 'totals-and-balances', 'totals and balance']],
  sol: 'They are the balances method, the totals method and the totals and balances method.',
}));

// ================================================================ match, ordering
QQ('mt_errors', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each error of an imagined firm in column A with its type in column B.',
  pairs: [
    ['Goods bought on credit for ₹800 never entered in any book', 'Error of complete omission'],
    ['A paint bill for repainting the office debited to Building A/c', 'Error of principle'],
    ['A receipt from Rohit Sen credited to the account of Rohan Sethi', 'Error of commission'],
    ['Sales book and purchases book each overcast by ₹1,000', 'Compensating errors'],
  ],
  sol: 'A transaction left out of every book is a complete omission. Repainting is a revenue expense, so debiting it to the building account is an error of principle. A posting to the wrong person is a commission. Two overcastings of equal amount on opposite sides cancel and are compensating errors.',
}));
QQ('mt_sides', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each balance in column A of an imagined firm with its place in the trial balance in column B.',
  pairs: [
    ['Carriage Inwards A/c', 'Debit column: an expense'],
    ['Provision for Doubtful Debts A/c', 'Credit column: a provision'],
    ['Drawings A/c', 'Debit column: a withdrawal by the owner'],
    ['Bank Loan A/c', 'Credit column: a liability'],
  ],
  sol: 'Expenses and drawings carry debit balances, while provisions and liabilities carry credit balances.',
}));
QQ('ord_tb_steps', ord({
  t: 1, d: 2, c: 'understanding',
  stem: 'Arrange in the correct order the steps in preparing a trial balance by the balances method for an imagined firm.',
  items: ['Post all journal entries to the ledger accounts', 'Total both sides of each ledger account and find its balance', 'List each balance in the debit column or the credit column according to its side', 'Total the two columns and compare the totals'],
  sol: 'Entries are posted, each account is balanced, the balances are listed on their proper sides, and finally the two column totals are compared.',
}));
QQ('ord_rect_steps', ord({
  t: 2, d: 3, c: 'application',
  stem: 'The trial balance of Yusuf Traders, an imagined firm, does not agree. Arrange in order what its accountant does.',
  items: ['Total the two columns and find the difference', 'Place the difference in the Suspense A/c so that the totals agree', 'Search for the errors and rectify each through a journal entry', 'Check that the Suspense A/c closes with a nil balance'],
  sol: 'The difference is found first, then parked in the suspense account, the errors are traced and corrected one by one, and the final check is that the suspense account has closed.',
}));
