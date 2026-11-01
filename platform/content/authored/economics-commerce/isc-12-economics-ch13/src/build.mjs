// Build ISC 12 Economics ch13 Money and Inflation. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch13/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
// Removed topics (ISC 2027): money-supply measures beyond their meaning (no aggregate calculations) and diagrams of
// demand-pull and cost-push inflation (inflation is shown only with price-index tables and charts).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch13', 'economics-commerce');
const {
  r3, inflation, purchasingPower, SONAPUR, SON_INF2, SON_INF3, SON_PP1, BASKET, BASKET_IDX, BASKET_INF, SALARY, SALARY_REAL, PP_200,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };
const inr = (n) => r3(n).toLocaleString('en-IN');

// ---------------------------------------------------------------- SVG figures
// (1) Functions of money: root box and three groups.
const vFuncTree = (() => {
  const s = new Svg(640, 370);
  s.rect(220, 14, 200, 40, { fill: 'fill', color: 'accent', sw: 1.6 });
  s.text(320, 34, 'Functions of money', { bold: true, size: 15 });
  const cols = [
    { x: 110, head: 'Primary', items: ['Medium of exchange', 'Measure of value'] },
    { x: 320, head: 'Secondary', items: ['Deferred payments', 'Store of value', 'Transfer of value'] },
    { x: 530, head: 'Contingent', items: ['Basis of credit', 'Distributing income', 'Liquidity', 'Guarantor of solvency'] },
  ];
  for (const c of cols) {
    s.arrow(320, 54, c.x, 96, { sw: 1.4, color: 'muted' });
    s.rect(c.x - 90, 100, 180, 36, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(c.x, 118, c.head, { bold: true, size: 14, color: 'accent' });
    s.rect(c.x - 95, 146, 190, 206, { color: 'muted', sw: 1.2 });
    c.items.forEach((t, i) => s.text(c.x, 172 + i * 44, t, { size: 13 }));
  }
  return s.visual(
    'Tree diagram of the functions of money: primary functions are medium of exchange and measure of value; secondary functions are standard of deferred payments, store of value and transfer of value; contingent functions are basis of credit, distributing national income, liquidity and guarantor of solvency',
    'Three groups of functions, as classified for ISC.',
  );
})();

// (2) Liquidity ladder M1 → M4 (schematic: order only).
const vLadder = (() => {
  const s = new Svg(560, 340);
  const base = 280;
  const bars = [
    { m: 'M1', h: 200, note: 'Most liquid' },
    { m: 'M2', h: 160, note: '' },
    { m: 'M3', h: 120, note: '' },
    { m: 'M4', h: 80, note: 'Least liquid' },
  ];
  s.line(40, base, 520, base, { sw: 1.6 });
  bars.forEach((b, i) => {
    const x = 70 + i * 115;
    s.rect(x, base - b.h, 80, b.h, { fill: 'fill', color: 'accent', sw: 1.4, rx: 3 });
    s.text(x + 40, base + 18, b.m, { bold: true, size: 14 });
    if (b.note) s.text(x + 40, base - b.h - 14, b.note, { size: 12, color: 'accent' });
  });
  s.arrow(70, 40, 470, 40, { sw: 1.4, color: 'muted' });
  s.text(270, 26, 'Liquidity falls as savings and time deposits are added', { size: 12, muted: true });
  return s.visual(
    'Schematic bar chart of the four money-supply measures from left to right, M1, M2, M3 and M4, with bars getting shorter to show that liquidity falls from M1, the most liquid, to M4, the least liquid; the bars show order only, not amounts',
    'Schematic: order of liquidity only, not amounts.',
  );
})();

// (3) Sonapur price index bars (imagined).
const vSonapur = (() => {
  const s = new Svg(500, 360);
  const c = s.chart({ x1: 4, y1: 170, left: 70, top: 34, width: 360, height: 270, xLabel: 'Year', yLabel: 'Price index (base year = 100)' });
  SONAPUR.forEach((r, i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.3), x1 = c.X(x + 0.3);
    s.rect(x0, c.Y(r.idx), x1 - x0, c.Y(0) - c.Y(r.idx), { fill: 'fill', color: 'accent', sw: 1.4, rx: 2 });
    c.label([x, r.idx], String(r.idx), { dy: -10, size: 12, bold: true });
    c.xTick(x, String(x));
  });
  c.yTick(100, '100');
  c.seg([0, 100], [4, 100], { color: 'muted', sw: 1.2, dash: true });
  return s.visual(
    `Bar chart of the consumer price index of the imagined town of Sonapur for three years: ${SONAPUR.map((r) => r.idx).join(', ')}, all above the base-year level of 100 shown by a dashed line; the index rises by ${SON_INF2} per cent in year 2 and ${SON_INF3} per cent in year 3`,
    `Imagined figures: inflation ${SON_INF2}% in Year 2 and ${SON_INF3}% in Year 3.`,
  );
})();

// (4) Purchasing power of a rupee against the price index: PP = 100 ÷ index.
const vPP = (() => {
  const s = new Svg(500, 380);
  const c = s.chart({ x0: 100, x1: 260, y0: 0, y1: 1.2, left: 70, top: 34, width: 350, height: 280, xLabel: 'Price index', yLabel: 'Purchasing power of ₹1 (base-year ₹)' });
  c.fn((x) => 100 / x, 100, 250, { color: 'accent', sw: 2.8 });
  const pts = [[100, 1], [SONAPUR[0].idx, SON_PP1], [200, PP_200]];
  assert(purchasingPower(100) === 1 && purchasingPower(SONAPUR[0].idx) === SON_PP1 && purchasingPower(200) === PP_200, 'pp points');
  pts.forEach((p) => c.dot(p, 'accent').drop(p));
  c.xTick(SONAPUR[0].idx, String(SONAPUR[0].idx)).xTick(200, '200').xTick(250, '250');
  c.yTick(1, '1').yTick(SON_PP1, String(SON_PP1)).yTick(PP_200, String(PP_200));
  c.label([200, PP_200], 'Prices double: ₹1 buys half', { anchor: 'start', dx: 8, dy: -14, size: 12, color: 'accent' });
  return s.visual(
    `Curve of the purchasing power of one rupee against the price index: at an index of 100 it is 1, at ${SONAPUR[0].idx} it is ${SON_PP1}, and at 200 it is ${PP_200}; as the price index rises, each rupee buys less`,
    'Purchasing power = 100 ÷ price index (imagined figures).',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vBarter = table(
  ['Difficulty of barter', 'What goes wrong (imagined haat)'],
  [
    ['Double coincidence of wants', 'The potter wants rice; the rice grower wants sandals, not pots'],
    ['No common measure of value', 'How many pots equal one goat? A new rate for every swap'],
    ['Indivisibility', 'A goat cannot be split to buy a small sack of salt'],
    ['No store of value', 'Fish and vegetables rot before they can be traded'],
    ['No standard of deferred payment', 'A loan of rice repaid in rice may differ in quality'],
  ],
  'Table of five difficulties of barter with examples from an imagined village market: double coincidence of wants, no common measure of value, indivisibility of goods, no store of value and no standard of deferred payment',
);
const vEvolution = flow('LR', ['Barter', 'Commodity money', 'Metallic coins', 'Paper money', 'Bank (credit) money'], 'Flow of the evolution of money: barter, commodity money such as grain or salt, metallic coins, paper money and bank or credit money', 'How money evolved');
const vKinds = table(
  ['Kind', 'Meaning', 'Imagined example'],
  [
    ['Commodity money', 'A useful good accepted in payment', 'Salt bars used to buy cloth'],
    ['Full-bodied coin', 'Metal worth equals face value', 'An old silver coin worth its silver'],
    ['Token coin', 'Face value above metal worth', 'A ₹5 coin with metal worth far less'],
    ['Paper money', 'Notes issued by the monetary authority', 'Currency notes in a wallet'],
    ['Credit (bank) money', 'Deposits moved by cheque or transfer', 'A trader paying a supplier by cheque'],
  ],
  'Table of kinds of money with meanings and imagined examples: commodity money, full-bodied coins, token coins, paper money and credit or bank money',
);
const vLegal = table(
  ['Term', 'Meaning', 'Example'],
  [
    ['Unlimited legal tender', 'Must be accepted for any amount', 'Currency notes'],
    ['Limited legal tender', 'Must be accepted only up to a legal limit', 'Small coins'],
    ['Optional (non-legal-tender) money', 'May be refused', 'Cheques, drafts'],
    ['Fiat money', 'Money by government order; value not from its material', 'Modern notes and coins'],
  ],
  'Table of legal tender terms: unlimited legal tender such as notes, limited legal tender such as small coins, optional money such as cheques, and fiat money issued by government order',
);
const vNear = table(
  ['', 'Money', 'Near money'],
  [
    ['Used directly to pay for goods?', 'Yes', 'No'],
    ['Liquidity', 'Perfect', 'High, but must first be turned into cash'],
    ['Examples (imagined family)', 'Cash, current-account balance', 'Fixed deposit, treasury bill, bond'],
  ],
  'Table comparing money and near money: money pays for goods directly and is perfectly liquid; near money such as a fixed deposit or treasury bill is highly liquid but must first be converted into cash',
);
const vClassify = table(
  ['Holding of an imagined Bhopal family', 'Money or near money?', 'Reason'],
  [
    ['₹6,000 in cash at home', 'Money', 'Legal tender, spent at once'],
    ['Current-account balance', 'Money', 'Usable by cheque or transfer'],
    ['One-year fixed deposit', 'Near money', 'Must be withdrawn first'],
    ['Government treasury bill', 'Near money', 'Must be sold for cash'],
  ],
  'Table classifying four holdings of an imagined family: cash and a current-account balance are money; a fixed deposit and a treasury bill are near money',
);
const vPrimary = table(
  ['Primary function', 'What it does', 'Imagined example'],
  [['Medium of exchange', 'Splits a swap into a sale and a purchase', 'A weaver sells a saree, then buys yarn'], ['Measure of value', 'Expresses all values in one unit', 'A dairy records milk, fodder and wages in rupees']],
  'Table of the two primary functions of money: medium of exchange, which splits a swap into a sale and a purchase, and measure of value, which expresses all values in one unit',
);
const vSecondary = table(
  ['Secondary function', 'What it does', 'Imagined example'],
  [
    ['Standard of deferred payments', 'Future payments fixed in money', 'A seed loan repaid in rupees after harvest'],
    ['Store of value', 'Holds purchasing power for later', 'A vendor saves money, not tomatoes'],
    ['Transfer of value', 'Moves purchasing power between places or people', 'Selling a house in Bihar to buy a flat in Bengaluru'],
  ],
  'Table of the three secondary functions of money: standard of deferred payments, store of value and transfer of value, with imagined examples',
);
const vContingent = table(
  ['Contingent function', 'Meaning'],
  [
    ['Basis of credit', 'Loans and deposits are claims to money'],
    ['Distribution of national income', 'Output is shared as wages, rent, interest and profit in money'],
    ['Equalising marginal utilities', 'Spending can be spread so each rupee gives similar satisfaction'],
    ['Liquidity', 'Money is the most liquid asset'],
    ['Guarantor of solvency', 'Holding money shows ability to pay debts'],
  ],
  'Table of contingent functions of money: basis of credit, distribution of national income, equalising marginal utilities, liquidity and guarantor of solvency',
);
const vDairyDay = table(
  ['Event at an imagined Anand dairy', 'Function of money'],
  [
    ['Milk bought from members at a price per litre in rupees', 'Measure of value'],
    ['Members paid in cash every ten days', 'Medium of exchange'],
    ['Loan for a chilling plant repaid over five years', 'Standard of deferred payments'],
    ['Surplus kept in the bank for the next drought', 'Store of value'],
    ['Bank lends to the dairy against its deposits', 'Basis of credit (contingent)'],
  ],
  'Worked example table matching five events at an imagined dairy to functions of money: pricing milk is a measure of value, paying members is a medium of exchange, repaying a loan is a standard of deferred payments, keeping a surplus is a store of value and a bank loan shows money as the basis of credit',
);
const vSupplyMeaning = flow('LR', ['Stock of money', 'Held by the public (households and firms)', 'At a point of time', 'Excludes government and banks\' own cash'], 'Flow describing money supply: the stock of money held by the public at a point of time, excluding money held by the government and the banking system', 'Money supply: meaning');
const vM0 = table(
  ['Reserve money (M0) = ', 'Meaning'],
  [['Currency in circulation', 'Notes and coins with the public and in bank tills'], ['+ Bankers\' deposits with the RBI', 'Banks\' reserves kept with the central bank'], ['+ Other deposits with the RBI', 'Deposits of some institutions with the central bank']],
  'Table of the components of reserve money: currency in circulation, bankers\' deposits with the central bank and other deposits with the central bank',
  'Also called high-powered money: the base for bank credit.',
);
const vMeasures = table(
  ['Measure', 'Meaning', 'Type'],
  [
    ['M1', 'Currency with the public + demand deposits of banks + other deposits with the RBI', 'Narrow money'],
    ['M2', 'M1 + savings deposits with post office savings banks', 'Narrow money'],
    ['M3', 'M1 + net time deposits of banks', 'Broad money'],
    ['M4', 'M3 + total deposits with the post office savings organisation (excluding National Savings Certificates)', 'Broad money'],
  ],
  'Table of money-supply measures: M1 is currency with the public plus demand deposits plus other deposits with the central bank; M2 adds post office savings bank deposits; M3 adds net time deposits of banks to M1; M4 adds total post office savings deposits to M3; M1 and M2 are narrow money, M3 and M4 broad money',
  'Classic RBI measures as studied for ISC; meanings only.',
);
const vFamilyMeasures = table(
  ['Holding of an imagined Bhopal family', 'First counted in'],
  [['Cash at home', 'M1 (currency with the public)'], ['Current-account deposit', 'M1 (demand deposit)'], ['Post office savings bank deposit', 'M2'], ['Bank fixed deposit', 'M3 (time deposit)']],
  'Worked example table placing an imagined family\'s holdings in the narrowest measure that counts them: cash and a current-account deposit in M1, a post office savings deposit in M2 and a bank fixed deposit in M3',
);
const vInflMeaning = table(
  ['Idea', 'Meaning'],
  [['Inflation', 'A sustained rise in the general price level'], ['Price index', 'Cost of a fixed basket now ÷ cost in the base year × 100'], ['Rate of inflation', '(Index this year − index last year) ÷ index last year × 100'], ['Purchasing power of ₹1', '100 ÷ price index (in base-year rupees)']],
  'Table defining inflation, a price index, the rate of inflation and the purchasing power of a rupee',
);
const vSonTable = table(
  ['Year (imagined Sonapur)', 'Price index', 'Rate of inflation'],
  [[SONAPUR[0].year, String(SONAPUR[0].idx), '—'], [SONAPUR[1].year, String(SONAPUR[1].idx), `${SON_INF2}%`], [SONAPUR[2].year, String(SONAPUR[2].idx), `${SON_INF3}%`]],
  `Table of the imagined Sonapur price index ${SONAPUR.map((r) => r.idx).join(', ')} with inflation rates of ${SON_INF2} and ${SON_INF3} per cent`,
);
const vDP = flow('LR', ['More money supply, public spending or income', 'Aggregate demand rises', 'Economy at full employment: output cannot rise', 'Prices pulled up'], 'Flow of demand-pull inflation: more money supply, public spending or income raises aggregate demand; at full employment output cannot rise, so prices are pulled up', 'Demand-pull inflation (no diagram required)');
const vCP = flow('LR', ['Wages, input prices, margins or indirect taxes rise', 'Cost per unit rises', 'Firms raise prices', 'Prices pushed up without more demand'], 'Flow of cost-push inflation: wages, input prices, profit margins or indirect taxes rise, cost per unit rises, firms raise prices, and prices are pushed up without any rise in demand', 'Cost-push inflation (no diagram required)');
const vCPTypes = table(
  ['Type of cost-push', 'Imagined example'],
  [['Wage-push', 'Factory wages rise far faster than output per worker'], ['Profit-push', 'A few dominant cement firms widen their margins'], ['Input or import costs', 'Imported diesel and fertiliser double in price'], ['Indirect taxes', 'A higher tax on goods raises their price at the shop']],
  'Table of types of cost-push inflation with imagined examples: wage-push, profit-push, higher input or import costs and higher indirect taxes',
);
const vCompare = table(
  ['Point', 'Demand-pull', 'Cost-push'],
  [['Starts from', 'Excess aggregate demand', 'Rising costs of production'], ['Typical causes', 'Money supply, public spending, income, exports', 'Wages, input prices, margins, indirect taxes'], ['Output', 'Usually at full employment; output cannot rise', 'Can occur with idle capacity; output may fall']],
  'Table comparing demand-pull and cost-push inflation by where they start, their causes and their link with output',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Money', 'Anything generally accepted in payment for goods and debts'], ['Kinds', 'Commodity, metallic (full-bodied, token), paper, credit; legal tender, fiat, near money'], ['Primary functions', 'Medium of exchange; measure of value'], ['Secondary functions', 'Deferred payments; store of value; transfer of value'], ['Contingent functions', 'Basis of credit; distributing income; liquidity; solvency']],
  'Summary table of Part 1: meaning of money, its kinds, and its primary, secondary and contingent functions',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Money supply', 'Stock of money with the public at a point of time'], ['M0', 'Reserve (high-powered) money'], ['M1, M2', 'Narrow money'], ['M3, M4', 'Broad money; liquidity falls from M1 to M4'], ['Inflation', 'Sustained rise in prices; demand-pull or cost-push']],
  'Summary table of Part 2: money supply, reserve money, narrow and broad money, and inflation of the demand-pull and cost-push kinds',
);
const vTips1 = table(
  ['Mistake', 'Better'],
  [['"A cheque is money that must be accepted"', 'A cheque is optional money; only legal tender must be accepted'], ['Calling a fixed deposit money', 'It is near money'], ['Listing store of value as a primary function', 'It is a secondary function']],
  'Table of common mistakes in Part 1 with corrections: cheques are optional money, fixed deposits are near money, and store of value is a secondary function',
);
const vTips2 = table(
  ['Mistake', 'Better'],
  [['Rise in index points = rate of inflation', 'Divide the rise by the earlier index'], ['M3 = M2 + time deposits', 'M3 = M1 + net time deposits'], ['Any price rise is inflation', 'Inflation is a sustained rise in the general price level']],
  'Table of common mistakes in Part 2 with corrections about the inflation rate, the definition of M3 and the meaning of inflation',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Money and Inflation — Part 1: Meaning, Kinds and Functions of Money',
  goals: [
    'Explain the difficulties of barter and the meaning of money',
    'Distinguish the kinds of money, legal tender, fiat money and near money',
    'Explain the primary, secondary and contingent functions of money with examples',
  ],
  slides: [
    sl('title', 'Money: Meaning, Kinds and Functions', {
      b: 'Part 1 — why **barter** fails, what **money** is, its **kinds**, and the **functions** it performs.',
      v: vEvolution,
      n: 'Imagine trying to buy a notebook by offering the shopkeeper a bag of potatoes. It would rarely work. In this part we see why such exchanges are so hard, how money grew from grain and coins to notes and bank deposits, what kinds of money exist today, and the many jobs that money does for us.',
    }),
    sl('concept', 'The difficulties of barter', {
      b: 'Under **barter**, goods are swapped directly for goods. Trade is slow and often impossible.',
      v: vBarter,
      n: 'Barter means swapping goods directly. The biggest problem is that both sides must want exactly what the other has. There is also no common unit to measure value, many goods cannot be divided, perishable goods cannot be stored, and loans cannot be repaid fairly. Money solves all these problems.',
    }),
    sl('concept', 'Meaning of money', {
      b: '**Money** is anything that is **generally accepted** as a means of payment for goods and services and in settlement of debts.',
      v: vEvolution,
      n: 'Money is defined by what it does, not by what it is made of. Anything that people generally accept in payment, and in settling debts, can serve as money. Over time societies used grain and salt, then metal coins, then paper notes, and now deposits that move between bank accounts.',
    }),
    sl('concept', 'Kinds of money: from commodities to bank money', {
      b: '**Commodity**, **metallic** (full-bodied or token), **paper** and **credit (bank)** money.',
      v: vKinds,
      n: 'Commodity money is a useful good used in payment. Metallic money is coins; a full-bodied coin contains metal worth its face value, while a token coin is worth more as money than as metal. Paper money is notes issued by the monetary authority. Credit or bank money is deposits that move by cheque or transfer.',
    }),
    sl('concept', 'Legal tender, fiat money and optional money', {
      b: '**Legal tender** must be accepted in payment of debts; **fiat money** gets its value from government order; **cheques** are optional money.',
      v: vLegal,
      n: 'Legal tender is money that the law says must be accepted in payment. Notes are unlimited legal tender, while small coins are limited legal tender, accepted only up to a legal limit. Fiat money has value because the government orders it, not because of its material. A cheque is optional money: a seller may refuse it.',
    }),
    sl('check', 'Quick check: a bag of coins', {
      b: 'A customer tries to pay a large bill entirely in small coins. The baker refuses beyond a limit. The coins are…',
      chk: 'm_limited_tender',
      n: 'Think about what the law says must be accepted, and up to what amount.',
    }),
    sl('concept', 'Money and near money', {
      b: '**Near money** is a highly liquid asset that can quickly be turned into cash but **cannot itself pay** for goods.',
      v: vNear,
      n: 'Some assets are almost as good as money. A fixed deposit, a treasury bill or a bond can be turned into cash quickly and with little loss. But you cannot hand a fixed deposit to a shopkeeper in payment. Such assets are called near money.',
    }),
    sl('check', 'Quick check: near money', {
      b: 'Which asset of an imagined Chennai family is near money?',
      chk: 'm_near_money_eg',
      n: 'Ask of each asset: could the family pay for groceries with it directly?',
    }),
    sl('example', 'Worked example 1: classifying a family\'s holdings', {
      b: 'An imagined family in Bhopal holds cash, a current account, a fixed deposit and a treasury bill.',
      bl: ['Step 1 — Ask: can it be used **directly** to pay?', 'Step 2 — If yes, it is **money**; if it must first be converted, it is **near money**.', 'Step 3 — Give the reason in each case.'],
      v: vClassify,
      n: 'Apply one test to each holding. Cash and a current-account balance can be used to pay at once, so they are money. A fixed deposit must first be withdrawn and a treasury bill must first be sold, so both are near money. Always write the reason, because that is where the marks are.',
    }),
    sl('diagram', 'The functions of money', {
      b: 'Functions fall into **three groups**: primary, secondary and contingent.',
      v: vFuncTree,
      n: 'Economists group the work that money does into three sets. The primary functions are the basic ones every money must perform. The secondary functions grow out of them. The contingent functions arise in a developed economy with banks and markets. Let us take each group in turn.',
    }),
    sl('concept', 'Primary functions', {
      b: '**Medium of exchange** and **measure (unit) of value**.',
      v: vPrimary,
      n: 'As a medium of exchange, money splits a barter swap into two separate deals: you sell for money to one person and buy with money from another. As a measure of value, money gives every good a price in one unit, the rupee, so that values can be compared and added up.',
    }),
    sl('concept', 'Secondary functions', {
      b: '**Standard of deferred payments**, **store of value** and **transfer of value**.',
      v: vSecondary,
      n: 'Because money measures value, future payments such as loans can be fixed in it: that is the standard of deferred payments. Money can also be saved and used later, which makes it a store of value. And it lets people move purchasing power from one place or person to another, called transfer of value.',
    }),
    sl('check', 'Quick check: saving for later', {
      b: 'Keeping part of today\'s income as money to spend later uses money as a ___ of value.',
      chk: 'fb_store',
      n: 'Which word describes holding purchasing power for the future?',
    }),
    sl('concept', 'Contingent functions', {
      b: 'Functions that depend on a developed money economy: **credit**, **income distribution**, **liquidity** and **solvency**.',
      v: vContingent,
      n: 'Contingent functions appear once an economy has banks and markets. Money is the base on which credit is built. It allows national income to be shared out as wages, rent, interest and profit. It is the most liquid asset, and holding it shows that a person or firm can pay its debts.',
    }),
    sl('example', 'Worked example 2: one day at a dairy cooperative', {
      b: 'Match each event at an imagined dairy in Anand with the function of money it shows.',
      v: vDairyDay,
      n: 'Here is a day at an imagined dairy. Paying a price per litre uses money as a measure of value. Paying members in cash makes it a medium of exchange. Repaying a loan over five years uses it as a standard of deferred payments. A surplus kept for a drought is a store of value, and a bank loan shows money as the basis of credit.',
    }),
    sl('check', 'Quick check: the basis of credit', {
      b: 'A bank lends many times its cash reserves because deposits are claims to money. This shows…',
      chk: 'm_contingent',
      n: 'Which group of functions only appears once an economy has banks?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Money is whatever is generally accepted in payment. It comes in several kinds, from commodities and coins to notes and bank deposits, and the law decides what is legal tender. Money performs two primary functions, three secondary functions and several contingent functions in a modern economy.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define money by **general acceptability**, not by its material.',
        'Name the **group** of each function: primary, secondary or contingent.',
        'For a scenario, **identify** the function or kind of money, then **explain** it in one line from the scenario.',
        'Distinguish **legal tender** from **optional money**, and **money** from **near money**.',
      ],
      v: vTips1,
      n: 'In the exam, define money by acceptance, not by what it is made of. When asked about functions, say which group each belongs to. In scenario questions, first name the function or kind of money, then explain it using words from the scenario. And keep legal tender, optional money and near money clearly apart.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Money and Inflation — Part 2: Money Supply and Inflation',
  goals: [
    'Explain the meaning of money supply and of the measures M0, M1, M2, M3 and M4',
    'Explain inflation and calculate the rate of inflation and the purchasing power of money from a price index',
    'Explain demand-pull and cost-push inflation and their causes',
  ],
  slides: [
    sl('title', 'Money Supply and Inflation', {
      b: 'Part 2 — how **money supply** is measured, and what happens when prices keep **rising**.',
      v: flow('LR', ['Money supply', 'Reserve money', 'Narrow and broad money', 'Inflation', 'Demand-pull and cost-push'], 'Route map of Part 2: money supply, reserve money, narrow and broad money, inflation, and demand-pull and cost-push inflation', 'Part 2 at a glance'),
      n: 'How much money is there in an economy, and what happens when prices keep rising? In this part we learn how the central bank measures the stock of money, from the narrowest measure to the broadest. Then we study inflation: what it means, how to measure it from a price index, and its two main causes.',
    }),
    sl('concept', 'Meaning of money supply', {
      b: '**Money supply** is the **stock** of money held by the **public** at a point of time.',
      v: vSupplyMeaning,
      n: 'Money supply is a stock, measured at a point of time, not a flow over a period. It counts only money held by the public, meaning households and firms. Cash lying with the government or in banks\' own vaults is left out, because it is not available to the public for spending.',
    }),
    sl('concept', 'Reserve money', {
      b: '**M0 (reserve money)** = currency in circulation + bankers\' deposits with the RBI + other deposits with the RBI.',
      v: vM0,
      n: 'Reserve money is the base of the money system. It includes all currency in circulation, the deposits that banks keep with the central bank, and some other deposits with the central bank. It is called high-powered money because banks create many times this amount as deposits.',
    }),
    sl('concept', 'Measures of money supply', {
      b: 'Narrow money: **M1**, **M2**. Broad money: **M3**, **M4**.',
      v: vMeasures,
      n: 'Narrow money counts currency with the public, demand deposits and other deposits with the central bank. The next measure adds post office savings bank deposits. Broad money adds the time deposits of banks, and the broadest measure also adds total post office savings deposits. We only need their meanings, not calculations.',
    }),
    sl('diagram', 'Liquidity falls from M1 to M4', {
      v: vLadder,
      n: 'This sketch shows order only. The narrowest measure contains the most liquid forms of money, which can be spent at once. Each broader measure adds savings and time deposits that take longer to use. So liquidity falls as we move from narrow money to broad money.',
    }),
    sl('check', 'Quick check: ranking by liquidity', {
      b: 'Rank the four measures from most liquid to least liquid.',
      chk: 'm_liquidity_order',
      n: 'Start with the measure that holds only currency and demand deposits.',
    }),
    sl('example', 'Worked example 1: where does each holding count?', {
      b: 'Place each holding of an imagined Bhopal family in the **narrowest** measure that counts it.',
      bl: ['Cash and current-account deposits: **M1**.', 'Post office savings bank deposit: **M2**.', 'Bank fixed deposit: **M3**.'],
      v: vFamilyMeasures,
      n: 'Cash at home and a current-account deposit are counted in narrow money straight away. A post office savings bank deposit first appears in the second measure. A bank fixed deposit is a time deposit, so it first appears in broad money. Remember that each broader measure includes everything in the narrower ones.',
    }),
    sl('check', 'Quick check: what is left out?', {
      b: 'Statisticians leave out the cash in the government\'s treasury and banks\' vaults. Why?',
      chk: 'm_money_held_public',
      n: 'Whose money holdings does money supply measure?',
    }),
    sl('concept', 'Inflation and how it is measured', {
      b: '**Inflation** is a **sustained rise in the general price level**; it is measured with a **price index**.',
      v: vInflMeaning,
      n: 'Inflation is not one price going up once. It is a lasting rise in the general level of prices. We measure it with a price index, which compares the cost of a fixed basket of goods with its cost in a base year. When the index rises, each rupee buys less.',
    }),
    sl('example', 'Worked example 2: inflation in Sonapur', {
      b: 'Rate of inflation = (index this year − index last year) ÷ index last year × 100.',
      bl: [`Year 2: (${SONAPUR[1].idx} − ${SONAPUR[0].idx}) ÷ ${SONAPUR[0].idx} × 100 = **${SON_INF2}%**.`, `Year 3: (${SONAPUR[2].idx} − ${SONAPUR[1].idx}) ÷ ${SONAPUR[1].idx} × 100 = **${SON_INF3}%**.`, 'The rate itself is rising: prices climb faster each year.'],
      v: vSonapur,
      n: 'In the imagined town of Sonapur the price index rose from one hundred and twenty-five to one hundred and thirty-five, a rise of ten points on one hundred and twenty-five, or eight per cent. Next year it rose to one hundred and forty-eight point five, which is ten per cent. Divide by the earlier index, not by one hundred.',
    }),
    sl('diagram', 'The purchasing power of money falls', {
      b: 'Purchasing power of ₹1 = **100 ÷ price index**.',
      v: vPP,
      n: 'As prices rise, each rupee buys less. At an index of one hundred and twenty-five, a rupee buys what eighty paise bought in the base year. If prices double, to an index of two hundred, a rupee buys only half as much. That is why people on fixed incomes lose out during inflation.',
    }),
    sl('check', 'Quick check: Sonapur\'s inflation', {
      b: `Sonapur\'s price index rose from ${SONAPUR[0].idx} to ${SONAPUR[1].idx}. Find the rate of inflation.`,
      chk: 'n_infl_sonapur',
      n: 'Divide the rise in the index by the earlier index, then multiply by one hundred.',
    }),
    sl('concept', 'Demand-pull inflation', {
      b: 'Prices are **pulled up** when aggregate demand exceeds what the economy can produce at full employment.',
      v: vDP,
      n: 'Demand-pull inflation begins with spending. More money supply, higher government spending, a tax cut or rising exports all raise aggregate demand. If the economy is already at full employment, output cannot rise to meet it, so buyers compete for the same goods and prices are pulled up.',
    }),
    sl('concept', 'Cost-push inflation', {
      b: 'Prices are **pushed up** when the **cost of production** rises, even if demand has not.',
      v: vCP,
      n: 'Cost-push inflation begins with costs. If wages rise faster than productivity, if imported fuel or raw materials become dearer, if powerful firms widen their margins, or if indirect taxes rise, the cost of each unit goes up. Firms pass these costs on as higher prices, even though demand has not grown.',
    }),
    sl('check', 'Quick check: dominant firms', {
      b: 'A few dominant cement firms raise prices to widen margins, with costs and demand unchanged. This is…',
      chk: 'm_profit_push',
      n: 'Which kind of cost-push comes from firms with market power?',
    }),
    sl('concept', 'Types of cost-push and a comparison', {
      b: 'Wage-push, profit-push, input-cost and tax-push; compared with demand-pull.',
      v: vCompare,
      n: 'Cost-push comes in several forms: wage-push, profit-push, dearer inputs and higher indirect taxes. Compared with demand-pull, it starts from the supply side and can occur even when factories have spare capacity, sometimes with output falling. Demand-pull usually occurs at full employment, where output cannot rise further.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Money supply is the stock of money with the public. Reserve money is its base, narrow money counts the most liquid forms and broad money adds time deposits. Inflation is a sustained rise in prices that lowers the purchasing power of money, and it can be pulled by demand or pushed by costs.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write each money measure as an **equation of its parts**; no calculations are set on them.',
        'For the **rate of inflation**, divide the rise by the **earlier** index.',
        'Explain demand-pull and cost-push **in words**; no inflation diagrams are required.',
        'Link causes to the **type**: demand-side causes give demand-pull, cost-side causes give cost-push.',
      ],
      v: vTips2,
      n: 'Write each money measure as its parts added together; you will not be asked to calculate them. For inflation, divide the rise in the index by the earlier index. Explain the two kinds of inflation in words, because diagrams are not required. And always match each cause to the right type of inflation.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Money and Inflation — Notes',
  sections: [
    {
      h: '1. From barter to money',
      t: 1,
      b: '- **Barter** is the direct swapping of goods. Its difficulties: need for a **double coincidence of wants**; **no common measure of value**; **indivisibility** of goods; **no store of value** for perishables; **no fair standard** for future payments.\n- **Money** is anything **generally accepted** in payment for goods and services and in settling debts.\n- Money evolved from **commodities** (grain, cattle, salt) to **metal coins**, **paper notes** and **bank deposits**.',
      terms: [['Barter', 'Direct exchange of goods for goods without money.'], ['Double coincidence of wants', 'Each party to a swap must want what the other offers.'], ['Money', 'Anything generally accepted as a means of payment and in settlement of debts.']],
      v: vBarter,
      vs: [vEvolution],
    },
    {
      h: '2. Kinds of money',
      t: 1,
      b: '- **Commodity money**: a useful good used in payment.\n- **Metallic money**: **full-bodied** coins (metal worth = face value) and **token** coins (face value above metal worth).\n- **Paper money**: notes; modern notes are **inconvertible** (not exchangeable for gold on demand).\n- **Credit (bank) money**: deposits moved by cheque or transfer.\n- **Legal tender**: must be accepted in payment of debts — **unlimited** (notes) or **limited** (small coins, up to a legal limit). Cheques are **optional money**.\n- **Fiat money**: issued by government order; value does not come from its material.\n- **Near money**: highly liquid assets (fixed deposits, treasury bills, bonds) that must first be turned into money.',
      terms: [['Token money', 'Money whose face value exceeds the value of its material.'], ['Legal tender', 'Money that must by law be accepted in payment of debts.'], ['Fiat money', 'Money issued by order of the government, whose value does not depend on its material.'], ['Near money', 'A highly liquid asset that is not itself a means of payment.']],
      v: vKinds,
      vs: [vLegal, vNear],
    },
    {
      h: '3. Functions of money',
      t: 2,
      b: '- **Primary**: **medium of exchange** (sale and purchase become separate deals); **measure of value** (common unit of account).\n- **Secondary**: **standard of deferred payments** (loans fixed in money); **store of value** (purchasing power kept for later — weakened when prices rise fast); **transfer of value** (between places and people).\n- **Contingent**: **basis of credit**; **distribution of national income** as wages, rent, interest and profit; **equalising marginal utilities** in spending; **liquidity**; **guarantor of solvency**.',
      terms: [['Medium of exchange', 'The role of money as what is given and taken in buying and selling.'], ['Standard of deferred payments', 'The role of money as the unit in which future payments are fixed.'], ['Contingent functions', 'Functions of money that arise in a developed economy with banks and markets.']],
      v: vFuncTree,
      vs: [vPrimary, vSecondary, vContingent],
    },
    {
      h: '4. Money supply: M0 to M4 (meanings)',
      t: 3,
      b: '- **Money supply**: the **stock** of money held by the **public** at a point of time; money with the government and the banking system is excluded.\n- **M0 (reserve or high-powered money)** = currency in circulation + bankers\' deposits with the RBI + other deposits with the RBI.\n- **M1** = currency with the public + demand deposits of banks + other deposits with the RBI.\n- **M2** = M1 + savings deposits with post office savings banks.\n- **M3** = M1 + net time deposits of banks.\n- **M4** = M3 + total deposits with the post office savings organisation (excluding National Savings Certificates).\n- **M1, M2**: narrow money; **M3, M4**: broad money. Liquidity is highest in M1 and lowest in M4.',
      terms: [['Money supply', 'The total stock of money held by the public at a point of time.'], ['Reserve money', 'The monetary base: currency in circulation plus deposits of banks and others with the central bank.'], ['Broad money', 'Measures such as M3 and M4 that include less liquid time and savings deposits.']],
      v: vMeasures,
      vs: [vM0, vLadder],
    },
    {
      h: '5. Inflation and its measurement',
      t: 4,
      b: `- **Inflation**: a **sustained rise in the general price level**, so money loses **purchasing power**.\n- **Price index** = cost of a fixed basket now ÷ cost in the base year × 100.\n- **Rate of inflation** = (rise in the index) ÷ (earlier index) × 100.\n- **Purchasing power of ₹1** = 100 ÷ price index; **real value** of an amount = amount × 100 ÷ index.\n- Imagined Sonapur: ${SONAPUR.map((r) => r.idx).join(' → ')} gives ${SON_INF2}% and then ${SON_INF3}%; a rupee at index ${SONAPUR[0].idx} buys ₹${SON_PP1} of base-year goods.\n- Imagined Meghpur: a basket costing ₹${inr(BASKET.base)} now costs ₹${inr(BASKET.current)} (index ${BASKET_IDX}, a ${BASKET_INF}% rise); a salary of ₹${inr(SALARY)} is worth ₹${inr(SALARY_REAL)} in base-year rupees.`,
      terms: [['Inflation', 'A sustained rise in the general level of prices.'], ['Price index', 'A number showing the cost of a fixed basket relative to a base year taken as 100.'], ['Purchasing power of money', 'The quantity of goods a unit of money can buy.']],
      v: vSonapur,
      vs: [vInflMeaning, vPP],
    },
    {
      h: '6. Demand-pull and cost-push inflation',
      t: 4,
      b: '- **Demand-pull**: aggregate demand exceeds full-employment output. Causes: rise in **money supply** and easy credit, higher **public spending** (especially **deficit financing**), higher **disposable income** (tax cuts), rising **exports**, growing population.\n- **Cost-push**: rising **costs** raise prices without more demand. Types: **wage-push**, **profit-push**, dearer **inputs or imports** (fuel, raw materials), higher **indirect taxes**.\n- Demand-pull usually appears at full employment; cost-push can appear with idle capacity and may reduce output.\n- *Diagrams of both types are not required for ISC 2027; explain them in words.*',
      terms: [['Demand-pull inflation', 'Inflation caused by aggregate demand exceeding the economy\'s full-employment output.'], ['Cost-push inflation', 'Inflation caused by rising costs of production.'], ['Deficit financing', 'Meeting a government deficit by borrowing from the central bank, which creates new money.']],
      v: vCompare,
      vs: [vDP, vCP, vCPTypes],
    },
  ],
  tips: '**Common mistakes**\n- Treating a cheque as legal tender.\n- Calling a fixed deposit money instead of near money.\n- Putting store of value among the primary functions.\n- Writing M3 as M2 plus time deposits (it is M1 plus net time deposits).\n- Taking the rise in index points as the rate of inflation.\n- Calling a one-time rise in one price "inflation".\n\n**How marks are usually awarded**\n- 1 mark: one correct option, term or calculation.\n- 2 marks: a meaning with an example, or two short points.\n- 3 marks: three distinct points, or a calculation in three steps.\n- 5 marks: parts with working and reasons; scenario answers must use the scenario.\n\nAll towns, families and figures in SOYL practice are imagined; no current statistics are used.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Barter**', 'Direct exchange of goods for goods.', 'definition', 1],
  ['Biggest problem of barter', 'Need for a **double coincidence of wants**.', 'fact', 1],
  ['**Money**', 'Anything **generally accepted** in payment and in settling debts.', 'definition', 1],
  ['**Full-bodied** vs **token** coin', 'Full-bodied: metal worth = face value. Token: face value > metal worth.', 'concept', 1],
  ['**Legal tender**', 'Must be accepted by law in payment of debts.', 'definition', 1],
  ['Limited legal tender', 'Must be accepted only **up to a legal limit** (small coins).', 'definition', 1],
  ['Is a cheque legal tender?', '**No** — it is optional (credit) money.', 'exam-tip', 1],
  ['**Fiat money**', 'Money by **government order**; value not from its material.', 'definition', 1],
  ['**Near money**', 'Highly liquid asset that **cannot itself pay** for goods (fixed deposit, treasury bill).', 'definition', 1],
  ['Two primary functions', '**Medium of exchange**; **measure of value**.', 'fact', 2],
  ['Three secondary functions', 'Deferred payments; store of value; transfer of value.', 'fact', 2],
  ['A seed loan repaid in rupees after harvest', '**Standard of deferred payments**.', 'example', 2],
  ['Selling a house in one city to buy in another', '**Transfer of value**.', 'example', 2],
  ['Contingent functions', 'Basis of credit; distributing income; equalising marginal utilities; liquidity; solvency.', 'fact', 2],
  ['Why is money a poor store of value in rapid inflation?', 'Each rupee buys **fewer goods** over time.', 'concept', 2],
  ['**Money supply**', 'Stock of money with the **public** at a point of time.', 'definition', 3],
  ['Is cash in banks\' vaults part of money supply?', '**No** — only money with the public counts.', 'exam-tip', 3],
  ['**M0**', 'Currency in circulation + bankers\' deposits with the RBI + other deposits with the RBI.', 'formula', 3],
  ['**M1**', 'Currency with the public + demand deposits + other deposits with the RBI.', 'formula', 3],
  ['**M2**', 'M1 + savings deposits with post office savings banks.', 'formula', 3],
  ['**M3**', 'M1 + net time deposits of banks.', 'formula', 3],
  ['**M4**', 'M3 + total post office savings deposits (excluding NSCs).', 'formula', 3],
  ['Narrow and broad money', 'Narrow: M1, M2. Broad: M3, M4.', 'fact', 3],
  ['Most and least liquid measure', '**M1** most; **M4** least.', 'fact', 3],
  ['**Inflation**', 'A **sustained rise** in the general price level.', 'definition', 4],
  ['Rate of inflation', '(Rise in index) ÷ (earlier index) × 100.', 'formula', 4],
  ['Purchasing power of ₹1', '100 ÷ price index.', 'formula', 4],
  ['Index 160 → 172', `Inflation **${inflation(160, 172)}%**.`, 'example', 4],
  ['**Demand-pull** inflation', 'Excess aggregate demand at full employment pulls prices up.', 'definition', 4],
  ['**Cost-push** inflation', 'Rising costs (wages, inputs, margins, taxes) push prices up.', 'definition', 4],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Money and Inflation',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_double_coinc', 'm_legal_tender', 'm_m1_parts', 'm_costpush_cause', 'ar_fiat_value'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_barter_two', { attempt: 1, keys: ['s_near_money', 's_store_value'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_functions_three', { attempt: 1, keys: ['s3_m1_m3', 's3_demand_pull'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts.', items: ['l_kinds_money'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Money and Inflation',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_medium_exchange', 'm_measure_value', 'm_deferred', 'm_token_coin', 'm_credit_money', 'm_reserve_money', 'm_m4_broad', 'm_inflation_meaning', 'm_demandpull_cause', 'm_wage_push', 'ar_store_inflation', 'ar_m3_liquid'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_primary_secondary', 's_fiat_meaning', { attempt: 1, keys: ['s_m0_meaning', 's_infl_meaning'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_barter_problems', 's3_contingent', 's3_index_inflation', { attempt: 1, keys: ['s3_dp_vs_cp', 's3_m1_m2_m3'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts.', items: ['l_functions_full', { attempt: 1, keys: ['l_money_supply', 'l_infl_types'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch13 only (meaning and kinds of money; functions of money; meaning of M0–M4; inflation, demand-pull and cost-push); removed topics respected: no calculations on money-supply measures and no inflation diagrams',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every town, family, firm, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch02',
    data: `figures computed in questions.mjs and asserted: Sonapur index ${SONAPUR.map((r) => r.idx).join(', ')} gives ${SON_INF2}% and ${SON_INF3}%, purchasing power ${SON_PP1} at ${SONAPUR[0].idx}; Meghpur basket ${BASKET.base} → ${BASKET.current} gives index ${BASKET_IDX} (${BASKET_INF}%), salary ${SALARY} worth ${SALARY_REAL}; 160 → 172 is ${inflation(160, 172)}%; 250 → 270 is ${inflation(250, 270)}%; purchasing power ${PP_200} at index 200`,
    facts: 'classic RBI money-supply measures (M0–M4) as taught for ISC, meanings only; no current statistics',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
