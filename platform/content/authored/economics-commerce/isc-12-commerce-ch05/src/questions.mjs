// ISC 12 Commerce, ch05 Banking: Latest Trends — question bank. Every person, firm and situation is imagined and
// written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or
// board item is reused (D-036). Payment-system facts are stated as they stood in 2026 with a dated note where a
// limit or timing is used (RTGS minimum ₹2 lakh; IMPS per-transaction limit ₹5 lakh; NEFT 24x7 since December 2019;
// RTGS 24x7 since December 2020); the README lists every time-sensitive point for review.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];
export const NOTE = '(Position as of 2026; the Reserve Bank of India can revise payment-system limits.)';

// ================================================================ t01 RTGS, NEFT, IMPS, online demand drafts
Q('m_rtgs', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In RTGS (Real Time Gross Settlement), funds are transferred',
  opts: ['one transaction at a time, in real time, as soon as the instruction is processed', 'in half-hourly batches, after netting all instructions', 'only by physical cheque', 'only on the last working day of the month'],
  sol: 'RTGS settles each transaction individually (gross) and immediately (real time); NEFT settles in batches.',
}));
Q('m_neft', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'NEFT (National Electronic Funds Transfer) differs from RTGS mainly because NEFT',
  opts: ['settles transfers in batches at regular intervals', 'settles each transfer instantly and individually', 'needs a minimum of ₹2 lakh', 'can be used only at a bank branch'],
  sol: 'NEFT is a deferred net settlement system: instructions are collected and settled in half-hourly batches.',
}));
Q('m_rtgs_min', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Meher, who runs an imagined bakery supplies shop, must send ₹1,50,000 to a flour mill. Which method can she **not** use for this amount? ${NOTE}`,
  opts: ['RTGS, because its minimum amount is ₹2 lakh', 'NEFT', 'IMPS', 'An online demand draft'],
  sol: 'RTGS is meant for large-value transfers with a minimum of ₹2 lakh; NEFT and IMPS have no such minimum.',
}));
Q('m_imps', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At 11 p.m. on a Sunday, Iqbal, an imagined college student, sends ₹3,000 instantly to a friend using the friend\'s mobile number and MMID (or account number and IFSC) through his bank\'s app. The service he is most likely using is',
  opts: ['IMPS', 'a cheque', 'a demand draft by post', 'cash credit'],
  sol: 'IMPS (Immediate Payment Service) gives instant, round-the-clock transfers using mobile number and MMID or account number and IFSC.',
}));
Q('m_ifsc', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'To send money by NEFT or RTGS, the sender needs the beneficiary\'s account number, name and the IFSC. IFSC identifies',
  opts: ['the beneficiary\'s bank branch', 'the beneficiary\'s PAN', 'the sender\'s mobile phone', 'the amount to be sent'],
  sol: 'The Indian Financial System Code is an alphanumeric code that identifies the bank branch taking part in electronic transfers.',
}));
Q('m_odd', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tenzing, an imagined trekking-gear seller in Gangtok, must pay a university fee that is accepted only by demand draft. Without visiting his branch, he requests one through net banking and the bank sends it to his address. This facility is',
  opts: ['an online demand draft', 'an e-wallet', 'a credit card', 'a debit card'],
  sol: 'Through internet banking a customer can request a demand draft; the bank debits the account and delivers or issues the draft.',
}));
Q('m_transfer_pqrs', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Which statements about electronic fund transfer in India are correct? ${NOTE}\nP. NEFT is available round the clock on all days.\nQ. RTGS settles each transaction individually.\nR. IMPS transfers are completed instantly.\nS. RTGS has no minimum amount.`,
  opts: ['P, Q and R', 'P, Q and S', 'Q, R and S', 'P and S only'],
  sol: 'NEFT has run 24x7 since December 2019, RTGS settles gross in real time, and IMPS is instant. RTGS has a ₹2 lakh minimum, so S is wrong.',
}));
Q('ar_rtgs_big', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'RTGS is mainly used for large-value transfers.',
  r: 'RTGS has a minimum transfer amount of ₹2 lakh and settles each transaction at once.',
  key: 'a',
  sol: 'Both are true, and the high minimum with immediate gross settlement is exactly why RTGS serves large payments.',
}));
Q('ar_neft_batch', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'NEFT settles each transfer individually and instantly.',
  r: 'NEFT can be used only during bank branch working hours on weekdays.',
  key: 'd',
  sol: 'Both are false. NEFT settles in half-hourly batches, and it has been available 24x7 on all days since December 2019.',
}));
Q('tf_rtgs_24x7', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'Since December 2020, RTGS has been available to customers round the clock on all days of the year.',
  ans: true,
  sol: 'True. RTGS became available 24x7x365 in December 2020, a year after NEFT.',
}));
Q('fb_imps', fb({
  t: 1, d: 2, c: 'analysis',
  stem: 'Complete the analogy. RTGS : Real-time gross settlement :: NEFT : ___',
  acc: [['Batch settlement', 'deferred net settlement', 'batches', 'half-hourly batches', 'net settlement']],
  sol: 'RTGS settles each transaction in real time; NEFT settles in batches (deferred net settlement).',
}));
Q('mt_transfer', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `Match each transfer method with its typical feature. ${NOTE}`,
  pairs: [
    ['RTGS', 'Minimum ₹2 lakh; settled individually in real time'],
    ['NEFT', 'Settled in half-hourly batches; no minimum'],
    ['IMPS', 'Instant transfer, up to ₹5 lakh per transaction'],
    ['Online demand draft', 'Requested through net banking for a payee who needs a draft'],
  ],
  sol: 'RTGS is for large real-time transfers, NEFT works in batches, IMPS is instant up to its per-transaction limit, and an online DD is requested through net banking.',
}));
Q('s_neft_rtgs', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Lalit, an imagined furniture dealer, uses NEFT for small supplier bills and RTGS for a ₹12 lakh timber purchase. Distinguish NEFT and RTGS on settlement and minimum amount. ${NOTE}`,
  model: '1. **Settlement:** NEFT settles in **half-hourly batches**; RTGS settles **each transaction individually in real time**.\n2. **Minimum amount:** NEFT has **no minimum**; RTGS needs at least **₹2 lakh**, so it suits the ₹12 lakh purchase.',
  sol: 'Settlement and minimum amount distinguished.',
  scheme: [['Settlement', 1], ['Minimum amount', 1]],
}));
Q('s_imps', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Fatima, an imagined tailor, must pay a fabric supplier ₹8,000 on a Sunday night so that the cloth is dispatched next morning. Which transfer method suits her best? Give two reasons.',
  model: '**IMPS** suits her best.\n1. It is **instant**, so the supplier sees the money at once.\n2. It works **24x7, including Sundays**, through her mobile app, without visiting a branch.',
  sol: 'IMPS with two reasons (instant, 24x7, mobile, small amounts).',
  scheme: [['IMPS with first reason', 1], ['Second reason', 1]],
}));
Q('s3_transfers', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `Lohargal Logistics (imagined) must make three payments today: ₹25 lakh to a truck dealer that must reach at once, ₹40,000 of salaries to 20 drivers, and a ₹5,000 refund to a customer late at night. Recommend a method for each and justify. ${NOTE}`,
  model: '1. **₹25 lakh to the dealer: RTGS**, because it is above the **₹2 lakh minimum** and settles **immediately** and individually.\n2. **Salaries: NEFT**, suitable for **many small transfers** with no minimum, settled in batches the same day.\n3. **Late-night refund: IMPS**, which is **instant and 24x7** for small amounts.',
  sol: 'RTGS for the large urgent payment; NEFT for bulk small payments; IMPS for the instant small refund (NEFT is also acceptable for the refund if instant credit is not required).',
  scheme: [['RTGS justified', 1], ['NEFT justified', 1], ['IMPS justified', 1]],
}));

// ================================================================ t02 E-banking
Q('m_eb_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'E-banking (internet banking) means',
  opts: ['carrying out banking transactions through the internet, without visiting a branch', 'banking only with cash at the counter', 'a bank that has no customers', 'a loan given for buying electronics'],
  sol: 'E-banking lets customers check balances, transfer funds, pay bills and use other services online, at any time.',
}));
Q('m_eb_feature', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Kovalam Kayaks, an imagined rental business, pays its electricity bill, checks its balance and opens a fixed deposit at midnight from the owner\'s laptop. Which feature of e-banking does this show best?',
  opts: ['Anytime, anywhere access', 'Need for physical presence', 'Use of cheques', 'Banking only in working hours'],
  sol: 'E-banking is available round the clock from any place with internet access.',
}));
Q('m_eb_bank', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which is an advantage of e-banking to the **bank** rather than to the customer?',
  opts: ['Lower cost per transaction and less crowding at branches', 'Ability to pay bills from home', 'No need to stand in queues', 'Instant account statements on the customer\'s laptop'],
  sol: 'Online transactions cost banks less to handle and reduce branch workload; the other options are benefits to customers.',
}));
Q('m_phishing', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Sanchi Sweets (imagined) receives an email that looks like it is from its bank, asking the owner to "verify" the net-banking password on a link. This is an example of',
  opts: ['phishing, a security risk of e-banking', 'a genuine service of e-banking', 'an RTGS transfer', 'a feature of debit cards'],
  sol: 'Fake messages that try to steal login details are phishing; banks never ask for passwords or OTPs by email or phone.',
}));
Q('ar_eb_risk', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Customers using e-banking must protect their passwords and one-time passwords.',
  r: 'Fraudsters may use stolen login details to transfer money out of an account.',
  key: 'a',
  sol: 'Both are true, and the risk of misuse of stolen details is the reason customers must guard passwords and OTPs.',
}));
Q('tf_eb_skills', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'E-banking requires a device, internet access and some digital skills, which can be a barrier for some customers.',
  ans: true,
  sol: 'True. Lack of devices, connectivity or digital literacy is a disadvantage of e-banking.',
}));
Q('fb_otp', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'A code sent to the customer\'s registered mobile that is valid for a single transaction is called a ___ password (OTP).',
  acc: [['one-time', 'one time', 'onetime']],
  sol: 'It is a one-time password, an extra layer of security for online transactions.',
}));
Q('s_eb_adv', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Nongpoh Nurseries (imagined) is located far from any bank branch in the Meghalaya hills. State two advantages of e-banking for this business.',
  model: '1. **Saves travel and time:** the owner can **pay suppliers and check balances online** instead of travelling to a distant branch.\n2. **Available round the clock:** transactions can be done **any time**, even after the nursery closes.',
  sol: 'Two advantages (convenience, 24x7, lower cost, quick records) linked to the case.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s3_eb_customers', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Jhansi Jewellers (imagined) has moved its banking online. Explain three ways in which e-banking benefits the business as a customer.',
  model: '1. **Convenience:** it can **pay karigars and suppliers** from the shop without visiting the bank.\n2. **Quick information:** **balances and statements** are available instantly, helping it reconcile sales each evening.\n3. **Lower cost and speed:** online transfers are **fast and cheap**, so gold suppliers are paid on time.',
  sol: 'Three customer benefits (convenience, 24x7, information, speed, low cost) linked to the jeweller.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('s3_eb_disadv', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'After an imagined café owner lost money to a fake bank link, her neighbour said e-banking is "too risky". Explain three disadvantages of e-banking and one precaution for any one of them.',
  model: '1. **Security risk:** **phishing and hacking** can expose passwords; precaution: never share **passwords or OTPs**.\n2. **Technical failure:** a **server or network breakdown** can stop payments.\n3. **Digital divide:** customers without **devices, internet or skills** cannot use it, and there is **no personal contact** to resolve doubts.',
  sol: 'Three disadvantages and one sensible precaution.',
  scheme: [['First disadvantage with precaution', 1], ['Second disadvantage', 1], ['Third disadvantage', 1]],
}));

// ================================================================ t03 Mobile banking
Q('m_mob', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Mobile banking refers to',
  opts: ['banking services used through a mobile phone, by app or SMS', 'a bank branch that moves from town to town only', 'loans given for buying mobile phones', 'cash deposited at an ATM'],
  sol: 'Mobile banking lets customers receive alerts, transfer funds and pay bills using a phone.',
}));
Q('m_sms_alert', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Aarav, an imagined shop assistant, gets an SMS within seconds whenever money is debited from his account. He once spotted a card misuse this way. Which mobile-banking service helped him?',
  opts: ['SMS alerts', 'Overdraft', 'Online demand draft', 'Fixed deposit'],
  sol: 'SMS alerts inform the customer of every debit and credit, helping detect unauthorised transactions quickly.',
}));
Q('m_mob_lost', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which is a disadvantage that is **specific to mobile banking** rather than banking in general?',
  opts: ['A lost or stolen phone may be misused if it is not locked', 'Banks charge interest on loans', 'Branches close on holidays', 'Cheques can bounce'],
  sol: 'Because the bank account is linked to the phone, losing an unprotected phone creates a special risk.',
}));
Q('ar_mob_rural', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'Mobile banking has helped extend banking to many people in remote areas.',
  r: 'Mobile phones are far more widely available than bank branches.',
  key: 'a',
  sol: 'Both are true, and the wide reach of phones compared with branches explains how mobile banking extends access.',
}));
Q('tf_mob_internet', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'Some mobile-banking services, such as SMS alerts and SMS-based balance enquiry, can work even without a smartphone app.',
  ans: true,
  sol: 'True. SMS-based services work on basic phones; app-based services need a smartphone and data.',
}));
Q('s_mob_dis', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mr Banerjee, an imagined hardware-shop owner, is worried about using mobile banking. State two disadvantages of mobile banking he should know about.',
  model: '1. **Risk if the phone is lost:** an **unlocked phone** may let someone else access his account.\n2. **Network and device limits:** **poor connectivity** or an old phone can make transactions fail or be slow.',
  sol: 'Two disadvantages (lost phone, network, small screen, limits on amounts, fraud calls) explained.',
  scheme: [['First disadvantage', 1], ['Second disadvantage', 1]],
}));
Q('s3_mob', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Rekha runs an imagined vegetable stall and has just started mobile banking. Explain three services she can use on her phone, with an example of each from her business.',
  model: '1. **SMS alerts:** she is told at once when a **customer\'s payment** is credited.\n2. **Fund transfer:** she can pay the **wholesale mandi trader** before collecting stock.\n3. **Bill payments and recharges:** she can pay the **stall\'s electricity bill** without leaving the market.',
  sol: 'Three services (alerts, transfers, bill payments, balance enquiry, mini statement) each with an example.',
  scheme: [['First service with example', 1], ['Second service with example', 1], ['Third service with example', 1]],
}));

// ================================================================ t04 ATM, debit and credit cards
Q('m_atm', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Which of these can usually be done at an ATM?',
  opts: ['Withdrawing cash, checking balance and getting a mini-statement', 'Opening a new company', 'Applying for a passport', 'Filing an income-tax return'],
  sol: 'ATMs (Automated Teller Machines) give cash and basic account services round the clock.',
}));
Q('m_debit', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'When Aarav (imagined) pays ₹2,400 at a shoe shop with his card, the amount is deducted from his savings account at once. He is using a',
  opts: ['debit card', 'credit card', 'demand draft', 'cheque'],
  sol: 'A debit card draws directly on the holder\'s own account balance.',
}));
Q('m_credit', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Meher (imagined) buys a ₹30,000 oven for her shop with a card in March and pays the bank in April, within the interest-free period. The card she used is a',
  opts: ['credit card', 'debit card', 'ATM-only card', 'gift voucher'],
  sol: 'A credit card lets the holder buy now and pay the bank later; no interest is charged if the full bill is paid by the due date.',
}));
Q('m_credit_interest', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Lalit (imagined) pays only the minimum amount due on his credit-card bill each month. What happens?',
  opts: ['Interest is charged on the unpaid balance, often at a high rate', 'The unpaid balance is written off', 'The bank converts the balance into a fixed deposit', 'Nothing; credit-card balances never carry interest'],
  sol: 'Any amount not paid by the due date carries interest, usually at high rates, so paying only the minimum is costly.',
}));
Q('m_card_pqrs', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which statements are true of a **debit** card?\nP. It is linked to the holder\'s bank account.\nQ. It gives an interest-free credit period.\nR. Spending is limited by the balance (and any overdraft).\nS. It can be used at ATMs to withdraw cash.',
  opts: ['P, R and S', 'P, Q and R', 'Q and S only', 'All four'],
  sol: 'A debit card is linked to the account, spends the holder\'s own money and works at ATMs. A credit period is a feature of credit cards.',
}));
Q('ar_card', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'A credit card can encourage overspending.',
  r: 'A credit card allows purchases without having money in the account at that moment.',
  key: 'a',
  sol: 'Both are true, and the ability to buy without current funds is what can lead to overspending.',
}));
Q('ar_debit', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'A debit card gives its holder a free credit period of several weeks.',
  r: 'Payments made with a debit card are charged to the bank\'s own funds and billed later.',
  key: 'd',
  sol: 'Both are false. A debit card spends the holder\'s own balance at once; credit periods belong to credit cards.',
}));
Q('tf_atm_24', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'ATMs let customers withdraw cash outside bank working hours.',
  ans: true,
  sol: 'True. ATMs generally work round the clock.',
}));
Q('fb_card', fb({
  t: 4, d: 2, c: 'analysis',
  stem: 'Complete the analogy. Debit card : Pay now from own account :: Credit card : ___',
  acc: [['Pay later', 'buy now pay later', 'pay later to the bank', 'Borrow and pay later']],
  sol: 'A debit card pays at once from the holder\'s balance; a credit card lets the holder pay later.',
}));
Q('mt_cards', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each item with its description.',
  pairs: [
    ['ATM', 'Machine for cash withdrawal and balance enquiry'],
    ['Debit card', 'Spends from the holder\'s account immediately'],
    ['Credit card', 'Spends within a limit set by the bank, paid later'],
    ['PIN', 'Secret number needed to use a card at an ATM'],
  ],
  sol: 'The ATM is the machine, the debit card spends own funds, the credit card spends the bank\'s credit, and the PIN secures the card.',
}));
Q('s_atm', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Tenzing (imagined) uses the only ATM in his mountain village. State two services an ATM provides and one reason it helps him.',
  model: '1. **Cash withdrawal** and **balance enquiry or mini-statement** are its main services.\n2. **Benefit:** it works **round the clock**, so he gets cash without waiting for the **branch to open** in the town below.',
  sol: 'Two services and one benefit.',
  scheme: [['Two services', 1], ['Benefit', 1]],
}));
Q('s3_cards', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Meher (imagined) holds both a debit card and a credit card. Distinguish the two cards on source of funds, credit period and charges.',
  model: '1. **Source of funds:** a debit card uses **her own account balance**; a credit card uses the **bank\'s credit** up to a limit.\n2. **Credit period:** a debit card gives **none**; a credit card allows an **interest-free period** before payment.\n3. **Charges:** a debit card has **no interest**; a credit card charges **interest on unpaid balances**.',
  sol: 'Three bases distinguished.',
  scheme: [['Source of funds', 1], ['Credit period', 1], ['Charges', 1]],
}));
Q('s3_credit_eval', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Lalit (imagined) wants a credit card for his furniture business. Evaluate: two advantages and one disadvantage of a credit card for him.',
  model: '1. **Buy now, pay later:** he can buy **polish and fittings** and pay after customers pay him, within the **interest-free period**.\n2. **Records and convenience:** the **monthly statement** lists business spending, and he need not carry cash.\n3. **Disadvantage:** unpaid balances attract **high interest**, and easy credit may lead to **overspending**.',
  sol: 'Two advantages and one disadvantage linked to the business.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Disadvantage', 1]],
}));

// ================================================================ t05 Digital banking, UPI, e-wallets
Q('m_upi', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'UPI (Unified Payments Interface) allows a user to',
  opts: [
    'send and receive money instantly from a bank account using a virtual payment address, mobile number or QR code',
    'withdraw cash only at a branch counter',
    'buy shares of a company directly',
    'take a long-term loan without security',
  ],
  sol: 'UPI links bank accounts to a mobile app so that payments can be made instantly with a UPI ID, mobile number or QR code.',
}));
Q('m_wallet', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Rekha (imagined) loads ₹1,000 from her bank account into an app and uses that stored balance to pay small bills, even when she does not want to use her account directly. The app is best described as',
  opts: ['an e-wallet', 'a credit card', 'a demand draft', 'an RTGS account'],
  sol: 'An e-wallet is a prepaid digital wallet: money is loaded into it in advance and spent from the stored balance.',
}));
Q('m_digital', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Digital banking is best described as',
  opts: ['providing banking services through digital channels such as internet, mobile apps, cards and UPI', 'a bank that keeps only paper records', 'a cash-only branch', 'issuing coins and notes'],
  sol: 'Digital banking covers all banking done through electronic and digital channels, rather than paper and branches.',
}));
Q('ar_upi_wallet', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'A UPI payment is made directly from the payer\'s bank account.',
  r: 'Money must first be loaded into a UPI app before it can be spent.',
  key: 'c',
  sol: 'The assertion is true: UPI debits the linked bank account. The reason is false: loading money in advance is a feature of e-wallets, not UPI.',
}));
Q('tf_qr', tf({
  t: 5, d: 2, c: 'application',
  stem: 'Sanchi Sweets (imagined) displays a QR code at its counter so that customers can pay by scanning it with a UPI app. True or false: this lets the shop receive money directly into its bank account.',
  ans: true,
  sol: 'True. Scanning a UPI QR code sends money from the customer\'s bank account to the shop\'s linked account.',
}));
Q('s_upi', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Sanchi Sweets (imagined) accepts payments by UPI and through an e-wallet. Explain the meaning of each.',
  model: '1. **UPI:** a system that lets customers pay **instantly from their bank accounts** using a UPI ID, mobile number or **QR code**.\n2. **E-wallet:** a **prepaid digital wallet** into which money is **loaded in advance** and then spent.',
  sol: 'Meaning of UPI and e-wallet.',
  scheme: [['UPI', 1], ['E-wallet', 1]],
}));
Q('s3_digital', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Kovalam Kayaks (imagined) is going "fully digital". Explain the meaning of digital banking, UPI and e-wallets with an example of how the business could use each.',
  model: '1. **Digital banking:** banking through **online and mobile channels**; the firm can **check accounts and pay staff online**.\n2. **UPI:** instant transfers from bank accounts by **UPI ID or QR code**; tourists can **scan a QR** to pay rent.\n3. **E-wallet:** a **prepaid** digital balance; the firm can keep a small wallet for **fuel and snack purchases**.',
  sol: 'Each term explained with a use for the business.',
  scheme: [['Digital banking', 1], ['UPI', 1], ['E-wallet', 1]],
}));

// ================================================================ long answers
Q('l_transfers', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Jhansi Jewellers (imagined) makes many payments: large ones to gold suppliers, small ones to workers, and occasional fees that need a demand draft. ${NOTE}\n(a) Distinguish between RTGS, NEFT and IMPS on two bases. [3]\n(b) Explain how the firm can obtain an online demand draft and one advantage of doing so. [2]`,
  model: '(a) **Mode of settlement:** RTGS settles **each transaction individually in real time**; NEFT settles in **half-hourly batches**; IMPS credits the payee **instantly**.\n**Amount:** RTGS has a **minimum of ₹2 lakh**, so it suits payments to gold suppliers; NEFT has **no minimum or maximum**, so it suits workers\' wages; IMPS has **no minimum** but a per-transaction limit of **₹5 lakh**, so it suits small urgent payments.\n\n(b) Through **net banking**, the firm fills in the payee\'s name and amount; the bank **debits its account** and issues the draft, which is sent to its address or kept for collection. **Advantage:** it saves a **trip to the branch** and the time spent queuing.',
  sol: 'Two bases across the three methods; online DD procedure and one advantage.',
  scheme: [['(a) Two bases for three methods', 3], ['(b) Procedure and advantage', 2]],
}));
Q('l_ebank', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Dharwad Dairy Cooperative (imagined) pays 400 farmers every week and wants to move from cash to e-banking.\n(a) What is e-banking? [1]\n(b) Explain two advantages of e-banking for the cooperative and two for its bank. [4]',
  model: '(a) **E-banking** is carrying out banking transactions **through the internet**, without visiting a branch.\n\n(b) **For the cooperative:** it can pay **400 farmers in one batch** from the office instead of counting cash, which saves time and reduces the risk of theft; and it can see **balances and statements at any hour**, making weekly accounts easier.\n**For the bank:** the **cost of each transaction falls**, because no teller has to count notes or issue receipts; and **branch crowding drops**, so staff can concentrate on loans and advice to the cooperative.',
  sol: 'Meaning; two advantages to the customer and two to the bank.',
  scheme: [['(a) Meaning', 1], ['(b) Two advantages for the cooperative', 2], ['(b) Two advantages for the bank', 2]],
}));
Q('l_cards', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Aarav (imagined) has just opened his first savings account and is offered a debit card and a credit card.\n(a) State two functions of an ATM. [1]\n(b) Distinguish between a debit card and a credit card on three bases. [3]\n(c) Which card would you advise him to use first, and why? [1]',
  model: '(a) An ATM lets him **withdraw cash** and **check his balance** at any time.\n\n(b) **Source of funds:** a debit card spends money **already in his account**; a credit card spends the **bank\'s money** up to a credit limit.\n**Credit period:** a debit card gives **no credit period**, as the amount is deducted at once; a credit card allows an **interest-free period** before the bill must be paid.\n**Cost:** a debit card normally carries **no interest**; a credit card charges **high interest** on any amount left unpaid after the due date.\n\n(c) The **debit card**, because he can spend only what he has, which avoids **debt and interest** while he learns to manage money.',
  sol: 'Two ATM functions; three bases; a reasoned recommendation (debit card for a first-time user).',
  scheme: [['(a) Two functions', 1], ['(b) Three bases', 3], ['(c) Advice with reason', 1]],
}));
Q('l_mobile_digital', long({
  t: [3, 5], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Nongpoh Nurseries (imagined) sells plants at weekly markets. Most buyers want to pay by phone.\n(a) Explain two advantages and one disadvantage of mobile banking for the nursery. [3]\n(b) Explain the difference between paying by UPI and paying from an e-wallet. [2]',
  model: '(a) **Advantages:** the owner gets **SMS alerts** as each payment arrives, so she knows at once that a buyer has paid; and she can **pay suppliers and check her balance from the market**, without going to a branch far away. **Disadvantage:** **weak mobile networks** in the hills can make payments fail, and a **lost phone** that is not locked may be misused.\n\n(b) **UPI** sends money **directly from the buyer\'s bank account** to the nursery\'s account, using a UPI ID or a **QR code**. An **e-wallet** is **prepaid**: the buyer must first **load money into the wallet**, and the payment is made from that stored balance.',
  sol: 'Two advantages and one disadvantage; UPI versus e-wallet.',
  scheme: [['(a) Two advantages and one disadvantage', 3], ['(b) UPI versus e-wallet', 2]],
}));

// ================================================================ case-based
Q('cb_shop', caseQ({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined shop and people, written by SOYL for practice. Payment-system limits as of 2026.)*',
  passage: '**Sanchi Sweets (imagined), Vidisha**\n\nSanchi Sweets has a QR code at its counter, and most customers now pay by scanning it. Each night the owner, Mrs Tiwari, receives an SMS for every credit. Before Diwali she must pay ₹6 lakh for ghee and dry fruits to a supplier in Indore, who wants the money credited immediately. Her son suggests paying through an app balance he loads every month, but she prefers to pay straight from the bank.',
  parts: [
    child('a', mcq({ t: 5, d: 2, c: 'application', stem: 'Customers scanning the QR code at the counter are most likely paying by', opts: ['UPI', 'RTGS', 'demand draft', 'cash credit'], sol: 'Scanning a QR code with a payments app is a UPI payment.' })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which transfer method suits the ₹6 lakh payment to the supplier? Give one reason.', model: '**RTGS**: the amount is above the **₹2 lakh minimum**, and it is credited **immediately**.', sol: 'RTGS, as a large immediate transfer (IMPS is limited to ₹5 lakh per transaction).', scheme: [['RTGS with reason', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the mobile-banking service Mrs Tiwari uses each night and one benefit of it.', model: '**SMS alerts:** she knows **at once** about every credit, so she can **match sales with payments** and spot any fraud quickly.', sol: 'SMS alerts with a benefit.', scheme: [['Service', 1], ['Benefit', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What kind of payment tool is the "app balance he loads every month"? How does it differ from paying straight from the bank?', model: 'It is an **e-wallet**: money is **loaded in advance** and spent from that balance, whereas UPI or a bank transfer pays **directly from the bank account**.', sol: 'E-wallet identified; difference stated.', scheme: [['E-wallet', 1], ['Difference', 1]] }),
    ]),
  ],
}));
Q('cb_cards', caseQ({
  t: [2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined people, written by SOYL for practice.)*',
  passage: '**Lalit\'s furniture business (imagined), Jodhpur**\n\nLalit buys polish and hinges with his credit card and usually pays the full bill by the due date. Last year, during a slow season, he paid only the minimum amount for three months. He uses his debit card at the ATM near his workshop for cash wages. Recently he received a call from someone claiming to be from his bank, asking for the OTP "to block a suspicious transaction". He refused and called the bank\'s official number.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'What happened when Lalit paid only the minimum amount on his credit-card bill?', opts: ['Interest was charged on the unpaid balance', 'The bank waived the rest', 'The bill was transferred to his debit card', 'His credit limit doubled'], sol: 'Unpaid credit-card balances carry interest.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the kind of fraud attempted on the phone call.', model: '**Phishing (vishing)**: an attempt to obtain his **OTP** by pretending to be the bank.', sol: 'Phishing by phone.', scheme: [['Phishing', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why does Lalit use the debit card for wages and the credit card for supplies?', model: 'Wages need **cash**, which the **debit card** draws from his own account at the ATM; supplies can be bought on **credit**, paid later within the **interest-free period**.', sol: 'Cash from own account versus buy-now-pay-later.', scheme: [['Debit for cash', 1], ['Credit for supplies', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two safety rules for digital banking that Lalit followed or should follow.', model: '1. **Never share an OTP, PIN or password**, even with someone claiming to be the bank.\n2. **Contact the bank only through official numbers** or the app.', sol: 'Two sound safety rules.', scheme: [['First rule', 1], ['Second rule', 1]] }),
    ]),
  ],
}));

// ================================================================ added for test balance
Q('s_eb_bank', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'The imagined Dharwad branch of a bank now handles most of its customers\' payments online. State two advantages of e-banking to the bank itself.',
  model: '1. **Lower cost:** an online transaction costs the bank **far less to process** than one handled by a teller at the counter.\n2. **Less crowding:** fewer customers **queue at the branch**, so staff can give time to loans and advice.',
  sol: 'Two advantages to the bank (lower cost, less branch load, wider reach, more business at little extra cost).',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s3_security', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Jhansi Jewellers (imagined) handles lakhs of rupees through net banking and UPI every week. Suggest three precautions its staff should follow to bank safely online, with a reason for each.',
  model: '1. **Never share OTPs, PINs or passwords**, because the bank never asks for them and fraudsters use them to empty accounts.\n2. **Use only the official app or website**, typed in directly, so that **fake links** cannot capture login details.\n3. **Turn on SMS alerts** and check them, so any **unauthorised debit** is reported to the bank at once.',
  sol: 'Three sensible precautions, each with a reason.',
  scheme: [['First precaution', 1], ['Second precaution', 1], ['Third precaution', 1]],
}));
Q('fb_qr', fb({
  t: 5, d: 1, c: 'understanding',
  stem: 'Many small shops display a square printed ___ code that customers scan with a UPI app to pay.',
  acc: [['QR', 'quick response', 'Quick Response']],
  sol: 'It is a QR (quick response) code linked to the shop\'s UPI ID and bank account.',
}));
Q('tf_wallet', tf({
  t: 5, d: 2, c: 'understanding',
  stem: 'An e-wallet must be loaded with money before it can be used to pay.',
  ans: true,
  sol: 'True. An e-wallet is a prepaid instrument; payments come from the balance loaded into it.',
}));
