// Objective items for ch03: multiple choice, assertion-reason, true-false, fill-blank, match, ordering.
// Every firm and person is imagined; every derived amount is computed and asserted.
import { mcq, ar, tf, fb, match, ord } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, inr, rs, gst, ledger } from './figures.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice: t01
QQ('m_txn', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following is a business transaction to be recorded in the books of Pradhan Tea House, an imagined cafe?',
  opts: ['Buying a coffee machine worth ₹45,000 on credit from a supplier', 'The owner deciding to open a second branch next year', 'A customer asking the price of snacks on the phone', 'The manager promising to improve the service'],
  sol: 'A business transaction is an exchange of money or money\'s worth with an outsider that can be measured in money. The purchase has a value and an outsider; a plan, an enquiry and a promise involve no exchange yet.',
}));
QQ('m_doc_id', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Chandni Garments, an imagined shop, sells a kurta for cash to a walk-in customer. The document handed to the customer as proof of this cash sale is a',
  opts: ['cash memo', 'debit note', 'pay-in-slip', 'credit note'],
  sol: 'A cash memo is prepared by the seller for a cash sale. A debit note and a credit note deal with returns and adjustments between parties, and a pay-in-slip is a bank form for deposits.',
}));
QQ('m_invoice', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Narmada Paper Depot, an imagined wholesaler, dispatches goods on credit to Vikas Stationers with a bill listing the goods, quantity, rate, tax and amount due. For Vikas Stationers this document is the source document for recording a',
  opts: ['credit purchase', 'cash sale', 'cash purchase', 'withdrawal by the proprietor'],
  sol: 'An invoice is made out by the seller for goods sold on credit; the buyer uses it to record a credit purchase. It does not support a cash transaction or drawings.',
}));
const RET = 4000;
QQ('m_debitnote', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Vikas Stationers, an imagined shop, returns defective notebooks worth ${rs(RET)} to its supplier and sends a document informing the supplier that the supplier's account is being debited with that amount. This document is a`,
  opts: ['debit note', 'credit note', 'cash memo', 'pay-in-slip'],
  sol: 'The buyer who returns goods sends a debit note to the supplier, because the supplier\'s account is debited in the buyer\'s books. The supplier replies with a credit note. A cash memo and a pay-in-slip are not used for returns.',
}));
QQ('m_creditnote', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Sagar Tools, an imagined dealer, accepts goods worth ${rs(RET)} returned by a customer and informs the customer in writing that the customer's account has been credited. The document sent is a`,
  opts: ['credit note', 'debit note', 'invoice', 'receipt'],
  sol: 'The seller who accepts returned goods sends a credit note: the customer\'s account is credited. A debit note is sent by the party returning the goods, an invoice is for a sale, and a receipt acknowledges money received.',
}));
QQ('m_payin', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Tarun Hardware, an imagined shop, deposits ₹25,000 in cash in its bank account by filling in a form whose counterfoil is returned to it as proof. This form is a',
  opts: ['pay-in-slip', 'cheque', 'cash memo', 'debit note'],
  sol: 'A pay-in-slip is the bank form used to deposit cash or cheques; its counterfoil is the depositor\'s proof. A cheque is an order to pay, a cash memo records a sale, and a debit note concerns returns.',
}));
QQ('m_voucher_cash', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The cashier of an imagined firm prepares a voucher for ₹6,500 received in cash from a debtor. This is a',
  opts: ['credit voucher', 'debit voucher', 'journal voucher', 'transfer voucher'],
  sol: 'A voucher for cash received is a credit voucher, and a voucher for cash paid is a debit voucher. A journal or transfer voucher is prepared for a transaction in which no cash moves.',
}));

// ================================================================ multiple choice: t02
QQ('m_eq_effect', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Sana Boutique, an imagined firm, buys furniture for ₹30,000 and pays by cheque. The effect on the accounting equation is',
  opts: ['one asset increases and another asset decreases by ₹30,000, so both sides are unchanged', 'assets and liabilities both increase by ₹30,000', 'assets and capital both decrease by ₹30,000', 'assets and capital both increase by ₹30,000'],
  sol: 'Furniture rises and the bank balance falls by the same amount, so total assets, liabilities and capital stay as they were. No liability or capital is touched.',
}));
const EX = { cash: 7500 };
QQ('m_eq_expense', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Mohan Bakers, an imagined bakery, paid ${rs(EX.cash)} in cash as electricity charges for the month. On the accounting equation this`,
  opts: [`decreases assets and capital by ${rs(EX.cash)} each`, `decreases assets and liabilities by ${rs(EX.cash)} each`, `increases one asset and decreases another by ${rs(EX.cash)}`, `increases capital and liabilities by ${rs(EX.cash)} each`],
  sol: 'An expense reduces profit and therefore capital, and the cash paid reduces an asset by the same amount. A liability is neither paid nor reduced, and no asset is acquired.',
}));
const NK = { assets: 300000, outside: 80000, drawn: 20000 };
NK.capBefore = same(NK.assets - NK.outside, 220000, 'Nikhil capital before');
NK.capAfter = same(NK.capBefore - NK.drawn, 200000, 'Nikhil capital after');
QQ('m_eq_cap', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Nikhil Optics, an imagined firm, has assets of ${rs(NK.assets)} and outside liabilities of ${rs(NK.outside)}. The proprietor then withdraws ${rs(NK.drawn)} in cash for household use. Capital after the withdrawal is`,
  opts: [rs(NK.capAfter), rs(NK.capBefore), rs(NK.assets - NK.drawn), rs(NK.capBefore + NK.drawn)],
  sol: `Capital before = ${inr(NK.assets)} − ${inr(NK.outside)} = ${rs(NK.capBefore)}. Drawings reduce it by ${rs(NK.drawn)} to ${rs(NK.capAfter)}. ${rs(NK.capBefore)} ignores the withdrawal, ${rs(NK.assets - NK.drawn)} forgets the liabilities, and ${rs(NK.capBefore + NK.drawn)} adds the drawings instead of deducting them.`,
}));
QQ('m_eq_loan', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Rekha Textiles, an imagined firm, repays ₹15,000 of its bank loan in cash. On the accounting equation, this transaction',
  opts: ['decreases an asset (cash) and a liability (bank loan) by ₹15,000 each', 'decreases an asset and capital by ₹15,000 each', 'increases a liability and capital by ₹15,000 each', 'leaves total assets unchanged'],
  sol: 'Cash falls and the loan owed falls by the same amount, so the equation stays balanced and capital is not touched. Repaying a loan is not an expense and does not reduce capital.',
}));

// ================================================================ multiple choice: t03
QQ('m_rule_drawings', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'When the proprietor of an imagined firm withdraws cash for personal use, the accounts affected are recorded as',
  opts: ['Drawings A/c debited and Cash A/c credited', 'Cash A/c debited and Drawings A/c credited', 'Capital A/c credited and Cash A/c debited', 'Salaries A/c debited and Cash A/c credited'],
  sol: 'Drawings reduce capital, so by the equation approach Drawings A/c is debited, and the fall in the asset cash is a credit. The other pairs reverse the rule or use an account that has nothing to do with personal withdrawals.',
}));
QQ('m_rule_asset', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Vasant Stores, an imagined shop, buys a computer for cash. Which is the correct journal entry?',
  opts: ['Computer A/c Dr. and To Cash A/c', 'Cash A/c Dr. and To Computer A/c', 'Computer A/c Dr. and To Capital A/c', 'Purchases A/c Dr. and To Cash A/c'],
  sol: 'The computer is an asset that increases, so it is debited; cash, also an asset, decreases, so it is credited. The second option reverses the rule, the third wrongly credits capital, and a computer is not goods bought for resale, so Purchases A/c is wrong.',
}));
QQ('m_rule_income', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following accounts is credited when its amount increases?',
  opts: ['Commission Received A/c', 'Rent A/c', 'Drawings A/c', 'Furniture A/c'],
  sol: 'An increase in revenue or income is credited. Rent paid is an expense, drawings reduce capital, and furniture is an asset, so each of these is debited when it increases.',
}));
QQ('m_narration', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The brief explanation of a journal entry, written in brackets just below the entry, is called',
  opts: ['narration', 'folio', 'voucher', 'posting'],
  sol: 'Narration states the reason for the entry, usually beginning with the word Being. A folio is a page reference, a voucher is the supporting paper, and posting is the transfer to the ledger.',
}));
QQ('m_compound', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A journal entry that debits two accounts and credits one account for a single transaction is called a',
  opts: ['compound entry', 'simple entry', 'closing entry', 'reversing entry'],
  sol: 'An entry with more than one debit or more than one credit is a compound entry. A simple entry has one debit and one credit. Closing and reversing entries are different in purpose and are not described by the number of accounts.',
}));
const AG = { cash: 45000, stock: 60000, furn: 30000, cred: 35000 };
AG.assets = AG.cash + AG.stock + AG.furn;
AG.cap = same(AG.assets - AG.cred, 100000, 'Anand opening capital');
QQ('m_opening', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Anand Gifts, an imagined firm, begins its new year with cash ${rs(AG.cash)}, stock ${rs(AG.stock)} and furniture ${rs(AG.furn)}, and owes ${rs(AG.cred)} to creditors. In the opening entry, Capital A/c is`,
  opts: [`credited with ${rs(AG.cap)}`, `debited with ${rs(AG.cap)}`, `credited with ${rs(AG.assets)}`, `credited with ${rs(AG.cred)}`],
  sol: `Assets ${rs(AG.assets)} are debited and creditors ${rs(AG.cred)} and capital are credited. Capital = ${inr(AG.assets)} − ${inr(AG.cred)} = ${rs(AG.cap)}, a credit. ${rs(AG.assets)} forgets the liability, and ${rs(AG.cred)} is the liability, not the capital. Capital is never debited in the opening entry.`,
}));
const BC = { goods: 20000, rate: 18 };
BC.g = gst(BC.goods, BC.rate);
same(BC.g.tax, 3600, 'Bharat tax');
same(BC.g.cgst, 1800, 'Bharat CGST');
QQ('m_gst_entry', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Bharat Cycles, an imagined firm, buys goods worth ${rs(BC.goods)} on credit from Ravi Traders in its own state. Goods and services tax at an imagined rate of ${BC.rate}% is charged and splits equally into CGST and SGST. The journal entry debits`,
  opts: [`Purchases A/c ${rs(BC.goods)}, Input CGST A/c ${rs(BC.g.cgst)} and Input SGST A/c ${rs(BC.g.sgst)}`, `Purchases A/c ${rs(BC.goods + BC.g.tax)} only`, `Purchases A/c ${rs(BC.goods)}, Output CGST A/c ${rs(BC.g.cgst)} and Output SGST A/c ${rs(BC.g.sgst)}`, `Ravi Traders A/c ${rs(BC.goods + BC.g.tax)}`],
  sol: `Tax paid on a purchase is an input credit, an asset, so Input CGST and Input SGST are debited with ${rs(BC.g.cgst)} each beside Purchases ${rs(BC.goods)}; the credit to Ravi Traders is ${rs(BC.goods + BC.g.tax)}. Debiting Purchases with the whole amount loses the credit, output accounts are credited on sales, and Ravi Traders is credited, not debited.`,
}));
QQ('m_traditional', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the traditional approach to debit and credit, wages paid in an imagined workshop belong to a',
  opts: ['nominal account, debited when the expense is incurred', 'personal account, credited when the wages are paid', 'real account, debited when the wages are paid', 'nominal account, credited when the expense is incurred'],
  sol: 'Expenses and losses are nominal accounts, and the rule is to debit all expenses and losses. Wages are not a person, so the account is not personal, and they are not a thing the firm owns, so it is not real.',
}));

// ================================================================ multiple choice: t04
QQ('m_ledger_fmt', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In the standard format of a ledger account, each particular on the debit side is written with the word',
  opts: ['To on the debit side and By on the credit side', 'By on the debit side and To on the credit side', 'Dr. on the debit side and Cr. on the credit side', 'From on the debit side and For on the credit side'],
  sol: 'The convention is To for the debit side and By for the credit side. The other options reverse the words or use words that are not part of the format.',
}));
const BB = { dr: [['To Balance b/d', 52000], ['To Sales A/c', 78500], ['To Debtor A/c', 54000]], cr: [['By Purchases A/c', 46000], ['By Rent A/c', 30000]] };
const BBL = ledger({ name: 'Cash A/c', dr: BB.dr, cr: BB.cr });
BBL.drT = sum(BB.dr.map(([, a]) => a));
BBL.crT = sum(BB.cr.map(([, a]) => a));
same(BBL.balance, BBL.drT - BBL.crT, 'balance of Cash for m_balance_cd');
same(BBL.balance, 108500, 'm_balance_cd balance');
QQ('m_balance_cd', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Before balancing, the debit side of the Cash A/c of an imagined firm totals ${rs(BBL.drT)} and the credit side ${rs(BBL.crT)}. The balancing entry is`,
  opts: [`By Balance c/d ${rs(BBL.balance)} on the credit side`, `To Balance c/d ${rs(BBL.balance)} on the debit side`, `By Balance c/d ${rs(BBL.drT + BBL.crT)} on the credit side`, `To Balance b/d ${rs(BBL.balance)} on the debit side of the same period`],
  sol: `The debit side is larger by ${inr(BBL.drT)} − ${inr(BBL.crT)} = ${rs(BBL.balance)}, so a debit balance is carried down by writing By Balance c/d on the credit side, and both sides total ${rs(BBL.drT)}. Writing it on the debit side would make the sides unequal, and ${rs(BBL.drT + BBL.crT)} adds the two totals. Balance b/d belongs to the start of the next period.`,
}));
QQ('m_folio', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After an entry has been posted to the ledger, the page number of the ledger account is written in',
  opts: ['the L.F. column of the journal', 'the J.F. column of the journal', 'the narration of the journal entry', 'the date column of the ledger'],
  sol: 'The ledger folio (L.F.) column of the journal shows where the account is posted, and the journal folio (J.F.) column of the ledger shows the journal page the entry came from. Narration and date columns are not for page references.',
}));
QQ('m_credit_bal', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'After balancing, the account of Gulab Traders, an imagined supplier, in the books of Mohit Stores shows a credit balance of ₹18,000. This means that',
  opts: ['Mohit Stores owes ₹18,000 to Gulab Traders', 'Gulab Traders owes ₹18,000 to Mohit Stores', 'Mohit Stores holds an asset of ₹18,000 against Gulab Traders', 'the account of Gulab Traders has been closed'],
  sol: 'A credit balance in a personal account is a liability: the firm owes that amount, here to a creditor. A debit balance in a personal account would mean the party owes the firm. A balance does not mean the account is closed.',
}));
QQ('m_jl', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which statement correctly relates the journal and the ledger of an imagined firm?',
  opts: ['The journal records transactions in date order and the ledger groups them account by account from the journal', 'The ledger is written first and the journal is prepared from it', 'The journal groups transactions account by account and the ledger records them in date order', 'Both record every transaction in the same order and in the same form'],
  sol: 'The journal is the book of original entry, recording transactions as they happen; the ledger collects the entries of each account together by posting from the journal. The other statements reverse or blur this relationship.',
}));

// ================================================================ assertion-reason
QQ('ar_eq', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'After every transaction of a firm, total assets equal outside liabilities plus capital.',
  r: 'Every transaction changes two items of the accounting equation by equal amounts.',
  sol: 'Both are true. Because each transaction has a two-sided effect of equal value, the two sides of the equation stay equal, so R explains A.',
}));
QQ('ar_voucher', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A cash memo is a source document for recording a cash sale.',
  r: 'A credit note is sent by a seller to a buyer when the buyer returns goods.',
  sol: 'Both are true, but the credit note concerns returns and has no bearing on why a cash memo supports a cash sale, so R does not explain A.',
}));
QQ('ar_compound', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A compound journal entry may debit one account and credit two accounts.',
  r: 'In a compound journal entry the total of the credit amounts may exceed the total of the debit amounts.',
  sol: 'A is true: a purchase with tax, for example, debits Purchases and input tax accounts and credits the supplier, or a sale credits Sales and output tax accounts. R is false: in every entry the debit total equals the credit total.',
}));
QQ('ar_posting', ar({
  t: 4, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Posting means transferring entries from the ledger to the journal.',
  r: 'The ledger groups the entries of the journal account by account.',
  sol: 'A is false: posting is the transfer of entries from the journal to the ledger accounts. R is true: that transfer collects all entries relating to one account in one place.',
}));
QQ('ar_debtor', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The account of a debtor normally shows a debit balance.',
  r: 'A debtor is a person who owes money to the business, which is an asset of the business.',
  sol: 'Both are true. An amount receivable is an asset, and an increase in an asset is debited, so the debtor\'s account carries a debit balance; R explains A.',
}));

// ================================================================ true / false, fill in the blank
QQ('tf_voucher', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A journal voucher is the voucher prepared for a transaction in which cash is paid.',
  sol: 'A voucher for cash paid is a debit voucher. A journal or transfer voucher supports a transaction in which no cash moves, such as a credit purchase or an adjustment.',
}));
QQ('tf_order', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'The journal records the transactions of a firm in the order in which they take place.',
  sol: 'The journal is the book of original entry and is written date by date; the ledger then regroups the entries account by account.',
}));
QQ('tf_expense', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'Payment of an expense by an imagined firm reduces both its assets and its capital.',
  sol: 'An expense lowers profit and so capital, and the payment lowers an asset such as cash by the same amount.',
}));
QQ('fb_ledger', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'To balance a ledger account, the difference is written on the smaller side as Balance ___; the same amount is written on the opposite side at the start of the next period as Balance ___.',
  acc: [['c/d', 'carried down', 'carried down (c/d)'], ['b/d', 'brought down', 'brought down (b/d)']],
  sol: 'The balance is carried down as Balance c/d (carried down) to make the totals equal, and brought down as Balance b/d (brought down) on the opposite side to open the next period.',
}));
QQ('fb_rules', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'By the accounting equation approach, an increase in an asset is ___ and an increase in a liability is ___.',
  acc: [['debited', 'debit'], ['credited', 'credit']],
  sol: 'An increase in an asset is debited, and an increase in a liability is credited; decreases are the opposite.',
}));

// ================================================================ match, ordering
QQ('mt_docs', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each source document in column A with its use in column B.',
  pairs: [
    ['Cash memo', 'Handed to the buyer as proof of a cash sale'],
    ['Invoice', 'Sent by the seller to the buyer for goods sold on credit'],
    ['Pay-in-slip', 'Filled in when money is deposited in a bank account'],
    ['Credit note', 'Informs a buyer that his account has been credited, for example for goods he returned'],
  ],
  sol: 'Each source document is matched with what it is prepared for.',
}));
QQ('mt_accounts', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each account in column A with its nature and the side on which an increase is recorded in column B.',
  pairs: [
    ['Creditors', 'Liability; an increase is credited'],
    ['Drawings', 'Reduction of capital; an increase is debited'],
    ['Commission received', 'Revenue; an increase is credited'],
    ['Rent paid', 'Expense; an increase is debited'],
  ],
  sol: 'Liabilities and revenues are credited when they increase; expenses and drawings are debited when they increase.',
}));
QQ('ord_journal_steps', ord({
  t: 3, d: 2, c: 'understanding',
  stem: 'Arrange in the correct order the steps in recording a transaction of an imagined firm in the journal.',
  items: ['Identify the accounts affected from the source document', 'Classify each account and decide by the rules which is debited and which is credited', 'Write the date, the account debited, the account credited with To, and the amounts', 'Write the narration and check that the debit and credit totals agree'],
  sol: 'The accounts are identified, then classified and given their sides, then written in the standard format, and the entry is finished with the narration and a check of the totals.',
}));
QQ('ord_flow', ord({
  t: 4, d: 2, c: 'understanding',
  stem: 'Arrange in order the stages through which a business transaction passes in the books of an imagined firm.',
  items: ['Source document is prepared', 'Voucher is prepared from it', 'Entry is made in the journal', 'Entry is posted to the ledger account'],
  sol: 'The source document proves the transaction, the voucher supports the entry, the journal records it in date order, and the ledger collects it account by account.',
}));

// ================================================================ error-location items (analysis)
const DM = { fees: 12000 };
QQ('m_err_drawings', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Dilip Motors, an imagined workshop, paid ${rs(DM.fees)} in cash as school fees of the proprietor's daughter and debited Miscellaneous Expenses A/c with the amount. Which statement about this treatment is correct?`,
  opts: [`Expenses are overstated and profit understated by ${rs(DM.fees)}, because the amount should have been debited to Drawings A/c`, `Profit is overstated by ${rs(DM.fees)}, because drawings are an expense of the business`, `Cash is overstated by ${rs(DM.fees)}, because the payment was not recorded as a receipt`, `The debit and credit totals of the ledger will disagree by ${rs(DM.fees)}`],
  sol: `School fees of the proprietor's family are personal, so the payment is drawings and reduces capital directly; it is not an expense of the business. Debiting an expense overstates expenses and so understates profit by ${rs(DM.fees)}. The credit to cash is correct, so cash is not overstated, and since a debit was matched by an equal credit the ledger totals still agree. Drawings are not a business expense, so the second option is wrong.`,
}));
const EM = { sale: 18000 };
const EMw = ledger({ name: 'Farah Khan A/c', cr: [['By Sales A/c', EM.sale]] });
const EMr = ledger({ name: 'Farah Khan A/c', dr: [['To Sales A/c', EM.sale]] });
same(EMw.balance, -EM.sale, 'wrong side balance of Farah');
same(EMr.balance, EM.sale, 'right side balance of Farah');
same(EMr.balance - EMw.balance, 2 * EM.sale, 'difference in the balance caused by reversing the entry');
QQ('m_err_side', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Eshan Mart, an imagined shop, sold goods worth ${rs(EM.sale)} on credit to Farah Khan, who has no other dealing with it. The accountant passed the entry Sales A/c Dr. ${rs(EM.sale)}, To Farah Khan A/c ${rs(EM.sale)}. After this entry is posted, the account of Farah Khan shows`,
  opts: [`a credit balance of ${rs(EM.sale)} instead of a debit balance of ${rs(EM.sale)}, so her balance is wrong by ${rs(2 * EM.sale)}`, `a debit balance of ${rs(2 * EM.sale)} instead of ${rs(EM.sale)}`, `a credit balance of ${rs(2 * EM.sale)} instead of a debit balance of ${rs(EM.sale)}`, `the correct debit balance of ${rs(EM.sale)}, since both accounts are affected equally`],
  sol: `The correct entry debits Farah Khan, an asset that increases, and credits Sales. The entry passed has the two sides reversed, so her account is credited and shows a credit balance of ${rs(EM.sale)}, where a debit balance of ${rs(EM.sale)} is due; the balance is wrong by ${inr(EM.sale)} + ${inr(EM.sale)} = ${rs(2 * EM.sale)}. A debit or credit of ${rs(2 * EM.sale)} is the size of the error, not of the balance, and the last option ignores that the sides are reversed. The totals still agree, so the slip would not be caught by totalling the two sides.`,
}));
