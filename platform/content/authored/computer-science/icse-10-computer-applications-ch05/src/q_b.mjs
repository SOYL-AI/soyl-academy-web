// ICSE 10 Computer Applications, ch05: topic t02 (finite and infinite loops, delay loops, multiple counters, break and continue).
// No infinite loop is ever executed: code that never ends is only shown; the runs below are bounded by break.
import { Q, mcq, ar, tf, fb, match, short } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, num, coT, distinct, mustFail, mustCompile, oline } from './q_util.mjs';

// ---- shared code
export const cBreakLoop = code('for (int i = 1; i <= 8; i++) {', '    if (i == 5)', '        break;', '    System.out.print(i + " ");', '}', 'System.out.println("done");');
export const cContLoop = code('for (int i = 1; i <= 8; i++) {', '    if (i == 5)', '        continue;', '    System.out.print(i + " ");', '}', 'System.out.println("done");');
export const cMulti = (step) => code(`for (int a = 1, b = 10; a < b; a += 2, b -= ${step})`, '    System.out.print(a + "-" + b + " ");');
export const cBounded = code('int count = 0;', 'while (true) {', '    count++;', '    if (count == 4)', '        break;', '}', 'System.out.println(count);');
export const cDelayOne = code('System.out.println("Start");', 'for (int w = 1; w <= 1000000; w++);', 'System.out.println("Ready");');
export const cEmptyBody = code('int i;', 'for (i = 1; i <= 5; i++);', 'System.out.println(i);');
/** Code shown but never run: the loops that never end. */
export const showInfinite = code('while (true) {', '    System.out.println("Hello");', '}');
export const showNoUpdate = code('int i = 1;', 'while (i <= 5) {', '    System.out.println(i);', '}');
export const showNoUpdateFor = code('for (int i = 1; i <= 5; )', '    System.out.println(i);');
export const showForEver = code('for (;;)', '    System.out.println("Hello");');

// ================================================================ t02 loop variations, break and continue
Q('m_infinite_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which statement best describes an infinite loop?',
  opts: distinct(['A loop whose condition never becomes false, so it cannot end on its own', 'A loop whose body is executed exactly once', 'A loop that has no statement in its body', 'A loop that stops as soon as the compiler finds an error']),
  sol: `The loop ${ic('while (true) { ... }')} is an example: its condition is always true, so only a break statement or an external stop can end it. An empty body gives a delay loop, which still ends when its condition fails.`,
}));
Q('m_delay_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A programmer writes a loop with an empty body, such as for (int w = 1; w <= 1000000; w++); to hold the program for a moment before the next line. What is such a loop called?',
  opts: distinct(['A delay (time) loop', 'An infinite loop', 'A nested loop', 'An exit-controlled loop']),
  sol: 'A loop that does no work but repeats a large number of times, only to use up time, is a delay loop. It is finite: it ends when its condition becomes false. The semicolon directly after the header is the empty body.',
}));
const multiSteps = [2, 3, 1];
const multiOuts = multiSteps.map((s) => out(cMulti(s)));
const multiOther = out(code('for (int a = 1, b = 10; a < b; a += 3, b -= 2)', '    System.out.print(a + "-" + b + " ");'));
Q('m_multi_counter', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Two lanes of a school corridor are numbered from opposite ends by the loop below. What does it display?\n\n${F(cMulti(2))}`,
  opts: distinct([ic(multiOuts[0]), ic(multiOuts[1]), ic(multiOuts[2]), ic(multiOther)]),
  sol: `The header declares two counters, separated by commas, and updates both after every pass. The pairs are 1-10, 3-8 and 5-6; the next pair would be 7-4 and a < b fails. The other outputs belong to the updates b -= 3 (${multiOuts[1]}), b -= 1 (${multiOuts[2]}) and a += 3 with b -= 2 (${multiOther}).`,
}));
const cBrk = code('int total = 0;', 'for (int i = 1; i <= 10; i++) {', '    if (total > 20)', '        break;', '    total += i;', '}', 'System.out.println(total);');
const brkVars = [
  cBrk,
  code('int total = 0;', 'for (int i = 1; i <= 7; i++)', '    total += i;', 'System.out.println(total);'),
  code('int total = 0;', 'for (int i = 1; i <= 10; i++)', '    total += i;', 'System.out.println(total);'),
  code('int total = 0;', 'for (int i = 1; i <= 10; i++) {', '    if (total > 10)', '        break;', '    total += i;', '}', 'System.out.println(total);'),
].map((c) => out(c));
Q('m_break_trace', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A volunteer adds the numbers 1, 2, 3, ... and stops as soon as the running total is above 20. What does this code display?\n\n${F(cBrk)}`,
  opts: distinct(brkVars.map((v) => ic(v))),
  sol: `The total after the passes is 1, 3, 6, 10, 15 and 21. At the start of the next pass total > 20 is true and break leaves the loop, so ${brkVars[0]} is displayed. ${brkVars[2]} would be the result without the break, ${brkVars[1]} is the sum of the numbers 1 to 7, and ${brkVars[3]} comes from the test total > 10.`,
}));
const cContStill = code('for (int i = 1; i <= 5; i++) {', '    if (i == 2)', '        continue;', '    System.out.print(i + " ");', '}');
Q('m_continue_for', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the body of a for loop a continue statement is executed. Which part of the loop is executed next?',
  opts: distinct(['The update expression of the header, and then the test', 'The test, skipping the update expression', 'The initialisation, once more', 'The first statement of the body, without any test']),
  sol: `Control goes to the update and then to the test, so the loop continues with the next value of the variable. This is why the loop ${ic('for (int i = 1; i <= 5; i++) { if (i == 2) continue; ... }')} finishes normally and prints ${ic(out(cContStill))}. If the update were skipped, i would stay 2 for ever.`,
}));
Q('m_break_continue_diff', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement about the continue statement is correct?',
  opts: distinct(['It skips the remaining statements of the current pass and moves on to the next pass of the loop', 'It leaves the loop completely and goes to the first statement after the loop', 'It ends the whole program at once', 'It starts the loop again with the initial value of the loop variable']),
  sol: `continue ends only the current pass. In a for loop control goes to the update expression and then to the test. Leaving the loop completely is the job of break, which is why ${ic(out(cBreakLoop).replace('\n', ' '))} for break differs from ${ic(out(cContLoop))} for continue.`,
}));
Q('m_final_i', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `The loop below ends with a semicolon directly after its header. What does the code display?\n\n${F(cEmptyBody)}`,
  opts: distinct([ic(out(cEmptyBody)), ic('5'), ic('1 2 3 4 5'), 'A compile-time error is reported']),
  sol: `The semicolon is an empty body, so the loop only repeats the update. After the pass with i equal to 5 the update makes i equal to ${out(cEmptyBody)}, and then the test i <= 5 fails. Because i was declared before the loop, println can use it and shows ${out(cEmptyBody)}.`,
}));

Q('tf_continue_false', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The continue statement terminates the loop and transfers control to the first statement after the loop.',
  sol: `That is the job of break. After continue the loop keeps running: the loop that skips i == 5 prints ${ic(out(cContLoop))}, which still contains the values 6, 7 and 8.`,
}));
const cForeverBounded = code('int n = 0;', 'for (;;) {', '    n++;', '    if (n == 3)', '        break;', '}', 'System.out.println(n);');
Q('tf_for_empty', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? All three parts of the header of a for loop may be left empty, so that for (;;) is a valid statement in Java.',
  sol: `The two semicolons must remain, but the parts may be empty. With an empty condition the loop is always true, so it needs a break to stop. The bounded version ${ic('for (;;) { n++; if (n == 3) break; }')} compiles and prints ${ic(out(cForeverBounded))}.`,
}));
Q('fb_break', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The statement ___ leaves the loop at once, while the statement ___ skips only the current pass of the loop.',
  acc: [['break'], ['continue']],
  sol: 'break ends the loop completely; continue ends only the pass in progress and moves on to the next one.',
}));
Q('ar_semi', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'In the code `for (int i = 1; i <= 5; i++); System.out.println("Hi");` the word Hi is displayed five times.',
  r: 'A semicolon placed directly after the header of a for loop is an empty statement that forms the body of the loop.',
  sol: `Run as written, the code displays ${ic(out(code('for (int i = 1; i <= 5; i++);', 'System.out.println("Hi");')))} only once, so (A) is false. (R) is true: the empty body makes the loop repeat nothing, and the println that follows is an ordinary statement.`,
}));
Q('ar_continue', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In a for loop, the update expression is executed after a continue statement and before the condition is tested again.',
  r: 'The continue statement terminates the loop entirely.',
  sol: `If the update were skipped, the loop ${ic('for (int i = 1; i <= 5; i++) { if (i == 2) continue; ... }')} would stay at i == 2 forever. Instead it prints ${ic(out(cContStill))} and finishes, so (A) is true. (R) is false, because continue ends only the current pass; break ends the loop.`,
}));

Q('mt_stmt', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Java statement or loop with its description.',
  pairs: [
    [ic('break;'), 'leaves the loop at once'],
    [ic('continue;'), 'skips the rest of the current pass and goes on with the next one'],
    [ic('for (;;)'), 'a loop with empty parts that needs a break to end'],
    [ic('for (int i = 1; i <= 5; i++);'), 'a loop with an empty body, as in a delay loop'],
  ],
  sol: `break ends the loop and continue ends only the pass (${ic(out(cBreakLoop))} against ${ic(out(cContLoop))} for the loop that tests i == 5). With all parts empty the condition counts as true, so only break can end for (;;); the semicolon after a header is the empty body.`,
}));

// ---- code output, t02
Q('co_break_continue', coT({
  pre: 'A school bus visits stops numbered 1 to 10 but the conductor skips the even ones and turns back after a stop beyond 7. Write the exact output of the code.',
  t: 2, d: 4, c: 'analysis',
  code: code('for (int i = 1; i <= 10; i++) {', '    if (i % 2 == 0)', '        continue;', '    if (i > 7)', '        break;', '    System.out.print(i + " ");', '}', 'System.out.println("End");'),
  sol: 'For even i the first if sends the loop to the next pass. For odd i the second test i > 7 is false up to 7, so 1, 3, 5 and 7 are printed. At i = 9 the break leaves the loop and End is printed on the same line.',
}));
Q('co_multi', coT({
  pre: 'The loop below uses two counters, x and y, declared before the loop. Write the exact output of the code.',
  t: 2, d: 4, c: 'analysis',
  code: code('int x, y;', 'for (x = 2, y = 20; x < y; x += 4, y -= 3)', '    System.out.println(x + " " + y);', 'System.out.println(x + " " + y);'),
  sol: 'The pairs 2 20, 6 17 and 10 14 satisfy x < y and are printed by the loop. After the third pass the updates make x 14 and y 11, the test fails, and the println after the loop shows these final values.',
}));
Q('co_delay_semi', coT({
  pre: 'A student adds a delay loop to a counter program. Write the exact output of the code.',
  t: 2, d: 4, c: 'analysis',
  code: code('int c = 0;', 'for (int w = 1; w <= 1000000; w++);', '    c++;', 'System.out.println(c);'),
  sol: 'The semicolon after the header is the empty body, so the loop only delays. The statement c++ is outside the loop and is executed once, so the value printed is 1 and not the number of passes.',
}));
mustFail(code('int n = 5;', 'if (n > 3) {', '    System.out.println("Large");', '    break;', '}'), 'break outside a loop');
Q('co_err_break', coT({
  pre: 'A student uses break to leave an if block that is not inside any loop or switch. State the error that the compiler reports.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: code('int n = 5;', 'if (n > 3) {', '    System.out.println("Large");', '    break;', '}'),
  sol: 'break may be used only inside a loop or a switch statement. An if block is neither, so the compiler rejects the statement.',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: break written outside a loop or switch', 1]],
}));

// ---- short answers, t02
Q('s_break_continue', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between the break statement and the continue statement when they are used inside a loop.',
  model: `**break** terminates the loop and passes control to the statement after the loop. **continue** skips the remaining statements of the current pass and passes control to the next pass (in a for loop, to the update expression).\n\nFor the same loop that tests i == 5, break prints ${ic(out(cBreakLoop).replace('\n', ' '))}, but continue prints ${ic(out(cContLoop).replace('\n', ' '))}.\n\n${F(cBreakLoop)}`,
  sol: 'One mark for each statement with its effect.',
  scheme: [['break leaves the loop', 1], ['continue skips the rest of the current pass only, with an example', 1]],
}));
Q('s_infinite', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [25, 110],
  stem: 'What is an infinite loop? Write one example and state how such a loop can be made to stop.',
  model: `An **infinite loop** is a loop whose condition never becomes false, so it keeps repeating and never ends by itself. Examples are a loop with the condition true or a loop whose update statement is missing:\n\n${F(showInfinite)}\n\n${F(showNoUpdate)}\n\nIt can be stopped by a **break** inside an if statement, or by correcting the update so that the condition becomes false. The bounded form ${ic('while (true) { count++; if (count == 4) break; }')} stops and prints ${ic(out(cBounded))}.`,
  sol: 'One mark for the meaning with a correct example, one mark for the way to stop it.',
  scheme: [['Meaning (condition never false) with a correct example', 1], ['Way to stop: break with a condition, or a correct update', 1]],
}));
Q('s_delay', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Write a Java loop that works as a delay between displaying the word Start and the word Ready, and say how the loop does this.',
  model: `${F(cDelayOne)}\n\nOutput: ${ic(oline(cDelayOne))}. The for loop has an **empty body** (the semicolon after the header), so it only counts from 1 to 1000000 and in doing so uses up time. A larger limit gives a longer delay.`,
  sol: 'A for loop with a large limit and an empty body, placed between the two println statements, makes the program pause.',
  scheme: [['Delay loop with an empty body written between the two println statements', 1], ['Explanation: the loop only counts and so uses time', 1]],
}));

// facts exported for the build (checked there)
mustCompile(cDelayOne, 'delay loop program');
export const termDelay = num(code('int c = 0;', 'for (int w = 1; w <= 1000000; w++)', '    c++;', 'System.out.println(c);'));
