// CBSE 12 Business Studies, ch09 Financial Management — question bank. Every firm, person and figure is
// imagined by SOYL and labelled as such; no NCERT text or exercise and no board/sample-paper item is
// reused (D-036). Every numerical (EPS, trading on equity, interest coverage, debt-equity, working
// capital, ROI) is computed here and checked by assertions, so key, solution and deck cannot drift.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
export const inr = (n) => Number(n).toLocaleString('en-IN');
const r2 = (v) => Math.round(v * 100) / 100;

/** Earnings per share for one financing plan: EBIT, debt at `rate`, equity in shares of `face`, tax rate `tax`. */
export function eps({ ebit, debt = 0, rate = 0, equity, face = 10, tax }) {
  const interest = Math.round(debt * rate);
  const ebt = ebit - interest;
  const taxAmt = Math.round(ebt * tax);
  const eat = ebt - taxAmt;
  const shares = equity / face;
  assert.ok(Number.isInteger(shares), 'whole number of shares');
  return { ebit, debt, rate, equity, face, tax, interest, ebt, taxAmt, eat, shares, eps: r2(eat / shares) };
}

// Deck worked example: imagined Sahyadri Ceramics Ltd, total capital ₹40,00,000, tax 30%.
export const TOE = {
  capital: 4000000,
  rate: 0.1,
  tax: 0.3,
  good: { A: eps({ ebit: 600000, equity: 4000000, tax: 0.3 }), B: eps({ ebit: 600000, debt: 2000000, rate: 0.1, equity: 2000000, tax: 0.3 }) },
  bad: { A: eps({ ebit: 320000, equity: 4000000, tax: 0.3 }), B: eps({ ebit: 320000, debt: 2000000, rate: 0.1, equity: 2000000, tax: 0.3 }) },
};
assert.equal(TOE.good.A.eat, 420000);
assert.equal(TOE.good.A.eps, 1.05);
assert.equal(TOE.good.B.interest, 200000);
assert.equal(TOE.good.B.eat, 280000);
assert.equal(TOE.good.B.eps, 1.4);
assert.equal(TOE.bad.A.eps, 0.56);
assert.equal(TOE.bad.B.eat, 84000);
assert.equal(TOE.bad.B.eps, 0.42);
export const ROI_GOOD = (TOE.good.A.ebit / TOE.capital) * 100; // 15
export const ROI_BAD = (TOE.bad.A.ebit / TOE.capital) * 100; // 8
assert.equal(ROI_GOOD, 15);
assert.equal(ROI_BAD, 8);

// Bank: imagined Kaveri Pumps Ltd.
export const KP = eps({ ebit: 900000, debt: 3000000, rate: 0.09, equity: 2500000, tax: 0.25 });
assert.equal(KP.interest, 270000);
assert.equal(KP.ebt, 630000);
assert.equal(KP.taxAmt, 157500);
assert.equal(KP.eat, 472500);
assert.equal(KP.eps, 1.89);

// Bank: interest coverage of an imagined Malwa Textiles Ltd.
export const ICR = { ebit: 1200000, interest: 300000 };
ICR.ratio = ICR.ebit / ICR.interest;
assert.equal(ICR.ratio, 4);

// Bank: debt-equity ratio of an imagined Narmada Cables Ltd.
export const DE = { debt: 1800000, equity: 2400000 };
DE.ratio = DE.debt / DE.equity;
assert.equal(DE.ratio, 0.75);

// Bank: net working capital of an imagined Chilika Foods Ltd.
export const WC = { ca: 1450000, cl: 920000 };
WC.net = WC.ca - WC.cl;
assert.equal(WC.net, 530000);

// Bank: ROI of an imagined Ganga Logistics Ltd.
export const GL = { ebit: 720000, capital: 6000000 };
GL.roi = (GL.ebit / GL.capital) * 100;
assert.equal(GL.roi, 12);

// Case: imagined Vindhya Solar Ltd, two plans for ₹1 crore at ROI 18% vs debt cost 12%, tax 25%.
export const VS = {
  A: eps({ ebit: 1800000, equity: 10000000, tax: 0.25 }),
  B: eps({ ebit: 1800000, debt: 6000000, rate: 0.12, equity: 4000000, tax: 0.25 }),
};
assert.equal(VS.A.eat, 1350000);
assert.equal(VS.A.eps, 1.35);
assert.equal(VS.B.interest, 720000);
assert.equal(VS.B.eat, 810000);
assert.equal(VS.B.eps, 2.03);

// Bank: EPS difference for an imagined Tapti Motors (equity-only vs 50% debt at 8%), EBIT 5,00,000 on ₹50 lakh, tax 20%.
export const TM = {
  A: eps({ ebit: 500000, equity: 5000000, tax: 0.2 }),
  B: eps({ ebit: 500000, debt: 2500000, rate: 0.08, equity: 2500000, tax: 0.2 }),
};
assert.equal(TM.A.eps, 0.8);
assert.equal(TM.B.interest, 200000);
assert.equal(TM.B.eat, 240000);
assert.equal(TM.B.eps, 0.96);

// ================================================================ t01 Concept, role and objective
Q('m_bus_finance', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The money a business needs to start, run and expand its activities is called',
  opts: ['business finance', 'capital budgeting', 'dividend', 'working capital only'],
  sol: 'All the funds a business requires for its activities are business finance. Capital budgeting is one decision about using funds, dividend is a share of profit, and working capital is only the part used in day-to-day operations.',
}));
Q('m_fm_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Financial management is concerned mainly with',
  opts: [
    'the optimal procurement as well as the usage of finance',
    'keeping the books of accounts of a company',
    'buying and selling shares on the stock exchange for profit',
    'fixing the selling price of the products',
  ],
  sol: 'Financial management deals with raising funds at the least cost and putting them to the best use. Book-keeping is accounting, trading shares is investing, and pricing is part of marketing.',
}));
Q('m_wealth_max', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The primary objective of financial management is to',
  opts: [
    'maximise the market value of the equity shares of the company',
    'maximise the sales of the company in the current year',
    'minimise the tax paid by the company',
    'keep the dividend the same every year',
  ],
  sol: 'The accepted objective is wealth maximisation: decisions should raise the market price of the equity shares, which reflects the owners\' wealth. Higher sales, lower tax or a steady dividend may or may not do this.',
}));
Q('m_role_area', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The finance manager of an imagined Pune auto-parts firm decides how much of its funds to hold as cash, stock of raw materials and money due from customers. Which aspect of the balance sheet is this decision about?',
  opts: [
    'The size and composition of current assets',
    'The size and composition of fixed assets',
    'The proportion of debt and equity',
    'The amount of profit to distribute as dividend',
  ],
  sol: 'Cash, inventory and receivables are current assets, so the decision is about the amount and mix of current assets. Fixed assets, the debt-equity mix and dividend are separate areas that financial management also covers.',
}));
Q('ar_wealth', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A financial decision is good for the shareholders when it increases the market price of the company\'s equity shares.',
  r: 'Financial management aims at maximising the wealth of the owners, and that wealth is reflected in the market value of their shares.',
  sol: 'Both are true. The objective of wealth maximisation (R) is exactly why a decision that raises the share price is judged good for shareholders (A), so R explains A.',
}));
Q('tf_profit_only', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Under financial management, a decision that raises this year\'s profit must always be accepted, even if it makes the company much riskier.',
  sol: 'The objective is to increase the market value of shares, which depends on risk as well as return. A decision that adds a little profit but much more risk can lower the share price, so it need not be accepted.',
}));
Q('s_fm_role', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two areas of a firm\'s balance sheet on which financial management decisions have a direct effect.',
  model: '1. **Size and composition of fixed assets**: how much is invested in land, plant and machinery.\n2. **Proportion of long-term financing**: how much capital comes from debt and how much from equity. (Also: current assets, quantum of debt and equity.)',
  sol: 'Any two of the balance-sheet areas: fixed assets, current assets, amount of long-term and short-term funds, debt-equity mix, breakup of fixed assets.',
  scheme: [['First area with meaning', 1], ['Second area with meaning', 1]],
}));
Q('s_wealth_obj', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the market price of equity shares taken as the measure of the objective of financial management?',
  model: 'The share price reflects what investors expect from **all** the company\'s decisions together: its **earnings, risk and growth**. If good investment, financing and dividend decisions are taken, the price **rises**, and so does the **wealth of the shareholders**.',
  sol: 'Link the share price to the combined effect of decisions on return and risk, and so to owners\' wealth.',
  scheme: [['Price reflects return and risk of decisions', 1], ['Rise in price means more wealth for owners', 1]],
}));

// ================================================================ t02 Financial decisions
Q('m_capbud', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The investment decision that commits funds to long-term assets such as a new plant is also called',
  opts: ['capital budgeting decision', 'working capital decision', 'dividend decision', 'financial planning'],
  sol: 'Long-term investment decisions are capital budgeting decisions. Working capital decisions concern short-term assets; dividend decisions concern distribution of profit.',
}));
Q('m_fin_decision', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined Kochi seafood exporter needs ₹3 crore for a cold store and must choose between issuing new shares and taking a bank loan. Which decision is this?',
  opts: ['Financing decision', 'Investment decision', 'Dividend decision', 'Working capital decision'],
  sol: 'Choosing the source and mix of funds (shares or a loan) is the financing decision. Whether to build the cold store at all would be the investment decision.',
}));
Q('m_div_factor', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined Indore FMCG company has steady earnings every year, so its board feels safe paying a higher dividend. Which factor affecting the dividend decision does this show?',
  opts: ['Stability of earnings', 'Growth opportunities', 'Taxation policy', 'Access to the capital market'],
  sol: 'A company whose earnings are stable can afford to pay higher dividends than one whose earnings swing from year to year. Growth opportunities usually reduce dividends, and tax and market access are different factors.',
}));
Q('m_inv_factor', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Before buying a new packaging line, the finance team of an imagined Rajkot snack maker estimates the cash the line will bring in each year for eight years and compares it with its cost. Which factor affecting capital budgeting is being considered?',
  opts: ['Cash flows of the project', 'Rate of return on the shareholders\' existing funds only', 'Cost of floating new shares', 'Legal restrictions on dividends'],
  sol: 'Capital budgeting looks at the series of cash receipts and payments a project generates over its life. Floatation cost is a financing factor and dividend restrictions concern the dividend decision.',
}));
Q('m_growth_div', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined Bengaluru software start-up has many profitable expansion plans. What will it most likely do with its profits?',
  opts: [
    'Retain most of the profits and pay a low dividend',
    'Pay out all its profits as dividend',
    'Borrow heavily to pay a high dividend',
    'Stop investing so that it can pay a stable dividend',
  ],
  sol: 'Companies with good growth opportunities keep more of their earnings to finance expansion, so their dividends are lower. Paying out everything, or borrowing to pay dividends, would starve the growth plans.',
}));
Q('m_cash_div', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why does the cash position of a company affect its dividend decision?',
  opts: [
    'Dividend involves an outflow of cash, so a company short of cash may pay less even if it has profits',
    'Dividend is paid only out of borrowed money',
    'A company with more cash is legally required to pay a higher dividend',
    'Cash position decides the face value of the shares',
  ],
  sol: 'Paying a dividend takes cash out of the business. Profit may be tied up in stock or debtors, so the available cash limits the dividend. There is no legal rule tying dividend to cash, and face value is unrelated.',
}));
Q('m_stock_mkt_reaction', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Shareholders of an imagined Lucknow company react favourably whenever it raises its dividend, and the share price goes up. Which dividend factor does this show?',
  opts: ['Stock market reaction', 'Contractual constraints', 'Legal constraints', 'Stability of dividends'],
  sol: 'An increase in dividend is generally read as good news, so the share price tends to rise; this is the stock market reaction. Contractual and legal constraints restrict dividends; stability is about keeping dividends steady.',
}));
Q('ar_risk_return', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'The financing decision affects the overall cost of capital of a company.',
  r: 'Investment decisions decide the assets in which a company\'s funds are invested.',
  sol: 'Both are true. A is true because each source of funds has a different cost and risk. R is a correct statement about investment decisions, but it does not explain why financing affects the cost of capital.',
}));
Q('ar_contract', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'A company that has taken a large term loan may be unable to pay a dividend even in a profitable year.',
  r: 'Lenders often put conditions in the loan agreement that restrict the payment of dividends.',
  sol: 'Both are true, and R explains A: contractual constraints in a loan agreement can limit dividends, so profit alone does not decide the payout.',
}));
Q('tf_fin_cost', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? While taking the financing decision, the finance manager must consider the cost of each source as well as its risk.',
  sol: 'Each source has a cost (interest, expected return of owners, floatation cost) and a risk; debt is cheaper but riskier. Both must be weighed.',
}));
Q('fb_dividend', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The decision about how much of the profit is distributed to shareholders and how much is retained in the business is the ___ decision.',
  acc: [['dividend']],
  sol: 'It is the dividend decision: the split of earnings between distribution and retention.',
}));
Q('mt_decisions', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each decision taken by the imagined Sundarban Jute Mills with the type of financial decision it represents.',
  pairs: [
    ['Buying a new spinning machine worth ₹2 crore', 'Long-term investment (capital budgeting) decision'],
    ['Raising ₹2 crore through debentures rather than shares', 'Financing decision'],
    ['Paying ₹3 per share and retaining the rest of the profit', 'Dividend decision'],
    ['Keeping enough raw jute in stock for six weeks', 'Short-term investment (working capital) decision'],
  ],
  sol: 'Buying fixed assets is capital budgeting; choosing debentures is financing; dividend per share is the dividend decision; raw-material stock is a working capital decision.',
}));
Q('s_three_decisions', short({
  t: 2, d: 1, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the three broad financial decisions and state what each one is about.',
  model: '1. **Investment decision**: where to invest the funds, in long-term assets (capital budgeting) and in current assets (working capital).\n2. **Financing decision**: how much to raise from each long-term source, i.e. the mix of **debt and equity** (shareholders\' funds).\n3. **Dividend decision**: how much of the **profit** to pay to shareholders and how much to **retain** for growth.',
  sol: 'Name each decision and give its scope in one line.',
  scheme: [['Investment decision', 1], ['Financing decision', 1], ['Dividend decision', 1]],
}));
Q('s_fin_factors', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two factors that affect the financing decision of a company.',
  model: '1. **Cost**: the cheapest suitable source is preferred, after counting interest and **floatation costs**.\n2. **Risk**: debt must be serviced even in bad years, so a firm with uncertain earnings avoids too much of it. (Also: cash flow position, control, state of the capital market.)',
  sol: 'Any two of cost, risk, floatation cost, cash flow position, fixed operating cost, control considerations, state of the capital market.',
  scheme: [['First factor explained', 1], ['Second factor explained', 1]],
}));
Q('s_capbud_imp', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why are capital budgeting decisions considered important for a business? Give three reasons.',
  model: '1. **Long-term growth**: the assets chosen decide the earning capacity and **growth** of the business for many years.\n2. **Large amounts**: they involve **huge funds**, so mistakes are very costly.\n3. **Risk and irreversibility**: they involve risk, and once a plant is bought the decision **cannot be reversed** without a heavy loss.',
  sol: 'Three of: long-term growth, large amount of funds, risk involved, irreversible decisions.',
  scheme: [['Long-term growth and earning capacity', 1], ['Large amount of funds', 1], ['Risk or irreversibility', 1]],
}));
Q('l_div_factors', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five factors that affect the dividend decision of a company.',
  model: '1. **Amount of earnings**: dividends are paid out of current and past profits, so higher earnings allow higher dividends.\n2. **Stability of earnings**: a firm with steady earnings can pay more than one whose earnings swing.\n3. **Growth opportunities**: firms with good projects **retain** more and pay less.\n4. **Cash flow position**: dividend needs **cash**; profit tied up in stock or debtors cannot be paid out.\n5. **Shareholders\' preference and stock market reaction**: many shareholders want a regular income, and a higher dividend usually lifts the share price. (Also: taxation policy, legal and contractual constraints, stability of dividends, access to the capital market.)',
  sol: 'Five factors, each with a one-line explanation of how it pushes the dividend up or down.',
  scheme: [['Factor 1 explained', 1], ['Factor 2 explained', 1], ['Factor 3 explained', 1], ['Factor 4 explained', 1], ['Factor 5 explained', 1]],
}));
Q('l_inv_fin', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined Coimbatore textile company plans to set up a new weaving unit. Explain how its investment, financing and dividend decisions are linked to one another in this plan.',
  model: '1. **Investment decision first**: the company checks the **cash flows, rate of return and risk** of the weaving unit before committing funds to it.\n2. **Financing follows**: once the unit is approved, it must decide whether to raise the funds by **debt, new shares or retained profits**, weighing **cost, risk and control**.\n3. **Retained profit links financing and dividend**: every rupee retained is a rupee **not paid as dividend**, so a large project may mean a **lower dividend** this year.\n4. **Debt affects dividend**: a big loan brings **interest** and perhaps **loan conditions** that restrict dividends.\n5. **Common goal**: all three are judged by their effect on the **market value of shares**, so they must be taken together, not separately.',
  sol: 'Show the sequence (invest, then finance), the retained-earnings link to dividend, the debt link to dividend, and the shared wealth objective.',
  scheme: [['Investment decision explained for the unit', 1], ['Financing decision and its factors', 1], ['Link through retained earnings', 1], ['Link through debt and loan conditions', 1], ['Common objective of wealth maximisation', 1]],
}));

// ================================================================ t03 Financial planning
Q('m_fp_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Financial planning essentially involves',
  opts: [
    'preparing a financial blueprint of the future operations of the business',
    'recording the past financial transactions of the business',
    'auditing the accounts at the end of the year',
    'deciding the price of the company\'s shares on the stock exchange',
  ],
  sol: 'Financial planning prepares a blueprint of future financial needs and sources. Recording and auditing look at the past, and the share price is decided by the market.',
}));
Q('m_fp_objective', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which pair correctly states the two objectives of financial planning?',
  opts: [
    'To ensure availability of funds whenever required, and to see that the firm does not raise resources unnecessarily',
    'To maximise sales, and to minimise the number of employees',
    'To pay the highest possible dividend, and to avoid all borrowing',
    'To keep the share price fixed, and to raise as much money as possible',
  ],
  sol: 'Financial planning tries to make funds available on time, and to avoid both shortage and surplus of funds. The other options are not objectives of financial planning.',
}));
Q('m_fp_surplus', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined Nagpur trading firm raised ₹50 lakh more than its projects needed, and the money stayed idle in a current account for a year. Which objective of financial planning was ignored?',
  opts: [
    'Seeing that the firm does not raise resources unnecessarily',
    'Ensuring availability of funds whenever required',
    'Fixing the dividend in advance',
    'Deciding the face value of shares',
  ],
  sol: 'Excess funds add to the cost of capital without earning a return, so the firm failed to avoid raising resources unnecessarily. Funds were available, so the first objective was met.',
}));
Q('ar_fp_horizon', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Financial planning usually covers both a long-term plan of three to five years and short-term budgets of about one year.',
  r: 'Financial planning is concerned only with raising funds and not with their use.',
  sol: 'A is true: long-term plans are broken into short-term budgets. R is false: financial planning covers both how much funds are needed and how they will be used.',
}));
Q('tf_fp_link', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Financial planning helps link the investment and financing decisions on a continuous basis.',
  sol: 'By forecasting needs and sources together, financial planning connects what the firm will invest in with how it will pay for it, year after year.',
}));
Q('fb_fp_blueprint', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Financial planning tries to ensure that funds are available at the right ___ and that the firm does not raise more than it needs.',
  acc: [['time']],
  sol: 'Funds should be available at the right time and in the right amount.',
}));
Q('s_fp_imp', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give any three points that explain the importance of financial planning.',
  model: '1. **Facing shocks**: by preparing for different possible situations, it helps the firm deal with **surprises** in the future.\n2. **Coordination**: it links the plans of production, sales and other departments with the funds available.\n3. **Less waste and easier control**: it reduces **duplication and waste** of funds and gives **standards** against which actual performance can be checked. (Also: links present with future; links investment and financing decisions.)',
  sol: 'Three distinct points with a short explanation each.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('s_fp_two_obj', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined Surat diamond-polishing unit ran short of cash in the busy season and had to borrow at a very high rate for two months. Which objective of financial planning did it fail to meet? Explain briefly.',
  model: 'It failed to **ensure availability of funds whenever required**. With proper financial planning it would have **forecast** the extra need for the busy season and arranged funds **in time** at a **reasonable cost**, instead of borrowing in a hurry at a high rate.',
  sol: 'Name the objective (availability of funds when needed) and link it to the season-time shortage.',
  scheme: [['Objective identified', 1], ['Explanation linked to the case', 1]],
}));

// ================================================================ t04 Capital structure
Q('m_cs_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Capital structure refers to the',
  opts: [
    'mix of owners\' funds and borrowed funds used to finance a business',
    'list of fixed assets owned by a business',
    'amount of cash held at the end of the year',
    'number of shareholders of a company',
  ],
  sol: 'Capital structure is the proportion of debt and equity (owners\' funds) in the long-term finance of a business. The other options describe assets, cash or ownership, not the financing mix.',
}));
Q('m_toe_condition', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Trading on equity increases the earnings per share only when',
  opts: [
    'the return on investment is higher than the rate of interest on debt',
    'the rate of interest on debt is higher than the return on investment',
    'the company uses no debt at all',
    'the tax rate is zero',
  ],
  sol: 'Borrowed funds raise EPS only if they earn more than they cost, i.e. ROI exceeds the interest rate. If interest is higher, EPS falls; with no debt there is no trading on equity at all.',
}));
Q('m_icr_meaning', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The interest coverage ratio shows',
  opts: [
    'how many times the earnings before interest and tax cover the interest obligation',
    'how many times the dividend covers the interest',
    'the proportion of debt to equity in the capital structure',
    'the share of current assets in total assets',
  ],
  sol: 'Interest coverage ratio = EBIT ÷ interest. A higher ratio means the firm can service more debt. Debt to equity is a different ratio.',
}));
Q('m_cash_flow_cs', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined Goa resort earns well in winter but almost nothing during the monsoon months. Which factor should make it cautious about taking a large loan?',
  opts: ['Cash flow position', 'Floatation cost', 'Stock market conditions', 'Capital structure of other companies'],
  sol: 'Debt needs regular payment of interest and principal; a business whose cash inflows dry up for months may fail to pay, so cash flow position argues for less debt. The other factors are real but not what the case points to.',
}));
Q('m_control_cs', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The founding family of an imagined Jaipur jewellery company owns 60 per cent of its shares and does not want to lose control. Which source is it likely to prefer for new funds?',
  opts: ['Debt, because lenders do not get voting rights', 'A large issue of new equity shares to the public', 'Selling its own shares to a rival group', 'Converting all its debentures into equity'],
  sol: 'Issuing new equity dilutes the family\'s voting control; debt does not give lenders voting rights, so control considerations favour debt. The other options all reduce the family\'s share.',
}));
Q('m_tax_debt', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Why does a higher income-tax rate make debt relatively more attractive than equity?',
  opts: [
    'Interest on debt is a deductible expense, so the after-tax cost of debt falls',
    'Dividend on equity is deductible from taxable income',
    'Debt holders pay the company\'s tax on its behalf',
    'Tax law forbids companies from issuing equity',
  ],
  sol: 'Interest is deducted before tax is calculated, so a higher tax rate means a bigger tax saving and a cheaper effective cost of debt. Dividend is paid out of after-tax profit and gives no such saving.',
}));
Q('m_floatation', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined Kolkata tea company finds that a public issue of shares will cost it about 7 per cent of the amount raised in fees, printing and advertising, while a bank loan costs very little to arrange. Which factor is it considering?',
  opts: ['Floatation costs', 'Debt service coverage ratio', 'Regulatory framework', 'Risk consideration'],
  sol: 'The expenses of raising funds from a source (fees, printing, advertising) are its floatation costs. The DSCR measures ability to repay, the regulatory framework is the law, and risk is about uncertainty of earnings.',
}));
Q('m_dscr', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A higher debt service coverage ratio of a company indicates that it',
  opts: [
    'can more comfortably meet its interest and loan-repayment obligations, so it can take more debt',
    'has fewer shareholders than before',
    'should immediately repay all its loans',
    'is earning less than its interest cost',
  ],
  sol: 'The DSCR compares the cash available with what is due on debt (interest and principal); a higher value means debt can be serviced more easily, which supports a larger share of debt.',
}));
Q('m_stock_market_cs', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The share market has been depressed for months and investors are unwilling to buy new shares. An imagined Hyderabad pharma company needing funds will most likely',
  opts: ['raise funds through debt for now', 'make a large public issue of equity', 'stop all its operations', 'pay a higher dividend to attract investors'],
  sol: 'When the stock market is depressed, an equity issue is hard to sell, so firms turn to debt; this is the stock market conditions factor. Stopping operations or raising dividend do not solve the funding need.',
}));
Q('ar_toe', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Using more debt can increase the earnings per share of a company when its return on investment is higher than the cost of debt.',
  r: 'The surplus earned on borrowed funds above their fixed interest cost goes to the equity shareholders, who are fewer in number when debt replaces equity.',
  sol: 'Both are true, and R explains A: the extra return on borrowed funds accrues to a smaller number of equity shares, so EPS rises. This is trading on equity.',
}));
Q('ar_debt_cheap', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Debt is generally a cheaper source of finance than equity.',
  r: 'Too much debt increases the financial risk of a company.',
  sol: 'Both are true. A is true because lenders face less risk and interest is tax-deductible. R is also true, but it is a cost of using debt and does not explain why debt is cheaper.',
}));
Q('ar_risk_free', ar({
  t: 4, d: 2, c: 'understanding', key: 'd',
  a: 'Equity is a riskier source of finance for a company than debt.',
  r: 'A company has no legal obligation to pay a dividend or to return equity capital during its life.',
  sol: 'A is false: for the company, equity is the safer source, because there is no fixed obligation to pay. R is true and in fact shows why debt, not equity, is the riskier source for the company.',
}));
Q('tf_toe_loss', tf({
  t: 4, d: 3, c: 'application', ans: true,
  stem: 'True or false? An imagined firm earns 8 per cent on its total capital and borrows at 11 per cent. Raising more of its capital as debt will reduce its earnings per share.',
  sol: 'When ROI (8 per cent) is lower than the cost of debt (11 per cent), each borrowed rupee earns less than it costs, and the shortfall is borne by equity holders, so EPS falls.',
}));
Q('tf_others', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A company should simply copy the capital structure of other companies in its industry without considering its own situation.',
  sol: 'Industry norms are a useful guide, but each company must also weigh its own cash flows, risk, control and cost of funds; copying blindly is not sound.',
}));
Q('fb_icr', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'Interest coverage ratio = Earnings before interest and tax ÷ ___.',
  acc: [['interest', 'interest charges', 'interest obligation']],
  sol: 'The ratio divides EBIT by interest charges.',
}));
Q('n_eps_kp', num({
  t: 4, d: 3, c: 'application', marks: 2, value: KP.eps, unit: '₹',
  stem: `The imagined Kaveri Pumps Ltd has EBIT of ₹${inr(KP.ebit)}, debt of ₹${inr(KP.debt)} at ${KP.rate * 100} per cent interest, and ${inr(KP.shares)} equity shares of ₹${KP.face} each. The tax rate is ${KP.tax * 100} per cent. Calculate its earnings per share (in ₹).`,
  sol: `Step 1: Interest = ${inr(KP.debt)} × ${KP.rate} = ₹${inr(KP.interest)}.\nStep 2: EBT = ${inr(KP.ebit)} − ${inr(KP.interest)} = ₹${inr(KP.ebt)}.\nStep 3: Tax = ${KP.tax * 100} per cent of ${inr(KP.ebt)} = ₹${inr(KP.taxAmt)}; EAT = ₹${inr(KP.eat)}.\nStep 4: EPS = ${inr(KP.eat)} ÷ ${inr(KP.shares)} = ₹${KP.eps}.`,
  scheme: [['Interest, EBT and tax correct', 1], [`EPS = ₹${KP.eps}`, 1]],
}));
Q('n_icr', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: ICR.ratio, unit: 'times',
  stem: `The imagined Malwa Textiles Ltd has earnings before interest and tax of ₹${inr(ICR.ebit)} and an interest charge of ₹${inr(ICR.interest)} a year. Calculate its interest coverage ratio.`,
  sol: `Interest coverage ratio = EBIT ÷ interest = ${inr(ICR.ebit)} ÷ ${inr(ICR.interest)} = ${ICR.ratio} times.`,
}));
Q('n_de', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: DE.ratio, unit: null,
  stem: `The imagined Narmada Cables Ltd has long-term debt of ₹${inr(DE.debt)} and shareholders' funds of ₹${inr(DE.equity)}. Calculate its debt-equity ratio.`,
  sol: `Debt-equity ratio = debt ÷ equity = ${inr(DE.debt)} ÷ ${inr(DE.equity)} = ${DE.ratio}.`,
}));
Q('n_roi', num({
  t: 4, d: 2, c: 'application', marks: 1, value: GL.roi, unit: '%',
  stem: `The imagined Ganga Logistics Ltd earns EBIT of ₹${inr(GL.ebit)} on total capital employed of ₹${inr(GL.capital)}. Calculate its return on investment (per cent). If it can borrow at 10 per cent, would more debt raise its EPS?`,
  sol: `Step 1: ROI = ${inr(GL.ebit)} ÷ ${inr(GL.capital)} × 100 = ${GL.roi} per cent.\nStep 2: ${GL.roi} per cent is more than the 10 per cent cost of debt, so trading on equity would raise EPS.`,
}));
Q('n_tm_eps', num({
  t: 4, d: 3, c: 'application', marks: 2, value: TM.B.eps, unit: '₹',
  stem: `The imagined Tapti Motors Ltd needs ₹${inr(TM.A.equity)}. Under Plan B it raises ₹${inr(TM.B.debt)} as debt at ${TM.B.rate * 100} per cent and the rest as equity shares of ₹10 each. EBIT is ₹${inr(TM.B.ebit)} and the tax rate is ${TM.B.tax * 100} per cent. Calculate the EPS under Plan B (in ₹).`,
  sol: `Step 1: Interest = ${inr(TM.B.debt)} × ${TM.B.rate} = ₹${inr(TM.B.interest)}; EBT = ${inr(TM.B.ebit)} − ${inr(TM.B.interest)} = ₹${inr(TM.B.ebt)}.\nStep 2: Tax = ₹${inr(TM.B.taxAmt)}; EAT = ₹${inr(TM.B.eat)}.\nStep 3: Shares = ${inr(TM.B.equity)} ÷ 10 = ${inr(TM.B.shares)}; EPS = ${inr(TM.B.eat)} ÷ ${inr(TM.B.shares)} = ₹${TM.B.eps}. (All-equity EPS would be ₹${TM.A.eps}.)`,
  scheme: [['Interest, EBT, tax and EAT', 1], [`EPS = ₹${TM.B.eps}`, 1]],
}));
Q('s_toe_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by trading on equity? When does it benefit the equity shareholders?',
  model: '**Trading on equity** means increasing the **proportion of debt** in the capital structure to raise the return to equity shareholders. It benefits them only when the **return on investment is higher than the rate of interest** on the debt.',
  sol: 'Meaning (more debt to raise EPS) and the condition (ROI above cost of debt).',
  scheme: [['Meaning', 1], ['Condition ROI greater than cost of debt', 1]],
}));
Q('s_financial_risk', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why an increase in debt increases the financial risk of a company.',
  model: 'Interest and repayment of debt are **fixed obligations** that must be met even when profits fall. More debt means larger fixed payments, so the chance of the company **failing to pay** (and facing legal action or even closure) rises; this is **financial risk**.',
  sol: 'Fixed obligation of debt plus the higher chance of default when debt rises.',
  scheme: [['Debt is a fixed obligation', 1], ['More debt, higher chance of default', 1]],
}));
Q('s3_cs_factors', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three factors that a finance manager should consider while deciding the capital structure of a company.',
  model: '1. **Cash flow position**: debt should be taken only if expected cash flows can pay interest and principal comfortably.\n2. **Return on investment**: if ROI is higher than the cost of debt, more debt (trading on equity) raises EPS.\n3. **Control**: issuing equity can **dilute** the control of existing owners; debt does not. (Also: interest coverage ratio, DSCR, cost of debt, tax rate, cost of equity, floatation costs, risk, flexibility, regulatory framework, stock market conditions.)',
  sol: 'Three factors, each with the direction in which it pushes the debt-equity mix.',
  scheme: [['Factor 1 explained', 1], ['Factor 2 explained', 1], ['Factor 3 explained', 1]],
}));
Q('s3_toe_plans', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined Tapti Motors Ltd can raise ₹${inr(TM.A.equity)} either wholly by equity (Plan A) or half by debt at 8 per cent (Plan B). With EBIT of ₹${inr(TM.A.ebit)} and tax at 20 per cent, Plan A gives an EPS of ₹${TM.A.eps} and Plan B ₹${TM.B.eps}. Which plan should the company choose, and why? What risk does the chosen plan carry?`,
  model: `**Plan B** should be chosen because its EPS (₹${TM.B.eps}) is higher than under Plan A (₹${TM.A.eps}). The company earns **10 per cent ROI** on its capital, more than the **8 per cent cost of debt**, so borrowed money earns a surplus for equity holders (**trading on equity**). **Risk:** the interest of ₹${inr(TM.B.interest)} is a **fixed obligation**; if EBIT falls below the interest cost, EPS under Plan B will fall faster than under Plan A.`,
  sol: 'Choice with the EPS comparison, the reason (ROI above cost of debt), and the financial risk.',
  scheme: [['Choice of Plan B with EPS comparison', 1], ['Reason: ROI 10 per cent greater than 8 per cent', 1], ['Risk of fixed interest', 1]],
}));
Q('l_cs_factors', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five factors affecting the choice of the capital structure of a company.',
  model: '1. **Cash flow position**: a company should borrow only if its cash flows can meet fixed payments of interest and principal along with its other cash needs.\n2. **Interest coverage ratio**: the more times EBIT covers interest, the more debt the firm can safely use.\n3. **Return on investment**: when ROI exceeds the cost of debt, trading on equity raises EPS, so more debt can be used.\n4. **Tax rate**: interest is tax-deductible, so a higher tax rate makes debt **cheaper** after tax.\n5. **Control**: equity issues may **dilute** the owners\' control, while debt does not. (Also: DSCR, cost of debt, cost of equity, floatation costs, risk, flexibility, regulatory framework, stock market conditions, other companies.)',
  sol: 'Five factors, each explained with its effect on the proportion of debt.',
  scheme: [['Factor 1 explained', 1], ['Factor 2 explained', 1], ['Factor 3 explained', 1], ['Factor 4 explained', 1], ['Factor 5 explained', 1]],
}));
Q('l_toe_work', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined Vindhya Solar Ltd needs ₹${inr(VS.A.equity)}. Plan A: all equity shares of ₹10. Plan B: ₹${inr(VS.B.debt)} debt at ${VS.B.rate * 100} per cent and the rest equity. EBIT is ₹${inr(VS.A.ebit)} and tax is ${VS.A.tax * 100} per cent. Calculate EPS under both plans and advise the company.`,
  model: `1. **Plan A:** interest nil; EBT = ₹${inr(VS.A.ebt)}; tax ₹${inr(VS.A.taxAmt)}; EAT ₹${inr(VS.A.eat)}; shares ${inr(VS.A.shares)}; **EPS = ₹${VS.A.eps}**.\n2. **Plan B:** interest = ₹${inr(VS.B.interest)}; EBT = ₹${inr(VS.B.ebt)}; tax ₹${inr(VS.B.taxAmt)}; EAT ₹${inr(VS.B.eat)}; shares ${inr(VS.B.shares)}; **EPS = ₹${VS.B.eps}**.\n3. **Why:** ROI = 18 per cent, more than the **12 per cent** cost of debt, so Plan B benefits from **trading on equity**.\n4. **Advice:** choose **Plan B** if the company\'s **cash flows** are steady enough to pay the fixed interest.\n5. **Caution:** Plan B raises **financial risk**; if EBIT falls sharply, EPS under Plan B will drop more than under Plan A.`,
  sol: 'Compute EAT and EPS for both plans, compare, give the reason (ROI greater than interest rate) and a balanced advice with the risk.',
  scheme: [['Plan A EPS', 1], ['Plan B EPS', 1], ['Comparison and reason (ROI greater than cost of debt)', 1], ['Advice', 1], ['Risk of Plan B', 1]],
}));

// ================================================================ t05 Fixed and working capital
Q('m_fixed_cap', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Fixed capital of a business refers to the funds invested in',
  opts: ['long-term assets such as land, buildings and machinery', 'raw materials and finished goods', 'cash at bank for daily expenses', 'amounts due from customers'],
  sol: 'Fixed capital is invested in long-term (fixed) assets. Raw materials, finished goods, cash and receivables are current assets financed by working capital.',
}));
Q('m_wc_meaning', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'Net working capital is the',
  opts: [
    'excess of current assets over current liabilities',
    'excess of fixed assets over long-term debt',
    'total of all assets of the business',
    'amount of share capital issued',
  ],
  sol: 'Net working capital = current assets − current liabilities. The other options mix up fixed assets, total assets and share capital.',
}));
Q('m_nature_fixed', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Which imagined business is likely to need the largest amount of fixed capital?',
  opts: [
    'A steel plant in Odisha with blast furnaces and rolling mills',
    'A small trading shop selling stationery in Patna',
    'A travel agency booking tickets online from a rented office',
    'A tuition centre run in a rented room',
  ],
  sol: 'Manufacturing with heavy machinery needs much more fixed capital; trading firms and service businesses in rented premises need little. This is the nature of business factor.',
}));
Q('m_wc_season', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined woollen-garment maker in Ludhiana needs much more working capital from July to November than in the rest of the year. Which factor explains this?',
  opts: ['Seasonal factors', 'Technology upgradation', 'Diversification of activities', 'Financing alternatives'],
  sol: 'Demand for woollens peaks before winter, so production, stock and credit sales all rise in those months; this is the seasonal factor. The other options are factors affecting fixed capital.',
}));
Q('m_credit_allowed', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined Chennai electronics wholesaler allows its customers 90 days to pay, while its own suppliers want payment in 15 days. What does this do to its working capital requirement?',
  opts: [
    'Increases it, because money is locked up in receivables while bills to suppliers must be paid quickly',
    'Reduces it, because it sells more on credit',
    'Has no effect on working capital',
    'Converts its working capital into fixed capital',
  ],
  sol: 'Liberal credit allowed (long receivables) together with little credit received (quick payment to suppliers) means more funds are tied up, so the working capital need rises.',
}));
Q('m_op_cycle', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Two imagined firms have the same sales. Firm X takes 20 days to turn cash into raw materials, goods and back into cash; Firm Y takes 120 days. Which statement is correct?',
  opts: [
    'Firm Y needs more working capital because its operating cycle is longer',
    'Firm X needs more working capital because its cycle is shorter',
    'Both need the same working capital because sales are equal',
    'Neither needs working capital because both make sales',
  ],
  sol: 'The longer the operating cycle, the longer funds stay locked in stock and receivables, so the working capital requirement is larger. Equal sales do not make the requirements equal.',
}));
Q('ar_fixed_long', ar({
  t: 5, d: 2, c: 'understanding', key: 'a',
  a: 'Fixed capital should normally be financed through long-term sources of funds.',
  r: 'Investment in fixed assets is recovered over many years, so the funds remain blocked for a long period.',
  sol: 'Both are true, and R explains A: since the money in fixed assets comes back slowly over their life, it must be financed by sources that do not have to be repaid soon.',
}));
Q('ar_wc_growth', ar({
  t: 5, d: 3, c: 'analysis', key: 'c',
  a: 'A business that is growing rapidly needs more working capital.',
  r: 'Growth of a business reduces its stocks and debtors.',
  sol: 'A is true: higher output and sales need more stock and more credit sales. R is false: growth increases stocks and debtors, which is why the working capital need rises.',
}));
Q('tf_wc_trade', tf({
  t: 5, d: 2, c: 'application', ans: false,
  stem: 'True or false? An imagined manufacturing firm that makes heavy machinery to order over eight months needs less working capital than a grocery shop with the same sales.',
  sol: 'A long production cycle locks funds in materials and work-in-progress for months, so the manufacturer needs more working capital, not less. A grocery turns stock over quickly.',
}));
Q('fb_fc_factor', fb({
  t: 5, d: 2, c: 'application',
  stem: 'A firm that leases its machinery instead of buying it needs less ___ capital.',
  acc: [['fixed']],
  sol: 'Leasing reduces the funds that must be invested in fixed assets, so less fixed capital is needed (the financing alternatives factor).',
}));
Q('ord_cycle', ord({
  t: 5, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the stages of the operating cycle of an imagined Kanpur shoe manufacturer in the correct order.',
  items: ['Cash is used to buy leather and soles', 'Raw materials are turned into finished shoes', 'Shoes are sold on credit to retailers', 'Retailers pay and cash comes back'],
  sol: 'Cash → raw materials → finished goods → debtors (credit sales) → cash. The time this takes is the operating cycle.',
}));
Q('mt_capital', match({
  t: 5, d: 2, c: 'application',
  stem: 'Match each situation in an imagined Ahmedabad dyeing unit with the factor it shows.',
  pairs: [
    ['It plans to start a printing division as well', 'Diversification (more fixed capital)'],
    ['It buys a machine that dyes twice as fast with less labour', 'Choice of technique (capital-intensive needs more fixed capital)'],
    ['Its customers are given 60 days of credit', 'Credit allowed (more working capital)'],
    ['Cloth takes three weeks to move from grey fabric to finished stock', 'Production cycle (working capital)'],
  ],
  sol: 'Diversification and a capital-intensive technique raise fixed capital needs; liberal credit and a long production cycle raise working capital needs.',
}));
Q('n_wc', num({
  t: 5, d: 2, c: 'understanding', marks: 1, value: WC.net, unit: '₹',
  stem: `The imagined Chilika Foods Ltd has current assets of ₹${inr(WC.ca)} and current liabilities of ₹${inr(WC.cl)}. Calculate its net working capital (in ₹).`,
  sol: `Net working capital = current assets − current liabilities = ${inr(WC.ca)} − ${inr(WC.cl)} = ₹${inr(WC.net)}.`,
}));
Q('s_fc_wc', short({
  t: 5, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between fixed capital and working capital on the basis of the assets they finance and the period of investment.',
  model: '**Fixed capital** finances **long-term assets** (land, building, machinery) and stays invested for **many years**. **Working capital** finances **current assets** (stock, debtors, cash) and is converted back into cash **within a year**, usually within one operating cycle.',
  sol: 'Assets financed and period, for both.',
  scheme: [['Fixed capital: long-term assets, long period', 1], ['Working capital: current assets, short period', 1]],
}));
Q('s_fc_imp', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why is management of fixed capital (the fixed capital decision) important for a business? Give three reasons.',
  model: '1. **Long-term growth**: the fixed assets chosen decide the business\'s **capacity, costs and earnings** for many years.\n2. **Large amounts**: these decisions commit **huge sums**, so an error is very costly.\n3. **Risk and irreversibility**: the investment is exposed to long-term risk and usually **cannot be reversed** without a big loss.',
  sol: 'Three of: long-term growth, large amount, risk, irreversibility.',
  scheme: [['Long-term growth', 1], ['Large amount of funds', 1], ['Risk or irreversibility', 1]],
}));
Q('s3_wc_factors', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three factors that affect the working capital requirement of a business.',
  model: '1. **Nature of business**: a trading firm needs less than a manufacturer, whose funds are locked in materials and work-in-progress.\n2. **Scale of operations**: larger output needs larger stocks and debtors, so more working capital.\n3. **Credit allowed**: generous credit to customers ties up funds in receivables. (Also: business cycle, seasonal factors, production cycle, credit availed, operating efficiency, availability of raw material, growth prospects, level of competition, inflation.)',
  sol: 'Three factors, each with the direction of its effect.',
  scheme: [['Factor 1 explained', 1], ['Factor 2 explained', 1], ['Factor 3 explained', 1]],
}));
Q('l_fc_factors', long({
  t: 5, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five factors that affect the requirement of fixed capital of a business.',
  model: '1. **Nature of business**: a manufacturing concern needs far more fixed assets than a trading or service firm.\n2. **Scale of operations**: a larger plant needs more land, buildings and machinery.\n3. **Choice of technique**: a **capital-intensive** method needs more fixed capital than a labour-intensive one.\n4. **Technology upgradation**: in industries where machines become **obsolete** quickly, fixed capital needs are higher.\n5. **Financing alternatives**: if **leasing** is available, less money need be spent on buying assets. (Also: growth prospects, diversification, level of collaboration.)',
  sol: 'Five factors, each with how it raises or lowers the need for fixed capital.',
  scheme: [['Factor 1 explained', 1], ['Factor 2 explained', 1], ['Factor 3 explained', 1], ['Factor 4 explained', 1], ['Factor 5 explained', 1]],
}));
Q('l_wc_factors', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined Moradabad brassware exporter makes goods to order, takes four months to finish each order, gives foreign buyers 90 days of credit and buys metal for cash. Analyse five factors that will make its working capital requirement high, and suggest one way to reduce it.',
  model: '1. **Nature of business**: it is a **manufacturer**, so funds are locked in metal, labour and work-in-progress.\n2. **Production cycle**: a **four-month** cycle keeps funds blocked for a long time.\n3. **Credit allowed**: **90 days** of credit to buyers ties up money in receivables.\n4. **Credit availed**: buying metal **for cash** means suppliers finance none of its stock.\n5. **Operating cycle**: adding production time and credit time gives a very long cycle, so the need is large.\n**Suggestion:** negotiate **credit from metal suppliers** or take **advance payment** with each order.',
  sol: 'Five case-based factors with reasons, plus a workable suggestion.',
  scheme: [['Nature of business', 1], ['Production cycle', 1], ['Credit allowed', 1], ['Credit availed', 1], ['Operating cycle and one suggestion', 1]],
}));

// ================================================================ case-based (4 marks)
Q('cb_vindhya', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of the imagined Vindhya Agro Foods Ltd and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: `**Vindhya Agro Foods Ltd, Jabalpur (imagined)**\n\nVindhya Agro Foods needs ₹${inr(VS.A.equity)} for a new flour mill. The finance manager, Ritu Saxena, notes that the company earns about 18 per cent on its capital, while banks will lend at 12 per cent. Interest is deductible before tax, and the company pays tax at 25 per cent. The promoters own most of the shares and do not want outsiders to gain a say in the company. Ritu also points out that the company's sales are steady through the year.`,
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the "return on investment" factor favouring debt.', model: '"the company earns about 18 per cent on its capital, while banks will lend at 12 per cent": ROI is above the cost of debt.', sol: 'ROI higher than the interest rate favours trading on equity.', scheme: [['Line and reason', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which factor affecting capital structure is shown by "The promoters own most of the shares and do not want outsiders to gain a say in the company"?', model: '**Control**: new equity would dilute the promoters\' control, so debt is preferred.', sol: 'Fear of dilution of voting power is the control factor.', scheme: [['Control', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other factors in the case that support more debt, quoting the lines.', model: '(1) **Tax rate**: "Interest is deductible before tax, and the company pays tax at 25 per cent." (2) **Cash flow position**: "the company\'s sales are steady through the year", so fixed interest can be paid.', sol: 'Tax deductibility of interest, and steady cash flows.', scheme: [['Tax rate with line', 1], ['Cash flow position with line', 1]] }), [
      num({ t: 4, d: 3, c: 'application', marks: 2, value: VS.B.eps, tol: 0.01, unit: '₹', stem: `**Or** (ii): If the mill is financed with ₹${inr(VS.B.debt)} of debt at 12 per cent and the rest by equity shares of ₹10, and EBIT is ₹${inr(VS.B.ebit)}, calculate the EPS (in ₹).`, sol: `Step 1: Interest = ₹${inr(VS.B.interest)}; EBT = ${inr(VS.B.ebit)} − ${inr(VS.B.interest)} = ₹${inr(VS.B.ebt)}.\nStep 2: Tax at 25 per cent = ₹${inr(VS.B.taxAmt)}; EAT = ₹${inr(VS.B.eat)}.\nStep 3: EPS = ${inr(VS.B.eat)} ÷ ${inr(VS.B.shares)} = 2.025, that is about ₹${VS.B.eps} (₹2.02 or ₹2.03 accepted).`, scheme: [['EAT', 1], [`EPS = ₹${VS.B.eps}`, 1]] }),
    ]),
  ],
}));
Q('cb_saurashtra', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of the imagined Saurashtra Salt Works Ltd and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Saurashtra Salt Works Ltd, Bhavnagar (imagined)**\n\nAt its annual meeting the board took three decisions. First, it approved a new refinery after studying the cash it would bring in over twelve years and the risk of a fall in salt prices. Second, it agreed to pay for the refinery partly with a term loan and partly with retained profit, since a share issue would cost a lot in fees. Third, it declared a smaller dividend than last year because much of the profit was needed for the refinery, although the company\'s earnings had been stable for a decade.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the financial decision described first, and the factor it considered.', model: '**Investment (capital budgeting) decision**, considering the **cash flows of the project** (and the risk).', sol: 'Approving a long-term project after studying its cash flows.', scheme: [['Decision and factor', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which factor of the financing decision is shown by "since a share issue would cost a lot in fees"?', model: '**Floatation cost**: the expense of raising funds through a share issue.', sol: 'Fees for issuing shares are floatation costs.', scheme: [['Floatation cost', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two factors of the dividend decision in the case, quoting the lines.', model: '(1) **Growth opportunities**: "much of the profit was needed for the refinery". (2) **Stability of earnings**: "the company\'s earnings had been stable for a decade", which would normally support a regular dividend.', sol: 'Growth needs (lower dividend) and stable earnings (supports dividend).', scheme: [['Growth opportunities with line', 1], ['Stability of earnings with line', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the board right to cut the dividend? Give one argument for and one against.', model: '**For:** using retained profit avoids costly borrowing or floatation, so the refinery can raise **future earnings** and the share price. **Against:** shareholders who rely on regular income may be **unhappy**, and the market may read the cut as bad news, lowering the **share price**.', sol: 'A balanced view: one benefit of retention, one cost of cutting the dividend.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
Q('cb_brahmaputra', caseQ({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case of the imagined Brahmaputra Bamboo Crafts and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Brahmaputra Bamboo Crafts, Guwahati (imagined)**\n\nThe firm makes bamboo furniture by hand in a rented shed, so it owns almost no machinery. Orders rise sharply before Diwali and the wedding season, when it must buy extra bamboo and hire more artisans. Big hotel buyers pay only after 60 days, while bamboo suppliers insist on cash. The owner, Pranjal Bora, is now thinking of buying a computer-controlled cutting machine and taking a bigger factory to supply a national furniture chain.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Why does the firm need little fixed capital at present? Quote the line.', model: '"makes bamboo furniture by hand in a rented shed, so it owns almost no machinery": a **labour-intensive technique** and rented premises need little fixed capital.', sol: 'Hand work and a rented shed mean few fixed assets.', scheme: [['Line with reason', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Name the working capital factor shown by "Orders rise sharply before Diwali and the wedding season".', model: '**Seasonal factors**: working capital needs rise in the peak season.', sol: 'Peak demand in certain months is a seasonal factor.', scheme: [['Seasonal factors', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other factors in the case that raise its working capital requirement, quoting the lines.', model: '(1) **Credit allowed**: "Big hotel buyers pay only after 60 days." (2) **Credit availed**: "bamboo suppliers insist on cash", so no supplier credit reduces the need.', sol: 'Long credit to buyers and no credit from suppliers.', scheme: [['Credit allowed with line', 1], ['Credit availed with line', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How will Pranjal\'s expansion plan affect the firm\'s fixed capital requirement? Name two factors involved.', model: 'Fixed capital needs will **rise**. (1) **Choice of technique**: a computer-controlled machine is **capital-intensive**. (2) **Scale of operations / growth prospects**: a bigger factory to supply a national chain means larger fixed assets.', sol: 'Direction (rise) and two fixed-capital factors from the plan.', scheme: [['Choice of technique', 1], ['Scale of operations or growth prospects', 1]] }),
    ]),
  ],
}));
Q('cb_konkan', caseQ({
  t: [3, 1], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case of the imagined Konkan Cashew Processors Ltd and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Konkan Cashew Processors Ltd, Ratnagiri (imagined)**\n\nLast year the company bought raw cashew in bulk in March but had not arranged the money in advance, so it paid a moneylender 2 per cent a month for three months. This year the finance team prepared a five-year plan and a one-year budget that showed, month by month, how much money would be needed and from where. They also kept a back-up credit line ready in case the crop failed and prices jumped. The managing director told the board that every decision would now be judged by whether it raised the value of the shareholders\' investment.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which function of financial management did the company neglect last year? Quote the line.', model: '**Financial planning**: "had not arranged the money in advance, so it paid a moneylender 2 per cent a month".', sol: 'Not forecasting the March need is a failure of financial planning.', scheme: [['Function with line', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'State the objective of financial management mentioned by the managing director.', model: '**Wealth maximisation**: maximising the **market value of the equity shares**.', sol: 'Raising the value of shareholders\' investment.', scheme: [['Wealth maximisation', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two points of importance of financial planning shown this year, quoting the lines.', model: '(1) **Ensures funds when required / links present and future**: "a five-year plan and a one-year budget that showed, month by month, how much money would be needed and from where." (2) **Helps face shocks**: "kept a back-up credit line ready in case the crop failed and prices jumped."', sol: 'Planned availability of funds and preparedness for surprises.', scheme: [['First point with line', 1], ['Second point with line', 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State the two objectives of financial planning, and say which one the company failed last year.', model: 'Objectives: (1) to **ensure availability of funds whenever required**; (2) to see that the firm **does not raise resources unnecessarily**. Last year it failed the **first**, so it had to borrow at a high cost.', sol: 'Both objectives, and the first one was missed.', scheme: [['Both objectives', 1], ['Failed objective identified', 1]] }),
    ]),
  ],
}));
Q('cb_dhauladhar', caseQ({
  t: [4, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the figures of the imagined Dhauladhar Apples Ltd and answer the questions that follow. *(Imagined business and figures written by SOYL for practice.)*',
  passage: `**Dhauladhar Apples Ltd, Shimla (imagined)**\n\nThe company has total capital of ₹${inr(TOE.capital)}. In a good year its EBIT is ₹${inr(TOE.good.A.ebit)}; after a hailstorm its EBIT fell to ₹${inr(TOE.bad.A.ebit)}. It is choosing between Plan A (all equity) and Plan B (half the capital as a 10 per cent loan). Tax is 30 per cent. Its cash flows depend on the apple harvest each autumn.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'understanding', marks: 1, value: ROI_GOOD, unit: '%', stem: 'Calculate the return on investment in a good year (per cent).', sol: `ROI = ${inr(TOE.good.A.ebit)} ÷ ${inr(TOE.capital)} × 100 = ${ROI_GOOD} per cent.` })),
    child('b', num({ t: 4, d: 2, c: 'understanding', marks: 1, value: ROI_BAD, unit: '%', stem: 'Calculate the return on investment after the hailstorm (per cent).', sol: `ROI = ${inr(TOE.bad.A.ebit)} ÷ ${inr(TOE.capital)} × 100 = ${ROI_BAD} per cent.` })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Using these returns, explain whether Plan B is a good idea for this company.', model: `In a good year ROI (${ROI_GOOD} per cent) is above the 10 per cent interest, so Plan B raises EPS (trading on equity). After the hailstorm ROI (${ROI_BAD} per cent) is below 10 per cent, so Plan B would **reduce** EPS. With **uncertain, harvest-based cash flows**, heavy debt is risky; a smaller loan is safer.`, sol: 'Compare both ROIs with the interest rate and judge the risk of uncertain cash flows.', scheme: [['Both situations compared with cost of debt', 1], ['Judgement with reason (risky cash flows)', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the financial decision the company is taking, and two factors of that decision visible in the case.', model: 'It is the **financing decision**. Factors: (1) **risk**: debt is riskier when earnings swing with the harvest; (2) **cash flow position**: cash comes in mainly **each autumn**, which may not suit fixed interest payments.', sol: 'Financing decision with two of its factors from the case.', scheme: [['Financing decision', 1], ['Two factors', 1]] }),
    ]),
  ],
}));
