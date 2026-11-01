// ISC 12 Commerce, ch04 Short-term Sources of Funds — question bank. Every firm, person, figure and situation is
// imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE
// specimen or board item is reused (D-036). No current interest rates, deposit ceilings or regulatory limits are
// stated; all rates are imagined round numbers for calculation.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child, num } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];
export const inr = (n) => Number(n).toLocaleString('en-IN');

// Imagined figures, computed and asserted.
export const BILL = { face: 200000, rate: 0.12, months: 3 };
BILL.discount = (BILL.face * BILL.rate * BILL.months) / 12;
BILL.paid = BILL.face - BILL.discount;
export const CC = { limit: 1000000, used: 600000, rate: 0.12 };
CC.intUsed = (CC.used * CC.rate) / 12;
CC.intLoan = (CC.limit * CC.rate) / 12;
export const FAC = { book: 1000000, adv: 0.8, comm: 0.02 };
FAC.advance = FAC.book * FAC.adv;
FAC.fee = FAC.book * FAC.comm;
FAC.net = FAC.advance - FAC.fee;
export const INST = { price: 900000, down: 0.2, months: 24, rate: 0.1 };
INST.downAmt = INST.price * INST.down;
INST.balance = INST.price - INST.downAmt;
INST.interest = (INST.balance * INST.rate * INST.months) / 12;
INST.emi = (INST.balance + INST.interest) / INST.months;
if (BILL.discount !== 6000 || BILL.paid !== 194000 || CC.intUsed !== 6000 || CC.intLoan !== 10000 || FAC.advance !== 800000 || FAC.fee !== 20000 || FAC.net !== 780000 || INST.balance !== 720000 || INST.interest !== 144000 || INST.emi !== 36000) throw new Error('figures');

// ================================================================ t01 Commercial banks
Q('m_od', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Malabar Spice Traders, an imagined firm in Kozhikode, has ₹40,000 in its current account. With the bank\'s permission it issues a cheque for ₹1,50,000 to a pepper grower. The bank allows this under',
  opts: ['an overdraft facility', 'a fixed deposit', 'a term loan for ten years', 'factoring of receivables'],
  sol: 'An overdraft lets a current-account holder draw more than the balance, up to an agreed limit; interest is charged only on the amount overdrawn.',
}));
Q('m_cc', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Kolar Kraft Papers Ltd (imagined) may borrow up to ₹50 lakh from its bank against its stock of paper rolls, drawing and repaying as needed during the year. This arrangement is',
  opts: ['cash credit', 'a public deposit', 'trade credit', 'an inter-corporate deposit'],
  sol: 'Cash credit is a borrowing limit against security such as stock (by hypothecation or pledge); the firm draws within the limit as needed.',
}));
Q('m_stloan', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Under a short-term loan, Ganjam Garments Ltd (imagined) receives ₹10 lakh in one lump sum credited to its account. How does the interest differ from a cash credit of the same limit?',
  opts: [
    'Interest is charged on the whole ₹10 lakh from the start, even if part lies unused',
    'No interest is charged on a loan',
    'Interest is charged only on the amount actually drawn',
    'Interest is paid by the bank to the firm',
  ],
  sol: 'A loan is disbursed in full, so interest runs on the entire amount; under cash credit interest is charged only on the amount used.',
}));
Q('m_discount', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Amravati Auto Parts Ltd (imagined) holds a customer\'s accepted bill for ₹2 lakh due in three months. It needs cash today, so its bank pays it the amount less a charge and collects from the customer later. This is',
  opts: ['discounting of a bill of exchange', 'an overdraft', 'a customer advance', 'instalment credit'],
  sol: 'The bank buys the bill before maturity, paying its value less a discount: discounting of bills.',
}));
Q('m_bank_pqrs', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of these are forms of **short-term** financial assistance from commercial banks?\nP. Overdraft\nQ. Cash credit\nR. Issue of debentures\nS. Discounting of bills',
  opts: ['P, Q and S', 'P, Q and R', 'Q, R and S', 'R and S only'],
  sol: 'Overdraft, cash credit and bill discounting are short-term bank facilities; debentures are a long-term instrument issued by the company itself.',
}));
Q('ar_od_interest', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'An overdraft is a cheap way to meet a short, uneven need for cash.',
  r: 'Interest on an overdraft is charged only on the amount actually overdrawn and for the period it is used.',
  key: 'a',
  sol: 'Both are true. Because interest runs only on the overdrawn balance for the days it is used, an overdraft suits short, uneven needs.',
}));
Q('tf_cc_security', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'A cash credit limit is usually given against security such as the borrower\'s stock or receivables.',
  ans: true,
  sol: 'True. Cash credit is normally secured by hypothecation or pledge of stock, or by receivables.',
}));
Q('fb_bank', fb({
  t: 1, d: 2, c: 'analysis',
  stem: 'Complete the analogy. Current account holder drawing beyond balance : Overdraft :: Bank paying a bill\'s value before it is due : ___',
  acc: [['Discounting of bills', 'bill discounting', 'discounting', 'Discounting of bill']],
  sol: 'Drawing beyond one\'s balance is an overdraft; paying a bill\'s value before maturity, less a charge, is discounting of bills.',
}));
Q('n_discount', num({
  t: 1, d: 3, c: 'application', marks: 1, value: BILL.paid, unit: '₹',
  stem: `Amravati Auto Parts Ltd (imagined) discounts a bill of ₹${inr(BILL.face)} due in ${BILL.months} months with its bank at ${BILL.rate * 100} per cent a year. How much cash does it receive today (in ₹)?`,
  sol: `Step 1: Discount = ${inr(BILL.face)} × ${BILL.rate} × ${BILL.months} ÷ 12 = ₹${inr(BILL.discount)}.\nStep 2: Cash received = ${inr(BILL.face)} − ${inr(BILL.discount)} = ₹${inr(BILL.paid)}.`,
}));
Q('n_cc', num({
  t: 1, d: 3, c: 'analysis', marks: 2, value: CC.intLoan - CC.intUsed, unit: '₹',
  stem: `Kolar Kraft Papers Ltd (imagined) needs at most ₹${inr(CC.limit)} for one month but expects to use only ₹${inr(CC.used)} on average. Interest is ${CC.rate * 100} per cent a year either way. How much interest does it save in that month by taking a cash credit instead of a short-term loan of ₹${inr(CC.limit)} (in ₹)?`,
  sol: `Step 1: Loan interest (on the whole amount) = ${inr(CC.limit)} × ${CC.rate} ÷ 12 = ₹${inr(CC.intLoan)}.\nStep 2: Cash credit interest (on the amount used) = ${inr(CC.used)} × ${CC.rate} ÷ 12 = ₹${inr(CC.intUsed)}.\nStep 3: Saving = ${inr(CC.intLoan)} − ${inr(CC.intUsed)} = ₹${inr(CC.intLoan - CC.intUsed)}.`,
  scheme: [['Both interest amounts', 1], [`Saving = ₹${inr(CC.intLoan - CC.intUsed)}`, 1]],
}));
Q('s_od_cc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Malabar Spice Traders (imagined) uses an overdraft, while Kolar Kraft Papers Ltd (imagined) uses cash credit. Distinguish the two facilities on account and security.',
  model: '1. **Account:** an overdraft is allowed on a **current account** the firm already runs; cash credit is a **separate borrowing account** with a limit.\n2. **Security:** a small overdraft may rest on the **customer\'s standing**; cash credit is usually secured on **stock or receivables**.',
  sol: 'Account and security distinguished.',
  scheme: [['Account', 1], ['Security', 1]],
}));
Q('s_bank_merits', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Champaran Chemicals Ltd (imagined) relies on its bank for short-term funds every year. State two advantages of bank finance for such a company.',
  model: '1. **Flexible:** it can draw and repay **as needs change** through the year, paying interest only on what it uses under cash credit or overdraft.\n2. **Confidential and quick:** dealings stay **private** between the bank and the company, and renewals take little time.',
  sol: 'Two advantages (flexibility, timely funds, confidentiality, simple renewal, no dilution) applied.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s3_bank_forms', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Ganjam Garments Ltd (imagined) has three needs: paying suppliers a week before a bank balance arrives, financing a large stock of cloth all season, and turning a buyer\'s accepted three-month bill into cash now. Suggest the bank facility for each need, with a reason.',
  model: '1. **Overdraft:** for the **week-long gap**, it can draw beyond its balance and pay interest only for those days.\n2. **Cash credit:** for the **season\'s cloth stock**, a limit secured on stock lets it draw as needed.\n3. **Discounting of bills:** the bank pays the **bill\'s value less a discount** now and collects on maturity.',
  sol: 'Each need matched to a facility, with a reason.',
  scheme: [['Overdraft', 1], ['Cash credit', 1], ['Discounting', 1]],
}));
Q('s3_bank_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Kalinga Cables Ltd (imagined) found that its bank wanted stock statements every month, a charge on its inventory, and renewal of the limit each year. Explain three disadvantages of bank finance shown here.',
  model: '1. **Security required:** the bank takes a **charge on inventory**, so that stock cannot back other borrowing.\n2. **Monitoring and paperwork:** **monthly stock statements** add work and cost for the finance staff.\n3. **Uncertain renewal:** the limit must be **renewed every year**, so funds could be cut when the firm needs them most.',
  sol: 'Three disadvantages (security, paperwork, renewal risk, cost) linked to the case.',
  scheme: [['First disadvantage', 1], ['Second disadvantage', 1], ['Third disadvantage', 1]],
}));
Q('l_bank', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Tirupur Tees Ltd (imagined) exports knitwear. Its cash needs rise sharply before each shipment, and its foreign buyers accept bills payable in 90 days.\n(a) Explain three forms of short-term assistance a commercial bank can give it. [3]\n(b) Explain two advantages of bank finance for this company. [2]',
  model: '(a) **Cash credit:** the bank sets a **limit** against the company\'s stock of yarn and garments, and it draws only what it needs before each shipment, paying interest on the amount used.\n**Overdraft:** it may draw **beyond its current-account balance** up to an agreed limit to cover a few days\' gap in payments.\n**Discounting of bills:** the bank pays the value of the **buyers\' 90-day bills less a discount** at once, and collects from the buyers when the bills mature.\n\n(b) **Flexibility:** the company can **draw and repay** around its shipments, so it does not pay interest on idle money. **Timely and confidential:** funds are available **quickly** once the limit is fixed, and its plans are not disclosed to the public.',
  sol: 'Three forms explained and linked to the exporter; two advantages.',
  scheme: [['(a) Three forms', 3], ['(b) Two advantages', 2]],
}));

// ================================================================ t02 Public deposits, trade credit, customer advances
Q('m_pd_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Public deposits as a source of finance are',
  opts: [
    'deposits invited by a company directly from the public, usually at a rate higher than bank deposits',
    'deposits a company keeps with its bank',
    'advances paid by customers with their orders',
    'funds lent by one company to another',
  ],
  sol: 'A company raises public deposits by inviting the public to deposit money with it for a fixed period at an attractive rate.',
}));
Q('m_pd_unsecured', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Sushila deposits ₹1 lakh with Sundergarh Steel Ltd (imagined) because it offers a higher rate than her bank. What is the main risk she takes?',
  opts: [
    'Public deposits are usually unsecured, so she may lose money if the company fails',
    'She will become an owner and share its losses',
    'She must pay the company\'s debts',
    'Her deposit will be turned into equity shares',
  ],
  sol: 'Public deposits are generally unsecured loans to the company; a depositor ranks as an unsecured creditor if the company fails.',
}));
Q('m_tc', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Bundi Bangles, an imagined workshop in Rajasthan, receives lac and glass beads from its supplier and pays 45 days later, after selling the bangles. This source of finance is',
  opts: ['trade credit', 'a public deposit', 'a cash credit', 'a customer advance'],
  sol: 'Credit given by one trader to another on the purchase of goods is trade credit.',
}));
Q('m_tc_risk', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Because its suppliers give easy credit, Pindari Provisions (imagined), a small wholesaler, keeps ordering far more stock than it can sell or pay for. This shows which drawback of trade credit?',
  opts: ['It may tempt a firm into overtrading', 'It always carries a high rate of interest', 'It requires a charge on fixed assets', 'It dilutes ownership'],
  sol: 'Easy credit can lead a firm to buy beyond its capacity to sell and pay: overtrading.',
}));
Q('m_adv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Bharuch Boilers Ltd (imagined) makes boilers to order and asks each buyer to pay 30 per cent of the price with the order. This money is a source of',
  opts: ['customer advances', 'trade credit from suppliers', 'factoring', 'retained earnings'],
  sol: 'Money paid by customers before delivery, especially for made-to-order goods, is a customer advance.',
}));
Q('ar_tc_cost', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Trade credit, though it carries no stated interest, can have a hidden cost.',
  r: 'A firm that takes the full credit period may lose the cash discount it could have earned by paying at once.',
  key: 'a',
  sol: 'Both are true. The discount given up for paying later is the hidden cost of trade credit, so the reason explains the assertion.',
}));
Q('tf_adv', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'Customer advances are an interest-free source of finance and also make the sale more certain.',
  ans: true,
  sol: 'True. No interest is paid on advances, and a buyer who has paid part of the price is less likely to cancel.',
}));
Q('fb_tc', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Credit that one business allows another on the purchase of goods, without any formal loan, is called ___ credit.',
  acc: [['trade', 'Trade credit', 'supplier', "supplier's"]],
  sol: 'It is trade credit, the most common short-term source for traders.',
}));
Q('mt_st', match({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each short-term source with its typical feature.',
  pairs: [
    ['Trade credit', 'Given by suppliers on purchase of goods'],
    ['Customer advance', 'Paid by buyers before delivery'],
    ['Public deposit', 'Raised directly from the public, usually unsecured'],
    ['Cash credit', 'A bank limit secured on stock'],
  ],
  sol: 'Suppliers give trade credit, buyers give advances, the public gives deposits, and banks give cash credit limits.',
}));
Q('s_pd_merits', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Sundergarh Steel Ltd (imagined) raises funds through public deposits. State two advantages of this source to the company.',
  model: '1. **Simple and cheap:** there are few formalities and the rate paid is usually **lower than bank borrowing** costs.\n2. **No charge or dilution:** deposits are **unsecured** and carry **no voting rights**, so assets stay free and control is unchanged.',
  sol: 'Two advantages (simple procedure, lower cost, no charge on assets, no dilution, tax-deductible interest) explained.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s_tc_merits', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Bundi Bangles (imagined) buys beads on 45 days\' credit every month. Explain two merits of trade credit for this small workshop.',
  model: '1. **Convenient and continuous:** credit comes **with each purchase**, with no paperwork or security.\n2. **Self-financing stock:** the workshop can **sell the bangles before paying** for the beads, so it needs little cash of its own.',
  sol: 'Two merits (convenience, no security, continuous, links to sales, little cost) linked to the case.',
  scheme: [['First merit', 1], ['Second merit', 1]],
}));
Q('s3_adv', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Bharuch Boilers Ltd (imagined) takes 30 per cent advances on custom boilers. Explain two merits and one limitation of customer advances for it.',
  model: '1. **Interest-free:** the 30 per cent advance pays for **steel and parts** without any interest cost.\n2. **Assured sale:** a buyer who has **paid in advance** is unlikely to cancel the order.\n3. **Limitation:** advances are possible only for **made-to-order** or scarce goods, and a **delay in delivery** may bring penalties.',
  sol: 'Two merits and one limitation linked to the boiler maker.',
  scheme: [['First merit', 1], ['Second merit', 1], ['Limitation', 1]],
}));
Q('s3_pd_limits', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A new, little-known company plans to fund a six-year expansion of its plant through public deposits. Explain three limitations of public deposits that make this plan unwise.',
  model: '1. **Short period:** deposits are taken for **short periods**, so they cannot safely fund a **six-year** expansion.\n2. **Hard for new firms:** the public deposits money only with **well-known, trusted** companies, so a new firm may raise little.\n3. **Unreliable:** depositors may **withdraw at maturity**, especially in a downturn, leaving the plant half-funded.',
  sol: 'Three limitations (short period, depends on reputation, uncertain renewal, regulatory limits) linked to the plan.',
  scheme: [['First limitation', 1], ['Second limitation', 1], ['Third limitation', 1]],
}));

// ================================================================ t03 Factoring, ICDs, instalment credit
Q('m_factor', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under factoring, a business',
  opts: [
    'sells its receivables to a factor, which gives it cash at once and collects from the debtors for a fee',
    'borrows from the public for a fixed period',
    'buys a machine and pays for it in instalments',
    'issues free shares to its customers',
  ],
  sol: 'A factor buys or finances the firm\'s receivables, pays most of their value at once and handles collection, charging a commission.',
}));
Q('m_factor_recourse', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Mysuru Silk House (imagined) factors its receivables on terms that if a customer fails to pay, the factor bears the loss. This is',
  opts: ['non-recourse factoring', 'recourse factoring', 'bill discounting with recourse', 'an inter-corporate deposit'],
  sol: 'When the factor cannot recover a bad debt from the client, the factoring is without recourse (non-recourse).',
}));
Q('m_icd', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Champaran Chemicals Ltd (imagined) has ₹5 crore of surplus cash for three months and lends it, unsecured, to Kalinga Cables Ltd (imagined) at an agreed rate. This is an example of',
  opts: ['an inter-corporate deposit', 'a public deposit', 'factoring', 'trade credit'],
  sol: 'Unsecured short-term deposits placed by one company with another are inter-corporate deposits.',
}));
Q('m_icd_call', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'An inter-corporate deposit that the lending company can withdraw at very short notice (usually one day) is called a',
  opts: ['call deposit', 'three-month deposit', 'six-month deposit', 'recurring deposit'],
  sol: 'ICDs are classed as call deposits (withdrawable at short notice), three-month deposits and six-month deposits.',
}));
Q('m_inst', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Bastar Bell Metal Crafts (imagined) buys a ₹9 lakh furnace by paying ₹1.8 lakh now and the rest, with interest, in 24 monthly payments. This source of finance is',
  opts: ['instalment credit', 'cash credit', 'a customer advance', 'factoring'],
  sol: 'Paying a down payment and the balance with interest in instalments while using the asset is instalment credit.',
}));
Q('ar_factor', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Factoring helps a firm that sells mainly on credit to improve its liquidity.',
  r: 'A factor pays the firm a large part of the value of its receivables at once.',
  key: 'a',
  sol: 'Both are true, and the immediate payment by the factor is exactly what turns receivables into cash and improves liquidity.',
}));
Q('ar_icd', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Inter-corporate deposits are a highly secure source of funds for the lending company.',
  r: 'Inter-corporate deposits are usually backed by a mortgage on the borrower\'s fixed assets.',
  key: 'd',
  sol: 'Both are false. ICDs are usually unsecured, which makes them risky for the lender.',
}));
Q('tf_factor_cost', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'Factoring is free: the factor charges nothing for advancing cash and collecting debts.',
  ans: false,
  sol: 'False. The factor charges a commission or fee, and interest on the money advanced.',
}));
Q('fb_inst', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under instalment credit, the first amount paid at the time of purchase is called the ___ payment.',
  acc: [['down', 'down payment', 'initial', 'initial payment']],
  sol: 'It is the down payment; the balance is paid in instalments with interest.',
}));
Q('n_factor', num({
  t: 3, d: 3, c: 'application', marks: 2, value: FAC.net, unit: '₹',
  stem: `Mysuru Silk House (imagined) factors receivables of ₹${inr(FAC.book)}. The factor advances ${FAC.adv * 100} per cent at once and deducts a commission of ${FAC.comm * 100} per cent of the receivables from the advance. How much cash does the firm receive now (in ₹)?`,
  sol: `Step 1: Advance = ${inr(FAC.book)} × ${FAC.adv} = ₹${inr(FAC.advance)}.\nStep 2: Commission = ${inr(FAC.book)} × ${FAC.comm} = ₹${inr(FAC.fee)}.\nStep 3: Cash now = ${inr(FAC.advance)} − ${inr(FAC.fee)} = ₹${inr(FAC.net)}.`,
  scheme: [['Advance and commission', 1], [`Cash = ₹${inr(FAC.net)}`, 1]],
}));
Q('n_emi', num({
  t: 3, d: 4, c: 'analysis', marks: 2, value: INST.emi, unit: '₹',
  stem: `Bastar Bell Metal Crafts (imagined) buys a furnace for ₹${inr(INST.price)}, paying ${INST.down * 100} per cent down. The balance carries flat interest of ${INST.rate * 100} per cent a year for ${INST.months / 12} years and is paid in ${INST.months} equal monthly instalments. Calculate each instalment (in ₹).`,
  sol: `Step 1: Down payment = ${inr(INST.price)} × ${INST.down} = ₹${inr(INST.downAmt)}; balance = ₹${inr(INST.balance)}.\nStep 2: Flat interest = ${inr(INST.balance)} × ${INST.rate} × ${INST.months / 12} = ₹${inr(INST.interest)}.\nStep 3: Instalment = (${inr(INST.balance)} + ${inr(INST.interest)}) ÷ ${INST.months} = ₹${inr(INST.emi)}.`,
  scheme: [['Balance and interest', 1], [`Instalment = ₹${inr(INST.emi)}`, 1]],
}));
Q('s_factor_services', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Besides advancing cash, a factor handles the credit sales of Mysuru Silk House (imagined). Explain two other services a factor provides to such a client.',
  model: '1. **Collection of debts:** the factor **collects payments** from the shop\'s customers, saving its staff time.\n2. **Credit information:** it checks the **creditworthiness** of buyers, so the shop can avoid risky customers.',
  sol: 'Two services (collection, credit information, sales-ledger maintenance, protection against bad debts) explained.',
  scheme: [['First service', 1], ['Second service', 1]],
}));
Q('s_icd', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Kalinga Cables Ltd (imagined) borrowed ₹5 crore for three months from another company through an inter-corporate deposit. State one advantage and one disadvantage of this source for Kalinga Cables.',
  model: '**Advantage:** it is **quick**, with **few formalities** and no security, so money arrives within days.\n**Disadvantage:** the **interest rate is often high**, and the lender may **withdraw** or refuse renewal if its own surplus disappears.',
  sol: 'One advantage (speed, few formalities, no security) and one disadvantage (cost, uncertain availability, risk) of ICDs.',
  scheme: [['Advantage', 1], ['Disadvantage', 1]],
}));
Q('s3_factor_eval', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Ganjam Garments Ltd (imagined) sells to many small boutiques on 90 days\' credit, and its staff spend hours chasing payments. Evaluate factoring for it: two merits and one demerit.',
  model: '1. **Immediate cash:** the factor pays most of the **90-day receivables** at once, easing working capital.\n2. **Saves effort:** the factor **collects from the boutiques**, freeing staff who now chase payments.\n3. **Demerit:** the **commission and interest** reduce profit, and boutiques may dislike dealing with an outsider.',
  sol: 'Two merits and one demerit linked to the case.',
  scheme: [['First merit', 1], ['Second merit', 1], ['Demerit', 1]],
}));
Q('s3_inst', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Bastar Bell Metal Crafts (imagined) is buying a furnace on instalment credit. Explain instalment credit and give one advantage and one disadvantage of it for this small unit.',
  model: '1. **Meaning:** the buyer pays a **down payment** and the **balance with interest** in instalments, using the asset meanwhile.\n2. **Advantage:** the unit can **start using the furnace now**, paying from the extra output it produces.\n3. **Disadvantage:** **interest makes it costlier** than a cash purchase, and missed instalments may lead to **repossession**.',
  sol: 'Meaning, one advantage and one disadvantage linked to the case.',
  scheme: [['Meaning', 1], ['Advantage', 1], ['Disadvantage', 1]],
}));
Q('l_tc_adv', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Pindari Provisions (imagined), a grocery wholesaler, gets 30 days\' credit from its suppliers. Bharuch Boilers Ltd (imagined) takes advances from its buyers.\n(a) Explain two merits and one demerit of trade credit for Pindari Provisions. [3]\n(b) Why can Bharuch Boilers take customer advances while Pindari Provisions usually cannot? Explain. [2]',
  model: '(a) **Merits:** trade credit is **convenient and continuous**, arriving with each purchase without loan papers or security. It also lets the wholesaler **sell the groceries before paying** for them, so its own cash needs are small.\n**Demerit:** easy credit may tempt it into **overtrading**, buying far more stock than it can sell, and it may **lose cash discounts** that suppliers give for prompt payment.\n\n(b) Customer advances are usual where goods are **made to order** or in **short supply**, so buyers are willing to pay part of the price early. Bharuch Boilers builds each boiler to a buyer\'s design. A grocery wholesaler sells **standard goods** that shopkeepers can buy elsewhere, so it cannot insist on advance payment.',
  sol: 'Two merits and one demerit of trade credit; reason based on made-to-order versus standard goods.',
  scheme: [['(a) Two merits and one demerit', 3], ['(b) Reason explained', 2]],
}));
Q('l_factor_icd', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Kolar Kraft Papers Ltd (imagined) has ₹3 crore owed by customers and needs cash quickly for three months.\n(a) Explain how factoring would work for it, and one merit and one demerit. [3]\n(b) Explain the meaning of an inter-corporate deposit and one risk for the company that lends it. [2]',
  model: '(a) Kolar Kraft would **sell or assign its ₹3 crore of receivables** to a factor. The factor pays a large part, such as **80 per cent, at once**, collects from the customers when bills fall due, and pays the balance less its **commission and interest**.\n**Merit:** it gets **cash immediately** without waiting for customers. **Demerit:** the **fees reduce profit**, and customers may dislike dealing with an outsider.\n\n(b) An **inter-corporate deposit** is an **unsecured short-term deposit** placed by one company that has surplus funds with another company that needs them. **Risk for the lender:** being **unsecured**, the deposit may be lost if the borrowing company runs into trouble.',
  sol: 'Factoring explained with merit and demerit; ICD meaning and lender\'s risk.',
  scheme: [['(a) Working of factoring', 1], ['(a) Merit and demerit', 2], ['(b) Meaning and risk', 2]],
}));

// ================================================================ case-based
Q('cb_shortterm', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Pindari Provisions (imagined), Almora**\n\nPindari Provisions supplies rice, pulses and oil to 300 hill-town shops. Its suppliers in the plains allow 30 days\' credit. Before the tourist season it borrows from its bank against its stock, drawing only what it needs. One large hotel chain pays a month in advance for bulk orders. Last year the owner, Mr Joshi, ordered far more stock than he could sell on the strength of his suppliers\' credit and struggled to pay them on time.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Borrowing from the bank against stock, drawing only what is needed, is', opts: ['cash credit', 'a public deposit', 'trade credit', 'factoring'], sol: 'A drawing limit secured on stock is cash credit.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the source of finance provided by the hotel chain.', model: '**Customer advances.**', sol: 'Payment before delivery is a customer advance.', scheme: [['Customer advances', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the drawback of trade credit seen last year, and suggest one way to avoid it.', model: '**Overtrading:** easy credit led Mr Joshi to **buy more than he could sell or pay for**. He should **plan purchases from expected sales** and keep within a credit budget.', sol: 'Overtrading identified; a sensible remedy.', scheme: [['Overtrading', 1], ['Remedy', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is cash credit better than a lump-sum short-term loan for the tourist-season stock?', model: 'Under cash credit Pindari **draws only what it needs** and pays **interest only on the amount used**; a lump-sum loan charges interest on the **whole amount** from day one.', sol: 'Interest on the amount used versus the whole loan.', scheme: [['Cash credit point', 1], ['Contrast with loan', 1]] }),
    ]),
  ],
}));
Q('cb_receivables', caseQ({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company and figures, written by SOYL for practice.)*',
  passage: '**Mysuru Silk House (imagined)**\n\nMysuru Silk House sells silk sarees to boutiques across South India on 60 days\' credit. Some boutiques accept bills of exchange; others simply owe money on open account. In the wedding season it needs cash to buy raw silk. Its manager, Ms Lakshmi, is comparing two options: taking the accepted bills to the bank before they are due, or handing all its receivables to a firm that will pay 80 per cent at once, collect from the boutiques and bear any bad debts.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Taking accepted bills to the bank before they are due is', opts: ['discounting of bills', 'an overdraft', 'an inter-corporate deposit', 'instalment credit'], sol: 'The bank pays the bill value less a discount before maturity.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What type of factoring is described in the passage? Give the clue.', model: '**Non-recourse factoring**: the firm "will **bear any bad debts**".', sol: 'The factor bears bad debts: non-recourse.', scheme: [['Non-recourse with clue', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why might factoring suit Mysuru Silk House better than bill discounting?', model: 'Many boutiques owe on **open account, not bills**, so they cannot be discounted; a factor takes **all receivables**, collects them and **bears bad debts**.', sol: 'Open-account debts and the extra services of a factor.', scheme: [['Open account point', 1], ['Extra services', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two costs or risks of factoring for the firm.', model: '1. The **commission and interest** reduce profit on each saree.\n2. Boutiques may **dislike an outside agency** chasing them, harming relationships.', sol: 'Cost and customer-relations risk.', scheme: [['Cost', 1], ['Relations risk', 1]] }),
    ]),
  ],
}));

// ================================================================ further items
Q('m_disc_collect', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After Amravati Auto Parts Ltd (imagined) discounts a customer\'s bill with its bank, who normally presents the bill to the customer for payment on the due date?',
  opts: ['The bank, which now holds the bill', 'Amravati Auto Parts, which no longer holds it', 'The Reserve Bank of India', 'A factor appointed by the customer'],
  sol: 'The discounting bank holds the bill and collects it at maturity; if it is dishonoured, the bank recovers from the firm that discounted it.',
}));
Q('m_pd_who', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of these imagined companies is most likely to raise public deposits easily?',
  opts: ['A forty-year-old consumer-goods maker with a steady record of profit and dividends', 'A start-up that began trading last month', 'A company that has defaulted on its loans', 'A partnership firm of two brothers'],
  sol: 'The public deposits money only with companies it trusts; a long, sound record matters most. A partnership is not a company.',
}));
Q('m_tc_amount', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The amount and period of trade credit a supplier gives a buyer depend mainly on',
  opts: ['the buyer\'s creditworthiness and the volume of its purchases', 'the buyer\'s share capital only', 'the rate of income tax', 'the number of the buyer\'s employees'],
  sol: 'Suppliers give more and longer credit to buyers who pay reliably and buy in large volumes; competition among suppliers also matters.',
}));
Q('m_adv_where', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In which imagined business are customer advances most likely?',
  opts: ['A builder of custom fishing trawlers made to each buyer\'s design', 'A roadside tea stall', 'A grocery shop selling packaged goods', 'A newspaper vendor'],
  sol: 'Advances are common for goods made to order, where the maker needs funds to build and wants a firm commitment.',
}));
Q('m_factor_suit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Factoring is most useful for a firm that',
  opts: ['sells mostly on credit to many customers and needs cash before they pay', 'sells only for cash at the counter', 'has no customers yet', 'wants to raise permanent capital for a new factory'],
  sol: 'Factoring turns receivables into cash and handles collection, so it suits firms with large credit sales to many buyers.',
}));
Q('m_inst_owner', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Under a **hire-purchase** form of instalment credit, ownership of the asset passes to the buyer',
  opts: ['when the last instalment is paid', 'when the down payment is made', 'never; the asset always stays with the seller', 'when the first instalment is missed'],
  sol: 'Under hire purchase the seller remains the owner until the final instalment; under an instalment sale, ownership passes at once.',
}));
Q('tf_pd_long', tf({
  t: 2, d: 2, c: 'application',
  stem: 'Sundergarh Steel Ltd (imagined) plans to finance a new blast furnace, which will take ten years to pay for itself, entirely through public deposits. True or false: this is a sound use of public deposits.',
  ans: false,
  sol: 'False. Public deposits are taken for short periods and may be withdrawn at maturity, so they suit working capital, not a ten-year project.',
}));
Q('tf_tc_open', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Trade credit is available only to joint stock companies.',
  ans: false,
  sol: 'False. Sole traders, partnerships and companies all receive trade credit from their suppliers.',
}));
Q('fb_factor', fb({
  t: 3, d: 1, c: 'understanding',
  stem: 'The specialised agency that buys or finances a firm\'s receivables and collects them is called a ___.',
  acc: [['factor', 'factoring company', 'factoring agency']],
  sol: 'It is a factor; the arrangement is called factoring.',
}));
Q('mt_icd', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term on short-term finance with its meaning.',
  pairs: [
    ['Call deposit (ICD)', 'Withdrawable by the lender at very short notice'],
    ['Recourse factoring', 'Client bears the loss if a debtor fails to pay'],
    ['Down payment', 'Part of the price paid at the time of purchase'],
    ['Overtrading', 'Buying or selling beyond what the firm\'s funds can support'],
  ],
  sol: 'A call deposit can be recalled at short notice; with recourse, bad debts fall back on the client; a down payment is paid upfront; overtrading outruns the firm\'s resources.',
}));
Q('s_disc', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Kalinga Cables Ltd (imagined) holds accepted bills worth ₹6 lakh from dealers, due in two months. Explain what discounting them means and one benefit to the company.',
  model: '**Meaning:** the bank **pays the value of the bills now, less a discount** (interest for the two months), and collects from the dealers on maturity.\n**Benefit:** Kalinga gets **cash immediately** without waiting two months, easing its working capital.',
  sol: 'Meaning of discounting and one benefit.',
  scheme: [['Meaning', 1], ['Benefit', 1]],
}));
Q('s3_tc_vs_adv', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Bundi Bangles (imagined) gets credit from its bead supplier, while Bharuch Boilers Ltd (imagined) gets advances from its buyers. Distinguish trade credit from customer advances on three bases.',
  model: '1. **Who provides it:** trade credit comes from **suppliers**; customer advances come from **buyers**.\n2. **Timing:** with trade credit the firm **pays later** for goods received; with advances it is **paid before** it delivers.\n3. **Suitable firms:** trade credit suits **almost every business**; advances suit **made-to-order** or scarce goods.',
  sol: 'Three bases (source, timing, suitability, effect on sales risk) for both sources.',
  scheme: [['Source', 1], ['Timing', 1], ['Suitability', 1]],
}));
Q('s3_choose', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Tirupur Tees Ltd (imagined) has three needs: cash against ₹2 crore owed by overseas buyers on open account, ₹1 crore for six weeks from a group company with spare cash, and a new knitting machine it cannot pay for at once. Suggest a source for each, with a reason.',
  model: '1. **Factoring:** a factor pays most of the **₹2 crore of receivables** at once and collects from the buyers.\n2. **Inter-corporate deposit:** the **group company\'s spare cash** can be placed with it quickly, with few formalities.\n3. **Instalment credit:** a **down payment** and monthly instalments let it use the machine at once.',
  sol: 'Factoring, ICD and instalment credit matched and justified.',
  scheme: [['Factoring', 1], ['ICD', 1], ['Instalment credit', 1]],
}));
Q('l_pd', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Sundergarh Steel Ltd (imagined), a well-known company, invites public deposits to finance its stock of iron ore and coal.\n(a) What are public deposits? [1]\n(b) Explain two advantages and two disadvantages of public deposits for the company. [4]',
  model: '(a) **Public deposits** are amounts the company accepts **directly from the public** for a fixed short period, usually at a rate **higher than bank deposits**.\n\n(b) **Advantages:** the procedure is **simple**, with no security or long negotiation, and the cost is often **lower than bank borrowing**; and since depositors have **no voting rights** and no charge on assets, **control** and assets remain free.\n**Disadvantages:** deposits are taken for **short periods** and may be withdrawn at maturity, so they are unreliable for long projects; and only **well-known, sound companies** can attract them, so the source is closed to new firms and dries up quickly if the company\'s name suffers.',
  sol: 'Meaning; two advantages and two disadvantages.',
  scheme: [['(a) Meaning', 1], ['(b) Two advantages', 2], ['(b) Two disadvantages', 2]],
}));
