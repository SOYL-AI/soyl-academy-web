// Build ISC 12 Commerce ch05 Banking: Latest Trends. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch05', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASOF = 'Limits and timings as of 2026; the Reserve Bank of India can revise them.';

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['RTGS', 'NEFT', 'IMPS', 'Online demand drafts', 'E-banking'], 'Route map of Part 1: RTGS, NEFT, IMPS, online demand drafts and e-banking', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Mobile banking', 'ATMs', 'Debit and credit cards', 'Digital banking, UPI, e-wallets'], 'Route map of Part 2: mobile banking, ATMs, debit and credit cards, and digital banking with UPI and e-wallets', 'Part 2 at a glance');

// RTGS (individual, real time) versus NEFT (batched).
const vSettle = (() => {
  const s = new Svg(560, 290);
  s.text(140, 24, 'RTGS: one by one, at once', { bold: true, size: 14 });
  s.text(420, 24, 'NEFT: collected into batches', { bold: true, size: 14 });
  s.line(280, 10, 280, 280, { sw: 1, color: 'muted', dash: true });
  [60, 120, 180].forEach((y, i) => {
    s.rect(20, y, 90, 34, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.4 });
    s.text(65, y + 17, `Payment ${i + 1}`, { size: 12 });
    s.arrow(112, y + 17, 166, y + 17, { sw: 1.6, color: 'blue' });
    s.rect(170, y, 90, 34, { fill: 'green', fillOpacity: 0.12, color: 'green', sw: 1.4 });
    s.text(215, y + 17, 'Settled', { size: 12 });
  });
  [60, 120, 180].forEach((y, i) => {
    s.rect(300, y, 90, 34, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.4 });
    s.text(345, y + 17, `Payment ${i + 1}`, { size: 12 });
    s.line(392, y + 17, 430, 137, { sw: 1.4, color: 'blue' });
  });
  s.rect(432, 112, 110, 50, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.5 });
  s.text(487, 130, 'Batch settled', { size: 12, bold: true }).text(487, 148, 'every half hour', { size: 12 });
  s.text(140, 250, 'Minimum ₹2 lakh', { size: 12, muted: true });
  s.text(420, 250, 'No minimum', { size: 12, muted: true });
  return s.visual('Two panels. Left, RTGS: payments 1, 2 and 3 each go straight to settled, one by one; minimum 2 lakh rupees. Right, NEFT: payments 1, 2 and 3 are collected and settled together as a batch every half hour; no minimum', `RTGS settles each payment at once; NEFT settles in half-hourly batches. ${ASOF}`);
})();
const vTransfers = table(
  ['Basis', 'RTGS', 'NEFT', 'IMPS'],
  [
    ['Settlement', 'Each transaction, real time', 'Half-hourly batches', 'Instant, each transaction'],
    ['Minimum', '₹2 lakh', 'None', 'None'],
    ['Maximum', 'No upper limit set by RBI', 'No upper limit set by RBI', '₹5 lakh per transaction'],
    ['Availability', '24x7 since December 2020', '24x7 since December 2019', '24x7'],
    ['Typical use', 'Large, urgent payments', 'Routine payments of any size', 'Small, urgent payments, often by phone'],
  ],
  'Table comparing RTGS, NEFT and IMPS on settlement, minimum, maximum, availability and typical use, as of 2026',
  ASOF,
);
const vTransferEx = table(
  ['Payment (imagined: Lohargal Logistics)', 'Method', 'Reason'],
  [
    ['₹25 lakh to a truck dealer, needed at once', 'RTGS', 'Above ₹2 lakh; immediate, individual settlement'],
    ['Salaries to 20 drivers', 'NEFT', 'Many routine transfers; no minimum'],
    ['₹5,000 refund late at night', 'IMPS', 'Instant, round the clock, small amount'],
  ],
  'Worked table choosing RTGS for a large urgent payment, NEFT for salaries and IMPS for a small late-night refund',
  'Ask: how much, how urgent, and when?',
);
const vNeedFor = table(
  ['To send money electronically you need…', 'Why'],
  [
    ['Beneficiary\'s name and account number', 'To credit the right account'],
    ['IFSC of the beneficiary\'s branch', 'To route the money to the right branch'],
    ['For IMPS by phone: mobile number and MMID (or account and IFSC)', 'To identify the payee instantly'],
  ],
  'Table of details needed for an electronic transfer and why each is needed',
);
const vOdd = flow('LR', ['Log in to net banking', 'Fill payee and amount', 'Account debited', 'Draft issued and delivered'], 'Flow of an online demand draft: log in to net banking, fill in payee and amount, the account is debited, and the draft is issued and delivered', 'No queue at the branch.');
const vEbank = table(
  ['E-banking', 'Points'],
  [
    ['Meaning', 'Banking through the internet without visiting a branch'],
    ['Services', 'Balance and statements, transfers, bill payments, deposits, demand drafts'],
    ['For customers', 'Anytime, anywhere; quick; cheap; good records'],
    ['For banks', 'Lower cost per transaction; less branch crowding; wider reach'],
    ['Disadvantages', 'Security risks (phishing, hacking); needs device, internet and skills; technical failures; impersonal'],
  ],
  'Table summarising e-banking: meaning, services, advantages for customers and banks, and disadvantages',
);
const vSafe = table(
  ['Safety rule', 'Why'],
  [
    ['Never share OTP, PIN or password', 'Banks never ask for them'],
    ['Type the bank\'s address; do not click links', 'Fake links steal logins'],
    ['Keep SMS alerts on', 'Spot unauthorised debits at once'],
    ['Lock the phone; log out after use', 'Stops misuse if the device is lost'],
  ],
  'Table of four safety rules for digital banking with the reason for each',
);
const vMobile = table(
  ['Mobile banking', 'Points'],
  [
    ['Services', 'SMS alerts, balance enquiry, mini-statement, fund transfer, bill payment and recharge'],
    ['Advantages', 'Banking in the pocket; instant alerts; reaches remote areas; saves time'],
    ['Disadvantages', 'Lost phone risk; network problems; small screen; fraud calls and messages'],
  ],
  'Table of mobile-banking services, advantages and disadvantages',
);
// Debit versus credit card: where the money comes from.
const vCards = (() => {
  const s = new Svg(560, 270);
  const box = (x, y, w, t1, t2, c) => { s.rect(x, y, w, 52, { fill: c, fillOpacity: 0.14, color: c, sw: 1.5 }); s.text(x + w / 2, y + 20, t1, { bold: true, size: 13 }).text(x + w / 2, y + 39, t2, { size: 12 }); };
  s.text(140, 22, 'Debit card', { bold: true, size: 15 });
  s.text(420, 22, 'Credit card', { bold: true, size: 15 });
  box(40, 40, 200, 'Your account', 'own money', 'green');
  box(40, 190, 200, 'Shop', 'paid now', 'blue');
  s.arrow(140, 94, 140, 186, { sw: 2, color: 'green' });
  s.text(150, 140, 'deducted at once', { size: 12, anchor: 'start' });
  box(320, 40, 200, 'Bank', 'credit limit', 'accent');
  box(320, 190, 200, 'Shop', 'paid now', 'blue');
  s.arrow(420, 94, 420, 186, { sw: 2, color: 'accent' });
  s.text(430, 125, 'bank pays the shop;', { size: 12, anchor: 'start' }).text(430, 143, 'you repay later', { size: 12, anchor: 'start' }).text(430, 161, '(interest if late)', { size: 12, anchor: 'start', muted: true });
  return s.visual('Two panels. Debit card: money goes from your own account to the shop at once. Credit card: the bank pays the shop from your credit limit and you repay the bank later, with interest if you pay late', 'A debit card spends your money now; a credit card spends the bank\'s money, to be repaid.');
})();
const vCardTable = table(
  ['Basis', 'Debit card', 'Credit card'],
  [
    ['Source of funds', 'Holder\'s own account', 'Bank\'s credit, up to a limit'],
    ['Credit period', 'None', 'Interest-free period if paid in full by the due date'],
    ['Interest', 'None on purchases', 'High interest on unpaid balance'],
    ['Spending limit', 'Account balance', 'Credit limit'],
    ['Risk of overspending', 'Low', 'Higher'],
  ],
  'Table distinguishing debit and credit cards on source of funds, credit period, interest, spending limit and risk of overspending',
);
const vAtm = table(
  ['ATM services', 'Note'],
  [
    ['Cash withdrawal', 'Round the clock'],
    ['Balance enquiry and mini-statement', 'Quick check of recent entries'],
    ['PIN change', 'Keep the card secure'],
    ['Cash deposit (some machines)', 'Saves a trip to the counter'],
  ],
  'Table of common ATM services with a note on each',
);
const vDigital = table(
  ['Term', 'Meaning (only)', 'Imagined example'],
  [
    ['Digital banking', 'Banking through internet, mobile, cards and UPI instead of paper', 'A kayak-rental firm runs all its banking on an app'],
    ['UPI', 'Instant transfer from a bank account using a UPI ID, mobile number or QR code', 'Tourists scan the counter QR to pay'],
    ['E-wallet', 'Prepaid digital wallet loaded with money in advance', 'A stall owner keeps ₹1,000 loaded for small bills'],
  ],
  'Table giving the meaning of digital banking, UPI and e-wallets, each with an imagined example',
);
const vUpiWallet = flow('LR', ['Payer\'s bank account', 'UPI app (no stored money)', 'Payee\'s bank account'], 'Flow of a UPI payment: money moves from the payer\'s bank account through the UPI app, which stores no money, directly to the payee\'s bank account', 'UPI moves money bank to bank; an e-wallet spends a balance loaded earlier.');
const vChooser = table(
  ['If you want to…', 'Use'],
  [
    ['send ₹10 lakh to arrive at once', 'RTGS'],
    ['pay many routine bills or salaries', 'NEFT'],
    ['send ₹2,000 instantly at night', 'IMPS or UPI'],
    ['pay at a shop counter by phone', 'UPI QR code'],
    ['buy now and pay next month', 'Credit card'],
    ['spend only what you have', 'Debit card'],
  ],
  'Decision table matching six needs to RTGS, NEFT, IMPS or UPI, a UPI QR code, a credit card or a debit card',
  ASOF,
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['RTGS', 'Real time, gross; minimum ₹2 lakh; 24x7 since 2020'], ['NEFT', 'Half-hourly batches; no minimum; 24x7 since 2019'], ['IMPS', 'Instant, 24x7; up to ₹5 lakh per transaction'], ['Online DD', 'Requested through net banking'], ['E-banking', 'Anytime banking online; guard against fraud']],
  'Summary table of Part 1: RTGS, NEFT, IMPS, online demand drafts and e-banking',
  ASOF,
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Mobile banking', 'Alerts, transfers, bills on the phone'], ['ATM', 'Cash and basic services round the clock'], ['Debit vs credit card', 'Own money now vs bank\'s money, repaid later'], ['Digital banking, UPI, e-wallet', 'Online channels; bank-to-bank instant; prepaid wallet']],
  'Summary table of Part 2: mobile banking, ATMs, debit and credit cards, and digital banking, UPI and e-wallets',
);
const vCaseSteps = flow('LR', ['How much?', 'How urgent?', 'Which channel?'], 'Three questions for choosing a payment method: how much, how urgent, and which channel');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Banking: Latest Trends — Part 1: Electronic Transfers and E-banking',
  goals: [
    'Compare RTGS, NEFT and IMPS by settlement, amount, timing and typical use',
    'Explain how an online demand draft is obtained',
    'Evaluate e-banking for customers and banks, including its security risks',
  ],
  slides: [
    sl('title', 'Banking: Latest Trends', {
      b: 'Part 1: moving money **electronically** — RTGS, NEFT, IMPS, online drafts — and **e-banking**.',
      v: vRoute1,
      n: 'Not long ago, paying a supplier in another city meant a cheque or a draft and days of waiting. Today money moves in seconds. In this part we learn the main electronic transfer systems and the internet banking that brings the bank to your screen.',
    }),
    sl('concept', 'What you need for an electronic transfer', {
      v: vNeedFor,
      n: 'To send money electronically you need the payee\'s name and account number, and the code of the payee\'s branch, called the IFSC. For instant transfers by phone, a mobile number with a mobile money identifier, or the account number and IFSC, identifies the payee.',
    }),
    sl('check', 'Quick check: IFSC', {
      b: 'What does the IFSC identify?',
      chk: 'm_ifsc',
      n: 'Think of where the money must be routed.',
    }),
    sl('diagram', 'RTGS and NEFT: how they settle', {
      v: vSettle,
      n: 'RTGS stands for real time gross settlement. Each payment is settled on its own, the moment it is processed, and the minimum is two lakh rupees. NEFT collects payments and settles them in batches every half hour, with no minimum. Both now run round the clock on all days.',
    }),
    sl('concept', 'RTGS, NEFT and IMPS compared', {
      v: vTransfers,
      n: 'Compare the three. RTGS is for large, urgent payments. NEFT handles routine payments of any size in batches. IMPS sends money instantly, day and night, up to five lakh rupees per transaction, and is popular on mobile phones. These limits stood as of twenty twenty six and can be revised.',
    }),
    sl('check', 'Quick check: round the clock', {
      b: 'True or false: RTGS has been available 24x7 since December 2020.',
      chk: 'tf_rtgs_24x7',
      n: 'NEFT went round the clock first; RTGS followed a year later.',
    }),
    sl('example', 'Worked example 1: choosing a method', {
      b: 'An imagined logistics firm has three payments to make today.',
      bl: ['Step 1: check the **amount** (is it at least ₹2 lakh?).', 'Step 2: check the **urgency** and the **time**.', 'Step 3: pick RTGS, NEFT or IMPS and give the reason.'],
      v: vTransferEx,
      n: 'Twenty five lakh rupees that must arrive at once goes by RTGS. Salaries to twenty drivers suit NEFT. A five thousand rupee refund late at night suits IMPS, which is instant and always open. Amount, urgency and timing decide the choice.',
    }),
    sl('diagram', 'Online demand drafts', {
      b: 'A demand draft can now be **requested through net banking**.',
      v: vOdd,
      n: 'Some payees still want a demand draft. Instead of queuing at the branch, a customer can request one through net banking. The bank debits the account and issues the draft, which is delivered or collected. It saves time and travel.',
    }),
    sl('concept', 'E-banking', {
      b: '**E-banking** (internet banking) lets customers bank **online**, at any time, from anywhere.',
      v: vEbank,
      n: 'E-banking puts the branch on a screen. Customers check balances, transfer funds, pay bills and open deposits at any hour. Banks save cost and space. But there are risks: phishing and hacking, the need for devices and skills, technical failures, and less personal contact.',
    }),
    sl('example', 'Worked example 2: spotting fraud', {
      b: 'An imagined sweet shop gets an email "from the bank" asking for its password on a link.',
      bl: ['Step 1: ask — would a bank **ever** ask for a password or OTP? (No.)', 'Step 2: name it: **phishing**.', 'Step 3: act: do not click; report to the bank through its **official** number.'],
      v: vSafe,
      n: 'A message asking for a password or one time password is a trap called phishing. Banks never ask for these. The shop should not click the link, and should report it through the bank\'s official number. Simple habits keep online banking safe.',
    }),
    sl('check', 'Quick check: the fake email', {
      b: 'An email that looks like the bank asks the owner to "verify" a password on a link. This is…',
      chk: 'm_phishing',
      n: 'Who really sent it?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. RTGS settles large payments one by one in real time. NEFT settles any amount in half hourly batches. IMPS is instant, day and night, up to its limit. Demand drafts can be requested online. E-banking is convenient and cheap, but must be used safely.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Compare transfer methods **basis by basis**: settlement, amount, timing, use.', 'Quote limits with **"as of 2026"** awareness; the RBI can revise them.', 'For e-banking, separate advantages to **customers** and to **banks**.'],
      v: vCaseSteps,
      n: 'Some tips. Set out comparisons basis by basis. Remember that limits and timings are set by the Reserve Bank and can change. And when asked about e-banking, keep the advantages to customers separate from the advantages to banks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Banking: Latest Trends — Part 2: Mobile Banking, Cards and Digital Payments',
  goals: [
    'State the services, advantages and disadvantages of mobile banking',
    'Distinguish a debit card from a credit card and state the functions of ATMs',
    'Explain the meaning of digital banking, UPI and e-wallets',
  ],
  slides: [
    sl('title', 'Mobile Banking, Cards and Digital Payments', {
      b: 'Part 2: banking on the **phone**, **ATMs**, **debit and credit cards**, and **UPI and e-wallets**.',
      v: vRoute2,
      n: 'In this part, banking moves into your pocket. We look at mobile banking, the cash machines on every street, the two kinds of cards, and the instant digital payments now used even at small stalls.',
    }),
    sl('concept', 'Mobile banking', {
      v: vMobile,
      n: 'Mobile banking offers alerts, balance checks, transfers and bill payments on a phone, by app or even by text message. It brings banking to remote areas and saves time. But a lost phone, a weak network or a fraud call can cause trouble.',
    }),
    sl('check', 'Quick check: the instant message', {
      b: 'A customer gets a message within seconds of every debit, and spots a misuse. Which service helped?',
      chk: 'm_sms_alert',
      n: 'What arrives on the phone after each transaction?',
    }),
    sl('concept', 'ATMs', {
      b: 'An **ATM** (automated teller machine) gives cash and basic services **round the clock**.',
      v: vAtm,
      n: 'Automated teller machines let customers withdraw cash, check balances, get a mini statement and change their PIN at any hour. Some also accept deposits. They take routine work away from bank counters.',
    }),
    sl('diagram', 'Debit card or credit card?', {
      v: vCards,
      n: 'With a debit card, the money leaves your own account at once. With a credit card, the bank pays the shop from your credit limit, and you repay the bank later. Pay the full bill by the due date and there is no interest; leave a balance and interest is charged, often at a high rate.',
    }),
    sl('example', 'Worked example 1: comparing the cards', {
      b: 'An imagined shop owner holds both cards. Compare them basis by basis.',
      bl: ['Step 1: **whose money** is spent?', 'Step 2: is there a **credit period**?', 'Step 3: what does it **cost** if unpaid?'],
      v: vCardTable,
      n: 'The debit card spends her own money, with no credit period and no interest. The credit card spends the bank\'s money up to a limit, gives an interest free period if she pays in full, but charges high interest on any balance left unpaid.',
    }),
    sl('check', 'Quick check: paying from savings', {
      b: 'A card payment is deducted from the holder\'s savings account at once. The card is a…',
      chk: 'm_debit',
      n: 'Whose money is spent, and when?',
    }),
    sl('concept', 'Digital banking, UPI and e-wallets', {
      b: 'The syllabus needs the **meaning only** of these three terms.',
      v: vDigital,
      n: 'Digital banking means using electronic channels instead of paper and branches. UPI, the unified payments interface, sends money instantly from one bank account to another using an ID, a mobile number or a QR code. An e wallet is a prepaid digital purse, loaded with money in advance.',
    }),
    sl('diagram', 'UPI moves money bank to bank', {
      v: vUpiWallet,
      n: 'In a UPI payment, the app holds no money of its own. It simply instructs the payer\'s bank to send money straight to the payee\'s bank account. An e wallet is different: you load money into it first and then spend that balance.',
    }),
    sl('check', 'Quick check: the loaded app', {
      b: 'A stall owner loads ₹1,000 into an app and pays small bills from that balance. The app is…',
      chk: 'm_wallet',
      n: 'Was the money loaded in advance?',
    }),
    sl('example', 'Worked example 2: matching needs to tools', {
      b: 'Six everyday needs, six tools.',
      bl: ['Step 1: note the **amount** and **urgency**.', 'Step 2: decide **whose money** should be used, now or later.', 'Step 3: name the tool.'],
      v: vChooser,
      n: 'Ten lakh rupees needed at once: RTGS. Many routine bills: NEFT. A small instant transfer at night: IMPS or UPI. Paying at a counter: scan the QR code. Buying now and paying later: a credit card. Spending only what you have: a debit card.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Mobile banking brings alerts, transfers and bill payments to the phone. ATMs give cash any time. A debit card spends your own money now; a credit card spends the bank\'s money, repaid later. UPI moves money bank to bank instantly, while an e wallet spends a prepaid balance.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['For cards, use three bases: **source of funds, credit period, interest**.', 'Say **"meaning only"** answers crisply: one clear sentence for UPI, e-wallet, digital banking.', 'Add a **safety** point when asked about disadvantages of digital channels.'],
      v: vCaseSteps,
      n: 'Final tips. Compare cards on source of funds, credit period and interest. For UPI, e wallets and digital banking, the syllabus asks for meaning only, so one clear sentence each is enough. And when listing disadvantages, remember fraud and safety.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Banking: Latest Trends — notes',
  sections: [
    {
      h: '1. Online fund transfer: RTGS, NEFT, IMPS and online demand drafts',
      t: 1,
      b: `*${ASOF}*\n\n- **RTGS (Real Time Gross Settlement):** each transaction settled individually and immediately; **minimum ₹2 lakh**, no upper limit set by the RBI; available **24x7 since December 2020**; used for large, urgent payments.\n- **NEFT (National Electronic Funds Transfer):** settled in **half-hourly batches** (deferred net settlement); **no minimum or maximum** set by the RBI; available **24x7 since December 2019**; used for routine payments of any size.\n- **IMPS (Immediate Payment Service):** **instant**, 24x7 transfer, often by mobile, using mobile number and MMID or account number and IFSC; per-transaction limit **₹5 lakh**.\n- **Online demand draft:** a draft requested through net banking; the account is debited and the draft is issued and delivered.\n\nTo transfer funds electronically, the sender needs the payee\'s **name, account number and IFSC** (the code of the payee\'s bank branch).`,
      terms: [['RTGS', 'Real-time, transaction-by-transaction settlement for large payments.'], ['NEFT', 'Electronic transfer settled in half-hourly batches.'], ['IMPS', 'Instant electronic transfer available round the clock.'], ['IFSC', 'Indian Financial System Code identifying a bank branch.']],
      v: vSettle,
      vs: [vTransfers, vNeedFor, vTransferEx, vOdd],
    },
    {
      h: '2. Online payments and e-banking',
      t: 2,
      b: '**E-banking (internet banking)** is carrying out banking transactions through the internet. *Features:* anytime, anywhere access; self-service; instant information; secure login with password and OTP.\n\n**Advantages to customers:** convenience; 24x7 access; saves time and travel; quick transfers and bill payments; easy records.\n**Advantages to banks:** lower cost per transaction; less branch crowding; wider reach; more business at little extra cost.\n\n**Disadvantages:** security risks (phishing, hacking, fraud); needs devices, internet and digital skills; technical failures; impersonal service.\n\n**Safety:** never share OTP, PIN or password; use only official apps and websites; keep alerts on; log out and lock devices.',
      terms: [['E-banking', 'Banking through the internet.'], ['Phishing', 'Fraud that tricks people into revealing login details.'], ['OTP', 'One-time password for a single transaction.']],
      v: vEbank,
      vs: [vSafe],
    },
    {
      h: '3. Mobile banking',
      t: 3,
      b: '**Mobile banking** is banking through a mobile phone, by app or SMS. *Services:* SMS alerts for every debit and credit; balance enquiry and mini-statement; fund transfer; bill payments and recharges.\n\n**Advantages:** banking anywhere; instant alerts help detect fraud; reaches remote areas where branches are few; saves time.\n**Disadvantages:** risk if the phone is lost or unlocked; poor networks; small screens; fraud calls and messages.',
      terms: [['Mobile banking', 'Banking services used through a mobile phone.'], ['SMS alert', 'Text message sent on every account transaction.']],
      v: vMobile,
    },
    {
      h: '4. ATMs, debit cards and credit cards',
      t: 4,
      b: '**ATM (Automated Teller Machine):** cash withdrawal, balance enquiry, mini-statement, PIN change and, on some machines, cash deposit; available round the clock.\n\n**Debit card:** linked to the holder\'s account; amount deducted **at once**; spending limited to the balance; no credit period and no interest on purchases.\n**Credit card:** spends the **bank\'s credit** up to a limit; an **interest-free period** if the full bill is paid by the due date; **high interest** on unpaid balances; may encourage overspending.\n\n**Differences:** source of funds; credit period; interest; spending limit; risk of overspending.',
      terms: [['Debit card', 'Card that spends the holder\'s own balance immediately.'], ['Credit card', 'Card that spends the bank\'s credit, repaid later.'], ['PIN', 'Personal identification number securing a card.']],
      v: vCards,
      vs: [vCardTable, vAtm],
    },
    {
      h: '5. Digital banking, UPI and e-wallets (meaning only)',
      t: 5,
      b: '- **Digital banking:** providing banking services through digital channels — internet, mobile apps, cards and UPI — instead of paper and branches.\n- **UPI (Unified Payments Interface):** a system for instant transfers **directly between bank accounts**, using a UPI ID (virtual payment address), mobile number or **QR code**.\n- **E-wallet:** a **prepaid** digital wallet; money is loaded in advance and payments are made from the stored balance.',
      terms: [['UPI', 'Instant bank-to-bank payment by UPI ID, mobile number or QR code.'], ['E-wallet', 'Prepaid digital wallet loaded with money in advance.']],
      v: vDigital,
      vs: [vUpiWallet, vChooser],
    },
  ],
  tips: '**Common mistakes**\n- Saying NEFT settles instantly (it settles in batches) or that RTGS has no minimum.\n- Saying a debit card gives a credit period.\n- Treating UPI as a wallet that must be loaded with money.\n- Quoting limits without remembering they can be revised.\n\n**How marks are usually awarded**\n- 1 mark: correct option, term or method.\n- 2–3 marks: each basis stated for both items, or each point explained with an example.\n- 5 marks: parts answered separately; comparisons basis by basis; a reasoned recommendation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**RTGS**', 'Real Time Gross Settlement: each transaction at once; minimum ₹2 lakh (as of 2026).', 'definition', 1],
  ['**NEFT**', 'National Electronic Funds Transfer: settled in half-hourly batches; no minimum.', 'definition', 1],
  ['**IMPS**', 'Immediate Payment Service: instant, 24x7; up to ₹5 lakh per transaction (as of 2026).', 'definition', 1],
  ['NEFT 24x7 since…', 'December 2019.', 'fact', 1],
  ['RTGS 24x7 since…', 'December 2020.', 'fact', 1],
  ['**IFSC**', 'Code identifying the payee\'s bank branch.', 'definition', 1],
  ['₹1.5 lakh transfer: which method is ruled out?', 'RTGS (minimum ₹2 lakh).', 'exam-tip', 1],
  ['**Online demand draft**', 'A draft requested through net banking; account debited, draft delivered.', 'definition', 1],
  ['**E-banking**', 'Banking through the internet, any time, anywhere.', 'definition', 2],
  ['E-banking: one advantage to banks', 'Lower cost per transaction.', 'fact', 2],
  ['E-banking: main risk', 'Security: phishing and hacking.', 'exam-tip', 2],
  ['**Phishing**', 'Fake message or call that tries to steal login details.', 'definition', 2],
  ['Golden safety rule', 'Never share OTP, PIN or password.', 'exam-tip', 2],
  ['**Mobile banking**', 'Banking through a phone, by app or SMS.', 'definition', 3],
  ['Mobile-banking services', 'Alerts, balance enquiry, transfers, bill payments.', 'fact', 3],
  ['Risk special to mobile banking', 'A lost or unlocked phone.', 'exam-tip', 3],
  ['Why mobile banking helps remote areas', 'Phones reach far more places than branches.', 'concept', 3],
  ['**ATM**', 'Automated Teller Machine: cash and basic services round the clock.', 'definition', 4],
  ['**Debit card**', 'Spends your own balance at once; no credit period.', 'definition', 4],
  ['**Credit card**', 'Spends the bank\'s credit; pay later; interest on unpaid balance.', 'definition', 4],
  ['Debit vs credit card: three bases', 'Source of funds, credit period, interest.', 'exam-tip', 4],
  ['Paying only the minimum on a credit card', 'Interest is charged on the rest.', 'fact', 4],
  ['Best first card for a new account holder', 'Debit card (no debt, no interest).', 'concept', 4],
  ['**Digital banking**', 'Banking through internet, mobile, cards and UPI.', 'definition', 5],
  ['**UPI**', 'Instant bank-to-bank transfer by UPI ID, mobile number or QR code.', 'definition', 5],
  ['**E-wallet**', 'Prepaid digital wallet loaded in advance.', 'definition', 5],
  ['UPI vs e-wallet', 'UPI pays from the bank account; a wallet spends a loaded balance.', 'exam-tip', 5],
  ['QR code at a shop counter', 'Scan to pay by UPI into the shop\'s bank account.', 'fact', 5],
  ['Large urgent payment', 'RTGS.', 'exam-tip', 1],
  ['Small instant payment at night', 'IMPS or UPI.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Banking: Latest Trends',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_rtgs', 'm_imps', 'm_eb_feature', 'm_credit', 'ar_rtgs_big'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_neft_rtgs', { attempt: 1, keys: ['s_mob_dis', 's_upi'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_transfers', { attempt: 1, keys: ['s3_eb_customers', 's3_cards'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_cards'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Banking: Latest Trends',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_neft', 'm_rtgs_min', 'm_odd', 'm_transfer_pqrs', 'm_eb_bank', 'm_mob_lost', 'm_atm', 'm_credit_interest', 'm_card_pqrs', 'm_upi', 'ar_neft_batch', 'ar_upi_wallet'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_imps', 's_eb_adv', { attempt: 1, keys: ['s_atm', 's_eb_bank'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_eb_disadv', 's3_mob', 's3_credit_eval', { attempt: 1, keys: ['s3_digital', 's3_security'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_transfers', { attempt: 1, keys: ['l_ebank', 'l_mobile_digital'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-commerce-ch05 (RTGS, NEFT, IMPS and online demand drafts; e-banking; mobile banking; ATM, debit and credit cards; digital banking, UPI and e-wallets, meaning only)',
    originality: 'every person, firm and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036)',
    data: 'no computed figures',
    facts: 'time-sensitive payment-system facts carry an "as of 2026" note wherever used: RTGS minimum ₹2 lakh and 24x7 since December 2020; NEFT 24x7 since December 2019 with no RBI minimum or maximum; IMPS ₹5 lakh per transaction; no fees, UPI limits or wallet limits are stated',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
