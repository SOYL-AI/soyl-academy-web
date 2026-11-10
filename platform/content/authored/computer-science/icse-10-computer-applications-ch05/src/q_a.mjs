// ICSE 10 Computer Applications, ch05: Revision of Iterative Constructs and Nested Loops. Topic t01 (for, while, do-while; inter-conversion).
// Every scenario is imagined for SOYL. Every output, count or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, num, coT, distinct, mustFail, mustCompile, oline } from './q_util.mjs';

// ---- shared code used by several items and by the slides
/** Multiples of 3 up to 15 with each kind of loop (inter-conversion). */
export const cForMult = code('for (int i = 3; i <= 15; i += 3)', '    System.out.print(i + " ");');
export const cWhileMult = code('int i = 3;', 'while (i <= 15) {', '    System.out.print(i + " ");', '    i += 3;', '}');
export const cDoMult = code('int i = 3;', 'do {', '    System.out.print(i + " ");', '    i += 3;', '} while (i <= 15);');
/** Counts the executions of the body of a for loop with the given header parts. */
export const countFor = (init, cond, upd) => code('int count = 0;', `for (${init}; ${cond}; ${upd})`, '    count++;', 'System.out.println(count);');
/** Entry-controlled against exit-controlled when the condition is false at the start. */
export const cWhileFalse = code('int n = 10;', 'while (n < 5) {', '    System.out.println("body runs, n = " + n);', '    n++;', '}', 'System.out.println("after the loop, n = " + n);');
export const cDoFalse = code('int n = 10;', 'do {', '    System.out.println("body runs, n = " + n);', '    n++;', '} while (n < 5);', 'System.out.println("after the loop, n = " + n);');
export const cForSum = code('int sum = 0;', 'for (int i = 1; i <= 5; i++) {', '    sum += i;', '    System.out.println("i = " + i + ", sum = " + sum);', '}');
export const cWhileHalf = (cond) => code('int x = 40, steps = 0;', `while (${cond}) {`, '    x = x / 2;', '    steps++;', '}', 'System.out.println(x + " " + steps);');

// ================================================================ t01 loop kinds, flow and inter-conversion
Q('m_loop_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement describes the purpose of an iterative construct (loop) in Java?',
  opts: distinct(['It repeats a statement or a block of statements as long as its condition stays true', 'It chooses one block of statements out of several by testing conditions in turn', 'It compares one selector with a list of constant labels and runs the matching case', 'It stores many values of the same type under a single name']),
  sol: 'A loop executes its body again and again while the condition holds. Choosing between blocks is the work of if statements and switch, and storing many values under one name is the work of arrays.',
}));
Q('m_entry_exit', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of the following loops tests its condition only after the body has been executed, and is therefore called an exit-controlled loop?',
  opts: distinct(['do-while loop', 'for loop', 'while loop', 'for loop and while loop']),
  sol: 'The do-while loop is the only exit-controlled loop of Java: it runs the body first and tests the condition at the end. The for loop and the while loop are entry-controlled, because they test the condition before every execution of the body.',
}));
Q('m_dowhile_why', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A student says, "The body of a do-while loop is executed at least once, even if its condition is false in the beginning." What is the reason for this?',
  opts: distinct(['The condition is placed at the end, so it is tested after the body has already run', 'The condition is placed before the body, but it is ignored the first time', 'A do-while loop has no condition and stops only when break is used', 'The initialisation of the loop variable is written inside the body']),
  sol: `In a do-while the order is body first, test later. In ${ic('int n = 10; do { ... n++; } while (n < 5);')} the body runs once and the test n < 5 then fails. A while loop with the same condition would not run its body at all.`,
}));
const tokOpts = [['int n = 5', 'n < 30', 'n += 5'], ['int n = 5', 'n <= 30', 'n += 5'], ['int n = 10', 'n < 30', 'n += 5'], ['int n = 0', 'n <= 30', 'n += 5']];
const tokCounts = tokOpts.map((o) => num(countFor(...o)));
Q('m_count_for', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A fair stall issues one token for every pass of the loop below. How many tokens are issued?\n\n${F('int tokens = 0;', 'for (int n = 5; n < 30; n += 5)', '    tokens++;')}`,
  opts: distinct(tokCounts.map((v) => ic(String(v)))),
  sol: `n takes the values 5, 10, 15, 20 and 25, and the test n < 30 stops the loop at 30, so the body runs ${tokCounts[0]} times. The count ${tokCounts[1]} comes from the test n <= 30, ${tokCounts[2]} from starting at 10, and ${tokCounts[3]} from starting at 0 with n <= 30.`,
}));
Q('m_loop_part', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which part of a loop gives the loop variable its first value, and is executed only once, before the first test?',
  opts: distinct(['The initialisation', 'The test (condition)', 'The update', 'The body']),
  sol: 'The initialisation is carried out once, before anything else. The test is made before each pass (after it in do-while), the body is repeated, and the update changes the loop variable at the end of every pass.',
}));
const kFor = code('for (int k = 10; k >= 4; k -= 2)', '    System.out.print(k + " ");');
const kOpts = [
  'int k = 10; while (k >= 4) { System.out.print(k + " "); k -= 2; }',
  'int k = 10; while (k >= 4) { k -= 2; System.out.print(k + " "); }',
  'int k = 10; while (k > 4) { System.out.print(k + " "); k -= 2; }',
  'int k = 4; while (k <= 10) { System.out.print(k + " "); k += 2; }',
];
const kOuts = kOpts.map((s) => out(s));
Q('m_convert', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The for loop below prints a countdown of ${out(kFor).split(' ').length} numbers. Which while loop prints exactly the same numbers in the same order?\n\n${F(kFor)}`,
  opts: distinct(kOpts.map((s) => ic(s))),
  sol: `The for loop prints ${ic(out(kFor))}. A while loop needs the initialisation before the loop, the same test, and the update as the last statement of the body. Putting the update first prints ${ic(kOuts[1])}, using k > 4 prints ${ic(kOuts[2])}, and counting upwards prints ${ic(kOuts[3])}.`,
}));
mustCompile(code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} while (n <= 3);'), 'correct do-while ending');
const errDoWord = mustFail(code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} while n <= 3;'), 'do-while without brackets');
const errDoSemi = mustFail(code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} while (n <= 3)', 'System.out.println("End");'), 'do-while without semicolon');
const errDoUntil = mustFail(code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} until (n <= 3);'), 'until');
Q('m_dowhile_syntax', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A student has written the first four lines of a do-while loop that displays 1, 2 and 3.

${F('int n = 1;', 'do {', '    System.out.println(n);', '    n++;')}

Which line correctly completes the loop?`,
  opts: distinct([ic('} while (n <= 3);'), ic('} while (n <= 3)'), ic('} while n <= 3;'), ic('} until (n <= 3);')]),
  sol: `The condition of a do-while is written in brackets after the keyword while, and the statement ends with a semicolon. The compiler reports "${errDoSemi}" when the semicolon is missing, "${errDoWord}" when the brackets are missing, and "${errDoUntil}" for until, which Java does not have.`,
}));

Q('tf_for_entry', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The body of a for loop may not be executed even once.',
  sol: `The for loop is entry-controlled, so its condition is tested first. For ${ic('for (int i = 9; i < 5; i++)')} the test is false at the start, and a counter placed in the body shows ${num(countFor('int i = 9', 'i < 5', 'i++'))} executions.`,
}));
Q('fb_loops', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The ___ loop is an exit-controlled loop, so its body is executed at least ___.',
  acc: [['do-while', 'do while', 'dowhile', 'do'], ['once', 'one time', '1', 'one']],
  sol: 'The do-while loop tests its condition at the end, so its body is executed at least once.',
}));
const mtLoops = [
  ['for (int i = 1; i <= 10; i += 3)', 'int count = 0;\nfor (int i = 1; i <= 10; i += 3)\n    count++;\nSystem.out.println(count);'],
  ['for (int i = 10; i > 0; i -= 5)', 'int count = 0;\nfor (int i = 10; i > 0; i -= 5)\n    count++;\nSystem.out.println(count);'],
  ['int i = 0; while (i < 3) { ...; i++; }', 'int count = 0;\nint i = 0;\nwhile (i < 3) {\n    count++;\n    i++;\n}\nSystem.out.println(count);'],
  ['do { ... } while (false);', 'int count = 0;\ndo {\n    count++;\n} while (false);\nSystem.out.println(count);'],
];
const mtCounts = mtLoops.map(([, c]) => num(c));
Q('mt_loops', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each loop with the number of times its body is executed.',
  pairs: mtLoops.map(([l], i) => [ic(l), `${mtCounts[i]} time${mtCounts[i] === 1 ? '' : 's'}`]),
  sol: `The first loop uses i = 1, 4, 7, 10 (${mtCounts[0]} times) and the second i = 10, 5 (${mtCounts[1]} times). The while loop runs for i = 0, 1, 2 (${mtCounts[2]} times). The do-while runs its body once before the false test (${mtCounts[3]} time).`,
}));
Q('ord_for', ord({
  t: 1, d: 2, c: 'understanding',
  stem: 'Arrange the actions of a for loop in the order in which they take place when the loop is entered and its first pass is completed.',
  items: ['The initialisation is executed once', 'The condition is tested', 'The statements of the body are executed', 'The update expression is executed'],
  sol: 'The initialisation is done once, before anything else. Then the condition is tested; if it is true the body runs, and after the body the update is executed. Control then goes back to the test.',
}));
Q('ar_dowhile', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'For n = 10, the code `do { System.out.println(n); } while (n < 5);` displays 10 once.',
  r: 'A do-while loop evaluates its condition after executing the body.',
  sol: `The run really prints ${ic(out(code('int n = 10;', 'do {', '    System.out.println(n);', '} while (n < 5);')))} once, so (A) is true. (R) is true as well and it is the reason: the body had already run when n < 5 was found to be false.`,
}));

// ---- code output, t01
Q('co_while_trace', coT({
  pre: 'A tea stall keeps a stock of 12 cups and serves five cups in each round. Write the exact output of the code.',
  t: 1, d: 3, c: 'application',
  code: code('int cups = 12, round = 0;', 'while (cups > 0) {', '    cups -= 5;', '    round++;', '    System.out.println(round + ": " + cups);', '}'),
  sol: 'The test cups > 0 is made before every round. The values of cups after the rounds are 7, 2 and -3. At -3 the test fails, so the loop stops after the third round; the last line shows that cups can go below zero.',
}));
Q('co_dowhile_false', coT({
  pre: 'A game starts at level 8 and the check below is meant to repeat only for levels below 8. Write the exact output of the code.',
  t: 1, d: 3, c: 'application',
  code: code('int level = 8;', 'do {', '    System.out.println("Level " + level);', '    level++;', '} while (level < 8);', 'System.out.println("Final " + level);'),
  sol: 'The body of a do-while runs first, so Level 8 is displayed and level becomes 9. The condition level < 8 is then false and the loop ends; the last line shows the value 9.',
}));
mustFail(code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} while (n <= 3)', 'System.out.println("End");'), 'do-while without semicolon');
Q('co_err_dowhile', coT({
  pre: 'A student writes the do-while loop below to display 1, 2 and 3. State the error that the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int n = 1;', 'do {', '    System.out.println(n);', '    n++;', '} while (n <= 3)', 'System.out.println("End");'),
  sol: 'The while condition of a do-while is the end of a statement, so it must be followed by a semicolon. Writing } while (n <= 3); removes the error.',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: missing semicolon after the while condition of the do-while loop', 1]],
}));

// ---- short answers, t01
const cForShort = code('for (int i = 2; i <= 20; i += 6)', '    System.out.print(i + " ");');
const cWhileShort = code('int i = 2;', 'while (i <= 20) {', '    System.out.print(i + " ");', '    i += 6;', '}');
const cDoShort = code('int i = 2;', 'do {', '    System.out.print(i + " ");', '    i += 6;', '} while (i <= 20);');
Q('s_convert', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Rewrite the following for loop (a) using a while loop and (b) using a do-while loop. The output must remain the same.\n\n${F(cForShort)}`,
  model: `(a) while loop\n\n${F(cWhileShort)}\n\n(b) do-while loop\n\n${F(cDoShort)}\n\nAll three versions print ${ic(out(cForShort))}. The initialisation moves before the loop and the update becomes the last statement of the body.`,
  sol: 'One mark for each correct conversion: the initialisation before the loop, the same condition, and the update at the end of the body.',
  scheme: [['while version: initialisation before the loop, same condition, update inside the body', 1], ['do-while version with the condition and the semicolon at the end', 1]],
}));
Q('s_entry_exit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between an entry-controlled loop and an exit-controlled loop. Name the loops that belong to each kind.',
  model: `In an **entry-controlled loop** the condition is tested before the body is executed, so the body may not run at all. The **for** and **while** loops are of this kind. In an **exit-controlled loop** the condition is tested after the body, so the body runs at least once. The **do-while** loop is of this kind.\n\nWith n = 10 and the condition n < 5, the while version displays only ${ic(out(cWhileFalse))}, whereas the do-while version displays ${ic(oline(cDoFalse))}.`,
  sol: 'One mark for each kind, with the loops that belong to it.',
  scheme: [['Entry-controlled: condition first, body may not run; for and while', 1], ['Exit-controlled: condition after the body, runs at least once; do-while', 1]],
}));
const cIter = code('int a = 100, k = 0;', 'while (a > 10) {', '    a -= 15;', '    k++;', '}');
Q('s_iter_count', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `A water meter loop is written as shown. State how many times the body of the loop is executed and the final values of a and k.\n\n${F(cIter)}`,
  model: `The values of a are 100, 85, 70, 55, 40, 25 and 10. Printing a and k after the loop gives ${ic(out(cIter + '\nSystem.out.println(a + " " + k);'))}, so the body is executed **${out(cIter + '\nSystem.out.println(k);')} times**, the final value of a is **${out(cIter + '\nSystem.out.println(a);')}** and the final value of k is **${out(cIter + '\nSystem.out.println(k);')}**.`,
  sol: 'Trace the values of a: the body runs while a is above 10; when a becomes 10 the condition a > 10 is false. The counter k equals the number of executions.',
  scheme: [['Number of executions found by tracing', 1], ['Final values of a and k', 1]],
}));
