// CBSE 12 Economics, ch04 Government Budget and the Economy — question bank. Every scenario, table and
// passage is written by SOYL (imagined governments, states and figures); no NCERT exercise or
// board/sample-paper item is reused. Real-world facts are limited to stable ones (definitions, the
// April–March financial year, GST from 2017, the FRBM Act 2003). No actual Union Budget figure is stated.
// Every deficit figure is computed here from the budget items, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
/**
 * Budget arithmetic. b = { rr (revenue receipts), re (revenue expenditure), ce (capital expenditure),
 * ndcr (non-debt capital receipts: recovery of loans + disinvestment + others), int (interest payments) }.
 */
export function deficits(b) {
  const te = b.re + b.ce;
  const rd = b.re - b.rr;
  const fd = te - (b.rr + b.ndcr);
  const pd = fd - b.int;
  return { te, rd, fd, pd, borrow: fd };
}

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// Figures (all imagined, ₹ crore), checked by assertions below.
const RRQ = { tax: 2450, nontax: 380 }; // num_rev_receipts
const RDQ = { re: 3120, rr: 2640 }; // num_rd
const FDQ = { te: 4500, rr: 3000, rec: 150, dis: 100 }; // num_fd
const FDQv = FDQ.te - (FDQ.rr + FDQ.rec + FDQ.dis);
const PDQ = { fd: 900, int: 340 }; // num_pd
const INQ = { fd: 1100, pd: 250 }; // num_interest
const NDQ = { rec: 120, dis: 230, borrow: 900 }; // num_nondebt
const MFD = { te: 6000, borrow: 1400 }; // m_fd_calc
const S3C = { rr: 1500, re: 1800, ce: 700, ndcr: 100, int: 250 }; // s3_compute
const S3Cd = deficits(S3C);
const LC = { tax: 4200, nontax: 800, rec: 200, dis: 300, borrow: 2500, re: 6000, int: 1600, ce: 2000 }; // l_compute
const LCd = deficits({ rr: LC.tax + LC.nontax, re: LC.re, ce: LC.ce, ndcr: LC.rec + LC.dis, int: LC.int });
const Y1 = { rr: 2000, re: 2300, ce: 600, ndcr: 100, int: 400 }; // cb_budget year 1
const Y2 = { rr: 2400, re: 2500, ce: 800, ndcr: 200, int: 500 }; // cb_budget year 2
const Y1d = deficits(Y1), Y2d = deficits(Y2);
const LED = { incomeTax: 640, gstShare: 910, fees: 75, dividends: 45, recovery: 60, borrow: 420 }; // cb_classify
const LEDrr = LED.incomeTax + LED.gstShare + LED.fees + LED.dividends;
for (const [ok, what] of [
  [RRQ.tax + RRQ.nontax === 2830, 'RRQ'], [RDQ.re - RDQ.rr === 480, 'RDQ'], [FDQv === 1250, 'FDQ'], [PDQ.fd - PDQ.int === 560, 'PDQ'],
  [INQ.fd - INQ.pd === 850, 'INQ'], [NDQ.rec + NDQ.dis === 350, 'NDQ'],
  [S3Cd.rd === 300 && S3Cd.fd === 900 && S3Cd.pd === 650, 'S3C'],
  [LCd.rd === 1000 && LCd.fd === 2500 && LCd.fd === LC.borrow && LCd.pd === 900 && LCd.te === LC.tax + LC.nontax + LC.rec + LC.dis + LC.borrow, 'LC'],
  [Y1d.rd === 300 && Y1d.fd === 800 && Y1d.pd === 400 && Y2d.rd === 100 && Y2d.fd === 700 && Y2d.pd === 200, 'Y'],
  [LEDrr === 1670, 'LED'],
]) if (!ok) throw new Error(`figure check failed: ${what}`);

// ================================================================ t01 Meaning, objectives and components
Q('m_budget_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A government budget is best described as',
  opts: [
    'an annual statement of the estimated receipts and expenditure of the government for the coming financial year',
    'a record of all the money the government actually spent in the previous ten years',
    'a list of the taxes paid by households in a year',
    'a statement of the foreign exchange earned by the country in a year',
  ],
  sol: 'A budget is a plan for the year ahead: it shows estimates of receipts and of expenditure. It is not a record of past spending alone, nor only a list of taxes, and foreign exchange earnings belong to the balance of payments.',
}));
Q('m_fin_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In India, the financial year for which the Union budget is prepared runs from',
  opts: ['1 April to 31 March', '1 January to 31 December', '1 July to 30 June', '1 October to 30 September'],
  sol: 'The Indian financial year begins on 1 April and ends on 31 March of the next calendar year.',
}));
Q('m_realloc', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined state government raises the tax on sugary soft drinks and gives a subsidy on rooftop solar panels. Which objective of the budget does this mainly serve?',
  opts: ['Reallocation of resources', 'Redistribution of income', 'Management of public enterprises', 'Reducing the revenue deficit'],
  sol: 'Taxing a harmful good and subsidising a useful one shifts production away from the first and towards the second, which is the reallocation objective. Redistribution is about narrowing the gap between rich and poor, which this measure does not aim at.',
}));
Q('m_redistribution', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which pair of budget measures works most directly towards **redistribution of income**?',
  opts: [
    'Higher income-tax rates on higher incomes, and free midday meals in government schools',
    'A subsidy on solar panels, and a tax on tobacco',
    'Cutting government spending when prices rise fast, and raising it in a slump',
    'Selling shares of a public enterprise, and recovering loans from states',
  ],
  sol: 'Progressive taxes take a larger share from the rich, and free meals give real income to poorer families, so the gap narrows. The second pair is reallocation, the third is stabilisation, and the fourth only raises capital receipts.',
}));
Q('m_stabilisation', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'During a slump, when many workers in an imagined country cannot find jobs, the government raises spending on roads and rural works. Which budget objective is it pursuing?',
  opts: ['Economic stability', 'Reallocation of resources', 'Management of public enterprises', 'Reducing the fiscal deficit'],
  sol: 'Extra government spending raises aggregate demand, output and employment in a slump, smoothing the ups and downs of the economy: the stability objective. Higher spending would raise, not reduce, the fiscal deficit.',
}));
Q('m_public_goods', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why are public goods such as street lights and national defence usually provided by the government rather than by private firms?',
  opts: [
    'People who do not pay cannot be excluded from their benefits, so private firms cannot collect enough payment',
    'They are always cheaper for the government to produce',
    'Private firms are not allowed by law to produce any good',
    'Their benefit can be enjoyed by only one person at a time',
  ],
  sol: 'Public goods are non-excludable and non-rival: everyone benefits whether or not they pay, so people can be free riders and no private seller can charge enough. The last option describes a private good, the opposite of a public good.',
}));
Q('m_pub_ent', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'One reason a government runs public enterprises in sectors such as railways or electricity transmission is to',
  opts: [
    'prevent a private monopoly from charging very high prices for an essential service',
    'make sure that no taxes are ever needed',
    'increase the number of private firms in those sectors',
    'avoid presenting a budget to Parliament',
  ],
  sol: 'Sectors such as railways and power lines tend to be natural monopolies. Public ownership is one way to keep essential services affordable and to avoid concentration of economic power. The other options are not aims of public enterprises.',
}));
Q('ar_public_goods', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Private firms are unlikely to supply enough street lighting in a town.',
  r: 'It is very hard to stop people who have not paid from enjoying the light from a street lamp.',
  sol: 'Both are true, and R explains A: because non-payers cannot be excluded, people can enjoy the light free, so a private firm cannot collect enough revenue to supply it. That is why the government provides it.',
}));
Q('tf_budget_both', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? A government budget shows only the expenditure the government plans for the year.',
  sol: 'A budget shows both sides: the estimated receipts (taxes, non-tax revenue, capital receipts) and the estimated expenditure.',
}));
Q('fb_objective', fb({
  t: 1, d: 1, c: 'understanding',
  stem: 'When the government taxes harmful goods and subsidises socially useful ones, it is using the budget for ___ of resources.',
  acc: [['reallocation', 'allocation']],
  sol: 'Taxes and subsidies change the profitability of goods and shift resources between uses: reallocation of resources.',
}));
Q('mt_objectives', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each budget measure of an imagined government with the objective it mainly serves.',
  pairs: [
    ['Heavy tax on cigarettes, subsidy on organic manure', 'Reallocation of resources'],
    ['Free school uniforms for children of poor families', 'Redistribution of income'],
    ['Cutting spending when prices are rising fast', 'Economic stability'],
    ['Running a state-owned power transmission company', 'Managing public enterprises'],
  ],
  sol: 'Taxes and subsidies on particular goods shift resources; transfers to the poor reduce inequality; cutting spending in inflation reduces aggregate demand (stability); running a natural monopoly in public hands is the public-enterprise objective.',
}));
Q('s_public_goods', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are public goods? Give two of their features.',
  model: 'Public goods are goods whose benefit goes to everyone together, such as **national defence** or a **lighthouse**.\n1. **Non-excludable:** people who do not pay cannot be kept out.\n2. **Non-rival:** one person\'s use does not reduce the amount available to others.',
  sol: 'Define with an example, then two features: non-excludability and non-rivalry.',
  scheme: [['Meaning with an example', 1], ['Two features (non-excludable, non-rival)', 1]],
}));
Q('s_redistribution', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How can a government use its budget to reduce inequality of income? Give two ways.',
  model: '1. **Taxes:** levy **progressive income tax**, so that people with higher incomes pay a larger share of their income.\n2. **Spending:** use the revenue for **subsidised food, free education and health care** for poorer families, which raises their real income.',
  sol: 'One way through taxation and one through expenditure, each linked to narrowing the income gap.',
  scheme: [['Way through taxation', 1], ['Way through expenditure', 1]],
}));
Q('s3_stabilisation', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain how a government can use its budget to reduce fluctuations in the economy, both in a slump and in a boom.',
  model: '1. Fluctuations come from changes in **aggregate demand**; the budget can push demand the other way.\n2. **Slump (deficient demand):** the government **raises its spending** on roads, schools and rural works, or **cuts taxes**, so that incomes and demand rise and unemployment falls.\n3. **Boom with inflation (excess demand):** it **cuts spending** or **raises taxes**, which takes purchasing power out of the economy and slows price rise.',
  sol: 'Start from aggregate demand, then the opposite measures for a slump and for inflation.',
  scheme: [['Link to aggregate demand', 1], ['Measures in a slump', 1], ['Measures in a boom', 1]],
}));
Q('l_objectives', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any **four** objectives of a government budget, with an example of a budget measure for each.',
  model: '1. **Reallocation of resources:** markets may underproduce useful goods. Taxing harmful goods (tobacco) and subsidising useful ones (clean energy) shifts resources. Public goods such as defence are provided directly.\n2. **Redistribution of income:** progressive taxes on high incomes and spending on free food, schooling and pensions for the poor narrow the income gap.\n3. **Economic stability:** more spending or lower taxes in a slump; less spending or higher taxes in an inflationary boom.\n4. **Managing public enterprises:** running natural monopolies such as railways in public hands keeps essential services affordable and prevents concentration of economic power.\nTogether these make the budget a tool of policy, not just accounts.',
  sol: 'Four distinct objectives, each explained in a line with one fitting budget measure, and a brief conclusion.',
  scheme: [['Reallocation with example', 1], ['Redistribution with example', 1], ['Stability with example', 1], ['Public enterprises with example', 1], ['Clear explanation linking measures to aims', 1]],
}));

// ================================================================ t02 Classification of receipts and expenditure
Q('m_rev_receipt_def', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Revenue receipts of the government are receipts that',
  opts: [
    'neither create a liability nor reduce the assets of the government',
    'create a liability for the government, like borrowing',
    'reduce the assets of the government, like selling shares of a public enterprise',
    'are always received from foreign governments',
  ],
  sol: 'Revenue receipts, such as taxes, fees and dividends, do not have to be repaid and do not use up any asset. Receipts that create a liability or reduce assets are capital receipts.',
}));
Q('m_cap_receipt', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which one of the following is a **capital receipt** of the government?',
  opts: ['Money raised by selling bonds to the public', 'Income tax collected from salaried people', 'Fees charged for a passport', 'Dividend received from a public-sector bank'],
  sol: 'Selling bonds is borrowing: the government must repay, so a liability is created and it is a capital receipt. Income tax is tax revenue; the passport fee and the dividend are non-tax revenue.',
}));
Q('m_disinvest', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined government sells part of its shares in a state-owned steel company to private investors. How is the money received classified?',
  opts: ['A non-debt capital receipt, because it reduces the government\'s assets', 'A revenue receipt, because it is a regular source of income', 'A capital receipt, because it creates a liability', 'Capital expenditure, because shares are assets'],
  sol: 'Disinvestment reduces the government\'s assets (its ownership of the company), so it is a capital receipt. It creates no liability, which is why it is called a non-debt capital receipt. It is money coming in, so it cannot be expenditure.',
}));
Q('m_direct_tax', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which one of the following is a **direct** tax?',
  opts: ['Corporation tax on the profits of companies', 'Goods and Services Tax (GST)', 'Customs duty on imported phones', 'Tax added to the price of a restaurant bill'],
  sol: 'Corporation tax is paid by the company on its own profits and cannot be passed on to someone else, so the impact and the incidence fall on the same person. GST, customs duty and a tax on a bill are indirect taxes, whose burden passes to buyers.',
}));
Q('m_nontax', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which of the following is a **non-tax revenue** receipt?',
  opts: ['Interest received on loans given by the Centre to states', 'Recovery of a loan given to a state government', 'Borrowing from the Reserve Bank', 'Income tax'],
  sol: 'Interest received is income from the government\'s own lending and creates no liability: non-tax revenue. Recovering the loan itself reduces an asset (a capital receipt), borrowing is a capital receipt, and income tax is tax revenue.',
}));
Q('m_rev_exp', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which item is **revenue expenditure** of the central government?',
  opts: ['Interest paid on loans taken by the government', 'Building a new national highway', 'Loans given to state governments', 'Buying shares of a new public enterprise'],
  sol: 'Interest payments create no asset and reduce no liability, so they are revenue expenditure. A highway and shares are assets, and a loan to states creates an asset (a claim), so those three are capital expenditure.',
}));
Q('m_cap_exp', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined city corporation spends money in four ways. Which is **capital expenditure**?',
  opts: ['Building a new metro line', 'Paying salaries to bus conductors', 'Paying pensions to retired staff', 'Buying diesel for its buses this year'],
  sol: 'A metro line is a lasting asset, so the spending on it is capital expenditure. Salaries, pensions and fuel are running costs that create no asset: revenue expenditure.',
}));
Q('m_repay', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'The government repays a loan it had taken from a foreign bank. This is capital expenditure because it',
  opts: ['reduces a liability of the government', 'creates a new asset for the government', 'is a regular, recurring payment', 'is paid out of tax revenue'],
  sol: 'Expenditure that creates an asset or reduces a liability is capital expenditure; repaying a loan reduces a liability. It creates no new asset. Being recurring or being paid from taxes does not decide the classification.',
}));
Q('m_gst', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Goods and Services Tax (GST), introduced in India in 2017, is',
  opts: ['an indirect tax', 'a direct tax on income', 'a non-tax revenue', 'a capital receipt'],
  sol: 'GST is levied on the supply of goods and services and its burden passes to the buyer in the price, so it is an indirect tax. It is tax revenue, a revenue receipt, not a capital receipt.',
}));
Q('m_grants_states', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The central government gives grants to states to build school classrooms. In the **central** budget, these grants are treated as',
  opts: ['revenue expenditure', 'capital expenditure', 'capital receipts', 'recovery of loans'],
  sol: 'The classrooms belong to the states, not to the Centre, so the Centre gains no asset and no liability falls: in the central budget all grants to states are revenue expenditure. Grants are paid out, so they are not receipts.',
}));
Q('ar_borrowing', ar({
  t: 2, d: 2, c: 'analysis', key: 'b',
  a: 'Borrowing by the government is a capital receipt.',
  r: 'The government borrows from the public, from banks and from abroad.',
  sol: 'Both statements are true, but R only lists the sources of borrowing. Borrowing is a capital receipt because it creates a liability that must be repaid, which R does not say.',
}));
Q('ar_grants', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Grants given by the central government to state governments are shown as revenue expenditure in the central budget.',
  r: 'Such grants do not create any asset for the central government.',
  sol: 'Both are true and R explains A: expenditure is capital only if it creates an asset or reduces a liability for the spender. Whatever the states build with the grant is theirs, so for the Centre it is revenue expenditure.',
}));
Q('ar_gst_direct', ar({
  t: 2, d: 2, c: 'analysis', key: 'd',
  a: 'GST is a direct tax.',
  r: 'The burden of GST can be shifted by the seller to the buyer.',
  sol: 'A is false: GST is an indirect tax. R is true, and it is exactly the reason GST is indirect: the person who pays it to the government passes its burden on to the buyer.',
}));
Q('tf_disinvest', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? Money from the sale of shares of a public enterprise is a revenue receipt.',
  sol: 'Selling shares reduces the government\'s assets, so it is a capital receipt (a non-debt capital receipt), not revenue.',
}));
Q('tf_interest', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Interest paid by the government on its past borrowing is revenue expenditure.',
  sol: 'Interest payments create no asset and do not reduce the loan itself, so they are revenue expenditure.',
}));
Q('fb_incidence', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'In a direct tax, the impact and the ___ of the tax fall on the same person.',
  acc: [['incidence', 'burden']],
  sol: 'A direct tax cannot be shifted: the person who pays it (impact) also bears its burden (incidence).',
}));
Q('mt_classify', match({
  t: 2, d: 3, c: 'application',
  stem: 'Match each item in an imagined central budget with its correct class.',
  pairs: [
    ['Dividends from a public-sector insurance company', 'Revenue receipt'],
    ['Recovery of a loan given to a state', 'Capital receipt'],
    ['Old-age pensions paid to citizens', 'Revenue expenditure'],
    ['Purchase of land for a new airport', 'Capital expenditure'],
  ],
  sol: 'Dividends create no liability (revenue receipt); loan recovery reduces an asset (capital receipt); pensions create no asset (revenue expenditure); land is an asset (capital expenditure).',
}));
Q('num_rev_receipts', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: RRQ.tax + RRQ.nontax, unit: '₹ crore',
  stem: `An imagined state government expects tax revenue of ₹${inr(RRQ.tax)} crore and non-tax revenue of ₹${inr(RRQ.nontax)} crore. It also plans to borrow ₹600 crore. Find its revenue receipts (in ₹ crore).`,
  sol: `Step 1: Revenue receipts = tax revenue + non-tax revenue; borrowing is a capital receipt and is left out.\nStep 2: ${inr(RRQ.tax)} + ${inr(RRQ.nontax)} = ${inr(RRQ.tax + RRQ.nontax)}. So ₹${inr(RRQ.tax + RRQ.nontax)} crore.`,
}));
Q('num_nondebt', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: NDQ.rec + NDQ.dis, unit: '₹ crore',
  stem: `An imagined government receives ₹${NDQ.rec} crore as recovery of loans, ₹${NDQ.dis} crore from disinvestment and ₹${NDQ.borrow} crore as borrowing. Find its non-debt capital receipts (in ₹ crore).`,
  sol: `Step 1: Non-debt capital receipts = recovery of loans + disinvestment; borrowing creates debt and is excluded.\nStep 2: ${NDQ.rec} + ${NDQ.dis} = ${NDQ.rec + NDQ.dis}. So ₹${NDQ.rec + NDQ.dis} crore.`,
}));
Q('s_rev_cap_receipt', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between revenue receipts and capital receipts, with one example of each.',
  model: '1. **Revenue receipts** neither **create a liability** nor **reduce assets**, e.g. income tax or dividends from public enterprises.\n2. **Capital receipts** either **create a liability** (borrowing) or **reduce assets** (disinvestment, recovery of loans), e.g. money raised by selling government bonds.',
  sol: 'State the test (liability or assets) for each kind and add one correct example to each.',
  scheme: [['Revenue receipts: meaning and example', 1], ['Capital receipts: meaning and example', 1]],
}));
Q('s_direct_indirect', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between direct and indirect taxes, with one example of each.',
  model: '1. A **direct tax** is paid by the person on whom it is levied and **cannot be shifted**; impact and incidence fall on the same person, e.g. **personal income tax**.\n2. An **indirect tax** is levied on goods and services and its burden **is shifted** to buyers through prices, e.g. **GST**.',
  sol: 'Use the shifting of the burden (impact versus incidence) as the basis, with one example each.',
  scheme: [['Direct tax with example', 1], ['Indirect tax with example', 1]],
}));
Q('s3_classify', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Classify the following as revenue or capital receipts, giving a reason for each: (i) money from selling shares of a state-owned airline; (ii) a fine paid by a factory for polluting a river; (iii) a loan taken from a foreign bank.',
  model: '(i) **Capital receipt:** selling shares **reduces the government\'s assets** (disinvestment).\n(ii) **Revenue receipt:** a fine is non-tax revenue; it creates **no liability** and **reduces no asset**.\n(iii) **Capital receipt:** a loan **creates a liability**, because it must be repaid with interest.',
  sol: 'For each item apply the test: does it create a liability or reduce an asset? Class plus reason earns the mark.',
  scheme: [['(i) Capital receipt with reason', 1], ['(ii) Revenue receipt with reason', 1], ['(iii) Capital receipt with reason', 1]],
}));
Q('s3_rev_cap_exp', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between revenue expenditure and capital expenditure of the government. Give one example of each.',
  model: '1. **Revenue expenditure** neither **creates an asset** nor **reduces a liability**. It meets the running costs of government, e.g. **salaries, pensions, interest payments, subsidies**.\n2. **Capital expenditure** either **creates an asset** (roads, dams, machinery, shares) or **reduces a liability** (repayment of loans), e.g. **building a dam**.\n3. Revenue expenditure is usually **recurring**; capital expenditure adds to the **productive capacity** of the economy.',
  sol: 'Give the asset/liability test for both, an example each, and one further point of difference.',
  scheme: [['Revenue expenditure: meaning and example', 1], ['Capital expenditure: meaning and example', 1], ['A further difference', 1]],
}));
Q('l_receipts', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the classification of government receipts with examples. Then classify, with reasons: (a) GST collected; (b) recovery of a loan given to a city corporation.',
  model: '1. **Revenue receipts** create no liability and do not reduce any asset of the government.\n   - **Tax revenue:** **direct** taxes (income tax, corporation tax) and **indirect** taxes (GST, customs duties).\n   - **Non-tax revenue:** interest and dividends, fees, fines, and grants received.\n2. **Capital receipts** create a liability or reduce assets.\n   - **Borrowings** (debt-creating) from the public, banks and abroad.\n   - **Non-debt:** recovery of loans and disinvestment.\n3. (a) **GST** is a **revenue receipt** (indirect tax): it creates no liability and reduces no asset.\n4. (b) **Recovery of a loan** is a **capital receipt**: the government\'s asset, its claim on the corporation, falls.',
  sol: 'Explain both classes with their test and sub-types, then classify the two items with reasons.',
  scheme: [['Revenue receipts: test', 1], ['Tax and non-tax revenue with examples', 1], ['Capital receipts: test, debt and non-debt', 1], ['(a) classified with reason', 1], ['(b) classified with reason', 1]],
}));
Q('cb_classify', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the extract and answer the questions that follow. *(Imagined state and figures, written by SOYL for practice.)*',
  passage: `**Receipts expected by the imagined state of Sahyagiri next year (₹ crore)**\n\n| Item | Amount |\n|---|---|\n| State\'s share of income tax collected by the Centre | ${inr(LED.incomeTax)} |\n| State GST | ${inr(LED.gstShare)} |\n| Fees from state hospitals and colleges | ${LED.fees} |\n| Dividends from the state electricity company | ${LED.dividends} |\n| Recovery of loans given to cooperative sugar mills | ${LED.recovery} |\n| Bonds sold in the market | ${LED.borrow} |\n\nThe finance minister of the state says that the bonds will be repaid over ten years.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Which item in the extract is a **non-debt** capital receipt?', opts: ['Recovery of loans given to cooperative sugar mills', 'Bonds sold in the market', 'Dividends from the state electricity company', 'State GST'], sol: 'Recovery of loans reduces an asset without creating debt. Bonds create debt; dividends and GST are revenue receipts.' })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: LEDrr, unit: '₹ crore', stem: 'Calculate the state\'s total revenue receipts (in ₹ crore).', sol: `Step 1: Revenue receipts = tax revenue + non-tax revenue = income-tax share + GST + fees + dividends.\nStep 2: ${inr(LED.incomeTax)} + ${inr(LED.gstShare)} + ${LED.fees} + ${LED.dividends} = ${inr(LEDrr)}. So ₹${inr(LEDrr)} crore.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why are the bonds a capital receipt even though the state gets cash from them this year?', model: 'The bonds must be **repaid over ten years with interest**, so they **create a liability** for the state. Any receipt that creates a liability is a **capital receipt**, whatever cash it brings in now.', sol: 'Point to repayment, hence a liability, hence capital.', scheme: [['Repayment creates a liability', 1], ['Hence a capital receipt', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Classify the fees and the dividends as tax or non-tax revenue, and give a reason.', model: 'Both are **non-tax revenue**. Fees are paid in return for a **specific service** (treatment, education) and dividends are earned from the state\'s **ownership** of a company; neither is a compulsory payment without a direct return, which is what a tax is.', sol: 'Non-tax revenue, with the reason that a tax is compulsory with no direct return.', scheme: [['Both non-tax revenue', 1], ['Reason contrasting with a tax', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Balanced, surplus and deficit budgets; measures of deficit
Q('m_balanced', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A budget is called **balanced** when',
  opts: ['estimated receipts are equal to estimated expenditure', 'estimated receipts are greater than estimated expenditure', 'estimated expenditure is greater than estimated receipts', 'there is no capital expenditure'],
  sol: 'Equal receipts and expenditure make a balanced budget. Receipts greater than expenditure make a surplus budget, and expenditure greater than receipts a deficit budget.',
}));
Q('m_fd_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The fiscal deficit of a government shows',
  opts: ['the total amount it needs to borrow in the year', 'the amount it needs to borrow only to pay interest', 'the excess of capital expenditure over capital receipts', 'the total debt it has built up over many years'],
  sol: 'Fiscal deficit = total expenditure − total receipts other than borrowing, so it equals the borrowing needed in the year. Borrowing beyond interest is shown by the primary deficit, and accumulated debt is a stock, not the deficit of one year.',
}));
Q('m_pd_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Primary deficit is the fiscal deficit minus',
  opts: ['interest payments', 'revenue deficit', 'capital expenditure', 'non-debt capital receipts'],
  sol: 'Primary deficit = fiscal deficit − interest payments. It shows how much the government must borrow for spending other than interest on past loans.',
}));
Q('m_rd_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A revenue deficit means that the government',
  opts: [
    'is using capital receipts, such as borrowing, to meet part of its running expenses',
    'has spent more on roads and dams than it planned',
    'has a surplus of tax revenue over all its spending',
    'has repaid more loans than it took',
  ],
  sol: 'Revenue deficit = revenue expenditure − revenue receipts. When it is positive, part of the day-to-day spending is financed by borrowing or by selling assets: the government is dissaving.',
}));
Q('m_fd_calc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined government plans total expenditure of ₹${inr(MFD.te)} crore. Its total receipts, including borrowings of ₹${inr(MFD.borrow)} crore, are also ₹${inr(MFD.te)} crore. What is its fiscal deficit?`,
  opts: [`₹${inr(MFD.borrow)} crore`, 'Zero, because total receipts equal total expenditure', `₹${inr(MFD.te)} crore`, `₹${inr(MFD.te - MFD.borrow)} crore`],
  sol: `Fiscal deficit = total expenditure − (total receipts − borrowings) = ${inr(MFD.te)} − ${inr(MFD.te - MFD.borrow)} = ${inr(MFD.borrow)}, which is simply the borrowing. Total receipts always equal total expenditure once borrowing is counted, so "zero" is a trap.`,
}));
Q('m_pd_zero', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'If the primary deficit of a government is **zero** while its fiscal deficit is positive, it means that the government is borrowing',
  opts: ['only to pay interest on its past loans', 'nothing at all in that year', 'only to build new assets', 'only to pay salaries and pensions'],
  sol: 'Primary deficit = fiscal deficit − interest. If it is zero, fiscal deficit = interest payments: all borrowing goes to paying interest on old debt. Borrowing is still positive, so "nothing at all" is wrong.',
}));
Q('m_surplus_when', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Prices in an imagined economy are rising fast because aggregate demand exceeds what the economy can produce at full employment. Which kind of budget would help most?',
  opts: ['A surplus budget', 'A deficit budget', 'A budget with a larger revenue deficit', 'A budget that raises subsidies on consumer goods'],
  sol: 'A surplus budget takes more out of the economy through taxes than it puts back through spending, which lowers aggregate demand and eases inflation. The other three would raise demand further.',
}));
Q('ar_fd_borrow', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'The fiscal deficit of a government equals its borrowing in that year.',
  r: 'Fiscal deficit is total expenditure minus total receipts other than borrowings.',
  sol: 'Both are true and R explains A: once all receipts except borrowing are subtracted from total expenditure, the gap left is exactly what has to be borrowed.',
}));
Q('ar_rd_concern', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A large revenue deficit is a cause for concern.',
  r: 'It means borrowed funds are being used for current spending, which creates no asset to help repay the loans.',
  sol: 'Both are true and R explains A: borrowing must be repaid with interest; if it pays for consumption rather than productive assets, future revenue does not rise to service it and debt keeps growing.',
}));
Q('ar_surplus', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'A surplus budget can help to control inflation.',
  r: 'In a surplus budget, government expenditure is greater than government receipts.',
  sol: 'A is true: taking more in taxes than is spent lowers aggregate demand. R is false: in a surplus budget, receipts exceed expenditure; expenditure greater than receipts is a deficit budget.',
}));
Q('ar_disinvest', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Disinvestment reduces the fiscal deficit of the year in which it takes place.',
  r: 'Disinvestment reduces the government\'s ownership of public enterprises.',
  sol: 'Both are true, but R does not explain A. The deficit falls because disinvestment is a non-debt capital receipt, which is subtracted from total expenditure in the fiscal-deficit formula, not because ownership falls.',
}));
Q('tf_fd_pd', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? If a government has no interest payments in a year, its primary deficit equals its fiscal deficit.',
  sol: 'Primary deficit = fiscal deficit − interest payments; with interest at zero, the two are the same.',
}));
Q('fb_pd', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Primary deficit = fiscal deficit − ___ payments.',
  acc: [['interest']],
  sol: 'Subtracting interest payments from the fiscal deficit gives the primary deficit.',
}));
Q('ord_pd', ord({
  t: 3, d: 2, c: 'application', marks: 1,
  stem: 'Arrange the steps for finding the primary deficit from budget data in the correct order.',
  items: [
    'Add revenue expenditure and capital expenditure to get total expenditure',
    'Add revenue receipts and non-debt capital receipts (leave out borrowings)',
    'Subtract the second total from total expenditure to get the fiscal deficit',
    'Subtract interest payments from the fiscal deficit',
  ],
  sol: 'Total expenditure first, then receipts other than borrowings, their difference is the fiscal deficit, and removing interest payments gives the primary deficit.',
}));
Q('num_rd', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: RDQ.re - RDQ.rr, unit: '₹ crore',
  stem: `An imagined government has revenue expenditure of ₹${inr(RDQ.re)} crore and revenue receipts of ₹${inr(RDQ.rr)} crore. Find its revenue deficit (in ₹ crore).`,
  sol: `Step 1: Revenue deficit = revenue expenditure − revenue receipts.\nStep 2: ${inr(RDQ.re)} − ${inr(RDQ.rr)} = ${RDQ.re - RDQ.rr}. So ₹${RDQ.re - RDQ.rr} crore.`,
}));
Q('num_fd', num({
  t: 3, d: 3, c: 'application', marks: 2, value: FDQv, unit: '₹ crore',
  stem: `For an imagined government (₹ crore): total expenditure ${inr(FDQ.te)}; revenue receipts ${inr(FDQ.rr)}; recovery of loans ${FDQ.rec}; disinvestment ${FDQ.dis}. Find the fiscal deficit (in ₹ crore).`,
  sol: `Step 1: Receipts other than borrowings = ${inr(FDQ.rr)} + ${FDQ.rec} + ${FDQ.dis} = ${inr(FDQ.rr + FDQ.rec + FDQ.dis)}.\nStep 2: Fiscal deficit = ${inr(FDQ.te)} − ${inr(FDQ.rr + FDQ.rec + FDQ.dis)} = ${inr(FDQv)}. So ₹${inr(FDQv)} crore.`,
  scheme: [['Receipts other than borrowings', 1], [`Fiscal deficit = ₹${inr(FDQv)} crore`, 1]],
}));
Q('num_pd', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: PDQ.fd - PDQ.int, unit: '₹ crore',
  stem: `The fiscal deficit of an imagined government is ₹${PDQ.fd} crore and its interest payments are ₹${PDQ.int} crore. Find the primary deficit (in ₹ crore).`,
  sol: `Step 1: Primary deficit = fiscal deficit − interest payments.\nStep 2: ${PDQ.fd} − ${PDQ.int} = ${PDQ.fd - PDQ.int}. So ₹${PDQ.fd - PDQ.int} crore.`,
}));
Q('num_interest', num({
  t: 3, d: 3, c: 'application', marks: 1, value: INQ.fd - INQ.pd, unit: '₹ crore',
  stem: `An imagined government has a fiscal deficit of ₹${inr(INQ.fd)} crore and a primary deficit of ₹${INQ.pd} crore. How much does it pay as interest (in ₹ crore)?`,
  sol: `Step 1: Primary deficit = fiscal deficit − interest, so interest = fiscal deficit − primary deficit.\nStep 2: ${inr(INQ.fd)} − ${INQ.pd} = ${INQ.fd - INQ.pd}. So ₹${INQ.fd - INQ.pd} crore.`,
}));
Q('s_fd_implications', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two implications of a high fiscal deficit.',
  model: '1. **Rising debt and interest burden:** borrowing today means **larger interest payments** tomorrow, which can push the government into borrowing again just to pay interest.\n2. **Inflation risk:** if the deficit is financed by borrowing from the **central bank**, money supply rises and prices may rise.',
  sol: 'Any two: debt and interest burden, inflation if monetised, less private borrowing room, burden on future generations.',
  scheme: [['First implication explained', 1], ['Second implication explained', 1]],
}));
Q('s_rd_vs_fd', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is a fiscal deficit used to build dams and roads considered less worrying than the same deficit used to pay salaries and subsidies?',
  model: 'Borrowing spent on **dams and roads** creates **assets** that raise output and future **revenue**, which helps repay the loan. Borrowing spent on **salaries and subsidies** shows up as a **revenue deficit**: it creates no asset, so the debt must be serviced from future taxes.',
  sol: 'Contrast asset creation (capital spending) with consumption spending (revenue deficit) and link each to repaying the debt.',
  scheme: [['Capital spending creates assets and future income', 1], ['Revenue spending creates no asset: debt burden', 1]],
}));
Q('s_three_budgets', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a surplus budget and a deficit budget, and state when each is suitable.',
  model: '1. **Surplus budget:** estimated receipts **exceed** estimated expenditure; suitable when there is **inflation** (excess demand).\n2. **Deficit budget:** estimated expenditure **exceeds** estimated receipts; suitable in a **slump** with unemployment (deficient demand).',
  sol: 'Define each by comparing receipts and expenditure, with the situation each suits.',
  scheme: [['Surplus budget: meaning and use', 1], ['Deficit budget: meaning and use', 1]],
}));
Q('s3_compute', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `From the data of an imagined government (₹ crore), calculate the (i) revenue deficit, (ii) fiscal deficit and (iii) primary deficit. Revenue receipts ${inr(S3C.rr)}; revenue expenditure ${inr(S3C.re)}; capital expenditure ${S3C.ce}; non-debt capital receipts ${S3C.ndcr}; interest payments ${S3C.int}.`,
  model: `(i) Revenue deficit = ${inr(S3C.re)} − ${inr(S3C.rr)} = **₹${S3Cd.rd} crore**.\n(ii) Total expenditure = ${inr(S3C.re)} + ${S3C.ce} = ${inr(S3Cd.te)}. Fiscal deficit = ${inr(S3Cd.te)} − (${inr(S3C.rr)} + ${S3C.ndcr}) = **₹${S3Cd.fd} crore**.\n(iii) Primary deficit = ${S3Cd.fd} − ${S3C.int} = **₹${S3Cd.pd} crore**.`,
  sol: 'Apply the three formulas in order; borrowings are never counted among the receipts for the fiscal deficit.',
  scheme: [[`Revenue deficit ₹${S3Cd.rd} crore`, 1], [`Fiscal deficit ₹${S3Cd.fd} crore`, 1], [`Primary deficit ₹${S3Cd.pd} crore`, 1]],
}));
Q('s3_fd_reduce', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Suggest three measures a government could take to reduce its fiscal deficit, and point out one difficulty with any one of them.',
  model: '1. **Raise revenue:** widen the tax base and improve tax collection, so that more people and firms pay.\n2. **Cut wasteful revenue expenditure:** better-targeted subsidies and lower administrative costs.\n3. **Non-debt capital receipts:** disinvestment in selected public enterprises.\n**Difficulty:** disinvestment brings money **only once** and gives up future dividends, so it does not cure a deficit that recurs every year.',
  sol: 'Three distinct measures (revenue side, spending side, non-debt receipts), and one reasoned limitation.',
  scheme: [['Two measures', 1], ['Third measure', 1], ['One reasoned difficulty', 1]],
}));
Q('l_deficits', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain revenue deficit, fiscal deficit and primary deficit. What does each tell us about the finances of the government?',
  model: '1. **Revenue deficit** = revenue expenditure − revenue receipts. It shows that the government is **dissaving**: borrowing or selling assets to meet **current** expenses such as salaries, interest and subsidies.\n2. **Fiscal deficit** = total expenditure − total receipts **excluding borrowings**. It equals the government\'s **total borrowing** in the year.\n3. A high fiscal deficit means **more debt and interest** in future and, if financed by the central bank, a risk of **inflation**.\n4. **Primary deficit** = fiscal deficit − **interest payments**. It shows borrowing for **present** needs, leaving out the cost of past loans.\n5. When primary deficit is small but fiscal deficit is large, most borrowing is going into **interest**: a sign of a **debt burden**.',
  sol: 'Each deficit: formula plus meaning; then what high values imply, ending with the interest-burden reading of primary deficit.',
  scheme: [['Revenue deficit: formula and meaning', 1], ['Fiscal deficit: formula and meaning', 1], ['Implications of fiscal deficit', 1], ['Primary deficit: formula and meaning', 1], ['Reading the three together', 1]],
}));
Q('l_compute', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The budget of the imagined Government of Kaveripur (₹ crore): tax revenue ${inr(LC.tax)}; non-tax revenue ${LC.nontax}; recovery of loans ${LC.rec}; disinvestment ${LC.dis}; borrowings ${inr(LC.borrow)}; revenue expenditure ${inr(LC.re)}, of which interest payments ${inr(LC.int)}; capital expenditure ${inr(LC.ce)}. Calculate the revenue, fiscal and primary deficits, check the fiscal deficit against borrowings, and comment on what the figures show.`,
  model: `1. Revenue receipts = ${inr(LC.tax)} + ${LC.nontax} = ${inr(LC.tax + LC.nontax)}. **Revenue deficit** = ${inr(LC.re)} − ${inr(LC.tax + LC.nontax)} = **₹${inr(LCd.rd)} crore**.\n2. Total expenditure = ${inr(LC.re)} + ${inr(LC.ce)} = ${inr(LCd.te)}. **Fiscal deficit** = ${inr(LCd.te)} − (${inr(LC.tax + LC.nontax)} + ${LC.rec} + ${LC.dis}) = **₹${inr(LCd.fd)} crore**, exactly equal to borrowings.\n3. **Primary deficit** = ${inr(LCd.fd)} − ${inr(LC.int)} = **₹${LCd.pd} crore**.\n4. Comment: ${inr(LCd.rd)} of the ${inr(LCd.fd)} borrowed (${Math.round((100 * LCd.rd) / LCd.fd)} per cent) pays for **current spending**, which creates no asset.\n5. Interest is ${inr(LC.int)}, about ${Math.round((100 * LC.int) / LCd.fd)} per cent of the fiscal deficit: past debt is a **heavy burden**.`,
  sol: 'Compute the three deficits with the standard formulas, confirm fiscal deficit = borrowings, then interpret the shares of revenue deficit and interest in the borrowing.',
  scheme: [['Revenue deficit', 1], ['Fiscal deficit, matched with borrowings', 1], ['Primary deficit', 1], ['Comment on the revenue deficit share', 1], ['Comment on the interest burden', 1]],
}));
Q('l_fd_harmful', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"A fiscal deficit is always harmful for an economy." Do you agree? Give reasons for your answer.',
  model: '**Not always.** It depends on when and why the government borrows.\n1. **Useful in a slump:** extra spending raises **aggregate demand**, output and jobs when private demand is weak.\n2. **Useful for assets:** borrowing for **roads, power and irrigation** raises future output and revenue, which helps repay the debt.\n3. **Harmful when it funds consumption:** a large **revenue deficit** creates no asset, and **interest payments** keep rising.\n4. **Other risks:** if financed by the **central bank** it may cause **inflation**; heavy government borrowing can leave **less credit for private firms**.\n5. **Conclusion:** a moderate deficit spent on assets, or used briefly in a slump, can help; persistent deficits for current spending are harmful.',
  sol: 'A balanced judgement: two situations where a deficit helps, two where it harms, and a conclusion.',
  scheme: [['Stand taken', 1], ['Benefit in a slump', 1], ['Benefit when used for assets', 1], ['Harms: revenue deficit, interest, inflation or crowding out', 1], ['Reasoned conclusion', 1]],
}));
Q('cb_budget', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined government and figures, written by SOYL for practice.)*',
  passage: `**Budget of the imagined Government of Narmadapur (₹ crore)**\n\n| Item | Year 1 | Year 2 |\n|---|---|---|\n| Revenue receipts | ${inr(Y1.rr)} | ${inr(Y2.rr)} |\n| Revenue expenditure | ${inr(Y1.re)} | ${inr(Y2.re)} |\n| Capital expenditure | ${Y1.ce} | ${Y2.ce} |\n| Non-debt capital receipts | ${Y1.ndcr} | ${Y2.ndcr} |\n| Interest payments | ${Y1.int} | ${Y2.int} |`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: Y2d.fd, unit: '₹ crore', stem: 'Calculate the fiscal deficit in Year 2.', sol: `Step 1: Total expenditure = ${inr(Y2.re)} + ${Y2.ce} = ${inr(Y2d.te)}; receipts other than borrowing = ${inr(Y2.rr)} + ${Y2.ndcr} = ${inr(Y2.rr + Y2.ndcr)}.\nStep 2: Fiscal deficit = ${inr(Y2d.te)} − ${inr(Y2.rr + Y2.ndcr)} = ${Y2d.fd}. So ₹${Y2d.fd} crore.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: Y1d.pd, unit: '₹ crore', stem: 'Calculate the primary deficit in Year 1.', sol: `Step 1: Fiscal deficit in Year 1 = (${inr(Y1.re)} + ${Y1.ce}) − (${inr(Y1.rr)} + ${Y1.ndcr}) = ${Y1d.fd}.\nStep 2: Primary deficit = ${Y1d.fd} − ${Y1.int} = ${Y1d.pd}. So ₹${Y1d.pd} crore.` })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Did the quality of borrowing improve from Year 1 to Year 2? Use the revenue deficit to justify your answer.', model: `**Yes.** Revenue deficit fell from ₹${Y1d.rd} crore to ₹${Y2d.rd} crore. In Year 1, ${Y1d.rd} of the ${Y1d.fd} borrowed (about ${Math.round((100 * Y1d.rd) / Y1d.fd)} per cent) paid for current spending; in Year 2 only ${Y2d.rd} of ${Y2d.fd} (about ${Math.round((100 * Y2d.rd) / Y2d.fd)} per cent) did, so more borrowing went into assets.`, sol: 'Compute both revenue deficits and compare their shares in the fiscal deficit.', scheme: [['Both revenue deficits computed', 1], ['Judgement using the share of borrowing for current spending', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Interest payments rose while the primary deficit fell. What does this suggest about the government\'s finances?', model: `Primary deficit fell from ₹${Y1d.pd} to ₹${Y2d.pd} crore, so borrowing for **present needs** shrank. But interest rose from ${Y1.int} to ${Y2.int}, so a growing part of the deficit (${Y2.int} of ${Y2d.fd}) is the **cost of past debt**: the debt burden is rising even as current finances improve.`, sol: 'Separate present borrowing (primary deficit) from the cost of past borrowing (interest).', scheme: [['Primary deficit fall interpreted', 1], ['Rising interest burden interpreted', 1]] }),
    ]),
  ],
}));
Q('cb_canal', caseQ({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined state and figures, written by SOYL for practice.)*',
  passage: 'The imagined state of Godavaripur plans to borrow ₹1,200 crore next year. Its finance department proposes to use ₹600 crore to clear arrears of salaries and pensions and the remaining ₹600 crore to build an irrigation canal that will water 40,000 hectares of dry land. An opposition member argues that the state should borrow only for the canal. A senior official replies that salaries cannot be left unpaid, and suggests raising the state\'s own revenue by collecting unpaid property taxes and reviewing subsidies that reach well-off households.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'In the state budget, the ₹600 crore for the canal is', opts: ['capital expenditure, because it creates an asset', 'revenue expenditure, because it is paid to contractors', 'a capital receipt, because it is borrowed', 'revenue expenditure, because the canal will take years to build'], sol: 'Spending that creates a lasting asset such as a canal is capital expenditure; how it is financed or how long it takes does not change that.' })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which part of the planned borrowing will add to the revenue deficit?', model: 'The **₹600 crore for salaries and pensions**, because it pays for current expenses that create no asset.', sol: 'Salaries and pensions are revenue expenditure financed by borrowing.', scheme: [['Salaries and pensions part, with reason', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Why does the opposition member prefer borrowing only for the canal?', model: 'The canal is an **asset**: more irrigated land means higher farm output and **future income and revenue**, which help **repay the loan**. Borrowing for salaries creates **no asset**, so it only adds to **debt and interest** later.', sol: 'Asset creation repays itself; borrowing for current spending does not.', scheme: [['Canal creates income and revenue', 1], ['Salary borrowing only adds to debt', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How would the official\'s suggestions reduce the need to borrow?', model: 'Collecting unpaid **property taxes** raises **revenue receipts**, and better-targeted **subsidies** cut **revenue expenditure**. Both narrow the **revenue deficit**, so less borrowing is needed for salaries and the fiscal deficit falls.', sol: 'Link each suggestion to revenue receipts or revenue expenditure and then to the deficit.', scheme: [['Tax collection raises revenue receipts', 1], ['Subsidy review cuts expenditure: lower deficit', 1]] }),
    ]),
  ],
}));
