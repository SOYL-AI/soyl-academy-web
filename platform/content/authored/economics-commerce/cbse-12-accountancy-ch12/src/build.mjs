// Build CBSE 12 Accountancy ch12 Computerised Accounting (alternative to Part B). Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-12-accountancy-ch12', 'economics-commerce');
const { fig, rs, rupees, words, spoken, check, sum, md, code, Sheet, shiftFormula, brs, brsTable, slm, wdv, ddb, loan, loanTable, cas, tbTable, finalTables, num } = await import('./acc.mjs');
const { FACTS, GROUPS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- Part 1 case: Chambal Stationery Mart (imagined, Kota)
const CH_ACC = [
  [1101, 'Furniture and fittings', 'Non-current assets'], [1102, 'Computers and printers', 'Non-current assets'],
  [1201, 'Cash in hand', 'Current assets'], [1202, 'Bank account', 'Current assets'], [1203, 'Trade receivables', 'Current assets'],
  [2101, 'Long-term loan from bank', 'Non-current liabilities'], [2201, 'Trade payables', 'Current liabilities'], [2202, 'Salaries outstanding', 'Current liabilities'],
  [3101, 'Capital (Ms Rekha Meena)', 'Capital and drawings'], [3102, 'Drawings', 'Capital and drawings'],
  [4101, 'Sales', 'Revenue from operations'], [4201, 'Commission received', 'Other income'],
  [5101, 'Purchases', 'Direct expenses'], [5102, 'Carriage inwards', 'Direct expenses'],
  [5201, 'Salaries', 'Indirect expenses'], [5202, 'Rent', 'Indirect expenses'], [5203, 'Electricity charges', 'Indirect expenses'], [5204, 'Advertisement', 'Indirect expenses'],
];
for (const [c, , g] of CH_ACC) check(GROUPS.find(([gc]) => gc === Math.floor(c / 100) * 100)[1] === g, `Chambal ${c} follows the scheme`);
const V = (no, type, day, lines, text) => ({ no, type, date: `2026-${day.includes('-') ? day : `04-${day}`}`, lines, text });
const CH_V = [
  V('R-01', 'Receipt', '01', [[1202, 600000, 0], [3101, 0, 600000]], 'Capital paid into the bank'),
  V('R-02', 'Receipt', '02', [[1202, 200000, 0], [2101, 0, 200000]], 'Long-term loan received'),
  V('P-01', 'Payment', '03', [[1101, 120000, 0], [1202, 0, 120000]], 'Furniture bought by cheque'),
  V('P-02', 'Payment', '04', [[1102, 90000, 0], [1202, 0, 90000]], 'Computers and printers bought by cheque'),
  V('C-01', 'Contra', '05', [[1201, 60000, 0], [1202, 0, 60000]], 'Cash withdrawn for the shop'),
  V('PU-01', 'Purchase', '06', [[5101, 340000, 0], [2201, 0, 340000]], 'Goods bought on credit'),
  V('P-03', 'Payment', '08', [[5102, 6000, 0], [1201, 0, 6000]], 'Carriage on purchases paid in cash'),
  V('S-01', 'Sales', '12', [[1203, 280000, 0], [4101, 0, 280000]], 'Goods sold on credit'),
  V('R-03', 'Receipt', '15', [[1201, 150000, 0], [4101, 0, 150000]], 'Cash sales'),
  V('R-04', 'Receipt', '18', [[1202, 160000, 0], [1203, 0, 160000]], 'Cheques received from customers'),
  V('P-04', 'Payment', '20', [[2201, 200000, 0], [1202, 0, 200000]], 'Suppliers paid by cheque'),
  V('C-02', 'Contra', '22', [[1202, 100000, 0], [1201, 0, 100000]], 'Cash deposited into the bank'),
  V('P-05', 'Payment', '25', [[5202, 25000, 0], [1202, 0, 25000]], 'Rent paid by cheque'),
  V('P-06', 'Payment', '26', [[5203, 4000, 0], [1201, 0, 4000]], 'Electricity bill paid in cash'),
  V('R-05', 'Receipt', '28', [[1201, 8000, 0], [4201, 0, 8000]], 'Commission received in cash'),
  V('P-07', 'Payment', '29', [[3102, 15000, 0], [1201, 0, 15000]], 'Cash taken by the owner'),
  V('P-08', 'Payment', '30', [[5201, 30000, 0], [1202, 0, 30000]], 'Salaries paid by cheque'),
  V('P-09', 'Payment', '30', [[5204, 12000, 0], [1202, 0, 12000]], 'Advertisement paid by cheque'),
  V('J-01', 'Journal', '30', [[5201, 10000, 0], [2202, 0, 10000]], 'Salaries for April outstanding (adjustment)'),
  // Three vouchers that the software refuses (shown on the validation slide).
  V('P-10', 'Payment', '27', [[5203, 3600, 0], [1201, 0, 6300]], 'Electricity, amounts keyed differently'),
  V('J-02', 'Journal', '28', [[5207, 2500, 0], [1201, 0, 2500]], 'Stationery for office use, code not yet created'),
  V('R-06', 'Receipt', '05-02', [[1201, 9000, 0], [4101, 0, 9000]], 'Cash sales dated 2 May'),
];
const CH = cas({ accounts: CH_ACC, vouchers: CH_V, period: ['2026-04-01', '2026-04-30'], cashBank: [1201, 1202], closingStock: 120000 });
check(CH.ok.length === 19 && CH.rejected.map((v) => v.no).join() === 'P-10,J-02,R-06', 'Chambal: nineteen saved, three refused');
check(CH.tbDr === 1388000 && CH.gp === 204000 && CH.np === 131000 && CH.totA === 1066000, 'Chambal results');
check(CH.bal.get(1201) === 93000 && CH.bal.get(1202) === 523000, 'Chambal cash and bank');
const CH_F = finalTables(CH);
const dayOf = (v) => `${Number(v.date.slice(8))} ${v.date.slice(5, 7) === '04' ? 'April' : 'May'}`;
const ledgerName = (c) => CH.chart.get(c)?.name ?? '(no such ledger)';
const lineText = (ls, side) => ls.filter((l) => l[side] > 0).map((l) => `${l[0]} ${ledgerName(l[0])} ${fig(l[side])}`).join('; ');

// ---------------------------------------------------------------- Part 2 cases
// Pennar Electricals (imagined, Nellore): bank reconciliation.
const PE = brs({
  opening: 120000,
  entries: [
    ['Other deposits in both books', 310000, 'in', true, true],
    ['Other cheques issued and cleared', 260000, 'out', true, true],
    ['Cheques issued but not presented', 45000, 'out', true, false],
    ['Cheques deposited but not yet credited', 32000, 'in', true, false],
    ['Bank charges', 1200, 'out', false, true],
    ['Interest credited by the bank', 2400, 'in', false, true],
    ['Amount paid directly into the bank by a customer', 15000, 'in', false, true],
    ['Insurance premium paid by the bank under standing instructions', 6800, 'out', false, true],
  ],
});
check(PE.cb === 157000 && PE.pb === 179400, 'Pennar books');
const PE_S = new Sheet({
  A1: 'Pennar Electricals: bank reconciliation, 31 March 2026', A3: 'Balance as per cash book', B3: PE.cb,
  A4: 'Add:', A5: 'Cheques issued, not presented', B5: 45000, A6: 'Interest credited by bank', B6: 2400, A7: 'Direct deposit by a customer', B7: 15000, A8: 'Total to add', B8: '=SUM(B5:B7)',
  A9: 'Less:', A10: 'Cheques deposited, not credited', B10: 32000, A11: 'Bank charges', B11: 1200, A12: 'Insurance paid by bank', B12: 6800, A13: 'Total to deduct', B13: '=SUM(B10:B12)',
  A14: 'Balance as per pass book', B14: '=B3+B8-B13', A15: 'Nature of balance', B15: '=IF(B14>=0,"Favourable","Overdraft")',
});
check(PE_S.get('B14') === PE.pb && PE_S.get('B8') === PE.addT && PE_S.get('B13') === PE.lessT, 'Pennar sheet = statement');

// Tapti Printers (imagined, Surat): depreciation.
const TP = { cost: 500000, salvage: 50000, life: 5, rate: 30 };
const TP_SL = slm(TP.cost, TP.salvage, TP.life);
const TP_WD = wdv(TP.cost, TP.rate, TP.life);
const TP_DD = ddb(TP.cost, TP.salvage, TP.life);
const TP_S = new Sheet({
  A1: 'Cost', B1: TP.cost, A2: 'Salvage', B2: TP.salvage, A3: 'Life', B3: TP.life, A4: 'Rate', B4: `${TP.rate}%`,
  A6: 'Year', B6: 'Straight-line charge', C6: 'Straight-line value', D6: 'Written-down charge', E6: 'Written-down value',
  ...Object.fromEntries([7, 8, 9, 10, 11].flatMap((r, i) => [
    [`A${r}`, i + 1],
    [`B${r}`, '=SLN(Cost,Salvage,Life)'],
    [`C${r}`, i === 0 ? '=Cost-B7' : `=C${r - 1}-B${r}`],
    [`D${r}`, i === 0 ? '=ROUND(Cost*Rate,0)' : `=ROUND(E${r - 1}*Rate,0)`],
    [`E${r}`, i === 0 ? '=Cost-D7' : `=E${r - 1}-D${r}`],
  ])),
}, { Cost: 'B1', Salvage: 'B2', Life: 'B3', Rate: 'B4' });
[7, 8, 9, 10, 11].forEach((r, i) => check(TP_S.get(`C${r}`) === TP_SL.rows[i].close && TP_S.get(`E${r}`) === TP_WD.rows[i].close, `Tapti row ${r}`));
const TP_DS = new Sheet({ B1: TP.cost, B2: TP.salvage, B3: TP.life, ...Object.fromEntries([1, 2, 3, 4, 5].map((y) => [`D${y}`, `=DDB(B1,B2,B3,${y})`])) });
TP_DD.rows.forEach((x, i) => check(TP_DS.get(`D${i + 1}`) === x.dep, `Tapti DDB ${i + 1}`));
check(TP_DD.rows[4].dep < (TP_DD.rows[4].open * 2) / TP.life, 'Tapti DDB last year capped');

// Kosi Cold Storage (imagined, Purnia): loan schedule.
const KO = loan(300000, 12, 5, 12);
check(KO.emi === 61812 && KO.residual === 0, 'Kosi loan');
const KO_S = new Sheet({
  A1: 'Loan', B1: 300000, A2: 'Rate per year', B2: '12%', A3: 'Months', B3: 5, A4: 'Instalment', B4: '=ROUND(PMT(B2/12,B3,-B1),0)',
  ...Object.fromEntries([7, 8, 9, 10, 11].flatMap((r, i) => [[`A${r}`, i + 1], [`B${r}`, i === 0 ? '=Loan' : `=F${r - 1}`], [`C${r}`, '=EMI'], [`D${r}`, `=ROUND(B${r}*Rate/12,0)`], [`E${r}`, `=C${r}-D${r}`], [`F${r}`, `=B${r}-E${r}`]])),
  A6: 'Month', B6: 'Opening', C6: 'Instalment', D6: 'Interest', E6: 'Principal', F6: 'Closing',
}, { Loan: 'B1', Rate: 'B2', EMI: 'B4' });
KO.rows.forEach((x, i) => check(KO_S.get(`D${7 + i}`) === x.interest && KO_S.get(`F${7 + i}`) === x.close, `Kosi row ${i + 1}`));

// Palar Leather Works (imagined, Vellore): ratios and charts.
const PL = { ca: 960000, inv: 360000, cl: 480000, rev: 4800000, gp: 1200000, debt: 600000, sf: 2000000 };
const PL_S = new Sheet({
  A1: 'Current assets', B1: PL.ca, A2: 'Inventories', B2: PL.inv, A3: 'Current liabilities', B3: PL.cl, A4: 'Revenue from operations', B4: PL.rev, A5: 'Gross profit', B5: PL.gp, A6: 'Long-term debt', B6: PL.debt, A7: "Shareholders' funds", B7: PL.sf,
  A9: 'Current ratio', B9: '=ROUND(B1/B3,2)', A10: 'Quick ratio', B10: '=ROUND((B1-B2)/B3,2)', A11: 'Gross profit ratio (%)', B11: '=ROUND(B5/B4*100,2)', A12: 'Debt-equity ratio', B12: '=ROUND(B6/B7,2)', C12: '=IF(B12>1,"High","Within limit")',
});
check(PL_S.get('B9') === 2 && PL_S.get('B10') === 1.25 && PL_S.get('B11') === 25 && PL_S.get('B12') === 0.3, 'Palar ratios');
const PL_YEARS = [[2023, 3200000, 2900000], [2024, 3800000, 3380000], [2025, 4300000, 3780000], [2026, 4800000, 4170000]];
const PL_PROFIT = PL_YEARS.map(([y, r, e]) => [y, r - e]);
check(PL_PROFIT.map((x) => x[1]).join() === '300000,420000,520000,630000', 'Palar profits');

// Spreadsheet basics: an invoice of Palar Leather Works.
const INV = new Sheet({
  A1: 'Item', B1: 'Quantity', C1: 'Rate (₹)', D1: 'Amount (₹)',
  A2: 'Office bags', B2: 40, C2: 850, D2: '=B2*C2',
  A3: 'Belts', B3: 120, C3: 210, D3: shiftFormula('=B2*C2', 1, 0),
  A4: 'Wallets', B4: 90, C4: 260, D4: shiftFormula('=B2*C2', 2, 0),
  A5: 'Total', D5: '=SUM(D2:D4)',
  A6: 'Discount (2% above ₹50,000)', D6: '=IF(D5>=50000,ROUND(D5*2%,0),0)',
  A7: 'Amount payable', D7: '=D5-D6',
});
check(INV.get('D5') === 34000 + 25200 + 23400 && INV.get('D6') === 1652 && INV.get('D7') === 80948, 'invoice');
// The chart-of-accounts lookup used on the lookup slide (codes from Chambal).
const LKP = new Sheet({
  A1: 'Code', B1: 'Ledger', C1: 'Group',
  ...Object.fromEntries([1202, 2201, 4101, 5201, 5202].flatMap((c, i) => [[`A${i + 2}`, c], [`B${i + 2}`, CH.chart.get(c).name], [`C${i + 2}`, CH.chart.get(c).group]])),
  E1: 'Code typed', F1: 'Ledger found', G1: 'Group found', E2: 5201, F2: '=VLOOKUP(E2,A2:C6,2,FALSE)', G2: '=VLOOKUP(E2,A2:C6,3,FALSE)',
});
check(LKP.get('F2') === 'Salaries' && LKP.get('G2') === 'Indirect expenses', 'lookup');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['What a computerised system is', 'Components and structure', 'Features and limits', 'Types of software', 'Codes, ledgers and vouchers', 'Reports and security'], 'Route map of Part 1: what a computerised accounting system is, its components and structure, features and limitations, types of software, codes ledgers and vouchers, and reports and security', 'Part 1 at a glance');
const vManualCas = table(
  ['Stage', 'Manual accounting', 'Computerised accounting'],
  [
    ['Identifying', 'Source documents examined', 'Source documents examined (same)'],
    ['Recording', 'Journal and subsidiary books written by hand', 'Voucher keyed in once and saved in a database'],
    ['Classifying', 'Posting to ledger accounts by hand', 'No posting: ledgers drawn from stored vouchers'],
    ['Summarising', 'Ledgers balanced; trial balance drawn up', 'Trial balance generated at any moment'],
    ['Final accounts', 'Prepared by hand after adjustments', 'Generated from grouped ledger balances'],
    ['Closing', 'Closing entries passed by hand', 'Year-end processing carries balances forward'],
  ],
  'Table comparing manual and computerised accounting stage by stage: identifying, recording, classifying, summarising, final accounts and closing',
  'Only recording needs a person to act; the rest is done by the program.',
);
const vComponents = table(
  ['Component', 'What it is', 'At Chambal Stationery Mart (imagined)'],
  [
    ['Procedure', 'The laid-down steps for collecting, entering, checking and reporting', 'Bills are entered the same day; reports printed every Saturday'],
    ['Data', 'Transactions and master records: ledgers, groups, codes', 'Nineteen vouchers in April, eighteen ledgers'],
    ['People', 'Users who enter, check and use the records', 'The owner and one accounts assistant'],
    ['Hardware', 'Computers, printers, storage, network', 'One desktop, a printer and a backup drive'],
    ['Software', 'Accounting programs and the database', 'A ready-to-use accounting package'],
  ],
  'Table of the five components of a computerised accounting system, procedure, data, people, hardware and software, with an example of each from the imagined Chambal Stationery Mart',
);
check(CH.ok.length === 19 && CH.chart.size === 18, 'components slide counts');
const vStructure = flow('LR', ['Source documents', 'Input: vouchers with codes', 'Processing: validate, store, update accounts', 'Database of transactions and masters', 'Output: ledgers, trial balance, final accounts, reports'], 'Flow of a transaction through a computerised accounting system: source document, input as a voucher with codes, processing which validates stores and updates, the database, and output as ledgers, trial balance, final accounts and reports', 'Structure: input → processing → output, around one database.');
const vFeatures = table(
  ['Feature or advantage', 'What it means for the business'],
  [
    ['Speed and real-time information', 'Balances and reports are ready the moment vouchers are entered'],
    ['Accuracy', 'Totals and balances are computed; unbalanced vouchers are refused'],
    ['Reliability and consistency', 'The same rules are applied to every transaction'],
    ['Reports for management', 'Ageing of debtors, stock, cash and budget reports from the same records'],
    ['Storage and retrieval', 'Years of records kept compactly and searched in seconds'],
    ['Scalability', 'More transactions need little extra staff'],
    ['Legibility', 'No illegible handwriting or overwriting'],
  ],
  'Table of features and advantages of computerised accounting: speed and real-time information, accuracy, reliability, management reports, storage and retrieval, scalability and legibility',
);
const vLimits = table(
  ['Limitation', 'Why it matters'],
  [
    ['Cost of installation and training', 'Hardware, licences, maintenance and staff training cost money'],
    ['Staff resistance and disruption', 'Fear of change; work slows while two systems run side by side'],
    ['System failure', 'A crash, power cut or virus can stop all work without backups'],
    ['Errors it cannot catch', 'A wrong ledger or an omitted voucher still balances'],
    ['Security breaches', 'Records can be altered or stolen if access is not controlled'],
    ['Health effects', 'Long hours at screens strain eyes and posture'],
  ],
  'Table of limitations of computerised accounting: cost of installation and training, staff resistance, system failure, errors of principle and omission not caught, security breaches and health effects',
);
const vTypes = table(
  ['Basis', 'Ready-to-use', 'Customised', 'Tailor-made'],
  [
    ['Meaning', 'Standard package bought off the shelf', 'Standard package modified for the user', 'Developed for one organisation alone'],
    ['Suits', 'Small firms with standard needs', 'Medium firms with some special needs', 'Large organisations with unique processes'],
    ['Cost', 'Low', 'Medium', 'High'],
    ['Training needed', 'Little', 'Moderate', 'Extensive'],
    ['Secrecy', 'Low (widely sold)', 'Medium', 'High'],
    ['Fit with the business', 'Limited', 'Good', 'Exact'],
  ],
  'Table comparing ready-to-use, customised and tailor-made accounting software on meaning, the businesses they suit, cost, training, secrecy and fit',
);
const vChoose = table(
  ['Factor', 'Question to ask'],
  [
    ['Flexibility', 'Can new features, branches or reports be added later?'],
    ['Cost of installation and maintenance', 'Price, licences, upgrades and support for the years ahead'],
    ['Size of the organisation', 'How many transactions, users and locations?'],
    ['Ease of adaptation and training', 'How quickly can staff learn it?'],
    ['Utility and reports', 'Does it produce the statements and analysis management needs?'],
    ['Secrecy expected', 'How tightly must programs and records be protected?'],
    ['Exporting data', 'Can records move to spreadsheets or other systems?'],
  ],
  'Table of factors in choosing accounting software: flexibility, cost of installation and maintenance, size of the organisation, ease of training, utility of reports, expected secrecy and exporting data',
);
const vCodeMethods = table(
  ['Method', 'How codes are given', 'Example'],
  [
    ['Sequential', 'One after another as accounts are opened', '101 Cash, 102 Bank, 103 Sales …'],
    ['Block', 'Each group gets a block of numbers with spare numbers', '5200–5299 indirect expenses: 5202 Rent'],
    ['Mnemonic', 'Letters that recall the account name', 'SAL salaries, ELE electricity, DRS debtors'],
  ],
  'Table of three methods of codification: sequential codes, block codes and mnemonic codes, with an example of each',
  'This chapter uses a four-digit block (hierarchical) scheme.',
);
const vScheme = table(
  ['Code', 'Group', 'Ledgers of Chambal Stationery Mart'],
  GROUPS.map(([g, name]) => [String(g), name, CH_ACC.filter(([c]) => Math.floor(c / 100) * 100 === g).map(([c, n]) => `${c} ${n}`).join('; ') || '—']),
  'Coding scheme of Chambal Stationery Mart: nine groups from non-current assets at eleven hundred to indirect expenses at fifty-two hundred, with each ledger numbered inside its group',
  'First digit: primary head; second: group; last two: ledger. Gaps leave room for new ledgers.',
);
const vHierarchy = flow('TB', ['Primary head 1000: Assets', 'Group 1200: Current assets', 'Ledger 1203: Trade receivables', 'Party accounts: individual customers'], 'Hierarchy of account heads: the primary head assets, the group current assets, the ledger trade receivables and the individual party accounts under it', 'Each level sits inside the one above.');
const vVouchers = table(
  ['Voucher type', 'Used for', 'Example at Chambal'],
  [
    ['Receipt', 'Money received into cash or bank', 'R-03 cash sales'],
    ['Payment', 'Money paid out of cash or bank', 'P-05 rent by cheque'],
    ['Contra', 'Movement between cash and bank only', 'C-01 cash withdrawn'],
    ['Journal', 'Non-cash entries and adjustments', 'J-01 salaries outstanding'],
    ['Sales', 'Credit sales', 'S-01 goods sold on credit'],
    ['Purchase', 'Credit purchases', 'PU-01 goods bought on credit'],
  ],
  'Table of voucher types in accounting software, receipt, payment, contra, journal, sales and purchase, with what each is used for and an example',
);
const vValidation = table(
  ['Voucher', 'Date', 'Debit', 'Credit', 'Software response'],
  CH.rejected.map((v) => [v.no, dayOf(v), lineText(v.lines, 1), lineText(v.lines, 2), `Refused: ${v.why.join('; ')}`]),
  'Table of three vouchers refused by the software: one whose debit and credit amounts differ, one using a code not in the chart of accounts, and one dated outside the open period',
  'Validation stops these errors at the door; the other nineteen vouchers were saved.',
);
const vWE1 = table(
  ['Voucher', 'Type', 'Date', 'Debit', 'Credit'],
  CH.ok.slice(0, 10).map((v) => [v.no, v.type, dayOf(v), lineText(v.lines, 1), lineText(v.lines, 2)]),
  'The first ten of the nineteen vouchers of Chambal Stationery Mart for April, from capital paid into the bank to cheques received from customers, each with its codes',
  'Ten of nineteen vouchers shown; codes from the scheme on the previous slide.',
);
const vTB = table(['Code', 'Ledger account', 'Debit (₹)', 'Credit (₹)'], [...CH.tb.map((x) => [String(x.code), x.name, x.dr ? fig(x.dr) : '', x.cr ? fig(x.cr) : '']), ['', '**Total**', `**${fig(CH.tbDr)}**`, `**${fig(CH.tbCr)}**`]],
  `Trial balance of Chambal Stationery Mart as at thirtieth April generated from nineteen vouchers: eighteen ledger balances with debit and credit totals of ${fig(CH.tbDr)} each`,
  'Generated, not prepared: the totals agree because every saved voucher balanced.',
);
const vFinal = table(['Particulars', '₹'], [...CH_F.rows.trading, ...CH_F.rows.pl.slice(1)],
  `Trading and profit and loss account of Chambal Stationery Mart for April in statement form: sales ${fig(CH.sales)}, gross profit ${fig(CH.gp)} after closing stock of ${fig(CH.closingStock)}, and net profit ${fig(CH.np)}`,
  `Balance sheet total: ${rs(CH.totA)} on both sides.`,
);
const vSecurity = table(
  ['Security feature', 'Protects against'],
  [
    ['Passwords for each user', 'Use by outsiders'],
    ['User rights (view, enter, alter)', 'Staff doing more than their job allows'],
    ['Audit trail of every change', 'Hidden alteration or deletion of vouchers'],
    ['Regular backup and restore', 'Loss of records in a crash or theft'],
    ['Locking a closed period', 'Changes to accounts already finalised'],
    ['Encryption of stored records', 'Reading of records if the disk is stolen'],
  ],
  'Table of security features of accounting software: passwords, user rights, audit trail, backup and restore, locking a closed period and encryption, with what each protects against',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Computerised accounting system', 'Software + database; record once, report any time'],
    ['Components', 'Procedure, data, people, hardware, software'],
    ['Software types', 'Ready-to-use (small), customised (medium), tailor-made (large)'],
    ['Codification', 'Sequential, block, mnemonic; here 4-digit block codes'],
    ['Vouchers', 'Receipt, payment, contra, journal, sales, purchase'],
    ['Validation', 'Debits = credits, known codes, date in period, right voucher type'],
    ['Reports', 'Ledgers, trial balance, final accounts generated on demand'],
  ],
  'Summary table of Part 1: meaning, components, software types, codification, vouchers, validation and reports of a computerised accounting system',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Cells, formulas, references', 'Functions', 'Bank reconciliation', 'Depreciation schedules', 'Loan schedules', 'Ratios and charts'], 'Route map of Part 2: cells formulas and references, functions, bank reconciliation, depreciation schedules, loan schedules, and ratios and charts', 'Part 2 at a glance');
const vInvoice = table(INV.table(['A', 'B', 'C', 'D'], [1, 2, 3, 4, 5, 6, 7]).headers, INV.table(['A', 'B', 'C', 'D'], [1, 2, 3, 4, 5, 6, 7]).rows,
  `A spreadsheet invoice of the imagined Palar Leather Works: each amount is quantity times rate, the total uses the sum function, a two per cent discount is given by an if test, and the amount payable is ${fig(INV.get('D7'))}`,
  'Each formula cell shows the formula and, after the arrow, what the cell displays.',
);
const vFunctions = table(
  ['Function', 'What it returns', 'Used in this chapter for'],
  [
    [code('SUM(range)'), 'Total of the numbers in the range', 'Adding items in a reconciliation'],
    [code('IF(test, if true, if false)'), 'One of two results, by a test', 'Labelling a balance favourable or overdraft'],
    [code('ROUND(number, digits)'), 'Number rounded half away from zero', 'Rupee interest; ratios to two decimals'],
    [code('PMT(rate, periods, amount)'), 'Equal instalment per period', 'Loan instalments'],
    [code('SLN(cost, salvage, life)'), 'Straight-line depreciation per year', 'Depreciation schedules'],
    [code('DDB(cost, salvage, life, period)'), 'Double declining balance charge for a period', 'Depreciation schedules'],
    [code('VLOOKUP(value, table, column, FALSE)'), 'Item from the matching row of a table', 'Finding a ledger from its code'],
  ],
  'Table of spreadsheet functions used in accounting: sum, if, round, payment, straight-line, double declining balance and vertical lookup, with what each returns and where it is used',
  'FALSE in VLOOKUP asks for an exact match.',
);
const RC_rows = [2, 3, 4];
const vCopy = table(
  ['Cell', 'Formula (typed in D2, then copied)', 'Shows'],
  RC_rows.map((r) => [`D${r}`, code(INV.cells[`D${r}`]), num(INV.get(`D${r}`))]),
  'Table showing a relative formula copied down: quantity times rate in D2 becomes the matching formula in D3 and D4, each multiplying its own row',
  'Relative references move with the copy. A rate kept in one cell must be locked (a dollar sign before the column letter and the row number) or given a name.',
);
check(INV.cells.D3 === '=B3*C3' && INV.cells.D4 === '=B4*C4', 'copy demo');
const vLookup = table(LKP.table(['A', 'B', 'C', 'E', 'F', 'G'], [1, 2, 3, 4, 5, 6]).headers, LKP.table(['A', 'B', 'C', 'E', 'F', 'G'], [1, 2, 3, 4, 5, 6]).rows,
  'A lookup on part of the chart of accounts: typing code fifty-two oh one finds the ledger salaries and the group indirect expenses',
  'The code must be in the first column of the table.',
);
const vCauses = table(
  ['Cause of difference', 'Recorded in', 'Starting from the cash book balance'],
  [
    ['Cheques issued but not presented', 'Cash book only', 'Add'],
    ['Cheques deposited but not yet credited', 'Cash book only', 'Deduct'],
    ['Interest credited, direct deposits, dividends collected', 'Pass book only', 'Add'],
    ['Bank charges, interest on overdraft, standing-instruction payments', 'Pass book only', 'Deduct'],
    ['Cheque deposited and later dishonoured', 'Pass book (debited back) only', 'Deduct'],
  ],
  'Table of the causes of difference between the cash book and the pass book and whether each is added or deducted when starting from the cash book balance',
  'With an overdraft, every item moves the other way.',
);
const vBRS = table(PE_S.table(['A', 'B'], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).headers, PE_S.table(['A', 'B'], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).rows,
  `Bank reconciliation of Pennar Electricals in a spreadsheet: cash book balance ${fig(PE.cb)}, add ${fig(PE.addT)}, deduct ${fig(PE.lessT)}, giving a pass book balance of ${fig(PE.pb)}, labelled favourable by an if test`,
  'The same figure is reached by adding up the pass book on its own.',
);
const vDep = table(['Row', 'Year', 'Straight-line charge (₹)', 'Straight-line value (₹)', 'Written-down charge (₹)', 'Written-down value (₹)'], [
  ...TP_S.table(['A', 'B', 'C', 'D', 'E'], [7, 8, 9, 10, 11], 'value').rows,
  ['Formula (row 8)', '', code(TP_S.cells.B8), code(TP_S.cells.C8), code(TP_S.cells.D8), code(TP_S.cells.E8)],
],
  `Depreciation schedules of a printing machine of Tapti Printers costing ${fig(TP.cost)}: straight line gives ${fig(TP_SL.dep)} a year down to the salvage value of ${fig(TP.salvage)}; written-down value at thirty per cent falls to ${fig(TP_WD.rows[4].close)}`,
  'Cells B1 to B4 are named Cost, Salvage, Life and Rate.',
);
const vDepPlot = {
  kind: 'plot',
  spec: {
    x: { min: 0, max: 5, label: 'Year' },
    y: { min: 0, max: 520, label: 'Book value (₹ thousand)' },
    functions: [],
    points: [],
    series: [
      { label: 'Straight line', points: [[0, TP.cost / 1000], ...TP_SL.rows.map((r) => [r.y, r.close / 1000])], kind: 'line' },
      { label: 'Written-down value, 30%', points: [[0, TP.cost / 1000], ...TP_WD.rows.map((r) => [r.y, r.close / 1000])], kind: 'line' },
      { label: 'Double declining balance', points: [[0, TP.cost / 1000], ...TP_DD.rows.map((r) => [r.y, r.close / 1000])], kind: 'line' },
    ],
    hlines: [{ y: TP.salvage / 1000, label: 'Salvage', dashed: true }],
    grid: true,
  },
  alt: `Line chart of the book value of the Tapti machine over five years: the straight line falls evenly to fifty thousand, the written-down value falls steeply at first and ends near eighty-four thousand, and the double declining balance falls fastest and stops at the salvage value of fifty thousand`,
  caption: `Double declining balance charges: ${TP_DD.rows.map((r) => fig(r.dep)).join(', ')}; the last is cut to stop at salvage.`,
};
const vLoan = table(['Row', 'Month', 'Opening (₹)', 'Instalment (₹)', 'Interest (₹)', 'Principal (₹)', 'Closing (₹)'], [
  ...KO.rows.map((x, i) => [String(7 + i), String(x.k), fig(x.open), fig(x.emi), fig(x.interest), fig(x.prin), fig(x.close)]),
  ['Formula (row 8)', '', code(KO_S.cells.B8), code(KO_S.cells.C8), code(KO_S.cells.D8), code(KO_S.cells.E8), code(KO_S.cells.F8)],
],
  `Loan repayment schedule of Kosi Cold Storage: a loan of ${fig(300000)} at twelve per cent a year repaid in five monthly instalments of ${fig(KO.emi)}; interest falls from ${fig(KO.rows[0].interest)} to ${fig(KO.rows[4].interest)} and the balance reaches zero`,
  `Instalment in B4: ${code(KO_S.cells.B4)} = ${fig(KO.emi)}; B1, B2 and B4 are named Loan, Rate and EMI.`,
);
const vRatios = table(PL_S.table(['A', 'B', 'C'], [9, 10, 11, 12]).headers, PL_S.table(['A', 'B', 'C'], [9, 10, 11, 12]).rows,
  `Ratio formulas of Palar Leather Works: current ratio ${PL_S.get('B9')}, quick ratio ${PL_S.get('B10')}, gross profit ratio ${PL_S.get('B11')} per cent and debt-equity ${PL_S.get('B12')}, with an if test comment`,
  `Figures in B1 to B7: current assets ${fig(PL.ca)}, inventories ${fig(PL.inv)}, current liabilities ${fig(PL.cl)}, revenue ${fig(PL.rev)}, gross profit ${fig(PL.gp)}, debt ${fig(PL.debt)}, shareholders' funds ${fig(PL.sf)}.`,
);
const vCharts = table(
  ['Chart', 'Best for', 'Accounting example'],
  [
    ['Column / bar', 'Comparing amounts across items or years', 'Revenue of four branches'],
    ['Line', 'Trend over time', 'Monthly sales for two years'],
    ['Pie', 'Parts of one whole', 'Share of each expense in total cost'],
    ['Stacked column', 'Parts of a whole across periods', 'Cost split for each of four years'],
    ['Scatter', 'Relation between two measures', 'Advertisement spend against sales'],
  ],
  'Table for choosing a chart: column or bar to compare, line for trends, pie for parts of a whole, stacked column for parts across periods, and scatter for the relation between two measures',
);
const vRevChart = {
  kind: 'plot',
  spec: {
    x: { min: 2022.4, max: 2026.6, label: 'Year ended 31 March' },
    y: { min: 0, max: 700, label: 'Net profit (₹ thousand)' },
    functions: [],
    points: [],
    series: [{ label: 'Net profit', points: PL_PROFIT.map(([y, p]) => [y, p / 1000]), kind: 'bar' }],
    grid: true,
  },
  alt: `Column chart of the net profit of Palar Leather Works for four years rising from ${words(PL_PROFIT[0][1] / 1000)} thousand to ${words(PL_PROFIT[3][1] / 1000)} thousand rupees`,
  caption: `Net profit = revenue − expenses: ${PL_YEARS.map(([y, r, e]) => `${y}: ${fig(r)} − ${fig(e)}`).join('; ')}.`,
};
const vSummary2 = table(
  ['Application', 'Key formula pattern'],
  [
    ['Bank reconciliation', `${code('=B3+B8-B13')} with totals by ${code('SUM')} and a label by ${code('IF')}`],
    ['Depreciation', `${code('=SLN(Cost,Salvage,Life)')}; ${code('=ROUND(opening*Rate,0)')}; ${code('DDB')}`],
    ['Loan schedule', `${code('=ROUND(PMT(rate/12,months,-loan),0)')}; interest on opening; principal = instalment − interest`],
    ['Ratio analysis', `${code('=ROUND(B1/B3,2)')} and ${code('IF')} for a comment`],
    ['Charts', 'Column to compare, line for trends, pie for shares'],
  ],
  'Summary table of Part 2: formula patterns for bank reconciliation, depreciation, loan schedules and ratio analysis, and the choice of charts',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Computerised Accounting — Part 1: The Computerised Accounting System and How to Use It',
  goals: [
    'Explain the meaning, components and structure of a computerised accounting system and compare it with manual accounting',
    'State the features, advantages and limitations of computerised accounting',
    'Distinguish ready-to-use, customised and tailor-made software and choose one for a business',
    'Design a coding scheme, create groups and ledgers, enter and validate vouchers, and generate the trial balance and final accounts',
  ],
  slides: [
    sl('title', 'Computerised Accounting', {
      b: 'Part 1 — the **computerised accounting system**: what it is, what it needs, which software to choose, and how a business uses it from **codes** to **final accounts**. Software is described generically.',
      v: vRoute1,
      n: 'This chapter is the alternative to analysis of financial statements in part B of your paper. In this first part we learn what a computerised accounting system is, what it is made of, its strengths and limits, and the kinds of software a business can choose. Then we follow an imagined shop, Chambal Stationery Mart, from setting up its account codes to printing its final accounts.',
    }),
    sl('concept', 'Manual and computerised accounting', {
      v: vManualCas,
      n: 'A computerised accounting system keeps the same double entry rules, but the work changes. Each transaction is keyed in once as a voucher and saved in a database. There is no separate posting: ledgers, the trial balance and the final accounts are drawn from the stored vouchers whenever they are asked for. Only recording needs a person; classifying and summarising are done by the program.',
    }),
    sl('concept', 'Five components', {
      v: vComponents,
      n: 'Every computerised accounting system has five components. The procedure is the set of steps for collecting, entering and checking records. Data are the transactions and master records such as ledgers and codes. People are the users. Hardware is the computers, printers and storage. Software is the accounting program and its database. Take any one away and the system cannot work.',
    }),
    sl('diagram', 'Structure: input, processing, output', {
      v: vStructure,
      n: 'Follow one transaction. A source document, such as a bill, becomes input when it is keyed in as a voucher with account codes, a date and an amount. Processing checks the voucher, stores it in the database and updates every account it touches. Output is whatever we ask for: a ledger, the trial balance, final accounts or a management report.',
    }),
    sl('check', 'Quick check: is there a posting step?', {
      b: 'True or false?',
      chk: 'tf_posting',
      n: 'Think back to the comparison table. After a voucher is saved, what still has to be done by hand?',
    }),
    sl('concept', 'Features and advantages', {
      v: vFeatures,
      n: 'Why do businesses switch? Reports are ready as soon as vouchers are entered. Totals and balances are computed, so arithmetical slips disappear, and the same rules apply to every transaction. Managers get extra reports, such as which customers owe money for longest. Years of records fit in little space and are found in seconds, and the system grows with the business.',
    }),
    sl('concept', 'Limitations', {
      v: vLimits,
      n: 'There are limits too. Computers, licences and training cost money. Staff may resist the change, and work slows while old and new systems run together. A crash or a virus can stop everything if there is no backup. And the program cannot judge: a voucher debited to the wrong ledger still balances. Records can be misused if access is not controlled.',
    }),
    sl('concept', 'Types of accounting software', {
      v: vTypes,
      n: 'Ready-to-use software is a standard package bought off the shelf. It is cheap, quick to install and easy to learn, and suits small firms. Customised software is a standard package changed to add features a firm needs, which suits medium businesses. Tailor-made software is developed for one organisation alone: costly and slow to build, but an exact fit with high secrecy, so large organisations choose it.',
    }),
    sl('concept', 'Choosing the software', {
      v: vChoose,
      n: 'Before buying, a business weighs several factors. Is the software flexible enough to grow? What will installation and maintenance cost over the years? How large is the organisation, and how many people will use it? How quickly can staff learn it? Does it give the reports managers need? How much secrecy is expected, and can records be exported to other programs?',
    }),
    sl('check', 'Quick check: software for a small grocery', {
      b: 'Choose the most suitable software.',
      chk: 'm_readymade',
      n: 'Look at the size of the shop, its needs and its budget, then match them to a software type.',
    }),
    sl('concept', 'Codification of accounts', {
      v: vCodeMethods,
      n: 'Software works with codes. Codification means giving every account a short, unique code. Sequential codes are simply numbered in the order accounts are opened. Block codes give each group a block of numbers with spare numbers for new accounts. Mnemonic codes are letters that remind us of the name. Good codes speed up entry and let the software group accounts correctly.',
    }),
    sl('example', 'Worked example 1: a coding scheme for Chambal Stationery Mart', {
      b: 'Chambal Stationery Mart (imagined, Kota) starts business on 1 April 2026. Design a four-digit scheme in which the first digit is the primary head, the second the group and the last two the ledger.',
      v: vScheme,
      n: `Here is the scheme. The first digit is the primary head: one for assets, two for liabilities, three for capital, four for income and five for expenses. The second digit is the group, so current assets are twelve hundred and indirect expenses fifty-two hundred. The last two digits number the ledgers, leaving room for up to ninety-nine in each group. Chambal starts with ${words(CH.chart.size)} ledgers.`,
    }),
    sl('diagram', 'The hierarchy of account heads', {
      v: vHierarchy,
      n: 'The codes build a hierarchy. Assets is a primary head. Inside it sits the group current assets, and inside that the ledger trade receivables. Each customer has a party account under that ledger. When the software prepares a balance sheet, it adds ledgers into groups and groups into heads, so a correct code puts each figure in the right place.',
    }),
    sl('check', 'Quick check: reading a code', {
      b: 'Fill in the blank.',
      chk: 'fb_code_digit',
      n: 'Which first digit did the scheme give to expenses?',
    }),
    sl('concept', 'Groups, ledgers and voucher types', {
      v: vVouchers,
      bl: ['Create **groups** under the primary heads, then **ledgers** under groups, each with its code and opening balance.', 'Enter each transaction through the **voucher type** that fits it.'],
      n: 'Once the company is created, the accountant sets up groups and then ledgers inside them, with codes and opening balances. Transactions are entered through vouchers. Receipts bring money into cash or bank, payments take it out, contra entries move money between cash and bank, and journal vouchers carry non-cash entries and adjustments. Credit sales and purchases have their own vouchers.',
    }),
    sl('check', 'Quick check: the right voucher', {
      b: 'Choose the voucher type.',
      chk: 'm_voucher_type',
      n: 'Which two accounts change when cash is drawn from the bank, and what kind of voucher handles only those two?',
    }),
    sl('concept', 'Validation: errors stopped at the door', {
      v: vValidation,
      n: `When a voucher is saved, the software validates it. Debits must equal credits, every code must exist, the date must fall in the open period, and the voucher type must suit the accounts used. Chambal tried to save ${words(CH_V.length)} vouchers; ${words(CH.rejected.length)} were refused, one for unequal amounts, one for an unknown code and one dated in May.`,
    }),
    sl('example', 'Worked example 2: vouchers entered in April', {
      b: `Chambal enters its April transactions. ${CH.ok.length} vouchers pass validation; the first ten are shown. The rest record a cash deposit, rent, electricity, commission, the owner’s drawings, salaries, advertisement and an adjustment for salaries outstanding.`,
      v: vWE1,
      n: `Each voucher names its type, date, and the codes and amounts to be debited and credited. Capital and a bank loan come in first, then furniture, computers, purchases and sales. At the month end a journal voucher records ${rupees(10000)} of salaries still unpaid. Altogether ${words(CH.ok.length)} vouchers are saved, and no ledger is posted by hand.`,
    }),
    sl('example', 'Worked example 3: the trial balance it generates', {
      v: vTB,
      n: `Now we ask for a trial balance. The software adds every saved voucher into its ledger and lists the balances by code. The totals agree at ${rupees(CH.tbDr)}, because no unbalanced voucher was allowed in. Cash in hand is ${rupees(CH.bal.get(1201))} and the bank balance ${rupees(CH.bal.get(1202))}. Notice that agreement does not prove every voucher went to the right ledger.`,
    }),
    sl('example', 'Worked example 3 continued: final accounts', {
      v: vFinal,
      n: `With closing stock of ${rupees(CH.closingStock)} entered, the software prepares the final accounts. Sales of ${rupees(CH.sales)} less purchases and carriage, plus closing stock, give a gross profit of ${rupees(CH.gp)}. Adding commission and taking away salaries, rent, electricity and advertisement leaves a net profit of ${rupees(CH.np)}. The balance sheet totals ${rupees(CH.totA)} on both sides.`,
    }),
    sl('concept', 'Keeping the records safe', {
      v: vSecurity,
      n: 'Because everything sits in one database, security matters. Each user logs in with a password and is given rights: some may only view, others may enter, and only a few may alter. An audit trail records every change with the user and the time. Regular backups allow recovery after a crash, and a closed period can be locked against changes.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a computerised accounting system records each transaction once in a database and produces every report from it. It has five components and runs from input through processing to output. Choose ready-to-use, customised or tailor-made software by size and needs. Code accounts in blocks, enter vouchers of the right type, let validation catch errors, and generate the trial balance and final accounts.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name all **five components**: procedure, data, people, hardware, software.',
        'Compare software types on **cost, size, training, secrecy, fit**.',
        'In a coding scheme, say what **each digit** means and leave **gaps** for new ledgers.',
        'Name the **voucher type** for each transaction: contra for cash ↔ bank only.',
        'A generated trial balance always agrees, but it does **not** prove the right ledgers were used.',
      ],
      n: 'Learn the five components by name. When comparing software types, use clear bases such as cost, size of business, training, secrecy and fit. In a coding question, explain what each digit stands for and show gaps for new ledgers. Name the right voucher for each transaction. And remember that a trial balance from the software always agrees, yet it cannot prove every voucher went to the right ledger.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Computerised Accounting — Part 2: Electronic Spreadsheets in Accounting',
  goals: [
    'Write spreadsheet formulas with relative references, locked references and names, and use SUM, IF, ROUND and VLOOKUP',
    'Prepare a bank reconciliation statement in a spreadsheet',
    'Prepare depreciation schedules with SLN, written-down value formulas and DDB, and a loan schedule with PMT',
    'Compute accounting ratios with formulas and choose a suitable chart for accounting figures',
  ],
  slides: [
    sl('title', 'Electronic spreadsheets in accounting', {
      b: 'Part 2 — **formulas and functions**, and four accounting jobs a spreadsheet does well: **bank reconciliation**, **depreciation**, **loan schedules** and **ratio analysis**, plus **charts**.',
      v: vRoute2,
      n: 'A spreadsheet is a grid of cells in rows and columns. Each cell can hold a label, a number or a formula, and a formula recalculates by itself whenever a figure changes. In this part we learn how formulas and functions work, and then use them for a bank reconciliation, depreciation schedules, a loan repayment schedule, ratio analysis and charts. Every firm is imagined.',
    }),
    sl('concept', 'Cells, formulas and results', {
      v: vInvoice,
      n: 'Here is a small invoice. Columns carry letters and rows carry numbers, so each cell has an address. A formula always begins with an equals sign. Each amount multiplies the quantity by the rate in its own row. The total uses the sum function over a range of cells, and an if test gives a discount only when the total reaches fifty thousand rupees.',
    }),
    sl('concept', 'Functions used in accounting', {
      v: vFunctions,
      n: 'Functions are ready-made formulas. The sum function adds a range. The if function chooses between two results by a test. The round function fixes the number of decimals. The payment function gives a loan instalment. The straight-line and double declining balance functions give depreciation. The vertical lookup function finds a row in a table by its first column and returns an item from it.',
    }),
    sl('concept', 'Relative references, locked references and names', {
      v: vCopy,
      n: 'When a formula is copied, its relative references move with it. That is why one formula for quantity times rate, typed once and copied down, works on every row. But a rate kept in a single cell must not move. Lock it with a dollar sign before the column letter and the row number, or give the cell a name such as Rate.',
    }),
    sl('check', 'Quick check: copying a formula', {
      b: 'Choose the formula the copy will produce.',
      chk: 'm_relative',
      n: 'Count how many rows the formula moves, and move each relative reference by the same number of rows.',
    }),
    sl('concept', 'Looking up a ledger by its code', {
      v: vLookup,
      n: 'The vertical lookup function is handy with a chart of accounts. We give it the code to find, the table to search, the column to return and the word false, which asks for an exact match. Typing the salaries code returns the ledger name in one cell and its group in the next. If the code is missing, the function shows an error.',
    }),
    sl('check', 'Quick check: what will the lookup return?', {
      b: 'Read the table and the column number.',
      chk: 'm_vlookup',
      n: 'Find the row with the code, then count across to the column the formula asks for.',
    }),
    sl('concept', 'Why the cash book and pass book differ', {
      v: vCauses,
      n: 'The cash book and the bank pass book rarely agree on the same day. Some items are in the cash book only, such as cheques issued but not yet presented, or deposited but not yet credited. Others are in the pass book only, such as bank charges, interest and direct deposits. A bank reconciliation statement starts from one balance and adjusts for each of these items.',
    }),
    sl('example', 'Worked example 1: bank reconciliation in a spreadsheet', {
      b: `Pennar Electricals (imagined, Nellore): cash book balance ${rs(PE.cb)} on 31 March 2026. Unpresented cheques ${rs(45000)}; deposits not credited ${rs(32000)}; bank charges ${rs(1200)}; interest credited ${rs(2400)}; direct deposit ${rs(15000)}; insurance paid by the bank ${rs(6800)}.`,
      v: vBRS,
      n: `Pennar's cash book shows ${rupees(PE.cb)}. Three items make the bank's figure larger: unpresented cheques, interest and a direct deposit, which total ${rupees(PE.addT)}. Three make it smaller: uncredited deposits, charges and an insurance premium, totalling ${rupees(PE.lessT)}. The sheet adds the first sum and deducts the second, giving ${rupees(PE.pb)}, and an if test labels it favourable.`,
    }),
    sl('example', 'Worked example 2: depreciation schedules', {
      b: `Tapti Printers (imagined, Surat) buys a printing machine for ${rs(TP.cost)}, with a salvage value of ${rs(TP.salvage)} after ${TP.life} years. Compare the straight-line method with the written-down value method at ${TP.rate}% a year, rounding each charge to the rupee.`,
      v: vDep,
      n: `The straight-line function gives ${rupees(TP_SL.dep)} every year, so the value falls evenly to the salvage value of ${rupees(TP.salvage)}. The written-down column multiplies each opening value by the rate, rounded to the rupee, so the charge falls each year, from ${rupees(TP_WD.rows[0].dep)} to ${rupees(TP_WD.rows[4].dep)}. Each row's opening value is the previous closing value.`,
    }),
    sl('diagram', 'Three methods on one chart', {
      v: vDepPlot,
      n: `The chart shows the book value under three methods. The straight line falls evenly. The written-down value falls steeply at first and never quite reaches the salvage value. The double declining balance function uses twice the straight-line rate, forty per cent here, but in the last year it charges only ${rupees(TP_DD.rows[4].dep)}, so the value stops exactly at salvage.`,
    }),
    sl('check', 'Quick check: rounding interest', {
      b: 'Work out what the cell will show.',
      chk: 'n_formula',
      n: 'Multiply, divide by twelve, then remember how the round function treats an exact half.',
    }),
    sl('example', 'Worked example 3: a loan repayment schedule', {
      b: `Kosi Cold Storage (imagined, Purnia) borrows ${rs(300000)} at 12% a year, repayable in 5 equal monthly instalments. Instalments and interest are rounded to the rupee.`,
      v: vLoan,
      n: `The payment function, with one per cent a month for five months, gives an instalment of ${rupees(KO.emi)}. In each row, interest is one per cent of the opening balance, rounded to the rupee, and the rest of the instalment repays the loan. Interest falls from ${rupees(KO.rows[0].interest)} to ${rupees(KO.rows[4].interest)}, and after the fifth instalment the balance is exactly zero.`,
    }),
    sl('concept', 'Ratio analysis with formulas', {
      v: vRatios,
      n: `Ratios are natural spreadsheet work. Enter the figures once, then each ratio is a division of cell references, wrapped in the round function to two decimals. For Palar Leather Works the current ratio is ${spoken(PL_S.get('B9'))} to one and the quick ratio ${spoken(PL_S.get('B10'))} to one. An if test can add a comment, such as within limit for the debt-equity ratio of ${spoken(PL_S.get('B12'))} to one.`,
    }),
    sl('concept', 'Choosing a chart', {
      v: vCharts,
      n: 'Charts turn figures into pictures. Use a column or bar chart to compare amounts across branches or years, a line chart to show a trend over time, and a pie chart to show how one whole is divided into parts. A stacked column shows parts of a whole across several periods, and a scatter chart shows how two measures move together.',
    }),
    sl('diagram', 'A column chart of profit', {
      v: vRevChart,
      n: `Here a column chart compares the net profit of Palar Leather Works over four years. The spreadsheet subtracts expenses from revenue for each year, and the chart is drawn from those cells, so it changes if a figure changes. Profit rises from ${rupees(PL_PROFIT[0][1])} to ${rupees(PL_PROFIT[3][1])}, which a column chart makes easy to see.`,
    }),
    sl('check', 'Quick check: which chart?', {
      b: 'Choose the chart that fits the purpose.',
      chk: 'm_chart_pie',
      n: 'Is the manager comparing years, showing a trend, or splitting one total into shares?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: formulas begin with an equals sign and recalculate by themselves. Relative references move when copied; a fixed cell needs a lock or a name. Use sum and if for a bank reconciliation, the straight-line function or a rounded rate for depreciation, the payment function for loan instalments, and rounded divisions for ratios. Pick a chart by purpose: compare, trend or share.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write formulas with **cell references**, starting with **=**, and show what each cell displays.',
        'Lock or name a **rate cell** before copying a formula down.',
        'In a loan schedule, check **interest + principal = instalment** in every row.',
        'In a depreciation table, link each **opening value** to the previous **closing value**.',
        'State the **rounding** you use: ROUND(…, 0) for rupees, ROUND(…, 2) for ratios.',
      ],
      n: 'Write every formula with cell references and show the value it produces. Lock or name a rate cell before you copy a formula. In a loan schedule, check that interest plus principal equals the instalment in each row and that the balance ends at zero. In a depreciation table, link each opening value to the last closing value. Always say how you rounded.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Computerised Accounting — Notes',
  sections: [
    {
      h: '1. The computerised accounting system: meaning, components and structure',
      t: 1,
      b: 'A **computerised accounting system** records transactions through accounting software into a **database** and produces ledgers, the trial balance, final accounts and other reports from the stored records whenever they are needed. The double-entry rules do not change; the tools and the order of work do.\n\n**Components (five):** procedure, data, people, hardware, software.\n\n**Structure:** *input* (source documents keyed in as vouchers with codes) → *processing* (validation, storage, updating of accounts) → *output* (ledgers, trial balance, final accounts, management reports), all around one database.\n\n**Manual versus computerised:** identification of transactions is the same; recording becomes voucher entry; there is no separate posting or balancing; the trial balance and final accounts are generated; closing is year-end processing.',
      terms: [
        ['Computerised accounting system', 'A system that records transactions through software into a database and generates accounting reports from it.'],
        ['Database', 'An organised store of records that the software reads and updates.'],
        ['Procedure', 'The laid-down steps for collecting, entering, checking and reporting transactions.'],
      ],
      v: vStructure,
      vs: [vComponents, vManualCas],
    },
    {
      h: '2. Features, advantages and limitations',
      t: 1,
      b: '**Features and advantages:** speed and up-to-date (real-time) information; accuracy, since totals are computed and unbalanced vouchers refused; consistency and reliability; many reports from one set of records (management information); compact storage and quick retrieval; scalability; legible records; security through passwords and backups.\n\n**Limitations:** cost of hardware, software, maintenance and training; staff resistance and disruption during changeover; dependence on the system (failure, power cuts, viruses); errors of principle and omission are not caught by validation; risk of unauthorised access or alteration; health effects of long screen work.',
      terms: [
        ['Real-time information', 'Balances and reports that reflect every voucher as soon as it is entered.'],
        ['Scalability', 'Ability to handle more transactions without a matching rise in staff.'],
      ],
      v: vFeatures,
      vs: [vLimits],
    },
    {
      h: '3. Accounting software: types and how to choose',
      t: 1,
      b: '- **Ready-to-use:** a standard package bought off the shelf; low cost, quick installation, little training; low secrecy and limited flexibility; suits small businesses with standard needs.\n- **Customised:** a standard package modified to meet a user’s extra needs (branches, export invoices, special reports); moderate cost; suits medium businesses.\n- **Tailor-made:** developed specially for one organisation; high cost and long development; extensive training; high secrecy and exact fit; suits large organisations with unique processes.\n\n**Factors in choosing:** flexibility; cost of installation and maintenance; size of the organisation; ease of adaptation and training; utility (reports available); level of secrecy expected for programs and records; ability to export data.',
      terms: [
        ['Ready-to-use software', 'A standard accounting package sold to many users without change.'],
        ['Customised software', 'A standard package modified for a particular user.'],
        ['Tailor-made software', 'Software developed for the specific needs of one organisation.'],
      ],
      v: vTypes,
      vs: [vChoose],
    },
    {
      h: '4. Spreadsheets: cells, formulas, references and functions',
      t: 2,
      b: 'A **spreadsheet** is a grid of **cells** named by column letter and row number (B4). A cell holds a label, a number or a **formula**, which begins with **=** and recalculates whenever a figure it uses changes.\n\n**References:** a **relative** reference (B4) moves when the formula is copied; an **absolute** reference is locked with a dollar sign before the column letter and before the row number, and does not move; a **name** given to a cell (Rate) also always points to that cell. Use a lock or a name for a single rate or constant.\n\n**Functions used:** `SUM`, `IF`, `ROUND` (half away from zero), `PMT` (instalment; negative for a positive loan, so enter the loan as a negative figure), `SLN`, `DDB` (twice the straight-line rate on the opening value, never below salvage), `VLOOKUP` (with FALSE for an exact match on the first column).',
      terms: [
        ['Cell reference', 'The address of a cell, such as B4, used in a formula.'],
        ['Absolute reference', 'A reference that does not change when the formula is copied.'],
        ['Function', 'A ready-made formula such as SUM or PMT that takes arguments and returns a value.'],
      ],
      v: vFunctions,
      vs: [vInvoice, vCopy, vLookup],
    },
    {
      h: '5. Spreadsheet applications: bank reconciliation, depreciation, loans and ratios',
      t: 2,
      b: '**Bank reconciliation statement.** Start from one balance; add the items that make the other book higher and deduct those that make it lower; with an overdraft every item moves the other way. In a sheet, totals are `SUM` ranges and the result is one formula such as `=B3+B8-B13`; an `IF` can label the balance.\n\n**Depreciation (asset accounting).** Straight line: `=SLN(cost, salvage, life)`, equal every year, ending at salvage. Written-down value: charge = `ROUND(opening value × rate, 0)`, opening value = previous closing value. `DDB` charges twice the straight-line rate on the opening value and stops at salvage.\n\n**Loan repayment schedule.** Instalment = `ROUND(PMT(yearly rate ÷ 12, months, −loan), 0)`; each row: interest = `ROUND(opening × rate per period, 0)`, principal = instalment − interest, closing = opening − principal. Check interest + principal = instalment in every row and a closing balance of zero (or a rupee or two of rounding, adjusted in the last instalment).\n\n**Ratio analysis.** Each ratio is a rounded division of cells, for example `=ROUND(B1/B3,2)`; `IF` adds a comment against a benchmark.',
      terms: [
        ['Bank reconciliation statement', 'A statement explaining the difference between the cash book and pass book balances on a date.'],
        ['Loan repayment schedule', 'A table splitting each instalment into interest and principal and showing the balance outstanding.'],
        ['Salvage value', 'The amount expected from an asset at the end of its useful life.'],
      ],
      v: vBRS,
      vs: [vCauses, vDep, vLoan, vRatios],
    },
    {
      h: '6. Representing accounting figures with charts',
      t: 2,
      b: 'A chart is drawn from a range of cells and changes when the figures change.\n- **Column or bar chart:** compare amounts across items, branches or years.\n- **Line chart:** show a trend over time (monthly sales, cash balance).\n- **Pie chart:** show the parts of one whole (share of each expense in total cost).\n- **Stacked column:** parts of a whole across several periods.\n- **Scatter chart:** the relation between two measures.\n\nGive every chart a title, axis titles with units and a legend when there is more than one series.',
      terms: [
        ['Pie chart', 'A circle divided into slices showing each part’s share of one total.'],
        ['Line chart', 'Points joined in time order to show a trend.'],
      ],
      v: vCharts,
      vs: [vRevChart, vDepPlot],
    },
    {
      h: '7. Using a computerised accounting system: codes, ledgers, vouchers and reports',
      t: 3,
      b: '**Steps:** create the company (name, financial year, password) → create groups and ledgers with codes and opening balances → enter vouchers → enter adjustments (closing stock, outstanding and prepaid items) → generate ledgers, trial balance and final accounts → year-end processing.\n\n**Codification** gives each account a unique code. Methods: **sequential**, **block** (a block of numbers per group, with gaps for new accounts) and **mnemonic** (letters). **Hierarchy:** primary head → group → ledger → party accounts. In this chapter: four digits, first = head (1 assets, 2 liabilities, 3 capital, 4 income, 5 expenses), second = group, last two = ledger.\n\n**Vouchers:** receipt, payment, contra (cash ↔ bank only), journal (non-cash and adjustments), sales, purchase.\n\n**Validation** refuses a voucher whose debits and credits differ, that uses an unknown code, that is dated outside the open period, or whose type does not suit its accounts. A generated trial balance always agrees, but it does not prove the right ledgers were used.\n\n**Security:** passwords, user rights, audit trail, backup and restore, locking of closed periods, encryption.',
      terms: [
        ['Codification', 'Giving each account head a unique code that shows its place in the hierarchy.'],
        ['Contra voucher', 'A voucher for movements between cash and bank accounts only.'],
        ['Validation', 'Checks the software applies before saving a voucher.'],
        ['Audit trail', 'A log of every voucher created, altered or deleted, with user and time.'],
      ],
      v: vScheme,
      vs: [vHierarchy, vVouchers, vValidation, vTB, vFinal, vSecurity],
    },
  ],
  tips: '**Common mistakes**\n- Writing a formula without **=**, or with typed figures instead of **cell references**.\n- Copying a formula that uses a single rate cell without locking or naming that cell.\n- Using PMT with the **yearly** rate for **monthly** instalments (divide the rate by 12).\n- Charging written-down depreciation on the **cost** every year instead of the opening book value.\n- Adding instead of deducting in a bank reconciliation that starts from an **overdraft**.\n- Calling a cash-to-bank deposit a receipt or payment voucher (it is **contra**).\n- Claiming that a trial balance that agrees proves the accounts are correct.\n\n**How marks are usually awarded**\n- 1 mark: a function, a voucher type, a software type, one feature or limitation.\n- 3 marks: three features or limitations explained, or a small statement or formula set (1 mark each).\n- 4 marks: a comparison on four bases, or a three-year schedule with formulas.\n- 6 marks: a full bank reconciliation, depreciation or loan schedule with formulas, a coding scheme, or a trial balance with final accounts; formulas and values carry separate marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Computerised accounting system', 'Records transactions through software into a database and generates reports from the stored records.', 'definition', 1],
  ['Five components', 'Procedure, data, people, hardware, software.', 'fact', 1],
  ['Structure of a computerised accounting system', 'Input (vouchers) → processing (validate, store, update) → output (reports).', 'concept', 1],
  ['What disappears in computerised accounting?', 'Separate posting and balancing of ledgers: they are generated from vouchers.', 'concept', 1],
  ['Three advantages', 'Speed and real-time reports; accuracy; many reports from one set of records.', 'fact', 1],
  ['Three limitations', 'Cost and training; staff resistance and disruption; system failure and security risks.', 'fact', 1],
  ['Ready-to-use software', 'Off-the-shelf package: cheap, quick, easy; low secrecy; small firms.', 'definition', 1],
  ['Customised software', 'Standard package modified for a user’s extra needs; medium firms.', 'definition', 1],
  ['Tailor-made software', 'Developed for one organisation; costly; exact fit and high secrecy; large organisations.', 'definition', 1],
  ['Factors in choosing software', 'Flexibility, cost, size, ease of training, reports, secrecy, exporting data.', 'fact', 1],
  ['Spreadsheet formula', 'Begins with = and recalculates when a figure it uses changes.', 'definition', 2],
  ['Relative reference', 'Moves when the formula is copied (B4 becomes B5 one row down).', 'definition', 2],
  ['Absolute reference', 'Locked with a dollar sign before column and row, or replaced by a cell name; does not move.', 'definition', 2],
  ['ROUND', '`ROUND(number, digits)`: rounds half away from zero; 0 digits for rupees, 2 for ratios.', 'definition', 2],
  ['IF', '`IF(test, value if true, value if false)`, e.g. favourable or overdraft.', 'definition', 2],
  ['PMT', '`PMT(rate per period, number of periods, −loan)`: the equal instalment.', 'definition', 2],
  ['SLN', '`SLN(cost, salvage, life)` = (cost − salvage) ÷ life.', 'definition', 2],
  ['DDB', 'Twice the straight-line rate on the opening value; never below salvage.', 'definition', 2],
  ['VLOOKUP', '`VLOOKUP(value, table, column, FALSE)`: exact match in the first column, returns that row’s column.', 'definition', 2],
  ['Bank reconciliation from the cash book', 'Add unpresented cheques and credits by the bank; deduct uncredited deposits and bank debits.', 'exam-tip', 2],
  ['Loan schedule check', 'Interest + principal = instalment in every row; balance ends at zero (or rounding).', 'exam-tip', 2],
  ['Chart for shares of one total', 'Pie chart.', 'fact', 2],
  ['Chart for a trend over time', 'Line chart.', 'fact', 2],
  ['Codification', 'Giving each account a unique code showing its place in the hierarchy.', 'definition', 3],
  ['Three coding methods', 'Sequential, block, mnemonic.', 'fact', 3],
  ['Coding scheme of this chapter', '4 digits: head (1–5), group, then ledger 01–99; 00 = the group.', 'concept', 3],
  ['Hierarchy of account heads', 'Primary head → group → ledger → party accounts.', 'concept', 3],
  ['Contra voucher', 'Cash ↔ bank movements only (deposit, withdrawal).', 'definition', 3],
  ['Validation checks', 'Debits = credits; codes exist; date in open period; voucher type fits.', 'exam-tip', 3],
  ['Security features', 'Passwords, user rights, audit trail, backup, period locking, encryption.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Computerised Accounting',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tailormade', 'm_sln', 'm_validation', 'ar_speed'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions.', items: ['s3_brs', 's3_codification'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_wdv', 'l4_manual_vs_cas'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show formulas and values.', items: [{ attempt: 1, keys: ['l6_loan', 'l6_coding'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Computerised Accounting',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_components', 'm_if', 'm_code_block', 'm_ddb', 'm_brs_effect', 'm_limitation', 'ar_ddb', 'ar_tb'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice.', items: ['s3_emi_rows', 's3_validation', 's3_features', { attempt: 1, keys: ['s3_ratio_formulas', 's3_security'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_copy_error', { attempt: 1, keys: ['l4_software_choice', 'l4_ratios_sheet'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18. Show your workings.', items: ['l6_tb_final', { attempt: 1, keys: ['l6_brs', 'l6_depreciation'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-accountancy-ch12 only (overview of computerised accounting systems; electronic spreadsheets for bank reconciliation, asset accounting, loan schedules, ratio analysis and charts; using a CAS: codification, ledgers, vouchers, validation, trial balance and final accounts); software described generically, no brand names',
    originality: 'every firm, scenario, coding scheme and figure written for this chapter (imagined businesses in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every spreadsheet formula shown is parsed and evaluated (acc.mjs Sheet) and its result asserted; bank reconciliations reach the other book from independently summed books (Pennar ${fig(PE.cb)} to ${fig(PE.pb)}); depreciation rows and loan rows asserted (Kosi instalment ${fig(KO.emi)}, closing ${fig(KO.residual)}); CAS vouchers validated, trial balance agrees and balance sheet balances (Chambal ${fig(CH.tbDr)}, net profit ${fig(CH.np)}); ${FACTS.join('; ')}`,
    facts: 'ROUND rounds half away from zero; PMT is negative for a positive loan amount; DDB never takes book value below salvage; contra vouchers use cash and bank only; a generated trial balance agrees but does not prove correct classification',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
