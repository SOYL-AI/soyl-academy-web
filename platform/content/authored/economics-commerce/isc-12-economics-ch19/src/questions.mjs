// ISC 12 Economics, ch19 National Income Aggregates — question bank. Every economy, person and figure is imagined by
// SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem, key
// or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Scope: GDP, GNP, NDP and NNP at market prices and factor cost (depreciation, net indirect taxes, NFIA); national
// income and per capita income; private income, personal income, personal disposable income and national disposable
// income (gross and net); real and nominal GDP with the GDP deflator; GDP as an index of welfare. The three methods of
// measuring national income are ch20 and are not taught here. Set-ups differ from SOYL CBSE 12 Economics ch01.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const inr = (n) => n.toLocaleString('en-IN');
const r2 = (v) => Math.round(v * 100) / 100;

// ---------------------------------------------------------------- imagined economies (₹ crore unless stated)
// (1) Ambarpur: all eight aggregates from GDP at market price.
export const AMB = { gdpmp: 4800, dep: 360, it: 470, sub: 50, nfia: -60 };
AMB.nit = AMB.it - AMB.sub;
export const AMB_A = {
  ndpmp: AMB.gdpmp - AMB.dep,
  gdpfc: AMB.gdpmp - AMB.nit,
  ndpfc: AMB.gdpmp - AMB.dep - AMB.nit,
  gnpmp: AMB.gdpmp + AMB.nfia,
  nnpmp: AMB.gdpmp + AMB.nfia - AMB.dep,
  gnpfc: AMB.gdpmp + AMB.nfia - AMB.nit,
  nnpfc: AMB.gdpmp + AMB.nfia - AMB.dep - AMB.nit,
};
assert(AMB.nit === 420 && AMB_A.ndpmp === 4440 && AMB_A.gdpfc === 4380 && AMB_A.ndpfc === 4020, 'ambarpur domestic');
assert(AMB_A.gnpmp === 4740 && AMB_A.nnpmp === 4380 && AMB_A.gnpfc === 4320 && AMB_A.nnpfc === 3960, 'ambarpur national');
// (2) Devgiri: work back from national income to GDP at market price.
export const DEV = { nnpfc: 2700, nfia: 40, dep: 210, it: 330, sub: 50 };
DEV.nit = DEV.it - DEV.sub;
export const DEV_NDPFC = DEV.nnpfc - DEV.nfia;
export const DEV_NDPMP = DEV_NDPFC + DEV.nit;
export const DEV_GDPMP = DEV_NDPMP + DEV.dep;
export const DEV_GNPMP = DEV_GDPMP + DEV.nfia;
assert(DEV.nit === 280 && DEV_NDPFC === 2660 && DEV_NDPMP === 2940 && DEV_GDPMP === 3150 && DEV_GNPMP === 3190, 'devgiri');
// (3) Phalguni Desh: subsidies larger than indirect taxes.
export const PHA = { ndpmp: 1800, it: 90, sub: 150 };
PHA.nit = PHA.it - PHA.sub;
export const PHA_NDPFC = PHA.ndpmp - PHA.nit;
assert(PHA.nit === -60 && PHA_NDPFC === 1860, 'phalguni');
// (4) Tirthapur: net factor income from abroad from its parts.
export const TIR = { wagesIn: 180, propIn: 80, wagesOut: 120, propOut: 190 };
export const TIR_IN = TIR.wagesIn + TIR.propIn;
export const TIR_OUT = TIR.wagesOut + TIR.propOut;
export const TIR_NFIA = TIR_IN - TIR_OUT;
assert(TIR_IN === 260 && TIR_OUT === 310 && TIR_NFIA === -50, 'tirthapur');
// (5) Chandranagar: per capita income (national income in ₹ crore, population in crore).
export const CHA = { ni: 63000, pop: 1.8 };
export const CHA_PC = Math.round((CHA.ni * 1e7) / (CHA.pop * 1e7));
assert(CHA_PC === 35000, 'chandranagar per capita');
// (6) Saptagiri: national income rises but per capita income falls.
export const SAP = { ni1: 50000, pop1: 2, ni2: 54000, pop2: 2.25 };
export const SAP_PC1 = SAP.ni1 / SAP.pop1;
export const SAP_PC2 = SAP.ni2 / SAP.pop2;
export const SAP_NI_GROWTH = r2(((SAP.ni2 - SAP.ni1) / SAP.ni1) * 100);
assert(SAP_PC1 === 25000 && SAP_PC2 === 24000 && SAP_NI_GROWTH === 8, 'saptagiri');
export const DIS = { ni: 84000, pop: 2 };
export const DIS_PC = DIS.ni / DIS.pop;
assert(DIS_PC === 42000, 'hill state per capita');
// (7) Lohitpur: private income, personal income and personal disposable income.
export const LOH = { ndpfc: 9000, govProp: 400, ndeSave: 300, nfia: 150, govTr: 250, rowTr: 120, debtInt: 180, corpSave: 600, corpTax: 500, dirTax: 700, misc: 100 };
export const LOH_PVTDOM = LOH.ndpfc - LOH.govProp - LOH.ndeSave;
export const LOH_PVT = LOH_PVTDOM + LOH.nfia + LOH.govTr + LOH.rowTr + LOH.debtInt;
export const LOH_PI = LOH_PVT - LOH.corpSave - LOH.corpTax;
export const LOH_PDI = LOH_PI - LOH.dirTax - LOH.misc;
assert(LOH_PVTDOM === 8300 && LOH_PVT === 9000 && LOH_PI === 7900 && LOH_PDI === 7100, 'lohitpur');
// (8) Mandakini: national disposable income from NNP at market price.
export const MAN = { nnpmp: 5200, rowTr: 140, dep: 400 };
export const MAN_NNDI = MAN.nnpmp + MAN.rowTr;
export const MAN_GNDI = MAN_NNDI + MAN.dep;
assert(MAN_NNDI === 5340 && MAN_GNDI === 5740, 'mandakini');
// (9) Rewa Desh: gross and net national disposable income from GDP at market price.
export const REW = { gdpmp: 6000, nfia: -80, rowTr: 220, dep: 500 };
export const REW_GNDI = REW.gdpmp + REW.nfia + REW.rowTr;
export const REW_NNDI = REW_GNDI - REW.dep;
assert(REW_GNDI === 6140 && REW_NNDI === 5640, 'rewa');
// (10) Ketakipur: nominal and real GDP of a two-good economy; year 1 is the base year.
export const KET = { y1: { rice: [100, 20], cloth: [50, 40] }, y2: { rice: [120, 25], cloth: [60, 50] } };
export const KET_NOM1 = KET.y1.rice[0] * KET.y1.rice[1] + KET.y1.cloth[0] * KET.y1.cloth[1];
export const KET_NOM2 = KET.y2.rice[0] * KET.y2.rice[1] + KET.y2.cloth[0] * KET.y2.cloth[1];
export const KET_REAL2 = KET.y2.rice[0] * KET.y1.rice[1] + KET.y2.cloth[0] * KET.y1.cloth[1];
export const KET_DEF2 = r2((KET_NOM2 / KET_REAL2) * 100);
export const KET_REALG = r2(((KET_REAL2 - KET_NOM1) / KET_NOM1) * 100);
export const KET_NOMG = r2(((KET_NOM2 - KET_NOM1) / KET_NOM1) * 100);
assert(KET_NOM1 === 4000 && KET_NOM2 === 6000 && KET_REAL2 === 4800 && KET_DEF2 === 125 && KET_REALG === 20 && KET_NOMG === 50, 'ketakipur');
// (11) Shivalik Pradesh: deflator from nominal and real GDP; real GDP from a deflator.
export const SHI = { nom: 9900, real: 9000 };
export const SHI_DEF = r2((SHI.nom / SHI.real) * 100);
export const BHA = { nom: 7560, def: 108 };
export const BHA_REAL = r2((BHA.nom * 100) / BHA.def);
assert(SHI_DEF === 110 && BHA_REAL === 7000, 'deflators');
// (12) Kesari Ghat: two years, nominal GDP up, prices up more.
export const KES = { nom1: 2000, def1: 100, nom2: 2310, def2: 110 };
export const KES_REAL2 = r2((KES.nom2 * 100) / KES.def2);
export const KES_REALG = r2(((KES_REAL2 - KES.nom1) / KES.nom1) * 100);
assert(KES_REAL2 === 2100 && KES_REALG === 5, 'kesari ghat');

// ================================================================ t01 Aggregates
Q('m_dep_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'An accountant in an imagined Ambarpur ministry explains the item "consumption of fixed capital" in the national accounts. It means',
  opts: [
    'the fall in the value of fixed assets through normal wear and tear and expected obsolescence in a year',
    'the total value of new machines bought by firms in a year',
    'the value of raw materials used up in production',
    'the loss of assets in an unexpected flood or fire',
  ],
  sol: 'Consumption of fixed capital (depreciation) is the expected loss in value of fixed assets from normal use and obsolescence. New machines are gross investment; raw materials are intermediate consumption; unexpected losses are capital losses, not depreciation.',
}));
Q('m_nit_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'In imagined Ambarpur, the government collects indirect taxes on goods and also pays subsidies to producers. Net indirect taxes are',
  opts: ['indirect taxes minus subsidies', 'indirect taxes plus subsidies', 'direct taxes minus subsidies', 'indirect taxes minus direct taxes'],
  sol: 'Net indirect taxes = indirect taxes − subsidies. Indirect taxes raise market prices above factor cost, while subsidies lower them, so the net figure is what separates market price from factor cost.',
}));
Q('m_nfia_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A teacher in imagined Tirthapur asks her class to define net factor income from abroad. Which answer is correct?',
  opts: [
    'Factor income earned by normal residents from abroad minus factor income earned by non-residents in the domestic territory',
    'Exports of goods minus imports of goods',
    'Gifts received from abroad minus gifts sent abroad',
    'Factor income earned within the domestic territory minus depreciation',
  ],
  sol: 'Net factor income from abroad is factor income received from the rest of the world by normal residents minus factor income paid to non-residents. Net exports and net gifts are not factor incomes; the last option mixes up domestic income with depreciation.',
}));
Q('m_gdp_gnp', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'For imagined Ambarpur, which relationship links gross national product to gross domestic product at market price?',
  opts: [
    'GNP at market price = GDP at market price + net factor income from abroad',
    'GNP at market price = GDP at market price − depreciation',
    'GNP at market price = GDP at market price − net indirect taxes',
    'GNP at market price = GDP at market price + net indirect taxes',
  ],
  sol: 'Moving from domestic to national adds net factor income from abroad. Subtracting depreciation turns gross into net, and subtracting net indirect taxes turns market price into factor cost.',
}));
Q('m_amb_nnpfc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Imagined Ambarpur reports (₹ crore): GDP at market price ${inr(AMB.gdpmp)}, depreciation ${AMB.dep}, indirect taxes ${AMB.it}, subsidies ${AMB.sub}, net factor income from abroad (−) ${-AMB.nfia}. What is its national income?`,
  opts: [`₹${inr(AMB_A.nnpfc)} crore`, `₹${inr(AMB_A.ndpfc)} crore`, `₹${inr(AMB_A.nnpmp)} crore`, `₹${inr(AMB_A.nnpfc - 2 * AMB.sub)} crore`],
  sol: `National income = NNP at factor cost = ${AMB.gdpmp} − ${AMB.dep} − (${AMB.it} − ${AMB.sub}) − ${-AMB.nfia} = ${AMB_A.nnpfc}. ${inr(AMB_A.ndpfc)} is the domestic figure (NFIA left out); ${inr(AMB_A.nnpmp)} keeps net indirect taxes; the last figure treats subsidies as a tax.`,
}));
Q('m_dev_gdpmp', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Imagined Devgiri has national income ₹${inr(DEV.nnpfc)} crore, net factor income from abroad ₹${DEV.nfia} crore, depreciation ₹${DEV.dep} crore and net indirect taxes ₹${DEV.nit} crore. Its GDP at market price is`,
  opts: [`₹${inr(DEV_GDPMP)} crore`, `₹${inr(DEV_GDPMP + 2 * DEV.nfia)} crore`, `₹${inr(DEV_GDPMP - DEV.dep)} crore`, `₹${inr(DEV.nnpfc + DEV.dep)} crore`],
  sol: `Work back: NDP at factor cost = ${DEV.nnpfc} − ${DEV.nfia} = ${DEV_NDPFC}; add net indirect taxes: ${DEV_NDPFC} + ${DEV.nit} = ${DEV_NDPMP}; add depreciation: ${DEV_NDPMP} + ${DEV.dep} = ${DEV_GDPMP}. Adding the NFIA instead of subtracting it gives ${DEV_GDPMP + 2 * DEV.nfia}.`,
}));
Q('m_subsidy_fc', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `In imagined Phalguni Desh, subsidies (₹${PHA.sub} crore) are larger than indirect taxes (₹${PHA.it} crore). Which statement about its domestic product follows?`,
  opts: [
    'NDP at factor cost is greater than NDP at market price',
    'NDP at factor cost is smaller than NDP at market price',
    'NDP at factor cost equals NDP at market price',
    'NDP at factor cost cannot be found without depreciation',
  ],
  sol: `Net indirect taxes = ${PHA.it} − ${PHA.sub} = ${PHA.nit}, a negative number. Factor cost = market price − net indirect taxes = ${PHA.ndpmp} + ${-PHA.nit} = ${PHA_NDPFC}, so factor cost exceeds market price. Depreciation is already excluded from both net figures.`,
}));
Q('m_domestic_territory', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which income is included in the domestic product of an imagined country Ambarpur?',
  opts: [
    'Salaries paid to Ambarpur staff working in Ambarpur\'s embassy in a foreign capital',
    'Rent earned by an Ambarpur family from a flat it owns abroad',
    'Profit earned by an Ambarpur bank from its branch in another country',
    'Salaries of a foreign country\'s diplomats working in its embassy in Ambarpur',
  ],
  sol: 'A country\'s embassies abroad are part of its domestic territory, so salaries earned there count in its domestic product. Rent and branch profits from abroad are factor income from abroad (national, not domestic); a foreign embassy inside Ambarpur is foreign territory.',
}));
Q('m_normal_resident', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which person is a normal resident of the imagined country Tirthapur?',
  opts: [
    'A Tirthapur engineer who has worked on a two-year project abroad and keeps her home and family in Tirthapur',
    'A foreign tourist spending three weeks in Tirthapur',
    'A foreign ship\'s crew docked at a Tirthapur port for a month',
    'A foreign diplomat posted in Tirthapur for three years',
  ],
  sol: 'A normal resident ordinarily lives in a country and has her centre of economic interest there. The engineer keeps her home and interests in Tirthapur. Tourists, foreign crews and foreign diplomats remain residents of their own countries.',
}));
Q('ar_nfia_negative', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'The gross national product of imagined Tirthapur is less than its gross domestic product.',
  r: 'Factor income paid to non-residents by Tirthapur is greater than the factor income its normal residents receive from abroad.',
  sol: `Both are true, and R explains A. Received ${TIR_IN} and paid ${TIR_OUT} give net factor income from abroad of ${TIR_NFIA}; adding a negative number to GDP makes GNP smaller.`,
}));
Q('ar_dep_net', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'Net domestic product is always smaller than gross domestic product.',
  r: 'Net domestic product includes the value of machines that wear out during the year.',
  sol: 'A is true: depreciation is a positive amount, so subtracting it makes the net figure smaller. R is false: the net figure is obtained by removing the value of fixed capital used up, not by including it.',
}));
Q('tf_fc_mp', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In every economy, an aggregate at factor cost is smaller than the same aggregate at market price.',
  sol: `False. Factor cost is smaller only when indirect taxes exceed subsidies. In imagined Phalguni Desh, subsidies are larger, so NDP at factor cost (${PHA_NDPFC}) exceeds NDP at market price (${PHA.ndpmp}).`,
}));
Q('fb_nnpfc', fb({
  t: [1, 2], d: 1, c: 'recall',
  stem: 'National income is the net national product at ___ cost.',
  acc: [['factor']],
  sol: 'National income is NNP at factor cost: the factor incomes earned by normal residents in a year.',
}));
Q('n_tir_nfia', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: TIR_NFIA, unit: '₹ crore',
  stem: `Normal residents of imagined Tirthapur earn wages of ₹${TIR.wagesIn} crore and interest and dividends of ₹${TIR.propIn} crore from abroad. Non-residents earn wages of ₹${TIR.wagesOut} crore and profits of ₹${TIR.propOut} crore in Tirthapur. Find net factor income from abroad (in ₹ crore; give a negative number if it is negative).`,
  sol: `Received = ${TIR.wagesIn} + ${TIR.propIn} = ${TIR_IN}. Paid = ${TIR.wagesOut} + ${TIR.propOut} = ${TIR_OUT}. NFIA = ${TIR_IN} − ${TIR_OUT} = ${TIR_NFIA}, that is ₹${TIR_NFIA} crore.`,
}));
Q('n_amb_gnpfc', num({
  t: 1, d: 3, c: 'application', marks: 1, value: AMB_A.gnpfc, unit: '₹ crore',
  stem: `For imagined Ambarpur (₹ crore): GDP at market price ${inr(AMB.gdpmp)}, indirect taxes ${AMB.it}, subsidies ${AMB.sub}, net factor income from abroad (−) ${-AMB.nfia}. Find GNP at factor cost (in ₹ crore).`,
  sol: `GNP at factor cost = GDP at market price − net indirect taxes + NFIA = ${AMB.gdpmp} − (${AMB.it} − ${AMB.sub}) − ${-AMB.nfia} = ${AMB_A.gnpfc}, that is ₹${inr(AMB_A.gnpfc)} crore.`,
}));
Q('mt_conversions', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each conversion between aggregates in the imagined Ambarpur accounts with the item that makes it.',
  pairs: [
    ['Gross to net', 'Subtract depreciation'],
    ['Market price to factor cost', 'Subtract net indirect taxes'],
    ['Domestic to national', 'Add net factor income from abroad'],
    ['Factor cost to market price', 'Add net indirect taxes'],
  ],
  sol: 'Each word in an aggregate\'s name has one adjusting item: gross or net (depreciation), market price or factor cost (net indirect taxes), domestic or national (net factor income from abroad).',
}));
Q('ord_ladder', ord({
  t: 1, d: 2, c: 'application', marks: 1,
  stem: 'Starting from GDP at market price, arrange the steps an imagined Ambarpur statistician follows to reach national income.',
  items: [
    'Start with GDP at market price',
    'Subtract depreciation to get NDP at market price',
    'Subtract net indirect taxes to get NDP at factor cost',
    'Add net factor income from abroad to get NNP at factor cost',
  ],
  sol: 'Gross to net, market price to factor cost, then domestic to national. Other orders give the same final figure, but this order passes through NDP at factor cost, the domestic income on which national income is built.',
}));
Q('s_dom_nat', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish domestic income from national income, mentioning the item that links them, with reference to an imagined trading country.',
  model: '**Domestic income** (NDP at factor cost) is the factor income earned **within the domestic territory**, by residents and non-residents alike. **National income** (NNP at factor cost) is the factor income earned by **normal residents**, at home or abroad. They differ by **net factor income from abroad**.',
  sol: 'Territory versus residents, linked by NFIA.',
  scheme: [['Domestic income: within the territory', 1], ['National income: by normal residents; linked by NFIA', 1]],
}));
Q('s_mp_fc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why GDP of an imagined country valued at market price differs from GDP at factor cost.',
  model: 'Market prices include **indirect taxes** such as GST, which raise prices above what factors are paid, and are reduced by **subsidies**, which lower them. So GDP at factor cost = GDP at market price **− (indirect taxes − subsidies)**, that is, minus **net indirect taxes**.',
  sol: 'Indirect taxes raise, subsidies lower market prices; the gap is net indirect taxes.',
  scheme: [['Role of indirect taxes and subsidies', 1], ['Relationship stated', 1]],
}));
Q('s_dep_gross', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the difference between gross and net aggregates, and why the net figure is a better measure of what an imagined economy can use.',
  model: 'A **gross** aggregate includes **depreciation**, the value of fixed capital used up during the year; a **net** aggregate **excludes** it. The net figure is better because that part of gross output only **replaces worn-out machines** and is not available for consumption or new investment.',
  sol: 'Depreciation included or excluded; net shows what is truly available.',
  scheme: [['Difference: depreciation', 1], ['Why net is better', 1]],
}));
Q('s_nfia_comp', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Name the components of net factor income from abroad and give an example of one from an imagined Indian state with many workers in the Gulf.',
  model: 'Net factor income from abroad includes (1) net **compensation of employees**, (2) net **property and entrepreneurial income** (rent, interest, dividends, profits) and (3) net **retained earnings** of resident companies abroad. Example: **wages sent home** by residents working temporarily in Gulf countries.',
  sol: 'Three components with one example.',
  scheme: [['Components', 1], ['Suitable example', 1]],
}));
Q('s3_amb_four', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For imagined Ambarpur (₹ crore): GDP at market price ${inr(AMB.gdpmp)}, depreciation ${AMB.dep}, indirect taxes ${AMB.it}, subsidies ${AMB.sub}, net factor income from abroad (−) ${-AMB.nfia}. Find NDP at market price, GDP at factor cost and NNP at market price.`,
  model: `**NDP at market price** = GDP at market price − depreciation = ${AMB.gdpmp} − ${AMB.dep} = **₹${inr(AMB_A.ndpmp)} crore**.\n**GDP at factor cost** = GDP at market price − net indirect taxes = ${AMB.gdpmp} − (${AMB.it} − ${AMB.sub}) = **₹${inr(AMB_A.gdpfc)} crore**.\n**NNP at market price** = GDP at market price − depreciation + NFIA = ${AMB.gdpmp} − ${AMB.dep} − ${-AMB.nfia} = **₹${inr(AMB_A.nnpmp)} crore**.`,
  sol: 'Apply one adjustment for each change of word in the name.',
  scheme: [['NDP at market price', 1], ['GDP at factor cost', 1], ['NNP at market price', 1]],
}));
Q('s3_dev_back', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Devgiri reports national income ₹${inr(DEV.nnpfc)} crore, net factor income from abroad ₹${DEV.nfia} crore, depreciation ₹${DEV.dep} crore, indirect taxes ₹${DEV.it} crore and subsidies ₹${DEV.sub} crore. Work back to its GDP at market price, showing each step.`,
  model: `Step 1: NDP at factor cost = NNP at factor cost − NFIA = ${DEV.nnpfc} − ${DEV.nfia} = **${inr(DEV_NDPFC)}**.\nStep 2: NDP at market price = NDP at factor cost + net indirect taxes = ${DEV_NDPFC} + (${DEV.it} − ${DEV.sub}) = **${inr(DEV_NDPMP)}**.\nStep 3: GDP at market price = NDP at market price + depreciation = ${DEV_NDPMP} + ${DEV.dep} = **₹${inr(DEV_GDPMP)} crore**. Each step reverses one adjustment.`,
  sol: 'Reverse the three adjustments one at a time.',
  scheme: [['NDP at factor cost', 1], ['NDP at market price', 1], ['GDP at market price', 1]],
}));
Q('s3_three_items', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain briefly the three items used to move between the eight national income aggregates of an imagined economy.',
  model: '1. **Depreciation** (consumption of fixed capital): subtracted to go from **gross to net**.\n2. **Net indirect taxes** (indirect taxes − subsidies): subtracted to go from **market price to factor cost**.\n3. **Net factor income from abroad** (factor income received from abroad − paid abroad): added to go from **domestic to national**.\nCombining them links any aggregate, such as GDP at market price, to national income.',
  sol: 'Depreciation, net indirect taxes, NFIA, each with its conversion.',
  scheme: [['Depreciation', 1], ['Net indirect taxes', 1], ['Net factor income from abroad', 1]],
}));
Q('l_amb_all', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Ambarpur (₹ crore): GDP at market price ${inr(AMB.gdpmp)}, depreciation ${AMB.dep}, indirect taxes ${AMB.it}, subsidies ${AMB.sub}, factor income received from abroad 140, factor income paid abroad 200. [2 + 3]\n\n(a) Find net indirect taxes and net factor income from abroad. [2]\n(b) Find NDP at factor cost, GNP at market price and national income. [3]`,
  model: `(a) **Net indirect taxes** = indirect taxes − subsidies = ${AMB.it} − ${AMB.sub} = **₹${AMB.nit} crore**. **Net factor income from abroad** = received − paid = 140 − 200 = **₹${AMB.nfia} crore**, negative because non-residents earn more in Ambarpur than its residents earn abroad.\n(b) **NDP at factor cost** = GDP at market price − depreciation − net indirect taxes = ${AMB.gdpmp} − ${AMB.dep} − ${AMB.nit} = **₹${inr(AMB_A.ndpfc)} crore**, the income earned inside the territory. **GNP at market price** = GDP at market price + NFIA = ${AMB.gdpmp} + (${AMB.nfia}) = **₹${inr(AMB_A.gnpmp)} crore**. **National income** = NDP at factor cost + NFIA = ${AMB_A.ndpfc} + (${AMB.nfia}) = **₹${inr(AMB_A.nnpfc)} crore**, the factor income earned by normal residents.`,
  sol: 'Net items first, then one adjustment per change of word.',
  scheme: [['Net indirect taxes', 1], ['NFIA with sign', 1], ['NDP at factor cost', 1], ['GNP at market price', 1], ['National income', 1]],
}));
assert(140 - 200 === AMB.nfia, 'ambarpur nfia parts');
Q('l_dom_concepts', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Answer both parts about the imagined country Ambarpur. [2 + 3]\n\n(a) Explain the terms domestic territory and normal resident. [2]\n(b) State, with a reason, whether each income is part of Ambarpur\'s domestic income, its national income, or both: (i) wages of Ambarpur nurses in a foreign hospital; (ii) profit of a foreign bank\'s branch in Ambarpur; (iii) salary of an Ambarpur clerk in Ambarpur\'s embassy abroad. [3]',
  model: '(a) **Domestic territory** is the economic territory of a country: its land, territorial waters and airspace, plus its **embassies, consulates and military bases abroad** and its ships and aircraft operating abroad. A **normal resident** is a person or institution that **ordinarily lives** in the country and whose **centre of economic interest** lies there.\n(b) (i) **National only**: the nurses are normal residents, but they earn **outside** the domestic territory. (ii) **Domestic only**: the profit arises **inside** Ambarpur but goes to a **non-resident** bank. (iii) **Both**: the embassy is part of Ambarpur\'s domestic territory and the clerk is a normal resident, so the salary counts in domestic and in national income.',
  sol: 'Define both terms; classify each income by where it is earned and who earns it.',
  scheme: [['Domestic territory', 1], ['Normal resident', 1], ['(i) National only', 1], ['(ii) Domestic only', 1], ['(iii) Both', 1]],
}));

// ================================================================ t02 National income and per capita income
Q('m_pc_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A newspaper in an imagined state reports its per capita income. Per capita income means',
  opts: ['national income divided by the population', 'national income divided by the number of workers', 'GDP divided by the number of households', 'personal income of the richest tenth of people'],
  sol: 'Per capita income is the average income per person: national income divided by total population. Dividing by workers or households gives other averages.',
}));
Q('m_cha_pc', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Imagined Chandranagar has national income of ₹${inr(CHA.ni)} crore and a population of ${CHA.pop} crore. Its per capita income is`,
  opts: [`₹${inr(CHA_PC)}`, `₹${inr(CHA_PC * 10)}`, `₹${inr(CHA_PC / 10)}`, `₹${inr(CHA.ni)}`],
  sol: `Per capita income = ₹${inr(CHA.ni)} crore ÷ ${CHA.pop} crore persons = ₹${inr(CHA_PC)}. The crores cancel, so the answer is in rupees per person.`,
}));
Q('m_sap_fall', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `In imagined Saptagiri, national income rises from ₹${inr(SAP.ni1)} crore to ₹${inr(SAP.ni2)} crore while population rises from ${SAP.pop1} crore to ${SAP.pop2} crore. What happens to per capita income?`,
  opts: [`It falls from ₹${inr(SAP_PC1)} to ₹${inr(SAP_PC2)}`, `It rises from ₹${inr(SAP_PC1)} to ₹${inr(SAP_PC2 + 2000)}`, 'It stays the same', `It rises by ${SAP_NI_GROWTH} per cent`],
  sol: `Per capita income falls: ${SAP.ni1} ÷ ${SAP.pop1} = ${SAP_PC1}, but ${SAP.ni2} ÷ ${SAP.pop2} = ${SAP_PC2}. Population grew faster than national income (${SAP_NI_GROWTH} per cent).`,
}));
Q('ar_pc_welfare', ar({
  t: [2, 5], d: 3, c: 'analysis', key: 'c',
  a: 'Per capita income is a better guide than national income for comparing the average living standard of two countries.',
  r: 'National income does not take account of depreciation of fixed assets.',
  sol: 'A is true: dividing by population allows for differences in the size of countries. R is false: national income is a net figure, so depreciation has already been subtracted from it.',
}));
Q('n_cha_pc', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: DIS_PC, unit: '₹',
  stem: `An imagined hill state has national income of ₹${inr(DIS.ni)} crore and a population of ${DIS.pop} crore. Find its per capita income (in ₹).`,
  sol: `Per capita income = ₹${inr(DIS.ni)} crore ÷ ${DIS.pop} crore persons = ₹${inr(DIS_PC)} per person.`,
}));
Q('s_pc_ni', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why can per capita income of an imagined country fall in a year when its national income rises?',
  model: `Per capita income = national income ÷ population. If **population grows faster** than national income, the average falls. In imagined Saptagiri, national income rose **${SAP_NI_GROWTH} per cent** but population rose more, so per capita income fell from **₹${inr(SAP_PC1)} to ₹${inr(SAP_PC2)}**.`,
  sol: 'Population growth faster than income growth.',
  scheme: [['Formula and reason', 1], ['Illustration', 1]],
}));
Q('s3_sap_two', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Saptagiri's national income was ₹${inr(SAP.ni1)} crore with ${SAP.pop1} crore people last year, and is ₹${inr(SAP.ni2)} crore with ${SAP.pop2} crore people this year. Calculate per capita income in both years and comment.`,
  model: `Last year: ${inr(SAP.ni1)} ÷ ${SAP.pop1} = **₹${inr(SAP_PC1)}**. This year: ${inr(SAP.ni2)} ÷ ${SAP.pop2} = **₹${inr(SAP_PC2)}**. Although national income rose by **${SAP_NI_GROWTH} per cent**, population rose by 12.5 per cent, so the **average person is poorer**. Growth in total income is not enough; it must outpace population growth to raise living standards.`,
  sol: 'Two divisions and a comment comparing growth rates.',
  scheme: [['Last year', 1], ['This year', 1], ['Comment', 1]],
}));
assert(r2(((SAP.pop2 - SAP.pop1) / SAP.pop1) * 100) === 12.5, 'saptagiri pop growth');

// ================================================================ t03 Private, personal and disposable income
Q('m_private_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement describes private income in the accounts of an imagined economy?',
  opts: [
    'Factor income and current transfers from all sources received by the private sector',
    'Factor income earned only by government departments',
    'Income left with households after paying all taxes',
    'The value of goods produced by private firms',
  ],
  sol: 'Private income covers the factor income accruing to the private sector from home and abroad plus the current transfers it receives (from government and the rest of the world, including interest on national debt). Income after taxes is personal disposable income.',
}));
Q('m_pi_from_private', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'To move from private income to personal income for imagined Lohitpur, a statistician must subtract',
  opts: ['corporate saving and corporation tax', 'direct personal taxes and fees', 'depreciation and net indirect taxes', 'current transfers from abroad'],
  sol: 'Personal income = private income − corporate saving (undistributed profits) − corporation tax, because these belong to companies and never reach persons. Personal taxes are subtracted later to reach personal disposable income.',
}));
Q('m_debt_interest', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Interest paid by the imagined government of Lohitpur on loans taken to meet a war expense is treated as',
  opts: [
    'a transfer included in private income but not in national income',
    'a factor income included in national income',
    'part of corporation tax',
    'a capital receipt of the private sector',
  ],
  sol: 'Interest on national debt is usually treated as a transfer payment, since the loans paid for consumption and created no productive asset. It is excluded from national income but included in private income.',
}));
Q('m_lor_pdi', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Imagined Lohitpur has personal income ₹${inr(LOH_PI)} crore, direct personal taxes ₹${LOH.dirTax} crore and fees and fines paid to government ₹${LOH.misc} crore. Its personal disposable income is`,
  opts: [`₹${inr(LOH_PDI)} crore`, `₹${inr(LOH_PI - LOH.dirTax)} crore`, `₹${inr(LOH_PI + LOH.misc)} crore`, `₹${inr(LOH_PI - LOH.dirTax - LOH.misc - LOH.corpTax)} crore`],
  sol: `PDI = ${LOH_PI} − ${LOH.dirTax} − ${LOH.misc} = ${LOH_PDI}. Leaving out fees and fines gives ${LOH_PI - LOH.dirTax}; corporation tax was already removed when personal income was found.`,
}));
Q('m_ndi_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Net national disposable income of an imagined country is',
  opts: [
    'NNP at market price plus net current transfers from the rest of the world',
    'NNP at factor cost minus direct taxes',
    'GDP at market price plus depreciation',
    'personal income plus corporate saving',
  ],
  sol: 'Net national disposable income = NNP at market price + net current transfers from abroad. It is the income the whole nation can use for consumption and saving.',
}));
Q('m_gndi', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Imagined Mandakini has NNP at market price ₹${inr(MAN.nnpmp)} crore, net current transfers from abroad ₹${MAN.rowTr} crore and depreciation ₹${MAN.dep} crore. Its gross national disposable income is`,
  opts: [`₹${inr(MAN_GNDI)} crore`, `₹${inr(MAN_NNDI)} crore`, `₹${inr(MAN.nnpmp + MAN.dep)} crore`, `₹${inr(MAN_GNDI - 2 * MAN.rowTr)} crore`],
  sol: `Net national disposable income = ${MAN.nnpmp} + ${MAN.rowTr} = ${MAN_NNDI}; gross = ${MAN_NNDI} + ${MAN.dep} = ${MAN_GNDI}. ${inr(MAN_NNDI)} is the net figure; the others leave out or subtract the transfers.`,
}));
Q('ar_corp_save', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Personal income of an economy is smaller than its private income.',
  r: 'Part of private income is kept by companies as undistributed profits or paid as corporation tax, and never reaches persons.',
  sol: `Both are true, and R explains A. In imagined Lohitpur, ${LOH_PVT} − ${LOH.corpSave} − ${LOH.corpTax} = ${LOH_PI}.`,
}));
Q('ar_ndi_transfers', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Gifts sent home by residents working abroad are excluded from national disposable income.',
  r: 'National disposable income counts only factor incomes earned within the domestic territory.',
  sol: 'Both are false. Such remittances are current transfers from abroad and are included in national disposable income, which adds net current transfers to NNP at market price; it is not limited to domestic factor income.',
}));
Q('tf_pdi_spend', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Personal disposable income is the income that households of an imagined country can divide freely between consumption and saving.',
  sol: 'True. After companies keep their share and households pay direct taxes, fees and fines, the remainder is personal disposable income, which households spend or save as they choose.',
}));
Q('fb_pi', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Personal income minus direct personal taxes minus miscellaneous receipts of government gives personal ___ income.',
  acc: [['disposable']],
  sol: 'The result is personal disposable income.',
}));
Q('n_loh_pvt', num({
  t: 3, d: 3, c: 'application', marks: 2, value: LOH_PVT, unit: '₹ crore',
  stem: `Imagined Lohitpur (₹ crore): NDP at factor cost ${inr(LOH.ndpfc)}; income from property and entrepreneurship of government departments ${LOH.govProp}; saving of non-departmental public enterprises ${LOH.ndeSave}; net factor income from abroad ${LOH.nfia}; current transfers from government ${LOH.govTr}; net current transfers from abroad ${LOH.rowTr}; interest on national debt ${LOH.debtInt}. Find private income (in ₹ crore).`,
  sol: `Income from domestic product accruing to the private sector = ${LOH.ndpfc} − ${LOH.govProp} − ${LOH.ndeSave} = ${LOH_PVTDOM}. Private income = ${LOH_PVTDOM} + ${LOH.nfia} + ${LOH.govTr} + ${LOH.rowTr} + ${LOH.debtInt} = ${LOH_PVT}, that is ₹${inr(LOH_PVT)} crore.`,
  scheme: [['Income accruing to private sector', 1], ['Private income', 1]],
}));
Q('n_rew_nndi', num({
  t: 3, d: 3, c: 'understanding', marks: 1, value: REW_NNDI, unit: '₹ crore',
  stem: `Imagined Rewa Desh (₹ crore): GDP at market price ${inr(REW.gdpmp)}, net factor income from abroad (−) ${-REW.nfia}, net current transfers from abroad ${REW.rowTr}, depreciation ${REW.dep}. Find net national disposable income (in ₹ crore).`,
  sol: `GNDI = ${REW.gdpmp} − ${-REW.nfia} + ${REW.rowTr} = ${REW_GNDI}. NNDI = ${REW_GNDI} − ${REW.dep} = ${REW_NNDI}, that is ₹${inr(REW_NNDI)} crore.`,
}));
Q('s_private_personal', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish private income from personal income for an imagined economy with many large companies.',
  model: '**Private income** is all factor income and current transfers received by the **private sector**, including companies. **Personal income** is the part that actually reaches **persons and households**: private income minus **corporate saving** and **corporation tax**, which stay with or go from companies.',
  sol: 'Private sector versus persons; corporate saving and tax.',
  scheme: [['Private income', 1], ['Personal income with the deductions', 1]],
}));
Q('s_ndi_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish gross national disposable income from net national disposable income for an imagined country.',
  model: '**Net national disposable income** = NNP at market price + net current transfers from abroad. **Gross national disposable income** = net national disposable income **+ depreciation** (or GNP at market price + net current transfers). The gross figure includes the part needed to replace worn-out capital.',
  sol: 'Net versus gross, differing by depreciation.',
  scheme: [['Net NDI', 1], ['Gross NDI and the difference', 1]],
}));
Q('s3_loh_chain', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Lohitpur has private income ₹${inr(LOH_PVT)} crore, corporate saving ₹${LOH.corpSave} crore, corporation tax ₹${LOH.corpTax} crore, direct personal taxes ₹${LOH.dirTax} crore and fees and fines ₹${LOH.misc} crore. Find personal income and personal disposable income, stating why each item is subtracted.`,
  model: `**Personal income** = ${LOH_PVT} − ${LOH.corpSave} − ${LOH.corpTax} = **₹${inr(LOH_PI)} crore**: undistributed profits and corporation tax belong to companies and never reach persons. **Personal disposable income** = ${LOH_PI} − ${LOH.dirTax} − ${LOH.misc} = **₹${inr(LOH_PDI)} crore**: personal taxes, fees and fines must be paid to the government, so they are not free for spending or saving.`,
  sol: 'Two subtractions, each with a reason.',
  scheme: [['Personal income', 1], ['Personal disposable income', 1], ['Reasons', 1]],
}));
Q('s3_three_concepts', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how private income, personal income and personal disposable income are related in the accounts of an imagined economy.',
  model: '1. **Private income** is the widest: factor income from the domestic product accruing to the private sector, plus NFIA and current transfers (including interest on national debt).\n2. **Personal income** = private income − corporate saving − corporation tax, the part reaching persons.\n3. **Personal disposable income** = personal income − direct personal taxes − fees and fines, what households can spend or save.',
  sol: 'Three concepts, each narrower than the last.',
  scheme: [['Private income', 1], ['Personal income', 1], ['Personal disposable income', 1]],
}));
Q('l_loh_full', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Lohitpur (₹ crore): NDP at factor cost ${inr(LOH.ndpfc)}; income from property and entrepreneurship of government departments ${LOH.govProp}; saving of non-departmental public enterprises ${LOH.ndeSave}; net factor income from abroad ${LOH.nfia}; current transfers from government ${LOH.govTr}; net current transfers from abroad ${LOH.rowTr}; interest on national debt ${LOH.debtInt}; corporate saving ${LOH.corpSave}; corporation tax ${LOH.corpTax}. [3 + 2]\n\n(a) Find private income. [3]\n(b) Find personal income and explain why it is smaller than private income. [2]`,
  model: `(a) First find the **income from domestic product accruing to the private sector** = NDP at factor cost − government departments' property and entrepreneurial income − saving of non-departmental enterprises = ${LOH.ndpfc} − ${LOH.govProp} − ${LOH.ndeSave} = **${inr(LOH_PVTDOM)}**. Then **private income** = ${LOH_PVTDOM} + NFIA ${LOH.nfia} + transfers from government ${LOH.govTr} + net transfers from abroad ${LOH.rowTr} + interest on national debt ${LOH.debtInt} = **₹${inr(LOH_PVT)} crore**.\n(b) **Personal income** = ${LOH_PVT} − ${LOH.corpSave} − ${LOH.corpTax} = **₹${inr(LOH_PI)} crore**. It is smaller because companies **keep undistributed profits** and **pay corporation tax**; both are part of private income but never reach households.`,
  sol: 'Private-sector domestic income, then additions; then corporate deductions.',
  scheme: [['Income accruing to private sector', 1], ['Additions identified', 1], ['Private income', 1], ['Personal income', 1], ['Reason', 1]],
}));

// ================================================================ t04 Real and nominal GDP
Q('m_deflator_formula', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which formula gives the GDP deflator used by an imagined central statistics office?',
  opts: ['(Nominal GDP ÷ real GDP) × 100', '(Real GDP ÷ nominal GDP) × 100', 'Nominal GDP − real GDP', '(Real GDP ÷ population) × 100'],
  sol: 'The GDP deflator = nominal GDP ÷ real GDP × 100. It measures how much the general price level of output has changed from the base year.',
}));
Q('m_shi_def', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Imagined Shivalik Pradesh has nominal GDP of ₹${inr(SHI.nom)} crore and real GDP of ₹${inr(SHI.real)} crore. Its GDP deflator is`,
  opts: [String(SHI_DEF), String(r2((SHI.real / SHI.nom) * 100)), String(SHI.nom - SHI.real), '100'],
  sol: `Deflator = ${SHI.nom} ÷ ${SHI.real} × 100 = ${SHI_DEF}: prices are 10 per cent above the base year. Inverting the ratio gives about 90.91.`,
}));
Q('m_ket_growth', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `In imagined Ketakipur, nominal GDP rises from ₹${inr(KET_NOM1)} crore to ₹${inr(KET_NOM2)} crore while real GDP (base-year prices) rises to ₹${inr(KET_REAL2)} crore. How much of the rise reflects more goods produced?`,
  opts: [`A ${KET_REALG} per cent rise in output; the rest is higher prices`, `A ${KET_NOMG} per cent rise in output`, 'No rise in output at all', `A ${KET_DEF2} per cent rise in output`],
  sol: `Real GDP rose from ${KET_NOM1} to ${KET_REAL2}, which is ${KET_REALG} per cent: that is the growth in output. Nominal GDP rose ${KET_NOMG} per cent; the extra came from prices rising by a quarter.`,
}));
Q('ar_nominal_mislead', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A rise in nominal GDP does not necessarily mean that more goods and services have been produced.',
  r: 'Nominal GDP is valued at current prices, so it rises when prices rise even if output is unchanged.',
  sol: 'Both are true, and R explains A: nominal GDP mixes changes in quantity with changes in price, so only real GDP shows the change in output.',
}));
Q('n_bha_real', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: BHA_REAL, unit: '₹ crore',
  stem: `An imagined state has nominal GDP of ₹${inr(BHA.nom)} crore and a GDP deflator of ${BHA.def}. Find its real GDP (in ₹ crore).`,
  sol: `Real GDP = nominal GDP × 100 ÷ deflator = ${BHA.nom} × 100 ÷ ${BHA.def} = ${BHA_REAL}, that is ₹${inr(BHA_REAL)} crore.`,
}));
Q('s_real_nom', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish nominal GDP from real GDP for an imagined country with rising prices.',
  model: '**Nominal GDP** values the year\'s output at **current prices**, so it rises with both output and prices. **Real GDP** values the same output at **constant base-year prices**, so it changes **only when output changes**. With rising prices, nominal GDP exceeds real GDP.',
  sol: 'Current versus constant prices.',
  scheme: [['Nominal GDP', 1], ['Real GDP', 1]],
}));
Q('s_def_meaning', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `What does a GDP deflator of ${KES.def2} tell an analyst about the economy of imagined Kesari Ghat?`,
  model: `It shows that the **general price level** of goods and services produced is **${KES.def2 - 100} per cent higher** than in the base year. Nominal GDP must be divided by ${KES.def2 / 100} to remove this price effect and find **real GDP**.`,
  sol: 'Prices 10 per cent above the base year.',
  scheme: [['Meaning of the deflator value', 1], ['Use in finding real GDP', 1]],
}));
assert(KES.def2 / 100 === 1.1, 'kesari divisor');
Q('s3_ket_table', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Imagined Ketakipur produces rice and cloth. Base year: ${KET.y1.rice[0]} units of rice at ₹${KET.y1.rice[1]}, ${KET.y1.cloth[0]} units of cloth at ₹${KET.y1.cloth[1]}. Current year: ${KET.y2.rice[0]} units of rice at ₹${KET.y2.rice[1]}, ${KET.y2.cloth[0]} units of cloth at ₹${KET.y2.cloth[1]}. Find nominal and real GDP of the current year and the GDP deflator.`,
  model: `**Nominal GDP** (current prices) = ${KET.y2.rice[0]} × ${KET.y2.rice[1]} + ${KET.y2.cloth[0]} × ${KET.y2.cloth[1]} = **₹${inr(KET_NOM2)}**. **Real GDP** (base-year prices) = ${KET.y2.rice[0]} × ${KET.y1.rice[1]} + ${KET.y2.cloth[0]} × ${KET.y1.cloth[1]} = **₹${inr(KET_REAL2)}**. **GDP deflator** = ${KET_NOM2} ÷ ${KET_REAL2} × 100 = **${KET_DEF2}**, so prices have risen by a quarter since the base year.`,
  sol: 'Current quantities at current and at base prices, then the ratio.',
  scheme: [['Nominal GDP', 1], ['Real GDP', 1], ['Deflator', 1]],
}));
Q('s3_kes_growth', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Imagined Kesari Ghat's nominal GDP rose from ₹${inr(KES.nom1)} crore (base year, deflator ${KES.def1}) to ₹${inr(KES.nom2)} crore, with the deflator now ${KES.def2}. By what percentage did real GDP grow? Comment on the result.`,
  model: `Real GDP now = ${KES.nom2} × 100 ÷ ${KES.def2} = **₹${inr(KES_REAL2)} crore**. In the base year real and nominal GDP are equal at ${inr(KES.nom1)}. Real growth = (${KES_REAL2} − ${KES.nom1}) ÷ ${KES.nom1} × 100 = **${KES_REALG} per cent**. Nominal GDP rose by 15.5 per cent, but most of that came from **higher prices**; output grew only ${KES_REALG} per cent.`,
  sol: 'Deflate, then compare with the base year.',
  scheme: [['Real GDP now', 1], ['Real growth rate', 1], ['Comment', 1]],
}));
assert(r2(((KES.nom2 - KES.nom1) / KES.nom1) * 100) === 15.5, 'kesari nominal growth');
Q('l_ket_full', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Ketakipur, which produces only rice and cloth. Base year: ${KET.y1.rice[0]} units of rice at ₹${KET.y1.rice[1]} and ${KET.y1.cloth[0]} units of cloth at ₹${KET.y1.cloth[1]}. Current year: ${KET.y2.rice[0]} units at ₹${KET.y2.rice[1]} and ${KET.y2.cloth[0]} units at ₹${KET.y2.cloth[1]}. [2 + 3]\n\n(a) Distinguish real GDP from nominal GDP. [2]\n(b) Calculate the growth of nominal and of real GDP, and explain which better shows the change in output. [3]`,
  model: `(a) **Nominal GDP** values output at the **prices of the same year**; **real GDP** values it at **constant base-year prices**, so it moves only when **quantities** move.\n(b) Base-year GDP = ${KET.y1.rice[0]} × ${KET.y1.rice[1]} + ${KET.y1.cloth[0]} × ${KET.y1.cloth[1]} = **₹${inr(KET_NOM1)}** (nominal and real are equal in the base year). Current nominal GDP = ${KET.y2.rice[0]} × ${KET.y2.rice[1]} + ${KET.y2.cloth[0]} × ${KET.y2.cloth[1]} = **₹${inr(KET_NOM2)}**, a rise of **${KET_NOMG} per cent**. Current real GDP = ${KET.y2.rice[0]} × ${KET.y1.rice[1]} + ${KET.y2.cloth[0]} × ${KET.y1.cloth[1]} = **₹${inr(KET_REAL2)}**, a rise of **${KET_REALG} per cent**. **Real GDP** is the better guide: output grew by a fifth, while the rest of the nominal rise reflects prices that went up by a quarter.`,
  sol: 'Definitions; three totals; two growth rates; judgement.',
  scheme: [['Distinction', 2], ['Nominal growth', 1], ['Real growth', 1], ['Which is better and why', 1]],
}));

// ================================================================ t05 GDP and welfare
Q('m_welfare_dist', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Real GDP of an imagined country rises by 6 per cent, but almost all the gain goes to a few rich families. Which limitation of GDP as a welfare index does this show?',
  opts: ['Distribution of income', 'Non-monetary exchanges', 'Externalities', 'Depreciation'],
  sol: 'GDP shows the total, not how it is shared. If the gain goes to a few, the welfare of most people may not improve, so distribution is the limitation shown.',
}));
Q('m_welfare_nonmon', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'In an imagined hill village, families grow vegetables for their own kitchens and help each other build houses without payment. These activities are mostly left out of GDP. Which limitation does this illustrate?',
  opts: ['Non-monetary exchanges', 'Negative externalities', 'Distribution of income', 'Price changes'],
  sol: 'Activities that are not bought and sold for money are hard to value and are largely left out, so GDP understates the welfare they create.',
}));
Q('m_externality', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A tannery in an imagined river town raises output but pollutes the water used by fishing families downstream, without paying them. In national accounting terms the pollution is',
  opts: ['a negative externality not deducted from GDP', 'a positive externality added to GDP', 'a transfer payment', 'part of depreciation'],
  sol: 'Harm caused to others without compensation is a negative externality. GDP counts the tannery\'s output but does not subtract the harm, so it overstates welfare.',
}));
Q('m_pos_ext', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A family in an imagined town plants a large garden that freshens the air for the whole street. How does GDP treat this benefit to the neighbours?',
  opts: [
    'It ignores it, so GDP understates welfare',
    'It adds its full value to GDP',
    'It subtracts it as depreciation',
    'It counts it as a factor income of the neighbours',
  ],
  sol: 'The neighbours\' benefit is a positive externality: nobody pays for it, so it has no market value and is left out of GDP, which therefore understates welfare.',
}));
Q('ar_ext_overstate', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'GDP may overstate the welfare of people living near a busy industrial belt.',
  r: 'GDP counts the factories\' output but does not deduct the cost of the pollution they impose on others.',
  sol: 'Both are true, and R explains A: negative externalities harm welfare but are not subtracted from GDP.',
}));
Q('tf_gdp_welfare', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A higher real GDP always means that the people of an imagined country are better off.',
  sol: 'False. Welfare also depends on how income is distributed, on unpaid non-market activities and on externalities such as pollution, none of which GDP fully captures.',
}));
Q('s_three_limits', short({
  t: 5, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two limitations of GDP as an index of economic welfare and explain one of them with an example from an imagined city.',
  model: 'Two limitations: **distribution of income** and **externalities** (also non-monetary exchanges). Example of externalities: a city\'s new power plant raises GDP, but its **smoke harms residents\' health**; this cost is **not deducted** from GDP, so GDP overstates welfare.',
  sol: 'Two named, one explained with an example.',
  scheme: [['Two limitations named', 1], ['One explained with example', 1]],
}));
Q('s3_distribution', short({
  t: 5, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Two imagined countries, Rajgarh and Sonagarh, have the same real GDP and population. In Rajgarh the top tenth of families earn most of the income; in Sonagarh income is shared more evenly. Which country is likely to have higher welfare? Explain.',
  model: '**Sonagarh** is likely to have higher welfare. Both have the **same real GDP per head**, but GDP says nothing about **distribution**. An extra rupee adds more to the welfare of a poor family than of a rich one, so a **more even sharing** of the same income meets more basic needs. In Rajgarh, many families may remain poor despite the same average.',
  sol: 'Same totals; distribution decides welfare.',
  scheme: [['Choice', 1], ['Distribution argument', 1], ['Reasoning about the poor', 1]],
}));
Q('s3_nonmon_ext', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how non-monetary exchanges and positive externalities make GDP understate the welfare of an imagined rural district.',
  model: '1. **Non-monetary exchanges**: much work in the district, such as cooking, child care, kitchen gardens and barter of grain for services, is **not sold for money**, so it is left out of GDP although it adds to welfare.\n2. **Positive externalities**: a farmer\'s orchard that helps neighbours\' bees, or a village tank that recharges wells, **benefits others without payment**, so the benefit is not counted.\nBoth make GDP **understate** welfare.',
  sol: 'Unpaid activity and unpaid benefits are left out.',
  scheme: [['Non-monetary exchanges', 1], ['Positive externalities', 1], ['Effect: understatement', 1]],
}));
Q('l_welfare', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Answer both parts. [2 + 3]\n\n(a) What is meant by economic welfare? [2]\n(b) "A rise in the real GDP of an imagined country raises its economic welfare." Evaluate this statement with three reasons.',
  model: '(a) **Economic welfare** is the well-being people get from goods and services that can be **measured in money**, such as food, housing, health care and education.\n(b) The statement is **only partly true**. Higher real GDP means more goods and services, which can raise welfare. But (1) **distribution**: if the extra income goes to a few, most people may be no better off; (2) **non-monetary exchanges**: unpaid work and self-produced goods are left out, so GDP may miss welfare changes; (3) **externalities**: pollution from growing industry harms health but is not deducted, while unpaid benefits are not added. So real GDP is a **useful but incomplete** index of welfare.',
  sol: 'Definition; three limitations; balanced conclusion.',
  scheme: [['Meaning of welfare', 1], ['Distribution', 1], ['Non-monetary exchanges', 1], ['Externalities', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ ISC paper-style 4- and 8-mark items (bank only)
Q('s4_dev_amb', short({
  t: 1, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts. [2 + 2]\n\n(i) For imagined Phalguni Desh, NDP at market price is ₹${inr(PHA.ndpmp)} crore, indirect taxes ₹${PHA.it} crore and subsidies ₹${PHA.sub} crore. Find NDP at factor cost.\n(ii) Explain why the answer is larger than NDP at market price.`,
  model: `(i) Net indirect taxes = ${PHA.it} − ${PHA.sub} = **${PHA.nit}**. NDP at factor cost = NDP at market price − net indirect taxes = ${PHA.ndpmp} − (${PHA.nit}) = **₹${inr(PHA_NDPFC)} crore**.\n(ii) Market price = factor cost + indirect taxes − subsidies. Here **subsidies exceed indirect taxes**, so goods sell **below** what their producers' factors are paid; the government makes up the gap. Removing the negative net indirect taxes therefore **raises** the figure, so factor cost exceeds market price.`,
  sol: 'Negative net indirect taxes raise factor cost above market price.',
  scheme: [['(i) Net indirect taxes', 1], ['(i) NDP at factor cost', 1], ['(ii) Subsidies exceed taxes', 1], ['(ii) Market price below factor cost', 1]],
}));
Q('s4_ndi', short({
  t: 3, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Rewa Desh (₹ crore): GDP at market price ${inr(REW.gdpmp)}, net factor income from abroad (−) ${-REW.nfia}, net current transfers from abroad ${REW.rowTr}, depreciation ${REW.dep}. [2 + 2]\n\n(i) Find gross and net national disposable income.\n(ii) Explain why national disposable income can exceed national product.`,
  model: `(i) **Gross national disposable income** = GDP at market price + NFIA + net current transfers = ${REW.gdpmp} − ${-REW.nfia} + ${REW.rowTr} = **₹${inr(REW_GNDI)} crore**. **Net** = ${REW_GNDI} − ${REW.dep} = **₹${inr(REW_NNDI)} crore**.\n(ii) Disposable income adds **current transfers from abroad**, such as remittances and gifts, which are not payment for any production at home. When the country receives more transfers than it sends, it can **use more income than it produces**.`,
  sol: 'Add transfers to national product; transfers explain the excess.',
  scheme: [['(i) Gross NDI', 1], ['(i) Net NDI', 1], ['(ii) Transfers are not production', 1], ['(ii) Net inflow lets use exceed output', 1]],
}));
Q('l8_aggregates', long({
  t: [1, 2], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the three items that separate gross from net, market price from factor cost, and domestic from national aggregates.\n(ii) Imagined Devgiri reports national income ₹${inr(DEV.nnpfc)} crore, net factor income from abroad ₹${DEV.nfia} crore, depreciation ₹${DEV.dep} crore, indirect taxes ₹${DEV.it} crore and subsidies ₹${DEV.sub} crore. Find NDP at factor cost, NDP at market price, GDP at market price and GNP at market price.`,
  model: `(i) **Depreciation**, the value of fixed capital used up through wear and tear and expected obsolescence, is subtracted to turn a **gross** aggregate into a **net** one. **Net indirect taxes**, indirect taxes minus subsidies, are subtracted to turn a value at **market price** into one at **factor cost**, because taxes raise and subsidies lower prices without paying any factor. **Net factor income from abroad**, factor income received by normal residents from abroad minus factor income paid to non-residents, is added to turn a **domestic** aggregate into a **national** one.\n(ii) **NDP at factor cost** = ${DEV.nnpfc} − ${DEV.nfia} = **₹${inr(DEV_NDPFC)} crore**. **NDP at market price** = ${DEV_NDPFC} + (${DEV.it} − ${DEV.sub}) = **₹${inr(DEV_NDPMP)} crore**. **GDP at market price** = ${DEV_NDPMP} + ${DEV.dep} = **₹${inr(DEV_GDPMP)} crore**. **GNP at market price** = ${DEV_GDPMP} + ${DEV.nfia} = **₹${inr(DEV_GNPMP)} crore**. Each step reverses or applies exactly one of the three items.`,
  sol: 'Three adjusting items; four aggregates by reversing them.',
  scheme: [['(i) Depreciation', 1], ['(i) Net indirect taxes', 1], ['(i) NFIA', 1], ['(i) Direction of each adjustment', 1], ['(ii) NDP at factor cost', 1], ['(ii) NDP at market price', 1], ['(ii) GDP at market price', 1], ['(ii) GNP at market price', 1]],
}));
Q('l8_real_welfare', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Imagined Kesari Ghat's nominal GDP rose from ₹${inr(KES.nom1)} crore in the base year to ₹${inr(KES.nom2)} crore, when the GDP deflator was ${KES.def2}. Find real GDP and the real growth rate, and explain why nominal growth overstates the rise in output.\n(ii) A minister of Kesari Ghat says the rise in real GDP proves that people are better off. Evaluate this claim.`,
  model: `(i) **Real GDP** = ${KES.nom2} × 100 ÷ ${KES.def2} = **₹${inr(KES_REAL2)} crore**. In the base year real GDP equals nominal GDP, ${inr(KES.nom1)}, so **real growth** = (${KES_REAL2} − ${KES.nom1}) ÷ ${KES.nom1} × 100 = **${KES_REALG} per cent**. Nominal GDP rose 15.5 per cent because it is valued at **current prices**: the deflator shows prices rose by 10 per cent, and that price rise inflates nominal GDP without adding goods.\n(ii) The claim is **too strong**. More real output can raise welfare, but GDP ignores **how income is distributed**: if gains go to a few, most families may gain little. It leaves out **non-monetary activities** such as unpaid care. It does not deduct **negative externalities** such as pollution from new industry, nor add unpaid benefits. Growth of ${KES_REALG} per cent is a good sign, but welfare must be judged with **other indicators** as well.`,
  sol: 'Deflate and compare; evaluate GDP as a welfare index.',
  scheme: [['(i) Real GDP', 1], ['(i) Real growth', 1], ['(i) Why nominal overstates', 2], ['(ii) Distribution', 1], ['(ii) Non-monetary exchanges', 1], ['(ii) Externalities', 1], ['(ii) Judgement', 1]],
}));

// ================================================================ case-based
Q('cb_ambarpur', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined press note from the statistics office of Ambarpur and answer the questions that follow. *(Written by SOYL for practice; the country and figures are imagined.)*',
  passage: `**Ambarpur statistics office: national accounts at a glance (imagined)**\n\nGDP at market price this year is ₹${inr(AMB.gdpmp)} crore. Machines and buildings worth ₹${AMB.dep} crore were used up. The government collected indirect taxes of ₹${AMB.it} crore and paid subsidies of ₹${AMB.sub} crore. Ambarpur citizens working abroad earned less than foreign firms and workers earned inside Ambarpur, leaving net factor income from abroad at minus ₹${-AMB.nfia} crore.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: AMB_A.ndpmp, unit: '₹ crore', stem: 'Find NDP at market price (in ₹ crore).', sol: `NDP at market price = ${AMB.gdpmp} − ${AMB.dep} = ${AMB_A.ndpmp}, that is ₹${inr(AMB_A.ndpmp)} crore.` })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: AMB_A.gdpfc, unit: '₹ crore', stem: 'Find GDP at factor cost (in ₹ crore).', sol: `GDP at factor cost = ${AMB.gdpmp} − (${AMB.it} − ${AMB.sub}) = ${AMB_A.gdpfc}, that is ₹${inr(AMB_A.gdpfc)} crore.` })),
    child('c', short({ t: [1, 2], d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the national income of Ambarpur, showing the steps.', model: `National income = GDP at market price − depreciation − net indirect taxes + NFIA = ${AMB.gdpmp} − ${AMB.dep} − ${AMB.nit} − ${-AMB.nfia} = **₹${inr(AMB_A.nnpfc)} crore**.`, sol: 'Three adjustments from GDP at market price.', scheme: [['Steps', 1], ['National income', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain, using the note, why GNP of Ambarpur is smaller than its GDP.', model: `Net factor income from abroad is **negative** (−${-AMB.nfia}): non-residents earn more inside Ambarpur than its residents earn abroad. GNP = GDP + NFIA = ${AMB.gdpmp} − ${-AMB.nfia} = **₹${inr(AMB_A.gnpmp)} crore**, smaller than GDP.`, sol: 'Negative NFIA lowers national product.', scheme: [['Negative NFIA explained', 1], ['GNP computed or compared', 1]] }),
    ]),
  ],
}));
Q('cb_lohitpur', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined income table of Lohitpur and answer the questions that follow. *(Written by SOYL for practice; the country and figures are imagined.)*',
  passage: `**Lohitpur: from private income to household income (imagined, ₹ crore)**\n\n| Item | Value |\n|---|---|\n| Private income | ${inr(LOH_PVT)} |\n| Undistributed profits of companies | ${LOH.corpSave} |\n| Corporation tax | ${LOH.corpTax} |\n| Direct taxes paid by households | ${LOH.dirTax} |\n| Fees and fines paid to government | ${LOH.misc} |`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: LOH_PI, unit: '₹ crore', stem: 'Find personal income (in ₹ crore).', sol: `Personal income = ${LOH_PVT} − ${LOH.corpSave} − ${LOH.corpTax} = ${LOH_PI}, that is ₹${inr(LOH_PI)} crore.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: LOH_PDI, unit: '₹ crore', stem: 'Find personal disposable income (in ₹ crore).', sol: `PDI = ${LOH_PI} − ${LOH.dirTax} − ${LOH.misc} = ${LOH_PDI}, that is ₹${inr(LOH_PDI)} crore.` })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why undistributed profits are subtracted when moving from private income to personal income.', model: 'Undistributed profits are kept by **companies** for reinvestment or reserves. They are part of the private sector\'s income but are **not paid to shareholders**, so persons never receive them.', sol: 'Retained by companies, not received by persons.', scheme: [['Kept by companies', 1], ['Not received by persons', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): If Lohitpur cut household income tax by ₹200 crore, which figure in the table would change, and how?', model: `**Personal disposable income** would rise by ₹200 crore, to ₹${inr(LOH_PDI + 200)} crore, because less income is taken in direct taxes. Personal income itself would not change.`, sol: 'Lower direct taxes raise PDI only.', scheme: [['PDI identified and new value', 1], ['Personal income unchanged', 1]] }),
    ]),
  ],
}));
Q('cb_ketakipur', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined news report from Ketakipur and answer the questions that follow. *(Written by SOYL for practice; the town, people and figures are imagined.)*',
  passage: `**Ketakipur celebrates a 50 per cent rise in GDP (imagined report)**\n\nThe district council announced that the value of goods produced rose from ₹${inr(KET_NOM1)} lakh to ₹${inr(KET_NOM2)} lakh in two years. Opposition members pointed out that rice and cloth prices had also climbed sharply. A local doctor added that a new dyeing unit had raised output but was discharging coloured water into the river, and that most new jobs had gone to workers from outside the district.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: KET_DEF2, unit: null, stem: `If output this year valued at base-year prices is ₹${inr(KET_REAL2)} lakh, find the GDP deflator.`, sol: `Deflator = ${KET_NOM2} ÷ ${KET_REAL2} × 100 = ${KET_DEF2}.` })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Why do opposition members doubt the council\'s claim?', model: 'Because the rise is in **nominal** GDP: higher **prices** inflate the value even if quantities rise less.', sol: 'Price rise inflates nominal GDP.', scheme: [['Price effect on nominal GDP', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify two points in the doctor\'s remarks that show GDP may overstate welfare.', model: '(1) The dyeing unit\'s **river pollution** is a negative externality not deducted from GDP. (2) Most new jobs went to **outsiders**, so the gain is unevenly **distributed** and local families may not benefit.', sol: 'Externality and distribution.', scheme: [['Externality', 1], ['Distribution', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Calculate real growth over the two years and say what it shows.', model: `Real GDP rose from ${inr(KET_NOM1)} to ${inr(KET_REAL2)}, that is **${KET_REALG} per cent**. Output grew, but far less than the **${KET_NOMG} per cent** nominal rise the council celebrated.`, sol: 'Real growth versus nominal growth.', scheme: [['Real growth', 1], ['Comparison', 1]] }),
    ]),
  ],
}));
