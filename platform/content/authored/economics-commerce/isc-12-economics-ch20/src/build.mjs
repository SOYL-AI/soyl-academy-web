// Build ISC 12 Economics ch20 Measurement of National Income. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch20/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch20', 'economics-commerce');
const {
  inr, MAN, MAN_VA, MAN_VA_TOTAL, MAN_SALES, MAN_INCOME, COT, COT_GVA, COT_VO, GAR, GAR_NIT, GAR_NVAFC,
  PUMP, PUMP_VO, PUMP_IC, PUMP_GVA, PUMP_NVAMP, PUMP_NVAFC, SUV, SUV_COE, SUV_PROFIT, SUV_OS, SUV_NDPFC, SUV_NI,
  TAM, TAM_GDCF, TAM_NX, TAM_GDPMP, TAM_GNPMP, TAM_NDPMP, TAM_NDPFC, TAM_NI, SHI, SHI_GDPMP,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG: three methods, one total (Mandya chain)
const vThree = (() => {
  const s = new Svg(660, 380);
  const base = 320, k = 240 / 800, w = 90;
  const cols = [
    { x: 30, name: 'Value added', parts: [[MAN_VA[0], 'Cane grower'], [MAN_VA[1], 'Jaggery unit'], [MAN_VA[2], 'Sweet shop']] },
    { x: 240, name: 'Factor incomes', parts: [[MAN.wages, 'Wages'], [MAN.rent, 'Rent'], [MAN.interest, 'Interest'], [MAN.profit, 'Profit']] },
    { x: 450, name: 'Final spending', parts: [[MAN.sweets, 'Sweets bought']] },
  ];
  const fills = ['fill', 'blue', 'fill', 'blue'];
  s.line(20, base, 640, base, { sw: 1.4 });
  for (const c of cols) {
    let y = base;
    let total = 0;
    c.parts.forEach(([v, label], i) => {
      const h = v * k;
      s.rect(c.x, y - h, w, h, { fill: fills[i], fillOpacity: 0.55, sw: 1.2, rx: 0 });
      s.text(c.x + w + 6, y - h / 2, `${label} ${v}`, { anchor: 'start', size: 10.5 });
      y -= h;
      total += v;
    });
    assert(total === 800, `${c.name} total`);
    s.text(c.x + w / 2, y - 14, `₹${total} crore`, { size: 12, bold: true });
    s.text(c.x + w / 2, base + 18, c.name, { size: 12 });
  }
  return s.visual(
    `Three stacked bars for the imagined Mandya sweets chain, all 800 crore rupees high: value added by the cane grower 300, jaggery unit 200 and sweet shop 300; factor incomes of wages 450, rent 60, interest 90 and profit 200; and final spending on sweets of 800`,
    'Imagined figures (₹ crore): the same flow measured at production, income and spending.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Three ways to measure', 'Value of output and value added', 'Double counting', 'Income method', 'Three totals agree'], 'Route map of Part 1: three ways to measure national income, value of output and value added, double counting, the income method, and why the three totals agree', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Final expenditure', 'Capital formation and net exports', 'From GDP to national income', 'Precautions', 'Difficulties in India'], 'Route map of Part 2: final expenditure, capital formation and net exports, from gross domestic product to national income, precautions, and difficulties in India', 'Part 2 at a glance');
const vPoints = flow('LR', ['Production: value added (product method)', 'Distribution: factor incomes (income method)', 'Disposition: final spending (expenditure method)'], 'Flow of the three phases at which national income is measured: production by the product method, distribution of factor incomes by the income method, and disposition as final spending by the expenditure method', 'Three phases, three methods');
const vTerms = table(
  ['Term', 'Meaning', 'Formula'],
  [
    ['Value of output', 'Market value of all goods made by a firm in the year', 'Sales + change in stock'],
    ['Change in stock', 'Closing stock − opening stock (can be negative)', 'Closing − opening'],
    ['Intermediate consumption', 'Inputs bought from other producers and used up in the year', 'Raw materials, power, fuel, services'],
    ['Gross value added at market price', 'What the firm adds to its inputs', 'Value of output − intermediate consumption'],
    ['Net value added at factor cost', 'Value added paid out to factors', 'GVA at market price − depreciation − net indirect taxes'],
  ],
  'Table of product-method terms: value of output equals sales plus change in stock; intermediate consumption is inputs used up; gross value added at market price is value of output minus intermediate consumption; net value added at factor cost subtracts depreciation and net indirect taxes',
);
const vMandya = table(
  ['Stage (imagined Mandya chain)', 'Sale (₹ crore)', 'Input bought (₹ crore)', 'Value added (₹ crore)'],
  [
    ['Cane grower sells cane', String(MAN.cane), '0', String(MAN_VA[0])],
    ['Jaggery unit sells jaggery', String(MAN.jaggery), String(MAN.cane), String(MAN_VA[1])],
    ['Sweet shop sells sweets to households', String(MAN.sweets), String(MAN.jaggery), String(MAN_VA[2])],
    ['Total', `${MAN_SALES} (sum of sales)`, '', `${MAN_VA_TOTAL} = value of final output`],
  ],
  `Table of the imagined Mandya sweets chain: cane sold for 300, jaggery for 500 and sweets for 800 crore rupees; value added is 300, 200 and 300, totalling 800, the value of the sweets, while the sum of sales is 1,600`,
  'Imagined figures: adding sales counts the cane and jaggery again.',
);
const vDouble = flow('LR', ['Add every firm\'s full sales', 'Inputs counted again inside later sales', 'Output overstated', 'Fix: final goods only, or value added only'], 'Flow of double counting: adding every firm\'s full sales counts inputs again inside later sales, overstating output; the fix is to count final goods only or value added only', 'Double counting and its cure');
const vPump = table(
  ['Step (imagined Pune pump maker, ₹ lakh)', 'Working', 'Result'],
  [
    ['Change in stock', `${PUMP.closing} − ${PUMP.opening}`, '−100'],
    ['Value of output', `${inr(PUMP.sales)} − 100`, inr(PUMP_VO)],
    ['Intermediate consumption', `${inr(PUMP.raw)} + ${PUMP.power} (machine of ${PUMP.machine} left out)`, inr(PUMP_IC)],
    ['GVA at market price', `${inr(PUMP_VO)} − ${inr(PUMP_IC)}`, inr(PUMP_GVA)],
    ['NVA at market price', `${inr(PUMP_GVA)} − ${PUMP.dep}`, String(PUMP_NVAMP)],
    ['NVA at factor cost', `${PUMP_NVAMP} − ${PUMP.nit}`, String(PUMP_NVAFC)],
  ],
  `Worked table for an imagined Pune pump maker: a fall in stock of 100 gives value of output 2,300 lakh rupees; inputs of 1,300 give gross value added 1,000; less depreciation 90 and net indirect taxes 60 gives net value added at factor cost of 850`,
  'Imagined figures (₹ lakh).',
);
const vCotton = table(
  ['Unit (imagined Vidarbha chain, ₹ lakh)', 'Value of output', 'Intermediate consumption', 'Gross value added'],
  [...COT.map((f) => [f.name, `${inr(f.sales)} + (${f.dstock}) = ${inr(f.vo)}`, inr(f.ic), String(f.gva)]), ['Total', inr(COT_VO), '', inr(COT_GVA)]],
  `Table of the imagined Vidarbha cotton chain: values of output 400, 680, 980 and 1,550 lakh rupees; gross value added 340, 280, 330 and 550, totalling 1,500, against 3,610 if every value of output were added`,
  'Imagined figures (₹ lakh).',
);
const vIncomeParts = table(
  ['Part of domestic income', 'What it contains', 'Example'],
  [
    ['Compensation of employees', 'Wages and salaries in cash and kind; employer\'s social security contributions', 'A nurse\'s salary and free housing'],
    ['Operating surplus', 'Rent and royalty; interest; profit (corporation tax, dividends, undistributed profit)', 'Interest earned on a loan to a factory'],
    ['Mixed income of the self-employed', 'Earnings that combine several factor rewards', 'A tailor working in her own shop'],
  ],
  'Table of the three parts of domestic income under the income method: compensation of employees, operating surplus (rent, interest and profit) and mixed income of the self-employed, with an example of each',
);
const vCoe = table(
  ['Included in compensation of employees', 'Not included'],
  [
    ['Wages and salaries in cash', 'Interest-free loans to staff (to be repaid)'],
    ['Free meals, housing, uniforms (payments in kind)', 'Travel allowance for official tours (an input of the firm)'],
    ['Employer\'s contribution to provident fund and health insurance', 'Pensions paid by the government (transfers)'],
  ],
  'Table of what is and is not compensation of employees: wages, payments in kind and employer contributions are included; repayable staff loans, official travel costs and government pensions are not',
);
const vSuv = table(
  ['Step (imagined Suvarnagiri, ₹ crore)', 'Working', 'Result'],
  [
    ['Compensation of employees', `${inr(SUV.wages)} + ${SUV.ssc}`, inr(SUV_COE)],
    ['Profit', `${SUV.corpTax} + ${SUV.dividend} + ${SUV.retained}`, String(SUV_PROFIT)],
    ['Operating surplus', `${SUV.rent} + ${SUV.interest} + ${SUV_PROFIT}`, String(SUV_OS)],
    ['Domestic income (NDP at factor cost)', `${inr(SUV_COE)} + ${SUV_OS} + ${SUV.mixed}`, inr(SUV_NDPFC)],
    ['National income', `${inr(SUV_NDPFC)} + ${SUV.nfia}`, inr(SUV_NI)],
    ['Left out', `Interest on national debt ${SUV.debtInterest}; scholarships ${SUV.scholarship}`, 'Transfers'],
  ],
  `Worked table for imagined Suvarnagiri: compensation of employees 1,590, profit 520, operating surplus 890, domestic income 3,090 and national income 3,115 crore rupees, with interest on national debt and scholarships left out as transfers`,
  'Imagined figures (₹ crore).',
);
const vExpParts = table(
  ['Component of final expenditure', 'Who spends', 'Example'],
  [
    ['Private final consumption expenditure', 'Households and non-profit bodies serving them', 'A family buys a refrigerator'],
    ['Government final consumption expenditure', 'Government, for services it provides', 'Salaries of government teachers'],
    ['Gross domestic capital formation', 'Producers', 'A new kiln; a rise in unsold stock'],
    ['Net exports', 'Rest of the world (exports − imports)', 'Exports of tea less imports of oil'],
  ],
  'Table of the four components of final expenditure: private and government final consumption, gross domestic capital formation and net exports, with who spends and an example of each',
);
const vGcf = flow('LR', ['Gross domestic fixed capital formation', 'plus change in stock', 'equals gross domestic capital formation', 'minus depreciation gives net capital formation'], 'Flow: gross domestic fixed capital formation plus change in stock equals gross domestic capital formation; minus depreciation gives net capital formation', 'Investment spending');
const vTam = table(
  ['Step (imagined Tamrapatna, ₹ crore)', 'Working', 'Result'],
  [
    ['Gross domestic capital formation', `${TAM.gdfcf} + (${TAM.dstock})`, String(TAM_GDCF)],
    ['Net exports', `${TAM.exports} − ${TAM.imports}`, String(TAM_NX)],
    ['GDP at market price', `${inr(TAM.pfce)} + ${TAM.gfce} + ${TAM_GDCF} + (${TAM_NX})`, inr(TAM_GDPMP)],
    ['GNP at market price', `${inr(TAM_GDPMP)} + (${TAM.nfia})`, inr(TAM_GNPMP)],
    ['NDP at factor cost', `${inr(TAM_GDPMP)} − ${TAM.cfc} − ${TAM.nit}`, inr(TAM_NDPFC)],
    ['National income', `${inr(TAM_NDPFC)} + (${TAM.nfia})`, inr(TAM_NI)],
  ],
  `Worked table for imagined Tamrapatna: capital formation 780 and net exports minus 50 give GDP at market price 4,580 crore rupees; GNP at market price is 4,545; net domestic product at factor cost 4,140; national income 4,105`,
  'Imagined figures (₹ crore).',
);
const vExpSteps = flow('LR', ['Identify units making final expenditure', 'Classify final expenditure', 'Estimate and add: GDP at market price', 'Adjust to national income'], 'Flow of the steps of the expenditure method: identify the units making final expenditure, classify it, estimate and add to get GDP at market price, then adjust to national income', 'Expenditure method in four steps');
const vShi = table(
  ['Item (imagined Shivgarh, ₹ crore)', 'Value', 'Treatment'],
  [
    ['Private final consumption', String(SHI.pfce), 'Add'],
    ['Government final consumption', String(SHI.gfce), 'Add'],
    ['Gross domestic capital formation', String(SHI.gdcf), 'Add'],
    ['Exports', String(SHI.exports), 'Add'],
    ['Imports', String(SHI.imports), 'Subtract'],
    ['Old-age pensions', String(SHI.oldAge), 'Leave out: transfer'],
    ['Purchase of shares', String(SHI.sharesBought), 'Leave out: financial asset'],
    ['Second-hand buses', String(SHI.secondHand), 'Leave out: counted when new'],
    ['GDP at market price', inr(SHI_GDPMP), ''],
  ],
  `Worked table for imagined Shivgarh: consumption 960, government consumption 240, capital formation 300 and exports 70 are added, imports 90 subtracted, and pensions, shares and second-hand buses left out, giving GDP at market price of 1,480 crore rupees`,
  'Imagined figures (₹ crore).',
);
const vPrecVA = table(
  ['Value-added method: precaution', 'Why'],
  [
    ['Avoid double counting', 'Inputs are already inside the value of later output'],
    ['Leave out sales of second-hand goods; count the commission', 'The good was counted when new; the dealer\'s service is new'],
    ['Include production for self-consumption', 'It is output of the year even if not sold'],
    ['Include imputed rent of owner-occupied houses', 'A housing service is produced and used'],
  ],
  'Table of precautions for the value-added method: avoid double counting, leave out second-hand sales but count commissions, include production for self-consumption and imputed rent, with a reason for each',
);
const vPrecInc = table(
  ['Income method: precaution', 'Why'],
  [
    ['Leave out transfer payments', 'No factor service is supplied in return'],
    ['Leave out windfall gains such as lottery prizes', 'They are not earned in production'],
    ['Leave out capital gains on selling old assets', 'No new output is produced'],
    ['Include payments in kind and imputed incomes', 'They reward factor services'],
  ],
  'Table of precautions for the income method: leave out transfers, windfall gains and capital gains, and include payments in kind and imputed incomes, with a reason for each',
);
const vPrecExp = table(
  ['Expenditure method: precaution', 'Why'],
  [
    ['Count final expenditure only', 'Spending on intermediate goods is already in final goods'],
    ['Leave out spending on second-hand goods', 'The goods were counted when first produced'],
    ['Leave out purchases of shares and bonds', 'They are financial assets, not goods or services'],
    ['Leave out transfer payments by government', 'The receivers\' own spending is counted instead'],
  ],
  'Table of precautions for the expenditure method: count final expenditure only and leave out second-hand goods, financial assets and transfer payments, with a reason for each',
);
const vIndia = flow('TB', ['Large non-monetised sector: output kept for self-use or bartered', 'Many small producers keep no accounts', 'Incomes under-reported in the informal sector', 'Estimates rely on samples and assumptions'], 'Flow of difficulties in measuring national income in India: a large non-monetised sector, small producers without accounts, under-reported informal incomes, and estimates that rely on samples and assumptions', 'Why the figures are estimates');
const vCompare = table(
  ['Method', 'Measures at', 'Main items', 'Key precaution'],
  [
    ['Value added', 'Production', 'Value of output − intermediate consumption', 'Avoid double counting'],
    ['Income', 'Distribution', 'Compensation of employees + operating surplus + mixed income', 'Leave out transfers'],
    ['Expenditure', 'Disposition', 'Consumption + capital formation + net exports', 'Count final spending only'],
  ],
  'Comparison table of the three methods: value added measured at production with double counting avoided; income measured at distribution with transfers left out; expenditure measured at disposition with only final spending counted',
);
const vSummary1 = table(
  ['Product method', 'Income method'],
  [
    ['Value of output = sales + change in stock', 'Compensation of employees'],
    ['GVA = value of output − intermediate consumption', 'Operating surplus = rent + interest + profit'],
    ['Avoid double counting', 'Mixed income of the self-employed'],
    ['NVA at factor cost: less depreciation and net indirect taxes', 'Add net factor income from abroad for national income'],
  ],
  'Summary table of Part 1: product method from value of output to net value added at factor cost, and income method from compensation of employees, operating surplus and mixed income to national income',
);
const vSummary2 = table(
  ['Expenditure method', 'Precautions and difficulties'],
  [
    ['Private and government final consumption', 'Final spending only'],
    ['Gross domestic capital formation', 'No second-hand goods, shares or transfers'],
    ['Net exports (exports − imports)', 'Imputed rent and self-consumption included'],
    ['Adjust to national income', 'Non-monetised output and missing data in India'],
  ],
  'Summary table of Part 2: the components of final expenditure and adjustment to national income, beside the main precautions and the difficulties of measurement in India',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Measurement of National Income — Part 1: Value Added and Income Methods',
  goals: [
    'Explain the three phases at which national income can be measured',
    'Calculate value of output, gross value added and net value added at factor cost, and avoid double counting',
    'Calculate domestic income and national income by the income method',
  ],
  slides: [
    sl('title', 'Measurement of National Income', {
      b: 'Part 1 — the **value-added (product) method** and the **income method**.',
      v: vRoute1,
      n: 'How does a country add up everything it produces in a year? Statisticians can count what is produced, what is earned, or what is spent. In this part we learn the first two ways: adding the value that each producer adds, and adding the incomes that production creates.',
    }),
    sl('concept', 'One flow, three phases', {
      b: 'National income can be measured where it is **produced**, where it is **distributed** as factor incomes, and where it is **spent**.',
      v: vPoints,
      n: 'Production, income and spending are three points on the same circular flow. Counting value added measures production. Adding wages, rent, interest, profit and mixed income measures distribution. Adding final spending measures disposition. Done carefully, all three give the same total.',
    }),
    sl('concept', 'Key terms of the product method', {
      b: 'Value added is what a producer **adds** to the inputs it buys.',
      v: vTerms,
      n: 'Start with the value of output: sales plus the change in stock. From it, subtract intermediate consumption, the inputs bought and used up during the year. What remains is gross value added at market price. Taking away depreciation and net indirect taxes gives net value added at factor cost, the part paid out to the factors.',
    }),
    sl('check', 'Quick check: how much was double counted?', {
      b: 'A clerk adds the sales of cane, jaggery and sweets in a chain. By how much does he overstate final output?',
      chk: 'm_double_mandya',
      n: 'Ask yourself which sales are of goods that end up inside other goods.',
    }),
    sl('diagram', 'A chain of production', {
      b: 'Each stage adds value; the values added together equal the **final output**.',
      v: vMandya,
      n: 'In this imagined chain, cane worth three hundred crore becomes jaggery worth five hundred, and then sweets worth eight hundred. The grower adds three hundred, the jaggery unit adds two hundred and the sweet shop adds three hundred. Together that is eight hundred, exactly the value of the sweets households buy.',
    }),
    sl('concept', 'Double counting and how to avoid it', {
      b: 'Adding every sale counts inputs **again**. Count either **final goods only** or **value added only**.',
      v: vDouble,
      n: 'If we simply add the sales of every firm, the cane is counted three times and the jaggery twice, because each is already inside the price of the next product. This error is called double counting. We avoid it either by counting only final goods and services, or by adding only the value that each firm adds.',
    }),
    sl('example', 'Worked example 1: one firm, from sales to net value added', {
      b: 'An imagined pump maker in Pune: find its net value added at factor cost.',
      bl: [
        'Step 1 — Change in stock is closing minus opening; here it is negative.',
        'Step 2 — Value of output = sales + change in stock.',
        'Step 3 — Subtract raw materials and power, but not the new machine.',
        'Step 4 — Subtract depreciation, then net indirect taxes.',
      ],
      v: vPump,
      n: 'The pump maker sold two thousand four hundred lakh of pumps, but its stock fell by one hundred, so this year\'s output was two thousand three hundred. Its inputs of raw materials and power were one thousand three hundred, so gross value added is one thousand. The new machine is a capital good, not an input. Removing depreciation and net indirect taxes leaves eight hundred and fifty lakh.',
    }),
    sl('check', 'Quick check: a machine is not an input', {
      b: 'Find the pump maker\'s gross value added at market price.',
      chk: 'n_pump_gva',
      n: 'Remember which purchases are used up in the year and which last for many years.',
    }),
    sl('example', 'Worked example 2: a four-firm chain', {
      b: 'Find the value added of each unit in the imagined Vidarbha cotton chain and of the chain as a whole.',
      bl: [
        'Step 1 — For each unit, value of output = sales + change in stock.',
        'Step 2 — Subtract the input bought from the unit before it.',
        'Step 3 — Add the four values added.',
        'Step 4 — Compare with the sum of values of output to see the double counting.',
      ],
      v: vCotton,
      n: 'Work unit by unit. The ginning unit adds thirty lakh to its stock, so its output is six hundred and eighty, and after buying cotton for four hundred it adds two hundred and eighty. The spinning mill\'s stock falls, so its output is less than its sales. The four values added total one thousand five hundred lakh, far below the three thousand six hundred and ten got by adding every output.',
    }),
    sl('concept', 'The income method: three parts of domestic income', {
      b: 'Domestic income = **compensation of employees + operating surplus + mixed income**.',
      v: vIncomeParts,
      n: 'The income method adds the incomes that production pays out. Employees receive compensation. Owners of land, capital and enterprise receive the operating surplus: rent, interest and profit. The self-employed, who use their own labour and capital, earn mixed income. Together these give domestic income, and adding net factor income from abroad gives national income.',
    }),
    sl('concept', 'What counts as compensation of employees', {
      b: 'Rewards for work in **cash or kind**, plus the employer\'s **social security** contributions.',
      v: vCoe,
      n: 'Compensation of employees is more than the pay cheque. Free meals, housing or uniforms are rewards paid in kind, and the employer\'s share of provident fund or insurance contributions also counts. But a loan that staff must repay is not income, and costs of official tours are the firm\'s own expenses.',
    }),
    sl('check', 'Quick check: meals and housing for nurses', {
      b: 'A hospital gives its nurses free meals and rent-free housing. How are these treated?',
      chk: 'm_kind',
      n: 'Ask whether the nurses receive these because they work.',
    }),
    sl('example', 'Worked example 3: national income by the income method', {
      b: 'Imagined Suvarnagiri: build each part, add, then adjust for factor income from abroad.',
      bl: [
        'Step 1 — Compensation of employees = wages + employer contributions.',
        'Step 2 — Profit = corporation tax + dividends + undistributed profit.',
        'Step 3 — Operating surplus = rent + interest + profit; add mixed income.',
        'Step 4 — Add net factor income from abroad; leave out transfers.',
      ],
      v: vSuv,
      n: 'Wages and employer contributions give compensation of one thousand five hundred and ninety crore. Corporation tax, dividends and retained profit make a profit of five hundred and twenty, so the operating surplus is eight hundred and ninety. Adding mixed income gives domestic income of three thousand and ninety, and with factor income from abroad, national income is three thousand one hundred and fifteen. Interest on public debt and scholarships stay out.',
    }),
    sl('check', 'Quick check: profit as the remainder', {
      b: 'Find profit when domestic income and the other factor incomes are known.',
      chk: 'n_konark_profit',
      n: 'Subtract every other part of domestic income from the total.',
    }),
    sl('diagram', 'Three methods, one total', {
      b: 'Value added, factor incomes and final spending all equal **₹800 crore** in the Mandya chain.',
      v: vThree,
      n: 'Here are the three measurements side by side. The values added by the grower, the jaggery unit and the sweet shop make eight hundred crore. The wages, rent, interest and profit they pay make eight hundred. And households spend eight hundred on sweets. Value added is paid out as income, and income is spent on the final output.',
    }),
    sl('summary', 'Summary', {
      bl: ['National income can be measured at **production, distribution and disposition**.', 'Value added = value of output − intermediate consumption; this avoids **double counting**.', 'Domestic income = **compensation of employees + operating surplus + mixed income**.', 'National income = domestic income + **net factor income from abroad**.'],
      v: vSummary1,
      n: 'To sum up, the product method adds the value each producer adds, never the full sales of every firm. The income method adds compensation of employees, operating surplus and mixed income, then adjusts for factor income from abroad. Both measure the same flow, so both must reach the same total.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always find **value of output** first: sales plus change in stock, with the sign of the change.', 'A **machine** bought is not intermediate consumption; only inputs used up in the year are.', 'Build **profit** from its parts before adding operating surplus.', 'Write the reason for every item you **leave out**, such as transfers or repayable loans.'],
      n: 'Four habits earn marks. Begin with value of output and watch the sign of the change in stock. Do not subtract machines as inputs. In the income method, add corporation tax, dividends and undistributed profit before forming the operating surplus. And whenever you leave an item out, state why in a few words.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Measurement of National Income — Part 2: Expenditure Method, Precautions and Difficulties',
  goals: [
    'Calculate GDP at market price and national income by the expenditure method',
    'State and explain the precautions of each method, with the treatment of tricky items',
    'Explain the difficulties of measuring national income in India',
  ],
  slides: [
    sl('title', 'The Expenditure Method and Its Precautions', {
      b: 'Part 2 — measuring national income by **final spending**, and the care each method needs.',
      v: vRoute2,
      n: 'In this part we measure national income at the point where it is spent. We add the final spending of households, the government, producers and the rest of the world. Then we learn the precautions each method needs and why measurement is especially hard in India.',
    }),
    sl('concept', 'Four kinds of final expenditure', {
      b: 'GDP at market price = private and government final consumption + gross domestic capital formation + net exports.',
      v: vExpParts,
      n: 'Households buy consumer goods and services. The government spends on the services it provides, such as schools and hospitals. Producers spend on new machines, buildings and stocks. And foreigners buy our exports, while we buy imports. Adding consumption, capital formation and exports, and taking away imports, gives gross domestic product at market price.',
    }),
    sl('concept', 'Capital formation and net exports', {
      b: 'Capital formation includes the **change in stock**; net exports can be **negative**.',
      v: vGcf,
      n: 'Investment spending has two parts: new fixed assets, and the change in stocks of raw materials and finished goods. If stocks fall, the change is negative and lowers the total. Net exports are exports minus imports. When a country imports more than it exports, net exports are negative and reduce domestic product.',
    }),
    sl('check', 'Quick check: GDP at market price', {
      b: 'Add the components for imagined Tamrapatna, taking care with the signs.',
      chk: 'm_exp_tamra',
      n: 'Watch the sign of the change in stock and remember to subtract imports.',
    }),
    sl('example', 'Worked example 1: from final spending to national income', {
      b: 'Imagined Tamrapatna: find GDP at market price, GNP at market price and national income.',
      bl: [
        'Step 1 — Capital formation = fixed capital formation + change in stock.',
        'Step 2 — Net exports = exports − imports.',
        'Step 3 — Add the four components: GDP at market price.',
        'Step 4 — Subtract depreciation and net indirect taxes; add net factor income from abroad.',
      ],
      v: vTam,
      n: 'Fixed capital formation of eight hundred and twenty and a fall in stock of forty give capital formation of seven hundred and eighty. Exports of three hundred and sixty less imports of four hundred and ten give net exports of minus fifty. Gross domestic product at market price is four thousand five hundred and eighty crore. After depreciation, net indirect taxes and a negative factor income from abroad, national income is four thousand one hundred and five.',
    }),
    sl('concept', 'Steps of the expenditure method', {
      b: 'Identify, classify, estimate and add, then adjust.',
      v: vExpSteps,
      n: 'First identify all the units that make final expenditure. Next classify their spending into consumption, capital formation and net exports. Estimate each class and add them to get gross domestic product at market price. Finally subtract depreciation and net indirect taxes, and add net factor income from abroad, to reach national income.',
    }),
    sl('check', 'Quick check: a fall in stock', {
      b: 'Find gross domestic capital formation when stocks fall during the year.',
      chk: 'n_tamra_gdcf',
      n: 'A fall in stock is a negative change in stock.',
    }),
    sl('example', 'Worked example 2: sorting a mixed list', {
      b: 'Imagined Shivgarh gives eight items. Decide which to add, which to subtract and which to leave out.',
      bl: [
        'Step 1 — Add consumption, government consumption, capital formation and exports.',
        'Step 2 — Subtract imports.',
        'Step 3 — Leave out pensions, shares and second-hand buses, with reasons.',
        'Step 4 — State the total with its unit.',
      ],
      v: vShi,
      n: 'Exam tables often hide items that do not belong. Here we add consumption, government consumption, capital formation and exports, and subtract imports, to get one thousand four hundred and eighty crore. Pensions are transfers, shares are financial assets, and second-hand buses were counted when they were new, so all three are left out.',
    }),
    sl('concept', 'Precautions: value-added method', {
      b: 'Avoid double counting, and remember the goods that are produced but never sold.',
      v: vPrecVA,
      n: 'In the value-added method, the main danger is double counting, so only value added is counted. Second-hand goods are left out, though a dealer\'s commission is new output. Food a farmer keeps for his family, and the housing service of an owner-occupied home, are produced in the year and are valued and included.',
    }),
    sl('concept', 'Precautions: income method', {
      b: 'Count only incomes **earned in production**.',
      v: vPrecInc,
      n: 'In the income method, include only incomes earned by supplying factor services. Pensions, scholarships and other transfers are left out. So are lottery prizes and gains from selling old property, because nothing new is produced. Payments in kind and imputed incomes, such as the rent of an owner-occupied house, are included.',
    }),
    sl('check', 'Quick check: match the treatment', {
      b: 'Match each transaction with how it is treated in national income.',
      chk: 'mt_treatment',
      n: 'For each one, ask whether anything new was produced in the year.',
    }),
    sl('concept', 'Precautions: expenditure method', {
      b: 'Count **final** spending only; leave out second-hand goods, financial assets and transfers.',
      v: vPrecExp,
      n: 'In the expenditure method, count only spending on final goods and services, because intermediate goods are already inside them. Spending on second-hand goods, on shares and bonds, and on transfer payments such as pensions is left out. Otherwise the same output would be counted twice, or something that is not output would be counted.',
    }),
    sl('diagram', 'Difficulties in measuring national income in India', {
      b: 'Indian figures are careful **estimates**, not exact counts.',
      v: vIndia,
      n: 'Measurement is hard in India for several reasons. Much farm output is kept for home use or exchanged without money, so its value must be estimated. Many small producers and self-employed workers keep no accounts, and some incomes go unreported. So statisticians rely on surveys, samples and assumptions to complete the picture.',
    }),
    sl('check', 'Quick check: a lottery prize', {
      b: 'True or false: a lottery prize is included in national income.',
      chk: 'tf_windfall',
      n: 'Ask whether the prize rewards any productive service.',
    }),
    sl('two-column', 'Comparing the three methods', {
      cols: ['**Where each measures**\n\n- Value added: production\n- Income: distribution\n- Expenditure: disposition', '**Main danger**\n\n- Value added: double counting\n- Income: counting transfers\n- Expenditure: counting non-final spending'],
      v: vCompare,
      n: 'Each method looks at a different phase of the same flow. The value-added method measures production and must avoid double counting. The income method measures distribution and must keep out transfers. The expenditure method measures disposition and must count only final spending. In practice, statisticians use all three to check one another.',
    }),
    sl('summary', 'Summary', {
      bl: ['GDP at market price = private and government final consumption + capital formation + **net exports**.', 'National income = GDP at market price − depreciation − net indirect taxes + net factor income from abroad.', 'Leave out **transfers, second-hand goods and financial assets**; include imputed rent and self-consumption.', 'In India, **non-monetised output** and **missing data** make the figures estimates.'],
      v: vSummary2,
      n: 'To sum up, the expenditure method adds final spending and then adjusts to national income. Every method needs care: transfers, second-hand goods and financial assets stay out, while imputed rent and production for self-use come in. And in India, much output is never bought or sold, so national income is always an estimate.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Set out workings in **steps**, naming each aggregate as you reach it.', 'Use the **sign** of net exports, change in stock and net factor income exactly as given.', 'In "treatment" questions, say **included or excluded** and give **one reason**.', 'Commission on second-hand goods and brokerage on shares are **included**.'],
      n: 'Four points to remember. Show each step and name the aggregate you reach. Keep every sign as given, especially negative net exports, a fall in stock or negative factor income from abroad. In treatment questions, state the decision and the reason. And remember that commissions and brokerage are payments for services, so they are included.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Measurement of National Income — Notes',
  sections: [
    {
      h: '1. Three phases, three methods',
      t: [1, 2, 3],
      b: '- National income is generated in **production**, **distributed** as factor incomes and **disposed of** as spending. It can be measured at each phase.\n- **Product (value-added) method** at production; **income method** at distribution; **expenditure method** at disposition.\n- Because value added is paid out as incomes and incomes are spent on final output, the three totals are equal when measured correctly.',
      terms: [['Value-added method', 'Measures national income as the sum of the values added by all producing units.'], ['Income method', 'Measures national income as the sum of factor incomes earned in production.'], ['Expenditure method', 'Measures national income as the sum of final expenditure on domestic output, adjusted to factor cost and national.']],
      v: vPoints,
      vs: [vThree],
    },
    {
      h: '2. The value-added (product) method',
      t: 1,
      b: '- **Value of output** = sales + change in stock (closing stock − opening stock).\n- **Intermediate consumption**: goods and services bought from other producers and used up in the year (raw materials, power, fuel, repairs). Machines and buildings are **not** intermediate consumption.\n- **Gross value added at market price** = value of output − intermediate consumption.\n- **Net value added at factor cost** = GVA at market price − depreciation − net indirect taxes (indirect taxes − subsidies).\n- Sum of GVA of all units = GDP at market price; adjust to national income in the usual way.',
      terms: [['Value of output', 'Sales plus the change in stock during the year.'], ['Intermediate consumption', 'Inputs bought from other producers and used up within the year.'], ['Value added', 'Value of output less intermediate consumption.']],
      v: vTerms,
      vs: [vPump, vCotton],
    },
    {
      h: '3. Double counting',
      t: 1,
      b: '- **Double counting** means counting the value of the same input more than once, which overstates output.\n- It happens when the full sales of every firm in a chain are added.\n- Two cures: (1) the **final product approach**, counting only final goods and services; (2) the **value-added approach**, counting only what each firm adds.\n- Imagined Mandya chain: sum of sales ₹1,600 crore, but value of final output and total value added only ₹800 crore.',
      terms: [['Double counting', 'Counting the value of an input more than once in national output.'], ['Final good', 'A good bought for consumption or investment, not for resale or further production in the year.']],
      v: vMandya,
      vs: [vDouble],
    },
    {
      h: '4. The income method',
      t: 2,
      b: '- **Compensation of employees**: wages and salaries in cash and kind, and the employer\'s contributions to social security schemes.\n- **Operating surplus**: rent and royalty, interest, and profit (corporation tax + dividends + undistributed profit).\n- **Mixed income of the self-employed**: earnings that combine several factor rewards, such as those of farmers, artisans and small traders.\n- Domestic income (NDP at factor cost) = compensation of employees + operating surplus + mixed income. National income = domestic income + net factor income from abroad.\n- Steps: identify producing units and group them into sectors; classify and estimate their factor payments; add; adjust for factor income from abroad.',
      terms: [['Compensation of employees', 'All rewards paid to employees for their work, in cash or kind, including employer social security contributions.'], ['Operating surplus', 'Income from property and entrepreneurship: rent, interest and profit.'], ['Mixed income', 'Income of the self-employed that cannot be split into separate factor rewards.']],
      v: vIncomeParts,
      vs: [vCoe, vSuv],
    },
    {
      h: '5. The expenditure method',
      t: 3,
      b: '- **Final expenditure** on domestic output: private final consumption expenditure; government final consumption expenditure; gross domestic capital formation (gross fixed capital formation + change in stock); net exports (exports − imports).\n- Their sum is **GDP at market price**. National income = GDP at market price − consumption of fixed capital − net indirect taxes + net factor income from abroad.\n- Imports are subtracted because they are produced outside the domestic territory.\n- Steps: identify the units making final expenditure; classify it; estimate and add; adjust to national income.',
      terms: [['Private final consumption expenditure', 'Spending by households and non-profit institutions serving them on final goods and services.'], ['Gross domestic capital formation', 'Spending on new fixed assets plus the change in stock.'], ['Net exports', 'Exports minus imports of goods and services.']],
      v: vExpParts,
      vs: [vGcf, vTam, vShi],
    },
    {
      h: '6. Precautions and difficulties',
      t: 4,
      b: '- **Value-added method**: avoid double counting; exclude sales of second-hand goods but include commissions on them; include production for self-consumption and imputed rent of owner-occupied houses.\n- **Income method**: exclude transfer payments (pensions, scholarships, unemployment allowance, interest on national debt), windfall gains and capital gains; include payments in kind and imputed incomes; repayable loans to staff are not income.\n- **Expenditure method**: count final expenditure only; exclude spending on second-hand goods, financial assets (shares, bonds) and transfer payments; include brokerage on financial assets.\n- **Unpaid services** at home are left out by convention, though they are valuable.\n- **Difficulties in India**: a large non-monetised sector; many small producers without accounts; under-reported informal incomes; difficulty of valuing depreciation and self-consumption; reliance on surveys and samples.',
      terms: [['Transfer payment', 'A payment received without supplying any good or factor service in return.'], ['Imputed rent', 'The estimated rent of a house occupied by its owner, included in national income.'], ['Non-monetised sector', 'The part of the economy where output is used by producers themselves or bartered, not sold for money.']],
      v: vCompare,
      vs: [vPrecVA, vPrecInc, vPrecExp, vIndia],
    },
  ],
  tips: '**Common mistakes**\n- Starting from sales instead of **value of output** (sales + change in stock).\n- Subtracting the purchase of a **machine** as intermediate consumption.\n- Adding **transfer payments**, second-hand goods or shares.\n- Forgetting the **sign** of a fall in stock, negative net exports or negative factor income from abroad.\n- Leaving out **imputed rent** or **production for self-consumption**.\n\n**How marks are usually awarded**\n- Numericals: one mark for each correct intermediate aggregate and one for the final answer with its unit; a formula with the right items earns marks even after an arithmetic slip.\n- Treatment questions: one mark per item for the decision with a reason.\n- 4- and 8-mark questions in the ISC paper are set in parts; label each part.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three phases of national income', '**Production**, **distribution**, **disposition**.', 'concept', 1],
  ['Three methods', 'Value-added (product), income, expenditure.', 'fact', 1],
  ['**Value of output**', 'Sales + change in stock.', 'formula', 1],
  ['**Intermediate consumption**', 'Inputs bought and used up in the year.', 'definition', 1],
  ['**Gross value added** at market price', 'Value of output − intermediate consumption.', 'formula', 1],
  ['Net value added at factor cost', 'GVA at market price − depreciation − net indirect taxes.', 'formula', 1],
  ['Is a new machine intermediate consumption?', 'No: it is a **capital good**; only its depreciation is deducted.', 'exam-tip', 1],
  ['**Double counting**', 'Counting the value of an input more than once.', 'definition', 1],
  ['Two cures for double counting', 'Final product approach; value-added approach.', 'concept', 1],
  ['Mandya chain (imagined): sales 300, 500, 800', `Value added ${MAN_VA_TOTAL}, not ${MAN_SALES}.`, 'example', 1],
  ['Three parts of domestic income', 'Compensation of employees + operating surplus + mixed income.', 'formula', 2],
  ['**Compensation of employees**', 'Wages in cash and kind + employer\'s social security contributions.', 'definition', 2],
  ['**Operating surplus**', 'Rent and royalty + interest + profit.', 'definition', 2],
  ['Three parts of profit', 'Corporation tax, dividends, undistributed profit.', 'fact', 2],
  ['**Mixed income**', 'Earnings of the self-employed that combine several factor rewards.', 'definition', 2],
  ['Interest-free loan to staff', '**Not income**: it must be repaid.', 'exam-tip', 2],
  ['Interest on national debt', 'Excluded: treated as a **transfer payment**.', 'fact', 2],
  ['Components of final expenditure', 'Private and government final consumption, capital formation, net exports.', 'formula', 3],
  ['**Gross domestic capital formation**', 'Fixed capital formation + change in stock.', 'formula', 3],
  ['Why subtract imports?', 'They are produced **outside** the domestic territory.', 'concept', 3],
  ['From GDP at market price to national income', 'Less depreciation, less net indirect taxes, plus net factor income from abroad.', 'formula', 3],
  ['Tamrapatna (imagined)', `GDP at market price ${inr(TAM_GDPMP)}; national income ${inr(TAM_NI)} (₹ crore).`, 'example', 3],
  ['Teachers\' salaries in government schools', 'Government final consumption expenditure.', 'example', 3],
  ['**Transfer payment**', 'Received without supplying any good or factor service.', 'definition', 4],
  ['Second-hand car sold through a dealer', 'Price excluded; **dealer\'s commission included**.', 'exam-tip', 4],
  ['Shares bought through a broker', 'Shares excluded; **brokerage included**.', 'exam-tip', 4],
  ['**Imputed rent**', 'Estimated rent of an owner-occupied house; included.', 'definition', 4],
  ['Farm output kept for the family', 'Included as **production for self-consumption**.', 'fact', 4],
  ['Lottery prize', 'Excluded: a **windfall gain**.', 'fact', 4],
  ['Two difficulties in India', 'Non-monetised output; producers without accounts.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Measurement of National Income',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_va_formula', 'm_coe_parts', 'm_pfce_eg', 'm_transfer_excl', 'ar_final_only'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_double_meaning', { attempt: 1, keys: ['s_coe_two_parts', 's_gcf_parts'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each, with working. Question 9 has an internal choice.', items: ['s3_pump_nvafc', { attempt: 1, keys: ['s3_suvarna_ndpfc', 's3_tamra_ni'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with working.', items: ['l_cotton_chain'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Measurement of National Income',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_vo_formula', 'm_ic_meaning', 'm_os_parts', 'm_mixed', 'm_gfce', 'm_gcf_parts', 'm_nx_neg', 'm_shares', 'm_imputed_rent', 'm_own_account', 'ar_interest_debt', 'ar_imports_sub'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_two_avoid', 's_os_meaning', { attempt: 1, keys: ['s_nx', 's_india_difficulties'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each, with working. Question 19 has an internal choice.', items: ['s3_cotton_two', 's3_income_steps', 's3_exp_steps', { attempt: 1, keys: ['s3_treatment_three', 's3_precaution_va'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_income_full', { attempt: 1, keys: ['l_exp_full', 'l_precautions'] }] },
  ],
});

assert(GAR_NVAFC === 480 && PUMP_NVAFC === 850 && SUV_NI === 3115 && TAM_NI === 4105 && SHI_GDPMP === 1480 && MAN_INCOME === MAN_VA_TOTAL, 'deck figures');
assert(TAM_GNPMP === 4545 && TAM_NDPMP === 4400 && COT_GVA === 1500 && SUV_OS === 890 && GAR.dep === 40 && GAR_NIT === 30, 'worked tables');

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch20 only (value-added method and double counting; income method; expenditure method; precautions and difficulties of each, including India)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, table numericals, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every economy, firm and case written for this chapter (imagined); no textbook, specimen or past-paper item or table reused; set-ups and numbers differ from SOYL CBSE 12 Economics ch01 and the ISC 2027 specimen tables',
    data: `figures computed in questions.mjs and asserted: Mandya value added ${MAN_VA.join(' + ')} = ${MAN_VA_TOTAL} = incomes ${MAN_INCOME} (sales ${MAN_SALES}); Vidarbha GVA ${COT.map((f) => f.gva).join(' + ')} = ${COT_GVA} (outputs ${COT_VO}), garment NVA at factor cost ${GAR_NVAFC}; pump GVA ${PUMP_GVA}, NVA at factor cost ${PUMP_NVAFC}; Suvarnagiri compensation ${SUV_COE}, operating surplus ${SUV_OS}, domestic income ${SUV_NDPFC}, national income ${SUV_NI}; Tamrapatna GDP at market price ${TAM_GDPMP}, GNP at market price ${TAM_GNPMP}, national income ${TAM_NI}; Shivgarh ${SHI_GDPMP}`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
