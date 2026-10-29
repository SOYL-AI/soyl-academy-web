// CBSE 12 Economics, ch01 National Income and Related Aggregates — question bank. Every scenario,
// table and passage is written by SOYL (imagined firms, countries and figures); no NCERT exercise or
// board/sample-paper item is reused. No Indian statistics are stated: every number is imagined and
// computed here (or checked by the assertions below), never typed by hand into an answer.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const sum = (...xs) => xs.reduce((a, b) => a + b, 0);

/** Value added by one firm: output = sales + change in stock; GVA at MP = output − intermediate consumption. */
export function valueAdded({ sales, dstock = 0, ic, dep = 0, nit = 0 }) {
  const output = sales + dstock;
  const gvaMP = output - ic;
  return { output, gvaMP, nvaMP: gvaMP - dep, nvaFC: gvaMP - dep - nit };
}
/** Expenditure method: GDP at MP = C + I (gross) + G + (X − M), then on to national income. */
export function expenditure({ c, i, g, x, m, dep = 0, nit = 0, nfia = 0 }) {
  const gdpMP = c + i + g + (x - m);
  const ndpMP = gdpMP - dep;
  const ndpFC = ndpMP - nit;
  return { nx: x - m, gdpMP, ndpMP, ndpFC, nnpFC: ndpFC + nfia, gnpMP: gdpMP + nfia };
}
/** Income method: NDP at FC = compensation of employees + operating surplus + mixed income. */
export function income({ coe, rent, interest, profit, mixed, nfia = 0 }) {
  const os = rent + interest + profit;
  const ndpFC = coe + os + mixed;
  return { os, ndpFC, nnpFC: ndpFC + nfia };
}
export const deflator = (nominal, real) => Math.round((nominal / real) * 1000) / 10;

// ---------------------------------------------------------------- figures used by the questions
const VA1 = valueAdded({ sales: 750, dstock: -30, ic: 420, dep: 25, nit: 15 }); // num_gva (₹ lakh)
const EXP1 = expenditure({ c: 2400, i: 600, g: 500, x: 300, m: 380 }); // num_gdp_exp (₹ crore)
const INC1 = income({ coe: 1100, rent: 150, interest: 120, profit: 330, mixed: 400 }); // num_ndp_inc
const AGG = { gdpMP: 5000, nfia: -60, dep: 300, it: 420, sub: 70 }; // l_aggregates (₹ crore)
const AGGnit = AGG.it - AGG.sub;
const AGGgnpMP = AGG.gdpMP + AGG.nfia;
const AGGnnpMP = AGGgnpMP - AGG.dep;
const AGGnnpFC = AGGnnpMP - AGGnit;
const AGGndpFC = AGG.gdpMP - AGG.dep - AGGnit;
const CASEF = { // cb_chain: three imagined firms in Assam (₹ thousand)
  estate: { sales: 400, ic: 0 },
  factory: { sales: 900, ic: 400 },
  retail: { sales: 1300, ic: 900 },
};
const CF = Object.fromEntries(Object.entries(CASEF).map(([k, v]) => [k, valueAdded(v).gvaMP]));
const CFtotal = sum(...Object.values(CF));
const CFsales = sum(...Object.values(CASEF).map((v) => v.sales));
const DEF1 = { nominal: 3300, real: 2750 }; // num_deflator
const DEF1v = deflator(DEF1.nominal, DEF1.real);
const REAL1 = { nominal: 6480, def: 120 }; // num_real
const REAL1v = (REAL1.nominal * 100) / REAL1.def;
const GOODS = { // cb_real: two goods, base year 2020 (imagined country Meghpur)
  y1: { rice: [500, 30], cloth: [200, 50] },
  y2: { rice: [550, 36], cloth: [240, 55] },
};
const nomY1 = GOODS.y1.rice[0] * GOODS.y1.rice[1] + GOODS.y1.cloth[0] * GOODS.y1.cloth[1];
const nomY2 = GOODS.y2.rice[0] * GOODS.y2.rice[1] + GOODS.y2.cloth[0] * GOODS.y2.cloth[1];
const realY2 = GOODS.y2.rice[0] * GOODS.y1.rice[1] + GOODS.y2.cloth[0] * GOODS.y1.cloth[1];
const defY2 = deflator(nomY2, realY2);
const NETINV = { gross: 840, dep: 95 };
const NFIA1 = { from: 260, to: 310 };
const CTRY = { coe: 2600, os: 1500, mixed: 900, nfia: 120, dep: 350, nit: 450 }; // cb_country (₹ crore)
const CTRYndpFC = CTRY.coe + CTRY.os + CTRY.mixed;
const CTRYnnpFC = CTRYndpFC + CTRY.nfia;
const CTRYgdpMP = CTRYndpFC + CTRY.dep + CTRY.nit;
const SUBS = { fc: 1250, it: 90, sub: 140 };
const SUBSmp = SUBS.fc + SUBS.it - SUBS.sub;

for (const [ok, what] of [
  [VA1.output === 720 && VA1.gvaMP === 300 && VA1.nvaFC === 260, 'VA1'],
  [EXP1.gdpMP === 3420, 'EXP1'],
  [INC1.os === 600 && INC1.ndpFC === 2100, 'INC1'],
  [AGGnit === 350 && AGGgnpMP === 4940 && AGGnnpMP === 4640 && AGGnnpFC === 4290 && AGGndpFC === 4350, 'AGG'],
  [CF.estate === 400 && CF.factory === 500 && CF.retail === 400 && CFtotal === 1300 && CFsales === 2600, 'CF'],
  [DEF1v === 120, 'DEF1'], [REAL1v === 5400, 'REAL1'],
  [nomY1 === 25000 && nomY2 === 33000 && realY2 === 28500 && defY2 === 115.8, 'GOODS'],
  [CTRYndpFC === 5000 && CTRYnnpFC === 5120 && CTRYgdpMP === 5800, 'CTRY'],
  [SUBSmp === 1200, 'SUBS'],
]) if (!ok) throw new Error(`figure check failed: ${what}`);

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Basic concepts
Q('m_macro', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Macroeconomics studies the economy',
  opts: ['as a whole, through aggregates such as national income, total employment and the general price level', 'through the choices of a single consumer or a single firm', 'only through the prices of individual goods', 'only through the accounts of the government'],
  sol: 'Macroeconomics deals with aggregates of the whole economy. Single consumers, firms and individual prices are the subject of microeconomics; government accounts are only one part of the economy.',
}));
Q('m_enduse', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Whether a good is classified as a **final** good or an **intermediate** good depends on',
  opts: ['the use to which it is put by its buyer', 'its physical nature, such as size or weight', 'its price in the market', 'whether it is produced by a large or a small firm'],
  sol: 'The same good can be final or intermediate: milk bought by a family is final, milk bought by a sweet shop is intermediate. So the test is end use, not nature, price or size of the producer.',
}));
Q('m_tractor', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Gurpreet, a farmer near Ludhiana, buys a new tractor to plough his fields for the next ten years. The tractor is',
  opts: ['a final good and a capital good', 'an intermediate good, because it helps produce wheat', 'a consumption good, because the farmer buys it', 'neither final nor intermediate, because it is not resold'],
  sol: 'A tractor is used again and again in production and is not used up or resold within the year, so it is a capital good, and capital goods are final goods. It is not intermediate (that would need it to be used up in one cycle) and it does not satisfy a consumer want directly.',
}));
Q('m_intermediate', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is an **intermediate** good?',
  opts: ['Steel sheets bought by a car maker in Pune', 'A car bought by a family in Pune', 'A welding machine bought by a car maker', 'Steel utensils bought by a household'],
  sol: 'Steel sheets are used up in making cars within the year and are resold as part of the car, so they are intermediate. The family car and household utensils are consumption goods, and the welding machine is a capital good; all three are final goods.',
}));
Q('m_flow', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following is a **flow** variable?',
  opts: ['National income of a year', 'The capital stock of a country on 31 March', 'The wealth of a family', 'The money supply on a given date'],
  sol: 'National income is measured over a period (a year), so it is a flow. Capital stock, wealth and money supply on a date are measured at a point of time, so they are stocks.',
}));
Q('m_depreciation', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Depreciation (consumption of fixed capital) is the fall in the value of fixed capital caused by',
  opts: ['normal wear and tear and expected obsolescence', 'a flood or an earthquake', 'a sudden change in technology that nobody expected', 'a fall in the share price of the company'],
  sol: 'Depreciation is the expected loss: normal wear and tear and expected obsolescence. Losses from natural disasters or unforeseen obsolescence are capital losses, and share prices are not about the physical capital used in production.',
}));
Q('ar_capital_final', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Machines bought by a firm for its own use are treated as final goods.',
  r: 'Machines are not used up or resold during the year; they are used repeatedly in production over many years.',
  sol: 'Both are true. Machines are final goods because they are not transformed or used up within the accounting year, which is exactly what R states, so R explains A.',
}));
Q('ar_income_flow', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'Income is a flow variable.',
  r: 'Income is measured at a particular point of time.',
  sol: 'A is true: income has a time dimension (per month, per year). R is false: being measured at a point of time is what defines a stock, not a flow.',
}));
Q('tf_milk', tf({
  t: 1, d: 1, c: 'application', ans: false,
  stem: 'True or false? Milk bought by a sweet shop in Kolkata to make rasgullas for sale is a final good.',
  sol: 'The sweet shop uses the milk up in making rasgullas, which it then sells, so the milk is an intermediate good here. Milk bought by a family for drinking would be final.',
}));
Q('fb_net_inv', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Net investment = gross investment − ___.',
  acc: [['depreciation', 'consumption of fixed capital']],
  sol: 'Net investment is gross investment minus depreciation (consumption of fixed capital).',
}));
Q('n_net_inv', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: NETINV.gross - NETINV.dep, unit: '₹ crore',
  stem: `An imagined economy's gross investment in a year is ₹${inr(NETINV.gross)} crore and depreciation is ₹${NETINV.dep} crore. Find net investment (in ₹ crore).`,
  sol: `Step 1: Net investment = gross investment − depreciation.\nStep 2: ${inr(NETINV.gross)} − ${NETINV.dep} = ${inr(NETINV.gross - NETINV.dep)}. So ₹${inr(NETINV.gross - NETINV.dep)} crore.`,
}));
Q('mt_stockflow', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each variable with its correct description.',
  pairs: [
    ['Capital of a firm on 31 March', 'Stock'],
    ['Investment during a year', 'Flow'],
    ['Wear and tear of machines', 'Depreciation'],
    ['Unsold goods added to stock in a year', 'Change in stock (inventory investment)'],
  ],
  sol: 'Capital on a date is a stock; investment per year is a flow; normal wear and tear is depreciation; the addition to unsold goods in a year is the change in stock, a part of investment.',
}));
Q('s_final_inter', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain the difference between final goods and intermediate goods, using the example of sugar.',
  model: '**Final goods** are bought for **final use** (consumption or investment) and are not resold or used up in further production in the year. **Intermediate goods** are **used up** in producing other goods. Sugar bought by a **household** for its tea is final; sugar bought by a **mithai shop** to make sweets for sale is intermediate.',
  sol: 'Define both by end use and show that the same good (sugar) can be either.',
  scheme: [['Both terms distinguished by end use', 1], ['Sugar example for each use', 1]],
}));
Q('s_stock_flow', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between stock and flow variables, giving one example of each.',
  model: 'A **stock** is measured **at a point of time** and has no time dimension, e.g. the **capital** of a firm on 31 March. A **flow** is measured **over a period of time**, e.g. **national income** or investment per year. Flows change stocks: investment during a year adds to the capital stock.',
  sol: 'Point of time vs period of time, with one correct example of each.',
  scheme: [['Stock: meaning with example', 1], ['Flow: meaning with example', 1]],
}));
Q('s3_gross_net', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A country\'s gross investment is positive, but its net investment is zero. What does this tell you about its capital stock? Explain with the relation between the two.',
  model: '1. **Gross investment = net investment + depreciation**, so here gross investment is **equal to depreciation**.\n2. All new machines and buildings only **replace** the capital that was **worn out** during the year.\n3. So the **capital stock stays the same**: the economy is not adding to its capacity to produce, even though it is spending on investment goods.',
  sol: 'Use the relation, conclude that gross investment just covers depreciation, and infer that capital stock is unchanged.',
  scheme: [['Relation stated', 1], ['Gross investment equals depreciation (only replacement)', 1], ['Capital stock unchanged, capacity not growing', 1]],
}));

// ================================================================ t02 Circular flow of income
Q('m_cf_assume', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the simple two-sector model of the circular flow of income, it is assumed that households',
  opts: ['spend all their income on goods and services produced by firms', 'save a part of their income in banks', 'pay taxes to the government', 'buy some goods from other countries'],
  sol: 'The two-sector model has only households and firms, no saving, no government and no foreign trade, so households spend their whole income on the output of firms.',
}));
Q('m_real_flow', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is part of the **real flow** in the circular flow of income?',
  opts: ['Factor services such as labour going from households to firms', 'Wages paid by firms to households', 'Consumption expenditure by households', 'Profits paid to the owners of firms'],
  sol: 'The real flow is the movement of factor services and of goods and services. Wages, consumption spending and profits are money flows.',
}));
Q('m_money_flow', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Ravi works in a biscuit factory in Kanpur and spends his salary on biscuits, clothes and rent. In the circular flow, his salary is',
  opts: ['a factor payment flowing from firms to households', 'a real flow from households to firms', 'a consumption expenditure flowing from households to firms', 'a leakage from the circular flow'],
  sol: 'A salary is a payment for labour, a factor service, so it is a factor payment (money flow) from firms to households. His spending on goods is consumption expenditure, which flows back to firms.',
}));
Q('ar_cf_equal', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'In a two-sector economy, total factor payments, total consumption expenditure and the value of output are equal.',
  r: 'Firms pay out the whole value of output as factor payments, and households spend the whole of this income on the output of firms.',
  sol: 'Both are true. Because value of output is fully paid out as factor incomes and fully spent on the same output, the three totals are equal; R gives exactly this reason.',
}));
Q('tf_cf_govt', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the two-sector circular flow model, firms sell a part of their output to the government.',
  sol: 'The two-sector model has only households and firms; there is no government sector, so firms sell all output to households.',
}));
Q('ord_cf', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of one turn of the circular flow in a two-sector economy, starting with households.',
  items: [
    'Households supply land, labour, capital and enterprise to firms',
    'Firms use these factor services to produce goods and services',
    'Firms pay rent, wages, interest and profit to households',
    'Households spend this income on the goods and services of firms',
  ],
  sol: 'Factor services go first to firms, firms produce, factor incomes are paid to households, and households spend the income on the output, which returns the money to firms.',
}));
Q('s_real_money', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the real flow and the money flow in the circular flow of income.',
  model: '1. **Real flow:** the movement of **factor services** from households to firms and of **goods and services** from firms to households.\n2. **Money flow:** the movement of **factor payments** (rent, wages, interest, profit) from firms to households and of **consumption expenditure** from households to firms. The two flow in **opposite directions**.',
  sol: 'Define each flow with what moves and its direction.',
  scheme: [['Real flow explained', 1], ['Money flow explained', 1]],
}));
Q('s3_three_methods', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Using the circular flow, explain why national income can be measured at three different points and why all three give the same total.',
  model: '1. **Production point:** firms produce goods and services; adding the **value added** by all firms gives the product measure.\n2. **Income point:** the whole value added is paid out as **factor incomes** (rent, wages, interest, profit); adding them gives the income measure.\n3. **Expenditure point:** households spend this income on the **final goods** of firms. Since the **same flow** of money passes each point, product = income = expenditure.',
  sol: 'Name the three points of the flow and argue that they measure one and the same flow.',
  scheme: [['Product point', 1], ['Income point', 1], ['Expenditure point and why the totals are equal', 1]],
}));
Q('l_circular', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the circular flow of income in a two-sector economy. State its assumptions and the real and money flows.',
  model: '1. **Assumptions:** only **two sectors**, households and firms; households **spend all** their income (no saving); **no government** and **no foreign trade**.\n2. **Households** own the factors of production and supply **factor services** to firms (real flow).\n3. **Firms** pay **factor payments** (rent, wages, interest, profit) to households (money flow).\n4. Firms produce **goods and services** that go to households (real flow), and households pay **consumption expenditure** to firms (money flow).\n5. The flows move in **opposite directions** and never stop, so **income = expenditure = value of output**: national income is a circular flow.',
  sol: 'Assumptions, the two real flows, the two money flows, and the conclusion that the totals are equal.',
  scheme: [['Assumptions', 1], ['Factor services and factor payments', 1], ['Goods and consumption expenditure', 1], ['Opposite directions of real and money flows', 1], ['Conclusion: income = expenditure = output', 1]],
}));

// ================================================================ t03 Methods of calculating national income
Q('m_va_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Gross value added at market price by a firm equals',
  opts: ['value of output minus intermediate consumption', 'sales plus intermediate consumption', 'value of output minus depreciation', 'sales minus wages paid'],
  sol: 'Value added is what the firm adds to the inputs it buys: value of output less intermediate consumption. Subtracting depreciation gives the net (not gross) measure; wages are a part of value added, not deducted from it.',
}));
Q('m_output', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A firm\'s value of output in a year is',
  opts: ['sales plus change in stock', 'sales minus change in stock', 'sales minus intermediate consumption', 'sales plus depreciation'],
  sol: 'Output produced in a year is either sold or added to stock, so value of output = sales + change in stock (the change can be negative). Subtracting intermediate consumption gives value added, not output.',
}));
Q('m_transfer', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following is **included** in the national income of India?',
  opts: ['Rent that the owner of a flat would have paid for living in his own flat (imputed rent)', 'An old-age pension paid by the government', 'A scholarship given to a student', 'Money won in a lottery'],
  sol: 'Owner-occupied housing is a real service produced during the year, so its imputed rent is included. Pensions and scholarships are transfer payments, and lottery winnings are windfall gains; none of these is a payment for a productive service.',
}));
Q('m_secondhand', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Meena sells her five-year-old scooter for ₹30,000 through a dealer in Jaipur, who charges a commission of ₹1,500. What is added to this year\'s GDP from the deal?',
  opts: ['₹1,500', '₹31,500', '₹30,000', 'Nothing'],
  sol: 'The scooter was counted in GDP in the year it was made, so its resale is not new production. But the dealer\'s service of bringing buyer and seller together is produced this year, so only the commission of ₹1,500 is added.',
}));
Q('m_shares', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The purchase of shares of a company is not included in national income because',
  opts: ['it is only a transfer of ownership of a financial asset and does not create any good or service', 'shares are always bought by foreigners', 'shares are a capital good', 'the government taxes the purchase of shares'],
  sol: 'Buying shares or bonds changes who owns a claim; nothing is produced. (A broker\'s commission on the deal is a service and is counted.) The other options are untrue or irrelevant.',
}));
Q('m_mixed', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A self-employed tailor in Surat earns from her own labour, her own shop and her own sewing machines, and the parts cannot be separated. In the income method, her earnings are recorded as',
  opts: ['mixed income of the self-employed', 'compensation of employees', 'operating surplus', 'transfer income'],
  sol: 'When the returns to one\'s own labour, land and capital cannot be separated, the whole is mixed income of the self-employed. Compensation of employees needs an employer, and operating surplus is rent, interest and profit of enterprises.',
}));
Q('m_exp_not', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'While estimating national income by the **expenditure method**, which item is **included**?',
  opts: ['Purchase of new machines by a factory', 'Purchase of raw cotton by a textile mill', 'Unemployment allowance paid by the government', 'Purchase of a second-hand truck'],
  sol: 'New machines are gross domestic capital formation, a final expenditure. Raw cotton is intermediate consumption, the allowance is a transfer, and the second-hand truck was counted when it was made.',
}));
Q('m_double', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Counting the value of an input more than once while estimating national output is called',
  opts: ['double counting', 'depreciation', 'imputation', 'net factor income from abroad'],
  sol: 'Adding the value of intermediate goods again with the final good counts the same value twice: double counting. It is avoided by the value-added method or by counting final goods only.',
}));
Q('ar_transfer', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'Scholarships given by the government are not included in national income.',
  r: 'Scholarships are payments made to students for the productive services they render while studying.',
  sol: 'A is true. R is false: a scholarship is a **transfer payment**, received without any productive service in return, and that is exactly why it is excluded.',
}));
Q('ar_secondhand', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'The sale of an old house is not included in the national income of the current year.',
  r: 'The commission earned by an estate agent on the sale of an old house is included in national income.',
  sol: 'Both are true, but R does not explain A. A is true because the house was counted when it was built; R is a separate fact about the agent\'s current service.',
}));
Q('tf_own_account', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? Wheat grown by a farmer in Madhya Pradesh and kept for his family\'s own use is included in national income.',
  sol: 'Production for self-consumption is real output of the year; it is valued at market prices and included (own-account production).',
}));
Q('n_gva', num({
  t: 3, d: 3, c: 'application', marks: 2, value: VA1.nvaFC, unit: '₹ lakh',
  stem: `An imagined furniture firm in Saharanpur reports for a year (₹ lakh): sales ${VA1.output + 30}, change in stock −30, purchase of wood and other inputs ${420}, depreciation 25, net indirect taxes 15. Find its **net value added at factor cost** (in ₹ lakh).`,
  sol: `Step 1: Value of output = sales + change in stock = ${VA1.output + 30} + (−30) = ${VA1.output}.\nStep 2: GVA at MP = ${VA1.output} − 420 = ${VA1.gvaMP}.\nStep 3: NVA at FC = ${VA1.gvaMP} − 25 − 15 = ${VA1.nvaFC}. So ₹${VA1.nvaFC} lakh.`,
  scheme: [['Value of output and GVA at MP', 1], [`NVA at FC = ${VA1.nvaFC}`, 1]],
}));
Q('n_gdp_exp', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: EXP1.gdpMP, unit: '₹ crore',
  stem: 'For an imagined economy (₹ crore): private final consumption expenditure 2,400; gross domestic capital formation 600; government final consumption expenditure 500; exports 300; imports 380. Find GDP at market price (in ₹ crore).',
  sol: `Step 1: GDP at MP = C + I + G + (X − M).\nStep 2: 2,400 + 600 + 500 + (300 − 380) = ${inr(EXP1.gdpMP)}. So ₹${inr(EXP1.gdpMP)} crore.`,
}));
Q('n_ndp_inc', num({
  t: 3, d: 2, c: 'application', marks: 1, value: INC1.ndpFC, unit: '₹ crore',
  stem: 'For an imagined economy (₹ crore): compensation of employees 1,100; rent 150; interest 120; profit 330; mixed income of the self-employed 400. Find domestic income (NDP at factor cost) (in ₹ crore).',
  sol: `Step 1: Operating surplus = 150 + 120 + 330 = ${INC1.os}.\nStep 2: NDP at FC = 1,100 + ${INC1.os} + 400 = ${inr(INC1.ndpFC)}. So ₹${inr(INC1.ndpFC)} crore.`,
}));
Q('mt_methods', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each item with the method of measuring national income in which it appears.',
  pairs: [
    ['Intermediate consumption of a sugar mill', 'Value added (product) method'],
    ['Mixed income of a self-employed carpenter', 'Income method'],
    ['Government final consumption expenditure', 'Expenditure method'],
    ['Net exports', 'Expenditure method (external demand)'],
  ],
  sol: 'Intermediate consumption is deducted from output in the value-added method; mixed income is a factor income; government consumption and net exports are components of final expenditure.',
}));
Q('s_double', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is double counting? State two ways in which it can be avoided.',
  model: '**Double counting** means counting the value of a good **more than once**, for example counting both flour and the bread made from it. It is avoided by (1) counting only the value of **final goods**, or (2) adding only the **value added** at each stage of production.',
  sol: 'Meaning with an example, then the two approaches: final-goods approach and value-added approach.',
  scheme: [['Meaning of double counting', 1], ['Two ways to avoid it', 1]],
}));
Q('s_treat2', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Giving reasons, state whether the following are included in national income: (a) free meals given by a hotel to its staff; (b) the purchase of new shares of a company by a household.',
  model: '(a) **Included**: free meals are a payment **in kind** for work, so they are part of **compensation of employees**. (b) **Excluded**: buying shares is only a **transfer of ownership** of a **financial asset**; no good or service is produced. (The dividend later earned on them is a factor income.)',
  sol: 'Meals: compensation in kind. Shares: a financial transaction, not production.',
  scheme: [['(a) included as compensation in kind', 1], ['(b) excluded as a financial asset', 1]],
}));
Q('s3_va_firm', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined spice-processing unit in Kochi has (₹ lakh): sales ${900}, closing stock ${80}, opening stock ${50}, purchase of raw spices and packing material ${520}, depreciation ${30}, goods and services tax paid ${40}, subsidy received ${10}. Calculate its net value added at factor cost.`,
  model: `1. Change in stock = 80 − 50 = **30**; value of output = 900 + 30 = **930**.\n2. GVA at MP = 930 − 520 = **410**; NVA at MP = 410 − 30 = **380**.\n3. Net indirect taxes = 40 − 10 = **30**; NVA at FC = 380 − 30 = **₹350 lakh**.`,
  sol: 'Output from sales and change in stock; subtract intermediate consumption, depreciation and net indirect taxes.',
  scheme: [['Value of output', 1], ['GVA and NVA at MP', 1], ['NIT and NVA at FC = 350', 1]],
}));
Q('s3_precautions_exp', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three precautions to be taken while estimating national income by the expenditure method.',
  model: '1. Count only **final expenditure**; spending on **intermediate goods** is left out to avoid double counting.\n2. Leave out **transfer payments** such as pensions, scholarships and relief, which buy no current good or service.\n3. Leave out spending on **second-hand goods** and on **financial assets** (shares, bonds); they are not current production.',
  sol: 'Any three valid precautions, each with a reason.',
  scheme: [['First precaution with reason', 1], ['Second precaution with reason', 1], ['Third precaution with reason', 1]],
}));
Q('l_income_method', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the steps involved in estimating national income by the income method, and state two precautions.',
  model: '1. **Classify** producing enterprises into industrial sectors (primary, secondary, tertiary).\n2. Estimate the **factor incomes** paid by each sector: **compensation of employees** (wages in cash and kind, employer\'s social security contribution), **operating surplus** (rent, interest, profit) and **mixed income** of the self-employed.\n3. Add them for all sectors to get **domestic income (NDP at FC)**.\n4. Add **net factor income from abroad** to get **national income (NNP at FC)**.\n5. **Precautions:** exclude **transfer incomes** and **windfall gains**; include **imputed rent** and income in kind.',
  sol: 'Sectors, the three components, the sum as NDP at FC, adding NFIA, then two precautions.',
  scheme: [['Classifying enterprises into sectors', 1], ['Three components of factor income', 1], ['Sum = NDP at FC', 1], ['Add NFIA = NNP at FC', 1], ['Two precautions', 1]],
}));
Q('l_value_added', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `An imagined economy has two firms (₹ crore). **Firm A** sells raw cotton worth 300 to Firm B and exports cotton worth 100; its change in stock is +20; it buys nothing from other firms; its depreciation is 15. **Firm B** sells cloth worth 700 to households and 150 to the government; it buys cotton worth 300 from Firm A; its change in stock is −10; its depreciation is 25. Net indirect taxes in the economy are 45. Calculate (i) GVA at MP of each firm and (ii) NDP at factor cost of the economy.`,
  model: `1. Firm A: output = 300 + 100 + 20 = **420**; GVA at MP = 420 − 0 = **420**.\n2. Firm B: output = 700 + 150 + (−10) = **840**; GVA at MP = 840 − 300 = **540**.\n3. GDP at MP = 420 + 540 = **960**.\n4. NDP at MP = 960 − (15 + 25) = **920**.\n5. NDP at FC = 920 − 45 = **₹875 crore**.`,
  sol: 'Value of output of each firm from all its sales plus change in stock, subtract intermediate consumption, add for GDP, then subtract depreciation and net indirect taxes.',
  scheme: [['Firm A GVA', 1], ['Firm B GVA (cotton deducted)', 1], ['GDP at MP', 1], ['NDP at MP', 1], ['NDP at FC = 875', 1]],
}));
Q('l_exp_ni', long({
  t: [3, 4], d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'From the data of an imagined economy (₹ crore), calculate national income by the expenditure method: private final consumption expenditure 3,000; government final consumption expenditure 700; net domestic fixed capital formation 500; change in stock 60; consumption of fixed capital 140; exports 250; imports 330; indirect taxes 310; subsidies 40; net factor income to abroad 50.',
  model: '1. Gross domestic capital formation = 500 + 60 + 140 = **700**.\n2. GDP at MP = 3,000 + 700 + 700 + (250 − 330) = **4,320**.\n3. NDP at MP = 4,320 − 140 = **4,180**.\n4. NDP at FC = 4,180 − (310 − 40) = **3,910**.\n5. NNP at FC = 3,910 − 50 = **₹3,860 crore** (net factor income **to** abroad is subtracted).',
  sol: 'Build gross investment, add the four expenditures, then move to net, factor cost and national.',
  scheme: [['Gross domestic capital formation', 1], ['GDP at MP', 1], ['NDP at MP', 1], ['NDP at FC using NIT', 1], ['NNP at FC = 3,860', 1]],
}));
Q('cb_chain', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined firms and figures, written by SOYL for practice.)*',
  passage: `**From leaf to cup: three imagined firms in Assam (₹ thousand, one year)**\n\n| Firm | Sells to | Sales | Purchases from other firms |\n|---|---|---|---|\n| Green Hills tea estate | Factory | ${CASEF.estate.sales} | ${CASEF.estate.ic} |\n| Brahmaputra tea factory | Retailer | ${CASEF.factory.sales} | ${CASEF.factory.ic} |\n| Chai Corner retailer | Households | ${inr(CASEF.retail.sales)} | ${CASEF.retail.ic} |\n\nAn official adds up the three sales figures and reports the output of the chain as ₹${inr(CFsales)} thousand.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: CF.factory, unit: '₹ thousand', stem: 'Find the value added by the tea factory (no change in stock).', sol: `Step 1: Value added = sales − purchases from other firms.\nStep 2: ${CASEF.factory.sales} − ${CASEF.factory.ic} = ${CF.factory}. So ₹${CF.factory} thousand.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: CFtotal, unit: '₹ thousand', stem: 'Find the total value added by the three firms.', sol: `Step 1: Values added: ${CF.estate} + ${CF.factory} + ${CF.retail}.\nStep 2: Total = ${inr(CFtotal)}. So ₹${inr(CFtotal)} thousand.` })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What error has the official made? Show how the correct figure compares with the value of the final good.', model: `The official has made the error of **double counting**: the leaves are counted in the factory\'s sales and again in the retailer\'s. The correct output is the total value added, **₹${inr(CFtotal)} thousand**, which **equals** the value of the **final good** sold to households (₹${inr(CASEF.retail.sales)} thousand).`, sol: 'Name double counting and show that the sum of values added equals the final sales.', scheme: [['Double counting identified', 1], ['Sum of values added = final sales', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If the retailer also bought a new refrigerator for ₹50 thousand, would the value added of the retailer fall? Explain.', model: `**No.** A refrigerator is a **capital good** used for years; it is a **final good** (investment), not intermediate consumption. Only goods **used up** in the year (tea packets) are deducted, so the retailer\'s value added stays ₹${CF.retail} thousand.`, sol: 'No: the refrigerator is gross investment, not intermediate consumption.', scheme: [['Says no', 1], ['Reason: capital good is final, not intermediate', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Aggregates
Q('m_gnp', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'GNP at market price equals',
  opts: ['GDP at market price + net factor income from abroad', 'GDP at market price − depreciation', 'GDP at market price − net indirect taxes', 'NDP at factor cost + depreciation'],
  sol: 'Moving from domestic to national adds net factor income from abroad. Subtracting depreciation gives net measures, and subtracting net indirect taxes gives factor-cost measures.',
}));
Q('m_ni_is', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'National income is the same as',
  opts: ['net national product at factor cost', 'gross domestic product at market price', 'net domestic product at market price', 'gross national product at factor cost'],
  sol: 'National income is NNP at factor cost: the factor incomes earned by normal residents of a country, net of depreciation.',
}));
Q('m_nit', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Net indirect taxes are',
  opts: ['indirect taxes minus subsidies', 'indirect taxes plus subsidies', 'direct taxes minus indirect taxes', 'indirect taxes minus depreciation'],
  sol: 'Market price = factor cost + indirect taxes − subsidies, so the gap between the two is indirect taxes minus subsidies.',
}));
Q('m_gdp_eq_gnp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'GDP equals GNP when',
  opts: ['net factor income from abroad is zero', 'depreciation is zero', 'indirect taxes equal subsidies', 'exports equal imports'],
  sol: 'GNP = GDP + NFIA, so they are equal when NFIA is zero (for example in a closed economy). Depreciation and net indirect taxes change net and factor-cost measures, and net exports are a part of GDP itself.',
}));
Q('m_domestic', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Which of these incomes is part of the **domestic** income of India?',
  opts: ['Salary of a Japanese engineer working for a factory in Gujarat', 'Salary of an Indian doctor working in a hospital in Dubai', 'Rent received by an Indian resident from a flat in London', 'Profit of the Japanese embassy canteen in New Delhi'],
  sol: 'Domestic income counts factor income earned within the domestic territory, whoever earns it: the factory in Gujarat is inside it. Dubai and London are outside it, and a foreign embassy in India is part of that foreign country\'s domestic territory.',
}));
Q('m_resident', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A normal resident of a country is a person or institution who',
  opts: ['ordinarily resides in that country and whose centre of economic interest lies there', 'is a citizen of that country, wherever he lives', 'has visited the country at least once in the year', 'pays income tax only in that country'],
  sol: 'Residence is about where one ordinarily lives and has economic interest (usually for a year or more), not citizenship, a single visit or where one pays tax.',
}));
Q('ar_gnp_lower', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'The GNP of a country can be lower than its GDP.',
  r: 'NNP is obtained by subtracting depreciation from GNP.',
  sol: 'Both are true, but R does not explain A. GNP falls below GDP when net factor income from abroad is negative (GNP = GDP + NFIA); depreciation separates gross from net, not domestic from national.',
}));
Q('ar_subsidy', ar({
  t: 4, d: 4, c: 'analysis', key: 'd',
  a: 'If subsidies exceed indirect taxes, GDP at market price will be greater than GDP at factor cost.',
  r: 'GDP at market price = GDP at factor cost + indirect taxes − subsidies.',
  sol: 'R is true. With subsidies larger than indirect taxes, net indirect taxes are negative, so market price is **less** than factor cost: A is false.',
}));
Q('fb_fc', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'NNP at market price − net indirect taxes = NNP at ___ cost.',
  acc: [['factor']],
  sol: 'Removing net indirect taxes from a market-price aggregate gives the factor cost aggregate.',
}));
Q('n_nfia', num({
  t: 4, d: 2, c: 'application', marks: 1, value: NFIA1.from - NFIA1.to, unit: '₹ crore',
  stem: `Normal residents of an imagined country earn ₹${NFIA1.from} crore of factor income from abroad, and the country pays ₹${NFIA1.to} crore of factor income to non-residents. Find its net factor income from abroad (in ₹ crore).`,
  sol: `Step 1: NFIA = factor income from abroad − factor income to abroad.\nStep 2: ${NFIA1.from} − ${NFIA1.to} = ${NFIA1.from - NFIA1.to}. So −₹${NFIA1.to - NFIA1.from} crore (negative).`,
}));
Q('n_mp', num({
  t: 4, d: 3, c: 'application', marks: 1, value: SUBSmp, unit: '₹ crore',
  stem: `GDP at factor cost of an imagined economy is ₹${inr(SUBS.fc)} crore, indirect taxes are ₹${SUBS.it} crore and subsidies ₹${SUBS.sub} crore. Find GDP at market price (in ₹ crore).`,
  sol: `Step 1: NIT = ${SUBS.it} − ${SUBS.sub} = −${SUBS.sub - SUBS.it}.\nStep 2: GDP at MP = ${inr(SUBS.fc)} + (−${SUBS.sub - SUBS.it}) = ${inr(SUBSmp)}. So ₹${inr(SUBSmp)} crore.`,
}));
Q('mt_agg', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each conversion with the item it needs.',
  pairs: [
    ['Gross to net', 'Subtract depreciation'],
    ['Domestic to national', 'Add net factor income from abroad'],
    ['Market price to factor cost', 'Subtract net indirect taxes'],
    ['GDP at MP to NNP at FC', 'Subtract depreciation and net indirect taxes, add NFIA'],
  ],
  sol: 'Each word of an aggregate has its own adjustment: gross–net (depreciation), domestic–national (NFIA), market price–factor cost (net indirect taxes); the last pair uses all three.',
}));
Q('s_dom_nat', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between domestic income and national income.',
  model: '**Domestic income (NDP at FC)** is the factor income generated **within the domestic territory** of a country, by residents and non-residents. **National income (NNP at FC)** is the factor income earned by the **normal residents** of a country, within it and abroad. National income = domestic income + **net factor income from abroad**.',
  sol: 'Territory basis vs residents basis, linked by NFIA.',
  scheme: [['Domestic income: territory basis', 1], ['National income: residents basis, link through NFIA', 1]],
}));
Q('s_mp_fc', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why is GDP at market price usually higher than GDP at factor cost? When could it be lower?',
  model: 'Market prices include **indirect taxes** (such as GST) and are reduced by **subsidies**: MP = FC + **net indirect taxes**. Usually indirect taxes exceed subsidies, so MP is **higher**. If **subsidies exceed indirect taxes**, NIT is negative and MP is **lower** than FC.',
  sol: 'Explain the link through net indirect taxes and the case of large subsidies.',
  scheme: [['Usual case explained through NIT', 1], ['Case where subsidies exceed indirect taxes', 1]],
}));
Q('s_territory', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Giving reasons, state whether these are part of the domestic territory of India: (a) a fishing boat of an Indian company in international waters; (b) the office of an international organisation in New Delhi.',
  model: '(a) **Yes.** Ships, aircraft and fishing vessels **operated by residents** in international waters or between countries are part of the domestic territory. (b) **No.** Offices of **international organisations** in a country are **not** part of its domestic territory.',
  sol: 'Apply the definition of domestic territory to each case.',
  scheme: [['(a) included with reason', 1], ['(b) excluded with reason', 1]],
}));
Q('s3_conversions', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For an imagined country (₹ crore): GDP at MP ${inr(AGG.gdpMP)}; net factor income from abroad ${AGG.nfia}; consumption of fixed capital ${AGG.dep}; indirect taxes ${AGG.it}; subsidies ${AGG.sub}. Calculate (i) GNP at MP and (ii) national income.`,
  model: `1. GNP at MP = ${inr(AGG.gdpMP)} + (${AGG.nfia}) = **${inr(AGGgnpMP)}**.\n2. NNP at MP = ${inr(AGGgnpMP)} − ${AGG.dep} = **${inr(AGGnnpMP)}**.\n3. NIT = ${AGG.it} − ${AGG.sub} = ${AGGnit}; national income (NNP at FC) = ${inr(AGGnnpMP)} − ${AGGnit} = **₹${inr(AGGnnpFC)} crore**.`,
  sol: 'Add NFIA, subtract depreciation, subtract net indirect taxes.',
  scheme: [[`GNP at MP = ${inr(AGGgnpMP)}`, 1], ['NNP at MP', 1], [`National income = ${inr(AGGnnpFC)}`, 1]],
}));
Q('l_aggregates', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three pairs of concepts used to build national income aggregates (gross–net, domestic–national, market price–factor cost), and show how GDP at market price is converted into national income.',
  model: '1. **Gross and net:** gross includes **depreciation**; net = gross − depreciation.\n2. **Domestic and national:** domestic is income within the **domestic territory**; national is income of **normal residents**; national = domestic + **NFIA**.\n3. **Market price and factor cost:** market price includes **net indirect taxes**; factor cost = market price − (indirect taxes − subsidies).\n4. **Conversion:** start from **GDP at MP**, subtract depreciation (NDP at MP), add NFIA (NNP at MP), subtract NIT.\n5. The result is **NNP at FC = national income** = GDP at MP − depreciation + NFIA − NIT.',
  sol: 'Each pair with its adjustment, then the chain from GDP at MP to NNP at FC.',
  scheme: [['Gross–net', 1], ['Domestic–national', 1], ['Market price–factor cost', 1], ['Order of the conversion', 1], ['Final formula for national income', 1]],
}));
Q('cb_country', caseQ({
  t: [3, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined country and figures, written by SOYL for practice.)*',
  passage: `**Year-end statistics bulletin, Republic of Sundarvan (imagined), ₹ crore**\n\nWorkers in Sundarvan received wages, salaries and employer contributions to their provident funds worth ${inr(CTRY.coe)}. Companies and landlords earned rent, interest and profit of ${inr(CTRY.os)}. Self-employed farmers, artisans and shopkeepers earned ${CTRY.mixed}. Many Sundarvani engineers work in nearby countries and send home their earnings; after deducting what foreign investors took out of Sundarvan, net factor income from abroad was +${CTRY.nfia}. Machines and buildings wore out by ${CTRY.dep}, and net indirect taxes were ${CTRY.nit}.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: CTRYndpFC, unit: '₹ crore', stem: 'Calculate the domestic income (NDP at FC) of Sundarvan.', sol: `Step 1: NDP at FC = compensation of employees + operating surplus + mixed income.\nStep 2: ${inr(CTRY.coe)} + ${inr(CTRY.os)} + ${CTRY.mixed} = ${inr(CTRYndpFC)}. So ₹${inr(CTRYndpFC)} crore.` })),
    child('b', num({ t: 4, d: 2, c: 'application', marks: 1, value: CTRYnnpFC, unit: '₹ crore', stem: 'Calculate the national income of Sundarvan.', sol: `Step 1: NNP at FC = NDP at FC + NFIA.\nStep 2: ${inr(CTRYndpFC)} + ${CTRY.nfia} = ${inr(CTRYnnpFC)}. So ₹${inr(CTRYnnpFC)} crore.` })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Calculate GDP at market price of Sundarvan, showing each step.', model: `NDP at MP = ${inr(CTRYndpFC)} + ${CTRY.nit} = ${inr(CTRYndpFC + CTRY.nit)}; GDP at MP = ${inr(CTRYndpFC + CTRY.nit)} + ${CTRY.dep} = **₹${inr(CTRYgdpMP)} crore**.`, sol: 'Add net indirect taxes to reach market price, then add depreciation to reach gross.', scheme: [['NDP at MP', 1], [`GDP at MP = ${inr(CTRYgdpMP)}`, 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Is the national income of Sundarvan greater or smaller than its domestic income? Explain using the passage.', model: `**Greater** (₹${inr(CTRYnnpFC)} crore against ₹${inr(CTRYndpFC)} crore), because **net factor income from abroad is positive**: the earnings of Sundarvani engineers abroad exceed the factor income paid to foreign investors.`, sol: 'Compare, and give the reason: positive NFIA.', scheme: [['Greater', 1], ['Reason: positive NFIA from engineers abroad', 1]] }),
    ]),
  ],
}));

// ================================================================ t05 Real and nominal GDP, deflator, welfare
Q('m_real', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Real GDP measures the output of a year at',
  opts: ['the prices of a base year', 'the prices of the current year', 'factor cost only', 'world prices'],
  sol: 'Real GDP values current output at constant (base-year) prices, so it changes only when output changes. Nominal GDP uses current prices.',
}));
Q('m_deflator', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Nominal GDP of an imagined economy is ₹1,500 crore and real GDP is ₹1,250 crore. The GDP deflator is',
  opts: ['120', '83.3', '125', '250'],
  sol: 'GDP deflator = (nominal GDP ÷ real GDP) × 100 = (1,500 ÷ 1,250) × 100 = 120. 83.3 inverts the ratio; 250 is the difference, not a ratio.',
}));
Q('m_externality', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'A dyeing unit in an imagined town releases waste into a river, and farmers downstream lose part of their crop. GDP does not subtract this loss. This is an example of',
  opts: ['a negative externality', 'a non-monetary exchange', 'a transfer payment', 'double counting'],
  sol: 'A harm done to others for which no one pays is a negative externality, and GDP ignores it. Non-monetary exchanges are unpaid production, transfers are one-sided payments, and double counting is a measurement error.',
}));
Q('m_nominal_rise', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Nominal GDP of an economy rises by 8 per cent while real GDP does not change. What has happened?',
  opts: ['The general price level has risen; physical output is the same', 'Physical output has risen by 8 per cent', 'The population has grown by 8 per cent', 'Welfare has risen by 8 per cent'],
  sol: 'Real GDP holds prices constant, so unchanged real GDP means unchanged output. The whole rise in nominal GDP is due to higher prices. It tells us nothing about population or welfare.',
}));
Q('ar_welfare', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'A rise in real GDP may not raise the welfare of most people in a country.',
  r: 'The extra output may go mainly to a small section of the population.',
  sol: 'Both are true, and R explains A: if the distribution of income becomes more unequal, most people may not be better off even though real GDP rises.',
}));
Q('tf_housework', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Cooking, cleaning and caring for children done by family members without payment are not counted in GDP, even though they add to welfare.',
  sol: 'Such services are non-monetary and are hard to value, so GDP leaves them out; this is why GDP understates welfare.',
}));
Q('n_deflator', num({
  t: 5, d: 2, c: 'understanding', marks: 1, value: DEF1v,
  stem: `An imagined economy's nominal GDP is ₹${inr(DEF1.nominal)} crore and its real GDP is ₹${inr(DEF1.real)} crore. Calculate the GDP deflator.`,
  sol: `Step 1: GDP deflator = (nominal GDP ÷ real GDP) × 100.\nStep 2: (${inr(DEF1.nominal)} ÷ ${inr(DEF1.real)}) × 100 = ${DEF1v}.`,
}));
Q('n_real', num({
  t: 5, d: 3, c: 'application', marks: 1, value: REAL1v, unit: '₹ crore',
  stem: `Nominal GDP of an imagined country is ₹${inr(REAL1.nominal)} crore and the GDP deflator is ${REAL1.def}. Find real GDP (in ₹ crore).`,
  sol: `Step 1: Real GDP = (nominal GDP ÷ deflator) × 100.\nStep 2: (${inr(REAL1.nominal)} ÷ ${REAL1.def}) × 100 = ${inr(REAL1v)}. So ₹${inr(REAL1v)} crore.`,
}));
Q('s_real_nom', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between nominal GDP and real GDP. Which is a better measure of growth in output?',
  model: '**Nominal GDP** values the output of a year at **current-year prices**; **real GDP** values it at **base-year (constant) prices**. **Real GDP** is better for comparing output over time, because it rises only when the **quantity** of goods and services rises, not when prices rise.',
  sol: 'Current vs base-year prices; real GDP removes the effect of price changes.',
  scheme: [['Difference stated', 1], ['Real GDP better, with reason', 1]],
}));
Q('s_externalities', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'With one example each, explain how positive and negative externalities make GDP a poor measure of welfare.',
  model: 'A **positive externality** is a benefit to others with no payment, e.g. a family\'s garden that cools the street; it raises welfare but is **not added** to GDP. A **negative externality** is a harm with no payment, e.g. **smoke** from a brick kiln harming neighbours; it lowers welfare but is **not subtracted**.',
  sol: 'One example of each and the direction in which GDP misstates welfare.',
  scheme: [['Positive externality with example', 1], ['Negative externality with example', 1]],
}));
Q('s3_welfare', short({
  t: 5, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: '"A higher GDP means the people of a country are better off." Do you agree? Give three reasons for your answer.',
  model: 'Only **partly**. 1. **Distribution:** if the extra income goes to a few rich people, most people may be **no better off**.\n2. **Non-monetary exchanges:** unpaid housework and barter in villages are **not counted**, so GDP misses part of welfare.\n3. **Externalities:** pollution and congestion that come with output **reduce welfare**, but GDP does not subtract them.',
  sol: 'A clear position with three reasons: distribution, non-monetary exchanges and externalities.',
  scheme: [['Distribution of GDP', 1], ['Non-monetary exchanges', 1], ['Externalities', 1]],
}));
Q('l_welfare', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined state reports that its real GDP grew by 9 per cent in a year. Its finance minister claims that welfare has grown by the same amount. Evaluate this claim.',
  model: '1. **For the claim:** real GDP measures more **goods and services** at constant prices, which can mean more food, housing and services, so welfare **may** rise.\n2. **Distribution:** if most of the growth went to a **few** people, the welfare of the majority may hardly change.\n3. **Non-monetary exchanges:** unpaid work at home and in villages is **not measured**, so GDP growth can even replace unpaid work with paid work without any gain in welfare.\n4. **Externalities:** growth that brings **pollution** or ill health lowers welfare, but GDP does not subtract it.\n5. **Judgement:** real GDP growth is a **useful but incomplete** index of welfare; the claim of an equal rise is too strong.',
  sol: 'Give the case for, the three limitations, and a balanced conclusion.',
  scheme: [['Case for the claim', 1], ['Distribution', 1], ['Non-monetary exchanges', 1], ['Externalities', 1], ['Balanced judgement', 1]],
}));
Q('cb_real', caseQ({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined country and figures, written by SOYL for practice; base year 2020.)*',
  passage: `**Output and prices in Meghpur (imagined), which produces only rice and cloth**\n\n| Good | 2020 quantity | 2020 price (₹) | 2025 quantity | 2025 price (₹) |\n|---|---|---|---|---|\n| Rice (quintals) | ${GOODS.y1.rice[0]} | ${GOODS.y1.rice[1]} | ${GOODS.y2.rice[0]} | ${GOODS.y2.rice[1]} |\n| Cloth (metres) | ${GOODS.y1.cloth[0]} | ${GOODS.y1.cloth[1]} | ${GOODS.y2.cloth[0]} | ${GOODS.y2.cloth[1]} |\n\nA local newspaper reports that "Meghpur's economy grew by 32 per cent between 2020 and 2025".`,
  parts: [
    child('a', num({ t: 5, d: 2, c: 'understanding', marks: 1, value: nomY2, unit: '₹', stem: 'Calculate the nominal GDP of Meghpur in 2025.', sol: `Step 1: Nominal GDP = 2025 quantities × 2025 prices.\nStep 2: ${GOODS.y2.rice[0]} × ${GOODS.y2.rice[1]} + ${GOODS.y2.cloth[0]} × ${GOODS.y2.cloth[1]} = ${inr(GOODS.y2.rice[0] * GOODS.y2.rice[1])} + ${inr(GOODS.y2.cloth[0] * GOODS.y2.cloth[1])} = ${inr(nomY2)}. So ₹${inr(nomY2)}.` })),
    child('b', num({ t: 5, d: 3, c: 'application', marks: 1, value: realY2, unit: '₹', stem: 'Calculate the real GDP of Meghpur in 2025 at 2020 prices.', sol: `Step 1: Real GDP = 2025 quantities × 2020 prices.\nStep 2: ${GOODS.y2.rice[0]} × ${GOODS.y1.rice[1]} + ${GOODS.y2.cloth[0]} × ${GOODS.y1.cloth[1]} = ${inr(GOODS.y2.rice[0] * GOODS.y1.rice[1])} + ${inr(GOODS.y2.cloth[0] * GOODS.y1.cloth[1])} = ${inr(realY2)}. So ₹${inr(realY2)}.` })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Is the newspaper\'s claim of 32 per cent growth correct? Explain using real and nominal GDP.', model: `**No.** Nominal GDP rose from ₹${inr(nomY1)} to ₹${inr(nomY2)} (**32 per cent**), but part of this is **higher prices**. Real GDP rose only from ₹${inr(nomY1)} to ₹${inr(realY2)}, that is **14 per cent**, which is the true growth in output.`, sol: 'Compare the nominal rise with the real rise and attribute the gap to prices.', scheme: [['Says the claim confuses nominal with real growth', 1], ['Real growth of 14 per cent shown', 1]] }), [
      short({ t: 5, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Calculate the GDP deflator for 2025 and state what it shows.', model: `Deflator = (${inr(nomY2)} ÷ ${inr(realY2)}) × 100 ≈ **${defY2}**. It shows that the **general price level** of goods produced in Meghpur rose by about **${(defY2 - 100).toFixed(1)} per cent** between 2020 and 2025.`, sol: 'Nominal over real times 100, then interpret as a price index.', scheme: [[`Deflator ≈ ${defY2}`, 1], ['Interpreted as a rise in the price level', 1]] }),
    ]),
  ],
}));

if (Math.round(((nomY2 - nomY1) / nomY1) * 100) !== 32 || Math.round(((realY2 - nomY1) / nomY1) * 100) !== 14) throw new Error('figure check failed: Meghpur growth');
