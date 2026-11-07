// CBSE 11 Accountancy, ch01 Introduction to Accounting: question bank. Every firm, owner, customer and figure is
// imagined by SOYL; no NCERT illustration, exercise or example and no board or sample-paper item is reused (D-036).
// Every amount comes from figs.mjs / acc.mjs (computed and asserted) and is interpolated into the text.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';
import { sum, same, inr, rs, mdTable, equation } from './acc.mjs';
import { MT, PS, KB, KP, CR, capSpend, revSpend, B1, B2, B3, billRows, DB, CD, GL, IC, mtRows, tot } from './figs.mjs';

/** Registers a question after checking that its marking scheme adds up to its marks. */
function QQ(key, q) {
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  return Q(key, q);
}
const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const numQ = (o) => num({ ...o, scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });

// ================================================================ t01 Meaning, objectives and role of accounting
QQ('m_acc_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement describes accounting as a complete process?',
  opts: [
    'Identifying, measuring, recording, classifying, summarising, analysing, interpreting and communicating financial information to its users',
    'Writing every business transaction in a book of original entry in date order',
    'Preparing a list of ledger balances to see whether the books agree',
    'Finding the tax a business has to pay at the end of the year',
  ],
  sol: 'Accounting begins with identifying events that can be expressed in money and ends with communicating the results. Writing transactions in order is only recording, the list of balances is a test of arithmetic accuracy, and tax is one use of the information, not the whole process.',
}));
QQ('m_bk_scope', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At Dhanpur Dairy (an imagined firm), a clerk records every sale and purchase, while the accountant also studies why the margin fell this quarter and explains it to the owner. Which activity belongs to accounting but not to book-keeping?',
  opts: ['Studying and explaining the fall in the margin', 'Recording the day\'s credit sales', 'Entering the milk purchases under the right heads', 'Noting a cheque received from a shop'],
  sol: 'Book-keeping is limited to recording and classifying transactions. Analysing results and explaining them to a user is part of the wider function of accounting. The other three are routine recording tasks.',
}));
QQ('m_branch_cost', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Zenith Pens (an imagined firm) wants to know exactly how much it spends to make one pen of each model, so that it can fix selling prices. Which branch of accounting supplies this?',
  opts: ['Cost accounting', 'Financial accounting', 'Tax accounting', 'Social accounting'],
  sol: 'Cost accounting collects and analyses the cost of producing a unit or a job. Financial accounting reports the whole business for outside users, and the other two serve different purposes.',
}));
QQ('m_branch_mgmt', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The branch of accounting that supplies information to managers for planning, controlling and decision making is',
  opts: ['management accounting', 'financial accounting', 'book-keeping', 'auditing'],
  sol: 'Management accounting is designed for internal managers. Financial accounting prepares general-purpose statements for outsiders, book-keeping only records, and auditing is an independent check of the accounts.',
}));
QQ('m_not_objective', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is NOT an objective of accounting?',
  opts: ['Guaranteeing that the business will earn a profit every year', 'Keeping a systematic record of transactions', 'Finding the profit or loss of an accounting period', 'Showing the financial position on a given date'],
  sol: 'Accounting measures and reports results; it cannot guarantee them. The other three are the standard objectives: systematic records, ascertaining profit or loss, and depicting financial position.',
}));
QQ('m_bank_need', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tara Tailors (an imagined firm) applies for a loan. Before sanctioning it, the bank studies her accounts. What is the bank mainly trying to learn?',
  opts: ['Whether the firm will be able to pay interest and repay the loan', 'How much bonus the employees should get', 'Whether the firm\'s goods are priced fairly for consumers', 'How the firm\'s profit compares with that of other trades in the country'],
  sol: 'A lender is concerned with safety of its money, so it looks at liquidity and the ability to service the debt. Bonus is an employee concern, price fairness a consumer concern, and an industry comparison a researcher\'s concern.',
}));
QQ('m_tax_need', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An income tax officer asks Ravi Agencies (an imagined firm) for its books. For which purpose does the officer need the accounting information?',
  opts: ['To work out the profit on which tax is payable', 'To decide whether to supply goods on credit', 'To judge whether the owner deserves a salary increase', 'To compare the firm\'s prices with those of rivals'],
  sol: 'Government and tax authorities use accounts to assess taxable income and to check compliance. Supplier credit is a creditor\'s concern, and the remaining two are not tax matters.',
}));
QQ('m_internal_user', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is an internal user of accounting information?',
  opts: ['The manager of the firm', 'A supplier of raw material', 'The bank that gave a loan', 'A student researching small businesses'],
  sol: 'Internal users work in or own the business: owners, managers and employees. Suppliers, banks and researchers sit outside the firm and are external users.',
}));
QQ('m_hist', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When it is said that accounting provides a permanent record of what the firm did in the past, which role of accounting is being described?',
  opts: ['A historical record of transactions', 'A forecast of future profits', 'A substitute for the owner\'s own judgement', 'A guarantee against fraud'],
  sol: 'Accounting stores past transactions so that they can be looked up, verified and compared. Forecasting uses the record but is not the record itself, accounting does not replace judgement, and records do not guarantee that fraud cannot occur.',
}));
QQ('m_investor', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Nikhil is thinking of putting savings into a growing imagined bakery chain. From its accounts he wants to know chiefly',
  opts: ['how profitable the chain is and how safe his investment would be', 'how much customers saved through discounts', 'what rent the chain pays to each landlord', 'how many of the staff are paid on time'],
  sol: 'An investor looks for returns and risk, which the profit and financial position reveal. The other items are not what a prospective investor mainly seeks from the accounts.',
}));

// ================================================================ t02 Qualitative characteristics
QQ('m_late_report', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The sales figures of Orchid Stores (an imagined firm) for March reach the owner only in the middle of June, after she has already placed the next season\'s orders. Which quality of accounting information is missing?',
  opts: ['Timeliness, a part of relevance', 'Understandability', 'Neutrality', 'Verifiability'],
  sol: 'Information that arrives after the decision is made cannot influence it, so it lacks timeliness. Nothing in the case questions the clarity of the report, the fairness of the reporter or whether the figures can be checked.',
}));
QQ('m_neutral', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The accountant of Pinewood Traders (an imagined firm) leaves out some bad debts from the report so that the owner is pleased. Which characteristic has been violated?',
  opts: ['Neutrality', 'Comparability', 'Timeliness', 'Predictive value'],
  sol: 'Neutral information is free from bias and is not coloured to please a user. Leaving out unpleasant facts to please the owner is a failure of neutrality. The other characteristics are not the issue.',
}));
QQ('m_verifiable', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Two accountants separately examine the invoices and receipts of the same imagined firm and arrive at the same sales figure. This shows that the information is',
  opts: ['verifiable', 'comparable', 'predictive', 'timely'],
  sol: 'Verifiability means independent persons using the same evidence reach the same result. Comparability concerns similarity across periods or firms, and predictive value and timeliness concern usefulness for decisions.',
}));
QQ('m_compare', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Sunrise Garments (an imagined firm) valued its closing stock by one method in 2023, a second in 2024 and a third in 2025, without saying so. What is the main problem for a reader comparing the three years?',
  opts: ['The results of the three years are not comparable', 'The information has no predictive value because it is about the past', 'The report is too technical to be understood', 'The statements are not verifiable by an auditor'],
  sol: 'Changing the method every year makes the yearly figures differ for reasons that have nothing to do with performance, so they cannot be compared. Predictive value and verifiability are about different things, and nothing says the report is technical.',
}));
QQ('m_plain', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The accountant of an imagined village cooperative adds short notes in plain words under each statement so that members with little schooling can follow them. This supports',
  opts: ['understandability', 'reliability', 'comparability', 'timeliness'],
  sol: 'Information should be presented so that users with reasonable knowledge can follow it. Plain notes serve this directly. They do not by themselves make figures reliable, comparable across firms or earlier.',
}));
QQ('m_predictive', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Information that helps users forecast what is likely to happen in the future has',
  opts: ['predictive value', 'feedback value', 'verifiability', 'neutrality'],
  sol: 'Predictive value is the ability to help users make forecasts. Feedback value confirms or corrects earlier expectations, and the other two belong to reliability.',
}));

// ================================================================ t03 Basic terms
QQ('m_business_txn', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following is a business transaction of Gopal Garments (an imagined firm)?',
  opts: ['Paying ' + rs(7000) + ' for the shop rent', 'A customer asking the price of a shirt', 'The owner\'s family going on a picnic', 'The owner thinking of opening a new branch next year'],
  sol: 'A business transaction is an exchange of money or money\'s worth between the firm and another party that can be measured in money. Paying rent qualifies. An enquiry, the owner\'s family outing and a mere plan involve no completed exchange of the firm\'s resources.',
}));
QQ('m_capital_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The amount which the proprietor has invested in the business, together with profits left in it, is called',
  opts: ['capital', 'drawings', 'liabilities', 'revenue'],
  sol: 'Capital is the owner\'s claim on the firm. Drawings are amounts taken out, liabilities are owed to outsiders and revenue is income from the main activity.',
}));
QQ('m_drawings', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Mohan, who owns an imagined provision store, takes goods costing ' + rs(2000) + ' from the shop for use in his own kitchen. This is',
  opts: ['drawings', 'purchases', 'an expense of the shop', 'a loss'],
  sol: 'Goods taken by the owner for personal use are drawings and reduce his capital. They are not bought for the business, are not a cost of running it and are not a loss from an adverse event.',
}));
QQ('m_cl', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following is a current liability?',
  opts: ['Creditors for goods bought on credit', 'Bank loan repayable after five years', 'Owner\'s capital', 'Furniture'],
  sol: 'Creditors are to be paid within the operating cycle or one year. A five-year loan is non-current, capital is owner\'s equity and furniture is an asset.',
}));
QQ('m_intangible', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following is an intangible asset?',
  opts: ['Patent rights', 'Computer', 'Stock of goods', 'Cash at bank'],
  sol: 'An intangible asset has no physical form but has value, as a patent does. A computer is a tangible non-current asset, and stock and bank balance are current assets.',
}));
const vanVsRepair = [450000, 3000];
QQ('m_capex', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kaveri Bakery (an imagined firm) spent ' + rs(vanVsRepair[0]) + ' on a delivery van and ' + rs(vanVsRepair[1]) + ' on repairing its oven. Which treatment is correct?',
  opts: ['The van is capital expenditure and the repair is revenue expenditure', 'Both are capital expenditure', 'Both are revenue expenditure', 'The van is revenue expenditure and the repair is capital expenditure'],
  sol: 'The van will serve for several years, so the spending gives a lasting benefit and is capital. Repairs only keep the oven in working order, so they are revenue. The other options reverse or merge the two.',
}));
QQ('m_gain', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An old computer in the books of an imagined coaching centre at ' + rs(12000) + ' is sold for ' + rs(15000) + '. The ' + rs(GL.gain) + ' excess is best described as',
  opts: ['a gain', 'an expense', 'drawings', 'revenue from the main activity'],
  sol: 'The amount comes from an incidental transaction, not from the centre\'s regular teaching business, and it exceeds the book value, so it is a gain. It is not an expense or drawings, and not revenue from the main activity.',
}));
QQ('m_trade_disc', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A deduction given by a wholesaler from the catalogue price when a retailer buys in large quantity is',
  opts: ['trade discount, which is not entered in the books', 'cash discount, which is entered in the books', 'trade discount, which is entered as an expense', 'cash discount, which is not entered in the books'],
  sol: 'Trade discount is given on the list price at the time of sale and only the net invoice price is recorded. Cash discount is for prompt payment and is recorded in the books.',
}));
QQ('m_voucher', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A written document that supports an entry and serves as proof of a transaction, such as a cash memo, is called a',
  opts: ['voucher', 'ledger', 'trial balance', 'balance sheet'],
  sol: 'A voucher is documentary evidence of a transaction. A ledger is a book of accounts, while a trial balance and a balance sheet are statements prepared from the books.',
}));
QQ('m_stock_next', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Closing stock of ' + rs(PS.closeStock) + ' at 31 March of an imagined stationery shop will, on 1 April, be',
  opts: ['opening stock of the new year', 'purchases of the new year', 'a liability of the new year', 'drawings of the new year'],
  sol: 'The goods left unsold at the end of one period are carried forward and form the opening stock of the next period. They are not new purchases, and they are an asset, not a liability or drawings.',
}));
QQ('m_debtor', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A person who owes money to the firm for goods bought on credit is a',
  opts: ['debtor', 'creditor', 'proprietor', 'drawer'],
  sol: 'A debtor owes the firm, so the amount is an asset. A creditor is owed by the firm. A proprietor is the owner and a drawer is the person who draws a bill or cheque.',
}));
QQ('m_net_sales', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'During one year an imagined shop sold goods for ' + rs(PS.sales) + ', of which customers returned goods worth ' + rs(PS.saleReturn) + '. Its net sales for the year are',
  opts: [rs(PS.netSales), rs(PS.sales + PS.saleReturn), rs(PS.saleReturn), rs(PS.sales)],
  sol: 'Net sales equal sales minus sales returns, so ' + rs(PS.sales) + ' less ' + rs(PS.saleReturn) + ' gives ' + rs(PS.netSales) + '. Adding the returns, using the returns alone or ignoring them gives the other figures.',
}));
QQ('m_loss', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A fire destroys goods worth ' + rs(40000) + ' in the godown of an imagined firm, and nothing is recovered. This amount is',
  opts: ['a loss, because it is a fall in capital without any benefit in return', 'an expense, because it was incurred to earn revenue', 'drawings, because it reduces the owner\'s capital', 'a gain, because the goods are no longer held'],
  sol: 'A loss is a reduction in the owner\'s claim from an unplanned event, with nothing received in exchange. An expense is a cost of earning income, drawings are withdrawals by the owner, and the destruction of goods is not a gain.',
}));

// ================================================================ assertion-reason
QQ('ar_info', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Accounting is called an information system.',
  r: 'It collects data about transactions, processes them into statements and communicates the results to those who need them.',
  sol: 'Both are true. The three steps in R, collect, process and communicate, are exactly what makes accounting an information system.',
}));
QQ('ar_bk', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Accounting has a wider scope than book-keeping.',
  r: 'Book-keeping includes the analysis and interpretation of the recorded results.',
  sol: 'A is true because accounting goes on to summarise, analyse and interpret. R is false: book-keeping stops at recording and classifying, and analysis and interpretation belong to accounting.',
}));
QQ('ar_lender', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A bank that has lent money to a firm is an external user of its accounts.',
  r: 'A lender wants to know whether the firm can pay the interest and repay the loan.',
  sol: 'Both are true, but R states what the bank needs, not why it is external. The bank is external because it is not part of the firm\'s ownership or management.',
}));
QQ('ar_reliable', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Information supported by bills and receipts is considered more reliable.',
  r: 'Independent persons who look at the same bills and receipts would reach much the same figures.',
  sol: 'Both are true. R is the idea of verifiability, and it is the reason supporting documents raise reliability.',
}));
QQ('ar_drawings', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Drawings reduce the capital of the owner.',
  r: 'Drawings are an expense of the business and are charged against its profit.',
  sol: 'A is true because the owner has taken part of his claim out. R is false: drawings are a private withdrawal, not a business expense, and they are not charged against profit.',
}));
QQ('ar_gain', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Profit on the sale of an old machine is treated as a gain and not as revenue.',
  r: 'Such a profit does not arise from the normal activity of the business.',
  sol: 'Both are true. Revenue arises from the main activity, so a profit from an incidental sale is classed as a gain, and R gives that reason.',
}));
QQ('ar_loan', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A bank loan repayable after four years is a current liability.',
  r: 'Liabilities that are due for payment after more than twelve months are non-current liabilities.',
  sol: 'A is false: the loan is not due within twelve months, so it is non-current. R is true and is the very test that places the loan in the non-current group.',
}));

// ================================================================ true-false, fill in the blank, match, ordering
QQ('tf_bk', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Book-keeping includes interpreting the final results for the use of management.',
  sol: 'Interpreting results belongs to accounting. Book-keeping is confined to recording and classifying transactions.',
}));
QQ('tf_cashdisc', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Cash discount is allowed to a debtor for paying within the agreed period and is recorded in the books.',
  sol: 'Cash discount rewards prompt payment. The seller books it as a discount allowed and the buyer as a discount received.',
}));
QQ('tf_openclose', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The closing stock of one accounting year is the opening stock of the next year.',
  sol: 'The unsold goods are carried forward at the same value into the new period.',
}));
QQ('tf_goodwill', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? Goodwill of ' + rs(MT.intangible[0][1]) + ' in the list of Meera Traders (an imagined stationery business) is a tangible non-current asset.',
  sol: 'Goodwill has no physical form, so it is an intangible non-current asset. Furniture or a computer would be tangible.',
}));
QQ('fb_bk', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The part of accounting that is concerned only with recording transactions is called ___.',
  acc: [['book-keeping', 'bookkeeping', 'book keeping']],
  sol: 'It is book-keeping; accounting goes on to summarise, analyse and communicate.',
}));
QQ('fb_trade', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A deduction from the list price given by a seller for buying in bulk is called ___ discount.',
  acc: [['trade']],
  sol: 'It is trade discount, and it does not appear in the books.',
}));
QQ('fb_drawings', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Cash taken out of the business by the owner for private use is recorded as ___, which reduces ___.',
  acc: [['drawings'], ['capital']],
  sol: 'The amount is drawings, and it reduces capital.',
}));
QQ('mt_users', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each imagined user of the accounts of a small tea company with what that user mainly wants from them.',
  pairs: [
    ['A bank that lent money to the company', 'Ability to pay interest and repay the loan'],
    ['A supplier selling tea leaves on credit', 'Whether the firm can pay its dues on time'],
    ['A tax officer', 'Profit on which tax is payable'],
    ['The employees', 'Capacity to pay wages and bonus'],
  ],
  sol: 'Each user looks at the accounts for the information that bears on its own decision.',
}));
QQ('mt_terms', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each item in the books of an imagined stationery shop with the term that describes it.',
  pairs: [
    ['A customer who has not yet paid for pens sold on credit', 'Debtor'],
    ['A paper mill to which the shop owes money', 'Creditor'],
    ['Pens received back from a customer', 'Sales return'],
    ['Reams of paper unsold on the last day of the year', 'Closing stock'],
  ],
  sol: 'A person owing the firm is a debtor, a person owed is a creditor, goods sent back by a customer are a sales return, and the unsold goods at year end are closing stock.',
}));
QQ('ord_process', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these stages of the accounting process in the order in which they take place.',
  items: ['Recording the transactions', 'Classifying them under suitable heads', 'Summarising them into statements', 'Interpreting the statements', 'Communicating the results to users'],
  sol: 'Transactions are first recorded, then classified, then summarised into statements, after which the results are interpreted and communicated.',
}));
QQ('ord_bill', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps for finding what Hiral Electronics (an imagined firm) pays on a bill that has both discounts.',
  items: ['Take the list price', 'Deduct the trade discount', 'Reach the invoice amount', 'Deduct cash discount on the invoice amount', 'Reach the amount actually paid'],
  sol: 'Cash discount is calculated on the invoice amount after trade discount, so the trade discount must be deducted first.',
}));

// ================================================================ numerical
{
  const lia = MT.liabilities;
  QQ('n_capital', numQ({
    t: 3, d: 2, c: 'application', value: MT.capital, unit: '₹',
    stem: 'Meera Traders (an imagined stationery business in the imagined town of Ranipur) has these balances: land and building ' + rs(400000) + ', furniture ' + rs(60000) + ', computer ' + rs(40000) + ', goodwill ' + rs(50000) + ', stock ' + rs(80000) + ', debtors ' + rs(70000) + ', cash in hand ' + rs(30000) + ', cash at bank ' + rs(40000) + ', bank loan ' + rs(200000) + ', creditors ' + rs(60000) + ' and outstanding rent ' + rs(10000) + '. Find the owner\'s capital in rupees.',
    sol: 'Assets total ' + rs(MT.assets) + ' and liabilities total ' + rs(lia) + ', so capital is assets minus liabilities, ' + rs(MT.capital) + '.',
  }));
}
QQ('n_net_purch', numQ({
  t: 3, d: 2, c: 'application', value: PS.netPurchases, unit: '₹',
  stem: 'In a year, Meera Traders bought goods for cash ' + rs(PS.purchCash) + ' and on credit ' + rs(PS.purchCredit) + ', and returned goods worth ' + rs(PS.purchReturn) + ' to a supplier. Find the net purchases in rupees.',
  sol: 'Purchases are ' + rs(PS.purchases) + ' and purchases return is ' + rs(PS.purchReturn) + ', so net purchases are ' + rs(PS.netPurchases) + '.',
}));
QQ('n_trade', numQ({
  t: 3, d: 2, c: 'application', value: B1.trade, unit: '₹',
  stem: 'Anand Sports (an imagined wholesaler) sells goods to a retailer at a list price of ' + rs(B1.list) + ' and allows trade discount at ' + B1.tradePct + '%. Find the trade discount in rupees.',
  sol: B1.tradePct + '% of ' + rs(B1.list) + ' is ' + rs(B1.trade) + '.',
}));
QQ('n_paid', numQ({
  t: 3, d: 3, c: 'application', value: B2.paid, unit: '₹',
  stem: 'Kiran Stores (an imagined retailer) buys goods listed at ' + rs(B2.list) + ' and gets trade discount at ' + B2.tradePct + '%. The seller also allows cash discount at ' + B2.cashPct + '% on the invoice amount if payment is made within ten days, and Kiran Stores pays in time. How much does it pay, in rupees?',
  sol: 'Trade discount ' + rs(B2.trade) + ' gives an invoice of ' + rs(B2.invoice) + '. Cash discount at ' + B2.cashPct + '% on that is ' + rs(B2.cash) + ', so the payment is ' + rs(B2.paid) + '.',
}));
QQ('n_profit', numQ({
  t: 3, d: 3, c: 'application', value: KP.profit, unit: '₹',
  stem: 'In one month Kaveri Bakery (an imagined firm in the imagined town of Dhanpur) earned ' + rs(180000) + ' from sale of cakes and bread and ' + rs(5000) + ' as commission. It spent ' + rs(95000) + ' on flour, sugar and butter used, ' + rs(30000) + ' on wages, ' + rs(12000) + ' on rent and ' + rs(8000) + ' on electricity. Find the profit for the month in rupees.',
  sol: 'Income is ' + rs(KP.income_) + ' and expenses are ' + rs(KP.expense_) + ', so profit is ' + rs(KP.profit) + '.',
}));
QQ('n_debtor', numQ({
  t: 3, d: 2, c: 'application', value: DB.owes, unit: '₹',
  stem: 'Meera Traders sold goods worth ' + rs(DB.sold) + ' on credit to Rohit Stationers (an imagined shop). Rohit later paid ' + rs(DB.received) + ' on account. How much does he still owe, in rupees?',
  sol: 'He bought for ' + rs(DB.sold) + ' and paid ' + rs(DB.received) + ', so the balance due from this debtor is ' + rs(DB.owes) + '.',
}));

// ================================================================ short answer, 2 marks
QQ('s_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define accounting and state why it is called an information system.',
  model: 'Accounting is the art of **recording, classifying and summarising** money-related transactions and **interpreting** the results. It is an **information system** because it collects data about transactions, processes it into statements and **communicates** it to users who need it for decisions.',
  sol: 'Give the standard definition and link it to collecting, processing and communicating.',
  scheme: [['Definition: record, classify, summarise, interpret', 1], ['Information system: collect, process, communicate', 1]],
}));
QQ('s_bk_diff', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between book-keeping and accounting.',
  model: '1. **Scope:** book-keeping only **records and classifies** transactions; accounting also **summarises, analyses and interprets** them.\n2. **Users and purpose:** book-keeping supplies the basic data, usually handled by a clerk; accounting uses it to give **information and advice** to management and others.',
  sol: 'Contrast scope and purpose.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
QQ('s_objectives', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any four objectives of accounting.',
  model: '1. Keeping a **systematic record** of transactions.\n2. Finding the **profit or loss** of a period.\n3. Showing the **financial position** on a date.\n4. Providing **information to users** for decisions.',
  sol: 'Any four of the standard objectives, half a mark each.',
  scheme: [['Each correct objective (4 × 0.5)', 2]],
}));
QQ('s_language', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is accounting called the language of business? Explain briefly.',
  model: 'A language carries messages between people. Accounting turns the many events of a business into **money terms and standard statements** that owners, lenders, tax officers and others can read. In this way it **communicates** how the business is doing to everyone who has a stake in it.',
  sol: 'Link the idea of a language with communication of financial facts.',
  scheme: [['A language communicates; accounting communicates financial facts', 1], ['Standard statements read by many users', 1]],
}));
QQ('s_users_ie', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish internal users from external users of accounting information, with one example of each.',
  model: '**Internal users** are those inside the business who run or own it and use detailed information to manage it, for example the **manager**. **External users** are outside parties who deal with the business and rely on its published statements, for example a **bank** that has given a loan.',
  sol: 'Define each group and give one example.',
  scheme: [['Internal users with example', 1], ['External users with example', 1]],
}));
QQ('s_compar', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Two imagined bakeries, Anita Bakes and Latif Bakes, value their closing stock by different methods, and Anita also changed her method this year. Explain how this affects comparability.',
  model: 'Comparability needs **similar methods** across firms and over time. Because Anita and Latif use different methods, their profits **cannot be compared fairly**. Anita\'s change means her own profits for the two years are **not comparable** either, unless the effect is disclosed.',
  sol: 'Comparability across firms and across periods is both affected.',
  scheme: [['Across firms: different methods', 1], ['Across periods: change of method', 1]],
}));
QQ('s_cap_draw', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish capital from drawings in two points.',
  model: '1. **Capital** is the owner\'s investment plus profits left in the firm; **drawings** are cash or goods the owner takes out for private use.\n2. Capital is the **owner\'s claim** on the firm; drawings **reduce** that claim and are not a business expense.',
  sol: 'Meaning, and effect on the owner\'s claim.',
  scheme: [['Meaning of each', 1], ['Effect on the owner\'s claim', 1]],
}));
QQ('s_trade_cash', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish trade discount from cash discount in two points.',
  model: '1. **Trade discount** is allowed on the list price for bulk buying or to a trader; **cash discount** is allowed for payment within the agreed period.\n2. Trade discount is **not recorded** in the books, only the net invoice amount; cash discount is **recorded** as a discount allowed or received.',
  sol: 'Reason for giving, and treatment in the books.',
  scheme: [['Basis on which each is allowed', 1], ['Treatment in the books', 1]],
}));
QQ('s_exp_loss', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Rent of ' + rs(12000) + ' paid by Kaveri Bakery is an expense, while ' + rs(40000) + ' of goods destroyed by fire is a loss. Explain the difference between the two items.',
  model: 'Rent is a **cost incurred to earn revenue**: the shop is used to make sales, so it is matched against income. Goods destroyed by fire are an **unplanned fall in the owner\'s claim** which earns **no revenue** in exchange, so it is a loss.',
  sol: 'An expense helps to earn revenue; a loss does not.',
  scheme: [['Expense: incurred to earn revenue', 1], ['Loss: unplanned, no benefit received', 1]],
}));
const clsItems = [
  ['Delivery van', 'non-current asset'],
  ['Wages payable to staff', 'current liability'],
  ['Amount due from a customer', 'current asset'],
  ['Loan repayable in four years', 'non-current liability'],
];
QQ('s_classify4', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: [20, 40],
  stem: 'Classify each of these items of an imagined firm as a current asset, non-current asset, current liability or non-current liability: ' + clsItems.map((x) => `(${x[0]})`).join(', ') + '.',
  model: clsItems.map(([a, k], i) => `${i + 1}. ${a}: **${k}**.`).join('\n'),
  sol: 'Half a mark for each classification.',
  scheme: [['Each correct classification (4 × 0.5)', 2]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_users_needs', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Kaveri Bakery (an imagined firm) has a bank loan, buys flour from a supplier on credit and employs six bakers. State what each of the three parties mainly wants from its accounts.',
  model: '1. The **bank** wants to know whether the bakery can pay interest and **repay the loan** on time.\n2. The **flour supplier** wants to know whether the bakery can **pay its dues** so that credit can safely continue.\n3. The **bakers** want to know whether the bakery earns enough to pay **wages and bonus** regularly and stay in business.',
  sol: 'Each party looks at liquidity, solvency or profitability from its own viewpoint.',
  scheme: [['Bank: repayment of loan', 1], ['Supplier: ability to pay dues', 1], ['Employees: wages, bonus and continuity', 1]],
}));
QQ('s3_chars_cases', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Name the quality of accounting information that is weak in each case of an imagined firm: (i) the owner tells the accountant to show a higher profit than the books support; (ii) the annual report is written in such complex language that the shareholders cannot follow it; (iii) the report on the cost of an order reaches the manager after the order is completed.',
  model: '1. **Neutrality** (part of reliability): information must be free from bias; the owner\'s pressure makes the profit a distortion.\n2. **Understandability**: a report that its users cannot follow does not help them.\n3. **Timeliness** (part of relevance): information that arrives after the decision is of no use to the manager.',
  sol: 'Match each case to bias, clarity and time.',
  scheme: [['Neutrality for (i)', 1], ['Understandability for (ii)', 1], ['Timeliness for (iii)', 1]],
}));
const cls6 = [
  ['A patent bought by a toy firm', 'Non-current asset (intangible)'],
  ['A packing machine', 'Non-current asset (tangible)'],
  ['Unsold toys in the godown', 'Current asset'],
  ['Amount due from a toy shop', 'Current asset (debtors)'],
  ['Rent unpaid for March', 'Current liability'],
  ['A loan from a bank for six years', 'Non-current liability'],
];
QQ('s3_classify6', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: [20, 60],
  stem: 'Classify the following items of Tinku Toys (an imagined firm) under the correct head: ' + cls6.map((x, i) => `(${i + 1}) ${x[0]}`).join('; ') + '.',
  model: cls6.map(([a, k], i) => `${i + 1}. ${a}: **${k}**.`).join('\n'),
  sol: 'Half a mark for each correct classification.',
  scheme: [['Each correct classification (6 × 0.5)', 3]],
}));
{
  const A = [['Furniture', 90000], ['Stock', 60000], ['Debtors', 50000], ['Cash', 20000]];
  const Lb = [['Creditors', 45000], ['Loan from bank', 75000]];
  const cap = tot(A) - tot(Lb);
  same(cap, 100000, 'Vikram capital');
  const draw = 15000;
  QQ('s3_capital_calc', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: 'Vikram Cycles (an imagined firm) has assets: furniture ' + rs(90000) + ', stock ' + rs(60000) + ', debtors ' + rs(50000) + ' and cash ' + rs(20000) + '. Its liabilities are creditors ' + rs(45000) + ' and a bank loan ' + rs(75000) + '. (a) Find the capital. (b) If the owner then withdraws ' + rs(draw) + ' in cash for private use, find the capital after the withdrawal.',
    model: `**(a)** Assets = ${rs(tot(A))}; liabilities = ${rs(tot(Lb))}. Capital = assets − liabilities = **${rs(cap)}**.\n\n**(b)** The withdrawal is drawings of ${rs(draw)}. Capital after drawings = ${rs(cap)} − ${rs(draw)} = **${rs(cap - draw)}**.`,
    sol: 'Capital is the balancing figure; drawings reduce it.',
    scheme: [['Total assets and liabilities', 1], [`Capital ${rs(cap)}`, 1], [`Capital after drawings ${rs(cap - draw)}`, 1]],
  }));
}
QQ('s3_revcap', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Distinguish capital expenditure from revenue expenditure in one point of difference each for benefit and for treatment, and classify these two items of Kaveri Bakery (an imagined firm): (i) ' + CR[3][0] + '; (ii) ' + CR[1][0] + '.',
  model: 'Capital expenditure gives a **benefit lasting beyond one year** and adds to an asset; revenue expenditure serves the **current year** only. Capital items appear in the **balance sheet**; revenue items are charged to the **profit and loss account**. (i) is **capital**, since the cost of installing a machine is part of its cost. (ii) is **revenue**, as painting recurs every year.',
  sol: 'Two points of difference and two classifications.',
  scheme: [['Difference in benefit', 1], ['Difference in treatment', 1], ['Both items classified correctly', 1]],
}));
{
  QQ('s3_disc_calc', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: 'Hiral Electronics (an imagined retailer) buys goods listed at ' + rs(B3.list) + '. The seller allows trade discount at ' + B3.tradePct + '% and cash discount at ' + B3.cashPct + '% on the invoice amount for payment in ten days. Find (a) the trade discount, (b) the invoice amount and (c) the amount paid if Hiral pays in time.',
    model: mdTable(['Particulars', '₹'], billRows(B3)) + `\n\n(a) ${rs(B3.trade)}; (b) ${rs(B3.invoice)}; (c) ${rs(B3.paid)}.`,
    sol: 'Deduct trade discount first and then compute cash discount on the invoice amount.',
    scheme: [[`Trade discount ${rs(B3.trade)}`, 1], [`Invoice amount ${rs(B3.invoice)}`, 1], [`Cash discount ${rs(B3.cash)} and payment ${rs(B3.paid)}`, 1]],
  }));
}
{
  const sOpen = 40000;
  const pur = 120000;
  const pr = 8000;
  const sal = 200000;
  const sr = 10000;
  const np = pur - pr;
  const ns = sal - sr;
  same(np, 112000, 'netpur');
  same(ns, 190000, 'netsales');
  QQ('s3_net_calc', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: 'Sharma Paper House (an imagined shop) had purchases of ' + rs(pur) + ' and sales of ' + rs(sal) + ' in a year. It returned goods of ' + rs(pr) + ' to suppliers and customers returned goods of ' + rs(sr) + '. Compute the net purchases and the net sales.',
    model: `Net purchases = purchases − purchases return = ${rs(pur)} − ${rs(pr)} = **${rs(np)}**.\n\nNet sales = sales − sales return = ${rs(sal)} − ${rs(sr)} = **${rs(ns)}**.`,
    sol: 'Deduct each return from the total it relates to.',
    scheme: [['Formula for net purchases', 0.5], [`Net purchases ${rs(np)}`, 1], ['Formula for net sales', 0.5], [`Net sales ${rs(ns)}`, 1]],
  }));
  void sOpen;
}

// ================================================================ long answer, 5 marks
QQ('l_meaning_obj', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning of accounting and discuss its objectives.',
  model: 'Accounting is a process of **identifying, measuring, recording, classifying, summarising, analysing and interpreting** financial information, and **communicating** it to users for decisions. It is the system through which a business reports on itself.\n\n**Objectives:**\n1. **Systematic records:** to keep complete and orderly records of all transactions so that nothing is missed.\n2. **Profit or loss:** to find the result of operations for the period by comparing income with expenses.\n3. **Financial position:** to show assets, liabilities and capital on a particular date.\n4. **Information to users:** to supply owners, managers, lenders and others with the figures they need.',
  sol: 'Definition with the stages, then the four standard objectives with a line each.',
  scheme: [['Meaning of accounting with stages', 1], ['Systematic records', 1], ['Profit or loss', 1], ['Financial position', 1], ['Information to users', 1]],
}));
QQ('l_users', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain, with the needs of each, any five users of accounting information, including at least two internal users.',
  model: '**Internal users**\n1. **Owners:** want to know profit earned and the safety of their capital.\n2. **Management:** needs detailed figures to plan, control and decide.\n3. **Employees:** want to know whether the firm can pay wages and bonus and offer secure jobs.\n\n**External users**\n4. **Banks and lenders:** need the ability to pay interest and repay loans.\n5. **Suppliers and creditors:** want to know whether the firm can pay for goods bought on credit.\n6. **Tax authorities:** need the profit for assessing tax.\n7. **Investors, consumers and researchers** use the accounts to judge returns, price fairness and trends respectively.\n\n(Any five, one mark each.)',
  sol: 'Five users, one mark each, at least two internal.',
  scheme: [['Any five users with needs (5 × 1)', 5]],
}));
QQ('l_chars', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain reliability, relevance, understandability and comparability, using one imagined example for each.',
  model: '1. **Reliability:** information is **verifiable, neutral** and **faithful to the facts**. Example: a sales figure backed by invoices that two auditors both confirm.\n2. **Relevance:** it has **predictive and feedback value** and arrives in **time**. Example: a weekly cost report that lets a baker change prices before a festival.\n3. **Understandability:** it is presented so that users with reasonable knowledge can follow it. Example: plain labels and notes on a statement for cooperative members.\n4. **Comparability:** it can be compared **across periods and across firms** because the same methods are used. Example: two shops using the same stock valuation method for five years.',
  sol: 'Four characteristics with their parts and an example each.',
  scheme: [['Reliability with example', 1.5], ['Relevance with example', 1.5], ['Understandability with example', 1], ['Comparability with example', 1]],
}));
QQ('l_classify', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how assets and liabilities are classified, giving an example of each class.',
  model: '**Assets** are resources owned by the firm that give future benefit.\n1. **Non-current assets** serve for more than one year. They are **tangible** (land, machinery) or **intangible** (patents, goodwill).\n2. **Current assets** are expected to turn into cash within a year or the operating cycle: stock, debtors, cash.\n\n**Liabilities** are amounts the firm must pay to outsiders.\n3. **Non-current liabilities** fall due after more than a year, for example a long-term loan.\n4. **Current liabilities** are due within a year, for example creditors and outstanding expenses.\n\nAssets are financed by liabilities and capital.',
  sol: 'Two classes of assets with the tangible and intangible split, and two classes of liabilities, with examples.',
  scheme: [['Non-current assets with tangible and intangible', 1.5], ['Current assets with example', 1], ['Non-current liabilities with example', 1], ['Current liabilities with example', 1], ['Link of assets to liabilities and capital', 0.5]],
}));
{
  const tbl = IC.md;
  QQ('l_equation', long({
    t: 3, d: 4, c: 'application', marks: 5,
    stem: 'Ishaan starts an imagined business, Ishaan Cycles, with ' + rs(200000) + ' in cash as capital. Then (i) he buys furniture for ' + rs(50000) + ' in cash; (ii) he buys goods on credit for ' + rs(30000) + '; (iii) he takes a bank loan of ' + rs(80000) + ' that comes in as cash; (iv) he withdraws ' + rs(10000) + ' in cash for private use. Show the effect of each step on assets, liabilities and capital, and find the capital at the end.',
    model: tbl + `\n\nAfter step (iv), total assets are ${rs(sum(Object.values(IC.final.assets)))}; liabilities are ${rs(sum(Object.values(IC.final.liabilities)))} (creditors ${rs(IC.final.liabilities.Creditors)} and loan ${rs(IC.final.liabilities.Loan)}); capital is **${rs(IC.final.capital)}**, and assets equal liabilities plus capital at every step. The withdrawal is drawings and it is the only step that reduces capital.`,
    sol: 'Buying an asset for cash swaps assets; credit purchases and the loan raise assets and liabilities; drawings lower cash and capital.',
    scheme: [['Capital and cash at the start', 0.5], ['Furniture bought for cash', 1], ['Goods on credit', 1], ['Bank loan', 1], ['Drawings and capital at the end', 1.5]],
  }));
}
{
  QQ('l_revcap', long({
    t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
    stem: 'Kaveri Bakery (an imagined firm) made these payments in a month: ' + CR.map((x, i) => `(${i + 1}) ${x[0]}`).join('; ') + '. Classify each as capital or revenue expenditure and say what would happen to the profit if the bakery wrongly treated the capital items as revenue expenditure.',
    model: CR.map(([a, k], i) => `${i + 1}. ${a}: **${k}**.`).join('\n') + `\n\nCapital items total ${rs(capSpend)} and revenue items ${rs(revSpend)}. Charging the capital items to the profit and loss account would **understate profit** by ${rs(capSpend)} and show the assets too low, because the vans, machines and counters are meant to serve for years.`,
    sol: 'Lasting benefit means capital; recurring, upkeep and consumed items are revenue; mixing them up distorts profit and asset values.',
    scheme: [['Three capital items identified', 1.5], ['Three revenue items identified', 1.5], ['Effect: profit understated, assets understated', 2]],
  }));
}

// ================================================================ case-based
QQ('c_loan', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(An imagined case written by SOYL for practice; the firm and the people are not real.)*',
  passage: '**Kaveri Bakery applies for a loan**\n\nKaveri Bakery, an imagined business in the imagined town of Dhanpur, wants a bank loan of ' + rs(150000) + ' to buy a new oven. The branch manager asks for the bakery\'s statements for the last three years. She also asks for the bills behind the figures and checks a few of them with the suppliers. She notes that the bakery has used the same method for all its records in the three years.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the bank an internal or an external user of the bakery\'s accounts?', model: 'The bank is an **external user**.', sol: 'It is outside the bakery\'s ownership and management.', scheme: [['External user', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What does the bank mainly want to learn from these statements?', model: 'Whether the bakery can **pay the interest and repay the loan**.', sol: 'A lender studies the ability to service the debt.', scheme: [['Ability to pay interest and repay', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name the quality of information that the manager tests by checking bills with suppliers, and explain it.', model: 'She tests **verifiability**, a part of reliability: if independent persons look at the same bills and reach the **same figures**, the information can be trusted.', sol: 'Verifiability is supported by documentary evidence.', scheme: [['Verifiability named', 1], ['Explained with independent checking', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Which quality is shown by the use of the same method in the three years, and why does it help the bank?', model: 'It shows **comparability across periods**. The bank can compare the three years and see a real trend, because the figures are not changed by a switch of method.', sol: 'Consistent methods make years comparable.', scheme: [['Comparability named', 1], ['Why it helps the bank', 1]] }),
    ]),
  ],
}));
QQ('c_late', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(An imagined case written by SOYL for practice; the firm and the people are not real.)*',
  passage: '**Rizwan Hardware changes its reports**\n\nRizwan Hardware, an imagined shop in the imagined town of Kharpur, used to send its monthly report to the owner forty days after the month ended. The report used long technical phrases that the owner, Rizwan, could not follow, so he often ignored it. His new accountant now delivers a one-page report within five days, in plain words, and lists the bills behind each figure.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which quality of the old reports was missing because they came forty days late?', model: '**Timeliness**, a part of relevance.', sol: 'Late information cannot influence decisions.', scheme: [['Timeliness', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which quality does the plain wording of the new report improve?', model: '**Understandability**.', sol: 'Plain words make the report easier to follow.', scheme: [['Understandability', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the change makes the reports more relevant to Rizwan\'s decisions.', model: 'Reports delivered within **five days** can still influence the **next orders and prices**, so they have timeliness and feedback value. A report he can **understand** is more likely to be used in decisions at all.', sol: 'Relevance rests on timeliness and use.', scheme: [['Timeliness lets the report influence decisions', 1], ['Understood, so used', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does listing the bills behind each figure make the report more reliable?', model: 'The bills allow an independent person to **check each figure**, which is **verifiability**. Information that can be checked and is backed by evidence is more likely to be a **faithful picture** of what happened.', sol: 'Evidence supports verifiability and faithful representation.', scheme: [['Bills allow checking, so verifiable', 1], ['Faithful representation', 1]] }),
    ]),
  ],
}));
QQ('c_lists', caseQ({
  t: 3, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(An imagined case written by SOYL for practice; the firm and the owner are not real.)*',
  passage: '**The balances of Meera Traders**\n\nMeera Traders is an imagined stationery business in the imagined town of Ranipur. On 31 March, its books show: land and building ' + rs(400000) + ', furniture ' + rs(60000) + ', computer ' + rs(40000) + ', goodwill ' + rs(50000) + ', stock ' + rs(80000) + ', debtors ' + rs(70000) + ', cash in hand ' + rs(30000) + ', cash at bank ' + rs(40000) + ', bank loan repayable in five years ' + rs(200000) + ', creditors ' + rs(60000) + ' and outstanding rent ' + rs(10000) + '.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Find the total of the non-current assets.', model: `Land and building, furniture, computer and goodwill total **${rs(MT.ncAssets)}**.`, sol: 'Add the tangible and the intangible non-current assets.', scheme: [[`${rs(MT.ncAssets)}`, 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Find the total of the current liabilities.', model: `Creditors and outstanding rent total **${rs(tot(MT.cl))}**; the bank loan is non-current.`, sol: 'The five-year loan is not due within a year.', scheme: [[`${rs(tot(MT.cl))}`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Compute the capital of Meera on 31 March.', model: `Assets ${rs(MT.assets)} less liabilities ${rs(MT.liabilities)} gives capital of **${rs(MT.capital)}**.`, sol: 'Capital is the balancing figure.', scheme: [['Totals of assets and liabilities', 1], [`Capital ${rs(MT.capital)}`, 1]] }), [
      short({ t: 3, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): If Meera withdraws ' + rs(20000) + ' in cash for private use on 1 April, what will her capital and cash at bank and in hand together be?', model: `Drawings of ${rs(20000)} reduce capital to **${rs(MT.capital - 20000)}**. Cash in hand and at bank, ${rs(70000)}, fall to **${rs(70000 - 20000)}**.`, sol: 'Drawings reduce both capital and cash.', scheme: [[`Capital ${rs(MT.capital - 20000)}`, 1], [`Cash ${rs(70000 - 20000)}`, 1]] }),
    ]),
  ],
}));
QQ('c_bill', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(An imagined case written by SOYL for practice; the firms are not real.)*',
  passage: '**A bill for Anand Sports**\n\nAnand Sports, an imagined wholesaler in the imagined town of Mehrpur, sells goods listed at ' + rs(B1.list) + ' to Kiran Stores, an imagined retailer. It allows trade discount at ' + B1.tradePct + '%, and cash discount at ' + B1.cashPct + '% on the invoice amount if Kiran pays within ten days. Kiran Stores pays within the ten days.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Find the trade discount.', model: `**${rs(B1.trade)}**.`, sol: `${B1.tradePct}% of the list price.`, scheme: [[`${rs(B1.trade)}`, 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'What amount will be recorded in the books of Anand Sports as the sale?', model: `The invoice amount, **${rs(B1.invoice)}**; trade discount is not recorded.`, sol: 'Only the net amount after trade discount is entered.', scheme: [[`${rs(B1.invoice)}`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the cash discount and the amount paid by Kiran Stores.', model: `Cash discount = ${B1.cashPct}% of ${rs(B1.invoice)} = **${rs(B1.cash)}**; amount paid = ${rs(B1.invoice)} − ${rs(B1.cash)} = **${rs(B1.paid)}**.`, sol: 'Cash discount is on the invoice amount.', scheme: [[`Cash discount ${rs(B1.cash)}`, 1], [`Amount paid ${rs(B1.paid)}`, 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Why is the cash discount recorded in the books while the trade discount is not?', model: 'Trade discount is deducted **before** the sale, so only the net price is a transaction. Cash discount arises **after** the sale, from the choice to pay early, and is a **separate** item that changes the amount actually received, so it is recorded.', sol: 'One is part of the price, the other a reward for payment.', scheme: [['Trade discount is part of the price', 1], ['Cash discount is a separate later item', 1]] }),
    ]),
  ],
}));

void mtRows; void B1; void inr; void equation; void GL; void CD; void KB; void KP;
