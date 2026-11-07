// Build CBSE 11 Accountancy ch08 Financial Statements I. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { journal } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch08', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const F = await import('./figures.mjs');
const { same, check, sum, inr, rs, rupees, classify, FT, GB } = F;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (headers, rows, alt) => table(headers, rows, alt);
/** The closing entries of a firm for the given steps, as a journal table. */
const jsub = (f, steps) => journal(f.E.filter((e) => steps.includes(e.step)));

// ================================================================ figures (SVG)
/** Box with centred text lines; throws if a line is too wide for the box (text width about 0.56 of the font size per character). */
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  const size = o.size ?? 13;
  check(lines.length * gap <= h + 2, `svg box too short for its lines: "${lines[0]}"`);
  lines.forEach((t, i) => {
    check(t.length * size * 0.56 <= w - 8, `svg label too wide for its box: "${t}"`);
    s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size, bold: o.bold && i === 0 });
  });
};

const vFlow = (() => {
  const s = new Svg(800, 170);
  const xs = [100, 300, 500, 700];
  const labels = [['Trial balance', 'balances of all', 'ledger accounts'], ['Trading Account', 'gross profit', 'or gross loss'], ['Profit and Loss', 'Account', 'net profit or loss'], ['Balance Sheet', 'assets and', 'liabilities']];
  labels.forEach((l, i) => box(s, xs[i], 52, 160, 76, l, { bold: true, fill: i === 0 ? 'accent' : 'fill', gap: 20 }));
  for (let i = 0; i < 3; i++) s.arrow(xs[i] + 80, 52, xs[i + 1] - 80, 52, { sw: 1.8 });
  s.text(300, 112, 'gross profit carried down', { size: 12, muted: true });
  s.text(500, 112, 'net profit added to capital', { size: 12, muted: true });
  s.text(400, 148, 'Closing stock is given outside the trial balance and enters two places', { size: 12 });
  return s.visual('Flow from the trial balance to the Trading Account, which gives the gross profit or loss, to the Profit and Loss Account, which gives the net profit or loss, to the Balance Sheet, which shows assets and liabilities; closing stock is given outside the trial balance and enters the Trading Account and the Balance Sheet', 'The route from the trial balance to the financial statements.');
})();

const vDirInd = (() => {
  const s = new Svg(760, 310);
  box(s, 190, 30, 300, 40, 'Direct expenses (Trading Account)', { fill: 'accent', bold: true });
  box(s, 570, 30, 300, 40, 'Indirect expenses (Profit and Loss)', { fill: 'accent', bold: true });
  box(s, 190, 150, 300, 150, ['Wages', 'Carriage inwards', 'Freight inwards', 'Power and fuel', 'Customs or import duty', 'Dock and clearing charges'], { gap: 22 });
  box(s, 190, 258, 300, 56, ['Costs of buying or making goods and', 'bringing them to a saleable state'], { fill: 'none', color: 'muted', size: 12, gap: 20 });
  [['Office and administrative', 'Salaries, rent, insurance, audit fee'], ['Selling and distribution', 'Advertising, carriage outwards'], ['Financial', 'Interest on loan, discount allowed']].forEach((l, i) => box(s, 570, 110 + i * 66, 300, 56, l, { size: 12, gap: 21 }));
  s.text(570, 296, 'Losses of the year are debited here as well', { size: 12, muted: true });
  return s.visual('Chart of direct and indirect expenses: direct expenses such as wages, carriage inwards, freight inwards, power and fuel, customs or import duty and dock charges go to the Trading Account; indirect expenses, grouped as office and administrative, selling and distribution, and financial, go to the Profit and Loss Account, together with losses', 'Direct expenses go to the Trading Account; indirect expenses go to the Profit and Loss Account.');
})();

const vCapRev = (() => {
  const s = new Svg(760, 330);
  box(s, 190, 28, 300, 38, 'Capital expenditure', { fill: 'accent', bold: true, size: 14 });
  box(s, 570, 28, 300, 38, 'Revenue expenditure', { fill: 'accent', bold: true, size: 14 });
  box(s, 190, 120, 300, 104, ['Benefit lasts more than one year', 'Buys or improves a fixed asset', 'Not repeated every year', 'Shown as an asset in the Balance Sheet'], { size: 12, gap: 24 });
  box(s, 570, 120, 300, 104, ['Benefit used up within the year', 'Runs the business, maintains assets', 'Recurs every year', 'Charged to Trading or Profit and Loss'], { size: 12, gap: 24 });
  box(s, 190, 236, 300, 72, ['Examples', 'Machinery, furniture, land;', 'carriage and fitting on a machine'], { size: 12, gap: 21, fill: 'none', color: 'muted' });
  box(s, 570, 236, 300, 72, ['Examples', 'Wages, rent, repairs, electricity;', 'carriage on goods bought for resale'], { size: 12, gap: 21, fill: 'none', color: 'muted' });
  s.text(380, 308, 'Heavy advertising: a revenue item whose benefit spreads over several years (deferred)', { size: 12 });
  return s.visual('Chart of capital expenditure and revenue expenditure. Capital expenditure: benefit lasts more than one year, buys or improves a fixed asset, is not repeated every year and is shown as an asset in the Balance Sheet; examples are machinery, furniture, land, and carriage and fitting on a machine. Revenue expenditure: benefit is used up within the year, runs the business or maintains assets, recurs every year and is charged to the Trading or Profit and Loss Account; examples are wages, rent, repairs, electricity and carriage on goods bought for resale. Heavy advertising is a deferred revenue item', 'Capital and revenue expenditure compared.');
})();

const vOrder = (() => {
  const perm = FT.bsPerm.rows.slice(0, 6).map((r) => r[2]);
  const liq = [...perm].reverse();
  same(perm.length, 6, 'six assets of Farhan Textiles');
  check(FT.bsLiq.rows.slice(0, 6).every((r, i) => r[2] === liq[i]), 'liquidity order is the reverse of the permanence order');
  const s = new Svg(760, 340);
  box(s, 170, 26, 250, 36, 'Order of permanence', { fill: 'accent', bold: true, size: 14 });
  box(s, 590, 26, 250, 36, 'Order of liquidity', { fill: 'accent', bold: true, size: 14 });
  perm.forEach((n, i) => box(s, 170, 80 + i * 40, 250, 32, n, { size: 13 }));
  liq.forEach((n, i) => box(s, 590, 80 + i * 40, 250, 32, n, { size: 13 }));
  s.arrow(325, 70, 325, 270, { sw: 1.6, color: 'muted' });
  s.arrow(745, 70, 745, 270, { sw: 1.6, color: 'muted' });
  s.text(170, 308, 'Fixed assets first, cash last', { size: 12 });
  s.text(590, 308, 'Cash first, fixed assets last', { size: 12 });
  return s.visual(`Two orders for the assets of Farhan Textiles. In the order of permanence the assets run ${perm.join(', ')}, from the most permanent to the least permanent. In the order of liquidity the same assets run ${liq.join(', ')}, from the most liquid to the least liquid`, 'The same assets in the order of permanence and the order of liquidity.');
})();

// ================================================================ tables for slides
const vCap = T(['Feature', 'What it means'], [
  ['Benefit', 'Lasts for more than one accounting year'],
  ['Purpose', 'To acquire a fixed asset, or to improve one so that it earns more or lasts longer'],
  ['Nature', 'Non-recurring: it is not spent again every year'],
  ['Where shown', 'As an asset in the Balance Sheet'],
  ['Examples', 'Land, machinery, furniture; carriage and fitting charges on a new machine; legal fees on buying a building'],
], 'Table of the features of capital expenditure: benefit for more than one year, purpose of acquiring or improving a fixed asset, non-recurring, shown as an asset, with examples');
const vRev = T(['Feature', 'What it means'], [
  ['Benefit', 'Used up within the accounting year'],
  ['Purpose', 'To run the business or to maintain the assets in their working condition'],
  ['Nature', 'Recurring: it is spent again every year'],
  ['Where shown', 'Charged to the Trading Account or the Profit and Loss Account'],
  ['Examples', 'Wages, rent, salaries, repairs, electricity; carriage on goods bought for resale'],
], 'Table of the features of revenue expenditure: benefit within the year, purpose of running the business or maintaining assets, recurring, charged to the Trading or Profit and Loss Account, with examples');
const vReceipts = T(['Item', 'Meaning', 'Examples'], [
  ['Capital receipt', 'Money received that does not come from the normal trading of the year and that adds to capital or reduces an asset', 'Capital brought in by the proprietor; a loan received; sale of a fixed asset'],
  ['Revenue receipt', 'Money received from the normal trading and incomes of the year', 'Sale of goods; commission, interest and rent received'],
  ['Deferred revenue expenditure', 'A revenue expense whose benefit lasts for several years, so the part not yet charged is carried forward', 'A heavy advertising campaign for a new product'],
], 'Table of capital receipts, revenue receipts and deferred revenue expenditure with meanings and examples');
const C1 = classify([
  ['Purchase of a loom', 150000, 'cap', 'A fixed asset'],
  ['Carriage paid on the loom', 3000, 'cap', 'Cost of bringing the asset to its place'],
  ['Cost of fixing the loom', 5000, 'cap', 'Cost of getting the asset ready'],
  ['Wages of the loom operators', 26000, 'rev', 'Used up in the year'],
  ['Oil and cleaning of the looms', 1800, 'rev', 'Maintains the asset'],
  ['Repainting the shop walls', 7000, 'rev', 'Maintains the building'],
  ['Heavy launch advertising, benefit for three years', 60000, 'def', 'Revenue item benefiting several years'],
]);
same(C1.cap, 158000, 'deck example capital total');
same(C1.rev, 34800, 'deck example revenue total');
same(C1.def, 60000, 'deck example deferred total');
const vC1 = T(C1.headers, C1.rows, `Classification of seven payments of Farhan Textiles: the loom, its carriage and its fixing, ${inr(C1.cap)} rupees in all, are capital expenditure; wages, oil and cleaning, and repainting, ${inr(C1.rev)} rupees in all, are revenue expenditure; the launch advertising of ${inr(C1.def)} rupees is deferred revenue expenditure`);
const vWhy = T(['Wrong treatment', 'Effect on profit', 'Effect on the asset'], [
  ['A capital item is charged as an expense', 'Profit understated', 'Asset understated'],
  ['A revenue item is added to an asset', 'Profit overstated', 'Asset overstated'],
  ['Each item is treated correctly', 'Profit is correct', 'Asset is correctly valued'],
], 'Table of the effect on profit and on the asset when a capital item is charged as an expense, when a revenue item is added to an asset, and when both are treated correctly');
const W = { np0: 90000, fit: 8000, rep: 3000 };
W.np = same(W.np0 + W.fit - W.rep, 95000, 'deck wrong-treatment corrected profit');
const vW = T(['Sheetal Dyers: item', 'Wrongly debited to', 'Effect on profit', 'Effect on the asset'], [
  [`Fitting charges of a new machine ${rs(W.fit)}`, 'Wages', `Understated by ${rs(W.fit)}`, `Machinery understated by ${rs(W.fit)}`],
  [`Repairs of the building ${rs(W.rep)}`, 'Building', `Overstated by ${rs(W.rep)}`, `Building overstated by ${rs(W.rep)}`],
  [`Reported profit ${rs(W.np0)}`, '', `${inr(W.np0)} + ${inr(W.fit)} − ${inr(W.rep)}`, `Correct profit ${rs(W.np)}`],
], `Effect of two wrong treatments in Sheetal Dyers: fitting charges of ${inr(W.fit)} rupees charged to wages understate profit and the machinery; repairs of ${inr(W.rep)} rupees added to the building overstate profit and the building; the reported profit of ${inr(W.np0)} rupees becomes ${inr(W.np)} rupees`);
const vStake = T(['Stakeholder', 'What the statements tell them'], [
  ['Proprietor', 'The profit earned and the value of the capital'],
  ['Lenders and banks', 'Whether interest and the loan can be repaid'],
  ['Suppliers on credit', 'Whether the firm can pay its dues on time'],
  ['Employees', 'The strength of the business and its capacity to pay'],
  ['Tax authorities', 'The profit on which tax is assessed'],
], 'Table of five stakeholders of a business and what the financial statements tell each of them: proprietor, lenders and banks, suppliers on credit, employees and tax authorities');
const vTrItems = T(['Debit side', 'Credit side'], [
  ['Opening stock', 'Sales less sales returns'],
  ['Purchases less purchases returns', 'Closing stock'],
  ['Direct expenses: wages, carriage inwards, freight, power and fuel, import duty', 'Gross loss, if the debit side is larger'],
  ['Gross profit, if the credit side is larger', ''],
], 'Table of the items on the debit side and the credit side of the Trading Account, with the gross profit or gross loss as the balancing figure');
const vFTtb = T(FT.tb.headers, FT.tb.rows, `Trial balance of Farhan Textiles on 31 March 2026: twenty accounts, the debit column and the credit column each totalling ${inr(FT.tb.dr)} rupees; closing stock of ${inr(FT.closing)} rupees is given outside the trial balance`);
const vFTwhere = T(['Account', 'Amount (₹)', 'Side', 'Where it goes'], FT.where, `Where each of the twenty trial balance items of Farhan Textiles goes: each item is used exactly once in the Trading Account, the Profit and Loss Account or the Balance Sheet`);
const vFTtr = T(FT.tr.headers, FT.tr.rows, `Trading Account of Farhan Textiles for the year ended 31 March 2026: debit side opening stock ${inr(FT.os)}, net purchases ${inr(FT.netPur)}, carriage inwards ${inr(FT.dexp[0].amt)} and wages ${inr(FT.dexp[1].amt)}; credit side net sales ${inr(FT.netSale)} and closing stock ${inr(FT.closing)}; gross profit ${inr(FT.gp)} rupees`);
const vSum1 = T(['Topic', 'Key points'], [
  ['Capital expenditure', 'Benefit beyond one year; acquires or improves a fixed asset; non-recurring; an asset'],
  ['Revenue expenditure', 'Benefit within the year; runs the business or maintains assets; recurring; charged to the accounts'],
  ['Why it matters', 'A wrong class misstates both the profit and the asset values'],
  ['Trading Account', 'Opening stock, net purchases and direct expenses against net sales and closing stock give the gross result'],
  ['Direct and indirect', 'Direct expenses go to the Trading Account; indirect expenses go to the Profit and Loss Account'],
], 'Summary table of capital and revenue expenditure, the importance of the distinction, the Trading Account and the direct and indirect expenses');
const vTips1 = T(['Do', 'Why'], [
  ['Name the class and give the reason for each item', 'The reason carries the marks'],
  ['Add carriage and fitting charges to the cost of a new asset', 'They are a cost of getting the asset ready'],
  ['Deduct returns from purchases and from sales', 'The statement shows net figures'],
  ['Put closing stock on the credit side of the Trading Account', 'Otherwise the gross profit is wrong'],
  ['Write the heading with the firm, the account and the year', 'It is part of the standard format'],
], 'Exam tips table for capital and revenue items and the Trading Account');

const vPlItems = T(['Debit side', 'Credit side'], [
  ['Gross loss, if any, brought down', 'Gross profit, brought down'],
  ['Office and administrative expenses: salaries, rent, insurance', 'Other incomes: commission, interest and rent received, discount received'],
  ['Selling and distribution expenses: advertising, carriage outwards', 'Net loss, if the debit side is larger'],
  ['Financial expenses: interest on loan, discount allowed', ''],
  ['Losses; net profit, if the credit side is larger', ''],
], 'Table of the items on the debit side and the credit side of the Profit and Loss Account, with the net profit or net loss as the balancing figure');
const vFTpl = T(FT.pl.headers, FT.pl.rows, `Profit and Loss Account of Farhan Textiles for the year ended 31 March 2026: debit side salaries ${inr(FT.iexp[0].amt)}, rent ${inr(FT.iexp[1].amt)} and advertising ${inr(FT.iexp[2].amt)}; credit side gross profit ${inr(FT.gp)} and commission received ${inr(FT.inc[0].amt)}; net profit ${inr(FT.np)} rupees`);
const vBsItems = T(['Liabilities side', 'Assets side'], [
  ['Capital: opening capital plus net profit less drawings', 'Fixed assets: land, building, machinery, furniture'],
  ['Long-term liabilities: a loan repayable after more than a year', 'Investments held for the long term'],
  ['Current liabilities: creditors, bills payable, outstanding amounts due within a year', 'Current assets: closing stock, debtors, bank, cash'],
], 'Table of the items on the liabilities side and the assets side of a Balance Sheet: capital, long-term liabilities and current liabilities against fixed assets, investments and current assets');
const vGroup = T(['Term', 'Meaning', 'Example from Farhan Textiles'], [
  ['Grouping', 'Putting items of the same nature together under one head', 'Debtors, closing stock and cash at bank under current assets'],
  ['Marshalling', 'Arranging the groups and the items in a definite order', 'Fixed assets first and cash last, or cash first and fixed assets last'],
], 'Table defining grouping as putting items of the same nature under one head and marshalling as arranging them in a definite order, with an example from Farhan Textiles');
const vFTbsP = T(FT.bsGrouped.headers, FT.bsGrouped.rows, `Balance Sheet of Farhan Textiles as on 31 March 2026 in the order of permanence, with groups: capital ${inr(FT.capClosing)}, bank loan ${inr(FT.ltl[0].amt)}, creditors ${inr(FT.cl[0].amt)}; machinery, furniture, investments, closing stock, debtors and cash at bank; each side totals ${inr(FT.total)} rupees`);
const vFTbsL = T(FT.bsLiq.headers, FT.bsLiq.rows, `Balance Sheet of Farhan Textiles as on 31 March 2026 in the order of liquidity: current liabilities, long-term liabilities and capital against cash at bank, debtors, closing stock, investments, furniture and machinery; each side totals ${inr(FT.total)} rupees`);
const vGBpl = T(GB.pl.headers, GB.pl.rows, `Profit and Loss Account of Gauri Bakery for the year ended 31 March 2025: gross profit ${inr(GB.gp)} and commission received ${inr(GB.inc[0].amt)} against salaries, rent and interest on loan totalling ${inr(GB.indirect)}; net loss ${inr(-GB.np)} rupees`);
const vSteps = T(['Step', 'Closing entry', 'What it does'], [
  ['1', 'Trading A/c Dr. To opening stock, purchases, sales returns, direct expenses', 'Closes the debit items of the Trading Account'],
  ['2', 'Sales A/c and Purchases Returns A/c Dr. To Trading A/c', 'Closes sales and purchases returns'],
  ['3', 'Closing Stock A/c Dr. To Trading A/c', 'Brings closing stock into the books'],
  ['4', 'Trading A/c Dr. To Profit and Loss A/c', 'Moves the gross profit'],
  ['5 and 6', 'Profit and Loss A/c Dr. To indirect expenses; incomes Dr. To Profit and Loss A/c', 'Closes the indirect expenses and the incomes'],
  ['7', 'Profit and Loss A/c Dr. To Capital A/c', 'Moves the net profit to capital'],
  ['8', 'Capital A/c Dr. To Drawings A/c', 'Moves the drawings against capital'],
], 'Table of the eight closing entries in order: debit items to the Trading Account, sales and returns, closing stock, gross profit, indirect expenses and incomes, net profit to capital, and drawings against capital');
const vFTc1 = T(jsub(FT, [1, 2, 3, 4]).headers, jsub(FT, [1, 2, 3, 4]).rows, `Closing entries of Farhan Textiles, steps 1 to 4: Trading A/c Dr ${inr(FT.E[0].dr[0][1])} to opening stock, purchases, sales returns, carriage inwards and wages; sales and purchases returns to Trading A/c; closing stock ${inr(FT.closing)}; gross profit ${inr(FT.gp)} to Profit and Loss A/c`);
const vFTc2 = T(jsub(FT, [5, 6, 7, 8]).headers, jsub(FT, [5, 6, 7, 8]).rows, `Closing entries of Farhan Textiles, steps 5 to 8: indirect expenses ${inr(FT.indirect)} and commission ${inr(FT.incomes)} to Profit and Loss A/c; net profit ${inr(FT.np)} to Capital A/c; drawings ${inr(FT.draw)} against Capital A/c`);
const vLoss = T(['Result', 'Closing entry'], [
  ['Gross profit', 'Trading A/c Dr. To Profit and Loss A/c'],
  ['Gross loss', 'Profit and Loss A/c Dr. To Trading A/c'],
  ['Net profit', 'Profit and Loss A/c Dr. To Capital A/c'],
  ['Net loss', 'Capital A/c Dr. To Profit and Loss A/c'],
], 'Table of the closing entries for a gross profit, a gross loss, a net profit and a net loss');
const vOpenRules = T(['Point', 'Rule'], [
  ['When', 'On the first day of the new year'],
  ['Why', 'To bring forward the balances shown in the last Balance Sheet'],
  ['Debited', 'Every asset, including the closing stock as Stock A/c'],
  ['Credited', 'The Capital A/c and every liability'],
  ['Not carried', 'Expenses and incomes, because they were closed'],
], 'Table of the rules of the opening entry: passed on the first day of the new year to bring forward balances, debiting every asset and crediting capital and every liability, while closed expenses and incomes are not carried');
const vFTopen = T(FT.opening.headers, FT.opening.rows, `Opening entry of Farhan Textiles on 1 April 2026: assets Dr machinery ${inr(FT.fa[0].amt)}, furniture ${inr(FT.fa[1].amt)}, investments ${inr(FT.inv[0].amt)}, stock ${inr(FT.closing)}, debtors ${inr(FT.ca[0].amt)} and cash at bank ${inr(FT.ca[1].amt)}; to Capital A/c ${inr(FT.capClosing)}, Bank Loan ${inr(FT.ltl[0].amt)} and Creditors ${inr(FT.cl[0].amt)}; total ${inr(FT.opening.total)} rupees`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Profit and Loss Account', 'Indirect expenses and losses against gross profit and other incomes give the net profit or net loss'],
  ['Balance Sheet', 'Capital with profit and drawings, loans and creditors against assets; the two totals agree'],
  ['Grouping and marshalling', 'Like items under one head; heads arranged by liquidity or by permanence'],
  ['Closing entries', 'Nominal accounts are closed through the Trading and Profit and Loss Accounts; profit and drawings go to capital'],
  ['Opening entry', 'Assets debited; capital and liabilities credited, on the first day of the new year'],
], 'Summary table of the Profit and Loss Account, the Balance Sheet, grouping and marshalling, closing entries and the opening entry');
const vTips2 = T(['Do', 'Why'], [
  ['Show opening capital, net profit and drawings in the capital line', 'The closing capital is a computed figure'],
  ['Show the gross profit on the credit side of the Profit and Loss Account', 'It is the starting income'],
  ['Mention the order, permanence or liquidity, in the heading', 'The two orders reverse each other'],
  ['Write the narration under every journal entry', 'It is part of the standard format'],
  ['Check that the Balance Sheet totals agree', 'A difference signals an error'],
], 'Exam tips table for the Profit and Loss Account, the Balance Sheet, closing entries and the opening entry');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Financial Statements I — Part 1: Capital and Revenue Items; the Trading Account',
  goals: [
    'Distinguish capital expenditure, revenue expenditure and deferred revenue expenditure, and capital and revenue receipts',
    'Explain why a wrong classification misstates profit and asset values',
    'Prepare the Trading Account of a sole proprietor and separate direct from indirect expenses',
  ],
  slides: [
    sl('title', 'From the trial balance to the final accounts', {
      b: 'Part 1: **capital and revenue items**, and the **Trading Account**.',
      v: vFlow,
      n: 'At the end of the year a sole proprietor turns the trial balance into financial statements. The Trading Account gives the gross profit, the Profit and Loss Account gives the net profit, and the Balance Sheet shows assets and liabilities. First, we learn to separate capital items from revenue items, because that decides what goes where. We work with an imagined firm, Farhan Textiles.',
    }),
    sl('concept', 'Capital expenditure', {
      b: '**Capital expenditure** gives a benefit for more than one accounting year and acquires or improves a fixed asset.',
      v: vCap,
      n: 'Capital expenditure gives a benefit for more than one accounting year. It is spent to acquire a fixed asset, or to improve one so that it earns more or lasts longer. It is not repeated every year, and it appears as an asset in the balance sheet. Carriage and fitting charges on a new machine are part of its cost, so they are capital expenditure too.',
    }),
    sl('concept', 'Revenue expenditure', {
      b: '**Revenue expenditure** is used up within the year, in running the business or maintaining the assets.',
      v: vRev,
      n: 'Revenue expenditure gives its benefit within the accounting year. It is spent to run the business or to keep the assets in working condition, and it recurs every year. It is charged to the trading account or the profit and loss account. Wages, rent, repairs and electricity are examples, and so is carriage on goods bought for resale.',
    }),
    sl('concept', 'Capital and revenue expenditure side by side', {
      v: vCapRev,
      n: 'Compare the two columns. Capital expenditure buys or improves a fixed asset, gives a benefit beyond the year and is shown as an asset. Revenue expenditure keeps the business running, is used up within the year and is charged against profit. Ask two questions about any payment. Does it create or improve an asset? Is its benefit longer than one year?',
    }),
    sl('check', 'Quick check: classify the payment', {
      b: 'Decide the class of the fitting charges paid by an imagined printing press.',
      chk: 'm_classify_chk',
      n: 'Think about what the payment achieves. Does it help get a fixed asset ready for use, or does it only keep something working? That decides whether the cost belongs with the asset or with the expenses of the year.',
    }),
    sl('concept', 'Receipts, and deferred revenue expenditure', {
      v: vReceipts,
      n: 'Receipts are classified in the same way. A capital receipt does not come from the trading of the year, for example capital brought in by the proprietor, a loan, or the sale of a fixed asset. A revenue receipt comes from trading and incomes, such as sales and commission. A heavy advertising campaign is a revenue item whose benefit lasts several years, so it is called deferred revenue expenditure.',
    }),
    sl('example', 'Worked example 1: classify the payments of Farhan Textiles', {
      b: `**Farhan Textiles**, an imagined firm, made seven payments. Capital: **${rs(C1.cap)}**; revenue: **${rs(C1.rev)}**; deferred: **${rs(C1.def)}**.`,
      bl: ['The loom, its carriage and its fixing are all capital.', 'Wages, oil and repainting are used up within the year.'],
      v: vC1,
      n: `Farhan Textiles, an imagined firm, made seven payments. The loom, the carriage on it and the cost of fixing it are capital expenditure, which comes to ${rupees(C1.cap)}. Wages, oil and cleaning, and repainting are revenue expenditure, which comes to ${rupees(C1.rev)}. The launch advertising of ${rupees(C1.def)} is deferred revenue expenditure, because its benefit lasts three years.`,
    }),
    sl('concept', 'Why the distinction matters', {
      v: vWhy,
      n: 'The class of an item decides where it is recorded, so a wrong class misstates two things at once. If a capital item is charged as an expense, profit is understated and the asset is understated. If a revenue item is added to an asset, profit is overstated and the asset is overstated. The owner, the lenders and the tax authorities all rely on correct figures.',
    }),
    sl('example', 'Worked example 2: the effect of two wrong treatments', {
      b: `**Sheetal Dyers**, an imagined firm, reported a profit of **${rs(W.np0)}**. After correcting two items, the profit is **${rs(W.np)}**.`,
      v: vW,
      n: `Sheetal Dyers, an imagined firm, reported a profit of ${rupees(W.np0)}. Fitting charges of ${rupees(W.fit)} were charged to wages, so profit was understated and the machine was understated. Repairs of ${rupees(W.rep)} were added to the building, so profit was overstated and the building was overstated. The correct profit is ${rupees(W.np)}.`,
    }),
    sl('check', 'Quick check: the cost of a machine', {
      b: 'Find the amount to be debited to the machinery account of an imagined firm.',
      chk: 'n_capcost_chk',
      n: 'Add every payment that was needed to bring the new machine to the factory and make it ready to work. Leave out anything spent on a different, old machine, because that is a repair and belongs to the expenses of the year.',
    }),
    sl('concept', 'Who reads the financial statements?', {
      v: vStake,
      n: 'Financial statements are read by many people. The proprietor looks at the profit and the capital. Lenders and banks look at whether interest and the loan can be repaid. Suppliers on credit look at whether dues will be paid on time. Employees look at the strength of the business, and the tax authorities look at the profit on which tax is assessed.',
    }),
    sl('concept', 'The Trading Account', {
      b: 'The **Trading Account** finds the **gross profit** or **gross loss** from buying and selling goods.',
      v: vTrItems,
      n: 'The trading account is prepared to find the gross profit or gross loss. On the debit side go opening stock, purchases less returns, and direct expenses. On the credit side go sales less returns and closing stock. If the credit side is larger, the difference is the gross profit. If the debit side is larger, the difference is the gross loss.',
    }),
    sl('concept', 'Direct and indirect expenses', {
      v: vDirInd,
      n: 'Direct expenses are the costs of buying or making the goods and bringing them to a saleable state, for example wages, carriage inwards, freight, power and fuel, and import duty. They are debited to the trading account. Indirect expenses are the office, selling and financial costs, such as salaries, rent, advertising, carriage outwards and interest. They are debited to the profit and loss account.',
    }),
    sl('check', 'Quick check: direct or indirect?', {
      b: 'Decide where carriage on purchases is shown for an imagined hardware shop.',
      chk: 'm_direct_chk',
      n: 'Ask whether the cost helps to get the goods ready for sale, or whether it is a running cost of the office or of selling. Carriage on goods bought is incurred to bring the goods to the godown.',
    }),
    sl('example', 'Worked example 3: the trial balance of Farhan Textiles', {
      b: `The trial balance of **Farhan Textiles** on 31 March 2026 has twenty accounts and totals **${rs(FT.tb.dr)}** on each side. Closing stock of **${rs(FT.closing)}** is given outside it.`,
      v: vFTtb,
      n: `This is the trial balance of Farhan Textiles, an imagined firm, on the last day of March two thousand twenty six. It has twenty accounts, and each column totals ${rupees(FT.tb.dr)}. Closing stock of ${rupees(FT.closing)} is not in the trial balance. It is given separately, because the stock was counted and valued at the end of the year.`,
    }),
    sl('example', 'Worked example 4: where each item goes', {
      b: 'Every balance of the trial balance is used **exactly once**, in the Trading Account, the Profit and Loss Account or the Balance Sheet.',
      v: vFTwhere,
      n: 'Look at the last column. Opening stock, purchases, wages and carriage inwards go to the trading account, with returns deducted from purchases and sales. Salaries, rent, advertising and commission go to the profit and loss account. Drawings, capital, the loan, creditors and the assets go to the balance sheet. Every balance is used once and only once.',
    }),
    sl('example', 'Worked example 5: the Trading Account of Farhan Textiles', {
      b: `Net sales plus closing stock exceed the debit items, so the gross profit is **${rs(FT.gp)}**.`,
      bl: [`Net purchases: ${rs(FT.pur)} less ${rs(FT.pret)} returns = ${rs(FT.netPur)}.`, `Net sales: ${rs(FT.sale)} less ${rs(FT.sret)} returns = ${rs(FT.netSale)}.`],
      v: vFTtr,
      n: `Net purchases are purchases less purchases returns, which is ${rupees(FT.netPur)}. Net sales are sales less sales returns, which is ${rupees(FT.netSale)}. The debit side holds opening stock, net purchases, carriage inwards and wages. The credit side holds net sales and closing stock. The credit side is larger, so the gross profit is ${rupees(FT.gp)}.`,
    }),
    sl('check', 'Quick check: gross profit', {
      b: 'Find the gross profit of an imagined store from its trading figures.',
      chk: 'n_gp_chk',
      n: 'Add net sales and closing stock on the credit side. Add opening stock, purchases and direct expenses on the debit side. The gross profit is the difference between the two sides.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['Capital expenditure: benefit beyond a year, acquires or improves a fixed asset.', 'Revenue expenditure: used up within the year, charged to the accounts.', 'The Trading Account gives the gross profit or gross loss.'],
      v: vSum1,
      n: 'To sum up. Capital expenditure gives a benefit beyond one year and acquires or improves a fixed asset. Revenue expenditure is used up within the year and is charged to the accounts. A wrong class misstates both profit and asset values. The trading account sets net sales and closing stock against opening stock, net purchases and direct expenses to find the gross profit or gross loss.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the class and the reason for each item.', 'Add carriage and fitting to the cost of a new asset.', 'Deduct returns, and show closing stock on the credit side.'],
      v: vTips1,
      n: 'In the examination, give the class of each item and the reason. Add carriage and fitting charges to the cost of a new asset. Deduct returns from purchases and from sales. Show closing stock on the credit side of the trading account, or the gross profit will be wrong. Write the heading with the name of the firm, the account and the year.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Financial Statements I — Part 2: Profit and Loss Account, Balance Sheet, Closing and Opening Entries',
  goals: [
    'Prepare the Profit and Loss Account and the Balance Sheet of a sole proprietor without adjustments',
    'Group and marshal the items of a Balance Sheet in the order of permanence and the order of liquidity',
    'Pass the closing entries and the opening entry from the same trial balance',
  ],
  slides: [
    sl('title', 'Net profit, balance sheet and the entries that close the year', {
      b: 'Part 2: the **Profit and Loss Account**, the **Balance Sheet**, **closing entries** and the **opening entry**.',
      v: vFlow,
      n: 'In this part we complete the financial statements. The profit and loss account takes the gross profit and finds the net profit. The balance sheet shows what the business owns and owes. Then we pass the closing entries that move the year\'s results into capital, and the opening entry that starts the next year. We use Farhan Textiles throughout, and Gauri Bakery for a loss.',
    }),
    sl('concept', 'The Profit and Loss Account', {
      b: 'The **Profit and Loss Account** finds the **net profit** or **net loss** after the indirect expenses and the other incomes.',
      v: vPlItems,
      n: 'The profit and loss account starts with the gross profit on the credit side, together with other incomes such as commission and interest received. On the debit side go the indirect expenses, office and administrative, selling and distribution, and financial, and also losses. If the credit side is larger, the difference is the net profit. Otherwise it is a net loss.',
    }),
    sl('example', 'Worked example 1: the Profit and Loss Account of Farhan Textiles', {
      b: `Gross profit **${rs(FT.gp)}** and commission **${rs(FT.incomes)}** less indirect expenses **${rs(FT.indirect)}** give a net profit of **${rs(FT.np)}**.`,
      bl: [`Operating profit, an extra measure, is gross profit less operating expenses: ${rs(FT.gp)} − ${rs(FT.indirect)} = ${rs(FT.operating)}.`],
      v: vFTpl,
      n: `The credit side holds the gross profit of ${rupees(FT.gp)} and commission received of ${rupees(FT.incomes)}. The debit side holds salaries, rent and advertising, which total ${rupees(FT.indirect)}. The credit side is larger, so the net profit is ${rupees(FT.np)}. Operating profit is gross profit less operating expenses, which is ${rupees(FT.operating)}.`,
    }),
    sl('check', 'Quick check: net profit', {
      b: 'Find the net profit of an imagined store from its gross profit, expenses and income.',
      chk: 'n_np_chk',
      n: 'Add the gross profit and any other income. Then subtract all the indirect expenses. What is left is the net profit, which belongs to the proprietor.',
    }),
    sl('concept', 'The Balance Sheet', {
      b: 'The **Balance Sheet** is a statement of the assets and the liabilities of the business on a date. It is not an account.',
      v: vBsItems,
      n: 'The balance sheet shows the assets and liabilities on a given date. On the liabilities side are capital, which is opening capital plus net profit less drawings, long term liabilities, and current liabilities. On the assets side are fixed assets, investments and current assets. The two totals must agree.',
    }),
    sl('concept', 'Grouping and marshalling', {
      v: vGroup,
      n: 'Grouping means putting items of the same nature together under one head. Debtors, closing stock and cash at bank, for example, all go under current assets. Marshalling means arranging the groups, and the items inside them, in a definite order. There are two orders, the order of permanence and the order of liquidity.',
    }),
    sl('concept', 'Permanence and liquidity', {
      v: vOrder,
      n: 'The same assets can be arranged in two ways. In the order of permanence, the most permanent come first, so fixed assets such as machinery lead and cash comes last. In the order of liquidity, the most liquid come first, so cash leads and fixed assets come last. Liabilities follow the same idea, with capital first or last.',
    }),
    sl('example', 'Worked example 2: Balance Sheet in the order of permanence', {
      b: `Capital is **${rs(FT.capOpen)} + ${rs(FT.np)} − ${rs(FT.draw)} = ${rs(FT.capClosing)}**. Each side totals **${rs(FT.total)}**.`,
      v: vFTbsP,
      n: `Closing capital is opening capital of ${rupees(FT.capOpen)}, plus net profit of ${rupees(FT.np)}, less drawings of ${rupees(FT.draw)}, which is ${rupees(FT.capClosing)}. Capital, the loan and creditors are on the liabilities side. Fixed assets, investments and current assets, including closing stock, are on the assets side. Each side totals ${rupees(FT.total)}.`,
    }),
    sl('example', 'Worked example 3: the same Balance Sheet in the order of liquidity', {
      b: 'The same items, arranged from the most liquid to the least liquid. The totals do not change.',
      v: vFTbsL,
      n: `Now the same balance sheet in the order of liquidity. On the assets side cash at bank comes first, then debtors, closing stock, investments, furniture and machinery. On the liabilities side creditors come first, then the loan, and capital last. Only the order changes. Each side still totals ${rupees(FT.total)}.`,
    }),
    sl('example', 'Worked example 4: a gross profit that becomes a net loss', {
      b: `**Gauri Bakery**, an imagined bakery, earned a gross profit of **${rs(GB.gp)}**, but its indirect expenses were **${rs(GB.indirect)}**. Net loss: **${rs(-GB.np)}**.`,
      bl: [`Capital falls: ${rs(GB.capOpen)} − ${rs(-GB.np)} − ${rs(GB.draw)} = ${rs(GB.capClosing)}.`],
      v: vGBpl,
      n: `Gauri Bakery, an imagined bakery, earned a gross profit of ${rupees(GB.gp)}, and commission of ${rupees(GB.incomes)}. Its salaries, rent and interest on loan total ${rupees(GB.indirect)}. The debit side is larger, so there is a net loss of ${rupees(-GB.np)}. A net loss reduces capital, so closing capital is ${rupees(GB.capClosing)}.`,
    }),
    sl('concept', 'Closing entries', {
      b: '**Closing entries** transfer the balances of the nominal accounts to the Trading and Profit and Loss Accounts.',
      v: vSteps,
      n: 'Closing entries move the year\'s expenses and incomes into the final accounts. First the debit items go to the trading account, then sales and returns, then closing stock. The gross profit moves to the profit and loss account. The indirect expenses and incomes are closed into it. The net profit moves to capital, and finally the drawings are set against capital.',
    }),
    sl('check', 'Quick check: the closing stock entry', {
      b: 'Choose the entry that brings the closing stock of an imagined firm into the books.',
      chk: 'm_stock_entry',
      n: 'Closing stock is an asset, and it is also a credit in the trading account. Decide which account is debited and which is credited so that both facts are shown.',
    }),
    sl('example', 'Worked example 5: closing entries of Farhan Textiles, steps one to four', {
      b: 'The debit items, sales and returns, closing stock and the gross profit. The journal shows gross figures of purchases and sales returns.',
      v: vFTc1,
      n: `The first entry debits the trading account with ${rupees(FT.E[0].dr[0][1])} and credits opening stock, purchases, sales returns, carriage inwards and wages. The second entry closes sales and purchases returns. The third brings in the closing stock of ${rupees(FT.closing)}. The fourth moves the gross profit of ${rupees(FT.gp)} to the profit and loss account.`,
    }),
    sl('example', 'Worked example 6: closing entries of Farhan Textiles, steps five to eight', {
      b: 'The indirect expenses, the income, the net profit and the drawings.',
      v: vFTc2,
      n: `The indirect expenses of ${rupees(FT.indirect)} are closed into the profit and loss account, and so is the commission of ${rupees(FT.incomes)}. The net profit of ${rupees(FT.np)} is credited to capital. Last, capital is debited with the drawings of ${rupees(FT.draw)}. After these entries every nominal account is closed, and capital shows its new balance.`,
    }),
    sl('check', 'Quick check: order of the closing entries', {
      b: 'Arrange the closing entries of an imagined boutique in the correct order.',
      chk: 'ord_close_chk',
      n: 'The trading account must be completed before its balance can move on. The profit and loss account must be closed before the profit can reach capital. Drawings are set against capital after the profit has been added.',
    }),
    sl('concept', 'Gross loss and net loss', {
      v: vLoss,
      n: 'The entry depends on the result. A gross profit is moved by debiting the trading account and crediting the profit and loss account. A gross loss is moved the other way. A net profit is credited to capital by debiting the profit and loss account. A net loss is debited to capital, and the profit and loss account is credited.',
    }),
    sl('concept', 'The opening entry', {
      b: 'The **opening entry** is passed on the first day of the new year to bring forward the balances of the Balance Sheet.',
      v: vOpenRules,
      n: 'The opening entry is passed on the first day of the new year, to bring forward the balances of the last balance sheet. Every asset is debited, including the closing stock as the stock account. The capital account and every liability are credited. Expenses and incomes are not carried forward, because they were closed.',
    }),
    sl('example', 'Worked example 7: the opening entry of Farhan Textiles', {
      b: `On 1 April 2026 the assets are debited with **${rs(FT.opening.total)}**; capital, the loan and creditors are credited with the same total.`,
      v: vFTopen,
      n: `On the first of April, the six assets are debited, which totals ${rupees(FT.opening.total)}. Closing stock appears as stock. The credit side holds capital of ${rupees(FT.capClosing)}, the bank loan of ${rupees(FT.ltl[0].amt)} and creditors of ${rupees(FT.cl[0].amt)}. The narration says that the balances are brought forward from the balance sheet.`,
    }),
    sl('check', 'Quick check: the opening entry', {
      b: 'Complete the sentence about the accounts debited and credited in the opening entry.',
      chk: 'fb_open_chk',
      n: 'Think about what the balance sheet lists on each side. The side of the journal entry that is debited must hold the items that the business owns. The credit side holds what it owes, and the owner\'s claim.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Net profit: gross profit and incomes less indirect expenses.', 'Capital: opening capital plus net profit less drawings.', 'Closing entries end the year; the opening entry starts the next.'],
      v: vSum2,
      n: 'To sum up. The profit and loss account sets indirect expenses against the gross profit and other incomes to find the net profit. The balance sheet shows closing capital, which is opening capital plus net profit less drawings, with the loans, creditors and assets. Items are grouped, and marshalled by permanence or liquidity. Closing entries end the year, and the opening entry starts the next.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Show opening capital, profit and drawings in the capital line.', 'Name the order of the Balance Sheet.', 'Narration under every journal entry.'],
      v: vTips2,
      n: 'In the examination, show opening capital, net profit and drawings in the capital line, because closing capital is a computed figure. Name the order of the balance sheet, permanence or liquidity. Show the gross profit on the credit side of the profit and loss account. Write the narration under every journal entry, and check that the balance sheet totals agree.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Financial Statements I — Notes',
  sections: [
    {
      h: '1. Capital expenditure and revenue expenditure',
      t: 1,
      b: '**Capital expenditure** gives a benefit for more than one accounting year. It is spent to acquire a fixed asset or to improve one, so that it earns more or lasts longer. It is non-recurring and is shown as an asset in the Balance Sheet. The cost of an asset includes everything needed to bring it to its place and make it ready for use: the price, carriage, fitting charges and legal fees.\n\n**Revenue expenditure** is used up within the accounting year, in running the business or maintaining the assets, and it recurs. It is charged to the Trading Account or the Profit and Loss Account. **Deferred revenue expenditure** is a revenue expense whose benefit lasts for several years, for example a heavy advertising campaign; the part not yet charged is carried forward.',
      terms: [
        ['Capital expenditure', 'Spending that gives a benefit for more than one accounting year, to acquire a fixed asset or to improve it; it is non-recurring and is shown as an asset.'],
        ['Revenue expenditure', 'Spending whose benefit is used up within the accounting year, to run the business or maintain its assets; it recurs and is charged to the accounts of the year.'],
        ['Deferred revenue expenditure', 'A revenue expense whose benefit extends over several years, so that only part is charged in the year and the rest is carried forward.'],
        ['Fixed asset', 'An asset held for use in the business over a long period, not for resale, such as land, machinery and furniture.'],
      ],
      v: vCapRev,
      vs: [vCap, vRev, vC1],
    },
    {
      h: '2. Capital and revenue receipts; why the distinction matters',
      t: 1,
      b: 'A **capital receipt** is money that does not come from the normal trading of the year and that adds to capital or reduces an asset: capital brought in by the proprietor, a loan received, the sale of a fixed asset. A **revenue receipt** comes from the normal trading and the incomes of the year: sales of goods, commission, interest and rent received.\n\nThe distinction matters because it decides whether an item reaches the Profit and Loss Account or the Balance Sheet. A capital item charged as an expense understates the profit and the asset; a revenue item added to an asset overstates the profit and the asset.',
      terms: [
        ['Capital receipt', 'Money received from a source other than the normal trading of the year, such as capital introduced, a loan or the sale of a fixed asset.'],
        ['Revenue receipt', 'Money received from the normal trading and incomes of the year, such as sales, commission, interest and rent received.'],
      ],
      v: vReceipts,
      vs: [vWhy, vW],
    },
    {
      h: '3. Financial statements and their users',
      t: 2,
      b: 'At the end of the accounting year a sole proprietor prepares the **financial statements** from the trial balance: the Trading Account, the Profit and Loss Account and the Balance Sheet. The first two are accounts; the Balance Sheet is a statement. The users are the proprietor (profit and capital), lenders and banks (ability to repay), suppliers on credit (ability to pay on time), employees and the tax authorities (profit for assessment).',
      terms: [
        ['Financial statements', 'The statements prepared at the end of the accounting year to show the profit or loss for the year and the financial position on the last day: the Trading Account, the Profit and Loss Account and the Balance Sheet.'],
        ['Stakeholder', 'A person or group with an interest in the business and its results, such as the proprietor, lenders, suppliers, employees and the tax authorities.'],
      ],
      v: vFlow,
      vs: [vStake],
    },
    {
      h: '4. The Trading Account',
      t: 2,
      b: 'The **Trading Account** (horizontal format) finds the gross profit or gross loss. **Debit side:** opening stock; purchases less purchases returns; direct expenses such as wages, carriage inwards, freight, power and fuel, and import duty. **Credit side:** sales less sales returns; closing stock. If the credit side is larger the balancing figure is the **gross profit**; otherwise it is the **gross loss**. Closing stock is usually given outside the trial balance.',
      terms: [
        ['Trading Account', 'An account prepared to find the gross profit or gross loss by setting net sales and closing stock against opening stock, net purchases and direct expenses.'],
        ['Gross profit', 'The excess of net sales plus closing stock over opening stock, net purchases and direct expenses; the result of trading before indirect expenses.'],
        ['Direct expenses', 'Expenses incurred in buying or making the goods and bringing them to a saleable condition, such as wages, carriage inwards, freight, power and fuel, and import duty.'],
        ['Closing stock', 'The goods unsold on the last day of the year, valued at cost; it is credited in the Trading Account and shown as a current asset.'],
        ['Net purchases', 'Purchases less purchases returns.'],
        ['Net sales', 'Sales less sales returns.'],
      ],
      v: vFTtr,
      vs: [vTrItems, vDirInd, vFTtb, vFTwhere],
    },
    {
      h: '5. The Profit and Loss Account',
      t: 2,
      b: 'The **Profit and Loss Account** finds the net profit or net loss. **Debit side:** indirect expenses (office and administrative, selling and distribution, financial) and losses, and a gross loss brought down. **Credit side:** gross profit brought down and other incomes such as commission, interest and rent received, and discount received. The balancing figure is the **net profit** if the credit side is larger, otherwise the **net loss**. Operating profit, an extra measure, is the gross profit less the operating expenses.',
      terms: [
        ['Profit and Loss Account', 'An account prepared to find the net profit or net loss by setting indirect expenses and losses against the gross profit and other incomes.'],
        ['Indirect expenses', 'Expenses of running the business other than the direct costs of the goods: office and administrative, selling and distribution, and financial expenses.'],
        ['Net profit', 'The excess of the gross profit and other incomes over the indirect expenses; it increases the capital of the proprietor.'],
        ['Net loss', 'The excess of the indirect expenses over the gross profit and other incomes; it reduces the capital of the proprietor.'],
        ['Operating profit', 'The profit from the main activity of the business: gross profit less the operating expenses, before financial expenses and non-operating incomes.'],
      ],
      v: vFTpl,
      vs: [vPlItems, vGBpl],
    },
    {
      h: '6. The Balance Sheet; grouping and marshalling',
      t: 2,
      b: 'The **Balance Sheet** (horizontal format) is a statement of the assets and liabilities on a date. **Liabilities side:** capital (opening capital plus net profit less drawings), long-term liabilities, current liabilities. **Assets side:** fixed assets, investments, current assets. The totals of the two sides are equal.\n\n**Grouping** puts items of one nature under one head; **marshalling** arranges the groups in an order: the **order of permanence** (fixed assets first, cash last; capital first) or the **order of liquidity** (cash first, fixed assets last; current liabilities first). The two orders reverse each other.',
      terms: [
        ['Balance Sheet', 'A statement of the assets and the liabilities, including capital, of a business on a given date.'],
        ['Current assets', 'Assets expected to be turned into cash within a year or the operating cycle, such as closing stock, debtors, bank and cash.'],
        ['Investments', 'Amounts put in securities or other holdings, usually to earn income over the long term.'],
        ['Long-term liabilities', 'Amounts owed that are repayable after more than a year, such as a long-term loan.'],
        ['Current liabilities', 'Amounts owed that are payable within a year or the operating cycle, such as creditors.'],
        ['Grouping', 'Putting items of the same nature together under one head in the Balance Sheet.'],
        ['Marshalling', 'Arranging the groups and items of the Balance Sheet in a definite order, either of liquidity or of permanence.'],
      ],
      v: vOrder,
      vs: [vBsItems, vGroup, vFTbsP, vFTbsL],
    },
    {
      h: '7. Closing entries and the opening entry',
      t: 3,
      b: '**Closing entries** (passed on the last day of the year): (1) Trading A/c Dr. To opening stock, purchases, sales returns, direct expenses; (2) Sales A/c and Purchases Returns A/c Dr. To Trading A/c; (3) Closing Stock A/c Dr. To Trading A/c; (4) Trading A/c Dr. To Profit and Loss A/c for a gross profit (reverse for a gross loss); (5) Profit and Loss A/c Dr. To indirect expenses and losses; (6) incomes Dr. To Profit and Loss A/c; (7) Profit and Loss A/c Dr. To Capital A/c for a net profit (Capital A/c Dr. To Profit and Loss A/c for a net loss); (8) Capital A/c Dr. To Drawings A/c.\n\nThe **opening entry** on the first day of the new year debits all the assets (closing stock as Stock A/c) and credits the Capital A/c and all the liabilities, with the narration that the balances are brought forward from the Balance Sheet.',
      terms: [
        ['Closing entry', 'A journal entry passed at the end of the accounting year to transfer the balance of a nominal account to the Trading Account, the Profit and Loss Account or the Capital Account.'],
        ['Opening entry', 'The journal entry passed on the first day of a new accounting year to bring forward the balances of the assets, liabilities and capital from the last Balance Sheet.'],
        ['Drawings', 'Cash or goods withdrawn from the business by the proprietor for personal use; they reduce the capital.'],
        ['Nominal account', 'An account of an expense, a loss, an income or a gain, closed at the end of the year.'],
      ],
      v: vFTc1,
      vs: [vSteps, vFTc2, vLoss, vOpenRules, vFTopen],
    },
  ],
  tips: '- Capital or revenue: give the class and a reason; add carriage and fitting to the cost of a new asset.\n- Trading Account: net purchases and net sales, direct expenses on the debit side, closing stock on the credit side, then the gross profit or loss.\n- Profit and Loss Account: gross profit and incomes against indirect expenses; net profit goes to capital.\n- Balance Sheet: show the capital line as opening capital plus net profit less drawings; name the order (permanence or liquidity); both totals must agree.\n- Closing entries: follow the order of the steps, with a narration under each; the opening entry debits assets and credits capital and liabilities.\n- Use the heading with the name of the firm, the statement and the date.',
});

// ================================================================ flashcards
const FC = cards([
  ['**Capital expenditure**', 'Spending that gives a benefit for more than one accounting year, to acquire or improve a fixed asset; non-recurring; shown as an asset.', 'definition', 1],
  ['**Revenue expenditure**', 'Spending whose benefit is used up within the year, to run the business or maintain assets; recurring; charged to the accounts.', 'definition', 1],
  ['**Deferred revenue expenditure**', 'A revenue expense whose benefit lasts several years, so part is carried forward; for example a heavy advertising campaign.', 'definition', 1],
  ['**Capital receipt**', 'Money received from a source other than normal trading, such as capital introduced, a loan or the sale of a fixed asset.', 'definition', 1],
  ['**Revenue receipt**', 'Money received from normal trading and incomes: sales, commission, interest and rent received.', 'definition', 1],
  ['Carriage and fitting charges on a new machine', 'Capital expenditure: they are part of the cost of bringing the asset into use.', 'concept', 1],
  ['Repairs that only maintain an asset', 'Revenue expenditure, charged to the Profit and Loss Account.', 'concept', 1],
  ['A capital item charged as an expense', 'Profit is understated and the asset is understated.', 'fact', 1],
  ['A revenue item added to an asset', 'Profit is overstated and the asset is overstated.', 'fact', 1],
  ['Stakeholders who read the financial statements', 'Proprietor, lenders and banks, suppliers on credit, employees, tax authorities.', 'fact', 2],
  ['**Trading Account**', 'Finds the gross profit or gross loss from buying and selling goods.', 'definition', 2],
  ['Debit side of the Trading Account', 'Opening stock; purchases less returns; direct expenses.', 'concept', 2],
  ['Credit side of the Trading Account', 'Sales less returns; closing stock.', 'concept', 2],
  ['**Gross profit**', 'Net sales plus closing stock less opening stock, net purchases and direct expenses.', 'formula', 2],
  ['**Direct expenses**', 'Costs of buying or making goods and bringing them to a saleable state: wages, carriage inwards, freight, power and fuel, import duty.', 'definition', 2],
  ['**Indirect expenses**', 'Office and administrative, selling and distribution, and financial expenses; debited to the Profit and Loss Account.', 'definition', 2],
  ['Carriage inwards and carriage outwards', 'Inwards is a direct expense in the Trading Account; outwards is a selling expense in the Profit and Loss Account.', 'concept', 2],
  ['**Profit and Loss Account**', 'Finds the net profit or net loss by setting indirect expenses and losses against gross profit and other incomes.', 'definition', 2],
  ['**Net profit**', 'Gross profit plus other incomes less indirect expenses; it increases capital.', 'formula', 2],
  ['**Operating profit**', 'Gross profit less operating expenses: an extra measure of the profit from the main activity.', 'definition', 2],
  ['**Balance Sheet**', 'A statement of assets and liabilities, including capital, on a given date; the two totals agree.', 'definition', 2],
  ['Closing capital', 'Opening capital plus net profit less drawings.', 'formula', 2],
  ['Fixed assets, investments, current assets', 'The groups of the assets side in the order of permanence.', 'concept', 2],
  ['Capital, long-term liabilities, current liabilities', 'The groups of the liabilities side in the order of permanence.', 'concept', 2],
  ['**Grouping**', 'Putting items of the same nature together under one head.', 'definition', 2],
  ['**Marshalling**', 'Arranging the groups and items in a definite order: liquidity or permanence.', 'definition', 2],
  ['Order of liquidity', 'Cash first, fixed assets last on the assets side; current liabilities first, capital last.', 'concept', 2],
  ['Closing stock appears in two places', 'Credit side of the Trading Account, and current assets in the Balance Sheet.', 'fact', 2],
  ['**Closing entries**', 'Journal entries at year end that transfer nominal accounts to the Trading and Profit and Loss Accounts and the results to capital.', 'definition', 3],
  ['Closing entry for drawings', 'Capital A/c Dr. To Drawings A/c.', 'concept', 3],
  ['Closing entry for net profit', 'Profit and Loss A/c Dr. To Capital A/c; for a net loss, the reverse.', 'concept', 3],
  ['Closing entry for closing stock', 'Closing Stock A/c Dr. To Trading A/c.', 'concept', 3],
  ['**Opening entry**', 'Journal entry on the first day of the new year: assets Dr.; capital and liabilities Cr.', 'definition', 3],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Financial Statements I',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_cap_def', 'm_gp_calc', 'm_close_np', 'ar_cap_rev'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_cap_features', 's2_trading', 's3_classify'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_distinction', 'l5_classify'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_class'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Financial Statements I',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_repair_rev', 'm_cap_receipt', 'm_stake', 'm_indirect', 'm_gross_loss', 'm_liq', 'm_close_trade', 'm_open_entry', 'ar_closing_stock', 'ar_drawings'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_deferred', 's2_direct_ind', { attempt: 1, keys: ['s2_grouping', 's2_opening'] }, 's3_wrong', { attempt: 1, keys: ['s3_gross_loss', 's3_close3'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_stmts', { attempt: 1, keys: ['l5_close', 'l5_bs2'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_trading', 'cb_bs'] },
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
const checksUsed = new Set(['m_classify_chk', 'n_capcost_chk', 'm_direct_chk', 'n_gp_chk', 'n_np_chk', 'm_stock_entry', 'ord_close_chk', 'fb_open_chk']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
// 4. Every firm's statements balance and use every trial balance item once (asserted inside finals()).
for (const f of [F.FT, F.GB, F.IG, F.JE, F.OP]) same(f.bsPerm.total, f.bsLiq.total, `${f.firm}: both orders give the same total`);
void sum;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-accountancy-ch08 (capital and revenue items; Trading Account, Profit and Loss Account and Balance Sheet of a sole proprietor without adjustments, with grouping and marshalling; closing and opening entries)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed with the shared acc.mjs and the chapter helper finals() in figures.mjs and asserted: each imagined firm has one trial balance that agrees (trialBalance), every item of it is used exactly once, the gross and net profit equal their formulae, the Balance Sheet balances in both orders, the closing entries leave every nominal account at nil and capital at its Balance Sheet figure, and the opening entry total equals the Balance Sheet total; tables in decks and model answers are generated from the computed objects',
    facts: 'capital and revenue expenditure and receipts, deferred revenue expenditure, stakeholders, the horizontal Trading Account, Profit and Loss Account and Balance Sheet of a sole proprietor, grouping and marshalling in the orders of liquidity and permanence, closing entries and the opening entry',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
