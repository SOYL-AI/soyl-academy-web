// ISC 12 Accounts, ch12 Ratio Analysis — question bank. Every company and figure is imagined by SOYL
// (companies named after Indian dance forms); no textbook illustration or exercise and no CISCE specimen or
// past-paper item is reused. Every ratio is computed in acc.mjs from the givens (one set of definitions,
// two-decimal rounding) and pinned to a hand-checked value; every balance sheet balances and capital
// employed is asserted equal both ways; effects of transactions (current, quick and debt-equity ratios
// only, per the ISC 2027 syllabus) are computed before and after and asserted; missing figures are found
// and then checked by recomputing the given ratios from them. Keys and model answers are built from the
// computed values.
import { Q as register, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, check, avg, pctOf, mulDiv, ratio, times, pct, eps, pe, show, pin, effects, labelled, delta, EFFECT_WORD, position, positionRows, posRatios, trading, results, resultRows, F, ratioTable, given } from './acc.mjs';

const FACTS = [];
/** Every question by id, for the bank-level checks in build.mjs (scheme marks, blueprint fit). */
const BANK = new Map();
function Q(key, proto) {
  const id = register(key, proto);
  BANK.set(id, proto);
  return id;
}
/** Effect table for one ratio. */
const effTable = (head, eff) =>
  md(
    ['Transaction', `Change in ${head[0]}`, `Change in ${head[1]}`, 'New ratio', 'Effect'],
    eff.rows.map((r) => [r.label, delta(r.dn), delta(r.dd), `${fig(r.n)} ÷ ${fig(r.d)} ${r.after.eq} ${r.after.s}`, bold(EFFECT_WORD[r.e])]),
  );
/** Effect table for the same transactions on several ratios: effs = [[name, effects result]]. */
const multiTable = (effs) =>
  md(
    ['Transaction', ...effs.map(([n]) => n)],
    effs[0][1].rows.map((r, i) => [r.label, ...effs.map(([, e]) => `${fig(e.rows[i].n)} ÷ ${fig(e.rows[i].d)} ${e.rows[i].after.eq} ${e.rows[i].after.s}: ${bold(EFFECT_WORD[e.rows[i].e])}`)]),
  );
const tag = (label) => label.split(')')[0] + ')';

// ================================================================ the ISC groups (t01–t04)
Q('m_forms', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The finance office of an imagined company, Kud Apricot Ltd, Bhaderwah, reports one ratio as "1.8 : 1", one as "9 times" and one as "14%". A figure stated as "9 times" most likely belongs to the',
  opts: ['activity (turnover) ratios, such as the working capital turnover ratio', 'liquidity ratios, such as the current ratio', 'solvency ratios, such as the proprietary ratio', 'profitability ratios, such as the gross profit ratio'],
  sol: 'A turnover ratio counts how often a resource is turned into revenue (or paid off) in the year, so it is stated in times. Liquidity and solvency ratios are pure ratios; profitability ratios are percentages, except earnings per share (rupees) and the price-earnings ratio (times).',
}));

Q('m_groups_eps', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In the ISC grouping of ratios, the earnings per share and the price-earnings ratio of an imagined listed company, Bharatanatyam Bronzes Ltd, Thiruvarur, are classed as',
  opts: ['profitability ratios', 'solvency ratios', 'activity ratios', 'liquidity ratios'],
  sol: 'Both relate the profit earned for equity shareholders to their shares (or to the market price of a share), so they sit with the gross profit, net profit, operating and operating profit ratios and return on investment.',
}));

Q('mt_groups', match({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'A commerce teacher asks her class to sort four ratios of an imagined company, Yakshagana Arecanut Ltd, Ankola, into the four ISC groups. Match each ratio in column A with its group in column B.',
  pairs: [
    ['Quick ratio', 'Liquidity ratios'],
    ['Interest coverage ratio', 'Solvency ratios'],
    ['Working capital turnover ratio', 'Activity ratios'],
    ['Price-earnings ratio', 'Profitability ratios'],
  ],
  sol: 'Quick ratio: paying short-term dues. Interest coverage: the long-term burden of interest. Working capital turnover: how hard working capital is used. Price-earnings: what the market pays for each rupee of earnings.',
}));

// ================================================================ t01 Liquidity ratios
Q('m_cl_item', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Odissi Silver Filigree Ltd, an imagined company in Choudwar, lists four obligations on 31 March 2026. Which one is a current liability under Schedule III and so enters its current ratio?',
  opts: ['Provision for tax for the year just ended (a short-term provision)', 'Debentures redeemable in 2031', 'Provision for gratuity payable to staff on retirement many years from now', 'Equity share capital'],
  sol: 'Current liabilities are those due within the operating cycle or twelve months: short-term borrowings, trade payables, other current liabilities and short-term provisions. The debentures and the gratuity provision are non-current; share capital is not a liability at all.',
}));

Q('m_quick_excl', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Kuchipudi Rice Mills Ltd, an imagined company in Machilipatnam, works out its quick (liquid) assets from its current assets. Which pair of current assets does it leave out?',
  opts: ['Inventories and prepaid expenses', 'Trade receivables and cash and cash equivalents', 'Current investments and cash and cash equivalents', 'Debtors and bills receivable'],
  sol: 'Quick assets = current assets − inventories − prepaid expenses. Inventory must first be sold before it becomes cash, and a prepaid expense will never come back as cash.',
}));

Q('m_cr_low', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The current ratio of an imagined company, Sattriya Bell Metal Ltd, Barpeta, has slipped to 0.8 : 1. For the suppliers who sell to it on credit, this most likely means that',
  opts: ['its current assets are not enough to meet all its current liabilities, so prompt payment is at risk', 'it is holding too much idle cash and unsold stock', 'its long-term debt is too large compared with its equity', 'its profit for the year has fallen by 20 per cent'],
  sol: 'A current ratio below 1 means current liabilities exceed current assets: the company would have to borrow, sell long-term assets or delay payment to settle its short-term dues.',
}));

const CH = { inv: 150000, tr: 120000, cash: 70000, prepaid: 10000, cl: 200000 };
const CH_ca = CH.inv + CH.tr + CH.cash + CH.prepaid;
const CH_qa = CH_ca - CH.inv - CH.prepaid;
const CH_r = pin(ratio(CH_qa, CH.cl), 0.95, 'Chhau quick');
const CH_x1 = pin(ratio(CH_ca - CH.inv, CH.cl), 1, 'Chhau forgot prepaid');
const CH_x2 = pin(ratio(CH_ca, CH.cl), 1.75, 'Chhau current');
const CH_x3 = pin(ratio(CH.cash, CH.cl), 0.35, 'Chhau cash only');
Q('m_qr_compute', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Chhau Mask Makers Ltd, an imagined company in Purulia, holds inventories of ${rs(CH.inv)}, trade receivables of ${rs(CH.tr)}, cash and cash equivalents of ${rs(CH.cash)} and prepaid expenses of ${rs(CH.prepaid)}. Its current liabilities are ${rs(CH.cl)}. Its quick ratio is`,
  opts: [CH_r.s, CH_x1.s, CH_x2.s, CH_x3.s],
  sol: `Quick assets = ${fig(CH_ca)} − ${fig(CH.inv)} − ${fig(CH.prepaid)} = ${fig(CH_qa)}; quick ratio = ${show(CH_r)}. Forgetting the prepaid expenses gives ${CH_x1.s}; ${CH_x2.s} is the current ratio.`,
}));

Q('fb_quick', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the liquidity analysis of an imagined company, Ghoomar Lac Bangles Ltd, Nathdwara, quick assets are its current assets less inventories and less ___.',
  acc: [['prepaid expenses', 'prepaid expense', 'prepayments']],
  sol: 'Quick assets leave out inventories (they must be sold first) and prepaid expenses (they never turn back into cash).',
}));

Q('tf_cr_high', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? An imagined footwear wholesaler, Lavani Footwear Ltd, Phaltan, need not look any further into its working capital, because a current ratio as high as 5 : 1 can only be good news.',
  sol: 'An unusually high current ratio may hide idle cash, piled-up stock or customers who pay late; it reassures creditors but suggests that funds are not being used well.',
}));

Q('ar_qr_prepaid', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Prepaid insurance of an imagined company, Theyyam Coconut Oils Ltd, Taliparamba, is excluded when its quick ratio is computed.',
  r: 'A prepaid expense will not be received back in cash; it only saves a payment that would otherwise fall due later.',
  sol: 'Both are true, and R explains A: the quick ratio keeps only assets that can be turned into cash at short notice.',
}));

Q('tf_qr_stock', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? With a quick ratio of 0.6 : 1, an imagined pulses trader, Hikat Pulses Ltd, Chamba, can pay all its current liabilities without selling any of its stock of rajma.',
  sol: 'A quick ratio below 1 means quick assets cover only 60 paise of every rupee due soon; the rest must come from selling stock, borrowing or delaying payment.',
}));

const BH_ITEMS = [['Inventories', 210000], ['Trade receivables', 160000], ['Cash and cash equivalents', 50000], ['Current investments', 30000], ['Trade payables', 180000], ['Short-term provisions', 70000], ['Machinery', 400000], ['Long-term borrowings', 300000]];
const BH_ca = sum(BH_ITEMS.slice(0, 4).map((x) => x[1]));
const BH_cl = sum(BH_ITEMS.slice(4, 6).map((x) => x[1]));
const BH_r = pin(ratio(BH_ca, BH_cl), 1.8, 'Bhangra current');
Q('n_cr', num({
  t: 1, d: 2, c: 'application', marks: 1, value: BH_r.v, unit: ': 1', tol: 0.01,
  stem: `Bhangra Sports Goods Ltd, an imagined company in Kartarpur, shows these balances on 31 March 2026. Find its current ratio (write the number before ": 1", for example 1.5):\n\n${given(BH_ITEMS)}`,
  sol: `Current assets = ${BH_ITEMS.slice(0, 4).map((x) => fig(x[1])).join(' + ')} = ${fig(BH_ca)}; current liabilities = ${fig(BH_ITEMS[4][1])} + ${fig(BH_ITEMS[5][1])} = ${fig(BH_cl)}. Current ratio = ${show(BH_r)}; the machinery and the long-term borrowings are non-current.`,
}));

const GD = { ca: 640000, inv: 220000, prepaid: 20000, cl: 320000 };
const GD_q = GD.ca - GD.inv - GD.prepaid;
const GD_cr = pin(ratio(GD.ca, GD.cl), 2, 'Giddha current');
const GD_qr = pin(ratio(GD_q, GD.cl), 1.25, 'Giddha quick');
Q('s2_liquidity_pair', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Giddha Agro Tools Ltd, an imagined company in Batala, has current assets of ${rs(GD.ca)}, which include inventories of ${rs(GD.inv)} and prepaid insurance of ${rs(GD.prepaid)}. Its current liabilities are ${rs(GD.cl)}. Calculate its current ratio and quick ratio.`,
  model: `- Current ratio = ${F.current} = ${show(GD_cr)}.\n- Quick assets = ${fig(GD.ca)} − ${fig(GD.inv)} − ${fig(GD.prepaid)} = ${fig(GD_q)}.\n- Quick ratio = ${F.quick} = ${show(GD_qr)}.`,
  sol: 'One division for each ratio; take both inventories and the prepaid insurance out before the quick ratio.',
  scheme: [[`Current ratio ${GD_cr.s}`, 1], [`Quick ratio ${GD_qr.s} with quick assets ${rs(GD_q)}`, 1]],
}));

const KL = { qrT: 14, qa: 210000, inv: 120000 };
const KL_cl = mulDiv(KL.qa, 10, KL.qrT);
const KL_ca = KL.qa + KL.inv;
pin(ratio(KL.qa, KL_cl), 1.4, 'Kalbelia quick recomputed');
const KL_cr = pin(ratio(KL_ca, KL_cl), 2.2, 'Kalbelia current');
check(KL_cl === 150000 && KL_ca === 330000, 'Kalbelia figures');
Q('s2_missing_cl', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Kalbelia Camel Leather Ltd, an imagined company in Lunkaransar, has a quick ratio of 1.4 : 1. Its quick assets are ${rs(KL.qa)} and its inventories ${rs(KL.inv)}; it has no prepaid expenses. Find its current liabilities, its current assets and its current ratio.`,
  model: `- Current liabilities = quick assets ÷ quick ratio = ${fig(KL.qa)} ÷ 1.4 = **${rs(KL_cl)}**.\n- Current assets = quick assets + inventories = ${fig(KL.qa)} + ${fig(KL.inv)} = **${rs(KL_ca)}**.\n- Current ratio = ${show(KL_cr)}.\n\nCheck: ${show(ratio(KL.qa, KL_cl))}, the given quick ratio.`,
  sol: 'Divide the quick assets by the quick ratio to get the current liabilities; with no prepaid expenses, add back only the inventories.',
  scheme: [[`Current liabilities ${rs(KL_cl)}`, 1], [`Current assets ${rs(KL_ca)} and current ratio ${KL_cr.s}`, 1]],
}));

Q('s2_qr_vs_cr', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Most of the current assets of an imagined company, Jhumair Pickles Ltd, Khunti, are jars of pickle in its godown, some of which take many months to sell. Explain why its banker may rely more on its quick ratio than on its current ratio.',
  model: '1. **Inventory is the least liquid current asset.** Jhumair’s pickles must first be sold, perhaps on credit, before they bring in cash; slow-moving stock may not be saleable at book value at all. The current ratio counts it in full, so it can look comfortable even when cash is short.\n2. **The quick ratio is a sharper test.** It compares only cash, receivables and similar assets (current assets less inventories and prepaid expenses) with current liabilities, so it shows whether the dues can be met without waiting for the stock to sell. A banker lending short-term wants that assurance.',
  sol: 'Two points: why inventory weakens the current ratio as a test, and what the quick ratio measures instead.',
  scheme: [['Inventory slow to convert; inflates the current ratio', 1], ['Quick ratio tests payment without relying on stock', 1]],
}));

const RW_ITEMS = [['Inventories', 300000], ['Debtors', 190000], ['Bills receivable', 50000], ['Cash at bank', 90000], ['Prepaid rent', 15000], ['Current investments', 55000], ['Machinery', 600000], ['Creditors', 210000], ['Bills payable', 40000], ['Outstanding salaries', 25000], ['Provision for tax (short-term)', 75000], ['Bank overdraft', 50000], ['11% Debentures (redeemable in 2031)', 400000], ['Long-term provision for warranties', 50000]];
const RW_ca = sum(RW_ITEMS.slice(0, 6).map((x) => x[1]));
const RW_cl = sum(RW_ITEMS.slice(7, 12).map((x) => x[1]));
const RW_q = RW_ca - RW_ITEMS[0][1] - RW_ITEMS[4][1];
const RW_cr = pin(ratio(RW_ca, RW_cl), 1.75, 'Rouf current');
const RW_qr = pin(ratio(RW_q, RW_cl), 0.96, 'Rouf quick');
check(!RW_qr.exact && RW_ca === 700000 && RW_cl === 400000, 'Rouf figures');
Q('s3_liquidity', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Rouf Walnut Products Ltd, an imagined company in Baramulla, gives the following balances on 31 March 2026. Calculate its current ratio and quick ratio.\n\n${given(RW_ITEMS)}`,
  model: `${md(['Working', '₹'], [['Current assets: inventories + debtors + bills receivable + cash at bank + prepaid rent + current investments', fig(RW_ca)], ['Current liabilities: creditors + bills payable + outstanding salaries + provision for tax + bank overdraft', fig(RW_cl)], ['Quick assets: current assets − inventories − prepaid rent', fig(RW_q)]], [1])}\n\n- Current ratio = ${F.current} = ${show(RW_cr)}\n- Quick ratio = ${F.quick} = ${show(RW_qr)} (rounded to two decimal places)\n\nThe machinery, the debentures and the long-term provision are non-current and enter neither ratio; the bank overdraft is a short-term borrowing and is a current liability.`,
  sol: 'Sort every balance into current or non-current first; bills receivable belong to trade receivables and the overdraft to current liabilities.',
  scheme: [[`Current assets ${rs(RW_ca)} and current liabilities ${rs(RW_cl)}`, 1], [`Current ratio ${RW_cr.s}`, 1], [`Quick ratio ${RW_qr.s}`, 1]],
}));

const DL = { crH: 275, wc: 350000, inv: 240000, prepaid: 10000 };
const DL_cl = mulDiv(DL.wc, 100, DL.crH - 100);
const DL_ca = DL_cl + DL.wc;
const DL_q = DL_ca - DL.inv - DL.prepaid;
pin(ratio(DL_ca, DL_cl), 2.75, 'Dandiya current recomputed');
const DL_qr = pin(ratio(DL_q, DL_cl), 1.5, 'Dandiya quick');
check(DL_cl === 200000 && DL_ca === 550000 && DL_q === 300000, 'Dandiya figures');
Q('s3_missing_inv', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `Dandiya Lacquer Toys Ltd, an imagined company in Sankheda, has a current ratio of 2.75 : 1 and working capital of ${rs(DL.wc)}. Its inventories are ${rs(DL.inv)} and its prepaid expenses ${rs(DL.prepaid)}. Find its current liabilities, its current assets and its quick ratio.`,
  model: `- For every ₹1 of current liabilities there are ₹2.75 of current assets, so working capital is 1.75 times the current liabilities. Current liabilities = ${fig(DL.wc)} ÷ 1.75 = **${rs(DL_cl)}**.\n- Current assets = ${fig(DL_cl)} + ${fig(DL.wc)} = **${rs(DL_ca)}**.\n- Quick assets = ${fig(DL_ca)} − ${fig(DL.inv)} − ${fig(DL.prepaid)} = ${fig(DL_q)}; quick ratio = ${show(DL_qr)}.\n\nCheck: ${show(ratio(DL_ca, DL_cl))}, the given current ratio; ${fig(DL_ca)} − ${fig(DL_cl)} = ${fig(DL.wc)}, the given working capital.`,
  sol: 'Express working capital as a multiple of the current liabilities, then build the current and quick assets from them.',
  scheme: [[`Current liabilities ${rs(DL_cl)}`, 1], [`Current assets ${rs(DL_ca)}`, 1], [`Quick ratio ${DL_qr.s}`, 1]],
}));

// ================================================================ t02 Solvency ratios
Q('m_de_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Krishnanattam Ayurvedic Oils Ltd, an imagined company in Guruvayur, groups its liabilities under the Schedule III heads. Which items together make up the numerator of its debt-equity ratio?',
  opts: ['Long-term borrowings and long-term provisions (its non-current liabilities)', 'Every outside liability, current and non-current', 'Trade payables, bank overdraft and other current liabilities', 'Share capital together with reserves and surplus'],
  sol: "In this chapter debt means long-term debt: the non-current liabilities. Equity, the denominator, is shareholders' funds; current liabilities enter neither.",
}));

const PC = { ta: 2500000, deb: 400000, ltp: 100000, cl: 300000 };
const PC_debt = PC.deb + PC.ltp;
const PC_r = pin(ratio(PC_debt, PC.ta), 0.2, 'Padayani DTA');
const PC_x1 = pin(ratio(PC_debt + PC.cl, PC.ta), 0.32, 'Padayani with CL');
const PC_x2 = pin(ratio(PC.deb, PC.ta), 0.16, 'Padayani debentures only');
const PC_x3 = pin(ratio(PC.ta, PC_debt), 5, 'Padayani inverse');
Q('m_dta_compute', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Padayani Cashew Ltd, an imagined company in Kottarakkara, has total assets of ${rs(PC.ta)}. Its liabilities include 12% debentures of ${rs(PC.deb)}, long-term provisions of ${rs(PC.ltp)} and current liabilities of ${rs(PC.cl)}. Its debt to total assets ratio is`,
  opts: [PC_r.s, PC_x1.s, PC_x2.s, PC_x3.s],
  sol: `Debt = ${fig(PC.deb)} + ${fig(PC.ltp)} = ${fig(PC_debt)}; ratio = ${show(PC_r)}. Adding the current liabilities gives ${PC_x1.s}; turning the ratio upside down gives ${PC_x3.s}.`,
}));

Q('m_prop_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The proprietary ratio of an imagined company, Karakattam Brass Pots Ltd, Aruppukottai, is 0.75 : 1. This tells its lenders that',
  opts: ["three-quarters of its total assets are financed by shareholders' funds", 'its long-term debt is three-quarters of its equity', 'it earns 75 paise of profit on every rupee of assets', 'three-quarters of its total assets are current assets'],
  sol: "Proprietary ratio = shareholders' funds ÷ total assets. The owners have financed 75 per cent of the assets, so outsiders have a wide cushion behind their claims.",
}));

const KW = { loan: 800000, rate: 9, pat: 378000, tax: 30 };
const KW_int = pctOf(KW.rate, KW.loan);
const KW_pbt = mulDiv(KW.pat, 100, 100 - KW.tax);
check(KW_pbt - pctOf(KW.tax, KW_pbt) === KW.pat, 'Kolattam tax');
const KW_pbit = KW_pbt + KW_int;
const KW_r = pin(times(KW_pbit, KW_int), 8.5, 'Kolattam ICR');
const KW_x1 = pin(times(KW_pbt, KW_int), 7.5, 'Kolattam PBT');
const KW_x2 = pin(times(KW.pat, KW_int), 5.25, 'Kolattam PAT');
Q('m_icr_compute', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kolattam Wooden Toys Ltd, an imagined company in Proddatur, has a ${KW.rate}% long-term loan of ${rs(KW.loan)}, outstanding for the whole year. Its profit after tax is ${rs(KW.pat)}, and tax is ${KW.tax}% of profit before tax. Its interest coverage ratio is`,
  opts: [KW_r.s, KW_x1.s, KW_x2.s, `${KW.rate} times`],
  sol: `Profit before tax = ${fig(KW.pat)} × 100 ÷ ${100 - KW.tax} = ${fig(KW_pbt)}; interest = ${fig(KW_int)}; profit before interest and tax = ${fig(KW_pbit)}. Coverage = ${show(KW_r)}.`,
}));

Q('m_icr_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Two imagined coffee estates are compared by a bank: Huttari Coffee Estates Ltd, Virajpet, covers its debenture interest 2 times, and a rival covers its interest 10 times. What does this suggest about Huttari?',
  opts: ['A modest fall in its profit could leave it unable to pay its interest', 'It is more profitable than the rival', 'It has less long-term debt than the rival', 'Its current assets are only twice its current liabilities'],
  sol: 'Interest coverage shows how many times profit before interest and tax covers the interest charge. At 2 times, half of that profit already goes in interest, so there is little cushion if profit falls.',
}));

Q('m_icr_user', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Mardani Forgings Ltd, an imagined company in Kagal, publishes its interest coverage ratio in its annual report. Which group of readers is most directly concerned with that ratio?',
  opts: ['Holders of its debentures and its long-term lenders', 'Its trade creditors, who are paid within a few weeks', 'Its customers', 'The workers in its forge shop'],
  sol: 'The ratio shows how safely the yearly interest on long-term debt is covered by profit, which is what long-term lenders and debenture holders want to know.',
}));

Q('ar_de_safety', ar({
  t: 2, d: 2, c: 'understanding', key: 'b',
  a: 'A debt-equity ratio of 0.3 : 1 gives the debenture holders of an imagined company, Bhavai Pottery Ltd, Thangadh, a wide margin of safety.',
  r: 'Under the definitions used in this chapter, long-term provisions form part of debt.',
  sol: 'Both are true. A is true because owners have put in more than three times as much long-term money as the lenders. R is a correct rule about what debt includes, but it does not explain why a low ratio protects lenders.',
}));

Q('ar_icr', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'The interest coverage ratio of an imagined company, Hojagiri Bamboo Ltd, Amarpur, is worked out on profit before interest and tax.',
  r: 'Interest on debentures is paid out of profit after tax.',
  sol: 'A is true. R is false: interest is a charge against profit, met before tax is worked out, which is why the whole profit before interest and tax is set against it.',
}));

Q('tf_dta', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The debt to total assets ratio of an imagined company, Cheraw Ginger Products Ltd, Champhai, is 0.25 : 1. This means long-term lenders have provided one quarter of the funds invested in its total assets.',
  sol: 'Debt to total assets = long-term debt ÷ total assets; 0.25 means long-term debt finances 25 per cent of the assets, and the rest comes from shareholders’ funds and current liabilities.',
}));

const TC = position({ sc: 1000000, rs: 500000, ltb: 500000, ltp: 100000, tp: 300000, stp: 100000, ppe: 1600000, nci: 100000, inv: 400000, tr: 250000, cce: 150000 });
const TC_prop = pin(ratio(TC.sf, TC.total), 0.6, 'Tillana proprietary');
const TC_dta = pin(ratio(TC.debt, TC.total), 0.24, 'Tillana DTA');
check(TC.total === 2500000, 'Tillana total');
Q('s2_prop_dta', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Tillana Copperware Ltd, an imagined company in Amroha, has: equity share capital ${rs(TC.sc)}; reserves and surplus ${rs(TC.rs)}; long-term borrowings ${rs(TC.ltb)}; long-term provisions ${rs(TC.ltp)}; trade payables ${rs(TC.tp)}; short-term provisions ${rs(TC.stp)}; property, plant and equipment ${rs(TC.ppe)}; non-current investments ${rs(TC.nci)}; inventories ${rs(TC.inv)}; trade receivables ${rs(TC.tr)}; cash and cash equivalents ${rs(TC.cce)}. Calculate its proprietary ratio and its debt to total assets ratio.`,
  model: `Total assets = ${fig(TC.ppe)} + ${fig(TC.nci)} + ${fig(TC.inv)} + ${fig(TC.tr)} + ${fig(TC.cce)} = ${fig(TC.total)} (equal to the total of equity and liabilities). Shareholders' funds = ${fig(TC.sc)} + ${fig(TC.rs)} = ${fig(TC.sf)}; debt = ${fig(TC.ltb)} + ${fig(TC.ltp)} = ${fig(TC.debt)}.\n\n${ratioTable([['Proprietary', F.prop, TC_prop], ['Debt to total assets', F.dta, TC_dta]])}`,
  sol: 'Find total assets, owners’ funds and long-term debt first; each ratio is then one division.',
  scheme: [[`Proprietary ratio ${TC_prop.s}`, 1], [`Debt to total assets ${TC_dta.s}`, 1]],
}));

const TS = { deb: 600000, debRate: 10, loan: 250000, loanRate: 12, pbt: 390000 };
const TS_int = pctOf(TS.debRate, TS.deb) + pctOf(TS.loanRate, TS.loan);
const TS_pbit = TS.pbt + TS_int;
const TS_r = pin(times(TS_pbit, TS_int), 5.33, 'Tandava ICR');
Q('s2_icr', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Tandava Steel Utensils Ltd, an imagined company in Jagadhri, had ${TS.debRate}% debentures of ${rs(TS.deb)} and a ${TS.loanRate}% long-term bank loan of ${rs(TS.loan)}, both outstanding for the whole year. Its profit after charging this interest but before tax was ${rs(TS.pbt)}. Calculate its interest coverage ratio.`,
  model: `- Interest on long-term debt = ${TS.debRate}% of ${fig(TS.deb)} + ${TS.loanRate}% of ${fig(TS.loan)} = ${fig(pctOf(TS.debRate, TS.deb))} + ${fig(pctOf(TS.loanRate, TS.loan))} = ${fig(TS_int)}.\n- Profit before interest and tax = ${fig(TS.pbt)} + ${fig(TS_int)} = ${fig(TS_pbit)}.\n- Interest coverage ratio = ${F.icr} = ${show(TS_r)}.`,
  sol: 'Add both interest charges back to the profit before tax; divide by the total interest.',
  scheme: [[`Interest ${rs(TS_int)} and profit before interest and tax ${rs(TS_pbit)}`, 1], [`Coverage ${TS_r.s}`, 1]],
}));

const MY = position({ sc: 1600000, rs: 400000, ltb: 800000, ltp: 100000, tp: 350000, ocl: 50000, stp: 100000, ppe: 2300000, intang: 200000, inv: 400000, tr: 300000, cce: 200000, lab: { ltb: '11% Debentures' } });
const MY_r = posRatios(MY);
pin(MY_r.de, 0.45, 'Mayilattam DE'); pin(MY_r.dta, 0.26, 'Mayilattam DTA'); pin(MY_r.prop, 0.59, 'Mayilattam prop');
check(MY.total === 3400000, 'Mayilattam total');
Q('s3_solvency3', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `The balance sheet of Mayilattam Palm Products Ltd, an imagined company in Tiruchendur, shows on 31 March 2026: share capital ${rs(MY.sc)}; reserves and surplus ${rs(MY.rs)}; 11% debentures ${rs(MY.ltb)}; long-term provisions ${rs(MY.ltp)}; trade payables ${rs(MY.tp)}; other current liabilities ${rs(MY.ocl)}; short-term provisions ${rs(MY.stp)}; property, plant and equipment ${rs(MY.ppe)}; intangible assets ${rs(MY.intang)}; inventories ${rs(MY.inv)}; trade receivables ${rs(MY.tr)}; cash and cash equivalents ${rs(MY.cce)}. Compute its debt-equity ratio, debt to total assets ratio and proprietary ratio.`,
  model: `Debt = ${fig(MY.ltb)} + ${fig(MY.ltp)} = ${fig(MY.debt)}; equity (shareholders' funds) = ${fig(MY.sc)} + ${fig(MY.rs)} = ${fig(MY.sf)}; total assets = ${fig(MY.nca)} + ${fig(MY.ca)} = ${fig(MY.total)}.\n\n${ratioTable([['Debt-equity', F.de, MY_r.de], ['Debt to total assets', F.dta, MY_r.dta], ['Proprietary', F.prop, MY_r.prop]])}`,
  sol: 'Fix debt, equity and total assets first; round each ratio to two decimal places.',
  scheme: [[`Debt-equity ${MY_r.de.s}`, 1], [`Debt to total assets ${MY_r.dta.s}`, 1], [`Proprietary ${MY_r.prop.s}`, 1]],
}));

Q('s3_solvency_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'An investor is thinking of buying debentures of an imagined company, Oppana Teak Furniture Ltd, Malappuram. Explain what each of these three ratios of the company would tell her: (a) debt-equity ratio, (b) proprietary ratio, (c) interest coverage ratio.',
  model: "**(a) Debt-equity ratio** (long-term debt ÷ shareholders' funds) shows how far the company depends on borrowed long-term funds. A low ratio means owners have put in most of the long-term money, so her claim is well protected; a high ratio means heavy borrowing and a large fixed interest burden.\n\n**(b) Proprietary ratio** (shareholders' funds ÷ total assets) shows what share of the assets the owners have financed. The higher it is, the larger the cushion of owners' money behind outside lenders if the assets ever had to be sold.\n\n**(c) Interest coverage ratio** (profit before interest and tax ÷ interest on long-term debt) shows how many times the yearly interest is earned. A high figure means her interest is likely to be paid even if profits fall.",
  sol: 'For each ratio: what it compares, and whether a higher or lower figure is safer for a debenture holder.',
  scheme: [['(a) Debt-equity: meaning and reading', 1], ['(b) Proprietary: meaning and reading', 1], ['(c) Interest coverage: meaning and reading', 1]],
}));

const TR_P = position({ sc: 1500000, rs: 900000, ltb: 700000, ltp: 100000, tp: 400000, stp: 100000, ppe: 2600000, nci: 300000, inv: 400000, tr: 250000, cce: 150000, lab: { ltb: '12% Debentures' } });
const TR_int = pctOf(12, TR_P.ltb);
const TR_pbt = 672000;
const TR_pbit = TR_pbt + TR_int;
const TR_r = posRatios(TR_P);
pin(TR_r.de, 0.33, 'Thullal DE'); pin(TR_r.dta, 0.22, 'Thullal DTA'); pin(TR_r.prop, 0.65, 'Thullal prop');
const TR_icr = pin(times(TR_pbit, TR_int), 9, 'Thullal ICR');
check(TR_P.total === 3700000 && !TR_r.de.exact, 'Thullal');
Q('l5_solvency', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: `Thullal Rubber Goods Ltd, an imagined company in Kanjirappally, gives its condensed balance sheet as at 31 March 2026. Its profit before tax for 2025-26 was ${rs(TR_pbt)}; the debentures were outstanding for the whole year.\n\n${positionRows(TR_P).md}\n\n(a) Calculate the debt-equity ratio, the debt to total assets ratio and the proprietary ratio. [3]\n\n(b) Calculate the interest coverage ratio and comment briefly on the company's long-term solvency. [2]`,
  model: `**(a)** Debt = ${fig(TR_P.ltb)} + ${fig(TR_P.ltp)} = ${fig(TR_P.debt)}; shareholders' funds = ${fig(TR_P.sf)}; total assets = ${fig(TR_P.total)}.\n\n${ratioTable([['Debt-equity', F.de, TR_r.de], ['Debt to total assets', F.dta, TR_r.dta], ['Proprietary', F.prop, TR_r.prop]])}\n\n**(b)** Interest on debentures = 12% of ${fig(TR_P.ltb)} = ${fig(TR_int)}; profit before interest and tax = ${fig(TR_pbt)} + ${fig(TR_int)} = ${fig(TR_pbit)}. Interest coverage = ${show(TR_icr)}.\n\n**Comment:** long-term debt is only a third of the owners' funds, owners finance about ${TR_r.prop.s.replace(' : 1', '')} of every rupee of assets and interest is earned ${TR_icr.s}; the company is soundly placed to pay interest and repay its debentures.`,
  sol: 'Fix the three bases (debt, owners’ funds, total assets) for part (a); for part (b) add the debenture interest back to profit before tax.',
  scheme: [[`(a) Debt-equity ${TR_r.de.s}`, 1], [`(a) Debt to total assets ${TR_r.dta.s}`, 1], [`(a) Proprietary ${TR_r.prop.s}`, 1], [`(b) Interest coverage ${TR_icr.s}`, 1], ['(b) Comment on solvency', 1]],
}));

// ================================================================ t03 Activity ratios
const AB = { rev: 1500000, gpPct: 20, open: 140000, close: 160000 };
const AB_cost = AB.rev - pctOf(AB.gpPct, AB.rev);
const AB_avg = avg(AB.open, AB.close);
const AB_r = pin(times(AB_cost, AB_avg), 8, 'Abhinaya ITR');
const AB_x1 = pin(times(AB.rev, AB_avg), 10, 'Abhinaya revenue');
const AB_x2 = pin(times(AB_cost, AB.close), 7.5, 'Abhinaya closing');
const AB_x3 = pin(times(AB_cost, AB.open + AB.close), 4, 'Abhinaya not halved');
Q('m_itr_cost', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Abhinaya Incense Ltd, an imagined company in Hunsur, had revenue from operations of ${rs(AB.rev)} and earned a gross profit of ${AB.gpPct}% on that revenue. Its inventory was ${rs(AB.open)} on 1 April 2025 and ${rs(AB.close)} on 31 March 2026. Its inventory turnover ratio is`,
  opts: [AB_r.s, AB_x1.s, AB_x2.s, AB_x3.s],
  sol: `Cost of revenue from operations = ${fig(AB.rev)} − ${AB.gpPct}% of ${fig(AB.rev)} = ${fig(AB_cost)}; average inventory = ${fig(AB_avg)}; turnover = ${show(AB_r)}. Revenue over average inventory gives ${AB_x1.s}, a common slip.`,
}));

const KJ = { rev: 3000000, cash: 600000, dO: 170000, dC: 210000, bO: 30000, bC: 70000 };
const KJ_credit = KJ.rev - KJ.cash;
const KJ_avg = avg(KJ.dO + KJ.bO, KJ.dC + KJ.bC);
const KJ_r = pin(times(KJ_credit, KJ_avg), 10, 'Kummi TRT');
const KJ_x1 = pin(times(KJ.rev, KJ_avg), 12.5, 'Kummi total revenue');
const KJ_x2 = pin(times(KJ_credit, avg(KJ.dO, KJ.dC)), 12.63, 'Kummi debtors only');
const KJ_x3 = pin(times(KJ_credit, KJ.dC + KJ.bC), 8.57, 'Kummi closing');
Q('m_trt_compute', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Kummi Jaggery Ltd, an imagined company in Kodumudi, had revenue from operations of ${rs(KJ.rev)}, of which ${rs(KJ.cash)} was for cash. Its debtors were ${rs(KJ.dO)} at the start of the year and ${rs(KJ.dC)} at the end; its bills receivable were ${rs(KJ.bO)} and ${rs(KJ.bC)}. Its trade receivables turnover ratio is`,
  opts: [KJ_r.s, KJ_x1.s, KJ_x2.s, KJ_x3.s],
  sol: `Credit revenue = ${fig(KJ.rev)} − ${fig(KJ.cash)} = ${fig(KJ_credit)}. Trade receivables (debtors + bills receivable) = ${fig(KJ.dO + KJ.bO)} and ${fig(KJ.dC + KJ.bC)}, average ${fig(KJ_avg)}. Turnover = ${show(KJ_r)}.`,
}));

Q('fb_trt_bills', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'When the trade receivables turnover ratio of an imagined company, Garadi Fish Meal Ltd, Karwar, is worked out, its trade receivables are taken as its debtors plus its bills ___.',
  acc: [['receivable', 'receivables']],
  sol: 'Trade receivables are book debts (debtors) plus bills receivable; both arise from credit sales.',
}));

Q('fb_wc', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'For the working capital turnover ratio of an imagined company, Lambadi Mirror Crafts Ltd, Sandur, working capital is its current assets minus its current ___.',
  acc: [['liabilities', 'liability']],
  sol: 'Working capital is the excess of current assets over current liabilities, taken at the year end in this chapter.',
}));

Q('mt_turnover', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'The cost accountant of an imagined tuna cannery, Kolkali Tuna Canners Ltd, Kavaratti, has four turnover ratios to work out. Match each ratio in column A with the denominator it uses in column B.',
  pairs: [
    ['Inventory turnover', 'Average inventory'],
    ['Trade receivables turnover', 'Average of debtors plus bills receivable'],
    ['Trade payables turnover', 'Average of creditors plus bills payable'],
    ['Working capital turnover', 'Current assets less current liabilities'],
  ],
  sol: 'Each turnover ratio divides a flow of the year by the resource behind it: stock, money owed by customers, money owed to suppliers, and the net current assets.',
}));

Q('m_tpt_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The trade payables turnover ratio of an imagined company, Perini Granite Ltd, Khammam, fell from 9 times to 6 times, though its suppliers allow the same credit period as before. This suggests that the company',
  opts: ['is taking longer to pay its suppliers, which may point to a strain on its cash', 'is paying its suppliers faster than before', 'is collecting from its customers more slowly', 'is selling its inventory more quickly'],
  sol: 'Fewer turns of trade payables means each rupee owed to suppliers stays unpaid longer; if the credit terms have not changed, the delay may come from a shortage of cash.',
}));

Q('m_wct_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The revenue from operations of an imagined company, Matki Clay Pots Ltd, Mandsaur, was the same in two years, but its working capital turnover ratio rose from 6 times to 9 times. This means that',
  opts: ['its working capital has fallen, so each rupee of working capital now supports more revenue', 'its working capital has risen by half', 'its revenue from operations has risen by half', 'its current liabilities have fallen'],
  sol: 'The ratio divides revenue by working capital; with the revenue fixed, a larger result can only come from a smaller working capital.',
}));

Q('ar_itr', ar({
  t: 3, d: 2, c: 'understanding', key: 'a',
  a: 'The inventory turnover ratio of an imagined company, Panthi Poha Mills Ltd, Bhatapara, is found by dividing its cost of revenue from operations by its average inventory.',
  r: 'Inventory is valued at cost, so it should be compared with the cost of revenue from operations.',
  sol: 'Both are true: inventory is valued at cost, so it is compared with the cost of revenue from operations rather than with revenue. R explains A.',
}));

const DB = { cost: 1800000, open: 220000, close: 260000 };
const DB_avg = avg(DB.open, DB.close);
const DB_r = pin(times(DB.cost, DB_avg), 7.5, 'Dhunuchi ITR');
Q('n_itr', num({
  t: 3, d: 3, c: 'application', marks: 1, value: DB_r.v, unit: 'times', tol: 0.01,
  stem: `Dhunuchi Brass Lamps Ltd, an imagined company in Nabadwip, had a cost of revenue from operations of ${rs(DB.cost)}. Its inventory was ${rs(DB.open)} at the start of the year and ${rs(DB.close)} at the end. Find its inventory turnover ratio (in times).`,
  sol: `Average inventory = (${fig(DB.open)} + ${fig(DB.close)}) ÷ 2 = ${fig(DB_avg)}. Inventory turnover = ${show(DB_r)}.`,
}));

Q('tf_itr_high', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the inventory turnover ratio of an imagined metal-craft maker, Kamsale Metal Craft Ltd, Chamarajanagar, rises from 5 times to 8 times while its prices stay the same, its stock is now being sold faster.',
  sol: 'More turns of average inventory in a year mean each lot of stock spends less time in the store before it is sold.',
}));

const PI = { rev: 3600000, cashPct: 25, dO: 240000, dC: 260000, bO: 60000, bC: 40000 };
const PI_credit = PI.rev - pctOf(PI.cashPct, PI.rev);
const PI_avg = avg(PI.dO + PI.bO, PI.dC + PI.bC);
const PI_r = pin(times(PI_credit, PI_avg), 9, 'Paika TRT');
Q('s2_trt', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `Paika Iron Works Ltd, an imagined company in Khordha, had revenue from operations of ${rs(PI.rev)}; ${PI.cashPct}% of it was for cash. Its debtors were ${rs(PI.dO)} on 1 April 2025 and ${rs(PI.dC)} on 31 March 2026, and its bills receivable ${rs(PI.bO)} and ${rs(PI.bC)}. Calculate its trade receivables turnover ratio.`,
  model: `- Credit revenue from operations = ${fig(PI.rev)} − ${PI.cashPct}% of ${fig(PI.rev)} = ${fig(PI_credit)}.\n- Trade receivables = debtors + bills receivable: opening ${fig(PI.dO)} + ${fig(PI.bO)} = ${fig(PI.dO + PI.bO)}; closing ${fig(PI.dC)} + ${fig(PI.bC)} = ${fig(PI.dC + PI.bC)}; average ${fig(PI_avg)}.\n- Trade receivables turnover = ${F.trt} = ${show(PI_r)}.`,
  sol: 'Use only credit revenue; add the bills receivable to the debtors at each date before averaging.',
  scheme: [[`Credit revenue ${rs(PI_credit)} and average receivables ${rs(PI_avg)}`, 1], [`Turnover ${PI_r.s}`, 1]],
}));

Q('s2_itr_signal', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined sweet-maker, Nritta Sweets Ltd, Mandya, is comparing its inventory turnover ratio with that of other sweet-makers. State what (a) a very high and (b) a very low inventory turnover ratio may indicate about its stock.',
  model: '**(a) Very high:** stock is sold quickly and little money is locked in it, which is efficient for perishable sweets; but if it is far above the trade average, Nritta may be holding too little stock and losing sales when demand rises.\n\n**(b) Very low:** stock is moving slowly: too much has been made or bought, some may be stale or unsaleable, and money that could earn elsewhere is tied up in the godown.',
  sol: 'One reading for each extreme, with the risk it carries.',
  scheme: [['(a) High turnover: efficient, possible risk of under-stocking', 1], ['(b) Low turnover: overstocking or slow-moving stock', 1]],
}));

const LD = { rev: 2400000, gpOnCost: 25, open: 230000, close: 250000 };
const LD_cost = mulDiv(LD.rev, 100, 100 + LD.gpOnCost);
const LD_avg = avg(LD.open, LD.close);
const LD_r = pin(times(LD_cost, LD_avg), 8, 'Lasya ITR');
check(LD_cost === 1920000 && pctOf(LD.gpOnCost, LD_cost) + LD_cost === LD.rev, 'Lasya cost');
Q('s2_itr_cost', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `Lasya Dry Fruits Ltd, an imagined company in Amritsar, had revenue from operations of ${rs(LD.rev)} and earns a gross profit of ${LD.gpOnCost}% on cost. Its inventory was ${rs(LD.open)} at the start of the year and ${rs(LD.close)} at the end. Calculate its inventory turnover ratio.`,
  model: `- Gross profit is ${LD.gpOnCost}% on cost, so revenue is ${100 + LD.gpOnCost}% of cost: cost of revenue from operations = ${fig(LD.rev)} × 100 ÷ ${100 + LD.gpOnCost} = ${fig(LD_cost)}.\n- Average inventory = (${fig(LD.open)} + ${fig(LD.close)}) ÷ 2 = ${fig(LD_avg)}.\n- Inventory turnover = ${F.itr} = ${show(LD_r)}.`,
  sol: 'A margin on cost is turned into cost by dividing revenue by one plus the margin; then divide by the average inventory.',
  scheme: [[`Cost of revenue from operations ${rs(LD_cost)}`, 1], [`Turnover ${LD_r.s}`, 1]],
}));

const KB = { itr: 6, rev: 2100000, gpPct: 20, gap: 40000 };
const KB_cost = KB.rev - pctOf(KB.gpPct, KB.rev);
const KB_avg = KB_cost / KB.itr;
check(Number.isInteger(KB_avg), 'Koodiyattam average');
const KB_open = KB_avg - KB.gap / 2;
const KB_close = KB_open + KB.gap;
check(avg(KB_open, KB_close) === KB_avg && KB_open === 260000 && KB_close === 300000, 'Koodiyattam inventories');
pin(times(KB_cost, avg(KB_open, KB_close)), KB.itr, 'Koodiyattam recomputed');
Q('s3_itr_missing', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `Koodiyattam Banana Chips Ltd, an imagined company in Ottapalam, turned over its inventory ${KB.itr} times in 2025-26. Its revenue from operations was ${rs(KB.rev)} and it earned a gross profit of ${KB.gpPct}% on revenue. Its closing inventory was ${rs(KB.gap)} more than its opening inventory. Find its average inventory, opening inventory and closing inventory.`,
  model: `- Cost of revenue from operations = ${fig(KB.rev)} − ${KB.gpPct}% of ${fig(KB.rev)} = ${fig(KB_cost)}.\n- Average inventory = cost ÷ inventory turnover = ${fig(KB_cost)} ÷ ${KB.itr} = **${rs(KB_avg)}**.\n- Opening + closing = 2 × ${fig(KB_avg)} = ${fig(2 * KB_avg)}, and closing exceeds opening by ${fig(KB.gap)}: opening inventory = (${fig(2 * KB_avg)} − ${fig(KB.gap)}) ÷ 2 = **${rs(KB_open)}**; closing inventory = **${rs(KB_close)}**.\n\nCheck: ${show(times(KB_cost, avg(KB_open, KB_close)))}.`,
  sol: 'Turnover gives the average; the average and the known difference then split into the two year-end figures.',
  scheme: [[`Average inventory ${rs(KB_avg)}`, 1], [`Opening inventory ${rs(KB_open)}`, 1], [`Closing inventory ${rs(KB_close)}`, 1]],
}));

const RM = { rev: 4800000, credit: 4000000, trO: 360000, trC: 440000, pur: 2700000, tpO: 280000, tpC: 320000, ca: 900000, cl: 300000 };
const RM_trt = pin(times(RM.credit, avg(RM.trO, RM.trC)), 10, 'Rasleela TRT');
const RM_tpt = pin(times(RM.pur, avg(RM.tpO, RM.tpC)), 9, 'Rasleela TPT');
const RM_wct = pin(times(RM.rev, RM.ca - RM.cl), 8, 'Rasleela WCT');
Q('s3_turnover3', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Rasleela Marble Crafts Ltd, an imagined company in Rajsamand, gives for 2025-26: revenue from operations ${rs(RM.rev)}, of which ${rs(RM.credit)} on credit; net credit purchases ${rs(RM.pur)}; trade receivables ${rs(RM.trO)} at the start and ${rs(RM.trC)} at the end of the year; trade payables ${rs(RM.tpO)} and ${rs(RM.tpC)}; at the year end, current assets ${rs(RM.ca)} and current liabilities ${rs(RM.cl)}. Calculate its trade receivables turnover, trade payables turnover and working capital turnover ratios.`,
  model: `Average trade receivables = ${fig(avg(RM.trO, RM.trC))}; average trade payables = ${fig(avg(RM.tpO, RM.tpC))}; working capital = ${fig(RM.ca)} − ${fig(RM.cl)} = ${fig(RM.ca - RM.cl)}.\n\n${ratioTable([['Trade receivables turnover', F.trt, RM_trt], ['Trade payables turnover', F.tpt, RM_tpt], ['Working capital turnover', F.wct, RM_wct]])}`,
  sol: 'Average the opening and closing receivables and payables; working capital is taken at the year end.',
  scheme: [[`Trade receivables turnover ${RM_trt.s}`, 1], [`Trade payables turnover ${RM_tpt.s}`, 1], [`Working capital turnover ${RM_wct.s}`, 1]],
}));

const AD_T = trading({ rev: 6000000, open: 420000, purchases: 4600000, direct: 100000, close: 520000 });
const AD = { credit: 4800000, trO: 380000, trC: 420000, crPur: 4000000, tpO: 290000, tpC: 350000, ca: 1200000, cl: 400000 };
const AD_itr = pin(times(AD_T.cost, AD_T.avgInv), 9.79, 'Adavu ITR');
const AD_trt = pin(times(AD.credit, avg(AD.trO, AD.trC)), 12, 'Adavu TRT');
const AD_tpt = pin(times(AD.crPur, avg(AD.tpO, AD.tpC)), 12.5, 'Adavu TPT');
const AD_wct = pin(times(AD_T.rev, AD.ca - AD.cl), 7.5, 'Adavu WCT');
check(AD_T.cost === 4600000 && !AD_itr.exact, 'Adavu cost');
Q('l5_activity', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Adavu Steel Trunks Ltd, an imagined company in Haveri, gives for the year ended 31 March 2026: revenue from operations ${rs(AD_T.rev)} (credit ${rs(AD.credit)}); opening inventory ${rs(AD_T.open)}; purchases ${rs(AD_T.purchases)} (credit ${rs(AD.crPur)}); carriage inwards ${rs(AD_T.direct)}; closing inventory ${rs(AD_T.close)}; trade receivables ${rs(AD.trO)} at the start and ${rs(AD.trC)} at the end of the year; trade payables ${rs(AD.tpO)} and ${rs(AD.tpC)}; current assets ${rs(AD.ca)} and current liabilities ${rs(AD.cl)} at the year end.\n\n(a) Calculate the cost of revenue from operations and the inventory turnover ratio. [2]\n\n(b) Calculate the trade receivables turnover, trade payables turnover and working capital turnover ratios. [3]`,
  model: `**(a)** Cost of revenue from operations = opening inventory + purchases + carriage inwards − closing inventory = ${fig(AD_T.open)} + ${fig(AD_T.purchases)} + ${fig(AD_T.direct)} − ${fig(AD_T.close)} = **${rs(AD_T.cost)}**. Average inventory = (${fig(AD_T.open)} + ${fig(AD_T.close)}) ÷ 2 = ${fig(AD_T.avgInv)}. Inventory turnover = ${show(AD_itr)}.\n\n**(b)** Average trade receivables = ${fig(avg(AD.trO, AD.trC))}; average trade payables = ${fig(avg(AD.tpO, AD.tpC))}; working capital = ${fig(AD.ca)} − ${fig(AD.cl)} = ${fig(AD.ca - AD.cl)}.\n\n${ratioTable([['Trade receivables turnover', F.trt, AD_trt], ['Trade payables turnover', F.tpt, AD_tpt], ['Working capital turnover', F.wct, AD_wct]])}`,
  sol: 'Carriage inwards is a direct expense and belongs in the cost of revenue; credit figures drive the receivables and payables ratios.',
  scheme: [[`(a) Cost of revenue from operations ${rs(AD_T.cost)}`, 1], [`(a) Inventory turnover ${AD_itr.s}`, 1], [`(b) Receivables turnover ${AD_trt.s}`, 1], [`(b) Payables turnover ${AD_tpt.s}`, 1], [`(b) Working capital turnover ${AD_wct.s}`, 1]],
}));

// ================================================================ t04 Profitability ratios
const TH = { sales: 2600000, ret: 100000, cost: 1875000 };
const TH_rev = TH.sales - TH.ret;
const TH_gp = TH_rev - TH.cost;
const TH_r = pin(pct(TH_gp, TH_rev), 25, 'Tatkar GP');
const TH_x1 = pin(pct(TH_gp, TH.sales), 24.04, 'Tatkar on gross sales');
const TH_x2 = pin(pct(TH_gp, TH.cost), 33.33, 'Tatkar on cost');
const TH_x3 = pin(pct(TH.cost, TH_rev), 75, 'Tatkar cost share');
Q('m_gp_compute', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Tatkar Hand Tools Ltd, an imagined company in Jetpur, made sales of ${rs(TH.sales)} and accepted sales returns of ${rs(TH.ret)}. Its cost of revenue from operations was ${rs(TH.cost)}. Its gross profit ratio is`,
  opts: [TH_r.s, TH_x1.s, TH_x2.s, TH_x3.s],
  sol: `Revenue from operations = ${fig(TH.sales)} − ${fig(TH.ret)} = ${fig(TH_rev)}; gross profit = ${fig(TH_gp)}; ratio = ${show(TH_r)}. Dividing by gross sales gives ${TH_x1.s}; dividing by cost gives the mark-up, ${TH_x2.s}.`,
}));

const GB = { rev: 5000000, opCost: 4130000 };
const GB_or = pin(pct(GB.opCost, GB.rev), 82.6, 'Ghungroo OR');
const GB_opr = pin(pct(GB.rev - GB.opCost, GB.rev), 17.4, 'Ghungroo OPR');
check(Math.round((GB_or.v + GB_opr.v) * 100) === 10000, 'Ghungroo sum');
Q('m_or_opr', mcq({
  t: 4, d: 2, c: 'application',
  stem: `The operating ratio of an imagined company, Ghungroo Glass Beads Ltd, Tundla, is ${GB_or.s} for 2025-26. Its operating profit ratio for the same year is`,
  opts: [GB_opr.s, GB_or.s, `${(GB_or.v / 10).toFixed(2)}%`, 'impossible to find without its gross profit'],
  sol: `Operating cost and operating profit together make up revenue from operations, so the operating profit ratio = 100 − ${GB_or.v} = ${GB_opr.v}%.`,
}));

Q('m_nonop', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Natya Paper Products Ltd, an imagined company in Sattur, is working out its operating ratio. Which of these items does it leave out of operating expenses?',
  opts: ['A loss on the sale of an old delivery van', 'Salaries of the office staff', 'Depreciation on its printing machines', 'Advertisement expenses for its notebooks'],
  sol: 'Operating expenses are the costs of running the business (employee benefits, depreciation, office and selling costs). A loss on selling a fixed asset is a non-operating item; it affects net profit but not the operating ratio.',
}));

Q('tf_or_opr_sum', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the operating ratio of an imagined saddle maker, Kachhi Ghodi Saddlery Ltd, Tonk, is 87 per cent, its operating profit ratio must be 13 per cent.',
  sol: 'Both are measured on revenue from operations; operating cost and operating profit add up to that revenue, so the two ratios always add up to 100 per cent.',
}));

const LZ = { rev: 4000000, cost: 2940000, opex: 620000 };
const LZ_r = pin(pct(LZ.cost + LZ.opex, LZ.rev), 89, 'Lezim OR');
Q('n_or', num({
  t: 4, d: 2, c: 'application', marks: 1, value: LZ_r.v, unit: '%', tol: 0.01,
  stem: `Lezim Steel Furniture Ltd, an imagined company in Sinnar, had revenue from operations of ${rs(LZ.rev)}, a cost of revenue from operations of ${rs(LZ.cost)} and operating expenses of ${rs(LZ.opex)}. Find its operating ratio (in %).`,
  sol: `Operating cost = ${fig(LZ.cost)} + ${fig(LZ.opex)} = ${fig(LZ.cost + LZ.opex)}. Operating ratio = ${show(LZ_r)}.`,
}));

const JR = { pat: 960000, prefCap: 600000, prefRate: 10, shares: 300000 };
const JR_pd = pctOf(JR.prefRate, JR.prefCap);
const JR_r = pin(eps(JR.pat - JR_pd, JR.shares), 3, 'Jhumar EPS');
const JR_x1 = pin(eps(JR.pat, JR.shares), 3.2, 'Jhumar no preference');
const JR_x2 = pin(eps(JR.pat - JR_pd, JR.shares + JR.prefCap / 10), 2.5, 'Jhumar preference shares counted');
const JR_x3 = pin(eps(JR.pat - JR_pd, JR.shares * 10), 0.3, 'Jhumar on capital');
Q('m_eps_compute', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Jhumar Roof Tiles Ltd, an imagined company in Kumta, earned a profit after tax of ${rs(JR.pat)}. Its share capital is ${rs(JR.shares * 10)} in equity shares of ₹10 each and ${rs(JR.prefCap)} in ${JR.prefRate}% preference shares of ₹10 each. Its earnings per share are`,
  opts: [JR_r.s, JR_x1.s, JR_x2.s, JR_x3.s],
  sol: `Preference dividend = ${JR.prefRate}% of ${fig(JR.prefCap)} = ${fig(JR_pd)}. Earnings for equity shareholders = ${fig(JR.pat - JR_pd)}; equity shares = ${fig(JR.shares)}. Earnings per share = ${show(JR_r)}. Ignoring the preference dividend gives ${JR_x1.s}.`,
}));

const RA = { pat: 1350000, shares: 300000, mps: 54 };
const RA_eps = pin(eps(RA.pat, RA.shares), 4.5, 'Raas EPS');
const RA_r = pin(pe(RA.mps, RA_eps), 12, 'Raas P/E');
const RA_x1 = pin(times(RA_eps.v * 100, RA.mps * 100 / 100), 8.33, 'Raas inverted percent');
Q('m_pe_compute', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Raas Agate Crafts Ltd, an imagined company in Rajpipla, has ${fig(RA.shares)} equity shares and no preference shares. Its profit after tax for the year is ${rs(RA.pat)}, and its shares sell at ₹${RA.mps} each on the stock exchange. Its price-earnings ratio is`,
  opts: [RA_r.s, `${RA_eps.v} times`, RA_x1.s, '18 times'],
  sol: `Earnings per share = ${show(RA_eps)}. Price-earnings ratio = ${show(RA_r)}: buyers pay twelve rupees for each rupee the share earns in a year.`,
}));

const MB = { sf: 3000000, deb: 1000000, rate: 10, pat: 315000, tax: 30 };
const MB_pbt = mulDiv(MB.pat, 100, 100 - MB.tax);
const MB_int = pctOf(MB.rate, MB.deb);
const MB_pbit = MB_pbt + MB_int;
const MB_ce = MB.sf + MB.deb;
const MB_r = pin(pct(MB_pbit, MB_ce), 13.75, 'Manipuri ROI');
const MB_x1 = pin(pct(MB.pat, MB_ce), 7.88, 'Manipuri PAT');
const MB_x2 = pin(pct(MB_pbt, MB_ce), 11.25, 'Manipuri PBT');
const MB_x3 = pin(pct(MB_pbit, MB.sf), 18.33, 'Manipuri on SF');
Q('m_roi_pbit', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Manipuri Black Pottery Ltd, an imagined company in Moirang, has shareholders' funds of ${rs(MB.sf)} and ${MB.rate}% debentures of ${rs(MB.deb)}, its only non-current liability. Its profit after tax is ${rs(MB.pat)}; tax is ${MB.tax}% of profit before tax. Its return on investment is`,
  opts: [MB_r.s, MB_x1.s, MB_x2.s, MB_x3.s],
  sol: `Profit before tax = ${fig(MB_pbt)}; add debenture interest ${fig(MB_int)}: profit before interest and tax = ${fig(MB_pbit)}. Capital employed = ${fig(MB.sf)} + ${fig(MB.deb)} = ${fig(MB_ce)}. Return on investment = ${show(MB_r)}.`,
}));

Q('m_ce_parts', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined granite quarrying company, Veeragase Granite Ltd, Chitradurga, works out its capital employed from the liabilities side of its balance sheet. Which item does it leave out?',
  opts: ['Trade payables', 'Equity share capital', 'Long-term borrowings from a bank', 'Securities premium'],
  sol: "Capital employed is the long-term money in the business: shareholders' funds (including securities premium) plus non-current liabilities. Trade payables are current liabilities and are left out.",
}));

Q('fb_eps', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The earnings per share of an imagined company, Dollu Kunitha Drums Ltd, Bhadravati, are found by dividing the profit left for its equity shareholders by the number of its ___ shares.',
  acc: [['equity', 'equity shares']],
  sol: 'Profit after tax less preference dividend is shared among the equity shares, so the divisor is the number of equity shares.',
}));

Q('fb_ce', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Worked from the assets side of the balance sheet of an imagined company, Puliyattam Tile Works Ltd, Feroke, capital employed equals non-current assets plus ___.',
  acc: [['working capital', 'net working capital']],
  sol: "Non-current assets plus working capital (current assets − current liabilities) gives the same capital employed as shareholders' funds plus non-current liabilities.",
}));

Q('ar_pe', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'Since its price-earnings ratio is 25 against 10 for a rival, an imagined company, Tippani Ceramics Ltd, Wankaner, must have the higher earnings per share of the two.',
  r: 'The price-earnings ratio is the earnings per share divided by the market price per equity share.',
  sol: 'Both are false: the P/E ratio is the market price per share divided by the earnings per share, so a higher figure can come from a higher share price or from lower earnings; on its own it does not show which company earns more per share.',
}));

const GT = { pat: 720000, pd: 120000, shares: 240000 };
const GT_r = pin(eps(GT.pat - GT.pd, GT.shares), 2.5, 'Gaudiya EPS');
Q('n_eps', num({
  t: 4, d: 2, c: 'application', marks: 1, value: GT_r.v, unit: '₹', tol: 0.01,
  stem: `Gaudiya Terracotta Ltd, an imagined company in Sonamukhi, earned a profit after tax of ${rs(GT.pat)} and must pay a preference dividend of ${rs(GT.pd)}. It has ${fig(GT.shares)} equity shares. Find its earnings per share (in ₹).`,
  sol: `Earnings for equity shareholders = ${fig(GT.pat)} − ${fig(GT.pd)} = ${fig(GT.pat - GT.pd)}. Earnings per share = ${fig(GT.pat - GT.pd)} ÷ ${fig(GT.shares)} = 2.5, that is ${GT_r.s}.`,
}));

const JW = { sf: 2500000, loan: 800000, pbt: 420000, int: 80000 };
const JW_r = pin(pct(JW.pbt + JW.int, JW.sf + JW.loan), 15.15, 'Jawara ROI');
Q('n_roi', num({
  t: 4, d: 3, c: 'application', marks: 1, value: JW_r.v, unit: '%', tol: 0.01,
  stem: `Jawara Seeds Ltd, an imagined company in Damoh, has shareholders' funds of ${rs(JW.sf)} and a long-term loan of ${rs(JW.loan)}. Its profit before tax, after charging ${rs(JW.int)} of interest on the loan, was ${rs(JW.pbt)}. Find its return on investment (in %, to two decimal places).`,
  sol: `Profit before interest and tax = ${fig(JW.pbt)} + ${fig(JW.int)} = ${fig(JW.pbt + JW.int)}; capital employed = ${fig(JW.sf)} + ${fig(JW.loan)} = ${fig(JW.sf + JW.loan)}. Return on investment = ${show(JW_r)}.`,
}));

const FK = { pat: 1260000, prefCap: 500000, prefRate: 9, shares: 450000, mps: 27 };
const FK_pd = pctOf(FK.prefRate, FK.prefCap);
const FK_eps = pin(eps(FK.pat - FK_pd, FK.shares), 2.7, 'Fugdi EPS');
const FK_pe = pin(pe(FK.mps, FK_eps), 10, 'Fugdi P/E');
Q('s2_eps_pe', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: `Fugdi Kokum Products Ltd, an imagined company in Canacona, earned a profit after tax of ${rs(FK.pat)}. It has ${rs(FK.prefCap)} of ${FK.prefRate}% preference shares and ${fig(FK.shares)} equity shares, which sell at ₹${FK.mps} each. Calculate its earnings per share and its price-earnings ratio.`,
  model: `- Preference dividend = ${FK.prefRate}% of ${fig(FK.prefCap)} = ${fig(FK_pd)}; earnings for equity shareholders = ${fig(FK.pat)} − ${fig(FK_pd)} = ${fig(FK.pat - FK_pd)}.\n- Earnings per share = ${F.eps} = ${show(FK_eps)}.\n- Price-earnings ratio = ${F.pe} = ${show(FK_pe)}.`,
  sol: 'Take the preference dividend out first; the price-earnings ratio then divides the market price by that earnings per share.',
  scheme: [[`Earnings per share ${FK_eps.s}`, 1], [`Price-earnings ratio ${FK_pe.s}`, 1]],
}));

Q('s2_or_vs_opr', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of an imagined company, Dekhni Shellcraft Ltd, Mapusa, reports both an operating ratio and an operating profit ratio. Distinguish between the two ratios and state how they are related.',
  model: '**Operating ratio:** operating cost (the cost of revenue from operations together with the operating expenses) expressed as a percentage of revenue from operations. For Dekhni it shows how much of each rupee of revenue is used up in making and selling its shell articles; a lower figure is better.\n\n**Operating profit ratio:** operating profit (gross profit less operating expenses) expressed as a percentage of revenue from operations. It shows how much of each rupee of revenue is left as profit from the main business; a higher figure is better.\n\n**Relation:** both are measured on the same base, and operating cost plus operating profit makes up the whole of that revenue, so the two percentages always total 100.',
  sol: 'Give each formula with what it shows, then the link between them.',
  scheme: [['Both formulas with meaning', 1], ['The two ratios add up to 100 per cent', 1]],
}));

const BA = results({ rev: 3200000, cost: 2400000, opex: [['Office and administration expenses', 240000], ['Selling and distribution expenses', 160000]], nonop: [['Loss by fire (uninsured)', 50000]], interest: 40000 });
const BA_gp = pin(pct(BA.gp, BA.rev), 25, 'Bhortal GP');
const BA_or = pin(pct(BA.opCost, BA.rev), 87.5, 'Bhortal OR');
const BA_opr = pin(pct(BA.opProfit, BA.rev), 12.5, 'Bhortal OPR');
check(BA_or.v + BA_opr.v === 100, 'Bhortal OR + OPR');
Q('s3_op_ratios', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Bhortal Agarwood Ltd, an imagined company in Doboka, gives for 2025-26: revenue from operations ${rs(BA.rev)}; cost of revenue from operations ${rs(BA.cost)}; office and administration expenses ${rs(240000)}; selling and distribution expenses ${rs(160000)}; loss by fire (uninsured) ${rs(50000)}; interest on debentures ${rs(BA.interest)}. Calculate its gross profit ratio, operating ratio and operating profit ratio.`,
  model: `- Gross profit = ${fig(BA.rev)} − ${fig(BA.cost)} = ${fig(BA.gp)}.\n- Operating cost = ${fig(BA.cost)} + ${fig(240000)} + ${fig(160000)} = ${fig(BA.opCost)}; operating profit = ${fig(BA.rev)} − ${fig(BA.opCost)} = ${fig(BA.opProfit)}.\n\n${ratioTable([['Gross profit ratio', F.gp, BA_gp], ['Operating ratio', F.or, BA_or], ['Operating profit ratio', F.opr, BA_opr]])}\n\nThe loss by fire is non-operating and the debenture interest is a finance cost, so neither enters the operating ratios. Check: ${BA_or.s} + ${BA_opr.s} = 100%.`,
  sol: 'Separate operating from non-operating items before any division; the last two ratios must add up to 100.',
  scheme: [[`Gross profit ratio ${BA_gp.s}`, 1], [`Operating ratio ${BA_or.s}`, 1], [`Operating profit ratio ${BA_opr.s}`, 1]],
}));

const CA_ = { pat: 1760000, prefCap: 1000000, prefRate: 8, shares: 480000, mps: 42, target: 16 };
const CA_pd = pctOf(CA_.prefRate, CA_.prefCap);
const CA_eps = pin(eps(CA_.pat - CA_pd, CA_.shares), 3.5, 'Chholiya EPS');
const CA_pe = pin(pe(CA_.mps, CA_eps), 12, 'Chholiya P/E');
const CA_price = Math.round(CA_.target * CA_eps.v * 100) / 100;
check(Number.isInteger(CA_price) && CA_price === 56, 'Chholiya target price');
pin(pe(CA_price, CA_eps), CA_.target, 'Chholiya target recomputed');
Q('s3_eps_pe', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Chholiya Apple Orchards Ltd, an imagined company in Dwarahat, earned a profit after tax of ${rs(CA_.pat)} in 2025-26. Its share capital consists of ${rs(CA_.shares * 10)} in equity shares of ₹10 each and ${rs(CA_.prefCap)} in ${CA_.prefRate}% preference shares. Its equity shares sell at ₹${CA_.mps}. Calculate (a) its earnings per share, (b) its price-earnings ratio, and (c) the market price at which its price-earnings ratio would be ${CA_.target}.`,
  model: `**(a)** Preference dividend = ${CA_.prefRate}% of ${fig(CA_.prefCap)} = ${fig(CA_pd)}. Number of equity shares = ${fig(CA_.shares * 10)} ÷ 10 = ${fig(CA_.shares)}. Earnings per share = ${show(CA_eps)}.\n\n**(b)** Price-earnings ratio = ${show(CA_pe)}.\n\n**(c)** Market price = price-earnings ratio × earnings per share = ${CA_.target} × ${CA_eps.s} = **₹${CA_price}**. Check: ${show(pe(CA_price, CA_eps))}.`,
  sol: 'Count the equity shares from the capital and face value; the price for a given P/E is that P/E times the earnings per share.',
  scheme: [[`(a) ${CA_eps.s}`, 1], [`(b) ${CA_pe.s}`, 1], [`(c) ₹${CA_price}`, 1]],
}));

const JH = position({ sc: 2500000, rs: 700000, ltb: 800000, tp: 400000, stp: 100000, ppe: 3000000, nci: 400000, inv: 500000, tr: 400000, cce: 200000, lab: { ltb: '11% Debentures' } });
const JH_int = pctOf(11, JH.ltb);
const JH_pbt = 512000;
const JH_r = pin(pct(JH_pbt + JH_int, JH.ce), 15, 'Jhora ROI');
check(JH.ce === 4000000 && JH.nca + JH.wc === JH.ce && JH.total - JH.cl === JH.ce, 'Jhora CE three ways');
Q('s3_roi_ce', short({
  t: 4, d: 4, c: 'application', marks: 3,
  stem: `Jhora Herbal Teas Ltd, an imagined company in Pithoragarh, has: share capital ${rs(JH.sc)}; reserves and surplus ${rs(JH.rs)}; 11% debentures ${rs(JH.ltb)}; current liabilities ${rs(JH.cl)}; non-current assets ${rs(JH.nca)}; current assets ${rs(JH.ca)}. Its profit before tax is ${rs(JH_pbt)}, after charging interest on the debentures for the whole year. Compute its capital employed in two ways and its return on investment.`,
  model: `- **Liabilities side:** shareholders' funds (${fig(JH.sc)} + ${fig(JH.rs)}) + non-current liabilities ${fig(JH.ltb)} = **${rs(JH.ce)}**.\n- **Assets side:** non-current assets ${fig(JH.nca)} + working capital (${fig(JH.ca)} − ${fig(JH.cl)} = ${fig(JH.wc)}) = **${rs(JH.nca + JH.wc)}**.\n- Profit before interest and tax = ${fig(JH_pbt)} + debenture interest (11% of ${fig(JH.ltb)}) ${fig(JH_int)} = ${fig(JH_pbt + JH_int)}.\n- Return on investment = ${F.roi} = ${show(JH_r)}.`,
  sol: 'The two routes to capital employed must meet; debenture interest is added back because the debentures are part of the capital employed.',
  scheme: [['Capital employed from the liabilities side', 1], ['Capital employed from the assets side (same figure)', 1], [`Return on investment ${JH_r.s}`, 1]],
}));

Q('s3_profit_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 3,
  stem: 'A retired teacher holds equity shares of an imagined company, Wangala Pineapple Ltd, Williamnagar. Explain what (a) earnings per share, (b) the price-earnings ratio and (c) return on investment tell her about the company.',
  model: '**(a) Earnings per share** (profit after tax less preference dividend, per equity share) shows how much the company has earned for each of her shares in the year, whether or not it is paid out as dividend. Rising earnings per share points to a growing business.\n\n**(b) Price-earnings ratio** (market price per share ÷ earnings per share) shows how many rupees the market pays for each rupee of yearly earnings. A high figure means investors expect earnings to grow, or that the share is costly; compared with similar companies it helps her judge whether to hold or sell.\n\n**(c) Return on investment** (profit before interest and tax ÷ capital employed × 100) shows how well the management uses all the long-term funds in the business. If it is higher than the rate of interest the company pays, borrowing adds to what is left for shareholders.',
  sol: 'One mark for each ratio: what it measures and how an equity shareholder reads it.',
  scheme: [['(a) Earnings per share explained', 1], ['(b) Price-earnings ratio explained', 1], ['(c) Return on investment explained', 1]],
}));

const BG_sales = 8200000;
const BG_ret = 200000;
const BG_T = trading({ rev: BG_sales - BG_ret, open: 600000, purchases: 5800000, direct: 400000, close: 800000 });
const BG = results({ rev: BG_T.rev, cost: BG_T.cost, opex: [['Employee benefits expense', 400000], ['Depreciation and amortisation', 160000], ['Other operating expenses', 240000]], oi: [['Dividend received', 40000]], nonop: [['Loss on sale of investments', 40000]], interest: pctOf(12, 1000000), taxRate: 25 });
const BG_gp = pin(pct(BG.gp, BG.rev), 25, 'Bagurumba GP');
const BG_or = pin(pct(BG.opCost, BG.rev), 85, 'Bagurumba OR');
const BG_opr = pin(pct(BG.opProfit, BG.rev), 15, 'Bagurumba OPR');
const BG_np = pin(pct(BG.pat, BG.rev), 10.13, 'Bagurumba NP');
check(BG_T.cost === 6000000 && BG.pat === 810000 && !BG_np.exact, 'Bagurumba profit');
Q('l5_profit', long({
  t: 4, d: 3, c: 'application', marks: 5,
  stem: `Bagurumba Agro Ltd, an imagined company in Kokrajhar, gives for the year ended 31 March 2026: sales ${rs(BG_sales)}; sales returns ${rs(BG_ret)}; opening inventory ${rs(BG_T.open)}; purchases ${rs(BG_T.purchases)}; wages ${rs(BG_T.direct)}; closing inventory ${rs(BG_T.close)}; employee benefits expense (office) ${rs(400000)}; depreciation and amortisation ${rs(160000)}; other operating expenses ${rs(240000)}; dividend received ${rs(40000)}; loss on sale of investments ${rs(40000)}; interest on 12% debentures of ${rs(1000000)} for the full year; tax at 25% of profit before tax.\n\n(a) Find the revenue from operations, the cost of revenue from operations and the gross profit ratio. [2]\n\n(b) Calculate the operating ratio, the operating profit ratio and the net profit ratio. [3]`,
  model: `**(a)** Revenue from operations = ${fig(BG_sales)} − ${fig(BG_ret)} = **${rs(BG.rev)}**. Cost of revenue from operations = ${fig(BG_T.open)} + ${fig(BG_T.purchases)} + ${fig(BG_T.direct)} − ${fig(BG_T.close)} = **${rs(BG_T.cost)}**. Gross profit ratio = ${show(BG_gp)}.\n\n**(b)** Operating statement:\n\n${resultRows(BG).md}\n\n${ratioTable([['Operating ratio', F.or, BG_or], ['Operating profit ratio', F.opr, BG_opr], ['Net profit ratio', F.npr, BG_np]])}\n\nThe dividend received and the loss on sale of investments are non-operating: they reach net profit but not the operating ratios.`,
  sol: 'Wages are a direct expense in the cost of revenue; arrange the rest as an operating statement down to profit after tax before dividing.',
  scheme: [[`(a) Revenue ${rs(BG.rev)} and cost ${rs(BG_T.cost)}`, 1], [`(a) Gross profit ratio ${BG_gp.s}`, 1], [`(b) Operating ratio ${BG_or.s}`, 1], [`(b) Operating profit ratio ${BG_opr.s}`, 1], [`(b) Net profit ratio ${BG_np.s}`, 1]],
}));

const LB_P = position({ sc: 2500000, rs: 1000000, ltb: 1000000, ltp: 500000, tp: 450000, stp: 150000, ppe: 4000000, intang: 400000, inv: 500000, tr: 450000, cce: 250000, lab: { sc: 'Share capital (equity ₹20,00,000; 10% preference ₹5,00,000)', ltb: '12% Debentures' } });
const LB = { pbit: 800000, shares: 200000, prefCap: 500000, mps: 23 };
const LB_int = pctOf(12, LB_P.ltb);
const LB_pbt = LB.pbit - LB_int;
const LB_tax = pctOf(25, LB_pbt);
const LB_pat = LB_pbt - LB_tax;
const LB_pd = pctOf(10, LB.prefCap);
const LB_eps = pin(eps(LB_pat - LB_pd, LB.shares), 2.3, 'Lebang EPS');
const LB_pe = pin(pe(LB.mps, LB_eps), 10, 'Lebang P/E');
const LB_roi = pin(pct(LB.pbit, LB_P.ce), 16, 'Lebang ROI');
check(LB_P.ce === 5000000 && LB_P.nca + LB_P.wc === LB_P.ce && LB_pat === 510000 && LB.shares * 10 + LB.prefCap === LB_P.sc, 'Lebang');
Q('l5_eps_roi', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: `Lebang Spice Mills Ltd, an imagined company in Dharmanagar, earned a profit before interest and tax of ${rs(LB.pbit)} in 2025-26. Tax is 25% of profit before tax. Its equity shares have a face value of ₹10 and sell at ₹${LB.mps}. Its condensed balance sheet as at 31 March 2026 is:\n\n${positionRows(LB_P).md}\n\n(a) Compute its capital employed in two ways and its return on investment. [2]\n\n(b) Compute its earnings per share and its price-earnings ratio. [3]`,
  model: `**(a)** Capital employed = shareholders' funds ${fig(LB_P.sf)} + non-current liabilities ${fig(LB_P.ncl)} = **${rs(LB_P.ce)}**; also = non-current assets ${fig(LB_P.nca)} + working capital (${fig(LB_P.ca)} − ${fig(LB_P.cl)}) ${fig(LB_P.wc)} = ${rs(LB_P.nca + LB_P.wc)}. Return on investment = ${show(LB_roi)}.\n\n**(b)**\n\n${md(['Working', '₹'], [['Profit before interest and tax', fig(LB.pbit)], [`Less: Interest on 12% debentures of ${fig(LB_P.ltb)}`, fig(-LB_int)], [bold('Profit before tax'), bold(fig(LB_pbt))], ['Less: Tax at 25%', fig(-LB_tax)], [bold('Profit after tax'), bold(fig(LB_pat))], [`Less: Preference dividend (10% of ${fig(LB.prefCap)})`, fig(-LB_pd)], [bold('Earnings for equity shareholders'), bold(fig(LB_pat - LB_pd))]], [1])}\n\nNumber of equity shares = ${fig(LB.shares * 10)} ÷ 10 = ${fig(LB.shares)}. Earnings per share = ${show(LB_eps)}. Price-earnings ratio = ${show(LB_pe)}.`,
  sol: 'Return on investment uses profit before interest and tax as given; earnings per share needs interest, tax and the preference dividend taken out first.',
  scheme: [['(a) Capital employed both ways', 1], [`(a) Return on investment ${LB_roi.s}`, 1], [`(b) Profit after tax ${rs(LB_pat)}`, 1], [`(b) Earnings per share ${LB_eps.s}`, 1], [`(b) Price-earnings ratio ${LB_pe.s}`, 1]],
}));

// ================================================================ t05 Effects of transactions (current, quick, debt-equity only)
const TA = labelled(effects('ratio', [480000, 300000], [[`Raised a three-month bank loan of ${rs(120000)} in cash`, 120000, 120000, 'decrease']]), [120000]);
pin(TA.before, 1.6, 'Thoda before');
const TA_after = pin(TA.rows[0].after, 1.43, 'Thoda after');
const TA_x1 = pin(ratio(600000, 300000), 2, 'Thoda forgot CL');
const TA_x2 = pin(ratio(480000, 420000), 1.14, 'Thoda forgot cash');
Q('m_eff_cr', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Thoda Archery Goods Ltd, an imagined company in Rohru, has current assets of ${rs(480000)} and current liabilities of ${rs(300000)}. It raises a three-month bank loan of ${rs(120000)}, received in cash. Its current ratio will`,
  opts: [`fall to ${TA_after.s}`, `rise to ${TA_x1.s}`, `fall to ${TA_x2.s}`, `remain ${TA.before.s}`],
  sol: `Cash and the short-term loan both rise by ${fig(120000)}: ${show(TA_after)}, lower than ${TA.before.s}. An equal rise in both parts lowers a ratio that is above 1.`,
}));

const SL = labelled(effects('ratio', [330000, 220000], [[`Bought goods on credit for ${rs(55000)}`, 0, 55000, 'decrease']]), [55000]);
pin(SL.before, 1.5, 'Saila before');
const SL_after = pin(SL.rows[0].after, 1.2, 'Saila after');
const SL_x1 = pin(ratio(385000, 220000), 1.75, 'Saila inventory as quick');
const SL_x2 = pin(ratio(275000, 220000), 1.25, 'Saila quick reduced');
Q('m_eff_qr', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Saila Lac Works Ltd, an imagined company in Balod, has quick assets of ${rs(330000)} and current liabilities of ${rs(220000)}. It buys goods for ${rs(55000)} on credit. Its quick ratio will`,
  opts: [`fall to ${SL_after.s}`, `rise to ${SL_x1.s}`, `fall to ${SL_x2.s}`, `stay at ${SL.before.s}`],
  sol: `Inventory is not a quick asset, so quick assets stay at ${fig(330000)} while trade payables raise current liabilities to ${fig(275000)}: ${show(SL_after)}.`,
}));

const GM = labelled(effects('ratio', [800000, 1600000], [[`Converted ${rs(200000)} of debentures into equity shares`, -200000, 200000, 'decrease']]), [200000]);
pin(GM.before, 0.5, 'Gaur Maria before');
const GM_after = pin(GM.rows[0].after, 0.33, 'Gaur Maria after');
const GM_x1 = pin(ratio(600000, 1600000), 0.38, 'Gaur Maria debt only');
const GM_x2 = pin(ratio(1000000, 1800000), 0.56, 'Gaur Maria wrong way');
Q('m_eff_de', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Gaur Maria Mahua Products Ltd, an imagined company in Narayanpur, has long-term debt of ${rs(800000)} and shareholders' funds of ${rs(1600000)}. Holders of ${rs(200000)} of its debentures accept equity shares in exchange for them. Its debt-equity ratio will`,
  opts: [`fall to ${GM_after.s}`, `fall to ${GM_x1.s}`, `rise to ${GM_x2.s}`, `stay at ${GM.before.s}`],
  sol: `Debt falls to ${fig(600000)} and equity rises to ${fig(1800000)}: ${show(GM_after)}. Both parts move, so the fall is sharper than if only the debt had been repaid.`,
}));

const JM = effects('ratio', [400000, 200000], [
  ['bill receivable collected', 0, 0, 'no change'],
  ['creditors paid', -50000, -50000, 'increase'],
  ['machine bought for cash', -50000, 0, 'decrease'],
  ['short-term loan taken', 50000, 50000, 'decrease'],
]);
pin(JM.before, 2, 'Jhijhiya base');
Q('m_eff_none', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The current ratio of an imagined company, Jhijhiya Makhana Ltd, Jhanjharpur, is 2 : 1. Which one of these transactions leaves that ratio unchanged?',
  opts: ['Collecting a bill receivable on its due date', 'Paying its trade payables in cash', 'Buying a roasting machine for cash', 'Taking a three-month loan from its bank'],
  sol: 'Collecting the bill only swaps one current asset (bills receivable) for another (cash). Paying creditors lowers both parts equally and raises a ratio above 1; buying a machine for cash takes money out of current assets; a short-term loan raises both parts equally and lowers the ratio.',
}));

Q('tf_de_issue', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When an imagined company, Natua Litchi Ltd, Muzaffarpur, issues fresh equity shares for cash, its debt-equity ratio goes up because it now holds more cash.',
  sol: 'Cash is not part of either debt or equity. The issue raises shareholders’ funds (the denominator) while long-term debt is unchanged, so the debt-equity ratio falls.',
}));

const DH = effects('ratio', [300000, 200000], [['credit purchase', 0, 50000, 'decrease']]);
check(DH.rows[0].after.v === 1.2 && DH.before.v === 1.5, 'Domkach illustration');
Q('ar_eff_qr', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'Buying goods on credit lowers the quick ratio of an imagined company, Domkach Honey Ltd, Madhubani.',
  r: 'The purchase raises trade payables, a current liability, while the goods go into inventory, which is not a quick asset.',
  sol: 'Both are true and R explains A: the denominator rises while quick assets do not move, so the quick ratio must fall.',
}));

const DK = labelled(effects('ratio', [600000, 240000], [
  [`(i) Purchased goods for ${rs(40000)} in cash`, 0, 0, 'no change'],
  [`(ii) Issued debentures for ${rs(120000)} in cash`, 120000, 0, 'increase'],
]), [0, 120000]);
pin(DK.before, 2.5, 'Dalkhai base');
pin(DK.rows[1].after, 3, 'Dalkhai debentures');
Q('s2_eff_cr2', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `Dalkhai Rice Flakes Ltd, an imagined company in Sonepur, has current assets of ${rs(600000)} and current liabilities of ${rs(240000)}. Taking each transaction separately, state with a reason whether its current ratio increases, decreases or does not change, and show the new ratio:\n\n${DK.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `Current ratio before = ${show(DK.before)}.\n\n${effTable(['current assets', 'current liabilities'], DK)}\n\nReasons: (i) cash, a current asset, is replaced by inventory, another current asset, so neither part moves; (ii) cash comes in from a long-term source, so current assets rise while current liabilities do not.`,
  sol: 'Trace each transaction to current assets and current liabilities, recompute and compare.',
  scheme: DK.rows.map((r) => [`${tag(r.label)} ${EFFECT_WORD[r.e]}, ${r.after.s}`, 1]),
}));

const GS = labelled(effects('ratio', [600000, 1500000], [
  [`(i) Redeemed debentures of ${rs(150000)} in cash`, -150000, 0, 'decrease'],
  [`(ii) Issued bonus shares of ${rs(300000)} out of the general reserve`, 0, 0, 'no change'],
]), [150000, 0]);
pin(GS.before, 0.4, 'Ghumura base');
pin(GS.rows[0].after, 0.3, 'Ghumura redemption');
Q('s2_eff_de2', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `Ghumura Stoneware Ltd, an imagined company in Bhawanipatna, has long-term debt of ${rs(600000)} and shareholders' funds of ${rs(1500000)}. Taking each transaction separately, state with a reason its effect on the debt-equity ratio and show the new ratio:\n\n${GS.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `Debt-equity ratio before = ${show(GS.before)}.\n\n${effTable(['debt', 'equity'], GS)}\n\nReasons: (i) debt falls and equity is unchanged (the cash paid out is not part of equity); (ii) the bonus issue moves ${fig(300000)} from the general reserve to share capital, both inside shareholders' funds, so equity as a whole does not change.`,
  sol: 'Ask whether each transaction changes long-term debt, shareholders’ funds as a whole, both or neither.',
  scheme: GS.rows.map((r) => [`${tag(r.label)} ${EFFECT_WORD[r.e]}, ${r.after.s}`, 1]),
}));

const NT = labelled(effects('ratio', [360000, 300000], [
  [`(i) Purchased goods for ${rs(60000)} in cash`, -60000, 0, 'decrease'],
  [`(ii) Paid trade payables ${rs(100000)}`, -100000, -100000, 'increase'],
  [`(iii) Sold goods costing ₹40,000 on credit for ${rs(50000)}`, 50000, 0, 'increase'],
]), [60000, 100000, 50000]);
pin(NT.before, 1.2, 'Nongkrem base');
pin(NT.rows[0].after, 1, 'Nongkrem i'); pin(NT.rows[1].after, 1.3, 'Nongkrem ii'); pin(NT.rows[2].after, 1.37, 'Nongkrem iii');
Q('s3_eff_qr3', short({
  t: 5, d: 4, c: 'analysis', marks: 3,
  stem: `Nongkrem Turmeric Ltd, an imagined company in Jowai, has quick assets of ${rs(360000)} and current liabilities of ${rs(300000)}. Taking each transaction separately, state with a reason whether its quick ratio increases, decreases or does not change, and show the new ratio:\n\n${NT.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `Quick ratio before = ${show(NT.before)}.\n\n${effTable(['quick assets', 'current liabilities'], NT)}\n\nReasons: (i) cash, a quick asset, turns into inventory, which is not; (ii) both parts fall by the same amount, and with the ratio above 1 that raises it; (iii) the goods leave inventory (not quick) at cost, but the debtor of ${fig(50000)} is a quick asset, so quick assets rise by the full sale price.`,
  sol: 'For the quick ratio, inventory never counts: follow only cash, receivables and current liabilities.',
  scheme: NT.rows.map((r) => [`${tag(r.label)} ${EFFECT_WORD[r.e]}, ${r.after.s}`, 1]),
}));

const PO = { ca: 500000, qa: 300000, cl: 250000, debt: 400000, sf: 1000000 };
const PO_T = [
  [`(i) Issued equity shares for ${rs(200000)} in cash`, 200000],
  [`(ii) Bought a sorting machine for ${rs(50000)}, payable in six months`, 50000],
  [`(iii) Raised a long-term loan of ${rs(100000)} in cash`, 100000],
];
const PO_cr = labelled(effects('ratio', [PO.ca, PO.cl], [[PO_T[0][0], 200000, 0, 'increase'], [PO_T[1][0], 0, 50000, 'decrease'], [PO_T[2][0], 100000, 0, 'increase']]), PO_T.map((x) => x[1]));
const PO_qr = effects('ratio', [PO.qa, PO.cl], [[PO_T[0][0], 200000, 0, 'increase'], [PO_T[1][0], 0, 50000, 'decrease'], [PO_T[2][0], 100000, 0, 'increase']]);
const PO_de = effects('ratio', [PO.debt, PO.sf], [[PO_T[0][0], 0, 200000, 'decrease'], [PO_T[1][0], 0, 0, 'no change'], [PO_T[2][0], 100000, 0, 'increase']]);
pin(PO_cr.before, 2, 'Ponung CR'); pin(PO_qr.before, 1.2, 'Ponung QR'); pin(PO_de.before, 0.4, 'Ponung DE');
pin(PO_cr.rows[0].after, 2.8, 'Ponung CR i'); pin(PO_cr.rows[1].after, 1.67, 'Ponung CR ii'); pin(PO_cr.rows[2].after, 2.4, 'Ponung CR iii');
pin(PO_qr.rows[0].after, 2, 'Ponung QR i'); pin(PO_qr.rows[1].after, 1, 'Ponung QR ii'); pin(PO_qr.rows[2].after, 1.6, 'Ponung QR iii');
pin(PO_de.rows[0].after, 0.33, 'Ponung DE i'); pin(PO_de.rows[2].after, 0.5, 'Ponung DE iii');
Q('s3_eff_all', short({
  t: 5, d: 4, c: 'analysis', marks: 3,
  stem: `Ponung Orange Growers Ltd, an imagined company in Dambuk, has current assets of ${rs(PO.ca)} (of which quick assets ${rs(PO.qa)}), current liabilities of ${rs(PO.cl)}, long-term debt of ${rs(PO.debt)} and shareholders' funds of ${rs(PO.sf)}. Taking each transaction separately, show its effect on the current ratio, the quick ratio and the debt-equity ratio:\n\n${PO_T.map((x) => `${x[0]}.`).join('\n')}`,
  model: `Before: current ratio ${show(PO_cr.before)}; quick ratio ${show(PO_qr.before)}; debt-equity ${show(PO_de.before)}.\n\n${multiTable([['Current ratio', PO_cr], ['Quick ratio', PO_qr], ['Debt-equity ratio', PO_de]])}\n\n(i) Cash (current and quick) and equity rise; debt is unchanged. (ii) The amount owed for the machine is a current liability; cash does not move and the machine is a non-current asset, so debt and equity are untouched. (iii) Cash and long-term debt both rise.`,
  sol: 'For each transaction list the change in current assets, quick assets, current liabilities, debt and equity, then recompute all three ratios.',
  scheme: PO_T.map(([l], i) => [`${tag(l)} ${EFFECT_WORD[PO_cr.rows[i].e]} / ${EFFECT_WORD[PO_qr.rows[i].e]} / ${EFFECT_WORD[PO_de.rows[i].e]}`, 1]),
}));

const TB = labelled(effects('ratio', [900000, 1800000], [
  [`(i) Issued 12% debentures of ${rs(300000)} for cash`, 300000, 0, 'increase'],
  [`(ii) Redeemed preference shares of ${rs(200000)} at par in cash, out of profits`, 0, -200000, 'increase'],
  [`(iii) Paid an interim dividend of ${rs(90000)}`, 0, -90000, 'increase'],
  [`(iv) Issued equity shares of ${rs(400000)} to the vendor of a building`, 0, 400000, 'decrease'],
]), [300000, 200000, 90000, 400000]);
pin(TB.before, 0.5, 'Tarangamel base');
pin(TB.rows[0].after, 0.67, 'Tarangamel i'); pin(TB.rows[1].after, 0.56, 'Tarangamel ii'); pin(TB.rows[2].after, 0.53, 'Tarangamel iii'); pin(TB.rows[3].after, 0.41, 'Tarangamel iv');
Q('l5_de_effects', long({
  t: 5, d: 4, c: 'analysis', marks: 5,
  stem: `Tarangamel Barge Services Ltd, an imagined company in Mormugao, has long-term debt of ${rs(900000)} and shareholders' funds of ${rs(1800000)}.\n\n(a) Calculate its debt-equity ratio. [1]\n\n(b) Taking each transaction separately, state whether its debt-equity ratio increases, decreases or does not change, giving the new ratio: [4]\n\n${TB.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `**(a)** Debt-equity ratio = ${F.de} = ${show(TB.before)}.\n\n**(b)**\n\n${effTable(['debt', 'equity'], TB)}\n\nReasons: (i) only long-term debt rises; (ii) share capital is paid off in cash (the transfer from profits to the capital redemption reserve stays inside shareholders' funds), so equity falls by ${fig(200000)}; (iii) the dividend is paid out of the surplus, so equity falls; (iv) the building is paid for with new shares, so equity rises and debt is unchanged.`,
  sol: 'Ask of each transaction whether it moves long-term debt, shareholders’ funds as a whole, or both; transfers between reserves and capital do not move equity.',
  scheme: [[`(a) ${TB.before.s}`, 1], ...TB.rows.map((r) => [`(b) ${tag(r.label)} ${EFFECT_WORD[r.e]}, ${r.after.s}`, 1])],
}));

const DM_ITEMS = [['Inventories', 180000], ['Trade receivables', 150000], ['Cash and cash equivalents', 90000], ['Prepaid expenses', 20000], ['Trade payables', 160000], ['Outstanding expenses', 40000]];
const DM = { ca: sum(DM_ITEMS.slice(0, 4).map((x) => x[1])), cl: sum(DM_ITEMS.slice(4).map((x) => x[1])) };
DM.qa = DM.ca - DM_ITEMS[0][1] - DM_ITEMS[3][1];
const DM_T = [
  [`(i) Paid trade payables ${rs(40000)}`, 40000],
  [`(ii) Bought saffron stock for ${rs(30000)} in cash`, 30000],
  [`(iii) Wrote off a bad debt of ${rs(10000)}`, 10000],
];
const DM_cr = labelled(effects('ratio', [DM.ca, DM.cl], [[DM_T[0][0], -40000, -40000, 'increase'], [DM_T[1][0], 0, 0, 'no change'], [DM_T[2][0], -10000, 0, 'decrease']]), DM_T.map((x) => x[1]));
const DM_qr = effects('ratio', [DM.qa, DM.cl], [[DM_T[0][0], -40000, -40000, 'increase'], [DM_T[1][0], -30000, 0, 'decrease'], [DM_T[2][0], -10000, 0, 'decrease']]);
pin(DM_cr.before, 2.2, 'Dumhal CR'); pin(DM_qr.before, 1.2, 'Dumhal QR');
pin(DM_cr.rows[0].after, 2.5, 'Dumhal CR i'); pin(DM_cr.rows[2].after, 2.15, 'Dumhal CR iii');
pin(DM_qr.rows[0].after, 1.25, 'Dumhal QR i'); pin(DM_qr.rows[1].after, 1.05, 'Dumhal QR ii'); pin(DM_qr.rows[2].after, 1.15, 'Dumhal QR iii');
Q('l5_liq_eff', long({
  t: [1, 5], d: 4, c: 'analysis', marks: 5,
  stem: `Dumhal Saffron Ltd, an imagined company in Pampore, has these current items on 31 March 2026:\n\n${given(DM_ITEMS)}\n\n(a) Calculate its current ratio and quick ratio. [2]\n\n(b) Taking each transaction separately, show its effect on both ratios: [3]\n\n${DM_T.map((x) => `${x[0]}.`).join('\n')}`,
  model: `**(a)** Current assets = ${fig(DM.ca)}; quick assets = ${fig(DM.ca)} − ${fig(DM_ITEMS[0][1])} − ${fig(DM_ITEMS[3][1])} = ${fig(DM.qa)}; current liabilities = ${fig(DM.cl)}. Current ratio = ${show(DM_cr.before)}; quick ratio = ${show(DM_qr.before)}.\n\n**(b)**\n\n${multiTable([['Current ratio', DM_cr], ['Quick ratio', DM_qr]])}\n\n(i) Both parts of each ratio fall by the same amount, and both ratios are above 1, so both rise. (ii) Cash becomes inventory: total current assets do not change, but quick assets fall. (iii) Trade receivables, a current and quick asset, fall with no change in liabilities.`,
  sol: 'Fix the base figures first; for each transaction change current assets, quick assets and current liabilities, then recompute both ratios.',
  scheme: [[`(a) Current ratio ${DM_cr.before.s}`, 1], [`(a) Quick ratio ${DM_qr.before.s}`, 1], ...DM_T.map(([l], i) => [`(b) ${tag(l)} ${EFFECT_WORD[DM_cr.rows[i].e]} / ${EFFECT_WORD[DM_qr.rows[i].e]}`, 1])],
}));

// ================================================================ missing figures across the families
const MC = { wc: 300000, crT: 25, qrT: 13, itr: 8, gap: 40000, gpOnCost: 25 };
const MC_cl = mulDiv(MC.wc, 10, MC.crT - 10);
const MC_ca = MC_cl + MC.wc;
const MC_qa = mulDiv(MC_cl, MC.qrT, 10);
const MC_close = MC_ca - MC_qa;
const MC_open = MC_close - MC.gap;
const MC_avg = avg(MC_open, MC_close);
const MC_cost = MC.itr * MC_avg;
const MC_rev = mulDiv(MC_cost, 100 + MC.gpOnCost, 100);
pin(ratio(MC_ca, MC_cl), 2.5, 'Mathuri CR'); pin(ratio(MC_qa, MC_cl), 1.3, 'Mathuri QR'); pin(times(MC_cost, MC_avg), MC.itr, 'Mathuri ITR'); pin(pct(MC_rev - MC_cost, MC_cost), MC.gpOnCost, 'Mathuri GP on cost');
check(MC_cl === 200000 && MC_ca === 500000 && MC_close === 240000 && MC_open === 200000 && MC_cost === 1760000 && MC_rev === 2200000, 'Mathuri figures');
Q('l5_missing', long({
  t: [1, 3, 4], d: 4, c: 'analysis', marks: 5,
  stem: `From the following information about Mathuri Chilli Traders Ltd, an imagined company in Byadgi, find (a) its current liabilities and current assets, (b) its closing inventory, (c) its opening and average inventory, (d) its cost of revenue from operations and (e) its revenue from operations.\n\n- Working capital ${rs(MC.wc)}; current ratio 2.5 : 1; quick ratio 1.3 : 1; no prepaid expenses.\n- Inventory turnover ratio ${MC.itr} times; opening inventory was ${rs(MC.gap)} less than closing inventory.\n- Gross profit is ${MC.gpOnCost}% on cost.`,
  model: `1. Working capital is 1.5 times the current liabilities, so **current liabilities** = ${fig(MC.wc)} ÷ 1.5 = **${rs(MC_cl)}**; **current assets** = ${fig(MC_cl)} + ${fig(MC.wc)} = **${rs(MC_ca)}**.\n2. Quick assets = 1.3 × ${fig(MC_cl)} = ${fig(MC_qa)}; with no prepaid expenses, **closing inventory** = ${fig(MC_ca)} − ${fig(MC_qa)} = **${rs(MC_close)}**.\n3. **Opening inventory** = ${fig(MC_close)} − ${fig(MC.gap)} = **${rs(MC_open)}**; **average inventory** = (${fig(MC_open)} + ${fig(MC_close)}) ÷ 2 = **${rs(MC_avg)}**.\n4. **Cost of revenue from operations** = ${MC.itr} × ${fig(MC_avg)} = **${rs(MC_cost)}**.\n5. Revenue is ${100 + MC.gpOnCost}% of cost: **revenue from operations** = ${fig(MC_cost)} × ${100 + MC.gpOnCost} ÷ 100 = **${rs(MC_rev)}**.\n\nCheck: ${show(ratio(MC_ca, MC_cl))}; ${show(ratio(MC_qa, MC_cl))}; ${show(times(MC_cost, MC_avg))}.`,
  sol: 'Work as a chain: working capital and the current ratio give both totals; the quick ratio isolates inventory; turnover gives cost; the margin on cost gives revenue.',
  scheme: [[`(a) ${rs(MC_cl)} and ${rs(MC_ca)}`, 1], [`(b) ${rs(MC_close)}`, 1], [`(c) ${rs(MC_open)} and ${rs(MC_avg)}`, 1], [`(d) ${rs(MC_cost)}`, 1], [`(e) ${rs(MC_rev)}`, 1]],
}));

// ================================================================ full ISC-style practicals (8 marks, practice only)
const KP_P = position({ sc: 3000000, rs: 1200000, ltb: 1200000, ltp: 200000, tp: 500000, ocl: 100000, stp: 200000, ppe: 4000000, intang: 200000, nci: 400000, ci: 100000, inv: 700000, tr: 600000, cce: 360000, prepaid: 40000, lab: { sc: 'Share capital (equity shares of ₹10 each)', ltb: '10% Debentures', nci: '10% Non-current investments' } });
const KP_T = trading({ rev: 9000000, open: 500000, purchases: 6500000, direct: 300000, close: 700000 });
const KP_X = results({ rev: KP_T.rev, cost: KP_T.cost, opex: [['Employee benefits expense', 700000], ['Depreciation and amortisation', 400000], ['Other operating expenses', 300000]], oi: [['Interest on non-current investments', pctOf(10, KP_P.nci)]], nonop: [['Loss on sale of furniture', 40000]], interest: pctOf(10, KP_P.ltb), taxRate: 25 });
const KP = { credit: 7200000, trOpen: 400000 };
const KP_r = posRatios(KP_P);
pin(KP_r.current, 2.25, 'Kathakali CR'); pin(KP_r.quick, 1.33, 'Kathakali QR'); pin(KP_r.de, 0.33, 'Kathakali DE');
const KP_icr = pin(times(KP_X.pbit, KP_X.interest), 8.33, 'Kathakali ICR');
const KP_itr = pin(times(KP_T.cost, KP_T.avgInv), 11, 'Kathakali ITR');
const KP_trt = pin(times(KP.credit, avg(KP.trOpen, KP_P.tr)), 14.4, 'Kathakali TRT');
const KP_or = pin(pct(KP_X.opCost, KP_X.rev), 88.89, 'Kathakali OR');
const KP_roi = pin(pct(KP_X.pbit, KP_P.ce), 17.86, 'Kathakali ROI');
check(KP_P.total === 6400000 && KP_P.ce === 5600000 && KP_P.inv === KP_T.close && KP_X.pbit === 1000000 && KP_X.pat === 660000, 'Kathakali');
Q('l8_comprehensive', long({
  t: [1, 2, 3, 4], d: 5, c: 'analysis', marks: 8,
  stem: `Kathakali Pepper Exports Ltd, an imagined company in Thalassery, gives the following for the year ended 31 March 2026: revenue from operations ${rs(KP_T.rev)} (credit ${rs(KP.credit)}); opening inventory ${rs(KP_T.open)}; purchases ${rs(KP_T.purchases)}; direct expenses ${rs(KP_T.direct)}; employee benefits expense ${rs(700000)}; depreciation and amortisation ${rs(400000)}; other operating expenses ${rs(300000)}; interest received on non-current investments ${rs(pctOf(10, KP_P.nci))}; loss on sale of furniture ${rs(40000)}; interest on debentures for the full year; tax at 25% of profit before tax. Trade receivables on 1 April 2025 were ${rs(KP.trOpen)}. Its condensed balance sheet as at 31 March 2026 is:\n\n${positionRows(KP_P).md}\n\nCalculate: (a) current ratio, (b) quick ratio, (c) debt-equity ratio, (d) interest coverage ratio, (e) inventory turnover ratio, (f) trade receivables turnover ratio, (g) operating ratio and (h) return on investment.`,
  model: `**Operating statement**\n\n${resultRows(KP_X).md}\n\nCost of revenue from operations = ${fig(KP_T.open)} + ${fig(KP_T.purchases)} + ${fig(KP_T.direct)} − ${fig(KP_T.close)} = ${fig(KP_T.cost)}; average inventory = ${fig(KP_T.avgInv)}. Quick assets = ${fig(KP_P.ca)} − ${fig(KP_P.inv)} − ${fig(KP_P.prepaid)} = ${fig(KP_P.quick)}. Debt = ${fig(KP_P.ltb)} + ${fig(KP_P.ltp)} = ${fig(KP_P.debt)}. Average trade receivables = ${fig(avg(KP.trOpen, KP_P.tr))}. Capital employed = ${fig(KP_P.sf)} + ${fig(KP_P.ncl)} = ${fig(KP_P.ce)} (= ${fig(KP_P.nca)} + ${fig(KP_P.wc)}).\n\n${ratioTable([['(a) Current ratio', F.current, KP_r.current], ['(b) Quick ratio', F.quick, KP_r.quick], ['(c) Debt-equity ratio', F.de, KP_r.de], ['(d) Interest coverage ratio', F.icr, KP_icr], ['(e) Inventory turnover ratio', F.itr, KP_itr], ['(f) Trade receivables turnover ratio', F.trt, KP_trt], ['(g) Operating ratio', F.or, KP_or], ['(h) Return on investment', F.roi, KP_roi]])}`,
  sol: 'Build the operating statement and the bases (quick assets, debt, averages, capital employed) before computing; each ratio is then one line.',
  scheme: [[`(a) ${KP_r.current.s}`, 1], [`(b) ${KP_r.quick.s}`, 1], [`(c) ${KP_r.de.s}`, 1], [`(d) ${KP_icr.s}`, 1], [`(e) ${KP_itr.s}`, 1], [`(f) ${KP_trt.s}`, 1], [`(g) ${KP_or.s}`, 1], [`(h) ${KP_roi.s}`, 1]],
}));

const TM = { cl: 300000, crT: 26, qrT: 14, prepaid: 20000, itr: 10, open: 260000, gpPct: 25, npPct: 9, prefCap: 600000, shares: 100000, pe: 14 };
const TM_ca = mulDiv(TM.cl, TM.crT, 10);
const TM_qa = mulDiv(TM.cl, TM.qrT, 10);
const TM_close = TM_ca - TM_qa - TM.prepaid;
const TM_avg = avg(TM.open, TM_close);
const TM_cost = TM.itr * TM_avg;
const TM_rev = mulDiv(TM_cost, 100, 100 - TM.gpPct);
const TM_pat = pctOf(TM.npPct, TM_rev);
const TM_pd = pctOf(10, TM.prefCap);
const TM_eps = pin(eps(TM_pat - TM_pd, TM.shares), 3, 'Tamasha EPS');
const TM_mps = TM.pe * TM_eps.v;
check(Number.isInteger(TM_mps) && TM_mps === 42, 'Tamasha price');
pin(ratio(TM_ca, TM.cl), 2.6, 'Tamasha CR'); pin(ratio(TM_qa, TM.cl), 1.4, 'Tamasha QR'); pin(times(TM_cost, TM_avg), TM.itr, 'Tamasha ITR'); pin(pct(TM_rev - TM_cost, TM_rev), TM.gpPct, 'Tamasha GP'); pin(pct(TM_pat, TM_rev), TM.npPct, 'Tamasha NP'); pin(pe(TM_mps, TM_eps), TM.pe, 'Tamasha P/E');
check(TM_ca === 780000 && TM_close === 340000 && TM_avg === 300000 && TM_cost === 3000000 && TM_rev === 4000000 && TM_pat === 360000, 'Tamasha figures');
Q('l8_missing', long({
  t: [1, 3, 4], d: 5, c: 'analysis', marks: 8,
  stem: `The ratios of Tamasha Chikki Ltd, an imagined company in Matheran, for 2025-26 are known, but most of its figures are missing. From the information below, find (a) current assets, (b) closing inventory, (c) average inventory, (d) cost of revenue from operations, (e) revenue from operations, (f) profit after tax, (g) earnings per share and (h) the market price of an equity share.\n\n- Current liabilities ${rs(TM.cl)}; current ratio 2.6 : 1; quick ratio 1.4 : 1; prepaid expenses ${rs(TM.prepaid)}.\n- Inventory turnover ratio ${TM.itr} times; opening inventory ${rs(TM.open)}.\n- Gross profit ratio ${TM.gpPct}%; net profit ratio (after tax) ${TM.npPct}%.\n- Share capital: ${fig(TM.shares)} equity shares of ₹10 each and ${rs(TM.prefCap)} of 10% preference shares.\n- Price-earnings ratio ${TM.pe} times.`,
  model: `1. **Current assets** = 2.6 × ${fig(TM.cl)} = **${rs(TM_ca)}**.\n2. Quick assets = 1.4 × ${fig(TM.cl)} = ${fig(TM_qa)}; **closing inventory** = current assets − quick assets − prepaid expenses = ${fig(TM_ca)} − ${fig(TM_qa)} − ${fig(TM.prepaid)} = **${rs(TM_close)}**.\n3. **Average inventory** = (${fig(TM.open)} + ${fig(TM_close)}) ÷ 2 = **${rs(TM_avg)}**.\n4. **Cost of revenue from operations** = ${TM.itr} × ${fig(TM_avg)} = **${rs(TM_cost)}**.\n5. Cost is ${100 - TM.gpPct}% of revenue: **revenue from operations** = ${fig(TM_cost)} × 100 ÷ ${100 - TM.gpPct} = **${rs(TM_rev)}**.\n6. **Profit after tax** = ${TM.npPct}% of ${fig(TM_rev)} = **${rs(TM_pat)}**.\n7. Preference dividend = 10% of ${fig(TM.prefCap)} = ${fig(TM_pd)}; **earnings per share** = ${show(TM_eps)}.\n8. **Market price** = ${TM.pe} × ${TM_eps.s} = **₹${TM_mps}**.\n\nCheck: ${show(ratio(TM_ca, TM.cl))}; ${show(ratio(TM_qa, TM.cl))}; ${show(times(TM_cost, TM_avg))}; ${show(pct(TM_rev - TM_cost, TM_rev))}; ${show(pct(TM_pat, TM_rev))}; ${show(pe(TM_mps, TM_eps))}.`,
  sol: 'Each answer feeds the next: liquidity gives inventory, turnover gives cost, the gross margin gives revenue, the net margin gives profit, and the share figures give earnings per share and the price.',
  scheme: [[`(a) ${rs(TM_ca)}`, 1], [`(b) ${rs(TM_close)}`, 1], [`(c) ${rs(TM_avg)}`, 1], [`(d) ${rs(TM_cost)}`, 1], [`(e) ${rs(TM_rev)}`, 1], [`(f) ${rs(TM_pat)}`, 1], [`(g) ${TM_eps.s}`, 1], [`(h) ₹${TM_mps}`, 1]],
}));

FACTS.push(
  `Rouf current ${RW_cr.s}, quick ${RW_qr.s}`,
  `Dandiya current liabilities ${fig(DL_cl)}`,
  `Thullal balance sheet ${fig(TR_P.total)}, interest coverage ${TR_icr.s}`,
  `Jhora capital employed ${fig(JH.ce)} three ways`,
  `Lebang capital employed ${fig(LB_P.ce)}, earnings per share ${LB_eps.s}`,
  `Kathakali balance sheet ${fig(KP_P.total)}, return on investment ${KP_roi.s}`,
  `Mathuri revenue ${fig(MC_rev)} and Tamasha market price ₹${TM_mps} recomputed to every given ratio`,
);
export { FACTS, BANK };
