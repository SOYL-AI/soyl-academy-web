// CBSE 12 Accountancy, ch10 Accounting Ratios — question bank. Every company and figure is imagined by
// SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every ratio is computed in acc.mjs from the givens (one set of definitions, two-decimal rounding), every
// balance sheet balances and every capital employed figure is asserted equal both ways; effects of
// transactions are computed before and after and asserted; missing figures are found and then checked by
// recomputing the given ratios from them. Keys and model answers are built from the computed values.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, check, avg, pctOf, ratio, times, pct, show, pin, effects, delta, EFFECT_WORD, position, positionRows, posRatios, trading, results, resultRows, F, ratioTable } from './acc.mjs';

/** Given balances as a two-column table for a stem. */
export const given = (items, head = 'Particulars') => md([head, '₹'], items.map(([l, v]) => [l, fig(v)]), [1]);
const FACTS = [];
const effTable = (head, eff) =>
  md(
    ['Transaction', `Change in ${head[0]}`, `Change in ${head[1]}`, 'New ratio', 'Effect'],
    eff.rows.map((r) => [r.label, delta(r.dn), delta(r.dd), `${fig(r.n)} ÷ ${fig(r.d)} ${r.after.eq} ${r.after.s}`, bold(EFFECT_WORD[r.e])]),
  );

// ================================================================ general (meaning, objectives, classification, limitations)
Q('m_ratio_forms', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'An analyst studying an imagined company, Kalindi Fabrics Ltd, writes three of its ratios in three different forms: one as "2.4 : 1", one as "7 times" and one as "18%". The form "7 times" is the usual way of expressing',
  opts: ['activity (turnover) ratios', 'liquidity ratios such as the quick ratio', 'the proprietary ratio', 'profitability ratios such as the gross profit ratio'],
  sol: 'Turnover ratios tell how many times a resource (inventory, receivables, capital employed) has been converted into revenue in the year, so they are stated in times; liquidity and solvency ratios are pure ratios and profitability ratios are percentages.',
}));

Q('m_objective_ratio', mcq({
  t: [1, 2, 3, 4], d: 2, c: 'understanding',
  stem: 'The finance manager of an imagined company, Ken Valley Ceramics Ltd, lists for the board what ratio analysis will do for them. Which item on the list is NOT something ratio analysis can do?',
  opts: ['Remove the effect of rising prices from the figures it is based on', 'Reduce a mass of accounting figures to a few meaningful relationships', 'Help compare the company with other firms in the same industry', 'Point to weak areas such as slow-moving inventory or rising borrowings'],
  sol: 'Ratios are worked out from historical figures in the financial statements, so any distortion caused by price-level changes is carried into the ratios; that is one of their limitations, not an advantage.',
}));

Q('mt_families', match({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'A student preparing a ratio chart for an imagined company, Godhuli Paints Ltd, must place four ratios in their groups. Match each ratio in column A with the group it belongs to in column B.',
  pairs: [
    ['Quick ratio', 'Liquidity ratios'],
    ['Proprietary ratio', 'Solvency ratios'],
    ['Trade payables turnover ratio', 'Activity (turnover) ratios'],
    ['Operating ratio', 'Profitability ratios'],
  ],
  sol: 'The quick ratio tests short-term payment capacity; the proprietary ratio, long-term financial structure; trade payables turnover, how fast suppliers are paid; the operating ratio, the cost of earning revenue.',
}));

Q('ar_limit', ar({
  t: [1, 2, 3, 4], d: 3, c: 'analysis', key: 'd',
  a: 'The ratios of two companies can be compared directly, without any adjustment, as long as both companies are in the same industry.',
  r: 'Two companies in the same industry may follow different accounting policies, for example different methods of depreciation or of valuing inventory.',
  sol: 'A is false: before comparing, an analyst must check that the figures are prepared on similar policies, dates and definitions. R is true, and it is exactly the reason A fails.',
}));

Q('tf_window', tf({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Ratios worked out from the year-end balance sheet of an imagined retailer, Damodar Valley Stores Ltd, can be misleading if the company paid off a large part of its creditors just before the balance sheet date.',
  sol: 'Such window dressing makes the position on that one date look better than it usually is; ratios computed from those figures inherit the distortion.',
}));

Q('s3_limitations', short({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 3,
  stem: 'A newspaper column claims that "ratios tell an investor all there is to know about a company". Explain any three limitations of ratio analysis that the columnist has overlooked.',
  model: '1. **Based on historical figures:** ratios are computed from past financial statements, so they say little directly about the future.\n2. **Ignore price-level changes:** assets bought years ago stay at cost, so ratios such as fixed asset turnover or return on investment can look better (or worse) than the real position.\n3. **Ignore qualitative factors:** the quality of management, labour relations or the loyalty of customers cannot be expressed as ratios, though they decide the future of a business.\n4. *(Also accepted)* Different accounting policies make comparison between firms unreliable; window dressing on the balance sheet date can distort ratios; there is no single correct standard for most ratios; a ratio is only as reliable as the statements behind it.',
  sol: 'Any three limitations, each explained in a sentence or two.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1], ['Third limitation explained', 1]],
}));

Q('l4_classification', long({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 4,
  stem: 'Accounting ratios are commonly grouped into four families. Name each family, give two ratios that belong to it, and state the user of financial statements who is most interested in that family.',
  model: `| Family | Two ratios | Most interested user |\n|---|---|---|\n| Liquidity ratios | Current ratio; quick (liquid) ratio | Trade creditors and short-term lenders: can the company pay its dues within a year? |\n| Solvency ratios | Debt-equity ratio; interest coverage ratio (also total assets to debt, proprietary) | Debenture holders and long-term lenders: is the long-term structure safe, and is interest covered? |\n| Activity (turnover) ratios | Inventory turnover; trade receivables turnover (also trade payables, fixed asset, net asset, working capital turnover) | Management: how efficiently are resources being used? |\n| Profitability ratios | Gross profit ratio; return on investment (also operating, operating profit and net profit ratios) | Shareholders and investors: what does the company earn on revenue and on funds employed? |`,
  sol: 'One mark per family: its name, two correct ratios and the user whose decision it informs.',
  scheme: [['Liquidity: two ratios and user', 1], ['Solvency: two ratios and user', 1], ['Activity: two ratios and user', 1], ['Profitability: two ratios and user', 1]],
}));

Q('l6_theory', long({
  t: [1, 2, 3, 4], d: 2, c: 'understanding', marks: 6,
  stem: 'The directors of an imagined company, Uttarvahini Spinners Ltd, are new to financial analysis. Explain to them (a) what accounting ratios and ratio analysis are, and (b) any four objectives of ratio analysis.',
  model: "**(a) Meaning.** An **accounting ratio** is a mathematical relationship between two related figures taken from the financial statements, such as current assets and current liabilities. It can be expressed as a pure ratio (2 : 1), as a number of times (8 times) or as a percentage (25%). **Ratio analysis** is the process of computing such ratios, comparing them over years, with other firms or with standards, and interpreting them to judge the liquidity, solvency, efficiency and profitability of a business.\n\n**(b) Objectives:**\n1. **To judge liquidity:** whether the company can meet its short-term obligations out of its current assets.\n2. **To judge solvency:** whether its long-term financial structure is sound and whether it can pay interest and repay long-term debt.\n3. **To measure operating efficiency:** how quickly inventory, receivables and assets are turned into revenue.\n4. **To measure profitability:** what the company earns on its revenue and on the capital employed in it.\n5. *(Also accepted)* To simplify accounting figures; to make inter-firm and inter-period comparison possible; to help in planning and forecasting; to locate weak spots for corrective action.",
  sol: 'Define both terms, mention the three forms of expression, then give four objectives, each with a line of explanation.',
  scheme: [['Meaning of an accounting ratio, with forms of expression', 1], ['Meaning of ratio analysis', 1], ['Four objectives, 1 mark each', 4]],
}));

// ================================================================ t01 Liquidity ratios
Q('m_cr_benchmark', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A banker reviewing the working capital loan of an imagined company, Ramganga Paper Ltd, first compares its liquidity ratios with the conventional rules of thumb. These rules of thumb are',
  opts: ['2 : 1 for the current ratio and 1 : 1 for the quick ratio', '1 : 1 for the current ratio and 2 : 1 for the quick ratio', '1 : 1 for both the current ratio and the quick ratio', '3 : 1 for the current ratio and 0.5 : 1 for the quick ratio'],
  sol: 'Conventionally, current assets twice the current liabilities, and quick assets at least equal to them, are taken as comfortable; they are guides, and the right level differs between industries.',
}));

Q('m_quick_assets', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Tungabhadra Sugars Ltd, an imagined company, holds the following current assets at the year end. Which one is left out when its quick (liquid) assets are worked out?',
  opts: ['Inventory of sugar awaiting despatch', 'Amounts due from wholesale buyers (trade receivables)', 'The balance in its current account with a bank', 'Marketable securities that can be sold within a week'],
  sol: 'Quick assets are current assets less inventories and prepaid expenses: inventory must first be sold, and perhaps sold on credit, before it becomes cash.',
}));

const PA = { ca: 600000, cl: 240000, pay: 60000 };
const PA_r = pin(ratio(PA.ca, PA.cl), 2.5, 'Pamba before');
const PA_after = pin(ratio(PA.ca - PA.pay, PA.cl - PA.pay), 3, 'Pamba after');
const PA_x1 = ratio(PA.ca - PA.pay, PA.cl);
const PA_x2 = ratio(PA.ca, PA.cl - PA.pay);
Q('m_cr_effect', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The current ratio of an imagined company, Pamba Rubber Products Ltd, is ${PA_r.s}, with current assets of ${rs(PA.ca)}. It now pays ${rs(PA.pay)} to its trade payables by cheque. After this payment its current ratio will`,
  opts: [`rise to ${PA_after.s}`, `fall to ${PA_x1.s}`, `rise to ${PA_x2.s}`, `remain ${PA_r.s}`],
  sol: `Current liabilities = ${fig(PA.ca)} ÷ 2.5 = ${fig(PA.cl)}. The payment reduces both sides by ${fig(PA.pay)}: ${show(PA_after)}. When the ratio is above 1, an equal fall in both sides raises it.`,
}));

const LB = { qa: 180000, cl: 150000, buy: 30000 };
const LB_r = pin(ratio(LB.qa, LB.cl), 1.2, 'Lohit before');
const LB_after = pin(ratio(LB.qa - LB.buy, LB.cl), 1, 'Lohit after');
check(effects('ratio', [LB.qa, LB.cl], [['cash purchase of inventory', -LB.buy, 0, 'decrease']]).rows[0].after.v === LB_after.v, 'Lohit effect');
Q('m_qr_effect', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Lohit Bamboo Crafts Ltd, an imagined firm, has quick assets of ${rs(LB.qa)} and current liabilities of ${rs(LB.cl)}. It buys raw bamboo worth ${rs(LB.buy)} for cash. What happens to its quick ratio?`,
  opts: [`It falls from ${LB_r.s} to ${LB_after.s}, because cash is replaced by inventory, which is not a quick asset`, 'It rises, because total current assets do not change', 'It does not change, because total current assets do not change', 'It falls, because current liabilities rise by the same amount'],
  sol: `Before: ${show(LB_r)}. Cash (a quick asset) falls by ${fig(LB.buy)} while inventory rises; current liabilities do not change. After: ${show(LB_after)}.`,
}));

const BV_ITEMS = [['Inventories', 180000], ['Trade receivables', 150000], ['Cash and cash equivalents', 60000], ['Prepaid expenses', 10000], ['Plant and machinery', 500000], ['Trade payables', 120000], ['Outstanding expenses', 30000], ['Provision for tax (short-term)', 50000], ['Long-term loan from a bank', 300000]];
const BV_CA = sum(BV_ITEMS.slice(0, 4).map((x) => x[1]));
const BV_CL = sum(BV_ITEMS.slice(5, 8).map((x) => x[1]));
const BV_r = pin(ratio(BV_CA, BV_CL), 2, 'Barak');
Q('n_cr', num({
  t: 1, d: 2, c: 'application', marks: 2, value: BV_r.v, unit: ': 1', tol: 0.01,
  stem: `From the following balances of an imagined company, Barak Valley Tea Ltd, on 31 March 2026, compute its current ratio (write it as a number, for example 1.5 for 1.5 : 1):\n\n${given(BV_ITEMS)}`,
  sol: `Current assets = ${BV_ITEMS.slice(0, 4).map((x) => fig(x[1])).join(' + ')} = ${fig(BV_CA)}; current liabilities = ${BV_ITEMS.slice(5, 8).map((x) => fig(x[1])).join(' + ')} = ${fig(BV_CL)}. Current ratio = ${show(BV_r)}. The machinery and the long-term loan are non-current and are left out.`,
  scheme: [['Current assets and current liabilities picked out', 1], [`Current ratio ${BV_r.s}`, 1]],
}));

const SD_CA = [['Inventories of milk products', 140000], ['Trade receivables', 210000], ['Cash and bank balances', 130000], ['Prepaid insurance', 20000], ['Short-term investments', 40000]];
const SD_CL = [['Trade payables', 240000], ['Bank overdraft', 60000]];
const SD_ca = sum(SD_CA.map((x) => x[1]));
const SD_cl = sum(SD_CL.map((x) => x[1]));
const SD_q = SD_ca - SD_CA[0][1] - SD_CA[3][1];
const SD_r = pin(ratio(SD_q, SD_cl), 1.27, 'Shipra');
check(!SD_r.exact, 'Shipra is a rounded example');
Q('n_qr', num({
  t: 1, d: 3, c: 'application', marks: 2, value: SD_r.v, unit: ': 1', tol: 0.01,
  stem: `Shipra Dairy Ltd, an imagined company in Ujjain, shows these current assets and current liabilities on 31 March 2026. Compute its quick ratio to two decimal places:\n\n${given([...SD_CA, ...SD_CL])}`,
  sol: `Current assets = ${fig(SD_ca)}. Quick assets = ${fig(SD_ca)} − inventories ${fig(SD_CA[0][1])} − prepaid insurance ${fig(SD_CA[3][1])} = ${fig(SD_q)}. Current liabilities = ${fig(SD_cl)}. Quick ratio = ${show(SD_r)} (rounded to two decimal places).`,
  scheme: [[`Quick assets ${rs(SD_q)}`, 1], [`Quick ratio ${SD_r.s}`, 1]],
}));

const MS = { wc: 180000, crTenths: 25 };
const MS_cl = (MS.wc * 10) / (MS.crTenths - 10);
check(Number.isInteger(MS_cl) && MS_cl === 120000, 'Manjira CL');
const MS_ca = MS_cl + MS.wc;
pin(ratio(MS_ca, MS_cl), 2.5, 'Manjira recomputed');
Q('n_cl_from_wc', num({
  t: 1, d: 3, c: 'application', marks: 2, value: MS_cl, unit: '₹',
  stem: `The working capital of an imagined company, Manjira Seeds Ltd, is ${rs(MS.wc)} and its current ratio is 2.5 : 1. Find its current liabilities (in ₹).`,
  sol: `Let current liabilities be L; current assets are then 2.5L, and working capital 2.5L − L = 1.5L = ${fig(MS.wc)}. So L = ${fig(MS.wc)} ÷ 1.5 = ${fig(MS_cl)}, that is ₹${fig(MS_cl)}. Check: current assets ${fig(MS_ca)} ÷ ${fig(MS_cl)} = 2.5.`,
  scheme: [['Working capital = 1.5 × current liabilities', 1], [`Current liabilities ${rs(MS_cl)}`, 1]],
}));

Q('tf_cr_high', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? For an imagined wholesaler, Betwa Leather Goods Ltd, a current ratio of 6 : 1 is a sure sign that its working capital is being managed efficiently.',
  sol: 'A very high current ratio may mean idle cash, unsold stock piling up or customers who are not paying on time; it shows safety for creditors but not efficient use of funds.',
}));

Q('fb_quick', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the liquidity analysis of any company, the quick ratio is found by dividing quick assets by ___.',
  acc: [['current liabilities', 'current liability']],
  sol: 'Quick assets are compared with current liabilities, the obligations that must be met within the operating cycle or twelve months.',
}));

Q('ar_cr_idle', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  a: 'A current ratio far above the conventional 2 : 1 can be a sign of poor management of working capital.',
  r: 'Very large current assets often mean idle cash, slow-moving inventory or debts that are not being collected, all of which earn little.',
  sol: 'Both are true, and R gives the reason: funds locked in excess current assets are not earning, so too high a ratio is as much a warning as too low a one.',
}));

const MI = { ca: 0, cl: 0 };
const MI_ITEMS = [['Inventories', 240000], ['Trade receivables', 160000], ['Bills receivable', 40000], ['Cash at bank', 70000], ['Prepaid expenses', 15000], ['Current investments', 25000], ['Trade payables', 180000], ['Bills payable', 30000], ['Outstanding wages', 20000], ['Provision for tax (short-term)', 50000], ['9% Debentures', 400000], ['Provision for gratuity (long-term)', 60000]];
MI.ca = sum(MI_ITEMS.slice(0, 6).map((x) => x[1]));
MI.cl = sum(MI_ITEMS.slice(6, 10).map((x) => x[1]));
const MI_q = MI.ca - 240000 - 15000;
const MI_cr = pin(ratio(MI.ca, MI.cl), 1.96, 'Gomti CR');
const MI_qr = pin(ratio(MI_q, MI.cl), 1.05, 'Gomti QR');
Q('s3_liquidity', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Gomti Garments Ltd, an imagined company in Lucknow, has the following balances on 31 March 2026. Compute its current ratio and quick ratio.\n\n${given(MI_ITEMS)}`,
  model: `${md(['Working', '₹'], [['Current assets: inventories + trade receivables + bills receivable + cash at bank + prepaid expenses + current investments', fig(MI.ca)], ['Current liabilities: trade payables + bills payable + outstanding wages + provision for tax', fig(MI.cl)], ['Quick assets: current assets − inventories − prepaid expenses', fig(MI_q)]], [1])}\n\n- Current ratio = ${F.current} = ${show(MI_cr)}\n- Quick ratio = ${F.quick} = ${show(MI_qr)}\n\nThe debentures and the provision for gratuity are non-current liabilities and are left out of both ratios.`,
  sol: 'Separate the current items from the non-current ones first; take inventories and prepaid expenses out of current assets for the quick ratio.',
  scheme: [[`Current assets ${rs(MI.ca)} and current liabilities ${rs(MI.cl)}`, 1], [`Current ratio ${MI_cr.s}`, 1], [`Quick ratio ${MI_qr.s}`, 1]],
}));

const KC = { crT: 28, qrT: 15, wc: 360000 };
const KC_cl = (KC.wc * 10) / (KC.crT - 10);
check(Number.isInteger(KC_cl), 'Koyna CL');
const KC_ca = KC_cl + KC.wc;
const KC_qa = (KC_cl * KC.qrT) / 10;
const KC_inv = KC_ca - KC_qa;
pin(ratio(KC_ca, KC_cl), 2.8, 'Koyna CR');
pin(ratio(KC_qa, KC_cl), 1.5, 'Koyna QR');
check(KC_cl === 200000 && KC_ca === 560000 && KC_qa === 300000 && KC_inv === 260000, 'Koyna figures');
Q('s3_missing_inv', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `Koyna Castings Ltd, an imagined foundry, has a current ratio of 2.8 : 1, a quick ratio of 1.5 : 1 and working capital of ${rs(KC.wc)}. It has no prepaid expenses. Calculate its current liabilities, current assets and inventories.`,
  model: `- Working capital = current assets − current liabilities = 2.8L − L = 1.8L, where L is current liabilities. So L = ${fig(KC.wc)} ÷ 1.8 = **${rs(KC_cl)}**.\n- Current assets = 2.8 × ${fig(KC_cl)} = **${rs(KC_ca)}**.\n- Quick assets = 1.5 × ${fig(KC_cl)} = ${fig(KC_qa)}.\n- Inventories = current assets − quick assets = ${fig(KC_ca)} − ${fig(KC_qa)} = **${rs(KC_inv)}**.\n\nCheck: ${show(ratio(KC_ca, KC_cl))}; ${show(ratio(KC_qa, KC_cl))}.`,
  sol: 'Express working capital in terms of current liabilities first; with no prepaid expenses, inventories are the only gap between current and quick assets.',
  scheme: [[`Current liabilities ${rs(KC_cl)}`, 1], [`Current assets ${rs(KC_ca)}`, 1], [`Inventories ${rs(KC_inv)}`, 1]],
}));

/** Transaction labels carry the amount that moves the ratio (asserted), so the stem and the key agree. */
const labelled = (eff, amounts) => {
  eff.rows.forEach((r, i) => check(amounts[i] === 0 || r.label.includes(fig(amounts[i])), `label "${r.label}" lacks ${amounts[i]}`));
  return eff;
};
const KB = labelled(effects('ratio', [400000, 200000], [
  [`(i) Paid trade payables ${rs(50000)}`, -50000, -50000, 'increase'],
  [`(ii) Bought goods on credit for ${rs(40000)}`, 40000, 40000, 'decrease'],
  [`(iii) Collected ${rs(25000)} from trade receivables`, 0, 0, 'no change'],
  [`(iv) Bought a coffee roaster (machinery) for ${rs(30000)} in cash`, -30000, 0, 'decrease'],
]), [50000, 40000, 25000, 30000]);
pin(KB.before, 2, 'Kabini base');
Q('l4_cr_effects', long({
  t: 1, d: 4, c: 'analysis', marks: 4,
  stem: `Kabini Coffee Curing Ltd, an imagined company, has current assets of ${rs(400000)} and current liabilities of ${rs(200000)}. Taking each transaction separately, state with reasons whether its current ratio will increase, decrease or not change, and show the new ratio:\n\n${KB.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `Current ratio before the transactions = ${show(KB.before)}.\n\n${effTable(['current assets', 'current liabilities'], KB)}\n\nReasons: (i) both sides fall by the same amount, and with the ratio above 1 that raises it; (ii) both sides rise by the same amount, which lowers a ratio above 1; (iii) one current asset (cash) replaces another (receivables); (iv) cash, a current asset, is turned into a non-current asset.`,
  sol: 'Trace each transaction to current assets and current liabilities, recompute, then compare with the original ratio.',
  scheme: KB.rows.map((r) => [`${r.label.split(')')[0]}): ${EFFECT_WORD[r.e]} — ${r.after.s}`, 1]),
}));

// ================================================================ t02 Solvency ratios
Q('m_debt_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'While working out the debt-equity ratio of an imagined company, Subarnarekha Metals Ltd, its accountant has to decide what "debt" means. Under the definitions used in this chapter, debt is',
  opts: ['long-term borrowings plus long-term provisions', 'all liabilities, current and non-current', 'trade payables and short-term borrowings only', 'share capital plus reserves and surplus'],
  sol: "Debt means the long-term funds owed to outsiders, the non-current liabilities; equity means shareholders' funds. Current liabilities are left out of this ratio.",
}));

const MP = { debt: 400000, eq: 800000, issue: 200000 };
const MP_r = pin(ratio(MP.debt, MP.eq), 0.5, 'Mahi before');
const MP_after = pin(ratio(MP.debt, MP.eq + MP.issue), 0.4, 'Mahi after');
const MP_x1 = ratio(MP.debt - MP.issue, MP.eq);
const MP_x2 = ratio(MP.debt + MP.issue, MP.eq);
Q('m_de_effect', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Mahi Plastics Ltd, an imagined company, has long-term debt of ${rs(MP.debt)} and shareholders' funds of ${rs(MP.eq)}. It issues fresh equity shares of ${rs(MP.issue)} for cash. Its debt-equity ratio will`,
  opts: [`fall to ${MP_after.s}`, `fall to ${MP_x1.s}`, `rise to ${MP_x2.s}`, `stay at ${MP_r.s}`],
  sol: `Equity rises to ${fig(MP.eq + MP.issue)} while debt is unchanged: ${show(MP_after)}, lower than ${MP_r.s}.`,
}));

const LS = { deb: 1000000, rate: 12, pbt: 480000 };
const LS_int = pctOf(LS.rate, LS.deb);
const LS_pbit = LS.pbt + LS_int;
const LS_r = pin(times(LS_pbit, LS_int), 5, 'Luni');
const LS_x = times(LS.pbt, LS_int);
const LS_inv = ratio(LS_int, LS_pbit);
Q('m_icr', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Luni Salt Works Ltd, an imagined company, has ${LS.rate}% debentures of ${rs(LS.deb)}. Its profit after charging debenture interest but before tax is ${rs(LS.pbt)}. Its interest coverage ratio is`,
  opts: [LS_r.s, LS_x.s, `${LS_inv.v} times`, '12 times'],
  sol: `Interest = ${LS.rate}% of ${fig(LS.deb)} = ${fig(LS_int)}. Profit before interest and tax = ${fig(LS.pbt)} + ${fig(LS_int)} = ${fig(LS_pbit)}. Coverage = ${show(LS_r)}.`,
}));

Q('m_prop', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The proprietary ratio of an imagined company, Ravi Hosiery Ltd, has risen from 0.45 : 1 to 0.7 : 1 over three years. For its creditors and lenders this means that',
  opts: ['a larger share of its total assets is now financed by the owners, so outsiders are better protected', 'the company now depends more on borrowed funds than before', 'the company’s profit has risen in the same proportion', 'its current assets have grown faster than its current liabilities'],
  sol: "The proprietary ratio is shareholders' funds ÷ total assets; a higher figure means owners' money backs more of the assets, leaving a wider cushion for outsiders.",
}));

const JW = position({ sc: 800000, rs: 300000, ltb: 300000, ltp: 140000, tp: 200000, ppe: 1300000, cce: 0, inv: 240000, tr: 200000, lab: {} });
const JW_r = pin(ratio(JW.debt, JW.sf), 0.4, 'Jhelum');
Q('n_de', num({
  t: 2, d: 3, c: 'application', marks: 2, value: JW_r.v, unit: ': 1', tol: 0.01,
  stem: `Jhelum Willow Bats Ltd, an imagined company in Anantnag, has: equity share capital ${rs(800000)}; general reserve ${rs(200000)}; surplus in the Statement of Profit and Loss ${rs(100000)}; 10% debentures ${rs(300000)}; long-term provision for warranties ${rs(140000)}; trade payables ${rs(200000)}. Compute its debt-equity ratio.`,
  sol: `Debt = ${fig(300000)} + ${fig(140000)} = ${fig(JW.debt)}. Equity = ${fig(800000)} + ${fig(200000)} + ${fig(100000)} = ${fig(JW.sf)}. Debt-equity ratio = ${show(JW_r)}. Trade payables are current and are not debt.`,
  scheme: [[`Debt ${rs(JW.debt)} and equity ${rs(JW.sf)}`, 1], [`Ratio ${JW_r.s}`, 1]],
}));

const BW = position({ sc: 500000, rs: 200000, ltb: 500000, ltp: 100000, tp: 200000, ppe: 900000, nci: 150000, inv: 200000, tr: 150000, cce: 100000 });
const BW_r = pin(ratio(BW.total, BW.debt), 2.5, 'Beas');
Q('n_tad', num({
  t: 2, d: 3, c: 'application', marks: 2, value: BW_r.v, unit: ': 1', tol: 0.01,
  stem: `Beas Woollens Ltd, an imagined company in Kullu, shows: share capital ${rs(BW.sc)}; reserves and surplus ${rs(BW.rs)}; long-term borrowings ${rs(BW.ltb)}; long-term provisions ${rs(BW.ltp)}; current liabilities ${rs(BW.cl)}; property, plant and equipment ${rs(BW.ppe)}; non-current investments ${rs(BW.nci)}; current assets ${rs(BW.ca)}. Compute its total assets to debt ratio.`,
  sol: `Total assets = ${fig(BW.ppe)} + ${fig(BW.nci)} + ${fig(BW.ca)} = ${fig(BW.total)}. Debt = ${fig(BW.ltb)} + ${fig(BW.ltp)} = ${fig(BW.debt)}. Ratio = ${show(BW_r)}.`,
  scheme: [[`Total assets ${rs(BW.total)} and debt ${rs(BW.debt)}`, 1], [`Ratio ${BW_r.s}`, 1]],
}));

Q('tf_de_low', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Other things being equal, a bank lending to an imagined company, Krishna Pulses Ltd, is safer when the company’s debt-equity ratio is 0.3 : 1 than when it is 1.5 : 1.',
  sol: 'A lower ratio means owners have put in more of the long-term funds, so there is a larger margin of safety for lenders and a smaller fixed burden of interest.',
}));

Q('fb_icr', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Unlike the current ratio, which is written as a proportion such as 2 : 1, the interest coverage ratio of a company is normally expressed in ___.',
  acc: [['times']],
  sol: 'It is stated in times: profit before interest and tax is so many times the interest on long-term debt.',
}));

Q('ar_icr', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'The interest coverage ratio is worked out on profit before interest and tax, not on profit after tax.',
  r: 'Interest on long-term debt is a charge met before tax is worked out, so the whole profit before interest and tax is available to pay it.',
  sol: 'Both are true and R explains A: since interest is paid before tax, the profit that "covers" it is the profit before both interest and tax.',
}));

Q('ar_tad', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'A total assets to debt ratio of 5 : 1 means that every rupee of long-term debt is backed by five rupees of assets.',
  r: 'The higher the total assets to debt ratio, the less secure the long-term lenders are.',
  sol: 'A is true. R is false: more assets behind each rupee of debt means lenders are better protected, not less.',
}));

const VC = position({ sc: 1000000, rs: 200000, ltb: 600000, tp: 300000, stp: 100000, ppe: 1400000, inv: 350000, tr: 300000, cce: 150000 });
const VC_de = pin(ratio(VC.debt, VC.sf), 0.5, 'Vamsadhara DE');
const VC_tad = pin(ratio(VC.total, VC.debt), 3.67, 'Vamsadhara TAD');
const VC_prop = pin(ratio(VC.sf, VC.total), 0.55, 'Vamsadhara prop');
Q('s3_solvency', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `The balance sheet of Vamsadhara Cashew Exports Ltd, an imagined company in Srikakulam, shows on 31 March 2026: equity share capital ${rs(VC.sc)}; reserves and surplus ${rs(VC.rs)}; long-term borrowings ${rs(VC.ltb)}; trade payables ${rs(VC.tp)}; short-term provisions ${rs(VC.stp)}; property, plant and equipment ${rs(VC.ppe)}; inventories ${rs(VC.inv)}; trade receivables ${rs(VC.tr)}; cash and cash equivalents ${rs(VC.cce)}. Compute the debt-equity ratio, the total assets to debt ratio and the proprietary ratio.`,
  model: `Debt = ${fig(VC.debt)}; equity (shareholders' funds) = ${fig(VC.sc)} + ${fig(VC.rs)} = ${fig(VC.sf)}; total assets = ${fig(VC.ppe)} + ${fig(VC.inv)} + ${fig(VC.tr)} + ${fig(VC.cce)} = ${fig(VC.total)} (equal to the total of equity and liabilities).\n\n${ratioTable([['Debt-equity', F.de, VC_de], ['Total assets to debt', F.tad, VC_tad], ['Proprietary', F.prop, VC_prop]])}`,
  sol: 'Find debt, equity and total assets first; then each ratio is one division. Round to two decimal places.',
  scheme: [[`Debt-equity ${VC_de.s}`, 1], [`Total assets to debt ${VC_tad.s}`, 1], [`Proprietary ${VC_prop.s}`, 1]],
}));

const CP = { pat: 315000, tax: 30, deb: 500000, rate: 10 };
const CP_pbt = (CP.pat * 100) / (100 - CP.tax);
check(Number.isInteger(CP_pbt), 'Chaliyar PBT');
const CP_int = pctOf(CP.rate, CP.deb);
const CP_pbit = CP_pbt + CP_int;
const CP_r = pin(times(CP_pbit, CP_int), 10, 'Chaliyar');
check(CP_pbt - pctOf(CP.tax, CP_pbt) === CP.pat, 'Chaliyar tax');
Q('s3_icr', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Chaliyar Plywood Ltd, an imagined company in Nilambur, earned a profit after tax of ${rs(CP.pat)} for the year. Tax is charged at ${CP.tax}% of profit before tax. It has ${rs(CP.deb)} of ${CP.rate}% debentures outstanding for the whole year. Compute its interest coverage ratio.`,
  model: `- Profit before tax = ${fig(CP.pat)} × 100 ÷ ${100 - CP.tax} = ${fig(CP_pbt)} (tax ${fig(CP_pbt - CP.pat)}).\n- Interest on debentures = ${CP.rate}% of ${fig(CP.deb)} = ${fig(CP_int)}.\n- Profit before interest and tax = ${fig(CP_pbt)} + ${fig(CP_int)} = ${fig(CP_pbit)}.\n- Interest coverage ratio = ${F.icr} = ${show(CP_r)}.`,
  sol: 'Work back from profit after tax: add back tax, then interest; divide by the interest.',
  scheme: [[`Profit before tax ${rs(CP_pbt)}`, 1], [`Profit before interest and tax ${rs(CP_pbit)}`, 1], [`Coverage ${CP_r.s}`, 1]],
}));

const MF = labelled(effects('ratio', [600000, 1200000], [
  [`(i) Issued equity shares for ${rs(200000)} in cash`, 0, 200000, 'decrease'],
  [`(ii) Raised a long-term loan of ${rs(300000)}`, 300000, 0, 'increase'],
  [`(iii) Bought a fishing trawler for ${rs(100000)} in cash`, 0, 0, 'no change'],
  [`(iv) Paid a cash dividend of ${rs(60000)} out of the surplus in its Statement of Profit and Loss`, 0, -60000, 'increase'],
]), [200000, 300000, 100000, 60000]);
pin(MF.before, 0.5, 'Mandovi base');
Q('l4_de_effects', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `Mandovi Fisheries Ltd, an imagined company in Goa, has long-term debt of ${rs(600000)} and shareholders' funds of ${rs(1200000)}. Taking each transaction separately, state whether its debt-equity ratio will increase, decrease or not change, and show the new ratio:\n\n${MF.rows.map((r) => `${r.label}.`).join('\n')}`,
  model: `Debt-equity ratio before the transactions = ${show(MF.before)}.\n\n${effTable(['debt', 'equity'], MF)}\n\nReasons: (i) only equity rises; (ii) only debt rises; (iii) one asset replaces another, neither debt nor equity moves; (iv) the dividend reduces the surplus, and so the equity, while debt stays the same.`,
  sol: 'Ask of each transaction: does it change long-term debt, shareholders’ funds, both or neither? Then recompute.',
  scheme: MF.rows.map((r) => [`${r.label.split(')')[0]}): ${EFFECT_WORD[r.e]} — ${r.after.s}`, 1]),
}));

const AH = position({ sc: 1500000, rs: 500000, ltb: 800000, ltp: 200000, tp: 300000, stp: 200000, ppe: 2000000, intang: 200000, nci: 300000, inv: 400000, tr: 350000, cce: 200000, prepaid: 50000, lab: { ltb: '12% Debentures' } });
const AH_int = pctOf(12, AH.ltb);
const AH_pbt = 624000;
const AH_pbit = AH_pbt + AH_int;
const AH_de = pin(ratio(AH.debt, AH.sf), 0.5, 'Alaknanda DE');
const AH_tad = pin(ratio(AH.total, AH.debt), 3.5, 'Alaknanda TAD');
const AH_prop = pin(ratio(AH.sf, AH.total), 0.57, 'Alaknanda prop');
const AH_icr = pin(times(AH_pbit, AH_int), 7.5, 'Alaknanda ICR');
const AH_GIVEN = [['Equity share capital', AH.sc], ['Reserves and surplus', AH.rs], ['12% Debentures', AH.ltb], ['Long-term provisions', AH.ltp], ['Trade payables', AH.tp], ['Short-term provisions', AH.stp], ['Property, plant and equipment', AH.ppe], ['Intangible assets', AH.intang], ['Non-current investments', AH.nci], ['Inventories', AH.inv], ['Trade receivables', AH.tr], ['Cash and cash equivalents', AH.cce], ['Prepaid expenses', AH.prepaid], ['Profit before tax for the year', AH_pbt]];
Q('l6_solvency', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `Alaknanda Herbals Ltd, an imagined company in Rishikesh, gives the following on 31 March 2026. The debentures were outstanding for the whole year. Compute (a) the debt-equity ratio, (b) the total assets to debt ratio, (c) the proprietary ratio and (d) the interest coverage ratio, and (e) comment briefly on its long-term solvency.\n\n${given(AH_GIVEN)}`,
  model: `**Workings**\n\n${md(['Item', '₹'], [["Equity (shareholders' funds) = share capital + reserves and surplus", fig(AH.sf)], ['Debt = 12% debentures + long-term provisions', fig(AH.debt)], ['Total assets = non-current assets + current assets', fig(AH.total)], [`Interest on debentures = 12% of ${fig(AH.ltb)}`, fig(AH_int)], ['Profit before interest and tax = profit before tax + interest', fig(AH_pbit)]], [1])}\n\n${ratioTable([['(a) Debt-equity', F.de, AH_de], ['(b) Total assets to debt', F.tad, AH_tad], ['(c) Proprietary', F.prop, AH_prop], ['(d) Interest coverage', F.icr, AH_icr]])}\n\n**(e) Comment:** debt is only half of equity, owners finance ${AH_prop.s.replace(' : 1', '')} of every rupee of assets, assets cover debt ${AH_tad.s.replace(' : 1', '')} times and profit covers interest ${AH_icr.s}; the company is soundly placed to pay interest and repay its long-term debt.`,
  sol: 'Fix the three bases first (equity, debt, total assets); interest comes from the debenture rate; profit before interest and tax is profit before tax plus that interest.',
  scheme: [[`(a) Debt-equity ${AH_de.s}`, 1.5], [`(b) Total assets to debt ${AH_tad.s}`, 1], [`(c) Proprietary ${AH_prop.s}`, 1], [`(d) Interest coverage ${AH_icr.s}`, 1.5], ['(e) Comment on solvency', 1]],
}));

// ================================================================ t03 Activity (turnover) ratios
Q('m_cost_rev', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'An imagined trader, Palar Footwear Ltd, knows its revenue from operations and its gross profit for the year, but not its purchases. To compute its inventory turnover ratio it needs the cost of revenue from operations, which equals',
  opts: ['revenue from operations less gross profit', 'revenue from operations plus gross profit', 'closing inventory less opening inventory', 'gross profit divided by revenue from operations'],
  sol: 'Gross profit is what remains of revenue after the cost of the goods sold, so that cost is revenue minus gross profit.',
}));

const PS = { cost: 960000, open: 110000, close: 130000, rev: 1200000 };
const PS_avg = avg(PS.open, PS.close);
const PS_r = pin(times(PS.cost, PS_avg), 8, 'Penganga');
const PS_x1 = times(PS.rev, PS_avg);
const PS_x2 = times(PS.cost, PS.open + PS.close);
const PS_x3 = times(PS.cost, PS.close);
Q('m_inv_avg', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Penganga Spices Ltd, an imagined company, had revenue from operations of ${rs(PS.rev)} and a cost of revenue from operations of ${rs(PS.cost)}. Its inventory was ${rs(PS.open)} at the start of the year and ${rs(PS.close)} at the end. Its inventory turnover ratio is`,
  opts: [PS_r.s, PS_x1.s, PS_x2.s, PS_x3.s],
  sol: `Average inventory = (${fig(PS.open)} + ${fig(PS.close)}) ÷ 2 = ${fig(PS_avg)}. Inventory turnover = ${show(PS_r)}; cost, not revenue, is used because inventory is carried at cost.`,
}));

Q('m_trt_credit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Damanganga Electricals Ltd, an imagined distributor, sells partly for cash and partly on credit, and holds both book debts and bills receivable. Its trade receivables turnover ratio is computed as',
  opts: ['credit revenue from operations ÷ average of (debtors + bills receivable)', 'total revenue from operations ÷ closing debtors only', 'net credit purchases ÷ average trade payables', 'cost of revenue from operations ÷ average debtors'],
  sol: 'Only credit sales create receivables, and receivables include both debtors and bills receivable, averaged over the year.',
}));

const TV = { rev: 3600000, ca: 700000, cl: 250000 };
const TV_wc = TV.ca - TV.cl;
const TV_r = pin(times(TV.rev, TV_wc), 8, 'Tawa');
const TV_x1 = times(TV.rev, TV.ca);
const TV_x2 = times(TV.rev, TV.cl);
const TV_x3 = times(TV.ca, TV.cl);
Q('m_wct', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Tawa Valley Soya Ltd, an imagined company, had revenue from operations of ${rs(TV.rev)}. At the year end its current assets were ${rs(TV.ca)} and its current liabilities ${rs(TV.cl)}. Its working capital turnover ratio is`,
  opts: [TV_r.s, TV_x1.s, TV_x2.s, TV_x3.s],
  sol: `Working capital = ${fig(TV.ca)} − ${fig(TV.cl)} = ${fig(TV_wc)}. Working capital turnover = ${show(TV_r)}.`,
}));

Q('m_interpret_tr', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The trade receivables turnover ratio of an imagined company, Sindh Valley Pottery Ltd, fell from 12 times to 8 times in a year, although it did not change the credit period it allows. The most likely reading is that',
  opts: ['customers are taking longer to pay, so collection has slowed down', 'customers are now paying faster than before', 'the company has started buying more of its materials on credit', 'its inventory is now being sold more quickly'],
  sol: 'Fewer turns of receivables in a year means each rupee of credit sales stays outstanding longer, so the company should look at its collection effort.',
}));

const PH = trading({ rev: 1800000, open: 140000, purchases: 1370000, close: 160000 });
check(PH.gp === pctOf(25, PH.rev), 'Purna GP 25%');
const PH_r = pin(times(PH.cost, PH.avgInv), 9, 'Purna');
Q('n_itr', num({
  t: 3, d: 3, c: 'application', marks: 2, value: PH_r.v, unit: 'times', tol: 0.01,
  stem: `Purna Handlooms Ltd, an imagined company, had revenue from operations of ${rs(PH.rev)} and earned a gross profit of 25% on revenue from operations. Its inventory was ${rs(PH.open)} on 1 April 2025 and ${rs(PH.close)} on 31 March 2026. Compute its inventory turnover ratio.`,
  sol: `Gross profit = 25% of ${fig(PH.rev)} = ${fig(PH.gp)}; cost of revenue from operations = ${fig(PH.rev)} − ${fig(PH.gp)} = ${fig(PH.cost)}. Average inventory = (${fig(PH.open)} + ${fig(PH.close)}) ÷ 2 = ${fig(PH.avgInv)}. Inventory turnover = ${show(PH_r)}.`,
  scheme: [[`Cost of revenue from operations ${rs(PH.cost)} and average inventory ${rs(PH.avgInv)}`, 1], [`Ratio ${PH_r.s}`, 1]],
}));

const IA = { total: 2400000, cash: 400000, dO: 150000, dC: 210000, bO: 50000, bC: 90000 };
const IA_credit = IA.total - IA.cash;
const IA_avg = avg(IA.dO + IA.bO, IA.dC + IA.bC);
const IA_r = pin(times(IA_credit, IA_avg), 8, 'Indrayani');
Q('n_trt', num({
  t: 3, d: 3, c: 'application', marks: 2, value: IA_r.v, unit: 'times', tol: 0.01,
  stem: `Indrayani Auto Parts Ltd, an imagined company near Pune, had total revenue from operations of ${rs(IA.total)}, of which ${rs(IA.cash)} was for cash. Its debtors were ${rs(IA.dO)} on 1 April 2025 and ${rs(IA.dC)} on 31 March 2026; its bills receivable were ${rs(IA.bO)} and ${rs(IA.bC)} on the same dates. Compute its trade receivables turnover ratio.`,
  sol: `Credit revenue from operations = ${fig(IA.total)} − ${fig(IA.cash)} = ${fig(IA_credit)}. Trade receivables: opening ${fig(IA.dO + IA.bO)}, closing ${fig(IA.dC + IA.bC)}, average ${fig(IA_avg)}. Turnover = ${show(IA_r)}.`,
  scheme: [[`Credit revenue ${rs(IA_credit)} and average receivables ${rs(IA_avg)}`, 1], [`Ratio ${IA_r.s}`, 1]],
}));

const BA = { total: 1500000, cash: 300000, cO: 120000, cC: 180000, bO: 40000, bC: 60000 };
const BA_credit = BA.total - BA.cash;
const BA_avg = avg(BA.cO + BA.bO, BA.cC + BA.bC);
const BA_r = pin(times(BA_credit, BA_avg), 6, 'Bhadra');
Q('n_tpt', num({
  t: 3, d: 3, c: 'application', marks: 2, value: BA_r.v, unit: 'times', tol: 0.01,
  stem: `Bhadra Agro Inputs Ltd, an imagined fertiliser dealer, bought goods worth ${rs(BA.total)} during the year, ${rs(BA.cash)} of them for cash. Its creditors stood at ${rs(BA.cO)} at the start of the year and ${rs(BA.cC)} at the end, and its bills payable at ${rs(BA.bO)} and ${rs(BA.bC)}. How many times did it turn over its trade payables?`,
  sol: `Net credit purchases = ${fig(BA.total)} − ${fig(BA.cash)} = ${fig(BA_credit)}. Trade payables: opening ${fig(BA.cO + BA.bO)}, closing ${fig(BA.cC + BA.bC)}, average ${fig(BA_avg)}. Trade payables turnover = ${show(BA_r)}.`,
  scheme: [[`Credit purchases ${rs(BA_credit)} and average payables ${rs(BA_avg)}`, 1], [`Ratio ${BA_r.s}`, 1]],
}));

Q('fb_fat', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'For a capital-heavy business such as an imagined cement plant, the fixed asset turnover ratio is net revenue from operations divided by net ___ assets.',
  acc: [['fixed']],
  sol: 'Net fixed assets (after depreciation) are the base: the ratio tells how much revenue each rupee invested in fixed assets brings in.',
}));

Q('tf_avg', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In the inventory turnover ratio of an imagined tea trader, Dikhow Tea Traders Ltd, average inventory is the opening inventory plus the closing inventory, divided by two.',
  sol: 'A simple average of the opening and the closing figure is used, because revenue is earned through the whole year, not only on its last day.',
}));

Q('mt_turnover', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each turnover ratio in column A with the way it is computed in column B.',
  pairs: [
    ['Inventory turnover ratio', F.itr],
    ['Trade receivables turnover ratio', F.trt],
    ['Trade payables turnover ratio', F.tpt],
    ['Working capital turnover ratio', F.wct],
  ],
  sol: 'Each turnover ratio sets a flow for the year against the resource that produces it: cost of sales against inventory, credit sales against receivables, credit purchases against payables, revenue against working capital.',
}));

Q('ar_itr', ar({
  t: 3, d: 3, c: 'understanding', key: 'b',
  a: 'A rising inventory turnover ratio usually shows that goods are being sold more quickly.',
  r: 'Inventory turnover is computed on the cost of revenue from operations rather than on revenue, because inventory is valued at cost.',
  sol: 'Both statements are true, but R only explains why cost is the numerator; it does not explain why a rising ratio means faster sales.',
}));

const GS = position({ sc: 1200000, rs: 600000, ltb: 600000, tp: 250000, ocl: 50000, ppe: 2000000, inv: 380000, tr: 220000, cce: 100000 });
const GS_rev = 4800000;
const GS_fat = pin(times(GS_rev, GS.fixed), 2.4, 'Ghataprabha FAT');
const GS_nat = pin(times(GS_rev, GS.ce), 2, 'Ghataprabha NAT');
const GS_wct = pin(times(GS_rev, GS.wc), 12, 'Ghataprabha WCT');
Q('s3_activity_three', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Ghataprabha Sugars Ltd, an imagined company in Belagavi district, had revenue from operations of ${rs(GS_rev)} for the year. On 31 March 2026: share capital ${rs(GS.sc)}; reserves and surplus ${rs(GS.rs)}; long-term borrowings ${rs(GS.ltb)}; trade payables ${rs(GS.tp)}; other current liabilities ${rs(GS.ocl)}; property, plant and equipment (net) ${rs(GS.ppe)}; inventories ${rs(GS.inv)}; trade receivables ${rs(GS.tr)}; cash and cash equivalents ${rs(GS.cce)}. Compute the fixed asset turnover, net asset (capital employed) turnover and working capital turnover ratios.`,
  model: `- Working capital = current assets ${fig(GS.ca)} − current liabilities ${fig(GS.cl)} = ${fig(GS.wc)}.\n- Capital employed = shareholders' funds ${fig(GS.sf)} + non-current liabilities ${fig(GS.ncl)} = ${fig(GS.ce)}; check: non-current assets ${fig(GS.nca)} + working capital ${fig(GS.wc)} = ${fig(GS.nca + GS.wc)}.\n\n${ratioTable([['Fixed asset turnover', F.fat, GS_fat], ['Net asset turnover', F.nat, GS_nat], ['Working capital turnover', F.wct, GS_wct]])}`,
  sol: 'Find working capital and capital employed first (capital employed both ways must agree); each ratio then divides the same revenue by a different base.',
  scheme: [[`Fixed asset turnover ${GS_fat.s}`, 1], [`Net asset turnover ${GS_nat.s} (capital employed ${rs(GS.ce)})`, 1], [`Working capital turnover ${GS_wct.s}`, 1]],
}));

const ST = { itr: 6, rev: 1500000, gpPct: 20, gap: 40000 };
const ST_gp = pctOf(ST.gpPct, ST.rev);
const ST_cost = ST.rev - ST_gp;
const ST_avg = ST_cost / ST.itr;
check(Number.isInteger(ST_avg), 'Sankh avg');
const ST_open = ST_avg - ST.gap / 2;
const ST_close = ST_avg + ST.gap / 2;
pin(times(ST_cost, avg(ST_open, ST_close)), ST.itr, 'Sankh recomputed');
check(ST_close - ST_open === ST.gap && ST_open === 180000 && ST_close === 220000, 'Sankh figures');
Q('s3_missing_itr', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `Sankh Tiles Ltd, an imagined company, turned over its inventory ${ST.itr} times during the year. Its revenue from operations was ${rs(ST.rev)}, on which it earned a gross profit of ${ST.gpPct}%. Its closing inventory was ${rs(ST.gap)} more than its opening inventory. Find its opening and closing inventory.`,
  model: `- Gross profit = ${ST.gpPct}% of ${fig(ST.rev)} = ${fig(ST_gp)}; cost of revenue from operations = ${fig(ST.rev)} − ${fig(ST_gp)} = ${fig(ST_cost)}.\n- Average inventory = cost ÷ inventory turnover = ${fig(ST_cost)} ÷ ${ST.itr} = ${fig(ST_avg)}.\n- Opening + closing = 2 × ${fig(ST_avg)} = ${fig(2 * ST_avg)}, and closing − opening = ${fig(ST.gap)}.\n- **Closing inventory** = (${fig(2 * ST_avg)} + ${fig(ST.gap)}) ÷ 2 = **${rs(ST_close)}**; **opening inventory** = **${rs(ST_open)}**.\n\nCheck: ${fig(ST_cost)} ÷ ${fig(avg(ST_open, ST_close))} = ${ST.itr} times.`,
  sol: 'Turn the gross profit rate into cost of revenue from operations, divide by the turnover to get the average, then split the average using the given difference.',
  scheme: [[`Cost of revenue from operations ${rs(ST_cost)}`, 1], [`Average inventory ${rs(ST_avg)}`, 1], [`Opening ${rs(ST_open)} and closing ${rs(ST_close)}`, 1]],
}));

const SV = { cashRev: 600000, creditRev: 3000000, cashPur: 400000, creditPur: 2400000, dO: 280000, dC: 320000, brO: 120000, brC: 80000, cO: 180000, cC: 220000, bpO: 60000, bpC: 40000 };
const SV_avgR = avg(SV.dO + SV.brO, SV.dC + SV.brC);
const SV_avgP = avg(SV.cO + SV.bpO, SV.cC + SV.bpC);
const SV_trt = pin(times(SV.creditRev, SV_avgR), 7.5, 'Sone TRT');
const SV_tpt = pin(times(SV.creditPur, SV_avgP), 9.6, 'Sone TPT');
Q('l4_trt_tpt', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Sone Valley Traders Ltd, an imagined wholesaler in Dehri, gives the following for the year ended 31 March 2026. Compute its trade receivables turnover ratio and trade payables turnover ratio, and state what each one tells its management.\n\n${md(['Item', '1 April 2025 (₹)', '31 March 2026 (₹)'], [['Debtors', fig(SV.dO), fig(SV.dC)], ['Bills receivable', fig(SV.brO), fig(SV.brC)], ['Creditors', fig(SV.cO), fig(SV.cC)], ['Bills payable', fig(SV.bpO), fig(SV.bpC)]], [1, 2])}\n\nRevenue from operations: cash ${rs(SV.cashRev)}, credit ${rs(SV.creditRev)}. Purchases: cash ${rs(SV.cashPur)}, credit ${rs(SV.creditPur)}.`,
  model: `- Average trade receivables = (${fig(SV.dO + SV.brO)} + ${fig(SV.dC + SV.brC)}) ÷ 2 = ${fig(SV_avgR)}.\n- Average trade payables = (${fig(SV.cO + SV.bpO)} + ${fig(SV.cC + SV.bpC)}) ÷ 2 = ${fig(SV_avgP)}.\n\n${ratioTable([['Trade receivables turnover', F.trt, SV_trt], ['Trade payables turnover', F.tpt, SV_tpt]])}\n\n**Meaning:** receivables are collected about ${SV_trt.v} times a year, so credit sales stay unpaid for roughly a month and a half on average; suppliers are paid about ${SV_tpt.v} times a year, a little faster than customers pay. The company is financing part of its customers' credit itself and should watch its collections.`,
  sol: 'Use only the credit figures; trade receivables and trade payables each include the bills, averaged over the two dates.',
  scheme: [[`Average receivables ${rs(SV_avgR)}`, 0.5], [`Trade receivables turnover ${SV_trt.s}`, 1], [`Average payables ${rs(SV_avgP)}`, 0.5], [`Trade payables turnover ${SV_tpt.s}`, 1], ['Meaning of each ratio', 1]],
}));

const TT_T = trading({ rev: 2400000, open: 260000, purchases: 1880000, close: 340000 });
const TT_credit = { rev: 2000000, pur: 1500000 };
const TT_tr = { o: 180000, c: 220000 };
const TT_tp = { o: 100000, c: 150000 };
const TT = position({ sc: 1000000, rs: 600000, ltb: 400000, tp: TT_tp.c, ocl: 50000, ppe: 1500000, inv: TT_T.close, tr: TT_tr.c, cce: 140000 });
const TT_itr = pin(times(TT_T.cost, TT_T.avgInv), 6, 'Tamraparni ITR');
const TT_trt = pin(times(TT_credit.rev, avg(TT_tr.o, TT_tr.c)), 10, 'Tamraparni TRT');
const TT_tpt = pin(times(TT_credit.pur, avg(TT_tp.o, TT_tp.c)), 12, 'Tamraparni TPT');
const TT_fat = pin(times(TT_T.rev, TT.fixed), 1.6, 'Tamraparni FAT');
const TT_nat = pin(times(TT_T.rev, TT.ce), 1.2, 'Tamraparni NAT');
const TT_wct = pin(times(TT_T.rev, TT.wc), 4.8, 'Tamraparni WCT');
check(TT_T.cost === 1800000 && TT.ce === 2000000 && TT.wc === 500000, 'Tamraparni bases');
Q('l6_activity', long({
  t: 3, d: 4, c: 'application', marks: 6,
  stem: `Tamraparni Textiles Ltd, an imagined company in Tirunelveli, provides the following for the year ended 31 March 2026. Compute its (a) inventory turnover, (b) trade receivables turnover, (c) trade payables turnover, (d) fixed asset turnover, (e) net asset (capital employed) turnover and (f) working capital turnover ratios.\n\n${given([[`Revenue from operations (of which credit ${rs(TT_credit.rev)})`, TT_T.rev], [`Purchases (of which credit ${rs(TT_credit.pur)})`, TT_T.purchases], ['Inventory, 1 April 2025', TT_T.open], ['Inventory, 31 March 2026', TT_T.close], ['Trade receivables, 1 April 2025', TT_tr.o], ['Trade payables, 1 April 2025', TT_tp.o]], 'Statement of Profit and Loss data')}\n\n**Balance sheet as at 31 March 2026 (condensed)**\n\n${positionRows(TT).md}`,
  model: `**Bases**\n\n${md(['Base', 'Working', '₹'], [['Cost of revenue from operations', `${fig(TT_T.open)} + ${fig(TT_T.purchases)} − ${fig(TT_T.close)}`, fig(TT_T.cost)], ['Average inventory', `(${fig(TT_T.open)} + ${fig(TT_T.close)}) ÷ 2`, fig(TT_T.avgInv)], ['Average trade receivables', `(${fig(TT_tr.o)} + ${fig(TT_tr.c)}) ÷ 2`, fig(avg(TT_tr.o, TT_tr.c))], ['Average trade payables', `(${fig(TT_tp.o)} + ${fig(TT_tp.c)}) ÷ 2`, fig(avg(TT_tp.o, TT_tp.c))], ['Working capital', `${fig(TT.ca)} − ${fig(TT.cl)}`, fig(TT.wc)], ['Capital employed', `${fig(TT.sf)} + ${fig(TT.ncl)} (= ${fig(TT.nca)} + ${fig(TT.wc)})`, fig(TT.ce)]], [2])}\n\n${ratioTable([['(a) Inventory turnover', F.itr, TT_itr], ['(b) Trade receivables turnover', F.trt, TT_trt], ['(c) Trade payables turnover', F.tpt, TT_tpt], ['(d) Fixed asset turnover', F.fat, TT_fat], ['(e) Net asset turnover', F.nat, TT_nat], ['(f) Working capital turnover', F.wct, TT_wct]])}`,
  sol: 'Build the bases first: cost of revenue from operations, the three averages, working capital and capital employed (checked both ways). Use credit figures for receivables and payables.',
  scheme: [[`(a) ${TT_itr.s}`, 1], [`(b) ${TT_trt.s}`, 1], [`(c) ${TT_tpt.s}`, 1], [`(d) ${TT_fat.s}`, 1], [`(e) ${TT_nat.s}`, 1], [`(f) ${TT_wct.s}`, 1]],
}));

// ================================================================ t04 Profitability ratios
const MB = { rev: 2500000, cost: 1875000 };
const MB_gp = MB.rev - MB.cost;
const MB_r = pin(pct(MB_gp, MB.rev), 25, 'Musi');
const MB_x1 = pct(MB_gp, MB.cost);
const MB_x2 = pct(MB.cost, MB.rev);
Q('m_gp_ratio', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Musi Valley Bakers Ltd, an imagined bakery chain in Hyderabad, sold bread and cakes worth ${rs(MB.rev)} (revenue from operations) during the year; the cost of revenue from operations was ${rs(MB.cost)}. Its gross profit ratio is`,
  opts: [MB_r.s, MB_x1.s, MB_x2.s, `${MB_r.v / 100}%`],
  sol: `Gross profit = ${fig(MB.rev)} − ${fig(MB.cost)} = ${fig(MB_gp)}. Gross profit ratio = ${show(MB_r)}; it is always measured on revenue from operations, not on cost.`,
}));

const SO = { or: 82 };
Q('m_op_ratio_link', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `The operating ratio of an imagined fruit-processing company, Siang Orchards Ltd, is ${SO.or}% for the year. Its operating profit ratio for the same year is`,
  opts: [`${100 - SO.or}%`, `${SO.or}%`, `${100 + SO.or}%`, `${SO.or / 2}%`],
  sol: `Operating cost and operating profit together make up revenue from operations, so operating profit ratio = 100 − ${SO.or} = ${100 - SO.or}%.`,
}));

Q('m_roi_def', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'An imagined company, Tons Valley Power Ltd, wants to know how well it has used all the long-term funds invested in it. Its return on investment (return on capital employed) is computed as',
  opts: ['profit before interest and tax ÷ capital employed × 100', 'profit after tax ÷ total assets × 100', 'profit after tax ÷ share capital × 100', 'gross profit ÷ revenue from operations × 100'],
  sol: 'Capital employed is the long-term funds from owners and lenders together, so the profit set against it is the profit before paying either interest or tax.',
}));

Q('m_nonop', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'While working out the operating ratio of an imagined company, Rihand Aluminium Works Ltd, which of these items is left out?',
  opts: ['A loss on the sale of an old furnace', 'Salaries of office staff', 'Cost of revenue from operations', 'Selling and distribution expenses'],
  sol: 'The operating ratio includes only the costs of running the main business; a loss on selling a fixed asset is non-operating and is excluded.',
}));

const HC = { rev: 5000000, pbt: 600000, tax: 30 };
const HC_tax = pctOf(HC.tax, HC.pbt);
const HC_pat = HC.pbt - HC_tax;
const HC_r = pin(pct(HC_pat, HC.rev), 8.4, 'Hasdeo');
Q('m_np_after_tax', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Hasdeo Coal Washeries Ltd, an imagined company in Korba, had revenue from operations of ${rs(HC.rev)} and a profit before tax of ${rs(HC.pbt)}. Tax is ${HC.tax}% of profit before tax. Its net profit ratio after tax is`,
  opts: [HC_r.s, pct(HC.pbt, HC.rev).s, pct(HC_tax, HC.rev).s, pct(HC_pat, HC.pbt).s],
  sol: `Tax = ${fig(HC_tax)}; profit after tax = ${fig(HC.pbt)} − ${fig(HC_tax)} = ${fig(HC_pat)}. Net profit ratio after tax = ${show(HC_r)}.`,
}));

const AG_sales = 2100000;
const AG_ret = 100000;
const AG = trading({ rev: AG_sales - AG_ret, open: 180000, purchases: 1500000, direct: 20000, close: 200000 });
const AG_r = pin(pct(AG.gp, AG.rev), 25, 'Arkavathi');
Q('n_gp', num({
  t: 4, d: 3, c: 'application', marks: 2, value: AG_r.v, unit: '%', tol: 0.01,
  stem: `Arkavathi Garments Ltd, an imagined company near Bengaluru, reports: sales ${rs(AG_sales)}; sales returns ${rs(AG_ret)}; opening inventory ${rs(AG.open)}; purchases ${rs(AG.purchases)}; carriage inwards ${rs(AG.direct)}; closing inventory ${rs(AG.close)}. Compute its gross profit ratio (in %).`,
  sol: `Revenue from operations = ${fig(AG_sales)} − ${fig(AG_ret)} = ${fig(AG.rev)}. Cost of revenue from operations = ${fig(AG.open)} + ${fig(AG.purchases)} + ${fig(AG.direct)} − ${fig(AG.close)} = ${fig(AG.cost)}. Gross profit = ${fig(AG.gp)}. Gross profit ratio = ${show(AG_r)}.`,
  scheme: [[`Revenue ${rs(AG.rev)}, cost ${rs(AG.cost)}`, 1], [`Ratio ${AG_r.s}`, 1]],
}));

const KR = position({ sc: 1500000, rs: 700000, ltb: 600000, tp: 300000, ppe: 2400000, inv: 300000, tr: 250000, cce: 150000 });
const KR_pbt = 330000;
const KR_int = 90000;
const KR_r = pin(pct(KR_pbt + KR_int, KR.ce), 15, 'Kangsabati');
Q('n_roi', num({
  t: 4, d: 3, c: 'application', marks: 2, value: KR_r.v, unit: '%', tol: 0.01,
  stem: `Kangsabati Rice Mills Ltd, an imagined company in Bankura, has shareholders' funds of ${rs(KR.sf)} and a long-term bank loan of ${rs(KR.ltb)}. Its profit before tax for the year is ${rs(KR_pbt)}, after charging ${rs(KR_int)} of interest on the loan. Compute its return on investment (in %).`,
  sol: `Profit before interest and tax = ${fig(KR_pbt)} + ${fig(KR_int)} = ${fig(KR_pbt + KR_int)}. Capital employed = ${fig(KR.sf)} + ${fig(KR.ltb)} = ${fig(KR.ce)}. Return on investment = ${show(KR_r)}.`,
  scheme: [[`Profit before interest and tax and capital employed ${rs(KR.ce)}`, 1], [`Return on investment ${KR_r.s}`, 1]],
}));

Q('tf_op_sum', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? For an imagined pump maker, Suvarnamukhi Pumps Ltd, the operating ratio and the operating profit ratio of the same year always add up to 100 per cent.',
  sol: 'Both are measured on revenue from operations, and operating cost plus operating profit equals that revenue.',
}));

Q('fb_ce', fb({
  t: 4, d: 2, c: 'recall',
  stem: "When the return on investment of a company is worked out from the liabilities side of its balance sheet, capital employed = shareholders' funds + ___ liabilities.",
  acc: [['non-current', 'non current', 'noncurrent']],
  sol: "Capital employed is the long-term funds: shareholders' funds plus non-current liabilities, which also equals non-current assets plus working capital.",
}));

Q('ar_roi', ar({
  t: 4, d: 3, c: 'understanding', key: 'c',
  a: 'Return on investment shows how efficiently the long-term funds of a company have been used.',
  r: 'Return on investment is computed on profit after interest and tax.',
  sol: 'A is true. R is false: the profit used is before interest and tax, because capital employed includes the lenders’ funds on which interest is paid.',
}));

const SU = results({ rev: 3000000, cost: 2100000, opex: [['Office and administration expenses', 180000], ['Selling and distribution expenses', 120000]], nonop: [['Loss on sale of furniture', 15000]] });
const SU_gp = pin(pct(SU.gp, SU.rev), 30, 'Suru GP');
const SU_or = pin(pct(SU.opCost, SU.rev), 80, 'Suru OR');
const SU_opr = pin(pct(SU.opProfit, SU.rev), 20, 'Suru OPR');
check(SU_or.v + SU_opr.v === 100, 'Suru OR + OPR');
Q('s3_gp_op', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Suru Valley Apricots Ltd, an imagined fruit processor in Kargil, gives: revenue from operations ${rs(SU.rev)}; cost of revenue from operations ${rs(SU.cost)}; office and administration expenses ${rs(180000)}; selling and distribution expenses ${rs(120000)}; loss on sale of furniture ${rs(15000)}. Compute its gross profit ratio, operating ratio and operating profit ratio.`,
  model: `- Gross profit = ${fig(SU.rev)} − ${fig(SU.cost)} = ${fig(SU.gp)}.\n- Operating cost = ${fig(SU.cost)} + ${fig(180000)} + ${fig(120000)} = ${fig(SU.opCost)}; operating profit = ${fig(SU.rev)} − ${fig(SU.opCost)} = ${fig(SU.opProfit)}.\n\n${ratioTable([['Gross profit ratio', F.gp, SU_gp], ['Operating ratio', F.or, SU_or], ['Operating profit ratio', F.opr, SU_opr]])}\n\nThe loss on sale of furniture is non-operating and is left out. Check: ${SU_or.s} + ${SU_opr.s} = 100%.`,
  sol: 'Separate operating from non-operating items before computing; the operating ratio and the operating profit ratio must add up to 100.',
  scheme: [[`Gross profit ratio ${SU_gp.s}`, 1], [`Operating ratio ${SU_or.s}`, 1], [`Operating profit ratio ${SU_opr.s}`, 1]],
}));

const PV = results({ rev: 4000000, cost: 3000000, opex: [['Operating expenses', 500000]], oi: [['Interest received on investments', 40000]], interest: 60000, taxRate: 25 });
const PV_b = pin(pct(PV.pbt, PV.rev), 12, 'Pravara before tax');
const PV_a = pin(pct(PV.pat, PV.rev), 9, 'Pravara after tax');
Q('s3_np', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Pravara Sugar Products Ltd, an imagined company in Ahilyanagar district, gives: revenue from operations ${rs(PV.rev)}; cost of revenue from operations ${rs(PV.cost)}; operating expenses ${rs(500000)}; interest received on investments ${rs(40000)}; interest on debentures ${rs(PV.interest)}. Tax is ${PV.taxRate}% of profit before tax. Compute its net profit ratio before tax and after tax.`,
  model: `${resultRows(PV).md}\n\n- Net profit ratio (before tax) = profit before tax ÷ revenue from operations × 100 = ${show(PV_b)}.\n- Net profit ratio (after tax) = profit after tax ÷ revenue from operations × 100 = ${show(PV_a)}.`,
  sol: 'Net profit includes non-operating income and is after interest; the ratio is always on revenue from operations.',
  scheme: [[`Profit before tax ${rs(PV.pbt)} and after tax ${rs(PV.pat)}`, 1], [`Before tax ${PV_b.s}`, 1], [`After tax ${PV_a.s}`, 1]],
}));

const SVP = position({ sc: 2000000, rs: 800000, ltb: 1200000, tp: 450000, stp: 150000, ppe: 3600000, inv: 450000, tr: 350000, cce: 200000, lab: { ltb: '10% Debentures' } });
const SVP_pbt = 500000;
const SVP_int = pctOf(10, SVP.ltb);
const SVP_r = pin(pct(SVP_pbt + SVP_int, SVP.ce), 15.5, 'Sarada');
check(SVP.ce === 4000000 && SVP.nca + SVP.wc === 4000000, 'Sarada CE both ways');
Q('s3_roi_ce', short({
  t: 4, d: 4, c: 'application', marks: 3,
  stem: `Sarada Valley Paper Ltd, an imagined company, has: share capital ${rs(SVP.sc)}; reserves and surplus ${rs(SVP.rs)}; 10% debentures ${rs(SVP.ltb)}; current liabilities ${rs(SVP.cl)}; non-current assets ${rs(SVP.nca)}; current assets ${rs(SVP.ca)}. Its profit before tax is ${rs(SVP_pbt)}. Compute capital employed in two ways and its return on investment.`,
  model: `- From the liabilities side: capital employed = shareholders' funds (${fig(SVP.sc)} + ${fig(SVP.rs)}) + non-current liabilities ${fig(SVP.ltb)} = **${rs(SVP.ce)}**.\n- From the assets side: capital employed = non-current assets ${fig(SVP.nca)} + working capital (${fig(SVP.ca)} − ${fig(SVP.cl)} = ${fig(SVP.wc)}) = **${rs(SVP.nca + SVP.wc)}**.\n- Profit before interest and tax = ${fig(SVP_pbt)} + debenture interest ${fig(SVP_int)} = ${fig(SVP_pbt + SVP_int)}.\n- Return on investment = ${show(SVP_r)}.`,
  sol: 'Both routes to capital employed must give the same figure; add back debenture interest to profit before tax.',
  scheme: [['Capital employed from the liabilities side', 1], ['Capital employed from the assets side (same figure)', 1], [`Return on investment ${SVP_r.s}`, 1]],
}));

const KA_sales = 6200000;
const KA_ret = 200000;
const KA = results({ rev: KA_sales - KA_ret, cost: 4500000, opex: [['Employee benefits expense', 300000], ['Depreciation', 120000], ['Other operating expenses', 180000]], oi: [['Dividend received', 30000]], nonop: [['Loss by fire (uninsured)', 30000]], interest: 100000, taxRate: 30 });
const KA_gp = pin(pct(KA.gp, KA.rev), 25, 'Kolab GP');
const KA_or = pin(pct(KA.opCost, KA.rev), 85, 'Kolab OR');
const KA_opr = pin(pct(KA.opProfit, KA.rev), 15, 'Kolab OPR');
const KA_np = pin(pct(KA.pat, KA.rev), 9.33, 'Kolab NP');
check(!KA_np.exact && KA.pat === 560000, 'Kolab profit');
Q('l4_profitability', long({
  t: 4, d: 3, c: 'application', marks: 4,
  stem: `Kolab Agro Mills Ltd, an imagined company in Koraput, gives for the year ended 31 March 2026: sales ${rs(KA_sales)}; sales returns ${rs(KA_ret)}; cost of revenue from operations ${rs(KA.cost)}; employee benefits expense ${rs(300000)}; depreciation ${rs(120000)}; other operating expenses ${rs(180000)}; dividend received ${rs(30000)}; loss by fire (uninsured) ${rs(30000)}; interest on long-term loan ${rs(KA.interest)}; tax at ${KA.taxRate}% of profit before tax. Compute the gross profit ratio, operating ratio, operating profit ratio and net profit ratio (after tax).`,
  model: `${resultRows(KA).md}\n\n${ratioTable([['Gross profit ratio', F.gp, KA_gp], ['Operating ratio', F.or, KA_or], ['Operating profit ratio', F.opr, KA_opr], ['Net profit ratio (after tax)', F.npr, KA_np]])}\n\nRevenue from operations is net of sales returns. The dividend and the loss by fire are non-operating: they affect net profit but not the operating ratios.`,
  sol: 'Arrange the figures as an operating statement first; operating ratios stop at operating profit, the net profit ratio uses profit after tax.',
  scheme: [[`Gross profit ratio ${KA_gp.s}`, 1], [`Operating ratio ${KA_or.s}`, 1], [`Operating profit ratio ${KA_opr.s}`, 1], [`Net profit ratio ${KA_np.s}`, 1]],
}));

const YK = [
  { y: '2024-25', ca: 720000, cl: 300000, inv: 360000, rev: 5000000, gp: 1400000, pat: 450000 },
  { y: '2025-26', ca: 650000, cl: 500000, inv: 350000, rev: 6000000, gp: 1800000, pat: 360000 },
].map((x) => ({ ...x, cr: ratio(x.ca, x.cl), qr: ratio(x.ca - x.inv, x.cl), gpr: pct(x.gp, x.rev), npr: pct(x.pat, x.rev) }));
pin(YK[0].cr, 2.4, 'Yamuna CR 1'); pin(YK[1].cr, 1.3, 'Yamuna CR 2'); pin(YK[0].qr, 1.2, 'Yamuna QR 1'); pin(YK[1].qr, 0.6, 'Yamuna QR 2');
pin(YK[0].gpr, 28, 'Yamuna GP 1'); pin(YK[1].gpr, 30, 'Yamuna GP 2'); pin(YK[0].npr, 9, 'Yamuna NP 1'); pin(YK[1].npr, 6, 'Yamuna NP 2');
Q('l4_interpret', long({
  t: [1, 4], d: 4, c: 'evaluation', marks: 4,
  stem: `An investor is studying Yamuna Kitchenware Ltd, an imagined company in Faridabad. Its analyst has worked out these ratios for two years:\n\n${md(['Ratio', YK[0].y, YK[1].y], [['Current ratio', YK[0].cr.s, YK[1].cr.s], ['Quick ratio', YK[0].qr.s, YK[1].qr.s], ['Gross profit ratio', YK[0].gpr.s, YK[1].gpr.s], ['Net profit ratio (after tax)', YK[0].npr.s, YK[1].npr.s]])}\n\nInterpret the change in liquidity and in profitability, and advise the investor on what to look into before deciding.`,
  model: `**Liquidity has weakened sharply.** The current ratio fell from ${YK[0].cr.s} to ${YK[1].cr.s}, below the conventional 2 : 1, and the quick ratio halved from ${YK[0].qr.s} to ${YK[1].qr.s}, below 1 : 1. Quick assets no longer cover current liabilities; the company may struggle to pay creditors on time unless it sells inventory.\n\n**Profitability is mixed.** The gross profit ratio rose from ${YK[0].gpr.s} to ${YK[1].gpr.s}, so trading margins improved, yet the net profit ratio fell from ${YK[0].npr.s} to ${YK[1].npr.s}. Costs below gross profit (operating expenses, interest, perhaps on new short-term borrowing) have grown faster than revenue.\n\n**Advice:** before investing, examine why current liabilities rose so much (short-term loans? delayed payments?), which expenses grew, and whether the fall in net margin is a one-year effect. Compare with other firms in the industry. On present evidence the investor should be cautious.`,
  sol: 'Read each pair of ratios against its benchmark and against the other year, link the two halves (higher gross margin but lower net margin), then give a reasoned recommendation.',
  scheme: [['Liquidity change interpreted with benchmarks', 1.5], ['Gross versus net profit contrast explained', 1.5], ['Reasoned advice to the investor', 1]],
}));

const BH_T = trading({ rev: 8000000, open: 600000, purchases: 5800000, direct: 400000, close: 800000 });
const BH = results({ rev: BH_T.rev, cost: BH_T.cost, opex: [['Employee benefits expense', 600000], ['Depreciation', 200000], ['Other operating expenses', 400000]], oi: [['Interest received on investments', 40000]], nonop: [['Loss on sale of a machine', 40000]], interest: pctOf(9, 1000000), taxRate: 30 });
const BH_P = position({ sc: 2500000, rs: 1500000, ltb: 1000000, tp: 450000, stp: 150000, ppe: 4000000, nci: 400000, inv: 800000, tr: 250000, cce: 150000, lab: { ltb: '9% Debentures' } });
const BH_gp = pin(pct(BH.gp, BH.rev), 25, 'Bhagirathi GP');
const BH_or = pin(pct(BH.opCost, BH.rev), 90, 'Bhagirathi OR');
const BH_opr = pin(pct(BH.opProfit, BH.rev), 10, 'Bhagirathi OPR');
const BH_np = pin(pct(BH.pat, BH.rev), 6.21, 'Bhagirathi NP');
const BH_roi = pin(pct(BH.pbit, BH_P.ce), 16, 'Bhagirathi ROI');
check(BH_P.ce === 5000000 && BH_P.nca + BH_P.wc === BH_P.ce && BH_P.inv === BH_T.close, 'Bhagirathi CE');
Q('l6_profit_all', long({
  t: 4, d: 4, c: 'application', marks: 6,
  stem: `Bhagirathi Woollen Mills Ltd, an imagined company in Uttarkashi, provides the following for the year ended 31 March 2026: revenue from operations ${rs(BH.rev)}; opening inventory ${rs(BH_T.open)}; purchases ${rs(BH_T.purchases)}; wages and other direct expenses ${rs(BH_T.direct)}; closing inventory ${rs(BH_T.close)}; employee benefits expense (office) ${rs(600000)}; depreciation ${rs(200000)}; other operating expenses ${rs(400000)}; interest received on investments ${rs(40000)}; loss on sale of a machine ${rs(40000)}; interest on 9% debentures ${rs(BH.interest)}; tax at 30% of profit before tax.\n\n**Balance sheet as at 31 March 2026 (condensed)**\n\n${positionRows(BH_P).md}\n\nCompute (a) the gross profit ratio, (b) the operating ratio, (c) the operating profit ratio, (d) the net profit ratio after tax and (e) the return on investment, showing capital employed both ways.`,
  model: `**Operating statement**\n\n${resultRows(BH).md}\n\nCost of revenue from operations = ${fig(BH_T.open)} + ${fig(BH_T.purchases)} + ${fig(BH_T.direct)} − ${fig(BH_T.close)} = ${fig(BH_T.cost)}.\n\n**Capital employed:** shareholders' funds ${fig(BH_P.sf)} + non-current liabilities ${fig(BH_P.ncl)} = ${fig(BH_P.ce)}; non-current assets ${fig(BH_P.nca)} + working capital ${fig(BH_P.wc)} = ${fig(BH_P.nca + BH_P.wc)}.\n\n${ratioTable([['(a) Gross profit ratio', F.gp, BH_gp], ['(b) Operating ratio', F.or, BH_or], ['(c) Operating profit ratio', F.opr, BH_opr], ['(d) Net profit ratio (after tax)', F.npr, BH_np], ['(e) Return on investment', F.roi, BH_roi]])}`,
  sol: 'Prepare the operating statement down to profit after tax, separating operating from non-operating items; then compute capital employed both ways before the return on investment.',
  scheme: [[`Cost of revenue from operations ${rs(BH_T.cost)}; gross profit ratio ${BH_gp.s}`, 1.5], [`Operating ratio ${BH_or.s}`, 1], [`Operating profit ratio ${BH_opr.s}`, 0.5], [`Net profit ratio ${BH_np.s}`, 1], [`Capital employed ${rs(BH_P.ce)} both ways`, 1], [`Return on investment ${BH_roi.s}`, 1]],
}));

const KS_P = position({ sc: 2000000, rs: 1000000, ltb: 1200000, ltp: 300000, tp: 400000, stp: 100000, ppe: 3400000, nci: 200000, inv: 600000, tr: 440000, cce: 320000, prepaid: 40000, lab: { ltb: '12% Long-term loan' } });
const KS = { rev: 6000000, credit: 4800000, cost: 4500000, invOpen: 400000, trOpen: 360000 };
const KS_R = results({ rev: KS.rev, cost: KS.cost, opex: [['Operating expenses', 780000]], interest: pctOf(12, KS_P.ltb), taxRate: 25 });
const KS_cr = pin(ratio(KS_P.ca, KS_P.cl), 2.8, 'Kanhan CR');
const KS_qr = pin(ratio(KS_P.quick, KS_P.cl), 1.52, 'Kanhan QR');
const KS_de = pin(ratio(KS_P.debt, KS_P.sf), 0.5, 'Kanhan DE');
const KS_itr = pin(times(KS.cost, avg(KS.invOpen, KS_P.inv)), 9, 'Kanhan ITR');
const KS_trt = pin(times(KS.credit, avg(KS.trOpen, KS_P.tr)), 12, 'Kanhan TRT');
const KS_roi = pin(pct(KS_R.pbit, KS_P.ce), 16, 'Kanhan ROI');
check(KS_P.ce === KS_P.nca + KS_P.wc && KS_R.pbit === 720000, 'Kanhan');
Q('l6_comprehensive', long({
  t: [1, 2, 3, 4], d: 5, c: 'analysis', marks: 6,
  stem: `Kanhan Steel Fabricators Ltd, an imagined company near Nagpur, had revenue from operations of ${rs(KS.rev)} in 2025-26, of which ${rs(KS.credit)} was on credit; cost of revenue from operations ${rs(KS.cost)}; operating expenses ${rs(780000)}; interest on its 12% long-term loan for the full year; tax at 25% of profit before tax. On 1 April 2025 its inventory was ${rs(KS.invOpen)} and its trade receivables ${rs(KS.trOpen)}. Its condensed balance sheet on 31 March 2026 is:\n\n${positionRows(KS_P).md}\n\nCompute one ratio from each angle and two more: (a) current ratio, (b) quick ratio, (c) debt-equity ratio, (d) inventory turnover ratio, (e) trade receivables turnover ratio and (f) return on investment.`,
  model: `**Bases:** current assets ${fig(KS_P.ca)}; current liabilities ${fig(KS_P.cl)}; quick assets ${fig(KS_P.ca)} − ${fig(KS_P.inv)} − ${fig(KS_P.prepaid)} = ${fig(KS_P.quick)}; debt ${fig(KS_P.debt)}; equity ${fig(KS_P.sf)}; average inventory ${fig(avg(KS.invOpen, KS_P.inv))}; average trade receivables ${fig(avg(KS.trOpen, KS_P.tr))}; profit before interest and tax = ${fig(KS.rev)} − ${fig(KS.cost)} − ${fig(780000)} = ${fig(KS_R.pbit)}; capital employed ${fig(KS_P.sf)} + ${fig(KS_P.ncl)} = ${fig(KS_P.ce)} (= ${fig(KS_P.nca)} + ${fig(KS_P.wc)}).\n\n${ratioTable([['(a) Current ratio', F.current, KS_cr], ['(b) Quick ratio', F.quick, KS_qr], ['(c) Debt-equity ratio', F.de, KS_de], ['(d) Inventory turnover', F.itr, KS_itr], ['(e) Trade receivables turnover', F.trt, KS_trt], ['(f) Return on investment', F.roi, KS_roi]])}\n\nInterest (${fig(KS_R.interest)}) and tax (${fig(KS_R.tax)}) are not needed for return on investment, which uses profit before both.`,
  sol: 'Collect every base from the two statements first, taking opening figures only where an average is needed; then each ratio is a single division.',
  scheme: [[`(a) ${KS_cr.s}`, 1], [`(b) ${KS_qr.s}`, 1], [`(c) ${KS_de.s}`, 1], [`(d) ${KS_itr.s}`, 1], [`(e) ${KS_trt.s}`, 1], [`(f) ${KS_roi.s}`, 1]],
}));

const SH = { crT: 25, qrT: 15, cl: 240000, itr: 8, gpPct: 20, gap: 20000 };
const SH_ca = (SH.cl * SH.crT) / 10;
const SH_qa = (SH.cl * SH.qrT) / 10;
const SH_close = SH_ca - SH_qa;
const SH_open = SH_close - SH.gap;
const SH_avg = avg(SH_open, SH_close);
const SH_cost = SH.itr * SH_avg;
const SH_rev = (SH_cost * 100) / (100 - SH.gpPct);
check(Number.isInteger(SH_rev), 'Sharda revenue');
const SH_gp = SH_rev - SH_cost;
pin(ratio(SH_ca, SH.cl), 2.5, 'Sharda CR'); pin(ratio(SH_qa, SH.cl), 1.5, 'Sharda QR'); pin(times(SH_cost, SH_avg), SH.itr, 'Sharda ITR'); pin(pct(SH_gp, SH_rev), SH.gpPct, 'Sharda GP');
check(SH_ca === 600000 && SH_close === 240000 && SH_open === 220000 && SH_cost === 1840000 && SH_rev === 2300000, 'Sharda figures');
Q('l6_missing', long({
  t: [1, 3, 4], d: 5, c: 'analysis', marks: 6,
  stem: `From the following information about Sharda Valley Ceramics Ltd, an imagined company, find (a) current assets, (b) closing inventory, (c) opening inventory, (d) cost of revenue from operations, (e) revenue from operations and (f) gross profit:\n\n- Current ratio 2.5 : 1; quick ratio 1.5 : 1; current liabilities ${rs(SH.cl)}; the company has no prepaid expenses.\n- Inventory turnover ratio ${SH.itr} times.\n- Gross profit is ${SH.gpPct}% of revenue from operations.\n- Opening inventory was ${rs(SH.gap)} less than closing inventory.`,
  model: `1. **Current assets** = 2.5 × ${fig(SH.cl)} = **${rs(SH_ca)}**.\n2. Quick assets = 1.5 × ${fig(SH.cl)} = ${fig(SH_qa)}; with no prepaid expenses, **closing inventory** = ${fig(SH_ca)} − ${fig(SH_qa)} = **${rs(SH_close)}**.\n3. **Opening inventory** = ${fig(SH_close)} − ${fig(SH.gap)} = **${rs(SH_open)}**; average inventory = (${fig(SH_open)} + ${fig(SH_close)}) ÷ 2 = ${fig(SH_avg)}.\n4. **Cost of revenue from operations** = ${SH.itr} × ${fig(SH_avg)} = **${rs(SH_cost)}**.\n5. Cost is ${100 - SH.gpPct}% of revenue, so **revenue from operations** = ${fig(SH_cost)} × 100 ÷ ${100 - SH.gpPct} = **${rs(SH_rev)}**.\n6. **Gross profit** = ${fig(SH_rev)} − ${fig(SH_cost)} = **${rs(SH_gp)}**.\n\nCheck: ${show(ratio(SH_ca, SH.cl))}; ${show(ratio(SH_qa, SH.cl))}; ${show(times(SH_cost, SH_avg))}; ${show(pct(SH_gp, SH_rev))}.`,
  sol: 'Work in a chain: liquidity ratios give current assets and inventory; the inventory gap gives the average; turnover gives cost; the gross profit rate gives revenue.',
  scheme: [[`(a) ${rs(SH_ca)}`, 1], [`(b) ${rs(SH_close)}`, 1], [`(c) ${rs(SH_open)}`, 1], [`(d) ${rs(SH_cost)}`, 1], [`(e) ${rs(SH_rev)}`, 1], [`(f) ${rs(SH_gp)}`, 1]],
}));

FACTS.push(
  `Gomti current ratio ${MI_cr.s}, quick ${MI_qr.s}`,
  `Koyna inventories ${fig(KC_inv)}`,
  `Alaknanda balance sheet ${fig(AH.total)}, interest coverage ${AH_icr.s}`,
  `Tamraparni capital employed ${fig(TT.ce)} both ways`,
  `Bhagirathi return on investment ${BH_roi.s} on ${fig(BH_P.ce)}`,
  `Kanhan balance sheet ${fig(KS_P.total)}`,
  `Sharda revenue ${fig(SH_rev)} recomputed to all four given ratios`,
);
export { FACTS };
