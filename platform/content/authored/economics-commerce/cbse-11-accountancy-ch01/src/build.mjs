// Build CBSE 11 Accountancy ch01 Introduction to Accounting. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-11-accountancy-ch01', 'economics-commerce');
await import('./questions.mjs');
const { rs, rupees, inr, sum, same } = await import('./acc.mjs');
const { MT, PS, KB, KP, CR, capSpend, revSpend, B1, B2, billRows, DB, CD, GL, IC, mtRows } = await import('./figs.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG pictures
function box(s, cx, cy, w, h, label, o = {}) {
  s.rect(cx - w / 2, cy - h / 2, w, h, { color: o.color, sw: o.sw ?? 1.8, rx: o.rx ?? 8 });
  const lines = Array.isArray(label) ? label : [label];
  const gap = 17;
  lines.forEach((ln, i) => s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, ln, { size: o.size ?? 14, bold: o.bold, color: o.tcolor, muted: o.muted }));
}

const vProcess = (() => {
  const s = new Svg(760, 250);
  const stages = [
    ['1 Identify', 'events in money'], ['2 Measure', 'value in rupees'], ['3 Record', 'in the books'], ['4 Classify', 'under heads'],
    ['5 Summarise', 'into statements'], ['6 Analyse', 'study the figures'], ['7 Interpret', 'draw meaning'], ['8 Communicate', 'to the users'],
  ];
  const pos = stages.map((_, i) => (i < 4 ? [95 + i * 190, 55] : [95 + (7 - i) * 190, 185]));
  pos.forEach(([x, y], i) => box(s, x, y, 160, 64, [stages[i][0], stages[i][1]], { color: i < 4 ? 'blue' : 'green', bold: false }));
  for (let i = 0; i < 3; i++) s.arrow(pos[i][0] + 80, 55, pos[i + 1][0] - 82, 55, { sw: 1.6 });
  s.arrow(pos[3][0], 87, pos[4][0], 153, { sw: 1.6 });
  for (let i = 4; i < 7; i++) s.arrow(pos[i][0] - 80, 185, pos[i + 1][0] + 82, 185, { sw: 1.6 });
  return s.visual('Process flow of accounting in eight stages: identify events in money, measure their value in rupees, record them in the books, classify them under heads, summarise them into statements, analyse the figures, interpret their meaning and communicate the results to the users', 'The accounting process, from identifying to communicating.');
})();

const vUsers = (() => {
  const s = new Svg(760, 370);
  s.text(105, 20, 'Internal users', { bold: true, size: 15, color: 'blue' });
  s.text(655, 20, 'External users', { bold: true, size: 15, color: 'green' });
  const mid = [380, 190];
  box(s, mid[0], mid[1], 170, 90, ['Accounting', 'information'], { color: 'accent', bold: true, sw: 2.4 });
  ['Owners', 'Management', 'Employees'].forEach((n, i) => {
    const y = 120 + i * 70;
    box(s, 105, y, 170, 46, n, { color: 'blue' });
    s.line(190, y, mid[0] - 85, mid[1], { sw: 1.3, color: 'muted' });
  });
  ['Banks and lenders', 'Investors', 'Suppliers and creditors', 'Government and tax', 'Consumers', 'Researchers'].forEach((n, i) => {
    const y = 55 + i * 56;
    box(s, 655, y, 180, 42, n, { color: 'green' });
    s.line(mid[0] + 85, mid[1], 565, y, { sw: 1.3, color: 'muted' });
  });
  return s.visual('Web of the users of accounting information: accounting information in the centre, with internal users on the left, namely owners, management and employees, and external users on the right, namely banks and lenders, investors, suppliers and creditors, government and tax authorities, consumers and researchers', 'Who uses accounting information.');
})();

const vChars = (() => {
  const s = new Svg(780, 290);
  box(s, 390, 28, 280, 40, 'Qualitative characteristics', { color: 'accent', bold: true, sw: 2.2 });
  const cols = [
    ['Reliability', ['Verifiability', 'Neutrality', 'Faithful', 'representation'], 'blue'],
    ['Relevance', ['Timeliness', 'Predictive value', 'Feedback value'], 'green'],
    ['Understandability', ['Plain language', 'Clear layout', 'For users with', 'reasonable skill'], 'red'],
    ['Comparability', ['Across periods', 'Across firms', 'Same methods', 'followed'], 'brown'],
  ];
  cols.forEach(([h, items, col], i) => {
    const cx = 92 + i * 198;
    s.line(390, 48, cx, 95, { sw: 1.4, color: 'muted' });
    box(s, cx, 115, 170, 40, h, { color: col, bold: true });
    s.rect(cx - 85, 150, 170, 120, { color: col, sw: 1.4 });
    items.forEach((t, j) => s.text(cx, 175 + j * 26, t, { size: 13 }));
  });
  return s.visual('Chart of the qualitative characteristics of accounting information: reliability with verifiability, neutrality and faithful representation; relevance with timeliness, predictive value and feedback value; understandability; comparability across periods and across firms', 'The four qualitative characteristics.');
})();

const vTree = (() => {
  const s = new Svg(780, 340);
  box(s, 200, 28, 130, 38, 'Assets', { color: 'blue', bold: true, sw: 2.2 });
  box(s, 100, 120, 150, 40, 'Non-current', { color: 'blue' });
  box(s, 300, 120, 150, 40, 'Current', { color: 'blue' });
  s.line(200, 47, 100, 100, { sw: 1.4, color: 'muted' });
  s.line(200, 47, 300, 100, { sw: 1.4, color: 'muted' });
  box(s, 55, 215, 100, 40, 'Tangible', { color: 'blue', size: 13 });
  box(s, 160, 215, 100, 40, 'Intangible', { color: 'blue', size: 13 });
  s.line(100, 140, 55, 195, { sw: 1.4, color: 'muted' });
  s.line(100, 140, 160, 195, { sw: 1.4, color: 'muted' });
  s.text(55, 255, 'land,', { size: 12 }); s.text(55, 271, 'machinery', { size: 12 });
  s.text(160, 255, 'patent,', { size: 12 }); s.text(160, 271, 'goodwill', { size: 12 });
  s.text(300, 160, 'stock, debtors,', { size: 12 }); s.text(300, 176, 'cash, bank', { size: 12 });
  box(s, 590, 28, 150, 38, 'Liabilities', { color: 'red', bold: true, sw: 2.2 });
  box(s, 490, 120, 150, 40, 'Non-current', { color: 'red' });
  box(s, 690, 120, 150, 40, 'Current', { color: 'red' });
  s.line(590, 47, 490, 100, { sw: 1.4, color: 'muted' });
  s.line(590, 47, 690, 100, { sw: 1.4, color: 'muted' });
  s.text(490, 160, 'loan due after', { size: 12 }); s.text(490, 176, 'twelve months', { size: 12 });
  s.text(690, 160, 'creditors, bills', { size: 12 }); s.text(690, 176, 'payable, expenses due', { size: 12 });
  s.text(390, 315, 'Assets are financed by liabilities and capital', { size: 13, muted: true });
  return s.visual('Classification tree: assets divide into non-current assets, which are tangible such as land and machinery or intangible such as patents and goodwill, and current assets such as stock, debtors, cash and bank; liabilities divide into non-current liabilities due after twelve months and current liabilities such as creditors, bills payable and expenses due', 'How assets and liabilities are classified.');
})();

// ---------------------------------------------------------------- tables (Part 1)
const vBkAcc = table(
  ['Point', 'Book-keeping', 'Accounting'],
  [
    ['Scope', 'Recording and classifying transactions', 'Recording, summarising, analysing, interpreting and communicating'],
    ['Purpose', 'To keep complete and accurate data', 'To give information for decisions'],
    ['Skill needed', 'Routine care and accuracy', 'Judgement and knowledge of principles'],
    ['Result', 'Books with balanced accounts', 'Statements, analysis and advice'],
  ],
  'Table comparing book-keeping and accounting by scope, purpose, skill needed and result',
);
const vBranches = table(
  ['Branch', 'What it concerns', 'Main users'],
  [
    ['Financial accounting', 'Records the transactions of the whole business and reports its profit and financial position', 'Owners, lenders, tax authorities'],
    ['Cost accounting', 'Finds and analyses the cost of products, jobs and services', 'Management'],
    ['Management accounting', 'Presents information for planning, control and decisions', 'Managers'],
  ],
  'Table of the three branches of accounting: financial accounting for the whole business, cost accounting for the cost of products and management accounting for planning and control',
);
const vObj = table(
  ['Objective', 'What it means', 'Imagined illustration'],
  [
    ['Systematic record', 'Every transaction is written in an orderly way', 'Dhanpur Dairy notes each milk purchase and sale by date'],
    ['Profit or loss', 'Income of the period is compared with its expenses', 'The dairy compares a month of sales with a month of costs'],
    ['Financial position', 'Assets, liabilities and capital are shown on a date', 'The dairy lists what it owns and owes on 31 March'],
    ['Information to users', 'Figures reach those who must decide', 'The dairy gives its bank the year\'s statements'],
  ],
  'Table of the four objectives of accounting with meaning and an imagined dairy illustration',
);
const vRole = table(
  ['Role', 'What it means'],
  [
    ['Language of business', 'Events become money terms and standard statements that many people can read'],
    ['Historical record', 'Past transactions are kept and can be looked up and verified'],
    ['Current economic reality', 'The statements show what the firm owns and owes now'],
    ['Information system', 'Data is collected, processed and communicated'],
    ['Service to users', 'Each user gets the figures needed for a decision'],
  ],
  'Table of the five roles of accounting: language of business, historical record, current economic reality, information system and service to users',
);
const vRoleEx = table(
  ['Statement about Meera Traders (imagined)', 'Role illustrated'],
  [
    ['Her one-page statement is read in the same way by her bank and her supplier', 'Language of business'],
    ['She looks up what she paid an electrician last June', 'Historical record'],
    [`On 31 March the statement shows goods worth ${rs(80000)} and creditors of ${rs(60000)}`, 'Current economic reality'],
    ['Data about bills is collected, sorted and reported to her banker', 'Information system'],
  ],
  'Worked example table matching four statements about Meera Traders to roles of accounting',
  'Match each statement to a role.',
);
const vInternal = table(
  ['Internal user', 'What the user wants'],
  [
    ['Owners', 'Profit earned and the safety of the capital invested'],
    ['Management', 'Detailed facts to plan, control and decide'],
    ['Employees', 'Ability to pay wages and bonus, and job security'],
  ],
  'Table of internal users, owners, management and employees, with what each wants from accounting information',
);
const vExternal = table(
  ['External user', 'What the user wants'],
  [
    ['Banks and lenders', 'Ability to pay interest and repay the loan'],
    ['Investors', 'Return on money and risk of the investment'],
    ['Suppliers and creditors', 'Ability to pay for goods bought on credit'],
    ['Government and tax authorities', 'Profit for tax and compliance with the law'],
    ['Consumers', 'Fairness of prices and continuity of supply'],
    ['Researchers', 'Facts and trends for study'],
  ],
  'Table of external users, banks and lenders, investors, suppliers and creditors, government and tax authorities, consumers and researchers, with what each wants',
);
const vUserEx = table(
  ['Question at Kaveri Bakery (imagined)', 'User', 'Needs'],
  [
    [`Should a bank lend ${rs(150000)} for a new oven?`, 'Bank', 'Ability to repay'],
    ['Should the flour supplier allow thirty days of credit?', 'Supplier', 'Ability to pay dues'],
    ['Can the six bakers expect a bonus?', 'Employees', 'Profit and capacity to pay'],
    ['What profit is taxable this year?', 'Tax officer', 'The profit figure'],
  ],
  'Worked example table of questions at Kaveri Bakery with the user who asks and what the user needs',
  'Find who asks and what is needed.',
);
const vReliab = table(
  ['Part of reliability', 'Meaning', 'Imagined case'],
  [
    ['Verifiability', 'Independent persons using the same evidence reach the same figure', 'Two checkers agree on a sales total from the bills'],
    ['Neutrality', 'Information is free from bias', 'Bad debts are shown even though the owner would prefer not'],
    ['Faithful representation', 'Figures describe what really happened', 'A sale is shown at the price actually charged'],
  ],
  'Table of the three parts of reliability: verifiability, neutrality and faithful representation, with meaning and an imagined case',
);
const vRelev = table(
  ['Characteristic', 'Meaning', 'Imagined case'],
  [
    ['Timeliness', 'Information arrives before the decision', 'A weekly cost report reaches the baker before festival orders'],
    ['Predictive value', 'It helps users forecast', 'Three years of rising sales help predict the next year'],
    ['Feedback value', 'It confirms or corrects earlier expectations', 'Actual profit shows the forecast was too high'],
    ['Understandability', 'Users with reasonable knowledge can follow it', 'Plain notes under each statement'],
  ],
  'Table of relevance, with timeliness, predictive value and feedback value, and understandability, with meaning and an imagined case',
);
const vCompar = table(
  ['Kind of comparison', 'What it needs'],
  [
    ['Across periods', 'The same methods every year, with any change disclosed'],
    ['Across firms', 'Similar methods in firms of the same trade'],
  ],
  'Table of the two kinds of comparability: across periods needing the same methods each year, and across firms needing similar methods',
);
const vCharEx = table(
  ['Imagined case', 'Quality affected'],
  [
    ['The owner of Pinewood Traders asks that bad debts be left out of the report', 'Neutrality'],
    ['A cooperative report is full of technical terms its members cannot follow', 'Understandability'],
    ['Sunrise Garments changes its stock method every year without saying so', 'Comparability'],
    ['A cost report arrives after the order was already priced', 'Timeliness'],
  ],
  'Worked example table of four imagined cases and the quality of information each affects',
  'Say which quality fails in each case.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Meaning', 'Identify, measure, record, classify, summarise, analyse, interpret, communicate'],
    ['Branches', 'Financial, cost and management accounting'],
    ['Objectives', 'Records, profit or loss, financial position, information'],
    ['Users', 'Internal: owners, management, employees; external: lenders, investors, suppliers, government, consumers, researchers'],
    ['Characteristics', 'Reliability, relevance, understandability, comparability'],
  ],
  'Summary table of Part 1: meaning, branches, objectives, users and qualitative characteristics',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Book-keeping includes interpretation', 'Book-keeping records; interpretation is part of accounting'],
    ['Employees are external users', 'Owners, management and employees are internal users'],
    ['Reliability only means accuracy', 'It covers verifiability, neutrality and faithful representation'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables (Part 2)
const vEntity = table(
  ['Term', 'Standard meaning', 'Imagined example'],
  [
    ['Entity', 'A person or organisation, with a separate existence for accounting, about which records are kept', 'Meera Traders, a stationery business'],
    ['Business transaction', 'An exchange of money or money\'s worth between the firm and another party, measurable in money', `Selling pens for ${rs(5000)} in cash`],
    ['Not a transaction', 'An event with no completed exchange of value', 'A customer asking the price of a pen'],
  ],
  'Table of entity and business transaction with meaning and an imagined example from Meera Traders',
);
const vCapDraw = table(
  ['Term', 'Standard meaning', 'Effect'],
  [
    ['Capital', 'The amount the owner has put into the business, with profits left in it', 'Increases the owner\'s claim'],
    ['Drawings', 'Cash or goods the owner takes out for personal use', 'Decreases capital; not an expense'],
  ],
  'Table of capital and drawings with meaning and effect on the owner\'s claim',
);
const vMTlist = table(['Item', 'Class', 'Amount'], [...mtRows.map((r) => [r[0], r[1], r[2]])], 'Table of the balances of Meera Traders classified as non-current or current assets and liabilities');
const vMTcap = table(
  ['Working', '₹'],
  [
    ['Non-current assets: 4,00,000 + 60,000 + 40,000 + 50,000', inr(MT.ncAssets)],
    ['Current assets: 80,000 + 70,000 + 30,000 + 40,000', inr(MT.cAssets)],
    ['Total assets', inr(MT.assets)],
    ['Total liabilities: 2,00,000 + 60,000 + 10,000', inr(MT.liabilities)],
    ['Capital = assets − liabilities', inr(MT.capital)],
  ],
  'Worked example table finding the capital of Meera Traders as total assets less total liabilities',
  'Capital is the balancing figure.',
);
const vLiab = table(
  ['Liability', 'Meaning', 'Examples'],
  [
    ['Non-current', 'Due after more than twelve months', 'A bank loan repayable in five years'],
    ['Current', 'Due within twelve months or the operating cycle', 'Creditors, bills payable, outstanding rent'],
  ],
  'Table of non-current and current liabilities with meaning and examples',
);
const vAssets = table(
  ['Asset', 'Meaning', 'Examples'],
  [
    ['Non-current, tangible', 'Physical, held for use over many years', 'Land, machinery, furniture'],
    ['Non-current, intangible', 'No physical form but of value, used over many years', 'Patents, goodwill, trademarks'],
    ['Current', 'Held for sale or to turn into cash within twelve months or the operating cycle', 'Stock, debtors, cash, bank'],
  ],
  'Table of non-current tangible, non-current intangible and current assets with meaning and examples',
);
const vKBclass = table(
  ['Item at Kaveri Bakery (imagined)', 'Class'],
  KB.items.map((x) => [x[0], x[1]]),
  'Worked example table classifying seven items of Kaveri Bakery into assets and liabilities',
  'Total assets ' + rs(KB.assets) + ', liabilities ' + rs(KB.liabilities) + ', so capital is ' + rs(KB.capital) + '.',
);
const vExp = table(
  ['Type', 'Meaning', 'Example'],
  [
    ['Capital expenditure', 'Spending that gives a benefit for more than one year or adds to an asset', 'Buying a delivery van; installing a machine'],
    ['Revenue expenditure', 'Spending whose benefit is used up in the current year', 'Wages, rent, repairs, flour used'],
  ],
  'Table of capital and revenue expenditure with meaning and examples',
);
const vCRex = table(['Payment at Kaveri Bakery (imagined)', 'Kind'], crRowsFrom(CR), 'Worked example table classifying six payments of Kaveri Bakery as capital or revenue expenditure');
function crRowsFrom(list) { return list.map(([a, k]) => [a, k + ' expenditure']); }
const vInc = table(
  ['Term', 'Standard meaning', 'Example'],
  [
    ['Expense', 'Cost incurred in earning revenue', 'Wages, rent, electricity'],
    ['Income', 'Amount earned from the main activity or by way of gain, and credited to the owner\'s claim', 'Sales, commission received'],
    ['Profit', 'Excess of income over expenses', 'Income less expenses'],
    ['Gain', 'Profit from incidental or occasional events', `Selling an old computer of book value ${rs(12000)} for ${rs(15000)}: ${rs(GL.gain)}`],
    ['Loss', 'Fall in capital without benefit in return', 'Goods destroyed by fire'],
  ],
  'Table of expense, income, profit, gain and loss with standard meanings and examples',
);
const vProfit = table(
  ['Kaveri Bakery for one month (imagined)', '₹'],
  [
    ...KP.income.map(([n, a]) => [n, inr(a)]),
    ['Total income', inr(KP.income_)],
    ...KP.expense.map(([n, a]) => ['Less: ' + n, inr(a)]),
    ['Total expenses', inr(KP.expense_)],
    ['Profit', inr(KP.profit)],
  ],
  'Worked example table computing the profit of Kaveri Bakery as total income less total expenses',
  'Profit is income less expenses.',
);
const vCapRoll = table(
  ['Capital account of Kaveri Bakery', '₹'],
  [
    ['Opening capital', inr(KP.openCapital)],
    ['Add: capital introduced', inr(KP.addCapital)],
    ['Add: profit for the month', inr(KP.profit)],
    ['Less: drawings', inr(KP.drawings)],
    ['Closing capital', inr(KP.closeCapital)],
  ],
  'Worked example table of the capital of Kaveri Bakery: opening capital plus capital introduced plus profit less drawings gives closing capital',
);
const vDisc = table(
  ['Discount', 'Allowed on', 'Allowed for', 'In the books'],
  [
    ['Trade discount', 'List price', 'Bulk buying or to a trader', 'Not recorded; only the net invoice amount'],
    ['Cash discount', 'Invoice amount', 'Payment within the agreed period', 'Recorded as discount allowed or received'],
  ],
  'Table comparing trade discount and cash discount by what they are allowed on, why, and treatment in the books',
);
const vBill = table(['Anand Sports bill to a retailer (imagined)', '₹'], billRows(B1), 'Worked example table of a bill from list price through trade discount, invoice amount and cash discount to the amount paid');
const vGoods = table(
  ['Term', 'Standard meaning'],
  [
    ['Voucher', 'Written evidence of a transaction, such as a cash memo or a receipt'],
    ['Goods', 'Items the business buys for resale or manufacture and sells'],
    ['Purchases', 'Goods bought for resale or for use in production, cash or credit'],
    ['Purchases return', 'Goods sent back to the supplier'],
    ['Sales', 'Goods sold, cash or credit'],
    ['Sales return', 'Goods sent back by a customer'],
  ],
  'Table of voucher, goods, purchases, purchases return, sales and sales return with standard meanings',
);
const vStock = table(
  ['Term', 'Standard meaning', 'Example'],
  [
    ['Opening stock', 'Unsold goods at the start of the period', `Stock of ${rs(PS.openStock)} on 1 April`],
    ['Closing stock', 'Unsold goods at the end of the period; the next period\'s opening stock', `Stock of ${rs(PS.closeStock)} on 31 March`],
    ['Debtors', 'Persons who owe the firm for goods or services bought on credit', `Rohit Stationers owes ${rs(DB.owes)}`],
    ['Creditors', 'Persons the firm owes for goods or services bought on credit', `Sharma Paper Mills is owed ${rs(CD.owes)}`],
  ],
  'Table of opening stock, closing stock, debtors and creditors with standard meanings and examples from Meera Traders',
);
const vNet = table(
  ['Meera Traders for the year (imagined)', '₹'],
  [
    ['Purchases: cash 60,000 and credit 90,000', inr(PS.purchases)],
    ['Less: purchases return', inr(PS.purchReturn)],
    ['Net purchases', inr(PS.netPurchases)],
    ['Sales: cash 1,00,000 and credit 1,40,000', inr(PS.sales)],
    ['Less: sales return', inr(PS.saleReturn)],
    ['Net sales', inr(PS.netSales)],
  ],
  'Worked example table of net purchases and net sales of Meera Traders after deducting returns',
);
const vDebt = table(
  ['Credit sale to Rohit Stationers (imagined)', '₹'],
  [['Goods sold on credit', inr(DB.sold)], ['Less: received on account', inr(DB.received)], ['Rohit still owes (debtor balance)', inr(DB.owes)]],
  'Worked example table of a debtor balance: goods sold on credit less money received leaves the amount still owed',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Entity, transaction', 'A unit with its own records; exchange measurable in money'],
    ['Capital, drawings', 'Owner\'s claim; withdrawals reduce it'],
    ['Assets, liabilities', 'Non-current and current; capital = assets − liabilities'],
    ['Expenditure', 'Capital: lasting benefit; revenue: current year'],
    ['Results', 'Profit = income − expenses; gain; loss'],
    ['Discount, goods, stock', 'Trade not recorded; cash recorded; net purchases and sales; opening and closing stock'],
  ],
  'Summary table of Part 2: basic accounting terms',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Drawings are an expense', 'Drawings are a withdrawal and reduce capital'],
    ['Trade discount is entered in the books', 'Only the net invoice amount is entered'],
    ['Cash discount is calculated on the list price', 'It is calculated on the invoice amount'],
    ['Repairs are capital expenditure', 'Repairs that only maintain an asset are revenue expenditure'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Introduction to Accounting, Part 1: Meaning, objectives, users and qualities',
  goals: [
    'Explain the meaning of accounting and distinguish it from book-keeping',
    'State the objectives and roles of accounting',
    'Identify internal and external users and what each needs',
    'Describe reliability, relevance, understandability and comparability',
  ],
  slides: [
    sl('title', 'What is accounting?', {
      b: 'Part 1: the **meaning** of accounting, its **objectives**, its **users** and the **qualities** of good information.',
      v: flow('LR', ['Meaning', 'Objectives and role', 'Users', 'Qualities of information'], 'Route map of Part 1: meaning, objectives and role, users, and qualities of information', 'Part 1 at a glance'),
      n: 'Every business, from a corner stall to a large company, needs to know how it is doing. Accounting gives the answer. In this part we learn what accounting means, why it is done, who reads its figures and what makes those figures worth trusting.',
    }),
    sl('concept', 'The meaning of accounting', {
      b: 'Accounting is a process of turning business events into financial information for decisions.',
      v: vProcess,
      n: 'Accounting is a chain of eight stages. We identify events that can be shown in money, measure their value, record them, classify them under heads, summarise them into statements, analyse the figures, interpret what they mean and finally communicate the results to the people who need them.',
    }),
    sl('concept', 'Book-keeping and accounting', {
      v: vBkAcc,
      n: 'Book-keeping is the recording part of the work. It writes transactions in the books and sorts them under heads. Accounting is wider. It starts from the records, then summarises, analyses and interprets them, and explains the results to users. A clerk may do the book-keeping, but the accountant must understand the story behind the figures.',
    }),
    sl('concept', 'Branches of accounting', {
      v: vBranches,
      n: 'Accounting has three main branches. Financial accounting records the whole business and reports its profit and financial position to outsiders. Cost accounting finds what it costs to make a product or perform a job. Management accounting presents information to managers so that they can plan, control and decide.',
    }),
    sl('check', 'Quick check: order the process', {
      b: 'Arrange the stages of the accounting process in the right order.',
      chk: 'ord_process',
      n: 'Think about what must happen first before the figures can be summarised and explained.',
    }),
    sl('concept', 'Objectives of accounting', {
      v: vObj,
      n: 'Accounting has four objectives. First, to keep a systematic record of every transaction. Second, to find the profit or loss of a period. Third, to show the financial position on a date, that is, what the firm owns and owes. Fourth, to give information to users. The table shows each with an imagined dairy.',
    }),
    sl('concept', 'Role of accounting', {
      v: vRole,
      n: 'Accounting plays five roles. It is the language of business, because it turns events into standard money terms. It is a historical record. It shows current economic reality. It is an information system that collects, processes and communicates. And it serves each user with the figures that user needs.',
    }),
    sl('example', 'Worked example 1: which role?', {
      b: 'Match each statement about the imagined Meera Traders to the role of accounting it shows.',
      v: vRoleEx,
      n: 'Read each statement and ask what accounting is doing. A statement that her bank and supplier both read the same way shows the language of business. Looking up last June shows the historical record. The statement showing what she owns and owes today shows current economic reality. Sorting bills for the banker shows an information system.',
    }),
    sl('diagram', 'The users of accounting information', {
      v: vUsers,
      n: 'Many people look at the same set of accounts. Inside the firm are the owners, the management and the employees. Outside it are banks and lenders, investors, suppliers and creditors, the government and tax authorities, consumers and researchers. Each of them uses the information for a different purpose.',
    }),
    sl('concept', 'Internal users and their needs', {
      v: vInternal,
      n: 'Internal users work in or own the business. Owners want to know the profit and whether their capital is safe. Management needs detailed facts to plan, control and decide. Employees want to know whether the firm can pay wages and bonus and whether their jobs are secure.',
    }),
    sl('concept', 'External users and their needs', {
      v: vExternal,
      n: 'External users deal with the firm from outside. A bank wants to be sure of repayment. An investor looks at return and risk. A supplier wants payment for goods sold on credit. Tax authorities need the profit. Consumers care about fair prices and supply, and researchers study the figures for trends.',
    }),
    sl('check', 'Quick check: match the user', {
      b: 'Match each user of a tea company\'s accounts with what the user mainly wants.',
      chk: 'mt_users',
      n: 'Ask what decision each user must make.',
    }),
    sl('example', 'Worked example 2: who needs what?', {
      b: 'Kaveri Bakery is an imagined firm in the imagined town of Dhanpur. Find who is asking and what is needed.',
      v: vUserEx,
      n: `A bank deciding whether to lend ${rupees(150000)} for an oven needs to know whether the bakery can repay. A flour supplier deciding on thirty days of credit needs to know whether dues are paid on time. The bakers want to know whether a bonus is possible. The tax officer needs the taxable profit.`,
    }),
    sl('concept', 'Reliability', {
      v: vReliab,
      n: 'Good information must be reliable. That means it can be verified, so that independent persons using the same evidence reach the same figure. It must be neutral, free from bias. And it must be a faithful representation, describing what really happened and not what someone would like to see.',
    }),
    sl('concept', 'Relevance and understandability', {
      v: vRelev,
      n: 'Relevant information makes a difference to a decision. It must arrive in time, help users predict the future and confirm or correct earlier expectations. Understandable information is presented clearly enough for users with reasonable knowledge. A report no one can follow, or that comes too late, is of little use.',
    }),
    sl('diagram', 'Comparability and the full picture', {
      v: vChars,
      n: 'The fourth quality is comparability. Users should be able to compare a firm with itself over time, and with other firms. This needs the same methods year after year, with any change disclosed. The chart brings together reliability, relevance, understandability and comparability, with the parts of each.',
    }),
    sl('check', 'Quick check: which quality?', {
      b: 'Two accountants examine the same bills and reach the same sales figure. Which quality does this show?',
      chk: 'm_verifiable',
      n: 'Think about independent persons using the same evidence.',
    }),
    sl('example', 'Worked example 3: applying the qualities', {
      b: 'Say which quality of information fails in each imagined case.',
      v: vCharEx,
      n: 'Leaving out bad debts at the owner\'s request is a failure of neutrality. A report full of technical terms that members cannot follow fails understandability. Changing the stock method every year without saying so fails comparability. A cost report that arrives after the order was priced fails timeliness.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Accounting identifies, measures, records, classifies, summarises, analyses, interprets and communicates financial information. It has three branches and four objectives. Its users are internal and external, each with its own needs. Good information is reliable, relevant, understandable and comparable.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      v: vTips1,
      n: 'Do not say that book-keeping includes interpretation. Remember that employees are internal users. When you write about reliability, name its three parts. In a definition, include the stages of the process. For a user question, name the user and say what that user wants.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Introduction to Accounting, Part 2: Basic accounting terms',
  goals: [
    'Define entity, business transaction, capital and drawings',
    'Classify assets and liabilities and find capital',
    'Distinguish capital and revenue expenditure, and define expense, income, profit, gain and loss',
    'Define discounts, goods, purchases, sales, stock, debtors and creditors, and compute net figures',
  ],
  slides: [
    sl('title', 'The language of accounting', {
      b: 'Part 2: the **basic terms** that every account, statement and entry is built from.',
      v: flow('LR', ['Entity and transaction', 'Capital, assets, liabilities', 'Expenditure, income, profit', 'Discount, goods, stock'], 'Route map of Part 2: entity and transaction, capital, assets and liabilities, expenditure, income and profit, and discount, goods and stock', 'Part 2 at a glance'),
      n: 'Before we record a single entry we need a shared vocabulary. This part gives standard meanings for the terms that appear everywhere in accounting, each tied to an imagined business so you can see how it is used.',
    }),
    sl('concept', 'Entity and business transaction', {
      v: vEntity,
      n: `An entity is a person or organisation about which records are kept, with a separate existence for accounting. Meera Traders is an entity. A business transaction is an exchange of money or money's worth between the firm and another party, which can be measured in money. Selling pens for ${rupees(5000)} in cash is one. A customer only asking a price is not.`,
    }),
    sl('concept', 'Capital and drawings', {
      v: vCapDraw,
      n: 'Capital is the amount the owner has put into the business, together with profits left in it. It is the owner\'s claim on the firm. Drawings are cash or goods which the owner takes out for personal use. Drawings reduce capital, and they are not an expense of the business.',
    }),
    sl('diagram', 'Classifying assets and liabilities', {
      v: vTree,
      n: 'Assets and liabilities are each classified into non-current and current. Non-current assets last for many years and may be tangible, like land and machinery, or intangible, like patents and goodwill. Current assets turn into cash within a year. Liabilities due after twelve months are non-current. Those due within a year are current.',
    }),
    sl('concept', 'Liabilities', {
      v: vLiab,
      n: 'A liability is an amount the firm must pay to outsiders. A non-current liability is due after more than twelve months, for example a bank loan repayable in five years. A current liability is due within twelve months or the operating cycle, for example creditors and outstanding rent.',
    }),
    sl('concept', 'Assets', {
      v: vAssets,
      n: 'An asset is a resource owned by the firm that is expected to bring future benefit. A non-current tangible asset has physical form, like land. A non-current intangible asset has no physical form but value, like a patent. A current asset is held for sale or will turn into cash within twelve months, like stock and debtors.',
    }),
    sl('check', 'Quick check: intangible or not?', {
      b: 'Which of the following is an intangible asset?',
      chk: 'm_intangible',
      n: 'Think of the asset that has no physical form.',
    }),
    sl('example', 'Worked example 1: capital of Meera Traders', {
      b: 'Meera Traders, an imagined stationery business in the imagined town of Ranipur, lists its balances. Find the capital.',
      v: vMTcap,
      n: `Add the non-current assets, ${rupees(MT.ncAssets)}, to the current assets, ${rupees(MT.cAssets)}. Total assets are ${rupees(MT.assets)}. The liabilities, including the five year loan, come to ${rupees(MT.liabilities)}. Capital is assets minus liabilities, which is ${rupees(MT.capital)}.`,
    }),
    sl('example', 'Worked example 2: classify at the bakery', {
      b: 'Classify each item of the imagined Kaveri Bakery. Then find its capital.',
      v: vKBclass,
      n: `An oven for ten years is a tangible non-current asset. A recipe brand is intangible. Flour in the store room, money due from the hotel and cash in the till are current assets. The loan due after four years is a non-current liability. Wages due next week are a current liability. Assets are ${rupees(KB.assets)}, liabilities ${rupees(KB.liabilities)}, so capital is ${rupees(KB.capital)}.`,
    }),
    sl('check', 'Quick check: a loan', {
      b: 'Decide whether the assertion and the reason about a four-year bank loan are true.',
      chk: 'ar_loan',
      n: 'Ask when the loan falls due.',
    }),
    sl('concept', 'Capital and revenue expenditure', {
      v: vExp,
      n: 'Expenditure is spending by the business. If the benefit lasts for more than one year or adds to an asset, it is capital expenditure and it appears in the balance sheet. If the benefit is used up in the current year, it is revenue expenditure and it is charged to the profit and loss account. Installing a machine is capital. Repairs are revenue.',
    }),
    sl('example', 'Worked example 3: capital or revenue?', {
      b: 'Kaveri Bakery makes six payments. Classify each.',
      v: vCRex,
      n: `The van, the installation of the new machine and the display counter give lasting benefit, so they are capital expenditure, together ${rupees(capSpend)}. Painting every year, oven repairs and flour for the month are revenue expenditure, together ${rupees(revSpend)}.`,
    }),
    sl('concept', 'Expense, income, profit, gain and loss', {
      v: vInc,
      n: `An expense is a cost incurred in earning revenue. Income is what the business earns. Profit is the excess of income over expenses. A gain is a profit from an incidental event, such as selling an old computer for ${rupees(15000)} when its book value was ${rupees(12000)}, which gives a gain of ${rupees(GL.gain)}. A loss is a fall in capital without any benefit in return.`,
    }),
    sl('example', 'Worked example 4: profit and capital', {
      b: 'Find the profit of Kaveri Bakery for the month, then roll the capital forward.',
      v: vProfit,
      n: `Income is ${rupees(KP.income_)}, made of sales and commission. Expenses are ${rupees(KP.expense_)}. Profit is therefore ${rupees(KP.profit)}. Adding profit to the opening capital and the new capital, and deducting drawings, gives the closing capital of ${rupees(KP.closeCapital)}.`,
    }),
    sl('concept', 'Trade discount and cash discount', {
      v: vDisc,
      n: 'A discount is a deduction from a price. Trade discount is allowed on the list price, for example for buying in bulk, and is not recorded in the books, only the net invoice amount is. Cash discount is allowed on the invoice amount for payment within the agreed period, and it is recorded in the books.',
    }),
    sl('example', 'Worked example 5: a bill with two discounts', {
      b: 'Anand Sports, an imagined wholesaler, sells goods to a retailer. Find the amount paid.',
      v: vBill,
      n: `The list price is ${rupees(B1.list)}. Trade discount at ten per cent is ${rupees(B1.trade)}, so the invoice amount is ${rupees(B1.invoice)}. Cash discount at two per cent of the invoice is ${rupees(B1.cash)}. If the retailer pays within ten days, the amount actually paid is ${rupees(B1.paid)}.`,
    }),
    sl('check', 'Quick check: arrange the bill', {
      b: 'Arrange the steps of working out the amount paid on a bill with both discounts.',
      chk: 'ord_bill',
      n: 'Cash discount is found on the invoice amount, not the list price.',
    }),
    sl('concept', 'Voucher, goods, purchases and sales', {
      v: vGoods,
      n: 'A voucher is written evidence of a transaction, such as a cash memo. Goods are items that the business buys to resell or to make into products. Purchases are goods bought, and purchases return is goods sent back to the supplier. Sales are goods sold, and sales return is goods sent back by a customer.',
    }),
    sl('concept', 'Stock, debtors and creditors', {
      v: vStock,
      n: 'Opening stock is the unsold goods at the start of the period, and closing stock is the unsold goods at the end. Closing stock of one year becomes the opening stock of the next. A debtor is a person who owes the firm for goods bought on credit. A creditor is a person to whom the firm owes money for goods bought on credit.',
    }),
    sl('example', 'Worked example 6: net purchases, net sales, debtor', {
      b: 'Compute net purchases and net sales for Meera Traders, and the balance due from Rohit Stationers.',
      v: vNet,
      n: `Purchases of ${rupees(PS.purchases)} less returns of ${rupees(PS.purchReturn)} give net purchases of ${rupees(PS.netPurchases)}. Sales of ${rupees(PS.sales)} less returns of ${rupees(PS.saleReturn)} give net sales of ${rupees(PS.netSales)}. A customer who bought ${rupees(DB.sold)} on credit and paid ${rupees(DB.received)} is still a debtor for ${rupees(DB.owes)}.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'In short. An entity keeps its own records. A transaction is an exchange measurable in money. Capital equals assets minus liabilities, and drawings reduce it. Expenditure is capital or revenue. Profit is income minus expenses. Trade discount is not recorded but cash discount is. Net figures are found after returns.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      v: vTips2,
      n: 'Never call drawings an expense. Remember that only the net invoice amount is entered when trade discount is given. Work out cash discount on the invoice amount. Show the working for capital as assets minus liabilities. Give an example with each definition.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction to Accounting: Notes',
  sections: [
    {
      h: '1. Meaning of accounting; book-keeping; branches',
      t: 1,
      b: '**Accounting** is a process of identifying, measuring, recording, classifying, summarising, analysing and interpreting financial information and communicating it to users. Classical definitions describe it as the art of recording, classifying and summarising in money terms the transactions of a business, and of interpreting the results. It is an **information system**.\n\n**Book-keeping** covers only the recording and classifying stages. Accounting uses those records and goes further.\n\n**Branches:** financial accounting (the whole business, for outsiders), cost accounting (the cost of products and jobs) and management accounting (information for planning and control).',
      terms: [
        ['Accounting', 'The process of identifying, measuring, recording, classifying, summarising, analysing, interpreting and communicating financial information to users.'],
        ['Book-keeping', 'The recording and classifying of transactions in the books of account.'],
        ['Financial accounting', 'The branch that records the transactions of the whole business and reports its profit and financial position.'],
        ['Cost accounting', 'The branch that finds and analyses the cost of products, jobs and services.'],
        ['Management accounting', 'The branch that presents information to managers for planning, control and decisions.'],
      ],
      v: vProcess,
      vs: [vBkAcc, vBranches],
    },
    {
      h: '2. Objectives and role of accounting',
      t: 1,
      b: '**Objectives:** a systematic record of transactions; the profit or loss of a period; the financial position on a date; information to users.\n\n**Role:** language of business; historical record; current economic reality; information system; service to users.\n\nAccounting cannot guarantee a profit. It measures and reports what has happened.',
      terms: [
        ['Financial position', 'The state of the firm\'s assets, liabilities and capital on a given date.'],
      ],
      v: vObj,
      vs: [vRole],
    },
    {
      h: '3. Users of accounting information',
      t: 1,
      b: '**Internal users** are inside the firm: owners (profit, safety of capital), management (detailed facts for decisions) and employees (wages, bonus, job security).\n\n**External users** are outside it: banks and lenders (ability to repay), investors (return and risk), suppliers and creditors (ability to pay), government and tax authorities (profit for tax), consumers (price and supply) and researchers (facts for study).',
      terms: [
        ['Internal users', 'Users who own, manage or work in the business.'],
        ['External users', 'Users outside the business, such as lenders, investors, suppliers, tax authorities, consumers and researchers.'],
      ],
      v: vUsers,
      vs: [vInternal, vExternal],
    },
    {
      h: '4. Qualitative characteristics of accounting information',
      t: 2,
      b: '- **Reliability:** verifiable (independent persons reach the same figure), neutral (free from bias), a faithful representation (describes what really happened).\n- **Relevance:** timely (in time for the decision), with predictive value (helps forecast) and feedback value (confirms or corrects expectations).\n- **Understandability:** clear to users with reasonable knowledge.\n- **Comparability:** across periods (same methods, changes disclosed) and across firms.',
      terms: [
        ['Verifiability', 'The quality that lets independent persons using the same evidence reach the same figure.'],
        ['Neutrality', 'Freedom of information from bias in favour of any user.'],
        ['Timeliness', 'The availability of information in time to influence a decision.'],
        ['Comparability', 'The ability to compare information across periods and across firms.'],
      ],
      v: vChars,
      vs: [vReliab, vRelev, vCompar],
    },
    {
      h: '5. Basic terms: entity, transaction, capital, drawings, assets, liabilities',
      t: 3,
      b: 'An **entity** is a person or organisation about which records are kept. A **business transaction** is an exchange of money or money\'s worth that can be measured in money. **Capital** is the owner\'s investment together with profits kept in the firm; **drawings** are cash or goods taken out for personal use and reduce capital.\n\n**Capital = assets − liabilities.** For Meera Traders (imagined): assets ' + rs(MT.assets) + ' less liabilities ' + rs(MT.liabilities) + ' gives capital ' + rs(MT.capital) + '.\n\nAssets are **non-current** (tangible or intangible) or **current**; liabilities are **non-current** (due after twelve months) or **current**.',
      terms: [
        ['Entity', 'A person or organisation with a separate existence for which records are kept.'],
        ['Business transaction', 'An exchange of money or money\'s worth between the firm and another party, measurable in money.'],
        ['Capital', 'The amount invested by the owner in the business, with profits left in it.'],
        ['Drawings', 'Cash or goods withdrawn by the owner for personal use.'],
        ['Asset', 'A resource owned by the firm from which future benefit is expected.'],
        ['Liability', 'An amount the firm is obliged to pay to outsiders.'],
        ['Intangible asset', 'A non-current asset without physical form that has value, such as a patent or goodwill.'],
      ],
      v: vTree,
      vs: [vMTcap, vAssets, vLiab],
    },
    {
      h: '6. Expenditure, expense, income, profit, gain and loss',
      t: 3,
      b: '**Capital expenditure** gives a benefit lasting more than a year or adds to an asset (a van, installing a machine) and goes to the balance sheet. **Revenue expenditure** is used up within the year (wages, repairs) and is charged to the profit and loss account.\n\nAn **expense** is a cost incurred to earn revenue; **income** is what the firm earns; **profit** = income − expenses (Kaveri Bakery: ' + rs(KP.income_) + ' − ' + rs(KP.expense_) + ' = ' + rs(KP.profit) + '). A **gain** comes from an incidental event (' + rs(GL.gain) + ' on selling an old computer above book value); a **loss** is a fall in capital with no benefit in return.',
      terms: [
        ['Capital expenditure', 'Spending that gives a benefit for more than one year or adds to the value of an asset.'],
        ['Revenue expenditure', 'Spending whose benefit is used up in the current accounting year.'],
        ['Expense', 'A cost incurred in earning revenue.'],
        ['Income', 'Amount earned by the business from its main activity or otherwise.'],
        ['Profit', 'The excess of income over expenses of a period.'],
        ['Gain', 'A profit from an incidental or occasional event, not the main activity.'],
        ['Loss', 'A fall in the owner\'s capital that brings no benefit in return.'],
      ],
      v: vExp,
      vs: [vInc, vProfit, vCapRoll],
    },
    {
      h: '7. Discount, voucher, goods, purchases, sales, stock, debtors, creditors',
      t: 3,
      b: '**Trade discount** is allowed on the list price (not recorded); **cash discount** on the invoice amount for prompt payment (recorded). Bill of ' + rs(B1.list) + ' with ' + B1.tradePct + '% and ' + B1.cashPct + '%: invoice ' + rs(B1.invoice) + ', cash discount ' + rs(B1.cash) + ', paid ' + rs(B1.paid) + '.\n\n**Net purchases** = purchases − purchases return; **net sales** = sales − sales return. Closing stock of a year is the opening stock of the next. A **debtor** owes the firm; a **creditor** is owed by the firm.',
      terms: [
        ['Trade discount', 'A deduction from the list price, not entered in the books.'],
        ['Cash discount', 'A deduction from the invoice amount for prompt payment, entered in the books.'],
        ['Voucher', 'Documentary evidence of a transaction.'],
        ['Goods', 'Items bought for resale or manufacture and sold in the course of business.'],
        ['Purchases', 'Goods bought for resale or production, for cash or on credit.'],
        ['Sales', 'Goods sold, for cash or on credit.'],
        ['Opening stock', 'Unsold goods at the start of an accounting period.'],
        ['Closing stock', 'Unsold goods at the end of an accounting period.'],
        ['Debtor', 'A person who owes money to the firm for goods or services received on credit.'],
        ['Creditor', 'A person to whom the firm owes money for goods or services received on credit.'],
      ],
      v: vDisc,
      vs: [vBill, vGoods, vStock, vNet],
    },
  ],
  tips: '**Common mistakes**\n- Writing that book-keeping includes interpretation: it covers recording and classifying only.\n- Treating drawings as an expense: they reduce capital.\n- Entering trade discount in the books: only the net invoice amount is entered.\n- Calculating cash discount on the list price: it is on the invoice amount.\n- Calling repairs capital expenditure: repairs that only maintain an asset are revenue expenditure.\n\n**Tips:** write the stages of the process in a definition; name the user and what the user needs; show assets minus liabilities as working for capital; give an example with each definition; split a classification question into one line per item.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Define **accounting**.', 'The process of identifying, measuring, recording, classifying, summarising, analysing, interpreting and communicating financial information to users.', 'definition', 1],
  ['What is **book-keeping**?', 'The recording and classifying of transactions; the first part of accounting.', 'definition', 1],
  ['Name the **branches of accounting**.', 'Financial accounting, cost accounting and management accounting.', 'fact', 1],
  ['Name the **objectives of accounting**.', 'Systematic records; profit or loss; financial position; information to users.', 'fact', 1],
  ['List the **roles of accounting**.', 'Language of business; historical record; current economic reality; information system; service to users.', 'fact', 1],
  ['Which users are **internal**?', 'Owners, management and employees.', 'concept', 1],
  ['Which users are **external**?', 'Banks and lenders, investors, suppliers and creditors, government and tax authorities, consumers, researchers.', 'concept', 1],
  ['What does a **lender** want from accounts?', 'Ability of the firm to pay interest and repay the loan.', 'concept', 1],
  ['What does a **tax authority** want from accounts?', 'The profit on which tax is payable.', 'concept', 1],
  ['What does an **employee** want from accounts?', 'Ability to pay wages and bonus; job security.', 'concept', 1],
  ['Parts of **reliability**', 'Verifiability, neutrality and faithful representation.', 'concept', 2],
  ['Parts of **relevance**', 'Timeliness, predictive value and feedback value.', 'concept', 2],
  ['What is **verifiability**?', 'Independent persons using the same evidence reach the same figure.', 'definition', 2],
  ['What is **neutrality**?', 'Freedom from bias towards any user.', 'definition', 2],
  ['What is **comparability**?', 'Ability to compare across periods and across firms, which needs consistent methods.', 'definition', 2],
  ['What is **understandability**?', 'Information is clear to users with reasonable knowledge.', 'definition', 2],
  ['Define **entity**.', 'A person or organisation with a separate existence for which records are kept.', 'definition', 3],
  ['Define **business transaction**.', 'An exchange of money or money\'s worth between the firm and another party, measurable in money.', 'definition', 3],
  ['Define **capital**.', 'The amount invested by the owner, with profits left in the business.', 'definition', 3],
  ['Define **drawings**.', 'Cash or goods withdrawn by the owner for personal use; they reduce capital.', 'definition', 3],
  ['Formula for **capital**', 'Capital = assets − liabilities.', 'formula', 3],
  ['**Non-current assets**: two kinds', 'Tangible (land, machinery) and intangible (patents, goodwill).', 'concept', 3],
  ['**Current asset**', 'Held for sale or expected to turn into cash within twelve months: stock, debtors, cash.', 'definition', 3],
  ['**Current liability**', 'Due within twelve months or the operating cycle: creditors, outstanding expenses.', 'definition', 3],
  ['**Capital expenditure**', 'Benefit for more than a year or adds to an asset, for example buying a van.', 'definition', 3],
  ['**Revenue expenditure**', 'Benefit used up in the current year, for example wages and repairs.', 'definition', 3],
  ['Formula for **profit**', 'Profit = income − expenses.', 'formula', 3],
  ['**Gain** versus **loss**', 'A gain is profit from an incidental event; a loss is a fall in capital with no benefit in return.', 'concept', 3],
  ['**Trade discount** versus **cash discount**', 'Trade: on list price, not recorded. Cash: on invoice amount for prompt payment, recorded.', 'concept', 3],
  ['Formulas for **net purchases** and **net sales**', 'Purchases − purchases return; sales − sales return.', 'formula', 3],
  ['**Debtor** and **creditor**', 'A debtor owes the firm; a creditor is owed by the firm.', 'definition', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Introduction to Accounting',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bank_need', 'm_neutral', 'm_capex', 'ar_reliable'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_users_ie', 's_trade_cash', 's3_users_needs'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_meaning_obj', 'l_classify'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_loan'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Introduction to Accounting',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bk_scope', 'm_branch_cost', 'm_hist', 'm_late_report', 'm_compare', 'm_drawings', 'm_gain', 'm_net_sales', 'ar_lender', 'ar_drawings'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_bk_diff', 's_cap_draw', { attempt: 1, keys: ['s_language', 's_compar'] }, 's3_chars_cases', { attempt: 1, keys: ['s3_classify6', 's3_disc_calc'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each where a word limit applies.', items: ['l_users', { attempt: 1, keys: ['l_chars', 'l_equation'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_late', 'c_lists'] },
  ],
});

void sum; void same; void B2; void IC; void CD;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-accountancy-ch01 only (meaning, objectives, role and users; qualitative characteristics; basic accounting terms)',
    originality: 'every firm, owner, customer and figure is imagined and written by SOYL; no NCERT text, illustration, example or exercise and no board or sample-paper item reused (D-036)',
    figures: 'every amount computed with acc.mjs or figs.mjs and asserted with same(); stems, tables and model answers use the computed values',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
