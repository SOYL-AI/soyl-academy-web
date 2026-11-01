// Build ISC 12 Economics ch17 Government Budget and Deficits. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch17/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch17', 'economics-commerce');
const {
  inr, pct, deficits, HEM, HEM_D, NEEL, NEEL_D, KANAK, KANAK_PD, REVA, REVA_INT, SHAIL, SHAIL_RD, SARAS, SARAS_SHARE, SARAS_PD,
  TYPES, typeOf, TYPE_GAP, HEM2, HEM2_PD,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- computed data for the figures
const HEM_REV_OTHER = HEM.revExp - HEM.interest;
assert(HEM_REV_OTHER === 2800, 'hemavati revenue spending other than interest');
assert(deficits(HEM).fd === HEM_D.fd, 'hemavati recomputed');
const RECEIPTS = [['Tax revenue', HEM.tax, 'fill'], ['Non-tax revenue', HEM.nonTax, 'blue'], ['Non-debt capital receipts', HEM_D.ndcr, 'green'], ['Borrowing', HEM_D.borrow, 'red']];
const SPENDING = [['Other revenue spending', HEM_REV_OTHER, 'muted'], ['Interest', HEM.interest, 'yellow'], ['Capital expenditure', HEM.capExp, 'accent']];
assert(RECEIPTS.reduce((s, r) => s + r[1], 0) === HEM_D.te && SPENDING.reduce((s, r) => s + r[1], 0) === HEM_D.te, 'stacks balance');
const NEEL_FOR_REV = 0;
const NEEL_FOR_CAP = NEEL_D.fd;
const SARAS_FOR_REV = SARAS.rd;
const SARAS_FOR_CAP = SARAS.fd - SARAS.rd;
assert(NEEL_D.rd < 0 && NEEL_FOR_CAP === 400 && SARAS_FOR_CAP === 450, 'use of borrowing');

// ---------------------------------------------------------------- SVG figures
// (1) Hemavati: receipts and expenditure as two stacked bars of equal height (₹ crore).
const vStack = (() => {
  const s = new Svg(600, 440);
  const c = s.chart({ x1: 3, y1: 5200, left: 80, top: 40, width: 300, height: 320, xLabel: '', yLabel: '₹ crore' });
  const stack = (x, parts) => {
    let base = 0;
    for (const [name, v, col] of parts) {
      const x0 = c.X(x - 0.35), x1 = c.X(x + 0.35);
      s.rect(x0, c.Y(base + v), x1 - x0, c.Y(base) - c.Y(base + v), { fill: col, fillOpacity: col === 'fill' ? undefined : 0.5, color: col === 'fill' ? 'accent' : col, sw: 1.3, rx: 1 });
      s.text((x0 + x1) / 2, c.Y(base + v / 2), String(inr(v)), { size: 11 });
      base += v;
    }
    return base;
  };
  stack(1, RECEIPTS);
  stack(2, SPENDING);
  c.xTick(1, 'Receipts');
  c.xTick(2, 'Expenditure');
  c.yTick(2400, '2,400');
  c.yTick(4800, '4,800');
  RECEIPTS.concat(SPENDING).forEach(([name, , col], i) => {
    s.rect(400, 50 + i * 22, 14, 11, { fill: col, fillOpacity: col === 'fill' ? undefined : 0.5, color: col === 'fill' ? 'accent' : col, sw: 1, rx: 1 });
    s.text(420, 56 + i * 22, name, { anchor: 'start', size: 11 });
  });
  return s.visual(
    `Two stacked bars for the imagined Republic of Hemavati, each totalling ${inr(HEM_D.te)} crore rupees. Receipts: tax revenue ${inr(HEM.tax)}, non-tax revenue ${HEM.nonTax}, non-debt capital receipts ${HEM_D.ndcr} and borrowing ${inr(HEM_D.borrow)}. Expenditure: revenue spending other than interest ${inr(HEM_REV_OTHER)}, interest ${HEM.interest} and capital expenditure ${inr(HEM.capExp)}`,
    'Imagined figures (₹ crore). Borrowing fills the gap, so both bars are equal.',
  );
})();

// (2) Hemavati: the three deficits as bars.
const vDeficits = (() => {
  const s = new Svg(560, 400);
  const c = s.chart({ x1: 4, y1: 1700, left: 80, top: 40, width: 400, height: 280, xLabel: '', yLabel: '₹ crore' });
  const bars = [['Revenue deficit', HEM_D.rd, 'blue'], ['Fiscal deficit', HEM_D.fd, 'red'], ['Primary deficit', HEM_D.pd, 'green']];
  bars.forEach(([name, v, col], i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.3), x1 = c.X(x + 0.3);
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: col, fillOpacity: 0.5, color: col, sw: 1.4, rx: 2 });
    c.label([x, v], inr(v), { dy: -10, size: 12 });
    c.xTick(x, name);
  });
  c.yTick(500, '500').yTick(1000, '1,000');
  return s.visual(
    `Bar chart of the imagined Republic of Hemavati's deficits in crore rupees: revenue deficit ${HEM_D.rd}, fiscal deficit ${inr(HEM_D.fd)} and primary deficit ${HEM_D.pd}; the fiscal deficit minus interest of ${HEM.interest} gives the primary deficit`,
    `Imagined figures: fiscal deficit ${inr(HEM_D.fd)} − interest ${HEM.interest} = primary deficit ${HEM_D.pd}.`,
  );
})();

// (3) What the borrowing pays for: Neelachal versus Saraswatipur (stacked bars).
const vQuality = (() => {
  const s = new Svg(600, 420);
  const c = s.chart({ x1: 3, y1: 1050, left: 80, top: 40, width: 300, height: 300, xLabel: '', yLabel: 'Borrowing (₹ crore)' });
  const stack = (x, parts) => {
    let base = 0;
    for (const [v, col] of parts) {
      if (v <= 0) continue;
      const x0 = c.X(x - 0.35), x1 = c.X(x + 0.35);
      s.rect(x0, c.Y(base + v), x1 - x0, c.Y(base) - c.Y(base + v), { fill: col, fillOpacity: 0.5, color: col, sw: 1.3, rx: 1 });
      s.text((x0 + x1) / 2, c.Y(base + v / 2), String(v), { size: 11 });
      base += v;
    }
  };
  stack(1, [[NEEL_FOR_CAP, 'green'], [NEEL_FOR_REV, 'red']]);
  stack(2, [[SARAS_FOR_CAP, 'green'], [SARAS_FOR_REV, 'red']]);
  c.xTick(1, 'Neelachal');
  c.xTick(2, 'Saraswatipur');
  c.yTick(500, '500');
  s.rect(400, 60, 14, 11, { fill: 'green', fillOpacity: 0.5, color: 'green', sw: 1, rx: 1 });
  s.text(420, 66, 'Not needed for the revenue gap', { anchor: 'start', size: 11 });
  s.rect(400, 84, 14, 11, { fill: 'red', fillOpacity: 0.5, color: 'red', sw: 1, rx: 1 });
  s.text(420, 90, 'Covers the revenue deficit', { anchor: 'start', size: 11 });
  return s.visual(
    `Stacked bars of how two imagined states use their borrowing: Neelachal borrows ${NEEL_D.fd} crore rupees and needs none of it for current spending because it has a revenue surplus; Saraswatipur borrows ${SARAS.fd} crore, of which ${SARAS.rd} crore covers its revenue deficit and ${SARAS_FOR_CAP} crore is left for other uses`,
    `Imagined figures: Saraswatipur uses ${SARAS_SHARE} per cent of its borrowing for the revenue gap.`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vBudgetMeaning = table(
  ['Feature', 'What it means'],
  [['Annual', 'Covers one financial year, 1 April to 31 March'], ['Estimates', 'Figures are forecasts made before the year begins'], ['Approved by the legislature', 'No tax collected or money spent without approval'], ['Shows the gap', 'States how any shortfall will be financed']],
  'Table of features of a government budget: it is annual, it shows estimates, it needs the approval of the legislature, and it shows how any gap will be financed',
);
const vUnionState = table(
  ['', 'Union budget', 'State budget'],
  [['Prepared by', 'Union government', 'Each State government'], ['Presented in', 'Parliament', 'State legislature'], ['Constitution calls it', 'Annual financial statement (Article 112)', 'Annual financial statement (Article 202)'], ['Covers', 'Union subjects such as defence and railways', 'State subjects such as police and State roads']],
  'Table comparing the Union budget and a State budget: who prepares it, where it is presented, its constitutional name and the subjects it covers',
);
const vStructure = flow('TB', ['Government budget', 'Revenue budget', 'Capital budget', 'Revenue receipts and revenue expenditure', 'Capital receipts and capital expenditure'], 'Flow of the structure of a budget: the budget splits into a revenue budget, holding revenue receipts and revenue expenditure, and a capital budget, holding capital receipts and capital expenditure', 'Two parts, four heads', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n5' },
]);
const vRevReceipts = table(
  ['Kind', 'Examples', 'Why revenue'],
  [['Tax revenue', 'Income tax, corporation tax, GST, customs duty', 'Compulsory; never repaid'], ['Non-tax revenue', 'Fees, fines, interest received, dividends, grants received', 'No liability created, no asset reduced']],
  'Table of revenue receipts: tax revenue such as income tax and customs duty, and non-tax revenue such as fees, fines, interest and dividends, neither of which creates a liability or reduces an asset',
);
const vCapReceipts = table(
  ['Capital receipt', 'Test it passes'],
  [['Borrowing from the public, banks or abroad', 'Creates a liability'], ['Recovery of loans given earlier', 'Reduces an asset'], ['Disinvestment (sale of shares in public companies)', 'Reduces an asset']],
  'Table of capital receipts: borrowing creates a liability, while recovery of loans and disinvestment reduce assets',
);
const vClassReceipts = table(
  ['Receipt of Hemkunt (imagined)', 'Head', 'Reason'],
  [['Stamp duty on property sales', 'Revenue (tax)', 'Compulsory; no liability'], ['Fines from traffic police', 'Revenue (non-tax)', 'No liability, no asset reduced'], ['Bonds sold to the public', 'Capital', 'Liability to repay'], ['Loan repaid by a city council', 'Capital', 'Asset reduced'], ['Dividend from a state dairy company', 'Revenue (non-tax)', 'No liability, no asset reduced'], ['Sale of shares in a state hotel company', 'Capital', 'Asset reduced']],
  'Table classifying six imagined receipts of Hemkunt: stamp duty, fines and a dividend are revenue receipts; bonds sold, a loan repaid by a city council and a share sale are capital receipts, with the reason for each',
  'Ask two questions: does it create a liability? does it reduce an asset?',
);
const vRevExp = table(
  ['Revenue expenditure', 'Why'],
  [['Salaries and pensions', 'No asset created'], ['Interest on public debt', 'No asset created, no liability reduced'], ['Subsidies', 'No asset created'], ['Grants given to other governments', 'No asset for the giver']],
  'Table of revenue expenditure: salaries, pensions, interest, subsidies and grants given, none of which creates an asset or reduces a liability',
);
const vCapExp = table(
  ['Capital expenditure', 'Why'],
  [['Building roads, dams, hospitals', 'Creates a physical asset'], ['Buying shares or giving loans', 'Creates a financial asset'], ['Repaying borrowed money', 'Reduces a liability']],
  'Table of capital expenditure: building roads, dams and hospitals or buying shares and giving loans creates assets, and repaying loans reduces a liability',
);
const vClassSpend = table(
  ['Spending of Hemavati (imagined)', 'Head', 'Reason'],
  [['Wages of forest guards', 'Revenue expenditure', 'No asset'], ['A new metro line', 'Capital expenditure', 'Asset created'], ['Loan to a farmers\' cooperative bank', 'Capital expenditure', 'Financial asset'], ['Food subsidy', 'Revenue expenditure', 'No asset'], ['Repayment of old bonds', 'Capital expenditure', 'Liability reduced'], ['Interest on old bonds', 'Revenue expenditure', 'No asset, no liability reduced']],
  'Table classifying six imagined items of Hemavati spending: wages, a food subsidy and interest are revenue expenditure; a metro line, a loan to a cooperative bank and repaying bonds are capital expenditure, with reasons',
  'Ask: does it create an asset? does it reduce a liability?',
);
const vTypes = table(
  ['Imagined government', 'Receipts other than borrowing (₹ crore)', 'Expenditure (₹ crore)', 'Budget'],
  TYPES.map((g) => [g.name, inr(g.rec), inr(g.exp), typeOf(g)]),
  `Table of three imagined budgets: ${TYPES.map((g) => `${g.name} ${inr(g.rec)} against ${inr(g.exp)}, a ${typeOf(g)} budget`).join('; ')}`,
);
const vFormulas = table(
  ['Deficit', 'Formula', 'What it shows'],
  [['Revenue deficit', 'Revenue expenditure − revenue receipts', 'Borrowing for current spending'], ['Fiscal deficit', 'Total expenditure − (revenue receipts + non-debt capital receipts)', 'Total borrowing requirement'], ['Primary deficit', 'Fiscal deficit − interest payments', 'Borrowing for present programmes']],
  'Table of the three deficits: the revenue deficit is revenue expenditure minus revenue receipts, the fiscal deficit is total expenditure minus revenue and non-debt capital receipts, and the primary deficit is the fiscal deficit minus interest',
);
const vFdFlow = flow('LR', ['Total expenditure', 'Less revenue receipts', 'Less non-debt capital receipts', 'Gap left = fiscal deficit', 'Filled by borrowing'], 'Flow of the fiscal deficit: from total expenditure take away revenue receipts and non-debt capital receipts; the gap left is the fiscal deficit, which is filled by borrowing', 'Fiscal deficit = borrowing');
const vHemTable = table(
  ['Step', '₹ crore'],
  [['Revenue receipts', `${inr(HEM.tax)} + ${HEM.nonTax} = ${inr(HEM_D.rr)}`], ['Revenue deficit', `${inr(HEM.revExp)} − ${inr(HEM_D.rr)} = ${HEM_D.rd}`], ['Total expenditure', `${inr(HEM.revExp)} + ${inr(HEM.capExp)} = ${inr(HEM_D.te)}`], ['Non-debt receipts', `${inr(HEM_D.rr)} + ${HEM.recov} + ${HEM.disinv} = ${inr(HEM_D.rr + HEM_D.ndcr)}`], ['Fiscal deficit', `${inr(HEM_D.te)} − ${inr(HEM_D.rr + HEM_D.ndcr)} = ${inr(HEM_D.fd)}`], ['Primary deficit', `${inr(HEM_D.fd)} − ${HEM.interest} = ${HEM_D.pd}`]],
  `Table of the worked calculation for the imagined Republic of Hemavati: revenue receipts ${inr(HEM_D.rr)}, revenue deficit ${HEM_D.rd}, total expenditure ${inr(HEM_D.te)}, non-debt receipts ${inr(HEM_D.rr + HEM_D.ndcr)}, fiscal deficit ${inr(HEM_D.fd)} and primary deficit ${HEM_D.pd} crore rupees`,
);
const vRdImp = flow('LR', ['Revenue spending above revenue income', 'Borrow or sell assets for current needs', 'Debt grows, no new assets', 'Interest rises later', 'Deficit deepens'], 'Flow of what a revenue deficit implies: current spending above current income is met by borrowing or selling assets, debt grows without new assets, interest rises later and the deficit deepens', 'Revenue deficit');
const vFdImp = flow('LR', ['Large fiscal deficit every year', 'Debt piles up', 'Interest takes more revenue', 'New loans to pay interest', 'Debt trap; risk of inflation if money is printed'], 'Flow of what a persistent fiscal deficit implies: debt piles up, interest takes more revenue, new loans are needed to pay interest, leading to a debt trap and a risk of inflation if money is printed', 'Fiscal deficit');
const vPdTable = table(
  ['Imagined government', 'Fiscal deficit', 'Interest', 'Primary deficit'],
  [['Hemavati', inr(HEM_D.fd), String(HEM.interest), String(HEM_D.pd)], ['Kanakdesh', String(KANAK.fd), String(KANAK.interest), String(KANAK_PD)], ['Revapur', String(REVA.fd), String(REVA_INT), String(REVA.pd)]],
  `Table of primary deficits of three imagined governments in crore rupees: Hemavati ${inr(HEM_D.fd)} minus ${HEM.interest} is ${HEM_D.pd}; Kanakdesh ${KANAK.fd} minus ${KANAK.interest} is zero; Revapur ${REVA.fd} minus ${REVA_INT} is ${REVA.pd}`,
  'A zero primary deficit means all borrowing pays interest on past debt.',
);
const vNeelTable = table(
  ['Neelachal (imagined), ₹ crore', 'Amount'],
  [['Revenue receipts', inr(NEEL_D.rr)], ['Revenue expenditure', inr(NEEL.revExp)], ['Revenue surplus', String(-NEEL_D.rd)], ['Non-debt capital receipts', String(NEEL_D.ndcr)], ['Capital expenditure', String(NEEL.capExp)], ['Fiscal deficit', String(NEEL_D.fd)], ['Primary deficit', String(NEEL_D.pd)]],
  `Table for the imagined state of Neelachal: revenue receipts ${inr(NEEL_D.rr)} and revenue expenditure ${inr(NEEL.revExp)} give a revenue surplus of ${-NEEL_D.rd}; with non-debt capital receipts of ${NEEL_D.ndcr} and capital expenditure of ${NEEL.capExp}, the fiscal deficit is ${NEEL_D.fd} and the primary deficit ${NEEL_D.pd} crore rupees`,
);
const vSumHeads = table(
  ['Head', 'Test'],
  [['Revenue receipt', 'No liability, no asset reduced'], ['Capital receipt', 'Liability created or asset reduced'], ['Revenue expenditure', 'No asset, no liability reduced'], ['Capital expenditure', 'Asset created or liability reduced']],
  'Summary table of the four budget heads and their tests',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Government Budget and Deficits — Part 1: The Budget and its Components',
  goals: [
    'Explain the meaning of a government budget and distinguish the Union budget from State budgets',
    'Classify budgets as balanced, surplus or deficit',
    'Classify receipts and expenditure as revenue or capital, using the liability and asset tests',
  ],
  slides: [
    sl('title', 'The Budget and its Components', {
      b: 'Part 1 — what a **budget** is, the **Union and State** budgets, and the **four heads** every item falls under.',
      v: flow('LR', ['Meaning of a budget', 'Union and State budgets', 'Balanced, surplus, deficit', 'Revenue and capital receipts', 'Revenue and capital expenditure'], 'Route map of Part 1: meaning of a budget, Union and State budgets, balanced, surplus and deficit budgets, revenue and capital receipts, and revenue and capital expenditure', 'Part 1 at a glance'),
      n: 'Every year governments announce what they expect to collect and what they plan to spend. That plan is the budget. In this part we learn what a budget is, how the Union and State budgets differ, and how every rupee coming in and going out is sorted into revenue or capital. These sorting rules are the key to the deficits in Part 2.',
    }),
    sl('concept', 'What is a government budget?', {
      b: 'A **government budget** is the **annual statement of estimated receipts and expenditure** of a government for the coming **financial year** (1 April to 31 March).',
      v: vBudgetMeaning,
      n: 'A budget is a forecast, made before the year starts, of how much money the government expects to receive and how it plans to spend it. Because it is prepared in advance, its figures are estimates. It must be approved by the legislature, and it also shows how any shortfall will be met.',
    }),
    sl('two-column', 'Union and State budgets', {
      cols: ['**Union budget**\n\n- Prepared by the **Union government**\n- Presented in **Parliament**\n- Covers defence, railways and other Union subjects', '**State budget**\n\n- Prepared by each **State government**\n- Presented in the **State legislature**\n- Covers police, State roads and other State subjects'],
      v: vUnionState,
      n: 'India has a federal structure, so there is not one budget but many. The Union government presents its budget in Parliament, and each State presents its own in its legislature. The Constitution does not use the word budget at all; it calls each of them the annual financial statement.',
    }),
    sl('check', 'Quick check: what the Constitution calls it', {
      b: 'Fill in the blank: the Constitution calls the Union budget the annual ___ statement.',
      chk: 'fb_afs',
      n: 'Recall the name the Constitution uses in place of the word budget.',
    }),
    sl('diagram', 'Balanced, surplus and deficit budgets', {
      b: 'Compare **receipts other than borrowing** with **expenditure**.',
      v: vTypes,
      n: 'Budgets are grouped by comparing what the government expects to receive, leaving out borrowing, with what it plans to spend. If the two are equal, the budget is balanced. If receipts are larger, it is a surplus budget. If spending is larger, it is a deficit budget, and the gap has to be borrowed.',
    }),
    sl('diagram', 'Two parts and four heads', {
      v: vStructure,
      n: 'Every budget has two parts. The revenue budget holds revenue receipts and revenue expenditure. The capital budget holds capital receipts and capital expenditure. So every item you meet belongs to one of four heads, and two simple tests decide which.',
    }),
    sl('concept', 'Revenue receipts', {
      b: '**Revenue receipts** neither **create a liability** nor **reduce an asset** of the government.',
      v: vRevReceipts,
      n: 'Revenue receipts are money the government receives without owing anything back and without giving up anything it owns. They come in two kinds. Tax revenue includes income tax and the goods and services tax. Non-tax revenue includes fees, fines, interest the government receives and dividends from its companies.',
    }),
    sl('check', 'Quick check: a non-tax receipt', {
      b: 'Which of the following is a NON-TAX revenue receipt?',
      chk: 'm_nontax',
      n: 'Remember that a fee is paid for a particular service, while a tax is not.',
    }),
    sl('concept', 'Capital receipts', {
      b: '**Capital receipts** either **create a liability** or **reduce an asset**.',
      v: vCapReceipts,
      n: 'Capital receipts pass at least one of two tests. Borrowing brings in money but creates a liability, because it must be repaid. Recovery of loans and disinvestment bring in money by reducing what the government owns: a claim on a borrower, or shares in a public company.',
    }),
    sl('example', 'Worked example 1: classifying the receipts of imagined Hemkunt', {
      b: 'Sort six receipts using two questions.',
      bl: ['**Does it create a liability?** If yes, it is a capital receipt.', '**Does it reduce an asset?** If yes, it is a capital receipt.', 'If **neither**, it is a revenue receipt: a tax or a non-tax item.', 'Always write the **reason** with the head.'],
      v: vClassReceipts,
      n: 'Let us sort six receipts of an imagined state. Stamp duty is a tax, so it is revenue. Fines and a dividend from its dairy company create no liability and reduce no asset, so they are non-tax revenue. Bonds create a liability, while a loan repaid by a city council and a share sale reduce assets, so those three are capital receipts.',
    }),
    sl('concept', 'Revenue expenditure', {
      b: '**Revenue expenditure** neither **creates an asset** nor **reduces a liability**.',
      v: vRevExp,
      n: 'Revenue expenditure keeps the government running from day to day. Salaries, pensions, interest on its debt and subsidies create nothing the government owns, and they do not reduce what it owes. Grants given to other governments are also revenue expenditure for the giver, because the giver gets no asset in return.',
    }),
    sl('check', 'Quick check: a loan comes back', {
      b: 'True or false: when a government recovers a loan, its liabilities increase.',
      chk: 'tf_recovery',
      n: 'Ask whether a recovered loan changes what the government owes, or what it owns.',
    }),
    sl('concept', 'Capital expenditure', {
      b: '**Capital expenditure** either **creates an asset** or **reduces a liability**.',
      v: vCapExp,
      n: 'Capital expenditure builds or buys things that last, like roads, dams and hospitals, or financial assets such as shares and loans given to others. Repaying borrowed money is also capital expenditure, because it reduces what the government owes.',
    }),
    sl('example', 'Worked example 2: classifying the spending of imagined Hemavati', {
      b: 'Sort six items of spending.',
      bl: ['**Does it create an asset?** Then capital expenditure.', '**Does it reduce a liability?** Then capital expenditure.', 'If **neither**, it is revenue expenditure.', 'Interest and repayment differ: interest is **revenue**, repayment is **capital**.'],
      v: vClassSpend,
      n: 'Now the spending side. Wages of forest guards, a food subsidy and interest on old bonds create no asset, so they are revenue expenditure. A metro line creates a physical asset, a loan to a cooperative bank creates a financial asset, and repaying old bonds reduces a liability, so those three are capital expenditure. Notice that interest and repayment of the same bonds fall under different heads.',
    }),
    sl('diagram', 'One budget at a glance: imagined Hemavati', {
      v: vStack,
      n: 'Here is a whole budget for an imagined republic. On the receipts side, taxes, non-tax revenue and non-debt capital receipts fall short of spending, so borrowing fills the rest. That is why the two bars are always equal in height. The size of that borrowing piece is what Part 2 calls the fiscal deficit.',
    }),
    sl('check', 'Quick check: interest received', {
      b: 'How should interest received on loans given to provinces be classified?',
      chk: 'm_interest_received',
      n: 'Interest received is not the loan coming back, so apply the two tests to it.',
    }),
    sl('summary', 'Summary', {
      bl: ['A budget is the **annual statement of estimated receipts and expenditure**.', 'Union budget in **Parliament**; State budgets in **State legislatures**.', 'Capital receipts **create a liability or reduce an asset**; revenue receipts do neither.', 'Capital expenditure **creates an asset or reduces a liability**; revenue expenditure does neither.'],
      v: vSumHeads,
      n: 'Let us sum up. A budget is an annual plan of estimated receipts and spending, approved by the legislature. The Union and each State present their own. Two tests sort every item: a capital receipt creates a liability or reduces an asset, and capital expenditure creates an asset or reduces a liability. Anything that passes neither test is revenue.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['**Interest paid** is revenue expenditure; **repayment** of the loan is capital expenditure.', '**Interest received** is a revenue receipt; **recovery** of the loan is a capital receipt.', 'A **grant given** is revenue expenditure for the giver, even if the receiver builds assets.', 'Always state the **reason** (the test) with the head: it earns the mark.'],
      n: 'Four traps cost marks here. Interest and repayment of the same loan fall under different heads, on both the paying and the receiving side. A grant given is revenue expenditure for the giver. And never write a head without the reason, because the test is what the examiner rewards.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Government Budget and Deficits — Part 2: Measures of Deficit',
  goals: [
    'Calculate the revenue, fiscal and primary deficits from budget data',
    'Explain what each deficit shows about a government\'s borrowing',
    'Evaluate the implications of high deficits for debt, interest and the economy',
  ],
  slides: [
    sl('title', 'Measures of Deficit', {
      b: 'Part 2 — the **revenue**, **fiscal** and **primary** deficits: how to calculate them and what they tell us.',
      v: flow('LR', ['Revenue deficit', 'Fiscal deficit', 'Primary deficit', 'Implications', 'Quality of borrowing'], 'Route map of Part 2: revenue deficit, fiscal deficit, primary deficit, their implications, and the quality of borrowing', 'Part 2 at a glance'),
      n: 'When a government spends more than it receives, the gap can be measured in three ways. Each measure answers a different question about borrowing. In this part we calculate all three, see what each one reveals, and judge when a deficit is a real worry.',
    }),
    sl('concept', 'Three measures of deficit', {
      b: 'Each deficit compares different parts of the budget.',
      v: vFormulas,
      n: 'The revenue deficit looks only at the revenue account. The fiscal deficit looks at the whole budget, leaving out borrowing from the receipts, so it equals what must be borrowed. The primary deficit takes the fiscal deficit and removes interest on past loans.',
    }),
    sl('concept', 'Revenue deficit', {
      b: '**Revenue deficit** = revenue expenditure − revenue receipts.',
      bl: ['It shows the government spending **more than its current income** on **current needs**.', 'The gap is met by **borrowing or selling assets**.'],
      v: vRdImp,
      n: 'The revenue deficit is the gap between revenue spending and revenue income. When it is positive, the government is paying for salaries, subsidies and interest partly with borrowed money or by selling what it owns. That borrowing builds no new assets.',
    }),
    sl('check', 'Quick check: a revenue gap', {
      b: 'Find the revenue deficit of imagined Shailpur.',
      chk: 'n_rd_shail',
      n: 'Subtract revenue receipts from revenue expenditure.',
    }),
    sl('concept', 'Fiscal deficit', {
      b: '**Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts).',
      v: vFdFlow,
      n: 'The fiscal deficit takes everything the government spends, on both accounts, and subtracts every receipt that does not create debt. Whatever is left must be borrowed. So the fiscal deficit is exactly the government\'s borrowing requirement for the year.',
    }),
    sl('concept', 'Primary deficit', {
      b: '**Primary deficit** = fiscal deficit − interest payments.',
      v: vPdTable,
      n: 'Part of each year\'s borrowing only pays interest on loans taken in earlier years. Removing that interest leaves the primary deficit, which shows how much is borrowed for present programmes. When it is zero, every rupee borrowed goes to pay interest on old debt.',
    }),
    sl('example', 'Worked example 3: the three deficits of imagined Hemavati', {
      b: 'Work through the formulas in order.',
      bl: [`Revenue receipts = ${inr(HEM_D.rr)}; **revenue deficit = ${HEM_D.rd}**.`, `Total expenditure = ${inr(HEM_D.te)}; non-debt receipts = ${inr(HEM_D.rr + HEM_D.ndcr)}.`, `**Fiscal deficit = ${inr(HEM_D.fd)}**, equal to borrowing.`, `**Primary deficit = ${inr(HEM_D.fd)} − ${HEM.interest} = ${HEM_D.pd}**.`],
      v: vHemTable,
      n: 'Take the imagined Republic of Hemavati. Revenue receipts are three thousand crore against revenue spending of three thousand seven hundred, a revenue deficit of seven hundred. Total spending is four thousand eight hundred, and receipts that create no debt are three thousand four hundred, so the fiscal deficit is fourteen hundred. Removing nine hundred of interest leaves a primary deficit of five hundred.',
    }),
    sl('diagram', 'Hemavati\'s deficits compared', {
      v: vDeficits,
      n: 'Here are the three numbers side by side. The fiscal deficit is the tallest because it covers the whole budget. The revenue deficit is half of it, so half of the borrowing pays for current spending. And the gap between the fiscal and primary deficits is the interest bill.',
    }),
    sl('check', 'Quick check: the order of the deficits', {
      b: 'Arrange Hemavati\'s three deficits from the smallest to the largest.',
      chk: 'ord_deficits',
      n: 'Use the figures you just calculated.',
    }),
    sl('concept', 'What a high fiscal deficit implies', {
      b: 'Persistent fiscal deficits **pile up debt**.',
      v: vFdImp,
      n: 'One year of borrowing adds to the government\'s debt, and every later year must pay interest on it. If deficits continue, interest takes a growing share of revenue, and new loans may be needed just to pay that interest. That is a debt trap. If the gap is met by borrowing from the central bank, new money can also push prices up.',
    }),
    sl('check', 'Quick check: borrowing equals the gap', {
      b: 'Fill in the blank: the fiscal deficit equals the total ___ requirement.',
      chk: 'fb_fd_borrow',
      n: 'Think about how the gap in the budget is filled.',
    }),
    sl('two-column', 'Is every deficit bad?', {
      cols: ['**Worrying when**\n\n- borrowing pays for **salaries and subsidies**\n- **interest** takes a growing share of revenue\n- the gap is met by **printing money**', '**Can be useful when**\n\n- borrowing builds **roads, power and canals**\n- the economy is in a **slump** and demand is low\n- new assets **raise future income**'],
      v: vQuality,
      n: 'A deficit is not good or bad in itself. What matters is what the borrowing pays for. Borrowing for salaries and subsidies leaves debt without assets. Borrowing for canals and roads, especially in a slump, can lift output and future revenue. Compare two imagined states: one borrows only for assets, the other spends half its borrowing on current needs.',
    }),
    sl('example', 'Worked example 4: a revenue surplus with a fiscal deficit in imagined Neelachal', {
      b: 'Can a state have both? Yes.',
      bl: [`Revenue surplus = ${inr(NEEL_D.rr)} − ${inr(NEEL.revExp)} = **${-NEEL_D.rd}**.`, `Fiscal deficit = ${inr(NEEL_D.te)} − ${inr(NEEL_D.rr + NEEL_D.ndcr)} = **${NEEL_D.fd}**.`, `Primary deficit = ${NEEL_D.fd} − ${NEEL.interest} = **${NEEL_D.pd}**.`, 'All the borrowing goes into **assets**, so its quality is good.'],
      v: vNeelTable,
      n: 'This imagined state earns more on its revenue account than it spends there, a surplus of one hundred and fifty crore. But it plans capital works of six hundred and fifty crore, more than its surplus and non-debt receipts together. So it still borrows four hundred crore, all of it for canals and a college. That is a deficit worth having.',
    }),
    sl('check', 'Quick check: zero primary deficit', {
      b: 'What does a primary deficit of zero show?',
      chk: 'm_pd_zero',
      n: 'Subtract interest from the fiscal deficit and think about where the borrowing goes.',
    }),
    sl('summary', 'Summary', {
      bl: ['**Revenue deficit** = revenue expenditure − revenue receipts.', '**Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts) = **borrowing**.', '**Primary deficit** = fiscal deficit − interest.', 'Judge a deficit by **what the borrowing pays for**.'],
      v: vFormulas,
      n: 'Let us sum up. The revenue deficit shows borrowing for current spending, the fiscal deficit shows total borrowing, and the primary deficit shows borrowing for present programmes after interest. High deficits pile up debt and interest. But borrowing that builds assets is far less worrying than borrowing to pay salaries.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Never include **borrowing** among the receipts when calculating the fiscal deficit.', 'Include **recovery of loans and disinvestment** as non-debt capital receipts.', 'Primary deficit **subtracts** interest; it is **smaller** than the fiscal deficit.', 'For implications, link each deficit to **debt, interest and assets**.'],
      n: 'Four points save marks. Leave borrowing out of the receipts when you calculate the fiscal deficit. Remember that recovery of loans and disinvestment count as receipts that create no debt. Subtract interest to get the primary deficit. And when asked about implications, connect the deficit to debt, interest and whether assets are created.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Government Budget and Deficits — Notes',
  sections: [
    {
      h: '1. The government budget; Union and State budgets',
      t: 1,
      b: '- **Meaning**: the annual statement of a government\'s **estimated receipts and expenditure** for the coming **financial year**, which runs from **1 April to 31 March**. The Constitution calls it the **annual financial statement** (Article 112 for the Union, Article 202 for the States).\n- **Features**: prepared **in advance**, so its figures are **estimates**; must be **approved by the legislature**; shows how any **gap** will be financed.\n- **Union budget**: presented by the Union government in **Parliament**; Union subjects such as defence and railways.\n- **State budget**: presented by a State government in its **legislature**; State subjects such as police and State roads.\n- **Types**: compare receipts other than borrowing with expenditure: **balanced** (equal), **surplus** (receipts larger), **deficit** (expenditure larger, gap borrowed).',
      terms: [['Government budget', 'An annual statement of estimated receipts and expenditure for the coming financial year.'], ['Deficit budget', 'A budget in which estimated expenditure exceeds estimated receipts other than borrowing.']],
      v: vUnionState,
      vs: [vBudgetMeaning, vTypes],
    },
    {
      h: '2. Revenue receipts',
      t: 2,
      b: '- **Test**: a revenue receipt **neither creates a liability nor reduces an asset**.\n- **Tax revenue**: income tax, corporation tax, the goods and services tax, customs duties: compulsory and never repaid.\n- **Non-tax revenue**: **fees** and fines, **interest received** on loans given, **dividends and profits** of public enterprises, and **grants received** from other governments.\n- Note: interest **received** is revenue, but the **recovery of the loan** itself is capital.',
      terms: [['Revenue receipt', 'A receipt that neither creates a liability nor reduces an asset of the government.'], ['Non-tax revenue', 'Revenue receipts other than taxes, such as fees, fines, interest and dividends.']],
      v: vRevReceipts,
      vs: [vClassReceipts],
    },
    {
      h: '3. Capital receipts',
      t: 2,
      b: '- **Test**: a capital receipt **either creates a liability or reduces an asset**.\n- **Borrowings** (market loans, loans from banks and abroad): create a liability.\n- **Recovery of loans** given earlier: reduces an asset (the claim).\n- **Disinvestment**, the sale of shares in public-sector enterprises: reduces an asset.\n- Recovery of loans and disinvestment are **non-debt capital receipts**: they bring in money without creating debt, which matters for the fiscal deficit.',
      terms: [['Capital receipt', 'A receipt that creates a liability or reduces an asset of the government.'], ['Disinvestment', 'Sale by the government of part or all of its shares in public-sector enterprises.']],
      v: vCapReceipts,
      vs: [vStructure],
    },
    {
      h: '4. Revenue and capital expenditure',
      t: 2,
      b: '- **Revenue expenditure** neither **creates an asset** nor **reduces a liability**: salaries, pensions, **interest paid**, subsidies, and **grants given** to other governments (even if the receiver builds assets with them).\n- **Capital expenditure** either **creates an asset** or **reduces a liability**: building roads, dams and hospitals; buying shares; **giving loans**; **repaying loans**.\n- The same loan can appear four ways: borrowing it (capital receipt), paying interest on it (revenue expenditure), repaying it (capital expenditure), and, for the lender, receiving interest (revenue receipt).',
      terms: [['Revenue expenditure', 'Spending that neither creates an asset nor reduces a liability.'], ['Capital expenditure', 'Spending that creates an asset or reduces a liability.']],
      v: vRevExp,
      vs: [vCapExp, vClassSpend],
    },
    {
      h: '5. Measures of deficit and how to calculate them',
      t: 3,
      b: `- **Revenue deficit** = revenue expenditure − revenue receipts.\n- **Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts). It equals the year\'s **borrowing**.\n- **Primary deficit** = fiscal deficit − interest payments.\n- Imagined **Hemavati** (₹ crore): revenue deficit ${HEM_D.rd}; fiscal deficit ${inr(HEM_D.fd)}; primary deficit ${HEM_D.pd}.\n- Imagined **Neelachal**: a revenue **surplus** of ${-NEEL_D.rd} but a fiscal deficit of ${NEEL_D.fd}, because capital spending exceeds the surplus and non-debt receipts.\n- Imagined **Kanakdesh**: fiscal deficit ${KANAK.fd} and interest ${KANAK.interest}, so the primary deficit is **zero**.`,
      terms: [['Fiscal deficit', 'Total expenditure minus revenue receipts and non-debt capital receipts; the borrowing requirement.'], ['Primary deficit', 'Fiscal deficit minus interest payments.']],
      v: vFormulas,
      vs: [vStack, vHemTable, vDeficits, vNeelTable],
    },
    {
      h: '6. Implications of deficits',
      t: 3,
      b: `- **Revenue deficit**: the government **dissaves**, using borrowing or asset sales for current needs; debt grows **without creating assets**, and future interest rises.\n- **Fiscal deficit**: shows total borrowing; if persistent, **debt and interest pile up**, leading towards a **debt trap**; if met by borrowing from the central bank, it can cause **inflation**.\n- **Primary deficit**: shows borrowing for **present programmes**; a fiscal deficit close to the interest bill means old debt is driving new borrowing.\n- **Quality of borrowing**: imagined Saraswatipur uses ${SARAS_SHARE} per cent of its borrowing for the revenue gap; imagined Neelachal uses none. Borrowing that builds assets, or that lifts demand in a slump, is far less harmful.`,
      terms: [['Debt trap', 'A situation in which a government has to borrow just to pay interest on earlier debt.'], ['Dissaving by the government', 'Current spending above current income, met by borrowing or selling assets.']],
      v: vFdImp,
      vs: [vRdImp, vPdTable, vQuality],
    },
  ],
  tips: '**Common mistakes**\n- Counting borrowing as a receipt when calculating the fiscal deficit.\n- Leaving recovery of loans or disinvestment out of non-debt capital receipts.\n- Calling interest paid capital expenditure, or repayment of a loan revenue expenditure.\n- Classifying a grant given by the Union as capital expenditure because the receiver builds assets.\n- Adding interest to get the primary deficit: it is subtracted.\n\n**How marks are usually awarded**\n- 1 mark: a correct option, a classification or a one-step calculation.\n- 2 marks: two points, or a head with its reason.\n- 3 marks: three points, or three calculations shown step by step.\n- 5 marks (and ISC 4- and 8-mark questions): parts answered separately, formulas written out, and a reasoned comment on what the deficits show.\n\nAll governments and figures in SOYL practice are imagined; no actual budget figures are used.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Government budget**', 'Annual statement of **estimated receipts and expenditure** for the coming financial year.', 'definition', 1],
  ['India\'s financial year', '**1 April to 31 March**.', 'fact', 1],
  ['What the Constitution calls the budget', 'The **annual financial statement** (Article 112; Article 202 for States).', 'fact', 1],
  ['Union versus State budget', 'Union: presented in **Parliament**. State: presented in the **State legislature**.', 'concept', 1],
  ['Why are budget figures estimates?', 'The budget is prepared **before** the year begins.', 'concept', 1],
  ['**Balanced budget**', 'Receipts other than borrowing **equal** expenditure.', 'definition', 1],
  ['**Surplus budget**', 'Receipts other than borrowing **exceed** expenditure.', 'definition', 1],
  ['**Deficit budget**', 'Expenditure **exceeds** receipts other than borrowing; the gap is borrowed.', 'definition', 1],
  ['**Revenue receipt**: test', 'Creates **no liability** and reduces **no asset**.', 'definition', 2],
  ['**Capital receipt**: test', 'Creates a **liability** or reduces an **asset**.', 'definition', 2],
  ['Two kinds of revenue receipts', '**Tax** (income tax, GST) and **non-tax** (fees, fines, interest, dividends).', 'concept', 2],
  ['Is disinvestment revenue or capital?', '**Capital receipt**: it reduces an asset.', 'example', 2],
  ['Interest **received** on loans given', '**Revenue** receipt (non-tax).', 'example', 2],
  ['Recovery of a loan given', '**Capital** receipt: the claim (asset) falls.', 'example', 2],
  ['**Revenue expenditure**: test', 'Creates **no asset** and reduces **no liability**.', 'definition', 2],
  ['**Capital expenditure**: test', 'Creates an **asset** or reduces a **liability**.', 'definition', 2],
  ['Interest **paid** versus loan **repaid**', 'Interest paid: **revenue** expenditure. Loan repaid: **capital** expenditure.', 'exam-tip', 2],
  ['A grant given by the Union to a State', '**Revenue expenditure** for the Union: no asset for the giver.', 'exam-tip', 2],
  ['**Non-debt capital receipts**', 'Recovery of loans and disinvestment: money in without new debt.', 'definition', 2],
  ['**Revenue deficit**', 'Revenue expenditure − revenue receipts.', 'formula', 3],
  ['**Fiscal deficit**', 'Total expenditure − (revenue receipts + non-debt capital receipts).', 'formula', 3],
  ['**Primary deficit**', 'Fiscal deficit − interest payments.', 'formula', 3],
  ['Fiscal deficit equals …', 'The government\'s **total borrowing requirement** for the year.', 'concept', 3],
  ['Hemavati (imagined): the three deficits', `Revenue ${HEM_D.rd}; fiscal ${inr(HEM_D.fd)}; primary ${HEM_D.pd} (₹ crore).`, 'example', 3],
  ['Primary deficit of zero means …', 'All borrowing pays **interest on past debt**.', 'concept', 3],
  ['Revenue surplus with a fiscal deficit: how?', '**Capital spending** exceeds the surplus plus non-debt capital receipts.', 'concept', 3],
  ['Implication of a revenue deficit', 'Borrowing for **current spending**: debt grows **without assets**.', 'concept', 3],
  ['Implication of a high fiscal deficit', 'Debt and **interest** pile up; risk of a **debt trap**; inflation if money is printed.', 'concept', 3],
  ['**Debt trap**', 'Borrowing just to pay **interest on old debt**.', 'definition', 3],
  ['Judging a deficit', 'Ask **what the borrowing pays for**: assets, or current spending?', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Government Budget and Deficits',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_budget_meaning', 'm_cap_receipt', 'm_rev_exp', 'm_fd_formula', 'ar_disinvest'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_union_state', { attempt: 1, keys: ['s_rr_two', 's_re_ce'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_hem_three', { attempt: 1, keys: ['s3_classify_six', 's3_rd_implication'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_deficits_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Government Budget and Deficits',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_fin_year', 'm_state_budget', 'm_tax_rr', 'm_borrow_capital', 'm_repay_loan', 'm_grant_states', 'm_rd_formula', 'm_pd_formula', 'm_rd_implies', 'm_fd_vs_rd', 'ar_interest_paid', 'ar_loans_given'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_cr_test', 's_fd_meaning', { attempt: 1, keys: ['s_pd_meaning', 's_grant_classify'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_budget_why', 's3_borrow_vs_tax', 's3_fd_implication', { attempt: 1, keys: ['s3_pd_meaning', 's3_neel'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_fd_evaluate', { attempt: 1, keys: ['l_classify_full', 'l_three_compare'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of isc-12-economics-ch17 only (the budget, Union and State budgets; revenue and capital receipts and expenditure; revenue, fiscal and primary deficits with their implications)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every government, state and figure written for this chapter (imagined); no textbook, specimen or past-paper item reused; no actual Union or State budget figure; set-ups differ from SOYL CBSE 12 Economics ch04 and ISC 12 Economics ch16',
    data: `figures computed in questions.mjs and asserted: Hemavati RD ${HEM_D.rd}, FD ${HEM_D.fd} (= borrowing), PD ${HEM_D.pd}, receipts and expenditure both ${HEM_D.te}; Neelachal revenue surplus ${-NEEL_D.rd}, FD ${NEEL_D.fd}, PD ${NEEL_D.pd}; Kanakdesh PD ${KANAK_PD}; Revapur interest ${REVA_INT}; Shailpur RD ${SHAIL_RD}; Saraswatipur PD ${SARAS_PD}, share ${SARAS_SHARE} per cent; budget-type gaps ${TYPE_GAP.join(', ')}; Hemavati next year PD ${HEM2_PD}`,
    facts: 'financial year 1 April to 31 March; annual financial statement (Article 112, Article 202); no current budget or deficit figures',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
