// CBSE 10 Social Science, ch20 Money and Credit — question bank. Every scenario, table and source
// is written by SOYL (imagined people, places, loans and interest rates); no NCERT exercise, boxed
// story or board-paper item is reused. Real-world facts are limited to stable ones (legal tender,
// the RBI's role, formal and informal lenders, how self-help groups work, UPI, Jan Dhan).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, caseQ, child } from './lib.mjs';

const S2 = [25, 40];
const S3 = [40, 60];
const L5 = [100, 120];

// ================================================================ t01 Money as a medium of exchange; modern forms of money
Q('m_dcw', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'In a barter system, a "double coincidence of wants" means that',
  opts: [
    'each person wants what the other person has to offer in exchange',
    'both people want the same good at the same time',
    'a person needs two kinds of goods to complete one exchange',
    'goods are exchanged twice before they reach the final buyer',
  ],
  sol: 'Barter works only if A wants what B has **and** B wants what A has. Wanting the same good, needing two goods or exchanging twice are not what the term means.',
}));
Q('m_dcw_scene', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A weaver in an imagined village wants rice but has only shawls to offer. The rice farmer does not need a shawl; he wants a plough. What problem does the weaver face?',
  opts: [
    'There is no double coincidence of wants',
    'The rice farmer has no collateral',
    'The interest rate on the shawl is too high',
    'The weaver does not have a demand deposit',
  ],
  sol: 'The farmer does not want what the weaver offers, so a direct barter cannot happen: the double coincidence of wants is missing. Money solves this, because the farmer would accept money and use it to buy a plough. Collateral, interest and deposits are about credit and banking, not this exchange.',
}));
Q('m_medium', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Money is called a **medium of exchange** because',
  opts: [
    'it acts as an intermediate in the exchange process, accepted by everyone in return for goods and services',
    'it is made of precious metals such as gold and silver',
    'it can be printed by anyone who needs it',
    'it removes the need to produce goods',
  ],
  sol: 'Money stands in the middle of exchanges: a seller accepts it because he can use it to buy something else. Modern money is not made of precious metals, only the Reserve Bank (for notes) and the government (for coins) issue it, and goods must still be produced.',
}));
Q('m_issuer', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In India, currency notes are issued on behalf of the central government by',
  opts: ['the Reserve Bank of India', 'the State Bank of India', 'the Ministry of Finance\'s tax department', 'NABARD'],
  sol: 'The Reserve Bank of India issues currency notes on behalf of the central government. SBI is a commercial bank, and NABARD is a development bank for agriculture and rural areas.',
}));
Q('m_legal_tender', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is the rupee accepted as a medium of exchange by everyone in India?',
  opts: [
    'It is authorised by the government, and Indian law does not allow anyone to refuse payment made in rupees',
    'Each rupee note can be exchanged at a bank for its value in gold',
    'Rupee notes are made of very costly paper',
    'Only people with bank accounts may use rupees',
  ],
  sol: 'Currency is accepted because it is **authorised by the government** as legal tender. Notes are not backed by a promise of gold, the paper\'s cost is irrelevant, and everyone, with or without an account, can use cash.',
}));
Q('m_demand_dep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why are bank deposits that can be withdrawn on demand considered a form of money?',
  opts: [
    'They can be withdrawn whenever needed and used for payments by cheque, card or UPI, so they are widely accepted',
    'They cannot be used until the bank allows it after many years',
    'They are made of metal coins kept safely by the bank',
    'They earn no interest at all',
  ],
  sol: 'Demand deposits can be drawn at any time and transferred directly to pay others; this is what gives them the essential feature of money (wide acceptance). They are not locked away, are not coins, and usually earn some interest.',
}));
Q('m_cheque', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A shopkeeper in Pune pays a supplier ₹40,000 by cheque. What happens when the supplier deposits the cheque in his bank?',
  opts: [
    'The amount is transferred from the shopkeeper\'s account to the supplier\'s account',
    'The supplier receives ₹40,000 worth of gold',
    'The Reserve Bank prints new notes of ₹40,000 for the supplier',
    'The shopkeeper\'s debt to the supplier is cancelled without any payment',
  ],
  sol: 'A cheque instructs the bank to pay a specific amount from the drawer\'s account to the person named. The money moves between accounts; no gold changes hands and no new notes are printed.',
}));
Q('m_upi', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A vegetable seller in Guwahati accepts payment by scanning a QR code with UPI. Which form of money is actually being used?',
  opts: [
    'Demand deposits moved from the buyer\'s bank account to the seller\'s',
    'Coins issued by the government',
    'A barter of goods for goods',
    'An informal loan from the seller to the buyer',
  ],
  sol: 'UPI is a way of transferring demand deposits instantly between bank accounts. No coins change hands, it is not barter, and the buyer pays at once, so there is no loan.',
}));
Q('ar_dcw', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Money removes the need for a double coincidence of wants.',
  r: 'A person holding money can exchange it for any good or service he wants, because everyone accepts it.',
  sol: 'Both are true, and R explains A: because money is accepted by everyone, a seller does not need to find a buyer who has exactly what he wants.',
}));
Q('ar_metal', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Modern currency is accepted because it is made of precious metals.',
  r: 'Before modern currency, many societies used coins of gold, silver and copper as money.',
  sol: 'A is false: modern notes and coins have little value as material; they are accepted because the government authorises them. R is true as a statement about earlier forms of money.',
}));
Q('tf_refuse', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? In India, a shopkeeper may legally refuse payment made in rupee notes and coins and demand gold instead.',
  sol: 'The rupee is legal tender: no individual in India can legally refuse a payment made in rupees.',
}));
Q('fb_dcw', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'When both parties to a barter want what the other has to sell, it is called a double ___ of wants.',
  acc: [['coincidence']],
  sol: 'The term is "double coincidence of wants".',
}));
Q('fb_cheque', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A paper that instructs a bank to pay a specific amount from a person\'s account to the person named on it is called a ___.',
  acc: [['cheque', 'check']],
  sol: 'This is a cheque.',
}));
Q('ord_money', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the forms of money in the order in which they came into use, from earliest to latest.',
  items: [
    'Grain and cattle used in exchange',
    'Coins of gold, silver and copper',
    'Paper currency notes',
    'Instant digital payments such as UPI from bank accounts',
  ],
  sol: 'Goods such as grain and cattle came first, then metal coins, then paper notes, and most recently digital transfers of bank deposits such as UPI.',
}));
Q('s_dcw', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the double coincidence of wants? How does money solve this problem?',
  model: '1. In barter, an exchange happens only if **each person wants what the other has**; this is the **double coincidence of wants**.\n2. **Money** is accepted by everyone, so a seller can take money and **buy what he needs from anyone else**.',
  sol: 'Define the term in the barter context, then explain money\'s role as an accepted intermediate.',
  scheme: [['Meaning of double coincidence of wants', 1], ['How money removes it', 1]],
}));
Q('s_modern_money', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the two main modern forms of money and say who authorises the first.',
  model: '1. **Currency**: paper notes and coins; notes are issued by the **Reserve Bank of India** on behalf of the central government.\n2. **Deposits with banks** that can be withdrawn on demand and paid by cheque, card or UPI.',
  sol: 'Currency (with its issuer) and demand deposits.',
  scheme: [['Currency with its issuer', 1], ['Demand deposits', 1]],
}));
Q('s3_deposits_money', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why demand deposits are considered money, even though nobody can hold them in the hand.',
  model: '1. Demand deposits can be **withdrawn on demand**, so they are as available as cash.\n2. They can be **transferred directly** to pay others, by **cheque, debit card or UPI**, without using notes.\n3. Because sellers and suppliers **widely accept** such payments, deposits do the work of money as a **medium of exchange**.',
  sol: 'Three linked points: withdrawable on demand; usable for payment without cash; widely accepted, hence money.',
  scheme: [['Withdrawable on demand', 1], ['Transferable for payments', 1], ['Widely accepted, so a medium of exchange', 1]],
}));

// ================================================================ t02 Loan activities of banks; two credit situations
Q('m_bank_income', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is the main source of income for banks?',
  opts: [
    'The difference between the interest charged on loans and the interest paid on deposits',
    'Fees charged to people for keeping coins safely',
    'Profits from printing currency notes',
    'Taxes collected from depositors',
  ],
  sol: 'Banks charge borrowers a higher rate of interest than they pay to depositors; the gap is their main income. Banks do not print notes or collect taxes.',
}));
Q('m_bank_cash', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why do banks keep only a small part of their deposits as cash?',
  opts: [
    'On any day only a few depositors withdraw money, so the rest can be lent out',
    'The law forbids banks from keeping cash',
    'Banks must give all deposits back to the government',
    'Cash in a bank loses its value every night',
  ],
  sol: 'Withdrawals on a given day are a small share of total deposits, so a bank keeps enough cash for them (as required by the RBI) and uses most of the rest to give loans.',
}));
Q('m_credit_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: '**Credit** (a loan) refers to',
  opts: [
    'an agreement in which a lender supplies money, goods or services to a borrower in return for a promise of future payment',
    'money kept in a bank locker',
    'a gift of money from relatives that need not be returned',
    'the tax a government collects from businesses',
  ],
  sol: 'Credit is an agreement with a promise of future payment. A locker, a gift and a tax involve no such promise to repay a lender.',
}));
Q('m_credit_good', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Before Raksha Bandhan, Neha, who makes rakhis in Jaipur, takes an advance from a wholesaler and buys threads and beads on credit. She completes the order on time, repays everyone and earns a good profit. What does this show?',
  opts: [
    'Credit helped her raise production and earnings',
    'Credit always pushes the borrower into a debt trap',
    'She would have earned more without any credit',
    'Credit is useful only to large companies',
  ],
  sol: 'Credit let Neha meet working-capital needs during a busy season; she repaid and was better off. Credit does not always trap borrowers, she could not have met the order without it, and small producers benefit too.',
}));
Q('m_debt_trap', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A farmer in an imagined district of Marathwada borrows from a moneylender to grow cotton. Pests destroy the crop, and he has to sell part of his land to repay the loan. This is an example of',
  opts: ['a debt trap', 'a double coincidence of wants', 'collateral-free formal credit', 'a self-help group loan'],
  sol: 'The loan left him worse off than before: he lost an asset to repay it. This is a debt trap. It has nothing to do with barter, and a moneylender is an informal source, not a formal one or an SHG.',
}));
Q('m_risk', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Two people take similar loans. One earns more and repays easily; the other cannot repay and loses her land. Which factor best explains the difference?',
  opts: [
    'The risk in each borrower\'s activity and whether it produced enough income to repay',
    'Whether the loan was given in notes or in coins',
    'Whether the borrowers lived in a city or a village',
    'Whether the loans were taken on a weekday or a holiday',
  ],
  sol: 'Whether credit helps or hurts depends on the risk in the activity and on whether the borrower earns enough to repay. The form of currency, the place or the day of borrowing does not decide this.',
}));
Q('ar_deposits_loans', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Banks use a major part of their deposits to give loans.',
  r: 'Only a small share of deposits is withdrawn by depositors on any given day.',
  sol: 'Both are true, and R explains A: because withdrawals on any day are small, banks need only a small cash reserve and can lend most of the rest.',
}));
Q('ar_debt_trap', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Credit can push a borrower into a situation from which recovery is very painful.',
  r: 'Banks pay interest to people who keep deposits with them.',
  sol: 'Both are true, but R is about deposits and does not explain A. A is explained by risky activities, failure of income and high repayment burdens.',
}));
Q('tf_credit_good', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Taking a loan always makes the borrower better off.',
  sol: 'Credit can raise earnings when the activity succeeds, but if income fails (crop loss, illness), repaying can force the borrower to sell assets: a debt trap.',
}));
Q('n_lend', num({
  t: 2, d: 2, c: 'application', marks: 1, value: 68, unit: 'crore ₹',
  stem: 'An imagined bank in Indore has deposits of ₹80 crore. It keeps ₹12 crore as cash to meet daily withdrawals and other requirements. How much (in ₹ crore) can it use for loans?',
  sol: 'Step 1: Amount available for loans = deposits − cash kept.\nStep 2: 80 − 12 = 68. So ₹68 crore.',
}));
Q('n_margin', num({
  t: 2, d: 3, c: 'application', marks: 2, value: 1.4, unit: 'crore ₹',
  stem: 'An imagined bank pays 6% a year on deposits of ₹60 crore and earns 10% a year on loans of ₹50 crore. What is its income from the difference in interest for the year (in ₹ crore)?',
  sol: 'Step 1: Interest earned on loans = 50 × 10 ÷ 100 = 5 (₹ crore).\nStep 2: Interest paid on deposits = 60 × 6 ÷ 100 = 3.6 (₹ crore).\nStep 3: Income from the difference = 5 − 3.6 = 1.4. So ₹1.4 crore.',
  scheme: [['Interest earned and interest paid both computed', 1], ['₹1.4 crore', 1]],
}));
Q('s_banks_loans', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do banks use the deposits they receive from people?',
  model: '1. Banks keep a **small part** of deposits as **cash** to pay depositors who withdraw on any day.\n2. They **lend most of the rest** to borrowers at a **higher interest rate** than they pay depositors, and earn the difference.',
  sol: 'Two steps: a small cash reserve; lending the rest, with the interest gap as income.',
  scheme: [['Small part kept as cash', 1], ['Rest lent at a higher interest rate', 1]],
}));
Q('s_two_sides', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give one example where credit improves a borrower\'s earnings and one where it worsens the borrower\'s situation.',
  model: '1. **Helps:** a tailor borrows to buy a second sewing machine, takes **more orders** before Eid and repays from **higher earnings**.\n2. **Hurts:** a farmer\'s **crop fails**, he cannot repay, and he must **sell his land**: a **debt trap**.',
  sol: 'One example where income rises and the loan is repaid; one where income fails and assets are lost.',
  scheme: [['Example of credit raising earnings', 1], ['Example of a debt trap', 1]],
}));
Q('s3_debt_trap', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What is a debt trap? Explain how a small farmer can fall into one.',
  model: '1. A **debt trap** arises when a borrower **cannot repay** and must borrow again or **sell assets**, ending up worse off.\n2. A small farmer borrows from a **moneylender at high interest** for seeds and fertiliser.\n3. If the **crop fails**, he has no income; interest piles up, and he must **sell land or take a new loan**.',
  sol: 'Meaning, then the chain: high-cost loan → crop failure → no income → more borrowing or loss of assets.',
  scheme: [['Meaning of debt trap', 1], ['High-cost loan for farming', 1], ['Crop failure leads to borrowing again or selling assets', 1]],
}));

// ================================================================ t03 Terms of credit; formal and informal sources; RBI
Q('m_collateral', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'An asset that a borrower owns and pledges to the lender as a guarantee until the loan is repaid is called',
  opts: ['collateral', 'a demand deposit', 'a cheque', 'the rate of interest'],
  sol: 'This is collateral (e.g. land, a house, a vehicle, gold, livestock). If the loan is not repaid, the lender may sell it to recover the money.',
}));
Q('m_collateral_ex', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following could a small farmer in Punjab offer as **collateral** for a bank loan?',
  opts: ['The title papers of his farmland', 'His Aadhaar number', 'A photograph of his crop', 'A letter from his neighbour'],
  sol: 'Collateral is an asset the lender can sell if the loan is not repaid: farmland qualifies. An ID number, a photograph or a neighbour\'s letter are not assets.',
}));
Q('m_terms', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following together make up the **terms of credit**?',
  opts: [
    'Interest rate, collateral, documentation and mode of repayment',
    'Currency notes, coins and cheques',
    'The borrower\'s age, height and religion',
    'The number of branches the bank has',
  ],
  sol: 'Terms of credit are the conditions of a loan: interest rate, collateral, documents required and how repayment is made. Notes and cheques are forms of money; the others are irrelevant or unfair grounds.',
}));
Q('m_formal', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following is a **formal** source of credit?',
  opts: ['A cooperative society', 'A village moneylender', 'A trader who gives seeds on credit', 'A relative who lends money'],
  sol: 'Banks and cooperatives are formal sources, supervised under law. Moneylenders, traders, employers and relatives are informal sources.',
}));
Q('m_rbi_role', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which is one way in which the Reserve Bank of India supervises banks?',
  opts: [
    'It checks that banks keep a minimum cash balance and lend to small cultivators and small industries, not only to big businesses',
    'It fixes the interest rate that every moneylender must charge',
    'It runs all self-help groups in villages',
    'It approves each personal loan that a bank gives',
  ],
  sol: 'The RBI monitors cash balances and how and to whom banks lend, using the information banks submit periodically. It does not supervise moneylenders (they are informal), does not run SHGs and does not approve individual loans.',
}));
Q('m_informal_why', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Shabnam, a landless labourer in an imagined village of Bihar, borrows from a moneylender instead of a bank. Which is the most likely reason?',
  opts: [
    'The bank asks for collateral and documents she does not have, while the moneylender knows her and lends without them',
    'The moneylender charges a lower interest rate than the bank',
    'Banks are not allowed to lend to women',
    'The moneylender is supervised by the RBI',
  ],
  sol: 'Lack of collateral and documents keeps many poor borrowers away from banks; informal lenders know them personally. Moneylenders usually charge more, banks do lend to women, and the RBI does not supervise moneylenders.',
}));
Q('m_informal_rate', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why can informal lenders charge very high interest rates?',
  opts: [
    'No organisation supervises their lending, and poor borrowers have few other sources',
    'The RBI requires them to charge high rates',
    'Their borrowers always have large amounts of collateral',
    'They pay high interest to their own depositors',
  ],
  sol: 'Informal lending is unregulated, and borrowers who lack access to banks have little choice. The RBI does not set their rates, poor borrowers usually lack collateral, and moneylenders do not take deposits like banks.',
}));
Q('m_cheap_credit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why is **cheap and affordable** credit important for a country\'s development?',
  opts: [
    'More people can borrow to start or expand farms and businesses, raising incomes, and less of their earnings go to repayment',
    'It allows lenders to earn the highest possible interest',
    'It means borrowers never need to repay their loans',
    'It reduces the need for banks in villages',
  ],
  sol: 'Low-cost credit lets more people invest productively and keep more of what they earn. It is not about higher lender profits, loans must still be repaid, and spreading banks to villages is what makes credit affordable.',
}));
Q('m_statements', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Read the statements.\n\nI. Formal lenders are supervised by the Reserve Bank of India.\nII. Informal lenders usually charge lower interest than banks.\nIII. Poor households depend more on informal sources than rich households do.\n\nWhich of these are correct?',
  opts: ['I and III only', 'I and II only', 'II and III only', 'I, II and III'],
  sol: 'I is correct. II is wrong: informal lenders usually charge **higher** interest. III is correct: the poor lack collateral and access to banks. So I and III only.',
}));
Q('ar_rbi_informal', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Informal lenders often use unfair means to recover their loans.',
  r: 'The Reserve Bank of India supervises the loan activities of moneylenders.',
  sol: 'A is true. R is false: there is no organisation that supervises informal lenders; that is precisely why they can charge any interest and use unfair means.',
}));
Q('ar_collateral', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Many poor households are unable to get loans from banks.',
  r: 'Bank loans usually require collateral and proper documents, which poor households often lack.',
  sol: 'Both are true, and R explains A: lack of collateral and documentation is a major barrier to formal credit for the poor.',
}));
Q('ar_rate_formal', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Moneylenders lend at lower interest rates than banks.',
  r: 'Moneylenders usually know their borrowers personally.',
  sol: 'A is false: moneylenders usually charge much higher rates. R is true: personal knowledge is why they lend without collateral or documents.',
}));
Q('tf_coop', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Cooperative societies are a formal source of credit.',
  sol: 'Cooperatives, like banks, are formal sources: they are registered and work under rules, unlike moneylenders and traders.',
}));
Q('fb_collateral', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Land, a house, a vehicle or gold pledged with a lender until a loan is repaid is called ___.',
  acc: [['collateral']],
  sol: 'Such a pledged asset is collateral.',
}));
Q('mt_terms', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each term of credit with what it means.',
  pairs: [
    ['Interest rate', 'The extra amount, as a percentage, that the borrower pays on top of the loan'],
    ['Collateral', 'An asset pledged as a guarantee until the loan is repaid'],
    ['Documentation', 'Papers such as proof of identity, income or land records that the lender asks for'],
    ['Mode of repayment', 'Whether the loan is repaid in instalments or at once, and when'],
  ],
  sol: 'Interest is the cost of borrowing; collateral is the guarantee; documentation is the paperwork; the mode of repayment is the schedule.',
}));
Q('mt_sources', match({
  t: [3, 4], d: 2, c: 'application',
  stem: 'Match each imagined loan with its source.',
  pairs: [
    ['Ravi takes a crop loan from the State Bank of India branch in his town', 'A commercial bank (formal)'],
    ['A milk producers\' society lends to its members for cattle feed', 'A cooperative (formal)'],
    ['Sita borrows from a lender in her village at 4% a month without papers', 'A moneylender (informal)'],
    ['Women in Erode borrow from their own pooled savings', 'A self-help group'],
  ],
  sol: 'SBI is a commercial bank; a milk producers\' society is a cooperative; a village lender charging high monthly interest without papers is a moneylender; borrowing from pooled savings is how an SHG works.',
}));
Q('n_interest', num({
  t: 3, d: 2, c: 'application', marks: 2, value: 2400, unit: '₹',
  stem: 'Kamla borrows ₹20,000 from a moneylender at 2% interest **per month** (simple interest) for 6 months. How much interest must she pay (in ₹)?',
  sol: 'Step 1: Interest per month = 20,000 × 2 ÷ 100 = 400.\nStep 2: For 6 months = 400 × 6 = 2,400.\nStep 3: She pays ₹2,400 as interest.',
  scheme: [['Interest per month computed', 1], ['₹2,400 for six months', 1]],
}));
Q('n_annual', num({
  t: 3, d: 2, c: 'application', marks: 1, value: 36, unit: '% per year',
  stem: 'A moneylender charges 3% interest per month. What is this as a yearly rate (simple interest), in per cent?',
  sol: 'Step 1: A year has 12 months.\nStep 2: 3 × 12 = 36. The rate is 36% per year.',
}));
Q('s_terms', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by "terms of credit"? Name any two of them.',
  model: '1. **Terms of credit** are the **conditions** on which a loan is given, agreed between the lender and the borrower.\n2. Examples: the **interest rate** and **collateral** (also documentation and the mode of repayment).',
  sol: 'Meaning plus any two of interest rate, collateral, documentation, mode of repayment.',
  scheme: [['Meaning', 1], ['Two terms named', 1]],
}));
Q('s_rbi', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does the Reserve Bank of India supervise the functioning of formal sources of loans? Give two points.',
  model: '1. It checks that banks keep a **minimum cash balance** out of their deposits.\n2. It sees that banks lend to **small cultivators, small industries and small borrowers**, not only to big businesses.',
  sol: 'Any two of: cash balance, lending to priority groups, periodic information on lending and interest rates.',
  scheme: [['First supervisory role', 1], ['Second supervisory role', 1]],
}));
Q('s_poor_informal', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why do poor households still depend largely on informal sources of credit? Give two reasons.',
  model: '1. Banks ask for **collateral and documents**, which many poor families do not have.\n2. Banks are **not present everywhere**, while moneylenders and traders live nearby, **know the borrower** and lend quickly.',
  sol: 'Two barriers to formal credit or two advantages of informal lenders for the poor.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_formal_informal', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between formal and informal sources of credit on three points.',
  model: '1. **Sources:** formal = **banks and cooperatives**; informal = **moneylenders, traders, employers, relatives**.\n2. **Supervision:** formal lenders are **supervised by the RBI**; informal lenders are **not supervised** by anyone.\n3. **Interest and terms:** formal credit is **cheaper**; informal lenders charge **higher interest** and may use **unfair means** to recover loans.',
  sol: 'Three points, each stated for both kinds of source.',
  scheme: [['Who lends', 1], ['Supervision', 1], ['Interest and recovery', 1]],
}));
Q('s3_expand_formal', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why should formal credit be expanded in rural India, and how can this be done?',
  model: '1. **Why:** informal loans carry **high interest**, so a large part of earnings goes to repayment and borrowers can fall into **debt traps**.\n2. **How:** open more **bank branches and banking correspondents**, and promote **Kisan Credit Cards and SHG–bank links**, which need little or no collateral.\n3. **Fairness:** formal credit must reach the **poor, not only the rich**, so that its benefits are shared.',
  sol: 'A reason (cost and debt traps), two ways of expansion, and the equity point.',
  scheme: [['Why: cost of informal credit', 1], ['How: reach and low-collateral schemes', 1], ['Reaching the poor, not only the rich', 1]],
}));
Q('l_formal_informal', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare formal and informal sources of credit. Why is it important that the poor get more of their loans from formal sources?',
  model: '1. **Sources:** formal = **banks and cooperatives**; informal = **moneylenders, traders, employers, relatives and friends**.\n2. **Supervision:** formal lenders work under **RBI rules**; informal lending is **not supervised**, so lenders can charge any rate and use **unfair means**.\n3. **Terms:** formal loans need **collateral and documents** but are **cheaper**; informal loans are quick, often without papers, but **costly**.\n4. **Effect on borrowers:** high informal interest takes a large share of earnings and can cause **debt traps**; borrowers may avoid starting enterprises.\n5. **Why formal for the poor:** cheaper loans raise **incomes** and let the poor **invest**; today the rich get most formal credit, so expanding it to the poor makes growth **fairer**.',
  sol: 'Four points of comparison (who, supervision, terms, effects) and one reasoned point on why formal credit must reach the poor.',
  scheme: [['Who lends', 1], ['Supervision', 1], ['Terms of credit', 1], ['Effect on borrowers', 1], ['Why the poor need formal credit', 1]],
}));
Q('l_terms_eval', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Collateral protects the lender, but it can shut out the poorest borrowers." Evaluate this statement and suggest how credit can still reach those without collateral.',
  model: '1. **Protects the lender:** if the borrower does not repay, the lender can **sell the collateral** (land, gold, a house) to recover the money.\n2. **Lowers risk and cost:** because the risk is lower, banks can lend at **lower interest rates**.\n3. **Shuts out the poor:** landless labourers and small vendors have **no land or gold**, so banks refuse them and they turn to **costly moneylenders**.\n4. **Solutions:** **self-help groups** let members borrow without collateral; after regular saving, the **group** gets a bank loan, and members check each other\'s repayment.\n5. **Judgement:** the statement is **largely true**; collateral-free tools such as **SHG–bank links, Kisan Credit Cards and small-loan schemes** are needed so that the poor are not excluded.',
  sol: 'Two points for the lender\'s side, one for the cost to the poor, one remedy, and a judgement.',
  scheme: [['Protects the lender', 1], ['Lower risk allows lower interest', 1], ['Excludes the poor', 1], ['Collateral-free remedy (SHGs etc.)', 1], ['Reasoned judgement', 1]],
}));
Q('l_data_loans', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Study the table from an **imagined survey** of 200 households in a district and answer: compare the sources of loans of the two groups, explain the reasons for the difference, and state its consequences.\n\n| Households | Loans from banks and cooperatives (%) | Loans from moneylenders, traders and others (%) |\n|---|---|---|\n| Better-off (top half by income) | 80 | 20 |\n| Poor (bottom half by income) | 30 | 70 |\n\n*(Imagined figures written by SOYL for practice.)*',
  model: '1. **Comparison:** better-off households get **80%** of loans from **formal** sources; poor households only **30%**, and **70%** from **informal** lenders.\n2. **Reason 1:** the poor lack **collateral** (land, gold) and **documents** that banks require.\n3. **Reason 2:** informal lenders are **nearby, know them** and lend quickly, though at **higher interest**.\n4. **Consequence:** the poor pay **more for credit**, so a larger part of their income goes to repayment and some fall into **debt traps**.\n5. **Consequence for equality:** cheap formal credit mainly helps the **better-off**, so the **gap between rich and poor widens** unless formal credit reaches the poor.',
  sol: 'Quote both rows (80/20 and 30/70), give two reasons, then two consequences: cost to the poor and wider inequality.',
  scheme: [['Comparison with figures', 1], ['Reason: collateral and documents', 1], ['Reason: access to informal lenders', 1], ['Consequence: high cost, debt trap', 1], ['Consequence: inequality', 1]],
}));

// ================================================================ t04 Self-help groups
Q('m_shg_size', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A typical self-help group (SHG) in rural India has about',
  opts: ['15–20 members, mostly women from one neighbourhood', '2–3 members from one family', '500 members from many districts', 'one member who lends to others'],
  sol: 'An SHG is a small group, typically of about 15–20 members, usually poor women from the same locality, who save and borrow together.',
}));
Q('m_shg_collateral', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why can SHG members borrow without giving collateral?',
  opts: [
    'The group as a whole takes responsibility for repayment, and members know and check one another',
    'The RBI repays all SHG loans that are not returned',
    'SHG loans never have to be repaid',
    'Every SHG member owns a large amount of land',
  ],
  sol: 'Group responsibility and peer checking replace collateral: if one member does not repay, the others follow it up. The RBI does not repay SHG loans, loans must be repaid, and members are usually poor.',
}));
Q('m_shg_bank', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After an SHG has saved regularly for a year or two, it becomes eligible for',
  opts: ['a bank loan sanctioned in the name of the group', 'a government salary for each member', 'the right to issue currency notes', 'automatic cancellation of members\' old debts'],
  sol: 'Banks lend to the group, in its name, to create self-employment for members. The other options are not how SHGs work.',
}));
Q('m_shg_decides', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'In an imagined SHG in Erode, members vote to lend ₹15,000 to Selvi to buy a sewing machine, repayable in ten monthly instalments. Who has made this decision?',
  opts: ['The group members themselves', 'The Reserve Bank of India', 'The district collector', 'A moneylender appointed by the bank'],
  sol: 'Most decisions about savings and loans (purpose, amount, interest, repayment) are taken by the group members.',
}));
Q('m_shg_social', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Apart from credit, how do SHGs help rural women?',
  opts: [
    'Regular meetings give them a platform to discuss health, nutrition and violence, and they gain confidence and financial independence',
    'They allow women to avoid all work outside the home',
    'They replace schools and hospitals in villages',
    'They guarantee every member a government job',
  ],
  sol: 'SHGs empower women socially and economically: meetings, shared decisions and independent income build confidence and a voice. They do not replace public services or guarantee jobs.',
}));
Q('m_grameen', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The Grameen Bank, a well-known example of lending to the poor through groups, was started in',
  opts: ['Bangladesh', 'Sri Lanka', 'Nepal', 'Myanmar'],
  sol: 'The Grameen Bank of Bangladesh, founded by Professor Muhammad Yunus, lends to poor women through small groups; Yunus and the bank shared the Nobel Peace Prize in 2006.',
}));
Q('ar_shg', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'Self-help groups help borrowers overcome the problem of lack of collateral.',
  r: 'Loans to SHG members are backed by the group\'s responsibility for repayment.',
  sol: 'Both are true, and R explains A: group responsibility takes the place of collateral.',
}));
Q('ar_shg_rate', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'SHG members can borrow small amounts at interest lower than moneylenders charge.',
  r: 'SHGs are run by moneylenders who want to earn high profits.',
  sol: 'A is true: members lend their pooled savings to each other at reasonable rates. R is false: SHGs are run by their members, not by moneylenders.',
}));
Q('tf_shg', tf({
  t: 4, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? In a self-help group, members pool their savings and give small loans to one another.',
  sol: 'Pooling savings and lending from the pool to members is the basic working of an SHG.',
}));
Q('fb_shg', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Small groups of rural poor, mostly women, who pool their savings and lend to members are called ___ groups.',
  acc: [['self-help', 'self help', 'SHG']],
  sol: 'They are self-help groups (SHGs).',
}));
Q('ord_shg', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps through which an SHG usually develops, in the correct order.',
  items: [
    'Women of a neighbourhood form a group and agree to save a fixed amount regularly',
    'The pooled savings are lent to members for small needs',
    'After a year or two of regular saving and repayment, the group becomes eligible for a bank loan',
    'The bank loan, in the group\'s name, helps members start or expand small enterprises',
  ],
  sol: 'Forming the group and saving come first; then internal lending from savings; then eligibility for a bank loan; finally the loan funds self-employment.',
}));
Q('n_shg_pool', num({
  t: 4, d: 2, c: 'application', marks: 1, value: 36000, unit: '₹',
  stem: 'An imagined SHG has 15 members. Each saves ₹200 a month. How much will the group have saved in one year (in ₹), before any interest?',
  sol: 'Step 1: Monthly saving of the group = 15 × 200 = 3,000.\nStep 2: For 12 months = 3,000 × 12 = 36,000. So ₹36,000.',
}));
Q('s_shg_work', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does a self-help group work? Give two points.',
  model: '1. About **15–20 women** of one area **pool their savings** and lend **small amounts** to members.\n2. After regular saving, the group gets a **bank loan in its name**, and members are **jointly responsible** for repayment.',
  sol: 'Savings and internal lending; bank linkage with group responsibility.',
  scheme: [['Pooled savings and internal loans', 1], ['Bank loan to the group with joint responsibility', 1]],
}));
Q('s_shg_collateral', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do self-help groups solve the problem of lack of collateral?',
  model: '1. The **group** borrows from the bank, and the **group as a whole** is responsible for repayment, so **no collateral** is needed.\n2. Members **know each other** and follow up any member who does not repay, which keeps repayment high.',
  sol: 'Group responsibility replaces collateral; peer pressure secures repayment.',
  scheme: [['Group responsibility instead of collateral', 1], ['Peer follow-up ensures repayment', 1]],
}));
Q('s3_shg_women', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three ways in which self-help groups empower rural women.',
  model: '1. **Economic independence:** loans let women start **tailoring, dairy or small shops**, so they earn their own income.\n2. **Freedom from moneylenders:** cheap credit within the group reduces dependence on **high-interest** informal loans.\n3. **Voice and confidence:** regular meetings let women discuss **health, nutrition and domestic violence**, keep accounts and deal with banks.',
  sol: 'One economic, one about cheaper credit, one social point.',
  scheme: [['Own income through enterprise', 1], ['Freedom from costly informal credit', 1], ['Social voice and confidence', 1]],
}));
Q('s3_shg_eval', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'An official says, "Self-help groups alone can end rural poverty." Do you agree? Give reasons.',
  model: '1. **Partly.** SHGs give poor women **cheap credit without collateral** and help them start small enterprises.\n2. **But** their loans are **small**; enterprises also need **markets, skills, roads and electricity**.\n3. So SHGs are a powerful **tool** but must be combined with **jobs, education, health care and infrastructure** to end poverty.',
  sol: 'Take a balanced position: what SHGs achieve, their limits, and what else is needed.',
  scheme: [['Strengths of SHGs', 1], ['Limits of SHGs', 1], ['Balanced conclusion', 1]],
}));
Q('l_shg', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What are self-help groups? Explain how they work and how they benefit their members.',
  model: '1. **Meaning:** small groups of about **15–20** rural poor, mostly **women** from one locality, who **save together** and lend to members.\n2. **Working:** members save regularly; the pooled money is lent for small needs at **reasonable interest**.\n3. **Bank linkage:** after a year or two, the group gets a **bank loan in its name**, for **self-employment** of members.\n4. **No collateral:** the **group is responsible** for repayment; members decide on loans and follow up defaulters.\n5. **Benefits:** members escape **moneylenders**, start **enterprises**, and gain **confidence** and a platform for issues like health and violence.',
  sol: 'Meaning, three points on working (savings, bank linkage, group responsibility), and benefits.',
  scheme: [['Meaning', 1], ['Savings and internal lending', 1], ['Bank linkage', 1], ['Group responsibility, no collateral', 1], ['Benefits to members', 1]],
}));

// ================================================================ sources and cases
Q('sb_diary', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From the notebook of Bhima, a groundnut farmer in Anantapur, Andhra Pradesh (imagined), 2023**\n\nJune: Took ₹30,000 from the trader Reddy garu for seeds and fertiliser. He asked no papers, but I must sell my groundnut to him after harvest, at his price. Interest is 3 per cent a month.\n\nOctober: The rains failed in August. The crop is half of last year\'s. Reddy garu took all of it and says I still owe him ₹14,000.\n\nNovember: Took another ₹15,000 from a moneylender to repay Reddy garu and to buy food. My wife has pledged her gold earrings. The bank manager says my land papers are in my father\'s name, so he cannot give me a crop loan.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'understanding', marks: 1, stem: 'Name the two informal sources of credit that Bhima used.', model: 'The **trader** (Reddy garu) and the **moneylender**.', sol: 'Both lenders in the notebook are outside the formal sector.', scheme: [['Trader and moneylender', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which term of credit made the trader\'s loan especially costly for Bhima, apart from the interest?', model: 'He had to **sell his crop to the trader at the trader\'s price** (the mode of repayment).', sol: 'Look for a condition attached to the loan other than interest.', scheme: [['Forced sale of crop at the trader\'s price', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how Bhima is falling into a debt trap.', model: 'His **crop failed**, so he could not repay; he took a **new loan to repay the old one** and his family **pledged gold**. His debt is growing while his **assets shrink**, which is a debt trap.', sol: 'Trace the chain: crop failure → unpaid loan → new loan and pledged assets → worse off.', scheme: [['Failure of income to repay', 1], ['New borrowing and loss of assets', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways in which Bhima could get cheaper formal credit.', model: '(1) Get the **land records transferred** or a document from the family so the bank can give a **Kisan Credit Card** loan. (2) Join a **farmers\' cooperative** or a group loan scheme that lends **without collateral**.', sol: 'Any two workable routes to formal credit that fit his situation.', scheme: [['First workable route', 1], ['Second workable route', 1]] }),
    ]),
  ],
}));
Q('sb_shg_meeting', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Minutes of the monthly meeting of the Jyoti Mahila Self-Help Group, Sitapur district, Uttar Pradesh (imagined), March 2025**\n\nAll 17 members were present. Each member deposited her monthly saving. The group\'s savings now stand at ₹61,200. Kamla Devi repaid the last instalment of her loan for a buffalo; she now sells milk to the dairy cooperative. Two new loans were approved by vote: Rehana for a tailoring machine and Sunita for her son\'s school fees. The bank has sanctioned a loan of ₹2 lakh to the group, which members will use to start a pickle unit together. The meeting ended with a talk by the ASHA worker on iron-rich food for pregnant women.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Who decided to give loans to Rehana and Sunita?', model: 'The **group members**, by **vote**.', sol: 'Read who approved the loans.', scheme: [['The members by vote', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Give one piece of evidence that the group has become eligible for formal credit.', model: 'The **bank has sanctioned a loan of ₹2 lakh to the group**.', sol: 'Look for a loan from a formal source.', scheme: [['The bank loan to the group', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the source show that SHGs do more than give loans?', model: 'The meeting included a **health talk on nutrition**, so the group is a **platform for social issues**. Members also **vote, keep accounts and run a joint enterprise**, which builds **confidence and independence**.', sol: 'Use the non-credit activities in the minutes: the health talk, democratic decisions, a joint business.', scheme: [['Social platform (health talk)', 1], ['Confidence / joint enterprise / decision-making', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why could Kamla Devi borrow for a buffalo without giving collateral?', model: 'The loan came from the **group\'s pooled savings**, and the **group is responsible** for repayment. Members **know her** and follow up instalments, so **trust and peer pressure** replace collateral.', sol: 'Explain group responsibility and peer monitoring.', scheme: [['Group responsibility', 1], ['Peer monitoring replaces collateral', 1]] }),
    ]),
  ],
}));
Q('sb_upi', source({
  t: 1, d: 2, c: 'application', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**A letter from Grandmother Lalitha in Mysuru to her granddaughter in Chennai (imagined), 2025**\n\nWhen I was a girl, my mother sometimes exchanged a basket of ragi for a pot from the potter, if he needed ragi that week. If he did not, we waited. Later, coins and notes made things simple. Today the flower seller outside the temple has a small card with a printed square, and people pay her by phone in a second. Your grandfather still pays the milkman in notes, but the milkman says he now keeps most of his earnings in the bank and pays the dairy from his phone.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'application', marks: 1, stem: 'What system of exchange did the grandmother\'s mother use with the potter?', model: '**Barter**: exchanging goods (ragi) directly for goods (a pot).', sol: 'Goods were exchanged for goods without money.', scheme: [['Barter', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Why did the family sometimes have to wait to get a pot?', model: 'There was no **double coincidence of wants**: the potter did **not always need ragi**.', sol: 'The exchange needed the potter to want ragi at that time.', scheme: [['No double coincidence of wants', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two modern forms of money are described in the letter? Explain how each is used.', model: '**Currency**: the grandfather pays the milkman in **notes**. **Demand deposits**: the flower seller is paid **by phone (UPI)** and the milkman pays the dairy from his **bank account** through his phone.', sol: 'Identify currency and deposits, each with its use from the letter.', scheme: [['Currency and its use', 1], ['Demand deposits and their use', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why are phone payments from bank accounts accepted as money by the flower seller?', model: 'The payment moves **demand deposits** into her **bank account**, which she can **withdraw on demand** or use to pay others. Since such payments are **widely accepted**, they work as a **medium of exchange**.', sol: 'Link phone payments to demand deposits and their essential features.', scheme: [['Payment moves demand deposits', 1], ['Withdrawable and widely accepted, so money', 1]] }),
    ]),
  ],
}));
Q('cb_two_loans', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined borrowers and terms written by SOYL for practice.)*',
  passage: '**Two loans of ₹50,000 for one year (imagined), Nalgonda district, Telangana**\n\n| | Loan A — village moneylender | Loan B — cooperative bank |\n|---|---|---|\n| Borrower | Yadamma, vegetable vendor | Srinivas, small farmer |\n| Interest | 3% per month | 9% per year |\n| Collateral | Her silver anklets, kept by the lender | Land documents |\n| Documents | None | Land record, identity proof, bank account |\n| Repayment | Daily collection at her stall | Lump sum after harvest |',
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: 18000, unit: '₹', stem: 'What interest will Yadamma pay in one year (simple interest), in ₹?', sol: 'Step 1: Yearly rate = 3 × 12 = 36%.\nStep 2: 50,000 × 36 ÷ 100 = 18,000. So ₹18,000.' })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: 4500, unit: '₹', stem: 'What interest will Srinivas pay in one year, in ₹?', sol: 'Step 1: 50,000 × 9 ÷ 100 = 4,500.\nStep 2: Srinivas pays ₹4,500.' })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why does Yadamma borrow on such costly terms when a cooperative bank lends far more cheaply?', model: 'She has **no land documents** or other papers the bank demands, so she **cannot get formal credit**. The moneylender **knows her**, lends quickly and collects daily, so she accepts **four times the interest** (₹18,000 vs ₹4,500).', sol: 'Use the documents and collateral rows, and the computed interest gap (18,000 ÷ 4,500 = 4).', scheme: [['Lacks the documents and collateral the bank needs', 1], ['Informal lender is accessible despite the far higher cost', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways in which vendors like Yadamma could get cheaper credit.', model: '(1) Join a **self-help group** that lends from pooled savings and gets **bank loans without collateral**. (2) Use government **small-loan schemes for street vendors** given through banks with **simple documents**.', sol: 'Any two realistic low-collateral formal routes.', scheme: [['First suitable route', 1], ['Second suitable route', 1]] }),
    ]),
  ],
}));
Q('cb_bank_sheet', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the summary and answer the questions that follow. *(Imagined bank and figures written by SOYL for practice.)*',
  passage: '**Annual summary of the imagined Narmada Gramin Bank branch, Hoshangabad**\n\n| Item | Amount (₹ lakh) | Interest rate (per year) |\n|---|---|---|\n| Deposits received | 500 | 5% paid to depositors |\n| Cash kept for withdrawals | 50 | — |\n| Loans given | 400 | 11% charged to borrowers |\n| Other uses (investments, buildings) | 50 | — |',
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: 10, unit: '%', stem: 'What percentage of its deposits does the branch keep as cash?', sol: 'Step 1: 50 ÷ 500 × 100.\nStep 2: 50 ÷ 500 = 0.1, and 0.1 × 100 = 10. So 10%.' })),
    child('b', num({ t: 2, d: 3, c: 'application', marks: 1, value: 19, unit: 'lakh ₹', stem: 'Find the branch\'s income from the difference in interest for the year (interest earned on loans minus interest paid on deposits), in ₹ lakh.', sol: 'Step 1: Interest earned = 400 × 11 ÷ 100 = 44 (₹ lakh).\nStep 2: Interest paid = 500 × 5 ÷ 100 = 25 (₹ lakh).\nStep 3: 44 − 25 = 19. So ₹19 lakh.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why can the branch safely lend ₹400 lakh when depositors have a right to withdraw ₹500 lakh?', model: 'On any one day **only a small share** of depositors withdraw money, so **₹50 lakh in cash** is enough for normal withdrawals. Loans are **repaid over time**, and the RBI checks that banks keep **enough cash balance**.', sol: 'Explain why a fractional cash reserve works and mention supervision.', scheme: [['Only a small share withdrawn daily', 1], ['Repayments and RBI rules keep it safe', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain how this branch acts as a link between savers and borrowers.', model: 'It collects **savings of depositors** and pays them **5% interest**. It **lends** most of that money to **farmers and businesses** at **11%**, so idle savings are used for **production**.', sol: 'Show both sides of the bank\'s role using the table.', scheme: [['Collects deposits from savers', 1], ['Lends them to borrowers for production', 1]] }),
    ]),
  ],
}));
Q('cb_shg_ledger', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined group and figures written by SOYL for practice.)*',
  passage: '**Loans given by the Pragati SHG, Kalahandi, Odisha (imagined), in one year**\n\n| Purpose of loan | Number of loans | Amount (₹) |\n|---|---|---|\n| Goats and poultry | 6 | 36,000 |\n| Small shop or tailoring | 4 | 32,000 |\n| Children\'s education and health | 5 | 15,000 |\n| Repaying old moneylender debts | 3 | 27,000 |\n| **Total** | **18** | **1,10,000** |',
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: 68000, unit: '₹', stem: 'How much (in ₹) did the group lend for income-earning activities (livestock, shops and tailoring)?', sol: 'Step 1: Add the first two rows: 36,000 + 32,000.\nStep 2: = 68,000. So ₹68,000.' })),
    child('b', mcq({ t: 4, d: 2, c: 'understanding', stem: 'Which purpose received the highest average loan per borrower?', opts: ['Repaying old moneylender debts (₹9,000 each)', 'Small shop or tailoring (₹8,000 each)', 'Goats and poultry (₹6,000 each)', 'Children\'s education and health (₹3,000 each)'], sol: 'Averages: 27,000 ÷ 3 = 9,000; 32,000 ÷ 4 = 8,000; 36,000 ÷ 6 = 6,000; 15,000 ÷ 5 = 3,000. The highest is for repaying old debts.' })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why is it significant that three members borrowed to repay old moneylender debts?', model: 'They replaced **costly informal loans** with **cheaper SHG loans**, cutting their interest burden. This helps them **escape a debt trap** and keep more of their income.', sol: 'Compare the cost of the two kinds of loans and the effect on the borrowers.', scheme: [['Cheaper credit replaces costly informal debt', 1], ['Escape from the debt trap / more income retained', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Do you think the group\'s lending pattern is sensible? Give two reasons.', model: 'Yes. (1) The largest share, **₹68,000 of ₹1,10,000**, went to **income-earning** activities that help members repay. (2) Loans for **education and health** and to clear **moneylender debts** protect families from future poverty.', sol: 'Use the table to judge the balance between productive and protective loans.', scheme: [['Reason based on productive loans', 1], ['Reason based on protective loans', 1]] }),
    ]),
  ],
}));

// ================================================================ additional practice
Q('mt_money', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined payment with the form of exchange or money it uses.',
  pairs: [
    ['A fisherwoman gives fish to a neighbour in return for a sack of coconuts', 'Barter'],
    ['A student pays the bus conductor with a ₹20 note', 'Currency'],
    ['A shop owner pays her supplier with a signed paper instructing her bank', 'Cheque drawn on a demand deposit'],
    ['A customer pays a tea stall by scanning a QR code', 'UPI transfer of a demand deposit'],
  ],
  sol: 'Goods for goods is barter; a note is currency; a signed instruction to a bank is a cheque; scanning a QR code moves a bank deposit through UPI.',
}));
Q('s_upi_change', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How have digital payments such as UPI changed the way money is used in India? Give two points.',
  model: '1. People pay even **small amounts** to vendors **from bank accounts**, so **demand deposits** are used far more than before.\n2. Payments are **instant and recorded**, so sellers need less **cash** and can show their income when seeking **loans**.',
  sol: 'Two effects: wider use of deposits in daily payments; less cash and a record of transactions.',
  scheme: [['Wider use of demand deposits in daily payments', 1], ['Less cash / transaction records', 1]],
}));
Q('s3_bank_link', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how banks act as a link between people who save and people who need loans.',
  model: '1. Banks accept **deposits** from savers and pay them **interest**; the money is safe and can be withdrawn on demand.\n2. Keeping a **small cash reserve**, banks **lend** most of these deposits to farmers, traders and firms.\n3. Borrowers pay a **higher interest**; the difference is the bank\'s income, and idle savings are put to **productive use**.',
  sol: 'Deposits from savers; loans to borrowers; the interest gap and the productive use of savings.',
  scheme: [['Accept deposits and pay interest', 1], ['Lend most deposits', 1], ['Interest gap; savings used productively', 1]],
}));
Q('l_money', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how money developed from barter to modern forms, and why modern forms of money are accepted.',
  model: '1. **Barter:** goods were exchanged for goods, which needed a **double coincidence of wants**; this made exchange slow and difficult.\n2. **Early money:** goods such as **grain and cattle**, and later **coins of gold, silver and copper**, were used as money.\n3. **Currency:** today **paper notes and coins** are used; the **RBI** issues notes on behalf of the central government.\n4. **Why accepted:** currency is **authorised by the government** as legal tender, so **no one can refuse** payment in rupees.\n5. **Deposits:** **demand deposits** can be withdrawn on demand and paid by **cheque, card or UPI**, so they are widely accepted as money too.',
  sol: 'Barter and its problem, early money, modern currency, the reason for acceptance, and deposits as money.',
  scheme: [['Barter and its problem', 1], ['Early forms of money', 1], ['Modern currency and its issuer', 1], ['Why currency is accepted', 1], ['Demand deposits as money', 1]],
}));
Q('l_credit', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: '"Credit can be a source of progress as well as a trap." Explain with the help of examples.',
  model: '1. **Meaning:** credit is an agreement in which a lender gives money, goods or services for a **promise of future payment**.\n2. **Progress:** a potter in Khurja borrows to buy a **kiln**, makes more pots for **Diwali orders**, repays and **earns more**.\n3. **Why it helps:** credit meets **working capital** needs, so production rises and the borrower ends **better off**.\n4. **Trap:** a farmer borrows at **high interest**; the **crop fails**, so he borrows again and **sells land** to repay.\n5. **What decides:** the outcome depends on the **risk** of the activity, the **terms** (interest, collateral) and support if income fails; cheap formal credit lowers the danger.',
  sol: 'Define credit, give one example where it helps and one where it traps, and identify what decides the outcome.',
  scheme: [['Meaning of credit', 1], ['Example of progress', 1], ['Why credit helps', 1], ['Example of a debt trap', 1], ['What decides the outcome', 1]],
}));
Q('m_cheapest', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Four imagined offers for a loan of ₹10,000 for 6 months (simple interest). Which is the **cheapest**?',
  opts: ['15% a year', '1.5% a month', 'A flat ₹1,000 of interest for the six months', '2% a month'],
  sol: 'Interest for 6 months on ₹10,000: at 15% a year, 10,000 × 15 ÷ 100 × 6 ÷ 12 = 750; at 1.5% a month, 10,000 × 1.5 ÷ 100 × 6 = 900; the flat offer costs 1,000; at 2% a month, 10,000 × 2 ÷ 100 × 6 = 1,200. The lowest is 750, the offer of 15% a year.',
}));
Q('n_save', num({
  t: 3, d: 4, c: 'analysis', marks: 2, value: 3000, unit: '₹',
  stem: 'Kamal (imagined) needs ₹30,000 for one year. A moneylender charges 2% a month. A bank charges 12% a year plus a one-time processing fee of ₹600. How much does Kamal save (in ₹) by borrowing from the bank?',
  sol: 'Step 1: Moneylender: 2% a month = 24% a year; 30,000 × 24 ÷ 100 = 7,200.\nStep 2: Bank: 30,000 × 12 ÷ 100 = 3,600, plus the fee 600 = 4,200.\nStep 3: Saving = 7,200 − 4,200 = 3,000. Kamal saves ₹3,000.',
  scheme: [['Cost of both loans worked out, including the fee', 1], ['Saving of ₹3,000', 1]],
}));
