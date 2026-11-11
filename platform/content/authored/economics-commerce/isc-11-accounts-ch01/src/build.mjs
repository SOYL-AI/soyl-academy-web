// Build ISC 11 Accounts ch01 Introduction to Accounting. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-11-accounts-ch01', 'economics-commerce');
await import('./questions.mjs');
const { rs, rupees, inr, sum, same } = await import('./acc.mjs');
const { TL, BE, RG, AM, PH, KG, NS, SH, CYCLE, tot } = await import('./figs.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG pictures
function box(s, cx, cy, w, h, label, o = {}) {
  s.rect(cx - w / 2, cy - h / 2, w, h, { color: o.color, sw: o.sw ?? 1.8, rx: o.rx ?? 8 });
  const lines = Array.isArray(label) ? label : [label];
  const gap = 17;
  lines.forEach((ln, i) => s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, ln, { size: o.size ?? 14, bold: o.bold, color: o.tcolor, muted: o.muted }));
}

const vCycle = (() => {
  const s = new Svg(760, 250);
  const st = [['1 Identify', 'and measure'], ['2 Record', 'in the journal'], ['3 Classify', 'in the ledger'], ['4 Summarise', 'trial balance, statements'], ['5 Analyse', 'and interpret'], ['6 Communicate', 'to the users']];
  const pos = st.map((_, i) => (i < 3 ? [125 + i * 255, 55] : [125 + (5 - i) * 255, 185]));
  pos.forEach(([x, y], i) => box(s, x, y, 200, 64, st[i], { color: i < 3 ? 'blue' : 'green' }));
  for (let i = 0; i < 2; i++) s.arrow(pos[i][0] + 100, 55, pos[i + 1][0] - 102, 55, { sw: 1.6 });
  s.arrow(pos[2][0], 87, pos[3][0], 153, { sw: 1.6 });
  for (let i = 3; i < 5; i++) s.arrow(pos[i][0] - 100, 185, pos[i + 1][0] + 102, 185, { sw: 1.6 });
  return s.visual('Six stages of the accounting cycle in order: identify and measure, record in the journal, classify in the ledger, summarise in the trial balance and statements, analyse and interpret, and communicate to the users', 'The accounting cycle.');
})();

const vAssetTree = (() => {
  const s = new Svg(780, 330);
  box(s, 390, 28, 140, 38, 'Assets', { color: 'blue', bold: true, sw: 2.2 });
  const kids = [[190, 'Fixed assets', 'blue'], [520, 'Current assets', 'green'], [700, 'Fictitious', 'red']];
  kids.forEach(([x, n, c]) => { box(s, x, 120, 140, 40, n, { color: c, bold: true }); s.line(390, 47, x, 100, { sw: 1.4, color: 'muted' }); });
  [[70, 'Tangible', 'land, plant'], [190, 'Intangible', 'patent, goodwill'], [310, 'Wasting', 'quarry, mine']].forEach(([x, n, ex]) => {
    box(s, x, 215, 108, 38, n, { color: 'blue', size: 13 });
    s.line(190, 140, x, 196, { sw: 1.4, color: 'muted' });
    s.text(x, 255, ex, { size: 12 });
  });
  box(s, 520, 215, 108, 38, 'Liquid', { color: 'green', size: 13 });
  s.line(520, 140, 520, 196, { sw: 1.4, color: 'muted' });
  s.text(520, 255, 'cash, bank', { size: 12 });
  s.text(520, 165, 'stock, debtors', { size: 12 });
  s.text(700, 148, 'expenses not', { size: 12 }); s.text(700, 164, 'yet written off', { size: 12 });
  s.text(390, 310, 'A wasting asset is also a fixed asset: it is used up as it is worked', { size: 13, muted: true });
  return s.visual('Classification tree of assets: fixed assets divide into tangible such as land and plant, intangible such as a patent or goodwill, and wasting such as a quarry or mine; current assets include stock and debtors, with liquid assets such as cash and bank; fictitious assets are expenses not yet written off', 'Kinds of assets.');
})();

const vLiabTree = (() => {
  const s = new Svg(780, 300);
  box(s, 390, 28, 160, 38, 'Liabilities', { color: 'red', bold: true, sw: 2.2 });
  box(s, 110, 120, 170, 40, 'Internal', { color: 'blue', bold: true });
  box(s, 390, 120, 170, 40, 'External', { color: 'red', bold: true });
  box(s, 670, 120, 170, 40, 'Contingent', { color: 'brown', bold: true });
  [110, 390, 670].forEach((x) => s.line(390, 47, x, 100, { sw: 1.4, color: 'muted' }));
  s.text(110, 156, 'owed to the owner:', { size: 12 }); s.text(110, 172, 'capital', { size: 12 });
  box(s, 290, 215, 150, 38, 'Current', { color: 'red', size: 13 });
  box(s, 490, 215, 150, 38, 'Long-term', { color: 'red', size: 13 });
  s.line(390, 140, 290, 196, { sw: 1.4, color: 'muted' });
  s.line(390, 140, 490, 196, { sw: 1.4, color: 'muted' });
  s.text(290, 252, 'due within a year', { size: 12 }); s.text(490, 252, 'due after a year', { size: 12 });
  s.text(670, 156, 'depends on a future event:', { size: 12 }); s.text(670, 172, 'noted, not recorded', { size: 12 });
  return s.visual('Classification tree of liabilities: internal liability owed to the owner as capital; external liabilities owed to outsiders, current when due within a year and long-term when due after a year; and contingent liabilities that depend on a future event and are noted but not recorded', 'Kinds of liabilities.');
})();

const vStockFlow = (() => {
  const s = new Svg(780, 250);
  const xs = [105, 305, 505, 690];
  const lab = [['Raw material', 'mustard seed'], ['Work in progress', 'seed in the crushers'], ['Finished goods', 'sealed oil tins'], ['Sold', 'to customers']];
  lab.forEach((l, i) => box(s, xs[i], 70, i === 3 ? 110 : 170, 62, l, { color: ['blue', 'brown', 'green', 'accent'][i] }));
  s.arrow(xs[0] + 86, 70, xs[1] - 88, 70, { sw: 1.6 });
  s.arrow(xs[1] + 86, 70, xs[2] - 88, 70, { sw: 1.6 });
  s.arrow(xs[2] + 86, 70, xs[3] - 57, 70, { sw: 1.6 });
  s.line(40, 140, 600, 140, { sw: 1.4, color: 'muted' });
  s.text(40, 165, 'Opening stock', { anchor: 'start', size: 13, bold: true }); s.text(40, 185, 'what the three kinds are worth at the start of the year', { anchor: 'start', size: 12 });
  s.text(40, 215, 'Closing stock', { anchor: 'start', size: 13, bold: true }); s.text(40, 235, 'what they are worth at the end, carried forward as next year\'s opening stock', { anchor: 'start', size: 12 });
  return s.visual('Flow of stock in a manufacturing firm from raw material to work in progress to finished goods to sale, with opening stock at the start of the year and closing stock at the end', 'Three kinds of stock.');
})();

const vUsersWeb = (() => {
  const s = new Svg(780, 340);
  s.text(110, 16, 'Inside the firm', { bold: true, size: 15, color: 'blue' });
  s.text(670, 16, 'Outside the firm', { bold: true, size: 15, color: 'green' });
  box(s, 390, 170, 170, 80, ['Accounts', 'of the firm'], { color: 'accent', bold: true, sw: 2.4 });
  ['Owners', 'Managers', 'Employees'].forEach((n, i) => { const y = 100 + i * 70; box(s, 110, y, 160, 44, n, { color: 'blue' }); s.line(190, y, 305, 170, { sw: 1.3, color: 'muted' }); });
  ['Lenders and banks', 'Investors', 'Suppliers on credit', 'Government and tax', 'Customers and public'].forEach((n, i) => { const y = 50 + i * 60; box(s, 670, y, 190, 40, n, { color: 'green' }); s.line(475, 170, 575, y, { sw: 1.3, color: 'muted' }); });
  return s.visual('Web of users around the accounts of a firm: owners, managers and employees inside the firm; lenders and banks, investors, suppliers on credit, government and tax authorities, and customers and the public outside it', 'Who reads the accounts.');
})();

// ---------------------------------------------------------------- tables, deck 1
const vHistFlow = flow('LR', ['Early records', 'Trade and credit', 'Double entry', 'Factories and companies', 'Standards and computers'], 'Five stages in the development of accounting: early records, growth of trade and credit, double entry, factories and companies, and standards and computers', 'From tallies to computers');
const vHistTable = table(
  ['Stage', 'What people needed', 'What developed'],
  [
    ['Early records', 'To remember stores, taxes and debts', 'Tallies, clay tablets, palm leaves and scribes\' lists'],
    ['Trade between towns', 'To track purchases, sales and credit', 'Merchants\' books, including the bahi-khata of Indian traders'],
    ['Double entry', 'To check that records agree', 'Each transaction recorded twice; described in print in the late fifteenth century'],
    ['Factories and companies', 'Cost facts and reports for owners far away', 'Cost records, yearly statements and audit'],
    ['Modern times', 'Speed and comparable reports', 'Accounting standards and computerised accounting'],
  ],
  'Table of five stages in the history of accounting with what people needed and what developed',
);
const vThreeTerms = table(
  ['Term', 'What it is', 'Example'],
  [
    ['Book-keeping', 'Recording and classifying transactions in the books', 'Entering each credit sale and sorting it under the customer\'s name'],
    ['Accounting', 'The process that summarises, analyses, interprets and communicates the records', 'Finding that profit fell and telling the owner why'],
    ['Accountancy', 'The body of principles, rules and techniques behind the work', 'The rule that every transaction has a two-fold effect'],
  ],
  'Table comparing book-keeping, accounting and accountancy by meaning and example',
);
const vSH = table(
  ['Activity at Sirsa Handloom Stores (imagined)', 'Stage'],
  SH.rows.map((r) => [r[0], r[1]]),
  'Worked example table matching six activities at Sirsa Handloom Stores to the stages of the accounting cycle',
  'Ask what each activity produces.',
);
const vEventTrans = table(
  ['Term', 'Meaning', 'Example'],
  [
    ['Event', 'Anything that happens in or around the business', 'A customer asks for a price list'],
    ['Transaction', 'An event that can be measured in money and changes the finances of the firm', `Selling goods for ${rs(5000)}`],
    ['Cash transaction', 'Money is paid or received at once', 'Paying the day\'s wages in cash'],
    ['Credit transaction', 'Value passes now and the payment follows later', 'Buying goods payable after a month'],
  ],
  'Table of event, transaction, cash transaction and credit transaction with meanings and examples',
);
const vNS = table(['Nagaon Silk Cocoons (imagined)', 'Kind', 'Reason'], NS.rows, 'Worked example table of six happenings at Nagaon Silk Cocoons, each classified as an event only, a cash transaction or a credit transaction with the reason');
const vVoucher = table(
  ['Transaction', 'Voucher that proves it'],
  [['Sale of goods for cash', 'Cash memo'], ['Purchase of goods on credit', 'Supplier\'s invoice or bill'], ['Receipt of money from a customer', 'Receipt'], ['Payment by cheque', 'Cheque counterfoil and the payee\'s receipt'], ['Goods returned by a customer', 'Credit note']],
  'Table of transactions and the voucher that is evidence of each',
);
const vCapDraw = table(
  ['Term', 'Meaning', 'Effect on the owner\'s claim'],
  [
    ['Capital', 'What the owner has put in, with profits left in the firm', 'It is the owner\'s claim; also called an internal liability'],
    ['Drawings', 'Cash or goods taken out for the owner\'s own use', 'Reduces capital; not an expense'],
  ],
  'Table of capital and drawings with meaning and effect on the owner\'s claim',
);
const vExpLoss = table(
  ['Point', 'Expense', 'Loss'],
  [
    ['Meaning', 'Cost incurred to earn revenue', 'Fall in capital with nothing received in return'],
    ['Nature', 'Regular and planned', 'Unusual or accidental'],
    ['Benefit', 'The firm gets service or use for it', 'No benefit comes back'],
    ['Example', 'Wages, rent, advertising', 'Goods stolen, goods spoiled by a flood'],
  ],
  'Table comparing expense and loss by meaning, nature, benefit and example',
);
const vRevInc = table(
  ['Point', 'Revenue', 'Income'],
  [
    ['Meaning', 'Earnings from the main activity of the firm', 'Revenue together with other earnings and gains'],
    ['Example', 'Sales of goods; fees for services', 'Sales, interest received, commission earned'],
    ['Width', 'Narrower term', 'Wider term'],
  ],
  'Table comparing revenue and income by meaning, example and width',
);
const vProfGain = table(
  ['Point', 'Profit', 'Gain'],
  [
    ['Source', 'Normal activity of the business', 'Incidental or occasional event'],
    ['Measure', 'Income less expenses of a period', 'Selling price of an asset above its book value'],
    ['Example', 'Surplus of a year\'s trading', 'Old machine sold above its book value'],
  ],
  'Table comparing profit and gain by source, measure and example',
);
const vRGprofit = table(
  ['Raichur Cotton Ginners for the year (imagined)', '₹'],
  [
    ['Sales less returns: revenue', inr(RG.revenue)],
    ...RG.otherIncome.map(([n, a]) => [`Add: ${n.toLowerCase()}`, inr(a)]),
    ['Total income', inr(RG.income)],
    ...RG.expenses.map(([n, a]) => [`Less: ${n.toLowerCase()}`, inr(a)]),
    ['Total expenses', inr(RG.expense)],
    ['Profit', inr(RG.profit)],
    ['Add: gain on an old ginning press', inr(RG.gain)],
    ['Less: loss by theft', inr(RG.theft)],
    ['Net profit', inr(RG.netProfit)],
  ],
  'Worked example table of the profit of Raichur Cotton Ginners from revenue and other income less expenses, then adjusted for a gain and a loss to a net profit',
  'Profit is income less expenses.',
);
const vRGcap = table(
  ['Capital of Raichur Cotton Ginners', '₹'],
  [['Opening capital', inr(RG.openCapital)], ['Add: capital introduced', inr(RG.addCapital)], ['Add: net profit', inr(RG.netProfit)], ['Less: drawings', inr(RG.drawings)], ['Closing capital', inr(RG.closeCapital)]],
  'Worked example table of capital of Raichur Cotton Ginners from opening capital plus capital introduced plus net profit less drawings to closing capital',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['History', 'Records, trade, double entry, factories and companies, standards and computers'],
    ['Three terms', 'Book-keeping records; accounting interprets and communicates; accountancy is the body of principles'],
    ['Accounting cycle', 'Identify, record, classify, summarise, analyse and interpret, communicate'],
    ['Basic terms', 'Event, transaction, voucher, capital, drawings'],
    ['Results', 'Expense, loss; revenue, income; profit, gain'],
  ],
  'Summary table of deck 1: history, three terms, accounting cycle, basic terms and results',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Accountancy is the work of writing the books', 'That is book-keeping; accountancy is the body of principles'],
    ['Drawings are an expense', 'Drawings reduce capital and are not an expense'],
    ['Every event is a transaction', 'Only events measurable in money that change the finances are transactions'],
    ['A loss is an expense', 'An expense earns revenue; a loss gives nothing in return'],
  ],
  'Table of common mistakes in deck 1 and what to write instead',
);

// ---------------------------------------------------------------- tables, deck 2
const vFixed = table(
  ['Fixed asset', 'Meaning', 'Examples'],
  [
    ['Tangible', 'Has physical form and is used over many years', 'Land, building, plant, furniture'],
    ['Intangible', 'No physical form but has value to the firm', 'Patent, trademark, copyright, goodwill'],
  ],
  'Table of tangible and intangible fixed assets with meaning and examples',
);
const vCurrent = table(
  ['Asset', 'Meaning', 'Examples'],
  [
    ['Current asset', 'Held for sale or likely to turn into cash within a year', 'Stock, debtors, cash, bank balance'],
    ['Liquid asset', 'Cash or what turns into cash almost at once without loss', 'Cash in hand, bank balance, marketable securities'],
  ],
  'Table of current assets and liquid assets with meaning and examples',
);
const vWastFict = table(
  ['Asset', 'Meaning', 'Examples'],
  [
    ['Wasting asset', 'A real asset used up as it is worked', 'Quarry, mine, oil well'],
    ['Fictitious asset', 'Not a real asset: an expense not yet written off, with no resale value', 'Preliminary expenses, deferred advertising'],
  ],
  'Table of wasting and fictitious assets with meaning and examples',
);
const vLiabKinds = table(
  ['Liability', 'Meaning', 'Examples'],
  [
    ['Internal', 'Owed to the owner', 'Capital'],
    ['External, current', 'Owed to outsiders, due within a year', 'Creditors, bills payable, outstanding expenses'],
    ['External, long-term', 'Owed to outsiders, due after a year', 'A bank loan repayable in six years'],
    ['Contingent', 'Payable only if an uncertain future event happens', 'A pending court claim; a guarantee given for another person'],
  ],
  'Table of internal, current, long-term and contingent liabilities with meaning and examples',
);
const vTL = table(
  ['Item at Tezu Lemon Squash Works (imagined)', '₹', 'Class'],
  TL.rows.map((r) => [r[0], inr(r[1]), r[3]]),
  'Worked example table classifying eleven items of Tezu Lemon Squash Works into kinds of asset and liability',
  `Assets ${rs(TL.assets)}, external liabilities ${rs(TL.ext)}, so capital ${rs(TL.capital)}.`,
);
const vBE = table(
  ['Bhuj Embroidery House (imagined)', 'Class', '₹'],
  [
    ...BE.assets.map((r) => [r[0], r[2], inr(r[1])]),
    ['**Total assets**', '', inr(BE.totalAssets)],
    ...BE.liab.map((r) => [r[0], r[2], inr(r[1])]),
    ['**Total external liabilities**', '', inr(BE.totalLiab)],
    ['**Capital: assets less liabilities**', '', inr(BE.capital)],
  ],
  'Worked example table of the assets and liabilities of Bhuj Embroidery House with totals and the capital as assets less external liabilities',
  'Capital is the balancing figure.',
);
const vTrade = table(
  ['Term', 'Meaning'],
  [
    ['Goods', 'What the firm buys to resell, or to make into what it sells'],
    ['Purchases', 'Goods bought during the period, for cash or on credit'],
    ['Sales', 'Goods sold during the period, for cash or on credit'],
    ['Trade debtor', 'A customer who owes the firm for goods bought on credit'],
    ['Trade creditor', 'A supplier to whom the firm owes money for goods bought on credit'],
  ],
  'Table of goods, purchases, sales, trade debtor and trade creditor with meanings',
);
const vKG = table(
  ['Happening at Kasganj Brass Bells (imagined)', 'Who it concerns', 'Effect'],
  [
    [`Bells sold on credit for ${rs(KG.soldCredit)}`, 'Gopal Temple Stores', 'Becomes a trade debtor'],
    [`Brass sheets bought on credit for ${rs(KG.boughtCredit)}`, 'Morena Metals', 'Becomes a trade creditor'],
    [`Weighing machine bought on credit for ${rs(KG.machineCredit)}`, 'Daya Scales', 'Creditor for an asset, not a trade creditor'],
    [`Bells sold for cash ${rs(KG.cashSale)}`, 'The buyer', 'No debtor arises'],
    [`${rs(KG.received)} received from Gopal Temple Stores`, 'Gopal Temple Stores', `Debtor falls to ${rs(KG.debtor)}`],
    [`${rs(KG.paid)} paid to Morena Metals`, 'Morena Metals', `Creditor falls to ${rs(KG.creditor)}`],
  ],
  'Worked example table of six happenings at Kasganj Brass Bells showing which create or reduce a trade debtor or trade creditor',
);
const vAM = table(
  ['Alwar Mustard Oil Mill (imagined)', 'Kind', 'Opening (₹)', 'Closing (₹)'],
  [...AM.rows.map((r) => [r[0], r[1], inr(r[2]), inr(r[3])]), ['**Total stock**', '', inr(AM.open), inr(AM.close)]],
  'Worked example table of the opening and closing stock of Alwar Mustard Oil Mill by kind: raw material, work in progress and finished goods',
  `Closing stock is ${rs(AM.close)}: next year it is the opening stock.`,
);
const vPH = table(
  ['Pathankot Hosiery for the year (imagined)', '₹'],
  [['Opening stock', inr(PH.open)], ['Add: purchases', inr(PH.purchases)], ['Less: purchases return', inr(PH.purchReturn)], ['Goods available for sale', inr(PH.available)], ['Less: cost of goods sold', inr(PH.cogs)], ['Closing stock', inr(PH.close)]],
  'Worked example table of closing stock of Pathankot Hosiery: opening stock plus net purchases less cost of goods sold',
);
const vNeeds = table(
  ['User', 'Inside or outside', 'What the user wants'],
  [
    ['Owners', 'Inside', 'Profit and the safety of the capital'],
    ['Managers', 'Inside', 'Detailed facts to plan, control and decide'],
    ['Employees', 'Inside', 'Ability to pay wages and bonus; job security'],
    ['Lenders and banks', 'Outside', 'Ability to pay interest and repay the loan'],
    ['Investors', 'Outside', 'Return on money put in, and the risk'],
    ['Suppliers on credit', 'Outside', 'Ability to pay for the goods bought'],
    ['Government and tax authorities', 'Outside', 'Profit on which tax is due; compliance with law'],
  ],
  'Table of seven users of accounting information, whether inside or outside the firm, with what each wants',
);
const vBranches = table(
  ['Point', 'Financial', 'Cost', 'Management'],
  [
    ['Purpose', 'Profit or loss and financial position of the whole firm', 'Cost of products, jobs and services', 'Planning, control and decisions'],
    ['Main users', 'Owners and outsiders', 'Managers', 'Managers'],
    ['Form', 'Accepted principles, standard statements', 'Detailed cost statements', 'Any form that helps the decision'],
    ['Time', 'Past period', 'Past, and for control now', 'Past and future'],
  ],
  'Table comparing financial, cost and management accounting by purpose, main users, form and time',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Assets', 'Fixed (tangible, intangible, wasting), current (liquid), fictitious'],
    ['Liabilities', 'Internal; external (current, long-term); contingent is only noted'],
    ['Capital', 'Assets less external liabilities'],
    ['Trade terms', 'Debtors, creditors, purchases, sales, goods'],
    ['Stock', 'Raw material, work in progress, finished goods; closing becomes opening'],
    ['Users and branches', 'Internal and external users; financial, cost, management accounting'],
  ],
  'Summary table of deck 2: assets, liabilities, capital, trade terms, stock, users and branches',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Deducting a contingent liability to find capital', 'It is not an actual liability, so it is only noted'],
    ['Calling a lathe supplier a trade creditor', 'A creditor for an asset is not a trade creditor'],
    ['Work in progress is finished goods', 'Partly made goods that are not yet ready for sale'],
    ['Listing fictitious assets as real', 'They are expenses not yet written off, with no resale value'],
  ],
  'Table of common mistakes in deck 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Introduction to Accounting, Part 1: History, the accounting cycle and basic terms',
  goals: [
    'Outline how accounting developed from early records to modern practice',
    'Distinguish book-keeping, accounting and accountancy, and order the stages of the accounting cycle',
    'Distinguish an event from a transaction, and explain voucher, capital and drawings',
    'Separate expense from loss, revenue from income, and profit from gain',
  ],
  slides: [
    sl('title', 'Where accounting begins', {
      b: 'Part 1: the **story** of accounting, its **cycle** and the **basic terms** used in every book.',
      v: flow('LR', ['History', 'Three terms', 'The cycle', 'Basic terms'], 'Route map of Part 1: history, three terms, the accounting cycle and basic terms', 'Part 1 at a glance'),
      n: 'Every shop, workshop and company has to know what it earns, what it owes and what it owns. Accounting gives the answers. In this part we see how it grew, how its work is organised and the basic words that every later chapter depends on.',
    }),
    sl('concept', 'A brief history of accounting', {
      v: vHistFlow,
      n: 'People kept records long before modern business. Early rulers and traders noted stores, taxes and debts on tablets, leaves and tallies. As trade grew, merchants developed double entry in the Italian trading cities. Factories and companies brought cost records and yearly statements, and today standards and computers shape the work.',
    }),
    sl('concept', 'What each stage needed', {
      v: vHistTable,
      n: 'Each step in the history met a new need. Early records helped people remember. Trade between towns needed books of purchases, sales and credit, such as the bahi khata of Indian traders. Double entry let a merchant check that his records agreed. Companies needed reports for owners far away. No exact dates are needed here.',
    }),
    sl('concept', 'Book-keeping, accounting and accountancy', {
      v: vThreeTerms,
      n: 'These three words are often mixed up. Book-keeping is the recording and classifying of transactions. Accounting is wider. It starts from those records, then summarises, analyses, interprets and communicates them. Accountancy is the body of principles and techniques, the theory, which guides the practice.',
    }),
    sl('diagram', 'The accounting cycle', {
      v: vCycle,
      n: 'The work of accounting follows six stages. A transaction is identified and measured in money. It is recorded in the journal, classified in the ledger, and summarised in the trial balance and statements. The figures are then analysed and interpreted, and finally communicated to the people who need them.',
    }),
    sl('check', 'Quick check: order the cycle', {
      b: 'Arrange the stages of the accounting cycle in the right order.',
      chk: 'ord_cycle',
      n: 'Begin with the stage where the transaction is first noticed and measured, and end with the stage where users receive the information.',
    }),
    sl('example', 'Worked example 1: which stage?', {
      b: 'Sirsa Handloom Stores is an imagined shop. Name the stage of the cycle that each activity belongs to.',
      v: vSH,
      n: 'Noticing a bulk order that can be written in money is identifying. Writing each bill in the day book is recording. Sorting entries into accounts is classifying. Preparing the trial balance and statements is summarising. Asking why wages grew faster than sales is analysing and interpreting. Sending statements to the bank is communicating.',
    }),
    sl('concept', 'Event and transaction', {
      v: vEventTrans,
      n: 'An event is anything that happens in or around the business. A transaction is an event that can be measured in money and changes the finances of the firm. A cash transaction is settled at once. In a credit transaction, value passes now and payment follows later.',
    }),
    sl('example', 'Worked example 2: event or transaction?', {
      b: 'Nagaon Silk Cocoons is an imagined firm. Classify each happening and give the reason.',
      v: vNS,
      n: 'A weaver asking a price has exchanged nothing, so it is an event only. Deciding to hire a supervisor involves no money yet, so it is also only an event. Buying cocoons payable in thirty days is a credit transaction. Selling yarn for cash, paying the electricity bill and taking an advance are cash transactions.',
    }),
    sl('check', 'Quick check: a transaction', {
      b: 'Which happening at an imagined kite shop is a business transaction?',
      chk: 'm_chk_trans',
      n: 'Look for an exchange of value that can be measured in money.',
    }),
    sl('concept', 'Voucher: the proof of a transaction', {
      v: vVoucher,
      n: 'Every entry in the books should rest on a voucher, which is documentary evidence of the transaction. A sale for cash has a cash memo. A credit purchase has the supplier\'s invoice. Money received has a receipt. A cheque payment has a counterfoil and the payee\'s receipt. A return of goods may have a credit note.',
    }),
    sl('concept', 'Capital and drawings', {
      v: vCapDraw,
      n: 'Capital is what the owner has put into the business, together with profits left in it. It is the owner\'s claim and is called an internal liability. Drawings are cash or goods the owner takes out for personal use. They reduce capital, and they are not an expense of the business.',
    }),
    sl('concept', 'Expense and loss', {
      v: vExpLoss,
      n: 'An expense is a cost incurred to earn revenue, and the firm gets service or use in return. Wages, rent and advertising are examples. A loss is a fall in capital for which nothing comes back, and it is usually unusual or accidental, such as goods stolen or spoiled by a flood.',
    }),
    sl('concept', 'Revenue and income', {
      v: vRevInc,
      n: 'Revenue means earnings from the main activity of the firm, such as the sale of goods or fees for services. Income is the wider term. It includes revenue and also other earnings such as interest received and commission earned, along with gains.',
    }),
    sl('concept', 'Profit and gain', {
      v: vProfGain,
      n: 'Profit is the surplus of income over expenses from the normal activity in a period. A gain comes from an incidental or occasional event, for example selling an old machine for more than its book value. The firm does not deal in machines, so this is not part of its trading revenue.',
    }),
    sl('check', 'Quick check: a gain', {
      b: 'Decide whether the statement about selling an old almirah above its book value is true or false.',
      chk: 'tf_gain',
      n: 'Ask whether the almirah is what the trader sells in the ordinary course of business.',
    }),
    sl('example', 'Worked example 3: profit of a firm', {
      b: 'Raichur Cotton Ginners is an imagined firm. Find the profit, then the net profit after a gain and a loss.',
      v: vRGprofit,
      n: `Revenue is net sales of ${rupees(RG.revenue)}. Adding interest and commission gives total income of ${rupees(RG.income)}. Expenses come to ${rupees(RG.expense)}, so profit is ${rupees(RG.profit)}. The gain of ${rupees(RG.gain)} on an old press is added and the loss of ${rupees(RG.theft)} by theft is deducted, giving net profit of ${rupees(RG.netProfit)}.`,
    }),
    sl('example', 'Worked example 4: capital of the firm', {
      b: 'Carry the net profit of Raichur Cotton Ginners into its capital account.',
      v: vRGcap,
      n: `Opening capital is ${rupees(RG.openCapital)}. The owner puts in ${rupees(RG.addCapital)} more, and the net profit of ${rupees(RG.netProfit)} is added. Drawings of ${rupees(RG.drawings)} are deducted. Closing capital is therefore ${rupees(RG.closeCapital)}.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'In short. Accounting grew from early records, through trade and double entry, to companies and computers. Book-keeping records, accounting interprets and communicates, and accountancy is the body of principles. The cycle has six stages. A transaction is an event measurable in money. Expense differs from loss, revenue from income, and profit from gain.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      v: vTips1,
      n: 'Do not call accountancy the work of writing the books. Never treat drawings as an expense. Remember that only events measurable in money are transactions. In a distinction question, write two points for each term and add an example. Keep the stages of the cycle in order.',
    }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Introduction to Accounting, Part 2: Assets, liabilities, trade terms, stock and users',
  goals: [
    'Classify assets and liabilities, including wasting, fictitious and contingent items',
    'Find capital as assets less external liabilities',
    'Use trade terms and distinguish the three kinds of stock, opening and closing stock',
    'State what each user needs, and compare financial, cost and management accounting',
  ],
  slides: [
    sl('title', 'What the business owns and owes', {
      b: 'Part 2: **assets**, **liabilities**, **trade terms**, **stock** and the **users** of accounts.',
      v: flow('LR', ['Assets', 'Liabilities', 'Trade terms and stock', 'Users and branches'], 'Route map of Part 2: assets, liabilities, trade terms and stock, and users and branches of accounting', 'Part 2 at a glance'),
      n: 'A balance sheet lists what a firm owns and what it owes. To read one, we need to know the kinds of asset and liability. We then meet the words traders use for goods and stock, and finish with the people who read accounts and the branches of accounting that serve them.',
    }),
    sl('diagram', 'Kinds of assets', {
      v: vAssetTree,
      n: 'An asset is a resource the firm owns from which it expects future benefit. Fixed assets are held for use over many years and may be tangible, intangible or wasting. Current assets, such as stock and debtors, turn into cash within a year. Liquid assets are cash and bank. Fictitious assets are expenses not yet written off.',
    }),
    sl('concept', 'Fixed assets', {
      v: vFixed,
      n: 'Tangible fixed assets can be seen and touched, such as land, buildings, plant and furniture. Intangible fixed assets have no physical form but have value to the firm, such as a patent, a trademark, a copyright or goodwill. Both are used over many years and not bought for resale.',
    }),
    sl('concept', 'Current and liquid assets', {
      v: vCurrent,
      n: 'A current asset is held for sale or likely to turn into cash within a year. Stock, debtors, cash and bank balances are examples. A liquid asset is one that is cash already, or turns into cash almost at once without loss, such as cash in hand, a bank balance or marketable securities.',
    }),
    sl('concept', 'Wasting and fictitious assets', {
      v: vWastFict,
      n: 'A wasting asset is a real asset that is used up as it is worked, such as a quarry, a mine or an oil well. A fictitious asset is not real at all. It is an expense, such as preliminary expenses, that has not yet been written off and has no resale value.',
    }),
    sl('diagram', 'Kinds of liabilities', {
      v: vLiabTree,
      n: 'A liability is an amount the business has to meet. Capital is owed to the owner and is an internal liability. Amounts owed to outsiders are external liabilities, current if due within a year and long-term if due later. A contingent liability depends on a future event and is only noted, not recorded.',
    }),
    sl('concept', 'Internal, external and contingent liabilities', {
      v: vLiabKinds,
      n: 'Creditors, bills payable and outstanding expenses are current liabilities. A bank loan repayable in six years is long-term. A pending court claim, or a guarantee given for another person, is contingent. The firm will pay only if the event happens, so there is no actual liability to record today.',
    }),
    sl('check', 'Quick check: an intangible asset', {
      b: 'Which of the following is an intangible fixed asset?',
      chk: 'm_chk_class',
      n: 'Choose the asset that has value but no physical form.',
    }),
    sl('example', 'Worked example 1: classify the items', {
      b: 'Tezu Lemon Squash Works is an imagined firm. Classify each item and find its capital.',
      v: vTL,
      n: `The land and the machine are tangible fixed assets and the trademark is intangible. Bottles ready for sale are current. Cash and the savings balance are liquid. The launch cost is fictitious. The loan, the lemon growers and the wages are external liabilities. The court claim is only contingent. Assets of ${rupees(TL.assets)} less liabilities of ${rupees(TL.ext)} leave capital of ${rupees(TL.capital)}.`,
    }),
    sl('example', 'Worked example 2: capital as a balancing figure', {
      b: 'Bhuj Embroidery House is an imagined firm. Find its capital.',
      v: vBE,
      n: `Add the eight assets, including the fictitious preliminary expenses, to reach ${rupees(BE.totalAssets)}. The loan, creditors and outstanding rent total ${rupees(BE.totalLiab)}. Capital is the difference, ${rupees(BE.capital)}. A contingent claim, if any, would not be deducted.`,
    }),
    sl('concept', 'Goods, purchases, sales and trade parties', {
      v: vTrade,
      n: 'Goods are what the firm buys to resell or to make into what it sells. Purchases are goods bought in the period, and sales are goods sold, each for cash or on credit. A trade debtor is a customer who owes the firm for goods sold on credit. A trade creditor is a supplier the firm owes for goods bought on credit.',
    }),
    sl('example', 'Worked example 3: debtors and creditors', {
      b: 'Kasganj Brass Bells is an imagined firm. Decide which happenings create or reduce a trade debtor or a trade creditor.',
      v: vKG,
      n: `Bells sold on credit make Gopal Temple Stores a debtor. Sheets bought on credit make Morena Metals a creditor. The weighing machine is an asset, so its seller is not a trade creditor. A cash sale creates no debtor. After receiving ${rupees(KG.received)}, the debtor balance is ${rupees(KG.debtor)}. After paying ${rupees(KG.paid)}, the creditor balance is ${rupees(KG.creditor)}.`,
    }),
    sl('diagram', 'Raw material, work in progress and finished goods', {
      v: vStockFlow,
      n: 'A manufacturing firm holds three kinds of stock. Raw material waits to enter production. Work in progress is partly made and not yet ready for sale. Finished goods are complete and ready to sell. Stock at the start of the year is opening stock, and stock at the end is closing stock, which becomes next year\'s opening stock.',
    }),
    sl('example', 'Worked example 4: stock of a mill', {
      b: 'Alwar Mustard Oil Mill is an imagined firm. Find its opening stock and closing stock.',
      v: vAM,
      n: `Raw material, work in progress and finished goods are added for each date. Opening stock is ${rupees(AM.open)} and closing stock is ${rupees(AM.close)}. Closing stock is higher by ${rupees(AM.change)}, even though finished goods fell, because raw material and work in progress rose.`,
    }),
    sl('example', 'Worked example 5: closing stock from a flow', {
      b: 'Pathankot Hosiery is an imagined firm. Find its closing stock from the flow of goods.',
      v: vPH,
      n: `Opening stock of ${rupees(PH.open)} plus purchases of ${rupees(PH.purchases)} less returns of ${rupees(PH.purchReturn)} gives goods available of ${rupees(PH.available)}. The cost of goods sold was ${rupees(PH.cogs)}. What is left, ${rupees(PH.close)}, is the closing stock.`,
    }),
    sl('check', 'Quick check: work in progress', {
      b: 'Decide whether the assertion and the reason about work in progress are true or false.',
      chk: 'ar_wip',
      n: 'Ask whether partly made goods are ready to be sold.',
    }),
    sl('diagram', 'Who uses accounting information', {
      v: vUsersWeb,
      n: 'Many people read the same accounts. Owners, managers and employees are inside the firm. Lenders and banks, investors, suppliers on credit, government and tax authorities, and customers and the public are outside it. Each reads the figures to answer a different question.',
    }),
    sl('concept', 'What each user wants', {
      v: vNeeds,
      n: 'Owners want profit and the safety of their capital. Managers want detailed facts to plan and control. Employees want wages, bonus and job security. A bank wants to be repaid with interest. Investors weigh return against risk. A supplier wants to be paid on time, and the tax authority wants the profit.',
    }),
    sl('check', 'Quick check: match the user', {
      b: 'Match each user of a milk cooperative\'s accounts with what the user wants.',
      chk: 'match_users',
      n: 'Ask what decision each user must make.',
    }),
    sl('concept', 'Financial, cost and management accounting', {
      v: vBranches,
      n: 'Financial accounting reports the profit and position of the whole firm, mainly to owners and outsiders, in standard form. Cost accounting finds the cost of products, jobs and services. Management accounting gives managers any information that helps planning, control and decisions, looking forward as well as back.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'In short. Assets are fixed, current or fictitious, and liabilities are internal, external or contingent. Capital is assets less external liabilities. Stock is raw material, work in progress or finished goods, and closing becomes opening. Users are inside or outside the firm, and three branches of accounting serve them.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      v: vTips2,
      n: 'Never deduct a contingent liability when finding capital. Remember that a creditor for a machine is not a trade creditor. Work in progress is not finished goods. When classifying, give the exact class and a reason. In user questions, name the user and what that user wants.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction to Accounting: Notes',
  sections: [
    {
      h: '1. History; book-keeping, accounting and accountancy',
      t: 1,
      b: 'Records of stores, taxes and debts were kept in ancient times on tallies, tablets and leaves. As trade between towns grew, merchants needed records of credit; in the Italian trading cities they developed **double entry**, described in print in the late fifteenth century, and Indian traders kept the bahi-khata. Factories and joint-stock companies later called for cost records, yearly statements and audit, and today **accounting standards** and **computerised accounting** guide the work.\n\n**Book-keeping** is recording and classifying; **accounting** goes on to summarise, analyse, interpret and communicate; **accountancy** is the body of principles that guides both.',
      terms: [
        ['Book-keeping', 'The work of recording transactions and sorting them under account heads.'],
        ['Accounting', 'The process that starts from the records and ends with reports and advice for users.'],
        ['Accountancy', 'The theory: the principles, rules and techniques on which accounting practice rests.'],
        ['Double entry', 'The system under which each transaction is recorded in two accounts.'],
      ],
      v: vHistFlow,
      vs: [vHistTable, vThreeTerms],
    },
    {
      h: '2. The accounting cycle',
      t: 1,
      b: 'The six stages in order are: **identifying and measuring** (a transaction that can be written in money, supported by a voucher), **recording** (journal), **classifying** (ledger accounts), **summarising** (trial balance and final statements), **analysing and interpreting** (comparing and explaining the figures) and **communicating** (reports to users).\n\nAsk what each activity produces: an entry, a group of entries, a statement, a judgement or a report.',
      terms: [
        ['Identifying', 'Noticing an event that is a transaction and measuring it in money.'],
        ['Classifying', 'Grouping entries of one kind under an account head.'],
        ['Summarising', 'Bringing balances together into the trial balance and statements.'],
      ],
      v: vCycle,
      vs: [vSH],
    },
    {
      h: '3. Events, transactions, vouchers, capital and drawings',
      t: 2,
      b: 'An **event** is anything that happens; a **transaction** is an event measurable in money that changes the finances of the firm. It may be a **cash** or a **credit** transaction. A **voucher** is the written proof: a cash memo, an invoice, a receipt.\n\n**Capital** is the owner\'s investment with profits left in the firm; **drawings** are cash or goods taken for personal use and reduce capital.\n\nClosing capital = opening capital + capital introduced + net profit − drawings. For Raichur Cotton Ginners (imagined): ' + rs(RG.openCapital) + ' + ' + rs(RG.addCapital) + ' + ' + rs(RG.netProfit) + ' − ' + rs(RG.drawings) + ' = ' + rs(RG.closeCapital) + '.',
      terms: [
        ['Event', 'Any happening in or around the business, measurable in money or not.'],
        ['Transaction', 'An event that can be measured in money and alters the firm\'s finances.'],
        ['Voucher', 'The paper that proves a transaction and supports its entry.'],
        ['Capital', 'What the owner has invested, with profits retained: the owner\'s claim.'],
        ['Drawings', 'Withdrawals of cash or goods by the owner for private use.'],
      ],
      v: vEventTrans,
      vs: [vNS, vVoucher, vCapDraw, vRGcap],
    },
    {
      h: '4. Expense, loss, revenue, income, profit and gain',
      t: 2,
      b: 'An **expense** is incurred to earn revenue; a **loss** is a fall in capital that returns nothing. **Revenue** comes from the main activity; **income** is wider and includes other earnings and gains. **Profit** is the surplus of income over expenses from normal activity; a **gain** arises from an incidental event, such as selling an old asset above its book value.\n\nProfit = income − expenses. Net profit after incidental items = profit + gains − losses. For Raichur Cotton Ginners (imagined): ' + rs(RG.income) + ' − ' + rs(RG.expense) + ' = ' + rs(RG.profit) + '; net profit ' + rs(RG.netProfit) + '.\n\n*Books differ slightly in how they split revenue and income; use the definitions given here and state both parts of a distinction.*',
      terms: [
        ['Expense', 'A cost incurred in earning revenue, for which the firm receives a benefit.'],
        ['Loss', 'A reduction in capital by accident or an unusual event, with nothing received.'],
        ['Revenue', 'Earnings from the main business activity, such as sales.'],
        ['Income', 'Revenue plus other earnings, such as interest and commission, and gains.'],
        ['Profit', 'The excess of income over expenses in an accounting period.'],
        ['Gain', 'An increase in capital from an occasional event outside the regular activity.'],
      ],
      v: vExpLoss,
      vs: [vRevInc, vProfGain, vRGprofit],
    },
    {
      h: '5. Assets',
      t: 3,
      b: 'An **asset** is a resource owned by the firm from which future benefit is expected.\n\n- **Fixed assets:** held for use over many years; **tangible** (land, plant) or **intangible** (patent, goodwill); a **wasting** asset (quarry, mine) is used up as it is worked.\n- **Current assets:** stock, debtors, cash and bank, held for sale or likely to become cash within a year; **liquid assets** are cash or what turns into cash at once (some books also count debtors and bills receivable).\n- **Fictitious assets:** expenses not yet written off, with no resale value, such as preliminary expenses.',
      terms: [
        ['Tangible asset', 'A fixed asset that has physical form.'],
        ['Intangible asset', 'A fixed asset with value but no physical form.'],
        ['Liquid asset', 'Cash or an asset that turns into cash almost immediately with no loss.'],
        ['Wasting asset', 'A real asset that diminishes as it is worked.'],
        ['Fictitious asset', 'An expense carried forward that is not a real asset.'],
      ],
      v: vAssetTree,
      vs: [vFixed, vCurrent, vWastFict],
    },
    {
      h: '6. Liabilities and the capital equation',
      t: 3,
      b: 'A **liability** is an amount the business has to meet. **Internal:** capital, owed to the owner. **External:** owed to outsiders, **current** (due within a year) or **long-term** (due later). A **contingent liability** depends on an uncertain future event, such as a pending claim, so it is noted and **not** recorded as an actual liability.\n\n**Capital = assets − external liabilities.** Tezu Lemon Squash Works (imagined): ' + rs(TL.assets) + ' − ' + rs(TL.ext) + ' = ' + rs(TL.capital) + '; the ' + rs(TL.contingent) + ' court claim is left out. Bhuj Embroidery House (imagined): ' + rs(BE.totalAssets) + ' − ' + rs(BE.totalLiab) + ' = ' + rs(BE.capital) + '.',
      terms: [
        ['Liability', 'An amount which the business is bound to pay.'],
        ['Current liability', 'An external liability due within one year, such as creditors.'],
        ['Long-term liability', 'An external liability due after one year, such as a long loan.'],
        ['Contingent liability', 'A possible obligation that arises only if a future event occurs.'],
      ],
      v: vLiabTree,
      vs: [vLiabKinds, vTL, vBE],
    },
    {
      h: '7. Trade terms and stock',
      t: 4,
      b: '**Goods** are what the firm buys to resell or to make into what it sells; **purchases** and **sales** may each be for cash or on credit. A **trade debtor** owes the firm for goods sold on credit; a **trade creditor** is owed for goods bought on credit. A supplier of a machine on credit is a creditor for an asset, not a trade creditor.\n\nA manufacturer holds **raw material**, **work in progress** (partly made) and **finished goods**. **Opening stock** is the stock at the start of a period; **closing stock** is the stock at the end, carried forward as the next opening stock.\n\nClosing stock = opening stock + net purchases − cost of goods sold. Pathankot Hosiery (imagined): ' + rs(PH.open) + ' + ' + rs(PH.netPurchases) + ' − ' + rs(PH.cogs) + ' = ' + rs(PH.close) + '.',
      terms: [
        ['Trade debtor', 'A customer who has bought goods on credit and still owes for them.'],
        ['Trade creditor', 'A supplier who has sold goods on credit and is still to be paid.'],
        ['Raw material', 'Stock waiting to enter the process of making goods.'],
        ['Work in progress', 'Stock that is partly made and not yet ready for sale.'],
        ['Finished goods', 'Complete goods that are ready for sale.'],
        ['Closing stock', 'The stock at the end of a period; it is the next period\'s opening stock.'],
      ],
      v: vStockFlow,
      vs: [vTrade, vKG, vAM, vPH],
    },
    {
      h: '8. Users of accounting information; financial, cost and management accounting',
      t: 5,
      b: '**Internal users:** owners (profit, safety of capital), managers (detailed facts to plan and control), employees (wages, bonus, job security). **External users:** lenders and banks (ability to repay), investors (return and risk), suppliers on credit (ability to pay), government and tax authorities (profit for tax), customers and the public.\n\n**Financial accounting** reports the profit and position of the whole firm, chiefly to owners and outsiders. **Cost accounting** finds the cost of products, jobs and services. **Management accounting** supplies managers with information to plan, control and decide, looking forward as well as back.',
      terms: [
        ['Internal user', 'A user who owns, manages or works in the business.'],
        ['External user', 'A user outside the business who deals with it or has an interest in it.'],
        ['Financial accounting', 'The branch that reports the results and position of the whole firm.'],
        ['Cost accounting', 'The branch concerned with finding and controlling costs.'],
        ['Management accounting', 'The branch that gives managers the information they need to decide.'],
      ],
      v: vUsersWeb,
      vs: [vNeeds, vBranches],
    },
  ],
  tips: '**How marks are awarded.** Definitions and distinctions earn a mark for each side; write a point for both terms and add an example. A classification item earns a mark for each correct class; an amount item earns a mark for the method (the equation) and a mark for the answer. Show assets and liabilities as lists, then the equation, then the result, as a short table.\n\n**Common mistakes**\n- Calling accountancy the work of writing the books: that is book-keeping.\n- Treating drawings as an expense: they reduce capital.\n- Treating every event as a transaction: it must be measurable in money.\n- Writing that a loss is an expense, or that a gain is part of trading revenue.\n- Deducting a contingent liability from assets to find capital.\n- Calling the seller of a machine on credit a trade creditor.\n- Describing work in progress as finished goods.\n\n**Tips:** keep the six stages of the cycle in order; give the exact class when classifying; say whether a user is inside or outside the firm; name the user and the need together.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Name the **six stages** of the accounting cycle in order.', 'Identifying and measuring, recording, classifying, summarising, analysing and interpreting, communicating.', 'fact', 1],
  ['What is **double entry**?', 'A system in which each transaction is recorded in two accounts; developed by merchants in the Italian trading cities.', 'definition', 1],
  ['What is **book-keeping**?', 'Recording transactions and classifying them under heads.', 'definition', 1],
  ['What is **accounting**?', 'The process that summarises, analyses, interprets and communicates what book-keeping has recorded.', 'definition', 1],
  ['What is **accountancy**?', 'The body of principles, rules and techniques on which accounting is based.', 'definition', 1],
  ['In which stage are entries sorted into **ledger accounts**?', 'Classifying.', 'concept', 1],
  ['What is an **event**?', 'Any happening in or around the business; it need not be measurable in money.', 'definition', 2],
  ['What is a **transaction**?', 'An event measurable in money that changes the finances of the firm.', 'definition', 2],
  ['**Cash** versus **credit** transaction', 'Cash: settled at once. Credit: value passes now and payment is later.', 'concept', 2],
  ['What is a **voucher**?', 'Written evidence of a transaction, such as a cash memo, invoice or receipt.', 'definition', 2],
  ['Define **capital**.', 'The owner\'s investment together with profits left in the business; the owner\'s claim.', 'definition', 2],
  ['Define **drawings**.', 'Cash or goods taken by the owner for personal use; they reduce capital and are not an expense.', 'definition', 2],
  ['Formula for closing capital', 'Opening capital + capital introduced + net profit − drawings.', 'formula', 2],
  ['**Expense** versus **loss**', 'Expense: incurred to earn revenue, with a benefit. Loss: a fall in capital with nothing in return.', 'concept', 2],
  ['**Revenue** versus **income**', 'Revenue: earnings from the main activity. Income: revenue plus other earnings and gains.', 'concept', 2],
  ['**Profit** versus **gain**', 'Profit: surplus of income over expenses from normal activity. Gain: from an incidental or occasional event.', 'concept', 2],
  ['Formula for **profit**', 'Profit = income − expenses.', 'formula', 2],
  ['Define **asset**.', 'A resource owned by the firm from which future benefit is expected.', 'definition', 3],
  ['**Tangible** versus **intangible** fixed asset', 'Tangible has physical form (land, plant); intangible has none (patent, goodwill).', 'concept', 3],
  ['What is a **current asset**?', 'One held for sale or likely to turn into cash within a year: stock, debtors, cash, bank.', 'definition', 3],
  ['What is a **liquid asset**?', 'Cash, or an asset that turns into cash almost at once without loss.', 'definition', 3],
  ['What is a **wasting asset**?', 'A real asset used up as it is worked, such as a quarry or a mine.', 'definition', 3],
  ['What is a **fictitious asset**?', 'An expense not yet written off, such as preliminary expenses; it has no resale value.', 'definition', 3],
  ['Why is capital an **internal liability**?', 'It is owed to the owner, who is inside the business.', 'concept', 3],
  ['**Current** versus **long-term** liability', 'Current: due within a year. Long-term: due after a year.', 'concept', 3],
  ['What is a **contingent liability**?', 'A possible obligation that arises only if a future event happens; it is noted, not recorded.', 'definition', 3],
  ['Formula for **capital**', 'Capital = assets − external liabilities.', 'formula', 3],
  ['**Trade debtor** and **trade creditor**', 'Debtor: owes the firm for goods bought on credit. Creditor: owed by the firm for goods bought on credit.', 'definition', 4],
  ['Three kinds of **stock** in a factory', 'Raw material, work in progress and finished goods.', 'fact', 4],
  ['**Closing stock** of one year', 'Becomes the opening stock of the next year.', 'concept', 4],
  ['Formula for **closing stock** from a flow', 'Opening stock + net purchases − cost of goods sold.', 'formula', 4],
  ['Name the **internal users** of accounts.', 'Owners, managers and employees.', 'fact', 5],
  ['What do **lenders** want from accounts?', 'Evidence that the firm can pay interest and repay the loan.', 'concept', 5],
  ['Compare **financial**, **cost** and **management** accounting.', 'Financial: whole firm, for owners and outsiders. Cost: cost of products and services. Management: information to managers for planning, control and decisions.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short): Introduction to Accounting',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_double_entry', 'm_voucher', 'm_fictitious', 'm_wip', 'ar_users'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_bk_acc', { attempt: 1, keys: ['s2_rev_inc', 's2_contingent'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show working where amounts are asked.', items: ['s3_classify', { attempt: 1, keys: ['s3_trade_cases', 's3_user_needs'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Show your working.', items: ['l5_profit'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long): Introduction to Accounting',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_acctcy', 'm_cycle_stage', 'm_credit_trans', 'm_drawings_eff', 'm_loss', 'm_wasting', 'm_contingent', 'm_closing', 'm_user_need', 'm_branch_cost', 'ar_loss', 'ar_contingent'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_history', 's2_exp_loss', { attempt: 1, keys: ['s2_wasting_fict', 's2_cost_mgmt'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_three_terms', 's3_capital', 's3_stock_kinds', { attempt: 1, keys: ['s3_profit_gain', 's3_branches'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['l5_terms', { attempt: 1, keys: ['l5_classify', 'l5_users'] }] },
  ],
});

void sum; void same; void tot; void CYCLE;

build({
  dir: DIR,
  decks: [d1, d2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t05 of isc-11-accounts-ch01 (history, book-keeping, accounting and accountancy, the accounting cycle; basic terms; assets and liabilities; trade terms and stock; stakeholders and branches); no GST',
    originality: 'every firm, owner, customer and figure is imagined and written by SOYL; no textbook or CISCE specimen/past-paper item and no CBSE 11 or ISC 12 set-up reused (D-036)',
    figures: 'every amount is computed in figs.mjs or beside the item and asserted with same(); decks, notes and answers interpolate the computed values',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
