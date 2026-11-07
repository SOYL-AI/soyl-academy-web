// Build CBSE 11 Accountancy ch09 Financial Statements II. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch09', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const F = await import('./figures.mjs');
const { same, check, sum, inr, rs, rupees, pcw, pctOf, commissionOn, debtsCalc, journal, mdTable, NC, NC_SPEC, NC_IMPACT, QC0, QCb, QCa } = F;
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
const cell = (s, x, y, w, t, o = {}) => {
  const size = o.size ?? 12;
  check(t.length * size * 0.54 <= w - 10, `svg cell too wide: "${t}"`);
  s.text(x + 8, y, t, { anchor: 'start', size, bold: o.bold });
};

const vFlowAdj = (() => {
  const s = new Svg(800, 190);
  const xs = [100, 300, 500, 700];
  const labels = [['Trial balance', 'balances of all', 'ledger accounts'], ['Adjustments', 'two effects each', 'items outside it'], ['Trading and Profit', 'and Loss Account', 'adjusted profit'], ['Balance Sheet', 'adjusted assets,', 'liabilities, capital']];
  labels.forEach((l, i) => box(s, xs[i], 56, 160, 78, l, { bold: true, fill: i === 1 ? 'accent' : 'fill', gap: 20 }));
  for (let i = 0; i < 3; i++) s.arrow(xs[i] + 80, 56, xs[i + 1] - 80, 56, { sw: 1.8 });
  s.text(400, 124, 'The trial balance is incomplete until the adjustments are applied', { size: 13 });
  s.text(400, 156, 'Every adjustment is shown in two places in the final accounts', { size: 13, muted: true });
  return s.visual('Flow from the trial balance, through the adjustments that have two effects each, to the adjusted Trading and Profit and Loss Account and the adjusted Balance Sheet; every adjustment is shown in two places in the final accounts', 'The route from the trial balance and the adjustments to the final accounts.');
})();

const TWO = [
  ['Closing stock (outside)', 'Credit side of Trading A/c', 'Current asset'],
  ['Outstanding expense', 'Added to the expense', 'Current liability'],
  ['Prepaid expense', 'Deducted from the expense', 'Current asset'],
  ['Accrued income', 'Added to the income', 'Current asset'],
  ['Income received in advance', 'Deducted from the income', 'Current liability'],
  ['Depreciation', 'Debit to Profit and Loss A/c', 'Deducted from the asset'],
  ['Further bad debts', 'Debit to Profit and Loss A/c', 'Deducted from debtors'],
  ['Provision for doubtful debts', 'Debit: new less old provision', 'Deducted from debtors'],
  ['Provision for discount', 'Debit: new less old provision', 'Deducted from debtors'],
  ['Interest on capital', 'Debit to Profit and Loss A/c', 'Added to capital'],
  ['Interest on drawings', 'Credit to Profit and Loss A/c', 'Deducted from capital'],
  ["Manager's commission", 'Debit to Profit and Loss A/c', 'Current liability'],
  ['Goods withdrawn', 'Deducted from purchases', 'Added to drawings'],
  ['Abnormal loss by fire', 'Credit Trading A/c; uninsured part to P and L', 'Insurance claim, current asset'],
];
const vTwo = (() => {
  const rowH = 25, top = 34, W = 800, H = top + (TWO.length + 1) * rowH + 18;
  const s = new Svg(W, H);
  const cols = [[10, 230], [240, 330], [570, 220]];
  s.rect(6, 8, W - 12, rowH + 6, { fill: 'accent', color: 'accent', sw: 1, rx: 6 });
  ['Adjustment', 'Effect in Trading or Profit and Loss', 'Effect in the Balance Sheet'].forEach((h, i) => cell(s, cols[i][0], 24, cols[i][1], h, { bold: true }));
  TWO.forEach((r, ri) => {
    const y = top + 14 + (ri + 1) * rowH - rowH / 2 + 6;
    s.line(6, y + rowH / 2 - 1, W - 6, y + rowH / 2 - 1, { sw: 0.6, color: 'muted' });
    r.forEach((t, i) => cell(s, cols[i][0] - 2, y, cols[i][1], t, { bold: i === 0 }));
  });
  return s.visual(`Chart with one row for each of fourteen adjustments showing the effect in the Trading or Profit and Loss Account and the effect in the Balance Sheet: ${TWO.map((r) => `${r[0]}: ${r[1]}, and ${r[2]}`).join('; ')}`, 'Where each adjustment appears: one effect in the accounts and one in the Balance Sheet.');
})();

const P3 = debtsCalc({ debtors: 200000, bdTB: 5000, further: 10000, oldPdd: 12000, pddPct: 5 });
same(P3.newPdd, 9500, 'deck provision example new provision');
same(P3.charge, 12500, 'deck provision example charge');
same(P3.net, 180500, 'deck provision example net debtors');
const vProv = (() => {
  const s = new Svg(800, 330);
  box(s, 130, 40, 220, 64, ['Debtors in the', 'trial balance', rs(P3.debtors)], { gap: 19 });
  box(s, 400, 40, 220, 64, ['Less further', 'bad debts', rs(P3.further)], { gap: 19 });
  box(s, 670, 40, 220, 64, ['Debtors left', rs(P3.after)], { gap: 22, bold: true });
  s.arrow(240, 40, 290, 40, { sw: 1.6 });
  s.arrow(510, 40, 560, 40, { sw: 1.6 });
  box(s, 670, 140, 220, 64, [`New provision at ${P3.pddPct} per cent`, rs(P3.newPdd)], { gap: 22, bold: true, fill: 'accent' });
  s.arrow(670, 74, 670, 106, { sw: 1.6 });
  box(s, 220, 262, 400, 92, ['Profit and Loss Account charge', rs(P3.charge), 'bad debts + further bad debts', '+ new provision − old provision'], { gap: 21, bold: true });
  box(s, 640, 262, 280, 92, ['Balance Sheet debtors', rs(P3.net), 'debtors − further bad debts', '− new provision'], { gap: 21, bold: true });
  s.arrow(560, 140, 330, 214, { sw: 1.4 });
  s.arrow(670, 172, 650, 214, { sw: 1.4 });
  return s.visual(`Flow of the provision for doubtful debts: debtors of ${inr(P3.debtors)} less further bad debts of ${inr(P3.further)} leave ${inr(P3.after)}; the new provision at ${P3.pddPct} per cent is ${inr(P3.newPdd)}; the Profit and Loss charge is bad debts plus further bad debts plus the new provision less the old provision, ${inr(P3.charge)}; the Balance Sheet shows debtors less further bad debts less the new provision, ${inr(P3.net)}`, 'From debtors to the provision, the Profit and Loss charge and the Balance Sheet figure.');
})();

const CM = { np: 55000, p: 10 };
CM.before = same(commissionOn(CM.np, CM.p, 'before'), 5500, 'deck commission before');
CM.after = same(commissionOn(CM.np, CM.p, 'after'), 5000, 'deck commission after');
const vComm = (() => {
  const s = new Svg(800, 300);
  box(s, 200, 30, 360, 40, `Before charging: ${CM.p} per cent of the profit`, { fill: 'accent', bold: true, size: 14 });
  box(s, 600, 30, 360, 40, `After charging: ${CM.p} over ${100 + CM.p} of the profit`, { fill: 'accent', bold: true, size: 14 });
  box(s, 200, 100, 360, 56, ['Net profit before commission', rs(CM.np)], { gap: 22 });
  box(s, 600, 100, 360, 56, ['Net profit before commission', rs(CM.np)], { gap: 22 });
  box(s, 200, 168, 360, 56, [`${CM.p} per cent of ${inr(CM.np)}`, `Commission ${rs(CM.before)}`], { gap: 22, bold: true });
  box(s, 600, 168, 360, 56, [`${inr(CM.np)} × ${CM.p} ÷ ${100 + CM.p}`, `Commission ${rs(CM.after)}`], { gap: 22, bold: true });
  box(s, 200, 236, 360, 56, ['Net profit after commission', rs(CM.np - CM.before)], { gap: 22 });
  box(s, 600, 236, 360, 56, ['Net profit after commission', rs(CM.np - CM.after)], { gap: 22 });
  for (const x of [200, 600]) { s.arrow(x, 58, x, 72, { sw: 1.4 }); s.arrow(x, 128, x, 140, { sw: 1.4 }); s.arrow(x, 196, x, 208, { sw: 1.4 }); }
  same(pctOf(CM.np - CM.after, CM.p), CM.after, 'commission after is the rate on the profit left');
  return s.visual(`Comparison of the manager's commission on a net profit of ${inr(CM.np)} before commission: charged on the profit before charging it, the commission is ${CM.p} per cent, ${inr(CM.before)}, leaving ${inr(CM.np - CM.before)}; charged on the profit after charging it, the commission is ${CM.p} over ${100 + CM.p} of the profit, ${inr(CM.after)}, leaving ${inr(CM.np - CM.after)}`, 'The same profit, the commission on the two bases.');
})();

// ================================================================ tables for slides
const vWhy = T(['Idea', 'What it says', 'Result for the final accounts'], [
  ['Matching concept', 'The expenses of a year are set against the income of the same year', 'Items of the year that are unpaid or unreceived are brought in'],
  ['Accrual basis', 'Income and expenses are recorded when earned or incurred, not when cash moves', 'Outstanding, prepaid, accrued and advance items are adjusted'],
  ['Trial balance only', 'It records what was entered during the year', 'On its own it gives a wrong profit and a wrong Balance Sheet'],
], 'Table of the matching concept, the accrual basis and the limit of the trial balance, with the result for the final accounts');
const vStock = T(['Closing stock is', 'Trading Account', 'Balance Sheet', 'Why'], [
  ['Given outside the trial balance', 'Credit side', 'Current asset', 'It is not yet in any account, so it is entered twice'],
  ['Already in the trial balance', 'Not shown again', 'Current asset', 'The Trading Account was prepared, so only the asset remains'],
], 'Table comparing closing stock given outside the trial balance, shown in the Trading Account and the Balance Sheet, with closing stock already inside it, shown only in the Balance Sheet');
const vOutPre = T(['Adjustment', 'Meaning', 'Effect on the expense', 'Balance Sheet'], [
  ['Outstanding expense', 'Incurred in the year but not yet paid', 'Added to the expense paid', 'Current liability'],
  ['Prepaid expense', 'Paid in the year for a later period', 'Deducted from the expense paid', 'Current asset'],
], 'Table of the outstanding expense, incurred but unpaid, added to the expense and shown as a current liability, and the prepaid expense, paid for a later period, deducted from the expense and shown as a current asset');
const vAccAdv = T(['Adjustment', 'Meaning', 'Effect on the income', 'Balance Sheet'], [
  ['Accrued income', 'Earned in the year but not yet received', 'Added to the income received', 'Current asset'],
  ['Income received in advance', 'Received in the year for a later period', 'Deducted from the income received', 'Current liability'],
], 'Table of accrued income, earned but not received, added to the income and shown as a current asset, and income received in advance, received for a later period, deducted from the income and shown as a current liability');
const J1 = { wag: 60000, wout: 5000, rent: 24000, rpre: 2000, intr: 9000, iacc: 1000 };
const J1v = { wag: same(J1.wag + J1.wout, 65000, 'Jaya Joinery wages'), rent: same(J1.rent - J1.rpre, 22000, 'Jaya Joinery rent'), intr: same(J1.intr + J1.iacc, 10000, 'Jaya Joinery interest') };
const vEx1 = T(['Item', 'Paid or received', 'Adjustment', 'Amount in the accounts', 'Balance Sheet'], [
  ['Wages', rs(J1.wag), `+ ${rs(J1.wout)} outstanding`, `${rs(J1v.wag)} to Trading A/c`, `Current liability ${rs(J1.wout)}`],
  ['Rent', rs(J1.rent), `− ${rs(J1.rpre)} prepaid`, `${rs(J1v.rent)} to Profit and Loss A/c`, `Current asset ${rs(J1.rpre)}`],
  ['Interest received', rs(J1.intr), `+ ${rs(J1.iacc)} accrued`, `${rs(J1v.intr)} to Profit and Loss A/c`, `Current asset ${rs(J1.iacc)}`],
], `Adjustments of Jaya Joinery: wages paid ${inr(J1.wag)} plus ${inr(J1.wout)} outstanding gives ${inr(J1v.wag)}; rent paid ${inr(J1.rent)} less ${inr(J1.rpre)} prepaid gives ${inr(J1v.rent)}; interest received ${inr(J1.intr)} plus ${inr(J1.iacc)} accrued gives ${inr(J1v.intr)}`);
const vDep = T(['Point', 'Rule'], [
  ['What it is', 'The fall in the value of a fixed asset through use, passage of time or obsolescence'],
  ['Profit and Loss Account', 'Debited as an expense of the year; no cash is paid'],
  ['Balance Sheet', 'Deducted from the asset, which is shown at its reduced value'],
  ['Amount', 'A given rate per cent of the book figure in the trial balance'],
], 'Table of the rules for depreciation as an adjustment: the fall in value of a fixed asset, debited to the Profit and Loss Account, deducted from the asset in the Balance Sheet, at a given rate per cent');
const H2 = { mac: 300000, macR: 10, fur: 80000, furR: 5 };
const H2v = { mac: pctOf(H2.mac, H2.macR), fur: pctOf(H2.fur, H2.furR) };
same(H2v.mac + H2v.fur, 34000, 'Hemlata Hardware total depreciation');
const vEx2 = T(['Asset', 'Book figure', 'Rate', 'Depreciation', 'Shown in the Balance Sheet'], [
  ['Machinery', rs(H2.mac), `${H2.macR} per cent`, rs(H2v.mac), rs(H2.mac - H2v.mac)],
  ['Furniture', rs(H2.fur), `${H2.furR} per cent`, rs(H2v.fur), rs(H2.fur - H2v.fur)],
  ['**Total**', rs(H2.mac + H2.fur), '', `**${rs(H2v.mac + H2v.fur)}**`, `**${rs(H2.mac + H2.fur - H2v.mac - H2v.fur)}**`],
], `Depreciation of Hemlata Hardware: machinery ${inr(H2.mac)} at ${H2.macR} per cent gives ${inr(H2v.mac)} and is shown at ${inr(H2.mac - H2v.mac)}; furniture ${inr(H2.fur)} at ${H2.furR} per cent gives ${inr(H2v.fur)} and is shown at ${inr(H2.fur - H2v.fur)}; total depreciation ${inr(H2v.mac + H2v.fur)}`);
const vGoods = T(['Point', 'Rule'], [
  ['Event', 'The proprietor takes goods from stock for personal use, usually with no entry'],
  ['Trading Account', 'The cost is deducted from purchases, which raises the gross profit'],
  ['Balance Sheet', 'The cost is added to drawings, which reduces capital'],
  ['Entry', 'Drawings A/c Dr. To Purchases A/c'],
], 'Table of the treatment of goods withdrawn for personal use: deducted from purchases in the Trading Account, added to drawings and reducing capital, with the journal entry');
const vLossRules = T(['Part of the loss', 'Where it goes'], [
  ['Cost of the goods lost', 'Credit side of the Trading Account, as the goods are not part of the cost of sales'],
  ['Claim admitted by the insurer', 'Current asset in the Balance Sheet: insurance claim receivable'],
  ['Uninsured part (loss less claim)', 'Debit side of the Profit and Loss Account as an abnormal loss'],
], 'Table of the treatment of an abnormal loss of goods by fire: the cost credited to the Trading Account, the insurance claim a current asset, and the uninsured part debited to the Profit and Loss Account');
const I3 = { loss: 40000, claim: 30000 };
I3.unins = same(I3.loss - I3.claim, 10000, 'Ishwar Interiors uninsured loss');
const vEx3 = T(['Statement', 'Entry', 'Amount'], [
  ['Trading Account', 'Credit: abnormal loss of goods', rs(I3.loss)],
  ['Profit and Loss Account', 'Debit: abnormal loss, uninsured part', rs(I3.unins)],
  ['Balance Sheet', 'Current asset: insurance claim receivable', rs(I3.claim)],
], `Loss of goods by fire at Ishwar Interiors: ${inr(I3.loss)} credited to the Trading Account, ${inr(I3.unins)} uninsured part debited to the Profit and Loss Account, and the insurance claim of ${inr(I3.claim)} shown as a current asset`);
const E4 = journal(NC.journalEntries.slice(0, 4));
const vEx4 = T(E4.headers, E4.rows, `Adjusting entries of Nisha Crafts on 31 March 2026: closing stock ${inr(NC.closing)} to the Trading Account; wages outstanding ${inr(NC.amounts.out)}; insurance prepaid ${inr(NC.amounts.pre)}; commission accrued ${inr(NC.amounts.acc)}`);
const vSum1 = T(['Adjustment', 'Two effects'], [
  ['Closing stock', 'Trading Account credit and current asset; asset only when already in the trial balance'],
  ['Outstanding and prepaid expenses', 'Added to or deducted from the expense; current liability or current asset'],
  ['Accrued income and income in advance', 'Added to or deducted from the income; current asset or current liability'],
  ['Depreciation', 'Debit to the Profit and Loss Account; deduction from the asset'],
  ['Goods withdrawn; abnormal loss', 'Purchases down and drawings up; Trading credit, uninsured loss and claim'],
], 'Summary table of the adjustments of Part 1 with their two effects');
const vTips1 = T(['Do', 'Why'], [
  ['Show every adjustment in two places', 'One missing effect makes the Balance Sheet disagree'],
  ['Tell closing stock inside the trial balance from closing stock outside it', 'Inside, it is not credited again'],
  ['Add outstanding items to the expense and deduct prepaid items', 'The year bears only its own cost'],
  ['Deduct depreciation from the asset in the Balance Sheet', 'The asset is shown at its reduced value'],
  ['Credit the Trading Account with the whole loss by fire', 'Only the uninsured part goes to the Profit and Loss Account'],
], 'Exam tips table for the first group of adjustments');

const vBad = T(['Term', 'Meaning', 'Where it appears'], [
  ['Bad debts', 'Debts already written off during the year, in the trial balance', 'Debit of the Profit and Loss Account'],
  ['Further bad debts', 'Debts found irrecoverable at the year end, given as an adjustment', 'Debit of the Profit and Loss Account; deducted from debtors'],
  ['Provision for doubtful debts', 'An amount set aside for the debtors who may not pay', 'Debit of the Profit and Loss Account; deducted from debtors'],
], 'Table of bad debts, further bad debts and the provision for doubtful debts with their meaning and where each appears');
const vEx5a = T(['Item', 'Working', 'Amount (₹)'], [
  ['Bad debts in the trial balance', '', inr(5000)],
  ['Further bad debts', '', inr(P3.further)],
  [`New provision at ${P3.pddPct} per cent`, `${inr(P3.after)} × ${P3.pddPct} ÷ 100`, inr(P3.newPdd)],
  ['Less: old provision', '', `(${inr(P3.oldPdd)})`],
  ['**Charge to the Profit and Loss Account**', '', `**${inr(P3.charge)}**`],
  ['Debtors in the Balance Sheet', `${inr(P3.debtors)} − ${inr(P3.further)} − ${inr(P3.newPdd)}`, inr(P3.net)],
], `Worked example of Hrithik Hardware: bad debts ${inr(5000)}, further bad debts ${inr(P3.further)} and new provision ${inr(P3.newPdd)} less old provision ${inr(P3.oldPdd)} give a charge of ${inr(P3.charge)}; debtors in the Balance Sheet are ${inr(P3.net)}`);
same(P3.bdTB, 5000, 'deck example bad debts in the trial balance');
const vEx5b = T(P3.pddLedger.headers, P3.pddLedger.rows, `Provision for Doubtful Debts Account of Hrithik Hardware: debit side bad debts ${inr(P3.bdTotal)} and balance carried down ${inr(P3.newPdd)}; credit side balance brought down ${inr(P3.oldPdd)} and Profit and Loss Account ${inr(P3.charge)}; each side totals ${inr(P3.pddLedger.total)}`);
const P1 = debtsCalc({ debtors: 100000, bdTB: 3000, further: 5000, pddPct: 6 });
same(P1.charge, 13700, 'deck new provision charge');
same(P1.net, 89300, 'deck new provision net debtors');
const vEx5c = T(P1.pddLedger.headers, P1.pddLedger.rows, `Provision for Doubtful Debts Account of Pawan Pumps with no old provision: debit side bad debts ${inr(P1.bdTotal)} and balance carried down ${inr(P1.newPdd)}; credit side the charge to the Profit and Loss Account ${inr(P1.charge)}; each side totals ${inr(P1.pddLedger.total)}`);
const P5 = debtsCalc({ debtors: 200000, bdTB: 5000, further: 10000, oldPdd: 12000, pddPct: 5, discPct: 2 });
same(P5.disc, 3610, 'deck discount provision');
same(P5.net, 176890, 'deck discount net debtors');
const vDisc = T(['Point', 'Rule'], [
  ['Purpose', 'To provide for the discount the firm expects to allow to debtors who pay promptly'],
  ['Base', 'Debtors after further bad debts and after the provision for doubtful debts'],
  ['Profit and Loss Account', 'Debit: new provision less the old provision, if any'],
  ['Balance Sheet', 'Deducted from debtors, after the provision for doubtful debts'],
], 'Table of the rules for the provision for discount on debtors: purpose, base after the provision for doubtful debts, debit to the Profit and Loss Account and deduction from debtors');
const vEx6 = T(['Step', 'Working', 'Amount (₹)'], [
  ['Debtors', '', inr(P5.debtors)],
  ['Less further bad debts', '', inr(P5.further)],
  [`Provision for doubtful debts at ${P5.pddPct} per cent`, `${inr(P5.after)} × ${P5.pddPct} ÷ 100`, inr(P5.newPdd)],
  ['Debtors after that provision', `${inr(P5.after)} − ${inr(P5.newPdd)}`, inr(P5.afterPdd)],
  [`Provision for discount at ${P5.discPct} per cent`, `${inr(P5.afterPdd)} × ${P5.discPct} ÷ 100`, inr(P5.disc)],
  ['**Debtors in the Balance Sheet**', `${inr(P5.afterPdd)} − ${inr(P5.disc)}`, `**${inr(P5.net)}**`],
], `Provision for discount on debtors of Hrithik Hardware: debtors ${inr(P5.debtors)} less further bad debts ${inr(P5.further)} leave ${inr(P5.after)}; provision for doubtful debts ${inr(P5.newPdd)} leaves ${inr(P5.afterPdd)}; discount provision at ${P5.discPct} per cent is ${inr(P5.disc)}; debtors in the Balance Sheet ${inr(P5.net)}`);
const vInt = T(['Adjustment', 'Profit and Loss Account', 'Balance Sheet', 'Basis'], [
  ['Interest on capital', 'Debit: an expense of the business', 'Added to capital', 'Rate per cent on the opening capital'],
  ['Interest on drawings', 'Credit: an income of the business', 'Deducted from capital', 'Rate per cent on the drawings, or the amount given'],
], 'Table of interest on capital, debited to the Profit and Loss Account and added to capital, and interest on drawings, credited to the Profit and Loss Account and deducted from capital');
const vEx7 = T(['Item', 'Working', 'Amount (₹)'], [
  ['Net profit before commission', '', inr(CM.np)],
  [`Commission on profit before charging it: ${CM.p} per cent`, `${inr(CM.np)} × ${CM.p} ÷ 100`, inr(CM.before)],
  ['Net profit after that commission', `${inr(CM.np)} − ${inr(CM.before)}`, inr(CM.np - CM.before)],
  [`Commission on profit after charging it`, `${inr(CM.np)} × ${CM.p} ÷ ${100 + CM.p}`, inr(CM.after)],
  ['Net profit after that commission', `${inr(CM.np)} − ${inr(CM.after)}`, inr(CM.np - CM.after)],
], `Manager's commission of Rudra Rubber on a net profit of ${inr(CM.np)} before commission: ${inr(CM.before)} on the profit before charging it, leaving ${inr(CM.np - CM.before)}, and ${inr(CM.after)} on the profit after charging it, leaving ${inr(CM.np - CM.after)}`);
const vImpact = T(NC_IMPACT.headers, NC_IMPACT.rows, `Effect of each adjustment of Nisha Crafts taken alone: outstanding wages lower the gross profit and net profit by ${inr(NC.amounts.out)}; prepaid insurance raises the net profit by ${inr(NC.amounts.pre)}; accrued commission by ${inr(NC.amounts.acc)}; depreciation lowers net profit and the Balance Sheet total by ${inr(NC.amounts.dep)}; goods withdrawn raise the gross profit and net profit by ${inr(NC.amounts.goods)}`);
const vNCtb = T(NC.tb.headers, NC.tb.rows, `Trial balance of Nisha Crafts on 31 March 2026: nineteen accounts, each column totalling ${inr(NC.tb.dr)} rupees; closing stock of ${inr(NC.closing)} is given outside it`);
const NCadjRows = [
  ['1', 'Closing stock', inr(NC.closing)], ['2', 'Wages outstanding', inr(NC.amounts.out)], ['3', 'Insurance paid in advance', inr(NC.amounts.pre)], ['4', 'Commission earned, not yet received', inr(NC.amounts.acc)],
  ['5', `Depreciation on machinery at ${NC_SPEC.adj[3].pct} per cent`, inr(NC.amounts.dep)], ['6', `Further bad debts ${inr(NC_SPEC.adj[4].further)}; provision for doubtful debts at ${NC_SPEC.adj[4].pddPct} per cent on the rest`, inr(NC.dc.newPdd)],
  ['7', `Interest on capital at ${NC_SPEC.adj[5].pct} per cent`, inr(NC.icAmt)], ['8', 'Goods taken by the proprietor, not recorded', inr(NC.amounts.goods)],
];
const vNCadj = T(['No.', 'Adjustment', 'Amount (₹)'], NCadjRows, `The eight adjustments of Nisha Crafts: closing stock ${inr(NC.closing)}, wages outstanding ${inr(NC.amounts.out)}, insurance prepaid ${inr(NC.amounts.pre)}, commission accrued ${inr(NC.amounts.acc)}, depreciation on machinery ${inr(NC.amounts.dep)}, provision for doubtful debts ${inr(NC.dc.newPdd)} after further bad debts, interest on capital ${inr(NC.icAmt)} and goods withdrawn ${inr(NC.amounts.goods)}`);
const vNCtr = T(NC.tr.headers, NC.tr.rows, `Trading Account of Nisha Crafts for the year ended 31 March 2026 after adjustments: opening stock ${inr(NC.os)}, purchases less returns and goods withdrawn ${inr(NC.pur - NC.pret - NC.goodsAmt)}, wages with outstanding ${inr(NC.dexp[0].amt + NC.amounts.out)} and carriage inwards ${inr(NC.dexp[1].amt)}; net sales ${inr(NC.sale - NC.sret)} and closing stock ${inr(NC.closing)}; gross profit ${inr(NC.gp)}`);
const vNCpl = T(NC.pl.headers, NC.pl.rows, `Profit and Loss Account of Nisha Crafts for the year ended 31 March 2026 after adjustments: gross profit ${inr(NC.gp)} and commission ${inr(NC.inc[0].amt + NC.amounts.acc)} against salaries, insurance, bad debts and provision ${inr(NC.dc.charge)}, depreciation ${inr(NC.amounts.dep)} and interest on capital ${inr(NC.icAmt)}; net profit ${inr(NC.np)}`);
const vNCbs = T(NC.bsG.headers, NC.bsG.rows, `Balance Sheet of Nisha Crafts as on 31 March 2026 after adjustments: capital ${inr(NC.capClosing)}, creditors ${inr(NC.cl[0].amt)} and outstanding wages ${inr(NC.amounts.out)}; machinery, furniture, closing stock, debtors, cash at bank, prepaid insurance and accrued commission; each side totals ${inr(NC.total)}`);
const vNCwhere = T(NC.adjTable.headers, NC.adjTable.rows, `Table of the eight adjustments of Nisha Crafts and the two places in which each is shown: the Trading or Profit and Loss Account and the Balance Sheet`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Bad debts and provisions', 'Charge = bad debts + further bad debts + new provision − old provision; debtors shown less further bad debts and the provision'],
  ['Provision for discount', 'On debtors after the provision for doubtful debts'],
  ['Interest', 'On capital: debit and added to capital. On drawings: credit and deducted from capital'],
  ["Manager's commission", 'Rate over 100 before charging; rate over 100 plus rate after charging; current liability'],
  ['Final accounts', 'Apply both effects of every adjustment; the Balance Sheet totals then agree'],
], 'Summary table of the adjustments of Part 2: bad debts and provisions, provision for discount, interest, manager commission and the final accounts');
const vTips2 = T(['Do', 'Why'], [
  ['Work out the provision on debtors after further bad debts', 'Written-off debts are no longer debtors'],
  ['Work out the discount provision after the doubtful debts provision', 'Discount applies to the good debtors only'],
  ['Show the working of the charge to the Profit and Loss Account', 'The steps carry the marks'],
  ['Name the basis of the commission before using a formula', 'The two bases give different amounts'],
  ['List each adjustment against both of its places and check the totals', 'A missing effect shows as a difference'],
], 'Exam tips table for the second group of adjustments and the final accounts');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Financial Statements II — Part 1: Why Adjustments; Stock, Expenses, Income, Depreciation, Goods and Loss',
  goals: [
    'Explain why adjustments are made, using the matching concept and the accrual basis',
    'Show closing stock, outstanding and prepaid expenses, accrued and advance income, depreciation, goods withdrawn and an abnormal loss in their two places',
    'Pass the adjusting entries and find the amounts charged to the accounts',
  ],
  slides: [
    sl('title', 'The trial balance is not the end', {
      b: 'Part 1: **why adjustments are made**, and the adjustments for stock, expenses, income, depreciation, goods and loss.',
      v: vFlowAdj,
      n: 'A trial balance shows what was recorded during the year. It does not yet show every expense and income that belongs to the year. Adjustments bring them in, and each one has two effects in the final accounts. In this part we study adjustments for stock, expenses, income, depreciation, goods taken by the proprietor and loss by fire, using imagined firms.',
    }),
    sl('concept', 'Why adjustments are needed', {
      b: 'The final accounts must show the income and expenses of the **year**, not only the cash that moved.',
      v: vWhy,
      n: 'The matching concept sets the expenses of a year against the income of the same year. The accrual basis records an item when it is earned or incurred, not when cash is paid or received. A trial balance records only what was entered, so on its own it gives a wrong profit and a wrong balance sheet. Adjustments correct this.',
    }),
    sl('concept', 'Every adjustment has two effects', {
      b: 'One effect in the Trading or Profit and Loss Account, and one in the **Balance Sheet**.',
      v: vTwo,
      n: 'This chart lists the adjustments of the chapter. Read one row at a time. Each adjustment changes one item in the trading account or the profit and loss account, and one item in the balance sheet. If you record only one of the two effects, the balance sheet will not agree. Closing stock inside the trial balance is the one case with a single place.',
    }),
    sl('concept', 'Closing stock', {
      b: 'Closing stock is credited in the Trading Account only when it is given **outside** the trial balance.',
      v: vStock,
      n: 'Closing stock given outside the trial balance has not yet been entered in any account. It is credited in the trading account and also shown as a current asset, so it appears twice. When closing stock is already in the trial balance, the trading account has been prepared, so it is shown only as a current asset in the balance sheet.',
    }),
    sl('check', 'Quick check: closing stock', {
      b: 'Decide where the closing stock of an imagined shop appears.',
      chk: 'm_stock_chk',
      n: 'First ask whether the closing stock is inside or outside the trial balance. Outside means it is not yet in any account. Then decide in how many statements it must appear so that both the gross profit and the balance sheet are right.',
    }),
    sl('concept', 'Outstanding and prepaid expenses', {
      b: 'An outstanding expense is **added**; a prepaid expense is **deducted**.',
      v: vOutPre,
      n: 'An outstanding expense is incurred in the year but not yet paid, so it is added to the expense paid, and it is a current liability. A prepaid expense is paid in the year for a later period, so it is deducted from the expense paid, and it is a current asset. The year should bear only its own cost.',
    }),
    sl('concept', 'Accrued income and income received in advance', {
      b: 'Accrued income is **added** to the income; income in advance is **deducted**.',
      v: vAccAdv,
      n: 'Income is adjusted in the same way, but the other way round. Accrued income is earned in the year but not yet received, so it is added to the income, and it is a current asset. Income received in advance belongs to a later period, so it is deducted from the income, and it is a current liability.',
    }),
    sl('example', 'Worked example 1: expenses and income of Jaya Joinery', {
      b: `**Jaya Joinery**, an imagined firm, has wages **${rs(J1v.wag)}**, rent **${rs(J1v.rent)}** and interest **${rs(J1v.intr)}** after adjustment.`,
      bl: ['Wages paid plus the outstanding wages.', 'Rent paid less the prepaid rent.', 'Interest received plus the accrued interest.'],
      v: vEx1,
      n: `Jaya Joinery, an imagined firm, paid wages of ${rupees(J1.wag)}, and ${rupees(J1.wout)} is outstanding, so ${rupees(J1v.wag)} goes to the trading account. Rent paid was ${rupees(J1.rent)} and ${rupees(J1.rpre)} is prepaid, so the charge is ${rupees(J1v.rent)}. Interest received was ${rupees(J1.intr)} and ${rupees(J1.iacc)} is accrued, so the income is ${rupees(J1v.intr)}.`,
    }),
    sl('check', 'Quick check: outstanding wages', {
      b: 'Find the wages charged to the Trading Account of an imagined firm.',
      chk: 'n_out_chk',
      n: 'Start with the wages paid in the year. Then decide whether the unpaid wages for the last month should be added or deducted, remembering that the year must bear its own wages.',
    }),
    sl('concept', 'Depreciation', {
      b: '**Depreciation** is the fall in the value of a fixed asset. It is an expense with no cash payment.',
      v: vDep,
      n: 'Depreciation is the fall in the value of a fixed asset through use, passage of time or obsolescence. It is debited to the profit and loss account as an expense of the year, although no cash is paid. In the balance sheet it is deducted from the asset, so the asset is shown at its reduced value. The rate is a percentage of the figure in the trial balance.',
    }),
    sl('example', 'Worked example 2: depreciation at Hemlata Hardware', {
      b: `Total depreciation is **${rs(H2v.mac + H2v.fur)}**; the assets are shown at **${rs(H2.mac - H2v.mac)}** and **${rs(H2.fur - H2v.fur)}**.`,
      v: vEx2,
      n: `Hemlata Hardware, an imagined firm, has machinery of ${rupees(H2.mac)}, depreciated at ${pcw(H2.macR)}, which is ${rupees(H2v.mac)}. Its furniture of ${rupees(H2.fur)} is depreciated at ${pcw(H2.furR)}, which is ${rupees(H2v.fur)}. The profit and loss account is debited with ${rupees(H2v.mac + H2v.fur)}. The machinery is shown at ${rupees(H2.mac - H2v.mac)} and the furniture at ${rupees(H2.fur - H2v.fur)}.`,
    }),
    sl('check', 'Quick check: depreciation', {
      b: 'Find the value of machinery in the Balance Sheet of an imagined firm.',
      chk: 'n_dep_chk',
      n: 'Work out the depreciation as a percentage of the figure in the trial balance. Then remember that the balance sheet shows the asset after depreciation has been taken off.',
    }),
    sl('concept', 'Goods withdrawn by the proprietor', {
      b: 'Goods taken for personal use come **off purchases** and go **into drawings**.',
      v: vGoods,
      n: 'When the proprietor takes goods for personal use, the goods were not bought for sale. Their cost is deducted from purchases in the trading account, so the gross profit rises. The same amount is added to drawings, which reduces capital. The entry debits drawings and credits purchases.',
    }),
    sl('concept', 'Abnormal loss of goods by fire', {
      b: 'Credit the Trading Account with the **whole loss**; charge only the **uninsured** part to profit.',
      v: vLossRules,
      n: 'When goods are destroyed by fire, the trading account is credited with their full cost, because they are not part of the cost of goods sold. The claim that the insurer admits is a current asset. Only the uninsured part, which is the loss less the claim, is debited to the profit and loss account as an abnormal loss.',
    }),
    sl('example', 'Worked example 3: a fire at Ishwar Interiors', {
      b: `Loss **${rs(I3.loss)}**, claim **${rs(I3.claim)}**; the uninsured loss is **${rs(I3.unins)}**.`,
      v: vEx3,
      n: `Ishwar Interiors, an imagined firm, lost goods costing ${rupees(I3.loss)} in a fire. The insurance company admitted a claim of ${rupees(I3.claim)}. The trading account is credited with ${rupees(I3.loss)}. The claim of ${rupees(I3.claim)} is a current asset. The uninsured loss of ${rupees(I3.unins)} is debited to the profit and loss account.`,
    }),
    sl('check', 'Quick check: loss by fire', {
      b: 'Find the amount debited to the Profit and Loss Account for a loss of an imagined mill.',
      chk: 'n_loss_chk',
      n: 'Remember that the claim the insurer admits is an asset, not a loss. Only the part of the loss that will not be recovered is charged to the profit and loss account.',
    }),
    sl('example', 'Worked example 4: adjusting entries of Nisha Crafts', {
      b: 'Each adjustment is first recorded by a **journal entry**, which then carries both of its effects.',
      v: vEx4,
      n: `Nisha Crafts, an imagined firm, records its adjustments by journal entries. Closing stock of ${rupees(NC.closing)} is debited to the closing stock account and credited to the trading account. Outstanding wages of ${rupees(NC.amounts.out)} are debited to wages. Prepaid insurance of ${rupees(NC.amounts.pre)} is debited to the prepaid account. Accrued commission of ${rupees(NC.amounts.acc)} is debited to the accrued account.`,
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['Adjustments follow the matching concept and the accrual basis.', 'Each has two effects; closing stock inside the trial balance has one.', 'Depreciation, goods withdrawn and fire loss follow fixed rules.'],
      v: vSum1,
      n: 'To sum up. Adjustments make the accounts follow the matching concept and the accrual basis. Each adjustment has two effects. Closing stock is credited in the trading account and shown as an asset, unless it is already in the trial balance. Outstanding and prepaid items change expenses and incomes. Depreciation is debited and deducted from the asset. Goods withdrawn and fire loss follow their own rules.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Show every adjustment in two places.', 'Check whether closing stock is inside or outside the trial balance.', 'Credit the whole fire loss to the Trading Account.'],
      v: vTips1,
      n: 'In the examination, show every adjustment in both of its places, because one missing effect makes the balance sheet disagree. Check whether closing stock is inside or outside the trial balance. Add outstanding items and deduct prepaid items. Deduct depreciation from the asset. Credit the trading account with the whole loss by fire.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Financial Statements II — Part 2: Provisions, Interest, Commission and the Adjusted Final Accounts',
  goals: [
    'Work out the charge for bad debts and provisions and show the debtors in the Balance Sheet',
    'Treat interest on capital and drawings and the manager\'s commission on both bases',
    'Prepare the Trading and Profit and Loss Account and the Balance Sheet with eight adjustments',
  ],
  slides: [
    sl('title', 'Provisions, interest and commission', {
      b: 'Part 2: **bad debts and provisions**, **interest**, **manager\'s commission**, and a full set of adjusted final accounts.',
      v: vFlowAdj,
      n: 'In this part we complete the adjustments. We work out the charge for bad debts and provisions, treat interest on capital and on drawings, and calculate a manager\'s commission on two bases. Then we apply eight adjustments to the trial balance of an imagined firm and prepare the adjusted trading account, profit and loss account and balance sheet.',
    }),
    sl('concept', 'Bad debts and further bad debts', {
      v: vBad,
      n: 'Bad debts that were written off during the year are already in the trial balance. Further bad debts are found at the year end and given as an adjustment. Both are debited to the profit and loss account. Further bad debts are also deducted from the debtors in the balance sheet. A provision for doubtful debts covers the debtors who may still not pay.',
    }),
    sl('concept', 'The provision for doubtful debts', {
      b: 'The provision is a percentage of the debtors **left after** the further bad debts.',
      v: vProv,
      n: `Start with the debtors and deduct the further bad debts. The new provision is a percentage of the debtors that remain. The charge to the profit and loss account is bad debts, plus further bad debts, plus the new provision, less the old provision. In the balance sheet, debtors are shown less further bad debts and less the new provision. In this chart the charge is ${rupees(P3.charge)}.`,
    }),
    sl('example', 'Worked example 1: a new provision at Pawan Pumps', {
      b: `Debtors **${rs(P1.debtors)}**, bad debts **${rs(P1.bdTB)}**, further bad debts **${rs(P1.further)}**, provision **${P1.pddPct} per cent**, no old provision.`,
      bl: [`The charge to the Profit and Loss Account is ${rs(P1.charge)}.`, `Debtors in the Balance Sheet: ${rs(P1.net)}.`],
      v: vEx5c,
      n: `Pawan Pumps, an imagined firm, has debtors of ${rupees(P1.debtors)} and bad debts of ${rupees(P1.bdTB)}. Further bad debts are ${rupees(P1.further)}, which leaves ${rupees(P1.after)}. The provision at ${pcw(P1.pddPct)} is ${rupees(P1.newPdd)}. With no old provision, the charge is ${rupees(P1.charge)}. Debtors are shown in the balance sheet at ${rupees(P1.net)}.`,
    }),
    sl('check', 'Quick check: bad debts and the provision', {
      b: 'Find the charge to the Profit and Loss Account for an imagined firm.',
      chk: 'n_prov_chk',
      n: 'First deduct the further bad debts from the debtors. Work out the provision on what remains. Then add the bad debts, the further bad debts and the new provision, and remember to set the old provision against them if there is one.',
    }),
    sl('example', 'Worked example 2: keeping an old provision at Hrithik Hardware', {
      b: `Old provision **${rs(P5.oldPdd)}**, new provision **${rs(P5.newPdd)}**; the charge is **${rs(P5.charge)}**.`,
      v: vEx5a,
      n: `Hrithik Hardware, an imagined firm, has debtors of ${rupees(P5.debtors)}, bad debts of ${rupees(P5.bdTB)}, further bad debts of ${rupees(P5.further)} and an old provision of ${rupees(P5.oldPdd)}. The new provision at ${pcw(P5.pddPct)} of ${rupees(P5.after)} is ${rupees(P5.newPdd)}. The charge is ${rupees(P5.charge)}. Debtors in the balance sheet are ${rupees(P5.net)} before any discount provision.`,
    }),
    sl('example', 'The provision account of Hrithik Hardware', {
      b: 'The account shows bad debts and the new balance on the **debit** side; the old balance and the charge on the **credit** side.',
      v: vEx5b,
      n: `The provision account has bad debts of ${rupees(P5.bdTotal)} and the new provision of ${rupees(P5.newPdd)}, carried down, on the debit side. On the credit side are the old provision of ${rupees(P5.oldPdd)} and the transfer from the profit and loss account of ${rupees(P5.charge)}. Each side totals ${rupees(P5.pddLedger.total)}.`,
    }),
    sl('concept', 'Provision for discount on debtors', {
      b: 'The discount provision is worked out on the debtors **after** the provision for doubtful debts.',
      v: vDisc,
      n: 'A firm that expects to allow discount to debtors who pay promptly may keep a provision for discount. It is worked out on the debtors after the further bad debts and after the provision for doubtful debts, because discount is allowed only to debtors who are expected to pay. It is debited to the profit and loss account and deducted from debtors.',
    }),
    sl('example', 'Worked example 3: both provisions at Hrithik Hardware', {
      b: `Discount provision **${rs(P5.disc)}**; debtors in the Balance Sheet **${rs(P5.net)}**.`,
      v: vEx6,
      n: `Hrithik Hardware has debtors of ${rupees(P5.debtors)}. After further bad debts of ${rupees(P5.further)} and the provision for doubtful debts of ${rupees(P5.newPdd)}, the debtors are ${rupees(P5.afterPdd)}. A discount provision at ${pcw(P5.discPct)} of this is ${rupees(P5.disc)}. The balance sheet shows debtors at ${rupees(P5.net)}.`,
    }),
    sl('check', 'Quick check: provision for discount', {
      b: 'Find the provision for discount on debtors of an imagined firm.',
      chk: 'n_disc_chk',
      n: 'The base for the discount provision is the debtors after two deductions. Deduct the further bad debts, then the provision for doubtful debts, and only then apply the discount rate.',
    }),
    sl('concept', 'Interest on capital and interest on drawings', {
      v: vInt,
      n: 'Interest on capital is treated as an expense of the business and a gain of the proprietor. It is debited to the profit and loss account and added to capital. Interest on drawings is a gain of the business and a charge on the proprietor. It is credited to the profit and loss account and deducted from capital.',
    }),
    sl('concept', 'The manager\'s commission on two bases', {
      b: 'Before charging: rate over 100. After charging: rate over **100 plus rate**.',
      v: vComm,
      n: `A manager may be paid a percentage of the net profit before charging the commission, or after charging it. Before charging, the commission is the rate over one hundred of the profit. After charging, it is the rate over one hundred plus the rate, because the commission is itself part of the profit. On the same profit of ${rupees(CM.np)}, the two bases give ${rupees(CM.before)} and ${rupees(CM.after)}.`,
    }),
    sl('example', 'Worked example 4: commission at Rudra Rubber', {
      b: `The commission is **${rs(CM.before)}** on the first basis and **${rs(CM.after)}** on the second.`,
      v: vEx7,
      n: `Rudra Rubber, an imagined firm, has a net profit of ${rupees(CM.np)} before the manager's commission, at ${pcw(CM.p)}. On the profit before charging it, the commission is ${rupees(CM.before)}, leaving ${rupees(CM.np - CM.before)}. On the profit after charging it, the commission is ${rupees(CM.after)}, leaving ${rupees(CM.np - CM.after)}. The commission due is a current liability.`,
    }),
    sl('check', 'Quick check: commission after charging', {
      b: 'Find the manager\'s commission of an imagined firm.',
      chk: 'n_comm_chk',
      n: 'The commission is a percentage of the profit left after the commission itself is charged. Use the rate over one hundred plus the rate, applied to the profit before commission.',
    }),
    sl('concept', 'Effect of each adjustment', {
      b: 'Taken alone, each adjustment changes the **gross profit**, the **net profit** and the **Balance Sheet** in its own way.',
      v: vImpact,
      n: 'This table shows the effect of each adjustment of Nisha Crafts, taken alone. Goods withdrawn raise both profits. Outstanding wages are a direct expense, so they lower the gross profit and the net profit. Depreciation and the provision lower the net profit and the balance sheet total. Interest on capital lowers the profit but not the total.',
    }),
    sl('example', 'Worked example 5: the trial balance and adjustments of Nisha Crafts', {
      b: 'A trial balance of **nineteen** accounts and **eight** adjustments for the year ended 31 March 2026.',
      v: vNCtb,
      n: `This is the trial balance of Nisha Crafts, an imagined firm, on the last day of March two thousand twenty six. It has nineteen accounts, and each column totals ${rupees(NC.tb.dr)}. The eight adjustments are closing stock, outstanding wages, prepaid insurance, accrued commission, depreciation, provision for doubtful debts, interest on capital and goods taken by the proprietor.`,
    }),
    sl('example', 'The adjustments of Nisha Crafts', {
      b: 'Each adjustment is entered **once**, and each is shown in two places.',
      v: vNCadj,
      n: `The adjustments are closing stock of ${rupees(NC.closing)}, wages outstanding of ${rupees(NC.amounts.out)}, insurance prepaid of ${rupees(NC.amounts.pre)}, commission accrued of ${rupees(NC.amounts.acc)}, depreciation on machinery of ${rupees(NC.amounts.dep)}, a new provision of ${rupees(NC.dc.newPdd)}, interest on capital of ${rupees(NC.icAmt)}, and goods withdrawn of ${rupees(NC.amounts.goods)}.`,
    }),
    sl('example', 'The adjusted Trading Account', {
      b: `Closing stock, outstanding wages and goods withdrawn give a gross profit of **${rs(NC.gp)}**.`,
      v: vNCtr,
      n: `In the trading account, purchases are reduced by the returns and by the goods withdrawn. Wages include the outstanding wages. The credit side holds net sales and closing stock. The credit side is larger, so the gross profit is ${rupees(NC.gp)}.`,
    }),
    sl('example', 'The adjusted Profit and Loss Account', {
      b: `After the adjustments the net profit is **${rs(NC.np)}**.`,
      v: vNCpl,
      n: `The profit and loss account starts with the gross profit of ${rupees(NC.gp)} and commission including the accrued part. Insurance is reduced by the prepaid amount. It is also debited with bad debts and the provision, depreciation and interest on capital. The net profit is ${rupees(NC.np)}.`,
    }),
    sl('example', 'The adjusted Balance Sheet', {
      b: `Capital is **${rs(NC.capClosing)}** and each side totals **${rs(NC.total)}**.`,
      v: vNCbs,
      n: `Capital is opening capital plus interest on capital plus net profit, less drawings and the goods withdrawn, which is ${rupees(NC.capClosing)}. Machinery and debtors are shown after depreciation and the provision. Outstanding wages are a current liability, and prepaid insurance and accrued commission are current assets. Each side totals ${rupees(NC.total)}.`,
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Charge = bad debts + further bad debts + new provision − old provision.', 'Interest on capital is added to capital; interest on drawings is deducted.', 'Show both effects of every adjustment and check the totals.'],
      v: vSum2,
      n: 'To sum up. The charge for bad debts and provisions is bad debts, plus further bad debts, plus the new provision, less the old provision. The provision is worked out on debtors after further bad debts, and the discount provision after that. Interest on capital is added to capital and interest on drawings is deducted. The commission depends on the basis. Show both effects of every adjustment.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Provision on debtors after further bad debts; discount after that.', 'Name the basis of the commission.', 'List each adjustment against both places.'],
      v: vTips2,
      n: 'In the examination, work out the provision on debtors after further bad debts, and the discount provision after the doubtful debts provision. Show the working of the charge. Name the basis of the commission before using a formula. List each adjustment against both its places and check that the balance sheet totals agree.',
    }),
  ],
});
void vNCwhere;

// ================================================================ notes
const N = notes({
  title: 'Financial Statements II — Notes',
  sections: [
    {
      h: '1. Why adjustments are made; the two-effects rule',
      t: 1,
      b: 'The trial balance records only what was entered during the year. The **matching concept** requires the expenses of a year to be set against the income of the same year, and the **accrual basis** records an item when it is earned or incurred, not when cash is paid or received. **Adjustments** are the entries made at the end of the year, from the information given outside the trial balance, so that the final accounts show the true profit and the true position.\n\nEvery adjustment has **two effects**: one in the Trading Account or the Profit and Loss Account and one in the Balance Sheet. Because both effects are recorded, the Balance Sheet agrees. The one case with a single place is closing stock that is already in the trial balance.',
      terms: [
        ['Matching concept', 'The principle that the expenses of a period are set against the income of the same period.'],
        ['Accrual basis', 'The method of recording income and expenses when they are earned or incurred, whether or not cash has moved.'],
        ['Adjustment', 'An entry made at the end of the year for an item that the trial balance leaves out, so that the accounts show the income and expenses of the year.'],
      ],
      v: vTwo,
      vs: [vWhy, vFlowAdj],
    },
    {
      h: '2. Closing stock; outstanding and prepaid expenses; accrued and advance income',
      t: 1,
      b: '**Closing stock** given outside the trial balance is credited in the Trading Account and shown as a current asset. If it is already in the trial balance, the Trading Account has been prepared and it is shown only in the Balance Sheet.\n\nAn **outstanding expense** is added to the expense and shown as a current liability; a **prepaid expense** is deducted from the expense and shown as a current asset. **Accrued income** is added to the income and shown as a current asset; **income received in advance** is deducted from the income and shown as a current liability. A direct expense such as wages is adjusted in the Trading Account; an indirect expense such as rent in the Profit and Loss Account.',
      terms: [
        ['Outstanding expense', 'An expense that has been incurred in the year but not yet paid; it is a liability.'],
        ['Prepaid expense', 'An amount paid in the year for a benefit that belongs to a later period; it is an asset.'],
        ['Accrued income', 'Income that has been earned in the year but has not yet been received; it is an asset.'],
        ['Income received in advance', 'Income received in the year for a period that falls after it; it is a liability.'],
      ],
      v: vOutPre,
      vs: [vStock, vAccAdv, vEx1],
    },
    {
      h: '3. Depreciation; goods withdrawn; abnormal loss',
      t: 1,
      b: '**Depreciation** is the fall in the value of a fixed asset through use, passage of time or obsolescence. It is debited to the Profit and Loss Account and deducted from the asset in the Balance Sheet, at the rate given on the figure in the trial balance.\n\n**Goods withdrawn** by the proprietor for personal use are deducted from purchases in the Trading Account and added to drawings. Entry: Drawings A/c Dr. To Purchases A/c.\n\nAn **abnormal loss** of goods, such as destruction by fire, is credited to the Trading Account at the full cost of the goods. The insurance claim admitted is a current asset, and only the uninsured part is debited to the Profit and Loss Account.',
      terms: [
        ['Depreciation', 'The reduction in the value of a fixed asset because of use, passage of time or obsolescence, charged as an expense of the year.'],
        ['Goods withdrawn', 'Goods taken from stock by the proprietor for personal use; they are drawings, not sales.'],
        ['Abnormal loss', 'A loss of goods from an unusual event such as fire or theft, not a normal part of the cost of doing business.'],
        ['Insurance claim', 'The amount that the insurance company admits that it will pay for a loss; a current asset until it is received.'],
      ],
      v: vDep,
      vs: [vEx2, vGoods, vLossRules, vEx3],
    },
    {
      h: '4. Bad debts and provisions',
      t: 1,
      b: '**Bad debts** are debts written off during the year (in the trial balance); **further bad debts** are found at the year end (an adjustment). A **provision for doubtful debts** is an amount set aside for debtors who may not pay.\n\nThe **new provision** is a percentage of the debtors after further bad debts. The charge to the Profit and Loss Account is **bad debts + further bad debts + new provision − old provision**. In the Balance Sheet, debtors are shown less further bad debts less the new provision.\n\nA **provision for discount on debtors** is worked out on the debtors after the provision for doubtful debts; it is debited to the Profit and Loss Account (the new provision less the old, if any) and deducted from debtors.',
      terms: [
        ['Bad debts', 'Amounts due from debtors that cannot be recovered and are written off as a loss.'],
        ['Provision for doubtful debts', 'An amount charged against profit for the debtors who may not pay, set aside before the loss occurs.'],
        ['Provision for discount on debtors', 'An amount charged against profit for the discount expected to be allowed to debtors who pay promptly.'],
      ],
      v: vProv,
      vs: [vBad, vEx5c, vEx5a, vEx5b, vDisc, vEx6],
    },
    {
      h: "5. Interest on capital and drawings; manager's commission",
      t: 1,
      b: '**Interest on capital** is debited to the Profit and Loss Account and added to capital; it is a rate per cent on the opening capital. **Interest on drawings** is credited to the Profit and Loss Account and deducted from capital; it is a rate per cent on the drawings or an amount given.\n\n**Manager\'s commission** is debited to the Profit and Loss Account and shown as a current liability. On the net profit **before** charging it, the commission is rate × profit ÷ 100. On the net profit **after** charging it, the commission is rate × profit ÷ (100 + rate), where the profit is the net profit before commission and after all other adjustments.',
      terms: [
        ['Interest on capital', 'Interest allowed to the proprietor on the capital invested, treated as an expense of the business.'],
        ['Interest on drawings', 'Interest charged to the proprietor on the amounts drawn, treated as an income of the business.'],
        ["Manager's commission", 'A share of the net profit paid to the manager as a reward, charged against the profit and shown as a liability until paid.'],
      ],
      v: vComm,
      vs: [vInt, vEx7],
    },
    {
      h: '6. Preparing the adjusted final accounts',
      t: 1,
      b: 'Prepare the statements in the horizontal format of a sole proprietor. **Trading Account:** opening stock, purchases less returns and goods withdrawn, direct expenses with outstanding or prepaid items; net sales, closing stock and any loss of goods credited. **Profit and Loss Account:** gross profit, incomes with accrued or advance items, interest on drawings; indirect expenses with their adjustments, bad debts and provisions, depreciation, interest on capital, uninsured loss and commission.\n\n**Balance Sheet:** capital (opening capital + interest on capital + net profit − drawings − goods withdrawn − interest on drawings), liabilities including outstanding items and commission due; assets with depreciation, further bad debts and provisions deducted, and with prepaid and accrued items and the insurance claim added. Check that both totals agree. Each adjustment is used once, and each is shown in two places.',
      terms: [
        ['Adjusted final accounts', 'The Trading Account, the Profit and Loss Account and the Balance Sheet prepared after applying all the adjustments to the trial balance.'],
        ['Current liability', 'An amount owed that is due for payment within a year, such as creditors and outstanding expenses.'],
        ['Current asset', 'An asset that is expected to be turned into cash within a year, such as stock, debtors, prepaid expenses and accrued income.'],
      ],
      v: vNCbs,
      vs: [vNCtb, vNCadj, vNCtr, vNCpl, vImpact, vNCwhere],
    },
  ],
  tips: '- Decide first whether closing stock is inside or outside the trial balance.\n- Show each adjustment in both of its places; a missing effect makes the Balance Sheet disagree.\n- Outstanding and accrued items are added; prepaid and advance items are deducted. Direct expenses are adjusted in the Trading Account.\n- Provision for doubtful debts: on debtors after further bad debts. Discount provision: on debtors after that provision. Show the charge as bad debts + further bad debts + new provision − old provision.\n- Name the basis of the manager\'s commission before using the formula.\n- Show the capital line with every term: opening capital, interest on capital, net profit, drawings, goods withdrawn, interest on drawings.\n- Write the heading with the firm, the statement and the date.',
});

// ================================================================ flashcards
const FC = cards([
  ['**Matching concept**', 'The expenses of a period are set against the income of the same period.', 'definition', 1],
  ['**Accrual basis**', 'Income and expenses are recorded when earned or incurred, not when cash moves.', 'definition', 1],
  ['**Adjustment**', 'An entry at the end of the year for an item the trial balance leaves out; each has two effects.', 'definition', 1],
  ['Closing stock given outside the trial balance', 'Credit side of the Trading Account, and a current asset.', 'concept', 1],
  ['Closing stock already in the trial balance', 'Shown only as a current asset in the Balance Sheet.', 'concept', 1],
  ['**Outstanding expense**', 'Incurred but not yet paid: added to the expense; current liability.', 'definition', 1],
  ['**Prepaid expense**', 'Paid for a later period: deducted from the expense; current asset.', 'definition', 1],
  ['**Accrued income**', 'Earned but not yet received: added to the income; current asset.', 'definition', 1],
  ['**Income received in advance**', 'Received for a later period: deducted from the income; current liability.', 'definition', 1],
  ['Where is an outstanding direct expense such as wages adjusted?', 'In the Trading Account, added to the wages.', 'concept', 1],
  ['**Depreciation**', 'The fall in the value of a fixed asset; debited to the Profit and Loss Account and deducted from the asset.', 'definition', 1],
  ['Does depreciation involve a cash payment?', 'No. It is an expense of the year with no cash outflow.', 'fact', 1],
  ['**Goods withdrawn**', 'Deducted from purchases in the Trading Account and added to drawings.', 'definition', 1],
  ['Entry for goods withdrawn', 'Drawings A/c Dr. To Purchases A/c.', 'concept', 1],
  ['**Abnormal loss**', 'Loss of goods by an unusual event such as fire; credited to the Trading Account at cost.', 'definition', 1],
  ['Treatment of an insurance claim admitted', 'A current asset; only the uninsured part of the loss goes to the Profit and Loss Account.', 'concept', 1],
  ['**Bad debts**', 'Debts written off during the year as irrecoverable; debited to the Profit and Loss Account.', 'definition', 1],
  ['**Further bad debts**', 'Found at the year end; debited to the Profit and Loss Account and deducted from debtors.', 'definition', 1],
  ['**Provision for doubtful debts**', 'An amount set aside out of profit for debtors who may not pay.', 'definition', 1],
  ['Base of the new provision', 'Debtors after deducting further bad debts.', 'formula', 1],
  ['Charge for bad debts and the provision', 'Bad debts + further bad debts + new provision − old provision.', 'formula', 1],
  ['Debtors in the Balance Sheet', 'Debtors − further bad debts − new provision (− provision for discount).', 'formula', 1],
  ['**Provision for discount on debtors**', 'For the discount expected on prompt payment; worked out on debtors after the provision for doubtful debts.', 'definition', 1],
  ['**Interest on capital**', 'Debit to the Profit and Loss Account; added to capital.', 'definition', 1],
  ['**Interest on drawings**', 'Credit to the Profit and Loss Account; deducted from capital.', 'definition', 1],
  ["**Manager's commission**", 'Debit to the Profit and Loss Account; current liability in the Balance Sheet.', 'definition', 1],
  ["Commission on net profit before charging it", 'Net profit before commission × rate ÷ 100.', 'formula', 1],
  ["Commission on net profit after charging it", 'Net profit before commission × rate ÷ (100 + rate).', 'formula', 1],
  ['Which adjustments change the gross profit?', 'Those that reach the Trading Account: closing stock, outstanding or prepaid direct expenses, goods withdrawn, loss of goods.', 'fact', 1],
  ['Closing capital with adjustments', 'Opening capital + interest on capital + net profit − drawings − goods withdrawn − interest on drawings.', 'formula', 1],
  ['Why does the Balance Sheet agree after adjustments?', 'Because each adjustment is recorded in two places.', 'fact', 1],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Financial Statements II',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_out_exp', 'm_dep_effect', 'm_loss', 'ar_closing'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_closing', 's2_out_pre', 's3_exp'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_nc', 'l5_theory'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_accrual'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Financial Statements II',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_why_adj', 'm_prepaid', 'm_accrued', 'm_advance', 'm_bd_further', 'm_prov_base', 'm_intdraw', 'm_goods', 'ar_wages', 'ar_dep'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_dep', 's2_provision', { attempt: 1, keys: ['s2_acc_adv', 's2_loss'] }, 's3_debts', { attempt: 1, keys: ['s3_comm', 's3_entries'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_qc', { attempt: 1, keys: ['l5_prov', 'l5_effect'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_debts', 'cb_comm'] },
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
const checksUsed = new Set(['m_stock_chk', 'n_out_chk', 'n_dep_chk', 'n_loss_chk', 'n_prov_chk', 'n_disc_chk', 'n_comm_chk']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
// 4. Every firm's statements balance, every trial balance item is used once and every adjustment is in its two places (asserted in adjFinals()).
for (const f of [F.NC, F.QC0, F.QCb, F.QCa, F.RK, F.SS]) same(f.bs.total, f.bsG.total, `${f.firm}: flat and grouped Balance Sheet agree`);
same(F.QCb.commission + F.QCb.np, F.QCb.npPre, 'Qadir Cycles: profit before commission');
// 5. Profit stated in prose equals the computed profit (the figures written in this build come from the objects; headline pins).
same(NC.gp, 166000, 'Nisha Crafts gross profit in the deck');
same(NC.np, 58050, 'Nisha Crafts net profit in the deck');
same(NC.capClosing, 406200, 'Nisha Crafts capital in the deck');
same(NC.total, 480200, 'Nisha Crafts Balance Sheet total in the deck');
void sum; void mdTable; void QC0; void QCb; void QCa;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-accountancy-ch09 (adjustments in the preparation of financial statements: closing stock, outstanding and prepaid expenses, accrued income and income received in advance, depreciation, bad debts, further bad debts and provisions, interest on capital and drawings, manager commission, goods withdrawn and abnormal loss, for a sole proprietor)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed with the shared acc.mjs and the chapter helper adjFinals() in adj.mjs and asserted: each imagined firm has one trial balance that agrees (trialBalance), every item of it is used exactly once, every adjustment is recorded in its two places (closing stock inside the trial balance once), the Trading Account, the Profit and Loss Account and the Balance Sheet agree, the provision accounts are computed with ledger() and close at the new provision, and the commission on each basis is checked against its definition; tables in decks and model answers are generated from the computed objects',
    facts: 'matching concept and accrual basis, the treatment of closing stock, outstanding and prepaid expenses, accrued income and income received in advance, depreciation, bad debts, further bad debts, provision for doubtful debts and provision for discount on debtors, interest on capital and drawings, manager commission before and after charging it, goods withdrawn and abnormal loss with an insurance claim, in the horizontal statements of a sole proprietor',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
