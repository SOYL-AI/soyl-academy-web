// ISC 12 Commerce, ch02 Business Finance, Financial Planning and Capital — question bank. Every firm, person,
// figure and situation is imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration
// or exercise and no CISCE specimen or board item is reused (D-036). Firms, places and figures differ from the
// CBSE 12 Business Studies chapter on financial management.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child, num } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];
export const inr = (n) => Number(n).toLocaleString('en-IN');

// Godavari Glassworks Ltd (imagined): two financing plans for ₹40 lakh.
const plan = (ebit, debt, rate, shares, tax) => {
  const interest = debt * rate;
  const ebt = ebit - interest;
  const taxAmt = ebt * tax;
  const eat = ebt - taxAmt;
  return { ebit, debt, rate, shares, interest, ebt, taxAmt, eat, eps: Math.round((eat / shares) * 10000) / 10000 };
};
export const GG = {
  need: 4000000, tax: 0.25,
  A: plan(800000, 0, 0.1, 400000, 0.25),
  B: plan(800000, 2000000, 0.1, 200000, 0.25),
  A2: plan(300000, 0, 0.1, 400000, 0.25),
  B2: plan(300000, 2000000, 0.1, 200000, 0.25),
};
if (GG.A.eps !== 1.5 || GG.B.eps !== 2.25 || GG.A2.eps !== 0.5625 || GG.B2.eps !== 0.375) throw new Error('GG EPS');
// Ujjain Utensils (imagined): working capital.
export const UU = { stock: 420000, debtors: 310000, cash: 210000, creditors: 390000, wages: 170000 };
UU.ca = UU.stock + UU.debtors + UU.cash;
UU.cl = UU.creditors + UU.wages;
UU.net = UU.ca - UU.cl;
if (UU.ca !== 940000 || UU.net !== 380000) throw new Error('UU');

// ================================================================ t01 Importance of finance; sources by form of business
Q('m_fin_life', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Finance is often called the **lifeblood** of business because',
  opts: [
    'every activity, from buying inputs to paying wages and expanding, needs funds at the right time',
    'only banks can run a business successfully',
    'a business with more money never makes a loss',
    'finance is needed only when a business is closed down',
  ],
  sol: 'Just as blood keeps every part of the body working, funds keep every activity of a business going: starting, running and growing.',
}));
Q('m_fin_purpose', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Doon Diagnostics, an imagined pathology lab in Dehradun, raises ₹60 lakh to replace its old blood analysers with faster automated ones. This use of finance is best described as finance for',
  opts: ['modernisation of fixed assets', 'meeting day-to-day expenses', 'paying the annual dividend', 'meeting a sudden contingency'],
  sol: 'Replacing old equipment with better equipment is modernisation, a long-term use of funds in fixed assets.',
}));
Q('m_sole_source', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meenakshi runs Bhimtal Bakery, an imagined sole proprietorship in Nainital. Which of the following sources of finance is **not** open to her?',
  opts: ['Issue of equity shares to the public', 'Her own savings', 'A loan from a local bank against her shop', 'Credit from the flour supplier'],
  sol: 'A sole trader cannot issue shares; shares are issued only by companies. Personal savings, bank loans and trade credit are all open to her.',
}));
Q('m_partner_source', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The three partners of Teesta Travels, an imagined tour operator in Siliguri, need ₹15 lakh more for two new buses but do not want any interest burden. The most suitable step for them is to',
  opts: ['admit a new partner who brings in capital', 'issue debentures', 'take a bank loan', 'accept public deposits'],
  sol: 'A new partner brings capital that carries no interest. Debentures and public deposits are company sources, and a bank loan carries interest.',
}));
Q('m_company_only', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Consider these sources of finance:\nP. Issue of debentures\nQ. Owner\'s personal savings\nR. Public issue of equity shares\nS. Credit from suppliers\nWhich of them are open **only** to a joint stock company?',
  opts: ['P and R', 'Q and S', 'P, R and S', 'Q and R'],
  sol: 'Debentures and public issues of shares are company sources. Trade credit is open to every form of business, and personal savings belong to sole traders and partners.',
}));
Q('ar_sole_limited', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'A sole trader usually finds it hard to raise a large amount of capital.',
  r: 'The funds of a sole trader are limited to the owner\'s savings and what can be borrowed on the owner\'s personal credit.',
  key: 'a',
  sol: 'Both are true, and the narrow base of owner\'s savings and personal credit is exactly why large amounts are hard to raise.',
}));
Q('tf_fin_start', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'A business needs finance only at the time it is started; after that its sales pay for everything.',
  ans: false,
  sol: 'False. Finance is needed throughout: to start, to run day-to-day operations, to expand or modernise, and to meet sudden needs.',
}));
Q('fb_owner_funds', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Partnership firm : Partners\' capital :: Joint stock company : ___',
  acc: [['Share capital', 'shares', 'equity share capital', 'Shareholders\' funds']],
  sol: 'Owners of a partnership contribute partners\' capital; owners of a company contribute share capital.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each source of finance with the form of business for which it is **typical**.',
  pairs: [
    ['Savings of the single owner', 'Sole proprietorship'],
    ['Admitting a new member who brings capital', 'Partnership'],
    ['Issue of secured debentures', 'Joint stock company'],
    ['Credit allowed by suppliers', 'Every form of business'],
  ],
  sol: 'Owner\'s savings belong to the sole trader, a new partner to the partnership, and debentures to companies; trade credit is open to all.',
}));
Q('s_fin_importance', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Thar Solar Parks Ltd, an imagined company in Jodhpur, plans to build a solar farm, run it for twenty years and add battery storage later. Explain two reasons why it needs finance, using its plans.',
  model: '1. **To start the business:** it must buy **land, panels and inverters** before it earns anything.\n2. **To expand and modernise:** adding **battery storage** later will need fresh funds for new fixed assets.',
  sol: 'Two needs (starting, running, expanding or modernising, contingencies) linked to the solar firm.',
  scheme: [['First need linked to the case', 1], ['Second need linked to the case', 1]],
}));
Q('s_sources_sole', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Meenakshi wants ₹4 lakh to add a second oven at Bhimtal Bakery, her imagined sole proprietorship. Suggest two suitable sources of finance and say why each suits her.',
  model: '1. **Her own savings:** no interest and **no loss of control**; the bakery stays fully hers.\n2. **A bank term loan** against the shop: the oven is a **long-term asset**, and she can repay from extra sales over a few years.',
  sol: 'Two sources open to a sole trader (own savings, loans from relatives or friends, bank loan, trade credit, ploughed-back profit), each justified.',
  scheme: [['First source with reason', 1], ['Second source with reason', 1]],
}));
Q('s3_sources_compare', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the sources of finance open to Bhimtal Bakery (an imagined sole proprietorship) and Lonar Lenses Ltd (an imagined public company making spectacle lenses) on three points.',
  model: '1. **Owners\' funds:** the bakery relies on **one owner\'s savings**; Lonar Lenses can raise **share capital** from thousands of investors.\n2. **Borrowed funds:** the bakery borrows on the owner\'s **personal credit**; the company can issue **debentures** and take large term loans.\n3. **Size of funds:** the bakery can raise only **small amounts**; the company can raise **very large** amounts.',
  sol: 'Three points of comparison (owners\' funds, borrowing, scale, cost or access to markets), each contrasting the two firms.',
  scheme: [['First point compared', 1], ['Second point compared', 1], ['Third point compared', 1]],
}));
Q('s3_partnership', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Teesta Travels, an imagined three-partner tour firm in Siliguri, needs funds for buses, a booking office and fuel. Explain three sources of finance open to it and how each could help.',
  model: '1. **Partners\' own capital:** each partner can bring **more capital** for the buses, with no interest cost.\n2. **Admitting a new partner:** a new partner brings **fresh capital** and perhaps skills, such as hotel contacts.\n3. **Bank loans and trade credit:** a **bank loan** can finance the booking office, and **credit from the fuel pump** eases day-to-day cash.',
  sol: 'Three partnership sources (partners\' capital, new partner, partners\' loans, bank loans, trade credit, retained profit), each linked to a need of the firm.',
  scheme: [['First source with use', 1], ['Second source with use', 1], ['Third source with use', 1]],
}));
Q('l_finance', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Lonar Lenses Ltd is an imagined public company in Aurangabad that makes spectacle lenses.\n(a) Explain two reasons why it needs finance. [2]\n(b) Explain three sources of finance open to it that a sole trader cannot use. [3]',
  model: '(a) **To run day-to-day operations:** it must buy **glass blanks and coatings**, pay technicians and meet power bills before customers pay. **To expand:** setting up a **new grinding line** for contact lenses needs large funds in fixed assets.\n\n(b) **Equity shares:** it can sell shares to the public and raise **permanent capital** from thousands of investors. **Preference shares:** it can attract investors who want a **fixed dividend** and preference in repayment, without giving up voting control. **Debentures:** it can borrow large sums from the public at a **fixed rate of interest**, often secured on its plant. None of these is open to a sole trader, who has only the owner\'s savings and personal credit.',
  sol: 'Two needs applied to the lens maker; three company-only sources explained.',
  scheme: [['(a) Two needs linked to the case', 2], ['(b) Three company sources explained', 3]],
}));

// ================================================================ t02 Financial planning
Q('m_fp_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Financial planning means',
  opts: [
    'preparing a blueprint of a firm\'s future money needs: how much, when and from which sources',
    'keeping a record of every payment after it is made',
    'auditing the accounts at the end of the year',
    'deciding the selling price of each product',
  ],
  sol: 'Financial planning looks ahead: it estimates the funds needed, the timing and the sources, before the money is required.',
}));
Q('m_fp_shortage', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Konkan Cashew Processors, an imagined unit in Ratnagiri, must buy most of its raw nuts in the three harvest months. One year it had not arranged funds in advance and had to buy half its usual quantity. Which objective of financial planning did it fail to meet?',
  opts: ['Ensuring that funds are available when they are needed', 'Avoiding the raising of unnecessary funds', 'Maximising the dividend paid', 'Keeping the capital structure fully equity'],
  sol: 'The unit lacked money at the very time it was needed: financial planning aims to ensure funds are available at the right time.',
}));
Q('m_fp_surplus', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Shivalik Software, an imagined firm in Mohali, borrowed ₹3 crore at 11 per cent for a project that finally cost ₹1.8 crore. The balance lay unused for a year while interest kept running. Poor financial planning here led to',
  opts: ['raising more funds than needed, which added to cost', 'a shortage of funds for the project', 'the loss of control by the owners', 'a fall in the firm\'s fixed capital'],
  sol: 'Surplus funds earn little but still carry interest. Financial planning aims to avoid raising unnecessary funds.',
}));
Q('m_fp_flex', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The financial plan of Vembanad Houseboats, an imagined firm in Alappuzha, includes a standby bank limit that can be used if fuel or repair costs rise suddenly. Which feature of a sound financial plan does this show?',
  opts: ['Flexibility', 'Simplicity', 'Economy', 'Optimum use of funds'],
  sol: 'A plan that can be adjusted to meet unexpected changes is flexible.',
}));
Q('m_fp_pqrs', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of these are features of a **sound** financial plan?\nP. It is simple enough for managers to follow.\nQ. It is rigid and never changed once made.\nR. It looks ahead to future needs.\nS. It keeps enough liquid funds for current payments.',
  opts: ['P, R and S', 'P, Q and R', 'Q and S only', 'All four'],
  sol: 'Simplicity, foresight and liquidity are features of a sound plan; rigidity is not, because a good plan is flexible.',
}));
Q('ar_fp_control', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'A financial plan makes financial control easier.',
  r: 'The plan sets targets for raising and using funds, against which actual results can be compared.',
  key: 'a',
  sol: 'Both are true; because the plan provides targets, managers can compare actual figures with it and correct deviations.',
}));
Q('tf_fp_once', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Financial planning is done once, when the business is set up, and is never revised.',
  ans: false,
  sol: 'False. The plan is reviewed and revised as costs, sales and business conditions change.',
}));
Q('fb_fp_blueprint', fb({
  t: 2, d: 1, c: 'understanding',
  stem: 'Financial planning is the preparation of a financial ___ of the future operations of a business.',
  acc: [['blueprint', 'plan', 'outline']],
  sol: 'It is a financial blueprint: an outline of how much money will be needed, when, and from where.',
}));
Q('s_fp_features', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Pench Paper Mills, an imagined mill near Nagpur, plans its finance for the next five years, including a new pulping unit, and chooses the cheapest suitable sources. Name and explain the two features of a sound financial plan shown here.',
  model: '1. **Foresight (long-term view):** the mill looks **five years ahead** and includes the **new pulping unit** in its plan.\n2. **Economy:** it chooses the **cheapest suitable sources**, keeping the cost of raising funds low.',
  sol: 'Foresight and economy, each linked to the mill.',
  scheme: [['Foresight with link', 1], ['Economy with link', 1]],
}));
Q('s3_fp_importance', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Nilgiri Knitwear, an imagined sweater maker in Ooty, sells most of its output from October to January. Explain three ways in which financial planning would help it.',
  model: '1. **Funds at the right time:** it can arrange money **before** the winter rush to buy wool and pay extra workers.\n2. **No idle funds:** after January it can repay short-term loans instead of keeping **surplus cash** that costs interest.\n3. **Basis for control:** monthly targets let managers **compare** actual spending and sales with the plan and act early.',
  sol: 'Three benefits (timely funds, avoiding surplus, linking investment and financing, control, reducing waste, preparing for shocks) applied to the seasonal firm.',
  scheme: [['First benefit applied', 1], ['Second benefit applied', 1], ['Third benefit applied', 1]],
}));
Q('s3_fp_case', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The financial plan of Vembanad Houseboats (imagined) runs to 90 pages of complex tables, ignores the monsoon off-season and keeps no cash for wages in lean months. Identify three features of a sound plan that are missing and explain each.',
  model: '1. **Simplicity:** a 90-page plan of **complex tables** is hard for managers to follow; a sound plan is clear.\n2. **Foresight:** it **ignores the monsoon** off-season, so it fails to look ahead at a known change.\n3. **Liquidity:** it keeps **no cash for wages** in lean months; a sound plan keeps enough liquid funds.',
  sol: 'Simplicity, foresight and liquidity identified from the case, each explained.',
  scheme: [['Simplicity', 1], ['Foresight', 1], ['Liquidity', 1]],
}));
Q('l_fp', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Konkan Cashew Processors (imagined) buys raw nuts in three harvest months, processes them over the year and exports in two shipments.\n(a) What is meant by financial planning? [1]\n(b) Explain two features of a sound financial plan. [2]\n(c) Explain two ways in which financial planning would help this unit. [2]',
  model: '(a) **Financial planning** is preparing a **financial blueprint** of future operations: estimating **how much** money is needed, **when**, and from **which sources**.\n\n(b) **Flexibility:** the plan can be **adjusted** if nut prices or freight rates change suddenly. **Liquidity:** it keeps enough **cash** to pay workers and bills while the export money is awaited.\n\n(c) **Funds when needed:** the unit can arrange a **seasonal loan before the harvest**, so it buys its full quantity of nuts. **Avoids idle funds:** after the export payments arrive, it can **repay** the loan instead of holding surplus cash that costs interest. The plan also gives monthly targets that managers can use for control.',
  sol: 'Meaning; two features; two benefits applied to the cashew unit.',
  scheme: [['(a) Meaning', 1], ['(b) Two features', 2], ['(c) Two benefits applied', 2]],
}));

// ================================================================ t03 Capital structure
Q('m_cs_meaning', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'The capital structure of a company refers to',
  opts: [
    'the mix of owners\' funds (equity) and borrowed funds (debt) in its long-term finance',
    'the layout of its factory buildings',
    'the list of its fixed assets',
    'the number of its employees in each department',
  ],
  sol: 'Capital structure is the proportion of debt and equity used to finance the business.',
}));
Q('m_cs_control', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The founders of Pamba Pharma Ltd, an imagined drug maker in Kottayam, hold 52 per cent of its shares and fear losing control. To raise ₹20 crore, they are most likely to prefer',
  opts: ['debentures or a term loan', 'a fresh public issue of equity shares', 'a rights issue that they cannot subscribe to', 'sweat equity to outsiders'],
  sol: 'Debt holders have no voting rights, so borrowing keeps the founders\' control intact; new equity would dilute it.',
}));
Q('m_cs_cashflow', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kaziranga Eco Lodges, an imagined resort company in Assam, earns almost all its income between November and April and very little in the flood season. When choosing its capital structure it should be cautious about',
  opts: ['large debt with fixed monthly interest', 'issuing equity shares', 'retaining profits', 'keeping some funds in reserve'],
  sol: 'Interest must be paid every period whatever the earnings; uneven cash flows make heavy debt risky.',
}));
Q('m_cs_tax', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Why is debt usually a cheaper source of long-term funds than equity for a profitable company?',
  opts: [
    'Interest on debt is a tax-deductible expense, while dividends are paid out of profit after tax',
    'Debt holders share in the profits of the company',
    'Debt never has to be repaid',
    'Equity shareholders always receive a fixed dividend',
  ],
  sol: 'Interest reduces taxable profit, so the effective cost of debt falls; dividends give no such tax saving.',
}));
Q('m_cs_flex', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Tunga Tractors Ltd, an imagined company in Shivamogga, could borrow more today but chooses to keep part of its borrowing capacity unused so that it can raise loans quickly if a good opportunity arises. Which factor of capital structure is it considering?',
  opts: ['Flexibility', 'Control', 'Cost of equity', 'Floatation cost'],
  sol: 'Keeping borrowing power in reserve allows the firm to raise funds quickly later: flexibility.',
}));
Q('m_toe', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Trading on equity raises the earnings per share only when',
  opts: ['the return on investment is higher than the rate of interest on debt', 'the rate of interest is higher than the return on investment', 'the company has no debt', 'the tax rate is zero'],
  sol: 'Borrowed money adds to EPS only if it earns more than it costs; otherwise EPS falls.',
}));
Q('ar_cs_risk', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'For a profitable company, debt is generally a cheaper source of finance than equity.',
  r: 'Interest on debt is not allowed as a deduction while computing taxable profit.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: interest is a deductible expense, which is one reason debt is cheaper.',
}));
Q('ar_toe', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Trading on equity always increases the earnings per share.',
  r: 'Interest on debt has to be paid only in years when the company earns a profit.',
  key: 'd',
  sol: 'Both are false. Trading on equity raises EPS only when the return on investment exceeds the interest rate, and interest is a fixed charge payable even in a loss year.',
}));
Q('tf_cs_risk', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'A higher proportion of debt in the capital structure increases the financial risk of a company.',
  ans: true,
  sol: 'True. More debt means larger fixed interest and repayment obligations, which raise the chance of default if earnings fall.',
}));
Q('fb_cs', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Equity shares : Owners\' funds :: Debentures : ___',
  acc: [['Borrowed funds', 'borrowed capital', 'debt', 'Debt capital']],
  sol: 'Equity shares represent owners\' funds; debentures represent borrowed funds (debt).',
}));
Q('n_eps_a', num({
  t: 3, d: 2, c: 'application', marks: 1, value: GG.A.eps, unit: '₹',
  stem: `Godavari Glassworks Ltd, an imagined company in Rajahmundry, needs ₹${inr(GG.need)}. Under Plan A it issues ${inr(GG.A.shares)} equity shares of ₹10 each and borrows nothing. Its expected earnings before interest and tax are ₹${inr(GG.A.ebit)} and the tax rate is ${GG.tax * 100} per cent. Calculate its earnings per share under Plan A (in ₹).`,
  sol: `Step 1: No debt, so interest = 0 and EBT = ₹${inr(GG.A.ebt)}.\nStep 2: Tax = ${GG.tax * 100} per cent of ${inr(GG.A.ebt)} = ₹${inr(GG.A.taxAmt)}; EAT = ₹${inr(GG.A.eat)}.\nStep 3: EPS = ${inr(GG.A.eat)} ÷ ${inr(GG.A.shares)} = ₹${GG.A.eps}.`,
}));
Q('n_eps_b', num({
  t: 3, d: 3, c: 'application', marks: 2, value: GG.B.eps, unit: '₹',
  stem: `Under Plan B, Godavari Glassworks Ltd (imagined) raises the same ₹${inr(GG.need)} as ₹${inr(GG.B.debt)} of debentures at ${GG.B.rate * 100} per cent interest and ${inr(GG.B.shares)} equity shares of ₹10 each. With the same EBIT of ₹${inr(GG.B.ebit)} and tax at ${GG.tax * 100} per cent, calculate its earnings per share under Plan B (in ₹).`,
  sol: `Step 1: Interest = ${inr(GG.B.debt)} × ${GG.B.rate} = ₹${inr(GG.B.interest)}.\nStep 2: EBT = ${inr(GG.B.ebit)} − ${inr(GG.B.interest)} = ₹${inr(GG.B.ebt)}.\nStep 3: Tax = ₹${inr(GG.B.taxAmt)}; EAT = ₹${inr(GG.B.eat)}.\nStep 4: EPS = ${inr(GG.B.eat)} ÷ ${inr(GG.B.shares)} = ₹${GG.B.eps}.`,
  scheme: [['Interest, EBT and tax correct', 1], [`EPS = ₹${GG.B.eps}`, 1]],
}));
Q('s_toe_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Godavari Glassworks Ltd (imagined) earns 20 per cent on its capital and can borrow at 10 per cent. What is trading on equity, and should it use more debt?',
  model: '**Trading on equity** means using **fixed-cost debt** along with equity to **raise earnings per share**. Yes: its **return (20 per cent) exceeds the interest rate (10 per cent)**, so each borrowed rupee earns more than it costs.',
  sol: 'Meaning, and the condition ROI > interest rate applied.',
  scheme: [['Meaning', 1], ['Condition applied to the firm', 1]],
}));
Q('s_cs_two', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Pamba Pharma Ltd (imagined) has steady cash flows from its long-selling cough syrup, and its founders want to keep control. Explain two factors that favour more debt in its capital structure.',
  model: '1. **Cash flow position:** **steady cash** from the cough syrup means it can meet **fixed interest** and repayments safely.\n2. **Control:** debenture holders get **no voting rights**, so borrowing keeps the founders\' **control** intact.',
  sol: 'Cash flow and control, each linked to the company.',
  scheme: [['Cash flow with link', 1], ['Control with link', 1]],
}));
Q('s3_cs_factors', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Tunga Tractors Ltd (imagined) is choosing between debt and equity. Its sales swing with the monsoon, share prices are currently depressed, and the corporate tax rate has just risen. Explain how each of these three facts affects its capital structure decision.',
  model: '1. **Uneven cash flow:** sales that swing with the monsoon make **fixed interest risky**, which argues for **less debt**.\n2. **Stock-market conditions:** with **depressed share prices**, a new equity issue would raise little, so **debt** looks more practical now.\n3. **Tax rate:** a **higher tax rate** increases the tax saving on interest, making **debt cheaper**.',
  sol: 'Each fact linked to its factor (cash flow, market conditions, tax) and its effect on the debt–equity choice.',
  scheme: [['Cash flow', 1], ['Market conditions', 1], ['Tax rate', 1]],
}));
Q('s3_toe_calc', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Suppose the EBIT of Godavari Glassworks Ltd (imagined) falls to ₹${inr(GG.A2.ebit)}. Using its two plans (Plan A: ${inr(GG.A2.shares)} shares, no debt; Plan B: ${inr(GG.B2.shares)} shares and ₹${inr(GG.B2.debt)} debt at ${GG.B2.rate * 100} per cent; tax ${GG.tax * 100} per cent), calculate EPS under each plan and explain the result.`,
  model: `**Plan A:** EAT = 3,00,000 − 75,000 = **₹${inr(GG.A2.eat)}**; EPS = **₹${GG.A2.eps}**.\n**Plan B:** EBT = 3,00,000 − 2,00,000 = ₹${inr(GG.B2.ebt)}; EAT = **₹${inr(GG.B2.eat)}**; EPS = **₹${GG.B2.eps}**.\nNow the **return (7.5 per cent) is below the 10 per cent interest**, so debt **lowers** EPS: trading on equity works against shareholders.`,
  sol: `Plan A EPS ₹${GG.A2.eps}; Plan B EPS ₹${GG.B2.eps}; ROI below interest rate, so debt reduces EPS.`,
  scheme: [['Plan A EPS', 1], ['Plan B EPS', 1], ['Explanation using ROI and interest rate', 1]],
}));
Q('l_cs', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Godavari Glassworks Ltd (imagined) needs ₹${inr(GG.need)}. Plan A: ${inr(GG.A.shares)} equity shares of ₹10. Plan B: ${inr(GG.B.shares)} equity shares of ₹10 and ₹${inr(GG.B.debt)} debentures at ${GG.B.rate * 100} per cent. Expected EBIT is ₹${inr(GG.A.ebit)}; tax is ${GG.tax * 100} per cent. Its glass sales are steady and the promoters own most of the shares.\n(a) Calculate EPS under both plans. [2]\n(b) Recommend a plan, giving three reasons from the facts. [3]`,
  model: `(a) **Plan A:** EBT ₹8,00,000; tax ₹2,00,000; EAT ₹${inr(GG.A.eat)}; **EPS = ₹${GG.A.eps}**.\n**Plan B:** interest ₹${inr(GG.B.interest)}; EBT ₹${inr(GG.B.ebt)}; tax ₹${inr(GG.B.taxAmt)}; EAT ₹${inr(GG.B.eat)}; **EPS = ₹${GG.B.eps}**.\n\n(b) **Plan B is recommended.**\n1. **Trading on equity:** the return on capital is **20 per cent**, double the **10 per cent** interest, so debt **raises EPS** from ₹1.5 to ₹2.25.\n2. **Steady cash flow:** steady glass sales mean the company can pay the **fixed interest** of ₹2 lakh every year without strain.\n3. **Control:** debenture holders have **no voting rights**, so the promoters keep control, while Plan A would bring in twice as many new shareholders.\nThe firm should still watch its risk if EBIT ever falls below ₹4 lakh, where the two plans give equal EPS.`,
  sol: `EPS ₹${GG.A.eps} (A) and ₹${GG.B.eps} (B); Plan B justified by trading on equity, cash flow and control. At EBIT ₹4,00,000 both plans give EPS ₹0.75.`,
  scheme: [['(a) EPS under Plan A', 1], ['(a) EPS under Plan B', 1], ['(b) Recommendation with three reasons from the facts', 3]],
}));

// ================================================================ t04 Fixed capital
Q('m_fc_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Fixed capital refers to the funds a business invests in',
  opts: ['long-term assets such as land, buildings, machinery and vehicles', 'raw materials and finished goods', 'cash kept for paying wages', 'amounts due from customers'],
  sol: 'Fixed capital is invested in assets held for many years, not in assets turned into cash within a year.',
}));
Q('m_fc_nature', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which of these imagined businesses will need the **largest** proportion of fixed capital?',
  opts: ['A company building and running a cable-car line in the hills', 'A stationery shop near a college', 'A travel agent who books tickets online', 'A fruit-juice stall at a bus stand'],
  sol: 'A cable-car line needs towers, cables, cabins and stations before it earns anything: very heavy fixed assets.',
}));
Q('m_fc_technique', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Two imagined soap makers produce the same output. One uses a fully automatic plant; the other uses hand moulds and more workers. The automatic plant needs more fixed capital because of',
  opts: ['the choice of a capital-intensive technique', 'the level of collaboration', 'a shorter operating cycle', 'liberal credit to customers'],
  sol: 'A capital-intensive technique relies on machines, so it needs more fixed capital than a labour-intensive one.',
}));
Q('m_fc_lease', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Instead of buying a ₹2 crore scanner, Doon Diagnostics (imagined) takes it on a five-year lease and pays monthly rent. The effect on its fixed capital requirement is that it',
  opts: ['falls, because a financing alternative replaces outright purchase', 'rises, because rent must be paid', 'is unchanged, because the scanner is still used', 'turns into working capital permanently'],
  sol: 'Leasing is a financing alternative that lets a firm use an asset without buying it, so less fixed capital is needed.',
}));
Q('m_fc_collab', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Three imagined dairy cooperatives in a district share one chilling plant instead of building one each. Which factor of fixed capital requirement does this show?',
  opts: ['Level of collaboration', 'Diversification', 'Growth prospects', 'Technology upgradation'],
  sol: 'Sharing facilities with other firms reduces each firm\'s fixed capital: level of collaboration.',
}));
Q('tf_fc_growth', tf({
  t: 4, d: 2, c: 'understanding',
  stem: 'Lonar Lenses Ltd (imagined) expects demand for its lenses to double in three years, so it builds a larger plant now. True or false: a firm with higher growth prospects generally needs more fixed capital.',
  ans: true,
  sol: 'True. Firms expecting growth build extra capacity in advance, which needs more fixed capital.',
}));
Q('s_fc_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Sabarmati Steel Tubes Ltd, an imagined Ahmedabad company, is a large-scale maker whose rolling mills must be replaced every few years with newer models. Explain two factors that raise its fixed capital needs.',
  model: '1. **Scale of operations:** a **large-scale** tube maker needs big mills, sheds and cranes, so more fixed capital.\n2. **Technology upgradation:** mills that become **obsolete quickly** must be replaced often, adding to fixed capital.',
  sol: 'Scale and technology upgradation, each linked to the steel firm.',
  scheme: [['Scale with link', 1], ['Technology upgradation with link', 1]],
}));
Q('s3_fc_three', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Lonar Lenses Ltd (imagined) is adding contact lenses and sunglasses to its range, will lease its new delivery vans, and is buying a robotic polishing line. Explain how each of these three choices affects its fixed capital requirement.',
  model: '1. **Diversification:** adding **contact lenses and sunglasses** needs new machines and space, so fixed capital **rises**.\n2. **Financing alternatives:** **leasing the vans** avoids buying them, so fixed capital **falls**.\n3. **Choice of technique:** a **robotic** line is capital-intensive, so fixed capital **rises**.',
  sol: 'Each choice matched to its factor and the direction of its effect.',
  scheme: [['Diversification', 1], ['Leasing', 1], ['Technique', 1]],
}));

// ================================================================ t05 Working capital
Q('m_wc_gross', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'Gross working capital means',
  opts: ['the total investment in current assets', 'current assets minus current liabilities', 'fixed assets minus long-term debt', 'the share capital of the firm'],
  sol: 'Gross working capital is total current assets; net working capital deducts current liabilities.',
}));
Q('m_wc_perm', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Gomti Garments, an imagined Lucknow kurta maker, always keeps at least ₹6 lakh in cloth, thread and cash, even in its slowest month. This minimum amount is its',
  opts: ['permanent working capital', 'temporary working capital', 'fixed capital', 'net fixed assets'],
  sol: 'The minimum level of current assets needed throughout the year is permanent (fixed) working capital.',
}));
Q('m_wc_temp', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Before Eid and Diwali, Gomti Garments (imagined) raises its stock of cloth and finished kurtas by ₹4 lakh above its usual minimum, and brings it back down after the festivals. This extra ₹4 lakh is',
  opts: ['temporary (seasonal) working capital', 'permanent working capital', 'fixed capital', 'gross working capital'],
  sol: 'Extra current assets needed only for a season are temporary, also called variable or seasonal working capital.',
}));
Q('m_wc_credit', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Ujjain Utensils, an imagined steel-utensil wholesaler, allows shopkeepers 60 days to pay but must pay its own suppliers within 15 days. Its working capital requirement will be',
  opts: ['higher, because money is locked in debtors longer than credit is received', 'lower, because sales are on credit', 'unchanged, because credit does not affect working capital', 'zero, because it is a wholesaler'],
  sol: 'Giving long credit while getting short credit ties up more funds in current assets, raising working capital needs.',
}));
Q('m_wc_cycle', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'An imagined boat-building yard takes nine months to finish each trawler; an imagined bakery turns flour into bread overnight. With equal sales, which statement is correct?',
  opts: ['The boatyard needs more working capital because of its longer production cycle', 'The bakery needs more working capital because its goods perish', 'Both need the same working capital because sales are equal', 'Neither needs working capital'],
  sol: 'A longer production cycle keeps funds tied up in materials and work-in-progress for longer, so more working capital is needed.',
}));
Q('m_wc_pqrs', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Which of these would **increase** a firm\'s working capital requirement?\nP. A long production cycle\nQ. Liberal credit allowed to customers\nR. Long credit received from suppliers\nS. A boom in business activity',
  opts: ['P, Q and S', 'P, R and S', 'Q and R only', 'R and S only'],
  sol: 'A long cycle, liberal credit to buyers and a boom all raise working capital needs; long credit from suppliers reduces them.',
}));
Q('ar_wc_boom', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'During a boom, a manufacturing firm generally needs more working capital.',
  r: 'Working capital is the money invested in current assets such as stock and debtors.',
  key: 'b',
  sol: 'Both are true, but the reason only defines working capital. The explanation is that in a boom sales and production rise, needing more stock and debtors.',
}));
Q('tf_wc_net', tf({
  t: 5, d: 1, c: 'understanding',
  stem: 'Net working capital is the excess of current assets over current liabilities.',
  ans: true,
  sol: 'True. Net working capital = current assets − current liabilities.',
}));
Q('fb_wc', fb({
  t: 5, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Delivery van : Fixed capital :: Stock of raw cotton : ___',
  acc: [['Working capital', 'working', 'current assets', 'Circulating capital']],
  sol: 'A van is a long-term asset financed by fixed capital; a stock of raw cotton is a current asset financed by working capital.',
}));
Q('n_net_wc', num({
  t: 5, d: 2, c: 'application', marks: 1, value: UU.net, unit: '₹',
  stem: `Ujjain Utensils (imagined) has stock ₹${inr(UU.stock)}, debtors ₹${inr(UU.debtors)} and cash ₹${inr(UU.cash)}. It owes creditors ₹${inr(UU.creditors)} and wages ₹${inr(UU.wages)}. Calculate its net working capital (in ₹).`,
  sol: `Step 1: Current assets = ${inr(UU.stock)} + ${inr(UU.debtors)} + ${inr(UU.cash)} = ₹${inr(UU.ca)}.\nStep 2: Current liabilities = ${inr(UU.creditors)} + ${inr(UU.wages)} = ₹${inr(UU.cl)}.\nStep 3: Net working capital = ${inr(UU.ca)} − ${inr(UU.cl)} = ₹${inr(UU.net)}.`,
}));
Q('mt_wc', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term about working capital with its meaning.',
  pairs: [
    ['Gross working capital', 'Total current assets'],
    ['Net working capital', 'Current assets less current liabilities'],
    ['Permanent working capital', 'Minimum current assets needed all year'],
    ['Temporary working capital', 'Extra current assets needed for a season'],
  ],
  sol: 'Gross is the total; net deducts current liabilities; permanent is the year-round minimum; temporary is the seasonal extra.',
}));
Q('s_wc_types', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Gomti Garments (imagined) needs at least ₹6 lakh of current assets all year and ₹10 lakh in the festival months. Distinguish its permanent and temporary working capital, with amounts.',
  model: '**Permanent working capital** is the **minimum ₹6 lakh** it needs throughout the year. **Temporary working capital** is the **extra ₹4 lakh** (₹10 lakh − ₹6 lakh) needed only in the **festival months**.',
  sol: 'Permanent ₹6 lakh (year-round minimum); temporary ₹4 lakh (seasonal extra).',
  scheme: [['Permanent with amount', 1], ['Temporary with amount', 1]],
}));
Q('s3_wc_factors', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Konkan Cashew Processors (imagined) buys a whole year\'s nuts in three months, takes several weeks to shell and grade them, and gives foreign buyers 60 days to pay. Explain three factors that raise its working capital needs.',
  model: '1. **Availability of raw material:** nuts are available only in **three harvest months**, so a year\'s stock must be bought and financed at once.\n2. **Production cycle:** shelling and grading take **several weeks**, keeping funds tied in work-in-progress.\n3. **Credit allowed:** **60 days\' credit** to buyers locks money in debtors.',
  sol: 'Raw-material availability, production cycle and credit allowed, each linked to the case.',
  scheme: [['Raw material', 1], ['Production cycle', 1], ['Credit allowed', 1]],
}));
Q('s3_fc_vs_wc', short({
  t: [4, 5], d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Majuli Mask Makers, an imagined craft partnership in Assam, owns a workshop and also keeps bamboo, paint and cash. Distinguish its fixed capital from its working capital on purpose, period and sources.',
  model: '1. **Purpose:** fixed capital buys the **workshop and tools**; working capital pays for **bamboo, paint and wages**.\n2. **Period:** fixed capital stays invested for **many years**; working capital **turns over** within a year.\n3. **Sources:** fixed capital comes from **long-term** sources such as partners\' capital; working capital mostly from **short-term** sources such as trade credit.',
  sol: 'Three differences, each with the firm\'s example.',
  scheme: [['Purpose', 1], ['Period', 1], ['Sources', 1]],
}));
Q('l_wc', long({
  t: 5, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Ujjain Utensils (imagined) is a wholesaler. It allows shopkeepers 60 days\' credit, gets only 15 days from suppliers, stocks extra goods before the wedding season, and expects sales to grow fast.\n(a) Distinguish between gross and net working capital. [1]\n(b) Explain four factors that affect its working capital requirement. [4]',
  model: '(a) **Gross working capital** is the **total of current assets**; **net working capital** is **current assets minus current liabilities**.\n\n(b) **Credit allowed:** giving shopkeepers **60 days** to pay locks a large sum in debtors, raising working capital.\n**Credit availed:** getting only **15 days** from suppliers means it must pay quickly, so it needs more of its own funds.\n**Seasonal factors:** stocking extra utensils **before the wedding season** needs temporary working capital for those months.\n**Growth prospects:** as **sales grow**, the wholesaler must carry more stock and more debtors, so its working capital must rise along with them.',
  sol: 'Gross versus net; four factors (credit allowed, credit availed, seasonality, growth) applied.',
  scheme: [['(a) Gross versus net', 1], ['(b) Four factors applied, 1 each', 4]],
}));
Q('l_fc_wc', long({
  t: [4, 5], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Kaziranga Eco Lodges Ltd (imagined) owns cottages, boats and jeeps, and also buys food, fuel and linen every week of the tourist season.\n(a) Give two differences between its fixed capital and working capital. [2]\n(b) Explain three factors that affect the fixed capital requirement of a resort company like this. [3]',
  model: '(a) **Nature of assets:** fixed capital is tied up in **cottages, boats and jeeps**, used for years; working capital is held in **food, fuel and linen**, used up within the season. **Sources:** fixed capital should come from **long-term** funds such as shares; working capital comes largely from **short-term** funds such as trade credit.\n\n(b) **Nature of business:** a resort must own **land, cottages and vehicles** before guests arrive, so it needs heavy fixed capital. **Scale:** more cottages and safari jeeps mean **more fixed capital**. **Financing alternatives:** it could **lease jeeps** or hire boats instead of buying them, reducing its fixed capital, and keep its own funds for building more cottages.',
  sol: 'Two differences; three factors (nature, scale, financing alternatives, technique, growth, diversification, collaboration) applied.',
  scheme: [['(a) Two differences', 2], ['(b) Three factors applied', 3]],
}));

// ================================================================ case-based
Q('cb_sources_fp', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Majuli Mask Makers (imagined), Assam**\n\nFour partners make painted bamboo masks for museums and theatre groups. Orders have grown, and they now want a larger workshop costing ₹18 lakh. Partner Bornali suggests each partner bring ₹2 lakh more and that they invite a retired museum curator to join with ₹6 lakh. Partner Hemanta wants a bank loan for the rest. Bornali also prepares a two-year money plan showing when each instalment for the workshop falls due and keeps a cushion for paint and wages in the slow monsoon months.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Inviting the retired curator to join with ₹6 lakh is an example of which source of finance?', opts: ['Admitting a new partner', 'Issue of shares', 'Trade credit', 'Public deposits'], sol: 'In a partnership, a new partner who brings capital is a source of owners\' funds.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'How much of the ₹18 lakh will Hemanta\'s bank loan have to cover?', model: 'Partners bring 4 × ₹2 lakh = ₹8 lakh and the curator ₹6 lakh, so the loan must cover **₹4 lakh**.', sol: '18 − 8 − 6 = ₹4 lakh.', scheme: [['₹4 lakh', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of a sound financial plan in Bornali\'s two-year plan.', model: '1. **Foresight:** it looks **two years ahead** and shows when each instalment falls due.\n2. **Liquidity:** it keeps a **cushion for paint and wages** in the slow monsoon months.', sol: 'Foresight and liquidity from the passage.', scheme: [['Foresight', 1], ['Liquidity', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain one advantage and one limitation of financing the workshop mainly through partners\' capital.', model: '**Advantage:** partners\' capital carries **no interest** and need not be repaid on a fixed date. **Limitation:** the amount is limited by the **partners\' own savings**, so a loan is still needed.', sol: 'One advantage and one limitation of owners\' funds in a partnership.', scheme: [['Advantage', 1], ['Limitation', 1]] }),
    ]),
  ],
}));
Q('cb_capital', caseQ({
  t: [3, 4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company and figures, written by SOYL for practice.)*',
  passage: '**Thar Solar Parks Ltd (imagined), Jodhpur**\n\nThar Solar Parks is building a 50-megawatt solar farm. Panels, land and inverters will cost ₹180 crore. Power is sold to the state under a 25-year contract, so the company expects steady monthly receipts. It needs only a small stock of spare parts and some cash for salaries and cleaning crews. The board plans to raise 70 per cent of the project cost as long-term loans at 9 per cent, expecting a return of about 13 per cent on capital, and the rest as equity.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'The ₹180 crore for panels, land and inverters is the company\'s', opts: ['fixed capital requirement', 'temporary working capital', 'net working capital', 'trade credit'], sol: 'Panels, land and inverters are long-term assets: fixed capital.' })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Why will its working capital need be small? Give one reason from the passage.', model: 'It needs only a **small stock of spare parts**; there are no raw materials to buy or goods to stock.', sol: 'Nature of business: little stock, steady receipts.', scheme: [['Reason from the passage', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two reasons why a high proportion of debt suits this company.', model: '1. **Trading on equity:** expected **return of 13 per cent exceeds the 9 per cent** interest, so debt raises EPS.\n2. **Cash flow:** **steady monthly receipts** under the 25-year contract make fixed interest safe to pay.', sol: 'Trading on equity and cash flow from the passage.', scheme: [['Trading on equity', 1], ['Cash flow', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State one risk of the 70 per cent debt plan and one way to reduce it.', model: '**Risk:** if the state **delays payments**, fixed interest and repayments may still fall due, causing **default**. **Way to reduce it:** keep a **reserve** of cash or some unused borrowing capacity (flexibility).', sol: 'One financial risk and one sensible safeguard.', scheme: [['Risk', 1], ['Safeguard', 1]] }),
    ]),
  ],
}));
