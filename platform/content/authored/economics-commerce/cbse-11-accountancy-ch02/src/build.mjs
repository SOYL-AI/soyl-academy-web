// Build CBSE 11 Accountancy ch02 Theory Base of Accounting. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { rupees } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch02', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { same, check, sum, inr, rs, EQ, EQF, EQ_ASSETS, HC, MT, CA, LC, GS } = await import('./figures.mjs');
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
  box(s, 330, 28, 320, 34, 'GAAP: uniform, comparable accounts', { size: 14, bold: true });
  const cols = [
    [110, 'What is recorded', ['Business entity', 'Money measurement', 'Going concern', 'Accounting period', 'Cost']],
    [330, 'How it is recorded', ['Dual aspect', 'Revenue recognition', 'Matching']],
    [550, 'How it is reported', ['Full disclosure', 'Consistency', 'Conservatism', 'Materiality', 'Objectivity']],
  ];
  for (const [x, head, items] of cols) {
    s.line(330, 45, x, 85, { sw: 1.5, color: 'muted' });
    box(s, x, 100, 200, 30, head, { fill: 'accent', size: 13, bold: true });
    items.forEach((t, i) => box(s, x, 148 + i * 38, 200, 30, t));
  }
  return s.visual('Concepts web: GAAP at the top branches into three groups. What is recorded: business entity, money measurement, going concern, accounting period, cost. How it is recorded: dual aspect, revenue recognition, matching. How it is reported: full disclosure, consistency, conservatism, materiality, objectivity', 'Thirteen ideas, one purpose: accounts that can be compared and trusted.');
})();

const vCompare = (() => {
  const s = new Svg(690, 270);
  box(s, 300, 30, 230, 32, 'Cash basis', { fill: 'accent', bold: true, size: 14 });
  box(s, 560, 30, 230, 32, 'Accrual basis', { fill: 'accent', bold: true, size: 14 });
  const rows = [
    ['Revenue', 'Recorded when cash is received', 'Recorded when it is earned'],
    ['Expenses', 'Recorded when cash is paid', 'Recorded when it is incurred'],
    ['Prepaid and due items', 'Not adjusted', 'Adjusted at the period end'],
    ['Meghna, October', `Profit ${rs(CA.cashProfit)}`, `Profit ${rs(CA.profit)}`],
  ];
  rows.forEach(([a, b, c], i) => {
    const y = 85 + i * 50;
    box(s, 85, y, 150, 40, a, { size: 12, fill: 'none', color: 'muted' });
    box(s, 300, y, 230, 40, b, { size: 12 });
    box(s, 560, y, 230, 40, c, { size: 12 });
  });
  return s.visual(`Comparison of the cash basis and the accrual basis: revenue is recorded when cash is received or when earned; expenses when cash is paid or when incurred; prepaid and due items are not adjusted or are adjusted; for an imagined tuition centre in October the profit is ${inr(CA.cashProfit)} rupees on the cash basis and ${inr(CA.profit)} rupees on the accrual basis`, 'The same month gives two different profits.');
})();

const vGstTree = (() => {
  const s = new Svg(680, 320);
  box(s, 340, 28, 380, 34, 'Goods and services tax: destination-based', { size: 14, bold: true });
  s.line(340, 45, 175, 83, { sw: 1.5, color: 'muted' });
  s.line(340, 45, 515, 83, { sw: 1.5, color: 'muted' });
  box(s, 175, 100, 230, 34, 'Intra-state supply', { fill: 'accent', bold: true });
  box(s, 515, 100, 230, 34, 'Inter-state supply', { fill: 'accent', bold: true });
  s.line(175, 117, 95, 160, { sw: 1.5, color: 'muted' });
  s.line(175, 117, 270, 160, { sw: 1.5, color: 'muted' });
  s.line(515, 117, 515, 160, { sw: 1.5, color: 'muted' });
  box(s, 95, 190, 170, 56, ['CGST', 'to the Centre'], { bold: true });
  box(s, 270, 190, 170, 56, ['SGST', 'UTGST in a Union Territory'], { bold: true, size: 12 });
  box(s, 515, 190, 300, 56, ['IGST', 'Centre collects, shares with state'], { bold: true, size: 12 });
  s.line(95, 218, 95, 248, { sw: 1.2, color: 'muted' });
  s.line(270, 218, 270, 248, { sw: 1.2, color: 'muted' });
  s.line(515, 218, 515, 248, { sw: 1.2, color: 'muted' });
  box(s, 340, 270, 600, 34, 'Input tax credit: tax paid on purchases is set off against tax on sales', { size: 13 });
  return s.visual('GST structure chart: goods and services tax splits into intra-state supply, which carries CGST for the Centre and SGST for the state (UTGST in a Union Territory), and inter-state supply, which carries IGST collected by the Centre and shared with the destination state; input tax credit sits beneath all three', 'Dual structure: two taxes within a state, one across states.');
})();

const vItcFlow = (() => {
  const s = new Svg(680, 280);
  box(s, 100, 70, 170, 76, ['Supplier', `Sells at ${inr(GS.buy)}`, `charges tax ${inr(GS.in.tax)}`], { bold: true, size: 12, gap: 20 });
  box(s, 340, 70, 190, 76, ['Dev Hardware', `Pays input tax ${inr(GS.in.tax)}`, `collects tax ${inr(GS.out.tax)}`], { bold: true, size: 12, gap: 20 });
  box(s, 580, 70, 170, 76, ['Customer', `Buys at ${inr(GS.sell)}`, `pays tax ${inr(GS.out.tax)}`], { bold: true, size: 12, gap: 20 });
  s.arrow(185, 70, 243, 70, { sw: 1.8 });
  s.arrow(435, 70, 495, 70, { sw: 1.8 });
  s.arrow(340, 108, 340, 180, { sw: 1.8 });
  s.text(352, 144, 'tax payable after credit', { anchor: 'start', size: 12 });
  box(s, 340, 218, 330, 56, ['Government', `Dev pays ${inr(GS.out.tax)} − ${inr(GS.in.tax)} = ${inr(GS.net)}`], { bold: true, size: 13 });
  return s.visual(`Input tax credit flow: the supplier sells goods of ${inr(GS.buy)} rupees and charges tax of ${inr(GS.in.tax)}; Dev Hardware pays that input tax, sells to a customer for ${inr(GS.sell)} rupees and collects tax of ${inr(GS.out.tax)}; it pays the government only ${inr(GS.out.tax)} minus ${inr(GS.in.tax)}, which is ${inr(GS.net)} rupees`, 'Each seller pays tax only on the value it adds.');
})();

// ================================================================ tables for slides
const T = (headers, rows, alt) => table(headers, rows, alt);
const vGaap = T(['Feature', 'Meaning'], [
  ['Full form', 'Generally accepted accounting principles'],
  ['What they are', 'The rules, concepts and conventions followed in recording transactions and preparing statements'],
  ['Purpose', 'Uniform accounts that can be compared and relied on'],
  ['Two parts', 'Basic concepts (assumptions) and conventions (accepted customs)'],
], 'Table of GAAP: full form, what they are, their purpose, and their two parts, concepts and conventions');
const vThree = T(['Concept', 'Standard meaning', 'Imagined case'], [
  ['Business entity', 'The business is a unit separate from its owner', 'A household bill paid from the till is the owner\'s drawings'],
  ['Money measurement', 'Only events expressible in money are recorded', 'An oven bought for ₹85,000 is recorded; a baker\'s skill is not'],
  ['Going concern', 'The firm is assumed to continue for the foreseeable future', 'A machine is written off over its life, not valued at a forced-sale price'],
], 'Table of three concepts: business entity, money measurement and going concern, each with its meaning and an imagined case');
const vPeriod = T(['Concept', 'Standard meaning', 'Imagined case'], [
  ['Accounting period', 'Profit and position are found at regular intervals, usually twelve months', '1 April to 31 March'],
  ['Cost (historical cost)', 'Assets are recorded at the price actually paid', 'Land bought for ₹10,00,000 stays at that figure'],
  ['Objectivity', 'Entries rest on verifiable evidence', 'A purchase is recorded on the supplier\'s invoice'],
], 'Table of accounting period, cost and objectivity with meanings and imagined cases');
const vHC = T(['Particulars', 'Amount (₹)'], [
  ['Cost of the land (recorded in the balance sheet)', inr(HC.cost)],
  ['Present market value (not recorded)', inr(HC.market)],
  ['Rise in value (not recorded)', inr(HC.gap)],
  ['Rise as a per cent of cost', `${HC.pct}%`],
], `Table for Kaveri Printers: land recorded at cost ${inr(HC.cost)} rupees, market value ${inr(HC.market)} rupees, unrecorded rise ${inr(HC.gap)} rupees, which is ${HC.pct} per cent of cost`);
const vDual = flow('LR', ['Every transaction', 'Affects two items', 'By equal values', 'Assets = Liabilities + Capital'], 'Flow: every transaction affects two items by equal values, so assets always equal liabilities plus capital', 'Two sides, always equal.');
const vEq = T(EQ.headers, EQ.rows, `Accounting equation table for Tara Stationers: after six steps cash is ${inr(EQF.assets.Cash)}, furniture ${inr(EQF.assets.Furniture)}, stock ${inr(EQF.assets.Stock)}, creditors ${inr(EQF.liabilities.Creditors)}, bank loan ${inr(EQF.liabilities['Bank loan'])} and capital ${inr(EQF.capital)} rupees; assets of ${inr(EQ_ASSETS)} equal liabilities plus capital`);
const vRevMatch = T(['Concept', 'Standard meaning', 'Imagined case'], [
  ['Revenue recognition (realisation)', 'Revenue is recognised when it is earned, that is when the sale is made, not when cash is received', 'A sofa delivered in December and paid for in January is December revenue'],
  ['Matching', 'The expenses of a period are set against the revenue of the same period', 'Insurance for twelve months is charged only for the months used in the year'],
], 'Table of revenue recognition and matching with meanings and imagined cases');
const vMT = T(['Particulars', '₹'], MT.rows, `Matching table for Anjali Tailors, October 2026: sales ${inr(MT.sales)}, cost of goods sold ${inr(MT.cogs)}, salaries ${inr(MT.sal)}, rent ${inr(MT.rent)}, electricity ${inr(MT.elec)}, profit ${inr(MT.profit)} rupees`);
const vDisCon = T(['Convention', 'Standard meaning', 'Imagined case'], [
  ['Full disclosure', 'All facts that could influence users are shown in the statements or in notes', 'A pending court claim is reported in a note'],
  ['Consistency', 'The same methods are followed from period to period', 'Depreciation is charged by one method year after year'],
], 'Table of full disclosure and consistency with meanings and imagined cases');
const vConMat = T(['Convention', 'Standard meaning', 'Imagined case'], [
  ['Conservatism (prudence)', 'Provide for all possible losses; do not anticipate profits', 'Stock is valued at the lower of cost and net realisable value'],
  ['Materiality', 'Items large enough to influence decisions are shown separately; trivial items are treated simply', 'A sharpener costing a few rupees is expensed at once'],
], 'Table of conservatism and materiality with meanings and imagined cases');
const vLC = T(['Item', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], LC.rows, `Table for Sagar Electricals: stock of ${inr(LC.costT)} rupees at cost and ${inr(LC.nrvT)} rupees at net realisable value is valued item by item at ${inr(LC.total)} rupees, a write-down of ${inr(LC.writeDown)} rupees`);
const vWhich = T(['Situation', 'Concept'], [
  ['The owner pays a household bill from the till', 'Business entity'],
  ['Insurance paid for twelve months is charged for the months used', 'Matching'],
  ['Stock is valued below cost because its selling price fell', 'Conservatism'],
  ['The same depreciation method is used every year', 'Consistency'],
  ['A very small item is expensed at once', 'Materiality'],
  ['A purchase is entered only after the invoice arrives', 'Objectivity'],
], 'Table matching six situations to the concepts they illustrate');
const vSum1 = T(['Group', 'Ideas'], [
  ['What is recorded', 'Business entity, money measurement, going concern, accounting period, cost'],
  ['How it is recorded', 'Dual aspect, revenue recognition, matching'],
  ['How it is reported', 'Full disclosure, consistency, conservatism, materiality, objectivity'],
], 'Summary table grouping the thirteen concepts and conventions into what is recorded, how it is recorded and how it is reported');

const vBases = T(['Basis', 'Revenue is recorded', 'Expenses are recorded'], [
  ['Cash basis', 'When cash is received', 'When cash is paid'],
  ['Accrual basis', 'When it is earned', 'When it is incurred'],
], 'Table of the cash basis and the accrual basis: when revenue and expenses are recorded');
const vCashEvents = T(['Event', 'Cash basis', 'Accrual basis'], [
  ['Fees for November received in October', 'October revenue', 'November revenue'],
  ['Rent for March paid in April', 'April expense', 'March expense'],
  ['Goods sold on credit in June, cash received in July', 'July revenue', 'June revenue'],
], 'Table showing in which period three events are recorded under the cash basis and under the accrual basis');
const vCA = T(['Item', 'Cash basis (₹)', 'Accrual basis (₹)'], CA.rows, `Table for Meghna Coaching Classes, October 2026: fees ${inr(CA.cashIn)} and ${inr(CA.rev)}, expenses ${inr(CA.cashOut)} and ${inr(CA.exp)}, profit ${inr(CA.cashProfit)} on the cash basis and ${inr(CA.profit)} rupees on the accrual basis`);
const vCAadj = T(['Adjustment', '₹'], [...CA.revRows, ...CA.expRows], `Adjustment table for Meghna Coaching Classes: revenue of October ${inr(CA.rev)} and expenses of October ${inr(CA.exp)} rupees, found by adjusting cash received and cash paid`);
const vStdNeed = T(['Question', 'Answer'], [
  ['What are they?', 'Written statements of uniform accounting rules and policies for treating and disclosing items'],
  ['Need: comparability', 'Statements of different firms and years can be compared'],
  ['Need: reliability', 'Rules limit personal judgement, so figures can be trusted'],
  ['Need: fewer alternatives', 'A narrower choice of methods reduces manipulation'],
], 'Table on accounting standards: their meaning and the needs of comparability, reliability and fewer alternatives');
const vIssue = flow('LR', ['Institute of Chartered Accountants of India', 'Accounting Standards Board (set up in 1977)', 'Drafts and issues the standard', 'Firms and auditors follow it'], 'Flow: the Institute of Chartered Accountants of India, through its Accounting Standards Board set up in 1977, drafts and issues the standard, which firms and auditors follow', 'Dated note: as of 2024.');
const vIndAs = T(['Point', 'Note (as of 2024)'], [
  ['Indian Accounting Standards (Ind AS)', 'Standards converged with International Financial Reporting Standards'],
  ['Notified', 'By the government in 2015'],
  ['Applicable', 'From the 2016 financial year, to specified companies by conditions such as size'],
  ['Benefits of standards', 'Uniform practice, trusted figures, easier audit, comparison for investors and lenders'],
], 'Table on Indian Accounting Standards: converged with international standards, notified in 2015, applicable to specified companies from 2016, and the benefits of standards');
const vGstFeat = T(['Feature', 'Meaning (as of 2024)'], [
  ['What it is', 'An indirect tax on the supply of goods and services'],
  ['Destination-based', 'The tax accrues to the place where goods or services are consumed'],
  ['Dual structure', 'CGST and SGST (UTGST in Union Territories) within a state; IGST between states'],
  ['Input tax credit', 'Tax paid on purchases is set off against tax on sales'],
  ['Introduced', '1 July 2017'],
], 'Table of features of goods and services tax: indirect tax, destination-based, dual structure, input tax credit, introduced on 1 July 2017');
const vGstin = T(['Point', 'Detail (as of 2024)'], [
  ['GSTIN', 'Goods and services tax identification number of a registered taxpayer'],
  ['Length', '15 characters'],
  ['Contents', 'Two-digit state code, the taxpayer\'s PAN, an entity number and a check character'],
  ['Used for', 'Tax invoices, returns and claiming input tax credit'],
], 'Table on the GSTIN: its meaning, length, contents and uses');
const vIntra = T(['Invoice', 'Value (₹)', 'Tax at an imagined 12% (₹)', 'CGST (₹)', 'SGST (₹)', 'Invoice total (₹)'], [
  ['Purchase by Dev Hardware, Jaipur', inr(GS.buy), inr(GS.in.tax), inr(GS.in.cgst), inr(GS.in.sgst), inr(GS.invBuy)],
  ['Sale by Dev Hardware, Jaipur', inr(GS.sell), inr(GS.out.tax), inr(GS.out.cgst), inr(GS.out.sgst), inr(GS.invSell)],
  ['Inter-state sale to Surat (IGST)', inr(GS.interSell), inr(GS.inter.tax), '–', '–', inr(GS.invInter)],
], `Table of imagined invoices at 12 per cent: purchase ${inr(GS.buy)} with tax ${inr(GS.in.tax)}, sale ${inr(GS.sell)} with tax ${inr(GS.out.tax)} split equally, and an inter-state sale of ${inr(GS.interSell)} with IGST of ${inr(GS.inter.igst)} rupees`);
const vSetOff = T(['Tax', 'Output (₹)', 'Input credit (₹)', 'Payable (₹)'], [
  ['CGST', inr(GS.out.cgst), inr(GS.in.cgst), inr(GS.cgstPay)],
  ['SGST', inr(GS.out.sgst), inr(GS.in.sgst), inr(GS.sgstPay)],
  ['**Total**', `**${inr(GS.out.tax)}**`, `**${inr(GS.in.tax)}**`, `**${inr(GS.net)}**`],
], `Set-off table: output tax ${inr(GS.out.tax)} less input credit ${inr(GS.in.tax)} leaves ${inr(GS.net)} rupees payable, ${inr(GS.cgstPay)} as CGST and ${inr(GS.sgstPay)} as SGST`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Bases', 'Cash basis records on cash movement; accrual basis on earning and incurring'],
  ['Standards', 'Uniform written rules issued in India by the Institute of Chartered Accountants of India through its Accounting Standards Board; Ind AS are converged with international standards'],
  ['GST', 'Destination-based; CGST and SGST within a state, IGST between states; input tax credit; GSTIN; introduced 1 July 2017'],
], 'Summary table of bases of accounting, accounting standards and goods and services tax');
const vTips1 = T(['Do', 'Why'], [
  ['Name the concept and say why it applies', 'Marks go to the reasoning, not only the label'],
  ['Show the working for stock and matching', 'Method marks are given even if the final figure slips'],
  ['Give a small example for each concept', 'It proves you understand the idea'],
], 'Exam tips table for the concepts and conventions');
const vTips2 = T(['Do', 'Why'], [
  ['Adjust cash figures for advance, arrears, prepaid and outstanding items', 'This is how the accrual profit is found'],
  ['Split intra-state tax equally into CGST and SGST', 'IGST is a single tax for inter-state supplies'],
  ['State dates and rates only as given in the problem', 'GST rules and dates are time-bound'],
], 'Exam tips table for bases of accounting, standards and goods and services tax');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Theory Base of Accounting — Part 1: GAAP, Concepts and Conventions',
  goals: [
    'State what GAAP are and why accounts follow them',
    'Explain the basic concepts: business entity, money measurement, going concern, accounting period, cost, dual aspect, revenue recognition, matching, objectivity',
    'Explain the conventions of full disclosure, consistency, conservatism and materiality and apply them to imagined cases',
  ],
  slides: [
    sl('title', 'Theory Base of Accounting: concepts and conventions', {
      b: 'Part 1: **GAAP**, the basic **concepts** and the **conventions** behind every set of accounts.',
      v: vWeb,
      n: 'Welcome to Class eleven accountancy. Every shop, factory and school keeps accounts in much the same way, and this is no accident. Accountants follow shared rules called generally accepted accounting principles. In this part we study thirteen basic ideas, the concepts and conventions, and apply them to imagined businesses: valuing land, matching expenses to revenue, and valuing stock with caution.',
    }),
    sl('concept', 'GAAP: the common rulebook', {
      b: '**GAAP** are the rules, concepts and conventions that accountants follow to make accounts uniform.',
      v: vGaap,
      n: 'Generally accepted accounting principles are the rules, concepts and conventions that accountants follow when they record transactions and prepare statements. Their purpose is uniformity. When two firms follow the same principles, their accounts can be compared and trusted by owners, lenders and tax officers. Concepts are the basic assumptions of accounting, and conventions are the accepted customs that guide how the statements are prepared.',
    }),
    sl('concept', 'The firm, its money and its life', {
      v: vThree,
      n: 'Three concepts describe the firm itself. The business entity concept treats the business as separate from its owner, so a household bill paid from the till is the owner\'s drawings. Money measurement records only what can be expressed in money, so an oven is recorded but a baker\'s skill is not. The going concern concept assumes the firm will continue, so a machine is written off over its life.',
    }),
    sl('check', 'Quick check: whose payment is it?', {
      b: 'A shop owner pays a family bill from the shop\'s cash box.',
      chk: 'm_entity',
      n: 'Read the situation carefully. Ask yourself who benefits from the payment, the shop or its owner, and how the business entity concept treats a payment that benefits the owner personally.',
    }),
    sl('concept', 'Period, price and proof', {
      v: vPeriod,
      n: 'The accounting period concept says profit and position are found at regular intervals, usually twelve months, such as the first of April to the thirty first of March. The cost concept records an asset at the price actually paid. Objectivity asks that every entry rest on verifiable evidence, such as the supplier\'s invoice, so that two accountants would reach the same figure.',
    }),
    sl('example', 'Worked example 1: cost against market value', {
      b: `**Kaveri Printers**, an imagined firm, bought land for ${rs(HC.cost)}. Similar land now sells for ${rs(HC.market)}.`,
      bl: [
        `The balance sheet shows **${rs(HC.cost)}**: the price paid.`,
        `The rise of ${rs(HC.gap)} is not recorded until the land is sold.`,
        'Cost is objective and verifiable; a market value is an opinion that keeps changing.',
      ],
      v: vHC,
      n: `Kaveri Printers bought land for ${rupees(HC.cost)}. Similar land now sells for ${rupees(HC.market)}. Under the cost concept the balance sheet still shows ${rupees(HC.cost)}. The rise of ${rupees(HC.gap)}, which is half of the cost, is not recorded, because the land has not been sold and a market value is only an opinion. The price paid can be proved from the deed and the payment.`,
    }),
    sl('concept', 'Dual aspect: the basis of the equation', {
      b: 'Every transaction has **two aspects** of equal value, so Assets = Liabilities + Capital after every transaction.',
      v: vDual,
      n: 'The dual aspect concept says that every transaction has two sides of equal value. When a firm buys furniture for cash, one asset rises and another falls by the same amount. When it buys goods on credit, an asset and a liability rise together. Because of this, assets always equal liabilities plus capital, and this accounting equation is the basis of double entry book-keeping.',
    }),
    sl('example', 'Worked example 2: the equation step by step', {
      b: 'The imagined **Tara Stationers** starts with cash as capital. After each step, assets equal liabilities plus capital.',
      bl: [
        'Buying furniture changes one asset for another.',
        'Credit purchase and loan raise an asset and a liability together.',
        'Owner\'s personal use of cash reduces cash and capital.',
      ],
      v: vEq,
      n: `Tara Stationers starts with ${rupees(150000)} in cash as capital. Buying furniture only swaps cash for furniture. Goods on credit and a bank loan raise an asset and a liability together. Paying a creditor lowers cash and creditors. When the owner takes cash for personal use, cash and capital fall. At the end, assets of ${rupees(EQ_ASSETS)} equal outside liabilities plus capital of ${rupees(EQF.capital)}.`,
    }),
    sl('check', 'Quick check: going concern', {
      b: 'A firm has decided to close at the end of the month.',
      chk: 'tf_going',
      n: 'Think about what the going concern concept assumes. If a firm has already decided to close down, is that assumption still true, and what should the machinery be valued at?',
    }),
    sl('concept', 'Revenue recognition and matching', {
      v: vRevMatch,
      n: 'Revenue recognition says revenue belongs to the period in which it is earned, that is when the sale is made, whether or not cash has come in. The matching concept then sets the expenses of the period against that revenue. Insurance paid for twelve months is charged only for the months used in the year, and the rest is carried forward as a prepaid expense.',
    }),
    sl('example', 'Worked example 3: profit of a month by matching', {
      b: '**Anjali Tailors**, an imagined shop, October 2026. Sales on cash and credit are revenue; expenses are those of October only.',
      bl: [
        `Cost of goods sold = opening stock + purchases − closing stock = ${rs(MT.cogs)}.`,
        `Rent paid of ${rs(MT.rentPaid)} covers two months, so ${rs(MT.rent)} is charged and ${rs(MT.prepaid)} carried forward.`,
      ],
      v: vMT,
      n: `Anjali Tailors earned sales of ${rupees(MT.sales)} in October. The cost of goods sold is opening stock plus purchases less closing stock, which is ${rupees(MT.cogs)}. Salaries of the month are ${rupees(MT.sal)}, including the part still due. Rent paid covers two months, so only ${rupees(MT.rent)} is charged. With electricity, the profit of the month is ${rupees(MT.profit)}.`,
    }),
    sl('check', 'Quick check: profit by matching', {
      b: 'Find the profit by charging only the expenses that belong to the month.',
      chk: 'n_matching_np',
      n: 'Work in three steps. First find the cost of goods sold, then the salary and rent that belong to the month alone, and finally subtract all the expenses from the sales.',
    }),
    sl('concept', 'Full disclosure and consistency', {
      v: vDisCon,
      n: 'Full disclosure asks that every fact that could influence the decisions of users be shown, in the statements or in notes, such as a pending court claim. Consistency asks that the same accounting methods be followed from period to period, so that the results of different years can be compared. A method may be changed for a good reason, but the change and its effect must be disclosed.',
    }),
    sl('concept', 'Conservatism and materiality', {
      v: vConMat,
      n: 'Conservatism, also called prudence, asks the accountant to provide for all possible losses but not to anticipate any profit. That is why closing stock is valued at the lower of cost and net realisable value. Materiality says that only items large enough to influence decisions need separate treatment, so a very small item such as a sharpener may be treated as an expense at once.',
    }),
    sl('example', 'Worked example 4: stock at the lower of cost and net realisable value', {
      b: '**Sagar Electricals**, an imagined shop, values each item of closing stock at the lower of cost and net realisable value.',
      bl: [
        'Fans and air coolers stay at cost: the expected gain is not recorded.',
        `Heaters and irons are written down to net realisable value: the loss of ${rs(LC.writeDown)} is provided for.`,
      ],
      v: vLC,
      n: `Sagar Electricals compares cost with net realisable value for each item. Fans and air coolers could fetch more than they cost, but the gain is not recorded, so they stay at cost. Heaters and irons would fetch less, so they are written down. Stock at cost is ${rupees(LC.costT)}, and the value taken is ${rupees(LC.total)}, a write down of ${rupees(LC.writeDown)}.`,
    }),
    sl('check', 'Quick check: valuing stock', {
      b: 'Fill in the blanks about closing stock and caution.',
      chk: 'fb_conserv',
      n: 'Recall the rule for valuing closing stock. It compares two values and takes the lower one. Which two values, and which concept explains why we take the lower?',
    }),
    sl('diagram', 'Which concept applies?', {
      v: vWhich,
      n: 'Here are six situations and the concept behind each. A household bill from the till is business entity. Insurance charged only for months used is matching. Stock valued below cost is conservatism. The same depreciation method every year is consistency. A tiny item expensed at once is materiality. A purchase entered only after the invoice is objectivity.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**GAAP** make accounts uniform and comparable.',
        'Concepts: business entity, money measurement, going concern, accounting period, cost, dual aspect, revenue recognition, matching, objectivity.',
        'Conventions: full disclosure, consistency, conservatism, materiality.',
      ],
      v: vSum1,
      n: 'To sum up. Generally accepted accounting principles make accounts uniform and comparable. Some concepts say what is recorded, such as the entity, money, the going concern, the period and cost. Others say how it is recorded, through dual aspect, revenue recognition and matching. The conventions of full disclosure, consistency, conservatism and materiality guide how the results are reported.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define the concept in one line, then give a small imagined example.',
        'In stock questions, compare cost and net realisable value for every item.',
        'Remember: matching charges only the months used; the rest is carried forward.',
      ],
      v: vTips1,
      n: 'In the examination, define each concept in one line and add a small example. For stock questions, compare cost with net realisable value for every item, and show your working. In matching questions, charge only the months that belong to the period and carry the rest forward as prepaid. Always name the concept in your answer.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Theory Base of Accounting — Part 2: Bases of Accounting, Standards and GST',
  goals: [
    'Distinguish the cash basis from the accrual basis and compute profit under both',
    'Explain the meaning, need and benefits of accounting standards, and say who issues them in India and what Ind AS are',
    'Describe goods and services tax: CGST, SGST, IGST, input tax credit and GSTIN, and compute with an imagined rate',
  ],
  slides: [
    sl('title', 'Bases of accounting, standards and GST', {
      b: 'Part 2: **cash and accrual** bases, **accounting standards** and **goods and services tax**.',
      v: vCompare,
      n: 'In this part we ask three questions. When should a transaction be recorded, when the cash moves or when the revenue is earned? Why do accountants follow written standards, and who issues them in India? And how does goods and services tax work, with its central, state and integrated parts and its input tax credit? All figures belong to imagined businesses.',
    }),
    sl('concept', 'Two bases of accounting', {
      v: vBases,
      n: 'There are two bases of accounting. On the cash basis, revenue is recorded when cash is received and an expense when cash is paid. On the accrual basis, revenue is recorded when it is earned and an expense when it is incurred, whether or not cash has moved. Most businesses use the accrual basis, because it matches expenses to revenue.',
    }),
    sl('concept', 'The same event, two treatments', {
      v: vCashEvents,
      n: 'Look at three events. Fees for November received in October count as October revenue on the cash basis, but November revenue on the accrual basis. Rent for March paid in April is an April expense on the cash basis, but a March expense on the accrual basis. A credit sale in June paid for in July is June revenue on the accrual basis.',
    }),
    sl('check', 'Quick check: rent paid late', {
      b: 'Rent for one month is paid in the next month.',
      chk: 'm_cash_basis',
      n: 'The cash basis follows the movement of cash. Think about the month in which the rent is actually paid, and compare it with the month to which the rent belongs.',
    }),
    sl('example', 'Worked example 1: profit under both bases', {
      b: '**Meghna Coaching Classes**, an imagined tuition centre, October 2026.',
      bl: [
        `Cash received ${rs(CA.recd)}, of which ${rs(CA.advance)} is advance for November and ${rs(CA.arrears)} is arrears of September.`,
        `Fees of ${rs(CA.due)} earned in October are still due.`,
        `Rent ${rs(CA.rentPaid)} was paid for ${CA.rentMonths} months; salary paid ${rs(CA.salPaid)} includes ${rs(CA.salPrior)} of September, and ${rs(CA.salDue)} is due.`,
      ],
      v: vCA,
      n: `On the cash basis the centre received ${rupees(CA.cashIn)} and paid ${rupees(CA.cashOut)}, so the profit is ${rupees(CA.cashProfit)}. On the accrual basis, revenue earned in October is ${rupees(CA.rev)} and expenses incurred are ${rupees(CA.exp)}, so the profit is ${rupees(CA.profit)}. The same month shows two profits, and the accrual figure is the true result of October.`,
    }),
    sl('example', 'Worked example 2: where the difference comes from', {
      b: 'Adjust cash received and cash paid for advances, arrears, prepaid and outstanding items.',
      bl: [
        'Revenue: remove the advance and the arrears, add the fees still due.',
        'Expenses: spread the rent over its months and correct the salary for earlier and unpaid amounts.',
      ],
      v: vCAadj,
      n: `Start with cash received of ${rupees(CA.recd)}. Remove the advance for November and the arrears of September, then add the fees still due, and October revenue is ${rupees(CA.rev)}. For expenses, rent paid for three months gives ${rupees(CA.rent)} for October. Salary is corrected to ${rupees(CA.sal)}. With electricity, expenses of October are ${rupees(CA.exp)}.`,
    }),
    sl('check', 'Quick check: accrual profit', {
      b: 'Adjust the figures for advance, amounts due, prepaid and outstanding expenses.',
      chk: 'n_accrual_profit',
      n: 'First adjust the fees received for the advance and the fees still due. Then adjust the expenses paid for the prepaid part and the outstanding part. Subtract to find the profit of the month.',
    }),
    sl('concept', 'Accounting standards: meaning and need', {
      v: vStdNeed,
      n: 'Accounting standards are written statements of uniform accounting rules and policies for treating and disclosing items in financial statements. They are needed for three reasons. They make statements comparable across firms and years. They make figures more reliable by limiting personal judgement. And they reduce the number of alternative methods, so there is less room to present figures in a favourable way.',
    }),
    sl('concept', 'Who issues standards in India', {
      b: 'The Institute of Chartered Accountants of India issues accounting standards through its Accounting Standards Board.',
      v: vIssue,
      n: 'In India, accounting standards are issued by the Institute of Chartered Accountants of India, through its Accounting Standards Board, which was set up in nineteen seventy seven. The Board drafts the standards and the Institute issues them, and firms and auditors then follow them. This is a dated note, as of the year two thousand twenty four.',
    }),
    sl('concept', 'Ind AS and the benefits of standards', {
      v: vIndAs,
      n: 'Indian Accounting Standards are standards converged with International Financial Reporting Standards. As of two thousand twenty four, they were notified by the government in two thousand fifteen and became applicable from the two thousand sixteen financial year to specified companies, depending on conditions such as size. Standards bring uniform practice, trusted figures, easier audits and fair comparison for investors and lenders.',
    }),
    sl('check', 'Quick check: who issues standards?', {
      b: 'Choose the body that issues accounting standards in India.',
      chk: 'm_icai',
      n: 'Recall the professional body of chartered accountants in India and the board it has set up to prepare accounting standards. Then compare the options.',
    }),
    sl('concept', 'Goods and services tax: what it is', {
      b: 'As of 2024, GST is an indirect tax on the supply of goods and services, introduced on **1 July 2017**.',
      v: vGstFeat,
      n: 'Goods and services tax is an indirect tax on the supply of goods and services. As of two thousand twenty four, it has been in force since the first of July two thousand seventeen. It is destination based, so the tax goes to the place of consumption. It has a dual structure, and it allows input tax credit, so that tax falls only on the value added at each stage.',
    }),
    sl('diagram', 'Structure of GST: CGST, SGST and IGST', {
      v: vGstTree,
      n: 'Within one state, a supply carries two taxes of equal size. The central goods and services tax goes to the Centre and the state goods and services tax goes to the state. In a Union Territory, the second tax is called the Union Territory goods and services tax. For a supply from one state to another, a single integrated goods and services tax is charged, collected by the Centre and shared with the destination state.',
    }),
    sl('check', 'Quick check: which tax?', {
      b: 'A firm in one state sells to a trader in another state.',
      chk: 'm_igst',
      n: 'Decide first whether the supply is within one state or between two states. Then recall which tax, or which pair of taxes, is charged in that case.',
    }),
    sl('concept', 'GSTIN and registration', {
      v: vGstin,
      n: 'A registered taxpayer receives a goods and services tax identification number. As of two thousand twenty four it has fifteen characters, beginning with a two digit state code, followed by the taxpayer\'s permanent account number, an entity number and a check character. The number appears on tax invoices and is used to file returns and to claim input tax credit.',
    }),
    sl('example', 'Worked example 3: tax on a purchase and a sale', {
      b: `**Dev Hardware**, an imagined firm in Jaipur. Goods and services tax at an **imagined rate of ${GS.rate}%**.`,
      bl: [
        `Within Rajasthan the tax is split equally: on the sale, ${rs(GS.out.tax)} = CGST ${rs(GS.out.cgst)} + SGST ${rs(GS.out.sgst)}.`,
        `On the sale to Surat the whole tax of ${rs(GS.inter.igst)} is IGST.`,
      ],
      v: vIntra,
      n: `Dev Hardware buys goods worth ${rupees(GS.buy)} and pays tax of ${rupees(GS.in.tax)}, at an imagined rate of twelve per cent, split equally into central and state tax. It sells goods worth ${rupees(GS.sell)} and collects ${rupees(GS.out.tax)}. A sale of ${rupees(GS.interSell)} to a trader in Surat carries only integrated tax, which is ${rupees(GS.inter.igst)}.`,
    }),
    sl('diagram', 'Input tax credit: the flow', {
      v: vItcFlow,
      n: `The supplier charges Dev Hardware tax of ${rupees(GS.in.tax)}. Dev Hardware sells to a customer and collects tax of ${rupees(GS.out.tax)}. It does not send all of it to the government. It sets off the input tax already paid, and deposits only the difference, which is ${rupees(GS.net)}. In this way each seller pays tax only on the value it adds.`,
    }),
    sl('example', 'Worked example 4: setting off the credit', {
      b: 'Credit of each tax is set against the output tax of the same kind.',
      bl: [
        `CGST: ${rs(GS.out.cgst)} − ${rs(GS.in.cgst)} = ${rs(GS.cgstPay)}.`,
        `SGST: ${rs(GS.out.sgst)} − ${rs(GS.in.sgst)} = ${rs(GS.sgstPay)}.`,
      ],
      v: vSetOff,
      n: `Output tax is ${rupees(GS.out.tax)}, made of ${rupees(GS.out.cgst)} central and ${rupees(GS.out.sgst)} state. Input credit is ${rupees(GS.in.tax)}, made of ${rupees(GS.in.cgst)} central and ${rupees(GS.in.sgst)} state. Central tax payable is ${rupees(GS.cgstPay)} and state tax payable is ${rupees(GS.sgstPay)}, so the firm deposits ${rupees(GS.net)} in all.`,
    }),
    sl('check', 'Quick check: tax payable', {
      b: 'Use input tax credit to find the tax payable for a month.',
      chk: 'n_itc_net',
      n: 'Find the tax on the sales and the tax on the purchases at the rate given. Each is split into two equal parts, but you only need the totals. Then subtract the input tax from the output tax.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Cash basis: record when cash moves. Accrual basis: record when earned or incurred.',
        'Accounting standards: written uniform rules for comparability, reliability and fewer alternatives.',
        'GST: destination-based; CGST and SGST within a state, IGST between states; input tax credit; GSTIN.',
      ],
      v: vSum2,
      n: 'To sum up. The cash basis records when cash moves, and the accrual basis records when revenue is earned and expenses are incurred. Accounting standards are written uniform rules, issued in India by the Institute of Chartered Accountants of India. Goods and services tax is a destination based tax with central and state parts within a state, an integrated part between states, input tax credit, and an identification number.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Adjust cash figures for advance, arrears, prepaid and outstanding items.',
        'Split intra-state tax equally; use IGST for inter-state supplies.',
        'State GST dates and rules as of 2024, and use only the rate given in the problem.',
      ],
      v: vTips2,
      n: 'In the examination, convert cash figures to accrual by adjusting for advances, arrears, prepaid and outstanding amounts, and show each adjustment. In tax questions, use only the rate given in the problem. Split a within state tax equally into central and state parts, and charge integrated tax for a supply between states. Mention that rules are as of the stated year.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Theory Base of Accounting — Notes',
  sections: [
    {
      h: '1. GAAP and the web of concepts',
      t: 1,
      b: '**GAAP** (generally accepted accounting principles) are the rules, concepts and conventions that accountants follow in recording transactions and preparing financial statements. Their purpose is **uniformity**: statements of different firms and different years can be compared and relied on.\n\n**Concepts** are the basic assumptions on which accounting rests. **Conventions** are customs and guidelines that have become accepted. The diagram groups thirteen ideas into what is recorded, how it is recorded and how it is reported.',
      terms: [
        ['GAAP', 'The rules, concepts and conventions followed in recording transactions and preparing statements so that accounts are uniform and comparable.'],
        ['Accounting concept', 'A basic assumption on which the recording of transactions and the preparation of statements rest.'],
        ['Accounting convention', 'An accepted custom or guideline that shapes how accounts are prepared and reported.'],
      ],
      v: vWeb,
    },
    {
      h: '2. The firm, its money and its time',
      t: 1,
      b: '**Business entity:** the business is a unit separate from its owner; the owner\'s personal payments are **drawings**.\n\n**Money measurement:** only events that can be expressed in money are recorded.\n\n**Going concern:** the firm is assumed to continue for the foreseeable future, so assets are written off over their lives, not valued at forced-sale prices.\n\n**Accounting period:** profit and position are found at regular intervals, usually twelve months.\n\n**Cost (historical cost):** an asset is recorded at the price actually paid; later market changes are not recorded. **Objectivity:** entries rest on verifiable evidence such as bills and vouchers.',
      terms: [
        ['Business entity', 'The concept that the business is separate from its owner.'],
        ['Money measurement', 'The concept that only events measurable in money are recorded.'],
        ['Going concern', 'The assumption that the firm will continue for the foreseeable future.'],
        ['Historical cost', 'The price actually paid to acquire an asset, at which it is recorded.'],
      ],
      v: vHC,
    },
    {
      h: '3. Dual aspect, revenue recognition and matching',
      t: 1,
      b: '**Dual aspect:** every transaction has two aspects of equal value; hence **Assets = Liabilities + Capital** holds after every transaction. It is the basis of double entry.\n\n**Revenue recognition (realisation):** revenue is recognised when it is earned, that is when the sale is made, not when cash is received. Advance received is a liability until the goods are delivered.\n\n**Matching:** the expenses of a period are set against the revenue of the same period. Outstanding expenses are added; prepaid expenses are carried forward.',
      terms: [
        ['Dual aspect', 'Every transaction affects two items by equal amounts.'],
        ['Accounting equation', 'Assets = Liabilities + Capital.'],
        ['Matching concept', 'Expenses of a period are charged against the revenue of the same period.'],
        ['Prepaid expense', 'An amount paid in advance, belonging to a later period; an asset at the period end.'],
      ],
      v: vEq,
      vs: [vMT],
    },
    {
      h: '4. Conventions: disclosure, consistency, conservatism, materiality',
      t: 1,
      b: '**Full disclosure:** all facts that could influence users are shown in the statements or notes.\n\n**Consistency:** the same methods are followed from period to period; a change needs a reason and disclosure.\n\n**Conservatism (prudence):** provide for all possible losses; do not anticipate profits. Closing stock is valued at the **lower of cost and net realisable value**.\n\n**Materiality:** items large enough to influence decisions are shown separately; trivial items may be treated simply.',
      terms: [
        ['Net realisable value', 'The estimated selling price less the cost of completing and selling the goods.'],
        ['Conservatism', 'Provide for all possible losses and do not anticipate any profit.'],
        ['Materiality', 'The idea that only items significant enough to affect decisions need separate treatment.'],
      ],
      v: vLC,
      vs: [vWhich],
    },
    {
      h: '5. Bases of accounting and accounting standards',
      t: 2,
      b: '**Cash basis:** revenue is recorded when cash is received and expenses when cash is paid. **Accrual basis:** revenue is recorded when earned and expenses when incurred; advances, arrears, prepaid and outstanding items are adjusted.\n\n**Accounting standards** are written statements of uniform accounting rules and policies. **Need:** comparability, reliability, fewer alternative methods. **Benefits:** uniform practice, trusted figures, easier audit, fair comparison.\n\n**Dated note (as of 2024):** in India standards are issued by the Institute of Chartered Accountants of India through its Accounting Standards Board (set up in 1977). **Indian Accounting Standards (Ind AS)** are converged with International Financial Reporting Standards; notified by the government in 2015 and applicable from the 2016 financial year to specified companies.',
      terms: [
        ['Cash basis', 'Revenue and expenses are recorded when cash is received or paid.'],
        ['Accrual basis', 'Revenue is recorded when earned and expenses when incurred, whether or not cash has moved.'],
        ['Accounting standards', 'Written statements of uniform accounting rules and policies for treating and disclosing items.'],
        ['Ind AS', 'Indian Accounting Standards, converged with International Financial Reporting Standards.'],
      ],
      v: vCompare,
      vs: [vCA],
    },
    {
      h: '6. Goods and services tax (GST)',
      t: 2,
      b: '**As of 2024.** GST is an **indirect tax** on the supply of goods and services, **destination-based** (the tax accrues to the place of consumption), introduced on **1 July 2017**.\n\n**Dual structure:** on an intra-state supply, **CGST** (Centre) and **SGST** (state; **UTGST** in Union Territories) in equal parts; on an inter-state supply, **IGST**, collected by the Centre and shared with the destination state.\n\n**Input tax credit:** tax paid on purchases is set off against tax payable on sales; tax falls only on value added. **GSTIN:** the 15-character identification number of a registered taxpayer. Rates are not fixed in these notes; every problem states an imagined rate.',
      terms: [
        ['GST', 'An indirect, destination-based tax on the supply of goods and services.'],
        ['Input tax credit', 'Set-off of tax paid on purchases against tax payable on sales.'],
        ['GSTIN', 'Goods and services tax identification number of a registered taxpayer.'],
        ['IGST', 'Integrated goods and services tax, charged on an inter-state supply.'],
      ],
      v: vGstTree,
      vs: [vItcFlow, vSetOff],
    },
  ],
  tips: '- Name the concept **and** say why it applies; a label alone earns little.\n- Stock: compare cost with net realisable value item by item and show the working.\n- Matching: charge only the months of the period; carry the rest forward.\n- Accrual profit: adjust revenue for advance, arrears and amounts due; adjust expenses for prepaid and outstanding items.\n- GST: use the rate given in the problem; split intra-state tax equally into CGST and SGST; IGST for inter-state supplies; credit of each tax against the same tax.',
});

// ================================================================ flashcards
const F = cards([
  ['**GAAP**: what are they?', 'The rules, concepts and conventions followed in recording transactions and preparing statements, so that accounts are uniform and comparable.', 'definition', 1],
  ['Concept versus convention', 'A concept is a basic assumption; a convention is an accepted custom or guideline.', 'concept', 1],
  ['**Business entity** concept', 'The business is separate from its owner; personal payments are drawings.', 'definition', 1],
  ['**Money measurement** concept', 'Only events expressible in money are recorded.', 'definition', 1],
  ['**Going concern** concept', 'The firm is assumed to continue for the foreseeable future.', 'definition', 1],
  ['**Accounting period** concept', 'Profit and position are found at regular intervals, usually twelve months.', 'definition', 1],
  ['**Cost** concept (historical cost)', 'An asset is recorded at the price actually paid; market changes are not recorded.', 'definition', 1],
  ['Why record land at cost?', 'Cost is objective and verifiable, and keeps accounts comparable and free from bias.', 'concept', 1],
  ['**Dual aspect** concept', 'Every transaction affects two items by equal amounts, so Assets = Liabilities + Capital.', 'definition', 1],
  ['Effect of a credit purchase of goods', 'An asset (stock) and a liability (creditors) both increase by the same amount.', 'fact', 1],
  ['**Revenue recognition** (realisation)', 'Revenue is recognised when it is earned, that is when the sale is made, not when cash is received.', 'definition', 1],
  ['Advance received from a customer', 'A liability until the goods or services are delivered.', 'fact', 1],
  ['**Matching** concept', 'The expenses of a period are set against the revenue of the same period.', 'definition', 1],
  ['**Full disclosure**', 'All facts that could influence users are shown in the statements or notes.', 'definition', 1],
  ['**Consistency**', 'The same methods are followed from period to period; a change needs a reason and disclosure.', 'definition', 1],
  ['**Conservatism** (prudence)', 'Provide for all possible losses; do not anticipate profits.', 'definition', 1],
  ['Valuing closing stock', 'At the lower of cost and net realisable value, item by item in these problems.', 'exam-tip', 1],
  ['**Materiality**', 'Items large enough to influence decisions are shown separately; trivial items are treated simply.', 'definition', 1],
  ['**Objectivity**', 'Entries are supported by verifiable evidence such as invoices and vouchers.', 'definition', 1],
  ['**Cash basis**', 'Revenue is recorded when cash is received and expenses when cash is paid.', 'definition', 2],
  ['**Accrual basis**', 'Revenue is recorded when earned and expenses when incurred, whether or not cash moves.', 'definition', 2],
  ['From cash profit to accrual profit', 'Revenue: less advance and arrears, plus amounts due. Expenses: less prepaid, plus outstanding.', 'exam-tip', 2],
  ['**Accounting standards**', 'Written statements of uniform accounting rules and policies for treating and disclosing items.', 'definition', 2],
  ['Need for accounting standards', 'Comparability, reliability, and fewer alternative methods.', 'concept', 2],
  ['Who issues accounting standards in India? (as of 2024)', 'The Institute of Chartered Accountants of India, through its Accounting Standards Board (set up in 1977).', 'fact', 2],
  ['**Ind AS** (as of 2024)', 'Indian Accounting Standards, converged with International Financial Reporting Standards; notified in 2015, applicable from the 2016 financial year to specified companies.', 'fact', 2],
  ['**GST** (as of 2024)', 'An indirect, destination-based tax on supply of goods and services; introduced on 1 July 2017.', 'definition', 2],
  ['Taxes on an intra-state supply', 'CGST to the Centre and SGST to the state (UTGST in a Union Territory), in equal parts.', 'fact', 2],
  ['Tax on an inter-state supply', 'IGST, collected by the Centre and shared with the destination state.', 'fact', 2],
  ['**Input tax credit**', 'Tax paid on purchases is set off against tax payable on sales; payable = output tax − input tax.', 'definition', 2],
  ['**GSTIN**', 'The 15-character identification number of a registered taxpayer.', 'fact', 2],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Theory Base of Accounting',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_gaap', 'm_cost', 'm_itc', 'ar_dual'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_dual', 's2_itc', 's3_matching_rent'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_concepts', 'l5_gst'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_kiran'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Theory Base of Accounting',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_money', 'm_revrec', 'm_matching', 'm_consist', 'm_conserv', 'm_material', 'm_gstin', 'm_as_need', 'ar_itc', 'ar_material'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_gaap', 's2_entity', { attempt: 1, keys: ['s2_cash_accr', 's2_standards_two'] }, 's3_consist_material', { attempt: 1, keys: ['s3_cost_judge', 's3_standards'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_conventions', { attempt: 1, keys: ['l5_cash_accrual', 'l5_standards'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_stock', 'cb_gst'] },
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
// 3. Tests: disjoint, and no deck-check item in either.
const checksUsed = new Set(['m_entity', 'tf_going', 'n_matching_np', 'fb_conserv', 'm_cash_basis', 'n_accrual_profit', 'm_icai', 'm_igst', 'n_itc_net']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void same; void sum;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-accountancy-ch02 (GAAP, basic accounting concepts and conventions; bases of accounting, accounting standards, Ind AS and GST)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed by src/figures.mjs and the shared acc.mjs and asserted: the accounting equation balances after every step, profit under both bases, lower-of-cost-and-net-realisable-value stock, CGST and SGST halves, input tax credit set-off; tables in decks and model answers are generated from the computed values',
    facts: 'GAAP, concepts and conventions as in standard textbooks; Accounting Standards Board of the Institute of Chartered Accountants of India (set up 1977); Ind AS converged with IFRS, notified 2015 and applicable from 2016 to specified companies (as of 2024); GST introduced 1 July 2017, destination-based, CGST/SGST/UTGST/IGST, input tax credit, 15-character GSTIN (as of 2024); no real GST rates stated',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
