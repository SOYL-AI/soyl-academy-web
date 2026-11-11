// Build ICSE 10 Computer Applications ch12 "Double-dimensional Arrays". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch12/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch12', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const { code, F, ic, ev, out, mustThrow, mustFail, expect, dcl, showM } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const lines = (s) => s.split('\n');
const one = (s) => (s === '' ? '(nothing is printed)' : lines(s).join(' / '));

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(A.cDefault), '3\n4\n0', 'declaration facts');
expect(ev('a[0][0]', 'int[][] a = new int[1][1];'), '0', 'int default');
expect(ev('a[0][0]', 'double[][] a = new double[1][1];'), '0.0', 'double default');
expect(ev('a[0][0]', 'boolean[][] a = new boolean[1][1];'), 'false', 'boolean default');
expect(ev('a[0][0]', 'String[][] a = new String[1][1];'), 'null', 'String default');
expect(out(A.cInit), '2 3 20', 'initialiser facts');
expect(out(B.rowSums('sales', B.salesRows, '')), '33\n34\n24', 'row sums of sales');
expect(out(B.colSums('sales', B.salesRows, '')), '24\n25\n26\n16', 'column sums of sales');
expect(out(B.rowSumsBad('sales', B.salesRows)), '33\n67\n91', 'row sums with the sum declared outside');
expect(ev('ls', code(dcl('a', C.sq4), 'int ls = 0;', 'for (int i = 0; i < 4; i++)', '    ls += a[i][i];')), '17', 'left diagonal of sq4');
expect(ev('rs', code(dcl('a', C.sq4), 'int rs = 0;', 'for (int i = 0; i < 4; i++)', '    rs += a[i][3 - i];')), '13', 'right diagonal of sq4');
expect(out(C.leftD('a', C.sq3)), '12', 'left diagonal of sq3');
expect(out(C.rightD('a', C.sq3)), '7', 'right diagonal of sq3');

// ---------------------------------------------------------------- SVG helpers
/** Matrix as a grid of cells with subscript labels. hl(i, j) highlights cells; right/bottom are labels (from Java) for rows/columns. */
function grid(rows, alt, caption, o = {}) {
  const R = rows.length, Cn = rows[0].length, cw = o.cw ?? 58, ch = 40, left = 64, top = 44;
  const W = left + Cn * cw + 24 + (o.right ? 96 : 0);
  const H = top + R * ch + 16 + (o.bottom ? 44 : 0);
  const s = new Svg(W, H);
  for (let j = 0; j < Cn; j++) s.text(left + j * cw + cw / 2, top - 20, `j = ${j}`, { size: 13, muted: true });
  for (let i = 0; i < R; i++) {
    s.text(left - 10, top + i * ch + ch / 2, `i = ${i}`, { size: 13, muted: true, anchor: 'end' });
    for (let j = 0; j < Cn; j++) {
      const on = o.hl ? o.hl(i, j) : false;
      s.rect(left + j * cw, top + i * ch, cw, ch, { rx: 4, fill: on ? 'accent' : 'fill', fillOpacity: on ? 0.3 : undefined, color: on ? 'accent' : 'muted', sw: on ? 2 : 1.2 });
      s.text(left + j * cw + cw / 2, top + i * ch + ch / 2, String(rows[i][j]), { size: 16, bold: on });
    }
    if (o.right) s.text(left + Cn * cw + 14, top + i * ch + ch / 2, `${o.rightLabel ?? 'sum'} ${o.right[i]}`, { size: 14, bold: true, anchor: 'start' });
  }
  if (o.bottom) for (let j = 0; j < Cn; j++) s.text(left + j * cw + cw / 2, top + R * ch + 24, `sum ${o.bottom[j]}`, { size: 14, bold: true });
  return s.visual(alt, caption);
}
const nums = (s) => lines(s).map(Number);

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Rows and columns', 'Declaration', 'Initialiser list', 'Length of rows and columns', 'Input with nested loops', 'Matrix display', 'Subscript errors'], 'Route map of Part 1: rows and columns, declaration, initialiser list, length of rows and columns, input with nested loops, matrix display and subscript errors', 'Part 1 at a glance');
const vTableSales = grid(B.salesRows, `Grid of an array with ${B.salesRows.length} rows and ${B.salesRows[0].length} columns: the row numbers i are 0 to 2, the column numbers j are 0 to 3, and each cell holds one number`, 'A double-dimensional array is a table: element a[i][j] is in row i and column j.');
const decl = 'int[][] m = new int[3][4];';
const vDecl = table(
  ['Part', 'Meaning', 'Value'],
  [
    [ic('int[][] m'), 'm refers to a double-dimensional array of int', '-'],
    [ic('new int[3][4]'), 'creates 3 rows and 4 columns', '12 elements'],
    [ic('m.length'), 'number of rows', out(code(decl, 'System.out.println(m.length);'))],
    [ic('m[0].length'), 'number of columns', out(code(decl, 'System.out.println(m[0].length);'))],
    [ic('m[2][3]'), 'last element (row 2, column 3)', out(code(decl, 'System.out.println(m[2][3]);'))],
  ],
  'Table of the parts of the declaration int[][] m = new int[3][4] has these parts: the type, the creation of 3 rows and 4 columns, the number of rows 3, the number of columns 4 and the value 0 of the last element',
  'The first size is the number of rows; the second size is the number of columns.',
);
const dflt = (t, e = '[1][1]') => ev(`a[0][0]`, `${t}[][] a = new ${t}[1][1];`);
const vDefaults = table(
  ['Data type', 'Default value of every element'],
  [['int', ic(dflt('int'))], ['double', ic(dflt('double'))], ['boolean', ic(dflt('boolean'))], ['String', ic(dflt('String'))]],
  'Table of the default values of a new array: int elements are 0, double elements are 0.0, boolean elements are false and String elements are null',
  'No element of a new array is ever undefined.',
);
const vFareGrid = grid(A.fareRows, 'Grid of the array fare with 2 rows and 3 columns; the element fare[1][2], in the second row and third column, is highlighted and holds 20', 'fare[1][2] is in row 1 and column 2 (counting from 0).', { hl: (i, j) => i === 1 && j === 2 });
const cEl = code(dcl('fare', A.fareRows));
const exprs = ['fare.length', 'fare[0].length', 'fare[0][0]', 'fare[1][0]', 'fare[1][2]'];
const meaning = ['number of rows', 'number of columns', 'row 0, column 0', 'row 1, column 0', 'row 1, column 2 (the last element)'];
const vEx1 = table(
  ['Expression', 'Meaning', 'Value'],
  exprs.map((e, i) => [ic(e), meaning[i], ic(ev(e, cEl))]),
  `Table of five expressions on the array fare: ${exprs.map((e) => `${e} gives ${ev(e, cEl)}`).join('; ')}`,
  'Subscripts start from 0 in both directions.',
);
const dim = 'int[][] p = new int[5][6];';
const vSize = table(
  ['Quantity', 'Expression', 'Value for new int[5][6]'],
  [
    ['rows', ic('p.length'), ev('p.length', dim)],
    ['columns', ic('p[0].length'), ev('p[0].length', dim)],
    ['elements', ic('p.length * p[0].length'), ev('p.length * p[0].length', dim)],
    ['bytes (4 per int)', ic('p.length * p[0].length * 4'), ev('p.length * p[0].length * 4', dim)],
  ],
  'Table of the size of a table with 5 rows and 6 columns: 5 rows, 6 columns, 30 elements and 120 bytes at 4 bytes for each int',
);
const vStore = (() => {
  const s = new Svg(600, 260);
  const bw = 70, bh = 36;
  s.text(54, 20, 'outer array', { size: 13, muted: true });
  s.text(250, 20, 'rows (each is an int array)', { size: 13, muted: true, anchor: 'start' });
  for (let i = 0; i < 3; i++) {
    const y = 40 + i * 64;
    s.rect(24, y, 60, bh, { rx: 4, fill: 'fill', color: 'accent', sw: 1.8 });
    s.text(54, y + bh / 2, `m[${i}]`, { size: 14, bold: true });
    s.arrow(84, y + bh / 2, 148, y + bh / 2, { sw: 1.6 });
    for (let j = 0; j < 4; j++) {
      s.rect(150 + j * bw, y, bw, bh, { rx: 4, fill: 'fill', color: 'muted', sw: 1.3 });
      s.text(150 + j * bw + bw / 2, y + bh / 2, `m[${i}][${j}]`, { size: 12 });
    }
  }
  s.text(300, 244, 'm.length is 3 (rows); m[0].length is 4 (columns)', { size: 13, muted: true });
  return s.visual('Diagram of int[][] m = new int[3][4] with an outer array with three boxes m[0], m[1] and m[2]; an arrow from each box leads to a row of four boxes holding the elements of that row, such as m[1][0] to m[1][3]', 'A double-dimensional array is an array of rows; every row is an array.');
})();
const vLoops = flow('LR', ['Read r and c', 'Create new int[r][c]', 'Outer loop: row i', 'Inner loop: column j', 'Read a[i][j]', 'Next row'], 'Flow of accepting a table: read r and c, create the array, start the outer loop over the row i, run the inner loop over the column j, read a[i][j] and move to the next row', 'The array can be created only after r and c are known.');
const readOut = out(A.cInputGrid, A.inputGridIn);
const vEx2 = table(
  ['Input typed', 'What it is used for', 'Output'],
  [
    ['2 4', 'r = 2 rows, c = 4 columns', '(creates new int[2][4])'],
    ['31 8 15 22', 'row 0, read column by column', ic(lines(readOut)[0])],
    ['6 40 17 9', 'row 1, read column by column', ic(lines(readOut)[1])],
  ],
  `Table of one run of the input program: the numbers 2 and 4 give the order, the next four numbers fill row 0 and display as ${lines(readOut)[0]}, and the last four fill row 1 and display as ${lines(readOut)[1]}`,
  'Numbers are read in row-major order: all of row 0, then row 1.',
);
const sq2 = [[8, 9], [6, 7]];
const loopVariant = (kind) => {
  const head = dcl('t', sq2);
  if (kind === 'ok') return code(head, showM('t'));
  if (kind === 'noln') return code(head, 'for (int i = 0; i < t.length; i++)', '    for (int j = 0; j < t[i].length; j++)', '        System.out.print(t[i][j] + " ");');
  return code(head, 'for (int i = 0; i < t.length; i++)', '    for (int j = 0; j < t[i].length; j++)', '        System.out.println(t[i][j]);');
};
const vDisplay = table(
  ['Version', 'Output (rows joined by /)'],
  [
    ['print for elements, println after each row', ic(one(out(loopVariant('ok'))))],
    ['println after the inner loop left out', ic(one(out(loopVariant('noln'))))],
    ['println for every element', ic(one(out(loopVariant('one'))))],
  ],
  `Table of three ways to display a 2 by 2 table: print with println after each row gives ${one(out(loopVariant('ok')))}; leaving out the println gives ${one(out(loopVariant('noln')))}; println for every element gives ${one(out(loopVariant('one')))}`,
  'The empty println after the inner loop ends the row.',
);
const traceRows = lines(out(A.cTrace)).map((l) => l.split(' '));
const vTrace = table(
  ['Step', 'i', 'j', 'Element t[i][j]'],
  traceRows.map(([i, j, v], k) => [String(k + 1), i, j, v]),
  `Trace table of the loops over a table with 2 rows and 3 columns: the loop visits row 0 with columns 0 to 2 and then row 1 with columns 0 to 2; the elements are ${traceRows.map((r) => r[2]).join(', ')}`,
  'The column number j changes fastest.',
);
const fillGrid = lines(out(A.cFillGrid)).map((l) => l.split(' ').map(Number));
const vEx3 = grid(fillGrid, `Grid of the table filled by the rule (i + 1) times (j + 2): ${fillGrid.map((r) => r.join(', ')).join('; ')}`, 'Each cell is filled by a formula of its own i and j.');
const bad1 = 'int[][] a = new int[3][4];';
const eRow = mustThrow(code(bad1, 'a[3][0] = 5;'), 'row 3');
const eCol = mustThrow(code(bad1, 'a[0][4] = 5;'), 'col 4');
const eNeg = mustThrow(code(bad1, 'a[-1][2] = 5;'), 'row -1');
const vErr = table(
  ['Statement (a has 3 rows, 4 columns)', 'Why it fails', 'Message from Java'],
  [
    [ic('a[3][0] = 5;'), 'rows are 0 to 2', eRow],
    [ic('a[0][4] = 5;'), 'columns are 0 to 3', eCol],
    [ic('a[-1][2] = 5;'), 'a subscript cannot be negative', eNeg],
  ],
  `Table of three invalid subscripts and the run-time messages: ${eRow}; ${eCol}; ${eNeg}`,
  'The compiler does not check subscripts; the error appears when the program runs.',
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['declaration', 'new int[rows][columns]; the first size is rows'],
    ['initialiser list', 'one inner list for each row'],
    ['sizes', 'rows m.length; columns m[0].length; elements rows * columns'],
    ['default values', '0, 0.0, false, null'],
    ['input and display', 'outer loop rows, inner loop columns; println after each row'],
    ['subscripts', '0 to length - 1; otherwise ArrayIndexOutOfBoundsException'],
  ],
  'Summary table of Part 1: declaration, initialiser list, sizes, default values, input and display with nested loops, and the range of subscripts',
);

// ---------------------------------------------------------------- visuals: Part 2
const rowVals = nums(out(B.rowSums('sales', B.salesRows, '')));
const colVals = nums(out(B.colSums('sales', B.salesRows, '')));
const vRoute2 = flow('LR', ['Sum of each row', 'Sum of each column', 'Resetting the sum', 'Left diagonal', 'Right diagonal', 'Centre element', 'Square matrices only'], 'Route map of Part 2: sum of each row, sum of each column, resetting the sum, left diagonal, right diagonal, the centre element and square matrices only', 'Part 2 at a glance');
const vRowGrid = grid(B.salesRows, `Grid of the array sales with the sum of each row written at the right: ${rowVals.join(', ')}`, 'Row sums: the outer loop picks the row, the inner loop adds along it.', { right: rowVals, rightLabel: 'sum', hl: (i) => i === 1 });
const vRowParts = table(
  ['Statement', 'Job'],
  [
    [ic('for (int i ...)'), 'outer loop: one pass for each row'],
    [ic('int rs = 0;'), 'inside the outer loop: the new row starts from zero'],
    [ic('for (int j ...)'), 'inner loop: moves along the row'],
    [ic('rs = rs + sales[i][j];'), 'adds the element to the row total'],
    [ic('System.out.println(rs);'), 'after the inner loop: the row total is complete'],
  ],
  'Table of the parts of the row-sum program: the outer loop over rows, the sum set to zero inside it, the inner loop over the columns, the addition and the display after the inner loop',
);
const traceLines = lines(out(B.cRowTrace)).map((l) => /i = (\d+), j = (\d+), rs = (\d+)/.exec(l).slice(1));
const dRows = [[4, 9, 2], [6, 1, 7]];
const vEx1b = table(
  ['i', 'j', 'Element added', 'rs afterwards'],
  traceLines.map(([i, j, rs]) => [i, j, String(dRows[i][j]), rs]),
  `Trace table of the row sums of the table with rows 4 9 2 and 6 1 7: the values of rs after each addition are ${traceLines.map((t) => t[2]).join(', ')}; the row totals are ${traceLines[2][2]} and ${traceLines[5][2]}`,
  'rs is set to 0 again when i changes from 0 to 1.',
);
const vColGrid = grid(B.salesRows, `Grid of the array sales with the sum of each column written below it: ${colVals.join(', ')}`, 'Column sums: the outer loop picks the column, the inner loop adds down it.', { bottom: colVals, hl: (i, j) => j === 2 });
const colLines = lines(out(B.colSums('sales', B.salesRows)));
const vEx2b = table(
  ['Column j', 'Elements added', 'Output'],
  colVals.map((v, j) => [String(j), B.salesRows.map((r) => r[j]).join(' + '), ic(colLines[j])]),
  `Trace table of the column sums of sales: ${colVals.map((v, j) => `column ${j} gives ${v}`).join('; ')}`,
  'The outer loop is over j and its limit is sales[0].length.',
);
const vReset = table(
  ['Where rs = 0 is written', 'Output for the table sales (rows joined by /)', 'Correct?'],
  [
    ['inside the outer loop', ic(one(out(B.rowSums('sales', B.salesRows, '')))), 'yes'],
    ['before the outer loop', ic(one(out(B.rowSumsBad('sales', B.salesRows)))), 'no: totals carry over'],
  ],
  `Table comparing the placement of the sum variable: set inside the outer loop the row totals are ${one(out(B.rowSums('sales', B.salesRows, '')))}; set before the outer loop the displayed values are ${one(out(B.rowSumsBad('sales', B.salesRows)))}, each including the earlier rows`,
  'A logical error: the program compiles and runs.',
);
const oneOut = lines(out(B.cTotalOnePass));
const vOnePass = table(
  ['Array a (2 rows, 3 columns)', 'rowTot', 'colTot'],
  [['3 8 5 and 6 2 9', ic(oneOut[0]), ic(oneOut[1])]],
  `Table of one run of the single pass program on the rows 3 8 5 and 6 2 9: the row totals are ${oneOut[0]} and the column totals are ${oneOut[1]}`,
  'Each element is added twice: once to its row total and once to its column total.',
);
const vLeftGrid = grid(C.sq4, 'Grid of a 4 by 4 matrix with the left diagonal highlighted: the elements 5, 4, 2 and 6, where the row number equals the column number', 'Left diagonal: i == j.', { hl: (i, j) => i === j });
const vRightGrid = grid(C.sq4, 'Grid of a 4 by 4 matrix with the right diagonal highlighted: the elements 1, 3, 5 and 4, where i plus j equals 3', 'Right diagonal: i + j == n - 1.', { hl: (i, j) => i + j === 3 });
const diagTrace = lines(out(code(dcl('a', C.sq4), 'int ls = 0, rs = 0;', 'for (int i = 0; i < a.length; i++) {', '    ls = ls + a[i][i];', '    rs = rs + a[i][a.length - 1 - i];', '    System.out.println(i + " " + a[i][i] + " " + a[i][a.length - 1 - i] + " " + ls + " " + rs);', '}'))).map((l) => l.split(' '));
const vEx3b = table(
  ['i', 'Left element a[i][i]', 'Right element a[i][3 - i]', 'Left sum', 'Right sum'],
  diagTrace,
  `Trace table of the diagonals of the 4 by 4 matrix: the left sum grows to ${diagTrace[3][3]} and the right sum to ${diagTrace[3][4]}`,
  'Both sums are found by one loop; the right element is in column n - 1 - i.',
);
const posRow = (n) => out(C.positions('i == j && i + j == n - 1', n));
const vCentre = table(
  ['Order n', 'Positions that satisfy both conditions', 'Meaning'],
  [
    ['3', ic(posRow(3)), 'one common element: the centre'],
    ['4', ic(posRow(4) === '' ? 'none' : posRow(4)), 'no common element'],
    ['5', ic(posRow(5)), 'one common element: the centre'],
  ],
  `Table of the elements common to both diagonals: for order 3 the position is ${posRow(3)}, for order 4 there is none, and for order 5 the position is ${posRow(5)}`,
  'Only an odd matrix has a centre element.',
);
const sq3Grid = grid(C.sq3, 'Grid of a 3 by 3 matrix with both diagonals highlighted: the centre element 4 belongs to both', 'The centre element a[1][1] is on both diagonals.', { hl: (i, j) => i === j || i + j === 2 });
const onceProg = code(dcl('a', C.sq3), 'int ls = 0, rs = 0, once = 0;', 'for (int i = 0; i < 3; i++)', '    for (int j = 0; j < 3; j++) {', '        if (i == j)', '            ls = ls + a[i][j];', '        if (i + j == 2)', '            rs = rs + a[i][j];', '        if (i == j || i + j == 2)', '            once = once + a[i][j];', '    }', 'System.out.println(ls);', 'System.out.println(rs);', 'System.out.println(once);');
const onceOut = lines(out(onceProg));
expect(onceOut.join(' '), '12 7 15', 'once program');
const vEx4b = table(
  ['Sum', 'Condition used', 'Value'],
  [['left diagonal', ic('i == j'), onceOut[0]], ['right diagonal', ic('i + j == 2'), onceOut[1]], ['either diagonal, each element once', ic('i == j || i + j == 2'), onceOut[2]]],
  `Table of the three sums of the 3 by 3 matrix: left ${onceOut[0]}, right ${onceOut[1]} and either diagonal with each element once ${onceOut[2]}; the last is the first two added, less the centre element counted twice`,
  'Left plus right is 19; subtracting the centre 4 gives 15.',
);
const cntSingle = ev('c', 'int c = 0;\nfor (int i = 0; i < 4; i++)\n    c++;');
const cntNested = ev('c', 'int c = 0;\nfor (int i = 0; i < 4; i++)\n    for (int j = 0; j < 4; j++)\n        c++;');
expect(`${cntSingle} ${cntNested}`, '4 16', 'loop counts');
const vLoopKinds = table(
  ['Method', 'Loop', 'Times the body runs when n = 4'],
  [
    ['single loop', ic('for i: ls += a[i][i]'), cntSingle],
    ['nested loops with if', ic('for i, for j: if (i == j) ...'), cntNested],
  ],
  `Table comparing two ways to find a diagonal sum: a single loop runs its body ${cntSingle} times for n equal to 4, nested loops with an if condition run the body ${cntNested} times`,
  'Both give the same answer; the single loop does less work.',
);
const eSq1 = mustThrow(code('int[][] a = new int[5][3];', 'int s = 0;', 'for (int i = 0; i < a.length; i++)', '    s = s + a[i][i];'), 'square 5x3');
const eSq2 = mustThrow(code('int[][] a = new int[3][5];', 'int s = 0;', 'for (int i = 0; i < a.length; i++)', '    s = s + a[i][a[0].length - 1 - i];', 'int t = a[3][0];'), 'square 3x5');
const sqLeft35 = ev('s', 'int[][] a = new int[3][5];\nint s = 0;\nfor (int i = 0; i < a.length; i++)\n    s = s + a[i][i];');
const vSquare = table(
  ['Table', 'Loop over a.length', 'Result'],
  [
    ['5 rows, 3 columns', ic('a[i][i]'), eSq1],
    ['3 rows, 5 columns', ic('a[i][i]'), `runs, but only the corner 3 by 3 part is used (sum ${sqLeft35})`],
    ['4 rows, 4 columns', ic('a[i][i]'), 'the true left diagonal'],
  ],
  `Table of diagonal loops on non-square tables: a table with 5 rows and 3 columns gives ${eSq1}; a table with 3 rows and 5 columns runs but does not give a real diagonal; only a square table has a true left diagonal`,
  'Diagonals are defined for square matrices only.',
);
void eSq2;
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['row sums', 'outer loop rows; rs = 0 inside it; display after the inner loop'],
    ['column sums', 'outer loop columns (a[0].length); inner loop rows'],
    ['reset', 'sum set before the outer loop makes totals carry over'],
    ['left diagonal', 'i == j, or a[i][i]'],
    ['right diagonal', 'i + j == n - 1, or a[i][n - 1 - i]'],
    ['centre of an odd matrix', 'counted in both diagonals; subtract it once'],
  ],
  'Summary table of Part 2: row sums, column sums, resetting the sum, the left diagonal, the right diagonal and the centre element of an odd matrix',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Arrays in Rows and Columns: Declaration, Input and Display',
  goals: [
    'Declare, create and initialise a double-dimensional array',
    'Find the number of rows, columns and elements, and use valid subscripts',
    'Accept the elements of a table with nested loops',
    'Display a table in matrix format',
  ],
  slides: [
    sl('title', 'Double-dimensional arrays', {
      b: 'Part 1: **declaring**, **initialising**, **accepting** and **displaying** a table of values with an array that has **rows and columns**.',
      v: vRoute1,
      n: 'Welcome to double dimensional arrays. In this part we declare and create an array with rows and columns, give it values with an initialiser list, find how many rows and columns it has, accept its elements with nested loops, and display them in matrix format. We finish with the error that appears when a subscript is out of range.',
    }),
    sl('concept', 'Data in rows and columns', {
      b: 'A single-dimensional array is a list. When data forms a **table**, for example the sales of shops on several days, a **double-dimensional array** keeps it in **rows and columns**. An element is named by **two subscripts**: `a[i][j]` is in row `i` and column `j`.',
      v: vTableSales,
      n: 'A single dimensional array holds a list of values. Many problems need a table, such as the sales of three shops over four days. A double dimensional array keeps such a table in rows and columns. Each element has two subscripts. The first one gives the row and the second one gives the column. Both subscripts start from zero, so the first element is in row zero and column zero.',
    }),
    sl('concept', 'Declaring and creating', {
      b: `${F(decl)}\n\nTwo pairs of brackets mean two dimensions. In **new int[3][4]** the first size is the number of **rows** and the second is the number of **columns**.`,
      v: vDecl,
      n: 'The declaration has two pairs of brackets, one for each dimension. In the creation part, the first size is the number of rows and the second size is the number of columns. So this statement makes three rows and four columns, which are twelve elements. The length of the array is the number of rows, the length of the first row is the number of columns, and the last element is in row two and column three.',
    }),
    sl('concept', 'Default values', {
      b: 'When an array is created, **every element is given a default value**: 0 for int, 0.0 for double, false for boolean and null for String and other objects.',
      v: vDefaults,
      n: 'When a new array is created, Java fills every element with a default value. For int this value is zero, for double it is zero point zero, for boolean it is false, and for String it is null. So a program never meets an undefined element, but a student should still store the real values before using the array.',
    }),
    sl('check', 'Quick check: reading the syntax', {
      b: 'Match each expression with what it gives.',
      chk: 'mt_syntax',
      n: 'Think about which expression counts rows, which counts columns, and what the two subscripts select.',
    }),
    sl('concept', 'Initialiser list', {
      b: `An array can be given its values when it is declared. Each inner pair of braces is **one row**, and the sizes are taken from the list.\n\n${F(A.cInit)}`,
      v: vFareGrid,
      n: 'An array can be created and filled in one statement with an initialiser list. Each inner pair of braces is one row. There is no new keyword and no sizes, because Java counts the rows and the values. For the fare array, the number of rows is two, the number of columns is three, and the element in row one and column two is twenty.',
    }),
    sl('example', 'Worked example 1: reading elements by subscripts', {
      b: `${F(A.cInit)}\n\nFind the value of each expression for the array \`fare\`.`,
      v: vEx1,
      n: 'Let us find the value of five expressions on the fare array. The length of the array is the number of rows. The length of the first row is the number of columns. Subscripts zero and zero give the first element. Subscripts one and zero give the first element of the second row. The last element is in row one and column two. Remember that the row subscript is always written first.',
    }),
    sl('concept', 'Rows, columns and elements', {
      b: 'The number of elements is **rows × columns**, and the memory used is that number multiplied by the size of one element (4 bytes for an int).',
      v: vSize,
      n: 'For a table with five rows and six columns, the length of the array gives five and the length of the first row gives six. The number of elements is five times six, which is thirty. An int takes four bytes, so the memory used is one hundred and twenty bytes. The number of elements is always rows multiplied by columns, and not their sum.',
    }),
    sl('concept', 'How Java stores a table', {
      b: 'A double-dimensional array is an **array of arrays**: the outer array holds one reference for each row, and every row is a single-dimensional array of its own. So `m[1]` means a whole row and `m[1][2]` means one element.',
      v: vStore,
      n: 'This picture shows how Java stores a table. The outer array has one box for each row. From each box an arrow leads to the row itself, which is an ordinary array with its own elements. So m of one means the whole second row, and m of one and two means a single element of it. This is why the length of the outer array counts rows, and the length of a row counts columns.',
    }),
    sl('check', 'Quick check: default values', {
      b: 'Choose the correct value.',
      chk: 'm_default_double',
      n: 'Remember the default value of the data type of the array.',
    }),
    sl('concept', 'Accepting the elements', {
      b: 'Read the order first, create the array, then use **nested loops**: the **outer loop runs over the rows** and the **inner loop over the columns**, so the elements are read **row by row**.',
      v: vLoops,
      n: 'To accept a table, first read the number of rows and columns, and then create the array with those sizes. Then use two loops, one inside the other. The outer loop takes one row at a time. The inner loop takes the columns of that row, and each pass reads one element with the next int method of Scanner. The elements are therefore read row by row.',
    }),
    sl('example', 'Worked example 2: accept and display', {
      b: `${F(A.cInputGrid)}\n\nThe input is the order, then the elements row by row.`,
      v: vEx2,
      n: 'Here is a complete program. The first two numbers typed, two and four, give two rows and four columns. The next four numbers fill row zero and the last four fill row one. Both loops use the order variables, so the program works for any size. The second pair of loops displays each row on its own line.',
    }),
    sl('concept', 'Displaying in matrix format', {
      b: 'Print each element **without a line break**, and give **one println after the inner loop** to end the row. Leaving it out, or printing every element with println, spoils the matrix shape.',
      v: vDisplay,
      n: 'To display a table in matrix format, print each element with the print method, followed by a space, and end the row with an empty println after the inner loop. The table shows what happens when this is changed. Without the empty println, all the values run together on one line. With println for every element, there is one value on each line.',
    }),
    sl('check', 'Quick check: steps of the program', {
      b: 'Arrange the steps in order.',
      chk: 'ord_input',
      n: 'Decide what must be known before the array can be created.',
    }),
    sl('concept', 'How the loops visit the elements', {
      b: 'In **row-major order** the row subscript stays fixed while the column subscript goes through all its values. The **column number changes fastest**.',
      v: vTrace,
      n: 'The trace table shows the order in which the loops reach the elements of a table with two rows and three columns. The row number stays at zero while the column number goes from zero to two. Then the row number becomes one and the columns are visited again. The column number changes fastest, and this is the order in which input is read.',
    }),
    sl('example', 'Worked example 3: filling by a rule', {
      b: `${F(A.cFillGrid)}\n\nEach cell is calculated from its own subscripts, then the table is displayed.`,
      v: vEx3,
      n: 'Elements need not be typed in. Here each cell is calculated from its own subscripts, as row number plus one, multiplied by column number plus two. Row zero therefore holds two, three, four and five, because the row factor is one. The row factor grows by one for each row, so row two holds six, nine, twelve and fifteen.',
    }),
    sl('concept', 'Subscript errors', {
      b: 'The valid subscripts run from **0 to length - 1**. A row or column outside this range causes an **ArrayIndexOutOfBoundsException** when the program runs; the compiler does not check it.',
      v: vErr,
      n: 'Valid subscripts run from zero up to the length minus one. A row or column outside this range causes an ArrayIndexOutOfBoundsException while the program runs. Java names the bad index and the length in its message. The compiler cannot catch these errors, so loops should use the length of the array as their limit, with a less than sign and never less than or equal.',
    }),
    sl('check', 'Quick check: the order of the loops', {
      b: 'Write the exact output.',
      chk: 'co_swapped_loops',
      n: 'Notice which loop is the outer one, and what each pass of the inner loop prints.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A table is created with the number of rows first and the number of columns second. An initialiser list gives one inner list for each row. The number of rows is the length of the array, and the number of columns is the length of the first row. Nested loops read and display the table row by row, with an empty println after each row. A subscript outside zero to length minus one causes an exception.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the row size first and the column size second: `new int[rows][columns]`.',
        'Use `a.length` for rows and `a[0].length` for columns; never type the sizes again inside loops.',
        'Use `<` in the loop limits; `<=` goes one step past the last element.',
        'Put `System.out.println();` after the inner loop so that each row is on its own line.',
        'In a program, read the order before creating the array, and add a variable description.',
      ],
      n: 'Some exam tips. Write the number of rows first and the number of columns second. Use the length of the array for rows and the length of the first row for columns. Use the less than sign in loop limits. Put the empty println after the inner loop so that each row is on its own line. In a program, read the order before creating the array, and add the variable description.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Row Sums, Column Sums and Diagonals',
  goals: [
    'Find the sum of each row and each column with nested loops',
    'Avoid the common mistakes: the sum variable and the order of subscripts',
    'Find the sums of the left and the right diagonal of a square matrix',
    'Treat the centre element of an odd matrix correctly',
  ],
  slides: [
    sl('title', 'Row sums, column sums and diagonals', {
      b: 'Part 2: the **sum of each row**, the **sum of each column**, and the **left and right diagonals** of a **square matrix**.',
      v: vRoute2,
      n: 'Welcome to the second part. We find the sum of each row and the sum of each column of a table with nested loops, and we see why the sum variable must be reset. Then we study the two diagonals of a square matrix, the condition that picks each diagonal, the centre element of an odd matrix, and why diagonals need a square matrix.',
    }),
    sl('concept', 'Sum of each row', {
      b: 'For **each row** we need **one total**. The **outer loop** takes the row, the **inner loop** adds along that row.',
      v: vRowGrid,
      n: 'To find the sum of each row, we need one total for every row. The outer loop takes one row at a time. The inner loop moves along the row and adds each element. The picture shows the table of sales with the row totals at the right. The totals are thirty three, thirty four and twenty four.',
    }),
    sl('concept', 'The row-sum program', {
      b: `${F(B.cRowSales)}\n\nThe total **rs** is set to 0 **inside the outer loop**, so that every row starts from zero.`,
      v: vRowParts,
      n: 'This is the whole program. The outer loop goes over the rows. Inside it, the sum variable is set to zero, so that every row starts afresh. The inner loop adds each element of the row to the sum. Only after the inner loop has finished, the row total is complete, and then it is displayed. Row numbers start from zero.',
    }),
    sl('example', 'Worked example 1: tracing a row sum', {
      b: `${F(B.cRowTrace)}\n\nFollow the value of \`rs\` after every addition.`,
      v: vEx1b,
      n: 'Let us trace the sums of a table with two rows. In row zero, rs grows from four to thirteen and then to fifteen, and that is the total of the first row. When the outer loop moves to row one, rs is set to zero again, and it grows from six to seven and then to fourteen. So the two row totals are fifteen and fourteen.',
    }),
    sl('concept', 'Sum of each column', {
      b: `For columns, **swap the loops**: the outer loop runs over the **columns** (limit \`sales[0].length\`) and the inner loop over the **rows** (limit \`sales.length\`).\n\n${F(B.cColSales)}`,
      v: vColGrid,
      n: 'To find the sum of each column, the two loops change places. The outer loop takes one column at a time, and its limit is the number of columns, which is the length of the first row. The inner loop goes down the rows and adds the element of that column. The totals of the four columns are twenty four, twenty five, twenty six and sixteen.',
    }),
    sl('example', 'Worked example 2: column totals', {
      b: 'Each line of the output is the total of one column. The subscript `i` runs down the rows while `j` stays fixed.',
      v: vEx2b,
      n: 'In the trace, each column total is made by adding the elements down one column. Column zero adds twelve, four and eight. Column one adds seven, fifteen and three. The output lines are labelled with the column number. The column number is printed by the outer loop, and the row subscript changes in the inner loop.',
    }),
    sl('check', 'Quick check: steps for column sums', {
      b: 'Arrange the steps in order.',
      chk: 'ord_colsum',
      n: 'Decide when the sum variable has to be cleared and when the total may be displayed.',
    }),
    sl('concept', 'Where must the sum be reset?', {
      b: 'If **rs = 0** is written **before** the outer loop, the totals **carry over** from row to row. This is a **logical error**: the program runs and shows wrong numbers.',
      v: vReset,
      n: 'This is a very common mistake. If the sum variable is set to zero before the outer loop, it is never cleared again. The second row total then includes the first row, and the third includes both. The table shows thirty three, sixty seven and ninety one instead of thirty three, thirty four and twenty four. The compiler does not report this, so tracing is the only way to find it.',
    }),
    sl('concept', 'Row and column totals in one pass', {
      b: `Two arrays can collect both totals in **one pair of loops**. Each element goes to **two** places.\n\n${F(B.cTotalOnePass)}`,
      v: vOnePass,
      n: 'Both kinds of totals can be found by one pair of loops, if two arrays are kept, one place for each row and one place for each column. Each element is added to the total of its own row, using the subscript i, and also to the total of its own column, using the subscript j. This avoids going through the table twice.',
    }),
    sl('check', 'Quick check: the sum variable', {
      b: 'Write the exact output.',
      chk: 'co_total_reset',
      n: 'Notice where the sum variable is declared, and what happens to it between the rows.',
    }),
    sl('concept', 'The left diagonal', {
      b: `In a **square matrix** (rows = columns = n) the **left diagonal** joins the top-left corner to the bottom-right corner. Its elements have **i == j**, so one loop is enough.\n\n${F(C.leftD('a', C.sq4))}`,
      v: vLeftGrid,
      n: 'In a square matrix the number of rows equals the number of columns. The left diagonal runs from the top left corner to the bottom right corner. Its elements have the same row number and column number, so one loop with a of i and i is enough. For this matrix the left diagonal elements are five, four, two and six, and their sum is seventeen.',
    }),
    sl('concept', 'The right diagonal', {
      b: 'The **right diagonal** joins the top-right corner to the bottom-left corner. Its elements have **i + j == n - 1**, so in row `i` the column is **n - 1 - i**.',
      v: vRightGrid,
      n: 'The right diagonal runs from the top right corner to the bottom left corner. When the row number goes up by one, the column number comes down by one, so the two numbers always add up to n minus one. In row i the element is in column n minus one minus i. For this matrix the right diagonal elements are one, three, five and four, and their sum is thirteen.',
    }),
    sl('example', 'Worked example 3: both diagonals together', {
      b: 'One loop finds both sums: the left element is `a[i][i]` and the right element is `a[i][a.length - 1 - i]`.',
      v: vEx3b,
      n: 'In this trace one loop finds both diagonal sums. In each step, the left element is taken from column i and the right element from the column that is three minus i. The left sum grows to seventeen and the right sum grows to thirteen. The two sums are different, and neither of them is the sum of the whole table.',
    }),
    sl('check', 'Quick check: a right-diagonal element', {
      b: 'Choose the correct element.',
      chk: 'm_right_idx',
      n: 'Use the rule that the column in row i is n minus one minus i.',
    }),
    sl('concept', 'The centre element of an odd matrix', {
      b: 'When **n is odd**, one element, the **centre** `a[n / 2][n / 2]`, lies on **both** diagonals. When **n is even**, the diagonals have **no common element**.',
      v: vCentre,
      n: 'In a matrix of odd order, one element lies on both diagonals. It is the centre element, in the middle row and the middle column. In a matrix of even order, the two diagonals cross between the elements and share none. The table shows the positions that satisfy both conditions for orders three, four and five.',
    }),
    sl('example', 'Worked example 4: each element counted once', {
      b: `${F(onceProg)}\n\nThe test **i == j || i + j == 2** adds an element once even if it is on both diagonals.`,
      v: vEx4b,
      n: 'For the three by three matrix, the left diagonal sum is twelve and the right diagonal sum is seven. If we add the two sums, we get nineteen, but the centre element four has been counted twice. The test with the logical or adds each element of either diagonal only once, and the answer is fifteen, which is nineteen less four.',
    }),
    sl('check', 'Quick check: the centre element', {
      b: 'Decide whether the assertion and the reason are true.',
      chk: 'ar_centre',
      n: 'Check which element satisfies both conditions in a matrix of order five.',
    }),
    sl('concept', 'Single loop or nested loops?', {
      b: 'The diagonal sums can be found with a **single loop** using `a[i][i]`, or with **nested loops** and `if` conditions on `i` and `j`. Both are correct, but the single loop does **less work**.',
      v: vLoopKinds,
      n: 'There are two ways to find a diagonal sum. A single loop picks the elements directly with a of i and i. Nested loops visit every element and use an if condition on the subscripts. Both give the same answer. For a matrix of order four, the body of the single loop runs four times and the body of the nested loops runs sixteen times.',
    }),
    sl('concept', 'Diagonals need a square matrix', {
      b: 'A true diagonal exists only when **rows = columns**. A loop over the rows that uses `a[i][i]` on a table with **more rows than columns** fails with an **ArrayIndexOutOfBoundsException**.',
      v: vSquare,
      n: 'Diagonals are defined only for a square matrix. If a table has more rows than columns, the loop over the rows uses a column subscript that does not exist, and the program stops with an index out of bounds exception. If a table has more columns than rows, the loop runs, but it does not give a real diagonal.',
    }),
    sl('check', 'Quick check: a non-square table', {
      b: 'State the error.',
      chk: 'co_err_nonsquare',
      n: 'Find the value of the loop variable at which the column subscript goes out of range.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. For row sums, the outer loop runs over the rows, the sum is set to zero inside it, and the total is displayed after the inner loop. For column sums, the loops change places. A sum variable set before the outer loop makes the totals carry over. The left diagonal has the same row and column, the right diagonal has the subscripts adding up to n minus one, and the centre of an odd matrix is on both.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Set the sum to 0 **inside** the outer loop, and display it **after** the inner loop.',
        'For column sums, the outer loop is over `a[0].length` and the inner loop over `a.length`.',
        'Left diagonal: `i == j`. Right diagonal: `i + j == n - 1`, or `a[i][n - 1 - i]`.',
        'For odd `n`, mention that the centre element is common to both diagonals.',
        'Diagonals are for square matrices only: check `rows == columns` if the question allows other shapes.',
      ],
      n: 'Some exam tips. Set the sum to zero inside the outer loop and display it after the inner loop. For column sums, the outer loop is over the columns and the inner loop over the rows. The left diagonal has the same row and column, and the right diagonal has the subscripts adding up to n minus one. For odd n, remember the centre element. Diagonals are for square matrices only.',
    }),
  ],
});

const errRowInt = mustFail(code('int[][] a = new int[2][3];', 'a[1] = 7;'));
const errLenCall = mustFail(code('int[][] a = new int[2][2];', 'int n = a.length();'));
// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Double-dimensional Arrays: notes',
  sections: [
    {
      h: '1. Rows, columns and declaration',
      t: 1,
      b: `A **double-dimensional array** stores values of one data type in **rows and columns**; an element is identified by two subscripts, \`a[i][j]\` (row, then column), both starting from 0.\n\n${F(decl)}\n\n- \`new int[3][4]\` creates 3 rows and 4 columns, 12 elements: the first size is the rows.\n- \`m.length\` is the number of rows (${ic(ev('m.length', decl))}) and \`m[0].length\` the number of columns (${ic(ev('m[0].length', decl))}).\n- The number of elements is rows multiplied by columns; the memory is that number multiplied by the size of one element.\n- Java stores the table as an array of arrays: \`m[1]\` is a whole row.`,
      terms: [
        ['Double-dimensional array', 'An array of arrays that stores values of the same data type in rows and columns; each element is accessed by two subscripts.'],
        ['Subscript', 'The number, counted from 0, that gives the position of an element in a row or a column.'],
        ['Matrix format', 'Display of a table with each row on its own line and the elements of the row side by side.'],
      ],
      v: vStore,
      vs: [vTableSales, vDecl, vSize],
    },
    {
      h: '2. Initialisation, default values and subscripts',
      t: 1,
      b: `An **initialiser list** gives the values at the time of declaration, one inner list for each row, and no sizes are written.\n\n${F(A.cInit)}\n\nOutput: ${ic(out(A.cInit))} (rows, columns and the last element).\n\n**Default values** of a new array: int ${ic(dflt('int'))}, double ${ic(dflt('double'))}, boolean ${ic(dflt('boolean'))}, String ${ic(dflt('String'))}.\n\n**Valid subscripts** are 0 to length - 1. Otherwise the program stops with an ArrayIndexOutOfBoundsException, for example ${ic(eRow)} for \`a[3][0]\` on a table with 3 rows. A whole row cannot be given a single value: \`a[1] = 7;\` gives "${errRowInt}".`,
      terms: [
        ['Initialiser list', 'A list of values in braces, one inner list for each row, used to create and fill an array in its declaration.'],
        ['ArrayIndexOutOfBoundsException', 'The run-time error raised when a subscript is negative or not less than the length of the array.'],
      ],
      v: vFareGrid,
      vs: [vDefaults, vEx1, vErr],
    },
    {
      h: '3. Accepting and displaying a table',
      t: 1,
      b: `To **accept** a table, read the order, create the array, then use **nested loops**: the outer loop over the rows and the inner loop over the columns, reading \`a[i][j] = sc.nextInt();\`. The elements are read in **row-major order**.\n\n${F(A.cInputGrid)}\n\nFor the input 2 4 followed by the rows 31 8 15 22 and 6 40 17 9 the output is:\n\n\`\`\`\n${readOut}\n\`\`\`\n\nTo **display** in matrix format print each element without a line break and put an empty \`System.out.println();\` after the inner loop. Without it the output is ${ic(one(out(loopVariant('noln'))))}.`,
      terms: [
        ['Row-major order', 'Visiting or reading the elements of a table row by row: the column subscript changes fastest.'],
      ],
      v: vLoops,
      vs: [vEx2, vDisplay, vTrace, vEx3],
    },
    {
      h: '4. Sum of each row and each column',
      t: 2,
      b: `**Row sums:** the outer loop runs over the rows, the sum is set to 0 **inside** it, the inner loop adds the elements of the row and the sum is displayed **after** the inner loop.\n\n${F(B.cRowSales)}\n\nOutput: ${ic(one(out(B.cRowSales)))}.\n\n**Column sums:** the loops change places: the outer loop over the columns (limit \`a[0].length\`), the inner loop over the rows (limit \`a.length\`).\n\n${F(B.cColSales)}\n\nOutput: ${ic(one(out(B.cColSales)))}.\n\nThe sum of all the row sums equals the sum of all the column sums; both equal the sum of all the elements. Two arrays, one for rows and one for columns, give both kinds of totals in one pass.`,
      terms: [
        ['Row sum', 'The total of the elements of one row of a table.'],
        ['Column sum', 'The total of the elements of one column of a table.'],
      ],
      v: vRowGrid,
      vs: [vRowParts, vEx1b, vColGrid, vEx2b, vOnePass],
    },
    {
      h: '5. Mistakes in sums',
      t: 2,
      b: `- **Sum not reset:** \`int rs = 0;\` written before the outer loop makes the totals carry over: ${ic(one(out(B.rowSumsBad('sales', B.salesRows))))} instead of ${ic(one(out(B.rowSums('sales', B.salesRows, ''))))}. It is a logical error.\n- **Subscripts exchanged:** \`a[j][i]\` in a non-square table can cause an ArrayIndexOutOfBoundsException.\n- **Wrong loop limits:** use \`a.length\` for the rows and \`a[0].length\` for the columns.\n- **Integer division** when finding an average: use \`(double) cs / a.length\`.\n- **println inside the inner loop** shows partial sums.`,
      terms: [
        ['Logical error', 'A mistake that does not stop the program but makes it give wrong results.'],
      ],
      v: vReset,
      vs: [],
    },
    {
      h: '6. Diagonals of a square matrix',
      t: 3,
      b: `In a **square matrix** (n rows and n columns) the **left (principal) diagonal** has the elements with \`i == j\`; the **right diagonal** has \`i + j == n - 1\`, that is \`a[i][n - 1 - i]\`.\n\n${F(C.leftD('a', C.sq4))}\n\nOutput for the matrix of the slides: ${ic(out(C.leftD('a', C.sq4)))}; the right diagonal gives ${ic(out(C.rightD('a', C.sq4)))}.\n\nFor **odd n** the centre element \`a[n / 2][n / 2]\` is on both diagonals, so it is counted twice if the two sums are added; for **even n** no element is common. A condition \`i == j || i + j == n - 1\` adds each element once. A diagonal loop over a table that is not square can cause an ArrayIndexOutOfBoundsException.`,
      terms: [
        ['Square matrix', 'A table with the same number of rows and columns.'],
        ['Left (principal) diagonal', 'The elements from the top-left to the bottom-right corner of a square matrix, where the row subscript equals the column subscript.'],
        ['Right diagonal', 'The elements from the top-right to the bottom-left corner of a square matrix, where the subscripts add up to n - 1.'],
      ],
      v: vLeftGrid,
      vs: [vRightGrid, vEx3b, vCentre, vEx4b, vLoopKinds, vSquare],
    },
  ],
  tips: '**Common mistakes**\n- Rows and columns exchanged in `new int[rows][columns]`.\n- `<=` in a loop limit, which goes past the last element.\n- The sum variable declared before the outer loop.\n- Forgetting `System.out.println();` after the inner loop.\n- Using `a[i][i]` on a table that is not square; forgetting that the centre of an odd matrix is counted twice if both diagonal sums are added.\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format; matrix layout kept.\n- Error questions: the error named and the reason given.\n- Programs (15 marks): class and method structure, input of the order and the elements, nested loops, the logic (sums, diagonal conditions), output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a double-dimensional array?', 'An array of arrays that stores values of one data type in rows and columns; elements need two subscripts.', 'definition', 1],
  ['What does new int[3][4] create?', 'A table with 3 rows and 4 columns, that is 12 int elements (the first size is the rows).', 'concept', 1],
  ['Which subscript comes first in a[i][j]?', 'The row subscript i, then the column subscript j.', 'fact', 1],
  ['First element of a double-dimensional array', 'a[0][0] (subscripts start from 0).', 'fact', 1],
  ['Last element of an array with r rows and c columns', 'a[r - 1][c - 1].', 'fact', 1],
  ['How to find the number of rows of array a', 'a.length', 'fact', 1],
  ['How to find the number of columns of array a', 'a[0].length (the length of the first row).', 'fact', 1],
  ['Number of elements of a table', 'rows multiplied by columns, for example a.length * a[0].length.', 'fact', 1],
  ['Why is length written without brackets for an array?', `length is a field, not a method: a.length() gives "${errLenCall}".`, 'exam-tip', 1],
  ['Default values of a new array', `int ${dflt('int')}, double ${dflt('double')}, boolean ${dflt('boolean')}, String ${dflt('String')}.`, 'fact', 1],
  ['What is an initialiser list?', 'Values in braces, one inner list for each row, used to create and fill the array in its declaration.', 'definition', 1],
  ['What does a[1] stand for in a double-dimensional array?', 'The whole second row (a single-dimensional array), not one element.', 'concept', 1],
  ['What is row-major order?', 'Visiting the elements row by row; the column subscript changes fastest.', 'definition', 1],
  ['Which loop is the outer loop when a table is read row by row?', 'The loop over the rows; the inner loop is over the columns.', 'concept', 1],
  ['How is a table accepted from the keyboard?', ic('a[i][j] = sc.nextInt();') + ' inside nested loops over the rows and the columns.', 'fact', 1],
  ['How is a table displayed in matrix format?', 'print for each element with a space, and an empty println after the inner loop for the end of each row.', 'concept', 1],
  ['Output if println is left out after the inner loop', `All the values appear on one line, for example ${ic(one(out(loopVariant('noln'))))}.`, 'exam-tip', 1],
  ['When is ArrayIndexOutOfBoundsException thrown?', `When a row or column subscript is negative or not less than the length; for a[3][0] on 3 rows: ${eRow}.`, 'definition', 1],
  ['Which loop condition is safe for rows?', ic('i < a.length') + ' (not <=).', 'exam-tip', 1],
  ['Sum of each row: where is the sum set to 0?', 'Inside the outer loop, before the inner loop begins.', 'exam-tip', 2],
  ['Sum of each row: where is the sum displayed?', 'After the inner loop ends, inside the outer loop.', 'concept', 2],
  ['Sum of each column: which loop is outer?', 'The loop over the columns, with the limit a[0].length; the inner loop is over the rows.', 'concept', 2],
  ['Effect of declaring the sum before the outer loop', `Totals carry over: ${ic(one(out(B.rowSumsBad('sales', B.salesRows))))} instead of ${ic(one(out(B.rowSums('sales', B.salesRows, ''))))} for the sales table.`, 'exam-tip', 2],
  ['Sum of all row sums compared with sum of all column sums', 'They are equal: both equal the sum of all the elements.', 'fact', 2],
  ['How can one pair of loops give row and column totals?', 'Keep two arrays: rowTot[i] and colTot[j] both receive a[i][j].', 'concept', 2],
  ['Average of a column of r rows', 'sum divided by r, with a cast: (double) cs / a.length; plain int division loses the fraction.', 'exam-tip', 2],
  ['What is a square matrix?', 'A table with the same number of rows and columns.', 'definition', 3],
  ['Condition for the left (principal) diagonal', 'i == j, or the elements a[i][i].', 'fact', 3],
  ['Condition for the right diagonal', 'i + j == n - 1, or the elements a[i][n - 1 - i].', 'fact', 3],
  ['Left diagonal sum with one loop', ic('ls = ls + a[i][i];') + ' for i from 0 to n - 1.', 'concept', 3],
  ['Which element is on both diagonals?', 'For odd n, the centre a[n / 2][n / 2]; for even n there is none.', 'fact', 3],
  ['Sum of both diagonals, each element once', 'left sum + right sum - centre element (odd n); or one test with i == j || i + j == n - 1.', 'concept', 3],
  ['Why are diagonals found for square matrices only?', 'Rows must equal columns; otherwise a[i][i] can fall outside the columns and cause an ArrayIndexOutOfBoundsException.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Double-dimensional Arrays',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_rows_expr', 'm_nested_order', 'm_rowsum_outer', 'm_reset_place', 'm_left_cond', 'm_right_cond', 's_display', 's_colsum_code'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_shopweek', 'l_garden'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Double-dimensional Arrays',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_decl_form', 'm_elem_access', 'm_last_index', 'm_decl_input', 'm_colsum_outer', 'm_colsum_vals', 'm_avg_col', 'm_right_value', 'm_centre', 'm_distinct_count', 's_def_2d', 's_why_reset', 's_centre_twice', 'co_colsums', 'co_right_diag'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_planbeds', 'l_exam', 'l_both'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of icse-10-computer-applications-ch12 only; searching and sorting in double-dimensional arrays are not covered',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
