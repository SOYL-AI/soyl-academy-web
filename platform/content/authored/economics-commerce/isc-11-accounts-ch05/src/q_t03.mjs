// t03 (objective items): the triple column cash book: contra entries, cheques (same day, not deposited the same day,
// dishonoured), discount columns, bank overdraft. Imagined firms; amounts computed with cb.mjs and asserted.
import { mcq, ar, tf, fb } from './lib.mjs';
import { same, inr, rs, cashBook, R, P, DEP, WD } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_triple_cols', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Udaya Pens, an imagined firm with a current account at a bank, keeps a cash book with three money columns on each side. The columns are',
  opts: ['discount, cash and bank', 'cash, bank and petty cash', 'debit, credit and balance', 'date, folio and amount'],
  sol: 'A triple column cash book adds a bank column and a discount column to the cash column. Petty cash is kept in a separate book, and the other two sets are headings of other kinds of ruling.',
}));
QQ('m_contra_which', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Of the transactions of Varun Toys, an imagined shop, listed below, the one that is a contra entry is',
  opts: ['withdrawal of ₹7,500 from the bank for use in the office', 'payment of rent of ₹7,500 by cheque', 'sale of goods for ₹7,500 in cash', 'allowing a discount of ₹7,500 to a customer'],
  sol: 'A contra entry moves money between the cash column and the bank column, so the withdrawal stands on both sides of the same book. Rent by cheque touches the bank and a nominal account, cash sales touch cash and sales, and a discount touches a personal account.',
}));
QQ('m_chk_contra', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Hemant Rao, a customer, gave Madhav Electronics, an imagined shop, a cheque for ₹14,000 on 6 March, and the shop paid it into the bank on 9 March. In the cash book the entry made on 9 March is',
  opts: ['a debit in the bank column, To Cash A/c, and a credit in the cash column, By Bank A/c, marked C', 'a debit in the bank column, To Hemant Rao', 'a debit in the cash column, To Hemant Rao', 'a credit in the bank column, By Hemant Rao'],
  sol: 'On 6 March the cheque was entered in the cash column against Hemant Rao. Paying it in on 9 March only moves it from cash to bank, a contra entry on both sides. A second entry against the customer would count the same cheque twice.',
}));
QQ('m_cheque_same', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On 4 September Jaya Sports, an imagined shop, received a cheque for ₹9,500 from a debtor, Sohan Lal, after allowing him a discount of ₹500, and deposited it the same day. The entry in the cash book is',
  opts: ['debit side: To Sohan Lal, discount ₹500, bank ₹9,500', 'debit side: To Sohan Lal, discount ₹500, cash ₹9,500', 'credit side: By Sohan Lal, discount ₹500, bank ₹9,500', 'debit side: To Sohan Lal, bank ₹10,000, with no discount shown'],
  sol: 'A cheque paid in at once raises the bank balance, a receipt on the debit side, and the discount allowed is entered beside it in the debit discount column. The cash column is not touched, a credit entry would be a payment, and showing ₹10,000 in the bank would overstate the receipt.',
}));
{
  const disc = { allowed: 2350, received: 1100 };
  QQ('m_disc_post', mcq({
    t: 3, d: 3, c: 'application',
    stem: `At the end of the month the discount column on the debit side of the cash book of Tushar Tyres, an imagined firm, totals ${rs(disc.allowed)} and the one on the credit side totals ${rs(disc.received)}. The posting to the ledger is`,
    opts: [`debit Discount Allowed A/c with ${rs(disc.allowed)} and credit Discount Received A/c with ${rs(disc.received)}`, `credit Discount Allowed A/c with ${rs(disc.allowed)} and debit Discount Received A/c with ${rs(disc.received)}`, `debit both discount accounts with ${rs(disc.allowed - disc.received)}`, `credit both discount accounts with ${rs(disc.allowed + disc.received)}`],
    sol: `The debit column holds discounts allowed to customers, a loss of the firm, so it is posted as a debit to Discount Allowed. The credit column holds discounts received from suppliers, a gain, so it is a credit to Discount Received. The other options reverse the sides, or merge the two totals into ${rs(disc.allowed - disc.received)} or ${rs(disc.allowed + disc.received)}, which loses the separate accounts.`,
  }));
}
QQ('m_od_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On 30 June, the balance of the bank column in the triple column cash book of Rohini Crafts, an imagined firm, is carried down on the debit side. This shows',
  opts: ['an overdraft: the firm has paid out more through the bank than it paid in', 'a favourable balance at the bank', 'discount allowed to the debtors of the firm', 'cash in hand at the close of the month'],
  sol: 'A favourable bank balance is carried down on the credit side. When the balance goes on the debit side, the bank column has a credit balance, which means the bank has lent the difference. It has nothing to do with the discount or the cash column.',
}));
{
  const amt = 7000;
  QQ('m_dishonour', mcq({
    t: 3, d: 3, c: 'application',
    stem: `A cheque for ${rs(amt)} received from Pooja Verma and deposited by Leela Textiles, an imagined firm, is returned unpaid by the bank. The entry in the cash book is`,
    opts: ['a credit in the bank column, By Pooja Verma', 'a debit in the bank column, To Pooja Verma', 'a credit in the cash column, By Pooja Verma', 'a debit in the discount column, To Pooja Verma'],
    sol: `The bank balance of ${rs(amt)} that was added on deposit is taken back, a payment on the credit side of the bank column, and Pooja Verma is debited again in the ledger because she still owes the amount. A debit would repeat the receipt, and the cash column and the discount column are not involved.`,
  }));
}
QQ('m_disc_balanced', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement about the discount columns of a triple column cash book is correct?',
  opts: ['They are only totalled, the two totals usually differ, and each is posted to its discount account', 'They are balanced like the cash column and the balance is carried down', 'They are posted to the personal accounts only and never to a discount account', 'They are not posted anywhere, because discount is not an accounting item'],
  sol: 'The two discount totals are independent of each other and of the cash and bank columns, so there is no balance to carry down. Each total is posted once, while the individual items are posted to the personal accounts. Discount allowed and received are accounting items with accounts of their own.',
}));
QQ('m_notdep_why', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Dev Furniture, an imagined shop, received a customer\'s cheque on 12 May and paid it into the bank only on 15 May. Why is the cheque first entered in the cash column?',
  opts: ['Until it is paid in, the firm holds the cheque and has no balance at the bank, so a contra entry is needed on deposit', 'A cheque is always the same as cash in hand and never reaches the bank column', 'The bank column is meant only for payments', 'The customer\'s account is not credited until the cheque is cleared'],
  sol: 'The bank column shows what the bank holds for the firm. A cheque kept in the drawer is held by the firm, so it joins the cash column, and the later deposit moves it across by a contra entry. The cheque does reach the bank column on deposit, the bank column also takes receipts, and the customer is credited when the cheque is received.',
}));

// ================================================================ assertion-reason
QQ('ar_contra', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The deposit of cash into the bank is written twice in the cash book of an imagined firm, once on each side.',
  r: 'A contra entry affects both the cash column and the bank column of the same book.',
  sol: 'Both are true. Cash leaves the cash column on the credit side and arrives in the bank column on the debit side, which is why the single transaction needs two lines.',
}));
QQ('ar_disc', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-false',
  a: 'The discount columns of a triple column cash book are balanced at the end of the period and the balance is carried down.',
  r: 'Discount allowed and discount received are both expenses of the business.',
  sol: 'Both are false. The discount columns are totalled and posted to the discount accounts, not balanced, and discount received is a gain, not an expense.',
}));
QQ('ar_od', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A bank overdraft is a credit balance in the bank column of the cash book.',
  r: 'An overdraft means the bank owes the firm money.',
  sol: 'A is true: the firm has paid out more than it deposited. R is false, because in an overdraft it is the firm that owes the bank.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_od_credit', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'In the triple column cash book of an imagined firm that has overdrawn its bank account, the balance c/d of the bank column is written on the debit side.',
  sol: 'An overdraft is a credit balance of the bank column, so it is carried down on the side with the smaller total, the debit side, and brought down on the credit side.',
}));
QQ('tf_disc_posted', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'The total of the discount column on the credit side of the cash book of an imagined trader is posted to the credit of Discount Allowed A/c.',
  sol: 'The credit column holds discounts received from suppliers, so its total is credited to Discount Received A/c. Discount Allowed A/c takes the total of the debit column.',
}));
QQ('fb_contra', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'An entry that appears on both sides of the cash book is a ___ entry and is marked ___ in the L.F. column; the discount column on the debit side is headed discount ___.',
  acc: [['contra'], ['C'], ['allowed']],
  sol: 'A contra entry is marked C and is shown on both sides; the debit side discount column holds discount allowed.',
}));

// ================================================================ numerical
{
  const cb = cashBook({
    open: { cash: 7000, bank: 20000 },
    items: [R('2', 'Sales A/c', { cash: 4000 }), DEP('3', 5000), R('6', 'Dhruv Anand', { bank: 12000 }), P('9', 'Rao Papers', { bank: 9000 })],
  });
  same(cb.bank, 20000 + 5000 + 12000 - 9000, 'n_chk_bank');
  QQ('n_chk_bank', numQ({
    t: 3, d: 2, c: 'application', value: cb.bank,
    stem: `Madhav Electronics, an imagined shop, had ${rs(7000)} in cash and ${rs(20000)} at the bank on 1 July. It made cash sales of ${rs(4000)}, deposited ${rs(5000)} of cash in the bank, received a cheque for ${rs(12000)} from Dhruv Anand and deposited it at once, and paid ${rs(9000)} to Rao Papers by cheque. Find the balance in the bank column at the end of the month (in ₹).`,
    sol: `Bank column: ${inr(20000)} + ${inr(5000)} + ${inr(12000)} − ${inr(9000)} = ${rs(cb.bank)}. The cash sales belong to the cash column only.`,
  }));
}
{
  const cb = cashBook({
    open: { cash: 4000, bank: -18500 },
    items: [R('3', 'Sales A/c', { cash: 9000 }), R('6', 'Omar Sheikh', { bank: 25000 }), DEP('10', 6000), P('15', 'Kumar Timber', { bank: 31000 }), P('24', 'Bank Charges A/c', { bank: 650 }), P('30', 'Interest on Overdraft A/c', { bank: 1350 })],
  });
  same(cb.bank, -18500 + 25000 + 6000 - 31000 - 650 - 1350, 'n_od');
  same(-cb.bank, 20500, 'n_od value');
  QQ('n_od', numQ({
    t: 3, d: 4, c: 'application', value: -cb.bank,
    stem: `On 1 November Dev Furniture, an imagined shop, had ${rs(4000)} in cash and a bank overdraft of ${rs(18500)}. During the month it made cash sales of ${rs(9000)}, received and deposited a cheque of ${rs(25000)} from Omar Sheikh, deposited ${rs(6000)} of cash, paid ${rs(31000)} to Kumar Timber by cheque, and was charged ${rs(650)} as bank charges and ${rs(1350)} as interest on the overdraft. Find the overdraft at the end of the month (in ₹).`,
    sol: `Credits to the bank column = ${inr(18500)} + ${inr(31000)} + ${inr(650)} + ${inr(1350)} = ${inr(51500)}; debits = ${inr(25000)} + ${inr(6000)} = ${inr(31000)}; overdraft = ${inr(51500)} − ${inr(31000)} = ${rs(-cb.bank)}.`,
  }));
}
{
  const cb = cashBook({
    open: { cash: 0, bank: 0 },
    items: [R('4', 'Dilip Rane', { bank: 7600, disc: 400 }), R('9', 'Esha Kulkarni', { bank: 4750, disc: 250 }), R('20', 'Farid Khan', { bank: 11400, disc: 600 })],
  });
  same(cb.discAllowed, 1250, 'n_disc_total');
  same(8000 - 7600 + 5000 - 4750 + 12000 - 11400, 1250, 'n_disc_total by balances');
  QQ('n_disc_total', numQ({
    t: 3, d: 3, c: 'application', value: cb.discAllowed,
    stem: `Aman Auto Spares, an imagined firm, settled three debtors in full by cheque: Dilip Rane owed ${rs(8000)} and paid ${rs(7600)}; Esha Kulkarni owed ${rs(5000)} and paid ${rs(4750)}; Farid Khan owed ${rs(12000)} and paid ${rs(11400)}. Find the total of the discount column on the debit side of the cash book, which is posted to Discount Allowed A/c (in ₹).`,
    sol: `Discount on each account = amount owed − amount paid: ${inr(8000 - 7600)}, ${inr(5000 - 4750)} and ${inr(12000 - 11400)}. Total = ${inr(400)} + ${inr(250)} + ${inr(600)} = ${rs(cb.discAllowed)}.`,
  }));
}
void WD;
