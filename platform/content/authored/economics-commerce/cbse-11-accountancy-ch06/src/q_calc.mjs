// Numerical, short-answer and long-answer items for ch06. Every derived amount is computed with extra.mjs and asserted.
import { short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, ledger, correct, analyse, rectify, scenario, profitStatement, trialBalance, trialFromSigned, reg } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

reg('rev', 'Interest received', 'Rent received');
const sd = (side, x) => (side === 'dr' ? x : -x);
/** "Wages A/c Dr. ₹4,000 To Salaries A/c" for one entry. */
const line = (e) => `${e.dr.map(([a, x]) => `${a} Dr. ${rs(x)}`).join('; ')} To ${e.cr.map(([a, x]) => `${a}${e.cr.length > 1 ? ` ${rs(x)}` : ''}`).join(' and ')}`;
/** First letter lower case, for a sentence run into a list item. */
const lcf = (t) => t[0].toLowerCase() + t.slice(1);
const list = (pairs) => pairs.map(([a, x]) => `${a} ${rs(x)}`).join(', ');
/** A fixed shuffle of a list (indices), so stems do not list debits first and credits second. */
const shuffled = (xs, order) => order.map((i) => xs[i]);

// ================================================================ numericals (t01, t02)
{
  const known = [['Cash', 15000], ['Debtors', 45000], ['Opening stock', 60000], ['Furniture', 30000], ['Purchases', 210000], ['Rent', 18000], ['Creditors', 40000], ['Sales', 260000]];
  const all = correct([...known, ['Capital', 78000]]);
  const cap = same(sum(known.filter(([a]) => !['Creditors', 'Sales'].includes(a)).map(([, x]) => x)) - 40000 - 260000, 78000, 'n_tb_missing capital');
  same(all.tb.dr, 378000, 'n_tb_missing total');
  QQ('n_tb_missing', numQ({
    t: 1, d: 2, c: 'application', value: cap, unit: '₹',
    stem: `Leela Crafts, an imagined firm, prepared its trial balance on 31 March 2028 with these balances: ${list(known)}. The only account missing from the list is Capital A/c, and the trial balance agrees once it is included. Find the balance of Capital A/c (in ₹).`,
    sol: `The debit balances total ${inr(sum(known.slice(0, 6).map(([, x]) => x)))}. The listed credit balances (creditors and sales) total ${inr(40000 + 260000)}. For the columns to agree, Capital A/c must be a credit balance of ${inr(all.tb.dr)} − ${inr(300000)} = ${rs(cap)}.`,
  }));
}
{
  const bal = [['Cash', 22000], ['Capital', 150000], ['Debtors', 38000], ['Creditors', 26000], ['Purchases', 120000], ['Sales', 164000], ['Rent', 9000], ['Drawings', 15000], ['Furniture', 136000]];
  const tb = correct(bal).tb;
  same(tb.dr, 340000, 'n_tb_total');
  QQ('n_tb_total', numQ({
    t: 1, d: 2, c: 'application', value: tb.dr, unit: '₹',
    stem: `Ishan Brothers, an imagined firm, has these ledger balances on 31 March 2028: ${list(bal)}. Find the total of the debit column of its trial balance (in ₹).`,
    sol: `Debit balances: cash, debtors, purchases, rent, drawings and furniture, which total ${inr(22000)} + ${inr(38000)} + ${inr(120000)} + ${inr(9000)} + ${inr(15000)} + ${inr(136000)} = ${rs(tb.dr)}. Capital, creditors and sales are credit balances, and they total the same ${rs(tb.cr)}.`,
  }));
}
{
  const dr = [['Cash', 45000], ['Debtors', 112000], ['Purchases', 64000], ['Drawings', 28500]];
  const cr = [['Capital', 135000], ['Sales', 78000], ['Creditors', 31000]];
  const diff = same(sum(dr.map(([, x]) => x)) - sum(cr.map(([, x]) => x)), 5500, 'n_tb_diff');
  QQ('n_tb_diff', numQ({
    t: 1, d: 3, c: 'application', value: diff, unit: '₹',
    stem: `The ledger balances of Dev Pharma, an imagined firm, are debit: ${list(dr)}; credit: ${list(cr)}. The accountant lists them in a trial balance and places the difference in a Suspense A/c so that the columns agree. Find the amount of the Suspense A/c (in ₹).`,
    sol: `Debit column = ${inr(sum(dr.map(([, x]) => x)))}; credit column = ${inr(sum(cr.map(([, x]) => x)))}. The debit column is larger by ${rs(diff)}, so the Suspense A/c is credited with ${rs(diff)}.`,
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', should: [['Sales', 'cr', 60000], ['Kiran Rao', 'dr', 60000]], did: [['Sales', 'cr', 56500], ['Kiran Rao', 'dr', 60000]], tb: 'one', profit: -3500, note: 'x' },
    { text: 'x', type: 'commission', should: [['Rent', 'dr', 2700], ['Cash', 'cr', 2700]], did: [['Rent', 'dr', 4500], ['Cash', 'cr', 2700]], tb: 'one', profit: -1800, note: 'x' },
  ]);
  const S = same(Math.abs(E[0].net + E[1].net), 5300, 'n_susp_chk');
  QQ('n_susp_chk', numQ({
    t: 2, d: 2, c: 'application', value: S, unit: '₹',
    stem: `Sai Traders, an imagined firm, finds that its trial balance does not agree. Two errors are traced: the sales book was undercast by ${rs(3500)}, and rent of ${rs(2700)} paid in cash was posted to Rent A/c as ${rs(4500)}. Both errors affect only one side. What amount was carried to the Suspense A/c to agree the trial balance (in ₹)?`,
    sol: `Undercast Sales leaves the credit side short by ${inr(3500)}. The excess rent debit adds ${inr(4500 - 2700)} to the debit side. Net, the debit side is higher by ${inr(3500)} + ${inr(1800)} = ${rs(S)}, so the Suspense A/c was credited with ${rs(S)}.`,
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', should: [['Sales', 'cr', 50000], ['Kiran Rao', 'dr', 50000]], did: [['Sales', 'cr', 54500], ['Kiran Rao', 'dr', 50000]], tb: 'one', profit: 4500, note: 'x' },
    { text: 'x', type: 'commission', should: [['Rent', 'dr', 3200], ['Cash', 'cr', 3200]], did: [['Rent', 'dr', 5000], ['Cash', 'cr', 3200]], tb: 'one', profit: -1800, note: 'x' },
    { text: 'x', type: 'commission', should: [['Discount received', 'cr', 1200], ['Bose Fabrics', 'dr', 1200]], did: [['Discount received', 'cr', 3500], ['Bose Fabrics', 'dr', 1200]], tb: 'one', profit: 2300, note: 'x' },
  ]);
  const open = -sum(E.map((e) => e.net));
  same(open, 5000, 'n_susp_balance opening debit');
  const part = ledger({ name: 'Suspense A/c', dr: [['To Difference in trial balance', open], ['To Rent A/c', E[1].net]], cr: [['By Sales A/c', -E[0].net]] });
  same(part.balance, 2300, 'n_susp_balance');
  same(rectify(E, { mode: 'after' }).susp.ledger.balance, 0, 'n_susp_balance closes after the third error');
  QQ('n_susp_balance', numQ({
    t: 2, d: 3, c: 'application', value: part.balance, unit: '₹',
    stem: `The trial balance of Sandeep Cycles, an imagined firm, agreed only after a Suspense A/c was opened with a debit balance of ${rs(open)}. Three errors were later traced: (i) the sales book overcast by ${rs(4500)}; (ii) rent of ${rs(3200)} posted to Rent A/c as ${rs(5000)}; (iii) discount received of ${rs(1200)} posted to Discount Received A/c as ${rs(3500)}. After errors (i) and (ii) alone are rectified, what debit balance is left in the Suspense A/c (in ₹)?`,
    sol: `${part.md}\n\nOpening debit ${inr(open)}; error (i) credits the account with ${inr(4500)}; error (ii) debits it with ${inr(1800)}. Balance = ${inr(open)} − ${inr(4500)} + ${inr(1800)} = ${rs(part.balance)} (debit), which is exactly what error (iii) will clear.`,
  }));
}
{
  const bal = [['Cash', 12000], ['Cash at bank', 64000], ['Rohit Sen', 38000], ['Opening stock', 55000], ['Furniture', 30000], ['Computer', 18000], ['Purchases', 240000], ['Wages', 22000], ['Rent', 15000], ['Drawings', 20000],
    ['Capital', 238000], ['Verma Traders', 58000], ['Sales', 208000], ['Commission received', 10000]];
  const S = scenario({
    balances: bal, mode: 'before',
    errors: [
      { text: 'x', type: 'principle', should: [['Computer', 'dr', 18000], ['Cash at bank', 'cr', 18000]], did: [['Purchases', 'dr', 18000], ['Cash at bank', 'cr', 18000]], tb: 'two', profit: -18000, note: 'x' },
      { text: 'x', type: 'omission', sub: 'complete', should: [['Rohit Sen', 'dr', 7000], ['Sales', 'cr', 7000]], did: [], tb: 'two', profit: -7000, note: 'x' },
      { text: 'x', type: 'commission', should: [['Rent', 'dr', 6500], ['Cash', 'cr', 6500]], did: [['Rent', 'dr', 5600], ['Cash', 'cr', 6500]], tb: 'one', profit: 900, note: 'x' },
      { text: 'x', type: 'commission', should: [['Sales', 'cr', 90000], ['Rohit Sen', 'dr', 90000]], did: [['Sales', 'cr', 92700], ['Rohit Sen', 'dr', 90000]], tb: 'one', profit: 2700, note: 'x' },
    ],
  });
  same(S.ok.dr, 514000, 'n_corrected_total');
  const side = (cond) => S.books.filter(([a, x]) => x && cond(x)).map(([a, x]) => [a, Math.abs(x)]);
  const bd = side((x) => x > 0);
  const bc = side((x) => x < 0);
  QQ('n_corrected_total', numQ({
    t: [1, 2], d: 4, c: 'application', value: S.ok.dr, unit: '₹',
    stem: `Chhaya Boutique, an imagined shop, has these ledger balances before its trial balance is prepared. Debit: ${list(bd)}. Credit: ${list(bc)}. The following errors are then found: (i) a computer bought for ${rs(18000)} by cheque was debited to Purchases A/c; (ii) a credit sale of ${rs(7000)} to Rohit Sen was omitted from all books; (iii) rent of ${rs(6500)} paid in cash was posted to Rent A/c as ${rs(5600)}; (iv) the sales book was overcast by ${rs(2700)}. Find the total of the debit column of the trial balance prepared after all four errors are rectified (in ₹).`,
    sol: `Debit total before rectification = ${inr(S.booksTb.dr)}. Error (i) moves ${inr(18000)} between two debit accounts and does not change the total. Error (ii) adds ${inr(7000)} to the debtor and ${inr(7000)} to Sales, so each column rises by ${inr(7000)}. Error (iii) adds ${inr(900)} to Rent A/c, a debit. Error (iv) lowers Sales, a credit, by ${inr(2700)}. Debit total = ${inr(S.booksTb.dr)} + ${inr(7000)} + ${inr(900)} = ${rs(S.ok.dr)}; the credit total, ${inr(S.booksTb.cr)} + ${inr(7000)} − ${inr(2700)}, is the same ${rs(S.corrected.cr)}.`,
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', should: [['Purchases', 'dr', 40000], ['Pillai Paper', 'cr', 40000]], did: [['Purchases', 'dr', 45000], ['Pillai Paper', 'cr', 40000]], tb: 'one', profit: -5000, note: 'x' },
    { text: 'x', type: 'omission', sub: 'complete', should: [['Lata Iyer', 'dr', 12000], ['Sales', 'cr', 12000]], did: [], tb: 'two', profit: -12000, note: 'x' },
    { text: 'x', type: 'principle', should: [['Computer', 'dr', 9000], ['Cash', 'cr', 9000]], did: [['Repairs', 'dr', 9000], ['Cash', 'cr', 9000]], tb: 'two', profit: -9000, note: 'x' },
    { text: 'x', type: 'principle', should: [['Repairs', 'dr', 4000], ['Cash', 'cr', 4000]], did: [['Building', 'dr', 4000], ['Cash', 'cr', 4000]], tb: 'two', profit: 4000, note: 'x' },
  ]);
  const P = profitStatement(E, 85000);
  same(P.corrected, 107000, 'n_profit_corr');
  QQ('n_profit_corr', numQ({
    t: 2, d: 3, c: 'application', value: P.corrected, unit: '₹',
    stem: `Maya Optical, an imagined shop, reported a net profit of ${rs(85000)} for the year ended 31 March 2028. Later these errors were found: (i) the purchases book was overcast by ${rs(5000)}; (ii) a credit sale of ${rs(12000)} to Lata Iyer was omitted from all books; (iii) a printer bought for ${rs(9000)} in cash was debited to Repairs A/c; (iv) repairs of ${rs(4000)} paid in cash were debited to Building A/c. Find the correct net profit (in ₹).`,
    sol: `${P.md}\n\nErrors (i), (ii) and (iii) understated the profit by ${inr(5000)}, ${inr(12000)} and ${inr(9000)}; error (iv) overstated it by ${inr(4000)}. Corrected profit = ${inr(85000)} + ${inr(26000)} − ${inr(4000)} = ${rs(P.corrected)}.`,
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', should: [['Sales', 'cr', 30000], ['Anand Pillai', 'dr', 30000]], did: [['Sales', 'cr', 38000], ['Anand Pillai', 'dr', 30000]], tb: 'one', profit: 8000, note: 'x' },
    { text: 'x', type: 'principle', should: [['Furniture', 'dr', 20000], ['Cash at bank', 'cr', 20000]], did: [['Purchases', 'dr', 20000], ['Cash at bank', 'cr', 20000]], tb: 'two', profit: -20000, note: 'x' },
    { text: 'x', type: 'commission', sub: 'wrong account', should: [['Wages', 'dr', 2500], ['Cash', 'cr', 2500]], did: [['Salaries', 'dr', 2500], ['Cash', 'cr', 2500]], tb: 'two', profit: 0, note: 'x' },
  ]);
  const under = same(-sum(E.map((e) => e.effect)), 12000, 'n_profit_effect');
  QQ('n_profit_effect', numQ({
    t: 2, d: 3, c: 'application', value: under, unit: '₹',
    stem: `The books of Jai Hardware, an imagined firm, contain three errors: (i) the sales book was overcast by ${rs(8000)}; (ii) furniture bought for ${rs(20000)} by cheque was debited to Purchases A/c; (iii) wages of ${rs(2500)} paid in cash were debited to Salaries A/c. By how much is the net profit shown by the books understated, taking all three errors together (in ₹)?`,
    sol: `Error (i) overstates profit by ${inr(8000)}. Error (ii) overcharges Purchases and understates profit by ${inr(20000)}. Error (iii) moves an expense between two expense accounts, so profit is unchanged. Net effect = ${inr(20000)} − ${inr(8000)} = ${rs(under)} understated.`,
  }));
}
{
  const book = 14700;
  const E = analyse([{ text: 'x', type: 'commission', should: [['Sales returns', 'dr', 2100], ['Manoj Pandey', 'cr', 2100]], did: [['Sales returns', 'dr', 2100], ['Manoj Pandey', 'cr', 1200]], tb: 'one', profit: 0, note: 'x' }]);
  const delta = E[0].delta.find(([a]) => a === 'Manoj Pandey')[1];
  const fixed = same(book - delta, 13800, 'n_debtor_corrected');
  QQ('n_debtor_corrected', numQ({
    t: 2, d: 3, c: 'application', value: fixed, unit: '₹',
    stem: `Falguni Textiles, an imagined firm, sold goods to Manoj Pandey on credit. He returned goods worth ${rs(2100)}, which were debited correctly to Sales Returns A/c but credited to his account as ${rs(1200)}. His account in the ledger shows a debit balance of ${rs(book)}. Find the correct balance of his account (in ₹).`,
    sol: `His account was credited ${inr(2100)} − ${inr(1200)} = ${inr(delta)} too little, so its debit balance is ${inr(delta)} too high. Correct balance = ${inr(book)} − ${inr(delta)} = ${rs(fixed)} (debit).`,
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'omission', sub: 'partial', should: [['Discount allowed', 'dr', 1200], ['Lata Iyer', 'cr', 1200]], did: [['Lata Iyer', 'cr', 1200]], tb: 'one', profit: 1200, note: `Being discount allowed not posted to Discount Allowed A/c` },
    { text: 'x', type: 'commission', should: [['Kamal Arora', 'dr', 6400], ['Sales', 'cr', 6400]], did: [['Kamal Arora', 'dr', 4600], ['Sales', 'cr', 6400]], tb: 'one', profit: 0, note: `Being sale debited to Kamal Arora short` },
    { text: 'x', type: 'commission', sub: 'wrong account', should: [['Postage', 'dr', 3000], ['Cash', 'cr', 3000]], did: [['Telephone', 'dr', 3000], ['Cash', 'cr', 3000]], tb: 'two', profit: 0, note: `Being postage debited to Telephone A/c` },
  ]);
  const R = rectify(E, { mode: 'after' });
  same(R.journal.total, 6000, 'n_susp_entries_total');
  QQ('n_susp_entries_total', numQ({
    t: 2, d: 3, c: 'application', value: R.journal.total, unit: '₹',
    stem: `After its trial balance was agreed with the help of a Suspense A/c, Tarun Traders, an imagined firm, traced three errors: (i) a discount allowed of ${rs(1200)} to Lata Iyer was credited to her account but not debited to Discount Allowed A/c; (ii) a credit sale of ${rs(6400)} to Kamal Arora was debited to his account as ${rs(4600)}, with Sales A/c credited correctly; (iii) postage of ${rs(3000)} paid in cash was debited to Telephone A/c. Find the total of the debit column of the journal entries that rectify the three errors (in ₹).`,
    sol: `${R.journal.md}\n\nDebits: ${inr(1200)} + ${inr(sum(E[1].delta.filter(([, x]) => x < 0).map(([, x]) => -x)))} + ${inr(3000)} = ${rs(R.journal.total)}. Entries (i) and (ii) carry the Suspense A/c as the other side; entry (iii) is a plain journal entry.`,
  }));
}
{
  const x = 1800;
  const dr = 456200;
  const cr = 459800;
  const half = same((cr - dr) / 2, x, 'n_wrong_column');
  QQ('n_wrong_column', numQ({
    t: 1, d: 4, c: 'analysis', value: half, unit: '₹',
    stem: `The trial balance of Raghav Mills, an imagined firm, shows a debit column total of ${rs(dr)} and a credit column total of ${rs(cr)}. The accountant discovers that a single debit balance was wrongly written in the credit column and nothing else is wrong. Find the amount of that balance (in ₹).`,
    sol: `A debit balance entered as a credit lowers the debit column by the balance and raises the credit column by the same amount, so the gap is twice the balance. Balance = (${inr(cr)} − ${inr(dr)}) ÷ 2 = ${inr(cr - dr)} ÷ 2 = ${rs(half)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_tb_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define a trial balance.',
  model: 'A **trial balance** is a statement that lists the debit balances and the credit balances of all ledger accounts on a given date. It is prepared to check the arithmetical accuracy of posting and balancing.',
  sol: 'The statement with the date, and its purpose.',
  scheme: [['A statement of debit and credit balances of ledger accounts on a date', 1], ['Purpose: arithmetical accuracy', 1]],
}));
QQ('s2_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two objectives of preparing a trial balance.',
  model: '1. **To check arithmetical accuracy:** equal columns show that posting and balancing are arithmetically sound.\n2. **To summarise the ledger:** it brings the balances of all accounts together, and supplies the figures for the financial statements.',
  sol: 'Any two objectives, each stated and explained briefly.',
  scheme: [['First objective with explanation', 1], ['Second objective with explanation', 1]],
}));
QQ('s2_limits', short({
  t: [1, 2], d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why an agreed trial balance does not prove that the books of Gauri Gifts, an imagined firm, are free from errors.',
  model: '1. Some errors, such as a complete omission, an error of principle or a posting to a wrong account of the same kind, put equal amounts on both sides, so the totals still agree.\n2. Compensating errors cancel each other, so the totals agree although the accounts are wrong.',
  sol: 'Errors that leave the totals unchanged, and compensating errors.',
  scheme: [['First reason with an example', 1], ['Second reason with an example', 1]],
}));
QQ('s2_methods', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the three methods of preparing a trial balance. Which of them lists only the closing balances?',
  model: 'The three methods are the **balances method**, the **totals method** and the **totals and balances method**. The balances method lists only the closing balance of each ledger account.',
  sol: 'Three methods named, then the one that lists closing balances.',
  scheme: [['Three methods named', 1], ['Balances method identified', 1]],
}));
QQ('s2_comm_omis', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between an error of commission and an error of omission, with one example of each.',
  model: '1. **Commission:** a transaction is recorded but posted wrongly, for example ₹3,000 received from one debtor credited to another debtor.\n2. **Omission:** a transaction, or one side of it, is not recorded, for example a credit sale left out of all books.',
  sol: 'The difference with one example for each.',
  scheme: [['Commission with an example', 1], ['Omission with an example', 1]],
}));
QQ('s2_principle', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is an error of principle? Give one example from the books of Bhavna Bakery, an imagined firm.',
  model: 'An **error of principle** is a wrong treatment of an item as capital or revenue, against accounting principles, although the entries balance. For example, Bhavna Bakery debits ₹20,000 spent on a new oven to Repairs A/c instead of Machinery A/c.',
  sol: 'Meaning and a suitable example.',
  scheme: [['Capital and revenue items wrongly treated', 1], ['Example from the firm', 1]],
}));
QQ('s2_comp', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are compensating errors? Give one example.',
  model: '**Compensating errors** are two or more errors whose effects on the debit and credit sides cancel each other, so the trial balance still agrees. For example, Sales A/c is overcast by ₹1,000 and Purchases A/c is overcast by ₹1,000.',
  sol: 'Errors that cancel, with an example.',
  scheme: [['Errors whose effects cancel each other', 1], ['Example with equal opposite errors', 1]],
}));
QQ('s2_susp_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a suspense account? When is it opened?',
  model: 'A **suspense account** is a temporary account that holds the difference between the two columns of a trial balance. It is opened when the trial balance has been prepared and does not agree, so that the columns agree until the errors are traced.',
  sol: 'A temporary account for the difference, opened after a disagreeing trial balance.',
  scheme: [['Temporary account for the difference', 1], ['Opened when the trial balance does not agree', 1]],
}));
QQ('s2_before_after', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How is a one-sided error rectified (a) before and (b) after the trial balance is prepared?',
  model: '(a) **Before:** the affected account is corrected by an explanatory entry on the proper side, without a journal entry.\n(b) **After:** a journal entry is passed in which the Suspense A/c, holding the difference, is one of the accounts.',
  sol: 'Direct correction in the account before; a journal entry through the suspense account after.',
  scheme: [['(a) Explanatory entry in the account', 1], ['(b) Journal entry through the Suspense A/c', 1]],
}));
QQ('s2_which_side', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'State the column of the trial balance, debit or credit, in which each balance of Pooja Gifts, an imagined shop, is placed: Drawings, Bank Loan, Commission Received and Carriage Inwards.',
  model: '**Debit column:** Drawings and Carriage Inwards, a withdrawal and an expense. **Credit column:** Bank Loan and Commission Received, a liability and an income.',
  sol: 'Withdrawals and expenses on the debit side; liabilities and incomes on the credit side.',
  scheme: [['Drawings and Carriage Inwards: debit', 1], ['Bank Loan and Commission Received: credit', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const E = analyse([
    { text: `Cash of ${rs(2800)} received from Nisha Verma was credited to the account of Jaya Bhatt.`, type: 'commission', sub: 'wrong account', label: 'Commission (wrong account)', should: [['Cash', 'dr', 2800], ['Nisha Verma', 'cr', 2800]], did: [['Cash', 'dr', 2800], ['Jaya Bhatt', 'cr', 2800]], tb: 'two', profit: 0, note: 'x' },
    { text: `A laptop bought for ${rs(14000)} in cash was debited to Purchases A/c.`, type: 'principle', label: 'Principle', should: [['Computer', 'dr', 14000], ['Cash', 'cr', 14000]], did: [['Purchases', 'dr', 14000], ['Cash', 'cr', 14000]], tb: 'two', profit: -14000, note: 'x' },
    { text: `The sales book was undercast by ${rs(5000)}.`, type: 'commission', sub: 'wrong totalling', label: 'Commission (wrong totalling)', should: [['Sales', 'cr', 70000], ['Kamal Arora', 'dr', 70000]], did: [['Sales', 'cr', 65000], ['Kamal Arora', 'dr', 70000]], tb: 'one', profit: -5000, note: 'x' },
  ]);
  const h = ['Error', 'Type', 'Trial balance'];
  const r = E.map((e) => [e.text, e.label, e.net ? 'Disagrees' : 'Agrees']);
  QQ('s3_classify', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Sheela Tailors, an imagined firm, finds these errors in its books: (i) ${lcf(E[0].text.replace(/.$/, ''))}; (ii) ${lcf(E[1].text.replace(/.$/, ''))}; (iii) ${lcf(E[2].text.replace(/.$/, ''))}. Name the type of each error and state whether it affects the agreement of the trial balance.`,
    model: `${mdTable(h, r)}\n\nErrors (i) and (ii) put equal amounts on both sides, so the trial balance agrees; error (iii) credits Sales ${rs(5000)} short on one side only, so the trial balance disagrees.`,
    sol: 'Classify each error by what went wrong, then check whether the debit and credit amounts stay equal.',
    scheme: [['Error (i): commission, trial balance agrees', 1], ['Error (ii): principle, trial balance agrees', 1], ['Error (iii): commission, trial balance disagrees', 1]],
  }));
}
{
  const E = [
    { text: 'x', type: 'omission', sub: 'complete', should: [['Harish Goyal', 'dr', 6500], ['Sales', 'cr', 6500]], did: [], tb: 'two', profit: -6500, note: `Being credit sale to Harish Goyal omitted, now recorded` },
    { text: 'x', type: 'commission', should: [['Rent', 'dr', 3200], ['Cash', 'cr', 3200]], did: [['Rent', 'dr', 2300], ['Cash', 'cr', 3200]], tb: 'one', profit: 900, note: `Being rent debited ${rs(900)} short, now corrected` },
    { text: 'x', type: 'commission', sub: 'wrong account', should: [['Wages', 'dr', 4000], ['Cash', 'cr', 4000]], did: [['Salaries', 'dr', 4000], ['Cash', 'cr', 4000]], tb: 'two', profit: 0, note: `Being wages debited to Salaries A/c, now corrected` },
  ];
  const A = analyse(E);
  const R = rectify(A, { mode: 'before' });
  same(R.entries.length, 2, 's3_before_entries entries');
  same(R.fixes.length, 1, 's3_before_entries fixes');
  QQ('s3_before_entries', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Before preparing its trial balance, Dinesh Sports, an imagined shop, finds these errors: (i) goods of ${rs(6500)} sold on credit to Harish Goyal were omitted from all books; (ii) rent of ${rs(3200)} paid in cash was posted to Rent A/c as ${rs(2300)}; (iii) wages of ${rs(4000)} paid in cash were debited to Salaries A/c. Show how each error is rectified.`,
    model: `**Journal entries (two-sided errors (i) and (iii))**\n\n${R.journal.md}\n\n**Explanatory correction (one-sided error (ii)):** write ${rs(900)} on the debit side of Rent A/c, as an explanatory entry for the short debit; no journal entry and no suspense account are needed because the trial balance has not yet been prepared.`,
    sol: 'Journal entries for the two-sided errors; an explanatory correction in the account for the one-sided error.',
    scheme: [['Entry for error (i)', 1], ['Explanatory correction in Rent A/c for error (ii)', 1], ['Entry for error (iii)', 1]],
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', sub: 'wrong totalling', should: [['Sales', 'cr', 40000], ['Gita Menon', 'dr', 40000]], did: [['Sales', 'cr', 37500], ['Gita Menon', 'dr', 40000]], tb: 'one', profit: -2500, note: `Being sales book undercast by ${rs(2500)}, now corrected` },
    { text: 'x', type: 'omission', sub: 'partial', should: [['Quadri Suppliers', 'dr', 4200], ['Cash', 'cr', 4200]], did: [['Cash', 'cr', 4200]], tb: 'one', profit: 0, note: `Being payment to Quadri Suppliers not posted to his account, now corrected` },
  ]);
  const R = rectify(E, { mode: 'after' });
  const diff = same(-(E[0].net + E[1].net), 1700, 's3_susp_entries difference');
  QQ('s3_susp_entries', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `The trial balance of Anjali Books, an imagined shop, disagreed, and the difference was placed in a Suspense A/c. Two errors were later found: (i) the sales book was undercast by ${rs(2500)}; (ii) a cash payment of ${rs(4200)} to Quadri Suppliers was credited to the cash book but not posted to his account. Find the difference in the trial balance and pass the rectifying entries.`,
    model: `The credit side was short by ${inr(2500)} on Sales and the debit side short by ${inr(4200)} on Quadri Suppliers, so the debit side was lower by ${inr(4200)} − ${inr(2500)} = ${rs(diff)}. The Suspense A/c was therefore debited with ${rs(diff)}.\n\n${R.journal.md}\n\nSuspense A/c: debit ${inr(diff)} + ${inr(2500)}; credit ${inr(4200)}. Both sides total ${inr(R.susp.ledger.total)}, and the account closes.`,
    sol: 'Find the net effect of the two one-sided errors, then correct each through the suspense account.',
    scheme: [[`Difference ${rs(diff)}, Suspense A/c debited`, 1], ['Entry for error (i) through the Suspense A/c', 1], ['Entry for error (ii) through the Suspense A/c', 1]],
  }));
}
{
  const E = analyse([{ text: 'x', type: 'commission', should: [['Rent', 'dr', 6300], ['Cash', 'cr', 6300]], did: [['Rent', 'dr', 3600], ['Cash', 'cr', 6300]], tb: 'one', profit: 2700, note: `Being rent debited ${rs(2700)} short, now corrected` }]);
  const R = rectify(E, { mode: 'after' });
  const diff = same(-E[0].net, 2700, 's3_diff_clues');
  check(diff % 9 === 0, 'transposition clue');
  QQ('s3_diff_clues', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `The credit column of the trial balance of Sapna Foods, an imagined firm, exceeds the debit column by ${rs(diff)}, a difference that divides exactly by nine. The cash book shows rent of ${rs(6300)} paid, but Rent A/c was debited with ${rs(3600)}. Treating this as the only error, (a) state where the Suspense A/c was shown, (b) pass the rectifying entry, and (c) state the effect of the error on net profit.`,
    model: `(a) The debit column is short by ${rs(diff)}, so the Suspense A/c was debited with ${rs(diff)} in the trial balance.\n\n(b) ${line(R.entries[0])} (${E[0].note.replace(/^Being /, 'being ')}).\n\n(c) Rent, an expense, was understated by ${rs(diff)}, so net profit was overstated by ${rs(E[0].effect)}.`,
    sol: 'The side with the lower total receives the suspense balance; the rent is then debited and the suspense account credited; understated rent raises profit.',
    scheme: [['Suspense A/c on the debit side with the amount', 1], ['Rectifying entry', 1], ['Profit overstated by the amount', 1]],
  }));
}
{
  const E = analyse([
    { text: 'x', type: 'commission', should: [['Purchases', 'dr', 60000], ['Pillai Paper', 'cr', 60000]], did: [['Purchases', 'dr', 61800], ['Pillai Paper', 'cr', 60000]], tb: 'one', profit: -1800, note: 'x' },
    { text: 'x', type: 'principle', should: [['Machinery', 'dr', 2000], ['Cash', 'cr', 2000]], did: [['Carriage inwards', 'dr', 2000], ['Cash', 'cr', 2000]], tb: 'two', profit: -2000, note: 'x' },
    { text: 'x', type: 'commission', sub: 'wrong account', should: [['Cash at bank', 'dr', 3000], ['Interest received', 'cr', 3000]], did: [['Cash at bank', 'dr', 3000], ['Commission received', 'cr', 3000]], tb: 'two', profit: 0, note: 'x' },
  ]);
  const w = (e) => (e.effect > 0 ? `overstated by ${rs(e.effect)}` : e.effect < 0 ? `understated by ${rs(-e.effect)}` : 'no effect');
  QQ('s3_profit_effect', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `State the effect on net profit of each of these errors in the books of Rudra Paints, an imagined firm: (i) the purchases book was overcast by ${rs(1800)}; (ii) carriage of ${rs(2000)} paid in cash to bring a new machine to the factory was debited to Carriage Inwards A/c; (iii) interest received of ${rs(3000)} by cheque was credited to Commission Received A/c.`,
    model: `(i) Purchases are overstated, so profit is ${w(E[0])}.\n\n(ii) Carriage on a machine is a capital cost; charging it to an expense account lowers profit, so profit is ${w(E[1])}.\n\n(iii) One income is understated and another overstated by the same amount, so there is ${w(E[2])}.`,
    sol: 'Check whether each wrong debit or credit moves an amount in or out of the profit and loss account.',
    scheme: [['Error (i) profit understated by the amount', 1], ['Error (ii) profit understated by the amount', 1], ['Error (iii) no effect on profit', 1]],
  }));
}
{
  const bal = [['Cash', 9000], ['Cash at bank', 41000], ['Debtors', 23000], ['Opening stock', 30000], ['Purchases', 70000], ['Wages', 6000], ['Capital', 90000], ['Creditors', 14000], ['Sales', 75000]];
  const { tb } = correct(bal);
  same(tb.dr, 179000, 's3_tb_prepare');
  const order = [6, 0, 8, 2, 7, 4, 1, 5, 3];
  QQ('s3_tb_prepare', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: `Prepare the trial balance of Chandan Traders, an imagined firm, as on 31 March 2028 from these ledger balances: ${list(shuffled(bal, order))}.`,
    model: `**Trial balance of Chandan Traders as on 31 March 2028**\n\n${tb.md}`,
    sol: 'Debit balances in the debit column (assets, expenses), credit balances in the credit column (capital, liabilities, revenue), and equal totals.',
    scheme: [['Heading with the date and two columns', 1], ['Every balance on the correct side', 1], [`Both totals ${rs(tb.dr)}`, 1]],
  }));
}
{
  const E = analyse([{ text: 'x', type: 'compensating', should: [], did: [['Purchases', 'dr', 4000], ['Sales', 'cr', 4000]], tb: 'two', profit: 0, note: `Being purchases and sales overcast by ${rs(4000)} each, now corrected` }]);
  const R = rectify(E, { mode: 'after' });
  same(E[0].effect, 0, 's3_comp profit effect');
  QQ('s3_comp', short({
    t: 2, d: 4, c: 'analysis', marks: 3,
    stem: `The trial balance of Tarun Textiles, an imagined firm, agrees, yet an audit finds that Purchases A/c and Sales A/c are each overcast by ${rs(4000)}. Explain (a) why the trial balance agrees, (b) how the errors are rectified, and (c) the net effect of the two errors on net profit.`,
    model: `(a) Purchases is debited ${rs(4000)} too much and Sales credited ${rs(4000)} too much, so the debit and credit totals both rise by ${rs(4000)} and the columns still agree: the errors are compensating.\n\n(b) ${line(R.entries[0])}; this removes the excess in each account.\n\n(c) Overstated purchases lower profit by ${rs(4000)} and overstated sales raise it by ${rs(4000)}, so the net effect on profit is nil.`,
    sol: 'Equal opposite errors cancel in the trial balance and in profit, and one journal entry corrects both.',
    scheme: [['Compensating errors: both totals rise equally', 1], ['Rectifying entry', 1], ['Net effect on profit is nil, with the two reasons', 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const bal = [['Cash in hand', 14000], ['Cash at bank', 76000], ['Debtors', 58000], ['Opening stock', 52000], ['Furniture', 36000], ['Plant and machinery', 120000], ['Purchases', 270000], ['Carriage inwards', 6000], ['Wages', 28000], ['Rent', 18000], ['Drawings', 20000],
    ['Capital', 280000], ['Creditors', 64000], ['Sales', 340000], ['Discount received', 4000], ['Bank loan', 10000]];
  const { tb } = correct(bal);
  same(tb.dr, 698000, 'l5_tb_prepare');
  const order = [11, 2, 14, 5, 9, 0, 12, 7, 3, 15, 6, 1, 10, 4, 13, 8];
  QQ('l5_tb_prepare', long({
    t: 1, d: 3, c: 'application', marks: 5,
    stem: `Prepare the trial balance of Mohini Boutique, an imagined firm, as on 31 March 2028 from these ledger balances: ${list(shuffled(bal, order))}.`,
    model: `**Trial balance of Mohini Boutique as on 31 March 2028**\n\n${tb.md}\n\nThe debit balances are assets, expenses and drawings; the credit balances are capital, liabilities and income. Both columns total ${rs(tb.dr)}, so the trial balance agrees.`,
    sol: 'Sort each balance by its nature, place it in the proper column, total both columns and compare.',
    scheme: [['Heading with the date and the columns', 1], ['Assets and stock on the debit side', 1], ['Expenses and drawings on the debit side', 1], ['Capital, liabilities and incomes on the credit side', 1], [`Both totals ${rs(tb.dr)} agree`, 1]],
  }));
}
{
  const E = analyse([
    { text: `A credit purchase of ${rs(8400)} from Tandon Mills was omitted from all books.`, type: 'omission', sub: 'complete', label: 'Complete omission', should: [['Purchases', 'dr', 8400], ['Tandon Mills', 'cr', 8400]], did: [], tb: 'two', profit: 8400, note: `Being credit purchase from Tandon Mills omitted, now recorded` },
    { text: `An almirah bought for ${rs(22000)} by cheque was debited to Purchases A/c.`, type: 'principle', label: 'Principle', should: [['Furniture', 'dr', 22000], ['Cash at bank', 'cr', 22000]], did: [['Purchases', 'dr', 22000], ['Cash at bank', 'cr', 22000]], tb: 'two', profit: -22000, note: `Being almirah wrongly debited to Purchases A/c, now corrected` },
    { text: `A cash sale of ${rs(5400)} was posted to Sales A/c as ${rs(4500)}.`, type: 'commission', sub: 'wrong amount', label: 'Commission', should: [['Cash', 'dr', 5400], ['Sales', 'cr', 5400]], did: [['Cash', 'dr', 5400], ['Sales', 'cr', 4500]], tb: 'one', profit: -900, note: `Being sales credited ${rs(900)} short, now corrected` },
    { text: `Carriage of ${rs(6700)} paid in cash was posted to Carriage Inwards A/c as ${rs(8400)}.`, type: 'commission', sub: 'wrong amount', label: 'Commission', should: [['Carriage inwards', 'dr', 6700], ['Cash', 'cr', 6700]], did: [['Carriage inwards', 'dr', 8400], ['Cash', 'cr', 6700]], tb: 'one', profit: -1700, note: `Being carriage debited ${rs(1700)} in excess, now corrected` },
  ]);
  const R = rectify(E, { mode: 'before' });
  const h = ['Error', 'Sides affected', 'Rectification'];
  const r = [
    ['(i) Credit purchase omitted', 'Two-sided', 'Journal entry'],
    ['(ii) Almirah debited to Purchases', 'Two-sided', 'Journal entry'],
    ['(iii) Sale posted short', 'One-sided', 'Explanatory correction'],
    ['(iv) Carriage posted in excess', 'One-sided', 'Explanatory correction'],
  ];
  QQ('l5_before', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `Before it prepares its trial balance, Gagan Hardware, an imagined firm, finds these errors: (i) ${lcf(E[0].text.replace(/.$/, ''))}; (ii) ${lcf(E[1].text.replace(/.$/, ''))}; (iii) ${lcf(E[2].text.replace(/.$/, ''))}; (iv) ${lcf(E[3].text.replace(/.$/, ''))}. Classify each error as one-sided or two-sided and show how each is rectified.`,
    model: `${mdTable(h, r)}\n\n**Journal entries**\n\n${R.journal.md}\n\n**Explanatory corrections in the accounts**\n\n${R.fixTable.md}\n\nBecause the trial balance has not yet been prepared, no suspense account is needed.`,
    sol: 'Two-sided errors are corrected by a journal entry; one-sided errors by an explanatory entry in the account concerned.',
    scheme: [['Classification of all four errors', 1], ['Journal entry for error (i)', 1], ['Journal entry for error (ii)', 1], ['Correction in Sales A/c for error (iii)', 1], ['Correction in Carriage Inwards A/c for error (iv)', 1]],
  }));
}
{
  const bal = [['Cash', 16000], ['Cash at bank', 84000], ['Sonal Dutt', 36000], ['Opening stock', 48000], ['Furniture', 40000], ['Purchases', 210000], ['Wages', 30000], ['Salaries', 44000], ['Drawings', 18000],
    ['Capital', 270000], ['Bose Fabrics', 52000], ['Sales', 192000], ['Commission received', 12000]];
  const S = scenario({
    balances: bal, mode: 'after',
    errors: [
      { text: `The purchases book total of ${rs(38000)} was carried to Purchases A/c as ${rs(33800)}.`, type: 'commission', sub: 'wrong carrying forward', should: [['Purchases', 'dr', 38000], ['Bose Fabrics', 'cr', 38000]], did: [['Purchases', 'dr', 33800], ['Bose Fabrics', 'cr', 38000]], tb: 'one', profit: 4200, note: `Being purchases debited ${rs(4200)} short, now corrected` },
      { text: `Commission of ${rs(3000)} received in cash was debited to Cash A/c but not credited to Commission Received A/c.`, type: 'omission', sub: 'partial', should: [['Cash', 'dr', 3000], ['Commission received', 'cr', 3000]], did: [['Cash', 'dr', 3000]], tb: 'one', profit: -3000, note: `Being commission not credited to Commission Received A/c, now corrected` },
      { text: `Wages of ${rs(7000)} paid in cash were debited to Salaries A/c.`, type: 'commission', sub: 'wrong account', should: [['Wages', 'dr', 7000], ['Cash', 'cr', 7000]], did: [['Salaries', 'dr', 7000], ['Cash', 'cr', 7000]], tb: 'two', profit: 0, note: `Being wages debited to Salaries A/c, now corrected` },
      { text: `A credit sale of ${rs(6500)} to Sonal Dutt was omitted from all books.`, type: 'omission', sub: 'complete', should: [['Sonal Dutt', 'dr', 6500], ['Sales', 'cr', 6500]], did: [], tb: 'two', profit: -6500, note: `Being credit sale to Sonal Dutt omitted, now recorded` },
      { text: `A cheque payment of ${rs(12000)} to Bose Fabrics was debited to his account as ${rs(10200)}.`, type: 'commission', sub: 'wrong amount', should: [['Bose Fabrics', 'dr', 12000], ['Cash at bank', 'cr', 12000]], did: [['Bose Fabrics', 'dr', 10200], ['Cash at bank', 'cr', 12000]], tb: 'one', profit: 0, note: `Being payment debited to Bose Fabrics ${rs(1800)} short, now corrected` },
    ],
  });
  const L = S.R.susp.ledger;
  same(S.net, -3000, 'l5_after difference');
  QQ('l5_after', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `The trial balance of Nandini Traders, an imagined firm, shows a debit total of ${rs(S.booksTb.dr)} and a credit total of ${rs(S.booksTb.cr)}. The accountant opens a Suspense A/c for the difference. These errors are then found: (i) ${lcf(S.A[0].text.replace(/.$/, ''))}; (ii) ${lcf(S.A[1].text.replace(/.$/, ''))}; (iii) ${lcf(S.A[2].text.replace(/.$/, ''))}; (iv) ${lcf(S.A[3].text.replace(/.$/, ''))}; (v) ${lcf(S.A[4].text.replace(/.$/, ''))}. Pass the rectifying journal entries and prepare the Suspense A/c.`,
    model: `The credit column is larger by ${inr(S.booksTb.cr)} − ${inr(S.booksTb.dr)} = ${rs(-S.net)}, so the Suspense A/c is debited with ${rs(-S.net)}.\n\n**Journal**\n\n${S.R.journal.md}\n\n**Suspense A/c**\n\n${L.md}\n\nThe account closes: both sides total ${rs(L.total)}. Entries (iii) and (iv) are two-sided and do not touch the Suspense A/c.`,
    sol: 'Find the difference, correct each one-sided error through the suspense account and each two-sided error directly, then show that the account closes.',
    scheme: [[`Difference ${rs(-S.net)} and the Suspense A/c opened on the debit side`, 1], ['Entries (i) and (ii) through the Suspense A/c', 1], ['Entry (v) through the Suspense A/c', 1], ['Entries (iii) and (iv) without the Suspense A/c', 1], ['Suspense A/c prepared and closing with nil', 1]],
  }));
}
{
  const E = analyse([
    { text: `The sales book was overcast by ${rs(6000)}.`, type: 'commission', sub: 'wrong totalling', short: 'sales book overcast', should: [['Sales', 'cr', 90000], ['Imran Shaikh', 'dr', 90000]], did: [['Sales', 'cr', 96000], ['Imran Shaikh', 'dr', 90000]], tb: 'one', profit: 6000, note: 'x' },
    { text: `The purchases book was overcast by ${rs(2500)}.`, type: 'commission', sub: 'wrong totalling', short: 'purchases book overcast', should: [['Purchases', 'dr', 70000], ['Tandon Mills', 'cr', 70000]], did: [['Purchases', 'dr', 72500], ['Tandon Mills', 'cr', 70000]], tb: 'one', profit: -2500, note: 'x' },
    { text: `A display rack bought for ${rs(18000)} by cheque was debited to Purchases A/c.`, type: 'principle', short: 'rack in purchases', should: [['Furniture', 'dr', 18000], ['Cash at bank', 'cr', 18000]], did: [['Purchases', 'dr', 18000], ['Cash at bank', 'cr', 18000]], tb: 'two', profit: -18000, note: 'x' },
    { text: `Repairs to the shop shutter of ${rs(4000)} paid in cash were debited to Building A/c.`, type: 'principle', short: 'repairs in building', should: [['Repairs', 'dr', 4000], ['Cash', 'cr', 4000]], did: [['Building', 'dr', 4000], ['Cash', 'cr', 4000]], tb: 'two', profit: 4000, note: 'x' },
    { text: `Interest received of ${rs(2000)} by cheque was credited to Rent Received A/c.`, type: 'commission', sub: 'wrong account', short: 'interest in rent received', should: [['Cash at bank', 'dr', 2000], ['Interest received', 'cr', 2000]], did: [['Cash at bank', 'dr', 2000], ['Rent received', 'cr', 2000]], tb: 'two', profit: 0, note: 'x' },
  ]);
  const P = profitStatement(E, 145000);
  same(P.corrected, 155500, 'l5_profit');
  QQ('l5_profit', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `Omkar Electricals, an imagined firm, reported a net profit of ${rs(145000)} for the year ended 31 March 2028. Afterwards these errors were found: (i) ${lcf(E[0].text.replace(/.$/, ''))}; (ii) ${lcf(E[1].text.replace(/.$/, ''))}; (iii) ${lcf(E[2].text.replace(/.$/, ''))}; (iv) ${lcf(E[3].text.replace(/.$/, ''))}; (v) ${lcf(E[4].text.replace(/.$/, ''))}. Prepare a statement showing the corrected net profit.`,
    model: `**Statement of corrected net profit**\n\n${P.md}\n\nError (v) moves an amount between two income accounts, so it does not change profit.`,
    sol: 'Decide for each error whether profit was overstated or understated, then adjust the reported profit.',
    scheme: [['Error (i): profit overstated, deducted', 1], ['Error (ii): profit understated, added', 1], ['Error (iii): profit understated, added', 1], ['Errors (iv) and (v): repairs deducted, no effect for (v)', 1], [`Corrected net profit ${rs(P.corrected)}`, 1]],
  }));
}
QQ('l5_types', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the four types of errors in accounting, giving one example of each from the books of an imagined firm.',
  model: '1. **Errors of commission:** a transaction is recorded but posted wrongly, in amount, side or account, or totalled, balanced or carried forward wrongly; for example ₹2,000 received from one debtor is credited to another.\n2. **Errors of omission:** a transaction is left out completely or only one side of it is posted; for example a credit sale is not entered in any book.\n3. **Errors of principle:** a capital item is treated as revenue, or the reverse; for example a machine is debited to Purchases A/c.\n4. **Compensating errors:** errors whose effects cancel; for example Sales and Purchases are both overcast by ₹1,000.',
  sol: 'Each type with its meaning and an example.',
  scheme: [['Errors of commission', 1], ['Errors of omission', 1], ['Errors of principle', 1], ['Compensating errors', 1], ['A suitable example for each type', 1]],
}));
QQ('l5_limits', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the statement: an agreed trial balance is conclusive proof of the accuracy of the books of an imagined firm. Give reasons.',
  model: 'The statement is **not correct**. An agreed trial balance proves only arithmetical accuracy: the debit balances equal the credit balances. It cannot reveal errors that put equal amounts on both sides, such as a complete omission of a transaction, an error of principle, a posting to a wrong account of the same kind, or a wrong amount written on both sides. Compensating errors also cancel. The books may therefore still be wrong, and profit and the balance sheet may be misstated. The trial balance is a useful first check, but it cannot replace a review of the accounts.',
  sol: 'Judge the statement, say what the trial balance proves, give the errors it cannot show and conclude.',
  scheme: [['Statement judged not correct', 1], ['What the trial balance proves', 1], ['Errors that leave it unaffected, two with reasons', 2], ['Conclusion on its value', 1]],
}));
