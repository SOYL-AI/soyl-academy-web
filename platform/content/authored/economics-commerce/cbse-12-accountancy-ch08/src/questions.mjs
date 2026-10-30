// CBSE 12 Accountancy, ch08 Financial Statements of a Company — question bank. Every company and figure
// is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every classification key comes from the one table in acc.mjs (CLASSIFY / PL_CLASSIFY), and every
// amount is computed there from the givens: notes add up, balance sheets total, the Statement of Profit
// and Loss re-adds, so a figure in a key or model answer is never typed by hand.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, check, classOf, headOf, subOf, classTable, scheduleIII, shareCapitalNote, subNote, plNote, statementPL, plHeadOf, pctOf, PL_HEADS } from './acc.mjs';

/** Given balances as a two-column table for a stem. */
export const given = (items, head = 'Particulars') => md([head, '₹'], items.map(([l, v]) => [l, fig(v)]), [1]);
const where = (item) => `${headOf(item)} — ${subOf(item)}`;
const FACTS = [];

// ================================================================ t01 Meaning, nature, objectives, uses, limitations
Q('m_fs_components', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the Companies Act, 2013, which of the following is NOT one of the financial statements of a company?',
  opts: ["The Board's report (directors' report)", 'The Balance Sheet', 'The Statement of Profit and Loss', 'The Cash Flow Statement'],
  sol: "Section 2(40) of the Act names the balance sheet, the statement of profit and loss, the cash flow statement, the statement of changes in equity (where it applies) and the explanatory notes. The Board's report goes with them to the members but is not itself a financial statement.",
}));

Q('m_judgement', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: "The accountant of an imagined company, Malabar Coir Ltd, chooses the written-down value method of depreciation and estimates a machine's useful life at eight years. This shows that the company's financial statements are affected by",
  opts: ['personal judgements', 'recorded facts alone', 'the market value of each asset', 'the cash balance on the balance sheet date'],
  sol: 'Choosing a method and estimating a useful life are matters of opinion; another equally honest accountant could choose differently and report a different profit.',
}));

Q('m_user_creditor', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: "A supplier is deciding whether to sell raw cotton on three months' credit to an imagined spinning mill, Bhavani Yarns Ltd. In the mill's financial statements the supplier will look mainly at",
  opts: ["the mill's short-term solvency: its current assets compared with its current liabilities", "the market price of the mill's shares on the stock exchange", "the mill's expansion plans for the next ten years", 'the dividend the mill paid to its equity shareholders last year'],
  sol: 'The supplier expects to be paid within a few months, so he needs to know whether the mill can meet its short-term obligations out of its current assets.',
}));

const KOSI = { cost: 400000, now: 3000000 };
Q('m_limit_price', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined company, Kosi Flour Mills Ltd, bought land near Purnia for ${rs(KOSI.cost)} in 2004. Its balance sheet on 31 March 2026 still shows the land at ${rs(KOSI.cost)}, although similar land now sells for about ${rs(KOSI.now)}. Which limitation of financial statements does this illustrate?`,
  opts: ['They ignore changes in the price level, because assets are shown at historical cost', 'They are affected by personal judgement in the choice of depreciation methods', 'They leave out qualitative information such as the skill of employees', 'They are interim reports, because the true profit is known only when the business closes'],
  sol: `The land stays at its original cost of ${fig(KOSI.cost)}; two decades of rising prices are not reflected, so the balance sheet understates what the asset is worth today.`,
}));

Q('m_sec129', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Section 129 of the Companies Act, 2013 requires the financial statements of a company to give a true and fair view and to be drawn up in the form set out in',
  opts: ['Schedule III to the Act', 'Schedule I to the Act', 'Accounting Standard 26', "the company's articles of association"],
  sol: 'Schedule III prescribes the form of the balance sheet and of the statement of profit and loss; its Division I applies to companies that follow the Accounting Standards.',
}));

Q('m_qualitative', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined software firm, Brahmaputra Code Works Ltd, is admired for its loyal and highly skilled team. Its financial statements say nothing about this strength, because',
  opts: ['financial statements record only facts that can be expressed in money', 'the team is shown under Intangible Assets', 'employee skill is shown as a contingent liability', 'the Companies Act forbids any mention of employees'],
  sol: 'Morale, skill and the reputation of management cannot be measured in rupees, so they never enter the accounts. That is a limitation a reader must keep in mind.',
}));

Q('ar_bias', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Two companies with identical transactions can report different profits in their financial statements.',
  r: 'Financial statements are influenced by the personal judgements of accountants, for example in choosing the method of valuing inventory.',
  sol: 'Both are true. Different but acceptable choices of method and estimate change the reported profit, which is exactly why identical transactions can show different results; R explains A.',
}));

Q('ar_bs_date', ar({
  t: 1, d: 2, c: 'understanding', key: 'c',
  a: 'A balance sheet shows the financial position of a company on a particular date.',
  r: 'A balance sheet shows the revenue earned and the expenses incurred during an accounting period.',
  sol: 'A is true. R is false: revenue and expenses of a period belong to the Statement of Profit and Loss; the balance sheet lists what the company owns and owes at one moment.',
}));

Q('tf_cfs', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Cash Flow Statement is one of the financial statements of a company under the Companies Act, 2013.',
  sol: 'It is listed in Section 2(40) along with the balance sheet and the statement of profit and loss; only a one person company, a small company and a dormant company may leave it out.',
}));

Q('tf_market', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The balance sheet of a company shows every asset at its current market value.',
  sol: 'Most assets are carried at historical cost, less depreciation where it applies, and not at the price they would fetch today.',
}));

Q('fb_schedule', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The balance sheet and the statement of profit and loss of a company are prepared in the form given in Schedule ___ of the Companies Act, 2013.',
  acc: [['III', '3', 'three']],
  sol: 'Schedule III (Division I for companies that follow the Accounting Standards).',
}));

Q('mt_users', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each user of financial statements in column A with what that user mainly looks for in column B.',
  pairs: [
    ['Debenture holders and long-term lenders', 'Ability to pay interest regularly and repay the loan on time'],
    ['Trade creditors', 'Ability to pay for goods bought on credit within a few months'],
    ['Equity shareholders', 'Profitability and the safety of their investment'],
    ['Government', 'Tax payable and compliance with the law'],
  ],
  sol: 'Long-term lenders study long-term solvency; trade creditors short-term liquidity; owners the profit and dividend prospects; the government taxes and regulation.',
}));

Q('s3_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'State any three objectives of preparing financial statements.',
  model: '1. **To show the economic resources and obligations** of the company: what it owns and what it owes on the balance sheet date, so that its financial strength can be judged.\n2. **To report the earning capacity** of the company: the revenue, expenses and profit or loss of the period, so that performance can be compared over time.\n3. **To provide information about cash flows**, so that users can judge the ability of the company to generate cash and pay its way.\n4. *(Also accepted)* To help judge how effectively management has used the resources entrusted to it; to disclose accounting policies and other information that helps users understand the figures.',
  sol: 'Any three objectives, each stated with a line of explanation.',
  scheme: [['First objective with explanation', 1], ['Second objective with explanation', 1], ['Third objective with explanation', 1]],
}));

Q('s3_limitations', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain any three limitations of financial statements.',
  model: '1. **Historical in nature:** they record what has already happened; a reader who must decide about the future has to make his own forecasts.\n2. **Price-level changes ignored:** assets bought years ago stay at cost, so figures of different years are not comparable in real terms.\n3. **Only monetary facts:** the skill of the workforce, relations with customers or the quality of management are not shown, though they affect the future of the company.\n4. *(Also accepted)* Affected by personal judgement (methods of depreciation and inventory valuation, provisions); possible window dressing; not exact, because the true profit is known only when the business closes.',
  sol: 'Any three limitations, each explained in a sentence or two.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1], ['Third limitation explained', 1]],
}));

Q('s3_users_case', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: "Tunga Electricals Ltd, an imagined company in Shivamogga, has (i) applied to a bank for a five-year loan, (ii) invited the public to buy its new equity shares, and (iii) received a notice from the income-tax department. Explain how each of these three parties will use the company's financial statements.",
  model: "- **(i) The bank (long-term lender):** studies the balance sheet for long-term solvency (borrowings compared with shareholders' funds, assets available as security) and the Statement of Profit and Loss for profit large enough to pay interest regularly and repay the loan.\n- **(ii) Prospective shareholders:** look at the trend of profits, the dividends paid and the reserves built up, to judge whether the shares will earn a fair return and are safe.\n- **(iii) The income-tax department:** uses the profit shown in the Statement of Profit and Loss as the starting point to assess the tax payable, and checks the figures against the returns filed.",
  sol: 'Link each party to the decision it must take and to the part of the statements that answers it.',
  scheme: [['Bank: long-term solvency and interest-paying capacity', 1], ['Shareholders: profitability and dividends', 1], ['Tax department: profit as the base for tax', 1]],
}));

Q('s3_nature', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Financial statements are said to be a blend of recorded facts, accounting conventions and personal judgements. Explain this statement.',
  model: "- **Recorded facts:** the figures come from transactions actually entered in the books at their cost (cash in hand, amounts owed, the cost of assets); facts not recorded do not appear.\n- **Accounting conventions:** certain agreed rules are followed in presenting them, such as conservatism (provide for expected losses, not expected gains), consistency and materiality; the going-concern and money-measurement assumptions are also built in.\n- **Personal judgements:** the accountant decides the depreciation method and useful life, the method of valuing inventory and the amount of provisions, so the final figures carry his opinion.\n\nHence the statements are not a purely factual record but a mixture of all three.",
  sol: 'Explain each of the three elements with an example.',
  scheme: [['Recorded facts with example', 1], ['Conventions or postulates with example', 1], ['Personal judgements with example', 1]],
}));

Q('l4_users_case', long({
  t: 1, d: 3, c: 'analysis', marks: 4,
  stem: 'Four people are reading the financial statements of an imagined company, Damodar Coke Ltd, Dhanbad:\n\n1. Ritika holds its debentures that fall due in 2031.\n2. Farhan supplies coal to it on 60 days\' credit.\n3. Sunanda owns 500 of its equity shares and is thinking of buying more.\n4. Mr Lakra is a trade union leader negotiating a bonus for workers.\n\nFor each reader, state what he or she is most interested in and which statement or figure will answer it.',
  model: "| Reader | Main interest | Where to look |\n|---|---|---|\n| Ritika (debenture holder) | Regular interest now and repayment in 2031: long-term solvency | Balance sheet (long-term borrowings against shareholders' funds and assets); finance costs against profit in the Statement of Profit and Loss |\n| Farhan (trade creditor) | Payment within 60 days: short-term liquidity | Balance sheet: current assets against current liabilities; cash and cash equivalents; Cash Flow Statement |\n| Sunanda (shareholder) | Return and safety of her investment: profitability, dividend, growth | Statement of Profit and Loss (profit for the year and its trend); reserves and surplus in the balance sheet |\n| Mr Lakra (employees) | Capacity to pay a fair bonus and job security | Statement of Profit and Loss (profit before tax, employee benefits expense); overall financial position |",
  sol: 'Match each reader to the decision he or she faces, then to the statement or figure that informs it.',
  scheme: [['Debenture holder', 1], ['Trade creditor', 1], ['Shareholder', 1], ['Employees', 1]],
}));

Q('l4_limitations', long({
  t: 1, d: 3, c: 'evaluation', marks: 4,
  stem: 'An investor says, "The audited balance sheet and statement of profit and loss of Rupnarayan Jute Ltd, an imagined company, tell me everything I need to know before I buy its shares." Do you agree? Support your answer with any four limitations of financial statements.',
  model: "**No, I do not fully agree.** The audited statements are reliable and essential, but they do not tell the whole story:\n\n1. **They look back.** They report last year's position and results; the investor's return depends on future profits, which he must forecast for himself.\n2. **Inflation is ignored.** Old factories and land stand at their original cost, so the real worth of the assets, and the real return on them, may be quite different.\n3. **Non-money factors are missing.** The quality of management, labour relations or the threat from a new competitor do not appear, though they may decide the future of a jute company.\n4. **Judgement shapes the figures.** Depreciation methods, inventory valuation and provisions are chosen by management, so profit can differ with the choice made, and the statements may even be window-dressed.\n\nSo the investor should read the statements together with the directors' report, industry information and an analysis of trends.",
  sol: 'Take a stand, then justify it with four distinct limitations applied to the investor.',
  scheme: [['Stand taken (disagree, with reason)', 0.5], ['Four limitations explained, 0.75 each', 3], ['Conclusion: use other information too', 0.5]],
}));

Q('l6_theory', long({
  t: 1, d: 2, c: 'understanding', marks: 6,
  stem: 'What are financial statements? Explain their importance to any four groups of users.',
  model: "**Meaning.** Financial statements are the end products of the accounting process, prepared at the end of a period to show the financial position and the results of operations of an enterprise. Under Section 2(40) of the Companies Act, 2013, the financial statements of a company are the balance sheet, the statement of profit and loss, the cash flow statement, the statement of changes in equity (if applicable) and the explanatory notes. They are prepared in the form of Schedule III.\n\n**Importance to users:**\n1. **Shareholders and investors:** judge the profitability and growth of the company and the safety of their capital; decide whether to buy, hold or sell shares.\n2. **Creditors and lenders:** trade creditors judge short-term liquidity; banks and debenture holders judge long-term solvency and the ability to pay interest.\n3. **Management:** compares actual results with plans, controls costs and takes decisions on expansion, financing and dividends.\n4. **Government and regulators:** assess taxes, check compliance with company law and use aggregate figures for economic policy.\n5. *(Also accepted)* Employees (bonus, wage settlements, job security); customers (continuity of supply); researchers and the public.",
  sol: 'Give the meaning with the statutory list, then four user groups, each with the decision the statements help them take.',
  scheme: [['Meaning of financial statements', 1], ['Components under the Companies Act, 2013', 1], ['Four users, 1 mark each', 4]],
}));

// ================================================================ t02 Schedule III: classification
Q('m_calls_adv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A few shareholders of an imagined company, Tapti Polymers Ltd, sent the money for the final call along with their allotment money, months before the directors made that call. When the books close at the year end, the call is still not made. The accountant should place this money under',
  opts: [where('Calls in advance'), `${headOf('Equity share capital')} — Share Capital`, `${headOf('Debentures')} — ${subOf('Debentures')}`, `${headOf('General reserve')} — ${subOf('General reserve')}`],
  sol: 'Money paid before a call is made is not yet share capital; until the call is made the company owes it to the shareholder.',
}));

Q('m_unpaid_div', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Some shareholders of an imagined company, Sabarmati Dyes Ltd, have not yet encashed the dividend declared to them, and the amount lies in the unpaid dividend account at the year end. It appears under',
  opts: [where('Unpaid dividend'), `${headOf('Provision for tax')} — ${subOf('Provision for tax')}`, `${headOf('General reserve')} — ${subOf('General reserve')}`, `${headOf('Trade creditors')} — ${subOf('Trade creditors')}`],
  sol: 'The dividend is owed to known shareholders and payable on demand; it is neither an estimate (provision) nor an amount due to suppliers of goods.',
}));
check(subOf('Unpaid dividend') !== subOf('Provision for tax'), 'unpaid dividend vs provision');

Q('m_prov_tax', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Provision for tax is shown in the balance sheet of a company under the sub-head',
  opts: [subOf('Provision for tax'), subOf('Provision for gratuity payable on retirement'), subOf('Outstanding expenses'), subOf('General reserve')],
  sol: 'Tax for the year is payable within twelve months and is an estimated amount, so it is a short-term provision under Current Liabilities.',
}));

Q('m_loose_tools', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Loose tools of an imagined engineering company are shown in its balance sheet under',
  opts: [where('Loose tools'), where('Plant and machinery'), where('Patents'), where('Prepaid expenses')],
  sol: 'Schedule III lists loose tools among inventories: they are small, used up or lost quickly and revalued every year.',
}));

Q('m_calls_arrears', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the balance sheet of a company, calls in arrears are',
  opts: ['deducted from the called-up capital in the note on Share Capital', `shown under ${subOf('Calls in advance')}`, 'shown under Current Assets as an amount receivable from shareholders', 'added to the Securities Premium in Reserves and Surplus'],
  sol: 'The calls have been made but not paid, so paid-up capital is the called-up amount less the arrears; this is shown inside the share capital note.',
}));
check(classOf('Calls in arrears').key === 'sc', 'calls in arrears in share capital');

Q('m_debit_pl', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An accumulated loss, that is a debit balance in the Statement of Profit and Loss, is shown in the balance sheet of a company',
  opts: ['as a negative figure under Reserves and Surplus, even if this makes the total of Reserves and Surplus negative', 'on the assets side under Other Non-current Assets', 'under Current Liabilities as a provision', 'as a deduction from Share Capital in the share capital note'],
  sol: 'Schedule III does not allow a loss to be shown as an asset; it is deducted within Reserves and Surplus, the head that would have held the profit.',
}));
check(classOf('Debit balance of the Statement of Profit and Loss').key === 'rs', 'debit balance in reserves and surplus');

Q('m_op_cycle', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Godavari Vineyards Ltd, an imagined winery near Nashik, ages its wine for 30 months before sale; this is its normal operating cycle. On 31 March 2026 it holds wine that will be ready for sale in 26 months. In the balance sheet this wine is',
  opts: ['a current asset (Inventories), because it will be realised within the normal operating cycle', 'a non-current asset, because it will be sold after more than 12 months', 'Capital Work-in-Progress, because it is still being processed', 'a non-current investment, because its value grows with time'],
  sol: 'An asset held for sale or consumption within the normal operating cycle is current, however long that cycle is; the twelve-month test is used only for items outside the cycle or when no cycle can be identified.',
}));

const MC = { loan: 1000000, n: 5 };
const MC_inst = MC.loan / MC.n;
check(Number.isInteger(MC_inst) && MC_inst === 200000, 'MC instalment');
Q('m_curr_mat', mcq({
  t: 2, d: 3, c: 'application',
  stem: `On 31 March 2026 an imagined company, Kopili Hydro Ltd, owes a bank ${rs(MC.loan)} under a loan repayable in ${MC.n} equal yearly instalments, the first falling due on 31 January 2027. The amount shown under Current Liabilities for this loan is`,
  opts: [rs(MC_inst), rs(MC.loan), rs(MC.loan - MC_inst), 'nil, because the loan is long-term'],
  sol: `Each instalment is ${fig(MC.loan)} ÷ ${MC.n} = ${fig(MC_inst)}. The one due on 31 January 2027 falls within twelve months, so ${fig(MC_inst)} is a current maturity of a long-term borrowing; ${fig(MC.loan - MC_inst)} remains under Long-term Borrowings.`,
}));

Q('m_cwip', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A factory building that an imagined company is still constructing on the balance sheet date is shown as',
  opts: [`${subOf('Capital work-in-progress')}, under ${headOf('Capital work-in-progress')}`, `${subOf('Work-in-progress')} (work-in-progress), under ${headOf('Work-in-progress')}`, `${subOf('Prepaid expenses')}, under ${headOf('Prepaid expenses')}`, `${subOf('Capital advances')}, under ${headOf('Capital advances')}`],
  sol: 'A fixed asset under construction is not yet ready for use, so it is shown separately as capital work-in-progress within the property, plant and equipment group.',
}));

const INTANG_OPTS = ['Computer software', 'Computer hardware', 'Loose tools', 'Marketable securities held for sale within a year'];
check(classOf(INTANG_OPTS[0]).key === 'intang' && INTANG_OPTS.slice(1).every((x) => classOf(x).key !== 'intang'), 'intangible options');
Q('m_intangible', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which one of the following is shown under Intangible Assets in the balance sheet of a company?',
  opts: ['Computer software bought by the company', 'Computer hardware', 'Loose tools', 'Marketable securities held for sale within a year'],
  sol: 'Software has no physical form but gives the company rights it paid for; hardware is property, plant and equipment, loose tools are inventories and marketable securities are current investments.',
}));

Q('m_rev_ops', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'For an imagined bakery company, Ooty Oven Ltd, which of the following is part of Revenue from Operations?',
  opts: ['Sale of bread, cakes and biscuits', 'Interest received on a fixed deposit', 'Profit on the sale of an old delivery van', 'Dividend received on shares of another company'],
  sol: "Revenue from operations comes from the company's main business, here baking and selling; interest, dividends and gains on selling fixed assets are other income.",
}));

Q('m_fin_cost', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Interest on debentures is shown in the Statement of Profit and Loss under',
  opts: [plHeadOf('Interest on debentures'), plHeadOf('Rent'), plHeadOf('Salaries and wages'), plHeadOf('Depreciation')],
  sol: 'Interest is the cost of borrowed money, and every borrowing cost goes to one expense head.',
}));

const POCH = 18000;
Q('m_other_income', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined textile company, Pochampally Weaves Ltd, sells an old loom at a profit of ${rs(POCH)}. In its Statement of Profit and Loss this profit is`,
  opts: [`shown under ${plHeadOf('Profit on sale of machinery')}`, `added to ${PL_HEADS.rev}`, `deducted from ${PL_HEADS.dep}`, 'credited directly to General Reserve'],
  sol: 'Selling looms is not the business of a weaving company, so the gain is not operating revenue; it is income from outside the main activity.',
}));

const CHG = { open: 300000, close: 240000 };
const CHGv = CHG.open - CHG.close;
check(CHGv === 60000, 'CHG');
Q('m_chg_inv', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined manufacturer, Hooghly Glassware Ltd, had finished goods of ${rs(CHG.open)} at the start of the year and ${rs(CHG.close)} at the end. In its Statement of Profit and Loss, the change in inventories of finished goods is`,
  opts: [`${rs(CHGv)}, added to the expenses`, `${rs(CHGv)}, deducted from the expenses`, `${rs(CHG.open + CHG.close)}, added to the expenses`, `${rs(CHG.close)}, deducted from the expenses`],
  sol: `Change = opening − closing = ${fig(CHG.open)} − ${fig(CHG.close)} = ${fig(CHGv)}. Inventory fell, so goods from earlier production were sold this year; the decrease is an expense of the year.`,
}));

Q('m_sapa', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'An imagined company, Tista Tea Ltd, has received application money for shares that will be allotted next month; none of it is refundable. In the balance sheet this amount is shown',
  opts: [`as a separate head, ${headOf('Share application money pending allotment')}, in the Equity and Liabilities part`, 'under Share Capital as subscribed capital', `under ${subOf('Unpaid dividend')}`, `under ${subOf('Securities premium')}`],
  sol: 'Until allotment the applicants are not yet shareholders, so the money is not share capital; because it is not refundable it is not a current liability either, and Schedule III gives it a head of its own.',
}));

Q('m_gratuity', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined company, Periyar Rubber Ltd, provides each year for gratuity that it will pay its employees when they retire, most of them many years from now. This provision is shown under',
  opts: [where('Provision for gratuity payable on retirement'), where('Provision for tax'), where('General reserve'), where('Outstanding salaries')],
  sol: 'It is an estimate, so it is a provision; it will be paid mostly after twelve months, so it is long-term.',
}));

Q('ar_calls_adv', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Calls in advance are not added to the share capital of a company.',
  r: 'Until the call is made, money received in advance is owed by the company to the shareholder.',
  sol: 'Both are true. The amount becomes capital only when the call is made; till then it is a liability, which is why it is kept out of share capital. R explains A.',
}));

Q('ar_loose', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Loose tools are shown under Inventories in the balance sheet of a company.',
  r: 'Loose tools are long-lived assets used for many years, like plant and machinery.',
  sol: 'A is true; R is false. Loose tools are small items that wear out or get lost quickly and are revalued each year, which is why they sit with inventories and not with property, plant and equipment.',
}));

Q('ar_debit_pl', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: "A debit balance of the Statement of Profit and Loss is shown on the assets side of a company's balance sheet.",
  r: 'Under Schedule III, a debit balance of the Statement of Profit and Loss is shown as a negative figure under Reserves and Surplus.',
  sol: 'A is false: an accumulated loss is not an asset. R is true and states the correct treatment.',
}));

Q('ar_cycle', ar({
  t: 2, d: 4, c: 'analysis', key: 'a',
  a: 'Whisky held by an imagined distiller that will be sold only after 20 months can still be a current asset.',
  r: 'An asset expected to be realised within the normal operating cycle is current even when that cycle is longer than twelve months.',
  sol: 'Both are true, and R is the rule that makes A true: for a distiller the long maturing period is part of its normal operating cycle.',
}));

Q('ar_interest', ar({
  t: 2, d: 3, c: 'understanding', key: 'b',
  a: 'Interest on debentures is shown under Finance Costs in the Statement of Profit and Loss.',
  r: 'Debentures repayable after more than twelve months are shown under Long-term Borrowings.',
  sol: 'Both statements are true, but R is about where the debentures themselves appear in the balance sheet; it does not explain why their interest is a finance cost.',
}));

Q('tf_unpaid_div', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Unpaid dividend is shown under Short-term Provisions in the balance sheet of a company.',
  sol: `It is a definite amount owed to identified shareholders, so it goes under ${subOf('Unpaid dividend')}; a provision is only an estimate of an uncertain liability.`,
}));

Q('tf_interest_accrued', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Interest accrued on debentures but not yet due for payment is shown under Other Current Liabilities.',
  sol: `The interest is payable within the year and is not a borrowing in itself, so it is shown under ${subOf('Interest accrued on debentures')} in ${headOf('Interest accrued on debentures')}.`,
}));
check(subOf('Interest accrued on debentures') === 'Other Current Liabilities', 'interest accrued');

Q('fb_heads', fb({
  t: 2, d: 1, c: 'recall', marks: 2,
  stem: "Apart from share application money pending allotment, the Equity and Liabilities part of a Schedule III balance sheet has three main heads: Shareholders' Funds, ___ Liabilities and ___ Liabilities.",
  acc: [['Non-current', 'Non current', 'Noncurrent'], ['Current']],
  sol: "The three heads are Shareholders' Funds, Non-current Liabilities and Current Liabilities.",
}));

Q('fb_cycle', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'When the normal operating cycle of a company cannot be identified, it is assumed to have a duration of ___ months.',
  acc: [['12', 'twelve']],
  sol: 'It is taken as twelve months, so the twelve-month test then separates current from non-current items.',
}));

Q('fb_finance', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Interest on a bank overdraft is shown in the Statement of Profit and Loss under the head ___.',
  acc: [['Finance Costs', 'Finance Cost']],
  sol: `${plHeadOf('Interest on bank overdraft')}: interest on any borrowing, short-term or long-term, belongs here.`,
}));

const MT_LIAB = ['Calls in advance', 'Provision for tax', 'Bank overdraft', 'Debentures'];
check(new Set(MT_LIAB.map(subOf)).size === MT_LIAB.length, 'mt_liab distinct');
Q('mt_liab', match({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Match each item in column A with the sub-head of the balance sheet in column B under which a company shows it.',
  pairs: MT_LIAB.map((x) => [x, subOf(x)]),
  sol: 'Money received before a call is owed back until the call; tax is an estimated short-term amount; an overdraft is a short-term loan; debentures run for years.',
}));

const MT_ASSETS = ['Loose tools', 'Patents', 'Bills receivable', 'Cheques in hand'];
check(new Set(MT_ASSETS.map(subOf)).size === MT_ASSETS.length, 'mt_assets distinct');
Q('mt_assets', match({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'An imagined company lists four assets. Match each asset in column A with its sub-head in column B.',
  pairs: MT_ASSETS.map((x) => [x, subOf(x)]),
  sol: 'Loose tools go with inventories; a patent is an intangible right; a bill receivable arises from credit sales; a cheque in hand is as good as cash.',
}));

const MT_PL = ['Contribution to provident fund', 'Interest on bank loan', 'Dividend received', 'Advertisement'];
check(new Set(MT_PL.map(plHeadOf)).size === MT_PL.length, 'mt_pl distinct');
Q('mt_pl', match({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Match each item of an imagined company in column A with the head of its Statement of Profit and Loss in column B.',
  pairs: MT_PL.map((x) => [x, plHeadOf(x)]),
  sol: 'Provident fund is a cost of employing staff; loan interest is a borrowing cost; dividends from other companies are outside the main business; publicity is a general expense.',
}));

// ---------------------------------------------------------------- numericals
const SH = { assets: 3600000, ncl: 900000, cl: 640000 };
const SHv = SH.assets - SH.ncl - SH.cl;
check(SHv === 2060000, 'SH');
Q('n_sf', num({
  t: 2, d: 2, c: 'application', marks: 2, value: SHv, unit: '₹',
  stem: `The balance sheet of an imagined company, Sharavati Tiles Ltd, shows total assets of ${rs(SH.assets)}, non-current liabilities of ${rs(SH.ncl)} and current liabilities of ${rs(SH.cl)}. Find its shareholders' funds (in ₹).`,
  sol: `Equity and liabilities equal total assets, so shareholders' funds = ${fig(SH.assets)} − ${fig(SH.ncl)} − ${fig(SH.cl)} = ${fig(SHv)}, that is ₹${fig(SHv)}.`,
  scheme: [['Total assets less both kinds of liabilities', 1], [`Shareholders' funds ${rs(SHv)}`, 1]],
}));

const PU = shareCapitalNote({ fv: 10, authorised: 100000, issued: 70000, part: { n: 60000, called: 8 }, arrears: 4500 });
check(PU.amount === 475500 && PU.called === 480000, 'PU');
Q('n_paidup', num({
  t: 2, d: 3, c: 'application', marks: 2, value: PU.amount, unit: '₹',
  stem: `An imagined company, Wainganga Paper Ltd, has 60,000 equity shares of ₹10 each subscribed, on which ₹8 per share has been called up. A shareholder holding 1,500 shares has not paid the last call of ₹3 per share. What amount of share capital will the company show in its balance sheet (in ₹)?`,
  sol: `Called-up capital = 60,000 × 8 = ${fig(PU.called)}; calls in arrears = 1,500 × 3 = ${fig(4500)}; paid-up capital = ${fig(PU.called)} − ${fig(4500)} = ${fig(PU.amount)}, that is ₹${fig(PU.amount)}.`,
  scheme: [[`Called-up capital ${rs(PU.called)} less arrears`, 1], [`Share capital ${rs(PU.amount)}`, 1]],
}));
check(1500 * 3 === 4500, 'PU arrears');

const CL_ITEMS = [['Trade creditors', 84000], ['Bills payable', 16000], ['Provision for tax', 40000], ['Bank overdraft', 30000], ['9% Debentures (redeemable in 2031)', 200000, 'Debentures'], ['Calls in advance', 5000], ['Provision for gratuity payable on retirement', 22000]];
const CLv = sum(CL_ITEMS.filter(([l, , c = l]) => headOf(c) === 'Current Liabilities').map(([, v]) => v));
check(CLv === 175000, 'CLv');
Q('n_curr_liab', num({
  t: 2, d: 3, c: 'application', marks: 2, value: CLv, unit: '₹',
  stem: `From the following balances of an imagined company, Indus Valves Ltd, find the total of Current Liabilities in its balance sheet (in ₹):\n\n${given(CL_ITEMS.map(([l, v]) => [l, v]))}`,
  sol: `Current liabilities: ${CL_ITEMS.filter(([l, , c = l]) => headOf(c) === 'Current Liabilities').map(([l, v]) => `${l.toLowerCase()} ${fig(v)}`).join(', ')}; total ${fig(CLv)}, that is ₹${fig(CLv)}. The debentures and the gratuity provision are non-current.`,
  scheme: [['Current items picked out correctly', 1], [`Total ${rs(CLv)}`, 1]],
}));

const PPE_ITEMS = [['Land', 500000], ['Plant and machinery', 360000], ['Accumulated depreciation on plant and machinery', 90000, 'Accumulated depreciation'], ['Patents', 50000], ['Vehicles', 140000]];
const PPEn = subNote(1, PPE_ITEMS.filter(([l, , c = l]) => classOf(c).key === 'ppe'));
check(PPEn.total === 910000, 'PPEn');
Q('n_ppe', num({
  t: 2, d: 2, c: 'application', marks: 2, value: PPEn.total, unit: '₹',
  stem: `An imagined transport company, Chenab Carriers Ltd, has the following balances. Find the amount it will show against Property, Plant and Equipment (in ₹):\n\n${given(PPE_ITEMS.map(([l, v]) => [l, v]))}`,
  sol: `Land ${fig(500000)} + plant ${fig(360000)} + vehicles ${fig(140000)} − accumulated depreciation ${fig(90000)} = ${fig(PPEn.total)}, that is ₹${fig(PPEn.total)}. Patents are intangible and are shown separately.`,
  scheme: [['Tangible assets added, depreciation deducted, patents excluded', 1], [`Amount ${rs(PPEn.total)}`, 1]],
}));

const COM = { opening: 75000, purchases: 620000, closing: 95000 };
const COMv = COM.opening + COM.purchases - COM.closing;
check(COMv === 600000, 'COM');
Q('n_com', num({
  t: 2, d: 3, c: 'application', marks: 2, value: COMv, unit: '₹',
  stem: `An imagined furniture maker, Saryu Woodcraft Ltd, had timber worth ${rs(COM.opening)} at the start of the year, bought timber worth ${rs(COM.purchases)} during the year and had timber worth ${rs(COM.closing)} at the end. Find the cost of materials consumed (in ₹).`,
  sol: `Cost of materials consumed = opening + purchases − closing = ${fig(COM.opening)} + ${fig(COM.purchases)} − ${fig(COM.closing)} = ${fig(COMv)}, that is ₹${fig(COMv)}.`,
  scheme: [['Formula: opening + purchases − closing', 1], [`Answer ${rs(COMv)}`, 1]],
}));

const PBT = { rev: 1800000, oi: 50000, exp: [940000, 260000, 70000, 90000, 160000] };
const PBTv = PBT.rev + PBT.oi - sum(PBT.exp);
check(PBTv === 330000, 'PBT');
Q('n_pbt', num({
  t: 2, d: 3, c: 'application', marks: 2, value: PBTv, unit: '₹',
  stem: `For the year ended 31 March 2026, an imagined company, Mandakini Ayurveda Ltd, shows: revenue from operations ${rs(PBT.rev)}; other income ${rs(PBT.oi)}; cost of materials consumed ${rs(PBT.exp[0])}; employee benefits expense ${rs(PBT.exp[1])}; finance costs ${rs(PBT.exp[2])}; depreciation and amortisation expense ${rs(PBT.exp[3])}; other expenses ${rs(PBT.exp[4])}. Find its profit before tax (in ₹).`,
  sol: `Total income = ${fig(PBT.rev)} + ${fig(PBT.oi)} = ${fig(PBT.rev + PBT.oi)}; total expenses = ${fig(sum(PBT.exp))}; profit before tax = ${fig(PBT.rev + PBT.oi)} − ${fig(sum(PBT.exp))} = ${fig(PBTv)}, that is ₹${fig(PBTv)}.`,
  scheme: [['Total income and total expenses', 1], [`Profit before tax ${rs(PBTv)}`, 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
const IC = shareCapitalNote({ fv: 10, authorised: 300000, issued: 200000, full: 187500, part: { n: 2500, called: 10 }, arrears: 10000 });
check(IC.amount === 1890000 && 2500 * 4 === 10000, 'IC');
const IC_BS = scheduleIII({ date: '31 March 2026', shareCapital: IC, items: [], only: 'el' });
Q('s3_share_note', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Indravati Cables Ltd, an imagined company in Jagdalpur, is registered with an authorised capital of 3,00,000 equity shares of ₹10 each. It issued 2,00,000 shares, of which 1,90,000 were subscribed. All the money has been called up. A shareholder holding 2,500 shares has not paid the final call of ₹4 per share. Show the share capital in the balance sheet of the company as at 31 March 2026 and prepare the note to accounts.',
  model: `**Balance Sheet of Indravati Cables Ltd as at 31 March 2026 (extract)**\n\n${IC_BS.md}\n\n**Notes to Accounts**\n\n${IC_BS.notesMd}\n\nWorking: calls in arrears = 2,500 × ₹4 = ${rs(10000)}; paid-up capital = ${fig(IC.called)} − ${fig(10000)} = ${fig(IC.amount)}.`,
  sol: 'Authorised and issued capital are shown for information only; the amount carried to the balance sheet is subscribed and called-up capital less calls in arrears.',
  scheme: [['Balance sheet extract under Shareholders\' Funds', 1], ['Authorised, issued and subscribed capital in the note', 1], [`Calls in arrears deducted; ${rs(IC.amount)}`, 1]],
}));

const CA_ITEMS = ['Bills payable', 'Goodwill', 'Stores and spares', 'Securities premium', 'Long-term loan from a bank', 'Cheques in hand'];
Q('s3_classify_a', short({
  t: 2, d: 2, c: 'application', marks: 3,
  stem: `Classify the following items under major heads and sub-heads of the balance sheet of a company as per Schedule III of the Companies Act, 2013:\n\n${CA_ITEMS.map((x, i) => `(${'i ii iii iv v vi'.split(' ')[i]}) ${x}`).join('; ')}.`,
  model: classTable(CA_ITEMS),
  sol: 'Half a mark for each item with both the major head and the sub-head correct.',
  scheme: CA_ITEMS.map((x) => [`${x}: ${subOf(x)}`, 0.5]),
}));

const CB_ITEMS = [['Amount received from a shareholder on a call not yet made', 'Calls in advance'], ['Dividend declared but not yet claimed by some shareholders', 'Unpaid dividend'], ['Estimated income tax for the year', 'Provision for tax'], ['A warehouse still under construction', 'Capital work-in-progress'], ['Shares of a listed company bought to be sold within a few months', 'Marketable securities held for sale within a year'], ['Money paid to a supplier before the goods arrive', 'Advance to suppliers']];
Q('s3_classify_b', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `While finalising its accounts, an imagined company, Ken Valley Foods Ltd, has to place six balances in its balance sheet. State the major head and the sub-head under which each appears:\n\n${CB_ITEMS.map(([l], i) => `${i + 1}. ${l}`).join('\n')}`,
  model: classTable(CB_ITEMS),
  sol: 'Identify what each balance is (a liability, an estimate, an asset under construction, a short-term holding), then place it.',
  scheme: CB_ITEMS.map(([l, c]) => [`${c}: ${subOf(c)}`, 0.5]),
}));

Q('s3_op_cycle', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: "What is meant by the 'operating cycle' of a business? Using the operating cycle and the twelve-month rule, state whether each of the following is current or non-current for an imagined furniture maker, Narmada Teak Ltd, with an operating cycle of eight months: (a) amounts due from customers, to be collected in four months; (b) a bank loan repayable in one lump sum after three years.",
  model: "**Operating cycle:** the time between acquiring assets for processing (raw materials) and realising them in cash or cash equivalents (after the goods are made, sold and paid for). If it cannot be identified, it is taken to be twelve months.\n\n- **(a) Amounts due from customers:** realised within the eight-month operating cycle, so they are a **current asset** (Trade Receivables).\n- **(b) Loan repayable after three years:** not payable within the operating cycle or within twelve months of the balance sheet date, so it is a **non-current liability** (Long-term Borrowings).",
  sol: 'Define the cycle, then test each item against the cycle and the twelve-month rule.',
  scheme: [['Meaning of operating cycle', 1], ['(a) current asset with reason', 1], ['(b) non-current liability with reason', 1]],
}));
check(subOf('Trade debtors') === 'Trade Receivables' && subOf('Long-term loan from a bank') === 'Long-term Borrowings', 'op cycle keys');

const MS = { loan: 1200000, n: 6 };
const MS_inst = MS.loan / MS.n;
const MS_out = MS.loan - MS_inst;
const MS_BS = scheduleIII({ date: '31 March 2026', only: 'el', items: [['Term loan from a bank (repayable after 31 March 2027)', MS_out - MS_inst, 'Long-term loan from a bank'], ['Current maturities of the term loan', MS_inst, 'Current maturities of long-term borrowings']] });
check(MS_inst === 200000 && MS_out === 1000000 && MS_BS.total === MS_out, 'MS');
Q('s3_curr_mat', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `On 1 April 2025 an imagined company, Mahi Solar Ltd, borrowed ${rs(MS.loan)} from a bank, repayable in ${MS.n} equal instalments on 31 December each year from 31 December 2025. The first instalment was paid on time. Show how the loan will appear in the balance sheet of the company as at 31 March 2026.`,
  model: `Instalment = ${fig(MS.loan)} ÷ ${MS.n} = ${fig(MS_inst)}. Outstanding on 31 March 2026 = ${fig(MS.loan)} − ${fig(MS_inst)} = ${fig(MS_out)}. The instalment due on 31 December 2026 falls within twelve months: ${fig(MS_inst)} is a current liability; the remaining ${fig(MS_out - MS_inst)} is long-term.\n\n**Balance Sheet of Mahi Solar Ltd as at 31 March 2026 (extract)**\n\n${MS_BS.md}\n\n(Schedule III, as amended in 2021, shows current maturities of long-term borrowings under Short-term Borrowings.)`,
  sol: 'Split the outstanding loan at the twelve-month line: the next instalment is current, the rest non-current.',
  scheme: [['Outstanding balance after the first instalment', 1], [`Long-term Borrowings ${rs(MS_out - MS_inst)}`, 1], [`Current maturity ${rs(MS_inst)} under Current Liabilities`, 1]],
}));

const TW = subNote(1, [['Securities premium', 60000], ['General reserve', 120000], ['Surplus, i.e. balance in the Statement of Profit and Loss (debit balance)', 210000, 'Debit balance of the Statement of Profit and Loss']]);
check(TW.total === -30000, 'TW');
Q('s3_rs_note', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `An imagined company, Tawi Woollens Ltd, has on 31 March 2026 a Securities Premium of ${rs(60000)}, a General Reserve of ${rs(120000)} and a debit balance of ${rs(210000)} in its Statement of Profit and Loss. Prepare the note on Reserves and Surplus and state how the total will appear in the balance sheet.`,
  model: `${TW.md}\n\nThe debit balance is deducted inside Reserves and Surplus even though it is larger than the reserves. Reserves and Surplus therefore appears under Shareholders' Funds as a **negative figure of ${rs(TW.total)}**, which reduces the shareholders' funds; it is not shown as an asset.`,
  sol: 'Deduct the accumulated loss inside the same head and let the head go negative if it must.',
  scheme: [['Securities premium and general reserve listed', 1], ['Debit balance deducted', 1], [`Total ${rs(TW.total)} shown as a negative figure`, 1]],
}));

const KS_EMP = plNote(1, [['Salaries and wages', 340000], ['Contribution to provident fund', 26000], ['Staff welfare expenses', 14000]]);
const KS_FIN = plNote(2, [['Interest on debentures', 45000], ['Interest on bank overdraft', 9000]]);
check(KS_EMP.total === 380000 && KS_FIN.total === 54000, 'KS');
Q('s3_pl_notes', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `From the following items of an imagined company, Kalinga Steel Furniture Ltd, for the year ended 31 March 2026, prepare the notes to accounts on Employee Benefits Expense and Finance Costs:\n\n${given([['Interest on debentures', 45000], ['Salaries and wages', 340000], ['Interest on bank overdraft', 9000], ['Contribution to provident fund', 26000], ['Staff welfare expenses', 14000]], 'Item')}`,
  model: `${md(['Note No.', 'Particulars', '₹'], [...KS_EMP.rows, ...KS_FIN.rows], [2])}\n\nEmployee benefits expense ${rs(KS_EMP.total)} and finance costs ${rs(KS_FIN.total)} are carried to the Statement of Profit and Loss with these note numbers.`,
  sol: 'Sort each item to its head first, then total each note.',
  scheme: [['Employee benefits items identified', 0.5], [`Employee benefits note ${rs(KS_EMP.total)}`, 1], ['Finance cost items identified', 0.5], [`Finance costs note ${rs(KS_FIN.total)}`, 1]],
}));

const BM_PPE = subNote(1, [['Land', 600000], ['Buildings', 450000], ['Plant and machinery', 320000], ['Accumulated depreciation on buildings and plant', 110000, 'Accumulated depreciation']]);
const BM_INT = subNote(2, [['Patents', 80000], ['Trademarks', 40000], ['Computer software', 30000]]);
check(BM_PPE.total === 1260000 && BM_INT.total === 150000, 'BM');
Q('s3_ppe_note', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined company, Banas Marble Ltd, has the following balances on 31 March 2026. Prepare the notes on Property, Plant and Equipment and on Intangible Assets:\n\n${given([['Land', 600000], ['Trademarks', 40000], ['Buildings', 450000], ['Computer software', 30000], ['Plant and machinery', 320000], ['Patents', 80000], ['Accumulated depreciation on buildings and plant', 110000]])}`,
  model: `${md(['Note No.', 'Particulars', '₹'], [...BM_PPE.rows, ...BM_INT.rows], [2])}\n\nIn the balance sheet both appear under Non-current Assets, (a) ${'Property, Plant and Equipment and Intangible Assets'}: (i) ${rs(BM_PPE.total)} and (ii) ${rs(BM_INT.total)}.`,
  sol: 'Tangible assets net of accumulated depreciation in one note; rights without physical form in the other.',
  scheme: [['Tangible assets listed', 0.5], [`Depreciation deducted: ${rs(BM_PPE.total)}`, 1], ['Intangible assets listed', 0.5], [`Intangible assets ${rs(BM_INT.total)}`, 1]],
}));

// ---------------------------------------------------------------- long answers (4 marks)
const L4A_ITEMS = ['Loose tools', 'Unpaid dividend', 'Provision for gratuity payable on retirement', 'Calls in arrears', 'Trademarks', 'Interest accrued on investments', 'Bank overdraft', 'Capital reserve'];
Q('l4_classify_a', long({
  t: 2, d: 2, c: 'application', marks: 4,
  stem: `Under which major head and sub-head (if any) will each of the following items be presented in the balance sheet of a company as per Schedule III, Part I of the Companies Act, 2013?\n\n${L4A_ITEMS.map((x, i) => `${i + 1}. ${x}`).join('\n')}`,
  model: classTable(L4A_ITEMS),
  sol: 'Half a mark per item: the major head and the sub-head must both be right.',
  scheme: L4A_ITEMS.map((x) => [`${x}: ${headOf(x)}, ${subOf(x)}`, 0.5]),
}));

const L4B_ITEMS = [
  ['Maturing wine held by a vintner whose operating cycle is 30 months', 'Work-in-progress'],
  ['Amount received on shares before the call was made', 'Calls in advance'],
  ['A ten-year term loan from a bank, excluding the instalment due next year', 'Long-term loan from a bank'],
  ['The instalment of that loan due within the next twelve months', 'Current maturities of long-term borrowings'],
  ['Shares of another company bought to be sold within six months', 'Marketable securities held for sale within a year'],
  ['Salary for March owed to staff and paid in April', 'Outstanding salaries'],
  ['Advance paid to a builder for a new office block', 'Capital advances'],
  ['Insurance premium paid for the next financial year', 'Prepaid insurance'],
];
Q('l4_classify_b', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `The accountant of an imagined company, Sarju Beverages Ltd, describes eight balances in plain words. Decide the major head and the sub-head of the Schedule III balance sheet for each, keeping the operating cycle and the twelve-month rule in mind:\n\n${L4B_ITEMS.map(([l], i) => `${i + 1}. ${l}`).join('\n')}`,
  model: `${classTable(L4B_ITEMS)}\n\nThe wine is current although it will be sold after more than twelve months, because it is realised within the normal operating cycle; the loan is split at the twelve-month line.`,
  sol: 'Name each balance in accounting terms first, then classify it.',
  scheme: L4B_ITEMS.map(([l, c]) => [`${c}: ${subOf(c)}`, 0.5]),
}));

const WC = shareCapitalNote({ fv: 10, authorised: 100000, issued: 80000, full: 80000 });
const WC_ITEMS = [['Securities premium', 50000], ['General reserve', 100000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 70000], ['10% Debentures', 300000, 'Debentures'], ['Trade creditors', 110000], ['Bills payable', 40000], ['Provision for tax', 60000], ['Outstanding expenses', 20000]];
const WC_BS = scheduleIII({ date: '31 March 2026', shareCapital: WC, items: WC_ITEMS, only: 'el' });
check(WC_BS.total === 1550000, 'WC');
Q('l4_el_side', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Wardha Cotton Ltd, an imagined company, has an authorised capital of 1,00,000 equity shares of ₹10 each, of which 80,000 shares were issued, subscribed and fully paid. Its other balances on 31 March 2026 were:\n\n${given(WC_ITEMS.map(([l, v]) => [l, v]))}\n\nPrepare the Equity and Liabilities part of its balance sheet as per Schedule III, with notes to accounts.`,
  model: `**Balance Sheet of Wardha Cotton Ltd as at 31 March 2026 (Equity and Liabilities)**\n\n${WC_BS.md}\n\n**Notes to Accounts**\n\n${WC_BS.notesMd}`,
  sol: 'Group each balance under its sub-head, give a note wherever a sub-head has more than one item, and total the part.',
  scheme: [["Shareholders' Funds with share capital note", 1.5], ['Non-current Liabilities', 0.5], ['Current Liabilities with notes', 1.5], [`Total ${rs(WC_BS.total)}`, 0.5]],
}));

const BP_ITEMS = [['Plant and machinery', 750000], ['Furniture and fittings', 120000], ['Accumulated depreciation', 170000], ['Goodwill', 100000], ['Long-term investments', 150000], ['Stock-in-trade', 240000], ['Loose tools', 30000], ['Trade debtors', 220000], ['Bills receivable', 30000], ['Provision for doubtful debts', 10000], ['Cash at bank', 90000], ['Advance to suppliers', 18000], ['Prepaid insurance', 12000]];
const BP_BS = scheduleIII({ date: '31 March 2026', items: BP_ITEMS, only: 'as' });
check(BP_BS.total === 1580000, 'BP');
Q('l4_assets_side', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Prepare the Assets part of the balance sheet of Bhima Pumps Ltd, an imagined company in Solapur, as at 31 March 2026 as per Schedule III, along with notes to accounts, from these balances:\n\n${given(BP_ITEMS)}`,
  model: `**Balance Sheet of Bhima Pumps Ltd as at 31 March 2026 (Assets)**\n\n${BP_BS.md}\n\n**Notes to Accounts**\n\n${BP_BS.notesMd}`,
  sol: 'Non-current assets first, then current assets; deductions (depreciation, doubtful debts) go inside the notes.',
  scheme: [['Non-current assets with notes', 1.5], ['Inventories and trade receivables notes', 1.5], ['Other current assets and cash', 0.5], [`Total ${rs(BP_BS.total)}`, 0.5]],
}));

const SF = statementPL({ year: '31 March 2026', items: [['Sale of products', 1200000], ['Dividend received', 20000], ['Purchases of stock-in-trade', 750000], ['Salaries and wages', 160000], ['Interest on bank loan', 25000], ['Depreciation', 40000], ['Rent', 60000], ['Advertisement', 35000]], inventories: { opening: [['stock-in-trade', 150000]], closing: [['stock-in-trade', 180000]] } });
check(SF.pbt === 180000 && SF.tot.chg === -30000 && SF.totalExp === 1040000, 'SF');
Q('l4_pl_simple', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Sona Footwear Ltd, an imagined trading company in Agra, buys shoes and sells them to retailers. From the following, prepare its Statement of Profit and Loss for the year ended 31 March 2026 with notes to accounts:\n\n${given([['Sale of shoes (revenue from operations)', 1200000], ['Dividend received', 20000], ['Purchases of shoes for resale', 750000], ['Inventory of shoes, 1 April 2025', 150000], ['Inventory of shoes, 31 March 2026', 180000], ['Salaries and wages', 160000], ['Interest on bank loan', 25000], ['Depreciation', 40000], ['Rent', 60000], ['Advertisement', 35000]], 'Item')}`,
  model: `**Statement of Profit and Loss of Sona Footwear Ltd for the year ended 31 March 2026**\n\n${SF.md}\n\n**Notes to Accounts**\n\n${SF.notesMd}\n\nInventory rose by ${fig(-SF.tot.chg)}, so the change is negative and reduces the total expenses.`,
  sol: 'Purchases of goods for resale are a separate head; a rise in inventory is a negative change.',
  scheme: [['Revenue, other income and total income', 1], ['Purchases and change in inventories (negative)', 1], ['Other expense heads and notes', 1], [`Profit before tax ${rs(SF.pbt)}`, 1]],
}));

const NC = shareCapitalNote({ fv: 10, authorised: 100000, issued: 80000, part: { n: 75000, called: 7 }, arrears: 4500 });
const NC_BS = scheduleIII({ date: '31 March 2026', shareCapital: NC, only: 'el', items: [['Capital reserve', 30000], ['Securities premium', 75000], ['General reserve', 40000], ['Surplus, i.e. balance in the Statement of Profit and Loss (debit balance)', 95000, 'Debit balance of the Statement of Profit and Loss']] });
check(NC.amount === 520500 && NC_BS.subTotal.rs === 50000 && NC_BS.total === 570500, 'NC');
Q('l4_share_rs', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `Netravati Cashews Ltd, an imagined company in Mangaluru, has an authorised capital of 1,00,000 equity shares of ₹10 each. It issued 80,000 shares at a premium of ₹1 per share, and 75,000 shares were subscribed. The premium has been received in full, and ₹7 per share has been called up on capital account; calls in arrears are ${rs(4500)}. Its other balances are a Capital Reserve of ${rs(30000)}, a Securities Premium of ${rs(75000)}, a General Reserve of ${rs(40000)} and a debit balance of ${rs(95000)} in the Statement of Profit and Loss. Present the Shareholders' Funds in its balance sheet as at 31 March 2026 with notes.`,
  model: `**Balance Sheet of Netravati Cashews Ltd as at 31 March 2026 (extract)**\n\n${NC_BS.md}\n\n**Notes to Accounts**\n\n${NC_BS.notesMd}\n\nWorkings: called-up capital 75,000 × ₹7 = ${fig(NC.called)}; less arrears ${fig(4500)} = ${fig(NC.amount)}. The accumulated loss is deducted within Reserves and Surplus, which still totals ${rs(NC_BS.subTotal.rs)}.`,
  sol: 'Share capital: subscribed and called up less arrears; reserves: every reserve listed, the accumulated loss deducted.',
  scheme: [['Authorised, issued and subscribed capital in the note', 1], [`Called up less arrears: ${rs(NC.amount)}`, 1], [`Reserves and Surplus with the debit balance deducted: ${rs(NC_BS.subTotal.rs)}`, 1.5], [`Shareholders' funds ${rs(NC_BS.total)}`, 0.5]],
}));

// ---------------------------------------------------------------- long answers (6 marks)
const VP = shareCapitalNote({ fv: 10, authorised: 200000, issued: 120000, full: 120000 });
const VP_ITEMS = [['General reserve', 240000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 110000], ['9% Debentures', 400000, 'Debentures'], ['Trade creditors', 185000], ['Bills payable', 45000], ['Provision for tax', 70000], ['Outstanding expenses', 30000], ['Land and buildings', 900000], ['Plant and machinery', 650000], ['Accumulated depreciation', 150000], ['Patents', 120000], ['Long-term investments', 200000], ['Raw materials', 90000], ['Finished goods', 130000], ['Trade debtors', 160000], ['Bills receivable', 40000], ['Cash at bank', 125000], ['Cash in hand', 15000]];
const VP_BS = scheduleIII({ date: '31 March 2026', shareCapital: VP, items: VP_ITEMS });
check(VP_BS.total === 2280000, 'VP');
Q('l6_bs1', long({
  t: 2, d: 3, c: 'application', marks: 6,
  stem: `Vaigai Polymers Ltd, an imagined company in Madurai, has an authorised capital of 2,00,000 equity shares of ₹10 each; 1,20,000 shares are issued, subscribed and fully paid. From its other balances on 31 March 2026 given below, prepare its balance sheet as per Schedule III of the Companies Act, 2013, with notes to accounts.\n\n${given(VP_ITEMS)}`,
  model: `**Balance Sheet of Vaigai Polymers Ltd as at 31 March 2026**\n\n${VP_BS.md}\n\n**Notes to Accounts**\n\n${VP_BS.notesMd}`,
  sol: 'Classify every balance first, build the notes, carry the note totals to the face of the balance sheet and check that both parts agree.',
  scheme: [["Shareholders' Funds with notes", 1.5], ['Non-current and current liabilities with notes', 1.5], ['Non-current assets with notes', 1.5], ['Current assets with notes', 1], [`Both totals ${rs(VP_BS.total)}`, 0.5]],
}));

const MH = shareCapitalNote({ fv: 10, authorised: 150000, issued: 100000, part: { n: 100000, called: 8 }, arrears: 6000 });
const MH_LOAN = { total: 300000, current: 60000 };
const MH_ITEMS = [['General reserve', 150000], ['Surplus, i.e. balance in the Statement of Profit and Loss (debit balance)', 40000, 'Debit balance of the Statement of Profit and Loss'], ['Term loan from a bank (excluding the current instalment)', MH_LOAN.total - MH_LOAN.current, 'Long-term loan from a bank'], ['Current maturities of the term loan', MH_LOAN.current, 'Current maturities of long-term borrowings'], ['Trade creditors', 126000], ['Unpaid dividend', 8000], ['Calls in advance', 4000], ['Provision for tax', 38000], ['Buildings', 500000], ['Plant and machinery', 480000], ['Accumulated depreciation', 180000], ['Computer software', 60000], ['Raw materials', 110000], ['Finished goods', 90000], ['Loose tools', 20000], ['Trade debtors', 180000], ['Provision for doubtful debts', 9000], ['Cash at bank', 102000], ['Cheques in hand', 12000], ['Prepaid expenses', 15000]];
const MH_BS = scheduleIII({ date: '31 March 2026', shareCapital: MH, items: MH_ITEMS });
check(MH.amount === 794000 && MH_BS.total === 1380000 && MH_BS.subTotal.rs === 110000, 'MH');
const MH_GIVEN = [['General reserve', 150000], ['Statement of Profit and Loss (debit balance)', 40000], [`Term loan from a bank (of which ${rs(MH_LOAN.current)} is repayable by 31 March 2027)`, MH_LOAN.total], ['Trade creditors', 126000], ['Unpaid dividend', 8000], ['Calls in advance', 4000], ['Provision for tax', 38000], ['Buildings', 500000], ['Plant and machinery', 480000], ['Accumulated depreciation', 180000], ['Computer software', 60000], ['Raw materials', 110000], ['Finished goods', 90000], ['Loose tools', 20000], ['Trade debtors', 180000], ['Provision for doubtful debts', 9000], ['Cash at bank', 102000], ['Cheques in hand', 12000], ['Prepaid expenses', 15000]];
check(sum(MH_GIVEN.map(([, v]) => v)) === sum(MH_ITEMS.map(([, v]) => v)), 'MH given = classified');
Q('l6_bs2', long({
  t: 2, d: 5, c: 'analysis', marks: 6,
  stem: `Mahanadi Steel Tubes Ltd is an imagined company in Sambalpur. Its authorised capital is 1,50,000 equity shares of ₹10 each, of which 1,00,000 shares were issued and subscribed; ₹8 per share has been called up and calls in arrears are ${rs(6000)}. The following balances were also extracted on 31 March 2026. Prepare the balance sheet of the company as per Schedule III with notes to accounts.\n\n${given(MH_GIVEN)}`,
  model: `**Balance Sheet of Mahanadi Steel Tubes Ltd as at 31 March 2026**\n\n${MH_BS.md}\n\n**Notes to Accounts**\n\n${MH_BS.notesMd}\n\nPoints to note: the debit balance reduces Reserves and Surplus; the term loan is split into ${rs(MH_LOAN.total - MH_LOAN.current)} long-term and ${rs(MH_LOAN.current)} current maturity (Short-term Borrowings under the amended Schedule III); calls in advance and unpaid dividend are other current liabilities; loose tools are inventories.`,
  sol: 'Watch the tricky items: arrears inside the share capital note, the loss inside reserves, the loan split at twelve months, and the deductions inside their notes.',
  scheme: [[`Share capital note: called up less arrears, ${rs(MH.amount)}`, 1], [`Reserves and Surplus ${rs(MH_BS.subTotal.rs)}`, 0.5], ['Loan split into long-term and current maturity', 1], ['Other current liabilities and short-term provisions', 1], ['Non-current assets with depreciation deducted', 1], ['Current assets with notes', 1], [`Both totals ${rs(MH_BS.total)}`, 0.5]],
}));

const SA = shareCapitalNote({ fv: 10, authorised: 300000, issued: 250000, full: 250000 });
const SA_ITEMS = [['Securities premium', 300000], ['General reserve', 200000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 150000], ['Share application money pending allotment', 100000], ['10% Debentures', 500000, 'Debentures'], ['Provision for gratuity payable on retirement', 80000], ['Bank overdraft', 70000], ['Trade creditors', 230000], ['Interest accrued on debentures', 25000], ['Advance received from customers', 45000], ['Provision for tax', 110000], ['Land', 1300000], ['Buildings', 900000], ['Plant and machinery', 700000], ['Accumulated depreciation', 200000], ['Capital work-in-progress', 300000], ['Long-term investments', 400000], ['Long-term loans to employees', 50000], ['Marketable securities held for sale within a year', 120000], ['Raw materials', 210000], ['Stores and spares', 40000], ['Trade debtors', 290000], ['Cash at bank', 130000], ['Cash in hand', 20000], ['Short-term loans to employees', 20000], ['Interest accrued on investments', 30000]];
const SA_BS = scheduleIII({ date: '31 March 2026', shareCapital: SA, items: SA_ITEMS });
check(SA_BS.total === 4310000, 'SA');
Q('l6_bs3', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `The trial balance of Sutlej Agro Ltd, an imagined company in Ludhiana, shows the balances below on 31 March 2026, besides its share capital: 2,50,000 equity shares of ₹10 each, fully paid, out of an authorised capital of 3,00,000 such shares. Shares applied for in March will be allotted in April; the application money is not refundable. Draw up the balance sheet as per Schedule III with notes to accounts.\n\n${given(SA_ITEMS)}`,
  model: `**Balance Sheet of Sutlej Agro Ltd as at 31 March 2026**\n\n${SA_BS.md}\n\n**Notes to Accounts**\n\n${SA_BS.notesMd}\n\nShare application money pending allotment is a head by itself; capital work-in-progress sits in the property, plant and equipment group; loans to employees are split by their term.`,
  sol: 'Some heads here are rarely used: share application money, long-term provisions, capital work-in-progress and both kinds of loans and advances.',
  scheme: [["Shareholders' Funds and share application money", 1], ['Non-current and current liabilities with notes', 1.5], ['Property, plant and equipment, capital work-in-progress and investments', 1.5], ['Loans and advances, current investments and other current assets', 1], ['Inventories, receivables, cash and both totals', 1]],
}));

const CF = statementPL({
  year: '31 March 2026', taxRate: 25,
  items: [['Sale of products', 3200000], ['Sale of scrap', 40000], ['Interest received on investments', 36000], ['Dividend received', 24000], ['Salaries and wages', 520000], ['Contribution to provident fund', 40000], ['Interest on debentures', 80000], ['Interest on bank loan', 20000], ['Depreciation', 160000], ['Power and fuel', 190000], ['Rent', 120000], ['Advertisement', 70000], ['Audit fees', 20000]],
  materials: { opening: 240000, purchases: 1560000, closing: 300000 },
  inventories: { opening: [['finished goods', 360000], ['work-in-progress', 80000]], closing: [['finished goods', 300000], ['work-in-progress', 100000]] },
});
check(CF.tot.com === 1500000 && CF.tot.chg === 40000 && CF.pbt === 540000 && CF.tax === 135000 && CF.pat === 405000, 'CF');
Q('l6_pl1', long({
  t: 2, d: 3, c: 'application', marks: 6,
  stem: `Chambal Foods Ltd, an imagined manufacturer of packaged snacks in Kota, provides the following for the year ended 31 March 2026. Prepare its Statement of Profit and Loss with notes to accounts. Tax is to be provided at 25% of profit before tax.\n\n${given([['Sale of products', 3200000], ['Sale of scrap', 40000], ['Interest received on investments', 36000], ['Dividend received', 24000], ['Inventory of raw materials, 1 April 2025', 240000], ['Purchases of raw materials', 1560000], ['Inventory of raw materials, 31 March 2026', 300000], ['Finished goods, 1 April 2025', 360000], ['Finished goods, 31 March 2026', 300000], ['Work-in-progress, 1 April 2025', 80000], ['Work-in-progress, 31 March 2026', 100000], ['Salaries and wages', 520000], ['Contribution to provident fund', 40000], ['Interest on debentures', 80000], ['Interest on bank loan', 20000], ['Depreciation', 160000], ['Power and fuel', 190000], ['Rent', 120000], ['Advertisement', 70000], ['Audit fees', 20000]], 'Item')}`,
  model: `**Statement of Profit and Loss of Chambal Foods Ltd for the year ended 31 March 2026**\n\n${CF.md}\n\n**Notes to Accounts**\n\n${CF.notesMd}\n\nTax = 25% of ${fig(CF.pbt)} = ${fig(CF.tax)}.`,
  sol: 'Work out materials consumed and the change in inventories in notes first; every other item goes to its expense head.',
  scheme: [['Revenue from operations and other income with notes', 1], [`Cost of materials consumed ${rs(CF.tot.com)}`, 1], [`Change in inventories ${rs(CF.tot.chg)}`, 1], ['Employee benefits, finance costs, depreciation and other expenses', 1.5], [`Profit before tax ${rs(CF.pbt)}`, 0.5], [`Tax ${rs(CF.tax)} and profit for the year ${rs(CF.pat)}`, 1]],
}));

const GH = statementPL({
  year: '31 March 2026', taxRate: 30,
  items: [['Sale of products', 4800000], ['Sale of services', 200000], ['Rent received from letting a spare building', 60000], ['Profit on sale of machinery', 15000], ['Purchases of stock-in-trade', 3400000], ['Salaries and wages', 480000], ['Bonus to employees', 40000], ['Interest on bank overdraft', 35000], ['Depreciation', 110000], ['Rent', 240000], ['Advertisement', 150000], ['Carriage outwards', 60000], ['Bad debts', 15000], ['Insurance', 25000]],
  inventories: { opening: [['stock-in-trade', 600000]], closing: [['stock-in-trade', 720000]] },
});
check(GH.tot.chg === -120000 && GH.totalExp === 4435000 && GH.pbt === 640000 && GH.tax === 192000 && GH.pat === 448000, 'GH');
Q('l6_pl2', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `Ganga Home Appliances Ltd, an imagined company in Kanpur, buys kitchen appliances from manufacturers, sells them to households and also earns from repair services. Using the information below for the year ended 31 March 2026, prepare its Statement of Profit and Loss with notes to accounts, providing tax at 30%.\n\n${given([['Sale of appliances', 4800000], ['Repair services', 200000], ['Rent received from letting a spare building', 60000], ['Profit on sale of machinery', 15000], ['Purchases of appliances for resale', 3400000], ['Stock of appliances, 1 April 2025', 600000], ['Stock of appliances, 31 March 2026', 720000], ['Salaries and wages', 480000], ['Bonus to employees', 40000], ['Interest on bank overdraft', 35000], ['Depreciation', 110000], ['Rent of showrooms', 240000], ['Advertisement', 150000], ['Carriage outwards', 60000], ['Bad debts', 15000], ['Insurance', 25000]], 'Item')}`,
  model: `**Statement of Profit and Loss of Ganga Home Appliances Ltd for the year ended 31 March 2026**\n\n${GH.md}\n\n**Notes to Accounts**\n\n${GH.notesMd}\n\nThe stock of appliances rose by ${fig(-GH.tot.chg)}, so the change in inventories of stock-in-trade is negative. Tax = 30% of ${fig(GH.pbt)} = ${fig(GH.tax)}.`,
  sol: 'A trader has purchases of stock-in-trade instead of materials consumed; the rent the company pays is an expense, the rent it receives is other income.',
  scheme: [['Revenue from operations and other income with notes', 1], ['Purchases of stock-in-trade', 0.5], [`Change in inventories ${rs(GH.tot.chg)} (negative)`, 1], ['Employee benefits and other expenses notes', 1.5], ['Finance costs and depreciation', 0.5], [`Profit before tax ${rs(GH.pbt)}, tax ${rs(GH.tax)}, profit ${rs(GH.pat)}`, 1.5]],
}));

const PP = statementPL({
  year: '31 March 2026', taxRate: 30,
  items: [['Sale of products', 2600000], ['Interest received on investments', 40000], ['Salaries and wages', 440000], ['Interest on debentures', 60000], ['Depreciation', 140000], ['Power and fuel', 220000], ['Repairs and maintenance', 80000]],
  materials: { opening: 150000, purchases: 1310000, closing: 160000 },
  noteStart: 3,
});
const PP_RS = { premium: 100000, grOpen: 200000, transfer: 50000, surplusOpen: 90000 };
const PP_SURPLUS = PP_RS.surplusOpen + PP.pat - PP_RS.transfer;
const PP_GR = PP_RS.grOpen + PP_RS.transfer;
const PP_SC = shareCapitalNote({ fv: 10, authorised: 150000, issued: 100000, full: 100000 });
const PP_RS_ROWS = [
  ['2', bold('Reserves and Surplus'), ''],
  ['', 'Securities premium', fig(PP_RS.premium)],
  ['', `General reserve: opening balance ${fig(PP_RS.grOpen)} + transfer from surplus ${fig(PP_RS.transfer)}`, fig(PP_GR)],
  ['', `Surplus, i.e. balance in the Statement of Profit and Loss: opening ${fig(PP_RS.surplusOpen)} + profit for the year ${fig(PP.pat)} − transfer to general reserve ${fig(PP_RS.transfer)}`, fig(PP_SURPLUS)],
  ['', bold('Total'), bold(fig(PP_RS.premium + PP_GR + PP_SURPLUS))],
];
const PP_BS = scheduleIII({ date: '31 March 2026', shareCapital: PP_SC, only: 'el', items: [['Securities premium', PP_RS.premium], ['General reserve', PP_GR], ['Surplus, i.e. balance in the Statement of Profit and Loss', PP_SURPLUS]] });
check(PP.tot.com === 1300000 && PP.pbt === 400000 && PP.pat === 280000 && PP_SURPLUS === 320000 && PP_BS.subTotal.rs === 670000 && PP_BS.total === 1670000, 'PP');
// Balance sheet notes: the share capital note from the builder, then the reserves note with its movements.
const PP_N2 = PP_BS.notesRows.findIndex((r) => r[0] === '2');
check(PP_BS.noteNo.sc === 1 && PP_BS.noteNo.rs === 2 && PP_N2 > 0 && PP_RS.premium + PP_GR + PP_SURPLUS === PP_BS.subTotal.rs, 'PP notes');
const PP_BS_NOTES = md(['Note No.', 'Particulars', '₹'], [...PP_BS.notesRows.slice(0, PP_N2), ...PP_RS_ROWS], [2]);
Q('l6_pl_to_bs', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Pench Paper Ltd, an imagined company in Nagpur, has a share capital of 1,00,000 equity shares of ₹10 each, fully paid (authorised 1,50,000 shares). For the year ended 31 March 2026: sale of products ${rs(2600000)}; interest received on investments ${rs(40000)}; raw materials ${rs(150000)} at the start and ${rs(160000)} at the end of the year, with purchases of ${rs(1310000)}; salaries and wages ${rs(440000)}; interest on debentures ${rs(60000)}; depreciation ${rs(140000)}; power and fuel ${rs(220000)}; repairs and maintenance ${rs(80000)}. Tax is 30% of profit before tax. On 1 April 2025 it had a Securities Premium of ${rs(PP_RS.premium)}, a General Reserve of ${rs(PP_RS.grOpen)} and a surplus of ${rs(PP_RS.surplusOpen)}; the directors transfer ${rs(PP_RS.transfer)} to the General Reserve out of this year's profit.\n\n(a) Prepare the Statement of Profit and Loss.\n(b) Prepare the note on Reserves and Surplus and show the Shareholders' Funds as at 31 March 2026.`,
  model: `**(a) Statement of Profit and Loss of Pench Paper Ltd for the year ended 31 March 2026**\n\n${PP.md}\n\n${PP.notesMd}\n\n**(b) Balance Sheet of Pench Paper Ltd as at 31 March 2026 (extract)**\n\n${PP_BS.md}\n\n**Notes to Accounts (balance sheet; notes 3 and 4 above belong to the Statement of Profit and Loss)**\n\n${PP_BS_NOTES}\n\nThe profit for the year, ${rs(PP.pat)}, is the link: it flows from the Statement of Profit and Loss into the surplus in Reserves and Surplus.`,
  sol: 'Finish the Statement of Profit and Loss first; its last line is the figure added to the surplus.',
  scheme: [[`Cost of materials consumed ${rs(PP.tot.com)} and the expense heads`, 1.5], [`Profit before tax ${rs(PP.pbt)}`, 0.5], [`Tax and profit for the year ${rs(PP.pat)}`, 1], [`Surplus carried forward ${rs(PP_SURPLUS)}`, 1], [`General reserve ${rs(PP_GR)} and Reserves and Surplus ${rs(PP_BS.subTotal.rs)}`, 1], [`Shareholders' funds ${rs(PP_BS.total)}`, 1]],
}));

FACTS.push(
  `Indravati share capital ${fig(IC.amount)}`,
  `Wardha equity and liabilities ${fig(WC_BS.total)}`,
  `Bhima assets ${fig(BP_BS.total)}`,
  `Netravati shareholders' funds ${fig(NC_BS.total)}`,
  `Vaigai ${fig(VP_BS.total)}`,
  `Mahanadi ${fig(MH_BS.total)}`,
  `Sutlej ${fig(SA_BS.total)}`,
  `Chambal profit for the year ${fig(CF.pat)}`,
  `Ganga ${fig(GH.pat)}`,
  `Pench shareholders' funds ${fig(PP_BS.total)}`,
);
export { FACTS };
