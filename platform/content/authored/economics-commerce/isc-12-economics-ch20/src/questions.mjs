// ISC 12 Economics, ch20 Measurement of National Income — question bank. Every economy, firm, person and figure is
// imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a
// stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Scope: the value-added (product) method, the income method and the expenditure method, with the precautions and the
// difficulties of each. Aggregates and their conversions are taught in ch19; here they are used only to finish a method.
// Set-ups differ from SOYL CBSE 12 Economics ch01 and from the ISC 2027 specimen's expenditure and income tables.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const inr = (n) => n.toLocaleString('en-IN');
const sum = (...xs) => xs.reduce((s, v) => s + v, 0);

// ---------------------------------------------------------------- imagined data (₹ crore unless stated)
// (1) Mandya sweets chain: cane grower → jaggery unit → sweet shop; the three methods meet at the same total.
export const MAN = { cane: 300, jaggery: 500, sweets: 800, wages: 450, rent: 60, interest: 90, profit: 200 };
export const MAN_VA = [MAN.cane - 0, MAN.jaggery - MAN.cane, MAN.sweets - MAN.jaggery];
export const MAN_VA_TOTAL = sum(...MAN_VA);
export const MAN_SALES = MAN.cane + MAN.jaggery + MAN.sweets;
export const MAN_INCOME = MAN.wages + MAN.rent + MAN.interest + MAN.profit;
assert(MAN_VA.join() === '300,200,300' && MAN_VA_TOTAL === 800 && MAN_SALES === 1600 && MAN_INCOME === 800 && MAN_INCOME === MAN.sweets, 'mandya');

// (2) Vidarbha cotton chain: four firms with changes in stock and bought-in inputs (₹ lakh).
export const COT = [
  { name: 'Cotton farm', sales: 400, dstock: 0, ic: 60 },
  { name: 'Ginning unit', sales: 650, dstock: 30, ic: 400 },
  { name: 'Spinning mill', sales: 1000, dstock: -20, ic: 650 },
  { name: 'Garment unit', sales: 1500, dstock: 50, ic: 1000 },
].map((f) => ({ ...f, vo: f.sales + f.dstock, gva: f.sales + f.dstock - f.ic }));
export const COT_GVA = sum(...COT.map((f) => f.gva));
export const COT_VO = sum(...COT.map((f) => f.vo));
assert(COT.map((f) => f.vo).join() === '400,680,980,1550' && COT.map((f) => f.gva).join() === '340,280,330,550', 'cotton firms');
assert(COT_GVA === 1500 && COT_VO === 3610, 'cotton totals');
// garment unit: from GVA at market price to NVA at factor cost
export const GAR = { dep: 40, itax: 45, subsidy: 15 };
export const GAR_NIT = GAR.itax - GAR.subsidy;
export const GAR_NVAFC = COT[3].gva - GAR.dep - GAR_NIT;
assert(GAR_NIT === 30 && GAR_NVAFC === 480, 'garment nva');

// (3) Pune pump maker: one firm's value added (₹ lakh), with a machine bought (not an input).
export const PUMP = { sales: 2400, opening: 250, closing: 150, raw: 1100, power: 200, machine: 300, dep: 90, nit: 60 };
export const PUMP_DSTOCK = PUMP.closing - PUMP.opening;
export const PUMP_VO = PUMP.sales + PUMP_DSTOCK;
export const PUMP_IC = PUMP.raw + PUMP.power;
export const PUMP_GVA = PUMP_VO - PUMP_IC;
export const PUMP_NVAMP = PUMP_GVA - PUMP.dep;
export const PUMP_NVAFC = PUMP_NVAMP - PUMP.nit;
assert(PUMP_DSTOCK === -100 && PUMP_VO === 2300 && PUMP_IC === 1300 && PUMP_GVA === 1000 && PUMP_NVAMP === 910 && PUMP_NVAFC === 850, 'pump');

// (4) Suvarnagiri: income method with distractor items.
export const SUV = { wages: 1450, ssc: 140, rent: 210, interest: 160, corpTax: 90, dividend: 230, retained: 200, mixed: 610, nfia: 25, debtInterest: 70, scholarship: 40, staffLoan: 45 };
export const SUV_COE = SUV.wages + SUV.ssc;
export const SUV_PROFIT = SUV.corpTax + SUV.dividend + SUV.retained;
export const SUV_OS = SUV.rent + SUV.interest + SUV_PROFIT;
export const SUV_NDPFC = SUV_COE + SUV_OS + SUV.mixed;
export const SUV_NI = SUV_NDPFC + SUV.nfia;
assert(SUV_COE === 1590 && SUV_PROFIT === 520 && SUV_OS === 890 && SUV_NDPFC === 3090 && SUV_NI === 3115, 'suvarnagiri');

// (5) Konark: profit as the remainder of domestic income.
export const KON = { ndpfc: 2600, coe: 1250, rent: 180, interest: 140, mixed: 570 };
export const KON_PROFIT = KON.ndpfc - KON.coe - KON.rent - KON.interest - KON.mixed;
assert(KON_PROFIT === 460, 'konark');

// (6) Tamrapatna: expenditure method.
export const TAM = { pfce: 3200, gfce: 650, gdfcf: 820, dstock: -40, exports: 360, imports: 410, cfc: 180, nit: 260, nfia: -35, pension: 90 };
export const TAM_GDCF = TAM.gdfcf + TAM.dstock;
export const TAM_NX = TAM.exports - TAM.imports;
export const TAM_GDPMP = TAM.pfce + TAM.gfce + TAM_GDCF + TAM_NX;
export const TAM_GNPMP = TAM_GDPMP + TAM.nfia;
export const TAM_NDPMP = TAM_GDPMP - TAM.cfc;
export const TAM_NDPFC = TAM_NDPMP - TAM.nit;
export const TAM_NI = TAM_NDPFC + TAM.nfia;
assert(TAM_GDCF === 780 && TAM_NX === -50 && TAM_GDPMP === 4580 && TAM_GNPMP === 4545 && TAM_NDPMP === 4400 && TAM_NDPFC === 4140 && TAM_NI === 4105, 'tamrapatna');

// (7) Kavalpur: a short expenditure-method chain.
export const KAV = { pfce: 1800, gfce: 400, gdcf: 500, nx: 60, cfc: 120, nit: 140, nfia: 20 };
export const KAV_GDPMP = KAV.pfce + KAV.gfce + KAV.gdcf + KAV.nx;
export const KAV_NI = KAV_GDPMP - KAV.cfc - KAV.nit + KAV.nfia;
assert(KAV_GDPMP === 2760 && KAV_NI === 2520, 'kavalpur');

// (8) Shivgarh: a mixed list to sort by method; final figure by the expenditure method.
export const SHI = { pfce: 960, gfce: 240, gdcf: 300, exports: 70, imports: 90, oldAge: 30, sharesBought: 55, secondHand: 25 };
export const SHI_GDPMP = SHI.pfce + SHI.gfce + SHI.gdcf + SHI.exports - SHI.imports;
assert(SHI_GDPMP === 1480, 'shivgarh');

// ================================================================ t01 Value-added (product) method
Q('m_va_formula', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A student summarising the product method for her Class 12 notes in Nagpur must write the correct formula for gross value added at market price. Which is it?',
  opts: [
    'Value of output minus intermediate consumption',
    'Sales minus wages paid to workers',
    'Value of output plus intermediate consumption',
    'Sales minus purchase of machines',
  ],
  sol: 'Gross value added at market price is what the firm adds to the inputs it buys: value of output less intermediate consumption. Wages are part of value added, not a deduction; adding inputs counts them twice; machines are capital goods, not inputs used up.',
}));
Q('m_vo_formula', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When a firm makes more goods in a year than it sells, which expression gives its value of output?',
  opts: ['Sales plus the change in stock', 'Sales minus the change in stock', 'Sales only', 'Closing stock only'],
  sol: 'Unsold goods made this year are added to stock, and they are part of this year\'s production. So the change in stock (closing minus opening) is added to sales; sales alone would miss these goods.',
}));
Q('m_ic_meaning', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'For an imagined bus company in Mangaluru, which purchase is part of its intermediate consumption in the year?',
  opts: [
    'Diesel used to run the buses',
    'A new bus bought for the route to Udupi',
    'Shares of an oil company',
    'Land bought for a new depot',
  ],
  sol: 'Intermediate consumption is goods and services used up within the year in producing output, such as fuel. A bus is a capital good lasting many years, shares are a financial asset, and land is not produced in the year.',
}));
Q('m_double_mandya', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In the imagined Mandya sweets chain, a cane grower sells cane worth ₹${MAN.cane} crore to a jaggery unit, which sells jaggery worth ₹${MAN.jaggery} crore to a sweet shop, which sells sweets worth ₹${MAN.sweets} crore to households. A clerk adds all three sales. By how much has he overstated the value of final output?`,
  opts: [`₹${MAN_SALES - MAN.sweets} crore`, `₹${MAN_SALES} crore`, `₹${MAN.jaggery} crore`, `₹${MAN.cane} crore`],
  sol: `Adding the sales gives ${MAN.cane} + ${MAN.jaggery} + ${MAN.sweets} = ${MAN_SALES}, but final output is only the sweets, worth ${MAN.sweets}. The overstatement is ${MAN_SALES} − ${MAN.sweets} = ₹${MAN_SALES - MAN.sweets} crore, the value of the cane and jaggery counted again inside the sweets.`,
}));
Q('m_dstock_neg', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined pump maker in Pune sold goods worth ₹${inr(PUMP.sales)} lakh. Its stock of finished pumps fell from ₹${PUMP.opening} lakh to ₹${PUMP.closing} lakh. What was its value of output?`,
  opts: [`₹${inr(PUMP_VO)} lakh`, `₹${inr(PUMP.sales + 100)} lakh`, `₹${inr(PUMP.sales)} lakh`, `₹${inr(PUMP.sales - PUMP.closing)} lakh`],
  sol: `Change in stock = ${PUMP.closing} − ${PUMP.opening} = −100. Value of output = ${inr(PUMP.sales)} − 100 = ₹${inr(PUMP_VO)} lakh: part of the year's sales came from pumps made in earlier years.`,
}));
Q('m_machine_not_ic', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is a lathe bought by an imagined workshop in Rajkot not deducted as intermediate consumption when its value added is found?',
  opts: [
    'It is a capital good used over many years, not used up in the year\'s production',
    'It was bought from another country',
    'It is paid for out of the owner\'s savings',
    'Machines never wear out',
  ],
  sol: 'Intermediate consumption covers inputs used up within the year. A lathe is a fixed asset; only its wear and tear (depreciation) is deducted, and that is done when moving from gross to net value added.',
}));
Q('ar_final_only', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Under the product method, only the value of final goods, or the sum of values added, is counted as national output.',
  r: 'The value of intermediate goods is already included in the price of the final goods made from them.',
  sol: 'Both are true, and R explains A: counting intermediate goods separately would add their value a second time, which is double counting.',
}));
Q('tf_sum_sales', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Adding up the sales of every firm along a chain of production overstates the value of the final output of that chain.',
  sol: 'True. Each firm\'s sales include the value of inputs bought from the firm before it, so the inputs are counted more than once. This is the problem of double counting.',
}));
Q('fb_ic', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Goods and services bought from other producers and used up during the year in producing output are called ___ consumption.',
  acc: [['intermediate']],
  sol: 'They are intermediate consumption; subtracting them from the value of output gives value added.',
}));
Q('n_mandya_va', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: MAN_VA_TOTAL, unit: '₹ crore',
  stem: `In the imagined Mandya sweets chain (cane ₹${MAN.cane} crore, jaggery ₹${MAN.jaggery} crore, sweets ₹${MAN.sweets} crore; the grower buys no inputs), find the total value added (in ₹ crore).`,
  sol: `Value added: grower ${MAN.cane}, jaggery unit ${MAN.jaggery} − ${MAN.cane} = ${MAN_VA[1]}, sweet shop ${MAN.sweets} − ${MAN.jaggery} = ${MAN_VA[2]}. Total = ${MAN_VA.join(' + ')} = ${MAN_VA_TOTAL}, that is ₹${MAN_VA_TOTAL} crore.`,
}));
Q('n_pump_gva', num({
  t: 1, d: 2, c: 'application', marks: 1, value: PUMP_GVA, unit: '₹ lakh',
  stem: `The imagined Pune pump maker has sales ₹${inr(PUMP.sales)} lakh, a fall in stock of ₹100 lakh, raw materials ₹${inr(PUMP.raw)} lakh and power ₹${PUMP.power} lakh. It also bought a machine for ₹${PUMP.machine} lakh. Find its gross value added at market price (in ₹ lakh).`,
  sol: `Value of output = ${inr(PUMP.sales)} − 100 = ${inr(PUMP_VO)}. Intermediate consumption = ${inr(PUMP.raw)} + ${PUMP.power} = ${inr(PUMP_IC)} (the machine is a capital good, not an input). GVA = ${inr(PUMP_VO)} − ${inr(PUMP_IC)} = ${inr(PUMP_GVA)}, that is ₹${inr(PUMP_GVA)} lakh.`,
}));
Q('s_double_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain double counting with an example from a chain that turns raw silk into saris.',
  model: '**Double counting** means counting the value of an input more than once. If a weaver\'s sale of silk yarn to a sari maker is added to the sari maker\'s sale of saris, the **yarn is counted twice**, because its value is already inside the price of the saris.',
  sol: 'Meaning, then an example showing the repeated input.',
  scheme: [['Meaning', 1], ['Example showing the repeated value', 1]],
}));
Q('s_two_avoid', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways of avoiding double counting when national output is measured.',
  model: '1. **Final product approach**: count only the value of **final goods and services**, leaving out goods bought for further production.\n2. **Value-added approach**: add only the **value added** by each firm, that is, value of output minus intermediate consumption.',
  sol: 'Final product approach and value-added approach.',
  scheme: [['Final product approach', 1], ['Value-added approach', 1]],
}));
Q('s3_pump_nvafc', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Find the net value added at factor cost of an imagined Pune pump maker (₹ lakh): sales ${inr(PUMP.sales)}; opening stock ${PUMP.opening}; closing stock ${PUMP.closing}; raw materials ${inr(PUMP.raw)}; power and fuel ${PUMP.power}; new machine bought ${PUMP.machine}; depreciation ${PUMP.dep}; net indirect taxes ${PUMP.nit}.`,
  model: `Change in stock = ${PUMP.closing} − ${PUMP.opening} = −100, so value of output = ${inr(PUMP.sales)} − 100 = **${inr(PUMP_VO)}**. Intermediate consumption = ${inr(PUMP.raw)} + ${PUMP.power} = **${inr(PUMP_IC)}**; the machine is a **capital good** and is left out. Gross value added at market price = ${inr(PUMP_VO)} − ${inr(PUMP_IC)} = ${inr(PUMP_GVA)}. Net value added at factor cost = ${inr(PUMP_GVA)} − ${PUMP.dep} − ${PUMP.nit} = **₹${PUMP_NVAFC} lakh**.`,
  sol: 'Value of output, inputs (not the machine), then depreciation and net indirect taxes.',
  scheme: [['Value of output with the fall in stock', 1], ['Intermediate consumption, machine excluded', 1], ['Net value added at factor cost', 1]],
}));
Q('s3_cotton_two', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined ginning unit in Vidarbha sold lint worth ₹${COT[1].sales} lakh, added ₹${COT[1].dstock} lakh to its stock and bought raw cotton for ₹${COT[1].ic} lakh. A spinning mill sold yarn worth ₹${inr(COT[2].sales)} lakh, ran down its stock by ₹${-COT[2].dstock} lakh and bought lint for ₹${COT[2].ic} lakh. Find the gross value added of each unit and explain why the two sales are not simply added.`,
  model: `Ginning unit: value of output = ${COT[1].sales} + ${COT[1].dstock} = ${COT[1].vo}; GVA = ${COT[1].vo} − ${COT[1].ic} = **₹${COT[1].gva} lakh**. Spinning mill: value of output = ${inr(COT[2].sales)} − ${-COT[2].dstock} = ${COT[2].vo}; GVA = ${COT[2].vo} − ${COT[2].ic} = **₹${COT[2].gva} lakh**. The mill's yarn already contains the lint it bought, so adding both sales would count the lint **twice**.`,
  sol: 'Value of output and value added for each unit; reason against adding sales.',
  scheme: [['Ginning unit value added', 1], ['Spinning mill value added', 1], ['Double counting explained', 1]],
}));
Q('l_cotton_chain', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about the imagined Vidarbha cotton chain (₹ lakh). [3 + 2]\n\n| Unit | Sales | Change in stock | Intermediate consumption |\n|---|---|---|---|\n${COT.map((f) => `| ${f.name} | ${inr(f.sales)} | ${f.dstock} | ${inr(f.ic)} |`).join('\n')}\n\n(a) Find the gross value added of each unit and of the whole chain. [3]\n(b) The garment unit's depreciation is ₹${GAR.dep} lakh, it pays indirect taxes of ₹${GAR.itax} lakh and receives a subsidy of ₹${GAR.subsidy} lakh. Find its net value added at factor cost. [2]`,
  model: `(a) Value of output = sales + change in stock; gross value added = value of output − intermediate consumption.\n${COT.map((f) => `- ${f.name}: ${inr(f.sales)} + (${f.dstock}) = ${inr(f.vo)}; ${inr(f.vo)} − ${inr(f.ic)} = **${f.gva}**`).join('\n')}\nTotal gross value added of the chain = ${COT.map((f) => f.gva).join(' + ')} = **₹${inr(COT_GVA)} lakh**, far less than the ₹${inr(COT_VO)} lakh got by adding every value of output, because that sum repeats the inputs.\n(b) Net indirect taxes = ${GAR.itax} − ${GAR.subsidy} = ${GAR_NIT}. Net value added at factor cost = ${COT[3].gva} − ${GAR.dep} − ${GAR_NIT} = **₹${GAR_NVAFC} lakh**.`,
  sol: 'Value of output and value added for each unit, the chain total, then the factor-cost net figure.',
  scheme: [['Values of output with changes in stock', 1], ['Value added of each unit', 1], ['Chain total', 1], ['Net indirect taxes', 1], ['Net value added at factor cost', 1]],
}));

// ================================================================ t02 Income method
Q('m_coe_parts', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined textile company in Coimbatore pays wages, pays its share of contributions to employees\' provident fund and gives workers free uniforms. Under the income method, all three are counted as',
  opts: ['compensation of employees', 'operating surplus', 'mixed income of the self-employed', 'transfer payments'],
  sol: 'Compensation of employees covers wages and salaries in cash, payments in kind such as free uniforms, and the employer\'s contribution to social security schemes such as provident fund. None is rent, interest or profit, and none is a transfer.',
}));
Q('m_os_parts', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which group of incomes together makes up operating surplus in the income method?',
  opts: ['Rent and royalty, interest and profit', 'Wages, salaries and bonus', 'Pensions, scholarships and subsidies', 'Wages and mixed income'],
  sol: 'Operating surplus is the income from property and enterprise: rent and royalty, interest and profit. Wages belong to compensation of employees; pensions and scholarships are transfers.',
}));
Q('m_mixed', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A carpenter in an imagined village near Hubballi works in his own shed with his own tools and sells furniture. His earnings are recorded under the income method as',
  opts: ['mixed income of the self-employed', 'compensation of employees', 'rent and royalty', 'interest'],
  sol: 'He supplies his own labour, building and tools, so his earnings mix wages, rent, interest and profit that cannot be separated easily. Such earnings are recorded as mixed income of the self-employed.',
}));
Q('m_profit_parts', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A listed company in an imagined industrial town divides its year\'s profit into three uses. Which list gives those three parts as used in the income method?',
  opts: [
    'Corporation tax, dividends and undistributed profit',
    'Wages, rent and interest',
    'Depreciation, indirect taxes and subsidies',
    'Dividends, bonus shares and loans',
  ],
  sol: 'Profit is either paid to the government as corporation tax, paid to shareholders as dividends, or kept in the business as undistributed (retained) profit. Wages, rent and interest are other factor incomes; depreciation and indirect taxes are not profit.',
}));
Q('m_not_factor', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which of these receipts of a family in an imagined town in Odisha is NOT a factor income?',
  opts: [
    'A scholarship received by the daughter from the state government',
    'Rent received for a shop let out in the market',
    'Salary earned by the father as a bank clerk',
    'Interest received on a fixed deposit with a bank',
  ],
  sol: 'A scholarship is a transfer payment: nothing is produced in return. Rent, salary and interest on a deposit lent to a bank are rewards for factor services and are factor incomes.',
}));
Q('m_kind', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined hospital in Lucknow provides free meals and rent-free housing to its nurses. How are these treated in the income method?',
  opts: [
    'Included in compensation of employees as payments in kind',
    'Excluded, because no money is paid',
    'Included in operating surplus of the hospital',
    'Treated as transfer payments to the nurses',
  ],
  sol: 'Meals and housing given to employees are a reward for their work, paid in kind instead of cash, so they are valued and included in compensation of employees.',
}));
Q('ar_interest_debt', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Interest paid by the government on the national debt is excluded from domestic income.',
  r: 'Such interest is treated as a transfer payment, because government loans are taken largely for non-productive purposes.',
  sol: 'Both are true, and R explains A: since the borrowed funds are not treated as having produced income, the interest is recorded as a transfer and kept out of domestic income.',
}));
Q('ar_mixed_income', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Mixed income of the self-employed is left out when domestic income is found by the income method.',
  r: 'Self-employed persons do not contribute to the production of goods and services.',
  sol: 'Both are false. Mixed income is one of the three parts of domestic income under the income method, and the self-employed, such as farmers, artisans and shopkeepers, do produce goods and services.',
}));
Q('fb_os', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Rent, interest and profit together are called operating ___ in the income method.',
  acc: [['surplus']],
  sol: 'They make up the operating surplus, the income from property and entrepreneurship.',
}));
Q('n_suvarna_coe', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: SUV_COE, unit: '₹ crore',
  stem: `In imagined Suvarnagiri, wages and salaries are ₹${inr(SUV.wages)} crore and employers\' contributions to social security schemes are ₹${SUV.ssc} crore. Firms also gave interest-free loans of ₹${SUV.staffLoan} crore to staff. Find compensation of employees (in ₹ crore).`,
  sol: `Compensation of employees = ${inr(SUV.wages)} + ${SUV.ssc} = ${inr(SUV_COE)}, that is ₹${inr(SUV_COE)} crore. An interest-free loan must be repaid, so it is not a reward for work and is left out.`,
}));
Q('n_konark_profit', num({
  t: 2, d: 3, c: 'application', marks: 1, value: KON_PROFIT, unit: '₹ crore',
  stem: `Imagined Konark has domestic income (NDP at factor cost) of ₹${inr(KON.ndpfc)} crore, compensation of employees ₹${inr(KON.coe)} crore, rent ₹${KON.rent} crore, interest ₹${KON.interest} crore and mixed income ₹${KON.mixed} crore. Find profit (in ₹ crore).`,
  sol: `Profit = ${inr(KON.ndpfc)} − ${inr(KON.coe)} − ${KON.rent} − ${KON.interest} − ${KON.mixed} = ${KON_PROFIT}, that is ₹${KON_PROFIT} crore.`,
}));
Q('s_coe_two_parts', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the two main parts of compensation of employees and give one example of each from a hotel in Shimla.',
  model: '1. **Wages and salaries in cash and kind**: monthly salary of a receptionist, or free meals given to the kitchen staff.\n2. **Employer\'s contribution to social security**: the hotel\'s share of contributions to its workers\' provident fund or health insurance.',
  sol: 'Wages and salaries (cash and kind); employer\'s social security contributions.',
  scheme: [['Wages and salaries with example', 1], ['Social security contribution with example', 1]],
}));
Q('s_os_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is operating surplus? Which three incomes does it contain?',
  model: '**Operating surplus** is the income from **property and entrepreneurship** earned in production. It is made up of **rent and royalty**, **interest** and **profit** (corporation tax, dividends and undistributed profit).',
  sol: 'Meaning and its three parts.',
  scheme: [['Meaning', 1], ['Three incomes', 1]],
}));
Q('s3_suvarna_ndpfc', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Find domestic income of imagined Suvarnagiri by the income method (₹ crore): wages and salaries ${inr(SUV.wages)}; employers\' social security contributions ${SUV.ssc}; rent and royalty ${SUV.rent}; interest ${SUV.interest}; corporation tax ${SUV.corpTax}; dividends ${SUV.dividend}; undistributed profit ${SUV.retained}; mixed income ${SUV.mixed}; interest on national debt ${SUV.debtInterest}; scholarships ${SUV.scholarship}.`,
  model: `Compensation of employees = ${inr(SUV.wages)} + ${SUV.ssc} = **${inr(SUV_COE)}**. Profit = ${SUV.corpTax} + ${SUV.dividend} + ${SUV.retained} = ${SUV_PROFIT}, so operating surplus = ${SUV.rent} + ${SUV.interest} + ${SUV_PROFIT} = **${SUV_OS}**. Domestic income = ${inr(SUV_COE)} + ${SUV_OS} + ${SUV.mixed} = **₹${inr(SUV_NDPFC)} crore**. Interest on national debt and scholarships are **transfers** and are left out.`,
  sol: 'Compensation of employees, operating surplus, mixed income; transfers excluded.',
  scheme: [['Compensation of employees', 1], ['Operating surplus with profit built up', 1], ['Domestic income, transfers excluded', 1]],
}));
Q('s3_income_steps', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the steps followed in estimating national income by the income method.',
  model: '1. **Identify** the producing enterprises and group them into industrial sectors (primary, secondary, tertiary).\n2. **Classify** the factor incomes they pay into compensation of employees, operating surplus and mixed income, and estimate each.\n3. **Add** the three for every sector to get domestic income, then **add net factor income from abroad** to reach national income.',
  sol: 'Identify sectors; classify and estimate factor incomes; add and adjust for factor income from abroad.',
  scheme: [['Identify and group enterprises', 1], ['Classify and estimate factor incomes', 1], ['Add, then add net factor income from abroad', 1]],
}));
Q('l_income_full', long({
  t: [2, 4], d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Suvarnagiri (₹ crore). [3 + 2]\n\n| Item | Value |\n|---|---|\n| Wages and salaries | ${inr(SUV.wages)} |\n| Employers' contribution to social security | ${SUV.ssc} |\n| Rent and royalty | ${SUV.rent} |\n| Interest | ${SUV.interest} |\n| Corporation tax | ${SUV.corpTax} |\n| Dividends | ${SUV.dividend} |\n| Undistributed profit | ${SUV.retained} |\n| Mixed income of the self-employed | ${SUV.mixed} |\n| Net factor income from abroad | ${SUV.nfia} |\n| Interest on national debt | ${SUV.debtInterest} |\n| Interest-free loans given to staff | ${SUV.staffLoan} |\n\n(a) Calculate national income by the income method. [3]\n(b) Give reasons for leaving out two items in the table. [2]`,
  model: `(a) Compensation of employees = ${inr(SUV.wages)} + ${SUV.ssc} = **${inr(SUV_COE)}**.\nProfit = ${SUV.corpTax} + ${SUV.dividend} + ${SUV.retained} = ${SUV_PROFIT}; operating surplus = ${SUV.rent} + ${SUV.interest} + ${SUV_PROFIT} = **${SUV_OS}**.\nDomestic income (NDP at factor cost) = ${inr(SUV_COE)} + ${SUV_OS} + ${SUV.mixed} = ${inr(SUV_NDPFC)}.\nNational income = ${inr(SUV_NDPFC)} + ${SUV.nfia} = **₹${inr(SUV_NI)} crore**.\n(b) **Interest on national debt** (₹${SUV.debtInterest} crore) is treated as a **transfer payment**, because the government is taken to borrow mainly for non-productive purposes. **Interest-free loans to staff** (₹${SUV.staffLoan} crore) are not income at all: the money must be **repaid**, so it is neither a factor payment nor a reward for work.`,
  sol: 'Build compensation of employees and operating surplus, add mixed income and factor income from abroad; justify two exclusions.',
  scheme: [['Compensation of employees', 1], ['Operating surplus', 1], ['National income', 1], ['First exclusion with reason', 1], ['Second exclusion with reason', 1]],
}));

// ================================================================ t03 Expenditure method
Q('m_pfce_eg', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'A family in an imagined suburb of Hyderabad buys a refrigerator for its kitchen. In the expenditure method this purchase is part of',
  opts: [
    'private final consumption expenditure',
    'gross domestic capital formation',
    'government final consumption expenditure',
    'intermediate consumption',
  ],
  sol: 'Households buying goods for their own use make private final consumption expenditure, even for durables such as a refrigerator. Capital formation is investment by producers; government spending is by the state; intermediate consumption is by firms.',
}));
Q('m_gfce', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which spending by the government of an imagined state is counted as government final consumption expenditure?',
  opts: [
    'Salaries of teachers in government schools',
    'Old-age pensions paid to retired farmers',
    'Unemployment allowance paid to job seekers',
    'Interest paid on loans raised from the public',
  ],
  sol: 'Teachers\' salaries buy a service (teaching) that the government provides free to the public, so they are final consumption by the government. Pensions, allowances and interest on public debt are transfers with no service in return.',
}));
Q('m_gcf_parts', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Gross domestic capital formation used in the expenditure method is made up of',
  opts: [
    'gross domestic fixed capital formation and change in stock',
    'private and government consumption expenditure',
    'exports and imports',
    'depreciation and net indirect taxes',
  ],
  sol: 'Investment spending = additions to fixed assets (gross fixed capital formation) + change in stock (inventory investment). Consumption and net exports are other parts of final expenditure; depreciation and taxes are adjustments.',
}));
Q('m_nx_neg', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Imagined Tamrapatna exports goods and services worth ₹${TAM.exports} crore and imports goods and services worth ₹${TAM.imports} crore. What is its net export, and what does it do to domestic product at market price?`,
  opts: [
    `₹${TAM_NX} crore; it lowers domestic product by ₹${-TAM_NX} crore`,
    `₹${-TAM_NX} crore; it raises domestic product by ₹${-TAM_NX} crore`,
    `₹${TAM.exports + TAM.imports} crore; it raises domestic product`,
    `Zero; trade does not affect domestic product`,
  ],
  sol: `Net exports = ${TAM.exports} − ${TAM.imports} = ${TAM_NX}. A negative figure means part of home spending went on foreign output, so adding net exports reduces domestic product at market price by ₹${-TAM_NX} crore.`,
}));
Q('m_exp_exclude', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A statistician in an imagined state is listing items for the expenditure method. Which item must she leave out?',
  opts: [
    'Old-age pensions paid by the state government',
    'Purchase of new tractors by farmers',
    'Salaries of government doctors',
    'Exports of handloom saris',
  ],
  sol: 'Old-age pensions are transfer payments; the spending of the pensioners is already counted when they buy goods. Tractors are capital formation, doctors\' salaries are government final consumption and exports are part of net exports.',
}));
Q('m_exp_tamra', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Imagined Tamrapatna (₹ crore): private final consumption ${inr(TAM.pfce)}; government final consumption ${TAM.gfce}; gross domestic fixed capital formation ${TAM.gdfcf}; change in stock ${TAM.dstock}; exports ${TAM.exports}; imports ${TAM.imports}. What is its gross domestic product at market price?`,
  opts: [`₹${inr(TAM_GDPMP)} crore`, `₹${inr(TAM_GDPMP - 2 * TAM.dstock)} crore`, `₹${inr(TAM_GDPMP + TAM.imports)} crore`, `₹${inr(TAM_GDPMP - TAM_NX)} crore`],
  sol: `GDP at market price = ${inr(TAM.pfce)} + ${TAM.gfce} + (${TAM.gdfcf} − 40) + (${TAM.exports} − ${TAM.imports}) = ${inr(TAM.pfce)} + ${TAM.gfce} + ${TAM_GDCF} + (${TAM_NX}) = ${inr(TAM_GDPMP)}, that is ₹${inr(TAM_GDPMP)} crore. Treating the fall in stock as a rise gives ${inr(TAM_GDPMP - 2 * TAM.dstock)}; forgetting to subtract imports gives ${inr(TAM_GDPMP + TAM.imports)}; leaving out net exports altogether gives ${inr(TAM_GDPMP - TAM_NX)}.`,
}));
Q('ar_imports_sub', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Imports are subtracted when domestic product is estimated by the expenditure method.',
  r: 'Imports are usually paid for in foreign currency.',
  sol: 'Both are true, but R does not explain A. Imports are subtracted because they are produced outside the domestic territory, so spending on them creates no domestic output; the currency used to pay for them is not the reason.',
}));
Q('tf_second_hand_exp', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? When a family in Indore buys a five-year-old car from a neighbour, the full price is added to private final consumption expenditure for the year.',
  sol: 'False. The car was produced and counted in the year it was made; buying it again only transfers an existing good. Only a dealer\'s commission, if any, is a new service and is counted.',
}));
Q('n_tamra_gdcf', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: TAM_GDCF, unit: '₹ crore',
  stem: `In imagined Tamrapatna, gross domestic fixed capital formation is ₹${TAM.gdfcf} crore and stocks fell by ₹${-TAM.dstock} crore during the year. Find gross domestic capital formation (in ₹ crore).`,
  sol: `Gross domestic capital formation = ${TAM.gdfcf} + (${TAM.dstock}) = ${TAM_GDCF}, that is ₹${TAM_GDCF} crore.`,
}));
Q('n_kaval', num({
  t: 3, d: 3, c: 'application', marks: 2, value: KAV_NI, unit: '₹ crore',
  stem: `Imagined Kavalpur (₹ crore): private final consumption ${inr(KAV.pfce)}; government final consumption ${KAV.gfce}; gross domestic capital formation ${KAV.gdcf}; net exports ${KAV.nx}; consumption of fixed capital ${KAV.cfc}; net indirect taxes ${KAV.nit}; net factor income from abroad ${KAV.nfia}. Find national income (in ₹ crore).`,
  sol: `GDP at market price = ${inr(KAV.pfce)} + ${KAV.gfce} + ${KAV.gdcf} + ${KAV.nx} = ${inr(KAV_GDPMP)}. National income = ${inr(KAV_GDPMP)} − ${KAV.cfc} − ${KAV.nit} + ${KAV.nfia} = ${inr(KAV_NI)}, that is ₹${inr(KAV_NI)} crore.`,
  scheme: [['Gross domestic product at market price', 1], ['National income', 1]],
}));
Q('s_gcf_parts', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does gross domestic capital formation include? Give an example of each part from a cement company.',
  model: '1. **Gross domestic fixed capital formation**: spending on new fixed assets, such as a new kiln or trucks bought by the cement company.\n2. **Change in stock**: the rise in unsold cement bags and stored limestone over the year.',
  sol: 'Fixed capital formation and change in stock, with examples.',
  scheme: [['Fixed capital formation with example', 1], ['Change in stock with example', 1]],
}));
Q('s_nx', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why are net exports, and not total exports, added in the expenditure method? Explain with an example.',
  model: 'Spending on domestic output includes **exports**, bought by foreigners, but home spending also buys **imports**, which are produced abroad. So imports are **subtracted**. For example, if a country exports ₹100 crore and imports ₹130 crore, net exports of −₹30 crore are added.',
  sol: 'Exports add, imports subtract; net exports in an example.',
  scheme: [['Reason for subtracting imports', 1], ['Example', 1]],
}));
Q('s3_tamra_ni', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For imagined Tamrapatna (₹ crore), GDP at market price is ${inr(TAM_GDPMP)}, consumption of fixed capital ${TAM.cfc}, net indirect taxes ${TAM.nit} and net factor income from abroad ${TAM.nfia}. Find GNP at market price and national income, showing each step.`,
  model: `GNP at market price = GDP at market price + net factor income from abroad = ${inr(TAM_GDPMP)} + (${TAM.nfia}) = **₹${inr(TAM_GNPMP)} crore**. NDP at market price = ${inr(TAM_GDPMP)} − ${TAM.cfc} = ${inr(TAM_NDPMP)}; NDP at factor cost = ${inr(TAM_NDPMP)} − ${TAM.nit} = ${inr(TAM_NDPFC)}. National income = ${inr(TAM_NDPFC)} + (${TAM.nfia}) = **₹${inr(TAM_NI)} crore**.`,
  sol: 'Add factor income from abroad for GNP; subtract depreciation and net indirect taxes for national income.',
  scheme: [['GNP at market price', 1], ['Net domestic product at factor cost', 1], ['National income', 1]],
}));
Q('s3_exp_steps', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the steps followed in estimating national income by the expenditure method.',
  model: '1. **Identify** the economic units that make final expenditure: households, government, producers and the rest of the world.\n2. **Classify and estimate** final expenditure as private and government final consumption, gross domestic capital formation and net exports; their sum is GDP at market price.\n3. **Adjust**: subtract consumption of fixed capital and net indirect taxes, and add net factor income from abroad, to reach national income.',
  sol: 'Identify units; classify and add final expenditure; adjust to national income.',
  scheme: [['Identify units making final expenditure', 1], ['Classify, estimate and add', 1], ['Adjust to national income', 1]],
}));
Q('l_exp_full', long({
  t: [3, 4], d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about imagined Tamrapatna (₹ crore). [3 + 2]\n\n| Item | Value |\n|---|---|\n| Private final consumption expenditure | ${inr(TAM.pfce)} |\n| Government final consumption expenditure | ${TAM.gfce} |\n| Gross domestic fixed capital formation | ${TAM.gdfcf} |\n| Change in stock | ${TAM.dstock} |\n| Exports | ${TAM.exports} |\n| Imports | ${TAM.imports} |\n| Consumption of fixed capital | ${TAM.cfc} |\n| Net indirect taxes | ${TAM.nit} |\n| Net factor income from abroad | ${TAM.nfia} |\n| Old-age pensions paid by the government | ${TAM.pension} |\n\n(a) Calculate national income by the expenditure method. [3]\n(b) Explain why one item in the table is not used, and state one other precaution of this method. [2]`,
  model: `(a) Gross domestic capital formation = ${TAM.gdfcf} + (${TAM.dstock}) = ${TAM_GDCF}; net exports = ${TAM.exports} − ${TAM.imports} = ${TAM_NX}.\nGDP at market price = ${inr(TAM.pfce)} + ${TAM.gfce} + ${TAM_GDCF} + (${TAM_NX}) = **${inr(TAM_GDPMP)}**.\nNDP at factor cost = ${inr(TAM_GDPMP)} − ${TAM.cfc} − ${TAM.nit} = ${inr(TAM_NDPFC)}.\nNational income = ${inr(TAM_NDPFC)} + (${TAM.nfia}) = **₹${inr(TAM_NI)} crore**.\n(b) **Old-age pensions** are **transfer payments**: the government receives no good or service in return, and the pensioners' own spending is already part of private consumption, so counting the pensions would add the same rupees twice. Another precaution: **purchases of second-hand goods** are excluded, because those goods were counted when they were first produced.`,
  sol: 'Build capital formation and net exports, add, then adjust to national income; justify the excluded transfer and add a precaution.',
  scheme: [['Capital formation and net exports', 1], ['GDP at market price', 1], ['National income', 1], ['Transfer excluded with reason', 1], ['Second precaution', 1]],
}));

// ================================================================ t04 Precautions and difficulties
Q('m_transfer_excl', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is an unemployment allowance paid by an imagined state government excluded from national income?',
  opts: [
    'It is a transfer payment for which no good or service is produced',
    'It is paid only to people living in cities',
    'It is too small to affect the total',
    'It is paid out of taxes collected last year',
  ],
  sol: 'National income counts incomes earned in production. An allowance is received without supplying any factor service, so it is a transfer and is left out; where it is paid from, or its size, does not matter.',
}));
Q('m_shares', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An investor in an imagined city buys shares of a cement company worth ₹2 lakh through a broker who charges ₹1,000. What is included in national income?',
  opts: ['Only the broker\'s commission of ₹1,000', 'The full ₹2 lakh paid for the shares', '₹2 lakh plus the ₹1,000 commission', 'Nothing at all'],
  sol: 'Buying shares only changes who owns a financial asset; no good or service is produced, so the ₹2 lakh is left out. The broker provides a service in the year, so the commission is included.',
}));
Q('m_imputed_rent', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A family in an imagined town in Kerala lives in a house it owns. How is the housing service it enjoys treated in national income?',
  opts: [
    'Its imputed rent is estimated and included',
    'It is excluded, because no rent is paid',
    'The market value of the house is included every year',
    'It is included only if the family takes a housing loan',
  ],
  sol: 'An owner-occupied house still provides a housing service. Its value is imputed at the rent a tenant would pay and included, so that national income does not change just because a house is owned rather than rented.',
}));
Q('m_own_account', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A farmer in an imagined village in Bihar keeps part of his rice harvest to feed his family. How is this rice treated?',
  opts: [
    'It is valued at the market price and included as production for self-consumption',
    'It is excluded because it is never sold',
    'It is included only when the family sells it later',
    'It is treated as a transfer from the farmer to his family',
  ],
  sol: 'The rice is produced in the year whether sold or kept. Production for self-consumption is valued at market price and included in national income.',
}));
Q('m_housewife', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Cooking and cleaning done by a homemaker for her own family in an imagined Jaipur household are not counted in national income mainly because',
  opts: [
    'they are difficult to value, as no market transaction takes place',
    'they are not useful to the family',
    'homemakers do not pay income tax',
    'they are done for less than eight hours a day',
  ],
  sol: 'These services are valuable, but they are not bought or sold, and estimating their value is very difficult, so by convention they are left out. This is one reason national income understates total production.',
}));
Q('m_second_hand_comm', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A dealer in an imagined town buys an old motorcycle for ₹40,000 and sells it a week later for ₹46,000. What is added to national income?',
  opts: ['₹6,000, the dealer\'s margin for his service', '₹46,000, the selling price', '₹86,000, both prices', 'Nothing, as the motorcycle is old'],
  sol: 'The motorcycle was counted when it was first made, so its price is not counted again. The dealer\'s margin of ₹46,000 − ₹40,000 = ₹6,000 rewards a service produced this year and is included.',
}));
Q('ar_own_account', ar({
  t: 4, d: 2, c: 'analysis', key: 'c',
  a: 'Vegetables grown by a family in its backyard and eaten at home are included in national income.',
  r: 'Only goods that are sold in the market are counted in national income.',
  sol: 'A is true: production for self-consumption is valued and included. R is false: if only marketed goods were counted, such output would be left out.',
}));
Q('tf_windfall', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A lottery prize of ₹10 lakh won by a teacher in Kochi is included in national income because it adds to her income.',
  sol: 'False. A lottery prize is a windfall gain, not a reward for any productive service, so it is excluded from national income.',
}));
Q('ord_exp_steps', ord({
  t: [3, 4], d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps a statistician in an imagined state follows to estimate national income by the expenditure method.',
  items: [
    'Identify the units that make final expenditure',
    'Classify final expenditure into consumption, capital formation and net exports',
    'Estimate and add the components to get GDP at market price',
    'Subtract depreciation and net indirect taxes, then add net factor income from abroad',
  ],
  sol: 'Units first, then the classes of final expenditure, then their total at market price, and last the adjustments that turn the total into national income.',
}));
Q('mt_treatment', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each transaction in an imagined town with its correct treatment in national income.',
  pairs: [
    ['Old-age pension paid by the state', 'Excluded: transfer payment'],
    ['Rent a family would pay for the flat it owns', 'Included: imputed rent'],
    ['Broker\'s fee on a sale of bonds', 'Included: payment for a service'],
    ['Purchase of bonds of a power company', 'Excluded: financial asset'],
  ],
  sol: 'Pensions and financial assets create no new output; imputed rent and the broker\'s service are production of the year.',
}));
Q('s_india_difficulties', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two difficulties in measuring national income in India.',
  model: '1. **Non-monetised sector**: much farm output is kept for self-consumption or bartered, so its value must be estimated.\n2. **Lack of reliable data**: many small producers keep no accounts, so incomes and output in the informal sector are hard to record.',
  sol: 'Any two: non-monetised output, lack of data or accounts, informal sector, illiteracy, unrecorded incomes.',
  scheme: [['First difficulty', 1], ['Second difficulty', 1]],
}));
Q('s_kind_vs_loan', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A firm gives its workers free bus passes and also gives them interest-free loans. Explain why one is part of national income and the other is not.',
  model: '**Free bus passes** are a reward for work paid in kind, so they are part of **compensation of employees** and included. An **interest-free loan** must be **repaid**; it is not a payment for any service, so it is not income and is excluded.',
  sol: 'Payment in kind against a repayable loan.',
  scheme: [['Bus passes included as payment in kind', 1], ['Loan excluded as repayable, not a reward', 1]],
}));
Q('s3_treatment_three', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Giving reasons, state whether each is included in national income: (i) free medical care given by a factory to its workers; (ii) gifts of money sent by a relative within India; (iii) interest received by a bank on loans to firms.',
  model: '(i) **Included**: it is a reward for work paid in kind, part of compensation of employees.\n(ii) **Excluded**: it is a transfer payment; nothing is produced in return.\n(iii) **Included**: interest on loans to firms is a factor payment for capital used in production.',
  sol: 'Payment in kind; transfer; factor income for capital.',
  scheme: [['(i) with reason', 1], ['(ii) with reason', 1], ['(iii) with reason', 1]],
}));
Q('s3_precaution_va', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three precautions to be taken while estimating national income by the value-added method.',
  model: '1. **Avoid double counting**: count only value added, not the full value of output of every firm.\n2. **Exclude second-hand goods**, but include commissions earned on their sale.\n3. **Include production for self-consumption**, such as farm produce kept by farmers, and the **imputed rent** of owner-occupied houses.',
  sol: 'Double counting; second-hand goods; self-consumption and imputed rent.',
  scheme: [['First precaution', 1], ['Second precaution', 1], ['Third precaution', 1]],
}));
Q('s3_why_omit_home', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Unpaid work done at home is left out of national income. Evaluate how this affects comparisons of national income over time in a country where more women are taking paid jobs.',
  model: 'Unpaid cooking, cleaning and caring are **not counted**. When a woman takes a paid job and the family **hires** help or **buys** prepared food, those services become **market transactions** and enter national income. Part of the measured rise is therefore a **shift of existing work into the market**, not a true rise in production, so growth over time is **overstated**.',
  sol: 'Moving work from home to market raises measured income more than real output.',
  scheme: [['Home work not counted', 1], ['Same services enter when bought', 1], ['Growth overstated as a result', 1]],
}));
Q('l_precautions', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Answer both parts. [3 + 2]\n\n(a) State one precaution for each of the three methods of measuring national income. [3]\n(b) Explain two difficulties in measuring national income in India. [2]',
  model: '(a) **Value-added method**: avoid **double counting** by subtracting intermediate consumption, and include production for self-consumption.\n**Income method**: exclude **transfer payments** such as pensions and scholarships, and windfall gains such as lottery prizes.\n**Expenditure method**: exclude spending on **second-hand goods** and **financial assets** such as shares, and include only final expenditure, not spending on intermediate goods.\n(b) **Non-monetised output**: a large part of output, especially in villages, is kept for self-use or exchanged by barter, and its value has to be guessed. **Inadequate data**: many small producers and self-employed workers keep no accounts and income is often under-reported, so estimates of the informal sector are rough.',
  sol: 'One precaution per method; two Indian difficulties.',
  scheme: [['Value-added precaution', 1], ['Income-method precaution', 1], ['Expenditure-method precaution', 1], ['First difficulty explained', 1], ['Second difficulty explained', 1]],
}));
Q('l_three_methods', long({
  t: [1, 2, 3], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `In the imagined Mandya sweets chain (₹ crore), cane worth ${MAN.cane} goes to a jaggery unit, jaggery worth ${MAN.jaggery} goes to a sweet shop, and households buy sweets worth ${MAN.sweets}. The three firms together pay wages ${MAN.wages}, rent ${MAN.rent}, interest ${MAN.interest} and profit ${MAN.profit}. The grower buys no inputs. [3 + 2]\n\n(a) Measure the chain's output by all three methods. [3]\n(b) Explain why the three answers must be the same. [2]`,
  model: `(a) **Value-added method**: ${MAN.cane} + (${MAN.jaggery} − ${MAN.cane}) + (${MAN.sweets} − ${MAN.jaggery}) = ${MAN_VA.join(' + ')} = **₹${MAN_VA_TOTAL} crore**.\n**Income method**: ${MAN.wages} + ${MAN.rent} + ${MAN.interest} + ${MAN.profit} = **₹${MAN_INCOME} crore**.\n**Expenditure method**: final spending by households on sweets = **₹${MAN.sweets} crore**. Sales of cane and jaggery are intermediate and are not added.\n(b) The value added at each stage is **paid out as factor incomes**, so total value added equals total income. That income is **spent** on the final output, so it equals final expenditure. The three methods measure the **same flow** at three points of the circular flow: production, income and spending.`,
  sol: 'Value added, factor incomes and final spending all equal 800; the circular flow explains why.',
  scheme: [['Value-added total', 1], ['Income total', 1], ['Expenditure total', 1], ['Value added paid out as income', 1], ['Income spent on final output', 1]],
}));

// ================================================================ ISC paper style (bank only): 4-mark and 8-mark
Q('s4_cotton_isc', short({
  t: 1, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts about the imagined Vidarbha garment unit (₹ lakh). [2 + 2]\n\n(i) It sold garments worth ${inr(COT[3].sales)}, added ${COT[3].dstock} to its stock and bought yarn worth ${inr(COT[3].ic)}. Find its gross value added at market price.\n(ii) Its depreciation is ${GAR.dep}, indirect taxes ${GAR.itax} and subsidy ${GAR.subsidy}. Find its net value added at factor cost.`,
  model: `(i) Value of output = ${inr(COT[3].sales)} + ${COT[3].dstock} = ${inr(COT[3].vo)}. Gross value added at market price = ${inr(COT[3].vo)} − ${inr(COT[3].ic)} = **₹${COT[3].gva} lakh**, because the yarn is used up in making the garments.\n(ii) Net indirect taxes = ${GAR.itax} − ${GAR.subsidy} = ${GAR_NIT}. Net value added at factor cost = ${COT[3].gva} − ${GAR.dep} − ${GAR_NIT} = **₹${GAR_NVAFC} lakh**. Depreciation is removed to make it net, and net indirect taxes to move from market price to factor cost.`,
  sol: 'Value of output, gross value added, then net factor-cost value added.',
  scheme: [['(i) Value of output', 1], ['(i) Gross value added', 1], ['(ii) Net indirect taxes', 1], ['(ii) Net value added at factor cost', 1]],
}));
Q('s4_konark_isc', short({
  t: 2, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Konark (₹ crore). [2 + 2]\n\n(i) Domestic income is ${inr(KON.ndpfc)}, compensation of employees ${inr(KON.coe)}, rent ${KON.rent}, interest ${KON.interest} and mixed income ${KON.mixed}. Find profit.\n(ii) A survey shows that many self-employed artisans did not report their earnings. Explain how this affects the estimate of profit found in (i).`,
  model: `(i) Profit = ${inr(KON.ndpfc)} − ${inr(KON.coe)} − ${KON.rent} − ${KON.interest} − ${KON.mixed} = **₹${KON_PROFIT} crore**, the part of domestic income left after the other factor incomes.\n(ii) If artisans' earnings are missing, **mixed income is understated**. When domestic income is estimated independently, from output, the remainder shown as **profit is overstated**, because unreported mixed income is wrongly counted as profit. The estimate of profit therefore depends on how complete the other figures are.`,
  sol: 'Profit as the remainder; under-reporting shifts income into the remainder.',
  scheme: [['(i) Method', 1], ['(i) Value', 1], ['(ii) Mixed income understated', 1], ['(ii) Remainder overstated', 1]],
}));
Q('s4_shivgarh_isc', short({
  t: [3, 4], d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts about imagined Shivgarh (₹ crore). [2 + 2]\n\n(i) From private final consumption ${SHI.pfce}, government final consumption ${SHI.gfce}, gross domestic capital formation ${SHI.gdcf}, exports ${SHI.exports}, imports ${SHI.imports}, old-age pensions ${SHI.oldAge}, purchase of shares ${SHI.sharesBought} and purchase of second-hand buses ${SHI.secondHand}, find GDP at market price.\n(ii) Give the reason for leaving out each of the last three items.`,
  model: `(i) GDP at market price = ${SHI.pfce} + ${SHI.gfce} + ${SHI.gdcf} + ${SHI.exports} − ${SHI.imports} = **₹${inr(SHI_GDPMP)} crore**.\n(ii) **Old-age pensions** are transfers with nothing produced in return. **Shares** are financial assets; buying them only changes ownership of a claim. **Second-hand buses** were counted in the year they were made, so buying them again adds no new output.`,
  sol: 'Final expenditure only; reasons for three exclusions.',
  scheme: [['(i) Correct items added', 1], ['(i) Value', 1], ['(ii) Pensions and shares explained', 1], ['(ii) Second-hand buses explained', 1]],
}));
Q('l8_methods_isc', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the value-added method of measuring national income, including the precautions taken.\n(ii) For the imagined Mandya sweets chain (₹ crore: cane ${MAN.cane}, jaggery ${MAN.jaggery}, sweets ${MAN.sweets}; wages ${MAN.wages}, rent ${MAN.rent}, interest ${MAN.interest}, profit ${MAN.profit}; the grower buys no inputs), show that the value-added and income methods give the same total, and explain what would go wrong if sales were simply added.`,
  model: `(i) The **value-added method** measures the contribution of each producing unit. Units are grouped into primary, secondary and tertiary sectors. For each, **value of output** (sales plus change in stock) is found, and **intermediate consumption** is subtracted to give gross value added at market price. Adding over all units gives GDP at market price; subtracting depreciation and net indirect taxes and adding net factor income from abroad gives national income. **Precautions**: avoid **double counting**; leave out **second-hand goods** but count commissions on them; include **production for self-consumption** and **imputed rent**.\n(ii) Value added = ${MAN.cane} + ${MAN_VA[1]} + ${MAN_VA[2]} = **₹${MAN_VA_TOTAL} crore**. Factor incomes = ${MAN.wages} + ${MAN.rent} + ${MAN.interest} + ${MAN.profit} = **₹${MAN_INCOME} crore**, the same, because every rupee of value added is paid out as rent, wages, interest or profit. Adding sales gives ${MAN.cane} + ${MAN.jaggery} + ${MAN.sweets} = ₹${inr(MAN_SALES)} crore, which counts the cane twice and the jaggery once more inside the price of sweets: an overstatement of ₹${MAN_SALES - MAN.sweets} crore.`,
  sol: 'Method with steps and precautions; equal totals; size of the double counting.',
  scheme: [['(i) Value of output and value added', 1], ['(i) Steps to national income', 1], ['(i) Double counting precaution', 1], ['(i) Two further precautions', 1], ['(ii) Value-added total', 1], ['(ii) Income total', 1], ['(ii) Reason they are equal', 1], ['(ii) Overstatement from adding sales', 1]],
}));
Q('l8_kavalpur_isc', long({
  t: [3, 4], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Imagined Kavalpur (₹ crore) has private final consumption ${inr(KAV.pfce)}, government final consumption ${KAV.gfce}, gross domestic capital formation ${KAV.gdcf}, net exports ${KAV.nx}, consumption of fixed capital ${KAV.cfc}, net indirect taxes ${KAV.nit} and net factor income from abroad ${KAV.nfia}. Calculate GDP at market price and national income, explaining each adjustment.\n(ii) A columnist argues that the expenditure method is the most reliable in a country like India. Evaluate this view.`,
  model: `(i) GDP at market price = ${inr(KAV.pfce)} + ${KAV.gfce} + ${KAV.gdcf} + ${KAV.nx} = **₹${inr(KAV_GDPMP)} crore**, the total of final spending on domestic output. Subtracting consumption of fixed capital (${KAV.cfc}) removes the wear and tear of machines; subtracting net indirect taxes (${KAV.nit}) moves from market prices to the incomes of factors; adding net factor income from abroad (${KAV.nfia}) moves from domestic to national. National income = ${inr(KAV_GDPMP)} − ${KAV.cfc} − ${KAV.nit} + ${KAV.nfia} = **₹${inr(KAV_NI)} crore**.\n(ii) In favour: big items such as **government spending, investment and trade** are well recorded in budgets, company accounts and customs data. Against: **household consumption** in villages and the informal sector is hard to observe, much output is **kept for self-use**, and spending surveys are occasional. So the method is reliable for the organised parts but not for all. In practice the methods are **used together**, each checking the others, which is more reliable than any one alone.`,
  sol: 'Calculation with reasons for each adjustment; a balanced judgement.',
  scheme: [['(i) GDP at market price', 1], ['(i) Depreciation adjustment explained', 1], ['(i) Net indirect taxes and factor income explained', 1], ['(i) National income', 1], ['(ii) Point in favour', 1], ['(ii) First limitation', 1], ['(ii) Second limitation', 1], ['(ii) Reasoned judgement', 1]],
}));

// ================================================================ case-based
Q('cb_cotton', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined note from the statistics office of a district in Vidarbha and answer the questions that follow. *(Written by SOYL for practice; the firms and figures are imagined.)*',
  passage: `**District statistics office, note on the cotton chain (imagined, ₹ lakh)**\n\nThis year the district's cotton farm sold cotton worth ${COT[0].sales} after buying seeds and fertiliser worth ${COT[0].ic}. The ginning unit sold lint worth ${COT[1].sales}, adding ${COT[1].dstock} to its stock. The spinning mill sold yarn worth ${inr(COT[2].sales)}, while its stock fell by ${-COT[2].dstock}. The garment unit sold garments worth ${inr(COT[3].sales)} and added ${COT[3].dstock} to its stock. Each unit bought all its main input from the unit before it. A junior clerk reported the district's output as the sum of all values of output, ₹${inr(COT_VO)} lakh.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: COT[2].gva, unit: '₹ lakh', stem: 'Find the gross value added of the spinning mill (in ₹ lakh).', sol: `Value of output = ${inr(COT[2].sales)} − ${-COT[2].dstock} = ${COT[2].vo}; GVA = ${COT[2].vo} − ${COT[2].ic} = ${COT[2].gva}, that is ₹${COT[2].gva} lakh.` })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: COT_GVA, unit: '₹ lakh', stem: 'Find the gross value added of the whole chain (in ₹ lakh).', sol: `Total = ${COT.map((f) => f.gva).join(' + ')} = ${inr(COT_GVA)}, that is ₹${inr(COT_GVA)} lakh.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the clerk\'s error and its size.', model: `He added each unit's full value of output, so the cotton, lint and yarn bought as inputs were **counted again** in later units. The correct figure is ₹${inr(COT_GVA)} lakh, so he **overstated** output by ${inr(COT_VO)} − ${inr(COT_GVA)} = **₹${inr(COT_VO - COT_GVA)} lakh**.`, sol: 'Double counting and its size.', scheme: [['Double counting identified', 1], ['Size of the overstatement', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the fall in the spinning mill\'s stock is subtracted from its sales.', model: 'Part of the yarn sold this year was **made in an earlier year** and came out of stock. Value of output measures **this year\'s production**, so the fall in stock is subtracted from sales.', sol: 'Output of the year, not sales.', scheme: [['Some sales came from old stock', 1], ['Output of the year only', 1]] }),
    ]),
  ],
}));
Q('cb_suvarna', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined summary prepared by the finance department of Suvarnagiri and answer the questions that follow. *(Written by SOYL for practice; the economy and figures are imagined.)*',
  passage: `**Suvarnagiri: incomes of the year (imagined, ₹ crore)**\n\n| Item | Value |\n|---|---|\n| Wages and salaries | ${inr(SUV.wages)} |\n| Employers' social security contributions | ${SUV.ssc} |\n| Rent and royalty | ${SUV.rent} |\n| Interest | ${SUV.interest} |\n| Profit (corporation tax, dividends, undistributed) | ${SUV_PROFIT} |\n| Mixed income of the self-employed | ${SUV.mixed} |\n| Scholarships paid by the government | ${SUV.scholarship} |\n\nThe department's draft added every row of the table to find domestic income.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: SUV_OS, unit: '₹ crore', stem: 'Find operating surplus (in ₹ crore).', sol: `Operating surplus = ${SUV.rent} + ${SUV.interest} + ${SUV_PROFIT} = ${SUV_OS}, that is ₹${SUV_OS} crore.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: SUV_NDPFC, unit: '₹ crore', stem: 'Find the correct domestic income (in ₹ crore).', sol: `Domestic income = ${inr(SUV_COE)} + ${SUV_OS} + ${SUV.mixed} = ${inr(SUV_NDPFC)}, that is ₹${inr(SUV_NDPFC)} crore.` })),
    child('c', short({ t: [2, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the error in the draft and explain it.', model: `The draft added **scholarships** of ₹${SUV.scholarship} crore. They are **transfer payments**, received without supplying any factor service, so the draft overstated domestic income by ₹${SUV.scholarship} crore.`, sol: 'Transfer wrongly included.', scheme: [['Scholarships identified', 1], ['Transfer explained with effect', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain why the self-employed are shown separately rather than under wages or profit.', model: 'The self-employed use **their own labour, land and capital** together, so their earnings mix wages, rent, interest and profit that **cannot be separated** reliably. They are therefore shown as **mixed income**.', sol: 'Earnings combine several factor rewards.', scheme: [['Own factors combined', 1], ['Hence mixed income', 1]] }),
    ]),
  ],
}));
Q('cb_tamra', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined report from the planning board of Tamrapatna and answer the questions that follow. *(Written by SOYL for practice; the country and figures are imagined.)*',
  passage: `**Tamrapatna planning board: spending in the year (imagined, ₹ crore)**\n\nHouseholds spent ${inr(TAM.pfce)} on consumer goods and services, and the government spent ${TAM.gfce} on salaries and supplies for its services. Firms added ${TAM.gdfcf} of new machines and buildings, but unsold stocks fell by ${-TAM.dstock}. Foreigners bought exports worth ${TAM.exports}, while imports cost ${TAM.imports}. The board also notes that ${TAM.pension} was paid out as old-age pensions.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: TAM_GDCF, unit: '₹ crore', stem: 'Find gross domestic capital formation (in ₹ crore).', sol: `GDCF = ${TAM.gdfcf} − ${-TAM.dstock} = ${TAM_GDCF}, that is ₹${TAM_GDCF} crore.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: TAM_GDPMP, unit: '₹ crore', stem: 'Find GDP at market price (in ₹ crore).', sol: `GDP at market price = ${inr(TAM.pfce)} + ${TAM.gfce} + ${TAM_GDCF} + (${TAM_NX}) = ${inr(TAM_GDPMP)}, that is ₹${inr(TAM_GDPMP)} crore.` })),
    child('c', short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the pensions mentioned by the board are not added.', model: `Pensions of ₹${TAM.pension} crore are **transfer payments**: no good or service is supplied in return. When pensioners spend them, that spending is **already in household consumption**, so adding the pensions would count it twice.`, sol: 'Transfer; spending already counted.', scheme: [['Transfer payment', 1], ['Already counted in consumption', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the fall in stocks reduces GDP at market price.', model: 'A fall in stocks means some goods sold this year were **produced in earlier years**. Final spending on them is not output of this year, so the **negative change in stock** is included in capital formation and lowers GDP.', sol: 'Sales out of old stock are not this year\'s output.', scheme: [['Goods came from earlier output', 1], ['Negative change in stock lowers GDP', 1]] }),
    ]),
  ],
}));
