// ICSE 10 Computer Applications, ch12: Double-dimensional Arrays. Topic t02 (sum of each row and each column).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, ord, short, long } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oic, oline, distinct, mustThrow, dcl, prog, S15 } from './q_util.mjs';
import { coo } from './q_a.mjs';

// ---- shared code
/** Row sums of `name`, one println per row. */
export const rowSums = (name, rows, label = 'Row ') => code(dcl(name, rows), `for (int i = 0; i < ${name}.length; i++) {`, '    int rs = 0;', `    for (int j = 0; j < ${name}[i].length; j++)`, `        rs = rs + ${name}[i][j];`, `    System.out.println(${label ? `"${label}" + i + ": " + ` : ''}rs);`, '}');
/** Column sums of `name`: the outer loop runs over the columns. */
export const colSums = (name, rows, label = 'Column ') => code(dcl(name, rows), `for (int j = 0; j < ${name}[0].length; j++) {`, '    int cs = 0;', `    for (int i = 0; i < ${name}.length; i++)`, `        cs = cs + ${name}[i][j];`, `    System.out.println(${label ? `"${label}" + j + ": " + ` : ''}cs);`, '}');
export const salesRows = [[12, 7, 9, 5], [4, 15, 6, 9], [8, 3, 11, 2]];
export const cRowSales = rowSums('sales', salesRows);
export const cColSales = colSums('sales', salesRows);
/** The same loops with the sum variable declared once, before the outer loop (a common mistake). */
export const rowSumsBad = (name, rows) => code(dcl(name, rows), 'int rs = 0;', `for (int i = 0; i < ${name}.length; i++) {`, `    for (int j = 0; j < ${name}[i].length; j++)`, `        rs = rs + ${name}[i][j];`, '    System.out.println(rs);', '}');
export const cTotalOnePass = code(
  dcl('a', [[3, 8, 5], [6, 2, 9]]),
  'int[] rowTot = new int[2];',
  'int[] colTot = new int[3];',
  'for (int i = 0; i < 2; i++)',
  '    for (int j = 0; j < 3; j++) {',
  '        rowTot[i] = rowTot[i] + a[i][j];',
  '        colTot[j] = colTot[j] + a[i][j];',
  '    }',
  'System.out.println(rowTot[0] + " " + rowTot[1]);',
  'System.out.println(colTot[0] + " " + colTot[1] + " " + colTot[2]);',
);
export const cRowTrace = code(dcl('d', [[4, 9, 2], [6, 1, 7]]), 'for (int i = 0; i < d.length; i++) {', '    int rs = 0;', '    for (int j = 0; j < d[i].length; j++) {', '        rs = rs + d[i][j];', '        System.out.println("i = " + i + ", j = " + j + ", rs = " + rs);', '    }', '}');

// ================================================================ t02 sum of each row and each column
const cRowTrace2 = code(dcl('d', [[4, 9, 2], [6, 1, 7]]), 'for (int i = 0; i < d.length; i++) {', '    int rs = 0;', '    for (int j = 0; j < d[i].length; j++) {', '        rs = rs + d[i][j];', '        System.out.println(rs);', '    }', '}');
Q('m_rowsum_outer', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A program must display the sum of each row of a table. How should the loops be organised?',
  opts: distinct(['The outer loop runs over the rows; the inner loop adds the elements of that row, and the sum is displayed when the inner loop ends', 'The outer loop runs over the columns; the sum of each column is displayed after the inner loop', 'A single loop runs over the rows and adds only the first element of each row', 'The sum is displayed inside the inner loop, after each addition']),
  sol: `One total is needed for each row, so the row subscript changes in the outer loop and the column subscript runs inside it. The row total is complete only after the inner loop ends. Displaying inside the inner loop would show partial sums, for example ${oic(cRowTrace2)}.`,
}));
const q1 = [[2, 5, 3, 8], [6, 4, 7, 1], [9, 2, 5, 3]];
Q('m_colsum_outer', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A table t has 3 rows and 4 columns. Which pair of loops, written outer first, is correct for finding the sum of each column?',
  opts: distinct([ic('outer: j < t[0].length, inner: i < t.length'), ic('outer: i < t.length, inner: j < t[0].length'), ic('outer: j < t.length, inner: i < t[0].length'), ic('outer: i < t[0].length, inner: j < t.length')]),
  sol: `The column total needs the row subscript to run inside while the column subscript stays fixed, so the column loop is the outer loop and its limit is the number of columns, t[0].length. The pair with the limits exchanged, outer j < t.length and inner i < t[0].length, fails for this 3 by 4 table with ${ic(mustThrow(code(dcl('t', q1), 'int cs = 0;', 'for (int j = 0; j < t.length; j++)', '    for (int i = 0; i < t[0].length; i++)', '        cs = cs + t[i][j];')))}.`,
}));
const lastRow = code(dcl('n', [[14, 6, 9], [3, 12, 8], [7, 5, 20]]));
const lastSum = (e) => ev(e, code(lastRow, 'int rs = 0;', 'for (int j = 0; j < n[0].length; j++)', '    rs = rs + n[n.length - 1][j];'));
Q('m_rowsum_value', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A stationery shop stores sales in the table below. After the loop, what is the value of rs?\n\n${F(lastRow, 'int rs = 0;', 'for (int j = 0; j < n[0].length; j++)', '    rs = rs + n[n.length - 1][j];')}`,
  opts: distinct([ic(lastSum('rs')), ic(ev('n[0][0] + n[0][1] + n[0][2]', lastRow)), ic(ev('n[0][0] + n[1][0] + n[2][0]', lastRow)), ic(ev('n[0][0] + n[0][1] + n[0][2] + n[1][0] + n[1][1] + n[1][2] + n[2][0] + n[2][1] + n[2][2]', lastRow))]),
  sol: 'The row subscript n.length - 1 is 2, the last row, and j runs over all the columns, so the last row 7, 5, 20 is added. The first row would give another total, the first column adds one element from each row, and all nine elements together give the grand total.',
}));
const lab = [[5, 9, 2], [6, 1, 7]];
const colOK = colSums('lab', lab, '');
const colBadSum = code(dcl('lab', lab), 'int cs = 0;', 'for (int j = 0; j < lab[0].length; j++) {', '    for (int i = 0; i < lab.length; i++)', '        cs = cs + lab[i][j];', '    System.out.println(cs);', '}');
Q('m_colsum_vals', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A lab teacher stores two sets of readings in three columns. What does the code below display?\n\n${F(colOK)}`,
  opts: distinct([oic(colOK), oic(rowSums('lab', lab, '')), oic(colBadSum), oic(rowSumsBad('lab', lab))]),
  sol: 'The outer loop runs over the columns, so each printed number is the total of one column: 5 + 6, 9 + 1 and 2 + 7. The sums of the rows come from the loops the other way round. When the sum variable is declared before the loop it is never reset, so each line shows the running total of all the earlier columns as well.',
}));
Q('m_reset_place', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In a program that finds the sum of each row, where must the statement rs = 0; be written so that every row gets its own total?',
  opts: distinct(['Inside the outer loop, before the inner loop starts', 'Before the outer loop starts', 'Inside the inner loop, before the addition', 'After the inner loop, just before the sum is displayed']),
  sol: `Each row must start from zero. With the statement before the outer loop the totals carry over: for the rows 4 9 2 and 6 1 7 the displayed totals are ${oic(rowSumsBad('d', [[4, 9, 2], [6, 1, 7]]))}. Inside the inner loop the sum is reset after every element, and after the inner loop it clears the total just before it is needed. The correct placement gives ${oic(rowSums('d', [[4, 9, 2], [6, 1, 7]], ''))}.`,
}));
const swapMsg = mustThrow(code('int[][] p = new int[3][5];', 'int s = 0;', 'for (int i = 0; i < 3; i++)', '    for (int j = 0; j < 5; j++)', '        s = s + p[j][i];'), 'swap 3x5');
Q('m_err_swap', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A program adds the elements of a table p created by int[][] p = new int[3][5]; with the loops for (i = 0; i < 3; i++) and for (j = 0; j < 5; j++) but the statement inside is s = s + p[j][i]. What happens when it runs?',
  opts: distinct([`An ArrayIndexOutOfBoundsException occurs: ${ic(swapMsg)}`, 'The sum of all the elements is calculated correctly', 'A compile-time error is reported', 'A NullPointerException occurs']),
  sol: 'The subscripts are in the wrong order: j, which goes up to 4, is used as the row subscript, but the table has only the rows 0 to 2. The compiler cannot see this because both subscripts are legal ints; the failure is found only at run time, when j reaches 3.',
}));
const cnt = out(code(dcl('t', [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]), 'int n = 0;', 'for (int j = 0; j < t[0].length; j++)', '    for (int i = 0; i < t.length; i++)', '        n++;', 'System.out.println(n);'));
Q('m_inner_count', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A program finds the sum of each column of a table with 4 rows and 6 columns by nested loops. How many times does the statement cs = cs + t[i][j]; execute in all?',
  opts: distinct([cnt, ev('4 + 6'), '6', '4']),
  sol: `The inner loop executes 4 times for each of the 6 values of j, so the addition is performed 4 * 6 times. A run with a counter in the inner loop displays ${cnt}. The number 10 is the sum of rows and columns, which is not the count of nested executions.`,
}));
const avgWrong = code(dcl('r', [[7, 3], [6, 8], [5, 2], [1, 9]]), 'int cs = 0;', 'for (int i = 0; i < r.length; i++)', '    cs = cs + r[i][0];', 'double avg = cs / r.length;', 'System.out.println(avg);');
Q('m_avg_col', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A teacher wants the average of the first column of a table with 4 rows. What does the code below display?\n\n${F(avgWrong)}`,
  opts: distinct([ic(out(avgWrong)), ic(ev('(double) 19 / 4')), ic('4'), ic('19')]),
  sol: `cs is 19 and r.length is 4, so cs / r.length is an integer division, which gives 4, and storing it in a double makes it ${out(avgWrong)}. The fraction is lost. Casting one operand first, as in (double) cs / r.length, gives ${ev('(double) 19 / 4')}. The result is never displayed as the plain int 4.`,
}));
const rs3 = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
const bothTotals = code(dcl('b', rs3), 'int rows = 0, cols = 0;', 'for (int i = 0; i < 3; i++) {', '    for (int j = 0; j < 3; j++)', '        rows = rows + b[i][j];', '}', 'for (int j = 0; j < 3; j++) {', '    for (int i = 0; i < 3; i++)', '        cols = cols + b[i][j];', '}', 'System.out.println(rows + " " + cols);');
Q('m_total_equal', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'A program adds all the row sums of a table in one variable and, separately, adds all the column sums of the same table in another. What can be said about the two results?',
  opts: distinct(['They are always equal, because both are the sum of all the elements of the table', 'The row total is larger, because a table has more rows than columns', 'They are equal only when the table is a square matrix', 'They are equal only when all the elements are positive']),
  sol: `Row totals and column totals are two ways of grouping the same elements, and every element is counted once in each way, so both results are the grand total. A run on a 3 by 3 table gives ${ic(out(bothTotals))}. It holds for every shape of table and for any numbers.`,
}));
Q('m_one_pass', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'A program keeps two arrays, rowTot (one place for each row) and colTot (one place for each column), and wants both kinds of totals from one pair of nested loops. Which two statements must be placed in the inner loop?',
  opts: distinct([ic('rowTot[i] = rowTot[i] + a[i][j]; colTot[j] = colTot[j] + a[i][j];'), ic('rowTot[j] = rowTot[j] + a[i][j]; colTot[i] = colTot[i] + a[i][j];'), ic('rowTot[i] = a[i][j]; colTot[j] = a[i][j];'), ic('rowTot[i] = colTot[j] + a[i][j]; colTot[j] = rowTot[i] + a[i][j];')]),
  sol: `Element a[i][j] belongs to row i and column j, so it is added to rowTot[i] and to colTot[j]. For the table 3 8 5 and 6 2 9 this gives the row totals and the column totals ${ic(oline(cTotalOnePass))}. With the subscripts exchanged the places would be mixed up, and the plain assignments would keep only the last element.`,
}));
Q('tf_outer_count', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? To find the sum of each row of a table with 3 rows and 5 columns, the statements of the outer loop are executed 5 times.',
  sol: `The outer loop of a row-sum program runs once for each row, so for 3 rows it executes ${ev('n', 'int[][] a = new int[3][5];\nint n = 0;\nfor (int i = 0; i < a.length; i++)\n    n++;')} times; the inner loop is the one that executes 5 times for each row.`,
}));
Q('ar_reset', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'In a program that finds the sum of each row, the sum variable must be set to 0 once for every row.',
  r: 'If it is not reset, the total of a row also includes the totals of all the earlier rows.',
  sol: `For the rows 4 9 2 and 6 1 7 the program without the reset displays ${oic(rowSumsBad('d', [[4, 9, 2], [6, 1, 7]]))}, while the correct one displays ${oic(rowSums('d', [[4, 9, 2], [6, 1, 7]], ''))}. So (A) is true and (R) gives the reason for it.`,
}));
Q('fb_colsum', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'To find the sum of each column of a table, the outer loop runs over the ___ and the sum variable is set to ___ before the inner loop begins.',
  acc: [['columns', 'column'], ['0', 'zero']],
  sol: 'The column subscript changes in the outer loop and the row subscript in the inner loop, so the outer loop runs over the columns. A new column starts its total from 0, so the sum variable is set to zero before the inner loop.',
}));
Q('ord_colsum', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps for displaying the sum of every column of a table, from the first step to the last.',
  items: ['Start the outer loop over the column subscript j', 'Set the sum variable to 0', 'Run the inner loop over the row subscript i and add the element in row i and column j', 'Display the sum when the inner loop has ended'],
  sol: 'The sum variable must be cleared after the column is chosen and before its elements are added, and the total can be shown only after all the rows of that column have been added.',
}));

// ---- code output, t02
const rowsA = [[3, 6, 2], [9, 4, 7], [1, 8, 5], [6, 2, 4]];
Q('co_rowsums', coo({
  pre: 'A canteen records plates sold at 4 counters in 3 hours, as in the code below. Write the exact output.',
  t: 2, d: 3, c: 'application', code: rowSums('plates', rowsA),
  sol: 'The outer loop takes a counter (row) at a time, rs is cleared for it and the three hourly values are added: 3 + 6 + 2, 9 + 4 + 7, 1 + 8 + 5 and 6 + 2 + 4. Row numbers start from 0.',
}));
const colsB = [[14, 3, 8, 6], [5, 12, 7, 10]];
Q('co_colsums', coo({
  pre: 'A farmer\'s co-operative keeps the quantities of two crops over four weeks. Write the exact output of the code.',
  t: 2, d: 3, c: 'application', code: colSums('crop', colsB, 'Week '),
  sol: 'The outer loop is over the columns (the weeks) and the inner loop over the two rows, so each line is the total of one week: 14 + 5, 3 + 12, 8 + 7 and 6 + 10.',
}));
Q('co_total_reset', coo({
  pre: 'The sum variable below is declared before the outer loop. Write the exact output of the code.',
  t: 2, d: 4, c: 'analysis', code: rowSumsBad('v', [[2, 7], [5, 1], [8, 4]]),
  sol: 'Because rs is never set back to 0, each line shows the sum so far: 2 + 7 = 9 for the first row, then 9 + 5 + 1 = 15, and then 15 + 8 + 4 = 27. The totals of the individual rows would be 9, 6 and 12.',
}));
Q('co_err_swap', coo({
  pre: 'A student adds the elements of a table with 2 rows and 4 columns. State the error that occurs when the program runs.',
  t: 2, d: 4, c: 'analysis', error: true,
  code: code('int[][] x = new int[2][4];', 'int total = 0;', 'for (int i = 0; i < 2; i++)', '    for (int j = 0; j < 4; j++)', '        total = total + x[j][i];', 'System.out.println(total);'),
  sol: 'The subscripts are written in the wrong order. The column counter j goes up to 3 but is used as the row subscript, and the table has only the rows 0 and 1. The exception occurs as soon as j becomes 2. The correct element is x[i][j].',
  scheme: [['Kind of error: run-time ArrayIndexOutOfBoundsException', 1], ['Reason: j (up to 3) used as the row subscript of a 2-row table', 1]],
}));

// ---- short answers, t02
const sRow = code(dcl('mk', [[40, 35], [28, 44], [31, 39]]), 'for (int i = 0; i < mk.length; i++) {', '    int rs = 0;', '    for (int j = 0; j < mk[i].length; j++)', '        rs = rs + mk[i][j];', '    System.out.println("Row " + i + " = " + rs);', '}');
Q('s_rowsum_code', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Write the Java statements to display the sum of each row of an int array mk of any size.',
  model: `${F(sRow)}\n\nFor the array shown the output is:\n\n\`\`\`\n${out(sRow)}\n\`\`\``,
  sol: 'The sum is cleared inside the outer loop, the inner loop adds the elements of one row, and the sum is displayed after the inner loop.',
  scheme: [['Outer loop on rows with sum set to 0 inside it', 1], ['Inner loop adds mk[i][j]; sum displayed after the inner loop', 1]],
}));
const sCol = code(dcl('qt', [[6, 2, 9], [4, 8, 1]]), 'for (int j = 0; j < qt[0].length; j++) {', '    int cs = 0;', '    for (int i = 0; i < qt.length; i++)', '        cs = cs + qt[i][j];', '    System.out.println("Column " + j + " = " + cs);', '}');
Q('s_colsum_code', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Write the Java statements to display the sum of each column of an int array qt of any size.',
  model: `${F(sCol)}\n\nFor the array shown the output is:\n\n\`\`\`\n${out(sCol)}\n\`\`\``,
  sol: 'The outer loop runs over the columns using qt[0].length, the sum is cleared for each column, and the inner loop runs over the rows using qt.length.',
  scheme: [['Outer loop over the columns (qt[0].length) with the sum set to 0', 1], ['Inner loop over the rows adds qt[i][j]; sum displayed after it', 1]],
}));
Q('s_why_reset', short({
  t: 2, d: 4, c: 'analysis', marks: 2, wl: [25, 100],
  stem: 'Why must the sum variable be set to 0 inside the outer loop while finding the sum of each row? Show the effect of declaring it before the outer loop.',
  model: `Each row needs its own total, so the sum has to start from 0 for every row. If the variable is set to 0 only once, before the outer loop, the totals carry over from row to row.\n\nFor the rows 2, 7 and 5, 1 the correct program displays ${ic(oline(rowSums('v', [[2, 7], [5, 1]], '')))}, but the program with the sum set before the outer loop displays ${ic(oline(rowSumsBad('v', [[2, 7], [5, 1]])))}.`,
  sol: 'One mark for the reason, one mark for the effect, shown by a worked example.',
  scheme: [['Reason: every row must start from 0', 1], ['Effect: totals accumulate across rows (example)', 1]],
}));
const dR = [[4, 9, 2], [6, 1, 7]];
Q('s_rows_vs_cols', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'How do the nested loops for the sum of each row differ from the nested loops for the sum of each column?',
  model: `For the **sum of each row** the outer loop runs over the rows, the sum is set to 0 inside it, and the inner loop runs over the columns of that row. For the **sum of each column** the loops change places: the outer loop runs over the columns, the sum is set to 0 inside it, and the inner loop runs over the rows.

For the table with the rows 4 9 2 and 6 1 7 the row sums are ${ic(oline(rowSums('d', dR, '')))} and the column sums are ${ic(oline(colSums('d', dR, '')))}.`,
  sol: 'One mark for the arrangement of the row-sum loops and one for the column-sum loops, with the position of the sum variable.',
  scheme: [['Row sums: outer loop rows, inner loop columns, sum cleared in the outer loop', 1], ['Column sums: outer loop columns, inner loop rows, sum cleared in the outer loop', 1]],
}));

// ================================================================ 15-mark programs, t02
const srcShop = code(
  'import java.util.Scanner;',
  '',
  'public class ShopWeek {',
  '    // Sales of 3 branches of an imagined store over 4 days',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int[][] sales = new int[3][4];',
  '        for (int i = 0; i < 3; i++)',
  '            for (int j = 0; j < 4; j++)',
  '                sales[i][j] = sc.nextInt();',
  '        System.out.println("Sales (branches in rows, days in columns):");',
  '        for (int i = 0; i < 3; i++) {',
  '            for (int j = 0; j < 4; j++)',
  '                System.out.print(sales[i][j] + " ");',
  '            System.out.println();',
  '        }',
  '        int grand = 0;',
  '        for (int i = 0; i < 3; i++) {',
  '            int rowSum = 0;',
  '            for (int j = 0; j < 4; j++)',
  '                rowSum = rowSum + sales[i][j];',
  '            System.out.println("Branch " + (i + 1) + " total = " + rowSum);',
  '            grand = grand + rowSum;',
  '        }',
  '        for (int j = 0; j < 4; j++) {',
  '            int colSum = 0;',
  '            for (int i = 0; i < 3; i++)',
  '                colSum = colSum + sales[i][j];',
  '            System.out.println("Day " + (j + 1) + " total = " + colSum);',
  '        }',
  '        System.out.println("Grand total = " + grand);',
  '    }',
  '}',
);
Q('l_shopweek', long({
  t: 2, d: 3, c: 'application', marks: 15,
  stem: 'Kalyan Stores, an imagined shop with 3 branches, records the sales (in hundreds of rupees) of every branch on 4 days of a festival week. Write a program in Java to accept the sales as a 3 by 4 array (one row for each branch), display them in matrix format, and then display the total sales of each branch, the total sales of each day and the grand total. Sample input: 120 95 140 110, 80 130 100 90, 150 60 70 125.',
  model: prog({ src: srcShop, stdin: '120 95 140 110\n80 130 100 90\n150 60 70 125\n', also: ['10 20 30 40\n50 60 70 80\n90 100 110 120\n'], vars: [['sales', 'int[][]', '3 by 4 table of sales, one row for each branch'], ['grand', 'int', 'sum of all the branch totals'], ['rowSum', 'int', 'total of one branch, set to 0 for each row'], ['colSum', 'int', 'total of one day, set to 0 for each column'], ['i, j', 'int', 'row and column subscripts of the loops']] }),
  sol: 'Read the table with nested loops, display it row by row, then find each branch total with the sum cleared inside the outer row loop and each day total with the outer loop over the columns. The grand total is the sum of the branch totals.',
  scheme: S15(3, 2, 'Input and matrix display; row totals with the sum cleared for each row; column totals with the outer loop over the columns; grand total', 2, 2),
}));
const srcExam = code(
  'import java.util.Scanner;',
  '',
  'public class ExamSheet {',
  '    // Marks (out of 100) of 4 students in 3 subjects of an imagined school',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int[][] m = new int[4][3];',
  '        for (int i = 0; i < 4; i++)',
  '            for (int j = 0; j < 3; j++)',
  '                m[i][j] = sc.nextInt();',
  '        int best = 0, topper = 0;',
  '        for (int i = 0; i < 4; i++) {',
  '            int total = 0;',
  '            for (int j = 0; j < 3; j++)',
  '                total = total + m[i][j];',
  '            double pc = total / 3.0;',
  '            System.out.println("Student " + (i + 1) + ": total = " + total + ", percentage = " + pc);',
  '            if (total > best) {',
  '                best = total;',
  '                topper = i + 1;',
  '            }',
  '        }',
  '        for (int j = 0; j < 3; j++) {',
  '            int sum = 0;',
  '            for (int i = 0; i < 4; i++)',
  '                sum = sum + m[i][j];',
  '            System.out.println("Subject " + (j + 1) + " average = " + (sum / 4.0));',
  '        }',
  '        System.out.println("Topper: Student " + topper + " with " + best);',
  '    }',
  '}',
);
Q('l_exam', long({
  t: 2, d: 4, c: 'application', marks: 15,
  stem: 'Greenfield Public School, an imagined school, keeps the marks (out of 100) of 4 students in 3 subjects in a 4 by 3 array. Write a program in Java to accept the marks and display, for every student, the total and the percentage; for every subject, the average marks of the 4 students; and the number of the student with the highest total. Sample input: 85 72 83, 70 80 75, 92 88 90, 60 66 72.',
  model: prog({ src: srcExam, stdin: '85 72 83\n70 80 75\n92 88 90\n60 66 72\n', also: ['50 60 70\n80 90 100\n40 50 60\n70 70 70\n'], vars: [['m', 'int[][]', 'marks, one row for each student and one column for each subject'], ['total', 'int', 'total of the marks of one student'], ['pc', 'double', 'percentage of that student (total of 3 subjects out of 300)'], ['sum', 'int', 'total of one subject for the 4 students'], ['best, topper', 'int', 'highest total so far and the student number that has it'], ['i, j', 'int', 'loop subscripts']] }),
  sol: 'Use the outer loop over the students for totals, with the total cleared for each student, and the percentage as total divided by 3.0 so that the fraction is kept. The subject averages need the outer loop over the columns, and the topper is found by comparing each total with the best so far.',
  scheme: S15(3, 2, 'Row totals and percentages with the total cleared for each student; column averages with decimal division; topper found by comparison', 2, 2),
}));
