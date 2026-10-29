// Build CBSE 12 Economics ch02 Money and Banking. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch02', 'economics-commerce');
const { inr, creation, rounds } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
const WE = { d: 10000, r: 0.2 }; // deck worked example: deposit 10,000, LRR 20 per cent
const WEc = creation(WE.d, WE.r);
const WEr = rounds(WE.d, WE.r, 5);
const M1x = { cur: 3200, dd: 4650, od: 15 }; // worked example M1 (₹ crore, imagined)
const M1v = M1x.cur + M1x.dd + M1x.od;
const LX = { dep: 800, crr: 0.04, slr: 0.18 }; // worked example: funds left to lend
const LXcrr = LX.dep * LX.crr, LXslr = LX.dep * LX.slr, LXlend = LX.dep - LXcrr - LXslr;
const MG = { value: 1000000, m1: 0.25, m2: 0.4 }; // margin example
const MGl1 = MG.value * (1 - MG.m1), MGl2 = MG.value * (1 - MG.m2);
if (WEc.total !== 50000 || WEc.credit !== 40000 || M1v !== 7865 || LXlend !== 624 || MGl1 !== 750000 || MGl2 !== 600000) throw new Error('figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Barter and its problems', 'Money and its functions', 'Money supply (M1)', 'Banks and reserves', 'Deposit creation', 'The money multiplier'], 'Route map of Part 1: barter and its problems, money and its functions, money supply, banks and reserves, deposit creation and the money multiplier', 'Part 1 at a glance');
const vBarter = table(
  ['Problem of barter', 'What goes wrong (imagined example)', 'How money solves it'],
  [
    ['No double coincidence of wants', 'A potter wants rice; the rice farmer wants cloth', 'Sell pots for money, buy rice with money'],
    ['No common measure of value', 'How many kilos of rice is one goat worth?', 'Every good gets a price in rupees'],
    ['Indivisibility of goods', 'A cow cannot be split to buy a pair of sandals', 'Money comes in small units'],
    ['Difficulty of storing value', 'Fish and grain rot; cattle need feed', 'Money keeps value and is easy to keep'],
    ['No standard for future payments', 'Repay a loan in grain of what quality?', 'Debts are stated in rupees'],
  ],
  'Table of five problems of barter with an imagined example and how money solves each: double coincidence, a common measure of value, indivisibility, storing value and future payments',
);
const vEvolution = flow('LR', ['Commodity money (grain, cattle, shells)', 'Metallic coins', 'Paper currency (fiat money)', 'Bank deposits (cheques)', 'Digital payments (cards, UPI)'], 'Flow of how money evolved: commodity money, metallic coins, paper currency, bank deposits and digital payments', 'Money keeps changing its form; its functions stay the same');
const vFunctions = table(
  ['Function', 'Type', 'What it means'],
  [
    ['Medium of exchange', 'Primary', 'Accepted in every sale and purchase'],
    ['Unit of account (measure of value)', 'Primary', 'All values stated in one unit, the rupee'],
    ['Store of value', 'Secondary', 'Lets people save purchasing power for later'],
    ['Standard of deferred payment', 'Secondary', 'Future payments such as loan instalments stated in money'],
  ],
  'Table of the four functions of money: medium of exchange and unit of account are primary; store of value and standard of deferred payment are secondary',
);
const vFnExample = table(
  ['Situation (imagined)', 'Function'],
  [
    ['A mobile shop labels a phone ₹12,000 and a cover ₹300', 'Unit of account'],
    ['A tea grower in Assam is paid in rupees and buys rice with them', 'Medium of exchange'],
    ['A bus conductor saves for a scooter next year', 'Store of value'],
    ['A shop sells a fridge on 10 monthly instalments', 'Standard of deferred payment'],
  ],
  'Table pairing four imagined situations with the function of money each shows: price labels are unit of account, wages spent on rice are medium of exchange, saving for a scooter is store of value, instalments are deferred payment',
  'Ask: is money being used to exchange, to measure, to save, or to settle a future payment?',
);
const vLegal = table(
  ['Form of money', 'Issued or held by', 'Legal tender?'],
  [
    ['Currency notes (₹10 and above)', 'Reserve Bank of India', 'Yes'],
    ['One-rupee notes and coins', 'Government of India', 'Yes'],
    ['Demand deposits (cheques, digital transfers)', 'Commercial banks', 'No: accepted because people trust banks'],
  ],
  'Table: currency notes are issued by the RBI and are legal tender; one-rupee notes and coins are issued by the Government of India and are legal tender; demand deposits are held with commercial banks and are not legal tender',
);
// M1 diagram: what is inside and outside the money supply.
const vM1 = (() => {
  const s = new Svg(640, 300);
  s.rect(20, 20, 380, 260, { color: 'accent', sw: 2 });
  s.text(210, 42, 'Money supply M1 (held by the public)', { bold: true, size: 15, color: 'accent' });
  s.rect(40, 62, 340, 56, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(210, 90, 'Currency held by the public (notes + coins)', { size: 14 });
  s.rect(40, 130, 340, 56, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(210, 158, 'Net demand deposits of commercial banks', { size: 14 });
  s.rect(40, 198, 340, 56, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(210, 226, 'Other deposits with the RBI (small)', { size: 14 });
  s.rect(420, 62, 200, 192, { color: 'muted', sw: 1.5, dash: true });
  s.text(520, 84, 'Not counted', { bold: true, color: 'muted' });
  s.text(520, 124, 'Cash in bank vaults', { size: 13 });
  s.text(520, 160, 'Cash of the government', { size: 13 });
  s.text(520, 196, 'Time (fixed) deposits', { size: 13 });
  s.text(520, 222, '(these enter broader', { size: 12, muted: true });
  s.text(520, 238, 'measures only)', { size: 12, muted: true });
  return s.visual('Diagram of the narrow money supply M1: inside the box, currency held by the public, net demand deposits of commercial banks and other deposits with the RBI; outside and not counted, cash in bank vaults, cash of the government, and time deposits, which enter only broader measures', 'M1 = currency with the public + net demand deposits + other deposits with the RBI');
})();
const vM1Example = table(
  ['Item (imagined economy, ₹ crore)', 'Amount', 'In M1?'],
  [
    ['Currency held by the public', inr(M1x.cur), 'Yes'],
    ['Net demand deposits of commercial banks', inr(M1x.dd), 'Yes'],
    ['Other deposits with the central bank', inr(M1x.od), 'Yes'],
    ['Cash in the vaults of banks', '610', 'No'],
    ['Fixed deposits of households', '9,100', 'No (not in M1)'],
    ['**M1**', `**${inr(M1v)}**`, ''],
  ],
  `Table of an imagined economy: currency with the public ${inr(M1x.cur)}, net demand deposits ${inr(M1x.dd)} and other deposits ${inr(M1x.od)} crore are in M1; bank vault cash 610 and fixed deposits 9,100 are not; M1 is ${inr(M1v)} crore`,
  'Imagined figures.',
);
const vBanks = flow('LR', ['Households and firms deposit savings', 'Bank keeps the required reserve', 'Bank lends the rest', 'Borrowers spend; sellers deposit the money', 'New deposits in banks'], 'Flow of a commercial bank\'s work: deposits come in, the required reserve is kept, the rest is lent, borrowers spend and the money returns as new deposits', 'Loans come back as deposits', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n2' },
]);
const vReserve = table(
  ['Reserve', 'Kept where', 'In what form'],
  [
    ['Cash reserve ratio (CRR)', 'With the RBI', 'Cash balance'],
    ['Statutory liquidity ratio (SLR)', 'With the bank itself', 'Liquid assets: cash, gold, approved government securities'],
  ],
  'Table of the two legal reserves: the cash reserve ratio is kept with the RBI as a cash balance; the statutory liquidity ratio is kept by the bank itself in cash, gold or approved government securities',
  'Together they make up the legal reserve ratio (LRR) used in the money multiplier.',
);
const vRounds = table(
  ['Round', 'Deposit (₹)', 'Reserve at 20% (₹)', 'Loan (₹)'],
  [
    ...WEr.map(([i, d, r, l]) => [String(i), inr(d), inr(r), inr(l)]),
    ['…', '…', '…', '…'],
    ['**Total**', `**${inr(WEc.total)}**`, `**${inr(WEc.reserves)}**`, `**${inr(WEc.credit)}**`],
  ],
  `Table of deposit creation with an initial deposit of 10,000 rupees and a 20 per cent reserve ratio: deposits of 10,000, 8,000, 6,400, 5,120 and 4,096 in the first five rounds; at the end total deposits are ${inr(WEc.total)}, reserves ${inr(WEc.reserves)} and loans ${inr(WEc.credit)}`,
  'Every row: reserve = 20% of the deposit; loan = deposit − reserve; the loan becomes the next deposit.',
);
const vRoundBars = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 7, y0: 0, y1: 11000, left: 70, top: 30, width: 440, height: 220, xLabel: 'Round', yLabel: 'Deposit (₹)' });
  for (const [i, d, r] of rounds(WE.d, WE.r, 6)) {
    const x0 = ch.X(i - 0.35), x1 = ch.X(i + 0.35);
    s.rect(x0, ch.Y(d), x1 - x0, ch.Y(0) - ch.Y(d), { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
    s.rect(x0, ch.Y(r), x1 - x0, ch.Y(0) - ch.Y(r), { fill: 'accent', color: 'accent', sw: 1, rx: 2 });
    ch.xTick(i, String(i));
  }
  for (const v of [2000, 4000, 6000, 8000, 10000]) ch.yTick(v, inr(v));
  s.rect(370, 40, 14, 14, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
  s.text(390, 47, 'Deposit', { anchor: 'start', size: 13 });
  s.rect(370, 64, 14, 14, { fill: 'accent', color: 'accent', sw: 1, rx: 2 });
  s.text(390, 71, 'Reserve kept (20%)', { anchor: 'start', size: 13 });
  return s.visual('Bar chart of the first six rounds of deposit creation with a 20 per cent reserve ratio: deposits fall from 10,000 to 8,000, 6,400, 5,120, 4,096 and about 3,277 rupees, and the reserve kept is one-fifth of each bar', 'Each round is 80% of the one before; the bars shrink towards zero.');
})();
const vCreationSteps = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Money multiplier', '1 ÷ LRR = 1 ÷ 0.2', String(WEc.m)],
    ['2. Total deposits', `${inr(WE.d)} × ${WEc.m}`, `₹${inr(WEc.total)}`],
    ['3. Credit created', `${inr(WEc.total)} − ${inr(WE.d)}`, `₹${inr(WEc.credit)}`],
    ['4. Check', `20% of ${inr(WEc.total)}`, `₹${inr(WEc.reserves)} = the initial deposit`],
  ],
  `Table of the worked example: multiplier 1 divided by 0.2 equals 5; total deposits 10,000 times 5 equals ${inr(WEc.total)}; credit created ${inr(WEc.total)} minus 10,000 equals ${inr(WEc.credit)}; check, 20 per cent of total deposits equals the initial deposit`,
);
const vMultPlot = {
  kind: 'plot',
  spec: {
    x: { min: 0, max: 0.5, label: 'Legal reserve ratio (as a fraction)' },
    y: { min: 0, max: 22, label: 'Money multiplier' },
    functions: [{ expr: '1/x', label: 'multiplier = 1 ÷ LRR', domain: [0.05, 0.5] }],
    points: [
      { at: [0.1, 10], label: '10% → 10' },
      { at: [0.2, 5], label: '20% → 5' },
      { at: [0.25, 4], label: '25% → 4' },
    ],
    series: [],
    grid: true,
  },
  alt: 'Curve of the money multiplier against the legal reserve ratio: as the ratio rises from 0.05 to 0.5 the multiplier falls from 20 to 2; marked points show a 10 per cent ratio giving 10, 20 per cent giving 5 and 25 per cent giving 4',
  caption: 'Higher reserve ratio → smaller multiplier → less credit.',
};
const vLeaks = flow('TB', ['Formula gives the maximum: deposit × 1 ÷ LRR', 'People keep some cash (cash drain)', 'Banks keep extra reserves', 'Few willing, creditworthy borrowers', 'Actual deposit creation is smaller'], 'Flow from the formula maximum through three leakages, cash drain, extra reserves and few willing borrowers, to a smaller actual deposit creation', 'Why real banks create less', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Barter', 'Needs double coincidence of wants; no common measure'],
    ['Functions', 'Medium of exchange, unit of account, store of value, deferred payment'],
    ['M1', 'Currency with public + net demand deposits + other deposits with RBI'],
    ['LRR', 'CRR (with RBI) + SLR (with the bank)'],
    ['Multiplier', '1 ÷ LRR; total deposits = initial deposit × multiplier'],
    ['Credit created', 'Total deposits − initial deposit'],
  ],
  'Summary table of Part 1: barter problems, four functions, the components of M1, the legal reserve ratio, the money multiplier and credit created',
);

const vRoute2 = flow('LR', ['What a central bank is', 'Functions of the RBI', 'Policy rates: repo, reverse repo, bank rate', 'Reserve ratios: CRR, SLR', 'Open market operations', 'Margin requirements'], 'Route map of Part 2: what a central bank is, functions of the RBI, policy rates, reserve ratios, open market operations and margin requirements', 'Part 2 at a glance');
const vCentralVsCommercial = table(
  ['', 'Central bank (RBI)', 'Commercial bank'],
  [
    ['Number', 'One for the country', 'Many'],
    ['Aim', 'Monetary and financial stability (public interest)', 'Profit'],
    ['Deals with', 'Government and banks', 'The public'],
    ['Issues currency?', 'Yes (notes except one-rupee notes)', 'No'],
  ],
  'Table comparing the central bank with commercial banks: one versus many, public interest versus profit, deals with government and banks versus the public, and only the central bank issues currency',
);
const vRbiFunctions = flow('TB', ['Reserve Bank of India', 'Bank of issue', 'Banker to the government', 'Bankers\' bank and supervisor', 'Lender of last resort', 'Controller of credit', 'Custodian of foreign exchange reserves'], 'Diagram of the RBI with six functions branching from it: bank of issue, banker to the government, bankers\' bank and supervisor, lender of last resort, controller of credit, and custodian of foreign exchange reserves', 'Six functions of the RBI', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }, { from: 'n1', to: 'n6' }, { from: 'n1', to: 'n7' },
]);
const vLastResort = flow('LR', ['Rumour: depositors rush to withdraw from a sound bank', 'Bank runs short of cash', 'RBI lends against eligible securities', 'Withdrawals are paid; panic fades'], 'Flow: a rumour causes a rush of withdrawals, the bank runs short of cash, the RBI lends against eligible securities, withdrawals are paid and panic fades', 'Lender of last resort (imagined case)');
const vToolTypes = table(
  ['Quantitative (general) instruments', 'Qualitative (selective) instruments'],
  [
    ['Repo rate and reverse repo rate', 'Margin requirements'],
    ['Bank rate', 'Moral suasion (persuading banks)'],
    ['Cash reserve ratio and statutory liquidity ratio', 'Credit limits for particular uses'],
    ['Open market operations', ''],
  ],
  'Table of credit-control instruments: quantitative ones are the repo and reverse repo rates, bank rate, CRR and SLR, and open market operations; qualitative ones are margin requirements, moral suasion and credit limits for particular uses',
  'Quantitative tools change the total volume of credit; qualitative tools steer credit between uses.',
);
const vRepo = (() => {
  const s = new Svg(600, 260);
  s.rect(20, 80, 170, 100, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(105, 120, 'Reserve Bank', { bold: true });
  s.text(105, 142, 'of India', { bold: true });
  s.rect(410, 80, 170, 100, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(495, 120, 'Commercial', { bold: true });
  s.text(495, 142, 'banks', { bold: true });
  s.arrow(195, 105, 405, 105, { color: 'accent', sw: 2.5 });
  s.text(300, 60, 'Repo: RBI lends to banks', { size: 14, color: 'accent', bold: true });
  s.text(300, 82, '(against government securities)', { size: 12 });
  s.arrow(405, 160, 195, 160, { color: 'muted', sw: 2.5 });
  s.text(300, 192, 'Reverse repo: banks park surplus', { size: 14, bold: true });
  s.text(300, 214, 'funds with the RBI (RBI borrows)', { size: 14, bold: true });
  s.text(300, 244, 'Raising either rate tightens credit', { size: 13, muted: true });
  return s.visual('Diagram with the Reserve Bank of India on the left and commercial banks on the right: an upper arrow from the RBI to banks is labelled repo, the RBI lends to banks against government securities; a lower arrow from banks to the RBI is labelled reverse repo, banks park surplus funds with the RBI; raising either rate tightens credit', 'Who lends to whom');
})();
const vTransmission = flow('LR', ['RBI raises the repo rate', 'Banks\' cost of funds rises', 'Banks raise lending rates (home, car, business loans)', 'Borrowing and spending fall', 'Aggregate demand falls; price pressure eases'], 'Flow of how a repo rate rise reaches the economy: the RBI raises the repo rate, banks\' cost of funds rises, banks raise lending rates, borrowing and spending fall, aggregate demand falls and price pressure eases', 'From the policy rate to prices');
const vRates = table(
  ['Instrument', 'What it is', 'Raised →'],
  [
    ['Bank rate', 'Rate at which the RBI lends to banks for longer periods, without a repurchase deal', 'Loans costlier, credit falls'],
    ['Cash reserve ratio', 'Share of deposits kept as cash with the RBI', 'Less to lend, multiplier falls'],
    ['Statutory liquidity ratio', 'Share of deposits kept by banks in liquid assets', 'Less to lend'],
  ],
  'Table of three instruments: the bank rate is the RBI lending rate for longer periods; the cash reserve ratio is cash kept with the RBI; the statutory liquidity ratio is liquid assets kept by banks; raising any of them reduces credit',
);
const vLendable = table(
  ['Step (imagined bank, ₹ crore)', 'Working', 'Amount'],
  [
    ['Deposits', '', String(LX.dep)],
    ['CRR at 4%', `4% of ${LX.dep}`, String(LXcrr)],
    ['SLR at 18%', `18% of ${LX.dep}`, String(LXslr)],
    ['**Left to lend**', `${LX.dep} − ${LXcrr} − ${LXslr}`, `**${LXlend}**`],
  ],
  `Table for an imagined bank with deposits of ${LX.dep} crore rupees: CRR at 4 per cent is ${LXcrr}, SLR at 18 per cent is ${LXslr}, leaving ${LXlend} crore to lend`,
  'Imagined ratios and figures; both ratios treated as shares of deposits (a simplification).',
);
const vOmo = flow('TB', ['Open market operations', 'RBI buys government securities', 'RBI pays banks and the public: reserves rise', 'More lending, money supply rises', 'RBI sells government securities', 'Buyers pay the RBI: reserves fall', 'Less lending, money supply falls'], 'Diagram of open market operations: when the RBI buys securities it pays banks and the public, reserves rise and money supply rises; when it sells securities buyers pay the RBI, reserves fall and money supply falls', 'Buy to inject money, sell to absorb it', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n1', to: 'n5' }, { from: 'n5', to: 'n6' }, { from: 'n6', to: 'n7' },
]);
const vMargin = table(
  ['Security offered (imagined)', 'Margin', 'Maximum loan'],
  [
    [`Shares worth ₹${inr(MG.value)}`, '25%', `₹${inr(MGl1)}`],
    [`Shares worth ₹${inr(MG.value)}`, '40%', `₹${inr(MGl2)}`],
  ],
  `Table: against shares worth ${inr(MG.value)} rupees, a 25 per cent margin allows a loan of ${inr(MGl1)}, and a 40 per cent margin allows only ${inr(MGl2)}`,
  'Higher margin → smaller loan against the same security.',
);
const vToolkit = table(
  ['Instrument', 'Excess demand (inflation)', 'Deficient demand (slowdown)'],
  [
    ['Repo rate / bank rate', 'Raise', 'Lower'],
    ['Reverse repo rate', 'Raise', 'Lower'],
    ['CRR and SLR', 'Raise', 'Lower'],
    ['Open market operations', 'Sell securities', 'Buy securities'],
    ['Margin requirement', 'Raise', 'Lower'],
  ],
  'Table of the central bank\'s toolkit: for excess demand raise the repo and bank rates, reverse repo, CRR and SLR, sell securities and raise margins; for deficient demand do the opposite',
  'Excess demand: make credit dearer and scarcer. Deficient demand: make it cheaper and plentiful.',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Central bank', 'Apex bank; public interest, not profit'],
    ['Functions', 'Issue of notes, government\'s banker, bankers\' bank, lender of last resort, credit control, forex custodian'],
    ['Repo / reverse repo', 'RBI lends to banks / RBI borrows from banks'],
    ['CRR / SLR', 'Cash with RBI / liquid assets with the bank'],
    ['OMO', 'Buy → money in; sell → money out'],
    ['Margin', 'Selective tool: higher margin → smaller loan'],
  ],
  'Summary table of Part 2: the central bank, its functions, repo and reverse repo, CRR and SLR, open market operations and margins',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Money and Banking — Part 1: Money, Money Supply and Deposit Creation',
  goals: [
    'Explain the problems of barter and the four functions of money',
    'Identify the components of the money supply (M1) and calculate it from data',
    'Explain how commercial banks create deposits and calculate total deposits and credit with the money multiplier',
    'Explain why actual deposit creation is smaller than the formula suggests',
  ],
  slides: [
    sl('title', 'Money and Banking', {
      b: 'Part 1 — **barter**, the **functions of money**, the **money supply** and how **banks create money**.',
      v: vRoute1,
      n: 'Namaste! Every day you pay for a bus ride, a snack or a phone recharge without thinking twice. But where does money come from, and how much of it is there? In this part we see why money replaced barter, what money does for us, how the money supply is measured, and a surprising fact: ordinary commercial banks create most of the money we use.',
    }),
    sl('concept', 'Life without money: barter', {
      b: 'Under **barter**, goods are exchanged directly for goods. It breaks down as soon as an economy grows.',
      v: vBarter,
      n: 'Imagine a village where a potter must swap pots for rice. He has to find a farmer who wants pots at the very moment he wants rice. That is the problem of double coincidence of wants. There is also no common measure of value, goods like cows cannot be divided, food rots if you try to save it, and loans in grain cause endless disputes. Money removes every one of these problems.',
    }),
    sl('check', 'Quick check: spot the barter problem', {
      b: 'A potter wants rice, but the rice farmer wants cloth. Which drawback of barter is this?',
      chk: 'm_barter_dcw',
      n: 'Read the situation carefully. Ask yourself what exactly stops the exchange from happening. Is it about measuring value, storing value, or about wants not matching?',
    }),
    sl('concept', 'What is money?', {
      b: '**Money** is anything that is **generally accepted** as a medium of exchange and a measure of value.',
      bl: ['Its form has changed over time; its **functions** have not.', 'Today most money is **paper currency** and **bank deposits** moved by cheques, cards and UPI.'],
      v: vEvolution,
      n: 'Money is anything that people generally accept in payment and use to measure value. Over history, people used grain, cattle and shells, then metal coins, then paper notes. Today most payments move bank deposits, by cheque, card or a mobile app. The form has changed again and again, but the jobs money does have stayed the same. Let us look at those jobs.',
    }),
    sl('diagram', 'The four functions of money', {
      v: vFunctions,
      n: 'Money has two primary functions. It is a medium of exchange, accepted in every sale and purchase, and a unit of account, so that all prices are stated in rupees. It also has two secondary functions. It is a store of value, letting us save purchasing power, and a standard of deferred payment, so that loans and instalments can be stated in money.',
    }),
    sl('example', 'Worked example 1: which function is at work?', {
      b: 'Identify the function of money in each imagined situation.',
      bl: [
        'Step 1 — Is money **changing hands** in a sale and a purchase? Medium of exchange.',
        'Step 2 — Is money only **measuring or comparing** values? Unit of account.',
        'Step 3 — Is money being **kept for later**? Store of value.',
        'Step 4 — Is a payment **fixed now but made later**? Standard of deferred payment.',
      ],
      v: vFnExample,
      n: 'Here are four situations. A price label on a phone and a cover only measures value, so that is the unit of account. A tea grower paid in rupees who buys rice is using money as a medium of exchange. A conductor saving for a scooter is using it as a store of value. Ten monthly instalments for a fridge use money as a standard of deferred payment.',
    }),
    sl('concept', 'Legal tender and fiat money', {
      b: 'Currency is **legal tender**: by law it cannot be refused in payment. It is also **fiat money**: its value comes from the government\'s order, not from the paper.',
      v: vLegal,
      n: 'Currency notes are legal tender, which means nobody in the country can refuse them for settling a payment. They are also fiat money: a note is valuable because the government declares it so, not because of the paper. The RBI issues all notes except one-rupee notes, which, like coins, are issued by the Government of India. Bank deposits are not legal tender; a cheque can be refused.',
    }),
    sl('diagram', 'The money supply: M1', {
      b: '**Money supply** = the total stock of money **held by the public** at a point of time.',
      v: vM1,
      n: 'The money supply is the stock of money held by the public at a point of time, so it is a stock, not a flow. The narrow measure, called M one, has three parts: currency with the public, net demand deposits of commercial banks, and a small item called other deposits with the RBI. Cash in bank vaults and government cash are left out, because they are not held by the public.',
    }),
    sl('example', 'Worked example 2: calculating M1', {
      b: 'An imagined economy reports these items (₹ crore). Find M1.',
      bl: [
        'Step 1 — Keep only money **held by the public**: currency, net demand deposits, other deposits with the central bank.',
        'Step 2 — Leave out **bank vault cash** and **fixed deposits**.',
        `Step 3 — M1 = ${inr(M1x.cur)} + ${inr(M1x.dd)} + ${inr(M1x.od)} = **₹${inr(M1v)} crore**.`,
      ],
      v: vM1Example,
      n: 'Exam questions often add items that do not belong, to test you. Here, bank vault cash is excluded because it is not with the public, and fixed deposits are excluded because they are not part of the narrow measure. Add only currency with the public, net demand deposits and other deposits. The answer is 7,865 crore rupees.',
    }),
    sl('check', 'Quick check: calculate M1', {
      b: 'Use the three components of M1 on the data given in the question.',
      chk: 'num_m1',
      n: 'Pick out the three components, add them, and make sure you have not included anything held by banks themselves.',
    }),
    sl('concept', 'What commercial banks do', {
      b: 'A **commercial bank** accepts deposits and gives loans; the gap between lending and deposit rates is its income.',
      bl: ['Banks know that depositors do not all withdraw at once.', 'So they keep only a **fraction** of deposits as reserves and **lend the rest**.'],
      v: vBanks,
      n: 'A commercial bank does two main things: it accepts deposits and it gives loans. Banks know from experience that depositors never all withdraw at the same time. So they keep only a fraction of deposits as reserves and lend out the rest. When a borrower spends the loan, the seller deposits the money in some bank, and the cycle starts again.',
    }),
    sl('concept', 'The legal reserve ratio', {
      b: 'The central bank fixes the **minimum** share of deposits banks must keep as reserves: the **legal reserve ratio (LRR)**.',
      v: vReserve,
      n: 'How much must a bank keep? The central bank decides. In India the legal reserve has two parts. The cash reserve ratio is kept as cash with the RBI. The statutory liquidity ratio is kept by the bank itself in liquid assets such as cash, gold and approved government securities. In money-creation problems, both are combined into one figure, the legal reserve ratio.',
    }),
    sl('diagram', 'Deposit creation, round by round', {
      v: vRounds,
      n: 'Follow a deposit of 10,000 rupees with a reserve ratio of 20 per cent. The first bank keeps 2,000 and lends 8,000. That 8,000 is spent and deposited in another bank, which keeps 1,600 and lends 6,400. Each round is smaller. When the process ends, total deposits are 50,000 rupees, total reserves are 10,000 and total loans are 40,000.',
    }),
    sl('diagram', 'The rounds get smaller', {
      v: vRoundBars,
      n: 'This chart shows the same process. Each bar is a new deposit, and the darker part is the reserve kept from it. Each round is four-fifths of the one before, so the bars shrink towards zero. Adding all the bars gives total deposits. The process stops when the reserves kept add up to the whole of the original deposit.',
    }),
    sl('example', 'Worked example 3: the money multiplier', {
      b: `Initial deposit ₹${inr(WE.d)}, LRR 20%. Find total deposits and credit created.`,
      bl: [
        'Step 1 — Money multiplier = **1 ÷ LRR** = 1 ÷ 0.2 = 5.',
        `Step 2 — Total deposits = initial deposit × multiplier = ₹${inr(WEc.total)}.`,
        `Step 3 — Credit created = total deposits − initial deposit = ₹${inr(WEc.credit)}.`,
        `Step 4 — Check: 20% of ₹${inr(WEc.total)} = ₹${inr(WEc.reserves)}, the whole initial deposit is now reserves.`,
      ],
      v: vCreationSteps,
      n: 'You do not need to add the rounds one by one. The money multiplier is one divided by the reserve ratio, so with 20 per cent it is 5. Total deposits are the initial deposit times 5, that is 50,000 rupees. Credit created is total deposits minus the initial deposit, so 40,000. A quick check: 20 per cent of 50,000 is exactly the 10,000 we started with.',
    }),
    sl('check', 'Quick check: the multiplier', {
      b: 'Find the money multiplier when the legal reserve ratio is 25 per cent.',
      chk: 'm_multiplier',
      n: 'Turn the percentage into a fraction first, then take its reciprocal.',
    }),
    sl('diagram', 'Higher reserve ratio, smaller multiplier', {
      v: vMultPlot,
      n: 'This curve shows the multiplier against the reserve ratio. At 10 per cent the multiplier is 10, at 20 per cent it is 5, and at 25 per cent it is 4. The relation is inverse. That is why the central bank can control credit by changing reserve requirements: raising them shrinks the multiplier, and lowering them expands it.',
    }),
    sl('concept', 'Why real banks create less', {
      b: 'The formula gives the **maximum** possible deposit creation. It assumes no cash leaves the banks and that banks lend everything above the required reserve.',
      v: vLeaks,
      n: 'The formula rests on two assumptions: all money stays in the banking system, and banks lend everything above the legal minimum. In reality people keep some cash, banks often hold extra reserves for safety, and in a slowdown there may be few willing and creditworthy borrowers. So actual deposit creation is smaller, though the direction of the effect still holds.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'The money multiplier rises when the legal reserve ratio rises.',
      chk: 'tf_lrr_inverse',
      n: 'Think about the formula. If the bottom of a fraction gets bigger, what happens to the fraction?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Barter fails because wants rarely match and there is no common measure. Money has four functions. The narrow money supply is currency with the public plus net demand deposits plus other deposits with the RBI. Banks keep a legal reserve and lend the rest, so deposits multiply. Total deposits equal the initial deposit times one over the reserve ratio.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In M1 questions, **exclude** bank vault cash, government cash and time deposits.',
        'Write the formula first: multiplier = 1 ÷ LRR; total deposits = initial deposit × multiplier.',
        '**Credit created** = total deposits − initial deposit. Do not confuse the two.',
        'Convert per cent to a fraction (20% = 0.2) before taking the reciprocal.',
        'Demand deposits are money but **not legal tender**.',
        'In 3-mark and 5-mark answers, show at least two rounds of deposit creation and state the assumptions.',
      ],
      n: 'A few exam tips. In money supply questions, leave out anything held by banks or the government, and time deposits. In numericals, write the formula before the figures; method marks depend on it. Do not mix up total deposits and credit created. Convert per cent to a fraction first. And when explaining money creation, show two rounds and state the assumptions.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Money and Banking — Part 2: The Central Bank and Credit Control',
  goals: [
    'Explain the functions of the Reserve Bank of India',
    'Distinguish the repo rate, reverse repo rate and bank rate, and the CRR and SLR',
    'Explain how open market operations and margin requirements change credit',
    'Choose the right instruments for excess demand and for deficient demand',
  ],
  slides: [
    sl('title', 'The Central Bank and Credit Control', {
      b: 'Part 2 — the **Reserve Bank of India**, its **functions**, and the **instruments** it uses to control credit.',
      v: vRoute2,
      n: 'In Part 1 we saw that commercial banks create money. Someone must keep that power in check. In India, that is the Reserve Bank of India, the central bank. In this part we look at what a central bank does, and at the instruments it uses to make credit dearer or cheaper, scarcer or more plentiful.',
    }),
    sl('concept', 'Central bank vs commercial bank', {
      b: 'The **central bank** is the apex institution of the monetary and banking system.',
      v: vCentralVsCommercial,
      n: 'A country has one central bank but many commercial banks. Commercial banks deal with the public and aim at profit. The central bank deals with the government and with banks, and its aim is the public interest: stable prices and a sound financial system. Only the central bank issues currency notes. In India, the Reserve Bank of India was set up in 1935 and nationalised in 1949.',
    }),
    sl('diagram', 'Functions of the RBI', {
      v: vRbiFunctions,
      n: 'The RBI has six main functions. It is the bank of issue for currency notes. It is banker, agent and adviser to the government. It is the bankers\' bank and supervisor of banks. It is the lender of last resort. It controls credit in the economy. And it is the custodian of the country\'s foreign exchange reserves. Let us take them one at a time.',
    }),
    sl('two-column', 'Bank of issue and banker to the government', {
      cols: [
        '**Bank of issue**\n\n- Sole right to issue notes (except one-rupee notes).\n- Gives the public **uniform, trusted** currency.\n- Lets the RBI manage the amount of currency.',
        '**Banker to the government**\n\n- Keeps government **accounts**, receives and makes **payments**.\n- Manages **public debt** (government borrowing).\n- **Advises** the government on economic matters.',
      ],
      n: 'As the bank of issue, the RBI alone issues currency notes, apart from one-rupee notes. This gives everyone the same trusted currency. As banker to the government, it keeps the government\'s accounts, receives and makes payments for it, manages its borrowing and advises it on money matters, much as your bank does for you.',
    }),
    sl('concept', 'Bankers\' bank and lender of last resort', {
      b: 'Banks keep reserves with the RBI, settle payments through it, and are **licensed and supervised** by it. In a crisis, it lends to sound banks.',
      v: vLastResort,
      n: 'The RBI is the bankers\' bank. Banks keep their cash reserves with it, settle payments among themselves through it, and are licensed and supervised by it. It is also the lender of last resort. Suppose a rumour makes depositors rush to a sound bank. The bank runs short of cash. The RBI lends to it against good securities, depositors are paid, and the panic fades.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Assertion: the RBI is the custodian of India\'s foreign exchange reserves. Reason: the RBI is a commercial bank whose main aim is profit.',
      chk: 'ar_custodian',
      n: 'Judge each statement separately first. Then ask whether the reason really explains the assertion.',
    }),
    sl('concept', 'Controller of credit: two kinds of instruments', {
      b: 'Too much credit fuels **inflation**; too little deepens a **slowdown**. The RBI uses two kinds of instruments.',
      v: vToolTypes,
      n: 'The most important function for this chapter is credit control. Too much credit pushes up demand and prices; too little can deepen a slowdown. Quantitative instruments change the total volume of credit: the policy rates, the reserve ratios and open market operations. Qualitative instruments steer credit towards or away from particular uses, such as margin requirements and moral suasion.',
    }),
    sl('diagram', 'Repo rate and reverse repo rate', {
      v: vRepo,
      n: 'The repo rate is the rate at which the RBI lends short-term funds to banks against government securities. The reverse repo rate works the other way: it is what the RBI pays banks on surplus funds they park with it. Raising the repo rate makes borrowing dearer for banks. Raising the reverse repo rate makes parking money more attractive than lending. Both tighten credit.',
    }),
    sl('example', 'Worked example 1: from the repo rate to your loan', {
      b: 'Prices are rising. The central bank raises the repo rate. Trace the effect.',
      bl: [
        'Step 1 — Banks\' **cost of funds** rises.',
        'Step 2 — Banks raise **lending rates** on home, car and business loans.',
        'Step 3 — Fewer people borrow; **spending and investment fall**.',
        'Step 4 — **Aggregate demand** falls, so pressure on prices eases.',
      ],
      v: vTransmission,
      n: 'Let us trace a repo rate rise step by step. Banks now pay more for funds, so they raise their own lending rates. A family that planned a car loan postpones it, and a firm delays a new machine. Spending and investment fall, aggregate demand falls, and pressure on prices eases. In an answer, show this chain; a bare statement earns little.',
    }),
    sl('check', 'Quick check: the repo rate', {
      b: 'What is the repo rate?',
      chk: 'm_repo_def',
      n: 'Ask two questions: who is lending, and who is borrowing?',
    }),
    sl('concept', 'Bank rate, CRR and SLR', {
      v: vRates,
      n: 'Three more quantitative instruments. The bank rate is the rate at which the RBI lends to banks for longer periods without a repurchase deal. The cash reserve ratio is the share of deposits banks must keep as cash with the RBI, earning nothing. The statutory liquidity ratio is the share banks must keep with themselves in liquid assets. Raising any of these reduces the money banks can lend.',
    }),
    sl('example', 'Worked example 2: how much can a bank lend?', {
      b: `An imagined bank has deposits of ₹${LX.dep} crore. CRR is 4% and SLR is 18%.`,
      bl: [
        `Step 1 — CRR: 4% of ${LX.dep} = ₹${LXcrr} crore, kept with the RBI.`,
        `Step 2 — SLR: 18% of ${LX.dep} = ₹${LXslr} crore, kept in liquid assets.`,
        `Step 3 — Left to lend = ${LX.dep} − ${LXcrr} − ${LXslr} = **₹${LXlend} crore**.`,
        'Step 4 — If the CRR is raised, this amount **falls**.',
      ],
      v: vLendable,
      n: 'Here is a simplified example with imagined figures. With deposits of 800 crore rupees, a 4 per cent cash reserve ratio means 32 crore kept with the RBI, and an 18 per cent liquidity ratio means 144 crore kept in liquid assets. That leaves 624 crore for loans. If the RBI raised either ratio, the bank would have less to lend.',
    }),
    sl('diagram', 'Open market operations', {
      b: '**Open market operations (OMO):** the central bank buys or sells **government securities** in the open market.',
      v: vOmo,
      n: 'In open market operations the RBI buys or sells government securities. When it buys, it pays banks and the public, so bank reserves rise, banks lend more, and the money supply grows. When it sells, buyers pay the RBI, so reserves fall and lending shrinks. Remember: buying injects money, selling absorbs it.',
    }),
    sl('check', 'Quick check: selling securities', {
      b: 'What happens when the RBI sells government securities in the open market?',
      chk: 'm_omo_sell',
      n: 'Follow the money. When you buy something, money leaves your hands. Who is buying here, and where does the money go?',
    }),
    sl('example', 'Worked example 3: margin requirements', {
      b: 'The **margin** is the part of a security\'s value that a bank may **not lend** against.',
      bl: [
        `Step 1 — Margin 25%: loan = ${inr(MG.value)} − 25% of it = ₹${inr(MGl1)}.`,
        `Step 2 — Margin raised to 40%: loan = ${inr(MG.value)} − 40% of it = ₹${inr(MGl2)}.`,
        'Step 3 — Same security, **smaller loan**: credit for that use is curbed.',
      ],
      v: vMargin,
      n: 'Margin requirements are a selective tool. Suppose a trader offers shares worth 10 lakh rupees as security. With a 25 per cent margin, the bank can lend up to seven and a half lakh. If the RBI raises the margin to 40 per cent, the loan falls to six lakh. The RBI can use this to cool borrowing for speculation without touching other credit.',
    }),
    sl('diagram', 'The toolkit: which way to move each instrument', {
      v: vToolkit,
      n: 'Here is the whole toolkit in one table. When there is excess demand and inflation, the central bank makes credit dearer and scarcer: it raises the policy rates and reserve ratios, sells securities and raises margins. When demand is deficient, it does the opposite. If you remember the direction for one case, the other is simply its mirror image.',
    }),
    sl('check', 'Quick check: match the instruments', {
      b: 'Match each instrument with its description.',
      chk: 'mt_instruments',
      n: 'For each instrument, recall who keeps what, or who pays whom, before you match.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The RBI is India\'s central bank. It issues notes, banks for the government and for banks, lends as a last resort, controls credit and keeps the foreign exchange reserves. The repo rate is what the RBI charges banks; the reverse repo rate is what it pays them. Buying securities injects money, selling absorbs it, and a higher margin means a smaller loan.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Repo: **RBI lends** to banks. Reverse repo: **RBI borrows** from banks. Examiners test this every year.',
        'CRR is kept **with the RBI**; SLR is kept **by the bank itself**.',
        'For a policy question, give the **direction** (raise or lower), the **mechanism** and the **effect on aggregate demand**.',
        'Margin requirement is **qualitative**; repo, CRR, SLR and OMO are **quantitative**.',
        'Do not quote current rates unless the question gives them; the logic earns the marks.',
      ],
      n: 'Final tips. Keep repo and reverse repo straight by asking who lends. Remember that cash reserves sit with the RBI while liquidity reserves stay with the bank. In policy questions, write the direction of the change, how it works, and its effect on aggregate demand. And you never need to memorise this year\'s rates: the reasoning is what earns marks.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Money and Banking — Notes',
  sections: [
    {
      h: '1. Barter and the meaning of money',
      t: 1,
      b: '**Barter** is the direct exchange of goods for goods. Its problems:\n1. **Lack of double coincidence of wants**: each party must want exactly what the other offers.\n2. **No common measure of value**: endless exchange ratios.\n3. **Indivisibility** of goods such as cattle.\n4. **Difficulty of storing** value: goods rot or need upkeep.\n5. **No standard for deferred payments**: disputes over the quality of goods repaid.\n\n**Money** is anything generally accepted as a medium of exchange and a measure of value. Its form has changed (commodity money, coins, paper notes, bank deposits, digital payments).\n\n**Legal tender:** money that cannot be refused in payment by law, such as RBI notes and coins. **Fiat money:** money whose value rests on the government\'s order, not its material. Demand deposits are money but **not** legal tender.',
      terms: [
        ['Barter', 'Direct exchange of goods for goods without money.'],
        ['Double coincidence of wants', 'Each of two traders wants what the other has, at the same time.'],
        ['Legal tender', 'Money that must, by law, be accepted in settlement of payments.'],
        ['Fiat money', 'Money whose value comes from a government order rather than the value of its material.'],
      ],
      v: vBarter,
    },
    {
      h: '2. Functions of money',
      t: 1,
      b: '**Primary functions**\n1. **Medium of exchange:** splits barter into sale and purchase.\n2. **Unit of account (measure of value):** prices and accounts in one unit.\n\n**Secondary functions**\n3. **Store of value:** saving purchasing power for the future.\n4. **Standard of deferred payment:** loans, instalments and salaries stated in money.',
      terms: [
        ['Medium of exchange', 'Money accepted in buying and selling all goods and services.'],
        ['Unit of account', 'Money as the common unit in which values are measured and compared.'],
        ['Standard of deferred payment', 'Money as the unit in which future payments are stated.'],
      ],
      v: vFunctions,
      vs: [vFnExample],
    },
    {
      h: '3. Supply of money',
      t: 1,
      b: '**Money supply** is the **stock** of money held by the **public** at a point of time. The "public" means households, firms and local bodies; it excludes the **producers of money** (the government and the banking system).\n\n**Narrow money (M1)** = currency held by the public (notes and coins) + **net demand deposits** of commercial banks (savings and current accounts, leaving out inter-bank deposits) + **other deposits with the RBI**.\n\nNot counted in M1: cash in bank vaults, government cash, and time (fixed) deposits, which enter broader measures.\n\nIssuers in India: the **RBI** issues currency notes except one-rupee notes; the **Government of India** issues one-rupee notes and coins.',
      terms: [
        ['Money supply', 'The total stock of money held by the public at a point of time.'],
        ['Demand deposits', 'Bank deposits that can be withdrawn on demand by cheque or transfer.'],
        ['M1 (narrow money)', 'Currency with the public plus net demand deposits plus other deposits with the RBI.'],
      ],
      v: vM1,
      vs: [vM1Example],
    },
    {
      h: '4. Money creation by commercial banks',
      t: 2,
      b: 'A commercial bank accepts deposits and lends. Since depositors do not all withdraw at once, it keeps a fraction as reserves and lends the rest. The **legal reserve ratio (LRR)** is the minimum fraction fixed by the central bank (CRR with the RBI + SLR with the bank).\n\n**Process:** deposit → reserve kept → loan → loan spent and redeposited → next round, smaller each time.\n\n**Formulae**\n- Money multiplier = **1 ÷ LRR**\n- Total deposits = **initial deposit × money multiplier**\n- Credit created = **total deposits − initial deposit**\n\n**Example:** ₹10,000 at LRR 20%: multiplier 5, total deposits ₹50,000, credit ₹40,000.\n\n**Assumptions:** all money stays in the banking system (no cash drain); banks keep only the required reserves; there are enough borrowers. In practice, cash drain, excess reserves and weak loan demand make actual creation smaller.',
      terms: [
        ['Legal reserve ratio', 'Minimum share of deposits that banks must keep as reserves, fixed by the central bank.'],
        ['Money multiplier', 'Ratio of total deposits created to the initial deposit; equals 1 ÷ LRR.'],
        ['Cash drain', 'Money that the public holds as cash instead of redepositing, which reduces deposit creation.'],
      ],
      v: vRounds,
      vs: [vMultPlot, vLeaks],
    },
    {
      h: '5. The central bank and its functions',
      t: 3,
      b: 'The **central bank** is the apex monetary institution; it works in the **public interest**, not for profit. India\'s central bank is the **Reserve Bank of India** (set up in 1935, nationalised in 1949).\n\n1. **Bank of issue:** sole issuer of currency notes except one-rupee notes.\n2. **Banker, agent and adviser to the government:** accounts, payments, public debt, advice.\n3. **Bankers\' bank and supervisor:** holds banks\' reserves, clears payments, licenses and regulates banks.\n4. **Lender of last resort:** lends to sound banks facing a sudden shortage, protecting depositors.\n5. **Controller of credit:** regulates the volume and direction of credit.\n6. **Custodian of foreign exchange reserves.**',
      terms: [
        ['Central bank', 'The apex bank that issues currency, regulates banks and controls credit in the public interest.'],
        ['Lender of last resort', 'The central bank\'s role of lending to banks in difficulty when no other source is available.'],
      ],
      v: vRbiFunctions,
      vs: [vCentralVsCommercial],
    },
    {
      h: '6. Instruments of credit control',
      t: 3,
      b: '**Quantitative (general) instruments**\n- **Repo rate:** rate at which the RBI lends short-term funds to banks against government securities.\n- **Reverse repo rate:** rate the RBI pays on funds banks park with it (the RBI borrows).\n- **Bank rate:** rate at which the RBI lends to banks for longer periods without a repurchase deal.\n- **Cash reserve ratio (CRR):** share of deposits kept as cash with the RBI.\n- **Statutory liquidity ratio (SLR):** share kept by banks in liquid assets (cash, gold, approved securities).\n- **Open market operations:** buying (injects money) or selling (absorbs money) government securities.\n\n**Qualitative (selective) instruments**\n- **Margin requirement:** the part of a security\'s value not lent; a higher margin means a smaller loan.\n- **Moral suasion:** persuading banks through advice and meetings.\n\n**Excess demand:** raise rates and ratios, sell securities, raise margins. **Deficient demand:** the reverse.',
      terms: [
        ['Repo rate', 'Rate at which the central bank lends short-term funds to banks against securities.'],
        ['Reverse repo rate', 'Rate at which the central bank borrows from banks, that is, pays on their surplus funds.'],
        ['Open market operations', 'Purchase and sale of government securities by the central bank.'],
        ['Margin requirement', 'The part of a security\'s value against which a bank may not lend.'],
      ],
      v: vToolkit,
      vs: [vRepo, vOmo],
    },
  ],
  tips: '**Common mistakes**\n- Including bank vault cash or government cash in the money supply.\n- Calling demand deposits legal tender.\n- Mixing up total deposits and credit created (credit = total deposits − initial deposit).\n- Using the percentage (20) instead of the fraction (0.2) in 1 ÷ LRR.\n- Swapping repo and reverse repo: **repo = RBI lends**, **reverse repo = RBI borrows**.\n- Saying CRR is kept with the bank: CRR is with the RBI, SLR is with the bank.\n- Giving the wrong direction: for inflation, every instrument is moved to make credit **dearer and scarcer**.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points, or a definition plus an example (about 30–50 words).\n- 3 marks: three points, or formula, working and answer with a short interpretation (about 50–80 words).\n- 5 marks: five points (about 80–120 words); numericals need the formula, every step and the unit.\n\nAll figures in SOYL examples are imagined. Board questions give their own data; no current policy-rate values need to be memorised.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Barter**', 'Direct exchange of goods for goods, without money.', 'definition', 1],
  ['Main drawback of barter', 'Lack of **double coincidence of wants**.', 'concept', 1],
  ['Four other problems of barter', 'No common measure of value; indivisibility; difficulty of storing value; no standard for deferred payment.', 'concept', 1],
  ['**Money**', 'Anything **generally accepted** as a medium of exchange and a measure of value.', 'definition', 1],
  ['Primary functions of money', '**Medium of exchange** and **unit of account**.', 'fact', 1],
  ['Secondary functions of money', '**Store of value** and **standard of deferred payment**.', 'fact', 1],
  ['Paying an EMI on a phone uses money as…', 'A **standard of deferred payment**.', 'example', 1],
  ['**Legal tender**', 'Money that cannot be refused in payment by law (notes and coins).', 'definition', 1],
  ['**Fiat money**', 'Money whose value rests on the government\'s order, not on its material.', 'definition', 1],
  ['Are demand deposits legal tender?', '**No.** They are money, accepted because people trust banks.', 'exam-tip', 1],
  ['Who issues one-rupee notes and coins in India?', 'The **Government of India**; all other notes are issued by the **RBI**.', 'fact', 1],
  ['**Money supply**', 'The **stock** of money held by the **public** at a point of time.', 'definition', 1],
  ['**M1**', 'Currency with the public + net demand deposits of banks + other deposits with the RBI.', 'formula', 1],
  ['Not in M1', 'Bank vault cash, government cash, time deposits.', 'exam-tip', 1],
  ['Primary functions of a commercial bank', 'Accepting **deposits** and advancing **loans**.', 'fact', 2],
  ['**Legal reserve ratio (LRR)**', 'Minimum share of deposits banks must keep as reserves, fixed by the central bank (CRR + SLR).', 'definition', 2],
  ['**Money multiplier**', '**1 ÷ LRR**. LRR 20% → 5; LRR 10% → 10.', 'formula', 2],
  ['Total deposits created', '**Initial deposit × money multiplier**.', 'formula', 2],
  ['Credit created', '**Total deposits − initial deposit**.', 'formula', 2],
  ['₹10,000 deposit, LRR 20%', 'Total deposits ₹50,000; credit created ₹40,000.', 'example', 2],
  ['Two assumptions of deposit creation', 'No cash drain (all money returns to banks); banks keep only required reserves.', 'concept', 2],
  ['Why real banks create less money', 'Cash drain, excess reserves, few willing or creditworthy borrowers.', 'concept', 2],
  ['**Central bank**', 'Apex bank: issues notes, banks for government and banks, controls credit; aim is public interest.', 'definition', 3],
  ['Six functions of the RBI', 'Bank of issue; banker to government; bankers\' bank and supervisor; lender of last resort; controller of credit; custodian of forex reserves.', 'concept', 3],
  ['**Lender of last resort**', 'RBI lends to sound banks facing a sudden shortage, protecting depositors.', 'definition', 3],
  ['**Repo rate**', 'Rate at which the **RBI lends** short-term funds to banks against government securities.', 'definition', 3],
  ['**Reverse repo rate**', 'Rate at which the **RBI borrows** from banks (pays on their parked funds).', 'definition', 3],
  ['**CRR** vs **SLR**', 'CRR: cash kept **with the RBI**. SLR: liquid assets kept **by the bank itself**.', 'concept', 3],
  ['**Open market operations**', 'RBI buys securities → money in; RBI sells securities → money out.', 'concept', 3],
  ['**Margin requirement**', 'Part of a security\'s value not lent; higher margin → smaller loan. A **qualitative** tool.', 'definition', 3],
  ['Instruments for **inflation**', 'Raise repo, bank rate, reverse repo, CRR, SLR and margins; sell securities.', 'exam-tip', 3],
  ['Instruments for **deficient demand**', 'Lower repo, bank rate, reverse repo, CRR, SLR and margins; buy securities.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Money and Banking',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_medium', 'm_not_money_supply', 'm_inflation_tool', 'ar_credit'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_barter', 's_lender_last', 's3_numeric_change'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_creation', 'l_functions_rbi'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_rbi'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Money and Banking',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_store', 'm_legal_tender', 'm_total_dep', 'm_lrr_rise', 'm_lender_last', 'm_reverse_repo', 'm_margin_mcq', 'm_deflation', 'ar_dd_legal', 'ar_repo'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_multiplier', 's_bankers_bank', { attempt: 1, keys: ['s_store', 's_repo_reverse'] }, 's3_inflation', { attempt: 1, keys: ['s3_m1', 's3_omo'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_quantitative', { attempt: 1, keys: ['l_functions', 'l_limits'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_money', 'cb_bank'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-economics-ch02 only (money: meaning, functions and supply; money creation by commercial banks; the central bank and credit control)',
    originality: 'every scenario, table and passage written for this chapter (imagined people, banks, island and central bank); no NCERT exercise, boxed example or board/sample-paper item reused',
    data: 'all deposit-creation, multiplier, M1, reserve and margin figures computed by the build from the stated ratios (e.g. 10,000 at 20 per cent → 50,000 deposits, 40,000 credit; 40,000 at 25 per cent → 1,60,000; 800 crore with CRR 4 and SLR 18 → 624 left to lend)',
    facts: 'RBI issues notes except one-rupee notes (Government of India issues those and coins); RBI set up 1935, nationalised 1949; CRR with the RBI, SLR with banks; repo = RBI lends, reverse repo = RBI borrows; no current policy-rate values stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
