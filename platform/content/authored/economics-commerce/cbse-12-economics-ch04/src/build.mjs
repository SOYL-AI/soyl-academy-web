// Build CBSE 12 Economics ch04 Government Budget and the Economy. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch04', 'economics-commerce');
const { inr, deficits } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
// Deck economy: the imagined Government of Suryadesh (₹ crore).
const SU = { tax: 1600, nontax: 300, rec: 60, dis: 40, borrow: 700, re: 2250, int: 380, ce: 450, gdp: 20000 };
const SUrr = SU.tax + SU.nontax;
const SUndcr = SU.rec + SU.dis;
const SUd = deficits({ rr: SUrr, re: SU.re, ce: SU.ce, ndcr: SUndcr, int: SU.int });
const SUfdPct = (100 * SUd.fd) / SU.gdp;
const SUrdShare = (100 * SUd.rd) / SUd.fd;
const SUtr = SUrr + SUndcr + SU.borrow;
if (SUrr !== 1900 || SUd.te !== 2700 || SUtr !== SUd.te || SUd.rd !== 350 || SUd.fd !== 700 || SUd.fd !== SU.borrow || SUd.pd !== 320 || SUfdPct !== 3.5 || SUrdShare !== 50) throw new Error('figure check failed');
// Worked example 1 of Part 1: receipts of the imagined state of Malwa (₹ crore).
const MW = { income: 520, gst: 830, fees: 40, interest: 25, recovery: 35, dis: 90, borrow: 310 };
const MWrr = MW.income + MW.gst + MW.fees + MW.interest;
const MWnd = MW.recovery + MW.dis;
if (MWrr !== 1415 || MWnd !== 125) throw new Error('figure check failed (Malwa)');

// ---------------------------------------------------------------- visuals
/** Horizontal stacked bars: bars = [{ label, segs: [[name, value, colour]] }], scale = px per ₹ crore. */
function stackBars(bars, scale, alt, caption, h = null) {
  const rowH = 78;
  const s = new Svg(660, h ?? 30 + bars.length * rowH);
  bars.forEach((b, i) => {
    const y = 20 + i * rowH;
    s.text(10, y + 18, b.label, { anchor: 'start', bold: true, size: 13 });
    let x = 190;
    for (const [name, v, col] of b.segs) {
      const w = v * scale;
      s.rect(x, y, w, 36, { rx: 2, fill: col, fillOpacity: col === 'fill' ? undefined : 0.35, color: col === 'fill' ? undefined : col, sw: 1.5 });
      if (w > 70) s.text(x + w / 2, y + 18, inr(v), { size: 13, bold: true });
      x += w;
    }
    s.text(190, y + 52, b.segs.map(([n, v]) => `${n} ${inr(v)}`).join(' + '), { anchor: 'start', size: 12, muted: true });
  });
  return s.visual(alt, caption);
}
const SC = 0.16;
const vRD = stackBars(
  [
    { label: 'Revenue receipts', segs: [['Tax', SU.tax, 'fill'], ['Non-tax', SU.nontax, 'fill']] },
    { label: 'Revenue expenditure', segs: [['Covered by revenue receipts', SUrr, 'fill'], ['Revenue deficit', SUd.rd, 'accent']] },
  ],
  SC,
  `Bar diagram for the imagined Government of Suryadesh: revenue receipts are ${inr(SUrr)} crore rupees (tax ${inr(SU.tax)}, non-tax ${SU.nontax}); revenue expenditure is ${inr(SU.re)} crore, so the revenue deficit, shown in the accent colour, is ${SUd.rd} crore`,
  `Revenue deficit = ${inr(SU.re)} − ${inr(SUrr)} = ${SUd.rd} (₹ crore, imagined).`,
);
const vFD = stackBars(
  [
    { label: 'Total expenditure', segs: [['Revenue expenditure', SU.re, 'fill'], ['Capital expenditure', SU.ce, 'blue']] },
    { label: 'Total receipts', segs: [['Revenue receipts', SUrr, 'fill'], ['Non-debt capital', SUndcr, 'green'], ['Borrowing', SU.borrow, 'accent']] },
  ],
  SC,
  `Bar diagram for the imagined Government of Suryadesh: total expenditure ${inr(SUd.te)} crore (revenue ${inr(SU.re)}, capital ${SU.ce}); total receipts are revenue receipts ${inr(SUrr)}, non-debt capital receipts ${SUndcr} and borrowing ${SU.borrow}; the borrowing, shown in the accent colour, is the fiscal deficit`,
  `Fiscal deficit = ${inr(SUd.te)} − (${inr(SUrr)} + ${SUndcr}) = ${SUd.fd} = borrowing (₹ crore, imagined).`,
);
const vPD = stackBars(
  [
    { label: 'Fiscal deficit', segs: [['Interest payments', SU.int, 'muted'], ['Primary deficit', SUd.pd, 'accent']] },
  ],
  0.6,
  `Bar diagram splitting the fiscal deficit of ${SUd.fd} crore of the imagined Government of Suryadesh into interest payments of ${SU.int} crore and a primary deficit of ${SUd.pd} crore, shown in the accent colour`,
  `Primary deficit = ${SUd.fd} − ${SU.int} = ${SUd.pd} (₹ crore, imagined).`,
);
const vRoute1 = flow('LR', ['What a budget is', 'Four objectives', 'Revenue and capital receipts', 'Direct and indirect taxes', 'Revenue and capital expenditure'], 'Route map of Part 1: what a budget is, its four objectives, revenue and capital receipts, direct and indirect taxes, revenue and capital expenditure', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Balanced, surplus and deficit budgets', 'Revenue deficit', 'Fiscal deficit', 'Primary deficit', 'What deficits mean'], 'Route map of Part 2: balanced, surplus and deficit budgets, then revenue, fiscal and primary deficits and what they mean', 'Part 2 at a glance');
const vBudgetIs = table(
  ['Feature', 'What it means'],
  [
    ['A statement of estimates', 'Expected receipts and expenditure, not actual figures'],
    ['For one financial year', 'In India, 1 April to 31 March'],
    ['Placed before the legislature', 'Parliament for the Union budget (the "annual financial statement" of the Constitution); state assemblies for state budgets'],
    ['A policy document', 'Shows how the government means to raise and use money to meet its aims'],
  ],
  'Table of four features of a government budget: a statement of estimates, for one financial year from April to March, placed before Parliament or the state assembly, and a policy document',
);
const vTwoParts = flow('TB', ['Government budget', 'Budget receipts: where the money comes from', 'Budget expenditure: where the money goes'], 'Diagram: a government budget has two parts, budget receipts showing where the money comes from and budget expenditure showing where it goes', 'Two sides of every budget', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
]);
const vPublicGoods = table(
  ['', 'Private good', 'Public good'],
  [
    ['Example', 'A cricket bat, a plate of dosa', 'Street lights, national defence, a lighthouse'],
    ['Can non-payers be kept out?', 'Yes (excludable)', 'No (non-excludable)'],
    ['Does one person\'s use reduce another\'s?', 'Yes (rival)', 'No (non-rival)'],
    ['Who supplies it?', 'The market', 'Mainly the government, paid for from taxes'],
  ],
  'Table comparing private goods such as a cricket bat with public goods such as street lights and defence: public goods are non-excludable and non-rival, so the government supplies them from taxes',
  'Free riders are the reason the market under-supplies public goods.',
);
const vRedis = flow('LR', ['Progressive taxes: higher rates on higher incomes', 'Government revenue', 'Transfers and free services: food, schooling, health, pensions', 'Narrower gap between rich and poor'], 'Flow of redistribution: progressive taxes raise revenue that pays for transfers and free services to poorer families, which narrows the gap between rich and poor', 'Redistribution of income');
const vStability = table(
  ['Situation', 'Problem', 'Budget response', 'Effect on demand'],
  [
    ['Slump', 'Deficient demand, unemployment', 'Raise spending, cut taxes', 'Demand rises'],
    ['Boom with inflation', 'Excess demand, rising prices', 'Cut spending, raise taxes', 'Demand falls'],
  ],
  'Table of the stability objective: in a slump with unemployment the government raises spending or cuts taxes so demand rises; in an inflationary boom it cuts spending or raises taxes so demand falls',
  'The budget leans against the wind.',
);
const vReceiptsTree = flow('TB', ['Budget receipts', 'Revenue receipts: no liability, no fall in assets', 'Capital receipts: create a liability or reduce assets', 'Tax revenue: direct and indirect taxes', 'Non-tax revenue: interest, dividends, fees, fines, grants', 'Borrowings (debt-creating)', 'Recovery of loans and disinvestment (non-debt)'], 'Tree diagram of budget receipts: revenue receipts split into tax revenue and non-tax revenue; capital receipts split into borrowings, which create debt, and recovery of loans and disinvestment, which do not', 'Classification of receipts', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n6' }, { from: 'n3', to: 'n7' },
]);
const vTaxes = table(
  ['', 'Direct tax', 'Indirect tax'],
  [
    ['Levied on', 'Income and property of persons and companies', 'Goods and services'],
    ['Can the burden be shifted?', 'No: impact and incidence on the same person', 'Yes: passed on to buyers in the price'],
    ['Examples', 'Personal income tax, corporation tax', 'GST (since 2017), customs duties'],
  ],
  'Table comparing direct and indirect taxes: direct taxes are on income and property and cannot be shifted, for example income tax and corporation tax; indirect taxes are on goods and services and are passed on to buyers, for example GST and customs duties',
);
const vNonTax = table(
  ['Non-tax revenue', 'Example (imagined)'],
  [
    ['Interest receipts', 'Interest on loans the Centre gave to states'],
    ['Dividends and profits', 'Dividend from a public-sector bank'],
    ['Fees', 'Passport fee, court fee, college fee'],
    ['Fines and penalties', 'Fine on a factory for pollution'],
    ['Grants and gifts received', 'A grant from an international agency for flood relief'],
  ],
  'Table of five kinds of non-tax revenue with examples: interest receipts, dividends and profits, fees, fines and penalties, and grants received',
);
const vCapReceipts = table(
  ['Capital receipt', 'Why it is capital', 'Debt-creating?'],
  [
    ['Borrowings (bonds, loans from banks and abroad)', 'Creates a liability', 'Yes'],
    ['Recovery of loans given earlier', 'Reduces an asset (a claim)', 'No'],
    ['Disinvestment (sale of shares in public enterprises)', 'Reduces an asset (ownership)', 'No'],
  ],
  'Table of capital receipts: borrowings create a liability and are debt-creating; recovery of loans and disinvestment reduce assets and are non-debt capital receipts',
);
const vWE1 = table(
  ['Receipt of the imagined state of Malwa', '₹ crore', 'Class'],
  [
    ['State\'s share of income tax', inr(MW.income), 'Revenue: tax (direct)'],
    ['State GST', inr(MW.gst), 'Revenue: tax (indirect)'],
    ['Fees from state colleges', String(MW.fees), 'Revenue: non-tax'],
    ['Interest on loans to municipalities', String(MW.interest), 'Revenue: non-tax'],
    ['Recovery of loans from municipalities', String(MW.recovery), 'Capital: non-debt'],
    ['Sale of shares in a state bus company', String(MW.dis), 'Capital: non-debt'],
    ['Bonds sold in the market', String(MW.borrow), 'Capital: debt-creating'],
    ['**Revenue receipts**', `**${inr(MWrr)}**`, ''],
    ['**Non-debt capital receipts**', `**${MWnd}**`, ''],
  ],
  `Table classifying seven receipts of the imagined state of Malwa: income-tax share and GST are tax revenue, fees and interest are non-tax revenue, loan recovery and share sale are non-debt capital receipts, bonds are borrowing; revenue receipts total ${inr(MWrr)} crore and non-debt capital receipts ${MWnd} crore`,
  'Imagined figures. Note: interest received is revenue, but the loan recovered is capital.',
);
const vExpTree = flow('TB', ['Budget expenditure', 'Revenue expenditure: no asset created, no liability reduced', 'Capital expenditure: creates an asset or reduces a liability', 'Salaries, pensions, interest, subsidies, grants to states', 'Roads, dams, machinery, shares, loans given, loan repayment'], 'Tree diagram of budget expenditure: revenue expenditure such as salaries, pensions, interest, subsidies and grants creates no asset; capital expenditure such as roads, dams, machinery, shares, loans given and loan repayment creates an asset or reduces a liability', 'Classification of expenditure', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n5' },
]);
const vWE2 = table(
  ['Spending (imagined)', 'Test', 'Class'],
  [
    ['Salaries of police officers', 'No asset, no liability reduced', 'Revenue expenditure'],
    ['Building a district hospital', 'Creates an asset', 'Capital expenditure'],
    ['Interest on government bonds', 'Loan itself not reduced', 'Revenue expenditure'],
    ['Repaying a loan to a foreign bank', 'Reduces a liability', 'Capital expenditure'],
    ['Loan to a state for a metro', 'Creates an asset (a claim)', 'Capital expenditure'],
    ['Grant to a state for school buildings', 'No asset for the Centre', 'Revenue expenditure'],
  ],
  'Table classifying six items of spending: police salaries, interest and grants to states are revenue expenditure; a hospital, loan repayment and a loan to a state are capital expenditure',
  'One test settles every case: does it create an asset or reduce a liability for the spender?',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Budget', 'Annual statement of estimated receipts and expenditure (April to March)'],
    ['Objectives', 'Reallocation, redistribution, stability, managing public enterprises'],
    ['Revenue receipts', 'Tax (direct, indirect) and non-tax; no liability, no fall in assets'],
    ['Capital receipts', 'Borrowings (debt), recovery of loans and disinvestment (non-debt)'],
    ['Expenditure', 'Revenue (no asset) versus capital (asset created or liability reduced)'],
  ],
  'Summary table of Part 1: the budget, its four objectives, revenue and capital receipts, and revenue and capital expenditure',
);
const vBudgetTypes = table(
  ['Type', 'Condition', 'Suits'],
  [
    ['Balanced', 'Estimated receipts = estimated expenditure', 'Rarely possible; does not fight a slump or inflation'],
    ['Surplus', 'Receipts > expenditure', 'Inflation (excess demand)'],
    ['Deficit', 'Expenditure > receipts', 'Slump and unemployment (deficient demand), development spending'],
  ],
  'Table of three kinds of budget: balanced when receipts equal expenditure, surplus when receipts are greater, suited to inflation, and deficit when expenditure is greater, suited to a slump and development spending',
);
const vWhich = flow('LR', ['Prices rising fast', 'Surplus budget: take demand out', 'Unemployment and slump', 'Deficit budget: add demand'], 'Flow: when prices are rising fast, a surplus budget takes demand out; when there is unemployment and a slump, a deficit budget adds demand', 'Match the budget to the problem', [
  { from: 'n1', to: 'n2' }, { from: 'n3', to: 'n4' },
]);
const vWorked = table(
  ['Item (Suryadesh, ₹ crore)', 'Working', 'Result'],
  [
    ['Revenue receipts', `${inr(SU.tax)} + ${SU.nontax}`, inr(SUrr)],
    ['Total expenditure', `${inr(SU.re)} + ${SU.ce}`, inr(SUd.te)],
    ['Revenue deficit', `${inr(SU.re)} − ${inr(SUrr)}`, `**${SUd.rd}**`],
    ['Fiscal deficit', `${inr(SUd.te)} − (${inr(SUrr)} + ${SU.rec} + ${SU.dis})`, `**${SUd.fd}** (= borrowing ${SU.borrow})`],
    ['Primary deficit', `${SUd.fd} − ${SU.int}`, `**${SUd.pd}**`],
  ],
  `Worked table for the imagined Government of Suryadesh: revenue receipts ${inr(SUrr)}, total expenditure ${inr(SUd.te)}, revenue deficit ${SUd.rd}, fiscal deficit ${SUd.fd} which equals borrowing, primary deficit ${SUd.pd}, all in crore rupees`,
  'Check: fiscal deficit must equal borrowings.',
);
const vReading = table(
  ['Ratio (Suryadesh)', 'Working', 'Reading'],
  [
    ['Fiscal deficit as per cent of GDP', `${SUd.fd} ÷ ${inr(SU.gdp)} × 100 = ${SUfdPct}%`, 'Size of borrowing relative to the economy'],
    ['Revenue deficit as per cent of fiscal deficit', `${SUd.rd} ÷ ${SUd.fd} × 100 = ${SUrdShare}%`, 'Half the borrowing pays for current spending'],
    ['Interest as per cent of fiscal deficit', `${SU.int} ÷ ${SUd.fd} × 100 ≈ ${Math.round((100 * SU.int) / SUd.fd)}%`, 'More than half the borrowing services old debt'],
  ],
  `Table of three ratios for the imagined Government of Suryadesh: fiscal deficit is ${SUfdPct} per cent of a GDP of ${inr(SU.gdp)} crore; revenue deficit is ${SUrdShare} per cent of the fiscal deficit; interest is about ${Math.round((100 * SU.int) / SUd.fd)} per cent of the fiscal deficit`,
  'Imagined figures. Deficits are usually compared as a share of GDP.',
);
const vRDimp = flow('LR', ['Revenue deficit', 'Borrow or sell assets to pay running costs', 'No new asset to earn income', 'Debt and interest rise'], 'Flow of the implications of a revenue deficit: the government borrows or sells assets to pay running costs, no new asset earns income, so debt and interest rise', 'Revenue deficit means dissaving');
const vDebtTrap = flow('LR', ['Large fiscal deficit', 'More borrowing', 'Higher interest payments next year', 'Larger revenue expenditure', 'Even larger deficit'], 'Circular flow of a debt trap: a large fiscal deficit means more borrowing, higher interest next year, larger revenue expenditure and an even larger deficit', 'The risk of a debt trap', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n2' },
]);
const vGoodBad = table(
  ['A deficit tends to help when…', 'A deficit tends to harm when…'],
  [
    ['The economy is in a slump with idle resources', 'The economy is already at full employment (inflation)'],
    ['Borrowing pays for roads, power, irrigation', 'Borrowing pays for salaries and subsidies (revenue deficit)'],
    ['It is moderate and temporary', 'It is large and persistent, so interest keeps rising'],
    ['It is financed from savings in the market', 'It is financed by creating new money'],
  ],
  'Table of when a deficit tends to help (slump, asset building, moderate and temporary, financed from savings) and when it tends to harm (full employment, current spending, large and persistent, financed by new money)',
);
const vReduce = table(
  ['Route', 'Examples', 'Caution'],
  [
    ['Raise revenue', 'Wider tax base, better collection, fewer exemptions', 'High rates can discourage work and investment'],
    ['Cut revenue expenditure', 'Better-targeted subsidies, lower administrative costs', 'Cuts should not hurt the poor or essential services'],
    ['Non-debt capital receipts', 'Disinvestment, recovering old loans', 'One-time money; future dividends are given up'],
    ['Rules for discipline', 'Deficit targets set by law (the FRBM Act, 2003)', 'Targets can be relaxed in emergencies'],
  ],
  'Table of four routes to reduce deficits with cautions: raising revenue, cutting revenue expenditure, non-debt capital receipts, and legal deficit targets such as the FRBM Act of 2003',
);
const vSummary2 = table(
  ['Measure', 'Formula', 'Shows'],
  [
    ['Revenue deficit', 'Revenue expenditure − revenue receipts', 'Borrowing for current spending (dissaving)'],
    ['Fiscal deficit', 'Total expenditure − total receipts excluding borrowings', 'Total borrowing needed'],
    ['Primary deficit', 'Fiscal deficit − interest payments', 'Borrowing for present needs, excluding past debt'],
  ],
  'Summary table of the three deficits: revenue deficit is revenue expenditure minus revenue receipts; fiscal deficit is total expenditure minus receipts other than borrowings; primary deficit is fiscal deficit minus interest payments',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Government Budget and the Economy — Part 1: Objectives, Receipts and Expenditure',
  goals: [
    'Explain what a government budget is and its four objectives',
    'Classify receipts into revenue (tax and non-tax) and capital (debt and non-debt) receipts',
    'Distinguish between direct and indirect taxes',
    'Classify expenditure into revenue and capital expenditure using the asset–liability test',
  ],
  slides: [
    sl('title', 'Government Budget and the Economy', {
      b: 'Part 1 — what a **budget** is, why governments make one, and how **receipts** and **expenditure** are classified.',
      v: vRoute1,
      n: 'Every family plans its money: what will come in this month, and what must be spent. A government does the same, but on a giant scale, and its plan changes the whole economy. In this part we see what a government budget is, the four aims it serves, and how every rupee coming in and going out is classified. The classification is the base for the deficits in Part 2.',
    }),
    sl('concept', 'What is a government budget?', {
      b: 'A **government budget** is an annual statement of the **estimated receipts** and **estimated expenditure** of the government for the coming **financial year**.',
      v: vBudgetIs,
      n: 'A government budget is a statement of what the government expects to receive and what it plans to spend in the coming financial year, which in India runs from the first of April to the thirty-first of March. The Union budget is placed before Parliament, and each state places its own budget before its assembly. Notice the word estimated: a budget is a plan, not a record of what already happened.',
    }),
    sl('diagram', 'Two parts of every budget', {
      v: vTwoParts,
      n: 'Every budget has two sides. The receipts budget shows where the money will come from: taxes, fees, profits of public enterprises, and borrowing. The expenditure budget shows where it will go: salaries, pensions, subsidies, interest, roads, dams and loans. Keep these two sides in mind; every classification in this chapter sorts items on one of them.',
    }),
    sl('check', 'Quick check: what does a budget show?', {
      b: 'True or false? A budget shows only what the government plans to spend.',
      chk: 'tf_budget_both',
      n: 'Think back to the two sides of a budget before you answer.',
    }),
    sl('concept', 'Objective 1: reallocation of resources', {
      b: 'Markets left alone may produce too little of some goods and too much of others. The budget **shifts resources**: taxes on harmful goods, subsidies on useful ones, and direct supply of **public goods**.',
      v: vPublicGoods,
      n: 'The first aim is reallocation of resources. Private firms produce what is profitable, which is not always what society needs. Some goods, like street lights and defence, are public goods: nobody can be kept from using them, and one person\'s use does not reduce another\'s. People can enjoy them without paying, so markets supply too little. The government supplies them from taxes, and it uses taxes and subsidies to steer production.',
    }),
    sl('concept', 'Objective 2: redistribution of income', {
      b: 'The budget can **reduce inequality**: take a larger share from higher incomes and spend on the poor.',
      v: vRedis,
      n: 'The second aim is to reduce inequality. Progressive income tax takes a larger share of income from people who earn more. The revenue can pay for subsidised food grain, free school meals, scholarships, health care and old-age pensions, which raise the real income of poorer families. So money flows, through the budget, from those who have more to those who have less.',
    }),
    sl('concept', 'Objective 3: economic stability', {
      b: 'Booms and slumps come from swings in **aggregate demand**. The budget pushes demand the other way.',
      v: vStability,
      n: 'The third aim is stability. In a slump, demand is too low and workers lose jobs, so the government spends more or taxes less to lift demand. In a boom with fast-rising prices, demand is too high, so it spends less or taxes more. In this way the budget leans against the wind and keeps output and prices steadier.',
    }),
    sl('concept', 'Objective 4: managing public enterprises', {
      b: 'Some activities are **natural monopolies** (railway networks, power lines, water supply). Public enterprises can keep such essential services **affordable** and prevent **concentration of economic power** in a few private hands.',
      bl: ['The budget shows money put into public enterprises and the dividends received from them.', 'Selling part of the government\'s shares in them (disinvestment) also appears in the budget.'],
      n: 'The fourth aim is managing public enterprises. In some activities, such as railway networks or power transmission, one supplier serves everyone at the lowest cost. If a private firm held such a monopoly it could charge very high prices. Running these enterprises in the public sector, or regulating them closely, keeps essential services affordable. The budget records money invested in them and the dividends they pay.',
    }),
    sl('check', 'Quick check: name the objective', {
      b: 'In a slump the government spends more on roads and rural works. Which objective is this?',
      chk: 'm_stabilisation',
      n: 'Ask yourself: is the measure about which goods are produced, who gets income, or the level of demand in the whole economy?',
    }),
    sl('diagram', 'Classifying budget receipts', {
      v: vReceiptsTree,
      n: 'Now the receipts side. Apply one test. If a receipt neither creates a liability nor reduces the government\'s assets, it is a revenue receipt: taxes, and non-tax items such as interest, dividends, fees and fines. If it creates a liability, like borrowing, or reduces assets, like selling shares or recovering a loan, it is a capital receipt. Borrowing creates debt; the other two are non-debt capital receipts.',
    }),
    sl('two-column', 'Direct and indirect taxes', {
      cols: [
        '**Direct tax**\n\n- On **income and property**.\n- **Cannot be shifted**: impact and incidence fall on the same person.\n- Examples: personal income tax, corporation tax.\n- Can be **progressive**.',
        '**Indirect tax**\n\n- On **goods and services**.\n- **Shifted** to buyers through prices.\n- Examples: GST (from 2017), customs duties.\n- Paid by rich and poor at the same rate on a good.',
      ],
      v: vTaxes,
      n: 'Taxes are of two kinds. A direct tax, such as income tax, is paid by the person on whom it is levied, who cannot pass it on: the impact and the incidence fall on the same person. An indirect tax, such as the Goods and Services Tax, is collected from sellers but passed on to buyers in the price. Direct taxes can be made progressive; indirect taxes fall equally on rich and poor buyers of a good.',
    }),
    sl('concept', 'Non-tax revenue', {
      b: 'Revenue the government earns **without taxing**: in return for a service, from its own property and lending, or as penalties and grants.',
      v: vNonTax,
      n: 'Not all revenue is tax. The government earns interest on loans it has given, dividends and profits from public enterprises, fees for services such as passports and courts, fines and penalties, and grants it receives. None of these creates a liability or reduces an asset, so all are revenue receipts.',
    }),
    sl('concept', 'Capital receipts', {
      b: 'Three main capital receipts. Only borrowings create **debt**.',
      v: vCapReceipts,
      n: 'Capital receipts are of three main kinds. Borrowings, from the public, banks or abroad, create a liability because they must be repaid. Recovery of loans reduces an asset, the government\'s claim on the borrower. Disinvestment, selling shares in public enterprises, reduces the government\'s ownership. The last two do not create debt, so they are called non-debt capital receipts. This group matters for the fiscal deficit.',
    }),
    sl('example', 'Worked example 1: classifying receipts', {
      b: 'Classify the receipts of the imagined state of Malwa, then total the revenue receipts and the non-debt capital receipts.',
      bl: [
        'Step 1 — Does it create a liability or reduce an asset? If **no**, it is revenue.',
        'Step 2 — Among revenue receipts, is it a compulsory payment with no direct return? Then **tax**; otherwise **non-tax**.',
        'Step 3 — Among capital receipts, does it have to be repaid? Then **debt-creating**; otherwise **non-debt**.',
        `Step 4 — Add: revenue receipts = ${inr(MW.income)} + ${inr(MW.gst)} + ${MW.fees} + ${MW.interest} = **${inr(MWrr)}**; non-debt = ${MW.recovery} + ${MW.dis} = **${MWnd}** (₹ crore).`,
      ],
      v: vWE1,
      n: 'Let us classify the receipts of an imagined state. The income tax share and the state GST are tax revenue. College fees and interest on loans are non-tax revenue. The loan recovered and the sale of shares reduce assets, so they are non-debt capital receipts. The bonds must be repaid, so they are debt. Watch the trap: interest on a loan is revenue, but getting the loan itself back is capital.',
    }),
    sl('check', 'Quick check: tax or non-tax?', {
      b: 'Which of these is a non-tax revenue receipt?',
      chk: 'm_nontax',
      n: 'Remember the test for a capital receipt first, then decide whether a revenue receipt is a tax.',
    }),
    sl('diagram', 'Classifying budget expenditure', {
      v: vExpTree,
      n: 'The expenditure side uses a mirror test. Spending that creates an asset or reduces a liability is capital expenditure: roads, dams, machinery, buying shares, giving loans and repaying loans. Spending that does neither is revenue expenditure: salaries, pensions, interest, subsidies and grants. Revenue expenditure keeps the government running; capital expenditure builds capacity for the future.',
    }),
    sl('example', 'Worked example 2: classifying expenditure', {
      b: 'Classify six items of central government spending (imagined).',
      bl: [
        'Step 1 — Ask: does it create an asset for the **spender**? Then capital.',
        'Step 2 — Does it reduce a liability (repaying a loan)? Then capital.',
        'Step 3 — If neither, it is revenue expenditure.',
        'Step 4 — Careful: interest is revenue, but **repaying** the loan is capital; a grant to a state is revenue for the Centre even if the state builds a school with it.',
      ],
      v: vWE2,
      n: 'Apply the test to six items. Police salaries and interest create no asset, so they are revenue expenditure. A hospital creates an asset, a loan repayment reduces a liability, and a loan given to a state creates a claim, so these three are capital. The grant to a state is the classic trap: the building belongs to the state, so for the Centre the grant is revenue expenditure.',
    }),
    sl('check', 'Quick check: disinvestment', {
      b: 'True or false? Money from selling shares of a public enterprise is a revenue receipt.',
      chk: 'tf_disinvest',
      n: 'Ask what happens to the government\'s assets when it sells shares.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A budget is the annual statement of estimated receipts and expenditure. It aims at reallocation, redistribution, stability and managing public enterprises. Revenue receipts are taxes and non-tax revenue; capital receipts are borrowings, recovery of loans and disinvestment. Expenditure is capital if it creates an asset or reduces a liability, and revenue otherwise.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always give the **reason** with a classification: "creates a liability", "reduces an asset", "creates no asset". The reason earns the mark.',
        'Interest **received** is revenue; a loan **recovered** is capital. Interest **paid** is revenue expenditure; a loan **repaid** is capital expenditure.',
        'Grants to states are **revenue expenditure** for the Centre.',
        'Direct vs indirect: use **impact and incidence**, then give an example.',
        'Objectives: name the objective, explain in one line and give a budget measure.',
      ],
      n: 'Here are the habits that earn marks. Never classify without a reason. Keep the four loan traps straight: interest received and paid are revenue items, while loans recovered and repaid are capital items. Remember that grants to states are revenue expenditure for the Centre. And for objectives, name it, explain it in a line and give one budget measure.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Government Budget and the Economy — Part 2: Kinds of Budget and Measures of Deficit',
  goals: [
    'Distinguish balanced, surplus and deficit budgets and say when each suits the economy',
    'Calculate revenue, fiscal and primary deficits from budget data',
    'Explain what each deficit shows about the government\'s finances',
    'Evaluate the effects of deficits and the ways to reduce them',
  ],
  slides: [
    sl('title', 'Kinds of budget and measures of deficit', {
      b: 'Part 2 — **balanced, surplus and deficit** budgets, and the three measures of deficit: **revenue, fiscal and primary**.',
      v: vRoute2,
      n: 'In Part 2 we put the two sides of the budget against each other. If receipts and spending match, the budget is balanced; if not, there is a surplus or a deficit. Then we learn three measures of deficit, revenue, fiscal and primary, which you must be able to calculate and explain. We will use one imagined government, Suryadesh, all the way through.',
    }),
    sl('concept', 'Balanced, surplus and deficit budgets', {
      b: 'Compare **estimated receipts** with **estimated expenditure**.',
      v: vBudgetTypes,
      n: 'If estimated receipts equal estimated expenditure, the budget is balanced. If receipts are more than expenditure, it is a surplus budget. If expenditure is more than receipts, it is a deficit budget. A balanced budget sounds prudent, but it gives the government no room to fight a slump or inflation, and most developing countries run deficits to pay for development.',
    }),
    sl('diagram', 'Which budget when?', {
      v: vWhich,
      n: 'Link this to the stability objective. When prices are rising fast because demand is too high, a surplus budget takes more out of the economy in taxes than it puts back in spending, so demand falls. When there is unemployment and a slump, a deficit budget puts more in than it takes out, so demand rises.',
    }),
    sl('check', 'Quick check: a balanced budget', {
      b: 'When is a budget called balanced?',
      chk: 'm_balanced',
      n: 'Compare the two sides of the budget.',
    }),
    sl('diagram', 'Revenue deficit', {
      b: '**Revenue deficit = revenue expenditure − revenue receipts**',
      v: vRD,
      n: 'The first measure is the revenue deficit: revenue expenditure minus revenue receipts. In Suryadesh, running costs are two thousand two hundred and fifty crore rupees, but taxes and non-tax revenue bring in only one thousand nine hundred crore. The gap of three hundred and fifty crore must be met by borrowing or by selling assets. The government is dissaving: using capital receipts to pay for consumption.',
    }),
    sl('diagram', 'Fiscal deficit', {
      b: '**Fiscal deficit = total expenditure − total receipts excluding borrowings**',
      v: vFD,
      n: 'The fiscal deficit is the widest measure. Take total expenditure, revenue plus capital, and subtract all receipts except borrowing. In Suryadesh, total expenditure is two thousand seven hundred crore. Revenue receipts and non-debt capital receipts together are two thousand crore. The gap of seven hundred crore is exactly what Suryadesh borrows. So the fiscal deficit equals the borrowing requirement of the government.',
    }),
    sl('diagram', 'Primary deficit', {
      b: '**Primary deficit = fiscal deficit − interest payments**',
      v: vPD,
      n: 'Part of every year\'s borrowing only pays interest on loans taken in the past. Subtract interest payments from the fiscal deficit and you get the primary deficit. In Suryadesh, interest is three hundred and eighty crore, so the primary deficit is three hundred and twenty crore. It shows how much the government borrows for its present needs, leaving out the cost of past debt.',
    }),
    sl('check', 'Quick check: what does a revenue deficit mean?', {
      b: 'A revenue deficit means that the government…',
      chk: 'm_rd_meaning',
      n: 'Recall which receipts must fill the gap when revenue receipts fall short of revenue expenditure.',
    }),
    sl('example', 'Worked example 1: the three deficits of Suryadesh', {
      b: 'Budget of the imagined Government of Suryadesh (₹ crore).',
      bl: [
        `Given: tax ${inr(SU.tax)}; non-tax ${SU.nontax}; recovery of loans ${SU.rec}; disinvestment ${SU.dis}; borrowings ${SU.borrow}; revenue expenditure ${inr(SU.re)} (interest ${SU.int}); capital expenditure ${SU.ce}.`,
        `Step 1 — Revenue deficit = ${inr(SU.re)} − ${inr(SUrr)} = **${SUd.rd}**.`,
        `Step 2 — Fiscal deficit = ${inr(SUd.te)} − (${inr(SUrr)} + ${SU.rec} + ${SU.dis}) = **${SUd.fd}**.`,
        `Step 3 — Check: fiscal deficit = borrowings = ${SU.borrow}. ✓`,
        `Step 4 — Primary deficit = ${SUd.fd} − ${SU.int} = **${SUd.pd}**.`,
      ],
      v: vWorked,
      n: 'Here is the full working. Revenue receipts are one thousand nine hundred. Subtract them from revenue expenditure to get a revenue deficit of three hundred and fifty. Total expenditure is two thousand seven hundred; subtract revenue receipts and the two non-debt receipts to get a fiscal deficit of seven hundred, which matches borrowing exactly. That check catches most slips. Finally, remove interest to get a primary deficit of three hundred and twenty.',
    }),
    sl('example', 'Worked example 2: reading the deficits', {
      b: `Suryadesh has a GDP of ₹${inr(SU.gdp)} crore. What do its deficits tell us?`,
      bl: [
        `Step 1 — Fiscal deficit ÷ GDP = ${SUd.fd} ÷ ${inr(SU.gdp)} × 100 = **${SUfdPct}%** of GDP.`,
        `Step 2 — Revenue deficit ÷ fiscal deficit = ${SUd.rd} ÷ ${SUd.fd} × 100 = **${SUrdShare}%**: half the borrowing pays running costs.`,
        `Step 3 — Interest ÷ fiscal deficit = ${SU.int} ÷ ${SUd.fd} × 100 ≈ **${Math.round((100 * SU.int) / SUd.fd)}%**: most borrowing services old debt.`,
        'Step 4 — Conclusion: the deficit is moderate in size but poor in **quality**.',
      ],
      v: vReading,
      n: 'Numbers mean more when we compare them. Deficits are usually stated as a share of GDP; here the fiscal deficit is three point five per cent of GDP. Next, half of all borrowing covers the revenue deficit, so it buys no assets. And interest takes more than half of the borrowing. So the size is moderate, but the quality of the deficit is poor.',
    }),
    sl('check', 'Quick check: compute the fiscal deficit', {
      b: 'Total receipts include borrowings. What is the fiscal deficit?',
      chk: 'm_fd_calc',
      n: 'Watch out: once borrowing is counted, total receipts always equal total expenditure.',
    }),
    sl('diagram', 'Why a revenue deficit worries economists', {
      v: vRDimp,
      n: 'A revenue deficit means the government is borrowing, or selling assets, to pay salaries, interest and subsidies. Borrowed money spent this way creates no asset that earns income. The loans must still be repaid with interest, so future budgets carry larger interest bills, and the revenue deficit tends to grow. Selling assets to fill the gap can only be done for a while.',
    }),
    sl('diagram', 'Fiscal deficit and the risk of a debt trap', {
      v: vDebtTrap,
      n: 'A large and lasting fiscal deficit can feed on itself. Borrowing raises interest payments next year. Interest is revenue expenditure, so the deficit grows and still more borrowing is needed. This is called a debt trap. Other risks: if the central bank finances the deficit by creating money, prices may rise, and heavy government borrowing can leave less credit for private firms.',
    }),
    sl('two-column', 'Is a deficit always bad?', {
      cols: [
        '**Can help**\n\n- In a **slump**, extra spending raises demand, output and jobs.\n- Borrowing for **infrastructure** raises future output and revenue.',
        '**Can harm**\n\n- At **full employment**, it mainly raises prices.\n- Borrowing for **current spending** builds debt without assets.',
      ],
      v: vGoodBad,
      n: 'So is a deficit good or bad? It depends. In a slump, with idle workers and machines, a deficit can lift demand and output. Borrowing for roads, power and irrigation can pay for itself through higher output and revenue. But at full employment a deficit mostly raises prices, and borrowing for current spending only piles up debt. Economists judge both the size and the use of a deficit.',
    }),
    sl('concept', 'Reducing deficits', {
      b: 'Deficits can be reduced from both sides of the budget, and governments set themselves rules.',
      v: vReduce,
      n: 'How can deficits be reduced? On the receipts side, by widening the tax base and collecting taxes better. On the spending side, by targeting subsidies to those who need them and cutting waste. Disinvestment brings in non-debt capital receipts, but only once. India also passed the Fiscal Responsibility and Budget Management Act in 2003, which sets targets for deficits by law.',
    }),
    sl('check', 'Quick check: primary deficit', {
      b: 'Compute a primary deficit from the fiscal deficit and interest payments.',
      chk: 'num_pd',
      n: 'Primary deficit leaves out the cost of past borrowing. Subtract that cost from the fiscal deficit.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A budget is balanced, surplus or deficit depending on how receipts compare with expenditure. Revenue deficit is revenue expenditure minus revenue receipts and shows dissaving. Fiscal deficit is total expenditure minus receipts other than borrowing, and equals total borrowing. Primary deficit is fiscal deficit minus interest and shows borrowing for present needs.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '**Never** include borrowings in the receipts when computing the fiscal deficit; then **check** that fiscal deficit = borrowings.',
        'Write each formula before substituting: one mark is often for the formula.',
        'Primary deficit **zero** means all borrowing goes to interest; it does not mean no borrowing.',
        'For "implications", link each deficit to **debt, interest, inflation or assets**; one line of reasoning per point.',
        'Use "per cent of GDP" when comparing deficits across years.',
      ],
      n: 'A few final tips. The most common mistake is to include borrowings in the receipts for the fiscal deficit; leave them out, and then check that your answer equals borrowings. Write the formula first. Remember that a zero primary deficit still means borrowing, all of it for interest. And when asked about implications, link each deficit to debt, interest, inflation or assets.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Government Budget and the Economy — Notes',
  sections: [
    {
      h: '1. Meaning and components of a budget',
      t: 1,
      b: 'A **government budget** is an annual statement of the **estimated receipts and expenditure** of the government for a **financial year** (in India, 1 April to 31 March). The Union budget is placed before Parliament (the Constitution calls it the "annual financial statement"); each state places its own budget before its assembly.\n\n**Components:** (1) the **receipts budget**, showing where money comes from; (2) the **expenditure budget**, showing where it goes. Both are split into **revenue** and **capital** parts.',
      terms: [
        ['Government budget', 'Annual statement of the estimated receipts and expenditure of the government for the coming financial year.'],
        ['Financial year', 'In India, the twelve months from 1 April to 31 March.'],
      ],
      v: vBudgetIs,
      vs: [vTwoParts],
    },
    {
      h: '2. Objectives of a government budget',
      t: 1,
      b: '1. **Reallocation of resources:** taxes on harmful goods and subsidies on useful ones shift production; **public goods** (non-excludable, non-rival, e.g. defence, street lights) are supplied by the government because free riders make private supply unprofitable.\n2. **Redistribution of income:** progressive taxes plus transfers and free services (food, schooling, health, pensions) narrow inequality.\n3. **Economic stability:** raise spending or cut taxes in a slump; cut spending or raise taxes in an inflationary boom.\n4. **Managing public enterprises:** public ownership of natural monopolies (railways, power lines) keeps essential services affordable and prevents concentration of economic power.',
      terms: [
        ['Public good', 'A good from whose benefit no one can be excluded and whose use by one person does not reduce its availability to others.'],
        ['Free rider', 'A person who enjoys a good without paying for it.'],
        ['Progressive tax', 'A tax whose rate rises as income rises.'],
      ],
      v: vPublicGoods,
      vs: [vRedis, vStability],
    },
    {
      h: '3. Budget receipts',
      t: 2,
      b: '**Revenue receipts** neither create a liability nor reduce assets.\n- **Tax revenue:** **direct** taxes (personal income tax, corporation tax): impact and incidence on the same person, cannot be shifted. **Indirect** taxes (GST, introduced in 2017; customs duties): shifted to buyers through prices.\n- **Non-tax revenue:** interest receipts, dividends and profits of public enterprises, fees, fines and penalties, grants received.\n\n**Capital receipts** create a liability or reduce assets.\n- **Borrowings** (debt-creating): from the public, banks, the central bank, abroad.\n- **Non-debt capital receipts:** recovery of loans, disinvestment.',
      terms: [
        ['Revenue receipts', 'Receipts that neither create a liability nor reduce the assets of the government.'],
        ['Capital receipts', 'Receipts that create a liability or reduce the assets of the government.'],
        ['Direct tax', 'A tax whose burden falls on the person on whom it is levied and cannot be shifted.'],
        ['Indirect tax', 'A tax on goods and services whose burden can be shifted to buyers.'],
        ['Disinvestment', 'Sale of part or all of the government\'s shares in a public enterprise.'],
      ],
      v: vReceiptsTree,
      vs: [vTaxes, vNonTax, vCapReceipts],
    },
    {
      h: '4. Budget expenditure',
      t: 2,
      b: '**Revenue expenditure** neither creates an asset nor reduces a liability: salaries, pensions, **interest payments**, subsidies, running costs, and **grants to state governments** (for the Centre, even if the states build assets with them).\n\n**Capital expenditure** creates an asset or reduces a liability: roads, dams, buildings, machinery, purchase of shares, **loans given** to states and others, **repayment of loans**.\n\nRevenue expenditure keeps the government running; capital expenditure adds to the productive capacity of the economy.',
      terms: [
        ['Revenue expenditure', 'Expenditure that neither creates an asset nor reduces a liability of the government.'],
        ['Capital expenditure', 'Expenditure that creates an asset or reduces a liability of the government.'],
      ],
      v: vExpTree,
      vs: [vWE2],
    },
    {
      h: '5. Balanced, surplus and deficit budgets',
      t: 3,
      b: '- **Balanced:** estimated receipts = estimated expenditure.\n- **Surplus:** receipts > expenditure; reduces aggregate demand, suits **inflation**.\n- **Deficit:** expenditure > receipts; raises aggregate demand, suits a **slump**, and is common in developing economies that spend on development.',
      terms: [
        ['Balanced budget', 'A budget in which estimated receipts equal estimated expenditure.'],
        ['Deficit budget', 'A budget in which estimated expenditure exceeds estimated receipts.'],
      ],
      v: vBudgetTypes,
      vs: [vWhich],
    },
    {
      h: '6. Measures of deficit and their implications',
      t: 3,
      b: '1. **Revenue deficit** = revenue expenditure − revenue receipts. Shows **dissaving**: borrowing or selling assets to meet current spending. Implications: debt without assets, rising interest, pressure to cut capital spending.\n2. **Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts) = **borrowings**. Implications: debt and interest burden, a possible **debt trap**, inflation if financed by new money from the central bank, less credit for private firms. It can help in a slump or when it finances assets.\n3. **Primary deficit** = fiscal deficit − interest payments. Shows borrowing for **present** needs; if it is zero, all borrowing goes to interest on past debt.\n\nDeficits are compared across years as a **per cent of GDP**. Ways to reduce them: wider tax base and better collection, better-targeted subsidies and less waste, disinvestment (one-time), and legal targets (Fiscal Responsibility and Budget Management Act, 2003).',
      terms: [
        ['Revenue deficit', 'Excess of revenue expenditure over revenue receipts.'],
        ['Fiscal deficit', 'Excess of total expenditure over total receipts excluding borrowings; equal to the borrowing requirement.'],
        ['Primary deficit', 'Fiscal deficit minus interest payments.'],
        ['Debt trap', 'A situation where a government borrows to pay interest on past loans, so its debt keeps growing.'],
      ],
      v: vSummary2,
      vs: [vRD, vFD, vPD, vDebtTrap],
    },
  ],
  tips: '**Common mistakes**\n- Including borrowings among receipts for the fiscal deficit. Leave them out; then check fiscal deficit = borrowings.\n- Calling interest received a capital receipt (it is revenue), or loan recovery a revenue receipt (it is capital).\n- Calling grants to states capital expenditure in the central budget (they are revenue expenditure).\n- Calling GST a direct tax: its burden is shifted, so it is indirect.\n- Saying a zero primary deficit means no borrowing: it means all borrowing pays interest.\n- Teaching plan and non-plan expenditure: this classification is no longer used.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or value.\n- 3-mark numericals: one mark per deficit, usually for formula plus correct value.\n- Classification questions: the class alone gets little; the reason earns the mark.\n- 5 marks: five distinct points; for "evaluate", give both sides and a conclusion.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Government budget**', 'Annual statement of **estimated** receipts and expenditure for the coming financial year.', 'definition', 1],
  ['India\'s financial year', '**1 April to 31 March**.', 'fact', 1],
  ['Four objectives of a budget', 'Reallocation of resources; redistribution of income; economic stability; managing public enterprises.', 'concept', 1],
  ['**Public good**: two features', '**Non-excludable** and **non-rival** (e.g. defence, street lights).', 'definition', 1],
  ['Why the market under-supplies public goods', '**Free riders**: non-payers cannot be excluded, so firms cannot charge enough.', 'concept', 1],
  ['Budget tool for **redistribution**', 'Progressive taxes plus transfers: subsidised food, free schooling, pensions.', 'example', 1],
  ['Budget in a **slump**', 'Raise spending or cut taxes: aggregate demand rises.', 'concept', 1],
  ['**Revenue receipts**', 'Neither create a liability nor reduce assets: taxes and non-tax revenue.', 'definition', 2],
  ['**Capital receipts**', 'Create a liability (borrowing) or reduce assets (recovery of loans, disinvestment).', 'definition', 2],
  ['**Non-debt** capital receipts', '**Recovery of loans** and **disinvestment**.', 'fact', 2],
  ['**Direct tax**', 'Impact and incidence on the **same person**; cannot be shifted. E.g. income tax, corporation tax.', 'definition', 2],
  ['**Indirect tax**', 'On goods and services; **shifted** to buyers. E.g. GST, customs duty.', 'definition', 2],
  ['GST: year and type', 'Introduced in **2017**; an **indirect** tax.', 'fact', 2],
  ['Four kinds of **non-tax** revenue', 'Interest receipts, dividends and profits, fees, fines (also grants received).', 'concept', 2],
  ['Interest **received** vs loan **recovered**', 'Interest received = **revenue** receipt; loan recovered = **capital** receipt.', 'exam-tip', 2],
  ['**Revenue expenditure**', 'Neither creates an asset nor reduces a liability: salaries, pensions, interest, subsidies.', 'definition', 2],
  ['**Capital expenditure**', 'Creates an asset or reduces a liability: roads, dams, shares, loans given, loan repayment.', 'definition', 2],
  ['Grants by the Centre to states', '**Revenue expenditure** for the Centre (no asset for the Centre).', 'exam-tip', 2],
  ['Repayment of a loan by the government', '**Capital expenditure**: it reduces a liability.', 'example', 2],
  ['**Balanced / surplus / deficit** budget', 'Receipts = / > / < expenditure.', 'definition', 3],
  ['Budget suited to **inflation**', 'A **surplus** budget: it reduces aggregate demand.', 'concept', 3],
  ['**Revenue deficit** formula', 'Revenue expenditure − revenue receipts.', 'formula', 3],
  ['**Fiscal deficit** formula', 'Total expenditure − total receipts **excluding borrowings** (= borrowing).', 'formula', 3],
  ['**Primary deficit** formula', 'Fiscal deficit − interest payments.', 'formula', 3],
  ['Fiscal deficit 900, interest 340', 'Primary deficit = **560**.', 'example', 3],
  ['Primary deficit is **zero**', 'All borrowing goes to pay **interest** on past debt.', 'concept', 3],
  ['Revenue deficit indicates', '**Dissaving**: borrowing to pay for current consumption.', 'concept', 3],
  ['**Debt trap**', 'Borrowing to pay interest → more interest → more borrowing.', 'definition', 3],
  ['When can a fiscal deficit help?', 'In a **slump**, or when it pays for **productive assets**.', 'concept', 3],
  ['Law setting deficit targets in India', 'The **Fiscal Responsibility and Budget Management (FRBM) Act, 2003**.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Government Budget and the Economy',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_realloc', 'm_cap_receipt', 'm_fd_meaning', 'ar_fd_borrow'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_rev_cap_receipt', 's_fd_implications', 's3_compute'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_objectives', 'l_deficits'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the extract and answer all parts. Part (c) has an internal choice.', items: ['cb_classify'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Government Budget and the Economy',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_redistribution', 'm_public_goods', 'm_direct_tax', 'm_rev_exp', 'm_repay', 'm_grants_states', 'm_pd_zero', 'm_surplus_when', 'ar_grants', 'ar_rd_concern'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_public_goods', 's_direct_indirect', { attempt: 1, keys: ['s_rd_vs_fd', 's_three_budgets'] }, 's3_classify', { attempt: 1, keys: ['s3_stabilisation', 's3_fd_reduce'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_compute', { attempt: 1, keys: ['l_receipts', 'l_fd_harmful'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each table or passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_budget', 'cb_canal'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-economics-ch04 only (budget meaning, objectives and components; classification of receipts and expenditure; balanced, surplus and deficit budgets and measures of deficit); plan/non-plan expenditure not taught',
    originality: 'every scenario, table and passage written for this chapter (imagined governments Suryadesh, Kaveripur, Narmadapur, states Malwa, Sahyagiri, Godavaripur); no NCERT exercise, boxed example or board/sample-paper item reused',
    data: `all deficit figures computed by the build from the budget items (Suryadesh: RD ${SUd.rd}, FD ${SUd.fd} = borrowing, PD ${SUd.pd}, FD ${SUfdPct} per cent of GDP; Kaveripur RD 1,000, FD 2,500 = borrowing, PD 900; Narmadapur FD 800 then 700)`,
    facts: 'financial year April to March; GST introduced 2017; FRBM Act 2003; grants to states are revenue expenditure for the Centre; no actual Union Budget figures stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
