// ICSE 10 Computer Applications, ch12: Double-dimensional Arrays. Topic t03 (diagonals of a square matrix) and the 15-mark programs.
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, short, long } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oic, oline, distinct, mustThrow, dcl, prog, S15 } from './q_util.mjs';
import { coo } from './q_a.mjs';

// ---- shared code
export const sq4 = [[5, 2, 8, 1], [9, 4, 3, 7], [6, 5, 2, 3], [4, 8, 1, 6]];
export const sq3 = [[3, 8, 1], [6, 4, 9], [2, 7, 5]];
/** Single loop for the left diagonal. */
export const leftD = (name, rows) => code(dcl(name, rows), 'int ls = 0;', `for (int i = 0; i < ${name}.length; i++)`, `    ls = ls + ${name}[i][i];`, 'System.out.println(ls);');
/** Single loop for the right diagonal. */
export const rightD = (name, rows) => code(dcl(name, rows), 'int rs = 0;', `for (int i = 0; i < ${name}.length; i++)`, `    rs = rs + ${name}[i][${name}.length - 1 - i];`, 'System.out.println(rs);');
/** Nested loops with if conditions: sums of the left diagonal, the right diagonal and all the elements, as set-up statements. */
const sums = (rows) => code(dcl('a', rows), 'int ls = 0, rs = 0, all = 0;', 'for (int i = 0; i < a.length; i++)', '    for (int j = 0; j < a.length; j++) {', '        if (i == j) ls += a[i][j];', '        if (i + j == a.length - 1) rs += a[i][j];', '        all += a[i][j];', '    }');
/** Positions (row, column) chosen by a condition on i, j and n for a matrix of order n. */
export const positions = (cond, n) => code(`int n = ${n};`, 'for (int i = 0; i < n; i++)', '    for (int j = 0; j < n; j++)', `        if (${cond})`, '            System.out.println(i + " " + j);');
export const nothing = (s) => (s === '' ? 'nothing' : s);
export const cBothNested = (rows) => code(dcl('a', rows), 'int l = 0, r = 0;', 'for (int i = 0; i < 3; i++)', '    for (int j = 0; j < 3; j++) {', '        if (i == j)', '            l = l + a[i][j];', '        if (i + j == 2)', '            r = r + a[i][j];', '    }', 'System.out.println(l + " " + r + " " + (l + r));');
export const cMark = code(dcl('a', [[3, 8, 5, 2], [7, 1, 9, 4], [6, 2, 8, 5], [4, 9, 3, 7]]), 'for (int i = 0; i < a.length; i++) {', '    for (int j = 0; j < a.length; j++) {', '        if (i == j)', '            System.out.print(a[i][j] + " ");', '        else', '            System.out.print("0 ");', '    }', '    System.out.println();', '}');

// ================================================================ t03 left and right diagonals
Q('m_left_cond', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In a square matrix of order n, for which elements a[i][j] do we say that they lie on the left (principal) diagonal?',
  opts: distinct([ic('i == j'), ic('i + j == n - 1'), ic('i + j == n'), ic('i != j')]),
  sol: `The left diagonal runs from the top-left corner to the bottom-right corner, where the row and the column number are the same. For n = 4 the condition i == j selects the positions (row, column) ${ic(oline(positions('i == j', 4)))}. The condition i + j == n - 1 describes the other diagonal.`,
}));
Q('m_right_cond', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In a square matrix of order n, which condition selects the elements a[i][j] of the right diagonal, from the top-right corner to the bottom-left corner?',
  opts: distinct([ic('i + j == n - 1'), ic('i == j'), ic('i + j == n'), ic('i - j == n - 1')]),
  sol: `In the right diagonal the column number falls by one when the row number rises by one, so the sum of the two numbers stays n - 1. For n = 4 the condition selects ${ic(oline(positions('i + j == n - 1', 4)))}. The condition i + j == n picks a different set of positions that does not start in a corner.`,
}));
Q('m_left_value', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A garden is laid out as a 4 by 4 table of plant counts. What is the value of ls after the loop below?\n\n${F(dcl('g', sq4), 'int ls = 0;', 'for (int i = 0; i < g.length; i++)', '    ls = ls + g[i][i];')}`,
  opts: distinct([ic(ev('ls', sums(sq4))), ic(ev('rs', sums(sq4))), ic(ev('ls + rs', sums(sq4))), ic(ev('all', sums(sq4)))]),
  sol: 'The loop adds g[0][0], g[1][1], g[2][2] and g[3][3], that is 5 + 4 + 2 + 6. The right diagonal has other elements, the sum of both diagonals adds the two results, and the last value is the total of all sixteen elements.',
}));
Q('m_right_value', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A 3 by 3 table stores the points scored on a board game. What is the value of rs after the loop below?\n\n${F(dcl('p', sq3), 'int rs = 0;', 'for (int i = 0; i < p.length; i++)', '    rs = rs + p[i][p.length - 1 - i];')}`,
  opts: distinct([ic(ev('rs', sums(sq3))), ic(ev('ls', sums(sq3))), ic(ev('ls + rs', sums(sq3))), ic(ev('ls + rs - a[1][1]', sums(sq3)))]),
  sol: 'For i = 0, 1, 2 the loop adds p[0][2], p[1][1] and p[2][0], that is 1 + 4 + 2. The left diagonal gives another total, the sum of both counts the centre 4 twice, and subtracting the centre once gives the sum of the five different elements.',
}));
Q('m_centre', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A square matrix a has an odd order n. Which element belongs to both the left diagonal and the right diagonal?',
  opts: distinct([ic('a[n / 2][n / 2]'), ic('a[0][0]'), ic('a[n - 1][0]'), ic('a[n / 2][0]')]),
  sol: `Both i == j and i + j == n - 1 hold only when i = j = (n - 1) / 2, which is n / 2 for odd n. For n = 5 the two conditions together select ${ic(oline(positions('i == j && i + j == n - 1', 5)))}, and for the even order n = 4 they select ${nothing(out(positions('i == j && i + j == n - 1', 4)))}.`,
}));
const dc = (n) => ev('c', `int n = ${n};\nint c = 0;\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n        if (i == j || i + j == n - 1)\n            c++;`);
Q('m_distinct_count', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A 7 by 7 matrix is stored in an array. How many different elements lie on at least one of its two diagonals?',
  opts: distinct([dc(7), ev('7 * 2'), '7', ev('2 * (7 - 1)')]),
  sol: `Each diagonal has 7 elements, which makes ${ev('7 * 2')} places, but the centre element is on both diagonals, so it is counted once only. A program that counts the elements with i == j or i + j == n - 1 for n = 7 displays ${dc(7)}.`,
}));
const msgSq = mustThrow(code('int[][] a = new int[6][4];', 'int ls = 0;', 'for (int i = 0; i < a.length; i++)', '    ls = ls + a[i][i];'), 'non square 6x4');
Q('m_square_req', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'On what kind of table are the sums of the left and the right diagonals normally calculated?',
  opts: distinct(['A square matrix, in which the number of rows equals the number of columns', 'Any table with more rows than columns', 'Any table with more columns than rows', 'Only a table with at most 3 rows']),
  sol: `The positions a[i][i] and a[i][n - 1 - i] exist for every row only when the table is square. In a table with 6 rows and 4 columns a loop over the rows using a[i][i] stops with ${ic(msgSq)}.`,
}));
const idx15 = out(code('int[][] a = new int[5][5];', 'for (int i = 0; i < 5; i++)', '    for (int j = 0; j < 5; j++)', '        a[i][j] = 10 * i + j;', 'System.out.println(a[1][a.length - 1 - 1]);'));
Q('m_right_idx', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'For a 5 by 5 matrix named a, which element of the right diagonal lies in row 1 (the second row)?',
  opts: distinct([ic('a[1][3]'), ic('a[1][1]'), ic('a[1][4]'), ic('a[1][2]')]),
  sol: `The column of the right-diagonal element in row i is n - 1 - i, which is ${ev('5 - 1 - 1')} for n = 5 and i = 1. If a[i][j] is filled with 10 * i + j, the element a[1][a.length - 1 - 1] is ${ic(idx15)}, that is row 1 and column 3. The column 1 belongs to the left diagonal.`,
}));
Q('tf_right_diag', tf({
  t: 3, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? In a 4 by 4 matrix, the right diagonal consists of the elements a[0][3], a[1][2], a[2][1] and a[3][0].',
  sol: `The column of the element in row i is 3 - i. If the cell a[i][j] stores 10 * (i + 1) + (j + 1), the loop element a[i][3 - i] gives ${ic(oline(code('int[][] a = new int[4][4];', 'for (int i = 0; i < 4; i++)', '    for (int j = 0; j < 4; j++)', '        a[i][j] = 10 * (i + 1) + (j + 1);', 'for (int i = 0; i < 4; i++)', '    System.out.println(a[i][3 - i]);')))} for the four rows, exactly the four elements listed.`,
}));
Q('ar_centre', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'In a 5 by 5 matrix, the sum of the left diagonal added to the sum of the right diagonal counts one element twice.',
  r: 'The element a[2][2] satisfies both the condition i == j and the condition i + j == n - 1.',
  sol: `A program that counts the places where both conditions hold for n = 5 displays ${ev('c', 'int n = 5;\nint c = 0;\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n        if (i == j && i + j == n - 1)\n            c++;')}, the single element a[2][2]. So (A) is true, and (R) explains why that element is counted by both diagonals.`,
}));
Q('ar_diag_even', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In a 4 by 4 matrix, the left diagonal and the right diagonal have no element in common.',
  r: 'The element a[2][2] of a 4 by 4 matrix lies on both diagonals.',
  sol: `For n = 4 no position satisfies both i == j and i + j == n - 1: a program printing such positions displays ${nothing(out(positions('i == j && i + j == n - 1', 4)))}. So (A) is true. (R) is false, because a[2][2] has i + j = 4, which is not n - 1 = 3, so it lies only on the left diagonal.`,
}));
Q('fb_diag', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'In a square matrix of order n, the element a[i][j] lies on the left diagonal when i == ___ and on the right diagonal when i + j == ___.',
  acc: [['j'], ['n - 1', 'n-1', 'n -1', 'n- 1']],
  sol: 'On the left diagonal the row number equals the column number, so i == j. On the right diagonal the two numbers add up to the largest subscript, that is n - 1.',
}));
Q('mt_diag', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'For a square matrix a of order n, match each expression with the element it gives.',
  pairs: [
    [ic('a[i][i]'), 'the left-diagonal element of row i'],
    [ic('a[i][n - 1 - i]'), 'the right-diagonal element of row i'],
    [ic('a[n / 2][n / 2]'), 'the centre element when n is odd'],
    [ic('a[0][n - 1]'), 'the top-right corner'],
  ],
  sol: 'The left diagonal repeats the same subscript, the right diagonal pairs i with n - 1 - i, and the middle row and column of an odd matrix are both at n / 2. The corner of the first row and the last column is the first element of the right diagonal.',
}));

// ---- code output, t03
const cLeft = code(dcl('m', [[7, 1, 4, 9], [2, 8, 6, 3], [5, 9, 1, 2], [6, 4, 3, 5]]), 'int s = 0;', 'for (int i = 0; i < m.length; i++) {', '    s = s + m[i][i];', '    System.out.println("Added " + m[i][i]);', '}', 'System.out.println("Sum = " + s);');
Q('co_left_diag', coo({
  pre: 'A mason\'s plan stores tile counts in a 4 by 4 table. Write the exact output of the code.',
  t: 3, d: 3, c: 'application', code: cLeft,
  sol: 'The loop adds the elements m[0][0], m[1][1], m[2][2] and m[3][3], which are 7, 8, 1 and 5, and displays each one as it is added. The sum is shown after the loop.',
}));
const cRightRun = code(dcl('m', [[7, 2, 9], [4, 6, 1], [8, 3, 5]]), 'int s = 0;', 'for (int i = 0; i < 3; i++) {', '    s = s + m[i][2 - i];', '    System.out.println(s);', '}');
Q('co_right_diag', coo({
  pre: 'The code below adds the elements of the right diagonal and displays the running total after every step. Write the exact output.',
  t: 3, d: 3, c: 'application', code: cRightRun,
  sol: 'For i = 0, 1, 2 the elements are m[0][2] = 9, m[1][1] = 6 and m[2][0] = 8. The running totals are 9, then 9 + 6 = 15, then 15 + 8 = 23.',
}));
const cBothA = cBothNested([[2, 5, 1], [4, 3, 6], [7, 8, 9]]);
Q('co_both_if', coo({
  pre: 'A school hall plan is stored as a 3 by 3 table. Write the exact output of the code.',
  t: 3, d: 4, c: 'analysis', code: cBothA,
  sol: 'Left diagonal: 2 + 3 + 9 = 14. Right diagonal: 1 + 3 + 7 = 11. The centre element 3 satisfies both if conditions, so it is added to both l and r, and the last number is l + r = 25, which counts the centre twice.',
}));
Q('co_diag_display', coo({
  pre: 'The code below displays a table in which every element that is not on the left diagonal is shown as 0. Write the exact output.',
  t: 3, d: 3, c: 'application', code: cMark,
  sol: 'When i == j the element a[i][j] is printed; otherwise the character 0 is printed. So only 3, 1, 8 and 7 survive, one in each row, and the println after each inner loop starts a new row.',
}));
Q('co_err_nonsquare', coo({
  pre: 'A student adds the left diagonal of a table with 4 rows and 2 columns. State the error that occurs when the program runs.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: code('int[][] a = new int[4][2];', 'int s = 0;', 'for (int i = 0; i < a.length; i++)', '    s = s + a[i][i];', 'System.out.println(s);'),
  sol: 'The loop variable i runs from 0 to 3 and is used as the column subscript as well, but the table has only the columns 0 and 1. The statement fails when i becomes 2, because a[2][2] does not exist. A diagonal is meaningful only for a square matrix.',
  scheme: [['Kind of error: run-time ArrayIndexOutOfBoundsException', 1], ['Reason: column subscript i reaches 2 but only columns 0 and 1 exist', 1]],
}));

// ---- short answers, t03
const sLeft = code(dcl('m', [[4, 7, 1], [2, 9, 5], [6, 3, 8]]), 'int n = m.length;', 'int ls = 0;', 'for (int i = 0; i < n; i++)', '    ls = ls + m[i][i];', 'System.out.println("Left diagonal = " + ls);');
Q('s_left_code', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Write the Java statements to find and display the sum of the left diagonal of a square int array m.',
  model: `${F(sLeft)}\n\nThe output for the array shown is ${ic(out(sLeft))}.`,
  sol: 'One loop is enough, because the row and the column subscripts are the same.',
  scheme: [['Sum set to 0 and loop from 0 to n - 1 (n = m.length)', 1], ['Adds m[i][i] and displays the sum', 1]],
}));
const sRight = code(dcl('m', [[6, 2, 9], [1, 5, 3], [8, 4, 7]]), 'int n = m.length;', 'int rs = 0;', 'for (int i = 0; i < n; i++)', '    rs = rs + m[i][n - 1 - i];', 'System.out.println("Right diagonal = " + rs);');
Q('s_right_code', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Write the Java statements to find and display the sum of the right diagonal of a square int array m.',
  model: `${F(sRight)}\n\nThe output for the array shown is ${ic(out(sRight))}.`,
  sol: 'The column of the right-diagonal element in row i is n - 1 - i.',
  scheme: [['Sum set to 0 and loop from 0 to n - 1', 1], ['Adds m[i][n - 1 - i] and displays the sum', 1]],
}));
const sOnce = code(dcl('m', sq3), 'int n = m.length;', 'int ls = 0, rs = 0;', 'for (int i = 0; i < n; i++) {', '    ls = ls + m[i][i];', '    rs = rs + m[i][n - 1 - i];', '}', 'System.out.println(ls + " " + rs + " " + (ls + rs - m[n / 2][n / 2]));');
Q('s_centre_twice', short({
  t: 3, d: 4, c: 'analysis', marks: 2, wl: [30, 135],
  stem: 'For a square matrix of odd order, which element is counted twice when the sums of the two diagonals are added? How can the sum of the diagonal elements be found with every element counted once?',
  model: `The **centre element** m[n / 2][n / 2] lies on both diagonals, so it is added twice. Subtracting it once from the total of the two diagonal sums counts every element once.\n\n${F(sOnce)}\n\nThe output ${ic(out(sOnce))} gives the left sum, the right sum and the sum of the five different elements.`,
  sol: 'One mark for naming the centre element and why, and one mark for the correction (subtract it once) with the code.',
  scheme: [['Centre element m[n / 2][n / 2] is on both diagonals', 1], ['Sum of both minus the centre element', 1]],
}));
const msgFive = mustThrow(code('int[][] a = new int[5][3];', 'int s = 0;', 'for (int i = 0; i < a.length; i++)', '    s = s + a[i][i];'), 'non square 5x3');
Q('s_square_need', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Why are the diagonal sums found for a square matrix only? What happens if the loop a[i][i] is used on a table with 5 rows and 3 columns?',
  model: `The left and right diagonals are defined only when the number of rows equals the number of columns, because then every row has an element at the position i and at n - 1 - i.\n\nFor a table with 5 rows and 3 columns the loop over the rows reaches i = 3, and a[3][3] does not exist. The program stops with ${ic(msgFive)}.`,
  sol: 'One mark for the reason (square matrix, equal rows and columns) and one mark for the effect, with the exception.',
  scheme: [['A diagonal needs equal numbers of rows and columns', 1], ['ArrayIndexOutOfBoundsException when i exceeds the columns', 1]],
}));

// ================================================================ 15-mark programs: t01
const srcBeds = code(
  'import java.util.Scanner;',
  '',
  'public class PlantBeds {',
  '    // Seedlings in the beds of an imagined nursery, arranged in rows and columns',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int m = sc.nextInt();',
  '        int n = sc.nextInt();',
  '        if (m < 1 || m > 8 || n < 1 || n > 8) {',
  '            System.out.println("Invalid order");',
  '            return;',
  '        }',
  '        int[][] beds = new int[m][n];',
  '        for (int i = 0; i < m; i++)',
  '            for (int j = 0; j < n; j++)',
  '                beds[i][j] = sc.nextInt();',
  '        System.out.println("Seedlings in each bed:");',
  '        for (int i = 0; i < m; i++) {',
  '            for (int j = 0; j < n; j++)',
  '                System.out.print(beds[i][j] + " ");',
  '            System.out.println();',
  '        }',
  '        int sparse = 0;',
  '        for (int i = 0; i < m; i++)',
  '            for (int j = 0; j < n; j++)',
  '                if (beds[i][j] < 10)',
  '                    sparse++;',
  '        System.out.println("Number of beds = " + (m * n));',
  '        System.out.println("Beds with fewer than 10 seedlings = " + sparse);',
  '    }',
  '}',
);
Q('l_planbeds', long({
  t: 1, d: 3, c: 'application', marks: 15,
  stem: 'An imagined nursery plants seedlings in beds that are arranged in m rows and n columns. Write a program in Java to accept the order m by n (each from 1 to 8, otherwise display Invalid order) and the number of seedlings in every bed, display the numbers in matrix format, and then display the total number of beds and the number of beds that have fewer than 10 seedlings. Sample input: 3 4 and the rows 12 8 15 20, 6 18 9 14, 11 25 7 10.',
  model: prog({ src: srcBeds, stdin: '3 4\n12 8 15 20\n6 18 9 14\n11 25 7 10\n', also: ['0 5\n'], vars: [['m, n', 'int', 'number of rows and number of columns of beds'], ['beds', 'int[][]', 'seedlings in each bed'], ['sparse', 'int', 'count of beds with fewer than 10 seedlings'], ['i, j', 'int', 'row and column subscripts']] }),
  sol: 'Check the order first, then create the array with the accepted sizes, read the elements row by row, display them with a println after every row, and count the beds below 10 with an if inside the nested loops.',
  scheme: S15(2, 2, 'Validation of the order; array created with m and n; elements read and displayed in matrix format; counting of beds below 10', 3, 2),
}));
const srcGrid = code(
  'import java.util.Scanner;',
  '',
  'public class ProductGrid {',
  '    // Fills a grid in which each cell holds (row number) x (column number)',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int r = sc.nextInt();',
  '        int c = sc.nextInt();',
  '        int[][] t = new int[r][c];',
  '        for (int i = 0; i < r; i++)',
  '            for (int j = 0; j < c; j++)',
  '                t[i][j] = (i + 1) * (j + 1);',
  '        System.out.println("Grid of " + r + " rows and " + c + " columns:");',
  '        for (int i = 0; i < r; i++) {',
  '            for (int j = 0; j < c; j++) {',
  '                if (t[i][j] < 10)',
  '                    System.out.print(" ");',
  '                System.out.print(t[i][j] + " ");',
  '            }',
  '            System.out.println();',
  '        }',
  '        System.out.println("Number of elements = " + (r * c));',
  '    }',
  '}',
);
Q('l_table', long({
  t: 1, d: 3, c: 'application', marks: 15,
  stem: 'A craft class prints a grid in which the cell in row i and column j holds the product of its row number and column number (counting both from 1). Write a program in Java to accept the number of rows and the number of columns, store the products in a double-dimensional array, display the array in matrix format with the columns lined up, and display the number of elements. Sample input: 4 6 (four rows and six columns).',
  model: prog({ src: srcGrid, stdin: '4 6\n', also: ['2 3\n'], vars: [['r, c', 'int', 'number of rows and number of columns'], ['t', 'int[][]', 'grid of products'], ['i, j', 'int', 'row and column subscripts']] }),
  sol: 'The array is created after reading r and c; the nested loops fill each cell with (i + 1) * (j + 1) because subscripts start from 0 while the numbers start from 1. A blank is printed before a one-digit value so that the columns line up.',
  scheme: S15(3, 2, 'Array created with r and c; each cell filled with (i + 1) * (j + 1); display with a println after every row; number of elements', 2, 2),
}));

// ================================================================ 15-mark programs: t03 and t02 + t03
const srcGarden = code(
  'import java.util.Scanner;',
  '',
  'public class GardenSquare {',
  '    // A square garden plan of an imagined society: flowers in each plot',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int n = sc.nextInt();',
  '        int[][] g = new int[n][n];',
  '        for (int i = 0; i < n; i++)',
  '            for (int j = 0; j < n; j++)',
  '                g[i][j] = sc.nextInt();',
  '        System.out.println("The garden plan:");',
  '        for (int i = 0; i < n; i++) {',
  '            for (int j = 0; j < n; j++)',
  '                System.out.print(g[i][j] + " ");',
  '            System.out.println();',
  '        }',
  '        int left = 0, right = 0;',
  '        for (int i = 0; i < n; i++) {',
  '            left = left + g[i][i];',
  '            right = right + g[i][n - 1 - i];',
  '        }',
  '        System.out.println("Sum of the left diagonal = " + left);',
  '        System.out.println("Sum of the right diagonal = " + right);',
  '    }',
  '}',
);
Q('l_garden', long({
  t: 3, d: 3, c: 'application', marks: 15,
  stem: 'The residents of an imagined housing society plant flowers in a square garden divided into n by n plots. Write a program in Java to accept the order n and the number of flowers in each plot, display the plan in matrix format, and display the sum of the left diagonal and the sum of the right diagonal. Sample input: 4 and the rows 7 3 9 2, 5 8 1 6, 4 10 2 7, 9 1 6 3.',
  model: prog({ src: srcGarden, stdin: '4\n7 3 9 2\n5 8 1 6\n4 10 2 7\n9 1 6 3\n', also: ['3\n1 2 3\n4 5 6\n7 8 9\n'], vars: [['n', 'int', 'order of the square matrix'], ['g', 'int[][]', 'flowers in each plot'], ['left, right', 'int', 'sums of the left and the right diagonal'], ['i, j', 'int', 'row and column subscripts']] }),
  sol: 'Read n, create an n by n array and read it with nested loops, display it, then use one loop: g[i][i] belongs to the left diagonal and g[i][n - 1 - i] to the right diagonal of row i.',
  scheme: S15(3, 2, 'Square array created from n; matrix display; left diagonal with g[i][i]; right diagonal with g[i][n - 1 - i]', 2, 2),
}));
const srcBoth = code(
  'import java.util.Scanner;',
  '',
  'public class BothDiagonals {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int n = sc.nextInt();',
  '        int[][] a = new int[n][n];',
  '        for (int i = 0; i < n; i++)',
  '            for (int j = 0; j < n; j++)',
  '                a[i][j] = sc.nextInt();',
  '        int left = 0, right = 0, once = 0;',
  '        for (int i = 0; i < n; i++) {',
  '            for (int j = 0; j < n; j++) {',
  '                if (i == j)',
  '                    left = left + a[i][j];',
  '                if (i + j == n - 1)',
  '                    right = right + a[i][j];',
  '                if (i == j || i + j == n - 1)',
  '                    once = once + a[i][j];',
  '            }',
  '        }',
  '        System.out.println("Left diagonal = " + left);',
  '        System.out.println("Right diagonal = " + right);',
  '        System.out.println("Both diagonals, each element once = " + once);',
  '        if (left == right)',
  '            System.out.println("The two diagonal sums are equal");',
  '        else',
  '            System.out.println("The two diagonal sums are different");',
  '    }',
  '}',
);
Q('l_both', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'Write a program in Java to accept the order n of a square matrix and its elements. Find and display the sum of the left diagonal, the sum of the right diagonal and the sum of all the elements that lie on either diagonal, counting an element that lies on both diagonals only once. Also display whether the sums of the two diagonals are equal. Use nested loops with if conditions on the subscripts. Sample input: 3 and the rows 6 1 8, 7 2 3, 5 9 4.',
  model: prog({ src: srcBoth, stdin: '3\n6 1 8\n7 2 3\n5 9 4\n', also: ['4\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1\n'], vars: [['n', 'int', 'order of the matrix'], ['a', 'int[][]', 'the square matrix'], ['left, right', 'int', 'sums of the left and the right diagonal'], ['once', 'int', 'sum of the elements on either diagonal, each counted once'], ['i, j', 'int', 'row and column subscripts']] }),
  sol: 'Test i == j for the left diagonal and i + j == n - 1 for the right diagonal. The test with || adds an element once even when it is on both diagonals, which happens at the centre of an odd matrix. The equality of left and right decides the message.',
  scheme: S15(3, 2, 'Both diagonal conditions (i == j and i + j == n - 1); the || test for once; the comparison and message', 2, 2),
}));
const srcMagic = code(
  'import java.util.Scanner;',
  '',
  'public class MagicCheck {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int n = sc.nextInt();',
  '        int[][] a = new int[n][n];',
  '        for (int i = 0; i < n; i++)',
  '            for (int j = 0; j < n; j++)',
  '                a[i][j] = sc.nextInt();',
  '        int target = 0;',
  '        for (int j = 0; j < n; j++)',
  '            target = target + a[0][j];',
  '        boolean magic = true;',
  '        for (int i = 0; i < n; i++) {',
  '            int rs = 0, cs = 0;',
  '            for (int j = 0; j < n; j++) {',
  '                rs = rs + a[i][j];',
  '                cs = cs + a[j][i];',
  '            }',
  '            if (rs != target || cs != target)',
  '                magic = false;',
  '        }',
  '        int left = 0, right = 0;',
  '        for (int i = 0; i < n; i++) {',
  '            left = left + a[i][i];',
  '            right = right + a[i][n - 1 - i];',
  '        }',
  '        if (left != target || right != target)',
  '            magic = false;',
  '        System.out.println("Sum of the first row = " + target);',
  '        if (magic)',
  '            System.out.println("It is a magic square");',
  '        else',
  '            System.out.println("It is not a magic square");',
  '    }',
  '}',
);
Q('l_magic', long({
  t: [2, 3], d: 5, c: 'analysis', marks: 15,
  stem: 'A square matrix of order n is called a magic square if the sum of every row, the sum of every column and the sums of both diagonals are all equal. Write a program in Java to accept n and the elements of a square matrix and display whether it is a magic square, taking the sum of the first row as the standard. Sample input: 3 and the rows 2 7 6, 9 5 1, 4 3 8.',
  model: prog({ src: srcMagic, stdin: '3\n2 7 6\n9 5 1\n4 3 8\n', also: ['3\n8 1 6\n3 5 7\n4 2 9\n'], vars: [['n', 'int', 'order of the matrix'], ['a', 'int[][]', 'the square matrix'], ['target', 'int', 'sum of the first row, the standard for comparison'], ['rs, cs', 'int', 'sums of row i and of column i'], ['left, right', 'int', 'sums of the two diagonals'], ['magic', 'boolean', 'stays true while every sum equals target']] }),
  sol: 'The sum of the first row becomes the standard. One outer loop finds the sum of row i with a[i][j] and of column i with a[j][i], each cleared for every i, and both are compared with the standard; a single loop finds the two diagonal sums. Any difference makes the flag false.',
  scheme: S15(2, 2, 'Standard sum from the first row; row and column sums compared; diagonal sums compared; flag logic', 3, 2),
}));
