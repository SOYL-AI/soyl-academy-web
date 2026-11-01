// ISC 12 Economics, ch16 Fiscal Policy — question bank. Every government, state, person, tax schedule and figure is
// imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a
// stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Scope: fiscal policy and its instruments; public revenue and taxes (direct/indirect; progressive, proportional,
// regressive); public expenditure; public debt, its redemption and the meaning of deficit financing. Budget components
// and the revenue, fiscal and primary deficits belong to ch17 and are not taught or tested here. All tax rates and slabs
// are imagined (no current Indian slabs); the one dated fact is that GST, an indirect tax, came into force on 1 July 2017.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const r3 = (x) => Math.round(x * 1000) / 1000;
export const inr = (n) => r3(n).toLocaleString('en-IN');
export const pct = (x) => r3(x * 100);

// ---------------------------------------------------------------- tax engines (imagined schedules)
/** Tax under a slab schedule: slabs = [[upTo, rate], ...], last upTo = Infinity; each rate applies to income inside its slab. */
export function slabTax(income, slabs) {
  let tax = 0;
  let lower = 0;
  for (const [upTo, rate] of slabs) {
    if (income > lower) tax += (Math.min(income, upTo) - lower) * rate;
    lower = upTo;
  }
  return r3(tax);
}
export const avgRate = (tax, income) => pct(tax / income);

// (1) Taranagar (imagined state) progressive income tax: 0 per cent up to ₹2,50,000; 10 per cent on ₹2,50,001–6,00,000;
// 20 per cent above ₹6,00,000.
export const TARA = [[250000, 0], [600000, 0.1], [Infinity, 0.2]];
export const INCOMES = [200000, 500000, 1000000];
export const PROG = INCOMES.map((y) => slabTax(y, TARA));
assert(PROG.join() === '0,25000,115000', 'taranagar taxes');
export const PROG_AVG = INCOMES.map((y, i) => avgRate(PROG[i], y));
assert(PROG_AVG.join() === '0,5,11.5', 'taranagar average rates');
// (2) Proportional: a flat 10 per cent on all income.
export const PROP_RATE = 0.1;
export const PROPT = INCOMES.map((y) => r3(y * PROP_RATE));
assert(PROPT.join() === '20000,50000,100000', 'proportional taxes');
// (3) Regressive: an imagined flat ₹6,000 levy per family, whatever its income.
export const FLAT = 6000;
export const REG_AVG = INCOMES.map((y) => avgRate(FLAT, y));
assert(REG_AVG.join() === '3,1.2,0.6', 'regressive average rates');

// (4) Tax on ₹8,00,000 in Taranagar, and its average and marginal rates.
export const Y8 = 800000;
export const T8 = slabTax(Y8, TARA);
export const T8_AVG = avgRate(T8, Y8);
assert(T8 === 75000 && T8_AVG === 9.375, 'taranagar 8 lakh');
// (5) Tax on ₹4,50,000 in Taranagar.
export const Y45 = 450000;
export const T45 = slabTax(Y45, TARA);
assert(T45 === 20000 && avgRate(T45, Y45) === 4.444, 'taranagar 4.5 lakh');

// (6) Meghapur (imagined) proportional tax: two families pay the same share.
export const MEG = { rate: 0.08, y1: 300000, y2: 900000 };
export const MEG_T = [r3(MEG.y1 * MEG.rate), r3(MEG.y2 * MEG.rate)];
assert(MEG_T.join() === '24000,72000', 'meghapur');

// ---------------------------------------------------------------- public debt (imagined)
// (7) Sinking fund: a loan of ₹600 crore to be repaid after 12 years by setting aside an equal sum every year
// (interest on the fund ignored, as in the simple classroom method).
export const SINK = { debt: 600, years: 12 };
export const SINK_ANNUAL = r3(SINK.debt / SINK.years);
assert(SINK_ANNUAL === 50, 'sinking fund');
// (8) Conversion: old bonds of ₹400 crore at 9 per cent are converted into new bonds at 6.5 per cent.
export const CONV = { amount: 400, oldRate: 0.09, newRate: 0.065 };
export const CONV_OLD = r3(CONV.amount * CONV.oldRate);
export const CONV_NEW = r3(CONV.amount * CONV.newRate);
export const CONV_SAVE = r3(CONV_OLD - CONV_NEW);
assert(CONV_OLD === 36 && CONV_NEW === 26 && CONV_SAVE === 10, 'conversion');
// (9) Terminal annuity: a debt of ₹300 crore repaid in equal yearly instalments over 15 years (principal only).
export const ANN = { debt: 300, years: 15 };
export const ANN_YEAR = r3(ANN.debt / ANN.years);
assert(ANN_YEAR === 20, 'terminal annuity');
// (10) Public expenditure shares of an imagined state, Sahyagiri (₹ crore).
export const SAH = { education: 180, health: 120, roads: 150, pensions: 90, interest: 60 };
export const SAH_TOTAL = Object.values(SAH).reduce((s, v) => s + v, 0);
export const SAH_SOCIAL = SAH.education + SAH.health;
assert(SAH_TOTAL === 600 && SAH_SOCIAL === 300 && pct(SAH_SOCIAL / SAH_TOTAL) === 50, 'sahyagiri');
assert(pct(SAH.roads / SAH_TOTAL) === 25, 'sahyagiri roads share');

export const slabText = 'nil up to ₹2,50,000; 10 per cent on income from ₹2,50,001 to ₹6,00,000; 20 per cent on income above ₹6,00,000';

// ================================================================ t01 Fiscal policy: meaning and instruments
Q('m_fp_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A civics club at an imagined Dehradun school asks what "fiscal policy" means. The best answer is',
  opts: [
    'the government\'s use of taxation, public expenditure and public borrowing to influence the economy',
    'the central bank\'s control of the money supply through the repo rate',
    'the rules a firm follows to set the price of its product',
    'the policy that fixes the exchange rate of the rupee',
  ],
  sol: 'Fiscal policy is about the government\'s own revenue, spending and borrowing. Repo-rate changes are monetary policy (central bank); pricing is a firm\'s decision; the exchange rate is a foreign-exchange matter.',
}));
Q('m_fp_instrument', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is NOT an instrument of fiscal policy for the imagined government of Vindhyagiri?',
  opts: ['Changing the cash reserve ratio of banks', 'Changing income-tax rates', 'Changing spending on rural roads', 'Changing the amount it borrows from the public'],
  sol: 'The cash reserve ratio is a monetary tool of the central bank. Tax rates, public expenditure and public borrowing are fiscal instruments.',
}));
Q('m_fp_recession', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Factories in the imagined state of Kaveripur are idle and unemployment is rising because demand is weak. Which fiscal step would most directly raise aggregate demand?',
  opts: ['Increase spending on public works such as canals and roads', 'Raise indirect taxes on consumer goods', 'Cut grants to local bodies', 'Repay public debt quickly out of tax revenue'],
  sol: 'Higher public spending adds directly to demand and creates jobs and incomes. Higher taxes, lower grants and fast debt repayment all take spending power out of the economy.',
}));
Q('m_fp_inflation', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Prices in the imagined economy of Suryadesh are rising because total spending exceeds what the economy can produce. A suitable fiscal response is to',
  opts: ['cut non-essential public spending and raise taxes', 'cut taxes and raise public spending', 'borrow more and spend it on new projects', 'pay larger subsidies on consumer goods'],
  sol: 'Excess demand calls for a contractionary fiscal policy: lower public spending and higher taxes reduce spending power. The other options add to demand and would worsen the price rise.',
}));
Q('ar_fp_ad', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'A cut in personal income tax can raise aggregate demand in an economy with idle capacity.',
  r: 'A tax cut raises disposable income, so households can spend more on goods and services.',
  sol: 'Both are true, and R explains A: lower tax leaves more disposable income, consumption rises, and with idle capacity output and employment can rise to meet it.',
}));
Q('tf_fp_cb', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the imagined country of Tamraland, fiscal policy is framed and run by the central bank.',
  sol: 'False. Fiscal policy (taxes, spending, borrowing) is framed by the government; the central bank runs monetary policy.',
}));
Q('fb_fp_tools', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The three main instruments of fiscal policy are taxation, public expenditure and public ___.',
  acc: [['borrowing', 'debt']],
  sol: 'Taxation, public expenditure and public borrowing (public debt) are the main fiscal instruments.',
}));
Q('s_fp_two_aims', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two objectives that the imagined government of Kosala might pursue through its fiscal policy.',
  model: '1. **Economic stability**: keep prices steady and avoid deep slumps by adjusting taxes and spending.\n2. **Reducing inequality**: tax the rich at higher rates and spend on schools, health and subsidies for the poor (also growth and employment).',
  sol: 'Any two objectives: stability, growth, employment, equitable distribution, resource allocation.',
  scheme: [['First objective explained', 1], ['Second objective explained', 1]],
}));
Q('s_fp_vs_mp', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish fiscal policy from monetary policy for a student who mixes them up while writing about the imagined economy of Narmadapur.',
  model: '**Fiscal policy** is run by the **government** through **taxes, public spending and public borrowing**. **Monetary policy** is run by the **central bank** through the **money supply and credit**, for example the repo rate and reserve ratios.',
  sol: 'Who runs it and with which tools.',
  scheme: [['Fiscal: government, budget tools', 1], ['Monetary: central bank, credit tools', 1]],
}));
Q('s3_fp_slump', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined state of Godavaripur faces falling sales and rising joblessness. Suggest three fiscal measures it could use, with the effect of each on aggregate demand.',
  model: '1. **Raise public expenditure** on roads, housing and irrigation: it adds directly to demand and creates jobs.\n2. **Cut taxes** on households: higher disposable income raises consumption spending.\n3. **Borrow from the public** idle savings and spend them on projects: money that was not being spent re-enters the income stream.',
  sol: 'Three expansionary measures, each linked to demand.',
  scheme: [['Public expenditure with effect', 1], ['Tax cut with effect', 1], ['Borrowing for spending with effect', 1]],
}));
Q('s3_fp_instruments', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three instruments of fiscal policy that the finance department of an imagined state, Sindhupur, can use.',
  model: '1. **Taxation**: changing tax rates or the tax base alters people\'s disposable income and spending.\n2. **Public expenditure**: spending on goods, services, salaries and transfers adds to demand and builds facilities.\n3. **Public borrowing (debt)**: raising loans from the public or institutions finances spending without raising taxes now.',
  sol: 'Taxes, spending and borrowing, each with how it works.',
  scheme: [['Taxation', 1], ['Public expenditure', 1], ['Public borrowing', 1]],
}));
Q('l_fp_two_situations', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Answer both parts about the imagined economy of Marudesh. [2 + 3]\n\n(a) Define fiscal policy and name its instruments. [2]\n(b) In one year Marudesh faces excess demand and rising prices; in the next, deficient demand and unemployment. Explain how the fiscal policy should differ in the two years. [3]',
  model: '(a) Fiscal policy is the **government\'s use of its revenue, expenditure and borrowing** to influence demand, output, employment and prices. Its instruments are **taxation, public expenditure and public borrowing**.\n(b) **Excess demand year**: the government should **reduce public spending** that is not essential and **raise taxes**, so that households and firms have less to spend; borrowing from the public can also **absorb surplus purchasing power**. This **contractionary** policy cools prices. **Deficient demand year**: it should **raise public expenditure** on works and **cut taxes**, so incomes and spending rise; this **expansionary** policy lifts output and jobs through the multiplier.',
  sol: 'Definition and instruments; opposite policies for opposite gaps.',
  scheme: [['Definition', 1], ['Instruments named', 1], ['Excess demand: contractionary measures', 1], ['Deficient demand: expansionary measures', 1], ['Effect on demand explained', 1]],
}));

// ================================================================ t02 Public revenue and taxes
Q('m_tax_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which statement best describes a tax collected by the imagined government of Pratapgarh?',
  opts: [
    'A compulsory payment to the government with no direct return of a service to the individual taxpayer',
    'A voluntary gift made to the government by citizens',
    'A price paid for a specific service, such as a passport',
    'A loan given to the government that it must repay with interest',
  ],
  sol: 'A tax is compulsory and carries no direct quid pro quo. A fee is paid for a specific service; a loan to the government is public debt and is repaid.',
}));
Q('m_direct_tax', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'In the imagined state of Ratnagiripur, which of these is a direct tax?',
  opts: ['A tax on the income earned by a dentist', 'A tax added to the price of a refrigerator', 'A duty on imported tea', 'A tax on cinema tickets collected by the hall owner'],
  sol: 'An income tax is paid by the person on whom it is legally imposed, so its burden cannot be shifted: it is direct. Taxes added to prices, import duties and ticket taxes are indirect, because the seller passes them on to the buyer.',
}));
Q('m_indirect_shift', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A trader in an imagined Jodhpur market pays a sales tax to the government but adds it to the price of every pair of shoes he sells. This shows that an indirect tax',
  opts: ['can be shifted from the person who pays it to the person who finally bears it', 'falls only on the trader who pays it', 'is paid only by people with high incomes', 'is a tax on income, not on goods'],
  sol: 'The impact (who pays the government) is on the trader, but the incidence (who bears it) is on the buyer. Shifting is the mark of an indirect tax.',
}));
Q('m_gst_type', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A Class 12 student in an imagined Kolkata school is asked how to classify the Goods and Services Tax that came into force in India on 1 July 2017. It is',
  opts: ['an indirect tax on the supply of goods and services', 'a direct tax on personal income', 'a tax on the wealth of companies', 'a tax on agricultural land'],
  sol: 'GST is levied on the supply of goods and services and is passed on to buyers, so it is an indirect tax.',
}));
Q('m_progressive_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Under the imagined income tax of Taranagar (${slabText}), the share of income paid as tax`,
  opts: ['rises as income rises, so the tax is progressive', 'is the same at every income, so the tax is proportional', 'falls as income rises, so the tax is regressive', 'is zero for everyone'],
  sol: `Average rates are ${PROG_AVG[0]}, ${PROG_AVG[1]} and ${PROG_AVG[2]} per cent at incomes of ₹${inr(INCOMES[0])}, ₹${inr(INCOMES[1])} and ₹${inr(INCOMES[2])}: the share rises with income, which is progressive.`,
}));
Q('m_regressive_levy', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined town council charges every family the same flat levy of ₹${inr(FLAT)} a year. For a family earning ₹${inr(INCOMES[0])} and one earning ₹${inr(INCOMES[2])}, the levy is`,
  opts: [
    `regressive, because it is ${REG_AVG[0]} per cent of the smaller income and only ${REG_AVG[2]} per cent of the larger`,
    'progressive, because the richer family pays more rupees',
    'proportional, because both pay the same amount',
    'a direct tax that rises with income',
  ],
  sol: `${inr(FLAT)} ÷ ${inr(INCOMES[0])} = ${REG_AVG[0]} per cent; ${inr(FLAT)} ÷ ${inr(INCOMES[2])} = ${REG_AVG[2]} per cent. The share of income falls as income rises, so it is regressive.`,
}));
Q('m_proportional', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The imagined state of Meghapur taxes all income at ${pct(MEG.rate)} per cent. A clerk earning ₹${inr(MEG.y1)} pays ₹${inr(MEG_T[0])} and a doctor earning ₹${inr(MEG.y2)} pays ₹${inr(MEG_T[1])}. This tax is`,
  opts: ['proportional', 'progressive', 'regressive', 'degressive'],
  sol: `Both pay ${pct(MEG.rate)} per cent of income (${inr(MEG_T[0])} ÷ ${inr(MEG.y1)} and ${inr(MEG_T[1])} ÷ ${inr(MEG.y2)}): the rate is constant, so the tax is proportional, although the doctor pays more rupees.`,
}));
Q('m_direct_merit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A finance student in an imagined Hyderabad college argues that direct taxes are fairer than indirect taxes. Which reason supports her view?',
  opts: ['Direct taxes can be made progressive, so people pay according to their ability', 'Direct taxes are hidden in prices, so people do not feel them', 'Direct taxes fall equally on the rich and the poor in rupees', 'Direct taxes are always lower than indirect taxes'],
  sol: 'Direct taxes such as income tax can use rising rates, matching ability to pay. Indirect taxes are hidden in prices and fall on rich and poor alike when they buy the same goods, which makes them regressive in effect.',
}));
Q('m_nontax', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which receipt of the imagined government of Aravalli is NOT a tax?',
  opts: ['A fee charged for registering a property', 'Income tax paid by a software engineer', 'Customs duty on imported machines', 'GST on restaurant bills'],
  sol: 'A registration fee is paid for a specific service, so it is non-tax revenue. Income tax, customs duty and GST are taxes.',
}));
Q('ar_indirect_regressive', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'A high indirect tax on salt bears more heavily on poor households than on rich ones.',
  r: 'Poor households spend a larger share of their income on such essential goods.',
  sol: 'Both are true, and R explains A: if both spend about the same rupees on salt, the tax is a bigger share of a small income, so its burden is regressive.',
}));
Q('ar_direct_shift', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'The burden of a personal income tax is usually passed on to other people through higher prices.',
  r: 'A direct tax is one whose impact and incidence fall on different persons.',
  sol: 'Both are false. A personal income tax is borne by the person who pays it, and a direct tax is one whose impact and incidence fall on the same person.',
}));
Q('tf_prog_more_rupees', tf({
  t: 2, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? A tax is progressive whenever a rich person in the imagined state of Bhimgarh pays more rupees in tax than a poor person.',
  sol: 'False. Under a proportional tax the rich also pay more rupees. A tax is progressive only if the rate (share of income) rises with income.',
}));
Q('fb_incidence', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'The person who finally bears the money burden of a tax is said to bear its ___, while the person who pays it to the government bears its impact.',
  acc: [['incidence']],
  sol: 'Incidence is the final money burden; impact is on the person who pays the tax to the government.',
}));
Q('n_tara_tax', num({
  t: 2, d: 2, c: 'application', marks: 1, value: T8, unit: '₹',
  stem: `Under the imagined Taranagar income tax (${slabText}), find the tax payable on an income of ₹${inr(Y8)} (in ₹).`,
  sol: `Step 1: First ₹2,50,000: nil.\nStep 2: Next ₹3,50,000 at 10 per cent = 35,000.\nStep 3: Remaining ₹2,00,000 at 20 per cent = 40,000.\nStep 4: Total tax = 35,000 + 40,000 = ${T8}, that is ₹${inr(T8)}.`,
}));
Q('n_tara_avg', num({
  t: 2, d: 3, c: 'application', marks: 1, value: T8_AVG, unit: '%',
  stem: `A teacher in imagined Taranagar earns ₹${inr(Y8)} and pays ₹${inr(T8)} as income tax. What percentage of her income is paid as tax (average rate of tax)?`,
  sol: `Average rate = ${inr(T8)} ÷ ${inr(Y8)} × 100 = ${T8_AVG} per cent.`,
}));
Q('mt_tax_types', match({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Match each imagined tax of the state of Kalinga with its type.',
  pairs: [
    ['Rates of 0, 10 and 20 per cent on rising slabs of income', 'Progressive tax'],
    ['A flat 5 per cent on every rupee of income', 'Proportional tax'],
    ['A fixed ₹1,000 charge on every household', 'Regressive tax'],
    ['A tax included in the price of a scooter', 'Indirect tax'],
  ],
  sol: 'Rising rates are progressive; a constant rate is proportional; a fixed sum falls as a share of income, so it is regressive; a tax hidden in a price is passed on and is indirect.',
}));
Q('s_direct_indirect', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a direct tax and an indirect tax, with one example of each, for a commerce club newsletter in an imagined Indore school.',
  model: 'A **direct tax** is borne by the person on whom it is imposed; its **impact and incidence** fall on the **same** person, for example **income tax**. An **indirect tax** is imposed on one person but **passed on** to another through prices, so impact and incidence **differ**, for example **GST**.',
  sol: 'Shifting decides the type; one example each.',
  scheme: [['Direct tax with example', 1], ['Indirect tax with example', 1]],
}));
Q('s_prog_prop', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Using the imagined Taranagar schedule (${slabText}), distinguish a progressive tax from a proportional tax.`,
  model: `Under a **progressive** tax the **rate rises** as income rises: in Taranagar, ₹${inr(INCOMES[1])} pays ${PROG_AVG[1]} per cent and ₹${inr(INCOMES[2])} pays ${PROG_AVG[2]} per cent. Under a **proportional** tax the **rate stays the same** at every income, for example 10 per cent for all.`,
  sol: 'Rate rising versus rate constant, with the figures.',
  scheme: [['Progressive with Taranagar figures', 1], ['Proportional explained', 1]],
}));
Q('s_tax_fee', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A citizen of the imagined state of Konkanpur pays both income tax and a fee for a driving licence. Explain one difference between a tax and a fee.',
  model: 'A **tax** is a **compulsory** payment with **no direct return** of a service to the taxpayer. A **fee** is paid in return for a **specific service** from the government, such as a **driving licence**, and only those who take the service pay it.',
  sol: 'Quid pro quo is the difference.',
  scheme: [['Tax: compulsory, no direct return', 1], ['Fee: payment for a specific service', 1]],
}));
Q('s3_tara_compare', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Calculate the income tax and the average rate for incomes of ₹${inr(INCOMES[1])} and ₹${inr(INCOMES[2])} under the imagined Taranagar schedule (${slabText}). What type of tax is it?`,
  model: `**₹${inr(INCOMES[1])}**: nil on ₹2,50,000 + 10 per cent of ₹2,50,000 = **₹${inr(PROG[1])}**; average rate **${PROG_AVG[1]} per cent**.\n**₹${inr(INCOMES[2])}**: ₹35,000 on the 10 per cent slab + 20 per cent of ₹4,00,000 = ₹80,000; total **₹${inr(PROG[2])}**; average rate **${PROG_AVG[2]} per cent**.\nThe average rate **rises with income**, so the tax is **progressive**.`,
  sol: 'Slab by slab, then compare average rates.',
  scheme: [[`Tax on ₹${inr(INCOMES[1])}`, 1], [`Tax on ₹${inr(INCOMES[2])}`, 1], ['Average rates and type', 1]],
}));
Q('s3_indirect_merits', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three advantages that the imagined government of Malwa might see in indirect taxes such as a tax on goods sold in shops.',
  model: '1. **Wide coverage**: everyone who buys goods pays something, so even people outside the income-tax net contribute.\n2. **Convenient**: the tax is paid in **small amounts** with each purchase and is hidden in the price, so it is felt less.\n3. **Can guide consumption**: high rates on **harmful goods** such as tobacco reduce their use (also hard to evade at the point of sale).',
  sol: 'Any three advantages.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Third advantage', 1]],
}));
Q('s3_regressive_case', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `An imagined municipality plans a flat levy of ₹${inr(FLAT)} a year on every family. Show, for incomes of ₹${inr(INCOMES[0])} and ₹${inr(INCOMES[2])}, why the levy is regressive and who bears more of its burden.`,
  model: `For ₹${inr(INCOMES[0])}: ${inr(FLAT)} ÷ ${inr(INCOMES[0])} = **${REG_AVG[0]} per cent** of income. For ₹${inr(INCOMES[2])}: ${inr(FLAT)} ÷ ${inr(INCOMES[2])} = **${REG_AVG[2]} per cent**. The share of income taken **falls as income rises**, so the levy is **regressive**: the poorer family bears a **five times heavier** burden relative to its income, although both pay the same rupees.`,
  sol: 'Average rates fall with income.',
  scheme: [['Rate for the smaller income', 1], ['Rate for the larger income', 1], ['Regressive, poorer family burdened more', 1]],
}));
Q('l_taxes_full', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts. [3 + 2]\n\n(a) The imagined state of Taranagar taxes income as follows: ${slabText}. Calculate the tax and the average rate for an income of ₹${inr(Y45)}, and state the marginal rate on that income. [3]\n(b) Explain why the tax is progressive and how such a tax helps to reduce inequality. [2]`,
  model: `(a) First ₹2,50,000: **nil**. Next ₹2,00,000 (₹2,50,001 to ₹4,50,000) at 10 per cent = **₹${inr(T45)}**. Total tax **₹${inr(T45)}**; average rate = ${inr(T45)} ÷ ${inr(Y45)} × 100 = **${avgRate(T45, Y45)} per cent**. The **marginal rate** (on the last rupee) is **10 per cent**, since the income lies in the second slab.\n(b) The **average rate rises with income** (nil, then 10 and 20 per cent slabs), so richer people pay a **larger share** of their income. The revenue can be spent on **schools, health care and subsidies** for poorer families, so the gap between post-tax incomes **narrows**.`,
  sol: 'Slab calculation, average and marginal rates; progressivity and redistribution.',
  scheme: [['Slab calculation', 1], ['Average rate', 1], ['Marginal rate', 1], ['Why progressive', 1], ['Link to inequality', 1]],
}));

Q('l_direct_indirect_eval', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Answer both parts about the tax system of the imagined Republic of Navgarh. [2 + 3]\n\n(a) Give two merits of direct taxes. [2]\n(b) Navgarh raises most of its revenue from taxes on goods. Evaluate this choice, giving one advantage and two disadvantages, and suggest a change. [3]',
  model: '(a) **Equity**: direct taxes can be **progressive**, taking a larger share from those with a greater ability to pay. **Certainty**: the taxpayer knows how much is due and when, and the government can **estimate revenue** in advance.\n(b) **Advantage**: taxes on goods have a **wide base**, reaching people outside the income-tax net, and are **hard to evade** at the point of sale. **Disadvantages**: they are **regressive** in effect, because poorer families spend a larger share of income on taxed goods; and they **raise prices**, which can feed **inflation**. **Suggestion**: shift some of the burden to **progressive income and wealth taxes**, and keep low rates on **essential goods**.',
  sol: 'Two merits; a balanced evaluation with a suggestion.',
  scheme: [['First merit', 1], ['Second merit', 1], ['Advantage of indirect taxes', 1], ['Two disadvantages', 1], ['Reasoned suggestion', 1]],
}));

// ================================================================ t03 Public expenditure
Q('m_pe_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A budget glossary of the imagined state of Uttarkhand defines public expenditure as',
  opts: ['spending by central, state and local governments on goods, services, salaries, transfers and assets', 'spending by households on food and clothing', 'spending by companies on new machines', 'money borrowed by citizens from banks'],
  sol: 'Public expenditure is the spending of public authorities. Household consumption, company investment and private bank loans are private spending.',
}));
Q('m_pe_growth', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The imagined government of Brahmaputra Pradesh builds power lines, rural roads and a river port. The main way this spending helps the economy is by',
  opts: ['creating infrastructure that raises the productive capacity of private firms', 'reducing the money supply', 'raising the prices of imports', 'lowering the wages of construction workers'],
  sol: 'Power, roads and ports are infrastructure that private producers use; they raise productivity and attract investment. The other effects do not follow from such spending.',
}));
Q('m_pe_welfare', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Free textbooks, school meals and public health centres in an imagined district of Odisha are examples of public expenditure that mainly',
  opts: ['raises the welfare of poorer families and reduces inequality', 'increases the profits of private hospitals', 'reduces employment in the district', 'is a part of monetary policy'],
  sol: 'Such spending gives poorer families services they could not afford, raising welfare and narrowing inequality.',
}));
Q('m_pe_transfer', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Old-age pensions paid by the imagined government of Sahyagiri to retired farm workers are best described as',
  opts: ['transfer payments, because nothing is produced in return for them', 'payments for goods bought by the government', 'investment in new public assets', 'repayment of public debt'],
  sol: 'Pensions and scholarships are transfers: the government pays money without receiving a good or service in return.',
}));
Q('m_pe_share', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The imagined state of Sahyagiri spends (₹ crore): education ${SAH.education}, health ${SAH.health}, roads ${SAH.roads}, pensions ${SAH.pensions} and interest ${SAH.interest}. What share of the total goes to roads?`,
  opts: [`${pct(SAH.roads / SAH_TOTAL)} per cent`, `${pct(SAH.education / SAH_TOTAL)} per cent`, `${pct(SAH_SOCIAL / SAH_TOTAL)} per cent`, `${pct(SAH.pensions / SAH_TOTAL)} per cent`],
  sol: `Total = ${SAH_TOTAL}; roads share = ${SAH.roads} ÷ ${SAH_TOTAL} × 100 = ${pct(SAH.roads / SAH_TOTAL)} per cent.`,
}));
Q('ar_pe_multiplier', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Public spending on a new canal in a slack economy raises national income by more than the amount spent.',
  r: 'Public expenditure includes salaries paid to government employees.',
  sol: 'Both are true, but R does not explain A. A is explained by the multiplier: the canal\'s spending becomes income that is spent again. R is just one item of public expenditure.',
}));
Q('tf_pe_only_defence', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In a modern economy such as the imagined Republic of Navgarh, public expenditure is limited to defence and law and order.',
  sol: 'False. Modern governments also spend on education, health, infrastructure, subsidies, social security and development; the narrow "police state" view is outdated.',
}));
Q('n_social_share', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: pct(SAH_SOCIAL / SAH_TOTAL), unit: '%',
  stem: `The imagined state of Sahyagiri spends (₹ crore): education ${SAH.education}, health ${SAH.health}, roads ${SAH.roads}, pensions ${SAH.pensions} and interest ${SAH.interest}. What percentage of its spending goes to education and health together?`,
  sol: `Total = ${SAH.education} + ${SAH.health} + ${SAH.roads} + ${SAH.pensions} + ${SAH.interest} = ${SAH_TOTAL}. Education + health = ${SAH_SOCIAL}. Share = ${SAH_SOCIAL} ÷ ${SAH_TOTAL} × 100 = ${pct(SAH_SOCIAL / SAH_TOTAL)} per cent.`,
}));
Q('s_pe_two_roles', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two ways in which public expenditure by the imagined government of Vindhyagiri can raise employment.',
  model: '1. **Public works** such as roads, dams and housing **hire workers directly**.\n2. Spending raises **incomes**, which are spent on goods, so **private firms** expand output and **hire more** (the multiplier effect).',
  sol: 'Direct jobs and induced jobs.',
  scheme: [['Direct employment', 1], ['Induced employment through demand', 1]],
}));
Q('s_pe_dev_nondev', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Classify the following spending of the imagined state of Marathwada into developmental and non-developmental, with a reason: (i) building check dams, (ii) interest on old loans.',
  model: '(i) **Developmental**: check dams **raise farm output** and the economy\'s productive capacity.\n(ii) **Non-developmental**: interest on old loans **does not add** to current production or capacity; it only services past borrowing.',
  sol: 'Does the spending raise productive capacity?',
  scheme: [['(i) developmental with reason', 1], ['(ii) non-developmental with reason', 1]],
}));
Q('s3_pe_importance', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three reasons why public expenditure has become important in a developing economy like the imagined Republic of Sonbhadra.',
  model: '1. **Infrastructure**: roads, power and ports are too costly or unprofitable for private firms, yet all producers need them.\n2. **Human capital**: public schools and hospitals raise the skills and health of workers.\n3. **Reducing inequality and poverty**: subsidies, pensions and employment schemes support poorer households (also stabilising demand in slumps).',
  sol: 'Any three roles.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_pe_choose', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'The imagined state of Kosala can spend an extra ₹500 crore either on rural roads or on a bigger subsidy for cooking gas. Evaluate which choice does more for long-run growth, giving reasons.',
  model: '**Rural roads** do more for **long-run growth**. They are **capital assets** that cut transport costs, open markets for farmers and attract **private investment** for many years. A gas subsidy mainly **supports consumption today** and ends when the money is spent. The subsidy may still be justified for **welfare**, but its growth effect is smaller.',
  sol: 'Asset creation versus current consumption; a reasoned judgement.',
  scheme: [['Roads: lasting asset and private investment', 1], ['Subsidy: current consumption', 1], ['Reasoned judgement', 1]],
}));
Q('l_pe_full', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Answer both parts. [2 + 3]\n\n(a) Define public expenditure and distinguish a transfer payment from spending on goods and services. [2]\n(b) The imagined state of Sahyagiri spends (₹ crore): education ${SAH.education}, health ${SAH.health}, roads ${SAH.roads}, pensions ${SAH.pensions} and interest ${SAH.interest}. Calculate the share of education and health, and comment on what this pattern says about the state's priorities. [3]`,
  model: `(a) **Public expenditure** is the spending of central, state and local governments. Spending on **goods and services** (teachers' salaries, roads) uses up resources and produces something. A **transfer payment** (pensions, scholarships) **moves income** to people without any good or service in return.\n(b) Total = **${SAH_TOTAL}**; education + health = **${SAH_SOCIAL}**, a share of **${pct(SAH_SOCIAL / SAH_TOTAL)} per cent**. Half of all spending goes to **human development**, and roads take **${pct(SAH.roads / SAH_TOTAL)} per cent**, so the state gives priority to **schools, health and infrastructure**; interest takes only ${pct(SAH.interest / SAH_TOTAL)} per cent, so **past debt** is not crowding out development.`,
  sol: 'Definition and distinction; share and an interpretation of priorities.',
  scheme: [['Definition', 1], ['Transfer versus goods and services', 1], ['Total and share computed', 1], ['Priority to human development', 1], ['Comment on roads or interest', 1]],
}));

// ================================================================ t04 Public debt and deficit financing
Q('m_debt_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A student in an imagined Shillong college defines public debt for a quiz. The correct definition is',
  opts: ['loans raised by the government from the public, banks, institutions or abroad, which must be repaid with interest', 'taxes collected by the government that are never returned', 'money lent by households to private companies', 'grants received by the government from foreign countries that need not be repaid'],
  sol: 'Public debt is government borrowing that must be repaid with interest. Taxes and grants are not repaid; loans to companies are private debt.',
}));
Q('m_internal_external', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The imagined government of Suvarnabhumi sells bonds to its own citizens and banks. This borrowing is',
  opts: ['internal debt', 'external debt', 'a tax', 'deficit financing by the central bank only'],
  sol: 'Borrowing from people and institutions inside the country is internal debt; borrowing from foreign governments, banks or institutions is external debt.',
}));
Q('m_sinking_fund', mcq({
  t: 4, d: 2, c: 'application',
  stem: `The imagined government of Malabar Pradesh must repay a loan of ₹${SINK.debt} crore after ${SINK.years} years and sets aside an equal amount from its revenue every year into a separate fund. Ignoring interest on the fund, how much does it set aside each year, and what is this method called?`,
  opts: [`₹${SINK_ANNUAL} crore; a sinking fund`, `₹${SINK_ANNUAL} crore; conversion`, `₹${SINK.debt} crore; a capital levy`, `₹${SINK.debt / 6} crore; refunding`],
  sol: `${SINK.debt} ÷ ${SINK.years} = ${SINK_ANNUAL} crore a year, kept in a separate fund until the loan falls due: this is the sinking-fund method.`,
}));
Q('m_conversion', mcq({
  t: 4, d: 2, c: 'application',
  stem: `The imagined government of Kalinga replaces old bonds worth ₹${CONV.amount} crore carrying ${pct(CONV.oldRate)} per cent interest with new bonds carrying ${pct(CONV.newRate)} per cent. This method of managing debt is`,
  opts: ['conversion, which lowers the interest burden', 'a capital levy on the rich', 'deficit financing', 'repudiation of the debt'],
  sol: `Exchanging high-interest debt for lower-interest debt is conversion; the yearly interest falls from ${CONV_OLD} to ${CONV_NEW} crore.`,
}));
Q('m_capital_levy', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'To clear a large war-time loan, the imagined government of Tamraland imposes a one-time tax on the property of its richest citizens and uses the money to repay the loan. This method is called',
  opts: ['a capital levy', 'a sinking fund', 'refunding', 'conversion'],
  sol: 'A one-time tax on capital or wealth to repay debt is a capital levy.',
}));
Q('m_refunding', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'When bonds of the imagined government of Narmadapur fall due, it issues fresh bonds and uses the money to pay off the old ones. This method of handling debt is',
  opts: ['refunding', 'a capital levy', 'a terminal annuity', 'a surplus budget'],
  sol: 'Raising new loans to repay maturing ones is refunding: the debt is postponed, not reduced.',
}));
Q('m_deficit_financing', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A columnist in an imagined Pune newspaper writes about "deficit financing". In the Indian sense of the term, it means',
  opts: ['meeting a budget gap by borrowing from the central bank, which leads to the creation of new money', 'cutting public spending to balance the budget', 'raising income-tax rates on the rich', 'selling government land to private firms'],
  sol: 'Deficit financing covers the gap by borrowing from the central bank (and drawing down cash balances), which adds new money to the economy. Spending cuts and tax rises close the gap without it.',
}));
Q('ar_deficit_inflation', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Heavy deficit financing can lead to inflation.',
  r: 'Deficit financing adds new money to the economy without an equal rise in the output of goods.',
  sol: 'Both are true, and R explains A: more money chasing the same goods pushes prices up.',
}));
Q('ar_refunding_reduces', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'Under refunding, a government replaces maturing bonds with fresh ones.',
  r: 'Refunding reduces the total amount of public debt outstanding.',
  sol: 'A is true. R is false: refunding only postpones repayment, so the amount of debt stays the same.',
}));
Q('tf_surplus_repay', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the imagined government of Pratapgarh collects more revenue than it spends in a year, it can use the surplus to repay part of its public debt.',
  sol: 'True. A surplus budget is one of the methods of redemption: the excess of revenue over expenditure is used to repay debt.',
}));
Q('fb_terminal', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Repaying a public debt in equal yearly instalments, so that it is fully cleared by the end of a fixed period, is called the method of terminal ___.',
  acc: [['annuity', 'annuities']],
  sol: 'Equal yearly payments that clear the debt by a fixed date are a terminal annuity.',
}));
Q('n_conversion_saving', num({
  t: 4, d: 2, c: 'application', marks: 1, value: CONV_SAVE, unit: '₹ crore',
  stem: `The imagined government of Kalinga converts ₹${CONV.amount} crore of bonds from ${pct(CONV.oldRate)} per cent to ${pct(CONV.newRate)} per cent interest. By how much does its yearly interest bill fall (in ₹ crore)?`,
  sol: `Old interest = ${CONV.amount} × ${CONV.oldRate} = ${CONV_OLD}. New interest = ${CONV.amount} × ${CONV.newRate} = ${CONV_NEW}. Saving = ${CONV_OLD} − ${CONV_NEW} = ${CONV_SAVE} crore.`,
}));
Q('ord_sinking', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps by which the imagined government of Malabar Pradesh redeems a loan through a sinking fund, in the correct order.',
  items: [
    'It raises a loan for a fixed number of years',
    'It decides the equal amount to set aside every year',
    'It places that amount each year in a separate fund',
    'It repays the loan from the fund when the loan falls due',
  ],
  sol: 'Borrow first, plan the yearly amount, build the fund year by year, then repay at maturity.',
}));
Q('s_redeem_two', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name and explain any two methods that the imagined government of Godavaripur could use to redeem its public debt.',
  model: '1. **Sinking fund**: set aside a **fixed sum every year** in a separate fund and repay the loan from it at maturity.\n2. **Conversion**: replace **high-interest** loans with **lower-interest** ones to reduce the burden (also surplus budget, capital levy, terminal annuity, refunding).',
  sol: 'Any two methods with meaning.',
  scheme: [['First method explained', 1], ['Second method explained', 1]],
}));
Q('s_internal_external', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish internal debt from external debt for the imagined government of Suvarnabhumi.',
  model: '**Internal debt** is borrowed from **people, banks and institutions within the country**; repaying it only moves money **within** the economy. **External debt** is borrowed from **foreign governments, banks or institutions**; repaying it means sending **resources abroad**, often in foreign currency.',
  sol: 'Source of the loan and effect of repayment.',
  scheme: [['Internal debt', 1], ['External debt', 1]],
}));
Q('s_deficit_fin_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the meaning of deficit financing and one risk it carries, with reference to the imagined economy of Navgarh.',
  model: 'Deficit financing means covering the government\'s **budget gap** by **borrowing from the central bank**, which **creates new money**. Its main risk is **inflation**: if output does not rise as fast as the money supply, prices go up.',
  sol: 'Meaning plus the inflation risk.',
  scheme: [['Meaning', 1], ['Inflation risk', 1]],
}));
Q('s3_redeem_three', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'The finance minister of the imagined state of Uttarkhand wants to reduce its large public debt. Explain three methods she could use.',
  model: '1. **Surplus budget**: collect more revenue than is spent and use the surplus to **repay debt**.\n2. **Terminal annuity**: repay the debt in **equal yearly instalments** so it is cleared by a fixed date.\n3. **Capital levy**: impose a **one-time tax on wealth** of the richest and use it to repay loans (also sinking fund, conversion).',
  sol: 'Any three methods with explanation.',
  scheme: [['First method', 1], ['Second method', 1], ['Third method', 1]],
}));
Q('s3_debt_numbers', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined government of Malabar Pradesh owes ₹${SINK.debt} crore repayable after ${SINK.years} years, and ₹${ANN.debt} crore that it chooses to clear over ${ANN.years} years. Calculate (i) the yearly sum for a sinking fund for the first loan and (ii) the yearly principal instalment for the second as a terminal annuity, ignoring interest. How do the two methods differ?`,
  model: `(i) ${SINK.debt} ÷ ${SINK.years} = **₹${SINK_ANNUAL} crore** a year, placed in a separate **fund**; the loan is repaid **in one sum at maturity**.\n(ii) ${ANN.debt} ÷ ${ANN.years} = **₹${ANN_YEAR} crore** a year, paid **directly to lenders**, so the debt **shrinks every year** and ends after ${ANN.years} years.\nDifference: the sinking fund **accumulates** money until maturity; the annuity **repays a part each year**.`,
  sol: 'Equal yearly sums; accumulate versus repay in parts.',
  scheme: [['Sinking fund sum', 1], ['Annuity instalment', 1], ['Difference', 1]],
}));
Q('l_debt_full', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Answer both parts. [3 + 2]\n\n(a) The imagined government of Kalinga has old bonds of ₹${CONV.amount} crore at ${pct(CONV.oldRate)} per cent interest. Calculate the yearly saving if they are converted to ${pct(CONV.newRate)} per cent, and explain conversion and refunding as methods of managing debt. [3]\n(b) Evaluate whether deficit financing is a sound way for Kalinga to meet a large budget gap. [2]`,
  model: `(a) Old interest = ${CONV.amount} × ${pct(CONV.oldRate)} per cent = **₹${CONV_OLD} crore**; new interest = **₹${CONV_NEW} crore**; saving = **₹${CONV_SAVE} crore a year**. **Conversion** swaps high-interest debt for **cheaper debt**, cutting the interest burden. **Refunding** raises **fresh loans** to repay maturing ones, so repayment is **postponed** but the debt is not reduced.\n(b) Deficit financing gives the government **money quickly** and can help in a **slump** when there are idle resources. But used on a **large scale**, the new money outruns output and causes **inflation**, which hurts the poor most. It is sound only in **moderation**, for productive spending.`,
  sol: 'Saving calculated; two methods; a balanced judgement on deficit financing.',
  scheme: [['Interest saving', 1], ['Conversion explained', 1], ['Refunding explained', 1], ['Benefit of deficit financing', 1], ['Inflation risk and judgement', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('s4_tax_types', short({
  t: 2, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts. [2 + 2]\n\n(i) Under the imagined Taranagar income tax (${slabText}), find the tax on an income of ₹${inr(Y8)} and its average rate.\n(ii) A town in Taranagar also charges every family a flat ₹${inr(FLAT)} a year. Explain why this charge is regressive.`,
  model: `(i) Nil on ₹2,50,000; 10 per cent of ₹3,50,000 = ₹35,000; 20 per cent of ₹2,00,000 = ₹40,000. Tax = **₹${inr(T8)}**; average rate = ${inr(T8)} ÷ ${inr(Y8)} × 100 = **${T8_AVG} per cent**.\n(ii) A flat sum is a **larger share of a small income** than of a large one: ${REG_AVG[0]} per cent of ₹${inr(INCOMES[0])} but only ${REG_AVG[2]} per cent of ₹${inr(INCOMES[2])}. Because the **rate falls as income rises**, the charge is **regressive**.`,
  sol: 'Slab tax and average rate; falling share of income.',
  scheme: [['(i) Tax computed', 1], ['(i) Average rate', 1], ['(ii) Shares at two incomes', 1], ['(ii) Regressive conclusion', 1]],
}));
Q('s4_debt_methods', short({
  t: 4, d: 2, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both subparts about the imagined state of Pratapgarh. [2 + 2]\n\n(i) Explain how a surplus budget can be used to redeem public debt.\n(ii) Distinguish a capital levy from refunding.',
  model: '(i) When revenue **exceeds expenditure**, the government has a **surplus**; it uses this money to **repay lenders**, so the outstanding debt **falls** without new borrowing.\n(ii) A **capital levy** is a **one-time tax on wealth** whose proceeds repay debt, so the debt is actually **reduced**. **Refunding** raises **new loans** to repay maturing ones, so the debt is only **postponed**, not reduced.',
  sol: 'Surplus repays debt; levy reduces, refunding postpones.',
  scheme: [['(i) Surplus defined', 1], ['(i) Used to repay debt', 1], ['(ii) Capital levy', 1], ['(ii) Refunding and the contrast', 1]],
}));
Q('s4_pe_fp', short({
  t: [1, 3], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both subparts about the imagined economy of Sindhupur, where demand is weak. [2 + 2]\n\n(i) Explain how raising public expenditure on housing can raise national income by more than the amount spent.\n(ii) Explain why the government might prefer more spending to a tax cut of the same size.',
  model: '(i) The spending becomes **income** for builders and workers; they spend part of it, which becomes others\' income, and so on. Through this **multiplier** chain, total income rises **several times** the first outlay.\n(ii) Every rupee of **spending** enters demand **directly**, while part of a **tax cut is saved**, so the first round of demand is smaller. Spending can also be **targeted** at areas with the most idle workers.',
  sol: 'Multiplier chain; spending is fully injected.',
  scheme: [['(i) Income becomes spending', 1], ['(i) Multiplier result', 1], ['(ii) Part of tax cut saved', 1], ['(ii) Targeting or direct effect', 1]],
}));
Q('l8_fiscal_tools', long({
  t: [1, 2], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain how the government of the imagined Republic of Suryadesh could use its three fiscal instruments to fight inflation caused by excess demand.\n(ii) Suryadesh taxes income as follows: ${slabText}. Calculate the tax and average rate for incomes of ₹${inr(INCOMES[1])} and ₹${inr(INCOMES[2])}, and explain how such a tax also serves an equity objective.`,
  model: `(i) **Taxation**: raise direct taxes, especially on higher incomes, so **disposable income and spending fall**. **Public expenditure**: cut or postpone **non-essential spending**, so government demand falls and its multiplier effect works in reverse. **Public borrowing**: borrow from the **public** rather than the central bank, which **absorbs surplus purchasing power** without creating new money. Together these reduce **aggregate demand** and ease the pressure on prices. Because a cut in public spending also lowers incomes through the multiplier, the government should protect **essential services** such as health and schooling and cut wasteful or postponable items first.\n(ii) ₹${inr(INCOMES[1])}: tax **₹${inr(PROG[1])}**, average **${PROG_AVG[1]} per cent**. ₹${inr(INCOMES[2])}: ₹35,000 + 20 per cent of ₹4,00,000 = **₹${inr(PROG[2])}**, average **${PROG_AVG[2]} per cent**. The **average rate rises with income**, so the richer person pays a **larger share**; the revenue can fund **services and transfers** for poorer people, so the tax **narrows inequality**. The lowest earners, below the first slab, pay **nothing at all**, which protects families that can least afford to give up income.`,
  sol: 'Three instruments against excess demand; progressive tax computations and equity.',
  scheme: [['(i) Taxation', 1], ['(i) Expenditure cut', 1], ['(i) Borrowing from the public', 1], ['(i) Combined effect on demand', 1], ['(ii) Tax at the lower income', 1], ['(ii) Tax at the higher income', 1], ['(ii) Average rates compared', 1], ['(ii) Equity explained', 1]],
}));
Q('l8_pe_debt', long({
  t: [3, 4], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the importance of public expenditure for growth and welfare in the imagined state of Sahyagiri, which spends (₹ crore) education ${SAH.education}, health ${SAH.health}, roads ${SAH.roads}, pensions ${SAH.pensions} and interest ${SAH.interest}.\n(ii) Sahyagiri also owes ₹${SINK.debt} crore repayable after ${SINK.years} years. Explain the sinking-fund method with the yearly sum (ignore interest), and evaluate it against refunding.`,
  model: `(i) Spending on **education and health** (₹${SAH_SOCIAL} crore, ${pct(SAH_SOCIAL / SAH_TOTAL)} per cent) builds **human capital**: healthier, better-educated workers are more productive. **Roads** (${pct(SAH.roads / SAH_TOTAL)} per cent) cut transport costs and attract **private investment**. **Pensions** are transfers that protect the **elderly poor**, raising welfare. Interest (${pct(SAH.interest / SAH_TOTAL)} per cent) is small, so most spending goes to **development**.\n(ii) Under a **sinking fund**, the state sets aside **₹${SINK_ANNUAL} crore a year** (${SINK.debt} ÷ ${SINK.years}) in a **separate fund** and repays the loan in full when it falls due. It is **disciplined**: the burden is spread evenly and the debt is actually **cleared**. **Refunding** only **replaces** old loans with new ones, so the debt and its interest **continue**. The sinking fund is sounder, though it needs **steady surpluses** of revenue to work.`,
  sol: 'Spending roles with the data; sinking fund sum and a judgement against refunding.',
  scheme: [['(i) Human capital', 1], ['(i) Infrastructure', 1], ['(i) Transfers and welfare', 1], ['(i) Use of the data', 1], ['(ii) Sinking fund explained', 1], ['(ii) Yearly sum', 1], ['(ii) Refunding contrasted', 1], ['(ii) Judgement', 1]],
}));

// ================================================================ case-based
Q('cb_tara_tax', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined tax notice of Taranagar and answer the questions that follow. *(Written by SOYL for practice; the state, people and rates are imagined.)*',
  passage: `**Taranagar income tax for the year (imagined)**\n\n| Slab of income | Rate |\n|---|---|\n| Up to ₹2,50,000 | Nil |\n| ₹2,50,001 to ₹6,00,000 | 10 per cent |\n| Above ₹6,00,000 | 20 per cent |\n\nThe notice adds that a tax on goods sold in shops is collected separately by traders and added to prices. Anita, a nurse, earns ₹${inr(INCOMES[1])}; her brother Vikram, an engineer, earns ₹${inr(INCOMES[2])}.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: PROG[1], unit: '₹', stem: 'Calculate Anita\'s income tax (in ₹).', sol: `Nil on ₹2,50,000; 10 per cent of ₹2,50,000 = ${PROG[1]}, that is ₹${inr(PROG[1])}.` })),
    child('b', num({ t: 2, d: 3, c: 'application', marks: 1, value: PROG[2], unit: '₹', stem: 'Calculate Vikram\'s income tax (in ₹).', sol: `₹35,000 on the 10 per cent slab + 20 per cent of ₹4,00,000 = 35,000 + 80,000 = ${PROG[2]}, that is ₹${inr(PROG[2])}.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using their average rates, show what type of income tax this is.', model: `Anita pays ${PROG_AVG[1]} per cent of her income and Vikram ${PROG_AVG[2]} per cent. The **rate rises with income**, so the income tax is **progressive**.`, sol: 'Compare average rates.', scheme: [['Average rates', 1], ['Progressive', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Classify the tax on goods sold in shops as direct or indirect, and explain its effect on Anita compared with Vikram.', model: 'It is **indirect**: traders pay it and **pass it on** in prices. If both buy similar goods, it takes a **bigger share** of Anita\'s smaller income, so its burden is **regressive**.', sol: 'Shifted, so indirect; heavier on lower incomes.', scheme: [['Indirect with reason', 1], ['Heavier burden on Anita', 1]] }),
    ]),
  ],
}));
Q('cb_kalinga_debt', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined report from the finance department of Kalinga and answer the questions that follow. *(Written by SOYL for practice; the state and figures are imagined.)*',
  passage: `**Kalinga finance department: debt plan (imagined)**\n\nThe state holds ₹${CONV.amount} crore of old bonds paying ${pct(CONV.oldRate)} per cent interest. Market rates have fallen, so the department proposes to replace them with new bonds at ${pct(CONV.newRate)} per cent. A separate loan of ₹${SINK.debt} crore falls due in ${SINK.years} years; the department will put an equal sum into a dedicated fund every year. Some members suggest that the state could instead borrow from the central bank whenever money runs short.`,
  parts: [
    child('a', short({ t: 4, d: 1, c: 'understanding', marks: 1, stem: 'Name the method of debt management described for the old bonds.', model: '**Conversion** (replacing high-interest bonds with lower-interest ones).', sol: 'Swap to a lower rate.', scheme: [['Conversion', 1]] })),
    child('b', num({ t: 4, d: 2, c: 'application', marks: 1, value: SINK_ANNUAL, unit: '₹ crore', stem: 'Ignoring interest on the fund, how much must Kalinga put into the fund each year (in ₹ crore)?', sol: `${SINK.debt} ÷ ${SINK.years} = ${SINK_ANNUAL} crore a year.` })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the suggestion to borrow from the central bank whenever money runs short.', model: 'Borrowing from the central bank is **deficit financing**: it is quick, but it **creates new money**. Used often, it pushes up **prices** and weakens fiscal discipline, so it should be a **last resort**, kept small.', sol: 'Name it and weigh the inflation risk.', scheme: [['Deficit financing, new money', 1], ['Inflation risk and judgement', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Calculate the yearly interest saved by the conversion.', model: `Old: ${CONV.amount} × ${pct(CONV.oldRate)} per cent = ₹${CONV_OLD} crore. New: ₹${CONV_NEW} crore. **Saving = ₹${CONV_SAVE} crore a year.**`, sol: 'Old interest minus new interest.', scheme: [['Both interest amounts', 1], ['Saving', 1]] }),
    ]),
  ],
}));
Q('cb_kaveripur_slump', caseQ({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined news report from Kaveripur and answer the questions that follow. *(Written by SOYL for practice; the state is imagined.)*',
  passage: '**Kaveripur: factories idle, state plans response (imagined)**\n\nSales of textiles and two-wheelers have fallen for a year, and many workshops in Kaveripur have cut shifts. The state government has announced a programme of canal repairs and rural roads that will employ local workers, a cut in a tax on small shops, and a loan from the public through new state bonds to pay for the work.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Is the state\'s fiscal policy expansionary or contractionary? Give one reason.', model: '**Expansionary**: it **raises public spending** on canals and roads (or cuts a tax).', sol: 'More spending, lower tax.', scheme: [['Expansionary with reason', 1]] })),
    child('b', short({ t: [1, 3], d: 2, c: 'understanding', marks: 1, stem: 'Identify the three fiscal instruments in the report.', model: '**Public expenditure** (canals and roads), **taxation** (the tax cut) and **public borrowing** (state bonds).', sol: 'Spending, tax, borrowing.', scheme: [['All three named', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the canal and road programme can raise incomes beyond the wages it pays.', model: 'The wages are **spent** in local shops, whose owners and suppliers then **earn and spend** in turn. This **multiplier** chain raises total income by more than the first outlay, and the roads also help **future production**.', sol: 'Multiplier plus lasting assets.', scheme: [['Spending chain', 1], ['Multiplier or lasting asset', 1]] }), [
      short({ t: [1, 4], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Comment on the choice to borrow from the public rather than raise taxes now.', model: 'Raising taxes now would **cut spending** just when demand is weak. Borrowing uses **idle savings** and spreads the cost over future years, when incomes are higher; the risk is a growing **interest burden** if borrowing continues.', sol: 'Avoids reducing demand now; watch the interest burden.', scheme: [['Why not tax now', 1], ['Benefit and risk of borrowing', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items (bank and deck checks)
Q('m_impact_incidence', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined tax on cement in Rajputana is paid to the government by the cement factories, but builders and home-buyers end up paying higher prices. Which statement is correct?',
  opts: ['The impact is on the factories and the incidence is on the buyers', 'The impact and incidence are both on the factories', 'The impact is on the buyers and the incidence on the factories', 'There is no incidence because the tax is indirect'],
  sol: 'Impact is on whoever pays the government (the factories); incidence is on whoever finally bears it (the buyers who pay higher prices).',
}));
Q('m_pe_stabilise', mcq({
  t: [1, 3], d: 3, c: 'analysis',
  stem: 'In a year of drought in the imagined state of Bundelkhand, farm incomes collapse and the state increases spending on relief works. This use of public expenditure mainly serves the objective of',
  opts: ['stabilising incomes and demand during a downturn', 'raising the cash reserve ratio', 'reducing the money supply', 'raising indirect taxes on food'],
  sol: 'Relief works pay wages when private incomes fall, holding up demand and incomes: a stabilising role of public expenditure.',
}));
Q('m_debt_burden', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Why is the external debt of the imagined Republic of Navgarh usually considered a heavier burden than its internal debt of the same size?',
  opts: ['Repaying it sends resources and foreign exchange out of the country', 'It never has to be repaid', 'It carries no interest', 'It is always borrowed from the central bank'],
  sol: 'Internal debt repayment moves money between citizens; external debt repayment transfers resources abroad and needs foreign exchange.',
}));
