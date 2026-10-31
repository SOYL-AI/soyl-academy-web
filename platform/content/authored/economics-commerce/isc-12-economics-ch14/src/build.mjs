// Build ISC 12 Economics ch14 Commercial Banks and the Central Bank. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch14/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch14', 'economics-commerce');
const {
  r3, inr, mult, totalDeposits, V, V_K, V_TD, V_CC, V_ROUNDS, V_FIRST4, SW, SW_TD1, SW_TD2, SW_FALL, KO, KO_TD, KO_CC,
  HP, HP_H, LF, LF_CRR, LF_SLR, LF_LEND,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures
// (1) Rounds of deposit creation at Vasundhara Bank: each deposit bar split into reserve (muted) and loan (accent).
const vRoundBars = (() => {
  const s = new Svg(520, 400);
  const c = s.chart({ x1: 5, y1: 60000, left: 80, top: 40, width: 360, height: 280, xLabel: 'Round', yLabel: 'Amount (₹)' });
  V_ROUNDS.forEach((rw, i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.32), x1 = c.X(x + 0.32);
    s.rect(x0, c.Y(rw.loan), x1 - x0, c.Y(0) - c.Y(rw.loan), { fill: 'fill', color: 'accent', sw: 1.4, rx: 2 });
    s.rect(x0, c.Y(rw.deposit), x1 - x0, c.Y(rw.loan) - c.Y(rw.deposit), { fill: 'muted', fillOpacity: 0.5, color: 'muted', sw: 1.2, rx: 2 });
    c.label([x, rw.deposit], inr(rw.deposit), { dy: -10, size: 11 });
    c.xTick(x, String(x));
  });
  c.yTick(20000, '20,000').yTick(40000, '40,000');
  s.rect(300, 46, 14, 10, { fill: 'fill', color: 'accent', sw: 1.2, rx: 1 });
  s.text(320, 51, 'Loan (lent on)', { anchor: 'start', size: 11 });
  s.rect(300, 64, 14, 10, { fill: 'muted', fillOpacity: 0.5, color: 'muted', sw: 1.2, rx: 1 });
  s.text(320, 69, 'Reserve (20 per cent)', { anchor: 'start', size: 11 });
  return s.visual(
    `Bar chart of the first four rounds of deposit creation after an imagined deposit of ${inr(V.D)} rupees with a reserve ratio of 20 per cent: deposits of ${V_ROUNDS.map((x) => inr(x.deposit)).join(', ')}; in each bar the top fifth is kept as a reserve and the rest is lent and becomes the next deposit, so the bars shrink by one-fifth each round`,
    `Imagined figures: each deposit = previous loan; all rounds together give ${inr(V.D)} ÷ 0.2 = ₹${inr(V_TD)}.`,
  );
})();

// (2) Total deposits from ₹1,000 crore of primary deposits at four reserve ratios.
const RATIOS = [0.1, 0.125, 0.2, 0.25];
const vRatioBars = (() => {
  const s = new Svg(520, 400);
  const c = s.chart({ x1: 5, y1: 12000, left: 80, top: 40, width: 360, height: 280, xLabel: 'Reserve ratio', yLabel: 'Total deposits (₹ crore)' });
  RATIOS.forEach((r, i) => {
    const x = i + 1;
    const td = totalDeposits(SW.D, r);
    const x0 = c.X(x - 0.3), x1 = c.X(x + 0.3);
    s.rect(x0, c.Y(td), x1 - x0, c.Y(0) - c.Y(td), { fill: 'fill', color: i === 1 ? 'red' : 'accent', sw: 1.6, rx: 2 });
    c.label([x, td], inr(td), { dy: -10, size: 11 });
    c.xTick(x, `${r3(r * 100)}%`);
  });
  assert(RATIOS.map((r) => totalDeposits(SW.D, r)).join() === '10000,8000,5000,4000', 'ratio bars');
  return s.visual(
    `Bar chart of total deposits that banks can create from primary deposits of ${inr(SW.D)} crore rupees at reserve ratios of 10, 12.5, 20 and 25 per cent: 10,000, 8,000, 5,000 and 4,000 crore rupees; the higher the reserve ratio, the smaller the total`,
    'Imagined economy: total deposits = primary deposits ÷ reserve ratio.',
  );
})();

// (3) How an imagined bank's deposits of ₹600 crore are split by CRR and SLR (imagined ratios).
const vSplit = (() => {
  const s = new Svg(520, 220);
  const x0 = 40, w = 440, y = 90, h = 50;
  const px = (v) => (v / LF.dep) * w;
  s.rect(x0, y, px(LF_CRR), h, { fill: 'red', fillOpacity: 0.6, color: 'red', sw: 1.4, rx: 2 });
  s.rect(x0 + px(LF_CRR), y, px(LF_SLR), h, { fill: 'muted', fillOpacity: 0.5, color: 'muted', sw: 1.4, rx: 2 });
  s.rect(x0 + px(LF_CRR + LF_SLR), y, px(LF_LEND), h, { fill: 'fill', color: 'accent', sw: 1.6, rx: 2 });
  s.text(x0 + px(LF_CRR) / 2, y - 14, `CRR ${LF_CRR}`, { size: 12, bold: true, color: 'red' });
  s.text(x0 + px(LF_CRR) + px(LF_SLR) / 2, y - 14, `SLR ${LF_SLR}`, { size: 12, bold: true });
  s.text(x0 + px(LF_CRR + LF_SLR) + px(LF_LEND) / 2, y + h / 2, `Can be lent: ${LF_LEND}`, { size: 13, bold: true });
  s.text(x0, y + h + 30, 'With the central bank', { anchor: 'start', size: 11, color: 'red' });
  s.text(x0 + w, y + h + 30, `Deposits ₹${LF.dep} crore`, { anchor: 'end', size: 11 });
  return s.visual(
    `Bar of an imagined bank's deposits of ${LF.dep} crore rupees split into three parts: ${LF_CRR} crore kept as cash with the central bank under an imagined cash reserve ratio of 5 per cent, ${LF_SLR} crore kept in liquid assets under an imagined statutory liquidity ratio of 20 per cent, and ${LF_LEND} crore that can be lent`,
    'Imagined ratios, not current values.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vDeposits = table(
  ['Deposit', 'Withdrawal', 'Interest', 'Suits'],
  [
    ['Current (demand)', 'Any number of times, by cheque', 'Usually none', 'Traders and firms'],
    ['Savings (demand)', 'Some limits may apply', 'Modest', 'Households'],
    ['Recurring (time)', 'At maturity', 'Higher', 'Regular small savers'],
    ['Fixed (time)', 'After the fixed period', 'Highest', 'Lump sums not needed for a while'],
  ],
  'Table of four kinds of bank deposits: current deposits allow unlimited withdrawals and usually pay no interest, suiting traders; savings deposits pay modest interest; recurring and fixed deposits are time deposits paying higher interest and withdrawn at maturity',
);
const vLoans = table(
  ['Form of lending', 'How it works'],
  [
    ['Cash credit', 'Draw up to a limit against security; interest on the amount used'],
    ['Overdraft', 'Draw beyond the current-account balance up to a limit'],
    ['Discounting bills', 'Bank pays a bill now, less a discount, before it falls due'],
    ['Demand and term loans', 'A lump sum repayable on demand or over a period'],
  ],
  'Table of forms of bank lending: cash credit up to a limit against security, overdrafts beyond the current-account balance, discounting bills of exchange before they fall due, and demand or term loans',
);
const vFunctions = flow('TB', ['Commercial bank functions', 'Primary: accept deposits', 'Primary: advance loans', 'Secondary: agency (cheques, payments, securities)', 'Secondary: general utility (lockers, letters of credit, drafts)'], 'Flow of commercial bank functions: primary functions of accepting deposits and advancing loans, and secondary functions of agency services and general utility services', 'Primary and secondary functions', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' },
]);
const vRoundsTable = table(
  ['Round', 'Deposit (₹)', 'Reserve kept (₹)', 'Loan given (₹)'],
  [...V_ROUNDS.map((x) => [String(x.round), inr(x.deposit), inr(x.reserve), inr(x.loan)]), ['All rounds', inr(V_TD), inr(V.D), inr(V_CC)]],
  `Table of deposit creation after an imagined deposit of ${inr(V.D)} rupees with a 20 per cent reserve ratio: rounds of deposits ${V_ROUNDS.map((x) => inr(x.deposit)).join(', ')}, with reserves of one-fifth and loans of four-fifths each time; all rounds together give deposits of ${inr(V_TD)}, reserves of ${inr(V.D)} and loans of ${inr(V_CC)}`,
  'Imagined figures; totals by the formula.',
);
const vCreateFlow = flow('LR', ['New deposit', 'Keep the required reserve', 'Lend the rest', 'Loan is spent', 'Seller deposits it in a bank'], 'Flow of one round of credit creation: a new deposit, the bank keeps the required reserve and lends the rest, the loan is spent, and the seller deposits the money in a bank, starting the next round', 'One round of credit creation');
const vMultTable = table(
  ['Reserve ratio', 'Credit multiplier', `Total deposits from ₹${inr(SW.D)} crore`],
  RATIOS.map((r) => [`${r3(r * 100)} per cent`, String(mult(r)), `₹${inr(totalDeposits(SW.D, r))} crore`]),
  `Table of credit multipliers: reserve ratios of 10, 12.5, 20 and 25 per cent give multipliers of 10, 8, 5 and 4, and total deposits of 10,000, 8,000, 5,000 and 4,000 crore rupees from primary deposits of ${inr(SW.D)} crore`,
  'Multiplier = 1 ÷ reserve ratio.',
);
const vLimits = table(
  ['Limitation', 'Why it reduces credit creation'],
  [
    ['Legal reserve ratio', 'Part of every deposit must be held back'],
    ['Cash drain', 'Cash kept by the public does not return as deposits'],
    ['Willing borrowers', 'Banks can lend only if people want loans'],
    ['Security', 'Loans need sound security from borrowers'],
    ['Central bank policy', 'It can raise ratios or make credit dearer'],
  ],
  'Table of limits on credit creation: the legal reserve ratio, cash drain, the need for willing borrowers, the need for sound security, and central bank policy',
);
const vHPM = table(
  ['Part', `Imagined value (₹ crore)`],
  [['Currency held by the public', String(HP.currency)], ['Cash reserves of banks (vault and central bank)', String(HP.reserves)], ['High-powered money', String(HP_H)]],
  `Table of high-powered money in an imagined economy: currency held by the public ${HP.currency} crore plus cash reserves of banks ${HP.reserves} crore gives high-powered money of ${HP_H} crore rupees`,
  'Banks build deposits several times larger on this base.',
);
const vRBI = table(
  ['Function', 'What the RBI does'],
  [
    ['Bank of issue', 'Sole issuer of currency notes, except one-rupee notes'],
    ['Banker to government', 'Keeps its accounts, makes payments, manages its debt'],
    ['Bankers\' bank', 'Holds banks\' reserves, clears their claims, supervises them'],
    ['Lender of last resort', 'Lends to sound banks in a crisis'],
    ['Custodian of foreign exchange', 'Holds foreign currencies and gold; steadies the rupee'],
    ['Controller of credit', 'Uses quantitative and qualitative tools'],
  ],
  'Table of the functions of the Reserve Bank of India: bank of issue, banker to the government, bankers\' bank, lender of last resort, custodian of foreign exchange reserves, and controller of credit',
  'Set up in 1935; nationalised in 1949.',
);
const vLOLR = flow('LR', ['Rumour causes a rush to withdraw', 'Sound bank runs short of cash', 'No other lender helps', 'Central bank lends against securities', 'Depositors paid; panic stops'], 'Flow of the lender of last resort role: a rumour causes a rush to withdraw, a sound bank runs short of cash, no other lender helps, the central bank lends against securities, depositors are paid and the panic stops', 'Lender of last resort');
const vCBvsRBI = table(
  ['', 'Commercial bank', 'Reserve Bank of India'],
  [['Aim', 'Profit', 'Monetary and financial stability'], ['Deals with', 'The public', 'Banks and the government'], ['Currency', 'Cannot issue notes', 'Sole issuer of notes (except ₹1)'], ['Credit', 'Creates credit', 'Controls credit']],
  'Table comparing a commercial bank and the Reserve Bank of India: aim, whom they deal with, currency issue and their relation to credit',
);
const vQuant = table(
  ['Instrument', 'Meaning', 'Against inflation', 'Against deficient demand'],
  [
    ['Repo rate', 'Rate for short-term loans to banks against securities', 'Raise', 'Cut'],
    ['Reverse repo rate', 'Rate the central bank pays on banks\' surplus funds', 'Raise', 'Cut'],
    ['Bank rate', 'Rate for longer-term lending or rediscounting', 'Raise', 'Cut'],
    ['CRR', 'Share of deposits kept as cash with the central bank', 'Raise', 'Cut'],
    ['SLR', 'Share of deposits kept by banks in liquid assets', 'Raise', 'Cut'],
    ['Open market operations', 'Sale or purchase of government securities', 'Sell', 'Buy'],
  ],
  'Table of quantitative instruments: repo rate, reverse repo rate, bank rate, cash reserve ratio, statutory liquidity ratio and open market operations, with the direction of change against inflation (raise, or sell securities) and against deficient demand (cut, or buy securities)',
  'Directions only; no current values are stated.',
);
const vRepoUp = flow('LR', ['Repo rate raised', 'Banks\' funds dearer', 'Higher loan rates', 'Less borrowing and spending', 'Price pressure eases'], 'Flow of a repo rate rise: banks pay more for funds, raise their loan rates, households and firms borrow and spend less, and the pressure on prices eases', 'How a repo rise works');
const vOMO = flow('LR', ['Central bank sells securities', 'Buyers pay from bank deposits', 'Bank reserves fall', 'Banks lend less'], 'Flow of an open market sale: buyers pay from their bank deposits, bank reserves fall, and banks lend less', 'Open market sale');
const vQual = table(
  ['Qualitative tool', 'How it works'],
  [
    ['Margin requirements', 'A higher margin means a smaller loan against the same security'],
    ['Credit rationing', 'Ceilings or quotas on credit for certain purposes'],
    ['Moral suasion', 'Advice and persuasion of banks, without legal force'],
    ['Direct action', 'Penalties or denial of facilities to banks that ignore directions'],
  ],
  'Table of qualitative credit tools: margin requirements, credit rationing, moral suasion and direct action, with how each works',
);
const vQvQ = table(
  ['', 'Quantitative', 'Qualitative'],
  [['Controls', 'Total volume and cost of credit', 'Direction and use of credit'], ['Affects', 'All borrowers', 'Particular purposes or sectors'], ['Examples', 'Repo, CRR, SLR, open market operations', 'Margins, rationing, moral suasion, direct action']],
  'Table comparing quantitative and qualitative methods of credit control: volume against direction, all borrowers against particular uses, and examples of each',
);
const vMargin = table(
  ['Margin', 'Loan against pulses worth ₹10 lakh'],
  [['30 per cent', '₹7 lakh'], ['50 per cent', '₹5 lakh']],
  'Table showing that a trader offering pulses worth 10 lakh rupees can borrow 7 lakh with a 30 per cent margin but only 5 lakh with a 50 per cent margin',
  'Imagined figures.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Primary functions', 'Accept deposits; advance loans'], ['Secondary functions', 'Agency and general utility services'], ['Credit multiplier', '1 ÷ legal reserve ratio'], ['Total deposits', 'Initial deposit ÷ reserve ratio'], ['Credit created', 'Total deposits − initial deposit'], ['High-powered money', 'Currency with the public + bank reserves']],
  'Summary table of Part 1: primary and secondary functions of commercial banks, the credit multiplier, total deposits, credit created, and high-powered money',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['RBI', 'Bank of issue, banker to government and banks, lender of last resort, custodian of reserves'], ['Quantitative tools', 'Repo, reverse repo, bank rate, CRR, SLR, open market operations'], ['Against inflation', 'Raise rates and ratios; sell securities'], ['Qualitative tools', 'Margins, rationing, moral suasion, direct action'], ['Choice', 'Quantitative for volume; qualitative for direction']],
  'Summary table of Part 2: functions of the Reserve Bank, quantitative tools, the direction against inflation, qualitative tools, and when to use each kind',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Commercial Banks and the Central Bank — Part 1: Commercial Banks and Credit Creation',
  goals: [
    'Explain the primary and secondary functions of commercial banks, with types of deposits and loans',
    'Calculate total deposits and credit created from an initial deposit and a reserve ratio',
    'Explain the limitations of credit creation and the meaning of high-powered money',
  ],
  slides: [
    sl('title', 'Commercial Banks and Credit Creation', {
      b: 'Part 1 — what **commercial banks** do, how they **create credit**, and what **limits** that power.',
      v: flow('LR', ['Deposits', 'Loans', 'Secondary services', 'Credit creation', 'Limits', 'High-powered money'], 'Route map of Part 1: deposits, loans, secondary services, credit creation, its limits, and high-powered money', 'Part 1 at a glance'),
      n: 'When you put money in a bank, it does not simply sit in a vault. The bank lends most of it, and the loan soon comes back to some bank as a new deposit. In this part we see what commercial banks do for us, and how, together, they turn one deposit into many times as much.',
    }),
    sl('diagram', 'What a commercial bank does', {
      b: 'Two **primary** functions define a bank; **secondary** functions add services.',
      v: vFunctions,
      n: 'Every commercial bank does two things above all: it accepts deposits and it advances loans. These are its primary functions. Around them it offers secondary services. Some are agency services, where it acts for a customer, like collecting cheques. Others are general utility services, like lockers and letters of credit.',
    }),
    sl('concept', 'Accepting deposits', {
      b: '**Demand deposits** (current, savings) can be withdrawn any time; **time deposits** (recurring, fixed) are kept for a period and earn more.',
      v: vDeposits,
      n: 'Banks offer different deposits for different needs. A current account lets a trader pay and receive money many times a day, usually without interest. A savings account suits households and pays a little interest. Recurring and fixed deposits lock money in for a period, so the bank can lend it for longer and pays a higher rate.',
    }),
    sl('check', 'Quick check: choosing a deposit', {
      b: 'A retired teacher wants the highest interest on a lump sum she will not need for three years. Which deposit suits her?',
      chk: 'm_fixed_deposit',
      n: 'Think about how long she can leave the money untouched, and which deposit rewards that.',
    }),
    sl('concept', 'Advancing loans', {
      b: 'Banks lend through **cash credit**, **overdrafts**, **discounting bills** and **demand or term loans**.',
      v: vLoans,
      n: 'The money deposited is lent out in several forms. Cash credit lets a firm draw up to a limit against security. An overdraft lets a current-account holder go beyond the balance. Discounting pays a trader the value of a bill before it falls due. Term loans finance machines and buildings. The interest earned is the bank\'s main income.',
    }),
    sl('example', 'Worked example 1: three customers, three accounts', {
      b: 'Match an account to each imagined Lucknow customer.',
      bl: ['A chemist paying and receiving many times a day: **current account**.', 'A student saving a little each month: **recurring deposit**.', 'A farmer needing money in two years: **fixed deposit**.', 'Rule: the more often money is needed, the more liquid the account.'],
      v: vDeposits,
      n: 'Let us match accounts to people. The chemist makes many transactions daily, so only a current account will do. The student can put away a small fixed sum every month, which is what a recurring deposit is for. The farmer will not touch his money for two years, so a fixed deposit earns him the most.',
    }),
    sl('check', 'Quick check: a kind of deposit', {
      b: 'Deposits that can be withdrawn at any time are called ___ deposits.',
      chk: 'fb_demand_dep',
      n: 'Current and savings deposits are payable whenever the depositor asks. What are they called?',
    }),
    sl('concept', 'Credit creation: the idea', {
      b: 'A bank keeps only a **reserve** (the **legal reserve ratio**) and lends the rest. The loan is spent and **redeposited**, so banks can lend again.',
      v: vCreateFlow,
      n: 'Here is the key idea. Banks must keep only part of every deposit as a reserve. They lend the rest. The borrower spends the loan, and the seller deposits it in a bank. That bank keeps its reserve and lends again. Each round is smaller, but together they add up to many times the first deposit.',
    }),
    sl('example', 'Worked example 2: Vasundhara Bank', {
      b: `An imagined cooperative deposits **₹${inr(V.D)}**; reserve ratio **20 per cent**.`,
      bl: [`Round 1: keep ${inr(V_ROUNDS[0].reserve)}, lend ${inr(V_ROUNDS[0].loan)}.`, `Round 2: deposit ${inr(V_ROUNDS[1].deposit)}, keep ${inr(V_ROUNDS[1].reserve)}, lend ${inr(V_ROUNDS[1].loan)}.`, `Total deposits = ${inr(V.D)} ÷ 0.2 = **₹${inr(V_TD)}**.`, `Credit created = ${inr(V_TD)} − ${inr(V.D)} = **₹${inr(V_CC)}**.`],
      v: vRoundsTable,
      n: 'A weavers\' cooperative deposits fifty thousand rupees. The bank keeps ten thousand, one fifth, and lends forty thousand. That forty thousand returns as a deposit somewhere, and thirty-two thousand is lent. When all the rounds are done, total deposits reach two lakh fifty thousand, and the loans, the credit created, come to two lakh.',
    }),
    sl('diagram', 'The rounds shrink', {
      v: vRoundBars,
      n: 'Each bar is one round. The pale top fifth of each bar is held back as a reserve, and the rest is lent and becomes the next, shorter bar. That is why the process cannot go on for ever: every round leaks one fifth into reserves, until the whole first deposit is held as reserves somewhere.',
    }),
    sl('check', 'Quick check: total deposits', {
      b: `A deposit of ₹${inr(V.D)}, a 20 per cent reserve ratio. Total deposits?`,
      chk: 'n_vas_total',
      n: 'Divide the first deposit by the reserve ratio, written as a fraction.',
    }),
    sl('concept', 'The credit multiplier', {
      b: '**Credit multiplier = 1 ÷ legal reserve ratio**. A **higher** ratio means a **smaller** multiplier.',
      v: vMultTable,
      n: 'The number of times deposits expand is the credit multiplier, one divided by the reserve ratio. With a ten per cent ratio the multiplier is ten; with twenty-five per cent it is only four. So when the central bank raises the reserve ratio, the banks\' power to create credit shrinks.',
    }),
    sl('diagram', 'Reserve ratio and total deposits', {
      v: vRatioBars,
      n: 'Here the same one thousand crore of primary deposits is run through four different reserve ratios. At ten per cent, banks can build deposits of ten thousand crore. At twelve and a half per cent, eight thousand. At twenty-five per cent, only four thousand. Raising the ratio is a powerful brake on credit.',
    }),
    sl('example', 'Worked example 3: the ratio is raised in Swarnapur', {
      b: `Primary deposits **₹${inr(SW.D)} crore**; ratio raised from **10** to **12.5 per cent**.`,
      bl: [`Before: ${inr(SW.D)} ÷ 0.1 = ₹${inr(SW_TD1)} crore.`, `After: ${inr(SW.D)} ÷ 0.125 = ₹${inr(SW_TD2)} crore.`, `Fall: ₹${inr(SW_FALL)} crore of deposits.`],
      v: vMultTable,
      n: 'In the imagined Swarnapur economy, primary deposits are one thousand crore. With a ten per cent ratio, banks can build deposits of ten thousand crore. When the central bank raises the ratio to twelve and a half per cent, the total falls to eight thousand crore, two thousand crore less. That is how a ratio rise contracts credit.',
    }),
    sl('concept', 'Limits on credit creation', {
      b: 'The formula is a **maximum**. Real credit creation is smaller because of **cash drain**, lack of **willing borrowers** or **security**, and **central bank policy**.',
      v: vLimits,
      n: 'In practice, banks create less than the formula says. People keep some cash at home, so it never returns as a deposit. Banks can lend only to people who want loans and can offer sound security. And the central bank can raise the reserve ratio at any time. Each of these limits shrinks the rounds.',
    }),
    sl('concept', 'High-powered money', {
      b: '**High-powered money** = **currency held by the public** + **cash reserves of banks**. Deposits are built on it **many times over**.',
      v: vHPM,
      n: 'All this credit rests on a base called high-powered money: the currency people hold plus the cash reserves of banks. It is called high-powered because banks build deposits several times larger on the reserves part. So when this base changes, the money supply changes by a multiple.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Commercial banks accept deposits and advance loans, and add agency and utility services. Because they keep only a reserve and lend the rest, deposits expand by the credit multiplier, one over the reserve ratio. Leakages and policy keep actual credit below that maximum. High-powered money is the base on which it all rests.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the formula first: **total deposits = initial deposit ÷ reserve ratio**.',
        'Credit created = total deposits **minus** the initial deposit.',
        'In round tables, each new deposit equals the **previous loan**.',
        'For limitations, name the **cash drain**, borrowers and security, and the reserve ratio.',
        'High-powered money: **currency with the public + bank reserves**, not public deposits.',
      ],
      v: vRoundsTable,
      n: 'Write the formula before you use it. Remember that credit created is total deposits minus the first deposit. In a table of rounds, every new deposit equals the loan of the round before. When asked about limits, give the cash drain, borrowers and security, and the reserve ratio. And define high-powered money correctly.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Commercial Banks and the Central Bank — Part 2: The Reserve Bank and Credit Control',
  goals: [
    'Explain the functions of the Reserve Bank of India',
    'Explain how each quantitative instrument changes the flow of credit, and recommend its direction',
    'Distinguish quantitative from qualitative methods and explain the qualitative tools',
  ],
  slides: [
    sl('title', 'The Reserve Bank and Credit Control', {
      b: 'Part 2 — the **Reserve Bank of India**, its **functions**, and the **quantitative** and **qualitative** tools it uses to control credit.',
      v: flow('LR', ['Functions of the RBI', 'Lender of last resort', 'Quantitative tools', 'Qualitative tools', 'Choosing tools'], 'Route map of Part 2: functions of the Reserve Bank, its role as lender of last resort, quantitative and qualitative tools, and choosing between them', 'Part 2 at a glance'),
      n: 'Commercial banks create credit, but someone must keep that power in check. In India that is the Reserve Bank, set up in nineteen thirty-five and nationalised in nineteen forty-nine. In this part we see what it does, and how it uses its tools to expand or contract credit.',
    }),
    sl('diagram', 'Functions of the Reserve Bank', {
      v: vRBI,
      n: 'The Reserve Bank issues all currency notes except the one-rupee note. It is banker to the government and to the banks. It lends to banks in a crisis, holds the country\'s foreign exchange reserves, and controls credit. Unlike a commercial bank, it does not work for profit but for stable prices and a stable banking system.',
    }),
    sl('concept', 'Banker to the government and to banks', {
      b: 'It keeps the **government\'s accounts** and **manages its debt**; it holds **banks\' reserves**, **clears** their claims and **supervises** them.',
      v: vCBvsRBI,
      n: 'For the government, the Reserve Bank keeps accounts, makes payments and arranges borrowing by selling bonds. For banks, it does what banks do for us: it holds their reserves, settles what they owe one another, and lends to them. That is why it is called the bankers\' bank.',
    }),
    sl('diagram', 'Lender of last resort', {
      b: 'When a **sound bank** cannot get cash anywhere else, the central bank **lends to it**, so a panic does not spread.',
      v: vLOLR,
      n: 'Imagine a false rumour sends depositors rushing to a sound bank. It cannot sell its loans quickly, and other lenders hold back. The Reserve Bank lends to it against securities, depositors are paid, and confidence returns. This role as lender of last resort protects the whole banking system.',
    }),
    sl('check', 'Quick check: which function?', {
      b: 'A sound bank facing a rush of withdrawals borrows from the RBI. Which function is at work?',
      chk: 'm_lolr_case',
      n: 'Who does a bank turn to when no one else will lend?',
    }),
    sl('concept', 'Quantitative tools: rates', {
      b: '**Repo rate**: short-term loans to banks against securities. **Reverse repo**: what the central bank pays on banks\' surplus funds. **Bank rate**: longer-term lending or rediscounting.',
      v: vQuant,
      n: 'Quantitative tools change the total volume and cost of credit. The repo rate is what banks pay for short-term funds from the central bank against government securities. The reverse repo rate is what the central bank pays when banks park surplus funds with it. The bank rate applies to longer-term lending. Raising any of them makes credit dearer.',
    }),
    sl('diagram', 'How a repo rate rise works', {
      v: vRepoUp,
      n: 'Follow a rise in the repo rate. Banks now pay more for funds, so they charge more on their own loans. Households and firms borrow less, so they spend less on homes, cars and machines. With lower demand, the pressure on prices eases. A cut works the other way, encouraging borrowing and spending.',
    }),
    sl('concept', 'Quantitative tools: reserve ratios', {
      b: '**CRR**: share of deposits kept as **cash with the central bank**. **SLR**: share kept by the bank **itself** in **liquid assets**. Raising either leaves **less to lend**.',
      v: vSplit,
      n: 'Two ratios lock up part of every deposit. The cash reserve ratio is kept as cash with the central bank. The statutory liquidity ratio is kept by the bank itself in cash, gold and approved government securities. Here, with imagined ratios, an imagined bank with six hundred crore of deposits can lend only four hundred and fifty crore.',
    }),
    sl('check', 'Quick check: where the SLR is kept', {
      b: 'Under the SLR, a bank must keep a share of its deposits…',
      chk: 'm_slr_where',
      n: 'Is the statutory liquidity ratio kept with the central bank, or by the bank itself?',
    }),
    sl('example', 'Worked example 1: lendable funds', {
      b: `Imagined bank: deposits **₹${LF.dep} crore**; imagined CRR **5 per cent**, SLR **20 per cent**.`,
      bl: [`CRR: 0.05 × ${LF.dep} = ${LF_CRR}.`, `SLR: 0.2 × ${LF.dep} = ${LF_SLR}.`, `Lendable: ${LF.dep} − ${LF_CRR} − ${LF_SLR} = **${LF_LEND}**.`],
      v: vSplit,
      n: 'Let us compute. Five per cent of six hundred crore is thirty crore, kept as cash with the central bank. Twenty per cent is one hundred and twenty crore, held in liquid assets. What remains, four hundred and fifty crore, is what the bank can lend. Raise either ratio and that figure falls.',
    }),
    sl('check', 'Quick check: compute lendable funds', {
      b: 'With the imagined ratios above, how much can the bank lend?',
      chk: 'n_lendable',
      n: 'Subtract both required holdings from total deposits.',
    }),
    sl('diagram', 'Open market operations', {
      b: '**Selling** securities **drains** bank reserves; **buying** them **adds** reserves.',
      v: vOMO,
      n: 'In open market operations the central bank buys or sells government securities. When it sells, buyers pay out of their bank deposits, so banks lose reserves and must lend less. When it buys, it pays money into the banking system, reserves rise and banks can lend more.',
    }),
    sl('concept', 'Qualitative (selective) tools', {
      b: 'They steer the **direction** of credit: **margin requirements**, **credit rationing**, **moral suasion**, **direct action**.',
      v: vQual,
      n: 'Sometimes the problem is not the total amount of credit but where it goes, for example into hoarding gold or land. Then the central bank uses selective tools. It can raise margins on loans against those goods, set ceilings on such loans, persuade banks to go slow, or take direct action against banks that ignore it.',
    }),
    sl('example', 'Worked example 2: a higher margin on pulses', {
      b: 'An imagined trader offers pulses worth **₹10 lakh** as security.',
      bl: ['Margin 30 per cent: loan = 70 per cent = **₹7 lakh**.', 'Margin 50 per cent: loan = 50 per cent = **₹5 lakh**.', 'Less credit for hoarding pulses; other borrowers are not touched.'],
      v: vMargin,
      n: 'Here is how a margin works. With a thirty per cent margin, a trader can borrow seventy per cent of the value of his pulses, seven lakh rupees. If the central bank raises the margin to fifty per cent, he can borrow only five lakh. Hoarding with borrowed money becomes harder, while credit for everyone else is unchanged.',
    }),
    sl('check', 'Quick check: name the method', {
      b: 'The governor meets bank heads and urges them, without any order, to slow loans for land. This is…',
      chk: 'm_moral_suasion',
      n: 'Is there a legal order here, or only persuasion?',
    }),
    sl('two-column', 'Quantitative or qualitative?', {
      cols: [
        '**Quantitative**\n\n- Control the **total volume and cost** of credit.\n- Affect **all** borrowers.\n- Repo, reverse repo, bank rate, CRR, SLR, open market operations.',
        '**Qualitative**\n\n- Control the **direction** of credit.\n- Aim at **particular uses**.\n- Margins, rationing, moral suasion, direct action.',
      ],
      v: vQvQ,
      n: 'Use quantitative tools when the whole economy has too much or too little spending, because they change credit for everyone. Use qualitative tools when the trouble is confined to a few goods or sectors, because they target credit for those uses only. Often the two are used together.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The Reserve Bank issues currency, serves the government and the banks, rescues sound banks in a crisis and holds foreign exchange. It controls credit with quantitative tools that change its volume and cost, and with qualitative tools that change its direction. Against inflation, rates and ratios go up and securities are sold.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For every instrument, state the **direction** (raise or cut, buy or sell) and the **chain** to spending.',
        'CRR is held **with the central bank**; SLR is held **by the bank itself**.',
        'Repo: central bank **lends** to banks; reverse repo: central bank **borrows** from banks.',
        'Do not quote current rates or ratios; explain the mechanism.',
        'Name the RBI\'s dates correctly: **1935** and **1949**.',
      ],
      v: vQuant,
      n: 'Whenever you name an instrument, say which way it moves and how that changes borrowing and spending. Keep the two ratios apart by where the reserve is held. Remember that under a repo the central bank lends, and under a reverse repo it borrows. Never rely on current rates; explain how the tool works.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Commercial Banks and the Central Bank — Notes',
  sections: [
    {
      h: '1. Functions of commercial banks',
      t: 1,
      b: '- **Primary**: (a) **accepting deposits**: demand deposits (current, savings) and time deposits (recurring, fixed); (b) **advancing loans**: cash credit, overdrafts, discounting bills of exchange, demand and term loans.\n- **Secondary**: **agency** functions (collecting cheques and dividends, paying bills and premiums, buying and selling securities for customers) and **general utility** functions (lockers, letters of credit, drafts, traveller\'s cheques, debit cards).\n- A bank earns mainly from the **difference** between the interest it charges on loans and the interest it pays on deposits.',
      terms: [['Demand deposit', 'A deposit payable whenever the depositor asks, such as a current or savings deposit.'], ['Time deposit', 'A deposit kept for a fixed period, such as a fixed or recurring deposit.'], ['Overdraft', 'Permission to draw more than the current-account balance, up to a limit.']],
      v: vDeposits,
      vs: [vLoans, vFunctions],
    },
    {
      h: '2. Credit creation',
      t: 2,
      b: `- Banks keep only the **legal reserve ratio (LRR)** of each deposit and **lend the rest**; the loan is spent and **redeposited**, so lending repeats in smaller rounds.\n- **Credit multiplier = 1 ÷ LRR**; **total deposits = initial deposit ÷ LRR**; **credit created = total deposits − initial deposit**.\n- Imagined Vasundhara Bank: ₹${inr(V.D)} at 20 per cent: multiplier ${V_K}, total deposits **₹${inr(V_TD)}**, credit **₹${inr(V_CC)}**; the first four rounds alone add up to ₹${inr(V_FIRST4)}.\n- Assumptions: all loans return as deposits; banks hold only the required reserve; there are enough willing, creditworthy borrowers.`,
      terms: [['Legal reserve ratio', 'The minimum share of deposits that banks must hold as reserves.'], ['Credit multiplier', 'The number of times total deposits exceed the initial deposit: one divided by the reserve ratio.']],
      v: vRoundBars,
      vs: [vRoundsTable, vCreateFlow],
    },
    {
      h: '3. Limitations of credit creation; high-powered money',
      t: 2,
      b: `- **Limitations**: the reserve ratio; **cash drain** (cash kept by the public); shortage of **willing borrowers**; need for **sound security**; **central bank policy**; banks may keep **excess reserves**.\n- Raising the ratio lowers the multiplier: imagined Swarnapur, ₹${inr(SW.D)} crore of primary deposits, 10 per cent → **₹${inr(SW_TD1)} crore**, 12.5 per cent → **₹${inr(SW_TD2)} crore**.\n- **High-powered money** (reserve money) = **currency held by the public + cash reserves of banks**. Imagined example: ${HP.currency} + ${HP.reserves} = **₹${HP_H} crore**.`,
      terms: [['Cash drain', 'Money kept as cash by the public, which does not return to banks as deposits.'], ['High-powered money', 'Currency with the public plus banks\' cash reserves; the base on which deposits are built.']],
      v: vRatioBars,
      vs: [vMultTable, vLimits, vHPM],
    },
    {
      h: '4. The Reserve Bank of India: functions',
      t: 3,
      b: '- Set up in **1935** (under the RBI Act, 1934); **nationalised in 1949**.\n- **Bank of issue**: sole issuer of currency notes except one-rupee notes (issued, like coins, by the Government of India).\n- **Banker, agent and adviser to the government**: accounts, payments, management of public debt.\n- **Bankers\' bank and supervisor**: holds reserves, clears claims, regulates banks.\n- **Lender of last resort**: lends to sound banks in a crisis.\n- **Custodian of foreign exchange reserves** and **controller of credit**.',
      terms: [['Lender of last resort', 'The central bank\'s role of lending to banks when no other source of funds is available.'], ['Bank of issue', 'The authority with the sole right to issue currency notes.']],
      v: vRBI,
      vs: [vLOLR, vCBvsRBI],
    },
    {
      h: '5. Quantitative credit control',
      t: 4,
      b: `- **Repo rate**: rate at which the central bank lends short-term to banks against government securities (a repurchase agreement). **Reverse repo rate**: rate it pays when banks park surplus funds with it. **Bank rate**: rate for longer-term lending or rediscounting bills.\n- **CRR**: share of deposits held as **cash with the central bank**. **SLR**: share held by banks **themselves** in cash, gold and approved securities.\n- **Open market operations**: selling securities drains reserves; buying adds them.\n- Against **inflation**: raise rates and ratios, sell securities. Against **deficient demand**: the reverse.\n- Imagined bank: deposits ${LF.dep}, CRR 5 per cent, SLR 20 per cent: lendable **${LF_LEND}** crore.`,
      terms: [['Repo rate', 'The rate at which the central bank lends short-term funds to banks against government securities.'], ['Reverse repo rate', 'The rate the central bank pays banks on surplus funds they place with it.'], ['Open market operations', 'Purchase and sale of government securities by the central bank.']],
      v: vQuant,
      vs: [vRepoUp, vOMO, vSplit],
    },
    {
      h: '6. Qualitative (selective) credit control',
      t: 5,
      b: '- **Margin requirements**: raising the margin reduces the loan available against a security.\n- **Credit rationing**: ceilings or quotas on credit for particular purposes.\n- **Moral suasion**: persuasion and advice to banks, without legal force.\n- **Direct action**: penalties or denial of facilities for banks that ignore directions.\n- **Quantitative vs qualitative**: volume and cost for all borrowers versus direction and use for particular purposes; selective tools suit price rises in a **few commodities**, but can be **evaded**.',
      terms: [['Margin requirement', 'The part of a security\'s value that a bank does not lend against.'], ['Moral suasion', 'The central bank\'s persuasion of banks to follow its policy, without legal compulsion.'], ['Direct action', 'Punitive steps against a bank that ignores the central bank\'s directions.']],
      v: vQual,
      vs: [vQvQ, vMargin],
    },
  ],
  tips: '**Common mistakes**\n- Saying credit created equals total deposits (subtract the initial deposit).\n- Saying the SLR is kept with the central bank (only the CRR is).\n- Mixing up repo (central bank lends) and reverse repo (central bank borrows).\n- Writing that banks can create unlimited credit.\n- Quoting current policy rates instead of explaining how a tool works.\n\n**How marks are usually awarded**\n- 1 mark: one correct choice or a precise term.\n- 2 marks: a definition with an example, or two short points.\n- 3 marks: a calculation in three steps or three distinct points.\n- 5 marks: parts with working and reasons; ISC 4- and 8-mark questions are set as 2 + 2 and 4 + 4.\n\nAll banks, economies and figures in SOYL practice are imagined; state units in every answer.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Two **primary functions** of a commercial bank', 'Accepting deposits; advancing loans.', 'definition', 1],
  ['**Demand deposits**', 'Current and savings deposits, payable on demand.', 'definition', 1],
  ['**Time deposits**', 'Fixed and recurring deposits, kept for a period.', 'definition', 1],
  ['Account that suits a busy trader', '**Current account**: unlimited transactions, usually no interest.', 'example', 1],
  ['**Overdraft**', 'Drawing beyond the current-account balance up to a limit.', 'definition', 1],
  ['**Discounting a bill**', 'Paying a bill before it is due, less a discount.', 'definition', 1],
  ['Example of an **agency** function', 'Collecting cheques or paying premiums for a customer.', 'example', 1],
  ['Example of a **utility** function', 'Lockers or letters of credit.', 'example', 1],
  ['**Credit multiplier**', '**1 ÷ legal reserve ratio**.', 'formula', 2],
  ['**Total deposits**', 'Initial deposit ÷ reserve ratio.', 'formula', 2],
  ['**Credit created**', 'Total deposits − initial deposit.', 'formula', 2],
  ['Vasundhara Bank (imagined)', `₹${inr(V.D)} at 20 per cent: deposits **₹${inr(V_TD)}**, credit **₹${inr(V_CC)}**.`, 'example', 2],
  ['Effect of a higher reserve ratio', 'Smaller multiplier; **less** credit.', 'concept', 2],
  ['**Cash drain**', 'Cash kept by the public that never returns as deposits.', 'definition', 2],
  ['Three limits on credit creation', 'Reserve ratio; cash drain; willing borrowers and security.', 'concept', 2],
  ['**High-powered money**', 'Currency with the public + cash reserves of banks.', 'definition', 2],
  ['RBI: set up and nationalised', '**1935**; **1949**.', 'fact', 3],
  ['Who issues one-rupee notes?', 'The **Government of India** (the RBI issues all other notes).', 'fact', 3],
  ['**Lender of last resort**', 'Central bank lends to a sound bank when no one else will.', 'definition', 3],
  ['Why "bankers\' bank"?', 'Holds banks\' reserves, clears their claims, lends to them.', 'concept', 3],
  ['Custodian role', 'Holds foreign currencies and gold; steadies the rupee.', 'fact', 3],
  ['**Repo rate**', 'Central bank **lends** short-term to banks against securities.', 'definition', 4],
  ['**Reverse repo rate**', 'Central bank **borrows** banks\' surplus funds.', 'definition', 4],
  ['**CRR** vs **SLR**', 'CRR: cash with the central bank. SLR: liquid assets kept by the bank.', 'exam-tip', 4],
  ['Open market **sale**', 'Drains bank reserves: credit contracts.', 'concept', 4],
  ['Quantitative steps against inflation', 'Raise repo, bank rate, CRR, SLR; sell securities.', 'concept', 4],
  ['**Margin requirement** raised', 'Smaller loan against the same security.', 'concept', 5],
  ['**Moral suasion**', 'Persuasion of banks without legal force.', 'definition', 5],
  ['**Direct action**', 'Penalties on banks that ignore the central bank.', 'definition', 5],
  ['Quantitative vs qualitative', 'Volume and cost for all vs direction for particular uses.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Commercial Banks and the Central Bank',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_cb_primary', 'm_kosi_total', 'm_banker_govt', 'm_inflation_mix', 'ar_current_trader'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_primary_two', { attempt: 1, keys: ['s_hpm_meaning', 's_crr_slr'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_vas_rounds', { attempt: 1, keys: ['s3_three_tools_swarnapur', 's3_bankers_bank'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_credit_process'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Commercial Banks and the Central Bank',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_overdraft', 'm_discounting', 'm_agency_function', 'm_hpm_parts', 'm_cash_drain', 'm_lrr_raised', 'm_custodian', 'm_rbi_history', 'm_reverse_up', 'm_crr_cut', 'ar_cash_leak', 'ar_crr_slr'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_agency_utility', 's_limits_two', { attempt: 1, keys: ['s_lolr_meaning', 's_qual_quant'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_loan_forms', 's3_ratio_change', 's3_bank_rate_chain', { attempt: 1, keys: ['s3_cb_vs_rbi', 's3_pulses_hoarding'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_credit_limits', { attempt: 1, keys: ['l_rbi_roles', 'l_quant_tools'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch14 only (functions of commercial banks; credit creation, its limitations and high-powered money; functions of the RBI; quantitative credit control; qualitative credit control)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every bank, economy, person, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch02 and ISC 12 Economics ch12',
    data: `figures computed in questions.mjs and asserted: Vasundhara ₹${inr(V.D)} at 20 per cent: multiplier ${V_K}, deposits ${inr(V_TD)}, credit ${inr(V_CC)}; Swarnapur ₹${inr(SW.D)} crore at 10 and 12.5 per cent: ${inr(SW_TD1)} and ${inr(SW_TD2)}; Kosi ₹${KO.D} crore at 25 per cent: ${KO_TD} and ${KO_CC}; high-powered money ${HP.currency} + ${HP.reserves} = ${HP_H}; lendable funds ${LF.dep} − ${LF_CRR} − ${LF_SLR} = ${LF_LEND} (imagined ratios)`,
    facts: 'RBI set up in 1935 under the RBI Act, 1934, nationalised in 1949; sole issuer of notes except the one-rupee note; policy tools given as directions only, no current rates or ratios',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
