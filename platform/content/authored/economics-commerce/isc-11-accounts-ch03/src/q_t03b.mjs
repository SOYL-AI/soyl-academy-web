// t03 (written items): journal entries with narrations, compound and opening entries, error-finding. Imagined firms
// only. Every journal table in a model answer comes from journal() in acc.mjs, which asserts that each entry balances.
import { short, long } from './lib.mjs';
import { same, sum, inr, rs, mdTable, E, jm, journal } from './fig.mjs';
import { QQ } from './qq.mjs';

/** One entry on a line, for comparison tables. */
const line = (e) => {
  journal([e]);
  return [...e.dr.map(([a, x]) => `${a} Dr ${inr(x)}`), ...e.cr.map(([a, x]) => `To ${a} ${inr(x)}`)].join('; ');
};

// ================================================================ short answer, 2 marks
QQ('s2_journal_meaning', short({
  t: 3, d: 1, c: 'recall', marks: 2,
  stem: 'What is a journal? Name the columns in which an entry is written in it.',
  model: `The journal is the **book of original entry**: every transaction is first recorded in it, in the order of date, with the accounts to be debited and credited and a narration, before it is posted to the ledger.\n\n${mdTable(['Date', 'Particulars', 'L.F.', 'Debit amount (₹)', 'Credit amount (₹)'], [['2026 Oct 5', 'Purchases A/c Dr.', '', '12,000', ''], ['', '*To Cash A/c*', '', '', '12,000'], ['', '*(Being goods purchased for cash)*', '', '', '']])}`,
  sol: 'The first mark is the meaning; the second is the five columns of the ruling.',
  scheme: [['Meaning: book of original entry, recorded in date order', 1], ['Columns: date, particulars, ledger folio, debit and credit amounts', 1]],
}));
{
  const e = E('12 Aug 2026', [['Venu Rao A/c', 30000]], [['Cash A/c', 28500], ['Discount Received A/c', 1500]], 'Being cash paid to Venu Rao in full settlement of his account');
  same(30000 - 28500, 1500, 'Khammam discount received');
  QQ('s2_entry_discount', short({
    t: 3, d: 2, c: 'application', marks: 2,
    stem: `On 12 August 2026 Khammam Seeds, an imagined firm, paid ${rs(28500)} in cash to its supplier Venu Rao in full settlement of his account of ${rs(30000)}. Pass the journal entry with a narration.`,
    model: `${jm([e])}\n\nDiscount received = ${inr(30000)} − ${inr(28500)} = ${rs(1500)}, a gain credited to Discount Received A/c.`,
    sol: 'Debit the supplier with the full amount, then credit cash and the discount that makes up the difference.',
    scheme: [['Supplier debited with the full amount', 1], ['Cash and Discount Received credited, with narration', 1]],
  }));
}
{
  const es = [
    E('31 Mar 2027', [['Loss by Theft A/c', 8500]], [['Purchases A/c', 8500]], 'Being goods costing ₹8,500 stolen from the godown'),
    E('31 Mar', [['Depreciation A/c', 6000]], [['Furniture A/c', 6000]], 'Being depreciation charged on furniture'),
  ];
  QQ('s2_entry_loss_dep', short({
    t: 3, d: 2, c: 'application', marks: 2,
    stem: `Pass journal entries for Anantapur Rice Mill, an imagined firm, dated 31 March 2027: (i) goods costing ${rs(8500)} were stolen from the godown; (ii) depreciation of ${rs(6000)} is charged on furniture.`,
    model: jm(es),
    sol: 'A loss and a charge are debited as expenses; the goods and the asset that go out are credited.',
    scheme: [['(i) Loss by Theft debited, Purchases credited', 1], ['(ii) Depreciation debited, Furniture credited', 1]],
  }));
}
{
  const s = E(null, [['Rent A/c', 4000]], [['Cash A/c', 4000]], 'Being rent paid');
  const c = E(null, [['Cash A/c', 15000], ['Hema Rao A/c', 5000]], [['Sales A/c', 20000]], 'Being goods sold, part for cash and the balance on credit');
  QQ('s2_simple_compound', short({
    t: 3, d: 2, c: 'understanding', marks: 2,
    stem: 'Distinguish between a simple journal entry and a compound journal entry, with an imagined example of each.',
    model: `A **simple entry** debits one account and credits one account. A **compound entry** has more than one account on either the debit side or the credit side, or both, and combines several simple entries; its debit and credit totals are still equal.\n\n**Simple:**\n\n${jm([s])}\n\n**Compound:**\n\n${jm([c])}`,
    sol: 'One mark for the difference and one for the two examples.',
    scheme: [['Difference: one debit and one credit against several accounts on a side', 1], ['A correct example of each', 1]],
  }));
}

// ================================================================ short answer, 3 marks
{
  const es = [
    E('3 Feb 2027', [['Purchases A/c', 26000]], [['Cash A/c', 26000]], 'Being goods purchased for cash'),
    E('7 Feb', [['Pooja Shenoy A/c', 38000]], [['Sales A/c', 38000]], 'Being goods sold on credit to Pooja Shenoy'),
    E('11 Feb', [['Sales Return A/c', 3500]], [['Pooja Shenoy A/c', 3500]], 'Being goods returned by Pooja Shenoy'),
  ];
  QQ('s3_entries_basic', short({
    t: 3, d: 2, c: 'application', marks: 3,
    stem: `Pass journal entries in the books of Kalyan Zari Works, an imagined firm, for: (i) 3 February 2027, goods bought for cash ${rs(26000)}; (ii) 7 February, goods sold on credit to Pooja Shenoy ${rs(38000)}; (iii) 11 February, goods of ${rs(3500)} returned by Pooja Shenoy.`,
    model: jm(es),
    sol: 'Identify the two accounts in each transaction and apply the debit and credit rules.',
    scheme: [['(i) Purchases debited, Cash credited', 1], ['(ii) Pooja Shenoy debited, Sales credited', 1], ['(iii) Sales Return debited, Pooja Shenoy credited', 1]],
  }));
}
{
  const es = [
    E('10 Dec 2026', [['Drawings A/c', 12000]], [['Cash A/c', 12000]], 'Being cash withdrawn by the proprietor for personal use'),
    E('14 Dec', [['Drawings A/c', 3200]], [['Purchases A/c', 3200]], 'Being goods costing ₹3,200 taken by the proprietor'),
    E('20 Dec', [['Charity A/c', 1800]], [['Purchases A/c', 1800]], 'Being goods costing ₹1,800 given as charity'),
  ];
  QQ('s3_entries_drawings', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Pass journal entries with narrations for Moga Cycle Mart, an imagined firm: (i) 10 December 2026, the proprietor withdrew ${rs(12000)} in cash for personal use; (ii) 14 December, he took goods costing ${rs(3200)}; (iii) 20 December, goods costing ${rs(1800)} were given as charity.`,
    model: jm(es),
    sol: 'Drawings take the debit for the owner\'s withdrawals; goods that leave the stock are credited at cost.',
    scheme: [['(i) Drawings debited, Cash credited', 1], ['(ii) Drawings debited, Purchases credited', 1], ['(iii) Charity debited, Purchases credited', 1]],
  }));
}
{
  const es = [
    E('31 Mar 2027', [['Interest A/c', 5600]], [['Cash A/c', 5600]], 'Being interest paid on the bank loan'),
    E('31 Mar', [['Salaries A/c', 9000]], [['Outstanding Salaries A/c', 9000]], 'Being salaries of March outstanding'),
    E('31 Mar', [['Prepaid Insurance A/c', 2700]], [['Insurance A/c', 2700]], 'Being insurance paid in advance for the next year'),
  ];
  QQ('s3_entries_adjust', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Pass journal entries on 31 March 2027 in the books of Bellary Oil Mill, an imagined firm: (i) interest of ${rs(5600)} paid in cash on a bank loan; (ii) salaries of ${rs(9000)} for March are still outstanding; (iii) insurance of ${rs(2700)} has been paid in advance for the next year.`,
    model: jm(es),
    sol: 'An outstanding expense creates a liability; an advance payment creates an asset and reduces the expense of the year.',
    scheme: [['(i) Interest debited, Cash credited', 1], ['(ii) Salaries debited, Outstanding Salaries credited', 1], ['(iii) Prepaid Insurance debited, Insurance credited', 1]],
  }));
}
{
  const es = [
    E('5 Jan 2027', [['Machinery A/c', 150000]], [['Cash A/c', 100000], ['Kishan Das A/c', 50000]], 'Being machinery bought, part paid in cash and the balance owed to Kishan Das'),
    E('9 Jan', [['Cash A/c', 20000], ['Latif Khan A/c', 40000]], [['Sales A/c', 60000]], 'Being goods sold, one-third for cash and the balance due from Latif Khan'),
  ];
  same(60000 / 3, 20000, 'Sambhal cash share');
  QQ('s3_compound', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Pass compound journal entries for Sambhal Furniture Works, an imagined firm: (i) on 5 January 2027, machinery of ${rs(150000)} bought, ${rs(100000)} paid in cash and the balance owed to the supplier Kishan Das; (ii) on 9 January, goods sold for ${rs(60000)}, one-third received in cash and the balance due from Latif Khan.`,
    model: jm(es),
    sol: 'In each entry the amounts on the two sides must be equal; work out the balance of each transaction first.',
    scheme: [['(i) Machinery debited; cash and supplier credited with the split', 1], ['(ii) Cash and Latif Khan debited with the split', 1], ['(ii) Sales credited, with narrations', 1]],
  }));
}
{
  const o = {
    assets: [['Cash A/c', 18000], ['Bank A/c', 72000], ['Stock A/c', 95000], ['Imran Ali A/c', 26000], ['Machinery A/c', 190000]],
    liabilities: [['Gita Menon A/c', 44000], ['Loan from Vindhya Bank A/c', 70000]],
  };
  const cap = same(sum(o.assets.map((x) => x[1])) - sum(o.liabilities.map((x) => x[1])), 287000, 'Lucknow capital');
  const e = E('1 Apr 2026', o.assets, [...o.liabilities, ['Capital A/c', cap]], 'Being assets, liabilities and capital brought forward at the start of the year');
  QQ('s3_opening', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `On 1 April 2026 the books of Lucknow Chikan Works, an imagined firm, show: cash ${rs(18000)}, bank ${rs(72000)}, stock ${rs(95000)}, a debtor Imran Ali ${rs(26000)}, machinery ${rs(190000)}, a creditor Gita Menon ${rs(44000)} and a loan from a bank ${rs(70000)}. Pass the opening journal entry.`,
    model: `${jm([e])}\n\nCapital = ${inr(sum(o.assets.map((x) => x[1])))} − ${inr(sum(o.liabilities.map((x) => x[1])))} = ${rs(cap)}.`,
    sol: 'Debit every asset, credit every liability, and credit capital as the balancing figure.',
    scheme: [['All assets debited with correct amounts', 1], ['Liabilities credited', 1], ['Capital worked out and credited; narration', 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const es = [
    E('1 Sep 2026', [['Cash A/c', 200000]], [['Capital A/c', 200000]], 'Being business started with cash'),
    E('3 Sep', [['Purchases A/c', 55000]], [['Cash A/c', 55000]], 'Being goods purchased for cash'),
    E('5 Sep', [['Purchases A/c', 80000]], [['Girija Patel A/c', 80000]], 'Being goods purchased on credit from Girija Patel'),
    E('8 Sep', [['Ismail Sheikh A/c', 64000]], [['Sales A/c', 64000]], 'Being goods sold on credit to Ismail Sheikh'),
    E('10 Sep', [['Girija Patel A/c', 5000]], [['Purchases Return A/c', 5000]], 'Being goods returned to Girija Patel'),
    E('14 Sep', [['Cash A/c', 62720], ['Discount Allowed A/c', 1280]], [['Ismail Sheikh A/c', 64000]], 'Being cash received from Ismail Sheikh in full settlement of his account'),
    E('18 Sep', [['Girija Patel A/c', 75000]], [['Cash A/c', 72000], ['Discount Received A/c', 3000]], 'Being cash paid to Girija Patel in full settlement of her account'),
    E('25 Sep', [['Drawings A/c', 10000]], [['Cash A/c', 10000]], 'Being cash withdrawn by the proprietor for personal use'),
  ];
  same(80000 - 5000, 75000, 'Girija balance');
  same(64000 - 62720, 1280, 'Ismail discount');
  same(75000 - 72000, 3000, 'Girija discount');
  QQ('l5_journal_month', long({
    t: 3, d: 3, c: 'application', marks: 5,
    stem: `Journalise these transactions of Amravati Cotton Traders, an imagined firm, for September 2026 with narrations: 1 Sep, started business with cash ${rs(200000)}; 3 Sep, bought goods for cash ${rs(55000)}; 5 Sep, bought goods on credit from Girija Patel ${rs(80000)}; 8 Sep, sold goods on credit to Ismail Sheikh ${rs(64000)}; 10 Sep, returned goods worth ${rs(5000)} to Girija Patel; 14 Sep, received ${rs(62720)} in cash from Ismail Sheikh in full settlement of his account; 18 Sep, paid ${rs(72000)} in cash to Girija Patel in full settlement of her account; 25 Sep, the proprietor withdrew ${rs(10000)} in cash.`,
    model: `${jm(es)}\n\nDiscount allowed = ${inr(64000)} − ${inr(62720)} = ${rs(1280)}. Girija Patel's account stands at ${inr(80000)} − ${inr(5000)} = ${inr(75000)} when paid, so discount received = ${inr(75000)} − ${inr(72000)} = ${rs(3000)}.`,
    sol: 'Work out the two discounts first, then pass each entry with a narration.',
    scheme: [['Commencement and the cash purchase', 1], ['Credit purchase and credit sale', 1], ['Return and the receipt with discount allowed', 1], ['Payment with discount received', 1], ['Drawings, narrations and totals', 1]],
  }));
}
{
  const es = [
    E('31 Mar 2027', [['Loss by Fire A/c', 14000]], [['Purchases A/c', 14000]], 'Being goods costing ₹14,000 destroyed by fire'),
    E('31 Mar', [['Charity A/c', 2000]], [['Purchases A/c', 2000]], 'Being goods costing ₹2,000 given as charity'),
    E('31 Mar', [['Bad Debts A/c', 4500]], [['Pramod Jha A/c', 4500]], 'Being the account of Pramod Jha written off as bad'),
    E('31 Mar', [['Depreciation A/c', 12000]], [['Machinery A/c', 12000]], 'Being depreciation charged on machinery'),
    E('31 Mar', [['Wages A/c', 6000]], [['Outstanding Wages A/c', 6000]], 'Being wages of March outstanding'),
    E('31 Mar', [['Prepaid Insurance A/c', 3600]], [['Insurance A/c', 3600]], 'Being insurance paid in advance for the next year'),
    E('31 Mar', [['Interest A/c', 7500]], [['Cash A/c', 7500]], 'Being interest paid on the loan'),
  ];
  QQ('l5_journal_losses', long({
    t: 3, d: 3, c: 'application', marks: 5,
    stem: `Pass journal entries with narrations on 31 March 2027 for Rajkot Umbrella Works, an imagined firm: (i) goods costing ${rs(14000)} destroyed by fire; (ii) goods costing ${rs(2000)} given as charity; (iii) the account of a debtor, Pramod Jha, ${rs(4500)}, written off as bad; (iv) depreciation of ${rs(12000)} on machinery; (v) wages of ${rs(6000)} outstanding; (vi) insurance of ${rs(3600)} paid in advance for the next year; (vii) interest of ${rs(7500)} paid in cash on a loan.`,
    model: jm(es),
    sol: 'Classify each item as a loss, an expense, an asset or a liability, then debit and credit accordingly.',
    scheme: [['(i) and (ii): losses debited, Purchases credited', 1], ['(iii) Bad Debts debited, debtor credited', 1], ['(iv) Depreciation debited, Machinery credited', 1], ['(v) and (vi): outstanding wages and prepaid insurance', 1], ['(vii) Interest, with narrations for all', 1]],
  }));
}
{
  const o = {
    assets: [['Cash A/c', 35000], ['Bank A/c', 120000], ['Stock A/c', 105000], ['Rohan Das A/c', 40000], ['Furniture A/c', 60000]],
    liabilities: [['Gita Roy A/c', 55000], ['Bank Loan A/c', 80000]],
  };
  const cap = same(sum(o.assets.map((x) => x[1])) - sum(o.liabilities.map((x) => x[1])), 225000, 'Siliguri capital');
  const es = [
    E('1 Apr 2026', o.assets, [...o.liabilities, ['Capital A/c', cap]], 'Being assets, liabilities and capital brought forward at the start of the year'),
    E('3 Apr', [['Purchases A/c', 45000]], [['Gita Roy A/c', 45000]], 'Being goods purchased on credit from Gita Roy'),
    E('9 Apr', [['Cash A/c', 30000], ['Rohan Das A/c', 40000]], [['Sales A/c', 70000]], 'Being goods sold, part for cash and the balance on credit to Rohan Das'),
    E('15 Apr', [['Cash A/c', 79000], ['Discount Allowed A/c', 1000]], [['Rohan Das A/c', 80000]], 'Being cash received from Rohan Das in full settlement of his account'),
    E('20 Apr', [['Drawings A/c', 4000]], [['Purchases A/c', 4000]], 'Being goods costing ₹4,000 taken by the proprietor'),
  ];
  same(40000 + 40000 - 79000, 1000, 'Siliguri discount');
  QQ('l5_opening_entries', long({
    t: 3, d: 4, c: 'application', marks: 5,
    stem: `On 1 April 2026 the books of Siliguri Tea Mart, an imagined firm, show: cash ${rs(35000)}, bank ${rs(120000)}, stock ${rs(105000)}, a debtor Rohan Das ${rs(40000)}, furniture ${rs(60000)}, a creditor Gita Roy ${rs(55000)} and a bank loan ${rs(80000)}. Pass the opening entry and journalise: 3 April, goods bought on credit from Gita Roy ${rs(45000)}; 9 April, goods sold for ${rs(70000)}, ${rs(30000)} received in cash and the balance due from Rohan Das; 15 April, ${rs(79000)} received in cash from Rohan Das in full settlement of his account; 20 April, goods costing ${rs(4000)} taken by the proprietor.`,
    model: `${jm(es)}\n\nCapital in the opening entry = ${inr(sum(o.assets.map((x) => x[1])))} − ${inr(sum(o.liabilities.map((x) => x[1])))} = ${rs(cap)}. Rohan Das owes ${inr(40000)} + ${inr(40000)} = ${inr(80000)} on 15 April, so discount allowed = ${inr(80000)} − ${inr(79000)} = ${rs(1000)}.`,
    sol: 'Open the books first, then pass each transaction; the debtor\'s balance on the date of settlement fixes the discount.',
    scheme: [['Opening entry: assets debited and liabilities credited', 1], ['Capital as the balancing figure', 1], ['3 April and 9 April entries', 1], ['15 April entry with discount allowed', 1], ['20 April entry and narrations', 1]],
  }));
}
{
  const rows = [
    ['(i) Goods of ₹6,000 given as charity', E(null, [['Purchases A/c', 6000]], [['Charity A/c', 6000]], 'x'), 'The two accounts are interchanged: the gift is a loss, so Charity is debited and the goods leaving the stock are credited to Purchases', E(null, [['Charity A/c', 6000]], [['Purchases A/c', 6000]], 'x')],
    ['(ii) Goods of ₹4,000 taken by the proprietor', E(null, [['Drawings A/c', 4000]], [['Sales A/c', 4000]], 'x'), 'No sale is made; goods leaving at cost are credited to Purchases', E(null, [['Drawings A/c', 4000]], [['Purchases A/c', 4000]], 'x')],
    ['(iii) Debtor Ketan Shah of ₹3,500 written off', E(null, [['Bad Debts A/c', 3500]], [['Cash A/c', 3500]], 'x'), 'No cash is paid; the debtor\'s balance is cleared', E(null, [['Bad Debts A/c', 3500]], [['Ketan Shah A/c', 3500]], 'x')],
    ['(iv) Wages of ₹7,000 outstanding', E(null, [['Wages A/c', 7000]], [['Cash A/c', 7000]], 'x'), 'The wages are unpaid, so a liability is created', E(null, [['Wages A/c', 7000]], [['Outstanding Wages A/c', 7000]], 'x')],
    ['(v) Machinery of ₹90,000 bought on credit from Surya Engineering', E(null, [['Purchases A/c', 90000]], [['Surya Engineering A/c', 90000]], 'x'), 'Machinery is an asset, not goods for resale, so it is debited to its own account', E(null, [['Machinery A/c', 90000]], [['Surya Engineering A/c', 90000]], 'x')],
  ];
  QQ('l5_error_journal', long({
    t: 3, d: 4, c: 'analysis', marks: 5,
    stem: `The accountant of Rohtak Footwear, an imagined firm, passed these entries: (i) for goods of ${rs(6000)} given as charity, Purchases A/c Dr and To Charity A/c; (ii) for goods of ${rs(4000)} taken by the proprietor, Drawings A/c Dr and To Sales A/c; (iii) for the account of a debtor Ketan Shah of ${rs(3500)} written off, Bad Debts A/c Dr and To Cash A/c; (iv) for wages of ${rs(7000)} outstanding, Wages A/c Dr and To Cash A/c; (v) for machinery of ${rs(90000)} bought on credit from Surya Engineering, Purchases A/c Dr and To Surya Engineering A/c. Find the error in each and give the correct entry.`,
    model: mdTable(['Transaction', 'Entry passed', 'Error', 'Correct entry'], rows.map(([t, w, err, c]) => [t, line(w), err, line(c)])),
    sol: 'Ask of each entry what really happened, then test every account against its rule.',
    scheme: [['(i) error and correct entry', 1], ['(ii) error and correct entry', 1], ['(iii) error and correct entry', 1], ['(iv) error and correct entry', 1], ['(v) error and correct entry', 1]],
  }));
}
