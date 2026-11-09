// ICSE 10 Computer Applications, ch12: Double-dimensional Arrays. Topic t01 (declaration, initialisation, input, display).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oic, distinct, mustFail, mustThrow, dcl, showM } from './q_util.mjs';

/** Code-output item whose expected output is the trimmed real output. */
export const coo = (o) => co({ ...o, ...(o.error ? {} : { output: out(o.code, o.run?.stdin) }) });

// ---- shared code used by several items and by the slides
export const fareRows = [[12, 18, 25], [10, 15, 20]];
export const cInit = code(dcl('fare', fareRows), 'System.out.println(fare.length + " " + fare[0].length + " " + fare[1][2]);');
export const stockRows = [[12, 7, 9], [4, 15, 6], [8, 3, 11]];
export const cShow = code(dcl('stock', stockRows), showM('stock'));
export const cDefault = code('int[][] m = new int[3][4];', 'System.out.println(m.length);', 'System.out.println(m[0].length);', 'System.out.println(m[2][3]);');
export const cInputGrid = code(
  'import java.util.Scanner;',
  '',
  'public class GridReader {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int r = sc.nextInt();',
  '        int c = sc.nextInt();',
  '        int[][] a = new int[r][c];',
  '        for (int i = 0; i < r; i++)',
  '            for (int j = 0; j < c; j++)',
  '                a[i][j] = sc.nextInt();',
  '        for (int i = 0; i < r; i++) {',
  '            for (int j = 0; j < c; j++)',
  '                System.out.print(a[i][j] + " ");',
  '            System.out.println();',
  '        }',
  '    }',
  '}',
);
export const inputGridIn = '2 4\n31 8 15 22\n6 40 17 9\n';
export const cFillGrid = code(
  'int[][] g = new int[3][4];',
  'for (int i = 0; i < 3; i++)',
  '    for (int j = 0; j < 4; j++)',
  '        g[i][j] = (i + 1) * (j + 2);',
  showM('g'),
);
export const cTrace = code(dcl('t', [[5, 8, 2], [7, 1, 9]]), 'for (int i = 0; i < t.length; i++)', '    for (int j = 0; j < t[i].length; j++)', '        System.out.println(i + " " + j + " " + t[i][j]);');

// ================================================================ t01 declaration, initialisation, input and display
Q('m_array_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In Java, what is a double-dimensional (two-dimensional) array?',
  opts: distinct(['An array whose elements are themselves arrays, so that the data is arranged in rows and columns', 'An array that can store only two values', 'An array whose size is doubled every time an element is added', 'Two single-dimensional arrays declared in the same statement']),
  sol: 'A double-dimensional array holds a table of values of one data type. Each row is itself a single-dimensional array, and an element is identified by two subscripts, the row and the column. Its size is fixed when it is created, and it is not limited to two values.',
}));
const errDeclOne = mustFail(code('int[] a = new int[4][5];'), 'wrong dimensions');
Q('m_decl_form', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which statement creates an int array named chart with 4 rows and 5 columns?',
  opts: distinct([ic('int[][] chart = new int[4][5];'), ic('int[][] chart = new int[5][4];'), ic('int[] chart = new int[4][5];'), ic('int chart[4][5];')]),
  sol: `The first size in the brackets after new is the number of rows and the second is the number of columns. Declaring the variable as a single-dimensional int[] while creating a table is rejected: javac says "${errDeclOne}". The form with sizes in the declaration is borrowed from other languages and is not valid Java.`,
}));
const cRows = 'int[][] t = new int[6][9];';
Q('m_rows_expr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The statement ${ic(cRows)} creates a table in a program for a bus depot. Which expression gives the number of rows of t?`,
  opts: distinct([ic('t.length'), ic('t[0].length'), ic('t.length()'), ic('t.length * t[0].length')]),
  sol: `t.length is the length of the outer array, which is the number of rows: ${ic(ev('t.length', cRows))}. The number of columns is t[0].length, which is ${ic(ev('t[0].length', cRows))}. Writing t.length() with brackets is an error because length is a field, not a method: javac says "${mustFail(code(cRows, 'int n = t.length();'))}".`,
}));
const ccols = code(dcl('plan', [[3, 1, 4, 1, 5], [9, 2, 6, 5, 3], [5, 8, 9, 7, 9]]));
Q('m_cols_val', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `What does System.out.println(plan[0].length) display for the array below?\n\n${F(ccols)}`,
  opts: distinct(['5', '3', '15', '4']),
  sol: `plan[0] is the first row, which is a single-dimensional array of 5 values, so its length is ${ev('plan[0].length', ccols)}. The value 3 is plan.length (the number of rows), ${ev('plan.length * plan[0].length', ccols)} is the total number of elements and 4 is the largest column subscript.`,
}));
const cEl = code(dcl('fare', fareRows));
Q('m_elem_access', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A ticket counter stores fares in the array below. What is the value of fare[1][0]?\n\n${F(cEl)}`,
  opts: distinct([ic(ev('fare[1][0]', cEl)), ic(ev('fare[0][1]', cEl)), ic(ev('fare[0][0]', cEl)), ic(ev('fare[1][1]', cEl))]),
  sol: `The first subscript selects the row and the second the column, and both start from 0. So fare[1][0] is the first element of the second row. The value ${ev('fare[0][1]', cEl)} is fare[0][1], the first row with the second column, which has the subscripts reversed.`,
}));
const cDbl = 'double[][] d = new double[2][3];';
Q('m_default_double', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A weather program creates ${ic(cDbl)} and uses it before storing anything. What does System.out.println(d[1][2]) display?`,
  opts: distinct([ic(ev('d[1][2]', cDbl)), ic('0'), ic('null'), 'A compile-time error is reported']),
  sol: `Java gives every element of a new array a default value; for double it is 0.0, so the program displays ${ev('d[1][2]', cDbl)}. A plain 0 is the default of int. The default null belongs to object types such as String, and the code compiles.`,
}));
const cLast = 'int[][] a = new int[3][5];';
const msgRow = mustThrow(code(cLast, 'a[3][0] = 1;'), 'row 3');
const msgCol = mustThrow(code(cLast, 'a[0][5] = 1;'), 'col 5');
Q('m_last_index', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `For the array created by ${ic(cLast)}, which element is the last one, in the last row and the last column?`,
  opts: distinct([ic('a[2][4]'), ic('a[3][5]'), ic('a[2][5]'), ic('a[3][4]')]),
  sol: `The valid row subscripts are 0 to 2 and the valid column subscripts 0 to 4, since the numbers of rows and columns are 3 and 5. A row subscript 3 fails at run time with ${ic(msgRow)}, and a column subscript 5 with ${ic(msgCol)}.`,
}));
Q('m_total_mem', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A school creates int[][] roll = new int[7][8]; to hold roll numbers. How many elements does the array have, and how many bytes do they occupy if one int takes 4 bytes?',
  opts: distinct([`${ev('7 * 8')} elements, ${ev('7 * 8 * 4')} bytes`, `${ev('7 + 8')} elements, ${ev('(7 + 8) * 4')} bytes`, `${ev('7 * 8')} elements, ${ev('7 * 8')} bytes`, `${ev('7 * 8')} elements, ${ev('7 * 8 * 8')} bytes`]),
  sol: 'The number of elements of a table is rows multiplied by columns, and the memory is that number multiplied by the size of one element. The sum of rows and columns is not the number of elements, and an int needs 4 bytes, not 1 byte or 8 bytes (8 bytes is the size of a double).',
}));
const cOrder = (outer, inner, brace) => code(dcl('seat', [[1, 2], [3, 4]]), `for (int ${outer[0]} = 0; ${outer[0]} < ${outer[1]}; ${outer[0]}++) {`, `    for (int ${inner[0]} = 0; ${inner[0]} < ${inner[1]}; ${inner[0]}++)`, '        System.out.print(seat[i][j] + " ");', ...(brace ? ['    System.out.println();'] : []), '}');
const cPlain = cOrder(['i', 'seat.length'], ['j', 'seat[0].length'], true);
const cNoLn = cOrder(['i', 'seat.length'], ['j', 'seat[0].length'], false);
const cCol = cOrder(['j', 'seat[0].length'], ['i', 'seat.length'], true);
const cEach = code(dcl('seat', [[1, 2], [3, 4]]), 'for (int i = 0; i < seat.length; i++)', '    for (int j = 0; j < seat[0].length; j++)', '        System.out.println(seat[i][j]);');
Q('m_println_missing', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `The program below should display the table in matrix format, but the statement System.out.println() was left out after the inner loop. What is displayed?\n\n${F(cNoLn)}`,
  opts: distinct([oic(cNoLn), oic(cPlain), oic(cCol), oic(cEach)]),
  sol: 'Without the empty println after the inner loop no line break is produced between the rows, so the four values stay on one line. The matrix format needs one println for each row. Printing every element with println would give one value per line, and swapping the loops would list the columns instead of the rows.',
}));
Q('m_nested_order', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'To accept or display the elements of a table row by row (each row completed before the next begins), how should the two loops be arranged?',
  opts: distinct(['The outer loop runs over the rows and the inner loop runs over the columns', 'The outer loop runs over the columns and the inner loop runs over the rows', 'Both loops run over the rows', 'One loop is enough and it runs from 0 to the number of columns']),
  sol: 'The loop that changes slowest is the outer one. For row-major order the row subscript must stay fixed while the column subscript runs through all its values, so the column loop is inside the row loop.',
}));
Q('m_decl_input', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'With Scanner sc already created and int[][] a = new int[3][3]; declared, which statement reads one integer from the keyboard into the element in row i and column j?',
  opts: distinct([ic('a[i][j] = sc.nextInt();'), ic('a[i, j] = sc.nextInt();'), ic('sc.nextInt() = a[i][j];'), ic('a[i][j] = sc.nextInt[];')]),
  sol: `The element a[i][j] on the left of the assignment receives the value returned by nextInt() on the right. Subscripts are written in separate brackets, so a[i, j] is wrong: javac says "${mustFail(code('int[][] a = new int[3][3];', 'int i = 0, j = 0;', 'a[i, j] = 5;'))}". The value cannot be assigned to a method call.`,
}));
Q('mt_syntax', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Java expression with what it gives for a table named hall with 5 rows and 8 columns.',
  pairs: [
    [ic('hall.length'), 'the number of rows'],
    [ic('hall[0].length'), 'the number of columns'],
    [ic('hall[2][1]'), 'the element in the third row and second column'],
    [ic('new int[5][8]'), 'a table with 40 elements, all 0'],
  ],
  sol: `The length of the outer array counts the rows, and the length of any one row counts the columns. Subscripts start at 0, so index 2 means the third row and 1 the second column. The size 5 by 8 gives ${ev('5 * 8')} elements, which int sets to ${ev('(new int[5][8])[0][0]')} at first.`,
}));
Q('ord_input', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'A program must accept the order and the elements of a table and show them. Arrange its steps in the order in which they must be performed.',
  items: ['Read the number of rows and the number of columns', 'Create the array with those sizes', 'Use nested loops to read every element from the keyboard', 'Use nested loops to display the elements row by row'],
  sol: 'The array cannot be created before its sizes are known, and the elements cannot be read before the array exists. Display comes last because it shows the values that were read.',
}));
Q('tf_default_bool', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? After boolean[][] gate = new boolean[2][2]; every element of gate holds false before any value is stored.',
  sol: `Boolean arrays are filled with the default value false: ${ic(ev('gate[1][1]', 'boolean[][] gate = new boolean[2][2];'))} is displayed for gate[1][1].`,
}));
Q('tf_row_assign', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? For int[][] a = new int[2][3]; the statement a[1] = 7; stores 7 in every element of the second row.',
  sol: `a[1] stands for a whole row, which is an int array, so a single number cannot be assigned to it; javac says "${mustFail(code('int[][] a = new int[2][3];', 'a[1] = 7;'))}". Each element must be assigned separately, for example with a loop.`,
}));
Q('ar_rows_cols', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'For the array int[][] m = new int[4][6]; the expression m.length gives the number of columns.',
  r: 'The expression m[0].length gives the number of elements in the first row.',
  sol: `m.length is the length of the outer array, ${ev('m.length', 'int[][] m = new int[4][6];')}, which is the number of rows, so (A) is false. (R) is true: m[0].length is ${ev('m[0].length', 'int[][] m = new int[4][6];')}, the length of the first row, and that is the number of columns.`,
}));
Q('ar_twelve', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The statement int[][] m = new int[3][4]; creates twelve elements.',
  r: 'The subscripts of a Java array start from 0.',
  sol: 'Three rows with four columns give 3 * 4 = 12 elements, so (A) is true. (R) is also true, but it only says where the numbering begins; the count of twelve comes from multiplying the two sizes.',
}));
Q('fb_sub', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the element a[i][j] of a two-dimensional array, the first subscript i stands for the ___ and the second subscript j stands for the ___.',
  acc: [['row'], ['column', 'col']],
  sol: 'The first subscript chooses the row and the second chooses the column, so a[2][0] is in row number 2 and column number 0 (the third row and first column).',
}));

// ---- code output, t01
const cHall = code('int[][] hall = new int[3][4];', 'hall[1][2] = 9;', 'hall[2][0] = hall[1][2] + 4;', 'System.out.println(hall[2][0] + " " + hall[0][0]);', 'System.out.println(hall.length + " " + hall[0].length);');
Q('co_decl_default', coo({
  pre: 'A cinema stores the number of tickets sold in a table with the code below. Write the exact output.',
  t: 1, d: 2, c: 'application', code: cHall,
  sol: 'All elements start as 0. hall[1][2] becomes 9 and hall[2][0] becomes 9 + 4 = 13. The element hall[0][0] was never changed, so it is still 0. The array has 3 rows and 4 columns.',
}));
const cShowA = code(dcl('rain', [[21, 5, 12, 8], [3, 30, 14, 7]]), showM('rain'));
Q('co_init_view', coo({
  pre: 'A weather club keeps rainfall readings in the array below. Write the exact output of the code.',
  t: 1, d: 2, c: 'application', code: cShowA,
  sol: 'The outer loop takes one row at a time, the inner loop prints that row on one line separated by blanks, and println after the inner loop starts a new line for the next row.',
}));
const cColWise = code(dcl('m', [[21, 22, 23], [24, 25, 26]]), 'for (int j = 0; j < m[0].length; j++) {', '    for (int i = 0; i < m.length; i++)', '        System.out.print(m[i][j] + " ");', '    System.out.println();', '}');
Q('co_swapped_loops', coo({
  pre: 'In the code below the loop over the columns is the outer loop. Write the exact output.',
  t: 1, d: 3, c: 'analysis', code: cColWise,
  sol: 'For each value of j the inner loop runs through all the rows, so one printed line holds one column of the table: the first line is column 0 (21 and 24), and so on. The table has 2 rows and 3 columns, which gives 3 lines of 2 values.',
}));
const cFillIJ = code('int[][] w = new int[3][4];', 'for (int i = 0; i < w.length; i++)', '    for (int j = 0; j < w[i].length; j++)', '        w[i][j] = i + j;', showM('w'));
Q('co_fill_ij', coo({
  pre: 'A timetable program fills a table by a rule and then displays it. Write the exact output of the code.',
  t: 1, d: 3, c: 'application', code: cFillIJ,
  sol: 'Each element receives the sum of its own row and column subscripts. Row 0 holds 0 1 2 3, row 1 holds 1 2 3 4 and row 2 holds 2 3 4 5.',
}));
Q('co_err_row_index', coo({
  pre: 'A student stores marks of 4 students in 3 tests with the code below. State the error that occurs when the program runs.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int[][] marks = new int[4][3];', 'for (int i = 1; i <= 4; i++)', '    marks[i][0] = 50 + i;', 'System.out.println("Stored");'),
  sol: 'The rows of this table are numbered 0 to 3. When the loop variable i reaches 4, the statement marks[4][0] uses a row that does not exist, and the run stops with an exception. The loop should run from 0 while i < marks.length.',
  scheme: [['Kind of error: run-time ArrayIndexOutOfBoundsException', 1], ['Reason: row subscript 4 is outside 0 to 3', 1]],
}));
Q('co_err_int_to_row', coo({
  pre: 'The code below tries to fill the whole first row of a table with the value 0. State the error the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int[][] sheet = new int[2][3];', 'sheet[0] = 0;'),
  sol: 'The expression sheet[0] stands for the entire first row, which is an int array. A single int value cannot be assigned to it. The elements have to be given values one by one, with sheet[0][j].',
  scheme: [['Compile-time error with its line', 1], ['Reason: a row is an array, not a single int', 1]],
}));

// ---- short answers, t01
const cDecl3 = code('int[][] temp = new int[3][4];', 'temp[0][0] = 31;', 'System.out.println(temp[0][0] + " " + temp.length + " " + temp[0].length);');
Q('s_def_2d', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is a double-dimensional array? Write a statement to declare and create one that stores the temperatures of 3 cities for 4 days.',
  model: `A **double-dimensional array** is an array of arrays that stores values of the same data type in rows and columns; each element is accessed with two subscripts, row and column.\n\n${F(cDecl3)}\n\nThe code displays ${ic(out(cDecl3))}: the first value is the element stored, then the number of rows and the number of columns.`,
  sol: 'One mark for the meaning (rows and columns, two subscripts) and one mark for the correct declaration with 3 rows and 4 columns.',
  scheme: [['Definition: table of rows and columns, accessed by two subscripts', 1], ['Correct declaration new int[3][4] (or with a suitable type)', 1]],
}));
const cDisplayShort = code(dcl('bill', [[40, 15], [25, 60], [10, 5]]), 'for (int i = 0; i < bill.length; i++) {', '    for (int j = 0; j < bill[i].length; j++) {', '        System.out.print(bill[i][j] + " ");', '    }', '    System.out.println();', '}');
Q('s_display', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Write the Java statements to display the elements of an int array bill, of any size, in matrix format (rows and columns).',
  model: `${F(cDisplayShort)}\n\nFor a 3 by 2 array the output is:\n\n\`\`\`\n${out(cDisplayShort)}\n\`\`\``,
  sol: 'Nested loops, with the loop limits taken from the array itself, and a println after the inner loop.',
  scheme: [['Outer loop on rows and inner loop on columns using length', 1], ['print for the elements and println after every row', 1]],
}));
const msgLen = mustThrow(code('int[][] g = new int[2][3];', 'g[1][3] = 4;'), 'g13');
Q('s_index_error', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'When does a program that uses a double-dimensional array throw an ArrayIndexOutOfBoundsException? Give an example with the message shown by Java.',
  model: `It is thrown at run time when the row subscript or the column subscript is negative or not less than the corresponding length, so that the element does not exist.\n\nFor int[][] g = new int[2][3]; the statement g[1][3] = 4; fails because the column subscripts are 0 to 2. Java shows ${ic(msgLen)}.`,
  sol: 'One mark for the condition and one mark for a correct example with the message.',
  scheme: [['Subscript outside 0 to length - 1 (row or column)', 1], ['Example with the exception message', 1]],
}));
Q('s_length', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Explain how the number of rows and the number of columns of a two-dimensional array named pack can be found in a program.',
  model: `The number of rows is **pack.length**, the length of the outer array. The number of columns is **pack[0].length**, the length of the first row (any row of a table has the same length).\n\nFor int[][] pack = new int[5][2]; the two expressions give ${ic(ev('pack.length + " " + pack[0].length', 'int[][] pack = new int[5][2];'))}.`,
  sol: 'One mark for each of the two expressions.',
  scheme: [['Rows: pack.length', 1], ['Columns: pack[0].length', 1]],
}));
