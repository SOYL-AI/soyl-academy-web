// Build ISC 11 Accounts ch02 Accounting Concepts, Basis of Accounting and Standards. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { rupees } from './acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('isc-11-accounts-ch02', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { same, check, sum, inr, rs, mdTable, basis, EQ, EQF, EQ_ASSETS, HC, MT, LC, PT } = await import('./fig.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ figures
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  lines.forEach((t, i) => s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size: o.size ?? 13, bold: o.bold && i === 0 }));
};
const vWeb = (() => {
  const s = new Svg(660, 330);
  box(s, 330, 28, 340, 34, 'GAAP: uniform, comparable accounts', { size: 14, bold: true });
  const cols = [
    [110, 'About the firm', ['Business entity', 'Money measurement', 'Going concern', 'Accounting period', 'Historical cost']],
    [330, 'About recording', ['Dual aspect', 'Accrual', 'Revenue recognition', 'Matching']],
    [550, 'About reporting', ['Full disclosure', 'Objectivity', 'Materiality', 'Consistency', 'Prudence']],
  ];
  for (const [x, head, items] of cols) {
    s.line(330, 45, x, 85, { sw: 1.5, color: 'muted' });
    box(s, x, 100, 200, 30, head, { fill: 'accent', size: 13, bold: true });
    items.forEach((t, i) => box(s, x, 142 + i * 38, 190, 30, t, { size: 12 }));
  }
  s.text(330, 318, 'Also: timeliness, industry practice, substance over legal form', { size: 12, muted: true });
  return s.visual('Concept map: generally accepted accounting principles divide into concepts about the firm (business entity, money measurement, going concern, accounting period, historical cost), about recording (dual aspect, accrual, revenue recognition, matching) and about reporting (full disclosure, objectivity, materiality, consistency, prudence), with timeliness, industry practice and substance over legal form as further principles', 'The principles of this chapter in three groups.');
})();

// ================================================================ tables for slides
const T = (headers, rows, alt) => table(headers, rows, alt);
const vGaap = T(['Feature', 'Meaning'], [
  ['Full form', 'Generally accepted accounting principles'],
  ['What they cover', 'The concepts, rules and conventions used to record transactions and prepare statements'],
  ['Purpose', 'Uniform accounts that can be compared and relied on'],
  ['Users who gain', 'Owners, lenders, investors, tax officers and employees'],
], 'Table of GAAP: full form, what they cover, their purpose and the users who gain');
const vThree = T(['Concept', 'Meaning', 'Imagined case'], [
  ['Business entity', 'The business is a unit separate from its owner', 'A watch bought for the owner from the firm\'s bank is drawings'],
  ['Money measurement', 'Only events stated in money are recorded', 'A kiln bought for ₹68,000 is recorded; a potter\'s fame is not'],
  ['Going concern', 'The firm is assumed to continue for the foreseeable future', 'An oven is written off over its life, not valued at a hurried-sale price'],
], 'Table of the business entity, money measurement and going concern concepts with meanings and imagined cases');
const vPeriod = T(['Concept', 'Meaning', 'Imagined case'], [
  ['Accounting period', 'Profit and position are found at fixed intervals, usually twelve months', '1 April 2026 to 31 March 2027'],
  ['Historical cost', 'An asset is recorded at the price actually paid and later market rises are not recorded', 'A godown bought for ₹16,00,000 stays at that figure'],
], 'Table of the accounting period and historical cost concepts with meanings and imagined cases');
const vHC = T(['Particulars', 'Amount (₹)'], [
  ['Godown recorded at cost', inr(HC.cost)],
  ['Present market value (not recorded)', inr(HC.market)],
  ['Rise in value (not recorded)', inr(HC.gap)],
  ['Rise as a per cent of cost', `${HC.pct}%`],
], `Table for Kalahandi Millet Mart: godown recorded at cost ${inr(HC.cost)} rupees, market value ${inr(HC.market)} rupees, unrecorded rise ${inr(HC.gap)} rupees, which is ${HC.pct} per cent of cost`);
const vDual = flow('LR', ['Every transaction', 'Has two aspects', 'Of equal value', 'Assets = Liabilities + Capital'], 'Flow: every transaction has two aspects of equal value, so assets equal liabilities plus capital', 'Two sides, always equal.');
const vEq = T(EQ.headers, EQ.rows, `Accounting equation table for Lunglei Bamboo Works: after seven transactions cash is ${inr(EQF.assets.Cash)}, machinery ${inr(EQF.assets.Machinery)}, stock ${inr(EQF.assets.Stock)}, creditors ${inr(EQF.liabilities.Creditors)}, bank loan ${inr(EQF.liabilities['Bank loan'])} and capital ${inr(EQF.capital)} rupees; assets of ${inr(EQ_ASSETS)} equal liabilities plus capital`);
const vAccr = T(['Event', 'Recorded in', 'Reason'], [
  ['Goods sold on credit on 27 March, cash received on 14 April', 'The year ended 31 March', 'Revenue is earned when the sale is made'],
  ['March electricity, bill paid on 20 April', 'The year ended 31 March', 'The expense is incurred when the power is used'],
  ['Fees taken in March for April classes', 'The next year', 'The service has not yet been given'],
], 'Table of the accrual concept: three events, the year in which each is recorded and the reason');
const vRevMatch = T(['Concept', 'Meaning', 'Imagined case'], [
  ['Revenue recognition (realisation)', 'Revenue is recognised when it is earned, that is when the sale is made or the service is rendered', 'A wardrobe delivered on 29 January and paid for in March is January revenue'],
  ['Matching', 'The expenses of a period are set against the revenue they helped to earn in that period', 'A premium for twelve months is charged only for the months used'],
], 'Table of revenue recognition and matching with meanings and imagined cases');
const vMT = T(['Particulars', '₹'], MT.rows, `Matching table for Theni Banana Chips, March 2027: sales ${inr(MT.sales)}, cost of goods sold ${inr(MT.cogs)}, wages ${inr(MT.wages)}, insurance ${inr(MT.ins)}, power ${inr(MT.power)}, profit ${inr(MT.profit)} rupees`);
const vDisc = T(['Principle', 'Meaning', 'Imagined case'], [
  ['Full disclosure', 'Every fact that could influence users is shown in the statements or in notes', 'An uncertain court claim is reported in a note'],
  ['Verifiable objectivity', 'Entries rest on evidence that can be checked, free from personal bias', 'A purchase is entered on the supplier\'s invoice'],
  ['Materiality', 'Items that could influence decisions are shown with care; trivial items are simplified', 'A packet of paper clips is expensed at once'],
], 'Table of full disclosure, verifiable objectivity and materiality with meanings and imagined cases');
const vCons = T(['Principle', 'Meaning', 'Imagined case'], [
  ['Consistency', 'The same methods are followed from period to period; a change needs a reason and disclosure', 'Depreciation is charged by one method every year'],
  ['Timeliness', 'Information is recorded and reported promptly, so it is useful when decisions are made', 'Transactions are entered as they occur, not months later'],
  ['Industry practice', 'The peculiar features of a trade may justify a treatment that differs from the general one', 'A dealer in an exchange-traded metal values stock at the day\'s price, as the trade does'],
], 'Table of consistency, timeliness and industry practice with meanings and imagined cases');
const vPrud = T(['Principle', 'Meaning', 'Imagined case'], [
  ['Prudence (conservatism)', 'Provide for all likely losses; do not anticipate any profit', 'Stock is valued at the lower of cost and net realisable value'],
  ['Substance over legal form', 'A transaction is recorded by its economic reality, not only its legal appearance', 'A van used under hire purchase is the buyer\'s asset from the first day'],
], 'Table of prudence and substance over legal form with meanings and imagined cases');
const vLC = T(['Item', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], LC.rows, `Table for Ghatsila Appliances: stock of ${inr(LC.costT)} rupees at cost and ${inr(LC.nrvT)} rupees at net realisable value is valued line by line at ${inr(LC.total)} rupees, a write-down of ${inr(LC.writeDown)} rupees`);
const vWhich = T(['Situation', 'Principle'], [
  ['The owner\'s personal bill is paid from the firm\'s bank', 'Business entity'],
  ['A premium is charged only for the months used', 'Matching'],
  ['Stock is valued below cost after a price fall', 'Prudence'],
  ['The same depreciation method is used every year', 'Consistency'],
  ['A tiny item is expensed at once', 'Materiality'],
  ['A purchase is entered only on an invoice', 'Verifiable objectivity'],
  ['A hire-purchase van is shown as an asset of the user', 'Substance over legal form'],
], 'Table matching seven situations to the principles they illustrate');
const vSum1 = T(['Group', 'Principles'], [
  ['About the firm', 'Business entity, money measurement, going concern, accounting period, historical cost'],
  ['About recording', 'Dual aspect, accrual, revenue recognition, matching'],
  ['About reporting', 'Full disclosure, objectivity, materiality, consistency, prudence, timeliness, industry practice, substance over legal form'],
], 'Summary table grouping the principles into those about the firm, about recording and about reporting');
const vTips1 = T(['Do', 'Why'], [
  ['Name the principle and give the reason it applies', 'Marks go to the reasoning as well as to the name'],
  ['Show each line of a stock or matching working', 'Step marks are given even if the last figure slips'],
  ['Say whether a treatment follows or violates a principle', 'Questions often ask for exactly this'],
], 'Exam tips table for the principles of accounting');

const vBases = T(['Basis', 'Revenue is recorded', 'Expenses are recorded'], [
  ['Cash basis', 'When cash is received', 'When cash is paid'],
  ['Accrual basis', 'When it is earned', 'When it is incurred'],
], 'Table of the cash basis and the accrual basis: when revenue and expenses are recorded');
const vEvents = T(['Event', 'Cash basis', 'Accrual basis'], [
  ['Fees for November received in October', 'October revenue', 'November revenue'],
  ['Rent for March paid in April', 'April expense', 'March expense'],
  ['Goods sold on credit in June, cash received in July', 'July revenue', 'June revenue'],
], 'Table showing in which period three events are recorded under the cash basis and under the accrual basis');
const vAdj = T(['Item', 'Effect on revenue or expense of the year', 'Balance sheet at the year end'], [
  ['Income received in advance', 'Deduct from revenue', 'Liability'],
  ['Accrued income (earned, not received)', 'Add to revenue', 'Asset: receivable'],
  ['Prepaid expense', 'Deduct from expense', 'Asset'],
  ['Outstanding expense', 'Add to expense', 'Liability'],
], 'Table of four adjustments: income received in advance, accrued income, prepaid expense and outstanding expense, with their effect on the year and on the balance sheet');
const vPT = T(['Item', 'Cash basis (₹)', 'Accrual basis (₹)'], PT.rows, `Table for Pakyong Tuition Hub, year ended 31 March 2027: fees ${inr(PT.rev.cash)} and ${inr(PT.rev.acc)}, expenses ${inr(PT.cashOut)} and ${inr(PT.accOut)}, profit ${inr(PT.cashProfit)} on the cash basis and ${inr(PT.profit)} rupees on the accrual basis`);
const vPTadj = T(['Adjustment', '₹'], PT.adjRows, 'Adjustment table for Pakyong Tuition Hub: each cash figure is adjusted for advance, arrears, prepaid, last-year and unpaid amounts to reach the accrual figure');
const DK = basis({
  revenue: { name: 'Commission', cash: 72000, less: [['received for the next year', 9000]], add: [['earned but not yet received', 5000]] },
  expenses: [
    { name: 'Rent', paid: 30000, less: [['paid for the next year', 5000]] },
    { name: 'Wages', paid: 28000, add: [['of this year, unpaid', 4000]] },
  ],
});
same(DK.rev.acc, 68000, 'DK revenue');
same(DK.accOut, 57000, 'DK expenses');
same(DK.cashProfit, 14000, 'DK cash profit');
same(DK.profit, 11000, 'DK profit');
const vDK = T(['Item', 'Cash basis (₹)', 'Accrual basis (₹)'], DK.rows, `Table for Dibang Agencies: commission ${inr(DK.rev.cash)} and ${inr(DK.rev.acc)}, expenses ${inr(DK.cashOut)} and ${inr(DK.accOut)}, profit ${inr(DK.cashProfit)} on the cash basis and ${inr(DK.profit)} rupees on the accrual basis`);
const PTrev = PT.rev.acc - PT.rev.cash;
const PTexp = sum(PT.exps.map((e) => e.acc - e.paid));
same(PT.cashProfit + PTrev - PTexp, PT.profit, 'PT reconciliation');
const vRec = T(['Particulars', '₹'], [
  ['Cash profit', inr(PT.cashProfit)],
  [`Less: revenue adjusted (${inr(PT.rev.cash)} − ${inr(PT.rev.acc)})`, `(${inr(-PTrev)})`],
  [`Add: expenses reduced (${inr(PT.cashOut)} − ${inr(PT.accOut)})`, inr(PT.cashOut - PT.accOut)],
  ['**Accrual profit**', `**${inr(PT.profit)}**`],
], `Reconciliation table for Pakyong Tuition Hub: cash profit ${inr(PT.cashProfit)} less revenue adjusted ${inr(-PTrev)} plus expenses reduced ${inr(PT.cashOut - PT.accOut)} gives accrual profit ${inr(PT.profit)} rupees`);
const vCompare = T(['Point', 'Cash basis', 'Accrual basis'], [
  ['Revenue', 'On receipt of cash', 'When earned'],
  ['Expenses', 'On payment of cash', 'When incurred'],
  ['Outstanding and prepaid items', 'Not recognised', 'Recognised and adjusted'],
  ['Profit', 'Receipts less payments', 'Revenue of the period less its expenses'],
  ['Picture of the period', 'Can mislead', 'Truer'],
], 'Table comparing the cash basis and the accrual basis on revenue, expenses, outstanding and prepaid items, profit and the picture of the period');
const vStd = T(['Question', 'Answer'], [
  ['What are they?', 'Written statements of uniform accounting rules and policies for treating and disclosing items'],
  ['Need: comparability', 'Statements of different firms and years can be compared'],
  ['Need: reliability', 'Rules limit personal judgement, so figures can be trusted'],
  ['Need: fewer alternatives', 'A narrower choice of methods reduces manipulation'],
], 'Table on accounting standards: meaning and the needs of comparability, reliability and fewer alternatives');
const vAdvLim = T(['Advantages', 'Limitations'], [
  ['Uniform practice across firms', 'May be too rigid for special situations'],
  ['More trust in the figures', 'Costs time, staff and money to follow'],
  ['Easier work for auditors', 'Judgement is still needed'],
  ['Comparison by investors and lenders', 'Must be revised as business changes'],
], 'Table of the advantages and the limitations of accounting standards');
const vIssue = flow('LR', ['Professional body of accountants', 'Drafts and issues the standard', 'Firms apply it in their books', 'Auditors check that it is followed'], 'Flow: a professional body of accountants drafts and issues the standard, firms apply it in their books and auditors check that it is followed', 'In India the Institute of Chartered Accountants of India formulates the standards.');
const vIfrs = T(['Point', 'Detail'], [
  ['Full form', 'International Financial Reporting Standards'],
  ['Issued by', 'The International Accounting Standards Board'],
  ['Objective', 'One set of understandable, high-quality standards for use across the world'],
  ['Objective', 'Transparent statements that can be compared across countries'],
], 'Table on IFRS: full form, issuing body and two objectives');
const vConv = flow('LR', ['National standards', 'Brought closer to IFRS', 'Statements readable abroad', 'Easier cross-border funds and comparison'], 'Flow: national standards are brought closer to IFRS, statements become readable abroad, and cross-border funds and comparison become easier', 'Convergence: moving towards the same standards.');
const vSum2 = T(['Topic', 'Key points'], [
  ['Bases', 'Cash basis records on cash movement; accrual basis on earning and incurring'],
  ['Adjustments', 'Advance and arrears out of revenue, accrued income in; prepaid out of expense, outstanding in'],
  ['Standards', 'Uniform written rules; need, advantages and limitations'],
  ['IFRS', 'International standards issued by an international board; convergence aids comparison and funds'],
], 'Summary table of bases of accounting, adjustments, accounting standards and IFRS');
const vTips2 = T(['Do', 'Why'], [
  ['List every adjustment against the cash figure it changes', 'Each adjustment earns a step mark'],
  ['Check that the profit difference equals the net adjustments', 'It catches slips in signs'],
  ['Keep standards and IFRS answers to meaning, need or objectives, benefits and limits', 'It matches how the marks are given'],
], 'Exam tips table for bases of accounting, standards and IFRS');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Accounting Concepts — Part 1: GAAP I and GAAP II',
  goals: [
    'Explain going concern, entity, money measurement, accounting period, historical cost, dual aspect and accrual, and apply each to a situation',
    'Explain revenue recognition, matching, full disclosure, verifiable objectivity, materiality, consistency, prudence, timeliness, industry practice and substance over legal form',
    'Identify which principle a treatment follows or violates, and show how prudence and matching change reported profit',
  ],
  slides: [
    sl('title', 'Accounting concepts: the rules behind every set of books', {
      b: 'Part 1: **GAAP I** and **GAAP II**, the principles every firm follows.',
      v: vWeb,
      n: 'Welcome to Class eleven accounts. Every shop, workshop and school keeps its books by shared rules, called generally accepted accounting principles. In this part we meet the basic concepts, such as the business entity, the going concern and the dual aspect, and the later principles such as matching, prudence and consistency. We apply each one to imagined businesses so that the idea becomes easy to spot in a question.',
    }),
    sl('concept', 'GAAP: the common rulebook', {
      b: 'GAAP make the accounts of different firms uniform, so readers can compare and trust them.',
      v: vGaap,
      n: 'Generally accepted accounting principles are the concepts, rules and conventions used to record transactions and prepare statements. Their purpose is uniformity. When two firms follow the same principles, an owner, a lender or a tax officer can compare their accounts and rely on them. In this chapter we group the principles into those about the firm, about recording and about reporting.',
    }),
    sl('concept', 'The firm: entity, money and continuity', {
      v: vThree,
      n: 'Three concepts describe the firm. The business entity concept treats the business as separate from its owner, so a watch bought for the owner from the firm is drawings. Money measurement records only events stated in money, so a kiln is recorded but a potter\'s fame is not. The going concern concept assumes the firm will continue, so an oven is written off over its life.',
    }),
    sl('check', 'Quick check: whose payment is it?', {
      b: 'A weaving centre pays for the owner\'s wristwatch from its bank account.',
      chk: 'm_entity',
      n: 'Read the situation carefully. Ask who benefits from the payment, the centre or its owner, and how the business entity concept treats a payment made for the owner personally.',
    }),
    sl('concept', 'Period and historical cost', {
      v: vPeriod,
      n: 'The accounting period concept says profit and position are found at fixed intervals, usually twelve months, so owners need not wait until the business closes. The historical cost concept records an asset at the price actually paid. Later rises in market value are not recorded, because the price paid can be proved from a bill, while a market value is an opinion that keeps changing.',
    }),
    sl('example', 'Worked example 1: cost against market value', {
      b: '**Kalahandi Millet Mart**, an imagined firm, bought a godown. A broker says it would now sell for more.',
      bl: [
        `The balance sheet shows **${rs(HC.cost)}**, the price paid.`,
        `The rise of ${rs(HC.gap)} is not recorded until the godown is sold.`,
        'Cost can be verified; a market value is an opinion.',
      ],
      v: vHC,
      n: `Kalahandi Millet Mart bought a godown for ${rupees(HC.cost)}. A broker says it would now sell for ${rupees(HC.market)}. Under the historical cost concept the balance sheet still shows ${rupees(HC.cost)}. The rise of ${rupees(HC.gap)}, which is a quarter of the cost, is not recorded because the godown has not been sold. The price paid is proved by the deed and the payment.`,
    }),
    sl('concept', 'Dual aspect: the basis of the equation', {
      b: 'Every transaction has **two aspects** of equal value, so Assets = Liabilities + Capital after every transaction.',
      v: vDual,
      n: 'The dual aspect concept says that every transaction has two aspects of equal value. When a firm buys machinery for cash, one asset rises and another falls by the same amount. When it buys goods on credit, an asset and a liability rise together. So assets always equal liabilities plus capital, and this accounting equation is the basis of double entry.',
    }),
    sl('example', 'Worked example 2: the equation, step by step', {
      b: '**Lunglei Bamboo Works**, an imagined firm, starts with cash as capital. After each step, assets equal liabilities plus capital.',
      bl: [
        'Machinery for cash swaps one asset for another.',
        'A credit purchase raises an asset and a liability together.',
        'A sale at a gain raises cash and capital while stock falls.',
      ],
      v: vEq,
      n: `Lunglei Bamboo Works starts with ${rupees(200000)} in cash as capital. Machinery for cash only swaps one asset for another. Goods on credit and a bank loan raise an asset and a liability together. Paying a creditor lowers cash and creditors. Drawings lower cash and capital. A sale at a gain raises capital. At the end, assets of ${rupees(EQ_ASSETS)} equal outside liabilities plus capital of ${rupees(EQF.capital)}.`,
    }),
    sl('check', 'Quick check: going concern', {
      b: 'A firm has resolved to close at the end of the month.',
      chk: 'tf_going',
      n: 'Think about what the going concern concept assumes. If a firm has already decided to close, is that assumption still true, and what should its machinery then be valued at?',
    }),
    sl('concept', 'Accrual: record when earned or incurred', {
      v: vAccr,
      n: 'The accrual concept says revenue is recorded when it is earned and an expense when it is incurred, whether or not cash has moved. A credit sale made in March belongs to March even if the cash comes in April. Electricity used in March is a March expense even if the bill is paid later. Fees taken in advance belong to the later period.',
    }),
    sl('concept', 'Revenue recognition and matching', {
      v: vRevMatch,
      n: 'Revenue recognition, also called realisation, says revenue belongs to the period in which it is earned, that is when the sale is made or the service is rendered. An order alone earns nothing. The matching concept then sets against that revenue the expenses that helped to earn it. A premium paid for twelve months is charged only for the months used, and the rest is carried forward.',
    }),
    sl('example', 'Worked example 3: profit of a month by matching', {
      b: '**Theni Banana Chips**, an imagined firm, March 2027. Revenue is that earned in the month; expenses are those of the month only.',
      bl: [
        `Cost of goods sold = opening stock + purchases − closing stock = ${rs(MT.cogs)}.`,
        `Insurance paid of ${rs(MT.insPaid)} covers twelve months, so ${rs(MT.ins)} is charged and ${rs(MT.prepaid)} carried forward.`,
      ],
      v: vMT,
      n: `Theni Banana Chips earned sales of ${rupees(MT.sales)} in March. Cost of goods sold is opening stock plus purchases less closing stock, which is ${rupees(MT.cogs)}. Wages of the month are ${rupees(MT.wages)}, including the part still due. The premium covers twelve months, so only ${rupees(MT.ins)} is charged. With power, the profit of the month is ${rupees(MT.profit)}.`,
    }),
    sl('check', 'Quick check: profit by matching', {
      b: 'Find the profit by charging only the expenses that belong to the month.',
      chk: 'n_matching_profit',
      n: 'Work in steps. First find the cost of goods sold. Then find the wages and rent that belong to the month alone, adjusting for amounts of other months. Finally subtract every expense of the month from the sales.',
    }),
    sl('concept', 'Disclosure, objectivity and materiality', {
      v: vDisc,
      n: 'Full disclosure asks that every fact that could influence users be shown, in the statements or in notes, such as an uncertain court claim. Verifiable objectivity asks that every entry rest on evidence that can be checked, such as an invoice. Materiality says that important items must be shown with care, while a trivial item such as a packet of paper clips may simply be expensed.',
    }),
    sl('concept', 'Consistency, timeliness and industry practice', {
      v: vCons,
      n: 'Consistency asks a firm to follow the same methods from period to period, so that results of different years can be compared. A method may change for a good reason, but the change must be disclosed. Timeliness asks that information be recorded and reported promptly, while it is useful. Industry practice recognises that some trades have peculiar features, so the accepted practice of that trade may be followed.',
    }),
    sl('concept', 'Prudence and substance over legal form', {
      v: vPrud,
      n: 'Prudence, also called conservatism, asks the accountant to provide for all likely losses but not to anticipate any profit. That is why closing stock is valued at the lower of cost and net realisable value. Substance over legal form says a transaction is recorded by its economic reality. A van used under a hire purchase agreement is the user\'s asset from the first day, though the seller keeps legal title.',
    }),
    sl('example', 'Worked example 4: stock at the lower of cost and net realisable value', {
      b: '**Ghatsila Appliances**, an imagined shop, values each line of closing stock at the lower of cost and net realisable value.',
      bl: [
        'Mixer grinders and water purifiers stay at cost: the expected gain is not recorded.',
        `Induction plates and hair dryers are written down: a loss of ${rs(LC.writeDown)} is provided for.`,
      ],
      v: vLC,
      n: `Ghatsila Appliances compares cost with net realisable value for each line. Mixer grinders and water purifiers could fetch more than they cost, but the gain is not recorded, so they stay at cost. Induction plates and hair dryers would fetch less, so they are written down. Stock at cost is ${rupees(LC.costT)} and the value taken is ${rupees(LC.total)}, a write down of ${rupees(LC.writeDown)}.`,
    }),
    sl('diagram', 'Which principle applies?', {
      v: vWhich,
      n: 'Here are seven situations and the principle behind each. A personal bill paid by the firm is business entity. A premium charged for the months used is matching. Stock valued below cost is prudence. The same depreciation method every year is consistency. A tiny item expensed at once is materiality. A purchase entered on an invoice is verifiable objectivity. A hire purchase van shown as an asset is substance over legal form.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**GAAP** make accounts uniform and comparable.',
        'About the firm: entity, money measurement, going concern, period, historical cost.',
        'About recording: dual aspect, accrual, revenue recognition, matching.',
        'About reporting: disclosure, objectivity, materiality, consistency, prudence and the rest.',
      ],
      v: vSum1,
      n: 'To sum up. Generally accepted accounting principles make accounts uniform and comparable. Some principles describe the firm: the entity, money, continuity, the period and cost. Others govern recording, through dual aspect, accrual, revenue recognition and matching. The rest guide reporting: full disclosure, objectivity, materiality, consistency, prudence, timeliness, industry practice and substance over legal form.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the principle, then say in one line why it applies.',
        'Say clearly whether the treatment follows or violates it.',
        'In stock and matching problems, show every line of the working.',
      ],
      v: vTips1,
      n: 'In the examination, name the principle and say in one line why it applies. When a question asks you to identify a principle, say whether the treatment follows it or violates it. In stock questions, compare cost with net realisable value for every line. In matching questions, charge only the months that belong to the period, and show each line of your working.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Accounting Concepts — Part 2: Cash and Accrual Bases, Standards and IFRS',
  goals: [
    'Distinguish the cash basis from the accrual basis and give the effect of advance, arrears, prepaid and outstanding items',
    'Compute income, expenses and profit on both bases from one year\'s data and reconcile the two profits',
    'Explain the meaning, need, advantages and limitations of accounting standards, and state what IFRS are, their objectives and the benefits of convergence',
  ],
  slides: [
    sl('title', 'Two bases of accounting, and the standards behind them', {
      b: 'Part 2: **cash basis**, **accrual basis**, **accounting standards** and **IFRS**.',
      v: vBases,
      n: 'Welcome to Part two. The same year of a business can show two different profits, depending on whether we record by cash or by earning. We learn both bases, adjust one year of imagined data from cash to accrual, and reconcile the two profits. Then we study accounting standards, why they are needed, their advantages and limits, and the international financial reporting standards.',
    }),
    sl('concept', 'Cash basis and accrual basis', {
      v: vBases,
      n: 'On the cash basis, revenue is recorded when cash is received and an expense when cash is paid. On the accrual basis, revenue is recorded when it is earned and an expense when it is incurred, whether or not cash has moved. The accrual basis ties every item to the period it belongs to, which is why firms keep their books on it.',
    }),
    sl('concept', 'The same event on the two bases', {
      v: vEvents,
      n: 'See how three events fall in different periods. Fees for November received in October are October revenue on the cash basis but November revenue on the accrual basis. Rent for March paid in April is an April expense on the cash basis but a March expense on the accrual basis. A credit sale in June paid in July is July revenue by cash and June revenue by accrual.',
    }),
    sl('check', 'Quick check: when is it recorded?', {
      b: 'A firm on the cash basis sells goods on credit in March and is paid in April.',
      chk: 'm_cash_basis',
      n: 'Recall what triggers a record on the cash basis. Is it the sale, or is it the receipt of cash? Then decide the month in which the revenue appears.',
    }),
    sl('concept', 'The four adjustments', {
      v: vAdj,
      n: 'To move from cash to accrual we make four adjustments. Income received in advance is deducted from revenue and is a liability. Accrued income, earned but not yet received, is added to revenue and is an asset. A prepaid expense is deducted from the expense and is an asset. An outstanding expense is added to the expense and is a liability. Amounts of the last year are also taken out.',
    }),
    sl('example', 'Worked example 1: one year on both bases', {
      b: '**Pakyong Tuition Hub**, an imagined centre, year ended 31 March 2027. Each cash figure is adjusted to reach the accrual figure.',
      bl: [
        `Cash profit: ${rs(PT.rev.cash)} − ${rs(PT.cashOut)} = **${rs(PT.cashProfit)}**.`,
        `Accrual profit: ${rs(PT.rev.acc)} − ${rs(PT.accOut)} = **${rs(PT.profit)}**.`,
      ],
      v: vPT,
      n: `Pakyong Tuition Hub received fees of ${rupees(PT.rev.cash)} and paid expenses of ${rupees(PT.cashOut)}, so its cash profit is ${rupees(PT.cashProfit)}. After removing advance fees and arrears of the last year and adding fees still due, revenue is ${rupees(PT.rev.acc)}. After adjusting rent, salary and electricity, expenses are ${rupees(PT.accOut)}. The accrual profit is ${rupees(PT.profit)}.`,
    }),
    sl('concept', 'How each figure was adjusted', {
      v: vPTadj,
      n: 'This table shows the adjustment behind every accrual figure. Fees start from the cash received, less the advance for the next year, less arrears of the last year, plus fees still due. Rent is reduced by the part paid for the next year. Salary is reduced by the part of the last year and increased by the unpaid part. Electricity is increased by the unpaid bill.',
    }),
    sl('example', 'Worked example 2: a smaller case', {
      b: '**Dibang Agencies**, an imagined firm, earns commission and pays rent and wages.',
      bl: [
        'Commission: remove what is received for the next year, add what is earned but not received.',
        'Rent: remove the part paid for the next year. Wages: add the part unpaid.',
      ],
      v: vDK,
      n: `Dibang Agencies received commission of ${rupees(DK.rev.cash)}. After removing ${rupees(9000)} for the next year and adding ${rupees(5000)} earned but not received, commission income is ${rupees(DK.rev.acc)}. Rent and wages are adjusted in the same way, giving expenses of ${rupees(DK.accOut)}. The cash profit is ${rupees(DK.cashProfit)} and the accrual profit is ${rupees(DK.profit)}.`,
    }),
    sl('check', 'Quick check: accrual profit', {
      b: 'Adjust revenue and expenses for the year, then subtract.',
      chk: 'n_accrual_profit',
      n: 'Work in three steps. Adjust the fees received for the advance and for the fees still to come. Adjust the expenses paid for the prepaid and unpaid parts. Then subtract the expenses of the year from the revenue of the year.',
    }),
    sl('concept', 'Cash basis against accrual basis', {
      v: vCompare,
      n: 'Here the two bases are compared. Revenue is recorded on receipt of cash, or when earned. Expenses are recorded on payment of cash, or when incurred. Outstanding and prepaid items are ignored on the cash basis but adjusted on the accrual basis. The profit is receipts less payments on one basis, and revenue of the period less its expenses on the other. The accrual basis gives the truer picture of a period.',
    }),
    sl('example', 'Worked example 3: from cash profit to accrual profit', {
      b: 'The profit difference is the net of the adjustments. Reconcile Pakyong\'s two profits.',
      bl: [
        `Revenue falls by ${rs(-PTrev)} after the adjustments.`,
        `Expenses fall by ${rs(PT.cashOut - PT.accOut)}, so profit rises.`,
      ],
      v: vRec,
      n: `Start with the cash profit of ${rupees(PT.cashProfit)}. Revenue on the accrual basis is ${rupees(-PTrev)} lower than the cash received, so deduct that. Expenses are ${rupees(PT.cashOut - PT.accOut)} lower than the cash paid, so add that. The result is the accrual profit of ${rupees(PT.profit)}. The profit difference always equals the net of the adjustments.`,
    }),
    sl('concept', 'Accounting standards: meaning and need', {
      v: vStd,
      n: 'Accounting standards are written statements of uniform accounting rules and policies, for the treatment and disclosure of items in the statements. They are needed for three reasons. They make the statements of different firms and years comparable. They make the figures reliable by limiting personal judgement. And they narrow the alternative methods open to accountants, so a firm cannot choose a method just to show a better profit.',
    }),
    sl('concept', 'Advantages and limitations', {
      v: vAdvLim,
      n: 'The advantages of accounting standards are uniform practice across firms, greater trust in the figures, easier work for auditors, and comparison by investors and lenders. The limitations are that a standard may be too rigid for a special situation, that following it costs time, staff and money, that judgement is still needed, and that standards must be revised as business changes.',
    }),
    sl('concept', 'Who issues and who applies', {
      v: vIssue,
      n: 'A professional body of accountants drafts and issues each standard. In India this is the Institute of Chartered Accountants of India. Firms then apply the standard in their books, and auditors check that it has been followed. Where a standard and the law differ, the law prevails. We keep this general: no particular standard or date is needed for the examination.',
    }),
    sl('check', 'Quick check: what do standards do?', {
      b: 'Complete the sentence about alternative methods and comparability.',
      chk: 'fb_standards',
      n: 'Recall what standards do to the choice of accounting methods, and what that does to the statements of different firms. Fill the two blanks with one word each.',
    }),
    sl('concept', 'IFRS: meaning and objectives', {
      v: vIfrs,
      n: 'International financial reporting standards, in short, are a common set of accounting standards issued by the International Accounting Standards Board for use in many countries. Their objectives are one set of understandable, high quality standards for use across the world, and transparent statements that can be compared between countries.',
    }),
    sl('concept', 'Convergence with IFRS', {
      v: vConv,
      n: 'Convergence means bringing national standards closer to the international ones. The benefits are easy to see. Statements become readable abroad, so investors and lenders in other countries can compare them. A company can raise funds across borders more easily. And a group with units in several countries can prepare one set of accounts instead of many, which saves effort.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Cash basis: on cash received or paid. Accrual basis: when earned or incurred.',
        'Accrual profit: adjust for advance, arrears, accrued income, prepaid and outstanding items.',
        'Standards: uniform rules, with advantages and limitations.',
        'IFRS: international standards; convergence aids comparison and funds.',
      ],
      v: vSum2,
      n: 'To sum up. The cash basis records when cash moves, and the accrual basis records when revenue is earned and expenses are incurred. Moving from one to the other needs four adjustments. Accounting standards are uniform written rules with real advantages and some limits. International financial reporting standards are issued by an international board, and convergence helps comparison and the raising of funds.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Set out every adjustment against the figure it changes.',
        'Check that the profit difference equals the net of the adjustments.',
        'For standards and IFRS, give meaning, need or objectives, benefits and limits.',
      ],
      v: vTips2,
      n: 'In the examination, set out each adjustment against the cash figure it changes, and show the working. Check that the difference of the two profits equals the net of the adjustments. For accounting standards and the international standards, keep to meaning, need or objectives, advantages or benefits, and limitations, and do not quote standard numbers or dates.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Accounting Concepts, Basis of Accounting and Standards — Notes',
  sections: [
    {
      h: '1. GAAP and the groups of principles',
      t: 1,
      b: '**GAAP** (generally accepted accounting principles) are the concepts, rules and conventions that accountants follow so that accounts are uniform. A reader can then compare firms and years and rely on the figures.\n\nIn this chapter the principles fall into three groups: those **about the firm** (entity, money measurement, going concern, period, historical cost), those **about recording** (dual aspect, accrual, revenue recognition, matching) and those **about reporting** (disclosure, objectivity, materiality, consistency, prudence, timeliness, industry practice, substance over legal form).',
      terms: [
        ['GAAP', 'The accepted body of concepts, rules and conventions that makes accounts uniform, comparable and reliable.'],
        ['Concept', 'A basic assumption on which recording and reporting rest.'],
        ['Convention', 'An accepted custom that guides how accounts are prepared and reported.'],
      ],
      v: vWeb,
    },
    {
      h: '2. GAAP I: the firm, its money, its life and its cost',
      t: 1,
      b: '**Business entity:** the business is separate from its owner; the owner\'s personal payments are **drawings** and reduce capital.\n\n**Money measurement:** only events that can be stated in money are recorded.\n\n**Going concern:** the firm is assumed to continue, so assets are written off over their lives and not valued at forced-sale prices; the assumption ends when closure is decided.\n\n**Accounting period:** profit and position are found at fixed intervals, usually twelve months.\n\n**Historical cost:** an asset is recorded at the price actually paid; later market rises are not recorded. **Advantage:** verifiable. **Limitation:** may understate current worth.',
      terms: [
        ['Business entity', 'The concept that the business is a unit separate from its owner.'],
        ['Drawings', 'Cash or goods taken by the owner for personal use.'],
        ['Going concern', 'The assumption that the firm will carry on for the foreseeable future.'],
        ['Historical cost', 'The price actually paid to acquire an asset, at which it is recorded.'],
      ],
      v: vThree,
      vs: [vHC],
    },
    {
      h: '3. Dual aspect and accrual',
      t: 1,
      b: '**Dual aspect:** every transaction has two aspects of equal value, so **Assets = Liabilities + Capital** holds after every transaction. A gain increases capital; drawings decrease it.\n\n**Accrual:** revenue is recorded when earned and an expense when incurred, whether or not cash has moved. Typical effects: a credit sale is revenue of the sale year; a bill for power already used is an expense of the year of use; an advance is a liability until the service is given.',
      terms: [
        ['Dual aspect', 'Every transaction affects two items by equal values.'],
        ['Accounting equation', 'Assets = Liabilities + Capital.'],
        ['Accrual', 'Recording revenue when earned and expenses when incurred, regardless of cash.'],
      ],
      v: vDual,
      vs: [vEq],
    },
    {
      h: '4. GAAP II: revenue recognition and matching',
      t: 2,
      b: '**Revenue recognition (realisation):** revenue is recognised when the sale is made or the service rendered, giving a right to the price. An order or an advance is not yet revenue.\n\n**Matching:** the expenses of a period are set against the revenue they helped to earn in the same period. **Format of a matching statement:** revenue; less cost of goods sold (opening stock + purchases − closing stock); less expenses of the period only (paid ± adjustments); equals profit.',
      terms: [
        ['Revenue recognition', 'Recording revenue when it is earned, not when cash is received.'],
        ['Matching', 'Charging a period with the expenses that helped earn its revenue.'],
        ['Prepaid expense', 'An amount paid for a later period; an asset at the period end.'],
      ],
      v: vRevMatch,
      vs: [vMT],
    },
    {
      h: '5. GAAP II: reporting principles',
      t: 2,
      b: '**Full disclosure:** every fact that could influence users is shown. **Verifiable objectivity:** entries rest on checkable evidence. **Materiality:** significant items are shown with care, trivial ones simplified. **Consistency:** the same methods period after period; a change needs a reason and disclosure. **Timeliness:** information is recorded and reported promptly. **Industry practice:** the peculiarities of a trade may justify its accepted treatment.\n\n**Prudence:** provide for likely losses; do not anticipate profit; stock goes at the **lower of cost and net realisable value**. **Substance over legal form:** record the economic reality (for example a hire-purchase asset of the user).',
      terms: [
        ['Net realisable value', 'The estimated selling price less the cost of completing and selling the goods.'],
        ['Prudence', 'Providing for all likely losses and not anticipating any profit.'],
        ['Materiality', 'The idea that only items large enough to influence decisions need separate treatment.'],
        ['Substance over legal form', 'Recording a transaction by its economic reality.'],
      ],
      v: vPrud,
      vs: [vLC, vWhich],
    },
    {
      h: '6. Cash basis and accrual basis',
      t: 3,
      b: '**Cash basis:** revenue on receipt of cash, expenses on payment. **Accrual basis:** revenue when earned, expenses when incurred.\n\n**Adjustments to reach the accrual figure.** Revenue = cash received − advance for the next year − arrears of the last year + accrued (earned, not received). Expense = cash paid − prepaid − amount of the last year paid now + outstanding.\n\n**Check:** accrual profit − cash profit = net adjustments to revenue less net adjustments to expenses. Both profits can be reconciled this way. The accrual basis gives the truer picture of a period.',
      terms: [
        ['Cash basis', 'Revenue and expenses recorded when cash is received or paid.'],
        ['Accrual basis', 'Revenue recorded when earned and expenses when incurred.'],
        ['Accrued income', 'Income earned in the period but not yet received.'],
        ['Outstanding expense', 'An expense incurred in the period but not yet paid; a liability.'],
      ],
      v: vCompare,
      vs: [vAdj, vPT, vRec],
    },
    {
      h: '7. Accounting standards and IFRS',
      t: 4,
      b: '**Accounting standards** are written statements of uniform accounting rules and policies for the treatment and disclosure of items. **Need:** comparability, reliability, fewer alternative methods. **Advantages:** uniform practice, trust, easier audit, comparison by investors. **Limitations:** rigidity, cost, judgement still needed, revision as business changes. In India the Institute of Chartered Accountants of India formulates them; where the law differs, the law prevails.\n\n**IFRS** are International Financial Reporting Standards issued by the International Accounting Standards Board for use in many countries. **Objectives:** one set of understandable, high-quality standards across the world; transparent, comparable statements. **Convergence** helps comparison across countries, the raising of funds abroad and one set of accounts for groups with foreign units.',
      terms: [
        ['Accounting standards', 'Written statements of uniform accounting rules and policies for treating and disclosing items.'],
        ['IFRS', 'International Financial Reporting Standards, issued by the International Accounting Standards Board.'],
        ['Convergence', 'Bringing national standards closer to international ones.'],
      ],
      v: vStd,
      vs: [vAdvLim, vConv],
    },
  ],
  tips: '- **How marks go:** definition 1; example or reason 1; for working, one mark per correct step (cost of goods sold, each adjustment, totals). A bare name of a principle earns little.\n- Identification questions: name the principle, say follows or violates, give a reason.\n- Cash to accrual: list each adjustment against its figure; reconcile through net adjustments.\n- Stock: compare cost and net realisable value line by line.\n- Standards and IFRS: meaning, need or objectives, advantages or benefits, limitations. No standard numbers or dates.\n- **Common mistakes:** counting an advance as revenue; adding prepaid to expenses; confusing matching (period) with prudence (caution); writing GAAP as a law.',
});

// ================================================================ flashcards
const F = cards([
  ['**GAAP**: what are they?', 'The accepted concepts, rules and conventions that make accounts uniform, comparable and reliable.', 'definition', 1],
  ['**Business entity** concept', 'The business is separate from its owner; personal payments are drawings.', 'definition', 1],
  ['**Drawings**', 'Cash or goods the owner takes for personal use; they reduce cash and capital.', 'definition', 1],
  ['**Money measurement** concept', 'Only events that can be stated in money are recorded.', 'definition', 1],
  ['**Going concern** concept', 'The firm is assumed to continue for the foreseeable future, so assets are written off over their lives.', 'definition', 1],
  ['**Accounting period** concept', 'Profit and position are found at fixed intervals, usually twelve months.', 'definition', 1],
  ['**Historical cost** concept', 'An asset is recorded at the price actually paid; later market rises are not recorded.', 'definition', 1],
  ['Advantage and limitation of historical cost', 'Advantage: verifiable and objective. Limitation: may understate current worth in rising prices.', 'concept', 1],
  ['**Dual aspect** concept', 'Every transaction affects two items by equal values, so Assets = Liabilities + Capital.', 'definition', 1],
  ['Effect of a gain on a sale', 'Cash or debtors rise, stock falls by cost, and capital rises by the gain.', 'fact', 1],
  ['Effect of drawings on the equation', 'Cash falls and capital falls by the same amount.', 'fact', 1],
  ['**Accrual** concept', 'Revenue is recorded when earned and expenses when incurred, whether or not cash moves.', 'definition', 1],
  ['**Revenue recognition** (realisation)', 'Revenue belongs to the period of the sale or service, not of the receipt of cash.', 'definition', 2],
  ['An advance received from a customer', 'A liability until the goods or service are delivered.', 'fact', 2],
  ['**Matching** concept', 'Expenses of a period are set against the revenue they helped earn in that period.', 'definition', 2],
  ['**Full disclosure**', 'Every fact that could influence users is shown in the statements or in notes.', 'definition', 2],
  ['**Verifiable objectivity**', 'Entries rest on evidence that can be checked, such as an invoice or a voucher.', 'definition', 2],
  ['**Materiality**', 'Significant items are shown with care; trivial items are simplified.', 'definition', 2],
  ['**Consistency**', 'Same methods from period to period; a change needs a reason and disclosure.', 'definition', 2],
  ['**Prudence** (conservatism)', 'Provide for all likely losses; do not anticipate any profit.', 'definition', 2],
  ['Valuing closing stock', 'At the lower of cost and net realisable value, line by line.', 'exam-tip', 2],
  ['**Timeliness**', 'Information is recorded and reported promptly so that it is useful for decisions.', 'definition', 2],
  ['**Industry practice**', 'The peculiar features of a trade may justify its accepted accounting treatment.', 'definition', 2],
  ['**Substance over legal form**', 'A transaction is recorded by its economic reality, for example a hire-purchase asset of the user.', 'definition', 2],
  ['**Cash basis**', 'Revenue on receipt of cash and expenses on payment of cash.', 'definition', 3],
  ['**Accrual basis**', 'Revenue when earned and expenses when incurred, whether or not cash has moved.', 'definition', 3],
  ['Revenue on the accrual basis', 'Cash received − advance for the next year − arrears of the last year + accrued income.', 'exam-tip', 3],
  ['Expense on the accrual basis', 'Cash paid − prepaid − amount of the last year paid now + outstanding.', 'exam-tip', 3],
  ['Why the accrual basis is preferred', 'It counts only the revenue earned and the expenses incurred in the period, so it gives a truer picture.', 'concept', 3],
  ['**Accounting standards**', 'Written statements of uniform accounting rules and policies for treating and disclosing items.', 'definition', 4],
  ['Need for accounting standards', 'Comparability, reliability and fewer alternative methods.', 'concept', 4],
  ['Limitations of accounting standards', 'May be rigid, cost time and money, still need judgement, and need revision.', 'concept', 4],
  ['**IFRS**', 'International Financial Reporting Standards, issued by the International Accounting Standards Board.', 'definition', 4],
  ['Benefits of convergence with IFRS', 'Comparison across countries, easier raising of funds abroad, one set of group accounts.', 'concept', 4],
]);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Accounting Concepts, Basis of Accounting and Standards',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_gaap', 'm_prudence', 'm_prepaid', 'm_as_need', 'ar_revrec'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_entity_fee', { attempt: 1, keys: ['s2_adv_arrears', 's2_ifrs'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_revrec', { attempt: 1, keys: ['s3_accrual_expenses', 's3_convergence'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts and needs a statement with working.', items: ['l5_cash_accrual'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Accounting Concepts, Basis of Accounting and Standards',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_going', 'm_hcost', 'm_accrual', 'm_revrec', 'm_substance', 'm_disclosure', 'm_accrual_year', 'm_same_both', 'm_ifrs_meaning', 'm_convergence', 'ar_dual', 'ar_outstanding'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer the first two questions and either of the last two.', items: ['s2_going', 's2_materiality', { attempt: 1, keys: ['s2_rent_year', 's2_as_meaning'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer the first three questions and either of the last two. Show your working.', items: ['s3_dual', 's3_prudence', 's3_diff_bases', { attempt: 1, keys: ['s3_as_limits', 's3_accrual_income'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer the first question and either of the last two.', items: ['l5_identify', { attempt: 1, keys: ['l5_reconcile', 'l5_ifrs'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks.
const checksUsed = new Set(['m_entity', 'tf_going', 'n_matching_profit', 'm_cash_basis', 'n_accrual_profit', 'fb_standards']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void mdTable;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of isc-11-accounts-ch02 (GAAP I and II, cash and accrual bases, accounting standards and IFRS); no removed topics; no GST transactions',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no textbook or CISCE specimen or past-paper item reused; the CBSE 11 Theory Base of Accounting set-ups were avoided',
    data: 'every amount computed by src/fig.mjs and acc.mjs and asserted: the accounting equation balances after every step, stock at the lower of cost and net realisable value, profits on both bases with the difference equal to the net adjustments, reconciliations; tables in decks, notes and model answers are generated from the computed values',
    facts: 'GAAP concepts as in standard textbooks; Accounting Standards formulated in India by the Institute of Chartered Accountants of India; IFRS issued by the International Accounting Standards Board; no standard numbers, dates or tax rates stated',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
