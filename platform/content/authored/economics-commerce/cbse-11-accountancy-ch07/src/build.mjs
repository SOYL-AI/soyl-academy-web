// Build CBSE 11 Accountancy ch07 Depreciation, Provisions and Reserves. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch07', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const F = await import('./figures.mjs');
const { same, check, sum, inr, rs, rupees, schedule, AP, BL, CP, CMP, RANA, MF } = F;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (headers, rows, alt) => table(headers, rows, alt);

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

// ---- causes web
const vCauses = (() => {
  const s = new Svg(760, 330);
  const C = [380, 165];
  const spots = [
    [150, 62, ['Wear and tear', 'Use of the asset,', 'weather and age']],
    [610, 62, ['Expiry of legal rights', 'A lease, patent or', 'licence comes to an end']],
    [150, 268, ['Obsolescence', 'New technology makes', 'the asset out of date']],
    [610, 268, ['Abnormal factors', 'Accident, fire, flood', 'or theft']],
  ];
  for (const [x, y] of spots) s.line(C[0], C[1], x, y, { sw: 1.5, color: 'muted' });
  box(s, C[0], C[1], 180, 48, 'Depreciation', { fill: 'accent', bold: true, size: 15 });
  for (const [x, y, t] of spots) box(s, x, y, 232, 66, t, { bold: true, size: 13 });
  return s.visual('Causes web: depreciation of a fixed asset is caused by wear and tear (use, weather, age), expiry of legal rights (a lease, patent or licence ends), obsolescence (new technology makes the asset out of date) and abnormal factors (accident, fire, flood or theft)', 'Four causes of depreciation.');
})();

// ---- book value of SLM and WDV at the same rate (computed from schedule)
const vLine = (() => {
  const s = new Svg(760, 390);
  const cost = 500000;
  const years = 5;
  const c = s.chart({ x0: 0, x1: years, y0: 0, y1: cost, left: 90, top: 40, width: 540, height: 280, xLabel: 'Year', yLabel: 'Book value (₹ lakh)' });
  for (let i = 0; i <= 5; i++) c.yTick(i * 100000, String(i));
  for (let i = 0; i <= years; i++) c.xTick(i, String(i));
  const slmPts = [cost, ...schedule({ cost, ratePct: 20, method: 'slm', years }).map((r) => r.closing)];
  const wdvPts = [cost, ...schedule({ cost, ratePct: 20, method: 'wdv', years }).map((r) => r.closing)];
  same(slmPts[years], 0, 'chart: SLM book value after five years');
  same(wdvPts[years], 163840, 'chart: WDV book value after five years');
  for (let i = 0; i < years; i++) {
    c.seg([i, slmPts[i]], [i + 1, slmPts[i + 1]], { sw: 2.5 });
    c.seg([i, wdvPts[i]], [i + 1, wdvPts[i + 1]], { sw: 2.5, color: 'accent', dash: true });
  }
  for (let i = 0; i <= years; i++) {
    c.dot([i, slmPts[i]]);
    c.dot([i, wdvPts[i]], 'accent');
  }
  c.label([years, 0], 'Nil', { dx: -22, dy: -16, size: 12 });
  c.label([years, wdvPts[years]], `${rs(wdvPts[years])}`, { dx: -4, dy: 20, size: 12, anchor: 'end' });
  s.line(420, 60, 466, 60, { sw: 2.5 });
  s.text(476, 60, 'Straight line method', { anchor: 'start', size: 13 });
  s.line(420, 84, 466, 84, { sw: 2.5, color: 'accent', dash: true });
  s.text(476, 84, 'Written down value method', { anchor: 'start', size: 13 });
  return s.visual(`Line chart of the book value of a machine bought for ${rs(cost)} and depreciated at 20 per cent a year by two methods: under the straight line method the book value falls by ${inr(100000)} a year to nil in five years; under the written down value method it falls by a smaller amount each year and is ${inr(wdvPts[years])} after five years`, 'Book value year by year: straight line against written down value, both at 20% a year.');
})();

// ---- two ways of recording depreciation
const vTwoWays = (() => {
  const y = AP.years[0];
  same(y.closingCost - y.closingAcc, y.closingBV, 'two ways give the same book value');
  const s = new Svg(760, 380);
  s.text(190, 22, 'Charged to the asset account', { bold: true, size: 14 });
  s.text(570, 22, 'Provision for depreciation account', { bold: true, size: 14 });
  s.line(380, 40, 380, 300, { sw: 1.2, color: 'muted', dash: true });
  box(s, 190, 82, 300, 56, ['Machinery A/c is credited', `and falls to ${rs(y.closingBV)}`]);
  s.arrow(190, 112, 190, 148, { sw: 1.5 });
  box(s, 190, 182, 300, 56, ['Balance sheet shows', `Machinery ${rs(y.closingBV)}`], { fill: 'accent' });
  box(s, 570, 70, 320, 50, ['Machinery A/c stays', `at cost ${rs(y.closingCost)}`]);
  s.arrow(570, 95, 570, 117, { sw: 1.5 });
  box(s, 570, 142, 320, 50, ['Provision for Depreciation A/c', `grows to ${rs(y.closingAcc)}`]);
  s.arrow(570, 167, 570, 189, { sw: 1.5 });
  box(s, 570, 226, 320, 68, ['Balance sheet shows', `cost ${rs(y.closingCost)}`, `less provision ${rs(y.closingAcc)}`], { fill: 'accent' });
  box(s, 380, 342, 460, 44, `Same book value either way: ${rs(y.closingBV)}`, { bold: true, size: 14 });
  return s.visual(`Comparison of the two ways of recording depreciation after the first year of Asha Printers: charged to the asset account, Machinery A/c falls to ${inr(y.closingBV)} and the balance sheet shows ${inr(y.closingBV)}; with a provision account, Machinery A/c stays at cost ${inr(y.closingCost)}, the provision grows to ${inr(y.closingAcc)} and the balance sheet shows cost less provision, the same ${inr(y.closingBV)}`, 'Two ways of recording the same depreciation.');
})();

// ---- provisions against reserves: profit flow of Meena Foods
const vPR = (() => {
  const s = new Svg(760, 330);
  const x0 = 230;
  const k = 420 / 200000;
  const bar = (cy, from, to, label, value, o = {}) => {
    s.rect(x0 + from * k, cy - 14, (to - from) * k, 28, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 4 });
    s.text(x0 - 12, cy, label, { anchor: 'end', size: 13 });
    s.text(x0 + to * k + 10, cy, value, { anchor: 'start', size: 13 });
    if (o.tag) s.text(x0 + from * k - 10, cy, o.tag, { anchor: 'end', size: 12, italic: true });
  };
  const before = 200000;
  const prov = MF.provTotal;
  const res = MF.resTotal;
  bar(40, 0, before, 'Profit before provision', rs(before));
  bar(100, MF.net, before, 'Provision for repairs', rs(prov), { fill: 'accent', tag: 'charged before profit is found' });
  bar(160, 0, MF.net, 'Net profit', rs(MF.net));
  bar(220, MF.left, MF.net, 'General reserve', rs(res), { fill: 'accent', tag: 'set aside after profit is found' });
  bar(280, 0, MF.left, 'Profit retained', rs(MF.left));
  s.text(380, 312, 'Provision cuts the profit; reserve is kept back out of it', { size: 13, bold: true });
  return s.visual(`Profit flow of Meena Foods: profit before provision ${inr(before)}; the provision for repairs of ${inr(prov)} is charged before profit is found, leaving net profit ${inr(MF.net)}; a general reserve of ${inr(res)} is set aside after the profit is found, leaving ${inr(MF.left)} retained`, 'A provision is charged before profit is found; a reserve is set aside out of the profit.');
})();

// ================================================================ tables for slides (part 1)
const vMeaning = T(['Part of the idea', 'In words'], [
  ['What falls', 'The book value of a fixed asset, through use, the passage of time or obsolescence'],
  ['What is done', 'The depreciable cost of the asset is spread over its useful life'],
  ['Where it is charged', 'Against the revenue of each year, as an expense'],
  ['What it is not', 'It is not a payment of cash and not a measure of the market value'],
], 'Table: what falls, what is done, where depreciation is charged and what it is not');
const vFeatures = T(['Feature', 'What it means'], [
  ['Decline in book value', 'Each year the book value of the asset becomes lower'],
  ['Applies to fixed assets', 'Machines, furniture and vehicles are depreciated; stock and debtors are not'],
  ['Non-cash expense', 'The cash was paid when the asset was bought; no cash leaves when depreciation is charged'],
  ['Charge against revenue', 'It is debited to the profit and loss account, so it reduces the profit of the year'],
], 'Table of four features of depreciation');
const vNeed = T(['Need', 'Why it matters'], [
  ['Matching', 'The asset helps earn revenue for several years, so each year bears a part of its cost'],
  ['True profit', 'Ignoring depreciation overstates the profit'],
  ['True financial position', 'The balance sheet should not show the asset at more than its worth to the business'],
  ['Replacement funds', 'Profit not withdrawn because of the charge stays in the business and can help replace the asset'],
  ['Tax considerations', 'Depreciation is allowed as a charge in working out taxable profit, within the rules'],
], 'Table of five needs for charging depreciation');
const vFactors = T(['Factor', 'Meaning', 'Rana Engineering'], [
  ['Cost', 'Price paid plus carriage, installation and other costs of making it ready for use', rs(RANA.cost)],
  ['Residual value', 'Estimated amount the asset will fetch at the end of its life, net of selling costs', rs(RANA.scrap)],
  ['Depreciable cost', 'Cost less residual value', rs(RANA.depreciable)],
  ['Useful life', 'Estimated number of years the asset will serve the business', `${RANA.life} years`],
], `Table of four factors that fix the amount of depreciation, with the figures of an imagined firm, Rana Engineering: cost ${inr(RANA.cost)}, residual value ${inr(RANA.scrap)}, depreciable cost ${inr(RANA.depreciable)}, life ${RANA.life} years`);
const vSlm = T(['Item', 'Rule'], [
  ['Formula', '(Cost − residual value) ÷ estimated life'],
  ['Rate', 'Yearly depreciation as a per cent of original cost'],
  ['Charge each year', 'The same amount, a fixed instalment'],
  ['Book value', 'Falls by an equal amount each year'],
  ['Rana Engineering', `(${inr(RANA.cost)} − ${inr(RANA.scrap)}) ÷ ${RANA.life} = ${rs(RANA.dep.annual)}, which is ${RANA.dep.ratePct}% of cost`],
], 'Table: the straight line method, with the figures of Rana Engineering');
const vSlmEx = T(['Year', 'Opening book value (₹)', 'Depreciation (₹)', 'Closing book value (₹)'], RANA.sched.map((r) => [String(r.year), inr(r.opening), inr(r.dep), inr(r.closing)]),
  `Straight line depreciation schedule of Rana Engineering over five years: ${inr(RANA.dep.annual)} each year, book value falling from ${inr(RANA.cost)} to ${inr(RANA.scrap)}`);
const vSlmML = T(['Merits', 'Limits'], [
  ['Simple to understand and apply', 'Ignores the fact that repairs rise as the asset ages'],
  ['The charge is the same every year, so profits are not distorted by changes in the charge', 'The same charge on a falling book value means a rising rate on the value still in the books'],
  ['The asset can be written down to its residual value or to nil', 'Does not take into account the interest lost on the money tied up in the asset'],
], 'Table of merits and limits of the straight line method');
const vWdv = T(['Item', 'Rule'], [
  ['Formula', 'Rate per cent × opening book value of the year'],
  ['Base', 'Opening book value, which falls every year'],
  ['Charge each year', 'Highest in the first year and falling every year'],
  ['Book value', 'Falls every year but never reaches nil'],
], 'Table: the written down value method');
const SD = schedule({ cost: 200000, ratePct: 15, method: 'wdv', years: 3 });
same(SD[2].dep, 21675, 'Sunder Tools third-year charge');
const vWdvEx = T(['Year', 'Opening book value (₹)', 'Depreciation at 15% (₹)', 'Closing book value (₹)'], SD.map((r) => [String(r.year), inr(r.opening), inr(r.dep), inr(r.closing)]),
  `Written down value depreciation schedule of an imagined firm, Sunder Tools, over three years at 15 per cent: charges ${inr(SD[0].dep)}, ${inr(SD[1].dep)} and ${inr(SD[2].dep)}, closing book value ${inr(SD[2].closing)}`);
const vWdvML = T(['Merits', 'Limits'], [
  ['The heavy charge in the early years is met by the low repairs of a new asset', 'The book value never falls to nil or to the residual value'],
  ['The total of depreciation and repairs is more even from year to year', 'The calculation is harder than for the straight line method'],
  ['Most of the cost is written off in the early years, which suits assets that lose value quickly', 'The charge in the later years can become very small'],
], 'Table of merits and limits of the written down value method');
const PY = { slm: schedule({ cost: 240000, ratePct: 10, method: 'slm', years: 2, months: [9] }), wdv: schedule({ cost: 240000, ratePct: 10, method: 'wdv', years: 2, months: [9] }) };
same(PY.slm[0].dep, 18000, 'part-year straight line');
same(PY.wdv[1].dep, 22200, 'part-year written down value second year');
const vPartYear = T(['Year ended 31 March', 'Months used', 'Straight line (₹)', 'Written down value (₹)'], [
  ['2027', '9, from 1 July 2026', inr(PY.slm[0].dep), inr(PY.wdv[0].dep)],
  ['2028', '12', inr(PY.slm[1].dep), inr(PY.wdv[1].dep)],
], `Depreciation of a machine of an imagined firm, Tilak Presses, bought for ${inr(240000)} on 1 July 2026 at 10% a year: first year (9 months) ${inr(PY.slm[0].dep)} under both methods; second year ${inr(PY.slm[1].dep)} under the straight line method and ${inr(PY.wdv[1].dep)} under the written down value method`);
const vCompareTable = T(['Basis', 'Straight line method', 'Written down value method'], [
  ['Base of the rate', 'Original cost', 'Opening book value'],
  ['Yearly charge', 'Equal every year', 'Falls every year'],
  ['Book value', 'Can reach the residual value or nil', 'Never reaches nil'],
  ['Charge over repairs', 'Total burden of depreciation and repairs rises with age', 'Total burden is more even'],
  ['Calculation', 'Simple', 'Harder'],
], 'Table comparing the straight line and written down value methods on five points');
const vSum1 = T(['Topic', 'Key points'], [
  ['Depreciation', 'Fall in the book value of a fixed asset; its depreciable cost spread over its life; non-cash'],
  ['Causes', 'Wear and tear, expiry of legal rights, obsolescence, abnormal factors'],
  ['Straight line method', '(Cost − residual value) ÷ life, or a rate on cost; equal charge each year'],
  ['Written down value method', 'A rate on the opening book value; falling charge; never nil'],
  ['Part of a year', 'Charge from the date of purchase to the year end, or to the date of sale'],
], 'Summary table of Part 1');
const vTips1 = T(['Do', 'Why'], [
  ['Show the formula and the substitution', 'Method marks are given even when a figure is wrong'],
  ['Count the months from the date of purchase', 'A part-year gets a part-year charge'],
  ['Apply the written down value rate to the opening book value', 'Not to the cost, except in the first year'],
  ['State the base of the rate', 'Cost for the straight line method; book value for the written down value method'],
], 'Exam tips table for Part 1');
const vFlow1 = flow('LR', ['Asset is bought at cost', 'It is used over its life', 'Part of its cost is charged each year', 'Profit and book value show the charge'], 'Flow: an asset is bought at cost, used over its life, part of its cost is charged each year as depreciation, and profit and book value show the charge', 'Depreciation spreads the cost of an asset over its life.');

// ================================================================ tables for slides (part 2)
const a1 = AP.years[0];
const vEntries = T(['Event', 'Charging depreciation to the asset account', 'Provision method'], [
  ['Machine A bought', `Machinery A/c Dr. ${inr(400000)}; To Bank A/c`, 'Same entry'],
  ['Depreciation of the year', `Depreciation A/c Dr. ${inr(a1.dep)}; To Machinery A/c`, `Depreciation A/c Dr. ${inr(a1.dep)}; To Provision for Depreciation A/c`],
  ['Transfer to profit and loss', `Profit and Loss A/c Dr. ${inr(a1.dep)}; To Depreciation A/c`, 'Same entry'],
], `Table of journal entries for Asha Printers in the first year under the two ways of recording: Machine A bought for ${inr(400000)}; depreciation ${inr(a1.dep)} credited to Machinery A/c or to Provision for Depreciation A/c; transfer of ${inr(a1.dep)} to Profit and Loss A/c`);
const vApWork = T(AP.work.headers, AP.work.rows, `Depreciation of Asha Printers by year and machine: ${inr(AP.years[0].dep)} in 2025–26, ${inr(AP.years[1].dep)} in 2026–27 and ${inr(AP.years[2].dep)} in 2027–28, with Machine B depreciated for 6 months, 12 months and 9 months`);
const vApY3 = T(AP.years[2].direct.mach.headers, AP.years[2].direct.mach.rows, `Machinery A/c of Asha Printers for the year ended 31 March 2028 under the direct method: balance brought down ${inr(AP.years[1].closingBV)}; depreciation ${inr(AP.years[2].dep)}; sale of Machine B ${inr(180000)}; loss on sale ${inr(-AP.years[2].sold.result)}; balance carried down ${inr(AP.years[2].closingBV)}`);
const vDisposalRules = T(['Step', 'What to do'], [
  ['1', 'Charge depreciation on the asset sold from the start of the year up to the date of sale'],
  ['2', 'Find the book value at the date of sale: cost less depreciation to that date'],
  ['3', 'Compare the sale proceeds with the book value: more is a profit, less is a loss'],
  ['4', 'Record the sale in the Machinery A/c, or in an Asset Disposal A/c if a provision account is kept'],
  ['5', 'Transfer the profit or loss to the Profit and Loss A/c'],
], 'Table of five steps in accounting for the sale of an asset');
const vBlY3 = T(BL.years[2].direct.mach.headers, BL.years[2].direct.mach.rows, `Machinery A/c of Bhavani Looms for the year ended 31 March 2028 under the written down value method: balance brought down ${inr(BL.years[1].closingBV)}; depreciation ${inr(BL.years[2].dep)}; sale of Machine B ${inr(110000)}; loss on sale ${inr(-BL.years[2].sold.result)}; balance carried down ${inr(BL.years[2].closingBV)}`);
const vThree = T(['Account', 'What it records', 'Closes at'], [
  ['Machinery A/c', 'Machines at original cost: purchases on the debit side, cost of machines sold on the credit side', 'Cost of the machines in hand'],
  ['Provision for Depreciation A/c', 'Depreciation of each year on the credit side; accumulated depreciation of a machine sold on the debit side', 'Accumulated depreciation of the machines in hand'],
  ['Asset Disposal A/c', 'Cost, accumulated depreciation and sale proceeds of the machine sold, and the profit or loss', 'Nil: the account closes'],
], 'Table of the three accounts used in the provision method');
const cp2 = CP.years[1];
const vCpProv = T(cp2.prov.provision.headers, cp2.prov.provision.rows, `Provision for Depreciation A/c of Chitra Packaging for the year ended 31 March 2027: balance brought down ${inr(CP.years[0].closingAcc)}; depreciation ${inr(cp2.dep)}; accumulated depreciation of Machine B ${inr(cp2.sold.acc)} transferred to Asset Disposal A/c; balance carried down ${inr(cp2.closingAcc)}`);
const vCpDisp = T(cp2.prov.disposal.headers, cp2.prov.disposal.rows, `Asset Disposal A/c of Chitra Packaging: cost of Machine B ${inr(cp2.sold.cost)} debited; accumulated depreciation ${inr(cp2.sold.acc)} and sale proceeds ${inr(cp2.sold.value)} credited; profit on sale ${inr(cp2.sold.result)} debited and transferred to Profit and Loss A/c`);
const apB = AP.per.find((p) => p.id === 'B').rows;
const vPartAdd = T(['Situation', 'Treatment', 'Asha Printers'], [
  ['A new asset is added during the year', 'Depreciation only from the date of purchase to the year end', `Machine B, bought 1 October 2025: 6 months, ${rs(apB[0].dep)}`],
  ['Part of the assets is sold', 'Depreciation on that part up to the date of sale; only its cost and depreciation leave the accounts', `Machine B, sold 1 January 2028: 9 months, ${rs(apB[2].dep)}`],
  ['The rest of the assets', 'Full-year depreciation to the end of the year', `Machine A: ${rs(F.AP.per[0].rows[2].dep)} for the year`],
], 'Table: treatment of an addition during the year and of a sale of part of the assets, with Asha Printers as the example');
const vProv = T(['Provision for', 'Why it is made'], [
  ['Depreciation', 'The fall in the value of a fixed asset is certain, but the exact yearly amount rests on estimates'],
  ['Doubtful debts', 'Some debtors may not pay; the provision is named here and its adjustments come in a later chapter'],
  ['Taxation', 'Tax on the profit of the year is payable later, and its final amount is not yet known'],
  ['Repairs', 'A large repair is certain in a later year, and its cost is estimated'],
], 'Table of examples of provisions and the reason for each');
const vDiff = T(['Basis', 'Provision', 'Reserve'], [
  ['Basic nature', 'A charge against profit', 'An appropriation of profit'],
  ['Effect on profit', 'Reduces the profit', 'Profit earned is not reduced'],
  ['Presentation', 'Deducted from the asset or shown among the liabilities', 'Shown with the owners\' funds'],
  ['Purpose', 'To meet a known liability or loss', 'To strengthen the business'],
  ['Compulsion', 'Must be made even when there is no profit', 'Created only out of profit, and by choice'],
], 'Table of five differences between a provision and a reserve');
const vReserves = T(['Reserve', 'Meaning', 'Example'], [
  ['General reserve', 'Revenue reserve out of profit, with no stated purpose', `Meena Foods keeps back ${rs(MF.resTotal)} of its profit`],
  ['Specific reserve', 'Revenue reserve for a stated purpose', 'Dividend equalisation reserve, to even out payouts'],
  ['Capital reserve', 'Reserve out of a capital profit', 'Profit on the sale of a fixed asset kept as a reserve'],
  ['Secret reserve', 'Reserve not shown in the balance sheet', 'Stock shown below its true value'],
], 'Table of types of reserves with meaning and example');
const vImportance = T(['Importance of reserves', 'How it helps'], [
  ['Stronger position', 'The business has a cushion that outsiders can see and trust'],
  ['Unexpected losses', 'Losses can be met without borrowing or without a call on the owner'],
  ['Expansion', 'Profit kept back gives funds to buy assets without a loan'],
  ['Even payouts', 'A specific reserve helps the owners to be paid steadily in lean years'],
], 'Table of four reasons why reserves are important');
const vSum2 = T(['Topic', 'Key points'], [
  ['Recording', 'Credit the asset account directly, or credit a Provision for Depreciation A/c and keep the asset at cost'],
  ['Transfer', 'Depreciation A/c is closed by a debit to the Profit and Loss A/c'],
  ['Sale of an asset', 'Depreciation to the date of sale; book value; profit or loss; Asset Disposal A/c with a provision account'],
  ['Provision', 'A charge against profit for a known liability or loss of uncertain amount'],
  ['Reserve', 'Profit kept back: general, specific, capital and secret reserves'],
], 'Summary table of Part 2');
const vTips2 = T(['Do', 'Why'], [
  ['Write the accounts with To and By, and balance each one', 'Every account must close with equal totals'],
  ['Show the working of depreciation by year and by machine', 'Part-years are the common source of lost marks'],
  ['Find the book value at sale before the profit or loss', 'The result is the sale price against the book value, not against cost'],
  ['Keep provisions and reserves apart', 'One is charged against profit; the other is set aside out of it'],
], 'Exam tips table for Part 2');
const vFlow2 = flow('LR', ['Machine is bought', 'Depreciation is charged each year', 'Part of the machinery is sold', 'Profit or loss on sale is found'], 'Flow: a machine is bought, depreciation is charged each year, part of the machinery is sold and the profit or loss on sale is found', 'From purchase to sale of a machine.');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Depreciation, Provisions and Reserves — Part 1: Depreciation and Its Methods',
  goals: [
    'State the meaning, features, causes and need of depreciation and the factors that fix its amount',
    'Calculate depreciation by the straight line method and by the written down value method, including a part of a year',
    'Compare the two methods and choose between them for a given situation',
  ],
  slides: [
    sl('title', 'Depreciation: spreading the cost of an asset', {
      b: 'Part 1: **depreciation**: meaning, causes, need, and the **straight line** and **written down value** methods.',
      v: vFlow1,
      n: 'A business buys a machine once, but the machine helps earn revenue for many years. Depreciation spreads the cost of the machine over those years, so that each year bears its fair share. In this part we learn what depreciation is, why it arises, and how it is calculated by two methods. We work with imagined firms such as Rana Engineering and Sunder Tools.',
    }),
    sl('concept', 'What is depreciation?', {
      v: vMeaning,
      n: 'Depreciation is the decline in the book value of a fixed asset because of use, the passage of time or obsolescence. In accounting it is the spreading of the depreciable cost of the asset over its useful life. It is charged against revenue as an expense each year. It is not a payment of cash, and it is not an attempt to find the market value of the asset.',
    }),
    sl('concept', 'Features of depreciation', {
      v: vFeatures,
      n: 'Depreciation has four features. First, it is a decline in the book value of the asset. Second, it applies to fixed assets, such as machines and furniture, and not to stock or debtors. Third, it is a non cash expense, because the cash was paid when the asset was bought. Fourth, it is a charge against revenue, so it reduces the profit of the year.',
    }),
    sl('check', 'Quick check: what is depreciation?', {
      b: 'Choose the term for spreading the depreciable cost of a fixed asset over its useful life.',
      chk: 'm_dep_meaning',
      n: 'Think about what happens to the cost of a machine, less any amount expected at the end, over the years in which it serves the business. Is the cost rising, being revalued, or being spread?',
    }),
    sl('concept', 'Causes of depreciation', {
      v: vCauses,
      n: 'There are four causes. Wear and tear comes from the use of the asset, from weather and from age. Expiry of legal rights affects a lease, a patent or a licence, which comes to an end after a fixed period. Obsolescence happens when new technology makes the asset out of date. Abnormal factors are events such as an accident, a fire, a flood or a theft.',
    }),
    sl('concept', 'Why depreciation must be charged', {
      v: vNeed,
      n: 'Depreciation must be charged for five reasons. It matches the cost of the asset with the revenue it helps earn. It gives the true profit, since ignoring it overstates profit. It gives a true financial position, since the asset is not shown at more than its worth. It keeps profit in the business, which can help replace the asset. And it is allowed as a charge when taxable profit is worked out.',
    }),
    sl('check', 'Quick check: is depreciation a cash expense?', {
      b: 'True or false: the depreciation charged for a year is paid out in cash during that year.',
      chk: 'tf_noncash_chk',
      n: 'Ask when the cash for the asset was actually paid. Does anything further leave the cash book when the yearly charge is made?',
    }),
    sl('concept', 'Factors that fix the amount', {
      v: vFactors,
      n: 'Four factors fix the amount of depreciation. The cost includes the price paid and the cost of making the asset ready for use. The estimated residual value is what the asset will fetch at the end of its life. The depreciable cost is the cost less the residual value. The estimated useful life is the number of years the asset will serve. For Rana Engineering, the cost is five lakh rupees and the residual value is one lakh rupees.',
    }),
    sl('concept', 'The straight line method', {
      v: vSlm,
      n: `Under the straight line method, the same amount is charged every year. Yearly depreciation is the cost less the residual value, divided by the estimated life. It can also be stated as a rate on the original cost. For Rana Engineering the depreciable cost is ${rupees(RANA.depreciable)} and the life is five years, so the yearly depreciation is ${rupees(RANA.dep.annual)}. That is sixteen per cent of the cost.`,
    }),
    sl('example', 'Worked example 1: Rana Engineering', {
      b: `A machine costs **${rs(RANA.cost)}**, has a residual value of **${rs(RANA.scrap)}** and a life of **${RANA.life} years**. Show the book value year by year.`,
      v: vSlmEx,
      n: `Each year the charge is ${rupees(RANA.dep.annual)}. The book value starts at ${rupees(RANA.cost)} and falls by that amount every year. After five years it is ${rupees(RANA.sched[4].closing)}, which is exactly the residual value. The charge never changes, so the book value falls in a straight line.`,
    }),
    sl('check', 'Quick check: yearly depreciation', {
      b: 'Find the yearly depreciation of an imagined bottling line under the straight line method.',
      chk: 'n_slm_annual',
      n: 'First deduct the residual value from the cost to get the depreciable cost. Then divide by the number of years of life.',
    }),
    sl('concept', 'Straight line method: merits and limits', {
      v: vSlmML,
      n: 'The straight line method is simple to understand and to apply. Since the charge is the same each year, profit is not disturbed by a change in the charge, and the asset can be written down to its residual value or to nil. Its limits are that it ignores the rise in repairs as the asset ages, and it takes no account of the interest lost on the money tied up in the asset.',
    }),
    sl('concept', 'The written down value method', {
      v: vWdv,
      n: 'Under the written down value method, a fixed rate is applied to the opening book value of each year. In the first year the book value is the cost, so the charge is the same as under the straight line method at the same rate. After that the book value falls, so the charge falls too. The book value goes down every year but never reaches nil.',
    }),
    sl('example', 'Worked example 2: Sunder Tools', {
      b: `A machine of **Sunder Tools**, an imagined firm, costs **${rs(200000)}** and is depreciated at **15%** a year on the written down value.`,
      v: vWdvEx,
      n: `In the first year the charge is fifteen per cent of ${rupees(200000)}, which is ${rupees(SD[0].dep)}. The book value becomes ${rupees(SD[0].closing)}. In the second year the charge is fifteen per cent of that, ${rupees(SD[1].dep)}. In the third year it is ${rupees(SD[2].dep)}, and the book value at the end is ${rupees(SD[2].closing)}.`,
    }),
    sl('check', 'Quick check: third-year charge', {
      b: 'Find the depreciation of an imagined loom for the third year by the written down value method.',
      chk: 'n_wdv3',
      n: 'Apply the rate to the opening book value of each year. Work through the first and second years before the third.',
    }),
    sl('concept', 'Written down value method: merits and limits', {
      v: vWdvML,
      n: 'The heavy charge of the early years is met by the low repairs of a new asset, and the light charge of the later years sits beside the higher repairs. So the total burden of depreciation and repairs is more even. Most of the cost is written off early, which suits assets that lose value quickly. The limits are that the book value never reaches nil, the calculation is harder, and the late charge can become very small.',
    }),
    sl('example', 'Worked example 3: an asset bought during the year', {
      b: `**Tilak Presses**, an imagined firm with books closing on 31 March, bought a machine for **${rs(240000)}** on **1 July 2026**. Depreciation is 10% a year.`,
      v: vPartYear,
      n: `The machine was used for nine months in the first year, from the first of July to the thirty first of March. The charge is nine twelfths of ten per cent of the cost, which is ${rupees(PY.slm[0].dep)} under both methods. In the second year, the straight line method charges ${rupees(PY.slm[1].dep)} and the written down value method charges ${rupees(PY.wdv[1].dep)}.`,
    }),
    sl('concept', 'Straight line against written down value', {
      v: vCompareTable,
      n: 'The two methods differ in five ways. The straight line method applies the rate to original cost, and the written down value method applies it to the opening book value. The first charges equally every year and the second charges less each year. The first can reach nil, while the second never does. The second gives a more even total of depreciation and repairs. And the second is harder to calculate.',
    }),
    sl('concept', 'The same rate, year by year', {
      v: vLine,
      n: `The chart shows a machine of five lakh rupees at twenty per cent a year. In the first year both methods give the same charge. After that the written down value line falls more slowly. After five years the straight line book value is nil, while the written down value is ${rupees(CMP.w[4].closing)}. Over the five years the straight line method charges ${rupees(CMP.totalSlm)} and the written down value method ${rupees(CMP.totalWdv)}.`,
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['Depreciation spreads the depreciable cost of a fixed asset over its useful life; it is a non-cash charge against revenue.', 'Straight line: (cost − residual value) ÷ life; the charge is equal each year.', 'Written down value: a rate on the opening book value; the charge falls each year.'],
      v: vSum1,
      n: 'To sum up. Depreciation is the decline in the book value of a fixed asset, and accounting spreads its depreciable cost over its useful life. It arises from wear and tear, expiry of legal rights, obsolescence and abnormal factors. The straight line method charges the same amount every year. The written down value method applies a rate to the opening book value, so the charge falls. A part of a year gets a part of the charge.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write the formula, then substitute.', 'Count the months from the date of purchase.', 'State the base of the rate: cost, or opening book value.'],
      v: vTips1,
      n: 'In the examination, write the formula and then substitute the figures, because method marks are given even when a figure is wrong. Count the months from the date of purchase when an asset is bought during the year. Apply the written down value rate to the opening book value, not to the cost, except in the first year. And always say what the rate is applied to.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Depreciation, Provisions and Reserves — Part 2: Recording, Disposal, Provisions and Reserves',
  goals: [
    'Record depreciation by charging it to the asset account and through a provision for depreciation account',
    'Account for the sale of an asset, including the part-year charge, the book value, the profit or loss and the asset disposal account',
    'Distinguish provisions from reserves and name the types of reserves',
  ],
  slides: [
    sl('title', 'Recording depreciation and disposing of an asset', {
      b: 'Part 2: **recording** depreciation, the **sale** of an asset, **provisions** and **reserves**.',
      v: vFlow2,
      n: 'Once the amount of depreciation is known, it must be recorded in the books. In this part we see two ways of recording it, and we follow a machine from its purchase to its sale, finding the profit or loss on the sale. We end with provisions and reserves, two ideas that are often confused. We work with imagined firms such as Asha Printers, Bhavani Looms and Chitra Packaging.',
    }),
    sl('concept', 'Two ways of recording depreciation', {
      v: vTwoWays,
      n: `There are two ways. In the first, depreciation is credited to the asset account, which falls to its book value. In the second, depreciation is credited to a provision for depreciation account, and the asset account stays at cost. In the balance sheet, the provision is deducted from the cost. In the first year of Asha Printers, both ways show the same book value of ${rupees(a1.closingBV)}.`,
    }),
    sl('concept', 'Journal entries for the two ways', {
      v: vEntries,
      n: `The purchase entry is the same in both ways. For the yearly depreciation, the expense account is debited. It is then credited to the machinery account in the first way, or to the provision for depreciation account in the second way. At the year end, the depreciation account is closed by a debit to the profit and loss account. For Asha Printers the first year charge is ${rupees(a1.dep)}.`,
    }),
    sl('check', 'Quick check: the provision method', {
      b: 'With a provision for depreciation account, at what amount does the machinery account stand?',
      chk: 'm_prov_method',
      n: 'Remember what is credited each year when a provision account is kept. Does the machinery account itself change?',
    }),
    sl('example', 'Worked example 1: Asha Printers, the working', {
      b: `**Asha Printers**, an imagined firm, bought Machine A for **${rs(400000)}** on 1 April 2025 and Machine B for **${rs(240000)}** on 1 October 2025. Depreciation is **10% on cost**; books close on 31 March; Machine B is sold on 1 January 2028.`,
      v: vApWork,
      n: `Machine A is charged ${rupees(AP.per[0].rows[0].dep)} a year. Machine B is used for six months in the first year, which is ${rupees(apB[0].dep)}, then for a full year, ${rupees(apB[1].dep)}, and for nine months in the third year, up to the date of sale, ${rupees(apB[2].dep)}. The yearly totals are ${rupees(AP.years[0].dep)}, ${rupees(AP.years[1].dep)} and ${rupees(AP.years[2].dep)}.`,
    }),
    sl('example', 'Worked example 2: the Machinery Account in the year of sale', {
      b: `Machine B is sold for **${rs(180000)}**. Its book value at the date of sale is **${rs(AP.years[2].sold.bv)}**, so there is a loss on sale of **${rs(-AP.years[2].sold.result)}**.`,
      v: vApY3,
      n: `The account opens with the balance brought down of ${rupees(AP.years[1].closingBV)}. On the credit side we write the depreciation of the year, ${rupees(AP.years[2].dep)}, the sale proceeds of ${rupees(180000)}, and the loss on sale of ${rupees(-AP.years[2].sold.result)}. The balance carried down is ${rupees(AP.years[2].closingBV)}, which is the book value of Machine A alone.`,
    }),
    sl('concept', 'Sale of an asset: the steps', {
      v: vDisposalRules,
      n: 'When an asset is sold, first charge depreciation on it up to the date of sale. Then find the book value at that date, which is the cost less the depreciation so far. Compare the sale proceeds with the book value. If the proceeds are more, there is a profit, and if they are less, there is a loss. Record the sale and transfer the profit or loss to the profit and loss account.',
    }),
    sl('check', 'Quick check: order of the accounting steps', {
      b: 'Arrange the steps of the sale of a machine when a provision account is kept.',
      chk: 'ord_sale_entries',
      n: 'The part year charge comes first. Then the cost and the accumulated depreciation go to the disposal account. The balancing profit or loss goes last.',
    }),
    sl('example', 'Worked example 3: written down value with a sale', {
      b: `**Bhavani Looms**, an imagined firm, depreciates at **20%** on the written down value. Machine A cost ${rs(300000)} on 1 April 2025; Machine B cost ${rs(160000)} on 1 July 2026 and is sold on 1 October 2027 for **${rs(110000)}**.`,
      v: vBlY3,
      n: `The balance brought down is ${rupees(BL.years[1].closingBV)}. The depreciation of the year is ${rupees(BL.years[2].dep)}. Machine B had a book value of ${rupees(BL.years[2].sold.bv)} on the date of sale. It was sold for ${rupees(110000)}, so the loss is ${rupees(-BL.years[2].sold.result)}. The balance carried down, ${rupees(BL.years[2].closingBV)}, is the book value of Machine A.`,
    }),
    sl('concept', 'The three accounts of the provision method', {
      v: vThree,
      n: 'With a provision account, three accounts are used. The machinery account stays at cost and closes at the cost of the machines in hand. The provision for depreciation account collects the depreciation of each year, and loses the share of a machine that is sold. The asset disposal account brings together the cost, the accumulated depreciation and the sale proceeds of the machine sold, and it closes with a nil balance.',
    }),
    sl('example', 'Worked example 4: the Provision for Depreciation Account', {
      b: `**Chitra Packaging**, an imagined firm, bought Machine A for ${rs(600000)} and Machine B for ${rs(120000)} in 2025, at 10% on cost; Machine B is sold on 1 October 2026 for **${rs(110000)}**.`,
      v: vCpProv,
      n: `The provision account opens with ${rupees(CP.years[0].closingAcc)}. The depreciation of the year, ${rupees(cp2.dep)}, is added on the credit side. The accumulated depreciation of Machine B, ${rupees(cp2.sold.acc)}, is transferred to the asset disposal account on the debit side. The balance carried down is ${rupees(cp2.closingAcc)}, which belongs to Machine A.`,
    }),
    sl('example', 'Worked example 5: the Asset Disposal Account', {
      b: `Machine B: cost **${rs(cp2.sold.cost)}**, accumulated depreciation **${rs(cp2.sold.acc)}**, book value **${rs(cp2.sold.bv)}**, sold for **${rs(cp2.sold.value)}**.`,
      v: vCpDisp,
      n: `The cost of ${rupees(cp2.sold.cost)} is debited to the account. The accumulated depreciation of ${rupees(cp2.sold.acc)} and the sale proceeds of ${rupees(cp2.sold.value)} are credited. The debit side is higher, so the balancing figure of ${rupees(cp2.sold.result)}, a profit on sale, is written on the debit side and transferred to the profit and loss account. The account closes.`,
    }),
    sl('check', 'Quick check: the result of a sale', {
      b: 'Complete the rule for the profit or loss on the sale of an asset.',
      chk: 'fb_disposal',
      n: 'Compare the sale proceeds with the value of the asset in the books at the date of sale, not with its cost. Then recall the account used when a provision account is kept.',
    }),
    sl('concept', 'Adding an asset and selling part of the assets', {
      v: vPartAdd,
      n: `When an asset is added during the year, depreciation is charged only from the date of purchase to the year end. When part of the assets is sold, depreciation on that part is charged up to the date of sale, and only its cost and its accumulated depreciation leave the accounts. In Asha Printers, Machine B was charged for six months in the year it was bought and nine months in the year it was sold.`,
    }),
    sl('concept', 'What is a provision?', {
      v: vProv,
      n: 'A provision is an amount charged against profit for a known liability or loss whose exact amount cannot be stated. Examples are depreciation, doubtful debts, taxation and repairs. The provision for doubtful debts is only named here, and the adjustments for it are taken up in a later chapter. A provision is a charge, so it reduces the profit of the year.',
    }),
    sl('concept', 'Provision against reserve: the profit flow', {
      v: vPR,
      n: `The chart follows the profit of an imagined firm, Meena Foods. The profit before provision is ${rupees(200000)}. The provision for repairs of ${rupees(MF.provTotal)} is charged first, so the net profit is ${rupees(MF.net)}. The general reserve of ${rupees(MF.resTotal)} is then set aside out of that profit, leaving ${rupees(MF.left)} in the business. The provision cuts the profit, and the reserve is kept back out of it.`,
    }),
    sl('concept', 'Differences between provisions and reserves', {
      v: vDiff,
      n: 'Provisions and reserves differ in five ways. A provision is a charge against profit, and a reserve is an appropriation of profit. A provision reduces the profit, and a reserve does not reduce the profit earned. A provision is deducted from the asset or shown among the liabilities, and a reserve is shown with the owners funds. A provision meets a known liability, and a reserve strengthens the business. A provision must be made even if there is no profit, but a reserve needs profit.',
    }),
    sl('concept', 'Types of reserves', {
      v: vReserves,
      n: 'Revenue reserves are made out of trading profit. A general reserve has no stated purpose, and a specific reserve has one, for example a dividend equalisation reserve. A capital reserve is made out of a capital profit, such as a profit on the sale of a fixed asset. A secret reserve is not shown in the balance sheet, and it can be built by undervaluing assets or overvaluing liabilities.',
    }),
    sl('concept', 'Importance of reserves', {
      v: vImportance,
      n: 'Reserves are important for four reasons. They give the business a stronger position that outsiders can see. They help to meet unexpected losses without borrowing. They provide funds for expansion, since profit kept back can buy assets without a loan. And a specific reserve helps the owners to be paid steadily in lean years.',
    }),
    sl('check', 'Quick check: the general reserve', {
      b: 'Find the amount transferred to general reserve by an imagined firm after it charges a provision.',
      chk: 'n_reserve',
      n: 'The provision is charged first. The reserve is a share of the net profit that is left after the provision.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Depreciation is credited to the asset account, or to a Provision for Depreciation A/c with the asset kept at cost.', 'At sale: depreciation to the date of sale, book value, profit or loss; Asset Disposal A/c with a provision account.', 'A provision is charged against profit; a reserve is set aside out of profit.'],
      v: vSum2,
      n: 'To sum up. Depreciation is recorded either by crediting the asset account directly or by crediting a provision for depreciation account, with the asset kept at cost. The depreciation account is closed by a transfer to profit and loss. When an asset is sold, depreciation is charged up to the date of sale, the book value is found, and the profit or loss is the sale proceeds less the book value. A provision is a charge against profit, and a reserve is set aside out of profit.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Show the working of depreciation by year and by machine.', 'Find the book value at sale before the profit or loss.', 'Never mix provisions and reserves.'],
      v: vTips2,
      n: 'In the examination, show the working of depreciation by year and by machine, because part years are where marks are lost. Find the book value at the date of sale first, and then compare it with the sale price. Balance every account, and check that the asset disposal account closes. And keep provisions and reserves apart: one is charged against profit and the other is set aside out of profit.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Depreciation, Provisions and Reserves — Notes',
  sections: [
    {
      h: '1. Depreciation: meaning and features',
      t: 1,
      b: '**Depreciation** is the decline in the book value of a fixed asset through use, the passage of time or obsolescence. In accounting it means spreading the **depreciable cost** of the asset over its **useful life**, as an expense charged against the revenue of each year.\n\n**Features:** (1) it is a decline in book value; (2) it applies to fixed assets only; (3) it is a non-cash expense, since the cash was paid when the asset was bought; (4) it is a charge against revenue, so it reduces profit.',
      terms: [
        ['Fixed asset', 'A long-lived resource that the business holds for use in its operations, not for sale in the ordinary course, for example machinery or furniture.'],
        ['Depreciation', 'The decline in the book value of a fixed asset through use, the passage of time or obsolescence; the allocation of its depreciable cost over its useful life.'],
        ['Book value', 'The cost of an asset less the depreciation charged on it up to a date; also called the written down value.'],
        ['Non-cash expense', 'An expense, such as depreciation, whose charge needs no payment of cash in the year it is charged.'],
      ],
      v: vFlow1,
      vs: [vMeaning, vFeatures],
    },
    {
      h: '2. Causes, need and the factors that fix the amount',
      t: 1,
      b: '**Causes:** wear and tear; expiry of legal rights (a lease, patent or licence); obsolescence; abnormal factors such as accident, fire, flood or theft.\n\n**Need:** matching of cost with revenue; true profit; true financial position; replacement funds; tax considerations.\n\n**Factors:** the cost of the asset, its estimated residual value, its depreciable cost (cost less residual value) and its estimated useful life.',
      terms: [
        ['Depreciable cost', 'The cost of an asset less its estimated residual value; the amount to be spread over the useful life.'],
        ['Residual value', 'The estimated amount that an asset will fetch at the end of its useful life, after deducting the expected cost of selling it; also called scrap or salvage value.'],
        ['Useful life', 'The estimated period, in years, over which an asset is expected to serve the business.'],
        ['Obsolescence', 'Loss of the usefulness of an asset because newer technology or a change in demand has made it out of date.'],
      ],
      v: vCauses,
      vs: [vNeed, vFactors],
    },
    {
      h: '3. Straight line method',
      t: 1,
      b: 'Under the **straight line method** (fixed instalment method) the same amount is charged every year: **yearly depreciation = (cost − residual value) ÷ estimated life**, or a fixed rate on the original cost.\n\nRana Engineering: (' + inr(RANA.cost) + ' − ' + inr(RANA.scrap) + ') ÷ ' + RANA.life + ' = ' + rs(RANA.dep.annual) + ' a year, which is ' + RANA.dep.ratePct + '% of cost.\n\n**Merits:** simple; equal charge; asset can be written down to the residual value or nil. **Limits:** ignores rising repairs; ignores interest on the money tied up.',
      terms: [['Straight line method', 'A method of depreciation that charges the same amount in each full year, found by dividing the depreciable cost by the estimated life or by applying a fixed rate to original cost.']],
      v: vSlmEx,
      vs: [vSlm, vSlmML],
    },
    {
      h: '4. Written down value method and comparison',
      t: 1,
      b: 'Under the **written down value method** (diminishing balance method) a fixed rate is applied to the **opening book value** of each year, so the charge falls every year and the book value never reaches nil.\n\nSunder Tools, 15% on ' + inr(200000) + ': ' + inr(SD[0].dep) + ', ' + inr(SD[1].dep) + ', ' + inr(SD[2].dep) + '.\n\n**Part of a year:** an asset bought or sold during the year is charged for the months of use, rate × months ÷ 12.\n\n**Comparison:** the straight line method charges on cost and equally; the written down value method charges on the book value and less each year. At the same rate the first-year charges are equal.',
      terms: [['Written down value method', 'A method of depreciation that applies a fixed rate to the opening book value of each year, so the yearly charge falls.']],
      v: vLine,
      vs: [vWdvEx, vWdvML, vPartYear, vCompareTable],
    },
    {
      h: '5. Recording depreciation',
      t: 2,
      b: '**Two ways.** (1) Charge depreciation to the **asset account**: Depreciation A/c Dr., To Machinery A/c; the asset is shown at book value. (2) Create a **provision for depreciation (accumulated depreciation) account**: Depreciation A/c Dr., To Provision for Depreciation A/c; the asset stays at cost and the provision is deducted from it.\n\nIn both ways the Depreciation A/c is closed by **Profit and Loss A/c Dr., To Depreciation A/c**.',
      terms: [
        ['Provision for depreciation account', 'An account, also called accumulated depreciation, that collects the depreciation of each year on its credit side while the asset is kept at cost in its own account.'],
      ],
      v: vTwoWays,
      vs: [vEntries],
    },
    {
      h: '6. Disposal of assets; addition of an asset',
      t: 2,
      b: '**Sale of an asset:** (1) charge depreciation up to the date of sale; (2) book value at the date of sale = cost − depreciation to that date; (3) profit or loss = sale proceeds − book value; (4) record the sale in the Machinery A/c, or in an **Asset Disposal A/c** when a provision account is kept; (5) transfer the profit or loss to the Profit and Loss A/c.\n\nAsha Printers: Machine B, book value ' + inr(AP.years[2].sold.bv) + ', sold for ' + inr(180000) + ': loss ' + inr(-AP.years[2].sold.result) + '.\n\n**Sale of part of the assets:** only the cost and depreciation of that part leave the accounts. **Addition:** depreciation from the date of purchase.',
      terms: [
        ['Asset Disposal account', 'A temporary account in which the cost, the accumulated depreciation and the sale proceeds of an asset are brought together to find the profit or loss on its sale; it closes with a nil balance.'],
        ['Profit or loss on sale', 'The sale proceeds of an asset less its book value at the date of sale; a positive figure is a profit and a negative figure is a loss.'],
      ],
      v: vApY3,
      vs: [vDisposalRules, vThree, vCpDisp, vPartAdd],
    },
    {
      h: '7. Provisions and reserves',
      t: 3,
      b: 'A **provision** is an amount charged against profit for a known liability or loss whose amount cannot be stated exactly (depreciation, doubtful debts, taxation, repairs). A **reserve** is an appropriation of profit kept back to strengthen the business.\n\n**Reserves:** revenue reserves (general reserve, with no stated purpose, and specific reserve, for a stated purpose such as dividend equalisation); capital reserve (from a capital profit such as a gain on the sale of a fixed asset); secret reserve (not shown in the balance sheet).\n\n**Importance of reserves:** stronger position, meeting unexpected losses, expansion, even payouts.\n\nThe provision for doubtful debts is only named here.',
      terms: [
        ['Provision', 'An amount charged against profit for a known liability or an expected loss whose exact amount cannot be determined.'],
        ['Reserve', 'A part of profit that is retained in the business, by appropriation, to strengthen its financial position.'],
        ['General reserve', 'A revenue reserve created out of profit without any particular purpose.'],
        ['Specific reserve', 'A revenue reserve created out of profit for a stated purpose, for example a dividend equalisation reserve.'],
        ['Capital reserve', 'A reserve created out of a capital profit, for example the profit on the sale of a fixed asset.'],
        ['Secret reserve', 'A reserve that is not disclosed in the balance sheet, created by undervaluing assets or overvaluing liabilities.'],
      ],
      v: vPR,
      vs: [vProv, vDiff, vReserves, vImportance],
    },
  ],
  tips: '- Depreciation: write the formula, substitute, and count the months for a part-year.\n- Straight line: rate on cost, equal charge. Written down value: rate on opening book value, falling charge.\n- Direct method: Depreciation A/c Dr., To Machinery A/c. Provision method: Depreciation A/c Dr., To Provision for Depreciation A/c; asset at cost.\n- Always close the Depreciation A/c by a transfer to the Profit and Loss A/c.\n- On sale: depreciation to the date of sale, book value, then sale proceeds less book value.\n- Balance every account with To and By lines; the Asset Disposal A/c must close.\n- Provision: a charge against profit. Reserve: an appropriation of profit. Never mix them.',
});

// ================================================================ flashcards
const FC = cards([
  ['**Depreciation**', 'The decline in the book value of a fixed asset through use, the passage of time or obsolescence; its depreciable cost is spread over its useful life.', 'definition', 1],
  ['Four features of depreciation', 'Decline in book value; applies to fixed assets; non-cash expense; charge against revenue.', 'fact', 1],
  ['Four causes of depreciation', 'Wear and tear; expiry of legal rights; obsolescence; abnormal factors such as accident or fire.', 'fact', 1],
  ['Why charge depreciation?', 'Matching; true profit; true financial position; replacement funds; tax considerations.', 'concept', 1],
  ['**Depreciable cost**', 'Cost of the asset less its estimated residual value.', 'definition', 1],
  ['**Residual value**', 'The estimated amount an asset will fetch at the end of its useful life, net of selling costs; scrap or salvage value.', 'definition', 1],
  ['**Book value**', 'Cost less the depreciation charged up to a date; the written down value.', 'definition', 1],
  ['Factors that fix the amount of depreciation', 'Cost; estimated residual value; depreciable cost; estimated useful life.', 'fact', 1],
  ['**Straight line method**', 'Equal charge each year: (cost − residual value) ÷ life, or a fixed rate on original cost.', 'definition', 1],
  ['Straight line formula', 'Yearly depreciation = (cost − residual value) ÷ estimated life.', 'formula', 1],
  ['Rate of the straight line method', 'Yearly depreciation ÷ original cost × 100.', 'formula', 1],
  ['**Written down value method**', 'A fixed rate on the opening book value of each year; the charge falls; the book value never reaches nil.', 'definition', 1],
  ['Written down value charge', 'Rate × opening book value of the year.', 'formula', 1],
  ['Merits of the straight line method', 'Simple; equal charge; asset can be written down to the residual value or nil.', 'fact', 1],
  ['Limits of the straight line method', 'Ignores rising repairs; ignores interest on the money tied up in the asset.', 'fact', 1],
  ['Merits of the written down value method', 'Heavy charge when repairs are low, light charge when repairs are high; more even total burden.', 'fact', 1],
  ['Limit of the written down value method', 'Book value never reaches nil; harder to calculate; late charges become very small.', 'fact', 1],
  ['Part of a year', 'Charge = yearly depreciation × months of use ÷ 12, from the date of purchase or to the date of sale.', 'formula', 1],
  ['First-year charge at the same rate', 'Equal under both methods, because the opening book value is the cost.', 'fact', 1],
  ['Two ways of recording depreciation', 'Credit the asset account; or credit a Provision for Depreciation A/c and keep the asset at cost.', 'concept', 2],
  ['Entry: depreciation charged to the asset account', 'Depreciation A/c Dr., To Asset A/c.', 'concept', 2],
  ['Entry: provision method', 'Depreciation A/c Dr., To Provision for Depreciation A/c.', 'concept', 2],
  ['Closing the Depreciation A/c', 'Profit and Loss A/c Dr., To Depreciation A/c.', 'concept', 2],
  ['Balance sheet under the provision method', 'The asset at original cost, with the provision for depreciation deducted from it.', 'concept', 2],
  ['**Asset Disposal account**', 'Temporary account that brings together cost, accumulated depreciation and sale proceeds of an asset to find the profit or loss on sale; it closes at nil.', 'definition', 2],
  ['Profit or loss on sale', 'Sale proceeds − book value at the date of sale; positive is profit, negative is loss.', 'formula', 2],
  ['Book value at the date of sale', 'Cost − depreciation up to the date of sale, including the part-year charge.', 'formula', 2],
  ['Sale of part of the assets', 'Only the cost and the depreciation of the part sold leave the accounts.', 'concept', 2],
  ['**Provision**', 'An amount charged against profit for a known liability or loss of uncertain amount; examples: depreciation, doubtful debts, taxation, repairs.', 'definition', 3],
  ['**Reserve**', 'A part of profit kept back in the business to strengthen it; an appropriation of profit.', 'definition', 3],
  ['Provision against reserve: effect on profit', 'A provision reduces the profit; a reserve is set aside out of the profit already found.', 'concept', 3],
  ['Types of reserves', 'General; specific; capital; secret.', 'fact', 3],
  ['**Secret reserve**', 'A reserve not disclosed in the balance sheet, created by undervaluing assets or overvaluing liabilities.', 'definition', 3],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Depreciation, Provisions and Reserves',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dep_cause_obs', 'm_entry_direct', 'm_prov_def', 'ar_noncash'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_dep_meaning', 's2_disposal_def', 's3_entries_direct'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_slm_ledger', 'l5_wdv_ledger'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_slm'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Depreciation, Provisions and Reserves',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dep_cause_legal', 'm_slm_amount', 'm_wdv_feature', 'm_wdv_suits', 'm_entry_prov', 'm_loss_sale', 'm_prov_reserve_diff', 'm_secret', 'ar_wdv_rate', 'ar_prov_profit'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_causes', 's2_two_ways', { attempt: 1, keys: ['s2_secret', 's2_wdv_merit'] }, 's3_entries_prov', { attempt: 1, keys: ['s3_compare', 's3_reserve_types'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_prov', { attempt: 1, keys: ['l5_compare', 'l5_prov_reserve'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_prov', 'cb_reserve'] },
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
const checksUsed = new Set(['m_dep_meaning', 'tf_noncash_chk', 'n_slm_annual', 'n_wdv3', 'm_prov_method', 'ord_sale_entries', 'fb_disposal', 'n_reserve']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void sum;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01, t02 and t03 of cbse-11-accountancy-ch07 (depreciation: meaning, features, causes, need, factors, straight line and written down value methods; recording depreciation by charging the asset account and by a provision for depreciation account, disposal of assets with the asset disposal account, sale of part of an asset and addition of an asset; provisions and reserves, types of reserves and their importance)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed with the shared acc.mjs (slm, schedule, onSale, ledger, journal) and the chapter helpers in extra.mjs and asserted: depreciation plus closing book value equals cost, the Machinery A/c of the direct method closes at the computed book value, the Machinery A/c at cost less the Provision for Depreciation A/c closes at the same book value, the Asset Disposal A/c closes at nil, the book value at sale and the profit or loss on sale agree across the accounts, every journal entry balances, and the profit allocation adds up; tables in decks and model answers are generated from the computed objects',
    facts: 'depreciation meaning, features, causes, need and factors; straight line and written down value methods with part-year charges; recording depreciation in the asset account and through a provision account; disposal of an asset with depreciation to the date of sale, book value and profit or loss on sale; sale of part of the assets and addition of an asset; provisions and reserves, their differences, the types of reserves and their importance',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
