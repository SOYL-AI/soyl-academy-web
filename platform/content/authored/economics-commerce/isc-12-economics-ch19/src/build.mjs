// Build ISC 12 Economics ch19 National Income Aggregates. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch19/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch19', 'economics-commerce');
const {
  inr, AMB, AMB_A, DEV, DEV_NDPFC, DEV_NDPMP, DEV_GDPMP, PHA, PHA_NDPFC, TIR, TIR_IN, TIR_OUT, TIR_NFIA, CHA, CHA_PC,
  SAP, SAP_PC1, SAP_PC2, SAP_NI_GROWTH, LOH, LOH_PVTDOM, LOH_PVT, LOH_PI, LOH_PDI, MAN, MAN_NNDI, MAN_GNDI,
  KET, KET_NOM1, KET_NOM2, KET_REAL2, KET_DEF2, KET_REALG, KET_NOMG,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures
// (1) Ambarpur: the seven aggregates from GDP at market price down to national income, as bars.
const AGG = [
  ['GDP mp', AMB.gdpmp], ['NDP mp', AMB_A.ndpmp], ['GDP fc', AMB_A.gdpfc], ['NDP fc', AMB_A.ndpfc],
  ['GNP mp', AMB_A.gnpmp], ['NNP mp', AMB_A.nnpmp], ['NNP fc', AMB_A.nnpfc],
];
const vLadder = (() => {
  const s = new Svg(640, 400);
  const c = s.chart({ x1: 8, y1: 6000, left: 70, top: 40, width: 520, height: 280, xLabel: 'Aggregate', yLabel: '₹ crore' });
  AGG.forEach(([name, v], i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.34), x1 = c.X(x + 0.34);
    const col = i === AGG.length - 1 ? 'accent' : 'blue';
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: col, fillOpacity: 0.5, color: col, sw: 1.4, rx: 2 });
    c.label([x, v], inr(v), { dy: -10, size: 11 });
    c.xTick(x, name);
  });
  c.yTick(2000, '2,000').yTick(4000, '4,000');
  return s.visual(
    `Bar chart of the aggregates of imagined Ambarpur in crore rupees: GDP at market price ${AMB.gdpmp}, NDP at market price ${AMB_A.ndpmp}, GDP at factor cost ${AMB_A.gdpfc}, NDP at factor cost ${AMB_A.ndpfc}, GNP at market price ${AMB_A.gnpmp}, NNP at market price ${AMB_A.nnpmp} and national income (NNP at factor cost) ${AMB_A.nnpfc}`,
    `Imagined Ambarpur: depreciation ${AMB.dep}, net indirect taxes ${AMB.nit}, NFIA ${AMB.nfia} (₹ crore). mp = market price, fc = factor cost.`,
  );
})();
// (2) Ketakipur: nominal against real GDP in the base year and the current year.
const vKetBars = (() => {
  const s = new Svg(560, 400);
  const c = s.chart({ x1: 5, y1: 7000, left: 70, top: 40, width: 420, height: 280, xLabel: 'Year', yLabel: '₹ (imagined)' });
  const bars = [[0.8, KET_NOM1, 'blue'], [1.6, KET_NOM1, 'accent'], [3.2, KET_NOM2, 'blue'], [4.0, KET_REAL2, 'accent']];
  for (const [x, v, col] of bars) {
    const x0 = c.X(x - 0.35), x1 = c.X(x + 0.35);
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: col, fillOpacity: 0.5, color: col, sw: 1.4, rx: 2 });
    c.label([x, v], inr(v), { dy: -10, size: 11 });
  }
  c.xTick(1.2, 'Base year').xTick(3.6, 'Current year');
  c.yTick(2000, '2,000').yTick(4000, '4,000').yTick(6000, '6,000');
  s.rect(330, 52, 14, 12, { fill: 'blue', fillOpacity: 0.5, color: 'blue', sw: 1, rx: 1 });
  s.text(350, 58, 'Nominal (current prices)', { anchor: 'start', size: 11 });
  s.rect(330, 74, 14, 12, { fill: 'accent', fillOpacity: 0.5, color: 'accent', sw: 1, rx: 1 });
  s.text(350, 80, 'Real (base-year prices)', { anchor: 'start', size: 11 });
  assert(KET_NOM2 > KET_REAL2 && KET_REAL2 > KET_NOM1, 'ketakipur ordering');
  return s.visual(
    `Bar chart of imagined Ketakipur: in the base year nominal and real GDP are both ${KET_NOM1}; in the current year nominal GDP is ${KET_NOM2} but real GDP at base-year prices is ${KET_REAL2}, so output rose ${KET_REALG} per cent while nominal GDP rose ${KET_NOMG} per cent`,
    `Imagined rice and cloth economy; GDP deflator in the current year ${KET_DEF2}.`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vThreeItems = table(
  ['Item', 'What it is', 'Use'],
  [
    ['Depreciation', 'Fixed capital used up by wear and tear and expected obsolescence', 'Gross − depreciation = net'],
    ['Net indirect taxes', 'Indirect taxes − subsidies', 'Market price − net indirect taxes = factor cost'],
    ['Net factor income from abroad', 'Factor income received from abroad − factor income paid abroad', 'Domestic + NFIA = national'],
  ],
  'Table of the three adjusting items: depreciation turns gross into net; net indirect taxes (indirect taxes minus subsidies) turn market price into factor cost; net factor income from abroad turns domestic into national',
);
const vEight = table(
  ['', 'Market price', 'Factor cost'],
  [['Gross domestic', 'GDP mp', 'GDP fc'], ['Net domestic', 'NDP mp', 'NDP fc (domestic income)'], ['Gross national', 'GNP mp', 'GNP fc'], ['Net national', 'NNP mp', 'NNP fc (national income)']],
  'Grid of the eight aggregates: gross or net, domestic or national, each at market price and at factor cost; NDP at factor cost is domestic income and NNP at factor cost is national income',
  'Three choices, eight combinations.',
);
const vAmbSteps = table(
  ['Step (imagined Ambarpur, ₹ crore)', 'Working', 'Result'],
  [
    ['GDP at market price', 'given', inr(AMB.gdpmp)],
    ['NDP at market price', `${AMB.gdpmp} − ${AMB.dep}`, inr(AMB_A.ndpmp)],
    ['NDP at factor cost', `${AMB_A.ndpmp} − (${AMB.it} − ${AMB.sub})`, inr(AMB_A.ndpfc)],
    ['NNP at factor cost', `${AMB_A.ndpfc} + (${AMB.nfia})`, `**${inr(AMB_A.nnpfc)}**`],
  ],
  `Table of steps for imagined Ambarpur: GDP at market price ${AMB.gdpmp}; minus depreciation ${AMB.dep} gives ${AMB_A.ndpmp}; minus net indirect taxes ${AMB.nit} gives ${AMB_A.ndpfc}; plus NFIA of minus ${-AMB.nfia} gives national income ${AMB_A.nnpfc}`,
);
const vDevSteps = flow('LR', [`National income ${inr(DEV.nnpfc)}`, `− NFIA ${DEV.nfia}: NDP fc ${inr(DEV_NDPFC)}`, `+ net indirect taxes ${DEV.nit}: NDP mp ${inr(DEV_NDPMP)}`, `+ depreciation ${DEV.dep}: GDP mp ${inr(DEV_GDPMP)}`], `Flow working back for imagined Devgiri: national income ${DEV.nnpfc}, minus NFIA ${DEV.nfia} gives NDP at factor cost ${DEV_NDPFC}, plus net indirect taxes ${DEV.nit} gives NDP at market price ${DEV_NDPMP}, plus depreciation ${DEV.dep} gives GDP at market price ${DEV_GDPMP}`, 'Working back: reverse each adjustment');
const vPha = table(
  ['Imagined Phalguni Desh (₹ crore)', 'Value'],
  [['NDP at market price', inr(PHA.ndpmp)], ['Indirect taxes', String(PHA.it)], ['Subsidies', String(PHA.sub)], ['Net indirect taxes', String(PHA.nit)], ['**NDP at factor cost**', `**${inr(PHA_NDPFC)}**`]],
  `Table of imagined Phalguni Desh: NDP at market price ${PHA.ndpmp}, indirect taxes ${PHA.it}, subsidies ${PHA.sub}, so net indirect taxes are minus ${-PHA.nit} and NDP at factor cost is ${PHA_NDPFC}, larger than at market price`,
  'Subsidies larger than indirect taxes: factor cost above market price.',
);
const vTir = table(
  ['Imagined Tirthapur (₹ crore)', 'Received from abroad', 'Paid abroad'],
  [['Compensation of employees', String(TIR.wagesIn), String(TIR.wagesOut)], ['Property and entrepreneurial income', String(TIR.propIn), String(TIR.propOut)], ['**Total**', `**${TIR_IN}**`, `**${TIR_OUT}**`]],
  `Table of imagined Tirthapur: factor income received from abroad ${TIR_IN} (wages ${TIR.wagesIn}, property income ${TIR.propIn}); paid abroad ${TIR_OUT} (wages ${TIR.wagesOut}, profits ${TIR.propOut}); net factor income from abroad is minus ${-TIR_NFIA}`,
  `NFIA = ${TIR_IN} − ${TIR_OUT} = ${TIR_NFIA}.`,
);
const vTerritory = table(
  ['Inside the domestic territory', 'Outside it'],
  [['Land, territorial waters and airspace', 'A foreign country\'s embassy in our capital'], ['Our embassies and consulates abroad', 'Our citizens\' flats or firms in other countries'], ['Our ships and aircraft operating abroad', 'Foreign ships passing through our waters'], ['Our fishing vessels and oil rigs in our zone', 'International organisations located here']],
  'Table of what lies inside the domestic territory (land, waters, airspace, our embassies abroad, our ships and aircraft, our fishing vessels and rigs) and what lies outside it (foreign embassies here, our property abroad, foreign ships, international organisations)',
);
const vPcTable = table(
  ['Imagined Saptagiri', 'Last year', 'This year'],
  [['National income (₹ crore)', inr(SAP.ni1), inr(SAP.ni2)], ['Population (crore)', String(SAP.pop1), String(SAP.pop2)], ['**Per capita income (₹)**', `**${inr(SAP_PC1)}**`, `**${inr(SAP_PC2)}**`]],
  `Table of imagined Saptagiri: national income rises from ${SAP.ni1} to ${SAP.ni2} crore, but population rises from ${SAP.pop1} to ${SAP.pop2} crore, so per capita income falls from ${SAP_PC1} to ${SAP_PC2} rupees`,
  `National income up ${SAP_NI_GROWTH} per cent; population up 12.5 per cent.`,
);
const vIncomeChain = flow('LR', ['NDP at factor cost', 'Income accruing to the private sector', 'Private income', 'Personal income', 'Personal disposable income'], 'Flow from NDP at factor cost to income accruing to the private sector, then private income, personal income and personal disposable income', 'From domestic income to household income');
const vLoh = table(
  ['Imagined Lohitpur (₹ crore)', 'Working', 'Result'],
  [
    ['Income accruing to private sector', `${inr(LOH.ndpfc)} − ${LOH.govProp} − ${LOH.ndeSave}`, inr(LOH_PVTDOM)],
    ['Private income', `+ ${LOH.nfia} + ${LOH.govTr} + ${LOH.rowTr} + ${LOH.debtInt}`, inr(LOH_PVT)],
    ['Personal income', `− ${LOH.corpSave} − ${LOH.corpTax}`, inr(LOH_PI)],
    ['Personal disposable income', `− ${LOH.dirTax} − ${LOH.misc}`, `**${inr(LOH_PDI)}**`],
  ],
  `Table for imagined Lohitpur: income accruing to the private sector ${LOH_PVTDOM}; adding NFIA, transfers from government and from abroad and interest on national debt gives private income ${LOH_PVT}; subtracting corporate saving and corporation tax gives personal income ${LOH_PI}; subtracting direct taxes and fees gives personal disposable income ${LOH_PDI}`,
);
const vNdi = table(
  ['Imagined Mandakini (₹ crore)', 'Value'],
  [['NNP at market price', inr(MAN.nnpmp)], ['+ Net current transfers from abroad', String(MAN.rowTr)], ['**= Net national disposable income**', `**${inr(MAN_NNDI)}**`], ['+ Depreciation', String(MAN.dep)], ['**= Gross national disposable income**', `**${inr(MAN_GNDI)}**`]],
  `Table of imagined Mandakini: NNP at market price ${MAN.nnpmp} plus net current transfers ${MAN.rowTr} gives net national disposable income ${MAN_NNDI}; adding depreciation ${MAN.dep} gives gross national disposable income ${MAN_GNDI}`,
);
const vKetTable = table(
  ['Imagined Ketakipur', 'Base year', 'Current year'],
  [['Rice: quantity × price', `${KET.y1.rice[0]} × ₹${KET.y1.rice[1]}`, `${KET.y2.rice[0]} × ₹${KET.y2.rice[1]}`], ['Cloth: quantity × price', `${KET.y1.cloth[0]} × ₹${KET.y1.cloth[1]}`, `${KET.y2.cloth[0]} × ₹${KET.y2.cloth[1]}`], ['Nominal GDP', inr(KET_NOM1), inr(KET_NOM2)], ['Real GDP (base-year prices)', inr(KET_NOM1), inr(KET_REAL2)]],
  `Table of imagined Ketakipur: base year rice ${KET.y1.rice[0]} at ${KET.y1.rice[1]} and cloth ${KET.y1.cloth[0]} at ${KET.y1.cloth[1]}; current year rice ${KET.y2.rice[0]} at ${KET.y2.rice[1]} and cloth ${KET.y2.cloth[0]} at ${KET.y2.cloth[1]}; nominal GDP ${KET_NOM1} and ${KET_NOM2}; real GDP ${KET_NOM1} and ${KET_REAL2}`,
);
const vDeflator = flow('LR', ['Nominal GDP (current prices)', '÷ GDP deflator × 100', 'Real GDP (base-year prices)'], 'Flow: nominal GDP at current prices divided by the GDP deflator and multiplied by 100 gives real GDP at base-year prices', 'Removing the price effect');
const vWelfare = table(
  ['Limitation', 'Why GDP misleads', 'Effect on GDP as a welfare index'],
  [['Distribution of income', 'Shows the total, not who gets it', 'May overstate welfare if gains go to a few'], ['Non-monetary exchanges', 'Unpaid work and self-produced goods are left out', 'Understates welfare'], ['Externalities', 'Unpaid harms and benefits to others are not counted', 'Overstates (harms) or understates (benefits)']],
  'Table of three limitations of GDP as an index of welfare: distribution of income, non-monetary exchanges and externalities, with why each misleads and in which direction',
);
const vExt = table(
  ['', 'Negative externality', 'Positive externality'],
  [['Example (imagined)', 'A tannery pollutes the river used by fishing families', 'A family garden freshens the air of the whole street'], ['Paid for?', 'No compensation to those harmed', 'No payment by those who benefit'], ['GDP treatment', 'Harm not deducted', 'Benefit not added']],
  'Table comparing a negative externality (a tannery polluting a river, harm not deducted from GDP) with a positive externality (a garden freshening the air, benefit not added to GDP)',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'National Income Aggregates — Part 1: The Eight Aggregates and National Income',
  goals: [
    'Define depreciation, net indirect taxes and net factor income from abroad',
    'Convert between gross and net, market price and factor cost, and domestic and national aggregates',
    'Explain domestic territory and normal residents',
    'Calculate national income and per capita income',
  ],
  slides: [
    sl('title', 'National Income Aggregates', {
      b: 'Part 1 — **eight aggregates**, the **three adjusting items**, and **national and per capita income**.',
      v: flow('LR', ['Three adjusting items', 'Eight aggregates', 'Domestic and national', 'Working forwards and back', 'Per capita income'], 'Route map of Part 1: the three adjusting items, the eight aggregates, domestic and national, working forwards and back, and per capita income', 'Part 1 at a glance'),
      n: 'When a country reports its income, it can mean several different totals. Some include worn-out machines, some include taxes inside prices, and some count income earned abroad. In this part we meet all eight of these totals, learn the three items that link them, and finish with national income and income per person.',
    }),
    sl('concept', 'Three items that link the aggregates', {
      b: 'Every aggregate name has three choices: **gross or net**, **market price or factor cost**, **domestic or national**.',
      v: vThreeItems,
      n: 'Three items do all the work. Depreciation is the value of machines and buildings used up in a year, and it separates gross from net. Net indirect taxes, which are indirect taxes minus subsidies, separate market price from factor cost. Net factor income from abroad separates domestic from national.',
    }),
    sl('diagram', 'The eight aggregates', {
      b: 'Combine the three choices and you get **eight** totals.',
      v: vEight,
      n: 'Pick gross or net, domestic or national, and market price or factor cost, and you have one of eight aggregates. Two of them have special names. Net domestic product at factor cost is domestic income, and net national product at factor cost is national income, the figure most often quoted.',
    }),
    sl('check', 'Quick check: is factor cost always smaller?', {
      b: 'True or false: an aggregate at factor cost is always smaller than at market price.',
      chk: 'tf_fc_mp',
      n: 'Think about a country that pays out more in subsidies than it collects in indirect taxes.',
    }),
    sl('concept', 'Market price and factor cost', {
      b: 'Market price = factor cost + indirect taxes − subsidies. When **subsidies exceed indirect taxes**, factor cost is the larger figure.',
      v: vPha,
      n: 'Indirect taxes such as goods and services tax push prices above what factors are paid. Subsidies pull prices below it. Usually taxes are larger, so market price is higher. But in imagined Phalguni Desh subsidies are larger, so net domestic product at factor cost, one thousand eight hundred and sixty crore, exceeds the market price figure.',
    }),
    sl('concept', 'Domestic territory and normal residents', {
      b: '**Domestic** income is earned **inside the domestic territory**; **national** income is earned by **normal residents**, wherever they work.',
      v: vTerritory,
      n: 'Domestic territory is wider than the map. It includes the country\'s embassies and military bases abroad, and its ships and aircraft operating between countries. A normal resident ordinarily lives in the country and has their centre of economic interest there. Domestic income follows the territory; national income follows the residents.',
    }),
    sl('diagram', 'Net factor income from abroad', {
      b: 'NFIA = factor income received from abroad − factor income paid to non-residents. It can be **negative**.',
      v: vTir,
      n: 'Residents of imagined Tirthapur earn two hundred and sixty crore abroad as wages and interest. Foreign workers and firms earn three hundred and ten crore inside Tirthapur. So net factor income from abroad is minus fifty crore, and Tirthapur\'s national product is smaller than its domestic product.',
    }),
    sl('check', 'Quick check: find the net figure', {
      b: 'Find net factor income from abroad for imagined Tirthapur.',
      chk: 'n_tir_nfia',
      n: 'Add what residents earn abroad, add what non-residents earn here, and subtract the second from the first.',
    }),
    sl('example', 'Worked example 1: from GDP to national income', {
      b: 'Imagined Ambarpur: GDP at market price ₹4,800 crore. Find national income.',
      bl: [
        `Step 1 — Gross to net: ${AMB.gdpmp} − depreciation ${AMB.dep} = **${inr(AMB_A.ndpmp)}**.`,
        `Step 2 — Market price to factor cost: − (${AMB.it} − ${AMB.sub}) = **${inr(AMB_A.ndpfc)}** (domestic income).`,
        `Step 3 — Domestic to national: + NFIA (${AMB.nfia}) = **${inr(AMB_A.nnpfc)}**.`,
        'Step 4 — Write the answer with its name: NNP at factor cost, the national income.',
      ],
      v: vAmbSteps,
      n: 'Start with four thousand eight hundred crore. Subtract depreciation of three hundred and sixty to reach the net figure. Subtract net indirect taxes of four hundred and twenty to reach domestic income, four thousand and twenty. Add net factor income from abroad, which is minus sixty, and national income is three thousand nine hundred and sixty crore.',
    }),
    sl('diagram', 'All seven figures for Ambarpur', {
      b: 'Each step down the ladder removes one item.',
      v: vLadder,
      n: 'This chart shows every aggregate for imagined Ambarpur. Notice how each one is smaller than gross domestic product at market price, because depreciation and net indirect taxes are positive and net factor income from abroad is negative. National income, at the end, is the smallest of all.',
    }),
    sl('check', 'Quick check: order the steps', {
      b: 'Arrange the steps from GDP at market price to national income.',
      chk: 'ord_ladder',
      n: 'Take away the worn-out capital first, then the taxes inside prices, then bring in income from abroad.',
    }),
    sl('example', 'Worked example 2: working back to GDP', {
      b: 'Imagined Devgiri gives national income ₹2,700 crore. Find GDP at market price.',
      bl: [
        `Step 1 — Remove NFIA: ${DEV.nnpfc} − ${DEV.nfia} = **${inr(DEV_NDPFC)}** (NDP at factor cost).`,
        `Step 2 — Add net indirect taxes: + (${DEV.it} − ${DEV.sub}) = **${inr(DEV_NDPMP)}**.`,
        `Step 3 — Add depreciation: + ${DEV.dep} = **${inr(DEV_GDPMP)}**.`,
        'Step 4 — Every sign is the opposite of the forward direction.',
      ],
      v: vDevSteps,
      n: 'Working backwards simply reverses each step. From national income of two thousand seven hundred, take away net factor income from abroad of forty. Add back net indirect taxes of two hundred and eighty. Add back depreciation of two hundred and ten. Gross domestic product at market price is three thousand one hundred and fifty crore.',
    }),
    sl('concept', 'National income and per capita income', {
      b: '**National income** = NNP at factor cost. **Per capita income** = national income ÷ population.',
      v: vPcTable,
      n: 'National income is net national product at factor cost. To compare living standards, divide it by population to get per capita income. In imagined Saptagiri, national income rose eight per cent, but population rose faster, so income per person fell from twenty five thousand to twenty four thousand rupees.',
    }),
    sl('check', 'Quick check: name the figure', {
      b: 'Fill in the blank: national income is net national product at ___ cost.',
      chk: 'fb_nnpfc',
      n: 'Recall which of the two valuations excludes the taxes inside prices.',
    }),
    sl('example', 'Worked example 3: per capita income', {
      b: `Imagined Chandranagar: national income ₹${inr(CHA.ni)} crore, population ${CHA.pop} crore.`,
      bl: [
        'Step 1 — Write the formula: national income ÷ population.',
        `Step 2 — Divide: ${inr(CHA.ni)} crore ÷ ${CHA.pop} crore.`,
        `Step 3 — The crores cancel: **₹${inr(CHA_PC)}** per person.`,
        'Step 4 — Compare with other years or places, not with national income.',
      ],
      v: table(['Imagined Chandranagar', 'Value'], [['National income', `₹${inr(CHA.ni)} crore`], ['Population', `${CHA.pop} crore`], ['**Per capita income**', `**₹${inr(CHA_PC)}**`]], `Table of imagined Chandranagar: national income ${CHA.ni} crore rupees, population ${CHA.pop} crore, per capita income ${CHA_PC} rupees`),
      n: 'Imagined Chandranagar earns sixty three thousand crore rupees and has one point eight crore people. Dividing, the crores cancel and each person has thirty five thousand rupees on average. This average lets us compare Chandranagar with a larger or smaller place fairly.',
    }),
    sl('summary', 'Summary', {
      bl: ['Depreciation: gross to net. Net indirect taxes: market price to factor cost. NFIA: domestic to national.', 'Domestic income = NDP at factor cost; **national income = NNP at factor cost**.', 'Domestic follows the **territory**; national follows the **normal residents**.', 'Per capita income = national income ÷ population.'],
      v: vThreeItems,
      n: 'To sum up, three items link all eight aggregates. Depreciation separates gross from net, net indirect taxes separate market price from factor cost, and net factor income from abroad separates domestic from national. National income is net national product at factor cost, and dividing it by population gives per capita income.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write the **name** of each aggregate at every step of a calculation.', 'Keep the **sign** of NFIA; a negative NFIA makes national smaller than domestic.', 'Net indirect taxes = indirect taxes **minus** subsidies, never plus.', 'Embassies abroad are **inside** our domestic territory.'],
      n: 'Four habits earn marks. Name every aggregate as you reach it, so the examiner can follow you. Keep the sign of net factor income from abroad. Remember that subsidies are subtracted from indirect taxes. And remember that a country\'s embassies abroad are part of its own domestic territory.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'National Income Aggregates — Part 2: Income Concepts, Real GDP and Welfare',
  goals: [
    'Calculate private income, personal income and personal disposable income',
    'Calculate gross and net national disposable income',
    'Distinguish real from nominal GDP and use the GDP deflator',
    'Explain why GDP is an imperfect index of economic welfare',
  ],
  slides: [
    sl('title', 'Income Concepts, Real GDP and Welfare', {
      b: 'Part 2 — from domestic income to **household income**, from nominal to **real GDP**, and **GDP and welfare**.',
      v: flow('LR', ['Private income', 'Personal and disposable income', 'National disposable income', 'Real and nominal GDP', 'GDP and welfare'], 'Route map of Part 2: private income, personal and disposable income, national disposable income, real and nominal GDP, and GDP and welfare', 'Part 2 at a glance'),
      n: 'National income tells us what the nation earns, but households care about what reaches them and what they can spend. In this part we follow income down to the household, add gifts from abroad to find disposable income, separate price rises from real growth, and ask whether a bigger economy always means better lives.',
    }),
    sl('diagram', 'From domestic income to household income', {
      b: 'Each step **narrows** the income: first to the private sector, then to persons, then to what persons can freely use.',
      v: vIncomeChain,
      n: 'Start with domestic income. Remove what government departments and public enterprises keep, and you have income accruing to the private sector. Add income from abroad and transfers to reach private income. Remove what companies keep or pay in tax to reach personal income. Remove personal taxes, fees and fines to reach personal disposable income.',
    }),
    sl('concept', 'Private income', {
      b: 'Private income = income from domestic product accruing to the private sector + NFIA + current transfers from government + net current transfers from abroad + interest on national debt.',
      v: vLoh,
      n: 'Private income counts every rupee the private sector receives, whether earned or not. Besides factor income, it includes pensions and scholarships from the government, gifts from abroad, and interest the government pays on its debt, which is treated as a transfer. It excludes income that government departments earn from their own property and businesses.',
    }),
    sl('example', 'Worked example 4: private income in imagined Lohitpur', {
      b: 'Domestic income ₹9,000 crore. Find private income step by step.',
      bl: [
        `Step 1 — Private share of domestic income: ${inr(LOH.ndpfc)} − ${LOH.govProp} − ${LOH.ndeSave} = **${inr(LOH_PVTDOM)}**.`,
        `Step 2 — Add NFIA ${LOH.nfia} and transfers from government ${LOH.govTr}.`,
        `Step 3 — Add net transfers from abroad ${LOH.rowTr} and interest on national debt ${LOH.debtInt}.`,
        `Step 4 — Private income = **${inr(LOH_PVT)}** (₹ crore).`,
      ],
      v: table(['Item (₹ crore)', 'Value'], [['Income accruing to private sector', inr(LOH_PVTDOM)], ['Net factor income from abroad', String(LOH.nfia)], ['Transfers from government', String(LOH.govTr)], ['Net transfers from abroad', String(LOH.rowTr)], ['Interest on national debt', String(LOH.debtInt)], ['**Private income**', `**${inr(LOH_PVT)}**`]], `Table of imagined Lohitpur private income: private share ${LOH_PVTDOM} plus NFIA ${LOH.nfia}, transfers from government ${LOH.govTr}, transfers from abroad ${LOH.rowTr} and interest on national debt ${LOH.debtInt} gives ${LOH_PVT}`),
      n: 'In imagined Lohitpur, domestic income is nine thousand crore. Government departments earn four hundred from their property and public enterprises save three hundred, so the private share is eight thousand three hundred. Adding income from abroad, transfers from the government and from abroad, and interest on national debt gives private income of nine thousand crore.',
    }),
    sl('check', 'Quick check: name the income', {
      b: 'Fill in the blank: personal income minus direct taxes and fees gives personal ___ income.',
      chk: 'fb_pi',
      n: 'Think of the income a family is free to spend or save.',
    }),
    sl('concept', 'Personal and personal disposable income', {
      b: 'Personal income = private income − corporate saving − corporation tax. PDI = personal income − direct personal taxes − fees and fines.',
      v: table(['Imagined Lohitpur (₹ crore)', 'Value'], [['Private income', inr(LOH_PVT)], ['− Corporate saving − corporation tax', `${LOH.corpSave} + ${LOH.corpTax}`], ['= Personal income', inr(LOH_PI)], ['− Direct taxes − fees and fines', `${LOH.dirTax} + ${LOH.misc}`], ['**= Personal disposable income**', `**${inr(LOH_PDI)}**`]], `Table of imagined Lohitpur: private income ${LOH_PVT} minus corporate saving ${LOH.corpSave} and corporation tax ${LOH.corpTax} gives personal income ${LOH_PI}; minus direct taxes ${LOH.dirTax} and fees ${LOH.misc} gives personal disposable income ${LOH_PDI}`),
      n: 'Companies keep part of their profit and pay corporation tax, so that money never reaches persons. Subtracting both gives personal income, seven thousand nine hundred crore. Households then pay income tax, fees and fines, and what is left, seven thousand one hundred crore, is personal disposable income, which they can spend or save as they like.',
    }),
    sl('check', 'Quick check: what can households use?', {
      b: 'True or false: personal disposable income is what households can divide freely between consumption and saving.',
      chk: 'tf_pdi_spend',
      n: 'Ask what remains once companies and the government have taken their shares.',
    }),
    sl('concept', 'National disposable income', {
      b: 'Net NDI = NNP at market price + net current transfers from abroad. Gross NDI = net NDI + depreciation.',
      v: vNdi,
      n: 'National disposable income looks at the whole nation, not just households. To net national product at market price, add net current transfers from the rest of the world, such as gifts and remittances. In imagined Mandakini that gives five thousand three hundred and forty crore. Add depreciation for the gross figure, five thousand seven hundred and forty.',
    }),
    sl('concept', 'Nominal and real GDP', {
      b: '**Nominal GDP** uses **current prices**; **real GDP** uses **base-year prices**, so it moves only when output moves.',
      v: vKetTable,
      n: 'Imagined Ketakipur grows rice and cloth. Valued at this year\'s prices, its output is six thousand. But some of that rise is only prices. Valued at base-year prices, the same quantities are worth four thousand eight hundred. That second figure, real gross domestic product, tells us how much more was actually produced.',
    }),
    sl('example', 'Worked example 5: the GDP deflator', {
      b: 'Ketakipur: nominal GDP 6,000, real GDP 4,800. Find the deflator and the real growth rate.',
      bl: [
        `Step 1 — Deflator = ${KET_NOM2} ÷ ${KET_REAL2} × 100 = **${KET_DEF2}**.`,
        'Step 2 — Prices are 25 per cent above the base year.',
        `Step 3 — Real growth = (${KET_REAL2} − ${KET_NOM1}) ÷ ${KET_NOM1} × 100 = **${KET_REALG} per cent**.`,
        `Step 4 — Nominal growth was ${KET_NOMG} per cent; the rest is price rise.`,
      ],
      v: vKetBars,
      n: 'Divide nominal by real and multiply by one hundred: the deflator is one hundred and twenty five, so prices rose by a quarter. Real output rose from four thousand to four thousand eight hundred, which is twenty per cent. Nominal output rose fifty per cent, but most of that came from higher prices, not more goods.',
    }),
    sl('diagram', 'Deflating nominal GDP', {
      b: 'Real GDP = nominal GDP × 100 ÷ GDP deflator.',
      v: vDeflator,
      n: 'If you know nominal gross domestic product and the deflator, you can always find real gross domestic product. Multiply nominal by one hundred and divide by the deflator. A deflator above one hundred means prices are above the base year, so real output is smaller than the nominal figure.',
    }),
    sl('check', 'Quick check: deflate', {
      b: 'An imagined state has nominal GDP ₹7,560 crore and a deflator of 108. Find real GDP.',
      chk: 'n_bha_real',
      n: 'Multiply by one hundred, then divide by the deflator.',
    }),
    sl('concept', 'GDP and welfare', {
      b: 'GDP is an **imperfect** index of welfare because of **distribution**, **non-monetary exchanges** and **externalities**.',
      v: vWelfare,
      n: 'Economic welfare means the well-being people get from goods and services. A larger real gross domestic product can raise it, but three things get in the way. If the gains go to a few, most people may not benefit. Unpaid work at home is left out. And harms or benefits that nobody pays for are not counted.',
    }),
    sl('two-column', 'Externalities', {
      cols: ['**Negative externality**\n\n- Harm to others, no compensation\n- e.g. a tannery polluting a river\n- Not deducted: GDP **overstates** welfare', '**Positive externality**\n\n- Benefit to others, no payment\n- e.g. a garden freshening a street\n- Not added: GDP **understates** welfare'],
      v: vExt,
      n: 'An externality is an effect on others that no market price records. A tannery that pollutes a river raises output, which raises gross domestic product, but nobody deducts the harm to fishing families, so welfare is overstated. A family garden that freshens the street helps neighbours for free, and that benefit is never added.',
    }),
    sl('check', 'Quick check: GDP and well-being', {
      b: 'True or false: a higher real GDP always means people are better off.',
      chk: 'tf_gdp_welfare',
      n: 'Think about who receives the extra income, and what GDP leaves out.',
    }),
    sl('summary', 'Summary', {
      bl: ['Private income ⊃ personal income ⊃ personal disposable income.', 'Net NDI = NNP at market price + net current transfers from abroad; gross NDI adds depreciation.', 'Real GDP uses base-year prices; deflator = nominal ÷ real × 100.', 'GDP misses **distribution**, **non-monetary exchanges** and **externalities**.'],
      v: vIncomeChain,
      n: 'To sum up, income narrows as it moves from the private sector to persons and then to what persons can freely use. National disposable income adds transfers from abroad. Real gross domestic product removes the effect of prices, using the deflator. And because of distribution, unpaid activity and externalities, gross domestic product is only a partial guide to welfare.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Interest on national debt is a **transfer**: in private income, not in national income.', 'Corporate saving and corporation tax are removed for **personal** income; personal taxes for **disposable** income.', 'Always say which year is the **base year** when finding real GDP.', 'In welfare answers, give an **example** for each limitation.'],
      n: 'Watch four points. Interest on national debt is a transfer, so it appears in private income but not in national income. Subtract company items to reach personal income and personal taxes to reach disposable income. Name the base year in real income questions. And support each welfare limitation with a clear example.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'National Income Aggregates — Notes',
  sections: [
    {
      h: '1. The three adjusting items',
      t: 1,
      b: '- **Depreciation (consumption of fixed capital)**: the fall in value of fixed assets in a year from normal wear and tear and expected obsolescence. Gross − depreciation = net.\n- **Net indirect taxes** = indirect taxes − subsidies. Market price − net indirect taxes = factor cost. If subsidies exceed indirect taxes, net indirect taxes are negative and factor cost exceeds market price.\n- **Net factor income from abroad (NFIA)** = factor income received by normal residents from abroad − factor income paid to non-residents. Domestic + NFIA = national. Its parts: net compensation of employees, net property and entrepreneurial income, net retained earnings of resident companies abroad.',
      terms: [['Depreciation', 'Expected loss in value of fixed capital through use and obsolescence in a year.'], ['Net indirect taxes', 'Indirect taxes minus subsidies.'], ['Net factor income from abroad', 'Factor income received from abroad minus factor income paid abroad.']],
      v: vThreeItems,
      vs: [vPha, vTir],
    },
    {
      h: '2. The eight aggregates',
      t: 1,
      b: `- Choices: **gross or net**, **domestic or national**, **market price or factor cost**: eight aggregates.\n- **Domestic income** = NDP at factor cost; **national income** = NNP at factor cost.\n- Key relations: GNP mp = GDP mp + NFIA; NDP mp = GDP mp − depreciation; GDP fc = GDP mp − net indirect taxes; NNP fc = GDP mp − depreciation − net indirect taxes + NFIA.\n- Imagined Ambarpur (₹ crore): GDP mp ${inr(AMB.gdpmp)}; NDP mp ${inr(AMB_A.ndpmp)}; GDP fc ${inr(AMB_A.gdpfc)}; NDP fc ${inr(AMB_A.ndpfc)}; GNP mp ${inr(AMB_A.gnpmp)}; NNP mp ${inr(AMB_A.nnpmp)}; GNP fc ${inr(AMB_A.gnpfc)}; NNP fc ${inr(AMB_A.nnpfc)}.\n- **Working back** reverses each sign: imagined Devgiri's national income ${inr(DEV.nnpfc)} gives GDP mp ${inr(DEV_GDPMP)}.`,
      terms: [['Domestic income', 'NDP at factor cost: factor income earned within the domestic territory.'], ['National income', 'NNP at factor cost: factor income earned by normal residents, at home and abroad.']],
      v: vEight,
      vs: [vAmbSteps, vLadder, vDevSteps],
    },
    {
      h: '3. Domestic territory, normal residents and per capita income',
      t: [1, 2],
      b: `- **Domestic territory**: political frontiers, territorial waters and airspace, plus embassies, consulates and military bases abroad, ships and aircraft operating abroad, and fishing vessels and rigs in the country's zone. Foreign embassies and international organisations located here are excluded.\n- **Normal resident**: a person or institution that ordinarily resides in the country and whose centre of economic interest is there. Foreign tourists, crews and diplomats are not normal residents.\n- **Per capita income** = national income ÷ population. It falls if population grows faster than national income. Imagined Saptagiri: ₹${inr(SAP_PC1)} to ₹${inr(SAP_PC2)} although national income rose ${SAP_NI_GROWTH} per cent.`,
      terms: [['Domestic territory', 'The economic territory of a country, including its embassies, ships and aircraft abroad.'], ['Normal resident', 'One who ordinarily resides in a country and whose centre of economic interest lies there.'], ['Per capita income', 'National income divided by population.']],
      v: vTerritory,
      vs: [vPcTable],
    },
    {
      h: '4. Private, personal and disposable income',
      t: 3,
      b: `- **Income from domestic product accruing to the private sector** = NDP at factor cost − property and entrepreneurial income of government departments − saving of non-departmental public enterprises.\n- **Private income** = that + NFIA + current transfers from government + net current transfers from abroad + interest on national debt (a transfer).\n- **Personal income** = private income − corporate saving (undistributed profits) − corporation tax.\n- **Personal disposable income** = personal income − direct personal taxes − miscellaneous receipts of government (fees, fines).\n- **Net national disposable income** = NNP at market price + net current transfers from abroad; **gross** = net + depreciation.\n- Imagined Lohitpur (₹ crore): ${inr(LOH_PVTDOM)} → ${inr(LOH_PVT)} → ${inr(LOH_PI)} → ${inr(LOH_PDI)}. Imagined Mandakini: net NDI ${inr(MAN_NNDI)}, gross ${inr(MAN_GNDI)}.`,
      terms: [['Private income', 'Factor income and current transfers received by the private sector from all sources.'], ['Personal income', 'Private income less corporate saving and corporation tax.'], ['Personal disposable income', 'Personal income less direct personal taxes and miscellaneous receipts of government.'], ['National disposable income', 'NNP at market price plus net current transfers from abroad (net); gross adds depreciation.']],
      v: vIncomeChain,
      vs: [vLoh, vNdi],
    },
    {
      h: '5. Real and nominal GDP',
      t: 4,
      b: `- **Nominal GDP**: output valued at **current-year prices**; it changes with both quantities and prices.\n- **Real GDP**: output valued at **base-year prices**; it changes only with quantities and is used to measure growth.\n- **GDP deflator** = nominal GDP ÷ real GDP × 100. Real GDP = nominal GDP × 100 ÷ deflator.\n- Imagined Ketakipur: nominal ${inr(KET_NOM1)} → ${inr(KET_NOM2)} (up ${KET_NOMG} per cent); real ${inr(KET_NOM1)} → ${inr(KET_REAL2)} (up ${KET_REALG} per cent); deflator ${KET_DEF2}.`,
      terms: [['Nominal GDP', 'GDP at current prices.'], ['Real GDP', 'GDP at constant base-year prices.'], ['GDP deflator', 'Nominal GDP divided by real GDP, times 100.']],
      v: vKetTable,
      vs: [vKetBars, vDeflator],
    },
    {
      h: '6. GDP and welfare',
      t: 5,
      b: '- **Economic welfare**: well-being from goods and services that can be measured in money.\n- **Distribution of income**: GDP shows the total, not who gets it; if gains go to a few, most people may not be better off.\n- **Non-monetary exchanges**: unpaid household work, self-produced goods and barter are largely excluded, so GDP understates welfare.\n- **Externalities**: harms (pollution) are not deducted and benefits (a public garden) are not added, so GDP can overstate or understate welfare.\n- Conclusion: real GDP is a useful but **incomplete** index of welfare.',
      terms: [['Economic welfare', 'Well-being from goods and services that can be valued in money.'], ['Externality', 'An unpaid harm or benefit to others from an activity.']],
      v: vWelfare,
      vs: [vExt],
    },
  ],
  tips: '**Common mistakes**\n- Adding subsidies to indirect taxes instead of subtracting them.\n- Dropping the minus sign of a negative NFIA.\n- Including interest on national debt in national income (it belongs in private income only).\n- Subtracting personal taxes when asked for personal income.\n- Comparing nominal GDP across years as if it measured output.\n\n**How marks are usually awarded**\n- 1 mark: a correct option, a definition or a one-step calculation.\n- 2 marks: two points, or a formula with its value.\n- 3 marks: a calculation in steps with each aggregate named, or three points.\n- 5 marks (and ISC 4- and 8-mark questions): working shown in parts, each step named, and a reasoned conclusion.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Depreciation**', 'Expected fall in value of fixed capital from wear and tear and obsolescence in a year.', 'definition', 1],
  ['Gross − ? = net', '**Depreciation**.', 'formula', 1],
  ['**Net indirect taxes**', 'Indirect taxes **minus** subsidies.', 'formula', 1],
  ['Market price − ? = factor cost', '**Net indirect taxes**.', 'formula', 1],
  ['When is factor cost above market price?', 'When **subsidies exceed indirect taxes**.', 'concept', 1],
  ['**NFIA**', 'Factor income received from abroad − factor income paid to non-residents.', 'definition', 1],
  ['Domestic + ? = national', '**Net factor income from abroad**.', 'formula', 1],
  ['Three parts of NFIA', 'Net compensation of employees; net property and entrepreneurial income; net retained earnings abroad.', 'fact', 1],
  ['**Domestic income**', 'NDP at factor cost.', 'definition', 1],
  ['**National income**', 'NNP at factor cost.', 'definition', 2],
  ['Our embassy abroad: domestic territory?', '**Yes**. A foreign embassy here is not.', 'exam-tip', 1],
  ['**Normal resident**', 'Ordinarily lives in the country; centre of economic interest there.', 'definition', 1],
  ['GNP < GDP when…', 'NFIA is **negative**.', 'concept', 1],
  ['Ambarpur (imagined): GDP mp 4,800 → ?', `National income ₹${inr(AMB_A.nnpfc)} crore.`, 'example', 1],
  ['**Per capita income**', 'National income ÷ population.', 'formula', 2],
  ['Can per capita income fall while national income rises?', 'Yes, if **population grows faster**.', 'concept', 2],
  ['**Private income**', 'Private-sector factor income + NFIA + transfers from government and abroad + interest on national debt.', 'definition', 3],
  ['Interest on national debt', 'A **transfer**: in private income, not national income.', 'exam-tip', 3],
  ['Private → personal income', 'Subtract **corporate saving** and **corporation tax**.', 'formula', 3],
  ['Personal → personal disposable income', 'Subtract **direct personal taxes** and **fees and fines**.', 'formula', 3],
  ['**Net national disposable income**', 'NNP at market price + net current transfers from abroad.', 'formula', 3],
  ['Gross NDI', 'Net NDI + depreciation.', 'formula', 3],
  ['Lohitpur (imagined): private 9,000 → PDI ?', `₹${inr(LOH_PDI)} crore after ₹${LOH.corpSave + LOH.corpTax} crore company items and ₹${LOH.dirTax + LOH.misc} crore personal items.`, 'example', 3],
  ['**Nominal GDP**', 'Output at **current** prices.', 'definition', 4],
  ['**Real GDP**', 'Output at **base-year** prices.', 'definition', 4],
  ['**GDP deflator**', 'Nominal GDP ÷ real GDP × 100.', 'formula', 4],
  ['Real GDP from a deflator', 'Nominal GDP × 100 ÷ deflator.', 'formula', 4],
  ['Three limits of GDP as a welfare index', 'Distribution; non-monetary exchanges; externalities.', 'fact', 5],
  ['**Negative externality** and GDP', 'Harm not deducted: GDP **overstates** welfare.', 'concept', 5],
  ['**Non-monetary exchanges** and GDP', 'Unpaid work left out: GDP **understates** welfare.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — National Income Aggregates',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_nit_meaning', 'm_cha_pc', 'm_pi_from_private', 'm_welfare_dist', 'ar_nominal_mislead'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_dom_nat', { attempt: 1, keys: ['s_pc_ni', 's_real_nom'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each, showing working. Question 9 has an internal choice.', items: ['s3_amb_four', { attempt: 1, keys: ['s3_loh_chain', 's3_distribution'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with working where needed.', items: ['l_ket_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — National Income Aggregates',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_dep_meaning', 'm_nfia_meaning', 'm_gdp_gnp', 'm_amb_nnpfc', 'm_dev_gdpmp', 'm_subsidy_fc', 'm_sap_fall', 'm_gndi', 'm_shi_def', 'm_externality', 'ar_nfia_negative', 'ar_corp_save'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_mp_fc', 's_private_personal', { attempt: 1, keys: ['s_ndi_two', 's_def_meaning'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each, showing working. Question 19 has an internal choice.', items: ['s3_dev_back', 's3_sap_two', 's3_ket_table', { attempt: 1, keys: ['s3_three_concepts', 's3_nonmon_ext'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_amb_all', { attempt: 1, keys: ['l_loh_full', 'l_welfare'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch19 only (aggregates and adjusting items; national and per capita income; private, personal, personal disposable and national disposable income; real and nominal GDP; GDP and welfare); the measurement methods of ch20 are not taught',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every economy, person and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch01',
    data: `figures computed in questions.mjs and asserted: Ambarpur GDP mp ${AMB.gdpmp} → national income ${AMB_A.nnpfc}; Devgiri national income ${DEV.nnpfc} → GDP mp ${DEV_GDPMP}; Phalguni NDP fc ${PHA_NDPFC}; Tirthapur NFIA ${TIR_NFIA}; Chandranagar per capita ${CHA_PC}; Saptagiri ${SAP_PC1} → ${SAP_PC2}; Lohitpur ${LOH_PVTDOM} → ${LOH_PVT} → ${LOH_PI} → ${LOH_PDI}; Mandakini NDI ${MAN_NNDI}/${MAN_GNDI}; Ketakipur nominal ${KET_NOM2}, real ${KET_REAL2}, deflator ${KET_DEF2}`,
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
