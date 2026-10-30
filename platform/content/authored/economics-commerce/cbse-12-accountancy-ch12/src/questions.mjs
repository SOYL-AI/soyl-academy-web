// CBSE 12 Accountancy, ch12 Computerised Accounting (alternative to Part B) — question bank. Every firm and
// figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every spreadsheet formula shown is parsed and evaluated by the Sheet engine in acc.mjs (so the cell
// references and the results are checked); bank reconciliations reach the other book from independently
// summed books; depreciation and loan schedules assert every row; CAS vouchers are validated, posted and
// summarised into a trial balance and final accounts that must agree and balance. Keys and model answers
// are built from the computed values.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, code, check, round, pmt, Sheet, shiftFormula, brs, brsTable, cbSide, pbSide, slm, wdv, ddb, depTable, loan, loanTable, cas, tbTable, finalTables, num as shownNum } from './acc.mjs';

const FACTS = [];
/** Given amounts as a two-column table for a stem. */
const given = (items, head = 'Particulars') => md([head, '₹'], items.map(([l, v]) => [l, fig(v)]), [1]);

// ================================================================ the coding scheme used throughout the chapter
// Four digits: first = primary head (1 assets, 2 liabilities, 3 capital, 4 income, 5 expenses); second = group;
// last two = ledger in the group (00 = the group itself, so ledgers run 01–99 and gaps are left for new ones).
export const GROUPS = [
  [1100, 'Non-current assets'], [1200, 'Current assets'],
  [2100, 'Non-current liabilities'], [2200, 'Current liabilities'],
  [3100, 'Capital and drawings'],
  [4100, 'Revenue from operations'], [4200, 'Other income'],
  [5100, 'Direct expenses'], [5200, 'Indirect expenses'],
];
const groupOf = (c) => GROUPS.find(([g]) => Math.floor(c / 100) * 100 === g)[1];
check(GROUPS.every(([g]) => g % 100 === 0), 'group codes end in 00');

// ================================================================ t01 Overview of computerised accounting systems
Q('m_cas_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The owner of an imagined bakery chain, Godavari Bakes, asks what makes an accounting system "computerised". The best description is a system in which',
  opts: [
    'transactions are entered once through software into a database, and ledgers and statements are produced from it on demand',
    'the accountant keeps the journal by hand and types only the final accounts on a computer',
    'all vouchers are photographed and stored, but the books are still written by hand',
    'an auditor checks the books once a year with the help of a calculator',
  ],
  sol: 'What makes the system computerised is that recording, classifying and summarising all happen in software working on stored records. Using a computer only to type the final statements does not count.',
}));

Q('m_components', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At an imagined trading firm, Pranhita Agencies, Ms Savita Kulkarni enters the day’s vouchers and reads the reports the system produces. Among the components of a computerised accounting system, she belongs to',
  opts: ['people', 'procedure', 'hardware', 'software'],
  sol: 'The five components are procedure, data, people, hardware and software. Users such as accountants and data-entry staff are the people component. The procedure is the set of steps they follow.',
}));

Q('m_readymade', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Suvarnamukhi Kirana, an imagined neighbourhood grocery, records about thirty transactions a day, needs only standard ledgers, a trial balance and final accounts, and has a small budget and one part-time accountant. The most suitable accounting software for it is',
  opts: ['ready-to-use software', 'tailor-made software developed for it alone', 'customised software with special modules added', 'no software at all, since computerised accounting suits only companies'],
  sol: 'A small business with standard needs gains most from a package that costs little, can be installed at once and is easy to learn. Its lower secrecy and limited flexibility matter little at this size.',
}));

Q('m_tailormade', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined national railway catering corporation runs thousands of outlets with its own pricing, stock-transfer and reporting rules, and wants its accounting programs and records kept under close control. Which type of accounting software fits it best?',
  opts: ['Tailor-made software, developed specially for the corporation', 'Ready-to-use software bought off the shelf', 'Customised software adapted from a package', 'An electronic spreadsheet shared by all outlets'],
  sol: 'A very large organisation with unique processes and high secrecy needs justifies software built for it alone. Such software is costly and needs heavy training, but it matches every special requirement.',
}));

Q('m_limitation', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Before switching to computerised accounting, the partners of an imagined firm, Tawa Valley Traders, list possible drawbacks. Which item on their list is a genuine limitation of a computerised accounting system?',
  opts: [
    'Heavy cost of buying hardware and software and of training staff',
    'Reports cannot be produced until the year has ended',
    'The trial balance has to be balanced by hand every month',
    'Each ledger has to be totalled separately by the accountant',
  ],
  sol: 'Installation, training and upkeep cost money; staff may resist the change; and the system can fail or be misused. Reports are not delayed, and totalling and balancing are done by the software.',
}));

Q('tf_posting', tf({
  t: [1, 3], d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After entering each voucher in a computerised accounting system, the accountant of an imagined furniture shop, Saryu Interiors, must post it separately to every ledger account it affects.',
  sol: 'There is no separate posting step. The voucher is stored once, and every ledger, the trial balance and the statements are drawn from the stored records when they are asked for.',
}));

Q('tf_training', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Staff of an imagined steel plant will normally need more training to use tailor-made accounting software than the staff of a small shop need for ready-to-use software.',
  sol: 'Tailor-made software follows the plant’s own processes and has many special features, so users must be trained on it in depth; a ready-to-use package is simpler and widely known.',
}));

Q('fb_components', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The five components of a computerised accounting system are procedure, data, people, hardware and ___.',
  acc: [['software']],
  sol: 'Software is the set of programs that records, processes and reports the accounting records on the hardware.',
}));

Q('mt_software', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined consultancy, Ghatshila Business Advisers, is explaining software options to four clients. Match each option in column A with its description in column B.',
  pairs: [
    ['Ready-to-use software', 'Bought as a standard package; cheap and quick to install'],
    ['Customised software', 'A standard package modified for a user’s extra needs'],
    ['Tailor-made software', 'Built specially for one organisation’s own processes'],
    ['Electronic spreadsheet', 'Rows and columns of cells holding figures and formulas'],
  ],
  sol: 'The three software types differ in how far they are shaped to the user. A spreadsheet is a general tool, not accounting software as such.',
}));

Q('mt_stages', match({
  t: [1, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'A teacher at an imagined school in Hazaribagh compares manual and computerised accounting. Match each manual stage in column A with what happens in a computerised system in column B.',
  pairs: [
    ['Recording in the journal', 'Entering vouchers through a data-entry screen into the database'],
    ['Posting to the ledger', 'No separate step: ledgers are drawn from stored vouchers'],
    ['Preparing the trial balance', 'Generated by the software at any moment'],
    ['Closing the books at the year end', 'Year-end processing carries balances to the next year'],
  ],
  sol: 'In a computerised system only the first stage needs a person to act. Classification, summarising and closing are done by the program from the stored records.',
}));

Q('ar_speed', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Once vouchers are entered, a computerised accounting system can show an up-to-date trial balance at any moment.',
  r: 'The system stores each transaction once and builds ledgers and reports by processing the stored records whenever they are asked for.',
  sol: 'Both are true. Because nothing has to be posted or totalled by hand, the report is ready whenever it is called for, and R gives exactly that reason.',
}));

Q('ar_errors', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Because the software checks every voucher, accounts kept in a computerised system cannot contain any error.',
  r: 'The software refuses a voucher whose total debits differ from its total credits.',
  sol: 'R is true, but A is false. A voucher debited to the wrong ledger, a transaction left out, or a wrong amount entered on both sides passes every check. The system catches unequal entries, not wrong judgement.',
}));

Q('ar_customised', ar({
  t: 1, d: 3, c: 'understanding', key: 'c',
  a: 'Customised accounting software often suits a medium-sized business better than ready-to-use software.',
  r: 'Customised software is written from scratch for one organisation by programmers working only for it.',
  sol: 'A is true: modifying a standard package to fit extra needs such as branch accounts or stock rules suits a medium firm. R is false: software written from scratch for one organisation is tailor-made, not customised.',
}));

Q('s3_features', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Mr Harish Bhandari, who runs an imagined hardware wholesale business in Haldwani, still keeps his books by hand. Explain any three features of a computerised accounting system that would help his business.',
  model: '1. **Speed and real-time information:** each voucher is processed as it is entered, so balances, the trial balance and statements are available the same day instead of weeks later.\n2. **Accuracy and consistency:** the software applies the same rules every time, adds and balances accounts itself and refuses vouchers that do not balance, so arithmetical slips disappear.\n3. **Reports for decisions:** from one set of stored records it can produce debtors’ ageing, stock and cash-flow reports, helping him decide whom to chase for payment and what to reorder.\n4. *(Also accepted)* Storage of years of records in little space with quick search; easy expansion as transactions grow; legible records; security through passwords and backups.',
  sol: 'Name a feature and link it to the wholesaler’s needs in each point.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1], ['Third feature explained', 1]],
}));

Q('s3_limitations', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'The accountant of an imagined cooperative dairy in Anand is worried that moving to computerised accounting may create new problems. State and explain three limitations she could point out.',
  model: '1. **Cost of installation and upkeep:** computers, licences, backup devices and annual maintenance are expensive for a small cooperative, and staff must be trained.\n2. **Resistance and disruption:** experienced staff may fear the change or their jobs; work slows down while the old books and the new system run side by side.\n3. **Dependence on the system and on security:** a power or hardware failure, a virus or a lost password can stop work, and records can be altered or stolen if access is not controlled.\n4. *(Also accepted)* The program cannot judge unusual transactions or errors of principle; long hours at screens can affect health.',
  sol: 'Three distinct limitations, each with a line on why it matters.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1], ['Third limitation explained', 1]],
}));

Q('l4_manual_vs_cas', long({
  t: [1, 3], d: 2, c: 'understanding', marks: 4,
  stem: 'Distinguish between manual accounting and computerised accounting on any four bases, taking the example of an imagined textile shop in Erode that is changing over.',
  model: '| Basis | Manual accounting | Computerised accounting |\n|---|---|---|\n| Recording | Each transaction is written in a journal or subsidiary book by hand. | Each transaction is keyed in once as a voucher and saved in a database. |\n| Classification | Entries are posted to ledger accounts by hand, a second writing of the same figures. | No posting step: ledgers are drawn from the stored vouchers when needed. |\n| Summarising | Ledgers are balanced and a trial balance is drawn up by hand, usually at the month or year end. | The trial balance can be generated at any moment. |\n| Final accounts | Prepared by hand after adjustment entries; slow. | Produced by the software from grouped ledger balances as soon as adjustments are entered. |\n| *(Also accepted)* Errors | Arithmetical slips are common. | Totals are computed; unbalanced vouchers are refused. |',
  sol: 'Take one stage of the accounting process at a time and contrast the two systems on it.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1], ['Fourth basis', 1]],
}));

Q('l4_software_choice', long({
  t: 1, d: 3, c: 'evaluation', marks: 4,
  stem: 'Recommend, with reasons, the type of accounting software suitable for each of these imagined organisations: (a) Mohana Medicals, a single chemist shop in Mysuru; (b) Tunga Spices Ltd, a medium-sized exporter that needs its standard package to handle export invoices and foreign-currency debtors; (c) a state electricity board with its own tariff, billing and subsidy rules. Also state (d) one factor, besides cost, that each should weigh before buying.',
  model: '**(a) Mohana Medicals: ready-to-use software.** It has few transactions and standard needs; a low-cost package that is quick to install and easy to learn is enough, and the low secrecy of a widely sold package does not matter much.\n\n**(b) Tunga Spices Ltd: customised software.** Its needs are mostly standard, but export invoices and foreign-currency accounts require extra features, so a standard package modified for it gives a good fit at moderate cost.\n\n**(c) The electricity board: tailor-made software.** Its tariff and subsidy rules are unique, its volume is very large and its records need tight control; software developed for it alone is costly but is the only full fit.\n\n**(d) Factors besides cost:** the size of the organisation and growth expected; flexibility to add new features; ease of training staff; the level of secrecy needed for programs and records; whether data can be exported to other software; the reports available for management.',
  sol: 'Match the scale and the special needs of each organisation to the software type, then name a further factor in choosing.',
  scheme: [['(a) Ready-to-use with reason', 1], ['(b) Customised with reason', 1], ['(c) Tailor-made with reason', 1], ['(d) A relevant factor other than cost', 1]],
}));

Q('l6_cas_structure', long({
  t: 1, d: 3, c: 'understanding', marks: 6,
  stem: 'The finance committee of an imagined college trust in Dharwad is planning to computerise its accounts. Explain (a) the meaning of a computerised accounting system, (b) its five components and (c) how a transaction travels through the system from input to output.',
  model: '**(a) Meaning.** A computerised accounting system records business transactions through accounting software into a database and, by processing those stored records, produces ledgers, a trial balance, final accounts and other reports whenever required. It follows the same double-entry rules as manual accounting; only the tools change.\n\n**(b) Components.**\n1. **Procedure** — the laid-down sequence of steps for collecting, entering, checking and reporting transactions.\n2. **Data** — the transactions and master records (ledgers, groups, codes) that the system stores.\n3. **People** — the users, such as data-entry staff, accountants, managers and auditors.\n4. **Hardware** — computers, servers, printers, storage and network devices.\n5. **Software** — the accounting programs and the database that stores the records.\n\n**(c) Flow.** *Input:* a source document (receipt, bill, cheque counterfoil) is entered as a voucher with codes, date and amount. *Processing:* the software validates the voucher (debits equal credits, codes exist, date within the period), stores it and updates every affected account. *Output:* on request, it prints ledgers, the trial balance, the trading and profit and loss account, the balance sheet and management reports.',
  sol: 'Define the system, list and explain all five components, then trace one transaction through input, processing and output.',
  scheme: [['(a) Meaning', 1], ['(b) Five components explained', 2.5], ['(c) Input, processing and output traced', 2.5]],
}));

// ================================================================ t02 Electronic spreadsheets in accounting
// --- formulas and references
const NG = new Sheet({ A1: 'Nagavali Agencies (imagined): cash summary', A2: 'Opening cash', B2: 18500, A3: 'Cash sales', B3: 46200, A4: 'Commission received', B4: 3800, A5: 'Cash paid to suppliers', B5: 39700, A6: 'Closing cash', B6: '=SUM(B2:B4)-B5' });
const NG_v = NG.get('B6');
check(NG_v === 18500 + 46200 + 3800 - 39700, 'Nagavali closing cash');
Q('m_sum', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The accountant of Nagavali Agencies, an imagined firm in Srikakulam, keeps a cash summary in a spreadsheet:\n\n${NG.md(['A', 'B'], [2, 3, 4, 5, 6], 'formula')}\n\nWhat will cell B6 show?`,
  opts: [shownNum(NG_v), shownNum(NG_v + 39700), shownNum(NG_v - 18500), shownNum(NG_v + 2 * 39700)],
  sol: `The range B2 to B4 adds ${fig(18500)} + ${fig(46200)} + ${fig(3800)} = ${fig(18500 + 46200 + 3800)}; less B5 (${fig(39700)}) leaves ${fig(NG_v)}.`,
}));

const SG = new Sheet({ A3: 'Balance as per cash book', B3: 41500, A4: 'Add: cheques issued, not presented', B4: 26000, A5: 'Less: cheques deposited, not credited', B5: 80000, A6: 'Balance as per pass book', B6: '=B3+B4-B5', B7: '=IF(B6>=0,"Favourable","Overdraft")' });
const SG_v = SG.get('B6');
check(SG_v < 0 && SG.get('B7') === 'Overdraft', 'Sone overdraft');
Q('m_if', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In a reconciliation sheet of an imagined firm, Sone Valley Cement Traders, the accountant has entered:\n\n${SG.md(['A', 'B'], [3, 4, 5, 6, 7], 'formula')}\n\nWhat will cell B7 display?`,
  opts: ['Overdraft', 'Favourable', shownNum(SG_v), 'FALSE'],
  sol: `B6 = ${fig(41500)} + ${fig(26000)} − ${fig(80000)} = ${shownNum(SG_v)}, which is below zero, so the test B6 >= 0 fails and the IF function returns its third argument.`,
}));

const RC = { from: 'D4', f: '=B4*C4' };
const RC_to = shiftFormula(RC.f, 3, 0);
check(RC_to === '=B7*C7', 'copied formula');
const RC_sheet = new Sheet({ B4: 120, C4: 85, D4: RC.f, B7: 64, C7: 210, D7: RC_to });
check(RC_sheet.get('D7') === 64 * 210, 'copied formula value');
Q('m_relative', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `In a stock sheet of an imagined stationery wholesaler, Bhavani Paper House, cell D4 holds ${code(RC.f)} (quantity × rate). The formula is copied down to D7. What formula will D7 hold?`,
  opts: [code(RC_to), code(RC.f), code('=B7*C4'), code(shiftFormula(RC.f, 3, 2))],
  sol: `Both references are relative, so each moves three rows down with the formula and D7 multiplies the quantity and the rate in its own row.`,
}));

Q('fb_absolute', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A cell reference that stays the same when a formula is copied to other cells, such as a reference to a single interest-rate cell, is called an ___ reference.',
  acc: [['absolute']],
  sol: 'An absolute reference is locked by a dollar sign before the column letter and the row number (or replaced by a cell name), so copying does not shift it.',
}));

Q('ar_relative', ar({
  t: 2, d: 3, c: 'understanding', key: 'b',
  a: `Copying the formula ${code('=B4*C4')} from cell D4 to cell D5 gives ${code('=B5*C5')}.`,
  r: 'A spreadsheet recalculates every formula automatically whenever a figure it depends on is changed.',
  sol: 'Both are true. A holds because relative references move with the copied formula; R describes automatic recalculation, which is a different feature and does not explain A.',
}));

// --- VLOOKUP over the chart of accounts
const LK_ROWS = [[1202, 'Bank account', 'Current assets'], [2201, 'Trade payables', 'Current liabilities'], [4101, 'Sales', 'Revenue from operations'], [5202, 'Rent', 'Indirect expenses'], [5101, 'Purchases', 'Direct expenses']];
const LK = new Sheet({
  A1: 'Code', B1: 'Ledger', C1: 'Group',
  ...Object.fromEntries(LK_ROWS.flatMap(([c, l, g], i) => [[`A${i + 2}`, c], [`B${i + 2}`, l], [`C${i + 2}`, g]])),
  E2: 5202, F2: '=VLOOKUP(E2,A2:C6,3,FALSE)',
});
for (const [c, , g] of LK_ROWS) check(groupOf(c) === g, `lookup row ${c} follows the scheme`);
check(LK.get('F2') === 'Indirect expenses', 'Mahi lookup');
Q('m_vlookup', mcq({
  t: [2, 3], d: 3, c: 'application',
  stem: `An imagined firm, Mahananda Tea Traders, keeps its chart of accounts in a spreadsheet (columns A to C, rows 2 to 6) and enters a code in E2:\n\n${LK.md(['A', 'B', 'C', 'E', 'F'], [1, 2, 3, 4, 5, 6], 'formula')}\n\nWhat will F2 show?`,
  opts: ['Indirect expenses', 'Rent', '5202', 'Direct expenses'],
  sol: `The function looks for ${LK.get('E2')} in the first column of A2:C6 (exact match because of FALSE), finds it in row 5 and returns the third column of that row.`,
}));

Q('fb_pmt', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The spreadsheet function that returns the equal periodic instalment needed to repay a loan, given the rate per period, the number of periods and the amount borrowed, is ___.',
  acc: [['PMT', 'PMT()']],
  sol: 'PMT(rate, nper, pv) gives the instalment; it is negative for a positive loan amount, so the amount is usually entered as a negative figure or the result is shown with a minus sign.',
}));

Q('m_sln_fn', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'An imagined transport operator, Siang Valley Carriers, is preparing a depreciation sheet for its buses. Which function gives straight-line depreciation for one year from the cost, the salvage value and the useful life?',
  opts: ['SLN', 'PMT', 'VLOOKUP', 'ROUND'],
  sol: 'SLN(cost, salvage, life) returns (cost − salvage) ÷ life, the equal annual charge of the straight-line method.',
}));

// --- ROUND and formula results
const RI = new Sheet({ A1: 'Loan outstanding', B1: 175000, A2: 'Interest rate per year', B2: '9%', A3: 'Interest for one month', B3: '=ROUND(B1*B2/12,0)' });
const RI_v = RI.get('B3');
check(175000 * 0.09 / 12 === 1312.5 && RI_v === 1313, 'Zuari monthly interest rounds half up');
Q('n_formula', num({
  t: 2, d: 2, c: 'application', marks: 1, value: RI_v, unit: '₹',
  stem: `An imagined fishing cooperative, Zuari Fisheries, works out monthly interest in a spreadsheet:\n\n${RI.md(['A', 'B'], [1, 2, 3], 'formula')}\n\nWhat value will B3 show?`,
  sol: `${fig(175000)} × 9% ÷ 12 = 1,312.5; ROUND to 0 decimal places rounds a half upward (away from zero), so B3 shows ${fig(RI_v)}.`,
}));

// --- ratio analysis in a spreadsheet
const PR = new Sheet({ A1: 'Current assets', B1: 385000, A2: 'Current liabilities', B2: 165000, A3: 'Current ratio', B3: '=ROUND(B1/B2,2)' });
const PR_v = PR.get('B3');
check(PR_v === 2.33, 'Periyar current ratio');
Q('n_ratio', num({
  t: 2, d: 2, c: 'application', marks: 2, value: PR_v, unit: ': 1', tol: 0.005,
  stem: `For an imagined spice exporter, Periyar Spice Traders, the ratio sheet holds:\n\n${PR.md(['A', 'B'], [1, 2, 3], 'formula')}\n\nWhat number will B3 display? (Write it as a number, for example 1.5.)`,
  sol: `${fig(385000)} ÷ ${fig(165000)} = 2.3333…; ROUND to two decimal places gives ${PR_v}, a current ratio of ${PR_v} : 1.`,
  scheme: [['Division of current assets by current liabilities', 1], [`Rounded to ${PR_v}`, 1]],
}));

const KR = { ca: 540000, inv: 210000, prepaid: 18000, cl: 240000, rev: 2400000, gp: 600000, debt: 450000, equity: 900000 };
const KR_S = new Sheet({
  A1: 'Current assets', B1: KR.ca, A2: 'Inventories', B2: KR.inv, A3: 'Prepaid expenses', B3: KR.prepaid, A4: 'Current liabilities', B4: KR.cl,
  A5: 'Revenue from operations', B5: KR.rev, A6: 'Gross profit', B6: KR.gp, A7: 'Long-term debt', B7: KR.debt, A8: "Shareholders' funds", B8: KR.equity,
  A10: 'Quick ratio', B10: '=ROUND((B1-B2-B3)/B4,2)',
  A11: 'Gross profit ratio (%)', B11: '=ROUND(B6/B5*100,2)',
  A12: 'Debt-equity ratio', B12: '=ROUND(B7/B8,2)',
});
check(KR_S.get('B10') === 1.30 && KR_S.get('B11') === 25 && KR_S.get('B12') === 0.5, 'Kosi ratios');
Q('s3_ratio_formulas', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined company, Kopili Hydro Engineering Ltd, has entered these figures in cells B1 to B8 of a sheet:\n\n${KR_S.md(['A', 'B'], [1, 2, 3, 4, 5, 6, 7, 8], 'value')}\n\nWrite the formulas to be entered in B10, B11 and B12 to compute, to two decimal places, the quick ratio, the gross profit ratio (as a percentage) and the debt-equity ratio, and state the value each will show.`,
  model: `${KR_S.md(['A', 'B'], [10, 11, 12], 'both')}\n\nQuick assets = ${fig(KR.ca)} − ${fig(KR.inv)} − ${fig(KR.prepaid)} = ${fig(KR.ca - KR.inv - KR.prepaid)}, so the quick ratio is ${KR_S.get('B10')} : 1; the gross profit ratio is ${KR_S.get('B11')}%; the debt-equity ratio is ${KR_S.get('B12')} : 1.`,
  sol: 'Refer to the cells, not the typed figures, so the ratios update when a figure changes; wrap each division in ROUND(…, 2).',
  scheme: [[`Quick ratio formula and ${KR_S.get('B10')}`, 1], [`Gross profit ratio formula and ${KR_S.get('B11')}%`, 1], [`Debt-equity formula and ${KR_S.get('B12')}`, 1]],
}));

const RS = { ca: 720000, inv: 300000, cl: 400000, rev: 3600000, opProfit: 450000, debt: 600000, sf: 1500000 };
const RS_S = new Sheet({
  A1: 'Current assets', B1: RS.ca, A2: 'Inventories', B2: RS.inv, A3: 'Current liabilities', B3: RS.cl,
  A4: 'Revenue from operations', B4: RS.rev, A5: 'Operating profit', B5: RS.opProfit, A6: 'Long-term debt', B6: RS.debt, A7: "Shareholders' funds", B7: RS.sf,
  A9: 'Current ratio', B9: '=ROUND(B1/B3,2)', C9: '=IF(B9>=2,"Comfortable","Watch liquidity")',
  A10: 'Quick ratio', B10: '=ROUND((B1-B2)/B3,2)', C10: '=IF(B10>=1,"Comfortable","Watch liquidity")',
  A11: 'Operating profit ratio (%)', B11: '=ROUND(B5/B4*100,2)',
  A12: 'Debt-equity ratio', B12: '=ROUND(B6/B7,2)', C12: '=IF(B12>1,"High borrowing","Within limit")',
});
check(RS_S.get('B9') === 1.8 && RS_S.get('C9') === 'Watch liquidity' && RS_S.get('B10') === 1.05 && RS_S.get('C10') === 'Comfortable' && RS_S.get('B11') === 12.5 && RS_S.get('B12') === 0.4 && RS_S.get('C12') === 'Within limit', 'Rushikulya ratios');
Q('l4_ratios_sheet', long({
  t: 2, d: 4, c: 'application', marks: 4,
  stem: `The finance team of an imagined company, Rushikulya Salt Works Ltd, wants a ratio sheet that also writes a one-word comment. Its figures are in B1 to B7:\n\n${RS_S.md(['A', 'B'], [1, 2, 3, 4, 5, 6, 7], 'value')}\n\nWrite formulas for (a) the current ratio in B9 with a comment in C9 that shows "Comfortable" when the ratio is at least 2 and "Watch liquidity" otherwise; (b) the quick ratio in B10 with a similar comment in C10 against a benchmark of 1 (there are no prepaid expenses); (c) the operating profit ratio as a percentage in B11; (d) the debt-equity ratio in B12 with a comment in C12 that shows "High borrowing" above 1 and "Within limit" otherwise. Round every ratio to two decimal places and state what each cell will show.`,
  model: `${RS_S.md(['A', 'B', 'C'], [9, 10, 11, 12], 'both')}\n\nThe current ratio (${RS_S.get('B9')} : 1) is below the conventional 2 : 1, so C9 shows "${RS_S.get('C9')}", while the quick ratio (${RS_S.get('B10')} : 1) meets its benchmark. The operating profit ratio is ${RS_S.get('B11')}% and borrowing (${RS_S.get('B12')} : 1) is ${RS_S.get('C12').toLowerCase()}.`,
  sol: 'Each ratio is a ROUND of a division of cell references; each comment is an IF that tests the ratio cell against its benchmark.',
  scheme: [['(a) Current ratio formula, comment formula and results', 1], ['(b) Quick ratio formula, comment formula and results', 1], ['(c) Operating profit ratio formula and result', 1], ['(d) Debt-equity formula, comment formula and results', 1]],
}));

// --- copying with a fixed rate cell
const CE_rows = [6, 7, 8, 9];
const CE_cost = [240000, 180000, 95000, 60000];
const CE_wrong = Object.fromEntries(CE_rows.map((r, i) => [`C${r}`, shiftFormula('=B6*B2', i, 0)]));
const CE_right = Object.fromEntries(CE_rows.map((r) => [`C${r}`, `=B${r}*Rate`]));
const CE_base = { A1: 'Depreciation rate', A2: 'Rate', B2: '15%', A5: 'Asset', B5: 'Cost (₹)', C5: 'Depreciation (₹)', ...Object.fromEntries(CE_rows.flatMap((r, i) => [[`A${r}`, ['Machine', 'Generator', 'Furniture', 'Computers'][i]], [`B${r}`, CE_cost[i]]])) };
const { C9: CE_wrongC9, ...CE_wrongNoText } = CE_wrong;
const CE_W = new Sheet({ ...CE_base, ...CE_wrongNoText });
const CE_R = new Sheet({ ...CE_base, ...CE_right }, { Rate: 'B2' });
check(CE_wrong.C7 === '=B7*B3' && CE_wrong.C9 === '=B9*B5', 'copied wrong formulas');
check(CE_W.get('C6') === 36000 && CE_W.get('C7') === 0 && CE_W.get('C8') === 0, 'wrong results');
check(CE_R.get('C7') === 27000 && CE_R.get('C8') === 14250 && CE_R.get('C9') === 9000, 'right results');
let CE_textErr = null;
try { new Sheet({ ...CE_base, C9: CE_wrongC9 }); } catch (e) { CE_textErr = e.message; }
check(CE_textErr && /expected a number/.test(CE_textErr), 'B5 holds text, so the copied formula in C9 fails');
Q('l4_copy_error', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `A trainee at an imagined engineering firm, Purna Pumps, has a depreciation rate of 15% in cell B2 and asset costs in B6 to B9 (machine ${rs(CE_cost[0])}, generator ${rs(CE_cost[1])}, furniture ${rs(CE_cost[2])}, computers ${rs(CE_cost[3])}). Row 5 holds the column titles. She typed ${code('=B6*B2')} in C6 and copied it down to C9. C6 is right, but C7 and C8 show 0 and C9 shows an error. (a) Write the formulas that the copying actually placed in C7, C8 and C9 and explain each result. (b) Correct the formula so that it can be copied safely, and give the corrected depreciation for all four assets.`,
  model: `**(a)** Both references in ${code('=B6*B2')} are relative, so each moved down one row per row copied:\n\n${md(['Cell', 'Formula after copying', 'Result', 'Why'], [['C7', code(CE_wrong.C7), '0', 'B3 is blank, so the rate used is 0'], ['C8', code(CE_wrong.C8), '0', 'B4 is blank'], ['C9', code(CE_wrong.C9), 'error', 'B5 holds the text "Cost (₹)", which cannot be multiplied']])}\n\n**(b)** The rate cell must not move. Lock it (a dollar sign before the column letter and before the row number of B2) or give B2 the name Rate and write ${code('=B6*Rate')} in C6, then copy down:\n\n${CE_R.md(['A', 'B', 'C'], CE_rows, 'both')}`,
  sol: 'A reference that must point at one cell for every row needs to be absolute (or a name); the cost reference should stay relative.',
  scheme: [['C7 and C8 formulas with reason for 0', 1], ['C9 formula with reason for the error', 1], ['Correct absolute reference or name explained', 1], ['Correct depreciation for all four assets', 1]],
}));

// --- depreciation
const SL_Q = { cost: 240000, salvage: 40000, life: 5 };
const SL_v = slm(SL_Q.cost, SL_Q.salvage, SL_Q.life).dep;
const SL_S = new Sheet({ B1: SL_Q.cost, B2: SL_Q.salvage, B3: SL_Q.life, B4: '=SLN(B1,B2,B3)' });
check(SL_S.get('B4') === SL_v && SL_v === 40000, 'Wainganga SLN');
Q('m_sln', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined rice mill in Gondia, Wainganga Rice Mill, bought a husking machine for ${rs(SL_Q.cost)}. It expects to sell it for ${rs(SL_Q.salvage)} after ${SL_Q.life} years. Its sheet holds the cost in B1, the salvage value in B2 and the life in B3. What will ${code('=SLN(B1,B2,B3)')} return?`,
  opts: [shownNum(SL_v), shownNum(SL_Q.cost / SL_Q.life), shownNum((SL_Q.cost + SL_Q.salvage) / SL_Q.life), shownNum(SL_Q.cost - SL_Q.salvage)],
  sol: `SLN gives (cost − salvage) ÷ life = (${fig(SL_Q.cost)} − ${fig(SL_Q.salvage)}) ÷ ${SL_Q.life} = ${fig(SL_v)} a year.`,
}));

const WD_Q = wdv(250000, 20, 2);
check(WD_Q.rows[1].close === 160000, 'Sharavati WDV');
Q('n_wdv', num({
  t: 2, d: 3, c: 'application', marks: 2, value: WD_Q.rows[1].close, unit: '₹',
  stem: `An imagined tools firm, Sharavati Power Tools, bought a lathe for ${rs(250000)} and charges depreciation at 20% a year on the written-down value. In its sheet, each year’s depreciation is ${code('=ROUND(opening value × 20%, 0)')}. What is the book value at the end of the second year?`,
  sol: `Year 1: ${fig(250000)} − ${fig(WD_Q.rows[0].dep)} = ${fig(WD_Q.rows[0].close)}. Year 2: depreciation ${fig(WD_Q.rows[1].dep)}, so the book value is ${fig(WD_Q.rows[1].close)}, that is ₹${fig(WD_Q.rows[1].close)}.`,
  scheme: [[`First-year closing value ${rs(WD_Q.rows[0].close)}`, 1], [`Second-year closing value ${rs(WD_Q.rows[1].close)}`, 1]],
}));

const DD_Q = ddb(120000, 10000, 4);
const DD_S = new Sheet({ B1: 120000, B2: 10000, B3: 4, B4: '=DDB(B1,B2,B3,2)' });
check(DD_S.get('B4') === DD_Q.rows[1].dep && DD_Q.rows[1].dep === 30000, 'Tons DDB');
Q('n_ddb', num({
  t: 2, d: 3, c: 'application', marks: 2, value: DD_Q.rows[1].dep, unit: '₹',
  stem: `An imagined courier firm, Tons Valley Couriers, uses ${code('=DDB(B1,B2,B3,2)')} to find the second year’s depreciation on a delivery van costing ${rs(120000)} (B1), with a salvage value of ${rs(10000)} (B2) and a life of 4 years (B3). What amount will the formula return?`,
  sol: `DDB applies twice the straight-line rate, 2 ÷ 4 = 50%, to the opening book value. Year 1: 50% of ${fig(120000)} = ${fig(DD_Q.rows[0].dep)}, leaving ${fig(DD_Q.rows[0].close)}. Year 2: 50% of ${fig(DD_Q.rows[0].close)} = ${fig(DD_Q.rows[1].dep)}.`,
  scheme: [['First-year depreciation and book value', 1], [`Second-year depreciation ${rs(DD_Q.rows[1].dep)}`, 1]],
}));

const MD5 = ddb(200000, 20000, 5);
const MD5_full = (MD5.rows[4].open * 2) / 5;
check(MD5.rows[4].dep < MD5_full, 'last-year cap applies');
const MD5_S = new Sheet({ B1: 200000, B2: 20000, B3: 5, B4: '=DDB(B1,B2,B3,5)' });
check(MD5_S.get('B4') === MD5.rows[4].dep, 'Mandakini DDB year 5');
Q('m_ddb', mcq({
  t: 2, d: 4, c: 'application',
  stem: `An imagined tour operator, Mandakini Tours, owns a coach costing ${rs(200000)} with a salvage value of ${rs(20000)} and a life of 5 years. Its book value at the start of year 5 is ${rs(MD5.rows[4].open)}. What will ${code('=DDB(200000,20000,5,5)')} return for year 5?`,
  opts: [shownNum(MD5.rows[4].dep), shownNum(MD5_full), shownNum((200000 - 20000) / 5), shownNum(MD5.rows[4].open)],
  sol: `Twice the straight-line rate (40%) would give ${fig(MD5_full)}, but that would take the book value below the salvage value of ${fig(20000)}. The function stops at salvage: ${fig(MD5.rows[4].open)} − ${fig(20000)} = ${fig(MD5.rows[4].dep)}.`,
}));

Q('ar_ddb', ar({
  t: 2, d: 4, c: 'analysis', key: 'a',
  a: 'In the last year of an asset’s life, the double declining balance function may give less depreciation than twice the straight-line rate applied to the opening book value.',
  r: 'The function never lets the book value of the asset fall below its salvage value.',
  sol: 'Both are true. When the full declining-balance charge would cut the book value below salvage, the function charges only the excess of book value over salvage, which is why the last charge can be smaller.',
}));

const MB = wdv(400000, 25, 3);
const MB_S = new Sheet({ A1: 'Rate', B1: '25%', A3: 'Year', B3: 'Opening (₹)', C3: 'Depreciation (₹)', D3: 'Closing (₹)', A4: 1, B4: 400000, C4: '=ROUND(B4*Rate,0)', D4: '=B4-C4', A5: 2, B5: '=D4', C5: '=ROUND(B5*Rate,0)', D5: '=B5-C5', A6: 3, B6: '=D5', C6: '=ROUND(B6*Rate,0)', D6: '=B6-C6', A7: 'Total', C7: '=SUM(C4:C6)' }, { Rate: 'B1' });
MB.rows.forEach((r, i) => check(MB_S.get(`C${4 + i}`) === r.dep && MB_S.get(`D${4 + i}`) === r.close, `Mahanadi row ${i + 1}`));
Q('l4_wdv', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `An imagined boat-building firm, Mahanadi Boat Works, Cuttack, bought a hull-moulding machine for ${rs(400000)} and depreciates it at 25% a year on the written-down value, rounding each charge to the rupee. Design a spreadsheet layout (rate in B1, which is named Rate; years in rows 4 to 6) that computes the opening value, depreciation and closing value for three years and the total depreciation. Show the formulas and the values they produce.`,
  model: `${MB_S.md(['A', 'B', 'C', 'D'], [1, 3, 4, 5, 6, 7], 'both')}\n\nEach year’s opening value is the previous closing value (${code('=D4')}, ${code('=D5')}), so the charge falls every year: ${MB.rows.map((r) => fig(r.dep)).join(', ')}. Total depreciation is ${fig(MB_S.get('C7'))} and the book value after three years is ${fig(MB.rows[2].close)}.`,
  sol: 'Link each opening value to the previous closing value and refer to the rate by name (or an absolute reference) so the depreciation formula can be copied down.',
  scheme: [['Layout with rate cell and linked opening values', 1], ['Depreciation and closing formulas', 1], ['Correct values for the three years', 1.5], ['Total depreciation', 0.5]],
}));

const CH_SL = slm(160000, 16000, 4);
const CH_WD = wdv(160000, 40, 4);
check(CH_SL.dep === 36000 && CH_WD.rows[3].close === 20736, 'Chenab schedules');
const CH_S = new Sheet({
  A1: 'Cost', B1: 160000, A2: 'Salvage', B2: 16000, A3: 'Life (years)', B3: 4, A4: 'Written-down rate', B4: '40%',
  A6: 'Year', B6: 'Straight-line charge', C6: 'Straight-line closing', D6: 'Written-down charge', E6: 'Written-down closing',
  ...Object.fromEntries([7, 8, 9, 10].flatMap((r, i) => [
    [`A${r}`, i + 1],
    [`B${r}`, '=SLN(Cost,Salvage,Life)'],
    [`C${r}`, i === 0 ? '=Cost-B7' : `=C${r - 1}-B${r}`],
    [`D${r}`, i === 0 ? '=ROUND(Cost*WRate,0)' : `=ROUND(E${r - 1}*WRate,0)`],
    [`E${r}`, i === 0 ? '=Cost-D7' : `=E${r - 1}-D${r}`],
  ])),
  A11: 'Total', B11: '=SUM(B7:B10)', D11: '=SUM(D7:D10)',
}, { Cost: 'B1', Salvage: 'B2', Life: 'B3', WRate: 'B4' });
[7, 8, 9, 10].forEach((r, i) => {
  check(CH_S.get(`B${r}`) === CH_SL.rows[i].dep && CH_S.get(`C${r}`) === CH_SL.rows[i].close, `Chenab SLM ${r}`);
  check(CH_S.get(`D${r}`) === CH_WD.rows[i].dep && CH_S.get(`E${r}`) === CH_WD.rows[i].close, `Chenab WDV ${r}`);
});
const CH_slTot = CH_S.get('B11');
const CH_wdTot = CH_S.get('D11');
check(CH_slTot === 144000 && CH_wdTot === 139264 && CH_S.get('C10') === 16000, 'Chenab totals');
Q('l6_depreciation', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `An imagined woollen mill, Chenab Woollens, Kathua, bought computers for ${rs(160000)} with an estimated salvage value of ${rs(16000)} after 4 years. The manager wants a spreadsheet comparing (i) the straight-line method, using the SLN function, and (ii) the written-down value method at 40% a year, each charge rounded to the rupee. Name the input cells Cost (B1), Salvage (B2), Life (B3) and WRate (B4), put years 1 to 4 in rows 7 to 10, and total the charges in row 11. (a) Write the formulas for each column and show the values. (b) Compare the two methods on the basis of the results.`,
  model: `**(a)**\n\n${CH_S.md(['A', 'B', 'C', 'D', 'E'], [6, 7, 8, 9, 10, 11], 'both')}\n\n**(b)** The straight-line method charges the same ${fig(CH_SL.dep)} every year and ends exactly at the salvage value of ${fig(CH_S.get('C10'))}. The written-down value method charges ${fig(CH_WD.rows[0].dep)} in year 1, falling to ${fig(CH_WD.rows[3].dep)} in year 4; its total of ${fig(CH_wdTot)} is ${fig(CH_slTot - CH_wdTot)} less than the straight-line total of ${fig(CH_slTot)}, so the book value left (${fig(CH_WD.rows[3].close)}) is above the expected salvage value. Computers lose value fastest when new, so the heavier early charges of the written-down method match their pattern of use better.`,
  sol: 'Use names for the four inputs so that every row formula can be copied down; link each closing value to the previous one.',
  scheme: [['Straight-line charge formula and values', 1], ['Straight-line closing values reaching salvage', 1], ['Written-down charge formula with ROUND and values', 1.5], ['Written-down closing values', 1], ['Totals and comparison of the methods', 1.5]],
}));

// --- loan repayment
const EM = loan(250000, 9, 6, 12);
const EM_raw = round(pmt(0.09 / 12, 6, -250000), 2);
check(round(EM_raw, 0) === EM.emi && EM_raw !== EM.emi, 'Netravati unrounded instalment');
const EM_S = new Sheet({ B1: 250000, B2: '9%', B3: 6, B4: '=ROUND(PMT(B2/12,B3,-B1),0)' });
check(EM_S.get('B4') === EM.emi && EM.emi === 42767, 'Netravati EMI');
Q('n_emi', num({
  t: 2, d: 3, c: 'application', marks: 2, value: EM.emi, unit: '₹',
  stem: `An imagined cashew processor, Netravati Cashews, borrows ${rs(250000)} at 9% a year, repayable in 6 equal monthly instalments at the end of each month. Its sheet holds the loan in B1, the yearly rate in B2 and the number of months in B3. What will ${code('=ROUND(PMT(B2/12,B3,-B1),0)')} show?`,
  sol: `The rate per month is 9% ÷ 12 = 0.75%. PMT(0.75%, 6, −2,50,000) = ${shownNum(EM_raw)}…, which ROUND turns into ${fig(EM.emi)}, the monthly instalment of ₹${fig(EM.emi)}.`,
  scheme: [['Monthly rate and use of PMT', 1], [`Instalment ${rs(EM.emi)}`, 1]],
}));

const VT = loan(240000, 10, 8, 12);
check(VT.rows[1].interest === 1757, 'Vaigai month 2 interest');
Q('n_interest2', num({
  t: 2, d: 4, c: 'application', marks: 2, value: VT.rows[1].interest, unit: '₹',
  stem: `An imagined textile firm, Vaigai Looms, Madurai, repays a loan of ${rs(240000)} at 10% a year in 8 monthly instalments of ${rs(VT.emi)}. Interest each month is the opening balance × 10% ÷ 12, rounded to the rupee. How much of the second instalment is interest?`,
  sol: `Month 1: interest ${fig(240000)} × 10% ÷ 12 = ${fig(VT.rows[0].interest)}; principal repaid ${fig(VT.emi)} − ${fig(VT.rows[0].interest)} = ${fig(VT.rows[0].prin)}; balance ${fig(VT.rows[0].close)}. Month 2: ${fig(VT.rows[0].close)} × 10% ÷ 12 = 1,757.2, so interest is ${fig(VT.rows[1].interest)}.`,
  scheme: [['Month 1 balance after repayment', 1], [`Month 2 interest ${rs(VT.rows[1].interest)}`, 1]],
}));
check(round((VT.rows[0].close * 0.1) / 12, 1) === 1757.2, 'Vaigai unrounded');

const DG_S = new Sheet({ A1: 'Loan', B1: 360000, A2: 'Rate per year', B2: '12%', A3: 'Months', B3: 5, A4: 'Instalment', B4: '=ROUND(PMT(B2/12,B3,-B1),0)' });
const DGL = loan(360000, 12, 5, 12);
check(DG_S.get('B4') === DGL.emi, 'Damanganga EMI');
Q('s3_emi_rows', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined plastics unit, Damanganga Plastics, Vapi, takes a loan of ${rs(360000)} at 12% a year, repayable in 5 equal monthly instalments. Using ${code('=ROUND(PMT(B2/12,B3,-B1),0)')} for the instalment and rounding each month’s interest to the rupee, prepare the first two rows of the loan repayment schedule (opening balance, instalment, interest, principal repaid, closing balance).`,
  model: `Instalment = ${rs(DGL.emi)} (rate per month 1%).\n\n${md(['Month', 'Opening balance (₹)', 'Instalment (₹)', 'Interest at 1% (₹)', 'Principal repaid (₹)', 'Closing balance (₹)'], DGL.rows.slice(0, 2).map((x) => [String(x.k), fig(x.open), fig(x.emi), fig(x.interest), fig(x.prin), fig(x.close)]), [1, 2, 3, 4, 5])}\n\nIn each row interest + principal repaid = instalment (${fig(DGL.rows[0].interest)} + ${fig(DGL.rows[0].prin)} = ${fig(DGL.emi)}), and the closing balance becomes the next opening balance.`,
  sol: 'Interest is charged on the opening balance of the month; the rest of the instalment reduces the loan.',
  scheme: [[`Instalment ${rs(DGL.emi)}`, 1], ['Month 1 row correct', 1], ['Month 2 row correct', 1]],
}));

const KL = loan(300000, 11, 4, 1);
check(KL.residual === 0 && KL.emi === 96698, 'Ken loan');
const KL_S = new Sheet({
  A1: 'Loan', B1: 300000, A2: 'Rate per year', B2: '11%', A3: 'Years', B3: 4, A4: 'Instalment', B4: '=ROUND(PMT(B2,B3,-B1),0)',
  A6: 'Year', B6: 'Opening', C6: 'Instalment', D6: 'Interest', E6: 'Principal', F6: 'Closing',
  ...Object.fromEntries([7, 8, 9, 10].flatMap((r, i) => [[`A${r}`, i + 1], [`B${r}`, i === 0 ? '=B1' : `=F${r - 1}`], [`C${r}`, '=Instalment'], [`D${r}`, `=ROUND(B${r}*Rate,0)`], [`E${r}`, `=C${r}-D${r}`], [`F${r}`, `=B${r}-E${r}`]])),
  A11: 'Total', C11: '=SUM(C7:C10)', D11: '=SUM(D7:D10)', E11: '=SUM(E7:E10)',
}, { Rate: 'B2', Instalment: 'B4' });
KL.rows.forEach((x, i) => check(KL_S.get(`D${7 + i}`) === x.interest && KL_S.get(`F${7 + i}`) === x.close, `Ken row ${i + 1}`));
check(KL_S.get('E11') === 300000 && KL_S.get('C11') - KL_S.get('D11') === 300000, 'Ken totals');
Q('l6_loan', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `An imagined stone-craft unit, Ken River Stone Crafts, Banda, borrows ${rs(300000)} from a bank at 11% a year, repayable in 4 equal yearly instalments at the end of each year. Prepare a spreadsheet loan repayment schedule: the loan, rate and years in B1 to B3, the instalment in B4 (rounded to the rupee, cell named Instalment; B2 is named Rate), years 1 to 4 in rows 7 to 10, and totals in row 11. Show the formulas and the values, and state what the totals prove.`,
  model: `${KL_S.md(['A', 'B', 'C', 'D', 'E', 'F'], [4, 6, 7, 8, 9, 10, 11], 'both')}\n\n**What the totals prove:** principal repaid adds up to ${fig(KL_S.get('E11'))}, the whole loan, and the closing balance after year 4 is ${fig(KL.rows[3].close)}. Total instalments ${fig(KL_S.get('C11'))} − total interest ${fig(KL_S.get('D11'))} = ${fig(KL_S.get('C11') - KL_S.get('D11'))}. Interest falls each year (${KL.rows.map((x) => fig(x.interest)).join(', ')}) because it is charged on a smaller balance, so more of each instalment repays the loan.`,
  sol: 'Interest on the opening balance; principal = instalment − interest; closing = opening − principal; link each year’s opening to the previous closing.',
  scheme: [[`Instalment formula and ${rs(KL.emi)}`, 1], ['Opening balance links', 1], ['Interest formula and values', 1.5], ['Principal and closing formulas and values', 1.5], ['Totals and what they show', 1]],
}));

// --- bank reconciliation
const SB = brs({
  opening: 52000,
  entries: [
    ['Deposits recorded in both books', 184000, 'in', true, true],
    ['Cheques issued and cleared', 141000, 'out', true, true],
    ['Cheques issued but not yet presented for payment', 23500, 'out', true, false],
    ['Cheque deposited but not yet credited by the bank', 18000, 'in', true, false],
    ['Bank charges debited in the pass book only', 650, 'out', false, true],
    ['Interest credited by the bank only', 1150, 'in', false, true],
  ],
});
check(SB.cb === 89500 && SB.pb === 95500, 'Sabarmati books');
Q('n_brs', num({
  t: 2, d: 3, c: 'application', marks: 2, value: SB.pb, unit: '₹',
  stem: `On 31 March 2026 the cash book of an imagined firm, Sabarmati Sports Goods, Ahmedabad, shows a bank balance of ${rs(SB.cb)} (debit). Cheques of ${rs(23500)} issued to suppliers have not yet been presented; a cheque of ${rs(18000)} deposited on 30 March has not yet been credited; the bank has debited charges of ${rs(650)} and credited interest of ${rs(1150)}, neither yet entered in the cash book. What balance should the pass book show?`,
  sol: `Start from the cash book: ${fig(SB.cb)} + ${fig(23500)} + ${fig(1150)} − ${fig(18000)} − ${fig(650)} = ${fig(SB.pb)}, a credit balance of ₹${fig(SB.pb)} in the pass book.`,
  scheme: [['Items correctly added and subtracted', 1], [`Pass book balance ${rs(SB.pb)}`, 1]],
}));

const GS = brs({
  opening: 30000,
  entries: [
    ['Other deposits and payments (net) in both books', 45000, 'in', true, true],
    ['Cheques issued to suppliers, not yet presented', 16800, 'out', true, false],
    ['Cheque from a customer deposited, not yet cleared', 12400, 'in', true, false],
    ['Amount paid directly into the bank by a customer', 7500, 'in', false, true],
    ['Insurance premium paid by the bank under standing instructions', 3900, 'out', false, true],
  ],
});
Q('s3_brs', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `The cash book of an imagined seed merchant, Ghaghara Seeds, Gonda, shows a debit bank balance of ${rs(GS.cb)} on 31 March 2026. Cheques of ${rs(16800)} issued to suppliers have not been presented; a customer’s cheque of ${rs(12400)} has been deposited but not cleared; a customer paid ${rs(7500)} directly into the bank; and the bank paid an insurance premium of ${rs(3900)} under standing instructions. The last two have not been entered in the cash book. Prepare a bank reconciliation statement and state the balance as per the pass book.`,
  model: `${brsTable(GS).md}\n\nThe pass book should show a credit balance of ${rs(GS.pb)}.`,
  sol: 'Items that make the bank’s figure larger than the cash book’s are added; items that make it smaller are deducted.',
  scheme: [['Two items correctly added', 1], ['Two items correctly deducted', 1], [`Pass book balance ${rs(GS.pb)}`, 1]],
}));

const IT = brs({
  opening: -95000,
  entries: [
    ['Net movement recorded in both books', 18000, 'out', true, true],
    ['Cheques issued but not presented for payment', 34000, 'out', true, false],
    ['Cheques deposited but not collected by the bank', 52500, 'in', true, false],
    ['Interest on overdraft charged by the bank', 4200, 'out', false, true],
    ['Dividend collected by the bank on the firm’s investments', 6800, 'in', false, true],
    ['A customer’s cheque deposited and recorded, later dishonoured', 9600, 'in', true, true],
    ['Customer’s cheque dishonoured and debited back by the bank', 9600, 'out', false, true],
    ['Bank charges debited in the pass book only', 900, 'out', false, true],
  ],
});
check(IT.cb < 0 && IT.pb < 0, 'Indravati overdraft both books');
const IT_S = new Sheet({
  A1: 'Debit balance (overdraft) as per pass book', B1: -IT.pb,
  A2: 'Add: cheques issued, not presented', B2: 34000, A3: 'Add: dividend collected by the bank', B3: 6800,
  A4: 'Less: cheques deposited, not collected', B4: 52500, A5: 'Less: interest on overdraft', B5: 4200,
  A6: 'Less: cheque dishonoured', B6: 9600, A7: 'Less: bank charges', B7: 900,
  A8: 'Credit balance (overdraft) as per cash book', B8: '=B1+SUM(B2:B3)-SUM(B4:B7)',
});
check(IT_S.get('B8') === -IT.cb, 'Indravati sheet reaches the cash book overdraft');
Q('l6_brs', long({
  t: 2, d: 5, c: 'application', marks: 6,
  stem: `On 31 March 2026 the pass book of an imagined timber dealer, Indravati Timber Mart, Jagdalpur, shows an overdraft (debit balance) of ${rs(-IT.pb)}. Compare it with the cash book:\n\n1. Cheques of ${rs(34000)} issued in March were not presented for payment until April.\n2. Cheques of ${rs(52500)} deposited on 31 March were collected by the bank only in April.\n3. The bank charged interest on the overdraft of ${rs(4200)}.\n4. The bank collected a dividend of ${rs(6800)} on the firm’s investments.\n5. A customer’s cheque of ${rs(9600)}, deposited and entered in the cash book, was dishonoured; the bank has debited it back.\n6. Bank charges of ${rs(900)} appear only in the pass book.\n\n(a) Prepare a bank reconciliation statement starting from the pass book and find the overdraft as per the cash book. (b) Show how the statement could be set up in a spreadsheet so that the last cell computes the cash book balance.`,
  model: `**(a)**\n\n${brsTable(IT, { from: 'pb' }).md}\n\nThe cash book shows an overdraft (credit balance) of ${rs(-IT.cb)}.\n\n**(b)** Overdrafts are entered as positive amounts and the direction of each item is reversed:\n\n${IT_S.md(['A', 'B'], [1, 2, 3, 4, 5, 6, 7, 8], 'both')}`,
  sol: 'Starting from an overdraft, an item that made the bank’s overdraft larger than the cash book’s is subtracted (or, with overdrafts entered as positive amounts, the signs reverse); check the dishonoured cheque, which appears in both books as a deposit but is reversed only by the bank.',
  scheme: [['Opening overdraft correctly placed', 0.5], ['Items 2, 3, 5 and 6 treated correctly', 2], ['Items 1 and 4 treated correctly', 1], [`Cash book overdraft ${rs(-IT.cb)}`, 1], ['Spreadsheet layout with SUM formulas reaching the same figure', 1.5]],
}));

Q('m_brs_effect', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The bank of an imagined firm, Teesta Tea Traders, has debited half-yearly service charges to its account, but the firm has not yet entered them in its cash book. Compared with the cash book, the pass book balance (favourable) will be',
  opts: ['lower by the amount of the charges', 'higher by the amount of the charges', 'the same, because the charges are small', 'lower by twice the amount of the charges'],
  sol: 'Only the bank has reduced the balance, so the pass book shows less money than the cash book; when reconciling from the cash book, the charges are deducted.',
}));

Q('tf_brs', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A cheque issued by an imagined firm, Manas Bamboo Works, and entered in its cash book, but not yet presented to the bank by the payee, makes the favourable pass book balance higher than the cash book balance.',
  sol: 'The firm has already reduced its cash book balance, while the bank will reduce its record only when the cheque is presented; until then the bank shows more.',
}));

// --- charts
Q('m_chart_pie', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The manager of an imagined resort, Kodaikanal Hill Stay, wants one chart showing what share of last year’s total expenses went on staff, food, power, repairs and marketing. Which chart suits this purpose best?',
  opts: ['A pie chart', 'A line chart', 'A scatter chart', 'A column chart of the five expenses over five years'],
  sol: 'A pie chart shows how one whole is divided into parts, so each expense appears as a slice of total expenses for the year.',
}));

Q('tf_line_share', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A line chart is the best way to show the share of each department in the total sales of an imagined department store for a single year.',
  sol: 'A line chart shows a trend over time. Shares of one total in one year are shown by a pie chart, or by a single stacked or 100% bar.',
}));

Q('s3_charts', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'The accountant of an imagined handloom cooperative, Kaveri Handlooms, has to present three things to its board: (a) monthly sales for the last two years, to show seasonal ups and downs; (b) this year’s revenue, expenses and profit of its four branches side by side; (c) how this year’s total cost is split among yarn, wages, dyeing, power and transport. Suggest a suitable chart for each and give a reason.',
  model: '**(a) Line chart.** Monthly sales over two years form a time series, and a line joining the months shows the rise and fall of the seasons clearly; the two years can be drawn as two lines.\n\n**(b) Clustered column (bar) chart.** Placing the three measures of each branch side by side makes comparison between branches easy, with a different colour for revenue, expenses and profit.\n\n**(c) Pie chart.** The total cost is one whole divided into five parts, and the slices show each item’s share of the total.',
  sol: 'Trend over time calls for a line chart, comparison across categories for columns or bars, and parts of one whole for a pie.',
  scheme: [['(a) Line chart with reason', 1], ['(b) Column or bar chart with reason', 1], ['(c) Pie chart with reason', 1]],
}));

// ================================================================ t03 Using a computerised accounting system
Q('m_code_block', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined bookshop uses the four-digit coding scheme of this chapter: the first digit is the primary head (5 for expenses), the second the group (52 for indirect expenses) and the last two the ledger. Rent is 5202, electricity 5203 and advertisement 5204, and 5205 is free. Which code should be given to a new ledger, "Telephone and internet charges"?`,
  opts: ['5205', '5105', '4205', '5200'],
  sol: 'Telephone charges are an indirect (office) expense, so they belong to group 52, and the next free ledger number in that block is 05. A code ending in 00 stands for the group itself, not a ledger.',
}));
check(groupOf(5205) === 'Indirect expenses', 'telephone code group');

Q('fb_code_digit', fb({
  t: 3, d: 2, c: 'application',
  stem: 'In the coding scheme used in this chapter, the code of every expense ledger, such as purchases or rent, begins with the digit ___.',
  acc: [['5', 'five']],
  sol: 'The first digit is the primary head: 1 assets, 2 liabilities, 3 capital, 4 income and 5 expenses.',
}));

Q('m_mnemonic', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The accountant of an imagined clinic, Pamba Health Centre, codes ledgers as SAL for salaries, ELE for electricity and DRS for debtors. This method of codification is called',
  opts: ['mnemonic coding', 'sequential coding', 'block coding', 'numeric hierarchy coding'],
  sol: 'Mnemonic codes are short letter groups that remind the user of the account’s name, so they are easy to recall but harder to keep in order as accounts grow.',
}));

Q('m_voucher_type', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The cashier of an imagined chemist shop, Shetrunji Medicos, withdraws money from the shop’s current account for petty cash. In the accounting software this transaction is entered through a',
  opts: ['contra voucher', 'payment voucher', 'journal voucher', 'sales voucher'],
  sol: 'A movement of money between cash and bank, in either direction, uses only cash and bank accounts and is entered as a contra entry.',
}));

Q('tf_contra', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? When an imagined bakery, Ghatprabha Bakes, deposits the day’s cash takings into its bank account, the entry in its accounting software is made through a contra voucher.',
  sol: 'Both accounts involved are cash and bank, so the movement is a contra entry: bank is debited and cash credited.',
}));

Q('mt_vouchers', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'At an imagined furniture dealer, Tungabhadra Woodcraft, four transactions are to be entered. Match each in column A with the voucher type used in column B.',
  pairs: [
    ['Cash received from a debtor', 'Receipt voucher'],
    ['Rent paid by cheque', 'Payment voucher'],
    ['Cash deposited into the bank', 'Contra voucher'],
    ['Depreciation charged on furniture', 'Journal voucher'],
  ],
  sol: 'Receipts debit cash or bank, payments credit cash or bank, contra entries use only cash and bank, and non-cash adjustments go through the journal.',
}));

Q('ord_hierarchy', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these levels of the account hierarchy used for an imagined shoe store, Mahi Footwear, from the broadest to the most detailed.',
  items: ['Primary head: Assets (1000)', 'Group: Current assets (1200)', 'Ledger: Trade receivables (1203)', 'Party account in the sub-ledger: Rao Shoe Mart'],
  sol: 'Each ledger belongs to a group and each group to a primary head; individual debtors are kept as party accounts under the trade receivables ledger.',
}));

// validation: four vouchers of an imagined firm, the software refuses those that break a rule
const VAL_ACC = [[1201, 'Cash in hand', 'Current assets'], [1202, 'Bank account', 'Current assets'], [2201, 'Trade payables', 'Current liabilities'], [4101, 'Sales', 'Revenue from operations'], [5101, 'Purchases', 'Direct expenses'], [5202, 'Rent', 'Indirect expenses']];
const VAL = cas({
  accounts: VAL_ACC,
  period: ['2026-04-01', '2026-04-30'],
  cashBank: [1201, 1202],
  vouchers: [
    { no: 'R-14', type: 'Receipt', date: '2026-04-10', lines: [[1201, 26500, 0], [4101, 0, 26500]] },
    { no: 'P-07', type: 'Purchase', date: '2026-04-12', lines: [[5101, 45000, 0], [2201, 0, 54000]] },
    { no: 'P-08', type: 'Payment', date: '2026-04-15', lines: [[5202, 18000, 0], [1202, 0, 18000]] },
    { no: 'C-03', type: 'Contra', date: '2026-04-18', lines: [[1202, 20000, 0], [1201, 0, 20000]] },
  ],
});
check(VAL.rejected.length === 1 && VAL.rejected[0].no === 'P-07', 'only the transposed voucher fails');
Q('m_validation', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined crockery shop, Pennaiyar Crockery, enters four vouchers in April 2026 (accounting period 1 to 30 April):\n\n${md(['Voucher', 'Type', 'Date', 'Debit', 'Credit'], [['R-14', 'Receipt', '10 April', 'Cash in hand 26,500', 'Sales 26,500'], ['P-07', 'Purchase', '12 April', 'Purchases 45,000', 'Trade payables 54,000'], ['P-08', 'Payment', '15 April', 'Rent 18,000', 'Bank account 18,000'], ['C-03', 'Contra', '18 April', 'Bank account 20,000', 'Cash in hand 20,000']])}\n\nWhich voucher will the software refuse to save?`,
  opts: ['P-07', 'R-14', 'P-08', 'C-03'],
  sol: `P-07 fails validation because its ${VAL.rejected[0].why[0]} (the digits were transposed). The other three balance, use valid codes, fall within the period and follow their voucher-type rules.`,
}));

const SVAL = cas({
  accounts: [...VAL_ACC, [1101, 'Furniture', 'Non-current assets']],
  period: ['2026-04-01', '2026-04-30'],
  cashBank: [1201, 1202],
  vouchers: [
    { no: 'J-02', type: 'Journal', date: '2026-04-05', lines: [[5209, 4000, 0], [1201, 0, 4000]] },
    { no: 'P-11', type: 'Payment', date: '2026-05-02', lines: [[5202, 15000, 0], [1202, 0, 15000]] },
    { no: 'C-05', type: 'Contra', date: '2026-04-20', lines: [[1101, 12000, 0], [1201, 0, 12000]] },
  ],
});
check(SVAL.rejected.length === 3 && SVAL.ok.length === 0, 'all three Sutlej vouchers fail');
const SV_why = Object.fromEntries(SVAL.rejected.map((v) => [v.no, v.why[0]]));
check(/5209/.test(SV_why['J-02']) && /outside/.test(SV_why['P-11']) && /contra/.test(SV_why['C-05']), 'Sutlej reasons');
Q('s3_validation', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `An imagined electricals shop, Sutlej Electricals, works in a CAS whose chart of accounts has cash in hand (1201), bank account (1202), furniture (1101), trade payables (2201), sales (4101), purchases (5101) and rent (5202); the open period is 1 to 30 April 2026. The software refuses all three of these vouchers. Give the reason in each case and how it should be corrected.\n\n${md(['Voucher', 'Type', 'Date', 'Debit', 'Credit'], [['J-02', 'Journal', '5 April', '5209: 4,000', '1201 Cash in hand: 4,000'], ['P-11', 'Payment', '2 May', '5202 Rent: 15,000', '1202 Bank account: 15,000'], ['C-05', 'Contra', '20 April', '1101 Furniture: 12,000', '1201 Cash in hand: 12,000']])}`,
  model: `- **J-02:** ${SV_why['J-02']}. Create the ledger first (for example a new indirect-expense ledger in the 52 block) or use the right existing code; a cash payment should also go through a payment voucher.\n- **P-11:** ${SV_why['P-11']}. Enter it in the May period (or, if the rent was paid in April, correct the date).\n- **C-05:** ${SV_why['C-05']}; buying furniture for cash is a payment, so it must be entered through a payment voucher debiting furniture and crediting cash.`,
  sol: 'Check each voucher against the validation rules: known codes, date inside the open period, and the voucher type matching the accounts used.',
  scheme: [['J-02: unknown code and correction', 1], ['P-11: date outside the period and correction', 1], ['C-05: wrong voucher type and correction', 1]],
}));

Q('ar_tb', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'A trial balance generated by a computerised accounting system proves that every transaction has been recorded in the correct account.',
  r: 'The system accepts only those vouchers in which total debits equal total credits.',
  sol: 'R is true, so the trial balance totals always agree; but A is false, because a voucher debited to the wrong ledger, or a transaction left out altogether, still balances.',
}));

Q('s3_codification', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain the meaning of codification of accounts and describe any two methods of coding, with an example of each for an imagined restaurant, Sabari Kitchen.',
  model: '**Codification** is giving each account head a short, unique code, built so that its position in the hierarchy (primary head, group, ledger) can be read from it. Codes make data entry faster, avoid confusion between similar names and let the software sort and group accounts.\n\n- **Block (or hierarchical numeric) codes:** each group gets a block of numbers, with spare numbers left for new ledgers; for Sabari Kitchen, 5200–5299 for indirect expenses, so rent is 5202 and gas charges could be 5207.\n- **Sequential codes:** numbers given one after another in the order accounts are opened, such as 101, 102, 103; simple but they show nothing about the group.\n- *(Also accepted)* **Mnemonic codes:** letters that recall the name, such as KIT for kitchen supplies or SAL for salaries.',
  sol: 'Define the term with its purpose, then explain two methods, each with an example from a restaurant.',
  scheme: [['Meaning and purpose of codification', 1], ['First method with example', 1], ['Second method with example', 1]],
}));

Q('s3_security', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'An imagined school in Siliguri keeps its fee and salary accounts in accounting software that several clerks use. Describe three security features the software should offer.',
  model: '1. **Passwords and user rights:** each clerk logs in with a personal password, and the administrator decides who may only view reports, who may enter vouchers and who may alter or delete them.\n2. **Audit trail:** the software keeps a log of every voucher created, altered or deleted, with the user and the time, so changes can be traced.\n3. **Backup and restore:** records are copied at regular intervals to a safe place so they can be restored after a crash, theft or virus attack.\n4. *(Also accepted)* Locking of a closed period so that old vouchers cannot be changed; encryption of stored records.',
  sol: 'Each feature should say what it protects against.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1], ['Third feature explained', 1]],
}));

Q('l4_steps', long({
  t: 3, d: 3, c: 'understanding', marks: 4,
  stem: 'Ms Lata Rawat is starting an imagined handicrafts shop in Almora and will keep her accounts in ready-to-use accounting software. Describe, in order, four main steps she will follow from setting up the software to obtaining her final accounts.',
  model: '1. **Create the company:** enter the business name, address, the financial year and the date from which books begin, and set a password.\n2. **Set up the chart of accounts:** create groups under the primary heads and ledgers under each group (cash, bank, purchases, sales, rent, debtors, creditors and so on), giving each a code and entering opening balances.\n3. **Enter vouchers:** record each transaction through the right voucher type (receipt, payment, contra, journal, sales, purchase); the software validates and saves each one, and adjustment entries such as closing stock or outstanding expenses are entered as journal vouchers at the period end.\n4. **Generate reports:** display or print the ledgers, the trial balance, the trading and profit and loss account and the balance sheet; then close the year so that balances are carried forward.',
  sol: 'Set-up, master records, transactions and adjustments, then reports, in that order.',
  scheme: [['Company creation', 1], ['Groups, ledgers and codes', 1], ['Voucher entry with validation and adjustments', 1], ['Generating reports', 1]],
}));

// coding-scheme design (long 6)
const SR_LEDGERS = [
  ['Delivery van', 1100], ['Shop fittings', 1100], ['Cash in hand', 1200], ['Bank account', 1200], ['Trade receivables', 1200],
  ['Loan from a cooperative bank (five years)', 2100], ['Trade payables', 2200], ['Wages outstanding', 2200],
  ['Capital', 3100], ['Drawings', 3100], ['Sales', 4100], ['Discount received', 4200],
  ['Purchases', 5100], ['Carriage inwards', 5100], ['Shop rent', 5200], ['Salaries', 5200],
];
const SR_CODES = [];
for (const [name, g] of SR_LEDGERS) {
  const used = SR_CODES.filter((x) => x[2] === g).length;
  SR_CODES.push([g + used + 1, name, g]);
}
check(new Set(SR_CODES.map((x) => x[0])).size === SR_LEDGERS.length, 'Shyok codes unique');
const SR_C = cas({ accounts: SR_CODES.map(([c, n, g]) => [c, n, groupOf(g)]), period: ['2026-04-01', '2027-03-31'], cashBank: [1201, 1202], vouchers: [] });
check(SR_C.chart.size === 16, 'Shyok chart');
Q('l6_coding', long({
  t: 3, d: 4, c: 'application', marks: 6,
  stem: `An imagined grocery wholesaler, Shyok Provisions, Leh, is setting up accounting software. Design a four-digit numeric coding scheme for it in which the first digit shows the primary head, the second the group and the last two the ledger, leaving room for new accounts. Then (a) list the groups with their codes, (b) give a code to each of these ledgers: ${SR_LEDGERS.map((x) => x[0].toLowerCase()).join('; ')}; and (c) explain how a new ledger, "Electricity charges", would be added.`,
  model: `**Scheme:** first digit 1 assets, 2 liabilities, 3 capital, 4 income, 5 expenses; second digit the group; last two digits the ledger (00 is kept for the group itself, so each group has room for 99 ledgers).\n\n**(a) Groups**\n\n${md(['Code', 'Group', 'Primary head'], GROUPS.map(([c, n]) => [String(c), n, ['', 'Assets', 'Liabilities', 'Capital', 'Income', 'Expenses'][Math.floor(c / 1000)]]))}\n\n**(b) Ledgers**\n\n${md(['Code', 'Ledger', 'Group'], SR_CODES.map(([c, n, g]) => [String(c), n, groupOf(g)]))}\n\n**(c)** Electricity is an indirect (office) expense, so it goes in group 5200; the next free number after salaries (${SR_CODES.find((x) => x[1] === 'Salaries')[0]}) is **${SR_CODES.find((x) => x[1] === 'Salaries')[0] + 1}**. No existing code changes, which is the advantage of keeping blocks with spare numbers.`,
  sol: 'Fix the meaning of each digit first, give every group a block, number the ledgers inside each block in order, and show that a new ledger takes the next free number in its block.',
  scheme: [['Scheme explained (meaning of each digit)', 1], ['(a) Groups with codes', 1.5], ['(b) All sixteen ledgers correctly coded', 2.5], ['(c) New ledger added without renumbering', 1]],
}));
check(groupOf(5203) === 'Indirect expenses', 'new ledger lands in indirect expenses');

// trial balance and final accounts from vouchers (long 6)
const BH_ACC = [
  [1101, 'Shop fittings', 'Non-current assets'], [1201, 'Cash in hand', 'Current assets'], [1202, 'Bank account', 'Current assets'], [1203, 'Trade receivables', 'Current assets'],
  [2201, 'Trade payables', 'Current liabilities'], [2202, 'Rent outstanding', 'Current liabilities'],
  [3101, 'Capital', 'Capital and drawings'], [3102, 'Drawings', 'Capital and drawings'],
  [4101, 'Sales', 'Revenue from operations'], [4201, 'Discount received', 'Other income'],
  [5101, 'Purchases', 'Direct expenses'], [5102, 'Carriage inwards', 'Direct expenses'],
  [5201, 'Salaries', 'Indirect expenses'], [5202, 'Rent', 'Indirect expenses'],
];
const BH_V = [
  { no: 'R-01', type: 'Receipt', date: '2026-04-01', lines: [[1202, 400000, 0], [3101, 0, 400000]], text: 'Started business with capital paid into the bank' },
  { no: 'P-01', type: 'Payment', date: '2026-04-02', lines: [[1101, 75000, 0], [1202, 0, 75000]], text: 'Shop fittings bought by cheque' },
  { no: 'C-01', type: 'Contra', date: '2026-04-03', lines: [[1201, 40000, 0], [1202, 0, 40000]], text: 'Cash withdrawn from the bank for the shop' },
  { no: 'PU-01', type: 'Purchase', date: '2026-04-05', lines: [[5101, 260000, 0], [2201, 0, 260000]], text: 'Goods bought on credit' },
  { no: 'P-02', type: 'Payment', date: '2026-04-06', lines: [[5102, 5000, 0], [1201, 0, 5000]], text: 'Carriage on purchases paid in cash' },
  { no: 'S-01', type: 'Sales', date: '2026-04-14', lines: [[1203, 210000, 0], [4101, 0, 210000]], text: 'Goods sold on credit' },
  { no: 'R-02', type: 'Receipt', date: '2026-04-16', lines: [[1201, 95000, 0], [4101, 0, 95000]], text: 'Cash sales' },
  { no: 'P-03', type: 'Payment', date: '2026-04-24', lines: [[2201, 156000, 0], [1202, 0, 152000], [4201, 0, 4000]], text: 'Paid a supplier ₹1,52,000 by cheque in full settlement of ₹1,56,000 owed' },
  { no: 'R-03', type: 'Receipt', date: '2026-04-27', lines: [[1202, 130000, 0], [1203, 0, 130000]], text: 'Received from customers by cheque' },
  { no: 'P-04', type: 'Payment', date: '2026-04-30', lines: [[5201, 28000, 0], [1201, 0, 28000]], text: 'Salaries paid in cash' },
  { no: 'P-05', type: 'Payment', date: '2026-04-30', lines: [[3102, 12000, 0], [1201, 0, 12000]], text: 'Cash withdrawn by the owner for personal use' },
  { no: 'J-01', type: 'Journal', date: '2026-04-30', lines: [[5202, 18000, 0], [2202, 0, 18000]], text: 'Rent for April outstanding' },
];
const BH = cas({ accounts: BH_ACC, vouchers: BH_V, period: ['2026-04-01', '2026-04-30'], cashBank: [1201, 1202], closingStock: 90000 });
check(BH.rejected.length === 0 && BH.tbDr === BH.tbCr, 'Bhima vouchers all valid');
const BH_F = finalTables(BH);
const vText = (v) => `${v.no} (${v.type}, ${Number(v.date.slice(8))} April): ${v.text}${v.text.includes('₹') ? '' : ` — ${rs(sum(v.lines.map((l) => l[1])))}`}`;
check(BH_V[7].lines[0][1] === 156000 && BH_V[7].lines[1][2] + BH_V[7].lines[2][2] === 156000, 'Bhima settlement');
check(BH_V[7].text.includes(rs(BH_V[7].lines[1][2])) && BH_V[7].text.includes(rs(BH_V[7].lines[0][1])), 'Bhima settlement text carries the voucher amounts');
Q('l6_tb_final', long({
  t: 3, d: 5, c: 'application', marks: 6,
  stem: `Mr Prakash Jadhav started an imagined hardware shop, Bhima Hardware, Solapur, on 1 April 2026 and entered these vouchers in his accounting software (codes as in this chapter’s scheme):\n\n${BH_V.map((v) => `- ${vText(v)}.`).join('\n')}\n\nClosing stock on 30 April 2026 was ${rs(BH.closingStock)}. (a) Prepare the trial balance the software will generate as at 30 April 2026, with codes. (b) Prepare the trading and profit and loss account in statement form for April. (c) Give the totals of the balance sheet the software will show.`,
  model: `**(a) Trial balance as at 30 April 2026**\n\n${tbTable(BH)}\n\n**(b)**\n\n${BH_F.trading}\n\n${BH_F.pl}\n\n**(c)** Capital ${fig(BH.capital)} + net profit ${fig(BH.np)} − drawings ${fig(BH.drawings)} = ${fig(BH.capClose)}; with trade payables and rent outstanding the capital and liabilities total ${rs(BH.totL)}, equal to total assets (including closing stock) of ${rs(BH.totA)}.`,
  sol: 'Net each ledger’s debits and credits from the vouchers; the trial balance must agree; closing stock (an adjustment outside the trial balance) enters the trading account and the balance sheet.',
  scheme: [['Ledger balances computed from the vouchers', 1.5], [`Trial balance totals ${rs(BH.tbDr)}`, 1], [`Gross profit ${rs(BH.gp)}`, 1], [`Net profit ${rs(BH.np)}`, 1.5], [`Balance sheet totals ${rs(BH.totA)}`, 1]],
}));

const PO_ACC = [[1201, 'Cash in hand', 'Current assets'], [1202, 'Bank account', 'Current assets'], [2201, 'Trade payables', 'Current liabilities'], [3101, 'Capital', 'Capital and drawings'], [4101, 'Sales', 'Revenue from operations'], [5101, 'Purchases', 'Direct expenses'], [5202, 'Rent', 'Indirect expenses']];
const PO_V = [
  { no: 'R-1', type: 'Receipt', date: '2026-04-01', lines: [[1202, 150000, 0], [3101, 0, 150000]] },
  { no: 'PU-1', type: 'Purchase', date: '2026-04-03', lines: [[5101, 85000, 0], [2201, 0, 85000]] },
  { no: 'R-2', type: 'Receipt', date: '2026-04-11', lines: [[1201, 64000, 0], [4101, 0, 64000]] },
  { no: 'P-1', type: 'Payment', date: '2026-04-20', lines: [[2201, 50000, 0], [1202, 0, 50000]] },
  { no: 'P-2', type: 'Payment', date: '2026-04-30', lines: [[5202, 9000, 0], [1201, 0, 9000]] },
];
const PO = cas({ accounts: PO_ACC, vouchers: PO_V, period: ['2026-04-01', '2026-04-30'], cashBank: [1201, 1202] });
check(PO.tbDr === 249000, 'Pench trial balance');
Q('n_tb_total', num({
  t: 3, d: 3, c: 'application', marks: 2, value: PO.tbDr, unit: '₹',
  stem: `An imagined organic store, Pench Organics, Seoni, made only these entries in April 2026: capital of ${rs(150000)} paid into the bank; goods bought on credit for ${rs(85000)}; cash sales of ${rs(64000)}; ${rs(50000)} paid to the supplier by cheque; rent of ${rs(9000)} paid in cash. What will be the total of each column of the trial balance generated on 30 April 2026?`,
  sol: `Debit balances: bank ${fig(PO.bal.get(1202))} + cash ${fig(PO.bal.get(1201))} + purchases ${fig(PO.bal.get(5101))} + rent ${fig(PO.bal.get(5202))} = ${fig(PO.tbDr)}. Credit balances: capital ${fig(-PO.bal.get(3101))} + sales ${fig(-PO.bal.get(4101))} + trade payables ${fig(-PO.bal.get(2201))} = ${fig(PO.tbCr)}.`,
  scheme: [['Ledger balances', 1], [`Totals ${rs(PO.tbDr)}`, 1]],
}));

const HE = cas({
  accounts: [[1202, 'Bank account', 'Current assets'], [3101, 'Capital', 'Capital and drawings'], [4101, 'Sales', 'Revenue from operations'], [4201, 'Commission received', 'Other income'], [5101, 'Purchases', 'Direct expenses'], [5102, 'Wages', 'Direct expenses'], [5201, 'Salaries', 'Indirect expenses'], [5203, 'Electricity charges', 'Indirect expenses']],
  period: ['2026-04-01', '2026-04-30'], cashBank: [1202], closingStock: 48000,
  vouchers: [
    { no: 'R-1', type: 'Receipt', date: '2026-04-01', lines: [[1202, 300000, 0], [3101, 0, 300000]] },
    { no: 'P-1', type: 'Payment', date: '2026-04-02', lines: [[5101, 182000, 0], [1202, 0, 182000]] },
    { no: 'P-2', type: 'Payment', date: '2026-04-15', lines: [[5102, 14000, 0], [1202, 0, 14000]] },
    { no: 'R-2', type: 'Receipt', date: '2026-04-20', lines: [[1202, 206000, 0], [4101, 0, 206000]] },
    { no: 'R-3', type: 'Receipt', date: '2026-04-25', lines: [[1202, 7500, 0], [4201, 0, 7500]] },
    { no: 'P-3', type: 'Payment', date: '2026-04-30', lines: [[5201, 24000, 0], [1202, 0, 24000]] },
    { no: 'P-4', type: 'Payment', date: '2026-04-30', lines: [[5203, 3500, 0], [1202, 0, 3500]] },
  ],
});
check(HE.gp === 58000 && HE.np === 38000, 'Hasdeo profits');
Q('n_np', num({
  t: 3, d: 3, c: 'application', marks: 2, value: HE.np, unit: '₹',
  stem: `The trial balance generated for an imagined electrical contractor, Hasdeo Electricals, Korba, for April 2026 shows: sales ${rs(206000)}; commission received ${rs(7500)}; purchases ${rs(182000)}; wages ${rs(14000)}; salaries ${rs(24000)}; electricity charges ${rs(3500)}. Closing stock is ${rs(HE.closingStock)}. What net profit will the profit and loss account generated by the software show?`,
  sol: `Gross profit = ${fig(206000)} + closing stock ${fig(HE.closingStock)} − purchases ${fig(182000)} − wages ${fig(14000)} = ${fig(HE.gp)}. Net profit = ${fig(HE.gp)} + ${fig(7500)} − ${fig(24000)} − ${fig(3500)} = ${fig(HE.np)}.`,
  scheme: [[`Gross profit ${rs(HE.gp)}`, 1], [`Net profit ${rs(HE.np)}`, 1]],
}));

FACTS.push(
  `Indravati overdraft: pass book ${fig(-IT.pb)}, cash book ${fig(-IT.cb)} (books summed independently, statement and sheet both reach it)`,
  `Chenab straight-line total ${fig(CH_slTot)}, written-down total ${fig(CH_wdTot)}`,
  `Ken loan instalment ${fig(KL.emi)}, closing balance ${fig(KL.residual)}`,
  `Bhima trial balance ${fig(BH.tbDr)}, net profit ${fig(BH.np)}, balance sheet ${fig(BH.totA)}`,
  `Sutlej vouchers: 3 of 3 refused, each for its own rule`,
);
export { FACTS };
