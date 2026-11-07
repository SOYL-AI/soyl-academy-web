// t01: GAAP, basic accounting concepts and conventions. Every firm and person is imagined; every derived amount is computed.
import { mcq, ar, tf, fb, match, ord, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, equation, HC, MT, LC, lcnrv, EQ, EQF } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_gaap', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A newly appointed accountant at an imagined trading firm asks why every firm should follow generally accepted accounting principles (GAAP). The best answer is that GAAP',
  opts: ['make the accounts of different firms uniform, so that they can be compared and relied on', 'fix the profit that each firm must earn in a year', 'tell a firm which goods it is allowed to sell', 'remove the need to keep books of account'],
  sol: 'GAAP are the accepted rules, concepts and conventions of accounting; their purpose is uniformity and comparability. They do not fix profits, control what a firm sells, or replace the books of account.',
}));
QQ('m_entity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meera Sharma owns Meera Handlooms, an imagined shop in Ranipur. On 4 June 2026 she paid her daughter\'s tuition fee of ₹9,000 from the shop\'s cash box. By the business entity concept, this payment is',
  opts: ['treated as drawings, not as an expense of the shop', 'recorded as tuition expense of the shop', 'recorded as an asset of the shop', 'left out because it is small'],
  sol: 'The business is a separate unit from its owner, so a personal payment is the owner\'s drawings; it reduces capital and cash. It is not a business expense or asset, and size is irrelevant to the entity concept.',
}));
QQ('m_money', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following can be recorded in the books of Orchid Bakers, an imagined bakery, under the money measurement concept?',
  opts: ['Purchase of an oven for ₹85,000', 'The excellent skill of the head baker', 'The loyalty of regular customers', 'The friendly relations between the owner and the staff'],
  sol: 'Only events that can be expressed in money are recorded. The purchase has a price; skill, loyalty and goodwill of relations have no money value in the books until they are measured by a transaction.',
}));
QQ('m_going', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A hardware firm owns a machine that cost ₹5,00,000 and will serve for ten more years. The firm shows it at cost less depreciation, and not at the price it would fetch in a forced sale next week. This follows the',
  opts: ['going concern concept', 'conservatism concept', 'materiality concept', 'revenue recognition concept'],
  sol: 'A firm is assumed to continue for the foreseeable future, so its assets are used up over their life and written off through depreciation; a forced-sale price is relevant only if closure is expected. Conservatism concerns caution about profit, materiality concerns importance of items, and revenue recognition concerns the timing of income.',
}));
QQ('m_period', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Why does an imagined firm prepare its accounts for a fixed period, usually twelve months, instead of waiting until the business is closed?',
  opts: ['To measure profit and financial position at regular intervals, since the business is expected to continue', 'Because the law fixes the profit for each year', 'Because assets lose value only once a year', 'Because transactions cannot be recorded in a shorter time'],
  sol: 'A continuing business needs periodic results for owners, lenders and tax. The law does not fix profits, assets can lose value at any time, and transactions are recorded as they occur.',
}));
QQ('m_cost', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Kaveri Printers, an imagined firm, bought land for ${rs(HC.cost)} in 2021. Similar land in the area now sells for ${rs(HC.market)}. Under the cost concept, the balance sheet shows the land at`,
  opts: [rs(HC.cost), rs(HC.market), rs(HC.gap), rs(HC.cost + HC.market)],
  sol: `The asset stays at the price actually paid, ${rs(HC.cost)}. ${rs(HC.market)} is the current market value, which is not recorded; ${rs(HC.gap)} is only the unrecorded rise; and ${rs(HC.cost + HC.market)} adds the two values without meaning.`,
}));
QQ('m_dual', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sunil Fabrics, an imagined firm, buys a sewing machine on credit from a supplier. By the dual aspect concept, the effect on the accounting equation is',
  opts: ['an increase in an asset and an equal increase in a liability', 'an increase in an asset and a decrease in capital', 'a decrease in a liability and an increase in capital', 'an increase in one asset with no other change'],
  sol: 'The machine (asset) increases and the amount owed to the supplier (liability) increases by the same value, so Assets = Liabilities + Capital still holds. Capital does not change on a credit purchase, and no transaction affects only one item.',
}));
const SOFA = 30000;
QQ('m_revrec', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Anil Furnishers, an imagined firm, delivered a sofa set priced at ${rs(SOFA)} to a customer on 28 December 2026 on credit. The customer paid on 10 January 2027. By the revenue recognition concept, the revenue is recognised in`,
  opts: ['December 2026, when the goods were delivered and the sale was made', 'January 2027, when the cash was received', 'the month in which the customer first enquired about the sofa set', 'both months, half in each'],
  sol: 'Revenue is recognised when it is earned, that is when the goods pass to the buyer and the right to receive the price arises, not when cash comes in. An enquiry earns nothing, and revenue is not split over two months.',
}));
QQ('m_matching', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Pooja Dairy, an imagined business, pays the December salaries of its staff on 5 January. The salaries are charged against the revenue of December and shown as a liability on 31 December. This applies the',
  opts: ['matching concept', 'cost concept', 'money measurement concept', 'business entity concept'],
  sol: 'Expenses are set against the revenue they helped to earn in the same period, whatever the date of payment. The cost, money measurement and entity concepts do not decide in which period an expense falls.',
}));
QQ('m_disclosure', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Lotus Chemicals, an imagined company, faces a court claim of ₹4,00,000 that may turn into a liability next year. The accountant mentions it in a note to the balance sheet. This follows the',
  opts: ['full disclosure concept', 'materiality concept', 'objectivity concept', 'cost concept'],
  sol: 'Full disclosure requires that all information that could influence the decisions of users be shown. A note on a possible liability serves that purpose. Materiality is about leaving out trivial items, objectivity about verifiable evidence, and cost about the recording price of assets.',
}));
QQ('m_consist', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Rohan Traders, an imagined firm, charged depreciation by the straight line method in 2025-26. It plans to switch to the written down value method in 2026-27 only to show a lower profit for that year. The plan goes against the',
  opts: ['consistency concept', 'going concern concept', 'business entity concept', 'money measurement concept'],
  sol: 'Consistency requires the same accounting methods from period to period so that results can be compared; a change is acceptable only for a good reason and with disclosure. Switching merely to alter profit breaks it. The other concepts are not concerned with method.',
}));
QQ('m_conserv', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At the year end, Neha Bookstore, an imagined shop, finds that books costing ₹60,000 can now be sold only for ₹52,000. Following the conservatism concept, these books appear in closing stock at',
  opts: [rs(52000), rs(60000), rs(60000 - 52000), rs(60000 + 52000)],
  sol: `Stock is valued at the lower of cost, ${rs(60000)}, and net realisable value, ${rs(52000)}, so that an expected loss is provided for. ${rs(60000)} ignores the fall, ${rs(60000 - 52000)} is only the fall, and ${rs(60000 + 52000)} adds two values.`,
}));
QQ('m_material', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which treatment shows the materiality concept at work in Girnar Steel Works, an imagined large factory?',
  opts: ['A stapler costing ₹120 is charged to expense in the year of purchase although it lasts several years', 'A new furnace costing ₹90,00,000 is charged to expense in the year of purchase', 'A court claim of ₹50,00,000 against the factory is left out of the accounts', 'Sales of ₹2,00,00,000 are shown as ₹1,50,00,000'],
  sol: 'Materiality allows an insignificant item to be treated in the simplest way, since showing it as an asset would not change any decision. The furnace, the claim and the sales figure are all large enough to matter, and the other treatments distort the accounts.',
}));
QQ('m_objective', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The accountant of Ujwal Opticals, an imagined firm, records a purchase of ₹36,000 only after receiving the supplier\'s invoice. This practice reflects the',
  opts: ['objectivity concept', 'going concern concept', 'matching concept', 'conservatism concept'],
  sol: 'Objectivity means that entries are supported by verifiable evidence such as an invoice, so that anyone checking would reach the same figure. Going concern, matching and conservatism deal with continuity, periods and caution.',
}));
QQ('m_stock_lc', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sagar Electricals, an imagined shop, holds one lot of mixers that cost ₹30,000. A new model has lowered their expected selling price, so that their net realisable value is ₹24,000. At what amount should the lot appear in closing stock?',
  opts: [rs(24000), rs(30000), rs(30000 - 24000), rs(30000 + 24000)],
  sol: `The lower of ${rs(30000)} and ${rs(24000)} is ${rs(24000)}. ${rs(30000)} would carry the expected loss into the next year; ${rs(30000 - 24000)} is the write-down, not the value; and ${rs(30000 + 24000)} adds the two figures.`,
}));
const TANVI = { paid: 36000, months: 12, used: 6 };
const TANVIx = same((TANVI.paid * TANVI.used) / TANVI.months, 18000, 'Tanvi insurance of the year');
QQ('m_which', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Tanvi Textiles, an imagined firm, paid ${rs(TANVI.paid)} on 1 October 2026 as insurance premium for the twelve months beginning that day, and charged the whole amount as an expense of the year ended 31 March 2027. Which statement about this treatment is correct?`,
  opts: [`The expense of the year is overstated by ${rs(TANVI.paid - TANVIx)}, because only six months of cover were used in the year`, 'The treatment is correct because the cash was paid in that year', `The expense of the year is understated by ${rs(TANVIx)}`, 'The treatment is correct under the cost concept'],
  sol: `Six of the twelve months fall in the year, so the charge is ${rs(TANVIx)}; the remaining ${rs(TANVI.paid - TANVIx)} belongs to the next year and is carried forward as a prepaid expense (matching concept). The year's expense is therefore overstated, not understated, and the date of payment does not decide the period. The cost concept does not apply to expenses of a period.`,
}));

// ================================================================ assertion-reason
QQ('ar_dual', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The accounting equation remains balanced after every transaction.',
  r: 'Every transaction has a two-sided effect of equal value on the accounts.',
  sol: 'Both statements are true. Because each transaction changes two items by equal amounts, the two sides of Assets = Liabilities + Capital stay equal, so R explains A.',
}));
QQ('ar_conserv', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Sagar Electricals values its closing stock at the lower of cost and net realisable value.',
  r: 'Fixed assets are recorded at the price paid to acquire them.',
  sol: 'Both are true: stock valuation follows conservatism and fixed assets follow the cost concept. But the cost of acquiring fixed assets says nothing about why stock is written down to a lower realisable value, so R does not explain A.',
}));
QQ('ar_going', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Under the going concern concept, accounts may be prepared only at the end of the life of the business.',
  r: 'Under the going concern concept, a business is assumed to continue for the foreseeable future.',
  sol: 'A is false: the concept supports periodic accounts for a business expected to continue; accounts are not limited to the end of its life. R is true and states the concept correctly.',
}));
QQ('ar_material', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Under the materiality concept, a trivial item may be treated in the simplest way.',
  r: 'Under the materiality concept, every item, however small, must be shown separately in the financial statements.',
  sol: 'A is true. R is false: the concept asks that only items significant enough to influence the decisions of users be shown separately, so insignificant items may be combined or expensed at once.',
}));

// ================================================================ true / false, fill in the blank
QQ('tf_going', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'An imagined firm has decided to close down at the end of the month. In the accounts for that month it should still value its machinery on the going concern basis.',
  sol: 'The going concern basis assumes the firm will continue. When closure is decided, assets should be valued at the amounts they are expected to realise.',
}));
QQ('fb_conserv', fb({
  t: 1, d: 1, c: 'understanding',
  stem: 'At the year end, closing stock is valued at the lower of ___ and ___, following the concept of ___.',
  acc: [['cost'], ['net realisable value', 'realisable value', 'market value'], ['conservatism', 'prudence']],
  sol: 'Closing stock is valued at the lower of cost and net realisable value, which follows the concept of conservatism (prudence): a possible loss is provided for, a possible gain is not recorded.',
}));

// ================================================================ match, ordering
QQ('mt_concepts', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each concept in column A with its meaning in column B.',
  pairs: [
    ['Business entity', 'The business is treated as separate from its owner'],
    ['Money measurement', 'Only events that can be expressed in money are recorded'],
    ['Going concern', 'The firm is assumed to continue for the foreseeable future'],
    ['Accounting period', 'Profit is worked out for a fixed span, usually a year'],
  ],
  sol: 'Each concept is matched with its standard meaning.',
}));
QQ('mt_conventions', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each convention in column A with the situation in column B that illustrates it.',
  pairs: [
    ['Full disclosure', 'A note to the balance sheet reports a pending court claim'],
    ['Consistency', 'The same method of depreciation is followed from year to year'],
    ['Conservatism', 'A possible loss on stock is provided for but a possible gain is not recorded'],
    ['Materiality', 'A sharpener costing a few rupees is charged to expense at once'],
  ],
  sol: 'Each convention is matched with a situation that shows it at work.',
}));
QQ('ord_matching', ord({
  t: 1, d: 3, c: 'application',
  stem: 'Arrange in the correct order the steps in finding the profit of an imagined firm for a month on the matching principle.',
  items: ['Find the revenue earned in the month', 'Find the expenses incurred in the month, adjusting payments for outstanding and prepaid amounts', 'Set the expenses of the month against the revenue of the same month', 'Subtract to get the profit or loss of the month'],
  sol: 'Revenue and expenses of the month are first found on the earned and incurred basis; they are then matched, and the difference is the profit.',
}));

// ================================================================ numericals (all computed)
const DS = { sales: 80000, open: 10000, purch: 50000, close: 12000, salPaid: 7000, salDue: 2000, rentPaid: 15000, rentMonths: 3 };
DS.cogs = DS.open + DS.purch - DS.close;
DS.sal = DS.salPaid + DS.salDue;
DS.rent = same(DS.rentPaid / DS.rentMonths, 5000, 'Dhruv rent of March');
DS.profit = same(DS.sales - DS.cogs - DS.sal - DS.rent, 18000, 'Dhruv profit');
QQ('n_matching_np', numQ({
  t: 1, d: 3, c: 'application', value: DS.profit, unit: '₹',
  stem: `Dhruv Cycle Store, an imagined shop, had sales of ${rs(DS.sales)} in March 2027. Its opening stock was ${rs(DS.open)}, purchases ${rs(DS.purch)} and closing stock ${rs(DS.close)}. Salaries paid in March were ${rs(DS.salPaid)}, and ${rs(DS.salDue)} of March salary was still to be paid. Rent of ${rs(DS.rentPaid)} was paid on 1 March for March, April and May. Applying the matching principle, find the profit of March 2027 (in ₹).`,
  sol: `Cost of goods sold = ${inr(DS.open)} + ${inr(DS.purch)} − ${inr(DS.close)} = ${rs(DS.cogs)}. Salary of March = ${inr(DS.salPaid)} + ${inr(DS.salDue)} = ${rs(DS.sal)}. Rent of March = ${inr(DS.rentPaid)} ÷ ${DS.rentMonths} = ${rs(DS.rent)}. Profit = ${inr(DS.sales)} − ${inr(DS.cogs)} − ${inr(DS.sal)} − ${inr(DS.rent)} = ${rs(DS.profit)}.`,
}));
const LCN = lcnrv([['Lot A', 15000, 18000], ['Lot B', 22000, 16000], ['Lot C', 9000, 9000]]);
same(LCN.total, 40000, 'n_lcnrv');
QQ('n_lcnrv', numQ({
  t: 1, d: 2, c: 'application', value: LCN.total, unit: '₹',
  stem: 'Closing stock of an imagined store, Kusum Crockery, has three lots. Lot A: cost ₹15,000, net realisable value ₹18,000. Lot B: cost ₹22,000, net realisable value ₹16,000. Lot C: cost ₹9,000, net realisable value ₹9,000. Valuing lot by lot at the lower of cost and net realisable value, find the value of closing stock (in ₹).',
  sol: `Lot A = ${rs(15000)} (cost is lower); Lot B = ${rs(16000)} (net realisable value is lower); Lot C = ${rs(9000)}. Total = ${inr(15000)} + ${inr(16000)} + ${inr(9000)} = ${rs(LCN.total)}.`,
}));
const DC = { assets: 420000, loans: 90000, creditors: 45000 };
DC.capital = same(DC.assets - DC.loans - DC.creditors, 285000, 'n_dual_cap');
QQ('n_dual_cap', numQ({
  t: 1, d: 2, c: 'application', value: DC.capital, unit: '₹',
  stem: `On 31 March 2027 the assets of Ishani Gift House, an imagined firm, were worth ${rs(DC.assets)}. It owed a bank loan of ${rs(DC.loans)} and ${rs(DC.creditors)} to creditors. Using the accounting equation, find the capital of the proprietor (in ₹).`,
  sol: `Capital = Assets − Liabilities = ${inr(DC.assets)} − (${inr(DC.loans)} + ${inr(DC.creditors)}) = ${rs(DC.capital)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_gaap', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define GAAP and state its main purpose.',
  model: '**GAAP**, short for generally accepted accounting principles, means the body of rules, concepts and conventions accepted by accountants for recording transactions and drawing up statements. Its main purpose is uniformity: statements of different firms, and of one firm in different years, become comparable and dependable.',
  sol: 'One mark for the meaning, one for the purpose.',
  scheme: [['Meaning: accepted rules, concepts and conventions', 1], ['Purpose: uniformity and comparability', 1]],
}));
QQ('s2_entity', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rekha Sharma runs an imagined tea stall as a sole proprietor. She takes ₹2,500 from the stall\'s cash box for a family function. Explain how the stall\'s books should treat this amount under the business entity concept.',
  model: 'Under the business entity concept the stall is a unit separate from Rekha. The ₹2,500 is her personal use of business money, so it is recorded as **drawings**. It reduces the cash of the stall and her capital; it is not an expense of the stall.',
  sol: 'Separate entity, and the amount treated as drawings.',
  scheme: [['Business separate from owner', 1], ['Treated as drawings reducing cash and capital, not as an expense', 1]],
}));
QQ('s2_dual', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State the dual aspect concept. Show its effect on the accounting equation when an imagined firm buys goods worth ₹30,000 on credit.',
  model: 'According to the **dual aspect** concept, every transaction has two sides of equal value, so Assets = Liabilities + Capital always holds. On buying goods on credit for ₹30,000, an asset (stock) increases by ₹30,000 and a liability (creditors) increases by ₹30,000.',
  sol: 'Statement of the concept, then the two equal effects.',
  scheme: [['Two-sided effect of equal value; Assets = Liabilities + Capital', 1], ['Stock up and creditors up by the same amount', 1]],
}));
QQ('s2_going', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the going concern concept and state one effect of it on how an imagined firm records its machinery.',
  model: 'The **going concern** concept assumes that the firm will continue for the foreseeable future, without intention to close down or shrink greatly. Because of this, machinery is recorded at cost and written off gradually through depreciation over its life, not valued at a forced-sale price.',
  sol: 'The assumption and one effect.',
  scheme: [['Assumption of continuity', 1], ['Machinery at cost less depreciation, not at forced-sale value', 1]],
}));
const KF = { adv: 20000, rest: 15000 };
KF.price = KF.adv + KF.rest;
QQ('s2_revrec', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Ketaki Furnishers, an imagined firm, received an advance of ${rs(KF.adv)} on 20 November 2026 for a table to be delivered on 5 December 2026, and the balance of ${rs(KF.rest)} on delivery. State in which month the revenue is recognised, and what the advance is until then.`,
  model: `Revenue of ${rs(KF.price)} is recognised in **December 2026**, when the table is delivered and the sale is complete. Until delivery, the advance of ${rs(KF.adv)} is not revenue; it is shown as a liability (advance from customer).`,
  sol: 'Revenue on delivery; advance is a liability until then.',
  scheme: [['December 2026, on delivery', 1], ['Advance is a liability until delivery', 1]],
}));
QQ('s2_conserv', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Harsha Appliances, an imagined shop, has two lots in its closing stock. Toasters: cost ₹18,000, net realisable value ₹21,000. Kettles: cost ₹25,000, net realisable value ₹19,000. Value each lot following conservatism and state the total.',
  model: (() => {
    const r = lcnrv([['Toasters', 18000, 21000], ['Kettles', 25000, 19000]]);
    same(r.total, 37000, 's2_conserv total');
    return `${mdTable(['Lot', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], [...r.rows, ['**Total**', `**${inr(r.costT)}**`, `**${inr(r.nrvT)}**`, `**${inr(r.total)}**`]])}\n\nToasters stay at cost (the gain of ${rs(21000 - 18000)} is not recorded); kettles are written down to net realisable value, a loss of ${rs(25000 - 19000)} provided for. Closing stock = **${rs(r.total)}**.`;
  })(),
  sol: 'Lower of cost and net realisable value for each lot.',
  scheme: [['Toasters valued at cost', 1], ['Kettles at net realisable value and total', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_consist_material', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the concepts of consistency and materiality, giving one imagined example of each.',
  model: '**Consistency:** the same accounting methods are followed from year to year so that results can be compared; a change needs a good reason and disclosure. Example: a shop keeps using the straight line method of depreciation every year.\n\n**Materiality:** only items large enough to influence decisions need separate disclosure; trivial items may be treated simply. Example: a pencil sharpener costing ₹40 is charged to expense at once, though it lasts years.',
  sol: 'Meaning and example for each concept.',
  scheme: [['Consistency: meaning', 1], ['Materiality: meaning', 1], ['One example of each', 1]],
}));
QQ('s3_cost_judge', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: `Ketan, a partner in Kaveri Printers, an imagined firm, suggests showing its land, bought for ${rs(HC.cost)}, in the balance sheet at today's market value of ${rs(HC.market)}. Evaluate the suggestion under the cost concept and give two reasons for recording the land at cost.`,
  model: [
    `The suggestion is **not accepted**. Under the cost concept the land stays at the price paid, ${rs(HC.cost)}; the rise of ${rs(HC.market)} − ${rs(HC.cost)} = ${rs(HC.gap)} (${HC.pct}% of cost) is not recorded because it is not a realised gain.`,
    'Reasons for cost:',
    '1. **Objective and verifiable:** the purchase price is supported by a deed and payment record, while a market value is an opinion that changes.',
    '2. **Comparable and free from bias:** different firms report assets on the same basis, and the owner cannot raise profit or capital by choosing a favourable value.',
  ].join('\n'),
  sol: 'The rise is not recorded; cost is objective and comparable.',
  scheme: [['Suggestion rejected, land stays at cost, with the rise worked out', 1], ['First reason', 1], ['Second reason', 1]],
}));
const PR = { paid: 60000, months: 12, used: 3 };
PR.charged = same((PR.paid * PR.used) / PR.months, 15000, 'Prakash rent charged');
PR.cf = same(PR.paid - PR.charged, 45000, 'Prakash rent carried forward');
QQ('s3_matching_rent', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Prakash Opticals, an imagined firm, paid rent of ${rs(PR.paid)} on 1 January 2027 for the twelve months from that date. Its books are closed on 31 March 2027. Find the rent charged to the year, the amount carried forward, and name the concept that decides the charge.`,
  model: `Rent for the year = ${inr(PR.paid)} × ${PR.used}/${PR.months} = **${rs(PR.charged)}** (January to March).\n\nCarried forward = ${inr(PR.paid)} − ${inr(PR.charged)} = **${rs(PR.cf)}**, shown as prepaid rent (an asset) at 31 March 2027.\n\nThe concept is **matching**: only the expense that belongs to the period is set against its revenue.`,
  sol: 'Charge for three months, balance prepaid, matching concept.',
  scheme: [[`Rent of the year ${rs(PR.charged)}`, 1], [`Prepaid ${rs(PR.cf)}`, 1], ['Matching concept named', 1]],
}));
const BM = lcnrv([['Lot P', 45000, 52000], ['Lot Q', 38000, 30000], ['Lot R', 27000, 27000]]);
same(BM.total, 102000, 's3_stock total');
same(BM.writeDown, 8000, 's3_stock write down');
QQ('s3_stock_lc', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'The closing stock of Brij Mobiles Mart, an imagined shop, has three lots. Lot P: cost ₹45,000, net realisable value ₹52,000. Lot Q: cost ₹38,000, net realisable value ₹30,000. Lot R: cost ₹27,000, net realisable value ₹27,000. Prepare a statement valuing the stock lot by lot and state the write-down compared with cost.',
  model: `${mdTable(['Lot', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], [...BM.rows, ['**Total**', `**${inr(BM.costT)}**`, `**${inr(BM.nrvT)}**`, `**${inr(BM.total)}**`]])}\n\nClosing stock = **${rs(BM.total)}**. Write-down compared with cost = ${inr(BM.costT)} − ${inr(BM.total)} = **${rs(BM.writeDown)}**, from Lot Q only; the unrealised gain on Lot P is not recorded (conservatism).`,
  sol: 'Lower of cost and net realisable value lot by lot.',
  scheme: [['Each lot valued correctly', 1], ['Total closing stock', 1], ['Write-down and the reason', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_concepts', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the concepts of business entity, money measurement, going concern, accounting period and cost, with an imagined illustration of each.',
  model: [
    '1. **Business entity:** the business is separate from its owner. A shopkeeper\'s household bill paid from the till is drawings, not an expense.',
    '2. **Money measurement:** only events expressible in money are recorded. A new van bought for ₹4,00,000 is recorded; the skill of the manager is not.',
    '3. **Going concern:** the firm is assumed to continue, so a machine is written off over its life, not valued at a forced-sale price.',
    '4. **Accounting period:** profit and position are found at regular intervals, usually a year, for example 1 April to 31 March.',
    '5. **Cost:** assets are recorded at the price paid; land bought for ₹10,00,000 stays at that figure although its market value rises.',
  ].join('\n'),
  sol: 'One mark for each concept explained with its illustration.',
  scheme: [['Business entity with illustration', 1], ['Money measurement with illustration', 1], ['Going concern with illustration', 1], ['Accounting period with illustration', 1], ['Cost with illustration', 1]],
}));
QQ('l5_conventions', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the conventions of full disclosure, consistency, conservatism and materiality, and state the effect of each on the accounts of an imagined firm.',
  model: [
    '1. **Full disclosure:** all information that can influence users must be shown. Effect: a pending claim or a change of method is noted in the statements.',
    '2. **Consistency:** the same methods are used year after year. Effect: results of different years are comparable, and a change needs a reason and disclosure.',
    '3. **Conservatism:** anticipate no profit but provide for all possible losses. Effect: closing stock is valued at the lower of cost and net realisable value.',
    '4. **Materiality:** only significant items need separate treatment. Effect: a trivial purchase is charged to expense at once, while a major asset is capitalised.',
    'Together they make the statements reliable and useful without overloading them.',
  ].join('\n'),
  sol: 'Meaning and effect of each convention.',
  scheme: [['Full disclosure with effect', 1], ['Consistency with effect', 1], ['Conservatism with effect', 1], ['Materiality with effect', 1], ['Clear and correct expression', 1]],
}));
const RG = equation({
  start: { assets: { Cash: 200000, Fixtures: 0, Stock: 0 }, liabilities: { Creditors: 0 }, capital: 200000 },
  steps: [
    { what: `Bought fixtures for cash ${rs(60000)}`, assets: { Cash: -60000, Fixtures: 60000 } },
    { what: `Bought goods on credit ${rs(45000)}`, assets: { Stock: 45000 }, liabilities: { Creditors: 45000 } },
    { what: `Sold goods costing ${rs(20000)} for cash ${rs(26000)}`, assets: { Cash: 26000, Stock: -20000 }, capital: 6000 },
    { what: `Paid creditors ${rs(25000)}`, assets: { Cash: -25000 }, liabilities: { Creditors: -25000 } },
  ],
});
const RGa = sum(Object.values(RG.final.assets));
same(RGa, 226000, 'l5_equation assets');
same(RG.final.capital, 206000, 'l5_equation capital');
same(RG.final.liabilities.Creditors, 20000, 'l5_equation creditors');
QQ('l5_equation', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Ridhi Gift Corner, an imagined shop, starts business with cash of ₹2,00,000 as the proprietor\'s capital. It then (i) buys fixtures for ₹60,000 cash, (ii) buys goods for ₹45,000 on credit, (iii) sells goods that cost ₹20,000 for ₹26,000 cash, and (iv) pays ₹25,000 to creditors. Show the effect of each transaction on the accounting equation and verify that it holds at the end.',
  model: `${RG.md}\n\nTotal assets = ${inr(RG.final.assets.Cash)} + ${inr(RG.final.assets.Fixtures)} + ${inr(RG.final.assets.Stock)} = ${rs(RGa)}. Liabilities (creditors) + Capital = ${inr(RG.final.liabilities.Creditors)} + ${inr(RG.final.capital)} = ${rs(RG.final.liabilities.Creditors + RG.final.capital)}. The equation Assets = Liabilities + Capital holds. In (iii) capital rises by the profit of ${rs(6000)}.`,
  sol: 'Each transaction changes two items by equal amounts; the profit on the sale goes to capital.',
  scheme: [['Transactions (i) and (ii) shown', 1], ['Transaction (iii) with profit added to capital', 1], ['Transaction (iv)', 1], ['Closing totals of assets, liabilities and capital', 1], ['Equation verified', 1]],
}));
const BB = { sales: 95000, open: 8000, purch: 41000, close: 9000, wagesPaid: 14000, wagesDue: 2000, rentPaid: 18000, rentMonths: 3, elec: 2000 };
BB.cogs = BB.open + BB.purch - BB.close;
BB.wages = BB.wagesPaid + BB.wagesDue;
BB.rent = same(BB.rentPaid / BB.rentMonths, 6000, 'Bhoomi rent');
BB.prepaid = same(BB.rentPaid - BB.rent, 12000, 'Bhoomi prepaid rent');
BB.exp = same(BB.cogs + BB.wages + BB.rent + BB.elec, 64000, 'Bhoomi expenses');
BB.profit = same(BB.sales - BB.exp, 31000, 'Bhoomi profit');
QQ('l5_matching', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: `Bhoomi Bakers, an imagined bakery, had sales of ${rs(BB.sales)} in March 2027, part of it on credit. Opening stock was ${rs(BB.open)}, purchases ${rs(BB.purch)} and closing stock ${rs(BB.close)}. Wages paid were ${rs(BB.wagesPaid)}, with ${rs(BB.wagesDue)} of March wages unpaid. On 1 March it paid rent of ${rs(BB.rentPaid)} for March, April and May. Electricity of ${rs(BB.elec)} was paid for March. Applying the matching principle, find the profit of March 2027 and the rent carried forward.`,
  model: `${mdTable(['Particulars', '₹'], [
    ['Revenue: sales of the month', inr(BB.sales)],
    [`Less: cost of goods sold (${inr(BB.open)} + ${inr(BB.purch)} − ${inr(BB.close)})`, inr(BB.cogs)],
    [`Less: wages (${inr(BB.wagesPaid)} paid + ${inr(BB.wagesDue)} due)`, inr(BB.wages)],
    [`Less: rent of March (${inr(BB.rentPaid)} ÷ ${BB.rentMonths})`, inr(BB.rent)],
    ['Less: electricity', inr(BB.elec)],
    ['**Profit of March 2027**', `**${inr(BB.profit)}**`],
  ])}\n\nRent carried forward as a prepaid expense = ${inr(BB.rentPaid)} − ${inr(BB.rent)} = **${rs(BB.prepaid)}**. Credit sales are included in revenue because the sale is made, even though cash is yet to come.`,
  sol: 'Revenue earned less expenses incurred for the month.',
  scheme: [['Revenue taken on sales made', 1], ['Cost of goods sold', 1], ['Wages with the amount due', 1], ['Rent of one month and electricity; profit', 1], ['Prepaid rent', 1]],
}));
check(true, 'q_t01 loaded');
void EQ; void EQF; void MT; void LC;
