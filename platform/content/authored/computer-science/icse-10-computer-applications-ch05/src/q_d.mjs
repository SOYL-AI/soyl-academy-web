// ICSE 10 Computer Applications, ch05: topic t04 (nested for loops: rectangular and right-angled triangular patterns; series in one variable).
// Only nested for loops are used, as in the syllabus; patterns are rectangles and right-angled triangles only.
import { Q, mcq, ar, short } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, num, coT, distinct, mustFail, oline, expect } from './q_util.mjs';

// ---- shared code used by several items and by the slides
export const cRect = (rows, cols, ch = '*') => code(`for (int i = 1; i <= ${rows}; i++) {`, `    for (int j = 1; j <= ${cols}; j++)`, `        System.out.print("${ch}");`, '    System.out.println();', '}');
export const cTriUp = code('for (int i = 1; i <= 4; i++) {', '    for (int j = 1; j <= i; j++)', '        System.out.print(j);', '    System.out.println();', '}');
export const cTriSame = code('for (int i = 1; i <= 4; i++) {', '    for (int j = 1; j <= i; j++)', '        System.out.print(i);', '    System.out.println();', '}');
export const cTriDown = code('for (int i = 1; i <= 4; i++) {', '    for (int j = 1; j <= 5 - i; j++)', '        System.out.print(j);', '    System.out.println();', '}');
export const cTriStar = (n) => code(`for (int i = 1; i <= ${n}; i++) {`, '    for (int j = 1; j <= i; j++)', '        System.out.print("*");', '    System.out.println();', '}');
export const cNestCount = (iEnd, jCond) => code('int c = 0;', `for (int i = 1; i <= ${iEnd}; i++)`, `    for (int j = 1; ${jCond}; j++)`, '        c++;', 'System.out.println(c);');
export const cSeriesPow = (base, n) => code(`double s = 0;`, `for (int i = 1; i <= ${n}; i++)`, `    s += Math.pow(${base}, i);`, 'System.out.println(s);');
export const cSeriesDiv = code('double x = 3, s = 0;', 'for (int i = 1; i <= 4; i++) {', '    s += Math.pow(x, i - 1) / i;', '    System.out.println("term " + i + ", sum = " + s);', '}');

// ================================================================ t04 nested for loops and series
const nc = [['4', 'j <= 3'], ['4', 'j <= i'], ['4', 'j < i'], ['5', 'j <= 3']].map(([a, b]) => num(cNestCount(a, b)));
Q('m_nested_count', mcq({
  t: 4, d: 2, c: 'application',
  stem: `A tailor stitches one button for every pass of the inner loop below. How many buttons are stitched in all?\n\n${F('int c = 0;', 'for (int i = 1; i <= 4; i++)', '    for (int j = 1; j <= 3; j++)', '        c++;')}`,
  opts: distinct(nc.map((v) => ic(String(v)))),
  sol: `The inner loop runs 3 times for each of the 4 passes of the outer loop, so c becomes ${nc[0]}. The count ${nc[1]} would come from the inner test j <= i, ${nc[2]} from j < i, and ${nc[3]} from an outer loop that runs 5 times.`,
}));
const triVars = [cTriUp, cTriSame, cTriDown, code('for (int i = 1; i <= 4; i++) {', '    for (int j = 1; j <= i; j++) {', '        System.out.print(j);', '        System.out.println();', '    }', '}')].map((c) => oline(c));
Q('m_tri_out', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A school notice board shows a number triangle printed by the code below. What is displayed? The lines of the output are shown separated by a slash.\n\n${F(cTriUp)}`,
  opts: distinct(triVars.map((v) => ic(v))),
  sol: `For each value of i the inner loop prints 1 up to i on one line, and println then starts a new line. This gives ${triVars[0]}. Printing i instead of j gives ${triVars[1]}, the test j <= 5 - i gives ${triVars[2]}, and a println inside the inner loop puts every number on its own line.`,
}));
Q('m_println_pos', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In a program that prints a pattern row by row with two nested for loops, where must the statement System.out.println(); be written so that every row ends with a new line?',
  opts: distinct(['Inside the outer loop, after the inner loop has finished', 'Inside the inner loop, after the print statement', 'Before the outer loop starts', 'After the outer loop has finished']),
  sol: `The inner loop prints one row, so the new line belongs after it, once for each pass of the outer loop. Inside the inner loop it would break every row into single items (${ic(oline(code('for (int i = 1; i <= 2; i++) {', '    for (int j = 1; j <= 3; j++) {', '        System.out.print("*");', '        System.out.println();', '    }', '}')))}), and after the outer loop all rows would join into one line.`,
}));
const innerHeads = ['for (int j = 1; j <= 6 - i; j++)', 'for (int j = 1; j <= i; j++)', 'for (int j = 1; j <= 5; j++)', 'for (int j = 1; j < i; j++)'];
const innerOuts = innerHeads.map((h) => oline(code('for (int i = 1; i <= 5; i++) {', `    ${h}`, '        System.out.print("*");', '    System.out.println();', '}')));
expect(innerOuts[0], '***** / **** / *** / ** / *', 'inner loop 6 - i');
Q('m_inner_bound', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The outer loop of a pattern program is for (int i = 1; i <= 5; i++) and its body prints stars with an inner loop and then ends the line. The pattern must have 5 stars in the first row, 4 in the second, and so on down to 1 star in the last row. Which header of the inner loop produces it?',
  opts: distinct(innerHeads.map((h) => ic(h))),
  sol: `Row i must have 6 - i stars, so the inner loop runs while j <= 6 - i: the output is ${ic(innerOuts[0])}. The header j <= i gives ${ic(innerOuts[1])}, j <= 5 gives ${ic(innerOuts[2])}, and j < i gives ${ic(innerOuts[3])}.`,
}));
const sv = [cSeriesPow(3, 3), code('double s = 0;', 'for (int i = 1; i <= 3; i++)', '    s += Math.pow(3, i - 1);', 'System.out.println(s);'), code('double s = 0;', 'for (int i = 1; i <= 3; i++)', '    s += Math.pow(i, 3);', 'System.out.println(s);')].map((c) => out(c));
Q('m_series_val', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A maths-fair stall finds the sum of the powers of 3 with the code below. What is displayed?\n\n${F(cSeriesPow(3, 3))}`,
  opts: distinct([ic(sv[0]), ic('39'), ic(sv[1]), ic(sv[2])]),
  sol: `The terms are 3, 9 and 27, and their sum is displayed as ${sv[0]} because s is a double and Math.pow returns a double, so the decimal part is printed. The plain value 39 is never displayed. The sum ${sv[1]} belongs to the powers 3 to the power i - 1, and ${sv[2]} to the cubes of 1, 2 and 3.`,
}));
const stmts = ['s += 1.0 / i;', 's += 1 / i;', 's += i / 1.0;', 's = 1.0 / i;'];
const stmtOuts = stmts.map((st) => out(code('double s = 0;', 'for (int i = 1; i <= 2; i++)', `    ${st}`, 'System.out.println(s);')));
Q('m_series_term', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'A program finds the sum of the series 1 + 1/2 + 1/3 + ... + 1/n in the double variable s, with the loop variable i taking the values 1 to n. Which statement written in the body of the loop adds each term correctly?',
  opts: distinct(stmts.map((st) => ic(st))),
  sol: `With n = 2 the sum should be 1 + 1/2. The statement s += 1.0 / i gives ${stmtOuts[0]}. In s += 1 / i both operands are int, so the division is an integer division and the loop gives ${stmtOuts[1]}. The statement s += i / 1.0 adds the values of i (${stmtOuts[2]}), and s = 1.0 / i replaces s each time and keeps only the last term (${stmtOuts[3]}).`,
}));
const nestOrder = out(code('for (int i = 1; i <= 2; i++)', '    for (int j = 1; j <= 3; j++)', '        System.out.print(i + "" + j + " ");'));
Q('m_nested_order', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which statement about the working of two nested for loops is correct?',
  opts: distinct(['For every single pass of the outer loop, the inner loop runs from its initialisation until its test fails', 'The outer loop makes one pass for every pass of the inner loop', 'The inner loop runs only once, during the first pass of the outer loop', 'Both loops must use the same loop variable']),
  sol: `With i from 1 to 2 and j from 1 to 3 the pairs printed are ${ic(nestOrder)}: j goes through its whole range for i = 1, and then again for i = 2. The loops need different variable names, since the compiler rejects a repeated one.`,
}));
const arNest = out(code('int c = 0;', 'for (int i = 1; i <= 3; i++)', '    for (int j = 1; j <= 2; j++)', '        c++;', 'System.out.println(c);'));
Q('ar_nested', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In a nested for loop, the inner loop completes all of its passes for every single pass of the outer loop.',
  r: 'The inner loop is a part of the body of the outer loop, and the body is executed once for each pass of the outer loop.',
  sol: `When the outer loop makes 3 passes and the inner loop 2 passes each, a counter in the inner body reaches ${arNest}, that is 3 x 2. (A) is true, and (R) gives the reason for it.`,
}));

// ---- code output, t04
Q('co_nested_count', coT({
  pre: 'A seating chart counts the seats of a small hall with the nested loops below. Write the exact output of the code.',
  t: 4, d: 3, c: 'application',
  code: code('int count = 0;', 'for (int i = 1; i <= 3; i++)', '    for (int j = i; j <= 3; j++)', '        count++;', 'System.out.println(count);'),
  sol: 'The inner loop starts at j = i, so it runs 3 times for i = 1, 2 times for i = 2 and once for i = 3. The total 3 + 2 + 1 is displayed.',
}));
Q('co_tri_dec', coT({
  pre: 'A teacher prints a table of products row by row. Write the exact output of the code.',
  t: 4, d: 4, c: 'application',
  code: code('for (int i = 4; i >= 1; i--) {', '    for (int j = 1; j <= i; j++)', '        System.out.print(i * j + " ");', '    System.out.println();', '}'),
  sol: 'The outer loop counts down from 4 to 1, and row i has i products i x 1, i x 2, and so on up to i x i. Each row is ended by the println after the inner loop.',
}));
Q('co_series', coT({
  pre: 'A student prints the running sum of a series. Write the exact output of the code.',
  t: 4, d: 4, c: 'application',
  code: code('double s = 0;', 'for (int i = 1; i <= 4; i++) {', '    s += Math.pow(i, 2) / 2;', '    System.out.println(s);', '}'),
  sol: 'The terms are i squared divided by 2: 0.5, 2.0, 4.5 and 8.0. Because s is a double, every value is printed with a decimal part.',
}));
mustFail(code('for (int i = 1; i <= 3; i++) {', '    for (int i = 1; i <= i; i++)', '        System.out.print("*");', '    System.out.println();', '}'), 'redeclared loop variable');
Q('co_err_redeclare', coT({
  pre: 'A student uses the same variable name for the outer and the inner loop of a pattern program. State the error that the compiler reports.',
  t: 4, d: 4, c: 'analysis', error: true,
  code: code('for (int i = 1; i <= 3; i++) {', '    for (int i = 1; i <= i; i++)', '        System.out.print("*");', '    System.out.println();', '}'),
  sol: 'The loop variable of the outer loop is still in scope inside it, so declaring another int i there is not allowed. The inner loop needs its own name, such as j.',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: the inner loop variable has the same name as the outer one', 1]],
}));

// ---- short answers, t04
const cNestShort = code('int c = 0;', 'for (int r = 1; r <= 3; r++)', '    for (int k = 1; k <= 4; k++)', '        c++;', 'System.out.println(c);');
Q('s_nested_def', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Explain how two nested for loops work. If the outer loop makes 3 passes and the inner loop makes 4 passes in each of them, how many times is the statement in the inner loop executed?',
  model: `In **nested for loops** one for loop is written in the body of another. For every single pass of the outer loop the inner loop runs completely, from its initialisation until its test fails. So the number of executions of the inner statement is (passes of the outer loop) x (passes of the inner loop).

For 3 and 4 passes a counter in the inner body shows **${out(cNestShort)}** (3 x 4):

${F(cNestShort)}`,
  sol: 'One mark for the working of nested loops and one mark for the number of executions.',
  scheme: [['Inner loop runs completely for each pass of the outer loop', 1], ['Executions = outer passes x inner passes, here 12', 1]],
}));
const cSeriesStmt = code('double x = 2, s = 0;', 'int n = 5;', 'for (int i = 1; i <= n; i++)', '    s += Math.pow(x, i);', 'System.out.println(s);');
Q('s_series_stmt', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Write the Java statements to find the sum of the series S = x + x squared + x cubed + ... up to n terms, where x is a double variable and n is an int variable. Take x as 2 and n as 5 and display the sum.',
  model: `${F(cSeriesStmt)}\n\nOutput: ${ic(out(cSeriesStmt))}. The i-th term is ${ic('Math.pow(x, i)')}, and the loop adds the terms for i from 1 to n.`,
  sol: 'A for loop from 1 to n with the term obtained from Math.pow and added to a sum that starts at 0.',
  scheme: [['Sum initialised to 0 and loop from 1 to n', 1], ['Term Math.pow(x, i) added to the sum and the sum displayed', 1]],
}));
const cPatStmt = code('for (int i = 1; i <= 5; i++) {', '    for (int j = 5; j >= 6 - i; j--)', '        System.out.print(j);', '    System.out.println();', '}');
const patOut = out(cPatStmt);
Q('s_pattern_stmt', short({
  t: 4, d: 4, c: 'application', marks: 2,
  stem: `Write nested for loops to display the following pattern.\n\n\`\`\`\n${patOut}\n\`\`\``,
  model: `${F(cPatStmt)}\n\nThe output of this code is:\n\n\`\`\`\n${out(cPatStmt)}\n\`\`\`\n\nThe outer loop counts the rows. In row i the inner loop prints the numbers from 5 down to 6 - i, and println ends the row.`,
  sol: 'Row i has i numbers, starting from 5 and counting down; the inner loop therefore runs from 5 down to 6 - i.',
  scheme: [['Outer loop for the five rows and a println after the inner loop', 1], ['Inner loop printing 5 down to 6 - i', 1]],
}));
