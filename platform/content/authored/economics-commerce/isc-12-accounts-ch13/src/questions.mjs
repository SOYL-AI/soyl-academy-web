// ISC 12 Accounts, ch13 Accounting Application of Electronic Spreadsheet — question bank. Every firm, school,
// person and figure is imagined by SOYL (firms named after Indian musical instruments); no textbook illustration
// or exercise and no CISCE specimen or past-paper item is reused. Software is described generically. Every
// spreadsheet formula shown is parsed and evaluated by the Sheet engine in acc.mjs, so references, results and
// display formats are checked; payroll, commission, marks and journal sheets are also recomputed row by row in
// plain arithmetic and compared; sorts and filters are run on the records and compared with COUNTIF / SUMIF.
// Keys and model answers are built from the computed values.
import { Q as register, mcq, ar, tf, fb, match, ord, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, code, check, pin, round, num as shownNum, fmt, fmtDate, longDate, serial, colName, rangeSize, freezeAt, Sheet, shiftFormula, sortRecords, filterRecords, recordTable, recordCells, payroll, commission, grade } from './acc.mjs';

const FACTS = [];
/** Every question by id, for the bank-level checks in build.mjs (scheme marks, blueprint fit). */
const BANK = new Map();
function Q(key, proto) {
  const id = register(key, proto);
  BANK.set(id, proto);
  return id;
}
const f = (s, ref) => code(s.cells[ref]);
const pctText = (x) => `${x}%`;

// ================================================================ t01 Meaning, utility, merits and demerits
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Mr Animesh Kar keeps the accounts of an imagined stationery shop, Kartal Copy House, Tamluk, on a computer. Which description fits the electronic spreadsheet he uses?',
  opts: [
    'A grid of rows and columns whose cells hold text, numbers and formulas that recalculate when a figure changes',
    'A program that only stores typed letters and cannot do arithmetic',
    'A printed columnar book in which totals are added by hand',
    'A database that accepts only vouchers in which debits equal credits',
  ],
  sol: 'A spreadsheet is an electronic worksheet of cells identified by column letter and row number; a cell may hold a label, a value or a formula, and formulas update by themselves.',
}));

const SS = new Sheet({ A2: 'Rasgulla (kg)', B2: 120, C2: 260, D2: '=B2*C2', A3: 'Sandesh (kg)', B3: 85, C3: 340, D3: '=B3*C3', A4: 'Total', D4: '=SUM(D2:D3)' });
const SS2 = new Sheet({ ...SS.cells, C2: 280 });
const SS_rise = SS2.get('D4') - SS.get('D4');
check(SS_rise === 120 * 20, 'Santoor rise');
Q('m_recalc', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The owner of an imagined sweet shop, Santoor Sweets, Chinsurah, changes the rate of rasgulla in cell C2 of her sales sheet from ${rs(260)} to ${rs(280)}. The amount in D2 and the total in D4 change at once, from ${rs(SS.get('D4'))} to ${rs(SS2.get('D4'))}. Which merit of an electronic spreadsheet does this show?`,
  opts: ['Automatic recalculation of every formula that depends on the changed cell', 'Protection of the sheet by a password', 'Sorting of records in ascending order', 'Printing of gridlines and headings'],
  sol: `D2 multiplies the quantity by the rate and D4 adds the amounts, so both depend on C2; the rise of ${rs(SS_rise)} flows through without retyping anything.`,
}));

Q('m_demerit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The partners of an imagined tile dealer, Thavil Tiles, Bardhaman, are listing the drawbacks of keeping their books in electronic spreadsheets. Which item on their list is a genuine demerit?',
  opts: [
    'A wrong cell reference in one formula can carry an error silently into every total that uses it',
    'Totals must be added again by hand whenever a figure changes',
    'A sheet cannot hold more than one column of figures',
    'Charts cannot be drawn from figures kept in a sheet',
  ],
  sol: 'A spreadsheet does exactly what its formulas say; it has no built-in double-entry control, so a faulty formula or an overwritten cell can go unnoticed.',
}));

Q('tf_unbalanced', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If the accountant of an imagined cable dealer, Kanjira Cables, types a journal entry into a spreadsheet with a debit of ₹18,000 and a credit of ₹1,800, the spreadsheet refuses to accept the entry, just as accounting software would.',
  sol: 'A spreadsheet accepts whatever is typed; it checks nothing unless the user builds a check, such as an IF formula that compares the debit and credit totals.',
}));

Q('ar_whatif', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The manager of an imagined cashew processor, Chenda Cashews, can use a spreadsheet to see at once how profit would change if the price of raw nuts rose by 8%.',
  r: 'When an input cell is changed, a spreadsheet recalculates every formula that depends on it.',
  sol: 'Both are true. What-if analysis is possible precisely because changing one input cell updates every dependent result.',
}));

Q('ar_always_right', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Because every total in the sales sheet of an imagined firm, Edakka Electricals, is worked out by a formula, the totals in that sheet are always correct.',
  r: 'A formula recalculates its result whenever a cell it refers to is changed.',
  sol: 'R is true, but A is false: a formula that points at the wrong range, a figure typed into the wrong cell, or a formula overwritten by a typed number gives a wrong total that still looks neat.',
}));

Q('s2_utility', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined weaving unit, Tumbi Textiles, Phulia, keeps all its accounts by hand. State two accounting jobs the unit could do in an electronic spreadsheet and how the spreadsheet helps in each.',
  model: '1. **Payroll:** basic pay, allowances, provident fund and tax are worked out by formulas copied down for every weaver, and net pay updates at once when rates change.\n2. **Sales analysis and commission:** sales, cost and profit of each salesman are listed, commission is found by an IF formula, and a chart compares the salesmen.\n3. *(Also accepted)* Depreciation or loan schedules; a journal with totals and an agreement check; a cash budget; records of debtors sorted and filtered by due date; invoices.',
  sol: 'Name a job and say what the formulas or tools do for it.',
  scheme: [['First job with how the spreadsheet helps', 1], ['Second job with how the spreadsheet helps', 1]],
}));

Q('s3_merits', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Ms Mousumi Barua, who manages an imagined food-processing firm, Algoza Agro Foods, asks why her accountant prefers an electronic spreadsheet to a columnar paper sheet. Explain three merits he could give.',
  model: '1. **Automatic recalculation and accuracy:** formulas add, multiply and take percentages by themselves; when one figure changes, every total that depends on it is updated, so there are no arithmetical slips.\n2. **What-if analysis:** the effect of a new price, wage rate or discount can be seen at once by changing one input cell.\n3. **Reuse and presentation:** a sheet designed once (a payroll or sales sheet) can be copied for every month; figures can be formatted, sorted, filtered, charted and printed neatly.\n4. *(Also accepted)* Large amounts of figures held compactly and found quickly; easy correction without overwriting; sheets shared or exported to other programs.',
  sol: 'Each merit should say what the spreadsheet does and why that helps the accountant.',
  scheme: [['First merit explained', 1], ['Second merit explained', 1], ['Third merit explained', 1]],
}));

Q('s2_limits', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined engineering firm, Esraj Engineering, wants to keep its entire double-entry books in spreadsheets instead of accounting software. State two demerits of spreadsheets it should keep in mind.',
  model: '1. **No built-in accounting control:** a spreadsheet does not insist that debits equal credits or that accounts exist; an unbalanced or misposted entry is accepted unless the user builds checks.\n2. **Errors and security:** a wrong reference or an overwritten formula spreads errors silently, and sheets can be changed by anyone who opens the file, with no record of who changed what.\n3. *(Also accepted)* Unsuited to very large numbers of transactions or many users at once; depends on the skill of whoever designs the formulas; files can be lost without backups.',
  sol: 'Contrast what accounting software enforces with what a spreadsheet leaves to the user.',
  scheme: [['First demerit explained', 1], ['Second demerit explained', 1]],
}));

Q('fb_cell', fb({
  t: [1, 2], d: 1, c: 'recall',
  stem: 'In the booking sheet of an imagined travel agency, Tanpura Tours, the box where column C meets row 7, named C7, is called a ___.',
  acc: [['cell']],
  sol: 'A cell is the meeting point of a column and a row; its address is the column letter followed by the row number.',
}));

Q('mt_terms', match({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of an imagined juice bottler, Jaltarang Juices, explains the parts of her monthly sales file to a trainee. Match each term in column A with what it means in her file in column B.',
  pairs: [
    ['Workbook', 'The whole file, holding the sheets for April, May and June'],
    ['Worksheet', 'One page of the file, such as the sheet named May'],
    ['Range', 'A rectangular block of cells, such as B2 to B31'],
    ['Formula', 'An entry beginning with an equals sign that works out a result'],
  ],
  sol: 'A workbook is the file; it contains worksheets; a range is a block of cells on a sheet; a formula is what turns the figures into results.',
}));

// ================================================================ t02 Worksheets and workbooks
const COL28 = colName(27);
pin(COL28, 'AB', 'twenty-eighth column');
Q('m_colname', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined solar-panel dealer, Sarod Solar, keeps one product per column in its stock sheet, starting in column A. After column Z the next column is AA. Which column heading will the twenty-eighth product have?',
  opts: [COL28, 'BA', 'AA', 'ZB'],
  sol: 'Columns A to Z are the first twenty-six; AA is the twenty-seventh and AB the twenty-eighth. Two-letter headings run AA, AB, AC … AZ, then BA.',
}));

const RG = rangeSize('B3:E12');
pin(RG.cells, 40, 'B3:E12 cells');
Q('m_range_count', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In the dye-stock sheet of an imagined firm, Dholak Dyes, the stock figures occupy the range B3:E12. How many cells does the range contain?',
  opts: [String(RG.cells), String((RG.cols - 1) * (RG.rows - 1)), String(RG.cols * 12), String(RG.cols * (RG.rows - 1))],
  sol: `B to E is ${RG.cols} columns and rows 3 to 12 are ${RG.rows} rows, so the range holds ${RG.cols} × ${RG.rows} = ${RG.cells} cells.`,
}));

const CK_FEB = new Sheet({ A20: 'Total for February', F20: '=SUM(F2:F19)', F2: 41250, F3: 38600, F4: 52900 });
const CK_SUM = new Sheet({ A4: 'February sales', B4: '=Feb!F20' }, { book: { Feb: CK_FEB } });
check(CK_SUM.get('B4') === 41250 + 38600 + 52900, 'Chikara cross-sheet');
Q('m_crosssheet', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined chemicals firm, Chikara Chemicals, keeps one sheet per month in its workbook; the sheets are named Jan, Feb, Mar and so on, and each month’s total sales are in cell F20 of that month’s sheet. Which formula, typed in cell B4 of a sheet named Summary, brings in February’s total?',
  opts: [code(CK_SUM.cells.B4), code('=F20!Feb'), code('=Feb(F20)'), code('=SUM(Feb,F20)')],
  sol: `A reference to another sheet is the sheet name, an exclamation mark, then the cell. In the workbook used here, B4 then shows ${num_(CK_SUM.get('B4'))}, February’s total.`,
}));
function num_(v) { return shownNum(v); }

const NN_months = [['April', [62400, 71800, 50300]], ['May', [68900, 74300, 63100]], ['June', [59750, 70400, 66850]]];
const NN_book = Object.fromEntries(NN_months.map(([m, xs]) => [m, new Sheet({ A1: 'Product', E1: 'Sales (₹)', E2: xs[0], E3: xs[1], E4: xs[2], A12: 'Total', E12: '=SUM(E2:E4)' })]));
const NN_S = new Sheet({ A2: 'Sales, April to June', B2: '=April!E12+May!E12+June!E12' }, { book: NN_book });
const NN_q = NN_S.get('B2');
check(NN_q === sum(NN_months.flatMap(([, xs]) => xs)), 'Nagara quarter');
Q('num_quarter', num({
  t: 2, d: 2, c: 'application', marks: 1, value: NN_q, unit: '₹',
  stem: `An imagined dry-fruit wholesaler, Nagara Nuts, keeps sheets named April, May and June in one workbook. Cell E12 of each sheet totals that month’s sales: ${NN_months.map(([m]) => `${m} ${rs(NN_book[m].get('E12'))}`).join(', ')}. On a sheet named Quarter, cell B2 holds ${f(NN_S, 'B2')}. What amount will B2 show?`,
  sol: `B2 adds the three monthly totals: ${NN_months.map(([m]) => fig(NN_book[m].get('E12'))).join(' + ')} = ${fig(NN_q)}, that is ₹${fig(NN_q)}.`,
}));

const SB_br = [['North', 485000, 352600], ['South', 412500, 318900], ['Central', 356000, 271500]];
const SB_book = Object.fromEntries(SB_br.map(([b, s, e]) => [b, new Sheet({ A10: 'Total sales', B10: s, A11: 'Total expenses', B11: e })]));
const SB_S = new Sheet({
  A2: 'Sales', B2: '=North!B10+South!B10+Central!B10',
  A3: 'Expenses', B3: '=North!B11+South!B11+Central!B11',
  A4: 'Profit', B4: '=B2-B3',
  A5: 'Profit on sales (%)', B5: '=ROUND(B4/B2*100,2)',
}, { book: SB_book });
check(SB_S.get('B4') === sum(SB_br.map(([, s, e]) => s - e)), 'Surbahar profit');
Q('s3_workbook_summary', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined department store, Surbahar Stores, keeps a workbook with one sheet for each branch, named North, South and Central. On every branch sheet, B10 holds total sales and B11 total expenses:\n\n${md(['Sheet', 'B10 Total sales (₹)', 'B11 Total expenses (₹)'], SB_br.map(([b, s, e]) => [b, fig(s), fig(e)]), [1, 2])}\n\nOn a fourth sheet, Summary, write the formulas for B2 (sales of all branches), B3 (expenses of all branches), B4 (profit) and B5 (profit as a percentage of sales, to two decimal places), and state what each will show.`,
  model: `${SB_S.md(['A', 'B'], [2, 3, 4, 5], 'both')}\n\nEach reference to another sheet is the sheet name, an exclamation mark and the cell, so the summary updates whenever a branch sheet changes.`,
  sol: 'Bring each branch figure in with a sheet reference, then work on the summary cells.',
  scheme: [[`Sales formula and ${fig(SB_S.get('B2'))}`, 1], [`Expenses formula and ${fig(SB_S.get('B3'))}`, 1], [`Profit ${fig(SB_S.get('B4'))} and percentage ${SB_S.get('B5')}`, 1]],
}));

Q('m_navigation', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The clerk of an imagined silk house, Swarmandal Silks, has scrolled far down a long stock sheet. Which key combination takes the cursor straight back to cell A1?',
  opts: ['Ctrl + Home', 'Ctrl + End', 'Shift + Tab', 'Page Up'],
  sol: 'Ctrl + Home jumps to the top-left cell; Ctrl + End goes to the last cell that holds an entry, Shift + Tab moves one cell left and Page Up moves one screen up.',
}));

Q('m_saveas', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The accountant of an imagined granite quarry, Gottuvadyam Granites, has finished the April payroll file and wants to start May’s payroll from it without changing the April file. What should she do first?',
  opts: ['Use Save As to save the file under a new name, such as May payroll, and then change the figures', 'Use Save after changing the figures for May', 'Delete the April sheet and type May’s figures in a new sheet', 'Close the file without saving and reopen it'],
  sol: 'Save As writes a separate copy under a new name, leaving the April file untouched; Save would overwrite April with May’s figures.',
}));

const MM_JUN = new Sheet({ D15: 284500 });
const MM_S = new Sheet({ B6: '=June!D15' }, { book: { June: MM_JUN } });
Q('tf_move_sheet', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: `True or false? In the workbook of an imagined flour mill, Morsing Mills, cell B6 of the Summary sheet holds ${f(MM_S, 'B6')}. If the June sheet is moved to the end of the same workbook, B6 still shows June’s figure, ${rs(MM_S.get('B6'))}.`,
  sol: 'Moving a sheet only changes its position among the tabs; references to it from other sheets of the same workbook follow the sheet, so the result is unchanged.',
}));

Q('ord_move_copy', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of an imagined pharmacy, Madal Medicals, wants to copy the sheet named Rates from her 2026 workbook into a new 2027 workbook. Arrange her steps in order.',
  items: [
    'Open both workbooks',
    'In the 2026 workbook, right-click the Rates sheet tab and choose the move or copy command',
    'Choose the 2027 workbook as the destination and pick the position for the sheet',
    'Tick the option to create a copy and confirm',
    'Save the 2027 workbook',
  ],
  sol: 'The destination file must be open to appear in the list; leaving the copy option unticked would move the sheet out of the 2026 file instead of copying it.',
}));

Q('s2_sheets', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A trainee at an imagined rug exporter, Ravanahatha Rugs, has a workbook whose sheets are still called Sheet1, Sheet2 and Sheet3. Explain (a) how she can rename Sheet2 as Shipments, and (b) the difference between copying a worksheet and moving it.',
  model: '**(a) Renaming:** double-click the Sheet2 tab (or right-click it and choose Rename), type Shipments and press Enter.\n\n**(b) Copying and moving:** moving takes the sheet itself to a new position in the same workbook or to another workbook, so it no longer stays where it was. Copying leaves the original in place and creates a duplicate, with the same entries and formulas, at the new position; the copy gets a new name such as Shipments (2) until it is renamed.',
  sol: 'Renaming works on the sheet tab; for (b) ask whether the original sheet is still there afterwards.',
  scheme: [['(a) Renaming steps', 1], ['(b) Copying versus moving distinguished', 1]],
}));

// ================================================================ t03 Formatting, previewing and printing
const KK = new Sheet({ A4: 'Commission', B4: 3500, A5: 'Sales', B5: 40000, A6: 'Commission rate', B6: '=B4/B5' }, { formats: { B6: '0.0%' } });
const KK_v = KK.get('B6');
check(Math.abs(KK_v - 0.0875) < 1e-12 && KK.shown('B6') === '8.8%', 'Khol percentage display');
Q('m_pct_format', mcq({
  t: 3, d: 2, c: 'application',
  stem: `In the sales sheet of an imagined kitchenware shop, Khol Kitchenware, cell B6 holds ${f(KK, 'B6')}, where B4 is ${rs(3500)} of commission and B5 is ${rs(40000)} of sales. B6 is given the percentage format with one decimal place. What will B6 display?`,
  opts: [KK.shown('B6'), `${Math.floor(KK_v * 1000) / 10}%`, fmt(KK_v, '0.0'), `${round(KK_v * 1000, 1)}%`],
  sol: `B4 ÷ B5 = ${KK_v}. The percentage format multiplies the stored value by 100 for display (8.75) and rounds it to one decimal place, half upward.`,
}));

const PP_d = serial(2027, 2, 5);
Q('m_date_format', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The packing clerk of an imagined firm, Pung Packaging, enters the invoice date ${longDate(PP_d)} in a cell and applies the date format dd-mmm-yyyy. What will the cell display?`,
  opts: [fmtDate(PP_d, 'dd-mmm-yyyy'), 'Feb-05-2027', fmtDate(PP_d, 'dd-mm-yyyy'), '2027-Feb-05'],
  sol: 'dd gives the day in two digits, mmm the first three letters of the month and yyyy the year in four digits, joined by hyphens in that order.',
}));

Q('m_hashes', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'After a large sale is entered in the comma style, a cell in the sheet of an imagined marble trader, Dhapli Marbles, shows ######## instead of the amount. What is the most likely cause, and the remedy?',
  opts: ['The column is too narrow to show the number; widen the column (or auto-fit it)', 'The formula has a wrong cell reference; retype the formula', 'The number is stored as text; delete and re-enter it', 'The sheet is protected; remove the password'],
  sol: 'Hash marks appear when a formatted number or date is wider than its column; the value itself is intact and reappears once the column is widened.',
}));

Q('m_print_titles', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'The ledger sheet of an imagined stationery maker, Damaru Diaries, runs to six printed pages. The accountant wants the column headings in row 1 to appear at the top of every printed page. Which setting should she use?',
  opts: ['Rows to repeat at the top (print titles) in the page set-up', 'Freeze panes at cell A2', 'Wrap text in row 1', 'Merge and centre the cells of row 1'],
  sol: 'Print titles repeat chosen rows (or columns) on each printed page. Freezing panes only keeps rows visible on screen while scrolling; it does not affect printing.',
}));

const SH = new Sheet({ A2: 'Freight on lot 1 (₹ per kg)', B2: 10.004, A3: 'Freight on lot 2 (₹ per kg)', B3: 10.004, A4: 'Total', B4: '=B2+B3' }, { formats: { B: '0.00' } });
check(SH.shown('B2') === '10.00' && SH.shown('B3') === '10.00' && SH.shown('B4') === '20.01', 'Shankh display');
Q('ar_display', ar({
  t: 3, d: 4, c: 'analysis', key: 'a',
  a: `In the freight sheet of an imagined shipping agent, Shankh Shipping, two cells each display ${SH.shown('B2')} under a two-decimal format, yet the cell that adds them displays ${SH.shown('B4')}.`,
  r: 'A number format changes only how a value is shown; formulas work on the full value stored in the cell.',
  sol: `Both are true and R explains A: each cell stores ${SH.get('B2')}, so the sum is ${round(SH.get('B4'), 3)}, which shows as ${SH.shown('B4')}; the display of the parts was rounded down and that of the total rounded up.`,
}));

Q('tf_freeze_print', tf({
  t: [3, 4], d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Freezing row 1 of the long rice-stock sheet of an imagined mill, Rabab Rice Mill, also makes row 1 print at the top of every printed page.',
  sol: 'Freezing panes works only on screen, keeping the headings in view while scrolling; printing headings on each page needs the print-titles setting in the page set-up.',
}));

Q('fb_landscape', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The payroll sheet of an imagined mattress maker, Mohanveena Mattresses, has fourteen columns and is wider than it is long, so it should be printed in ___ orientation.',
  acc: [['landscape']],
  sol: 'Landscape orientation turns the page sideways, giving more width for many columns; portrait suits long, narrow sheets.',
}));

const GG_vals = [[0.4, '0%', 'percentage with no decimal places'], [245678.5, '#,##0', 'comma style with no decimal places'], [serial(2026, 4, 1), 'dd-mm-yyyy', 'date as dd-mm-yyyy'], [1875.456, '0.00', 'number with two decimal places']];
const GG_shown = GG_vals.map(([v, fm]) => fmt(v, fm));
check(GG_shown.join(';') === '40%;2,45,679;01-04-2026;1875.46', 'Bulbultarang formats');
Q('mt_formats', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'The sheet of an imagined garment maker, Bulbultarang Garments, stores four values and gives each a different format. Match each stored value and format in column A with what the cell displays in column B.',
  pairs: GG_vals.map(([v, fm, words], i) => [`${typeof v === 'number' && fm === 'dd-mm-yyyy' ? `The date 1 April 2026` : `The value ${v}`} formatted as ${words}`, GG_shown[i]]),
  sol: 'A percentage format multiplies by 100; the comma style groups digits in the Indian way and rounds to whole rupees; a date format shows the stored date; a fixed format rounds to the decimal places asked for.',
}));

Q('s2_heading_format', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'The payroll sheet of an imagined bakery, Bansuri Bakery, has the title "Salary sheet for April 2026" in A1 and long column headings such as "House rent allowance (₹)" in row 3, spread over columns A to K. Describe two formatting steps that will make the title and headings neat and readable.',
  model: '1. **Title:** select A1:K1, use merge and centre so the title sits across the width of the table, and make it bold in a larger font.\n2. **Headings:** select row 3, turn on wrap text so long headings run onto two lines within the column width, make them bold, centre them and add borders (and a light fill colour) so they stand apart from the figures.\n3. *(Also accepted)* Auto-fit or set column widths; apply the comma style to amount columns; freeze the heading rows for scrolling.',
  sol: 'One step for the title across the table, one for the long headings.',
  scheme: [['Title formatting step', 1], ['Heading formatting step', 1]],
}));

Q('s3_page_setup', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'The sales register of an imagined pharmacy chain, Chimta Chemists, has 12 columns and 140 rows. Printed as it is, it spills on to extra pages sideways and only the first page shows the headings. Explain three page set-up or printing steps that will give a clean printout.',
  model: '1. **Orientation and scaling:** choose landscape orientation and scale the sheet to fit one page wide (letting the length run over several pages), reducing margins if needed.\n2. **Print titles and print area:** set row 1 (the headings) as rows to repeat at the top so every page carries them, and set the print area to the register only, leaving out rough work.\n3. **Preview before printing:** use print preview to check page breaks, headers and footers (for example the firm’s name and page numbers), and gridlines, then print.\n4. *(Also accepted)* Choose the paper size; centre the table on the page; add a footer with the date.',
  sol: 'Deal with the width, the headings on every page and checking before printing.',
  scheme: [['Orientation and fit-to-width scaling', 1], ['Print titles (and print area)', 1], ['Print preview, headers and footers', 1]],
}));

// ================================================================ t04 Formulas and functions
const SP = new Sheet({ A2: 'Cost of stock', B2: 50000, A3: 'Freight', B3: 4000, A4: 'Mark-up', B4: '10%', C1: '=B2+B3*B4', C2: '=(B2+B3)*B4', C3: '=(B2+B3)*(1+B4)', C4: '=B2+B3' });
check(SP.get('C1') === 50400 && SP.get('C2') === 5400 && SP.get('C3') === 59400, 'Sursingar precedence');
Q('m_precedence', mcq({
  t: 4, d: 2, c: 'application',
  stem: `In the costing sheet of an imagined sports-goods firm, Sursingar Sports, B2 holds the cost of stock (${rs(50000)}), B3 the freight (${rs(4000)}) and B4 the mark-up rate (10%). A clerk wants the mark-up on cost plus freight but types ${f(SP, 'C1')}. What will the cell show?`,
  opts: [num_(SP.get('C1')), num_(SP.get('C2')), num_(SP.get('C3')), num_(SP.get('C4'))],
  sol: `Multiplication is done before addition, so B3 × B4 = 400 is added to 50,000. The intended mark-up needs brackets: ${f(SP, 'C2')} gives ${num_(SP.get('C2'))}.`,
}));

const KC = new Sheet({ A1: 'Day', B1: 'Sales (₹)', A2: 'Mon', B2: 42000, A3: 'Tue', B3: 36500, A4: 'Wed', A5: 'Thu', B5: 51000, A6: 'Fri', B6: 40500, B8: '=AVERAGE(B2:B6)' });
pin(KC.get('B8'), 42500, 'Kombu average');
Q('m_average_blank', mcq({
  t: 4, d: 3, c: 'application',
  stem: `An imagined cane-furniture shop, Kombu Cane Crafts, was closed on Wednesday, so cell B4 of its daily sales sheet is left empty:\n\n${KC.md(['A', 'B'], [1, 2, 3, 4, 5, 6, 8], 'formula')}\n\nWhat will B8 show?`,
  opts: [num_(KC.get('B8')), num_(sum([42000, 36500, 51000, 40500]) / 5), num_(sum([42000, 36500, 51000, 40500])), num_(40500)],
  sol: `AVERAGE skips empty cells, so it divides the total of ${fig(sum([42000, 36500, 51000, 40500]))} by the 4 days with figures, not by 5. A zero typed in B4 would have been counted.`,
}));

const GT = new Sheet({ A1: 'Bill amount (₹)', B1: 'Mode', C1: 'Discount (₹)', A2: 46500, B2: 'Cash', C2: '=IF(AND(A2>=40000,B2="Cash"),ROUND(A2*2%,0),0)', A3: 52000, B3: 'Credit', C3: '=IF(AND(A3>=40000,B3="Cash"),ROUND(A3*2%,0),0)' });
pin(GT.get('C2'), 930, 'Gogona discount'); pin(GT.get('C3'), 0, 'Gogona credit');
Q('m_and_or', mcq({
  t: 4, d: 3, c: 'application',
  stem: `An imagined garden-tools firm, Gogona Garden Tools, gives a 2% discount only on bills of ${rs(40000)} or more that are paid in cash. Cell C2 holds ${f(GT, 'C2')}, where A2 is ${rs(46500)} and B2 is Cash. What will C2 show?`,
  opts: [num_(GT.get('C2')), '0', num_(9300), num_(46500 - 930)],
  sol: `AND is true only when both tests are true: 46,500 is at least 40,000 and B2 is Cash, so the IF returns ROUND(46,500 × 2%, 0) = ${GT.get('C2')}. For the credit bill in row 3 the same formula gives ${GT.get('C3')}.`,
}));

const PY = new Sheet({ A1: 'Invoice date', B1: serial(2027, 1, 18), A2: 'Payment date', B2: serial(2027, 3, 4), A3: 'Days taken', B3: '=B2-B1' }, { formats: { B1: 'dd-mm-yyyy', B2: 'dd-mm-yyyy', B3: '0' } });
pin(PY.get('B3'), 45, 'Pepa days');
Q('m_date_diff', mcq({
  t: 4, d: 3, c: 'application',
  stem: `In the debtors sheet of an imagined plywood dealer, Pepa Plywood, B1 holds the invoice date ${PY.shown('B1')} and B2 the date of payment ${PY.shown('B2')}. B3 holds ${f(PY, 'B3')} and is formatted as a number. What will B3 show?`,
  opts: [String(PY.get('B3')), String(PY.get('B3') + 1), String(PY.get('B3') + 2), String(PY.get('B3') - 1)],
  sol: `A spreadsheet stores each date as a count of days, so subtracting gives the days between them: 13 days left in January after the 18th, 28 in February 2027 and 4 in March, ${PY.get('B3')} in all.`,
}));

const VV_from = '=C2*D2';
const VV_to = shiftFormula(VV_from, 3, 0);
pin(VV_to, '=C5*D5', 'Vichitra copy');
Q('m_relative_copy', mcq({
  t: 4, d: 2, c: 'application',
  stem: `In the paint-stock sheet of an imagined firm, Vichitra Varnishes, cell E2 holds ${code(VV_from)} (litres × rate). The formula is copied down to E5. What will E5 hold?`,
  opts: [code(VV_to), code(VV_from), code('=C5*D2'), code(shiftFormula(VV_from, 3, 1))],
  sol: 'Both references are relative, so each moves down by the same three rows and E5 multiplies the litres and the rate of its own row.',
}));

Q('m_named', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'In the salary sheet of an imagined tailoring firm, Taus Tailors, the dearness allowance rate is kept in one cell, N2, and the allowance formula in C2 is copied down for 40 employees. Why should N2 be given a name such as DARate (or be made an absolute reference) before the formula is copied?',
  opts: ['So that every copied formula keeps pointing at the one rate cell instead of moving down with the copy', 'So that the rate prints in bold on every page', 'So that the sheet recalculates faster', 'So that the rate can be changed only by a password holder'],
  sol: 'A relative reference to N2 would become N3, N4 … in the rows below, picking up blanks or other rates; a name, or a reference locked with a dollar sign before both the column letter and the row number, does not move.',
}));

const BB_fz = freezeAt('D2');
check(BB_fz.rows === 1 && BB_fz.cols === 3, 'Banam freeze');
Q('m_freeze', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The order sheet of an imagined brick kiln, Banam Bricks, has headings in row 1 and the customer code, name and town in columns A to C. The accountant selects cell D2 and chooses the freeze-panes command. What stays in view while she scrolls?',
  opts: [`${BB_fz.rowText[0].toUpperCase()}${BB_fz.rowText.slice(1)} and ${BB_fz.colText}`, 'Rows 1 to 2 and columns A to D', 'Row 1 only', 'Columns A to D only'],
  sol: 'Freeze panes fixes the rows above the selected cell and the columns to its left; selecting D2 therefore fixes one heading row and three columns.',
}));

Q('fb_absolute', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'In the costing sheet of an imagined pottery, Kudam Ceramics, the reference to the cell holding the firing charge must not change when a formula is copied down; such a fixed reference is called an ___ reference.',
  acc: [['absolute']],
  sol: 'An absolute reference stays fixed when copied; in a spreadsheet it is written with a dollar sign before the column letter and before the row number, or the cell is given a name.',
}));

Q('fb_equals', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The trainee at an imagined oil mill, Ottu Oils, typed SUM(B2:B9) into a cell and saw the words, not a total. Every formula must begin with the ___ sign.',
  acc: [['=', 'equals', 'equal', 'equals sign', 'equal sign', 'equal to']],
  sol: 'A formula starts with the equals sign (=); without it the entry is stored as text.',
}));

const TT_items = [['Rent', 36000], ['Wages', 84000], ['Power', 18500], ['Transport', 22700], ['Other expenses', 9300]];
const TT = new Sheet({ ...Object.fromEntries(TT_items.flatMap(([n, v], i) => [[`A${i + 2}`, n], [`B${i + 2}`, v]])), A7: 'Total', B7: '=SUM(B2:B6)', C3: '=ROUND(B3/B7*100,2)' });
const TT_v = TT.get('C3');
pin(TT_v, 49.27, 'Tarpa wages share');
Q('num_pct', num({
  t: 4, d: 3, c: 'application', marks: 1, value: TT_v, unit: '%', tol: 0.005,
  stem: `The expense sheet of an imagined tarpaulin maker, Tarpa Tarpaulins, lists ${TT_items.map(([n, v]) => `${n.toLowerCase()} ${rs(v)}`).join(', ')} in B2 to B6, with ${f(TT, 'B7')} in B7. What will C3, holding ${f(TT, 'C3')}, show?`,
  sol: `B7 = ${fig(TT.get('B7'))}; 84,000 ÷ 1,70,500 × 100 = 49.2668…, which ROUND to two places makes ${TT_v}, so wages are ${TT_v}% of total expenses.`,
}));

const MR = new Sheet({ A1: 'As on', B1: serial(2027, 3, 31), A3: 'Invoice date', B3: serial(2027, 2, 12), A4: 'Credit days', B4: 30, A5: 'Due date', B5: '=B3+B4', A6: 'Days overdue', B6: '=IF(AsOn>B5,AsOn-B5,0)' }, { names: { AsOn: 'B1' }, formats: { B1: 'dd-mm-yyyy', B3: 'dd-mm-yyyy', B5: 'dd-mm-yyyy', B6: '0' } });
pin(MR.shown('B5'), '14-03-2027', 'Mridangam due'); pin(MR.get('B6'), 17, 'Mridangam overdue');
Q('num_overdue', num({
  t: 4, d: 3, c: 'application', marks: 1, value: MR.get('B6'), unit: 'days',
  stem: `An imagined two-wheeler dealer, Mridangam Motors, records a credit sale dated ${MR.shown('B3')} on 30 days’ credit. B5 holds ${f(MR, 'B5')} (formatted as a date) and B6 holds ${f(MR, 'B6')}, where the cell named AsOn holds ${MR.shown('B1')}. How many days overdue will B6 show?`,
  sol: `Due date = 12 February 2027 + 30 days = ${longDate(MR.get('B5'))} (February 2027 has 28 days). AsOn is later, so B6 = 31 March − 14 March = ${MR.get('B6')} days.`,
}));

Q('ar_relative', ar({
  t: 4, d: 3, c: 'understanding', key: 'b',
  a: `In the tea-sales sheet of an imagined firm, Tabla Tea Traders, copying ${code('=B2*C2')} from D2 to D3 gives ${code(shiftFormula('=B2*C2', 1, 0))}.`,
  r: 'Every formula in a spreadsheet begins with an equals sign.',
  sol: 'Both are true, but R does not explain A: the formula changes because relative references move with the copy, not because formulas start with an equals sign.',
}));

const NF = new Sheet({ A4: 'Order value (₹)', B4: 'Discount (₹)', A5: 31800, B5: '=IF(A5>=25000,ROUND(A5*5%,0),0)', A6: 18400, B6: '=IF(A6>=25000,ROUND(A6*5%,0),0)' });
check(NF.get('B5') === 1590 && NF.get('B6') === 0, 'Nafiri discounts');
Q('s2_if_discount', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `An imagined novelty shop, Nafiri Novelties, allows a 5% discount, rounded to the rupee, on orders of ${rs(25000)} or more and none on smaller orders. Order values are in A5 (${rs(31800)}) and A6 (${rs(18400)}). Write the formula for the discount in B5 that can be copied to B6, and state what B5 and B6 will show.`,
  model: `${NF.md(['A', 'B'], [4, 5, 6], 'both')}\n\nThe IF tests the order value; the true part works out 5% and rounds it, and the false part gives 0.`,
  sol: 'Test the order value against the limit inside an IF; keep the reference relative so it can be copied.',
  scheme: [['Correct IF formula with ROUND', 1], [`Values ${fig(NF.get('B5'))} and ${NF.get('B6')}`, 1]],
}));

const DD = new Sheet({ A2: 'Sample date', B2: serial(2026, 11, 23), C2: '=DAY(B2)', D2: '=MONTH(B2)', E2: '=YEAR(B2)', F2: '=B2+60' }, { formats: { B2: 'dd-mm-yyyy', F2: 'dd-mm-yyyy', C: '0', D: '0', E: '0' } });
pin(DD.shown('F2'), '22-01-2027', 'Dotara report date');
Q('s2_date_fns', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: `A diagnostic lab, Dotara Diagnostics (imagined), keeps the date a sample was received in B2: ${DD.shown('B2')}. Write formulas for C2, D2 and E2 to extract the day, the month number and the year, and for F2 to give the date 60 days later; state what each shows (F2 is formatted as dd-mm-yyyy).`,
  model: `${md(['Cell', 'Formula', 'Shows'], DD.formulaRows(['C2', 'D2', 'E2', 'F2']))}\n\nAdding a number to a date moves it forward by that many days: 7 days remain in November, 31 in December and 22 in January.`,
  sol: 'DAY, MONTH and YEAR each take a date; date arithmetic counts days.',
  scheme: [['DAY, MONTH and YEAR formulas with values', 1], [`Date 60 days later ${DD.shown('F2')}`, 1]],
}));

const AA_days = [['Monday', 18450], ['Tuesday', 22300], ['Wednesday', 16900], ['Thursday', 25750], ['Friday', 21400], ['Saturday', 31600], ['Sunday', 28200]];
const AA = new Sheet({
  ...Object.fromEntries(AA_days.flatMap(([d, v], i) => [[`A${i + 2}`, d], [`B${i + 2}`, v]])),
  A10: 'Total', B10: '=SUM(B2:B8)', A11: 'Average', B11: '=ROUND(AVERAGE(B2:B8),2)', A12: 'Highest', B12: '=MAX(B2:B8)', A13: 'Lowest', B13: '=MIN(B2:B8)',
});
check(AA.get('B10') === 164600 && AA.get('B11') === 23514.29 && AA.get('B12') === 31600 && AA.get('B13') === 16900, 'Anandalahari');
Q('s3_functions', short({
  t: 4, d: 2, c: 'application', marks: 3,
  stem: `The daily sales of an imagined clothes shop, Anandalahari Apparel, for one week are in B2 to B8:\n\n${md(['Day', 'Sales (₹)'], AA_days.map(([d, v]) => [d, fig(v)]), [1])}\n\nWrite the formulas for B10 (total), B11 (average, rounded to two decimal places), B12 (highest day’s sales) and B13 (lowest day’s sales), and state what each will show.`,
  model: `${AA.md(['A', 'B'], [10, 11, 12, 13], 'both')}\n\n${fig(AA.get('B10'))} ÷ 7 = 23,514.2857…, rounded to ${num_(AA.get('B11'))}.`,
  sol: 'One function per result, each over the same range of seven days.',
  scheme: [[`SUM formula and ${fig(AA.get('B10'))}`, 1], [`AVERAGE with ROUND and ${num_(AA.get('B11'))}`, 1], ['MAX and MIN formulas with values', 1]],
}));

const GD_basic = [26000, 31500, 38000, 44500];
const GD_base = { A1: 'Employee', B1: 'Basic pay (₹)', C1: 'DA (₹)', M2: 'DA rate', N2: '42%', M3: 'HRA rate', N3: '18%', M4: 'PF rate', N4: '12%', ...Object.fromEntries(GD_basic.flatMap((b, i) => [[`A${i + 2}`, `E-0${i + 1}`], [`B${i + 2}`, b]])) };
const GD_wrong = Object.fromEntries(GD_basic.map((_, i) => [`C${i + 2}`, shiftFormula('=ROUND(B2*N2,0)', i, 0)]));
const GD_W = new Sheet({ ...GD_base, ...GD_wrong });
const GD_R = new Sheet({ ...GD_base, ...Object.fromEntries(GD_basic.map((_, i) => [`C${i + 2}`, `=ROUND(B${i + 2}*DARate,0)`])) }, { names: { DARate: 'N2' } });
check(GD_wrong.C3 === '=ROUND(B3*N3,0)' && GD_wrong.C5 === '=ROUND(B5*N5,0)', 'Gethu copied formulas');
check(GD_W.get('C3') === round(31500 * 0.18, 0) && GD_W.get('C4') === round(38000 * 0.12, 0) && GD_W.get('C5') === 0, 'Gethu wrong values');
GD_basic.forEach((b, i) => check(GD_R.get(`C${i + 2}`) === round(b * 0.42, 0), `Gethu right ${i}`));
Q('s3_copy_error', short({
  t: 4, d: 4, c: 'analysis', marks: 3,
  stem: `In the salary sheet of an imagined gadget dealer, Gethu Gadgets, N2 holds the DA rate (42%), N3 the HRA rate (18%) and N4 the PF rate (12%); N5 is empty. Basic pay is in B2 to B5 (${GD_basic.map(rs).join(', ')}). A trainee typed ${code(GD_wrong.C2)} in C2 and copied it down to C5. C2 is right but the rest are wrong. (a) Write the formulas now in C3, C4 and C5, with what each shows and why it is wrong. (b) Correct the formula so that it can be copied, and give the correct DA for all four employees.`,
  model: `**(a)** The reference to N2 is relative, so it moved down with each copy:\n\n${md(['Cell', 'Formula after copying', 'Shows', 'Why it is wrong'], [['C3', code(GD_wrong.C3), num_(GD_W.get('C3')), 'uses the HRA rate in N3'], ['C4', code(GD_wrong.C4), num_(GD_W.get('C4')), 'uses the PF rate in N4'], ['C5', code(GD_wrong.C5), '0', 'N5 is empty, so the rate taken is 0']])}\n\n**(b)** Fix the rate cell: give N2 the name DARate (or lock it with a dollar sign before the column letter and before the row number) and copy ${code(GD_R.cells.C2)} down:\n\n${GD_R.md(['A', 'B', 'C'], [2, 3, 4, 5], 'both')}`,
  sol: 'The basic-pay reference must move from row to row; the rate reference must not.',
  scheme: [['Copied formulas in C3 to C5 with reasons', 1], ['Correct fixed reference or name', 1], ['Correct DA for all four employees', 1]],
}));

const TU_rows = [['Hazarika Stores', 64000, serial(2027, 1, 10), 30], ['Medhi Agencies', 38500, serial(2027, 2, 2), 45], ['Saikia Brothers', 52000, serial(2027, 2, 20), 30], ['Bora Enterprises', 47500, serial(2027, 3, 15), 30]];
const TU = new Sheet({
  A1: 'As on', B1: serial(2027, 3, 31), C1: 'Interest rate (a year)', D1: '18%',
  A3: 'Customer', B3: 'Amount (₹)', C3: 'Invoice date', D3: 'Credit days', E3: 'Due date', F3: 'Days overdue', G3: 'Interest (₹)',
  ...Object.fromEntries(TU_rows.flatMap(([c, a, d, cr], i) => {
    const r = i + 4;
    return [[`A${r}`, c], [`B${r}`, a], [`C${r}`, d], [`D${r}`, cr], [`E${r}`, `=C${r}+D${r}`], [`F${r}`, `=IF(AsOn>E${r},AsOn-E${r},0)`], [`G${r}`, `=ROUND(B${r}*Rate*F${r}/365,0)`]];
  })),
  A8: 'Total', B8: '=SUM(B4:B7)', G8: '=SUM(G4:G7)',
}, { names: { AsOn: 'B1', Rate: 'D1' }, formats: { B1: 'dd-mm-yyyy', C: 'dd-mm-yyyy', E: 'dd-mm-yyyy', F: '0', D: '0' } });
const TU_od = TU_rows.map(([, a, d, cr]) => Math.max(0, serial(2027, 3, 31) - (d + cr)));
TU_od.forEach((o, i) => check(TU.get(`F${i + 4}`) === o && TU.get(`G${i + 4}`) === round((TU_rows[i][1] * 0.18 * o) / 365, 0), `Tutari row ${i}`));
pin(TU.get('G8'), 2037, 'Tutari total interest: 1,578 + 228 + 231');
check(TU.get('F7') === 0 && TU.get('G8') === sum([4, 5, 6, 7].map((r) => TU.get(`G${r}`))), 'Tutari totals');
Q('l5_credit', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: `An imagined wholesaler, Tutari Traders, keeps this credit register (dates formatted dd-mm-yyyy); B1 is named AsOn and holds ${TU.shown('B1')}, and D1 is named Rate and holds 18% a year:\n\n${md(['Row', 'Customer', 'Amount (₹)', 'Invoice date', 'Credit days'], TU_rows.map(([c, a, d, cr], i) => [String(i + 4), c, fig(a), fmtDate(d), String(cr)]), [2, 4])}\n\n(a) Write the formulas for the due date in E4 and the days overdue on the AsOn date in F4 (zero if not yet due), and give the due dates and days overdue for all four customers. [2]\n\n(b) Interest at 18% a year is charged on overdue amounts for the days overdue, on a 365-day year and rounded to the rupee. Write the formula for G4 and the total in G8, and give the interest for each customer and in total. [3]`,
  model: `**(a)** ${code(TU.cells.E4)} and ${code(TU.cells.F4)}, copied down:\n\n${TU.md(['A', 'E', 'F'], [4, 5, 6, 7], 'value')}\n\n**(b)** ${code(TU.cells.G4)}, copied down, and ${code(TU.cells.G8)} in G8:\n\n${TU.md(['A', 'B', 'F', 'G'], [4, 5, 6, 7, 8], 'value')}\n\nBora Enterprises is not yet due on 31 March, so its days overdue and interest are 0. Total interest: ${rs(TU.get('G8'))}.`,
  sol: 'A due date is the invoice date plus the credit days; the IF keeps days overdue from going negative; interest = amount × rate × days ÷ 365.',
  scheme: [['(a) Due-date and overdue formulas', 1], ['(a) Due dates and days overdue for all four', 1], ['(b) Interest formula with names', 1], ['(b) Interest for each customer', 1], [`(b) Total interest ${rs(TU.get('G8'))}`, 1]],
}));

// ================================================================ t05 Accounting applications
// Payroll rules are stated in each stem; income tax uses a simplified flat rule for these exercises only.
const PG_R = { da: 0.3, hra: 0.2, taLimit: 30000, taLow: 1500, taHigh: 2200, cca: 900, pf: 0.12, taxLimit: 60000, tax: 0.1 };
const PG = payroll(36000, PG_R);
pin(PG.pf, 5616, 'Pungi PF');
Q('m_pf', mcq({
  t: 5, d: 3, c: 'application',
  stem: `In the payroll sheet of an imagined pottery, Pungi Pottery, provident fund is deducted at 12% of basic pay plus dearness allowance. An employee’s basic pay is ${rs(36000)}, DA is 30% of basic and HRA is 20% of basic. How much provident fund will the sheet deduct?`,
  opts: [num_(PG.pf), num_(round(36000 * 0.12, 0)), num_(round((36000 + PG.da + PG.hra) * 0.12, 0)), num_(round(PG.da * 0.12, 0))],
  sol: `DA = ${fig(PG.da)}; PF = 12% × (${fig(36000)} + ${fig(PG.da)}) = ${fig(PG.pf)}. HRA is not part of the PF base here.`,
}));

Q('m_hra_formula', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'In the salary sheet of an imagined automobile dealer, Mukhavina Motors, basic pay is in column B from row 2, and the HRA rate is in a cell named HRARate. Which formula for HRA in D2 can be copied down to every employee and always uses the HRA rate?',
  opts: [code('=ROUND(B2*HRARate,0)'), code('=ROUND(B2*N3,0)'), code('=ROUND(B2+HRARate,0)'), code('=ROUND(HRARate/B2,0)')],
  sol: 'The basic-pay reference must be relative so that each row uses its own basic pay, and the rate must be fixed; a name stays fixed when copied, while N3 would drift down to N4, N5 and so on.',
}));

const YZ_R = { da: 0.35, hra: 0.15, taLimit: 30000, taLow: 1200, taHigh: 1800, cca: 800, pf: 0.12, taxLimit: 50000, tax: 0.1 };
const YZ = payroll(27500, YZ_R);
pin(YZ.gross, 43250, 'Yazh gross');
Q('num_gross', num({
  t: 5, d: 2, c: 'application', marks: 1, value: YZ.gross, unit: '₹',
  stem: `The payroll sheet of an imagined yarn mill, Yazh Yarns, works out gross pay as basic pay + DA (35% of basic) + HRA (15% of basic) + TA + CCA (${rs(800)}), where TA is given by ${code('=IF(B2<30000,1200,1800)')}. What gross pay will it show for a spinner whose basic pay is ${rs(27500)}?`,
  sol: `DA ${fig(YZ.da)}, HRA ${fig(YZ.hra)}, TA ${fig(YZ.ta)} (basic is below 30,000), CCA ${fig(YZ.cca)}; gross = 27,500 + ${fig(YZ.da)} + ${fig(YZ.hra)} + ${fig(YZ.ta)} + ${fig(YZ.cca)} = ${fig(YZ.gross)}, that is ₹${fig(YZ.gross)}.`,
}));

Q('tf_tax', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the payroll sheet of an imagined distributor, Damphu Distributors, the income tax deducted from an employee’s salary is added to the allowances to arrive at gross pay.',
  sol: 'Income tax deducted at source is a deduction, like provident fund: gross pay = basic + allowances, and net pay = gross pay − deductions.',
}));

Q('ar_pf', ar({
  t: 5, d: 3, c: 'understanding', key: 'c',
  a: 'In the payroll sheet of an imagined transporter, Tasha Transport, provident fund appears among the deductions, not the allowances.',
  r: 'Under the sheet’s rule, provident fund is worked out on gross pay including house rent allowance.',
  sol: 'A is true: the employee’s provident fund contribution is deducted from gross pay. R is false: in this chapter’s payroll sheets, provident fund is a percentage of basic pay plus dearness allowance only.',
}));

const RR_R = { da: 0.38, hra: 0.16 };
const RR = new Sheet({ A2: 'E-07', B2: 31000, C2: '=ROUND(B2*DARate,0)', D2: '=ROUND(B2*HRARate,0)', N2: '38%', N3: '16%' }, { names: { DARate: 'N2', HRARate: 'N3' } });
check(RR.get('C2') === round(31000 * RR_R.da, 0) && RR.get('D2') === round(31000 * RR_R.hra, 0), 'Ranasringa');
Q('s2_payroll_formulas', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `In the salary sheet of an imagined rubber works, Ranasringa Rubber, an employee’s basic pay of ${rs(31000)} is in B2. The DA rate (38%) is in a cell named DARate and the HRA rate (16%) in a cell named HRARate. Write the formulas for DA in C2 and HRA in D2, each rounded to the rupee and fit to be copied down, and state their values.`,
  model: `${RR.md(['B', 'C', 'D'], [2], 'both')}\n\nThe names keep the rates fixed when the formulas are copied down; B2 stays relative so that each row uses its own basic pay.`,
  sol: 'Multiply the basic pay by the named rate inside ROUND(…, 0).',
  scheme: [[`DA formula and ${fig(RR.get('C2'))}`, 1], [`HRA formula and ${fig(RR.get('D2'))}`, 1]],
}));

const MZ_R = { da: 0.4, hra: 0.2, taLimit: 35000, taLow: 1600, taHigh: 2400, cca: 1000, pf: 0.12, taxLimit: 60000, tax: 0.1 };
const MZ = payroll(48000, MZ_R);
const MZ_S = new Sheet({
  B2: 48000, C2: '=ROUND(B2*DARate,0)', D2: '=ROUND(B2*HRARate,0)', E2: '=IF(B2<35000,1600,2400)', F2: '=CCA', G2: '=SUM(B2:F2)',
  H2: '=ROUND((B2+C2)*PFRate,0)', I2: '=IF(G2>TaxLimit,ROUND((G2-TaxLimit)*TaxRate,0),0)', J2: '=H2+I2', K2: '=G2-J2',
  N2: '40%', N3: '20%', N4: '12%', N5: 1000, N6: 60000, N7: '10%',
}, { names: { DARate: 'N2', HRARate: 'N3', PFRate: 'N4', CCA: 'N5', TaxLimit: 'N6', TaxRate: 'N7' } });
check(MZ_S.get('G2') === MZ.gross && MZ_S.get('H2') === MZ.pf && MZ_S.get('I2') === MZ.tax && MZ_S.get('K2') === MZ.net, 'Mizhavu sheet = arithmetic');
pin(MZ.net, 70116, 'Mizhavu net');
Q('s3_payroll_net', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `In the salary sheet of an imagined mat maker, Mizhavu Mats, row 2 holds a supervisor whose basic pay is ${rs(48000)} (B2). The sheet already shows DA ${rs(MZ.da)} (40% of basic), HRA ${rs(MZ.hra)} (20%), TA ${rs(MZ.ta)} and CCA ${rs(MZ.cca)} in C2 to F2. Provident fund is 12% of basic plus DA (rate in a cell named PFRate); income tax, under a simplified rule used only in this exercise, is 10% (TaxRate) of the monthly gross pay above ${rs(60000)} (TaxLimit). Write the formulas for gross pay (G2), provident fund (H2), income tax (I2), total deductions (J2) and net pay (K2), and state their values.`,
  model: `${md(['Cell', 'Formula', 'Shows'], MZ_S.formulaRows(['G2', 'H2', 'I2', 'J2', 'K2']))}\n\nCheck: net pay ${fig(MZ.net)} + deductions ${fig(MZ.ded)} = gross pay ${fig(MZ.gross)}.`,
  sol: 'Gross is the sum of pay and allowances; deductions are worked out on their own bases; net is gross less deductions.',
  scheme: [[`Gross pay formula and ${fig(MZ.gross)}`, 1], [`PF ${fig(MZ.pf)} and income tax ${fig(MZ.tax)} formulas`, 1], [`Total deductions and net pay ${fig(MZ.net)}`, 1]],
}));

const KN_staff = [['E-01', 'Jhilik', 28000], ['E-02', 'Kaustav', 39500], ['E-03', 'Moumita', 56000]];
const KN_R = { da: 0.4, hra: 0.15, taLimit: 30000, taLow: 1400, taHigh: 2100, cca: 900, pf: 0.12, taxLimit: 60000, tax: 0.1 };
const KN = new Sheet({
  A1: 'Code', B1: 'Name', C1: 'Basic (₹)', D1: 'DA (₹)', E1: 'HRA (₹)', F1: 'TA (₹)', G1: 'CCA (₹)', H1: 'Gross (₹)', I1: 'PF (₹)', J1: 'Income tax (₹)', K1: 'Net pay (₹)',
  ...Object.fromEntries(KN_staff.flatMap(([c, n, b], i) => {
    const r = i + 2;
    return [[`A${r}`, c], [`B${r}`, n], [`C${r}`, b], [`D${r}`, `=ROUND(C${r}*DARate,0)`], [`E${r}`, `=ROUND(C${r}*HRARate,0)`], [`F${r}`, `=IF(C${r}<30000,1400,2100)`], [`G${r}`, '=CCA'], [`H${r}`, `=SUM(C${r}:G${r})`], [`I${r}`, `=ROUND((C${r}+D${r})*PFRate,0)`], [`J${r}`, `=IF(H${r}>TaxLimit,ROUND((H${r}-TaxLimit)*TaxRate,0),0)`], [`K${r}`, `=H${r}-I${r}-J${r}`]];
  })),
  B5: 'Total', H5: '=SUM(H2:H4)', I5: '=SUM(I2:I4)', J5: '=SUM(J2:J4)', K5: '=SUM(K2:K4)',
  N2: '40%', N3: '15%', N4: 900, N5: '12%', N6: 60000, N7: '10%',
}, { names: { DARate: 'N2', HRARate: 'N3', CCA: 'N4', PFRate: 'N5', TaxLimit: 'N6', TaxRate: 'N7' } });
const KN_P = KN_staff.map(([, , b]) => payroll(b, KN_R));
KN_P.forEach((p, i) => check(KN.get(`H${i + 2}`) === p.gross && KN.get(`I${i + 2}`) === p.pf && KN.get(`J${i + 2}`) === p.tax && KN.get(`K${i + 2}`) === p.net, `Kinnari row ${i}`));
check(KN.get('K5') === sum(KN_P.map((p) => p.net)) && KN.get('H5') - KN.get('I5') - KN.get('J5') === KN.get('K5'), 'Kinnari totals');
pin(KN.get('K5'), 175574, 'Kinnari total net');
pin(KN_P[1].tax, 423, 'Kaustav tax: 4,225 × 10% = 422.5 rounds half up');
const KN_taxed = KN_staff.filter((_, i) => KN_P[i].tax > 0).map(([, n], i) => n);
check(KN_taxed.join() === 'Kaustav,Moumita' && KN_P[0].tax === 0, 'Kinnari taxed employees');
Q('l5_payroll', long({
  t: 5, d: 4, c: 'application', marks: 5,
  stem: `An imagined knitwear unit, Kinnari Knitwear, prepares its salary sheet for three employees: ${KN_staff.map(([c, n, b]) => `${n} (${c}, basic ${rs(b)})`).join(', ')}. Codes, names and basic pay are in columns A to C from row 2. The rules: DA 40% of basic (cell named DARate); HRA 15% of basic (HRARate); TA ${rs(1400)} if basic is below ${rs(30000)}, otherwise ${rs(2100)}; CCA ${rs(900)} (CCA); provident fund 12% of basic plus DA (PFRate); income tax, under a simplified rule for this exercise only, 10% (TaxRate) of the monthly gross above ${rs(60000)} (TaxLimit). Round every percentage to the rupee.\n\n(a) Write the formulas in row 2 for DA, HRA, TA, CCA and gross pay (D2 to H2), and give the gross pay of each employee. [2]\n\n(b) Write the formulas in row 2 for provident fund, income tax and net pay (I2 to K2) and for the total net pay in K5, and give the deductions and net pay of each employee and the total net pay. [3]`,
  model: `**(a)** Row 2 formulas (copied down to rows 3 and 4):\n\n${md(['Cell', 'Formula', 'Row 2 shows'], KN.formulaRows(['D2', 'E2', 'F2', 'G2', 'H2']))}\n\n**(b)**\n\n${md(['Cell', 'Formula', 'Row 2 shows'], KN.formulaRows(['I2', 'J2', 'K2', 'K5']))}\n\n**The completed sheet (values):**\n\n${KN.md(['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'], [1, 2, 3, 4, 5], 'value')}\n\n${KN_staff[0][1]}’s gross pay (${fig(KN_P[0].gross)}) is within the tax limit, so no tax is deducted; ${KN_taxed.map((n) => { const i = KN_staff.findIndex((s) => s[1] === n); return `${n} pays 10% of ${fig(KN_P[i].gross - 60000)}, that is ${fig(KN_P[i].tax)}`; }).join(', and ')} (ROUND takes 422.5 up to 423).`,
  sol: 'Allowances on basic pay with named rates; TA by an IF; gross by SUM; deductions on their own bases; net = gross − PF − tax.',
  scheme: [['(a) DA, HRA and CCA formulas with names', 1], ['(a) TA by IF and gross pay of each employee', 1], ['(b) PF and income-tax formulas', 1], ['(b) Deductions of each employee', 1], [`(b) Net pay and total ${fig(KN.get('K5'))}`, 1]],
}));

// --- sales and salesmen's commission
const DF = { sales: 340000, target: 250000, low: 0.02, high: 0.04 };
const DF_c = commission(DF.sales, DF.target, DF.low, DF.high);
pin(DF_c, 8600, 'Dafli commission');
Q('m_commission', mcq({
  t: 5, d: 3, c: 'application',
  stem: `An imagined footwear dealer, Dafli Footwear, pays each salesman 2% commission on sales up to his target of ${rs(DF.target)} and 4% on sales above the target. In its sheet the formula is ${code('=IF(C2>250000,ROUND(250000*2%+(C2-250000)*4%,0),ROUND(C2*2%,0))')}. What will it show for a salesman whose sales in C2 are ${rs(DF.sales)}?`,
  opts: [num_(DF_c), num_(round(DF.sales * 0.04, 0)), num_(round(DF.sales * 0.02, 0)), num_(round((DF.sales - DF.target) * 0.04, 0))],
  sol: `Sales exceed the target, so the first branch applies: 2% of 2,50,000 = 5,000, plus 4% of the excess 90,000 = 3,600, total ${fig(DF_c)}.`,
}));
check(new Sheet({ C2: DF.sales, D2: '=IF(C2>250000,ROUND(250000*2%+(C2-250000)*4%,0),ROUND(C2*2%,0))' }).get('D2') === DF_c, 'Dafli sheet');

const UD = new Sheet({ C2: 526000, D2: '=IF(C2>400000,ROUND(400000*2%+(C2-400000)*5%,0),ROUND(C2*2%,0))' });
const UD_v = UD.get('D2');
check(UD_v === commission(526000, 400000, 0.02, 0.05), 'Udukkai');
Q('num_commission', num({
  t: 5, d: 4, c: 'application', marks: 1, value: UD_v, unit: '₹',
  stem: `An imagined utensil maker, Udukkai Utensils, works out commission with ${f(UD, 'D2')}. What will D2 show for a salesman with sales of ${rs(526000)} in C2?`,
  sol: `526,000 is above 4,00,000, so commission = 2% × 4,00,000 + 5% × 1,26,000 = 8,000 + 6,300 = ${fig(UD_v)}, that is ₹${fig(UD_v)}.`,
}));

const PA = new Sheet({ B2: 240000, C2: 186000, D2: '=B2-C2', E2: '=ROUND(D2/B2*100,2)', F2: '=ROUND(D2/C2*100,2)' });
check(PA.get('E2') === 22.5 && PA.get('F2') === 29.03, 'Parai');
Q('m_profit_pct', mcq({
  t: 5, d: 2, c: 'application',
  stem: `In the sales sheet of an imagined paint dealer, Parai Paints, B2 holds sales of ${rs(240000)}, C2 the cost of goods sold, ${rs(186000)}, and D2 holds ${f(PA, 'D2')}. What will ${f(PA, 'E2')} in E2 show?`,
  opts: [String(PA.get('E2')), String(PA.get('F2')), String(100 - PA.get('E2')), num_(PA.get('D2'))],
  sol: `Profit = ${fig(PA.get('D2'))}; on sales it is ${fig(PA.get('D2'))} ÷ ${fig(240000)} × 100 = ${PA.get('E2')}. Dividing by cost (${PA.get('F2')}) would give the mark-up on cost instead.`,
}));

const HG = new Sheet({ A1: 'Target', B1: 300000, A3: 'Salesman', B3: 'Sales (₹)', C3: 'Commission (₹)', A4: 'Rehan', B4: 318000, C4: '=IF(B4>=Target,ROUND(B4*3%,0),ROUND(B4*1%,0))', A5: 'Tulika', B5: 276000, C5: '=IF(B5>=Target,ROUND(B5*3%,0),ROUND(B5*1%,0))' }, { names: { Target: 'B1' } });
check(HG.get('C4') === 9540 && HG.get('C5') === 2760, 'Halgi');
Q('s2_commission', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `An imagined home-decor shop, Halgi Home Decor, pays 3% commission on the whole sales of a salesman who reaches the monthly target of ${rs(300000)} (in a cell named Target) and 1% to one who does not, rounded to the rupee. Rehan’s sales (B4) are ${rs(318000)} and Tulika’s (B5) ${rs(276000)}. Write the commission formula for C4 that can be copied to C5, and state both commissions.`,
  model: `${HG.md(['A', 'B', 'C'], [3, 4, 5], 'both')}\n\nRehan reaches the target, so 3% applies to all his sales; Tulika falls short, so she gets 1%.`,
  sol: 'An IF compares sales with the named target and chooses the rate.',
  scheme: [['IF formula with the named target', 1], [`Commissions ${fig(HG.get('C4'))} and ${fig(HG.get('C5'))}`, 1]],
}));

const KH_men = [['Arijit', 412000, 309000], ['Barnali', 286000, 223100], ['Chiranjib', 355000, 269800], ['Debolina', 298000, 232500]];
const KH_T = 300000;
const KH = new Sheet({
  A1: 'Target', B1: KH_T,
  A3: 'Salesman', B3: 'Sales (₹)', C3: 'Cost of goods sold (₹)', D3: 'Profit (₹)', E3: 'Profit on sales (%)', F3: 'Commission (₹)', G3: 'Status',
  ...Object.fromEntries(KH_men.flatMap(([n, s, c], i) => {
    const r = i + 4;
    return [[`A${r}`, n], [`B${r}`, s], [`C${r}`, c], [`D${r}`, `=B${r}-C${r}`], [`E${r}`, `=ROUND(D${r}/B${r}*100,2)`], [`F${r}`, `=IF(B${r}>Target,ROUND(Target*2%+(B${r}-Target)*5%,0),ROUND(B${r}*2%,0))`], [`G${r}`, `=IF(B${r}>=Target,"Target met","Below target")`]];
  })),
  A8: 'Total', B8: '=SUM(B4:B7)', C8: '=SUM(C4:C7)', D8: '=SUM(D4:D7)', E8: '=ROUND(D8/B8*100,2)', F8: '=SUM(F4:F7)',
}, { names: { Target: 'B1' } });
KH_men.forEach(([, s, c], i) => {
  const r = i + 4;
  check(KH.get(`D${r}`) === s - c && KH.get(`F${r}`) === commission(s, KH_T, 0.02, 0.05) && KH.get(`G${r}`) === (s >= KH_T ? 'Target met' : 'Below target'), `Khanjari row ${r}`);
});
pin(KH.get('F8'), sum(KH_men.map(([, s]) => commission(s, KH_T, 0.02, 0.05))), 'Khanjari total commission');
Q('l5_sales', long({
  t: 5, d: 4, c: 'application', marks: 5,
  stem: `An imagined bicycle dealer, Khanjari Cycles, analyses the sales of four salesmen. The monthly target, ${rs(KH_T)}, is in B1, named Target:\n\n${md(['Row', 'Salesman', 'Sales (₹)', 'Cost of goods sold (₹)'], KH_men.map(([n, s, c], i) => [String(i + 4), n, fig(s), fig(c)]), [2, 3])}\n\n(a) Write the formulas in row 4 for the profit (D4) and the profit as a percentage of sales to two decimal places (E4), and give both for every salesman. [2]\n\n(b) Commission is 2% of sales up to the target and 5% of sales above it, rounded to the rupee; G shows "Target met" or "Below target". Write the formulas for F4 and G4 and for the total commission in F8, and give the results. [3]`,
  model: `**(a)** ${code(KH.cells.D4)} and ${code(KH.cells.E4)}, copied down.\n\n**(b)** ${code(KH.cells.F4)}; ${code(KH.cells.G4)}; total ${code(KH.cells.F8)}.\n\n${KH.md(['A', 'B', 'D', 'E', 'F', 'G'], [4, 5, 6, 7, 8], 'value')}\n\nOverall profit on sales is ${KH.get('E8')}%; only ${KH_men.filter(([, s]) => s >= KH_T).map(([n]) => n).join(' and ')} earn the higher rate on the excess over the target.`,
  sol: 'Profit = sales − cost; percentage on sales; a two-slab IF for commission; a text IF for the status.',
  scheme: [['(a) Profit and percentage formulas', 1], ['(a) Profit and percentage for every salesman', 1], ['(b) Commission formula with the named target', 1], ['(b) Status formula and results', 1], [`(b) Commissions and total ${fig(KH.get('F8'))}`, 1]],
}));

// --- student marks
const PB = new Sheet({ G2: 59.6, H2: '=IF(G2>=80,"A",IF(G2>=60,"B",IF(G2>=40,"C","D")))' });
check(PB.get('H2') === grade(59.6, [[80, 'A'], [60, 'B'], [40, 'C']], 'D'), 'Pambai grade');
Q('m_grade', mcq({
  t: 5, d: 3, c: 'application',
  stem: `The result sheet of an imagined school, Pambai Public School, holds a student’s percentage, ${PB.get('G2')}, in G2 and ${f(PB, 'H2')} in H2. What will H2 show?`,
  opts: ['C', 'B', 'A', 'D'],
  sol: `The tests are read from the left and the first true one decides: ${PB.get('G2')} is not at least 80 or 60, but it is at least 40, so the grade is ${PB.get('H2')}.`,
}));

const UA_marks = [74, 38, 61, 29, 55];
const UA = new Sheet({ ...Object.fromEntries(UA_marks.map((m, i) => [`${colName(i + 1)}2`, m])), A2: 'Roll 12', G2: '=SUM(B2:F2)', H2: '=ROUND(G2/500*100,2)', I2: '=IF(MIN(B2:F2)>=33,"Pass","Fail")' });
check(UA.get('G2') === 257 && UA.get('H2') === 51.4 && UA.get('I2') === 'Fail', 'Urumi');
Q('s3_marks', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `In the marks sheet of an imagined coaching school, Urumi Academy, a student’s marks out of 100 in five papers are in B2 to F2: ${UA_marks.join(', ')}. A student passes only if he scores at least 33 in every paper. Write the formulas for the total (G2), the percentage to two decimal places (H2) and the result, Pass or Fail (I2), and state what each shows.`,
  model: `${md(['Cell', 'Formula', 'Shows'], UA.formulaRows(['G2', 'H2', 'I2']))}\n\nThe percentage is above 33, but one paper (29) is below the pass mark, so MIN(B2:F2) is 29 and the result is ${UA.get('I2')}.`,
  sol: 'Use the lowest mark, not the percentage, to test the rule for every paper.',
  scheme: [[`Total ${UA.get('G2')}`, 1], [`Percentage ${UA.get('H2')}`, 1], [`Result formula and ${UA.get('I2')}`, 1]],
}));

const BV_st = [['Rupsa', [82, 77, 91, 68, 85]], ['Tanmoy', [64, 58, 49, 71, 60]], ['Ankita', [45, 31, 52, 48, 40]], ['Sayan', [91, 88, 84, 95, 79]]];
const BV_cut = [[80, 'A'], [60, 'B'], [40, 'C']];
const BV = new Sheet({
  A1: 'Name', B1: 'Accounts', C1: 'Commerce', D1: 'Economics', E1: 'English', F1: 'Mathematics', G1: 'Total', H1: 'Percentage', I1: 'Result', J1: 'Grade',
  ...Object.fromEntries(BV_st.flatMap(([n, ms], i) => {
    const r = i + 2;
    return [[`A${r}`, n], ...ms.map((m, j) => [`${colName(j + 1)}${r}`, m]), [`G${r}`, `=SUM(B${r}:F${r})`], [`H${r}`, `=ROUND(G${r}/5,2)`], [`I${r}`, `=IF(MIN(B${r}:F${r})>=35,"Pass","Fail")`], [`J${r}`, `=IF(I${r}="Fail","E",IF(H${r}>=80,"A",IF(H${r}>=60,"B",IF(H${r}>=40,"C","D"))))`]];
  })),
  A7: 'Students passed', B7: '=COUNTIF(I2:I5,"Pass")', A8: 'Class average (%)', B8: '=ROUND(AVERAGE(H2:H5),2)',
});
BV_st.forEach(([, ms], i) => {
  const r = i + 2;
  const p = round(sum(ms) / 5, 2);
  const res = Math.min(...ms) >= 35 ? 'Pass' : 'Fail';
  check(BV.get(`H${r}`) === p && BV.get(`I${r}`) === res && BV.get(`J${r}`) === (res === 'Fail' ? 'E' : grade(p, BV_cut, 'D')), `Bhorthal row ${r}`);
});
check(BV.get('B7') === 3, 'Bhorthal passes');
Q('l5_marks', long({
  t: 5, d: 4, c: 'application', marks: 5,
  stem: `The class teacher of an imagined school, Bhorthal Vidyalaya, keeps Class 12 marks (out of 100) in B2:F5:\n\n${md(['Row', 'Name', 'Accounts', 'Commerce', 'Economics', 'English', 'Mathematics'], BV_st.map(([n, ms], i) => [String(i + 2), n, ...ms.map(String)]))}\n\nA student passes only with at least 35 in every subject. Grades on the percentage: A for 80 and above, B for 60 and above, C for 40 and above, D below 40; a student who fails gets E whatever the percentage.\n\n(a) Write the formulas in row 2 for the total (G2), the percentage to two decimal places (H2) and the result (I2), and give them for all four students. [2]\n\n(b) Write the grade formula for J2 and formulas for the number of students who passed (B7) and the class average percentage (B8), and give the results. [3]`,
  model: `**(a)** ${code(BV.cells.G2)}, ${code(BV.cells.H2)} and ${code(BV.cells.I2)}, copied down.\n\n**(b)** ${code(BV.cells.J2)}\n\nB7: ${code(BV.cells.B7)} → ${bold(BV.shown('B7'))}; B8: ${code(BV.cells.B8)} → ${bold(BV.shown('B8'))}.\n\n${BV.md(['A', 'G', 'H', 'I', 'J'], [1, 2, 3, 4, 5], 'value')}\n\n${BV_st[2][0]} has a percentage above 40, but 31 in Commerce makes the result Fail and the grade E.`,
  sol: 'MIN tests every subject at once; the grade IF checks the result first, then the cut-offs from the highest down; COUNTIF counts the passes.',
  scheme: [['(a) Total, percentage and result formulas', 1], ['(a) Values for all four students', 1], ['(b) Nested grade formula', 1], ['(b) Grades of all four students', 1], ['(b) COUNTIF and AVERAGE results', 1]],
}));

// --- journal in a spreadsheet
const TK_rows = [
  [serial(2026, 5, 4), 'Purchases', 25000, 0], [serial(2026, 5, 4), 'Hemanta Saikia (creditor)', 0, 25000],
  [serial(2026, 5, 9), 'Cash', 18000, 0], [serial(2026, 5, 9), 'Sales', 0, 1800],
  [serial(2026, 5, 15), 'Rent', 6000, 0], [serial(2026, 5, 15), 'Cash', 0, 6000],
];
const TK = new Sheet({
  A1: 'Date', B1: 'Account', C1: 'Debit (₹)', D1: 'Credit (₹)',
  ...Object.fromEntries(TK_rows.flatMap(([d, a, dr, cr], i) => [[`A${i + 2}`, d], [`B${i + 2}`, a], ...(dr ? [[`C${i + 2}`, dr]] : []), ...(cr ? [[`D${i + 2}`, cr]] : [])])),
  B8: 'Total', C8: '=SUM(C2:C7)', D8: '=SUM(D2:D7)', B9: 'Check', C9: '=IF(C8=D8,"Agreed","Check entries")', D9: '=C8-D8',
}, { formats: { A: 'dd-mm-yyyy' } });
check(TK.get('C9') === 'Check entries' && TK.get('D9') === 18000 - 1800, 'Tokari mismatch');
Q('s3_journal', short({
  t: 5, d: 4, c: 'analysis', marks: 3,
  stem: `The accountant of an imagined trading firm, Tokari Traders, keeps the May 2026 journal in a sheet:\n\n${TK.md(['A', 'B', 'C', 'D'], [1, 2, 3, 4, 5, 6, 7], 'value')}\n\n(a) Write formulas for the debit and credit totals in C8 and D8, a check in C9 that shows "Agreed" when the totals are equal and "Check entries" otherwise, and the difference in D9. (b) State what C9 and D9 will show, and find the faulty entry.`,
  model: `**(a)–(b)**\n\n${TK.md(['B', 'C', 'D'], [8, 9], 'both')}\n\nThe difference of ${fig(TK.get('D9'))} = 18,000 − 1,800: the credit to Sales on 9 May was keyed as 1,800 instead of 18,000. Correcting D5 to 18,000 makes both totals ${fig(TK.get('C8'))} and C9 shows Agreed.`,
  sol: 'Total each column with SUM, compare them with IF, and read the difference to trace the slip.',
  scheme: [['SUM totals and the IF check formula', 1], [`C9 shows Check entries; D9 shows ${fig(TK.get('D9'))}`, 1], ['Faulty sales credit identified and corrected', 1]],
}));

const SR_tx = [
  [serial(2026, 4, 1), 'Cash', 'Capital', 300000, 'Started business with cash'],
  [serial(2026, 4, 3), 'Bank', 'Cash', 180000, 'Cash deposited into the bank'],
  [serial(2026, 4, 6), 'Machinery', 'Bank', 95000, 'Sawing machine bought by cheque'],
  [serial(2026, 4, 10), 'Purchases', 'Cash', 42000, 'Timber bought for cash'],
  [serial(2026, 4, 15), 'Nilutpal Gogoi (debtor)', 'Sales', 68000, 'Sawn timber sold on credit'],
  [serial(2026, 4, 22), 'Cash', 'Nilutpal Gogoi (debtor)', 40000, 'Cash received from the debtor'],
];
const SR_cells = { A1: 'Date', B1: 'Account', C1: 'Debit (₹)', D1: 'Credit (₹)' };
SR_tx.forEach(([d, dr, cr, amt], i) => {
  const r = 2 + 2 * i;
  Object.assign(SR_cells, { [`A${r}`]: d, [`B${r}`]: dr, [`C${r}`]: amt, [`A${r + 1}`]: d, [`B${r + 1}`]: cr, [`D${r + 1}`]: amt });
});
const SR_last = 1 + 2 * SR_tx.length;
Object.assign(SR_cells, {
  [`B${SR_last + 1}`]: 'Total', [`C${SR_last + 1}`]: `=SUM(C2:C${SR_last})`, [`D${SR_last + 1}`]: `=SUM(D2:D${SR_last})`, [`B${SR_last + 2}`]: 'Check', [`C${SR_last + 2}`]: `=IF(C${SR_last + 1}=D${SR_last + 1},"Agreed","Check entries")`,
  F2: 'Ledger account', G2: 'Balance (₹)',
  F3: 'Cash', G3: `=SUMIF(B2:B${SR_last},F3,C2:C${SR_last})-SUMIF(B2:B${SR_last},F3,D2:D${SR_last})`,
  F4: 'Bank', G4: `=SUMIF(B2:B${SR_last},F4,C2:C${SR_last})-SUMIF(B2:B${SR_last},F4,D2:D${SR_last})`,
  F5: 'Nilutpal Gogoi (debtor)', G5: `=SUMIF(B2:B${SR_last},F5,C2:C${SR_last})-SUMIF(B2:B${SR_last},F5,D2:D${SR_last})`,
});
const SR = new Sheet(SR_cells, { formats: { A: 'dd-mm-yyyy' } });
const SR_bal = (acct) => sum(SR_tx.map(([, dr, cr, amt]) => (dr === acct ? amt : 0) - (cr === acct ? amt : 0)));
check(SR.get('G3') === SR_bal('Cash') && SR.get('G4') === SR_bal('Bank') && SR.get('G5') === SR_bal('Nilutpal Gogoi (debtor)'), 'Sarinda ledger');
check(SR.get(`C${SR_last + 2}`) === 'Agreed' && SR.get(`C${SR_last + 1}`) === sum(SR_tx.map((t) => t[3])), 'Sarinda totals');
pin(SR.get('G3'), 118000, 'Sarinda cash');
Q('l5_journal', long({
  t: 5, d: 4, c: 'application', marks: 5,
  stem: `Mr Nayan Deka runs an imagined saw mill, Sarinda Saw Mills, and keeps his April 2026 journal in a spreadsheet with columns Date (A), Account (B), Debit (C) and Credit (D), one line for each account in an entry, starting in row 2:\n\n${SR_tx.map(([d, , , amt, text]) => `- ${longDate(d)}: ${text}, ${rs(amt)}.`).join('\n')}\n\n(a) Show the journal lines as they would appear in rows 2 to ${SR_last}. [2]\n\n(b) Write formulas for the debit and credit totals in row ${SR_last + 1} with an agreement check in C${SR_last + 2}, and, in column G, formulas using SUMIF that give the balances of the Cash, Bank and Nilutpal Gogoi accounts named in F3, F4 and F5. State every result. [3]`,
  model: `**(a)**\n\n${SR.md(['A', 'B', 'C', 'D'], Array.from({ length: SR_last - 1 }, (_, i) => i + 2), 'value')}\n\n**(b)**\n\n${SR.md(['B', 'C', 'D'], [SR_last + 1, SR_last + 2], 'both')}\n\n${md(['Cell', 'Formula', 'Shows'], SR.formulaRows(['G3', 'G4', 'G5']))}\n\nCash: received ${fig(300000 + 40000)}, paid out ${fig(180000 + 42000)}, balance ${fig(SR.get('G3'))} (debit). Bank ${fig(SR.get('G4'))} (debit); the debtor still owes ${fig(SR.get('G5'))}.`,
  sol: 'Each entry takes two lines, a debit line and a credit line; SUMIF adds the debit or credit amounts of the lines whose account matches.',
  scheme: [['(a) Debit and credit lines for all six entries', 2], ['(b) Totals and agreement check', 1], ['(b) SUMIF balance formula', 1], ['(b) Balances of cash, bank and the debtor', 1]],
}));

Q('fb_sumif', fb({
  t: [5, 6], d: 2, c: 'recall',
  stem: 'To total only the debit amounts of the lines whose account is Cash in the journal sheet of an imagined grocer, Ghumot Grocers, the accountant uses the conditional-sum function ___.',
  acc: [['SUMIF', 'SUMIF()']],
  sol: 'SUMIF(range to test, condition, range to add) adds only the amounts in rows that meet the condition, for example the Cash lines.',
}));

// ================================================================ t06 Charts, database, sorting and filtering
Q('m_chart_pie', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'The owner of an imagined crafts workshop, Kamaicha Crafts, wants one chart showing what share of this year’s total cost went on wood, lacquer, wages, power and transport. Which chart suits this best?',
  opts: ['A pie chart', 'A line chart', 'A scatter chart', 'A column chart of the five costs over five years'],
  sol: 'A pie chart divides one whole into slices, so each cost appears as its share of the year’s total cost.',
}));

const DH_recs = [
  { inv: 'D-101', cust: 'Kalita Stores', region: 'West', amt: 46200 },
  { inv: 'D-102', cust: 'Barman Traders', region: 'East', amt: 58300 },
  { inv: 'D-103', cust: 'Rabha Agencies', region: 'East', amt: 61750 },
  { inv: 'D-104', cust: 'Doloi Mart', region: 'North', amt: 39900 },
  { inv: 'D-105', cust: 'Lahon Brothers', region: 'West', amt: 52800 },
];
const DH_sorted = sortRecords(DH_recs, [['region', 'asc'], ['amt', 'desc']]);
check(DH_sorted[0].inv === 'D-103' && DH_sorted[1].inv === 'D-102', 'Dhak sort');
Q('m_sort', mcq({
  t: 6, d: 3, c: 'application',
  stem: `An imagined dealer, Dhak Dealers, sorts this list by Region (A to Z) and then by Amount (largest first):\n\n${recordTable(DH_recs, ['inv', 'cust', 'region', 'amt'], ['Invoice', 'Customer', 'Region', 'Amount (₹)'], ['amt'])}\n\nWhich record comes first after the sort?`,
  opts: [`${DH_sorted[0].inv}, ${DH_sorted[0].cust}`, `${DH_sorted[1].inv}, ${DH_sorted[1].cust}`, `${DH_recs[3].inv}, ${DH_recs[3].cust}`, `${DH_recs[0].inv}, ${DH_recs[0].cust}`],
  sol: `East comes first alphabetically; within East the larger amount (${fig(DH_sorted[0].amt)}) leads, so ${DH_sorted[0].cust} is first and ${DH_sorted[1].cust} second.`,
}));

const MS_recs = [
  ['M-201', 'Tinsukia', 72500, 'Due'], ['M-202', 'Golaghat', 41800, 'Paid'], ['M-203', 'Bongaigaon', 56300, 'Due'], ['M-204', 'Tinsukia', 38900, 'Due'],
  ['M-205', 'Golaghat', 64100, 'Paid'], ['M-206', 'Bongaigaon', 50000, 'Due'], ['M-207', 'Tinsukia', 49999, 'Due'], ['M-208', 'Golaghat', 81200, 'Due'],
].map(([inv, town, amt, st]) => ({ inv, town, amt, st }));
const MS_f = filterRecords(MS_recs, (r) => r.amt >= 50000 && r.st === 'Due');
pin(MS_f.length, 4, 'Mashak filter');
Q('m_filter', mcq({
  t: 6, d: 3, c: 'application',
  stem: `The sales list of an imagined motor-parts dealer, Mashak Motors, has eight records:\n\n${recordTable(MS_recs, ['inv', 'town', 'amt', 'st'], ['Invoice', 'Town', 'Amount (₹)', 'Status'], ['amt'])}\n\nThe accountant filters it to show records with Amount greater than or equal to 50000 and Status equal to Due. How many records remain visible?`,
  opts: [String(MS_f.length), String(MS_f.length - 1), String(MS_recs.filter((r) => r.st === 'Due').length), String(MS_recs.filter((r) => r.amt >= 50000).length)],
  sol: `Both conditions must hold: ${MS_f.map((r) => r.inv).join(', ')}. M-206 is exactly 50,000, which satisfies "greater than or equal to"; M-207 (49,999) does not, and paid invoices are hidden.`,
}));

const JJ_recs = [['J-11', 'Ring', 18500, 'Due'], ['J-12', 'Bangle', 42000, 'Paid'], ['J-13', 'Necklace', 96500, 'Due'], ['J-14', 'Ring', 12800, 'Paid'], ['J-15', 'Earring', 9600, 'Due'], ['J-16', 'Bangle', 37400, 'Due'], ['J-17', 'Necklace', 88000, 'Paid'], ['J-18', 'Ring', 21300, 'Due']].map(([inv, item, amt, st]) => ({ inv, item, amt, st }));
const JJ = new Sheet({ ...recordCells(JJ_recs, ['inv', 'item', 'amt', 'st'], ['Invoice', 'Item', 'Amount', 'Status']), F2: '=COUNTIF(D2:D9,"Due")' });
check(JJ.get('F2') === filterRecords(JJ_recs, (r) => r.st === 'Due').length, 'Jhanj COUNTIF = filter');
Q('num_countif', num({
  t: 6, d: 2, c: 'application', marks: 1, value: JJ.get('F2'), unit: null,
  stem: `The credit-sales list of an imagined jeweller, Jhanj Jewellers, has the status of eight invoices in D2 to D9: ${JJ_recs.map((r) => r.st).join(', ')}. What will ${f(JJ, 'F2')} show?`,
  sol: `COUNTIF counts the cells in D2:D9 equal to Due (ignoring capitals): ${JJ_recs.filter((r) => r.st === 'Due').map((r) => r.inv).join(', ')}, so the count is ${JJ.get('F2')}.`,
}));

const DM_recs = [['East', 48200], ['West', 36500], ['East', 52700], ['North', 29900], ['East', 41300], ['West', 57800], ['North', 33600], ['East', 25400]].map(([region, amt], i) => ({ inv: `R-${31 + i}`, region, amt }));
const DM = new Sheet({ ...recordCells(DM_recs, ['inv', 'region', 'amt'], ['Invoice', 'Region', 'Amount']), E2: '=SUMIF(B2:B9,"East",C2:C9)' });
const DM_v = DM.get('E2');
check(DM_v === sum(filterRecords(DM_recs, (r) => r.region === 'East').map((r) => r.amt)), 'Dhimay SUMIF = filter');
Q('num_sumif', num({
  t: 6, d: 3, c: 'application', marks: 1, value: DM_v, unit: '₹',
  stem: `An imagined distributor, Dhimay Distributors, lists eight invoices with the region in B2:B9 and the amount in C2:C9:\n\n${recordTable(DM_recs, ['inv', 'region', 'amt'], ['Invoice', 'Region', 'Amount (₹)'], ['amt'])}\n\nWhat will ${f(DM, 'E2')} show?`,
  sol: `It adds the amounts of the East rows only: ${filterRecords(DM_recs, (r) => r.region === 'East').map((r) => fig(r.amt)).join(' + ')} = ${fig(DM_v)}, that is ₹${fig(DM_v)}.`,
}));

Q('tf_filter', tf({
  t: 6, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? When the accountant of an imagined firm, Thudi Traders, filters its debtors list to show only the Due invoices, the Paid records are hidden, not deleted, and reappear when the filter is cleared.',
  sol: 'A filter only hides rows that fail the condition; the records stay in the sheet and come back when the filter is removed.',
}));

Q('mt_chart_parts', match({
  t: 6, d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of an imagined toy maker, Tuntuna Toys, has drawn a column chart of quarterly sales for two years. Match each part of her chart in column A with its role in column B.',
  pairs: [
    ['Chart title', 'Says what the chart shows, such as quarterly sales 2025 and 2026'],
    ['Legend', 'Tells which colour of column stands for which year'],
    ['Axis title', 'Names the quantity and unit along an axis, such as sales in ₹ lakh'],
    ['Data labels', 'Print the exact figure on or above each column'],
  ],
  sol: 'A chart is read through its title, the legend for the series, the axis titles for quantities and units, and data labels for exact values.',
}));

Q('ar_sort', ar({
  t: 6, d: 3, c: 'analysis', key: 'a',
  a: 'Before sorting the customer list of an imagined grain merchant, Gopiyantra Grains, by amount, the accountant should select the whole list, not just the Amount column.',
  r: 'Each row of a list is one record, and its fields must move together when the rows are rearranged.',
  sol: 'Both are true and R explains A: sorting one column alone would shuffle the amounts away from their customers and invoices, scrambling the records.',
}));

Q('s2_database_terms', short({
  t: 6, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined bookseller, Bheri Books, wants to keep its list of credit customers in a spreadsheet as a small database. Explain what a field and a record are in this list, and state one rule for laying the list out so that it can be sorted and filtered.',
  model: '**Field and record:** each column is a field holding one kind of fact, such as customer name, town, amount due or due date, with its field name in the heading row; each row is a record, all the facts about one customer.\n\n**Layout rule (any one):** keep one heading row with a unique name for every field; leave no blank rows or columns inside the list; keep one kind of entry in each column (dates as dates, amounts as numbers); keep other entries away from the list, separated by at least one blank row and column.',
  sol: 'Columns are fields, rows are records; then give a layout rule.',
  scheme: [['Field and record explained', 1], ['One valid layout rule', 1]],
}));

Q('s3_chart_steps', short({
  t: 6, d: 2, c: 'understanding', marks: 3,
  stem: 'The accountant of an imagined fabric house, Dundubhi Fabrics, has the monthly sales of its three branches for six months in a sheet (months in A2:A7, branches in B1:D1). Describe three steps to present these figures as a well-formatted chart that shows how each branch’s sales moved over the months.',
  model: '1. **Select the data and insert a suitable chart:** select A1:D7, including the month labels and branch headings, and insert a line chart (one line per branch), since the purpose is to show movement over time; a clustered column chart would also compare the branches month by month.\n2. **Add titles and a legend:** give the chart a title such as "Monthly sales by branch", label the axes (months; sales in ₹), and show the legend so each line can be matched with its branch.\n3. **Format and place it:** set the axis scale and number format, add data labels or markers if useful, move or resize the chart beside the table (or to its own sheet) and check it in print preview; the chart updates when the figures change.',
  sol: 'Select, choose the chart for the purpose, then label and format it.',
  scheme: [['Data selected and a suitable chart chosen with reason', 1], ['Title, axis titles and legend', 1], ['Formatting and placing the chart', 1]],
}));

const TM_recs = [
  ['T-41', 'Ranjan Auto', 'Haflong', 64500, serial(2026, 6, 18), 'Due'], ['T-42', 'Mog Motors', 'Diphu', 38200, serial(2026, 6, 2), 'Paid'],
  ['T-43', 'Zeme Garage', 'Haflong', 27900, serial(2026, 6, 25), 'Due'], ['T-44', 'Langthasa Transport', 'Diphu', 71300, serial(2026, 6, 9), 'Due'],
  ['T-45', 'Hmar Carriers', 'Haflong', 45800, serial(2026, 6, 14), 'Paid'], ['T-46', 'Teron Tyre Point', 'Diphu', 52600, serial(2026, 6, 21), 'Due'],
].map(([inv, cust, town, amt, due, st]) => ({ inv, cust, town, amt, due, dueS: fmtDate(due), st }));
const TM_sorted = sortRecords(TM_recs, [['town', 'asc'], ['amt', 'desc']]);
const TM_f = filterRecords(TM_recs, (r) => r.st === 'Due' && r.amt > 50000);
check(TM_sorted.map((r) => r.inv).join() === 'T-44,T-46,T-42,T-41,T-45,T-43' && TM_f.map((r) => r.inv).join() === 'T-41,T-44,T-46', 'Timila sort and filter');
Q('s3_sort_filter', short({
  t: 6, d: 3, c: 'application', marks: 3,
  stem: `An imagined tyre dealer, Timila Tyres, keeps this debtors list:\n\n${recordTable(TM_recs, ['inv', 'cust', 'town', 'amt', 'dueS', 'st'], ['Invoice', 'Customer', 'Town', 'Amount (₹)', 'Due date', 'Status'], ['amt'])}\n\n(a) Give the order of the invoices after sorting by Town (A to Z) and then by Amount (largest first). (b) Which invoices remain visible if the list is filtered for Status equal to Due and Amount greater than 50000?`,
  model: `**(a)** ${TM_sorted.map((r) => `${r.inv} (${r.town}, ${fig(r.amt)})`).join(' → ')}.\n\n**(b)** ${TM_f.map((r) => `${r.inv} ${r.cust} (${fig(r.amt)})`).join('; ')}: due and above 50,000; the other records are hidden, not deleted.`,
  sol: 'Sort by the first key, break ties by the second; a filter keeps rows that meet every condition.',
  scheme: [['(a) Diphu records first, largest amount first', 1], ['(a) Haflong records in order', 1], ['(b) The three filtered invoices', 1]],
}));

const MD_recs = [
  ['K-301', 'Hrangkhawl Motors', 'Route 1', 'Bikram', 84500, 'Due'], ['K-302', 'Debbarma Autos', 'Route 2', 'Lalnun', 46200, 'Paid'],
  ['K-303', 'Jamatia Service', 'Route 1', 'Lalnun', 58900, 'Due'], ['K-304', 'Reang Wheels', 'Route 3', 'Bikram', 39700, 'Due'],
  ['K-305', 'Halam Motor Works', 'Route 2', 'Bikram', 71800, 'Due'], ['K-306', 'Darlong Auto Care', 'Route 3', 'Lalnun', 66400, 'Paid'],
  ['K-307', 'Kaipeng Spares', 'Route 1', 'Bikram', 52300, 'Due'],
].map(([inv, cust, route, man, amt, st]) => ({ inv, cust, route, man, amt, st }));
const MD_sorted = sortRecords(MD_recs, [['man', 'asc'], ['amt', 'desc']]);
const MD_f = filterRecords(MD_recs, (r) => r.man === 'Bikram' && r.st === 'Due');
const MD = new Sheet({ ...recordCells(MD_recs, ['inv', 'cust', 'route', 'man', 'amt', 'st'], ['Invoice', 'Customer', 'Route', 'Salesman', 'Amount', 'Status']), I2: '=COUNTIF(F2:F8,"Due")', I3: '=SUMIF(F2:F8,"Due",E2:E8)', I4: '=SUMIF(D2:D8,"Lalnun",E2:E8)', I5: '=COUNTIF(E2:E8,">=60000")' });
check(MD.get('I2') === filterRecords(MD_recs, (r) => r.st === 'Due').length && MD.get('I3') === sum(filterRecords(MD_recs, (r) => r.st === 'Due').map((r) => r.amt)), 'Maddalam due queries');
check(MD.get('I4') === sum(filterRecords(MD_recs, (r) => r.man === 'Lalnun').map((r) => r.amt)) && MD.get('I5') === filterRecords(MD_recs, (r) => r.amt >= 60000).length, 'Maddalam other queries');
check(MD_f.map((r) => r.inv).join() === 'K-301,K-304,K-305,K-307', 'Maddalam filter');
Q('l5_database', long({
  t: 6, d: 5, c: 'application', marks: 5,
  stem: `An imagined spare-parts firm, Maddalam Motor Parts, keeps its sales list in A1:F8 (field names in row 1):\n\n${recordTable(MD_recs, ['inv', 'cust', 'route', 'man', 'amt', 'st'], ['Invoice (A)', 'Customer (B)', 'Route (C)', 'Salesman (D)', 'Amount ₹ (E)', 'Status (F)'], ['amt'])}\n\n(a) Give the order of the invoices after sorting by Salesman (A to Z) and then by Amount (largest first), and the invoices left visible when the list is filtered for Salesman equal to Bikram and Status equal to Due. [2]\n\n(b) Write formulas, with their results, for: the number of invoices still due (I2); the total amount still due (I3); the total sales made by Lalnun (I4); and the number of invoices of ${rs(60000)} or more (I5). [3]`,
  model: `**(a)** Sorted: ${MD_sorted.map((r) => `${r.inv} (${r.man}, ${fig(r.amt)})`).join(' → ')}.\n\nFiltered: ${MD_f.map((r) => r.inv).join(', ')} (total ${fig(sum(MD_f.map((r) => r.amt)))}).\n\n**(b)**\n\n${md(['Cell', 'Formula', 'Shows'], MD.formulaRows(['I2', 'I3', 'I4', 'I5']))}\n\nEach result can be checked by filtering the list on the same condition and counting or adding the visible rows.`,
  sol: 'Sort on two keys; a filter keeps rows meeting every condition; COUNTIF counts and SUMIF adds the rows meeting one condition.',
  scheme: [['(a) Sorted order', 1], ['(a) Filtered invoices', 1], ['(b) Count and total of due invoices', 1], ['(b) SUMIF for Lalnun', 1], ['(b) COUNTIF with a comparison', 1]],
}));

FACTS.push(
  `Kinnari payroll: three employees recomputed in plain arithmetic, total net pay ${fig(KN.get('K5'))}`,
  `Khanjari commission total ${fig(KH.get('F8'))} (two-slab IF = plain arithmetic)`,
  `Sarinda journal ${fig(SR.get(`C${SR_last + 1}`))} agreed; SUMIF cash ${fig(SR.get('G3'))}, bank ${fig(SR.get('G4'))}`,
  `Tutari interest ${fig(TU.get('G8'))} on overdue days counted from date serials`,
  `Maddalam COUNTIF / SUMIF equal to the filtered records (${MD.get('I2')} due, ${fig(MD.get('I3'))})`,
);
export { FACTS, BANK };
