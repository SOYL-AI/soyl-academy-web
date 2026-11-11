// t02: GAAP II (revenue recognition, matching, full disclosure, verifiable objectivity, materiality, consistency,
// prudence, timeliness, industry practice, substance over legal form). Imagined firms; every amount computed.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, sum, inr, rs, mdTable, lcnrv } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
const WR = 28500;
QQ('m_revrec', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Lakhimpur Carpentry, an imagined workshop, received an order for a wardrobe on 10 January 2027, delivered it on 29 January 2027 on credit for ${rs(WR)}, and was paid on 3 March 2027. By the revenue recognition concept the revenue of ${rs(WR)} belongs to`,
  opts: ['January 2027, the month of delivery', 'the month in which the order was received', 'March 2027, the month of payment', 'January and March, in equal parts'],
  sol: 'Revenue is earned when the goods pass to the customer and the right to the price arises. A mere order earns nothing, and the date of cash does not matter.',
}));
const PD = { paid: 18000, months: 12, used: 6 };
PD.exp = same((PD.paid / PD.months) * PD.used, 9000, 'm_matching expense');
QQ('m_matching', mcq({
  t: 2, d: 2, c: 'application',
  stem: `On 1 October 2026 Pallavi Dairy, an imagined business, paid an insurance premium of ${rs(PD.paid)} for twelve months. At the year end on 31 March 2027, the amount charged to the profit and loss account for the year, by the matching concept, is`,
  opts: [rs(PD.exp), rs(PD.paid), rs(PD.paid / PD.months), rs(0)],
  sol: `Only the six months used belong to the year: ${inr(PD.paid)} ÷ 12 × 6 = ${rs(PD.exp)}. The whole premium would charge unused months, one month's cost covers a single month, and nil ignores the cover already used.`,
}));
QQ('m_disclosure', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A customer has filed a suit against Jaunpur Textiles, an imagined firm, claiming ₹2,50,000 as damages, and the outcome is uncertain on the balance sheet date. To follow the convention of full disclosure, the firm should',
  opts: ['report the claim in a note to its financial statements', 'say nothing until the court decides', 'record the ₹2,50,000 as a sale', 'reduce its capital by ₹2,50,000 and make no mention'],
  sol: 'A fact that could influence the decisions of a lender or investor is shown, in a note where it cannot be put in figures. Silence hides it, and a sale or a silent cut in capital misstates the position.',
}));
QQ('m_objectivity', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Hosdurg Pulses, an imagined firm, enters a purchase of goods in its books. Under the verifiable objectivity concept the entry should be supported by',
  opts: ['documentary evidence such as the supplier\'s invoice and the payment voucher', 'the owner\'s own estimate of the price', 'the manager\'s opinion of what the goods are worth', 'a verbal promise from the supplier'],
  sol: 'Entries must rest on evidence that two independent persons can check. Estimates, opinions and verbal promises vary from person to person.',
}));
QQ('m_prudence', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At the year end an imagined firm expects to gain ₹40,000 from a lawsuit it is likely to win and to lose ₹25,000 on a debtor who is likely to default. Following the prudence concept, the firm should',
  opts: ['provide for the loss of ₹25,000 and not record the gain of ₹40,000', 'record both the gain and the loss', 'record the gain of ₹40,000 and ignore the loss', 'record neither until both are settled'],
  sol: 'Prudence provides for every likely loss but does not anticipate a gain until it is realised, so only the loss is recorded now. Recording the gain breaks the rule and ignoring the loss overstates profit.',
}));
QQ('m_substance', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Sehra Logistics, an imagined firm, uses a delivery van from the first day under a hire-purchase agreement, although the finance company remains the legal owner until the last instalment is paid. In keeping with substance over legal form, the firm should',
  opts: ['record the van as its own asset and the unpaid price as a liability', 'keep the van out of its books until the final instalment', 'charge the whole price of the van as an expense of the year', 'record only the instalments as they fall due, with no asset'],
  sol: 'The firm controls the van and enjoys its use, so the economic reality is that it owns an asset and owes the balance. Legal title alone must not decide the record.',
}));
QQ('m_industry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Parag Gold Traders, an imagined dealer in a metal traded on an exchange every day, values its closing stock at the day\'s exchange price because every firm in that trade does the same. This treatment follows',
  opts: ['industry practice', 'timeliness', 'the cost concept', 'the money measurement concept'],
  sol: 'Some trades have features of their own, so accepted practice in that trade shapes the treatment. Timeliness concerns speed of reporting, and cost would give the buying price instead.',
}));

// ================================================================ assertion-reason
QQ('ar_prudence', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'An imagined firm provides for a likely loss on a doubtful debt in the current year but does not record a gain it merely expects.',
  r: 'The prudence concept requires all likely losses to be provided for while no profit is anticipated.',
  sol: 'Both are true. The rule stated in the reason is exactly the practice described in the assertion.',
}));
QQ('ar_revrec', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A firm that receives ₹50,000 in advance for goods to be delivered next month does not treat the ₹50,000 as revenue of the present month.',
  r: 'The revenue recognition concept says that revenue is recognised when cash is received.',
  sol: 'The assertion is correct because the goods are not yet delivered. The reason is false: revenue is recognised when earned through a sale or service, which the advance alone does not make.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_consistency', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'Under the consistency convention, Dharwad Plastics, an imagined firm, may change its method of charging depreciation if there is a good reason, provided the change and its effect are disclosed.',
  sol: 'Consistency forbids casual changes, not every change. A justified change is allowed when it is disclosed.',
}));
QQ('fb_stock', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In keeping with prudence, closing stock is valued at the lower of ______ and ______, and so a possible ______ is provided for.',
  acc: [['cost', 'historical cost'], ['net realisable value', 'nrv', 'market value', 'market price'], ['loss']],
  sol: 'The lower of cost and net realisable value is taken, so a possible loss is provided for.',
}));

// ================================================================ numerical
const DS = { sales: 180000, open: 25000, purch: 98000, close: 18000, wagesPaid: 15000, wagesPrev: 3000, wagesDue: 4000, rentPaid: 20000, rentMonths: 4, other: 6000 };
DS.cogs = same(DS.open + DS.purch - DS.close, 105000, 'DS cogs');
DS.wages = same(DS.wagesPaid - DS.wagesPrev + DS.wagesDue, 16000, 'DS wages');
DS.rent = same(DS.rentPaid / DS.rentMonths, 5000, 'DS rent');
DS.profit = same(DS.sales - DS.cogs - DS.wages - DS.rent - DS.other, 48000, 'n_matching_profit');
QQ('n_matching_profit', numQ({
  t: 2, d: 4, c: 'application', value: DS.profit,
  stem: `For June 2027 Dhar Spice Pack, an imagined firm, had sales of ${rs(DS.sales)}, opening stock ${rs(DS.open)}, purchases ${rs(DS.purch)} and closing stock ${rs(DS.close)}. Wages paid in June were ${rs(DS.wagesPaid)}, including ${rs(DS.wagesPrev)} of May, and ${rs(DS.wagesDue)} of June wages are unpaid. Rent of ${rs(DS.rentPaid)} was paid in June for four months starting June, and other expenses were ${rs(DS.other)}. Applying the matching concept, find the profit of June 2027 (in ₹).`,
  sol: `Cost of goods sold = ${inr(DS.open)} + ${inr(DS.purch)} − ${inr(DS.close)} = ${inr(DS.cogs)}. Wages of June = ${inr(DS.wagesPaid)} − ${inr(DS.wagesPrev)} + ${inr(DS.wagesDue)} = ${inr(DS.wages)}; rent of June = ${inr(DS.rentPaid)} ÷ 4 = ${inr(DS.rent)}. Profit = ${inr(DS.sales)} − ${inr(DS.cogs)} − ${inr(DS.wages)} − ${inr(DS.rent)} − ${inr(DS.other)} = ${rs(DS.profit)}.`,
}));
const KS = lcnrv([['Electric kettles', 24000, 27000], ['Toasters', 18000, 13500], ['Irons', 15000, 16500]]);
same(KS.total, 52500, 'n_lcnrv');
QQ('n_lcnrv', numQ({
  t: 2, d: 3, c: 'application', value: KS.total,
  stem: 'At the year end Kanker Appliances, an imagined shop, holds three lines of stock. Electric kettles cost ₹24,000 and could be sold net for ₹27,000; toasters cost ₹18,000 and could be sold net for ₹13,500; irons cost ₹15,000 and could be sold net for ₹16,500. Valuing each line at the lower of cost and net realisable value, find the value of closing stock (in ₹).',
  sol: `Kettles ${inr(24000)} (cost is lower), toasters ${inr(13500)} (net realisable value is lower), irons ${inr(15000)} (cost is lower). Stock = ${inr(24000)} + ${inr(13500)} + ${inr(15000)} = ${rs(KS.total)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_consistency', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'What does the consistency convention require of a firm? Why does it help a reader who compares the profits of several years?',
  model: 'The **consistency** convention requires a firm to follow the same accounting methods and policies from one period to the next, and to change one only for a good reason, with disclosure.\n\nIt helps because differences in profit between years then come from the working of the business and not from a change of method.',
  sol: 'The requirement, then the benefit of comparability.',
  scheme: [['Same methods period after period; change only for a reason, disclosed', 1], ['Comparability of results between years', 1]],
}));
QQ('s2_materiality', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Explain the materiality concept. Why may an imagined firm record the purchase of a packet of paper clips costing ₹40 as an expense at once, even though it lasts for several months?',
  model: 'The **materiality** concept says that items large enough to influence the decisions of users must be shown separately and carefully, while trivial items may be treated in a simple way.\n\nA packet of paper clips at ₹40 is too small to matter, so showing it as an asset and writing it off over months would cost more effort than it is worth.',
  sol: 'Meaning, then why the small item is expensed.',
  scheme: [['Meaning: significant items shown, trivial ones simplified', 1], ['Small item expensed at once because of its size', 1]],
}));
QQ('s2_timeliness', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between timeliness and industry practice as principles of accounting, with one line on each.',
  model: '**Timeliness:** accounting information should be recorded and reported promptly, so that users get it in time to use it for decisions.\n\n**Industry practice:** the peculiar features of a trade may justify a treatment that differs from the general one, so the accepted practice of that industry is followed.',
  sol: 'One line each.',
  scheme: [['Timeliness: prompt recording and reporting', 1], ['Industry practice: treatment shaped by the trade\'s peculiarities', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_revrec', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'State the revenue recognition (realisation) concept. For an imagined firm, say whether revenue is recognised on each date: (i) a customer places an order for furniture; (ii) the furniture is delivered on credit; (iii) the customer pays the price later.',
  model: 'The **revenue recognition** concept: revenue is recognised when it is earned, that is when the sale is made or the service is rendered and the firm has a right to the price, not when cash is received.\n\n(i) Order: no revenue; nothing has been sold.\n\n(ii) Delivery on credit: revenue is recognised on this date.\n\n(iii) Later payment: no new revenue; the debtor is simply settled.',
  sol: 'The concept, then the three dates.',
  scheme: [['Statement of the concept', 1], ['Order: no revenue', 1], ['Delivery recognised; later payment not a fresh revenue', 1]],
}));
QQ('s3_prudence', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: 'Explain the prudence (conservatism) concept with one example from valuing stock. How does it affect the profit reported for a year in which a line of stock has fallen in value?',
  model: '**Prudence:** provide for all likely losses, and do not anticipate any profit.\n\n**Example:** closing stock is valued at the lower of cost and net realisable value, so a line that can now be sold only at less than its cost is written down.\n\n**Effect on profit:** the write-down raises the cost of goods sold of the year, so the profit of that year is lower. A rise in the value of other stock is not recorded.',
  sol: 'Statement, example, effect on profit.',
  scheme: [['Statement of prudence', 1], ['Example: stock at the lower of cost and net realisable value', 1], ['Effect: profit of the year reduced by the write-down', 1]],
}));
QQ('s3_substance', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: 'What is meant by substance over legal form? Show with the case of a machine bought on instalments, where the seller keeps legal title until the last instalment, how the concept affects the books of the buyer.',
  model: '**Substance over legal form:** a transaction is recorded according to its economic reality and not only its legal appearance.\n\n**Machine on instalments:** the buyer uses the machine and bears its risks, so it records the machine as an asset from the start.\n\nThe unpaid price is shown as a liability, which falls as each instalment is paid.',
  sol: 'Meaning, then asset and liability treatment.',
  scheme: [['Meaning of the concept', 1], ['Machine recorded as an asset of the buyer', 1], ['Unpaid price as a liability, reduced by each instalment', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_identify', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: 'Identify the accounting concept or convention followed or violated in each of the following imagined situations, with a reason: (i) Bhilai Footwear writes off a pencil sharpener costing ₹25 in the year of purchase; (ii) Sirsi Pickles records a sale on the day goods are delivered and not on the day the price is received; (iii) Alapuzha Ropes changes its method of depreciation every year to suit the profit it wants to show; (iv) Garhwa Stationers values a line of stock above its cost because its selling price has risen; (v) Nagda Motors enters a purchase on the owner\'s guess of the price, with no bill.',
  model: `${mdTable(['Situation', 'Concept', 'Reason'], [
    ['(i) Sharpener written off at once', 'Materiality (followed)', 'The item is too small to affect decisions, so it is expensed.'],
    ['(ii) Sale recorded on delivery', 'Revenue recognition (followed)', 'Revenue is earned when the sale is made, not when cash is received.'],
    ['(iii) Depreciation method changed every year', 'Consistency (violated)', 'Methods must be the same period to period unless a good, disclosed reason exists.'],
    ['(iv) Stock above cost for a rise in price', 'Prudence (violated)', 'Stock is valued at the lower of cost and net realisable value; no gain is anticipated.'],
    ['(v) Purchase on a guess', 'Verifiable objectivity (violated)', 'Entries need documentary evidence such as a bill that can be checked.'],
  ])}`,
  sol: 'One concept and one reason for each of the five situations.',
  scheme: [['(i) Materiality with reason', 1], ['(ii) Revenue recognition with reason', 1], ['(iii) Consistency with reason', 1], ['(iv) Prudence with reason', 1], ['(v) Verifiable objectivity with reason', 1]],
}));
const BC = { sales: 310000, open: 55000, purch: 175000, salPaid: 24000, salDue: 4000, rentPaid: 30000, rentMonths: 3, other: 12000 };
const BCS = lcnrv([['Candle boxes', 40000, 46000], ['Gift sets', 30000, 21000], ['Incense packs', 25000, 28000], ['Lamps', 20000, 14000]]);
BC.close = same(BCS.total, 100000, 'BC closing stock');
BC.cogs = same(BC.open + BC.purch - BC.close, 130000, 'BC cogs');
BC.sal = same(BC.salPaid + BC.salDue, 28000, 'BC salaries');
BC.rent = same(BC.rentPaid / BC.rentMonths, 10000, 'BC rent');
BC.profit = same(BC.sales - BC.cogs - BC.sal - BC.rent - BC.other, 130000, 'BC profit');
BC.cogsCost = BC.open + BC.purch - BCS.costT;
BC.profitCost = same(BC.sales - BC.cogsCost - BC.sal - BC.rent - BC.other, 145000, 'BC profit at cost');
same(BC.profitCost - BC.profit, BCS.writeDown, 'BC difference equals write-down');
QQ('l5_matching_stock', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: `For the month of November 2026, Bhimtal Candles, an imagined workshop, had sales of ${rs(BC.sales)}, opening stock ${rs(BC.open)} and purchases ${rs(BC.purch)}. Its closing stock, with cost and net realisable value in brackets, is: candle boxes (${rs(40000)}, ${rs(46000)}), gift sets (${rs(30000)}, ${rs(21000)}), incense packs (${rs(25000)}, ${rs(28000)}) and lamps (${rs(20000)}, ${rs(14000)}). Salaries paid were ${rs(BC.salPaid)} and ${rs(BC.salDue)} of November salaries are unpaid. Rent of ${rs(BC.rentPaid)} was paid on 1 November for three months, and other expenses were ${rs(BC.other)}. (a) Value the closing stock on the prudence principle. [2] (b) Using the matching concept, find the profit of November 2026. [2] (c) By how much would the profit have been overstated if the stock were valued at cost? [1]`,
  model: `**(a)** Closing stock at the lower of cost and net realisable value:\n\n${mdTable(['Item', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], BCS.rows.concat([['**Total**', `**${inr(BCS.costT)}**`, `**${inr(BCS.nrvT)}**`, `**${inr(BCS.total)}**`]]))}\n\n**(b)** Cost of goods sold = ${inr(BC.open)} + ${inr(BC.purch)} − ${inr(BC.close)} = ${inr(BC.cogs)}.\n\n${mdTable(['Particulars', '₹'], [
    ['Sales', inr(BC.sales)],
    ['Less: cost of goods sold', inr(BC.cogs)],
    [`Less: salaries (${inr(BC.salPaid)} + ${inr(BC.salDue)})`, inr(BC.sal)],
    [`Less: rent of November (${inr(BC.rentPaid)} ÷ ${BC.rentMonths})`, inr(BC.rent)],
    ['Less: other expenses', inr(BC.other)],
    ['**Profit of November**', `**${inr(BC.profit)}**`],
  ])}\n\n**(c)** At cost, closing stock would be ${inr(BCS.costT)}, so profit would be ${inr(BC.profitCost)}, which is ${inr(BC.profitCost)} − ${inr(BC.profit)} = **${rs(BCS.writeDown)}** more: the write-down provided for.`,
  sol: 'Value stock item by item, then match one month of each expense, then compare with stock at cost.',
  scheme: [['Each line at the lower value; stock total', 2], ['Cost of goods sold and the month\'s salaries, rent and other expenses', 1], ['Profit of the month', 1], ['Overstatement equals the write-down', 1]],
}));
