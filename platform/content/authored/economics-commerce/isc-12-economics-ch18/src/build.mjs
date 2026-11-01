// Build ISC 12 Economics ch18 Circular Flow of Income. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch18/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch18', 'economics-commerce');
const {
  inr, KAN, KAN_FP, KAN_C, NEE, NEE_C, MAL, MAL_C, MAL_LEAK, MAL_INJ, VIN, VIN_C, VIN_LEAK, VIN_INJ, VIN_SPEND,
  SAR, SAR_LEAK, SAR_INJ, SAR_GAP, TUN, TUN_LEAK, TUN_INJ, TUN_GAP, HH, HH_C,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG helpers
// Real flows: solid accent lines. Money flows: dashed blue lines. Boxes: theme fill with a currentColor border.
function box(s, x, y, w, h, label, sub) {
  s.rect(x, y, w, h, { fill: 'fill', sw: 1.6, rx: 8 });
  s.text(x + w / 2, y + h / 2 - (sub ? 8 : 0), label, { size: 14, bold: true });
  if (sub) s.text(x + w / 2, y + h / 2 + 11, sub, { size: 11, muted: true });
}
function line(s, pts, kind) {
  const o = kind === 'real' ? { color: 'accent', sw: 2.2 } : { color: 'blue', sw: 2, dash: true };
  s.polyline(pts, o);
  const [a, b] = pts.slice(-2);
  s.head(b[0], b[1], b[0] - a[0], b[1] - a[1], { color: o.color });
}
function legend(s, x, y, withReal = true) {
  if (withReal) {
    s.line(x, y, x + 34, y, { color: 'accent', sw: 2.2 });
    s.text(x + 42, y, 'Real flow', { anchor: 'start', size: 11 });
  }
  const x2 = withReal ? x + 130 : x;
  s.line(x2, y, x2 + 34, y, { color: 'blue', sw: 2, dash: true });
  s.text(x2 + 42, y, 'Money flow', { anchor: 'start', size: 11 });
}

// (1) Simple two-sector model: four flows between households and firms.
const vTwo = (() => {
  const s = new Svg(640, 360);
  box(s, 15, 110, 135, 170, 'Households', 'own the factors');
  box(s, 490, 110, 135, 170, 'Firms', 'produce output');
  const rows = [
    [140, 'Factor services: land, labour, capital, enterprise', 'real', 'right'],
    [180, 'Factor payments: rent, wages, interest, profit', 'money', 'left'],
    [220, 'Goods and services', 'real', 'left'],
    [260, 'Consumption spending', 'money', 'right'],
  ];
  for (const [y, label, kind, dir] of rows) {
    line(s, dir === 'right' ? [[150, y], [490, y]] : [[490, y], [150, y]], kind);
    s.text(320, y - 9, label, { size: 10.5, color: kind === 'real' ? 'accent' : 'blue' });
  }
  s.text(320, 60, 'Factor market: top two flows', { size: 12, muted: true });
  s.text(320, 300, 'Product market: bottom two flows', { size: 12, muted: true });
  legend(s, 200, 335);
  return s.visual(
    'Circular flow in a simple two-sector economy: households supply land, labour, capital and enterprise to firms and receive rent, wages, interest and profit; firms supply goods and services to households and receive consumption spending. Real flows are solid and money flows are dashed; each money flow runs opposite to the real flow it pays for.',
    'Two-sector model, no saving: the top two flows are in the factor market, the bottom two in the product market.',
  );
})();

// (2) Two-sector model with saving and investment through the financial market (money flows only).
const vTwoSave = (() => {
  const s = new Svg(640, 420);
  box(s, 30, 70, 160, 140, 'Households');
  box(s, 450, 70, 160, 140, 'Firms');
  box(s, 245, 310, 150, 60, 'Financial market', 'banks, institutions');
  line(s, [[450, 110], [190, 110]], 'money');
  s.text(320, 101, 'Factor payments (income)', { size: 11, color: 'blue' });
  line(s, [[190, 170], [450, 170]], 'money');
  s.text(320, 161, 'Consumption spending', { size: 11, color: 'blue' });
  line(s, [[110, 210], [110, 340], [245, 340]], 'money');
  s.text(118, 270, 'Saving', { anchor: 'start', size: 12, color: 'blue' });
  line(s, [[395, 340], [530, 340], [530, 210]], 'money');
  s.text(522, 270, 'Investment', { anchor: 'end', size: 12, color: 'blue' });
  legend(s, 230, 400, false);
  return s.visual(
    'Two-sector circular flow with saving: firms pay factor incomes to households; households spend part on consumer goods and save the rest; saving goes to the financial market, which lends it to firms as investment spending. When investment equals saving, firms receive as much as they paid out.',
    `Money flows only. Imagined Neelachal: income ${NEE.Y}, saving ${NEE.S}, investment ${NEE.I} (₹ crore).`,
  );
})();

// (3) and (4) Three- and four-sector models (money flows only).
function sectors({ withRow }) {
  const s = new Svg(700, withRow ? 470 : 440);
  box(s, 275, 25, 150, 60, 'Government');
  box(s, 30, 190, 150, 90, 'Households');
  box(s, 480, 190, 150, 90, 'Firms');
  box(s, 200, 360, 150, 55, 'Financial market');
  // households and firms
  line(s, [[480, 215], [180, 215]], 'money');
  s.text(330, 206, 'Factor incomes', { size: 11, color: 'blue' });
  line(s, [[180, 255], [480, 255]], 'money');
  s.text(330, 246, 'Consumption spending', { size: 11, color: 'blue' });
  // government links
  line(s, [[70, 190], [70, 45], [275, 45]], 'money');
  s.text(170, 36, 'Taxes', { size: 11, color: 'blue' });
  line(s, [[275, 72], [130, 72], [130, 190]], 'money');
  s.text(205, 98, 'Transfers, salaries', { size: 11, color: 'blue' });
  line(s, [[600, 190], [600, 45], [425, 45]], 'money');
  s.text(520, 36, 'Taxes', { size: 11, color: 'blue' });
  line(s, [[425, 72], [550, 72], [550, 190]], 'money');
  s.text(480, 98, 'Purchases, subsidies', { size: 11, color: 'blue' });
  // financial market
  line(s, [[90, 280], [90, 388], [200, 388]], 'money');
  s.text(98, 335, 'Saving', { anchor: 'start', size: 11, color: 'blue' });
  line(s, [[350, 388], [400, 388], [400, 320], [500, 320], [500, 280]], 'money');
  s.text(450, 311, 'Investment', { size: 11, color: 'blue' });
  if (withRow) {
    box(s, 480, 380, 150, 55, 'Rest of the world');
    line(s, [[525, 280], [525, 380]], 'money');
    s.text(517, 350, 'Import payments', { anchor: 'end', size: 11, color: 'blue' });
    line(s, [[600, 380], [600, 280]], 'money');
    s.text(608, 350, 'Export receipts', { anchor: 'start', size: 11, color: 'blue' });
  }
  return s;
}
const vThree = sectors({ withRow: false }).visual(
  'Three-sector circular flow of money: firms pay factor incomes to households and receive consumption spending; households and firms pay taxes to the government; the government pays transfers and salaries to households and makes purchases and pays subsidies to firms; households save through the financial market, which lends to firms for investment.',
  'Three-sector model (money flows only): leakages are saving and taxes; injections are investment and government spending.',
);
const vFour = sectors({ withRow: true }).visual(
  'Four-sector circular flow of money: the three-sector flows of factor incomes, consumption, taxes, transfers, purchases, subsidies, saving and investment, plus payments for imports going to the rest of the world and receipts from exports coming back to domestic firms.',
  'Four-sector model (money flows only). Imports by households, firms and the government are drawn as one flow.',
);

// (5) Leakages and injections of imagined Sarayu Pradesh (paired bars).
const vSarBars = (() => {
  const s = new Svg(560, 400);
  const c = s.chart({ x1: 4, y1: 600, left: 70, top: 40, width: 420, height: 280, xLabel: 'Total', yLabel: '₹ crore' });
  const bars = [[1.2, SAR_LEAK, 'Leakages', 'red'], [2.8, SAR_INJ, 'Injections', 'blue']];
  for (const [x, v, name, col] of bars) {
    const x0 = c.X(x - 0.45), x1 = c.X(x + 0.45);
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: col, fillOpacity: 0.5, color: col, sw: 1.5, rx: 2 });
    c.label([x, v], String(v), { dy: -10, size: 12 });
    c.xTick(x, name);
  }
  c.yTick(200, '200').yTick(400, '400');
  assert(SAR_LEAK - SAR_INJ === SAR_GAP, 'sarayu gap');
  return s.visual(
    `Bar chart for imagined Sarayu Pradesh: planned leakages of saving, taxes and imports total ${SAR_LEAK} crore rupees, while planned injections of investment, government spending and exports total ${SAR_INJ} crore rupees, a gap of ${SAR_GAP} crore`,
    `Imagined figures: leakages ${SAR.S} + ${SAR.T} + ${SAR.M}; injections ${SAR.I} + ${SAR.G} + ${SAR.X}.`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vThreeStages = flow('LR', ['Production by firms', 'Income to factor owners', 'Spending on output', 'More production'], 'Flow of the circle: production by firms creates income for factor owners, income is spent on output, and spending calls forth more production', 'Production, income, spending');
const vAssume = table(
  ['Assumption of the simple model', 'What it rules out'],
  [['Only households and firms', 'No government, no foreign trade'], ['Households spend all their income', 'No saving'], ['Firms sell all output to households', 'No unsold stocks, no investment'], ['Households own all the factors', 'Firms pay all output value as factor incomes']],
  'Table of the assumptions of the simple two-sector model: only households and firms, all income spent, all output sold to households, and households own all the factors',
);
const vRealMoney = table(
  ['', 'Real flow', 'Money flow'],
  [['What moves', 'Factor services, goods and services', 'Rupees: factor payments, spending'], ['Factor market', 'Labour, land, capital, enterprise to firms', 'Rent, wages, interest, profit to households'], ['Product market', 'Goods and services to households', 'Consumption spending to firms']],
  'Table comparing real and money flows in the factor and product markets: real flows carry factor services and goods; money flows carry payments in the opposite direction',
);
const vKan = table(
  ['Factor payment by Kanakdwip firms', '₹ crore'],
  [['Wages', String(KAN.wages)], ['Rent', String(KAN.rent)], ['Interest', String(KAN.interest)], ['Profit', String(KAN.profit)], ['**Household income = consumption**', `**${KAN_FP}**`]],
  `Table of imagined Kanakdwip: wages ${KAN.wages}, rent ${KAN.rent}, interest ${KAN.interest} and profit ${KAN.profit} crore rupees add to household income of ${KAN_FP} crore, all of which is spent`,
  'Imagined island economy with no saving.',
);
const vRound = flow('LR', ['Households supply factors', 'Firms produce', 'Firms pay factor incomes', 'Households buy output', 'Firms hire again'], 'Flow of one round of the two-sector circle: households supply factors, firms produce, firms pay factor incomes, households buy output, and firms hire factors again', 'One round');
const vMarkets = table(
  ['Market', 'Sellers', 'Buyers', 'Money paid'],
  [['Factor market', 'Households (factor services)', 'Firms', 'Rent, wages, interest, profit'], ['Product market', 'Firms (goods and services)', 'Households', 'Consumption spending']],
  'Table of the two markets of the circular flow: in the factor market households sell factor services to firms for rent, wages, interest and profit; in the product market firms sell goods and services to households for consumption spending',
);
const vNee = table(
  ['Imagined Neelachal (₹ crore)', 'Value'],
  [['Income paid out by firms', String(NEE.Y)], ['Saving by households', String(NEE.S)], ['Consumption spending', String(NEE_C)], ['Investment by firms', String(NEE.I)], ['**Firms\' receipts: consumption + investment**', `**${NEE_C + NEE.I}**`]],
  `Table of imagined Neelachal: income ${NEE.Y}, saving ${NEE.S}, consumption ${NEE_C}, investment ${NEE.I}; firms receive ${NEE_C + NEE.I} crore rupees, equal to income`,
  'Saving returns as investment, so receipts equal income.',
);
const vMethods = flow('LR', ['Value of output (product method)', 'Factor incomes (income method)', 'Spending on output (expenditure method)'], 'Flow of three points where the circular flow can be measured: value of output by the product method, factor incomes by the income method, and spending on output by the expenditure method', 'Three points, one total');
const vTransfer = table(
  ['', 'Government purchase', 'Transfer payment'],
  [['Example', 'Desks bought for state schools', 'Old-age pension, scholarship'], ['Anything given in return?', 'Yes: goods or services', 'No'], ['Real flow?', 'Yes, opposite to the payment', 'No']],
  'Table comparing a government purchase with a transfer payment: a purchase brings goods in return and has a matching real flow; a transfer has nothing in return',
);
const vMal = table(
  ['Imagined Malaygiri (₹ crore)', 'Value'],
  [['Income', inr(MAL.Y)], ['Saving', String(MAL.S)], ['Taxes', String(MAL.T)], ['Consumption', String(MAL_C)], ['Investment', String(MAL.I)], ['Government spending', String(MAL.G)], ['**Leakages / injections**', `**${MAL_LEAK} / ${MAL_INJ}**`]],
  `Table of imagined Malaygiri: income ${MAL.Y}, saving ${MAL.S}, taxes ${MAL.T}, so consumption ${MAL_C}; investment ${MAL.I} and government spending ${MAL.G}; leakages ${MAL_LEAK} equal injections ${MAL_INJ} crore rupees`,
);
const vLeakInj = table(
  ['Sector', 'Leakage (withdrawal)', 'Injection (addition)'],
  [['Households and the financial market', 'Saving', 'Investment'], ['Government', 'Taxes', 'Government spending'], ['Rest of the world', 'Imports', 'Exports']],
  'Table pairing leakages and injections by sector: saving and investment through the financial market, taxes and government spending through the government, imports and exports through the rest of the world',
);
const vVin = table(
  ['Imagined Vindhyadesh (₹ crore)', 'Leakages', 'Injections'],
  [['Saving / investment', String(VIN.S), String(VIN.I)], ['Taxes / government spending', String(VIN.T), String(VIN.G)], ['Imports / exports', String(VIN.M), String(VIN.X)], ['**Total**', `**${VIN_LEAK}**`, `**${VIN_INJ}**`]],
  `Table of imagined Vindhyadesh: leakages of saving ${VIN.S}, taxes ${VIN.T} and imports ${VIN.M} total ${VIN_LEAK}; injections of investment ${VIN.I}, government spending ${VIN.G} and exports ${VIN.X} total ${VIN_INJ} crore rupees`,
  `Income ${inr(VIN.Y)}; consumption ${VIN_C}; spending on domestic output ${inr(VIN_SPEND)}.`,
);
const vFall = flow('LR', ['Leakages exceed injections', 'Spending falls short of output', 'Unsold stocks pile up', 'Firms cut output and jobs', 'Income falls until leakages match injections'], 'Flow of what happens when leakages exceed injections: spending falls short of output, unsold stocks pile up, firms cut output and jobs, and income falls until leakages match injections', 'Leakages larger');
const vRise = flow('LR', ['Injections exceed leakages', 'Spending exceeds output', 'Stocks run down', 'Firms raise output and hire', 'Income rises until leakages match injections'], 'Flow of what happens when injections exceed leakages: spending exceeds output, stocks run down, firms raise output and hire, and income rises until leakages match injections', 'Injections larger');
const vTun = table(
  ['Imagined Tungadesh (₹ crore)', 'Leakages', 'Injections'],
  [['Saving / investment', String(TUN.S), String(TUN.I)], ['Taxes / government spending', String(TUN.T), String(TUN.G)], ['Imports / exports', String(TUN.M), String(TUN.X)], ['**Total**', `**${TUN_LEAK}**`, `**${TUN_INJ}**`]],
  `Table of imagined Tungadesh: leakages total ${TUN_LEAK} and injections total ${TUN_INJ} crore rupees, so injections are larger by ${TUN_GAP}`,
);
const vConditions = table(
  ['Model', 'Condition for a steady flow'],
  [['Two-sector with saving', 'Saving = investment'], ['Three-sector', 'Saving + taxes = investment + government spending'], ['Four-sector', 'Saving + taxes + imports = investment + government spending + exports']],
  'Table of the condition for a steady circular flow in each model: saving equals investment in two sectors; saving plus taxes equals investment plus government spending in three; and saving plus taxes plus imports equals investment plus government spending plus exports in four',
);
const vHH = table(
  ['Household budget, three-sector model (₹ crore)', 'Value'],
  [['Income', String(HH.Y)], ['Taxes paid', String(HH.T)], ['Saving', String(HH.S)], ['**Consumption**', `**${HH_C}**`]],
  `Table of a household budget in the three-sector model: income ${HH.Y}, taxes ${HH.T}, saving ${HH.S}, so consumption is ${HH_C} crore rupees`,
);
assert(HH_C + HH.T + HH.S === HH.Y, 'household budget');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Circular Flow of Income — Part 1: The Two-Sector Model',
  goals: [
    'Explain the circular flow of income and why it never stops',
    'Draw the two-sector model with its real and money flows in the factor and product markets',
    'Show how saving and investment through the financial market keep the flow steady',
  ],
  slides: [
    sl('title', 'Circular Flow of Income', {
      b: 'Part 1 — **production, income and spending** moving in a circle between **households and firms**.',
      v: flow('LR', ['What the circle is', 'Simple two-sector model', 'Real and money flows', 'Saving and investment', 'Why it matters'], 'Route map of Part 1: what the circle is, the simple two-sector model, real and money flows, saving and investment, and why it matters', 'Part 1 at a glance'),
      n: 'Every rupee you spend becomes someone else\'s income, and that income is spent again. Economists picture this as a circle that never stops. In this part we draw the simplest version of that circle, with only households and firms, and then see what happens when families begin to save.',
    }),
    sl('concept', 'What is the circular flow of income?', {
      b: 'Firms **produce**, production creates **income** for the owners of factors, income is **spent** on output, and spending lets firms **produce again**.',
      v: vThreeStages,
      n: 'The circular flow is the endless movement of production, income and spending. Firms make goods and pay the people who supply land, labour, capital and enterprise. Those people spend their earnings on what firms make. That spending gives firms the money to produce and pay incomes again, so the flow goes round and round.',
    }),
    sl('concept', 'Assumptions of the simple model', {
      b: 'We begin with the **simplest possible economy** and add features one at a time.',
      v: vAssume,
      n: 'To start, we imagine an economy with only two sectors, households and firms. There is no government and no trade with other countries. Households own all the factors and spend everything they earn, and firms sell all their output to households. Later we will relax these assumptions one by one.',
    }),
    sl('diagram', 'The two-sector model', {
      b: 'Two markets, four flows: two **real**, two **money**.',
      v: vTwo,
      n: 'Here is the picture. In the factor market, households supply factor services to firms and receive rent, wages, interest and profit. In the product market, firms supply goods and services to households and receive consumption spending. The solid lines are real flows and the dashed lines are money flows. Notice that each payment travels against the thing it pays for.',
    }),
    sl('check', 'Quick check: is a bank needed?', {
      b: 'True or false: with no saving at all, a financial market is needed to keep income flowing.',
      chk: 'tf_saving_two',
      n: 'Think about where every rupee of household income goes when nothing is saved.',
    }),
    sl('two-column', 'Real flows and money flows', {
      cols: ['**Real flows**\n\n- Factor services to firms\n- Goods and services to households\n- Things that are produced or used', '**Money flows**\n\n- Factor payments to households\n- Consumption spending to firms\n- Rupees that pay for the real flows'],
      v: vRealMoney,
      n: 'A real flow is a movement of things: work, the use of land and machines, and finished goods. A money flow is the movement of rupees that pays for them. Because every real flow is paid for at its price, the money flows have the same value as the real flows, but they run the other way.',
    }),
    sl('example', 'Worked example 1: incomes on an imagined island', {
      b: 'Kanakdwip firms pay wages, rent, interest and profit. Households save nothing. Find income and consumption.',
      bl: [
        `Step 1 — Add the factor payments: ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = **${KAN_FP}** (₹ crore).`,
        'Step 2 — This is household income, because households own every factor.',
        `Step 3 — With no saving, all of it is spent: consumption = **${KAN_C}**.`,
        'Step 4 — Firms get back exactly what they paid out, so the flow repeats.',
      ],
      v: vKan,
      n: 'On our imagined island, firms pay five hundred crore in wages, eighty in rent, seventy in interest and one hundred and fifty in profit. Together that is eight hundred crore of household income. Families save nothing, so all eight hundred crore comes back to firms as spending, and the circle repeats at the same size.',
    }),
    sl('check', 'Quick check: add the factor incomes', {
      b: 'Kanakdwip firms pay wages, rent, interest and profit. What is household income?',
      chk: 'n_kan_income',
      n: 'Profit is a factor payment too, so include every one of the four rewards.',
    }),
    sl('diagram', 'One round of the circle', {
      b: 'The circle has no beginning or end; we simply pick a starting point.',
      v: vRound,
      n: 'Follow one round. Households supply their factors. Firms use them to produce. Firms pay factor incomes. Households spend those incomes on the output. With that money, firms can hire factors again. Because each step leads to the next, the flow continues as long as nothing leaks out of it.',
    }),
    sl('concept', 'Two markets in the circle', {
      b: 'In the **factor market** households sell; in the **product market** firms sell.',
      v: vMarkets,
      n: 'The circle passes through two markets. In the factor market, households are the sellers and firms the buyers of factor services. In the product market, it is the other way round: firms sell goods and households buy them. The same households and firms play both roles.',
    }),
    sl('check', 'Quick check: put the round in order', {
      b: 'Arrange one round of the two-sector circle in the correct order.',
      chk: 'ord_round',
      n: 'Start with what households offer, and end with what they buy.',
    }),
    sl('diagram', 'When households save', {
      b: '**Saving** is income not spent on consumer goods. The **financial market** lends it to firms as **investment**.',
      v: vTwoSave,
      n: 'Now let families save part of their income. That saving does not reach firms as consumer spending, so firms would be short of money. But savings go to banks and other institutions, which lend them to firms. Firms spend the loans on machines, buildings and stocks. If investment equals saving, firms still receive all that they paid out.',
    }),
    sl('example', 'Worked example 2: saving and investment in imagined Neelachal', {
      b: 'Income ₹900 crore; saving ₹140 crore; investment ₹140 crore. Does the flow stay the same?',
      bl: [
        `Step 1 — Consumption = ${NEE.Y} − ${NEE.S} = **${NEE_C}**.`,
        `Step 2 — Saving of ${NEE.S} reaches firms through banks as investment of ${NEE.I}.`,
        `Step 3 — Firms receive ${NEE_C} + ${NEE.I} = **${NEE_C + NEE.I}**, equal to income.`,
        'Step 4 — Saving equals investment, so the flow stays the same size.',
      ],
      v: vNee,
      n: 'In imagined Neelachal, households earn nine hundred crore and save one hundred and forty, so they spend seven hundred and sixty. Banks lend the one hundred and forty crore to firms, which invest it. Firms therefore receive seven hundred and sixty plus one hundred and forty, which is nine hundred crore, exactly what they paid out.',
    }),
    sl('check', 'Quick check: name the market', {
      b: 'Fill in the blank: household saving is lent to firms through the ___ market.',
      chk: 'fb_fin_market',
      n: 'Think of the banks and institutions that collect deposits and give loans.',
    }),
    sl('concept', 'Why the circular flow matters', {
      b: 'It shows that national income can be measured at **three points** of one circle, that sectors **depend on each other**, and how **leakages and injections** change income.',
      v: vMethods,
      n: 'The circle is more than a picture. Because the same rupees pass through production, factor incomes and spending, national income can be measured in three ways that must agree. It also shows that a cut in one group\'s spending cuts another group\'s income, and it prepares us for leakages and injections in the next part.',
    }),
    sl('summary', 'Summary', {
      bl: ['The circular flow is the unending movement of **production, income and spending**.', 'Two markets: **factor** and **product**; four flows, two real and two money, in opposite directions.', 'Money flows equal real flows in value.', 'With saving, the flow stays steady when **investment equals saving**.'],
      v: vTwo,
      n: 'Let us sum up. Production creates income, income is spent, and spending calls forth more production. In the simple model, factor services and goods move one way while payments move the other. When families save, the financial market returns their saving to firms as investment, and the flow stays steady if the two are equal.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Label **every arrow** in a circular-flow diagram and say whether it is real or money.', 'Money flows run **opposite** to real flows; do not draw them the same way.', 'Profit is a **factor payment** to households, not something kept outside the circle.', 'With saving, state the condition: **saving equals investment**.'],
      n: 'Four habits earn marks here. Label each arrow and mark it as a real or a money flow. Draw money flows opposite to the real flows they pay for. Remember that profit goes to households as owners of enterprise. And when saving appears, always state that the flow is steady only if investment equals saving.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Circular Flow of Income — Part 2: Government, the World, Leakages and Injections',
  goals: [
    'Add the government to the circular flow and name its money flows',
    'Add the rest of the world through exports and imports',
    'Classify leakages and injections and explain what happens when they differ',
  ],
  slides: [
    sl('title', 'Government, the World, Leakages and Injections', {
      b: 'Part 2 — the **three-sector** and **four-sector** models, and the balance of **leakages and injections**.',
      v: flow('LR', ['Adding the government', 'Adding the rest of the world', 'Leakages and injections', 'When they differ', 'Conditions for balance'], 'Route map of Part 2: adding the government, adding the rest of the world, leakages and injections, what happens when they differ, and the conditions for balance', 'Part 2 at a glance'),
      n: 'Real economies have governments that tax and spend, and they trade with other countries. In this part we add both to our circle. We then sort every flow into leakages, which take money out of the circle, and injections, which put money back, and see why income rises or falls when the two do not match.',
    }),
    sl('diagram', 'The three-sector model', {
      b: 'The **government** collects **taxes** and returns money as **purchases, salaries, transfers and subsidies**.',
      v: vThree,
      n: 'Add the government at the top. Households and firms pay taxes to it. The government pays salaries to its employees and transfers such as pensions to households, and it buys goods from firms and pays them subsidies. Taxes take money out of private spending, while government spending puts money back into the circle.',
    }),
    sl('two-column', 'Purchases and transfers', {
      cols: ['**Government purchase**\n\n- Buses, desks, medicines\n- Goods come in return\n- Has a matching real flow', '**Transfer payment**\n\n- Pensions, scholarships\n- Nothing in return\n- No matching real flow'],
      v: vTransfer,
      n: 'Not all government payments are alike. When the state buys buses from a firm, the buses come in return, so there is a real flow opposite to the payment. When it pays a pension or a scholarship, nothing is produced or given back. Such transfer payments move income from one group to another without any matching real flow.',
    }),
    sl('check', 'Quick check: a scholarship', {
      b: 'True or false: a government scholarship to a student is a money flow from the government to households.',
      chk: 'tf_transfer',
      n: 'Ask who pays, who receives, and whether anything comes back in return.',
    }),
    sl('example', 'Worked example 3: balance in imagined Malaygiri', {
      b: 'Income ₹1,000 crore; saving 150; taxes 200; investment 130; government spending 220.',
      bl: [
        `Step 1 — Consumption = ${MAL.Y} − ${MAL.S} − ${MAL.T} = **${MAL_C}**.`,
        `Step 2 — Leakages = saving + taxes = ${MAL.S} + ${MAL.T} = **${MAL_LEAK}**.`,
        `Step 3 — Injections = investment + government spending = ${MAL.I} + ${MAL.G} = **${MAL_INJ}**.`,
        `Step 4 — Equal, so firms receive ${MAL_C} + ${MAL.I} + ${MAL.G} = ${inr(MAL.Y)}: the flow is steady.`,
      ],
      v: vMal,
      n: 'In imagined Malaygiri, households earn one thousand crore, save one hundred and fifty and pay two hundred in tax, so they consume six hundred and fifty. Leakages of saving and tax total three hundred and fifty. Injections of investment and government spending also total three hundred and fifty. Firms receive one thousand crore, the same as income, so the flow is steady.',
    }),
    sl('diagram', 'The four-sector model', {
      b: 'The **rest of the world** buys our **exports** and sells us **imports**.',
      v: vFour,
      n: 'Now open the economy. Foreign buyers pay domestic firms for exports, which brings money into the circle. When households, firms or the government buy goods from abroad, the payments leave the country. So exports add to spending on our output, while imports take spending away from it.',
    }),
    sl('check', 'Quick check: the fourth sector', {
      b: 'Fill in the blank: the four-sector model adds the ___ sector, which buys our exports and sells us imports.',
      chk: 'fb_four_sector',
      n: 'Think of everyone outside the country who trades with it.',
    }),
    sl('concept', 'Leakages and injections', {
      b: 'A **leakage** takes income out of spending on domestic output; an **injection** adds spending from outside household consumption.',
      v: vLeakInj,
      n: 'There are three leakages: saving, taxes and imports. There are three matching injections: investment, government spending and exports. Each pair passes through one place: saving and investment through the financial market, taxes and government spending through the government, and imports and exports through the rest of the world.',
    }),
    sl('example', 'Worked example 4: an open economy in balance', {
      b: 'Imagined Vindhyadesh: compare total leakages with total injections.',
      bl: [
        `Step 1 — Consumption = ${VIN.Y} − ${VIN.S} − ${VIN.T} = **${VIN_C}**.`,
        `Step 2 — Leakages = ${VIN.S} + ${VIN.T} + ${VIN.M} = **${VIN_LEAK}**.`,
        `Step 3 — Injections = ${VIN.I} + ${VIN.G} + ${VIN.X} = **${VIN_INJ}**.`,
        `Step 4 — Spending on domestic output = ${VIN_C} + ${VIN.I} + ${VIN.G} + ${VIN.X} − ${VIN.M} = **${inr(VIN_SPEND)}** = income.`,
      ],
      v: vVin,
      n: 'In imagined Vindhyadesh, income is one thousand two hundred crore. Saving, taxes and imports total five hundred and fifty, and so do investment, government spending and exports. A second check agrees: consumption plus investment plus government spending plus exports, minus imports, comes back to one thousand two hundred. The flow is in balance.',
    }),
    sl('check', 'Quick check: sort the flows', {
      b: 'Match each item with its place in the circular flow.',
      chk: 'mt_leak_inj',
      n: 'For each item, ask whether money is leaving the circle or coming into it, and through which sector.',
    }),
    sl('diagram', 'When leakages exceed injections', {
      b: 'Less spending comes back than firms paid out, so **income falls**.',
      v: vFall,
      n: 'Suppose people plan to save, pay tax and import more than firms invest, the government spends and foreigners buy. Then firms receive less than they paid out. Goods stay unsold, so firms cut output and jobs, and income falls. As income falls, leakages shrink too, until they match injections again at a lower income.',
    }),
    sl('example', 'Worked example 5: a shortfall in imagined Sarayu Pradesh', {
      b: 'Compare planned leakages with planned injections and predict the effect.',
      bl: [
        `Step 1 — Leakages = ${SAR.S} + ${SAR.T} + ${SAR.M} = **${SAR_LEAK}** (₹ crore).`,
        `Step 2 — Injections = ${SAR.I} + ${SAR.G} + ${SAR.X} = **${SAR_INJ}**.`,
        `Step 3 — Leakages are larger by **${SAR_GAP}**.`,
        'Step 4 — Spending falls short, stocks pile up, and income falls until the gap closes.',
      ],
      v: vSarBars,
      n: 'In imagined Sarayu Pradesh, planned leakages are five hundred and twenty crore, but planned injections are only four hundred and seventy. The fifty crore gap means firms receive less than they paid out. Warehouses fill up, factories cut shifts, and income falls until leakages shrink to the level of injections.',
    }),
    sl('diagram', 'When injections exceed leakages', {
      b: 'More spending comes back than firms paid out, so **income rises**.',
      v: vRise,
      n: 'Now the opposite case. If investment, government spending and exports are larger than saving, taxes and imports, firms receive more than they paid out. Their stocks run down, so they produce more and hire more workers. Income rises, and as it rises leakages grow, until they catch up with injections at a higher income.',
    }),
    sl('check', 'Quick check: are exports a leakage?', {
      b: 'True or false: exports are a leakage because goods leave the country.',
      chk: 'tf_exports_leak',
      n: 'Follow the money, not the goods: which way does payment for exports travel?',
    }),
    sl('concept', 'Conditions for a steady flow', {
      b: 'In every model, the flow is steady when **total leakages equal total injections**.',
      v: vConditions,
      n: 'The rule is the same in every model; only the list grows. With saving alone, saving must equal investment. With a government, saving and taxes must equal investment and government spending. With foreign trade too, saving, taxes and imports must equal investment, government spending and exports.',
    }),
    sl('summary', 'Summary', {
      bl: ['The **government** takes taxes and returns purchases, salaries, transfers and subsidies.', 'The **rest of the world** brings export receipts in and takes import payments out.', 'Leakages: **saving, taxes, imports**. Injections: **investment, government spending, exports**.', 'Leakages larger: income **falls**. Injections larger: income **rises**. Equal: income is **steady**.'],
      v: vLeakInj,
      n: 'To sum up, the government and the rest of the world each add a pair of flows to the circle. Saving, taxes and imports leak money out, while investment, government spending and exports inject it back. When the two sides are equal, income is steady; when one side is larger, income moves until they match again.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['**Imports are a leakage** and **exports an injection**: follow the money, not the goods.', 'Taxes are a leakage even though the government spends them: count that spending as an **injection**.', 'In numericals, list leakages and injections in two columns before adding.', 'Say **in which direction income moves** and **why** it stops moving.'],
      n: 'Watch four points. Imports take money out and exports bring it in, whatever happens to the goods. Taxes are a leakage, and the government\'s spending is the matching injection. In calculations, set out leakages and injections side by side. And when they differ, explain both the direction of change in income and why it settles.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Circular Flow of Income — Notes',
  sections: [
    {
      h: '1. Meaning and importance of the circular flow',
      t: 1,
      b: '- **Circular flow of income**: the continuous movement of **production, income and expenditure** between the sectors of an economy. Production creates factor incomes, incomes are spent, and spending allows production to continue.\n- It is circular because it **has no beginning or end**: one sector\'s spending is another sector\'s income.\n- **Importance**: (1) national income can be measured at **three points** (product, income and expenditure methods), which must give the same total; (2) it shows the **interdependence** of sectors; (3) it identifies **leakages and injections**, which explain changes in income and guide policy.',
      terms: [['Circular flow of income', 'The continuous movement of production, income and spending among the sectors of an economy.'], ['Interdependence', 'Each sector depends on the spending of others for its income.']],
      v: vThreeStages,
      vs: [vMethods],
    },
    {
      h: '2. The simple two-sector model',
      t: 1,
      b: '- **Assumptions**: only households and firms; no government; no foreign trade; households spend all income (no saving); firms sell all output to households; households own all factors.\n- **Factor market**: households supply land, labour, capital and enterprise (real flow) and receive rent, wages, interest and profit (money flow).\n- **Product market**: firms supply goods and services (real flow) and receive consumption spending (money flow).\n- **Real flows** are flows of factor services and goods; **money flows** are payments. They move in **opposite directions** and are **equal in value**.\n- Imagined Kanakdwip: wages 500 + rent 80 + interest 70 + profit 150 = ₹800 crore of income, all spent.',
      terms: [['Real flow', 'A flow of factor services or of goods and services.'], ['Money flow', 'A flow of payments, such as factor incomes or consumption spending.'], ['Factor market', 'The market where households sell factor services to firms.'], ['Product market', 'The market where firms sell goods and services to households.']],
      v: vTwo,
      vs: [vAssume, vRealMoney, vKan],
    },
    {
      h: '3. Saving, investment and the financial market',
      t: 1,
      b: `- When households **save**, consumer spending is less than income, so firms\' receipts fall short.\n- The **financial (capital) market**, made up of banks and other institutions, collects saving and **lends it to firms**, which spend it on **investment** (machines, buildings, stocks).\n- **Condition for a steady flow**: **investment = saving**. If investment is less than saving, income shrinks; if it is more, income grows.\n- Imagined Neelachal: income ${NEE.Y}, saving ${NEE.S}, consumption ${NEE_C}, investment ${NEE.I}; receipts ${NEE_C + NEE.I} = income (₹ crore).`,
      terms: [['Saving', 'The part of income not spent on consumption.'], ['Investment', 'Spending by firms on capital goods and stocks.'], ['Financial market', 'Banks and institutions that channel saving into loans for investment.']],
      v: vTwoSave,
      vs: [vNee],
    },
    {
      h: '4. The three-sector model: adding the government',
      t: 2,
      b: `- Households and firms pay **taxes** to the government (a leakage).\n- The government pays **salaries** and factor incomes to households, **transfers** such as pensions and scholarships, buys **goods and services** from firms, and pays **subsidies** to firms (government spending, an injection).\n- A **purchase** has goods in return; a **transfer** has nothing in return.\n- Household budget: income = consumption + saving + taxes. Example: income ${HH.Y}, taxes ${HH.T}, saving ${HH.S}, so consumption ${HH_C} (₹ crore).\n- **Condition for a steady flow**: saving + taxes = investment + government spending. Imagined Malaygiri: ${MAL.S} + ${MAL.T} = ${MAL.I} + ${MAL.G} = ${MAL_LEAK}.`,
      terms: [['Transfer payment', 'A payment by the government for which nothing is produced or given in return.'], ['Subsidy', 'A payment by the government to producers.']],
      v: vThree,
      vs: [vTransfer, vHH, vMal],
    },
    {
      h: '5. The four-sector model: adding the rest of the world',
      t: 2,
      b: `- **Exports**: foreign buyers pay domestic firms, so money flows **in** (an injection).\n- **Imports**: households, firms and the government pay foreign sellers, so money flows **out** (a leakage).\n- Spending on domestic output = consumption + investment + government spending + exports − imports.\n- **Condition for a steady flow**: saving + taxes + imports = investment + government spending + exports.\n- Imagined Vindhyadesh: leakages ${VIN.S} + ${VIN.T} + ${VIN.M} = ${VIN_LEAK}; injections ${VIN.I} + ${VIN.G} + ${VIN.X} = ${VIN_INJ}; spending on domestic output ${inr(VIN_SPEND)} = income (₹ crore).`,
      terms: [['Export receipts', 'Money received from the rest of the world for goods and services sold abroad.'], ['Import payments', 'Money paid to the rest of the world for goods and services bought from abroad.']],
      v: vFour,
      vs: [vVin],
    },
    {
      h: '6. Leakages and injections',
      t: 3,
      b: `- **Leakages (withdrawals)**: income not passed on as spending on domestic output: **saving, taxes, imports**.\n- **Injections**: spending added from outside household consumption: **investment, government spending, exports**.\n- **Leakages larger than injections**: spending falls short of output, stocks pile up, firms cut output, **income falls** until leakages shrink to match. Imagined Sarayu Pradesh: ${SAR_LEAK} against ${SAR_INJ}, a gap of ${SAR_GAP} (₹ crore).\n- **Injections larger than leakages**: stocks run down, firms raise output, **income rises** until leakages grow to match. Imagined Tungadesh: ${TUN_INJ} against ${TUN_LEAK}.\n- At every level of the model, income is steady when **total leakages = total injections**.`,
      terms: [['Leakage', 'Income withdrawn from the circular flow: saving, taxes or imports.'], ['Injection', 'Spending added to the circular flow: investment, government spending or exports.']],
      v: vLeakInj,
      vs: [vSarBars, vFall, vRise, vTun, vConditions],
    },
  ],
  tips: '**Common mistakes**\n- Drawing money flows in the same direction as real flows.\n- Calling imports an injection because goods come in, or exports a leakage because goods go out.\n- Forgetting that profit is a factor income of households.\n- Subtracting only saving (or only taxes) when finding consumption in the three-sector model.\n- Stating a direction of change in income without the reason (unsold stocks or running-down stocks).\n\n**How marks are usually awarded**\n- 1 mark: a correct option, a classification or a one-step calculation.\n- 2 marks: two points, or a point with an example.\n- 3 marks: three points, or a calculation with a conclusion.\n- 5 marks (and ISC 4- and 8-mark questions): a labelled explanation or diagram description in parts, with working and a reasoned conclusion.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Circular flow of income**', 'The unending movement of **production, income and spending** among sectors.', 'definition', 1],
  ['Why is the flow circular?', 'One sector\'s **spending** is another sector\'s **income**.', 'concept', 1],
  ['Two sectors of the simple model', '**Households** (own factors) and **firms** (produce).', 'fact', 1],
  ['Assumptions of the simple model', 'No government, no foreign trade, no saving, all output sold to households.', 'fact', 1],
  ['**Real flow**', 'A flow of factor services or goods and services.', 'definition', 1],
  ['**Money flow**', 'A flow of payments: factor incomes or spending.', 'definition', 1],
  ['Direction of money flows', '**Opposite** to the real flows they pay for.', 'concept', 1],
  ['**Factor market**', 'Households sell factor services; firms pay rent, wages, interest, profit.', 'definition', 1],
  ['**Product market**', 'Firms sell goods and services; households pay consumption spending.', 'definition', 1],
  ['Is profit inside the circle?', 'Yes: it is the reward for enterprise, paid to households.', 'exam-tip', 1],
  ['Kanakdwip (imagined): 500 + 80 + 70 + 150', `Household income ₹${KAN_FP} crore, all spent as consumption.`, 'example', 1],
  ['Role of the **financial market**', 'Collects saving and lends it to firms for **investment**.', 'concept', 1],
  ['Steady flow with saving', '**Saving = investment**.', 'formula', 1],
  ['Three uses of the circular flow', 'Measuring national income; showing interdependence; leakages and injections.', 'concept', 1],
  ['Three-sector model adds…', 'The **government**: taxes, purchases, salaries, transfers, subsidies.', 'fact', 2],
  ['**Transfer payment**', 'A government payment with **nothing in return**: pensions, scholarships.', 'definition', 2],
  ['Government purchase versus transfer', 'A purchase brings goods in return (real flow); a transfer does not.', 'concept', 2],
  ['Household budget, three sectors', 'Income = consumption + saving + taxes.', 'formula', 2],
  ['Four-sector model adds…', 'The **rest of the world**: exports and imports.', 'fact', 2],
  ['Export receipts', 'Money flows **in** from abroad: an **injection**.', 'concept', 2],
  ['Import payments', 'Money flows **out** to the rest of the world: a **leakage**.', 'concept', 2],
  ['Spending on domestic output, four sectors', 'Consumption + investment + government spending + exports − imports.', 'formula', 2],
  ['The three **leakages**', 'Saving, taxes, imports.', 'fact', 3],
  ['The three **injections**', 'Investment, government spending, exports.', 'fact', 3],
  ['Steady flow, three sectors', 'Saving + taxes = investment + government spending.', 'formula', 3],
  ['Steady flow, four sectors', 'Saving + taxes + imports = investment + government spending + exports.', 'formula', 3],
  ['Leakages exceed injections', 'Unsold stocks, output cut, **income falls** until they match.', 'concept', 3],
  ['Injections exceed leakages', 'Stocks run down, output raised, **income rises** until they match.', 'concept', 3],
  ['Sarayu Pradesh (imagined): 520 against 470', `Leakages larger by ₹${SAR_GAP} crore, so income falls.`, 'example', 3],
  ['Taxes: leakage or not, since the government spends them?', 'A **leakage**; the government\'s spending is counted separately as an **injection**.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Circular Flow of Income',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_cf_meaning', 'm_real_flow_eg', 'm_gov_hh', 'm_leak_gt', 'ar_two_equal'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_real_money', { attempt: 1, keys: ['s_two_assumptions', 's_leak_inj'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_mal_numbers', { attempt: 1, keys: ['s3_four_extend', 's3_sar_effect'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with working where needed.', items: ['l_two_sector'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Circular Flow of Income',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_two_assume', 'm_money_flow_eg', 'm_s_eq_i', 'm_three_add', 'm_export_flow', 'm_hh_c', 'm_leak_meaning', 'm_inj_eg', 'm_eq_four', 'm_kon_x', 'ar_tax_leak', 'ar_leak_fall'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_fin_role', 's_gov_hh_flows', { attempt: 1, keys: ['s_row_flows', 's_export_rise'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_cf_uses', 's3_four_flows', 's3_classify_six', { attempt: 1, keys: ['s3_gov_roles', 's3_kon_x'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_vin_numbers', { attempt: 1, keys: ['l_three_four', 'l_leak_inj'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of isc-12-economics-ch18 only (two-sector model with real and money flows and the financial market; three- and four-sector models; leakages and injections)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every economy, firm and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch01',
    data: `figures computed in questions.mjs and asserted: Kanakdwip ${KAN.wages} + ${KAN.rent} + ${KAN.interest} + ${KAN.profit} = ${KAN_FP}; Neelachal ${NEE.Y} − ${NEE.S} = ${NEE_C}, ${NEE_C} + ${NEE.I} = ${NEE.Y}; Malaygiri C ${MAL_C}, ${MAL_LEAK} = ${MAL_INJ}; Vindhyadesh C ${VIN_C}, ${VIN_LEAK} = ${VIN_INJ}, spending ${VIN_SPEND}; Sarayu ${SAR_LEAK} − ${SAR_INJ} = ${SAR_GAP}; Tungadesh ${TUN_INJ} − ${TUN_LEAK} = ${TUN_GAP}`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
