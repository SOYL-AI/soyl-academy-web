// t02: double entry system, classification of accounts (traditional and modern) and the rules of debit and credit.
// Imagined firms only; every classification and side comes from the directory and rule in fig.mjs.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { rs, inr, mdTable, ACC, analyse } from './fig.mjs';
import { QQ } from './qq.mjs';

const rowOf = (txt, lines) => {
  const r = analyse(lines);
  const f = (side) => r.filter((x) => x.side === side).map((x) => `${x.a} (${x.trad}; ${x.mod})`).join('; ');
  return [txt, f('Dr'), f('Cr')];
};

const rowMod = (txt, lines) => {
  const r = analyse(lines);
  const f = (side) => r.filter((x) => x.side === side).map((x) => `${x.a} (${x.mod})`).join('; ');
  return [txt, f('Dr'), f('Cr')];
};

// ================================================================ multiple choice
QQ('m_patent', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Dehri Brake Parts, an imagined firm, buys the right to use a patented design and records it in a Patents account. In the traditional classification this account is',
  opts: ['a real account, of an intangible asset', 'a personal account, of an artificial person', 'a nominal account, of an expense', 'a personal account, of a natural person'],
  sol: 'A patent is something the firm owns, so its account is real; being a right with no physical form it is intangible. It stands for no person, and it is not an expense or a loss of the year, which rules out the personal and nominal descriptions.',
}));
QQ('m_trad_personal', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which one of these accounts in the books of an imagined firm is a representative personal account?',
  opts: ['Outstanding Rent A/c', 'Machinery A/c', 'Salaries A/c', 'Furniture A/c'],
  sol: 'Outstanding rent stands for the landlord to whom rent is still due, so it represents a person. Machinery and furniture are real accounts, and salaries is a nominal account.',
}));
QQ('m_rule_debit', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Kanpur Glass Studio, an imagined firm, received ${rs(8200)} in cash from its debtor Latha Pillai. By the traditional rules the entry debits`,
  opts: ['Cash A/c, as cash comes in, and credits Latha Pillai\'s account, as she is the giver', 'Latha Pillai\'s account, as she is the giver, and credits Cash A/c', 'Cash A/c and credits the Sales account', 'Latha Pillai\'s account and credits the Bad Debts account'],
  sol: 'Real account: debit what comes in. Personal account: credit the giver. So cash is debited and the debtor is credited. The reverse pair swaps the rules, and the Sales and Bad Debts accounts have no part in a plain collection.',
}));
QQ('m_loan_rule', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kozhikode Fan House, an imagined firm, repays ${rs(25000)} of a loan taken from a bank, by paying cash. By the modern rules the entry`,
  opts: ['debits the loan account, a liability that falls, and credits Cash A/c', 'credits the loan account, a liability that falls, and debits Cash A/c', 'debits the loan account, taken as an asset that rises, and credits Cash A/c', 'debits Interest A/c and credits Cash A/c'],
  sol: 'A fall in a liability is shown on the debit side, and a fall in the asset cash on the credit side. The credit-side alternative applies to a rise in the liability, the third is wrong because the loan is not an asset, and no interest is paid in this transaction.',
}));
QQ('m_nominal_rule', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Mysuru Silk Agency, an imagined firm, earns commission of ${rs(6500)} in cash. The Commission Received account is`,
  opts: ['a nominal account of income, and it is credited', 'a nominal account of an expense, and it is debited', 'a personal account, and it is credited', 'a real account, and it is debited'],
  sol: 'Commission earned is an income, so its nominal account is credited as the income arises. Treating it as an expense or debiting it would reverse the rule, and it neither stands for a person nor is a thing owned.',
}));

// ================================================================ assertion-reason
QQ('ar_personal', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Outstanding Rent account in the books of an imagined firm is classed as a personal account.',
  r: 'It represents the landlord to whom the rent is still owed.',
  sol: 'Accounts that stand for persons, though not named after them, are representative personal accounts, and this one speaks for the unpaid landlord. R gives the reason for the classification in A.',
}));
QQ('ar_rules', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Rent paid by Sambalpur Tent House, an imagined firm, is debited to its Rent account.',
  r: 'Under the traditional rule for nominal accounts, all expenses and losses are credited and all incomes and gains are debited.',
  sol: 'Rent is an expense, and an expense is debited. R states the rule the wrong way round: the rule is debit all expenses and losses and credit all incomes and gains.',
}));

// ================================================================ true-false, fill in the blanks
QQ('tf_rule_check', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: `Bhuj Stationery, an imagined firm, repays ${rs(12000)} of its bank loan in cash. The loan account is credited.`,
  sol: 'The loan is a liability that falls, so the loan account is debited and cash is credited. A credit to a liability would raise it.',
}));
QQ('fb_class', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Sundaram Printers, an imagined press, groups its accounts in the modern way as assets, liabilities, capital, ___ (or incomes) and ___ (or losses).',
  acc: [['revenues', 'revenue', 'incomes', 'income'], ['expenses', 'expense']],
  sol: 'The five heads of the modern classification are assets, liabilities, capital, revenues and expenses.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_personal_kinds', short({
  t: 2, d: 1, c: 'recall', marks: 2,
  stem: 'Name the three kinds of personal account and give one imagined example of each.',
  model: mdTable(['Kind', 'Meaning', 'Example'], [
    ['Natural', 'Account of a living person', 'Tarun Mehra A/c'],
    ['Artificial', 'Account of a body that the law treats as a person', 'Pune Cyclists Club A/c, or a company'],
    ['Representative', 'Account that stands for a person or persons', 'Outstanding Wages A/c'],
  ]),
  sol: 'Name all three kinds for the first mark and give an example of each for the second.',
  scheme: [['Natural, artificial and representative named', 1], ['An example of each kind', 1]],
}));
QQ('s2_rules_trad', short({
  t: 2, d: 2, c: 'recall', marks: 2,
  stem: 'State the traditional rules of debit and credit for personal, real and nominal accounts.',
  model: '**Personal account:** debit the receiver, credit the giver.\n\n**Real account:** debit what comes in, credit what goes out.\n\n**Nominal account:** debit all expenses and losses, credit all incomes and gains.',
  sol: 'One mark for the personal and real rules and one for the nominal rule.',
  scheme: [['Personal and real account rules', 1], ['Nominal account rule', 1]],
}));
QQ('s2_drawings_rule', short({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: `Yash Ceramics, an imagined firm, records ${rs(8000)} taken by its owner for personal use in the Drawings account. Using the modern classification, explain why the Drawings account is debited.`,
  model: 'Capital is a claim of the owner on the firm and, like a liability, it increases on the credit side. Drawings reduce that claim, so they are recorded on the opposite side, the debit.\n\nThe cash or goods that leave the firm are credited, so the entry balances.',
  sol: 'Link the debit to the reduction of capital, and show the opposite credit.',
  scheme: [['Capital increases on the credit side', 1], ['Drawings reduce capital, so are debited, with the credit to cash or goods', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const names = ['Furniture A/c', 'Rent Received in Advance A/c', 'Bad Debts A/c', 'Loan from Vindhya Bank A/c', 'Interest Received A/c', 'Rao Brothers A/c (creditor)'];
  QQ('s3_classify', short({
    t: 2, d: 2, c: 'understanding', marks: 3,
    stem: 'Classify each of these accounts of an imagined firm in the traditional way (personal as natural, artificial or representative, real or nominal) and in the modern way (asset, liability, capital, income or expense): Furniture A/c, Rent Received in Advance A/c, Bad Debts A/c, Loan from Vindhya Bank A/c, Interest Received A/c and Rao Brothers A/c (creditor).',
    model: mdTable(['Account', 'Traditional', 'Modern'], names.map((n) => [n, ACC[n][0], ACC[n][1]])),
    sol: 'Each pair of accounts classified both ways earns one mark.',
    scheme: [['Furniture and Rent Received in Advance', 1], ['Bad Debts and Loan from Vindhya Bank', 1], ['Interest Received and Rao Brothers', 1]],
  }));
}
QQ('s3_rules_compare', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'For each of these transactions of an imagined firm, name the accounts involved, give the modern class of each, and state which is debited and which is credited: (i) interest received in cash; (ii) furniture bought on credit from Rao Brothers; (iii) salaries paid in cash.',
  model: mdTable(['Transaction', 'Debited (class)', 'Credited (class)'], [
    rowMod('(i) Interest received in cash', [['Cash A/c', 'inc'], ['Interest Received A/c', 'inc']]),
    rowMod('(ii) Furniture bought on credit', [['Furniture A/c', 'inc'], ['Rao Brothers A/c (creditor)', 'inc']]),
    rowMod('(iii) Salaries paid in cash', [['Salaries A/c', 'inc'], ['Cash A/c', 'dec']]),
  ]),
  sol: 'Identify the two accounts in each transaction, then apply the rule for the class of each.',
  scheme: [['(i) both accounts, classes and sides', 1], ['(ii) both accounts, classes and sides', 1], ['(iii) both accounts, classes and sides', 1]],
}));
QQ('s3_two_ways', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: 'An imagined firm buys machinery for cash. Show how the traditional rules and the modern rules each lead to the same debit and credit.',
  model: '**Traditional:** machinery is a real account and the machinery comes in, so it is debited; cash is a real account and cash goes out, so it is credited.\n\n**Modern:** machinery is an asset that increases, and an increase in an asset is debited; cash is an asset that decreases, and a decrease in an asset is credited.\n\nBoth approaches give: Machinery A/c Dr, To Cash A/c.',
  sol: 'Apply each set of rules, then state the common result.',
  scheme: [['Traditional rules applied to both accounts', 1], ['Modern rules applied to both accounts', 1], ['Same entry stated', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_classify', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: 'Gwalior Brass Works, an imagined firm, has five transactions. For each, name the two accounts, classify them in the traditional and the modern way, and say which is debited and which is credited: (i) furniture bought for cash; (ii) insurance for the next year paid in cash; (iii) interest earned but not yet received; (iv) the account of a debtor, Meena Kapoor, written off as bad; (v) cash withdrawn by the owner for personal use.',
  model: mdTable(['Transaction', 'Debited (traditional; modern)', 'Credited (traditional; modern)'], [
    rowOf('(i) Furniture bought for cash', [['Furniture A/c', 'inc'], ['Cash A/c', 'dec']]),
    rowOf('(ii) Insurance paid for next year', [['Prepaid Insurance A/c', 'inc'], ['Cash A/c', 'dec']]),
    rowOf('(iii) Interest earned, not received', [['Accrued Interest A/c', 'inc'], ['Interest Received A/c', 'inc']]),
    rowOf('(iv) Debtor written off', [['Bad Debts A/c', 'inc'], ['Meena Kapoor A/c (debtor)', 'dec']]),
    rowOf('(v) Owner withdrew cash', [['Drawings A/c', 'inc'], ['Cash A/c', 'dec']]),
  ]),
  sol: 'For each transaction fix the accounts, classify both, then use the rule of its class to find the debit.',
  scheme: [['(i) classes and sides', 1], ['(ii) classes and sides', 1], ['(iii) classes and sides', 1], ['(iv) classes and sides', 1], ['(v) classes and sides', 1]],
}));
void inr;
