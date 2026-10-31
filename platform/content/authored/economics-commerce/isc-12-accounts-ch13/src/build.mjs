// Build ISC 12 Accounts ch13 Accounting Application of Electronic Spreadsheet. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-accounts-ch13', 'economics-commerce');
const { fig, rs, rupees, words, spoken, check, pin, sum, md, bold, code, round, fmt, fmtDate, longDate, spokenDate, serial, Sheet, shiftFormula, freezeAt, sortRecords, filterRecords, recordTable, recordCells, payroll, commission, grade } = await import('./acc.mjs');
const { FACTS, BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fx = (s, ref) => code(s.cells[ref]);

// ================================================================ Part 1 cases
// Pakhawaj Paper Mart (imagined, Krishnanagar): one sheet per month and a summary sheet.
const PK_CATS = ['Exam pads', 'Registers', 'Files', 'Printer paper'];
const PK_MONTHS = [['April', [62400, 78500, 41200, 102500]], ['May', [70300, 81450, 45700, 115000]], ['June', [66800, 79900, 43600, 106000]]];
const PK_BOOK = Object.fromEntries(PK_MONTHS.map(([m, xs]) => [m, new Sheet({ A1: 'Line', B1: 'Sales (₹)', ...Object.fromEntries(PK_CATS.flatMap((c, i) => [[`A${i + 2}`, c], [`B${i + 2}`, xs[i]]])), A6: 'Total', B6: '=SUM(B2:B5)' })]));
const PK_SUM = new Sheet({
  A1: 'Month', B1: 'Sales (₹)',
  A2: 'April', B2: '=April!B6', A3: 'May', B3: '=May!B6', A4: 'June', B4: '=June!B6',
  A5: 'Quarter total', B5: '=SUM(B2:B4)', A6: 'Monthly average', B6: '=ROUND(AVERAGE(B2:B4),2)',
}, { book: PK_BOOK });
check(PK_SUM.get('B5') === sum(PK_MONTHS.flatMap(([, xs]) => xs)), 'Pakhawaj quarter');
pin(PK_SUM.get('B5'), 893350, 'Pakhawaj quarter total');
pin(PK_SUM.get('B6'), 297783.33, 'Pakhawaj monthly average');

// Pakhawaj sales register for one day's bulk orders (formulas, IF, a named total).
const PK_ITEMS = [['Exam pads', 400, 45], ['Registers', 120, 180], ['Files', 900, 28], ['Printer paper (reams)', 150, 260]];
const REG = new Sheet({
  A1: 'Item', B1: 'Quantity', C1: 'Rate (₹)', D1: 'Amount (₹)', E1: 'Discount (₹)', F1: 'Net (₹)', G1: 'Share (%)',
  ...Object.fromEntries(PK_ITEMS.flatMap(([n, q, r], i) => {
    const k = i + 2;
    return [[`A${k}`, n], [`B${k}`, q], [`C${k}`, r], [`D${k}`, `=B${k}*C${k}`], [`E${k}`, `=IF(D${k}>=20000,ROUND(D${k}*5%,0),0)`], [`F${k}`, `=D${k}-E${k}`], [`G${k}`, `=ROUND(F${k}/NetTotal*100,2)`]];
  })),
  A6: 'Total', D6: '=SUM(D2:D5)', E6: '=SUM(E2:E5)', F6: '=SUM(F2:F5)',
  A7: 'Average net order', F7: '=ROUND(AVERAGE(F2:F5),2)', A8: 'Largest net order', F8: '=MAX(F2:F5)', A9: 'Orders with a discount', F9: '=COUNTIF(E2:E5,">0")',
}, { names: { NetTotal: 'F6' } });
for (let k = 2; k <= 5; k++) check(REG.cells[`D${k}`] === shiftFormula('=B2*C2', k - 2, 0) && REG.cells[`E${k}`] === shiftFormula(REG.cells.E2, k - 2, 0), `register row ${k} is a copy of row 2`);
pin(REG.get('F6'), 99510, 'register net total');
pin(REG.get('E2'), 0, 'exam pads no discount');
pin(REG.get('F9'), 3, 'register discounts');

// The operators slide works on two cells of the register's day.
const OPS = new Sheet({ B1: 48000, B2: 36000, C1: '=B1+B2', C2: '=B1-B2', C3: '=B1*5%', C4: '=B1/B2', C5: '=(B1-B2)/B1*100', C6: '=B1-B2*2', C7: '=B1>B2', C8: '="Sales: "&B1' });
pin(OPS.get('C5'), 25, 'operators margin');
pin(OPS.get('C6'), -24000, 'operators precedence');

// Formats slide.
const FMT_ROWS = [[99510, 'General', 'General (as stored)'], [99510, '#,##0', 'Comma style'], [297783.333, '#,##0.00', 'Comma style, two decimals'], [0.1809, '0.0%', 'Percentage, one decimal'], [serial(2026, 4, 1), 'dd-mm-yyyy', 'Date dd-mm-yyyy'], [serial(2026, 4, 1), 'dd-mmm-yyyy', 'Date dd-mmm-yyyy'], [serial(2026, 4, 1), 'General', 'The same date as General']];
const FMT_SHOWN = FMT_ROWS.map(([v, f]) => fmt(v, f));
check(FMT_SHOWN.join(';') === '99510;99,510;2,97,783.33;18.1%;01-04-2026;01-Apr-2026;46113', 'format slide');

// Ghatam Glassware (imagined, Kalna): credit register with dates.
const GH_ROWS = [['Saha Caterers', 58400, serial(2026, 7, 12), 30], ['Biswas Hotel', 36250, serial(2026, 8, 5), 45], ['Mahato Banquets', 44900, serial(2026, 8, 28), 30], ['Kundu Sweets', 27600, serial(2026, 9, 16), 30]];
const GH = new Sheet({
  A1: 'As on', B1: serial(2026, 9, 30),
  A3: 'Customer', B3: 'Amount (₹)', C3: 'Invoice date', D3: 'Credit days', E3: 'Due date', F3: 'Days overdue', G3: 'Status',
  ...Object.fromEntries(GH_ROWS.flatMap(([c, a, d, cr], i) => {
    const r = i + 4;
    return [[`A${r}`, c], [`B${r}`, a], [`C${r}`, d], [`D${r}`, cr], [`E${r}`, `=C${r}+D${r}`], [`F${r}`, `=IF(AsOn>E${r},AsOn-E${r},0)`], [`G${r}`, `=IF(F${r}>30,"Follow up",IF(F${r}>0,"Overdue","Not due"))`]];
  })),
  A8: 'Overdue amount', B8: '=SUMIF(F4:F7,">0",B4:B7)',
}, { names: { AsOn: 'B1' }, formats: { B1: 'dd-mm-yyyy', C: 'dd-mm-yyyy', E: 'dd-mm-yyyy', D: '0', F: '0' } });
const GH_OD = GH_ROWS.map(([, , d, cr]) => Math.max(0, serial(2026, 9, 30) - d - cr));
GH_OD.forEach((o, i) => check(GH.get(`F${i + 4}`) === o, `Ghatam overdue ${i}`));
check(GH_OD.join() === '50,11,3,0' && GH.get('B8') === 58400 + 36250 + 44900, 'Ghatam results');

// ================================================================ Part 2 cases
// Sarangi Spice Exports (imagined, Raiganj): payroll.
const SA_R = { da: 0.4, hra: 0.2, taLimit: 30000, taLow: 1600, taHigh: 2400, cca: 1000, pf: 0.12, taxLimit: 50000, tax: 0.1 };
const SA_STAFF = [['Aparupa', 24000], ['Subhojit', 28500], ['Chumki', 32000], ['Debasish', 41000], ['Madhurima', 52500]];
const SA = new Sheet({
  A1: 'Name', B1: 'Basic', C1: 'DA', D1: 'HRA', E1: 'TA', F1: 'CCA', G1: 'Gross', H1: 'PF', I1: 'Income tax', J1: 'Deductions', K1: 'Net pay',
  ...Object.fromEntries(SA_STAFF.flatMap(([n, b], i) => {
    const r = i + 2;
    return [[`A${r}`, n], [`B${r}`, b], [`C${r}`, `=ROUND(B${r}*DARate,0)`], [`D${r}`, `=ROUND(B${r}*HRARate,0)`], [`E${r}`, `=IF(B${r}<30000,1600,2400)`], [`F${r}`, '=CCA'], [`G${r}`, `=SUM(B${r}:F${r})`], [`H${r}`, `=ROUND((B${r}+C${r})*PFRate,0)`], [`I${r}`, `=IF(G${r}>TaxLimit,ROUND((G${r}-TaxLimit)*TaxRate,0),0)`], [`J${r}`, `=H${r}+I${r}`], [`K${r}`, `=G${r}-J${r}`]];
  })),
  A7: 'Total', ...Object.fromEntries(['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((c) => [`${c}7`, `=SUM(${c}2:${c}6)`])),
  M1: 'Rate or amount', M2: 'DARate', N2: '40%', M3: 'HRARate', N3: '20%', M4: 'CCA', N4: 1000, M5: 'PFRate', N5: '12%', M6: 'TaxLimit', N6: 50000, M7: 'TaxRate', N7: '10%',
}, { names: { DARate: 'N2', HRARate: 'N3', CCA: 'N4', PFRate: 'N5', TaxLimit: 'N6', TaxRate: 'N7' } });
const SA_P = SA_STAFF.map(([, b]) => payroll(b, SA_R));
SA_P.forEach((p, i) => {
  const r = i + 2;
  check(['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((c) => SA.get(`${c}${r}`)).join() === [p.da, p.hra, p.ta, p.cca, p.gross, p.pf, p.tax, p.ded, p.net].join(), `Sarangi row ${r} = plain arithmetic`);
});
check(SA.get('G7') - SA.get('J7') === SA.get('K7') && SA.get('K7') === sum(SA_P.map((p) => p.net)), 'Sarangi totals');
pin(SA.get('G7'), 300200, 'Sarangi gross'); pin(SA.get('K7'), 264196, 'Sarangi net');
pin(SA_P[4].tax, 3740, 'Madhurima tax'); pin(SA_P[0].net, 36968, 'Aparupa net');

// Shehnai Home Appliances (imagined, Asansol): sales and commission.
const SH_T = 300000;
const SH_MEN = [['Brishti', 264000, 208560], ['Sourav', 318000, 247000], ['Srijita', 405000, 311850], ['Ayan', 297500, 229000], ['Tanveer', 352000, 274500]];
const SH = new Sheet({
  A1: 'Target', B1: SH_T,
  A3: 'Salesman', B3: 'Sales', C3: 'Cost of goods sold', D3: 'Profit', E3: 'Profit on sales (%)', F3: 'Commission', G3: 'Status',
  ...Object.fromEntries(SH_MEN.flatMap(([n, s, c], i) => {
    const r = i + 4;
    return [[`A${r}`, n], [`B${r}`, s], [`C${r}`, c], [`D${r}`, `=B${r}-C${r}`], [`E${r}`, `=ROUND(D${r}/B${r}*100,2)`], [`F${r}`, `=IF(B${r}>Target,ROUND(Target*2%+(B${r}-Target)*5%,0),ROUND(B${r}*2%,0))`], [`G${r}`, `=IF(B${r}>=Target,"Target met","Below target")`]];
  })),
  A9: 'Total', B9: '=SUM(B4:B8)', D9: '=SUM(D4:D8)', E9: '=ROUND(D9/B9*100,2)', F9: '=SUM(F4:F8)', G9: '=COUNTIF(G4:G8,"Target met")',
}, { names: { Target: 'B1' } });
SH_MEN.forEach(([, s, c], i) => check(SH.get(`F${i + 4}`) === commission(s, SH_T, 0.02, 0.05) && SH.get(`D${i + 4}`) === s - c, `Shehnai row ${i}`));
pin(SH.get('F9'), 37980, 'Shehnai commission'); pin(SH.get('G9'), 3, 'Shehnai targets met');
pin(SH.get('F6'), 11250, 'Srijita commission');

// Ektara Shiksha Niketan (imagined school, Bolpur): marks.
const EK_SUB = ['Accounts', 'Commerce', 'Economics', 'English'];
const EK_ST = [['Ritam', [78, 82, 69, 74]], ['Shreya', [55, 61, 48, 66]], ['Arshad', [91, 87, 95, 88]], ['Payel', [42, 30, 51, 47]], ['Kaushik', [67, 72, 58, 63]]];
const EK_CUT = [[75, 'A'], [60, 'B'], [45, 'C']];
const EK = new Sheet({
  A1: 'Name', ...Object.fromEntries(EK_SUB.map((s, j) => [`${'BCDE'[j]}1`, s])), F1: 'Total', G1: 'Percentage', H1: 'Result', I1: 'Grade',
  ...Object.fromEntries(EK_ST.flatMap(([n, ms], i) => {
    const r = i + 2;
    return [[`A${r}`, n], ...ms.map((m, j) => [`${'BCDE'[j]}${r}`, m]), [`F${r}`, `=SUM(B${r}:E${r})`], [`G${r}`, `=ROUND(F${r}/4,2)`], [`H${r}`, `=IF(MIN(B${r}:E${r})>=33,"Pass","Fail")`], [`I${r}`, `=IF(H${r}="Fail","E",IF(G${r}>=75,"A",IF(G${r}>=60,"B",IF(G${r}>=45,"C","D"))))`]];
  })),
  A8: 'Passed', B8: '=COUNTIF(H2:H6,"Pass")', A9: 'Highest percentage', B9: '=MAX(G2:G6)',
});
EK_ST.forEach(([, ms], i) => {
  const r = i + 2;
  const p = round(sum(ms) / 4, 2);
  const res = Math.min(...ms) >= 33 ? 'Pass' : 'Fail';
  check(EK.get(`G${r}`) === p && EK.get(`H${r}`) === res && EK.get(`I${r}`) === (res === 'Fail' ? 'E' : grade(p, EK_CUT, 'D')), `Ektara row ${r}`);
});
check(EK.get('B8') === 4 && EK.get('I5') === 'E' && EK.get('G5') > 33, 'Ektara pass count; Payel fails on one paper');

// Dilruba Dairy (imagined, Balurghat): journal and ledger balances by SUMIF.
const DL_TX = [
  [serial(2026, 5, 1), 'Bank', 'Capital', 500000], [serial(2026, 5, 4), 'Purchases (cattle feed)', 'Bank', 120000], [serial(2026, 5, 9), 'Cash', 'Sales', 86000],
  [serial(2026, 5, 14), 'Wages', 'Cash', 24000], [serial(2026, 5, 20), 'Bank', 'Cash', 50000], [serial(2026, 5, 26), 'Milk van', 'Bank', 240000],
];
const DL_cells = { A1: 'Date', B1: 'Account', C1: 'Debit', D1: 'Credit' };
DL_TX.forEach(([d, dr, cr, a], i) => { const r = 2 + 2 * i; Object.assign(DL_cells, { [`A${r}`]: d, [`B${r}`]: dr, [`C${r}`]: a, [`A${r + 1}`]: d, [`B${r + 1}`]: cr, [`D${r + 1}`]: a }); });
Object.assign(DL_cells, {
  B14: 'Total', C14: '=SUM(C2:C13)', D14: '=SUM(D2:D13)', B15: 'Check', C15: '=IF(C14=D14,"Agreed","Check entries")',
  F1: 'Account', G1: 'Balance', F2: 'Cash', G2: '=SUMIF(B2:B13,F2,C2:C13)-SUMIF(B2:B13,F2,D2:D13)', F3: 'Bank', G3: '=SUMIF(B2:B13,F3,C2:C13)-SUMIF(B2:B13,F3,D2:D13)',
});
const DL = new Sheet(DL_cells, { formats: { A: 'dd-mm-yyyy' } });
const DL_bal = (a) => sum(DL_TX.map(([, dr, cr, x]) => (dr === a ? x : 0) - (cr === a ? x : 0)));
check(DL.get('G2') === DL_bal('Cash') && DL.get('G3') === DL_bal('Bank') && DL.get('C15') === 'Agreed', 'Dilruba ledger');
pin(DL.get('G2'), 12000, 'Dilruba cash'); pin(DL.get('G3'), 190000, 'Dilruba bank'); pin(DL.get('C14'), 1020000, 'Dilruba total');

// Nadaswaram Hardware (imagined, Durgapur): debtors list as a database.
const ND = [
  ['N-01', 'Adak Builders', 'Benachity', 46500, 'Due'], ['N-02', 'Pyne Constructions', 'City Centre', 28900, 'Paid'], ['N-03', 'Kanrar Interiors', 'Benachity', 61200, 'Due'],
  ['N-04', 'Dolui Fabricators', 'Bidhannagar', 39400, 'Due'], ['N-05', 'Mallick Electricals', 'City Centre', 52700, 'Due'], ['N-06', 'Hazra Paints', 'Bidhannagar', 44800, 'Paid'],
  ['N-07', 'Nandi Plumbing', 'City Centre', 33600, 'Due'], ['N-08', 'Bag Tiles', 'Benachity', 57300, 'Paid'],
].map(([inv, cust, area, amt, st]) => ({ inv, cust, area, amt, st }));
const ND_F = ['inv', 'cust', 'area', 'amt', 'st'];
const ND_H = ['Invoice', 'Customer', 'Area', 'Amount (₹)', 'Status'];
const ND_SORT = sortRecords(ND, [['area', 'asc'], ['amt', 'desc']]);
const ND_FILT = filterRecords(ND, (r) => r.st === 'Due' && r.amt >= 40000);
check(ND_SORT.map((r) => r.inv).join() === 'N-03,N-08,N-01,N-06,N-04,N-05,N-07,N-02' && ND_FILT.map((r) => r.inv).join() === 'N-01,N-03,N-05', 'Nadaswaram sort and filter');
const NDS = new Sheet({ ...recordCells(ND, ND_F, ['Invoice', 'Customer', 'Area', 'Amount', 'Status']), H2: '=COUNTIF(E2:E9,"Due")', H3: '=SUMIF(E2:E9,"Due",D2:D9)', H4: '=SUMIF(C2:C9,"City Centre",D2:D9)', H5: '=COUNTIF(D2:D9,">=50000")' });
check(NDS.get('H2') === filterRecords(ND, (r) => r.st === 'Due').length && NDS.get('H3') === sum(filterRecords(ND, (r) => r.st === 'Due').map((r) => r.amt)), 'Nadaswaram due queries = filter');
check(NDS.get('H4') === sum(filterRecords(ND, (r) => r.area === 'City Centre').map((r) => r.amt)) && NDS.get('H5') === filterRecords(ND, (r) => r.amt >= 50000).length, 'Nadaswaram other queries = filter');
pin(NDS.get('H3'), 233400, 'Nadaswaram due total');

// ================================================================ SVG visuals
function windowSvg() {
  const s = new Svg(640, 400);
  s.rect(10, 10, 620, 380, { rx: 10 });
  s.rect(10, 10, 620, 30, { fill: 'fill', rx: 10, sw: 1.5 });
  s.text(320, 25, 'Title bar (workbook name)', { size: 13, bold: true });
  s.rect(10, 40, 620, 30, { fill: 'fill', rx: 0, sw: 1 });
  s.text(320, 55, 'Menu and toolbar (commands: format, insert, data, chart, print)', { size: 12 });
  s.rect(20, 78, 90, 24, { rx: 4, sw: 1.5 });
  s.text(65, 90, 'B3', { size: 13, bold: true });
  s.rect(120, 78, 500, 24, { rx: 4, sw: 1.5 });
  s.text(130, 90, PK_SUM.cells.B3, { size: 13, anchor: 'start' });
  s.text(65, 110, 'Name box', { size: 11, muted: true });
  s.text(370, 110, 'Formula bar (shows what the active cell holds)', { size: 11, muted: true });
  const X0 = 60, W = 93, Y0 = 120, H = 28;
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  s.rect(20, Y0, 40, H, { fill: 'fill', rx: 0, sw: 1 });
  cols.forEach((c, i) => { s.rect(X0 + i * W, Y0, W, H, { fill: 'fill', rx: 0, sw: 1 }); s.text(X0 + i * W + W / 2, Y0 + H / 2, c, { size: 12, bold: true }); });
  for (let r = 1; r <= 6; r++) {
    const y = Y0 + r * H;
    s.rect(20, y, 40, H, { fill: 'fill', rx: 0, sw: 1 });
    s.text(40, y + H / 2, String(r), { size: 12, bold: true });
    cols.forEach((_, i) => s.rect(X0 + i * W, y, W, H, { rx: 0, sw: 0.6, color: 'muted' }));
  }
  const vals = [['Month', 'Sales (₹)'], ['April', fig(PK_SUM.get('B2'))], ['May', fig(PK_SUM.get('B3'))], ['June', fig(PK_SUM.get('B4'))], ['Total', fig(PK_SUM.get('B5'))]];
  vals.forEach(([a, b], k) => { const y = Y0 + (k + 1) * H + H / 2; s.text(X0 + 8, y, a, { size: 12, anchor: 'start' }); s.text(X0 + 2 * W - 8, y, b, { size: 12, anchor: 'end' }); });
  s.rect(X0 + W, Y0 + 3 * H, W, H, { rx: 0, sw: 3, color: 'accent' });
  s.arrow(X0 + 4 * W - 10, Y0 + 3.5 * H, X0 + 2 * W + 6, Y0 + 3.5 * H, { sw: 1.6, color: 'accent' });
  s.text(X0 + 4 * W - 4, Y0 + 3.5 * H, 'Active cell B3', { size: 12, anchor: 'start', color: 'accent' });
  s.text(X0 + 4.5 * W, Y0 + 6.5 * H - 2, 'Cells: column letter + row number', { size: 11, muted: true });
  const TY = Y0 + 7 * H + 8;
  ['Summary', 'April', 'May', 'June'].forEach((t, i) => { s.rect(20 + i * 86, TY, 82, 24, { rx: 4, sw: 1.2, ...(i === 0 ? { fill: 'fill' } : {}) }); s.text(61 + i * 86, TY + 12, t, { size: 12, bold: i === 0 }); });
  s.text(380, TY + 12, '← Sheet tabs (one workbook, four worksheets)', { size: 11, anchor: 'start', muted: true });
  s.line(10, TY + 32, 630, TY + 32, { sw: 1 });
  s.text(20, TY + 46, 'Status bar: Ready', { size: 11, anchor: 'start', muted: true });
  return s.visual(
    'Labelled spreadsheet window: title bar, menu and toolbar, the name box showing B three, the formula bar showing the formula that brings in May sales from the May sheet, column headings A to F, row numbers one to six, the active cell B three outlined, sheet tabs Summary, April, May and June, and the status bar',
    'The summary sheet of Pakhawaj Paper Mart (imagined) with cell B3 selected.',
  );
}
function freezeSvg() {
  const s = new Svg(620, 290);
  const rowsShown = [1, 15, 16, 17, 18, 19];
  const colsShown = ['A', 'F', 'G', 'H'];
  const X0 = 50, Y0 = 30, H = 32, W = [120, 95, 90, 110];
  const xAt = (j) => X0 + W.slice(0, j).reduce((a, b) => a + b, 0);
  s.rect(10, Y0, 40, H, { fill: 'fill', rx: 0, sw: 1 });
  colsShown.forEach((c, j) => { s.rect(xAt(j), Y0, W[j], H, { fill: 'fill', rx: 0, sw: 1 }); s.text(xAt(j) + W[j] / 2, Y0 + H / 2, c, { size: 12, bold: true }); });
  const heads = ['Employee', 'Gross (₹)', 'PF (₹)', 'Net pay (₹)'];
  rowsShown.forEach((r, i) => {
    const y = Y0 + (i + 1) * H;
    s.rect(10, y, 40, H, { fill: 'fill', rx: 0, sw: 1 });
    s.text(30, y + H / 2, String(r), { size: 12, bold: true });
    colsShown.forEach((_, j) => s.rect(xAt(j), y, W[j], H, { rx: 0, sw: 0.6, color: 'muted', ...(i === 0 || j === 0 ? { fill: 'fill', fillOpacity: 0.6 } : {}) }));
    if (i === 0) heads.forEach((h, j) => s.text(xAt(j) + W[j] / 2, y + H / 2, h, { size: 12, bold: true }));
    else s.text(xAt(0) + 8, y + H / 2, `Employee ${r - 1}`, { size: 12, anchor: 'start' });
  });
  const right = xAt(4);
  s.line(10, Y0 + 2 * H, right, Y0 + 2 * H, { sw: 3, color: 'accent' });
  s.line(xAt(1), Y0, xAt(1), Y0 + 7 * H, { sw: 3, color: 'accent' });
  s.text(right + 8, Y0 + 1.5 * H, 'Frozen: row 1', { size: 12, anchor: 'start', color: 'accent' });
  s.text(xAt(1) + 6, Y0 + 7 * H + 16, 'Frozen: column A', { size: 12, anchor: 'start', color: 'accent' });
  s.text(right + 8, Y0 + 4.5 * H, 'Rows 2 to 14 and', { size: 11, anchor: 'start', muted: true });
  s.text(right + 8, Y0 + 5.2 * H, 'columns B to E are', { size: 11, anchor: 'start', muted: true });
  s.text(right + 8, Y0 + 5.9 * H, 'scrolled out of view', { size: 11, anchor: 'start', muted: true });
  return s.visual(
    'Payroll sheet with panes frozen at cell B two: row one with the headings and column A with the employee names stay on screen while the sheet is scrolled down to row fifteen and across to column F, so rows two to fourteen and columns B to E are out of view',
    `Freeze panes with ${'B2'} selected keeps ${freezeAt('B2').rowText} and ${freezeAt('B2').colText} in view.`,
  );
}
function columnChartSvg() {
  const s = new Svg(560, 330);
  const c = s.chart({ x0: 0, x1: SH_MEN.length + 0.5, y0: 0, y1: 450, left: 70, top: 30, width: 440, height: 230, xLabel: 'Salesman', yLabel: 'Sales (₹ thousand)' });
  [100, 200, 300, 400].forEach((v) => c.yTick(v, String(v)));
  SH_MEN.forEach(([n, sales], i) => {
    const x = i + 1;
    const bw = 0.72;
    const met = sales >= SH_T;
    s.rect(c.X(x - bw / 2), c.Y(sales / 1000), c.X(x + bw / 2) - c.X(x - bw / 2), c.Y(0) - c.Y(sales / 1000), { rx: 0, sw: 1, fill: met ? 'accent' : 'muted', fillOpacity: 0.35 });
    s.text(c.X(x), c.Y(0) + 16, n, { size: 12 });
    s.text(c.X(x), c.Y(0) - 14, fig(sales), { size: 11, bold: true });
  });
  c.seg([0, SH_T / 1000], [SH_MEN.length + 0.5, SH_T / 1000], { dash: true, sw: 1.6, color: 'red' });
  c.label([0.06, SH_T / 1000], `Target ${fig(SH_T)}`, { dy: -10, anchor: 'start', size: 11, color: 'red' });
  return s.visual(
    `Column chart of the sales of five salesmen of Shehnai Home Appliances against a dashed target line at three lakh rupees: Brishti and Ayan fall short, while Sourav, Srijita and Tanveer exceed it, Srijita highest at ${words(405000)} rupees`,
    'Columns in the accent colour reached the target; the chart is drawn from B4:B8 and redraws when a figure changes.',
  );
}
const PIE_PARTS = [['Basic pay', 'B'], ['DA', 'C'], ['HRA', 'D'], ['TA', 'E'], ['CCA', 'F']].map(([n, col]) => [n, SA.get(`${col}7`)]);
const PIE_TOTAL = sum(PIE_PARTS.map((x) => x[1]));
check(PIE_TOTAL === SA.get('G7'), 'pie parts add to gross');
const PIE_PCT = PIE_PARTS.map(([, v]) => round((v / PIE_TOTAL) * 100, 1));
function pieSvg() {
  const s = new Svg(560, 300);
  const cx = 150, cy = 150, R = 115;
  const colours = ['accent', 'blue', 'green', 'yellow', 'brown'];
  let a = -Math.PI / 2;
  PIE_PARTS.forEach(([, v], i) => {
    const sweep = (2 * Math.PI * v) / PIE_TOTAL;
    const b = a + sweep;
    const p = (t) => `${(cx + R * Math.cos(t)).toFixed(2)},${(cy + R * Math.sin(t)).toFixed(2)}`;
    s.path(`M${cx},${cy} L${p(a)} A${R},${R} 0 ${sweep > Math.PI ? 1 : 0} 1 ${p(b)} Z`, { fill: colours[i], fillOpacity: 0.85, sw: 1.5 });
    a = b;
  });
  check(Math.abs(a - (1.5 * Math.PI)) < 1e-9, 'pie closes');
  PIE_PARTS.forEach(([n, v], i) => {
    const y = 60 + i * 40;
    s.rect(300, y - 10, 20, 20, { rx: 3, fill: colours[i], fillOpacity: 0.85, sw: 1 });
    s.text(330, y, `${n}: ${fig(v)} (${PIE_PCT[i]}%)`, { size: 13, anchor: 'start' });
  });
  s.text(300, 268, `Total gross pay ${rs(PIE_TOTAL)}`, { size: 13, anchor: 'start', bold: true });
  return s.visual(
    `Pie chart of the April gross pay of Sarangi Spice Exports, ${rupees(PIE_TOTAL)}, divided into basic pay about ${spoken(PIE_PCT[0])} per cent, dearness allowance about ${spoken(PIE_PCT[1])} per cent, house rent allowance about ${spoken(PIE_PCT[2])} per cent, travelling allowance and city compensatory allowance the small remainder`,
    'Each slice’s angle is its share of the total: amount ÷ total × 360°.',
  );
}
const vWindow = windowSvg();
const vFreeze = freezeSvg();
const vColumns = columnChartSvg();
const vPie = pieSvg();

// ================================================================ table visuals: Part 1
const vRoute1 = flow('LR', ['What a spreadsheet is; merits and demerits', 'Workbooks and worksheets', 'Formatting and printing', 'Formulas and references', 'Functions: average, percentage, dates, IF', 'Freezing panes'], 'Route map of Part 1: what a spreadsheet is with its merits and demerits, workbooks and worksheets, formatting and printing, formulas and references, functions including average, percentage, dates and IF, and freezing panes', 'Part 1 at a glance');
const vUtility = table(
  ['Accounting job', 'How a spreadsheet helps'],
  [
    ['Payroll', 'Allowances, provident fund, tax and net pay by formulas copied down for every employee'],
    ['Sales and commission', 'Profit on sales and slab commission by IF; totals and averages by functions'],
    ['Journal and ledger balances', 'Debit and credit totals with an agreement check; balances by SUMIF'],
    ['Debtors and due dates', 'Due dates and days overdue from date arithmetic; lists sorted and filtered'],
    ['Budgets and what-if', 'Change one rate and see every result update'],
    ['Reports and charts', 'Formatted statements printed or drawn as charts from the same cells'],
  ],
  'Table of accounting jobs a spreadsheet helps with: payroll, sales and commission, journal and ledger balances, debtors and due dates, budgets and what-if analysis, and reports and charts',
);
const vMerits = table(
  ['Merits', 'Demerits'],
  [
    ['Automatic recalculation when any figure changes', 'A wrong reference or formula spreads errors silently'],
    ['What-if analysis by changing one input cell', 'No built-in double-entry control: unbalanced entries are accepted'],
    ['Formulas and ready-made functions', 'Formulas can be overwritten by typed figures'],
    ['Formatting, sorting, filtering and charts', 'Weak security; no record of who changed what'],
    ['One design reused every month', 'Unsuited to very large volumes and many users at once'],
    ['Compact storage; easy correction and sharing', 'Needs training; files can be lost without backups'],
  ],
  'Table of merits of electronic spreadsheets, such as automatic recalculation, what-if analysis, functions, formatting, sorting and charts, reuse and easy correction, against demerits, such as silent formula errors, no double-entry control, overwritten formulas, weak security, limits on volume and the need for training and backups',
);
const vWorkbook = table(
  ['Term', 'Meaning', 'Example'],
  [
    ['Workbook', 'The file that holds one or more sheets', 'Pakhawaj sales 2026'],
    ['Worksheet', 'One grid of columns and rows, with a tab', 'The sheet named May'],
    ['Column / row', 'Columns lettered A … Z, AA, AB …; rows numbered 1, 2, 3 …', 'Column B, row 3'],
    ['Cell and address', 'Where a column meets a row; named column then row', 'B3'],
    ['Range', 'A rectangular block written first cell:last cell', 'B2:B5 (four cells)'],
    ['Reference to another sheet', 'Sheet name ! cell', code(PK_SUM.cells.B3)],
  ],
  'Table of spreadsheet terms: workbook, worksheet, columns and rows, cell and address, range, and a reference to another sheet, each with an example from Pakhawaj Paper Mart',
);
const vEntry = table(
  ['Task', 'How it is done'],
  [
    ['Enter data', 'Select a cell, type, press Enter (moves down) or Tab (moves right); text aligns left and numbers right by default'],
    ['Edit a cell', 'Double-click it (or press F2) and correct; Delete clears it'],
    ['Fill a series', 'Drag the fill handle: April, May, June … or 1, 2, 3 … or copy a formula down'],
    ['Navigate', 'Arrow keys; Ctrl + Home to A1; Ctrl + arrow to the edge of the data; type an address in the name box'],
    ['Save', 'Save keeps the same file; Save As makes a copy with a new name, place or format'],
    ['Open and close', 'Open an existing workbook; close it after saving'],
  ],
  'Table of everyday tasks: entering data, editing a cell, filling a series with the fill handle, navigating with keys and the name box, saving with Save and Save As, and opening and closing workbooks',
);
const vSheets = table(
  ['Action on a worksheet', 'How (right-click the sheet tab, or the sheet commands)', 'Result'],
  [
    ['Insert', 'Insert a new worksheet', 'A blank sheet, named Sheet4 or similar'],
    ['Rename', 'Double-click the tab and type', 'April, May, Summary …'],
    ['Delete', 'Delete the sheet and confirm', 'The sheet and all it holds are removed'],
    ['Move', 'Drag the tab, or use the move or copy command', 'Same sheet in a new position; references to it still work'],
    ['Copy', 'Move or copy command with the copy box ticked (or drag with Ctrl)', 'A duplicate such as May (2), with the same formulas'],
    ['To another workbook', 'Move or copy command, choose the open destination workbook', 'The sheet (or a copy) is placed in the other file'],
  ],
  'Table of actions on worksheets: insert, rename, delete, move, copy, and move or copy to another workbook, with how each is done and the result',
);
const vSummaryWB = table(PK_SUM.table(['A', 'B'], [1, 2, 3, 4, 5, 6]).headers, PK_SUM.table(['A', 'B'], [1, 2, 3, 4, 5, 6]).rows,
  `Summary sheet of Pakhawaj Paper Mart: B two to B four bring in the totals from the April, May and June sheets, B five adds them to ${fig(PK_SUM.get('B5'))}, and B six gives the monthly average`,
  `Each month sheet totals its four product lines in B6, for example ${fx(PK_BOOK.April, 'B6')} on the April sheet.`,
);
const vFormats = table(['Stored value', 'Format', 'Cell shows'], FMT_ROWS.map(([v, f, label], i) => [i >= 4 ? `${longDate(v)}` : String(v), label, FMT_SHOWN[i]]),
  'Table showing one stored value under different formats: general, comma style with Indian grouping, two decimals, a percentage with one decimal, two date formats, and the date shown as a general number of days',
  'A format changes only the display; formulas use the stored value. A date is stored as a count of days.',
);
const vFormatTools = table(
  ['Formatting tool', 'Use in an accounts sheet'],
  [
    ['Font, bold, size, colour', 'Titles and headings stand out'],
    ['Alignment, wrap text, merge and centre', 'Long headings fit; the title spans the table'],
    ['Number formats', 'Comma style for rupees, percentages, dates'],
    ['Column width and row height', 'Auto-fit so no amount shows as ####'],
    ['Borders and fill colours', 'Separate headings, totals and inputs'],
    ['Conditional formatting', 'Highlight, say, overdue amounts in red'],
  ],
  'Table of formatting tools and their use: fonts, alignment with wrap text and merge and centre, number formats, column width, borders and fill colours, and conditional formatting',
);
const vPrint = table(
  ['Page set-up and printing', 'What it does'],
  [
    ['Orientation', 'Portrait for long narrow sheets; landscape for wide ones'],
    ['Paper size and margins', 'A4 or legal; narrow margins fit more'],
    ['Scaling', 'Fit to one page wide, or a percentage of normal size'],
    ['Print area', 'Prints only the chosen range'],
    ['Print titles', 'Repeats heading rows (or columns) on every page'],
    ['Header and footer', 'Firm name, page number, date on each page'],
    ['Print preview', 'Shows the pages exactly as they will print, before printing'],
  ],
  'Table of page set-up and printing options: orientation, paper size and margins, scaling, print area, print titles, header and footer, and print preview',
);
const vOps = table(['Operator', 'Meaning', 'Formula', 'Result'], [
  ['+  −', 'Add, subtract', `${fx(OPS, 'C1')}; ${fx(OPS, 'C2')}`, `${fmt(OPS.get('C1'), '#,##0')}; ${fmt(OPS.get('C2'), '#,##0')}`],
  ['*  /', 'Multiply, divide', `${fx(OPS, 'C3')}; ${fx(OPS, 'C4')}`, `${fmt(OPS.get('C3'), '#,##0')}; ${fmt(OPS.get('C4'), '0.00')}`],
  ['( )', 'Brackets first', fx(OPS, 'C5'), String(OPS.get('C5'))],
  ['Order', 'Multiply and divide before add and subtract', fx(OPS, 'C6'), fmt(OPS.get('C6'), '#,##0')],
  ['>  <  >=  <=  =  <>', 'Compare; give TRUE or FALSE', fx(OPS, 'C7'), fmt(OPS.get('C7'))],
  ['&', 'Join text', fx(OPS, 'C8'), OPS.get('C8')],
], `Table of operators with B one holding forty-eight thousand and B two thirty-six thousand: adding, subtracting, multiplying, dividing, brackets giving a margin of twenty-five, the order of operations, comparison and joining text`,
'B1 = 48,000 (sales) and B2 = 36,000 (cost). Every formula begins with =.');
const vRefs = table(
  ['Kind of reference', 'Written', 'When the formula is copied one row down'],
  [
    ['Relative', 'B2', 'Becomes B3: it moves with the formula'],
    ['Absolute', 'A dollar sign before the column letter and before the row number', 'Does not change'],
    ['Mixed', 'A dollar sign before only the column letter or only the row number', 'Only the unlocked part moves'],
    ['Named cell', 'A name such as NetTotal or DARate given to one cell', 'Does not change; easier to read'],
    ['Another sheet', code('=May!B6'), 'Moves like a relative reference unless locked or named'],
  ],
  'Table of kinds of cell reference, relative, absolute, mixed, named cells and references to another sheet, with how each is written and what happens when the formula is copied',
  'This course shows locked references as named cells; in your answers you may write either.',
);
const vFunctions = table(['Function', 'Returns', 'Example on the register', 'Shows'], [
  [code('SUM(range)'), 'Total', fx(REG, 'F6'), fmt(REG.get('F6'), '#,##0')],
  [code('AVERAGE(range)'), 'Average of the numbers (blanks skipped)', fx(REG, 'F7'), fmt(REG.get('F7'), '#,##0.00')],
  [code('MAX / MIN(range)'), 'Largest / smallest', fx(REG, 'F8'), fmt(REG.get('F8'), '#,##0')],
  [code('ROUND(number, places)'), 'Rounded half away from zero', fx(REG, 'E3'), fmt(REG.get('E3'), '#,##0')],
  [code('IF(test, if true, if false)'), 'One of two results', fx(REG, 'E2'), String(REG.get('E2'))],
  [code('AND(…) / OR(…)'), 'TRUE if all / any tests are true', code('=AND(B2>100,C2<50)'), fmt(new Sheet({ B2: 400, C2: 45, D2: '=AND(B2>100,C2<50)' }).get('D2'))],
  [code('COUNT / COUNTIF'), 'How many numbers / how many meet a condition', fx(REG, 'F9'), String(REG.get('F9'))],
  [code('DATE, DAY, MONTH, YEAR, TODAY'), 'Build a date; take it apart; today’s date', code('=MONTH(DATE(2026,4,1))'), String(new Sheet({ A1: '=MONTH(DATE(2026,4,1))' }).get('A1'))],
], 'Table of functions with examples on the Pakhawaj register: sum, average, maximum and minimum, round, if, and and or, count and countif, and the date functions',
'Percentage = part ÷ whole × 100, for example the Share column G.');
const vRegister = table(REG.table(['A', 'B', 'C', 'D', 'E', 'F', 'G'], [1, 2, 3, 4, 5, 6], 'value').headers, [
  ...REG.table(['A', 'B', 'C', 'D', 'E', 'F', 'G'], [1, 2, 3, 4, 5, 6], 'value').rows,
  ['Row 2', '', '', '', fx(REG, 'D2'), fx(REG, 'E2'), fx(REG, 'F2'), fx(REG, 'G2')].slice(0, 8),
].map((r) => r.slice(0, 8)),
  `Sales register of Pakhawaj Paper Mart: each amount is quantity times rate, a five per cent discount applies to amounts of twenty thousand or more, net amounts total ${words(REG.get('F6'))} rupees, and the share column divides each net amount by the named total`,
  'F6 is named NetTotal, so the share formula can be copied down without moving.',
);
const vCredit = table(['', 'Customer', 'Amount (₹)', 'Invoice date', 'Credit days', 'Due date', 'Days overdue', 'Status'], [
  ...[4, 5, 6, 7].map((r) => [String(r), ...['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((c) => GH.shown(`${c}${r}`))]),
  ['Row 4', '', '', '', '', fx(GH, 'E4'), fx(GH, 'F4'), fx(GH, 'G4')],
], `Credit register of Ghatam Glassware as on thirtieth September: due date is invoice date plus credit days, days overdue are fifty, eleven, three and zero, and a nested if labels each customer follow up, overdue or not due`,
`B1, named AsOn, holds ${GH.shown('B1')}. Overdue amount by SUMIF: ${rs(GH.get('B8'))}.`);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Spreadsheet', 'Cells of text, numbers and formulas that recalculate; merits and demerits'],
    ['Workbook and sheets', 'Insert, rename, move, copy, delete; refer to another sheet as Sheet!Cell'],
    ['Formatting and printing', 'Formats change the display, not the value; landscape, fit to width, print titles, preview'],
    ['Formulas', 'Start with =; brackets, then × ÷, then + −; relative, absolute (or named) references'],
    ['Functions', 'SUM, AVERAGE, MAX, MIN, ROUND, IF, AND, COUNTIF, DATE, DAY, MONTH, YEAR'],
    ['Freeze panes', 'Rows above and columns left of the selected cell stay on screen'],
  ],
  'Summary table of Part 1: spreadsheet meaning and merits, workbooks and sheets, formatting and printing, formulas and references, functions, and freezing panes',
);

// ================================================================ table visuals: Part 2
const vRoute2 = flow('LR', ['Designing an application', 'Payroll', 'Sales and commission', 'Student marks', 'Journal', 'Charts', 'Database: sort, filter, query'], 'Route map of Part 2: designing an application, payroll, sales and commission, student marks, journal, charts, and a database with sorting, filtering and querying', 'Part 2 at a glance');
const vDesign = flow('TB', ['Inputs in their own cells (rates named)', 'Formula written once in row 2', 'Copied down the column', 'Totals and checks (SUM, IF)', 'Formatted, printed, charted'], 'Steps to design an accounting application in a spreadsheet: inputs in their own named cells, a formula written once in the first row, copied down, totals and checks, then formatting, printing and charts', 'Change a rate cell and every row updates.');
const vPayComp = table(
  ['Component', 'Meaning', 'Rule in the Sarangi sheet'],
  [
    ['Basic pay', 'Fixed pay for the post', 'Typed in column B'],
    ['DA (dearness allowance)', 'Offsets rising prices', `40% of basic: ${fx(SA, 'C2')}`],
    ['HRA (house rent allowance)', 'Towards rent', `20% of basic: ${fx(SA, 'D2')}`],
    ['TA (travelling allowance)', 'Towards travel to work', `${fx(SA, 'E2')}`],
    ['CCA (city compensatory allowance)', 'For costlier cities', `${rs(SA_R.cca)}: ${fx(SA, 'F2')}`],
    ['PF (provident fund)', 'Employee’s retirement saving, deducted', `12% of basic + DA: ${fx(SA, 'H2')}`],
    ['Income tax deducted', 'Tax deducted at source', `10% of gross above ${rs(SA_R.taxLimit)} (simplified rule for this course)`],
    ['Net pay', 'Gross pay − deductions', fx(SA, 'K2')],
  ],
  'Table of payroll components: basic pay, dearness allowance, house rent allowance, travelling allowance, city compensatory allowance, provident fund, income tax deducted and net pay, with the rule and formula used in the Sarangi sheet',
  'Rates sit in N2:N7, named DARate, HRARate, CCA, PFRate, TaxLimit and TaxRate.',
);
const vPay1 = table(['', 'Name', 'Basic (₹)', 'DA (₹)', 'HRA (₹)', 'TA (₹)', 'CCA (₹)', 'Gross (₹)'], SA.table(['A', 'B', 'C', 'D', 'E', 'F', 'G'], [2, 3, 4, 5, 6, 7], 'value').rows,
  `Payroll of five employees of Sarangi Spice Exports: basic pay, dearness allowance at forty per cent, house rent allowance at twenty per cent, travelling allowance by an if test, city compensatory allowance and gross pay totalling ${words(SA.get('G7'))} rupees`,
  `Row 2 formulas: ${['C2', 'D2', 'E2', 'G2'].map((r) => `${r} ${fx(SA, r)}`).join('; ')}.`,
);
const vPay2 = table(['', 'Name', 'Gross (₹)', 'PF (₹)', 'Income tax (₹)', 'Deductions (₹)', 'Net pay (₹)'], SA.table(['A', 'G', 'H', 'I', 'J', 'K'], [2, 3, 4, 5, 6, 7], 'value').rows,
  `Deductions and net pay at Sarangi Spice Exports: provident fund on basic plus dearness allowance, income tax only on gross pay above fifty thousand, and total net pay of ${words(SA.get('K7'))} rupees`,
  `Row 2 formulas: ${['H2', 'I2', 'J2', 'K2'].map((r) => `${r} ${fx(SA, r)}`).join('; ')}.`,
);
const vCommRules = table(
  ['Item', 'Formula pattern (row 4)'],
  [
    ['Profit on sales', fx(SH, 'D4')],
    ['Profit as % of sales', fx(SH, 'E4')],
    ['Commission: 2% up to target, 5% on the excess', fx(SH, 'F4')],
    ['Status', fx(SH, 'G4')],
    ['How many met the target', fx(SH, 'G9')],
  ],
  'Table of formula patterns for a sales and commission sheet: profit, profit percentage on sales, two-slab commission against a named target, a status label and a count of salesmen who met the target',
  `Target ${rs(SH_T)} in B1, named Target.`,
);
const vSales = table(['', 'Salesman', 'Sales (₹)', 'Profit (₹)', 'Profit on sales (%)', 'Commission (₹)', 'Status'], SH.table(['A', 'B', 'D', 'E', 'F', 'G'], [4, 5, 6, 7, 8, 9], 'value').rows,
  `Sales sheet of Shehnai Home Appliances: profit and profit percentage for five salesmen, commission at two per cent up to the target and five per cent above it, totalling ${words(SH.get('F9'))} rupees, and three salesmen meeting the target`,
  `G9 counts the salesmen who met the target with COUNTIF.`,
);
const vMarks = table(['Name', ...EK_SUB, 'Total', '%', 'Result', 'Grade'], [
  ...EK_ST.map((_, i) => [EK.shown(`A${i + 2}`), ...['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((c) => EK.shown(`${c}${i + 2}`))]),
], 'Marks sheet of Ektara Shiksha Niketan for five students in four papers: totals, percentages, results by the lowest mark and grades by a nested if; Payel fails on one paper although her percentage is above the pass mark',
`Row 2: ${['F2', 'G2', 'H2'].map((r) => fx(EK, r)).join('; ')}; grade ${fx(EK, 'I2')}.`);
const vJournal = table(['', 'Date', 'Account', 'Debit (₹)', 'Credit (₹)'], DL.table(['A', 'B', 'C', 'D'], Array.from({ length: 14 }, (_, i) => i + 2), 'value').rows,
  `Journal of Dilruba Dairy for May in a spreadsheet: six entries of two lines each, debit and credit totals of ${words(DL.get('C14'))} rupees and a check showing agreed`,
  `C14 ${fx(DL, 'C14')}; C15 ${fx(DL, 'C15')} → ${DL.get('C15')}.`,
);
const vLedger = table(['Account', 'Formula (column G)', 'Balance (₹)'], [['Cash', fx(DL, 'G2'), fmt(DL.get('G2'), '#,##0')], ['Bank', fx(DL, 'G3'), fmt(DL.get('G3'), '#,##0')]],
  `Ledger balances of Dilruba Dairy drawn from the journal sheet with the conditional sum function: cash ${words(DL.get('G2'))} rupees and bank ${words(DL.get('G3'))} rupees, both debit balances`,
  'SUMIF(account column, account name, debit column) − the same over the credit column.',
);
const vCharts = table(
  ['Chart', 'Best for', 'Accounting example'],
  [
    ['Column / bar', 'Comparing amounts across items', 'Sales of five salesmen against the target'],
    ['Line', 'A trend over time', 'Monthly sales for a year'],
    ['Pie', 'Parts of one whole', 'Gross pay split into basic pay and allowances'],
    ['Stacked column', 'Parts of a whole across periods', 'Expenses of each quarter by kind'],
    ['Scatter (XY)', 'Relation between two measures', 'Advertisement spending against sales'],
  ],
  'Table for choosing a chart: column or bar to compare amounts, line for a trend, pie for parts of one whole, stacked column for parts across periods, and scatter for the relation between two measures',
  'Parts of a chart: title, axes and axis titles, legend, data labels, gridlines.',
);
const vDatabase = table(
  ['Term or tool', 'Meaning in a spreadsheet list'],
  [
    ['Database (list)', 'A block of rows with one heading row of field names'],
    ['Field', 'A column: one kind of fact, such as Area or Amount'],
    ['Record', 'A row: all the facts about one debtor'],
    ['Sort', 'Rearranges whole records by one or more keys, ascending or descending'],
    ['Filter', 'Hides records that fail a condition; nothing is deleted'],
    ['Query', 'A question answered from the list: COUNTIF, SUMIF, or a filter and its totals'],
  ],
  'Table of database terms in a spreadsheet: a list or database, field, record, sort, filter and query',
  'Keep one heading row, no blank rows or columns inside the list, one kind of entry per column.',
);
const vSort = table(['Before (as entered)', 'After sort: Area A to Z, then Amount largest first'], ND.map((r, i) => [`${r.inv} ${r.area} ${fig(r.amt)}`, `${ND_SORT[i].inv} ${ND_SORT[i].area} ${fig(ND_SORT[i].amt)}`]),
  'Debtors list of Nadaswaram Hardware before and after a two-key sort by area from A to Z and then by amount from largest to smallest: Benachity records first, then Bidhannagar, then City Centre',
  'The whole list was selected, so each record moved as one row.');
const vFilter = table(['Query on the Nadaswaram list', 'Tool', 'Answer'], [
  ['Which due invoices are ₹40,000 or more?', 'Filter: Status = Due and Amount ≥ 40000', ND_FILT.map((r) => r.inv).join(', ')],
  ['How many invoices are due?', fx(NDS, 'H2'), String(NDS.get('H2'))],
  ['Total still due?', fx(NDS, 'H3'), fmt(NDS.get('H3'), '#,##0')],
  ['Sales to City Centre customers?', fx(NDS, 'H4'), fmt(NDS.get('H4'), '#,##0')],
  ['Invoices of ₹50,000 or more?', fx(NDS, 'H5'), String(NDS.get('H5'))],
], `Queries on the debtors list of Nadaswaram Hardware: a filter for due invoices of forty thousand rupees or more leaves three records, five invoices are due totalling ${words(NDS.get('H3'))} rupees, and conditional sums and counts answer the other questions`,
'Each formula result equals the filtered rows counted or added by hand.');
const vSummary2 = table(
  ['Application', 'Key formula pattern'],
  [
    ['Payroll', `Allowances on basic with named rates; ${code('IF')} for TA; ${code('SUM')} for gross; PF on basic + DA; net = gross − deductions`],
    ['Sales and commission', `Profit, ${code('ROUND(profit/sales*100,2)')}, two-slab ${code('IF')} against a named target`],
    ['Student marks', `${code('SUM')}, percentage, ${code('IF(MIN(…)>=pass mark,…)')}, nested ${code('IF')} for grades, ${code('COUNTIF')}`],
    ['Journal', `Debit and credit lines; ${code('SUM')} totals; ${code('IF')} check; ${code('SUMIF')} for ledger balances`],
    ['Charts', 'Column to compare, line for trends, pie for shares'],
    ['Database', 'Sort whole records; filter by conditions; COUNTIF and SUMIF for queries'],
  ],
  'Summary table of Part 2: formula patterns for payroll, sales and commission, student marks and the journal, the choice of charts, and sorting, filtering and querying a list',
);

// ================================================================ decks
const SA2 = SA_P[2];
const part1 = deck({
  part: 1,
  title: 'Accounting Application of Electronic Spreadsheet — Part 1: Spreadsheet Basics, Formatting and Functions',
  goals: [
    'Explain what an electronic spreadsheet is and state its utility, merits and demerits in accounting',
    'Create, rename, copy and move worksheets, refer to another sheet, enter, navigate and save data',
    'Format cells and set up pages for previewing and printing',
    'Write formulas with relative, absolute and named references, and use SUM, AVERAGE, percentages, date functions and IF; freeze panes',
  ],
  slides: [
    sl('title', 'Accounting Application of Electronic Spreadsheet', {
      b: 'Part 1 — what an **electronic spreadsheet** is, how **workbooks and worksheets** are organised, how to **format and print**, and how **formulas and functions** do an accountant’s arithmetic. Software is described generically; every firm is imagined.',
      v: vRoute1,
      n: 'This chapter is about using an electronic spreadsheet for accounting work. In this first part we learn what a spreadsheet is and where it helps and falls short, how a workbook holds many worksheets, how to format and print a sheet, and how formulas and functions such as sum, average, the date functions and if do the arithmetic for us. An imagined stationery shop, Pakhawaj Paper Mart, is our example.',
    }),
    sl('concept', 'What a spreadsheet is, and its utility', {
      v: vUtility,
      n: 'An electronic spreadsheet is a grid of columns and rows. Each cell can hold a label, a number or a formula, and every formula recalculates by itself when a figure it uses changes. That makes it a natural tool for accounts: payroll, sales and commission, a journal with its totals, debtors and due dates, budgets that test new rates, and reports and charts drawn from the same figures.',
    }),
    sl('concept', 'Merits and demerits', {
      v: vMerits,
      n: 'The merits are speed and accuracy from automatic recalculation, what-if analysis by changing one input, ready-made functions, neat formatting, sorting and charts, and designs that can be reused every month. The demerits matter too. A spreadsheet has no double-entry control, so an unbalanced entry is accepted. A wrong reference spreads errors silently, typed figures can overwrite formulas, and security is weak.',
    }),
    sl('check', 'Quick check: will the sheet refuse it?', {
      b: 'True or false?',
      chk: 'tf_unbalanced',
      n: 'Think about what checks a spreadsheet makes on its own, compared with accounting software.',
    }),
    sl('diagram', 'The spreadsheet window', {
      v: vWindow,
      n: 'Here is the window of a typical spreadsheet program. The title bar shows the workbook name, and the menu and toolbar hold the commands. The name box shows the address of the active cell, here B three, and the formula bar shows what that cell holds. Columns carry letters, rows carry numbers, and the tabs at the bottom switch between the worksheets of the workbook.',
    }),
    sl('concept', 'Workbooks, worksheets, cells and ranges', {
      v: vWorkbook,
      n: 'A workbook is the file, and it holds one or more worksheets, each with its own tab. Columns run from A to Z, then A A, A B and so on, and rows are numbered. A cell is named by its column and row. A range is a block written as its first and last cells with a colon between them. To use a cell on another sheet, write the sheet name, an exclamation mark and the cell.',
    }),
    sl('concept', 'Entering data, navigating and saving', {
      v: vEntry,
      n: 'To enter data, select a cell, type and press enter to move down or tab to move right. Text lines up on the left and numbers on the right. The fill handle continues a series such as April, May and June, or copies a formula down. Control and home takes you to cell A one. Save keeps the same file, while save as makes a copy under a new name.',
    }),
    sl('concept', 'Managing worksheets', {
      v: vSheets,
      n: 'Right-click a sheet tab to insert, rename, delete, move or copy a worksheet. Moving changes only the sheet’s position, so formulas that refer to it still work. Copying leaves the original in place and makes a duplicate with the same entries and formulas. With the move or copy command, a sheet can also be moved or copied into another open workbook.',
    }),
    sl('example', 'Worked example 1: a quarterly summary from three sheets', {
      b: `Pakhawaj Paper Mart (imagined, Krishnanagar) keeps sheets named April, May and June; B6 of each totals four product lines. A fifth sheet, Summary, brings the three totals together.`,
      v: vSummaryWB,
      n: `On the summary sheet, B two refers to cell B six of the April sheet, B three to the same cell on the May sheet, and B four to June. The sum function in B five adds them to ${rupees(PK_SUM.get('B5'))}, and B six rounds the average month to two decimal places. If a figure on any month’s sheet changes, the summary updates by itself.`,
    }),
    sl('check', 'Quick check: name the box', {
      b: 'Fill in the blank.',
      chk: 'fb_cell',
      n: 'What do we call the place where one column meets one row?',
    }),
    sl('concept', 'Formatting cells', {
      v: vFormats,
      bl: ['**Number formats** change only the display.', 'A date is stored as a **count of days**, so dates can be subtracted.'],
      n: 'Formatting changes how a value looks, never the value itself. The same number can show plainly, in the comma style with Indian grouping, with two decimals or as a percentage. A date is stored as a count of days, which is why it can show as an ordinary number and why one date can be subtracted from another. Formulas always use the full stored value.',
    }),
    sl('concept', 'Formatting tools for an accounts sheet', {
      v: vFormatTools,
      n: 'Use bold and larger fonts for titles and headings. Merge and centre spreads a title across the table, and wrap text lets a long heading run onto two lines. Apply the comma style to rupee columns and percentage or date formats where needed. Widen columns so that amounts do not show as hash marks, add borders and fill colours, and use conditional formatting to highlight overdue amounts.',
    }),
    sl('concept', 'Page set-up, preview and printing', {
      v: vPrint,
      n: 'Before printing, open the page set-up. Choose landscape for a wide sheet, set the paper size and margins, and scale the sheet to fit one page wide. Set a print area if only part of the sheet is needed, and print titles so that the heading row repeats on every page. Add a header or footer with the firm’s name and page numbers, then check everything in print preview.',
    }),
    sl('concept', 'Formulas and operators', {
      v: vOps,
      n: 'A formula always begins with an equals sign. Brackets are worked first, then multiplication and division, then addition and subtraction. So sales minus twice the cost is not the same as sales minus cost, doubled. Comparison operators give true or false, which the if function uses, and the ampersand joins pieces of text. Always refer to cells rather than typing the figures again.',
    }),
    sl('concept', 'Relative, absolute and named references', {
      v: vRefs,
      n: 'When a formula is copied, a relative reference moves with it, which is why one formula typed in row two can be copied to every row. A rate or total kept in a single cell must not move. Lock it by putting a dollar sign before both the column letter and the row number, or give the cell a name such as net total. A named cell never moves.',
    }),
    sl('check', 'Quick check: copying a formula down', {
      b: 'Choose the formula the copy will produce.',
      chk: 'm_relative_copy',
      n: 'Count how many rows the formula moves, and move each relative reference by the same number of rows.',
    }),
    sl('concept', 'Functions: totals, averages, percentages, IF and dates', {
      v: vFunctions,
      n: 'Functions are ready-made formulas. Sum adds a range and average divides by the number of figures, skipping empty cells. Max and min find the largest and smallest. Round fixes the decimals, half away from zero. The if function chooses between two results by a test, and and or join tests. Count if counts cells that meet a condition. Date builds a date, and day, month and year take one apart.',
    }),
    sl('example', 'Worked example 2: a sales register with IF and percentages', {
      b: `Pakhawaj Paper Mart’s register of bulk orders: amount = quantity × rate; a 5% discount on amounts of ${rs(20000)} or more; net = amount − discount; share = net ÷ total net × 100.`,
      v: vRegister,
      n: `Row two is typed once and copied down. The amount multiplies quantity by rate. The discount uses the if function: exam pads, at ${rupees(REG.get('D2'))}, fall below the limit and get nothing, while the other three lines get five per cent, rounded to the rupee. Net amounts total ${rupees(REG.get('F6'))}. The share divides each net amount by the total, which is named so that the formula copies safely.`,
    }),
    sl('example', 'Worked example 3: due dates and days overdue', {
      b: `Ghatam Glassware (imagined, Kalna) checks its credit sales on ${longDate(GH.get('B1'))}. Due date = invoice date + credit days; days overdue = as-on date − due date, or 0 if not yet due.`,
      v: vCredit,
      n: `Because dates are counts of days, the due date is simply the invoice date plus the credit days. The cell named as on holds ${spokenDate(GH.get('B1'))}. If that date is later than the due date, the difference gives the days overdue; otherwise the if returns zero. Saha Caterers are ${words(GH_OD[0])} days late, so a nested if says follow up. Kundu Sweets are not yet due.`,
    }),
    sl('diagram', 'Freezing panes', {
      v: vFreeze,
      n: 'In a long payroll sheet the headings soon scroll out of sight. Select the cell just below the rows and just right of the columns you want to keep, then choose freeze panes. Here cell B two was selected, so row one and column A stay on screen while the rest scrolls. Freezing works only on screen; to repeat headings on paper, use print titles.',
    }),
    sl('check', 'Quick check: does freezing affect printing?', {
      b: 'True or false?',
      chk: 'tf_freeze_print',
      n: 'Is freezing a screen setting or a page setting?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a spreadsheet holds labels, numbers and formulas in cells and recalculates by itself, but it has no accounting controls of its own. A workbook holds many sheets, which can be renamed, moved and copied, and referred to by name. Formats change only the display. Formulas follow the order of operations, references are relative, absolute or named, and functions handle totals, averages, tests and dates.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write every formula with **cell references**, starting with **=**, and state what the cell **shows**.',
        'Lock or **name** a rate or total cell before copying a formula.',
        'Use **brackets** when adding before multiplying.',
        'AVERAGE **skips blank cells**; a typed zero is counted.',
        'Freeze panes is for the **screen**; print titles are for **paper**.',
      ],
      n: 'Write each formula with cell references, begin it with an equals sign and say what the cell will show. Name or lock any single rate or total before copying a formula. Use brackets whenever something must be added before it is multiplied. Remember that average skips blank cells but counts a typed zero, and that freezing panes affects only the screen, not the printout.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Accounting Application of Electronic Spreadsheet — Part 2: Accounting Applications, Charts and Databases',
  goals: [
    'Design a payroll sheet computing basic pay, DA, HRA, TA, CCA, provident fund, income tax and net pay',
    'Prepare a sales sheet with profit on sales and salesmen’s commission, and a student marks sheet with results and grades',
    'Keep a journal in a spreadsheet with totals, an agreement check and ledger balances',
    'Create a suitable chart, and sort, filter and query a list of records',
  ],
  slides: [
    sl('title', 'Accounting applications of a spreadsheet', {
      b: 'Part 2 — four **applications** named in the syllabus (payroll, sales and commission, student marks, journal), then **charts** and a spreadsheet **database** that can be sorted, filtered and queried.',
      v: vRoute2,
      n: 'Now we put the tools of part one to work. We build a payroll sheet, a sales sheet with salesmen’s commission, a marks sheet with results and grades, and a journal with its totals and ledger balances. Then we present figures as charts, and treat a list of debtors as a small database that we sort, filter and question. Every firm, school and figure is imagined.',
    }),
    sl('diagram', 'Designing an accounting application', {
      v: vDesign,
      n: 'Every application follows the same plan. Put each input, such as a rate, in its own cell and give it a name. Write the formula once, in the first row of the table, and copy it down. Add totals and checks with the sum and if functions. Finally format, print or chart the result. When a rate changes, every row updates by itself.',
    }),
    sl('concept', 'The parts of a payroll', {
      v: vPayComp,
      n: 'Gross pay is basic pay plus allowances. Dearness allowance offsets rising prices and house rent allowance helps with rent, both as percentages of basic pay here. Travelling allowance depends on the basic pay, set by an if test, and city compensatory allowance is a flat sum. Provident fund, at twelve per cent of basic plus dearness allowance, and income tax are deducted to give net pay.',
    }),
    sl('example', 'Worked example 1: allowances and gross pay', {
      b: `Sarangi Spice Exports (imagined, Raiganj), April 2026: five employees; rates in named cells. TA: ${rs(SA_R.taLow)} if basic is below ${rs(SA_R.taLimit)}, else ${rs(SA_R.taHigh)}.`,
      v: vPay1,
      n: `Row two holds the formulas, copied down to row six. For Chumki, with basic pay of ${rupees(SA2.basic)}, dearness allowance is ${rupees(SA2.da)} and house rent allowance ${rupees(SA2.hra)}. Her basic pay is not below the limit, so travelling allowance is ${rupees(SA2.ta)}. Adding city compensatory allowance, her gross pay is ${rupees(SA2.gross)}. The gross pay of all five comes to ${rupees(SA.get('G7'))}.`,
    }),
    sl('example', 'Worked example 1 continued: deductions and net pay', {
      v: vPay2,
      n: `Provident fund is twelve per cent of basic plus dearness allowance, so Chumki’s is ${rupees(SA2.pf)}. Under this course’s simplified rule, tax is ten per cent of gross pay above fifty thousand: ${rupees(SA2.tax)} for her. Her net pay is ${rupees(SA2.net)}. Aparupa and Subhojit earn less than the limit and pay no tax. Total net pay is ${rupees(SA.get('K7'))}.`,
    }),
    sl('check', 'Quick check: gross pay', {
      b: 'Work out what the sheet will show.',
      chk: 'num_gross',
      n: 'Work out each allowance from the basic pay, check which travelling allowance applies, then add everything.',
    }),
    sl('concept', 'Sales and salesmen’s commission', {
      v: vCommRules,
      n: 'A sales sheet lists each salesman’s sales and cost of goods sold. Profit is sales minus cost, and profit on sales divides profit by sales. Commission often has slabs, such as two per cent on sales up to the target and five per cent on the excess, which one if formula handles. A second if labels whether the target was met, and count if counts those who met it.',
    }),
    sl('example', 'Worked example 2: Shehnai Home Appliances', {
      b: `Shehnai Home Appliances (imagined, Asansol): target ${rs(SH_T)} (named Target); commission 2% of sales up to the target and 5% above it, rounded to the rupee.`,
      v: vSales,
      n: `Srijita sold ${rupees(405000)}. The first two per cent applies to the target, six thousand rupees, and five per cent to the excess of one lakh five thousand, five thousand two hundred and fifty more, so her commission is ${rupees(SH.get('F6'))}. Brishti fell short, so she gets two per cent of all her sales. Total commission is ${rupees(SH.get('F9'))}, and three of the five met the target.`,
    }),
    sl('check', 'Quick check: two-slab commission', {
      b: 'Choose the commission the formula gives.',
      chk: 'm_commission',
      n: 'Split the sales at the target and apply each rate to its own part.',
    }),
    sl('example', 'Worked example 3: a student marks sheet', {
      b: 'Ektara Shiksha Niketan (imagined school, Bolpur): four papers out of 100; pass with at least 33 in every paper; grade A from 75%, B from 60%, C from 45%, else D; E for a student who fails.',
      v: vMarks,
      n: 'Total uses the sum function, and the percentage divides by four. The result tests the lowest mark, not the percentage: Payel’s percentage is above thirty-three, but she scored thirty in one paper, so she fails and her grade is E. The grade formula checks the result first and then the cut-offs from the highest down. Count if shows that four students passed.',
    }),
    sl('example', 'Worked example 4: a journal and ledger balances', {
      b: 'Dilruba Dairy (imagined, Balurghat) keeps its May 2026 journal with one line for each account: the debit line, then the credit line.',
      v: vJournal,
      n: `Each entry takes two lines, so the debit and credit columns can each be added with the sum function. Both total ${rupees(DL.get('C14'))}, and an if formula compares them and shows agreed. The spreadsheet would not stop an unbalanced entry by itself; this check is what catches one.`,
    }),
    sl('concept', 'Ledger balances with SUMIF', {
      v: vLedger,
      n: `The conditional sum function adds only the rows that meet a condition. To find the cash balance, it adds the debit amounts on lines whose account is cash and takes away the credit amounts on those lines. Cash has a balance of ${rupees(DL.get('G2'))} and the bank ${rupees(DL.get('G3'))}. Change any journal line and the balances change with it.`,
    }),
    sl('concept', 'Charts and graphs', {
      v: vCharts,
      n: 'A chart is drawn from a range of cells and redraws whenever the figures change. Choose it by purpose: a column or bar chart to compare amounts, a line chart for a trend over time, a pie chart for the parts of one whole, a stacked column for parts across periods, and a scatter chart for two related measures. Give it a title, axis titles and a legend.',
    }),
    sl('diagram', 'A column chart: sales against target', {
      v: vColumns,
      n: 'Here the sales of Shehnai’s five salesmen are drawn as columns, with the target shown as a dashed line. The chart was made by selecting the names and the sales, inserting a column chart, and adding a title, axis titles and the target line. At a glance we see that Sourav, Srijita and Tanveer cleared the target and Brishti and Ayan did not.',
    }),
    sl('diagram', 'A pie chart: what makes up gross pay', {
      v: vPie,
      n: `A pie chart shows the parts of one whole. Sarangi’s gross pay of ${rupees(PIE_TOTAL)} is split into basic pay, nearly three fifths, dearness allowance, about a quarter, house rent allowance, and the two small allowances. Each slice’s angle is its share of the total, so the slices always fill the circle.`,
    }),
    sl('check', 'Quick check: parts of a chart', {
      b: 'Match each part with its role.',
      chk: 'mt_chart_parts',
      n: 'Which part names the chart, which explains the colours, and which name the axes?',
    }),
    sl('concept', 'A spreadsheet as a database', {
      v: vDatabase,
      n: 'A list of records with one heading row works as a small database. Each column is a field, such as area or amount, and each row is a record, all the facts about one debtor. Keep one row of field names, no blank rows or columns inside the list, and one kind of entry in each column. Then the list can be sorted, filtered and questioned.',
    }),
    sl('example', 'Worked example 5: sorting the debtors list', {
      b: 'Nadaswaram Hardware (imagined, Durgapur) sorts its debtors by Area (A to Z), and within each area by Amount (largest first).',
      v: vSort,
      n: 'Select the whole list, open the sort command, and give two keys: area from A to Z, then amount from largest to smallest. Benachity comes first, and within it the largest amount, Kanrar Interiors, leads. Because the whole list was selected, each record moves as one row; sorting one column alone would separate the amounts from their customers.',
    }),
    sl('example', 'Worked example 5 continued: filtering and querying', {
      v: vFilter,
      n: `A filter hides the records that fail its conditions without deleting them. Filtering for due invoices of forty thousand rupees or more leaves three records. Formulas answer questions too: count if finds ${words(NDS.get('H2'))} invoices still due, and the conditional sum gives ${rupees(NDS.get('H3'))} still to be collected. Each answer matches the filtered rows.`,
    }),
    sl('check', 'Quick check: counting with a condition', {
      b: 'Work out what the formula shows.',
      chk: 'num_countif',
      n: 'Count only the cells that meet the condition; capitals do not matter.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: design each application with named inputs and one formula copied down. Payroll adds allowances to basic pay and deducts provident fund and tax. Sales sheets work out profit and slab commission with if. Marks sheets test the lowest mark and grade with nested if. A journal is checked by its totals, with ledger balances by conditional sums. Charts present the figures; lists are sorted, filtered and queried.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'State each **rule** (rate, limit, base) before writing the formula.',
        'Provident fund on **basic + DA** here; tax and PF are **deductions**.',
        'Commission slabs: split the sales at the **target**.',
        'Result by the **lowest mark**; grade IF from the **highest cut-off down**.',
        'Sort the **whole list**; a filter **hides**, it does not delete.',
      ],
      n: 'Before each formula, state the rule it follows. Show provident fund and tax as deductions, worked out on their own bases. For slab commission, split the sales at the target. For results, test the lowest mark, and write grade tests from the highest cut-off down. Select the whole list before sorting, and remember that a filter only hides records.',
    }),
  ],
});

// Narration is spoken by text to speech: no digits, rupee sign, slash, ampersand, per-cent sign or capitals runs.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /\d|₹|[\/&%=]|\b[A-Z]{2,}\b/.exec(s.narration);
  check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
}

// ================================================================ notes
const N = notes({
  title: 'Accounting Application of Electronic Spreadsheet — Notes',
  sections: [
    {
      h: '1. The electronic spreadsheet: meaning, utility, merits and demerits',
      t: 1,
      b: 'An **electronic spreadsheet** is a program that arranges a **worksheet** of columns (A, B, C …) and rows (1, 2, 3 …); each **cell** holds a label, a value or a **formula**, and formulas **recalculate automatically** when a figure they use changes.\n\n**Utility in accounting:** payroll; sales, profit and commission; journals with totals and ledger balances; debtors with due dates; budgets and what-if analysis; depreciation and loan schedules; reports and charts.\n\n**Merits:** automatic recalculation and accuracy; what-if analysis; ready-made functions; formatting, sorting, filtering and charts; one design reused every period; compact storage, easy correction and sharing.\n\n**Demerits:** no built-in double-entry control; silent spread of a wrong reference or formula; formulas can be overwritten; weak security and no record of changes; unsuited to very large volumes or many users; needs training and backups.',
      terms: [['Electronic spreadsheet', 'A program of cells in columns and rows holding labels, values and formulas that recalculate automatically.'], ['What-if analysis', 'Changing an input cell to see at once how the results change.']],
      v: vUtility,
      vs: [vMerits],
    },
    {
      h: '2. Workbooks and worksheets: entering, saving, navigating, copying and moving',
      t: 2,
      b: 'A **workbook** is the file; it holds **worksheets**, each with a tab. Columns run A … Z, AA, AB …; a **cell address** is column then row (B3); a **range** is written first cell:last cell (B2:E9).\n\n**Entering and editing:** type and press Enter (down) or Tab (right); text aligns left, numbers right; double-click or F2 to edit; the **fill handle** continues series and copies formulas.\n\n**Navigating:** arrow keys; Ctrl + Home (to A1); Ctrl + arrow (edge of the data); the name box (go to an address).\n\n**Saving:** Save overwrites the same file; **Save As** creates a copy with a new name, place or format.\n\n**Worksheets:** insert, rename, delete, move (references still work), copy (a duplicate with the same formulas), and move or copy into another open workbook. A **reference to another sheet** is the sheet name, an exclamation mark and the cell: `=May!B6`.',
      terms: [['Workbook', 'The spreadsheet file, holding one or more worksheets.'], ['Range', 'A rectangular block of cells, written first cell:last cell.'], ['Save As', 'Saves a copy under a new name, place or format, leaving the original file unchanged.']],
      v: vWindow,
      vs: [vWorkbook, vEntry, vSheets, vSummaryWB],
    },
    {
      h: '3. Formatting, previewing and printing',
      t: 3,
      b: '**Formatting cells:** font, size, bold and colour; alignment, **wrap text**, **merge and centre**; **number formats** (comma style, decimals, percentage, currency, dates such as dd-mm-yyyy or dd-mmm-yyyy); column width and row height (auto-fit; #### means the column is too narrow); borders and fill colours; conditional formatting.\n\nA format changes **only the display**; formulas use the stored value (two cells showing 10.00 can add to 20.01). A date is stored as a count of days, so dates can be added to and subtracted.\n\n**Page set-up and printing:** orientation (portrait or **landscape**); paper size and margins; scaling (fit to one page wide); **print area**; **print titles** (rows to repeat at the top of each page); header and footer; gridlines; **print preview** before printing.',
      terms: [['Number format', 'The way a stored value is displayed: decimals, comma style, percentage or date.'], ['Print titles', 'Rows or columns set to repeat on every printed page.'], ['Print preview', 'A view of the pages exactly as they will print.']],
      v: vFormats,
      vs: [vFormatTools, vPrint],
    },
    {
      h: '4. Formulas and functions: arithmetic, average, percentage, dates, IF; freezing panes',
      t: 4,
      b: 'A **formula** begins with **=**. Order: brackets, then × and ÷, then + and −. Comparison operators (> < >= <= = <>) give TRUE or FALSE; & joins text.\n\n**References:** **relative** (B2) moves when copied; **absolute** (a dollar sign before the column letter and before the row number) and **named** cells (DARate, NetTotal) do not; **mixed** locks one part.\n\n**Functions:** `SUM`, `AVERAGE` (skips blanks), `MAX`, `MIN`, `COUNT`, `COUNTIF`, `ROUND(number, places)`; percentage = part ÷ whole × 100, often `=ROUND(B3/B7*100,2)`; `IF(test, value if true, value if false)`, nested IF for slabs and grades, with `AND` / `OR` for joint tests; dates: `DATE(year, month, day)`, `DAY`, `MONTH`, `YEAR`, `TODAY()`; date − date = days, date + days = a later date.\n\n**Freeze panes:** select the cell below the rows and right of the columns to keep; those rows and columns stay on screen while scrolling (screen only; use print titles for paper).',
      terms: [['Relative reference', 'A reference that moves when a formula is copied.'], ['Absolute reference', 'A reference that stays fixed when a formula is copied.'], ['Nested IF', 'An IF inside another IF, to choose among more than two results.'], ['Freeze panes', 'Keeps chosen rows and columns visible while the rest of the sheet scrolls.']],
      v: vFunctions,
      vs: [vOps, vRefs, vRegister, vCredit, vFreeze],
    },
    {
      h: '5. Payroll',
      t: 5,
      b: '**Gross pay** = basic pay + DA + HRA + TA + CCA (+ other allowances). **Net pay** = gross pay − deductions (provident fund, income tax deducted at source, others).\n\n**Design:** employees in rows; rates and limits in their own named cells (DARate, HRARate, PFRate, TaxLimit …); formulas in row 2 copied down; a totals row.\n\n**Formula patterns (Sarangi Spice Exports):** DA `=ROUND(B2*DARate,0)`; HRA `=ROUND(B2*HRARate,0)`; TA `=IF(B2<30000,1600,2400)`; gross `=SUM(B2:F2)`; PF `=ROUND((B2+C2)*PFRate,0)`; income tax `=IF(G2>TaxLimit,ROUND((G2-TaxLimit)*TaxRate,0),0)` (a simplified rule for this course; real income-tax rules are annual and slab-based); net `=G2-J2`.\n\nCheck: net pay + deductions = gross pay, row by row and in total.',
      terms: [['Dearness allowance (DA)', 'An allowance, usually a percentage of basic pay, that offsets rising prices.'], ['House rent allowance (HRA)', 'An allowance towards rent.'], ['Provident fund (PF)', 'The employee’s retirement saving, deducted from pay.'], ['Net pay', 'Gross pay less deductions; the amount paid to the employee.']],
      v: vPayComp,
      vs: [vPay1, vPay2, vPie],
    },
    {
      h: '6. Sales, salesmen’s commission and student marks',
      t: 5,
      b: '**Sales sheet:** profit = sales − cost of goods sold; profit on sales (%) = `ROUND(profit/sales*100,2)` (on cost would be a mark-up). **Commission** by IF: a single rate by a test (`=IF(B4>=Target,ROUND(B4*3%,0),ROUND(B4*1%,0))`) or **slabs** (2% up to the target, 5% on the excess: `=IF(B4>Target,ROUND(Target*2%+(B4-Target)*5%,0),ROUND(B4*2%,0))`); a status label by IF; `COUNTIF` for the number who met the target.\n\n**Student marks sheet:** total `=SUM(B2:E2)`; percentage; result by the **lowest mark**: `=IF(MIN(B2:E2)>=33,"Pass","Fail")` (or AND over each paper); grade by a **nested IF** from the highest cut-off down; `COUNTIF` for passes, `MAX` and `AVERAGE` for class figures.',
      terms: [['Commission slab', 'A range of sales to which one commission rate applies.'], ['Profit on sales', 'Profit as a percentage of sales (not of cost).']],
      v: vCommRules,
      vs: [vSales, vColumns, vMarks],
    },
    {
      h: '7. Journal in a spreadsheet',
      t: 5,
      b: '**Layout:** Date, Account, Debit, Credit, with one line per account in each entry (debit line first, then the credit line; a narration column may follow).\n\n**Totals and check:** `=SUM(C2:C13)` and `=SUM(D2:D13)`; `=IF(C14=D14,"Agreed","Check entries")`; the difference `=C14-D14` helps trace a slip (a figure keyed as 1,800 instead of 18,000 leaves 16,200).\n\n**Ledger balances by SUMIF:** `=SUMIF(B2:B13,"Cash",C2:C13)-SUMIF(B2:B13,"Cash",D2:D13)` gives the cash balance (positive = debit balance).\n\nThe spreadsheet itself accepts an unbalanced entry; only the check built by the user catches it.',
      terms: [['SUMIF', 'Adds the amounts in rows that meet one condition.'], ['Agreement check', 'An IF formula that compares the debit and credit totals.']],
      v: vJournal,
      vs: [vLedger],
    },
    {
      h: '8. Charts, and the spreadsheet as a database: sorting, querying and filtering',
      t: 6,
      b: '**Charts:** select the data with its labels, insert a chart, add a title, axis titles, legend and data labels, and format it; it redraws when the figures change. Column or bar to **compare**; line for a **trend**; pie for **parts of one whole**; stacked column for parts across periods; scatter for two related measures.\n\n**Database (list):** one heading row of **field names**; each row a **record**; no blank rows or columns; one kind of entry per column.\n\n**Sort:** select the whole list; sort by one or more keys, ascending (A to Z, smallest first) or descending.\n\n**Filter:** hides records that fail the conditions (AutoFilter, custom conditions such as Amount ≥ 40,000 **and** Status = Due); nothing is deleted; clear the filter to see all.\n\n**Query:** a question answered from the list, by a filter or by `COUNTIF` / `SUMIF`, for example `=SUMIF(E2:E9,"Due",D2:D9)`.',
      terms: [['Field', 'A column of a list holding one kind of fact.'], ['Record', 'A row of a list holding all the facts about one item.'], ['Filter', 'Shows only records that meet conditions, hiding the rest.']],
      v: vCharts,
      vs: [vPie, vDatabase, vSort, vFilter],
    },
  ],
  tips: '**Common mistakes**\n- Formula without **=**, or with figures typed in instead of **cell references**.\n- Copying a formula that uses a single rate or total cell without **naming or locking** it.\n- Forgetting **brackets**: `=B2+B3*B4` is not `=(B2+B3)*B4`.\n- Taking AVERAGE as total ÷ all cells when some cells are **blank**.\n- Treating a **format** as if it changed the value.\n- Provident fund on gross pay instead of the stated base; adding tax to gross pay.\n- Applying the higher commission rate to the **whole** sales in a slab scheme.\n- Deciding pass or fail on the **percentage** when the rule is every paper.\n- Sorting **one column** of a list; thinking a filter deletes records.\n- Using freeze panes to repeat headings on **printed** pages.\n\n**How marks are usually split**\n- 1 mark: a term, a function, a format, a reference, or one formula result.\n- 2 marks: two formulas with values, or two points explained.\n- 3 marks: a short sheet (three formulas with values), three merits or steps.\n- 5 marks: a full application in parts (for example 2 + 3): payroll, sales and commission, marks, a journal with SUMIF, or a sort–filter–query problem. Formulas and values carry separate marks.\n\n**Figures in SOYL practice** are imagined; your paper will give its own rates and rules.',
});

// ================================================================ flashcards
const FC = cards([
  ['Electronic spreadsheet', 'Cells in columns and rows holding labels, values and formulas that recalculate automatically.', 'definition', 1],
  ['Three merits of a spreadsheet', 'Automatic recalculation; what-if analysis; functions, formatting, sorting and charts.', 'fact', 1],
  ['Three demerits of a spreadsheet', 'No double-entry control; silent formula errors; weak security.', 'fact', 1],
  ['Workbook vs worksheet', 'The workbook is the file; worksheets are its pages, each with a tab.', 'concept', 2],
  ['Column after Z', 'AA, then AB … AZ, then BA.', 'fact', 2],
  ['Reference to another sheet', 'Sheet name, exclamation mark, cell: `=May!B6`.', 'definition', 2],
  ['Save vs Save As', 'Save overwrites the file; Save As makes a copy with a new name.', 'concept', 2],
  ['Moving a worksheet', 'Changes its position; references to it still work.', 'fact', 2],
  ['Ctrl + Home', 'Moves to cell A1.', 'fact', 2],
  ['Number format', 'Changes the display only; formulas use the stored value.', 'concept', 3],
  ['#### in a cell', 'The column is too narrow; widen it.', 'exam-tip', 3],
  ['Landscape orientation', 'For wide sheets with many columns.', 'fact', 3],
  ['Print titles', 'Repeat heading rows on every printed page.', 'definition', 3],
  ['Order of operations', 'Brackets, then × ÷, then + −.', 'fact', 4],
  ['Relative reference', 'Moves when the formula is copied (B2 → B3).', 'definition', 4],
  ['Absolute or named reference', 'Stays fixed when copied; use for a single rate or total.', 'definition', 4],
  ['AVERAGE and blanks', 'Blank cells are skipped; a typed zero is counted.', 'exam-tip', 4],
  ['IF', '`IF(test, value if true, value if false)`; nest for slabs and grades.', 'definition', 4],
  ['Date arithmetic', 'Date + days = later date; date − date = days between.', 'concept', 4],
  ['DAY, MONTH, YEAR', 'Take a date apart; DATE(year, month, day) builds one.', 'definition', 4],
  ['Freeze panes', 'Keeps rows above and columns left of the selected cell on screen.', 'definition', 4],
  ['Gross pay', 'Basic + DA + HRA + TA + CCA.', 'fact', 5],
  ['Net pay', 'Gross pay − deductions (PF, income tax).', 'fact', 5],
  ['PF in this chapter', '12% of basic + DA, a deduction.', 'exam-tip', 5],
  ['Two-slab commission', 'Low rate on sales up to the target + high rate on the excess.', 'concept', 5],
  ['Pass in every paper', '`=IF(MIN(B2:E2)>=33,"Pass","Fail")`.', 'exam-tip', 5],
  ['Journal check', '`=IF(C14=D14,"Agreed","Check entries")`.', 'exam-tip', 5],
  ['SUMIF', 'Adds amounts in rows meeting one condition; gives ledger balances.', 'definition', 5],
  ['Chart for shares of one total', 'Pie chart.', 'fact', 6],
  ['Chart for a trend', 'Line chart.', 'fact', 6],
  ['Field and record', 'Field = a column; record = a row of a list.', 'definition', 6],
  ['Filter', 'Hides records that fail the conditions; nothing is deleted.', 'concept', 6],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Accounting Application of Electronic Spreadsheet',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_recalc', 'm_crosssheet', 'm_and_or', 'm_grade', 'ar_whatif'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_if_discount', { attempt: 1, keys: ['s2_utility', 's2_database_terms'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Write each formula and state what it shows.', items: ['s3_functions', { attempt: 1, keys: ['s3_marks', 's3_page_setup'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts; write each formula with cell references and state the values.', items: ['l5_sales'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Accounting Application of Electronic Spreadsheet',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_meaning', 'm_colname', 'm_pct_format', 'm_print_titles', 'm_precedence', 'm_date_diff', 'm_freeze', 'm_pf', 'm_sort', 'm_filter', 'ar_display', 'ar_pf'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_payroll_formulas', 's2_date_fns', { attempt: 1, keys: ['s2_sheets', 's2_commission'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Write each formula and state what it shows.', items: ['s3_payroll_net', 's3_journal', 's3_workbook_summary', { attempt: 1, keys: ['s3_copy_error', 's3_sort_filter'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; write formulas with cell references and state the values.', items: ['l5_payroll', { attempt: 1, keys: ['l5_journal', 'l5_database'] }] },
  ],
});
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, 'test totals');

// Every marking scheme uses whole-number step marks that add up to the item's marks.
for (const [id, q] of BANK) {
  check(q.marking_scheme.every((x) => Number.isInteger(x.marks) && x.marks > 0), `${id}: step marks must be whole numbers`);
  check(q.marking_scheme.reduce((a, x) => a + x.marks, 0) === q.marks, `${id}: scheme adds to ${q.marking_scheme.reduce((a, x) => a + x.marks, 0)}, item has ${q.marks}`);
}

// Blueprint fit: every section matches the YAML item for item (type, marks, choice groups).
const BP = {
  short: { A: [['mcq', 1, 4], ['assertion-reason', 1, 1]], B: [['short', 2, 1], ['short', 2, 2, 1]], C: [['short', 3, 1], ['short', 3, 2, 1]], D: [['long', 5, 1]] },
  long: { A: [['mcq', 1, 10], ['assertion-reason', 1, 2]], B: [['short', 2, 2], ['short', 2, 2, 1]], C: [['short', 3, 3], ['short', 3, 2, 1]], D: [['long', 5, 1], ['long', 5, 2, 1]] },
};
function fitCheck(t, bp, qs) {
  check(Object.keys(bp).join() === t.sections.map((s) => s.id).join(), `${t.id}: sections`);
  for (const s of t.sections) {
    const want = bp[s.id];
    check(want, `${t.id}: unexpected section ${s.id}`);
    const free = s.items.filter((i) => !i.choice_group);
    const grouped = s.items.filter((i) => i.choice_group);
    const plain = want.filter((w) => w.length === 3);
    const choice = want.filter((w) => w.length === 4);
    for (const [type, marks, count] of plain) {
      const got = free.filter((i) => qs.get(i.question_id).type === type && i.marks === marks).length;
      check(got === count, `${t.id} ${s.id}: ${got} free ${type}-${marks}, blueprint ${count}`);
    }
    check(free.length === plain.reduce((a, w) => a + w[2], 0), `${t.id} ${s.id}: free item count`);
    for (const [type, marks, of, attempt] of choice) {
      check(s.choice_groups.length === 1 && s.choice_groups[0].attempt === attempt, `${t.id} ${s.id}: choice group`);
      check(grouped.length === of && grouped.every((i) => qs.get(i.question_id).type === type && i.marks === marks), `${t.id} ${s.id}: choice items`);
    }
    if (!choice.length) check(!grouped.length && !s.choice_groups.length, `${t.id} ${s.id}: no choice expected`);
  }
}
fitCheck(T_SHORT, BP.short, BANK);
fitCheck(T_LONG, BP.long, BANK);
// Deck checks never appear in the tests; the tests share no question.
const inShort = new Set(T_SHORT.sections.flatMap((s) => s.items.map((i) => i.question_id)));
const inLong = new Set(T_LONG.sections.flatMap((s) => s.items.map((i) => i.question_id)));
check([...inShort].every((x) => !inLong.has(x)), 'tests are disjoint');
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inShort.has(s.check_question_id) && !inLong.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of isc-12-accounts-ch13 only: meaning, utility, merits and demerits; worksheets and workbooks (entering, saving, navigating, copying and moving sheets, references to other sheets); formatting, previewing and printing; formulas and functions (arithmetic, average, percentage, date functions, IF) and freezing panes; payroll, sales and salesmen’s commission, student marks and journal applications; charts and graphs, database creation, sorting, querying and filtering. No removed topics. Software described generically, no brand names',
    originality: 'every firm, school, person, layout and figure written for this chapter (imagined businesses named after Indian musical instruments); no textbook illustration or exercise and no CISCE specimen or past-paper item reused; firms and stems differ from the CBSE 12 Accountancy chapters and ISC ch01–ch12',
    accounts: `every spreadsheet formula shown is parsed and evaluated (acc.mjs Sheet, including references to other sheets, named cells, COUNTIF, SUMIF and date functions) and its result asserted; display formats computed by fmt(); payroll rows recomputed in plain arithmetic (Sarangi gross ${fig(SA.get('G7'))}, net ${fig(SA.get('K7'))}); commission by slabs (Shehnai ${fig(SH.get('F9'))}); marks, results and grades; journal totals and SUMIF balances equal to the ledger worked by hand (Dilruba cash ${fig(DL.get('G2'))}, bank ${fig(DL.get('G3'))}); sorts and filters run on the records and compared with COUNTIF / SUMIF (Nadaswaram due ${fig(NDS.get('H3'))}); ${FACTS.join('; ')}`,
    facts: 'AVERAGE skips blank cells; ROUND is half away from zero; formats change display only; a date is a count of days from 30 December 1899; freeze panes affects the screen, print titles the paper; references to a sheet survive moving it; income tax uses a simplified flat rule for practice only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
