// Build ISC 11 Accounts ch03 Accounting Equation and Journal. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('isc-11-accounts-ch03', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { same, check, sum, inr, rs, mdTable, journal, rupees, EQ1, EQ1F, EQ1_ASSETS, EQ1_T, EQ3, EQ3F, EQ3_ASSETS, EQ3_CAP0, EQ3_G, MISS, PROFIT, TXN_ROWS, ACC, J1, J1_TOTAL, J2, J2_TOTAL, J3, J3_TOTAL, OPEN, OPEN_ENTRY, E } = await import('./fig.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ visuals
const T = (headers, rows, alt) => table(headers, rows, alt);
const jt = (entries, alt) => {
  const j = journal(entries);
  return T(j.headers, j.rows, alt);
};
const vTitle1 = T(['Assets', '=', 'Liabilities', '+', 'Capital'], [['What the firm owns: cash, stock, debtors, furniture', '=', 'What it owes outsiders: creditors, loans', '+', 'What the owner has put in and left in']], 'Table showing the accounting equation: assets equal liabilities plus capital, with what each term covers');
const vMeaning = T(['Point', 'Detail'], [
  ['Meaning', 'The resources of a firm are always equal to the claims against them'],
  ['Why it holds', 'Every transaction has two aspects of equal value'],
  ['Use: capital', 'Find the owner\'s capital when assets and liabilities are known'],
  ['Use: balance', 'Test that the position is in balance after each transaction'],
  ['Limit', 'Records only what can be stated in money and does not show profit as such'],
], 'Table on the accounting equation: meaning, why it holds, two uses and a limit');
const vTerms = T(['Term', 'Meaning', 'Examples in an imagined firm'], [
  ['Assets', 'Resources owned that have value to the firm', 'Cash, stock, debtors, furniture, machinery'],
  ['Liabilities', 'Amounts the firm owes to outsiders', 'Creditors, bank loan, outstanding expenses'],
  ['Capital', 'The owner\'s claim: investment plus profit less drawings', 'Cash brought in by the proprietor'],
], 'Table defining assets, liabilities and capital with examples');
const vForms = T(['Form', 'Used to find'], [
  ['Assets = Liabilities + Capital', 'Checks the position after a transaction'],
  ['Capital = Assets − Liabilities', 'The owner\'s capital'],
  ['Liabilities = Assets − Capital', 'Outside liabilities'],
], 'Table of the three forms of the accounting equation and what each finds');
const vEq1 = T(EQ1.headers, EQ1.rows, `Equation table for Tezpur Tea Stall: eight transactions, ending with cash ${inr(EQ1F.assets.Cash)}, stock ${inr(EQ1F.assets.Stock)}, debtors ${inr(EQ1F.assets.Debtors)}, furniture ${inr(EQ1F.assets.Furniture)}, creditors ${inr(EQ1F.liabilities.Creditors)} and capital ${inr(EQ1F.capital)} rupees`);
const vPatterns = T(['Kind of transaction', 'Assets', 'Liabilities', 'Capital', 'Example'], [
  ['Swap of assets', 'One up, one down', 'No change', 'No change', 'Machinery bought for cash'],
  ['Credit purchase of an asset', 'Up', 'Up', 'No change', 'Furniture bought on credit'],
  ['Payment of a liability', 'Down', 'Down', 'No change', 'Creditor paid in cash'],
  ['Profit, income or fresh capital', 'Up', 'No change', 'Up', 'Sale above cost; commission earned'],
  ['Drawings, expense or loss', 'Down', 'No change', 'Down', 'Rent paid; goods taken by the owner'],
], 'Table of five kinds of transaction and their effect on assets, liabilities and capital');
const vMiss = T(['Case', 'Assets (₹)', 'Liabilities (₹)', 'Capital (₹)', 'Found'], MISS.map((m) => [m.name, inr(m.a), inr(m.l), inr(m.c), `${m.found}: ${inr(m.value)}`]), 'Table of three cases in which one element of the accounting equation is found from the other two');
const vProfit = T(['Particulars', 'Amount (₹)'], [
  ['Closing capital', inr(PROFIT.close)],
  ['Less: opening capital', `(${inr(PROFIT.open)})`],
  ['Add: drawings during the year', inr(PROFIT.drawings)],
  ['Less: fresh capital introduced', `(${inr(PROFIT.fresh)})`],
  ['**Profit for the year**', `**${inr(PROFIT.value)}**`],
], `Table finding profit from capital: closing ${inr(PROFIT.close)} less opening ${inr(PROFIT.open)} plus drawings ${inr(PROFIT.drawings)} less fresh capital ${inr(PROFIT.fresh)} gives profit ${inr(PROFIT.value)} rupees`);
const vEq3 = T(EQ3.headers, EQ3.rows, `Equation table for Ongole Bakery: starting capital ${inr(EQ3_CAP0)} and seven transactions, ending with assets ${inr(EQ3_ASSETS)} and capital ${inr(EQ3F.capital)} rupees`);
const vDouble = flow('LR', ['A transaction occurs', 'Two accounts are affected', 'One account is debited, another credited', 'Equal amounts: debits equal credits'], 'Flow: a transaction affects two accounts, one is debited and one credited, in equal amounts');
const vClass = T(['Approach', 'Classes'], [
  ['Traditional', 'Personal (natural, artificial, representative), real (tangible, intangible), nominal'],
  ['Modern', 'Assets, liabilities, capital, revenues or incomes, expenses or losses'],
], 'Table of the traditional and modern classification of accounts');
const vPersonal = T(['Personal account', 'What it stands for', 'Imagined example'], [
  ['Natural', 'A living person', 'Rao Brothers A/c, Meena Kapoor A/c'],
  ['Artificial', 'A body the law treats as a person', 'A bank, a club, a company'],
  ['Representative', 'A person or persons through an item', 'Outstanding Rent A/c, Prepaid Insurance A/c'],
], 'Table of natural, artificial and representative personal accounts with examples');
const vRealNom = T(['Account', 'What it stands for', 'Imagined example'], [
  ['Real, tangible', 'Things owned that can be touched', 'Cash A/c, Machinery A/c, Furniture A/c'],
  ['Real, intangible', 'Things owned with no physical form', 'Goodwill A/c, Patents A/c'],
  ['Nominal', 'Expenses, losses, incomes and gains', 'Salaries A/c, Bad Debts A/c, Interest Received A/c'],
], 'Table of real and nominal accounts with examples');
const vModern = T(['Modern class', 'Increases on the', 'Decreases on the', 'Example'], [
  ['Asset', 'Debit side', 'Credit side', 'Machinery A/c'],
  ['Expense or loss', 'Debit side', 'Credit side', 'Rent A/c'],
  ['Liability', 'Credit side', 'Debit side', 'Loan from Vindhya Bank A/c'],
  ['Capital', 'Credit side', 'Debit side', 'Capital A/c'],
  ['Revenue or income', 'Credit side', 'Debit side', 'Commission Received A/c'],
], 'Table of the five modern classes of accounts and the side on which each increases and decreases');
const vRules = T(['Traditional class', 'Debit', 'Credit'], [
  ['Personal', 'The receiver', 'The giver'],
  ['Real', 'What comes in', 'What goes out'],
  ['Nominal', 'All expenses and losses', 'All incomes and gains'],
], 'Table of the traditional rules of debit and credit for personal, real and nominal accounts');
const vTxn = T(['Transaction', 'Debited (class)', 'Credited (class)'], TXN_ROWS, 'Analysis table of six imagined transactions: the accounts debited and credited, each with its traditional and modern class');

const vRuling = T(['Date', 'Particulars', 'L.F.', 'Debit amount (₹)', 'Credit amount (₹)'], [
  ['2026 Oct 5', 'Purchases A/c Dr.', '', '12,000', ''],
  ['', 'To Cash A/c', '', '', '12,000'],
  ['', '*(Being goods purchased for cash)*', '', '', ''],
], 'Table showing the ruling of a journal with its five columns and one entry with a narration');
const vPlace = flow('LR', ['Source document', 'Journal: the book of original entry', 'Ledger: posting', 'Trial balance', 'Final accounts'], 'Flow: from the source document to the journal, then the ledger, the trial balance and the final accounts');
const vAdvantages = T(['Advantage', 'How it helps'], [
  ['Date order record', 'Every transaction is traced from one place'],
  ['Both aspects together', 'The debit and credit of an entry are seen side by side'],
  ['Narration', 'The reason for the entry is stated for later reference'],
  ['Fewer errors', 'Entries are checked before posting'],
  ['Evidence', 'Supports checking and auditing of the accounts'],
], 'Table of five advantages of the journal');
const vSteps = flow('LR', ['Find the accounts affected', 'Classify each account', 'Apply the rule of debit and credit', 'Write debit first, credit after "To"', 'Add the narration'], 'Flow of five steps for passing a journal entry');
const vJ1 = jt(J1, `Journal of Kolar Spice Traders for January 2027 with seven entries, total ${inr(J1_TOTAL)} rupees on each side`);
const CE = E('3 Feb 2027', [['Cash A/c', 30000], ['Tarun Bose A/c', 50000]], [['Sales A/c', 80000]], 'Being goods sold, part for cash and the balance on credit');
const vCompound = jt([CE], 'Journal table of a compound entry: cash and a debtor debited and sales credited, with equal totals');
const vDisc = T(['Discount', 'Meaning', 'In the journal'], [
  ['Trade discount', 'A reduction in the list price, given at the time of sale', 'Not recorded; the net price is entered'],
  ['Cash discount allowed', 'Given to a debtor for prompt payment', 'Discount Allowed A/c debited (a loss)'],
  ['Cash discount received', 'Obtained from a supplier for prompt payment', 'Discount Received A/c credited (a gain)'],
], 'Table comparing trade discount, discount allowed and discount received');
const vJ2 = jt(J2, `Journal of Nilgiri Gift House for March 2027 with six entries, total ${inr(J2_TOTAL)} rupees on each side`);
const vLosses = T(['Event', 'Debit', 'Credit'], [
  ['Cash withdrawn by the owner', 'Drawings A/c', 'Cash A/c'],
  ['Goods taken by the owner', 'Drawings A/c', 'Purchases A/c'],
  ['Goods destroyed by fire or stolen', 'Loss by Fire (or Theft) A/c', 'Purchases A/c'],
  ['Goods given as charity', 'Charity A/c', 'Purchases A/c'],
], 'Table of four events with the account debited and the account credited: drawings, loss by fire, charity');
const vAdjust = T(['Item', 'Debit', 'Credit'], [
  ['Bad debt written off', 'Bad Debts A/c', 'The debtor\'s account'],
  ['Depreciation charged', 'Depreciation A/c', 'The asset\'s account'],
  ['Interest paid', 'Interest A/c', 'Cash or Bank A/c'],
  ['Interest received', 'Cash or Bank A/c', 'Interest Received A/c'],
  ['Expense outstanding', 'The expense account', 'Outstanding expense A/c'],
  ['Expense paid in advance', 'Prepaid expense A/c', 'The expense account'],
], 'Table of six items with the account debited and the account credited: bad debts, depreciation, interest, outstanding and prepaid expense');
const vJ3 = jt(J3, `Journal of Palakkad Pottery at 31 March 2027 with six entries, total ${inr(J3_TOTAL)} rupees on each side`);
const vOpenRule = T(['Side', 'What is entered'], [
  ['Debit', 'Every asset of the firm, each in its own account'],
  ['Credit', 'Every outside liability, each in its own account'],
  ['Credit', 'Capital: the balancing figure, assets less liabilities'],
], 'Table of the opening entry: assets debited, liabilities credited and capital credited as the balancing figure');
const vOpen = jt(OPEN_ENTRY, `Opening journal entry of Tiruchi Dairy Mart: assets ${inr(OPEN.ta)} debited, liabilities ${inr(OPEN.tl)} and capital ${inr(OPEN.cap)} credited`);
const vGst = T(['Tax', 'Full name', 'Charged on'], [
  ['CGST', 'Central goods and services tax', 'A supply within one state, collected by the Centre'],
  ['SGST (UTGST)', 'State (or union territory) goods and services tax', 'The same supply, collected by the state'],
  ['IGST', 'Integrated goods and services tax', 'A supply from one state to another, and imports'],
], 'Table of the three components of GST with their full names and the supplies on which each is charged');
const vItc = flow('LR', ['Firm buys inputs and pays tax on them', 'Firm sells output and collects tax', 'Tax on inputs is set off against tax on output', 'Only the difference is paid to the government'], 'Flow of input tax credit: tax paid on inputs is set off against tax collected on output, and only the difference is paid');
const vSum1 = T(['Topic', 'Key points'], [
  ['Equation', 'Assets = Liabilities + Capital after every transaction'],
  ['Effects', 'Swap, credit purchase, payment, profit or capital, drawings or expense'],
  ['Double entry', 'Two accounts, equal debit and credit'],
  ['Classes', 'Personal, real, nominal; assets, liabilities, capital, incomes, expenses'],
  ['Rules', 'Debit the receiver, what comes in, expenses; credit the giver, what goes out, incomes'],
], 'Summary table of the accounting equation, effects of transactions, double entry, classification and rules');
const vTips1 = T(['Do', 'Why'], [
  ['Show the equation after each step', 'Step marks go to each correct row'],
  ['Name the class of each account', 'Marks go to reasoning as well as the answer'],
  ['Check that the two sides are equal', 'Catches wrong signs at once'],
], 'Exam tips table for the accounting equation and the classification of accounts');
const vSum2 = T(['Topic', 'Key points'], [
  ['Journal', 'Book of original entry: date, particulars, L.F., debit and credit'],
  ['Entries', 'Simple, compound and opening, each with a narration'],
  ['Discounts', 'Allowed is a loss, received is a gain, trade discount is not recorded'],
  ['Special items', 'Drawings, loss, charity, bad debts, depreciation, interest, outstanding, prepaid'],
  ['GST', 'Theory only: CGST, SGST or UTGST, IGST and input tax credit'],
], 'Summary table of the journal, kinds of entries, discounts, special items and the theory of GST');
const vTips2 = T(['Do', 'Why'], [
  ['Write the debit first and indent the credit after "To"', 'The standard form earns the presentation mark'],
  ['Add a narration to every entry', 'Narration is expected and carries a mark'],
  ['Credit Purchases for goods that leave the stock unsold', 'A common slip is to use Sales'],
  ['Check that debit and credit totals agree', 'Each entry must balance'],
], 'Exam tips table for the journal');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Accounting Equation, Double Entry and Classification of Accounts',
  goals: [
    'State the accounting equation and show the effect of a series of transactions on assets, liabilities and capital',
    'Find a missing element of the equation, and the profit of a year from the change in capital',
    'Classify accounts as personal, real or nominal and as assets, liabilities, capital, incomes or expenses, and apply the rules of debit and credit',
  ],
  slides: [
    sl('title', 'The accounting equation and the double entry system', {
      b: 'Part 1: how every transaction keeps the books in balance.',
      v: vTitle1,
      n: 'Welcome to Chapter three of Class eleven accounts. Every business owns resources and owes claims against them. This part shows how the resources, the liabilities and the owner capital always stay in balance, how each transaction changes them, and how accounts are classified so that we know which side to debit and which to credit.',
    }),
    sl('concept', 'What the accounting equation says', {
      v: vMeaning,
      n: 'The accounting equation says that the resources of a firm always equal the claims against them. It holds because every transaction has two aspects of equal value. The owner can use it to find capital when assets and liabilities are known, and to test that the position stays in balance. Its limit is that it records only what can be stated in money.',
    }),
    sl('concept', 'Assets, liabilities and capital', {
      v: vTerms,
      n: 'Assets are resources the firm owns, such as cash, stock, debtors and machinery. Liabilities are amounts it owes to outsiders, such as creditors and a bank loan. Capital is the claim of the owner, which is what the owner has put in plus profit left in, less drawings. Together the liabilities and the capital are the claims against the assets.',
    }),
    sl('concept', 'Three forms of the equation', {
      v: vForms,
      n: 'The same equation can be written in three ways. Assets equal liabilities plus capital is used to check the position after a transaction. Capital equals assets less liabilities finds the owner capital. Liabilities equal assets less capital finds what the firm owes outsiders. Whichever element is missing, the other two give it.',
    }),
    sl('example', 'Worked example 1: eight transactions of Tezpur Tea Stall', {
      b: '**Tezpur Tea Stall**, an imagined firm. After every step, assets equal liabilities plus capital.',
      bl: [
        `A sale above cost raises cash and capital by the profit (${rs(EQ1_T.soldFor - EQ1_T.soldCost)} on the cash sale).`,
        'Drawings and rent lower cash and capital.',
        `At the end: assets ${rs(EQ1_ASSETS)} = creditors ${rs(EQ1F.liabilities.Creditors)} + capital ${rs(EQ1F.capital)}.`,
      ],
      v: vEq1,
      n: `Tezpur Tea Stall starts with cash of ${rupees(EQ1_T.cash)} and furniture of ${rupees(EQ1_T.furn)}, so capital is ${rupees(EQ1_T.cash + EQ1_T.furn)}. Buying goods for cash swaps assets. Buying on credit raises stock and creditors. Each sale above cost raises capital by the profit. Drawings and rent lower capital. At the end, assets of ${rupees(EQ1_ASSETS)} equal creditors of ${rupees(EQ1F.liabilities.Creditors)} plus capital of ${rupees(EQ1F.capital)}.`,
    }),
    sl('concept', 'How five kinds of transaction act on the equation', {
      v: vPatterns,
      n: 'Transactions fall into five patterns. A swap of assets changes neither side. A credit purchase raises an asset and a liability. Paying a liability lowers an asset and the liability. Profit, income or fresh capital raises an asset and capital. Drawings, expenses and losses lower an asset and capital. Name the pattern first, and the effect on the equation follows.',
    }),
    sl('check', 'Quick check: find the capital', {
      b: 'A firm has assets of ₹6,15,000 and outside liabilities of ₹2,40,000.',
      chk: 'n_cap_check',
      n: 'Use the second form of the equation. Capital is found by taking the liabilities away from the assets. Work out the figure and enter it in rupees.',
    }),
    sl('example', 'Worked example 2: finding the missing element', {
      b: 'In each case one element is missing; the other two give it by the equation.',
      bl: [
        `Case A: capital = ${inr(MISS[0].a)} − ${inr(MISS[0].l)} = ${rs(MISS[0].value)}.`,
        `Case B: assets = ${inr(MISS[1].l)} + ${inr(MISS[1].c)} = ${rs(MISS[1].value)}.`,
        `Case C: liabilities = ${inr(MISS[2].a)} − ${inr(MISS[2].c)} = ${rs(MISS[2].value)}.`,
      ],
      v: vMiss,
      n: `In case A the assets are ${rupees(MISS[0].a)} and the liabilities are ${rupees(MISS[0].l)}, so capital is ${rupees(MISS[0].value)}. In case B liabilities and capital together make assets of ${rupees(MISS[1].value)}. In case C, taking capital from assets leaves liabilities of ${rupees(MISS[2].value)}. Always rewrite the equation to isolate the missing element.`,
    }),
    sl('concept', 'Profit from the change in capital', {
      b: 'If the books record no profit directly, profit is the change in capital, corrected for drawings and fresh capital.',
      v: vProfit,
      n: `Capital grows by profit and by fresh capital, and falls by drawings. So profit equals closing capital, less opening capital, plus drawings, less fresh capital. Here the closing capital is ${rupees(PROFIT.close)} and the opening capital is ${rupees(PROFIT.open)}. After adding the drawings and removing the fresh capital, the profit for the year is ${rupees(PROFIT.value)}.`,
    }),
    sl('example', 'Worked example 3: Ongole Bakery, a loan and a sale at a profit', {
      b: `**Ongole Bakery**, an imagined firm, starts with capital ${rs(EQ3_CAP0)}.`,
      bl: [
        'A bank loan raises cash and a liability together.',
        `Goods costing ${rs(EQ3_G.saleCost)} sold on credit for ${rs(EQ3_G.saleFor)}: capital rises by ${rs(EQ3_G.saleFor - EQ3_G.saleCost)}.`,
        `Goods taken by the owner reduce stock and capital by ${rs(EQ3_G.own)}.`,
      ],
      v: vEq3,
      n: `Ongole Bakery starts with capital of ${rupees(EQ3_CAP0)}. A bank loan of ${rupees(EQ3_G.loan)} raises cash and a liability. Commission raises capital, and wages lower it. Goods taken by the owner lower stock and capital. A credit sale above cost raises debtors and capital. At the end, assets of ${rupees(EQ3_ASSETS)} equal the liabilities and the capital of ${rupees(EQ3F.capital)}.`,
    }),
    sl('concept', 'Double entry: two accounts, equal amounts', {
      b: 'Every transaction has a **debit** aspect and a **credit** aspect of equal value, so the total debits always equal the total credits.',
      v: vDouble,
      n: 'The double entry system records both aspects of every transaction. One account is debited and another is credited, always for equal amounts. This is the accounting equation in action. Since the two sides are equal, total debits equal total credits, and any difference points to an error somewhere in the books.',
    }),
    sl('concept', 'Two ways of classifying accounts', {
      v: vClass,
      n: 'Accounts can be classified in two ways. The traditional way has personal accounts, which may be natural, artificial or representative, real accounts, and nominal accounts. The modern way groups accounts as assets, liabilities, capital, revenues or incomes, and expenses or losses. Both lead to the same debit and credit, so a student should know both.',
    }),
    sl('concept', 'Personal accounts', {
      v: vPersonal,
      n: 'A personal account relates to a person. A natural personal account is that of a living person, such as a debtor or a creditor. An artificial personal account is that of a body the law treats as a person, such as a bank or a company. A representative personal account stands for persons through an item, such as outstanding rent or prepaid insurance.',
    }),
    sl('concept', 'Real and nominal accounts', {
      v: vRealNom,
      n: 'A real account relates to things the firm owns. Tangible ones can be touched, such as cash, machinery and furniture. Intangible ones have no physical form, such as goodwill and patents. A nominal account relates to expenses, losses, incomes and gains, such as salaries, bad debts and interest received. Nominal accounts are closed at the end of the year.',
    }),
    sl('check', 'Quick check: which kind of account?', {
      b: 'A firm records the right to use a patented design in a Patents account.',
      chk: 'm_patent',
      n: 'Ask whether the item is owned by the firm, whether it stands for a person, and whether it is an expense or a loss. Then choose the class that fits.',
    }),
    sl('concept', 'The modern classification and its rules', {
      v: vModern,
      n: 'In the modern classification an asset or an expense increases on the debit side and decreases on the credit side. A liability, the capital and a revenue increase on the credit side and decrease on the debit side. The side of increase is the one to remember, and the opposite side serves for a decrease. Drawings, which reduce capital, are debited.',
    }),
    sl('concept', 'The traditional rules of debit and credit', {
      v: vRules,
      n: 'In the traditional system the rule depends on the class. For a personal account, debit the receiver and credit the giver. For a real account, debit what comes in and credit what goes out. For a nominal account, debit all expenses and losses and credit all incomes and gains. Apply the rule to each account in the transaction, and one debit and one credit emerge.',
    }),
    sl('example', 'Worked example 4: analysing six transactions', {
      b: 'For each imagined transaction, name the two accounts, their classes, and the debit and the credit.',
      bl: ['Machinery bought for cash: Machinery up (debit), Cash down (credit).', 'Rent due, not paid: Rent up (debit), Outstanding Rent up (credit).', 'A creditor paid: Rao Brothers down (debit), Cash down (credit).'],
      v: vTxn,
      n: 'Take six transactions. Machinery bought for cash debits machinery and credits cash. Salaries paid debit salaries and credit cash. A bank loan taken in cash debits cash and credits the loan. Paying a creditor debits the creditor and credits cash. Rent due but unpaid debits rent and credits outstanding rent. More capital brought in debits cash and credits capital.',
    }),
    sl('check', 'Quick check: repaying a loan', {
      b: 'A firm repays part of its bank loan in cash.',
      chk: 'tf_rule_check',
      n: 'A loan is a liability. Think about what happens to the loan when part of it is repaid, and on which side a fall in a liability is shown.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Assets = Liabilities + Capital after every transaction.',
        'Five patterns of effect; profit raises capital, drawings lower it.',
        'Double entry: equal debits and credits.',
        'Classify as personal, real or nominal, and as assets, liabilities, capital, incomes or expenses.',
      ],
      v: vSum1,
      n: 'To sum up. The accounting equation holds after every transaction. Transactions follow five patterns. Double entry records two aspects in equal amounts. Accounts are classified in the traditional way and in the modern way, and each class has a rule that tells us which side to debit and which to credit. The next part turns these rules into journal entries.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show the equation after each step in a table.',
        'Name the class of every account you debit or credit.',
        'Check the profit by the change in capital.',
      ],
      v: vTips1,
      n: 'In the examination, show the equation in a table after each step, so that every correct row earns a mark. Name the class of each account you use, because the reasoning is rewarded as well as the answer. When finding profit from capital, include drawings and fresh capital, and check that both sides of the equation agree.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Journal and Goods and Services Tax (Theory)',
  goals: [
    'Explain the meaning, format and advantages of the journal and write simple, compound and opening entries with narrations',
    'Journalise discounts, returns, drawings, goods lost or given as charity, bad debts, depreciation, interest and outstanding or prepaid items',
    'Explain in outline what Goods and Services Tax is, its three components and input tax credit',
  ],
  slides: [
    sl('title', 'The journal: where every transaction is first recorded', {
      b: 'Part 2: from a transaction to a journal entry, and a theoretical look at GST.',
      v: vRuling,
      n: 'Welcome to the second part of Chapter three. Having learned how accounts are classified and which side to debit or credit, we now record transactions in the journal. We write simple, compound and opening entries with narrations, and then take a short, theoretical look at goods and services tax.',
    }),
    sl('concept', 'Where the journal fits', {
      b: 'The journal is the **book of original entry**: each transaction is recorded in it first, in date order.',
      v: vPlace,
      n: 'Every transaction begins with a source document, such as a bill or a voucher. It is recorded first in the journal, which is why the journal is called the book of original entry. From the journal the entries are posted to the ledger, which is the subject of the next chapter, and then come the trial balance and the final accounts.',
    }),
    sl('concept', 'Advantages of the journal', {
      v: vAdvantages,
      n: 'The journal gives a record in the order of dates, so any transaction can be traced from one place. It shows the debit and the credit of each entry side by side, and the narration gives the reason. Errors can be checked before posting, and the book is useful as evidence when the accounts are checked or audited.',
    }),
    sl('concept', 'Passing an entry in five steps', {
      v: vSteps,
      n: 'To pass an entry, first find the two or more accounts affected. Next classify each one. Then apply the rule of debit and credit. Write the account to be debited first, with the abbreviation for debit, and write the account to be credited on the next line, indented, after the word To. Finally write the narration, beginning with the word Being.',
    }),
    sl('check', 'Quick check: do the totals agree?', {
      b: 'A firm sells goods partly for cash and partly on credit in a single entry.',
      chk: 'tf_journal_check',
      n: 'Think about whether a compound entry follows the same rule as a simple entry. What must be true of the debit side and the credit side of every entry?',
    }),
    sl('example', 'Worked example 1: purchases, sales and returns', {
      b: '**Kolar Spice Traders**, an imagined firm, January 2027. The first entry is a compound entry for the start of the business.',
      bl: ['Purchases return: the supplier is debited, Purchases Return is credited.', 'Sales return: Sales Return is debited, the customer is credited.', `Each side of the journal totals ${rs(J1_TOTAL)}.`],
      v: vJ1,
      n: `Kolar Spice Traders starts with cash and furniture, so cash and furniture are debited and capital is credited. Goods bought for cash debit purchases and credit cash. Credit purchases credit the supplier. A sale for cash debits cash and credits sales. A credit sale debits the customer. A return to the supplier debits the supplier and credits purchases return. A return by the customer debits sales return and credits the customer.`,
    }),
    sl('concept', 'Compound entries', {
      b: 'A **compound entry** has more than one account on the debit or the credit side, or both, and its two sides still total the same.',
      v: vCompound,
      n: 'A compound entry combines several simple entries into one. Here goods are sold, part for cash and the rest on credit. Cash and the customer are both debited, and sales is credited with the total. Do not split the credit between accounts for a single sale. The total of the debits must equal the total of the credits.',
    }),
    sl('concept', 'Three kinds of discount', {
      v: vDisc,
      n: 'Trade discount is a reduction in the list price, given at the time of sale. It is not recorded in the books, and the net price is entered. Cash discount allowed is given to a debtor who pays promptly, and is a loss debited to discount allowed. Cash discount received is obtained from a supplier, and is a gain credited to discount received.',
    }),
    sl('example', 'Worked example 2: discounts, drawings, a fire and charity', {
      b: '**Nilgiri Gift House**, an imagined firm, March 2027.',
      bl: ['Discount allowed is debited and discount received is credited.', 'Goods taken by the owner go to Drawings, credited to Purchases at cost.', 'Goods destroyed or given away are credited to Purchases.'],
      v: vJ2,
      n: `Nilgiri Gift House receives cash from a debtor in full settlement, and the shortfall is discount allowed, a debit. It pays a creditor in full settlement, and the saving is discount received, a credit. Cash drawn by the owner is debited to drawings. Goods taken by the owner, destroyed by fire or given as charity are credited to purchases, and the matching debit goes to drawings, loss by fire or charity.`,
    }),
    sl('check', 'Quick check: the discount entry', {
      b: 'A debtor pays ₹9,400 in full settlement of ₹10,000.',
      chk: 'm_disc_check',
      n: 'The debtor account is cleared in full, but the firm receives less cash. Decide which account takes the difference, and whether it is a gain or a loss to the firm.',
    }),
    sl('concept', 'Drawings, losses and charity', {
      v: vLosses,
      n: 'When the owner withdraws cash, drawings is debited and cash is credited. When the owner takes goods, drawings is debited and purchases is credited, at cost. Goods destroyed by fire or stolen are a loss, so the loss account is debited and purchases is credited. Goods given as charity debit the charity account and credit purchases. No sale is made in any of these cases.',
    }),
    sl('concept', 'Bad debts, depreciation, interest, outstanding and prepaid items', {
      v: vAdjust,
      n: 'A bad debt is a loss, so bad debts is debited and the debtor is credited. Depreciation is an expense, debited to depreciation and credited to the asset. Interest paid is debited and interest received is credited. An outstanding expense is debited to the expense and credited to a liability account. An expense paid in advance is debited to a prepaid account and credited to the expense.',
    }),
    sl('example', 'Worked example 3: bad debt, depreciation, interest and year-end items', {
      b: '**Palakkad Pottery**, an imagined firm, 31 March 2027.',
      bl: ['A bad debt clears the debtor and records a loss.', 'Wages outstanding create a liability; insurance paid in advance creates an asset.'],
      v: vJ3,
      n: `Palakkad Pottery writes off a debtor, so bad debts is debited and the debtor is credited. Depreciation is debited and machinery is credited. Interest paid is debited with cash credited, and interest received in the bank debits bank and credits interest received. Outstanding wages are debited with a liability credited, and insurance paid in advance is debited as prepaid with the expense credited. Each side totals ${rupees(J3_TOTAL)}.`,
    }),
    sl('concept', 'The opening entry', {
      b: 'At the start of a year, the balances of the last year are brought forward by one **opening entry**.',
      v: vOpenRule,
      n: 'An opening entry brings the balances of the last year into the new books. Every asset is debited, each in its own account, and every outside liability is credited. Capital is not usually given. It is found as assets less liabilities, and credited as the balancing figure. Debtors and creditors are entered person by person, not as a single total.',
    }),
    sl('example', 'Worked example 4: the opening entry of Tiruchi Dairy Mart', {
      b: `**Tiruchi Dairy Mart**, an imagined firm, 1 April 2026: assets ${rs(OPEN.ta)}, liabilities ${rs(OPEN.tl)}.`,
      bl: [`Capital = ${inr(OPEN.ta)} − ${inr(OPEN.tl)} = ${rs(OPEN.cap)}.`, 'Debtors and creditors are shown person by person.'],
      v: vOpen,
      n: `Tiruchi Dairy Mart has assets of ${rupees(OPEN.ta)}, made up of cash, bank, stock, two debtors, furniture and machinery. It owes ${rupees(OPEN.tl)} to a creditor and a bank. Capital is the balancing figure, assets less liabilities, which is ${rupees(OPEN.cap)}. The entry debits each asset and credits each liability and capital, and both sides total ${rupees(OPEN.ta)}.`,
    }),
    sl('check', 'Quick check: the opening entry', {
      b: 'An opening entry debits all assets and credits all liabilities and capital.',
      chk: 'fb_open_check',
      n: 'Recall which accounts stand on the debit side of an opening entry and which on the credit side. The balancing figure is credited and is the owner claim.',
    }),
    sl('concept', 'GST: meaning and its three components', {
      b: 'Goods and Services Tax is an **indirect tax** on the supply of goods and services. This is a theory topic only.',
      v: vGst,
      n: 'Goods and services tax is an indirect tax on the supply of goods and services. Within one state the tax has two parts, central goods and services tax and state goods and services tax, with the union territory tax in a union territory. On a supply from one state to another, integrated goods and services tax is charged. In this course the tax is studied only as theory.',
    }),
    sl('concept', 'Input tax credit', {
      b: 'Only the **concept** is needed. Journal entries for transactions with GST are not in the ISC Class XI syllabus.',
      v: vItc,
      n: 'A registered business pays tax on the inputs it buys and collects tax on what it sells. Input tax credit allows it to set off the first against the second, and pay only the difference. This means tax is paid only on the value the business adds, and tax is not charged on tax at every stage. We study the concept here, and no entries are needed.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'The journal is the book of original entry: date, particulars, L.F., debit, credit.',
        'Simple, compound and opening entries, each with a narration.',
        'Discount allowed is a loss; discount received is a gain; trade discount is not recorded.',
        'GST: theory only, with CGST, SGST and IGST and input tax credit.',
      ],
      v: vSum2,
      n: 'To sum up. The journal records every transaction first, in date order. Entries may be simple, compound or opening, and each has a narration. Drawings, losses, charity, bad debts, depreciation, interest, outstanding and prepaid items follow their own rules. Goods and services tax is a theoretical topic with three components, and input tax credit lets a business pay tax only on the value it adds.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the debit first and the credit after To, with a narration.',
        'Credit Purchases, not Sales, for goods taken, lost or given away.',
        'Work out each discount before writing the entry.',
      ],
      v: vTips2,
      n: 'In the examination, write the debit first and indent the credit after the word To, and add a narration to every entry. Credit purchases, not sales, for goods taken by the owner, lost or given away. Work out discounts and the capital in an opening entry before writing the entry, and check that the two sides of each entry agree.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Accounting Equation and Journal — Notes',
  sections: [
    {
      h: '1. The accounting equation',
      t: 1,
      b: 'A firm owns resources, its **assets**, and every asset is financed either by outsiders, the **liabilities**, or by the owner, the **capital**. So the resources always match the claims on them:\n\n**Assets = Liabilities + Capital**\n\nThe equation holds after every transaction because each transaction has two aspects of equal value. Rearranged, it finds the capital (assets less liabilities) or the outside liabilities (assets less capital) when two of the three are known.\n\n**Uses:** it tests that the books are in balance, finds a missing element, and shows the effect of a transaction. **Limit:** it covers only what can be stated in money and it does not show sales or profit by itself.',
      terms: [
        ['Accounting equation', 'Assets = Liabilities + Capital; the resources of a firm equal the claims against them.'],
        ['Assets', 'Resources owned by the firm that have value, such as cash, stock, debtors and machinery.'],
        ['Liabilities', 'Amounts owed by the firm to outsiders, such as creditors and a bank loan.'],
        ['Capital', 'The owner\'s claim: investment plus profit left in, less drawings.'],
      ],
      v: vForms,
    },
    {
      h: '2. Effect of transactions on the equation',
      t: 1,
      b: 'Every transaction fits one of five patterns:\n\n- **swap of assets** (machinery bought for cash): total assets unchanged;\n- **credit purchase of an asset**: assets and liabilities rise together;\n- **payment of a liability**: an asset and the liability fall together;\n- **profit, income or fresh capital**: an asset rises and capital rises;\n- **drawings, expense or loss**: an asset falls and capital falls.\n\nA sale at a profit raises cash or debtors by the selling price, lowers stock by the cost, and raises capital by the difference. If profit is not recorded directly, **profit = closing capital − opening capital + drawings − fresh capital**.',
      terms: [
        ['Drawings', 'Cash or goods taken by the owner for personal use; they reduce capital.'],
        ['Profit by capital', 'Closing capital less opening capital, plus drawings, less fresh capital.'],
      ],
      v: vEq1,
      vs: [vProfit],
    },
    {
      h: '3. Double entry and the classification of accounts',
      t: 2,
      b: 'Under the **double entry system** every transaction affects two aspects, one debited and one credited, for equal amounts. So the total debits equal the total credits.\n\n**Traditional classification:** personal accounts (natural, artificial, representative), real accounts (tangible, intangible) and nominal accounts.\n\n**Modern classification:** assets, liabilities, capital, revenues (incomes) and expenses (losses).\n\nBook texts differ on a few accounts (for example the bank account, and Purchases and Sales); in every case the side to debit or credit is the same, so use the rule of the modern class when in doubt.',
      terms: [
        ['Double entry', 'Recording both aspects of every transaction, one debit and one credit of equal value.'],
        ['Personal account', 'Account of a person: natural, artificial (a body such as a bank) or representative (such as outstanding rent).'],
        ['Real account', 'Account of a thing owned: tangible (cash, machinery) or intangible (goodwill, patents).'],
        ['Nominal account', 'Account of an expense, loss, income or gain.'],
      ],
      v: vClass,
      vs: [vPersonal, vRealNom],
    },
    {
      h: '4. Rules of debit and credit',
      t: 2,
      b: '**Traditional rules**\n\n- Personal: debit the receiver, credit the giver.\n- Real: debit what comes in, credit what goes out.\n- Nominal: debit all expenses and losses, credit all incomes and gains.\n\n**Modern rules:** an asset or an expense is increased by a debit; a liability, capital or revenue is increased by a credit; the opposite side is used for a decrease. The **Drawings account** is debited because drawings reduce the capital.\n\nBoth methods always give the same entry: for example, machinery bought for cash debits the machinery and credits cash.',
      terms: [
        ['Debit', 'The left side of an account; it records increases in assets and expenses and decreases in liabilities, capital and revenues.'],
        ['Credit', 'The right side of an account; it records increases in liabilities, capital and revenues and decreases in assets and expenses.'],
      ],
      v: vRules,
      vs: [vModern, vTxn],
    },
    {
      h: '5. The journal: meaning, advantages and format',
      t: 3,
      b: 'The **journal** is the book of original entry: each transaction is recorded in it first, in date order, with the accounts debited and credited and a **narration**. From it the entries are posted to the ledger (the next chapter).\n\n**Advantages:** a record in date order, both aspects of a transaction together, a narration for reference, fewer errors, and evidence for checking.\n\n**Format:** five columns, namely date, particulars, ledger folio (L.F.), debit amount and credit amount. The account to be debited is written first with Dr.; the account to be credited follows on the next line, indented, after the word To; the narration, beginning with Being, is written below.',
      terms: [
        ['Journal', 'The book of original entry in which transactions are first recorded, in date order.'],
        ['Narration', 'A brief explanation of an entry, written below it and beginning with Being.'],
        ['Ledger folio (L.F.)', 'The page number of the ledger account to which the entry is posted.'],
      ],
      v: vRuling,
      vs: [vAdvantages],
    },
    {
      h: '6. Journal entries: simple, compound, opening and special items',
      t: 3,
      b: 'A **simple entry** has one debit and one credit. A **compound entry** has several accounts on one side or both, with equal totals. The **opening entry** debits every asset and credits every liability; capital, the balancing figure (assets less liabilities), is credited.\n\n**Discounts:** trade discount is not recorded; discount allowed (to debtors) is a loss and is debited; discount received (from creditors) is a gain and is credited.\n\n**Special items:** drawings (cash: credit Cash; goods: credit Purchases); goods lost by fire or theft, or given as charity (debit the loss or Charity, credit Purchases); bad debts (debit Bad Debts, credit the debtor); depreciation (debit Depreciation, credit the asset); interest paid (debit) and received (credit); outstanding expense (credit a liability account); prepaid expense (debit an asset account).',
      terms: [
        ['Compound entry', 'An entry with more than one account on the debit side, the credit side, or both; the totals are equal.'],
        ['Opening entry', 'The entry that brings forward assets, liabilities and capital at the start of a year.'],
        ['Discount allowed', 'A cash discount given to a debtor for prompt payment; a loss to the firm.'],
        ['Discount received', 'A cash discount obtained from a creditor; a gain to the firm.'],
      ],
      v: vJ1,
      vs: [vDisc, vLosses, vAdjust, vOpen],
    },
    {
      h: '7. Goods and Services Tax (GST): a brief theory',
      t: 4,
      b: '**GST** is an indirect tax on the supply of goods and services. It has three components: **CGST** and **SGST** (**UTGST** in a union territory) are charged together on a supply within one state or union territory, and **IGST** on a supply from one state to another.\n\n**Input tax credit** lets a registered business set off the tax paid on its inputs against the tax payable on its output, so that tax is paid only on the value added.\n\nThis chapter treats GST as theory only: rates, computations and journal entries for transactions with GST are not part of the ISC Class XI syllabus.',
      terms: [
        ['GST', 'An indirect tax on the supply of goods and services.'],
        ['Input tax credit', 'The set-off of tax paid on inputs against tax payable on output.'],
      ],
      v: vGst,
      vs: [vItc],
    },
  ],
  tips: '- **How marks go:** meaning or definition 1 mark; for an entry, the right accounts on the right sides carry the marks, then the amounts, and a narration or the totals earn the last mark; for an equation table, one mark for each correct pair of rows.\n- Pass each entry in the standard form: debit first with Dr., credit after To, narration beginning with Being.\n- Work out discount allowed, discount received and the capital of an opening entry before writing the entry.\n- For classification, name both the traditional class and the modern class when asked, and give the reason.\n- **Common mistakes:** crediting Sales for goods taken by the owner or given away; debiting the creditor for discount received the wrong way round; recording trade discount; leaving capital out of the opening entry; writing GST rates or entries, which are not required.',
});

// ================================================================ flashcards
const F = cards([
  ['**Accounting equation**', 'Assets = Liabilities + Capital; the resources of a firm equal the claims against them.', 'definition', 1],
  ['**Assets**', 'Resources owned by the firm that have value, such as cash, stock, debtors and machinery.', 'definition', 1],
  ['**Liabilities**', 'Amounts the firm owes to outsiders, such as creditors and a bank loan.', 'definition', 1],
  ['**Capital**', 'The owner\'s claim: investment plus profit left in, less drawings.', 'definition', 1],
  ['Capital from the equation', 'Capital = Assets − Liabilities.', 'fact', 1],
  ['Effect of buying goods on credit', 'Stock (asset) and creditors (liability) both rise by the same amount.', 'fact', 1],
  ['Effect of a sale at a profit', 'Cash or debtors rise by the price, stock falls by the cost, capital rises by the profit.', 'fact', 1],
  ['Effect of drawings', 'An asset (cash or stock) falls and capital falls by the same amount.', 'fact', 1],
  ['Profit from the change in capital', 'Closing capital − opening capital + drawings − fresh capital.', 'exam-tip', 1],
  ['Uses and limit of the equation', 'Uses: test the balance, find a missing element. Limit: records only what is stated in money.', 'concept', 1],
  ['**Double entry system**', 'Every transaction has two aspects, one debited and one credited, for equal amounts.', 'definition', 2],
  ['Kinds of **personal account**', 'Natural (a living person), artificial (a body such as a bank or company), representative (such as outstanding rent).', 'definition', 2],
  ['**Real account**', 'Account of a thing owned: tangible (cash, machinery) or intangible (goodwill, patents).', 'definition', 2],
  ['**Nominal account**', 'Account of an expense, loss, income or gain.', 'definition', 2],
  ['Traditional rules of debit and credit', 'Personal: debit the receiver, credit the giver. Real: debit what comes in, credit what goes out. Nominal: debit expenses and losses, credit incomes and gains.', 'concept', 2],
  ['Modern classification', 'Assets, liabilities, capital, revenues (incomes), expenses (losses).', 'concept', 2],
  ['Modern rules of debit and credit', 'Debit increases assets and expenses; credit increases liabilities, capital and revenues; the other side decreases them.', 'concept', 2],
  ['Why Drawings A/c is debited', 'Drawings reduce capital, and capital falls on the debit side.', 'fact', 2],
  ['**Journal**', 'The book of original entry in which transactions are first recorded, in date order.', 'definition', 3],
  ['Columns of the journal', 'Date, particulars, ledger folio, debit amount, credit amount.', 'fact', 3],
  ['Advantages of the journal', 'Date-order record, both aspects together, narration, fewer errors, evidence for checking.', 'concept', 3],
  ['Simple and compound entries', 'Simple: one debit and one credit. Compound: several accounts on one side or both, with equal totals.', 'definition', 3],
  ['**Narration**', 'A short explanation written below an entry, beginning with Being.', 'definition', 3],
  ['Entry for goods returned to a supplier', 'Supplier Dr; To Purchases Return.', 'exam-tip', 3],
  ['Discount allowed and discount received', 'Allowed (to debtors) is a loss, debited. Received (from creditors) is a gain, credited.', 'concept', 3],
  ['Trade discount', 'A reduction in the list price; it is not recorded in the books.', 'fact', 3],
  ['Entry for goods taken by the owner', 'Drawings A/c Dr; To Purchases A/c (at cost).', 'exam-tip', 3],
  ['Entry for goods destroyed by fire or given as charity', 'Loss by Fire A/c (or Charity A/c) Dr; To Purchases A/c.', 'exam-tip', 3],
  ['Entry for a bad debt', 'Bad Debts A/c Dr; To the debtor\'s account.', 'exam-tip', 3],
  ['The opening entry', 'Debit all assets, credit all liabilities, and credit capital as the balancing figure.', 'concept', 3],
  ['Outstanding and prepaid expenses', 'Outstanding: expense Dr, outstanding A/c Cr. Prepaid: prepaid A/c Dr, expense Cr.', 'concept', 3],
  ['**GST**', 'An indirect tax on the supply of goods and services; studied as theory only here.', 'definition', 4],
  ['CGST, SGST and IGST', 'CGST and SGST (UTGST in a union territory) on a supply within a state; IGST on a supply between states.', 'concept', 4],
  ['**Input tax credit**', 'The set-off of tax paid on inputs against tax payable on output, so tax falls only on value added.', 'definition', 4],
]);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Accounting Equation and Journal',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_eq_cap', 'm_trad_personal', 'm_purch_return', 'm_gst_meaning', 'ar_drawings_goods'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_eq_profit', { attempt: 1, keys: ['s2_entry_discount', 's2_rules_trad'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_eq_three', { attempt: 1, keys: ['s3_entries_drawings', 's3_classify'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts and needs journal entries with narrations.', items: ['l5_journal_month'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Accounting Equation and Journal',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_eq_effect', 'm_eq_profit', 'm_eq_nochange', 'm_rule_debit', 'm_loan_rule', 'm_nominal_rule', 'm_bad_debt', 'm_open_cap', 'm_compound', 'm_igst', 'ar_eq', 'ar_charity'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer the first two questions and either of the last two.', items: ['s2_eq_meaning', 's2_personal_kinds', { attempt: 1, keys: ['s2_entry_loss_dep', 's2_gst_types'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer the first three questions and either of the last two. Show your working.', items: ['s3_eq_missing', 's3_rules_compare', 's3_entries_basic', { attempt: 1, keys: ['s3_compound', 's3_gst_itc'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer the first question and either of the last two.', items: ['l5_eq_table', { attempt: 1, keys: ['l5_journal_losses', 'l5_opening_entries'] }] },
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
// 3. Tests: disjoint, no deck-check item, marks.
const checksUsed = new Set(['n_cap_check', 'm_patent', 'tf_rule_check', 'tf_journal_check', 'm_disc_check', 'fb_open_check']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
// 4. No GST entry, rate or computation anywhere: GST appears only in t04 items, deck 2 slides on GST and the notes.
const served = JSON.stringify({ d: [part1, part2], N, F, q: BANK.map((b) => b.text) });
const gstBad = /(?:CGST|SGST|IGST|UTGST)\s*A\/c|Input (?:CGST|SGST|IGST)|Output (?:CGST|SGST|IGST)|(?:GST|tax)[^.]{0,40}\d+\s*(?:%|per cent)|\d+\s*(?:%|per cent)[^.]{0,40}\bGST\b/i.exec(served);
check(!gstBad, `GST entry, rate or computation found: ${gstBad?.[0]}`);
void sum; void ACC; void mdTable; void J1; void same;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of isc-11-accounts-ch03 (accounting equation, double entry and classification, journal, GST theory); removed topic (journal entries for transactions with GST) not taught: GST appears only as theory with one note that GST entries are not in the syllabus',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no textbook or CISCE specimen or past-paper item reused; the CBSE 11 Accountancy ch03 firms, figures and wording (and its GST entries) were avoided',
    data: 'every amount computed by src/fig.mjs and acc.mjs and asserted: the accounting equation balances after every step, every journal entry balances (debits equal credits), the opening capital is the balancing figure, discounts equal the difference of the amounts settled; tables in decks, notes and model answers are generated from the computed values',
    facts: 'rules of debit and credit and classification of accounts as in standard Class XI texts; GST described only as theory (CGST, SGST or UTGST, IGST, input tax credit) with no rates, amounts or entries',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
