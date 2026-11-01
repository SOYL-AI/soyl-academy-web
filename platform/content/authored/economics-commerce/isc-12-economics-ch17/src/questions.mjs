// ISC 12 Economics, ch17 Government Budget and Deficits — question bank. Every government, state, person and figure is
// imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a
// stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Scope: the budget (meaning; Union and State budgets; balanced, surplus and deficit budgets); classification of receipts
// and expenditure into revenue and capital; revenue, fiscal and primary deficits (meaning, calculation, implications).
// No actual Union or State budget figure is used. Stable facts only: the financial year runs from 1 April to 31 March;
// the Constitution calls the Union budget the annual financial statement (Article 112; Article 202 for the States).
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

/** The three deficits from budget data (₹ crore). */
export function deficits({ tax, nonTax, recov, disinv, revExp, interest, capExp }) {
  const rr = tax + nonTax;
  const ndcr = recov + disinv;
  const te = revExp + capExp;
  const rd = revExp - rr;
  const fd = te - (rr + ndcr);
  const pd = fd - interest;
  return { rr, ndcr, te, rd, fd, pd, borrow: fd };
}

// ---------------------------------------------------------------- imagined budgets (₹ crore)
// (1) Republic of Hemavati: the chapter's main worked budget.
export const HEM = { tax: 2400, nonTax: 600, recov: 150, disinv: 250, revExp: 3700, interest: 900, capExp: 1100 };
export const HEM_D = deficits(HEM);
assert(HEM_D.rr === 3000 && HEM_D.ndcr === 400 && HEM_D.te === 4800, 'hemavati totals');
assert(HEM_D.rd === 700 && HEM_D.fd === 1400 && HEM_D.pd === 500, 'hemavati deficits');
assert(HEM_D.rr + HEM_D.ndcr + HEM_D.borrow === HEM_D.te, 'hemavati receipts equal expenditure');
// (2) State of Neelachal: a revenue surplus with a fiscal deficit.
export const NEEL = { tax: 1500, nonTax: 350, recov: 60, disinv: 40, revExp: 1700, interest: 300, capExp: 650 };
export const NEEL_D = deficits(NEEL);
assert(NEEL_D.rr === 1850 && NEEL_D.rd === -150 && NEEL_D.te === 2350, 'neelachal revenue surplus');
assert(NEEL_D.fd === 400 && NEEL_D.pd === 100, 'neelachal fiscal and primary deficit');
// (3) Union of Kanakdesh: fiscal deficit equal to interest, so the primary deficit is zero.
export const KANAK = { fd: 520, interest: 520 };
export const KANAK_PD = KANAK.fd - KANAK.interest;
assert(KANAK_PD === 0, 'kanakdesh pd zero');
// (4) Revapur: interest found from the fiscal and primary deficits.
export const REVA = { fd: 960, pd: 210 };
export const REVA_INT = REVA.fd - REVA.pd;
assert(REVA_INT === 750, 'revapur interest');
// (5) Shailpur: a revenue deficit.
export const SHAIL = { rr: 1240, re: 1510 };
export const SHAIL_RD = SHAIL.re - SHAIL.rr;
assert(SHAIL_RD === 270, 'shailpur rd');
// (6) Hiranyapur: fiscal deficit as a per cent of the state's (imagined) GDP.
export const HIRAN = { fd: 300, gdp: 6000 };
export const HIRAN_SHARE = pct(HIRAN.fd / HIRAN.gdp);
assert(HIRAN_SHARE === 5, 'hiranyapur share');
// (7) Saraswatipur: the share of borrowing used to cover the revenue gap.
export const SARAS = { rd: 450, fd: 900, interest: 360 };
export const SARAS_SHARE = pct(SARAS.rd / SARAS.fd);
export const SARAS_PD = SARAS.fd - SARAS.interest;
assert(SARAS_SHARE === 50 && SARAS_PD === 540, 'saraswatipur');
// (8) Aranyadesh (case): borrowings given; the student checks that they equal the fiscal deficit.
export const ARAN = { tax: 1600, nonTax: 350, recov: 90, disinv: 60, revExp: 2300, interest: 520, capExp: 500, borrowGiven: 700 };
export const ARAN_D = deficits(ARAN);
assert(ARAN_D.fd === ARAN.borrowGiven && ARAN_D.rd === 350 && ARAN_D.pd === 180 && ARAN_D.te === 2800, 'aranyadesh');
// (9) Three imagined governments for budget types (receipts other than borrowings vs expenditure).
export const TYPES = [
  { name: 'Tungapur', rec: 5200, exp: 4900 },
  { name: 'Malini', rec: 3600, exp: 3600 },
  { name: 'Dhaulagiri', rec: 2750, exp: 3100 },
];
export const typeOf = (g) => (g.rec > g.exp ? 'surplus' : g.rec === g.exp ? 'balanced' : 'deficit');
assert(TYPES.map(typeOf).join() === 'surplus,balanced,deficit', 'budget types');
export const TYPE_GAP = TYPES.map((g) => g.rec - g.exp);
assert(TYPE_GAP.join() === '300,0,-350', 'budget type gaps');
// (10) Hemavati in the next year (imagined): borrowing to pay interest grows.
export const HEM2 = { fd: 1550, interest: 1050 };
export const HEM2_PD = HEM2.fd - HEM2.interest;
assert(HEM2_PD === 500 && HEM2.interest - HEM.interest === 150, 'hemavati next year');

// ================================================================ t01 The budget: meaning; Union and State budgets
Q('m_budget_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A student in an imagined Shimla school is asked to define a government budget. The best definition is',
  opts: [
    'a statement of the estimated receipts and expenditure of the government for the coming financial year',
    'a record of the actual income and spending of all households in the country',
    'the list of prices fixed by the government for essential goods',
    'the total amount of money printed by the central bank in a year',
  ],
  sol: 'A budget is an annual statement of estimates for the year ahead. It is not a household account, a price list or a record of money printed.',
}));
Q('m_fin_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'For a budget presented by the Union government of India, the financial year to which it applies runs',
  opts: ['from 1 April to 31 March', 'from 1 January to 31 December', 'from 1 July to 30 June', 'from 15 August to 14 August'],
  sol: 'India\'s financial year runs from 1 April to 31 March; the calendar year and the other periods are not used for the budget.',
}));
Q('m_state_budget', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined state of Hemkunt prepares its own budget for schools, police and state roads. That budget is presented',
  opts: [
    'in the state legislature, by the state government',
    'in Parliament, by the Union Finance Minister',
    'to the central bank, which approves it',
    'to the Comptroller and Auditor General before it is spent',
  ],
  sol: 'Each State presents its own budget, its annual financial statement, in its legislature. Parliament considers the Union budget; the central bank and the auditor do not pass State budgets.',
}));
Q('m_balanced', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The finance minister of an imagined island republic, Malini, expects receipts other than borrowing of ₹3,600 crore and plans spending of exactly ₹3,600 crore. Her budget is',
  opts: ['a balanced budget', 'a surplus budget', 'a deficit budget', 'a supplementary budget'],
  sol: 'When estimated receipts (other than borrowing) equal estimated expenditure, the budget is balanced. A surplus needs receipts above spending; a deficit needs spending above receipts.',
}));
Q('m_surplus_budget', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Tungapur (imagined) expects receipts other than borrowing of ₹${inr(TYPES[0].rec)} crore and spending of ₹${inr(TYPES[0].exp)} crore. Which statement about its budget is correct?`,
  opts: [
    `It is a surplus budget, with a surplus of ₹${TYPE_GAP[0]} crore`,
    `It is a deficit budget, with a deficit of ₹${TYPE_GAP[0]} crore`,
    'It is a balanced budget, because both figures are estimates',
    'It cannot be classified until the year is over',
  ],
  sol: `Receipts exceed expenditure by ${inr(TYPES[0].rec)} − ${inr(TYPES[0].exp)} = ${TYPE_GAP[0]} crore, so the budget is in surplus. Budgets are classified on the estimates, before the year ends.`,
}));
Q('ar_budget_estimate', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'The amounts actually collected and spent by the imagined government of Hemkunt can differ from its budget figures.',
  r: 'A budget is prepared before the financial year begins, so it shows estimates rather than actual amounts.',
  sol: 'Both are true, and R explains A: because the budget is a set of advance estimates, actual receipts and spending can turn out higher or lower.',
}));
Q('tf_budget_actual', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? The figures in the budget that an imagined state, Vaigai Pradesh, presents in March are estimates for the year about to begin.',
  sol: 'True. A budget is an advance statement of estimated receipts and expenditure for the coming financial year.',
}));
Q('fb_afs', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Constitution of India does not use the word budget; it calls the yearly statement of the Union government\'s estimated receipts and expenditure the annual ___ statement.',
  acc: [['financial']],
  sol: 'It is the annual financial statement (Article 112 for the Union; Article 202 for the States).',
}));
Q('s_union_state', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'A newspaper in an imagined town confuses the Union budget with a State budget. Distinguish the two.',
  model: 'The **Union budget** is the annual financial statement of the **Union government**, presented in **Parliament**; it covers defence, railways and other Union subjects. A **State budget** is prepared by a **State government** and presented in the **State legislature**; it covers State subjects such as police and State roads.',
  sol: 'Which government, which house, which subjects.',
  scheme: [['Union budget described', 1], ['State budget described', 1]],
}));
Q('s_budget_estimates', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is a government budget described as a statement of estimates? Answer with reference to the imagined state of Vaigai Pradesh, which presents its budget in March.',
  model: 'Vaigai Pradesh prepares its budget **before** the year from 1 April begins. Tax collections, prices and needs during the year are not yet known, so the figures are **forecasts**. The **actual** amounts are known only after the year ends and may differ.',
  sol: 'Prepared in advance; actuals come later.',
  scheme: [['Prepared before the year', 1], ['Actuals may differ', 1]],
}));
Q('s3_budget_why', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the meaning of a government budget and give two of its features, as a finance officer of the imagined state of Hemkunt would explain them to new recruits.',
  model: '**Meaning**: a government budget is the **annual statement** of the government\'s **estimated receipts and expenditure** for the coming financial year (1 April to 31 March).\n**Features**: (1) it is prepared **in advance**, so its figures are **estimates**; (2) it must be **approved by the legislature** before the government can collect and spend; it also shows **how any gap will be financed**.',
  sol: 'Meaning plus two features.',
  scheme: [['Meaning', 1], ['First feature', 1], ['Second feature', 1]],
}));
Q('s3_budget_types', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Classify the budgets of three imagined governments (₹ crore), giving the size of any gap: Tungapur — receipts other than borrowing ${inr(TYPES[0].rec)}, expenditure ${inr(TYPES[0].exp)}; Malini — ${inr(TYPES[1].rec)} and ${inr(TYPES[1].exp)}; Dhaulagiri — ${inr(TYPES[2].rec)} and ${inr(TYPES[2].exp)}.`,
  model: `**Tungapur**: receipts exceed spending by ${inr(TYPES[0].rec)} − ${inr(TYPES[0].exp)} = ₹${TYPE_GAP[0]} crore, a **surplus budget**.\n**Malini**: receipts equal spending, a **balanced budget**.\n**Dhaulagiri**: spending exceeds receipts by ${inr(TYPES[2].exp)} − ${inr(TYPES[2].rec)} = ₹${-TYPE_GAP[2]} crore, a **deficit budget**, which must be met by borrowing.`,
  sol: 'Compare the two figures for each government.',
  scheme: [['Tungapur: surplus with gap', 1], ['Malini: balanced', 1], ['Dhaulagiri: deficit with gap', 1]],
}));

// ================================================================ t02 Components: revenue and capital receipts and expenditure
Q('m_tax_rr', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which of these receipts of the imagined Republic of Hemavati is a revenue receipt?',
  opts: [
    'Dividends received from a government-owned power company',
    'A loan raised from the public by selling bonds',
    'Money received from selling part of its shares in a state-owned airline',
    'Repayment by a province of a loan the Republic had given it',
  ],
  sol: 'Dividends neither create a liability nor reduce an asset, so they are a revenue (non-tax) receipt. Borrowing creates a liability; selling shares and recovering a loan reduce assets, so those three are capital receipts.',
}));
Q('m_cap_receipt', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined government of Revapur sells 20 per cent of its shares in a public-sector steel company to private investors. In its budget, the money received is',
  opts: ['a capital receipt, because it reduces the government\'s assets', 'a revenue receipt, because no liability is created', 'a tax receipt, because companies pay it', 'revenue expenditure, because the company is transferred'],
  sol: 'Disinvestment reduces the government\'s financial assets (its shareholding), so the proceeds are a capital receipt. They are not a tax, and receipts are never classed as expenditure.',
}));
Q('m_borrow_capital', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Why is money that the imagined Union of Kanakdesh borrows from the public treated as a capital receipt?',
  opts: ['It creates a liability: the government must repay it', 'It reduces the government\'s assets', 'It is a compulsory payment by citizens', 'It is earned by selling services'],
  sol: 'Borrowing creates a liability to repay, which is one of the two tests for a capital receipt. It does not reduce assets, it is voluntary lending rather than a tax, and it is not a sale of services.',
}));
Q('m_recovery', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined Union of Kanakdesh had lent ₹200 crore to one of its provinces. This year the province repays ₹50 crore of it. For Kanakdesh this is',
  opts: ['a capital receipt, because its asset (the loan given) falls', 'a revenue receipt, because the money is not borrowed', 'capital expenditure, because a loan is involved', 'a tax receipt from the province'],
  sol: 'Recovery of a loan reduces the government\'s asset (its claim on the province), so it is a capital receipt. It is not revenue, not expenditure and not a tax.',
}));
Q('m_interest_received', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined Union government of Kanakdesh receives interest from its provinces on loans it gave them earlier. In its budget this interest is',
  opts: ['a non-tax revenue receipt', 'a capital receipt', 'a tax revenue receipt', 'capital expenditure'],
  sol: 'Interest received neither creates a liability nor reduces an asset, and it is not a tax, so it is a non-tax revenue receipt. Only the repayment of the loan itself would be a capital receipt.',
}));
Q('m_nontax', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is a NON-TAX revenue receipt for the imagined government of Hemkunt?',
  opts: ['Fees charged for issuing driving licences', 'Income tax paid by salaried workers', 'Goods and Services Tax collected on purchases', 'Corporation tax paid by companies'],
  sol: 'A fee is paid for a specific service, so it is non-tax revenue. Income tax, GST and corporation tax are taxes.',
}));
Q('m_test_rr', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A finance trainee in the imagined state of Vaigai Pradesh must decide whether a receipt is a revenue receipt. Which test should she apply?',
  opts: [
    'It neither creates a liability nor reduces an asset of the government',
    'It either creates a liability or reduces an asset of the government',
    'It is received only once in the life of the government',
    'It is received from foreign governments',
  ],
  sol: 'A revenue receipt passes both negative tests: no liability created and no asset reduced. A receipt that creates a liability or reduces an asset is a capital receipt; frequency and source are not the test.',
}));
Q('m_rev_exp', mcq({
  t: 2, d: 1, c: 'application',
  stem: 'Which of these items in the budget of the imagined state of Hemkunt is revenue expenditure?',
  opts: ['Salaries of teachers in government schools', 'Construction of a new bridge over a river', 'A loan given to a state-run bus company', 'Purchase of land for a new hospital'],
  sol: 'Salaries neither create an asset nor reduce a liability, so they are revenue expenditure. A bridge and land create assets, and a loan given creates a financial asset, so those are capital expenditure.',
}));
Q('m_cap_exp', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined Republic of Hemavati repays ₹300 crore of bonds that fall due this year. In its budget the repayment is',
  opts: ['capital expenditure, because it reduces a liability', 'revenue expenditure, because no asset is created', 'a capital receipt, because a loan is involved', 'a revenue receipt, because bonds are returned'],
  sol: 'Repaying a loan reduces the government\'s liability, so it is capital expenditure. It is spending, not a receipt, and it does reduce a liability, so it is not revenue expenditure.',
}));
Q('m_grant_states', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'The imagined Union of Kanakdesh gives a grant to a province, which uses it to build schools. In the Union\'s own budget the grant is',
  opts: [
    'revenue expenditure, because it creates no asset for the Union government',
    'capital expenditure, because schools are built with it',
    'a capital receipt, because the province receives money',
    'a loan, because the province must repay it',
  ],
  sol: 'A grant is not repaid and creates no asset for the giver, so the Union records it as revenue expenditure, even if the province builds assets with it. It is not a receipt or a loan for the Union.',
}));
Q('m_repay_loan', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which item in the budget of the imagined Republic of Hemavati REDUCES a liability of the government?',
  opts: ['Repayment of a loan taken from a foreign bank', 'Interest paid on government bonds', 'Old-age pensions paid to citizens', 'Recovery of a loan given to a province'],
  sol: 'Repaying a borrowed sum lowers what the government owes, so it reduces a liability (capital expenditure). Interest and pensions are revenue expenditure; recovering a loan given reduces an asset, not a liability.',
}));
Q('ar_disinvest', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Proceeds from disinvestment by the imagined government of Revapur are capital receipts.',
  r: 'Disinvestment reduces the government\'s assets, because it gives up part of its ownership of public-sector companies.',
  sol: 'Both are true, and R explains A: a receipt that reduces an asset is a capital receipt, and selling shares reduces the government\'s holding.',
}));
Q('ar_interest_paid', ar({
  t: 2, d: 2, c: 'analysis', key: 'd',
  a: 'Interest paid on public debt by the imagined Republic of Hemavati is capital expenditure.',
  r: 'Interest payments create new assets for the government.',
  sol: 'Both are false. Interest paid creates no asset and reduces no liability, so it is revenue expenditure; it creates nothing for the government.',
}));
Q('ar_loans_given', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Loans given by the imagined Union of Kanakdesh to its provinces are capital expenditure for the Union.',
  r: 'Such loans give the Union a financial asset: a claim that the provinces must repay.',
  sol: 'Both are true, and R explains A: spending that creates an asset is capital expenditure, and a loan given creates a claim to repayment.',
}));
Q('ar_fees', ar({
  t: 2, d: 2, c: 'analysis', key: 'c',
  a: 'Fees for registering land collected by the imagined state of Hemkunt are a revenue receipt.',
  r: 'Fees are compulsory payments that every citizen must make, whether or not he takes the service.',
  sol: 'A is true: fees create no liability and reduce no asset. R is false: a fee is paid only by those who take the particular service, which is what separates it from a tax.',
}));
Q('tf_recovery', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the imagined Union of Kanakdesh recovers a loan from a province, its liabilities increase.',
  sol: 'False. Recovering a loan reduces an asset (the claim on the province); it does not change the government\'s liabilities. That is why it is a capital receipt.',
}));
Q('fb_nontax', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Fines and penalties collected by the courts and police of the imagined state of Hemkunt are classed as ___ revenue receipts.',
  acc: [['non-tax', 'nontax', 'non tax']],
  sol: 'They are non-tax revenue receipts: they are not taxes, and they create no liability and reduce no asset.',
}));
Q('mt_classify', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each item in the budget of the imagined Republic of Hemavati with its budget head.',
  pairs: [
    ['Corporation tax collected from companies', 'Revenue receipt'],
    ['A loan raised from a foreign development bank', 'Capital receipt'],
    ['Construction of a national highway', 'Capital expenditure'],
    ['Old-age pensions paid to citizens', 'Revenue expenditure'],
  ],
  sol: 'A tax is a revenue receipt; borrowing creates a liability (capital receipt); a highway creates an asset (capital expenditure); pensions create no asset (revenue expenditure).',
}));
Q('s_rr_two', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the two kinds of revenue receipts of the imagined state of Hemkunt, with one example of each.',
  model: '1. **Tax revenue**: compulsory payments imposed by law, for example **income tax** or the **Goods and Services Tax**.\n2. **Non-tax revenue**: other income that creates no liability, for example **fees, fines, interest received and dividends** from public enterprises.',
  sol: 'Tax and non-tax, each with an example.',
  scheme: [['Tax revenue with example', 1], ['Non-tax revenue with example', 1]],
}));
Q('s_cr_test', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two tests for a capital receipt, with one example of each from the budget of the imagined Republic of Hemavati.',
  model: 'A receipt is capital if it **creates a liability**, for example **borrowing from the public** through bonds, **or** if it **reduces an asset**, for example **recovery of a loan** given to a province or **disinvestment** of shares.',
  sol: 'Liability created or asset reduced, each with an example.',
  scheme: [['Creates a liability, with example', 1], ['Reduces an asset, with example', 1]],
}));
Q('s_re_ce', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish revenue expenditure from capital expenditure for the finance department of the imagined state of Vaigai Pradesh.',
  model: '**Revenue expenditure** neither creates an asset nor reduces a liability, for example **salaries, interest and subsidies**. **Capital expenditure** creates an asset or reduces a liability, for example **building a dam** or **repaying a loan**.',
  sol: 'The asset and liability test, with examples.',
  scheme: [['Revenue expenditure with example', 1], ['Capital expenditure with example', 1]],
}));
Q('s_grant_classify', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'The imagined Union of Kanakdesh gives a province a grant to build a medical college. How is the grant shown in the Union\'s budget? Give a reason.',
  model: 'For the Union it is **revenue expenditure**: a grant is **not repaid**, so it creates **no asset or claim** for the Union and reduces no liability. The college becomes an asset of the **province**, not of the Union.',
  sol: 'Classify from the giver\'s point of view.',
  scheme: [['Revenue expenditure', 1], ['Reason: no asset for the Union', 1]],
}));
Q('s3_classify_six', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Classify each item in the budget of the imagined state of Hemkunt as a revenue receipt, capital receipt, revenue expenditure or capital expenditure: (i) market loans raised; (ii) land registration fees; (iii) salaries of police officers; (iv) money spent to build a district hospital; (v) sale of shares in a state transport company; (vi) interest paid on old loans.',
  model: '(i) **Capital receipt**: borrowing creates a liability.\n(ii) **Revenue receipt** (non-tax): no liability, no asset reduced.\n(iii) **Revenue expenditure**: no asset created.\n(iv) **Capital expenditure**: a hospital is an asset.\n(v) **Capital receipt**: disinvestment reduces an asset.\n(vi) **Revenue expenditure**: interest creates no asset.',
  sol: 'Apply the liability and asset tests to each item.',
  scheme: [['Items (i) and (ii)', 1], ['Items (iii) and (iv)', 1], ['Items (v) and (vi)', 1]],
}));
Q('s3_borrow_vs_tax', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The imagined Republic of Hemavati collects ₹2,400 crore in taxes and borrows ₹1,400 crore. Explain why the borrowing is a capital receipt but the tax collection is a revenue receipt.',
  model: 'Taxes are **compulsory payments** that the government never repays, so they **create no liability** and **reduce no asset**: they are revenue receipts. Borrowing must be **repaid with interest**, so it **creates a liability** for the government: it is a capital receipt. The two sums bring in cash alike, but only the borrowing leaves a **future obligation**.',
  sol: 'Liability test applied to each.',
  scheme: [['Taxes: no liability, no asset reduced', 1], ['Borrowing: liability to repay', 1], ['Contrast stated', 1]],
}));
Q('s3_grant_case', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'The imagined Union of Kanakdesh gives the province of Neelachal a grant of ₹80 crore, and Neelachal spends it on building a bridge. Explain how the transaction appears in each government\'s budget.',
  model: '**Union of Kanakdesh**: the grant is **revenue expenditure**, because it is not repaid and creates **no asset** for the Union.\n**Neelachal**: the grant received is a **revenue receipt** (grants-in-aid create no liability), and building the bridge is **capital expenditure**, because the bridge is an **asset** of the province. One transfer can therefore be classed differently by the giver and the receiver.',
  sol: 'Classify from each government\'s own point of view.',
  scheme: [['Union: revenue expenditure with reason', 1], ['Province: grant as revenue receipt', 1], ['Province: bridge as capital expenditure', 1]],
}));

// ================================================================ t03 Revenue, fiscal and primary deficits
Q('m_rd_formula', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'For a government such as the imagined state of Shailpur, the revenue deficit is measured as',
  opts: ['revenue expenditure minus revenue receipts', 'total expenditure minus total receipts other than borrowing', 'fiscal deficit minus interest payments', 'capital expenditure minus capital receipts'],
  sol: 'The revenue deficit compares the revenue account only. Total expenditure less receipts other than borrowing is the fiscal deficit; the fiscal deficit less interest is the primary deficit.',
}));
Q('m_fd_formula', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which expression gives the fiscal deficit of the imagined Republic of Hemavati?',
  opts: [
    'Total expenditure minus (revenue receipts plus non-debt capital receipts)',
    'Revenue expenditure minus revenue receipts',
    'Total expenditure minus total receipts including borrowing',
    'Capital expenditure minus borrowing',
  ],
  sol: 'The fiscal deficit is the gap between total expenditure and all receipts that do not create debt. Including borrowing in the receipts would always give zero, since the budget balances in accounting terms.',
}));
Q('m_pd_formula', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'The primary deficit of the imagined government of Revapur is obtained by',
  opts: ['subtracting interest payments from the fiscal deficit', 'adding interest payments to the revenue deficit', 'subtracting the revenue deficit from the fiscal deficit', 'subtracting borrowing from total expenditure'],
  sol: 'Primary deficit = fiscal deficit − interest payments. The other combinations do not measure borrowing for current needs.',
}));
Q('m_fd_borrow', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A journalist reports that the imagined Republic of Hemavati has a fiscal deficit of ₹1,400 crore. This figure tells us',
  opts: ['the total borrowing the government needs in the year', 'the amount of tax evaded in the year', 'the interest the government pays on old loans', 'the value of public assets sold in the year'],
  sol: 'The fiscal deficit is the gap that must be filled by borrowing, so it equals the government\'s total borrowing requirement for the year.',
}));
Q('m_pd_zero', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The imagined Union of Kanakdesh has a fiscal deficit of ₹${KANAK.fd} crore and pays interest of ₹${KANAK.interest} crore. What does this show?`,
  opts: [
    'Its primary deficit is zero: all its borrowing goes to pay interest on past loans',
    'Its primary deficit is twice the fiscal deficit',
    'It has a revenue surplus equal to the interest paid',
    'It borrowed nothing during the year',
  ],
  sol: `Primary deficit = ${KANAK.fd} − ${KANAK.interest} = ${KANAK_PD}. The whole of this year's borrowing is needed just to meet interest on earlier debt; none of it finances current programmes.`,
}));
Q('m_rd_implies', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The imagined state of Shailpur has a large revenue deficit year after year. Which is the most serious implication?',
  opts: [
    'It borrows to meet current spending such as salaries and subsidies, so debt grows without creating assets to repay it',
    'It has too much money in its treasury',
    'Its capital expenditure must be larger than its revenue expenditure',
    'It will have no fiscal deficit in future',
  ],
  sol: 'A revenue deficit means current (consumption-type) spending exceeds current income, so borrowing or asset sales pay for it. The debt grows while no income-earning assets are built, which burdens future budgets. The other statements do not follow.',
}));
Q('m_hem_rd', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `The imagined Republic of Hemavati has revenue expenditure of ₹${inr(HEM.revExp)} crore, tax revenue of ₹${inr(HEM.tax)} crore and non-tax revenue of ₹${HEM.nonTax} crore. Its revenue deficit is`,
  opts: [`₹${HEM_D.rd} crore`, `₹${HEM.revExp - HEM.tax} crore`, `₹${HEM.revExp - HEM.nonTax} crore`, `₹${HEM_D.rr} crore`],
  sol: `Revenue receipts = ${inr(HEM.tax)} + ${HEM.nonTax} = ${inr(HEM_D.rr)}; revenue deficit = ${inr(HEM.revExp)} − ${inr(HEM_D.rr)} = ${HEM_D.rd} crore. Leaving out non-tax revenue or tax revenue gives the wrong figures.`,
}));
Q('m_fd_vs_rd', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `The imagined state of Neelachal has a revenue SURPLUS of ₹${-NEEL_D.rd} crore but a fiscal deficit of ₹${NEEL_D.fd} crore. How is this possible?`,
  opts: [
    'Its capital expenditure exceeds its revenue surplus and non-debt capital receipts, so it still borrows',
    'Its interest payments are larger than its revenue receipts',
    'A revenue surplus always comes with a larger fiscal deficit',
    'Its accounts must contain an error, since the two cannot coexist',
  ],
  sol: `Neelachal covers its current spending, but its capital spending of ${NEEL.capExp} crore exceeds the revenue surplus (${-NEEL_D.rd}) plus non-debt capital receipts (${NEEL_D.ndcr}) by ${NEEL_D.fd} crore, which it borrows. The other options are false or not implied.`,
}));
Q('ar_rd_fd', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: `The imagined Republic of Hemavati has a fiscal deficit (₹${inr(HEM_D.fd)} crore) larger than its revenue deficit (₹${HEM_D.rd} crore).`,
  r: 'Interest payments are part of revenue expenditure.',
  sol: `Both are true, but R does not explain A. The fiscal deficit is larger here because capital expenditure (${inr(HEM.capExp)}) exceeds non-debt capital receipts (${HEM_D.ndcr}); where interest is recorded does not cause the gap between the two measures.`,
}));
Q('ar_pd_fd', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'If the imagined government of Revapur pays some interest, its primary deficit is smaller than its fiscal deficit.',
  r: 'The primary deficit is obtained by adding interest payments to the fiscal deficit.',
  sol: 'A is true: subtracting a positive interest bill makes the primary deficit smaller. R is false: interest is subtracted from, not added to, the fiscal deficit.',
}));
Q('tf_pd_interest', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If the imagined state of Hemkunt pays any interest at all, its primary deficit must be larger than its fiscal deficit.',
  sol: 'False. Primary deficit = fiscal deficit − interest, so with positive interest the primary deficit is smaller than the fiscal deficit.',
}));
Q('fb_fd_borrow', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The fiscal deficit of a government is equal to its total ___ requirement for the year.',
  acc: [['borrowing', 'borrowings']],
  sol: 'The fiscal deficit equals the borrowing requirement: borrowing fills the gap between expenditure and non-debt receipts.',
}));
Q('ord_deficits', ord({
  t: 3, d: 2, c: 'application', marks: 1,
  stem: `For the imagined Republic of Hemavati (revenue deficit ₹${HEM_D.rd} crore, fiscal deficit ₹${inr(HEM_D.fd)} crore, interest ₹${HEM.interest} crore), arrange the three deficits from the smallest to the largest.`,
  items: [`Primary deficit (₹${HEM_D.pd} crore)`, `Revenue deficit (₹${HEM_D.rd} crore)`, `Fiscal deficit (₹${inr(HEM_D.fd)} crore)`],
  sol: `Primary deficit = ${inr(HEM_D.fd)} − ${HEM.interest} = ${HEM_D.pd}; then the revenue deficit ${HEM_D.rd}; the fiscal deficit ${inr(HEM_D.fd)} is the largest.`,
}));
Q('n_rd_shail', num({
  t: 3, d: 1, c: 'understanding', marks: 1, value: SHAIL_RD, unit: '₹ crore',
  stem: `The imagined state of Shailpur expects revenue receipts of ₹${inr(SHAIL.rr)} crore and revenue expenditure of ₹${inr(SHAIL.re)} crore. Find its revenue deficit (in ₹ crore).`,
  sol: `Revenue deficit = ${inr(SHAIL.re)} − ${inr(SHAIL.rr)} = ${SHAIL_RD} crore.`,
}));
Q('n_fd_hem', num({
  t: 3, d: 2, c: 'application', marks: 2, value: HEM_D.fd, unit: '₹ crore',
  stem: `The imagined Republic of Hemavati expects (₹ crore): tax revenue ${inr(HEM.tax)}; non-tax revenue ${HEM.nonTax}; recovery of loans ${HEM.recov}; disinvestment ${HEM.disinv}; revenue expenditure ${inr(HEM.revExp)}; capital expenditure ${inr(HEM.capExp)}. Calculate its fiscal deficit (in ₹ crore).`,
  sol: `Total expenditure = ${inr(HEM.revExp)} + ${inr(HEM.capExp)} = ${inr(HEM_D.te)}; receipts other than borrowing = ${inr(HEM.tax)} + ${HEM.nonTax} + ${HEM.recov} + ${HEM.disinv} = ${inr(HEM_D.rr + HEM_D.ndcr)}; fiscal deficit = ${inr(HEM_D.te)} − ${inr(HEM_D.rr + HEM_D.ndcr)} = ${inr(HEM_D.fd)} crore.`,
  scheme: [['Total expenditure and non-debt receipts', 1], [`Fiscal deficit ${HEM_D.fd}`, 1]],
}));
Q('n_int_reva', num({
  t: 3, d: 2, c: 'application', marks: 1, value: REVA_INT, unit: '₹ crore',
  stem: `The imagined government of Revapur has a fiscal deficit of ₹${REVA.fd} crore and a primary deficit of ₹${REVA.pd} crore. How much does it pay as interest (in ₹ crore)?`,
  sol: `Interest = fiscal deficit − primary deficit = ${REVA.fd} − ${REVA.pd} = ${REVA_INT} crore.`,
}));
Q('n_fd_share', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: HIRAN_SHARE, unit: '%',
  stem: `The imagined state of Hiranyapur has a fiscal deficit of ₹${HIRAN.fd} crore and a gross state domestic product of ₹${inr(HIRAN.gdp)} crore. Express the fiscal deficit as a per cent of its GDP.`,
  sol: `${HIRAN.fd} ÷ ${inr(HIRAN.gdp)} × 100 = ${HIRAN_SHARE} per cent.`,
}));
Q('n_rd_share', num({
  t: 3, d: 3, c: 'analysis', marks: 1, value: SARAS_SHARE, unit: '%',
  stem: `The imagined state of Saraswatipur has a revenue deficit of ₹${SARAS.rd} crore and a fiscal deficit of ₹${SARAS.fd} crore. What per cent of its borrowing goes to cover the revenue gap?`,
  sol: `${SARAS.rd} ÷ ${SARAS.fd} × 100 = ${SARAS_SHARE} per cent: half of the year's borrowing pays for current spending.`,
}));
Q('s_fd_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the fiscal deficit of a government, and what does it show about the imagined Republic of Hemavati?',
  model: '**Fiscal deficit** is the excess of **total expenditure** over total receipts **other than borrowing** (revenue receipts plus non-debt capital receipts). It shows the **total amount Hemavati must borrow** in the year, so it measures its **borrowing requirement**.',
  sol: 'Definition and what it measures.',
  scheme: [['Definition', 1], ['Shows the borrowing requirement', 1]],
}));
Q('s_pd_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the primary deficit and what it reveals about the budget of the imagined government of Revapur.',
  model: '**Primary deficit** = fiscal deficit **minus interest payments**. It shows how much Revapur borrows for its **present programmes**, after setting aside the borrowing needed to pay **interest on past loans**.',
  sol: 'Formula and meaning.',
  scheme: [['Formula', 1], ['What it reveals', 1]],
}));
Q('s_rd_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define revenue deficit and state one implication for the imagined state of Shailpur, which has one every year.',
  model: '**Revenue deficit** is the excess of **revenue expenditure** over **revenue receipts**. For Shailpur it means **borrowing or selling assets to pay for current spending** such as salaries, so its debt grows without creating assets.',
  sol: 'Definition plus one implication.',
  scheme: [['Definition', 1], ['Implication', 1]],
}));
Q('s3_hem_three', short({
  t: 3, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `From the data of the imagined Republic of Hemavati (₹ crore) — tax revenue ${inr(HEM.tax)}, non-tax revenue ${HEM.nonTax}, recovery of loans ${HEM.recov}, disinvestment ${HEM.disinv}, revenue expenditure ${inr(HEM.revExp)} (including interest ${HEM.interest}), capital expenditure ${inr(HEM.capExp)} — calculate the revenue, fiscal and primary deficits.`,
  model: `**Revenue deficit** = ${inr(HEM.revExp)} − (${inr(HEM.tax)} + ${HEM.nonTax}) = ${inr(HEM.revExp)} − ${inr(HEM_D.rr)} = **₹${HEM_D.rd} crore**.\n**Fiscal deficit** = (${inr(HEM.revExp)} + ${inr(HEM.capExp)}) − (${inr(HEM_D.rr)} + ${HEM.recov} + ${HEM.disinv}) = ${inr(HEM_D.te)} − ${inr(HEM_D.rr + HEM_D.ndcr)} = **₹${inr(HEM_D.fd)} crore**.\n**Primary deficit** = ${inr(HEM_D.fd)} − ${HEM.interest} = **₹${HEM_D.pd} crore**.`,
  sol: 'Apply the three formulas in order.',
  scheme: [['Revenue deficit', 1], ['Fiscal deficit', 1], ['Primary deficit', 1]],
}));
Q('s3_rd_implication', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The imagined state of Shailpur runs a revenue deficit every year. Explain three implications for its finances.',
  model: '1. **Dissaving**: the government spends more than its current income on current needs, so it **eats into the savings** of other sectors.\n2. **Rising debt without assets**: it borrows or sells assets to pay salaries and subsidies, so **debt grows** while no income-earning assets are built.\n3. **Future burden**: larger debt means larger **interest payments** later, which raise revenue expenditure and **deepen the deficit**.',
  sol: 'Dissaving, debt without assets, future interest.',
  scheme: [['Dissaving', 1], ['Debt without assets', 1], ['Future interest burden', 1]],
}));
Q('s3_fd_implication', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Explain three possible effects of a persistently high fiscal deficit on the imagined Republic of Hemavati, and say which is the most serious.',
  model: '1. **Debt and interest**: borrowing every year raises the debt, so **interest payments** take a growing share of revenue.\n2. **Debt trap**: if new loans are needed just to pay interest, the government **borrows to service debt**.\n3. **Inflation**: if part of the deficit is met by **borrowing from the central bank**, new money can **push up prices**.\nThe **debt trap** is the most serious, because it feeds on itself and leaves less for development.',
  sol: 'Three effects and a reasoned judgement.',
  scheme: [['Debt and interest', 1], ['Debt trap or inflation', 1], ['Third effect with a judgement', 1]],
}));
Q('s3_pd_meaning', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `The imagined Union of Kanakdesh has a fiscal deficit of ₹${KANAK.fd} crore and pays interest of ₹${KANAK.interest} crore. Explain what its primary deficit shows about its budget.`,
  model: `Primary deficit = ${KANAK.fd} − ${KANAK.interest} = **zero**. So **all** of this year's borrowing is used to pay **interest on past loans**; present programmes are fully covered by current receipts. The budget is not adding fresh borrowing for new spending, but the **old debt** keeps the government borrowing; to cut the fiscal deficit it must reduce the debt itself.`,
  sol: 'Compute, interpret, and note the burden of past debt.',
  scheme: [['Primary deficit computed', 1], ['All borrowing pays interest', 1], ['Interpretation of past debt', 1]],
}));
Q('s3_neel', short({
  t: 3, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `The imagined state of Neelachal has (₹ crore) revenue receipts ${inr(NEEL_D.rr)}, revenue expenditure ${inr(NEEL.revExp)}, non-debt capital receipts ${NEEL_D.ndcr} and capital expenditure ${NEEL.capExp}. Show that it has a revenue surplus but a fiscal deficit, and explain why this is less worrying than a revenue deficit.`,
  model: `Revenue surplus = ${inr(NEEL_D.rr)} − ${inr(NEEL.revExp)} = **₹${-NEEL_D.rd} crore**. Fiscal deficit = (${inr(NEEL.revExp)} + ${NEEL.capExp}) − (${inr(NEEL_D.rr)} + ${NEEL_D.ndcr}) = **₹${NEEL_D.fd} crore**. Neelachal borrows only to **build assets** such as roads and buildings, not to pay salaries, so the debt is matched by **assets that can raise future income**.`,
  sol: 'Two calculations and the asset argument.',
  scheme: [['Revenue surplus', 1], ['Fiscal deficit', 1], ['Borrowing funds assets', 1]],
}));
Q('l_deficits_full', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Answer both parts about the imagined state of Aranyadesh, whose budget (₹ crore) shows: tax revenue ${inr(ARAN.tax)}; non-tax revenue ${ARAN.nonTax}; recovery of loans ${ARAN.recov}; disinvestment ${ARAN.disinv}; revenue expenditure ${inr(ARAN.revExp)}, of which interest ${ARAN.interest}; capital expenditure ${ARAN.capExp}. [3 + 2]\n\n(a) Calculate the revenue, fiscal and primary deficits. [3]\n(b) What does the gap between the fiscal and primary deficits tell us about Aranyadesh? [2]`,
  model: `(a) Revenue receipts = ${inr(ARAN.tax)} + ${ARAN.nonTax} = ${inr(ARAN_D.rr)}. **Revenue deficit** = ${inr(ARAN.revExp)} − ${inr(ARAN_D.rr)} = **₹${ARAN_D.rd} crore**. Total expenditure = ${inr(ARAN.revExp)} + ${ARAN.capExp} = ${inr(ARAN_D.te)}; non-debt receipts = ${inr(ARAN_D.rr)} + ${ARAN.recov} + ${ARAN.disinv} = ${inr(ARAN_D.rr + ARAN_D.ndcr)}. **Fiscal deficit** = ${inr(ARAN_D.te)} − ${inr(ARAN_D.rr + ARAN_D.ndcr)} = **₹${ARAN_D.fd} crore**. **Primary deficit** = ${ARAN_D.fd} − ${ARAN.interest} = **₹${ARAN_D.pd} crore**.\n(b) The gap of ₹${ARAN.interest} crore is the **interest on past borrowing**. Of the ₹${ARAN_D.fd} crore that Aranyadesh borrows this year, ₹${ARAN.interest} crore only **services old debt**, and just ₹${ARAN_D.pd} crore finances **present programmes**, so earlier deficits weigh heavily on its budget today.`,
  sol: 'Three deficits by formula; interpret the interest gap.',
  scheme: [['Revenue deficit', 1], ['Fiscal deficit', 1], ['Primary deficit', 1], ['Gap equals interest on past debt', 1], ['Interpretation', 1]],
}));
Q('l_fd_evaluate', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Answer both parts about the imagined Republic of Hemavati, whose fiscal deficit has risen for three years. [2 + 3]\n\n(a) Explain why a fiscal deficit equals the government\'s borrowing requirement. [2]\n(b) "A rising fiscal deficit is always harmful." Evaluate this statement. [3]',
  model: '(a) The budget must be financed. Whatever expenditure is **not covered by revenue receipts and non-debt capital receipts** has to be met by **borrowing**, so the fiscal deficit and the year\'s borrowing are the **same amount**.\n(b) The statement is **too strong**. A rising deficit is **harmful** when the borrowing pays for **revenue spending** such as salaries and subsidies, when interest eats up a growing share of revenue, or when the deficit is met by **printing money**, which can cause inflation. But borrowing that finances **capital spending** on roads, power and irrigation in a **slump** can **raise output and future revenue**, and may repay itself. So the effect depends on **what the borrowing finances and when**.',
  sol: 'Identity of FD and borrowing; a balanced judgement.',
  scheme: [['(a) Gap must be borrowed', 1], ['(a) Same amount', 1], ['(b) Harmful cases', 1], ['(b) Useful cases', 1], ['(b) Reasoned conclusion', 1]],
}));
Q('l_classify_full', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Answer both parts about the budget of the imagined state of Hemkunt. [2 + 3]\n\n(a) State the tests that separate a revenue receipt from a capital receipt. [2]\n(b) Classify, with reasons: (i) a loan raised from a development bank; (ii) a grant received from the Union government; (iii) money spent on buying new buses for the state transport service. [3]',
  model: '(a) A **capital receipt** either **creates a liability** (like borrowing) or **reduces an asset** (like recovery of loans or disinvestment). A **revenue receipt** does **neither**: taxes, fees, fines, interest and dividends are examples.\n(b) (i) The loan creates a **liability** to repay, so it is a **capital receipt**. (ii) A grant from the Union is not repaid and reduces no asset, so for Hemkunt it is a **revenue receipt**. (iii) Buses are **assets** that will serve for years, so buying them is **capital expenditure**; their fuel and drivers\' wages would be revenue expenditure.',
  sol: 'Two tests; classify each item with its reason.',
  scheme: [['(a) Capital receipt tests', 1], ['(a) Revenue receipt test', 1], ['(b)(i) Loan', 1], ['(b)(ii) Grant', 1], ['(b)(iii) Buses', 1]],
}));
Q('l_three_compare', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Answer both parts. [2 + 3]\n\n(a) Distinguish the fiscal deficit from the revenue deficit. [2]\n(b) The imagined state of Saraswatipur has a revenue deficit of ₹${SARAS.rd} crore, a fiscal deficit of ₹${SARAS.fd} crore and interest payments of ₹${SARAS.interest} crore. Calculate its primary deficit and the share of borrowing used for the revenue gap, and comment on the quality of its borrowing. [3]`,
  model: `(a) The **revenue deficit** compares only the **revenue account**: revenue expenditure minus revenue receipts. The **fiscal deficit** covers the **whole budget**: total expenditure minus revenue and non-debt capital receipts, so it equals total borrowing.\n(b) **Primary deficit** = ${SARAS.fd} − ${SARAS.interest} = **₹${SARAS_PD} crore**. Share of borrowing for the revenue gap = ${SARAS.rd} ÷ ${SARAS.fd} × 100 = **${SARAS_SHARE} per cent**. So **half** of what Saraswatipur borrows pays for **current spending** rather than assets. This is **poor-quality borrowing**: it adds to debt and interest without building capacity to repay, so the state should cut the revenue deficit first.`,
  sol: 'Distinguish; two calculations; a judgement.',
  scheme: [['(a) Revenue deficit', 1], ['(a) Fiscal deficit', 1], ['(b) Primary deficit', 1], ['(b) Share of borrowing', 1], ['(b) Comment on quality', 1]],
}));
Q('l_budget_meaning', long({
  t: [1, 2], d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Answer both parts about the budget of the imagined Republic of Hemavati. [2 + 3]\n\n(a) What is a government budget? How do the Union and State budgets differ in India? [2]\n(b) Explain the four components of a budget, with an example of each. [3]',
  model: '(a) A budget is the **annual statement of estimated receipts and expenditure** of a government for the coming financial year, called the **annual financial statement**. The **Union budget** is presented in **Parliament** for Union subjects; each **State budget** is presented in its **State legislature** for State subjects.\n(b) **Revenue receipts** create no liability and reduce no asset (taxes, fees). **Capital receipts** create a liability or reduce an asset (borrowing, disinvestment). **Revenue expenditure** creates no asset and reduces no liability (salaries, interest). **Capital expenditure** creates an asset or reduces a liability (building schools, repaying loans).',
  sol: 'Meaning, Union and State; four components with examples.',
  scheme: [['(a) Meaning', 1], ['(a) Union versus State', 1], ['(b) Two receipt heads', 1], ['(b) Revenue expenditure', 1], ['(b) Capital expenditure', 1]],
}));
Q('l_hem_two_years', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Answer both parts about the imagined Republic of Hemavati. [2 + 3]\n\n(a) This year its fiscal deficit is ₹${inr(HEM_D.fd)} crore and its interest bill ₹${HEM.interest} crore. Next year the fiscal deficit is expected to be ₹${inr(HEM2.fd)} crore with interest of ₹${inr(HEM2.interest)} crore. Calculate the primary deficit for both years. [2]\n(b) A minister says the budget has not worsened because the primary deficit is unchanged. Evaluate this claim. [3]`,
  model: `(a) This year: ${inr(HEM_D.fd)} − ${HEM.interest} = **₹${HEM_D.pd} crore**. Next year: ${inr(HEM2.fd)} − ${inr(HEM2.interest)} = **₹${HEM2_PD} crore**.\n(b) The minister is **partly right**: borrowing for **present programmes** is unchanged at ₹${HEM2_PD} crore. But the **fiscal deficit** rises by ₹150 crore, entirely because **interest** rises from ₹${HEM.interest} crore to ₹${inr(HEM2.interest)} crore. Past borrowing is growing and is now **forcing extra borrowing just to pay interest**, the early sign of a debt trap. So the overall position **has worsened**, even though current policy is no looser.`,
  sol: 'Two primary deficits; judge the claim using the rising interest.',
  scheme: [['(a) Both primary deficits', 2], ['(b) What is unchanged', 1], ['(b) Interest-driven rise in fiscal deficit', 1], ['(b) Conclusion', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('s4_receipts', short({
  t: 2, d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Answer both subparts about the imagined Union of Kanakdesh. [2 + 2]\n\n(i) Kanakdesh sells part of its shares in a public-sector oil company and also receives interest on loans it gave its provinces. Classify both receipts with reasons.\n(ii) Explain why money borrowed from the public appears on the receipts side of the budget but is not counted when the fiscal deficit is calculated.',
  model: '(i) The share sale is **disinvestment**: it **reduces an asset**, so it is a **capital receipt**. Interest received creates no liability and reduces no asset, so it is a **non-tax revenue receipt**.\n(ii) Borrowing is a receipt because it brings in cash, but it **creates a liability**. The fiscal deficit measures **how much must be borrowed**, so it compares expenditure with **non-debt receipts only**; counting borrowing would make every deficit disappear.',
  sol: 'Classify two receipts; explain why borrowing is excluded.',
  scheme: [['(i) Share sale', 1], ['(i) Interest received', 1], ['(ii) Borrowing creates a liability', 1], ['(ii) Excluded because the deficit measures borrowing', 1]],
}));
Q('s4_deficit_pair', short({
  t: 3, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both subparts. [2 + 2]\n\n(i) The imagined state of Shailpur has revenue receipts of ₹${inr(SHAIL.rr)} crore and revenue expenditure of ₹${inr(SHAIL.re)} crore. Find its revenue deficit and state what it implies.\n(ii) The imagined government of Revapur has a fiscal deficit of ₹${REVA.fd} crore and a primary deficit of ₹${REVA.pd} crore. Find its interest payments and explain what they show.`,
  model: `(i) Revenue deficit = ${inr(SHAIL.re)} − ${inr(SHAIL.rr)} = **₹${SHAIL_RD} crore**. Shailpur's current spending on salaries, pensions and subsidies is larger than its current income, so it must **borrow or sell assets** to meet the gap. Its debt therefore grows **without creating assets** that could earn income, and interest will rise in later years.\n(ii) Interest = ${REVA.fd} − ${REVA.pd} = **₹${REVA_INT} crore**. So most of Revapur's borrowing this year goes to **service past debt**: only ₹${REVA.pd} crore of it finances **present programmes**. The large interest bill shows that earlier deficits now weigh heavily on its budget.`,
  sol: 'Two small calculations, each with a meaning.',
  scheme: [['(i) Revenue deficit', 1], ['(i) Implication', 1], ['(ii) Interest', 1], ['(ii) Meaning', 1]],
}));
Q('l8_budget_full', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the classification of government receipts and expenditure into revenue and capital, giving the test and two examples for each of the four heads.\n(ii) The imagined Republic of Hemavati expects (₹ crore): tax revenue ${inr(HEM.tax)}; non-tax revenue ${HEM.nonTax}; recovery of loans ${HEM.recov}; disinvestment ${HEM.disinv}; revenue expenditure ${inr(HEM.revExp)}, including interest ${HEM.interest}; capital expenditure ${inr(HEM.capExp)}. Calculate its revenue, fiscal and primary deficits, and comment on what they show.`,
  model: `(i) **Revenue receipts** create no liability and reduce no asset: taxes such as income tax and GST, and non-tax items such as fees and dividends. **Capital receipts** create a liability or reduce an asset: borrowing from the public, and recovery of loans or disinvestment. **Revenue expenditure** creates no asset and reduces no liability: salaries, pensions, interest and subsidies. **Capital expenditure** creates an asset or reduces a liability: building highways and hospitals, giving loans, and repaying debt.\n(ii) **Revenue deficit** = ${inr(HEM.revExp)} − ${inr(HEM_D.rr)} = **₹${HEM_D.rd} crore**. **Fiscal deficit** = ${inr(HEM_D.te)} − (${inr(HEM_D.rr)} + ${HEM_D.ndcr}) = **₹${inr(HEM_D.fd)} crore**, which is the year's borrowing. **Primary deficit** = ${inr(HEM_D.fd)} − ${HEM.interest} = **₹${HEM_D.pd} crore**. Half of the borrowing (${HEM_D.rd} of ${inr(HEM_D.fd)}) covers **current spending**, and ₹${HEM.interest} crore of it pays **interest on past debt**, so only a small part builds assets. Hemavati should **narrow the revenue deficit** so that its borrowing goes into capital projects.`,
  sol: 'Four heads with tests and examples; three deficits with interpretation.',
  scheme: [['(i) Revenue receipts', 1], ['(i) Capital receipts', 1], ['(i) Revenue expenditure', 1], ['(i) Capital expenditure', 1], ['(ii) Revenue deficit', 1], ['(ii) Fiscal deficit', 1], ['(ii) Primary deficit', 1], ['(ii) Comment', 1]],
}));
Q('l8_deficit_debate', long({
  t: [1, 3], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Explain the meaning of balanced, surplus and deficit budgets, and why a government in a slump might choose a deficit budget.\n(ii) The imagined state of Neelachal has a revenue surplus of ₹${-NEEL_D.rd} crore and a fiscal deficit of ₹${NEEL_D.fd} crore, while the imagined state of Saraswatipur has a revenue deficit of ₹${SARAS.rd} crore and a fiscal deficit of ₹${SARAS.fd} crore. Evaluate which state's borrowing is of better quality.`,
  model: `(i) In a **balanced** budget, estimated receipts other than borrowing **equal** estimated expenditure; in a **surplus** budget they **exceed** it; in a **deficit** budget expenditure **exceeds** them and the gap is borrowed. In a **slump**, demand, output and jobs are low. A deficit budget lets the government **spend more or tax less**, which adds to aggregate demand and, through the multiplier, raises income and employment; a balanced budget would hold spending down just when the economy needs a push.\n(ii) **Neelachal** covers all its current spending from current income and borrows ₹${NEEL_D.fd} crore only to **build assets**, which can raise future income and help repay the loans. **Saraswatipur** uses ${SARAS_SHARE} per cent of its ₹${SARAS.fd} crore borrowing to pay for **current spending**, so half its new debt creates **no assets** and only adds to future interest. Neelachal's borrowing is therefore of **better quality**, even though its fiscal deficit is not small; Saraswatipur should first close its revenue gap.`,
  sol: 'Three budget types and the slump case; compare the quality of borrowing.',
  scheme: [['(i) Three budget types', 1], ['(i) Slump: low demand', 1], ['(i) Deficit raises demand', 1], ['(i) Multiplier or contrast with balanced', 1], ['(ii) Neelachal analysed', 1], ['(ii) Saraswatipur analysed', 1], ['(ii) Share of borrowing used', 1], ['(ii) Reasoned judgement', 1]],
}));

// ================================================================ case-based
Q('cb_aranya', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined budget summary of Aranyadesh and answer the questions that follow. *(Written by SOYL for practice; the state and figures are imagined.)*',
  passage: `**Aranyadesh budget summary for the coming year (imagined, ₹ crore)**\n\n| Item | Amount |\n|---|---|\n| Tax revenue | ${inr(ARAN.tax)} |\n| Non-tax revenue | ${ARAN.nonTax} |\n| Recovery of loans from local bodies | ${ARAN.recov} |\n| Sale of shares in a state cement company | ${ARAN.disinv} |\n| Borrowings | ${ARAN.borrowGiven} |\n| Revenue expenditure (including interest ${ARAN.interest}) | ${inr(ARAN.revExp)} |\n| Capital expenditure | ${ARAN.capExp} |\n\nThe finance secretary notes that the state's borrowing should fall in future years.`,
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Classify the sale of shares in the state cement company.', model: 'A **capital receipt** (disinvestment), because it **reduces an asset**.', sol: 'Asset reduced.', scheme: [['Capital receipt with reason', 1]] })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: ARAN_D.rd, unit: '₹ crore', stem: 'Calculate the revenue deficit (in ₹ crore).', sol: `${inr(ARAN.revExp)} − (${inr(ARAN.tax)} + ${ARAN.nonTax}) = ${inr(ARAN.revExp)} − ${inr(ARAN_D.rr)} = ${ARAN_D.rd} crore.` })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Calculate the fiscal deficit and show that it equals the borrowings in the table.', model: `Fiscal deficit = (${inr(ARAN.revExp)} + ${ARAN.capExp}) − (${inr(ARAN_D.rr)} + ${ARAN.recov} + ${ARAN.disinv}) = ${inr(ARAN_D.te)} − ${inr(ARAN_D.rr + ARAN_D.ndcr)} = **₹${ARAN_D.fd} crore**, the **same** as the borrowings of ₹${ARAN.borrowGiven} crore.`, sol: 'Total expenditure less non-debt receipts.', scheme: [['Fiscal deficit computed', 1], ['Equal to borrowings', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Calculate the primary deficit and explain what it shows.', model: `Primary deficit = ${ARAN_D.fd} − ${ARAN.interest} = **₹${ARAN_D.pd} crore**. Most of the year's borrowing goes to **interest on past debt**; only ₹${ARAN_D.pd} crore finances **present programmes**.`, sol: 'Fiscal deficit less interest.', scheme: [['Primary deficit', 1], ['Interpretation', 1]] }),
    ]),
  ],
}));
Q('cb_neelachal', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined note from the finance department of Neelachal and answer the questions that follow. *(Written by SOYL for practice; the state and figures are imagined.)*',
  passage: `**Neelachal finance department: budget note (imagined)**\n\nNext year the state expects revenue receipts of ₹${inr(NEEL_D.rr)} crore and revenue expenditure of ₹${inr(NEEL.revExp)} crore, of which ₹${NEEL.interest} crore is interest. It expects ₹${NEEL_D.ndcr} crore from recovery of loans and the sale of a guest house, and plans capital expenditure of ₹${NEEL.capExp} crore on two irrigation canals and a medical college. An opposition member says the state is "living beyond its means".`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: NEEL_D.fd, unit: '₹ crore', stem: 'Calculate the fiscal deficit (in ₹ crore).', sol: `(${inr(NEEL.revExp)} + ${NEEL.capExp}) − (${inr(NEEL_D.rr)} + ${NEEL_D.ndcr}) = ${inr(NEEL_D.te)} − ${inr(NEEL_D.rr + NEEL_D.ndcr)} = ${NEEL_D.fd} crore.` })),
    child('b', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: NEEL_D.pd, unit: '₹ crore', stem: 'Calculate the primary deficit (in ₹ crore).', sol: `${NEEL_D.fd} − ${NEEL.interest} = ${NEEL_D.pd} crore.` })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the claim that the state is "living beyond its means".', model: `Revenue receipts exceed revenue expenditure by ₹${-NEEL_D.rd} crore, so current spending is **fully covered**. The state borrows only for **canals and a college**, assets that can raise future income. The claim is **not justified**, though the borrowing must still be repaid.`, sol: 'Use the revenue surplus and the use of borrowing.', scheme: [['Revenue surplus noted', 1], ['Borrowing funds assets; judgement', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why a state with a revenue surplus can still have a fiscal deficit.', model: `The fiscal deficit includes **capital expenditure**. Neelachal's capital spending of ₹${NEEL.capExp} crore is more than its revenue surplus (₹${-NEEL_D.rd} crore) plus non-debt capital receipts (₹${NEEL_D.ndcr} crore), so it must **borrow the rest**.`, sol: 'Capital spending exceeds the surplus and non-debt receipts.', scheme: [['Fiscal deficit includes capital spending', 1], ['Comparison with figures', 1]] }),
    ]),
  ],
}));
Q('cb_saraswati', caseQ({
  t: 3, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined newspaper report from Saraswatipur and answer the questions that follow. *(Written by SOYL for practice; the state and figures are imagined.)*',
  passage: `**Saraswatipur budget: borrowing to stay at ₹${SARAS.fd} crore (imagined report)**\n\nThe state's budget shows a fiscal deficit of ₹${SARAS.fd} crore, of which ₹${SARAS.rd} crore covers the gap between its revenue expenditure and revenue receipts. Interest on old loans will cost ₹${SARAS.interest} crore. The finance minister promises to raise spending on teachers' salaries and to start a new scheme of free bus passes for students, both from the revenue account.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: SARAS_PD, unit: '₹ crore', stem: 'Calculate the primary deficit (in ₹ crore).', sol: `${SARAS.fd} − ${SARAS.interest} = ${SARAS_PD} crore.` })),
    child('b', num({ t: 3, d: 3, c: 'application', marks: 1, value: SARAS_SHARE, unit: '%', stem: 'What per cent of the fiscal deficit is the revenue deficit?', sol: `${SARAS.rd} ÷ ${SARAS.fd} × 100 = ${SARAS_SHARE} per cent.` })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the effect of the two new promises on the state\'s deficits.', model: 'Both are **revenue expenditure**, so unless new revenue is found they **raise the revenue deficit** and the **fiscal deficit** together. More borrowing would then pay for **current spending**, adding to debt and future interest without new assets.', sol: 'Revenue spending raises both deficits.', scheme: [['Both are revenue expenditure', 1], ['Effect on deficits and debt', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest two ways in which Saraswatipur could reduce its revenue deficit.', model: '(1) **Raise revenue receipts**, for example by widening the tax base or revising **user fees**. (2) **Cut wasteful revenue expenditure**, such as poorly targeted subsidies, while protecting essential services.', sol: 'Raise revenue or cut revenue spending.', scheme: [['First way', 1], ['Second way', 1]] }),
    ]),
  ],
}));
