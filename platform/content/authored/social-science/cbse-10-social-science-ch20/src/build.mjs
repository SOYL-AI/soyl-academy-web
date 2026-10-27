// Build CBSE 10 Social Science ch20 Money and Credit. Run from platform/:
//   npx tsx content/authored/social-science/cbse-10-social-science-ch20/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-10-social-science-ch20', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vBarter = flow(
  'LR',
  ['Weaver has shawls, wants rice', 'Rice farmer has rice, wants a plough', 'Blacksmith has ploughs, wants shawls'],
  'Flow of three barter traders: a weaver with shawls wants rice, a rice farmer wants a plough, and a blacksmith wants shawls; no two of them want what the other has',
  'No two of them can trade directly: no double coincidence of wants.',
);
const vMedium = flow(
  'LR',
  ['Weaver sells shawls for money', 'Money', 'Weaver buys rice from the farmer', 'Farmer buys a plough with the same money'],
  'Flow: the weaver sells shawls for money, uses money to buy rice, and the farmer uses the same money to buy a plough',
  'Money stands in the middle of every exchange.',
);
const vHistory = table(
  ['Period', 'What was used as money'],
  [
    ['Very early times', 'Goods such as grain, cattle and cowrie shells'],
    ['Later', 'Coins of gold, silver and copper'],
    ['Last two centuries', 'Paper currency notes and low-value coins'],
    ['Today', 'Notes and coins, plus bank deposits used through cheques, cards and UPI'],
  ],
  'Table of how money changed: grain, cattle and shells; then gold, silver and copper coins; then paper notes; today notes and coins plus bank deposits used by cheque, card and UPI',
);
const vCurrency = table(
  ['Question', 'Answer'],
  [
    ['Who issues currency notes?', 'The Reserve Bank of India, on behalf of the central government'],
    ['Who issues coins?', 'The Government of India; the RBI puts them into circulation'],
    ['Why is it accepted?', 'It is authorised by the government as legal tender'],
    ['Can anyone refuse rupees?', 'No individual in India can legally refuse payment in rupees'],
  ],
  'Table on modern currency: the RBI issues notes for the central government, the Government of India issues coins, currency is accepted because the government authorises it, and no one can legally refuse rupees',
);
const vDeposits = flow(
  'TB',
  ['People deposit spare cash in a bank account', 'Deposit earns some interest', 'Withdraw on demand', 'Pay others by cheque, card or UPI'],
  'Flow: people deposit spare cash, the deposit earns interest, it can be withdrawn on demand, and it can be used to pay others by cheque, card or UPI',
  'Demand deposits share the essential features of money.',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n4' },
  ],
);
const vCheque = table(
  ['Step', 'What happens'],
  [
    ['1', 'Meera, a cloth merchant in Surat, writes a cheque for ₹25,000 to her supplier Anil'],
    ['2', 'Anil deposits the cheque in his own bank'],
    ['3', 'The banks clear the cheque'],
    ['4', '₹25,000 moves from Meera\'s account to Anil\'s account; no cash changes hands'],
  ],
  'Table of a cheque payment: Meera writes a cheque for 25,000 rupees to Anil, he deposits it, the banks clear it, and the amount moves from her account to his without cash',
  'Imagined example.',
);
const vDigital = table(
  ['Digital way to pay', 'What it moves'],
  [
    ['UPI (scan a QR code or enter a UPI ID)', 'Demand deposits, instantly, from one bank account to another'],
    ['Debit card', 'Demand deposits from the cardholder\'s account'],
    ['Net banking transfers', 'Demand deposits between accounts'],
    ['Digital rupee (e₹), being piloted by the RBI', 'A digital form of currency issued by the RBI'],
  ],
  'Table of digital payments: UPI, debit cards and net banking move demand deposits between accounts; the digital rupee piloted by the RBI is a digital form of currency',
);
const vBankLoans = flow(
  'TB',
  ['Deposits from savers (bank pays interest)', 'Small part kept as cash for daily withdrawals', 'Most of it lent to borrowers (bank charges higher interest)', 'Interest gap = main income of the bank'],
  'Flow: deposits from savers are partly kept as cash and mostly lent to borrowers at a higher interest; the gap is the bank\'s main income',
  'Banks link savers and borrowers.',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n3', to: 'n4' },
  ],
);
const vMargin = table(
  ['Item (imagined bank)', 'Amount', 'Rate', 'Interest for a year'],
  [
    ['Loans given', '₹40 crore', '12% charged', '₹4.8 crore earned'],
    ['Deposits held', '₹50 crore', '5% paid', '₹2.5 crore paid'],
    ['**Difference**', '', '', '**₹2.3 crore income**'],
  ],
  'Table of an imagined bank: 40 crore rupees lent at 12 per cent earns 4.8 crore; 50 crore of deposits at 5 per cent costs 2.5 crore; the difference is 2.3 crore of income',
  'Imagined figures.',
);
const vTrap = flow(
  'LR',
  ['Loan at high interest', 'Crop fails or income stops', 'Cannot repay', 'Borrows again or sells land, cattle, gold', 'Worse off than before: debt trap'],
  'Flow of a debt trap: a high-interest loan, failed income, inability to repay, borrowing again or selling assets, and ending worse off',
  'How credit can become a trap',
);
const vTwoStories = table(
  ['', 'Neha, rakhi maker, Jaipur (imagined)', 'Ganpat, cotton farmer, Yavatmal (imagined)'],
  [
    ['Why borrow?', 'Threads and beads for festival orders', 'Seeds, fertiliser and pesticide'],
    ['From whom?', 'Wholesaler\'s advance; shop credit', 'Moneylender at 3% a month'],
    ['What happened?', 'Orders delivered on time, paid in full', 'Pests destroyed half the crop'],
    ['Result', 'Repaid; profit; better off', 'Could not repay; sold an acre of land; worse off'],
  ],
  'Table comparing two imagined borrowers: Neha the rakhi maker repays and earns a profit; Ganpat the cotton farmer loses half his crop to pests, cannot repay and sells land',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Barter', 'Needs a double coincidence of wants'],
    ['Money', 'Medium of exchange accepted by all; removes that problem'],
    ['Currency', 'Notes issued by the RBI for the central government; legal tender'],
    ['Demand deposits', 'Withdrawable on demand; paid by cheque, card, UPI; also money'],
    ['Banks', 'Keep a small cash reserve, lend the rest; interest gap is income'],
    ['Credit', 'Can raise earnings or cause a debt trap; depends on risk and terms'],
  ],
  'Summary table of Part 1: barter, money, currency, demand deposits, banks and credit',
);
const vTerms = table(
  ['Term of credit', 'Meaning', 'Example (imagined)'],
  [
    ['Interest rate', 'Extra paid on top of the loan, as a percentage', '12% a year on a bank loan'],
    ['Collateral', 'Asset pledged as a guarantee until repayment', 'Land papers, a tractor, gold'],
    ['Documentation', 'Papers the lender asks for', 'Identity proof, land record, income record'],
    ['Mode of repayment', 'How and when the loan is repaid', 'Monthly instalments; lump sum after harvest'],
  ],
  'Table of the four terms of credit with meanings and examples: interest rate, collateral, documentation and mode of repayment',
);
const vCompare = table(
  ['', 'Moneylender (imagined)', 'Bank (imagined)'],
  [
    ['Loan', '₹20,000 for 6 months', '₹20,000 for 6 months'],
    ['Interest', '2% a month', '12% a year (1% a month)'],
    ['Interest for 6 months', '20,000 × 2% × 6 = ₹2,400', '20,000 × 1% × 6 = ₹1,200'],
    ['Collateral and papers', 'None', 'Land record or other security; documents'],
  ],
  'Table comparing two imagined loans of 20,000 rupees for six months: a moneylender at 2 per cent a month costs 2,400 rupees with no papers; a bank at 12 per cent a year costs 1,200 rupees but needs collateral and documents',
  'The bank costs half as much, but asks for security and papers.',
);
const vSources = table(
  ['', 'Formal sources', 'Informal sources'],
  [
    ['Who', 'Banks, cooperatives', 'Moneylenders, traders, employers, relatives, friends'],
    ['Supervised by', 'Reserve Bank of India', 'Nobody'],
    ['Interest', 'Lower', 'Usually much higher'],
    ['Collateral and papers', 'Usually needed', 'Often not needed'],
    ['Recovery', 'By legal means', 'Sometimes by unfair means'],
  ],
  'Table comparing formal sources (banks, cooperatives, supervised by the RBI, lower interest, need collateral and papers, legal recovery) with informal sources (moneylenders, traders, employers, relatives, unsupervised, higher interest, often no papers, sometimes unfair recovery)',
);
const vRbi = flow(
  'TB',
  ['Reserve Bank of India', 'Checks that banks keep a minimum cash balance', 'Sees that banks lend to small farmers, small industries and small borrowers too', 'Collects regular reports on how much, to whom and at what interest banks lend'],
  'Flow from the Reserve Bank of India to three supervisory roles: minimum cash balance, lending to small borrowers, and regular reports on lending',
  'How the RBI supervises formal lenders',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n4' },
  ],
);
const vSurvey = {
  kind: 'plot',
  spec: {
    x: { min: 0, max: 6, label: 'Bars 1–2: better-off households; bars 4–5: poor households (formal, informal)' },
    y: { min: 0, max: 100, label: 'Share of loans (%)' },
    functions: [],
    points: [],
    series: [
      { label: 'Formal (banks, cooperatives)', points: [[1, 80], [4, 30]], kind: 'bar' },
      { label: 'Informal (moneylenders, traders, others)', points: [[2, 20], [5, 70]], kind: 'bar' },
    ],
    grid: true,
  },
  alt: 'Bar chart of an imagined district survey: better-off households take 80 per cent of loans from formal sources and 20 per cent from informal; poor households take 30 per cent from formal and 70 per cent from informal sources',
  caption: 'Imagined survey: the poor depend far more on informal credit.',
};
const vExpand = table(
  ['Step', 'How it widens formal credit'],
  [
    ['Bank accounts for all (Jan Dhan accounts since 2014)', 'More than 50 crore basic accounts opened, many for people with no account before'],
    ['Banking correspondents and branches in villages', 'Banking services reach places without a branch'],
    ['Kisan Credit Cards', 'Farmers get crop loans on simple terms'],
    ['SHG–bank linkage', 'Groups borrow without collateral'],
    ['Rules for loan apps', 'The RBI regulates digital lending; borrow only from regulated lenders'],
  ],
  'Table of steps that widen formal credit: Jan Dhan bank accounts, banking correspondents and branches, Kisan Credit Cards, SHG–bank linkage, and RBI rules for loan apps',
);
const vShg = flow(
  'LR',
  ['15–20 women of a neighbourhood form a group', 'Save a small amount every month', 'Lend from the pool to members', 'After 1–2 years: bank loan to the group', 'Members start or expand small enterprises'],
  'Flow of how a self-help group grows: women form a group, save monthly, lend from the pool, get a bank loan for the group after one to two years, and start small enterprises',
  'How a self-help group works',
);
const vShgFeatures = table(
  ['Feature', 'Why it matters'],
  [
    ['Members decide on savings and loans', 'Loans fit members\' real needs'],
    ['Group responsible for repayment', 'No collateral needed; members follow up defaulters'],
    ['Interest lower than moneylenders\'', 'Less of members\' income goes to repayment'],
    ['Regular meetings', 'A platform for health, nutrition and other social issues'],
  ],
  'Table of SHG features and why each matters: member decisions, group responsibility instead of collateral, lower interest, and meetings as a social platform',
);
const vShgCalc = table(
  ['Step', 'Working (imagined group of 18 members saving ₹150 a month)'],
  [
    ['Group saving per month', '18 × 150 = ₹2,700'],
    ['Group saving in a year', '2,700 × 12 = ₹32,400'],
    ['Loans possible from the pool', 'For example, 8 loans of ₹4,000 = ₹32,000'],
  ],
  'Table of SHG savings: 18 members saving 150 rupees a month save 2,700 rupees a month and 32,400 rupees a year, enough for eight loans of 4,000 rupees',
  'Imagined figures.',
);
const vEmpower = table(
  ['Area', 'How SHGs help'],
  [
    ['Money', 'Small loans for goats, sewing machines, shops; own income'],
    ['Debt', 'Freedom from high-interest moneylenders'],
    ['Voice', 'Women speak in meetings, keep accounts, deal with banks'],
    ['Society', 'Discussion of health, nutrition, schooling and violence'],
    ['Origin of the idea', 'The Grameen Bank of Bangladesh (Muhammad Yunus; Nobel Peace Prize 2006)'],
  ],
  'Table of how SHGs empower women in money, debt, voice and society, and the origin of group lending in the Grameen Bank of Bangladesh',
);
const vPlan = table(
  ['Point', 'Formal', 'Informal'],
  [
    ['1. Who lends', 'Banks, cooperatives', 'Moneylenders, traders, relatives'],
    ['2. Supervision', 'RBI', 'None'],
    ['3. Interest', 'Lower', 'Higher'],
    ['4. Collateral and papers', 'Needed', 'Often not needed'],
    ['5. Effect', 'Helps borrowers invest', 'Can cause debt traps'],
  ],
  'Answer plan for a five-mark comparison of formal and informal credit: who lends, supervision, interest, collateral and papers, and effect on borrowers',
  'One mark per point; each point names both sources.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Terms of credit', 'Interest, collateral, documentation, mode of repayment'],
    ['Formal credit', 'Banks and cooperatives; supervised by the RBI; cheaper'],
    ['Informal credit', 'Moneylenders, traders, relatives; unsupervised; costlier'],
    ['The gap', 'The poor depend more on informal credit; formal credit must reach them'],
    ['Self-help groups', '15–20 women; pooled savings; bank loans without collateral'],
    ['Empowerment', 'Income, freedom from moneylenders, voice and confidence'],
  ],
  'Summary table of Part 2: terms of credit, formal and informal credit, the gap for the poor, self-help groups and empowerment',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Money and Credit — Part 1: Money, Banks and Credit',
  goals: [
    'Explain the double coincidence of wants and how money works as a medium of exchange',
    'Describe modern forms of money: currency, demand deposits and digital payments',
    'Explain how banks use deposits to give loans',
    'Explain, with examples, how credit can help or trap a borrower',
  ],
  slides: [
    sl('title', 'Money and Credit', {
      b: 'Part 1 — why we need **money**, its **modern forms**, how **banks** lend, and when **credit** helps or hurts.',
      v: flow('LR', ['Barter and its problem', 'Money as a medium of exchange', 'Currency and deposits', 'Banks and loans', 'Credit: help or trap?'], 'Route map of Part 1: barter and its problem, money as a medium of exchange, currency and deposits, banks and loans, and whether credit helps or traps', 'Part 1 at a glance'),
      n: 'Namaste! How did you last pay for something? Perhaps with a note, perhaps by scanning a code on a phone. Have you wondered why a shopkeeper happily accepts a piece of paper, or a message on a screen, in return for real goods? In this chapter we find out what money is, how banks use it, and why borrowing money can lift a family up or pull it down.',
    }),
    sl('diagram', 'Life without money: barter', {
      b: 'In **barter**, goods are exchanged directly for goods.',
      v: vBarter,
      n: 'Imagine a village without money. A weaver has shawls and wants rice. The rice farmer does not need a shawl; he wants a plough. The blacksmith has ploughs and wants shawls. Nobody can trade directly, because no two of them want exactly what the other has. Barter works only when both sides want each other\'s goods. Economists call this the double coincidence of wants.',
    }),
    sl('check', 'Quick check: the weaver\'s problem', {
      b: 'A weaver wants rice, but the rice farmer wants a plough, not a shawl. What problem does the weaver face?',
      chk: 'm_dcw_scene',
      n: 'Think about what barter needs from both sides before an exchange can happen.',
    }),
    sl('diagram', 'Money: a medium of exchange', {
      v: vMedium,
      n: 'Now bring in money. The weaver sells shawls to anyone who wants them and receives money. With that money he buys rice from the farmer. The farmer uses the same money to buy a plough. Because everybody accepts money, nobody has to search for a perfect trading partner. Money acts as an intermediate in every exchange. That is why it is called a medium of exchange.',
    }),
    sl('concept', 'From grain to coins to notes', {
      v: vHistory,
      n: 'Money has taken many forms. Long ago, people used grain, cattle and even shells as money. Later came coins of gold, silver and copper, valued for their metal. In the last two centuries paper notes took over. Today, alongside notes and coins, a huge share of payments is made from bank accounts, by cheque, card or phone. The form changes, but the job stays the same.',
    }),
    sl('concept', 'Modern currency', {
      b: 'Rupee notes and coins are **currency**. They are accepted because the government **authorises** them, not because the paper is valuable.',
      v: vCurrency,
      n: 'A rupee note is just printed paper, so why does everyone accept it? Because it is authorised by the government. The Reserve Bank of India issues notes on behalf of the central government, and the government issues coins. Indian law makes the rupee legal tender: no one in India can refuse a payment made in rupees. That legal backing gives currency its value.',
    }),
    sl('check', 'Quick check: legal tender', {
      b: 'True or false? A shopkeeper in India may legally refuse payment in rupees and demand gold.',
      chk: 'tf_refuse',
      n: 'Remember what makes the rupee acceptable to everyone.',
    }),
    sl('diagram', 'Deposits with banks', {
      b: 'Money kept in a bank account that can be withdrawn whenever needed is a **demand deposit**.',
      v: vDeposits,
      n: 'Most people keep spare money in a bank. The bank pays a little interest, the money is safe, and it can be withdrawn whenever you ask, which is why it is called a demand deposit. You can also pay someone directly from it, by cheque, card or phone. Since deposits are available on demand and widely accepted for payments, they are also money.',
    }),
    sl('example', 'Worked example 1: how a cheque pays', {
      b: 'Follow a payment of ₹25,000 from Meera to her supplier Anil (imagined).',
      bl: [
        'Step 1 — Meera writes a **cheque**: an instruction to her bank to pay ₹25,000 to Anil.',
        'Step 2 — Anil deposits it in **his** bank.',
        'Step 3 — The banks **clear** the cheque.',
        'Step 4 — ₹25,000 moves **from Meera\'s account to Anil\'s**; no notes are used.',
      ],
      v: vCheque,
      n: 'Here is a cheque at work. Meera, a cloth merchant, owes her supplier twenty five thousand rupees. Instead of carrying cash, she writes a cheque, which is simply an instruction to her bank. Anil deposits it in his bank, the banks clear it, and the amount moves from her account to his. Not a single note changed hands, yet the payment is complete. Deposits did the work of money.',
    }),
    sl('concept', 'Digital money', {
      v: vDigital,
      n: 'Today the most common way to move deposits is digital. When you scan a QR code with UPI, money moves instantly from your bank account to the seller\'s. Billions of such payments happen in India every month, even for a cup of tea. Debit cards and net banking work the same way. The Reserve Bank is also piloting a digital rupee, a digital form of currency itself.',
    }),
    sl('check', 'Quick check: paying by UPI', {
      b: 'A vegetable seller is paid by UPI. Which form of money is actually being used?',
      chk: 'm_upi',
      n: 'Ask yourself: when the phone payment goes through, what moves, and from where to where?',
    }),
    sl('diagram', 'How banks use deposits', {
      v: vBankLoans,
      n: 'What does a bank do with all those deposits? On any day only a few depositors come to withdraw. So the bank keeps a small part as cash, as the Reserve Bank requires, and lends most of the rest to farmers, traders and businesses. Borrowers pay a higher interest than the bank pays depositors. That difference is the bank\'s main income. So banks link people who save with people who need loans.',
    }),
    sl('example', 'Worked example 2: a bank\'s income', {
      b: 'An imagined bank lends ₹40 crore at 12% a year and holds deposits of ₹50 crore at 5% a year. Find its income from the interest gap.',
      bl: [
        'Step 1 — Interest earned: 40 × 12 ÷ 100 = **₹4.8 crore**.',
        'Step 2 — Interest paid: 50 × 5 ÷ 100 = **₹2.5 crore**.',
        'Step 3 — Income: 4.8 − 2.5 = **₹2.3 crore**.',
        'Step 4 — Interpret: the bank earns by charging borrowers more than it pays savers.',
      ],
      v: vMargin,
      n: 'Let us check the bank\'s arithmetic. On forty crore rupees of loans at twelve per cent, it earns four point eight crore. On fifty crore of deposits at five per cent, it pays two point five crore. The difference, two point three crore, is its income from interest. Notice the bank pays depositors on more money than it lends, yet still earns, because the loan rate is much higher.',
    }),
    sl('two-column', 'Credit: two sides of the same coin', {
      b: '**Credit (a loan)**: a lender supplies money, goods or services now, in return for a **promise of future payment**.',
      cols: [
        '**When credit helps**\n\n- Pays for raw materials, seeds, tools\n- Production and sales rise\n- Loan repaid from higher earnings\n- Borrower ends **better off**',
        '**When credit hurts**\n\n- Income fails: crop loss, illness, no orders\n- Loan cannot be repaid\n- Borrower takes new loans or sells assets\n- Borrower ends **worse off**',
      ],
      n: 'Credit, or a loan, is an agreement: the lender gives money, goods or services now, and the borrower promises to pay later. Credit can be a ladder. It pays for seeds or raw materials, production rises, and the loan is repaid from higher earnings. But if income fails, through a bad harvest or illness, the same loan can become a burden that is very hard to escape.',
    }),
    sl('diagram', 'How a debt trap forms', {
      v: vTrap,
      n: 'Here is how a debt trap forms. A family borrows at high interest. Then something goes wrong: the rain fails or the main earner falls ill. The loan cannot be repaid, so the family borrows again, often at even higher interest, or sells land, cattle or gold. Each step leaves it poorer than before. This is why the terms of a loan, and the risk in the activity, matter so much.',
    }),
    sl('example', 'Worked example 3: two credit stories', {
      b: 'Compare two imagined borrowers and decide what made the difference.',
      bl: [
        'Step 1 — List each borrower\'s **purpose** and **source** of credit.',
        'Step 2 — Note **what happened** to their income.',
        'Step 3 — Judge the **result**: better off or worse off?',
        'Step 4 — Conclude: credit helps when the activity earns enough to repay; risk and costly terms create traps.',
      ],
      v: vTwoStories,
      n: 'Two borrowers, two endings. Neha takes an advance and credit before Raksha Bandhan, delivers her orders and ends up with a profit. Ganpat borrows from a moneylender at high interest; pests destroy half his cotton and he has to sell an acre of land. The difference is not that one borrowed and the other did not. It is the risk in the activity, and the terms of the loan.',
    }),
    sl('check', 'Quick check: a credit situation', {
      b: 'A farmer borrows from a moneylender, pests destroy the crop, and he sells part of his land to repay. What is this an example of?',
      chk: 'm_debt_trap',
      n: 'Compare the farmer\'s position before the loan and after it.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Here is Part 1 in brief. Barter needs a double coincidence of wants, and money solves that problem as a medium of exchange. Modern money is currency, issued by the Reserve Bank and the government, and demand deposits, which we use through cheques, cards and UPI. Banks keep a little cash and lend the rest, earning the interest gap. Credit can raise earnings, or, when income fails, it can trap the borrower.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      bl: [
        'Double coincidence of wants: say **both** parties must want what the other has.',
        'Currency is accepted because it is **authorised by the government** (legal tender), not because of its material.',
        'Demand deposits are money: **withdrawable on demand** and **used for payments**.',
        'Banks\' income = **interest on loans − interest on deposits**.',
        'For credit questions, give **one example each** of help and of a debt trap, and the reason.',
        'Write "RBI issues notes **on behalf of the central government**".',
      ],
      n: 'Some tips for this part. In the definition of double coincidence of wants, mention both parties. When asked why currency is accepted, write that the government authorises it; never say it is backed by gold. To explain why deposits are money, use two ideas: withdrawable on demand, and usable for payments. And for credit questions, a pair of examples, one success and one trap, usually earns full marks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Money and Credit — Part 2: Terms of Credit, Sources and Self-Help Groups',
  goals: [
    'Explain the terms of credit: interest, collateral, documentation and mode of repayment',
    'Compare formal and informal sources of credit and explain the RBI\'s role',
    'Explain why formal credit must reach the poor',
    'Explain how self-help groups give rural women access to credit and empowerment',
  ],
  slides: [
    sl('title', 'Who lends, on what terms?', {
      b: 'Part 2 — **terms of credit**, **formal and informal** lenders, the **RBI**, and **self-help groups**.',
      v: flow('LR', ['Terms of credit', 'Formal and informal sources', 'Role of the RBI', 'Why the poor pay more', 'Self-help groups'], 'Route map of Part 2: terms of credit, formal and informal sources, role of the RBI, why the poor pay more, and self-help groups', 'Part 2 at a glance'),
      n: 'In Part 1 we saw that credit can help or hurt. Whether it helps depends a lot on who lends and on what conditions. In this part we look at the terms of a loan, compare banks and cooperatives with moneylenders and traders, see how the Reserve Bank keeps watch, and meet one of India\'s most successful ideas for poor women: the self-help group.',
    }),
    sl('concept', 'Terms of credit', {
      v: vTerms,
      n: 'Every loan comes with conditions, called the terms of credit. The interest rate is the extra you pay on top of the loan. Collateral is an asset you pledge, like land papers or gold, which the lender can sell if you do not repay. Documentation means the papers the lender asks for. And the mode of repayment says how and when you pay back. Terms differ a lot from lender to lender.',
    }),
    sl('example', 'Worked example 1: comparing the cost of two loans', {
      b: 'Kamal (imagined) needs ₹20,000 for 6 months. A moneylender offers 2% a month; a bank offers 12% a year. Which is cheaper, and by how much?',
      bl: [
        'Step 1 — Put both rates on the same basis: 12% a year = **1% a month**.',
        'Step 2 — Moneylender: 20,000 × 2 ÷ 100 × 6 = **₹2,400**.',
        'Step 3 — Bank: 20,000 × 1 ÷ 100 × 6 = **₹1,200**.',
        'Step 4 — The bank is cheaper by **₹1,200**, but it needs collateral and papers.',
      ],
      v: vCompare,
      n: 'Compare two offers for the same loan. Always put rates on the same basis first. Twelve per cent a year is one per cent a month. The moneylender\'s two per cent a month costs two thousand four hundred rupees over six months; the bank costs one thousand two hundred. The bank is half the price. So why might Kamal still go to the moneylender? Look at the last row of the table.',
    }),
    sl('check', 'Quick check: collateral', {
      b: 'Which of these could a small farmer offer as **collateral** for a bank loan?',
      chk: 'm_collateral_ex',
      n: 'Collateral must be an asset that the lender could sell if the loan is not repaid.',
    }),
    sl('diagram', 'Formal and informal sources of credit', {
      v: vSources,
      n: 'Lenders fall into two groups. Formal sources are banks and cooperatives. They work under rules, are supervised by the Reserve Bank and charge lower interest, but usually want collateral and papers. Informal sources are moneylenders, traders, employers, relatives and friends. Nobody supervises them. They lend quickly and often without papers, but usually at much higher interest, and some use unfair means to recover their money.',
    }),
    sl('concept', 'The Reserve Bank keeps watch', {
      v: vRbi,
      n: 'How does the Reserve Bank supervise formal lenders? It checks that banks keep a minimum part of their deposits as cash. It makes sure banks lend not only to big businesses and traders but also to small farmers, small industries and small borrowers. And banks must report regularly how much they lend, to whom and at what rate. Moneylenders face no such supervision.',
    }),
    sl('two-column', 'Why do the poor still go to moneylenders?', {
      cols: [
        '**What keeps the poor away from banks**\n\n- No land, gold or house to pledge\n- Missing documents\n- No branch nearby; unfamiliar forms\n- Banks see small loans as costly to handle',
        '**What draws them to informal lenders**\n\n- Lender lives nearby and knows them\n- Quick money, few or no papers\n- Flexible collection, even daily\n- But interest is high, and traps are common',
      ],
      n: 'If banks are cheaper, why do poor families still borrow from moneylenders? Look at the left column: they often have no collateral and lack documents, and there may be no bank nearby. Now the right column: the moneylender lives in the village, knows them and lends at once. The convenience is real, but so is the cost. High interest eats into small incomes and can trap the borrower.',
    }),
    sl('check', 'Quick check: Shabnam\'s choice', {
      b: 'A landless labourer borrows from a moneylender instead of a bank. What is the most likely reason?',
      chk: 'm_informal_why',
      n: 'Look back at the two columns. Which barrier would a landless labourer face at a bank?',
    }),
    sl('diagram', 'Who gets cheap credit?', {
      v: vSurvey,
      n: 'This chart is from an imagined district survey, but the pattern is real across India. Better-off households get most of their loans from banks and cooperatives. Poor households get most of theirs from moneylenders, traders and others. So the people who most need cheap credit pay the most for it. That is why expanding formal credit to the poor is so important for fair development.',
    }),
    sl('concept', 'Taking formal credit to everyone', {
      v: vExpand,
      n: 'India has taken several steps. Jan Dhan accounts, opened since twenty fourteen, now number more than fifty crore, many of them for people who never had a bank account before. Banking correspondents take services to villages without branches. Kisan Credit Cards give farmers crop loans on simple terms. Self-help groups borrow without collateral. And the Reserve Bank has made rules for loan apps; borrow only from lenders it regulates.',
    }),
    sl('diagram', 'Self-help groups', {
      v: vShg,
      n: 'A self-help group is a small group, usually of fifteen to twenty women from one neighbourhood. They save a small amount every month and lend from this pool to members who need it. After a year or two of regular saving and repayment, a bank lends to the group, in its name. Members use these loans to buy goats, sewing machines or stock for a shop. This is credit without collateral.',
    }),
    sl('concept', 'Why self-help groups work', {
      v: vShgFeatures,
      n: 'Why does this work so well? The members themselves decide who gets a loan and for what. The group as a whole is responsible for repayment, so no collateral is needed, and members gently push anyone who falls behind. Interest is lower than a moneylender\'s. And the regular meetings become a place to talk about health, nutrition, schooling and other problems women face.',
    }),
    sl('example', 'Worked example 2: an SHG\'s savings', {
      b: 'An imagined group of 18 members saves ₹150 each a month. How much can it build up in a year?',
      bl: [
        'Step 1 — Group saving each month: 18 × 150 = **₹2,700**.',
        'Step 2 — In a year: 2,700 × 12 = **₹32,400**.',
        'Step 3 — Use: about eight loans of ₹4,000 can be given from the pool.',
        'Step 4 — After regular saving, the bank can lend the group several times this amount.',
      ],
      v: vShgCalc,
      n: 'Small savings add up. Eighteen women saving one hundred and fifty rupees each month collect two thousand seven hundred rupees a month, and more than thirty two thousand rupees in a year. That is enough for about eight small loans. Once the group has shown that it saves and repays regularly, a bank can lend it much larger sums.',
    }),
    sl('check', 'Quick check: no collateral', {
      b: 'Why can SHG members borrow without giving collateral?',
      chk: 'm_shg_collateral',
      n: 'Think about who takes responsibility for repaying the loan.',
    }),
    sl('concept', 'Self-help groups and empowerment', {
      b: 'In India, about 10 crore rural women are members of SHGs under the national rural livelihoods mission.',
      v: vEmpower,
      n: 'SHGs do more than lend. Women earn their own income from small enterprises, and escape costly moneylenders. They speak in meetings, keep accounts and deal confidently with bankers. They discuss health, schooling and violence. The idea of lending to the poor through groups was made famous by the Grameen Bank of Bangladesh, whose founder, Muhammad Yunus, shared the Nobel Peace Prize in two thousand six.',
    }),
    sl('example', 'Worked example 3: planning a five-mark comparison', {
      b: '*Distinguish between formal and informal sources of credit.* (5 marks)',
      bl: [
        'Step 1 — Choose five bases: who lends, supervision, interest, collateral and papers, effect.',
        'Step 2 — Write one numbered point per base, naming **both** sources.',
        'Step 3 — Add an example: a bank or cooperative; a moneylender or trader.',
        'Step 4 — Finish with why formal credit should reach the poor, if the question asks.',
      ],
      v: vPlan,
      n: 'This is one of the most common five-mark questions. Plan it as a table in your head: who lends, who supervises, the interest, the need for collateral and papers, and the effect on borrowers. Then write five numbered points, each naming both kinds of source. If the question also asks why formal credit matters, add a line about cheaper loans and fairness for the poor.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Here is Part 2 in brief. Every loan has terms: interest, collateral, documents and repayment. Formal lenders are banks and cooperatives, supervised by the Reserve Bank and cheaper. Informal lenders are unsupervised and costlier, and the poor depend on them most. Self-help groups let poor women save, borrow without collateral and get bank loans, and they build confidence and a voice.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      bl: [
        'Name the **four terms of credit**: interest rate, collateral, documentation, mode of repayment.',
        'Compare rates on the **same basis** (per month or per year) before saying which is cheaper.',
        'RBI supervises **formal** lenders only; moneylenders are **not supervised**.',
        'Why the poor use informal credit: **no collateral, no documents, no bank nearby**.',
        'SHG: **15–20 members**, pooled savings, **group responsibility**, bank loan in the **group\'s name**.',
        'In "evaluate" questions on SHGs, give strengths **and** limits.',
      ],
      n: 'Final tips. Learn the four terms of credit by heart. Before comparing interest rates, convert them to the same basis. Remember that the Reserve Bank supervises formal lenders only. When explaining why the poor borrow informally, lack of collateral and documents is the key. And for SHGs, the phrase examiners look for is group responsibility for repayment, which replaces collateral.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Money and Credit — Notes',
  sections: [
    {
      h: '1. Barter and money as a medium of exchange',
      t: 1,
      b: 'In **barter**, goods are exchanged directly for goods. It works only when there is a **double coincidence of wants**: each party wants what the other has to offer. Because this rarely happens, barter is slow and difficult.\n\n**Money** solves the problem. Everyone accepts it, so a person can sell to anyone for money and buy from anyone with it. Money acts as an **intermediate** in exchange, so it is called a **medium of exchange**.\n\nOver time money has taken many forms: grain, cattle and shells; coins of gold, silver and copper; paper notes; and today bank deposits used through cheques, cards and digital payments.',
      terms: [
        ['Barter', 'Direct exchange of goods for goods, without money.'],
        ['Double coincidence of wants', 'The condition in barter that each party wants what the other has.'],
        ['Medium of exchange', 'Something accepted by all as an intermediate in buying and selling: money.'],
      ],
      v: vBarter,
      vs: [vHistory],
    },
    {
      h: '2. Modern forms of money',
      t: 1,
      b: '**Currency:** paper notes and coins. In India the **Reserve Bank of India issues currency notes on behalf of the central government**; coins are issued by the Government of India. Currency is accepted because it is **authorised by the government**: the rupee is **legal tender**, and no individual in India can legally refuse payment in rupees.\n\n**Demand deposits:** money kept in bank accounts that can be **withdrawn on demand**. Banks pay some interest on them. They can be used for payments without cash:\n- a **cheque** is an instruction to the bank to pay a specific amount from the account to the person named;\n- **debit cards, net banking and UPI** move deposits from one account to another; UPI payments are instant and used even for small purchases.\n\nBecause deposits can be withdrawn on demand and are widely accepted in payment, they share the essential features of money. The RBI is also piloting a **digital rupee (e₹)**, a digital form of currency.',
      terms: [
        ['Currency', 'Paper notes and coins authorised by the government.'],
        ['Legal tender', 'Money that the law requires everyone to accept in payment.'],
        ['Demand deposit', 'A bank deposit that can be withdrawn whenever the depositor asks.'],
        ['Cheque', 'A paper instructing a bank to pay a specific amount from an account to a named person.'],
      ],
      v: vCurrency,
      vs: [vDigital],
    },
    {
      h: '3. Loan activities of banks',
      t: 2,
      b: 'On any day only a small share of depositors withdraw money, so banks keep **a small part of deposits as cash** (as the RBI requires) and use **most of the rest to give loans**.\n\nBanks charge borrowers a **higher rate of interest** than they pay depositors. The **difference** is their main source of income. In this way banks act as a **link between savers and borrowers**, putting idle savings to productive use.',
      terms: [
        ['Interest', 'The extra amount paid by a borrower to a lender, or by a bank to a depositor, usually as a percentage per year.'],
        ['Main income of banks', 'Interest charged on loans minus interest paid on deposits.'],
      ],
      v: vBankLoans,
      vs: [vMargin],
    },
    {
      h: '4. Credit: two situations',
      t: 2,
      b: '**Credit (loan)** is an agreement in which a lender supplies money, goods or services to a borrower in return for a **promise of future payment**.\n\n- **Credit that helps:** a producer borrows for raw materials or tools, production and sales rise, the loan is repaid from higher earnings, and the borrower is **better off**.\n- **Credit that hurts:** income fails (crop failure, illness, lost orders), the borrower cannot repay, takes new loans or sells land, cattle or gold, and ends **worse off**: a **debt trap**.\n\nWhether credit helps depends on the **risk** in the activity and the **terms** of the loan, and on whether there is support when income fails.',
      terms: [
        ['Credit', 'An agreement to receive money, goods or services now against a promise of future payment.'],
        ['Debt trap', 'A situation in which a borrower cannot repay and is pushed into more debt or loss of assets.'],
      ],
      v: vTrap,
      vs: [vTwoStories],
    },
    {
      h: '5. Terms of credit',
      t: 3,
      b: 'The **terms of credit** are the conditions of a loan:\n1. **Interest rate**: the extra paid on top of the principal.\n2. **Collateral**: an asset the borrower owns and pledges as a guarantee (land, a building, a vehicle, livestock, gold, bank deposits). If the loan is not repaid, the lender may sell it.\n3. **Documentation**: papers such as identity proof, land records and income records.\n4. **Mode of repayment**: instalments or a lump sum, and when.\n\nTerms vary widely between lenders. To compare costs, convert interest rates to the **same basis**: 2% a month is 24% a year.',
      terms: [
        ['Terms of credit', 'Interest rate, collateral, documentation and mode of repayment of a loan.'],
        ['Collateral', 'An asset pledged by a borrower as a guarantee until the loan is repaid.'],
      ],
      v: vTerms,
      vs: [vCompare],
    },
    {
      h: '6. Formal and informal sources of credit',
      t: 3,
      b: '**Formal sources:** banks and cooperatives. **Informal sources:** moneylenders, traders, employers, relatives and friends.\n\n**Role of the RBI:** it supervises formal lenders. It checks that banks keep a **minimum cash balance**; it sees that banks lend not only to profit-making businesses and traders but also to **small cultivators, small-scale industries and small borrowers**; and banks must **report** periodically how much they lend, to whom and at what rate.\n\n**Informal lenders** are not supervised by anyone. They can charge very high interest and sometimes use unfair means to recover loans. High-cost credit takes a large share of the borrower\'s income, can cause **debt traps**, and discourages people from starting enterprises.\n\n**The gap:** better-off households get most of their loans from formal sources, while the poor depend largely on informal ones, because they lack collateral and documents and banks may be far away. **Cheap, affordable credit** is crucial for development, so formal credit must expand, especially in rural areas, and reach the poor. Steps include Jan Dhan accounts, banking correspondents, Kisan Credit Cards, SHG–bank linkage and RBI rules for digital lending.',
      terms: [
        ['Formal sources of credit', 'Banks and cooperatives, which work under rules supervised by the RBI.'],
        ['Informal sources of credit', 'Moneylenders, traders, employers, relatives and friends, who are not supervised.'],
      ],
      v: vSources,
      vs: [vRbi, vSurvey],
    },
    {
      h: '7. Self-help groups for the poor',
      t: 4,
      b: 'A **self-help group (SHG)** has typically **15–20 members**, usually poor women from one locality, who **pool their savings** regularly. The group lends small amounts to members at reasonable interest. After a year or two of regular saving, the group becomes eligible for a **bank loan in its name**, used to create **self-employment**: livestock, tailoring, small shops, processing units.\n\n- Members take **most decisions** on savings and loans: purpose, amount, interest, repayment.\n- The **group is responsible** for repayment, so **no collateral** is needed; members follow up anyone who does not repay.\n- SHGs free members from **moneylenders**, give them their **own income**, and build **confidence**; meetings are a platform for health, nutrition and violence.\n\nThe idea of lending to the poor through groups was made famous by the **Grameen Bank of Bangladesh**, founded by Muhammad Yunus (Nobel Peace Prize 2006). In India, about 10 crore rural women are SHG members under the national rural livelihoods mission.',
      terms: [
        ['Self-help group', 'A small group of rural poor, mostly women, who save together and lend to members.'],
        ['SHG–bank linkage', 'Bank loans given to an SHG in the group\'s name, without collateral.'],
      ],
      v: vShg,
      vs: [vShgFeatures],
    },
  ],
  tips: '**Common mistakes**\n- Saying currency is accepted because it is backed by gold: it is accepted because the **government authorises** it.\n- Forgetting that **demand deposits** are also money.\n- Saying the RBI supervises moneylenders: it supervises **formal** lenders only.\n- Comparing interest rates on different bases (per month vs per year).\n- Writing that SHG members must give collateral: **group responsibility** replaces it.\n- Giving only the good side (or only the bad side) of credit.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points, or a definition plus an example (about 40 words).\n- 3 marks: three distinct points (about 60 words); in comparisons, state both sides.\n- 5 marks: five numbered points (about 120 words); data questions quote figures, then explain reasons and consequences.\n\n**Data in SOYL practice** are imagined but realistic; your board paper will give its own table. Compare every row before you write.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **barter**?', 'Direct exchange of goods for goods, without money.', 'definition', 1],
  ['**Double coincidence of wants**', 'Each party wants what the other has to offer; needed for barter.', 'definition', 1],
  ['Why is money a **medium of exchange**?', 'It is accepted by all as an intermediate in buying and selling.', 'concept', 1],
  ['Who issues currency notes in India?', 'The **Reserve Bank of India**, on behalf of the central government.', 'fact', 1],
  ['Why is the rupee accepted by everyone?', 'It is **authorised by the government** (legal tender); no one can legally refuse it.', 'concept', 1],
  ['**Demand deposit**', 'A bank deposit that can be **withdrawn on demand** and used for payments.', 'definition', 1],
  ['Why are demand deposits money?', 'Withdrawable on demand and widely accepted in payment (cheque, card, UPI).', 'concept', 1],
  ['**Cheque**', 'An instruction to a bank to pay a specific amount from an account to a named person.', 'definition', 1],
  ['What moves when you pay by **UPI**?', 'Demand deposits, instantly, from your bank account to the seller\'s.', 'concept', 1],
  ['Early forms of money', 'Grain, cattle, shells; later gold, silver and copper coins.', 'fact', 1],
  ['Why do banks keep only a little cash?', 'Only a few depositors withdraw on any day; the rest is lent.', 'concept', 2],
  ['Main income of banks', 'Interest on loans **minus** interest on deposits.', 'concept', 2],
  ['**Credit**', 'Money, goods or services now, against a **promise of future payment**.', 'definition', 2],
  ['When does credit help?', 'When the borrower\'s activity earns enough to repay; e.g. a festival-season producer.', 'example', 2],
  ['**Debt trap**', 'Borrower cannot repay, borrows again or sells assets, and ends worse off.', 'definition', 2],
  ['What decides whether credit helps or hurts?', 'The **risk** in the activity, the **terms** of the loan, and support if income fails.', 'exam-tip', 2],
  ['Four **terms of credit**', 'Interest rate, collateral, documentation, mode of repayment.', 'fact', 3],
  ['**Collateral**', 'An asset pledged as a guarantee until the loan is repaid (land, gold, vehicle).', 'definition', 3],
  ['2% a month as a yearly rate', '**24%** a year (simple interest).', 'example', 3],
  ['**Formal** sources of credit', 'Banks and cooperatives (supervised by the RBI).', 'fact', 3],
  ['**Informal** sources of credit', 'Moneylenders, traders, employers, relatives, friends (unsupervised).', 'fact', 3],
  ['Three ways the RBI supervises banks', 'Minimum cash balance; lending to small borrowers; regular reports on lending.', 'concept', 3],
  ['Why do the poor depend on informal credit?', 'No collateral, no documents, no bank nearby; the lender knows them.', 'concept', 3],
  ['Why is **cheap credit** important?', 'More people can invest and earn; less income goes to repaying loans.', 'concept', 3],
  ['Steps that widen formal credit', 'Jan Dhan accounts, banking correspondents, Kisan Credit Cards, SHG–bank linkage.', 'fact', 3],
  ['**Self-help group**', 'About **15–20** members, mostly women, who pool savings and lend to members.', 'definition', 4],
  ['How do SHGs replace collateral?', '**Group responsibility** for repayment; members follow up defaulters.', 'concept', 4],
  ['When does an SHG get a bank loan?', 'After a year or two of regular saving; the loan is in the **group\'s name**.', 'fact', 4],
  ['Who decides on SHG loans?', 'The **members** themselves.', 'fact', 4],
  ['Non-credit benefits of SHGs', 'Confidence, voice, discussion of health, nutrition and violence.', 'concept', 4],
  ['Grameen Bank', 'Bangladesh; Muhammad Yunus; Nobel Peace Prize 2006.', 'fact', 4],
  ['SHG savings: 18 members × ₹150 a month for a year', '18 × 150 × 12 = **₹32,400**.', 'example', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-social-science-chapter-test-short',
  title: 'Chapter test (short) — Money and Credit',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_medium', 'm_credit_def', 'm_formal', 'ar_shg'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_terms', 's_shg_work', 's3_debt_trap'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_formal_informal', 'l_money'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_shg_meeting'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-social-science-chapter-test-long',
  title: 'Chapter test (long) — Money and Credit',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dcw', 'm_issuer', 'm_legal_tender', 'm_bank_income', 'm_risk', 'm_rbi_role', 'm_cheap_credit', 'm_shg_bank', 'ar_deposits_loans', 'ar_rbi_informal'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words. Questions 13 and 15 have an internal choice.', items: ['s_dcw', 's_poor_informal', { attempt: 1, keys: ['s_banks_loans', 's_shg_collateral'] }, 's3_formal_informal', { attempt: 1, keys: ['s3_shg_women', 's3_expand_formal'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer the data-based question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_data_loans', { attempt: 1, keys: ['l_shg', 'l_credit'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_diary', 'sb_upi'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-10-social-science-ch20 only (money and its modern forms; banks and two credit situations; terms of credit, formal and informal sources, RBI; self-help groups)',
    originality: 'every scenario, table and source written for this chapter (imagined people, places, loans and rates); no NCERT story, table or exercise reused',
    data: 'interest worked in plain arithmetic and recomputed by the build: 20,000 at 2% a month for 6 months = 2,400, at 1% = 1,200; 50,000 at 36% = 18,000 and at 9% = 4,500; bank gaps 5 − 3.6 = 1.4, 4.8 − 2.5 = 2.3, 44 − 25 = 19; SHG pools 15 × 200 × 12 = 36,000 and 18 × 150 × 12 = 32,400; SHG ledger totals 1,10,000',
    facts: 'RBI issues notes for the central government; coins by the Government of India; legal tender; UPI; digital rupee pilot; Jan Dhan (over 50 crore accounts); Kisan Credit Cards; SHG size 15–20; Grameen Bank and the 2006 Nobel Peace Prize',
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
