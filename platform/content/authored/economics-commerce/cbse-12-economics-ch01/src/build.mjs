// Build CBSE 12 Economics ch01 National Income and Related Aggregates. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch01', 'economics-commerce');
const { inr, valueAdded, expenditure, income, deflator } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- deck figures (computed, never typed)
const WE1 = { sales: 900, dstock: 60, ic: 400, dep: 40, nit: 20 }; // imagined spinning mill, ₹ lakh
const W1 = valueAdded(WE1);
const WE2 = { c: 1200, i: 300, g: 250, x: 150, m: 200, dep: 100, nit: 120, nfia: -30 }; // imagined economy, ₹ crore
const W2 = expenditure(WE2);
const WE3 = { coe: 800, rent: 120, interest: 90, profit: 210, mixed: 300 };
const W3 = income(WE3);
const BASE = { mango: [1000, 50], cycle: [20, 4000] }; // 2020 quantity, price
const CUR = { mango: [1100, 60], cycle: [25, 4400] }; // 2024
const nom20 = BASE.mango[0] * BASE.mango[1] + BASE.cycle[0] * BASE.cycle[1];
const nom24 = CUR.mango[0] * CUR.mango[1] + CUR.cycle[0] * CUR.cycle[1];
const real24 = CUR.mango[0] * BASE.mango[1] + CUR.cycle[0] * BASE.cycle[1];
const def24 = deflator(nom24, real24);
for (const [ok, what] of [
  [W1.output === 960 && W1.gvaMP === 560 && W1.nvaMP === 520 && W1.nvaFC === 500, 'W1'],
  [W2.gdpMP === 1700 && W2.ndpMP === 1600 && W2.ndpFC === 1480 && W2.nnpFC === 1450 && W2.gnpMP === 1670, 'W2'],
  [W3.os === 420 && W3.ndpFC === 1520, 'W3'],
  [nom20 === 130000 && nom24 === 176000 && real24 === 155000 && def24 === 113.5, 'real/nominal'],
]) if (!ok) throw new Error(`deck figure check failed: ${what}`);
const pct = (a, b) => (((b - a) / a) * 100).toFixed(1);

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Basic concepts', 'Circular flow', 'Product method', 'Income method', 'Expenditure method'], 'Route map of Part 1: basic concepts, the circular flow of income, then the product, income and expenditure methods', 'Part 1 at a glance');
const vGoods = table(
  ['Basis', 'Kind of good', 'Example (imagined)'],
  [
    ['Satisfies wants directly', 'Consumption good', 'Rice, a shirt, a haircut bought by a family'],
    ['Used to produce other goods for years', 'Capital good', 'A loom in a Varanasi weaving shed'],
    ['Bought for final use (consumption or investment)', 'Final good', 'Paint bought by a family to paint its home'],
    ['Used up or resold in production within the year', 'Intermediate good', 'Paint bought by a builder for flats he will sell'],
  ],
  'Table of kinds of goods: consumption goods satisfy wants directly, capital goods produce other goods for years, final goods are bought for final use, and intermediate goods are used up in production; paint is final for a family and intermediate for a builder',
  'The same good can be final or intermediate: what matters is its end use.',
);
const vStockFlow = table(
  ['', 'Stock', 'Flow'],
  [
    ['Measured', 'At a point of time', 'Over a period of time'],
    ['Time dimension', 'None (on 31 March)', 'Per day, month or year'],
    ['Examples', 'Capital, wealth, money supply on a date', 'Income, investment, depreciation, consumption'],
    ['Picture', 'Water in a tank', 'Water flowing in per minute'],
  ],
  'Table comparing stock and flow: a stock is measured at a point of time, like capital or wealth or water in a tank; a flow is measured over a period, like income, investment, depreciation, or water flowing in per minute',
);
const vInvest = flow('LR', ['Gross investment (all new capital goods)', 'minus depreciation (wear and tear, expected obsolescence)', 'Net investment (addition to the capital stock)'], 'Flow: gross investment minus depreciation gives net investment, the addition to the capital stock', 'Gross investment = net investment + depreciation');
const vCircular = (() => {
  const s = new Svg(660, 350);
  s.rect(30, 135, 170, 80, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(115, 175, 'Households', { bold: true, size: 16 });
  s.rect(460, 135, 170, 80, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(545, 175, 'Firms', { bold: true, size: 16 });
  // Real flows (outer, accent)
  s.polyline([[90, 135], [90, 45], [570, 45]], { color: 'accent', sw: 2.5 });
  s.arrow(570, 45, 570, 133, { color: 'accent', sw: 2.5 });
  s.text(330, 30, 'Factor services (land, labour, capital, enterprise)', { color: 'accent', size: 13 });
  s.polyline([[570, 215], [570, 310], [90, 310]], { color: 'accent', sw: 2.5 });
  s.arrow(90, 310, 90, 217, { color: 'accent', sw: 2.5 });
  s.text(330, 328, 'Goods and services', { color: 'accent', size: 13 });
  // Money flows (inner, dashed)
  s.polyline([[510, 135], [510, 95], [150, 95]], { dash: true, sw: 2 });
  s.arrow(150, 95, 150, 133, { sw: 2 });
  s.text(330, 82, 'Factor payments: rent, wages, interest, profit', { size: 13 });
  s.polyline([[150, 215], [150, 258], [510, 258]], { dash: true, sw: 2 });
  s.arrow(510, 258, 510, 217, { sw: 2 });
  s.text(330, 274, 'Consumption expenditure', { size: 13 });
  s.text(330, 175, 'Real flows: solid; money flows: dashed', { size: 12, muted: true });
  return s.visual(
    'Circular flow diagram of a two-sector economy: households supply factor services to firms and firms send goods and services to households (outer solid loop, real flows); firms pay rent, wages, interest and profit to households and households pay consumption expenditure to firms (inner dashed loop, money flows), in the opposite direction',
    'Two-sector circular flow: real and money flows move in opposite directions.',
  );
})();
const vThreePoints = flow('LR', ['Production: firms add value', 'Income: value added paid out as rent, wages, interest, profit', 'Expenditure: households spend income on final goods', 'Back to firms'], 'Flow of the three points of measurement: production, where firms add value; income, where value added is paid out as factor incomes; and expenditure, where incomes are spent on final goods and return to firms', 'Product = Income = Expenditure');
const vChainMini = table(
  ['Stage (imagined)', 'Value of sale (₹)', 'Value added (₹)'],
  [['Cotton farmer → spinning mill', '300', '300'], ['Spinning mill → garment unit (yarn)', '500', '200'], ['Garment unit → households (shirts)', '900', '400'], ['**Total**', '1,700 (double counts)', '**900 = value of final shirts**']],
  'Table of a cotton–yarn–shirt chain: sales of 300, 500 and 900 rupees; values added 300, 200 and 400; adding sales gives 1,700, which double counts, while total value added is 900, equal to the final shirts',
  'Add values added, not sales.',
);
const vWE1 = table(
  ['Step (₹ lakh, imagined spinning mill)', 'Working', 'Result'],
  [
    ['Value of output', `Sales ${WE1.sales} + change in stock ${WE1.dstock}`, inr(W1.output)],
    ['GVA at MP', `${W1.output} − intermediate consumption ${WE1.ic}`, inr(W1.gvaMP)],
    ['NVA at MP', `${W1.gvaMP} − depreciation ${WE1.dep}`, inr(W1.nvaMP)],
    ['NVA at FC', `${W1.nvaMP} − net indirect taxes ${WE1.nit}`, `**${inr(W1.nvaFC)}**`],
  ],
  `Table of worked example 1: value of output 900 plus 60 equals 960; gross value added at market price 960 minus 400 equals 560; net value added at market price 520; net value added at factor cost 500 lakh rupees`,
);
const vIncome = table(
  ['Component', 'What it includes'],
  [
    ['Compensation of employees', 'Wages and salaries in cash, payments in kind (free meals, housing), employer\'s contribution to social security'],
    ['Operating surplus', 'Rent and royalty, interest, profit (dividends + corporate tax + retained earnings)'],
    ['Mixed income of the self-employed', 'Earnings of farmers, shopkeepers, doctors in private practice, where labour and capital returns cannot be separated'],
    ['**Sum**', '**NDP at factor cost (domestic income)**; add NFIA for national income'],
  ],
  'Table of the income method: compensation of employees, operating surplus made of rent, interest and profit, and mixed income of the self-employed add up to net domestic product at factor cost',
);
const vExp = table(
  ['Component', 'Who spends', 'Symbol'],
  [
    ['Private final consumption expenditure', 'Households and non-profit institutions', 'C'],
    ['Government final consumption expenditure', 'Government (salaries, services provided free)', 'G'],
    ['Gross domestic capital formation', 'Firms and others: fixed capital + change in stock', 'I'],
    ['Net exports', 'Rest of the world: exports − imports', 'X − M'],
    ['**Sum**', '**GDP at market price**', 'C + I + G + (X − M)'],
  ],
  'Table of the expenditure method: private consumption, government consumption, gross domestic capital formation and net exports add up to gross domestic product at market price',
);
const vWE2 = table(
  ['Item (₹ crore, imagined economy)', 'Amount'],
  [
    ['Private final consumption (C)', inr(WE2.c)],
    ['Gross domestic capital formation (I)', inr(WE2.i)],
    ['Government final consumption (G)', inr(WE2.g)],
    ['Net exports (X − M)', `${WE2.x} − ${WE2.m} = ${W2.nx}`],
    ['**GDP at MP**', `**${inr(W2.gdpMP)}**`],
  ],
  'Table of worked example 2: consumption 1,200, investment 300, government 250 and net exports minus 50 give GDP at market price of 1,700 crore rupees',
);
const vWE3 = table(
  ['Item (₹ crore, imagined economy)', 'Amount'],
  [
    ['Compensation of employees', inr(WE3.coe)],
    ['Rent + interest + profit (operating surplus)', `${WE3.rent} + ${WE3.interest} + ${WE3.profit} = ${W3.os}`],
    ['Mixed income of the self-employed', inr(WE3.mixed)],
    ['**NDP at FC**', `**${inr(W3.ndpFC)}**`],
  ],
  'Table of worked example 3: compensation of employees 800, operating surplus 420 and mixed income 300 give NDP at factor cost of 1,520 crore rupees',
);
const vInclude = table(
  ['Item', 'Counted?', 'Why'],
  [
    ['Imputed rent of an owner-occupied house', 'Yes', 'A housing service is produced'],
    ['Grain kept by a farmer for his family', 'Yes', 'Own-account production'],
    ['Free meals given to staff', 'Yes', 'Compensation in kind'],
    ['Old-age pension, scholarship', 'No', 'Transfer payment'],
    ['Sale of a second-hand car', 'No (commission yes)', 'Produced in an earlier year'],
    ['Purchase of shares or bonds', 'No (brokerage yes)', 'Financial asset; nothing produced'],
    ['Unpaid housework, lottery prize', 'No', 'Non-market service; windfall gain'],
  ],
  'Checklist table: imputed rent, own-account production and payments in kind are counted; transfers, second-hand goods, shares and bonds, unpaid housework and lottery prizes are not, though commissions and brokerage are',
);
const vSummary1 = table(
  ['Method', 'Adds up', 'Gives', 'Watch out for'],
  [
    ['Product (value added)', 'Output − intermediate consumption of every firm', 'GDP at MP', 'Double counting, second-hand goods'],
    ['Income', 'Compensation + operating surplus + mixed income', 'NDP at FC', 'Transfers, windfall gains'],
    ['Expenditure', 'C + I + G + (X − M)', 'GDP at MP', 'Intermediate and financial purchases'],
  ],
  'Summary table of the three methods: the product method adds values added and gives GDP at market price; the income method adds factor incomes and gives NDP at factor cost; the expenditure method adds final expenditures and gives GDP at market price',
);

// Part 2 visuals
const vRoute2 = flow('LR', ['Three pairs of concepts', 'Domestic territory and residents', 'From GDP to national income', 'Real and nominal GDP', 'GDP and welfare'], 'Route map of Part 2: three pairs of concepts, domestic territory and residents, the conversion from GDP to national income, real and nominal GDP, and GDP and welfare', 'Part 2 at a glance');
const vPairs = table(
  ['Pair', 'Difference between them', 'Adjust by'],
  [
    ['Gross ↔ Net', 'Gross includes depreciation', 'Depreciation'],
    ['Domestic ↔ National', 'Territory vs normal residents', 'Net factor income from abroad (NFIA)'],
    ['Market price ↔ Factor cost', 'Market price includes net indirect taxes', 'Net indirect taxes (indirect taxes − subsidies)'],
  ],
  'Table of the three pairs of concepts: gross and net differ by depreciation, domestic and national by net factor income from abroad, market price and factor cost by net indirect taxes',
);
const vTerritory = table(
  ['Part of India\'s domestic territory', 'Not part of it'],
  [
    ['Land, territorial waters and airspace of India', 'Foreign embassies and consulates in India'],
    ['Indian embassies, consulates and military bases abroad', 'Offices of international organisations in India'],
    ['Ships, aircraft and fishing boats run by residents between countries or in international waters', 'Factories of Indian companies located abroad'],
  ],
  'Table of domestic territory: it includes the land, waters and airspace of India, Indian embassies abroad and ships, aircraft and fishing boats run by residents; it excludes foreign embassies and international organisations in India and factories of Indian companies abroad',
);
const vNfia = flow('LR', ['Factor income earned by residents from abroad', 'minus factor income paid to non-residents', 'NFIA', 'Domestic income + NFIA = national income'], 'Flow: factor income earned from abroad minus factor income paid to non-residents is net factor income from abroad, which is added to domestic income to give national income', 'NFIA can be positive or negative');
const vLadder = flow('TB', [`GDP at MP (${inr(W2.gdpMP)})`, `− depreciation ${WE2.dep} → NDP at MP (${inr(W2.ndpMP)})`, `− net indirect taxes ${WE2.nit} → NDP at FC (${inr(W2.ndpFC)})`, `+ NFIA (${WE2.nfia}) → NNP at FC = national income (${inr(W2.nnpFC)})`], 'Ladder from GDP at market price 1,700 to NDP at market price 1,600 after depreciation, to NDP at factor cost 1,480 after net indirect taxes, to national income 1,450 after adding net factor income from abroad of minus 30', 'Worked example 4 (₹ crore, imagined)');
const vMpFc = table(
  ['Item (imagined bicycle)', '₹'],
  [['Payments to factors (factor cost)', '4,000'], ['+ GST and other indirect taxes', '480'], ['− subsidy on the steel used', '80'], ['**Market price**', '**4,400**']],
  'Table of a bicycle price: factor cost 4,000 rupees plus indirect taxes 480 minus a subsidy of 80 gives a market price of 4,400 rupees',
  'Market price = factor cost + indirect taxes − subsidies.',
);
const vWE5 = table(
  ['Good (imagined town)', '2020 quantity × price', '2024 quantity × price', '2024 quantity × 2020 price'],
  [
    ['Mangoes (kg)', `${inr(BASE.mango[0])} × ${BASE.mango[1]}`, `${inr(CUR.mango[0])} × ${CUR.mango[1]}`, `${inr(CUR.mango[0])} × ${BASE.mango[1]}`],
    ['Bicycles', `${BASE.cycle[0]} × ${inr(BASE.cycle[1])}`, `${CUR.cycle[0]} × ${inr(CUR.cycle[1])}`, `${CUR.cycle[0]} × ${inr(BASE.cycle[1])}`],
    ['**Total (₹)**', `**${inr(nom20)}**`, `**${inr(nom24)}** (nominal)`, `**${inr(real24)}** (real)`],
  ],
  `Table of worked example 5: GDP in 2020 is 1,30,000 rupees; 2024 nominal GDP is 1,76,000 rupees; 2024 real GDP at 2020 prices is 1,55,000 rupees`,
  `Deflator 2024 = ${inr(nom24)} ÷ ${inr(real24)} × 100 ≈ ${def24}`,
);
const vBars = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 200, left: 70, top: 30, width: 420, height: 220, xLabel: 'Year', yLabel: '₹ thousand' });
  const bar = (x, v, fill) => { const a = ch.X(x - 0.18), b = ch.X(x + 0.18); s.rect(a, ch.Y(v), b - a, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 }); s.text((a + b) / 2, ch.Y(v) - 10, String(v), { size: 12 }); };
  bar(0.8, nom20 / 1000, 'fill'); bar(1.2, nom20 / 1000, 'accent');
  bar(1.8, nom24 / 1000, 'fill'); bar(2.2, real24 / 1000, 'accent');
  ch.xTick(1, '2020 (base)'); ch.xTick(2, '2024');
  for (const v of [50, 100, 150, 200]) ch.yTick(v, String(v));
  s.rect(90, 40, 14, 14, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
  s.text(110, 47, 'Nominal GDP', { anchor: 'start', size: 13 });
  s.rect(90, 64, 14, 14, { fill: 'accent', color: 'accent', sw: 1, rx: 2 });
  s.text(110, 71, 'Real GDP (2020 prices)', { anchor: 'start', size: 13 });
  return s.visual(
    `Bar chart of an imagined town: in the base year 2020 nominal and real GDP are both 130 thousand rupees; in 2024 nominal GDP is 176 thousand and real GDP is 155 thousand rupees`,
    `Nominal GDP grew ${pct(nom20, nom24)} per cent, real GDP only ${pct(nom20, real24)} per cent.`,
  );
})();
const vWelfare = table(
  ['Limitation of GDP as a welfare index', 'Example (imagined)', 'Effect'],
  [
    ['Distribution of GDP', 'Output rises, but gains go to a few owners', 'Most people may be no better off'],
    ['Non-monetary exchanges', 'Unpaid care at home, grain swapped in a village', 'Welfare understated'],
    ['Negative externalities', 'Smoke from a kiln harms nearby families', 'Welfare overstated'],
    ['Positive externalities', 'A park built by a firm used by the whole street', 'Welfare understated'],
  ],
  'Table of limitations of GDP as a measure of welfare: unequal distribution, non-monetary exchanges and positive externalities that GDP misses, and negative externalities it does not subtract',
);
const vSummary2 = table(
  ['Idea', 'Key relation'],
  [
    ['Gross and net', 'Net = gross − depreciation'],
    ['Domestic and national', 'National = domestic + NFIA'],
    ['Market price and factor cost', 'FC = MP − (indirect taxes − subsidies)'],
    ['National income', 'NNP at FC = GDP at MP − depreciation + NFIA − NIT'],
    ['GDP deflator', '(Nominal GDP ÷ real GDP) × 100'],
    ['GDP and welfare', 'Distribution, non-monetary exchanges, externalities'],
  ],
  'Summary table: net equals gross minus depreciation; national equals domestic plus NFIA; factor cost equals market price minus net indirect taxes; national income is GDP at market price minus depreciation plus NFIA minus net indirect taxes; the deflator is nominal over real GDP times 100; GDP is limited as a welfare index',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'National Income and Related Aggregates — Part 1: Concepts, Circular Flow and Methods',
  goals: [
    'Distinguish consumption and capital goods, final and intermediate goods, stocks and flows, gross and net investment',
    'Explain the circular flow of income in a two-sector economy',
    'Calculate national income by the value added, income and expenditure methods, with their precautions',
  ],
  slides: [
    sl('title', 'National Income and Related Aggregates', {
      b: 'Part 1 — **basic concepts**, the **circular flow** of income, and the **three methods** of measuring national income.',
      v: vRoute1,
      n: 'Welcome to Class 12 macroeconomics. Every year newspapers report how much the Indian economy produced and how fast it grew. Behind those headlines is national income accounting. In this first part we learn the basic words economists use, see how income goes round and round between households and firms, and practise the three ways of measuring national income.',
    }),
    sl('concept', 'What is macroeconomics?', {
      bl: [
        '**Microeconomics** studies single units: one consumer, one firm, the price of one good.',
        '**Macroeconomics** studies the economy **as a whole**: national income, total output, employment, the general price level.',
        'It asks: how much does the country produce, why do incomes rise or fall, how can the government keep prices stable?',
      ],
      n: 'Microeconomics looks at the trees: one buyer, one seller, one market. Macroeconomics looks at the forest: the total output, total employment and general level of prices in the whole economy. It deals with aggregates, which simply means totals. National income is the most important of these aggregates, so it is where we begin.',
    }),
    sl('concept', 'Kinds of goods', {
      v: vGoods,
      n: 'Goods can be classified in two ways. Consumption goods satisfy our wants directly, while capital goods, like a loom, help produce other goods for many years. Next, final goods are bought for final use, while intermediate goods are used up in production within the year. Look at the paint. A family painting its home buys a final good. A builder painting flats for sale buys an intermediate good. End use decides.',
    }),
    sl('check', 'Quick check: final or intermediate?', {
      b: 'Decide by the **end use** of the good.',
      chk: 'tf_milk',
      n: 'Ask what the buyer will do with the milk. Will it be consumed, or will it be used up in making something else for sale?',
    }),
    sl('two-column', 'Stocks and flows', {
      cols: [
        '**Stock**\n\n- Measured **at a point of time**.\n- Example: capital of a firm on 31 March; wealth; money supply on a date.',
        '**Flow**\n\n- Measured **over a period**.\n- Example: income per year; investment; depreciation; consumption.',
      ],
      v: vStockFlow,
      n: 'Think of a water tank. The water in the tank at noon is a stock: it is measured at one moment. The water flowing in each minute is a flow: it only makes sense per unit of time. In economics, capital and wealth are stocks, while income, investment and depreciation are flows. Flows change stocks, just as the inflow raises the level in the tank.',
    }),
    sl('concept', 'Investment and depreciation', {
      bl: [
        '**Gross investment**: all new capital goods (machines, buildings) plus the change in stock in a year.',
        '**Depreciation** (consumption of fixed capital): fall in value of fixed capital due to **normal wear and tear** and **expected obsolescence**.',
        '**Net investment** = gross investment − depreciation: the true **addition** to the capital stock.',
        'Losses from floods or unforeseen obsolescence are **capital losses**, not depreciation.',
      ],
      v: vInvest,
      n: 'When firms buy new machines and buildings, that is gross investment. But some old machines wear out during the year, and some become out of date in an expected way. That loss is depreciation, also called consumption of fixed capital. Subtract it, and you get net investment, which is the real addition to the country\'s capital stock. Sudden losses from a flood are not depreciation.',
    }),
    sl('check', 'Quick check: stock or flow?', {
      b: 'Look for a **time period** in the definition.',
      chk: 'm_flow',
      n: 'For each option, ask whether it would make sense to say per year. If it does, it is a flow.',
    }),
    sl('diagram', 'The circular flow of income', {
      v: vCircular,
      bl: ['Assume: only households and firms; households spend all income; no government, no foreign trade.'],
      n: 'Here is a simple economy with only households and firms. Households own land, labour, capital and enterprise, and supply these factor services to firms. Firms pay them rent, wages, interest and profit. Households spend this income on the goods and services of firms. The solid outer loop shows real flows, and the dashed inner loop shows money flows, moving in the opposite direction.',
    }),
    sl('concept', 'Three points of measurement', {
      v: vThreePoints,
      b: 'The same flow can be measured where it is **produced**, where it is **earned** and where it is **spent**.',
      n: 'Because income goes round in a circle, we can stand at three different points and measure it. At the production point we add up the value added by firms. At the income point we add up rent, wages, interest and profit. At the expenditure point we add up spending on final goods. In a two-sector economy all three totals are the same, which gives us three methods.',
    }),
    sl('check', 'Quick check: real or money flow?', {
      b: 'Real flows are things; money flows are payments.',
      chk: 'm_real_flow',
      n: 'Remember the two loops in the diagram. One carries factor services and goods, the other carries payments.',
    }),
    sl('concept', 'Product method and double counting', {
      v: vChainMini,
      bl: [
        '**Value of output** = sales + change in stock.',
        '**Gross value added at MP** = value of output − intermediate consumption.',
        'Adding sales of every stage counts inputs again and again: **double counting**.',
      ],
      n: 'In the product method we add the value added by every producer. Look at the shirt chain. If we added all three sales, we would count the cotton three times and the yarn twice, getting 1,700. Adding only the value added at each stage gives 900, exactly the value of the final shirts. So the product method avoids double counting by design.',
    }),
    sl('example', 'Worked example 1: value added by a firm', {
      b: `An imagined spinning mill in Coimbatore (₹ lakh): sales ${WE1.sales}, change in stock +${WE1.dstock}, intermediate consumption ${WE1.ic}, depreciation ${WE1.dep}, net indirect taxes ${WE1.nit}. Find NVA at FC.`,
      bl: ['Step 1 — Output = sales + change in stock.', 'Step 2 — Subtract intermediate consumption for GVA at MP.', 'Step 3 — Subtract depreciation, then net indirect taxes.'],
      v: vWE1,
      n: 'First the value of output. The mill sold 900 and added 60 to its stock, so it produced 960. Subtract the 400 of cotton and power it used up, and gross value added at market price is 560. Subtract depreciation of 40 to get 520, and net indirect taxes of 20 to reach net value added at factor cost of 500 lakh rupees.',
    }),
    sl('concept', 'Income method', {
      v: vIncome,
      n: 'In the income method we add the factor incomes paid out by all producers. Compensation of employees includes wages, payments in kind like free meals, and the employer\'s contribution to social security. Operating surplus is rent, interest and profit. Mixed income belongs to the self-employed, such as a farmer or shopkeeper, whose returns cannot be split. Their sum is domestic income.',
    }),
    sl('concept', 'Expenditure method', {
      v: vExp,
      n: 'In the expenditure method we add all spending on final goods and services produced in the country. Households spend on consumption, the government on its final consumption, firms on new capital goods and stocks, and foreigners on our exports. Imports are subtracted because that spending goes to production abroad. The total is gross domestic product at market price.',
    }),
    sl('example', 'Worked example 2: expenditure method', {
      b: `Imagined economy (₹ crore): C ${inr(WE2.c)}, I ${WE2.i}, G ${WE2.g}, exports ${WE2.x}, imports ${WE2.m}.`,
      v: vWE2,
      n: 'Add the four parts. Consumption 1,200, investment 300 and government spending 250 make 1,750. Exports of 150 minus imports of 200 give net exports of minus 50. So GDP at market price is 1,700 crore rupees. Notice that net exports can be negative, and that only final spending is included.',
    }),
    sl('example', 'Worked example 3: income method', {
      b: 'Same imagined economy, viewed from the income side (₹ crore).',
      v: vWE3,
      n: 'Now add factor incomes. Compensation of employees is 800. Rent 120, interest 90 and profit 210 together make an operating surplus of 420. Mixed income of the self-employed is 300. The total, 1,520, is net domestic product at factor cost, because factor incomes contain neither depreciation nor indirect taxes. We will meet this number again in Part 2.',
    }),
    sl('concept', 'What is counted, and what is not', {
      v: vInclude,
      n: 'Here is your checklist. Count anything that is a payment for current production: imputed rent of owner-occupied houses, grain a farmer keeps for his family, and meals given free to staff. Leave out transfers like pensions and scholarships, second-hand goods and shares, because nothing new is produced. But the dealer\'s commission and the broker\'s fee are current services, so they are counted.',
    }),
    sl('check', 'Quick check: value added', {
      b: 'Which formula gives gross value added?',
      chk: 'm_va_def',
      n: 'Think back to the spinning mill and the order of the steps you used.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: goods are classified by their use; stocks are measured at a point of time and flows over a period; net investment is gross investment minus depreciation. Income flows in a circle between households and firms, so we can measure it by value added, by factor incomes or by final expenditure, taking care to avoid double counting and transfers.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Final vs intermediate: always argue from **end use**, with the buyer named.',
        'Write **value of output = sales + change in stock** before anything else; a fall in stock is negative.',
        'Show every **step and formula** in numericals: marks are given for steps, not just the answer.',
        'In "included or not" questions, the **reason** earns the mark.',
        'Never add **transfer payments** or **second-hand sales**; do add commissions.',
      ],
      n: 'Some advice for the board exam. In numericals, write the formula first, then substitute, then give the answer with its unit. Many students forget that a fall in stock is negative. In questions on what to include, the mark is for the reason, so always say why. And remember that the commission on a second-hand sale is counted, though the sale itself is not.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'National Income and Related Aggregates — Part 2: Aggregates, Real GDP and Welfare',
  goals: [
    'Explain domestic territory, normal residents and net factor income from abroad',
    'Convert between GDP, GNP, NDP and NNP at market price and factor cost',
    'Distinguish real and nominal GDP, calculate the GDP deflator, and evaluate GDP as an index of welfare',
  ],
  slides: [
    sl('title', 'From GDP to national income', {
      b: 'Part 2 — the **aggregates**, **real versus nominal GDP**, and whether **GDP measures welfare**.',
      v: vRoute2,
      n: 'In Part 1 we measured GDP. But GDP is only one of eight related aggregates. In this part we learn the three pairs of ideas behind them, convert GDP into national income step by step, separate real growth from price rises, and finally ask a big question: does a higher GDP always mean that people are better off?',
    }),
    sl('concept', 'Three pairs of concepts', {
      v: vPairs,
      n: 'Every aggregate name is built from three choices. Gross or net: gross includes depreciation, net does not. Domestic or national: domestic is about the territory, national is about the normal residents. Market price or factor cost: market price includes indirect taxes minus subsidies. Two choices for each of three pairs give eight aggregates, such as GDP at market price or NNP at factor cost.',
    }),
    sl('concept', 'Domestic territory and normal residents', {
      v: vTerritory,
      bl: ['**Normal resident:** a person or institution that ordinarily lives in a country and whose **centre of economic interest** lies there, usually for a year or more.'],
      n: 'Domestic territory is more than the map. It includes Indian embassies abroad and ships, planes and fishing boats run by Indian residents. But foreign embassies and offices of international organisations in India are not part of it. A normal resident is someone who ordinarily lives in the country and has their economic interest there. Citizenship does not decide it.',
    }),
    sl('check', 'Quick check: who is a normal resident?', {
      b: 'Think of where the person ordinarily lives and earns.',
      chk: 'm_resident',
      n: 'Remember: residence is about where one ordinarily lives and has economic interest, not about the passport.',
    }),
    sl('concept', 'Net factor income from abroad', {
      v: vNfia,
      bl: ['NFIA = factor income earned by residents from abroad − factor income paid to non-residents.', 'National income = domestic income + NFIA.'],
      n: 'Indian engineers working abroad and Indian firms with factories overseas earn factor income from the rest of the world. At the same time, foreign workers and investors earn income in India and send it home. The difference is net factor income from abroad. It can be positive or negative. Adding it to domestic income gives national income.',
    }),
    sl('example', 'Worked example 4: GDP at MP to national income', {
      b: `Imagined economy (₹ crore): GDP at MP ${inr(W2.gdpMP)}, depreciation ${WE2.dep}, net indirect taxes ${WE2.nit}, NFIA ${WE2.nfia}.`,
      v: vLadder,
      n: 'Take the GDP of 1,700 from Part 1. Subtract depreciation of 100 to get NDP at market price of 1,600. Subtract net indirect taxes of 120 to reach NDP at factor cost of 1,480. Finally add net factor income from abroad, which is minus 30, to get national income of 1,450 crore rupees. The order of the three steps can change; the answer does not.',
    }),
    sl('concept', 'Market price and factor cost', {
      v: vMpFc,
      bl: ['**Net indirect taxes** = indirect taxes − subsidies.', 'FC = MP − NIT; if subsidies exceed indirect taxes, FC is higher than MP.'],
      n: 'The price you pay in a shop is the market price. It includes indirect taxes such as GST, and it is lowered by any subsidy. What the factors of production receive is the factor cost. So factor cost equals market price minus net indirect taxes. In the bicycle example, the factors get 4,000 rupees, but the buyer pays 4,400.',
    }),
    sl('check', 'Quick check: which aggregate is national income?', {
      b: 'Gross or net? Domestic or national? Market price or factor cost?',
      chk: 'm_ni_is',
      n: 'Go through the three pairs one by one and pick the right choice in each.',
    }),
    sl('two-column', 'Nominal and real GDP', {
      cols: [
        '**Nominal GDP**\n\n- Output valued at **current-year prices**.\n- Rises if output rises **or** prices rise.',
        '**Real GDP**\n\n- Output valued at **base-year prices**.\n- Rises **only** if output rises.',
      ],
      v: vBars,
      n: 'Suppose the bills of a town rise because prices have gone up. Has the town produced more? Not necessarily. Nominal GDP uses current prices, so it rises with prices as well as output. Real GDP uses the prices of a fixed base year, so it rises only when more goods and services are produced. For growth, economists use real GDP.',
    }),
    sl('example', 'Worked example 5: real GDP and the deflator', {
      b: 'An imagined town produces only mangoes and bicycles; base year 2020.',
      v: vWE5,
      bl: ['GDP deflator = (nominal GDP ÷ real GDP) × 100.'],
      n: `In 2024 the town's output at 2024 prices is 1,76,000 rupees. That is nominal GDP. Valued at 2020 prices, the same output is worth 1,55,000 rupees. That is real GDP. Divide nominal by real and multiply by 100: the deflator is about 113.5, so prices rose by about 13.5 per cent. Nominal GDP grew about 35 per cent, but real output grew only about 19 per cent.`,
    }),
    sl('concept', 'The GDP deflator', {
      bl: [
        'A **price index** for everything produced in the country, not just a consumer basket.',
        'Deflator above 100: prices have **risen** since the base year.',
        'Real GDP = (nominal GDP ÷ deflator) × 100.',
      ],
      n: 'The GDP deflator is a price index for all goods and services produced in the economy. If it is 120, prices on average are 20 per cent higher than in the base year. Turn the formula around and you can find real GDP from nominal GDP and the deflator. This is how growth figures are cleaned of inflation.',
    }),
    sl('check', 'Quick check: calculate the deflator', {
      b: 'Divide nominal by real and multiply by 100.',
      chk: 'n_deflator',
      n: 'Use the formula exactly as on the last slide and give your answer as a number, without a unit.',
    }),
    sl('concept', 'Is GDP a good index of welfare?', {
      v: vWelfare,
      n: 'Welfare means how well off people feel and are. GDP helps, but it has three limits. First, distribution: if the gains go to a few, most people may not be better off. Second, non-monetary exchanges such as unpaid care at home are not counted. Third, externalities: GDP does not subtract harm from pollution or add benefits like a public park.',
    }),
    sl('check', 'Quick check: externalities', {
      b: 'Who pays for the harm in the situation?',
      chk: 'm_externality',
      n: 'An effect on others that nobody pays for has a special name. Which option is it?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Let us sum up. Three pairs of ideas build eight aggregates. Subtract depreciation to go from gross to net, add NFIA to go from domestic to national, and subtract net indirect taxes to go from market price to factor cost. National income is NNP at factor cost. Real GDP removes price changes, the deflator measures them, and GDP is only a partial measure of welfare.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **full name** of every aggregate (e.g. "NDP at FC"), never just "income".',
        'Net factor income **to** abroad is **subtracted**; **from** abroad is added.',
        'NIT = indirect taxes **minus** subsidies; check the sign.',
        'For welfare questions, give all three limits with an **example** each and a balanced conclusion.',
        'Deflator answers have **no unit**; real and nominal GDP are in rupees.',
      ],
      n: 'Common mistakes cost easy marks. Students mix up net factor income to abroad and from abroad, or forget that subsidies are subtracted from indirect taxes. Always name the aggregate in full. In five-mark welfare questions, give each limitation with an example and end with a judgement. Finally, the deflator is an index number, so it has no unit.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'National Income and Related Aggregates — Notes',
  sections: [
    {
      h: '1. Basic concepts',
      t: 1,
      b: '**Macroeconomics** studies the economy as a whole through aggregates: national income, output, employment, the general price level.\n\n- **Consumption goods** satisfy wants directly (food, clothes, services). **Capital goods** are fixed assets used in production for many years (machines, buildings, tools).\n- **Final goods** are bought for final use (consumption or investment) and are not used up or resold in production in the year. **Intermediate goods** are used up as raw materials or resold. The classification depends on **end use**: sugar for a household is final, sugar for a sweet shop is intermediate.\n- **Stocks** are measured at a point of time (capital, wealth); **flows** over a period (income, investment, depreciation). Flows change stocks.\n- **Gross investment** = addition to capital goods and stocks in a year; **depreciation** (consumption of fixed capital) = loss in value from normal wear and tear and expected obsolescence; **net investment** = gross investment − depreciation.',
      terms: [
        ['Capital good', 'A durable good used repeatedly in production over many years; a final good.'],
        ['Intermediate good', 'A good used up in production or resold during the year.'],
        ['Stock', 'A variable measured at a point of time.'],
        ['Flow', 'A variable measured over a period of time.'],
        ['Depreciation', 'Fall in the value of fixed capital from normal wear and tear and expected obsolescence.'],
      ],
      v: vGoods,
      vs: [vStockFlow],
    },
    {
      h: '2. Circular flow of income (two-sector model)',
      t: 2,
      b: '**Assumptions:** only households and firms; households spend all their income on consumption (no saving); firms sell all output to households; no government and no foreign trade.\n\n**Real flows:** factor services from households to firms; goods and services from firms to households.\n\n**Money flows:** factor payments (rent, wages, interest, profit) from firms to households; consumption expenditure from households to firms.\n\nReal and money flows move in opposite directions. Because the whole value of output is paid out as factor incomes and all income is spent on output, **value of output = factor income = expenditure**. This is why national income can be measured by three methods.',
      terms: [
        ['Real flow', 'Flow of factor services and of goods and services.'],
        ['Money flow', 'Flow of factor payments and of consumption expenditure.'],
      ],
      v: vCircular,
      vs: [vThreePoints],
    },
    {
      h: '3. Value added (product) method',
      t: 3,
      b: '1. **Value of output** = sales + change in stock (closing stock − opening stock).\n2. **GVA at MP** = value of output − intermediate consumption.\n3. **NVA at MP** = GVA at MP − depreciation; **NVA at FC** = NVA at MP − net indirect taxes.\n4. Sum of GVA at MP of all producers in the domestic territory = **GDP at MP**.\n\n**Double counting** happens when the value of intermediate goods is counted again inside final goods. Avoid it by adding only values added (or only final goods).\n\n**Precautions:** include **own-account production** (grain kept for the family) and **imputed rent** of owner-occupied houses; exclude **sale of second-hand goods** (but include the commission), and exclude **intermediate goods**; exclude unpaid household services.',
      terms: [
        ['Value added', 'Value of output minus intermediate consumption.'],
        ['Double counting', 'Counting the value of a good more than once while estimating output.'],
        ['Imputed rent', 'The estimated rent of a house lived in by its owner, counted as a service produced.'],
      ],
      v: vChainMini,
      vs: [vWE1],
    },
    {
      h: '4. Income and expenditure methods',
      t: 3,
      b: '**Income method:** NDP at FC = **compensation of employees** (wages in cash and kind, employer\'s social security contribution) + **operating surplus** (rent and royalty, interest, profit) + **mixed income of the self-employed**. Add NFIA for national income.\n- Exclude **transfer incomes** (pensions, scholarships, gifts), **windfall gains** (lottery) and **capital gains** on sale of assets.\n- Include income in kind and imputed rent.\n\n**Expenditure method:** GDP at MP = **private final consumption expenditure** + **government final consumption expenditure** + **gross domestic capital formation** (fixed capital + change in stock) + **net exports** (X − M).\n- Exclude spending on **intermediate goods**, **second-hand goods**, **financial assets** (shares, bonds) and **transfer payments**.',
      terms: [
        ['Compensation of employees', 'Everything paid by employers for work: cash wages, payments in kind and social security contributions.'],
        ['Operating surplus', 'Rent, interest and profit earned by enterprises.'],
        ['Mixed income', 'Income of the self-employed in which returns to labour and capital cannot be separated.'],
        ['Transfer payment', 'A payment received without giving any good or service in return.'],
      ],
      v: vIncome,
      vs: [vExp, vInclude],
    },
    {
      h: '5. National income aggregates',
      t: 4,
      b: '**Domestic territory:** the political frontiers plus territorial waters and airspace, ships and aircraft run by residents, fishing vessels and oil rigs in international waters, and the country\'s embassies and military bases abroad. Foreign embassies and international organisations located in the country are excluded.\n\n**Normal resident:** ordinarily resides in the country and has the centre of economic interest there.\n\n**NFIA** = factor income earned by normal residents from abroad − factor income paid to non-residents.\n\n**Net indirect taxes (NIT)** = indirect taxes − subsidies.\n\n| From | To | Adjustment |\n|---|---|---|\n| Gross | Net | − depreciation |\n| Domestic | National | + NFIA |\n| Market price | Factor cost | − NIT |\n\n**National income** = NNP at FC = GDP at MP − depreciation + NFIA − NIT.',
      terms: [
        ['Domestic territory', 'The economic territory of a country within which factor incomes are counted as domestic.'],
        ['Normal resident', 'A person or institution that ordinarily resides in a country and whose centre of economic interest lies there.'],
        ['NFIA', 'Factor income from abroad minus factor income to abroad.'],
        ['National income', 'Net national product at factor cost.'],
      ],
      v: vPairs,
      vs: [vTerritory, vLadder],
    },
    {
      h: '6. Real and nominal GDP, the deflator, and welfare',
      t: 5,
      b: '- **Nominal GDP:** output valued at current prices. **Real GDP:** output valued at base-year (constant) prices; it changes only when output changes.\n- **GDP deflator** = (nominal GDP ÷ real GDP) × 100: a price index for all goods and services produced.\n- **Real GDP** = (nominal GDP ÷ deflator) × 100.\n\n**GDP and welfare.** Welfare is the well-being of people. GDP is an imperfect index because of:\n1. **Distribution of GDP:** growth may benefit a few.\n2. **Non-monetary exchanges:** unpaid domestic work and barter are not counted.\n3. **Externalities:** harm (pollution) is not subtracted and benefits (a public garden) are not added.\n\nA rise in real GDP is therefore a useful but incomplete sign of a rise in welfare.',
      terms: [
        ['Real GDP', 'GDP at base-year prices.'],
        ['GDP deflator', 'Ratio of nominal to real GDP multiplied by 100.'],
        ['Externality', 'A benefit or harm caused to others for which no payment is made.'],
      ],
      v: vWE5,
      vs: [vBars, vWelfare],
    },
  ],
  tips: '**Common mistakes**\n- Calling a good "final" or "intermediate" without naming its **use** and buyer.\n- Taking sales as value of output and forgetting the **change in stock** (which can be negative).\n- Adding transfer payments, second-hand sales or share purchases; forgetting **commissions**, **imputed rent** and **own-account production**.\n- Mixing up NFIA **from** abroad (add) and **to** abroad (subtract).\n- Using indirect taxes instead of **net** indirect taxes.\n- Saying a rise in nominal GDP means more output.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 3 and 4 marks numericals: formula, substitution and answer with unit; step marks are given even if the final figure slips.\n- 5 marks: five clear points or a full numerical with every step; welfare answers end with a judgement.\n\n**Data in SOYL practice** are imagined; your board paper will give its own figures.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Macroeconomics**', 'Study of the economy **as a whole** through aggregates such as national income, employment and the price level.', 'definition', 1],
  ['**Capital good**', 'A durable good used in production for **many years**, e.g. a machine; it is a **final** good.', 'definition', 1],
  ['Final or intermediate: what decides?', 'The **end use** of the good, not its nature.', 'concept', 1],
  ['Sugar bought by a sweet shop', '**Intermediate**: used up in making sweets for sale.', 'example', 1],
  ['**Stock** vs **flow**', 'Stock: at a point of time (capital). Flow: over a period (income, investment).', 'concept', 1],
  ['**Depreciation**', 'Loss in value of fixed capital from **normal wear and tear** and **expected obsolescence**.', 'definition', 1],
  ['Net investment', '**Gross investment − depreciation**.', 'fact', 1],
  ['Two-sector model: assumptions', 'Only households and firms; all income spent; no government; no foreign trade.', 'concept', 2],
  ['**Real flow**', 'Factor services (households → firms) and goods and services (firms → households).', 'definition', 2],
  ['**Money flow**', 'Factor payments (firms → households) and consumption expenditure (households → firms).', 'definition', 2],
  ['Why do the three methods give the same total?', 'The same circular flow is measured at production, income and expenditure points.', 'concept', 2],
  ['**Value of output**', '**Sales + change in stock**.', 'fact', 3],
  ['**GVA at MP**', 'Value of output − **intermediate consumption**.', 'fact', 3],
  ['**Double counting**', 'Counting an input\'s value more than once; avoided by the value-added or final-goods approach.', 'definition', 3],
  ['Three components of the income method', 'Compensation of employees + operating surplus + mixed income = **NDP at FC**.', 'concept', 3],
  ['**Operating surplus**', 'Rent (and royalty) + interest + profit.', 'definition', 3],
  ['**Mixed income**', 'Income of the self-employed where labour and capital returns cannot be separated.', 'definition', 3],
  ['Expenditure method formula', 'GDP at MP = **C + I + G + (X − M)**.', 'fact', 3],
  ['Is a pension included in national income?', '**No**: it is a **transfer payment**.', 'exam-tip', 3],
  ['Second-hand car sold through a dealer', 'Sale **not** counted; dealer\'s **commission is** counted.', 'exam-tip', 3],
  ['Imputed rent', 'Rent of an owner-occupied house, **included** as a housing service.', 'concept', 3],
  ['**Domestic territory** includes…', 'Territory, waters, airspace; residents\' ships and aircraft; own embassies abroad.', 'concept', 4],
  ['**Normal resident**', 'Ordinarily resides in a country; centre of economic interest lies there.', 'definition', 4],
  ['**NFIA**', 'Factor income **from** abroad − factor income **to** abroad.', 'definition', 4],
  ['**Net indirect taxes**', 'Indirect taxes − subsidies.', 'definition', 4],
  ['**National income**', '**NNP at FC** = GDP at MP − depreciation + NFIA − NIT.', 'fact', 4],
  ['When is GDP = GNP?', 'When **NFIA = 0**.', 'concept', 4],
  ['**Real GDP**', 'Output valued at **base-year prices**.', 'definition', 5],
  ['**GDP deflator**', '(Nominal GDP ÷ real GDP) × 100.', 'fact', 5],
  ['Three limits of GDP as a welfare index', 'Distribution of GDP; non-monetary exchanges; externalities.', 'concept', 5],
  ['Negative externality: example', 'Smoke from a factory harming neighbours, with no compensation paid.', 'example', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — National Income and Related Aggregates',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tractor', 'm_secondhand', 'm_real', 'ar_capital_final'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words. Show all working in numericals.', items: ['s_final_inter', 's_dom_nat', 's3_conversions'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_income_method', 'l_welfare'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the table and answer all parts. Part (c) has an internal choice.', items: ['cb_chain'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — National Income and Related Aggregates',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_intermediate', 'm_depreciation', 'm_money_flow', 'm_transfer', 'm_exp_not', 'm_gnp', 'm_domestic', 'm_deflator', 'ar_cf_equal', 'ar_gnp_lower'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_stock_flow', 's_double', { attempt: 1, keys: ['s_real_nom', 's_mp_fc'] }, 's3_va_firm', { attempt: 1, keys: ['s3_welfare', 's3_three_methods'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each. Show all working.', items: ['l_exp_ni', { attempt: 1, keys: ['l_value_added', 'l_circular'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_country', 'cb_real'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-economics-ch01 only (basic concepts; two-sector circular flow; three methods; aggregates; real and nominal GDP, deflator, GDP and welfare)',
    originality: 'every scenario, table and passage written for this chapter (imagined firms, towns and countries); no NCERT exercise, boxed example or board/sample-paper item reused',
    data: 'every figure computed by the build and asserted (spinning mill 960/560/520/500; expenditure 1,700 → 1,600 → 1,480 → 1,450; income 1,520; mangoes and bicycles 1,30,000 / 1,76,000 / 1,55,000, deflator 113.5; Meghpur 25,000 / 33,000 / 28,500, deflator 115.8; Sundarvan 5,000 / 5,120 / 5,800)',
    facts: 'standard national-accounts definitions only (domestic territory, normal resident, NFIA, NIT, compensation of employees, operating surplus, mixed income); no Indian statistics stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
