// ICSE 10 Computer Applications, ch11: Single-dimensional Arrays. Topic t01 (arrays: declaration, creation, access, length, references).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, mustCompile, expect, rte, cerr } from './q_util.mjs';

// ---- shared code used by several items and by the slides
export const cDecl = code(
  'int[] a = new int[4];',
  'double[] d = new double[3];',
  'boolean[] f = new boolean[2];',
  'char[] c = new char[2];',
  'String[] s = new String[2];',
  'System.out.println(a[0]);',
  'System.out.println(d[1]);',
  'System.out.println(f[0]);',
  'System.out.println((int) c[1]);',
  'System.out.println(s[1]);',
);
export const cStats = code(
  'int[] visitors = {42, 35, 58, 61, 29, 45};',
  'int sum = 0, max = visitors[0], min = visitors[0];',
  'for (int i = 0; i < visitors.length; i++) {',
  '    sum = sum + visitors[i];',
  '    if (visitors[i] > max)',
  '        max = visitors[i];',
  '    if (visitors[i] < min)',
  '        min = visitors[i];',
  '}',
  'System.out.println("Sum = " + sum);',
  'System.out.println("Max = " + max);',
  'System.out.println("Min = " + min);',
  'System.out.println("Average = " + (double) sum / visitors.length);',
);
/** Loop of cStats with a print of i, visitors[i], sum, max and min after each element (for the trace table). */
export const cStatsTrace = code(
  'int[] visitors = {42, 35, 58, 61, 29, 45};',
  'int sum = 0, max = visitors[0], min = visitors[0];',
  'for (int i = 0; i < visitors.length; i++) {',
  '    sum = sum + visitors[i];',
  '    if (visitors[i] > max)',
  '        max = visitors[i];',
  '    if (visitors[i] < min)',
  '        min = visitors[i];',
  '    System.out.println(i + " " + visitors[i] + " " + sum + " " + max + " " + min);',
  '}',
);
export const cReverse = code(
  'int[] a = {4, 9, 15, 22, 31};',
  'int n = a.length;',
  'for (int i = 0; i < n / 2; i++) {',
  '    int t = a[i];',
  '    a[i] = a[n - 1 - i];',
  '    a[n - 1 - i] = t;',
  '}',
  'for (int i = 0; i < n; i++)',
  '    System.out.println(a[i]);',
);
/** Same loop with a print of i and the array after each swap (trace table). */
export const cReverseTrace = code(
  'int[] a = {4, 9, 15, 22, 31};',
  'int n = a.length;',
  'for (int i = 0; i < n / 2; i++) {',
  '    int t = a[i];',
  '    a[i] = a[n - 1 - i];',
  '    a[n - 1 - i] = t;',
  '    String line = "" + i;',
  '    for (int k = 0; k < n; k++)',
  '        line = line + " " + a[k];',
  '    System.out.println(line);',
  '}',
);
export const cAlias = code('int[] a = {1, 2, 3};', 'int[] b = a;', 'b[0] = 50;', 'System.out.println(a[0] + " " + b[0]);');
export const cCopy = code(
  'int[] a = {1, 2, 3};',
  'int[] b = new int[a.length];',
  'for (int i = 0; i < a.length; i++)',
  '    b[i] = a[i];',
  'b[0] = 50;',
  'System.out.println(a[0] + " " + b[0]);',
);
export const cBoost = (call) => code(
  'public class Booster {',
  '    static void addBonus(int[] m) {',
  '        for (int i = 0; i < m.length; i++)',
  '            m[i] = m[i] + 5;',
  '    }',
  '    public static void main(String[] args) {',
  '        int[] marks = {40, 62, 75};',
  ...(call ? ['        addBonus(marks);'] : []),
  '        System.out.println(marks[0] + " " + marks[2]);',
  '    }',
  '}',
);
const rte1 = (s) => `Run-time error: ${s.err}`;

// ================================================================ t01 arrays
Q('m_arr_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is a single-dimensional (one-dimensional) array in Java?',
  opts: distinct(['A collection of values of the same data type stored under one name, each element reached by its index', 'A collection of values of different data types stored under one name', 'A single variable whose value can be changed during the program', 'A method that arranges a list of values in order']),
  sol: 'An array is a composite (reference) data type: one name, many elements of the same type, stored one after another and reached with an index written in square brackets. A single variable holds one value, and arranging values is the job of a sorting method.',
}));
const errD1 = cerr('int seats = new int[6];');
const errD2 = cerr('int[6] seats;');
const errD3 = cerr('int seats[] = new int(6);');
mustCompile('int[] seats = new int[6];\nint rows[] = new int[6];\nSystem.out.println(seats.length + rows.length);', 'both declaration forms');
Q('m_decl_valid', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following statements correctly declares and creates an int array that can hold 6 values?',
  opts: distinct([ic('int[] seats = new int[6];'), ic('int seats = new int[6];'), ic('int[6] seats;'), ic('int seats[] = new int(6);')]),
  sol: `The size is written in square brackets after new, and the array type has empty brackets (int[] seats or int seats[]). The other three are rejected by javac: "${errD1}", "${errD2}" and "${errD3}".`,
}));
const preDef = 'int[] a = new int[4];\na[1] = 6;\na[2] = 9;';
const cDefaultMix = code('int[] a = new int[4];', 'a[1] = 6;', 'a[2] = 9;', 'System.out.println(a[0] + a[1] + a[3]);');
Q('m_default_val', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A stall keeps the number of jars sold per day in an array. What is displayed by the code below?\n\n${F(cDefaultMix)}`,
  opts: distinct([ic(out(cDefaultMix)), ic(ev('a.length + a[1]', preDef)), ic(ev('a[1] + a[2]', preDef)), 'A run-time error because a[0] and a[3] hold no value']),
  sol: `An int array created with new starts with every element 0, so a[0] and a[3] add nothing and the sum is ${out(cDefaultMix)}. There is no error, because every element always holds a value. The other numbers come from adding other things: ${ic(ev('a.length + a[1]', preDef))} is the length plus a[1], and ${ic(ev('a[1] + a[2]', preDef))} is a[1] plus a[2].`,
}));
const rteLast = rte('double[] fare = new double[12];\nfare[12] = 1.5;');
Q('m_last_index', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A ticket counter creates the array `double[] fare = new double[12];`. What is the index of its last element?',
  opts: distinct(['11', '12', '13', '10']),
  sol: `The indexes of an array of 12 elements run from 0 to 11, that is, from 0 to length - 1. Using index 12 is a run-time error: ${ic(rteLast.err)}.`,
}));
const cLoopOver = code('int[] score = {4, 8, 15, 16};', 'for (int i = 0; i <= score.length; i++)', '    System.out.println(score[i]);');
const rLoopOver = rte(cLoopOver);
Q('m_aioobe', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A school program shows four quiz scores with the code below. What happens when the code is run?\n\n${F(cLoopOver)}`,
  opts: distinct(['The four scores are displayed and then an ArrayIndexOutOfBoundsException stops the program', 'The four scores are displayed and the program ends normally', 'The compiler reports an error in the loop condition and nothing is displayed', 'A fifth line showing 0 is displayed after the four scores']),
  sol: `The condition i <= score.length lets i reach 4, but the last valid index is 3. The scores ${ic(rLoopOver.out.split('\n').join(' / '))} are displayed and then the program stops with ${ic(rLoopOver.err)}. The loop should use i < score.length.`,
}));
const errLen1 = cerr('int[] stock = new int[5];\nSystem.out.println(stock.length());');
const errLen2 = cerr('int[] stock = new int[5];\nSystem.out.println(stock.size());');
const errLen3 = cerr('int[] stock = new int[5];\nSystem.out.println(length(stock));');
expect(errLen1, 'cannot find symbol', 'length() message');
expect(errLen2, 'cannot find symbol', 'size() message');
expect(errLen3, 'cannot find symbol', 'length(stock) message');
Q('m_length_prop', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which expression gives the number of elements of the int array named stock?',
  opts: distinct([ic('stock.length'), ic('stock.length()'), ic('stock.size()'), ic('length(stock)')]),
  sol: `For an array, length is a property (a data member) and is written without brackets. Each of the other three makes javac say "${errLen1}", because an array has no method named length() or size() and there is no function length(). length() with brackets is used for a String, not for an array.`,
}));
const preAlias = 'int[] p = {3, 6, 9};\nint[] q = p;\nq[1] = 40;';
const cAliasM = code('int[] p = {3, 6, 9};', 'int[] q = p;', 'q[1] = 40;', 'System.out.println(p[1] + " " + q[1]);');
const cCopyM = code('int[] p = {3, 6, 9};', 'int[] q = new int[3];', 'for (int i = 0; i < 3; i++)', '    q[i] = p[i];', 'q[1] = 40;', 'System.out.println(p[1] + " " + q[1]);');
Q('m_ref_copy', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A teacher keeps marks in an array p and then gives it a second name q. What is displayed by the code below?\n\n${F(cAliasM)}`,
  opts: distinct([ic(out(cAliasM)), ic(out(cCopyM)), ic(ev('p[1] + q[1]', preAlias)), 'A compile-time error because an array cannot be assigned to another array variable']),
  sol: `The statement int[] q = p; copies only the reference, so p and q are two names for one array and the change made through q is seen through p as well. Only a loop that copies the elements into a new array leaves p unchanged and would display ${ic(out(cCopyM))}. Adding the two elements would give the single number ${ic(ev('p[1] + q[1]', preAlias))}.`,
}));
Q('m_method_pass', mcq({
  t: 1, d: 4, c: 'application',
  stem: `A method adds a bonus to every element of an array that is passed to it. What is displayed by the program below?\n\n${F(cBoost(true))}`,
  opts: distinct([ic(out(cBoost(true))), ic(out(cBoost(false))), ic(out(cBoost(true).replace('marks[0] + " " + marks[2]', 'marks[0] + marks[2]'))), 'A compile-time error because an array cannot be passed to a method']),
  sol: `An array is passed by reference: the parameter m is another name for marks, so the loop in addBonus changes the real array and each element grows by 5. If the method were not called nothing would change and ${ic(out(cBoost(false)))} would be displayed; printing marks[0] + marks[2] after the call would show only the sum of the two changed values, ${ic(out(cBoost(true).replace('marks[0] + " " + marks[2]', 'marks[0] + marks[2]')))}.`,
}));
const preNeg = 'int[] t = {-8, -3, -12, -5, -9};';
const cMaxNeg = code('int[] t = {-8, -3, -12, -5, -9};', 'int max = 0;', 'for (int i = 0; i < t.length; i++)', '    if (t[i] > max)', '        max = t[i];', 'System.out.println(max);');
Q('m_max_loop', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `A weather program stores the night temperatures of five winter days in degrees Celsius, all below zero. It tries to find the highest temperature with the code below. What is displayed?\n\n${F(cMaxNeg)}`,
  opts: distinct([ic(out(cMaxNeg)), ic(ev('t[1]', preNeg)), ic(ev('t[2]', preNeg)), 'A run-time error because the values are negative']),
  sol: `The variable max starts at 0 and no element is greater than 0, so the loop never changes it and ${out(cMaxNeg)} is displayed, which is not even a value of the array. The real highest temperature is ${ev('t[1]', preNeg)}. The safe start is max = t[0], an element of the array itself.`,
}));
const cSumAvg = code('int[] a = {7, 4, 6, 8};', 'int sum = 0;', 'for (int i = 0; i < a.length; i++)', '    sum = sum + a[i];', 'double avg = sum / a.length;', 'System.out.println(avg);');
const cSumAvgOk = cSumAvg.replace('sum / a.length', '(double) sum / a.length');
const preSum = 'int[] a = {7, 4, 6, 8};\nint sum = 7 + 4 + 6 + 8;';
Q('m_sum_avg', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A coach finds the average of four match scores with the code below. What is displayed?\n\n${F(cSumAvg)}`,
  opts: distinct([ic(out(cSumAvg)), ic(out(cSumAvgOk)), ic(ev('sum / a.length', preSum)), ic(ev('(double) sum', preSum))]),
  sol: `Both sum and a.length are int, so sum / a.length is an integer division and the fraction is cut off before the result is stored in the double variable. Writing (double) sum / a.length gives the exact average ${ic(out(cSumAvgOk))}. The value ${ic(ev('sum / a.length', preSum))} is the integer quotient without the .0, and ${ic(ev('(double) sum', preSum))} is the sum itself.`,
}));

Q('ar_len', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'For an array of 8 elements, the last element is a[7].',
  r: 'The index (subscript) of the first element of an array is 0.',
  sol: `Run with a[7] and then a[8], the first is accepted and the second stops the program with ${ic(rte('int[] a = new int[8];\na[7] = 1;\na[8] = 2;').err)}, so (A) is true. (R) is true and is the reason: counting from 0, eight elements occupy indexes 0 to 7.`,
}));
Q('ar_ref', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'After the statements `int[] b = a;` and `b[0] = 50;`, the element a[0] also becomes 50.',
  r: 'The statement `int[] b = a;` copies every element of a into a new array b.',
  sol: `Run with a = {1, 2, 3} the code displays ${ic(out(cAlias))} for a[0] and b[0], so (A) is true. (R) is false: the statement copies only the reference, so a and b name the same array and no new array is created.`,
}));
Q('tf_default', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After `int[] a = new int[3];` the three elements hold unpredictable garbage values until the program stores something in them.',
  sol: `The elements of a new int array are set to 0 by Java: a[0] + a[1] + a[2] gives ${ev('a[0] + a[1] + a[2]', 'int[] a = new int[3];')}. Only local variables that are not arrays must be assigned before use.`,
}));
Q('fb_zero', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The index of the first element of any Java array is ___ and the number of elements is given by its ___ property.',
  acc: [['0', 'zero'], ['length']],
  sol: 'Indexes start at 0, so the last index is length - 1, and length (written without brackets) gives the number of elements.',
}));
Q('mt_arr_terms', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each term about arrays with its meaning.',
  pairs: [
    ['index (subscript)', 'the position number of an element, counted from 0'],
    [ic('length'), 'the property that gives the number of elements'],
    [ic('new'), 'the operator that creates the array in memory'],
    ['element', 'one value stored in the array'],
  ],
  sol: 'The index points to a position, length counts the elements, new reserves the memory (and sets the default values) and an element is a single stored value.',
}));
Q('ord_arr_sum', ord({
  t: 1, d: 3, c: 'application',
  stem: 'Arrange the steps of a program that finds the sum of the elements of an int array, in the order in which they are written and executed.',
  items: ['Declare the array and store its values', 'Declare the variable sum and give it the value 0', 'Start a loop with i = 0 that continues while i < length', 'Add a[i] to sum in the body of the loop', 'Display sum after the loop ends'],
  sol: 'The array and the sum must exist before the loop, the addition is the body of the loop, and the total is displayed only after the loop has visited every element. If sum were not set to 0 first, the compiler would report that it might not have been initialized.',
}));

// ---- code output, t01
Q('co_default_vals', co({
  pre: 'A student creates arrays of different types and displays some elements in one line. Write the exact output.',
  t: 1, d: 3, c: 'understanding',
  code: code('int[] a = new int[3];', 'boolean[] f = new boolean[2];', 'String[] s = new String[2];', 'double[] d = new double[2];', 'd[1] = a[2] + 2.5;', 'System.out.println(a[0] + " " + f[1] + " " + s[0] + " " + d[0] + " " + d[1]);'),
  sol: 'The untouched elements hold the default values of their types: 0 for int, false for boolean, null for a String (an object) and 0.0 for double. d[1] receives a[2] + 2.5, which is 0 + 2.5.',
}));
Q('co_shift', co({
  pre: 'A program adds each element of an array to the element after it. Write the exact output (one value per line).',
  t: 1, d: 4, c: 'analysis',
  code: code('int[] a = {3, 7, 1, 9, 4};', 'for (int i = 0; i < a.length - 1; i++)', '    a[i] = a[i] + a[i + 1];', 'for (int i = 0; i < a.length; i++)', '    System.out.println(a[i]);'),
  sol: 'The loop runs for i = 0 to 3 and changes the array in place: a[0] becomes 3 + 7, a[1] becomes 7 + 1, a[2] becomes 1 + 9 and a[3] becomes 9 + 4. Each sum uses the next element, which has not been changed yet, and a[4] is never changed.',
}));
Q('co_alias', co({
  pre: 'Two names are used for one box of tokens in a game program. Write the exact output.',
  t: 1, d: 4, c: 'analysis',
  code: code('int[] box = {2, 4, 6, 8};', 'int[] lid = box;', 'lid[0] = lid[3];', 'box[3] = 0;', 'System.out.println(box[0] + " " + lid[3] + " " + box.length);'),
  sol: 'lid and box are two names for the same array. lid[0] = lid[3] copies 8 into the first element, then box[3] = 0 changes the last element, which lid[3] also shows. Assigning elements never changes the length, which stays 4.',
}));
Q('co_err_aioobe', co({
  pre: 'A program fills the seat numbers of a row. State the error that occurs when the code is run.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int[] seat = new int[5];', 'for (int i = 1; i <= 5; i++)', '    seat[i] = i * 10;'),
  sol: 'The array has the indexes 0 to 4. The loop starts at 1, so seat[0] is skipped, and it ends at 5, so the last pass uses seat[5], which does not exist. The program compiles but stops at run time.',
  scheme: [['Kind of error stated (run-time, ArrayIndexOutOfBoundsException)', 1], ['Reason: index 5 is outside the valid range 0 to 4', 1]],
}));
Q('co_err_len', co({
  pre: 'A student wants the number of marks stored in an array and writes the code below. State the error that the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int[] mark = {45, 67, 89};', 'int n = mark.length();', 'System.out.println(n);'),
  sol: 'For an array, length is a property and must be written without brackets: mark.length. With brackets the compiler looks for a method named length in the array and cannot find one.',
  scheme: [['Compile-time error stated with its line', 1], ['Reason: length is a property of an array, not a method (corrected: mark.length)', 1]],
}));
Q('co_err_init', co({
  pre: 'A student gives both the size and the values while creating an array. State the error that the compiler reports.',
  t: 1, d: 4, c: 'analysis', error: true,
  code: code('int[] fee = new int[3]{100, 150, 200};', 'System.out.println(fee[1]);'),
  sol: 'When the values are listed, Java counts them itself, so the size must not be written. Either int[] fee = new int[]{100, 150, 200}; or int[] fee = {100, 150, 200}; is correct, as is new int[3] followed by three assignments.',
  scheme: [['Compile-time error stated with its line', 1], ['Reason: size and initial values cannot be given together', 1]],
}));

// ---- short answers, t01
const cDefArr = code('int[] marks = new int[5];', 'marks[4] = 80;', 'System.out.println(marks.length + " " + marks[4] + " " + marks[0]);');
Q('s_arr_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'What is an array? Write Java statements to declare and create an int array marks to hold the marks of 5 students and to store 80 in its last element.',
  model: `An **array** is a composite data type: a named collection of elements of the **same data type** stored one after another, each reached by an **index** that starts at 0.\n\n${F(cDefArr)}\n\nThe last element of the 5 elements has the index 4. The output is ${ic(out(cDefArr))}: the length, the stored value and the default value 0 of an element that was not assigned.`,
  sol: 'One mark for the definition (same type, one name, index) and one mark for the correct declaration and the use of index 4 for the last element.',
  scheme: [['Definition: same data type, one name, accessed by index', 1], ['Correct declaration with new int[5] and marks[4] = 80', 1]],
}));
Q('s_ref_vs_copy', short({
  t: 1, d: 4, c: 'analysis', marks: 2,
  stem: 'Explain with an example the difference between the statement `int[] b = a;` and copying the elements of the array a into a new array b with a loop.',
  model: `**int[] b = a;** copies only the **reference**: a and b become two names for one array, so a change made through b is seen through a.\n\nCopying with a loop creates a **new array** (new int[a.length]) and stores each element in it, so the two arrays are independent.\n\nWith a = {1, 2, 3} and b[0] changed to 50, the first version displays ${ic(out(cAlias))} for a[0] and b[0], while the loop version displays ${ic(out(cCopy))}.\n\n${F(cCopy)}`,
  sol: 'One mark for the reference copy with its effect and one mark for the element-by-element copy into a new array, with the two outputs as the example.',
  scheme: [['b = a copies the reference: one array, two names, changes shared', 1], ['Loop copy makes a new independent array; example output', 1]],
}));
const cMaxPos = code(
  'int[] wage = {640, 720, 580, 910, 750, 690};',
  'int max = wage[0], at = 0;',
  'for (int i = 1; i < wage.length; i++) {',
  '    if (wage[i] > max) {',
  '        max = wage[i];',
  '        at = i;',
  '    }',
  '}',
  'System.out.println("Highest wage = " + max + " at index " + at);',
);
Q('s_stat_snippet', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'The int array wage holds the daily wages of 6 workers. Write Java statements to display the highest wage and the index at which it is stored.',
  model: `${F(cMaxPos)}\n\nOutput: ${ic(out(cMaxPos))}. The first element is taken as the starting maximum and the loop begins at index 1; the index is updated together with the maximum.`,
  sol: 'Start the maximum with an element of the array, compare the other elements in a loop and keep both the value and its index.',
  scheme: [['Maximum started with wage[0] and updated in a loop with a comparison', 1], ['Index kept along with the value; both displayed', 1]],
}));
const rNeg = rte('int[] a = new int[5];\nSystem.out.println(a[-1]);');
const rOver = rte('int[] a = new int[5];\nSystem.out.println(a[5]);');
Q('s_aioobe', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'What is an ArrayIndexOutOfBoundsException? Give two ways in which a program can cause it.',
  model: `It is a **run-time exception** thrown when a program uses an index that is outside the valid range 0 to length - 1 of the array. The program compiles, but stops at that statement.\n\nTwo causes: using an index equal to or above the length, for example a[5] for an array of 5 elements, which gives ${ic(rOver.err)}; and using a negative index such as a[-1], which gives ${ic(rNeg.err)}. A loop that runs to i <= a.length is the commonest cause.`,
  sol: 'One mark for the meaning (index outside 0 to length - 1, run-time) and one mark for two causes with the message.',
  scheme: [['Meaning: index outside the range 0 to length - 1, thrown at run time', 1], ['Two causes: index at or above length, negative index (or <= in a loop)', 1]],
}));
