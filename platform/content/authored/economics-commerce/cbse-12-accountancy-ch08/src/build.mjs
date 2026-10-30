// Build CBSE 12 Accountancy ch08 Financial Statements of a Company. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch08', 'economics-commerce');
const { fig, rs, rupees, sum, check, classOf, formatRows, scheduleIII, shareCapitalNote, statementPL, PL_HEADS, PL_CLASSIFY, PPE_GROUP_NAME, CLASSIFY } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (t, alt, caption) => table(t.headers, t.rows, alt, caption);

// ---------------------------------------------------------------- worked example 1: Kaveri Paints Ltd (imagined, Hosur)
const KP = { assets: 4800000, ncl: 1200000, cl: 850000, sc: 2000000 };
const KP_SF = KP.assets - KP.ncl - KP.cl;
const KP_RS = KP_SF - KP.sc;
check(KP_SF === 2750000 && KP_RS === 750000 && KP_SF + KP.ncl + KP.cl === KP.assets, 'Kaveri Paints');

// ---------------------------------------------------------------- worked example 2: a term loan split at twelve months
const LN = { total: 800000, n: 4, months: [6, 18, 30, 42], due: ['30 Sep 2026', '30 Sep 2027', '30 Sep 2028', '30 Sep 2029'] };
const LN_inst = LN.total / LN.n;
const LN_cur = LN.months.filter((m) => m <= 12).length * LN_inst;
const LN_long = LN.total - LN_cur;
check(Number.isInteger(LN_inst) && LN_cur === 200000 && LN_long === 600000 && LN_inst * LN.n === LN.total, 'loan split');
check(classOf('Current maturities of long-term borrowings').sub === 'Short-term Borrowings' && classOf('Long-term loan from a bank').sub === 'Long-term Borrowings', 'loan classification');

// ---------------------------------------------------------------- worked example 3: Tapti Textiles Ltd (imagined, Surat)
const TT = shareCapitalNote({ fv: 10, authorised: 200000, issued: 150000, full: 138000, part: { n: 2000, called: 10 }, arrears: 6000 });
const TT_BS = scheduleIII({ date: '31 March 2026', shareCapital: TT, items: [], only: 'el' });
check(TT.amount === 1394000 && TT.called === 1400000 && 2000 * 3 === 6000, 'Tapti Textiles');

// ---------------------------------------------------------------- worked example 4: Godavari Ceramics Ltd (imagined, Rajahmundry)
const GC_SC = shareCapitalNote({ fv: 10, authorised: 100000, issued: 50000, full: 50000 });
const GC_ITEMS = [
  ['General reserve', 80000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 60000], ['10% Debentures', 200000, 'Debentures'],
  ['Trade creditors', 75000], ['Bills payable', 25000], ['Unpaid dividend', 5000], ['Interest accrued on debentures', 10000], ['Provision for tax', 30000],
  ['Land and buildings', 400000], ['Plant and machinery', 250000], ['Accumulated depreciation', 50000], ['Patents', 40000], ['Long-term investments', 60000],
  ['Raw materials', 45000], ['Finished goods', 55000], ['Loose tools', 10000], ['Trade debtors', 70000], ['Bills receivable', 18000], ['Provision for doubtful debts', 3000],
  ['Cash at bank', 77000], ['Cash in hand', 8000], ['Prepaid insurance', 5000],
];
const GC = scheduleIII({ date: '31 March 2026', shareCapital: GC_SC, items: GC_ITEMS });
check(GC.total === 985000 && GC.subTotal.ppe === 600000 && GC.subTotal.tr === 85000, 'Godavari Ceramics');
const GC_CL = GC.headTotal.cl;
check(GC_CL === 145000, 'Godavari current liabilities');

// ---------------------------------------------------------------- worked example 5: Sabari Spices Ltd (imagined, Kochi)
const SS = statementPL({
  year: '31 March 2026', taxRate: 30,
  items: [['Sale of products', 2400000], ['Sale of services', 100000], ['Interest received on investments', 40000], ['Profit on sale of machinery', 20000], ['Salaries and wages', 420000], ['Contribution to provident fund', 30000], ['Interest on debentures', 60000], ['Interest on bank overdraft', 10000], ['Depreciation', 120000], ['Rent', 90000], ['Power and fuel', 110000], ['Advertisement', 50000]],
  materials: { opening: 120000, purchases: 1100000, closing: 140000 },
  inventories: { opening: [['finished goods', 200000]], closing: [['finished goods', 160000]] },
});
check(SS.tot.rev === 2500000 && SS.tot.com === 1080000 && SS.tot.chg === 40000 && SS.totalExp === 2010000 && SS.pbt === 550000 && SS.tax === 165000 && SS.pat === 385000, 'Sabari Spices');
const SS_LINK = { open: 115000, transfer: 100000 };
const SS_CLOSE = SS_LINK.open + SS.pat - SS_LINK.transfer;
check(SS_CLOSE === 400000, 'Sabari surplus');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Meaning and components', 'Nature', 'Objectives and users', 'Limitations', 'Schedule III balance sheet', 'Current or non-current'], 'Route map of Part 1: meaning and components, nature, objectives and users, limitations, the Schedule Three balance sheet, and the current or non-current test', 'Part 1 at a glance');
const vComponents = table(
  ['Financial statement', 'What it shows'],
  [
    ['Balance Sheet', 'Financial position on a date: assets, and the equity and liabilities that finance them'],
    ['Statement of Profit and Loss', 'Income, expenses and the profit or loss for a period'],
    ['Cash Flow Statement', 'Cash coming in and going out during the period'],
    ['Statement of Changes in Equity (if applicable)', 'How the owners’ equity moved during the period'],
    ['Notes to accounts', 'The details, policies and break-ups behind the figures'],
  ],
  'Table of the financial statements of a company: the balance sheet shows position on a date, the statement of profit and loss shows the result of a period, the cash flow statement shows cash in and out, the statement of changes in equity shows movements in equity where applicable, and the notes give details',
  'Section 2(40), Companies Act, 2013; form as per Schedule III (Section 129).',
);
const vNature = table(
  ['Element', 'What it means', 'An example'],
  [
    ['Recorded facts', 'Only transactions entered in the books, at their recorded amounts', 'Machinery shown at what was paid for it'],
    ['Accounting conventions', 'Agreed rules of presentation', 'Conservatism: provide for a likely bad debt'],
    ['Postulates (assumptions)', 'Basic assumptions behind the accounts', 'Going concern: the company will keep working'],
    ['Personal judgements', 'Choices and estimates by the accountant', 'Useful life of a machine; method of valuing stock'],
  ],
  'Table of the nature of financial statements: recorded facts, accounting conventions, postulates or assumptions, and personal judgements, each with an example',
);
const vObjectives = table(
  ['Objective', 'Users can then…'],
  [
    ['Show economic resources and obligations', 'judge financial strength and solvency'],
    ['Report earning capacity (profit or loss)', 'compare performance across years and firms'],
    ['Give information about cash flows', 'judge the ability to pay its way'],
    ['Show how management used resources', 'assess stewardship and efficiency'],
    ['Disclose accounting policies', 'read and compare the figures correctly'],
  ],
  'Table of objectives of financial statements: show resources and obligations, report earning capacity, give cash flow information, show the effectiveness of management and disclose accounting policies',
);
const vUsers = table(
  ['User', 'Main question', 'Looks mainly at'],
  [
    ['Shareholders and investors', 'Is it profitable and is my money safe?', 'Profit for the year, reserves, dividend record'],
    ['Trade creditors', 'Will I be paid in a few months?', 'Current assets against current liabilities'],
    ['Banks and debenture holders', 'Will interest and principal be paid?', 'Borrowings, finance costs, profit before interest'],
    ['Management', 'Did we meet our plans?', 'Every head, compared with budgets'],
    ['Employees', 'Is a fair bonus and job security possible?', 'Profit, employee benefits expense'],
    ['Government', 'How much tax? Is the law followed?', 'Profit before tax, disclosures'],
  ],
  'Table of users of financial statements, their main question and what they look at: shareholders, trade creditors, banks and debenture holders, management, employees and government',
);
const vWE1 = table(
  ['Kaveri Paints Ltd, 31 March 2026', '₹'],
  [
    ['Total assets (= total of Equity and Liabilities)', fig(KP.assets)],
    ['Less: Non-current liabilities', fig(KP.ncl)],
    ['Less: Current liabilities', fig(KP.cl)],
    ["**Shareholders' funds**", `**${fig(KP_SF)}**`],
    ['Less: Share capital', fig(KP.sc)],
    ['**Reserves and Surplus**', `**${fig(KP_RS)}**`],
  ],
  `Working for worked example 1: total assets ${fig(KP.assets)} less non-current liabilities ${fig(KP.ncl)} and current liabilities ${fig(KP.cl)} gives shareholders' funds of ${fig(KP_SF)}; less share capital ${fig(KP.sc)} gives reserves and surplus of ${fig(KP_RS)}`,
  'Equity and liabilities always equal total assets.',
);
const vImportance = flow('LR', ['Transactions recorded in the books', 'Financial statements (Schedule III)', 'Reading and analysis', 'Decisions: invest, lend, supply, tax, plan'], 'Flow from recorded transactions to financial statements, then to analysis and finally to decisions by investors, lenders, suppliers, government and management', 'The statements are the bridge between the books and the decisions');
const vLimits = table(
  ['Limitation', 'What it means for a reader'],
  [
    ['Historical', 'They report the past; the future must be judged separately'],
    ['Price-level changes ignored', 'Old assets stay at cost, so values look out of date'],
    ['Only money facts', 'Skill, morale and reputation are left out'],
    ['Personal judgement', 'Methods and estimates change the profit figure'],
    ['Not exact', 'True profit is known only when the business ends'],
    ['Window dressing possible', 'Figures can be made to look better on the date'],
  ],
  'Table of limitations of financial statements: historical, ignore price-level changes, only monetary facts, affected by personal judgement, not exact, and open to window dressing',
);
const vFormatEL = table(['Head (Equity and Liabilities)', 'Sub-heads'], formatRows('el'), "Format table of the Equity and Liabilities part of the Schedule Three balance sheet: shareholders' funds with share capital, reserves and surplus and money received against share warrants; share application money pending allotment as a head by itself; non-current liabilities with long-term borrowings, other long-term liabilities and long-term provisions; current liabilities with short-term borrowings, trade payables, other current liabilities and short-term provisions", 'Schedule III, Division I (deferred tax lines omitted at this level).');
const vFormatA = table(['Head (Assets)', 'Sub-heads'], formatRows('as'), 'Format table of the Assets part of the Schedule Three balance sheet: non-current assets with property, plant and equipment and intangible assets including capital work-in-progress, non-current investments, long-term loans and advances and other non-current assets; current assets with current investments, inventories, trade receivables, cash and cash equivalents, short-term loans and advances and other current assets', 'Schedule III, Division I (deferred tax assets and intangible assets under development omitted at this level).');
const vCycle = flow('LR', ['Cash', 'Raw materials bought', 'Work-in-progress', 'Finished goods', 'Trade receivables', 'Cash collected'], 'Flow of the operating cycle: cash buys raw materials, which become work-in-progress, then finished goods, then trade receivables when sold on credit, and finally cash again when customers pay', 'Operating cycle: from buying materials to collecting cash. Not identifiable? Take 12 months.');
const vTests = table(
  ['An ASSET is current if it is…', 'A LIABILITY is current if it is…'],
  [
    ['expected to be realised, sold or used up in the normal operating cycle', 'expected to be settled in the normal operating cycle'],
    ['held mainly for trading', 'held mainly for trading'],
    ['expected to be realised within 12 months after the balance sheet date', 'due to be settled within 12 months after the balance sheet date'],
    ['cash or a cash equivalent (not restricted)', 'one whose settlement the company cannot defer beyond 12 months'],
  ],
  'Table of the tests for current items under Schedule Three: an asset is current if realised in the operating cycle, held for trading, realised within twelve months, or is unrestricted cash; a liability is current if settled in the operating cycle, held for trading, due within twelve months, or cannot be deferred beyond twelve months',
  'Everything else is non-current.',
);
const vTimeline = (() => {
  const s = new Svg(600, 230);
  const X = (m) => 40 + (m * 520) / 48;
  s.rect(X(0), 34, X(12) - X(0), 116, { fill: 'fill', color: 'accent', sw: 1.2, rx: 4 });
  s.text((X(0) + X(12)) / 2, 48, 'Next 12 months: current', { size: 12, bold: true });
  s.arrow(X(0), 130, X(48) + 14, 130, { sw: 1.6 });
  ['31 Mar 2026', '31 Mar 2027', '31 Mar 2028', '31 Mar 2029', '31 Mar 2030'].forEach((d, i) => {
    s.line(X(12 * i), 125, X(12 * i), 135, { sw: 1.2 });
    s.text(X(12 * i), 150 + (i % 2) * 14, d, { size: 11, muted: true });
  });
  LN.months.forEach((m, i) => {
    s.dot(X(m), 130, 6, m <= 12 ? 'accent' : undefined);
    s.text(X(m), 112, `₹${fig(LN_inst)}`, { size: 12, bold: m <= 12 });
    s.text(X(m), 94, LN.due[i], { size: 11 });
  });
  s.text(300, 194, `₹${fig(LN_cur)} due within 12 months → Current Liabilities: Short-term Borrowings`, { size: 12 });
  s.text(300, 214, `₹${fig(LN_long)} due later → Non-current Liabilities: Long-term Borrowings`, { size: 12 });
  return s.visual(
    `Timeline from 31 March 2026 to 31 March 2030 with four loan instalments of ${fig(LN_inst)} each, due on 30 September of 2026, 2027, 2028 and 2029. Only the first lies in the shaded twelve-month band, so ${fig(LN_cur)} is current and ${fig(LN_long)} is long-term`,
    'Instalment positions are computed from the due dates.',
  );
})();
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Financial statements', 'Balance Sheet, Statement of Profit and Loss, Cash Flow Statement, Changes in Equity (if applicable), notes'],
    ['Nature', 'Recorded facts + conventions + postulates + personal judgements'],
    ['Users', 'Each user reads them for a different decision'],
    ['Limitations', 'Historical, ignore inflation, only money facts, judgement, not exact'],
    ['Balance sheet', "Equity and Liabilities = Shareholders' Funds + Non-current + Current Liabilities = Assets"],
    ['Current or not', 'Operating cycle first; else the 12-month rule'],
  ],
  'Summary table of Part 1: the list of financial statements, their nature, users, limitations, the structure of the balance sheet and the current or non-current test',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Share capital', 'Reserves and surplus', 'Liabilities', 'Assets', 'Notes and the balance sheet', 'Statement of Profit and Loss'], 'Route map of Part 2: share capital, reserves and surplus, classifying liabilities and assets, notes and the balance sheet, and the statement of profit and loss', 'Part 2 at a glance');
const vCapTerms = table(
  ['Term', 'Meaning'],
  [
    ['Authorised capital', 'The maximum capital the company may issue, as stated in its memorandum'],
    ['Issued capital', 'The part offered to the public or others for subscription'],
    ['Subscribed capital', 'The part actually taken up by subscribers'],
    ['Called-up capital', 'The part of subscribed capital that has been demanded'],
    ['Paid-up capital', 'Called-up capital less calls in arrears: the figure on the balance sheet'],
  ],
  'Table of share capital terms: authorised, issued, subscribed, called-up and paid-up capital, where paid-up equals called-up less calls in arrears',
  'Authorised and issued capital are shown in the note for information only.',
);
const vTaptiNote = table(TT_BS.notesHeaders, TT_BS.notesRows, `Note on share capital of Tapti Textiles: authorised and issued capital shown for information, subscribed capital ${fig(TT.called)} less calls in arrears ${fig(6000)} equals ${fig(TT.amount)}`, `Share Capital on the balance sheet: ${rs(TT.amount)}.`);
const vRS = table(
  ['Item under Reserves and Surplus', 'Shown as'],
  [
    ['Capital reserve', 'Added'],
    ['Securities premium', 'Added'],
    ['General reserve', 'Added'],
    ['Surplus: credit balance of the Statement of Profit and Loss', 'Added'],
    ['Debit balance of the Statement of Profit and Loss', 'Deducted, even if the total becomes negative'],
  ],
  'Table of the items under reserves and surplus: capital reserve, securities premium, general reserve and a credit balance of the statement of profit and loss are added; a debit balance is deducted even if the total turns negative',
);
const tricky = (items) => items.map((x) => { const c = classOf(x); return [x, c.head, c.subFull]; });
const vLiab = table(['Item', 'Major head', 'Sub-head'], tricky(['Calls in advance', 'Unpaid dividend', 'Interest accrued on debentures', 'Outstanding expenses', 'Provision for tax', 'Bank overdraft', 'Current maturities of long-term borrowings', 'Debentures', 'Provision for gratuity payable on retirement']), 'Classification table of liabilities: calls in advance, unpaid dividend, interest accrued on debentures and outstanding expenses are other current liabilities; provision for tax is a short-term provision; bank overdraft and current maturities of long-term borrowings are short-term borrowings; debentures are long-term borrowings; provision for gratuity is a long-term provision', 'From SOYL’s classification table; current maturities follow the 2021 amendment to Schedule III.');
const vAssets = table(['Item', 'Major head', 'Sub-head'], tricky(['Loose tools', 'Stores and spares', 'Capital work-in-progress', 'Computer software', 'Long-term investments', 'Capital advances', 'Marketable securities held for sale within a year', 'Cheques in hand', 'Advance to suppliers', 'Prepaid expenses']), 'Classification table of assets: loose tools and stores and spares are inventories; capital work-in-progress and computer software belong to the property, plant and equipment and intangible assets group; long-term investments and capital advances are non-current; marketable securities are current investments; cheques in hand are cash and cash equivalents; advance to suppliers is a short-term advance; prepaid expenses are other current assets');
const vNotesFlow = flow('LR', ['List of balances', 'Classify each item (sub-head)', 'Note for each sub-head with details', 'Note totals on the face of the balance sheet', 'Check: both parts total the same'], 'Flow for preparing a balance sheet: list the balances, classify each item to a sub-head, prepare a note with details for each sub-head, carry the note totals to the face of the balance sheet, and check that both parts total the same', 'Notes keep the face of the balance sheet short.');
const vGC = T(GC, `Balance sheet of Godavari Ceramics as at 31 March 2026 under Schedule Three, totalling ${fig(GC.total)} in both parts, with note numbers against the sub-heads`, `Equity and Liabilities = Assets = ${rs(GC.total)}.`);
const vGCNotes = table(GC.notesHeaders, GC.notesRows, 'Notes to accounts of Godavari Ceramics: share capital, reserves and surplus, trade payables, other current liabilities, property plant and equipment net of accumulated depreciation, inventories, trade receivables net of the provision, and cash and cash equivalents', 'Each note total is the figure on the face of the balance sheet.');
const vPLFormat = table(
  ['Line', 'What it contains'],
  [
    ['I. Revenue from Operations', 'Sale of products and services, other operating revenue (scrap)'],
    ['II. Other Income', 'Interest, dividends, rent from non-business property, profit on sale of fixed assets'],
    ['III. Total Income', 'I + II'],
    ['IV. Expenses', 'Seven heads: materials consumed; purchases of stock-in-trade; changes in inventories; employee benefits; finance costs; depreciation and amortisation; other expenses'],
    ['V. Profit before Tax', 'III − IV'],
    ['Tax and Profit for the Year', 'Profit before tax less tax expense'],
  ],
  'Format table of the statement of profit and loss: revenue from operations, other income, total income, seven expense heads, profit before tax, then tax and profit for the year',
  'The 2026–27 syllabus format.',
);
const plGroups = Object.keys(PL_HEADS).filter((k) => !['com', 'chg'].includes(k)).map((k) => [PL_HEADS[k], Object.entries(PL_CLASSIFY).filter(([, h]) => h === k).map(([i]) => i).slice(0, 4).join('; ')]);
const vPLHeads = table(
  ['Head', 'Typical items (SOYL classification table)'],
  [...plGroups, [PL_HEADS.com, 'Opening materials + purchases − closing materials'], [PL_HEADS.chg, 'Opening inventories − closing inventories']],
  'Table of statement of profit and loss heads with typical items: revenue from operations, other income, purchases of stock-in-trade, employee benefits such as salaries and provident fund, finance costs such as interest, depreciation and amortisation, and other expenses such as rent, power and advertisement; with formulas for materials consumed and change in inventories',
);
const vSS = T(SS, `Statement of profit and loss of Sabari Spices for the year ended 31 March 2026: total income ${fig(SS.totalIncome)}, total expenses ${fig(SS.totalExp)}, profit before tax ${fig(SS.pbt)}, tax ${fig(SS.tax)} and profit for the year ${fig(SS.pat)}`);
const vSSNotes = table(SS.notesHeaders, SS.notesRows, `Notes of Sabari Spices: revenue from operations, other income, cost of materials consumed ${fig(SS.tot.com)}, change in inventories ${fig(SS.tot.chg)}, employee benefits, finance costs and other expenses`);
const vLink = table(
  ['Surplus (balance in the Statement of Profit and Loss)', '₹'],
  [['Opening balance, 1 April 2025', fig(SS_LINK.open)], ['Add: Profit for the year', fig(SS.pat)], ['Less: Transfer to General Reserve', fig(-SS_LINK.transfer)], ['**Closing balance, 31 March 2026**', `**${fig(SS_CLOSE)}**`]],
  `Movement in surplus for Sabari Spices: opening ${fig(SS_LINK.open)} plus profit for the year ${fig(SS.pat)} less transfer to general reserve ${fig(SS_LINK.transfer)} gives a closing surplus of ${fig(SS_CLOSE)}, shown under reserves and surplus`,
  'The closing surplus goes into the Reserves and Surplus note of the balance sheet.',
);
const vSummary2 = table(
  ['Topic', 'Key rule'],
  [
    ['Share capital', 'Paid-up = called-up − calls in arrears; calls in advance are a current liability'],
    ['Reserves and Surplus', 'A debit balance of profit and loss is deducted here'],
    ['Liabilities', 'Long-term borrowings vs short-term borrowings; unpaid dividend and accrued interest are other current liabilities'],
    ['Assets', 'Loose tools are inventories; capital work-in-progress and intangibles sit with property, plant and equipment'],
    ['Notes', 'One note per sub-head with details; totals on the face'],
    ['Statement of Profit and Loss', 'Total income − seven expense heads = profit before tax'],
  ],
  'Summary table of Part 2: share capital and calls, reserves and surplus with a debit balance deducted, liabilities, assets, notes, and the statement of profit and loss',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Financial Statements of a Company — Part 1: Meaning, Uses, Limitations and the Balance Sheet Format',
  goals: [
    'Explain the meaning, nature and objectives of financial statements',
    'Describe how different users rely on them, and state their limitations',
    'Lay out the heads and sub-heads of the Schedule III balance sheet',
    'Use the operating cycle and the twelve-month rule to separate current and non-current items',
  ],
  slides: [
    sl('title', 'Financial Statements of a Company', {
      b: 'Part 1 — what financial statements are, who uses them, what they cannot tell you, and the **Schedule III** balance sheet.',
      v: vRoute1,
      n: 'At the end of every year a company must tell its owners, lenders and the government how it has done and where it stands. It does this through its financial statements. In this part we learn what they are, why they are prepared, who reads them, where they fall short, and how a company balance sheet is laid out under Schedule Three of the Companies Act.',
    }),
    sl('concept', 'What are financial statements?', {
      v: vComponents,
      bl: ['End products of the accounting process for a period.', 'Must give a **true and fair view** and follow **Schedule III** (Section 129).'],
      n: 'Financial statements are the final summaries produced by the accounting process. For a company the law lists them: the balance sheet, the statement of profit and loss, the cash flow statement, a statement of changes in equity where it applies, and the notes that explain them. Section one hundred twenty-nine says they must give a true and fair view in the form set out in Schedule Three.',
    }),
    sl('concept', 'Nature: facts, conventions and judgement', {
      v: vNature,
      n: 'Financial statements are not pure facts. They begin with recorded transactions, but they are arranged according to accounting conventions such as conservatism, and they rest on assumptions such as going concern. On top of that, the accountant makes judgements, for example the useful life of a machine. So the same business could show slightly different figures in different hands.',
    }),
    sl('check', 'Quick check: which statements?', {
      b: 'Think of the list in Section 2(40) of the Companies Act, 2013.',
      chk: 'tf_cfs',
      n: 'Recall the list of financial statements given in the Companies Act.',
    }),
    sl('concept', 'Objectives of financial statements', {
      v: vObjectives,
      n: 'Why prepare them at all? To show what the company owns and owes, to report how much it earned, to tell users about its cash flows, to show how well management has used the resources given to it, and to disclose the accounting policies behind the numbers, so that readers can compare one year or one company with another.',
    }),
    sl('two-column', 'Who uses them, and why', {
      cols: ['**Inside the company**\n\n- Management\n- Employees', '**Outside the company**\n\n- Shareholders and investors\n- Creditors, banks, debenture holders\n- Government and regulators'],
      v: vUsers,
      n: 'Different readers ask different questions. A shareholder wants profit and safety. A supplier wants to be paid within a few months. A bank or debenture holder wants interest and repayment over many years. Management compares results with plans, employees think about bonus and job security, and the government looks at tax and legal compliance.',
    }),
    sl('check', 'Quick check: match the users', {
      b: 'Match each user with what that user mainly looks for.',
      chk: 'mt_users',
      n: 'For each reader, ask: over what period does this person expect to get money back from the company?',
    }),
    sl('example', 'Worked example 1: the balance sheet equation', {
      b: `An imagined company, **Kaveri Paints Ltd**, Hosur, has total assets of ${rs(KP.assets)}, non-current liabilities of ${rs(KP.ncl)} and current liabilities of ${rs(KP.cl)}. Its share capital is ${rs(KP.sc)}. Find its shareholders' funds and its reserves and surplus.`,
      v: vWE1,
      n: `The two parts of a balance sheet always total the same. So shareholders' funds are total assets of ${rupees(KP.assets)}, less non-current liabilities and current liabilities, which leaves ${rupees(KP_SF)}. Take away the share capital of ${rupees(KP.sc)}, and reserves and surplus come to ${rupees(KP_RS)}.`,
    }),
    sl('concept', 'Why they matter', {
      v: vImportance,
      bl: ['They turn thousands of entries into a few pages that anyone can compare.', 'Audited statements build **trust** with investors and lenders.', 'They are the base for **analysis** (comparative, common-size statements, ratios, cash flow) in the next chapters.'],
      n: 'Financial statements are the bridge between the books and the decisions people take. They compress a whole year of entries into a few pages, they are audited and so trusted, and they are the raw material for the analysis you will learn next: comparative statements, common-size statements, ratios and the cash flow statement.',
    }),
    sl('concept', 'Limitations', {
      v: vLimits,
      n: 'Useful as they are, financial statements have limits. They describe the past. They ignore inflation, so old assets look cheap. They leave out anything that cannot be measured in money, such as the skill of the staff. They depend on judgement, they are not exact until the business closes, and figures can be dressed up for the balance sheet date.',
    }),
    sl('check', 'Quick check: spot the limitation', {
      b: 'Land bought twenty years ago is still shown at its cost.',
      chk: 'm_limit_price',
      n: 'Ask yourself what has happened to prices over twenty years, and whether the balance sheet shows it.',
    }),
    sl('concept', 'The Schedule III balance sheet: Equity and Liabilities', {
      v: vFormatEL,
      bl: ['Vertical form: **I. Equity and Liabilities**, then **II. Assets**.', 'Figures for the current and the previous year side by side, with a **Note No.** column.'],
      n: "Schedule Three sets out a vertical balance sheet. The first part, equity and liabilities, has shareholders' funds, which are share capital and reserves and surplus; share application money pending allotment as a head on its own; non-current liabilities such as long-term borrowings and long-term provisions; and current liabilities such as short-term borrowings, trade payables, other current liabilities and short-term provisions.",
    }),
    sl('concept', 'The Schedule III balance sheet: Assets', {
      v: vFormatA,
      n: 'The second part lists the assets. Non-current assets begin with property, plant and equipment and intangible assets, which also include capital work-in-progress; then non-current investments and long-term loans and advances. Current assets are current investments, inventories, trade receivables, cash and cash equivalents, short-term loans and advances, and other current assets.',
    }),
    sl('concept', 'The operating cycle', {
      v: vCycle,
      n: 'The operating cycle is the time a business takes to turn cash back into cash: it buys materials, makes goods, sells them on credit and finally collects the money. For a bakery the cycle may be a few days; for a whisky distiller it may be years. When a company cannot identify its cycle, it is taken as twelve months.',
    }),
    sl('concept', 'Current or non-current? The tests', {
      v: vTests,
      n: 'An asset is current if it will be realised or used up within the normal operating cycle, if it is held for trading, if it will be realised within twelve months of the balance sheet date, or if it is cash that can be freely used. Liabilities follow the same pattern. Anything that fails all these tests is non-current.',
    }),
    sl('example', 'Worked example 2: splitting a term loan', {
      b: `An imagined company owes a bank ${rs(LN.total)} on 31 March 2026, repayable in **${LN.n} equal instalments** on 30 September 2026, 2027, 2028 and 2029. How is it shown?`,
      bl: [`Instalment = ${fig(LN.total)} ÷ ${LN.n} = ${rs(LN_inst)}.`, `Due within 12 months: ${rs(LN_cur)} → **Short-term Borrowings** (current maturities).`, `Due later: ${rs(LN_long)} → **Long-term Borrowings**.`],
      v: vTimeline,
      n: `Each instalment is ${rupees(LN_inst)}. Only the one due on thirtieth September twenty twenty-six falls within twelve months of the balance sheet date, so ${rupees(LN_cur)} is shown under current liabilities as a current maturity, inside short-term borrowings. The remaining ${rupees(LN_long)} stays under long-term borrowings.`,
    }),
    sl('check', 'Quick check: no identifiable cycle', {
      b: 'Fill in the blank.',
      chk: 'fb_cycle',
      n: 'What period does Schedule Three assume when the operating cycle cannot be found?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: financial statements are the balance sheet, the statement of profit and loss, the cash flow statement, any statement of changes in equity, and the notes. They mix facts, conventions and judgement, serve many users, and have real limits. The balance sheet follows Schedule Three, and the operating cycle or the twelve-month rule decides what is current.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For "limitations" or "objectives", write **a heading plus one line** of explanation for each point.',
        'Name the **user and the decision**: "a bank judges long-term solvency before lending".',
        'Learn the **order** of heads and sub-heads; examiners give marks for the format.',
        'Current vs non-current: test the **operating cycle first**, then the twelve-month rule.',
        'A long-term loan is **split**: the instalment due within 12 months is current.',
      ],
      n: 'For theory answers, give each point a heading and a line of explanation. When you write about users, name the user and the decision. Learn the order of heads and sub-heads by heart, because the format carries marks. And when you classify, think of the operating cycle first, then the twelve-month rule, and remember to split a long-term loan.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Financial Statements of a Company — Part 2: Classifying Items, Notes, the Balance Sheet and the Statement of Profit and Loss',
  goals: [
    'Present share capital and reserves and surplus with notes to accounts',
    'Classify liabilities and assets under the correct major heads and sub-heads',
    'Prepare a balance sheet with notes from a list of balances',
    'Prepare a simple Statement of Profit and Loss with notes',
  ],
  slides: [
    sl('title', 'Preparing the statements', {
      b: 'Part 2 — **share capital**, **reserves and surplus**, the tricky items, **notes to accounts**, the **balance sheet** and the **Statement of Profit and Loss**.',
      v: vRoute2,
      n: 'In part one we learnt the shape of the balance sheet. Now we fill it in. We start with share capital and reserves, then the liabilities and assets that students most often misplace. Then we prepare a full balance sheet with notes for an imagined company, and finally a statement of profit and loss, and see how the profit flows into the balance sheet.',
    }),
    sl('concept', 'Share capital: from authorised to paid-up', {
      v: vCapTerms,
      n: 'Share capital is described in steps. Authorised capital is the ceiling in the memorandum. Issued capital is what the company offers. Subscribed capital is what people actually take up. Called-up capital is the part demanded so far. Subtract calls in arrears, the amounts not yet paid on calls, and you get paid-up capital, which is the figure on the face of the balance sheet.',
    }),
    sl('example', 'Worked example 3: the share capital note', {
      b: 'An imagined company, **Tapti Textiles Ltd**, Surat: authorised 2,00,000 equity shares of ₹10 each; issued 1,50,000; subscribed 1,40,000, all fully called up. A holder of 2,000 shares has not paid the final call of ₹3 per share.',
      bl: [`Calls in arrears = 2,000 × ₹3 = ${rs(6000)}.`, `Paid-up = ${fig(TT.called)} − ${fig(6000)} = **${rs(TT.amount)}**.`],
      v: vTaptiNote,
      n: `Authorised and issued capital are shown in the note for information only. All one lakh forty thousand subscribed shares are fully called up, giving ${rupees(TT.called)}. One shareholder with two thousand shares owes three rupees a share, so calls in arrears are ${rupees(6000)}. The share capital shown on the balance sheet is ${rupees(TT.amount)}.`,
    }),
    sl('concept', 'Reserves and Surplus', {
      v: vRS,
      bl: ['**Surplus** = balance in the Statement of Profit and Loss.', 'A **debit balance** is deducted here; it is never shown as an asset.'],
      n: 'Reserves and surplus collects capital reserve, securities premium, general reserve and the surplus, which is the balance left in the statement of profit and loss. If that balance is a loss, Schedule Three does not let you show it as an asset. You deduct it inside reserves and surplus, even if the total then becomes negative.',
    }),
    sl('check', 'Quick check: an accumulated loss', {
      b: 'Where does a debit balance of the Statement of Profit and Loss go?',
      chk: 'm_debit_pl',
      n: 'Remember that a loss is never an asset. Which head would have held the profit?',
    }),
    sl('concept', 'Liabilities: the items students misplace', {
      v: vLiab,
      n: 'Here are the liabilities that cause trouble. Calls in advance are owed back to shareholders until the call is made, so they are other current liabilities, as are unpaid dividend and interest accrued on debentures. Provision for tax is a short-term provision. A bank overdraft and the instalment of a long-term loan due within twelve months are short-term borrowings.',
    }),
    sl('concept', 'Assets: the items students misplace', {
      v: vAssets,
      n: 'On the assets side, loose tools and stores and spares go with inventories, not with machinery. A building under construction is capital work-in-progress. Software is intangible, though the computer it runs on is equipment. Securities bought to be sold within a year are current investments, and cheques in hand count as cash and cash equivalents.',
    }),
    sl('check', 'Quick check: four assets', {
      b: 'Match each asset with its sub-head.',
      chk: 'mt_assets',
      n: 'For each asset, ask whether it is physical, whether it will be used up soon, and whether it is as good as cash.',
    }),
    sl('concept', 'Notes to accounts', {
      v: vNotesFlow,
      bl: ['The **face** of the balance sheet shows only sub-head totals with a **Note No.**', 'Each **note** shows the items behind a total, including deductions such as accumulated depreciation, provision for doubtful debts and calls in arrears.'],
      n: 'Schedule Three keeps the face of the balance sheet short. Each sub-head shows one total and a note number, and the details go into notes to accounts. To prepare a balance sheet, classify every balance, build a note for each sub-head that has more than one item or a deduction, carry the totals to the face, and check that both parts agree.',
    }),
    sl('example', 'Worked example 4: Godavari Ceramics Ltd — the balance sheet', {
      b: 'An imagined company in Rajahmundry: 50,000 equity shares of ₹10 each fully paid (authorised 1,00,000) and the balances shown in the notes on the next slide. Prepare its balance sheet as at 31 March 2026.',
      v: vGC,
      n: `Every balance has been classified using the tests we learnt, and only the totals appear here. Shareholders' funds come first, then the debentures as long-term borrowings, then four kinds of current liabilities. On the assets side, property, plant and equipment is shown net of depreciation. Both parts total ${rupees(GC.total)}, so the balance sheet agrees.`,
    }),
    sl('example', 'Worked example 4 (continued): the notes', {
      b: 'Each note lists the items behind one sub-head; deductions are shown inside the note.',
      v: vGCNotes,
      bl: [`Property, plant and equipment: ${fig(400000)} + ${fig(250000)} − ${fig(50000)} = ${rs(GC.subTotal.ppe)}.`, `Trade receivables: ${fig(70000)} + ${fig(18000)} − ${fig(3000)} = ${rs(GC.subTotal.tr)}.`],
      n: `Look at how the notes work. Accumulated depreciation of ${rupees(50000)} is deducted inside the property, plant and equipment note. The provision for doubtful debts is deducted inside trade receivables. Loose tools join raw materials and finished goods in inventories. Each note total is exactly the figure on the face of the balance sheet.`,
    }),
    sl('check', 'Quick check: total the current liabilities', {
      b: 'Pick out only the current liabilities, then add.',
      chk: 'n_curr_liab',
      n: 'Leave out anything payable after many years, and anything that is an estimate for the long term.',
    }),
    sl('concept', 'The Statement of Profit and Loss', {
      v: vPLFormat,
      n: 'The statement of profit and loss starts with revenue from operations, the income from the main business, and adds other income such as interest and dividends. From total income it deducts seven expense heads, giving profit before tax. Tax expense is then deducted to give the profit for the year.',
    }),
    sl('concept', 'Which expense head?', {
      v: vPLHeads,
      n: 'Each expense belongs to one head. Salaries, wages and provident fund are employee benefits. Interest on any borrowing is a finance cost. Depreciation and amortisation have their own head. Rent, power, advertisement and audit fees are other expenses. A manufacturer works out materials consumed, and every company shows the change in its inventories of goods.',
    }),
    sl('example', 'Worked example 5: Sabari Spices Ltd — Statement of Profit and Loss', {
      b: `An imagined spice processor in Kochi, year ended 31 March 2026. Materials: opening ${rs(120000)}, purchases ${rs(1100000)}, closing ${rs(140000)}. Finished goods: opening ${rs(200000)}, closing ${rs(160000)}. Tax 30%.`,
      v: vSS,
      n: `Total income is ${rupees(SS.totalIncome)}. Expenses under the seven heads total ${rupees(SS.totalExp)}, so profit before tax is ${rupees(SS.pbt)}. Tax at thirty per cent is ${rupees(SS.tax)}, leaving a profit for the year of ${rupees(SS.pat)}.`,
    }),
    sl('example', 'Worked example 5 (continued): the notes', {
      b: 'Materials consumed and the change in inventories are worked out in notes.',
      bl: [`Materials consumed = ${fig(120000)} + ${fig(1100000)} − ${fig(140000)} = ${rs(SS.tot.com)}.`, `Change in inventories = ${fig(200000)} − ${fig(160000)} = ${rs(SS.tot.chg)} (a decrease, so an expense).`],
      v: vSSNotes,
      n: `Materials consumed are opening stock plus purchases less closing stock, which is ${rupees(SS.tot.com)}. Finished goods fell from ${rupees(200000)} to ${rupees(160000)}, so goods made earlier were sold this year, and the decrease of ${rupees(SS.tot.chg)} is added to expenses. If inventories had risen, the change would be negative.`,
    }),
    sl('check', 'Quick check: interest on an overdraft', {
      b: 'Fill in the head.',
      chk: 'fb_finance',
      n: 'Interest is the price of borrowed money. Which head collects every borrowing cost?',
    }),
    sl('concept', 'From profit to the balance sheet', {
      v: vLink,
      n: `The two statements are linked. Sabari Spices began the year with a surplus of ${rupees(SS_LINK.open)}. It adds the profit for the year of ${rupees(SS.pat)} and transfers ${rupees(SS_LINK.transfer)} to general reserve, leaving ${rupees(SS_CLOSE)}. That closing surplus appears under reserves and surplus in the balance sheet.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: paid-up capital is called-up capital less calls in arrears; calls in advance are a current liability. An accumulated loss is deducted within reserves and surplus. Classify each item with the operating cycle and the twelve-month rule, put the details in notes, and check both parts agree. In the statement of profit and loss, total income less seven expense heads gives profit before tax.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always give the **Note No.** column and a note for every sub-head with more than one item.',
        'Show **calls in arrears** inside the share capital note, never as an asset.',
        'Deduct **accumulated depreciation** and **provision for doubtful debts** inside their notes.',
        'Check that **both parts total**; a mismatch usually means one item is on the wrong side.',
        'In the Statement of Profit and Loss, a **rise in inventories** is a negative change.',
      ],
      n: 'In the exam, always include the note number column and a note for each sub-head with several items. Put calls in arrears inside the share capital note. Deduct depreciation and the provision for doubtful debts inside their notes. Check that both parts agree. And remember that a rise in inventories reduces the expenses.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Financial Statements of a Company — Notes',
  sections: [
    {
      h: '1. Meaning and nature of financial statements',
      t: 1,
      b: 'Financial statements are the **end products of the accounting process**: summaries prepared at the end of a period to show the **financial position** (balance sheet) and the **results** (statement of profit and loss) of an enterprise.\n\n**For a company (Section 2(40), Companies Act, 2013):** Balance Sheet; Statement of Profit and Loss; Cash Flow Statement; Statement of Changes in Equity, if applicable; explanatory notes. **Section 129:** they must give a true and fair view and comply with the Accounting Standards, in the form of **Schedule III** (Division I for companies following the Accounting Standards).\n\n**Nature:** a mixture of\n- **recorded facts** (amounts as entered in the books),\n- **accounting conventions** (conservatism, consistency, materiality),\n- **postulates** (going concern, money measurement, accounting period),\n- **personal judgements** (depreciation method and life, inventory valuation, provisions).',
      terms: [
        ['Financial statements', 'Summaries of the accounts of a period showing financial position and results.'],
        ['Schedule III', 'Schedule to the Companies Act, 2013 prescribing the form of the balance sheet and the statement of profit and loss.'],
        ['True and fair view', 'Statements free from material misstatement and prepared on accepted principles.'],
      ],
      v: vComponents,
      vs: [vNature],
    },
    {
      h: '2. Objectives, importance and users',
      t: 1,
      b: '**Objectives:** to show the economic resources and obligations of the business; to report its earning capacity; to give information on cash flows; to help judge the effectiveness of management; to disclose accounting policies and other information needed to understand the figures.\n\n**Importance to users:**\n- **Shareholders and investors:** profitability, growth, dividend, safety of capital.\n- **Trade creditors:** short-term liquidity (current assets against current liabilities).\n- **Banks, lenders, debenture holders:** long-term solvency, interest-paying capacity.\n- **Management:** planning, control, comparison with budgets.\n- **Employees:** bonus, wages, job security.\n- **Government and regulators:** taxation, compliance, economic policy.\n\n**Balance sheet equation:** Equity and Liabilities (Shareholders\' Funds + Non-current Liabilities + Current Liabilities) = Total Assets.',
      terms: [
        ['Short-term solvency', 'Ability to meet obligations falling due within a year out of current assets.'],
        ['Long-term solvency', 'Ability to pay interest and repay long-term debt.'],
      ],
      v: vUsers,
      vs: [vObjectives, vWE1],
    },
    {
      h: '3. Limitations of financial statements',
      t: 1,
      b: '- **Historical:** they record past events; future results must be estimated separately.\n- **Price-level changes ignored:** assets at historical cost; figures of different years are not comparable in real terms.\n- **Only monetary information:** qualitative factors (quality of management, labour relations, reputation) are left out.\n- **Personal judgement:** depreciation methods, inventory valuation and provisions affect the profit shown.\n- **Not exact:** profit of a period is provisional; the true profit is known only when the business closes.\n- **Window dressing:** the position on the balance sheet date can be presented more favourably than it really is.',
      terms: [
        ['Historical cost', 'The original price paid for an asset, the basis on which most assets are shown.'],
        ['Window dressing', 'Presenting the financial position on the balance sheet date better than it really is.'],
      ],
      v: vLimits,
    },
    {
      h: '4. The Schedule III balance sheet: heads and sub-heads',
      t: 2,
      b: '**Form:** vertical, with **I. Equity and Liabilities** and **II. Assets**, columns for Particulars, **Note No.**, and figures for the current and the previous reporting date.\n\n**Equity and Liabilities:** (1) Shareholders\' Funds: Share Capital, Reserves and Surplus, Money Received against Share Warrants; (2) Share Application Money Pending Allotment; (3) Non-current Liabilities: Long-term Borrowings, Other Long-term Liabilities, Long-term Provisions; (4) Current Liabilities: Short-term Borrowings, Trade Payables, Other Current Liabilities, Short-term Provisions.\n\n**Assets:** (1) Non-current Assets: (a) ' + PPE_GROUP_NAME + ' — (i) Property, Plant and Equipment, (ii) Intangible Assets, (iii) Capital Work-in-Progress; (b) Non-current Investments; (c) Long-term Loans and Advances; (d) Other Non-current Assets. (2) Current Assets: Current Investments, Inventories, Trade Receivables, Cash and Cash Equivalents, Short-term Loans and Advances, Other Current Assets.',
      terms: [
        ["Shareholders' funds", 'Share capital plus reserves and surplus (and money received against share warrants).'],
        ['Non-current liability', 'A liability not due for settlement within the operating cycle or twelve months.'],
        ['Notes to accounts', 'Schedules giving the details behind each total on the face of the statements.'],
      ],
      v: vFormatEL,
      vs: [vFormatA],
    },
    {
      h: '5. Classifying items: operating cycle, the twelve-month rule and tricky items',
      t: 2,
      b: '**Operating cycle:** the time between acquiring assets for processing and realising them in cash or cash equivalents. If it cannot be identified, it is **assumed to be twelve months**.\n\n**Current asset:** realised, sold or consumed in the normal operating cycle; held mainly for trading; realised within 12 months after the reporting date; or unrestricted cash or cash equivalent. **Current liability:** settled in the normal operating cycle; held for trading; due within 12 months; or settlement cannot be deferred beyond 12 months. All others are **non-current**.\n\n**Items to watch:**\n- Calls in advance, unpaid dividend, interest accrued on debentures, outstanding expenses, income received in advance → Other Current Liabilities.\n- Provision for tax → Short-term Provisions; provision for gratuity payable on retirement → Long-term Provisions.\n- Bank overdraft, cash credit, loans repayable on demand → Short-term Borrowings; the instalment of a long-term loan due within 12 months (current maturities) → Short-term Borrowings under the 2021 amendment (older books show it under Other Current Liabilities).\n- Loose tools, stores and spares → Inventories; capital work-in-progress → with property, plant and equipment; computer software, patents, trademarks, goodwill → Intangible Assets.\n- Calls in arrears → deducted in the share capital note; debit balance of the Statement of Profit and Loss → deducted in Reserves and Surplus.',
      terms: [
        ['Operating cycle', 'Time from acquiring assets for processing to realising them in cash; twelve months if not identifiable.'],
        ['Current maturities of long-term borrowings', 'Instalments of a long-term loan payable within twelve months of the balance sheet date.'],
        ['Calls in advance', 'Money received on shares before a call is made; a current liability until the call.'],
      ],
      v: vTests,
      vs: [vCycle, vTimeline, vLiab, vAssets],
    },
    {
      h: '6. Notes to accounts and preparing the balance sheet',
      t: 2,
      b: '**Steps:**\n1. Classify every balance under its major head and sub-head.\n2. Prepare a note for each sub-head that has more than one item or a deduction (and always for Share Capital).\n3. Carry each note total to the face of the balance sheet against its Note No.\n4. Total each part; the two totals must agree.\n\n**Share capital note:** authorised capital and issued capital (for information); subscribed and fully paid; subscribed but not fully paid (amount called up); **less calls in arrears**.\n\n**Paid-up capital = called-up capital − calls in arrears.**\n\nDeductions shown inside notes: accumulated depreciation (Property, Plant and Equipment), provision for doubtful debts (Trade Receivables), calls in arrears (Share Capital), debit balance of the Statement of Profit and Loss (Reserves and Surplus).',
      terms: [
        ['Paid-up capital', 'Called-up capital less calls in arrears.'],
        ['Subscribed capital', 'The part of issued capital actually taken up by investors.'],
      ],
      v: vGC,
      vs: [vGCNotes, vTaptiNote, vCapTerms],
    },
    {
      h: '7. The Statement of Profit and Loss',
      t: 2,
      b: '**Format (2026–27 syllabus):**\n- I. Revenue from Operations (sale of products, sale of services, other operating revenue such as scrap)\n- II. Other Income (interest, dividend, rent from non-business property, profit on sale of fixed assets)\n- III. **Total Income = I + II**\n- IV. Expenses: Cost of Materials Consumed; Purchases of Stock-in-Trade; Changes in Inventories of Finished Goods, Work-in-Progress and Stock-in-Trade; Employee Benefits Expense; Finance Costs; Depreciation and Amortisation Expense; Other Expenses\n- V. **Profit before Tax = III − IV**; less tax expense = **Profit for the Year**\n\n**Cost of materials consumed = opening materials + purchases − closing materials.**\n\n**Change in inventories = opening − closing** (a rise in inventories gives a negative figure).\n\nThe profit for the year is carried to the **surplus** under Reserves and Surplus. *Exceptional and extraordinary items and discontinued operations are not in the 2026–27 syllabus.*',
      terms: [
        ['Revenue from operations', 'Income from the main business activity of the company.'],
        ['Finance costs', 'Interest and other costs of borrowing.'],
        ['Stock-in-trade', 'Goods bought for resale without processing.'],
      ],
      v: vPLFormat,
      vs: [vPLHeads, vSS, vSSNotes, vLink],
    },
  ],
  tips: '**Common mistakes**\n- Showing **calls in advance** as share capital (it is an other current liability) or **calls in arrears** as an asset (it is deducted in the share capital note).\n- Showing a **debit balance of profit and loss** on the assets side instead of deducting it in Reserves and Surplus.\n- Putting **loose tools** with plant and machinery (they are inventories).\n- Showing the whole of a long-term loan as long-term: the instalment due within **12 months** is current.\n- Forgetting the **Note No.** column, or giving a total on the face without a note.\n- In the Statement of Profit and Loss, putting interest under other expenses (it is **Finance Costs**) or a gain on selling a machine under revenue from operations (it is **Other Income**).\n\n**How marks are usually awarded**\n- 1 mark: one classification, format line or concept.\n- 3 marks: three objectives or limitations; classifying six items at ½ mark each; a note to accounts.\n- 4 marks: classifying eight items at ½ mark each; one part of the balance sheet or a short Statement of Profit and Loss with notes.\n- 6 marks: a full balance sheet or Statement of Profit and Loss with notes (format, notes and totals carry separate marks).\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Financial statements of a company (Section 2(40))', 'Balance Sheet, Statement of Profit and Loss, Cash Flow Statement, Statement of Changes in Equity (if applicable), notes.', 'definition', 1],
  ['Section 129 requires…', 'A **true and fair view**, in the form of **Schedule III**.', 'fact', 1],
  ['Four elements of the nature of financial statements', 'Recorded facts, accounting conventions, postulates, personal judgements.', 'concept', 1],
  ['Example of personal judgement', 'Choosing the depreciation method or the useful life of a machine.', 'concept', 1],
  ['What a trade creditor looks for', '**Short-term solvency**: current assets against current liabilities.', 'concept', 1],
  ['What a debenture holder looks for', '**Long-term solvency** and ability to pay interest.', 'concept', 1],
  ['Why historical cost is a limitation', 'Price-level changes are ignored, so old assets look undervalued.', 'exam-tip', 1],
  ['A limitation about non-money factors', 'Skill, morale and reputation cannot be measured in money, so they are left out.', 'concept', 1],
  ['Balance sheet equation (Schedule III)', "Shareholders' Funds + Non-current Liabilities + Current Liabilities = Total Assets.", 'fact', 2],
  ["Sub-heads of Shareholders' Funds", 'Share Capital; Reserves and Surplus; Money Received against Share Warrants.', 'fact', 2],
  ['Sub-heads of Current Liabilities', 'Short-term Borrowings; Trade Payables; Other Current Liabilities; Short-term Provisions.', 'fact', 2],
  ['Operating cycle not identifiable', 'Assumed to be **twelve months**.', 'fact', 2],
  ['Paid-up capital', '**Called-up capital − calls in arrears.**', 'definition', 2],
  ['Calls in arrears', 'Deducted from called-up capital **in the share capital note**.', 'fact', 2],
  ['Calls in advance', 'Current Liabilities → **Other Current Liabilities**.', 'fact', 2],
  ['Unpaid dividend', 'Current Liabilities → **Other Current Liabilities**.', 'fact', 2],
  ['Provision for tax', 'Current Liabilities → **Short-term Provisions**.', 'fact', 2],
  ['Debit balance of the Statement of Profit and Loss', 'Deducted under **Reserves and Surplus** (may make it negative).', 'exam-tip', 2],
  ['Loose tools; stores and spares', 'Current Assets → **Inventories**.', 'fact', 2],
  ['Capital work-in-progress', 'Non-current Assets → ' + PPE_GROUP_NAME + ' → Capital Work-in-Progress.', 'fact', 2],
  ['Computer software vs computer hardware', 'Software: Intangible Assets. Hardware: Property, Plant and Equipment.', 'concept', 2],
  ['Instalment of a long-term loan due within 12 months', 'Current maturities → **Short-term Borrowings** (2021 amendment).', 'exam-tip', 2],
  ['Share application money pending allotment (not refundable)', 'A **separate head** in Equity and Liabilities.', 'fact', 2],
  ['Cheques in hand', 'Current Assets → **Cash and Cash Equivalents**.', 'fact', 2],
  ['Total Income', 'Revenue from Operations + Other Income.', 'fact', 2],
  ['Cost of materials consumed', 'Opening materials + purchases − closing materials.', 'fact', 2],
  ['Change in inventories', 'Opening − closing; a **rise** gives a negative figure.', 'exam-tip', 2],
  ['Interest on debentures or on an overdraft', '**Finance Costs.**', 'fact', 2],
  ['Profit on sale of a fixed asset', '**Other Income**, not revenue from operations.', 'concept', 2],
  ['Where the profit for the year goes', 'Added to the **surplus** under Reserves and Surplus.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Financial Statements of a Company',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fs_components', 'm_loose_tools', 'm_rev_ops', 'ar_calls_adv'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions.', items: ['s3_classify_a', 's3_objectives'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_el_side', 'l4_limitations'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show notes to accounts.', items: [{ attempt: 1, keys: ['l6_bs1', 'l6_pl1'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Financial Statements of a Company',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_user_creditor', 'm_calls_arrears', 'm_op_cycle', 'm_curr_mat', 'm_fin_cost', 'm_chg_inv', 'ar_bias', 'ar_debit_pl'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice.', items: ['s3_share_note', 's3_limitations', 's3_curr_mat', { attempt: 1, keys: ['s3_classify_b', 's3_pl_notes'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_classify_a', { attempt: 1, keys: ['l4_assets_side', 'l4_pl_simple'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18. Show notes to accounts.', items: ['l6_bs2', { attempt: 1, keys: ['l6_bs3', 'l6_pl2'] }] },
  ],
});

check(Object.keys(CLASSIFY).length >= 60, 'classification table size');
build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-12-accountancy-ch08 only (meaning, nature, objectives, uses, importance and limitations; Schedule III, Division I balance sheet heads and sub-heads, classification, notes to accounts and a simple Statement of Profit and Loss). Exceptional and extraordinary items and discontinued operations (removed for 2026-27) appear only as one "not in the syllabus" line in the notes',
    originality: 'every company, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every classification taken from one table in acc.mjs (${Object.keys(CLASSIFY).length} balance sheet items, ${Object.keys(PL_CLASSIFY).length} profit and loss items) and every figure computed and asserted: notes add up, share capital reconciles (called up less arrears), every balance sheet totals (Godavari ${fig(GC.total)}; ${FACTS.join('; ')}), the Statement of Profit and Loss re-adds (Sabari profit ${fig(SS.pat)})`,
    facts: 'Section 2(40) and Section 129 of the Companies Act, 2013; Schedule III Division I heads and sub-heads; current maturities of long-term borrowings under Short-term Borrowings (2021 amendment); operating cycle assumed to be twelve months when not identifiable',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
